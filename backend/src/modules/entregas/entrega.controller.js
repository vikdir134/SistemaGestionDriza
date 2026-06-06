const {
  listarPedidosParaEntrega,
  obtenerPedidoParaEntrega,
  crearEntregaConDetalles
} = require('./entrega.model');

const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};

const obtenerPedidosParaEntrega = async (req, res) => {
  try {
    const {
      cliente_id,
      q,
      page = 1,
      limit = 10
    } = req.query;

    const resultado = await listarPedidosParaEntrega({
      cliente_id: cliente_id ? Number(cliente_id) : null,
      q: q || null,
      page: Number(page),
      limit: Number(limit)
    });

    res.json({
      mensaje: 'Pedidos para entrega obtenidos correctamente',
      pedidos: resultado.pedidos,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error('Error listar pedidos para entrega:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar pedidos para entrega'
    });
  }
};
const obtenerPedidoEntrega = async (req, res) => {
  try {
    const { pedido_id } = req.params;

    const pedido = await obtenerPedidoParaEntrega(pedido_id);

    if (!pedido) {
      return res.status(404).json({
        mensaje: 'Pedido no encontrado'
      });
    }

    res.json({
      mensaje: 'Pedido para entrega obtenido correctamente',
      pedido
    });

  } catch (error) {
    console.error('Error obtener pedido para entrega:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener pedido para entrega'
    });
  }
};

const registrarEntrega = async (req, res) => {
  try {
    let {
      pedido_id,
      fecha_entrega,
      comentario_entrega,
      detalles
    } = req.body;

    if (!pedido_id) {
      return res.status(400).json({
        mensaje: 'El pedido es obligatorio'
      });
    }

    if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({
        mensaje: 'La entrega debe tener al menos un producto'
      });
    }

    fecha_entrega = fecha_entrega || fechaActual();

    detalles = detalles.filter((item) => Number(item.cantidad_entregada) > 0);

    if (detalles.length === 0) {
      return res.status(400).json({
        mensaje: 'Debe ingresar al menos una cantidad entregada mayor a 0'
      });
    }

    for (const [index, item] of detalles.entries()) {
      if (!item.pedido_detalle_id) {
        return res.status(400).json({
          mensaje: `El item ${index + 1} no tiene detalle de pedido`
        });
      }

      if (!item.cantidad_entregada || Number(item.cantidad_entregada) <= 0) {
        return res.status(400).json({
          mensaje: `El item ${index + 1} debe tener cantidad entregada mayor a 0`
        });
      }

      if (!item.unidad_medida_id) {
        return res.status(400).json({
          mensaje: `El item ${index + 1} debe tener unidad de medida`
        });
      }

      item.observacion = item.observacion
        ? item.observacion.trim()
        : null;
    }

    const resultado = await crearEntregaConDetalles({
      pedido_id,
      fecha_entrega,
      comentario_entrega,
      detalles,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Entrega registrada correctamente',
      entrega: resultado.entrega,
      detalles: resultado.detalles
    });

  } catch (error) {
    console.error('Error registrar entrega:', error.message);

    if (error.message.includes('No se puede entregar una cantidad mayor')) {
      return res.status(400).json({
        mensaje: 'No se puede entregar una cantidad mayor a la cantidad pendiente'
      });
    }

    res.status(500).json({
      mensaje: 'Error interno al registrar entrega'
    });
  }
};

module.exports = {
  obtenerPedidosParaEntrega,
  obtenerPedidoEntrega,
  registrarEntrega
};