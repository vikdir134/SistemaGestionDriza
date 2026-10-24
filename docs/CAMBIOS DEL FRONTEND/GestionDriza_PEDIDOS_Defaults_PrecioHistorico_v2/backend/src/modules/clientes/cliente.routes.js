const express = require('express');

const {
  obtenerClientes,
  obtenerClientesSelect,
  obtenerCliente,
  registrarCliente,
  editarCliente,
  darBajaCliente,
  obtenerPreciosCliente,
  obtenerUltimoPrecioProductoCliente,
  registrarPrecioCliente
} = require('./cliente.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  obtenerClientes
);

router.get(
  '/select',
  verificarToken,
  obtenerClientesSelect
);

router.get(
  '/precios',
  verificarToken,
  obtenerPreciosCliente
);

router.get(
  '/precios/ultimo',
  verificarToken,
  obtenerUltimoPrecioProductoCliente
);

router.post(
  '/precios',
  verificarToken,
  registrarPrecioCliente
);

router.get(
  '/:cliente_id',
  verificarToken,
  obtenerCliente
);

router.post(
  '/',
  verificarToken,
  registrarCliente
);

router.put(
  '/:cliente_id',
  verificarToken,
  editarCliente
);

router.delete(
  '/:cliente_id',
  verificarToken,
  darBajaCliente
);

module.exports = router;