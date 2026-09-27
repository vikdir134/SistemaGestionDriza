const express = require('express');

const {
  listar,
  disponibilidad,
  obtenerPorId,
  registrar
} = require('./merma.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router =
  express.Router();


router.get(
  '/',
  verificarToken,
  listar
);


router.get(
  '/disponibilidad',
  verificarToken,
  disponibilidad
);


router.get(
  '/:merma_id',
  verificarToken,
  obtenerPorId
);


router.post(
  '/',
  verificarToken,
  registrar
);


module.exports =
  router;
