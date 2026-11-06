// API real con respuestas SQL de prueba; no requiere una base de datos.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const jwt = require('jsonwebtoken');
const dbPath = require.resolve('../src/config/db');
// Evitar cargar .env o usar credenciales del usuario en estas pruebas.
let consultas = 0;
let errorSql = false;
let parametros;
require.cache[dbPath] = { id: dbPath, filename: dbPath, loaded: true, exports: {
  sql: require('mssql'), getConnection: async () => ({ request() {
    parametros = {};
    return {
      input(nombre, tipo, valor) { parametros[nombre] = valor; return this; },
      async query() {
        consultas++;
        if (errorSql) throw new Error('Fallo de prueba');
        return { recordsets: [[], [], [], [], [
          { gasto_id: 1, fecha: '2026-10-02', monto: 40, tipo_gasto: 'Luz', moneda_codigo: 'PEN' },
          { gasto_id: 2, fecha: '2026-10-02', monto: 10, tipo_gasto: 'SUNAT', moneda_codigo: 'PEN' }
        ], [{ pago_id: 1, fecha: '2026-10-03', monto: 5, moneda_codigo: 'PEN' }], []] };
      }
    };
  } })
} };
process.env.JWT_SECRET = 'clave-exclusiva-pruebas-eerr';
const app = express();
app.use('/api/eerr', require('../src/modules/eerr/eerr.routes'));
let server;
let base;
const headers = { Authorization: `Bearer ${jwt.sign({ usuario_id: 1 }, process.env.JWT_SECRET)}` };

before(async () => {
  server = await new Promise(resolve => { const listener = app.listen(0, '127.0.0.1', () => resolve(listener)); });
  base = `http://127.0.0.1:${server.address().port}/api/eerr`;
});
after(async () => { await new Promise(resolve => server.close(resolve)); });

test('requiere autenticación antes de consultar el EERR', async () => {
  const antes = consultas;
  assert.equal((await fetch(`${base}?mes=2026-10`)).status, 401);
  assert.equal(consultas, antes);
});

test('rechaza meses y monedas inválidos sin consultar SQL', async () => {
  for (const query of ['', '?mes=2026-13', '?mes=2026-10&moneda=EUR', '?mes[]=2026-10', '?mes=2026-10&moneda=PEN&moneda=USD']) {
    const antes = consultas;
    assert.equal((await fetch(base + query, { headers })).status, 400, query);
    assert.equal(consultas, antes);
  }
});

test('consulta el mes completo y devuelve gastos, SUNAT e intereses separados', async () => {
  const response = await fetch(`${base}?mes=2026-10&moneda=PEN`, { headers });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const data = await response.json();
  assert.equal(data.resumen.gastos, 40);
  assert.equal(data.resumen.sunat, 10);
  assert.equal(data.resumen.intereses, 5);
  assert.equal(data.resumen.utilidad_neta, -55);
  assert.equal(parametros.inicio.toISOString(), '2026-10-01T00:00:00.000Z');
  assert.equal(parametros.fin.toISOString(), '2026-11-01T00:00:00.000Z');
  assert.equal(parametros.moneda, 'PEN');
});

test('propaga fallos de SQL sin devolver un EERR vacío o exitoso', async () => {
  errorSql = true;
  try {
    const response = await fetch(`${base}?mes=2026-10`, { headers });
    assert.equal(response.status, 500);
    assert.match((await response.json()).mensaje, /No fue posible/);
  } finally { errorSql = false; }
});

test('la vista anual valida año y moneda y requiere autenticación', async () => {
  assert.equal((await fetch(`${base}/anual?anio=2026`)).status, 401);
  for (const query of ['', '?anio=26', '?anio=9999', '?anio=2026&moneda=EUR', '?anio=2026&anio=2025']) {
    const antes = consultas;
    assert.equal((await fetch(`${base}/anual${query}`, { headers })).status, 400);
    assert.equal(consultas, antes);
  }
});

test('un año anterior consulta hasta su cierre y devuelve doce meses e indicadores', async () => {
  const response = await fetch(`${base}/anual?anio=2025&moneda=PEN`, { headers });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const data = await response.json();
  assert.equal(data.corte, '2025-12-31');
  assert.equal(data.meses.length, 12);
  assert.equal(data.indicadores.ventas, 0);
  assert.equal(data.indicadores.pedidos, 0);
  assert.equal(parametros.inicio.toISOString(), '2025-01-01T00:00:00.000Z');
  assert.equal(parametros.fin.toISOString(), '2026-01-01T00:00:00.000Z');
});

test('el corte anual respeta el día de Lima incluso en el límite de año y año bisiesto', () => {
  const { validarFiltrosAnuales } = require('../src/modules/eerr/eerr.model');
  assert.equal(validarFiltrosAnuales({ anio: '2024' }, '2024-02-29').fin.toISOString(), '2024-03-01T00:00:00.000Z');
  assert.equal(validarFiltrosAnuales({ anio: '2025' }, '2026-01-01').corte, '2025-12-31');
  assert.throws(() => validarFiltrosAnuales({ anio: '2027' }, '2026-12-31'));
});
