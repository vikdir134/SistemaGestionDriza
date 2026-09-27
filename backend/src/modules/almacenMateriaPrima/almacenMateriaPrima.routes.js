const express = require('express');

const {
  obtenerResumen,
  obtenerLotes,
  obtenerLote,
  obtenerMovimientosLote,
  obtenerIndicadores
} = require('./almacenMateriaPrima.controller');

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
  '/lotes',
  verificarToken,
  obtenerLotes
);


router.get(
  '/lotes/:compra_materia_prima_id/movimientos',
  verificarToken,
  obtenerMovimientosLote
);


router.get(
  '/lotes/:compra_materia_prima_id',
  verificarToken,
  obtenerLote
);


module.exports =
  router;
