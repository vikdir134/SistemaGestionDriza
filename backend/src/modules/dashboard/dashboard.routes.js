const router = require('express').Router();
const { verificarToken } = require('../../middlewares/auth.middleware');
const { obtenerSaldos } = require('./dashboard.model');

router.use(verificarToken);
router.get('/saldo', async (req, res) => {
  try {
    const saldos = await obtenerSaldos();
    res.set('Cache-Control', 'no-store');
    res.json({ saldos });
  } catch (error) {
    console.error('Error al calcular el saldo en cuenta:', error.message);
    res.status(500).json({ mensaje: 'No fue posible calcular el saldo en cuenta.' });
  }
});

module.exports = router;
