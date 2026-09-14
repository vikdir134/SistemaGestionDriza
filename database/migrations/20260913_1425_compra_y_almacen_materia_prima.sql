/* ============================================================
   GestionDriza
   Migracion: Compra y almacen de materia prima por lotes
   Fecha: 2026-09-13

   Objetivos:
   1. Crear el esquema inventario.
   2. Crear compras de materia prima separadas de compras generales.
   3. Registrar detalle de materia prima por Material + Color.
   4. Preparar stock por lote.
   5. Preparar historial de movimientos de materia prima.

   IMPORTANTE:
   - NO modifica compras.Compra ni compras.CompraDetalle.
   - NO implementa todavia FIFO.
   - NO implementa todavia produccion ni merma.
   - El stock se actualizara desde operaciones transaccionales del backend.
   - Nunca se permitira stock negativo.
   ============================================================ */

SET XACT_ABORT ON;
GO

/* ============================================================
   1. VALIDAR DEPENDENCIAS ACTUALES
   ============================================================ */

IF OBJECT_ID('compras.Proveedor', 'U') IS NULL
    THROW 50101, 'No existe compras.Proveedor. Se cancela la migracion.', 1;

IF OBJECT_ID('catalog.Material', 'U') IS NULL
    THROW 50102, 'No existe catalog.Material. Se cancela la migracion.', 1;

IF OBJECT_ID('catalog.Color', 'U') IS NULL
    THROW 50103, 'No existe catalog.Color. Se cancela la migracion.', 1;

IF OBJECT_ID('catalog.UnidadMedida', 'U') IS NULL
    THROW 50104, 'No existe catalog.UnidadMedida. Se cancela la migracion.', 1;

IF OBJECT_ID('finance.Moneda', 'U') IS NULL
    THROW 50105, 'No existe finance.Moneda. Se cancela la migracion.', 1;

IF OBJECT_ID('auth.Usuario', 'U') IS NULL
    THROW 50106, 'No existe auth.Usuario. Se cancela la migracion.', 1;
GO

/* ============================================================
   2. CREAR ESQUEMA DE INVENTARIO
   ============================================================ */

IF SCHEMA_ID('inventario') IS NULL
BEGIN
    EXEC('CREATE SCHEMA inventario');
END;
GO

/* ============================================================
   3. CABECERA DE COMPRA DE MATERIA PRIMA

   Cada registro representa un lote comprado/importado.
   ============================================================ */

IF OBJECT_ID('compras.CompraMateriaPrima', 'U') IS NULL
BEGIN
    CREATE TABLE compras.CompraMateriaPrima (
        compra_materia_prima_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_CompraMateriaPrima PRIMARY KEY,

        nombre_lote NVARCHAR(150) NOT NULL,

        proveedor_id INT NOT NULL,

        fecha_compra DATE NOT NULL,

        numero_documento VARCHAR(100) NULL,

        monto_total DECIMAL(18,2) NOT NULL,

        moneda_codigo CHAR(3) NOT NULL,

        descripcion NVARCHAR(400) NULL,

        created_at DATETIME2(7) NOT NULL
            CONSTRAINT DF_CompraMateriaPrima_CreatedAt
            DEFAULT SYSDATETIME(),

        created_by_usuario_id INT NOT NULL,

        CONSTRAINT CK_CompraMateriaPrima_MontoTotal
            CHECK (monto_total > 0),

        CONSTRAINT CK_CompraMateriaPrima_NombreLote
            CHECK (LEN(LTRIM(RTRIM(nombre_lote))) > 0),

        CONSTRAINT FK_CompraMateriaPrima_Proveedor
            FOREIGN KEY (proveedor_id)
            REFERENCES compras.Proveedor(proveedor_id),

        CONSTRAINT FK_CompraMateriaPrima_Moneda
            FOREIGN KEY (moneda_codigo)
            REFERENCES finance.Moneda(moneda_codigo),

        CONSTRAINT FK_CompraMateriaPrima_CreatedBy
            FOREIGN KEY (created_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id)
    );
END;
GO

/* ============================================================
   4. INDICES DE CABECERA

   No hacemos nombre_lote UNIQUE por ahora: el nombre es un dato
   de negocio y una futura regla podra decidir si debe ser unico
   globalmente o por proveedor.
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('compras.CompraMateriaPrima')
      AND name = 'IX_CompraMateriaPrima_FechaCompra'
)
BEGIN
    CREATE INDEX IX_CompraMateriaPrima_FechaCompra
        ON compras.CompraMateriaPrima (
            fecha_compra,
            compra_materia_prima_id
        );
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('compras.CompraMateriaPrima')
      AND name = 'IX_CompraMateriaPrima_Proveedor'
)
BEGIN
    CREATE INDEX IX_CompraMateriaPrima_Proveedor
        ON compras.CompraMateriaPrima (proveedor_id);
END;
GO

/* ============================================================
   5. DETALLE DE COMPRA DE MATERIA PRIMA

   La identidad de la materia prima para inventario es:

       Material + Color

   La cantidad y unidad corresponden a la compra concreta.
   ============================================================ */

IF OBJECT_ID('compras.CompraMateriaPrimaDetalle', 'U') IS NULL
BEGIN
    CREATE TABLE compras.CompraMateriaPrimaDetalle (
        compra_materia_prima_detalle_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_CompraMateriaPrimaDetalle PRIMARY KEY,

        compra_materia_prima_id INT NOT NULL,

        material_id INT NOT NULL,

        color_id INT NOT NULL,

        descripcion_item NVARCHAR(300) NULL,

        cantidad DECIMAL(18,3) NOT NULL,

        unidad_medida_id INT NOT NULL,

        precio_unitario DECIMAL(18,4) NOT NULL,

        subtotal AS (
            CONVERT(DECIMAL(38,7), cantidad * precio_unitario)
        ) PERSISTED,

        CONSTRAINT CK_CompraMateriaPrimaDetalle_Cantidad
            CHECK (cantidad > 0),

        CONSTRAINT CK_CompraMateriaPrimaDetalle_Precio
            CHECK (precio_unitario >= 0),

        CONSTRAINT FK_CompraMateriaPrimaDetalle_Compra
            FOREIGN KEY (compra_materia_prima_id)
            REFERENCES compras.CompraMateriaPrima(compra_materia_prima_id),

        CONSTRAINT FK_CompraMateriaPrimaDetalle_Material
            FOREIGN KEY (material_id)
            REFERENCES catalog.Material(material_id),

        CONSTRAINT FK_CompraMateriaPrimaDetalle_Color
            FOREIGN KEY (color_id)
            REFERENCES catalog.Color(color_id),

        CONSTRAINT FK_CompraMateriaPrimaDetalle_Unidad
            FOREIGN KEY (unidad_medida_id)
            REFERENCES catalog.UnidadMedida(unidad_medida_id)
    );
END;
GO

/* ============================================================
   6. INDICES PARA BUSQUEDA Y FUTURO FIFO
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('compras.CompraMateriaPrimaDetalle')
      AND name = 'IX_CompraMPDetalle_Material_Color'
)
BEGIN
    CREATE INDEX IX_CompraMPDetalle_Material_Color
        ON compras.CompraMateriaPrimaDetalle (
            material_id,
            color_id,
            compra_materia_prima_id
        );
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('compras.CompraMateriaPrimaDetalle')
      AND name = 'IX_CompraMPDetalle_Compra'
)
BEGIN
    CREATE INDEX IX_CompraMPDetalle_Compra
        ON compras.CompraMateriaPrimaDetalle (compra_materia_prima_id);
END;
GO

/* ============================================================
   7. STOCK DE MATERIA PRIMA POR LOTE

   Existe exactamente un saldo de almacen por cada detalle de
   compra de materia prima.

   cantidad_inicial:
       Cantidad que ingreso originalmente al almacen.

   cantidad_disponible:
       Saldo actual del lote.

   Un CHECK impide que cualquier operacion deje stock negativo.
   ============================================================ */

IF OBJECT_ID('inventario.StockMateriaPrimaLote', 'U') IS NULL
BEGIN
    CREATE TABLE inventario.StockMateriaPrimaLote (
        stock_materia_prima_lote_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_StockMateriaPrimaLote PRIMARY KEY,

        compra_materia_prima_detalle_id INT NOT NULL,

        cantidad_inicial DECIMAL(18,3) NOT NULL,

        cantidad_disponible DECIMAL(18,3) NOT NULL,

        created_at DATETIME2(7) NOT NULL
            CONSTRAINT DF_StockMateriaPrimaLote_CreatedAt
            DEFAULT SYSDATETIME(),

        created_by_usuario_id INT NOT NULL,

        updated_at DATETIME2(7) NULL,

        updated_by_usuario_id INT NULL,

        CONSTRAINT UQ_StockMateriaPrimaLote_CompraDetalle
            UNIQUE (compra_materia_prima_detalle_id),

        CONSTRAINT CK_StockMateriaPrimaLote_CantidadInicial
            CHECK (cantidad_inicial > 0),

        CONSTRAINT CK_StockMateriaPrimaLote_NoNegativo
            CHECK (cantidad_disponible >= 0),

        CONSTRAINT FK_StockMateriaPrimaLote_CompraDetalle
            FOREIGN KEY (compra_materia_prima_detalle_id)
            REFERENCES compras.CompraMateriaPrimaDetalle(
                compra_materia_prima_detalle_id
            ),

        CONSTRAINT FK_StockMateriaPrimaLote_CreatedBy
            FOREIGN KEY (created_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id),

        CONSTRAINT FK_StockMateriaPrimaLote_UpdatedBy
            FOREIGN KEY (updated_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id)
    );
END;
GO

/* ============================================================
   8. INDICE PARA LOTES CON STOCK
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('inventario.StockMateriaPrimaLote')
      AND name = 'IX_StockMateriaPrimaLote_Disponible'
)
BEGIN
    CREATE INDEX IX_StockMateriaPrimaLote_Disponible
        ON inventario.StockMateriaPrimaLote (
            compra_materia_prima_detalle_id,
            cantidad_disponible
        );
END;
GO

/* ============================================================
   9. HISTORIAL DE MOVIMIENTOS DE MATERIA PRIMA

   La cantidad siempre se guarda positiva.
   El tipo indica si suma o resta stock.

   En migraciones posteriores se agregaran referencias directas
   a ProduccionDetalle y MermaDetalle cuando dichas tablas existan.
   ============================================================ */

IF OBJECT_ID('inventario.MovimientoMateriaPrima', 'U') IS NULL
BEGIN
    CREATE TABLE inventario.MovimientoMateriaPrima (
        movimiento_materia_prima_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_MovimientoMateriaPrima PRIMARY KEY,

        stock_materia_prima_lote_id INT NOT NULL,

        tipo_movimiento VARCHAR(30) NOT NULL,

        cantidad DECIMAL(18,3) NOT NULL,

        fecha_movimiento DATETIME2(7) NOT NULL
            CONSTRAINT DF_MovimientoMateriaPrima_Fecha
            DEFAULT SYSDATETIME(),

        observacion NVARCHAR(400) NULL,

        created_at DATETIME2(7) NOT NULL
            CONSTRAINT DF_MovimientoMateriaPrima_CreatedAt
            DEFAULT SYSDATETIME(),

        created_by_usuario_id INT NOT NULL,

        CONSTRAINT CK_MovimientoMateriaPrima_Cantidad
            CHECK (cantidad > 0),

        CONSTRAINT CK_MovimientoMateriaPrima_Tipo
            CHECK (
                tipo_movimiento IN (
                    'ENTRADA_COMPRA',
                    'SALIDA_PRODUCCION',
                    'SALIDA_MERMA',
                    'AJUSTE_ENTRADA',
                    'AJUSTE_SALIDA'
                )
            ),

        CONSTRAINT FK_MovimientoMateriaPrima_StockLote
            FOREIGN KEY (stock_materia_prima_lote_id)
            REFERENCES inventario.StockMateriaPrimaLote(
                stock_materia_prima_lote_id
            ),

        CONSTRAINT FK_MovimientoMateriaPrima_CreatedBy
            FOREIGN KEY (created_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id)
    );
END;
GO

/* ============================================================
   10. INDICES DE MOVIMIENTOS
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('inventario.MovimientoMateriaPrima')
      AND name = 'IX_MovimientoMateriaPrima_Stock_Fecha'
)
BEGIN
    CREATE INDEX IX_MovimientoMateriaPrima_Stock_Fecha
        ON inventario.MovimientoMateriaPrima (
            stock_materia_prima_lote_id,
            fecha_movimiento,
            movimiento_materia_prima_id
        );
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('inventario.MovimientoMateriaPrima')
      AND name = 'IX_MovimientoMateriaPrima_Tipo_Fecha'
)
BEGIN
    CREATE INDEX IX_MovimientoMateriaPrima_Tipo_Fecha
        ON inventario.MovimientoMateriaPrima (
            tipo_movimiento,
            fecha_movimiento
        );
END;
GO

/* ============================================================
   11. VALIDACION FINAL DE ESTRUCTURA
   ============================================================ */

IF OBJECT_ID('compras.CompraMateriaPrima', 'U') IS NULL
    THROW 50120, 'No se pudo crear compras.CompraMateriaPrima.', 1;

IF OBJECT_ID('compras.CompraMateriaPrimaDetalle', 'U') IS NULL
    THROW 50121, 'No se pudo crear compras.CompraMateriaPrimaDetalle.', 1;

IF OBJECT_ID('inventario.StockMateriaPrimaLote', 'U') IS NULL
    THROW 50122, 'No se pudo crear inventario.StockMateriaPrimaLote.', 1;

IF OBJECT_ID('inventario.MovimientoMateriaPrima', 'U') IS NULL
    THROW 50123, 'No se pudo crear inventario.MovimientoMateriaPrima.', 1;
GO
