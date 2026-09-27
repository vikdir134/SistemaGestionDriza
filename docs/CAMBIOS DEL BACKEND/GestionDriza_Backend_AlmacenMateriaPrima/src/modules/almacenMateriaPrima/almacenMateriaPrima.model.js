const {
  getConnection,
  sql
} = require('../../config/db');


const listarResumenMateriaPrima = async ({
  material_id,
  color_id,
  q,
  page = 1,
  limit = 10
}) => {
  const pool = await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'material_id',
        sql.Int,
        material_id || null
      )
      .input(
        'color_id',
        sql.Int,
        color_id || null
      )
      .input(
        'q',
        sql.NVarChar(150),
        q ? `%${q}%` : null
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
            d.material_id,
            m.nombre AS material,

            d.color_id,
            c.nombre AS color,

            d.unidad_medida_id,
            um.codigo AS unidad,

            SUM(s.cantidad_inicial)
              AS cantidad_inicial_total,

            SUM(s.cantidad_disponible)
              AS cantidad_disponible_total,

            SUM(
              s.cantidad_inicial -
              s.cantidad_disponible
            ) AS cantidad_consumida_total,

            COUNT(
              s.stock_materia_prima_lote_id
            ) AS cantidad_lotes_total,

            SUM(
              CASE
                WHEN s.cantidad_disponible > 0
                THEN 1
                ELSE 0
              END
            ) AS cantidad_lotes_con_stock,

            MIN(
              CASE
                WHEN s.cantidad_disponible > 0
                THEN cmp.fecha_compra
                ELSE NULL
              END
            ) AS fecha_lote_mas_antiguo_disponible

          FROM inventario.StockMateriaPrimaLote s

          INNER JOIN compras.CompraMateriaPrimaDetalle d
            ON s.compra_materia_prima_detalle_id =
               d.compra_materia_prima_detalle_id

          INNER JOIN compras.CompraMateriaPrima cmp
            ON d.compra_materia_prima_id =
               cmp.compra_materia_prima_id

          INNER JOIN catalog.Material m
            ON d.material_id =
               m.material_id

          INNER JOIN catalog.Color c
            ON d.color_id =
               c.color_id

          INNER JOIN catalog.UnidadMedida um
            ON d.unidad_medida_id =
               um.unidad_medida_id

          WHERE
            (
              @material_id IS NULL
              OR d.material_id =
                 @material_id
            )
            AND (
              @color_id IS NULL
              OR d.color_id =
                 @color_id
            )
            AND (
              @q IS NULL
              OR m.nombre LIKE @q
              OR c.nombre LIKE @q
            )

          GROUP BY
            d.material_id,
            m.nombre,
            d.color_id,
            c.nombre,
            d.unidad_medida_id,
            um.codigo
        )

        SELECT
          *,
          COUNT(*) OVER()
            AS total_registros

        FROM Resumen

        ORDER BY
          material ASC,
          color ASC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const resumen =
    result.recordset;

  const total =
    resumen.length > 0
      ? resumen[0]
          .total_registros
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


const listarLotesMateriaPrima = async ({
  material_id,
  color_id,
  proveedor_id,
  estado,
  q,
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
        'material_id',
        sql.Int,
        material_id || null
      )
      .input(
        'color_id',
        sql.Int,
        color_id || null
      )
      .input(
        'proveedor_id',
        sql.Int,
        proveedor_id || null
      )
      .input(
        'estado',
        sql.VarChar(20),
        estado || 'TODOS'
      )
      .input(
        'q',
        sql.NVarChar(150),
        q ? `%${q}%` : null
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
        WITH Lotes AS (
          SELECT
            s.stock_materia_prima_lote_id,

            cmp.compra_materia_prima_id,
            cmp.nombre_lote,
            cmp.fecha_compra,
            cmp.numero_documento,

            cmp.proveedor_id,
            p.ruc AS proveedor_ruc,
            p.razon_social
              AS proveedor,

            d.compra_materia_prima_detalle_id,

            d.material_id,
            m.nombre AS material,

            d.color_id,
            c.nombre AS color,

            d.unidad_medida_id,
            um.codigo AS unidad,

            s.cantidad_inicial,
            s.cantidad_disponible,

            (
              s.cantidad_inicial -
              s.cantidad_disponible
            ) AS cantidad_consumida,

            CAST(
              CASE
                WHEN s.cantidad_inicial <= 0
                THEN 0
                ELSE (
                  s.cantidad_disponible
                  * 100.0
                  / s.cantidad_inicial
                )
              END
              AS DECIMAL(9,2)
            ) AS porcentaje_disponible,

            CASE
              WHEN s.cantidad_disponible > 0
              THEN 'CON_STOCK'
              ELSE 'AGOTADO'
            END AS estado_stock,

            s.created_at,
            s.updated_at

          FROM inventario.StockMateriaPrimaLote s

          INNER JOIN compras.CompraMateriaPrimaDetalle d
            ON s.compra_materia_prima_detalle_id =
               d.compra_materia_prima_detalle_id

          INNER JOIN compras.CompraMateriaPrima cmp
            ON d.compra_materia_prima_id =
               cmp.compra_materia_prima_id

          INNER JOIN compras.Proveedor p
            ON cmp.proveedor_id =
               p.proveedor_id

          INNER JOIN catalog.Material m
            ON d.material_id =
               m.material_id

          INNER JOIN catalog.Color c
            ON d.color_id =
               c.color_id

          INNER JOIN catalog.UnidadMedida um
            ON d.unidad_medida_id =
               um.unidad_medida_id

          WHERE
            (
              @material_id IS NULL
              OR d.material_id =
                 @material_id
            )
            AND (
              @color_id IS NULL
              OR d.color_id =
                 @color_id
            )
            AND (
              @proveedor_id IS NULL
              OR cmp.proveedor_id =
                 @proveedor_id
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
              OR cmp.nombre_lote LIKE @q
              OR cmp.numero_documento LIKE @q
              OR p.razon_social LIKE @q
              OR p.ruc LIKE @q
              OR m.nombre LIKE @q
              OR c.nombre LIKE @q
            )
        )

        SELECT
          *,
          COUNT(*) OVER()
            AS total_registros

        FROM Lotes

        /*
         * Ordenamos por fecha de compra ascendente
         * porque es el mismo orden que después
         * utilizará el FIFO.
         *
         * Visualmente deja claro cuál es el lote
         * más antiguo disponible.
         */
        ORDER BY
          fecha_compra ASC,
          compra_materia_prima_id ASC,
          stock_materia_prima_lote_id ASC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const lotes =
    result.recordset;

  const total =
    lotes.length > 0
      ? lotes[0]
          .total_registros
      : 0;

  return {
    lotes,
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


const obtenerLoteMateriaPrimaPorId = async (
  stock_materia_prima_lote_id
) => {
  const pool =
    await getConnection();

  const result =
    await pool.request()
      .input(
        'stock_materia_prima_lote_id',
        sql.Int,
        stock_materia_prima_lote_id
      )
      .query(`
        SELECT
          s.stock_materia_prima_lote_id,

          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.fecha_compra,
          cmp.numero_documento,
          cmp.moneda_codigo,
          cmp.descripcion
            AS descripcion_compra,

          cmp.proveedor_id,
          p.ruc AS proveedor_ruc,
          p.razon_social
            AS proveedor,

          d.compra_materia_prima_detalle_id,

          d.material_id,
          m.nombre AS material,

          d.color_id,
          c.nombre AS color,

          d.descripcion_item,

          d.unidad_medida_id,
          um.codigo AS unidad,

          d.precio_unitario,

          s.cantidad_inicial,
          s.cantidad_disponible,

          (
            s.cantidad_inicial -
            s.cantidad_disponible
          ) AS cantidad_consumida,

          CAST(
            CASE
              WHEN s.cantidad_inicial <= 0
              THEN 0
              ELSE (
                s.cantidad_disponible
                * 100.0
                / s.cantidad_inicial
              )
            END
            AS DECIMAL(9,2)
          ) AS porcentaje_disponible,

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

        FROM inventario.StockMateriaPrimaLote s

        INNER JOIN compras.CompraMateriaPrimaDetalle d
          ON s.compra_materia_prima_detalle_id =
             d.compra_materia_prima_detalle_id

        INNER JOIN compras.CompraMateriaPrima cmp
          ON d.compra_materia_prima_id =
             cmp.compra_materia_prima_id

        INNER JOIN compras.Proveedor p
          ON cmp.proveedor_id =
             p.proveedor_id

        INNER JOIN catalog.Material m
          ON d.material_id =
             m.material_id

        INNER JOIN catalog.Color c
          ON d.color_id =
             c.color_id

        INNER JOIN catalog.UnidadMedida um
          ON d.unidad_medida_id =
             um.unidad_medida_id

        INNER JOIN auth.Usuario uc
          ON s.created_by_usuario_id =
             uc.usuario_id

        LEFT JOIN auth.Usuario uu
          ON s.updated_by_usuario_id =
             uu.usuario_id

        WHERE
          s.stock_materia_prima_lote_id =
          @stock_materia_prima_lote_id;
      `);

  return result.recordset[0];
};


const listarMovimientosLote = async ({
  stock_materia_prima_lote_id,
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
        'stock_materia_prima_lote_id',
        sql.Int,
        stock_materia_prima_lote_id
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
          mm.movimiento_materia_prima_id,
          mm.stock_materia_prima_lote_id,
          mm.tipo_movimiento,
          mm.cantidad,
          mm.fecha_movimiento,
          mm.observacion,

          mm.produccion_detalle_id,
          mm.merma_detalle_id,

          u.nombre_completo
            AS registrado_por,

          COUNT(*) OVER()
            AS total_registros

        FROM inventario.MovimientoMateriaPrima mm

        INNER JOIN auth.Usuario u
          ON mm.created_by_usuario_id =
             u.usuario_id

        WHERE
          mm.stock_materia_prima_lote_id =
            @stock_materia_prima_lote_id

          AND (
            @tipo_movimiento IS NULL
            OR mm.tipo_movimiento =
               @tipo_movimiento
          )

        ORDER BY
          mm.fecha_movimiento DESC,
          mm.movimiento_materia_prima_id DESC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const movimientos =
    result.recordset;

  const total =
    movimientos.length > 0
      ? movimientos[0]
          .total_registros
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


const obtenerIndicadoresAlmacenMateriaPrima =
  async () => {
    const pool =
      await getConnection();

    const result =
      await pool.request()
        .query(`
          SELECT
            ISNULL(
              SUM(s.cantidad_disponible),
              0
            ) AS stock_total_kg,

            ISNULL(
              SUM(
                s.cantidad_inicial -
                s.cantidad_disponible
              ),
              0
            ) AS consumido_total_kg,

            SUM(
              CASE
                WHEN s.cantidad_disponible > 0
                THEN 1
                ELSE 0
              END
            ) AS lotes_con_stock,

            SUM(
              CASE
                WHEN s.cantidad_disponible = 0
                THEN 1
                ELSE 0
              END
            ) AS lotes_agotados,

            COUNT(
              s.stock_materia_prima_lote_id
            ) AS lotes_total,

            COUNT(
              DISTINCT
              CONCAT(
                d.material_id,
                '-',
                d.color_id
              )
            ) AS combinaciones_materia_prima

          FROM inventario.StockMateriaPrimaLote s

          INNER JOIN compras.CompraMateriaPrimaDetalle d
            ON s.compra_materia_prima_detalle_id =
               d.compra_materia_prima_detalle_id;
        `);

    return result.recordset[0];
  };


module.exports = {
  listarResumenMateriaPrima,
  listarLotesMateriaPrima,
  obtenerLoteMateriaPrimaPorId,
  listarMovimientosLote,
  obtenerIndicadoresAlmacenMateriaPrima
};
