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

const {
  permitirRoles
} = require('../../middlewares/role.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN'),
  obtenerProductos
);

router.get(
  '/:producto_id',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN'),
  obtenerProducto
);

router.post(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'ALMACEN'),
  registrarProducto
);

router.put(
  '/:producto_id',
  verificarToken,
  permitirRoles('ADMIN', 'ALMACEN'),
  editarProducto
);

router.delete(
  '/:producto_id',
  verificarToken,
  permitirRoles('ADMIN'),
  darBajaProducto
);

module.exports = router;