const express = require('express');

const {
  obtenerProductosTerminados,
  obtenerProductoTerminado,
  registrarProductoTerminado,
  obtenerComposiciones,
  registrarNuevaComposicion,
  obtenerOpciones
} = require('./productoTerminado.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router =
  express.Router();


/*
 * Debe ir antes de /:producto_id
 * para que "opciones" no sea interpretado
 * como un ID.
 */
router.get(
  '/opciones',
  verificarToken,
  obtenerOpciones
);


router.get(
  '/',
  verificarToken,
  obtenerProductosTerminados
);


router.post(
  '/',
  verificarToken,
  registrarProductoTerminado
);


router.get(
  '/:producto_id/composiciones',
  verificarToken,
  obtenerComposiciones
);


router.post(
  '/:producto_id/composiciones',
  verificarToken,
  registrarNuevaComposicion
);


router.get(
  '/:producto_id',
  verificarToken,
  obtenerProductoTerminado
);


module.exports =
  router;
