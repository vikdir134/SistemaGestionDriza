/* ============================================================
   1. TABLAS DE MERMA
   ============================================================ */

SELECT
    SCHEMA_NAME(schema_id) AS esquema,
    name AS tabla
FROM sys.tables
WHERE SCHEMA_NAME(schema_id) = 'inventario'
  AND name IN (
      'Merma',
      'MermaDetalle'
  )
ORDER BY name;


/* ============================================================
   2. COLUMNA DE VINCULO
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
  AND c.name = 'merma_detalle_id';


/* ============================================================
   3. TRIGGERS
   ============================================================ */

SELECT
    OBJECT_SCHEMA_NAME(parent_id) AS esquema,
    OBJECT_NAME(parent_id) AS tabla,
    name AS trigger_nombre
FROM sys.triggers
WHERE name IN (
    'trg_MermaDetalle_ProtegerMovimientos',
    'trg_Merma_ProtegerHistorial'
)
ORDER BY tabla, trigger_nombre;


/* ============================================================
   4. ESTRUCTURA ACTUAL DE MOVIMIENTO MP
   ============================================================ */

SELECT
    c.column_id,
    c.name AS columna,
    t.name AS tipo,
    c.is_nullable
FROM sys.columns c
INNER JOIN sys.types t
    ON c.user_type_id = t.user_type_id
WHERE c.object_id =
      OBJECT_ID('inventario.MovimientoMateriaPrima')
ORDER BY c.column_id;