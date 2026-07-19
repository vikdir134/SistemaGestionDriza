USE SistemaGestionDriza;
GO

IF OBJECT_ID('crm.ClientePrecioHistorial', 'U') IS NULL
BEGIN
    CREATE TABLE crm.ClientePrecioHistorial (
        precio_cliente_id INT IDENTITY(1,1) PRIMARY KEY,

        cliente_id INT NOT NULL,
        tipo_producto_id INT NOT NULL,
        medida_id INT NOT NULL,
        color_id INT NOT NULL,
        material_id INT NOT NULL,

        fecha_precio DATE NOT NULL,
        precio_unitario DECIMAL(18,4) NOT NULL,
        moneda_codigo CHAR(3) NOT NULL,

        observacion NVARCHAR(300) NULL,
        activo BIT NOT NULL DEFAULT 1,

        created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
        created_by_usuario_id INT NOT NULL,

        CONSTRAINT FK_ClientePrecioHistorial_Cliente
            FOREIGN KEY (cliente_id) REFERENCES crm.Cliente(cliente_id),

        CONSTRAINT FK_ClientePrecioHistorial_TipoProducto
            FOREIGN KEY (tipo_producto_id) REFERENCES catalog.TipoProducto(tipo_producto_id),

        CONSTRAINT FK_ClientePrecioHistorial_Medida
            FOREIGN KEY (medida_id) REFERENCES catalog.Medida(medida_id),

        CONSTRAINT FK_ClientePrecioHistorial_Color
            FOREIGN KEY (color_id) REFERENCES catalog.Color(color_id),

        CONSTRAINT FK_ClientePrecioHistorial_Material
            FOREIGN KEY (material_id) REFERENCES catalog.Material(material_id),

        CONSTRAINT FK_ClientePrecioHistorial_Usuario
            FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id),

        CONSTRAINT CK_ClientePrecioHistorial_Moneda
            CHECK (moneda_codigo IN ('PEN', 'USD')),

        CONSTRAINT CK_ClientePrecioHistorial_Precio
            CHECK (precio_unitario > 0)
    );
END
GO