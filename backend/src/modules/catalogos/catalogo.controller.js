const {
  listarCatalogo,
  buscarPorNombre,
  crearCatalogo,
  actualizarCatalogo,
  eliminarCatalogo,
  listarUnidadesMedida
} = require('./catalogo.model');

const catalogosValidos = [
  'tiposProducto',
  'medidas',
  'colores',
  'materiales'
];

const validarCatalogo = (catalogo) => {
  return catalogosValidos.includes(catalogo);
};

const obtenerCatalogo = async (req, res) => {
  try {
    const { catalogo } = req.params;

    if (!validarCatalogo(catalogo)) {
      return res.status(400).json({
        mensaje: 'Catálogo no válido'
      });
    }

    const items = await listarCatalogo(catalogo);

    res.json({
      mensaje: 'Catálogo obtenido correctamente',
      catalogo,
      items
    });

  } catch (error) {
    console.error('Error obtener catálogo:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener catálogo'
    });
  }
};

const registrarCatalogo = async (req, res) => {
  try {
    const { catalogo } = req.params;
    const { nombre } = req.body;

    if (!validarCatalogo(catalogo)) {
      return res.status(400).json({
        mensaje: 'Catálogo no válido'
      });
    }

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({
        mensaje: 'El nombre es obligatorio'
      });
    }

    const nombreNormalizado = nombre.trim().toUpperCase();

    const existente = await buscarPorNombre(catalogo, nombreNormalizado);

    if (existente) {
      return res.status(409).json({
        mensaje: 'Ya existe un registro con ese nombre'
      });
    }

    const item = await crearCatalogo({
      catalogo,
      nombre: nombreNormalizado,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Registro creado correctamente',
      catalogo,
      item
    });

  } catch (error) {
    console.error('Error registrar catálogo:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar catálogo'
    });
  }
};

const editarCatalogo = async (req, res) => {
  try {
    const { catalogo, id } = req.params;
    const { nombre } = req.body;

    if (!validarCatalogo(catalogo)) {
      return res.status(400).json({
        mensaje: 'Catálogo no válido'
      });
    }

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({
        mensaje: 'El nombre es obligatorio'
      });
    }

    const nombreNormalizado = nombre.trim().toUpperCase();

    const item = await actualizarCatalogo({
      catalogo,
      id,
      nombre: nombreNormalizado
    });

    if (!item) {
      return res.status(404).json({
        mensaje: 'Registro no encontrado'
      });
    }

    res.json({
      mensaje: 'Registro actualizado correctamente',
      catalogo,
      item
    });

  } catch (error) {
    console.error('Error editar catálogo:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al editar catálogo'
    });
  }
};

const darBajaCatalogo = async (req, res) => {
  try {
    const { catalogo, id } = req.params;

    if (!validarCatalogo(catalogo)) {
      return res.status(400).json({
        mensaje: 'Catálogo no válido'
      });
    }

    const item = await eliminarCatalogo({
      catalogo,
      id
    });

    if (!item) {
      return res.status(404).json({
        mensaje: 'Registro no encontrado'
      });
    }

    res.json({
      mensaje: 'Registro dado de baja correctamente',
      catalogo,
      item
    });

  } catch (error) {
    console.error('Error eliminar catálogo:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al eliminar catálogo'
    });
  }
};

const obtenerUnidadesMedida = async (req, res) => {
  try {
    const unidades = await listarUnidadesMedida();

    res.json({
      mensaje: 'Unidades de medida obtenidas correctamente',
      unidades
    });

  } catch (error) {
    console.error('Error obtener unidades:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener unidades de medida'
    });
  }
};

module.exports = {
  obtenerCatalogo,
  registrarCatalogo,
  editarCatalogo,
  darBajaCatalogo,
  obtenerUnidadesMedida
};