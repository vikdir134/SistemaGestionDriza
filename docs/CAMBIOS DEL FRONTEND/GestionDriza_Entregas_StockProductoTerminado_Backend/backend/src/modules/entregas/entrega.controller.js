const {
  listarPedidosParaEntrega,
  obtenerPedidoParaEntrega,
  crearEntregaConDetalles
} = require('./entrega.model');


const fechaActual = () => {
  return new Date()
    .toISOString()
    .slice(0, 10);
};


const normalizarIdempotencyKey = (
  req
) => {
  const valor =
    req.get(
      'Idempotency-Key'
    );

  if (!valor) {
    return null;
  }

  return String(valor)
    .trim();
};


const obtenerPedidosParaEntrega =
  async (
    req,
    res
  ) => {
    try {
      const {
        cliente_id,
        q,
        page = 1,
        limit = 10
      } = req.query;

      const pageNumero =
        Number(page);

      const limitNumero =
        Number(limit);

      if (
        !Number.isInteger(
          pageNumero
        ) ||
        pageNumero < 1 ||
        !Number.isInteger(
          limitNumero
        ) ||
        limitNumero < 1 ||
        limitNumero > 100
      ) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      const clienteId =
        cliente_id
          ? Number(
              cliente_id
            )
          : null;

      if (
        clienteId !== null &&
        (
          !Number.isInteger(
            clienteId
          ) ||
          clienteId <= 0
        )
      ) {
        return res.status(400).json({
          mensaje:
            'El cliente enviado no es válido'
        });
      }

      const resultado =
        await listarPedidosParaEntrega({
          cliente_id:
            clienteId,
          q:
            q
              ? String(q).trim()
              : null,
          page:
            pageNumero,
          limit:
            limitNumero
        });

      res.json({
        mensaje:
          'Pedidos para entrega obtenidos correctamente',
        pedidos:
          resultado.pedidos,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error listar pedidos para entrega:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al listar pedidos para entrega'
      });
    }
  };


const obtenerPedidoEntrega =
  async (
    req,
    res
  ) => {
    try {
      const pedido_id =
        Number(
          req.params.pedido_id
        );

      if (
        !Number.isInteger(
          pedido_id
        ) ||
        pedido_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de pedido inválido'
        });
      }

      const pedido =
        await obtenerPedidoParaEntrega(
          pedido_id
        );

      if (!pedido) {
        return res.status(404).json({
          mensaje:
            'Pedido no encontrado'
        });
      }

      res.json({
        mensaje:
          'Pedido para entrega obtenido correctamente',
        pedido
      });

    } catch (error) {
      console.error(
        'Error obtener pedido para entrega:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener pedido para entrega'
      });
    }
  };


const registrarEntrega =
  async (
    req,
    res
  ) => {
    try {
      let {
        pedido_id,
        fecha_entrega,
        comentario_entrega,
        detalles
      } = req.body;

      pedido_id =
        Number(
          pedido_id
        );

      if (
        !Number.isInteger(
          pedido_id
        ) ||
        pedido_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'El pedido es obligatorio'
        });
      }

      if (
        !Array.isArray(
          detalles
        ) ||
        detalles.length === 0
      ) {
        return res.status(400).json({
          mensaje:
            'La entrega debe tener al menos un producto'
        });
      }

      fecha_entrega =
        fecha_entrega ||
        fechaActual();

      comentario_entrega =
        comentario_entrega
          ? String(
              comentario_entrega
            ).trim()
          : null;

      if (
        comentario_entrega &&
        comentario_entrega.length > 500
      ) {
        return res.status(400).json({
          mensaje:
            'El comentario no puede superar 500 caracteres'
        });
      }

      detalles =
        detalles.filter(
          (item) =>
            Number(
              item.cantidad_entregada
            ) > 0
        );

      if (
        detalles.length === 0
      ) {
        return res.status(400).json({
          mensaje:
            'Debe ingresar al menos una cantidad entregada mayor a 0'
        });
      }

      const idsDetalle =
        new Set();

      for (
        const [
          index,
          item
        ]
        of detalles.entries()
      ) {
        const pedidoDetalleId =
          Number(
            item.pedido_detalle_id
          );

        const cantidad =
          Number(
            item.cantidad_entregada
          );

        const unidadId =
          Number(
            item.unidad_medida_id
          );

        if (
          !Number.isInteger(
            pedidoDetalleId
          ) ||
          pedidoDetalleId <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `El producto ${index + 1} no tiene un detalle de pedido válido`
          });
        }

        if (
          idsDetalle.has(
            pedidoDetalleId
          )
        ) {
          return res.status(400).json({
            mensaje:
              'No se puede enviar dos veces el mismo producto del pedido en una sola entrega'
          });
        }

        idsDetalle.add(
          pedidoDetalleId
        );

        if (
          !Number.isFinite(
            cantidad
          ) ||
          cantidad <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `El producto ${index + 1} debe tener una cantidad entregada mayor a 0`
          });
        }

        if (
          !Number.isInteger(
            unidadId
          ) ||
          unidadId <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `El producto ${index + 1} debe tener unidad de medida`
          });
        }

        item.pedido_detalle_id =
          pedidoDetalleId;

        item.cantidad_entregada =
          Number(
            cantidad.toFixed(3)
          );

        item.unidad_medida_id =
          unidadId;

        item.observacion =
          item.observacion
            ? String(
                item.observacion
              ).trim()
            : null;

        if (
          item.observacion &&
          item.observacion.length > 300
        ) {
          return res.status(400).json({
            mensaje:
              `La observación del producto ${index + 1} no puede superar 300 caracteres`
          });
        }
      }

      const idempotency_key =
        normalizarIdempotencyKey(
          req
        );

      if (
        idempotency_key &&
        idempotency_key.length > 100
      ) {
        return res.status(400).json({
          mensaje:
            'Idempotency-Key no puede superar 100 caracteres'
        });
      }

      const resultado =
        await crearEntregaConDetalles({
          pedido_id,
          fecha_entrega,
          comentario_entrega,
          detalles,
          idempotency_key,
          created_by_usuario_id:
            req.usuario.usuario_id
        });

      return res
        .status(
          resultado.reutilizada
            ? 200
            : 201
        )
        .json({
          mensaje:
            resultado.reutilizada
              ? 'La entrega ya había sido registrada; se devolvió el resultado existente'
              : 'Entrega registrada correctamente',
          reutilizada:
            resultado.reutilizada,
          entrega:
            resultado.entrega,
          detalles:
            resultado.detalles
        });

    } catch (error) {
      console.error(
        'Error registrar entrega:',
        error.message
      );

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
       * Seguridad adicional:
       * mantenemos compatibilidad con el trigger histórico.
       */
      if (
        error.message &&
        error.message.includes(
          'No se puede entregar una cantidad mayor'
        )
      ) {
        return res.status(400).json({
          mensaje:
            'No se puede entregar una cantidad mayor a la cantidad pendiente'
        });
      }

      res.status(500).json({
        mensaje:
          'Error interno al registrar entrega'
      });
    }
  };


module.exports = {
  obtenerPedidosParaEntrega,
  obtenerPedidoEntrega,
  registrarEntrega
};
