const { getConnection, sql } = require('../../config/db');

const listarClientes = async ({
  q,
  page = 1,
  limit = 10
}) => {
  const pool = await getConnection();
  const offset = (page - 1) * limit;

  const result = await pool.request()
    .input('q', sql.NVarChar(150), q ? `%${q}%` : null)
    .input('offset', sql.Int, offset)
    .input('limit', sql.Int, limit)
    .query(`
      WITH ClientesResumen AS (
        SELECT
          cliente_id,
          ruc,
          razon_social,
          direccion,
          telefono,
          correo,
          agencia_entrega,
          activo,
          created_at
        FROM crm.Cliente
        WHERE activo = 1
          AND (
            @q IS NULL
            OR ruc LIKE @q
            OR razon_social LIKE @q
            OR direccion LIKE @q
            OR agencia_entrega LIKE @q
          )
      )
      SELECT
        *,
        COUNT(*) OVER() AS total_registros
      FROM ClientesResumen
      ORDER BY created_at DESC
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY;
    `);

  const clientes = result.recordset;

  const total = clientes.length > 0
    ? clientes[0].total_registros
    : 0;

  return {
    clientes,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas: Math.ceil(total / limit)
    }
  };
};

const listarClientesSelect = async () => {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT
      cliente_id,
      ruc,
      razon_social,
      agencia_entrega
    FROM crm.Cliente
    WHERE activo = 1
    ORDER BY razon_social ASC;
  `);

  return result.recordset;
};

const obtenerClientePorId = async (cliente_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('cliente_id', sql.Int, cliente_id)
    .query(`
      SELECT
        cliente_id,
        ruc,
        razon_social,
        direccion,
        telefono,
        correo,
        agencia_entrega,
        activo,
        created_at
      FROM crm.Cliente
      WHERE cliente_id = @cliente_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const buscarClientePorRuc = async (ruc) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('ruc', sql.VarChar(11), ruc)
    .query(`
      SELECT
        cliente_id,
        ruc,
        razon_social,
        activo
      FROM crm.Cliente
      WHERE ruc = @ruc;
    `);

  return result.recordset[0];
};

const crearCliente = async ({
  ruc,
  razon_social,
  direccion,
  telefono,
  correo,
  agencia_entrega,
  created_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('ruc', sql.VarChar(11), ruc)
    .input('razon_social', sql.NVarChar(200), razon_social)
    .input('direccion', sql.NVarChar(250), direccion || null)
    .input('telefono', sql.VarChar(30), telefono || null)
    .input('correo', sql.VarChar(150), correo || null)
    .input('agencia_entrega', sql.NVarChar(150), agencia_entrega || null)
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO crm.Cliente (
        ruc,
        razon_social,
        direccion,
        telefono,
        correo,
        agencia_entrega,
        created_by_usuario_id
      )
      OUTPUT
        INSERTED.cliente_id,
        INSERTED.ruc,
        INSERTED.razon_social,
        INSERTED.direccion,
        INSERTED.telefono,
        INSERTED.correo,
        INSERTED.agencia_entrega,
        INSERTED.created_at
      VALUES (
        @ruc,
        @razon_social,
        @direccion,
        @telefono,
        @correo,
        @agencia_entrega,
        @created_by_usuario_id
      );
    `);

  return result.recordset[0];
};

const actualizarCliente = async ({
  cliente_id,
  ruc,
  razon_social,
  direccion,
  telefono,
  correo,
  agencia_entrega,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('cliente_id', sql.Int, cliente_id)
    .input('ruc', sql.VarChar(11), ruc)
    .input('razon_social', sql.NVarChar(200), razon_social)
    .input('direccion', sql.NVarChar(250), direccion || null)
    .input('telefono', sql.VarChar(30), telefono || null)
    .input('correo', sql.VarChar(150), correo || null)
    .input('agencia_entrega', sql.NVarChar(150), agencia_entrega || null)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE crm.Cliente
      SET
        ruc = @ruc,
        razon_social = @razon_social,
        direccion = @direccion,
        telefono = @telefono,
        correo = @correo,
        agencia_entrega = @agencia_entrega,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.cliente_id,
        INSERTED.ruc,
        INSERTED.razon_social,
        INSERTED.direccion,
        INSERTED.telefono,
        INSERTED.correo,
        INSERTED.agencia_entrega,
        INSERTED.updated_at
      WHERE cliente_id = @cliente_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const eliminarCliente = async ({
  cliente_id,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('cliente_id', sql.Int, cliente_id)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE crm.Cliente
      SET
        activo = 0,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.cliente_id,
        INSERTED.ruc,
        INSERTED.razon_social,
        INSERTED.activo
      WHERE cliente_id = @cliente_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const listarPreciosCliente = async ({
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
      WITH PreciosResumen AS (
        SELECT
          ph.precio_cliente_id,
          ph.cliente_id,
          cli.ruc,
          cli.razon_social,

          ph.tipo_producto_id,
          tp.nombre AS tipo_producto,

          ph.medida_id,
          m.nombre AS medida,

          ph.color_id,
          c.nombre AS color,

          ph.material_id,
          mat.nombre AS material,

          ph.fecha_precio,
          ph.precio_unitario,
          ph.moneda_codigo,
          ph.observacion,
          ph.created_at,

          u.nombre_completo AS registrado_por
        FROM crm.ClientePrecioHistorial ph
        INNER JOIN crm.Cliente cli
          ON ph.cliente_id = cli.cliente_id
        INNER JOIN catalog.TipoProducto tp
          ON ph.tipo_producto_id = tp.tipo_producto_id
        INNER JOIN catalog.Medida m
          ON ph.medida_id = m.medida_id
        INNER JOIN catalog.Color c
          ON ph.color_id = c.color_id
        INNER JOIN catalog.Material mat
          ON ph.material_id = mat.material_id
        INNER JOIN auth.Usuario u
          ON ph.created_by_usuario_id = u.usuario_id
        WHERE ph.activo = 1
          AND (@cliente_id IS NULL OR ph.cliente_id = @cliente_id)
          AND (
            @q IS NULL
            OR cli.razon_social LIKE @q
            OR cli.ruc LIKE @q
            OR tp.nombre LIKE @q
            OR m.nombre LIKE @q
            OR c.nombre LIKE @q
            OR mat.nombre LIKE @q
          )
      )
      SELECT
        *,
        COUNT(*) OVER() AS total_registros
      FROM PreciosResumen
      ORDER BY fecha_precio DESC, created_at DESC
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY;
    `);

  const precios = result.recordset;

  const total = precios.length > 0
    ? precios[0].total_registros
    : 0;

  return {
    precios,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas: Math.ceil(total / limit)
    }
  };
};

const crearPrecioCliente = async ({
  cliente_id,
  tipo_producto_id,
  medida_id,
  color_id,
  material_id,
  fecha_precio,
  precio_unitario,
  moneda_codigo,
  observacion,
  created_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('cliente_id', sql.Int, cliente_id)
    .input('tipo_producto_id', sql.Int, tipo_producto_id)
    .input('medida_id', sql.Int, medida_id)
    .input('color_id', sql.Int, color_id)
    .input('material_id', sql.Int, material_id)
    .input('fecha_precio', sql.Date, fecha_precio)
    .input('precio_unitario', sql.Decimal(18, 4), precio_unitario)
    .input('moneda_codigo', sql.Char(3), moneda_codigo)
    .input('observacion', sql.NVarChar(300), observacion || null)
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO crm.ClientePrecioHistorial (
        cliente_id,
        tipo_producto_id,
        medida_id,
        color_id,
        material_id,
        fecha_precio,
        precio_unitario,
        moneda_codigo,
        observacion,
        created_by_usuario_id
      )
      OUTPUT
        INSERTED.precio_cliente_id,
        INSERTED.cliente_id,
        INSERTED.tipo_producto_id,
        INSERTED.medida_id,
        INSERTED.color_id,
        INSERTED.material_id,
        INSERTED.fecha_precio,
        INSERTED.precio_unitario,
        INSERTED.moneda_codigo,
        INSERTED.observacion,
        INSERTED.created_at
      VALUES (
        @cliente_id,
        @tipo_producto_id,
        @medida_id,
        @color_id,
        @material_id,
        @fecha_precio,
        @precio_unitario,
        @moneda_codigo,
        @observacion,
        @created_by_usuario_id
      );
    `);

  return result.recordset[0];
};

module.exports = {
  listarClientes,
  listarClientesSelect,
  obtenerClientePorId,
  buscarClientePorRuc,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  listarPreciosCliente,
  crearPrecioCliente
};