SELECT
    SCHEMA_NAME(schema_id) AS esquema,
    name AS tabla
FROM sys.tables
WHERE SCHEMA_NAME(schema_id) IN ('compras', 'inventario')
  AND name IN (
      'CompraMateriaPrima',
      'CompraMateriaPrimaDetalle',
      'StockMateriaPrimaLote',
      'MovimientoMateriaPrima'
  )
ORDER BY esquema, tabla;