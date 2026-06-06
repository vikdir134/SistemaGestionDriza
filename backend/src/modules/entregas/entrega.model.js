const { getConnection, sql } = require('../../config/db');

const listarPedidosParaEntrega = async ({
  cliente_id,
  q,
  page = 1,
  limit = 10
}) => {
  const pool = await getConnection();

  const offset = (page - 1) * limit;

  const result = await pool.request()
    .input('cliente_id', sql.Int, cliente_id || null)
    .input('q', sql.NVarChar(150), q ? `%${q}%` : null)
    .input('offset', sql.Int, offset)
    .input('limit', sql.Int, limit)
    .query(`
      WITH Detalles AS (
        SELECT
          pd.pedido_id,
          pd.pedido_detalle_id,
          pd.cantidad_pedida,
          ISNULL(SUM(ed.cantidad_entregada), 0) AS cantidad_entregada
        FROM ventas.PedidoDetalle pd
        LEFT JOIN ventas.EntregaDetalle ed
          ON pd.pedido_detalle_id = ed.pedido_detalle_id
        WHERE pd.activo = 1
        GROUP BY
          pd.pedido_id,
          pd.pedido_detalle_id,
          pd.cantidad_pedida
      ),
      Resumen AS (
        SELECT
          p.pedido_id,
          p.codigo_pedido,
          p.descripcion_pedido,
          p.fecha_pedido,
          p.fecha_entrega_estimada,
          p.estado_pedido,
          p.created_at,

          c.cliente_id,
          c.razon_social,
          c.ruc,

          COUNT(d.pedido_detalle_id) AS cantidad_items,

          SUM(CASE 
            WHEN d.cantidad_entregada >= d.cantidad_pedida THEN 1 
            ELSE 0 
          END) AS items_completos,

          SUM(CASE 
            WHEN d.cantidad_entregada > 0 
             AND d.cantidad_entregada < d.cantidad_pedida THEN 1 
            ELSE 0 
          END) AS items_parciales,

          SUM(CASE 
            WHEN d.cantidad_entregada = 0 THEN 1 
            ELSE 0 
          END) AS items_pendientes
        FROM ventas.Pedido p
        INNER JOIN crm.Cliente c
          ON p.cliente_id = c.cliente_id
        INNER JOIN Detalles d
          ON p.pedido_id = d.pedido_id
        WHERE p.estado_pedido IN ('REGISTRADO', 'PARCIAL')
          AND (@cliente_id IS NULL OR p.cliente_id = @cliente_id)
          AND (
            @q IS NULL
            OR c.razon_social LIKE @q
            OR c.ruc LIKE @q
            OR p.descripcion_pedido LIKE @q
            OR p.codigo_pedido LIKE @q
          )
        GROUP BY
          p.pedido_id,
          p.codigo_pedido,
          p.descripcion_pedido,
          p.fecha_pedido,
          p.fecha_entrega_estimada,
          p.estado_pedido,
          p.created_at,
          c.cliente_id,
          c.razon_social,
          c.ruc
      )
      SELECT
        *,
        CASE
          WHEN items_completos = cantidad_items THEN 'COMPLETO'
          WHEN items_parciales > 0 OR items_completos > 0 THEN 'PARCIAL'
          ELSE 'PENDIENTE'
        END AS estado_entrega_general,
        COUNT(*) OVER() AS total_registros
      FROM Resumen
      ORDER BY created_at DESC
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY;
    `);

  const pedidos = result.recordset;

  const total = pedidos.length > 0
    ? pedidos[0].total_registros
    : 0;

  return {
    pedidos,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas: Math.ceil(total / limit)
    }
  };
};

const obtenerPedidoParaEntrega = async (pedido_id) => {
  const pool = await getConnection();

  const pedidoResult = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .query(`
      SELECT
        p.pedido_id,
        p.codigo_pedido,
        p.descripcion_pedido,
        p.fecha_pedido,
        p.fecha_entrega_estimada,
        p.estado_pedido,
        c.cliente_id,
        c.razon_social,
        c.ruc,
        c.direccion
      FROM ventas.Pedido p
      INNER JOIN crm.Cliente c
        ON p.cliente_id = c.cliente_id
      WHERE p.pedido_id = @pedido_id;
    `);

  const pedido = pedidoResult.recordset[0];

  if (!pedido) {
    return null;
  }

  const detallesResult = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .query(`
      SELECT
        pd.pedido_detalle_id,
        pd.pedido_id,

        pd.tipo_producto_id,
        tp.nombre AS tipo_producto,

        pd.medida_id,
        m.nombre AS medida,

        pd.color_id,
        col.nombre AS color,

        pd.material_id,
        mat.nombre AS material,

        pd.cantidad_pedida,
        pd.unidad_medida_id,
        um.codigo AS unidad,

        ISNULL(SUM(ed.cantidad_entregada), 0) AS cantidad_entregada,

        pd.cantidad_pedida - ISNULL(SUM(ed.cantidad_entregada), 0) AS cantidad_pendiente,

        CASE
          WHEN ISNULL(SUM(ed.cantidad_entregada), 0) >= pd.cantidad_pedida THEN 'COMPLETO'
          WHEN ISNULL(SUM(ed.cantidad_entregada), 0) > 0 THEN 'PARCIAL'
          ELSE 'PENDIENTE'
        END AS estado_item,

        pd.cantidad_presentacion,
        pd.unidad_presentacion_id,
        up.codigo AS unidad_presentacion,

        pd.precio_unitario,
        pd.moneda_codigo,
        pd.descripcion_item,
        pd.observacion
      FROM ventas.PedidoDetalle pd
      INNER JOIN catalog.TipoProducto tp
        ON pd.tipo_producto_id = tp.tipo_producto_id
      INNER JOIN catalog.Medida m
        ON pd.medida_id = m.medida_id
      INNER JOIN catalog.Color col
        ON pd.color_id = col.color_id
      INNER JOIN catalog.Material mat
        ON pd.material_id = mat.material_id
      INNER JOIN catalog.UnidadMedida um
        ON pd.unidad_medida_id = um.unidad_medida_id
      LEFT JOIN catalog.UnidadMedida up
        ON pd.unidad_presentacion_id = up.unidad_medida_id
      LEFT JOIN ventas.EntregaDetalle ed
        ON pd.pedido_detalle_id = ed.pedido_detalle_id
      WHERE pd.pedido_id = @pedido_id
        AND pd.activo = 1
      GROUP BY
        pd.pedido_detalle_id,
        pd.pedido_id,
        pd.tipo_producto_id,
        tp.nombre,
        pd.medida_id,
        m.nombre,
        pd.color_id,
        col.nombre,
        pd.material_id,
        mat.nombre,
        pd.cantidad_pedida,
        pd.unidad_medida_id,
        um.codigo,
        pd.cantidad_presentacion,
        pd.unidad_presentacion_id,
        up.codigo,
        pd.precio_unitario,
        pd.moneda_codigo,
        pd.descripcion_item,
        pd.observacion
      ORDER BY pd.pedido_detalle_id ASC;
    `);

  const detalles = detallesResult.recordset;

  const historialResult = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .query(`
      SELECT
        e.entrega_id,
        e.fecha_entrega,
        e.comentario_entrega,
        e.created_at,
        u.nombre_completo AS registrado_por,

        ed.entrega_detalle_id,
        ed.pedido_detalle_id,
        ed.cantidad_entregada,
        ed.observacion,

        tp.nombre AS tipo_producto,
        m.nombre AS medida,
        col.nombre AS color,
        mat.nombre AS material,
        um.codigo AS unidad
      FROM ventas.Entrega e
      INNER JOIN auth.Usuario u
        ON e.created_by_usuario_id = u.usuario_id
      INNER JOIN ventas.EntregaDetalle ed
        ON e.entrega_id = ed.entrega_id
      INNER JOIN ventas.PedidoDetalle pd
        ON ed.pedido_detalle_id = pd.pedido_detalle_id
      INNER JOIN catalog.TipoProducto tp
        ON pd.tipo_producto_id = tp.tipo_producto_id
      INNER JOIN catalog.Medida m
        ON pd.medida_id = m.medida_id
      INNER JOIN catalog.Color col
        ON pd.color_id = col.color_id
      INNER JOIN catalog.Material mat
        ON pd.material_id = mat.material_id
      INNER JOIN catalog.UnidadMedida um
        ON ed.unidad_medida_id = um.unidad_medida_id
      WHERE e.pedido_id = @pedido_id
      ORDER BY e.fecha_entrega DESC, e.entrega_id DESC, ed.entrega_detalle_id ASC;
    `);

  const entregasMap = new Map();

  historialResult.recordset.forEach((row) => {
    if (!entregasMap.has(row.entrega_id)) {
      entregasMap.set(row.entrega_id, {
        entrega_id: row.entrega_id,
        fecha_entrega: row.fecha_entrega,
        comentario_entrega: row.comentario_entrega,
        created_at: row.created_at,
        registrado_por: row.registrado_por,
        detalles: []
      });
    }

    entregasMap.get(row.entrega_id).detalles.push({
      entrega_detalle_id: row.entrega_detalle_id,
      pedido_detalle_id: row.pedido_detalle_id,
      cantidad_entregada: row.cantidad_entregada,
      observacion: row.observacion,
      producto: `${row.tipo_producto} ${row.material} ${row.medida} ${row.color}`,
      unidad: row.unidad
    });
  });

  let estado_entrega_general = 'PENDIENTE';

  if (detalles.length > 0 && detalles.every((d) => d.estado_item === 'COMPLETO')) {
    estado_entrega_general = 'COMPLETO';
  } else if (detalles.some((d) => d.estado_item === 'PARCIAL' || d.estado_item === 'COMPLETO')) {
    estado_entrega_general = 'PARCIAL';
  }

  return {
    ...pedido,
    estado_entrega_general,
    detalles,
    historial_entregas: Array.from(entregasMap.values())
  };
};

const crearEntregaConDetalles = async ({
  pedido_id,
  fecha_entrega,
  comentario_entrega,
  detalles,
  created_by_usuario_id
}) => {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const requestEntrega = new sql.Request(transaction);

    const entregaResult = await requestEntrega
      .input('pedido_id', sql.Int, pedido_id)
      .input('fecha_entrega', sql.Date, fecha_entrega)
      .input('comentario_entrega', sql.NVarChar(500), comentario_entrega || null)
      .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
      .query(`
        INSERT INTO ventas.Entrega (
          pedido_id,
          fecha_entrega,
          comentario_entrega,
          created_by_usuario_id
        )
        OUTPUT
          INSERTED.entrega_id,
          INSERTED.pedido_id,
          INSERTED.fecha_entrega,
          INSERTED.comentario_entrega,
          INSERTED.created_at
        VALUES (
          @pedido_id,
          @fecha_entrega,
          @comentario_entrega,
          @created_by_usuario_id
        );
      `);

    const entrega = entregaResult.recordset[0];
    const detallesCreados = [];

    for (const item of detalles) {
      const requestDetalle = new sql.Request(transaction);

      const detalleResult = await requestDetalle
  .input('entrega_id', sql.Int, entrega.entrega_id)
  .input('pedido_detalle_id', sql.Int, item.pedido_detalle_id)
  .input('cantidad_entregada', sql.Decimal(18, 3), item.cantidad_entregada)
  .input('unidad_medida_id', sql.Int, item.unidad_medida_id)
  .input('observacion', sql.NVarChar(300), item.observacion || null)
  .query(`
    DECLARE @DetalleInsertado TABLE (
      entrega_detalle_id INT,
      entrega_id INT,
      pedido_detalle_id INT,
      cantidad_entregada DECIMAL(18,3),
      unidad_medida_id INT,
      observacion NVARCHAR(300)
    );

    INSERT INTO ventas.EntregaDetalle (
      entrega_id,
      pedido_detalle_id,
      cantidad_entregada,
      unidad_medida_id,
      observacion
    )
    OUTPUT
      INSERTED.entrega_detalle_id,
      INSERTED.entrega_id,
      INSERTED.pedido_detalle_id,
      INSERTED.cantidad_entregada,
      INSERTED.unidad_medida_id,
      INSERTED.observacion
    INTO @DetalleInsertado
    VALUES (
      @entrega_id,
      @pedido_detalle_id,
      @cantidad_entregada,
      @unidad_medida_id,
      @observacion
    );

    SELECT *
    FROM @DetalleInsertado;
  `);

      detallesCreados.push(detalleResult.recordset[0]);
    }

    const requestEstado = new sql.Request(transaction);

    await requestEstado
      .input('pedido_id', sql.Int, pedido_id)
      .input('updated_by_usuario_id', sql.Int, created_by_usuario_id)
      .query(`
        UPDATE ventas.Pedido
        SET
          estado_pedido = CASE
            WHEN NOT EXISTS (
              SELECT 1
              FROM ventas.PedidoDetalle pd
              OUTER APPLY (
                SELECT ISNULL(SUM(ed.cantidad_entregada), 0) AS total_entregado
                FROM ventas.EntregaDetalle ed
                WHERE ed.pedido_detalle_id = pd.pedido_detalle_id
              ) entregas
              WHERE pd.pedido_id = @pedido_id
                AND pd.activo = 1
                AND entregas.total_entregado < pd.cantidad_pedida
            )
            THEN 'ENTREGADO'
            ELSE 'PARCIAL'
          END,
          updated_at = SYSDATETIME(),
          updated_by_usuario_id = @updated_by_usuario_id
        WHERE pedido_id = @pedido_id;
      `);

    await transaction.commit();

    return {
      entrega,
      detalles: detallesCreados
    };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  listarPedidosParaEntrega,
  obtenerPedidoParaEntrega,
  crearEntregaConDetalles
};