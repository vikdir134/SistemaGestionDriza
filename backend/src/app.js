const express = require('express');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./modules/auth/auth.routes');
const clienteRoutes = require('./modules/clientes/cliente.routes');
const catalogoRoutes = require('./modules/catalogos/catalogo.routes');

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

app.use((req, res) => {
  res.status(404).json({
    mensaje: 'Ruta no encontrada'
  });
});

module.exports = app;