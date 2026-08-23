const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

require('dotenv').config();

const {
  sql,
  getConnection
} = require('../src/config/db');


const MIGRATIONS_DIR = path.resolve(
  __dirname,
  '../../database/migrations'
);


/*
 * Genera un SHA-256 del contenido de la migración.
 *
 * Esto permite detectar si alguien modifica
 * posteriormente un script que ya fue aplicado.
 */
const calcularChecksum = (contenido) => {
  return crypto
    .createHash('sha256')
    .update(contenido, 'utf8')
    .digest('hex');
};


/*
 * SQL Server utiliza GO como separador de batches
 * en SSMS/sqlcmd, pero GO no forma parte realmente
 * del lenguaje T-SQL.
 *
 * Permitimos que las migraciones futuras puedan
 * utilizar GO separando manualmente los batches.
 */
const separarBatches = (contenido) => {
  return contenido
    .split(/^\s*GO\s*;?\s*$/gim)
    .map((batch) => batch.trim())
    .filter(Boolean);
};


/*
 * La tabla se crea automáticamente la primera vez.
 */
const asegurarTablaMigraciones = async (pool) => {
  await pool.request().query(`
    IF OBJECT_ID('dbo.MigracionBD', 'U') IS NULL
    BEGIN
      CREATE TABLE dbo.MigracionBD (
        migracion_id INT IDENTITY(1,1) NOT NULL
          CONSTRAINT PK_MigracionBD PRIMARY KEY,

        archivo NVARCHAR(260) NOT NULL,

        checksum CHAR(64) NOT NULL,

        aplicado_at DATETIME2(7) NOT NULL
          CONSTRAINT DF_MigracionBD_AplicadoAt
          DEFAULT SYSDATETIME(),

        CONSTRAINT UQ_MigracionBD_Archivo
          UNIQUE (archivo)
      );
    END;
  `);
};


const obtenerMigracionesAplicadas = async (pool) => {
  const result = await pool.request().query(`
    SELECT
      archivo,
      checksum,
      aplicado_at
    FROM dbo.MigracionBD;
  `);

  return new Map(
    result.recordset.map((row) => [
      row.archivo,
      {
        checksum: row.checksum,
        aplicado_at: row.aplicado_at
      }
    ])
  );
};


const ejecutarMigracion = async ({
  pool,
  archivo,
  contenido,
  checksum
}) => {
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const batches = separarBatches(contenido);

    for (const batch of batches) {
      const request = new sql.Request(transaction);

      await request.query(batch);
    }

    /*
     * Solo registramos la migración después
     * de que TODO el SQL terminó correctamente.
     */
    const requestRegistro = new sql.Request(transaction);

    await requestRegistro
      .input(
        'archivo',
        sql.NVarChar(260),
        archivo
      )
      .input(
        'checksum',
        sql.Char(64),
        checksum
      )
      .query(`
        INSERT INTO dbo.MigracionBD (
          archivo,
          checksum
        )
        VALUES (
          @archivo,
          @checksum
        );
      `);

    await transaction.commit();

  } catch (error) {
    if (transaction._aborted !== true) {
      try {
        await transaction.rollback();
      } catch (_) {
        // No ocultamos el error original.
      }
    }

    throw error;
  }
};


const ejecutarMigraciones = async () => {
  console.log('');
  console.log('========================================');
  console.log(' GestionDriza - Migraciones de BBDD');
  console.log('========================================');
  console.log('');

  if (!fs.existsSync(MIGRATIONS_DIR)) {
    throw new Error(
      `No existe la carpeta de migraciones: ${MIGRATIONS_DIR}`
    );
  }

  /*
   * Solo se ejecutan archivos .sql de migrations.
   *
   * GestionDriza_SCHEMA.sql u otros archivos
   * que estén fuera de esta carpeta se ignoran.
   */
  const archivos = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((archivo) =>
      archivo.toLowerCase().endsWith('.sql')
    )
    .sort((a, b) =>
      a.localeCompare(
        b,
        undefined,
        {
          numeric: true,
          sensitivity: 'base'
        }
      )
    );

  if (archivos.length === 0) {
    console.log(
      'No hay archivos de migración.'
    );

    return;
  }

  console.log(
    `Base de datos: ${process.env.DB_DATABASE}`
  );

  console.log(
    `Servidor: ${process.env.DB_SERVER}`
  );

  console.log('');

  const pool = await getConnection();

  await asegurarTablaMigraciones(pool);

  const aplicadas =
    await obtenerMigracionesAplicadas(pool);

  let ejecutadas = 0;
  let omitidas = 0;

  for (const archivo of archivos) {
    const ruta = path.join(
      MIGRATIONS_DIR,
      archivo
    );

    const contenido = fs.readFileSync(
      ruta,
      'utf8'
    );

    const checksum =
      calcularChecksum(contenido);

    const anterior =
      aplicadas.get(archivo);

    /*
     * La migración ya existe en la BD.
     */
    if (anterior) {
      /*
       * Si alguien modificó el SQL después
       * de haberlo aplicado, detenemos todo.
       *
       * Nunca debemos modificar migraciones
       * históricas.
       */
      if (
        anterior.checksum.trim() !== checksum
      ) {
        throw new Error(
          [
            '',
            `La migración ${archivo} ya fue aplicada,`,
            'pero su contenido fue modificado.',
            '',
            'No modifiques migraciones antiguas.',
            'Crea una migración nueva.'
          ].join('\n')
        );
      }

      console.log(
        `[OK] ${archivo} - ya aplicada`
      );

      omitidas++;

      continue;
    }

    console.log(
      `[>>] Ejecutando ${archivo}...`
    );

    await ejecutarMigracion({
      pool,
      archivo,
      contenido,
      checksum
    });

    console.log(
      `[OK] ${archivo} - aplicada correctamente`
    );

    ejecutadas++;
  }

  console.log('');
  console.log('----------------------------------------');
  console.log(
    `Nuevas aplicadas: ${ejecutadas}`
  );
  console.log(
    `Ya existentes:    ${omitidas}`
  );
  console.log('----------------------------------------');
  console.log('');
  console.log(
    'Base de datos actualizada correctamente.'
  );
};


ejecutarMigraciones()
  .then(async () => {
    try {
      await sql.close();
    } catch (_) {
      // Nada que hacer.
    }

    process.exit(0);
  })
  .catch(async (error) => {
    console.error('');
    console.error(
      'ERROR AL ACTUALIZAR LA BASE DE DATOS'
    );
    console.error('');
    console.error(error.message);
    console.error('');

    try {
      await sql.close();
    } catch (_) {
      // Nada que hacer.
    }

    process.exit(1);
  });