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


const listarPedidosParaEntrega = async ({
  cliente_id,
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
        'cliente_id',
        sql.Int,
        cliente_id || null
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
        WITH Detalles AS (
          SELECT
            pd.pedido_id,
            pd.pedido_detalle_id,
            pd.cantidad_pedida,

            ISNULL(
              SUM(
                ed.cantidad_entregada
              ),
              0
            ) AS cantidad_entregada

          FROM ventas.PedidoDetalle pd

          LEFT JOIN ventas.EntregaDetalle ed
            ON pd.pedido_detalle_id =
               ed.pedido_detalle_id

          WHERE
            pd.activo = 1

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

            COUNT(
              d.pedido_detalle_id
            ) AS cantidad_items,

            SUM(
              CASE
                WHEN
                  d.cantidad_entregada >=
                  d.cantidad_pedida
                THEN 1
                ELSE 0
              END
            ) AS items_completos,

            SUM(
              CASE
                WHEN
                  d.cantidad_entregada > 0
                  AND
                  d.cantidad_entregada <
                  d.cantidad_pedida
                THEN 1
                ELSE 0
              END
            ) AS items_parciales,

            SUM(
              CASE
                WHEN
                  d.cantidad_entregada = 0
                THEN 1
                ELSE 0
              END
            ) AS items_pendientes

          FROM ventas.Pedido p

          INNER JOIN crm.Cliente c
            ON p.cliente_id =
               c.cliente_id

          INNER JOIN Detalles d
            ON p.pedido_id =
               d.pedido_id

          WHERE
            p.estado_pedido
            IN (
              'REGISTRADO',
              'PARCIAL'
            )

            AND (
              @cliente_id IS NULL
              OR p.cliente_id =
                 @cliente_id
            )

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
            WHEN
              items_completos =
              cantidad_items
            THEN 'COMPLETO'

            WHEN
              items_parciales > 0
              OR items_completos > 0
            THEN 'PARCIAL'

            ELSE 'PENDIENTE'
          END AS estado_entrega_general,

          COUNT(*) OVER()
            AS total_registros

        FROM Resumen

        ORDER BY
          created_at DESC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const pedidos =
    result.recordset;

  const total =
    pedidos.length > 0
      ? Number(
          pedidos[0]
            .total_registros
        )
      : 0;

  return {
    pedidos,
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


const obtenerPedidoParaEntrega = async (
  pedido_id
) => {
  const pool =
    await getConnection();

  const pedidoResult =
    await pool.request()
      .input(
        'pedido_id',
        sql.Int,
        pedido_id
      )
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
          ON p.cliente_id =
             c.cliente_id

        WHERE
          p.pedido_id =
          @pedido_id;
      `);

  const pedido =
    pedidoResult.recordset[0];

  if (!pedido) {
    return null;
  }

  const detallesResult =
    await pool.request()
      .input(
        'pedido_id',
        sql.Int,
        pedido_id
      )
      .query(`
        SELECT
          pd.pedido_detalle_id,
          pd.pedido_id,

          producto_resuelto.producto_id,

          pd.tipo_producto_id,
          tp.nombre
            AS tipo_producto,

          pd.medida_id,
          m.nombre
            AS medida,

          pd.color_id,
          col.nombre
            AS color,

          pd.material_id,
          mat.nombre
            AS material,

          pd.cantidad_pedida,
          pd.unidad_medida_id,
          um.codigo
            AS unidad,

          ISNULL(
            entregas.cantidad_entregada,
            0
          ) AS cantidad_entregada,

          pd.cantidad_pedida -
          ISNULL(
            entregas.cantidad_entregada,
            0
          ) AS cantidad_pendiente,

          CASE
            WHEN
              ISNULL(
                entregas.cantidad_entregada,
                0
              ) >=
              pd.cantidad_pedida
            THEN 'COMPLETO'

            WHEN
              ISNULL(
                entregas.cantidad_entregada,
                0
              ) > 0
            THEN 'PARCIAL'

            ELSE 'PENDIENTE'
          END AS estado_item,

          pd.cantidad_presentacion,
          pd.unidad_presentacion_id,
          up.codigo
            AS unidad_presentacion,

          stock.stock_producto_terminado_id,

          ISNULL(
            stock.cantidad_disponible,
            0
          ) AS stock_disponible,

          CASE
            WHEN
              pd.cantidad_presentacion > 0
            THEN
              CONVERT(
                decimal(18, 3),
                ISNULL(
                  stock.cantidad_disponible,
                  0
                ) /
                pd.cantidad_presentacion
              )
            ELSE NULL
          END AS presentaciones_disponibles,

          CASE
            WHEN
              producto_resuelto.producto_id
              IS NULL
            THEN 'SIN_PRODUCTO'

            WHEN
              pd.cantidad_presentacion
              IS NULL
              OR
              pd.unidad_presentacion_id
              IS NULL
            THEN 'SIN_PRESENTACION'

            WHEN
              stock.stock_producto_terminado_id
              IS NULL
              OR
              stock.cantidad_disponible <= 0
            THEN 'SIN_STOCK'

            ELSE 'CON_STOCK'
          END AS estado_stock,

          pd.precio_unitario,
          pd.moneda_codigo,
          pd.descripcion_item,
          pd.observacion

        FROM ventas.PedidoDetalle pd

        INNER JOIN catalog.TipoProducto tp
          ON pd.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Medida m
          ON pd.medida_id =
             m.medida_id

        INNER JOIN catalog.Color col
          ON pd.color_id =
             col.color_id

        INNER JOIN catalog.Material mat
          ON pd.material_id =
             mat.material_id

        INNER JOIN catalog.UnidadMedida um
          ON pd.unidad_medida_id =
             um.unidad_medida_id

        LEFT JOIN catalog.UnidadMedida up
          ON pd.unidad_presentacion_id =
             up.unidad_medida_id

        OUTER APPLY (
          SELECT
            ISNULL(
              SUM(
                ed.cantidad_entregada
              ),
              0
            ) AS cantidad_entregada

          FROM ventas.EntregaDetalle ed

          WHERE
            ed.pedido_detalle_id =
            pd.pedido_detalle_id
        ) entregas

        OUTER APPLY (
          SELECT TOP 1
            p.producto_id

          FROM catalog.Producto p

          WHERE
            p.activo = 1

            AND (
              (
                pd.producto_id IS NOT NULL
                AND
                p.producto_id =
                pd.producto_id
              )

              OR

              (
                pd.producto_id IS NULL

                AND
                p.tipo_producto_id =
                pd.tipo_producto_id

                AND
                p.medida_id =
                pd.medida_id

                AND
                p.color_id =
                pd.color_id

                AND
                p.material_id =
                pd.material_id
              )
            )

          ORDER BY
            CASE
              WHEN
                p.producto_id =
                pd.producto_id
              THEN 0
              ELSE 1
            END,
            p.producto_id
        ) producto_resuelto

        OUTER APPLY (
          SELECT TOP 1
            s.stock_producto_terminado_id,
            s.cantidad_disponible

          FROM inventario.StockProductoTerminado s

          WHERE
            s.producto_id =
              producto_resuelto.producto_id

            AND
            s.unidad_medida_id =
              pd.unidad_medida_id

            AND
            s.cantidad_presentacion =
              pd.cantidad_presentacion

            AND
            s.unidad_presentacion_id =
              pd.unidad_presentacion_id
        ) stock

        WHERE
          pd.pedido_id =
          @pedido_id

          AND
          pd.activo = 1

        ORDER BY
          pd.pedido_detalle_id ASC;
      `);

  const detalles =
    detallesResult.recordset;

  const historialResult =
    await pool.request()
      .input(
        'pedido_id',
        sql.Int,
        pedido_id
      )
      .query(`
        SELECT
          e.entrega_id,
          e.fecha_entrega,
          e.comentario_entrega,
          e.created_at,

          u.nombre_completo
            AS registrado_por,

          ed.entrega_detalle_id,
          ed.pedido_detalle_id,
          ed.cantidad_entregada,
          ed.observacion,

          tp.nombre
            AS tipo_producto,

          m.nombre
            AS medida,

          col.nombre
            AS color,

          mat.nombre
            AS material,

          um.codigo
            AS unidad,

          pd.cantidad_presentacion,
          up.codigo
            AS unidad_presentacion

        FROM ventas.Entrega e

        INNER JOIN auth.Usuario u
          ON e.created_by_usuario_id =
             u.usuario_id

        INNER JOIN ventas.EntregaDetalle ed
          ON e.entrega_id =
             ed.entrega_id

        INNER JOIN ventas.PedidoDetalle pd
          ON ed.pedido_detalle_id =
             pd.pedido_detalle_id

        INNER JOIN catalog.TipoProducto tp
          ON pd.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Medida m
          ON pd.medida_id =
             m.medida_id

        INNER JOIN catalog.Color col
          ON pd.color_id =
             col.color_id

        INNER JOIN catalog.Material mat
          ON pd.material_id =
             mat.material_id

        INNER JOIN catalog.UnidadMedida um
          ON ed.unidad_medida_id =
             um.unidad_medida_id

        LEFT JOIN catalog.UnidadMedida up
          ON pd.unidad_presentacion_id =
             up.unidad_medida_id

        WHERE
          e.pedido_id =
          @pedido_id

        ORDER BY
          e.fecha_entrega DESC,
          e.entrega_id DESC,
          ed.entrega_detalle_id ASC;
      `);

  const entregasMap =
    new Map();

  historialResult.recordset
    .forEach(
      (row) => {
        if (
          !entregasMap.has(
            row.entrega_id
          )
        ) {
          entregasMap.set(
            row.entrega_id,
            {
              entrega_id:
                row.entrega_id,

              fecha_entrega:
                row.fecha_entrega,

              comentario_entrega:
                row.comentario_entrega,

              created_at:
                row.created_at,

              registrado_por:
                row.registrado_por,

              detalles: []
            }
          );
        }

        entregasMap
          .get(
            row.entrega_id
          )
          .detalles
          .push({
            entrega_detalle_id:
              row.entrega_detalle_id,

            pedido_detalle_id:
              row.pedido_detalle_id,

            cantidad_entregada:
              row.cantidad_entregada,

            observacion:
              row.observacion,

            producto:
              `${row.tipo_producto} ${row.material} ${row.medida} ${row.color}`,

            unidad:
              row.unidad,

            cantidad_presentacion:
              row.cantidad_presentacion,

            unidad_presentacion:
              row.unidad_presentacion
          });
      }
    );

  let estado_entrega_general =
    'PENDIENTE';

  if (
    detalles.length > 0 &&
    detalles.every(
      (d) =>
        d.estado_item ===
        'COMPLETO'
    )
  ) {
    estado_entrega_general =
      'COMPLETO';

  } else if (
    detalles.some(
      (d) =>
        d.estado_item ===
          'PARCIAL' ||
        d.estado_item ===
          'COMPLETO'
    )
  ) {
    estado_entrega_general =
      'PARCIAL';
  }

  return {
    ...pedido,
    estado_entrega_general,
    detalles,
    historial_entregas:
      Array.from(
        entregasMap.values()
      )
  };
};


const obtenerEntregaCompletaPorId = async (
  entrega_id,
  poolOrTransaction = null
) => {
  const executor =
    poolOrTransaction ||
    await getConnection();

  const requestCabecera =
    poolOrTransaction
      ? new sql.Request(
          poolOrTransaction
        )
      : executor.request();

  const cabeceraResult =
    await requestCabecera
      .input(
        'entrega_id',
        sql.Int,
        entrega_id
      )
      .query(`
        SELECT
          e.entrega_id,
          e.pedido_id,
          e.fecha_entrega,
          e.comentario_entrega,
          e.created_at,
          e.idempotency_key,

          u.nombre_completo
            AS registrado_por

        FROM ventas.Entrega e

        INNER JOIN auth.Usuario u
          ON e.created_by_usuario_id =
             u.usuario_id

        WHERE
          e.entrega_id =
          @entrega_id;
      `);

  const entrega =
    cabeceraResult.recordset[0];

  if (!entrega) {
    return null;
  }

  const requestDetalles =
    poolOrTransaction
      ? new sql.Request(
          poolOrTransaction
        )
      : executor.request();

  const detallesResult =
    await requestDetalles
      .input(
        'entrega_id',
        sql.Int,
        entrega_id
      )
      .query(`
        SELECT
          ed.entrega_detalle_id,
          ed.pedido_detalle_id,
          ed.cantidad_entregada,
          ed.unidad_medida_id,
          um.codigo AS unidad,
          ed.observacion,

          pd.producto_id,

          tp.nombre
            AS tipo_producto,

          mat.nombre
            AS material,

          med.nombre
            AS medida,

          col.nombre
            AS color,

          pd.cantidad_presentacion,
          up.codigo
            AS unidad_presentacion,

          mpt.movimiento_producto_terminado_id,
          mpt.stock_producto_terminado_id,

          s.cantidad_disponible
            AS stock_actual

        FROM ventas.EntregaDetalle ed

        INNER JOIN ventas.PedidoDetalle pd
          ON ed.pedido_detalle_id =
             pd.pedido_detalle_id

        INNER JOIN catalog.TipoProducto tp
          ON pd.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Material mat
          ON pd.material_id =
             mat.material_id

        INNER JOIN catalog.Medida med
          ON pd.medida_id =
             med.medida_id

        INNER JOIN catalog.Color col
          ON pd.color_id =
             col.color_id

        INNER JOIN catalog.UnidadMedida um
          ON ed.unidad_medida_id =
             um.unidad_medida_id

        LEFT JOIN catalog.UnidadMedida up
          ON pd.unidad_presentacion_id =
             up.unidad_medida_id

        LEFT JOIN inventario.MovimientoProductoTerminado mpt
          ON ed.entrega_detalle_id =
             mpt.entrega_detalle_id

        LEFT JOIN inventario.StockProductoTerminado s
          ON mpt.stock_producto_terminado_id =
             s.stock_producto_terminado_id

        WHERE
          ed.entrega_id =
          @entrega_id

        ORDER BY
          ed.entrega_detalle_id ASC;
      `);

  return {
    entrega,
    detalles:
      detallesResult.recordset
  };
};


const crearEntregaConDetalles = async ({
  pedido_id,
  fecha_entrega,
  comentario_entrega,
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
              entrega_id
            FROM ventas.Entrega
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
        const existenteCompleta =
          await obtenerEntregaCompletaPorId(
            existente.entrega_id,
            transaction
          );

        await transaction.commit();

        return {
          reutilizada: true,
          entrega:
            existenteCompleta.entrega,
          detalles:
            existenteCompleta.detalles
        };
      }
    }


    /* =====================================================
       2. BLOQUEAR Y VALIDAR PEDIDO
       ===================================================== */

    const pedidoResult =
      await new sql.Request(
        transaction
      )
        .input(
          'pedido_id',
          sql.Int,
          pedido_id
        )
        .query(`
          SELECT
            pedido_id,
            estado_pedido
          FROM ventas.Pedido
            WITH (
              UPDLOCK,
              HOLDLOCK
            )
          WHERE
            pedido_id =
            @pedido_id;
        `);

    const pedido =
      pedidoResult.recordset[0];

    if (!pedido) {
      throw crearErrorNegocio(
        'Pedido no encontrado',
        404
      );
    }

    if (
      pedido.estado_pedido ===
      'CANCELADO'
    ) {
      throw crearErrorNegocio(
        'No se puede registrar una entrega para un pedido cancelado'
      );
    }

    if (
      pedido.estado_pedido ===
      'ENTREGADO'
    ) {
      throw crearErrorNegocio(
        'El pedido ya fue entregado completamente'
      );
    }


    /* =====================================================
       3. VALIDAR DETALLES Y RESOLVER STOCK EXACTO
       ===================================================== */

    const detallesValidados =
      [];

    const demandaPorStock =
      new Map();


    for (
      const item
      of detalles
    ) {
      const detalleResult =
        await new sql.Request(
          transaction
        )
          .input(
            'pedido_detalle_id',
            sql.Int,
            item.pedido_detalle_id
          )
          .input(
            'pedido_id',
            sql.Int,
            pedido_id
          )
          .query(`
            SELECT
              pd.pedido_detalle_id,
              pd.pedido_id,
              pd.producto_id,

              producto_resuelto.producto_id
                AS producto_resuelto_id,

              tp.nombre
                AS tipo_producto,

              mat.nombre
                AS material,

              med.nombre
                AS medida,

              col.nombre
                AS color,

              pd.cantidad_pedida,
              pd.unidad_medida_id,
              um.codigo
                AS unidad,

              pd.cantidad_presentacion,
              pd.unidad_presentacion_id,
              up.codigo
                AS unidad_presentacion,

              ISNULL(
                entregado.total_entregado,
                0
              ) AS cantidad_entregada_anterior,

              pd.cantidad_pedida -
              ISNULL(
                entregado.total_entregado,
                0
              ) AS cantidad_pendiente

            FROM ventas.PedidoDetalle pd
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            INNER JOIN catalog.TipoProducto tp
              ON pd.tipo_producto_id =
                 tp.tipo_producto_id

            INNER JOIN catalog.Material mat
              ON pd.material_id =
                 mat.material_id

            INNER JOIN catalog.Medida med
              ON pd.medida_id =
                 med.medida_id

            INNER JOIN catalog.Color col
              ON pd.color_id =
                 col.color_id

            INNER JOIN catalog.UnidadMedida um
              ON pd.unidad_medida_id =
                 um.unidad_medida_id

            LEFT JOIN catalog.UnidadMedida up
              ON pd.unidad_presentacion_id =
                 up.unidad_medida_id

            OUTER APPLY (
              SELECT
                ISNULL(
                  SUM(
                    ed.cantidad_entregada
                  ),
                  0
                ) AS total_entregado

              FROM ventas.EntregaDetalle ed

              WHERE
                ed.pedido_detalle_id =
                pd.pedido_detalle_id
            ) entregado

            OUTER APPLY (
              SELECT TOP 1
                p.producto_id

              FROM catalog.Producto p

              WHERE
                p.activo = 1

                AND (
                  (
                    pd.producto_id
                    IS NOT NULL

                    AND
                    p.producto_id =
                    pd.producto_id
                  )

                  OR

                  (
                    pd.producto_id
                    IS NULL

                    AND
                    p.tipo_producto_id =
                    pd.tipo_producto_id

                    AND
                    p.material_id =
                    pd.material_id

                    AND
                    p.medida_id =
                    pd.medida_id

                    AND
                    p.color_id =
                    pd.color_id
                  )
                )

              ORDER BY
                CASE
                  WHEN
                    p.producto_id =
                    pd.producto_id
                  THEN 0
                  ELSE 1
                END,
                p.producto_id
            ) producto_resuelto

            WHERE
              pd.pedido_detalle_id =
                @pedido_detalle_id

              AND
              pd.pedido_id =
                @pedido_id

              AND
              pd.activo = 1;
          `);

      const detallePedido =
        detalleResult.recordset[0];

      if (!detallePedido) {
        throw crearErrorNegocio(
          'Uno de los productos no pertenece al pedido o ya no está activo'
        );
      }


      if (
        Number(
          item.unidad_medida_id
        ) !==
        Number(
          detallePedido
            .unidad_medida_id
        )
      ) {
        throw crearErrorNegocio(
          `La unidad de entrega de ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} no coincide con la unidad del pedido`
        );
      }


      if (
        !detallePedido
          .producto_resuelto_id
      ) {
        throw crearErrorNegocio(
          `El producto ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} no existe en el catálogo de productos terminados`
        );
      }


      if (
        !detallePedido
          .cantidad_presentacion ||
        Number(
          detallePedido
            .cantidad_presentacion
        ) <= 0 ||
        !detallePedido
          .unidad_presentacion_id
      ) {
        throw crearErrorNegocio(
          `El producto ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} no tiene una presentación configurada en el pedido`
        );
      }


      const cantidadEntregada =
        Number(
          item.cantidad_entregada
        );

      const cantidadPendiente =
        Number(
          detallePedido
            .cantidad_pendiente
        );

      const presentacion =
        Number(
          detallePedido
            .cantidad_presentacion
        );


      if (
        cantidadEntregada >
        cantidadPendiente +
        0.000001
      ) {
        throw crearErrorNegocio(
          `No se puede entregar ${cantidadEntregada.toFixed(3)} ${detallePedido.unidad} de ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color}; solo quedan ${cantidadPendiente.toFixed(3)} ${detallePedido.unidad} pendientes`
        );
      }


      /*
       * DECIMAL(18,3):
       * trabajamos en milésimas para evitar errores
       * de punto flotante al validar múltiplos.
       */
      const cantidadMil =
        Math.round(
          cantidadEntregada *
          1000
        );

      const presentacionMil =
        Math.round(
          presentacion *
          1000
        );


      if (
        presentacionMil <= 0 ||
        cantidadMil %
          presentacionMil !==
          0
      ) {
        throw crearErrorNegocio(
          `La entrega de ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} debe ser múltiplo de ${presentacion.toFixed(3)} ${detallePedido.unidad_presentacion}`
        );
      }


      const stockResult =
        await new sql.Request(
          transaction
        )
          .input(
            'producto_id',
            sql.Int,
            detallePedido
              .producto_resuelto_id
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            detallePedido
              .unidad_medida_id
          )
          .input(
            'cantidad_presentacion',
            sql.Decimal(
              18,
              3
            ),
            presentacion
          )
          .input(
            'unidad_presentacion_id',
            sql.Int,
            detallePedido
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

              AND
              unidad_medida_id =
                @unidad_medida_id

              AND
              cantidad_presentacion =
                @cantidad_presentacion

              AND
              unidad_presentacion_id =
                @unidad_presentacion_id;
          `);

      const stock =
        stockResult.recordset[0];

      if (!stock) {
        throw crearErrorNegocio(
          `No existe stock de ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} en presentación de ${presentacion.toFixed(3)} ${detallePedido.unidad_presentacion}`
        );
      }


      const stockId =
        Number(
          stock
            .stock_producto_terminado_id
        );

      const stockDisponible =
        Number(
          stock
            .cantidad_disponible
        );


      detallesValidados.push({
        ...item,

        producto_id:
          detallePedido
            .producto_resuelto_id,

        tipo_producto:
          detallePedido
            .tipo_producto,

        material:
          detallePedido.material,

        medida:
          detallePedido.medida,

        color:
          detallePedido.color,

        unidad:
          detallePedido.unidad,

        cantidad_presentacion:
          presentacion,

        unidad_presentacion_id:
          detallePedido
            .unidad_presentacion_id,

        unidad_presentacion:
          detallePedido
            .unidad_presentacion,

        stock_producto_terminado_id:
          stockId,

        stock_disponible_inicial:
          stockDisponible
      });


      const demandaActual =
        demandaPorStock.get(
          stockId
        ) || {
          cantidad: 0,
          stockDisponible,
          descripcion:
            `${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} - presentación ${presentacion.toFixed(3)} ${detallePedido.unidad_presentacion}`
        };


      demandaActual.cantidad +=
        cantidadEntregada;


      demandaPorStock.set(
        stockId,
        demandaActual
      );
    }


    /*
     * Si dos líneas del pedido usan el mismo producto
     * y presentación, validamos la suma contra el stock.
     */
    for (
      const demanda
      of demandaPorStock.values()
    ) {
      if (
        demanda.cantidad >
        demanda.stockDisponible +
        0.000001
      ) {
        throw crearErrorNegocio(
          `Stock insuficiente para ${demanda.descripcion}. Disponible: ${Number(demanda.stockDisponible).toFixed(3)} KG; solicitado en esta entrega: ${Number(demanda.cantidad).toFixed(3)} KG`,
          409
        );
      }
    }


    /* =====================================================
       4. CREAR CABECERA DE ENTREGA
       ===================================================== */

    const entregaResult =
      await new sql.Request(
        transaction
      )
        .input(
          'pedido_id',
          sql.Int,
          pedido_id
        )
        .input(
          'fecha_entrega',
          sql.Date,
          fecha_entrega
        )
        .input(
          'comentario_entrega',
          sql.NVarChar(500),
          comentario_entrega ||
          null
        )
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key ||
          null
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .query(`
          INSERT INTO ventas.Entrega (
            pedido_id,
            fecha_entrega,
            comentario_entrega,
            idempotency_key,
            created_by_usuario_id
          )
          VALUES (
            @pedido_id,
            @fecha_entrega,
            @comentario_entrega,
            @idempotency_key,
            @created_by_usuario_id
          );

          SELECT
            CONVERT(
              INT,
              SCOPE_IDENTITY()
            ) AS entrega_id;
        `);

    const entrega_id =
      entregaResult.recordset[0]
        .entrega_id;

    const detallesCreados =
      [];


    /* =====================================================
       5. INSERTAR DETALLES + DESCONTAR STOCK + MOVIMIENTO
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
            'entrega_id',
            sql.Int,
            entrega_id
          )
          .input(
            'pedido_detalle_id',
            sql.Int,
            item.pedido_detalle_id
          )
          .input(
            'cantidad_entregada',
            sql.Decimal(
              18,
              3
            ),
            item.cantidad_entregada
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            item.unidad_medida_id
          )
          .input(
            'observacion',
            sql.NVarChar(300),
            item.observacion ||
            null
          )
          .query(`
            DECLARE @DetalleInsertado TABLE (
              entrega_detalle_id INT,
              entrega_id INT,
              pedido_detalle_id INT,
              cantidad_entregada DECIMAL(18, 3),
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

      const detalleCreado =
        detalleResult.recordset[0];


      const updateStockResult =
        await new sql.Request(
          transaction
        )
          .input(
            'stock_producto_terminado_id',
            sql.Int,
            item
              .stock_producto_terminado_id
          )
          .input(
            'cantidad_entregada',
            sql.Decimal(
              18,
              3
            ),
            item.cantidad_entregada
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
                cantidad_disponible -
                @cantidad_entregada,

              updated_at =
                SYSDATETIME(),

              updated_by_usuario_id =
                @updated_by_usuario_id

            WHERE
              stock_producto_terminado_id =
                @stock_producto_terminado_id

              AND
              cantidad_disponible >=
                @cantidad_entregada;

            SELECT
              @@ROWCOUNT
                AS filas_actualizadas;
          `);


      if (
        Number(
          updateStockResult
            .recordset[0]
            .filas_actualizadas
        ) !== 1
      ) {
        throw crearErrorNegocio(
          `El stock de ${item.tipo_producto} ${item.material} ${item.medida} ${item.color} cambió durante la operación. Vuelve a intentar la entrega.`,
          409
        );
      }


      const movimientoResult =
        await new sql.Request(
          transaction
        )
          .input(
            'stock_producto_terminado_id',
            sql.Int,
            item
              .stock_producto_terminado_id
          )
          .input(
            'cantidad',
            sql.Decimal(
              18,
              3
            ),
            item.cantidad_entregada
          )
          .input(
            'entrega_detalle_id',
            sql.Int,
            detalleCreado
              .entrega_detalle_id
          )
          .input(
            'observacion',
            sql.NVarChar(400),
            `Salida por entrega #${entrega_id} - Pedido #${pedido_id}`
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
              fecha_movimiento,
              produccion_detalle_id,
              entrega_detalle_id,
              observacion,
              created_by_usuario_id
            )

            VALUES (
              @stock_producto_terminado_id,
              'SALIDA_ENTREGA',
              @cantidad,
              SYSDATETIME(),
              NULL,
              @entrega_detalle_id,
              @observacion,
              @created_by_usuario_id
            );

            SELECT
              CONVERT(
                INT,
                SCOPE_IDENTITY()
              ) AS movimiento_producto_terminado_id;
          `);


      const stockActualResult =
        await new sql.Request(
          transaction
        )
          .input(
            'stock_producto_terminado_id',
            sql.Int,
            item
              .stock_producto_terminado_id
          )
          .query(`
            SELECT
              cantidad_disponible
            FROM inventario.StockProductoTerminado
            WHERE
              stock_producto_terminado_id =
              @stock_producto_terminado_id;
          `);


      detallesCreados.push({
        ...detalleCreado,

        producto_id:
          item.producto_id,

        tipo_producto:
          item.tipo_producto,

        material:
          item.material,

        medida:
          item.medida,

        color:
          item.color,

        cantidad_presentacion:
          item
            .cantidad_presentacion,

        unidad_presentacion:
          item
            .unidad_presentacion,

        stock_producto_terminado_id:
          item
            .stock_producto_terminado_id,

        movimiento_producto_terminado_id:
          movimientoResult
            .recordset[0]
            .movimiento_producto_terminado_id,

        stock_actual:
          Number(
            stockActualResult
              .recordset[0]
              .cantidad_disponible
          )
      });
    }


    /* =====================================================
       6. ACTUALIZAR ESTADO DEL PEDIDO
       ===================================================== */

    await new sql.Request(
      transaction
    )
      .input(
        'pedido_id',
        sql.Int,
        pedido_id
      )
      .input(
        'updated_by_usuario_id',
        sql.Int,
        created_by_usuario_id
      )
      .query(`
        UPDATE ventas.Pedido

        SET
          estado_pedido =
            CASE
              WHEN NOT EXISTS (
                SELECT 1

                FROM ventas.PedidoDetalle pd

                OUTER APPLY (
                  SELECT
                    ISNULL(
                      SUM(
                        ed.cantidad_entregada
                      ),
                      0
                    ) AS total_entregado

                  FROM ventas.EntregaDetalle ed

                  WHERE
                    ed.pedido_detalle_id =
                    pd.pedido_detalle_id
                ) entregas

                WHERE
                  pd.pedido_id =
                    @pedido_id

                  AND
                  pd.activo = 1

                  AND
                  entregas.total_entregado <
                  pd.cantidad_pedida
              )

              THEN 'ENTREGADO'

              ELSE 'PARCIAL'
            END,

          updated_at =
            SYSDATETIME(),

          updated_by_usuario_id =
            @updated_by_usuario_id

        WHERE
          pedido_id =
          @pedido_id;
      `);


    const completa =
      await obtenerEntregaCompletaPorId(
        entrega_id,
        transaction
      );


    await transaction.commit();


    return {
      reutilizada: false,

      entrega:
        completa.entrega,

      /*
       * Devolvemos la versión enriquecida creada en
       * esta transacción porque contiene stock_actual.
       */
      detalles:
        detallesCreados
    };


  } catch (error) {
    try {
      await transaction.rollback();
    } catch (_) {
      // Conservamos el error original.
    }


    if (
      [2601, 2627]
        .includes(
          error.number
        ) &&
      idempotency_key
    ) {
      /*
       * Defensa extra para una carrera poco probable.
       * El índice único evita una segunda entrega.
       */
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
              entrega_id
            FROM ventas.Entrega
            WHERE
              idempotency_key =
              @idempotency_key;
          `);

      const existente =
        existenteResult
          .recordset[0];

      if (existente) {
        const completa =
          await obtenerEntregaCompletaPorId(
            existente.entrega_id
          );

        return {
          reutilizada: true,
          entrega:
            completa.entrega,
          detalles:
            completa.detalles
        };
      }
    }


    throw error;
  }
};


module.exports = {
  listarPedidosParaEntrega,
  obtenerPedidoParaEntrega,
  obtenerEntregaCompletaPorId,
  crearEntregaConDetalles
};
