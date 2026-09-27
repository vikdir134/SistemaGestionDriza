/* ============================================================
   1. TABLAS NUEVAS
   ============================================================ */

SELECT
    SCHEMA_NAME(schema_id) AS esquema,
    name AS tabla
FROM sys.tables
WHERE
    (
        SCHEMA_NAME(schema_id) = 'produccion'
        AND name IN (
            'Produccion',
            'ProduccionDetalle'
        )
    )
    OR
    (
        SCHEMA_NAME(schema_id) = 'inventario'
        AND name IN (
            'StockProductoTerminado',
            'MovimientoProductoTerminado'
        )
    )
ORDER BY esquema, tabla;


/* ============================================================
   2. TRIGGER DE PRODUCCION
   ============================================================ */

SELECT
    OBJECT_SCHEMA_NAME(parent_id) AS esquema,
    OBJECT_NAME(parent_id) AS tabla,
    name AS trigger_nombre
FROM sys.triggers
WHERE name =
    'trg_ProduccionDetalle_ValidarComposicion';


/* ============================================================
   3. VINCULO FIFO CON PRODUCCION
   ============================================================ */

SELECT
    c.name AS columna,
    t.name AS tipo,
    c.is_nullable
FROM sys.columns c
INNER JOIN sys.types t
    ON c.user_type_id = t.user_type_id
WHERE c.object_id =
      OBJECT_ID('inventario.MovimientoMateriaPrima')
  AND c.name = 'produccion_detalle_id';


/* ============================================================
   4. STOCK PT
   Debe estar vacio por ahora.
   ============================================================ */

SELECT *
FROM inventario.StockProductoTerminado;


SELECT *
FROM inventario.MovimientoProductoTerminado;