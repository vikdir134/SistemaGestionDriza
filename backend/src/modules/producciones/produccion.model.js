const {
  getConnection,
  sql
} = require('../../config/db');


const crearErrorNegocio = (
  mensaje,
  statusCode = 400,
  codigo = null
) => {
  const error = new Error(mensaje);

  error.statusCode = statusCode;
  error.codigo = codigo;

  return error;
};


const redondear3 = (
  valor
) => {
  return Number(
    Number(valor).toFixed(3)
  );
};


/*
 * La materia prima trabaja con precisión de 3 decimales.
 * Para evitar que el redondeo de porcentajes genere una
 * diferencia de 0.001 KG, los primeros componentes se
 * redondean normalmente y el último absorbe el residuo.
 *
 * Ejemplo:
 * 1 KG con 3 componentes de 33.333333%
 * -> 0.333 + 0.333 + 0.334 = 1.000 KG
 */
const calcularConsumosComposicion = ({
  cantidad_producida,
  componentes
}) => {
  let acumulado = 0;

  return componentes.map(
    (
      componente,
      index
    ) => {
      let cantidad;

      if (
        index ===
        componentes.length - 1
      ) {
        cantidad = redondear3(
          cantidad_producida -
          acumulado
        );

      } else {
        cantidad = redondear3(
          cantidad_producida *
          Number(
            componente.porcentaje
          ) /
          100
        );

        acumulado = redondear3(
          acumulado +
          cantidad
        );
      }

      if (cantidad <= 0) {
        throw crearErrorNegocio(
          'La composición genera un consumo menor o igual a cero. Revisa los porcentajes.',
          400,
          'COMPOSICION_INVALIDA'
        );
      }

      return {
        ...componente,
        cantidad_requerida:
          cantidad
      };
    }
  );
};


const obtenerProduccionPorId = async (
  produccion_id
) => {
  const pool =
    await getConnection();

  const cabeceraResult =
    await pool.request()
      .input(
        'produccion_id',
        sql.Int,
        produccion_id
      )
      .query(`
        SELECT
          p.produccion_id,
          p.fecha_produccion,
          p.observacion,
          p.created_at,
          p.idempotency_key,

          u.nombre_completo
            AS registrado_por

        FROM produccion.Produccion p

        INNER JOIN auth.Usuario u
          ON p.created_by_usuario_id =
             u.usuario_id

        WHERE
          p.produccion_id =
          @produccion_id;
      `);

  const produccion =
    cabeceraResult.recordset[0];

  if (!produccion) {
    return null;
  }

  const detallesResult =
    await pool.request()
      .input(
        'produccion_id',
        sql.Int,
        produccion_id
      )
      .query(`
        SELECT
          pd.produccion_detalle_id,
          pd.produccion_id,

          pd.producto_id,
          tp.nombre AS tipo_producto,
          mat.nombre AS material,
          med.nombre AS medida,
          col.nombre AS color,

          pd.producto_composicion_id,
          pc.version_numero
            AS composicion_version,

          pd.cantidad_producida,
          pd.unidad_medida_id,
          um.codigo AS unidad,

          pd.cantidad_presentacion,
          pd.unidad_presentacion_id,
          up.codigo
            AS unidad_presentacion,

          pd.observacion,
          pd.created_at,

          u.nombre_completo
            AS registrado_por

        FROM produccion.ProduccionDetalle pd

        INNER JOIN catalog.Producto prod
          ON pd.producto_id =
             prod.producto_id

        INNER JOIN catalog.TipoProducto tp
          ON prod.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Material mat
          ON prod.material_id =
             mat.material_id

        INNER JOIN catalog.Medida med
          ON prod.medida_id =
             med.medida_id

        INNER JOIN catalog.Color col
          ON prod.color_id =
             col.color_id

        INNER JOIN catalog.ProductoComposicion pc
          ON pd.producto_composicion_id =
             pc.producto_composicion_id

        INNER JOIN catalog.UnidadMedida um
          ON pd.unidad_medida_id =
             um.unidad_medida_id

        INNER JOIN catalog.UnidadMedida up
          ON pd.unidad_presentacion_id =
             up.unidad_medida_id

        INNER JOIN auth.Usuario u
          ON pd.created_by_usuario_id =
             u.usuario_id

        WHERE
          pd.produccion_id =
          @produccion_id

        ORDER BY
          pd.produccion_detalle_id ASC;
      `);

  const consumosResult =
    await pool.request()
      .input(
        'produccion_id',
        sql.Int,
        produccion_id
      )
      .query(`
        SELECT
          mm.movimiento_materia_prima_id,
          mm.produccion_detalle_id,
          mm.stock_materia_prima_lote_id,
          mm.cantidad,
          mm.fecha_movimiento,

          d.material_id,
          m.nombre AS material,

          d.color_id,
          c.nombre AS color,

          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.fecha_compra

        FROM inventario.MovimientoMateriaPrima mm

        INNER JOIN produccion.ProduccionDetalle pd
          ON mm.produccion_detalle_id =
             pd.produccion_detalle_id

        INNER JOIN inventario.StockMateriaPrimaLote s
          ON mm.stock_materia_prima_lote_id =
             s.stock_materia_prima_lote_id

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

        WHERE
          pd.produccion_id =
            @produccion_id
          AND mm.tipo_movimiento =
            'SALIDA_PRODUCCION'

        ORDER BY
          mm.produccion_detalle_id ASC,
          cmp.fecha_compra ASC,
          cmp.compra_materia_prima_id ASC,
          mm.movimiento_materia_prima_id ASC;
      `);

  const ingresosResult =
    await pool.request()
      .input(
        'produccion_id',
        sql.Int,
        produccion_id
      )
      .query(`
        SELECT
          mpt.movimiento_producto_terminado_id,
          mpt.produccion_detalle_id,
          mpt.stock_producto_terminado_id,
          mpt.cantidad,
          mpt.fecha_movimiento,

          s.cantidad_disponible
            AS stock_actual

        FROM inventario.MovimientoProductoTerminado mpt

        INNER JOIN produccion.ProduccionDetalle pd
          ON mpt.produccion_detalle_id =
             pd.produccion_detalle_id

        INNER JOIN inventario.StockProductoTerminado s
          ON mpt.stock_producto_terminado_id =
             s.stock_producto_terminado_id

        WHERE
          pd.produccion_id =
            @produccion_id
          AND mpt.tipo_movimiento =
            'ENTRADA_PRODUCCION'

        ORDER BY
          mpt.produccion_detalle_id ASC,
          mpt.movimiento_producto_terminado_id ASC;
      `);

  const consumosPorDetalle =
    new Map();

  for (
    const consumo of
    consumosResult.recordset
  ) {
    const detalleId =
      Number(
        consumo.produccion_detalle_id
      );

    if (
      !consumosPorDetalle.has(
        detalleId
      )
    ) {
      consumosPorDetalle.set(
        detalleId,
        []
      );
    }

    consumosPorDetalle
      .get(detalleId)
      .push(consumo);
  }

  const ingresosPorDetalle =
    new Map(
      ingresosResult.recordset.map(
        (ingreso) => [
          Number(
            ingreso.produccion_detalle_id
          ),
          ingreso
        ]
      )
    );

  const detalles =
    detallesResult.recordset.map(
      (detalle) => ({
        ...detalle,

        consumos_materia_prima:
          consumosPorDetalle.get(
            Number(
              detalle.produccion_detalle_id
            )
          ) || [],

        ingreso_producto_terminado:
          ingresosPorDetalle.get(
            Number(
              detalle.produccion_detalle_id
            )
          ) || null
      })
    );

  return {
    ...produccion,
    detalles
  };
};


const listarProducciones = async ({
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
          p.produccion_id,
          p.fecha_produccion,
          p.observacion,
          p.created_at,

          u.nombre_completo
            AS registrado_por,

          COUNT(
            pd.produccion_detalle_id
          ) AS cantidad_items,

          ISNULL(
            SUM(
              pd.cantidad_producida
            ),
            0
          ) AS total_producido_kg,

          COUNT(*) OVER()
            AS total_registros

        FROM produccion.Produccion p

        INNER JOIN auth.Usuario u
          ON p.created_by_usuario_id =
             u.usuario_id

        LEFT JOIN produccion.ProduccionDetalle pd
          ON p.produccion_id =
             pd.produccion_id

        GROUP BY
          p.produccion_id,
          p.fecha_produccion,
          p.observacion,
          p.created_at,
          u.nombre_completo

        ORDER BY
          p.fecha_produccion DESC,
          p.produccion_id DESC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const producciones =
    result.recordset;

  const total =
    producciones.length > 0
      ? producciones[0]
          .total_registros
      : 0;

  return {
    producciones,
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


const buscarProduccionPorIdempotencyKey = async (
  idempotency_key,
  transaction = null
) => {
  if (!idempotency_key) {
    return null;
  }

  if (transaction) {
    const result =
      await new sql.Request(
        transaction
      )
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key
        )
        .query(`
          SELECT TOP 1
            produccion_id
          FROM produccion.Produccion
            WITH (
              UPDLOCK,
              HOLDLOCK
            )
          WHERE
            idempotency_key =
            @idempotency_key;
        `);

    return result.recordset[0] ||
      null;
  }

  const pool =
    await getConnection();

  const result =
    await pool.request()
      .input(
        'idempotency_key',
        sql.VarChar(100),
        idempotency_key
      )
      .query(`
        SELECT TOP 1
          produccion_id
        FROM produccion.Produccion
        WHERE
          idempotency_key =
          @idempotency_key;
      `);

  return result.recordset[0] ||
    null;
};


const obtenerUnidadKg = async (
  transaction
) => {
  const result =
    await new sql.Request(
      transaction
    )
      .query(`
        SELECT TOP 1
          unidad_medida_id,
          codigo,
          nombre
        FROM catalog.UnidadMedida
        WHERE
          codigo = 'KG'
          AND activo = 1;
      `);

  const unidad =
    result.recordset[0];

  if (!unidad) {
    throw crearErrorNegocio(
      'No existe una unidad KG activa en el catálogo',
      500,
      'KG_NO_CONFIGURADO'
    );
  }

  return unidad;
};


const cargarProductoYComposicion = async ({
  transaction,
  producto_id
}) => {
  const productoResult =
    await new sql.Request(
      transaction
    )
      .input(
        'producto_id',
        sql.Int,
        producto_id
      )
      .query(`
        SELECT
          p.producto_id,

          tp.nombre
            AS tipo_producto,
          mat.nombre
            AS material_producto,
          med.nombre
            AS medida,
          col.nombre
            AS color_producto,

          pc.producto_composicion_id,
          pc.version_numero
            AS composicion_version

        FROM catalog.Producto p

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

        LEFT JOIN catalog.ProductoComposicion pc
          WITH (HOLDLOCK)
          ON p.producto_id =
             pc.producto_id
         AND pc.vigente = 1

        WHERE
          p.producto_id =
            @producto_id
          AND p.activo = 1;
      `);

  const producto =
    productoResult.recordset[0];

  if (!producto) {
    throw crearErrorNegocio(
      `El producto ${producto_id} no existe o está inactivo`,
      404,
      'PRODUCTO_NO_ENCONTRADO'
    );
  }

  if (
    !producto
      .producto_composicion_id
  ) {
    throw crearErrorNegocio(
      [
        'El producto',
        producto.tipo_producto,
        producto.material_producto,
        producto.medida,
        producto.color_producto,
        'no tiene una composición vigente.'
      ].join(' '),
      409,
      'PRODUCTO_SIN_COMPOSICION'
    );
  }

  const componentesResult =
    await new sql.Request(
      transaction
    )
      .input(
        'producto_composicion_id',
        sql.Int,
        producto
          .producto_composicion_id
      )
      .query(`
        SELECT
          pcd.producto_composicion_detalle_id,
          pcd.material_id,
          m.nombre AS material,
          pcd.color_id,
          c.nombre AS color,
          pcd.porcentaje

        FROM catalog.ProductoComposicionDetalle pcd

        INNER JOIN catalog.Material m
          ON pcd.material_id =
             m.material_id

        INNER JOIN catalog.Color c
          ON pcd.color_id =
             c.color_id

        WHERE
          pcd.producto_composicion_id =
          @producto_composicion_id

        ORDER BY
          pcd.producto_composicion_detalle_id ASC;
      `);

  const componentes =
    componentesResult.recordset;

  if (
    componentes.length === 0
  ) {
    throw crearErrorNegocio(
      'La composición vigente no tiene materias primas configuradas',
      409,
      'COMPOSICION_SIN_DETALLE'
    );
  }

  const totalPorcentaje =
    Number(
      componentes
        .reduce(
          (
            total,
            componente
          ) =>
            total +
            Number(
              componente.porcentaje
            ),
          0
        )
        .toFixed(6)
    );

  if (
    Math.abs(
      totalPorcentaje - 100
    ) > 0.000001
  ) {
    throw crearErrorNegocio(
      `La composición vigente suma ${totalPorcentaje}% y debe sumar 100%`,
      409,
      'COMPOSICION_INVALIDA'
    );
  }

  return {
    ...producto,
    componentes
  };
};


const validarUnidadPresentacion = async ({
  transaction,
  unidad_presentacion_id
}) => {
  const result =
    await new sql.Request(
      transaction
    )
      .input(
        'unidad_presentacion_id',
        sql.Int,
        unidad_presentacion_id
      )
      .query(`
        SELECT
          unidad_medida_id,
          codigo,
          nombre
        FROM catalog.UnidadMedida
        WHERE
          unidad_medida_id =
            @unidad_presentacion_id
          AND activo = 1;
      `);

  const unidad =
    result.recordset[0];

  if (!unidad) {
    throw crearErrorNegocio(
      'La unidad de presentación no existe o está inactiva',
      400,
      'UNIDAD_PRESENTACION_INVALIDA'
    );
  }

  return unidad;
};


/*
 * Bloquea y devuelve todos los lotes disponibles de una
 * materia prima en el mismo orden que utiliza FIFO.
 *
 * El bloqueo ocurre ANTES de crear la Producción para poder
 * validar el stock completo sin dejar escrituras parciales.
 */
const bloquearLotesFIFO = async ({
  transaction,
  material_id,
  color_id
}) => {
  const result =
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
          s.stock_materia_prima_lote_id,
          s.cantidad_disponible,

          d.compra_materia_prima_detalle_id,
          d.material_id,
          d.color_id,

          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.fecha_compra

        FROM inventario.StockMateriaPrimaLote s
          WITH (
            UPDLOCK,
            HOLDLOCK,
            ROWLOCK
          )

        INNER JOIN compras.CompraMateriaPrimaDetalle d
          ON s.compra_materia_prima_detalle_id =
             d.compra_materia_prima_detalle_id

        INNER JOIN compras.CompraMateriaPrima cmp
          ON d.compra_materia_prima_id =
             cmp.compra_materia_prima_id

        WHERE
          d.material_id =
            @material_id
          AND d.color_id =
            @color_id
          AND s.cantidad_disponible > 0

        ORDER BY
          cmp.fecha_compra ASC,
          cmp.compra_materia_prima_id ASC,
          s.stock_materia_prima_lote_id ASC;
      `);

  return result.recordset.map(
    (lote) => ({
      ...lote,
      cantidad_disponible:
        redondear3(
          lote.cantidad_disponible
        )
    })
  );
};


const crearProduccion = async ({
  fecha_produccion,
  observacion,
  detalles,
  created_by_usuario_id,
  idempotency_key
}) => {
  const pool =
    await getConnection();

  const transaction =
    new sql.Transaction(pool);

  try {
    await transaction.begin(
      sql.ISOLATION_LEVEL.SERIALIZABLE
    );

    /* =====================================================
       1. IDEMPOTENCIA
       ===================================================== */

    const produccionExistente =
      await buscarProduccionPorIdempotencyKey(
        idempotency_key,
        transaction
      );

    if (produccionExistente) {
      await transaction.commit();

      return {
        reutilizada: true,
        produccion:
          await obtenerProduccionPorId(
            produccionExistente
              .produccion_id
          )
      };
    }


    /* =====================================================
       2. UNIDAD BASE

       La composición se calcula por peso.
       Por ahora la producción operativa se registra en KG.
       ===================================================== */

    const unidadKg =
      await obtenerUnidadKg(
        transaction
      );


    /* =====================================================
       3. CARGAR PRODUCTOS + COMPOSICIONES
       ===================================================== */

    const detallesPreparados = [];

    for (
      const detalle of detalles
    ) {
      const producto =
        await cargarProductoYComposicion({
          transaction,
          producto_id:
            detalle.producto_id
        });

      const unidadPresentacion =
        await validarUnidadPresentacion({
          transaction,
          unidad_presentacion_id:
            detalle
              .unidad_presentacion_id
        });

      const consumos =
        calcularConsumosComposicion({
          cantidad_producida:
            detalle
              .cantidad_producida,
          componentes:
            producto.componentes
        });

      detallesPreparados.push({
        ...detalle,
        producto,
        unidadPresentacion,
        consumos
      });
    }


    /* =====================================================
       4. AGRUPAR REQUERIMIENTO TOTAL POR MATERIAL + COLOR

       Antes de descontar un solo gramo validamos TODO.
       ===================================================== */

    const requerimientos =
      new Map();

    for (
      const detalle of
      detallesPreparados
    ) {
      for (
        const consumo of
        detalle.consumos
      ) {
        const clave =
          `${consumo.material_id}-${consumo.color_id}`;

        if (
          !requerimientos.has(
            clave
          )
        ) {
          requerimientos.set(
            clave,
            {
              material_id:
                consumo.material_id,
              material:
                consumo.material,
              color_id:
                consumo.color_id,
              color:
                consumo.color,
              cantidad_requerida: 0
            }
          );
        }

        const actual =
          requerimientos.get(
            clave
          );

        actual.cantidad_requerida =
          redondear3(
            actual.cantidad_requerida +
            consumo.cantidad_requerida
          );
      }
    }


    /* =====================================================
       5. BLOQUEAR FIFO Y VALIDAR STOCK COMPLETO
       ===================================================== */

    const fifoPorMateria =
      new Map();

    const requerimientosOrdenados =
      [
        ...requerimientos.values()
      ].sort(
        (a, b) =>
          a.material_id -
            b.material_id ||
          a.color_id -
            b.color_id
      );

    for (
      const requerimiento of
      requerimientosOrdenados
    ) {
      const lotes =
        await bloquearLotesFIFO({
          transaction,
          material_id:
            requerimiento.material_id,
          color_id:
            requerimiento.color_id
        });

      const disponible =
        redondear3(
          lotes.reduce(
            (
              total,
              lote
            ) =>
              total +
              Number(
                lote.cantidad_disponible
              ),
            0
          )
        );

      if (
        disponible + 0.000001 <
        requerimiento
          .cantidad_requerida
      ) {
        throw crearErrorNegocio(
          [
            'Stock insuficiente de',
            requerimiento.material,
            requerimiento.color + '.',
            'Se requieren',
            `${requerimiento.cantidad_requerida.toFixed(3)} KG`,
            'y hay',
            `${disponible.toFixed(3)} KG disponibles.`
          ].join(' '),
          409,
          'STOCK_MATERIA_PRIMA_INSUFICIENTE'
        );
      }

      fifoPorMateria.set(
        `${requerimiento.material_id}-${requerimiento.color_id}`,
        lotes
      );
    }


    /* =====================================================
       6. CREAR CABECERA

       SCOPE_IDENTITY evita el problema de OUTPUT en tablas
       que puedan tener triggers habilitados.
       ===================================================== */

    const produccionResult =
      await new sql.Request(
        transaction
      )
        .input(
          'fecha_produccion',
          sql.Date,
          fecha_produccion
        )
        .input(
          'observacion',
          sql.NVarChar(500),
          observacion || null
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key
        )
        .query(`
          INSERT INTO produccion.Produccion (
            fecha_produccion,
            observacion,
            created_by_usuario_id,
            idempotency_key
          )
          VALUES (
            @fecha_produccion,
            @observacion,
            @created_by_usuario_id,
            @idempotency_key
          );

          SELECT
            CONVERT(
              INT,
              SCOPE_IDENTITY()
            ) AS produccion_id;
        `);

    const produccion_id =
      produccionResult
        .recordset[0]
        .produccion_id;


    /* =====================================================
       7. DETALLES + FIFO + STOCK PRODUCTO TERMINADO
       ===================================================== */

    for (
      const detalle of
      detallesPreparados
    ) {
      const detalleResult =
        await new sql.Request(
          transaction
        )
          .input(
            'produccion_id',
            sql.Int,
            produccion_id
          )
          .input(
            'producto_id',
            sql.Int,
            detalle.producto_id
          )
          .input(
            'producto_composicion_id',
            sql.Int,
            detalle.producto
              .producto_composicion_id
          )
          .input(
            'cantidad_producida',
            sql.Decimal(18, 3),
            detalle.cantidad_producida
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            unidadKg.unidad_medida_id
          )
          .input(
            'cantidad_presentacion',
            sql.Decimal(18, 3),
            detalle
              .cantidad_presentacion
          )
          .input(
            'unidad_presentacion_id',
            sql.Int,
            detalle
              .unidad_presentacion_id
          )
          .input(
            'observacion',
            sql.NVarChar(300),
            detalle.observacion || null
          )
          .input(
            'created_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            INSERT INTO produccion.ProduccionDetalle (
              produccion_id,
              producto_id,
              producto_composicion_id,
              cantidad_producida,
              unidad_medida_id,
              cantidad_presentacion,
              unidad_presentacion_id,
              observacion,
              created_by_usuario_id
            )
            VALUES (
              @produccion_id,
              @producto_id,
              @producto_composicion_id,
              @cantidad_producida,
              @unidad_medida_id,
              @cantidad_presentacion,
              @unidad_presentacion_id,
              @observacion,
              @created_by_usuario_id
            );

            SELECT
              CONVERT(
                INT,
                SCOPE_IDENTITY()
              ) AS produccion_detalle_id;
          `);

      const produccion_detalle_id =
        detalleResult
          .recordset[0]
          .produccion_detalle_id;


      /* ---------------------------------------------------
         7A. CONSUMO FIFO DE MATERIA PRIMA
         --------------------------------------------------- */

      for (
        const consumo of
        detalle.consumos
      ) {
        const clave =
          `${consumo.material_id}-${consumo.color_id}`;

        const lotes =
          fifoPorMateria.get(
            clave
          );

        let pendiente =
          redondear3(
            consumo.cantidad_requerida
          );

        for (
          const lote of lotes
        ) {
          if (
            pendiente <= 0
          ) {
            break;
          }

          if (
            lote.cantidad_disponible <= 0
          ) {
            continue;
          }

          const retirar =
            redondear3(
              Math.min(
                pendiente,
                lote.cantidad_disponible
              )
            );

          if (retirar <= 0) {
            continue;
          }

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
                sql.Decimal(18, 3),
                retirar
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
                  AND cantidad_disponible >=
                    @cantidad;

                SELECT
                  @@ROWCOUNT AS filas_afectadas;
              `);

          if (
            updateResult.recordset[0]
              .filas_afectadas !== 1
          ) {
            throw crearErrorNegocio(
              'El stock cambió durante el registro de producción. Intenta nuevamente.',
              409,
              'CONFLICTO_STOCK'
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
              sql.Decimal(18, 3),
              retirar
            )
            .input(
              'produccion_detalle_id',
              sql.Int,
              produccion_detalle_id
            )
            .input(
              'observacion',
              sql.NVarChar(400),
              `Consumo FIFO por producción #${produccion_id}`
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
                created_by_usuario_id,
                produccion_detalle_id,
                merma_detalle_id
              )
              VALUES (
                @stock_materia_prima_lote_id,
                'SALIDA_PRODUCCION',
                @cantidad,
                @observacion,
                @created_by_usuario_id,
                @produccion_detalle_id,
                NULL
              );
            `);

          lote.cantidad_disponible =
            redondear3(
              lote.cantidad_disponible -
              retirar
            );

          pendiente =
            redondear3(
              pendiente -
              retirar
            );
        }

        if (
          pendiente > 0.000001
        ) {
          throw crearErrorNegocio(
            'No fue posible completar el consumo FIFO de materia prima.',
            409,
            'FIFO_INCOMPLETO'
          );
        }
      }


      /* ---------------------------------------------------
         7B. UPSERT STOCK PRODUCTO TERMINADO
         --------------------------------------------------- */

      const stockExistenteResult =
        await new sql.Request(
          transaction
        )
          .input(
            'producto_id',
            sql.Int,
            detalle.producto_id
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            unidadKg.unidad_medida_id
          )
          .input(
            'cantidad_presentacion',
            sql.Decimal(18, 3),
            detalle
              .cantidad_presentacion
          )
          .input(
            'unidad_presentacion_id',
            sql.Int,
            detalle
              .unidad_presentacion_id
          )
          .query(`
            SELECT
              stock_producto_terminado_id,
              cantidad_disponible

            FROM inventario.StockProductoTerminado
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            WHERE
              producto_id =
                @producto_id
              AND unidad_medida_id =
                @unidad_medida_id
              AND cantidad_presentacion =
                @cantidad_presentacion
              AND unidad_presentacion_id =
                @unidad_presentacion_id;
          `);

      let stock_producto_terminado_id;

      if (
        stockExistenteResult
          .recordset[0]
      ) {
        stock_producto_terminado_id =
          stockExistenteResult
            .recordset[0]
            .stock_producto_terminado_id;

        await new sql.Request(
          transaction
        )
          .input(
            'stock_producto_terminado_id',
            sql.Int,
            stock_producto_terminado_id
          )
          .input(
            'cantidad',
            sql.Decimal(18, 3),
            detalle.cantidad_producida
          )
          .input(
            'updated_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            UPDATE inventario.StockProductoTerminado
            SET
              cantidad_disponible =
                cantidad_disponible +
                @cantidad,

              updated_at =
                SYSDATETIME(),

              updated_by_usuario_id =
                @updated_by_usuario_id

            WHERE
              stock_producto_terminado_id =
              @stock_producto_terminado_id;
          `);

      } else {
        const nuevoStockResult =
          await new sql.Request(
            transaction
          )
            .input(
              'producto_id',
              sql.Int,
              detalle.producto_id
            )
            .input(
              'unidad_medida_id',
              sql.Int,
              unidadKg.unidad_medida_id
            )
            .input(
              'cantidad_presentacion',
              sql.Decimal(18, 3),
              detalle
                .cantidad_presentacion
            )
            .input(
              'unidad_presentacion_id',
              sql.Int,
              detalle
                .unidad_presentacion_id
            )
            .input(
              'cantidad_disponible',
              sql.Decimal(18, 3),
              detalle.cantidad_producida
            )
            .input(
              'created_by_usuario_id',
              sql.Int,
              created_by_usuario_id
            )
            .query(`
              INSERT INTO inventario.StockProductoTerminado (
                producto_id,
                unidad_medida_id,
                cantidad_presentacion,
                unidad_presentacion_id,
                cantidad_disponible,
                created_by_usuario_id
              )
              VALUES (
                @producto_id,
                @unidad_medida_id,
                @cantidad_presentacion,
                @unidad_presentacion_id,
                @cantidad_disponible,
                @created_by_usuario_id
              );

              SELECT
                CONVERT(
                  INT,
                  SCOPE_IDENTITY()
                ) AS stock_producto_terminado_id;
            `);

        stock_producto_terminado_id =
          nuevoStockResult
            .recordset[0]
            .stock_producto_terminado_id;
      }


      /* ---------------------------------------------------
         7C. MOVIMIENTO DE ENTRADA PT
         --------------------------------------------------- */

      await new sql.Request(
        transaction
      )
        .input(
          'stock_producto_terminado_id',
          sql.Int,
          stock_producto_terminado_id
        )
        .input(
          'cantidad',
          sql.Decimal(18, 3),
          detalle.cantidad_producida
        )
        .input(
          'produccion_detalle_id',
          sql.Int,
          produccion_detalle_id
        )
        .input(
          'observacion',
          sql.NVarChar(400),
          `Entrada por producción #${produccion_id}`
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .query(`
          INSERT INTO inventario.MovimientoProductoTerminado (
            stock_producto_terminado_id,
            tipo_movimiento,
            cantidad,
            produccion_detalle_id,
            entrega_detalle_id,
            observacion,
            created_by_usuario_id
          )
          VALUES (
            @stock_producto_terminado_id,
            'ENTRADA_PRODUCCION',
            @cantidad,
            @produccion_detalle_id,
            NULL,
            @observacion,
            @created_by_usuario_id
          );
        `);
    }


    /* =====================================================
       8. COMMIT
       ===================================================== */

    await transaction.commit();

    return {
      reutilizada: false,
      produccion:
        await obtenerProduccionPorId(
          produccion_id
        )
    };

  } catch (error) {
    try {
      await transaction.rollback();
    } catch (_) {
      // Conservamos el error original.
    }

    /*
     * Si dos solicitudes con la misma key llegaron casi
     * simultáneamente, el índice único es la segunda barrera.
     */
    if (
      [2601, 2627].includes(
        error.number
      ) &&
      idempotency_key
    ) {
      const existente =
        await buscarProduccionPorIdempotencyKey(
          idempotency_key
        );

      if (existente) {
        return {
          reutilizada: true,
          produccion:
            await obtenerProduccionPorId(
              existente.produccion_id
            )
        };
      }
    }

    throw error;
  }
};


module.exports = {
  listarProducciones,
  obtenerProduccionPorId,
  crearProduccion
};
