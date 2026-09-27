const {
  getConnection,
  sql
} = require('../../config/db');


const crearErrorNegocio = (
  mensaje,
  statusCode = 400
) => {
  const error =
    new Error(
      mensaje
    );

  error.statusCode =
    statusCode;

  return error;
};


const obtenerUnidadKg = async (
  executor
) => {
  const request =
    executor instanceof sql.Transaction
      ? new sql.Request(
          executor
        )
      : executor.request();

  const result =
    await request.query(`
      SELECT TOP 1
        unidad_medida_id,
        codigo
      FROM catalog.UnidadMedida
      WHERE
        activo = 1
        AND UPPER(codigo) = 'KG';
    `);

  return result.recordset[0] ||
    null;
};


const listarMermas = async ({
  q,
  fecha_desde,
  fecha_hasta,
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
        'fecha_desde',
        sql.Date,
        fecha_desde || null
      )
      .input(
        'fecha_hasta',
        sql.Date,
        fecha_hasta || null
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
          m.merma_id,
          m.fecha_merma,
          m.observacion,
          m.created_at,

          u.nombre_completo
            AS registrado_por,

          COUNT(
            md.merma_detalle_id
          ) AS cantidad_items,

          ISNULL(
            SUM(
              md.cantidad
            ),
            0
          ) AS total_merma_kg,

          COUNT(*) OVER()
            AS total_registros

        FROM inventario.Merma m

        INNER JOIN auth.Usuario u
          ON m.created_by_usuario_id =
             u.usuario_id

        LEFT JOIN inventario.MermaDetalle md
          ON m.merma_id =
             md.merma_id

        WHERE
          (
            @fecha_desde IS NULL
            OR m.fecha_merma >=
               @fecha_desde
          )

          AND (
            @fecha_hasta IS NULL
            OR m.fecha_merma <=
               @fecha_hasta
          )

          AND (
            @q IS NULL
            OR m.observacion LIKE @q
            OR EXISTS (
              SELECT 1
              FROM inventario.MermaDetalle mdq

              INNER JOIN catalog.Material matq
                ON mdq.material_id =
                   matq.material_id

              INNER JOIN catalog.Color colq
                ON mdq.color_id =
                   colq.color_id

              WHERE
                mdq.merma_id =
                  m.merma_id

                AND (
                  matq.nombre LIKE @q
                  OR colq.nombre LIKE @q
                )
            )
          )

        GROUP BY
          m.merma_id,
          m.fecha_merma,
          m.observacion,
          m.created_at,
          u.nombre_completo

        ORDER BY
          m.fecha_merma DESC,
          m.merma_id DESC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const mermas =
    result.recordset;

  const total =
    mermas.length > 0
      ? Number(
          mermas[0]
            .total_registros
        )
      : 0;

  return {
    mermas,
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


const listarDisponibilidad = async ({
  material_id,
  color_id
}) => {
  const pool =
    await getConnection();

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
      .query(`
        SELECT
          d.material_id,
          mat.nombre
            AS material,

          d.color_id,
          col.nombre
            AS color,

          um.unidad_medida_id,
          um.codigo
            AS unidad,

          SUM(
            s.cantidad_disponible
          ) AS cantidad_disponible

        FROM inventario.StockMateriaPrimaLote s

        INNER JOIN compras.CompraMateriaPrimaDetalle d
          ON s.compra_materia_prima_detalle_id =
             d.compra_materia_prima_detalle_id

        INNER JOIN catalog.Material mat
          ON d.material_id =
             mat.material_id

        INNER JOIN catalog.Color col
          ON d.color_id =
             col.color_id

        INNER JOIN catalog.UnidadMedida um
          ON d.unidad_medida_id =
             um.unidad_medida_id

        WHERE
          s.cantidad_disponible > 0

          AND mat.activo = 1
          AND col.activo = 1
          AND um.activo = 1

          AND UPPER(um.codigo) =
              'KG'

          AND (
            @material_id IS NULL
            OR d.material_id =
               @material_id
          )

          AND (
            @color_id IS NULL
            OR d.color_id =
               @color_id
          )

        GROUP BY
          d.material_id,
          mat.nombre,
          d.color_id,
          col.nombre,
          um.unidad_medida_id,
          um.codigo

        ORDER BY
          mat.nombre ASC,
          col.nombre ASC;
      `);

  return result.recordset;
};


const obtenerMermaCompletaPorId = async (
  merma_id,
  executor = null
) => {
  const pool =
    executor ||
    await getConnection();

  const requestCabecera =
    executor instanceof sql.Transaction
      ? new sql.Request(
          executor
        )
      : pool.request();

  const cabeceraResult =
    await requestCabecera
      .input(
        'merma_id',
        sql.Int,
        merma_id
      )
      .query(`
        SELECT
          m.merma_id,
          m.fecha_merma,
          m.observacion,
          m.created_at,
          m.idempotency_key,

          u.nombre_completo
            AS registrado_por

        FROM inventario.Merma m

        INNER JOIN auth.Usuario u
          ON m.created_by_usuario_id =
             u.usuario_id

        WHERE
          m.merma_id =
          @merma_id;
      `);

  const merma =
    cabeceraResult.recordset[0];

  if (!merma) {
    return null;
  }


  const requestDetalles =
    executor instanceof sql.Transaction
      ? new sql.Request(
          executor
        )
      : pool.request();

  const detallesResult =
    await requestDetalles
      .input(
        'merma_id',
        sql.Int,
        merma_id
      )
      .query(`
        SELECT
          md.merma_detalle_id,
          md.merma_id,

          md.material_id,
          mat.nombre
            AS material,

          md.color_id,
          col.nombre
            AS color,

          md.cantidad,
          md.unidad_medida_id,
          um.codigo
            AS unidad,

          md.observacion,
          md.created_at

        FROM inventario.MermaDetalle md

        INNER JOIN catalog.Material mat
          ON md.material_id =
             mat.material_id

        INNER JOIN catalog.Color col
          ON md.color_id =
             col.color_id

        INNER JOIN catalog.UnidadMedida um
          ON md.unidad_medida_id =
             um.unidad_medida_id

        WHERE
          md.merma_id =
          @merma_id

        ORDER BY
          md.merma_detalle_id ASC;
      `);


  const detalles =
    detallesResult.recordset;


  for (
    const detalle
    of detalles
  ) {
    const requestConsumos =
      executor instanceof sql.Transaction
        ? new sql.Request(
            executor
          )
        : pool.request();

    const consumosResult =
      await requestConsumos
        .input(
          'merma_detalle_id',
          sql.Int,
          detalle
            .merma_detalle_id
        )
        .query(`
          SELECT
            mm.movimiento_materia_prima_id,
            mm.stock_materia_prima_lote_id,
            mm.cantidad,
            mm.fecha_movimiento,

            c.compra_materia_prima_id,
            c.nombre_lote,
            c.fecha_compra,

            d.material_id,
            mat.nombre
              AS material,

            d.color_id,
            col.nombre
              AS color

          FROM inventario.MovimientoMateriaPrima mm

          INNER JOIN inventario.StockMateriaPrimaLote s
            ON mm.stock_materia_prima_lote_id =
               s.stock_materia_prima_lote_id

          INNER JOIN compras.CompraMateriaPrimaDetalle d
            ON s.compra_materia_prima_detalle_id =
               d.compra_materia_prima_detalle_id

          INNER JOIN compras.CompraMateriaPrima c
            ON d.compra_materia_prima_id =
               c.compra_materia_prima_id

          INNER JOIN catalog.Material mat
            ON d.material_id =
               mat.material_id

          INNER JOIN catalog.Color col
            ON d.color_id =
               col.color_id

          WHERE
            mm.merma_detalle_id =
              @merma_detalle_id

            AND
            mm.tipo_movimiento =
              'SALIDA_MERMA'

          ORDER BY
            c.fecha_compra ASC,
            c.compra_materia_prima_id ASC,
            s.stock_materia_prima_lote_id ASC;
        `);

    detalle.consumos_fifo =
      consumosResult.recordset;
  }


  return {
    merma,
    detalles
  };
};


const crearMermaFIFO = async ({
  fecha_merma,
  observacion,
  detalles,
  idempotency_key,
  created_by_usuario_id
}) => {
  const pool =
    await getConnection();

  const transaction =
    new sql.Transaction(
      pool
    );

  try {
    await transaction.begin(
      sql.ISOLATION_LEVEL.SERIALIZABLE
    );


    /* =====================================================
       1. IDEMPOTENCIA
       ===================================================== */

    if (
      idempotency_key
    ) {
      const existenteResult =
        await new sql.Request(
          transaction
        )
          .input(
            'idempotency_key',
            sql.VarChar(100),
            idempotency_key
          )
          .query(`
            SELECT
              merma_id

            FROM inventario.Merma
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            WHERE
              idempotency_key =
              @idempotency_key;
          `);

      const existente =
        existenteResult
          .recordset[0];

      if (existente) {
        const completa =
          await obtenerMermaCompletaPorId(
            existente.merma_id,
            transaction
          );

        await transaction.commit();

        return {
          reutilizada: true,
          merma:
            completa.merma,
          detalles:
            completa.detalles
        };
      }
    }


    /* =====================================================
       2. UNIDAD KG
       ===================================================== */

    const unidadKg =
      await obtenerUnidadKg(
        transaction
      );

    if (!unidadKg) {
      throw crearErrorNegocio(
        'No se encontró la unidad KG activa en el catálogo',
        500
      );
    }


    /* =====================================================
       3. VALIDAR MATERIA/COLOR Y STOCK TOTAL
       ===================================================== */

    const combinaciones =
      new Set();

    const detallesValidados =
      [];


    for (
      const [
        index,
        item
      ]
      of detalles.entries()
    ) {
      const material_id =
        Number(
          item.material_id
        );

      const color_id =
        Number(
          item.color_id
        );

      const cantidad =
        Number(
          item.cantidad
        );


      if (
        !Number.isInteger(
          material_id
        ) ||
        material_id <= 0
      ) {
        throw crearErrorNegocio(
          `El material del producto ${index + 1} no es válido`
        );
      }


      if (
        !Number.isInteger(
          color_id
        ) ||
        color_id <= 0
      ) {
        throw crearErrorNegocio(
          `El color del producto ${index + 1} no es válido`
        );
      }


      if (
        !Number.isFinite(
          cantidad
        ) ||
        cantidad <= 0
      ) {
        throw crearErrorNegocio(
          `La cantidad de merma del producto ${index + 1} debe ser mayor a 0`
        );
      }


      const key =
        `${material_id}:${color_id}`;

      if (
        combinaciones.has(
          key
        )
      ) {
        throw crearErrorNegocio(
          'No se puede repetir la misma materia prima en una sola merma'
        );
      }

      combinaciones.add(
        key
      );


      const catalogoResult =
        await new sql.Request(
          transaction
        )
          .input(
            'material_id',
            sql.Int,
            material_id
          )
          .input(
            'color_id',
            sql.Int,
            color_id
          )
          .query(`
            SELECT
              mat.material_id,
              mat.nombre
                AS material,

              col.color_id,
              col.nombre
                AS color

            FROM catalog.Material mat

            CROSS JOIN catalog.Color col

            WHERE
              mat.material_id =
                @material_id

              AND mat.activo = 1

              AND col.color_id =
                @color_id

              AND col.activo = 1;
          `);

      const catalogo =
        catalogoResult
          .recordset[0];

      if (!catalogo) {
        throw crearErrorNegocio(
          `La materia prima del producto ${index + 1} no está activa o no existe`
        );
      }


      /*
       * Bloqueamos todos los lotes candidatos desde la validación
       * para que otra transacción no pueda consumirlos entre
       * la validación y el descuento FIFO.
       */
      const stockResult =
        await new sql.Request(
          transaction
        )
          .input(
            'material_id',
            sql.Int,
            material_id
          )
          .input(
            'color_id',
            sql.Int,
            color_id
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            unidadKg
              .unidad_medida_id
          )
          .query(`
            SELECT
              s.stock_materia_prima_lote_id,
              s.cantidad_disponible,

              c.compra_materia_prima_id,
              c.nombre_lote,
              c.fecha_compra

            FROM inventario.StockMateriaPrimaLote s
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            INNER JOIN compras.CompraMateriaPrimaDetalle d
              ON s.compra_materia_prima_detalle_id =
                 d.compra_materia_prima_detalle_id

            INNER JOIN compras.CompraMateriaPrima c
              ON d.compra_materia_prima_id =
                 c.compra_materia_prima_id

            WHERE
              d.material_id =
                @material_id

              AND d.color_id =
                @color_id

              AND d.unidad_medida_id =
                @unidad_medida_id

              AND s.cantidad_disponible > 0

            ORDER BY
              c.fecha_compra ASC,
              c.compra_materia_prima_id ASC,
              s.stock_materia_prima_lote_id ASC;
          `);


      const lotes =
        stockResult.recordset;

      const disponible =
        lotes.reduce(
          (
            total,
            lote
          ) =>
            total +
            Number(
              lote
                .cantidad_disponible
            ),
          0
        );


      if (
        disponible + 0.000001 <
        cantidad
      ) {
        throw crearErrorNegocio(
          `Stock insuficiente de ${catalogo.material} ${catalogo.color}. Disponible: ${disponible.toFixed(3)} KG; merma solicitada: ${cantidad.toFixed(3)} KG`,
          409
        );
      }


      detallesValidados.push({
        material_id,
        color_id,

        material:
          catalogo.material,

        color:
          catalogo.color,

        cantidad:
          Number(
            cantidad.toFixed(3)
          ),

        unidad_medida_id:
          unidadKg
            .unidad_medida_id,

        unidad:
          unidadKg.codigo,

        observacion:
          item.observacion
            ? String(
                item.observacion
              ).trim()
            : null,

        lotes
      });
    }


    /* =====================================================
       4. CREAR CABECERA
       ===================================================== */

    const mermaResult =
      await new sql.Request(
        transaction
      )
        .input(
          'fecha_merma',
          sql.Date,
          fecha_merma
        )
        .input(
          'observacion',
          sql.NVarChar(500),
          observacion || null
        )
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key || null
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .query(`
          INSERT INTO inventario.Merma (
            fecha_merma,
            observacion,
            idempotency_key,
            created_by_usuario_id
          )

          VALUES (
            @fecha_merma,
            @observacion,
            @idempotency_key,
            @created_by_usuario_id
          );

          SELECT
            CONVERT(
              INT,
              SCOPE_IDENTITY()
            ) AS merma_id;
        `);

    const merma_id =
      mermaResult
        .recordset[0]
        .merma_id;


    /* =====================================================
       5. DETALLES + FIFO + MOVIMIENTOS
       ===================================================== */

    for (
      const item
      of detallesValidados
    ) {
      const detalleResult =
        await new sql.Request(
          transaction
        )
          .input(
            'merma_id',
            sql.Int,
            merma_id
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
            'cantidad',
            sql.Decimal(
              18,
              3
            ),
            item.cantidad
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            item
              .unidad_medida_id
          )
          .input(
            'observacion',
            sql.NVarChar(300),
            item.observacion ||
            null
          )
          .input(
            'created_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            INSERT INTO inventario.MermaDetalle (
              merma_id,
              material_id,
              color_id,
              cantidad,
              unidad_medida_id,
              observacion,
              created_by_usuario_id
            )

            VALUES (
              @merma_id,
              @material_id,
              @color_id,
              @cantidad,
              @unidad_medida_id,
              @observacion,
              @created_by_usuario_id
            );

            SELECT
              CONVERT(
                INT,
                SCOPE_IDENTITY()
              ) AS merma_detalle_id;
          `);

      const merma_detalle_id =
        detalleResult
          .recordset[0]
          .merma_detalle_id;


      let pendiente =
        Number(
          item.cantidad
        );


      for (
        const lote
        of item.lotes
      ) {
        if (
          pendiente <=
          0.000001
        ) {
          break;
        }

        const disponibleLote =
          Number(
            lote
              .cantidad_disponible
          );

        if (
          disponibleLote <= 0
        ) {
          continue;
        }

        const consumir =
          Math.min(
            pendiente,
            disponibleLote
          );

        const consumirRedondeado =
          Number(
            consumir.toFixed(3)
          );


        const updateResult =
          await new sql.Request(
            transaction
          )
            .input(
              'stock_materia_prima_lote_id',
              sql.Int,
              lote
                .stock_materia_prima_lote_id
            )
            .input(
              'cantidad',
              sql.Decimal(
                18,
                3
              ),
              consumirRedondeado
            )
            .input(
              'updated_by_usuario_id',
              sql.Int,
              created_by_usuario_id
            )
            .query(`
              UPDATE inventario.StockMateriaPrimaLote

              SET
                cantidad_disponible =
                  cantidad_disponible -
                  @cantidad,

                updated_at =
                  SYSDATETIME(),

                updated_by_usuario_id =
                  @updated_by_usuario_id

              WHERE
                stock_materia_prima_lote_id =
                  @stock_materia_prima_lote_id

                AND
                cantidad_disponible >=
                  @cantidad;

              SELECT
                @@ROWCOUNT
                  AS filas_actualizadas;
            `);


        if (
          Number(
            updateResult
              .recordset[0]
              .filas_actualizadas
          ) !== 1
        ) {
          throw crearErrorNegocio(
            `El stock del lote ${lote.nombre_lote} cambió durante la operación. Vuelve a intentar la merma.`,
            409
          );
        }


        await new sql.Request(
          transaction
        )
          .input(
            'stock_materia_prima_lote_id',
            sql.Int,
            lote
              .stock_materia_prima_lote_id
          )
          .input(
            'cantidad',
            sql.Decimal(
              18,
              3
            ),
            consumirRedondeado
          )
          .input(
            'merma_detalle_id',
            sql.Int,
            merma_detalle_id
          )
          .input(
            'observacion',
            sql.NVarChar(400),
            `Salida por merma #${merma_id} - ${item.material} ${item.color}`
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
              fecha_movimiento,
              observacion,
              created_by_usuario_id,
              produccion_detalle_id,
              merma_detalle_id
            )

            VALUES (
              @stock_materia_prima_lote_id,
              'SALIDA_MERMA',
              @cantidad,
              SYSDATETIME(),
              @observacion,
              @created_by_usuario_id,
              NULL,
              @merma_detalle_id
            );
          `);


        pendiente =
          Number(
            (
              pendiente -
              consumirRedondeado
            ).toFixed(3)
          );
      }


      if (
        pendiente >
        0.000001
      ) {
        throw crearErrorNegocio(
          `No se pudo completar el descuento FIFO de ${item.material} ${item.color}`,
          409
        );
      }
    }


    const completa =
      await obtenerMermaCompletaPorId(
        merma_id,
        transaction
      );


    await transaction.commit();


    return {
      reutilizada: false,
      merma:
        completa.merma,
      detalles:
        completa.detalles
    };


  } catch (error) {
    try {
      await transaction.rollback();
    } catch (_) {
      // Preservamos el error original.
    }


    /*
     * Defensa adicional ante una carrera de idempotencia.
     */
    if (
      [2601, 2627]
        .includes(
          error.number
        ) &&
      idempotency_key
    ) {
      const poolConsulta =
        await getConnection();

      const existenteResult =
        await poolConsulta.request()
          .input(
            'idempotency_key',
            sql.VarChar(100),
            idempotency_key
          )
          .query(`
            SELECT
              merma_id
            FROM inventario.Merma
            WHERE
              idempotency_key =
              @idempotency_key;
          `);

      const existente =
        existenteResult
          .recordset[0];

      if (existente) {
        const completa =
          await obtenerMermaCompletaPorId(
            existente.merma_id
          );

        return {
          reutilizada: true,
          merma:
            completa.merma,
          detalles:
            completa.detalles
        };
      }
    }


    throw error;
  }
};


module.exports = {
  listarMermas,
  listarDisponibilidad,
  obtenerMermaCompletaPorId,
  crearMermaFIFO
};
