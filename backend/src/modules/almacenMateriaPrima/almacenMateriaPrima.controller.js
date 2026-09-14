const {
  listarResumenMateriaPrima,
  listarLotesMateriaPrima,
  obtenerLoteMateriaPrimaPorId,
  listarMovimientosLote,
  obtenerIndicadoresAlmacenMateriaPrima
} = require('./almacenMateriaPrima.model');


const tiposMovimientoValidos = [
  'ENTRADA_COMPRA',
  'SALIDA_PRODUCCION',
  'SALIDA_MERMA',
  'AJUSTE_ENTRADA',
  'AJUSTE_SALIDA'
];


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


const numeroIdOpcional = (
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
    !Number.isInteger(numero) ||
    numero <= 0
  ) {
    return NaN;
  }

  return numero;
};


const obtenerResumen =
  async (
    req,
    res
  ) => {
    try {
      const {
        material_id,
        color_id,
        q,
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

      const materialId =
        numeroIdOpcional(
          material_id
        );

      const colorId =
        numeroIdOpcional(
          color_id
        );

      if (
        Number.isNaN(
          materialId
        ) ||
        Number.isNaN(
          colorId
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Los filtros de material o color no son válidos'
        });
      }

      const resultado =
        await listarResumenMateriaPrima({
          material_id:
            materialId,
          color_id:
            colorId,
          q:
            q
              ? String(q).trim()
              : null,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Resumen de materia prima obtenido correctamente',
        resumen:
          resultado.resumen,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error obtener resumen almacén MP:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener el resumen del almacén de materia prima'
      });
    }
  };


const obtenerLotes =
  async (
    req,
    res
  ) => {
    try {
      const {
        proveedor_id,
        estado = 'TODOS',
        q,
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

      const proveedorId =
        numeroIdOpcional(
          proveedor_id
        );

      if (
        Number.isNaN(
          proveedorId
        )
      ) {
        return res.status(400).json({
          mensaje:
            'El proveedor enviado no es válido'
        });
      }

      const estadoNormalizado =
        String(estado)
          .trim()
          .toUpperCase();

      if (
        ![
          'TODOS',
          'CON_STOCK',
          'AGOTADO'
        ].includes(
          estadoNormalizado
        )
      ) {
        return res.status(400).json({
          mensaje:
            'El estado debe ser TODOS, CON_STOCK o AGOTADO'
        });
      }

      const resultado =
        await listarLotesMateriaPrima({
          proveedor_id:
            proveedorId,
          estado:
            estadoNormalizado,
          q:
            q
              ? String(q).trim()
              : null,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Lotes de materia prima obtenidos correctamente',
        lotes:
          resultado.lotes,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error obtener lotes almacén MP:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener los lotes de materia prima'
      });
    }
  };


const obtenerLote =
  async (
    req,
    res
  ) => {
    try {
      const compraId =
        Number(
          req.params
            .compra_materia_prima_id
        );

      if (
        !Number.isInteger(
          compraId
        ) ||
        compraId <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de lote inválido'
        });
      }

      const lote =
        await obtenerLoteMateriaPrimaPorId(
          compraId
        );

      if (!lote) {
        return res.status(404).json({
          mensaje:
            'Lote de materia prima no encontrado'
        });
      }

      res.json({
        mensaje:
          'Lote de materia prima obtenido correctamente',
        lote
      });

    } catch (error) {
      console.error(
        'Error obtener lote almacén MP:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener el lote de materia prima'
      });
    }
  };


const obtenerMovimientosLote =
  async (
    req,
    res
  ) => {
    try {
      const compraId =
        Number(
          req.params
            .compra_materia_prima_id
        );

      if (
        !Number.isInteger(
          compraId
        ) ||
        compraId <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de lote inválido'
        });
      }

      const lote =
        await obtenerLoteMateriaPrimaPorId(
          compraId
        );

      if (!lote) {
        return res.status(404).json({
          mensaje:
            'Lote de materia prima no encontrado'
        });
      }

      const {
        tipo_movimiento,
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

      let tipoNormalizado =
        null;

      if (
        tipo_movimiento
      ) {
        tipoNormalizado =
          String(
            tipo_movimiento
          )
            .trim()
            .toUpperCase();

        if (
          !tiposMovimientoValidos
            .includes(
              tipoNormalizado
            )
        ) {
          return res.status(400).json({
            mensaje:
              'Tipo de movimiento no válido'
          });
        }
      }

      const resultado =
        await listarMovimientosLote({
          compra_materia_prima_id:
            compraId,
          tipo_movimiento:
            tipoNormalizado,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Movimientos del lote obtenidos correctamente',
        lote: {
          compra_materia_prima_id:
            lote
              .compra_materia_prima_id,
          nombre_lote:
            lote.nombre_lote
        },
        movimientos:
          resultado.movimientos,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error movimientos lote almacén MP:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener los movimientos del lote'
      });
    }
  };


const obtenerIndicadores =
  async (
    req,
    res
  ) => {
    try {
      const indicadores =
        await obtenerIndicadoresAlmacenMateriaPrima();

      res.json({
        mensaje:
          'Indicadores del almacén de materia prima obtenidos correctamente',
        indicadores
      });

    } catch (error) {
      console.error(
        'Error indicadores almacén MP:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener los indicadores del almacén de materia prima'
      });
    }
  };


module.exports = {
  obtenerResumen,
  obtenerLotes,
  obtenerLote,
  obtenerMovimientosLote,
  obtenerIndicadores
};
