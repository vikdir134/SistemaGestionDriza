const bcrypt = require('bcryptjs');
const generarToken = require('../../utils/generarToken');

const {
  buscarUsuarioPorCorreo,
  obtenerRolesPorUsuario,
  crearUsuario
} = require('./auth.model');

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        mensaje: 'Correo y contraseña son obligatorios'
      });
    }

    const usuario = await buscarUsuarioPorCorreo(correo);

    if (!usuario) {
      return res.status(401).json({
        mensaje: 'Credenciales inválidas'
      });
    }

    if (!usuario.activo) {
      return res.status(403).json({
        mensaje: 'El usuario está inactivo'
      });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password_hash);

    if (!passwordValido) {
      return res.status(401).json({
        mensaje: 'Credenciales inválidas'
      });
    }

    const roles = await obtenerRolesPorUsuario(usuario.usuario_id);

    const usuarioToken = {
      usuario_id: usuario.usuario_id,
      correo: usuario.correo,
      roles
    };

    const token = generarToken(usuarioToken);

    res.json({
      mensaje: 'Login correcto',
      token,
      usuario: {
        usuario_id: usuario.usuario_id,
        nombre_completo: usuario.nombre_completo,
        correo: usuario.correo,
        roles
      }
    });
  } catch (error) {
    console.error('Error login:', error.message);
    res.status(500).json({
      mensaje: 'Error interno al iniciar sesión'
    });
  }
};

const crearUsuarioAdmin = async (req, res) => {
  try {
    const {
      nombre_completo,
      correo,
      password,
      rol_id
    } = req.body;

    if (!nombre_completo || !correo || !password || !rol_id) {
      return res.status(400).json({
        mensaje: 'Nombre, correo, contraseña y rol son obligatorios'
      });
    }

    const usuarioExistente = await buscarUsuarioPorCorreo(correo);

    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: 'Ya existe un usuario con ese correo'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const nuevoUsuario = await crearUsuario({
      nombre_completo,
      correo,
      password_hash,
      rol_id,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuario: nuevoUsuario
    });
  } catch (error) {
    console.error('Error crear usuario:', error.message);
    res.status(500).json({
      mensaje: 'Error interno al crear usuario'
    });
  }
};

module.exports = {
  login,
  crearUsuarioAdmin
};