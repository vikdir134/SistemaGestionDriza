const {
  listarProveedores,
  obtenerProveedorPorId,
  buscarProveedorPorRuc,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} = require('./proveedor.model');

const obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await listarProveedores();

    res.json({
      mensaje: 'Proveedores obtenidos correctamente',
      proveedores
    });

  } catch (error) {
    console.error('Error listar proveedores:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar proveedores'
    });
  }
};

const obtenerProveedor = async (req, res) => {
  try {
    const { proveedor_id } = req.params;

    const proveedor = await obtenerProveedorPorId(proveedor_id);

    if (!proveedor) {
      return res.status(404).json({
        mensaje: 'Proveedor no encontrado'
      });
    }

    res.json({
      mensaje: 'Proveedor obtenido correctamente',
      proveedor
    });

  } catch (error) {
    console.error('Error obtener proveedor:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener proveedor'
    });
  }
};

const registrarProveedor = async (req, res) => {
  try {
    let {
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

    ruc = ruc.trim();
    razon_social = razon_social.trim().toUpperCase();

    if (ruc.length !== 11 || /[^0-9]/.test(ruc)) {
      return res.status(400).json({
        mensaje: 'El RUC debe tener 11 dígitos numéricos'
      });
    }

    const proveedorExistente = await buscarProveedorPorRuc(ruc);

    if (proveedorExistente) {
      return res.status(409).json({
        mensaje: 'Ya existe un proveedor con ese RUC'
      });
    }

    const proveedor = await crearProveedor({
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Proveedor registrado correctamente',
      proveedor
    });

  } catch (error) {
    console.error('Error registrar proveedor:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar proveedor'
    });
  }
};

const editarProveedor = async (req, res) => {
  try {
    const { proveedor_id } = req.params;

    let {
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

    razon_social = razon_social.trim().toUpperCase();

    const proveedor = await actualizarProveedor({
      proveedor_id,
      razon_social,
      direccion,
      telefono,
      correo,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!proveedor) {
      return res.status(404).json({
        mensaje: 'Proveedor no encontrado'
      });
    }

    res.json({
      mensaje: 'Proveedor actualizado correctamente',
      proveedor
    });

  } catch (error) {
    console.error('Error editar proveedor:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al editar proveedor'
    });
  }
};

const darBajaProveedor = async (req, res) => {
  try {
    const { proveedor_id } = req.params;

    const proveedor = await eliminarProveedor({
      proveedor_id,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!proveedor) {
      return res.status(404).json({
        mensaje: 'Proveedor no encontrado'
      });
    }

    res.json({
      mensaje: 'Proveedor dado de baja correctamente',
      proveedor
    });

  } catch (error) {
    console.error('Error eliminar proveedor:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al dar de baja proveedor'
    });
  }
};

module.exports = {
  obtenerProveedores,
  obtenerProveedor,
  registrarProveedor,
  editarProveedor,
  darBajaProveedor
};