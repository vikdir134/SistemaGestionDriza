const express = require('express');

const {
  obtenerProductos,
  obtenerProducto,
  registrarProducto,
  editarProducto,
  darBajaProducto
} = require('./producto.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  obtenerProductos
);

router.get(
  '/:producto_id',
  verificarToken,
  obtenerProducto
);

router.post(
  '/',
  verificarToken,
  registrarProducto
);

router.put(
  '/:producto_id',
  verificarToken,
  editarProducto
);

router.delete(
  '/:producto_id',
  verificarToken,
  darBajaProducto
);

module.exports = router;