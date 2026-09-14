const express = require('express');

const {
  obtenerProducciones,
  obtenerProduccion,
  registrarProduccion
} = require('./produccion.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router =
  express.Router();


router.get(
  '/',
  verificarToken,
  obtenerProducciones
);


router.post(
  '/',
  verificarToken,
  registrarProduccion
);


router.get(
  '/:produccion_id',
  verificarToken,
  obtenerProduccion
);


module.exports =
  router;
