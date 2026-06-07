const express = require('express');

const {
  obtenerCompras,
  obtenerCompra,
  registrarCompra
} = require('./compra.controller');

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
  obtenerCompras
);

router.get(
  '/:compra_id',
  verificarToken,
  permitirRoles('ADMIN', 'COMPRAS', 'FINANZAS'),
  obtenerCompra
);

router.post(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'COMPRAS'),
  registrarCompra
);

module.exports = router;