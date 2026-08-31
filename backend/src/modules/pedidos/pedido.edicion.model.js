const {
  getConnection,
  sql
} = require('../../config/db');

const {
  obtenerPedidoPorId,
  registrarHistorialPrecioCliente
} = require('./pedido.model');


/* =========================================================
   TIPOS DE CAMBIO PERMITIDOS POR LA BASE DE DATOS

   CK_PedidoCambio_Tipo permite únicamente:

   - CREACION
   - EDICION
   - AUMENTO_PRODUCTOS
   - CANCELACION
   ========================================================= */

const TIPO_CAMBIO = Object.freeze({
  EDICION: 'EDICION',
  AUMENTO_PRODUCTOS: 'AUMENTO_PRODUCTOS'
});


/* =========================================================
   ERROR DE NEGOCIO
   ========================================================= */

const crearErrorNegocio = (
  mensaje,
  statusCode = 400
) => {
  const error =
    new Error(mensaje);

  error.statusCode =
    statusCode;

  return error;
};


/* =========================================================
   ACTUALIZAR PEDIDO CON DETALLES
   ========================================================= */

const actualizarPedidoConDetalles =
  async ({
    pedido_id,

    cliente_id,

    codigo_pedido,

    descripcion_pedido,

    fecha_pedido,

    fecha_entrega_estimada,

    motivo_cambio,

    detalles_editados = [],

    nuevos_detalles = [],

    updated_by_usuario_id
  }) => {

    const pool =
      await getConnection();


    const transaction =
      new sql.Transaction(
        pool
      );


    try {

      /* =====================================================
         1. INICIAR TRANSACCIÓN
         ===================================================== */

      await transaction.begin(
        sql.ISOLATION_LEVEL.SERIALIZABLE
      );


      /* =====================================================
         2. OBTENER Y BLOQUEAR PEDIDO
         ===================================================== */

      const pedidoActualResult =
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
              cliente_id,
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


      const pedidoActual =
        pedidoActualResult
          .recordset[0];


      if (!pedidoActual) {
        throw crearErrorNegocio(
          'Pedido no encontrado',
          404
        );
      }


      if (
        pedidoActual.estado_pedido ===
        'CANCELADO'
      ) {
        throw crearErrorNegocio(
          'No se puede editar un pedido cancelado',
          409
        );
      }


      if (
        pedidoActual.estado_pedido ===
        'ENTREGADO'
      ) {
        throw crearErrorNegocio(
          'No se puede editar un pedido completamente entregado',
          409
        );
      }


      /* =====================================================
         3. OBTENER DETALLES Y CANTIDADES ENTREGADAS
         ===================================================== */

      const detallesActualesResult =
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
              pd.pedido_detalle_id,

              pd.tipo_producto_id,
              pd.medida_id,
              pd.color_id,
              pd.material_id,

              pd.cantidad_pedida,

              pd.unidad_medida_id,

              pd.cantidad_presentacion,
              pd.unidad_presentacion_id,

              pd.precio_unitario,
              pd.moneda_codigo,

              pd.descripcion_item,
              pd.observacion,

              ISNULL(
                SUM(
                  ed.cantidad_entregada
                ),
                0
              ) AS cantidad_entregada

            FROM ventas.PedidoDetalle pd
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            LEFT JOIN ventas.EntregaDetalle ed
              ON
                pd.pedido_detalle_id =
                ed.pedido_detalle_id

            WHERE
              pd.pedido_id =
                @pedido_id

              AND pd.activo = 1

            GROUP BY
              pd.pedido_detalle_id,

              pd.tipo_producto_id,
              pd.medida_id,
              pd.color_id,
              pd.material_id,

              pd.cantidad_pedida,

              pd.unidad_medida_id,

              pd.cantidad_presentacion,
              pd.unidad_presentacion_id,

              pd.precio_unitario,
              pd.moneda_codigo,

              pd.descripcion_item,
              pd.observacion;
          `);


      const detallesActuales =
        detallesActualesResult
          .recordset;


      const detallesMap =
        new Map(
          detallesActuales.map(
            (detalle) => [
              Number(
                detalle
                  .pedido_detalle_id
              ),

              detalle
            ]
          )
        );


      /* =====================================================
         4. VALIDAR TODOS LOS DETALLES ANTES DE MODIFICAR
         ===================================================== */

      for (
        const item
        of detalles_editados
      ) {

        const detalleActual =
          detallesMap.get(
            Number(
              item
                .pedido_detalle_id
            )
          );


        if (!detalleActual) {
          throw crearErrorNegocio(
            `El producto ${item.pedido_detalle_id} no pertenece al pedido o ya no está activo`,
            400
          );
        }


        const cantidadEntregada =
          Number(
            detalleActual
              .cantidad_entregada ||
            0
          );


        const nuevaCantidad =
          Number(
            item.cantidad_pedida
          );


        /* ---------------------------------------------------
           CANTIDAD VÁLIDA
           --------------------------------------------------- */

        if (
          !Number.isFinite(
            nuevaCantidad
          ) ||
          nuevaCantidad <= 0
        ) {
          throw crearErrorNegocio(
            `La cantidad del producto ${item.pedido_detalle_id} debe ser mayor a 0`,
            400
          );
        }


        /* ---------------------------------------------------
           NO MENOR A LO YA ENTREGADO
           --------------------------------------------------- */

        if (
          nuevaCantidad <
          cantidadEntregada
        ) {
          throw crearErrorNegocio(
            `La cantidad del producto ${item.pedido_detalle_id} no puede ser menor a lo ya entregado (${cantidadEntregada})`,
            409
          );
        }


        /* ---------------------------------------------------
           PRODUCTO CON ENTREGAS

           Preservamos:
           - tipo
           - medida
           - color
           - material
           - unidad
           - moneda

           Permitimos:
           - cantidad
           - presentación
           - precio
           - descripción
           - observación
           --------------------------------------------------- */

        if (
          cantidadEntregada > 0
        ) {

          const cambioEstructural =

            Number(
              item.tipo_producto_id
            ) !==
            Number(
              detalleActual
                .tipo_producto_id
            )

            ||

            Number(
              item.medida_id
            ) !==
            Number(
              detalleActual
                .medida_id
            )

            ||

            Number(
              item.color_id
            ) !==
            Number(
              detalleActual
                .color_id
            )

            ||

            Number(
              item.material_id
            ) !==
            Number(
              detalleActual
                .material_id
            )

            ||

            Number(
              item.unidad_medida_id
            ) !==
            Number(
              detalleActual
                .unidad_medida_id
            )

            ||

            String(
              item.moneda_codigo
            ).toUpperCase() !==
            String(
              detalleActual
                .moneda_codigo
            ).toUpperCase();


          if (
            cambioEstructural
          ) {
            throw crearErrorNegocio(
              `El producto ${item.pedido_detalle_id} ya tiene entregas. No se puede cambiar tipo, medida, color, material, unidad ni moneda`,
              409
            );
          }
        }
      }


      /* =====================================================
         5. DETERMINAR TIPO DE CAMBIO
         ===================================================== */

      /*
       * MUY IMPORTANTE:
       *
       * No volver a utilizar:
       *
       * EDICION_PRODUCTOS
       * EDICION_Y_AUMENTO_PRODUCTOS
       *
       * porque NO existen en el CHECK de SQL Server.
       */

      let tipoCambio =
        TIPO_CAMBIO.EDICION;


      /*
       * Este caso aplica cuando el endpoint
       * únicamente añade productos.
       *
       * En la edición normal que estamos
       * haciendo ahora habrá detalles_editados,
       * así que será EDICION.
       */
      if (
        detalles_editados.length ===
          0 &&
        nuevos_detalles.length >
          0
      ) {
        tipoCambio =
          TIPO_CAMBIO
            .AUMENTO_PRODUCTOS;
      }


      /* =====================================================
         6. REGISTRAR HISTORIAL DEL CAMBIO
         ===================================================== */

      const cambioResult =
        await new sql.Request(
          transaction
        )
          .input(
            'pedido_id',
            sql.Int,
            pedido_id
          )

          .input(
            'tipo_cambio',
            sql.VarChar(40),
            tipoCambio
          )

          .input(
            'descripcion_motivo',
            sql.NVarChar(500),
            motivo_cambio
          )

          .input(
            'created_by_usuario_id',
            sql.Int,
            updated_by_usuario_id
          )

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
              @tipo_cambio,
              @descripcion_motivo,
              @created_by_usuario_id
            );
          `);


      const pedido_cambio_id =
        cambioResult
          .recordset[0]
          .pedido_cambio_id;


      /* =====================================================
         7. ACTUALIZAR PRODUCTOS EXISTENTES
         ===================================================== */

      const detallesActualizados =
        [];


      for (
        const item
        of detalles_editados
      ) {

        const detalleActual =
          detallesMap.get(
            Number(
              item
                .pedido_detalle_id
            )
          );


        /* ---------------------------------------------------
           UNIDAD DE PRESENTACIÓN
           --------------------------------------------------- */

        const unidadPresentacionId =
          item.cantidad_presentacion
            ? (
                item
                  .unidad_presentacion_id ||
                item
                  .unidad_medida_id
              )
            : null;


        /* ---------------------------------------------------
           UPDATE
           --------------------------------------------------- */

        const detalleResult =
          await new sql.Request(
            transaction
          )

            .input(
              'pedido_detalle_id',
              sql.Int,
              item
                .pedido_detalle_id
            )

            .input(
              'tipo_producto_id',
              sql.Int,
              item
                .tipo_producto_id
            )

            .input(
              'medida_id',
              sql.Int,
              item.medida_id
            )

            .input(
              'color_id',
              sql.Int,
              item.color_id
            )

            .input(
              'material_id',
              sql.Int,
              item.material_id
            )

            .input(
              'cantidad_pedida',
              sql.Decimal(
                18,
                3
              ),
              item.cantidad_pedida
            )

            .input(
              'unidad_medida_id',
              sql.Int,
              item.unidad_medida_id
            )

            .input(
              'cantidad_presentacion',
              sql.Decimal(
                18,
                3
              ),
              item.cantidad_presentacion ||
              null
            )

            .input(
              'unidad_presentacion_id',
              sql.Int,
              unidadPresentacionId
            )

            .input(
              'precio_unitario',
              sql.Decimal(
                18,
                4
              ),
              item.precio_unitario
            )

            .input(
              'moneda_codigo',
              sql.Char(3),
              item.moneda_codigo
            )

            .input(
              'descripcion_item',
              sql.NVarChar(300),
              item.descripcion_item ||
              null
            )

            .input(
              'observacion',
              sql.NVarChar(300),
              item.observacion ||
              null
            )

            .query(`
              UPDATE ventas.PedidoDetalle

              SET
                tipo_producto_id =
                  @tipo_producto_id,

                medida_id =
                  @medida_id,

                color_id =
                  @color_id,

                material_id =
                  @material_id,

                cantidad_pedida =
                  @cantidad_pedida,

                unidad_medida_id =
                  @unidad_medida_id,

                cantidad_presentacion =
                  @cantidad_presentacion,

                unidad_presentacion_id =
                  @unidad_presentacion_id,

                precio_unitario =
                  @precio_unitario,

                moneda_codigo =
                  @moneda_codigo,

                descripcion_item =
                  @descripcion_item,

                observacion =
                  @observacion

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

              WHERE
                pedido_detalle_id =
                  @pedido_detalle_id

                AND activo = 1;
            `);


        const detalleActualizado =
          detalleResult
            .recordset[0];


        if (
          !detalleActualizado
        ) {
          throw crearErrorNegocio(
            `No se pudo actualizar el producto ${item.pedido_detalle_id}`,
            409
          );
        }


        /* ===================================================
           HISTORIAL DE PRECIOS
           =================================================== */

        const cambioCliente =
          Number(
            pedidoActual
              .cliente_id
          ) !==
          Number(
            cliente_id
          );


        const cambioPrecio =
          Number(
            detalleActual
              .precio_unitario
          ) !==
          Number(
            item.precio_unitario
          );


        const cambioTipo =
          Number(
            detalleActual
              .tipo_producto_id
          ) !==
          Number(
            item.tipo_producto_id
          );


        const cambioMedida =
          Number(
            detalleActual
              .medida_id
          ) !==
          Number(
            item.medida_id
          );


        const cambioColor =
          Number(
            detalleActual
              .color_id
          ) !==
          Number(
            item.color_id
          );


        const cambioMaterial =
          Number(
            detalleActual
              .material_id
          ) !==
          Number(
            item.material_id
          );


        const cambioMoneda =
          String(
            detalleActual
              .moneda_codigo
          ).toUpperCase() !==
          String(
            item.moneda_codigo
          ).toUpperCase();


        const debeRegistrarPrecio =
          cambioCliente ||
          cambioPrecio ||
          cambioTipo ||
          cambioMedida ||
          cambioColor ||
          cambioMaterial ||
          cambioMoneda;


        /*
         * Ejemplo:
         *
         * 100 KG → 80 KG
         *
         * NO genera historial de precio.
         *
         * S/ 5 → S/ 16
         *
         * SÍ genera historial de precio.
         */
        if (
          debeRegistrarPrecio
        ) {

          await registrarHistorialPrecioCliente({
            transaction,

            cliente_id,

            pedido_id,

            pedido_detalle_id:
              detalleActualizado
                .pedido_detalle_id,

            item,

            created_by_usuario_id:
              updated_by_usuario_id
          });
        }


        detallesActualizados.push(
          detalleActualizado
        );
      }


      /* =====================================================
         8. AGREGAR PRODUCTOS NUEVOS
         ===================================================== */

      const detallesCreados =
        [];


      for (
        const item
        of nuevos_detalles
      ) {

        const unidadPresentacionId =
          item.cantidad_presentacion
            ? (
                item
                  .unidad_presentacion_id ||
                item
                  .unidad_medida_id
              )
            : null;


        const detalleResult =
          await new sql.Request(
            transaction
          )

            .input(
              'pedido_id',
              sql.Int,
              pedido_id
            )

            .input(
              'pedido_cambio_id',
              sql.Int,
              pedido_cambio_id
            )

            .input(
              'producto_id',
              sql.Int,
              null
            )

            .input(
              'tipo_producto_id',
              sql.Int,
              item.tipo_producto_id
            )

            .input(
              'medida_id',
              sql.Int,
              item.medida_id
            )

            .input(
              'color_id',
              sql.Int,
              item.color_id
            )

            .input(
              'material_id',
              sql.Int,
              item.material_id
            )

            .input(
              'cantidad_pedida',
              sql.Decimal(
                18,
                3
              ),
              item.cantidad_pedida
            )

            .input(
              'unidad_medida_id',
              sql.Int,
              item.unidad_medida_id
            )

            .input(
              'cantidad_presentacion',
              sql.Decimal(
                18,
                3
              ),
              item.cantidad_presentacion ||
              null
            )

            .input(
              'unidad_presentacion_id',
              sql.Int,
              unidadPresentacionId
            )

            .input(
              'precio_unitario',
              sql.Decimal(
                18,
                4
              ),
              item.precio_unitario
            )

            .input(
              'moneda_codigo',
              sql.Char(3),
              item.moneda_codigo
            )

            .input(
              'descripcion_item',
              sql.NVarChar(300),
              item.descripcion_item ||
              null
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
              updated_by_usuario_id
            )

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


        const detalleCreado =
          detalleResult
            .recordset[0];


        /*
         * Todo producto nuevo genera
         * historial de precio.
         */
        await registrarHistorialPrecioCliente({
          transaction,

          cliente_id,

          pedido_id,

          pedido_detalle_id:
            detalleCreado
              .pedido_detalle_id,

          item,

          created_by_usuario_id:
            updated_by_usuario_id
        });


        detallesCreados.push(
          detalleCreado
        );
      }


      /* =====================================================
         9. VALIDAR DEPÓSITOS
         ===================================================== */

      /*
       * Después de modificar cantidades
       * y precios:
       *
       * NUEVO TOTAL DEL PEDIDO
       * nunca puede quedar por debajo
       * de lo ya depositado.
       */

      const depositoInvalidoResult =
        await new sql.Request(
          transaction
        )

          .input(
            'pedido_id',
            sql.Int,
            pedido_id
          )

          .query(`
            WITH TotalesPedido AS (
              SELECT
                moneda_codigo,

                SUM(
                  cantidad_pedida *
                  precio_unitario
                ) AS total_pedido

              FROM ventas.PedidoDetalle

              WHERE
                pedido_id =
                  @pedido_id

                AND activo = 1

              GROUP BY
                moneda_codigo
            ),

            TotalesDeposito AS (
              SELECT
                moneda_codigo,

                SUM(
                  monto
                ) AS total_depositado

              FROM finance.Deposito

              WHERE
                pedido_id =
                  @pedido_id

              GROUP BY
                moneda_codigo
            )

            SELECT TOP 1
              td.moneda_codigo,

              ISNULL(
                tp.total_pedido,
                0
              ) AS total_pedido,

              td.total_depositado

            FROM TotalesDeposito td

            LEFT JOIN TotalesPedido tp
              ON
                td.moneda_codigo =
                tp.moneda_codigo

            WHERE
              td.total_depositado >
              ISNULL(
                tp.total_pedido,
                0
              );
          `);


      const depositoInvalido =
        depositoInvalidoResult
          .recordset[0];


      if (
        depositoInvalido
      ) {
        throw crearErrorNegocio(
          `La edición no es válida porque el total del pedido en ${depositoInvalido.moneda_codigo} quedaría en ${Number(depositoInvalido.total_pedido).toFixed(2)}, por debajo de lo ya depositado (${Number(depositoInvalido.total_depositado).toFixed(2)})`,
          409
        );
      }


      /* =====================================================
         10. ACTUALIZAR CABECERA DEL PEDIDO
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

          .input(
            'cliente_id',
            sql.Int,
            cliente_id
          )

          .input(
            'codigo_pedido',
            sql.VarChar(50),
            codigo_pedido ||
            null
          )

          .input(
            'descripcion_pedido',
            sql.NVarChar(500),
            descripcion_pedido ||
            null
          )

          .input(
            'fecha_pedido',
            sql.Date,
            fecha_pedido
          )

          .input(
            'fecha_entrega_estimada',
            sql.Date,
            fecha_entrega_estimada ||
            null
          )

          .input(
            'updated_by_usuario_id',
            sql.Int,
            updated_by_usuario_id
          )

          .query(`
            UPDATE ventas.Pedido

            SET
              cliente_id =
                @cliente_id,

              codigo_pedido =
                @codigo_pedido,

              descripcion_pedido =
                @descripcion_pedido,

              fecha_pedido =
                @fecha_pedido,

              fecha_entrega_estimada =
                @fecha_entrega_estimada,

              updated_at =
                SYSDATETIME(),

              updated_by_usuario_id =
                @updated_by_usuario_id

            WHERE
              pedido_id =
                @pedido_id

              AND estado_pedido <>
                'CANCELADO';
          `);


      if (
        pedidoResult
          .rowsAffected[0] !==
        1
      ) {
        throw crearErrorNegocio(
          'El pedido ya no está disponible para edición',
          409
        );
      }


      /* =====================================================
         11. RECALCULAR ESTADO DEL PEDIDO
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
          updated_by_usuario_id
        )

        .query(`
          UPDATE ventas.Pedido

          SET
            estado_pedido =
              CASE

                /* ------------------------------------------
                   SIN NINGUNA ENTREGA
                   ------------------------------------------ */

                WHEN NOT EXISTS (
                  SELECT 1

                  FROM ventas.PedidoDetalle pd

                  INNER JOIN ventas.EntregaDetalle ed
                    ON
                      pd.pedido_detalle_id =
                      ed.pedido_detalle_id

                  WHERE
                    pd.pedido_id =
                      @pedido_id

                    AND pd.activo = 1
                )

                THEN
                  'REGISTRADO'


                /* ------------------------------------------
                   TODOS LOS PRODUCTOS COMPLETOS
                   ------------------------------------------ */

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

                    AND pd.activo = 1

                    AND
                      entregas.total_entregado <
                      pd.cantidad_pedida
                )

                THEN
                  'ENTREGADO'


                /* ------------------------------------------
                   EXISTEN ENTREGAS PERO QUEDA PENDIENTE
                   ------------------------------------------ */

                ELSE
                  'PARCIAL'

              END,

            updated_at =
              SYSDATETIME(),

            updated_by_usuario_id =
              @updated_by_usuario_id

          WHERE
            pedido_id =
              @pedido_id;
        `);


      /* =====================================================
         12. COMMIT
         ===================================================== */

      await transaction.commit();


      /* =====================================================
         13. RECUPERAR PEDIDO ACTUALIZADO
         ===================================================== */

      const pedidoActualizado =
        await obtenerPedidoPorId(
          pedido_id
        );


      return {
        pedido:
          pedidoActualizado,

        detalles_actualizados:
          detallesActualizados,

        detalles_agregados:
          detallesCreados
      };


    } catch (error) {

      /* =====================================================
         ROLLBACK
         ===================================================== */

      try {
        await transaction.rollback();

      } catch (_) {
        /*
         * SQL Server puede haber abortado
         * previamente la transacción.
         *
         * Conservamos el error original.
         */
      }


      throw error;
    }
  };


module.exports = {
  actualizarPedidoConDetalles
};