const {
  listarClientes,
  obtenerClientePorId,
  buscarClientePorRuc,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} = require('./cliente.model');

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await listarClientes();

    res.json({
      mensaje: 'Clientes obtenidos correctamente',
      clientes
    });
  } catch (error) {
    console.error('Error listar clientes:', error.message);
    res.status(500).json({
      mensaje: 'Error interno al listar clientes'
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
    const {
      ruc,
      razon_social,
      direccion,
      telefono,
      correo
    } = req.body;

    if (!ruc || !razon_social) {
      return res.status(400).json({
        mensaje: 'RUC y razón social son obligatorios'
      });
    }

    if (ruc.length !== 11) {
      return res.status(400).json({
        mensaje: 'El RUC debe tener 11 dígitos'
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

    const {
      razon_social,
      direccion,
      telefono,
      correo
    } = req.body;

    if (!razon_social) {
      return res.status(400).json({
        mensaje: 'La razón social es obligatoria'
      });
    }

    const clienteActualizado = await actualizarCliente({
      cliente_id,
      razon_social,
      direccion,
      telefono,
      correo,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!clienteActualizado) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.json({
      mensaje: 'Cliente actualizado correctamente',
      cliente: clienteActualizado
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

    const clienteEliminado = await eliminarCliente({
      cliente_id,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!clienteEliminado) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.json({
      mensaje: 'Cliente dado de baja correctamente',
      cliente: clienteEliminado
    });
  } catch (error) {
    console.error('Error dar baja cliente:', error.message);
    res.status(500).json({
      mensaje: 'Error interno al dar de baja cliente'
    });
  }
};

module.exports = {
  obtenerClientes,
  obtenerCliente,
  registrarCliente,
  editarCliente,
  darBajaCliente
};