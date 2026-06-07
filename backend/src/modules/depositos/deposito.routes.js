const express = require('express');

const {
  obtenerTiposDeposito,
  obtenerPedidosParaDeposito,
  obtenerPedidoDeposito,
  registrarDeposito
} = require('./deposito.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const {
  permitirRoles
} = require('../../middlewares/role.middleware');

const router = express.Router();

router.get(
  '/tipos',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'FINANZAS'),
  obtenerTiposDeposito
);

router.get(
  '/pedidos',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'FINANZAS'),
  obtenerPedidosParaDeposito
);

router.get(
  '/pedidos/:pedido_id',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'FINANZAS'),
  obtenerPedidoDeposito
);

router.post(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'FINANZAS'),
  registrarDeposito
);

module.exports = router;