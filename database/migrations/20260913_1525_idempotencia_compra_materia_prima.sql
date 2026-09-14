/* ============================================================
   GestionDriza
   Migracion: Idempotencia para compras de materia prima
   Fecha: 2026-09-13

   Objetivo:
   Evitar que una misma solicitud de registro de compra de
   materia prima pueda crear dos compras, dos stocks y dos
   movimientos por reintentos, doble clic o repeticion del POST.

   IMPORTANTE:
   - NO modifica migraciones anteriores.
   - La clave es NULL para registros que pudieran existir antes.
   - Para nuevas compras creadas desde la API se utilizara una
     Idempotency-Key generada por el frontend.
   ============================================================ */

SET XACT_ABORT ON;
GO


/* ============================================================
   1. VALIDAR DEPENDENCIA
   ============================================================ */

IF OBJECT_ID('compras.CompraMateriaPrima', 'U') IS NULL
    THROW 50501,
        'No existe compras.CompraMateriaPrima. Se cancela la migracion.',
        1;
GO


/* ============================================================
   2. AGREGAR CLAVE DE IDEMPOTENCIA
   ============================================================ */

IF COL_LENGTH(
    'compras.CompraMateriaPrima',
    'idempotency_key'
) IS NULL
BEGIN
    ALTER TABLE compras.CompraMateriaPrima
        ADD idempotency_key VARCHAR(100) NULL;
END;
GO


/* ============================================================
   3. INDICE UNICO FILTRADO

   Multiples filas antiguas pueden tener NULL.
   Las nuevas claves no pueden repetirse.
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id =
          OBJECT_ID('compras.CompraMateriaPrima')
      AND name =
          'UX_CompraMateriaPrima_IdempotencyKey'
)
BEGIN
    CREATE UNIQUE INDEX UX_CompraMateriaPrima_IdempotencyKey
        ON compras.CompraMateriaPrima (
            idempotency_key
        )
        WHERE idempotency_key IS NOT NULL;
END;
GO


/* ============================================================
   4. VALIDACION FINAL
   ============================================================ */

IF COL_LENGTH(
    'compras.CompraMateriaPrima',
    'idempotency_key'
) IS NULL
    THROW 50510,
        'No se pudo crear idempotency_key en CompraMateriaPrima.',
        1;
GO
