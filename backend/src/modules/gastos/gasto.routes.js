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

const router = express.Router();

router.get(
  '/tipos',
  verificarToken,
  obtenerTiposGasto
);

router.post(
  '/tipos',
  verificarToken,
  registrarTipoGasto
);

router.get(
  '/',
  verificarToken,
  obtenerGastos
);

router.get(
  '/:gasto_id',
  verificarToken,
  obtenerGasto
);

router.post(
  '/',
  verificarToken,
  registrarGasto
);

module.exports = router;