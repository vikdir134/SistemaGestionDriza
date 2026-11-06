const { test } = require('node:test');
const assert = require('node:assert/strict');
const { CATEGORIAS, validarPeriodo, calcularFlujo } = require('../src/modules/flujoCaja/flujoCaja.calculo');
let id = 0;
const mov = (categoria, monto, fecha, extra = {}) => ({ clave: `prueba:${++id}`, categoria, monto, fecha,
  sentido: CATEGORIAS.find(row => row.codigo === categoria).sentido, moneda_codigo: 'PEN', ...extra });
const mensual = (movimientos, mes = '2026-10', hoy = '2026-11-06') => calcularFlujo({ movimientos, ...validarPeriodo({ mes }, hoy) });

test('la inversión entra una vez y se arrastra al saldo inicial del próximo mes', () => {
  const movimientos = [mov('APORTES', 10000, '2026-10-01'), mov('COBROS_CLIENTES', 3000, '2026-10-05'), mov('GASTOS', 4000, '2026-10-10')];
  assert.deepEqual(mensual(movimientos).resumen, { saldo_inicial: 0, entradas: 13000, salidas: 4000, flujo_neto: 9000, saldo_final: 9000 });
  assert.deepEqual(mensual(movimientos, '2026-11').resumen, { saldo_inicial: 9000, entradas: 0, salidas: 0, flujo_neto: 0, saldo_final: 9000 });
});

test('una venta de octubre cobrada en noviembre ingresa exclusivamente en noviembre', () => {
  const movimientos = [mov('COBROS_CLIENTES', 1000, '2026-11-03')];
  assert.equal(mensual(movimientos).resumen.entradas, 0);
  assert.equal(mensual(movimientos, '2026-11').resumen.entradas, 1000);
});

test('anticipos entran al cobrarse; capital, intereses y cargos se suman una sola vez', () => {
  const data = mensual([mov('COBROS_CLIENTES', 200, '2026-10-01'), mov('PRESTAMOS_RECIBIDOS', 2000, '2026-10-01'),
    mov('PAGO_CAPITAL', 100, '2026-10-05'), mov('PAGO_INTERESES', 20, '2026-10-05'), mov('PAGO_CARGOS', 5, '2026-10-05')]);
  assert.equal(data.resumen.entradas, 2200);
  assert.equal(data.resumen.salidas, 125);
  assert.equal(data.resumen.saldo_final, 2075);
});

test('préstamos otorgados, recuperación, intereses cobrados y devoluciones de aportes tienen el sentido correcto', () => {
  const data = mensual([mov('APORTES', 1000, '2026-10-01'), mov('PRESTAMOS_OTORGADOS', 500, '2026-10-02'),
    mov('COBRO_CAPITAL', 100, '2026-10-03'), mov('COBRO_INTERESES', 10, '2026-10-03'),
    mov('COBRO_CARGOS', 2, '2026-10-03'), mov('DEVOLUCION_APORTES', 50, '2026-10-04')]);
  assert.equal(data.resumen.entradas, 1112);
  assert.equal(data.resumen.salidas, 550);
  assert.equal(data.resumen.saldo_final, 562);
});

test('compras y SUNAT son pagos registrados; no se agregan tasas ni consumos de inventario', () => {
  const data = mensual([mov('APORTES', 2000, '2026-10-01'), mov('COMPRAS_MATERIA_PRIMA', 708, '2026-10-01'),
    mov('COMPRAS_GENERALES', 118, '2026-10-02'), mov('SUNAT', 50, '2026-10-03'), mov('GASTOS', 100, '2026-10-03')]);
  assert.equal(data.resumen.salidas, 976);
  assert.equal(data.categorias.find(row => row.codigo === 'SUNAT').total, 50);
  assert.equal(data.categorias.find(row => row.codigo === 'GASTOS').total, 100);
});

test('pagos del mismo importe con referencias distintas permanecen separados; referencias duplicadas fallan', () => {
  const uno = mov('COBROS_CLIENTES', 100, '2026-10-01');
  assert.equal(mensual([uno, mov('COBROS_CLIENTES', 100, '2026-10-01')]).resumen.entradas, 200);
  assert.throws(() => mensual([uno, { ...uno }]), /duplicadas/);
});

test('los saldos se calculan desde todo el historial y no se mezclan monedas', () => {
  const data = mensual([mov('APORTES', 1000, '2025-01-01'), mov('GASTOS', 200, '2025-02-01'),
    mov('COBROS_CLIENTES', 50, '2026-10-01'), mov('APORTES', 999, '2026-10-01', { moneda_codigo: 'USD' })]);
  assert.equal(data.resumen.saldo_inicial, 800);
  assert.equal(data.resumen.entradas, 50);
  assert.equal(data.resumen.saldo_final, 850);
  assert.equal(data.anteriores.length, 2);
});

test('el corte de hoy excluye movimientos y puntos futuros, manteniendo saldo en días vacíos', () => {
  const data = mensual([mov('APORTES', 1000, '2026-10-01'), mov('GASTOS', 200, '2026-11-03'), mov('GASTOS', 999, '2026-11-07')], '2026-11');
  assert.equal(data.corte, '2026-11-06');
  assert.equal(data.resumen.salidas, 200);
  assert.equal(data.serie[0].saldo_final, 1000);
  assert.equal(data.serie[3].saldo_final, 800);
  assert.equal(data.serie[6].habilitado, false);
  assert.equal(data.serie[6].saldo_final, null);
});

test('el anual concilia entradas, salidas y arrastre sin sumar saldos mensuales', () => {
  const movimientos = [mov('APORTES', 1000, '2025-12-31'), mov('COBROS_CLIENTES', 500, '2026-01-01'), mov('GASTOS', 200, '2026-02-01')];
  const data = calcularFlujo({ movimientos, ...validarPeriodo({ vista: 'anual', anio: '2026' }, '2026-11-06') });
  assert.equal(data.resumen.saldo_inicial, 1000);
  assert.equal(data.resumen.saldo_final, 1300);
  assert.equal(data.serie[0].saldo_inicial, 1000);
  assert.equal(data.serie[1].saldo_inicial, 1500);
  assert.equal(data.serie[2].saldo_inicial, 1300);
  assert.equal(data.serie[11].habilitado, false);
  assert.equal(data.serie.filter(row => row.habilitado).reduce((sum, row) => sum + row.entradas, 0), 500);
});

test('los detalles, categorías, saldo final y últimos puntos concilian', () => {
  const data = mensual([mov('APORTES', 1000, '2026-09-01'), mov('GASTOS', 100, '2026-10-01'), mov('COBROS_CLIENTES', 200, '2026-10-02')]);
  assert.equal(data.movimientos.at(-1).saldo, data.resumen.saldo_final);
  assert.equal(data.serie.at(-1).saldo_final, data.resumen.saldo_final);
  assert.equal(data.categorias.filter(row => row.sentido === 'ENTRADA').reduce((sum, row) => sum + row.total, 0), data.resumen.entradas);
  assert.equal(data.categorias.filter(row => row.sentido === 'SALIDA').reduce((sum, row) => sum + row.total, 0), data.resumen.salidas);
});

test('ordena por fecha y referencia, conserva céntimos y permite saldos negativos', () => {
  const data = mensual([mov('GASTOS', .2, '2026-10-03'), mov('COBROS_CLIENTES', .1, '2026-10-01')]);
  assert.equal(data.movimientos[0].fecha, '2026-10-01');
  assert.equal(data.resumen.saldo_final, -.1);
  assert.equal(data.resumen.flujo_neto, -.1);
});

test('mes vacío devuelve cero o conserva el saldo anterior', () => {
  assert.equal(mensual([]).resumen.saldo_final, 0);
  const data = mensual([mov('APORTES', 100, '2026-09-01')]);
  assert.equal(data.resumen.entradas, 0);
  assert.equal(data.resumen.saldo_final, 100);
  assert.ok(data.serie.every(row => row.saldo_final === 100));
});

test('valida filtros, fin exclusivo, años bisiestos y límite entre años', () => {
  const bisiesto = validarPeriodo({ mes: '2024-02' }, '2026-11-06');
  assert.equal(bisiesto.corte, '2024-02-29');
  assert.equal(bisiesto.fin.toISOString(), '2024-03-01T00:00:00.000Z');
  assert.equal(mensual([], '2024-02').serie.length, 29);
  assert.equal(validarPeriodo({ vista: 'anual', anio: '2025' }, '2026-01-01').fin.toISOString(), '2026-01-01T00:00:00.000Z');
  for (const filtro of [{}, { mes: '2026-13' }, { mes: ['2026-10'] }, { mes: '2026-12' }, { mes: '2026-10', moneda: 'EUR' }, { mes: '2026-10', vista: 'otra' }, { vista: 'anual', anio: '2027' }]) {
    assert.throws(() => validarPeriodo(filtro, '2026-11-06'));
  }
});

test('datos inválidos no se convierten en un flujo exitoso', () => {
  assert.throws(() => mensual([mov('GASTOS', NaN, '2026-10-01')]), /inválido/);
  assert.throws(() => mensual([mov('GASTOS', 100, '2026-10-01', { sentido: 'ENTRADA' })]), /inválido/);
});

test('rechaza acumulados que pierden precisión aunque cada movimiento y saldo individual sean válidos', () => {
  const movimientos = [];
  for (const [index, categoria] of ['APORTES', 'COBROS_CLIENTES', 'PRESTAMOS_RECIBIDOS'].entries()) {
    movimientos.push(mov(categoria, 35000000000000, `2026-10-0${index * 2 + 1}`));
    movimientos.push(mov('GASTOS', 35000000000000, `2026-10-0${index * 2 + 2}`));
  }
  assert.throws(() => mensual(movimientos), /totales de caja exceden la precisión/);
});
