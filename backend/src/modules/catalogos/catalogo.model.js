const { getConnection, sql } = require('../../config/db');

const tablasPermitidas = {
  tiposProducto: {
    tabla: 'catalog.TipoProducto',
    id: 'tipo_producto_id'
  },
  medidas: {
    tabla: 'catalog.Medida',
    id: 'medida_id'
  },
  colores: {
    tabla: 'catalog.Color',
    id: 'color_id'
  },
  materiales: {
    tabla: 'catalog.Material',
    id: 'material_id'
  }
};

const obtenerConfigTabla = (catalogo) => {
  return tablasPermitidas[catalogo];
};

const listarCatalogo = async (catalogo) => {
  const config = obtenerConfigTabla(catalogo);

  if (!config) {
    throw new Error('Catálogo no permitido');
  }

  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT
      ${config.id} AS id,
      nombre,
      activo,
      created_at
    FROM ${config.tabla}
    WHERE activo = 1
    ORDER BY nombre ASC;
  `);

  return result.recordset;
};

const buscarPorNombre = async (catalogo, nombre) => {
  const config = obtenerConfigTabla(catalogo);

  if (!config) {
    throw new Error('Catálogo no permitido');
  }

  const pool = await getConnection();

  const result = await pool.request()
    .input('nombre', sql.NVarChar(100), nombre)
    .query(`
      SELECT
        ${config.id} AS id,
        nombre,
        activo
      FROM ${config.tabla}
      WHERE nombre = @nombre;
    `);

  return result.recordset[0];
};

const crearCatalogo = async ({
  catalogo,
  nombre,
  created_by_usuario_id
}) => {
  const config = obtenerConfigTabla(catalogo);

  if (!config) {
    throw new Error('Catálogo no permitido');
  }

  const pool = await getConnection();

  const result = await pool.request()
    .input('nombre', sql.NVarChar(100), nombre)
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO ${config.tabla} (
        nombre,
        created_by_usuario_id
      )
      OUTPUT
        INSERTED.${config.id} AS id,
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

const actualizarCatalogo = async ({
  catalogo,
  id,
  nombre
}) => {
  const config = obtenerConfigTabla(catalogo);

  if (!config) {
    throw new Error('Catálogo no permitido');
  }

  const pool = await getConnection();

  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('nombre', sql.NVarChar(100), nombre)
    .query(`
      UPDATE ${config.tabla}
      SET nombre = @nombre
      OUTPUT
        INSERTED.${config.id} AS id,
        INSERTED.nombre,
        INSERTED.activo
      WHERE ${config.id} = @id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const eliminarCatalogo = async ({
  catalogo,
  id
}) => {
  const config = obtenerConfigTabla(catalogo);

  if (!config) {
    throw new Error('Catálogo no permitido');
  }

  const pool = await getConnection();

  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`
      UPDATE ${config.tabla}
      SET activo = 0
      OUTPUT
        INSERTED.${config.id} AS id,
        INSERTED.nombre,
        INSERTED.activo
      WHERE ${config.id} = @id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const listarUnidadesMedida = async () => {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT
      unidad_medida_id,
      codigo,
      nombre,
      activo
    FROM catalog.UnidadMedida
    WHERE activo = 1
    ORDER BY nombre ASC;
  `);

  return result.recordset;
};

module.exports = {
  listarCatalogo,
  buscarPorNombre,
  crearCatalogo,
  actualizarCatalogo,
  eliminarCatalogo,
  listarUnidadesMedida
};