CREATE DATABASE SistemaGestionDriza;
GO

USE SistemaGestionDriza;
GO

CREATE SCHEMA auth;
GO
CREATE SCHEMA catalog;
GO
CREATE SCHEMA crm;
GO
CREATE SCHEMA ventas;
GO
CREATE SCHEMA finance;
GO
CREATE SCHEMA compras;
GO
CREATE TABLE auth.Rol (
    rol_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion NVARCHAR(200) NULL,
    activo BIT NOT NULL DEFAULT 1
);
GO

CREATE TABLE auth.Usuario (
    usuario_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre_completo NVARCHAR(150) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    activo BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NULL,
    updated_at DATETIME2 NULL,
    updated_by_usuario_id INT NULL,

    CONSTRAINT FK_Usuario_CreatedBy
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id),

    CONSTRAINT FK_Usuario_UpdatedBy
        FOREIGN KEY (updated_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE TABLE auth.UsuarioRol (
    usuario_id INT NOT NULL,
    rol_id INT NOT NULL,

    PRIMARY KEY (usuario_id, rol_id),

    CONSTRAINT FK_UsuarioRol_Usuario
        FOREIGN KEY (usuario_id) REFERENCES auth.Usuario(usuario_id),

    CONSTRAINT FK_UsuarioRol_Rol
        FOREIGN KEY (rol_id) REFERENCES auth.Rol(rol_id)
);
GO

INSERT INTO auth.Rol (nombre, descripcion)
VALUES 
('ADMIN', 'Administrador del sistema. Puede crear usuarios y ver todas las secciones.'),
('VENTAS', 'Gestiona clientes y pedidos.'),
('ALMACEN', 'Gestiona entregas y productos.'),
('FINANZAS', 'Gestiona depósitos y gastos.'),
('COMPRAS', 'Gestiona proveedores y compras.');
GO
CREATE TABLE finance.Moneda (
    moneda_codigo CHAR(3) PRIMARY KEY,
    nombre NVARCHAR(50) NOT NULL,
    simbolo NVARCHAR(10) NOT NULL
);
GO

INSERT INTO finance.Moneda (moneda_codigo, nombre, simbolo)
VALUES
('PEN', 'Soles', 'S/'),
('USD', 'Dólares', '$');
GO
CREATE TABLE catalog.TipoProducto (
    tipo_producto_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(80) NOT NULL UNIQUE,
    activo BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NULL,

    CONSTRAINT FK_TipoProducto_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE TABLE catalog.Medida (
    medida_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(50) NOT NULL UNIQUE,
    activo BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NULL,

    CONSTRAINT FK_Medida_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE TABLE catalog.Color (
    color_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(80) NOT NULL UNIQUE,
    activo BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NULL,

    CONSTRAINT FK_Color_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE TABLE catalog.Material (
    material_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE,
    activo BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NULL,

    CONSTRAINT FK_Material_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE TABLE catalog.UnidadMedida (
    unidad_medida_id INT IDENTITY(1,1) PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre NVARCHAR(80) NOT NULL,
    activo BIT NOT NULL DEFAULT 1
);
GO

INSERT INTO catalog.UnidadMedida (codigo, nombre)
VALUES
('KG', 'Kilogramo'),
('CONO', 'Unidad de cono'),
('ROLLO', 'Rollo'),
('UNIDAD', 'Unidad');
GO

CREATE TABLE catalog.Producto (
    producto_id INT IDENTITY(1,1) PRIMARY KEY,

    codigo_producto VARCHAR(50) NULL,
    tipo_producto_id INT NOT NULL,
    medida_id INT NOT NULL,
    color_id INT NOT NULL,
    material_id INT NOT NULL,

    peso_total_kg DECIMAL(18,3) NULL,
    presentacion NVARCHAR(150) NULL,

    descripcion NVARCHAR(300) NULL,
    activo BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NULL,
    updated_at DATETIME2 NULL,
    updated_by_usuario_id INT NULL,

    CONSTRAINT FK_Producto_Tipo
        FOREIGN KEY (tipo_producto_id) REFERENCES catalog.TipoProducto(tipo_producto_id),

    CONSTRAINT FK_Producto_Medida
        FOREIGN KEY (medida_id) REFERENCES catalog.Medida(medida_id),

    CONSTRAINT FK_Producto_Color
        FOREIGN KEY (color_id) REFERENCES catalog.Color(color_id),

    CONSTRAINT FK_Producto_Material
        FOREIGN KEY (material_id) REFERENCES catalog.Material(material_id),

    CONSTRAINT FK_Producto_CreatedBy
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id),

    CONSTRAINT FK_Producto_UpdatedBy
        FOREIGN KEY (updated_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE UNIQUE INDEX UX_Producto_Codigo
ON catalog.Producto(codigo_producto)
WHERE codigo_producto IS NOT NULL;
GO
CREATE TABLE crm.Cliente (
    cliente_id INT IDENTITY(1,1) PRIMARY KEY,

    ruc VARCHAR(11) NOT NULL,
    razon_social NVARCHAR(200) NOT NULL,
    direccion NVARCHAR(250) NULL,
    telefono VARCHAR(30) NULL,
    correo VARCHAR(150) NULL,

    activo BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NOT NULL,
    updated_at DATETIME2 NULL,
    updated_by_usuario_id INT NULL,

    CONSTRAINT CK_Cliente_RUC
        CHECK (LEN(ruc) = 11 AND ruc NOT LIKE '%[^0-9]%'),

    CONSTRAINT FK_Cliente_CreatedBy
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id),

    CONSTRAINT FK_Cliente_UpdatedBy
        FOREIGN KEY (updated_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE UNIQUE INDEX UX_Cliente_RUC
ON crm.Cliente(ruc);
GO

CREATE TABLE compras.Proveedor (
    proveedor_id INT IDENTITY(1,1) PRIMARY KEY,

    ruc VARCHAR(11) NOT NULL,
    razon_social NVARCHAR(200) NOT NULL,
    direccion NVARCHAR(250) NULL,
    telefono VARCHAR(30) NULL,
    correo VARCHAR(150) NULL,

    activo BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NOT NULL,
    updated_at DATETIME2 NULL,
    updated_by_usuario_id INT NULL,

    CONSTRAINT CK_Proveedor_RUC
        CHECK (LEN(ruc) = 11 AND ruc NOT LIKE '%[^0-9]%'),

    CONSTRAINT FK_Proveedor_CreatedBy
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id),

    CONSTRAINT FK_Proveedor_UpdatedBy
        FOREIGN KEY (updated_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE UNIQUE INDEX UX_Proveedor_RUC
ON compras.Proveedor(ruc);
GO
CREATE TABLE ventas.Pedido (
    pedido_id INT IDENTITY(1,1) PRIMARY KEY,

    cliente_id INT NOT NULL,
    codigo_pedido VARCHAR(50) NULL,

    descripcion_pedido NVARCHAR(500) NULL,
    fecha_pedido DATE NOT NULL,
    fecha_entrega_estimada DATE NULL,

    estado_pedido VARCHAR(30) NOT NULL DEFAULT 'REGISTRADO',

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NOT NULL,
    updated_at DATETIME2 NULL,
    updated_by_usuario_id INT NULL,

    CONSTRAINT CK_Pedido_Estado
        CHECK (estado_pedido IN ('REGISTRADO', 'PARCIAL', 'ENTREGADO', 'CANCELADO')),

    CONSTRAINT FK_Pedido_Cliente
        FOREIGN KEY (cliente_id) REFERENCES crm.Cliente(cliente_id),

    CONSTRAINT FK_Pedido_CreatedBy
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id),

    CONSTRAINT FK_Pedido_UpdatedBy
        FOREIGN KEY (updated_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE UNIQUE INDEX UX_Pedido_Codigo
ON ventas.Pedido(codigo_pedido)
WHERE codigo_pedido IS NOT NULL;
GO
CREATE TABLE ventas.PedidoCambio (
    pedido_cambio_id INT IDENTITY(1,1) PRIMARY KEY,

    pedido_id INT NOT NULL,
    tipo_cambio VARCHAR(40) NOT NULL,
    descripcion_motivo NVARCHAR(500) NOT NULL,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NOT NULL,

    CONSTRAINT CK_PedidoCambio_Tipo
        CHECK (tipo_cambio IN ('CREACION', 'AUMENTO_PRODUCTOS', 'EDICION', 'CANCELACION')),

    CONSTRAINT FK_PedidoCambio_Pedido
        FOREIGN KEY (pedido_id) REFERENCES ventas.Pedido(pedido_id),

    CONSTRAINT FK_PedidoCambio_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE TABLE ventas.PedidoDetalle (
    pedido_detalle_id INT IDENTITY(1,1) PRIMARY KEY,

    pedido_id INT NOT NULL,
    pedido_cambio_id INT NULL,
    producto_id INT NOT NULL,

    cantidad_pedida DECIMAL(18,3) NOT NULL,
    unidad_medida_id INT NOT NULL,

    precio_unitario DECIMAL(18,4) NOT NULL,
    moneda_codigo CHAR(3) NOT NULL,

    observacion NVARCHAR(300) NULL,
    activo BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NOT NULL,

    CONSTRAINT CK_PedidoDetalle_Cantidad
        CHECK (cantidad_pedida > 0),

    CONSTRAINT CK_PedidoDetalle_Precio
        CHECK (precio_unitario >= 0),

    CONSTRAINT FK_PedidoDetalle_Pedido
        FOREIGN KEY (pedido_id) REFERENCES ventas.Pedido(pedido_id),

    CONSTRAINT FK_PedidoDetalle_Cambio
        FOREIGN KEY (pedido_cambio_id) REFERENCES ventas.PedidoCambio(pedido_cambio_id),

    CONSTRAINT FK_PedidoDetalle_Producto
        FOREIGN KEY (producto_id) REFERENCES catalog.Producto(producto_id),

    CONSTRAINT FK_PedidoDetalle_Unidad
        FOREIGN KEY (unidad_medida_id) REFERENCES catalog.UnidadMedida(unidad_medida_id),

    CONSTRAINT FK_PedidoDetalle_Moneda
        FOREIGN KEY (moneda_codigo) REFERENCES finance.Moneda(moneda_codigo),

    CONSTRAINT FK_PedidoDetalle_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO
CREATE TABLE ventas.Entrega (
    entrega_id INT IDENTITY(1,1) PRIMARY KEY,

    pedido_id INT NOT NULL,
    fecha_entrega DATE NOT NULL,
    comentario_entrega NVARCHAR(500) NULL,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NOT NULL,

    CONSTRAINT FK_Entrega_Pedido
        FOREIGN KEY (pedido_id) REFERENCES ventas.Pedido(pedido_id),

    CONSTRAINT FK_Entrega_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE TABLE ventas.EntregaDetalle (
    entrega_detalle_id INT IDENTITY(1,1) PRIMARY KEY,

    entrega_id INT NOT NULL,
    pedido_detalle_id INT NOT NULL,

    cantidad_entregada DECIMAL(18,3) NOT NULL,
    unidad_medida_id INT NOT NULL,

    observacion NVARCHAR(300) NULL,

    CONSTRAINT CK_EntregaDetalle_Cantidad
        CHECK (cantidad_entregada > 0),

    CONSTRAINT FK_EntregaDetalle_Entrega
        FOREIGN KEY (entrega_id) REFERENCES ventas.Entrega(entrega_id),

    CONSTRAINT FK_EntregaDetalle_PedidoDetalle
        FOREIGN KEY (pedido_detalle_id) REFERENCES ventas.PedidoDetalle(pedido_detalle_id),

    CONSTRAINT FK_EntregaDetalle_Unidad
        FOREIGN KEY (unidad_medida_id) REFERENCES catalog.UnidadMedida(unidad_medida_id)
);
GO

CREATE TRIGGER ventas.trg_ValidarEntregaDetalle
ON ventas.EntregaDetalle
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM inserted i
        INNER JOIN ventas.Entrega e 
            ON i.entrega_id = e.entrega_id
        INNER JOIN ventas.PedidoDetalle pd 
            ON i.pedido_detalle_id = pd.pedido_detalle_id
        WHERE e.pedido_id <> pd.pedido_id
    )
    BEGIN
        THROW 50001, 'El detalle entregado no pertenece al pedido de la entrega.', 1;
    END;

    IF EXISTS (
        SELECT 1
        FROM inserted i
        INNER JOIN ventas.PedidoDetalle pd 
            ON i.pedido_detalle_id = pd.pedido_detalle_id
        WHERE i.unidad_medida_id <> pd.unidad_medida_id
    )
    BEGIN
        THROW 50002, 'La unidad de medida entregada debe ser igual a la unidad del pedido.', 1;
    END;

    IF EXISTS (
        SELECT 1
        FROM ventas.PedidoDetalle pd
        INNER JOIN (
            SELECT 
                pedido_detalle_id,
                SUM(cantidad_entregada) AS total_entregado
            FROM ventas.EntregaDetalle
            GROUP BY pedido_detalle_id
        ) ed ON pd.pedido_detalle_id = ed.pedido_detalle_id
        WHERE ed.total_entregado > pd.cantidad_pedida
    )
    BEGIN
        THROW 50003, 'No se puede entregar una cantidad mayor a la cantidad pedida.', 1;
    END;
END;
GO
CREATE TABLE finance.TipoDeposito (
    tipo_deposito_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE,
    activo BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NULL,

    CONSTRAINT FK_TipoDeposito_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

INSERT INTO finance.TipoDeposito (nombre)
VALUES 
('Adelanto'),
('Primer pago'),
('Pago'),
('Saldo'),
('Cancelación total');
GO

CREATE TABLE finance.Deposito (
    deposito_id INT IDENTITY(1,1) PRIMARY KEY,

    pedido_id INT NOT NULL,
    tipo_deposito_id INT NOT NULL,

    fecha_deposito DATE NOT NULL,
    monto DECIMAL(18,2) NOT NULL,
    moneda_codigo CHAR(3) NOT NULL,

    numero_operacion VARCHAR(100) NULL,
    observacion NVARCHAR(300) NULL,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NOT NULL,

    CONSTRAINT CK_Deposito_Monto
        CHECK (monto > 0),

    CONSTRAINT FK_Deposito_Pedido
        FOREIGN KEY (pedido_id) REFERENCES ventas.Pedido(pedido_id),

    CONSTRAINT FK_Deposito_Tipo
        FOREIGN KEY (tipo_deposito_id) REFERENCES finance.TipoDeposito(tipo_deposito_id),

    CONSTRAINT FK_Deposito_Moneda
        FOREIGN KEY (moneda_codigo) REFERENCES finance.Moneda(moneda_codigo),

    CONSTRAINT FK_Deposito_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO
CREATE TABLE finance.TipoGasto (
    tipo_gasto_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE,
    activo BIT NOT NULL DEFAULT 1,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NULL,

    CONSTRAINT FK_TipoGasto_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

INSERT INTO finance.TipoGasto (nombre)
VALUES
('Planilla'),
('Materia prima'),
('Luz'),
('Agua'),
('Alquiler'),
('Transporte'),
('Mantenimiento'),
('Otros');
GO

CREATE TABLE finance.Gasto (
    gasto_id INT IDENTITY(1,1) PRIMARY KEY,

    tipo_gasto_id INT NOT NULL,
    proveedor_id INT NULL,

    fecha_gasto DATE NOT NULL,
    monto DECIMAL(18,2) NOT NULL,
    moneda_codigo CHAR(3) NOT NULL,

    descripcion NVARCHAR(400) NULL,
    comprobante VARCHAR(100) NULL,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NOT NULL,

    CONSTRAINT CK_Gasto_Monto
        CHECK (monto > 0),

    CONSTRAINT FK_Gasto_Tipo
        FOREIGN KEY (tipo_gasto_id) REFERENCES finance.TipoGasto(tipo_gasto_id),

    CONSTRAINT FK_Gasto_Proveedor
        FOREIGN KEY (proveedor_id) REFERENCES compras.Proveedor(proveedor_id),

    CONSTRAINT FK_Gasto_Moneda
        FOREIGN KEY (moneda_codigo) REFERENCES finance.Moneda(moneda_codigo),

    CONSTRAINT FK_Gasto_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE TABLE compras.Compra (
    compra_id INT IDENTITY(1,1) PRIMARY KEY,

    proveedor_id INT NOT NULL,

    fecha_compra DATE NOT NULL,
    numero_documento VARCHAR(100) NULL,

    monto_total DECIMAL(18,2) NOT NULL,
    moneda_codigo CHAR(3) NOT NULL,

    descripcion NVARCHAR(400) NULL,

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    created_by_usuario_id INT NOT NULL,

    CONSTRAINT CK_Compra_Monto
        CHECK (monto_total > 0),

    CONSTRAINT FK_Compra_Proveedor
        FOREIGN KEY (proveedor_id) REFERENCES compras.Proveedor(proveedor_id),

    CONSTRAINT FK_Compra_Moneda
        FOREIGN KEY (moneda_codigo) REFERENCES finance.Moneda(moneda_codigo),

    CONSTRAINT FK_Compra_Usuario
        FOREIGN KEY (created_by_usuario_id) REFERENCES auth.Usuario(usuario_id)
);
GO

CREATE TABLE compras.CompraDetalle (
    compra_detalle_id INT IDENTITY(1,1) PRIMARY KEY,

    compra_id INT NOT NULL,

    producto_id INT NULL,
    material_id INT NULL,

    descripcion_item NVARCHAR(300) NULL,

    cantidad DECIMAL(18,3) NOT NULL,
    unidad_medida_id INT NOT NULL,
    precio_unitario DECIMAL(18,4) NOT NULL,

    subtotal AS (cantidad * precio_unitario) PERSISTED,

    CONSTRAINT CK_CompraDetalle_Cantidad
        CHECK (cantidad > 0),

    CONSTRAINT CK_CompraDetalle_Precio
        CHECK (precio_unitario >= 0),

    CONSTRAINT FK_CompraDetalle_Compra
        FOREIGN KEY (compra_id) REFERENCES compras.Compra(compra_id),

    CONSTRAINT FK_CompraDetalle_Producto
        FOREIGN KEY (producto_id) REFERENCES catalog.Producto(producto_id),

    CONSTRAINT FK_CompraDetalle_Material
        FOREIGN KEY (material_id) REFERENCES catalog.Material(material_id),

    CONSTRAINT FK_CompraDetalle_Unidad
        FOREIGN KEY (unidad_medida_id) REFERENCES catalog.UnidadMedida(unidad_medida_id)
);
GO

CREATE VIEW ventas.v_PedidoDetalleSaldo AS
SELECT
    pd.pedido_detalle_id,
    pd.pedido_id,
    p.codigo_pedido,
    pd.producto_id,
    pd.cantidad_pedida,
    ISNULL(SUM(ed.cantidad_entregada), 0) AS cantidad_entregada,
    pd.cantidad_pedida - ISNULL(SUM(ed.cantidad_entregada), 0) AS cantidad_pendiente,
    pd.unidad_medida_id,
    um.codigo AS unidad,
    pd.precio_unitario,
    pd.moneda_codigo
FROM ventas.PedidoDetalle pd
INNER JOIN ventas.Pedido p 
    ON pd.pedido_id = p.pedido_id
INNER JOIN catalog.UnidadMedida um 
    ON pd.unidad_medida_id = um.unidad_medida_id
LEFT JOIN ventas.EntregaDetalle ed 
    ON pd.pedido_detalle_id = ed.pedido_detalle_id
GROUP BY
    pd.pedido_detalle_id,
    pd.pedido_id,
    p.codigo_pedido,
    pd.producto_id,
    pd.cantidad_pedida,
    pd.unidad_medida_id,
    um.codigo,
    pd.precio_unitario,
    pd.moneda_codigo;
GO

CREATE VIEW ventas.v_PedidoEstadoPago AS
SELECT
    p.pedido_id,
    p.codigo_pedido,
    c.razon_social,
    pd.moneda_codigo,

    SUM(pd.cantidad_pedida * pd.precio_unitario) AS total_pedido,

    ISNULL(dep.total_depositado, 0) AS total_depositado,

    SUM(pd.cantidad_pedida * pd.precio_unitario) - ISNULL(dep.total_depositado, 0) AS saldo_pendiente
FROM ventas.Pedido p
INNER JOIN crm.Cliente c 
    ON p.cliente_id = c.cliente_id
INNER JOIN ventas.PedidoDetalle pd 
    ON p.pedido_id = pd.pedido_id
LEFT JOIN (
    SELECT
        pedido_id,
        moneda_codigo,
        SUM(monto) AS total_depositado
    FROM finance.Deposito
    GROUP BY pedido_id, moneda_codigo
) dep 
    ON p.pedido_id = dep.pedido_id
   AND pd.moneda_codigo = dep.moneda_codigo
GROUP BY
    p.pedido_id,
    p.codigo_pedido,
    c.razon_social,
    pd.moneda_codigo,
    dep.total_depositado;
GO