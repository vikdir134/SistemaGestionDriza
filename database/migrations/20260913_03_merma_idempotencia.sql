/* ============================================================
   GestionDriza
   Merma de Materia Prima - Idempotencia
   ============================================================ */

IF COL_LENGTH(
  'inventario.Merma',
  'idempotency_key'
) IS NULL
BEGIN
  ALTER TABLE inventario.Merma
  ADD idempotency_key VARCHAR(100) NULL;
END;


/*
 * SQL dinámico para evitar que SQL Server compile
 * el CREATE INDEX antes de que exista la columna.
 */
IF NOT EXISTS (
  SELECT 1
  FROM sys.indexes
  WHERE
    object_id = OBJECT_ID(
      'inventario.Merma'
    )
    AND name =
      'UX_Merma_IdempotencyKey'
)
BEGIN
  EXEC(
    'CREATE UNIQUE NONCLUSTERED INDEX
       UX_Merma_IdempotencyKey
     ON inventario.Merma (
       idempotency_key
     )
     WHERE idempotency_key IS NOT NULL;'
  );
END;
