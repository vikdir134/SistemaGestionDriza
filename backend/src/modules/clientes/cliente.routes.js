const express = require('express');

const {
  obtenerClientes,
  obtenerClientesSelect,
  obtenerCliente,
  registrarCliente,
  editarCliente,
  darBajaCliente,
  obtenerPreciosCliente,
  registrarPrecioCliente
} = require('./cliente.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const {
  permitirRoles
} = require('../../middlewares/role.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN', 'FINANZAS'),
  obtenerClientes
);

router.get(
  '/select',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN', 'FINANZAS', 'COMPRAS'),
  obtenerClientesSelect
);

router.get(
  '/precios',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'FINANZAS'),
  obtenerPreciosCliente
);

router.post(
  '/precios',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS'),
  registrarPrecioCliente
);

router.get(
  '/:cliente_id',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS', 'ALMACEN', 'FINANZAS'),
  obtenerCliente
);

router.post(
  '/',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS'),
  registrarCliente
);

router.put(
  '/:cliente_id',
  verificarToken,
  permitirRoles('ADMIN', 'VENTAS'),
  editarCliente
);

router.delete(
  '/:cliente_id',
  verificarToken,
  permitirRoles('ADMIN'),
  darBajaCliente
);

module.exports = router;