const router = require('express').Router();
const { verificarToken } = require('../../middlewares/auth.middleware');
const { validarPeriodo } = require('./flujoCaja.calculo');
const { obtenerFlujo } = require('./flujoCaja.model');

router.use(verificarToken);
router.get('/', async (req, res) => {
  let filtros;
  try { filtros = validarPeriodo(req.query); }
  catch (error) { return res.status(400).json({ mensaje: error.message }); }
  try {
    const resultado = await obtenerFlujo(filtros);
    res.set('Cache-Control', 'no-store');
    res.json(resultado);
  } catch (error) {
    console.error('Error al calcular el flujo de caja:', error.message);
    res.status(500).json({ mensaje: 'No fue posible calcular el flujo de caja. Verifica los movimientos y la conexión a la base de datos.' });
  }
});

module.exports = router;
