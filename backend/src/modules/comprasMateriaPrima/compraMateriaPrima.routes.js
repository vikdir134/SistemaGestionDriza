const express = require('express');

const {
  obtenerComprasMateriaPrima,
  obtenerCompraMateriaPrima,
  registrarCompraMateriaPrima
} = require('./compraMateriaPrima.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router = express.Router();


router.get(
  '/',
  verificarToken,
  obtenerComprasMateriaPrima
);


router.get(
  '/:compra_materia_prima_id',
  verificarToken,
  obtenerCompraMateriaPrima
);


router.post(
  '/',
  verificarToken,
  registrarCompraMateriaPrima
);


module.exports = router;
