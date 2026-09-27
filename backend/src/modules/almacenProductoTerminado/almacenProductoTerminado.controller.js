const {
  listarResumenProductoTerminado,
  listarPresentacionesProductoTerminado,
  obtenerPresentacionPorId,
  listarMovimientosPresentacion,
  obtenerIndicadoresAlmacenProductoTerminado
} = require('./almacenProductoTerminado.model');


const tiposMovimientoValidos = [
  'ENTRADA_PRODUCCION',
  'SALIDA_ENTREGA',
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


const obtenerResumen =
  async (
    req,
    res
  ) => {
    try {
      const {
        q,
        tipo_producto_id,
        material_id,
        medida_id,
        color_id,
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

      const tipoId =
        idOpcional(
          tipo_producto_id
        );

      const materialId =
        idOpcional(
          material_id
        );

      const medidaId =
        idOpcional(
          medida_id
        );

      const colorId =
        idOpcional(
          color_id
        );

      if (
        [
          tipoId,
          materialId,
          medidaId,
          colorId
        ].some(
          Number.isNaN
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Uno de los filtros enviados no es válido'
        });
      }

      const resultado =
        await listarResumenProductoTerminado({
          q:
            q
              ? String(q).trim()
              : null,
          tipo_producto_id:
            tipoId,
          material_id:
            materialId,
          medida_id:
            medidaId,
          color_id:
            colorId,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Resumen del almacén de producto terminado obtenido correctamente',
        resumen:
          resultado.resumen,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error obtener resumen almacén PT:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener el resumen del almacén de producto terminado'
      });
    }
  };


const obtenerPresentaciones =
  async (
    req,
    res
  ) => {
    try {
      const {
        q,
        tipo_producto_id,
        material_id,
        medida_id,
        color_id,
        estado = 'TODOS',
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

      const tipoId =
        idOpcional(
          tipo_producto_id
        );

      const materialId =
        idOpcional(
          material_id
        );

      const medidaId =
        idOpcional(
          medida_id
        );

      const colorId =
        idOpcional(
          color_id
        );

      if (
        [
          tipoId,
          materialId,
          medidaId,
          colorId
        ].some(
          Number.isNaN
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Uno de los filtros enviados no es válido'
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
        await listarPresentacionesProductoTerminado({
          q:
            q
              ? String(q).trim()
              : null,
          tipo_producto_id:
            tipoId,
          material_id:
            materialId,
          medida_id:
            medidaId,
          color_id:
            colorId,
          estado:
            estadoNormalizado,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Presentaciones de producto terminado obtenidas correctamente',
        presentaciones:
          resultado.presentaciones,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error obtener presentaciones almacén PT:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener las presentaciones de producto terminado'
      });
    }
  };


const obtenerPresentacion =
  async (
    req,
    res
  ) => {
    try {
      const stockId =
        Number(
          req.params
            .stock_producto_terminado_id
        );

      if (
        !Number.isInteger(
          stockId
        ) ||
        stockId <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de stock inválido'
        });
      }

      const presentacion =
        await obtenerPresentacionPorId(
          stockId
        );

      if (!presentacion) {
        return res.status(404).json({
          mensaje:
            'Presentación de producto terminado no encontrada'
        });
      }

      res.json({
        mensaje:
          'Presentación de producto terminado obtenida correctamente',
        presentacion
      });

    } catch (error) {
      console.error(
        'Error obtener presentación almacén PT:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener la presentación de producto terminado'
      });
    }
  };


const obtenerMovimientos =
  async (
    req,
    res
  ) => {
    try {
      const stockId =
        Number(
          req.params
            .stock_producto_terminado_id
        );

      if (
        !Number.isInteger(
          stockId
        ) ||
        stockId <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de stock inválido'
        });
      }

      const presentacion =
        await obtenerPresentacionPorId(
          stockId
        );

      if (!presentacion) {
        return res.status(404).json({
          mensaje:
            'Presentación de producto terminado no encontrada'
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
        await listarMovimientosPresentacion({
          stock_producto_terminado_id:
            stockId,
          tipo_movimiento:
            tipoNormalizado,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Movimientos del producto terminado obtenidos correctamente',
        presentacion: {
          stock_producto_terminado_id:
            presentacion
              .stock_producto_terminado_id,
          producto_id:
            presentacion.producto_id,
          tipo_producto:
            presentacion
              .tipo_producto,
          material:
            presentacion.material,
          medida:
            presentacion.medida,
          color:
            presentacion.color,
          cantidad_presentacion:
            presentacion
              .cantidad_presentacion,
          unidad_presentacion:
            presentacion
              .unidad_presentacion
        },
        movimientos:
          resultado.movimientos,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error movimientos almacén PT:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener los movimientos de producto terminado'
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
        await obtenerIndicadoresAlmacenProductoTerminado();

      res.json({
        mensaje:
          'Indicadores del almacén de producto terminado obtenidos correctamente',
        indicadores
      });

    } catch (error) {
      console.error(
        'Error indicadores almacén PT:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener los indicadores del almacén de producto terminado'
      });
    }
  };


module.exports = {
  obtenerResumen,
  obtenerPresentaciones,
  obtenerPresentacion,
  obtenerMovimientos,
  obtenerIndicadores
};
