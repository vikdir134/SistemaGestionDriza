// Solo variables de tabla de la sesión; no lee ni modifica movimientos reales.
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { getConnection, sql } = require('../src/config/db');
const { MOVIMIENTOS_CAJA_SQL } = require('../src/modules/flujoCaja/flujoCaja.consulta');
const { calcularFlujo, validarPeriodo } = require('../src/modules/flujoCaja/flujoCaja.calculo');
const { SALDOS_SQL } = require('../src/modules/dashboard/dashboard.model');
const tablas = {
  'finance.Deposito': 'deposito_id int, pedido_id int, fecha_deposito date, moneda_codigo char(3), monto decimal(18,2), numero_operacion varchar(100)',
  'ventas.Pedido': 'pedido_id int, cliente_id int, codigo_pedido varchar(50)',
  'crm.Cliente': 'cliente_id int, razon_social nvarchar(100)',
  'compras.Proveedor': 'proveedor_id int, razon_social nvarchar(100)',
  'finance.TipoGasto': 'tipo_gasto_id int, nombre nvarchar(100)',
  'finance.Gasto': 'gasto_id int, tipo_gasto_id int, proveedor_id int, fecha_gasto date, moneda_codigo char(3), monto decimal(18,2), descripcion nvarchar(100), comprobante varchar(100), activo bit',
  'compras.Compra': 'compra_id int, proveedor_id int, fecha_compra date, moneda_codigo char(3), monto_total decimal(18,2), descripcion nvarchar(100), numero_documento varchar(100)',
  'compras.CompraMateriaPrima': 'compra_materia_prima_id int, proveedor_id int, fecha_compra date, moneda_codigo char(3), monto_total decimal(18,2), nombre_lote nvarchar(100), numero_documento varchar(100)',
  'finance.Inversion': 'inversion_id int, fecha date, moneda_codigo char(3), monto decimal(18,2), motivo nvarchar(100), aportante nvarchar(100), activo bit',
  'finance.InversionRetiro': 'inversion_retiro_id int, inversion_id int, fecha date, monto decimal(18,2), observacion nvarchar(100), activo bit',
  'finance.Prestamo': 'prestamo_id int, fecha date, moneda_codigo char(3), direccion varchar(10), capital decimal(18,2), descripcion nvarchar(100), contraparte nvarchar(100), activo bit',
  'finance.PrestamoPago': 'pago_id int, prestamo_id int, fecha date, capital_pagado decimal(18,2), interes_pagado decimal(18,2), cargos_pagados decimal(18,2), observacion nvarchar(100), activo bit'
};
const declaraciones = Object.entries(tablas).map(([tabla, campos]) => `DECLARE @${tabla.replace('.', '_')} TABLE (${campos});`).join('\n');
const reemplazar = texto => Object.keys(tablas).sort((a, b) => b.length - a.length).reduce((query, tabla) => query.replaceAll(tabla, `@${tabla.replace('.', '_')}`), texto);
const fixture = `
  INSERT INTO @ventas_Pedido VALUES (1,1,'P1');
  INSERT INTO @crm_Cliente VALUES (1,'Cliente de prueba');
  INSERT INTO @compras_Proveedor VALUES (1,'Proveedor de prueba');
  INSERT INTO @finance_TipoGasto VALUES (1,'Luz'),(2,' sunat ');
  INSERT INTO @finance_Deposito VALUES (1,1,'2026-10-05','PEN',500,'A'),(2,1,'2026-10-05','PEN',500,'B'),(3,1,'2026-10-05','USD',10,'C');
  INSERT INTO @finance_Gasto VALUES (1,1,1,'2026-10-05','PEN',100,'Luz',NULL,1),(2,2,NULL,'2026-10-05','PEN',30,'Renta',NULL,1),(3,1,NULL,'2026-10-05','PEN',999,'Anulado',NULL,0),(4,1,NULL,'2026-10-05','USD',25,'Luz',NULL,1);
  INSERT INTO @compras_Compra VALUES (1,1,'2026-10-05','PEN',200,'Compra','C1');
  INSERT INTO @compras_CompraMateriaPrima VALUES (1,1,'2026-10-05','PEN',300,'Lote','MP1');
  INSERT INTO @finance_Inversion VALUES (1,'2026-09-20','PEN',1000,'Inicio','Socio',1),(2,'2026-09-20','PEN',999,'Anulado','Socio',0);
  INSERT INTO @finance_InversionRetiro VALUES (1,1,'2026-10-06',50,'Devolución',1),(2,1,'2026-10-06',999,'Anulado',0),(3,2,'2026-10-06',999,'Padre anulado',1);
  INSERT INTO @finance_Prestamo VALUES (1,'2026-10-01','PEN','RECIBIDO',2000,'Préstamo','Banco',1),(2,'2026-10-02','PEN','OTORGADO',400,'Otorgado','Persona',1),(3,'2026-10-03','PEN','RECIBIDO',999,'Anulado','Banco',0),(4,'2026-10-04','PEN','OTORGADO',100,'Otorgado','Persona',1);
  INSERT INTO @finance_PrestamoPago VALUES (1,1,'2026-10-05',200,20,10,'Cuota',1),(2,2,'2026-10-05',100,15,5,'Cobro',1),(3,1,'2026-10-05',999,999,999,'Anulado',0),(4,3,'2026-10-05',999,999,999,'Padre anulado',1),(5,4,'2026-10-07',100,0,0,'Cobro total',1);
`;
async function consultar(mes = '2026-10', moneda = 'PEN', cambios = '') {
  const filtros = validarPeriodo({ mes, moneda }, '2026-11-06');
  const pool = await getConnection();
  const result = await pool.request().input('moneda', sql.Char(3), moneda).input('fin', sql.Date, filtros.fin)
    .query(declaraciones + fixture + cambios + reemplazar(MOVIMIENTOS_CAJA_SQL));
  return calcularFlujo({ ...filtros, movimientos: result.recordset });
}
after(async () => { await sql.close(); });

test('SQL incluye cada fuente una vez, desglosa cuotas y excluye anulados', async () => {
  const data = await consultar();
  assert.deepEqual(data.resumen, { saldo_inicial: 1000, entradas: 3220, salidas: 1410, flujo_neto: 1810, saldo_final: 2810 });
  assert.equal(data.movimientos.filter(row => row.categoria === 'COBROS_CLIENTES').length, 2);
  assert.equal(data.categorias.find(row => row.codigo === 'SUNAT').total, 30);
  assert.equal(data.categorias.find(row => row.codigo === 'GASTOS').total, 100);
  assert.equal(data.movimientos.filter(row => row.clave.startsWith('pago_prestamo:1:')).length, 3);
  assert.equal(new Set([...data.anteriores, ...data.movimientos].map(row => row.clave)).size, data.anteriores.length + data.movimientos.length);
});

test('el cierre concilia con el saldo del dashboard para el mismo historial', async () => {
  const pool = await getConnection();
  const result = await pool.request().query(declaraciones + fixture + reemplazar(SALDOS_SQL));
  const data = await consultar();
  assert.equal(result.recordset.find(row => row.moneda_codigo === 'PEN').saldo, data.resumen.saldo_final);
});

test('SQL arrastra saldo, separa monedas y cuenta cobros en el mes de pago', async () => {
  const data = await consultar('2026-11', 'PEN', "INSERT INTO @finance_Deposito VALUES (4,1,'2026-11-03','PEN',100,'Noviembre'),(5,1,'2026-11-10','PEN',999,'Futuro');");
  assert.equal(data.resumen.saldo_inicial, 2810);
  assert.equal(data.resumen.entradas, 100);
  assert.equal(data.resumen.saldo_final, 2910);
  const usd = await consultar('2026-10', 'USD');
  assert.deepEqual(usd.resumen, { saldo_inicial: 0, entradas: 10, salidas: 25, flujo_neto: -15, saldo_final: -15 });
});
