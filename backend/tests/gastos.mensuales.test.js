// Ejecutar desde backend: node --test tests/gastos.mensuales.test.js
// Las pruebas SQL usan únicamente variables de tabla; no modifican datos reales.
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { getConnection, sql } = require('../src/config/db');
const { GASTOS_SQL, limitesMes } = require('../src/modules/gastos/gasto.consulta');

const consulta = GASTOS_SQL.replaceAll('finance.Gasto', '@Gasto')
  .replaceAll('finance.TipoGasto', '@TipoGasto')
  .replaceAll('compras.Proveedor', '@Proveedor').replaceAll('auth.Usuario', '@Usuario');
const fixture = `
  DECLARE @Gasto TABLE (gasto_id int, tipo_gasto_id int, proveedor_id int,
    fecha_gasto date, monto decimal(18,2), moneda_codigo char(3), descripcion nvarchar(400),
    comprobante varchar(100), activo bit, created_at datetime2, created_by_usuario_id int,
    updated_by_usuario_id int);
  DECLARE @TipoGasto TABLE (tipo_gasto_id int, nombre nvarchar(100));
  DECLARE @Proveedor TABLE (proveedor_id int, razon_social nvarchar(200), ruc varchar(11));
  DECLARE @Usuario TABLE (usuario_id int, nombre_completo nvarchar(100));
  INSERT INTO @TipoGasto VALUES (1,'SERVICIOS'),(2,'TRANSPORTE');
  INSERT INTO @Proveedor VALUES (1,'Proveedor A','123'),(2,'Proveedor B','456');
  INSERT INTO @Usuario VALUES (1,'Usuario de prueba');
  INSERT INTO @Gasto VALUES
    (1,1,1,'2024-02-01',10,'PEN','Luz','A1',1,'2024-03-01',1,NULL),
    (2,2,2,'2024-02-29',20,'PEN','Combustible','B1',1,'2024-01-01',1,NULL),
    (3,2,2,'2024-02-29',30,'PEN','Combustible','B2',1,'2024-01-01',1,NULL),
    (4,1,NULL,'2024-02-15',4,'USD','Servicio','C1',1,'2024-02-15',1,NULL),
    (5,1,1,'2024-02-20',999,'PEN','Anulado','D1',0,'2024-02-20',1,NULL),
    (6,1,1,'2024-03-01',100,'PEN','Marzo','E1',1,'2024-03-01',1,NULL),
    (7,1,1,'2024-01-31',100,'PEN','Enero','F1',1,'2024-01-31',1,NULL);
`;
async function consultar({ mes = '2024-02', tipo = null, proveedor = null, moneda = null, q = null, offset = 0, limit = 10 } = {}) {
  const pool = await getConnection();
  const { inicio, fin } = limitesMes(mes);
  const result = await pool.request()
    .input('inicio', sql.Date, inicio).input('fin', sql.Date, fin)
    .input('tipo_gasto_id', sql.Int, tipo).input('proveedor_id', sql.Int, proveedor)
    .input('moneda_codigo', sql.Char(3), moneda).input('q', sql.NVarChar(402), q)
    .input('offset', sql.Int, offset).input('limit', sql.Int, limit)
    .query(fixture + consulta);
  const row = result.recordset[0];
  return { gastos: JSON.parse(row.gastos_json), total: row.total, resumen: JSON.parse(row.resumen_json), categorias: JSON.parse(row.categorias_json) };
}
after(async () => { await sql.close(); });

test('valida meses y calcula límites de diciembre y año bisiesto', () => {
  assert.equal(limitesMes('2024-02').fin.toISOString(), '2024-03-01T00:00:00.000Z');
  assert.equal(limitesMes('2024-12').fin.toISOString(), '2025-01-01T00:00:00.000Z');
  for (const value of ['2024-13', '2024-00', '24-01', '2024-02-01', ['2024-01']]) assert.throws(() => limitesMes(value));
});

test('filtra el mes completo, excluye anulados y ordena por fecha del gasto', async () => {
  const data = await consultar();
  assert.deepEqual(data.gastos.map(row => row.gasto_id), [3, 2, 4, 1]);
  assert.equal(data.total, 4);
  assert.deepEqual(data.resumen, [
    { moneda_codigo: 'PEN', cantidad: 3, total: 60 },
    { moneda_codigo: 'USD', cantidad: 1, total: 4 }
  ]);
  assert.equal(data.categorias.find(row => row.tipo_gasto_id === 2).total, 50);
});

test('los totales incluyen todas las páginas y se conservan en páginas vacías', async () => {
  const data = await consultar({ limit: 2 });
  assert.equal(data.gastos.length, 2);
  assert.equal(data.resumen[0].total, 60);
  const vacia = await consultar({ offset: 100 });
  assert.deepEqual(vacia.gastos, []);
  assert.equal(vacia.total, 4);
});

test('combina tipo, proveedor, moneda y búsqueda en detalle y resumen', async () => {
  const data = await consultar({ tipo: 2, proveedor: 2, moneda: 'PEN', q: '%B2%' });
  assert.deepEqual(data.gastos.map(row => row.gasto_id), [3]);
  assert.equal(data.total, 1);
  assert.equal(data.resumen[0].total, 30);
  assert.equal(data.categorias.length, 1);
  const vacia = await consultar({ q: '%Inexistente%' });
  assert.equal(vacia.total, 0);
  assert.deepEqual(vacia.resumen, []);
});

test('el listado general conserva el orden por fecha sin filtrar por mes', async () => {
  const data = await consultar({ mes: undefined });
  // undefined aplica el mes predeterminado del helper; null representa listado general.
  const general = await consultar({ mes: null });
  assert.equal(data.total, 4);
  assert.deepEqual(general.gastos.map(row => row.gasto_id), [6, 3, 2, 4, 1, 7]);
});
