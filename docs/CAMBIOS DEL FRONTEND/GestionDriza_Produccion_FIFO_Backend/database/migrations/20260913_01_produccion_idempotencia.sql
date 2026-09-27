/* ============================================================
   GestionDriza
   Producción - idempotencia

   IMPORTANTE:
   - Migración nueva.
   - No modificar después de aplicarla.
   ============================================================ */

IF COL_LENGTH(
  'produccion.Produccion',
  'idempotency_key'
) IS NULL
BEGIN
  ALTER TABLE produccion.Produccion
  ADD idempotency_key VARCHAR(100) NULL;
END;

IF NOT EXISTS (
  SELECT 1
  FROM sys.indexes
  WHERE
    object_id = OBJECT_ID(
      'produccion.Produccion'
    )
    AND name =
      'UX_Produccion_IdempotencyKey'
)
BEGIN
  CREATE UNIQUE NONCLUSTERED INDEX
    UX_Produccion_IdempotencyKey
  ON produccion.Produccion (
    idempotency_key
  )
  WHERE idempotency_key IS NOT NULL;
END;
