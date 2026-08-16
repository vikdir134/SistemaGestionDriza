const express = require('express');

const {
  obtenerCompras,
  obtenerCompra,
  registrarCompra
} = require('./compra.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  obtenerCompras
);

router.get(
  '/:compra_id',
  verificarToken,
  obtenerCompra
);

router.post(
  '/',
  verificarToken,
  registrarCompra
);

module.exports = router;