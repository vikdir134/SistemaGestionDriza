const { getConnection, sql } = require('../../config/db');

const listarPedidos = async () => {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT
      p.pedido_id,
      p.codigo_pedido,
      p.descripcion_pedido,
      p.fecha_pedido,
      p.fecha_entrega_estimada,
      p.estado_pedido,
      p.created_at,

      c.cliente_id,
      c.ruc,
      c.razon_social,

      u.nombre_completo AS registrado_por,

      COUNT(pd.pedido_detalle_id) AS cantidad_items
    FROM ventas.Pedido p
    INNER JOIN crm.Cliente c
      ON p.cliente_id = c.cliente_id
    INNER JOIN auth.Usuario u
      ON p.created_by_usuario_id = u.usuario_id
    LEFT JOIN ventas.PedidoDetalle pd
      ON p.pedido_id = pd.pedido_id
      AND pd.activo = 1
    GROUP BY
      p.pedido_id,
      p.codigo_pedido,
      p.descripcion_pedido,
      p.fecha_pedido,
      p.fecha_entrega_estimada,
      p.estado_pedido,
      p.created_at,
      c.cliente_id,
      c.ruc,
      c.razon_social,
      u.nombre_completo
    ORDER BY p.created_at DESC;
  `);

  return result.recordset;
};

const obtenerPedidoCabeceraPorId = async (pedido_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .query(`
      SELECT
        p.pedido_id,
        p.codigo_pedido,
        p.descripcion_pedido,
        p.fecha_pedido,
        p.fecha_entrega_estimada,
        p.estado_pedido,
        p.created_at,

        c.cliente_id,
        c.ruc,
        c.razon_social,
        c.direccion,

        u.nombre_completo AS registrado_por
      FROM ventas.Pedido p
      INNER JOIN crm.Cliente c
        ON p.cliente_id = c.cliente_id
      INNER JOIN auth.Usuario u
        ON p.created_by_usuario_id = u.usuario_id
      WHERE p.pedido_id = @pedido_id;
    `);

  return result.recordset[0];
};

const listarDetallesPedido = async (pedido_id) => {
  const pool = await getConnection();

  const result = await pool.request()
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
        c.nombre AS color,

        pd.material_id,
        mat.nombre AS material,

        pd.cantidad_pedida,
        pd.unidad_medida_id,
        um.codigo AS unidad,

        pd.cantidad_presentacion,
        pd.unidad_presentacion_id,
        up.codigo AS unidad_presentacion,

        pd.precio_unitario,
        pd.moneda_codigo,

        pd.descripcion_item,
        pd.observacion,

        CAST(pd.cantidad_pedida * pd.precio_unitario AS DECIMAL(18,2)) AS subtotal
      FROM ventas.PedidoDetalle pd
      INNER JOIN catalog.TipoProducto tp
        ON pd.tipo_producto_id = tp.tipo_producto_id
      INNER JOIN catalog.Medida m
        ON pd.medida_id = m.medida_id
      INNER JOIN catalog.Color c
        ON pd.color_id = c.color_id
      INNER JOIN catalog.Material mat
        ON pd.material_id = mat.material_id
      INNER JOIN catalog.UnidadMedida um
        ON pd.unidad_medida_id = um.unidad_medida_id
      LEFT JOIN catalog.UnidadMedida up
        ON pd.unidad_presentacion_id = up.unidad_medida_id
      WHERE pd.pedido_id = @pedido_id
        AND pd.activo = 1
      ORDER BY pd.pedido_detalle_id ASC;
    `);

  return result.recordset;
};

const obtenerPedidoPorId = async (pedido_id) => {
  const cabecera = await obtenerPedidoCabeceraPorId(pedido_id);

  if (!cabecera) {
    return null;
  }

  const detalles = await listarDetallesPedido(pedido_id);

  return {
    ...cabecera,
    detalles
  };
};

const crearPedidoConDetalles = async ({
  cliente_id,
  codigo_pedido,
  descripcion_pedido,
  fecha_pedido,
  fecha_entrega_estimada,
  detalles,
  created_by_usuario_id
}) => {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const requestPedido = new sql.Request(transaction);

    const pedidoResult = await requestPedido
      .input('cliente_id', sql.Int, cliente_id)
      .input('codigo_pedido', sql.VarChar(50), codigo_pedido || null)
      .input('descripcion_pedido', sql.NVarChar(500), descripcion_pedido || null)
      .input('fecha_pedido', sql.Date, fecha_pedido)
      .input('fecha_entrega_estimada', sql.Date, fecha_entrega_estimada || null)
      .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
      .query(`
        INSERT INTO ventas.Pedido (
          cliente_id,
          codigo_pedido,
          descripcion_pedido,
          fecha_pedido,
          fecha_entrega_estimada,
          estado_pedido,
          created_by_usuario_id
        )
        OUTPUT
          INSERTED.pedido_id,
          INSERTED.codigo_pedido,
          INSERTED.cliente_id,
          INSERTED.descripcion_pedido,
          INSERTED.fecha_pedido,
          INSERTED.fecha_entrega_estimada,
          INSERTED.estado_pedido,
          INSERTED.created_at
        VALUES (
          @cliente_id,
          @codigo_pedido,
          @descripcion_pedido,
          @fecha_pedido,
          @fecha_entrega_estimada,
          'REGISTRADO',
          @created_by_usuario_id
        );
      `);

    const pedido = pedidoResult.recordset[0];

    const requestCambio = new sql.Request(transaction);

    const cambioResult = await requestCambio
      .input('pedido_id', sql.Int, pedido.pedido_id)
      .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
      .query(`
        INSERT INTO ventas.PedidoCambio (
          pedido_id,
          tipo_cambio,
          descripcion_motivo,
          created_by_usuario_id
        )
        OUTPUT
          INSERTED.pedido_cambio_id
        VALUES (
          @pedido_id,
          'CREACION',
          'Registro inicial del pedido',
          @created_by_usuario_id
        );
      `);

    const pedido_cambio_id = cambioResult.recordset[0].pedido_cambio_id;

    const detallesCreados = [];

    for (const item of detalles) {
      const requestDetalle = new sql.Request(transaction);

      const detalleResult = await requestDetalle
        .input('pedido_id', sql.Int, pedido.pedido_id)
        .input('pedido_cambio_id', sql.Int, pedido_cambio_id)
        .input('producto_id', sql.Int, null)

        .input('tipo_producto_id', sql.Int, item.tipo_producto_id)
        .input('medida_id', sql.Int, item.medida_id)
        .input('color_id', sql.Int, item.color_id)
        .input('material_id', sql.Int, item.material_id)

        .input('cantidad_pedida', sql.Decimal(18, 3), item.cantidad_pedida)
        .input('unidad_medida_id', sql.Int, item.unidad_medida_id)

        .input('cantidad_presentacion', sql.Decimal(18, 3), item.cantidad_presentacion || null)
        .input('unidad_presentacion_id', sql.Int, item.unidad_presentacion_id || null)

        .input('precio_unitario', sql.Decimal(18, 4), item.precio_unitario)
        .input('moneda_codigo', sql.Char(3), item.moneda_codigo)

        .input('descripcion_item', sql.NVarChar(300), item.descripcion_item || null)
        .input('observacion', sql.NVarChar(300), item.observacion || null)
        .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
        .query(`
          INSERT INTO ventas.PedidoDetalle (
            pedido_id,
            pedido_cambio_id,
            producto_id,

            tipo_producto_id,
            medida_id,
            color_id,
            material_id,

            cantidad_pedida,
            unidad_medida_id,

            cantidad_presentacion,
            unidad_presentacion_id,

            precio_unitario,
            moneda_codigo,

            descripcion_item,
            observacion,
            created_by_usuario_id
          )
          OUTPUT
            INSERTED.pedido_detalle_id,
            INSERTED.pedido_id,
            INSERTED.tipo_producto_id,
            INSERTED.medida_id,
            INSERTED.color_id,
            INSERTED.material_id,
            INSERTED.cantidad_pedida,
            INSERTED.unidad_medida_id,
            INSERTED.cantidad_presentacion,
            INSERTED.unidad_presentacion_id,
            INSERTED.precio_unitario,
            INSERTED.moneda_codigo,
            INSERTED.descripcion_item,
            INSERTED.observacion
          VALUES (
            @pedido_id,
            @pedido_cambio_id,
            @producto_id,

            @tipo_producto_id,
            @medida_id,
            @color_id,
            @material_id,

            @cantidad_pedida,
            @unidad_medida_id,

            @cantidad_presentacion,
            @unidad_presentacion_id,

            @precio_unitario,
            @moneda_codigo,

            @descripcion_item,
            @observacion,
            @created_by_usuario_id
          );
        `);

      detallesCreados.push(detalleResult.recordset[0]);
    }

    await transaction.commit();

    return {
      pedido,
      detalles: detallesCreados
    };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  listarPedidos,
  obtenerPedidoPorId,
  crearPedidoConDetalles
};