const express = require('express');

const {
  obtenerProveedores,
  obtenerProveedor,
  registrarProveedor,
  editarProveedor,
  darBajaProveedor
} = require('./proveedor.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  obtenerProveedores
);

router.get(
  '/:proveedor_id',
  verificarToken,
  obtenerProveedor
);

router.post(
  '/',
  verificarToken,
  registrarProveedor
);

router.put(
  '/:proveedor_id',
  verificarToken,
  editarProveedor
);

router.delete(
  '/:proveedor_id',
  verificarToken,
  darBajaProveedor
);

module.exports = router;