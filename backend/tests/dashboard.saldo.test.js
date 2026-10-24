// Ejecutar desde backend: node --test tests/dashboard.saldo.test.js
// Requiere la conexión SQL configurada. Solo usa variables de tabla locales;
// no lee ni modifica movimientos reales.
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { getConnection, sql } = require('../src/config/db');
const { SALDOS_SQL } = require('../src/modules/dashboard/dashboard.model');

const tablas = {
  'finance.Deposito': 'moneda_codigo char(3), monto decimal(18,2)',
  'finance.Gasto': 'moneda_codigo char(3), monto decimal(18,2), activo bit',
  'compras.Compra': 'moneda_codigo char(3), monto_total decimal(18,2)',
  'compras.CompraMateriaPrima': 'moneda_codigo char(3), monto_total decimal(18,2)',
  'finance.Inversion': 'inversion_id int, moneda_codigo char(3), monto decimal(18,2), activo bit',
  'finance.InversionRetiro': 'inversion_id int, monto decimal(18,2), activo bit',
  'finance.Prestamo': 'prestamo_id int, moneda_codigo char(3), direccion varchar(10), capital decimal(18,2), activo bit',
  'finance.PrestamoPago': 'prestamo_id int, capital_pagado decimal(18,2), interes_pagado decimal(18,2), cargos_pagados decimal(18,2), activo bit'
};

const declaraciones = Object.entries(tablas).map(([tabla, campos]) =>
  `DECLARE @${tabla.replace('.', '_')} TABLE (${campos});`
).join('\n');
const consulta = Object.keys(tablas).sort((a, b) => b.length - a.length).reduce(
  (query, tabla) => query.replaceAll(tabla, `@${tabla.replace('.', '_')}`), SALDOS_SQL
);

after(async () => { await sql.close(); });

test('saldo sin movimientos devuelve una lista vacía', async () => {
  const pool = await getConnection();
  const result = await pool.request().query(declaraciones + consulta);
  assert.deepEqual(result.recordset, []);
});

test('incluye cada movimiento una vez, excluye anulados y separa monedas', async () => {
  const pool = await getConnection();
  const result = await pool.request().query(declaraciones + `
    INSERT INTO @finance_Deposito VALUES ('PEN',500),('PEN',500),('USD',10);
    INSERT INTO @finance_Gasto VALUES ('PEN',100,1),('PEN',999,0),('USD',25,1);
    INSERT INTO @compras_Compra VALUES ('PEN',200);
    INSERT INTO @compras_CompraMateriaPrima VALUES ('PEN',300);
    INSERT INTO @finance_Inversion VALUES (1,'PEN',500,1),(2,'PEN',999,0);
    INSERT INTO @finance_InversionRetiro VALUES (1,50,1),(1,999,0),(2,999,1);
    INSERT INTO @finance_Prestamo VALUES
      (1,'PEN','RECIBIDO',2000,1),(2,'PEN','OTORGADO',400,1),
      (3,'PEN','RECIBIDO',999,0),
      (4,'PEN','OTORGADO',100,1);
    INSERT INTO @finance_PrestamoPago VALUES
      (1,200,20,10,1),(2,100,15,5,1),(1,999,0,0,0),(3,999,0,0,1),
      (4,100,0,0,1);
  ` + consulta);
  // El préstamo 4 está totalmente cobrado: capital y cobro se compensan.
  assert.deepEqual(result.recordset, [
    { moneda_codigo: 'PEN', entradas: 3720, salidas: 1380, saldo: 2340 },
    { moneda_codigo: 'USD', entradas: 10, salidas: 25, saldo: -15 }
  ]);
});
