const { getConnection, sql } = require('../../config/db');
const { MOVIMIENTOS_CAJA_SQL } = require('./flujoCaja.consulta');
const { calcularFlujo } = require('./flujoCaja.calculo');

async function obtenerFlujo(filtros) {
  const pool = await getConnection();
  const result = await pool.request().input('moneda', sql.Char(3), filtros.moneda)
    .input('fin', sql.Date, filtros.fin).query(MOVIMIENTOS_CAJA_SQL);
  return calcularFlujo({ ...filtros, movimientos: result.recordset });
}

module.exports = { obtenerFlujo };
