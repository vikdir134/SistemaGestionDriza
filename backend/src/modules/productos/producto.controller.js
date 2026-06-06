const {
  listarProductos,
  obtenerProductoPorId,
  buscarProductoPorCodigo,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('./producto.model');

const obtenerProductos = async (req, res) => {
  try {
    const { q } = req.query;

    const productos = await listarProductos(q);

    res.json({
      mensaje: 'Productos obtenidos correctamente',
      productos
    });

  } catch (error) {
    console.error('Error listar productos:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar productos'
    });
  }
};

const obtenerProducto = async (req, res) => {
  try {
    const { producto_id } = req.params;

    const producto = await obtenerProductoPorId(producto_id);

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado'
      });
    }

    res.json({
      mensaje: 'Producto obtenido correctamente',
      producto
    });

  } catch (error) {
    console.error('Error obtener producto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener producto'
    });
  }
};

const registrarProducto = async (req, res) => {
  try {
    let {
      codigo_producto,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      peso_total_kg,
      presentacion,
      descripcion
    } = req.body;

    if (!tipo_producto_id || !medida_id || !color_id || !material_id) {
      return res.status(400).json({
        mensaje: 'Tipo, medida, color y material son obligatorios'
      });
    }

    if (peso_total_kg && Number(peso_total_kg) <= 0) {
      return res.status(400).json({
        mensaje: 'El peso total debe ser mayor a 0'
      });
    }

    codigo_producto = codigo_producto
      ? codigo_producto.trim().toUpperCase()
      : null;

    presentacion = presentacion
      ? presentacion.trim().toUpperCase()
      : null;

    descripcion = descripcion
      ? descripcion.trim().toUpperCase()
      : null;

    if (codigo_producto) {
      const productoExistente = await buscarProductoPorCodigo(codigo_producto);

      if (productoExistente) {
        return res.status(409).json({
          mensaje: 'Ya existe un producto con ese código'
        });
      }
    }

    const producto = await crearProducto({
      codigo_producto,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      peso_total_kg,
      presentacion,
      descripcion,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Producto registrado correctamente',
      producto
    });

  } catch (error) {
    console.error('Error registrar producto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar producto'
    });
  }
};

const editarProducto = async (req, res) => {
  try {
    const { producto_id } = req.params;

    let {
      codigo_producto,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      peso_total_kg,
      presentacion,
      descripcion
    } = req.body;

    if (!tipo_producto_id || !medida_id || !color_id || !material_id) {
      return res.status(400).json({
        mensaje: 'Tipo, medida, color y material son obligatorios'
      });
    }

    if (peso_total_kg && Number(peso_total_kg) <= 0) {
      return res.status(400).json({
        mensaje: 'El peso total debe ser mayor a 0'
      });
    }

    codigo_producto = codigo_producto
      ? codigo_producto.trim().toUpperCase()
      : null;

    presentacion = presentacion
      ? presentacion.trim().toUpperCase()
      : null;

    descripcion = descripcion
      ? descripcion.trim().toUpperCase()
      : null;

    if (codigo_producto) {
      const productoExistente = await buscarProductoPorCodigo(codigo_producto);

      if (
        productoExistente &&
        Number(productoExistente.producto_id) !== Number(producto_id)
      ) {
        return res.status(409).json({
          mensaje: 'Ya existe otro producto con ese código'
        });
      }
    }

    const producto = await actualizarProducto({
      producto_id,
      codigo_producto,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      peso_total_kg,
      presentacion,
      descripcion,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado'
      });
    }

    res.json({
      mensaje: 'Producto actualizado correctamente',
      producto
    });

  } catch (error) {
    console.error('Error editar producto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al editar producto'
    });
  }
};

const darBajaProducto = async (req, res) => {
  try {
    const { producto_id } = req.params;

    const producto = await eliminarProducto({
      producto_id,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado'
      });
    }

    res.json({
      mensaje: 'Producto dado de baja correctamente',
      producto
    });

  } catch (error) {
    console.error('Error eliminar producto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al dar de baja producto'
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  registrarProducto,
  editarProducto,
  darBajaProducto
};