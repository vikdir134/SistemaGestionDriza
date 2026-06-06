const {
  listarPedidos,
  obtenerPedidoPorId,
  crearPedidoConDetalles
} = require('./pedido.model');

const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};

const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await listarPedidos();

    res.json({
      mensaje: 'Pedidos obtenidos correctamente',
      pedidos
    });

  } catch (error) {
    console.error('Error listar pedidos:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar pedidos'
    });
  }
};

const obtenerPedido = async (req, res) => {
  try {
    const { pedido_id } = req.params;

    const pedido = await obtenerPedidoPorId(pedido_id);

    if (!pedido) {
      return res.status(404).json({
        mensaje: 'Pedido no encontrado'
      });
    }

    res.json({
      mensaje: 'Pedido obtenido correctamente',
      pedido
    });

  } catch (error) {
    console.error('Error obtener pedido:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener pedido'
    });
  }
};

const registrarPedido = async (req, res) => {
  try {
    let {
      cliente_id,
      codigo_pedido,
      descripcion_pedido,
      fecha_pedido,
      fecha_entrega_estimada,
      detalles
    } = req.body;

    if (!cliente_id) {
      return res.status(400).json({
        mensaje: 'El cliente es obligatorio'
      });
    }

    if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({
        mensaje: 'El pedido debe tener al menos un producto'
      });
    }

    fecha_pedido = fecha_pedido || fechaActual();

    descripcion_pedido = descripcion_pedido
      ? descripcion_pedido.trim()
      : null;

    codigo_pedido = codigo_pedido
      ? codigo_pedido.trim().toUpperCase()
      : null;

    for (const [index, item] of detalles.entries()) {
      if (
        !item.tipo_producto_id ||
        !item.medida_id ||
        !item.color_id ||
        !item.material_id
      ) {
        return res.status(400).json({
          mensaje: `El producto ${index + 1} debe tener tipo, medida, color y material`
        });
      }

      if (!item.cantidad_pedida || Number(item.cantidad_pedida) <= 0) {
        return res.status(400).json({
          mensaje: `El producto ${index + 1} debe tener una cantidad mayor a 0`
        });
      }

      if (!item.unidad_medida_id) {
        return res.status(400).json({
          mensaje: `El producto ${index + 1} debe tener una unidad`
        });
      }

      if (!item.precio_unitario || Number(item.precio_unitario) < 0) {
        return res.status(400).json({
          mensaje: `El producto ${index + 1} debe tener precio ofrecido válido`
        });
      }

      if (!item.moneda_codigo) {
        return res.status(400).json({
          mensaje: `El producto ${index + 1} debe tener moneda`
        });
      }

      item.moneda_codigo = item.moneda_codigo.toUpperCase();

      item.descripcion_item = item.descripcion_item
        ? item.descripcion_item.trim().toUpperCase()
        : null;

      item.observacion = item.observacion
        ? item.observacion.trim()
        : null;
    }

    const resultado = await crearPedidoConDetalles({
      cliente_id,
      codigo_pedido,
      descripcion_pedido,
      fecha_pedido,
      fecha_entrega_estimada,
      detalles,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Pedido registrado correctamente',
      pedido: resultado.pedido,
      detalles: resultado.detalles
    });

  } catch (error) {
    console.error('Error registrar pedido:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar pedido'
    });
  }
};

module.exports = {
  obtenerPedidos,
  obtenerPedido,
  registrarPedido
};