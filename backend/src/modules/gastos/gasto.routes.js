const express = require('express');

const {
  obtenerTiposGasto,
  registrarTipoGasto,

  obtenerGastos,
  obtenerGasto,

  registrarGasto,
  editarGasto,
  darBajaGasto
} = require('./gasto.controller');


const {
  verificarToken
} = require(
  '../../middlewares/auth.middleware'
);


const router = express.Router();


/* =========================================================
   TIPOS DE GASTO
   ========================================================= */

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


/* =========================================================
   GASTOS
   ========================================================= */

router.get(
  '/',
  verificarToken,
  obtenerGastos
);


router.post(
  '/',
  verificarToken,
  registrarGasto
);


router.get(
  '/:gasto_id',
  verificarToken,
  obtenerGasto
);


router.put(
  '/:gasto_id',
  verificarToken,
  editarGasto
);


router.delete(
  '/:gasto_id',
  verificarToken,
  darBajaGasto
);


module.exports = router;