const express = require('express');

const {
  obtenerResumen,
  obtenerPresentaciones,
  obtenerPresentacion,
  obtenerMovimientos,
  obtenerIndicadores
} = require('./almacenProductoTerminado.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router =
  express.Router();


router.get(
  '/indicadores',
  verificarToken,
  obtenerIndicadores
);


router.get(
  '/resumen',
  verificarToken,
  obtenerResumen
);


router.get(
  '/presentaciones',
  verificarToken,
  obtenerPresentaciones
);


router.get(
  '/presentaciones/:stock_producto_terminado_id/movimientos',
  verificarToken,
  obtenerMovimientos
);


router.get(
  '/presentaciones/:stock_producto_terminado_id',
  verificarToken,
  obtenerPresentacion
);


module.exports =
  router;
