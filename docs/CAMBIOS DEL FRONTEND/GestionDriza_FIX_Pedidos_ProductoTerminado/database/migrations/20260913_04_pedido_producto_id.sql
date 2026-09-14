/* ============================================================
   GestionDriza
   Vincular PedidoDetalle con catalog.Producto
   ============================================================

   Objetivo:
   Completar producto_id únicamente en detalles históricos
   donde actualmente es NULL y existe una coincidencia exacta
   con un producto terminado activo.

   No borra, no modifica cantidades/precios y no obliga a que
   todos los registros históricos tengan coincidencia.
   ============================================================ */

UPDATE pd

SET
  pd.producto_id =
    p.producto_id,

  pd.updated_at =
    SYSDATETIME()

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
 * Los registros que sigan en NULL son históricos cuya
 * combinación no existe actualmente en catalog.Producto.
 */
SELECT
  COUNT(*) AS detalles_sin_producto

FROM ventas.PedidoDetalle

WHERE
  producto_id IS NULL;
