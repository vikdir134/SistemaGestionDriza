const { getConnection } = require('../../config/db');

// Cada registro representa un movimiento de caja. No se incluyen pedidos,
// cronogramas ni saldos pendientes: sus cobros/pagos se cuentan por separado.
const SALDOS_SQL = `
  WITH Movimientos AS (
    SELECT moneda_codigo, monto AS importe FROM finance.Deposito
    UNION ALL
    SELECT moneda_codigo, -monto FROM finance.Gasto WHERE activo = 1
    UNION ALL
    SELECT moneda_codigo, -monto_total FROM compras.Compra
    UNION ALL
    SELECT moneda_codigo, -monto_total FROM compras.CompraMateriaPrima
    UNION ALL
    SELECT moneda_codigo, monto FROM finance.Inversion WHERE activo = 1
    UNION ALL
    SELECT i.moneda_codigo, -r.monto
    FROM finance.InversionRetiro r
    JOIN finance.Inversion i ON i.inversion_id = r.inversion_id
    WHERE r.activo = 1 AND i.activo = 1
    UNION ALL
    SELECT moneda_codigo,
      CASE WHEN direccion = 'RECIBIDO' THEN capital ELSE -capital END
    FROM finance.Prestamo WHERE activo = 1
    UNION ALL
    SELECT p.moneda_codigo,
      CASE WHEN p.direccion = 'OTORGADO' THEN 1 ELSE -1 END
        * (pg.capital_pagado + pg.interes_pagado + pg.cargos_pagados)
    FROM finance.PrestamoPago pg
    JOIN finance.Prestamo p ON p.prestamo_id = pg.prestamo_id
    WHERE pg.activo = 1 AND p.activo = 1
  )
  SELECT moneda_codigo,
    SUM(CASE WHEN importe > 0 THEN importe ELSE 0 END) AS entradas,
    SUM(CASE WHEN importe < 0 THEN -importe ELSE 0 END) AS salidas,
    SUM(importe) AS saldo
  FROM Movimientos
  GROUP BY moneda_codigo
  ORDER BY moneda_codigo;
`;

async function obtenerSaldos() {
  const pool = await getConnection();
  const result = await pool.request().query(SALDOS_SQL);
  return result.recordset;
}

module.exports = { obtenerSaldos, SALDOS_SQL };
