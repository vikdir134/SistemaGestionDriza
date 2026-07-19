const {
  listarClientes,
  listarClientesSelect,
  obtenerClientePorId,
  buscarClientePorRuc,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  listarPreciosCliente,
  crearPrecioCliente
} = require('./cliente.model');

const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};

const obtenerClientes = async (req, res) => {
  try {
    const {
      q,
      page = 1,
      limit = 10
    } = req.query;

    const resultado = await listarClientes({
      q: q || null,
      page: Number(page),
      limit: Number(limit)
    });

    res.json({
      mensaje: 'Clientes obtenidos correctamente',
      clientes: resultado.clientes,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error('Error listar clientes:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar clientes'
    });
  }
};

const obtenerClientesSelect = async (req, res) => {
  try {
    const clientes = await listarClientesSelect();

    res.json({
      mensaje: 'Clientes para selección obtenidos correctamente',
      clientes
    });

  } catch (error) {
    console.error('Error listar clientes select:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar clientes para selección'
    });
  }
};

const obtenerCliente = async (req, res) => {
  try {
    const { cliente_id } = req.params;

    const cliente = await obtenerClientePorId(cliente_id);

    if (!cliente) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.json({
      mensaje: 'Cliente obtenido correctamente',
      cliente
    });

  } catch (error) {
    console.error('Error obtener cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener cliente'
    });
  }
};

const registrarCliente = async (req, res) => {
  try {
    let {
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      agencia_entrega
    } = req.body;

    if (!ruc || !razon_social) {
      return res.status(400).json({
        mensaje: 'RUC y razón social son obligatorios'
      });
    }

    ruc = ruc.trim();
    razon_social = razon_social.trim().toUpperCase();

    direccion = direccion ? direccion.trim() : null;
    telefono = telefono ? telefono.trim() : null;
    correo = correo ? correo.trim() : null;
    agencia_entrega = agencia_entrega ? agencia_entrega.trim().toUpperCase() : null;

    if (ruc.length !== 11 || /[^0-9]/.test(ruc)) {
      return res.status(400).json({
        mensaje: 'El RUC debe tener 11 dígitos numéricos'
      });
    }

    const clienteExistente = await buscarClientePorRuc(ruc);

    if (clienteExistente) {
      return res.status(409).json({
        mensaje: 'Ya existe un cliente con ese RUC'
      });
    }

    const cliente = await crearCliente({
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      agencia_entrega,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Cliente registrado correctamente',
      cliente
    });

  } catch (error) {
    console.error('Error registrar cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar cliente'
    });
  }
};

const editarCliente = async (req, res) => {
  try {
    const { cliente_id } = req.params;

    let {
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      agencia_entrega
    } = req.body;

    if (!ruc || !razon_social) {
      return res.status(400).json({
        mensaje: 'RUC y razón social son obligatorios'
      });
    }

    ruc = ruc.trim();
    razon_social = razon_social.trim().toUpperCase();

    direccion = direccion ? direccion.trim() : null;
    telefono = telefono ? telefono.trim() : null;
    correo = correo ? correo.trim() : null;
    agencia_entrega = agencia_entrega ? agencia_entrega.trim().toUpperCase() : null;

    if (ruc.length !== 11 || /[^0-9]/.test(ruc)) {
      return res.status(400).json({
        mensaje: 'El RUC debe tener 11 dígitos numéricos'
      });
    }

    const clienteExistente = await buscarClientePorRuc(ruc);

    if (
      clienteExistente &&
      Number(clienteExistente.cliente_id) !== Number(cliente_id)
    ) {
      return res.status(409).json({
        mensaje: 'Ya existe otro cliente con ese RUC'
      });
    }

    const cliente = await actualizarCliente({
      cliente_id,
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      agencia_entrega,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!cliente) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.json({
      mensaje: 'Cliente actualizado correctamente',
      cliente
    });

  } catch (error) {
    console.error('Error editar cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al editar cliente'
    });
  }
};

const darBajaCliente = async (req, res) => {
  try {
    const { cliente_id } = req.params;

    const cliente = await eliminarCliente({
      cliente_id,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!cliente) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.json({
      mensaje: 'Cliente dado de baja correctamente',
      cliente
    });

  } catch (error) {
    console.error('Error eliminar cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al dar de baja cliente'
    });
  }
};

const obtenerPreciosCliente = async (req, res) => {
  try {
    const {
      cliente_id,
      q,
      page = 1,
      limit = 10
    } = req.query;

    const resultado = await listarPreciosCliente({
      cliente_id: cliente_id ? Number(cliente_id) : null,
      q: q || null,
      page: Number(page),
      limit: Number(limit)
    });

    res.json({
      mensaje: 'Historial de precios obtenido correctamente',
      precios: resultado.precios,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error('Error listar precios de cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar historial de precios'
    });
  }
};

const registrarPrecioCliente = async (req, res) => {
  try {
    let {
      cliente_id,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      fecha_precio,
      precio_unitario,
      moneda_codigo,
      observacion
    } = req.body;

    if (!cliente_id) {
      return res.status(400).json({
        mensaje: 'El cliente es obligatorio'
      });
    }

    if (!tipo_producto_id || !medida_id || !color_id || !material_id) {
      return res.status(400).json({
        mensaje: 'Tipo, medida, color y material son obligatorios'
      });
    }

    if (!precio_unitario || Number(precio_unitario) <= 0) {
      return res.status(400).json({
        mensaje: 'El precio debe ser mayor a 0'
      });
    }

    if (!moneda_codigo) {
      return res.status(400).json({
        mensaje: 'La moneda es obligatoria'
      });
    }

    moneda_codigo = moneda_codigo.toUpperCase();

    if (!['PEN', 'USD'].includes(moneda_codigo)) {
      return res.status(400).json({
        mensaje: 'La moneda debe ser PEN o USD'
      });
    }

    fecha_precio = fecha_precio || fechaActual();

    observacion = observacion
      ? observacion.trim()
      : null;

    const precio = await crearPrecioCliente({
      cliente_id,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      fecha_precio,
      precio_unitario,
      moneda_codigo,
      observacion,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Precio de cliente registrado correctamente',
      precio
    });

  } catch (error) {
    console.error('Error registrar precio cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar precio de cliente'
    });
  }
};

module.exports = {
  obtenerClientes,
  obtenerClientesSelect,
  obtenerCliente,
  registrarCliente,
  editarCliente,
  darBajaCliente,
  obtenerPreciosCliente,
  registrarPrecioCliente
};