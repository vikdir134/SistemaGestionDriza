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

const router = express.Router();

router.get(
  '/tipos',
  verificarToken,
  obtenerTiposDeposito
);

router.get(
  '/pedidos',
  verificarToken,
  obtenerPedidosParaDeposito
);

router.get(
  '/pedidos/:pedido_id',
  verificarToken,
  obtenerPedidoDeposito
);

router.post(
  '/',
  verificarToken,
  registrarDeposito
);

module.exports = router;