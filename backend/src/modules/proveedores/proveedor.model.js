const { getConnection, sql } = require('../../config/db');

const listarProveedores = async () => {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT
      proveedor_id,
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      activo,
      created_at
    FROM compras.Proveedor
    WHERE activo = 1
    ORDER BY created_at DESC;
  `);

  return result.recordset;
};

const obtenerProveedorPorId = async (proveedor_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('proveedor_id', sql.Int, proveedor_id)
    .query(`
      SELECT
        proveedor_id,
        ruc,
        razon_social,
        direccion,
        telefono,
        correo,
        activo,
        created_at
      FROM compras.Proveedor
      WHERE proveedor_id = @proveedor_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const buscarProveedorPorRuc = async (ruc) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('ruc', sql.VarChar(11), ruc)
    .query(`
      SELECT proveedor_id, ruc, razon_social
      FROM compras.Proveedor
      WHERE ruc = @ruc;
    `);

  return result.recordset[0];
};

const crearProveedor = async ({
  ruc,
  razon_social,
  direccion,
  telefono,
  correo,
  created_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('ruc', sql.VarChar(11), ruc)
    .input('razon_social', sql.NVarChar(200), razon_social)
    .input('direccion', sql.NVarChar(250), direccion || null)
    .input('telefono', sql.VarChar(30), telefono || null)
    .input('correo', sql.VarChar(150), correo || null)
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO compras.Proveedor (
        ruc,
        razon_social,
        direccion,
        telefono,
        correo,
        created_by_usuario_id
      )
      OUTPUT
        INSERTED.proveedor_id,
        INSERTED.ruc,
        INSERTED.razon_social,
        INSERTED.direccion,
        INSERTED.telefono,
        INSERTED.correo,
        INSERTED.created_at
      VALUES (
        @ruc,
        @razon_social,
        @direccion,
        @telefono,
        @correo,
        @created_by_usuario_id
      );
    `);

  return result.recordset[0];
};

const actualizarProveedor = async ({
  proveedor_id,
  razon_social,
  direccion,
  telefono,
  correo,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('proveedor_id', sql.Int, proveedor_id)
    .input('razon_social', sql.NVarChar(200), razon_social)
    .input('direccion', sql.NVarChar(250), direccion || null)
    .input('telefono', sql.VarChar(30), telefono || null)
    .input('correo', sql.VarChar(150), correo || null)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE compras.Proveedor
      SET
        razon_social = @razon_social,
        direccion = @direccion,
        telefono = @telefono,
        correo = @correo,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.proveedor_id,
        INSERTED.ruc,
        INSERTED.razon_social,
        INSERTED.direccion,
        INSERTED.telefono,
        INSERTED.correo,
        INSERTED.updated_at
      WHERE proveedor_id = @proveedor_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const eliminarProveedor = async ({
  proveedor_id,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('proveedor_id', sql.Int, proveedor_id)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE compras.Proveedor
      SET
        activo = 0,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.proveedor_id,
        INSERTED.ruc,
        INSERTED.razon_social,
        INSERTED.activo
      WHERE proveedor_id = @proveedor_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

module.exports = {
  listarProveedores,
  obtenerProveedorPorId,
  buscarProveedorPorRuc,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
};