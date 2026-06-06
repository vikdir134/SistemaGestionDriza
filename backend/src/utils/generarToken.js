const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign(
    {
      usuario_id: usuario.usuario_id,
      correo: usuario.correo,
      roles: usuario.roles
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h'
    }
  );
};

module.exports = generarToken;