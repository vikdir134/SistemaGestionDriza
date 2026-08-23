const {
  listarTiposGasto,
  buscarTipoGastoPorNombre,
  crearTipoGasto,

  listarGastos,
  obtenerGastoPorId,

  crearGasto,
  actualizarGasto,
  eliminarGasto
} = require('./gasto.model');


const fechaActual = () => {
  return new Date()
    .toISOString()
    .slice(0, 10);
};


/* =========================================================
   NORMALIZACIÓN Y VALIDACIÓN
   ========================================================= */

const prepararDatosGasto = ({
  tipo_gasto_id,
  proveedor_id,
  fecha_gasto,
  monto,
  moneda_codigo,
  descripcion,
  comprobante,
  usarFechaActual = false
}) => {
  if (!tipo_gasto_id) {
    return {
      error: 'El tipo de gasto es obligatorio'
    };
  }

  const tipoGastoId = Number(tipo_gasto_id);

  if (
    !Number.isInteger(tipoGastoId) ||
    tipoGastoId <= 0
  ) {
    return {
      error: 'El tipo de gasto no es válido'
    };
  }


  const montoNumerico = Number(monto);

  if (
    !Number.isFinite(montoNumerico) ||
    montoNumerico <= 0
  ) {
    return {
      error: 'El monto debe ser mayor a 0'
    };
  }


  if (!moneda_codigo) {
    return {
      error: 'La moneda es obligatoria'
    };
  }

  const monedaNormalizada =
    String(moneda_codigo)
      .trim()
      .toUpperCase();

  if (
    !['PEN', 'USD'].includes(
      monedaNormalizada
    )
  ) {
    return {
      error: 'La moneda debe ser PEN o USD'
    };
  }


  let proveedorId = null;

  if (
    proveedor_id !== null &&
    proveedor_id !== undefined &&
    proveedor_id !== ''
  ) {
    proveedorId = Number(proveedor_id);

    if (
      !Number.isInteger(proveedorId) ||
      proveedorId <= 0
    ) {
      return {
        error: 'El proveedor no es válido'
      };
    }
  }


  let fechaNormalizada = fecha_gasto;

  if (!fechaNormalizada && usarFechaActual) {
    fechaNormalizada = fechaActual();
  }

  if (!fechaNormalizada) {
    return {
      error: 'La fecha del gasto es obligatoria'
    };
  }


  const descripcionNormalizada =
    descripcion &&
    String(descripcion).trim()
      ? String(descripcion).trim()
      : null;


  const comprobanteNormalizado =
    comprobante &&
    String(comprobante).trim()
      ? String(comprobante)
          .trim()
          .toUpperCase()
      : null;


  return {
    datos: {
      tipo_gasto_id: tipoGastoId,
      proveedor_id: proveedorId,
      fecha_gasto: fechaNormalizada,
      monto: montoNumerico,
      moneda_codigo:
        monedaNormalizada,
      descripcion:
        descripcionNormalizada,
      comprobante:
        comprobanteNormalizado
    }
  };
};


/* =========================================================
   TIPOS DE GASTO
   ========================================================= */

const obtenerTiposGasto = async (
  req,
  res
) => {
  try {
    const tipos =
      await listarTiposGasto();

    res.json({
      mensaje:
        'Tipos de gasto obtenidos correctamente',

      tipos
    });

  } catch (error) {
    console.error(
      'Error listar tipos de gasto:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al listar tipos de gasto'
    });
  }
};


const registrarTipoGasto = async (
  req,
  res
) => {
  try {
    let {
      nombre
    } = req.body;

    if (
      !nombre ||
      nombre.trim() === ''
    ) {
      return res.status(400).json({
        mensaje:
          'El nombre del tipo de gasto es obligatorio'
      });
    }

    nombre =
      nombre
        .trim()
        .toUpperCase();

    const existente =
      await buscarTipoGastoPorNombre(
        nombre
      );

    if (existente) {
      return res.status(409).json({
        mensaje:
          'Ya existe un tipo de gasto con ese nombre'
      });
    }

    const tipo =
      await crearTipoGasto({
        nombre,

        created_by_usuario_id:
          req.usuario.usuario_id
      });

    res.status(201).json({
      mensaje:
        'Tipo de gasto registrado correctamente',

      tipo
    });

  } catch (error) {
    console.error(
      'Error registrar tipo de gasto:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al registrar tipo de gasto'
    });
  }
};


/* =========================================================
   LISTAR GASTOS
   ========================================================= */

const obtenerGastos = async (
  req,
  res
) => {
  try {
    const {
      tipo_gasto_id,
      proveedor_id,
      moneda_codigo,
      q,
      page = 1,
      limit = 10
    } = req.query;


    const pagina = Math.max(
      1,
      Number(page) || 1
    );

    const limite = Math.min(
      100,
      Math.max(
        1,
        Number(limit) || 10
      )
    );


    const resultado =
      await listarGastos({
        tipo_gasto_id:
          tipo_gasto_id
            ? Number(tipo_gasto_id)
            : null,

        proveedor_id:
          proveedor_id
            ? Number(proveedor_id)
            : null,

        moneda_codigo:
          moneda_codigo
            ? String(moneda_codigo)
                .toUpperCase()
            : null,

        q:
          q
            ? String(q).trim()
            : null,

        page: pagina,
        limit: limite
      });


    res.json({
      mensaje:
        'Gastos obtenidos correctamente',

      gastos:
        resultado.gastos,

      paginacion:
        resultado.paginacion
    });

  } catch (error) {
    console.error(
      'Error listar gastos:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al listar gastos'
    });
  }
};


/* =========================================================
   OBTENER GASTO
   ========================================================= */

const obtenerGasto = async (
  req,
  res
) => {
  try {
    const gasto_id =
      Number(req.params.gasto_id);

    if (
      !Number.isInteger(gasto_id) ||
      gasto_id <= 0
    ) {
      return res.status(400).json({
        mensaje:
          'El ID del gasto no es válido'
      });
    }


    const gasto =
      await obtenerGastoPorId(
        gasto_id
      );


    if (!gasto) {
      return res.status(404).json({
        mensaje:
          'Gasto no encontrado'
      });
    }


    res.json({
      mensaje:
        'Gasto obtenido correctamente',

      gasto
    });

  } catch (error) {
    console.error(
      'Error obtener gasto:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al obtener gasto'
    });
  }
};


/* =========================================================
   REGISTRAR GASTO
   ========================================================= */

const registrarGasto = async (
  req,
  res
) => {
  try {
    const preparacion =
      prepararDatosGasto({
        ...req.body,
        usarFechaActual: true
      });


    if (preparacion.error) {
      return res.status(400).json({
        mensaje:
          preparacion.error
      });
    }


    const gasto =
      await crearGasto({
        ...preparacion.datos,

        created_by_usuario_id:
          req.usuario.usuario_id
      });


    res.status(201).json({
      mensaje:
        'Gasto registrado correctamente',

      gasto
    });

  } catch (error) {
    console.error(
      'Error registrar gasto:',
      error.message
    );


    if (error.number === 547) {
      return res.status(400).json({
        mensaje:
          'El tipo de gasto, proveedor o moneda seleccionados no son válidos'
      });
    }


    res.status(500).json({
      mensaje:
        'Error interno al registrar gasto'
    });
  }
};


/* =========================================================
   EDITAR GASTO
   ========================================================= */

const editarGasto = async (
  req,
  res
) => {
  try {
    const gasto_id =
      Number(req.params.gasto_id);


    if (
      !Number.isInteger(gasto_id) ||
      gasto_id <= 0
    ) {
      return res.status(400).json({
        mensaje:
          'El ID del gasto no es válido'
      });
    }


    /*
     * Primero comprobamos que siga activo.
     *
     * Un gasto eliminado lógicamente
     * ya no debe poder editarse.
     */
    const gastoActual =
      await obtenerGastoPorId(
        gasto_id
      );


    if (!gastoActual) {
      return res.status(404).json({
        mensaje:
          'Gasto no encontrado'
      });
    }


    const preparacion =
      prepararDatosGasto({
        ...req.body,
        usarFechaActual: false
      });


    if (preparacion.error) {
      return res.status(400).json({
        mensaje:
          preparacion.error
      });
    }


    const gasto =
      await actualizarGasto({
        gasto_id,

        ...preparacion.datos,

        updated_by_usuario_id:
          req.usuario.usuario_id
      });


    if (!gasto) {
      return res.status(404).json({
        mensaje:
          'Gasto no encontrado o ya eliminado'
      });
    }


    res.json({
      mensaje:
        'Gasto actualizado correctamente',

      gasto
    });

  } catch (error) {
    console.error(
      'Error editar gasto:',
      error.message
    );


    if (error.number === 547) {
      return res.status(400).json({
        mensaje:
          'El tipo de gasto, proveedor o moneda seleccionados no son válidos'
      });
    }


    res.status(500).json({
      mensaje:
        'Error interno al actualizar gasto'
    });
  }
};


/* =========================================================
   ELIMINAR GASTO
   BAJA LÓGICA
   ========================================================= */

const darBajaGasto = async (
  req,
  res
) => {
  try {
    const gasto_id =
      Number(req.params.gasto_id);


    if (
      !Number.isInteger(gasto_id) ||
      gasto_id <= 0
    ) {
      return res.status(400).json({
        mensaje:
          'El ID del gasto no es válido'
      });
    }


    const gasto =
      await eliminarGasto({
        gasto_id,

        updated_by_usuario_id:
          req.usuario.usuario_id
      });


    if (!gasto) {
      return res.status(404).json({
        mensaje:
          'Gasto no encontrado o ya eliminado'
      });
    }


    res.json({
      mensaje:
        'Gasto eliminado correctamente',

      gasto
    });

  } catch (error) {
    console.error(
      'Error eliminar gasto:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al eliminar gasto'
    });
  }
};


module.exports = {
  obtenerTiposGasto,
  registrarTipoGasto,

  obtenerGastos,
  obtenerGasto,

  registrarGasto,
  editarGasto,
  darBajaGasto
};