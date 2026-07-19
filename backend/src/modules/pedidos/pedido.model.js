const { getConnection, sql } = require('../../config/db');

const registrarHistorialPrecioCliente = async ({
  transaction,
  cliente_id,
  pedido_id,
  pedido_detalle_id,
  item,
  created_by_usuario_id
}) => {
  const requestPrecio = new sql.Request(transaction);

  await requestPrecio
    .input('cliente_id', sql.Int, cliente_id)
    .input('pedido_id', sql.Int, pedido_id)
    .input('pedido_detalle_id', sql.Int, pedido_detalle_id)
    .input('tipo_producto_id', sql.Int, item.tipo_producto_id)
    .input('medida_id', sql.Int, item.medida_id)
    .input('color_id', sql.Int, item.color_id)
    .input('material_id', sql.Int, item.material_id)
    .input('fecha_precio', sql.Date, new Date())
    .input('precio_unitario', sql.Decimal(18, 4), item.precio_unitario)
    .input('moneda_codigo', sql.Char(3), item.moneda_codigo)
    .input('observacion', sql.NVarChar(300), 'Precio registrado automáticamente desde pedido')
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO crm.ClientePrecioHistorial (
        cliente_id,
        pedido_id,
        pedido_detalle_id,
        tipo_producto_id,
        medida_id,
        color_id,
        material_id,
        fecha_precio,
        precio_unitario,
        moneda_codigo,
        observacion,
        created_by_usuario_id
      )
      VALUES (
        @cliente_id,
        @pedido_id,
        @pedido_detalle_id,
        @tipo_producto_id,
        @medida_id,
        @color_id,
        @material_id,
        @fecha_precio,
        @precio_unitario,
        @moneda_codigo,
        @observacion,
        @created_by_usuario_id
      );
    `);
};

const listarPedidos = async ({
  cliente_id,
  estado_pedido,
  q,
  page = 1,
  limit = 10
}) => {
  const pool = await getConnection();
  const offset = (page - 1) * limit;

  const result = await pool.request()
    .input('cliente_id', sql.Int, cliente_id || null)
    .input('estado_pedido', sql.VarChar(30), estado_pedido || null)
    .input('q', sql.NVarChar(150), q ? `%${q}%` : null)
    .input('offset', sql.Int, offset)
    .input('limit', sql.Int, limit)
    .query(`
      WITH PedidosResumen AS (
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

          COUNT(pd.pedido_detalle_id) AS cantidad_items,

          ISNULL(SUM(pd.cantidad_pedida * pd.precio_unitario), 0) AS total_referencial
        FROM ventas.Pedido p
        INNER JOIN crm.Cliente c
          ON p.cliente_id = c.cliente_id
        INNER JOIN auth.Usuario u
          ON p.created_by_usuario_id = u.usuario_id
        LEFT JOIN ventas.PedidoDetalle pd
          ON p.pedido_id = pd.pedido_id
          AND pd.activo = 1
        WHERE
          (@cliente_id IS NULL OR p.cliente_id = @cliente_id)
          AND (@estado_pedido IS NULL OR p.estado_pedido = @estado_pedido)
          AND (
            @q IS NULL
            OR c.razon_social LIKE @q
            OR c.ruc LIKE @q
            OR p.codigo_pedido LIKE @q
            OR p.descripcion_pedido LIKE @q
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
          c.ruc,
          c.razon_social,
          u.nombre_completo
      )
      SELECT
        *,
        COUNT(*) OVER() AS total_registros
      FROM PedidosResumen
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
        p.updated_at,

        c.cliente_id,
        c.ruc,
        c.razon_social,
        c.direccion,
        c.agencia_entrega,

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

        ISNULL(SUM(ed.cantidad_entregada), 0) AS cantidad_entregada,
        pd.cantidad_pedida - ISNULL(SUM(ed.cantidad_entregada), 0) AS cantidad_pendiente,

        CASE
          WHEN ISNULL(SUM(ed.cantidad_entregada), 0) >= pd.cantidad_pedida THEN 'COMPLETO'
          WHEN ISNULL(SUM(ed.cantidad_entregada), 0) > 0 THEN 'PARCIAL'
          ELSE 'PENDIENTE'
        END AS estado_entrega,

        pd.cantidad_presentacion,
        pd.unidad_presentacion_id,
        up.codigo AS unidad_presentacion,

        pd.precio_unitario,
        pd.moneda_codigo,

        CAST(pd.cantidad_pedida * pd.precio_unitario AS DECIMAL(18,2)) AS subtotal,

        pd.descripcion_item,
        pd.observacion,
        pd.created_at
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
        c.nombre,
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
        pd.observacion,
        pd.created_at
      ORDER BY pd.pedido_detalle_id ASC;
    `);

  return result.recordset;
};

const listarHistorialCambiosPedido = async (pedido_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .query(`
      SELECT
        pc.pedido_cambio_id,
        pc.pedido_id,
        pc.tipo_cambio,
        pc.descripcion_motivo,
        pc.created_at,
        u.nombre_completo AS registrado_por
      FROM ventas.PedidoCambio pc
      INNER JOIN auth.Usuario u
        ON pc.created_by_usuario_id = u.usuario_id
      WHERE pc.pedido_id = @pedido_id
      ORDER BY pc.created_at DESC;
    `);

  return result.recordset;
};

const obtenerPedidoPorId = async (pedido_id) => {
  const cabecera = await obtenerPedidoCabeceraPorId(pedido_id);

  if (!cabecera) {
    return null;
  }

  const detalles = await listarDetallesPedido(pedido_id);
  const historial_cambios = await listarHistorialCambiosPedido(pedido_id);

  return {
    ...cabecera,
    detalles,
    historial_cambios
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
        OUTPUT INSERTED.pedido_cambio_id
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

      const detalleCreado = detalleResult.recordset[0];

      await registrarHistorialPrecioCliente({
        transaction,
        cliente_id,
        pedido_id: pedido.pedido_id,
        pedido_detalle_id: detalleCreado.pedido_detalle_id,
        item,
        created_by_usuario_id
      });

      detallesCreados.push(detalleCreado);
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

const actualizarPedidoYAgregarDetalles = async ({
  pedido_id,
  cliente_id,
  codigo_pedido,
  descripcion_pedido,
  fecha_pedido,
  fecha_entrega_estimada,
  motivo_cambio,
  nuevos_detalles,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const tieneNuevosDetalles = nuevos_detalles.length > 0 ? 1 : 0;

    const requestPedido = new sql.Request(transaction);

    const pedidoResult = await requestPedido
      .input('pedido_id', sql.Int, pedido_id)
      .input('cliente_id', sql.Int, cliente_id)
      .input('codigo_pedido', sql.VarChar(50), codigo_pedido || null)
      .input('descripcion_pedido', sql.NVarChar(500), descripcion_pedido || null)
      .input('fecha_pedido', sql.Date, fecha_pedido)
      .input('fecha_entrega_estimada', sql.Date, fecha_entrega_estimada || null)
      .input('tiene_nuevos_detalles', sql.Bit, tieneNuevosDetalles)
      .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
      .query(`
        UPDATE ventas.Pedido
        SET
          cliente_id = @cliente_id,
          codigo_pedido = @codigo_pedido,
          descripcion_pedido = @descripcion_pedido,
          fecha_pedido = @fecha_pedido,
          fecha_entrega_estimada = @fecha_entrega_estimada,
          estado_pedido = CASE
            WHEN estado_pedido = 'ENTREGADO' AND @tiene_nuevos_detalles = 1 THEN 'PARCIAL'
            ELSE estado_pedido
          END,
          updated_at = SYSDATETIME(),
          updated_by_usuario_id = @updated_by_usuario_id
        OUTPUT
          INSERTED.pedido_id,
          INSERTED.codigo_pedido,
          INSERTED.cliente_id,
          INSERTED.descripcion_pedido,
          INSERTED.fecha_pedido,
          INSERTED.fecha_entrega_estimada,
          INSERTED.estado_pedido,
          INSERTED.updated_at
        WHERE pedido_id = @pedido_id
          AND estado_pedido <> 'CANCELADO';
      `);

    const pedido = pedidoResult.recordset[0];

    if (!pedido) {
      await transaction.rollback();
      return null;
    }

    const tipoCambio = nuevos_detalles.length > 0
      ? 'AUMENTO_PRODUCTOS'
      : 'EDICION';

    const requestCambio = new sql.Request(transaction);

    const cambioResult = await requestCambio
      .input('pedido_id', sql.Int, pedido_id)
      .input('tipo_cambio', sql.VarChar(40), tipoCambio)
      .input('descripcion_motivo', sql.NVarChar(500), motivo_cambio)
      .input('created_by_usuario_id', sql.Int, updated_by_usuario_id)
      .query(`
        INSERT INTO ventas.PedidoCambio (
          pedido_id,
          tipo_cambio,
          descripcion_motivo,
          created_by_usuario_id
        )
        OUTPUT INSERTED.pedido_cambio_id
        VALUES (
          @pedido_id,
          @tipo_cambio,
          @descripcion_motivo,
          @created_by_usuario_id
        );
      `);

    const pedido_cambio_id = cambioResult.recordset[0].pedido_cambio_id;
    const detallesCreados = [];

    for (const item of nuevos_detalles) {
      const requestDetalle = new sql.Request(transaction);

      const detalleResult = await requestDetalle
        .input('pedido_id', sql.Int, pedido_id)
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
        .input('created_by_usuario_id', sql.Int, updated_by_usuario_id)
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

      const detalleCreado = detalleResult.recordset[0];

      await registrarHistorialPrecioCliente({
        transaction,
        cliente_id,
        pedido_id,
        pedido_detalle_id: detalleCreado.pedido_detalle_id,
        item,
        created_by_usuario_id: updated_by_usuario_id
      });

      detallesCreados.push(detalleCreado);
    }

    await transaction.commit();

    return {
      pedido,
      detalles_agregados: detallesCreados
    };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  listarPedidos,
  obtenerPedidoPorId,
  crearPedidoConDetalles,
  actualizarPedidoYAgregarDetalles
};