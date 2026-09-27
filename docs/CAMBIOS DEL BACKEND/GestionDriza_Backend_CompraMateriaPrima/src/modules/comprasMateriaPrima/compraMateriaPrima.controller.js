const {
  listarComprasMateriaPrima,
  obtenerCompraMateriaPrimaPorId,
  crearCompraMateriaPrima
} = require('./compraMateriaPrima.model');


const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};


const obtenerComprasMateriaPrima = async (
  req,
  res
) => {
  try {
    const {
      proveedor_id,
      q,
      page = 1,
      limit = 10
    } = req.query;

    const pageNumero = Number(page);
    const limitNumero = Number(limit);

    if (
      !Number.isInteger(pageNumero) ||
      pageNumero < 1 ||
      !Number.isInteger(limitNumero) ||
      limitNumero < 1 ||
      limitNumero > 100
    ) {
      return res.status(400).json({
        mensaje: 'Paginación inválida'
      });
    }

    const resultado =
      await listarComprasMateriaPrima({
        proveedor_id:
          proveedor_id
            ? Number(proveedor_id)
            : null,
        q: q ? String(q).trim() : null,
        page: pageNumero,
        limit: limitNumero
      });

    res.json({
      mensaje:
        'Compras de materia prima obtenidas correctamente',
      compras: resultado.compras,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error(
      'Error listar compras de materia prima:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al listar compras de materia prima'
    });
  }
};


const obtenerCompraMateriaPrima = async (
  req,
  res
) => {
  try {
    const compra_materia_prima_id =
      Number(req.params.compra_materia_prima_id);

    if (
      !Number.isInteger(compra_materia_prima_id) ||
      compra_materia_prima_id <= 0
    ) {
      return res.status(400).json({
        mensaje: 'Identificador de compra inválido'
      });
    }

    const compra =
      await obtenerCompraMateriaPrimaPorId(
        compra_materia_prima_id
      );

    if (!compra) {
      return res.status(404).json({
        mensaje: 'Compra de materia prima no encontrada'
      });
    }

    res.json({
      mensaje:
        'Compra de materia prima obtenida correctamente',
      compra
    });

  } catch (error) {
    console.error(
      'Error obtener compra de materia prima:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al obtener compra de materia prima'
    });
  }
};


const registrarCompraMateriaPrima = async (
  req,
  res
) => {
  try {
    let {
      nombre_lote,
      proveedor_id,
      fecha_compra,
      numero_documento,
      moneda_codigo,
      descripcion,
      detalles
    } = req.body;

    const idempotency_key =
      req.get('Idempotency-Key');

    /* ======================================================
       IDEMPOTENCIA
       ====================================================== */

    if (
      !idempotency_key ||
      !idempotency_key.trim()
    ) {
      return res.status(400).json({
        mensaje:
          'La cabecera Idempotency-Key es obligatoria'
      });
    }

    if (idempotency_key.trim().length > 100) {
      return res.status(400).json({
        mensaje:
          'La Idempotency-Key no puede superar 100 caracteres'
      });
    }

    /* ======================================================
       CABECERA
       ====================================================== */

    if (
      !nombre_lote ||
      !String(nombre_lote).trim()
    ) {
      return res.status(400).json({
        mensaje: 'El nombre del lote es obligatorio'
      });
    }

    nombre_lote = String(nombre_lote)
      .trim()
      .toUpperCase();

    if (nombre_lote.length > 150) {
      return res.status(400).json({
        mensaje:
          'El nombre del lote no puede superar 150 caracteres'
      });
    }

    proveedor_id = Number(proveedor_id);

    if (
      !Number.isInteger(proveedor_id) ||
      proveedor_id <= 0
    ) {
      return res.status(400).json({
        mensaje: 'El proveedor es obligatorio'
      });
    }

    fecha_compra = fecha_compra || fechaActual();

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(
        String(fecha_compra)
      )
    ) {
      return res.status(400).json({
        mensaje: 'La fecha de compra no es válida'
      });
    }

    if (!moneda_codigo) {
      return res.status(400).json({
        mensaje: 'La moneda es obligatoria'
      });
    }

    moneda_codigo = String(moneda_codigo)
      .trim()
      .toUpperCase();

    if (!['PEN', 'USD'].includes(moneda_codigo)) {
      return res.status(400).json({
        mensaje: 'La moneda debe ser PEN o USD'
      });
    }

    numero_documento = numero_documento
      ? String(numero_documento)
          .trim()
          .toUpperCase()
      : null;

    if (
      numero_documento &&
      numero_documento.length > 100
    ) {
      return res.status(400).json({
        mensaje:
          'El número de documento no puede superar 100 caracteres'
      });
    }

    descripcion = descripcion
      ? String(descripcion).trim()
      : null;

    if (
      descripcion &&
      descripcion.length > 400
    ) {
      return res.status(400).json({
        mensaje:
          'La descripción no puede superar 400 caracteres'
      });
    }

    /* ======================================================
       DETALLES
       ====================================================== */

    if (
      !Array.isArray(detalles) ||
      detalles.length === 0
    ) {
      return res.status(400).json({
        mensaje:
          'La compra debe tener al menos una materia prima'
      });
    }

    const combinaciones = new Set();
    let montoTotalValidacion = 0;

    detalles = detalles.map((item, index) => {
      const material_id =
        Number(item.material_id);

      const color_id =
        Number(item.color_id);

      const cantidad =
        Number(item.cantidad);

      const precio_unitario =
        Number(item.precio_unitario);

      if (
        !Number.isInteger(material_id) ||
        material_id <= 0
      ) {
        const error = new Error(
          `El item ${index + 1} debe tener material`
        );
        error.statusCode = 400;
        throw error;
      }

      if (
        !Number.isInteger(color_id) ||
        color_id <= 0
      ) {
        const error = new Error(
          `El item ${index + 1} debe tener color`
        );
        error.statusCode = 400;
        throw error;
      }

      if (
        !Number.isFinite(cantidad) ||
        cantidad <= 0
      ) {
        const error = new Error(
          `El item ${index + 1} debe tener cantidad mayor a 0`
        );
        error.statusCode = 400;
        throw error;
      }

      if (
        !Number.isFinite(precio_unitario) ||
        precio_unitario < 0
      ) {
        const error = new Error(
          `El item ${index + 1} debe tener precio unitario válido`
        );
        error.statusCode = 400;
        throw error;
      }

      const clave = `${material_id}-${color_id}`;

      if (combinaciones.has(clave)) {
        const error = new Error(
          `El item ${index + 1} repite la misma combinación de material y color`
        );
        error.statusCode = 400;
        throw error;
      }

      combinaciones.add(clave);

      let descripcion_item =
        item.descripcion_item
          ? String(item.descripcion_item)
              .trim()
              .toUpperCase()
          : null;

      if (
        descripcion_item &&
        descripcion_item.length > 300
      ) {
        const error = new Error(
          `La descripción del item ${index + 1} no puede superar 300 caracteres`
        );
        error.statusCode = 400;
        throw error;
      }

      montoTotalValidacion +=
        cantidad * precio_unitario;

      return {
        material_id,
        color_id,
        cantidad,
        precio_unitario,
        descripcion_item
      };
    });

    if (
      !Number.isFinite(montoTotalValidacion) ||
      montoTotalValidacion <= 0
    ) {
      return res.status(400).json({
        mensaje:
          'El monto total de la compra debe ser mayor a 0'
      });
    }

    /* ======================================================
       CREAR TODO EN UNA SOLA TRANSACCIÓN
       ====================================================== */

    const resultado =
      await crearCompraMateriaPrima({
        nombre_lote,
        proveedor_id,
        fecha_compra,
        numero_documento,
        moneda_codigo,
        descripcion,
        detalles,
        idempotency_key:
          idempotency_key.trim(),
        created_by_usuario_id:
          req.usuario.usuario_id
      });

    const status = resultado.reutilizada
      ? 200
      : 201;

    res.status(status).json({
      mensaje: resultado.reutilizada
        ? 'La compra ya había sido registrada; se devolvió el resultado existente'
        : 'Compra de materia prima registrada correctamente',
      reutilizada: resultado.reutilizada,
      compra: resultado.compra
    });

  } catch (error) {
    console.error(
      'Error registrar compra de materia prima:',
      error.message
    );

    if (error.statusCode) {
      return res.status(error.statusCode).json({
        mensaje: error.message
      });
    }

    res.status(500).json({
      mensaje:
        'Error interno al registrar compra de materia prima'
    });
  }
};


module.exports = {
  obtenerComprasMateriaPrima,
  obtenerCompraMateriaPrima,
  registrarCompraMateriaPrima
};
