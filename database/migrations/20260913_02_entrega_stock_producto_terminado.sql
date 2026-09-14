/* ============================================================
   GestionDriza
   Entregas - Idempotencia e integridad de movimientos de PT
   ============================================================ */

IF COL_LENGTH(
  'ventas.Entrega',
  'idempotency_key'
) IS NULL
BEGIN
  ALTER TABLE ventas.Entrega
  ADD idempotency_key VARCHAR(100) NULL;
END;


/*
 * SQL dinámico porque SQL Server compila el batch completo
 * antes de ejecutar el ALTER TABLE.
 */
IF NOT EXISTS (
  SELECT 1
  FROM sys.indexes
  WHERE
    object_id = OBJECT_ID(
      'ventas.Entrega'
    )
    AND name =
      'UX_Entrega_IdempotencyKey'
)
BEGIN
  EXEC(
    'CREATE UNIQUE NONCLUSTERED INDEX
       UX_Entrega_IdempotencyKey
     ON ventas.Entrega (
       idempotency_key
     )
     WHERE idempotency_key IS NOT NULL;'
  );
END;


/*
 * Una EntregaDetalle debe producir como máximo un movimiento
 * de salida de producto terminado.
 *
 * Esto refuerza a nivel de BD que un mismo detalle no pueda
 * descontar stock dos veces.
 */
IF NOT EXISTS (
  SELECT 1
  FROM sys.indexes
  WHERE
    object_id = OBJECT_ID(
      'inventario.MovimientoProductoTerminado'
    )
    AND name =
      'UX_MovimientoProductoTerminado_EntregaDetalle'
)
BEGIN
  EXEC(
    'CREATE UNIQUE NONCLUSTERED INDEX
       UX_MovimientoProductoTerminado_EntregaDetalle
     ON inventario.MovimientoProductoTerminado (
       entrega_detalle_id
     )
     WHERE entrega_detalle_id IS NOT NULL;'
  );
END;
