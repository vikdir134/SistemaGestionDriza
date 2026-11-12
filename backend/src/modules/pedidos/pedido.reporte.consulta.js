const { getConnection, sql } = require('../../config/db');

const ESTADOS_PEDIDO = ['REGISTRADO', 'PARCIAL', 'ENTREGADO', 'CANCELADO'];
const ESTADOS_PAGO = ['SIN_PAGO', 'PARCIAL', 'PAGADO', 'PENDIENTE'];
const ESTADOS_ENTREGA = ['PENDIENTE', 'PARCIAL', 'COMPLETO'];

const errorFiltro = (mensaje) => Object.assign(new Error(mensaje), { statusCode: 400 });

function validarFiltros(query = {}) {
  const filtros = {};
  for (const campo of ['fecha_desde', 'fecha_hasta', 'entrega_desde', 'entrega_hasta']) {
    const valor = query[campo];
    if (valor === undefined || valor === '') continue;
    const fecha = typeof valor === 'string' ? new Date(`${valor}T00:00:00Z`) : new Date(NaN);
    if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)
      || valor < '1753-01-01' || valor > '9999-12-31'
      || Number.isNaN(fecha.getTime()) || fecha.toISOString().slice(0, 10) !== valor) {
      throw errorFiltro('Ingresa una fecha válida (AAAA-MM-DD).');
    }
    filtros[campo] = valor;
  }
  for (const [desde, hasta] of [['fecha_desde', 'fecha_hasta'], ['entrega_desde', 'entrega_hasta']]) {
    if (filtros[desde] && filtros[hasta] && filtros[desde] > filtros[hasta]) {
      throw errorFiltro('La fecha inicial no puede ser posterior a la fecha final.');
    }
  }
  for (const [campo, opciones] of Object.entries({ estado_pedido: ESTADOS_PEDIDO, estado_pago: ESTADOS_PAGO, estado_entrega: ESTADOS_ENTREGA })) {
    if (query[campo] === undefined || query[campo] === '') continue;
    if (!opciones.includes(query[campo])) throw errorFiltro(`El filtro ${campo} no es válido.`);
    filtros[campo] = query[campo];
  }
  const positivo = (valor) => /^\d+$/.test(String(valor)) && Number.isSafeInteger(Number(valor)) && Number(valor) > 0 && Number(valor) <= 2147483647;
  if (query.cliente_ids !== undefined && query.cliente_ids !== '') {
    if (typeof query.cliente_ids !== 'string') throw errorFiltro('Los clientes no son válidos.');
    const ids = query.cliente_ids.split(',');
    if (ids.length > 200 || ids.some((id) => !positivo(id))) throw errorFiltro('Selecciona hasta 200 clientes válidos.');
    filtros.cliente_ids = [...new Set(ids.map(Number))];
  }
  if (query.registrado_por !== undefined && query.registrado_por !== '') {
    if (!positivo(query.registrado_por)) throw errorFiltro('El usuario seleccionado no es válido.');
    filtros.registrado_por = Number(query.registrado_por);
  }
  if (query.q !== undefined) {
    if (typeof query.q !== 'string' || query.q.length > 150) throw errorFiltro('La búsqueda admite hasta 150 caracteres.');
    filtros.q = query.q.trim();
  }
  return filtros;
}

// Entregas y depósitos se agregan por separado: sus cruces nunca multiplican
// cantidades ni importes. Las fechas filtran pedidos; los saldos son actuales.
const REPORTE_CTE = `
WITH PedidosBase AS (
  SELECT p.*, c.ruc, c.razon_social, u.nombre_completo AS registrado_por
  FROM ventas.Pedido p
  INNER JOIN crm.Cliente c ON c.cliente_id = p.cliente_id
  INNER JOIN auth.Usuario u ON u.usuario_id = p.created_by_usuario_id
  WHERE (@fecha_desde IS NULL OR p.fecha_pedido >= @fecha_desde)
    AND (@fecha_hasta IS NULL OR p.fecha_pedido <= @fecha_hasta)
    AND (@estado_pedido IS NULL OR p.estado_pedido = @estado_pedido)
    AND (@registrado_por IS NULL OR p.created_by_usuario_id = @registrado_por)
    AND (__CLIENTES__)
    AND (@q IS NULL OR c.ruc LIKE @q ESCAPE '~' OR c.razon_social LIKE @q ESCAPE '~'
      OR p.descripcion_pedido LIKE @q ESCAPE '~' OR p.codigo_pedido LIKE @q ESCAPE '~'
      OR CONVERT(VARCHAR(20), p.pedido_id) LIKE @q ESCAPE '~')
), DetallesBase AS (
  SELECT pd.* FROM ventas.PedidoDetalle pd
  INNER JOIN PedidosBase p ON p.pedido_id = pd.pedido_id WHERE pd.activo = 1
), EntregasPorDetalle AS (
  SELECT ed.pedido_detalle_id, SUM(ed.cantidad_entregada) AS cantidad_entregada
  FROM ventas.EntregaDetalle ed
  INNER JOIN DetallesBase pd ON pd.pedido_detalle_id = ed.pedido_detalle_id
  GROUP BY ed.pedido_detalle_id
), ResumenEntrega AS (
  SELECT pd.pedido_id,
    CASE WHEN MIN(CASE WHEN ISNULL(e.cantidad_entregada, 0) >= pd.cantidad_pedida THEN 1 ELSE 0 END) = 1 THEN 'COMPLETO'
      WHEN MAX(ISNULL(e.cantidad_entregada, 0)) > 0 THEN 'PARCIAL' ELSE 'PENDIENTE' END AS estado_entrega
  FROM DetallesBase pd
  LEFT JOIN EntregasPorDetalle e ON e.pedido_detalle_id = pd.pedido_detalle_id
  GROUP BY pd.pedido_id
), UltimaEntrega AS (
  SELECT e.pedido_id, MAX(e.fecha_entrega) AS ultima_entrega
  FROM ventas.Entrega e INNER JOIN PedidosBase p ON p.pedido_id = e.pedido_id
  GROUP BY e.pedido_id
), TotalesMoneda AS (
  SELECT pedido_id, moneda_codigo, SUM(cantidad_pedida * precio_unitario) AS total
  FROM DetallesBase GROUP BY pedido_id, moneda_codigo
), DepositosMoneda AS (
  SELECT d.pedido_id, d.moneda_codigo, SUM(d.monto) AS depositado
  FROM finance.Deposito d INNER JOIN PedidosBase p ON p.pedido_id = d.pedido_id
  GROUP BY d.pedido_id, d.moneda_codigo
), ResumenPago AS (
  SELECT t.pedido_id,
    CAST(SUM(CASE WHEN t.moneda_codigo = 'PEN' THEN t.total ELSE 0 END) AS DECIMAL(18,2)) AS total_pen,
    CAST(SUM(CASE WHEN t.moneda_codigo = 'USD' THEN t.total ELSE 0 END) AS DECIMAL(18,2)) AS total_usd,
    MAX(CASE WHEN t.moneda_codigo = 'PEN' THEN 1 ELSE 0 END) AS tiene_pen,
    MAX(CASE WHEN t.moneda_codigo = 'USD' THEN 1 ELSE 0 END) AS tiene_usd,
    CASE WHEN MIN(CASE WHEN ISNULL(d.depositado, 0) >= t.total THEN 1 ELSE 0 END) = 1 THEN 'PAGADO'
      WHEN MAX(ISNULL(d.depositado, 0)) > 0 THEN 'PARCIAL' ELSE 'SIN_PAGO' END AS estado_pago
  FROM TotalesMoneda t LEFT JOIN DepositosMoneda d ON d.pedido_id = t.pedido_id AND d.moneda_codigo = t.moneda_codigo
  GROUP BY t.pedido_id
), PedidosFiltrados AS (
  SELECT p.*, ue.ultima_entrega, ISNULL(re.estado_entrega, 'PENDIENTE') AS estado_entrega,
    ISNULL(rp.estado_pago, 'SIN_PAGO') AS estado_pago,
    rp.total_pen, rp.total_usd, rp.tiene_pen, rp.tiene_usd
  FROM PedidosBase p
  LEFT JOIN ResumenEntrega re ON re.pedido_id = p.pedido_id
  LEFT JOIN UltimaEntrega ue ON ue.pedido_id = p.pedido_id
  LEFT JOIN ResumenPago rp ON rp.pedido_id = p.pedido_id
  WHERE (@entrega_desde IS NULL OR ue.ultima_entrega >= @entrega_desde)
    AND (@entrega_hasta IS NULL OR ue.ultima_entrega <= @entrega_hasta)
    AND (@estado_entrega IS NULL OR ISNULL(re.estado_entrega, 'PENDIENTE') = @estado_entrega)
    AND (@estado_pago IS NULL OR ISNULL(rp.estado_pago, 'SIN_PAGO') = @estado_pago
      OR (@estado_pago = 'PENDIENTE' AND ISNULL(rp.estado_pago, 'SIN_PAGO') IN ('SIN_PAGO', 'PARCIAL')))
)
`;

const FILAS_SQL = `
SELECT p.pedido_id, p.ruc, p.razon_social,
  CONVERT(CHAR(10), p.fecha_pedido, 23) AS fecha_pedido,
  CONVERT(CHAR(10), p.ultima_entrega, 23) AS ultima_entrega,
  p.estado_pedido, p.estado_pago, p.registrado_por, p.total_pen, p.total_usd, p.tiene_pen, p.tiene_usd,
  pd.pedido_detalle_id, pd.producto_id, pd.tipo_producto_id, pd.material_id, pd.medida_id, pd.color_id,
  CONCAT(tp.nombre, ' ', mat.nombre, ' ', m.nombre, ' ', col.nombre) AS producto,
  pd.descripcion_item, pd.cantidad_pedida, um.codigo AS unidad,
  ISNULL(ed.cantidad_entregada, 0) AS cantidad_entregada,
  pd.cantidad_pedida - ISNULL(ed.cantidad_entregada, 0) AS cantidad_pendiente,
  pd.cantidad_presentacion, up.codigo AS unidad_presentacion,
  pd.precio_unitario, pd.moneda_codigo,
  CAST(pd.cantidad_pedida * pd.precio_unitario AS DECIMAL(18,2)) AS subtotal
FROM PedidosFiltrados p
LEFT JOIN DetallesBase pd ON pd.pedido_id = p.pedido_id
LEFT JOIN EntregasPorDetalle ed ON ed.pedido_detalle_id = pd.pedido_detalle_id
LEFT JOIN catalog.TipoProducto tp ON tp.tipo_producto_id = pd.tipo_producto_id
LEFT JOIN catalog.Material mat ON mat.material_id = pd.material_id
LEFT JOIN catalog.Medida m ON m.medida_id = pd.medida_id
LEFT JOIN catalog.Color col ON col.color_id = pd.color_id
LEFT JOIN catalog.UnidadMedida um ON um.unidad_medida_id = pd.unidad_medida_id
LEFT JOIN catalog.UnidadMedida up ON up.unidad_medida_id = pd.unidad_presentacion_id
ORDER BY p.fecha_pedido DESC, p.pedido_id DESC, pd.pedido_detalle_id ASC;
`;

function prepararConsulta(pool, filtros) {
  const request = pool.request();
  for (const campo of ['fecha_desde', 'fecha_hasta', 'entrega_desde', 'entrega_hasta']) request.input(campo, sql.Date, filtros[campo] || null);
  for (const campo of ['estado_pedido', 'estado_pago', 'estado_entrega']) request.input(campo, sql.VarChar(30), filtros[campo] || null);
  request.input('registrado_por', sql.Int, filtros.registrado_por || null);
  request.input('q', sql.NVarChar(310), filtros.q ? `%${filtros.q.replace(/[~%_\[]/g, '~$&')}%` : null);
  const ids = filtros.cliente_ids || [];
  ids.forEach((id, i) => request.input(`cliente_${i}`, sql.Int, id));
  return { request, cte: REPORTE_CTE.replace('__CLIENTES__', ids.length ? `p.cliente_id IN (${ids.map((_, i) => `@cliente_${i}`).join(',')})` : '1 = 1') };
}

async function contarPedidosReporte(filtros) {
  const { request, cte } = prepararConsulta(await getConnection(), filtros);
  const result = await request.query(cte + 'SELECT COUNT(*) AS total FROM PedidosFiltrados;');
  return result.recordset[0].total;
}

async function opcionesReporte() {
  const pool = await getConnection();
  const result = await pool.request().query(`
    SELECT c.cliente_id, c.ruc, c.razon_social FROM crm.Cliente c
    WHERE EXISTS (SELECT 1 FROM ventas.Pedido p WHERE p.cliente_id = c.cliente_id)
    ORDER BY c.razon_social;
    SELECT u.usuario_id, u.nombre_completo FROM auth.Usuario u
    WHERE EXISTS (SELECT 1 FROM ventas.Pedido p WHERE p.created_by_usuario_id = u.usuario_id)
    ORDER BY u.nombre_completo;
  `);
  return { clientes: result.recordsets[0], usuarios: result.recordsets[1] };
}

async function datosExportacion(filtros, usuarioId) {
  const pool = await getConnection();
  // Las etiquetas se resuelven en el servidor, nunca desde texto del navegador.
  const { request } = prepararConsulta(pool, filtros);
  request.input('exportador', sql.Int, usuarioId);
  const ids = filtros.cliente_ids || [];
  const result = await request.query(`
    SELECT nombre_completo FROM auth.Usuario WHERE usuario_id = @exportador;
    SELECT razon_social, ruc FROM crm.Cliente WHERE ${ids.length ? `cliente_id IN (${ids.map((_, i) => `@cliente_${i}`).join(',')})` : '1 = 0'} ORDER BY razon_social;
    SELECT nombre_completo FROM auth.Usuario WHERE usuario_id = @registrado_por;
  `);
  if (!result.recordsets[0][0]) throw Object.assign(new Error('No se encontró al usuario que exporta.'), { statusCode: 401 });
  return {
    exportadoPor: result.recordsets[0][0].nombre_completo,
    clientes: result.recordsets[1].map((c) => `${c.razon_social} (${c.ruc})`),
    registradoPor: result.recordsets[2][0]?.nombre_completo
  };
}

async function abrirFilasReporte(filtros) {
  const { request, cte } = prepararConsulta(await getConnection(), filtros);
  request.timeout = 120000;
  const stream = request.toReadableStream({ highWaterMark: 50 });
  // Una desconexión puede cancelar SQL antes de que se conecte el iterador.
  // El consumidor sigue recibiendo el error mediante el stream destruido.
  stream.on('error', () => {});
  const completado = request.query(cte + FILAS_SQL).catch((error) => { stream.destroy(error); });
  return { stream, cancelar: () => request.cancel(), completado };
}

module.exports = { validarFiltros, REPORTE_CTE, FILAS_SQL, prepararConsulta, contarPedidosReporte, opcionesReporte, datosExportacion, abrirFilasReporte };
