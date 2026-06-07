const express = require('express');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./modules/auth/auth.routes');
const clienteRoutes = require('./modules/clientes/cliente.routes');
const catalogoRoutes = require('./modules/catalogos/catalogo.routes');
const productoRoutes = require('./modules/productos/producto.routes');
const pedidoRoutes = require('./modules/pedidos/pedido.routes');
const entregaRoutes = require('./modules/entregas/entrega.routes');
const depositoRoutes = require('./modules/depositos/deposito.routes');
const proveedorRoutes = require('./modules/proveedores/proveedor.routes');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Sistema de Gestión Driza funcionando correctamente'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/catalogos', catalogoRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/entregas', entregaRoutes);
app.use('/api/depositos', depositoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use((req, res) => {
  res.status(404).json({
    mensaje: 'Ruta no encontrada'
  });
});

module.exports = app;