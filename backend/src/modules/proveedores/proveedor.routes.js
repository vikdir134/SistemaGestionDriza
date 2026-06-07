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

const {
  permitirRoles
} = require('../../middlewares/role.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'COMPRAS', 'FINANZAS'),
  obtenerProveedores
);

router.get(
  '/:proveedor_id',
  verificarToken,
  permitirRoles('ADMIN', 'COMPRAS', 'FINANZAS'),
  obtenerProveedor
);

router.post(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'COMPRAS'),
  registrarProveedor
);

router.put(
  '/:proveedor_id',
  verificarToken,
  permitirRoles('ADMIN', 'COMPRAS'),
  editarProveedor
);

router.delete(
  '/:proveedor_id',
  verificarToken,
  permitirRoles('ADMIN'),
  darBajaProveedor
);

module.exports = router;