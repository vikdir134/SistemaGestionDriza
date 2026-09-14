GESTIONDRIZA - FIX MIGRACION PRODUCCION IDEMPOTENCIA

ERROR:
Invalid column name 'idempotency_key'.

CAUSA:
SQL Server compila el batch completo antes de ejecutar.
El CREATE INDEX hacía referencia a idempotency_key en el mismo
batch donde la columna acababa de ser agregada.

SOLUCION:
El CREATE INDEX ahora se ejecuta mediante EXEC(), por lo que se
compila después del ALTER TABLE.

PASOS:
1. Reemplazar:
   database/migrations/20260913_01_produccion_idempotencia.sql

2. Volver a ejecutar:
   node scripts/run-migrations.js

La migración es idempotente:
- si la columna no existe, la crea;
- si la columna ya existe, no la vuelve a crear;
- si el índice no existe, lo crea;
- si ya existe, no lo vuelve a crear.

VALIDACION OPCIONAL:

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
  object_id = OBJECT_ID(
    'produccion.Produccion'
  )
  AND name =
    'UX_Produccion_IdempotencyKey';

Esperado:
- longitud_columna = 100
- índice UX_Produccion_IdempotencyKey
- is_unique = 1
