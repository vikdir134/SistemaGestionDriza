const {
  getConnection,
  sql
} = require('../../config/db');


const listarResumenProductoTerminado = async ({
  q,
  tipo_producto_id,
  material_id,
  medida_id,
  color_id,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'q',
        sql.NVarChar(150),
        q ? `%${q}%` : null
      )
      .input(
        'tipo_producto_id',
        sql.Int,
        tipo_producto_id || null
      )
      .input(
        'material_id',
        sql.Int,
        material_id || null
      )
      .input(
        'medida_id',
        sql.Int,
        medida_id || null
      )
      .input(
        'color_id',
        sql.Int,
        color_id || null
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        WITH Resumen AS (
          SELECT
            p.producto_id,

            p.tipo_producto_id,
            tp.nombre AS tipo_producto,

            p.material_id,
            mat.nombre AS material,

            p.medida_id,
            med.nombre AS medida,

            p.color_id,
            col.nombre AS color,

            s.unidad_medida_id,
            um.codigo AS unidad,

            SUM(
              s.cantidad_disponible
            ) AS cantidad_disponible_total,

            SUM(
              CASE
                WHEN s.cantidad_disponible > 0
                THEN 1
                ELSE 0
              END
            ) AS presentaciones_con_stock

          FROM inventario.StockProductoTerminado s

          INNER JOIN catalog.Producto p
            ON s.producto_id =
               p.producto_id

          INNER JOIN catalog.TipoProducto tp
            ON p.tipo_producto_id =
               tp.tipo_producto_id

          INNER JOIN catalog.Material mat
            ON p.material_id =
               mat.material_id

          INNER JOIN catalog.Medida med
            ON p.medida_id =
               med.medida_id

          INNER JOIN catalog.Color col
            ON p.color_id =
               col.color_id

          INNER JOIN catalog.UnidadMedida um
            ON s.unidad_medida_id =
               um.unidad_medida_id

          WHERE
            p.activo = 1

            AND (
              @tipo_producto_id IS NULL
              OR p.tipo_producto_id =
                 @tipo_producto_id
            )

            AND (
              @material_id IS NULL
              OR p.material_id =
                 @material_id
            )

            AND (
              @medida_id IS NULL
              OR p.medida_id =
                 @medida_id
            )

            AND (
              @color_id IS NULL
              OR p.color_id =
                 @color_id
            )

            AND (
              @q IS NULL
              OR tp.nombre LIKE @q
              OR mat.nombre LIKE @q
              OR med.nombre LIKE @q
              OR col.nombre LIKE @q
              OR p.codigo_producto LIKE @q
              OR p.descripcion LIKE @q
            )

          GROUP BY
            p.producto_id,
            p.tipo_producto_id,
            tp.nombre,
            p.material_id,
            mat.nombre,
            p.medida_id,
            med.nombre,
            p.color_id,
            col.nombre,
            s.unidad_medida_id,
            um.codigo
        )

        SELECT
          *,
          COUNT(*) OVER()
            AS total_registros

        FROM Resumen

        ORDER BY
          tipo_producto ASC,
          material ASC,
          medida ASC,
          color ASC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const resumen =
    result.recordset;

  const total =
    resumen.length > 0
      ? Number(
          resumen[0]
            .total_registros
        )
      : 0;

  return {
    resumen,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const listarPresentacionesProductoTerminado = async ({
  q,
  tipo_producto_id,
  material_id,
  medida_id,
  color_id,
  estado,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'q',
        sql.NVarChar(150),
        q ? `%${q}%` : null
      )
      .input(
        'tipo_producto_id',
        sql.Int,
        tipo_producto_id || null
      )
      .input(
        'material_id',
        sql.Int,
        material_id || null
      )
      .input(
        'medida_id',
        sql.Int,
        medida_id || null
      )
      .input(
        'color_id',
        sql.Int,
        color_id || null
      )
      .input(
        'estado',
        sql.VarChar(20),
        estado || 'TODOS'
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        SELECT
          s.stock_producto_terminado_id,

          s.producto_id,

          p.tipo_producto_id,
          tp.nombre AS tipo_producto,

          p.material_id,
          mat.nombre AS material,

          p.medida_id,
          med.nombre AS medida,

          p.color_id,
          col.nombre AS color,

          s.unidad_medida_id,
          um.codigo AS unidad,

          s.cantidad_presentacion,
          s.unidad_presentacion_id,
          up.codigo AS unidad_presentacion,

          s.cantidad_disponible,

          CASE
            WHEN s.cantidad_presentacion > 0
            THEN
              CONVERT(
                decimal(18, 3),
                s.cantidad_disponible /
                s.cantidad_presentacion
              )
            ELSE 0
          END AS presentaciones_disponibles,

          CASE
            WHEN s.cantidad_disponible > 0
            THEN 'CON_STOCK'
            ELSE 'AGOTADO'
          END AS estado_stock,

          s.created_at,
          s.updated_at,

          COUNT(*) OVER()
            AS total_registros

        FROM inventario.StockProductoTerminado s

        INNER JOIN catalog.Producto p
          ON s.producto_id =
             p.producto_id

        INNER JOIN catalog.TipoProducto tp
          ON p.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Material mat
          ON p.material_id =
             mat.material_id

        INNER JOIN catalog.Medida med
          ON p.medida_id =
             med.medida_id

        INNER JOIN catalog.Color col
          ON p.color_id =
             col.color_id

        INNER JOIN catalog.UnidadMedida um
          ON s.unidad_medida_id =
             um.unidad_medida_id

        INNER JOIN catalog.UnidadMedida up
          ON s.unidad_presentacion_id =
             up.unidad_medida_id

        WHERE
          p.activo = 1

          AND (
            @tipo_producto_id IS NULL
            OR p.tipo_producto_id =
               @tipo_producto_id
          )

          AND (
            @material_id IS NULL
            OR p.material_id =
               @material_id
          )

          AND (
            @medida_id IS NULL
            OR p.medida_id =
               @medida_id
          )

          AND (
            @color_id IS NULL
            OR p.color_id =
               @color_id
          )

          AND (
            @estado = 'TODOS'
            OR (
              @estado = 'CON_STOCK'
              AND s.cantidad_disponible > 0
            )
            OR (
              @estado = 'AGOTADO'
              AND s.cantidad_disponible = 0
            )
          )

          AND (
            @q IS NULL
            OR tp.nombre LIKE @q
            OR mat.nombre LIKE @q
            OR med.nombre LIKE @q
            OR col.nombre LIKE @q
            OR p.codigo_producto LIKE @q
            OR p.descripcion LIKE @q
          )

        ORDER BY
          tp.nombre ASC,
          mat.nombre ASC,
          med.nombre ASC,
          col.nombre ASC,
          s.cantidad_presentacion ASC,
          s.stock_producto_terminado_id ASC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const presentaciones =
    result.recordset;

  const total =
    presentaciones.length > 0
      ? Number(
          presentaciones[0]
            .total_registros
        )
      : 0;

  return {
    presentaciones,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const obtenerPresentacionPorId = async (
  stock_producto_terminado_id
) => {
  const pool =
    await getConnection();

  const result =
    await pool.request()
      .input(
        'stock_producto_terminado_id',
        sql.Int,
        stock_producto_terminado_id
      )
      .query(`
        SELECT
          s.stock_producto_terminado_id,

          s.producto_id,

          p.tipo_producto_id,
          tp.nombre AS tipo_producto,

          p.material_id,
          mat.nombre AS material,

          p.medida_id,
          med.nombre AS medida,

          p.color_id,
          col.nombre AS color,

          p.descripcion
            AS descripcion_producto,

          s.unidad_medida_id,
          um.codigo AS unidad,

          s.cantidad_presentacion,
          s.unidad_presentacion_id,
          up.codigo AS unidad_presentacion,

          s.cantidad_disponible,

          CASE
            WHEN s.cantidad_presentacion > 0
            THEN
              CONVERT(
                decimal(18, 3),
                s.cantidad_disponible /
                s.cantidad_presentacion
              )
            ELSE 0
          END AS presentaciones_disponibles,

          CASE
            WHEN s.cantidad_disponible > 0
            THEN 'CON_STOCK'
            ELSE 'AGOTADO'
          END AS estado_stock,

          s.created_at,
          s.updated_at,

          uc.nombre_completo
            AS creado_por,

          uu.nombre_completo
            AS actualizado_por

        FROM inventario.StockProductoTerminado s

        INNER JOIN catalog.Producto p
          ON s.producto_id =
             p.producto_id

        INNER JOIN catalog.TipoProducto tp
          ON p.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Material mat
          ON p.material_id =
             mat.material_id

        INNER JOIN catalog.Medida med
          ON p.medida_id =
             med.medida_id

        INNER JOIN catalog.Color col
          ON p.color_id =
             col.color_id

        INNER JOIN catalog.UnidadMedida um
          ON s.unidad_medida_id =
             um.unidad_medida_id

        INNER JOIN catalog.UnidadMedida up
          ON s.unidad_presentacion_id =
             up.unidad_medida_id

        INNER JOIN auth.Usuario uc
          ON s.created_by_usuario_id =
             uc.usuario_id

        LEFT JOIN auth.Usuario uu
          ON s.updated_by_usuario_id =
             uu.usuario_id

        WHERE
          s.stock_producto_terminado_id =
          @stock_producto_terminado_id;
      `);

  return result.recordset[0] ||
    null;
};


const listarMovimientosPresentacion = async ({
  stock_producto_terminado_id,
  tipo_movimiento,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'stock_producto_terminado_id',
        sql.Int,
        stock_producto_terminado_id
      )
      .input(
        'tipo_movimiento',
        sql.VarChar(30),
        tipo_movimiento || null
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        SELECT
          mpt.movimiento_producto_terminado_id,
          mpt.stock_producto_terminado_id,
          mpt.tipo_movimiento,
          mpt.cantidad,
          mpt.fecha_movimiento,
          mpt.observacion,

          mpt.produccion_detalle_id,
          prod.produccion_id,

          mpt.entrega_detalle_id,
          e.entrega_id,
          e.pedido_id,

          u.nombre_completo
            AS registrado_por,

          COUNT(*) OVER()
            AS total_registros

        FROM inventario.MovimientoProductoTerminado mpt

        INNER JOIN auth.Usuario u
          ON mpt.created_by_usuario_id =
             u.usuario_id

        LEFT JOIN produccion.ProduccionDetalle pd
          ON mpt.produccion_detalle_id =
             pd.produccion_detalle_id

        LEFT JOIN produccion.Produccion prod
          ON pd.produccion_id =
             prod.produccion_id

        LEFT JOIN ventas.EntregaDetalle ed
          ON mpt.entrega_detalle_id =
             ed.entrega_detalle_id

        LEFT JOIN ventas.Entrega e
          ON ed.entrega_id =
             e.entrega_id

        WHERE
          mpt.stock_producto_terminado_id =
          @stock_producto_terminado_id

          AND (
            @tipo_movimiento IS NULL
            OR mpt.tipo_movimiento =
               @tipo_movimiento
          )

        ORDER BY
          mpt.fecha_movimiento DESC,
          mpt.movimiento_producto_terminado_id DESC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const movimientos =
    result.recordset;

  const total =
    movimientos.length > 0
      ? Number(
          movimientos[0]
            .total_registros
        )
      : 0;

  return {
    movimientos,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const obtenerIndicadoresAlmacenProductoTerminado =
  async () => {
    const pool =
      await getConnection();

    const result =
      await pool.request()
        .query(`
          SELECT
            ISNULL(
              SUM(
                CASE
                  WHEN um.codigo = 'KG'
                  THEN s.cantidad_disponible
                  ELSE 0
                END
              ),
              0
            ) AS stock_disponible_kg,

            COUNT(
              DISTINCT
              CASE
                WHEN s.cantidad_disponible > 0
                THEN s.producto_id
                ELSE NULL
              END
            ) AS productos_con_stock,

            ISNULL(
              SUM(
                CASE
                  WHEN s.cantidad_disponible > 0
                  THEN 1
                  ELSE 0
                END
              ),
              0
            ) AS presentaciones_con_stock

          FROM inventario.StockProductoTerminado s

          INNER JOIN catalog.UnidadMedida um
            ON s.unidad_medida_id =
               um.unidad_medida_id;
        `);

    return result.recordset[0];
  };


module.exports = {
  listarResumenProductoTerminado,
  listarPresentacionesProductoTerminado,
  obtenerPresentacionPorId,
  listarMovimientosPresentacion,
  obtenerIndicadoresAlmacenProductoTerminado
};
