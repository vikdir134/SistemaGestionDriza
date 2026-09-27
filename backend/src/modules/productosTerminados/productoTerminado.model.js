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
