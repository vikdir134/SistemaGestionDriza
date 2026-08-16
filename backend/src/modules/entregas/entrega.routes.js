const express = require('express');

const {
  obtenerPedidosParaEntrega,
  obtenerPedidoEntrega,
  registrarEntrega
} = require('./entrega.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/pedidos',
  verificarToken,
  obtenerPedidosParaEntrega
);

router.get(
  '/pedidos/:pedido_id',
  verificarToken,
  obtenerPedidoEntrega
);

router.post(
  '/',
  verificarToken,
  registrarEntrega
);

module.exports = router;