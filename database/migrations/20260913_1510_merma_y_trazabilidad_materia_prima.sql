/* ============================================================
   GestionDriza
   Migracion: Merma y trazabilidad de materia prima
   Fecha: 2026-09-13

   Objetivos:
   1. Crear cabecera y detalle de merma.
   2. Registrar merma por Material + Color.
   3. Vincular cada salida FIFO de materia prima con la merma
      que la origino.
   4. Mantener trazabilidad por lote sin obligar al usuario a
      seleccionar manualmente un lote.
   5. Proteger historiales una vez que la merma genero movimientos.

   IMPORTANTE:
   - Esta migracion crea ESTRUCTURA.
   - NO implementa todavia el algoritmo FIFO.
   - El backend futuro buscara automaticamente los lotes mas
     antiguos con cantidad_disponible > 0.
   - Una MermaDetalle puede consumir varios lotes y por tanto
     generar varios MovimientoMateriaPrima.
   - Nunca se permitira stock negativo; StockMateriaPrimaLote
     ya posee su CHECK correspondiente.
   ============================================================ */

SET XACT_ABORT ON;
GO


/* ============================================================
   1. VALIDAR DEPENDENCIAS
   ============================================================ */

IF OBJECT_ID('catalog.Material', 'U') IS NULL
    THROW 50401, 'No existe catalog.Material. Se cancela la migracion.', 1;

IF OBJECT_ID('catalog.Color', 'U') IS NULL
    THROW 50402, 'No existe catalog.Color. Se cancela la migracion.', 1;

IF OBJECT_ID('catalog.UnidadMedida', 'U') IS NULL
    THROW 50403, 'No existe catalog.UnidadMedida. Se cancela la migracion.', 1;

IF OBJECT_ID('auth.Usuario', 'U') IS NULL
    THROW 50404, 'No existe auth.Usuario. Se cancela la migracion.', 1;

IF OBJECT_ID('inventario.StockMateriaPrimaLote', 'U') IS NULL
    THROW 50405, 'No existe inventario.StockMateriaPrimaLote. Se cancela la migracion.', 1;

IF OBJECT_ID('inventario.MovimientoMateriaPrima', 'U') IS NULL
    THROW 50406, 'No existe inventario.MovimientoMateriaPrima. Se cancela la migracion.', 1;
GO


/* ============================================================
   2. CABECERA DE MERMA

   Una cabecera puede agrupar una o varias mermas registradas
   en una misma fecha.

   Ejemplo:
       Merma fin de mes - Septiembre
         - PP Blanco 12 KG
         - PP Rojo    4 KG
   ============================================================ */

IF OBJECT_ID('inventario.Merma', 'U') IS NULL
BEGIN
    CREATE TABLE inventario.Merma (
        merma_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_Merma PRIMARY KEY,

        fecha_merma DATE NOT NULL,

        observacion NVARCHAR(500) NULL,

        created_at DATETIME2(7) NOT NULL
            CONSTRAINT DF_Merma_CreatedAt
            DEFAULT SYSDATETIME(),

        created_by_usuario_id INT NOT NULL,

        CONSTRAINT FK_Merma_CreatedBy
            FOREIGN KEY (created_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id)
    );
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('inventario.Merma')
      AND name = 'IX_Merma_Fecha'
)
BEGIN
    CREATE INDEX IX_Merma_Fecha
        ON inventario.Merma (
            fecha_merma DESC,
            merma_id DESC
        );
END;
GO


/* ============================================================
   3. DETALLE DE MERMA

   El usuario NO selecciona lote.

   Solamente indica:
       Material + Color + Cantidad + Unidad

   El FIFO futuro determinara uno o varios lotes concretos.
   ============================================================ */

IF OBJECT_ID('inventario.MermaDetalle', 'U') IS NULL
BEGIN
    CREATE TABLE inventario.MermaDetalle (
        merma_detalle_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_MermaDetalle PRIMARY KEY,

        merma_id INT NOT NULL,

        material_id INT NOT NULL,

        color_id INT NOT NULL,

        cantidad DECIMAL(18,3) NOT NULL,

        unidad_medida_id INT NOT NULL,

        observacion NVARCHAR(300) NULL,

        created_at DATETIME2(7) NOT NULL
            CONSTRAINT DF_MermaDetalle_CreatedAt
            DEFAULT SYSDATETIME(),

        created_by_usuario_id INT NOT NULL,

        CONSTRAINT CK_MermaDetalle_Cantidad
            CHECK (cantidad > 0),

        /*
         * Evitamos repetir exactamente la misma materia prima
         * dentro de una misma cabecera de merma.
         */
        CONSTRAINT UQ_MermaDetalle_MateriaPrima
            UNIQUE (
                merma_id,
                material_id,
                color_id,
                unidad_medida_id
            ),

        CONSTRAINT FK_MermaDetalle_Merma
            FOREIGN KEY (merma_id)
            REFERENCES inventario.Merma(merma_id),

        CONSTRAINT FK_MermaDetalle_Material
            FOREIGN KEY (material_id)
            REFERENCES catalog.Material(material_id),

        CONSTRAINT FK_MermaDetalle_Color
            FOREIGN KEY (color_id)
            REFERENCES catalog.Color(color_id),

        CONSTRAINT FK_MermaDetalle_Unidad
            FOREIGN KEY (unidad_medida_id)
            REFERENCES catalog.UnidadMedida(unidad_medida_id),

        CONSTRAINT FK_MermaDetalle_CreatedBy
            FOREIGN KEY (created_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id)
    );
END;
GO


/* ============================================================
   4. INDICES DE MERMA
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('inventario.MermaDetalle')
      AND name = 'IX_MermaDetalle_Merma'
)
BEGIN
    CREATE INDEX IX_MermaDetalle_Merma
        ON inventario.MermaDetalle (
            merma_id,
            merma_detalle_id
        );
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('inventario.MermaDetalle')
      AND name = 'IX_MermaDetalle_Material_Color'
)
BEGIN
    CREATE INDEX IX_MermaDetalle_Material_Color
        ON inventario.MermaDetalle (
            material_id,
            color_id,
            unidad_medida_id
        );
END;
GO


/* ============================================================
   5. VINCULAR MOVIMIENTO DE MATERIA PRIMA CON MERMA

   Ejemplo:

       MermaDetalle #7 = 20 KG PP Blanco

       FIFO:
         Movimiento #100 -> Lote A -> SALIDA_MERMA 12 KG
         Movimiento #101 -> Lote B -> SALIDA_MERMA  8 KG

   Ambos movimientos apuntan a merma_detalle_id = 7.
   ============================================================ */

IF COL_LENGTH(
    'inventario.MovimientoMateriaPrima',
    'merma_detalle_id'
) IS NULL
BEGIN
    ALTER TABLE inventario.MovimientoMateriaPrima
        ADD merma_detalle_id INT NULL;
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.foreign_keys
    WHERE parent_object_id =
          OBJECT_ID('inventario.MovimientoMateriaPrima')
      AND name =
          'FK_MovimientoMateriaPrima_MermaDetalle'
)
BEGIN
    ALTER TABLE inventario.MovimientoMateriaPrima
        ADD CONSTRAINT FK_MovimientoMateriaPrima_MermaDetalle
        FOREIGN KEY (merma_detalle_id)
        REFERENCES inventario.MermaDetalle(
            merma_detalle_id
        );
END;
GO


/* ============================================================
   6. VALIDAR ORIGEN DE SALIDA POR MERMA

   - SALIDA_MERMA:
       merma_detalle_id obligatorio.

   - Cualquier otro movimiento:
       merma_detalle_id debe ser NULL.

   En conjunto con la restriccion de produccion ya existente,
   esto garantiza:

       SALIDA_PRODUCCION -> solo ProduccionDetalle
       SALIDA_MERMA      -> solo MermaDetalle
   ============================================================ */

IF EXISTS (
    SELECT 1
    FROM inventario.MovimientoMateriaPrima
    WHERE (
        tipo_movimiento = 'SALIDA_MERMA'
        AND merma_detalle_id IS NULL
    )
    OR (
        tipo_movimiento <> 'SALIDA_MERMA'
        AND merma_detalle_id IS NOT NULL
    )
)
BEGIN
    THROW 50420,
        'Existen movimientos de materia prima incompatibles con la nueva relacion de merma.',
        1;
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.check_constraints
    WHERE parent_object_id =
          OBJECT_ID('inventario.MovimientoMateriaPrima')
      AND name =
          'CK_MovimientoMateriaPrima_OrigenMerma'
)
BEGIN
    ALTER TABLE inventario.MovimientoMateriaPrima
        ADD CONSTRAINT CK_MovimientoMateriaPrima_OrigenMerma
        CHECK (
            (
                tipo_movimiento = 'SALIDA_MERMA'
                AND merma_detalle_id IS NOT NULL
            )
            OR
            (
                tipo_movimiento <> 'SALIDA_MERMA'
                AND merma_detalle_id IS NULL
            )
        );
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id =
          OBJECT_ID('inventario.MovimientoMateriaPrima')
      AND name =
          'IX_MovimientoMateriaPrima_Merma'
)
BEGIN
    CREATE INDEX IX_MovimientoMateriaPrima_Merma
        ON inventario.MovimientoMateriaPrima (
            merma_detalle_id
        )
        WHERE merma_detalle_id IS NOT NULL;
END;
GO


/* ============================================================
   7. PROTEGER DETALLE DE MERMA UNA VEZ CONSUMIDO STOCK

   Una vez que un detalle genero movimientos de inventario,
   cambiar la cantidad/material/color/unidad romperia la
   trazabilidad.

   Por eso debe registrarse una correccion mediante una operacion
   futura de ajuste/reversion y NO editando el historial original.
   ============================================================ */

CREATE OR ALTER TRIGGER inventario.trg_MermaDetalle_ProtegerMovimientos
ON inventario.MermaDetalle
AFTER UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM deleted d
        INNER JOIN inventario.MovimientoMateriaPrima mmp
            ON mmp.merma_detalle_id =
               d.merma_detalle_id
    )
    BEGIN
        THROW 50421,
            'No se puede modificar o eliminar una merma que ya genero movimientos de inventario.',
            1;
    END;
END;
GO


/* ============================================================
   8. PROTEGER CABECERA DE MERMA CON MOVIMIENTOS

   Una cabecera que ya genero salida de inventario no debe
   eliminarse ni cambiar su fecha, porque forma parte del
   historial del almacen.

   Se permite cambiar solamente la observacion.
   ============================================================ */

CREATE OR ALTER TRIGGER inventario.trg_Merma_ProtegerHistorial
ON inventario.Merma
AFTER UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    /*
     * DELETE de una merma que posee movimientos.
     */
    IF EXISTS (
        SELECT 1
        FROM deleted d
        LEFT JOIN inserted i
            ON i.merma_id = d.merma_id
        INNER JOIN inventario.MermaDetalle md
            ON md.merma_id = d.merma_id
        INNER JOIN inventario.MovimientoMateriaPrima mmp
            ON mmp.merma_detalle_id = md.merma_detalle_id
        WHERE i.merma_id IS NULL
    )
    BEGIN
        THROW 50422,
            'No se puede eliminar una merma que ya genero movimientos de inventario.',
            1;
    END;

    /*
     * Una vez que existen movimientos, no se cambia la fecha.
     * La observacion si puede corregirse.
     */
    IF EXISTS (
        SELECT 1
        FROM deleted d
        INNER JOIN inserted i
            ON i.merma_id = d.merma_id
        INNER JOIN inventario.MermaDetalle md
            ON md.merma_id = d.merma_id
        INNER JOIN inventario.MovimientoMateriaPrima mmp
            ON mmp.merma_detalle_id = md.merma_detalle_id
        WHERE i.fecha_merma <> d.fecha_merma
    )
    BEGIN
        THROW 50423,
            'No se puede cambiar la fecha de una merma que ya genero movimientos de inventario.',
            1;
    END;
END;
GO


/* ============================================================
   9. VALIDACION FINAL
   ============================================================ */

IF OBJECT_ID('inventario.Merma', 'U') IS NULL
    THROW 50430, 'No se pudo crear inventario.Merma.', 1;

IF OBJECT_ID('inventario.MermaDetalle', 'U') IS NULL
    THROW 50431, 'No se pudo crear inventario.MermaDetalle.', 1;

IF COL_LENGTH(
    'inventario.MovimientoMateriaPrima',
    'merma_detalle_id'
) IS NULL
    THROW 50432, 'No se pudo vincular MovimientoMateriaPrima con MermaDetalle.', 1;

IF OBJECT_ID(
    'inventario.trg_MermaDetalle_ProtegerMovimientos',
    'TR'
) IS NULL
    THROW 50433, 'No se pudo crear el trigger de proteccion de MermaDetalle.', 1;

IF OBJECT_ID(
    'inventario.trg_Merma_ProtegerHistorial',
    'TR'
) IS NULL
    THROW 50434, 'No se pudo crear el trigger de proteccion de Merma.', 1;
GO
