const express = require('express');

const {
  obtenerClientes,
  obtenerCliente,
  registrarCliente,
  editarCliente,
  darBajaCliente
} = require('./cliente.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const {
  permitirRoles
} = require('../../middlewares/role.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS'),
  obtenerClientes
);

router.get(
  '/:cliente_id',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS'),
  obtenerCliente
);

router.post(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS'),
  registrarCliente
);

router.put(
  '/:cliente_id',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS'),
  editarCliente
);

router.delete(
  '/:cliente_id',
  verificarToken,
  permitirRoles('ADMIN'),
  darBajaCliente
);

module.exports = router;