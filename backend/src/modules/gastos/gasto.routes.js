const express = require('express');

const {
  obtenerTiposGasto,
  registrarTipoGasto,
  obtenerGastos,
  obtenerGasto,
  registrarGasto
} = require('./gasto.controller');

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
  permitirRoles('ADMIN', 'FINANZAS'),
  obtenerTiposGasto
);

router.post(
  '/tipos',
  verificarToken,
  permitirRoles('ADMIN', 'FINANZAS'),
  registrarTipoGasto
);

router.get(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'FINANZAS'),
  obtenerGastos
);

router.get(
  '/:gasto_id',
  verificarToken,
  permitirRoles('ADMIN', 'FINANZAS'),
  obtenerGasto
);

router.post(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'FINANZAS'),
  registrarGasto
);

module.exports = router;