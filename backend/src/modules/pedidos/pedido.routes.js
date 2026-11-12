const express = require('express');

const {
  obtenerPedidos,
  obtenerPedido,
  registrarPedido,
  editarPedido
} = require('./pedido.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

const { obtenerOpcionesReporte, obtenerResumenReporte, exportarReporte } = require('./pedido.reporte.controller');

router.get('/reporte/opciones', verificarToken, obtenerOpcionesReporte);
router.get('/reporte/resumen', verificarToken, obtenerResumenReporte);
router.get('/reporte', verificarToken, exportarReporte);

router.get(
  '/',
  verificarToken,
  obtenerPedidos
);

router.get(
  '/:pedido_id',
  verificarToken,
  obtenerPedido
);

router.post(
  '/',
  verificarToken,
  registrarPedido
);

router.put(
  '/:pedido_id',
  verificarToken,
  editarPedido
);

module.exports = router;
