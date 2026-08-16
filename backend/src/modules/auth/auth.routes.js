const express = require('express');

const {
  login,
  obtenerRoles,
  crearUsuarioAdmin
} = require('./auth.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const {
  permitirRoles
} = require('../../middlewares/role.middleware');

const router = express.Router();

router.post('/login', login);

router.get(
  '/roles',
  verificarToken,
  permitirRoles('ADMIN'),
  obtenerRoles
);

router.post(
  '/usuarios',
  verificarToken,
  permitirRoles('ADMIN'),
  crearUsuarioAdmin
);

module.exports = router;