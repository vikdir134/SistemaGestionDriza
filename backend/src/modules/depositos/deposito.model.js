const { getConnection, sql } = require('../../config/db');

const listarTiposDeposito = async () => {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT
      tipo_deposito_id,
      nombre,
      activo
    FROM finance.TipoDeposito
    WHERE activo = 1
    ORDER BY nombre ASC;
  `);

  return result.recordset;
};

const listarPedidosParaDeposito = async ({
  cliente_id,
  q,
  page = 1,
  limit = 10
}) => {
  const pool = await getConnection();

  const offset = (page - 1) * limit;

  const result = await pool.request()
    .input('cliente_id', sql.Int, cliente_id || null)
    .input('q', sql.NVarChar(150), q ? `%${q}%` : null)
    .input('offset', sql.Int, offset)
    .input('limit', sql.Int, limit)
    .query(`
      WITH TotalesMoneda AS (
        SELECT
          pd.pedido_id,
          pd.moneda_codigo,
          SUM(pd.cantidad_pedida * pd.precio_unitario) AS total_pedido
        FROM ventas.PedidoDetalle pd
        WHERE pd.activo = 1
        GROUP BY
          pd.pedido_id,
          pd.moneda_codigo
      ),
      DepositosMoneda AS (
        SELECT
          d.pedido_id,
          d.moneda_codigo,
          SUM(d.monto) AS total_depositado
        FROM finance.Deposito d
        GROUP BY
          d.pedido_id,
          d.moneda_codigo
      ),
      ResumenMoneda AS (
        SELECT
          tm.pedido_id,
          tm.moneda_codigo,
          tm.total_pedido,
          ISNULL(dm.total_depositado, 0) AS total_depositado,
          tm.total_pedido - ISNULL(dm.total_depositado, 0) AS saldo_pendiente
        FROM TotalesMoneda tm
        LEFT JOIN DepositosMoneda dm
          ON tm.pedido_id = dm.pedido_id
         AND tm.moneda_codigo = dm.moneda_codigo
      ),
      ResumenPedido AS (
        SELECT
          p.pedido_id,
          p.codigo_pedido,
          p.descripcion_pedido,
          p.fecha_pedido,
          p.fecha_entrega_estimada,
          p.estado_pedido,
          p.created_at,

          c.cliente_id,
          c.razon_social,
          c.ruc,

          COUNT(rm.moneda_codigo) AS cantidad_monedas,

          SUM(CASE 
            WHEN rm.total_depositado >= rm.total_pedido THEN 1 
            ELSE 0 
          END) AS monedas_pagadas,

          SUM(CASE 
            WHEN rm.total_depositado > 0 
             AND rm.total_depositado < rm.total_pedido THEN 1 
            ELSE 0 
          END) AS monedas_parciales,

          SUM(CASE 
            WHEN rm.total_depositado = 0 THEN 1 
            ELSE 0 
          END) AS monedas_sin_pago,

          SUM(rm.total_pedido) AS total_referencial,
          SUM(rm.total_depositado) AS depositado_referencial,
          SUM(rm.saldo_pendiente) AS saldo_referencial
        FROM ventas.Pedido p
        INNER JOIN crm.Cliente c
          ON p.cliente_id = c.cliente_id
        INNER JOIN ResumenMoneda rm
          ON p.pedido_id = rm.pedido_id
        WHERE p.estado_pedido <> 'CANCELADO'
          AND (@cliente_id IS NULL OR p.cliente_id = @cliente_id)
          AND (
            @q IS NULL
            OR c.razon_social LIKE @q
            OR c.ruc LIKE @q
            OR p.descripcion_pedido LIKE @q
            OR p.codigo_pedido LIKE @q
          )
        GROUP BY
          p.pedido_id,
          p.codigo_pedido,
          p.descripcion_pedido,
          p.fecha_pedido,
          p.fecha_entrega_estimada,
          p.estado_pedido,
          p.created_at,
          c.cliente_id,
          c.razon_social,
          c.ruc
      )
      SELECT
        *,
        CASE
          WHEN monedas_pagadas = cantidad_monedas THEN 'PAGADO'
          WHEN monedas_parciales > 0 OR monedas_pagadas > 0 THEN 'PARCIAL'
          ELSE 'SIN_PAGO'
        END AS estado_pago_general,
        COUNT(*) OVER() AS total_registros
      FROM ResumenPedido
      ORDER BY created_at DESC
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY;
    `);

  const pedidos = result.recordset;

  const total = pedidos.length > 0
    ? pedidos[0].total_registros
    : 0;

  return {
    pedidos,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas: Math.ceil(total / limit)
    }
  };
};

const obtenerPedidoParaDeposito = async (pedido_id) => {
  const pool = await getConnection();

  const pedidoResult = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .query(`
      SELECT
        p.pedido_id,
        p.codigo_pedido,
        p.descripcion_pedido,
        p.fecha_pedido,
        p.fecha_entrega_estimada,
        p.estado_pedido,

        c.cliente_id,
        c.razon_social,
        c.ruc,
        c.direccion
      FROM ventas.Pedido p
      INNER JOIN crm.Cliente c
        ON p.cliente_id = c.cliente_id
      WHERE p.pedido_id = @pedido_id;
    `);

  const pedido = pedidoResult.recordset[0];

  if (!pedido) {
    return null;
  }

  const totalesResult = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .query(`
      WITH Totales AS (
        SELECT
          pd.pedido_id,
          pd.moneda_codigo,
          SUM(pd.cantidad_pedida * pd.precio_unitario) AS total_pedido
        FROM ventas.PedidoDetalle pd
        WHERE pd.pedido_id = @pedido_id
          AND pd.activo = 1
        GROUP BY
          pd.pedido_id,
          pd.moneda_codigo
      ),
      Depositos AS (
        SELECT
          d.pedido_id,
          d.moneda_codigo,
          SUM(d.monto) AS total_depositado
        FROM finance.Deposito d
        WHERE d.pedido_id = @pedido_id
        GROUP BY
          d.pedido_id,
          d.moneda_codigo
      )
      SELECT
        t.moneda_codigo,
        t.total_pedido,
        ISNULL(d.total_depositado, 0) AS total_depositado,
        t.total_pedido - ISNULL(d.total_depositado, 0) AS saldo_pendiente,
        CASE
          WHEN ISNULL(d.total_depositado, 0) >= t.total_pedido THEN 'PAGADO'
          WHEN ISNULL(d.total_depositado, 0) > 0 THEN 'PARCIAL'
          ELSE 'SIN_PAGO'
        END AS estado_pago
      FROM Totales t
      LEFT JOIN Depositos d
        ON t.pedido_id = d.pedido_id
       AND t.moneda_codigo = d.moneda_codigo
      ORDER BY t.moneda_codigo;
    `);

  const historialResult = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .query(`
      SELECT
        d.deposito_id,
        d.pedido_id,
        d.tipo_deposito_id,
        td.nombre AS tipo_deposito,

        d.fecha_deposito,
        d.monto,
        d.moneda_codigo,
        d.numero_operacion,
        d.observacion,
        d.created_at,

        u.nombre_completo AS registrado_por
      FROM finance.Deposito d
      INNER JOIN finance.TipoDeposito td
        ON d.tipo_deposito_id = td.tipo_deposito_id
      INNER JOIN auth.Usuario u
        ON d.created_by_usuario_id = u.usuario_id
      WHERE d.pedido_id = @pedido_id
      ORDER BY d.fecha_deposito DESC, d.deposito_id DESC;
    `);

  let estado_pago_general = 'SIN_PAGO';

  const totales = totalesResult.recordset;

  if (totales.length > 0 && totales.every((t) => t.estado_pago === 'PAGADO')) {
    estado_pago_general = 'PAGADO';
  } else if (totales.some((t) => t.estado_pago === 'PARCIAL' || t.estado_pago === 'PAGADO')) {
    estado_pago_general = 'PARCIAL';
  }

  return {
    ...pedido,
    estado_pago_general,
    totales,
    historial_depositos: historialResult.recordset
  };
};

const obtenerSaldoPorMoneda = async ({
  pedido_id,
  moneda_codigo
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .input('moneda_codigo', sql.Char(3), moneda_codigo)
    .query(`
      WITH TotalPedido AS (
        SELECT
          pd.pedido_id,
          pd.moneda_codigo,
          SUM(pd.cantidad_pedida * pd.precio_unitario) AS total_pedido
        FROM ventas.PedidoDetalle pd
        WHERE pd.pedido_id = @pedido_id
          AND pd.moneda_codigo = @moneda_codigo
          AND pd.activo = 1
        GROUP BY
          pd.pedido_id,
          pd.moneda_codigo
      ),
      TotalDepositos AS (
        SELECT
          d.pedido_id,
          d.moneda_codigo,
          SUM(d.monto) AS total_depositado
        FROM finance.Deposito d
        WHERE d.pedido_id = @pedido_id
          AND d.moneda_codigo = @moneda_codigo
        GROUP BY
          d.pedido_id,
          d.moneda_codigo
      )
      SELECT
        tp.pedido_id,
        tp.moneda_codigo,
        tp.total_pedido,
        ISNULL(td.total_depositado, 0) AS total_depositado,
        tp.total_pedido - ISNULL(td.total_depositado, 0) AS saldo_pendiente
      FROM TotalPedido tp
      LEFT JOIN TotalDepositos td
        ON tp.pedido_id = td.pedido_id
       AND tp.moneda_codigo = td.moneda_codigo;
    `);

  return result.recordset[0];
};

const crearDeposito = async ({
  pedido_id,
  tipo_deposito_id,
  fecha_deposito,
  monto,
  moneda_codigo,
  numero_operacion,
  observacion,
  created_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .input('tipo_deposito_id', sql.Int, tipo_deposito_id)
    .input('fecha_deposito', sql.Date, fecha_deposito)
    .input('monto', sql.Decimal(18, 2), monto)
    .input('moneda_codigo', sql.Char(3), moneda_codigo)
    .input('numero_operacion', sql.VarChar(100), numero_operacion || null)
    .input('observacion', sql.NVarChar(300), observacion || null)
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO finance.Deposito (
        pedido_id,
        tipo_deposito_id,
        fecha_deposito,
        monto,
        moneda_codigo,
        numero_operacion,
        observacion,
        created_by_usuario_id
      )
      OUTPUT
        INSERTED.deposito_id,
        INSERTED.pedido_id,
        INSERTED.tipo_deposito_id,
        INSERTED.fecha_deposito,
        INSERTED.monto,
        INSERTED.moneda_codigo,
        INSERTED.numero_operacion,
        INSERTED.observacion,
        INSERTED.created_at
      VALUES (
        @pedido_id,
        @tipo_deposito_id,
        @fecha_deposito,
        @monto,
        @moneda_codigo,
        @numero_operacion,
        @observacion,
        @created_by_usuario_id
      );
    `);

  return result.recordset[0];
};

module.exports = {
  listarTiposDeposito,
  listarPedidosParaDeposito,
  obtenerPedidoParaDeposito,
  obtenerSaldoPorMoneda,
  crearDeposito
};