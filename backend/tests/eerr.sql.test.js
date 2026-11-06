// Ejecutar desde backend: node --test tests/eerr.sql.test.js
// Requiere SQL Server configurado. Usa variables de tabla y una tabla temporal;
// no consulta ni modifica pedidos, pagos o inventario reales.
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { getConnection, sql } = require('../src/config/db');
const { EERR_SQL, PEDIDOS_ANUALES_SQL } = require('../src/modules/eerr/eerr.consulta');
const { calcularEerrAnual } = require('../src/modules/eerr/eerr.anual');
const { calcularEerr } = require('../src/modules/eerr/eerr.calculo');
const { limitesMes } = require('../src/modules/gastos/gasto.consulta');

const tablas = {
  'ventas.EntregaDetalle': 'entrega_detalle_id int, entrega_id int, pedido_detalle_id int, cantidad_entregada decimal(18,3), unidad_medida_id int',
  'ventas.Entrega': 'entrega_id int, pedido_id int, fecha_entrega date',
  'ventas.PedidoDetalle': 'pedido_detalle_id int, pedido_id int, precio_unitario decimal(18,4), moneda_codigo char(3), tipo_producto_id int, material_id int, medida_id int, color_id int, activo bit, cantidad_pedida decimal(18,3)',
  'ventas.Pedido': 'pedido_id int, codigo_pedido varchar(50), cliente_id int, fecha_pedido date, estado_pedido varchar(30)',
  'crm.Cliente': 'cliente_id int, razon_social nvarchar(100), ruc varchar(11)',
  'catalog.UnidadMedida': 'unidad_medida_id int, codigo varchar(20)',
  'catalog.TipoProducto': 'tipo_producto_id int, nombre nvarchar(100)',
  'catalog.Material': 'material_id int, nombre nvarchar(100)',
  'catalog.Medida': 'medida_id int, nombre nvarchar(100)',
  'catalog.Color': 'color_id int, nombre nvarchar(100)',
  'finance.Deposito': 'deposito_id int, pedido_id int, moneda_codigo char(3), monto decimal(18,2), fecha_deposito date, numero_operacion varchar(50)',
  'inventario.MovimientoProductoTerminado': 'movimiento_producto_terminado_id int, stock_producto_terminado_id int, tipo_movimiento varchar(30), cantidad decimal(18,3), produccion_detalle_id int, entrega_detalle_id int',
  'produccion.ProduccionDetalle': 'produccion_detalle_id int, produccion_id int, cantidad_producida decimal(18,3)',
  'inventario.MovimientoMateriaPrima': 'movimiento_materia_prima_id int, produccion_detalle_id int, stock_materia_prima_lote_id int, cantidad decimal(18,3), tipo_movimiento varchar(30)',
  'inventario.StockMateriaPrimaLote': 'stock_materia_prima_lote_id int, compra_materia_prima_detalle_id int',
  'compras.CompraMateriaPrimaDetalle': 'compra_materia_prima_detalle_id int, compra_materia_prima_id int, precio_unitario decimal(18,4), material_id int, color_id int, unidad_medida_id int',
  'compras.CompraMateriaPrima': 'compra_materia_prima_id int, nombre_lote nvarchar(100), moneda_codigo char(3)',
  'finance.Gasto': 'gasto_id int, fecha_gasto date, monto decimal(18,2), moneda_codigo char(3), tipo_gasto_id int, proveedor_id int, descripcion nvarchar(100), comprobante varchar(50), activo bit',
  'finance.TipoGasto': 'tipo_gasto_id int, nombre nvarchar(100)',
  'compras.Proveedor': 'proveedor_id int, razon_social nvarchar(100)',
  'finance.PrestamoPago': 'pago_id int, prestamo_id int, fecha date, interes_pagado decimal(18,2), capital_pagado decimal(18,2), cargos_pagados decimal(18,2), observacion nvarchar(100), cuota_id int, activo bit',
  'finance.Prestamo': 'prestamo_id int, moneda_codigo char(3), contraparte nvarchar(100), activo bit, direccion varchar(10)'
};
const declaraciones = Object.entries(tablas).map(([nombre, columnas]) =>
  `DECLARE @${nombre.replace('.', '_')} TABLE (${columnas});`).join('\n');
const consulta = Object.keys(tablas).sort((a, b) => b.length - a.length).reduce((query, tabla) =>
  query.replaceAll(tabla, `@${tabla.replace('.', '_')}`), EERR_SQL);
const fixture = `
  INSERT INTO @crm_Cliente VALUES (1,'Cliente prueba','00000000000');
  INSERT INTO @catalog_UnidadMedida VALUES (1,'KG');
  INSERT INTO @catalog_TipoProducto VALUES (1,'Driza');
  INSERT INTO @catalog_Material VALUES (1,'Materia prima');
  INSERT INTO @catalog_Medida VALUES (1,'8 mm');
  INSERT INTO @catalog_Color VALUES (1,'Azul');
  INSERT INTO @ventas_Pedido VALUES (1,'P1',1,'2026-10-01','REGISTRADO'),(2,'P2',1,'2026-09-01','ENTREGADO');
  INSERT INTO @ventas_PedidoDetalle VALUES (1,1,10,'PEN',1,1,1,1,1,100),(2,2,20,'USD',1,1,1,1,1,10);
  INSERT INTO @ventas_Entrega VALUES (10,1,'2026-10-10'),(11,1,'2026-11-05'),(12,2,'2026-09-01');
  INSERT INTO @ventas_EntregaDetalle VALUES (10,10,1,40,1),(11,11,1,60,1),(12,12,2,10,1);
  INSERT INTO @finance_Deposito VALUES (1,1,'PEN',100,'2026-10-05','A'),(2,1,'PEN',900,'2026-11-10','B'),(3,1,'USD',999,'2026-10-01','C');
  INSERT INTO @produccion_ProduccionDetalle VALUES (1,1,100),(2,2,20);
  INSERT INTO @inventario_MovimientoProductoTerminado VALUES
    (1,1,'ENTRADA_PRODUCCION',100,1,NULL),(2,1,'SALIDA_ENTREGA',10,NULL,12),
    (3,1,'ENTRADA_PRODUCCION',20,2,NULL),(4,1,'SALIDA_ENTREGA',40,NULL,10),
    (5,1,'SALIDA_ENTREGA',60,NULL,11);
  INSERT INTO @compras_CompraMateriaPrima VALUES (1,'Lote A','PEN'),(2,'Lote B','PEN'),(3,'Lote C','PEN');
  INSERT INTO @compras_CompraMateriaPrimaDetalle VALUES (1,1,4,1,1,1),(2,2,8,1,1,1),(3,3,6,1,1,1);
  INSERT INTO @inventario_StockMateriaPrimaLote VALUES (1,1),(2,2),(3,3);
  INSERT INTO @inventario_MovimientoMateriaPrima VALUES
    (1,1,1,50,'SALIDA_PRODUCCION'),(2,1,2,50,'SALIDA_PRODUCCION'),
    (3,2,3,20,'SALIDA_PRODUCCION'),(4,NULL,1,999,'SALIDA_MERMA');
  INSERT INTO @finance_TipoGasto VALUES (1,'Personal'),(2,'SUNAT');
  INSERT INTO @finance_Gasto VALUES
    (1,'2026-10-15',50,'PEN',1,NULL,'Personal',NULL,1),
    (2,'2026-10-20',20,'PEN',2,NULL,'Renta',NULL,1),
    (3,'2026-10-20',999,'PEN',1,NULL,'Anulado',NULL,0),
    (4,'2026-11-01',888,'PEN',2,NULL,'Otro mes',NULL,1),
    (5,'2026-10-20',777,'USD',1,NULL,'Otra moneda',NULL,1);
  INSERT INTO @finance_Prestamo VALUES
    (1,'PEN','Recibido',1,'RECIBIDO'),(2,'PEN','Otorgado',1,'OTORGADO'),(3,'PEN','Inactivo',0,'RECIBIDO');
  INSERT INTO @finance_PrestamoPago VALUES
    (1,1,'2026-10-25',10,100,20,'Pago mixto',NULL,1),
    (2,2,'2026-10-25',999,100,0,'Otorgado',NULL,1),
    (3,1,'2026-10-25',999,100,0,'Anulado',NULL,0),
    (4,3,'2026-10-25',999,100,0,'Inactivo',NULL,1),
    (5,1,'2026-11-25',15,100,0,'Otro mes',NULL,1);
`;

async function consultar(mes, moneda = 'PEN', cambios = '') {
  const pool = await getConnection();
  const { inicio, fin } = limitesMes(mes);
  const result = await pool.request().input('inicio', sql.Date, inicio)
    .input('fin', sql.Date, fin).input('moneda', sql.Char(3), moneda)
    .query(declaraciones + fixture + cambios + consulta);
  assert.equal(result.recordsets.length, 6);
  const [ventas, depositos, movimientos, consumos, gastos, intereses] = result.recordsets;
  return calcularEerr({ mes, moneda, ventas, depositos, movimientos, consumos, gastos, intereses });
}
after(async () => { await sql.close(); });

test('SQL calcula entregas, FIFO y solo intereses recibidos; excluye anulados y capital', async () => {
  const result = await consultar('2026-10');
  assert.equal(result.completo, true);
  assert.deepEqual(result.resumen, {
    ventas_cubiertas: 100, ventas_credito: 300, ventas: 400, costo_ventas: 240,
    costo_identificado: 240, utilidad_bruta: 160, gastos: 50, utilidad_operacional: 110,
    sunat: 20, intereses: 10, financieros_impuestos: 30, utilidad_neta: 80
  });
  assert.deepEqual(result.detalles.intereses.map(row => row.pago_id), [1]);
  assert.deepEqual(result.detalles.gastos.map(row => row.gasto_id), [1]);
});

test('SQL conserva octubre y reconoce solamente la segunda entrega en noviembre', async () => {
  const noviembre = await consultar('2026-11');
  assert.equal(noviembre.resumen.ventas, 600);
  assert.equal(noviembre.resumen.ventas_credito, 600);
  assert.equal(noviembre.resumen.costo_ventas, 360);
  const octubre = await consultar('2026-10');
  assert.equal(octubre.resumen.ventas_cubiertas, 100);
  assert.equal(octubre.resumen.ventas_credito, 300);
});

test('SQL toma el precio editado y no inventa conversión de monedas', async () => {
  const editado = await consultar('2026-10', 'PEN', 'UPDATE @ventas_PedidoDetalle SET precio_unitario=12 WHERE pedido_detalle_id=1;');
  assert.equal(editado.resumen.ventas, 480);
  const dolares = await consultar('2026-09', 'USD');
  assert.equal(dolares.resumen.ventas, 200);
  assert.equal(dolares.resumen.costo_ventas, null);
  assert.equal(dolares.completo, false);
});

test('SQL anual no multiplica pedidos con varias líneas y conserva el saldo por cobrar mes a mes', async () => {
  const pool = await getConnection();
  const query = Object.keys(tablas).sort((a, b) => b.length - a.length).reduce((texto, tabla) =>
    texto.replaceAll(tabla, `@${tabla.replace('.', '_')}`), EERR_SQL + PEDIDOS_ANUALES_SQL);
  const cambios = `INSERT INTO @ventas_PedidoDetalle VALUES (3,1,5,'PEN',1,1,1,1,1,10);
    INSERT INTO @ventas_Pedido VALUES (3,'CANCELADO',1,'2026-10-01','CANCELADO');
    INSERT INTO @ventas_PedidoDetalle VALUES (4,3,5,'PEN',1,1,1,1,1,10);`;
  const result = await pool.request().input('inicio', sql.Date, '2026-01-01')
    .input('fin', sql.Date, '2027-01-01').input('moneda', sql.Char(3), 'PEN')
    .query(declaraciones + fixture + cambios + query);
  assert.equal(result.recordsets.length, 7);
  const [ventas, depositos, movimientos, consumos, gastos, intereses, pedidos] = result.recordsets;
  const data = calcularEerrAnual({ anio: '2026', corte: '2026-12-31', moneda: 'PEN', ventas, depositos, movimientos, consumos, gastos, intereses, pedidos });
  assert.equal(data.indicadores.pedidos, 1);
  assert.equal(data.detalles.pedidos[0].monto, 1050);
  assert.equal(data.indicadores.clientes, 1);
  assert.equal(data.indicadores.ventas, 1000);
  assert.equal(data.meses[9].cuentas_por_cobrar, 300);
  assert.equal(data.meses[10].cuentas_por_cobrar, 0);
  assert.equal(data.resumen.costo_ventas, 600);
  assert.equal(data.clientes[0].importe, 1000);
});
