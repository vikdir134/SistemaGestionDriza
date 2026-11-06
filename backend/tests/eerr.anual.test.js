const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calcularEerrAnual, calcularCartera } = require('../src/modules/eerr/eerr.anual');
const venta = (id, fecha, monto, extra = {}) => ({ entrega_detalle_id: id, entrega_id: id,
  pedido_id: 1, cliente_id: 1, cliente: 'Cliente A', ruc: '111', codigo_pedido: 'P1',
  fecha, cantidad: 1, precio_unitario: monto, moneda_codigo: 'PEN', unidad: 'KG', ...extra });
const deposito = (fecha, monto, extra = {}) => ({ pedido_id: 1, moneda_codigo: 'PEN', fecha, monto, ...extra });
const anual = extra => calcularEerrAnual({ anio: '2026', moneda: 'PEN', corte: '2026-12-31', ...extra });

test('el cobro de noviembre baja cuentas por cobrar sin volver a reconocer la venta de octubre', () => {
  const data = anual({ ventas: [venta(1, '2026-10-10', 1000)], depositos: [deposito('2026-11-05', 1000)] });
  assert.equal(data.resumen.ventas, 1000);
  assert.equal(data.meses[9].resumen.ventas, 1000);
  assert.equal(data.meses[9].cuentas_por_cobrar, 1000);
  assert.equal(data.meses[10].resumen.ventas, 0);
  assert.equal(data.meses[10].cuentas_por_cobrar, 0);
  assert.equal(data.indicadores.cuentas_por_cobrar, 0);
  assert.equal(data.resumen.ventas_credito, 1000);
});

test('saldo al corte incluye deuda anterior, excluye anticipos y no cruza pedidos o monedas', () => {
  const cartera = calcularCartera({ moneda: 'PEN', corte: '2026-06-30',
    ventas: [venta(1, '2025-10-01', 100), venta(2, '2026-05-01', 200), venta(3, '2026-07-01', 999)],
    depositos: [deposito('2026-01-01', 50), deposito('2026-07-01', 999), deposito('2026-01-01', 999, { pedido_id: 2 }), deposito('2026-01-01', 999, { moneda_codigo: 'USD' })] });
  assert.equal(cartera.length, 1);
  assert.equal(cartera[0].saldo, 250);
  assert.equal(cartera[0].pagado, 50);
  assert.deepEqual(calcularCartera({ moneda: 'PEN', corte: '2026-12-31', depositos: [deposito('2026-01-01', 100)] }), []);
});

test('los clientes y pedidos se cuentan sin duplicar entregas parciales o meses', () => {
  const data = anual({ ventas: [venta(1, '2026-01-01', 100), venta(2, '2026-02-01', 150),
    venta(3, '2026-02-05', 200, { pedido_id: 2, cliente_id: 2, cliente: 'Cliente B', ruc: '222' })],
  pedidos: [{ pedido_id: 1, cliente_id: 1, fecha: '2026-01-01', estado_pedido: 'REGISTRADO', moneda_codigo: 'PEN' },
    { pedido_id: 2, cliente_id: 2, fecha: '2026-02-01', estado_pedido: 'REGISTRADO', moneda_codigo: 'PEN' },
    { pedido_id: 3, fecha: '2026-01-01', estado_pedido: 'CANCELADO', moneda_codigo: 'PEN' },
    { pedido_id: 4, fecha: '2025-12-31', estado_pedido: 'REGISTRADO', moneda_codigo: 'PEN' },
    { pedido_id: 5, fecha: '2026-01-01', estado_pedido: 'REGISTRADO', moneda_codigo: 'USD' }] });
  assert.equal(data.indicadores.clientes, 2);
  assert.equal(data.indicadores.pedidos, 2);
  assert.equal(data.meses[0].clientes, 1);
  assert.equal(data.meses[1].clientes, 2);
  assert.equal(data.clientes[0].importe, 250);
  assert.equal(data.clientes[0].pedidos, 1);
  assert.equal(data.clientes.reduce((total, cliente) => total + cliente.importe, 0), data.resumen.ventas);
});

test('dos clientes con el mismo nombre permanecen separados y se ordenan por ventas', () => {
  const data = anual({ ventas: [venta(1, '2026-01-01', 100), venta(2, '2026-01-02', 200, { cliente_id: 2, ruc: '222' })] });
  assert.deepEqual(data.clientes.map(cliente => cliente.cliente_id), [2, 1]);
  assert.equal(data.indicadores.clientes, 2);
});

test('el año actual termina al corte y no convierte los meses futuros en ceros', () => {
  const data = anual({ corte: '2026-06-15', ventas: [venta(1, '2026-06-10', 100), venta(2, '2026-06-20', 999)],
    depositos: [deposito('2026-06-20', 999)] });
  assert.equal(data.indicadores.ventas, 100);
  assert.equal(data.indicadores.cuentas_por_cobrar, 100);
  assert.equal(data.meses[5].corte, '2026-06-15');
  assert.equal(data.meses[6].habilitado, false);
  assert.equal(data.meses[6].resumen, null);
  assert.equal(data.meses[6].cuentas_por_cobrar, null);
  assert.equal(data.meses.length, 12);
});

test('los costos y gastos anuales concilian con los meses y no se duplican por repetir FIFO', () => {
  const data = anual({ ventas: [venta(1, '2026-01-01', 100), venta(2, '2026-02-01', 150)],
    movimientos: [
      { movimiento_id: 1, stock_id: 1, tipo_movimiento: 'ENTRADA_PRODUCCION', cantidad: 2, produccion_detalle_id: 1, cantidad_producida: 2 },
      { movimiento_id: 2, stock_id: 1, tipo_movimiento: 'SALIDA_ENTREGA', cantidad: 1, entrega_detalle_id: 1 },
      { movimiento_id: 3, stock_id: 1, tipo_movimiento: 'SALIDA_ENTREGA', cantidad: 1, entrega_detalle_id: 2 }],
    consumos: [{ consumo_id: 1, produccion_detalle_id: 1, cantidad: 2, precio_unitario: 25, moneda_codigo: 'PEN', unidad: 'KG' }],
    gastos: [{ fecha: '2026-01-01', moneda_codigo: 'PEN', tipo_gasto: 'Luz', monto: 20 }, { fecha: '2026-02-01', moneda_codigo: 'PEN', tipo_gasto: 'SUNAT', monto: 10 }],
    intereses: [{ fecha: '2026-02-01', moneda_codigo: 'PEN', monto: 5 }] });
  assert.equal(data.resumen.costo_ventas, 50);
  assert.equal(data.resumen.utilidad_neta, 165);
  assert.equal(data.meses.reduce((total, mes) => total + mes.resumen.utilidad_neta, 0), 165);
  assert.equal(data.meses[0].resumen.costo_ventas, 25);
  assert.equal(data.meses[1].resumen.costo_ventas, 25);
});

test('un costo faltante solo deja pendiente la utilidad del mes afectado y el agregado anual', () => {
  const data = anual({ ventas: [venta(1, '2026-10-01', 100)] });
  assert.equal(data.completo, false);
  assert.equal(data.resumen.utilidad_neta, null);
  assert.equal(data.meses[9].resumen.utilidad_neta, null);
  assert.equal(data.meses[8].resumen.utilidad_neta, 0);
  assert.equal(data.indicadores.ventas, 100);
});

test('los meses vacíos conservan saldos previos y los depósitos con excedente no producen deuda negativa', () => {
  const data = anual({ ventas: [venta(1, '2025-12-01', 100)], depositos: [deposito('2026-03-01', 150)] });
  assert.equal(data.resumen.ventas, 0);
  assert.equal(data.indicadores.clientes, 0);
  assert.equal(data.meses[0].cuentas_por_cobrar, 100);
  assert.equal(data.meses[2].cuentas_por_cobrar, 0);
  assert.equal(data.indicadores.cuentas_por_cobrar, 0);
});
