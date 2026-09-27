/* ============================================================
   GestionDriza
   Verificación Pedido -> Producto Terminado
   ============================================================ */

-- 1. Ver detalles recientes y comprobar producto_id.
SELECT TOP 30
  pd.pedido_detalle_id,
  pd.pedido_id,
  pd.producto_id,

  tp.nombre AS tipo_producto,
  mat.nombre AS material,
  med.nombre AS medida,
  col.nombre AS color,

  pd.cantidad_pedida,
  um.codigo AS unidad,

  pd.cantidad_presentacion,
  up.codigo AS unidad_presentacion,

  pd.precio_unitario,
  pd.moneda_codigo

FROM ventas.PedidoDetalle pd

INNER JOIN catalog.TipoProducto tp
  ON pd.tipo_producto_id =
     tp.tipo_producto_id

INNER JOIN catalog.Material mat
  ON pd.material_id =
     mat.material_id

INNER JOIN catalog.Medida med
  ON pd.medida_id =
     med.medida_id

INNER JOIN catalog.Color col
  ON pd.color_id =
     col.color_id

INNER JOIN catalog.UnidadMedida um
  ON pd.unidad_medida_id =
     um.unidad_medida_id

LEFT JOIN catalog.UnidadMedida up
  ON pd.unidad_presentacion_id =
     up.unidad_medida_id

ORDER BY
  pd.pedido_detalle_id DESC;


-- 2. Detectar detalles NULL que sí deberían poder mapearse.
SELECT
  pd.pedido_detalle_id,
  pd.pedido_id,

  tp.nombre AS tipo_producto,
  mat.nombre AS material,
  med.nombre AS medida,
  col.nombre AS color

FROM ventas.PedidoDetalle pd

INNER JOIN catalog.TipoProducto tp
  ON pd.tipo_producto_id =
     tp.tipo_producto_id

INNER JOIN catalog.Material mat
  ON pd.material_id =
     mat.material_id

INNER JOIN catalog.Medida med
  ON pd.medida_id =
     med.medida_id

INNER JOIN catalog.Color col
  ON pd.color_id =
     col.color_id

WHERE
  pd.producto_id IS NULL

ORDER BY
  pd.pedido_detalle_id DESC;


-- 3. Detectar cualquier inconsistencia entre producto_id
--    y los cuatro atributos guardados en PedidoDetalle.
SELECT
  pd.pedido_detalle_id,
  pd.pedido_id,
  pd.producto_id,

  pd.tipo_producto_id
    AS pedido_tipo,

  p.tipo_producto_id
    AS producto_tipo,

  pd.material_id
    AS pedido_material,

  p.material_id
    AS producto_material,

  pd.medida_id
    AS pedido_medida,

  p.medida_id
    AS producto_medida,

  pd.color_id
    AS pedido_color,

  p.color_id
    AS producto_color

FROM ventas.PedidoDetalle pd

INNER JOIN catalog.Producto p
  ON pd.producto_id =
     p.producto_id

WHERE
  pd.tipo_producto_id <>
    p.tipo_producto_id

  OR pd.material_id <>
     p.material_id

  OR pd.medida_id <>
     p.medida_id

  OR pd.color_id <>
     p.color_id;
