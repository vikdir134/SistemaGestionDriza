const { getConnection, sql } = require('../../config/db');

const buscarUsuarioPorCorreo = async (correo) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('correo', sql.VarChar(150), correo)
    .query(`
      SELECT 
        usuario_id,
        nombre_completo,
        correo,
        password_hash,
        activo
      FROM auth.Usuario
      WHERE correo = @correo;
    `);

  return result.recordset[0];
};

const obtenerRolesPorUsuario = async (usuario_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('usuario_id', sql.Int, usuario_id)
    .query(`
      SELECT r.nombre
      FROM auth.UsuarioRol ur
      INNER JOIN auth.Rol r ON ur.rol_id = r.rol_id
      WHERE ur.usuario_id = @usuario_id
        AND r.activo = 1;
    `);

  return result.recordset.map((row) => row.nombre);
};

const crearUsuario = async ({
  nombre_completo,
  correo,
  password_hash,
  rol_id,
  created_by_usuario_id
}) => {
  const pool = await getConnection();

  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const requestUsuario = new sql.Request(transaction);

    const usuarioResult = await requestUsuario
      .input('nombre_completo', sql.NVarChar(150), nombre_completo)
      .input('correo', sql.VarChar(150), correo)
      .input('password_hash', sql.NVarChar(255), password_hash)
      .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
      .query(`
        INSERT INTO auth.Usuario (
          nombre_completo,
          correo,
          password_hash,
          created_by_usuario_id
        )
        OUTPUT INSERTED.usuario_id, INSERTED.nombre_completo, INSERTED.correo
        VALUES (
          @nombre_completo,
          @correo,
          @password_hash,
          @created_by_usuario_id
        );
      `);

    const nuevoUsuario = usuarioResult.recordset[0];

    const requestRol = new sql.Request(transaction);

    await requestRol
      .input('usuario_id', sql.Int, nuevoUsuario.usuario_id)
      .input('rol_id', sql.Int, rol_id)
      .query(`
        INSERT INTO auth.UsuarioRol (usuario_id, rol_id)
        VALUES (@usuario_id, @rol_id);
      `);

    await transaction.commit();

    return nuevoUsuario;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  buscarUsuarioPorCorreo,
  obtenerRolesPorUsuario,
  crearUsuario
};