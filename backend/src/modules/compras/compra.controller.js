const {
  listarCompras,
  obtenerCompraPorId,
  crearCompraConDetalles
} = require('./compra.model');

const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};

const obtenerCompras = async (req, res) => {
  try {
    const {
      proveedor_id,
      q,
      page = 1,
      limit = 10
    } = req.query;

    const resultado = await listarCompras({
      proveedor_id: proveedor_id ? Number(proveedor_id) : null,
      q: q || null,
      page: Number(page),
      limit: Number(limit)
    });

    res.json({
      mensaje: 'Compras obtenidas correctamente',
      compras: resultado.compras,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error('Error listar compras:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar compras'
    });
  }
};

const obtenerCompra = async (req, res) => {
  try {
    const { compra_id } = req.params;

    const compra = await obtenerCompraPorId(compra_id);

    if (!compra) {
      return res.status(404).json({
        mensaje: 'Compra no encontrada'
      });
    }

    res.json({
      mensaje: 'Compra obtenida correctamente',
      compra
    });

  } catch (error) {
    console.error('Error obtener compra:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener compra'
    });
  }
};

const registrarCompra = async (req, res) => {
  try {
    let {
      proveedor_id,
      fecha_compra,
      numero_documento,
      moneda_codigo,
      descripcion,
      detalles
    } = req.body;

    if (!proveedor_id) {
      return res.status(400).json({
        mensaje: 'El proveedor es obligatorio'
      });
    }

    if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({
        mensaje: 'La compra debe tener al menos un item'
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

    fecha_compra = fecha_compra || fechaActual();

    numero_documento = numero_documento
      ? numero_documento.trim().toUpperCase()
      : null;

    descripcion = descripcion
      ? descripcion.trim()
      : null;

    for (const [index, item] of detalles.entries()) {
      if (!item.descripcion_item && !item.material_id) {
        return res.status(400).json({
          mensaje: `El item ${index + 1} debe tener material o descripción`
        });
      }

      if (!item.cantidad || Number(item.cantidad) <= 0) {
        return res.status(400).json({
          mensaje: `El item ${index + 1} debe tener cantidad mayor a 0`
        });
      }

      if (!item.unidad_medida_id) {
        return res.status(400).json({
          mensaje: `El item ${index + 1} debe tener unidad`
        });
      }

      if (!item.precio_unitario || Number(item.precio_unitario) < 0) {
        return res.status(400).json({
          mensaje: `El item ${index + 1} debe tener precio unitario válido`
        });
      }

      item.descripcion_item = item.descripcion_item
        ? item.descripcion_item.trim().toUpperCase()
        : null;
    }

    const resultado = await crearCompraConDetalles({
      proveedor_id,
      fecha_compra,
      numero_documento,
      moneda_codigo,
      descripcion,
      detalles,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Compra registrada correctamente',
      compra: resultado.compra,
      detalles: resultado.detalles
    });

  } catch (error) {
    console.error('Error registrar compra:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar compra'
    });
  }
};

module.exports = {
  obtenerCompras,
  obtenerCompra,
  registrarCompra
};