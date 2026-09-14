SELECT
    COL_LENGTH(
        'produccion.Produccion',
        'idempotency_key'
    ) AS longitud_columna;

SELECT
    name,
    is_unique
FROM sys.indexes
WHERE
    object_id = OBJECT_ID('produccion.Produccion')
    AND name = 'UX_Produccion_IdempotencyKey';