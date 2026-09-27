/* ============================================================
   GestionDriza
   Migracion: Produccion y almacen de producto terminado
   Fecha: 2026-09-13

   Objetivos:
   1. Crear estructura de produccion.
   2. Asociar cada produccion con la version de composicion usada.
   3. Crear stock de producto terminado por Producto + Presentacion.
   4. Crear historial de movimientos de producto terminado.
   5. Relacionar las salidas de materia prima con el detalle de
      produccion que las origina.

   IMPORTANTE:
   - Esta migracion crea ESTRUCTURA.
   - NO ejecuta todavia el algoritmo FIFO.
   - NO modifica todavia la logica actual de Entregas.
   - El pedido NO reserva ni descuenta stock.
   - La materia prima se consumira al registrar produccion.
   - El producto terminado se consumira al registrar entrega.
   - La presentacion NO forma parte de catalog.Producto.
   - La presentacion SI forma parte del saldo de producto terminado.
   ============================================================ */

SET XACT_ABORT ON;
GO


/* ============================================================
   1. VALIDAR DEPENDENCIAS
   ============================================================ */

IF OBJECT_ID('catalog.Producto', 'U') IS NULL
    THROW 50301, 'No existe catalog.Producto. Se cancela la migracion.', 1;

IF OBJECT_ID('catalog.ProductoComposicion', 'U') IS NULL
    THROW 50302, 'No existe catalog.ProductoComposicion. Se cancela la migracion.', 1;

IF OBJECT_ID('catalog.UnidadMedida', 'U') IS NULL
    THROW 50303, 'No existe catalog.UnidadMedida. Se cancela la migracion.', 1;

IF OBJECT_ID('auth.Usuario', 'U') IS NULL
    THROW 50304, 'No existe auth.Usuario. Se cancela la migracion.', 1;

IF OBJECT_ID('inventario.MovimientoMateriaPrima', 'U') IS NULL
    THROW 50305, 'No existe inventario.MovimientoMateriaPrima. Se cancela la migracion.', 1;

IF OBJECT_ID('ventas.EntregaDetalle', 'U') IS NULL
    THROW 50306, 'No existe ventas.EntregaDetalle. Se cancela la migracion.', 1;
GO


/* ============================================================
   2. CREAR ESQUEMA PRODUCCION
   ============================================================ */

IF SCHEMA_ID('produccion') IS NULL
BEGIN
    EXEC('CREATE SCHEMA produccion');
END;
GO


/* ============================================================
   3. CABECERA DE PRODUCCION

   Una cabecera puede contener uno o varios productos terminados.
   La operacion real de registro se implementara posteriormente
   desde el backend dentro de una transaccion.
   ============================================================ */

IF OBJECT_ID('produccion.Produccion', 'U') IS NULL
BEGIN
    CREATE TABLE produccion.Produccion (
        produccion_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_Produccion PRIMARY KEY,

        fecha_produccion DATE NOT NULL,

        observacion NVARCHAR(500) NULL,

        created_at DATETIME2(7) NOT NULL
            CONSTRAINT DF_Produccion_CreatedAt
            DEFAULT SYSDATETIME(),

        created_by_usuario_id INT NOT NULL,

        CONSTRAINT FK_Produccion_CreatedBy
            FOREIGN KEY (created_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id)
    );
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('produccion.Produccion')
      AND name = 'IX_Produccion_Fecha'
)
BEGIN
    CREATE INDEX IX_Produccion_Fecha
        ON produccion.Produccion (
            fecha_produccion DESC,
            produccion_id DESC
        );
END;
GO


/* ============================================================
   4. DETALLE DE PRODUCCION

   producto_id:
       Producto terminado real:
       Tipo + Medida + Color + Material.

   producto_composicion_id:
       Version exacta de la receta que se utilizo.

   cantidad_producida:
       Cantidad total ingresada al almacen terminado.

   cantidad_presentacion:
       Tamano de cada presentacion.

   Ejemplo:
       cantidad_producida = 200 KG
       cantidad_presentacion = 50 KG

       => stock terminado de esa presentacion aumenta 200 KG.
   ============================================================ */

IF OBJECT_ID('produccion.ProduccionDetalle', 'U') IS NULL
BEGIN
    CREATE TABLE produccion.ProduccionDetalle (
        produccion_detalle_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_ProduccionDetalle PRIMARY KEY,

        produccion_id INT NOT NULL,

        producto_id INT NOT NULL,

        producto_composicion_id INT NOT NULL,

        cantidad_producida DECIMAL(18,3) NOT NULL,

        unidad_medida_id INT NOT NULL,

        cantidad_presentacion DECIMAL(18,3) NOT NULL,

        unidad_presentacion_id INT NOT NULL,

        observacion NVARCHAR(300) NULL,

        created_at DATETIME2(7) NOT NULL
            CONSTRAINT DF_ProduccionDetalle_CreatedAt
            DEFAULT SYSDATETIME(),

        created_by_usuario_id INT NOT NULL,

        CONSTRAINT CK_ProduccionDetalle_Cantidad
            CHECK (cantidad_producida > 0),

        CONSTRAINT CK_ProduccionDetalle_Presentacion
            CHECK (cantidad_presentacion > 0),

        CONSTRAINT FK_ProduccionDetalle_Produccion
            FOREIGN KEY (produccion_id)
            REFERENCES produccion.Produccion(produccion_id),

        CONSTRAINT FK_ProduccionDetalle_Producto
            FOREIGN KEY (producto_id)
            REFERENCES catalog.Producto(producto_id),

        CONSTRAINT FK_ProduccionDetalle_Composicion
            FOREIGN KEY (producto_composicion_id)
            REFERENCES catalog.ProductoComposicion(
                producto_composicion_id
            ),

        CONSTRAINT FK_ProduccionDetalle_Unidad
            FOREIGN KEY (unidad_medida_id)
            REFERENCES catalog.UnidadMedida(unidad_medida_id),

        CONSTRAINT FK_ProduccionDetalle_UnidadPresentacion
            FOREIGN KEY (unidad_presentacion_id)
            REFERENCES catalog.UnidadMedida(unidad_medida_id),

        CONSTRAINT FK_ProduccionDetalle_CreatedBy
            FOREIGN KEY (created_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id)
    );
END;
GO


/* ============================================================
   5. INDICES DE PRODUCCION
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('produccion.ProduccionDetalle')
      AND name = 'IX_ProduccionDetalle_Produccion'
)
BEGIN
    CREATE INDEX IX_ProduccionDetalle_Produccion
        ON produccion.ProduccionDetalle (
            produccion_id,
            produccion_detalle_id
        );
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('produccion.ProduccionDetalle')
      AND name = 'IX_ProduccionDetalle_Producto'
)
BEGIN
    CREATE INDEX IX_ProduccionDetalle_Producto
        ON produccion.ProduccionDetalle (
            producto_id,
            created_at DESC
        );
END;
GO


/* ============================================================
   6. VALIDAR COMPOSICION AL REGISTRAR PRODUCCION

   La composicion utilizada debe:
   - pertenecer al mismo producto;
   - estar publicada;
   - ser la version vigente al momento de registrar el detalle.

   Una vez que posteriormente cambie la receta, el detalle de
   produccion conserva producto_composicion_id y por tanto queda
   asociado para siempre a la version historica utilizada.
   ============================================================ */

CREATE OR ALTER TRIGGER produccion.trg_ProduccionDetalle_ValidarComposicion
ON produccion.ProduccionDetalle
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM inserted i
        LEFT JOIN catalog.ProductoComposicion pc
            ON pc.producto_composicion_id =
               i.producto_composicion_id
        WHERE pc.producto_composicion_id IS NULL
           OR pc.producto_id <> i.producto_id
           OR pc.fecha_vigencia_desde IS NULL
           OR pc.vigente <> 1
    )
    BEGIN
        THROW 50320,
            'La composicion seleccionada no es la composicion vigente del producto.',
            1;
    END;
END;
GO


/* ============================================================
   7. STOCK DE PRODUCTO TERMINADO

   Se mantiene un saldo independiente por:

       Producto
       + Unidad principal
       + Cantidad de presentacion
       + Unidad de presentacion

   Ejemplo:

       DRIZA / PP / 1/4 / BLANCO
       50 KG  -> 500 KG disponibles

       DRIZA / PP / 1/4 / BLANCO
       30 KG  -> 180 KG disponibles

   Son saldos diferentes aunque pertenezcan al mismo producto.
   ============================================================ */

IF OBJECT_ID('inventario.StockProductoTerminado', 'U') IS NULL
BEGIN
    CREATE TABLE inventario.StockProductoTerminado (
        stock_producto_terminado_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_StockProductoTerminado PRIMARY KEY,

        producto_id INT NOT NULL,

        unidad_medida_id INT NOT NULL,

        cantidad_presentacion DECIMAL(18,3) NOT NULL,

        unidad_presentacion_id INT NOT NULL,

        cantidad_disponible DECIMAL(18,3) NOT NULL
            CONSTRAINT DF_StockProductoTerminado_Disponible
            DEFAULT (0),

        created_at DATETIME2(7) NOT NULL
            CONSTRAINT DF_StockProductoTerminado_CreatedAt
            DEFAULT SYSDATETIME(),

        created_by_usuario_id INT NOT NULL,

        updated_at DATETIME2(7) NULL,

        updated_by_usuario_id INT NULL,

        CONSTRAINT UQ_StockProductoTerminado_ProductoPresentacion
            UNIQUE (
                producto_id,
                unidad_medida_id,
                cantidad_presentacion,
                unidad_presentacion_id
            ),

        CONSTRAINT CK_StockProductoTerminado_Presentacion
            CHECK (cantidad_presentacion > 0),

        CONSTRAINT CK_StockProductoTerminado_NoNegativo
            CHECK (cantidad_disponible >= 0),

        CONSTRAINT FK_StockProductoTerminado_Producto
            FOREIGN KEY (producto_id)
            REFERENCES catalog.Producto(producto_id),

        CONSTRAINT FK_StockProductoTerminado_Unidad
            FOREIGN KEY (unidad_medida_id)
            REFERENCES catalog.UnidadMedida(unidad_medida_id),

        CONSTRAINT FK_StockProductoTerminado_UnidadPresentacion
            FOREIGN KEY (unidad_presentacion_id)
            REFERENCES catalog.UnidadMedida(unidad_medida_id),

        CONSTRAINT FK_StockProductoTerminado_CreatedBy
            FOREIGN KEY (created_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id),

        CONSTRAINT FK_StockProductoTerminado_UpdatedBy
            FOREIGN KEY (updated_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id)
    );
END;
GO


/* ============================================================
   8. INDICES DE STOCK TERMINADO
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('inventario.StockProductoTerminado')
      AND name = 'IX_StockProductoTerminado_Producto'
)
BEGIN
    CREATE INDEX IX_StockProductoTerminado_Producto
        ON inventario.StockProductoTerminado (
            producto_id,
            cantidad_disponible
        );
END;
GO


/* ============================================================
   9. MOVIMIENTOS DE PRODUCTO TERMINADO

   La cantidad siempre es positiva.
   tipo_movimiento determina si suma o resta.

   ENTRADA_PRODUCCION:
       debe apuntar a produccion.ProduccionDetalle.

   SALIDA_ENTREGA:
       debe apuntar a ventas.EntregaDetalle.

   AJUSTE_*:
       por ahora no requiere una entidad origen.
   ============================================================ */

IF OBJECT_ID('inventario.MovimientoProductoTerminado', 'U') IS NULL
BEGIN
    CREATE TABLE inventario.MovimientoProductoTerminado (
        movimiento_producto_terminado_id INT IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_MovimientoProductoTerminado PRIMARY KEY,

        stock_producto_terminado_id INT NOT NULL,

        tipo_movimiento VARCHAR(30) NOT NULL,

        cantidad DECIMAL(18,3) NOT NULL,

        fecha_movimiento DATETIME2(7) NOT NULL
            CONSTRAINT DF_MovimientoProductoTerminado_Fecha
            DEFAULT SYSDATETIME(),

        produccion_detalle_id INT NULL,

        entrega_detalle_id INT NULL,

        observacion NVARCHAR(400) NULL,

        created_at DATETIME2(7) NOT NULL
            CONSTRAINT DF_MovimientoProductoTerminado_CreatedAt
            DEFAULT SYSDATETIME(),

        created_by_usuario_id INT NOT NULL,

        CONSTRAINT CK_MovimientoProductoTerminado_Cantidad
            CHECK (cantidad > 0),

        CONSTRAINT CK_MovimientoProductoTerminado_Tipo
            CHECK (
                tipo_movimiento IN (
                    'ENTRADA_PRODUCCION',
                    'SALIDA_ENTREGA',
                    'AJUSTE_ENTRADA',
                    'AJUSTE_SALIDA'
                )
            ),

        CONSTRAINT CK_MovimientoProductoTerminado_Origen
            CHECK (
                (
                    tipo_movimiento = 'ENTRADA_PRODUCCION'
                    AND produccion_detalle_id IS NOT NULL
                    AND entrega_detalle_id IS NULL
                )
                OR
                (
                    tipo_movimiento = 'SALIDA_ENTREGA'
                    AND entrega_detalle_id IS NOT NULL
                    AND produccion_detalle_id IS NULL
                )
                OR
                (
                    tipo_movimiento IN (
                        'AJUSTE_ENTRADA',
                        'AJUSTE_SALIDA'
                    )
                    AND produccion_detalle_id IS NULL
                    AND entrega_detalle_id IS NULL
                )
            ),

        CONSTRAINT FK_MovimientoProductoTerminado_Stock
            FOREIGN KEY (stock_producto_terminado_id)
            REFERENCES inventario.StockProductoTerminado(
                stock_producto_terminado_id
            ),

        CONSTRAINT FK_MovimientoProductoTerminado_ProduccionDetalle
            FOREIGN KEY (produccion_detalle_id)
            REFERENCES produccion.ProduccionDetalle(
                produccion_detalle_id
            ),

        CONSTRAINT FK_MovimientoProductoTerminado_EntregaDetalle
            FOREIGN KEY (entrega_detalle_id)
            REFERENCES ventas.EntregaDetalle(
                entrega_detalle_id
            ),

        CONSTRAINT FK_MovimientoProductoTerminado_CreatedBy
            FOREIGN KEY (created_by_usuario_id)
            REFERENCES auth.Usuario(usuario_id)
    );
END;
GO


/* ============================================================
   10. INDICES DE MOVIMIENTO PT
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('inventario.MovimientoProductoTerminado')
      AND name = 'IX_MovimientoPT_Stock_Fecha'
)
BEGIN
    CREATE INDEX IX_MovimientoPT_Stock_Fecha
        ON inventario.MovimientoProductoTerminado (
            stock_producto_terminado_id,
            fecha_movimiento,
            movimiento_producto_terminado_id
        );
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('inventario.MovimientoProductoTerminado')
      AND name = 'IX_MovimientoPT_Produccion'
)
BEGIN
    CREATE INDEX IX_MovimientoPT_Produccion
        ON inventario.MovimientoProductoTerminado (
            produccion_detalle_id
        )
        WHERE produccion_detalle_id IS NOT NULL;
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('inventario.MovimientoProductoTerminado')
      AND name = 'IX_MovimientoPT_Entrega'
)
BEGIN
    CREATE INDEX IX_MovimientoPT_Entrega
        ON inventario.MovimientoProductoTerminado (
            entrega_detalle_id
        )
        WHERE entrega_detalle_id IS NOT NULL;
END;
GO


/* ============================================================
   11. VINCULAR CONSUMO DE MATERIA PRIMA A PRODUCCION

   MovimientoMateriaPrima ya existia desde la migracion anterior.

   Agregamos produccion_detalle_id para poder conocer exactamente:

       Produccion X
          -> consumio 100 KG del lote A
          -> consumio  40 KG del lote B

   Esto sera utilizado por el algoritmo FIFO.
   ============================================================ */

IF COL_LENGTH(
    'inventario.MovimientoMateriaPrima',
    'produccion_detalle_id'
) IS NULL
BEGIN
    ALTER TABLE inventario.MovimientoMateriaPrima
        ADD produccion_detalle_id INT NULL;
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.foreign_keys
    WHERE parent_object_id =
          OBJECT_ID('inventario.MovimientoMateriaPrima')
      AND name =
          'FK_MovimientoMateriaPrima_ProduccionDetalle'
)
BEGIN
    ALTER TABLE inventario.MovimientoMateriaPrima
        ADD CONSTRAINT FK_MovimientoMateriaPrima_ProduccionDetalle
        FOREIGN KEY (produccion_detalle_id)
        REFERENCES produccion.ProduccionDetalle(
            produccion_detalle_id
        );
END;
GO


/* ============================================================
   12. VALIDAR ORIGEN DE SALIDA POR PRODUCCION

   Toda SALIDA_PRODUCCION debe quedar vinculada al detalle exacto
   que genero el consumo.

   Ningun otro tipo de movimiento puede utilizar esa columna.
   ============================================================ */

IF EXISTS (
    SELECT 1
    FROM inventario.MovimientoMateriaPrima
    WHERE (
        tipo_movimiento = 'SALIDA_PRODUCCION'
        AND produccion_detalle_id IS NULL
    )
    OR (
        tipo_movimiento <> 'SALIDA_PRODUCCION'
        AND produccion_detalle_id IS NOT NULL
    )
)
BEGIN
    THROW 50330,
        'Existen movimientos de materia prima incompatibles con la nueva relacion de produccion.',
        1;
END;
GO


IF NOT EXISTS (
    SELECT 1
    FROM sys.check_constraints
    WHERE parent_object_id =
          OBJECT_ID('inventario.MovimientoMateriaPrima')
      AND name =
          'CK_MovimientoMateriaPrima_OrigenProduccion'
)
BEGIN
    ALTER TABLE inventario.MovimientoMateriaPrima
        ADD CONSTRAINT CK_MovimientoMateriaPrima_OrigenProduccion
        CHECK (
            (
                tipo_movimiento = 'SALIDA_PRODUCCION'
                AND produccion_detalle_id IS NOT NULL
            )
            OR
            (
                tipo_movimiento <> 'SALIDA_PRODUCCION'
                AND produccion_detalle_id IS NULL
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
          'IX_MovimientoMateriaPrima_Produccion'
)
BEGIN
    CREATE INDEX IX_MovimientoMateriaPrima_Produccion
        ON inventario.MovimientoMateriaPrima (
            produccion_detalle_id
        )
        WHERE produccion_detalle_id IS NOT NULL;
END;
GO


/* ============================================================
   13. VALIDACION FINAL
   ============================================================ */

IF SCHEMA_ID('produccion') IS NULL
    THROW 50340, 'No se pudo crear el esquema produccion.', 1;

IF OBJECT_ID('produccion.Produccion', 'U') IS NULL
    THROW 50341, 'No se pudo crear produccion.Produccion.', 1;

IF OBJECT_ID('produccion.ProduccionDetalle', 'U') IS NULL
    THROW 50342, 'No se pudo crear produccion.ProduccionDetalle.', 1;

IF OBJECT_ID('inventario.StockProductoTerminado', 'U') IS NULL
    THROW 50343, 'No se pudo crear inventario.StockProductoTerminado.', 1;

IF OBJECT_ID('inventario.MovimientoProductoTerminado', 'U') IS NULL
    THROW 50344, 'No se pudo crear inventario.MovimientoProductoTerminado.', 1;

IF COL_LENGTH(
    'inventario.MovimientoMateriaPrima',
    'produccion_detalle_id'
) IS NULL
    THROW 50345, 'No se pudo vincular MovimientoMateriaPrima con ProduccionDetalle.', 1;

IF OBJECT_ID(
    'produccion.trg_ProduccionDetalle_ValidarComposicion',
    'TR'
) IS NULL
    THROW 50346, 'No se pudo crear el trigger de validacion de composicion en produccion.', 1;
GO
