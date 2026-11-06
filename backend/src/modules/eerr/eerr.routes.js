const router = require('express').Router();
const { verificarToken } = require('../../middlewares/auth.middleware');
const { validarFiltros, obtenerEerr, validarFiltrosAnuales, obtenerEerrAnual } = require('./eerr.model');

router.use(verificarToken);
router.get('/anual', async (req, res) => {
  let filtros;
  try {
    filtros = validarFiltrosAnuales(req.query);
  } catch (error) {
    return res.status(400).json({ mensaje: error.message });
  }
  try {
    res.set('Cache-Control', 'no-store');
    res.json(await obtenerEerrAnual(filtros));
  } catch (error) {
    console.error('Error al calcular el EERR anual:', error.message);
    res.status(500).json({ mensaje: 'No fue posible calcular el resumen anual del EERR.' });
  }
});
router.get('/', async (req, res) => {
  let filtros;
  try {
    filtros = validarFiltros(req.query);
  } catch (error) {
    return res.status(400).json({ mensaje: error.message });
  }
  try {
    const resultado = await obtenerEerr(filtros);
    res.set('Cache-Control', 'no-store');
    res.json(resultado);
  } catch (error) {
    console.error('Error al calcular el EERR:', error.message);
    res.status(500).json({ mensaje: 'No fue posible calcular el EERR. Verifica la conexión y las tablas de producción, gastos y préstamos.' });
  }
});

module.exports = router;
