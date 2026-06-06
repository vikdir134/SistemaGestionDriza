USE SistemaGestionDriza;
GO

-- Agregar unidades adicionales
IF NOT EXISTS (SELECT 1 FROM catalog.UnidadMedida WHERE codigo = 'LITRO')
BEGIN
    INSERT INTO catalog.UnidadMedida (codigo, nombre)
    VALUES ('LITRO', 'Litro');
END
GO

IF NOT EXISTS (SELECT 1 FROM catalog.UnidadMedida WHERE codigo = 'TUBO')
BEGIN
    INSERT INTO catalog.UnidadMedida (codigo, nombre)
    VALUES ('TUBO', 'Tubo');
END
GO

IF NOT EXISTS (SELECT 1 FROM catalog.UnidadMedida WHERE codigo = 'CONO')
BEGIN
    INSERT INTO catalog.UnidadMedida (codigo, nombre)
    VALUES ('CONO', 'Cono');
END
GO

IF NOT EXISTS (SELECT 1 FROM catalog.UnidadMedida WHERE codigo = 'KG')
BEGIN
    INSERT INTO catalog.UnidadMedida (codigo, nombre)
    VALUES ('KG', 'Kilogramo');
END
GO


-- Permitir que producto_id sea opcional, porque ya no usaremos producto fijo
ALTER TABLE ventas.PedidoDetalle
ALTER COLUMN producto_id INT NULL;
GO

-- Agregar atributos del producto directamente al detalle del pedido
ALTER TABLE ventas.PedidoDetalle
ADD 
    tipo_producto_id INT NULL,
    medida_id INT NULL,
    color_id INT NULL,
    material_id INT NULL,
    cantidad_presentacion DECIMAL(18,3) NULL,
    unidad_presentacion_id INT NULL,
    descripcion_item NVARCHAR(300) NULL;
GO

ALTER TABLE ventas.PedidoDetalle
ADD CONSTRAINT FK_PedidoDetalle_TipoProducto
FOREIGN KEY (tipo_producto_id) REFERENCES catalog.TipoProducto(tipo_producto_id);
GO

ALTER TABLE ventas.PedidoDetalle
ADD CONSTRAINT FK_PedidoDetalle_Medida
FOREIGN KEY (medida_id) REFERENCES catalog.Medida(medida_id);
GO

ALTER TABLE ventas.PedidoDetalle
ADD CONSTRAINT FK_PedidoDetalle_Color
FOREIGN KEY (color_id) REFERENCES catalog.Color(color_id);
GO

ALTER TABLE ventas.PedidoDetalle
ADD CONSTRAINT FK_PedidoDetalle_Material
FOREIGN KEY (material_id) REFERENCES catalog.Material(material_id);
GO

ALTER TABLE ventas.PedidoDetalle
ADD CONSTRAINT FK_PedidoDetalle_UnidadPresentacion
FOREIGN KEY (unidad_presentacion_id) REFERENCES catalog.UnidadMedida(unidad_medida_id);
GO