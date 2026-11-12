const ExcelJS = require('exceljs');

const ETIQUETAS = {
  REGISTRADO: 'Registrado', PARCIAL: 'Parcial', ENTREGADO: 'Entregado', CANCELADO: 'Cancelado',
  SIN_PAGO: 'Sin pago', PAGADO: 'Pagado', PENDIENTE: 'Con saldo pendiente', COMPLETO: 'Entrega completa'
};
const cantidad = new Intl.NumberFormat('es-PE', { maximumFractionDigits: 3 });
const dinero = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const precio = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
const simbolo = (moneda) => moneda === 'USD' ? '$' : 'S/.';
const fechaExcel = (valor) => valor ? new Date(`${valor}T00:00:00Z`) : null;

function fechaLima(fecha = new Date()) {
  const partes = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  }).formatToParts(fecha);
  const p = Object.fromEntries(partes.map(({ type, value }) => [type, value]));
  return { archivo: `${p.year}-${p.month}-${p.day}_${p.hour}-${p.minute}-${p.second}`, texto: `${p.day}/${p.month}/${p.year} ${p.hour}:${p.minute}:${p.second} (Perú)` };
}

function etiquetasFiltros(filtros, datos) {
  const rango = (desde, hasta) => !desde && !hasta ? 'Todas las fechas' : `${desde || 'Sin límite inicial'} hasta ${hasta || 'Sin límite final'}`;
  return [
    ['Fecha del pedido', rango(filtros.fecha_desde, filtros.fecha_hasta)],
    ['Clientes', datos.clientes.length ? datos.clientes.join('; ') : 'Todos'],
    ['Estado del pedido', ETIQUETAS[filtros.estado_pedido] || 'Todos'],
    ['Estado de pago', ETIQUETAS[filtros.estado_pago] || 'Todos'],
    ['Entregas', ({ PENDIENTE: 'Sin entregas', PARCIAL: 'Entrega parcial', COMPLETO: 'Entrega completa' })[filtros.estado_entrega] || 'Todas'],
    ['Fecha de última entrega', rango(filtros.entrega_desde, filtros.entrega_hasta)],
    ['Registrado por', datos.registradoPor || 'Todos'],
    ['Búsqueda', filtros.q || 'Sin búsqueda']
  ];
}

function marcarPresentaciones(detalles) {
  const grupos = new Map();
  for (const d of detalles) {
    const clave = [d.tipo_producto_id, d.material_id, d.medida_id, d.color_id, d.moneda_codigo, d.unidad].join('|');
    if (!grupos.has(clave)) grupos.set(clave, []);
    grupos.get(clave).push(d);
  }
  for (const grupo of grupos.values()) {
    const presentacion = (d) => d.cantidad_presentacion && d.unidad_presentacion ? `${Number(d.cantidad_presentacion)}|${d.unidad_presentacion}` : null;
    const mostrar = grupo.some((a) => presentacion(a) && grupo.some((b) => presentacion(b)
      && presentacion(a) !== presentacion(b) && Number(a.precio_unitario) !== Number(b.precio_unitario)));
    for (const d of grupo) d.presentacion_reporte = mostrar && presentacion(d)
      ? `${cantidad.format(d.cantidad_presentacion)} ${d.unidad_presentacion}` : '';
  }
  return detalles;
}

function descripcionDetalle(d) {
  return `${d.producto}${d.descripcion_item ? ` — ${d.descripcion_item}` : ''}${d.presentacion_reporte ? ` (Presentación: ${d.presentacion_reporte})` : ''}`
    + `\nPedido: ${cantidad.format(d.cantidad_pedida)} ${d.unidad} | Entregado: ${cantidad.format(d.cantidad_entregada)} ${d.unidad} | Pendiente: ${cantidad.format(d.cantidad_pendiente)} ${d.unidad}`
    + `\nPrecio: ${simbolo(d.moneda_codigo)} ${precio.format(d.precio_unitario)} por ${d.unidad} | Subtotal: ${simbolo(d.moneda_codigo)} ${dinero.format(d.subtotal)}`;
}

const FORMATO_CANTIDAD = '#,##0.00#';
const FORMATO_IMPORTE = '#,##0.00';
const PRINCIPAL = [
  ['N.º Pedido', 13], ['RUC', 16], ['Cliente', 34], ['Fecha del pedido', 18], ['Fecha de entrega', 18],
  ['Descripción', 90], ['Cantidad', 22], ['Monto total', 26], ['Estado de pago', 19], ['Estado del pedido', 20]
];
const DETALLE = [
  ['N.º Pedido', 13], ['RUC', 16], ['Cliente', 34], ['Fecha del pedido', 18], ['Fecha de entrega', 18],
  ['Producto', 45], ['Descripción del producto', 38], ['Presentación', 20], ['Cantidad pedida', 18], ['Unidad', 12],
  ['Entregado', 18], ['Pendiente', 18], ['Precio unitario', 20], ['Moneda', 12], ['Subtotal', 20],
  ['Estado de pago', 19], ['Estado del pedido', 20], ['Registrado por', 28]
];

function crearHoja(workbook, nombre, columnas, metadata) {
  const hoja = workbook.addWorksheet(nombre, {
    views: [{ state: 'frozen', ySplit: metadata.length + 5, xSplit: 3 }],
    pageSetup: { orientation: 'landscape', paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0 }
  });
  hoja.columns = columnas.map(([, width]) => ({ width }));
  hoja.properties.defaultRowHeight = 24;
  hoja.mergeCells(1, 1, 1, columnas.length);
  const titulo = hoja.getRow(1);
  titulo.getCell(1).value = nombre === 'Detalle' ? 'Detalle de Pedidos' : 'Reporte de Pedidos';
  titulo.getCell(1).font = { name: 'Calibri', size: 20, bold: true, color: { argb: 'FF12304A' } };
  titulo.height = 38;
  titulo.commit();
  for (const [i, [etiqueta, valor]] of metadata.entries()) {
    const n = i + 3;
    hoja.mergeCells(n, 3, n, columnas.length);
    const row = hoja.getRow(n);
    row.getCell(1).value = etiqueta;
    hoja.mergeCells(n, 1, n, 2);
    row.getCell(1).font = { name: 'Calibri', bold: true, color: { argb: 'FF12304A' } };
    row.getCell(3).value = valor;
    row.getCell(3).alignment = { vertical: 'top', wrapText: true };
    row.height = Math.min(120, 22 * Math.max(1, Math.ceil(String(valor).length / 115)));
    row.commit();
  }
  const cabecera = metadata.length + 5;
  const row = hoja.getRow(cabecera);
  row.values = columnas.map(([tituloColumna]) => tituloColumna);
  row.height = 32;
  row.eachCell((cell) => {
    cell.font = { name: 'Calibri', bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF245B83' } };
    cell.alignment = { vertical: 'middle', wrapText: true };
  });
  row.commit();
  hoja.pageSetup.printTitlesRow = `${cabecera}:${cabecera}`;
  return { hoja, cabecera, ultimo: cabecera };
}

function agregarFila(config, valores, altura = 28) {
  if (config.ultimo >= 1048576) throw new Error('El reporte supera el límite de filas de Excel. Reduce el rango de fechas.');
  const row = config.hoja.addRow(valores);
  config.ultimo = row.number;
  row.height = Math.min(409, altura);
  row.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = { name: 'Calibri', size: 11, color: { argb: 'FF243746' } };
    cell.alignment = { vertical: 'top', wrapText: true };
    if (row.number % 2 === 0) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
  });
  row.getCell(2).numFmt = '@';
  row.getCell(2).alignment = { vertical: 'top', horizontal: 'left' };
  for (const n of [4, 5]) row.getCell(n).numFmt = 'dd/mm/yyyy';
  return row;
}

async function escribirReporte({ filas, destino, filtros, datos, generado = new Date() }) {
  const fecha = fechaLima(generado);
  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: destino, useStyles: true, useSharedStrings: false });
  workbook.creator = datos.exportadoPor;
  workbook.created = generado;
  const metadata = [['Exportado por', datos.exportadoPor], ['Generado el', fecha.texto], ...etiquetasFiltros(filtros, datos)];
  const principal = crearHoja(workbook, 'Reporte de Pedidos', PRINCIPAL, metadata);
  const detalle = crearHoja(workbook, 'Detalle', DETALLE, metadata);
  let pedido = null;
  let detalles = [];
  let totalPedidos = 0;

  function guardarPedido() {
    if (!pedido) return;
    marcarPresentaciones(detalles);
    const cantidades = new Map();
    for (const d of detalles) cantidades.set(d.unidad, (cantidades.get(d.unidad) || 0) + Number(d.cantidad_pedida));
    const total = [];
    if (pedido.tiene_pen) total.push(`S/. ${dinero.format(pedido.total_pen)}`);
    if (pedido.tiene_usd) total.push(`$ ${dinero.format(pedido.total_usd)}`);
    const descripciones = detalles.map(descripcionDetalle).join('\n\n') || 'Sin productos activos';
    // Excel limita la longitud de una celda. El detalle siempre conserva todos
    // los productos en filas independientes, sin recortar sus datos.
    const descripcion = descripciones.length <= 32767 ? descripciones
      : `${descripciones.slice(0, 32000)}\n\nLa descripción continúa en la hoja Detalle (pedido ${pedido.pedido_id}).`;
    const fila = agregarFila(principal, [pedido.pedido_id, String(pedido.ruc), pedido.razon_social,
      fechaExcel(pedido.fecha_pedido), fechaExcel(pedido.ultima_entrega) || 'Sin entregas', descripcion,
      [...cantidades].map(([unidad, valor]) => `${cantidad.format(valor)} ${unidad}`).join('\n'),
      total.join('\n') || 'Sin monto', ETIQUETAS[pedido.estado_pago], ETIQUETAS[pedido.estado_pedido]],
    Math.max(42, descripcion.split('\n').reduce((n, linea) => n + Math.max(1, Math.ceil(linea.length / 85)), 0) * 16));
    fila.commit();
    for (const d of detalles) {
      const row = agregarFila(detalle, [pedido.pedido_id, String(pedido.ruc), pedido.razon_social,
        fechaExcel(pedido.fecha_pedido), fechaExcel(pedido.ultima_entrega) || 'Sin entregas', d.producto,
        d.descripcion_item || '', d.presentacion_reporte, Number(d.cantidad_pedida), d.unidad,
        Number(d.cantidad_entregada), Number(d.cantidad_pendiente), Number(d.precio_unitario), d.moneda_codigo,
        Number(d.subtotal), ETIQUETAS[pedido.estado_pago], ETIQUETAS[pedido.estado_pedido], pedido.registrado_por], 48);
      for (const col of [9, 11, 12]) row.getCell(col).numFmt = FORMATO_CANTIDAD;
      row.getCell(13).numFmt = `"${simbolo(d.moneda_codigo)}" #,##0.00##`;
      row.getCell(15).numFmt = `"${simbolo(d.moneda_codigo)}" ${FORMATO_IMPORTE}`;
      row.commit();
    }
    totalPedidos++;
  }

  try {
    for await (const fila of filas) {
      if (pedido && fila.pedido_id !== pedido.pedido_id) {
        guardarPedido();
        detalles = [];
      }
      pedido = fila;
      if (fila.pedido_detalle_id != null) detalles.push({ ...fila });
    }
    guardarPedido();
    for (const config of [principal, detalle]) {
      config.hoja.autoFilter = { from: { row: config.cabecera, column: 1 }, to: { row: config.ultimo, column: config.hoja.columns.length } };
      config.hoja.commit();
    }
    await workbook.commit();
    return totalPedidos;
  } catch (error) {
    workbook.zip.abort();
    throw error;
  }
}

module.exports = { escribirReporte, fechaLima, marcarPresentaciones, descripcionDetalle, etiquetasFiltros };
