// node --test tests/pedidos.reporte.api.test.js
// API real con consultas sustituidas por fixtures; sin acceso a la base de datos.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('node:stream');
const jwt = require('jsonwebtoken');
const ExcelJS = require('exceljs');
const { filasPrueba, datosPrueba } = require('./pedidos.reporte.fixture');
process.env.JWT_SECRET = 'pedidos-reporte-api-test-secret';
const consulta = require('../src/modules/pedidos/pedido.reporte.consulta');
let consultas = 0, filtrosRecibidos, usuarioRecibido, vacio = false, fallo = false, falloLectura = false;
consulta.contarPedidosReporte = async (filtros) => { consultas++; filtrosRecibidos = filtros; return 2; };
consulta.opcionesReporte = async () => ({ clientes: [{ cliente_id: 1, razon_social: 'Cliente', ruc: '00123456789' }], usuarios: [{ usuario_id: 7, nombre_completo: 'Exportador' }] });
consulta.datosExportacion = async (filtros, usuario) => { usuarioRecibido = usuario; return datosPrueba; };
consulta.abrirFilasReporte = async (filtros) => {
  consultas++;
  filtrosRecibidos = filtros;
  if (fallo) throw new Error('Fallo SQL simulado');
  if (falloLectura) return {
    stream: Readable.from((async function* () { yield filasPrueba()[0]; throw new Error('Fallo durante la lectura SQL'); })()),
    cancelar() {}
  };
  return { stream: Readable.from(vacio ? [] : filasPrueba()), cancelar() {} };
};
const app = require('../src/app');
const headers = { Authorization: `Bearer ${jwt.sign({ usuario_id: 7 }, process.env.JWT_SECRET)}` };
let server, base;
before(async () => {
  server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api/pedidos/reporte`;
});
after(async () => { await new Promise((resolve) => server.close(resolve)); });

test('las tres rutas requieren sesión y las rutas de reporte preceden al detalle de pedido', async () => {
  const antes = consultas;
  for (const ruta of ['', '/resumen', '/opciones']) assert.equal((await fetch(base + ruta)).status, 401);
  assert.equal(consultas, antes);
  const opciones = await fetch(`${base}/opciones`, { headers });
  assert.equal(opciones.status, 200);
  assert.equal((await opciones.json()).usuarios[0].usuario_id, 7);
});

test('filtros inválidos devuelven 400 antes de consultar SQL', async () => {
  for (const query of ['fecha_desde=2026-02-30', 'fecha_hasta=2026-99-99', 'fecha_desde=2026-11-01&fecha_hasta=2026-10-01', 'estado_pago=OTRO', 'cliente_ids=1,2abc', 'q=a&q=b']) {
    const antes = consultas;
    assert.equal((await fetch(`${base}/resumen?${query}`, { headers })).status, 400, query);
    assert.equal(consultas, antes);
  }
});

test('el resumen cuenta todos los pedidos filtrados sin paginación', async () => {
  const respuesta = await fetch(`${base}/resumen?cliente_ids=1,2&fecha_desde=2026-10-01&estado_pago=PENDIENTE`, { headers });
  assert.equal((await respuesta.json()).total, 2);
  assert.deepEqual(filtrosRecibidos.cliente_ids, [1, 2]);
  assert.equal(filtrosRecibidos.estado_pago, 'PENDIENTE');
});

test('descarga un XLSX válido con ambas hojas, autor autenticado, nombre y cabeceras CORS', async () => {
  const respuesta = await fetch(`${base}?fecha_desde=2026-09-01`, { headers: { ...headers, Origin: 'http://localhost:5173' } });
  assert.equal(respuesta.status, 200);
  assert.equal(respuesta.headers.get('cache-control'), 'no-store');
  assert.match(respuesta.headers.get('content-type'), /spreadsheetml.sheet/);
  assert.match(respuesta.headers.get('content-disposition'), /ReportePedidos\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.xlsx/);
  assert.match(respuesta.headers.get('access-control-expose-headers'), /Content-Disposition/i);
  assert.equal(usuarioRecibido, 7);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(Buffer.from(await respuesta.arrayBuffer()));
  assert.deepEqual(workbook.worksheets.map((h) => h.name), ['Reporte de Pedidos', 'Detalle']);
  assert.equal(workbook.creator, 'Persona que exporta');
});

test('sin coincidencias y fallos de SQL no producen archivos vacíos ni falsos éxitos', async () => {
  vacio = true;
  try {
    const response = await fetch(base, { headers });
    assert.equal(response.status, 404);
    assert.match((await response.json()).mensaje, /No hay pedidos/);
    assert.equal(response.headers.get('content-disposition'), null);
  } finally { vacio = false; }
  fallo = true;
  try {
    const response = await fetch(base, { headers });
    assert.equal(response.status, 500);
    assert.match(response.headers.get('content-type'), /json/);
  } finally { fallo = false; }
});

test('un error durante la lectura interrumpe la descarga y el servidor sigue disponible', async () => {
  falloLectura = true;
  try {
    const response = await fetch(base, { headers });
    if (response.ok) await assert.rejects(() => response.arrayBuffer());
    else assert.equal(response.status, 500);
  } finally { falloLectura = false; }
  assert.equal((await fetch(`${base}/resumen`, { headers })).status, 200);
});
