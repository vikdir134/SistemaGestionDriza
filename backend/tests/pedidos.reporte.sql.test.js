// node --test tests/pedidos.reporte.sql.test.js
// Requiere conexión SQL. Solo variables de tabla; no lee ni modifica pedidos reales.
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { getConnection, sql } = require('../src/config/db');
const { REPORTE_CTE, FILAS_SQL, prepararConsulta } = require('../src/modules/pedidos/pedido.reporte.consulta');

const tablas = {
  'ventas.Pedido': 'pedido_id int, cliente_id int, fecha_pedido date, created_at date, created_by_usuario_id int, codigo_pedido varchar(50), descripcion_pedido nvarchar(500), estado_pedido varchar(30)',
  'ventas.PedidoDetalle': 'pedido_detalle_id int, pedido_id int, producto_id int, tipo_producto_id int, material_id int, medida_id int, color_id int, cantidad_pedida decimal(18,3), unidad_medida_id int, cantidad_presentacion decimal(18,3), unidad_presentacion_id int, precio_unitario decimal(18,4), moneda_codigo char(3), descripcion_item nvarchar(300), activo bit',
  'ventas.Entrega': 'entrega_id int, pedido_id int, fecha_entrega date',
  'ventas.EntregaDetalle': 'entrega_detalle_id int, entrega_id int, pedido_detalle_id int, cantidad_entregada decimal(18,3)',
  'crm.Cliente': 'cliente_id int, razon_social nvarchar(150), ruc varchar(11)',
  'auth.Usuario': 'usuario_id int, nombre_completo nvarchar(150)',
  'finance.Deposito': 'deposito_id int, pedido_id int, moneda_codigo char(3), monto decimal(18,2)',
  'catalog.TipoProducto': 'tipo_producto_id int, nombre nvarchar(100)',
  'catalog.Material': 'material_id int, nombre nvarchar(100)',
  'catalog.Medida': 'medida_id int, nombre nvarchar(100)',
  'catalog.Color': 'color_id int, nombre nvarchar(100)',
  'catalog.UnidadMedida': 'unidad_medida_id int, codigo varchar(20)'
};
const declaraciones = Object.entries(tablas).map(([tabla, campos]) => `DECLARE @${tabla.replace('.', '_')} TABLE (${campos});`).join('\n');
const reemplazar = (consulta) => Object.keys(tablas).sort((a, b) => b.length - a.length).reduce((q, tabla) => q.replaceAll(tabla, `@${tabla.replace('.', '_')}`), consulta);
const fixture = `
INSERT INTO @auth_Usuario VALUES (1, 'Usuario prueba'), (2, 'Otro usuario');
INSERT INTO @crm_Cliente VALUES (1, 'Cliente prueba', '00123456789'), (2, 'Otro cliente', '00987654321');
INSERT INTO @catalog_TipoProducto VALUES (1, 'Driza');
INSERT INTO @catalog_Material VALUES (1, 'Nylon');
INSERT INTO @catalog_Medida VALUES (1, '8 mm');
INSERT INTO @catalog_Color VALUES (1, 'Azul');
INSERT INTO @catalog_UnidadMedida VALUES (1, 'KG'), (2, 'UND');
INSERT INTO @ventas_Pedido VALUES
  (1,1,'2026-10-01','2026-11-01',1,NULL,'Pedido uno','PARCIAL'),
  (2,2,'2026-10-02','2026-10-02',2,NULL,'Pedido dos','REGISTRADO'),
  (3,1,'2026-09-01','2026-09-01',1,NULL,'Pedido tres','ENTREGADO'),
  (4,1,'2026-10-05','2026-10-05',1,NULL,'Sin productos','CANCELADO');
INSERT INTO @ventas_PedidoDetalle VALUES
  (1,1,1,1,1,1,1,100,1,5,1,10,'PEN',NULL,1),
  (2,1,1,1,1,1,1,50,1,10,1,12,'PEN',NULL,1),
  (3,1,1,1,1,1,1,2,2,NULL,NULL,15,'USD',NULL,1),
  (4,2,1,1,1,1,1,2,2,NULL,NULL,10,'USD',NULL,1),
  (5,3,1,1,1,1,1,1,1,NULL,NULL,10,'PEN',NULL,1),
  (6,1,1,1,1,1,1,999,1,NULL,NULL,99,'PEN',NULL,0);
INSERT INTO @ventas_Entrega VALUES (1,1,'2026-10-10'),(2,1,'2026-11-05'),(3,3,'2026-09-30');
INSERT INTO @ventas_EntregaDetalle VALUES (1,1,1,40),(2,2,1,60),(3,2,2,30),(4,3,5,1);
INSERT INTO @finance_Deposito VALUES (1,1,'PEN',1000),(2,1,'PEN',600),(3,3,'PEN',10);
`;

async function consultar(filtros = {}, extra = '') {
  const { request } = prepararConsulta(await getConnection(), filtros);
  const cte = REPORTE_CTE.replace('__CLIENTES__', filtros.cliente_ids?.length ? `p.cliente_id IN (${filtros.cliente_ids.map((_, i) => `@cliente_${i}`).join(',')})` : '1 = 1');
  return (await request.query(declaraciones + fixture + extra + reemplazar(cte + FILAS_SQL))).recordset;
}
after(async () => { await sql.close(); });

test('fecha digitada filtra pedidos y conserva entregas y pagos posteriores al período sin duplicar', async () => {
  const filas = await consultar({ fecha_desde: '2026-10-01', fecha_hasta: '2026-10-01' });
  assert.equal(filas.length, 3);
  assert.equal(filas[0].cantidad_entregada, 100);
  assert.equal(filas[1].cantidad_pendiente, 20);
  assert.equal(filas[0].ultima_entrega, '2026-11-05');
  assert.equal(filas[0].total_pen, 1600);
  assert.equal(filas[0].total_usd, 30);
  assert.equal(filas[0].estado_pago, 'PARCIAL');
});

test('pago completo exige cubrir todas las monedas; un abono pendiente se incluye en Con saldo pendiente', async () => {
  const pagados = await consultar({ estado_pago: 'PAGADO' });
  assert.deepEqual([...new Set(pagados.map((p) => p.pedido_id))], [3]);
  const filas = await consultar({ cliente_ids: [1], estado_pago: 'PAGADO' }, "INSERT INTO @finance_Deposito VALUES (4,1,'USD',30);");
  assert.ok(filas.some((p) => p.pedido_id === 1));
  const pendientes = await consultar({ estado_pago: 'PENDIENTE' });
  assert.ok(pendientes.some((p) => p.pedido_id === 1));
  assert.ok(pendientes.some((p) => p.pedido_id === 2));
});

test('filtros de usuario, clientes, entregas y última fecha funcionan combinados', async () => {
  const filas = await consultar({ cliente_ids: [1], registrado_por: 1, estado_entrega: 'PARCIAL', entrega_desde: '2026-11-01', entrega_hasta: '2026-11-30', q: 'Pedido uno' });
  assert.equal(filas.length, 3);
  assert.ok(filas.every((p) => p.pedido_id === 1));
  assert.equal((await consultar({ estado_entrega: 'PENDIENTE', registrado_por: 2 }))[0].pedido_id, 2);
  assert.equal((await consultar({ estado_pedido: 'CANCELADO' }))[0].pedido_detalle_id, null);
  assert.equal((await consultar({ q: '%' })).length, 0);
  assert.equal((await consultar({ q: 'inexistente' })).length, 0);
});
