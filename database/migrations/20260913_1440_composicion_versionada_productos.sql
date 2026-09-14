/* ============================================================
   GestionDriza
   Migracion: Composicion versionada de productos terminados
   Fecha: 2026-09-13

   Objetivos:
   1. Registrar recetas/composiciones por producto terminado.
   2. Permitir varias materias primas (Material + Color).
   3. Mantener historial de versiones.
   4. Permitir una sola composicion vigente por producto.
   5. Impedir cambios sobre composiciones que ya fueron publicadas.
   6. Validar que una composicion solo pueda activarse si suma 100%.

   MODELO DE VERSIONADO:
   - BORRADOR:
       vigente = 0
       fecha_vigencia_desde = NULL
       fecha_vigencia_hasta = NULL

   - VIGENTE:
       vigente = 1
       fecha_vigencia_desde <> NULL
       fecha_vigencia_hasta = NULL

   - HISTORICA:
       vigente = 0
       fecha_vigencia_desde <> NULL
       fecha_vigencia_hasta <> NULL

   IMPORTANTE:
   - La presentacion NO forma parte de la composicion.
   - La composicion pertenece al producto:
       Tipo + Medida + Color + Material
   - Los ingredientes se definen como:
       Material + Color + porcentaje
   - Una composicion publicada queda inmutable.
   - Para cambiar una receta se crea una VERSION NUEVA.
   ============================================================ */

SET XACT_ABORT ON;
GO


/* ============================================================
   1. VALIDAR DEPENDENCIAS
   ============================================================ */

IF OBJECT_ID('catalog.Producto', 'U') IS NULL
    THROW 50201, 'No existe catalog.Producto. Se cancela la migracion.', 1;

IF OBJECT_ID('catalog.Material', 'U') IS NULL
    THROW 50202, 'No existe catalog.Material. Se cancela la migracion.', 1;

IF OBJECT_ID('catalog.Color', 'U') IS NULL
    THROW 50203, 'No existe catalog.Color. Se cancela la migracion.', 1;

IF OBJECT_ID('auth.Usuario', 'U') IS NULL
    THROW 50204, 'No existe auth.Usuario. Se cancela la migracion.', 1;
GO


/* ============================================================
   2. CABECERA DE COMPOSICION

   Cada producto puede tener multiples versiones.
   Solo una version puede estar vigente al mismo tiempo.
   ============================================================ */

IF OBJECT_ID('catalog.ProductoComposicion', 'U') IS NULL
BEGIN
    CREATE TABLE catalog.ProductoComposicion (
        producto_composicion_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_ProductoComposicion PRIMARY KEY,

        producto_id INT NOT NULL,

        version_numero INT NOT NULL,

        vigente BIT NOT NULL
            CONSTRAINT DF_ProductoComposicion_Vigente
            DEFAULT (0),

        fecha_vigencia_desde DATETIME2(7) NULL,

        fecha_vigencia_hasta DATETIME2(7) NULL,

        observacion NVARCHAR(400) NULL,

        created_at DATETIME2(7) NOT NULL
            CONSTRAINT DF_ProductoComposicion_CreatedAt
            DEFAULT SYSDATETIME(),

        created_by_usuario_id INT NOT NULL,

        updated_at DATETIME2(7) NULL,

        updated_by_usuario_id INT NULL,

        CONSTRAINT UQ_ProductoComposicion_Producto_Version
            UNIQUE (
                producto_id,
                version_numero
            ),

        CONSTRAINT CK_ProductoComposicion_Version
            CHECK (version_numero > 0),

        /*
         * Estados validos de una version:
         *
         * BORRADOR:
         *   vigente = 0, sin fechas
         *
         * VIGENTE:
         *   vigente = 1, con fecha de inicio y sin fecha de fin
         *
         * HISTORICA:
         *   vigente = 0, con fecha de inicio y fecha de fin
         */
        CONSTRAINT CK_ProductoComposicion_EstadoVersion
            CHECK (
                (
                    vigente = 0
                    AND fecha_vigencia_desde IS NULL
                    AND fecha_vigencia_hasta IS NULL
                )
                OR
                (
                    vigente = 1
                    AND fecha_vigencia_desde IS NOT NULL
                    AND fecha_vigencia_hasta IS NULL
                )
                OR
                (
                    vigente = 0
                    AND fecha_vigencia_desde IS NOT NULL
                    AND fecha_vigencia_hasta IS NOT NULL
                    AND fecha_vigencia_hasta >= fecha_vigencia_desde
                )
            ),

        CONSTRAINT FK_ProductoComposicion_Producto
            FOREIGN KEY (producto_id)
            REFERENCES catalog.Producto(producto_id),

        CONSTRAINT FK_ProductoComposicion_CreatedBy
            FOREIGN KEY (created_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id),

        CONSTRAINT FK_ProductoComposicion_UpdatedBy
            FOREIGN KEY (updated_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id)
    );
END;
GO


/* ============================================================
   3. SOLO UNA COMPOSICION VIGENTE POR PRODUCTO
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('catalog.ProductoComposicion')
      AND name = 'UX_ProductoComposicion_Producto_Vigente'
)
BEGIN
    CREATE UNIQUE INDEX UX_ProductoComposicion_Producto_Vigente
        ON catalog.ProductoComposicion (producto_id)
        WHERE vigente = 1;
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('catalog.ProductoComposicion')
      AND name = 'IX_ProductoComposicion_Producto_Version'
)
BEGIN
    CREATE INDEX IX_ProductoComposicion_Producto_Version
        ON catalog.ProductoComposicion (
            producto_id,
            version_numero DESC
        );
END;
GO


/* ============================================================
   4. DETALLE DE COMPOSICION

   Cada fila representa una materia prima:

       Material + Color + porcentaje

   Ejemplo:
       POLIPROPILENO + BLANCO = 70%
       POLIPROPILENO + ROJO   = 30%
   ============================================================ */

IF OBJECT_ID('catalog.ProductoComposicionDetalle', 'U') IS NULL
BEGIN
    CREATE TABLE catalog.ProductoComposicionDetalle (
        producto_composicion_detalle_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_ProductoComposicionDetalle PRIMARY KEY,

        producto_composicion_id INT NOT NULL,

        material_id INT NOT NULL,

        color_id INT NOT NULL,

        porcentaje DECIMAL(9,6) NOT NULL,

        created_at DATETIME2(7) NOT NULL
            CONSTRAINT DF_ProductoComposicionDetalle_CreatedAt
            DEFAULT SYSDATETIME(),

        created_by_usuario_id INT NOT NULL,

        CONSTRAINT UQ_ProductoComposicionDetalle_Ingrediente
            UNIQUE (
                producto_composicion_id,
                material_id,
                color_id
            ),

        CONSTRAINT CK_ProductoComposicionDetalle_Porcentaje
            CHECK (
                porcentaje > 0
                AND porcentaje <= 100
            ),

        CONSTRAINT FK_ProductoComposicionDetalle_Composicion
            FOREIGN KEY (producto_composicion_id)
            REFERENCES catalog.ProductoComposicion(
                producto_composicion_id
            ),

        CONSTRAINT FK_ProductoComposicionDetalle_Material
            FOREIGN KEY (material_id)
            REFERENCES catalog.Material(material_id),

        CONSTRAINT FK_ProductoComposicionDetalle_Color
            FOREIGN KEY (color_id)
            REFERENCES catalog.Color(color_id),

        CONSTRAINT FK_ProductoComposicionDetalle_CreatedBy
            FOREIGN KEY (created_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id)
    );
END;
GO


/* ============================================================
   5. INDICES DE DETALLE
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('catalog.ProductoComposicionDetalle')
      AND name = 'IX_ProductoComposicionDetalle_Composicion'
)
BEGIN
    CREATE INDEX IX_ProductoComposicionDetalle_Composicion
        ON catalog.ProductoComposicionDetalle (
            producto_composicion_id
        );
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('catalog.ProductoComposicionDetalle')
      AND name = 'IX_ProductoComposicionDetalle_Material_Color'
)
BEGIN
    CREATE INDEX IX_ProductoComposicionDetalle_Material_Color
        ON catalog.ProductoComposicionDetalle (
            material_id,
            color_id
        );
END;
GO


/* ============================================================
   6. VALIDAR 100% AL ACTIVAR UNA COMPOSICION

   Flujo esperado:
   1. Crear composicion como vigente = 0.
   2. Insertar todos sus detalles.
   3. Activarla dentro de una transaccion:
         vigente = 1
         fecha_vigencia_desde = SYSDATETIME()

   En ese momento la BD comprueba que la suma sea exactamente 100%.
   ============================================================ */

CREATE OR ALTER TRIGGER catalog.trg_ProductoComposicion_ValidarActivacion
ON catalog.ProductoComposicion
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM inserted i
        OUTER APPLY (
            SELECT
                SUM(pcd.porcentaje) AS total_porcentaje
            FROM catalog.ProductoComposicionDetalle pcd
            WHERE pcd.producto_composicion_id =
                  i.producto_composicion_id
        ) suma
        WHERE i.vigente = 1
          AND (
              suma.total_porcentaje IS NULL
              OR suma.total_porcentaje <> CONVERT(DECIMAL(9,6), 100)
          )
    )
    BEGIN
        THROW 50220,
            'No se puede activar la composicion: los porcentajes deben sumar exactamente 100%.',
            1;
    END;
END;
GO


/* ============================================================
   7. PROTEGER DETALLES DE COMPOSICIONES PUBLICADAS

   Una composicion se considera publicada desde el momento en que
   fecha_vigencia_desde deja de ser NULL.

   Esto protege tanto:
   - la version actualmente vigente
   - las versiones historicas

   Para cambiar una receta debe crearse una version nueva.
   ============================================================ */

CREATE OR ALTER TRIGGER catalog.trg_ProductoComposicionDetalle_ProtegerHistorial
ON catalog.ProductoComposicionDetalle
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM inserted i
        INNER JOIN catalog.ProductoComposicion pc
            ON pc.producto_composicion_id =
               i.producto_composicion_id
        WHERE pc.fecha_vigencia_desde IS NOT NULL
    )
    OR EXISTS (
        SELECT 1
        FROM deleted d
        INNER JOIN catalog.ProductoComposicion pc
            ON pc.producto_composicion_id =
               d.producto_composicion_id
        WHERE pc.fecha_vigencia_desde IS NOT NULL
    )
    BEGIN
        THROW 50221,
            'Una composicion publicada no puede modificarse. Cree una nueva version.',
            1;
    END;
END;
GO


/* ============================================================
   8. PROTEGER IDENTIDAD DE VERSION PUBLICADA

   Una vez publicada una version no se permite cambiar:
   - producto
   - numero de version
   - fecha de inicio

   Si deja de ser vigente, solamente se permite cerrar su periodo
   mediante vigente = 0 y fecha_vigencia_hasta.

   Tambien se impide eliminar una version publicada.
   ============================================================ */

CREATE OR ALTER TRIGGER catalog.trg_ProductoComposicion_ProtegerHistorial
ON catalog.ProductoComposicion
AFTER UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    /*
     * DELETE de una version ya publicada.
     */
    IF EXISTS (
        SELECT 1
        FROM deleted d
        LEFT JOIN inserted i
            ON i.producto_composicion_id =
               d.producto_composicion_id
        WHERE i.producto_composicion_id IS NULL
          AND d.fecha_vigencia_desde IS NOT NULL
    )
    BEGIN
        THROW 50222,
            'Una composicion publicada no puede eliminarse.',
            1;
    END;

    /*
     * Alteracion de identidad o fecha de inicio de una version
     * que ya habia sido publicada.
     */
    IF EXISTS (
        SELECT 1
        FROM deleted d
        INNER JOIN inserted i
            ON i.producto_composicion_id =
               d.producto_composicion_id
        WHERE d.fecha_vigencia_desde IS NOT NULL
          AND (
              i.producto_id <> d.producto_id
              OR i.version_numero <> d.version_numero
              OR ISNULL(i.fecha_vigencia_desde, '19000101')
                 <> ISNULL(d.fecha_vigencia_desde, '19000101')
          )
    )
    BEGIN
        THROW 50223,
            'No se puede cambiar la identidad de una composicion publicada.',
            1;
    END;

    /*
     * Una version historica no puede volver a activarse.
     */
    IF EXISTS (
        SELECT 1
        FROM deleted d
        INNER JOIN inserted i
            ON i.producto_composicion_id =
               d.producto_composicion_id
        WHERE d.fecha_vigencia_desde IS NOT NULL
          AND d.fecha_vigencia_hasta IS NOT NULL
          AND i.vigente = 1
    )
    BEGIN
        THROW 50224,
            'Una composicion historica no puede volver a ser vigente. Cree una nueva version.',
            1;
    END;
END;
GO


/* ============================================================
   9. VALIDACION FINAL
   ============================================================ */

IF OBJECT_ID('catalog.ProductoComposicion', 'U') IS NULL
    THROW 50230, 'No se pudo crear catalog.ProductoComposicion.', 1;

IF OBJECT_ID('catalog.ProductoComposicionDetalle', 'U') IS NULL
    THROW 50231, 'No se pudo crear catalog.ProductoComposicionDetalle.', 1;

IF OBJECT_ID(
    'catalog.trg_ProductoComposicion_ValidarActivacion',
    'TR'
) IS NULL
    THROW 50232, 'No se pudo crear el trigger de validacion de composicion.', 1;

IF OBJECT_ID(
    'catalog.trg_ProductoComposicionDetalle_ProtegerHistorial',
    'TR'
) IS NULL
    THROW 50233, 'No se pudo crear el trigger de proteccion de detalle.', 1;
GO
