const express = require('express');

const {
  obtenerPedidos,
  obtenerPedido,
  registrarPedido,
  editarPedido
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
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN', 'FINANZAS'),
  obtenerPedidos
);

router.get(
  '/:pedido_id',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN', 'FINANZAS'),
  obtenerPedido
);

router.post(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS'),
  registrarPedido
);

router.put(
  '/:pedido_id',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS'),
  editarPedido
);

module.exports = router;