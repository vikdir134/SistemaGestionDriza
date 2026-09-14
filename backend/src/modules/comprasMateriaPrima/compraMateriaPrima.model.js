const {
  getConnection,
  sql
} = require('../../config/db');


const crearErrorNegocio = (
  mensaje,
  statusCode = 400
) => {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
};


const obtenerCompraMateriaPrimaPorId = async (
  compra_materia_prima_id
) => {
  const pool = await getConnection();

  const cabeceraResult = await pool.request()
    .input(
      'compra_materia_prima_id',
      sql.Int,
      compra_materia_prima_id
    )
    .query(`
      SELECT
        cmp.compra_materia_prima_id,
        cmp.nombre_lote,
        cmp.proveedor_id,
        p.ruc,
        p.razon_social,
        p.direccion,
        cmp.fecha_compra,
        cmp.numero_documento,
        cmp.monto_total,
        cmp.moneda_codigo,
        cmp.descripcion,
        cmp.created_at,
        u.nombre_completo AS registrado_por
      FROM compras.CompraMateriaPrima cmp
      INNER JOIN compras.Proveedor p
        ON cmp.proveedor_id = p.proveedor_id
      INNER JOIN auth.Usuario u
        ON cmp.created_by_usuario_id = u.usuario_id
      WHERE cmp.compra_materia_prima_id =
            @compra_materia_prima_id;
    `);

  const compra = cabeceraResult.recordset[0];

  if (!compra) {
    return null;
  }

  const detallesResult = await pool.request()
    .input(
      'compra_materia_prima_id',
      sql.Int,
      compra_materia_prima_id
    )
    .query(`
      SELECT
        d.compra_materia_prima_detalle_id,
        d.compra_materia_prima_id,

        d.material_id,
        m.nombre AS material,

        d.color_id,
        c.nombre AS color,

        d.descripcion_item,
        d.cantidad,

        d.unidad_medida_id,
        um.codigo AS unidad,

        d.precio_unitario,
        d.subtotal,

        s.stock_materia_prima_lote_id,
        s.cantidad_inicial,
        s.cantidad_disponible
      FROM compras.CompraMateriaPrimaDetalle d
      INNER JOIN catalog.Material m
        ON d.material_id = m.material_id
      INNER JOIN catalog.Color c
        ON d.color_id = c.color_id
      INNER JOIN catalog.UnidadMedida um
        ON d.unidad_medida_id = um.unidad_medida_id
      INNER JOIN inventario.StockMateriaPrimaLote s
        ON d.compra_materia_prima_detalle_id =
           s.compra_materia_prima_detalle_id
      WHERE d.compra_materia_prima_id =
            @compra_materia_prima_id
      ORDER BY d.compra_materia_prima_detalle_id ASC;
    `);

  return {
    ...compra,
    detalles: detallesResult.recordset
  };
};


const obtenerCompraPorIdempotencyKey = async (
  idempotency_key
) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input(
      'idempotency_key',
      sql.VarChar(100),
      idempotency_key
    )
    .query(`
      SELECT TOP 1
        compra_materia_prima_id
      FROM compras.CompraMateriaPrima
      WHERE idempotency_key = @idempotency_key;
    `);

  const encontrada = result.recordset[0];

  if (!encontrada) {
    return null;
  }

  return obtenerCompraMateriaPrimaPorId(
    encontrada.compra_materia_prima_id
  );
};


const listarComprasMateriaPrima = async ({
  proveedor_id,
  q,
  page = 1,
  limit = 10
}) => {
  const pool = await getConnection();

  const offset = (page - 1) * limit;

  const result = await pool.request()
    .input(
      'proveedor_id',
      sql.Int,
      proveedor_id || null
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
      WITH ComprasResumen AS (
        SELECT
          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.proveedor_id,
          p.ruc,
          p.razon_social,
          cmp.fecha_compra,
          cmp.numero_documento,
          cmp.monto_total,
          cmp.moneda_codigo,
          cmp.descripcion,
          cmp.created_at,
          u.nombre_completo AS registrado_por,

          COUNT(d.compra_materia_prima_detalle_id)
            AS cantidad_items,

          ISNULL(SUM(d.cantidad), 0)
            AS cantidad_total_kg,

          ISNULL(SUM(s.cantidad_disponible), 0)
            AS cantidad_disponible_kg
        FROM compras.CompraMateriaPrima cmp
        INNER JOIN compras.Proveedor p
          ON cmp.proveedor_id = p.proveedor_id
        INNER JOIN auth.Usuario u
          ON cmp.created_by_usuario_id = u.usuario_id
        LEFT JOIN compras.CompraMateriaPrimaDetalle d
          ON cmp.compra_materia_prima_id =
             d.compra_materia_prima_id
        LEFT JOIN inventario.StockMateriaPrimaLote s
          ON d.compra_materia_prima_detalle_id =
             s.compra_materia_prima_detalle_id
        WHERE
          (
            @proveedor_id IS NULL
            OR cmp.proveedor_id = @proveedor_id
          )
          AND (
            @q IS NULL
            OR cmp.nombre_lote LIKE @q
            OR cmp.numero_documento LIKE @q
            OR cmp.descripcion LIKE @q
            OR p.razon_social LIKE @q
            OR p.ruc LIKE @q
          )
        GROUP BY
          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.proveedor_id,
          p.ruc,
          p.razon_social,
          cmp.fecha_compra,
          cmp.numero_documento,
          cmp.monto_total,
          cmp.moneda_codigo,
          cmp.descripcion,
          cmp.created_at,
          u.nombre_completo
      )
      SELECT
        *,
        COUNT(*) OVER() AS total_registros
      FROM ComprasResumen
      ORDER BY
        fecha_compra DESC,
        compra_materia_prima_id DESC
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


const crearCompraMateriaPrima = async ({
  nombre_lote,
  proveedor_id,
  fecha_compra,
  numero_documento,
  moneda_codigo,
  descripcion,
  detalles,
  idempotency_key,
  created_by_usuario_id
}) => {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);

  try {
    /*
     * SERIALIZABLE + la clave UNIQUE permiten que dos
     * solicitudes concurrentes con la misma Idempotency-Key
     * no puedan duplicar la compra ni el stock.
     */
    await transaction.begin(
      sql.ISOLATION_LEVEL.SERIALIZABLE
    );

    const existenteResult =
      await new sql.Request(transaction)
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key
        )
        .query(`
          SELECT TOP 1
            compra_materia_prima_id
          FROM compras.CompraMateriaPrima
            WITH (UPDLOCK, HOLDLOCK)
          WHERE idempotency_key = @idempotency_key;
        `);

    const existente = existenteResult.recordset[0];

    if (existente) {
      await transaction.commit();

      const compraExistente =
        await obtenerCompraMateriaPrimaPorId(
          existente.compra_materia_prima_id
        );

      return {
        reutilizada: true,
        compra: compraExistente
      };
    }

    /* ======================================================
       VALIDAR PROVEEDOR
       ====================================================== */

    const proveedorResult =
      await new sql.Request(transaction)
        .input(
          'proveedor_id',
          sql.Int,
          proveedor_id
        )
        .query(`
          SELECT
            proveedor_id
          FROM compras.Proveedor
          WHERE proveedor_id = @proveedor_id
            AND activo = 1;
        `);

    if (!proveedorResult.recordset[0]) {
      throw crearErrorNegocio(
        'El proveedor seleccionado no existe o está inactivo',
        400
      );
    }

    /* ======================================================
       OBTENER UNIDAD KG
       ====================================================== */

    const unidadResult =
      await new sql.Request(transaction)
        .query(`
          SELECT TOP 1
            unidad_medida_id
          FROM catalog.UnidadMedida
          WHERE codigo = 'KG'
            AND activo = 1;
        `);

    const unidadKg = unidadResult.recordset[0];

    if (!unidadKg) {
      throw crearErrorNegocio(
        'No existe una unidad KG activa en el catálogo',
        500
      );
    }

    /* ======================================================
       VALIDAR MATERIALES Y COLORES
       ====================================================== */

    for (const item of detalles) {
      const catalogoResult =
        await new sql.Request(transaction)
          .input(
            'material_id',
            sql.Int,
            item.material_id
          )
          .input(
            'color_id',
            sql.Int,
            item.color_id
          )
          .query(`
            SELECT
              CASE WHEN EXISTS (
                SELECT 1
                FROM catalog.Material
                WHERE material_id = @material_id
                  AND activo = 1
              ) THEN 1 ELSE 0 END
                AS material_valido,

              CASE WHEN EXISTS (
                SELECT 1
                FROM catalog.Color
                WHERE color_id = @color_id
                  AND activo = 1
              ) THEN 1 ELSE 0 END
                AS color_valido;
          `);

      const validacion = catalogoResult.recordset[0];

      if (!validacion.material_valido) {
        throw crearErrorNegocio(
          `El material ${item.material_id} no existe o está inactivo`,
          400
        );
      }

      if (!validacion.color_valido) {
        throw crearErrorNegocio(
          `El color ${item.color_id} no existe o está inactivo`,
          400
        );
      }
    }

    /* ======================================================
       TOTAL
       ====================================================== */

    const monto_total = Number(
      detalles
        .reduce(
          (total, item) =>
            total +
            Number(item.cantidad) *
            Number(item.precio_unitario),
          0
        )
        .toFixed(2)
    );

    if (
      !Number.isFinite(monto_total) ||
      monto_total <= 0
    ) {
      throw crearErrorNegocio(
        'El monto total de la compra debe ser mayor a 0',
        400
      );
    }

    /* ======================================================
       INSERTAR CABECERA
       ====================================================== */

    const compraResult =
      await new sql.Request(transaction)
        .input(
          'nombre_lote',
          sql.NVarChar(150),
          nombre_lote
        )
        .input(
          'proveedor_id',
          sql.Int,
          proveedor_id
        )
        .input(
          'fecha_compra',
          sql.Date,
          fecha_compra
        )
        .input(
          'numero_documento',
          sql.VarChar(100),
          numero_documento || null
        )
        .input(
          'monto_total',
          sql.Decimal(18, 2),
          monto_total
        )
        .input(
          'moneda_codigo',
          sql.Char(3),
          moneda_codigo
        )
        .input(
          'descripcion',
          sql.NVarChar(400),
          descripcion || null
        )
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .query(`
          INSERT INTO compras.CompraMateriaPrima (
            nombre_lote,
            proveedor_id,
            fecha_compra,
            numero_documento,
            monto_total,
            moneda_codigo,
            descripcion,
            idempotency_key,
            created_by_usuario_id
          )
          OUTPUT
            INSERTED.compra_materia_prima_id,
            INSERTED.nombre_lote,
            INSERTED.proveedor_id,
            INSERTED.fecha_compra,
            INSERTED.numero_documento,
            INSERTED.monto_total,
            INSERTED.moneda_codigo,
            INSERTED.descripcion,
            INSERTED.created_at
          VALUES (
            @nombre_lote,
            @proveedor_id,
            @fecha_compra,
            @numero_documento,
            @monto_total,
            @moneda_codigo,
            @descripcion,
            @idempotency_key,
            @created_by_usuario_id
          );
        `);

    const compra = compraResult.recordset[0];
    const detallesCreados = [];

    /* ======================================================
       DETALLE + STOCK + MOVIMIENTO DE ENTRADA
       ====================================================== */

    for (const item of detalles) {
      const detalleResult =
        await new sql.Request(transaction)
          .input(
            'compra_materia_prima_id',
            sql.Int,
            compra.compra_materia_prima_id
          )
          .input(
            'material_id',
            sql.Int,
            item.material_id
          )
          .input(
            'color_id',
            sql.Int,
            item.color_id
          )
          .input(
            'descripcion_item',
            sql.NVarChar(300),
            item.descripcion_item || null
          )
          .input(
            'cantidad',
            sql.Decimal(18, 3),
            item.cantidad
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            unidadKg.unidad_medida_id
          )
          .input(
            'precio_unitario',
            sql.Decimal(18, 4),
            item.precio_unitario
          )
          .query(`
            INSERT INTO compras.CompraMateriaPrimaDetalle (
              compra_materia_prima_id,
              material_id,
              color_id,
              descripcion_item,
              cantidad,
              unidad_medida_id,
              precio_unitario
            )
            OUTPUT
              INSERTED.compra_materia_prima_detalle_id,
              INSERTED.compra_materia_prima_id,
              INSERTED.material_id,
              INSERTED.color_id,
              INSERTED.descripcion_item,
              INSERTED.cantidad,
              INSERTED.unidad_medida_id,
              INSERTED.precio_unitario,
              INSERTED.subtotal
            VALUES (
              @compra_materia_prima_id,
              @material_id,
              @color_id,
              @descripcion_item,
              @cantidad,
              @unidad_medida_id,
              @precio_unitario
            );
          `);

      const detalle = detalleResult.recordset[0];

      const stockResult =
        await new sql.Request(transaction)
          .input(
            'compra_materia_prima_detalle_id',
            sql.Int,
            detalle.compra_materia_prima_detalle_id
          )
          .input(
            'cantidad',
            sql.Decimal(18, 3),
            item.cantidad
          )
          .input(
            'created_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            INSERT INTO inventario.StockMateriaPrimaLote (
              compra_materia_prima_detalle_id,
              cantidad_inicial,
              cantidad_disponible,
              created_by_usuario_id
            )
            OUTPUT
              INSERTED.stock_materia_prima_lote_id,
              INSERTED.compra_materia_prima_detalle_id,
              INSERTED.cantidad_inicial,
              INSERTED.cantidad_disponible,
              INSERTED.created_at
            VALUES (
              @compra_materia_prima_detalle_id,
              @cantidad,
              @cantidad,
              @created_by_usuario_id
            );
          `);

      const stock = stockResult.recordset[0];

      const movimientoResult =
        await new sql.Request(transaction)
          .input(
            'stock_materia_prima_lote_id',
            sql.Int,
            stock.stock_materia_prima_lote_id
          )
          .input(
            'cantidad',
            sql.Decimal(18, 3),
            item.cantidad
          )
          .input(
            'observacion',
            sql.NVarChar(400),
            `Entrada por compra de materia prima - Lote ${nombre_lote}`
          )
          .input(
            'created_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            INSERT INTO inventario.MovimientoMateriaPrima (
              stock_materia_prima_lote_id,
              tipo_movimiento,
              cantidad,
              observacion,
              created_by_usuario_id
            )
            OUTPUT
              INSERTED.movimiento_materia_prima_id,
              INSERTED.stock_materia_prima_lote_id,
              INSERTED.tipo_movimiento,
              INSERTED.cantidad,
              INSERTED.fecha_movimiento
            VALUES (
              @stock_materia_prima_lote_id,
              'ENTRADA_COMPRA',
              @cantidad,
              @observacion,
              @created_by_usuario_id
            );
          `);

      detallesCreados.push({
        ...detalle,
        stock: stock,
        movimiento_entrada:
          movimientoResult.recordset[0]
      });
    }

    await transaction.commit();

    const compraCompleta =
      await obtenerCompraMateriaPrimaPorId(
        compra.compra_materia_prima_id
      );

    return {
      reutilizada: false,
      compra: compraCompleta,
      detalles: detallesCreados
    };

  } catch (error) {
    if (transaction._aborted !== true) {
      try {
        await transaction.rollback();
      } catch (_) {
        // Conservamos el error original.
      }
    }

    /*
     * Defensa extra ante una carrera por la clave UNIQUE.
     */
    if (
      [2601, 2627].includes(error.number) &&
      idempotency_key
    ) {
      const existente =
        await obtenerCompraPorIdempotencyKey(
          idempotency_key
        );

      if (existente) {
        return {
          reutilizada: true,
          compra: existente
        };
      }
    }

    throw error;
  }
};


module.exports = {
  listarComprasMateriaPrima,
  obtenerCompraMateriaPrimaPorId,
  crearCompraMateriaPrima
};
