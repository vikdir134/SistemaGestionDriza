// Ejecutar desde backend: node --test tests/eerr.test.js
// Escenarios de negocio sin SQL Server ni modificación de datos reales.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calcularEerr } = require('../src/modules/eerr/eerr.calculo');

const venta = (id, fecha, cantidad, extra = {}) => ({
  entrega_detalle_id: id, entrega_id: id, pedido_id: 1, codigo_pedido: 'P1',
  fecha, cantidad, precio_unitario: 10, moneda_codigo: 'PEN', unidad: 'KG',
  cliente: 'Cliente prueba', producto: 'Driza', ...extra
});
const entrada = (id, cantidad, extra = {}) => ({
  movimiento_id: id, stock_id: 1, tipo_movimiento: 'ENTRADA_PRODUCCION', cantidad,
  produccion_detalle_id: id, produccion_id: id, cantidad_producida: cantidad, ...extra
});
const salida = (id, entrega, cantidad, extra = {}) => ({
  movimiento_id: id, stock_id: 1, tipo_movimiento: 'SALIDA_ENTREGA',
  entrega_detalle_id: entrega, cantidad, ...extra
});
const consumo = (id, produccion, cantidad, precio, extra = {}) => ({
  consumo_id: id, produccion_detalle_id: produccion, cantidad,
  precio_unitario: precio, moneda_codigo: 'PEN', unidad: 'KG',
  compra_materia_prima_id: id, nombre_lote: `Lote ${id}`, material: 'Materia prima', color: 'Azul', ...extra
});
const deposito = (id, fecha, monto, extra = {}) => ({
  deposito_id: id, pedido_id: 1, fecha, monto, moneda_codigo: 'PEN', ...extra
});
const fixture = () => ({
  mes: '2026-10', moneda: 'PEN',
  ventas: [venta(10, '2026-10-10', 40), venta(11, '2026-11-05', 60)],
  depositos: [deposito(1, '2026-11-10', 1000)],
  movimientos: [entrada(1, 100), salida(2, 10, 40), salida(3, 11, 60)],
  consumos: [consumo(1, 1, 50, 4), consumo(2, 1, 50, 8)]
});

test('venta de octubre cobrada en noviembre no vuelve a ingresar en noviembre', () => {
  const data = fixture();
  data.ventas = [venta(10, '2026-10-10', 100)];
  data.movimientos = [entrada(1, 100), salida(2, 10, 100)];
  const octubre = calcularEerr(data);
  const noviembre = calcularEerr({ ...data, mes: '2026-11' });
  assert.equal(octubre.resumen.ventas, 1000);
  assert.equal(octubre.resumen.ventas_credito, 1000);
  assert.equal(octubre.resumen.costo_ventas, 600);
  assert.equal(noviembre.resumen.ventas, 0);
  assert.equal(noviembre.resumen.costo_ventas, 0);
  assert.deepEqual(noviembre.detalles.ventas, []);
});

test('las entregas parciales y su materia prima se reconocen una vez en su propio mes', () => {
  const data = fixture();
  const octubre = calcularEerr(data);
  const noviembre = calcularEerr({ ...data, mes: '2026-11' });
  assert.equal(octubre.resumen.ventas, 400);
  assert.equal(noviembre.resumen.ventas, 600);
  assert.equal(octubre.resumen.costo_ventas, 240);
  assert.equal(noviembre.resumen.costo_ventas, 360);
  assert.equal(octubre.resumen.utilidad_bruta, 160);
  assert.equal(octubre.detalles.costos.length, 2);
  assert.equal(octubre.detalles.costos[0].cantidad_materia_prima, 20);
});

test('cobertura parcial divide importes sin duplicar el total ni usar pagos posteriores', () => {
  const data = fixture();
  data.depositos = [deposito(1, '2026-10-01', 100), deposito(2, '2026-10-11', 300)];
  const result = calcularEerr(data);
  assert.equal(result.resumen.ventas_cubiertas, 100);
  assert.equal(result.resumen.ventas_credito, 300);
  assert.equal(result.resumen.ventas_cubiertas + result.resumen.ventas_credito, result.resumen.ventas);
});

test('anticipo sin entrega no es venta; se usa al entregar sin superar el importe', () => {
  const data = fixture();
  data.depositos = [deposito(1, '2026-09-01', 1500)];
  assert.equal(calcularEerr({ ...data, mes: '2026-09' }).resumen.ventas, 0);
  const result = calcularEerr(data);
  assert.equal(result.resumen.ventas_cubiertas, 400);
  assert.equal(result.resumen.ventas_credito, 0);
});

test('depósitos cubren primero las entregas anteriores del mismo pedido', () => {
  const data = fixture();
  data.depositos = [deposito(1, '2026-11-05', 700)];
  const result = calcularEerr({ ...data, mes: '2026-11' });
  assert.equal(result.resumen.ventas_cubiertas, 300);
  assert.equal(result.resumen.ventas_credito, 300);
  assert.equal(result.detalles.ventas[0].entregado_anterior, 400);
});

test('no cruza depósitos entre pedidos ni monedas y desempata entregas por ID', () => {
  const data = fixture();
  data.ventas = [venta(2, '2026-10-10', 10), venta(1, '2026-10-10', 10)];
  data.depositos = [deposito(1, '2026-10-10', 150), deposito(2, '2026-10-01', 1000, { pedido_id: 2 }), deposito(3, '2026-10-01', 1000, { moneda_codigo: 'USD' })];
  const result = calcularEerr(data);
  assert.deepEqual(result.detalles.ventas.map(row => [row.entrega_detalle_id, row.cubierto, row.credito]), [[1, 100, 0], [2, 50, 50]]);
});

test('editar el precio actual recalcula la venta histórica sin trasladarla a otro mes', () => {
  const data = fixture();
  data.ventas[0].precio_unitario = 12;
  assert.equal(calcularEerr(data).resumen.ventas, 480);
  assert.equal(calcularEerr({ ...data, mes: '2026-11' }).resumen.ventas, 600);
});

test('FIFO terminado reparte una entrega entre producciones con precios de lote diferentes', () => {
  const data = fixture();
  data.ventas = [venta(10, '2026-10-10', 15)];
  data.movimientos = [entrada(1, 10), entrada(2, 10), salida(3, 10, 15)];
  data.consumos = [consumo(1, 1, 10, 2), consumo(2, 2, 10, 4)];
  const result = calcularEerr(data);
  assert.equal(result.resumen.costo_ventas, 40);
  assert.deepEqual(result.detalles.costos.map(row => [row.produccion_id, row.cantidad_producto, row.monto]), [[1, 10, 20], [2, 5, 20]]);
});

test('salidas previas de otros pedidos o monedas y ajustes consumen stock, no costo de este mes', () => {
  const data = fixture();
  data.ventas = [venta(10, '2026-10-10', 5)];
  data.movimientos = [entrada(1, 10), entrada(2, 10), salida(3, 900, 6),
    salida(4, null, 4, { tipo_movimiento: 'AJUSTE_SALIDA' }), salida(5, 10, 5)];
  data.consumos = [consumo(1, 1, 10, 2), consumo(2, 2, 10, 4)];
  assert.equal(calcularEerr(data).resumen.costo_ventas, 20);
});

test('redondeo conserva el costo total al vender una producción en pequeñas entregas', () => {
  const data = fixture();
  data.ventas = [venta(1, '2026-10-01', 1), venta(2, '2026-10-02', 1), venta(3, '2026-10-03', 1)];
  data.movimientos = [entrada(1, 3), salida(2, 1, 1), salida(3, 2, 1), salida(4, 3, 1)];
  data.consumos = [consumo(1, 1, 1, 1)];
  const result = calcularEerr(data);
  assert.equal(result.resumen.costo_ventas, 1);
  assert.deepEqual(result.detalles.costos.map(row => row.monto), [0.33, 0.34, 0.33]);
});

test('SUNAT sale de operativos y se descuenta una sola vez junto con los intereses', () => {
  const data = fixture();
  data.gastos = [
    { gasto_id: 1, fecha: '2026-10-01', tipo_gasto: 'Personal', monto: 50, moneda_codigo: 'PEN' },
    { gasto_id: 2, fecha: '2026-10-02', tipo_gasto: ' sunat ', monto: 20, moneda_codigo: 'PEN' },
    { gasto_id: 3, fecha: '2026-11-02', tipo_gasto: 'SUNAT', monto: 999, moneda_codigo: 'PEN' },
    { gasto_id: 4, fecha: '2026-10-02', tipo_gasto: 'Otros', monto: 999, moneda_codigo: 'USD' }
  ];
  data.intereses = [{ pago_id: 1, fecha: '2026-10-01', monto: 10, moneda_codigo: 'PEN' }];
  const result = calcularEerr(data);
  assert.equal(result.resumen.gastos, 50);
  assert.equal(result.resumen.sunat, 20);
  assert.equal(result.resumen.intereses, 10);
  assert.equal(result.resumen.financieros_impuestos, 30);
  assert.equal(result.resumen.utilidad_operacional, 110);
  assert.equal(result.resumen.utilidad_neta, 80);
  assert.deepEqual(result.detalles.gastos.map(row => row.gasto_id), [1]);
  assert.deepEqual(result.detalles.sunat.map(row => row.gasto_id), [2]);
});

test('mantiene los importes registrados sin descontar porcentajes de IGV o renta', () => {
  const data = fixture();
  data.ventas = [venta(10, '2026-10-10', 1, { precio_unitario: 1180 })];
  data.movimientos = [entrada(1, 1), salida(2, 10, 1)];
  data.consumos = [consumo(1, 1, 1, 708)];
  const result = calcularEerr(data);
  assert.equal(result.resumen.ventas, 1180);
  assert.equal(result.resumen.costo_ventas, 708);
  assert.equal(result.resumen.utilidad_neta, 472);
});

test('sin movimientos devuelve ceros y permite meses con gastos sin ventas', () => {
  const data = { mes: '2026-10', moneda: 'PEN' };
  assert.equal(calcularEerr(data).resumen.utilidad_neta, 0);
  const result = calcularEerr({ ...data, gastos: [{ gasto_id: 1, fecha: '2026-10-01', monto: 10, moneda_codigo: 'PEN', tipo_gasto: 'Luz' }] });
  assert.equal(result.resumen.utilidad_neta, -10);
});

test('stock sin producción o consumo trazable no se presenta como costo cero y utilidad inflada', () => {
  for (const cambios of [
    { movimientos: [] }, { consumos: [] },
    { movimientos: [salida(1, 10, 40), entrada(2, 100)] },
    { movimientos: [entrada(1, 100, { tipo_movimiento: 'AJUSTE_ENTRADA', produccion_detalle_id: null }), salida(2, 10, 40)] }
  ]) {
    const result = calcularEerr({ ...fixture(), ...cambios });
    assert.equal(result.completo, false);
    assert.equal(result.resumen.costo_ventas, null);
    assert.equal(result.resumen.utilidad_neta, null);
    assert.ok(result.advertencias.length > 0);
    assert.equal(result.resumen.ventas, 400);
  }
});

test('no suma materia prima en dólares con ventas en soles sin tipo de cambio', () => {
  const data = fixture();
  data.consumos[1].moneda_codigo = 'USD';
  const result = calcularEerr(data);
  assert.equal(result.completo, false);
  assert.equal(result.resumen.costo_identificado, 80);
  assert.equal(result.resumen.costo_ventas, null);
  assert.equal(result.detalles.costos[1].monto_origen, 160);
  assert.match(result.advertencias[0], /moneda distinta/);
});

test('no asume conversión de unidades y detecta cantidades de salida inconsistentes', () => {
  const data = fixture();
  data.consumos[0].unidad = 'ROLLO';
  assert.equal(calcularEerr(data).completo, false);
  data.consumos[0].unidad = 'KG';
  data.movimientos[1].cantidad = 50;
  const result = calcularEerr(data);
  assert.equal(result.completo, false);
  assert.ok(result.advertencias.some(row => row.includes('no coincide')));
});

test('cada subtotal concilia con los registros disponibles en su detalle', () => {
  const result = calcularEerr(fixture());
  const total = (rows, key) => Math.round(rows.reduce((sum, row) => sum + row[key], 0) * 100) / 100;
  assert.equal(result.resumen.ventas, total(result.detalles.ventas, 'monto'));
  assert.equal(result.resumen.ventas_cubiertas, total(result.detalles.ventas, 'cubierto'));
  assert.equal(result.resumen.ventas_credito, total(result.detalles.ventas, 'credito'));
  assert.equal(result.resumen.costo_ventas, total(result.detalles.costos, 'monto'));
});
