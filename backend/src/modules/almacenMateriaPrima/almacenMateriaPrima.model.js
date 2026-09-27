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

            SUM(
              s.cantidad_inicial
            ) AS cantidad_inicial_total,

            SUM(
              s.cantidad_inicial -
              s.cantidad_disponible
            ) AS cantidad_consumida_total,

            SUM(
              s.cantidad_disponible
            ) AS cantidad_disponible_total

          FROM inventario.StockMateriaPrimaLote s

          INNER JOIN compras.CompraMateriaPrimaDetalle d
            ON s.compra_materia_prima_detalle_id =
               d.compra_materia_prima_detalle_id

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
            cmp.compra_materia_prima_id,
            cmp.nombre_lote,
            cmp.fecha_compra,
            cmp.numero_documento,

            cmp.proveedor_id,
            p.ruc AS proveedor_ruc,
            p.razon_social
              AS proveedor,

            COUNT(
              d.compra_materia_prima_detalle_id
            ) AS cantidad_materias_primas,

            SUM(
              s.cantidad_inicial
            ) AS cantidad_inicial_total,

            SUM(
              s.cantidad_inicial -
              s.cantidad_disponible
            ) AS cantidad_consumida_total,

            SUM(
              s.cantidad_disponible
            ) AS cantidad_disponible_total,

            CASE
              WHEN SUM(
                s.cantidad_disponible
              ) > 0
              THEN 'CON_STOCK'
              ELSE 'AGOTADO'
            END AS estado_stock

          FROM compras.CompraMateriaPrima cmp

          INNER JOIN compras.Proveedor p
            ON cmp.proveedor_id =
               p.proveedor_id

          INNER JOIN compras.CompraMateriaPrimaDetalle d
            ON cmp.compra_materia_prima_id =
               d.compra_materia_prima_id

          INNER JOIN inventario.StockMateriaPrimaLote s
            ON d.compra_materia_prima_detalle_id =
               s.compra_materia_prima_detalle_id

          GROUP BY
            cmp.compra_materia_prima_id,
            cmp.nombre_lote,
            cmp.fecha_compra,
            cmp.numero_documento,
            cmp.proveedor_id,
            p.ruc,
            p.razon_social
        )

        SELECT
          l.*,
          COUNT(*) OVER()
            AS total_registros

        FROM Lotes l

        WHERE
          (
            @proveedor_id IS NULL
            OR l.proveedor_id =
               @proveedor_id
          )

          AND (
            @estado = 'TODOS'
            OR (
              @estado = 'CON_STOCK'
              AND l.cantidad_disponible_total > 0
            )
            OR (
              @estado = 'AGOTADO'
              AND l.cantidad_disponible_total = 0
            )
          )

          AND (
            @q IS NULL

            OR l.nombre_lote LIKE @q
            OR l.numero_documento LIKE @q
            OR l.proveedor LIKE @q
            OR l.proveedor_ruc LIKE @q

            OR EXISTS (
              SELECT 1
              FROM compras.CompraMateriaPrimaDetalle d2

              INNER JOIN catalog.Material m2
                ON d2.material_id =
                   m2.material_id

              INNER JOIN catalog.Color c2
                ON d2.color_id =
                   c2.color_id

              WHERE
                d2.compra_materia_prima_id =
                  l.compra_materia_prima_id

                AND (
                  m2.nombre LIKE @q
                  OR c2.nombre LIKE @q
                )
            )
          )

        ORDER BY
          l.fecha_compra ASC,
          l.compra_materia_prima_id ASC

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
  compra_materia_prima_id
) => {
  const pool =
    await getConnection();

  const cabeceraResult =
    await pool.request()
      .input(
        'compra_materia_prima_id',
        sql.Int,
        compra_materia_prima_id
      )
      .query(`
        SELECT
          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.fecha_compra,
          cmp.numero_documento,
          cmp.moneda_codigo,
          cmp.descripcion,

          cmp.proveedor_id,
          p.ruc AS proveedor_ruc,
          p.razon_social
            AS proveedor,

          SUM(
            s.cantidad_inicial
          ) AS cantidad_inicial_total,

          SUM(
            s.cantidad_inicial -
            s.cantidad_disponible
          ) AS cantidad_consumida_total,

          SUM(
            s.cantidad_disponible
          ) AS cantidad_disponible_total,

          COUNT(
            d.compra_materia_prima_detalle_id
          ) AS cantidad_materias_primas,

          u.nombre_completo
            AS registrado_por,

          cmp.created_at

        FROM compras.CompraMateriaPrima cmp

        INNER JOIN compras.Proveedor p
          ON cmp.proveedor_id =
             p.proveedor_id

        INNER JOIN auth.Usuario u
          ON cmp.created_by_usuario_id =
             u.usuario_id

        INNER JOIN compras.CompraMateriaPrimaDetalle d
          ON cmp.compra_materia_prima_id =
             d.compra_materia_prima_id

        INNER JOIN inventario.StockMateriaPrimaLote s
          ON d.compra_materia_prima_detalle_id =
             s.compra_materia_prima_detalle_id

        WHERE
          cmp.compra_materia_prima_id =
          @compra_materia_prima_id

        GROUP BY
          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.fecha_compra,
          cmp.numero_documento,
          cmp.moneda_codigo,
          cmp.descripcion,
          cmp.proveedor_id,
          p.ruc,
          p.razon_social,
          u.nombre_completo,
          cmp.created_at;
      `);

  const lote =
    cabeceraResult.recordset[0];

  if (!lote) {
    return null;
  }

  const detallesResult =
    await pool.request()
      .input(
        'compra_materia_prima_id',
        sql.Int,
        compra_materia_prima_id
      )
      .query(`
        SELECT
          d.compra_materia_prima_detalle_id,

          s.stock_materia_prima_lote_id,

          d.material_id,
          m.nombre AS material,

          d.color_id,
          c.nombre AS color,

          d.descripcion_item,

          d.unidad_medida_id,
          um.codigo AS unidad,

          d.precio_unitario,
          d.subtotal,

          s.cantidad_inicial,

          (
            s.cantidad_inicial -
            s.cantidad_disponible
          ) AS cantidad_consumida,

          s.cantidad_disponible

        FROM compras.CompraMateriaPrimaDetalle d

        INNER JOIN inventario.StockMateriaPrimaLote s
          ON d.compra_materia_prima_detalle_id =
             s.compra_materia_prima_detalle_id

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
          d.compra_materia_prima_id =
          @compra_materia_prima_id

        ORDER BY
          m.nombre ASC,
          c.nombre ASC;
      `);

  return {
    ...lote,
    detalles:
      detallesResult.recordset
  };
};


const listarMovimientosLote = async ({
  compra_materia_prima_id,
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
        'compra_materia_prima_id',
        sql.Int,
        compra_materia_prima_id
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

          mm.tipo_movimiento,
          mm.cantidad,
          mm.fecha_movimiento,
          mm.observacion,

          mm.produccion_detalle_id,
          mm.merma_detalle_id,

          d.material_id,
          m.nombre AS material,

          d.color_id,
          c.nombre AS color,

          um.codigo AS unidad,

          u.nombre_completo
            AS registrado_por,

          COUNT(*) OVER()
            AS total_registros

        FROM inventario.MovimientoMateriaPrima mm

        INNER JOIN inventario.StockMateriaPrimaLote s
          ON mm.stock_materia_prima_lote_id =
             s.stock_materia_prima_lote_id

        INNER JOIN compras.CompraMateriaPrimaDetalle d
          ON s.compra_materia_prima_detalle_id =
             d.compra_materia_prima_detalle_id

        INNER JOIN catalog.Material m
          ON d.material_id =
             m.material_id

        INNER JOIN catalog.Color c
          ON d.color_id =
             c.color_id

        INNER JOIN catalog.UnidadMedida um
          ON d.unidad_medida_id =
             um.unidad_medida_id

        INNER JOIN auth.Usuario u
          ON mm.created_by_usuario_id =
             u.usuario_id

        WHERE
          d.compra_materia_prima_id =
            @compra_materia_prima_id

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
              SUM(
                s.cantidad_inicial
              ),
              0
            ) AS total_comprado_kg,

            ISNULL(
              SUM(
                s.cantidad_disponible
              ),
              0
            ) AS stock_total_kg,

            ISNULL(
              SUM(
                s.cantidad_inicial -
                s.cantidad_disponible
              ),
              0
            ) AS consumido_total_kg,

            COUNT(
              DISTINCT
              d.compra_materia_prima_id
            ) AS lotes_registrados

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
