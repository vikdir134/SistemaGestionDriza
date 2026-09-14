const {
  listarMermas,
  listarDisponibilidad,
  obtenerMermaCompletaPorId,
  crearMermaFIFO
} = require('./merma.model');


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


const idOpcional = (
  valor
) => {
  if (
    valor === undefined ||
    valor === null ||
    valor === ''
  ) {
    return null;
  }

  const numero =
    Number(valor);

  if (
    !Number.isInteger(
      numero
    ) ||
    numero <= 0
  ) {
    return NaN;
  }

  return numero;
};


const fechaActual = () => {
  return new Date()
    .toISOString()
    .slice(0, 10);
};


const listar =
  async (
    req,
    res
  ) => {
    try {
      const {
        q,
        fecha_desde,
        fecha_hasta,
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
        await listarMermas({
          q:
            q
              ? String(q).trim()
              : null,

          fecha_desde:
            fecha_desde || null,

          fecha_hasta:
            fecha_hasta || null,

          page:
            paginacion.page,

          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Mermas obtenidas correctamente',
        mermas:
          resultado.mermas,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error listar mermas:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al listar las mermas'
      });
    }
  };


const disponibilidad =
  async (
    req,
    res
  ) => {
    try {
      const material_id =
        idOpcional(
          req.query.material_id
        );

      const color_id =
        idOpcional(
          req.query.color_id
        );

      if (
        Number.isNaN(
          material_id
        ) ||
        Number.isNaN(
          color_id
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Material o color inválido'
        });
      }

      const items =
        await listarDisponibilidad({
          material_id,
          color_id
        });

      res.json({
        mensaje:
          'Disponibilidad de materia prima obtenida correctamente',
        items
      });

    } catch (error) {
      console.error(
        'Error disponibilidad merma:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al consultar la disponibilidad de materia prima'
      });
    }
  };


const obtenerPorId =
  async (
    req,
    res
  ) => {
    try {
      const merma_id =
        Number(
          req.params.merma_id
        );

      if (
        !Number.isInteger(
          merma_id
        ) ||
        merma_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de merma inválido'
        });
      }

      const resultado =
        await obtenerMermaCompletaPorId(
          merma_id
        );

      if (!resultado) {
        return res.status(404).json({
          mensaje:
            'Merma no encontrada'
        });
      }

      res.json({
        mensaje:
          'Merma obtenida correctamente',
        merma:
          resultado.merma,
        detalles:
          resultado.detalles
      });

    } catch (error) {
      console.error(
        'Error obtener merma:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener la merma'
      });
    }
  };


const registrar =
  async (
    req,
    res
  ) => {
    try {
      let {
        fecha_merma,
        observacion,
        detalles
      } = req.body;


      fecha_merma =
        fecha_merma ||
        fechaActual();


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
            'La merma debe tener al menos una materia prima'
        });
      }


      for (
        const [
          index,
          item
        ]
        of detalles.entries()
      ) {
        const cantidad =
          Number(
            item.cantidad
          );

        if (
          !Number.isFinite(
            cantidad
          ) ||
          cantidad <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `La cantidad del producto ${index + 1} debe ser mayor a 0`
          });
        }

        item.cantidad =
          Number(
            cantidad.toFixed(3)
          );

        item.observacion =
          item.observacion
            ? String(
                item.observacion
              ).trim()
            : null;

        if (
          item.observacion &&
          item.observacion.length > 300
        ) {
          return res.status(400).json({
            mensaje:
              `La observación del producto ${index + 1} no puede superar 300 caracteres`
          });
        }
      }


      const idempotency_key =
        req.get(
          'Idempotency-Key'
        )
          ? String(
              req.get(
                'Idempotency-Key'
              )
            ).trim()
          : null;


      if (
        idempotency_key &&
        idempotency_key.length > 100
      ) {
        return res.status(400).json({
          mensaje:
            'Idempotency-Key no puede superar 100 caracteres'
        });
      }


      const resultado =
        await crearMermaFIFO({
          fecha_merma,
          observacion,
          detalles,
          idempotency_key,

          created_by_usuario_id:
            req.usuario.usuario_id
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
              ? 'La merma ya había sido registrada; se devolvió el resultado existente'
              : 'Merma registrada correctamente',

          reutilizada:
            resultado.reutilizada,

          merma:
            resultado.merma,

          detalles:
            resultado.detalles
        });


    } catch (error) {
      console.error(
        'Error registrar merma:',
        error.message
      );

      if (
        error.statusCode
      ) {
        return res
          .status(
            error.statusCode
          )
          .json({
            mensaje:
              error.message
          });
      }

      res.status(500).json({
        mensaje:
          'Error interno al registrar la merma'
      });
    }
  };


module.exports = {
  listar,
  disponibilidad,
  obtenerPorId,
  registrar
};
