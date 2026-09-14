const {
  listarProducciones,
  obtenerProduccionPorId,
  crearProduccion
} = require('./produccion.model');


const validarPaginacion = (
  page,
  limit
) => {
  const pageNumero =
    Number(page);

  const limitNumero =
    Number(limit);

  if (
    !Number.isInteger(
      pageNumero
    ) ||
    pageNumero < 1 ||
    !Number.isInteger(
      limitNumero
    ) ||
    limitNumero < 1 ||
    limitNumero > 100
  ) {
    return null;
  }

  return {
    page: pageNumero,
    limit: limitNumero
  };
};


const normalizarDecimal3 = (
  valor
) => {
  const numero =
    Number(valor);

  if (
    !Number.isFinite(
      numero
    )
  ) {
    return null;
  }

  const redondeado =
    Number(
      numero.toFixed(3)
    );

  /*
   * La BD almacena 3 decimales.
   * No truncamos silenciosamente entradas con más precisión.
   */
  if (
    Math.abs(
      numero - redondeado
    ) > 0.0000005
  ) {
    return null;
  }

  return redondeado;
};


const esMultiploPresentacion = (
  cantidad,
  presentacion
) => {
  const cantidadMil =
    Math.round(
      cantidad * 1000
    );

  const presentacionMil =
    Math.round(
      presentacion * 1000
    );

  if (
    presentacionMil <= 0
  ) {
    return false;
  }

  return (
    cantidadMil %
    presentacionMil
  ) === 0;
};


const obtenerProducciones =
  async (
    req,
    res
  ) => {
    try {
      const {
        page = 1,
        limit = 10
      } = req.query;

      const paginacion =
        validarPaginacion(
          page,
          limit
        );

      if (!paginacion) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      const resultado =
        await listarProducciones({
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Producciones obtenidas correctamente',
        producciones:
          resultado.producciones,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error listar producciones:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al listar las producciones'
      });
    }
  };


const obtenerProduccion =
  async (
    req,
    res
  ) => {
    try {
      const produccion_id =
        Number(
          req.params.produccion_id
        );

      if (
        !Number.isInteger(
          produccion_id
        ) ||
        produccion_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de producción inválido'
        });
      }

      const produccion =
        await obtenerProduccionPorId(
          produccion_id
        );

      if (!produccion) {
        return res.status(404).json({
          mensaje:
            'Producción no encontrada'
        });
      }

      res.json({
        mensaje:
          'Producción obtenida correctamente',
        produccion
      });

    } catch (error) {
      console.error(
        'Error obtener producción:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener la producción'
      });
    }
  };


const registrarProduccion =
  async (
    req,
    res
  ) => {
    try {
      const idempotencyKey =
        req.get(
          'Idempotency-Key'
        )?.trim();

      if (!idempotencyKey) {
        return res.status(400).json({
          mensaje:
            'Debe enviar el header Idempotency-Key'
        });
      }

      if (
        idempotencyKey.length > 100
      ) {
        return res.status(400).json({
          mensaje:
            'Idempotency-Key no puede superar 100 caracteres'
        });
      }

      let {
        fecha_produccion,
        observacion,
        detalles
      } = req.body;

      if (
        typeof fecha_produccion !==
          'string' ||
        !/^\d{4}-\d{2}-\d{2}$/
          .test(
            fecha_produccion
          )
      ) {
        return res.status(400).json({
          mensaje:
            'La fecha de producción es obligatoria y debe tener formato YYYY-MM-DD'
        });
      }

      const fecha =
        new Date(
          `${fecha_produccion}T00:00:00Z`
        );

      if (
        Number.isNaN(
          fecha.getTime()
        ) ||
        fecha
          .toISOString()
          .slice(0, 10) !==
          fecha_produccion
      ) {
        return res.status(400).json({
          mensaje:
            'La fecha de producción no es válida'
        });
      }

      observacion =
        observacion
          ? String(
              observacion
            ).trim()
          : null;

      if (
        observacion &&
        observacion.length > 500
      ) {
        return res.status(400).json({
          mensaje:
            'La observación no puede superar 500 caracteres'
        });
      }

      if (
        !Array.isArray(
          detalles
        ) ||
        detalles.length === 0
      ) {
        return res.status(400).json({
          mensaje:
            'La producción debe tener al menos un producto'
        });
      }

      if (
        detalles.length > 50
      ) {
        return res.status(400).json({
          mensaje:
            'Una producción no puede tener más de 50 productos'
        });
      }

      const detallesNormalizados = [];

      for (
        let i = 0;
        i < detalles.length;
        i++
      ) {
        const item =
          detalles[i];

        const producto_id =
          Number(
            item.producto_id
          );

        if (
          !Number.isInteger(
            producto_id
          ) ||
          producto_id <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `El producto ${i + 1} no es válido`
          });
        }

        const cantidad_producida =
          normalizarDecimal3(
            item.cantidad_producida
          );

        if (
          cantidad_producida === null ||
          cantidad_producida <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `La cantidad producida del producto ${i + 1} debe ser mayor a 0 y tener máximo 3 decimales`
          });
        }

        const cantidad_presentacion =
          normalizarDecimal3(
            item.cantidad_presentacion
          );

        if (
          cantidad_presentacion === null ||
          cantidad_presentacion <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `La presentación del producto ${i + 1} debe ser mayor a 0 y tener máximo 3 decimales`
          });
        }

        const unidad_presentacion_id =
          Number(
            item.unidad_presentacion_id
          );

        if (
          !Number.isInteger(
            unidad_presentacion_id
          ) ||
          unidad_presentacion_id <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `El producto ${i + 1} debe tener una unidad de presentación`
          });
        }

        /*
         * Evitamos crear stock imposible de entregar:
         * si la presentación es 50, producir 125 dejaría
         * 25 KG fuera de una presentación completa.
         */
        if (
          !esMultiploPresentacion(
            cantidad_producida,
            cantidad_presentacion
          )
        ) {
          return res.status(400).json({
            mensaje:
              `La cantidad producida del producto ${i + 1} debe ser múltiplo de su presentación (${cantidad_presentacion})`
          });
        }

        let observacionDetalle =
          item.observacion
            ? String(
                item.observacion
              ).trim()
            : null;

        if (
          observacionDetalle &&
          observacionDetalle.length > 300
        ) {
          return res.status(400).json({
            mensaje:
              `La observación del producto ${i + 1} no puede superar 300 caracteres`
          });
        }

        detallesNormalizados.push({
          producto_id,
          cantidad_producida,
          cantidad_presentacion,
          unidad_presentacion_id,
          observacion:
            observacionDetalle
        });
      }

      const resultado =
        await crearProduccion({
          fecha_produccion,
          observacion,
          detalles:
            detallesNormalizados,
          created_by_usuario_id:
            req.usuario.usuario_id,
          idempotency_key:
            idempotencyKey
        });

      return res
        .status(
          resultado.reutilizada
            ? 200
            : 201
        )
        .json({
          mensaje:
            resultado.reutilizada
              ? 'La producción ya había sido registrada; se devolvió el resultado existente'
              : 'Producción registrada correctamente',
          reutilizada:
            resultado.reutilizada,
          produccion:
            resultado.produccion
        });

    } catch (error) {
      console.error(
        'Error registrar producción:',
        error.message
      );

      if (error.statusCode) {
        return res
          .status(
            error.statusCode
          )
          .json({
            mensaje:
              error.message,
            codigo:
              error.codigo ||
              undefined
          });
      }

      return res.status(500).json({
        mensaje:
          'Error interno al registrar la producción'
      });
    }
  };


module.exports = {
  obtenerProducciones,
  obtenerProduccion,
  registrarProduccion
};
