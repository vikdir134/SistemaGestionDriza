const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const jwt = require('jsonwebtoken');
const dbPath = require.resolve('../src/config/db');
let consultas = 0;
let parametros;
let fallo = false;
require.cache[dbPath] = { id: dbPath, filename: dbPath, loaded: true, exports: {
  sql: require('mssql'), getConnection: async () => ({ request() {
    parametros = {};
    return { input(key, type, value) { parametros[key] = value; return this; }, async query() {
      consultas++;
      if (fallo) throw new Error('Fallo SQL de prueba');
      return { recordset: [
        { clave: 'inversion:1', fecha: '2025-12-31', moneda_codigo: 'PEN', categoria: 'APORTES', sentido: 'ENTRADA', monto: 1000 },
        { clave: 'deposito:1', fecha: '2026-10-01', moneda_codigo: 'PEN', categoria: 'COBROS_CLIENTES', sentido: 'ENTRADA', monto: 500 },
        { clave: 'gasto:1', fecha: '2026-10-02', moneda_codigo: 'PEN', categoria: 'GASTOS', sentido: 'SALIDA', monto: 200 }
      ] };
    } };
  } })
} };
process.env.JWT_SECRET = 'clave-exclusiva-pruebas-caja';
const app = express();
app.use('/api/flujo-caja', require('../src/modules/flujoCaja/flujoCaja.routes'));
let server;
let base;
const headers = { Authorization: `Bearer ${jwt.sign({ usuario_id: 1 }, process.env.JWT_SECRET)}` };
before(async () => {
  server = await new Promise(resolve => { const listener = app.listen(0, '127.0.0.1', () => resolve(listener)); });
  base = `http://127.0.0.1:${server.address().port}/api/flujo-caja`;
});
after(async () => { await new Promise(resolve => server.close(resolve)); });

test('protege la ruta y valida filtros antes de consultar SQL', async () => {
  assert.equal((await fetch(`${base}?mes=2026-10`)).status, 401);
  for (const query of ['', '?mes=2026-13', '?mes=2026-10&moneda=EUR', '?mes=2026-10&mes=2026-09', '?vista=anual&anio=9999']) {
    const antes = consultas;
    assert.equal((await fetch(base + query, { headers })).status, 400);
    assert.equal(consultas, antes);
  }
});

test('devuelve saldo inicial, detalle y cierre mensual sin volver a ingresar la inversión anterior', async () => {
  const response = await fetch(`${base}?mes=2026-10`, { headers });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const data = await response.json();
  assert.deepEqual(data.resumen, { saldo_inicial: 1000, entradas: 500, salidas: 200, flujo_neto: 300, saldo_final: 1300 });
  assert.equal(data.anteriores.length, 1);
  assert.equal(data.movimientos.length, 2);
  assert.equal(parametros.fin.toISOString(), '2026-11-01T00:00:00.000Z');
});

test('la ruta anual devuelve doce puntos y separa monedas', async () => {
  const response = await fetch(`${base}?vista=anual&anio=2025&moneda=USD`, { headers });
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(data.serie.length, 12);
  assert.equal(data.corte, '2025-12-31');
  assert.equal(data.resumen.saldo_final, 0);
  assert.equal(parametros.moneda, 'USD');
});

test('un error SQL devuelve fallo, no saldos en cero', async () => {
  fallo = true;
  try { assert.equal((await fetch(`${base}?mes=2026-10`, { headers })).status, 500); }
  finally { fallo = false; }
});
