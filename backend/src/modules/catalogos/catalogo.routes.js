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

const {
  permitirRoles
} = require('../../middlewares/role.middleware');

const router = express.Router();

router.get(
  '/unidades-medida',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN'),
  obtenerUnidadesMedida
);

router.get(
  '/:catalogo',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN'),
  obtenerCatalogo
);

router.post(
  '/:catalogo',
  verificarToken,
  permitirRoles('ADMIN', 'ALMACEN'),
  registrarCatalogo
);

router.put(
  '/:catalogo/:id',
  verificarToken,
  permitirRoles('ADMIN', 'ALMACEN'),
  editarCatalogo
);

router.delete(
  '/:catalogo/:id',
  verificarToken,
  permitirRoles('ADMIN'),
  darBajaCatalogo
);

module.exports = router;