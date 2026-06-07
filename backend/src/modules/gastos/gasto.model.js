const { getConnection, sql } = require('../../config/db');

const listarTiposGasto = async () => {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT
      tipo_gasto_id,
      nombre,
      activo
    FROM finance.TipoGasto
    WHERE activo = 1
    ORDER BY nombre ASC;
  `);

  return result.recordset;
};

const buscarTipoGastoPorNombre = async (nombre) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('nombre', sql.NVarChar(100), nombre)
    .query(`
      SELECT
        tipo_gasto_id,
        nombre,
        activo
      FROM finance.TipoGasto
      WHERE nombre = @nombre;
    `);

  return result.recordset[0];
};

const crearTipoGasto = async ({
  nombre,
  created_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('nombre', sql.NVarChar(100), nombre)
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO finance.TipoGasto (
        nombre,
        created_by_usuario_id
      )
      OUTPUT
        INSERTED.tipo_gasto_id,
        INSERTED.nombre,
        INSERTED.activo,
        INSERTED.created_at
      VALUES (
        @nombre,
        @created_by_usuario_id
      );
    `);

  return result.recordset[0];
};

const listarGastos = async ({
  tipo_gasto_id,
  proveedor_id,
  moneda_codigo,
  q,
  page = 1,
  limit = 10
}) => {
  const pool = await getConnection();

  const offset = (page - 1) * limit;

  const result = await pool.request()
    .input('tipo_gasto_id', sql.Int, tipo_gasto_id || null)
    .input('proveedor_id', sql.Int, proveedor_id || null)
    .input('moneda_codigo', sql.Char(3), moneda_codigo || null)
    .input('q', sql.NVarChar(150), q ? `%${q}%` : null)
    .input('offset', sql.Int, offset)
    .input('limit', sql.Int, limit)
    .query(`
      WITH GastosResumen AS (
        SELECT
          g.gasto_id,
          g.tipo_gasto_id,
          tg.nombre AS tipo_gasto,

          g.proveedor_id,
          p.razon_social AS proveedor,
          p.ruc AS proveedor_ruc,

          g.fecha_gasto,
          g.monto,
          g.moneda_codigo,
          g.descripcion,
          g.comprobante,
          g.created_at,

          u.nombre_completo AS registrado_por
        FROM finance.Gasto g
        INNER JOIN finance.TipoGasto tg
          ON g.tipo_gasto_id = tg.tipo_gasto_id
        LEFT JOIN compras.Proveedor p
          ON g.proveedor_id = p.proveedor_id
        INNER JOIN auth.Usuario u
          ON g.created_by_usuario_id = u.usuario_id
        WHERE
          (@tipo_gasto_id IS NULL OR g.tipo_gasto_id = @tipo_gasto_id)
          AND (@proveedor_id IS NULL OR g.proveedor_id = @proveedor_id)
          AND (@moneda_codigo IS NULL OR g.moneda_codigo = @moneda_codigo)
          AND (
            @q IS NULL
            OR tg.nombre LIKE @q
            OR p.razon_social LIKE @q
            OR p.ruc LIKE @q
            OR g.descripcion LIKE @q
            OR g.comprobante LIKE @q
          )
      )
      SELECT
        *,
        COUNT(*) OVER() AS total_registros
      FROM GastosResumen
      ORDER BY created_at DESC
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY;
    `);

  const gastos = result.recordset;

  const total = gastos.length > 0
    ? gastos[0].total_registros
    : 0;

  return {
    gastos,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas: Math.ceil(total / limit)
    }
  };
};

const obtenerGastoPorId = async (gasto_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('gasto_id', sql.Int, gasto_id)
    .query(`
      SELECT
        g.gasto_id,
        g.tipo_gasto_id,
        tg.nombre AS tipo_gasto,

        g.proveedor_id,
        p.razon_social AS proveedor,
        p.ruc AS proveedor_ruc,

        g.fecha_gasto,
        g.monto,
        g.moneda_codigo,
        g.descripcion,
        g.comprobante,
        g.created_at,

        u.nombre_completo AS registrado_por
      FROM finance.Gasto g
      INNER JOIN finance.TipoGasto tg
        ON g.tipo_gasto_id = tg.tipo_gasto_id
      LEFT JOIN compras.Proveedor p
        ON g.proveedor_id = p.proveedor_id
      INNER JOIN auth.Usuario u
        ON g.created_by_usuario_id = u.usuario_id
      WHERE g.gasto_id = @gasto_id;
    `);

  return result.recordset[0];
};

const crearGasto = async ({
  tipo_gasto_id,
  proveedor_id,
  fecha_gasto,
  monto,
  moneda_codigo,
  descripcion,
  comprobante,
  created_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('tipo_gasto_id', sql.Int, tipo_gasto_id)
    .input('proveedor_id', sql.Int, proveedor_id || null)
    .input('fecha_gasto', sql.Date, fecha_gasto)
    .input('monto', sql.Decimal(18, 2), monto)
    .input('moneda_codigo', sql.Char(3), moneda_codigo)
    .input('descripcion', sql.NVarChar(400), descripcion || null)
    .input('comprobante', sql.VarChar(100), comprobante || null)
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO finance.Gasto (
        tipo_gasto_id,
        proveedor_id,
        fecha_gasto,
        monto,
        moneda_codigo,
        descripcion,
        comprobante,
        created_by_usuario_id
      )
      OUTPUT
        INSERTED.gasto_id,
        INSERTED.tipo_gasto_id,
        INSERTED.proveedor_id,
        INSERTED.fecha_gasto,
        INSERTED.monto,
        INSERTED.moneda_codigo,
        INSERTED.descripcion,
        INSERTED.comprobante,
        INSERTED.created_at
      VALUES (
        @tipo_gasto_id,
        @proveedor_id,
        @fecha_gasto,
        @monto,
        @moneda_codigo,
        @descripcion,
        @comprobante,
        @created_by_usuario_id
      );
    `);

  return result.recordset[0];
};

module.exports = {
  listarTiposGasto,
  buscarTipoGastoPorNombre,
  crearTipoGasto,
  listarGastos,
  obtenerGastoPorId,
  crearGasto
};