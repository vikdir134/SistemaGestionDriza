const {
  listarProductosTerminados,
  obtenerProductoTerminadoPorId,
  crearProductoTerminado,
  listarComposicionesProducto,
  crearNuevaComposicionProducto,
  obtenerOpcionesProductosTerminados
} = require('./productoTerminado.model');


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
    !Number.isInteger(numero) ||
    numero <= 0
  ) {
    return NaN;
  }

  return numero;
};


const obtenerProductosTerminados =
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
        estado_composicion = 'TODOS',
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

      const estado =
        String(
          estado_composicion
        )
          .trim()
          .toUpperCase();

      if (
        ![
          'TODOS',
          'CONFIGURADO',
          'SIN_COMPOSICION'
        ].includes(
          estado
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Estado de composición inválido'
        });
      }

      const resultado =
        await listarProductosTerminados({
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
          estado_composicion:
            estado,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Productos terminados obtenidos correctamente',
        productos:
          resultado.productos,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error listar productos terminados:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al listar productos terminados'
      });
    }
  };


const obtenerProductoTerminado =
  async (
    req,
    res
  ) => {
    try {
      const producto_id =
        Number(
          req.params.producto_id
        );

      if (
        !Number.isInteger(
          producto_id
        ) ||
        producto_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de producto inválido'
        });
      }

      const producto =
        await obtenerProductoTerminadoPorId(
          producto_id
        );

      if (!producto) {
        return res.status(404).json({
          mensaje:
            'Producto terminado no encontrado'
        });
      }

      res.json({
        mensaje:
          'Producto terminado obtenido correctamente',
        producto
      });

    } catch (error) {
      console.error(
        'Error obtener producto terminado:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener el producto terminado'
      });
    }
  };


const registrarProductoTerminado =
  async (
    req,
    res
  ) => {
    try {
      let {
        tipo_producto_id,
        material_id,
        medida_id,
        color_id,
        descripcion
      } = req.body;

      tipo_producto_id =
        Number(
          tipo_producto_id
        );

      material_id =
        Number(
          material_id
        );

      medida_id =
        Number(
          medida_id
        );

      color_id =
        Number(
          color_id
        );

      if (
        !Number.isInteger(
          tipo_producto_id
        ) ||
        tipo_producto_id <= 0 ||
        !Number.isInteger(
          material_id
        ) ||
        material_id <= 0 ||
        !Number.isInteger(
          medida_id
        ) ||
        medida_id <= 0 ||
        !Number.isInteger(
          color_id
        ) ||
        color_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Tipo, material, medida y color son obligatorios'
        });
      }

      descripcion =
        descripcion
          ? String(
              descripcion
            ).trim()
          : null;

      if (
        descripcion &&
        descripcion.length > 300
      ) {
        return res.status(400).json({
          mensaje:
            'La descripción no puede superar 300 caracteres'
        });
      }

      const producto =
        await crearProductoTerminado({
          tipo_producto_id,
          material_id,
          medida_id,
          color_id,
          descripcion,
          created_by_usuario_id:
            req.usuario.usuario_id
        });

      res.status(201).json({
        mensaje:
          'Producto terminado registrado correctamente',
        producto
      });

    } catch (error) {
      console.error(
        'Error registrar producto terminado:',
        error.message
      );

      if (error.statusCode) {
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
          'Error interno al registrar el producto terminado'
      });
    }
  };


const obtenerComposiciones =
  async (
    req,
    res
  ) => {
    try {
      const producto_id =
        Number(
          req.params.producto_id
        );

      if (
        !Number.isInteger(
          producto_id
        ) ||
        producto_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de producto inválido'
        });
      }

      const producto =
        await obtenerProductoTerminadoPorId(
          producto_id
        );

      if (!producto) {
        return res.status(404).json({
          mensaje:
            'Producto terminado no encontrado'
        });
      }

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
        await listarComposicionesProducto({
          producto_id,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Historial de composiciones obtenido correctamente',
        producto,
        composiciones:
          resultado.composiciones,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error obtener composiciones:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener las composiciones'
      });
    }
  };


const registrarNuevaComposicion =
  async (
    req,
    res
  ) => {
    try {
      const producto_id =
        Number(
          req.params.producto_id
        );

      if (
        !Number.isInteger(
          producto_id
        ) ||
        producto_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de producto inválido'
        });
      }

      let {
        observacion,
        detalles
      } = req.body;

      if (
        !Array.isArray(
          detalles
        ) ||
        detalles.length === 0
      ) {
        return res.status(400).json({
          mensaje:
            'La composición debe tener al menos una materia prima'
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
        observacion.length > 400
      ) {
        return res.status(400).json({
          mensaje:
            'La observación no puede superar 400 caracteres'
        });
      }

      const ingredientes =
        new Set();

      let total =
        0;

      detalles =
        detalles.map(
          (
            item,
            index
          ) => {
            const material_id =
              Number(
                item.material_id
              );

            const color_id =
              Number(
                item.color_id
              );

            const porcentaje =
              Number(
                item.porcentaje
              );

            if (
              !Number.isInteger(
                material_id
              ) ||
              material_id <= 0
            ) {
              const error =
                new Error(
                  `El componente ${index + 1} debe tener material`
                );

              error.statusCode =
                400;

              throw error;
            }

            if (
              !Number.isInteger(
                color_id
              ) ||
              color_id <= 0
            ) {
              const error =
                new Error(
                  `El componente ${index + 1} debe tener color`
                );

              error.statusCode =
                400;

              throw error;
            }

            if (
              !Number.isFinite(
                porcentaje
              ) ||
              porcentaje <= 0 ||
              porcentaje > 100
            ) {
              const error =
                new Error(
                  `El porcentaje del componente ${index + 1} debe ser mayor a 0 y menor o igual a 100`
                );

              error.statusCode =
                400;

              throw error;
            }

            const clave =
              `${material_id}-${color_id}`;

            if (
              ingredientes.has(
                clave
              )
            ) {
              const error =
                new Error(
                  `El componente ${index + 1} repite la misma materia prima y color`
                );

              error.statusCode =
                400;

              throw error;
            }

            ingredientes.add(
              clave
            );

            const porcentajeNormalizado =
              Number(
                porcentaje.toFixed(
                  6
                )
              );

            total +=
              porcentajeNormalizado;

            return {
              material_id,
              color_id,
              porcentaje:
                porcentajeNormalizado
            };
          }
        );

      const totalNormalizado =
        Number(
          total.toFixed(
            6
          )
        );

      if (
        Math.abs(
          totalNormalizado -
          100
        ) > 0.000001
      ) {
        return res.status(400).json({
          mensaje:
            `La composición debe sumar exactamente 100%. Actualmente suma ${totalNormalizado}%`
        });
      }

      const composicion =
        await crearNuevaComposicionProducto({
          producto_id,
          observacion,
          detalles,
          created_by_usuario_id:
            req.usuario.usuario_id
        });

      res.status(201).json({
        mensaje:
          'Nueva versión de composición publicada correctamente',
        composicion
      });

    } catch (error) {
      console.error(
        'Error registrar composición:',
        error.message
      );

      if (error.statusCode) {
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
          error.number ===
            50220
            ? 'La composición debe sumar exactamente 100%'
            : 'Error interno al registrar la composición'
      });
    }
  };


const obtenerOpciones =
  async (
    req,
    res
  ) => {
    try {
      const {
        tipo_producto_id,
        material_id,
        medida_id,
        color_id
      } = req.query;

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

      const opciones =
        await obtenerOpcionesProductosTerminados({
          tipo_producto_id:
            tipoId,
          material_id:
            materialId,
          medida_id:
            medidaId,
          color_id:
            colorId
        });

      res.json({
        mensaje:
          'Opciones de productos terminados obtenidas correctamente',
        ...opciones
      });

    } catch (error) {
      console.error(
        'Error opciones productos terminados:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener opciones de productos terminados'
      });
    }
  };


module.exports = {
  obtenerProductosTerminados,
  obtenerProductoTerminado,
  registrarProductoTerminado,
  obtenerComposiciones,
  registrarNuevaComposicion,
  obtenerOpciones
};
