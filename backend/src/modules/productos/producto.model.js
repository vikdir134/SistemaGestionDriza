const { getConnection, sql } = require('../../config/db');

const listarProductos = async (q) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('q', sql.NVarChar(100), q ? `%${q}%` : null)
    .query(`
      SELECT
        p.producto_id,
        p.codigo_producto,

        p.tipo_producto_id,
        tp.nombre AS tipo_producto,

        p.medida_id,
        m.nombre AS medida,

        p.color_id,
        c.nombre AS color,

        p.material_id,
        mat.nombre AS material,

        p.peso_total_kg,
        p.presentacion,
        p.descripcion,
        p.activo,
        p.created_at
      FROM catalog.Producto p
      INNER JOIN catalog.TipoProducto tp
        ON p.tipo_producto_id = tp.tipo_producto_id
      INNER JOIN catalog.Medida m
        ON p.medida_id = m.medida_id
      INNER JOIN catalog.Color c
        ON p.color_id = c.color_id
      INNER JOIN catalog.Material mat
        ON p.material_id = mat.material_id
      WHERE p.activo = 1
        AND (
          @q IS NULL
          OR p.codigo_producto LIKE @q
          OR tp.nombre LIKE @q
          OR m.nombre LIKE @q
          OR c.nombre LIKE @q
          OR mat.nombre LIKE @q
          OR p.presentacion LIKE @q
          OR p.descripcion LIKE @q
        )
      ORDER BY p.created_at DESC;
    `);

  return result.recordset;
};

const obtenerProductoPorId = async (producto_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('producto_id', sql.Int, producto_id)
    .query(`
      SELECT
        p.producto_id,
        p.codigo_producto,

        p.tipo_producto_id,
        tp.nombre AS tipo_producto,

        p.medida_id,
        m.nombre AS medida,

        p.color_id,
        c.nombre AS color,

        p.material_id,
        mat.nombre AS material,

        p.peso_total_kg,
        p.presentacion,
        p.descripcion,
        p.activo,
        p.created_at
      FROM catalog.Producto p
      INNER JOIN catalog.TipoProducto tp
        ON p.tipo_producto_id = tp.tipo_producto_id
      INNER JOIN catalog.Medida m
        ON p.medida_id = m.medida_id
      INNER JOIN catalog.Color c
        ON p.color_id = c.color_id
      INNER JOIN catalog.Material mat
        ON p.material_id = mat.material_id
      WHERE p.producto_id = @producto_id
        AND p.activo = 1;
    `);

  return result.recordset[0];
};

const buscarProductoPorCodigo = async (codigo_producto) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('codigo_producto', sql.VarChar(50), codigo_producto)
    .query(`
      SELECT
        producto_id,
        codigo_producto,
        activo
      FROM catalog.Producto
      WHERE codigo_producto = @codigo_producto;
    `);

  return result.recordset[0];
};

const crearProducto = async ({
  codigo_producto,
  tipo_producto_id,
  medida_id,
  color_id,
  material_id,
  peso_total_kg,
  presentacion,
  descripcion,
  created_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('codigo_producto', sql.VarChar(50), codigo_producto || null)
    .input('tipo_producto_id', sql.Int, tipo_producto_id)
    .input('medida_id', sql.Int, medida_id)
    .input('color_id', sql.Int, color_id)
    .input('material_id', sql.Int, material_id)
    .input('peso_total_kg', sql.Decimal(18, 3), peso_total_kg || null)
    .input('presentacion', sql.NVarChar(150), presentacion || null)
    .input('descripcion', sql.NVarChar(300), descripcion || null)
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO catalog.Producto (
        codigo_producto,
        tipo_producto_id,
        medida_id,
        color_id,
        material_id,
        peso_total_kg,
        presentacion,
        descripcion,
        created_by_usuario_id
      )
      OUTPUT
        INSERTED.producto_id,
        INSERTED.codigo_producto,
        INSERTED.tipo_producto_id,
        INSERTED.medida_id,
        INSERTED.color_id,
        INSERTED.material_id,
        INSERTED.peso_total_kg,
        INSERTED.presentacion,
        INSERTED.descripcion,
        INSERTED.activo,
        INSERTED.created_at
      VALUES (
        @codigo_producto,
        @tipo_producto_id,
        @medida_id,
        @color_id,
        @material_id,
        @peso_total_kg,
        @presentacion,
        @descripcion,
        @created_by_usuario_id
      );
    `);

  return result.recordset[0];
};

const actualizarProducto = async ({
  producto_id,
  codigo_producto,
  tipo_producto_id,
  medida_id,
  color_id,
  material_id,
  peso_total_kg,
  presentacion,
  descripcion,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('producto_id', sql.Int, producto_id)
    .input('codigo_producto', sql.VarChar(50), codigo_producto || null)
    .input('tipo_producto_id', sql.Int, tipo_producto_id)
    .input('medida_id', sql.Int, medida_id)
    .input('color_id', sql.Int, color_id)
    .input('material_id', sql.Int, material_id)
    .input('peso_total_kg', sql.Decimal(18, 3), peso_total_kg || null)
    .input('presentacion', sql.NVarChar(150), presentacion || null)
    .input('descripcion', sql.NVarChar(300), descripcion || null)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE catalog.Producto
      SET
        codigo_producto = @codigo_producto,
        tipo_producto_id = @tipo_producto_id,
        medida_id = @medida_id,
        color_id = @color_id,
        material_id = @material_id,
        peso_total_kg = @peso_total_kg,
        presentacion = @presentacion,
        descripcion = @descripcion,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.producto_id,
        INSERTED.codigo_producto,
        INSERTED.tipo_producto_id,
        INSERTED.medida_id,
        INSERTED.color_id,
        INSERTED.material_id,
        INSERTED.peso_total_kg,
        INSERTED.presentacion,
        INSERTED.descripcion,
        INSERTED.activo,
        INSERTED.updated_at
      WHERE producto_id = @producto_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const eliminarProducto = async ({
  producto_id,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('producto_id', sql.Int, producto_id)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE catalog.Producto
      SET
        activo = 0,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.producto_id,
        INSERTED.codigo_producto,
        INSERTED.activo
      WHERE producto_id = @producto_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

module.exports = {
  listarProductos,
  obtenerProductoPorId,
  buscarProductoPorCodigo,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};