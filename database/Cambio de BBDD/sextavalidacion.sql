SELECT
    c.name AS columna,
    t.name AS tipo,
    c.max_length,
    c.is_nullable
FROM sys.columns c
INNER JOIN sys.types t
    ON c.user_type_id = t.user_type_id
WHERE c.object_id = OBJECT_ID('compras.CompraMateriaPrima')
  AND c.name = 'idempotency_key';


SELECT
    name AS indice,
    is_unique
FROM sys.indexes
WHERE object_id = OBJECT_ID('compras.CompraMateriaPrima')
  AND name = 'UX_CompraMateriaPrima_IdempotencyKey';