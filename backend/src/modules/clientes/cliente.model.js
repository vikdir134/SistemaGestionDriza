const { getConnection, sql } = require('../../config/db');

const listarClientes = async () => {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT
      cliente_id,
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      activo,
      created_at
    FROM crm.Cliente
    WHERE activo = 1
    ORDER BY created_at DESC;
  `);

  return result.recordset;
};

const obtenerClientePorId = async (cliente_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('cliente_id', sql.Int, cliente_id)
    .query(`
      SELECT
        cliente_id,
        ruc,
        razon_social,
        direccion,
        telefono,
        correo,
        activo,
        created_at
      FROM crm.Cliente
      WHERE cliente_id = @cliente_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const buscarClientePorRuc = async (ruc) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('ruc', sql.VarChar(11), ruc)
    .query(`
      SELECT cliente_id, ruc, razon_social
      FROM crm.Cliente
      WHERE ruc = @ruc;
    `);

  return result.recordset[0];
};

const crearCliente = async ({
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
      INSERT INTO crm.Cliente (
        ruc,
        razon_social,
        direccion,
        telefono,
        correo,
        created_by_usuario_id
      )
      OUTPUT
        INSERTED.cliente_id,
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

const actualizarCliente = async ({
  cliente_id,
  razon_social,
  direccion,
  telefono,
  correo,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('cliente_id', sql.Int, cliente_id)
    .input('razon_social', sql.NVarChar(200), razon_social)
    .input('direccion', sql.NVarChar(250), direccion || null)
    .input('telefono', sql.VarChar(30), telefono || null)
    .input('correo', sql.VarChar(150), correo || null)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE crm.Cliente
      SET
        razon_social = @razon_social,
        direccion = @direccion,
        telefono = @telefono,
        correo = @correo,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.cliente_id,
        INSERTED.ruc,
        INSERTED.razon_social,
        INSERTED.direccion,
        INSERTED.telefono,
        INSERTED.correo,
        INSERTED.updated_at
      WHERE cliente_id = @cliente_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const eliminarCliente = async ({
  cliente_id,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('cliente_id', sql.Int, cliente_id)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE crm.Cliente
      SET
        activo = 0,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.cliente_id,
        INSERTED.ruc,
        INSERTED.razon_social,
        INSERTED.activo
      WHERE cliente_id = @cliente_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

module.exports = {
  listarClientes,
  obtenerClientePorId,
  buscarClientePorRuc,
  crearCliente,
  actualizarCliente,
  eliminarCliente
};