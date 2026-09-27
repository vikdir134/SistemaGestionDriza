USE SistemaGestionDriza;
GO

/*
  GestionDriza
  Verificación - Compras generales sin material

  Objetivo:
  - Verificar las últimas compras generales.
  - Confirmar que las nuevas filas de CompraDetalle
    tengan material_id = NULL y producto_id = NULL.
  - No modifica datos.
*/


SELECT TOP (20)
    c.compra_id,
    c.fecha_compra,
    c.numero_documento,
    p.razon_social,
    c.monto_total,
    c.moneda_codigo,
    c.created_at
FROM compras.Compra c
INNER JOIN compras.Proveedor p
    ON p.proveedor_id = c.proveedor_id
ORDER BY c.compra_id DESC;
GO


SELECT TOP (100)
    cd.compra_detalle_id,
    cd.compra_id,
    cd.producto_id,
    cd.material_id,
    cd.descripcion_item,
    cd.cantidad,
    um.codigo AS unidad,
    cd.precio_unitario,
    cd.subtotal
FROM compras.CompraDetalle cd
INNER JOIN catalog.UnidadMedida um
    ON um.unidad_medida_id = cd.unidad_medida_id
ORDER BY cd.compra_detalle_id DESC;
GO


/*
  Después de registrar una compra general NUEVA,
  sus filas deben cumplir:

  producto_id IS NULL
  material_id IS NULL
  descripcion_item IS NOT NULL
*/

SELECT TOP (100)
    cd.compra_detalle_id,
    cd.compra_id,
    cd.producto_id,
    cd.material_id,
    cd.descripcion_item
FROM compras.CompraDetalle cd
WHERE
    cd.producto_id IS NOT NULL
    OR cd.material_id IS NOT NULL
ORDER BY cd.compra_detalle_id DESC;
GO

/*
  IMPORTANTE:
  Si esta última consulta devuelve compras antiguas,
  NO significa que deban borrarse.
  Son registros históricos y se conservan.
*/
