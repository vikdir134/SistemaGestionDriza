# GestionDriza - Backend Context

> Archivo generado automáticamente.
> No editar manualmente.

## Información

- **Proyecto:** GestionDriza
- **Componente:** Backend
- **Fecha de generación:** 2026-09-20 14:42:03
- **Branch Git:** feature/inventario-produccion-completo
- **Commit Git:** 0428b419bf986f3b7d1ecc3f5530ea7723a67d82
- **Cantidad de archivos incluidos:** 58

---

## Estructura de archivos

`	ext
package.json
scripts\run-migrations.js
src\app.js
src\config\db.js
src\middlewares\auth.middleware.js
src\middlewares\role.middleware.js
src\modules\almacenMateriaPrima\almacenMateriaPrima.controller.js
src\modules\almacenMateriaPrima\almacenMateriaPrima.model.js
src\modules\almacenMateriaPrima\almacenMateriaPrima.routes.js
src\modules\almacenProductoTerminado\almacenProductoTerminado.controller.js
src\modules\almacenProductoTerminado\almacenProductoTerminado.model.js
src\modules\almacenProductoTerminado\almacenProductoTerminado.routes.js
src\modules\auth\auth.controller.js
src\modules\auth\auth.model.js
src\modules\auth\auth.routes.js
src\modules\catalogos\catalogo.controller.js
src\modules\catalogos\catalogo.model.js
src\modules\catalogos\catalogo.routes.js
src\modules\clientes\cliente.controller.js
src\modules\clientes\cliente.model.js
src\modules\clientes\cliente.routes.js
src\modules\compras\compra.controller.js
src\modules\compras\compra.model.js
src\modules\compras\compra.routes.js
src\modules\comprasMateriaPrima\compraMateriaPrima.controller.js
src\modules\comprasMateriaPrima\compraMateriaPrima.model.js
src\modules\comprasMateriaPrima\compraMateriaPrima.routes.js
src\modules\depositos\deposito.controller.js
src\modules\depositos\deposito.model.js
src\modules\depositos\deposito.routes.js
src\modules\entregas\entrega.controller.js
src\modules\entregas\entrega.model.js
src\modules\entregas\entrega.routes.js
src\modules\gastos\gasto.controller.js
src\modules\gastos\gasto.model.js
src\modules\gastos\gasto.routes.js
src\modules\mermas\merma.controller.js
src\modules\mermas\merma.model.js
src\modules\mermas\merma.routes.js
src\modules\pedidos\pedido.controller.js
src\modules\pedidos\pedido.edicion.model.js
src\modules\pedidos\pedido.model.js
src\modules\pedidos\pedido.producto.helper.js
src\modules\pedidos\pedido.routes.js
src\modules\producciones\produccion.controller.js
src\modules\producciones\produccion.model.js
src\modules\producciones\produccion.routes.js
src\modules\productos\producto.controller.js
src\modules\productos\producto.model.js
src\modules\productos\producto.routes.js
src\modules\productosTerminados\productoTerminado.controller.js
src\modules\productosTerminados\productoTerminado.model.js
src\modules\productosTerminados\productoTerminado.routes.js
src\modules\proveedores\proveedor.controller.js
src\modules\proveedores\proveedor.model.js
src\modules\proveedores\proveedor.routes.js
src\server.js
src\utils\generarToken.js~~~
---

## package.json

~~~json
{
  "name": "backend-driza",
  "version": "1.0.0",
  "description": "Backend para Sistema de Gestión de Empresa de Driza",
  "main": "src/server.js",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "dotenv": "^17.0.0",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "mssql": "^12.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
~~~

---

## scripts\run-migrations.js

~~~javascript
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
~~~

---

## src\app.js

~~~javascript
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./modules/auth/auth.routes');
const clienteRoutes = require('./modules/clientes/cliente.routes');
const catalogoRoutes = require('./modules/catalogos/catalogo.routes');
const productoRoutes = require('./modules/productos/producto.routes');
const productoTerminadoRoutes = require(
  './modules/productosTerminados/productoTerminado.routes'
);
const produccionRoutes = require(
  './modules/producciones/produccion.routes'
);
const pedidoRoutes = require('./modules/pedidos/pedido.routes');
const entregaRoutes = require('./modules/entregas/entrega.routes');
const depositoRoutes = require('./modules/depositos/deposito.routes');
const proveedorRoutes = require('./modules/proveedores/proveedor.routes');
const compraRoutes = require('./modules/compras/compra.routes');
const compraMateriaPrimaRoutes = require(
  './modules/comprasMateriaPrima/compraMateriaPrima.routes'
);
const almacenMateriaPrimaRoutes = require(
  './modules/almacenMateriaPrima/almacenMateriaPrima.routes'
);
const almacenProductoTerminadoRoutes = require(
  './modules/almacenProductoTerminado/almacenProductoTerminado.routes'
);
const gastoRoutes = require('./modules/gastos/gasto.routes');
const mermaRoutes = require(
  './modules/mermas/merma.routes'
);

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Sistema de Gestión Driza funcionando correctamente'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/catalogos', catalogoRoutes);

/* Módulo histórico. */
app.use('/api/productos', productoRoutes);

/* Catálogo real de producto terminado. */
app.use(
  '/api/productos-terminados',
  productoTerminadoRoutes
);

/* Producción + FIFO + entrada de producto terminado. */
app.use(
  '/api/producciones',
  produccionRoutes
);

app.use('/api/pedidos', pedidoRoutes);
app.use('/api/entregas', entregaRoutes);
app.use('/api/depositos', depositoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/compras', compraRoutes);

app.use(
  '/api/compras-materia-prima',
  compraMateriaPrimaRoutes
);

app.use(
  '/api/almacen-materia-prima',
  almacenMateriaPrimaRoutes
);

app.use(
  '/api/almacen-producto-terminado',
  almacenProductoTerminadoRoutes
);
app.use(
  '/api/mermas',
  mermaRoutes
);
app.use('/api/gastos', gastoRoutes);

app.use((req, res) => {
  res.status(404).json({
    mensaje: 'Ruta no encontrada'
  });
});

module.exports = app;

~~~

---

## src\config\db.js

~~~javascript
const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT || 1433),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let poolPromise = null;

const getConnection = async () => {
  try {
    if (!poolPromise) {
      poolPromise = await sql.connect(dbConfig);
      console.log('Conexión a SQL Server exitosa');
    }

    return poolPromise;
  } catch (error) {
    console.error('Error de conexión a SQL Server:', error.message);
    throw error;
  }
};

module.exports = {
  sql,
  getConnection
};
~~~

---

## src\middlewares\auth.middleware.js

~~~javascript
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        mensaje: 'Token no enviado'
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        mensaje: 'Formato de token inválido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: 'Token inválido o expirado'
    });
  }
};

module.exports = {
  verificarToken
};
~~~

---

## src\middlewares\role.middleware.js

~~~javascript
const permitirRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    const rolesUsuario = req.usuario?.roles || [];

    const tienePermiso = rolesUsuario.some((rol) =>
      rolesPermitidos.includes(rol)
    );

    if (!tienePermiso) {
      return res.status(403).json({
        mensaje: 'No tienes permisos para realizar esta acción'
      });
    }

    next();
  };
};

module.exports = {
  permitirRoles
};
~~~

---

## src\modules\almacenMateriaPrima\almacenMateriaPrima.controller.js

~~~javascript
const {
  listarResumenMateriaPrima,
  listarLotesMateriaPrima,
  obtenerLoteMateriaPrimaPorId,
  listarMovimientosLote,
  obtenerIndicadoresAlmacenMateriaPrima
} = require('./almacenMateriaPrima.model');


const tiposMovimientoValidos = [
  'ENTRADA_COMPRA',
  'SALIDA_PRODUCCION',
  'SALIDA_MERMA',
  'AJUSTE_ENTRADA',
  'AJUSTE_SALIDA'
];


const validarPaginacion = (
  page,
  limit
) => {
  const pageNumero =
    Number(page);

  const limitNumero =
    Number(limit);

  if (
    !Number.isInteger(
      pageNumero
    ) ||
    pageNumero < 1 ||
    !Number.isInteger(
      limitNumero
    ) ||
    limitNumero < 1 ||
    limitNumero > 100
  ) {
    return null;
  }

  return {
    page: pageNumero,
    limit: limitNumero
  };
};


const numeroIdOpcional = (
  valor
) => {
  if (
    valor === undefined ||
    valor === null ||
    valor === ''
  ) {
    return null;
  }

  const numero =
    Number(valor);

  if (
    !Number.isInteger(numero) ||
    numero <= 0
  ) {
    return NaN;
  }

  return numero;
};


const obtenerResumen =
  async (
    req,
    res
  ) => {
    try {
      const {
        material_id,
        color_id,
        q,
        page = 1,
        limit = 10
      } = req.query;

      const paginacion =
        validarPaginacion(
          page,
          limit
        );

      if (!paginacion) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      const materialId =
        numeroIdOpcional(
          material_id
        );

      const colorId =
        numeroIdOpcional(
          color_id
        );

      if (
        Number.isNaN(
          materialId
        ) ||
        Number.isNaN(
          colorId
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Los filtros de material o color no son válidos'
        });
      }

      const resultado =
        await listarResumenMateriaPrima({
          material_id:
            materialId,
          color_id:
            colorId,
          q:
            q
              ? String(q).trim()
              : null,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Resumen de materia prima obtenido correctamente',
        resumen:
          resultado.resumen,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error obtener resumen almacén MP:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener el resumen del almacén de materia prima'
      });
    }
  };


const obtenerLotes =
  async (
    req,
    res
  ) => {
    try {
      const {
        proveedor_id,
        estado = 'TODOS',
        q,
        page = 1,
        limit = 10
      } = req.query;

      const paginacion =
        validarPaginacion(
          page,
          limit
        );

      if (!paginacion) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      const proveedorId =
        numeroIdOpcional(
          proveedor_id
        );

      if (
        Number.isNaN(
          proveedorId
        )
      ) {
        return res.status(400).json({
          mensaje:
            'El proveedor enviado no es válido'
        });
      }

      const estadoNormalizado =
        String(estado)
          .trim()
          .toUpperCase();

      if (
        ![
          'TODOS',
          'CON_STOCK',
          'AGOTADO'
        ].includes(
          estadoNormalizado
        )
      ) {
        return res.status(400).json({
          mensaje:
            'El estado debe ser TODOS, CON_STOCK o AGOTADO'
        });
      }

      const resultado =
        await listarLotesMateriaPrima({
          proveedor_id:
            proveedorId,
          estado:
            estadoNormalizado,
          q:
            q
              ? String(q).trim()
              : null,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Lotes de materia prima obtenidos correctamente',
        lotes:
          resultado.lotes,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error obtener lotes almacén MP:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener los lotes de materia prima'
      });
    }
  };


const obtenerLote =
  async (
    req,
    res
  ) => {
    try {
      const compraId =
        Number(
          req.params
            .compra_materia_prima_id
        );

      if (
        !Number.isInteger(
          compraId
        ) ||
        compraId <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de lote inválido'
        });
      }

      const lote =
        await obtenerLoteMateriaPrimaPorId(
          compraId
        );

      if (!lote) {
        return res.status(404).json({
          mensaje:
            'Lote de materia prima no encontrado'
        });
      }

      res.json({
        mensaje:
          'Lote de materia prima obtenido correctamente',
        lote
      });

    } catch (error) {
      console.error(
        'Error obtener lote almacén MP:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener el lote de materia prima'
      });
    }
  };


const obtenerMovimientosLote =
  async (
    req,
    res
  ) => {
    try {
      const compraId =
        Number(
          req.params
            .compra_materia_prima_id
        );

      if (
        !Number.isInteger(
          compraId
        ) ||
        compraId <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de lote inválido'
        });
      }

      const lote =
        await obtenerLoteMateriaPrimaPorId(
          compraId
        );

      if (!lote) {
        return res.status(404).json({
          mensaje:
            'Lote de materia prima no encontrado'
        });
      }

      const {
        tipo_movimiento,
        page = 1,
        limit = 10
      } = req.query;

      const paginacion =
        validarPaginacion(
          page,
          limit
        );

      if (!paginacion) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      let tipoNormalizado =
        null;

      if (
        tipo_movimiento
      ) {
        tipoNormalizado =
          String(
            tipo_movimiento
          )
            .trim()
            .toUpperCase();

        if (
          !tiposMovimientoValidos
            .includes(
              tipoNormalizado
            )
        ) {
          return res.status(400).json({
            mensaje:
              'Tipo de movimiento no válido'
          });
        }
      }

      const resultado =
        await listarMovimientosLote({
          compra_materia_prima_id:
            compraId,
          tipo_movimiento:
            tipoNormalizado,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Movimientos del lote obtenidos correctamente',
        lote: {
          compra_materia_prima_id:
            lote
              .compra_materia_prima_id,
          nombre_lote:
            lote.nombre_lote
        },
        movimientos:
          resultado.movimientos,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error movimientos lote almacén MP:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener los movimientos del lote'
      });
    }
  };


const obtenerIndicadores =
  async (
    req,
    res
  ) => {
    try {
      const indicadores =
        await obtenerIndicadoresAlmacenMateriaPrima();

      res.json({
        mensaje:
          'Indicadores del almacén de materia prima obtenidos correctamente',
        indicadores
      });

    } catch (error) {
      console.error(
        'Error indicadores almacén MP:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener los indicadores del almacén de materia prima'
      });
    }
  };


module.exports = {
  obtenerResumen,
  obtenerLotes,
  obtenerLote,
  obtenerMovimientosLote,
  obtenerIndicadores
};

~~~

---

## src\modules\almacenMateriaPrima\almacenMateriaPrima.model.js

~~~javascript
const {
  getConnection,
  sql
} = require('../../config/db');


const listarResumenMateriaPrima = async ({
  material_id,
  color_id,
  q,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'material_id',
        sql.Int,
        material_id || null
      )
      .input(
        'color_id',
        sql.Int,
        color_id || null
      )
      .input(
        'q',
        sql.NVarChar(150),
        q ? `%${q}%` : null
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        WITH Resumen AS (
          SELECT
            d.material_id,
            m.nombre AS material,

            d.color_id,
            c.nombre AS color,

            d.unidad_medida_id,
            um.codigo AS unidad,

            SUM(
              s.cantidad_inicial
            ) AS cantidad_inicial_total,

            SUM(
              s.cantidad_inicial -
              s.cantidad_disponible
            ) AS cantidad_consumida_total,

            SUM(
              s.cantidad_disponible
            ) AS cantidad_disponible_total

          FROM inventario.StockMateriaPrimaLote s

          INNER JOIN compras.CompraMateriaPrimaDetalle d
            ON s.compra_materia_prima_detalle_id =
               d.compra_materia_prima_detalle_id

          INNER JOIN catalog.Material m
            ON d.material_id =
               m.material_id

          INNER JOIN catalog.Color c
            ON d.color_id =
               c.color_id

          INNER JOIN catalog.UnidadMedida um
            ON d.unidad_medida_id =
               um.unidad_medida_id

          WHERE
            (
              @material_id IS NULL
              OR d.material_id =
                 @material_id
            )
            AND (
              @color_id IS NULL
              OR d.color_id =
                 @color_id
            )
            AND (
              @q IS NULL
              OR m.nombre LIKE @q
              OR c.nombre LIKE @q
            )

          GROUP BY
            d.material_id,
            m.nombre,
            d.color_id,
            c.nombre,
            d.unidad_medida_id,
            um.codigo
        )

        SELECT
          *,
          COUNT(*) OVER()
            AS total_registros

        FROM Resumen

        ORDER BY
          material ASC,
          color ASC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const resumen =
    result.recordset;

  const total =
    resumen.length > 0
      ? resumen[0]
          .total_registros
      : 0;

  return {
    resumen,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const listarLotesMateriaPrima = async ({
  proveedor_id,
  estado,
  q,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'proveedor_id',
        sql.Int,
        proveedor_id || null
      )
      .input(
        'estado',
        sql.VarChar(20),
        estado || 'TODOS'
      )
      .input(
        'q',
        sql.NVarChar(150),
        q ? `%${q}%` : null
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        WITH Lotes AS (
          SELECT
            cmp.compra_materia_prima_id,
            cmp.nombre_lote,
            cmp.fecha_compra,
            cmp.numero_documento,

            cmp.proveedor_id,
            p.ruc AS proveedor_ruc,
            p.razon_social
              AS proveedor,

            COUNT(
              d.compra_materia_prima_detalle_id
            ) AS cantidad_materias_primas,

            SUM(
              s.cantidad_inicial
            ) AS cantidad_inicial_total,

            SUM(
              s.cantidad_inicial -
              s.cantidad_disponible
            ) AS cantidad_consumida_total,

            SUM(
              s.cantidad_disponible
            ) AS cantidad_disponible_total,

            CASE
              WHEN SUM(
                s.cantidad_disponible
              ) > 0
              THEN 'CON_STOCK'
              ELSE 'AGOTADO'
            END AS estado_stock

          FROM compras.CompraMateriaPrima cmp

          INNER JOIN compras.Proveedor p
            ON cmp.proveedor_id =
               p.proveedor_id

          INNER JOIN compras.CompraMateriaPrimaDetalle d
            ON cmp.compra_materia_prima_id =
               d.compra_materia_prima_id

          INNER JOIN inventario.StockMateriaPrimaLote s
            ON d.compra_materia_prima_detalle_id =
               s.compra_materia_prima_detalle_id

          GROUP BY
            cmp.compra_materia_prima_id,
            cmp.nombre_lote,
            cmp.fecha_compra,
            cmp.numero_documento,
            cmp.proveedor_id,
            p.ruc,
            p.razon_social
        )

        SELECT
          l.*,
          COUNT(*) OVER()
            AS total_registros

        FROM Lotes l

        WHERE
          (
            @proveedor_id IS NULL
            OR l.proveedor_id =
               @proveedor_id
          )

          AND (
            @estado = 'TODOS'
            OR (
              @estado = 'CON_STOCK'
              AND l.cantidad_disponible_total > 0
            )
            OR (
              @estado = 'AGOTADO'
              AND l.cantidad_disponible_total = 0
            )
          )

          AND (
            @q IS NULL

            OR l.nombre_lote LIKE @q
            OR l.numero_documento LIKE @q
            OR l.proveedor LIKE @q
            OR l.proveedor_ruc LIKE @q

            OR EXISTS (
              SELECT 1
              FROM compras.CompraMateriaPrimaDetalle d2

              INNER JOIN catalog.Material m2
                ON d2.material_id =
                   m2.material_id

              INNER JOIN catalog.Color c2
                ON d2.color_id =
                   c2.color_id

              WHERE
                d2.compra_materia_prima_id =
                  l.compra_materia_prima_id

                AND (
                  m2.nombre LIKE @q
                  OR c2.nombre LIKE @q
                )
            )
          )

        ORDER BY
          l.fecha_compra ASC,
          l.compra_materia_prima_id ASC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const lotes =
    result.recordset;

  const total =
    lotes.length > 0
      ? lotes[0]
          .total_registros
      : 0;

  return {
    lotes,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const obtenerLoteMateriaPrimaPorId = async (
  compra_materia_prima_id
) => {
  const pool =
    await getConnection();

  const cabeceraResult =
    await pool.request()
      .input(
        'compra_materia_prima_id',
        sql.Int,
        compra_materia_prima_id
      )
      .query(`
        SELECT
          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.fecha_compra,
          cmp.numero_documento,
          cmp.moneda_codigo,
          cmp.descripcion,

          cmp.proveedor_id,
          p.ruc AS proveedor_ruc,
          p.razon_social
            AS proveedor,

          SUM(
            s.cantidad_inicial
          ) AS cantidad_inicial_total,

          SUM(
            s.cantidad_inicial -
            s.cantidad_disponible
          ) AS cantidad_consumida_total,

          SUM(
            s.cantidad_disponible
          ) AS cantidad_disponible_total,

          COUNT(
            d.compra_materia_prima_detalle_id
          ) AS cantidad_materias_primas,

          u.nombre_completo
            AS registrado_por,

          cmp.created_at

        FROM compras.CompraMateriaPrima cmp

        INNER JOIN compras.Proveedor p
          ON cmp.proveedor_id =
             p.proveedor_id

        INNER JOIN auth.Usuario u
          ON cmp.created_by_usuario_id =
             u.usuario_id

        INNER JOIN compras.CompraMateriaPrimaDetalle d
          ON cmp.compra_materia_prima_id =
             d.compra_materia_prima_id

        INNER JOIN inventario.StockMateriaPrimaLote s
          ON d.compra_materia_prima_detalle_id =
             s.compra_materia_prima_detalle_id

        WHERE
          cmp.compra_materia_prima_id =
          @compra_materia_prima_id

        GROUP BY
          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.fecha_compra,
          cmp.numero_documento,
          cmp.moneda_codigo,
          cmp.descripcion,
          cmp.proveedor_id,
          p.ruc,
          p.razon_social,
          u.nombre_completo,
          cmp.created_at;
      `);

  const lote =
    cabeceraResult.recordset[0];

  if (!lote) {
    return null;
  }

  const detallesResult =
    await pool.request()
      .input(
        'compra_materia_prima_id',
        sql.Int,
        compra_materia_prima_id
      )
      .query(`
        SELECT
          d.compra_materia_prima_detalle_id,

          s.stock_materia_prima_lote_id,

          d.material_id,
          m.nombre AS material,

          d.color_id,
          c.nombre AS color,

          d.descripcion_item,

          d.unidad_medida_id,
          um.codigo AS unidad,

          d.precio_unitario,
          d.subtotal,

          s.cantidad_inicial,

          (
            s.cantidad_inicial -
            s.cantidad_disponible
          ) AS cantidad_consumida,

          s.cantidad_disponible

        FROM compras.CompraMateriaPrimaDetalle d

        INNER JOIN inventario.StockMateriaPrimaLote s
          ON d.compra_materia_prima_detalle_id =
             s.compra_materia_prima_detalle_id

        INNER JOIN catalog.Material m
          ON d.material_id =
             m.material_id

        INNER JOIN catalog.Color c
          ON d.color_id =
             c.color_id

        INNER JOIN catalog.UnidadMedida um
          ON d.unidad_medida_id =
             um.unidad_medida_id

        WHERE
          d.compra_materia_prima_id =
          @compra_materia_prima_id

        ORDER BY
          m.nombre ASC,
          c.nombre ASC;
      `);

  return {
    ...lote,
    detalles:
      detallesResult.recordset
  };
};


const listarMovimientosLote = async ({
  compra_materia_prima_id,
  tipo_movimiento,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'compra_materia_prima_id',
        sql.Int,
        compra_materia_prima_id
      )
      .input(
        'tipo_movimiento',
        sql.VarChar(30),
        tipo_movimiento || null
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        SELECT
          mm.movimiento_materia_prima_id,

          mm.tipo_movimiento,
          mm.cantidad,
          mm.fecha_movimiento,
          mm.observacion,

          mm.produccion_detalle_id,
          mm.merma_detalle_id,

          d.material_id,
          m.nombre AS material,

          d.color_id,
          c.nombre AS color,

          um.codigo AS unidad,

          u.nombre_completo
            AS registrado_por,

          COUNT(*) OVER()
            AS total_registros

        FROM inventario.MovimientoMateriaPrima mm

        INNER JOIN inventario.StockMateriaPrimaLote s
          ON mm.stock_materia_prima_lote_id =
             s.stock_materia_prima_lote_id

        INNER JOIN compras.CompraMateriaPrimaDetalle d
          ON s.compra_materia_prima_detalle_id =
             d.compra_materia_prima_detalle_id

        INNER JOIN catalog.Material m
          ON d.material_id =
             m.material_id

        INNER JOIN catalog.Color c
          ON d.color_id =
             c.color_id

        INNER JOIN catalog.UnidadMedida um
          ON d.unidad_medida_id =
             um.unidad_medida_id

        INNER JOIN auth.Usuario u
          ON mm.created_by_usuario_id =
             u.usuario_id

        WHERE
          d.compra_materia_prima_id =
            @compra_materia_prima_id

          AND (
            @tipo_movimiento IS NULL
            OR mm.tipo_movimiento =
               @tipo_movimiento
          )

        ORDER BY
          mm.fecha_movimiento DESC,
          mm.movimiento_materia_prima_id DESC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const movimientos =
    result.recordset;

  const total =
    movimientos.length > 0
      ? movimientos[0]
          .total_registros
      : 0;

  return {
    movimientos,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const obtenerIndicadoresAlmacenMateriaPrima =
  async () => {
    const pool =
      await getConnection();

    const result =
      await pool.request()
        .query(`
          SELECT
            ISNULL(
              SUM(
                s.cantidad_inicial
              ),
              0
            ) AS total_comprado_kg,

            ISNULL(
              SUM(
                s.cantidad_disponible
              ),
              0
            ) AS stock_total_kg,

            ISNULL(
              SUM(
                s.cantidad_inicial -
                s.cantidad_disponible
              ),
              0
            ) AS consumido_total_kg,

            COUNT(
              DISTINCT
              d.compra_materia_prima_id
            ) AS lotes_registrados

          FROM inventario.StockMateriaPrimaLote s

          INNER JOIN compras.CompraMateriaPrimaDetalle d
            ON s.compra_materia_prima_detalle_id =
               d.compra_materia_prima_detalle_id;
        `);

    return result.recordset[0];
  };


module.exports = {
  listarResumenMateriaPrima,
  listarLotesMateriaPrima,
  obtenerLoteMateriaPrimaPorId,
  listarMovimientosLote,
  obtenerIndicadoresAlmacenMateriaPrima
};

~~~

---

## src\modules\almacenMateriaPrima\almacenMateriaPrima.routes.js

~~~javascript
const express = require('express');

const {
  obtenerResumen,
  obtenerLotes,
  obtenerLote,
  obtenerMovimientosLote,
  obtenerIndicadores
} = require('./almacenMateriaPrima.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router =
  express.Router();


router.get(
  '/indicadores',
  verificarToken,
  obtenerIndicadores
);


router.get(
  '/resumen',
  verificarToken,
  obtenerResumen
);


router.get(
  '/lotes',
  verificarToken,
  obtenerLotes
);


router.get(
  '/lotes/:compra_materia_prima_id/movimientos',
  verificarToken,
  obtenerMovimientosLote
);


router.get(
  '/lotes/:compra_materia_prima_id',
  verificarToken,
  obtenerLote
);


module.exports =
  router;

~~~

---

## src\modules\almacenProductoTerminado\almacenProductoTerminado.controller.js

~~~javascript
const {
  listarResumenProductoTerminado,
  listarPresentacionesProductoTerminado,
  obtenerPresentacionPorId,
  listarMovimientosPresentacion,
  obtenerIndicadoresAlmacenProductoTerminado
} = require('./almacenProductoTerminado.model');


const tiposMovimientoValidos = [
  'ENTRADA_PRODUCCION',
  'SALIDA_ENTREGA',
  'AJUSTE_ENTRADA',
  'AJUSTE_SALIDA'
];


const validarPaginacion = (
  page,
  limit
) => {
  const pageNumero =
    Number(page);

  const limitNumero =
    Number(limit);

  if (
    !Number.isInteger(
      pageNumero
    ) ||
    pageNumero < 1 ||
    !Number.isInteger(
      limitNumero
    ) ||
    limitNumero < 1 ||
    limitNumero > 100
  ) {
    return null;
  }

  return {
    page: pageNumero,
    limit: limitNumero
  };
};


const idOpcional = (
  valor
) => {
  if (
    valor === undefined ||
    valor === null ||
    valor === ''
  ) {
    return null;
  }

  const numero =
    Number(valor);

  if (
    !Number.isInteger(
      numero
    ) ||
    numero <= 0
  ) {
    return NaN;
  }

  return numero;
};


const obtenerResumen =
  async (
    req,
    res
  ) => {
    try {
      const {
        q,
        tipo_producto_id,
        material_id,
        medida_id,
        color_id,
        page = 1,
        limit = 10
      } = req.query;

      const paginacion =
        validarPaginacion(
          page,
          limit
        );

      if (!paginacion) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      const tipoId =
        idOpcional(
          tipo_producto_id
        );

      const materialId =
        idOpcional(
          material_id
        );

      const medidaId =
        idOpcional(
          medida_id
        );

      const colorId =
        idOpcional(
          color_id
        );

      if (
        [
          tipoId,
          materialId,
          medidaId,
          colorId
        ].some(
          Number.isNaN
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Uno de los filtros enviados no es válido'
        });
      }

      const resultado =
        await listarResumenProductoTerminado({
          q:
            q
              ? String(q).trim()
              : null,
          tipo_producto_id:
            tipoId,
          material_id:
            materialId,
          medida_id:
            medidaId,
          color_id:
            colorId,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Resumen del almacén de producto terminado obtenido correctamente',
        resumen:
          resultado.resumen,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error obtener resumen almacén PT:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener el resumen del almacén de producto terminado'
      });
    }
  };


const obtenerPresentaciones =
  async (
    req,
    res
  ) => {
    try {
      const {
        q,
        tipo_producto_id,
        material_id,
        medida_id,
        color_id,
        estado = 'TODOS',
        page = 1,
        limit = 10
      } = req.query;

      const paginacion =
        validarPaginacion(
          page,
          limit
        );

      if (!paginacion) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      const tipoId =
        idOpcional(
          tipo_producto_id
        );

      const materialId =
        idOpcional(
          material_id
        );

      const medidaId =
        idOpcional(
          medida_id
        );

      const colorId =
        idOpcional(
          color_id
        );

      if (
        [
          tipoId,
          materialId,
          medidaId,
          colorId
        ].some(
          Number.isNaN
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Uno de los filtros enviados no es válido'
        });
      }

      const estadoNormalizado =
        String(estado)
          .trim()
          .toUpperCase();

      if (
        ![
          'TODOS',
          'CON_STOCK',
          'AGOTADO'
        ].includes(
          estadoNormalizado
        )
      ) {
        return res.status(400).json({
          mensaje:
            'El estado debe ser TODOS, CON_STOCK o AGOTADO'
        });
      }

      const resultado =
        await listarPresentacionesProductoTerminado({
          q:
            q
              ? String(q).trim()
              : null,
          tipo_producto_id:
            tipoId,
          material_id:
            materialId,
          medida_id:
            medidaId,
          color_id:
            colorId,
          estado:
            estadoNormalizado,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Presentaciones de producto terminado obtenidas correctamente',
        presentaciones:
          resultado.presentaciones,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error obtener presentaciones almacén PT:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener las presentaciones de producto terminado'
      });
    }
  };


const obtenerPresentacion =
  async (
    req,
    res
  ) => {
    try {
      const stockId =
        Number(
          req.params
            .stock_producto_terminado_id
        );

      if (
        !Number.isInteger(
          stockId
        ) ||
        stockId <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de stock inválido'
        });
      }

      const presentacion =
        await obtenerPresentacionPorId(
          stockId
        );

      if (!presentacion) {
        return res.status(404).json({
          mensaje:
            'Presentación de producto terminado no encontrada'
        });
      }

      res.json({
        mensaje:
          'Presentación de producto terminado obtenida correctamente',
        presentacion
      });

    } catch (error) {
      console.error(
        'Error obtener presentación almacén PT:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener la presentación de producto terminado'
      });
    }
  };


const obtenerMovimientos =
  async (
    req,
    res
  ) => {
    try {
      const stockId =
        Number(
          req.params
            .stock_producto_terminado_id
        );

      if (
        !Number.isInteger(
          stockId
        ) ||
        stockId <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de stock inválido'
        });
      }

      const presentacion =
        await obtenerPresentacionPorId(
          stockId
        );

      if (!presentacion) {
        return res.status(404).json({
          mensaje:
            'Presentación de producto terminado no encontrada'
        });
      }

      const {
        tipo_movimiento,
        page = 1,
        limit = 10
      } = req.query;

      const paginacion =
        validarPaginacion(
          page,
          limit
        );

      if (!paginacion) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      let tipoNormalizado =
        null;

      if (
        tipo_movimiento
      ) {
        tipoNormalizado =
          String(
            tipo_movimiento
          )
            .trim()
            .toUpperCase();

        if (
          !tiposMovimientoValidos
            .includes(
              tipoNormalizado
            )
        ) {
          return res.status(400).json({
            mensaje:
              'Tipo de movimiento no válido'
          });
        }
      }

      const resultado =
        await listarMovimientosPresentacion({
          stock_producto_terminado_id:
            stockId,
          tipo_movimiento:
            tipoNormalizado,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Movimientos del producto terminado obtenidos correctamente',
        presentacion: {
          stock_producto_terminado_id:
            presentacion
              .stock_producto_terminado_id,
          producto_id:
            presentacion.producto_id,
          tipo_producto:
            presentacion
              .tipo_producto,
          material:
            presentacion.material,
          medida:
            presentacion.medida,
          color:
            presentacion.color,
          cantidad_presentacion:
            presentacion
              .cantidad_presentacion,
          unidad_presentacion:
            presentacion
              .unidad_presentacion
        },
        movimientos:
          resultado.movimientos,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error movimientos almacén PT:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener los movimientos de producto terminado'
      });
    }
  };


const obtenerIndicadores =
  async (
    req,
    res
  ) => {
    try {
      const indicadores =
        await obtenerIndicadoresAlmacenProductoTerminado();

      res.json({
        mensaje:
          'Indicadores del almacén de producto terminado obtenidos correctamente',
        indicadores
      });

    } catch (error) {
      console.error(
        'Error indicadores almacén PT:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener los indicadores del almacén de producto terminado'
      });
    }
  };


module.exports = {
  obtenerResumen,
  obtenerPresentaciones,
  obtenerPresentacion,
  obtenerMovimientos,
  obtenerIndicadores
};

~~~

---

## src\modules\almacenProductoTerminado\almacenProductoTerminado.model.js

~~~javascript
const {
  getConnection,
  sql
} = require('../../config/db');


const listarResumenProductoTerminado = async ({
  q,
  tipo_producto_id,
  material_id,
  medida_id,
  color_id,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'q',
        sql.NVarChar(150),
        q ? `%${q}%` : null
      )
      .input(
        'tipo_producto_id',
        sql.Int,
        tipo_producto_id || null
      )
      .input(
        'material_id',
        sql.Int,
        material_id || null
      )
      .input(
        'medida_id',
        sql.Int,
        medida_id || null
      )
      .input(
        'color_id',
        sql.Int,
        color_id || null
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        WITH Resumen AS (
          SELECT
            p.producto_id,

            p.tipo_producto_id,
            tp.nombre AS tipo_producto,

            p.material_id,
            mat.nombre AS material,

            p.medida_id,
            med.nombre AS medida,

            p.color_id,
            col.nombre AS color,

            s.unidad_medida_id,
            um.codigo AS unidad,

            SUM(
              s.cantidad_disponible
            ) AS cantidad_disponible_total,

            SUM(
              CASE
                WHEN s.cantidad_disponible > 0
                THEN 1
                ELSE 0
              END
            ) AS presentaciones_con_stock

          FROM inventario.StockProductoTerminado s

          INNER JOIN catalog.Producto p
            ON s.producto_id =
               p.producto_id

          INNER JOIN catalog.TipoProducto tp
            ON p.tipo_producto_id =
               tp.tipo_producto_id

          INNER JOIN catalog.Material mat
            ON p.material_id =
               mat.material_id

          INNER JOIN catalog.Medida med
            ON p.medida_id =
               med.medida_id

          INNER JOIN catalog.Color col
            ON p.color_id =
               col.color_id

          INNER JOIN catalog.UnidadMedida um
            ON s.unidad_medida_id =
               um.unidad_medida_id

          WHERE
            p.activo = 1

            AND (
              @tipo_producto_id IS NULL
              OR p.tipo_producto_id =
                 @tipo_producto_id
            )

            AND (
              @material_id IS NULL
              OR p.material_id =
                 @material_id
            )

            AND (
              @medida_id IS NULL
              OR p.medida_id =
                 @medida_id
            )

            AND (
              @color_id IS NULL
              OR p.color_id =
                 @color_id
            )

            AND (
              @q IS NULL
              OR tp.nombre LIKE @q
              OR mat.nombre LIKE @q
              OR med.nombre LIKE @q
              OR col.nombre LIKE @q
              OR p.codigo_producto LIKE @q
              OR p.descripcion LIKE @q
            )

          GROUP BY
            p.producto_id,
            p.tipo_producto_id,
            tp.nombre,
            p.material_id,
            mat.nombre,
            p.medida_id,
            med.nombre,
            p.color_id,
            col.nombre,
            s.unidad_medida_id,
            um.codigo
        )

        SELECT
          *,
          COUNT(*) OVER()
            AS total_registros

        FROM Resumen

        ORDER BY
          tipo_producto ASC,
          material ASC,
          medida ASC,
          color ASC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const resumen =
    result.recordset;

  const total =
    resumen.length > 0
      ? Number(
          resumen[0]
            .total_registros
        )
      : 0;

  return {
    resumen,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const listarPresentacionesProductoTerminado = async ({
  q,
  tipo_producto_id,
  material_id,
  medida_id,
  color_id,
  estado,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'q',
        sql.NVarChar(150),
        q ? `%${q}%` : null
      )
      .input(
        'tipo_producto_id',
        sql.Int,
        tipo_producto_id || null
      )
      .input(
        'material_id',
        sql.Int,
        material_id || null
      )
      .input(
        'medida_id',
        sql.Int,
        medida_id || null
      )
      .input(
        'color_id',
        sql.Int,
        color_id || null
      )
      .input(
        'estado',
        sql.VarChar(20),
        estado || 'TODOS'
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        SELECT
          s.stock_producto_terminado_id,

          s.producto_id,

          p.tipo_producto_id,
          tp.nombre AS tipo_producto,

          p.material_id,
          mat.nombre AS material,

          p.medida_id,
          med.nombre AS medida,

          p.color_id,
          col.nombre AS color,

          s.unidad_medida_id,
          um.codigo AS unidad,

          s.cantidad_presentacion,
          s.unidad_presentacion_id,
          up.codigo AS unidad_presentacion,

          s.cantidad_disponible,

          CASE
            WHEN s.cantidad_presentacion > 0
            THEN
              CONVERT(
                decimal(18, 3),
                s.cantidad_disponible /
                s.cantidad_presentacion
              )
            ELSE 0
          END AS presentaciones_disponibles,

          CASE
            WHEN s.cantidad_disponible > 0
            THEN 'CON_STOCK'
            ELSE 'AGOTADO'
          END AS estado_stock,

          s.created_at,
          s.updated_at,

          COUNT(*) OVER()
            AS total_registros

        FROM inventario.StockProductoTerminado s

        INNER JOIN catalog.Producto p
          ON s.producto_id =
             p.producto_id

        INNER JOIN catalog.TipoProducto tp
          ON p.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Material mat
          ON p.material_id =
             mat.material_id

        INNER JOIN catalog.Medida med
          ON p.medida_id =
             med.medida_id

        INNER JOIN catalog.Color col
          ON p.color_id =
             col.color_id

        INNER JOIN catalog.UnidadMedida um
          ON s.unidad_medida_id =
             um.unidad_medida_id

        INNER JOIN catalog.UnidadMedida up
          ON s.unidad_presentacion_id =
             up.unidad_medida_id

        WHERE
          p.activo = 1

          AND (
            @tipo_producto_id IS NULL
            OR p.tipo_producto_id =
               @tipo_producto_id
          )

          AND (
            @material_id IS NULL
            OR p.material_id =
               @material_id
          )

          AND (
            @medida_id IS NULL
            OR p.medida_id =
               @medida_id
          )

          AND (
            @color_id IS NULL
            OR p.color_id =
               @color_id
          )

          AND (
            @estado = 'TODOS'
            OR (
              @estado = 'CON_STOCK'
              AND s.cantidad_disponible > 0
            )
            OR (
              @estado = 'AGOTADO'
              AND s.cantidad_disponible = 0
            )
          )

          AND (
            @q IS NULL
            OR tp.nombre LIKE @q
            OR mat.nombre LIKE @q
            OR med.nombre LIKE @q
            OR col.nombre LIKE @q
            OR p.codigo_producto LIKE @q
            OR p.descripcion LIKE @q
          )

        ORDER BY
          tp.nombre ASC,
          mat.nombre ASC,
          med.nombre ASC,
          col.nombre ASC,
          s.cantidad_presentacion ASC,
          s.stock_producto_terminado_id ASC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const presentaciones =
    result.recordset;

  const total =
    presentaciones.length > 0
      ? Number(
          presentaciones[0]
            .total_registros
        )
      : 0;

  return {
    presentaciones,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const obtenerPresentacionPorId = async (
  stock_producto_terminado_id
) => {
  const pool =
    await getConnection();

  const result =
    await pool.request()
      .input(
        'stock_producto_terminado_id',
        sql.Int,
        stock_producto_terminado_id
      )
      .query(`
        SELECT
          s.stock_producto_terminado_id,

          s.producto_id,

          p.tipo_producto_id,
          tp.nombre AS tipo_producto,

          p.material_id,
          mat.nombre AS material,

          p.medida_id,
          med.nombre AS medida,

          p.color_id,
          col.nombre AS color,

          p.descripcion
            AS descripcion_producto,

          s.unidad_medida_id,
          um.codigo AS unidad,

          s.cantidad_presentacion,
          s.unidad_presentacion_id,
          up.codigo AS unidad_presentacion,

          s.cantidad_disponible,

          CASE
            WHEN s.cantidad_presentacion > 0
            THEN
              CONVERT(
                decimal(18, 3),
                s.cantidad_disponible /
                s.cantidad_presentacion
              )
            ELSE 0
          END AS presentaciones_disponibles,

          CASE
            WHEN s.cantidad_disponible > 0
            THEN 'CON_STOCK'
            ELSE 'AGOTADO'
          END AS estado_stock,

          s.created_at,
          s.updated_at,

          uc.nombre_completo
            AS creado_por,

          uu.nombre_completo
            AS actualizado_por

        FROM inventario.StockProductoTerminado s

        INNER JOIN catalog.Producto p
          ON s.producto_id =
             p.producto_id

        INNER JOIN catalog.TipoProducto tp
          ON p.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Material mat
          ON p.material_id =
             mat.material_id

        INNER JOIN catalog.Medida med
          ON p.medida_id =
             med.medida_id

        INNER JOIN catalog.Color col
          ON p.color_id =
             col.color_id

        INNER JOIN catalog.UnidadMedida um
          ON s.unidad_medida_id =
             um.unidad_medida_id

        INNER JOIN catalog.UnidadMedida up
          ON s.unidad_presentacion_id =
             up.unidad_medida_id

        INNER JOIN auth.Usuario uc
          ON s.created_by_usuario_id =
             uc.usuario_id

        LEFT JOIN auth.Usuario uu
          ON s.updated_by_usuario_id =
             uu.usuario_id

        WHERE
          s.stock_producto_terminado_id =
          @stock_producto_terminado_id;
      `);

  return result.recordset[0] ||
    null;
};


const listarMovimientosPresentacion = async ({
  stock_producto_terminado_id,
  tipo_movimiento,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'stock_producto_terminado_id',
        sql.Int,
        stock_producto_terminado_id
      )
      .input(
        'tipo_movimiento',
        sql.VarChar(30),
        tipo_movimiento || null
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        SELECT
          mpt.movimiento_producto_terminado_id,
          mpt.stock_producto_terminado_id,
          mpt.tipo_movimiento,
          mpt.cantidad,
          mpt.fecha_movimiento,
          mpt.observacion,

          mpt.produccion_detalle_id,
          prod.produccion_id,

          mpt.entrega_detalle_id,
          e.entrega_id,
          e.pedido_id,

          u.nombre_completo
            AS registrado_por,

          COUNT(*) OVER()
            AS total_registros

        FROM inventario.MovimientoProductoTerminado mpt

        INNER JOIN auth.Usuario u
          ON mpt.created_by_usuario_id =
             u.usuario_id

        LEFT JOIN produccion.ProduccionDetalle pd
          ON mpt.produccion_detalle_id =
             pd.produccion_detalle_id

        LEFT JOIN produccion.Produccion prod
          ON pd.produccion_id =
             prod.produccion_id

        LEFT JOIN ventas.EntregaDetalle ed
          ON mpt.entrega_detalle_id =
             ed.entrega_detalle_id

        LEFT JOIN ventas.Entrega e
          ON ed.entrega_id =
             e.entrega_id

        WHERE
          mpt.stock_producto_terminado_id =
          @stock_producto_terminado_id

          AND (
            @tipo_movimiento IS NULL
            OR mpt.tipo_movimiento =
               @tipo_movimiento
          )

        ORDER BY
          mpt.fecha_movimiento DESC,
          mpt.movimiento_producto_terminado_id DESC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const movimientos =
    result.recordset;

  const total =
    movimientos.length > 0
      ? Number(
          movimientos[0]
            .total_registros
        )
      : 0;

  return {
    movimientos,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const obtenerIndicadoresAlmacenProductoTerminado =
  async () => {
    const pool =
      await getConnection();

    const result =
      await pool.request()
        .query(`
          SELECT
            ISNULL(
              SUM(
                CASE
                  WHEN um.codigo = 'KG'
                  THEN s.cantidad_disponible
                  ELSE 0
                END
              ),
              0
            ) AS stock_disponible_kg,

            COUNT(
              DISTINCT
              CASE
                WHEN s.cantidad_disponible > 0
                THEN s.producto_id
                ELSE NULL
              END
            ) AS productos_con_stock,

            ISNULL(
              SUM(
                CASE
                  WHEN s.cantidad_disponible > 0
                  THEN 1
                  ELSE 0
                END
              ),
              0
            ) AS presentaciones_con_stock

          FROM inventario.StockProductoTerminado s

          INNER JOIN catalog.UnidadMedida um
            ON s.unidad_medida_id =
               um.unidad_medida_id;
        `);

    return result.recordset[0];
  };


module.exports = {
  listarResumenProductoTerminado,
  listarPresentacionesProductoTerminado,
  obtenerPresentacionPorId,
  listarMovimientosPresentacion,
  obtenerIndicadoresAlmacenProductoTerminado
};

~~~

---

## src\modules\almacenProductoTerminado\almacenProductoTerminado.routes.js

~~~javascript
const express = require('express');

const {
  obtenerResumen,
  obtenerPresentaciones,
  obtenerPresentacion,
  obtenerMovimientos,
  obtenerIndicadores
} = require('./almacenProductoTerminado.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router =
  express.Router();


router.get(
  '/indicadores',
  verificarToken,
  obtenerIndicadores
);


router.get(
  '/resumen',
  verificarToken,
  obtenerResumen
);


router.get(
  '/presentaciones',
  verificarToken,
  obtenerPresentaciones
);


router.get(
  '/presentaciones/:stock_producto_terminado_id/movimientos',
  verificarToken,
  obtenerMovimientos
);


router.get(
  '/presentaciones/:stock_producto_terminado_id',
  verificarToken,
  obtenerPresentacion
);


module.exports =
  router;

~~~

---

## src\modules\auth\auth.controller.js

~~~javascript
const bcrypt = require('bcryptjs');
const generarToken = require('../../utils/generarToken');

const {
  buscarUsuarioPorCorreo,
  obtenerRolesPorUsuario,
  listarRolesActivos,
  crearUsuario
} = require('./auth.model');

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        mensaje: 'Correo y contraseña son obligatorios'
      });
    }

    const usuario = await buscarUsuarioPorCorreo(correo.trim().toLowerCase());

    if (!usuario) {
      return res.status(401).json({
        mensaje: 'Credenciales inválidas'
      });
    }

    if (!usuario.activo) {
      return res.status(403).json({
        mensaje: 'El usuario está inactivo'
      });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password_hash);

    if (!passwordValido) {
      return res.status(401).json({
        mensaje: 'Credenciales inválidas'
      });
    }

    const roles = await obtenerRolesPorUsuario(usuario.usuario_id);

    const usuarioToken = {
      usuario_id: usuario.usuario_id,
      correo: usuario.correo,
      roles
    };

    const token = generarToken(usuarioToken);

    res.json({
      mensaje: 'Login correcto',
      token,
      usuario: {
        usuario_id: usuario.usuario_id,
        nombre_completo: usuario.nombre_completo,
        correo: usuario.correo,
        roles
      }
    });
  } catch (error) {
    console.error('Error login:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al iniciar sesión'
    });
  }
};

const obtenerRoles = async (req, res) => {
  try {
    const roles = await listarRolesActivos();

    res.json({
      mensaje: 'Roles obtenidos correctamente',
      roles
    });
  } catch (error) {
    console.error('Error obtener roles:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener roles'
    });
  }
};

const crearUsuarioAdmin = async (req, res) => {
  try {
    let {
      nombre_completo,
      correo,
      password,
      rol_id
    } = req.body;

    if (!nombre_completo || !correo || !password || !rol_id) {
      return res.status(400).json({
        mensaje: 'Nombre, correo, contraseña y rol son obligatorios'
      });
    }

    nombre_completo = nombre_completo.trim();
    correo = correo.trim().toLowerCase();

    if (password.length < 8) {
      return res.status(400).json({
        mensaje: 'La contraseña debe tener mínimo 8 caracteres'
      });
    }

    const usuarioExistente = await buscarUsuarioPorCorreo(correo);

    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: 'Ya existe un usuario con ese correo'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const nuevoUsuario = await crearUsuario({
      nombre_completo,
      correo,
      password_hash,
      rol_id: Number(rol_id),
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuario: nuevoUsuario
    });
  } catch (error) {
    console.error('Error crear usuario:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al crear usuario'
    });
  }
};

module.exports = {
  login,
  obtenerRoles,
  crearUsuarioAdmin
};
~~~

---

## src\modules\auth\auth.model.js

~~~javascript
const { getConnection, sql } = require('../../config/db');

const buscarUsuarioPorCorreo = async (correo) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('correo', sql.VarChar(150), correo)
    .query(`
      SELECT 
        usuario_id,
        nombre_completo,
        correo,
        password_hash,
        activo
      FROM auth.Usuario
      WHERE correo = @correo;
    `);

  return result.recordset[0];
};

const obtenerRolesPorUsuario = async (usuario_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('usuario_id', sql.Int, usuario_id)
    .query(`
      SELECT r.nombre
      FROM auth.UsuarioRol ur
      INNER JOIN auth.Rol r 
        ON ur.rol_id = r.rol_id
      WHERE ur.usuario_id = @usuario_id
        AND r.activo = 1;
    `);

  return result.recordset.map((row) => row.nombre);
};

const listarRolesActivos = async () => {
  const pool = await getConnection();

  const result = await pool.request()
    .query(`
      SELECT
        rol_id,
        nombre,
        descripcion
      FROM auth.Rol
      WHERE activo = 1
      ORDER BY nombre ASC;
    `);

  return result.recordset;
};

const crearUsuario = async ({
  nombre_completo,
  correo,
  password_hash,
  rol_id,
  created_by_usuario_id
}) => {
  const pool = await getConnection();

  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const requestUsuario = new sql.Request(transaction);

    const usuarioResult = await requestUsuario
      .input('nombre_completo', sql.NVarChar(150), nombre_completo)
      .input('correo', sql.VarChar(150), correo)
      .input('password_hash', sql.NVarChar(255), password_hash)
      .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
      .query(`
        INSERT INTO auth.Usuario (
          nombre_completo,
          correo,
          password_hash,
          created_by_usuario_id
        )
        OUTPUT 
          INSERTED.usuario_id, 
          INSERTED.nombre_completo, 
          INSERTED.correo,
          INSERTED.activo,
          INSERTED.created_at
        VALUES (
          @nombre_completo,
          @correo,
          @password_hash,
          @created_by_usuario_id
        );
      `);

    const nuevoUsuario = usuarioResult.recordset[0];

    const requestRol = new sql.Request(transaction);

    await requestRol
      .input('usuario_id', sql.Int, nuevoUsuario.usuario_id)
      .input('rol_id', sql.Int, rol_id)
      .query(`
        INSERT INTO auth.UsuarioRol (
          usuario_id, 
          rol_id
        )
        VALUES (
          @usuario_id, 
          @rol_id
        );
      `);

    await transaction.commit();

    return nuevoUsuario;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  buscarUsuarioPorCorreo,
  obtenerRolesPorUsuario,
  listarRolesActivos,
  crearUsuario
};
~~~

---

## src\modules\auth\auth.routes.js

~~~javascript
const express = require('express');

const {
  login,
  obtenerRoles,
  crearUsuarioAdmin
} = require('./auth.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const {
  permitirRoles
} = require('../../middlewares/role.middleware');

const router = express.Router();

router.post('/login', login);

router.get(
  '/roles',
  verificarToken,
  permitirRoles('ADMIN'),
  obtenerRoles
);

router.post(
  '/usuarios',
  verificarToken,
  permitirRoles('ADMIN'),
  crearUsuarioAdmin
);

module.exports = router;
~~~

---

## src\modules\catalogos\catalogo.controller.js

~~~javascript
const {
  listarCatalogo,
  buscarPorNombre,
  crearCatalogo,
  actualizarCatalogo,
  eliminarCatalogo,
  listarUnidadesMedida
} = require('./catalogo.model');

const catalogosValidos = [
  'tiposProducto',
  'medidas',
  'colores',
  'materiales'
];

const validarCatalogo = (catalogo) => {
  return catalogosValidos.includes(catalogo);
};

const obtenerCatalogo = async (req, res) => {
  try {
    const { catalogo } = req.params;

    if (!validarCatalogo(catalogo)) {
      return res.status(400).json({
        mensaje: 'Catálogo no válido'
      });
    }

    const items = await listarCatalogo(catalogo);

    res.json({
      mensaje: 'Catálogo obtenido correctamente',
      catalogo,
      items
    });

  } catch (error) {
    console.error('Error obtener catálogo:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener catálogo'
    });
  }
};

const registrarCatalogo = async (req, res) => {
  try {
    const { catalogo } = req.params;
    const { nombre } = req.body;

    if (!validarCatalogo(catalogo)) {
      return res.status(400).json({
        mensaje: 'Catálogo no válido'
      });
    }

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({
        mensaje: 'El nombre es obligatorio'
      });
    }

    const nombreNormalizado = nombre.trim().toUpperCase();

    const existente = await buscarPorNombre(catalogo, nombreNormalizado);

    if (existente) {
      return res.status(409).json({
        mensaje: 'Ya existe un registro con ese nombre'
      });
    }

    const item = await crearCatalogo({
      catalogo,
      nombre: nombreNormalizado,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Registro creado correctamente',
      catalogo,
      item
    });

  } catch (error) {
    console.error('Error registrar catálogo:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar catálogo'
    });
  }
};

const editarCatalogo = async (req, res) => {
  try {
    const { catalogo, id } = req.params;
    const { nombre } = req.body;

    if (!validarCatalogo(catalogo)) {
      return res.status(400).json({
        mensaje: 'Catálogo no válido'
      });
    }

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({
        mensaje: 'El nombre es obligatorio'
      });
    }

    const nombreNormalizado = nombre.trim().toUpperCase();

    const item = await actualizarCatalogo({
      catalogo,
      id,
      nombre: nombreNormalizado
    });

    if (!item) {
      return res.status(404).json({
        mensaje: 'Registro no encontrado'
      });
    }

    res.json({
      mensaje: 'Registro actualizado correctamente',
      catalogo,
      item
    });

  } catch (error) {
    console.error('Error editar catálogo:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al editar catálogo'
    });
  }
};

const darBajaCatalogo = async (req, res) => {
  try {
    const { catalogo, id } = req.params;

    if (!validarCatalogo(catalogo)) {
      return res.status(400).json({
        mensaje: 'Catálogo no válido'
      });
    }

    const item = await eliminarCatalogo({
      catalogo,
      id
    });

    if (!item) {
      return res.status(404).json({
        mensaje: 'Registro no encontrado'
      });
    }

    res.json({
      mensaje: 'Registro dado de baja correctamente',
      catalogo,
      item
    });

  } catch (error) {
    console.error('Error eliminar catálogo:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al eliminar catálogo'
    });
  }
};

const obtenerUnidadesMedida = async (req, res) => {
  try {
    const unidades = await listarUnidadesMedida();

    res.json({
      mensaje: 'Unidades de medida obtenidas correctamente',
      unidades
    });

  } catch (error) {
    console.error('Error obtener unidades:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener unidades de medida'
    });
  }
};

module.exports = {
  obtenerCatalogo,
  registrarCatalogo,
  editarCatalogo,
  darBajaCatalogo,
  obtenerUnidadesMedida
};
~~~

---

## src\modules\catalogos\catalogo.model.js

~~~javascript
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
~~~

---

## src\modules\catalogos\catalogo.routes.js

~~~javascript
const express = require('express');

const {
  obtenerCatalogo,
  registrarCatalogo,
  editarCatalogo,
  darBajaCatalogo,
  obtenerUnidadesMedida
} = require('./catalogo.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/unidades-medida',
  verificarToken,
  obtenerUnidadesMedida
);

router.get(
  '/:catalogo',
  verificarToken,
  obtenerCatalogo
);

router.post(
  '/:catalogo',
  verificarToken,
  registrarCatalogo
);

router.put(
  '/:catalogo/:id',
  verificarToken,
  editarCatalogo
);

router.delete(
  '/:catalogo/:id',
  verificarToken,
  darBajaCatalogo
);

module.exports = router;
~~~

---

## src\modules\clientes\cliente.controller.js

~~~javascript
const {
  listarClientes,
  listarClientesSelect,
  obtenerClientePorId,
  buscarClientePorRuc,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  listarPreciosCliente,
  crearPrecioCliente
} = require('./cliente.model');

const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};

const obtenerClientes = async (req, res) => {
  try {
    const {
      q,
      page = 1,
      limit = 10
    } = req.query;

    const resultado = await listarClientes({
      q: q || null,
      page: Number(page),
      limit: Number(limit)
    });

    res.json({
      mensaje: 'Clientes obtenidos correctamente',
      clientes: resultado.clientes,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error('Error listar clientes:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar clientes'
    });
  }
};

const obtenerClientesSelect = async (req, res) => {
  try {
    const clientes = await listarClientesSelect();

    res.json({
      mensaje: 'Clientes para selección obtenidos correctamente',
      clientes
    });

  } catch (error) {
    console.error('Error listar clientes select:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar clientes para selección'
    });
  }
};

const obtenerCliente = async (req, res) => {
  try {
    const { cliente_id } = req.params;

    const cliente = await obtenerClientePorId(cliente_id);

    if (!cliente) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.json({
      mensaje: 'Cliente obtenido correctamente',
      cliente
    });

  } catch (error) {
    console.error('Error obtener cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener cliente'
    });
  }
};

const registrarCliente = async (req, res) => {
  try {
    let {
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      agencia_entrega
    } = req.body;

    if (!ruc || !razon_social) {
      return res.status(400).json({
        mensaje: 'RUC y razón social son obligatorios'
      });
    }

    ruc = ruc.trim();
    razon_social = razon_social.trim().toUpperCase();

    direccion = direccion ? direccion.trim() : null;
    telefono = telefono ? telefono.trim() : null;
    correo = correo ? correo.trim() : null;
    agencia_entrega = agencia_entrega ? agencia_entrega.trim().toUpperCase() : null;

    if (ruc.length !== 11 || /[^0-9]/.test(ruc)) {
      return res.status(400).json({
        mensaje: 'El RUC debe tener 11 dígitos numéricos'
      });
    }

    const clienteExistente = await buscarClientePorRuc(ruc);

    if (clienteExistente) {
      return res.status(409).json({
        mensaje: 'Ya existe un cliente con ese RUC'
      });
    }

    const cliente = await crearCliente({
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      agencia_entrega,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Cliente registrado correctamente',
      cliente
    });

  } catch (error) {
    console.error('Error registrar cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar cliente'
    });
  }
};

const editarCliente = async (req, res) => {
  try {
    const { cliente_id } = req.params;

    let {
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      agencia_entrega
    } = req.body;

    if (!ruc || !razon_social) {
      return res.status(400).json({
        mensaje: 'RUC y razón social son obligatorios'
      });
    }

    ruc = ruc.trim();
    razon_social = razon_social.trim().toUpperCase();

    direccion = direccion ? direccion.trim() : null;
    telefono = telefono ? telefono.trim() : null;
    correo = correo ? correo.trim() : null;
    agencia_entrega = agencia_entrega ? agencia_entrega.trim().toUpperCase() : null;

    if (ruc.length !== 11 || /[^0-9]/.test(ruc)) {
      return res.status(400).json({
        mensaje: 'El RUC debe tener 11 dígitos numéricos'
      });
    }

    const clienteExistente = await buscarClientePorRuc(ruc);

    if (
      clienteExistente &&
      Number(clienteExistente.cliente_id) !== Number(cliente_id)
    ) {
      return res.status(409).json({
        mensaje: 'Ya existe otro cliente con ese RUC'
      });
    }

    const cliente = await actualizarCliente({
      cliente_id,
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      agencia_entrega,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!cliente) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.json({
      mensaje: 'Cliente actualizado correctamente',
      cliente
    });

  } catch (error) {
    console.error('Error editar cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al editar cliente'
    });
  }
};

const darBajaCliente = async (req, res) => {
  try {
    const { cliente_id } = req.params;

    const cliente = await eliminarCliente({
      cliente_id,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!cliente) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.json({
      mensaje: 'Cliente dado de baja correctamente',
      cliente
    });

  } catch (error) {
    console.error('Error eliminar cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al dar de baja cliente'
    });
  }
};

const obtenerPreciosCliente = async (req, res) => {
  try {
    const {
      cliente_id,
      q,
      page = 1,
      limit = 10
    } = req.query;

    const resultado = await listarPreciosCliente({
      cliente_id: cliente_id ? Number(cliente_id) : null,
      q: q || null,
      page: Number(page),
      limit: Number(limit)
    });

    res.json({
      mensaje: 'Historial de precios obtenido correctamente',
      precios: resultado.precios,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error('Error listar precios de cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar historial de precios'
    });
  }
};

const registrarPrecioCliente = async (req, res) => {
  try {
    let {
      cliente_id,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      fecha_precio,
      precio_unitario,
      moneda_codigo,
      observacion
    } = req.body;

    if (!cliente_id) {
      return res.status(400).json({
        mensaje: 'El cliente es obligatorio'
      });
    }

    if (!tipo_producto_id || !medida_id || !color_id || !material_id) {
      return res.status(400).json({
        mensaje: 'Tipo, medida, color y material son obligatorios'
      });
    }

    if (!precio_unitario || Number(precio_unitario) <= 0) {
      return res.status(400).json({
        mensaje: 'El precio debe ser mayor a 0'
      });
    }

    if (!moneda_codigo) {
      return res.status(400).json({
        mensaje: 'La moneda es obligatoria'
      });
    }

    moneda_codigo = moneda_codigo.toUpperCase();

    if (!['PEN', 'USD'].includes(moneda_codigo)) {
      return res.status(400).json({
        mensaje: 'La moneda debe ser PEN o USD'
      });
    }

    fecha_precio = fecha_precio || fechaActual();

    observacion = observacion
      ? observacion.trim()
      : null;

    const precio = await crearPrecioCliente({
      cliente_id,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      fecha_precio,
      precio_unitario,
      moneda_codigo,
      observacion,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Precio de cliente registrado correctamente',
      precio
    });

  } catch (error) {
    console.error('Error registrar precio cliente:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar precio de cliente'
    });
  }
};

module.exports = {
  obtenerClientes,
  obtenerClientesSelect,
  obtenerCliente,
  registrarCliente,
  editarCliente,
  darBajaCliente,
  obtenerPreciosCliente,
  registrarPrecioCliente
};
~~~

---

## src\modules\clientes\cliente.model.js

~~~javascript
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
~~~

---

## src\modules\clientes\cliente.routes.js

~~~javascript
const express = require('express');

const {
  obtenerClientes,
  obtenerClientesSelect,
  obtenerCliente,
  registrarCliente,
  editarCliente,
  darBajaCliente,
  obtenerPreciosCliente,
  registrarPrecioCliente
} = require('./cliente.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  obtenerClientes
);

router.get(
  '/select',
  verificarToken,
  obtenerClientesSelect
);

router.get(
  '/precios',
  verificarToken,
  obtenerPreciosCliente
);

router.post(
  '/precios',
  verificarToken,
  registrarPrecioCliente
);

router.get(
  '/:cliente_id',
  verificarToken,
  obtenerCliente
);

router.post(
  '/',
  verificarToken,
  registrarCliente
);

router.put(
  '/:cliente_id',
  verificarToken,
  editarCliente
);

router.delete(
  '/:cliente_id',
  verificarToken,
  darBajaCliente
);

module.exports = router;
~~~

---

## src\modules\compras\compra.controller.js

~~~javascript
const {
  listarCompras,
  obtenerCompraPorId,
  crearCompraConDetalles
} = require('./compra.model');

const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};

const obtenerCompras = async (req, res) => {
  try {
    const {
      proveedor_id,
      q,
      page = 1,
      limit = 10
    } = req.query;

    const resultado = await listarCompras({
      proveedor_id: proveedor_id ? Number(proveedor_id) : null,
      q: q || null,
      page: Number(page),
      limit: Number(limit)
    });

    res.json({
      mensaje: 'Compras obtenidas correctamente',
      compras: resultado.compras,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error('Error listar compras:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar compras'
    });
  }
};

const obtenerCompra = async (req, res) => {
  try {
    const { compra_id } = req.params;

    const compra = await obtenerCompraPorId(compra_id);

    if (!compra) {
      return res.status(404).json({
        mensaje: 'Compra no encontrada'
      });
    }

    res.json({
      mensaje: 'Compra obtenida correctamente',
      compra
    });

  } catch (error) {
    console.error('Error obtener compra:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener compra'
    });
  }
};

const registrarCompra = async (req, res) => {
  try {
    let {
      proveedor_id,
      fecha_compra,
      numero_documento,
      moneda_codigo,
      descripcion,
      detalles
    } = req.body;

    if (!proveedor_id) {
      return res.status(400).json({
        mensaje: 'El proveedor es obligatorio'
      });
    }

    if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({
        mensaje: 'La compra debe tener al menos un item'
      });
    }

    if (!moneda_codigo) {
      return res.status(400).json({
        mensaje: 'La moneda es obligatoria'
      });
    }

    moneda_codigo = moneda_codigo.toUpperCase();

    if (!['PEN', 'USD'].includes(moneda_codigo)) {
      return res.status(400).json({
        mensaje: 'La moneda debe ser PEN o USD'
      });
    }

    fecha_compra = fecha_compra || fechaActual();

    numero_documento = numero_documento
      ? numero_documento.trim().toUpperCase()
      : null;

    descripcion = descripcion
      ? descripcion.trim()
      : null;

    for (const [index, item] of detalles.entries()) {
      if (
        !item.descripcion_item ||
        !String(item.descripcion_item).trim()
      ) {
        return res.status(400).json({
          mensaje: `El item ${index + 1} debe tener una descripción`
        });
      }

      /*
       * Regla de negocio:
       * las compras generales se registran por descripción.
       *
       * La materia prima se gestiona exclusivamente desde
       * el módulo CompraMateriaPrima, que sí genera stock.
       *
       * Aunque un cliente envíe material_id, se ignora para
       * evitar clasificar accidentalmente una compra general
       * como material.
       */
      item.material_id = null;

      if (!item.cantidad || Number(item.cantidad) <= 0) {
        return res.status(400).json({
          mensaje: `El item ${index + 1} debe tener cantidad mayor a 0`
        });
      }

      if (!item.unidad_medida_id) {
        return res.status(400).json({
          mensaje: `El item ${index + 1} debe tener unidad`
        });
      }

      if (!item.precio_unitario || Number(item.precio_unitario) < 0) {
        return res.status(400).json({
          mensaje: `El item ${index + 1} debe tener precio unitario válido`
        });
      }

      item.descripcion_item = item.descripcion_item
        ? item.descripcion_item.trim().toUpperCase()
        : null;
    }

    const resultado = await crearCompraConDetalles({
      proveedor_id,
      fecha_compra,
      numero_documento,
      moneda_codigo,
      descripcion,
      detalles,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Compra registrada correctamente',
      compra: resultado.compra,
      detalles: resultado.detalles
    });

  } catch (error) {
    console.error('Error registrar compra:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar compra'
    });
  }
};

module.exports = {
  obtenerCompras,
  obtenerCompra,
  registrarCompra
};

~~~

---

## src\modules\compras\compra.model.js

~~~javascript
const { getConnection, sql } = require('../../config/db');

const listarCompras = async ({
  proveedor_id,
  q,
  page = 1,
  limit = 10
}) => {
  const pool = await getConnection();

  const offset = (page - 1) * limit;

  const result = await pool.request()
    .input('proveedor_id', sql.Int, proveedor_id || null)
    .input('q', sql.NVarChar(150), q ? `%${q}%` : null)
    .input('offset', sql.Int, offset)
    .input('limit', sql.Int, limit)
    .query(`
      WITH ComprasResumen AS (
        SELECT
          c.compra_id,
          c.proveedor_id,
          p.ruc,
          p.razon_social,
          c.fecha_compra,
          c.numero_documento,
          c.monto_total,
          c.moneda_codigo,
          c.descripcion,
          c.created_at,
          u.nombre_completo AS registrado_por,
          COUNT(cd.compra_detalle_id) AS cantidad_items
        FROM compras.Compra c
        INNER JOIN compras.Proveedor p
          ON c.proveedor_id = p.proveedor_id
        INNER JOIN auth.Usuario u
          ON c.created_by_usuario_id = u.usuario_id
        LEFT JOIN compras.CompraDetalle cd
          ON c.compra_id = cd.compra_id
        WHERE
          (@proveedor_id IS NULL OR c.proveedor_id = @proveedor_id)
          AND (
            @q IS NULL
            OR p.razon_social LIKE @q
            OR p.ruc LIKE @q
            OR c.numero_documento LIKE @q
            OR c.descripcion LIKE @q
          )
        GROUP BY
          c.compra_id,
          c.proveedor_id,
          p.ruc,
          p.razon_social,
          c.fecha_compra,
          c.numero_documento,
          c.monto_total,
          c.moneda_codigo,
          c.descripcion,
          c.created_at,
          u.nombre_completo
      )
      SELECT
        *,
        COUNT(*) OVER() AS total_registros
      FROM ComprasResumen
      ORDER BY created_at DESC
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY;
    `);

  const compras = result.recordset;

  const total = compras.length > 0
    ? compras[0].total_registros
    : 0;

  return {
    compras,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas: Math.ceil(total / limit)
    }
  };
};

const obtenerCompraPorId = async (compra_id) => {
  const pool = await getConnection();

  const compraResult = await pool.request()
    .input('compra_id', sql.Int, compra_id)
    .query(`
      SELECT
        c.compra_id,
        c.proveedor_id,
        p.ruc,
        p.razon_social,
        p.direccion,
        c.fecha_compra,
        c.numero_documento,
        c.monto_total,
        c.moneda_codigo,
        c.descripcion,
        c.created_at,
        u.nombre_completo AS registrado_por
      FROM compras.Compra c
      INNER JOIN compras.Proveedor p
        ON c.proveedor_id = p.proveedor_id
      INNER JOIN auth.Usuario u
        ON c.created_by_usuario_id = u.usuario_id
      WHERE c.compra_id = @compra_id;
    `);

  const compra = compraResult.recordset[0];

  if (!compra) {
    return null;
  }

  const detallesResult = await pool.request()
    .input('compra_id', sql.Int, compra_id)
    .query(`
      SELECT
        cd.compra_detalle_id,
        cd.compra_id,
        cd.producto_id,
        cd.material_id,
        m.nombre AS material,
        cd.descripcion_item,
        cd.cantidad,
        cd.unidad_medida_id,
        um.codigo AS unidad,
        cd.precio_unitario,
        cd.subtotal
      FROM compras.CompraDetalle cd
      LEFT JOIN catalog.Material m
        ON cd.material_id = m.material_id
      INNER JOIN catalog.UnidadMedida um
        ON cd.unidad_medida_id = um.unidad_medida_id
      WHERE cd.compra_id = @compra_id
      ORDER BY cd.compra_detalle_id ASC;
    `);

  return {
    ...compra,
    detalles: detallesResult.recordset
  };
};

const crearCompraConDetalles = async ({
  proveedor_id,
  fecha_compra,
  numero_documento,
  moneda_codigo,
  descripcion,
  detalles,
  created_by_usuario_id
}) => {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const monto_total = detalles.reduce((total, item) => {
      return total + Number(item.cantidad) * Number(item.precio_unitario);
    }, 0);

    const requestCompra = new sql.Request(transaction);

    const compraResult = await requestCompra
      .input('proveedor_id', sql.Int, proveedor_id)
      .input('fecha_compra', sql.Date, fecha_compra)
      .input('numero_documento', sql.VarChar(100), numero_documento || null)
      .input('monto_total', sql.Decimal(18, 2), monto_total)
      .input('moneda_codigo', sql.Char(3), moneda_codigo)
      .input('descripcion', sql.NVarChar(400), descripcion || null)
      .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
      .query(`
        INSERT INTO compras.Compra (
          proveedor_id,
          fecha_compra,
          numero_documento,
          monto_total,
          moneda_codigo,
          descripcion,
          created_by_usuario_id
        )
        OUTPUT
          INSERTED.compra_id,
          INSERTED.proveedor_id,
          INSERTED.fecha_compra,
          INSERTED.numero_documento,
          INSERTED.monto_total,
          INSERTED.moneda_codigo,
          INSERTED.descripcion,
          INSERTED.created_at
        VALUES (
          @proveedor_id,
          @fecha_compra,
          @numero_documento,
          @monto_total,
          @moneda_codigo,
          @descripcion,
          @created_by_usuario_id
        );
      `);

    const compra = compraResult.recordset[0];

    const detallesCreados = [];

    for (const item of detalles) {
      const requestDetalle = new sql.Request(transaction);

      const detalleResult = await requestDetalle
        .input('compra_id', sql.Int, compra.compra_id)
        .input('producto_id', sql.Int, null)
        .input('material_id', sql.Int, null)
        .input('descripcion_item', sql.NVarChar(300), item.descripcion_item || null)
        .input('cantidad', sql.Decimal(18, 3), item.cantidad)
        .input('unidad_medida_id', sql.Int, item.unidad_medida_id)
        .input('precio_unitario', sql.Decimal(18, 4), item.precio_unitario)
        .query(`
          INSERT INTO compras.CompraDetalle (
            compra_id,
            producto_id,
            material_id,
            descripcion_item,
            cantidad,
            unidad_medida_id,
            precio_unitario
          )
          OUTPUT
            INSERTED.compra_detalle_id,
            INSERTED.compra_id,
            INSERTED.material_id,
            INSERTED.descripcion_item,
            INSERTED.cantidad,
            INSERTED.unidad_medida_id,
            INSERTED.precio_unitario,
            INSERTED.subtotal
          VALUES (
            @compra_id,
            @producto_id,
            @material_id,
            @descripcion_item,
            @cantidad,
            @unidad_medida_id,
            @precio_unitario
          );
        `);

      detallesCreados.push(detalleResult.recordset[0]);
    }

    await transaction.commit();

    return {
      compra,
      detalles: detallesCreados
    };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  listarCompras,
  obtenerCompraPorId,
  crearCompraConDetalles
};

~~~

---

## src\modules\compras\compra.routes.js

~~~javascript
const express = require('express');

const {
  obtenerCompras,
  obtenerCompra,
  registrarCompra
} = require('./compra.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  obtenerCompras
);

router.get(
  '/:compra_id',
  verificarToken,
  obtenerCompra
);

router.post(
  '/',
  verificarToken,
  registrarCompra
);

module.exports = router;
~~~

---

## src\modules\comprasMateriaPrima\compraMateriaPrima.controller.js

~~~javascript
const {
  listarComprasMateriaPrima,
  obtenerCompraMateriaPrimaPorId,
  crearCompraMateriaPrima
} = require('./compraMateriaPrima.model');


const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};


const obtenerComprasMateriaPrima = async (
  req,
  res
) => {
  try {
    const {
      proveedor_id,
      q,
      page = 1,
      limit = 10
    } = req.query;

    const pageNumero = Number(page);
    const limitNumero = Number(limit);

    if (
      !Number.isInteger(pageNumero) ||
      pageNumero < 1 ||
      !Number.isInteger(limitNumero) ||
      limitNumero < 1 ||
      limitNumero > 100
    ) {
      return res.status(400).json({
        mensaje: 'Paginación inválida'
      });
    }

    const resultado =
      await listarComprasMateriaPrima({
        proveedor_id:
          proveedor_id
            ? Number(proveedor_id)
            : null,
        q: q ? String(q).trim() : null,
        page: pageNumero,
        limit: limitNumero
      });

    res.json({
      mensaje:
        'Compras de materia prima obtenidas correctamente',
      compras: resultado.compras,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error(
      'Error listar compras de materia prima:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al listar compras de materia prima'
    });
  }
};


const obtenerCompraMateriaPrima = async (
  req,
  res
) => {
  try {
    const compra_materia_prima_id =
      Number(req.params.compra_materia_prima_id);

    if (
      !Number.isInteger(compra_materia_prima_id) ||
      compra_materia_prima_id <= 0
    ) {
      return res.status(400).json({
        mensaje: 'Identificador de compra inválido'
      });
    }

    const compra =
      await obtenerCompraMateriaPrimaPorId(
        compra_materia_prima_id
      );

    if (!compra) {
      return res.status(404).json({
        mensaje: 'Compra de materia prima no encontrada'
      });
    }

    res.json({
      mensaje:
        'Compra de materia prima obtenida correctamente',
      compra
    });

  } catch (error) {
    console.error(
      'Error obtener compra de materia prima:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al obtener compra de materia prima'
    });
  }
};


const registrarCompraMateriaPrima = async (
  req,
  res
) => {
  try {
    let {
      nombre_lote,
      proveedor_id,
      fecha_compra,
      numero_documento,
      moneda_codigo,
      descripcion,
      detalles
    } = req.body;

    const idempotency_key =
      req.get('Idempotency-Key');

    /* ======================================================
       IDEMPOTENCIA
       ====================================================== */

    if (
      !idempotency_key ||
      !idempotency_key.trim()
    ) {
      return res.status(400).json({
        mensaje:
          'La cabecera Idempotency-Key es obligatoria'
      });
    }

    if (idempotency_key.trim().length > 100) {
      return res.status(400).json({
        mensaje:
          'La Idempotency-Key no puede superar 100 caracteres'
      });
    }

    /* ======================================================
       CABECERA
       ====================================================== */

    if (
      !nombre_lote ||
      !String(nombre_lote).trim()
    ) {
      return res.status(400).json({
        mensaje: 'El nombre del lote es obligatorio'
      });
    }

    nombre_lote = String(nombre_lote)
      .trim()
      .toUpperCase();

    if (nombre_lote.length > 150) {
      return res.status(400).json({
        mensaje:
          'El nombre del lote no puede superar 150 caracteres'
      });
    }

    proveedor_id = Number(proveedor_id);

    if (
      !Number.isInteger(proveedor_id) ||
      proveedor_id <= 0
    ) {
      return res.status(400).json({
        mensaje: 'El proveedor es obligatorio'
      });
    }

    fecha_compra = fecha_compra || fechaActual();

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(
        String(fecha_compra)
      )
    ) {
      return res.status(400).json({
        mensaje: 'La fecha de compra no es válida'
      });
    }

    if (!moneda_codigo) {
      return res.status(400).json({
        mensaje: 'La moneda es obligatoria'
      });
    }

    moneda_codigo = String(moneda_codigo)
      .trim()
      .toUpperCase();

    if (!['PEN', 'USD'].includes(moneda_codigo)) {
      return res.status(400).json({
        mensaje: 'La moneda debe ser PEN o USD'
      });
    }

    numero_documento = numero_documento
      ? String(numero_documento)
          .trim()
          .toUpperCase()
      : null;

    if (
      numero_documento &&
      numero_documento.length > 100
    ) {
      return res.status(400).json({
        mensaje:
          'El número de documento no puede superar 100 caracteres'
      });
    }

    descripcion = descripcion
      ? String(descripcion).trim()
      : null;

    if (
      descripcion &&
      descripcion.length > 400
    ) {
      return res.status(400).json({
        mensaje:
          'La descripción no puede superar 400 caracteres'
      });
    }

    /* ======================================================
       DETALLES
       ====================================================== */

    if (
      !Array.isArray(detalles) ||
      detalles.length === 0
    ) {
      return res.status(400).json({
        mensaje:
          'La compra debe tener al menos una materia prima'
      });
    }

    const combinaciones = new Set();
    let montoTotalValidacion = 0;

    detalles = detalles.map((item, index) => {
      const material_id =
        Number(item.material_id);

      const color_id =
        Number(item.color_id);

      const cantidad =
        Number(item.cantidad);

      const precio_unitario =
        Number(item.precio_unitario);

      if (
        !Number.isInteger(material_id) ||
        material_id <= 0
      ) {
        const error = new Error(
          `El item ${index + 1} debe tener material`
        );
        error.statusCode = 400;
        throw error;
      }

      if (
        !Number.isInteger(color_id) ||
        color_id <= 0
      ) {
        const error = new Error(
          `El item ${index + 1} debe tener color`
        );
        error.statusCode = 400;
        throw error;
      }

      if (
        !Number.isFinite(cantidad) ||
        cantidad <= 0
      ) {
        const error = new Error(
          `El item ${index + 1} debe tener cantidad mayor a 0`
        );
        error.statusCode = 400;
        throw error;
      }

      if (
        !Number.isFinite(precio_unitario) ||
        precio_unitario < 0
      ) {
        const error = new Error(
          `El item ${index + 1} debe tener precio unitario válido`
        );
        error.statusCode = 400;
        throw error;
      }

      const clave = `${material_id}-${color_id}`;

      if (combinaciones.has(clave)) {
        const error = new Error(
          `El item ${index + 1} repite la misma combinación de material y color`
        );
        error.statusCode = 400;
        throw error;
      }

      combinaciones.add(clave);

      let descripcion_item =
        item.descripcion_item
          ? String(item.descripcion_item)
              .trim()
              .toUpperCase()
          : null;

      if (
        descripcion_item &&
        descripcion_item.length > 300
      ) {
        const error = new Error(
          `La descripción del item ${index + 1} no puede superar 300 caracteres`
        );
        error.statusCode = 400;
        throw error;
      }

      montoTotalValidacion +=
        cantidad * precio_unitario;

      return {
        material_id,
        color_id,
        cantidad,
        precio_unitario,
        descripcion_item
      };
    });

    if (
      !Number.isFinite(montoTotalValidacion) ||
      montoTotalValidacion <= 0
    ) {
      return res.status(400).json({
        mensaje:
          'El monto total de la compra debe ser mayor a 0'
      });
    }

    /* ======================================================
       CREAR TODO EN UNA SOLA TRANSACCIÓN
       ====================================================== */

    const resultado =
      await crearCompraMateriaPrima({
        nombre_lote,
        proveedor_id,
        fecha_compra,
        numero_documento,
        moneda_codigo,
        descripcion,
        detalles,
        idempotency_key:
          idempotency_key.trim(),
        created_by_usuario_id:
          req.usuario.usuario_id
      });

    const status = resultado.reutilizada
      ? 200
      : 201;

    res.status(status).json({
      mensaje: resultado.reutilizada
        ? 'La compra ya había sido registrada; se devolvió el resultado existente'
        : 'Compra de materia prima registrada correctamente',
      reutilizada: resultado.reutilizada,
      compra: resultado.compra
    });

  } catch (error) {
    console.error(
      'Error registrar compra de materia prima:',
      error.message
    );

    if (error.statusCode) {
      return res.status(error.statusCode).json({
        mensaje: error.message
      });
    }

    res.status(500).json({
      mensaje:
        'Error interno al registrar compra de materia prima'
    });
  }
};


module.exports = {
  obtenerComprasMateriaPrima,
  obtenerCompraMateriaPrima,
  registrarCompraMateriaPrima
};

~~~

---

## src\modules\comprasMateriaPrima\compraMateriaPrima.model.js

~~~javascript
const {
  getConnection,
  sql
} = require('../../config/db');


const crearErrorNegocio = (
  mensaje,
  statusCode = 400
) => {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
};


const obtenerCompraMateriaPrimaPorId = async (
  compra_materia_prima_id
) => {
  const pool = await getConnection();

  const cabeceraResult = await pool.request()
    .input(
      'compra_materia_prima_id',
      sql.Int,
      compra_materia_prima_id
    )
    .query(`
      SELECT
        cmp.compra_materia_prima_id,
        cmp.nombre_lote,
        cmp.proveedor_id,
        p.ruc,
        p.razon_social,
        p.direccion,
        cmp.fecha_compra,
        cmp.numero_documento,
        cmp.monto_total,
        cmp.moneda_codigo,
        cmp.descripcion,
        cmp.created_at,
        u.nombre_completo AS registrado_por
      FROM compras.CompraMateriaPrima cmp
      INNER JOIN compras.Proveedor p
        ON cmp.proveedor_id = p.proveedor_id
      INNER JOIN auth.Usuario u
        ON cmp.created_by_usuario_id = u.usuario_id
      WHERE cmp.compra_materia_prima_id =
            @compra_materia_prima_id;
    `);

  const compra = cabeceraResult.recordset[0];

  if (!compra) {
    return null;
  }

  const detallesResult = await pool.request()
    .input(
      'compra_materia_prima_id',
      sql.Int,
      compra_materia_prima_id
    )
    .query(`
      SELECT
        d.compra_materia_prima_detalle_id,
        d.compra_materia_prima_id,

        d.material_id,
        m.nombre AS material,

        d.color_id,
        c.nombre AS color,

        d.descripcion_item,
        d.cantidad,

        d.unidad_medida_id,
        um.codigo AS unidad,

        d.precio_unitario,
        d.subtotal,

        s.stock_materia_prima_lote_id,
        s.cantidad_inicial,
        s.cantidad_disponible
      FROM compras.CompraMateriaPrimaDetalle d
      INNER JOIN catalog.Material m
        ON d.material_id = m.material_id
      INNER JOIN catalog.Color c
        ON d.color_id = c.color_id
      INNER JOIN catalog.UnidadMedida um
        ON d.unidad_medida_id = um.unidad_medida_id
      INNER JOIN inventario.StockMateriaPrimaLote s
        ON d.compra_materia_prima_detalle_id =
           s.compra_materia_prima_detalle_id
      WHERE d.compra_materia_prima_id =
            @compra_materia_prima_id
      ORDER BY d.compra_materia_prima_detalle_id ASC;
    `);

  return {
    ...compra,
    detalles: detallesResult.recordset
  };
};


const obtenerCompraPorIdempotencyKey = async (
  idempotency_key
) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input(
      'idempotency_key',
      sql.VarChar(100),
      idempotency_key
    )
    .query(`
      SELECT TOP 1
        compra_materia_prima_id
      FROM compras.CompraMateriaPrima
      WHERE idempotency_key = @idempotency_key;
    `);

  const encontrada = result.recordset[0];

  if (!encontrada) {
    return null;
  }

  return obtenerCompraMateriaPrimaPorId(
    encontrada.compra_materia_prima_id
  );
};


const listarComprasMateriaPrima = async ({
  proveedor_id,
  q,
  page = 1,
  limit = 10
}) => {
  const pool = await getConnection();

  const offset = (page - 1) * limit;

  const result = await pool.request()
    .input(
      'proveedor_id',
      sql.Int,
      proveedor_id || null
    )
    .input(
      'q',
      sql.NVarChar(150),
      q ? `%${q}%` : null
    )
    .input(
      'offset',
      sql.Int,
      offset
    )
    .input(
      'limit',
      sql.Int,
      limit
    )
    .query(`
      WITH ComprasResumen AS (
        SELECT
          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.proveedor_id,
          p.ruc,
          p.razon_social,
          cmp.fecha_compra,
          cmp.numero_documento,
          cmp.monto_total,
          cmp.moneda_codigo,
          cmp.descripcion,
          cmp.created_at,
          u.nombre_completo AS registrado_por,

          COUNT(d.compra_materia_prima_detalle_id)
            AS cantidad_items,

          ISNULL(SUM(d.cantidad), 0)
            AS cantidad_total_kg,

          ISNULL(SUM(s.cantidad_disponible), 0)
            AS cantidad_disponible_kg
        FROM compras.CompraMateriaPrima cmp
        INNER JOIN compras.Proveedor p
          ON cmp.proveedor_id = p.proveedor_id
        INNER JOIN auth.Usuario u
          ON cmp.created_by_usuario_id = u.usuario_id
        LEFT JOIN compras.CompraMateriaPrimaDetalle d
          ON cmp.compra_materia_prima_id =
             d.compra_materia_prima_id
        LEFT JOIN inventario.StockMateriaPrimaLote s
          ON d.compra_materia_prima_detalle_id =
             s.compra_materia_prima_detalle_id
        WHERE
          (
            @proveedor_id IS NULL
            OR cmp.proveedor_id = @proveedor_id
          )
          AND (
            @q IS NULL
            OR cmp.nombre_lote LIKE @q
            OR cmp.numero_documento LIKE @q
            OR cmp.descripcion LIKE @q
            OR p.razon_social LIKE @q
            OR p.ruc LIKE @q
          )
        GROUP BY
          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.proveedor_id,
          p.ruc,
          p.razon_social,
          cmp.fecha_compra,
          cmp.numero_documento,
          cmp.monto_total,
          cmp.moneda_codigo,
          cmp.descripcion,
          cmp.created_at,
          u.nombre_completo
      )
      SELECT
        *,
        COUNT(*) OVER() AS total_registros
      FROM ComprasResumen
      ORDER BY
        fecha_compra DESC,
        compra_materia_prima_id DESC
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY;
    `);

  const compras = result.recordset;

  const total = compras.length > 0
    ? compras[0].total_registros
    : 0;

  return {
    compras,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas: Math.ceil(total / limit)
    }
  };
};


const crearCompraMateriaPrima = async ({
  nombre_lote,
  proveedor_id,
  fecha_compra,
  numero_documento,
  moneda_codigo,
  descripcion,
  detalles,
  idempotency_key,
  created_by_usuario_id
}) => {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);

  try {
    /*
     * SERIALIZABLE + la clave UNIQUE permiten que dos
     * solicitudes concurrentes con la misma Idempotency-Key
     * no puedan duplicar la compra ni el stock.
     */
    await transaction.begin(
      sql.ISOLATION_LEVEL.SERIALIZABLE
    );

    const existenteResult =
      await new sql.Request(transaction)
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key
        )
        .query(`
          SELECT TOP 1
            compra_materia_prima_id
          FROM compras.CompraMateriaPrima
            WITH (UPDLOCK, HOLDLOCK)
          WHERE idempotency_key = @idempotency_key;
        `);

    const existente = existenteResult.recordset[0];

    if (existente) {
      await transaction.commit();

      const compraExistente =
        await obtenerCompraMateriaPrimaPorId(
          existente.compra_materia_prima_id
        );

      return {
        reutilizada: true,
        compra: compraExistente
      };
    }

    /* ======================================================
       VALIDAR PROVEEDOR
       ====================================================== */

    const proveedorResult =
      await new sql.Request(transaction)
        .input(
          'proveedor_id',
          sql.Int,
          proveedor_id
        )
        .query(`
          SELECT
            proveedor_id
          FROM compras.Proveedor
          WHERE proveedor_id = @proveedor_id
            AND activo = 1;
        `);

    if (!proveedorResult.recordset[0]) {
      throw crearErrorNegocio(
        'El proveedor seleccionado no existe o está inactivo',
        400
      );
    }

    /* ======================================================
       OBTENER UNIDAD KG
       ====================================================== */

    const unidadResult =
      await new sql.Request(transaction)
        .query(`
          SELECT TOP 1
            unidad_medida_id
          FROM catalog.UnidadMedida
          WHERE codigo = 'KG'
            AND activo = 1;
        `);

    const unidadKg = unidadResult.recordset[0];

    if (!unidadKg) {
      throw crearErrorNegocio(
        'No existe una unidad KG activa en el catálogo',
        500
      );
    }

    /* ======================================================
       VALIDAR MATERIALES Y COLORES
       ====================================================== */

    for (const item of detalles) {
      const catalogoResult =
        await new sql.Request(transaction)
          .input(
            'material_id',
            sql.Int,
            item.material_id
          )
          .input(
            'color_id',
            sql.Int,
            item.color_id
          )
          .query(`
            SELECT
              CASE WHEN EXISTS (
                SELECT 1
                FROM catalog.Material
                WHERE material_id = @material_id
                  AND activo = 1
              ) THEN 1 ELSE 0 END
                AS material_valido,

              CASE WHEN EXISTS (
                SELECT 1
                FROM catalog.Color
                WHERE color_id = @color_id
                  AND activo = 1
              ) THEN 1 ELSE 0 END
                AS color_valido;
          `);

      const validacion = catalogoResult.recordset[0];

      if (!validacion.material_valido) {
        throw crearErrorNegocio(
          `El material ${item.material_id} no existe o está inactivo`,
          400
        );
      }

      if (!validacion.color_valido) {
        throw crearErrorNegocio(
          `El color ${item.color_id} no existe o está inactivo`,
          400
        );
      }
    }

    /* ======================================================
       TOTAL
       ====================================================== */

    const monto_total = Number(
      detalles
        .reduce(
          (total, item) =>
            total +
            Number(item.cantidad) *
            Number(item.precio_unitario),
          0
        )
        .toFixed(2)
    );

    if (
      !Number.isFinite(monto_total) ||
      monto_total <= 0
    ) {
      throw crearErrorNegocio(
        'El monto total de la compra debe ser mayor a 0',
        400
      );
    }

    /* ======================================================
       INSERTAR CABECERA
       ====================================================== */

    const compraResult =
      await new sql.Request(transaction)
        .input(
          'nombre_lote',
          sql.NVarChar(150),
          nombre_lote
        )
        .input(
          'proveedor_id',
          sql.Int,
          proveedor_id
        )
        .input(
          'fecha_compra',
          sql.Date,
          fecha_compra
        )
        .input(
          'numero_documento',
          sql.VarChar(100),
          numero_documento || null
        )
        .input(
          'monto_total',
          sql.Decimal(18, 2),
          monto_total
        )
        .input(
          'moneda_codigo',
          sql.Char(3),
          moneda_codigo
        )
        .input(
          'descripcion',
          sql.NVarChar(400),
          descripcion || null
        )
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .query(`
          INSERT INTO compras.CompraMateriaPrima (
            nombre_lote,
            proveedor_id,
            fecha_compra,
            numero_documento,
            monto_total,
            moneda_codigo,
            descripcion,
            idempotency_key,
            created_by_usuario_id
          )
          OUTPUT
            INSERTED.compra_materia_prima_id,
            INSERTED.nombre_lote,
            INSERTED.proveedor_id,
            INSERTED.fecha_compra,
            INSERTED.numero_documento,
            INSERTED.monto_total,
            INSERTED.moneda_codigo,
            INSERTED.descripcion,
            INSERTED.created_at
          VALUES (
            @nombre_lote,
            @proveedor_id,
            @fecha_compra,
            @numero_documento,
            @monto_total,
            @moneda_codigo,
            @descripcion,
            @idempotency_key,
            @created_by_usuario_id
          );
        `);

    const compra = compraResult.recordset[0];
    const detallesCreados = [];

    /* ======================================================
       DETALLE + STOCK + MOVIMIENTO DE ENTRADA
       ====================================================== */

    for (const item of detalles) {
      const detalleResult =
        await new sql.Request(transaction)
          .input(
            'compra_materia_prima_id',
            sql.Int,
            compra.compra_materia_prima_id
          )
          .input(
            'material_id',
            sql.Int,
            item.material_id
          )
          .input(
            'color_id',
            sql.Int,
            item.color_id
          )
          .input(
            'descripcion_item',
            sql.NVarChar(300),
            item.descripcion_item || null
          )
          .input(
            'cantidad',
            sql.Decimal(18, 3),
            item.cantidad
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            unidadKg.unidad_medida_id
          )
          .input(
            'precio_unitario',
            sql.Decimal(18, 4),
            item.precio_unitario
          )
          .query(`
            INSERT INTO compras.CompraMateriaPrimaDetalle (
              compra_materia_prima_id,
              material_id,
              color_id,
              descripcion_item,
              cantidad,
              unidad_medida_id,
              precio_unitario
            )
            OUTPUT
              INSERTED.compra_materia_prima_detalle_id,
              INSERTED.compra_materia_prima_id,
              INSERTED.material_id,
              INSERTED.color_id,
              INSERTED.descripcion_item,
              INSERTED.cantidad,
              INSERTED.unidad_medida_id,
              INSERTED.precio_unitario,
              INSERTED.subtotal
            VALUES (
              @compra_materia_prima_id,
              @material_id,
              @color_id,
              @descripcion_item,
              @cantidad,
              @unidad_medida_id,
              @precio_unitario
            );
          `);

      const detalle = detalleResult.recordset[0];

      const stockResult =
        await new sql.Request(transaction)
          .input(
            'compra_materia_prima_detalle_id',
            sql.Int,
            detalle.compra_materia_prima_detalle_id
          )
          .input(
            'cantidad',
            sql.Decimal(18, 3),
            item.cantidad
          )
          .input(
            'created_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            INSERT INTO inventario.StockMateriaPrimaLote (
              compra_materia_prima_detalle_id,
              cantidad_inicial,
              cantidad_disponible,
              created_by_usuario_id
            )
            OUTPUT
              INSERTED.stock_materia_prima_lote_id,
              INSERTED.compra_materia_prima_detalle_id,
              INSERTED.cantidad_inicial,
              INSERTED.cantidad_disponible,
              INSERTED.created_at
            VALUES (
              @compra_materia_prima_detalle_id,
              @cantidad,
              @cantidad,
              @created_by_usuario_id
            );
          `);

      const stock = stockResult.recordset[0];

      const movimientoResult =
        await new sql.Request(transaction)
          .input(
            'stock_materia_prima_lote_id',
            sql.Int,
            stock.stock_materia_prima_lote_id
          )
          .input(
            'cantidad',
            sql.Decimal(18, 3),
            item.cantidad
          )
          .input(
            'observacion',
            sql.NVarChar(400),
            `Entrada por compra de materia prima - Lote ${nombre_lote}`
          )
          .input(
            'created_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            INSERT INTO inventario.MovimientoMateriaPrima (
              stock_materia_prima_lote_id,
              tipo_movimiento,
              cantidad,
              observacion,
              created_by_usuario_id
            )
            OUTPUT
              INSERTED.movimiento_materia_prima_id,
              INSERTED.stock_materia_prima_lote_id,
              INSERTED.tipo_movimiento,
              INSERTED.cantidad,
              INSERTED.fecha_movimiento
            VALUES (
              @stock_materia_prima_lote_id,
              'ENTRADA_COMPRA',
              @cantidad,
              @observacion,
              @created_by_usuario_id
            );
          `);

      detallesCreados.push({
        ...detalle,
        stock: stock,
        movimiento_entrada:
          movimientoResult.recordset[0]
      });
    }

    await transaction.commit();

    const compraCompleta =
      await obtenerCompraMateriaPrimaPorId(
        compra.compra_materia_prima_id
      );

    return {
      reutilizada: false,
      compra: compraCompleta,
      detalles: detallesCreados
    };

  } catch (error) {
    if (transaction._aborted !== true) {
      try {
        await transaction.rollback();
      } catch (_) {
        // Conservamos el error original.
      }
    }

    /*
     * Defensa extra ante una carrera por la clave UNIQUE.
     */
    if (
      [2601, 2627].includes(error.number) &&
      idempotency_key
    ) {
      const existente =
        await obtenerCompraPorIdempotencyKey(
          idempotency_key
        );

      if (existente) {
        return {
          reutilizada: true,
          compra: existente
        };
      }
    }

    throw error;
  }
};


module.exports = {
  listarComprasMateriaPrima,
  obtenerCompraMateriaPrimaPorId,
  crearCompraMateriaPrima
};

~~~

---

## src\modules\comprasMateriaPrima\compraMateriaPrima.routes.js

~~~javascript
const express = require('express');

const {
  obtenerComprasMateriaPrima,
  obtenerCompraMateriaPrima,
  registrarCompraMateriaPrima
} = require('./compraMateriaPrima.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router = express.Router();


router.get(
  '/',
  verificarToken,
  obtenerComprasMateriaPrima
);


router.get(
  '/:compra_materia_prima_id',
  verificarToken,
  obtenerCompraMateriaPrima
);


router.post(
  '/',
  verificarToken,
  registrarCompraMateriaPrima
);


module.exports = router;

~~~

---

## src\modules\depositos\deposito.controller.js

~~~javascript
const {
  listarTiposDeposito,
  listarPedidosParaDeposito,
  obtenerPedidoParaDeposito,
  obtenerSaldoPorMoneda,
  crearDeposito
} = require('./deposito.model');

const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};

const obtenerTiposDeposito = async (req, res) => {
  try {
    const tipos = await listarTiposDeposito();

    res.json({
      mensaje: 'Tipos de depósito obtenidos correctamente',
      tipos
    });

  } catch (error) {
    console.error('Error listar tipos de depósito:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar tipos de depósito'
    });
  }
};

const obtenerPedidosParaDeposito = async (req, res) => {
  try {
    const {
      cliente_id,
      q,
      page = 1,
      limit = 10
    } = req.query;

    const resultado = await listarPedidosParaDeposito({
      cliente_id: cliente_id ? Number(cliente_id) : null,
      q: q || null,
      page: Number(page),
      limit: Number(limit)
    });

    res.json({
      mensaje: 'Pedidos para depósito obtenidos correctamente',
      pedidos: resultado.pedidos,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error('Error listar pedidos para depósito:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar pedidos para depósito'
    });
  }
};

const obtenerPedidoDeposito = async (req, res) => {
  try {
    const { pedido_id } = req.params;

    const pedido = await obtenerPedidoParaDeposito(pedido_id);

    if (!pedido) {
      return res.status(404).json({
        mensaje: 'Pedido no encontrado'
      });
    }

    res.json({
      mensaje: 'Pedido para depósito obtenido correctamente',
      pedido
    });

  } catch (error) {
    console.error('Error obtener pedido para depósito:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener pedido para depósito'
    });
  }
};

const registrarDeposito = async (req, res) => {
  try {
    let {
      pedido_id,
      tipo_deposito_id,
      fecha_deposito,
      monto,
      moneda_codigo,
      numero_operacion,
      observacion
    } = req.body;

    if (!pedido_id) {
      return res.status(400).json({
        mensaje: 'El pedido es obligatorio'
      });
    }

    if (!tipo_deposito_id) {
      return res.status(400).json({
        mensaje: 'El tipo de depósito es obligatorio'
      });
    }

    if (!monto || Number(monto) <= 0) {
      return res.status(400).json({
        mensaje: 'El monto debe ser mayor a 0'
      });
    }

    if (!moneda_codigo) {
      return res.status(400).json({
        mensaje: 'La moneda es obligatoria'
      });
    }

    moneda_codigo = moneda_codigo.toUpperCase();

    if (!['PEN', 'USD'].includes(moneda_codigo)) {
      return res.status(400).json({
        mensaje: 'La moneda debe ser PEN o USD'
      });
    }

    fecha_deposito = fecha_deposito || fechaActual();

    numero_operacion = numero_operacion
      ? numero_operacion.trim()
      : null;

    observacion = observacion
      ? observacion.trim()
      : null;

    const saldo = await obtenerSaldoPorMoneda({
      pedido_id,
      moneda_codigo
    });

    if (!saldo) {
      return res.status(400).json({
        mensaje: `El pedido no tiene monto registrado en moneda ${moneda_codigo}`
      });
    }

    if (Number(monto) > Number(saldo.saldo_pendiente)) {
      return res.status(400).json({
        mensaje: `El monto excede el saldo pendiente. Saldo disponible: ${saldo.saldo_pendiente} ${moneda_codigo}`
      });
    }

    const deposito = await crearDeposito({
      pedido_id,
      tipo_deposito_id,
      fecha_deposito,
      monto,
      moneda_codigo,
      numero_operacion,
      observacion,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Depósito registrado correctamente',
      deposito
    });

  } catch (error) {
    console.error('Error registrar depósito:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar depósito'
    });
  }
};

module.exports = {
  obtenerTiposDeposito,
  obtenerPedidosParaDeposito,
  obtenerPedidoDeposito,
  registrarDeposito
};
~~~

---

## src\modules\depositos\deposito.model.js

~~~javascript
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
~~~

---

## src\modules\depositos\deposito.routes.js

~~~javascript
const express = require('express');

const {
  obtenerTiposDeposito,
  obtenerPedidosParaDeposito,
  obtenerPedidoDeposito,
  registrarDeposito
} = require('./deposito.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/tipos',
  verificarToken,
  obtenerTiposDeposito
);

router.get(
  '/pedidos',
  verificarToken,
  obtenerPedidosParaDeposito
);

router.get(
  '/pedidos/:pedido_id',
  verificarToken,
  obtenerPedidoDeposito
);

router.post(
  '/',
  verificarToken,
  registrarDeposito
);

module.exports = router;
~~~

---

## src\modules\entregas\entrega.controller.js

~~~javascript
const {
  listarPedidosParaEntrega,
  obtenerPedidoParaEntrega,
  crearEntregaConDetalles
} = require('./entrega.model');


const fechaActual = () => {
  return new Date()
    .toISOString()
    .slice(0, 10);
};


const normalizarIdempotencyKey = (
  req
) => {
  const valor =
    req.get(
      'Idempotency-Key'
    );

  if (!valor) {
    return null;
  }

  return String(valor)
    .trim();
};


const obtenerPedidosParaEntrega =
  async (
    req,
    res
  ) => {
    try {
      const {
        cliente_id,
        q,
        page = 1,
        limit = 10
      } = req.query;

      const pageNumero =
        Number(page);

      const limitNumero =
        Number(limit);

      if (
        !Number.isInteger(
          pageNumero
        ) ||
        pageNumero < 1 ||
        !Number.isInteger(
          limitNumero
        ) ||
        limitNumero < 1 ||
        limitNumero > 100
      ) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      const clienteId =
        cliente_id
          ? Number(
              cliente_id
            )
          : null;

      if (
        clienteId !== null &&
        (
          !Number.isInteger(
            clienteId
          ) ||
          clienteId <= 0
        )
      ) {
        return res.status(400).json({
          mensaje:
            'El cliente enviado no es válido'
        });
      }

      const resultado =
        await listarPedidosParaEntrega({
          cliente_id:
            clienteId,
          q:
            q
              ? String(q).trim()
              : null,
          page:
            pageNumero,
          limit:
            limitNumero
        });

      res.json({
        mensaje:
          'Pedidos para entrega obtenidos correctamente',
        pedidos:
          resultado.pedidos,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error listar pedidos para entrega:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al listar pedidos para entrega'
      });
    }
  };


const obtenerPedidoEntrega =
  async (
    req,
    res
  ) => {
    try {
      const pedido_id =
        Number(
          req.params.pedido_id
        );

      if (
        !Number.isInteger(
          pedido_id
        ) ||
        pedido_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de pedido inválido'
        });
      }

      const pedido =
        await obtenerPedidoParaEntrega(
          pedido_id
        );

      if (!pedido) {
        return res.status(404).json({
          mensaje:
            'Pedido no encontrado'
        });
      }

      res.json({
        mensaje:
          'Pedido para entrega obtenido correctamente',
        pedido
      });

    } catch (error) {
      console.error(
        'Error obtener pedido para entrega:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener pedido para entrega'
      });
    }
  };


const registrarEntrega =
  async (
    req,
    res
  ) => {
    try {
      let {
        pedido_id,
        fecha_entrega,
        comentario_entrega,
        detalles
      } = req.body;

      pedido_id =
        Number(
          pedido_id
        );

      if (
        !Number.isInteger(
          pedido_id
        ) ||
        pedido_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'El pedido es obligatorio'
        });
      }

      if (
        !Array.isArray(
          detalles
        ) ||
        detalles.length === 0
      ) {
        return res.status(400).json({
          mensaje:
            'La entrega debe tener al menos un producto'
        });
      }

      fecha_entrega =
        fecha_entrega ||
        fechaActual();

      comentario_entrega =
        comentario_entrega
          ? String(
              comentario_entrega
            ).trim()
          : null;

      if (
        comentario_entrega &&
        comentario_entrega.length > 500
      ) {
        return res.status(400).json({
          mensaje:
            'El comentario no puede superar 500 caracteres'
        });
      }

      detalles =
        detalles.filter(
          (item) =>
            Number(
              item.cantidad_entregada
            ) > 0
        );

      if (
        detalles.length === 0
      ) {
        return res.status(400).json({
          mensaje:
            'Debe ingresar al menos una cantidad entregada mayor a 0'
        });
      }

      const idsDetalle =
        new Set();

      for (
        const [
          index,
          item
        ]
        of detalles.entries()
      ) {
        const pedidoDetalleId =
          Number(
            item.pedido_detalle_id
          );

        const cantidad =
          Number(
            item.cantidad_entregada
          );

        const unidadId =
          Number(
            item.unidad_medida_id
          );

        if (
          !Number.isInteger(
            pedidoDetalleId
          ) ||
          pedidoDetalleId <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `El producto ${index + 1} no tiene un detalle de pedido válido`
          });
        }

        if (
          idsDetalle.has(
            pedidoDetalleId
          )
        ) {
          return res.status(400).json({
            mensaje:
              'No se puede enviar dos veces el mismo producto del pedido en una sola entrega'
          });
        }

        idsDetalle.add(
          pedidoDetalleId
        );

        if (
          !Number.isFinite(
            cantidad
          ) ||
          cantidad <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `El producto ${index + 1} debe tener una cantidad entregada mayor a 0`
          });
        }

        if (
          !Number.isInteger(
            unidadId
          ) ||
          unidadId <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `El producto ${index + 1} debe tener unidad de medida`
          });
        }

        item.pedido_detalle_id =
          pedidoDetalleId;

        item.cantidad_entregada =
          Number(
            cantidad.toFixed(3)
          );

        item.unidad_medida_id =
          unidadId;

        item.observacion =
          item.observacion
            ? String(
                item.observacion
              ).trim()
            : null;

        if (
          item.observacion &&
          item.observacion.length > 300
        ) {
          return res.status(400).json({
            mensaje:
              `La observación del producto ${index + 1} no puede superar 300 caracteres`
          });
        }
      }

      const idempotency_key =
        normalizarIdempotencyKey(
          req
        );

      if (
        idempotency_key &&
        idempotency_key.length > 100
      ) {
        return res.status(400).json({
          mensaje:
            'Idempotency-Key no puede superar 100 caracteres'
        });
      }

      const resultado =
        await crearEntregaConDetalles({
          pedido_id,
          fecha_entrega,
          comentario_entrega,
          detalles,
          idempotency_key,
          created_by_usuario_id:
            req.usuario.usuario_id
        });

      return res
        .status(
          resultado.reutilizada
            ? 200
            : 201
        )
        .json({
          mensaje:
            resultado.reutilizada
              ? 'La entrega ya había sido registrada; se devolvió el resultado existente'
              : 'Entrega registrada correctamente',
          reutilizada:
            resultado.reutilizada,
          entrega:
            resultado.entrega,
          detalles:
            resultado.detalles
        });

    } catch (error) {
      console.error(
        'Error registrar entrega:',
        error.message
      );

      if (
        error.statusCode
      ) {
        return res
          .status(
            error.statusCode
          )
          .json({
            mensaje:
              error.message
          });
      }

      /*
       * Seguridad adicional:
       * mantenemos compatibilidad con el trigger histórico.
       */
      if (
        error.message &&
        error.message.includes(
          'No se puede entregar una cantidad mayor'
        )
      ) {
        return res.status(400).json({
          mensaje:
            'No se puede entregar una cantidad mayor a la cantidad pendiente'
        });
      }

      res.status(500).json({
        mensaje:
          'Error interno al registrar entrega'
      });
    }
  };


module.exports = {
  obtenerPedidosParaEntrega,
  obtenerPedidoEntrega,
  registrarEntrega
};

~~~

---

## src\modules\entregas\entrega.model.js

~~~javascript
const {
  getConnection,
  sql
} = require('../../config/db');


const crearErrorNegocio = (
  mensaje,
  statusCode = 400
) => {
  const error =
    new Error(
      mensaje
    );

  error.statusCode =
    statusCode;

  return error;
};


const listarPedidosParaEntrega = async ({
  cliente_id,
  q,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'cliente_id',
        sql.Int,
        cliente_id || null
      )
      .input(
        'q',
        sql.NVarChar(150),
        q ? `%${q}%` : null
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        WITH Detalles AS (
          SELECT
            pd.pedido_id,
            pd.pedido_detalle_id,
            pd.cantidad_pedida,

            ISNULL(
              SUM(
                ed.cantidad_entregada
              ),
              0
            ) AS cantidad_entregada

          FROM ventas.PedidoDetalle pd

          LEFT JOIN ventas.EntregaDetalle ed
            ON pd.pedido_detalle_id =
               ed.pedido_detalle_id

          WHERE
            pd.activo = 1

          GROUP BY
            pd.pedido_id,
            pd.pedido_detalle_id,
            pd.cantidad_pedida
        ),

        Resumen AS (
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

            COUNT(
              d.pedido_detalle_id
            ) AS cantidad_items,

            SUM(
              CASE
                WHEN
                  d.cantidad_entregada >=
                  d.cantidad_pedida
                THEN 1
                ELSE 0
              END
            ) AS items_completos,

            SUM(
              CASE
                WHEN
                  d.cantidad_entregada > 0
                  AND
                  d.cantidad_entregada <
                  d.cantidad_pedida
                THEN 1
                ELSE 0
              END
            ) AS items_parciales,

            SUM(
              CASE
                WHEN
                  d.cantidad_entregada = 0
                THEN 1
                ELSE 0
              END
            ) AS items_pendientes

          FROM ventas.Pedido p

          INNER JOIN crm.Cliente c
            ON p.cliente_id =
               c.cliente_id

          INNER JOIN Detalles d
            ON p.pedido_id =
               d.pedido_id

          WHERE
            p.estado_pedido
            IN (
              'REGISTRADO',
              'PARCIAL'
            )

            AND (
              @cliente_id IS NULL
              OR p.cliente_id =
                 @cliente_id
            )

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
            WHEN
              items_completos =
              cantidad_items
            THEN 'COMPLETO'

            WHEN
              items_parciales > 0
              OR items_completos > 0
            THEN 'PARCIAL'

            ELSE 'PENDIENTE'
          END AS estado_entrega_general,

          COUNT(*) OVER()
            AS total_registros

        FROM Resumen

        ORDER BY
          created_at DESC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const pedidos =
    result.recordset;

  const total =
    pedidos.length > 0
      ? Number(
          pedidos[0]
            .total_registros
        )
      : 0;

  return {
    pedidos,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const obtenerPedidoParaEntrega = async (
  pedido_id
) => {
  const pool =
    await getConnection();

  const pedidoResult =
    await pool.request()
      .input(
        'pedido_id',
        sql.Int,
        pedido_id
      )
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
          ON p.cliente_id =
             c.cliente_id

        WHERE
          p.pedido_id =
          @pedido_id;
      `);

  const pedido =
    pedidoResult.recordset[0];

  if (!pedido) {
    return null;
  }

  const detallesResult =
    await pool.request()
      .input(
        'pedido_id',
        sql.Int,
        pedido_id
      )
      .query(`
        SELECT
          pd.pedido_detalle_id,
          pd.pedido_id,

          producto_resuelto.producto_id,

          pd.tipo_producto_id,
          tp.nombre
            AS tipo_producto,

          pd.medida_id,
          m.nombre
            AS medida,

          pd.color_id,
          col.nombre
            AS color,

          pd.material_id,
          mat.nombre
            AS material,

          pd.cantidad_pedida,
          pd.unidad_medida_id,
          um.codigo
            AS unidad,

          ISNULL(
            entregas.cantidad_entregada,
            0
          ) AS cantidad_entregada,

          pd.cantidad_pedida -
          ISNULL(
            entregas.cantidad_entregada,
            0
          ) AS cantidad_pendiente,

          CASE
            WHEN
              ISNULL(
                entregas.cantidad_entregada,
                0
              ) >=
              pd.cantidad_pedida
            THEN 'COMPLETO'

            WHEN
              ISNULL(
                entregas.cantidad_entregada,
                0
              ) > 0
            THEN 'PARCIAL'

            ELSE 'PENDIENTE'
          END AS estado_item,

          pd.cantidad_presentacion,
          pd.unidad_presentacion_id,
          up.codigo
            AS unidad_presentacion,

          stock.stock_producto_terminado_id,

          ISNULL(
            stock.cantidad_disponible,
            0
          ) AS stock_disponible,

          CASE
            WHEN
              pd.cantidad_presentacion > 0
            THEN
              CONVERT(
                decimal(18, 3),
                ISNULL(
                  stock.cantidad_disponible,
                  0
                ) /
                pd.cantidad_presentacion
              )
            ELSE NULL
          END AS presentaciones_disponibles,

          CASE
            WHEN
              producto_resuelto.producto_id
              IS NULL
            THEN 'SIN_PRODUCTO'

            WHEN
              pd.cantidad_presentacion
              IS NULL
              OR
              pd.unidad_presentacion_id
              IS NULL
            THEN 'SIN_PRESENTACION'

            WHEN
              stock.stock_producto_terminado_id
              IS NULL
              OR
              stock.cantidad_disponible <= 0
            THEN 'SIN_STOCK'

            ELSE 'CON_STOCK'
          END AS estado_stock,

          pd.precio_unitario,
          pd.moneda_codigo,
          pd.descripcion_item,
          pd.observacion

        FROM ventas.PedidoDetalle pd

        INNER JOIN catalog.TipoProducto tp
          ON pd.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Medida m
          ON pd.medida_id =
             m.medida_id

        INNER JOIN catalog.Color col
          ON pd.color_id =
             col.color_id

        INNER JOIN catalog.Material mat
          ON pd.material_id =
             mat.material_id

        INNER JOIN catalog.UnidadMedida um
          ON pd.unidad_medida_id =
             um.unidad_medida_id

        LEFT JOIN catalog.UnidadMedida up
          ON pd.unidad_presentacion_id =
             up.unidad_medida_id

        OUTER APPLY (
          SELECT
            ISNULL(
              SUM(
                ed.cantidad_entregada
              ),
              0
            ) AS cantidad_entregada

          FROM ventas.EntregaDetalle ed

          WHERE
            ed.pedido_detalle_id =
            pd.pedido_detalle_id
        ) entregas

        OUTER APPLY (
          SELECT TOP 1
            p.producto_id

          FROM catalog.Producto p

          WHERE
            p.activo = 1

            AND (
              (
                pd.producto_id IS NOT NULL
                AND
                p.producto_id =
                pd.producto_id
              )

              OR

              (
                pd.producto_id IS NULL

                AND
                p.tipo_producto_id =
                pd.tipo_producto_id

                AND
                p.medida_id =
                pd.medida_id

                AND
                p.color_id =
                pd.color_id

                AND
                p.material_id =
                pd.material_id
              )
            )

          ORDER BY
            CASE
              WHEN
                p.producto_id =
                pd.producto_id
              THEN 0
              ELSE 1
            END,
            p.producto_id
        ) producto_resuelto

        OUTER APPLY (
          SELECT TOP 1
            s.stock_producto_terminado_id,
            s.cantidad_disponible

          FROM inventario.StockProductoTerminado s

          WHERE
            s.producto_id =
              producto_resuelto.producto_id

            AND
            s.unidad_medida_id =
              pd.unidad_medida_id

            AND
            s.cantidad_presentacion =
              pd.cantidad_presentacion

            AND
            s.unidad_presentacion_id =
              pd.unidad_presentacion_id
        ) stock

        WHERE
          pd.pedido_id =
          @pedido_id

          AND
          pd.activo = 1

        ORDER BY
          pd.pedido_detalle_id ASC;
      `);

  const detalles =
    detallesResult.recordset;

  const historialResult =
    await pool.request()
      .input(
        'pedido_id',
        sql.Int,
        pedido_id
      )
      .query(`
        SELECT
          e.entrega_id,
          e.fecha_entrega,
          e.comentario_entrega,
          e.created_at,

          u.nombre_completo
            AS registrado_por,

          ed.entrega_detalle_id,
          ed.pedido_detalle_id,
          ed.cantidad_entregada,
          ed.observacion,

          tp.nombre
            AS tipo_producto,

          m.nombre
            AS medida,

          col.nombre
            AS color,

          mat.nombre
            AS material,

          um.codigo
            AS unidad,

          pd.cantidad_presentacion,
          up.codigo
            AS unidad_presentacion

        FROM ventas.Entrega e

        INNER JOIN auth.Usuario u
          ON e.created_by_usuario_id =
             u.usuario_id

        INNER JOIN ventas.EntregaDetalle ed
          ON e.entrega_id =
             ed.entrega_id

        INNER JOIN ventas.PedidoDetalle pd
          ON ed.pedido_detalle_id =
             pd.pedido_detalle_id

        INNER JOIN catalog.TipoProducto tp
          ON pd.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Medida m
          ON pd.medida_id =
             m.medida_id

        INNER JOIN catalog.Color col
          ON pd.color_id =
             col.color_id

        INNER JOIN catalog.Material mat
          ON pd.material_id =
             mat.material_id

        INNER JOIN catalog.UnidadMedida um
          ON ed.unidad_medida_id =
             um.unidad_medida_id

        LEFT JOIN catalog.UnidadMedida up
          ON pd.unidad_presentacion_id =
             up.unidad_medida_id

        WHERE
          e.pedido_id =
          @pedido_id

        ORDER BY
          e.fecha_entrega DESC,
          e.entrega_id DESC,
          ed.entrega_detalle_id ASC;
      `);

  const entregasMap =
    new Map();

  historialResult.recordset
    .forEach(
      (row) => {
        if (
          !entregasMap.has(
            row.entrega_id
          )
        ) {
          entregasMap.set(
            row.entrega_id,
            {
              entrega_id:
                row.entrega_id,

              fecha_entrega:
                row.fecha_entrega,

              comentario_entrega:
                row.comentario_entrega,

              created_at:
                row.created_at,

              registrado_por:
                row.registrado_por,

              detalles: []
            }
          );
        }

        entregasMap
          .get(
            row.entrega_id
          )
          .detalles
          .push({
            entrega_detalle_id:
              row.entrega_detalle_id,

            pedido_detalle_id:
              row.pedido_detalle_id,

            cantidad_entregada:
              row.cantidad_entregada,

            observacion:
              row.observacion,

            producto:
              `${row.tipo_producto} ${row.material} ${row.medida} ${row.color}`,

            unidad:
              row.unidad,

            cantidad_presentacion:
              row.cantidad_presentacion,

            unidad_presentacion:
              row.unidad_presentacion
          });
      }
    );

  let estado_entrega_general =
    'PENDIENTE';

  if (
    detalles.length > 0 &&
    detalles.every(
      (d) =>
        d.estado_item ===
        'COMPLETO'
    )
  ) {
    estado_entrega_general =
      'COMPLETO';

  } else if (
    detalles.some(
      (d) =>
        d.estado_item ===
          'PARCIAL' ||
        d.estado_item ===
          'COMPLETO'
    )
  ) {
    estado_entrega_general =
      'PARCIAL';
  }

  return {
    ...pedido,
    estado_entrega_general,
    detalles,
    historial_entregas:
      Array.from(
        entregasMap.values()
      )
  };
};


const obtenerEntregaCompletaPorId = async (
  entrega_id,
  poolOrTransaction = null
) => {
  const executor =
    poolOrTransaction ||
    await getConnection();

  const requestCabecera =
    poolOrTransaction
      ? new sql.Request(
          poolOrTransaction
        )
      : executor.request();

  const cabeceraResult =
    await requestCabecera
      .input(
        'entrega_id',
        sql.Int,
        entrega_id
      )
      .query(`
        SELECT
          e.entrega_id,
          e.pedido_id,
          e.fecha_entrega,
          e.comentario_entrega,
          e.created_at,
          e.idempotency_key,

          u.nombre_completo
            AS registrado_por

        FROM ventas.Entrega e

        INNER JOIN auth.Usuario u
          ON e.created_by_usuario_id =
             u.usuario_id

        WHERE
          e.entrega_id =
          @entrega_id;
      `);

  const entrega =
    cabeceraResult.recordset[0];

  if (!entrega) {
    return null;
  }

  const requestDetalles =
    poolOrTransaction
      ? new sql.Request(
          poolOrTransaction
        )
      : executor.request();

  const detallesResult =
    await requestDetalles
      .input(
        'entrega_id',
        sql.Int,
        entrega_id
      )
      .query(`
        SELECT
          ed.entrega_detalle_id,
          ed.pedido_detalle_id,
          ed.cantidad_entregada,
          ed.unidad_medida_id,
          um.codigo AS unidad,
          ed.observacion,

          pd.producto_id,

          tp.nombre
            AS tipo_producto,

          mat.nombre
            AS material,

          med.nombre
            AS medida,

          col.nombre
            AS color,

          pd.cantidad_presentacion,
          up.codigo
            AS unidad_presentacion,

          mpt.movimiento_producto_terminado_id,
          mpt.stock_producto_terminado_id,

          s.cantidad_disponible
            AS stock_actual

        FROM ventas.EntregaDetalle ed

        INNER JOIN ventas.PedidoDetalle pd
          ON ed.pedido_detalle_id =
             pd.pedido_detalle_id

        INNER JOIN catalog.TipoProducto tp
          ON pd.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Material mat
          ON pd.material_id =
             mat.material_id

        INNER JOIN catalog.Medida med
          ON pd.medida_id =
             med.medida_id

        INNER JOIN catalog.Color col
          ON pd.color_id =
             col.color_id

        INNER JOIN catalog.UnidadMedida um
          ON ed.unidad_medida_id =
             um.unidad_medida_id

        LEFT JOIN catalog.UnidadMedida up
          ON pd.unidad_presentacion_id =
             up.unidad_medida_id

        LEFT JOIN inventario.MovimientoProductoTerminado mpt
          ON ed.entrega_detalle_id =
             mpt.entrega_detalle_id

        LEFT JOIN inventario.StockProductoTerminado s
          ON mpt.stock_producto_terminado_id =
             s.stock_producto_terminado_id

        WHERE
          ed.entrega_id =
          @entrega_id

        ORDER BY
          ed.entrega_detalle_id ASC;
      `);

  return {
    entrega,
    detalles:
      detallesResult.recordset
  };
};


const crearEntregaConDetalles = async ({
  pedido_id,
  fecha_entrega,
  comentario_entrega,
  detalles,
  idempotency_key,
  created_by_usuario_id
}) => {
  const pool =
    await getConnection();

  const transaction =
    new sql.Transaction(
      pool
    );

  try {
    await transaction.begin(
      sql.ISOLATION_LEVEL.SERIALIZABLE
    );


    /* =====================================================
       1. IDEMPOTENCIA
       ===================================================== */

    if (
      idempotency_key
    ) {
      const existenteResult =
        await new sql.Request(
          transaction
        )
          .input(
            'idempotency_key',
            sql.VarChar(100),
            idempotency_key
          )
          .query(`
            SELECT
              entrega_id
            FROM ventas.Entrega
              WITH (
                UPDLOCK,
                HOLDLOCK
              )
            WHERE
              idempotency_key =
              @idempotency_key;
          `);

      const existente =
        existenteResult
          .recordset[0];

      if (existente) {
        const existenteCompleta =
          await obtenerEntregaCompletaPorId(
            existente.entrega_id,
            transaction
          );

        await transaction.commit();

        return {
          reutilizada: true,
          entrega:
            existenteCompleta.entrega,
          detalles:
            existenteCompleta.detalles
        };
      }
    }


    /* =====================================================
       2. BLOQUEAR Y VALIDAR PEDIDO
       ===================================================== */

    const pedidoResult =
      await new sql.Request(
        transaction
      )
        .input(
          'pedido_id',
          sql.Int,
          pedido_id
        )
        .query(`
          SELECT
            pedido_id,
            estado_pedido
          FROM ventas.Pedido
            WITH (
              UPDLOCK,
              HOLDLOCK
            )
          WHERE
            pedido_id =
            @pedido_id;
        `);

    const pedido =
      pedidoResult.recordset[0];

    if (!pedido) {
      throw crearErrorNegocio(
        'Pedido no encontrado',
        404
      );
    }

    if (
      pedido.estado_pedido ===
      'CANCELADO'
    ) {
      throw crearErrorNegocio(
        'No se puede registrar una entrega para un pedido cancelado'
      );
    }

    if (
      pedido.estado_pedido ===
      'ENTREGADO'
    ) {
      throw crearErrorNegocio(
        'El pedido ya fue entregado completamente'
      );
    }


    /* =====================================================
       3. VALIDAR DETALLES Y RESOLVER STOCK EXACTO
       ===================================================== */

    const detallesValidados =
      [];

    const demandaPorStock =
      new Map();


    for (
      const item
      of detalles
    ) {
      const detalleResult =
        await new sql.Request(
          transaction
        )
          .input(
            'pedido_detalle_id',
            sql.Int,
            item.pedido_detalle_id
          )
          .input(
            'pedido_id',
            sql.Int,
            pedido_id
          )
          .query(`
            SELECT
              pd.pedido_detalle_id,
              pd.pedido_id,
              pd.producto_id,

              producto_resuelto.producto_id
                AS producto_resuelto_id,

              tp.nombre
                AS tipo_producto,

              mat.nombre
                AS material,

              med.nombre
                AS medida,

              col.nombre
                AS color,

              pd.cantidad_pedida,
              pd.unidad_medida_id,
              um.codigo
                AS unidad,

              pd.cantidad_presentacion,
              pd.unidad_presentacion_id,
              up.codigo
                AS unidad_presentacion,

              ISNULL(
                entregado.total_entregado,
                0
              ) AS cantidad_entregada_anterior,

              pd.cantidad_pedida -
              ISNULL(
                entregado.total_entregado,
                0
              ) AS cantidad_pendiente

            FROM ventas.PedidoDetalle pd
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            INNER JOIN catalog.TipoProducto tp
              ON pd.tipo_producto_id =
                 tp.tipo_producto_id

            INNER JOIN catalog.Material mat
              ON pd.material_id =
                 mat.material_id

            INNER JOIN catalog.Medida med
              ON pd.medida_id =
                 med.medida_id

            INNER JOIN catalog.Color col
              ON pd.color_id =
                 col.color_id

            INNER JOIN catalog.UnidadMedida um
              ON pd.unidad_medida_id =
                 um.unidad_medida_id

            LEFT JOIN catalog.UnidadMedida up
              ON pd.unidad_presentacion_id =
                 up.unidad_medida_id

            OUTER APPLY (
              SELECT
                ISNULL(
                  SUM(
                    ed.cantidad_entregada
                  ),
                  0
                ) AS total_entregado

              FROM ventas.EntregaDetalle ed

              WHERE
                ed.pedido_detalle_id =
                pd.pedido_detalle_id
            ) entregado

            OUTER APPLY (
              SELECT TOP 1
                p.producto_id

              FROM catalog.Producto p

              WHERE
                p.activo = 1

                AND (
                  (
                    pd.producto_id
                    IS NOT NULL

                    AND
                    p.producto_id =
                    pd.producto_id
                  )

                  OR

                  (
                    pd.producto_id
                    IS NULL

                    AND
                    p.tipo_producto_id =
                    pd.tipo_producto_id

                    AND
                    p.material_id =
                    pd.material_id

                    AND
                    p.medida_id =
                    pd.medida_id

                    AND
                    p.color_id =
                    pd.color_id
                  )
                )

              ORDER BY
                CASE
                  WHEN
                    p.producto_id =
                    pd.producto_id
                  THEN 0
                  ELSE 1
                END,
                p.producto_id
            ) producto_resuelto

            WHERE
              pd.pedido_detalle_id =
                @pedido_detalle_id

              AND
              pd.pedido_id =
                @pedido_id

              AND
              pd.activo = 1;
          `);

      const detallePedido =
        detalleResult.recordset[0];

      if (!detallePedido) {
        throw crearErrorNegocio(
          'Uno de los productos no pertenece al pedido o ya no está activo'
        );
      }


      if (
        Number(
          item.unidad_medida_id
        ) !==
        Number(
          detallePedido
            .unidad_medida_id
        )
      ) {
        throw crearErrorNegocio(
          `La unidad de entrega de ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} no coincide con la unidad del pedido`
        );
      }


      if (
        !detallePedido
          .producto_resuelto_id
      ) {
        throw crearErrorNegocio(
          `El producto ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} no existe en el catálogo de productos terminados`
        );
      }


      if (
        !detallePedido
          .cantidad_presentacion ||
        Number(
          detallePedido
            .cantidad_presentacion
        ) <= 0 ||
        !detallePedido
          .unidad_presentacion_id
      ) {
        throw crearErrorNegocio(
          `El producto ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} no tiene una presentación configurada en el pedido`
        );
      }


      const cantidadEntregada =
        Number(
          item.cantidad_entregada
        );

      const cantidadPendiente =
        Number(
          detallePedido
            .cantidad_pendiente
        );

      const presentacion =
        Number(
          detallePedido
            .cantidad_presentacion
        );


      if (
        cantidadEntregada >
        cantidadPendiente +
        0.000001
      ) {
        throw crearErrorNegocio(
          `No se puede entregar ${cantidadEntregada.toFixed(3)} ${detallePedido.unidad} de ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color}; solo quedan ${cantidadPendiente.toFixed(3)} ${detallePedido.unidad} pendientes`
        );
      }


      /*
       * DECIMAL(18,3):
       * trabajamos en milésimas para evitar errores
       * de punto flotante al validar múltiplos.
       */
      const cantidadMil =
        Math.round(
          cantidadEntregada *
          1000
        );

      const presentacionMil =
        Math.round(
          presentacion *
          1000
        );


      if (
        presentacionMil <= 0 ||
        cantidadMil %
          presentacionMil !==
          0
      ) {
        throw crearErrorNegocio(
          `La entrega de ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} debe ser múltiplo de ${presentacion.toFixed(3)} ${detallePedido.unidad_presentacion}`
        );
      }


      const stockResult =
        await new sql.Request(
          transaction
        )
          .input(
            'producto_id',
            sql.Int,
            detallePedido
              .producto_resuelto_id
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            detallePedido
              .unidad_medida_id
          )
          .input(
            'cantidad_presentacion',
            sql.Decimal(
              18,
              3
            ),
            presentacion
          )
          .input(
            'unidad_presentacion_id',
            sql.Int,
            detallePedido
              .unidad_presentacion_id
          )
          .query(`
            SELECT
              stock_producto_terminado_id,
              cantidad_disponible

            FROM inventario.StockProductoTerminado
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            WHERE
              producto_id =
                @producto_id

              AND
              unidad_medida_id =
                @unidad_medida_id

              AND
              cantidad_presentacion =
                @cantidad_presentacion

              AND
              unidad_presentacion_id =
                @unidad_presentacion_id;
          `);

      const stock =
        stockResult.recordset[0];

      if (!stock) {
        throw crearErrorNegocio(
          `No existe stock de ${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} en presentación de ${presentacion.toFixed(3)} ${detallePedido.unidad_presentacion}`
        );
      }


      const stockId =
        Number(
          stock
            .stock_producto_terminado_id
        );

      const stockDisponible =
        Number(
          stock
            .cantidad_disponible
        );


      detallesValidados.push({
        ...item,

        producto_id:
          detallePedido
            .producto_resuelto_id,

        tipo_producto:
          detallePedido
            .tipo_producto,

        material:
          detallePedido.material,

        medida:
          detallePedido.medida,

        color:
          detallePedido.color,

        unidad:
          detallePedido.unidad,

        cantidad_presentacion:
          presentacion,

        unidad_presentacion_id:
          detallePedido
            .unidad_presentacion_id,

        unidad_presentacion:
          detallePedido
            .unidad_presentacion,

        stock_producto_terminado_id:
          stockId,

        stock_disponible_inicial:
          stockDisponible
      });


      const demandaActual =
        demandaPorStock.get(
          stockId
        ) || {
          cantidad: 0,
          stockDisponible,
          descripcion:
            `${detallePedido.tipo_producto} ${detallePedido.material} ${detallePedido.medida} ${detallePedido.color} - presentación ${presentacion.toFixed(3)} ${detallePedido.unidad_presentacion}`
        };


      demandaActual.cantidad +=
        cantidadEntregada;


      demandaPorStock.set(
        stockId,
        demandaActual
      );
    }


    /*
     * Si dos líneas del pedido usan el mismo producto
     * y presentación, validamos la suma contra el stock.
     */
    for (
      const demanda
      of demandaPorStock.values()
    ) {
      if (
        demanda.cantidad >
        demanda.stockDisponible +
        0.000001
      ) {
        throw crearErrorNegocio(
          `Stock insuficiente para ${demanda.descripcion}. Disponible: ${Number(demanda.stockDisponible).toFixed(3)} KG; solicitado en esta entrega: ${Number(demanda.cantidad).toFixed(3)} KG`,
          409
        );
      }
    }


    /* =====================================================
       4. CREAR CABECERA DE ENTREGA
       ===================================================== */

    const entregaResult =
      await new sql.Request(
        transaction
      )
        .input(
          'pedido_id',
          sql.Int,
          pedido_id
        )
        .input(
          'fecha_entrega',
          sql.Date,
          fecha_entrega
        )
        .input(
          'comentario_entrega',
          sql.NVarChar(500),
          comentario_entrega ||
          null
        )
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key ||
          null
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .query(`
          INSERT INTO ventas.Entrega (
            pedido_id,
            fecha_entrega,
            comentario_entrega,
            idempotency_key,
            created_by_usuario_id
          )
          VALUES (
            @pedido_id,
            @fecha_entrega,
            @comentario_entrega,
            @idempotency_key,
            @created_by_usuario_id
          );

          SELECT
            CONVERT(
              INT,
              SCOPE_IDENTITY()
            ) AS entrega_id;
        `);

    const entrega_id =
      entregaResult.recordset[0]
        .entrega_id;

    const detallesCreados =
      [];


    /* =====================================================
       5. INSERTAR DETALLES + DESCONTAR STOCK + MOVIMIENTO
       ===================================================== */

    for (
      const item
      of detallesValidados
    ) {
      const detalleResult =
        await new sql.Request(
          transaction
        )
          .input(
            'entrega_id',
            sql.Int,
            entrega_id
          )
          .input(
            'pedido_detalle_id',
            sql.Int,
            item.pedido_detalle_id
          )
          .input(
            'cantidad_entregada',
            sql.Decimal(
              18,
              3
            ),
            item.cantidad_entregada
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            item.unidad_medida_id
          )
          .input(
            'observacion',
            sql.NVarChar(300),
            item.observacion ||
            null
          )
          .query(`
            DECLARE @DetalleInsertado TABLE (
              entrega_detalle_id INT,
              entrega_id INT,
              pedido_detalle_id INT,
              cantidad_entregada DECIMAL(18, 3),
              unidad_medida_id INT,
              observacion NVARCHAR(300)
            );

            INSERT INTO ventas.EntregaDetalle (
              entrega_id,
              pedido_detalle_id,
              cantidad_entregada,
              unidad_medida_id,
              observacion
            )

            OUTPUT
              INSERTED.entrega_detalle_id,
              INSERTED.entrega_id,
              INSERTED.pedido_detalle_id,
              INSERTED.cantidad_entregada,
              INSERTED.unidad_medida_id,
              INSERTED.observacion

            INTO @DetalleInsertado

            VALUES (
              @entrega_id,
              @pedido_detalle_id,
              @cantidad_entregada,
              @unidad_medida_id,
              @observacion
            );

            SELECT *
            FROM @DetalleInsertado;
          `);

      const detalleCreado =
        detalleResult.recordset[0];


      const updateStockResult =
        await new sql.Request(
          transaction
        )
          .input(
            'stock_producto_terminado_id',
            sql.Int,
            item
              .stock_producto_terminado_id
          )
          .input(
            'cantidad_entregada',
            sql.Decimal(
              18,
              3
            ),
            item.cantidad_entregada
          )
          .input(
            'updated_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            UPDATE inventario.StockProductoTerminado

            SET
              cantidad_disponible =
                cantidad_disponible -
                @cantidad_entregada,

              updated_at =
                SYSDATETIME(),

              updated_by_usuario_id =
                @updated_by_usuario_id

            WHERE
              stock_producto_terminado_id =
                @stock_producto_terminado_id

              AND
              cantidad_disponible >=
                @cantidad_entregada;

            SELECT
              @@ROWCOUNT
                AS filas_actualizadas;
          `);


      if (
        Number(
          updateStockResult
            .recordset[0]
            .filas_actualizadas
        ) !== 1
      ) {
        throw crearErrorNegocio(
          `El stock de ${item.tipo_producto} ${item.material} ${item.medida} ${item.color} cambió durante la operación. Vuelve a intentar la entrega.`,
          409
        );
      }


      const movimientoResult =
        await new sql.Request(
          transaction
        )
          .input(
            'stock_producto_terminado_id',
            sql.Int,
            item
              .stock_producto_terminado_id
          )
          .input(
            'cantidad',
            sql.Decimal(
              18,
              3
            ),
            item.cantidad_entregada
          )
          .input(
            'entrega_detalle_id',
            sql.Int,
            detalleCreado
              .entrega_detalle_id
          )
          .input(
            'observacion',
            sql.NVarChar(400),
            `Salida por entrega #${entrega_id} - Pedido #${pedido_id}`
          )
          .input(
            'created_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            INSERT INTO inventario.MovimientoProductoTerminado (
              stock_producto_terminado_id,
              tipo_movimiento,
              cantidad,
              fecha_movimiento,
              produccion_detalle_id,
              entrega_detalle_id,
              observacion,
              created_by_usuario_id
            )

            VALUES (
              @stock_producto_terminado_id,
              'SALIDA_ENTREGA',
              @cantidad,
              SYSDATETIME(),
              NULL,
              @entrega_detalle_id,
              @observacion,
              @created_by_usuario_id
            );

            SELECT
              CONVERT(
                INT,
                SCOPE_IDENTITY()
              ) AS movimiento_producto_terminado_id;
          `);


      const stockActualResult =
        await new sql.Request(
          transaction
        )
          .input(
            'stock_producto_terminado_id',
            sql.Int,
            item
              .stock_producto_terminado_id
          )
          .query(`
            SELECT
              cantidad_disponible
            FROM inventario.StockProductoTerminado
            WHERE
              stock_producto_terminado_id =
              @stock_producto_terminado_id;
          `);


      detallesCreados.push({
        ...detalleCreado,

        producto_id:
          item.producto_id,

        tipo_producto:
          item.tipo_producto,

        material:
          item.material,

        medida:
          item.medida,

        color:
          item.color,

        cantidad_presentacion:
          item
            .cantidad_presentacion,

        unidad_presentacion:
          item
            .unidad_presentacion,

        stock_producto_terminado_id:
          item
            .stock_producto_terminado_id,

        movimiento_producto_terminado_id:
          movimientoResult
            .recordset[0]
            .movimiento_producto_terminado_id,

        stock_actual:
          Number(
            stockActualResult
              .recordset[0]
              .cantidad_disponible
          )
      });
    }


    /* =====================================================
       6. ACTUALIZAR ESTADO DEL PEDIDO
       ===================================================== */

    await new sql.Request(
      transaction
    )
      .input(
        'pedido_id',
        sql.Int,
        pedido_id
      )
      .input(
        'updated_by_usuario_id',
        sql.Int,
        created_by_usuario_id
      )
      .query(`
        UPDATE ventas.Pedido

        SET
          estado_pedido =
            CASE
              WHEN NOT EXISTS (
                SELECT 1

                FROM ventas.PedidoDetalle pd

                OUTER APPLY (
                  SELECT
                    ISNULL(
                      SUM(
                        ed.cantidad_entregada
                      ),
                      0
                    ) AS total_entregado

                  FROM ventas.EntregaDetalle ed

                  WHERE
                    ed.pedido_detalle_id =
                    pd.pedido_detalle_id
                ) entregas

                WHERE
                  pd.pedido_id =
                    @pedido_id

                  AND
                  pd.activo = 1

                  AND
                  entregas.total_entregado <
                  pd.cantidad_pedida
              )

              THEN 'ENTREGADO'

              ELSE 'PARCIAL'
            END,

          updated_at =
            SYSDATETIME(),

          updated_by_usuario_id =
            @updated_by_usuario_id

        WHERE
          pedido_id =
          @pedido_id;
      `);


    const completa =
      await obtenerEntregaCompletaPorId(
        entrega_id,
        transaction
      );


    await transaction.commit();


    return {
      reutilizada: false,

      entrega:
        completa.entrega,

      /*
       * Devolvemos la versión enriquecida creada en
       * esta transacción porque contiene stock_actual.
       */
      detalles:
        detallesCreados
    };


  } catch (error) {
    try {
      await transaction.rollback();
    } catch (_) {
      // Conservamos el error original.
    }


    if (
      [2601, 2627]
        .includes(
          error.number
        ) &&
      idempotency_key
    ) {
      /*
       * Defensa extra para una carrera poco probable.
       * El índice único evita una segunda entrega.
       */
      const poolConsulta =
        await getConnection();

      const existenteResult =
        await poolConsulta.request()
          .input(
            'idempotency_key',
            sql.VarChar(100),
            idempotency_key
          )
          .query(`
            SELECT
              entrega_id
            FROM ventas.Entrega
            WHERE
              idempotency_key =
              @idempotency_key;
          `);

      const existente =
        existenteResult
          .recordset[0];

      if (existente) {
        const completa =
          await obtenerEntregaCompletaPorId(
            existente.entrega_id
          );

        return {
          reutilizada: true,
          entrega:
            completa.entrega,
          detalles:
            completa.detalles
        };
      }
    }


    throw error;
  }
};


module.exports = {
  listarPedidosParaEntrega,
  obtenerPedidoParaEntrega,
  obtenerEntregaCompletaPorId,
  crearEntregaConDetalles
};

~~~

---

## src\modules\entregas\entrega.routes.js

~~~javascript
const express = require('express');

const {
  obtenerPedidosParaEntrega,
  obtenerPedidoEntrega,
  registrarEntrega
} = require('./entrega.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router =
  express.Router();


router.get(
  '/pedidos',
  verificarToken,
  obtenerPedidosParaEntrega
);


router.get(
  '/pedidos/:pedido_id',
  verificarToken,
  obtenerPedidoEntrega
);


router.post(
  '/',
  verificarToken,
  registrarEntrega
);


module.exports =
  router;

~~~

---

## src\modules\gastos\gasto.controller.js

~~~javascript
const {
  listarTiposGasto,
  buscarTipoGastoPorNombre,
  crearTipoGasto,

  listarGastos,
  obtenerGastoPorId,

  crearGasto,
  actualizarGasto,
  eliminarGasto
} = require('./gasto.model');


const fechaActual = () => {
  return new Date()
    .toISOString()
    .slice(0, 10);
};


/* =========================================================
   NORMALIZACIÓN Y VALIDACIÓN
   ========================================================= */

const prepararDatosGasto = ({
  tipo_gasto_id,
  proveedor_id,
  fecha_gasto,
  monto,
  moneda_codigo,
  descripcion,
  comprobante,
  usarFechaActual = false
}) => {
  if (!tipo_gasto_id) {
    return {
      error: 'El tipo de gasto es obligatorio'
    };
  }

  const tipoGastoId = Number(tipo_gasto_id);

  if (
    !Number.isInteger(tipoGastoId) ||
    tipoGastoId <= 0
  ) {
    return {
      error: 'El tipo de gasto no es válido'
    };
  }


  const montoNumerico = Number(monto);

  if (
    !Number.isFinite(montoNumerico) ||
    montoNumerico <= 0
  ) {
    return {
      error: 'El monto debe ser mayor a 0'
    };
  }


  if (!moneda_codigo) {
    return {
      error: 'La moneda es obligatoria'
    };
  }

  const monedaNormalizada =
    String(moneda_codigo)
      .trim()
      .toUpperCase();

  if (
    !['PEN', 'USD'].includes(
      monedaNormalizada
    )
  ) {
    return {
      error: 'La moneda debe ser PEN o USD'
    };
  }


  let proveedorId = null;

  if (
    proveedor_id !== null &&
    proveedor_id !== undefined &&
    proveedor_id !== ''
  ) {
    proveedorId = Number(proveedor_id);

    if (
      !Number.isInteger(proveedorId) ||
      proveedorId <= 0
    ) {
      return {
        error: 'El proveedor no es válido'
      };
    }
  }


  let fechaNormalizada = fecha_gasto;

  if (!fechaNormalizada && usarFechaActual) {
    fechaNormalizada = fechaActual();
  }

  if (!fechaNormalizada) {
    return {
      error: 'La fecha del gasto es obligatoria'
    };
  }


  const descripcionNormalizada =
    descripcion &&
    String(descripcion).trim()
      ? String(descripcion).trim()
      : null;


  const comprobanteNormalizado =
    comprobante &&
    String(comprobante).trim()
      ? String(comprobante)
          .trim()
          .toUpperCase()
      : null;


  return {
    datos: {
      tipo_gasto_id: tipoGastoId,
      proveedor_id: proveedorId,
      fecha_gasto: fechaNormalizada,
      monto: montoNumerico,
      moneda_codigo:
        monedaNormalizada,
      descripcion:
        descripcionNormalizada,
      comprobante:
        comprobanteNormalizado
    }
  };
};


/* =========================================================
   TIPOS DE GASTO
   ========================================================= */

const obtenerTiposGasto = async (
  req,
  res
) => {
  try {
    const tipos =
      await listarTiposGasto();

    res.json({
      mensaje:
        'Tipos de gasto obtenidos correctamente',

      tipos
    });

  } catch (error) {
    console.error(
      'Error listar tipos de gasto:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al listar tipos de gasto'
    });
  }
};


const registrarTipoGasto = async (
  req,
  res
) => {
  try {
    let {
      nombre
    } = req.body;

    if (
      !nombre ||
      nombre.trim() === ''
    ) {
      return res.status(400).json({
        mensaje:
          'El nombre del tipo de gasto es obligatorio'
      });
    }

    nombre =
      nombre
        .trim()
        .toUpperCase();

    const existente =
      await buscarTipoGastoPorNombre(
        nombre
      );

    if (existente) {
      return res.status(409).json({
        mensaje:
          'Ya existe un tipo de gasto con ese nombre'
      });
    }

    const tipo =
      await crearTipoGasto({
        nombre,

        created_by_usuario_id:
          req.usuario.usuario_id
      });

    res.status(201).json({
      mensaje:
        'Tipo de gasto registrado correctamente',

      tipo
    });

  } catch (error) {
    console.error(
      'Error registrar tipo de gasto:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al registrar tipo de gasto'
    });
  }
};


/* =========================================================
   LISTAR GASTOS
   ========================================================= */

const obtenerGastos = async (
  req,
  res
) => {
  try {
    const {
      tipo_gasto_id,
      proveedor_id,
      moneda_codigo,
      q,
      page = 1,
      limit = 10
    } = req.query;


    const pagina = Math.max(
      1,
      Number(page) || 1
    );

    const limite = Math.min(
      100,
      Math.max(
        1,
        Number(limit) || 10
      )
    );


    const resultado =
      await listarGastos({
        tipo_gasto_id:
          tipo_gasto_id
            ? Number(tipo_gasto_id)
            : null,

        proveedor_id:
          proveedor_id
            ? Number(proveedor_id)
            : null,

        moneda_codigo:
          moneda_codigo
            ? String(moneda_codigo)
                .toUpperCase()
            : null,

        q:
          q
            ? String(q).trim()
            : null,

        page: pagina,
        limit: limite
      });


    res.json({
      mensaje:
        'Gastos obtenidos correctamente',

      gastos:
        resultado.gastos,

      paginacion:
        resultado.paginacion
    });

  } catch (error) {
    console.error(
      'Error listar gastos:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al listar gastos'
    });
  }
};


/* =========================================================
   OBTENER GASTO
   ========================================================= */

const obtenerGasto = async (
  req,
  res
) => {
  try {
    const gasto_id =
      Number(req.params.gasto_id);

    if (
      !Number.isInteger(gasto_id) ||
      gasto_id <= 0
    ) {
      return res.status(400).json({
        mensaje:
          'El ID del gasto no es válido'
      });
    }


    const gasto =
      await obtenerGastoPorId(
        gasto_id
      );


    if (!gasto) {
      return res.status(404).json({
        mensaje:
          'Gasto no encontrado'
      });
    }


    res.json({
      mensaje:
        'Gasto obtenido correctamente',

      gasto
    });

  } catch (error) {
    console.error(
      'Error obtener gasto:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al obtener gasto'
    });
  }
};


/* =========================================================
   REGISTRAR GASTO
   ========================================================= */

const registrarGasto = async (
  req,
  res
) => {
  try {
    const preparacion =
      prepararDatosGasto({
        ...req.body,
        usarFechaActual: true
      });


    if (preparacion.error) {
      return res.status(400).json({
        mensaje:
          preparacion.error
      });
    }


    const gasto =
      await crearGasto({
        ...preparacion.datos,

        created_by_usuario_id:
          req.usuario.usuario_id
      });


    res.status(201).json({
      mensaje:
        'Gasto registrado correctamente',

      gasto
    });

  } catch (error) {
    console.error(
      'Error registrar gasto:',
      error.message
    );


    if (error.number === 547) {
      return res.status(400).json({
        mensaje:
          'El tipo de gasto, proveedor o moneda seleccionados no son válidos'
      });
    }


    res.status(500).json({
      mensaje:
        'Error interno al registrar gasto'
    });
  }
};


/* =========================================================
   EDITAR GASTO
   ========================================================= */

const editarGasto = async (
  req,
  res
) => {
  try {
    const gasto_id =
      Number(req.params.gasto_id);


    if (
      !Number.isInteger(gasto_id) ||
      gasto_id <= 0
    ) {
      return res.status(400).json({
        mensaje:
          'El ID del gasto no es válido'
      });
    }


    /*
     * Primero comprobamos que siga activo.
     *
     * Un gasto eliminado lógicamente
     * ya no debe poder editarse.
     */
    const gastoActual =
      await obtenerGastoPorId(
        gasto_id
      );


    if (!gastoActual) {
      return res.status(404).json({
        mensaje:
          'Gasto no encontrado'
      });
    }


    const preparacion =
      prepararDatosGasto({
        ...req.body,
        usarFechaActual: false
      });


    if (preparacion.error) {
      return res.status(400).json({
        mensaje:
          preparacion.error
      });
    }


    const gasto =
      await actualizarGasto({
        gasto_id,

        ...preparacion.datos,

        updated_by_usuario_id:
          req.usuario.usuario_id
      });


    if (!gasto) {
      return res.status(404).json({
        mensaje:
          'Gasto no encontrado o ya eliminado'
      });
    }


    res.json({
      mensaje:
        'Gasto actualizado correctamente',

      gasto
    });

  } catch (error) {
    console.error(
      'Error editar gasto:',
      error.message
    );


    if (error.number === 547) {
      return res.status(400).json({
        mensaje:
          'El tipo de gasto, proveedor o moneda seleccionados no son válidos'
      });
    }


    res.status(500).json({
      mensaje:
        'Error interno al actualizar gasto'
    });
  }
};


/* =========================================================
   ELIMINAR GASTO
   BAJA LÓGICA
   ========================================================= */

const darBajaGasto = async (
  req,
  res
) => {
  try {
    const gasto_id =
      Number(req.params.gasto_id);


    if (
      !Number.isInteger(gasto_id) ||
      gasto_id <= 0
    ) {
      return res.status(400).json({
        mensaje:
          'El ID del gasto no es válido'
      });
    }


    const gasto =
      await eliminarGasto({
        gasto_id,

        updated_by_usuario_id:
          req.usuario.usuario_id
      });


    if (!gasto) {
      return res.status(404).json({
        mensaje:
          'Gasto no encontrado o ya eliminado'
      });
    }


    res.json({
      mensaje:
        'Gasto eliminado correctamente',

      gasto
    });

  } catch (error) {
    console.error(
      'Error eliminar gasto:',
      error.message
    );

    res.status(500).json({
      mensaje:
        'Error interno al eliminar gasto'
    });
  }
};


module.exports = {
  obtenerTiposGasto,
  registrarTipoGasto,

  obtenerGastos,
  obtenerGasto,

  registrarGasto,
  editarGasto,
  darBajaGasto
};
~~~

---

## src\modules\gastos\gasto.model.js

~~~javascript
const {
  getConnection,
  sql
} = require('../../config/db');


/* =========================================================
   TIPOS DE GASTO
   ========================================================= */

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
    .input(
      'nombre',
      sql.NVarChar(100),
      nombre
    )
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
    .input(
      'nombre',
      sql.NVarChar(100),
      nombre
    )
    .input(
      'created_by_usuario_id',
      sql.Int,
      created_by_usuario_id
    )
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


/* =========================================================
   LISTAR GASTOS
   ========================================================= */

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
    .input(
      'tipo_gasto_id',
      sql.Int,
      tipo_gasto_id || null
    )
    .input(
      'proveedor_id',
      sql.Int,
      proveedor_id || null
    )
    .input(
      'moneda_codigo',
      sql.Char(3),
      moneda_codigo || null
    )
    .input(
      'q',
      sql.NVarChar(150),
      q ? `%${q}%` : null
    )
    .input(
      'offset',
      sql.Int,
      offset
    )
    .input(
      'limit',
      sql.Int,
      limit
    )
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

          g.activo,

          g.created_at,
          g.created_by_usuario_id,
          creador.nombre_completo AS registrado_por,

          g.updated_at,
          g.updated_by_usuario_id,
          actualizador.nombre_completo AS actualizado_por

        FROM finance.Gasto g

        INNER JOIN finance.TipoGasto tg
          ON g.tipo_gasto_id = tg.tipo_gasto_id

        LEFT JOIN compras.Proveedor p
          ON g.proveedor_id = p.proveedor_id

        INNER JOIN auth.Usuario creador
          ON g.created_by_usuario_id =
             creador.usuario_id

        LEFT JOIN auth.Usuario actualizador
          ON g.updated_by_usuario_id =
             actualizador.usuario_id

        WHERE g.activo = 1

          AND (
            @tipo_gasto_id IS NULL
            OR g.tipo_gasto_id = @tipo_gasto_id
          )

          AND (
            @proveedor_id IS NULL
            OR g.proveedor_id = @proveedor_id
          )

          AND (
            @moneda_codigo IS NULL
            OR g.moneda_codigo = @moneda_codigo
          )

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

  const total =
    gastos.length > 0
      ? Number(gastos[0].total_registros)
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


/* =========================================================
   OBTENER GASTO POR ID
   ========================================================= */

const obtenerGastoPorId = async (gasto_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input(
      'gasto_id',
      sql.Int,
      gasto_id
    )
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

        g.activo,

        g.created_at,
        g.created_by_usuario_id,
        creador.nombre_completo AS registrado_por,

        g.updated_at,
        g.updated_by_usuario_id,
        actualizador.nombre_completo AS actualizado_por

      FROM finance.Gasto g

      INNER JOIN finance.TipoGasto tg
        ON g.tipo_gasto_id = tg.tipo_gasto_id

      LEFT JOIN compras.Proveedor p
        ON g.proveedor_id = p.proveedor_id

      INNER JOIN auth.Usuario creador
        ON g.created_by_usuario_id =
           creador.usuario_id

      LEFT JOIN auth.Usuario actualizador
        ON g.updated_by_usuario_id =
           actualizador.usuario_id

      WHERE g.gasto_id = @gasto_id
        AND g.activo = 1;
    `);

  return result.recordset[0];
};


/* =========================================================
   CREAR GASTO
   ========================================================= */

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
    .input(
      'tipo_gasto_id',
      sql.Int,
      tipo_gasto_id
    )
    .input(
      'proveedor_id',
      sql.Int,
      proveedor_id || null
    )
    .input(
      'fecha_gasto',
      sql.Date,
      fecha_gasto
    )
    .input(
      'monto',
      sql.Decimal(18, 2),
      monto
    )
    .input(
      'moneda_codigo',
      sql.Char(3),
      moneda_codigo
    )
    .input(
      'descripcion',
      sql.NVarChar(400),
      descripcion || null
    )
    .input(
      'comprobante',
      sql.VarChar(100),
      comprobante || null
    )
    .input(
      'created_by_usuario_id',
      sql.Int,
      created_by_usuario_id
    )
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
        INSERTED.activo,
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


/* =========================================================
   ACTUALIZAR GASTO
   ========================================================= */

const actualizarGasto = async ({
  gasto_id,
  tipo_gasto_id,
  proveedor_id,
  fecha_gasto,
  monto,
  moneda_codigo,
  descripcion,
  comprobante,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input(
      'gasto_id',
      sql.Int,
      gasto_id
    )
    .input(
      'tipo_gasto_id',
      sql.Int,
      tipo_gasto_id
    )
    .input(
      'proveedor_id',
      sql.Int,
      proveedor_id || null
    )
    .input(
      'fecha_gasto',
      sql.Date,
      fecha_gasto
    )
    .input(
      'monto',
      sql.Decimal(18, 2),
      monto
    )
    .input(
      'moneda_codigo',
      sql.Char(3),
      moneda_codigo
    )
    .input(
      'descripcion',
      sql.NVarChar(400),
      descripcion || null
    )
    .input(
      'comprobante',
      sql.VarChar(100),
      comprobante || null
    )
    .input(
      'updated_by_usuario_id',
      sql.Int,
      updated_by_usuario_id
    )
    .query(`
      UPDATE finance.Gasto

      SET
        tipo_gasto_id = @tipo_gasto_id,
        proveedor_id = @proveedor_id,
        fecha_gasto = @fecha_gasto,
        monto = @monto,
        moneda_codigo = @moneda_codigo,
        descripcion = @descripcion,
        comprobante = @comprobante,

        updated_at = SYSDATETIME(),
        updated_by_usuario_id =
          @updated_by_usuario_id

      OUTPUT
        INSERTED.gasto_id,
        INSERTED.tipo_gasto_id,
        INSERTED.proveedor_id,
        INSERTED.fecha_gasto,
        INSERTED.monto,
        INSERTED.moneda_codigo,
        INSERTED.descripcion,
        INSERTED.comprobante,
        INSERTED.activo,
        INSERTED.updated_at,
        INSERTED.updated_by_usuario_id

      WHERE gasto_id = @gasto_id
        AND activo = 1;
    `);

  return result.recordset[0];
};


/* =========================================================
   ELIMINACIÓN LÓGICA
   ========================================================= */

const eliminarGasto = async ({
  gasto_id,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input(
      'gasto_id',
      sql.Int,
      gasto_id
    )
    .input(
      'updated_by_usuario_id',
      sql.Int,
      updated_by_usuario_id
    )
    .query(`
      UPDATE finance.Gasto

      SET
        activo = 0,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id =
          @updated_by_usuario_id

      OUTPUT
        INSERTED.gasto_id,
        INSERTED.tipo_gasto_id,
        INSERTED.proveedor_id,
        INSERTED.fecha_gasto,
        INSERTED.monto,
        INSERTED.moneda_codigo,
        INSERTED.descripcion,
        INSERTED.comprobante,
        INSERTED.activo,
        INSERTED.updated_at,
        INSERTED.updated_by_usuario_id

      WHERE gasto_id = @gasto_id
        AND activo = 1;
    `);

  return result.recordset[0];
};


module.exports = {
  listarTiposGasto,
  buscarTipoGastoPorNombre,
  crearTipoGasto,

  listarGastos,
  obtenerGastoPorId,

  crearGasto,
  actualizarGasto,
  eliminarGasto
};
~~~

---

## src\modules\gastos\gasto.routes.js

~~~javascript
const express = require('express');

const {
  obtenerTiposGasto,
  registrarTipoGasto,

  obtenerGastos,
  obtenerGasto,

  registrarGasto,
  editarGasto,
  darBajaGasto
} = require('./gasto.controller');


const {
  verificarToken
} = require(
  '../../middlewares/auth.middleware'
);


const router = express.Router();


/* =========================================================
   TIPOS DE GASTO
   ========================================================= */

router.get(
  '/tipos',
  verificarToken,
  obtenerTiposGasto
);


router.post(
  '/tipos',
  verificarToken,
  registrarTipoGasto
);


/* =========================================================
   GASTOS
   ========================================================= */

router.get(
  '/',
  verificarToken,
  obtenerGastos
);


router.post(
  '/',
  verificarToken,
  registrarGasto
);


router.get(
  '/:gasto_id',
  verificarToken,
  obtenerGasto
);


router.put(
  '/:gasto_id',
  verificarToken,
  editarGasto
);


router.delete(
  '/:gasto_id',
  verificarToken,
  darBajaGasto
);


module.exports = router;
~~~

---

## src\modules\mermas\merma.controller.js

~~~javascript
const {
  listarMermas,
  listarDisponibilidad,
  obtenerMermaCompletaPorId,
  crearMermaFIFO
} = require('./merma.model');


const validarPaginacion = (
  page,
  limit
) => {
  const pageNumero =
    Number(page);

  const limitNumero =
    Number(limit);

  if (
    !Number.isInteger(
      pageNumero
    ) ||
    pageNumero < 1 ||
    !Number.isInteger(
      limitNumero
    ) ||
    limitNumero < 1 ||
    limitNumero > 100
  ) {
    return null;
  }

  return {
    page: pageNumero,
    limit: limitNumero
  };
};


const idOpcional = (
  valor
) => {
  if (
    valor === undefined ||
    valor === null ||
    valor === ''
  ) {
    return null;
  }

  const numero =
    Number(valor);

  if (
    !Number.isInteger(
      numero
    ) ||
    numero <= 0
  ) {
    return NaN;
  }

  return numero;
};


const fechaActual = () => {
  return new Date()
    .toISOString()
    .slice(0, 10);
};


const listar =
  async (
    req,
    res
  ) => {
    try {
      const {
        q,
        fecha_desde,
        fecha_hasta,
        page = 1,
        limit = 10
      } = req.query;

      const paginacion =
        validarPaginacion(
          page,
          limit
        );

      if (!paginacion) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      const resultado =
        await listarMermas({
          q:
            q
              ? String(q).trim()
              : null,

          fecha_desde:
            fecha_desde || null,

          fecha_hasta:
            fecha_hasta || null,

          page:
            paginacion.page,

          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Mermas obtenidas correctamente',
        mermas:
          resultado.mermas,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error listar mermas:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al listar las mermas'
      });
    }
  };


const disponibilidad =
  async (
    req,
    res
  ) => {
    try {
      const material_id =
        idOpcional(
          req.query.material_id
        );

      const color_id =
        idOpcional(
          req.query.color_id
        );

      if (
        Number.isNaN(
          material_id
        ) ||
        Number.isNaN(
          color_id
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Material o color inválido'
        });
      }

      const items =
        await listarDisponibilidad({
          material_id,
          color_id
        });

      res.json({
        mensaje:
          'Disponibilidad de materia prima obtenida correctamente',
        items
      });

    } catch (error) {
      console.error(
        'Error disponibilidad merma:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al consultar la disponibilidad de materia prima'
      });
    }
  };


const obtenerPorId =
  async (
    req,
    res
  ) => {
    try {
      const merma_id =
        Number(
          req.params.merma_id
        );

      if (
        !Number.isInteger(
          merma_id
        ) ||
        merma_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de merma inválido'
        });
      }

      const resultado =
        await obtenerMermaCompletaPorId(
          merma_id
        );

      if (!resultado) {
        return res.status(404).json({
          mensaje:
            'Merma no encontrada'
        });
      }

      res.json({
        mensaje:
          'Merma obtenida correctamente',
        merma:
          resultado.merma,
        detalles:
          resultado.detalles
      });

    } catch (error) {
      console.error(
        'Error obtener merma:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener la merma'
      });
    }
  };


const registrar =
  async (
    req,
    res
  ) => {
    try {
      let {
        fecha_merma,
        observacion,
        detalles
      } = req.body;


      fecha_merma =
        fecha_merma ||
        fechaActual();


      observacion =
        observacion
          ? String(
              observacion
            ).trim()
          : null;


      if (
        observacion &&
        observacion.length > 500
      ) {
        return res.status(400).json({
          mensaje:
            'La observación no puede superar 500 caracteres'
        });
      }


      if (
        !Array.isArray(
          detalles
        ) ||
        detalles.length === 0
      ) {
        return res.status(400).json({
          mensaje:
            'La merma debe tener al menos una materia prima'
        });
      }


      for (
        const [
          index,
          item
        ]
        of detalles.entries()
      ) {
        const cantidad =
          Number(
            item.cantidad
          );

        if (
          !Number.isFinite(
            cantidad
          ) ||
          cantidad <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `La cantidad del producto ${index + 1} debe ser mayor a 0`
          });
        }

        item.cantidad =
          Number(
            cantidad.toFixed(3)
          );

        item.observacion =
          item.observacion
            ? String(
                item.observacion
              ).trim()
            : null;

        if (
          item.observacion &&
          item.observacion.length > 300
        ) {
          return res.status(400).json({
            mensaje:
              `La observación del producto ${index + 1} no puede superar 300 caracteres`
          });
        }
      }


      const idempotency_key =
        req.get(
          'Idempotency-Key'
        )
          ? String(
              req.get(
                'Idempotency-Key'
              )
            ).trim()
          : null;


      if (
        idempotency_key &&
        idempotency_key.length > 100
      ) {
        return res.status(400).json({
          mensaje:
            'Idempotency-Key no puede superar 100 caracteres'
        });
      }


      const resultado =
        await crearMermaFIFO({
          fecha_merma,
          observacion,
          detalles,
          idempotency_key,

          created_by_usuario_id:
            req.usuario.usuario_id
        });


      return res
        .status(
          resultado.reutilizada
            ? 200
            : 201
        )
        .json({
          mensaje:
            resultado.reutilizada
              ? 'La merma ya había sido registrada; se devolvió el resultado existente'
              : 'Merma registrada correctamente',

          reutilizada:
            resultado.reutilizada,

          merma:
            resultado.merma,

          detalles:
            resultado.detalles
        });


    } catch (error) {
      console.error(
        'Error registrar merma:',
        error.message
      );

      if (
        error.statusCode
      ) {
        return res
          .status(
            error.statusCode
          )
          .json({
            mensaje:
              error.message
          });
      }

      res.status(500).json({
        mensaje:
          'Error interno al registrar la merma'
      });
    }
  };


module.exports = {
  listar,
  disponibilidad,
  obtenerPorId,
  registrar
};

~~~

---

## src\modules\mermas\merma.model.js

~~~javascript
const {
  getConnection,
  sql
} = require('../../config/db');


const crearErrorNegocio = (
  mensaje,
  statusCode = 400
) => {
  const error =
    new Error(
      mensaje
    );

  error.statusCode =
    statusCode;

  return error;
};


const obtenerUnidadKg = async (
  executor
) => {
  const request =
    executor instanceof sql.Transaction
      ? new sql.Request(
          executor
        )
      : executor.request();

  const result =
    await request.query(`
      SELECT TOP 1
        unidad_medida_id,
        codigo
      FROM catalog.UnidadMedida
      WHERE
        activo = 1
        AND UPPER(codigo) = 'KG';
    `);

  return result.recordset[0] ||
    null;
};


const listarMermas = async ({
  q,
  fecha_desde,
  fecha_hasta,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'q',
        sql.NVarChar(150),
        q ? `%${q}%` : null
      )
      .input(
        'fecha_desde',
        sql.Date,
        fecha_desde || null
      )
      .input(
        'fecha_hasta',
        sql.Date,
        fecha_hasta || null
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        SELECT
          m.merma_id,
          m.fecha_merma,
          m.observacion,
          m.created_at,

          u.nombre_completo
            AS registrado_por,

          COUNT(
            md.merma_detalle_id
          ) AS cantidad_items,

          ISNULL(
            SUM(
              md.cantidad
            ),
            0
          ) AS total_merma_kg,

          COUNT(*) OVER()
            AS total_registros

        FROM inventario.Merma m

        INNER JOIN auth.Usuario u
          ON m.created_by_usuario_id =
             u.usuario_id

        LEFT JOIN inventario.MermaDetalle md
          ON m.merma_id =
             md.merma_id

        WHERE
          (
            @fecha_desde IS NULL
            OR m.fecha_merma >=
               @fecha_desde
          )

          AND (
            @fecha_hasta IS NULL
            OR m.fecha_merma <=
               @fecha_hasta
          )

          AND (
            @q IS NULL
            OR m.observacion LIKE @q
            OR EXISTS (
              SELECT 1
              FROM inventario.MermaDetalle mdq

              INNER JOIN catalog.Material matq
                ON mdq.material_id =
                   matq.material_id

              INNER JOIN catalog.Color colq
                ON mdq.color_id =
                   colq.color_id

              WHERE
                mdq.merma_id =
                  m.merma_id

                AND (
                  matq.nombre LIKE @q
                  OR colq.nombre LIKE @q
                )
            )
          )

        GROUP BY
          m.merma_id,
          m.fecha_merma,
          m.observacion,
          m.created_at,
          u.nombre_completo

        ORDER BY
          m.fecha_merma DESC,
          m.merma_id DESC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const mermas =
    result.recordset;

  const total =
    mermas.length > 0
      ? Number(
          mermas[0]
            .total_registros
        )
      : 0;

  return {
    mermas,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const listarDisponibilidad = async ({
  material_id,
  color_id
}) => {
  const pool =
    await getConnection();

  const result =
    await pool.request()
      .input(
        'material_id',
        sql.Int,
        material_id || null
      )
      .input(
        'color_id',
        sql.Int,
        color_id || null
      )
      .query(`
        SELECT
          d.material_id,
          mat.nombre
            AS material,

          d.color_id,
          col.nombre
            AS color,

          um.unidad_medida_id,
          um.codigo
            AS unidad,

          SUM(
            s.cantidad_disponible
          ) AS cantidad_disponible

        FROM inventario.StockMateriaPrimaLote s

        INNER JOIN compras.CompraMateriaPrimaDetalle d
          ON s.compra_materia_prima_detalle_id =
             d.compra_materia_prima_detalle_id

        INNER JOIN catalog.Material mat
          ON d.material_id =
             mat.material_id

        INNER JOIN catalog.Color col
          ON d.color_id =
             col.color_id

        INNER JOIN catalog.UnidadMedida um
          ON d.unidad_medida_id =
             um.unidad_medida_id

        WHERE
          s.cantidad_disponible > 0

          AND mat.activo = 1
          AND col.activo = 1
          AND um.activo = 1

          AND UPPER(um.codigo) =
              'KG'

          AND (
            @material_id IS NULL
            OR d.material_id =
               @material_id
          )

          AND (
            @color_id IS NULL
            OR d.color_id =
               @color_id
          )

        GROUP BY
          d.material_id,
          mat.nombre,
          d.color_id,
          col.nombre,
          um.unidad_medida_id,
          um.codigo

        ORDER BY
          mat.nombre ASC,
          col.nombre ASC;
      `);

  return result.recordset;
};


const obtenerMermaCompletaPorId = async (
  merma_id,
  executor = null
) => {
  const pool =
    executor ||
    await getConnection();

  const requestCabecera =
    executor instanceof sql.Transaction
      ? new sql.Request(
          executor
        )
      : pool.request();

  const cabeceraResult =
    await requestCabecera
      .input(
        'merma_id',
        sql.Int,
        merma_id
      )
      .query(`
        SELECT
          m.merma_id,
          m.fecha_merma,
          m.observacion,
          m.created_at,
          m.idempotency_key,

          u.nombre_completo
            AS registrado_por

        FROM inventario.Merma m

        INNER JOIN auth.Usuario u
          ON m.created_by_usuario_id =
             u.usuario_id

        WHERE
          m.merma_id =
          @merma_id;
      `);

  const merma =
    cabeceraResult.recordset[0];

  if (!merma) {
    return null;
  }


  const requestDetalles =
    executor instanceof sql.Transaction
      ? new sql.Request(
          executor
        )
      : pool.request();

  const detallesResult =
    await requestDetalles
      .input(
        'merma_id',
        sql.Int,
        merma_id
      )
      .query(`
        SELECT
          md.merma_detalle_id,
          md.merma_id,

          md.material_id,
          mat.nombre
            AS material,

          md.color_id,
          col.nombre
            AS color,

          md.cantidad,
          md.unidad_medida_id,
          um.codigo
            AS unidad,

          md.observacion,
          md.created_at

        FROM inventario.MermaDetalle md

        INNER JOIN catalog.Material mat
          ON md.material_id =
             mat.material_id

        INNER JOIN catalog.Color col
          ON md.color_id =
             col.color_id

        INNER JOIN catalog.UnidadMedida um
          ON md.unidad_medida_id =
             um.unidad_medida_id

        WHERE
          md.merma_id =
          @merma_id

        ORDER BY
          md.merma_detalle_id ASC;
      `);


  const detalles =
    detallesResult.recordset;


  for (
    const detalle
    of detalles
  ) {
    const requestConsumos =
      executor instanceof sql.Transaction
        ? new sql.Request(
            executor
          )
        : pool.request();

    const consumosResult =
      await requestConsumos
        .input(
          'merma_detalle_id',
          sql.Int,
          detalle
            .merma_detalle_id
        )
        .query(`
          SELECT
            mm.movimiento_materia_prima_id,
            mm.stock_materia_prima_lote_id,
            mm.cantidad,
            mm.fecha_movimiento,

            c.compra_materia_prima_id,
            c.nombre_lote,
            c.fecha_compra,

            d.material_id,
            mat.nombre
              AS material,

            d.color_id,
            col.nombre
              AS color

          FROM inventario.MovimientoMateriaPrima mm

          INNER JOIN inventario.StockMateriaPrimaLote s
            ON mm.stock_materia_prima_lote_id =
               s.stock_materia_prima_lote_id

          INNER JOIN compras.CompraMateriaPrimaDetalle d
            ON s.compra_materia_prima_detalle_id =
               d.compra_materia_prima_detalle_id

          INNER JOIN compras.CompraMateriaPrima c
            ON d.compra_materia_prima_id =
               c.compra_materia_prima_id

          INNER JOIN catalog.Material mat
            ON d.material_id =
               mat.material_id

          INNER JOIN catalog.Color col
            ON d.color_id =
               col.color_id

          WHERE
            mm.merma_detalle_id =
              @merma_detalle_id

            AND
            mm.tipo_movimiento =
              'SALIDA_MERMA'

          ORDER BY
            c.fecha_compra ASC,
            c.compra_materia_prima_id ASC,
            s.stock_materia_prima_lote_id ASC;
        `);

    detalle.consumos_fifo =
      consumosResult.recordset;
  }


  return {
    merma,
    detalles
  };
};


const crearMermaFIFO = async ({
  fecha_merma,
  observacion,
  detalles,
  idempotency_key,
  created_by_usuario_id
}) => {
  const pool =
    await getConnection();

  const transaction =
    new sql.Transaction(
      pool
    );

  try {
    await transaction.begin(
      sql.ISOLATION_LEVEL.SERIALIZABLE
    );


    /* =====================================================
       1. IDEMPOTENCIA
       ===================================================== */

    if (
      idempotency_key
    ) {
      const existenteResult =
        await new sql.Request(
          transaction
        )
          .input(
            'idempotency_key',
            sql.VarChar(100),
            idempotency_key
          )
          .query(`
            SELECT
              merma_id

            FROM inventario.Merma
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            WHERE
              idempotency_key =
              @idempotency_key;
          `);

      const existente =
        existenteResult
          .recordset[0];

      if (existente) {
        const completa =
          await obtenerMermaCompletaPorId(
            existente.merma_id,
            transaction
          );

        await transaction.commit();

        return {
          reutilizada: true,
          merma:
            completa.merma,
          detalles:
            completa.detalles
        };
      }
    }


    /* =====================================================
       2. UNIDAD KG
       ===================================================== */

    const unidadKg =
      await obtenerUnidadKg(
        transaction
      );

    if (!unidadKg) {
      throw crearErrorNegocio(
        'No se encontró la unidad KG activa en el catálogo',
        500
      );
    }


    /* =====================================================
       3. VALIDAR MATERIA/COLOR Y STOCK TOTAL
       ===================================================== */

    const combinaciones =
      new Set();

    const detallesValidados =
      [];


    for (
      const [
        index,
        item
      ]
      of detalles.entries()
    ) {
      const material_id =
        Number(
          item.material_id
        );

      const color_id =
        Number(
          item.color_id
        );

      const cantidad =
        Number(
          item.cantidad
        );


      if (
        !Number.isInteger(
          material_id
        ) ||
        material_id <= 0
      ) {
        throw crearErrorNegocio(
          `El material del producto ${index + 1} no es válido`
        );
      }


      if (
        !Number.isInteger(
          color_id
        ) ||
        color_id <= 0
      ) {
        throw crearErrorNegocio(
          `El color del producto ${index + 1} no es válido`
        );
      }


      if (
        !Number.isFinite(
          cantidad
        ) ||
        cantidad <= 0
      ) {
        throw crearErrorNegocio(
          `La cantidad de merma del producto ${index + 1} debe ser mayor a 0`
        );
      }


      const key =
        `${material_id}:${color_id}`;

      if (
        combinaciones.has(
          key
        )
      ) {
        throw crearErrorNegocio(
          'No se puede repetir la misma materia prima en una sola merma'
        );
      }

      combinaciones.add(
        key
      );


      const catalogoResult =
        await new sql.Request(
          transaction
        )
          .input(
            'material_id',
            sql.Int,
            material_id
          )
          .input(
            'color_id',
            sql.Int,
            color_id
          )
          .query(`
            SELECT
              mat.material_id,
              mat.nombre
                AS material,

              col.color_id,
              col.nombre
                AS color

            FROM catalog.Material mat

            CROSS JOIN catalog.Color col

            WHERE
              mat.material_id =
                @material_id

              AND mat.activo = 1

              AND col.color_id =
                @color_id

              AND col.activo = 1;
          `);

      const catalogo =
        catalogoResult
          .recordset[0];

      if (!catalogo) {
        throw crearErrorNegocio(
          `La materia prima del producto ${index + 1} no está activa o no existe`
        );
      }


      /*
       * Bloqueamos todos los lotes candidatos desde la validación
       * para que otra transacción no pueda consumirlos entre
       * la validación y el descuento FIFO.
       */
      const stockResult =
        await new sql.Request(
          transaction
        )
          .input(
            'material_id',
            sql.Int,
            material_id
          )
          .input(
            'color_id',
            sql.Int,
            color_id
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            unidadKg
              .unidad_medida_id
          )
          .query(`
            SELECT
              s.stock_materia_prima_lote_id,
              s.cantidad_disponible,

              c.compra_materia_prima_id,
              c.nombre_lote,
              c.fecha_compra

            FROM inventario.StockMateriaPrimaLote s
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            INNER JOIN compras.CompraMateriaPrimaDetalle d
              ON s.compra_materia_prima_detalle_id =
                 d.compra_materia_prima_detalle_id

            INNER JOIN compras.CompraMateriaPrima c
              ON d.compra_materia_prima_id =
                 c.compra_materia_prima_id

            WHERE
              d.material_id =
                @material_id

              AND d.color_id =
                @color_id

              AND d.unidad_medida_id =
                @unidad_medida_id

              AND s.cantidad_disponible > 0

            ORDER BY
              c.fecha_compra ASC,
              c.compra_materia_prima_id ASC,
              s.stock_materia_prima_lote_id ASC;
          `);


      const lotes =
        stockResult.recordset;

      const disponible =
        lotes.reduce(
          (
            total,
            lote
          ) =>
            total +
            Number(
              lote
                .cantidad_disponible
            ),
          0
        );


      if (
        disponible + 0.000001 <
        cantidad
      ) {
        throw crearErrorNegocio(
          `Stock insuficiente de ${catalogo.material} ${catalogo.color}. Disponible: ${disponible.toFixed(3)} KG; merma solicitada: ${cantidad.toFixed(3)} KG`,
          409
        );
      }


      detallesValidados.push({
        material_id,
        color_id,

        material:
          catalogo.material,

        color:
          catalogo.color,

        cantidad:
          Number(
            cantidad.toFixed(3)
          ),

        unidad_medida_id:
          unidadKg
            .unidad_medida_id,

        unidad:
          unidadKg.codigo,

        observacion:
          item.observacion
            ? String(
                item.observacion
              ).trim()
            : null,

        lotes
      });
    }


    /* =====================================================
       4. CREAR CABECERA
       ===================================================== */

    const mermaResult =
      await new sql.Request(
        transaction
      )
        .input(
          'fecha_merma',
          sql.Date,
          fecha_merma
        )
        .input(
          'observacion',
          sql.NVarChar(500),
          observacion || null
        )
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key || null
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .query(`
          INSERT INTO inventario.Merma (
            fecha_merma,
            observacion,
            idempotency_key,
            created_by_usuario_id
          )

          VALUES (
            @fecha_merma,
            @observacion,
            @idempotency_key,
            @created_by_usuario_id
          );

          SELECT
            CONVERT(
              INT,
              SCOPE_IDENTITY()
            ) AS merma_id;
        `);

    const merma_id =
      mermaResult
        .recordset[0]
        .merma_id;


    /* =====================================================
       5. DETALLES + FIFO + MOVIMIENTOS
       ===================================================== */

    for (
      const item
      of detallesValidados
    ) {
      const detalleResult =
        await new sql.Request(
          transaction
        )
          .input(
            'merma_id',
            sql.Int,
            merma_id
          )
          .input(
            'material_id',
            sql.Int,
            item.material_id
          )
          .input(
            'color_id',
            sql.Int,
            item.color_id
          )
          .input(
            'cantidad',
            sql.Decimal(
              18,
              3
            ),
            item.cantidad
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            item
              .unidad_medida_id
          )
          .input(
            'observacion',
            sql.NVarChar(300),
            item.observacion ||
            null
          )
          .input(
            'created_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            INSERT INTO inventario.MermaDetalle (
              merma_id,
              material_id,
              color_id,
              cantidad,
              unidad_medida_id,
              observacion,
              created_by_usuario_id
            )

            VALUES (
              @merma_id,
              @material_id,
              @color_id,
              @cantidad,
              @unidad_medida_id,
              @observacion,
              @created_by_usuario_id
            );

            SELECT
              CONVERT(
                INT,
                SCOPE_IDENTITY()
              ) AS merma_detalle_id;
          `);

      const merma_detalle_id =
        detalleResult
          .recordset[0]
          .merma_detalle_id;


      let pendiente =
        Number(
          item.cantidad
        );


      for (
        const lote
        of item.lotes
      ) {
        if (
          pendiente <=
          0.000001
        ) {
          break;
        }

        const disponibleLote =
          Number(
            lote
              .cantidad_disponible
          );

        if (
          disponibleLote <= 0
        ) {
          continue;
        }

        const consumir =
          Math.min(
            pendiente,
            disponibleLote
          );

        const consumirRedondeado =
          Number(
            consumir.toFixed(3)
          );


        const updateResult =
          await new sql.Request(
            transaction
          )
            .input(
              'stock_materia_prima_lote_id',
              sql.Int,
              lote
                .stock_materia_prima_lote_id
            )
            .input(
              'cantidad',
              sql.Decimal(
                18,
                3
              ),
              consumirRedondeado
            )
            .input(
              'updated_by_usuario_id',
              sql.Int,
              created_by_usuario_id
            )
            .query(`
              UPDATE inventario.StockMateriaPrimaLote

              SET
                cantidad_disponible =
                  cantidad_disponible -
                  @cantidad,

                updated_at =
                  SYSDATETIME(),

                updated_by_usuario_id =
                  @updated_by_usuario_id

              WHERE
                stock_materia_prima_lote_id =
                  @stock_materia_prima_lote_id

                AND
                cantidad_disponible >=
                  @cantidad;

              SELECT
                @@ROWCOUNT
                  AS filas_actualizadas;
            `);


        if (
          Number(
            updateResult
              .recordset[0]
              .filas_actualizadas
          ) !== 1
        ) {
          throw crearErrorNegocio(
            `El stock del lote ${lote.nombre_lote} cambió durante la operación. Vuelve a intentar la merma.`,
            409
          );
        }


        await new sql.Request(
          transaction
        )
          .input(
            'stock_materia_prima_lote_id',
            sql.Int,
            lote
              .stock_materia_prima_lote_id
          )
          .input(
            'cantidad',
            sql.Decimal(
              18,
              3
            ),
            consumirRedondeado
          )
          .input(
            'merma_detalle_id',
            sql.Int,
            merma_detalle_id
          )
          .input(
            'observacion',
            sql.NVarChar(400),
            `Salida por merma #${merma_id} - ${item.material} ${item.color}`
          )
          .input(
            'created_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            INSERT INTO inventario.MovimientoMateriaPrima (
              stock_materia_prima_lote_id,
              tipo_movimiento,
              cantidad,
              fecha_movimiento,
              observacion,
              created_by_usuario_id,
              produccion_detalle_id,
              merma_detalle_id
            )

            VALUES (
              @stock_materia_prima_lote_id,
              'SALIDA_MERMA',
              @cantidad,
              SYSDATETIME(),
              @observacion,
              @created_by_usuario_id,
              NULL,
              @merma_detalle_id
            );
          `);


        pendiente =
          Number(
            (
              pendiente -
              consumirRedondeado
            ).toFixed(3)
          );
      }


      if (
        pendiente >
        0.000001
      ) {
        throw crearErrorNegocio(
          `No se pudo completar el descuento FIFO de ${item.material} ${item.color}`,
          409
        );
      }
    }


    const completa =
      await obtenerMermaCompletaPorId(
        merma_id,
        transaction
      );


    await transaction.commit();


    return {
      reutilizada: false,
      merma:
        completa.merma,
      detalles:
        completa.detalles
    };


  } catch (error) {
    try {
      await transaction.rollback();
    } catch (_) {
      // Preservamos el error original.
    }


    /*
     * Defensa adicional ante una carrera de idempotencia.
     */
    if (
      [2601, 2627]
        .includes(
          error.number
        ) &&
      idempotency_key
    ) {
      const poolConsulta =
        await getConnection();

      const existenteResult =
        await poolConsulta.request()
          .input(
            'idempotency_key',
            sql.VarChar(100),
            idempotency_key
          )
          .query(`
            SELECT
              merma_id
            FROM inventario.Merma
            WHERE
              idempotency_key =
              @idempotency_key;
          `);

      const existente =
        existenteResult
          .recordset[0];

      if (existente) {
        const completa =
          await obtenerMermaCompletaPorId(
            existente.merma_id
          );

        return {
          reutilizada: true,
          merma:
            completa.merma,
          detalles:
            completa.detalles
        };
      }
    }


    throw error;
  }
};


module.exports = {
  listarMermas,
  listarDisponibilidad,
  obtenerMermaCompletaPorId,
  crearMermaFIFO
};

~~~

---

## src\modules\mermas\merma.routes.js

~~~javascript
const express = require('express');

const {
  listar,
  disponibilidad,
  obtenerPorId,
  registrar
} = require('./merma.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router =
  express.Router();


router.get(
  '/',
  verificarToken,
  listar
);


router.get(
  '/disponibilidad',
  verificarToken,
  disponibilidad
);


router.get(
  '/:merma_id',
  verificarToken,
  obtenerPorId
);


router.post(
  '/',
  verificarToken,
  registrar
);


module.exports =
  router;

~~~

---

## src\modules\pedidos\pedido.controller.js

~~~javascript
const {
  listarPedidos,
  obtenerPedidoPorId,
  crearPedidoConDetalles
} = require('./pedido.model');

const {
  actualizarPedidoConDetalles
} = require('./pedido.edicion.model');


/* =========================================================
   FECHA ACTUAL
   ========================================================= */

const fechaActual = () => {
  return new Date()
    .toISOString()
    .slice(0, 10);
};


/* =========================================================
   NORMALIZAR DETALLE
   ========================================================= */

const normalizarDetalle = (item) => {
  return {
    ...item,

    moneda_codigo:
      item.moneda_codigo
        ? String(
            item.moneda_codigo
          )
            .trim()
            .toUpperCase()
        : null,

    descripcion_item:
      item.descripcion_item
        ? String(
            item.descripcion_item
          )
            .trim()
            .toUpperCase()
        : null,

    observacion:
      item.observacion
        ? String(
            item.observacion
          ).trim()
        : null
  };
};


/* =========================================================
   VALIDAR ID
   ========================================================= */

const validarIdPositivo = (valor) => {
  const numero = Number(valor);

  return (
    Number.isInteger(numero) &&
    numero > 0
  );
};


/* =========================================================
   VALIDACIÓN DE DETALLES
   ========================================================= */

const validarDetalles = (
  detalles,
  etiqueta = 'El producto',
  {
    exigirDetalleId = false
  } = {}
) => {
  for (
    const [index, item]
    of detalles.entries()
  ) {
    const nombreItem =
      `${etiqueta} ${index + 1}`;


    /* -------------------------------------------------------
       ID DEL DETALLE EXISTENTE
       ------------------------------------------------------- */

    if (
      exigirDetalleId &&
      !validarIdPositivo(
        item.pedido_detalle_id
      )
    ) {
      return `${nombreItem} no tiene un identificador de detalle válido`;
    }


    /* -------------------------------------------------------
       TIPO / MEDIDA / COLOR / MATERIAL
       ------------------------------------------------------- */

    if (
      !validarIdPositivo(
        item.tipo_producto_id
      ) ||
      !validarIdPositivo(
        item.medida_id
      ) ||
      !validarIdPositivo(
        item.color_id
      ) ||
      !validarIdPositivo(
        item.material_id
      )
    ) {
      return `${nombreItem} debe tener tipo, medida, color y material`;
    }


    /* -------------------------------------------------------
       CANTIDAD
       ------------------------------------------------------- */

    const cantidad =
      Number(
        item.cantidad_pedida
      );


    if (
      !Number.isFinite(
        cantidad
      ) ||
      cantidad <= 0
    ) {
      return `${nombreItem} debe tener una cantidad mayor a 0`;
    }


    /* -------------------------------------------------------
       UNIDAD
       ------------------------------------------------------- */

    if (
      !validarIdPositivo(
        item.unidad_medida_id
      )
    ) {
      return `${nombreItem} debe tener una unidad`;
    }


    /* -------------------------------------------------------
       PRESENTACIÓN
       ------------------------------------------------------- */

    if (
      item.cantidad_presentacion !==
        null &&
      item.cantidad_presentacion !==
        undefined &&
      item.cantidad_presentacion !==
        ''
    ) {
      const cantidadPresentacion =
        Number(
          item.cantidad_presentacion
        );


      if (
        !Number.isFinite(
          cantidadPresentacion
        ) ||
        cantidadPresentacion <= 0
      ) {
        return `${nombreItem} debe tener una presentación mayor a 0`;
      }


      if (
        !validarIdPositivo(
          item.unidad_presentacion_id
        )
      ) {
        return `${nombreItem} debe tener una unidad de presentación`;
      }
    }


    /* -------------------------------------------------------
       PRECIO
       ------------------------------------------------------- */

    const precio =
      Number(
        item.precio_unitario
      );


    /*
     * Utilizamos > 0.
     *
     * El historial de precios también
     * requiere precios mayores a cero.
     */
    if (
      !Number.isFinite(
        precio
      ) ||
      precio <= 0
    ) {
      return `${nombreItem} debe tener un precio mayor a 0`;
    }


    /* -------------------------------------------------------
       MONEDA
       ------------------------------------------------------- */

    if (
      !item.moneda_codigo
    ) {
      return `${nombreItem} debe tener moneda`;
    }


    const moneda =
      String(
        item.moneda_codigo
      )
        .trim()
        .toUpperCase();


    if (
      ![
        'PEN',
        'USD'
      ].includes(moneda)
    ) {
      return `${nombreItem} debe tener moneda PEN o USD`;
    }
  }


  return null;
};


/* =========================================================
   LISTAR PEDIDOS
   ========================================================= */

const obtenerPedidos = async (
  req,
  res
) => {
  try {
    const {
      cliente_id,
      estado_pedido,
      q,
      page = 1,
      limit = 10
    } = req.query;


    const pagina =
      Math.max(
        1,
        Number(page) || 1
      );


    const limite =
      Math.min(
        100,
        Math.max(
          1,
          Number(limit) || 10
        )
      );


    const resultado =
      await listarPedidos({
        cliente_id:
          cliente_id
            ? Number(
                cliente_id
              )
            : null,

        estado_pedido:
          estado_pedido ||
          null,

        q:
          q
            ? String(q).trim()
            : null,

        page:
          pagina,

        limit:
          limite
      });


    res.json({
      mensaje:
        'Pedidos obtenidos correctamente',

      pedidos:
        resultado.pedidos,

      paginacion:
        resultado.paginacion
    });

  } catch (error) {
    console.error(
      'Error listar pedidos:',
      error.message
    );


    res.status(500).json({
      mensaje:
        'Error interno al listar pedidos'
    });
  }
};


/* =========================================================
   OBTENER PEDIDO
   ========================================================= */

const obtenerPedido = async (
  req,
  res
) => {
  try {
    const pedido_id =
      Number(
        req.params.pedido_id
      );


    if (
      !validarIdPositivo(
        pedido_id
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'El ID del pedido no es válido'
        });
    }


    const pedido =
      await obtenerPedidoPorId(
        pedido_id
      );


    if (!pedido) {
      return res
        .status(404)
        .json({
          mensaje:
            'Pedido no encontrado'
        });
    }


    res.json({
      mensaje:
        'Pedido obtenido correctamente',

      pedido
    });

  } catch (error) {
    console.error(
      'Error obtener pedido:',
      error.message
    );


    res.status(500).json({
      mensaje:
        'Error interno al obtener pedido'
    });
  }
};


/* =========================================================
   REGISTRAR PEDIDO
   ========================================================= */

const registrarPedido = async (
  req,
  res
) => {
  try {
    let {
      cliente_id,
      codigo_pedido,
      descripcion_pedido,
      fecha_pedido,
      fecha_entrega_estimada,
      detalles
    } = req.body;


    /* -------------------------------------------------------
       CLIENTE
       ------------------------------------------------------- */

    if (
      !validarIdPositivo(
        cliente_id
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'El cliente es obligatorio'
        });
    }


    /* -------------------------------------------------------
       PRODUCTOS
       ------------------------------------------------------- */

    if (
      !Array.isArray(
        detalles
      ) ||
      detalles.length === 0
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'El pedido debe tener al menos un producto'
        });
    }


    /* -------------------------------------------------------
       NORMALIZACIÓN CABECERA
       ------------------------------------------------------- */

    fecha_pedido =
      fecha_pedido ||
      fechaActual();


    codigo_pedido =
      codigo_pedido
        ? String(
            codigo_pedido
          )
            .trim()
            .toUpperCase()
        : null;


    descripcion_pedido =
      descripcion_pedido
        ? String(
            descripcion_pedido
          ).trim()
        : null;


    fecha_entrega_estimada =
      fecha_entrega_estimada ||
      null;


    /* -------------------------------------------------------
       NORMALIZACIÓN PRODUCTOS
       ------------------------------------------------------- */

    detalles =
      detalles.map(
        normalizarDetalle
      );


    const errorValidacion =
      validarDetalles(
        detalles,
        'El producto'
      );


    if (
      errorValidacion
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            errorValidacion
        });
    }


    /* -------------------------------------------------------
       CREAR
       ------------------------------------------------------- */

    const resultado =
      await crearPedidoConDetalles({
        cliente_id:
          Number(
            cliente_id
          ),

        codigo_pedido,

        descripcion_pedido,

        fecha_pedido,

        fecha_entrega_estimada,

        detalles,

        created_by_usuario_id:
          req.usuario.usuario_id
      });


    res
      .status(201)
      .json({
        mensaje:
          'Pedido registrado correctamente',

        pedido:
          resultado.pedido,

        detalles:
          resultado.detalles
      });

  } catch (error) {
    console.error(
      'Error registrar pedido:',
      error.message
    );


    /*
     * Error de negocio.
     *
     * Ejemplo:
     * combinación inexistente en Productos terminados.
     */
    if (
      error.statusCode
    ) {
      return res
        .status(
          error.statusCode
        )
        .json({
          mensaje:
            error.message
        });
    }


    /*
     * Código de pedido duplicado.
     */
    if (
      error.number === 2601 ||
      error.number === 2627
    ) {
      return res
        .status(409)
        .json({
          mensaje:
            'Ya existe un pedido con ese código'
        });
    }


    /*
     * FK inválida.
     */
    if (
      error.number === 547
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'Uno de los datos seleccionados para el pedido no es válido'
        });
    }


    res
      .status(500)
      .json({
        mensaje:
          'Error interno al registrar pedido'
      });
  }
};


/* =========================================================
   EDITAR PEDIDO
   ========================================================= */

const editarPedido = async (
  req,
  res
) => {
  try {
    /* =====================================================
       1. ID DEL PEDIDO
       ===================================================== */

    const pedido_id =
      Number(
        req.params.pedido_id
      );


    if (
      !validarIdPositivo(
        pedido_id
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'El ID del pedido no es válido'
        });
    }


    /* =====================================================
       2. BODY
       ===================================================== */

    let {
      cliente_id,

      codigo_pedido,

      descripcion_pedido,

      fecha_pedido,

      fecha_entrega_estimada,

      motivo_cambio,

      detalles_editados = [],

      nuevos_detalles = []
    } = req.body;


    /* =====================================================
       3. CABECERA
       ===================================================== */

    if (
      !validarIdPositivo(
        cliente_id
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'El cliente es obligatorio'
        });
    }


    if (
      !fecha_pedido
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'La fecha del pedido es obligatoria'
        });
    }


    if (
      !motivo_cambio ||
      String(
        motivo_cambio
      ).trim() === ''
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'Debe ingresar el motivo del cambio'
        });
    }


    /* =====================================================
       4. VALIDAR ARRAYS
       ===================================================== */

    if (
      !Array.isArray(
        detalles_editados
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'Los productos editados no tienen un formato válido'
        });
    }


    if (
      !Array.isArray(
        nuevos_detalles
      )
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'Los nuevos productos no tienen un formato válido'
        });
    }


    /* =====================================================
       5. NORMALIZAR CABECERA
       ===================================================== */

    codigo_pedido =
      codigo_pedido
        ? String(
            codigo_pedido
          )
            .trim()
            .toUpperCase()
        : null;


    descripcion_pedido =
      descripcion_pedido
        ? String(
            descripcion_pedido
          ).trim()
        : null;


    fecha_entrega_estimada =
      fecha_entrega_estimada ||
      null;


    motivo_cambio =
      String(
        motivo_cambio
      ).trim();


    /* =====================================================
       6. NORMALIZAR DETALLES EDITADOS
       ===================================================== */

    detalles_editados =
      detalles_editados.map(
        normalizarDetalle
      );


    nuevos_detalles =
      nuevos_detalles.map(
        normalizarDetalle
      );


    /* =====================================================
       7. EVITAR IDs DUPLICADOS
       ===================================================== */

    const idsDetalles =
      detalles_editados.map(
        (item) =>
          Number(
            item.pedido_detalle_id
          )
      );


    const idsUnicos =
      new Set(
        idsDetalles
      );


    if (
      idsUnicos.size !==
      idsDetalles.length
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'No se puede editar dos veces el mismo producto del pedido'
        });
    }


    /* =====================================================
       8. VALIDAR PRODUCTOS EXISTENTES
       ===================================================== */

    if (
      detalles_editados.length >
      0
    ) {
      const errorValidacion =
        validarDetalles(
          detalles_editados,
          'El producto editado',
          {
            exigirDetalleId:
              true
          }
        );


      if (
        errorValidacion
      ) {
        return res
          .status(400)
          .json({
            mensaje:
              errorValidacion
          });
      }
    }


    /* =====================================================
       9. VALIDAR PRODUCTOS NUEVOS
       ===================================================== */

    if (
      nuevos_detalles.length >
      0
    ) {
      const errorValidacion =
        validarDetalles(
          nuevos_detalles,
          'El nuevo producto'
        );


      if (
        errorValidacion
      ) {
        return res
          .status(400)
          .json({
            mensaje:
              errorValidacion
          });
      }
    }


    /* =====================================================
       10. EJECUTAR TRANSACCIÓN
       ===================================================== */

    const resultado =
      await actualizarPedidoConDetalles({
        pedido_id,

        cliente_id:
          Number(
            cliente_id
          ),

        codigo_pedido,

        descripcion_pedido,

        fecha_pedido,

        fecha_entrega_estimada,

        motivo_cambio,

        detalles_editados,

        nuevos_detalles,

        updated_by_usuario_id:
          req.usuario.usuario_id
      });


    /* =====================================================
       11. PEDIDO NO ENCONTRADO
       ===================================================== */

    if (
      !resultado
    ) {
      return res
        .status(404)
        .json({
          mensaje:
            'Pedido no encontrado o cancelado'
        });
    }


    /* =====================================================
       12. RESPUESTA
       ===================================================== */

    res.json({
      mensaje:
        'Pedido actualizado correctamente',

      pedido:
        resultado.pedido,

      detalles_actualizados:
        resultado.detalles_actualizados,

      detalles_agregados:
        resultado.detalles_agregados
    });

  } catch (error) {
    console.error(
      'Error editar pedido:',
      error.message
    );


    /* =====================================================
       ERRORES DE NEGOCIO
       ===================================================== */

    /*
     * Estos errores vienen de:
     *
     * pedido.edicion.model.js
     *
     * Ejemplos:
     *
     * - cantidad menor a lo entregado
     * - producto con entrega y cambio estructural
     * - total inferior a depósitos
     * - pedido completamente entregado
     */
    if (
      error.statusCode
    ) {
      return res
        .status(
          error.statusCode
        )
        .json({
          mensaje:
            error.message
        });
    }


    /* =====================================================
       CÓDIGO DE PEDIDO DUPLICADO
       ===================================================== */

    if (
      error.number === 2601 ||
      error.number === 2627
    ) {
      return res
        .status(409)
        .json({
          mensaje:
            'Ya existe otro pedido con ese código'
        });
    }


    /* =====================================================
       FOREIGN KEY / CHECK CONSTRAINT
       ===================================================== */

    if (
      error.number === 547
    ) {
      return res
        .status(400)
        .json({
          mensaje:
            'Uno de los datos seleccionados para el pedido no es válido'
        });
    }


    /* =====================================================
       ERROR GENERAL
       ===================================================== */

    res
      .status(500)
      .json({
        mensaje:
          'Error interno al editar pedido'
      });
  }
};


/* =========================================================
   EXPORTS
   ========================================================= */

module.exports = {
  obtenerPedidos,
  obtenerPedido,
  registrarPedido,
  editarPedido
};
~~~

---

## src\modules\pedidos\pedido.edicion.model.js

~~~javascript
const {
  getConnection,
  sql
} = require('../../config/db');

const {
  obtenerPedidoPorId,
  registrarHistorialPrecioCliente
} = require('./pedido.model');

const {
  resolverProductoPedido
} = require('./pedido.producto.helper');


/* =========================================================
   TIPOS DE CAMBIO PERMITIDOS POR LA BASE DE DATOS

   CK_PedidoCambio_Tipo permite únicamente:

   - CREACION
   - EDICION
   - AUMENTO_PRODUCTOS
   - CANCELACION
   ========================================================= */

const TIPO_CAMBIO = Object.freeze({
  EDICION: 'EDICION',
  AUMENTO_PRODUCTOS: 'AUMENTO_PRODUCTOS'
});


/* =========================================================
   ERROR DE NEGOCIO
   ========================================================= */

const crearErrorNegocio = (
  mensaje,
  statusCode = 400
) => {
  const error =
    new Error(mensaje);

  error.statusCode =
    statusCode;

  return error;
};


/* =========================================================
   ACTUALIZAR PEDIDO CON DETALLES
   ========================================================= */

const actualizarPedidoConDetalles =
  async ({
    pedido_id,

    cliente_id,

    codigo_pedido,

    descripcion_pedido,

    fecha_pedido,

    fecha_entrega_estimada,

    motivo_cambio,

    detalles_editados = [],

    nuevos_detalles = [],

    updated_by_usuario_id
  }) => {

    const pool =
      await getConnection();


    const transaction =
      new sql.Transaction(
        pool
      );


    try {

      /* =====================================================
         1. INICIAR TRANSACCIÓN
         ===================================================== */

      await transaction.begin(
        sql.ISOLATION_LEVEL.SERIALIZABLE
      );


      /* =====================================================
         2. OBTENER Y BLOQUEAR PEDIDO
         ===================================================== */

      const pedidoActualResult =
        await new sql.Request(
          transaction
        )
          .input(
            'pedido_id',
            sql.Int,
            pedido_id
          )
          .query(`
            SELECT
              pedido_id,
              cliente_id,
              estado_pedido

            FROM ventas.Pedido
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            WHERE
              pedido_id =
                @pedido_id;
          `);


      const pedidoActual =
        pedidoActualResult
          .recordset[0];


      if (!pedidoActual) {
        throw crearErrorNegocio(
          'Pedido no encontrado',
          404
        );
      }


      if (
        pedidoActual.estado_pedido ===
        'CANCELADO'
      ) {
        throw crearErrorNegocio(
          'No se puede editar un pedido cancelado',
          409
        );
      }


      if (
        pedidoActual.estado_pedido ===
        'ENTREGADO'
      ) {
        throw crearErrorNegocio(
          'No se puede editar un pedido completamente entregado',
          409
        );
      }


      /* =====================================================
         3. OBTENER DETALLES Y CANTIDADES ENTREGADAS
         ===================================================== */

      const detallesActualesResult =
        await new sql.Request(
          transaction
        )
          .input(
            'pedido_id',
            sql.Int,
            pedido_id
          )
          .query(`
            SELECT
              pd.pedido_detalle_id,
              pd.producto_id,

              pd.tipo_producto_id,
              pd.medida_id,
              pd.color_id,
              pd.material_id,

              pd.cantidad_pedida,

              pd.unidad_medida_id,

              pd.cantidad_presentacion,
              pd.unidad_presentacion_id,

              pd.precio_unitario,
              pd.moneda_codigo,

              pd.descripcion_item,
              pd.observacion,

              ISNULL(
                SUM(
                  ed.cantidad_entregada
                ),
                0
              ) AS cantidad_entregada

            FROM ventas.PedidoDetalle pd
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            LEFT JOIN ventas.EntregaDetalle ed
              ON
                pd.pedido_detalle_id =
                ed.pedido_detalle_id

            WHERE
              pd.pedido_id =
                @pedido_id

              AND pd.activo = 1

            GROUP BY
              pd.pedido_detalle_id,
              pd.producto_id,

              pd.tipo_producto_id,
              pd.medida_id,
              pd.color_id,
              pd.material_id,

              pd.cantidad_pedida,

              pd.unidad_medida_id,

              pd.cantidad_presentacion,
              pd.unidad_presentacion_id,

              pd.precio_unitario,
              pd.moneda_codigo,

              pd.descripcion_item,
              pd.observacion;
          `);


      const detallesActuales =
        detallesActualesResult
          .recordset;


      const detallesMap =
        new Map(
          detallesActuales.map(
            (detalle) => [
              Number(
                detalle
                  .pedido_detalle_id
              ),

              detalle
            ]
          )
        );


      /* =====================================================
         4. VALIDAR TODOS LOS DETALLES ANTES DE MODIFICAR
         ===================================================== */

      for (
        const item
        of detalles_editados
      ) {

        const detalleActual =
          detallesMap.get(
            Number(
              item
                .pedido_detalle_id
            )
          );


        if (!detalleActual) {
          throw crearErrorNegocio(
            `El producto ${item.pedido_detalle_id} no pertenece al pedido o ya no está activo`,
            400
          );
        }


        const cantidadEntregada =
          Number(
            detalleActual
              .cantidad_entregada ||
            0
          );


        const nuevaCantidad =
          Number(
            item.cantidad_pedida
          );


        /* ---------------------------------------------------
           CANTIDAD VÁLIDA
           --------------------------------------------------- */

        if (
          !Number.isFinite(
            nuevaCantidad
          ) ||
          nuevaCantidad <= 0
        ) {
          throw crearErrorNegocio(
            `La cantidad del producto ${item.pedido_detalle_id} debe ser mayor a 0`,
            400
          );
        }


        /* ---------------------------------------------------
           NO MENOR A LO YA ENTREGADO
           --------------------------------------------------- */

        if (
          nuevaCantidad <
          cantidadEntregada
        ) {
          throw crearErrorNegocio(
            `La cantidad del producto ${item.pedido_detalle_id} no puede ser menor a lo ya entregado (${cantidadEntregada})`,
            409
          );
        }


        /* ---------------------------------------------------
           PRODUCTO CON ENTREGAS

           Preservamos:
           - tipo
           - medida
           - color
           - material
           - unidad
           - moneda

           Permitimos:
           - cantidad
           - presentación
           - precio
           - descripción
           - observación
           --------------------------------------------------- */

        if (
          cantidadEntregada > 0
        ) {

          const cambioEstructural =

            Number(
              item.tipo_producto_id
            ) !==
            Number(
              detalleActual
                .tipo_producto_id
            )

            ||

            Number(
              item.medida_id
            ) !==
            Number(
              detalleActual
                .medida_id
            )

            ||

            Number(
              item.color_id
            ) !==
            Number(
              detalleActual
                .color_id
            )

            ||

            Number(
              item.material_id
            ) !==
            Number(
              detalleActual
                .material_id
            )

            ||

            Number(
              item.unidad_medida_id
            ) !==
            Number(
              detalleActual
                .unidad_medida_id
            )

            ||

            String(
              item.moneda_codigo
            ).toUpperCase() !==
            String(
              detalleActual
                .moneda_codigo
            ).toUpperCase();


          if (
            cambioEstructural
          ) {
            throw crearErrorNegocio(
              `El producto ${item.pedido_detalle_id} ya tiene entregas. No se puede cambiar tipo, medida, color, material, unidad ni moneda`,
              409
            );
          }
        }
      }


      /* =====================================================
         5. DETERMINAR TIPO DE CAMBIO
         ===================================================== */

      /*
       * MUY IMPORTANTE:
       *
       * No volver a utilizar:
       *
       * EDICION_PRODUCTOS
       * EDICION_Y_AUMENTO_PRODUCTOS
       *
       * porque NO existen en el CHECK de SQL Server.
       */

      let tipoCambio =
        TIPO_CAMBIO.EDICION;


      /*
       * Este caso aplica cuando el endpoint
       * únicamente añade productos.
       *
       * En la edición normal que estamos
       * haciendo ahora habrá detalles_editados,
       * así que será EDICION.
       */
      if (
        detalles_editados.length ===
          0 &&
        nuevos_detalles.length >
          0
      ) {
        tipoCambio =
          TIPO_CAMBIO
            .AUMENTO_PRODUCTOS;
      }


      /* =====================================================
         6. REGISTRAR HISTORIAL DEL CAMBIO
         ===================================================== */

      const cambioResult =
        await new sql.Request(
          transaction
        )
          .input(
            'pedido_id',
            sql.Int,
            pedido_id
          )

          .input(
            'tipo_cambio',
            sql.VarChar(40),
            tipoCambio
          )

          .input(
            'descripcion_motivo',
            sql.NVarChar(500),
            motivo_cambio
          )

          .input(
            'created_by_usuario_id',
            sql.Int,
            updated_by_usuario_id
          )

          .query(`
            INSERT INTO ventas.PedidoCambio (
              pedido_id,
              tipo_cambio,
              descripcion_motivo,
              created_by_usuario_id
            )

            OUTPUT
              INSERTED.pedido_cambio_id

            VALUES (
              @pedido_id,
              @tipo_cambio,
              @descripcion_motivo,
              @created_by_usuario_id
            );
          `);


      const pedido_cambio_id =
        cambioResult
          .recordset[0]
          .pedido_cambio_id;


      /* =====================================================
         7. ACTUALIZAR PRODUCTOS EXISTENTES
         ===================================================== */

      const detallesActualizados =
        [];


      for (
        const item
        of detalles_editados
      ) {

        const detalleActual =
          detallesMap.get(
            Number(
              item
                .pedido_detalle_id
            )
          );


        const producto_id =
          await resolverProductoPedido({
            transaction,
            tipo_producto_id:
              item.tipo_producto_id,
            material_id:
              item.material_id,
            medida_id:
              item.medida_id,
            color_id:
              item.color_id
          });


        /* ---------------------------------------------------
           UNIDAD DE PRESENTACIÓN
           --------------------------------------------------- */

        const unidadPresentacionId =
          item.cantidad_presentacion
            ? (
                item
                  .unidad_presentacion_id ||
                item
                  .unidad_medida_id
              )
            : null;


        /* ---------------------------------------------------
           UPDATE
           --------------------------------------------------- */

        const detalleResult =
          await new sql.Request(
            transaction
          )

            .input(
              'pedido_detalle_id',
              sql.Int,
              item
                .pedido_detalle_id
            )

            .input(
              'producto_id',
              sql.Int,
              producto_id
            )

            .input(
              'tipo_producto_id',
              sql.Int,
              item
                .tipo_producto_id
            )

            .input(
              'medida_id',
              sql.Int,
              item.medida_id
            )

            .input(
              'color_id',
              sql.Int,
              item.color_id
            )

            .input(
              'material_id',
              sql.Int,
              item.material_id
            )

            .input(
              'cantidad_pedida',
              sql.Decimal(
                18,
                3
              ),
              item.cantidad_pedida
            )

            .input(
              'unidad_medida_id',
              sql.Int,
              item.unidad_medida_id
            )

            .input(
              'cantidad_presentacion',
              sql.Decimal(
                18,
                3
              ),
              item.cantidad_presentacion ||
              null
            )

            .input(
              'unidad_presentacion_id',
              sql.Int,
              unidadPresentacionId
            )

            .input(
              'precio_unitario',
              sql.Decimal(
                18,
                4
              ),
              item.precio_unitario
            )

            .input(
              'moneda_codigo',
              sql.Char(3),
              item.moneda_codigo
            )

            .input(
              'descripcion_item',
              sql.NVarChar(300),
              item.descripcion_item ||
              null
            )

            .input(
              'observacion',
              sql.NVarChar(300),
              item.observacion ||
              null
            )

            .query(`
              UPDATE ventas.PedidoDetalle

              SET
                producto_id =
                  @producto_id,

                tipo_producto_id =
                  @tipo_producto_id,

                medida_id =
                  @medida_id,

                color_id =
                  @color_id,

                material_id =
                  @material_id,

                cantidad_pedida =
                  @cantidad_pedida,

                unidad_medida_id =
                  @unidad_medida_id,

                cantidad_presentacion =
                  @cantidad_presentacion,

                unidad_presentacion_id =
                  @unidad_presentacion_id,

                precio_unitario =
                  @precio_unitario,

                moneda_codigo =
                  @moneda_codigo,

                descripcion_item =
                  @descripcion_item,

                observacion =
                  @observacion

              OUTPUT
                INSERTED.pedido_detalle_id,
                INSERTED.pedido_id,
                INSERTED.producto_id,

                INSERTED.tipo_producto_id,
                INSERTED.medida_id,
                INSERTED.color_id,
                INSERTED.material_id,

                INSERTED.cantidad_pedida,
                INSERTED.unidad_medida_id,

                INSERTED.cantidad_presentacion,
                INSERTED.unidad_presentacion_id,

                INSERTED.precio_unitario,
                INSERTED.moneda_codigo,

                INSERTED.descripcion_item,
                INSERTED.observacion

              WHERE
                pedido_detalle_id =
                  @pedido_detalle_id

                AND activo = 1;
            `);


        const detalleActualizado =
          detalleResult
            .recordset[0];


        if (
          !detalleActualizado
        ) {
          throw crearErrorNegocio(
            `No se pudo actualizar el producto ${item.pedido_detalle_id}`,
            409
          );
        }


        /* ===================================================
           HISTORIAL DE PRECIOS
           =================================================== */

        const cambioCliente =
          Number(
            pedidoActual
              .cliente_id
          ) !==
          Number(
            cliente_id
          );


        const cambioPrecio =
          Number(
            detalleActual
              .precio_unitario
          ) !==
          Number(
            item.precio_unitario
          );


        const cambioTipo =
          Number(
            detalleActual
              .tipo_producto_id
          ) !==
          Number(
            item.tipo_producto_id
          );


        const cambioMedida =
          Number(
            detalleActual
              .medida_id
          ) !==
          Number(
            item.medida_id
          );


        const cambioColor =
          Number(
            detalleActual
              .color_id
          ) !==
          Number(
            item.color_id
          );


        const cambioMaterial =
          Number(
            detalleActual
              .material_id
          ) !==
          Number(
            item.material_id
          );


        const cambioMoneda =
          String(
            detalleActual
              .moneda_codigo
          ).toUpperCase() !==
          String(
            item.moneda_codigo
          ).toUpperCase();


        const debeRegistrarPrecio =
          cambioCliente ||
          cambioPrecio ||
          cambioTipo ||
          cambioMedida ||
          cambioColor ||
          cambioMaterial ||
          cambioMoneda;


        /*
         * Ejemplo:
         *
         * 100 KG → 80 KG
         *
         * NO genera historial de precio.
         *
         * S/ 5 → S/ 16
         *
         * SÍ genera historial de precio.
         */
        if (
          debeRegistrarPrecio
        ) {

          await registrarHistorialPrecioCliente({
            transaction,

            cliente_id,

            pedido_id,

            pedido_detalle_id:
              detalleActualizado
                .pedido_detalle_id,

            item,

            created_by_usuario_id:
              updated_by_usuario_id
          });
        }


        detallesActualizados.push(
          detalleActualizado
        );
      }


      /* =====================================================
         8. AGREGAR PRODUCTOS NUEVOS
         ===================================================== */

      const detallesCreados =
        [];


      for (
        const item
        of nuevos_detalles
      ) {

        const producto_id =
          await resolverProductoPedido({
            transaction,
            tipo_producto_id:
              item.tipo_producto_id,
            material_id:
              item.material_id,
            medida_id:
              item.medida_id,
            color_id:
              item.color_id
          });


        const unidadPresentacionId =
          item.cantidad_presentacion
            ? (
                item
                  .unidad_presentacion_id ||
                item
                  .unidad_medida_id
              )
            : null;


        const detalleResult =
          await new sql.Request(
            transaction
          )

            .input(
              'pedido_id',
              sql.Int,
              pedido_id
            )

            .input(
              'pedido_cambio_id',
              sql.Int,
              pedido_cambio_id
            )

            .input(
              'producto_id',
              sql.Int,
              producto_id
            )

            .input(
              'tipo_producto_id',
              sql.Int,
              item.tipo_producto_id
            )

            .input(
              'medida_id',
              sql.Int,
              item.medida_id
            )

            .input(
              'color_id',
              sql.Int,
              item.color_id
            )

            .input(
              'material_id',
              sql.Int,
              item.material_id
            )

            .input(
              'cantidad_pedida',
              sql.Decimal(
                18,
                3
              ),
              item.cantidad_pedida
            )

            .input(
              'unidad_medida_id',
              sql.Int,
              item.unidad_medida_id
            )

            .input(
              'cantidad_presentacion',
              sql.Decimal(
                18,
                3
              ),
              item.cantidad_presentacion ||
              null
            )

            .input(
              'unidad_presentacion_id',
              sql.Int,
              unidadPresentacionId
            )

            .input(
              'precio_unitario',
              sql.Decimal(
                18,
                4
              ),
              item.precio_unitario
            )

            .input(
              'moneda_codigo',
              sql.Char(3),
              item.moneda_codigo
            )

            .input(
              'descripcion_item',
              sql.NVarChar(300),
              item.descripcion_item ||
              null
            )

            .input(
              'observacion',
              sql.NVarChar(300),
              item.observacion ||
              null
            )

            .input(
              'created_by_usuario_id',
              sql.Int,
              updated_by_usuario_id
            )

            .query(`
              INSERT INTO ventas.PedidoDetalle (
                pedido_id,

                pedido_cambio_id,

                producto_id,

                tipo_producto_id,
                medida_id,
                color_id,
                material_id,

                cantidad_pedida,
                unidad_medida_id,

                cantidad_presentacion,
                unidad_presentacion_id,

                precio_unitario,
                moneda_codigo,

                descripcion_item,
                observacion,

                created_by_usuario_id
              )

              OUTPUT
                INSERTED.pedido_detalle_id,
                INSERTED.pedido_id,
                INSERTED.producto_id,

                INSERTED.tipo_producto_id,
                INSERTED.medida_id,
                INSERTED.color_id,
                INSERTED.material_id,

                INSERTED.cantidad_pedida,
                INSERTED.unidad_medida_id,

                INSERTED.cantidad_presentacion,
                INSERTED.unidad_presentacion_id,

                INSERTED.precio_unitario,
                INSERTED.moneda_codigo,

                INSERTED.descripcion_item,
                INSERTED.observacion

              VALUES (
                @pedido_id,

                @pedido_cambio_id,

                @producto_id,

                @tipo_producto_id,
                @medida_id,
                @color_id,
                @material_id,

                @cantidad_pedida,
                @unidad_medida_id,

                @cantidad_presentacion,
                @unidad_presentacion_id,

                @precio_unitario,
                @moneda_codigo,

                @descripcion_item,
                @observacion,

                @created_by_usuario_id
              );
            `);


        const detalleCreado =
          detalleResult
            .recordset[0];


        /*
         * Todo producto nuevo genera
         * historial de precio.
         */
        await registrarHistorialPrecioCliente({
          transaction,

          cliente_id,

          pedido_id,

          pedido_detalle_id:
            detalleCreado
              .pedido_detalle_id,

          item,

          created_by_usuario_id:
            updated_by_usuario_id
        });


        detallesCreados.push(
          detalleCreado
        );
      }


      /* =====================================================
         9. VALIDAR DEPÓSITOS
         ===================================================== */

      /*
       * Después de modificar cantidades
       * y precios:
       *
       * NUEVO TOTAL DEL PEDIDO
       * nunca puede quedar por debajo
       * de lo ya depositado.
       */

      const depositoInvalidoResult =
        await new sql.Request(
          transaction
        )

          .input(
            'pedido_id',
            sql.Int,
            pedido_id
          )

          .query(`
            WITH TotalesPedido AS (
              SELECT
                moneda_codigo,

                SUM(
                  cantidad_pedida *
                  precio_unitario
                ) AS total_pedido

              FROM ventas.PedidoDetalle

              WHERE
                pedido_id =
                  @pedido_id

                AND activo = 1

              GROUP BY
                moneda_codigo
            ),

            TotalesDeposito AS (
              SELECT
                moneda_codigo,

                SUM(
                  monto
                ) AS total_depositado

              FROM finance.Deposito

              WHERE
                pedido_id =
                  @pedido_id

              GROUP BY
                moneda_codigo
            )

            SELECT TOP 1
              td.moneda_codigo,

              ISNULL(
                tp.total_pedido,
                0
              ) AS total_pedido,

              td.total_depositado

            FROM TotalesDeposito td

            LEFT JOIN TotalesPedido tp
              ON
                td.moneda_codigo =
                tp.moneda_codigo

            WHERE
              td.total_depositado >
              ISNULL(
                tp.total_pedido,
                0
              );
          `);


      const depositoInvalido =
        depositoInvalidoResult
          .recordset[0];


      if (
        depositoInvalido
      ) {
        throw crearErrorNegocio(
          `La edición no es válida porque el total del pedido en ${depositoInvalido.moneda_codigo} quedaría en ${Number(depositoInvalido.total_pedido).toFixed(2)}, por debajo de lo ya depositado (${Number(depositoInvalido.total_depositado).toFixed(2)})`,
          409
        );
      }


      /* =====================================================
         10. ACTUALIZAR CABECERA DEL PEDIDO
         ===================================================== */

      const pedidoResult =
        await new sql.Request(
          transaction
        )

          .input(
            'pedido_id',
            sql.Int,
            pedido_id
          )

          .input(
            'cliente_id',
            sql.Int,
            cliente_id
          )

          .input(
            'codigo_pedido',
            sql.VarChar(50),
            codigo_pedido ||
            null
          )

          .input(
            'descripcion_pedido',
            sql.NVarChar(500),
            descripcion_pedido ||
            null
          )

          .input(
            'fecha_pedido',
            sql.Date,
            fecha_pedido
          )

          .input(
            'fecha_entrega_estimada',
            sql.Date,
            fecha_entrega_estimada ||
            null
          )

          .input(
            'updated_by_usuario_id',
            sql.Int,
            updated_by_usuario_id
          )

          .query(`
            UPDATE ventas.Pedido

            SET
              cliente_id =
                @cliente_id,

              codigo_pedido =
                @codigo_pedido,

              descripcion_pedido =
                @descripcion_pedido,

              fecha_pedido =
                @fecha_pedido,

              fecha_entrega_estimada =
                @fecha_entrega_estimada,

              updated_at =
                SYSDATETIME(),

              updated_by_usuario_id =
                @updated_by_usuario_id

            WHERE
              pedido_id =
                @pedido_id

              AND estado_pedido <>
                'CANCELADO';
          `);


      if (
        pedidoResult
          .rowsAffected[0] !==
        1
      ) {
        throw crearErrorNegocio(
          'El pedido ya no está disponible para edición',
          409
        );
      }


      /* =====================================================
         11. RECALCULAR ESTADO DEL PEDIDO
         ===================================================== */

      await new sql.Request(
        transaction
      )

        .input(
          'pedido_id',
          sql.Int,
          pedido_id
        )

        .input(
          'updated_by_usuario_id',
          sql.Int,
          updated_by_usuario_id
        )

        .query(`
          UPDATE ventas.Pedido

          SET
            estado_pedido =
              CASE

                /* ------------------------------------------
                   SIN NINGUNA ENTREGA
                   ------------------------------------------ */

                WHEN NOT EXISTS (
                  SELECT 1

                  FROM ventas.PedidoDetalle pd

                  INNER JOIN ventas.EntregaDetalle ed
                    ON
                      pd.pedido_detalle_id =
                      ed.pedido_detalle_id

                  WHERE
                    pd.pedido_id =
                      @pedido_id

                    AND pd.activo = 1
                )

                THEN
                  'REGISTRADO'


                /* ------------------------------------------
                   TODOS LOS PRODUCTOS COMPLETOS
                   ------------------------------------------ */

                WHEN NOT EXISTS (
                  SELECT 1

                  FROM ventas.PedidoDetalle pd

                  OUTER APPLY (
                    SELECT
                      ISNULL(
                        SUM(
                          ed.cantidad_entregada
                        ),
                        0
                      ) AS total_entregado

                    FROM ventas.EntregaDetalle ed

                    WHERE
                      ed.pedido_detalle_id =
                      pd.pedido_detalle_id
                  ) entregas

                  WHERE
                    pd.pedido_id =
                      @pedido_id

                    AND pd.activo = 1

                    AND
                      entregas.total_entregado <
                      pd.cantidad_pedida
                )

                THEN
                  'ENTREGADO'


                /* ------------------------------------------
                   EXISTEN ENTREGAS PERO QUEDA PENDIENTE
                   ------------------------------------------ */

                ELSE
                  'PARCIAL'

              END,

            updated_at =
              SYSDATETIME(),

            updated_by_usuario_id =
              @updated_by_usuario_id

          WHERE
            pedido_id =
              @pedido_id;
        `);


      /* =====================================================
         12. COMMIT
         ===================================================== */

      await transaction.commit();


      /* =====================================================
         13. RECUPERAR PEDIDO ACTUALIZADO
         ===================================================== */

      const pedidoActualizado =
        await obtenerPedidoPorId(
          pedido_id
        );


      return {
        pedido:
          pedidoActualizado,

        detalles_actualizados:
          detallesActualizados,

        detalles_agregados:
          detallesCreados
      };


    } catch (error) {

      /* =====================================================
         ROLLBACK
         ===================================================== */

      try {
        await transaction.rollback();

      } catch (_) {
        /*
         * SQL Server puede haber abortado
         * previamente la transacción.
         *
         * Conservamos el error original.
         */
      }


      throw error;
    }
  };


module.exports = {
  actualizarPedidoConDetalles
};
~~~

---

## src\modules\pedidos\pedido.model.js

~~~javascript
const { getConnection, sql } = require('../../config/db');

const {
  resolverProductoPedido
} = require('./pedido.producto.helper');

const registrarHistorialPrecioCliente = async ({
  transaction,
  cliente_id,
  pedido_id,
  pedido_detalle_id,
  item,
  created_by_usuario_id
}) => {
  const requestPrecio = new sql.Request(transaction);

  await requestPrecio
    .input('cliente_id', sql.Int, cliente_id)
    .input('pedido_id', sql.Int, pedido_id)
    .input('pedido_detalle_id', sql.Int, pedido_detalle_id)
    .input('tipo_producto_id', sql.Int, item.tipo_producto_id)
    .input('medida_id', sql.Int, item.medida_id)
    .input('color_id', sql.Int, item.color_id)
    .input('material_id', sql.Int, item.material_id)
    .input('fecha_precio', sql.Date, new Date())
    .input('precio_unitario', sql.Decimal(18, 4), item.precio_unitario)
    .input('moneda_codigo', sql.Char(3), item.moneda_codigo)
    .input('observacion', sql.NVarChar(300), 'Precio registrado automáticamente desde pedido')
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO crm.ClientePrecioHistorial (
        cliente_id,
        pedido_id,
        pedido_detalle_id,
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
      VALUES (
        @cliente_id,
        @pedido_id,
        @pedido_detalle_id,
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
};

const listarPedidos = async ({
  cliente_id,
  estado_pedido,
  q,
  page = 1,
  limit = 10
}) => {
  const pool = await getConnection();
  const offset = (page - 1) * limit;

  const result = await pool.request()
    .input('cliente_id', sql.Int, cliente_id || null)
    .input('estado_pedido', sql.VarChar(30), estado_pedido || null)
    .input('q', sql.NVarChar(150), q ? `%${q}%` : null)
    .input('offset', sql.Int, offset)
    .input('limit', sql.Int, limit)
    .query(`
      WITH PedidosResumen AS (
        SELECT
          p.pedido_id,
          p.codigo_pedido,
          p.descripcion_pedido,
          p.fecha_pedido,
          p.fecha_entrega_estimada,
          p.estado_pedido,
          p.created_at,

          c.cliente_id,
          c.ruc,
          c.razon_social,

          u.nombre_completo AS registrado_por,

          COUNT(pd.pedido_detalle_id) AS cantidad_items,

          ISNULL(SUM(pd.cantidad_pedida * pd.precio_unitario), 0) AS total_referencial,

          MAX(cant.resumen_cantidades) AS resumen_cantidades

        FROM ventas.Pedido p
        INNER JOIN crm.Cliente c
          ON p.cliente_id = c.cliente_id
        INNER JOIN auth.Usuario u
          ON p.created_by_usuario_id = u.usuario_id
        LEFT JOIN ventas.PedidoDetalle pd
          ON p.pedido_id = pd.pedido_id
          AND pd.activo = 1

        OUTER APPLY (
          SELECT
            STRING_AGG(
              CONCAT(
                CONVERT(VARCHAR(30), CAST(x.cantidad_total AS DECIMAL(18,3))),
                ' ',
                x.unidad
              ),
              '|'
            ) AS resumen_cantidades
          FROM (
            SELECT
              SUM(pd2.cantidad_pedida) AS cantidad_total,
              um2.codigo AS unidad
            FROM ventas.PedidoDetalle pd2
            INNER JOIN catalog.UnidadMedida um2
              ON pd2.unidad_medida_id = um2.unidad_medida_id
            WHERE pd2.pedido_id = p.pedido_id
              AND pd2.activo = 1
            GROUP BY um2.codigo
          ) x
        ) cant

        WHERE
          (@cliente_id IS NULL OR p.cliente_id = @cliente_id)
          AND (@estado_pedido IS NULL OR p.estado_pedido = @estado_pedido)
          AND (
            @q IS NULL
            OR c.razon_social LIKE @q
            OR c.ruc LIKE @q
            OR p.codigo_pedido LIKE @q
            OR p.descripcion_pedido LIKE @q
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
          c.ruc,
          c.razon_social,
          u.nombre_completo
      )
      SELECT
        *,
        COUNT(*) OVER() AS total_registros
      FROM PedidosResumen
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

const obtenerPedidoCabeceraPorId = async (pedido_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .query(`
      SELECT
        p.pedido_id,
        p.codigo_pedido,
        p.descripcion_pedido,
        p.fecha_pedido,
        p.fecha_entrega_estimada,
        p.estado_pedido,
        p.created_at,
        p.updated_at,

        c.cliente_id,
        c.ruc,
        c.razon_social,
        c.direccion,
        c.agencia_entrega,

        u.nombre_completo AS registrado_por
      FROM ventas.Pedido p
      INNER JOIN crm.Cliente c
        ON p.cliente_id = c.cliente_id
      INNER JOIN auth.Usuario u
        ON p.created_by_usuario_id = u.usuario_id
      WHERE p.pedido_id = @pedido_id;
    `);

  return result.recordset[0];
};

const listarDetallesPedido = async (pedido_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .query(`
      SELECT
        pd.pedido_detalle_id,
        pd.pedido_id,
        pd.producto_id,

        pd.tipo_producto_id,
        tp.nombre AS tipo_producto,

        pd.medida_id,
        m.nombre AS medida,

        pd.color_id,
        c.nombre AS color,

        pd.material_id,
        mat.nombre AS material,

        pd.cantidad_pedida,
        pd.unidad_medida_id,
        um.codigo AS unidad,

        ISNULL(SUM(ed.cantidad_entregada), 0) AS cantidad_entregada,
        pd.cantidad_pedida - ISNULL(SUM(ed.cantidad_entregada), 0) AS cantidad_pendiente,

        CASE
          WHEN ISNULL(SUM(ed.cantidad_entregada), 0) >= pd.cantidad_pedida THEN 'COMPLETO'
          WHEN ISNULL(SUM(ed.cantidad_entregada), 0) > 0 THEN 'PARCIAL'
          ELSE 'PENDIENTE'
        END AS estado_entrega,

        pd.cantidad_presentacion,
        pd.unidad_presentacion_id,
        up.codigo AS unidad_presentacion,

        pd.precio_unitario,
        pd.moneda_codigo,

        CAST(pd.cantidad_pedida * pd.precio_unitario AS DECIMAL(18,2)) AS subtotal,

        pd.descripcion_item,
        pd.observacion,
        pd.created_at
      FROM ventas.PedidoDetalle pd
      INNER JOIN catalog.TipoProducto tp
        ON pd.tipo_producto_id = tp.tipo_producto_id
      INNER JOIN catalog.Medida m
        ON pd.medida_id = m.medida_id
      INNER JOIN catalog.Color c
        ON pd.color_id = c.color_id
      INNER JOIN catalog.Material mat
        ON pd.material_id = mat.material_id
      INNER JOIN catalog.UnidadMedida um
        ON pd.unidad_medida_id = um.unidad_medida_id
      LEFT JOIN catalog.UnidadMedida up
        ON pd.unidad_presentacion_id = up.unidad_medida_id
      LEFT JOIN ventas.EntregaDetalle ed
        ON pd.pedido_detalle_id = ed.pedido_detalle_id
      WHERE pd.pedido_id = @pedido_id
        AND pd.activo = 1
      GROUP BY
        pd.pedido_detalle_id,
        pd.pedido_id,
        pd.producto_id,
        pd.tipo_producto_id,
        tp.nombre,
        pd.medida_id,
        m.nombre,
        pd.color_id,
        c.nombre,
        pd.material_id,
        mat.nombre,
        pd.cantidad_pedida,
        pd.unidad_medida_id,
        um.codigo,
        pd.cantidad_presentacion,
        pd.unidad_presentacion_id,
        up.codigo,
        pd.precio_unitario,
        pd.moneda_codigo,
        pd.descripcion_item,
        pd.observacion,
        pd.created_at
      ORDER BY pd.pedido_detalle_id ASC;
    `);

  return result.recordset;
};

const listarHistorialCambiosPedido = async (pedido_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('pedido_id', sql.Int, pedido_id)
    .query(`
      SELECT
        pc.pedido_cambio_id,
        pc.pedido_id,
        pc.tipo_cambio,
        pc.descripcion_motivo,
        pc.created_at,
        u.nombre_completo AS registrado_por
      FROM ventas.PedidoCambio pc
      INNER JOIN auth.Usuario u
        ON pc.created_by_usuario_id = u.usuario_id
      WHERE pc.pedido_id = @pedido_id
      ORDER BY pc.created_at DESC;
    `);

  return result.recordset;
};

const obtenerPedidoPorId = async (pedido_id) => {
  const cabecera = await obtenerPedidoCabeceraPorId(pedido_id);

  if (!cabecera) {
    return null;
  }

  const detalles = await listarDetallesPedido(pedido_id);
  const historial_cambios = await listarHistorialCambiosPedido(pedido_id);

  return {
    ...cabecera,
    detalles,
    historial_cambios
  };
};

const crearPedidoConDetalles = async ({
  cliente_id,
  codigo_pedido,
  descripcion_pedido,
  fecha_pedido,
  fecha_entrega_estimada,
  detalles,
  created_by_usuario_id
}) => {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const requestPedido = new sql.Request(transaction);

    const pedidoResult = await requestPedido
      .input('cliente_id', sql.Int, cliente_id)
      .input('codigo_pedido', sql.VarChar(50), codigo_pedido || null)
      .input('descripcion_pedido', sql.NVarChar(500), descripcion_pedido || null)
      .input('fecha_pedido', sql.Date, fecha_pedido)
      .input('fecha_entrega_estimada', sql.Date, fecha_entrega_estimada || null)
      .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
      .query(`
        INSERT INTO ventas.Pedido (
          cliente_id,
          codigo_pedido,
          descripcion_pedido,
          fecha_pedido,
          fecha_entrega_estimada,
          estado_pedido,
          created_by_usuario_id
        )
        OUTPUT
          INSERTED.pedido_id,
          INSERTED.codigo_pedido,
          INSERTED.cliente_id,
          INSERTED.descripcion_pedido,
          INSERTED.fecha_pedido,
          INSERTED.fecha_entrega_estimada,
          INSERTED.estado_pedido,
          INSERTED.created_at
        VALUES (
          @cliente_id,
          @codigo_pedido,
          @descripcion_pedido,
          @fecha_pedido,
          @fecha_entrega_estimada,
          'REGISTRADO',
          @created_by_usuario_id
        );
      `);

    const pedido = pedidoResult.recordset[0];

    const requestCambio = new sql.Request(transaction);

    const cambioResult = await requestCambio
      .input('pedido_id', sql.Int, pedido.pedido_id)
      .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
      .query(`
        INSERT INTO ventas.PedidoCambio (
          pedido_id,
          tipo_cambio,
          descripcion_motivo,
          created_by_usuario_id
        )
        OUTPUT INSERTED.pedido_cambio_id
        VALUES (
          @pedido_id,
          'CREACION',
          'Registro inicial del pedido',
          @created_by_usuario_id
        );
      `);

    const pedido_cambio_id = cambioResult.recordset[0].pedido_cambio_id;
    const detallesCreados = [];

    for (const item of detalles) {
      const producto_id =
        await resolverProductoPedido({
          transaction,
          tipo_producto_id:
            item.tipo_producto_id,
          material_id:
            item.material_id,
          medida_id:
            item.medida_id,
          color_id:
            item.color_id
        });

      const requestDetalle = new sql.Request(transaction);

      const detalleResult = await requestDetalle
        .input('pedido_id', sql.Int, pedido.pedido_id)
        .input('pedido_cambio_id', sql.Int, pedido_cambio_id)
        .input('producto_id', sql.Int, producto_id)
        .input('tipo_producto_id', sql.Int, item.tipo_producto_id)
        .input('medida_id', sql.Int, item.medida_id)
        .input('color_id', sql.Int, item.color_id)
        .input('material_id', sql.Int, item.material_id)
        .input('cantidad_pedida', sql.Decimal(18, 3), item.cantidad_pedida)
        .input('unidad_medida_id', sql.Int, item.unidad_medida_id)
        .input('cantidad_presentacion', sql.Decimal(18, 3), item.cantidad_presentacion || null)
        .input('unidad_presentacion_id', sql.Int, item.unidad_presentacion_id || null)
        .input('precio_unitario', sql.Decimal(18, 4), item.precio_unitario)
        .input('moneda_codigo', sql.Char(3), item.moneda_codigo)
        .input('descripcion_item', sql.NVarChar(300), item.descripcion_item || null)
        .input('observacion', sql.NVarChar(300), item.observacion || null)
        .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
        .query(`
          INSERT INTO ventas.PedidoDetalle (
            pedido_id,
            pedido_cambio_id,
            producto_id,
            tipo_producto_id,
            medida_id,
            color_id,
            material_id,
            cantidad_pedida,
            unidad_medida_id,
            cantidad_presentacion,
            unidad_presentacion_id,
            precio_unitario,
            moneda_codigo,
            descripcion_item,
            observacion,
            created_by_usuario_id
          )
          OUTPUT
            INSERTED.pedido_detalle_id,
            INSERTED.pedido_id,
            INSERTED.producto_id,
            INSERTED.tipo_producto_id,
            INSERTED.medida_id,
            INSERTED.color_id,
            INSERTED.material_id,
            INSERTED.cantidad_pedida,
            INSERTED.unidad_medida_id,
            INSERTED.cantidad_presentacion,
            INSERTED.unidad_presentacion_id,
            INSERTED.precio_unitario,
            INSERTED.moneda_codigo,
            INSERTED.descripcion_item,
            INSERTED.observacion
          VALUES (
            @pedido_id,
            @pedido_cambio_id,
            @producto_id,
            @tipo_producto_id,
            @medida_id,
            @color_id,
            @material_id,
            @cantidad_pedida,
            @unidad_medida_id,
            @cantidad_presentacion,
            @unidad_presentacion_id,
            @precio_unitario,
            @moneda_codigo,
            @descripcion_item,
            @observacion,
            @created_by_usuario_id
          );
        `);

      const detalleCreado = detalleResult.recordset[0];

      await registrarHistorialPrecioCliente({
        transaction,
        cliente_id,
        pedido_id: pedido.pedido_id,
        pedido_detalle_id: detalleCreado.pedido_detalle_id,
        item,
        created_by_usuario_id
      });

      detallesCreados.push(detalleCreado);
    }

    await transaction.commit();

    return {
      pedido,
      detalles: detallesCreados
    };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const actualizarPedidoYAgregarDetalles = async ({
  pedido_id,
  cliente_id,
  codigo_pedido,
  descripcion_pedido,
  fecha_pedido,
  fecha_entrega_estimada,
  motivo_cambio,
  nuevos_detalles,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const tieneNuevosDetalles = nuevos_detalles.length > 0 ? 1 : 0;

    const requestPedido = new sql.Request(transaction);

    const pedidoResult = await requestPedido
      .input('pedido_id', sql.Int, pedido_id)
      .input('cliente_id', sql.Int, cliente_id)
      .input('codigo_pedido', sql.VarChar(50), codigo_pedido || null)
      .input('descripcion_pedido', sql.NVarChar(500), descripcion_pedido || null)
      .input('fecha_pedido', sql.Date, fecha_pedido)
      .input('fecha_entrega_estimada', sql.Date, fecha_entrega_estimada || null)
      .input('tiene_nuevos_detalles', sql.Bit, tieneNuevosDetalles)
      .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
      .query(`
        UPDATE ventas.Pedido
        SET
          cliente_id = @cliente_id,
          codigo_pedido = @codigo_pedido,
          descripcion_pedido = @descripcion_pedido,
          fecha_pedido = @fecha_pedido,
          fecha_entrega_estimada = @fecha_entrega_estimada,
          estado_pedido = CASE
            WHEN estado_pedido = 'ENTREGADO' AND @tiene_nuevos_detalles = 1 THEN 'PARCIAL'
            ELSE estado_pedido
          END,
          updated_at = SYSDATETIME(),
          updated_by_usuario_id = @updated_by_usuario_id
        OUTPUT
          INSERTED.pedido_id,
          INSERTED.codigo_pedido,
          INSERTED.cliente_id,
          INSERTED.descripcion_pedido,
          INSERTED.fecha_pedido,
          INSERTED.fecha_entrega_estimada,
          INSERTED.estado_pedido,
          INSERTED.updated_at
        WHERE pedido_id = @pedido_id
          AND estado_pedido <> 'CANCELADO';
      `);

    const pedido = pedidoResult.recordset[0];

    if (!pedido) {
      await transaction.rollback();
      return null;
    }

    const tipoCambio = nuevos_detalles.length > 0
      ? 'AUMENTO_PRODUCTOS'
      : 'EDICION';

    const requestCambio = new sql.Request(transaction);

    const cambioResult = await requestCambio
      .input('pedido_id', sql.Int, pedido_id)
      .input('tipo_cambio', sql.VarChar(40), tipoCambio)
      .input('descripcion_motivo', sql.NVarChar(500), motivo_cambio)
      .input('created_by_usuario_id', sql.Int, updated_by_usuario_id)
      .query(`
        INSERT INTO ventas.PedidoCambio (
          pedido_id,
          tipo_cambio,
          descripcion_motivo,
          created_by_usuario_id
        )
        OUTPUT INSERTED.pedido_cambio_id
        VALUES (
          @pedido_id,
          @tipo_cambio,
          @descripcion_motivo,
          @created_by_usuario_id
        );
      `);

    const pedido_cambio_id = cambioResult.recordset[0].pedido_cambio_id;
    const detallesCreados = [];

    for (const item of nuevos_detalles) {
      const producto_id =
        await resolverProductoPedido({
          transaction,
          tipo_producto_id:
            item.tipo_producto_id,
          material_id:
            item.material_id,
          medida_id:
            item.medida_id,
          color_id:
            item.color_id
        });

      const requestDetalle = new sql.Request(transaction);

      const detalleResult = await requestDetalle
        .input('pedido_id', sql.Int, pedido_id)
        .input('pedido_cambio_id', sql.Int, pedido_cambio_id)
        .input('producto_id', sql.Int, producto_id)
        .input('tipo_producto_id', sql.Int, item.tipo_producto_id)
        .input('medida_id', sql.Int, item.medida_id)
        .input('color_id', sql.Int, item.color_id)
        .input('material_id', sql.Int, item.material_id)
        .input('cantidad_pedida', sql.Decimal(18, 3), item.cantidad_pedida)
        .input('unidad_medida_id', sql.Int, item.unidad_medida_id)
        .input('cantidad_presentacion', sql.Decimal(18, 3), item.cantidad_presentacion || null)
        .input('unidad_presentacion_id', sql.Int, item.unidad_presentacion_id || null)
        .input('precio_unitario', sql.Decimal(18, 4), item.precio_unitario)
        .input('moneda_codigo', sql.Char(3), item.moneda_codigo)
        .input('descripcion_item', sql.NVarChar(300), item.descripcion_item || null)
        .input('observacion', sql.NVarChar(300), item.observacion || null)
        .input('created_by_usuario_id', sql.Int, updated_by_usuario_id)
        .query(`
          INSERT INTO ventas.PedidoDetalle (
            pedido_id,
            pedido_cambio_id,
            producto_id,
            tipo_producto_id,
            medida_id,
            color_id,
            material_id,
            cantidad_pedida,
            unidad_medida_id,
            cantidad_presentacion,
            unidad_presentacion_id,
            precio_unitario,
            moneda_codigo,
            descripcion_item,
            observacion,
            created_by_usuario_id
          )
          OUTPUT
            INSERTED.pedido_detalle_id,
            INSERTED.pedido_id,
            INSERTED.producto_id,
            INSERTED.tipo_producto_id,
            INSERTED.medida_id,
            INSERTED.color_id,
            INSERTED.material_id,
            INSERTED.cantidad_pedida,
            INSERTED.unidad_medida_id,
            INSERTED.cantidad_presentacion,
            INSERTED.unidad_presentacion_id,
            INSERTED.precio_unitario,
            INSERTED.moneda_codigo,
            INSERTED.descripcion_item,
            INSERTED.observacion
          VALUES (
            @pedido_id,
            @pedido_cambio_id,
            @producto_id,
            @tipo_producto_id,
            @medida_id,
            @color_id,
            @material_id,
            @cantidad_pedida,
            @unidad_medida_id,
            @cantidad_presentacion,
            @unidad_presentacion_id,
            @precio_unitario,
            @moneda_codigo,
            @descripcion_item,
            @observacion,
            @created_by_usuario_id
          );
        `);

      const detalleCreado = detalleResult.recordset[0];

      await registrarHistorialPrecioCliente({
        transaction,
        cliente_id,
        pedido_id,
        pedido_detalle_id: detalleCreado.pedido_detalle_id,
        item,
        created_by_usuario_id: updated_by_usuario_id
      });

      detallesCreados.push(detalleCreado);
    }

    await transaction.commit();

    return {
      pedido,
      detalles_agregados: detallesCreados
    };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  registrarHistorialPrecioCliente,
  listarPedidos,
  obtenerPedidoPorId,
  crearPedidoConDetalles,
  actualizarPedidoYAgregarDetalles
};
~~~

---

## src\modules\pedidos\pedido.producto.helper.js

~~~javascript
const {
  sql
} = require('../../config/db');


const crearErrorNegocio = (
  mensaje,
  statusCode = 400
) => {
  const error =
    new Error(
      mensaje
    );

  error.statusCode =
    statusCode;

  return error;
};


/*
 * Resuelve la combinación comercial del pedido
 * contra el catálogo real de Productos terminados.
 *
 * Identidad:
 * Tipo + Material + Medida + Color
 */
const resolverProductoPedido = async ({
  transaction,
  tipo_producto_id,
  material_id,
  medida_id,
  color_id
}) => {
  const result =
    await new sql.Request(
      transaction
    )
      .input(
        'tipo_producto_id',
        sql.Int,
        tipo_producto_id
      )
      .input(
        'material_id',
        sql.Int,
        material_id
      )
      .input(
        'medida_id',
        sql.Int,
        medida_id
      )
      .input(
        'color_id',
        sql.Int,
        color_id
      )
      .query(`
        SELECT TOP (2)
          producto_id

        FROM catalog.Producto

        WHERE
          activo = 1

          AND tipo_producto_id =
              @tipo_producto_id

          AND material_id =
              @material_id

          AND medida_id =
              @medida_id

          AND color_id =
              @color_id

        ORDER BY
          producto_id ASC;
      `);


  if (
    result.recordset.length === 0
  ) {
    throw crearErrorNegocio(
      'La combinación seleccionada no existe en Productos terminados. Registra primero el producto correspondiente.',
      409
    );
  }


  if (
    result.recordset.length > 1
  ) {
    throw crearErrorNegocio(
      'Existe más de un producto activo con la misma combinación. Revisa el catálogo de Productos terminados.',
      409
    );
  }


  return Number(
    result.recordset[0]
      .producto_id
  );
};


module.exports = {
  resolverProductoPedido
};

~~~

---

## src\modules\pedidos\pedido.routes.js

~~~javascript
const express = require('express');

const {
  obtenerPedidos,
  obtenerPedido,
  registrarPedido,
  editarPedido
} = require('./pedido.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  obtenerPedidos
);

router.get(
  '/:pedido_id',
  verificarToken,
  obtenerPedido
);

router.post(
  '/',
  verificarToken,
  registrarPedido
);

router.put(
  '/:pedido_id',
  verificarToken,
  editarPedido
);

module.exports = router;

~~~

---

## src\modules\producciones\produccion.controller.js

~~~javascript
const {
  listarProducciones,
  obtenerProduccionPorId,
  crearProduccion
} = require('./produccion.model');


const validarPaginacion = (
  page,
  limit
) => {
  const pageNumero =
    Number(page);

  const limitNumero =
    Number(limit);

  if (
    !Number.isInteger(
      pageNumero
    ) ||
    pageNumero < 1 ||
    !Number.isInteger(
      limitNumero
    ) ||
    limitNumero < 1 ||
    limitNumero > 100
  ) {
    return null;
  }

  return {
    page: pageNumero,
    limit: limitNumero
  };
};


const normalizarDecimal3 = (
  valor
) => {
  const numero =
    Number(valor);

  if (
    !Number.isFinite(
      numero
    )
  ) {
    return null;
  }

  const redondeado =
    Number(
      numero.toFixed(3)
    );

  /*
   * La BD almacena 3 decimales.
   * No truncamos silenciosamente entradas con más precisión.
   */
  if (
    Math.abs(
      numero - redondeado
    ) > 0.0000005
  ) {
    return null;
  }

  return redondeado;
};


const esMultiploPresentacion = (
  cantidad,
  presentacion
) => {
  const cantidadMil =
    Math.round(
      cantidad * 1000
    );

  const presentacionMil =
    Math.round(
      presentacion * 1000
    );

  if (
    presentacionMil <= 0
  ) {
    return false;
  }

  return (
    cantidadMil %
    presentacionMil
  ) === 0;
};


const obtenerProducciones =
  async (
    req,
    res
  ) => {
    try {
      const {
        page = 1,
        limit = 10
      } = req.query;

      const paginacion =
        validarPaginacion(
          page,
          limit
        );

      if (!paginacion) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      const resultado =
        await listarProducciones({
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Producciones obtenidas correctamente',
        producciones:
          resultado.producciones,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error listar producciones:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al listar las producciones'
      });
    }
  };


const obtenerProduccion =
  async (
    req,
    res
  ) => {
    try {
      const produccion_id =
        Number(
          req.params.produccion_id
        );

      if (
        !Number.isInteger(
          produccion_id
        ) ||
        produccion_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de producción inválido'
        });
      }

      const produccion =
        await obtenerProduccionPorId(
          produccion_id
        );

      if (!produccion) {
        return res.status(404).json({
          mensaje:
            'Producción no encontrada'
        });
      }

      res.json({
        mensaje:
          'Producción obtenida correctamente',
        produccion
      });

    } catch (error) {
      console.error(
        'Error obtener producción:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener la producción'
      });
    }
  };


const registrarProduccion =
  async (
    req,
    res
  ) => {
    try {
      const idempotencyKey =
        req.get(
          'Idempotency-Key'
        )?.trim();

      if (!idempotencyKey) {
        return res.status(400).json({
          mensaje:
            'Debe enviar el header Idempotency-Key'
        });
      }

      if (
        idempotencyKey.length > 100
      ) {
        return res.status(400).json({
          mensaje:
            'Idempotency-Key no puede superar 100 caracteres'
        });
      }

      let {
        fecha_produccion,
        observacion,
        detalles
      } = req.body;

      if (
        typeof fecha_produccion !==
          'string' ||
        !/^\d{4}-\d{2}-\d{2}$/
          .test(
            fecha_produccion
          )
      ) {
        return res.status(400).json({
          mensaje:
            'La fecha de producción es obligatoria y debe tener formato YYYY-MM-DD'
        });
      }

      const fecha =
        new Date(
          `${fecha_produccion}T00:00:00Z`
        );

      if (
        Number.isNaN(
          fecha.getTime()
        ) ||
        fecha
          .toISOString()
          .slice(0, 10) !==
          fecha_produccion
      ) {
        return res.status(400).json({
          mensaje:
            'La fecha de producción no es válida'
        });
      }

      observacion =
        observacion
          ? String(
              observacion
            ).trim()
          : null;

      if (
        observacion &&
        observacion.length > 500
      ) {
        return res.status(400).json({
          mensaje:
            'La observación no puede superar 500 caracteres'
        });
      }

      if (
        !Array.isArray(
          detalles
        ) ||
        detalles.length === 0
      ) {
        return res.status(400).json({
          mensaje:
            'La producción debe tener al menos un producto'
        });
      }

      if (
        detalles.length > 50
      ) {
        return res.status(400).json({
          mensaje:
            'Una producción no puede tener más de 50 productos'
        });
      }

      const detallesNormalizados = [];

      for (
        let i = 0;
        i < detalles.length;
        i++
      ) {
        const item =
          detalles[i];

        const producto_id =
          Number(
            item.producto_id
          );

        if (
          !Number.isInteger(
            producto_id
          ) ||
          producto_id <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `El producto ${i + 1} no es válido`
          });
        }

        const cantidad_producida =
          normalizarDecimal3(
            item.cantidad_producida
          );

        if (
          cantidad_producida === null ||
          cantidad_producida <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `La cantidad producida del producto ${i + 1} debe ser mayor a 0 y tener máximo 3 decimales`
          });
        }

        const cantidad_presentacion =
          normalizarDecimal3(
            item.cantidad_presentacion
          );

        if (
          cantidad_presentacion === null ||
          cantidad_presentacion <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `La presentación del producto ${i + 1} debe ser mayor a 0 y tener máximo 3 decimales`
          });
        }

        const unidad_presentacion_id =
          Number(
            item.unidad_presentacion_id
          );

        if (
          !Number.isInteger(
            unidad_presentacion_id
          ) ||
          unidad_presentacion_id <= 0
        ) {
          return res.status(400).json({
            mensaje:
              `El producto ${i + 1} debe tener una unidad de presentación`
          });
        }

        /*
         * Evitamos crear stock imposible de entregar:
         * si la presentación es 50, producir 125 dejaría
         * 25 KG fuera de una presentación completa.
         */
        if (
          !esMultiploPresentacion(
            cantidad_producida,
            cantidad_presentacion
          )
        ) {
          return res.status(400).json({
            mensaje:
              `La cantidad producida del producto ${i + 1} debe ser múltiplo de su presentación (${cantidad_presentacion})`
          });
        }

        let observacionDetalle =
          item.observacion
            ? String(
                item.observacion
              ).trim()
            : null;

        if (
          observacionDetalle &&
          observacionDetalle.length > 300
        ) {
          return res.status(400).json({
            mensaje:
              `La observación del producto ${i + 1} no puede superar 300 caracteres`
          });
        }

        detallesNormalizados.push({
          producto_id,
          cantidad_producida,
          cantidad_presentacion,
          unidad_presentacion_id,
          observacion:
            observacionDetalle
        });
      }

      const resultado =
        await crearProduccion({
          fecha_produccion,
          observacion,
          detalles:
            detallesNormalizados,
          created_by_usuario_id:
            req.usuario.usuario_id,
          idempotency_key:
            idempotencyKey
        });

      return res
        .status(
          resultado.reutilizada
            ? 200
            : 201
        )
        .json({
          mensaje:
            resultado.reutilizada
              ? 'La producción ya había sido registrada; se devolvió el resultado existente'
              : 'Producción registrada correctamente',
          reutilizada:
            resultado.reutilizada,
          produccion:
            resultado.produccion
        });

    } catch (error) {
      console.error(
        'Error registrar producción:',
        error.message
      );

      if (error.statusCode) {
        return res
          .status(
            error.statusCode
          )
          .json({
            mensaje:
              error.message,
            codigo:
              error.codigo ||
              undefined
          });
      }

      return res.status(500).json({
        mensaje:
          'Error interno al registrar la producción'
      });
    }
  };


module.exports = {
  obtenerProducciones,
  obtenerProduccion,
  registrarProduccion
};

~~~

---

## src\modules\producciones\produccion.model.js

~~~javascript
const {
  getConnection,
  sql
} = require('../../config/db');


const crearErrorNegocio = (
  mensaje,
  statusCode = 400,
  codigo = null
) => {
  const error = new Error(mensaje);

  error.statusCode = statusCode;
  error.codigo = codigo;

  return error;
};


const redondear3 = (
  valor
) => {
  return Number(
    Number(valor).toFixed(3)
  );
};


/*
 * La materia prima trabaja con precisión de 3 decimales.
 * Para evitar que el redondeo de porcentajes genere una
 * diferencia de 0.001 KG, los primeros componentes se
 * redondean normalmente y el último absorbe el residuo.
 *
 * Ejemplo:
 * 1 KG con 3 componentes de 33.333333%
 * -> 0.333 + 0.333 + 0.334 = 1.000 KG
 */
const calcularConsumosComposicion = ({
  cantidad_producida,
  componentes
}) => {
  let acumulado = 0;

  return componentes.map(
    (
      componente,
      index
    ) => {
      let cantidad;

      if (
        index ===
        componentes.length - 1
      ) {
        cantidad = redondear3(
          cantidad_producida -
          acumulado
        );

      } else {
        cantidad = redondear3(
          cantidad_producida *
          Number(
            componente.porcentaje
          ) /
          100
        );

        acumulado = redondear3(
          acumulado +
          cantidad
        );
      }

      if (cantidad <= 0) {
        throw crearErrorNegocio(
          'La composición genera un consumo menor o igual a cero. Revisa los porcentajes.',
          400,
          'COMPOSICION_INVALIDA'
        );
      }

      return {
        ...componente,
        cantidad_requerida:
          cantidad
      };
    }
  );
};


const obtenerProduccionPorId = async (
  produccion_id
) => {
  const pool =
    await getConnection();

  const cabeceraResult =
    await pool.request()
      .input(
        'produccion_id',
        sql.Int,
        produccion_id
      )
      .query(`
        SELECT
          p.produccion_id,
          p.fecha_produccion,
          p.observacion,
          p.created_at,
          p.idempotency_key,

          u.nombre_completo
            AS registrado_por

        FROM produccion.Produccion p

        INNER JOIN auth.Usuario u
          ON p.created_by_usuario_id =
             u.usuario_id

        WHERE
          p.produccion_id =
          @produccion_id;
      `);

  const produccion =
    cabeceraResult.recordset[0];

  if (!produccion) {
    return null;
  }

  const detallesResult =
    await pool.request()
      .input(
        'produccion_id',
        sql.Int,
        produccion_id
      )
      .query(`
        SELECT
          pd.produccion_detalle_id,
          pd.produccion_id,

          pd.producto_id,
          tp.nombre AS tipo_producto,
          mat.nombre AS material,
          med.nombre AS medida,
          col.nombre AS color,

          pd.producto_composicion_id,
          pc.version_numero
            AS composicion_version,

          pd.cantidad_producida,
          pd.unidad_medida_id,
          um.codigo AS unidad,

          pd.cantidad_presentacion,
          pd.unidad_presentacion_id,
          up.codigo
            AS unidad_presentacion,

          pd.observacion,
          pd.created_at,

          u.nombre_completo
            AS registrado_por

        FROM produccion.ProduccionDetalle pd

        INNER JOIN catalog.Producto prod
          ON pd.producto_id =
             prod.producto_id

        INNER JOIN catalog.TipoProducto tp
          ON prod.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Material mat
          ON prod.material_id =
             mat.material_id

        INNER JOIN catalog.Medida med
          ON prod.medida_id =
             med.medida_id

        INNER JOIN catalog.Color col
          ON prod.color_id =
             col.color_id

        INNER JOIN catalog.ProductoComposicion pc
          ON pd.producto_composicion_id =
             pc.producto_composicion_id

        INNER JOIN catalog.UnidadMedida um
          ON pd.unidad_medida_id =
             um.unidad_medida_id

        INNER JOIN catalog.UnidadMedida up
          ON pd.unidad_presentacion_id =
             up.unidad_medida_id

        INNER JOIN auth.Usuario u
          ON pd.created_by_usuario_id =
             u.usuario_id

        WHERE
          pd.produccion_id =
          @produccion_id

        ORDER BY
          pd.produccion_detalle_id ASC;
      `);

  const consumosResult =
    await pool.request()
      .input(
        'produccion_id',
        sql.Int,
        produccion_id
      )
      .query(`
        SELECT
          mm.movimiento_materia_prima_id,
          mm.produccion_detalle_id,
          mm.stock_materia_prima_lote_id,
          mm.cantidad,
          mm.fecha_movimiento,

          d.material_id,
          m.nombre AS material,

          d.color_id,
          c.nombre AS color,

          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.fecha_compra

        FROM inventario.MovimientoMateriaPrima mm

        INNER JOIN produccion.ProduccionDetalle pd
          ON mm.produccion_detalle_id =
             pd.produccion_detalle_id

        INNER JOIN inventario.StockMateriaPrimaLote s
          ON mm.stock_materia_prima_lote_id =
             s.stock_materia_prima_lote_id

        INNER JOIN compras.CompraMateriaPrimaDetalle d
          ON s.compra_materia_prima_detalle_id =
             d.compra_materia_prima_detalle_id

        INNER JOIN compras.CompraMateriaPrima cmp
          ON d.compra_materia_prima_id =
             cmp.compra_materia_prima_id

        INNER JOIN catalog.Material m
          ON d.material_id =
             m.material_id

        INNER JOIN catalog.Color c
          ON d.color_id =
             c.color_id

        WHERE
          pd.produccion_id =
            @produccion_id
          AND mm.tipo_movimiento =
            'SALIDA_PRODUCCION'

        ORDER BY
          mm.produccion_detalle_id ASC,
          cmp.fecha_compra ASC,
          cmp.compra_materia_prima_id ASC,
          mm.movimiento_materia_prima_id ASC;
      `);

  const ingresosResult =
    await pool.request()
      .input(
        'produccion_id',
        sql.Int,
        produccion_id
      )
      .query(`
        SELECT
          mpt.movimiento_producto_terminado_id,
          mpt.produccion_detalle_id,
          mpt.stock_producto_terminado_id,
          mpt.cantidad,
          mpt.fecha_movimiento,

          s.cantidad_disponible
            AS stock_actual

        FROM inventario.MovimientoProductoTerminado mpt

        INNER JOIN produccion.ProduccionDetalle pd
          ON mpt.produccion_detalle_id =
             pd.produccion_detalle_id

        INNER JOIN inventario.StockProductoTerminado s
          ON mpt.stock_producto_terminado_id =
             s.stock_producto_terminado_id

        WHERE
          pd.produccion_id =
            @produccion_id
          AND mpt.tipo_movimiento =
            'ENTRADA_PRODUCCION'

        ORDER BY
          mpt.produccion_detalle_id ASC,
          mpt.movimiento_producto_terminado_id ASC;
      `);

  const consumosPorDetalle =
    new Map();

  for (
    const consumo of
    consumosResult.recordset
  ) {
    const detalleId =
      Number(
        consumo.produccion_detalle_id
      );

    if (
      !consumosPorDetalle.has(
        detalleId
      )
    ) {
      consumosPorDetalle.set(
        detalleId,
        []
      );
    }

    consumosPorDetalle
      .get(detalleId)
      .push(consumo);
  }

  const ingresosPorDetalle =
    new Map(
      ingresosResult.recordset.map(
        (ingreso) => [
          Number(
            ingreso.produccion_detalle_id
          ),
          ingreso
        ]
      )
    );

  const detalles =
    detallesResult.recordset.map(
      (detalle) => ({
        ...detalle,

        consumos_materia_prima:
          consumosPorDetalle.get(
            Number(
              detalle.produccion_detalle_id
            )
          ) || [],

        ingreso_producto_terminado:
          ingresosPorDetalle.get(
            Number(
              detalle.produccion_detalle_id
            )
          ) || null
      })
    );

  return {
    ...produccion,
    detalles
  };
};


const listarProducciones = async ({
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        SELECT
          p.produccion_id,
          p.fecha_produccion,
          p.observacion,
          p.created_at,

          u.nombre_completo
            AS registrado_por,

          COUNT(
            pd.produccion_detalle_id
          ) AS cantidad_items,

          ISNULL(
            SUM(
              pd.cantidad_producida
            ),
            0
          ) AS total_producido_kg,

          COUNT(*) OVER()
            AS total_registros

        FROM produccion.Produccion p

        INNER JOIN auth.Usuario u
          ON p.created_by_usuario_id =
             u.usuario_id

        LEFT JOIN produccion.ProduccionDetalle pd
          ON p.produccion_id =
             pd.produccion_id

        GROUP BY
          p.produccion_id,
          p.fecha_produccion,
          p.observacion,
          p.created_at,
          u.nombre_completo

        ORDER BY
          p.fecha_produccion DESC,
          p.produccion_id DESC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const producciones =
    result.recordset;

  const total =
    producciones.length > 0
      ? producciones[0]
          .total_registros
      : 0;

  return {
    producciones,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const buscarProduccionPorIdempotencyKey = async (
  idempotency_key,
  transaction = null
) => {
  if (!idempotency_key) {
    return null;
  }

  if (transaction) {
    const result =
      await new sql.Request(
        transaction
      )
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key
        )
        .query(`
          SELECT TOP 1
            produccion_id
          FROM produccion.Produccion
            WITH (
              UPDLOCK,
              HOLDLOCK
            )
          WHERE
            idempotency_key =
            @idempotency_key;
        `);

    return result.recordset[0] ||
      null;
  }

  const pool =
    await getConnection();

  const result =
    await pool.request()
      .input(
        'idempotency_key',
        sql.VarChar(100),
        idempotency_key
      )
      .query(`
        SELECT TOP 1
          produccion_id
        FROM produccion.Produccion
        WHERE
          idempotency_key =
          @idempotency_key;
      `);

  return result.recordset[0] ||
    null;
};


const obtenerUnidadKg = async (
  transaction
) => {
  const result =
    await new sql.Request(
      transaction
    )
      .query(`
        SELECT TOP 1
          unidad_medida_id,
          codigo,
          nombre
        FROM catalog.UnidadMedida
        WHERE
          codigo = 'KG'
          AND activo = 1;
      `);

  const unidad =
    result.recordset[0];

  if (!unidad) {
    throw crearErrorNegocio(
      'No existe una unidad KG activa en el catálogo',
      500,
      'KG_NO_CONFIGURADO'
    );
  }

  return unidad;
};


const cargarProductoYComposicion = async ({
  transaction,
  producto_id
}) => {
  const productoResult =
    await new sql.Request(
      transaction
    )
      .input(
        'producto_id',
        sql.Int,
        producto_id
      )
      .query(`
        SELECT
          p.producto_id,

          tp.nombre
            AS tipo_producto,
          mat.nombre
            AS material_producto,
          med.nombre
            AS medida,
          col.nombre
            AS color_producto,

          pc.producto_composicion_id,
          pc.version_numero
            AS composicion_version

        FROM catalog.Producto p

        INNER JOIN catalog.TipoProducto tp
          ON p.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Material mat
          ON p.material_id =
             mat.material_id

        INNER JOIN catalog.Medida med
          ON p.medida_id =
             med.medida_id

        INNER JOIN catalog.Color col
          ON p.color_id =
             col.color_id

        LEFT JOIN catalog.ProductoComposicion pc
          WITH (HOLDLOCK)
          ON p.producto_id =
             pc.producto_id
         AND pc.vigente = 1

        WHERE
          p.producto_id =
            @producto_id
          AND p.activo = 1;
      `);

  const producto =
    productoResult.recordset[0];

  if (!producto) {
    throw crearErrorNegocio(
      `El producto ${producto_id} no existe o está inactivo`,
      404,
      'PRODUCTO_NO_ENCONTRADO'
    );
  }

  if (
    !producto
      .producto_composicion_id
  ) {
    throw crearErrorNegocio(
      [
        'El producto',
        producto.tipo_producto,
        producto.material_producto,
        producto.medida,
        producto.color_producto,
        'no tiene una composición vigente.'
      ].join(' '),
      409,
      'PRODUCTO_SIN_COMPOSICION'
    );
  }

  const componentesResult =
    await new sql.Request(
      transaction
    )
      .input(
        'producto_composicion_id',
        sql.Int,
        producto
          .producto_composicion_id
      )
      .query(`
        SELECT
          pcd.producto_composicion_detalle_id,
          pcd.material_id,
          m.nombre AS material,
          pcd.color_id,
          c.nombre AS color,
          pcd.porcentaje

        FROM catalog.ProductoComposicionDetalle pcd

        INNER JOIN catalog.Material m
          ON pcd.material_id =
             m.material_id

        INNER JOIN catalog.Color c
          ON pcd.color_id =
             c.color_id

        WHERE
          pcd.producto_composicion_id =
          @producto_composicion_id

        ORDER BY
          pcd.producto_composicion_detalle_id ASC;
      `);

  const componentes =
    componentesResult.recordset;

  if (
    componentes.length === 0
  ) {
    throw crearErrorNegocio(
      'La composición vigente no tiene materias primas configuradas',
      409,
      'COMPOSICION_SIN_DETALLE'
    );
  }

  const totalPorcentaje =
    Number(
      componentes
        .reduce(
          (
            total,
            componente
          ) =>
            total +
            Number(
              componente.porcentaje
            ),
          0
        )
        .toFixed(6)
    );

  if (
    Math.abs(
      totalPorcentaje - 100
    ) > 0.000001
  ) {
    throw crearErrorNegocio(
      `La composición vigente suma ${totalPorcentaje}% y debe sumar 100%`,
      409,
      'COMPOSICION_INVALIDA'
    );
  }

  return {
    ...producto,
    componentes
  };
};


const validarUnidadPresentacion = async ({
  transaction,
  unidad_presentacion_id
}) => {
  const result =
    await new sql.Request(
      transaction
    )
      .input(
        'unidad_presentacion_id',
        sql.Int,
        unidad_presentacion_id
      )
      .query(`
        SELECT
          unidad_medida_id,
          codigo,
          nombre
        FROM catalog.UnidadMedida
        WHERE
          unidad_medida_id =
            @unidad_presentacion_id
          AND activo = 1;
      `);

  const unidad =
    result.recordset[0];

  if (!unidad) {
    throw crearErrorNegocio(
      'La unidad de presentación no existe o está inactiva',
      400,
      'UNIDAD_PRESENTACION_INVALIDA'
    );
  }

  return unidad;
};


/*
 * Bloquea y devuelve todos los lotes disponibles de una
 * materia prima en el mismo orden que utiliza FIFO.
 *
 * El bloqueo ocurre ANTES de crear la Producción para poder
 * validar el stock completo sin dejar escrituras parciales.
 */
const bloquearLotesFIFO = async ({
  transaction,
  material_id,
  color_id
}) => {
  const result =
    await new sql.Request(
      transaction
    )
      .input(
        'material_id',
        sql.Int,
        material_id
      )
      .input(
        'color_id',
        sql.Int,
        color_id
      )
      .query(`
        SELECT
          s.stock_materia_prima_lote_id,
          s.cantidad_disponible,

          d.compra_materia_prima_detalle_id,
          d.material_id,
          d.color_id,

          cmp.compra_materia_prima_id,
          cmp.nombre_lote,
          cmp.fecha_compra

        FROM inventario.StockMateriaPrimaLote s
          WITH (
            UPDLOCK,
            HOLDLOCK,
            ROWLOCK
          )

        INNER JOIN compras.CompraMateriaPrimaDetalle d
          ON s.compra_materia_prima_detalle_id =
             d.compra_materia_prima_detalle_id

        INNER JOIN compras.CompraMateriaPrima cmp
          ON d.compra_materia_prima_id =
             cmp.compra_materia_prima_id

        WHERE
          d.material_id =
            @material_id
          AND d.color_id =
            @color_id
          AND s.cantidad_disponible > 0

        ORDER BY
          cmp.fecha_compra ASC,
          cmp.compra_materia_prima_id ASC,
          s.stock_materia_prima_lote_id ASC;
      `);

  return result.recordset.map(
    (lote) => ({
      ...lote,
      cantidad_disponible:
        redondear3(
          lote.cantidad_disponible
        )
    })
  );
};


const crearProduccion = async ({
  fecha_produccion,
  observacion,
  detalles,
  created_by_usuario_id,
  idempotency_key
}) => {
  const pool =
    await getConnection();

  const transaction =
    new sql.Transaction(pool);

  try {
    await transaction.begin(
      sql.ISOLATION_LEVEL.SERIALIZABLE
    );

    /* =====================================================
       1. IDEMPOTENCIA
       ===================================================== */

    const produccionExistente =
      await buscarProduccionPorIdempotencyKey(
        idempotency_key,
        transaction
      );

    if (produccionExistente) {
      await transaction.commit();

      return {
        reutilizada: true,
        produccion:
          await obtenerProduccionPorId(
            produccionExistente
              .produccion_id
          )
      };
    }


    /* =====================================================
       2. UNIDAD BASE

       La composición se calcula por peso.
       Por ahora la producción operativa se registra en KG.
       ===================================================== */

    const unidadKg =
      await obtenerUnidadKg(
        transaction
      );


    /* =====================================================
       3. CARGAR PRODUCTOS + COMPOSICIONES
       ===================================================== */

    const detallesPreparados = [];

    for (
      const detalle of detalles
    ) {
      const producto =
        await cargarProductoYComposicion({
          transaction,
          producto_id:
            detalle.producto_id
        });

      const unidadPresentacion =
        await validarUnidadPresentacion({
          transaction,
          unidad_presentacion_id:
            detalle
              .unidad_presentacion_id
        });

      const consumos =
        calcularConsumosComposicion({
          cantidad_producida:
            detalle
              .cantidad_producida,
          componentes:
            producto.componentes
        });

      detallesPreparados.push({
        ...detalle,
        producto,
        unidadPresentacion,
        consumos
      });
    }


    /* =====================================================
       4. AGRUPAR REQUERIMIENTO TOTAL POR MATERIAL + COLOR

       Antes de descontar un solo gramo validamos TODO.
       ===================================================== */

    const requerimientos =
      new Map();

    for (
      const detalle of
      detallesPreparados
    ) {
      for (
        const consumo of
        detalle.consumos
      ) {
        const clave =
          `${consumo.material_id}-${consumo.color_id}`;

        if (
          !requerimientos.has(
            clave
          )
        ) {
          requerimientos.set(
            clave,
            {
              material_id:
                consumo.material_id,
              material:
                consumo.material,
              color_id:
                consumo.color_id,
              color:
                consumo.color,
              cantidad_requerida: 0
            }
          );
        }

        const actual =
          requerimientos.get(
            clave
          );

        actual.cantidad_requerida =
          redondear3(
            actual.cantidad_requerida +
            consumo.cantidad_requerida
          );
      }
    }


    /* =====================================================
       5. BLOQUEAR FIFO Y VALIDAR STOCK COMPLETO
       ===================================================== */

    const fifoPorMateria =
      new Map();

    const requerimientosOrdenados =
      [
        ...requerimientos.values()
      ].sort(
        (a, b) =>
          a.material_id -
            b.material_id ||
          a.color_id -
            b.color_id
      );

    for (
      const requerimiento of
      requerimientosOrdenados
    ) {
      const lotes =
        await bloquearLotesFIFO({
          transaction,
          material_id:
            requerimiento.material_id,
          color_id:
            requerimiento.color_id
        });

      const disponible =
        redondear3(
          lotes.reduce(
            (
              total,
              lote
            ) =>
              total +
              Number(
                lote.cantidad_disponible
              ),
            0
          )
        );

      if (
        disponible + 0.000001 <
        requerimiento
          .cantidad_requerida
      ) {
        throw crearErrorNegocio(
          [
            'Stock insuficiente de',
            requerimiento.material,
            requerimiento.color + '.',
            'Se requieren',
            `${requerimiento.cantidad_requerida.toFixed(3)} KG`,
            'y hay',
            `${disponible.toFixed(3)} KG disponibles.`
          ].join(' '),
          409,
          'STOCK_MATERIA_PRIMA_INSUFICIENTE'
        );
      }

      fifoPorMateria.set(
        `${requerimiento.material_id}-${requerimiento.color_id}`,
        lotes
      );
    }


    /* =====================================================
       6. CREAR CABECERA

       SCOPE_IDENTITY evita el problema de OUTPUT en tablas
       que puedan tener triggers habilitados.
       ===================================================== */

    const produccionResult =
      await new sql.Request(
        transaction
      )
        .input(
          'fecha_produccion',
          sql.Date,
          fecha_produccion
        )
        .input(
          'observacion',
          sql.NVarChar(500),
          observacion || null
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .input(
          'idempotency_key',
          sql.VarChar(100),
          idempotency_key
        )
        .query(`
          INSERT INTO produccion.Produccion (
            fecha_produccion,
            observacion,
            created_by_usuario_id,
            idempotency_key
          )
          VALUES (
            @fecha_produccion,
            @observacion,
            @created_by_usuario_id,
            @idempotency_key
          );

          SELECT
            CONVERT(
              INT,
              SCOPE_IDENTITY()
            ) AS produccion_id;
        `);

    const produccion_id =
      produccionResult
        .recordset[0]
        .produccion_id;


    /* =====================================================
       7. DETALLES + FIFO + STOCK PRODUCTO TERMINADO
       ===================================================== */

    for (
      const detalle of
      detallesPreparados
    ) {
      const detalleResult =
        await new sql.Request(
          transaction
        )
          .input(
            'produccion_id',
            sql.Int,
            produccion_id
          )
          .input(
            'producto_id',
            sql.Int,
            detalle.producto_id
          )
          .input(
            'producto_composicion_id',
            sql.Int,
            detalle.producto
              .producto_composicion_id
          )
          .input(
            'cantidad_producida',
            sql.Decimal(18, 3),
            detalle.cantidad_producida
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            unidadKg.unidad_medida_id
          )
          .input(
            'cantidad_presentacion',
            sql.Decimal(18, 3),
            detalle
              .cantidad_presentacion
          )
          .input(
            'unidad_presentacion_id',
            sql.Int,
            detalle
              .unidad_presentacion_id
          )
          .input(
            'observacion',
            sql.NVarChar(300),
            detalle.observacion || null
          )
          .input(
            'created_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            INSERT INTO produccion.ProduccionDetalle (
              produccion_id,
              producto_id,
              producto_composicion_id,
              cantidad_producida,
              unidad_medida_id,
              cantidad_presentacion,
              unidad_presentacion_id,
              observacion,
              created_by_usuario_id
            )
            VALUES (
              @produccion_id,
              @producto_id,
              @producto_composicion_id,
              @cantidad_producida,
              @unidad_medida_id,
              @cantidad_presentacion,
              @unidad_presentacion_id,
              @observacion,
              @created_by_usuario_id
            );

            SELECT
              CONVERT(
                INT,
                SCOPE_IDENTITY()
              ) AS produccion_detalle_id;
          `);

      const produccion_detalle_id =
        detalleResult
          .recordset[0]
          .produccion_detalle_id;


      /* ---------------------------------------------------
         7A. CONSUMO FIFO DE MATERIA PRIMA
         --------------------------------------------------- */

      for (
        const consumo of
        detalle.consumos
      ) {
        const clave =
          `${consumo.material_id}-${consumo.color_id}`;

        const lotes =
          fifoPorMateria.get(
            clave
          );

        let pendiente =
          redondear3(
            consumo.cantidad_requerida
          );

        for (
          const lote of lotes
        ) {
          if (
            pendiente <= 0
          ) {
            break;
          }

          if (
            lote.cantidad_disponible <= 0
          ) {
            continue;
          }

          const retirar =
            redondear3(
              Math.min(
                pendiente,
                lote.cantidad_disponible
              )
            );

          if (retirar <= 0) {
            continue;
          }

          const updateResult =
            await new sql.Request(
              transaction
            )
              .input(
                'stock_materia_prima_lote_id',
                sql.Int,
                lote
                  .stock_materia_prima_lote_id
              )
              .input(
                'cantidad',
                sql.Decimal(18, 3),
                retirar
              )
              .input(
                'updated_by_usuario_id',
                sql.Int,
                created_by_usuario_id
              )
              .query(`
                UPDATE inventario.StockMateriaPrimaLote
                SET
                  cantidad_disponible =
                    cantidad_disponible -
                    @cantidad,

                  updated_at =
                    SYSDATETIME(),

                  updated_by_usuario_id =
                    @updated_by_usuario_id

                WHERE
                  stock_materia_prima_lote_id =
                    @stock_materia_prima_lote_id
                  AND cantidad_disponible >=
                    @cantidad;

                SELECT
                  @@ROWCOUNT AS filas_afectadas;
              `);

          if (
            updateResult.recordset[0]
              .filas_afectadas !== 1
          ) {
            throw crearErrorNegocio(
              'El stock cambió durante el registro de producción. Intenta nuevamente.',
              409,
              'CONFLICTO_STOCK'
            );
          }

          await new sql.Request(
            transaction
          )
            .input(
              'stock_materia_prima_lote_id',
              sql.Int,
              lote
                .stock_materia_prima_lote_id
            )
            .input(
              'cantidad',
              sql.Decimal(18, 3),
              retirar
            )
            .input(
              'produccion_detalle_id',
              sql.Int,
              produccion_detalle_id
            )
            .input(
              'observacion',
              sql.NVarChar(400),
              `Consumo FIFO por producción #${produccion_id}`
            )
            .input(
              'created_by_usuario_id',
              sql.Int,
              created_by_usuario_id
            )
            .query(`
              INSERT INTO inventario.MovimientoMateriaPrima (
                stock_materia_prima_lote_id,
                tipo_movimiento,
                cantidad,
                observacion,
                created_by_usuario_id,
                produccion_detalle_id,
                merma_detalle_id
              )
              VALUES (
                @stock_materia_prima_lote_id,
                'SALIDA_PRODUCCION',
                @cantidad,
                @observacion,
                @created_by_usuario_id,
                @produccion_detalle_id,
                NULL
              );
            `);

          lote.cantidad_disponible =
            redondear3(
              lote.cantidad_disponible -
              retirar
            );

          pendiente =
            redondear3(
              pendiente -
              retirar
            );
        }

        if (
          pendiente > 0.000001
        ) {
          throw crearErrorNegocio(
            'No fue posible completar el consumo FIFO de materia prima.',
            409,
            'FIFO_INCOMPLETO'
          );
        }
      }


      /* ---------------------------------------------------
         7B. UPSERT STOCK PRODUCTO TERMINADO
         --------------------------------------------------- */

      const stockExistenteResult =
        await new sql.Request(
          transaction
        )
          .input(
            'producto_id',
            sql.Int,
            detalle.producto_id
          )
          .input(
            'unidad_medida_id',
            sql.Int,
            unidadKg.unidad_medida_id
          )
          .input(
            'cantidad_presentacion',
            sql.Decimal(18, 3),
            detalle
              .cantidad_presentacion
          )
          .input(
            'unidad_presentacion_id',
            sql.Int,
            detalle
              .unidad_presentacion_id
          )
          .query(`
            SELECT
              stock_producto_terminado_id,
              cantidad_disponible

            FROM inventario.StockProductoTerminado
              WITH (
                UPDLOCK,
                HOLDLOCK
              )

            WHERE
              producto_id =
                @producto_id
              AND unidad_medida_id =
                @unidad_medida_id
              AND cantidad_presentacion =
                @cantidad_presentacion
              AND unidad_presentacion_id =
                @unidad_presentacion_id;
          `);

      let stock_producto_terminado_id;

      if (
        stockExistenteResult
          .recordset[0]
      ) {
        stock_producto_terminado_id =
          stockExistenteResult
            .recordset[0]
            .stock_producto_terminado_id;

        await new sql.Request(
          transaction
        )
          .input(
            'stock_producto_terminado_id',
            sql.Int,
            stock_producto_terminado_id
          )
          .input(
            'cantidad',
            sql.Decimal(18, 3),
            detalle.cantidad_producida
          )
          .input(
            'updated_by_usuario_id',
            sql.Int,
            created_by_usuario_id
          )
          .query(`
            UPDATE inventario.StockProductoTerminado
            SET
              cantidad_disponible =
                cantidad_disponible +
                @cantidad,

              updated_at =
                SYSDATETIME(),

              updated_by_usuario_id =
                @updated_by_usuario_id

            WHERE
              stock_producto_terminado_id =
              @stock_producto_terminado_id;
          `);

      } else {
        const nuevoStockResult =
          await new sql.Request(
            transaction
          )
            .input(
              'producto_id',
              sql.Int,
              detalle.producto_id
            )
            .input(
              'unidad_medida_id',
              sql.Int,
              unidadKg.unidad_medida_id
            )
            .input(
              'cantidad_presentacion',
              sql.Decimal(18, 3),
              detalle
                .cantidad_presentacion
            )
            .input(
              'unidad_presentacion_id',
              sql.Int,
              detalle
                .unidad_presentacion_id
            )
            .input(
              'cantidad_disponible',
              sql.Decimal(18, 3),
              detalle.cantidad_producida
            )
            .input(
              'created_by_usuario_id',
              sql.Int,
              created_by_usuario_id
            )
            .query(`
              INSERT INTO inventario.StockProductoTerminado (
                producto_id,
                unidad_medida_id,
                cantidad_presentacion,
                unidad_presentacion_id,
                cantidad_disponible,
                created_by_usuario_id
              )
              VALUES (
                @producto_id,
                @unidad_medida_id,
                @cantidad_presentacion,
                @unidad_presentacion_id,
                @cantidad_disponible,
                @created_by_usuario_id
              );

              SELECT
                CONVERT(
                  INT,
                  SCOPE_IDENTITY()
                ) AS stock_producto_terminado_id;
            `);

        stock_producto_terminado_id =
          nuevoStockResult
            .recordset[0]
            .stock_producto_terminado_id;
      }


      /* ---------------------------------------------------
         7C. MOVIMIENTO DE ENTRADA PT
         --------------------------------------------------- */

      await new sql.Request(
        transaction
      )
        .input(
          'stock_producto_terminado_id',
          sql.Int,
          stock_producto_terminado_id
        )
        .input(
          'cantidad',
          sql.Decimal(18, 3),
          detalle.cantidad_producida
        )
        .input(
          'produccion_detalle_id',
          sql.Int,
          produccion_detalle_id
        )
        .input(
          'observacion',
          sql.NVarChar(400),
          `Entrada por producción #${produccion_id}`
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .query(`
          INSERT INTO inventario.MovimientoProductoTerminado (
            stock_producto_terminado_id,
            tipo_movimiento,
            cantidad,
            produccion_detalle_id,
            entrega_detalle_id,
            observacion,
            created_by_usuario_id
          )
          VALUES (
            @stock_producto_terminado_id,
            'ENTRADA_PRODUCCION',
            @cantidad,
            @produccion_detalle_id,
            NULL,
            @observacion,
            @created_by_usuario_id
          );
        `);
    }


    /* =====================================================
       8. COMMIT
       ===================================================== */

    await transaction.commit();

    return {
      reutilizada: false,
      produccion:
        await obtenerProduccionPorId(
          produccion_id
        )
    };

  } catch (error) {
    try {
      await transaction.rollback();
    } catch (_) {
      // Conservamos el error original.
    }

    /*
     * Si dos solicitudes con la misma key llegaron casi
     * simultáneamente, el índice único es la segunda barrera.
     */
    if (
      [2601, 2627].includes(
        error.number
      ) &&
      idempotency_key
    ) {
      const existente =
        await buscarProduccionPorIdempotencyKey(
          idempotency_key
        );

      if (existente) {
        return {
          reutilizada: true,
          produccion:
            await obtenerProduccionPorId(
              existente.produccion_id
            )
        };
      }
    }

    throw error;
  }
};


module.exports = {
  listarProducciones,
  obtenerProduccionPorId,
  crearProduccion
};

~~~

---

## src\modules\producciones\produccion.routes.js

~~~javascript
const express = require('express');

const {
  obtenerProducciones,
  obtenerProduccion,
  registrarProduccion
} = require('./produccion.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router =
  express.Router();


router.get(
  '/',
  verificarToken,
  obtenerProducciones
);


router.post(
  '/',
  verificarToken,
  registrarProduccion
);


router.get(
  '/:produccion_id',
  verificarToken,
  obtenerProduccion
);


module.exports =
  router;

~~~

---

## src\modules\productos\producto.controller.js

~~~javascript
const {
  listarProductos,
  obtenerProductoPorId,
  buscarProductoPorCodigo,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('./producto.model');

const obtenerProductos = async (req, res) => {
  try {
    const { q } = req.query;

    const productos = await listarProductos(q);

    res.json({
      mensaje: 'Productos obtenidos correctamente',
      productos
    });

  } catch (error) {
    console.error('Error listar productos:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar productos'
    });
  }
};

const obtenerProducto = async (req, res) => {
  try {
    const { producto_id } = req.params;

    const producto = await obtenerProductoPorId(producto_id);

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado'
      });
    }

    res.json({
      mensaje: 'Producto obtenido correctamente',
      producto
    });

  } catch (error) {
    console.error('Error obtener producto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener producto'
    });
  }
};

const registrarProducto = async (req, res) => {
  try {
    let {
      codigo_producto,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      peso_total_kg,
      presentacion,
      descripcion
    } = req.body;

    if (!tipo_producto_id || !medida_id || !color_id || !material_id) {
      return res.status(400).json({
        mensaje: 'Tipo, medida, color y material son obligatorios'
      });
    }

    if (peso_total_kg && Number(peso_total_kg) <= 0) {
      return res.status(400).json({
        mensaje: 'El peso total debe ser mayor a 0'
      });
    }

    codigo_producto = codigo_producto
      ? codigo_producto.trim().toUpperCase()
      : null;

    presentacion = presentacion
      ? presentacion.trim().toUpperCase()
      : null;

    descripcion = descripcion
      ? descripcion.trim().toUpperCase()
      : null;

    if (codigo_producto) {
      const productoExistente = await buscarProductoPorCodigo(codigo_producto);

      if (productoExistente) {
        return res.status(409).json({
          mensaje: 'Ya existe un producto con ese código'
        });
      }
    }

    const producto = await crearProducto({
      codigo_producto,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      peso_total_kg,
      presentacion,
      descripcion,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Producto registrado correctamente',
      producto
    });

  } catch (error) {
    console.error('Error registrar producto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar producto'
    });
  }
};

const editarProducto = async (req, res) => {
  try {
    const { producto_id } = req.params;

    let {
      codigo_producto,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      peso_total_kg,
      presentacion,
      descripcion
    } = req.body;

    if (!tipo_producto_id || !medida_id || !color_id || !material_id) {
      return res.status(400).json({
        mensaje: 'Tipo, medida, color y material son obligatorios'
      });
    }

    if (peso_total_kg && Number(peso_total_kg) <= 0) {
      return res.status(400).json({
        mensaje: 'El peso total debe ser mayor a 0'
      });
    }

    codigo_producto = codigo_producto
      ? codigo_producto.trim().toUpperCase()
      : null;

    presentacion = presentacion
      ? presentacion.trim().toUpperCase()
      : null;

    descripcion = descripcion
      ? descripcion.trim().toUpperCase()
      : null;

    if (codigo_producto) {
      const productoExistente = await buscarProductoPorCodigo(codigo_producto);

      if (
        productoExistente &&
        Number(productoExistente.producto_id) !== Number(producto_id)
      ) {
        return res.status(409).json({
          mensaje: 'Ya existe otro producto con ese código'
        });
      }
    }

    const producto = await actualizarProducto({
      producto_id,
      codigo_producto,
      tipo_producto_id,
      medida_id,
      color_id,
      material_id,
      peso_total_kg,
      presentacion,
      descripcion,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado'
      });
    }

    res.json({
      mensaje: 'Producto actualizado correctamente',
      producto
    });

  } catch (error) {
    console.error('Error editar producto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al editar producto'
    });
  }
};

const darBajaProducto = async (req, res) => {
  try {
    const { producto_id } = req.params;

    const producto = await eliminarProducto({
      producto_id,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado'
      });
    }

    res.json({
      mensaje: 'Producto dado de baja correctamente',
      producto
    });

  } catch (error) {
    console.error('Error eliminar producto:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al dar de baja producto'
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  registrarProducto,
  editarProducto,
  darBajaProducto
};
~~~

---

## src\modules\productos\producto.model.js

~~~javascript
const { getConnection, sql } = require('../../config/db');

const listarProductos = async (q) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('q', sql.NVarChar(100), q ? `%${q}%` : null)
    .query(`
      SELECT
        p.producto_id,
        p.codigo_producto,

        p.tipo_producto_id,
        tp.nombre AS tipo_producto,

        p.medida_id,
        m.nombre AS medida,

        p.color_id,
        c.nombre AS color,

        p.material_id,
        mat.nombre AS material,

        p.peso_total_kg,
        p.presentacion,
        p.descripcion,
        p.activo,
        p.created_at
      FROM catalog.Producto p
      INNER JOIN catalog.TipoProducto tp
        ON p.tipo_producto_id = tp.tipo_producto_id
      INNER JOIN catalog.Medida m
        ON p.medida_id = m.medida_id
      INNER JOIN catalog.Color c
        ON p.color_id = c.color_id
      INNER JOIN catalog.Material mat
        ON p.material_id = mat.material_id
      WHERE p.activo = 1
        AND (
          @q IS NULL
          OR p.codigo_producto LIKE @q
          OR tp.nombre LIKE @q
          OR m.nombre LIKE @q
          OR c.nombre LIKE @q
          OR mat.nombre LIKE @q
          OR p.presentacion LIKE @q
          OR p.descripcion LIKE @q
        )
      ORDER BY p.created_at DESC;
    `);

  return result.recordset;
};

const obtenerProductoPorId = async (producto_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('producto_id', sql.Int, producto_id)
    .query(`
      SELECT
        p.producto_id,
        p.codigo_producto,

        p.tipo_producto_id,
        tp.nombre AS tipo_producto,

        p.medida_id,
        m.nombre AS medida,

        p.color_id,
        c.nombre AS color,

        p.material_id,
        mat.nombre AS material,

        p.peso_total_kg,
        p.presentacion,
        p.descripcion,
        p.activo,
        p.created_at
      FROM catalog.Producto p
      INNER JOIN catalog.TipoProducto tp
        ON p.tipo_producto_id = tp.tipo_producto_id
      INNER JOIN catalog.Medida m
        ON p.medida_id = m.medida_id
      INNER JOIN catalog.Color c
        ON p.color_id = c.color_id
      INNER JOIN catalog.Material mat
        ON p.material_id = mat.material_id
      WHERE p.producto_id = @producto_id
        AND p.activo = 1;
    `);

  return result.recordset[0];
};

const buscarProductoPorCodigo = async (codigo_producto) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('codigo_producto', sql.VarChar(50), codigo_producto)
    .query(`
      SELECT
        producto_id,
        codigo_producto,
        activo
      FROM catalog.Producto
      WHERE codigo_producto = @codigo_producto;
    `);

  return result.recordset[0];
};

const crearProducto = async ({
  codigo_producto,
  tipo_producto_id,
  medida_id,
  color_id,
  material_id,
  peso_total_kg,
  presentacion,
  descripcion,
  created_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('codigo_producto', sql.VarChar(50), codigo_producto || null)
    .input('tipo_producto_id', sql.Int, tipo_producto_id)
    .input('medida_id', sql.Int, medida_id)
    .input('color_id', sql.Int, color_id)
    .input('material_id', sql.Int, material_id)
    .input('peso_total_kg', sql.Decimal(18, 3), peso_total_kg || null)
    .input('presentacion', sql.NVarChar(150), presentacion || null)
    .input('descripcion', sql.NVarChar(300), descripcion || null)
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO catalog.Producto (
        codigo_producto,
        tipo_producto_id,
        medida_id,
        color_id,
        material_id,
        peso_total_kg,
        presentacion,
        descripcion,
        created_by_usuario_id
      )
      OUTPUT
        INSERTED.producto_id,
        INSERTED.codigo_producto,
        INSERTED.tipo_producto_id,
        INSERTED.medida_id,
        INSERTED.color_id,
        INSERTED.material_id,
        INSERTED.peso_total_kg,
        INSERTED.presentacion,
        INSERTED.descripcion,
        INSERTED.activo,
        INSERTED.created_at
      VALUES (
        @codigo_producto,
        @tipo_producto_id,
        @medida_id,
        @color_id,
        @material_id,
        @peso_total_kg,
        @presentacion,
        @descripcion,
        @created_by_usuario_id
      );
    `);

  return result.recordset[0];
};

const actualizarProducto = async ({
  producto_id,
  codigo_producto,
  tipo_producto_id,
  medida_id,
  color_id,
  material_id,
  peso_total_kg,
  presentacion,
  descripcion,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('producto_id', sql.Int, producto_id)
    .input('codigo_producto', sql.VarChar(50), codigo_producto || null)
    .input('tipo_producto_id', sql.Int, tipo_producto_id)
    .input('medida_id', sql.Int, medida_id)
    .input('color_id', sql.Int, color_id)
    .input('material_id', sql.Int, material_id)
    .input('peso_total_kg', sql.Decimal(18, 3), peso_total_kg || null)
    .input('presentacion', sql.NVarChar(150), presentacion || null)
    .input('descripcion', sql.NVarChar(300), descripcion || null)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE catalog.Producto
      SET
        codigo_producto = @codigo_producto,
        tipo_producto_id = @tipo_producto_id,
        medida_id = @medida_id,
        color_id = @color_id,
        material_id = @material_id,
        peso_total_kg = @peso_total_kg,
        presentacion = @presentacion,
        descripcion = @descripcion,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.producto_id,
        INSERTED.codigo_producto,
        INSERTED.tipo_producto_id,
        INSERTED.medida_id,
        INSERTED.color_id,
        INSERTED.material_id,
        INSERTED.peso_total_kg,
        INSERTED.presentacion,
        INSERTED.descripcion,
        INSERTED.activo,
        INSERTED.updated_at
      WHERE producto_id = @producto_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const eliminarProducto = async ({
  producto_id,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('producto_id', sql.Int, producto_id)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE catalog.Producto
      SET
        activo = 0,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.producto_id,
        INSERTED.codigo_producto,
        INSERTED.activo
      WHERE producto_id = @producto_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

module.exports = {
  listarProductos,
  obtenerProductoPorId,
  buscarProductoPorCodigo,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
~~~

---

## src\modules\productos\producto.routes.js

~~~javascript
const express = require('express');

const {
  obtenerProductos,
  obtenerProducto,
  registrarProducto,
  editarProducto,
  darBajaProducto
} = require('./producto.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  obtenerProductos
);

router.get(
  '/:producto_id',
  verificarToken,
  obtenerProducto
);

router.post(
  '/',
  verificarToken,
  registrarProducto
);

router.put(
  '/:producto_id',
  verificarToken,
  editarProducto
);

router.delete(
  '/:producto_id',
  verificarToken,
  darBajaProducto
);

module.exports = router;
~~~

---

## src\modules\productosTerminados\productoTerminado.controller.js

~~~javascript
const {
  listarProductosTerminados,
  obtenerProductoTerminadoPorId,
  crearProductoTerminado,
  listarComposicionesProducto,
  crearNuevaComposicionProducto,
  obtenerOpcionesProductosTerminados
} = require('./productoTerminado.model');


const validarPaginacion = (
  page,
  limit
) => {
  const pageNumero =
    Number(page);

  const limitNumero =
    Number(limit);

  if (
    !Number.isInteger(
      pageNumero
    ) ||
    pageNumero < 1 ||
    !Number.isInteger(
      limitNumero
    ) ||
    limitNumero < 1 ||
    limitNumero > 100
  ) {
    return null;
  }

  return {
    page: pageNumero,
    limit: limitNumero
  };
};


const idOpcional = (
  valor
) => {
  if (
    valor === undefined ||
    valor === null ||
    valor === ''
  ) {
    return null;
  }

  const numero =
    Number(valor);

  if (
    !Number.isInteger(numero) ||
    numero <= 0
  ) {
    return NaN;
  }

  return numero;
};


const obtenerProductosTerminados =
  async (
    req,
    res
  ) => {
    try {
      const {
        q,
        tipo_producto_id,
        material_id,
        medida_id,
        color_id,
        estado_composicion = 'TODOS',
        page = 1,
        limit = 10
      } = req.query;

      const paginacion =
        validarPaginacion(
          page,
          limit
        );

      if (!paginacion) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      const tipoId =
        idOpcional(
          tipo_producto_id
        );

      const materialId =
        idOpcional(
          material_id
        );

      const medidaId =
        idOpcional(
          medida_id
        );

      const colorId =
        idOpcional(
          color_id
        );

      if (
        [
          tipoId,
          materialId,
          medidaId,
          colorId
        ].some(
          Number.isNaN
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Uno de los filtros enviados no es válido'
        });
      }

      const estado =
        String(
          estado_composicion
        )
          .trim()
          .toUpperCase();

      if (
        ![
          'TODOS',
          'CONFIGURADO',
          'SIN_COMPOSICION'
        ].includes(
          estado
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Estado de composición inválido'
        });
      }

      const resultado =
        await listarProductosTerminados({
          q:
            q
              ? String(q).trim()
              : null,
          tipo_producto_id:
            tipoId,
          material_id:
            materialId,
          medida_id:
            medidaId,
          color_id:
            colorId,
          estado_composicion:
            estado,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Productos terminados obtenidos correctamente',
        productos:
          resultado.productos,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error listar productos terminados:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al listar productos terminados'
      });
    }
  };


const obtenerProductoTerminado =
  async (
    req,
    res
  ) => {
    try {
      const producto_id =
        Number(
          req.params.producto_id
        );

      if (
        !Number.isInteger(
          producto_id
        ) ||
        producto_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de producto inválido'
        });
      }

      const producto =
        await obtenerProductoTerminadoPorId(
          producto_id
        );

      if (!producto) {
        return res.status(404).json({
          mensaje:
            'Producto terminado no encontrado'
        });
      }

      res.json({
        mensaje:
          'Producto terminado obtenido correctamente',
        producto
      });

    } catch (error) {
      console.error(
        'Error obtener producto terminado:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener el producto terminado'
      });
    }
  };


const registrarProductoTerminado =
  async (
    req,
    res
  ) => {
    try {
      let {
        tipo_producto_id,
        material_id,
        medida_id,
        color_id,
        descripcion
      } = req.body;

      tipo_producto_id =
        Number(
          tipo_producto_id
        );

      material_id =
        Number(
          material_id
        );

      medida_id =
        Number(
          medida_id
        );

      color_id =
        Number(
          color_id
        );

      if (
        !Number.isInteger(
          tipo_producto_id
        ) ||
        tipo_producto_id <= 0 ||
        !Number.isInteger(
          material_id
        ) ||
        material_id <= 0 ||
        !Number.isInteger(
          medida_id
        ) ||
        medida_id <= 0 ||
        !Number.isInteger(
          color_id
        ) ||
        color_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Tipo, material, medida y color son obligatorios'
        });
      }

      descripcion =
        descripcion
          ? String(
              descripcion
            ).trim()
          : null;

      if (
        descripcion &&
        descripcion.length > 300
      ) {
        return res.status(400).json({
          mensaje:
            'La descripción no puede superar 300 caracteres'
        });
      }

      const producto =
        await crearProductoTerminado({
          tipo_producto_id,
          material_id,
          medida_id,
          color_id,
          descripcion,
          created_by_usuario_id:
            req.usuario.usuario_id
        });

      res.status(201).json({
        mensaje:
          'Producto terminado registrado correctamente',
        producto
      });

    } catch (error) {
      console.error(
        'Error registrar producto terminado:',
        error.message
      );

      if (error.statusCode) {
        return res
          .status(
            error.statusCode
          )
          .json({
            mensaje:
              error.message
          });
      }

      res.status(500).json({
        mensaje:
          'Error interno al registrar el producto terminado'
      });
    }
  };


const obtenerComposiciones =
  async (
    req,
    res
  ) => {
    try {
      const producto_id =
        Number(
          req.params.producto_id
        );

      if (
        !Number.isInteger(
          producto_id
        ) ||
        producto_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de producto inválido'
        });
      }

      const producto =
        await obtenerProductoTerminadoPorId(
          producto_id
        );

      if (!producto) {
        return res.status(404).json({
          mensaje:
            'Producto terminado no encontrado'
        });
      }

      const {
        page = 1,
        limit = 10
      } = req.query;

      const paginacion =
        validarPaginacion(
          page,
          limit
        );

      if (!paginacion) {
        return res.status(400).json({
          mensaje:
            'Paginación inválida'
        });
      }

      const resultado =
        await listarComposicionesProducto({
          producto_id,
          page:
            paginacion.page,
          limit:
            paginacion.limit
        });

      res.json({
        mensaje:
          'Historial de composiciones obtenido correctamente',
        producto,
        composiciones:
          resultado.composiciones,
        paginacion:
          resultado.paginacion
      });

    } catch (error) {
      console.error(
        'Error obtener composiciones:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener las composiciones'
      });
    }
  };


const registrarNuevaComposicion =
  async (
    req,
    res
  ) => {
    try {
      const producto_id =
        Number(
          req.params.producto_id
        );

      if (
        !Number.isInteger(
          producto_id
        ) ||
        producto_id <= 0
      ) {
        return res.status(400).json({
          mensaje:
            'Identificador de producto inválido'
        });
      }

      let {
        observacion,
        detalles
      } = req.body;

      if (
        !Array.isArray(
          detalles
        ) ||
        detalles.length === 0
      ) {
        return res.status(400).json({
          mensaje:
            'La composición debe tener al menos una materia prima'
        });
      }

      observacion =
        observacion
          ? String(
              observacion
            ).trim()
          : null;

      if (
        observacion &&
        observacion.length > 400
      ) {
        return res.status(400).json({
          mensaje:
            'La observación no puede superar 400 caracteres'
        });
      }

      const ingredientes =
        new Set();

      let total =
        0;

      detalles =
        detalles.map(
          (
            item,
            index
          ) => {
            const material_id =
              Number(
                item.material_id
              );

            const color_id =
              Number(
                item.color_id
              );

            const porcentaje =
              Number(
                item.porcentaje
              );

            if (
              !Number.isInteger(
                material_id
              ) ||
              material_id <= 0
            ) {
              const error =
                new Error(
                  `El componente ${index + 1} debe tener material`
                );

              error.statusCode =
                400;

              throw error;
            }

            if (
              !Number.isInteger(
                color_id
              ) ||
              color_id <= 0
            ) {
              const error =
                new Error(
                  `El componente ${index + 1} debe tener color`
                );

              error.statusCode =
                400;

              throw error;
            }

            if (
              !Number.isFinite(
                porcentaje
              ) ||
              porcentaje <= 0 ||
              porcentaje > 100
            ) {
              const error =
                new Error(
                  `El porcentaje del componente ${index + 1} debe ser mayor a 0 y menor o igual a 100`
                );

              error.statusCode =
                400;

              throw error;
            }

            const clave =
              `${material_id}-${color_id}`;

            if (
              ingredientes.has(
                clave
              )
            ) {
              const error =
                new Error(
                  `El componente ${index + 1} repite la misma materia prima y color`
                );

              error.statusCode =
                400;

              throw error;
            }

            ingredientes.add(
              clave
            );

            const porcentajeNormalizado =
              Number(
                porcentaje.toFixed(
                  6
                )
              );

            total +=
              porcentajeNormalizado;

            return {
              material_id,
              color_id,
              porcentaje:
                porcentajeNormalizado
            };
          }
        );

      const totalNormalizado =
        Number(
          total.toFixed(
            6
          )
        );

      if (
        Math.abs(
          totalNormalizado -
          100
        ) > 0.000001
      ) {
        return res.status(400).json({
          mensaje:
            `La composición debe sumar exactamente 100%. Actualmente suma ${totalNormalizado}%`
        });
      }

      const composicion =
        await crearNuevaComposicionProducto({
          producto_id,
          observacion,
          detalles,
          created_by_usuario_id:
            req.usuario.usuario_id
        });

      res.status(201).json({
        mensaje:
          'Nueva versión de composición publicada correctamente',
        composicion
      });

    } catch (error) {
      console.error(
        'Error registrar composición:',
        error.message
      );

      if (error.statusCode) {
        return res
          .status(
            error.statusCode
          )
          .json({
            mensaje:
              error.message
          });
      }

      res.status(500).json({
        mensaje:
          error.number ===
            50220
            ? 'La composición debe sumar exactamente 100%'
            : 'Error interno al registrar la composición'
      });
    }
  };


const obtenerOpciones =
  async (
    req,
    res
  ) => {
    try {
      const {
        tipo_producto_id,
        material_id,
        medida_id,
        color_id
      } = req.query;

      const tipoId =
        idOpcional(
          tipo_producto_id
        );

      const materialId =
        idOpcional(
          material_id
        );

      const medidaId =
        idOpcional(
          medida_id
        );

      const colorId =
        idOpcional(
          color_id
        );

      if (
        [
          tipoId,
          materialId,
          medidaId,
          colorId
        ].some(
          Number.isNaN
        )
      ) {
        return res.status(400).json({
          mensaje:
            'Uno de los filtros enviados no es válido'
        });
      }

      const opciones =
        await obtenerOpcionesProductosTerminados({
          tipo_producto_id:
            tipoId,
          material_id:
            materialId,
          medida_id:
            medidaId,
          color_id:
            colorId
        });

      res.json({
        mensaje:
          'Opciones de productos terminados obtenidas correctamente',
        ...opciones
      });

    } catch (error) {
      console.error(
        'Error opciones productos terminados:',
        error.message
      );

      res.status(500).json({
        mensaje:
          'Error interno al obtener opciones de productos terminados'
      });
    }
  };


module.exports = {
  obtenerProductosTerminados,
  obtenerProductoTerminado,
  registrarProductoTerminado,
  obtenerComposiciones,
  registrarNuevaComposicion,
  obtenerOpciones
};

~~~

---

## src\modules\productosTerminados\productoTerminado.model.js

~~~javascript
const {
  getConnection,
  sql
} = require('../../config/db');


const crearErrorNegocio = (
  mensaje,
  statusCode = 400
) => {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
};


const listarProductosTerminados = async ({
  q,
  tipo_producto_id,
  material_id,
  medida_id,
  color_id,
  estado_composicion,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'q',
        sql.NVarChar(150),
        q ? `%${q}%` : null
      )
      .input(
        'tipo_producto_id',
        sql.Int,
        tipo_producto_id || null
      )
      .input(
        'material_id',
        sql.Int,
        material_id || null
      )
      .input(
        'medida_id',
        sql.Int,
        medida_id || null
      )
      .input(
        'color_id',
        sql.Int,
        color_id || null
      )
      .input(
        'estado_composicion',
        sql.VarChar(30),
        estado_composicion || 'TODOS'
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        WITH Productos AS (
          SELECT
            p.producto_id,
            p.codigo_producto,

            p.tipo_producto_id,
            tp.nombre
              AS tipo_producto,

            p.material_id,
            mat.nombre
              AS material,

            p.medida_id,
            med.nombre
              AS medida,

            p.color_id,
            col.nombre
              AS color,

            p.descripcion,
            p.activo,
            p.created_at,

            pc.producto_composicion_id,
            pc.version_numero
              AS composicion_version,
            pc.fecha_vigencia_desde,

            CASE
              WHEN pc.producto_composicion_id
                   IS NULL
              THEN 'SIN_COMPOSICION'
              ELSE 'CONFIGURADO'
            END AS estado_composicion,

            ISNULL(
              comp.total_componentes,
              0
            ) AS componentes_composicion

          FROM catalog.Producto p

          INNER JOIN catalog.TipoProducto tp
            ON p.tipo_producto_id =
               tp.tipo_producto_id

          INNER JOIN catalog.Material mat
            ON p.material_id =
               mat.material_id

          INNER JOIN catalog.Medida med
            ON p.medida_id =
               med.medida_id

          INNER JOIN catalog.Color col
            ON p.color_id =
               col.color_id

          LEFT JOIN catalog.ProductoComposicion pc
            ON p.producto_id =
               pc.producto_id
           AND pc.vigente = 1

          OUTER APPLY (
            SELECT
              COUNT(*) AS total_componentes
            FROM catalog.ProductoComposicionDetalle pcd
            WHERE
              pcd.producto_composicion_id =
              pc.producto_composicion_id
          ) comp

          WHERE
            p.activo = 1

            AND (
              @tipo_producto_id IS NULL
              OR p.tipo_producto_id =
                 @tipo_producto_id
            )

            AND (
              @material_id IS NULL
              OR p.material_id =
                 @material_id
            )

            AND (
              @medida_id IS NULL
              OR p.medida_id =
                 @medida_id
            )

            AND (
              @color_id IS NULL
              OR p.color_id =
                 @color_id
            )

            AND (
              @q IS NULL
              OR tp.nombre LIKE @q
              OR mat.nombre LIKE @q
              OR med.nombre LIKE @q
              OR col.nombre LIKE @q
              OR p.codigo_producto LIKE @q
              OR p.descripcion LIKE @q
            )
        )

        SELECT
          *,
          COUNT(*) OVER()
            AS total_registros

        FROM Productos

        WHERE
          @estado_composicion = 'TODOS'
          OR estado_composicion =
             @estado_composicion

        ORDER BY
          tipo_producto ASC,
          material ASC,
          medida ASC,
          color ASC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const productos =
    result.recordset;

  const total =
    productos.length > 0
      ? productos[0]
          .total_registros
      : 0;

  return {
    productos,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const obtenerComposicionPorId = async (
  producto_composicion_id,
  poolOrTransaction = null
) => {
  const executor =
    poolOrTransaction ||
    await getConnection();

  const request =
    poolOrTransaction
      ? new sql.Request(
          poolOrTransaction
        )
      : executor.request();

  const cabeceraResult =
    await request
      .input(
        'producto_composicion_id',
        sql.Int,
        producto_composicion_id
      )
      .query(`
        SELECT
          pc.producto_composicion_id,
          pc.producto_id,
          pc.version_numero,
          pc.vigente,
          pc.fecha_vigencia_desde,
          pc.fecha_vigencia_hasta,
          pc.observacion,
          pc.created_at,

          uc.nombre_completo
            AS creado_por,

          pc.updated_at,

          uu.nombre_completo
            AS actualizado_por

        FROM catalog.ProductoComposicion pc

        INNER JOIN auth.Usuario uc
          ON pc.created_by_usuario_id =
             uc.usuario_id

        LEFT JOIN auth.Usuario uu
          ON pc.updated_by_usuario_id =
             uu.usuario_id

        WHERE
          pc.producto_composicion_id =
          @producto_composicion_id;
      `);

  const composicion =
    cabeceraResult.recordset[0];

  if (!composicion) {
    return null;
  }

  const detallesRequest =
    poolOrTransaction
      ? new sql.Request(
          poolOrTransaction
        )
      : executor.request();

  const detallesResult =
    await detallesRequest
      .input(
        'producto_composicion_id',
        sql.Int,
        producto_composicion_id
      )
      .query(`
        SELECT
          pcd.producto_composicion_detalle_id,
          pcd.producto_composicion_id,

          pcd.material_id,
          m.nombre AS material,

          pcd.color_id,
          c.nombre AS color,

          pcd.porcentaje

        FROM catalog.ProductoComposicionDetalle pcd

        INNER JOIN catalog.Material m
          ON pcd.material_id =
             m.material_id

        INNER JOIN catalog.Color c
          ON pcd.color_id =
             c.color_id

        WHERE
          pcd.producto_composicion_id =
          @producto_composicion_id

        ORDER BY
          pcd.porcentaje DESC,
          m.nombre ASC,
          c.nombre ASC;
      `);

  return {
    ...composicion,
    detalles:
      detallesResult.recordset
  };
};


const obtenerProductoTerminadoPorId = async (
  producto_id
) => {
  const pool =
    await getConnection();

  const result =
    await pool.request()
      .input(
        'producto_id',
        sql.Int,
        producto_id
      )
      .query(`
        SELECT
          p.producto_id,
          p.codigo_producto,

          p.tipo_producto_id,
          tp.nombre
            AS tipo_producto,

          p.material_id,
          mat.nombre
            AS material,

          p.medida_id,
          med.nombre
            AS medida,

          p.color_id,
          col.nombre
            AS color,

          p.descripcion,
          p.activo,
          p.created_at,

          u.nombre_completo
            AS creado_por,

          pc.producto_composicion_id,
          pc.version_numero
            AS composicion_version,
          pc.fecha_vigencia_desde

        FROM catalog.Producto p

        INNER JOIN catalog.TipoProducto tp
          ON p.tipo_producto_id =
             tp.tipo_producto_id

        INNER JOIN catalog.Material mat
          ON p.material_id =
             mat.material_id

        INNER JOIN catalog.Medida med
          ON p.medida_id =
             med.medida_id

        INNER JOIN catalog.Color col
          ON p.color_id =
             col.color_id

        LEFT JOIN auth.Usuario u
          ON p.created_by_usuario_id =
             u.usuario_id

        LEFT JOIN catalog.ProductoComposicion pc
          ON p.producto_id =
             pc.producto_id
         AND pc.vigente = 1

        WHERE
          p.producto_id =
          @producto_id;
      `);

  const producto =
    result.recordset[0];

  if (!producto) {
    return null;
  }

  let composicion_vigente =
    null;

  if (
    producto
      .producto_composicion_id
  ) {
    composicion_vigente =
      await obtenerComposicionPorId(
        producto
          .producto_composicion_id
      );
  }

  return {
    ...producto,
    composicion_vigente
  };
};


const crearProductoTerminado = async ({
  tipo_producto_id,
  material_id,
  medida_id,
  color_id,
  descripcion,
  created_by_usuario_id
}) => {
  const pool =
    await getConnection();

  const transaction =
    new sql.Transaction(pool);

  try {
    await transaction.begin(
      sql.ISOLATION_LEVEL.SERIALIZABLE
    );

    const catalogosResult =
      await new sql.Request(
        transaction
      )
        .input(
          'tipo_producto_id',
          sql.Int,
          tipo_producto_id
        )
        .input(
          'material_id',
          sql.Int,
          material_id
        )
        .input(
          'medida_id',
          sql.Int,
          medida_id
        )
        .input(
          'color_id',
          sql.Int,
          color_id
        )
        .query(`
          SELECT
            CASE WHEN EXISTS (
              SELECT 1
              FROM catalog.TipoProducto
              WHERE
                tipo_producto_id =
                  @tipo_producto_id
                AND activo = 1
            )
            THEN 1 ELSE 0 END
              AS tipo_valido,

            CASE WHEN EXISTS (
              SELECT 1
              FROM catalog.Material
              WHERE
                material_id =
                  @material_id
                AND activo = 1
            )
            THEN 1 ELSE 0 END
              AS material_valido,

            CASE WHEN EXISTS (
              SELECT 1
              FROM catalog.Medida
              WHERE
                medida_id =
                  @medida_id
                AND activo = 1
            )
            THEN 1 ELSE 0 END
              AS medida_valida,

            CASE WHEN EXISTS (
              SELECT 1
              FROM catalog.Color
              WHERE
                color_id =
                  @color_id
                AND activo = 1
            )
            THEN 1 ELSE 0 END
              AS color_valido;
        `);

    const catalogos =
      catalogosResult.recordset[0];

    if (!catalogos.tipo_valido) {
      throw crearErrorNegocio(
        'El tipo de producto no existe o está inactivo',
        400
      );
    }

    if (!catalogos.material_valido) {
      throw crearErrorNegocio(
        'El material no existe o está inactivo',
        400
      );
    }

    if (!catalogos.medida_valida) {
      throw crearErrorNegocio(
        'La medida no existe o está inactiva',
        400
      );
    }

    if (!catalogos.color_valido) {
      throw crearErrorNegocio(
        'El color no existe o está inactivo',
        400
      );
    }

    const existenteResult =
      await new sql.Request(
        transaction
      )
        .input(
          'tipo_producto_id',
          sql.Int,
          tipo_producto_id
        )
        .input(
          'material_id',
          sql.Int,
          material_id
        )
        .input(
          'medida_id',
          sql.Int,
          medida_id
        )
        .input(
          'color_id',
          sql.Int,
          color_id
        )
        .query(`
          SELECT TOP 1
            producto_id
          FROM catalog.Producto
            WITH (
              UPDLOCK,
              HOLDLOCK
            )
          WHERE
            tipo_producto_id =
              @tipo_producto_id
            AND material_id =
              @material_id
            AND medida_id =
              @medida_id
            AND color_id =
              @color_id
            AND activo = 1;
        `);

    if (
      existenteResult.recordset[0]
    ) {
      throw crearErrorNegocio(
        'Ese producto terminado ya está registrado',
        409
      );
    }

    const result =
      await new sql.Request(
        transaction
      )
        .input(
          'tipo_producto_id',
          sql.Int,
          tipo_producto_id
        )
        .input(
          'material_id',
          sql.Int,
          material_id
        )
        .input(
          'medida_id',
          sql.Int,
          medida_id
        )
        .input(
          'color_id',
          sql.Int,
          color_id
        )
        .input(
          'descripcion',
          sql.NVarChar(300),
          descripcion || null
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .query(`
          INSERT INTO catalog.Producto (
            codigo_producto,
            tipo_producto_id,
            medida_id,
            color_id,
            material_id,
            peso_total_kg,
            presentacion,
            descripcion,
            activo,
            created_by_usuario_id
          )
          OUTPUT
            INSERTED.producto_id
          VALUES (
            NULL,
            @tipo_producto_id,
            @medida_id,
            @color_id,
            @material_id,
            NULL,
            NULL,
            @descripcion,
            1,
            @created_by_usuario_id
          );
        `);

    const producto_id =
      result.recordset[0]
        .producto_id;

    await transaction.commit();

    return await obtenerProductoTerminadoPorId(
      producto_id
    );

  } catch (error) {
    try {
      await transaction.rollback();
    } catch (_) {
      // Conservamos el error original.
    }

    if (
      [2601, 2627]
        .includes(
          error.number
        )
    ) {
      throw crearErrorNegocio(
        'Ese producto terminado ya está registrado',
        409
      );
    }

    throw error;
  }
};


const listarComposicionesProducto = async ({
  producto_id,
  page = 1,
  limit = 10
}) => {
  const pool =
    await getConnection();

  const offset =
    (page - 1) * limit;

  const result =
    await pool.request()
      .input(
        'producto_id',
        sql.Int,
        producto_id
      )
      .input(
        'offset',
        sql.Int,
        offset
      )
      .input(
        'limit',
        sql.Int,
        limit
      )
      .query(`
        SELECT
          pc.producto_composicion_id,
          pc.producto_id,
          pc.version_numero,
          pc.vigente,
          pc.fecha_vigencia_desde,
          pc.fecha_vigencia_hasta,
          pc.observacion,
          pc.created_at,

          u.nombre_completo
            AS creado_por,

          COUNT(
            pcd.producto_composicion_detalle_id
          ) AS cantidad_componentes,

          ISNULL(
            SUM(
              pcd.porcentaje
            ),
            0
          ) AS porcentaje_total,

          COUNT(*) OVER()
            AS total_registros

        FROM catalog.ProductoComposicion pc

        INNER JOIN auth.Usuario u
          ON pc.created_by_usuario_id =
             u.usuario_id

        LEFT JOIN catalog.ProductoComposicionDetalle pcd
          ON pc.producto_composicion_id =
             pcd.producto_composicion_id

        WHERE
          pc.producto_id =
          @producto_id

        GROUP BY
          pc.producto_composicion_id,
          pc.producto_id,
          pc.version_numero,
          pc.vigente,
          pc.fecha_vigencia_desde,
          pc.fecha_vigencia_hasta,
          pc.observacion,
          pc.created_at,
          u.nombre_completo

        ORDER BY
          pc.version_numero DESC

        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);

  const composiciones =
    result.recordset;

  const total =
    composiciones.length > 0
      ? composiciones[0]
          .total_registros
      : 0;

  return {
    composiciones,
    paginacion: {
      page,
      limit,
      total,
      totalPaginas:
        Math.ceil(
          total / limit
        )
    }
  };
};


const crearNuevaComposicionProducto = async ({
  producto_id,
  observacion,
  detalles,
  created_by_usuario_id
}) => {
  const pool =
    await getConnection();

  const transaction =
    new sql.Transaction(pool);

  try {
    await transaction.begin(
      sql.ISOLATION_LEVEL.SERIALIZABLE
    );

    /*
     * Bloqueamos el producto durante la creación
     * de la nueva versión.
     */
    const productoResult =
      await new sql.Request(
        transaction
      )
        .input(
          'producto_id',
          sql.Int,
          producto_id
        )
        .query(`
          SELECT
            producto_id
          FROM catalog.Producto
            WITH (
              UPDLOCK,
              HOLDLOCK
            )
          WHERE
            producto_id =
              @producto_id
            AND activo = 1;
        `);

    if (
      !productoResult.recordset[0]
    ) {
      throw crearErrorNegocio(
        'Producto terminado no encontrado o inactivo',
        404
      );
    }

    /*
     * Validamos que todos los materiales y colores
     * existan y estén activos.
     */
    for (
      const detalle of detalles
    ) {
      const catalogoResult =
        await new sql.Request(
          transaction
        )
          .input(
            'material_id',
            sql.Int,
            detalle.material_id
          )
          .input(
            'color_id',
            sql.Int,
            detalle.color_id
          )
          .query(`
            SELECT
              CASE WHEN EXISTS (
                SELECT 1
                FROM catalog.Material
                WHERE
                  material_id =
                    @material_id
                  AND activo = 1
              )
              THEN 1 ELSE 0 END
                AS material_valido,

              CASE WHEN EXISTS (
                SELECT 1
                FROM catalog.Color
                WHERE
                  color_id =
                    @color_id
                  AND activo = 1
              )
              THEN 1 ELSE 0 END
                AS color_valido;
          `);

      const valido =
        catalogoResult.recordset[0];

      if (!valido.material_valido) {
        throw crearErrorNegocio(
          `El material ${detalle.material_id} no existe o está inactivo`,
          400
        );
      }

      if (!valido.color_valido) {
        throw crearErrorNegocio(
          `El color ${detalle.color_id} no existe o está inactivo`,
          400
        );
      }
    }

    /*
     * Calculamos la siguiente versión bajo
     * SERIALIZABLE para evitar dos V2 concurrentes.
     */
    const versionResult =
      await new sql.Request(
        transaction
      )
        .input(
          'producto_id',
          sql.Int,
          producto_id
        )
        .query(`
          SELECT
            ISNULL(
              MAX(version_numero),
              0
            ) + 1 AS siguiente_version
          FROM catalog.ProductoComposicion
            WITH (
              UPDLOCK,
              HOLDLOCK
            )
          WHERE
            producto_id =
              @producto_id;
        `);

    const version_numero =
      versionResult.recordset[0]
        .siguiente_version;

    /*
     * Primero creamos BORRADOR porque la BD
     * solo permite activar una receta cuando
     * sus detalles ya suman 100%.
     */
    const cabeceraResult =
      await new sql.Request(
        transaction
      )
        .input(
          'producto_id',
          sql.Int,
          producto_id
        )
        .input(
          'version_numero',
          sql.Int,
          version_numero
        )
        .input(
          'observacion',
          sql.NVarChar(400),
          observacion || null
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .query(`
          INSERT INTO catalog.ProductoComposicion (
            producto_id,
            version_numero,
            vigente,
            fecha_vigencia_desde,
            fecha_vigencia_hasta,
            observacion,
            created_by_usuario_id
          )
          VALUES (
            @producto_id,
            @version_numero,
            0,
            NULL,
            NULL,
            @observacion,
            @created_by_usuario_id
          );

          /*
           * ProductoComposicion tiene triggers habilitados.
           * SQL Server no permite OUTPUT INSERTED sin INTO
           * sobre una tabla con triggers.
           *
           * SCOPE_IDENTITY() devuelve el IDENTITY creado
           * en este mismo scope y no toma identities
           * generados dentro de los triggers.
           */
          SELECT
            CONVERT(
              INT,
              SCOPE_IDENTITY()
            ) AS producto_composicion_id;
        `);

    const producto_composicion_id =
      cabeceraResult.recordset[0]
        .producto_composicion_id;

    for (
      const detalle of detalles
    ) {
      await new sql.Request(
        transaction
      )
        .input(
          'producto_composicion_id',
          sql.Int,
          producto_composicion_id
        )
        .input(
          'material_id',
          sql.Int,
          detalle.material_id
        )
        .input(
          'color_id',
          sql.Int,
          detalle.color_id
        )
        .input(
          'porcentaje',
          sql.Decimal(9, 6),
          detalle.porcentaje
        )
        .input(
          'created_by_usuario_id',
          sql.Int,
          created_by_usuario_id
        )
        .query(`
          INSERT INTO catalog.ProductoComposicionDetalle (
            producto_composicion_id,
            material_id,
            color_id,
            porcentaje,
            created_by_usuario_id
          )
          VALUES (
            @producto_composicion_id,
            @material_id,
            @color_id,
            @porcentaje,
            @created_by_usuario_id
          );
        `);
    }

    /*
     * Cerramos la versión vigente anterior,
     * si existe.
     */
    await new sql.Request(
      transaction
    )
      .input(
        'producto_id',
        sql.Int,
        producto_id
      )
      .input(
        'updated_by_usuario_id',
        sql.Int,
        created_by_usuario_id
      )
      .query(`
        UPDATE catalog.ProductoComposicion
        SET
          vigente = 0,
          fecha_vigencia_hasta =
            SYSDATETIME(),
          updated_at =
            SYSDATETIME(),
          updated_by_usuario_id =
            @updated_by_usuario_id
        WHERE
          producto_id =
            @producto_id
          AND vigente = 1;
      `);

    /*
     * Publicamos la nueva versión.
     * El trigger de BD vuelve a comprobar
     * que los porcentajes sumen exactamente 100.
     */
    await new sql.Request(
      transaction
    )
      .input(
        'producto_composicion_id',
        sql.Int,
        producto_composicion_id
      )
      .input(
        'updated_by_usuario_id',
        sql.Int,
        created_by_usuario_id
      )
      .query(`
        UPDATE catalog.ProductoComposicion
        SET
          vigente = 1,
          fecha_vigencia_desde =
            SYSDATETIME(),
          updated_at =
            SYSDATETIME(),
          updated_by_usuario_id =
            @updated_by_usuario_id
        WHERE
          producto_composicion_id =
            @producto_composicion_id;
      `);

    await transaction.commit();

    return await obtenerComposicionPorId(
      producto_composicion_id
    );

  } catch (error) {
    try {
      await transaction.rollback();
    } catch (_) {
      // Conservamos el error original.
    }

    throw error;
  }
};


const obtenerOpcionesProductosTerminados = async ({
  tipo_producto_id,
  material_id,
  medida_id,
  color_id
}) => {
  const pool =
    await getConnection();

  const tiposResult =
    await pool.request()
      .query(`
        SELECT DISTINCT
          tp.tipo_producto_id AS id,
          tp.nombre
        FROM catalog.Producto p
        INNER JOIN catalog.TipoProducto tp
          ON p.tipo_producto_id =
             tp.tipo_producto_id
        WHERE
          p.activo = 1
          AND tp.activo = 1
        ORDER BY tp.nombre;
      `);

  const materialesResult =
    await pool.request()
      .input(
        'tipo_producto_id',
        sql.Int,
        tipo_producto_id || null
      )
      .query(`
        SELECT DISTINCT
          m.material_id AS id,
          m.nombre
        FROM catalog.Producto p
        INNER JOIN catalog.Material m
          ON p.material_id =
             m.material_id
        WHERE
          p.activo = 1
          AND m.activo = 1
          AND (
            @tipo_producto_id IS NULL
            OR p.tipo_producto_id =
               @tipo_producto_id
          )
        ORDER BY m.nombre;
      `);

  const medidasResult =
    await pool.request()
      .input(
        'tipo_producto_id',
        sql.Int,
        tipo_producto_id || null
      )
      .input(
        'material_id',
        sql.Int,
        material_id || null
      )
      .query(`
        SELECT DISTINCT
          med.medida_id AS id,
          med.nombre
        FROM catalog.Producto p
        INNER JOIN catalog.Medida med
          ON p.medida_id =
             med.medida_id
        WHERE
          p.activo = 1
          AND med.activo = 1
          AND (
            @tipo_producto_id IS NULL
            OR p.tipo_producto_id =
               @tipo_producto_id
          )
          AND (
            @material_id IS NULL
            OR p.material_id =
               @material_id
          )
        ORDER BY med.nombre;
      `);

  const coloresResult =
    await pool.request()
      .input(
        'tipo_producto_id',
        sql.Int,
        tipo_producto_id || null
      )
      .input(
        'material_id',
        sql.Int,
        material_id || null
      )
      .input(
        'medida_id',
        sql.Int,
        medida_id || null
      )
      .query(`
        SELECT DISTINCT
          c.color_id AS id,
          c.nombre
        FROM catalog.Producto p
        INNER JOIN catalog.Color c
          ON p.color_id =
             c.color_id
        WHERE
          p.activo = 1
          AND c.activo = 1
          AND (
            @tipo_producto_id IS NULL
            OR p.tipo_producto_id =
               @tipo_producto_id
          )
          AND (
            @material_id IS NULL
            OR p.material_id =
               @material_id
          )
          AND (
            @medida_id IS NULL
            OR p.medida_id =
               @medida_id
          )
        ORDER BY c.nombre;
      `);

  let producto =
    null;

  if (
    tipo_producto_id &&
    material_id &&
    medida_id &&
    color_id
  ) {
    const productoResult =
      await pool.request()
        .input(
          'tipo_producto_id',
          sql.Int,
          tipo_producto_id
        )
        .input(
          'material_id',
          sql.Int,
          material_id
        )
        .input(
          'medida_id',
          sql.Int,
          medida_id
        )
        .input(
          'color_id',
          sql.Int,
          color_id
        )
        .query(`
          SELECT TOP 1
            p.producto_id
          FROM catalog.Producto p
          WHERE
            p.activo = 1
            AND p.tipo_producto_id =
                @tipo_producto_id
            AND p.material_id =
                @material_id
            AND p.medida_id =
                @medida_id
            AND p.color_id =
                @color_id;
        `);

    producto =
      productoResult.recordset[0] ||
      null;
  }

  return {
    tipos:
      tiposResult.recordset,
    materiales:
      materialesResult.recordset,
    medidas:
      medidasResult.recordset,
    colores:
      coloresResult.recordset,
    producto
  };
};


module.exports = {
  listarProductosTerminados,
  obtenerProductoTerminadoPorId,
  crearProductoTerminado,
  listarComposicionesProducto,
  crearNuevaComposicionProducto,
  obtenerOpcionesProductosTerminados
};

~~~

---

## src\modules\productosTerminados\productoTerminado.routes.js

~~~javascript
const express = require('express');

const {
  obtenerProductosTerminados,
  obtenerProductoTerminado,
  registrarProductoTerminado,
  obtenerComposiciones,
  registrarNuevaComposicion,
  obtenerOpciones
} = require('./productoTerminado.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');


const router =
  express.Router();


/*
 * Debe ir antes de /:producto_id
 * para que "opciones" no sea interpretado
 * como un ID.
 */
router.get(
  '/opciones',
  verificarToken,
  obtenerOpciones
);


router.get(
  '/',
  verificarToken,
  obtenerProductosTerminados
);


router.post(
  '/',
  verificarToken,
  registrarProductoTerminado
);


router.get(
  '/:producto_id/composiciones',
  verificarToken,
  obtenerComposiciones
);


router.post(
  '/:producto_id/composiciones',
  verificarToken,
  registrarNuevaComposicion
);


router.get(
  '/:producto_id',
  verificarToken,
  obtenerProductoTerminado
);


module.exports =
  router;

~~~

---

## src\modules\proveedores\proveedor.controller.js

~~~javascript
const {
  listarProveedores,
  obtenerProveedorPorId,
  buscarProveedorPorRuc,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} = require('./proveedor.model');

const obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await listarProveedores();

    res.json({
      mensaje: 'Proveedores obtenidos correctamente',
      proveedores
    });

  } catch (error) {
    console.error('Error listar proveedores:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar proveedores'
    });
  }
};

const obtenerProveedor = async (req, res) => {
  try {
    const { proveedor_id } = req.params;

    const proveedor = await obtenerProveedorPorId(proveedor_id);

    if (!proveedor) {
      return res.status(404).json({
        mensaje: 'Proveedor no encontrado'
      });
    }

    res.json({
      mensaje: 'Proveedor obtenido correctamente',
      proveedor
    });

  } catch (error) {
    console.error('Error obtener proveedor:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener proveedor'
    });
  }
};

const registrarProveedor = async (req, res) => {
  try {
    let {
      ruc,
      razon_social,
      direccion,
      telefono,
      correo
    } = req.body;

    if (!ruc || !razon_social) {
      return res.status(400).json({
        mensaje: 'RUC y razón social son obligatorios'
      });
    }

    ruc = ruc.trim();
    razon_social = razon_social.trim().toUpperCase();

    if (ruc.length !== 11 || /[^0-9]/.test(ruc)) {
      return res.status(400).json({
        mensaje: 'El RUC debe tener 11 dígitos numéricos'
      });
    }

    const proveedorExistente = await buscarProveedorPorRuc(ruc);

    if (proveedorExistente) {
      return res.status(409).json({
        mensaje: 'Ya existe un proveedor con ese RUC'
      });
    }

    const proveedor = await crearProveedor({
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Proveedor registrado correctamente',
      proveedor
    });

  } catch (error) {
    console.error('Error registrar proveedor:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar proveedor'
    });
  }
};

const editarProveedor = async (req, res) => {
  try {
    const { proveedor_id } = req.params;

    let {
      razon_social,
      direccion,
      telefono,
      correo
    } = req.body;

    if (!razon_social) {
      return res.status(400).json({
        mensaje: 'La razón social es obligatoria'
      });
    }

    razon_social = razon_social.trim().toUpperCase();

    const proveedor = await actualizarProveedor({
      proveedor_id,
      razon_social,
      direccion,
      telefono,
      correo,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!proveedor) {
      return res.status(404).json({
        mensaje: 'Proveedor no encontrado'
      });
    }

    res.json({
      mensaje: 'Proveedor actualizado correctamente',
      proveedor
    });

  } catch (error) {
    console.error('Error editar proveedor:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al editar proveedor'
    });
  }
};

const darBajaProveedor = async (req, res) => {
  try {
    const { proveedor_id } = req.params;

    const proveedor = await eliminarProveedor({
      proveedor_id,
      updated_by_usuario_id: req.usuario.usuario_id
    });

    if (!proveedor) {
      return res.status(404).json({
        mensaje: 'Proveedor no encontrado'
      });
    }

    res.json({
      mensaje: 'Proveedor dado de baja correctamente',
      proveedor
    });

  } catch (error) {
    console.error('Error eliminar proveedor:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al dar de baja proveedor'
    });
  }
};

module.exports = {
  obtenerProveedores,
  obtenerProveedor,
  registrarProveedor,
  editarProveedor,
  darBajaProveedor
};
~~~

---

## src\modules\proveedores\proveedor.model.js

~~~javascript
const { getConnection, sql } = require('../../config/db');

const listarProveedores = async () => {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT
      proveedor_id,
      ruc,
      razon_social,
      direccion,
      telefono,
      correo,
      activo,
      created_at
    FROM compras.Proveedor
    WHERE activo = 1
    ORDER BY created_at DESC;
  `);

  return result.recordset;
};

const obtenerProveedorPorId = async (proveedor_id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('proveedor_id', sql.Int, proveedor_id)
    .query(`
      SELECT
        proveedor_id,
        ruc,
        razon_social,
        direccion,
        telefono,
        correo,
        activo,
        created_at
      FROM compras.Proveedor
      WHERE proveedor_id = @proveedor_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const buscarProveedorPorRuc = async (ruc) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('ruc', sql.VarChar(11), ruc)
    .query(`
      SELECT proveedor_id, ruc, razon_social
      FROM compras.Proveedor
      WHERE ruc = @ruc;
    `);

  return result.recordset[0];
};

const crearProveedor = async ({
  ruc,
  razon_social,
  direccion,
  telefono,
  correo,
  created_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('ruc', sql.VarChar(11), ruc)
    .input('razon_social', sql.NVarChar(200), razon_social)
    .input('direccion', sql.NVarChar(250), direccion || null)
    .input('telefono', sql.VarChar(30), telefono || null)
    .input('correo', sql.VarChar(150), correo || null)
    .input('created_by_usuario_id', sql.Int, created_by_usuario_id)
    .query(`
      INSERT INTO compras.Proveedor (
        ruc,
        razon_social,
        direccion,
        telefono,
        correo,
        created_by_usuario_id
      )
      OUTPUT
        INSERTED.proveedor_id,
        INSERTED.ruc,
        INSERTED.razon_social,
        INSERTED.direccion,
        INSERTED.telefono,
        INSERTED.correo,
        INSERTED.created_at
      VALUES (
        @ruc,
        @razon_social,
        @direccion,
        @telefono,
        @correo,
        @created_by_usuario_id
      );
    `);

  return result.recordset[0];
};

const actualizarProveedor = async ({
  proveedor_id,
  razon_social,
  direccion,
  telefono,
  correo,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('proveedor_id', sql.Int, proveedor_id)
    .input('razon_social', sql.NVarChar(200), razon_social)
    .input('direccion', sql.NVarChar(250), direccion || null)
    .input('telefono', sql.VarChar(30), telefono || null)
    .input('correo', sql.VarChar(150), correo || null)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE compras.Proveedor
      SET
        razon_social = @razon_social,
        direccion = @direccion,
        telefono = @telefono,
        correo = @correo,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.proveedor_id,
        INSERTED.ruc,
        INSERTED.razon_social,
        INSERTED.direccion,
        INSERTED.telefono,
        INSERTED.correo,
        INSERTED.updated_at
      WHERE proveedor_id = @proveedor_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

const eliminarProveedor = async ({
  proveedor_id,
  updated_by_usuario_id
}) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('proveedor_id', sql.Int, proveedor_id)
    .input('updated_by_usuario_id', sql.Int, updated_by_usuario_id)
    .query(`
      UPDATE compras.Proveedor
      SET
        activo = 0,
        updated_at = SYSDATETIME(),
        updated_by_usuario_id = @updated_by_usuario_id
      OUTPUT
        INSERTED.proveedor_id,
        INSERTED.ruc,
        INSERTED.razon_social,
        INSERTED.activo
      WHERE proveedor_id = @proveedor_id
        AND activo = 1;
    `);

  return result.recordset[0];
};

module.exports = {
  listarProveedores,
  obtenerProveedorPorId,
  buscarProveedorPorRuc,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
};
~~~

---

## src\modules\proveedores\proveedor.routes.js

~~~javascript
const express = require('express');

const {
  obtenerProveedores,
  obtenerProveedor,
  registrarProveedor,
  editarProveedor,
  darBajaProveedor
} = require('./proveedor.controller');

const {
  verificarToken
} = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  obtenerProveedores
);

router.get(
  '/:proveedor_id',
  verificarToken,
  obtenerProveedor
);

router.post(
  '/',
  verificarToken,
  registrarProveedor
);

router.put(
  '/:proveedor_id',
  verificarToken,
  editarProveedor
);

router.delete(
  '/:proveedor_id',
  verificarToken,
  darBajaProveedor
);

module.exports = router;
~~~

---

## src\server.js

~~~javascript
const app = require('./app');
const { getConnection } = require('./config/db');

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await getConnection();

    app.listen(PORT, () => {
      console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
};

iniciarServidor();
~~~

---

## src\utils\generarToken.js

~~~javascript
const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign(
    {
      usuario_id: usuario.usuario_id,
      correo: usuario.correo,
      roles: usuario.roles
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h'
    }
  );
};

module.exports = generarToken;
~~~

