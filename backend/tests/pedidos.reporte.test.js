// node --test tests/pedidos.reporte.test.js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { PassThrough } = require('node:stream');
const ExcelJS = require('exceljs');
const { validarFiltros } = require('../src/modules/pedidos/pedido.reporte.consulta');
const { escribirReporte, fechaLima, marcarPresentaciones } = require('../src/modules/pedidos/pedido.reporte.excel');
const { filasPrueba, datosPrueba } = require('./pedidos.reporte.fixture');

test('rechaza fechas imposibles, rangos invertidos, listas y estados inválidos', () => {
  for (const filtros of [
    { fecha_desde: '2026-02-30' }, { fecha_hasta: '2026-99-99' }, { fecha_desde: ['2026-10-01'] },
    { entrega_desde: '2026-11-02', entrega_hasta: '2026-11-01' }, { estado_pago: 'NO_EXISTE' },
    { cliente_ids: '1,2);DROP TABLE ventas.Pedido' }, { cliente_ids: ['1'] }, { registrado_por: -1 }, { q: ['texto'] }
  ]) assert.throws(() => validarFiltros(filtros), (error) => error.statusCode === 400);
  assert.deepEqual(validarFiltros({ cliente_ids: '1,2,1', fecha_desde: '2024-02-29', q: '  Cliente  ' }),
    { cliente_ids: [1, 2], fecha_desde: '2024-02-29', q: 'Cliente' });
});

test('el nombre del archivo conserva segundos y usa la fecha de Perú al cambiar de día', () => {
  assert.equal(fechaLima(new Date('2026-11-13T00:04:07Z')).archivo, '2026-11-12_19-04-07');
});

test('presentación se compara dentro del pedido, mismo producto, moneda y unidad', () => {
  const [a, b, c] = filasPrueba();
  const resultado = marcarPresentaciones([a, b, c]);
  assert.equal(resultado[0].presentacion_reporte, '5 KG');
  assert.equal(resultado[1].presentacion_reporte, '10 KG');
  assert.equal(resultado[2].presentacion_reporte, '');
  assert.equal(marcarPresentaciones([{ ...a }, { ...b, precio_unitario: 10 }])[0].presentacion_reporte, '');
  assert.equal(marcarPresentaciones([{ ...a }])[0].presentacion_reporte, '');
  assert.equal(marcarPresentaciones([{ ...a }, { ...b, moneda_codigo: 'USD' }])[0].presentacion_reporte, '');
});

async function generar(filas = filasPrueba()) {
  const destino = new PassThrough();
  const chunks = [];
  destino.on('data', (chunk) => chunks.push(chunk));
  await escribirReporte({ filas, destino, filtros: { fecha_desde: '2026-09-01', fecha_hasta: '2026-10-31' },
    datos: datosPrueba, generado: new Date('2026-11-13T00:04:07Z') });
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(Buffer.concat(chunks));
  return workbook;
}

test('Excel reabre con una fila por pedido, dos monedas, unidades, filtros y detalle numérico', async () => {
  const workbook = await generar();
  assert.deepEqual(workbook.worksheets.map((h) => h.name), ['Reporte de Pedidos', 'Detalle']);
  const principal = workbook.getWorksheet(1), detalle = workbook.getWorksheet(2);
  assert.equal(principal.getCell('A1').value, 'Reporte de Pedidos');
  assert.equal(principal.getCell('C3').value, 'Persona que exporta');
  assert.match(principal.getCell('C5').value, /2026-09-01 hasta 2026-10-31/);
  const header = principal.autoFilter.split(':')[0].replace(/\D/g, '');
  const n = Number(header) + 1;
  assert.equal(principal.lastRow.number, Number(header) + 2);
  assert.equal(principal.getCell(`B${n}`).value, '00123456789');
  assert.equal(principal.getCell(`B${n}`).numFmt, '@');
  assert.equal(principal.getCell(`D${n}`).value.toISOString().slice(0, 10), '2026-10-01');
  assert.equal(principal.getCell(`E${n}`).value.toISOString().slice(0, 10), '2026-11-05');
  assert.match(principal.getCell(`F${n}`).value, /Presentación: 5 KG/);
  assert.match(principal.getCell(`G${n}`).value, /150 KG\n2 UND/);
  assert.match(principal.getCell(`H${n}`).value, /S\/\. 1,600.00\n\$ 30.00/);
  assert.equal(principal.getCell(`I${n}`).value, 'Parcial');
  assert.equal(principal.getCell(`J${n}`).value, 'Parcial');
  assert.equal(principal.getCell(`E${n + 1}`).value, 'Sin entregas');
  assert.doesNotMatch(principal.getCell(`F${n + 1}`).value, /Presentación/);
  assert.equal(detalle.getCell(`I${n}`).value, 100);
  assert.equal(detalle.getCell(`M${n}`).value, 10);
  assert.equal(detalle.getCell(`O${n}`).value, 1000);
  assert.equal(detalle.getCell(`H${n + 2}`).value, null);
  assert.equal(detalle.lastRow.number, n + 3);
  assert.ok(principal.views[0].ySplit > 0);
});

test('textos parecidos a fórmulas se conservan como texto y no se ejecutan', async () => {
  const filas = filasPrueba().slice(0, 1).map((d) => ({ ...d, razon_social: '=1+1', descripcion_item: '+SUM(A1:A2)' }));
  const workbook = await generar(filas);
  const row = workbook.getWorksheet(1).lastRow;
  assert.equal(row.getCell(3).value, '=1+1');
  assert.equal(row.getCell(3).type, ExcelJS.ValueType.String);
});

test('descripciones extensas se remiten al Detalle y todos los productos se conservan', async () => {
  const base = filasPrueba()[0];
  const filas = Array.from({ length: 160 }, (_, i) => ({ ...base, pedido_detalle_id: i + 1, descripcion_item: 'Descripción '.repeat(25) }));
  const workbook = await generar(filas);
  assert.match(workbook.getWorksheet(1).lastRow.getCell(6).value, /continúa en la hoja Detalle/);
  assert.ok(workbook.getWorksheet(1).lastRow.getCell(6).value.length <= 32767);
  assert.equal(workbook.getWorksheet(2).lastRow.number - 15, 160);
});
