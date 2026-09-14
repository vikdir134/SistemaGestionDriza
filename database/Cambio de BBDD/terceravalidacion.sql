/* TABLAS */

SELECT
    SCHEMA_NAME(schema_id) AS esquema,
    name AS tabla
FROM sys.tables
WHERE SCHEMA_NAME(schema_id) = 'catalog'
  AND name IN (
      'ProductoComposicion',
      'ProductoComposicionDetalle'
  )
ORDER BY name;


/* TRIGGERS */

SELECT
    OBJECT_SCHEMA_NAME(parent_id) AS esquema,
    OBJECT_NAME(parent_id) AS tabla,
    name AS trigger_nombre
FROM sys.triggers
WHERE name IN (
    'trg_ProductoComposicion_ValidarActivacion',
    'trg_ProductoComposicionDetalle_ProtegerHistorial',
    'trg_ProductoComposicion_ProtegerHistorial'
)
ORDER BY tabla, trigger_nombre;


/* COMPOSICIONES ACTUALES
   Por ahora debe devolver 0 filas.
*/

SELECT *
FROM catalog.ProductoComposicion;

SELECT *
FROM catalog.ProductoComposicionDetalle;