/* ============================================================
   DIAGNÓSTICO PREVIO - NUEVA GESTIÓN DE INVENTARIO
   NO MODIFICA NINGÚN DATO
   ============================================================ */

USE SistemaGestionDriza;
GO


/* ============================================================
   1. PRODUCTOS ACTUALES
   ============================================================ */

SELECT
    p.producto_id,
    p.codigo_producto,

    p.tipo_producto_id,
    tp.nombre AS tipo_producto,

    p.medida_id,
    med.nombre AS medida,

    p.color_id,
    c.nombre AS color,

    p.material_id,
    mat.nombre AS material,

    p.peso_total_kg,
    p.presentacion,
    p.descripcion,
    p.activo

FROM catalog.Producto p

INNER JOIN catalog.TipoProducto tp
    ON p.tipo_producto_id = tp.tipo_producto_id

INNER JOIN catalog.Medida med
    ON p.medida_id = med.medida_id

INNER JOIN catalog.Color c
    ON p.color_id = c.color_id

INNER JOIN catalog.Material mat
    ON p.material_id = mat.material_id

ORDER BY
    tp.nombre,
    med.nombre,
    c.nombre,
    mat.nombre;
GO


/* ============================================================
   2. BUSCAR PRODUCTOS DUPLICADOS POR
      TIPO + MEDIDA + COLOR + MATERIAL
   ============================================================ */

SELECT
    p.tipo_producto_id,
    tp.nombre AS tipo_producto,

    p.medida_id,
    med.nombre AS medida,

    p.color_id,
    c.nombre AS color,

    p.material_id,
    mat.nombre AS material,

    COUNT(*) AS cantidad_registros

FROM catalog.Producto p

INNER JOIN catalog.TipoProducto tp
    ON p.tipo_producto_id = tp.tipo_producto_id

INNER JOIN catalog.Medida med
    ON p.medida_id = med.medida_id

INNER JOIN catalog.Color c
    ON p.color_id = c.color_id

INNER JOIN catalog.Material mat
    ON p.material_id = mat.material_id

WHERE p.activo = 1

GROUP BY
    p.tipo_producto_id,
    tp.nombre,
    p.medida_id,
    med.nombre,
    p.color_id,
    c.nombre,
    p.material_id,
    mat.nombre

HAVING COUNT(*) > 1;
GO


/* ============================================================
   3. VER SI PEDIDODETALLE YA UTILIZA producto_id
   ============================================================ */

SELECT
    COUNT(*) AS total_detalles,

    SUM(
        CASE
            WHEN producto_id IS NULL
            THEN 1
            ELSE 0
        END
    ) AS sin_producto_id,

    SUM(
        CASE
            WHEN producto_id IS NOT NULL
            THEN 1
            ELSE 0
        END
    ) AS con_producto_id

FROM ventas.PedidoDetalle;
GO


/* ============================================================
   4. MATERIALES ACTUALES
   ============================================================ */

SELECT
    material_id,
    nombre,
    activo
FROM catalog.Material
ORDER BY nombre;
GO


/* ============================================================
   5. COLORES ACTUALES
   ============================================================ */

SELECT
    color_id,
    nombre,
    activo
FROM catalog.Color
ORDER BY nombre;
GO


/* ============================================================
   6. UNIDADES ACTUALES
   ============================================================ */

SELECT
    unidad_medida_id,
    codigo,
    nombre,
    activo
FROM catalog.UnidadMedida
ORDER BY nombre;
GO