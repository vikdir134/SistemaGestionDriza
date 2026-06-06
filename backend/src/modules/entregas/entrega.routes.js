const express = require('express');

const {
  obtenerPedidosParaEntrega,
  obtenerPedidoEntrega,
  registrarEntrega
} = require('./entrega.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const {
  permitirRoles
} = require('../../middlewares/role.middleware');

const router = express.Router();

router.get(
  '/pedidos',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN'),
  obtenerPedidosParaEntrega
);

router.get(
  '/pedidos/:pedido_id',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN'),
  obtenerPedidoEntrega
);

router.post(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'ALMACEN'),
  registrarEntrega
);

module.exports = router;