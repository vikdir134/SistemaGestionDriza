/* ============================================================
   GestionDriza
   Producción - idempotencia

   IMPORTANTE:
   - Migración nueva.
   - Esta versión corrige la compilación del índice en SQL Server.
   - Es segura si la columna alcanzó a crearse en un intento previo.
   ============================================================ */

IF COL_LENGTH(
  'produccion.Produccion',
  'idempotency_key'
) IS NULL
BEGIN
  ALTER TABLE produccion.Produccion
  ADD idempotency_key VARCHAR(100) NULL;
END;


/*
 * El CREATE INDEX se ejecuta mediante SQL dinámico.
 *
 * Motivo:
 * SQL Server compila el batch completo antes de ejecutar.
 * Si CREATE INDEX referencia una columna agregada antes en el
 * mismo batch, puede lanzar:
 *
 *   Invalid column name 'idempotency_key'
 *
 * Con EXEC(), la sentencia del índice se compila después de que
 * el ALTER TABLE ya terminó.
 */
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
  EXEC(
    'CREATE UNIQUE NONCLUSTERED INDEX
       UX_Produccion_IdempotencyKey
     ON produccion.Produccion (
       idempotency_key
     )
     WHERE idempotency_key IS NOT NULL;'
  );
END;
