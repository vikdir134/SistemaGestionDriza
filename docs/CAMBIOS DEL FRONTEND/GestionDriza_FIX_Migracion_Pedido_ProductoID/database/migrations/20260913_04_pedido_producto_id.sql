/* ============================================================
   GestionDriza
   Vincular PedidoDetalle con catalog.Producto
   ============================================================

   Corrección:
   ventas.PedidoDetalle NO tiene columna updated_at.
   Por ello, esta migración solo completa producto_id.

   Objetivo:
   Completar producto_id únicamente en detalles históricos
   donde actualmente es NULL y existe una coincidencia exacta
   con un producto terminado activo.

   No elimina ni modifica cantidades, precios o presentaciones.
   ============================================================ */

UPDATE pd

SET
  pd.producto_id =
    p.producto_id

FROM ventas.PedidoDetalle pd

INNER JOIN catalog.Producto p
  ON p.activo = 1

 AND p.tipo_producto_id =
     pd.tipo_producto_id

 AND p.material_id =
     pd.material_id

 AND p.medida_id =
     pd.medida_id

 AND p.color_id =
     pd.color_id

WHERE
  pd.producto_id IS NULL;


/*
 * Verificación informativa.
 *
 * Los registros que continúen en NULL son detalles históricos
 * cuya combinación no existe actualmente como producto activo.
 */
SELECT
  COUNT(*) AS detalles_sin_producto

FROM ventas.PedidoDetalle

WHERE
  producto_id IS NULL;
