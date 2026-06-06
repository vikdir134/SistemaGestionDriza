const express = require('express');

const {
  login,
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

router.post(
  '/usuarios',
  verificarToken,
  permitirRoles('ADMIN'),
  crearUsuarioAdmin
);

module.exports = router;