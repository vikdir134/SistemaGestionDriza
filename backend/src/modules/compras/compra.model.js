const { getConnection, sql } = require('../../config/db');

const listarCompras = async ({
  proveedor_id,
  q,
  page = 1,
  limit = 10
}) => {
  const pool = await getConnection();

  const offset = (page - 1) * limit;

  const result = await pool.request()
    .input('proveedor_id', sql.Int, proveedor_id || null)
    .input('q', sql.NVarChar(150), q ? `%${q}%` : null)
    .input('offset', sql.Int, offset)
    .input('limit', sql.Int, limit)
    .query(`
      WITH ComprasResumen AS (
        SELECT
          c.compra_id,
          c.proveedor_id,
          p.ruc,
          p.razon_social,
          c.fecha_compra,
          c.numero_documento,
          c.monto_total,
          c.moneda_codigo,
          c.descripcion,
          c.created_at,
          u.nombre_completo AS registrado_por,
          COUNT(cd.compra_detalle_id) AS cantidad_items
        FROM compras.Compra c
        INNER JOIN compras.Proveedor p
          ON c.proveedor_id = p.proveedor_id
        INNER JOIN auth.Usuario u
          ON c.created_by_usuario_id = u.usuario_id
        LEFT JOIN compras.CompraDetalle cd
          ON c.compra_id = cd.compra_id
        WHERE
          (@proveedor_id IS NULL OR c.proveedor_id = @proveedor_id)
          AND (
            @q IS NULL
            OR p.razon_social LIKE @q
            OR p.ruc LIKE @q
            OR c.numero_documento LIKE @q
            OR c.descripcion LIKE @q
          )
        GROUP BY
          c.compra_id,
          c.proveedor_id,
          p.ruc,
          p.razon_social,
          c.fecha_compra,
          c.numero_documento,
          c.monto_total,
          c.moneda_codigo,
          c.descripcion,
          c.created_at,
          u.nombre_completo
      )
      SELECT
        *,
        COUNT(*) OVER() AS total_registros
      FROM ComprasResumen
      ORDER BY created_at DESC
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY;
    `);

  const compras = result.recordset;

  const total = compras.length > 0
    ? compras[0].total_registros
    : 0;

  return {
    compras,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas: Math.ceil(total / limit)
    }
  };
};

const obtenerCompraPorId = async (compra_id) => {
  const pool = await getConnection();

  const compraResult = await pool.request()
    .input('compra_id', sql.Int, compra_id)
    .query(`
      SELECT
        c.compra_id,
        c.proveedor_id,
        p.ruc,
        p.razon_social,
        p.direccion,
        c.fecha_compra,
        c.numero_documento,
        c.monto_total,
        c.moneda_codigo,
        c.descripcion,
        c.created_at,
        u.nombre_completo AS registrado_por
      FROM compras.Compra c
      INNER JOIN compras.Proveedor p
        ON c.proveedor_id = p.proveedor_id
      INNER JOIN auth.Usuario u
        ON c.created_by_usuario_id = u.usuario_id
      WHERE c.compra_id = @compra_id;
    `);

  const compra = compraResult.recordset[0];

  if (!compra) {
    return null;
  }

  const detallesResult = await pool.request()
    .input('compra_id', sql.Int, compra_id)
    .query(`
      SELECT
        cd.compra_detalle_id,
        cd.compra_id,
        cd.producto_id,
        cd.material_id,
        m.nombre AS material,
        cd.descripcion_item,
        cd.cantidad,
        cd.unidad_medida_id,
        um.codigo AS unidad,
        cd.precio_unitario,
        cd.subtotal
      FROM compras.CompraDetalle cd
      LEFT JOIN catalog.Material m
        ON cd.material_id = m.material_id
      INNER JOIN catalog.UnidadMedida um
        ON cd.unidad_medida_id = um.unidad_medida_id
      WHERE cd.compra_id = @compra_id
      ORDER BY cd.compra_detalle_id ASC;
    `);

  return {
    ...compra,
    detalles: detallesResult.recordset
  };
};

const crearCompraConDetalles = async ({
  proveedor_id,
  fecha_compra,
  numero_documento,
  moneda_codigo,
  descripcion,
  detalles,
  created_by_usuario_id
}) => {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const monto_total = detalles.reduce((total, item) => {
      return total + Number(item.cantidad) * Number(item.precio_unitario);
    }, 0);

    const requestCompra = new sql.Request(transaction);

    const compraResult = await requestCompra
      .input('proveedor_id', sql.Int, proveedor_id)
      .input('fecha_compra', sql.Date, fecha_compra)
      .input('numero_documento', sql.VarChar(100), numero_documento || null)
      .input('monto_total', sql.Decimal(18, 2), monto_total)
      .input('moneda_codigo', sql.Char(3), moneda_codigo)
      .input('descripcion', sql.NVarChar(400), descripcion || null)
      .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
      .query(`
        INSERT INTO compras.Compra (
          proveedor_id,
          fecha_compra,
          numero_documento,
          monto_total,
          moneda_codigo,
          descripcion,
          created_by_usuario_id
        )
        OUTPUT
          INSERTED.compra_id,
          INSERTED.proveedor_id,
          INSERTED.fecha_compra,
          INSERTED.numero_documento,
          INSERTED.monto_total,
          INSERTED.moneda_codigo,
          INSERTED.descripcion,
          INSERTED.created_at
        VALUES (
          @proveedor_id,
          @fecha_compra,
          @numero_documento,
          @monto_total,
          @moneda_codigo,
          @descripcion,
          @created_by_usuario_id
        );
      `);

    const compra = compraResult.recordset[0];

    const detallesCreados = [];

    for (const item of detalles) {
      const requestDetalle = new sql.Request(transaction);

      const detalleResult = await requestDetalle
        .input('compra_id', sql.Int, compra.compra_id)
        .input('producto_id', sql.Int, null)
        .input('material_id', sql.Int, item.material_id || null)
        .input('descripcion_item', sql.NVarChar(300), item.descripcion_item || null)
        .input('cantidad', sql.Decimal(18, 3), item.cantidad)
        .input('unidad_medida_id', sql.Int, item.unidad_medida_id)
        .input('precio_unitario', sql.Decimal(18, 4), item.precio_unitario)
        .query(`
          INSERT INTO compras.CompraDetalle (
            compra_id,
            producto_id,
            material_id,
            descripcion_item,
            cantidad,
            unidad_medida_id,
            precio_unitario
          )
          OUTPUT
            INSERTED.compra_detalle_id,
            INSERTED.compra_id,
            INSERTED.material_id,
            INSERTED.descripcion_item,
            INSERTED.cantidad,
            INSERTED.unidad_medida_id,
            INSERTED.precio_unitario,
            INSERTED.subtotal
          VALUES (
            @compra_id,
            @producto_id,
            @material_id,
            @descripcion_item,
            @cantidad,
            @unidad_medida_id,
            @precio_unitario
          );
        `);

      detallesCreados.push(detalleResult.recordset[0]);
    }

    await transaction.commit();

    return {
      compra,
      detalles: detallesCreados
    };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  listarCompras,
  obtenerCompraPorId,
  crearCompraConDetalles
};