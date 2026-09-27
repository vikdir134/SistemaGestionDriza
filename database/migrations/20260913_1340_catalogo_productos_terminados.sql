/* ============================================================
   GestionDriza
   Migracion: Catalogo oficial de productos terminados
   Fecha: 2026-09-13

   Objetivos:
   1. Reutilizar catalog.Producto como catalogo oficial de PT.
   2. Crear productos a partir de combinaciones historicas usadas
      en ventas.PedidoDetalle.
   3. Completar ventas.PedidoDetalle.producto_id para el historico.
   4. Impedir productos activos duplicados por:
      Tipo + Material + Medida + Color.

   IMPORTANTE:
   - No elimina columnas existentes.
   - No cambia producto_id a NOT NULL todavia.
   - No modifica la logica actual de pedidos.
   - Esta preparada para ejecutarse mediante run-migrations.js.
   ============================================================ */

SET XACT_ABORT ON;
GO

/* ============================================================
   1. VALIDAR ESTRUCTURA ESPERADA
   ============================================================ */

IF OBJECT_ID('catalog.Producto', 'U') IS NULL
BEGIN
    THROW 50001, 'No existe catalog.Producto. Se cancela la migracion.', 1;
END;

IF OBJECT_ID('ventas.PedidoDetalle', 'U') IS NULL
BEGIN
    THROW 50002, 'No existe ventas.PedidoDetalle. Se cancela la migracion.', 1;
END;
GO

/* ============================================================
   2. VALIDAR DETALLES ACTIVOS SIN IDENTIDAD DE PRODUCTO

   Para crear el catalogo real necesitamos que los detalles activos
   tengan Tipo + Medida + Color + Material.
   ============================================================ */

IF EXISTS (
    SELECT 1
    FROM ventas.PedidoDetalle
    WHERE activo = 1
      AND (
          tipo_producto_id IS NULL
          OR medida_id IS NULL
          OR color_id IS NULL
          OR material_id IS NULL
      )
)
BEGIN
    THROW 50003,
        'Existen detalles de pedido activos sin Tipo, Medida, Color o Material. Corrige esos registros antes de continuar.',
        1;
END;
GO

/* ============================================================
   3. VALIDAR QUE NO EXISTAN PRODUCTOS ACTIVOS DUPLICADOS
   ============================================================ */

IF EXISTS (
    SELECT
        tipo_producto_id,
        material_id,
        medida_id,
        color_id
    FROM catalog.Producto
    WHERE activo = 1
    GROUP BY
        tipo_producto_id,
        material_id,
        medida_id,
        color_id
    HAVING COUNT(*) > 1
)
BEGIN
    THROW 50004,
        'Existen productos activos duplicados por Tipo + Material + Medida + Color. Corrige los duplicados antes de continuar.',
        1;
END;
GO

/* ============================================================
   4. CREAR PRODUCTOS A PARTIR DEL HISTORICO DE PEDIDOS

   La presentacion NO forma parte de la identidad del producto.
   El producto queda definido por:

   Tipo + Material + Medida + Color
   ============================================================ */

INSERT INTO catalog.Producto (
    codigo_producto,
    tipo_producto_id,
    medida_id,
    color_id,
    material_id,
    peso_total_kg,
    presentacion,
    descripcion,
    activo,
    created_by_usuario_id
)
SELECT DISTINCT
    NULL AS codigo_producto,
    pd.tipo_producto_id,
    pd.medida_id,
    pd.color_id,
    pd.material_id,
    NULL AS peso_total_kg,
    NULL AS presentacion,
    NULL AS descripcion,
    1 AS activo,
    NULL AS created_by_usuario_id
FROM ventas.PedidoDetalle pd
WHERE pd.tipo_producto_id IS NOT NULL
  AND pd.medida_id IS NOT NULL
  AND pd.color_id IS NOT NULL
  AND pd.material_id IS NOT NULL
  AND NOT EXISTS (
      SELECT 1
      FROM catalog.Producto p
      WHERE p.activo = 1
        AND p.tipo_producto_id = pd.tipo_producto_id
        AND p.medida_id = pd.medida_id
        AND p.color_id = pd.color_id
        AND p.material_id = pd.material_id
  );
GO

/* ============================================================
   5. VINCULAR PEDIDOS HISTORICOS CON EL CATALOGO DE PRODUCTOS

   Conservamos tambien Tipo/Medida/Color/Material en PedidoDetalle
   como fotografia historica.
   ============================================================ */

UPDATE pd
SET pd.producto_id = p.producto_id
FROM ventas.PedidoDetalle pd
INNER JOIN catalog.Producto p
    ON p.tipo_producto_id = pd.tipo_producto_id
   AND p.medida_id = pd.medida_id
   AND p.color_id = pd.color_id
   AND p.material_id = pd.material_id
   AND p.activo = 1
WHERE pd.producto_id IS NULL
  AND pd.tipo_producto_id IS NOT NULL
  AND pd.medida_id IS NOT NULL
  AND pd.color_id IS NOT NULL
  AND pd.material_id IS NOT NULL;
GO

/* ============================================================
   6. GARANTIZAR UN SOLO PRODUCTO ACTIVO POR COMBINACION

   El orden del indice tambien favorece la futura seleccion en UI:
   Tipo -> Material -> Medida -> Color.
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('catalog.Producto')
      AND name = 'UX_Producto_Activo_Tipo_Material_Medida_Color'
)
BEGIN
    CREATE UNIQUE INDEX UX_Producto_Activo_Tipo_Material_Medida_Color
        ON catalog.Producto (
            tipo_producto_id,
            material_id,
            medida_id,
            color_id
        )
        WHERE activo = 1;
END;
GO

/* ============================================================
   7. INDICE PARA LA RELACION PEDIDODETALLE -> PRODUCTO
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('ventas.PedidoDetalle')
      AND name = 'IX_PedidoDetalle_ProductoId'
)
BEGIN
    CREATE INDEX IX_PedidoDetalle_ProductoId
        ON ventas.PedidoDetalle (producto_id)
        WHERE producto_id IS NOT NULL;
END;
GO

/* ============================================================
   8. VALIDACION FINAL
   ============================================================ */

IF EXISTS (
    SELECT 1
    FROM ventas.PedidoDetalle pd
    WHERE pd.activo = 1
      AND pd.producto_id IS NULL
)
BEGIN
    THROW 50005,
        'La migracion no pudo asociar todos los detalles activos con catalog.Producto.',
        1;
END;
GO
