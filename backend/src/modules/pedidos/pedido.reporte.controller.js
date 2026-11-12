const { validarFiltros, contarPedidosReporte, opcionesReporte, datosExportacion, abrirFilasReporte } = require('./pedido.reporte.consulta');
const { escribirReporte, fechaLima } = require('./pedido.reporte.excel');

function responderError(res, error) {
  console.error('Error reporte de pedidos:', error.message);
  if (res.headersSent) { res.destroy(error); return; }
  res.removeHeader('Content-Disposition');
  res.removeHeader('Content-Type');
  res.status(error.statusCode || 500).json({ mensaje: error.statusCode ? error.message : 'No se pudo generar el reporte de pedidos. Inténtalo nuevamente.' });
}

async function obtenerOpcionesReporte(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try { res.json(await opcionesReporte()); } catch (error) { responderError(res, error); }
}

async function obtenerResumenReporte(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try { res.json({ total: await contarPedidosReporte(validarFiltros(req.query)) }); }
  catch (error) { responderError(res, error); }
}

async function exportarReporte(req, res) {
  let consulta;
  const cancelar = () => { if (!res.writableFinished) consulta?.cancelar(); };
  try {
    const filtros = validarFiltros(req.query);
    const datos = await datosExportacion(filtros, req.usuario.usuario_id);
    if (res.destroyed) return;
    consulta = await abrirFilasReporte(filtros);
    if (res.destroyed) { consulta.cancelar(); return; }
    res.on('close', cancelar);
    const iterador = consulta.stream[Symbol.asyncIterator]();
    const primero = await iterador.next();
    if (primero.done) {
      return res.status(404).json({ mensaje: 'No hay pedidos que coincidan con los filtros elegidos.' });
    }
    async function* filas() {
      yield primero.value;
      for (let siguiente = await iterador.next(); !siguiente.done; siguiente = await iterador.next()) yield siguiente.value;
    }
    const generado = new Date();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="ReportePedidos${fechaLima(generado).archivo}.xlsx"`);
    res.setHeader('Cache-Control', 'no-store');
    await escribirReporte({ filas: filas(), destino: res, filtros, datos, generado });
  } catch (error) {
    consulta?.cancelar();
    responderError(res, error);
  } finally {
    res.off('close', cancelar);
  }
}

module.exports = { obtenerOpcionesReporte, obtenerResumenReporte, exportarReporte };
