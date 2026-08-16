const express = require('express');

const {
  obtenerCatalogo,
  registrarCatalogo,
  editarCatalogo,
  darBajaCatalogo,
  obtenerUnidadesMedida
} = require('./catalogo.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/unidades-medida',
  verificarToken,
  obtenerUnidadesMedida
);

router.get(
  '/:catalogo',
  verificarToken,
  obtenerCatalogo
);

router.post(
  '/:catalogo',
  verificarToken,
  registrarCatalogo
);

router.put(
  '/:catalogo/:id',
  verificarToken,
  editarCatalogo
);

router.delete(
  '/:catalogo/:id',
  verificarToken,
  darBajaCatalogo
);

module.exports = router;