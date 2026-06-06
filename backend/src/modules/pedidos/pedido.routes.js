const express = require('express');

const {
  obtenerPedidos,
  obtenerPedido,
  registrarPedido
} = require('./pedido.controller');

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
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN'),
  obtenerPedidos
);

router.get(
  '/:pedido_id',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN'),
  obtenerPedido
);

router.post(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS'),
  registrarPedido
);

module.exports = router;