const {
  listarPedidos,
  obtenerPedidoPorId,
  crearPedidoConDetalles
} = require('./pedido.model');

const {
  actualizarPedidoConDetalles
} = require('./pedido.edicion.model');


/* =========================================================
   FECHA ACTUAL
   ========================================================= */

const fechaActual = () => {
  return new Date()
    .toISOString()
    .slice(0, 10);
};


/* =========================================================
   NORMALIZAR DETALLE
   ========================================================= */

const normalizarDetalle = (item) => {
  return {
    ...item,

    moneda_codigo:
      item.moneda_codigo
        ? String(
            item.moneda_codigo
          )
            .trim()
            .toUpperCase()
        : null,

    descripcion_item:
      item.descripcion_item
        ? String(
            item.descripcion_item
          )
            .trim()
            .toUpperCase()
        : null,

    observacion:
      item.observacion
        ? String(
            item.observacion
          ).trim()
        : null
  };
};


/* =========================================================
   VALIDAR ID
   ========================================================= */

const validarIdPositivo = (valor) => {
  const numero = Number(valor);

  return (
    Number.isInteger(numero) &&
    numero > 0
  );
};


/* =========================================================
   VALIDACIÓN DE DETALLES
   ========================================================= */

const validarDetalles = (
  detalles,
  etiqueta = 'El producto',
  {
    exigirDetalleId = false
  } = {}
) => {
  for (
    const [index, item]
    of detalles.entries()
  ) {
    const nombreItem =
      `${etiqueta} ${index + 1}`;


    /* -------------------------------------------------------
       ID DEL DETALLE EXISTENTE
       ------------------------------------------------------- */

    if (
      exigirDetalleId &&
      !validarIdPositivo(
        item.pedido_detalle_id
      )
    ) {
      return `${nombreItem} no tiene un identificador de detalle válido`;
    }


    /* -------------------------------------------------------
       TIPO / MEDIDA / COLOR / MATERIAL
       ------------------------------------------------------- */

    if (
      !validarIdPositivo(
        item.tipo_producto_id
      ) ||
      !validarIdPositivo(
        item.medida_id
      ) ||
      !validarIdPositivo(
        item.color_id
      ) ||
      !validarIdPositivo(
        item.material_id
      )
    ) {
      return `${nombreItem} debe tener tipo, medida, color y material`;
    }


    /* -------------------------------------------------------
       CANTIDAD
       ------------------------------------------------------- */

    const cantidad =
      Number(
        item.cantidad_pedida
      );


    if (
      !Number.isFinite(
        cantidad
      ) ||
      cantidad <= 0
    ) {
      return `${nombreItem} debe tener una cantidad mayor a 0`;
    }


    /* -------------------------------------------------------
       UNIDAD
       ------------------------------------------------------- */

    if (
      !validarIdPositivo(
        item.unidad_medida_id
      )
    ) {
      return `${nombreItem} debe tener una unidad`;
    }


    /* -------------------------------------------------------
       PRESENTACIÓN
       ------------------------------------------------------- */

    if (
      item.cantidad_presentacion !==
        null &&
      item.cantidad_presentacion !==
        undefined &&
      item.cantidad_presentacion !==
        ''
    ) {
      const cantidadPresentacion =
        Number(
          item.cantidad_presentacion
        );


      if (
        !Number.isFinite(
          cantidadPresentacion
        ) ||
        cantidadPresentacion <= 0
      ) {
        return `${nombreItem} debe tener una presentación mayor a 0`;
      }


      if (
        !validarIdPositivo(
          item.unidad_presentacion_id
        )
      ) {
        return `${nombreItem} debe tener una unidad de presentación`;
      }
    }


    /* -------------------------------------------------------
       PRECIO
       ------------------------------------------------------- */

    const precio =
      Number(
        item.precio_unitario
      );


    /*
     * Utilizamos > 0.
     *
     * El historial de precios también
     * requiere precios mayores a cero.
     */
    if (
      !Number.isFinite(
        precio
      ) ||
      precio <= 0
    ) {
      return `${nombreItem} debe tener un precio mayor a 0`;
    }


    /* -------------------------------------------------------
       MONEDA
       ------------------------------------------------------- */

    if (
      !item.moneda_codigo
    ) {
      return `${nombreItem} debe tener moneda`;
    }


    const moneda =
      String(
        item.moneda_codigo
      )
        .trim()
        .toUpperCase();


    if (
      ![
        'PEN',
        'USD'
      ].includes(moneda)
    ) {
      return `${nombreItem} debe tener moneda PEN o USD`;
    }
  }


  return null;
};


/* =========================================================
   LISTAR PEDIDOS
   ========================================================= */

const obtenerPedidos = async (
  req,
  res
) => {
  try {
    const {
      cliente_id,
      estado_pedido,
      q,
      page = 1,
      limit = 10
    } = req.query;


    const pagina =
      Math.max(
        1,
        Number(page) || 1
      );


    const limite =
      Math.min(
        100,
        Math.max(
          1,
          Number(limit) || 10
        )
      );


    const resultado =
      await listarPedidos({
        cliente_id:
          cliente_id
            ? Number(
                cliente_id
              )
            : null,

        estado_pedido:
          estado_pedido ||
          null,

        q:
          q
            ? String(q).trim()
            : null,

        page:
          pagina,

        limit:
          limite
      });


    res.json({
      mensaje:
        'Pedidos obtenidos correctamente',

      pedidos:
        resultado.pedidos,

      paginacion:
        resultado.paginacion
    });

  } catch (error) {
    console.error(
      'Error listar pedidos:',
      error.message
    );


    res.status(500).json({
      mensaje:
        'Error interno al listar pedidos'
    });
  }
};


/* =========================================================
   OBTENER PEDIDO
   ========================================================= */

const obtenerPedido = async (
  req,
  res
) => {
  try {
    const pedido_id =
      Number(
        req.params.pedido_id
      );


    if (
      !validarIdPositivo(
        pedido_id
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'El ID del pedido no es válido'
        });
    }


    const pedido =
      await obtenerPedidoPorId(
        pedido_id
      );


    if (!pedido) {
      return res
        .status(404)
        .json({
          mensaje:
            'Pedido no encontrado'
        });
    }


    res.json({
      mensaje:
        'Pedido obtenido correctamente',

      pedido
    });

  } catch (error) {
    console.error(
      'Error obtener pedido:',
      error.message
    );


    res.status(500).json({
      mensaje:
        'Error interno al obtener pedido'
    });
  }
};


/* =========================================================
   REGISTRAR PEDIDO
   ========================================================= */

const registrarPedido = async (
  req,
  res
) => {
  try {
    let {
      cliente_id,
      codigo_pedido,
      descripcion_pedido,
      fecha_pedido,
      fecha_entrega_estimada,
      detalles
    } = req.body;


    /* -------------------------------------------------------
       CLIENTE
       ------------------------------------------------------- */

    if (
      !validarIdPositivo(
        cliente_id
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'El cliente es obligatorio'
        });
    }


    /* -------------------------------------------------------
       PRODUCTOS
       ------------------------------------------------------- */

    if (
      !Array.isArray(
        detalles
      ) ||
      detalles.length === 0
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'El pedido debe tener al menos un producto'
        });
    }


    /* -------------------------------------------------------
       NORMALIZACIÓN CABECERA
       ------------------------------------------------------- */

    fecha_pedido =
      fecha_pedido ||
      fechaActual();


    codigo_pedido =
      codigo_pedido
        ? String(
            codigo_pedido
          )
            .trim()
            .toUpperCase()
        : null;


    descripcion_pedido =
      descripcion_pedido
        ? String(
            descripcion_pedido
          ).trim()
        : null;


    fecha_entrega_estimada =
      fecha_entrega_estimada ||
      null;


    /* -------------------------------------------------------
       NORMALIZACIÓN PRODUCTOS
       ------------------------------------------------------- */

    detalles =
      detalles.map(
        normalizarDetalle
      );


    const errorValidacion =
      validarDetalles(
        detalles,
        'El producto'
      );


    if (
      errorValidacion
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            errorValidacion
        });
    }


    /* -------------------------------------------------------
       CREAR
       ------------------------------------------------------- */

    const resultado =
      await crearPedidoConDetalles({
        cliente_id:
          Number(
            cliente_id
          ),

        codigo_pedido,

        descripcion_pedido,

        fecha_pedido,

        fecha_entrega_estimada,

        detalles,

        created_by_usuario_id:
          req.usuario.usuario_id
      });


    res
      .status(201)
      .json({
        mensaje:
          'Pedido registrado correctamente',

        pedido:
          resultado.pedido,

        detalles:
          resultado.detalles
      });

  } catch (error) {
    console.error(
      'Error registrar pedido:',
      error.message
    );


    /*
     * Error de negocio.
     *
     * Ejemplo:
     * combinación inexistente en Productos terminados.
     */
    if (
      error.statusCode
    ) {
      return res
        .status(
          error.statusCode
        )
        .json({
          mensaje:
            error.message
        });
    }


    /*
     * Código de pedido duplicado.
     */
    if (
      error.number === 2601 ||
      error.number === 2627
    ) {
      return res
        .status(409)
        .json({
          mensaje:
            'Ya existe un pedido con ese código'
        });
    }


    /*
     * FK inválida.
     */
    if (
      error.number === 547
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'Uno de los datos seleccionados para el pedido no es válido'
        });
    }


    res
      .status(500)
      .json({
        mensaje:
          'Error interno al registrar pedido'
      });
  }
};


/* =========================================================
   EDITAR PEDIDO
   ========================================================= */

const editarPedido = async (
  req,
  res
) => {
  try {
    /* =====================================================
       1. ID DEL PEDIDO
       ===================================================== */

    const pedido_id =
      Number(
        req.params.pedido_id
      );


    if (
      !validarIdPositivo(
        pedido_id
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'El ID del pedido no es válido'
        });
    }


    /* =====================================================
       2. BODY
       ===================================================== */

    let {
      cliente_id,

      codigo_pedido,

      descripcion_pedido,

      fecha_pedido,

      fecha_entrega_estimada,

      motivo_cambio,

      detalles_editados = [],

      nuevos_detalles = []
    } = req.body;


    /* =====================================================
       3. CABECERA
       ===================================================== */

    if (
      !validarIdPositivo(
        cliente_id
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'El cliente es obligatorio'
        });
    }


    if (
      !fecha_pedido
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'La fecha del pedido es obligatoria'
        });
    }


    if (
      !motivo_cambio ||
      String(
        motivo_cambio
      ).trim() === ''
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'Debe ingresar el motivo del cambio'
        });
    }


    /* =====================================================
       4. VALIDAR ARRAYS
       ===================================================== */

    if (
      !Array.isArray(
        detalles_editados
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'Los productos editados no tienen un formato válido'
        });
    }


    if (
      !Array.isArray(
        nuevos_detalles
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'Los nuevos productos no tienen un formato válido'
        });
    }


    /* =====================================================
       5. NORMALIZAR CABECERA
       ===================================================== */

    codigo_pedido =
      codigo_pedido
        ? String(
            codigo_pedido
          )
            .trim()
            .toUpperCase()
        : null;


    descripcion_pedido =
      descripcion_pedido
        ? String(
            descripcion_pedido
          ).trim()
        : null;


    fecha_entrega_estimada =
      fecha_entrega_estimada ||
      null;


    motivo_cambio =
      String(
        motivo_cambio
      ).trim();


    /* =====================================================
       6. NORMALIZAR DETALLES EDITADOS
       ===================================================== */

    detalles_editados =
      detalles_editados.map(
        normalizarDetalle
      );


    nuevos_detalles =
      nuevos_detalles.map(
        normalizarDetalle
      );


    /* =====================================================
       7. EVITAR IDs DUPLICADOS
       ===================================================== */

    const idsDetalles =
      detalles_editados.map(
        (item) =>
          Number(
            item.pedido_detalle_id
          )
      );


    const idsUnicos =
      new Set(
        idsDetalles
      );


    if (
      idsUnicos.size !==
      idsDetalles.length
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'No se puede editar dos veces el mismo producto del pedido'
        });
    }


    /* =====================================================
       8. VALIDAR PRODUCTOS EXISTENTES
       ===================================================== */

    if (
      detalles_editados.length >
      0
    ) {
      const errorValidacion =
        validarDetalles(
          detalles_editados,
          'El producto editado',
          {
            exigirDetalleId:
              true
          }
        );


      if (
        errorValidacion
      ) {
        return res
          .status(400)
          .json({
            mensaje:
              errorValidacion
          });
      }
    }


    /* =====================================================
       9. VALIDAR PRODUCTOS NUEVOS
       ===================================================== */

    if (
      nuevos_detalles.length >
      0
    ) {
      const errorValidacion =
        validarDetalles(
          nuevos_detalles,
          'El nuevo producto'
        );


      if (
        errorValidacion
      ) {
        return res
          .status(400)
          .json({
            mensaje:
              errorValidacion
          });
      }
    }


    /* =====================================================
       10. EJECUTAR TRANSACCIÓN
       ===================================================== */

    const resultado =
      await actualizarPedidoConDetalles({
        pedido_id,

        cliente_id:
          Number(
            cliente_id
          ),

        codigo_pedido,

        descripcion_pedido,

        fecha_pedido,

        fecha_entrega_estimada,

        motivo_cambio,

        detalles_editados,

        nuevos_detalles,

        updated_by_usuario_id:
          req.usuario.usuario_id
      });


    /* =====================================================
       11. PEDIDO NO ENCONTRADO
       ===================================================== */

    if (
      !resultado
    ) {
      return res
        .status(404)
        .json({
          mensaje:
            'Pedido no encontrado o cancelado'
        });
    }


    /* =====================================================
       12. RESPUESTA
       ===================================================== */

    res.json({
      mensaje:
        'Pedido actualizado correctamente',

      pedido:
        resultado.pedido,

      detalles_actualizados:
        resultado.detalles_actualizados,

      detalles_agregados:
        resultado.detalles_agregados
    });

  } catch (error) {
    console.error(
      'Error editar pedido:',
      error.message
    );


    /* =====================================================
       ERRORES DE NEGOCIO
       ===================================================== */

    /*
     * Estos errores vienen de:
     *
     * pedido.edicion.model.js
     *
     * Ejemplos:
     *
     * - cantidad menor a lo entregado
     * - producto con entrega y cambio estructural
     * - total inferior a depósitos
     * - pedido completamente entregado
     */
    if (
      error.statusCode
    ) {
      return res
        .status(
          error.statusCode
        )
        .json({
          mensaje:
            error.message
        });
    }


    /* =====================================================
       CÓDIGO DE PEDIDO DUPLICADO
       ===================================================== */

    if (
      error.number === 2601 ||
      error.number === 2627
    ) {
      return res
        .status(409)
        .json({
          mensaje:
            'Ya existe otro pedido con ese código'
        });
    }


    /* =====================================================
       FOREIGN KEY / CHECK CONSTRAINT
       ===================================================== */

    if (
      error.number === 547
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'Uno de los datos seleccionados para el pedido no es válido'
        });
    }


    /* =====================================================
       ERROR GENERAL
       ===================================================== */

    res
      .status(500)
      .json({
        mensaje:
          'Error interno al editar pedido'
      });
  }
};


/* =========================================================
   EXPORTS
   ========================================================= */

module.exports = {
  obtenerPedidos,
  obtenerPedido,
  registrarPedido,
  editarPedido
};