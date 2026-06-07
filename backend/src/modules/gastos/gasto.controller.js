const {
  listarTiposGasto,
  buscarTipoGastoPorNombre,
  crearTipoGasto,
  listarGastos,
  obtenerGastoPorId,
  crearGasto
} = require('./gasto.model');

const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};

const obtenerTiposGasto = async (req, res) => {
  try {
    const tipos = await listarTiposGasto();

    res.json({
      mensaje: 'Tipos de gasto obtenidos correctamente',
      tipos
    });

  } catch (error) {
    console.error('Error listar tipos de gasto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar tipos de gasto'
    });
  }
};

const registrarTipoGasto = async (req, res) => {
  try {
    let { nombre } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({
        mensaje: 'El nombre del tipo de gasto es obligatorio'
      });
    }

    nombre = nombre.trim().toUpperCase();

    const existente = await buscarTipoGastoPorNombre(nombre);

    if (existente) {
      return res.status(409).json({
        mensaje: 'Ya existe un tipo de gasto con ese nombre'
      });
    }

    const tipo = await crearTipoGasto({
      nombre,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Tipo de gasto registrado correctamente',
      tipo
    });

  } catch (error) {
    console.error('Error registrar tipo de gasto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar tipo de gasto'
    });
  }
};

const obtenerGastos = async (req, res) => {
  try {
    const {
      tipo_gasto_id,
      proveedor_id,
      moneda_codigo,
      q,
      page = 1,
      limit = 10
    } = req.query;

    const resultado = await listarGastos({
      tipo_gasto_id: tipo_gasto_id ? Number(tipo_gasto_id) : null,
      proveedor_id: proveedor_id ? Number(proveedor_id) : null,
      moneda_codigo: moneda_codigo || null,
      q: q || null,
      page: Number(page),
      limit: Number(limit)
    });

    res.json({
      mensaje: 'Gastos obtenidos correctamente',
      gastos: resultado.gastos,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error('Error listar gastos:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar gastos'
    });
  }
};

const obtenerGasto = async (req, res) => {
  try {
    const { gasto_id } = req.params;

    const gasto = await obtenerGastoPorId(gasto_id);

    if (!gasto) {
      return res.status(404).json({
        mensaje: 'Gasto no encontrado'
      });
    }

    res.json({
      mensaje: 'Gasto obtenido correctamente',
      gasto
    });

  } catch (error) {
    console.error('Error obtener gasto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener gasto'
    });
  }
};

const registrarGasto = async (req, res) => {
  try {
    let {
      tipo_gasto_id,
      proveedor_id,
      fecha_gasto,
      monto,
      moneda_codigo,
      descripcion,
      comprobante
    } = req.body;

    if (!tipo_gasto_id) {
      return res.status(400).json({
        mensaje: 'El tipo de gasto es obligatorio'
      });
    }

    if (!monto || Number(monto) <= 0) {
      return res.status(400).json({
        mensaje: 'El monto debe ser mayor a 0'
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

    fecha_gasto = fecha_gasto || fechaActual();

    descripcion = descripcion
      ? descripcion.trim()
      : null;

    comprobante = comprobante
      ? comprobante.trim().toUpperCase()
      : null;

    const gasto = await crearGasto({
      tipo_gasto_id,
      proveedor_id,
      fecha_gasto,
      monto,
      moneda_codigo,
      descripcion,
      comprobante,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Gasto registrado correctamente',
      gasto
    });

  } catch (error) {
    console.error('Error registrar gasto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar gasto'
    });
  }
};

module.exports = {
  obtenerTiposGasto,
  registrarTipoGasto,
  obtenerGastos,
  obtenerGasto,
  registrarGasto
};