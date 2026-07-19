const {
  listarPedidos,
  obtenerPedidoPorId,
  crearPedidoConDetalles,
  actualizarPedidoYAgregarDetalles
} = require('./pedido.model');

const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};

const normalizarDetalle = (item) => {
  return {
    ...item,
    moneda_codigo: item.moneda_codigo
      ? item.moneda_codigo.toUpperCase()
      : null,
    descripcion_item: item.descripcion_item
      ? item.descripcion_item.trim().toUpperCase()
      : null,
    observacion: item.observacion
      ? item.observacion.trim()
      : null
  };
};

const validarDetalles = (detalles, etiqueta = 'producto') => {
  for (const [index, item] of detalles.entries()) {
    if (
      !item.tipo_producto_id ||
      !item.medida_id ||
      !item.color_id ||
      !item.material_id
    ) {
      return `${etiqueta} ${index + 1} debe tener tipo, medida, color y material`;
    }

    if (!item.cantidad_pedida || Number(item.cantidad_pedida) <= 0) {
      return `${etiqueta} ${index + 1} debe tener una cantidad mayor a 0`;
    }

    if (!item.unidad_medida_id) {
      return `${etiqueta} ${index + 1} debe tener una unidad`;
    }

    if (!item.precio_unitario || Number(item.precio_unitario) < 0) {
      return `${etiqueta} ${index + 1} debe tener precio ofrecido válido`;
    }

    if (!item.moneda_codigo) {
      return `${etiqueta} ${index + 1} debe tener moneda`;
    }

    if (!['PEN', 'USD'].includes(item.moneda_codigo.toUpperCase())) {
      return `${etiqueta} ${index + 1} debe tener moneda PEN o USD`;
    }
  }

  return null;
};

const obtenerPedidos = async (req, res) => {
  try {
    const {
      cliente_id,
      estado_pedido,
      q,
      page = 1,
      limit = 10
    } = req.query;

    const resultado = await listarPedidos({
      cliente_id: cliente_id ? Number(cliente_id) : null,
      estado_pedido: estado_pedido || null,
      q: q || null,
      page: Number(page),
      limit: Number(limit)
    });

    res.json({
      mensaje: 'Pedidos obtenidos correctamente',
      pedidos: resultado.pedidos,
      paginacion: resultado.paginacion
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

    codigo_pedido = codigo_pedido
      ? codigo_pedido.trim().toUpperCase()
      : null;

    descripcion_pedido = descripcion_pedido
      ? descripcion_pedido.trim()
      : null;

    detalles = detalles.map(normalizarDetalle);

    const errorValidacion = validarDetalles(detalles, 'El producto');

    if (errorValidacion) {
      return res.status(400).json({
        mensaje: errorValidacion
      });
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

const editarPedido = async (req, res) => {
  try {
    const { pedido_id } = req.params;

    let {
      cliente_id,
      codigo_pedido,
      descripcion_pedido,
      fecha_pedido,
      fecha_entrega_estimada,
      motivo_cambio,
      nuevos_detalles = []
    } = req.body;

    if (!cliente_id) {
      return res.status(400).json({
        mensaje: 'El cliente es obligatorio'
      });
    }

    if (!fecha_pedido) {
      return res.status(400).json({
        mensaje: 'La fecha del pedido es obligatoria'
      });
    }

    if (!motivo_cambio || motivo_cambio.trim() === '') {
      return res.status(400).json({
        mensaje: 'Debe ingresar el motivo del cambio'
      });
    }

    codigo_pedido = codigo_pedido
      ? codigo_pedido.trim().toUpperCase()
      : null;

    descripcion_pedido = descripcion_pedido
      ? descripcion_pedido.trim()
      : null;

    motivo_cambio = motivo_cambio.trim();

    nuevos_detalles = Array.isArray(nuevos_detalles)
      ? nuevos_detalles.map(normalizarDetalle)
      : [];

    if (nuevos_detalles.length > 0) {
      const errorValidacion = validarDetalles(nuevos_detalles, 'El nuevo producto');

      if (errorValidacion) {
        return res.status(400).json({
          mensaje: errorValidacion
        });
      }
    }

    const resultado = await actualizarPedidoYAgregarDetalles({
      pedido_id,
      cliente_id,
      codigo_pedido,
      descripcion_pedido,
      fecha_pedido,
      fecha_entrega_estimada,
      motivo_cambio,
      nuevos_detalles,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!resultado) {
      return res.status(404).json({
        mensaje: 'Pedido no encontrado o cancelado'
      });
    }

    res.json({
      mensaje: 'Pedido actualizado correctamente',
      pedido: resultado.pedido,
      detalles_agregados: resultado.detalles_agregados
    });

  } catch (error) {
    console.error('Error editar pedido:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al editar pedido'
    });
  }
};

module.exports = {
  obtenerPedidos,
  obtenerPedido,
  registrarPedido,
  editarPedido
};