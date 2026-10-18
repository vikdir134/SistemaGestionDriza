-- Exportacion de estructura, sin datos. Fecha UTC: 2026-10-18T20:36:02
CREATE SCHEMA [auth] AUTHORIZATION [dbo];
GO
CREATE SCHEMA [catalog] AUTHORIZATION [dbo];
GO
CREATE SCHEMA [compras] AUTHORIZATION [dbo];
GO
CREATE SCHEMA [crm] AUTHORIZATION [dbo];
GO
CREATE SCHEMA [finance] AUTHORIZATION [dbo];
GO
CREATE SCHEMA [inventario] AUTHORIZATION [dbo];
GO
CREATE SCHEMA [produccion] AUTHORIZATION [dbo];
GO
CREATE SCHEMA [ventas] AUTHORIZATION [dbo];
GO
/****** Cannot script Unresolved Entities : Server[@Name='Vikdir\SQLEXPRESS']/Database[@Name='SistemaGestionDriza']/UnresolvedEntity[@Name='deleted'] ******/
GO
/****** Cannot script Unresolved Entities : Server[@Name='Vikdir\SQLEXPRESS']/Database[@Name='SistemaGestionDriza']/UnresolvedEntity[@Name='inserted'] ******/
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ventas].[PedidoDetalle](
	[pedido_detalle_id] [int] IDENTITY(1,1) NOT NULL,
	[pedido_id] [int] NOT NULL,
	[pedido_cambio_id] [int] NULL,
	[producto_id] [int] NULL,
	[cantidad_pedida] [decimal](18, 3) NOT NULL,
	[unidad_medida_id] [int] NOT NULL,
	[precio_unitario] [decimal](18, 4) NOT NULL,
	[moneda_codigo] [char](3) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[observacion] [nvarchar](300) COLLATE Modern_Spanish_CI_AS NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[tipo_producto_id] [int] NULL,
	[medida_id] [int] NULL,
	[color_id] [int] NULL,
	[material_id] [int] NULL,
	[cantidad_presentacion] [decimal](18, 3) NULL,
	[unidad_presentacion_id] [int] NULL,
	[descripcion_item] [nvarchar](300) COLLATE Modern_Spanish_CI_AS NULL,
PRIMARY KEY CLUSTERED 
(
	[pedido_detalle_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ventas].[EntregaDetalle](
	[entrega_detalle_id] [int] IDENTITY(1,1) NOT NULL,
	[entrega_id] [int] NOT NULL,
	[pedido_detalle_id] [int] NOT NULL,
	[cantidad_entregada] [decimal](18, 3) NOT NULL,
	[unidad_medida_id] [int] NOT NULL,
	[observacion] [nvarchar](300) COLLATE Modern_Spanish_CI_AS NULL,
PRIMARY KEY CLUSTERED 
(
	[entrega_detalle_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [catalog].[UnidadMedida](
	[unidad_medida_id] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [varchar](20) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[nombre] [nvarchar](80) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[unidad_medida_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ventas].[Pedido](
	[pedido_id] [int] IDENTITY(1,1) NOT NULL,
	[cliente_id] [int] NOT NULL,
	[codigo_pedido] [varchar](50) COLLATE Modern_Spanish_CI_AS NULL,
	[descripcion_pedido] [nvarchar](500) COLLATE Modern_Spanish_CI_AS NULL,
	[fecha_pedido] [date] NOT NULL,
	[fecha_entrega_estimada] [date] NULL,
	[estado_pedido] [varchar](30) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[updated_at] [datetime2](7) NULL,
	[updated_by_usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[pedido_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [finance].[Deposito](
	[deposito_id] [int] IDENTITY(1,1) NOT NULL,
	[pedido_id] [int] NOT NULL,
	[tipo_deposito_id] [int] NOT NULL,
	[fecha_deposito] [date] NOT NULL,
	[monto] [decimal](18, 2) NOT NULL,
	[moneda_codigo] [char](3) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[numero_operacion] [varchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[observacion] [nvarchar](300) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[deposito_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [crm].[Cliente](
	[cliente_id] [int] IDENTITY(1,1) NOT NULL,
	[ruc] [varchar](11) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[razon_social] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[direccion] [nvarchar](250) COLLATE Modern_Spanish_CI_AS NULL,
	[telefono] [varchar](30) COLLATE Modern_Spanish_CI_AS NULL,
	[correo] [varchar](150) COLLATE Modern_Spanish_CI_AS NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[updated_at] [datetime2](7) NULL,
	[updated_by_usuario_id] [int] NULL,
	[agencia_entrega] [nvarchar](150) COLLATE Modern_Spanish_CI_AS NULL,
PRIMARY KEY CLUSTERED 
(
	[cliente_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [auth].[Rol](
	[rol_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[descripcion] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NULL,
	[activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[rol_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [auth].[Usuario](
	[usuario_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre_completo] [nvarchar](150) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[correo] [varchar](150) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[password_hash] [nvarchar](255) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NULL,
	[updated_at] [datetime2](7) NULL,
	[updated_by_usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[usuario_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[correo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [inventario].[Merma](
	[merma_id] [int] IDENTITY(1,1) NOT NULL,
	[fecha_merma] [date] NOT NULL,
	[observacion] [nvarchar](500) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[idempotency_key] [varchar](100) COLLATE Modern_Spanish_CI_AS NULL,
 CONSTRAINT [PK_Merma] PRIMARY KEY CLUSTERED 
(
	[merma_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [finance].[Moneda](
	[moneda_codigo] [char](3) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[nombre] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[simbolo] [nvarchar](10) COLLATE Modern_Spanish_CI_AS NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[moneda_codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MigracionBD](
	[migracion_id] [int] IDENTITY(1,1) NOT NULL,
	[archivo] [nvarchar](260) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[checksum] [char](64) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[aplicado_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_MigracionBD] PRIMARY KEY CLUSTERED 
(
	[migracion_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_MigracionBD_Archivo] UNIQUE NONCLUSTERED 
(
	[archivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [finance].[Inversion](
	[inversion_id] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [date] NOT NULL,
	[aportante] [nvarchar](180) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[motivo] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[descripcion] [nvarchar](1000) COLLATE Modern_Spanish_CI_AS NULL,
	[monto] [decimal](18, 2) NOT NULL,
	[moneda_codigo] [char](3) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[idempotency_key] [uniqueidentifier] NOT NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[updated_at] [datetime2](7) NULL,
	[updated_by_usuario_id] [int] NULL,
 CONSTRAINT [PK_FinInversion] PRIMARY KEY CLUSTERED 
(
	[inversion_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_FinInversion_Idem] UNIQUE NONCLUSTERED 
(
	[idempotency_key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [catalog].[Medida](
	[medida_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[medida_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [catalog].[Material](
	[material_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[material_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [catalog].[ProductoComposicionDetalle](
	[producto_composicion_detalle_id] [int] IDENTITY(1,1) NOT NULL,
	[producto_composicion_id] [int] NOT NULL,
	[material_id] [int] NOT NULL,
	[color_id] [int] NOT NULL,
	[porcentaje] [decimal](9, 6) NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
 CONSTRAINT [PK_ProductoComposicionDetalle] PRIMARY KEY CLUSTERED 
(
	[producto_composicion_detalle_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_ProductoComposicionDetalle_Ingrediente] UNIQUE NONCLUSTERED 
(
	[producto_composicion_id] ASC,
	[material_id] ASC,
	[color_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [inventario].[MermaDetalle](
	[merma_detalle_id] [int] IDENTITY(1,1) NOT NULL,
	[merma_id] [int] NOT NULL,
	[material_id] [int] NOT NULL,
	[color_id] [int] NOT NULL,
	[cantidad] [decimal](18, 3) NOT NULL,
	[unidad_medida_id] [int] NOT NULL,
	[observacion] [nvarchar](300) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
 CONSTRAINT [PK_MermaDetalle] PRIMARY KEY CLUSTERED 
(
	[merma_detalle_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_MermaDetalle_MateriaPrima] UNIQUE NONCLUSTERED 
(
	[merma_id] ASC,
	[material_id] ASC,
	[color_id] ASC,
	[unidad_medida_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [catalog].[Color](
	[color_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](80) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[color_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [catalog].[TipoProducto](
	[tipo_producto_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](80) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[tipo_producto_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [finance].[TipoGasto](
	[tipo_gasto_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[tipo_gasto_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [finance].[TipoDeposito](
	[tipo_deposito_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[tipo_deposito_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [finance].[Prestamo](
	[prestamo_id] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [date] NOT NULL,
	[direccion] [varchar](10) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[modalidad] [varchar](12) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[contraparte] [nvarchar](180) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[descripcion] [nvarchar](1000) COLLATE Modern_Spanish_CI_AS NULL,
	[capital] [decimal](18, 2) NOT NULL,
	[moneda_codigo] [char](3) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[tiene_interes] [bit] NOT NULL,
	[interes_acordado] [decimal](18, 2) NULL,
	[tasa_anual_pct] [decimal](9, 5) NULL,
	[calculo_tasa] [varchar](20) COLLATE Modern_Spanish_CI_AS NULL,
	[sistema_amortizacion] [varchar](10) COLLATE Modern_Spanish_CI_AS NULL,
	[cronograma_tipo] [varchar](10) COLLATE Modern_Spanish_CI_AS NULL,
	[plazo_meses] [int] NULL,
	[primer_vencimiento] [date] NULL,
	[idempotency_key] [uniqueidentifier] NOT NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[updated_at] [datetime2](7) NULL,
	[updated_by_usuario_id] [int] NULL,
 CONSTRAINT [PK_FinPrestamo] PRIMARY KEY CLUSTERED 
(
	[prestamo_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_FinPrestamo_Idem] UNIQUE NONCLUSTERED 
(
	[idempotency_key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [produccion].[Produccion](
	[produccion_id] [int] IDENTITY(1,1) NOT NULL,
	[fecha_produccion] [date] NOT NULL,
	[observacion] [nvarchar](500) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[idempotency_key] [varchar](100) COLLATE Modern_Spanish_CI_AS NULL,
 CONSTRAINT [PK_Produccion] PRIMARY KEY CLUSTERED 
(
	[produccion_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [auth].[UsuarioRol](
	[usuario_id] [int] NOT NULL,
	[rol_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[usuario_id] ASC,
	[rol_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [compras].[Proveedor](
	[proveedor_id] [int] IDENTITY(1,1) NOT NULL,
	[ruc] [varchar](11) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[razon_social] [nvarchar](200) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[direccion] [nvarchar](250) COLLATE Modern_Spanish_CI_AS NULL,
	[telefono] [varchar](30) COLLATE Modern_Spanish_CI_AS NULL,
	[correo] [varchar](150) COLLATE Modern_Spanish_CI_AS NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[updated_at] [datetime2](7) NULL,
	[updated_by_usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[proveedor_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [finance].[PrestamoCuota](
	[cuota_id] [int] IDENTITY(1,1) NOT NULL,
	[prestamo_id] [int] NOT NULL,
	[numero] [int] NOT NULL,
	[fecha_vencimiento] [date] NOT NULL,
	[capital_programado] [decimal](18, 2) NOT NULL,
	[interes_programado] [decimal](18, 2) NOT NULL,
	[cargos_programados] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_FinPrestamoCuota] PRIMARY KEY CLUSTERED 
(
	[cuota_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_FinPrestamoCuota_Numero] UNIQUE NONCLUSTERED 
(
	[prestamo_id] ASC,
	[numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_FinPrestamoCuota_Par] UNIQUE NONCLUSTERED 
(
	[prestamo_id] ASC,
	[cuota_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [catalog].[ProductoComposicion](
	[producto_composicion_id] [int] IDENTITY(1,1) NOT NULL,
	[producto_id] [int] NOT NULL,
	[version_numero] [int] NOT NULL,
	[vigente] [bit] NOT NULL,
	[fecha_vigencia_desde] [datetime2](7) NULL,
	[fecha_vigencia_hasta] [datetime2](7) NULL,
	[observacion] [nvarchar](400) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[updated_at] [datetime2](7) NULL,
	[updated_by_usuario_id] [int] NULL,
 CONSTRAINT [PK_ProductoComposicion] PRIMARY KEY CLUSTERED 
(
	[producto_composicion_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_ProductoComposicion_Producto_Version] UNIQUE NONCLUSTERED 
(
	[producto_id] ASC,
	[version_numero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [produccion].[ProduccionDetalle](
	[produccion_detalle_id] [int] IDENTITY(1,1) NOT NULL,
	[produccion_id] [int] NOT NULL,
	[producto_id] [int] NOT NULL,
	[producto_composicion_id] [int] NOT NULL,
	[cantidad_producida] [decimal](18, 3) NOT NULL,
	[unidad_medida_id] [int] NOT NULL,
	[cantidad_presentacion] [decimal](18, 3) NOT NULL,
	[unidad_presentacion_id] [int] NOT NULL,
	[observacion] [nvarchar](300) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
 CONSTRAINT [PK_ProduccionDetalle] PRIMARY KEY CLUSTERED 
(
	[produccion_detalle_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [catalog].[Producto](
	[producto_id] [int] IDENTITY(1,1) NOT NULL,
	[codigo_producto] [varchar](50) COLLATE Modern_Spanish_CI_AS NULL,
	[tipo_producto_id] [int] NOT NULL,
	[medida_id] [int] NOT NULL,
	[color_id] [int] NOT NULL,
	[material_id] [int] NOT NULL,
	[peso_total_kg] [decimal](18, 3) NULL,
	[presentacion] [nvarchar](150) COLLATE Modern_Spanish_CI_AS NULL,
	[descripcion] [nvarchar](300) COLLATE Modern_Spanish_CI_AS NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NULL,
	[updated_at] [datetime2](7) NULL,
	[updated_by_usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[producto_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [finance].[Gasto](
	[gasto_id] [int] IDENTITY(1,1) NOT NULL,
	[tipo_gasto_id] [int] NOT NULL,
	[proveedor_id] [int] NULL,
	[fecha_gasto] [date] NOT NULL,
	[monto] [decimal](18, 2) NOT NULL,
	[moneda_codigo] [char](3) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[descripcion] [nvarchar](400) COLLATE Modern_Spanish_CI_AS NULL,
	[comprobante] [varchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[activo] [bit] NOT NULL,
	[updated_at] [datetime2](7) NULL,
	[updated_by_usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[gasto_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [crm].[ClientePrecioHistorial](
	[precio_cliente_id] [int] IDENTITY(1,1) NOT NULL,
	[cliente_id] [int] NOT NULL,
	[tipo_producto_id] [int] NOT NULL,
	[medida_id] [int] NOT NULL,
	[color_id] [int] NOT NULL,
	[material_id] [int] NOT NULL,
	[fecha_precio] [date] NOT NULL,
	[precio_unitario] [decimal](18, 4) NOT NULL,
	[moneda_codigo] [char](3) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[observacion] [nvarchar](300) COLLATE Modern_Spanish_CI_AS NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[pedido_id] [int] NULL,
	[pedido_detalle_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[precio_cliente_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [compras].[Compra](
	[compra_id] [int] IDENTITY(1,1) NOT NULL,
	[proveedor_id] [int] NOT NULL,
	[fecha_compra] [date] NOT NULL,
	[numero_documento] [varchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[monto_total] [decimal](18, 2) NOT NULL,
	[moneda_codigo] [char](3) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[descripcion] [nvarchar](400) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[compra_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [compras].[CompraMateriaPrima](
	[compra_materia_prima_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre_lote] [nvarchar](150) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[proveedor_id] [int] NOT NULL,
	[fecha_compra] [date] NOT NULL,
	[numero_documento] [varchar](100) COLLATE Modern_Spanish_CI_AS NULL,
	[monto_total] [decimal](18, 2) NOT NULL,
	[moneda_codigo] [char](3) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[descripcion] [nvarchar](400) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[idempotency_key] [varchar](100) COLLATE Modern_Spanish_CI_AS NULL,
 CONSTRAINT [PK_CompraMateriaPrima] PRIMARY KEY CLUSTERED 
(
	[compra_materia_prima_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [finance].[InversionRetiro](
	[inversion_retiro_id] [int] IDENTITY(1,1) NOT NULL,
	[inversion_id] [int] NOT NULL,
	[fecha] [date] NOT NULL,
	[monto] [decimal](18, 2) NOT NULL,
	[observacion] [nvarchar](500) COLLATE Modern_Spanish_CI_AS NULL,
	[idempotency_key] [uniqueidentifier] NOT NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[anulado_at] [datetime2](7) NULL,
	[anulado_by_usuario_id] [int] NULL,
 CONSTRAINT [PK_FinInversionRetiro] PRIMARY KEY CLUSTERED 
(
	[inversion_retiro_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_FinInversionRetiro_Idem] UNIQUE NONCLUSTERED 
(
	[idempotency_key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ventas].[PedidoCambio](
	[pedido_cambio_id] [int] IDENTITY(1,1) NOT NULL,
	[pedido_id] [int] NOT NULL,
	[tipo_cambio] [varchar](40) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[descripcion_motivo] [nvarchar](500) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[pedido_cambio_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [compras].[CompraDetalle](
	[compra_detalle_id] [int] IDENTITY(1,1) NOT NULL,
	[compra_id] [int] NOT NULL,
	[producto_id] [int] NULL,
	[material_id] [int] NULL,
	[descripcion_item] [nvarchar](300) COLLATE Modern_Spanish_CI_AS NULL,
	[cantidad] [decimal](18, 3) NOT NULL,
	[unidad_medida_id] [int] NOT NULL,
	[precio_unitario] [decimal](18, 4) NOT NULL,
	[subtotal]  AS ([cantidad]*[precio_unitario]) PERSISTED,
PRIMARY KEY CLUSTERED 
(
	[compra_detalle_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ventas].[Entrega](
	[entrega_id] [int] IDENTITY(1,1) NOT NULL,
	[pedido_id] [int] NOT NULL,
	[fecha_entrega] [date] NOT NULL,
	[comentario_entrega] [nvarchar](500) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[idempotency_key] [varchar](100) COLLATE Modern_Spanish_CI_AS NULL,
PRIMARY KEY CLUSTERED 
(
	[entrega_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [compras].[CompraMateriaPrimaDetalle](
	[compra_materia_prima_detalle_id] [int] IDENTITY(1,1) NOT NULL,
	[compra_materia_prima_id] [int] NOT NULL,
	[material_id] [int] NOT NULL,
	[color_id] [int] NOT NULL,
	[descripcion_item] [nvarchar](300) COLLATE Modern_Spanish_CI_AS NULL,
	[cantidad] [decimal](18, 3) NOT NULL,
	[unidad_medida_id] [int] NOT NULL,
	[precio_unitario] [decimal](18, 4) NOT NULL,
	[subtotal]  AS (CONVERT([decimal](38,7),[cantidad]*[precio_unitario])) PERSISTED,
 CONSTRAINT [PK_CompraMateriaPrimaDetalle] PRIMARY KEY CLUSTERED 
(
	[compra_materia_prima_detalle_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [finance].[PrestamoPago](
	[pago_id] [int] IDENTITY(1,1) NOT NULL,
	[prestamo_id] [int] NOT NULL,
	[cuota_id] [int] NULL,
	[fecha] [date] NOT NULL,
	[capital_pagado] [decimal](18, 2) NOT NULL,
	[interes_pagado] [decimal](18, 2) NOT NULL,
	[cargos_pagados] [decimal](18, 2) NOT NULL,
	[observacion] [nvarchar](500) COLLATE Modern_Spanish_CI_AS NULL,
	[idempotency_key] [uniqueidentifier] NOT NULL,
	[activo] [bit] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[anulado_at] [datetime2](7) NULL,
	[anulado_by_usuario_id] [int] NULL,
 CONSTRAINT [PK_FinPrestamoPago] PRIMARY KEY CLUSTERED 
(
	[pago_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_FinPrestamoPago_Idem] UNIQUE NONCLUSTERED 
(
	[idempotency_key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [inventario].[StockProductoTerminado](
	[stock_producto_terminado_id] [int] IDENTITY(1,1) NOT NULL,
	[producto_id] [int] NOT NULL,
	[unidad_medida_id] [int] NOT NULL,
	[cantidad_presentacion] [decimal](18, 3) NOT NULL,
	[unidad_presentacion_id] [int] NOT NULL,
	[cantidad_disponible] [decimal](18, 3) NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[updated_at] [datetime2](7) NULL,
	[updated_by_usuario_id] [int] NULL,
 CONSTRAINT [PK_StockProductoTerminado] PRIMARY KEY CLUSTERED 
(
	[stock_producto_terminado_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_StockProductoTerminado_ProductoPresentacion] UNIQUE NONCLUSTERED 
(
	[producto_id] ASC,
	[unidad_medida_id] ASC,
	[cantidad_presentacion] ASC,
	[unidad_presentacion_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [inventario].[MovimientoMateriaPrima](
	[movimiento_materia_prima_id] [int] IDENTITY(1,1) NOT NULL,
	[stock_materia_prima_lote_id] [int] NOT NULL,
	[tipo_movimiento] [varchar](30) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[cantidad] [decimal](18, 3) NOT NULL,
	[fecha_movimiento] [datetime2](7) NOT NULL,
	[observacion] [nvarchar](400) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[produccion_detalle_id] [int] NULL,
	[merma_detalle_id] [int] NULL,
 CONSTRAINT [PK_MovimientoMateriaPrima] PRIMARY KEY CLUSTERED 
(
	[movimiento_materia_prima_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [inventario].[StockMateriaPrimaLote](
	[stock_materia_prima_lote_id] [int] IDENTITY(1,1) NOT NULL,
	[compra_materia_prima_detalle_id] [int] NOT NULL,
	[cantidad_inicial] [decimal](18, 3) NOT NULL,
	[cantidad_disponible] [decimal](18, 3) NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
	[updated_at] [datetime2](7) NULL,
	[updated_by_usuario_id] [int] NULL,
 CONSTRAINT [PK_StockMateriaPrimaLote] PRIMARY KEY CLUSTERED 
(
	[stock_materia_prima_lote_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_StockMateriaPrimaLote_CompraDetalle] UNIQUE NONCLUSTERED 
(
	[compra_materia_prima_detalle_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [inventario].[MovimientoProductoTerminado](
	[movimiento_producto_terminado_id] [int] IDENTITY(1,1) NOT NULL,
	[stock_producto_terminado_id] [int] NOT NULL,
	[tipo_movimiento] [varchar](30) COLLATE Modern_Spanish_CI_AS NOT NULL,
	[cantidad] [decimal](18, 3) NOT NULL,
	[fecha_movimiento] [datetime2](7) NOT NULL,
	[produccion_detalle_id] [int] NULL,
	[entrega_detalle_id] [int] NULL,
	[observacion] [nvarchar](400) COLLATE Modern_Spanish_CI_AS NULL,
	[created_at] [datetime2](7) NOT NULL,
	[created_by_usuario_id] [int] NOT NULL,
 CONSTRAINT [PK_MovimientoProductoTerminado] PRIMARY KEY CLUSTERED 
(
	[movimiento_producto_terminado_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
CREATE NONCLUSTERED INDEX [IX_Merma_Fecha] ON [inventario].[Merma]
(
	[fecha_merma] DESC,
	[merma_id] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_Merma_IdempotencyKey] ON [inventario].[Merma]
(
	[idempotency_key] ASC
)
WHERE ([idempotency_key] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_FinInversion_Fecha] ON [finance].[Inversion]
(
	[fecha] DESC,
	[inversion_id] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_Cliente_RUC] ON [crm].[Cliente]
(
	[ruc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_ProductoComposicionDetalle_Composicion] ON [catalog].[ProductoComposicionDetalle]
(
	[producto_composicion_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_ProductoComposicionDetalle_Material_Color] ON [catalog].[ProductoComposicionDetalle]
(
	[material_id] ASC,
	[color_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_MermaDetalle_Material_Color] ON [inventario].[MermaDetalle]
(
	[material_id] ASC,
	[color_id] ASC,
	[unidad_medida_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_MermaDetalle_Merma] ON [inventario].[MermaDetalle]
(
	[merma_id] ASC,
	[merma_detalle_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
CREATE NONCLUSTERED INDEX [IX_FinPrestamo_Filtro] ON [finance].[Prestamo]
(
	[activo] ASC,
	[direccion] ASC,
	[modalidad] ASC,
	[fecha] DESC,
	[prestamo_id] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_Produccion_Fecha] ON [produccion].[Produccion]
(
	[fecha_produccion] DESC,
	[produccion_id] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_Produccion_IdempotencyKey] ON [produccion].[Produccion]
(
	[idempotency_key] ASC
)
WHERE ([idempotency_key] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_Proveedor_RUC] ON [compras].[Proveedor]
(
	[ruc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_FinPrestamoCuota_Prestamo] ON [finance].[PrestamoCuota]
(
	[prestamo_id] ASC,
	[fecha_vencimiento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_ProductoComposicion_Producto_Version] ON [catalog].[ProductoComposicion]
(
	[producto_id] ASC,
	[version_numero] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_ProductoComposicion_Producto_Vigente] ON [catalog].[ProductoComposicion]
(
	[producto_id] ASC
)
WHERE ([vigente]=(1))
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_ProduccionDetalle_Produccion] ON [produccion].[ProduccionDetalle]
(
	[produccion_id] ASC,
	[produccion_detalle_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_ProduccionDetalle_Producto] ON [produccion].[ProduccionDetalle]
(
	[producto_id] ASC,
	[created_at] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_Producto_Activo_Tipo_Material_Medida_Color] ON [catalog].[Producto]
(
	[tipo_producto_id] ASC,
	[material_id] ASC,
	[medida_id] ASC,
	[color_id] ASC
)
WHERE ([activo]=(1))
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_Producto_Codigo] ON [catalog].[Producto]
(
	[codigo_producto] ASC
)
WHERE ([codigo_producto] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_Gasto_Activo_CreatedAt] ON [finance].[Gasto]
(
	[activo] ASC,
	[created_at] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_CompraMateriaPrima_FechaCompra] ON [compras].[CompraMateriaPrima]
(
	[fecha_compra] ASC,
	[compra_materia_prima_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_CompraMateriaPrima_Proveedor] ON [compras].[CompraMateriaPrima]
(
	[proveedor_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_CompraMateriaPrima_IdempotencyKey] ON [compras].[CompraMateriaPrima]
(
	[idempotency_key] ASC
)
WHERE ([idempotency_key] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_FinInversionRetiro_Inversion] ON [finance].[InversionRetiro]
(
	[inversion_id] ASC,
	[activo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_Pedido_Codigo] ON [ventas].[Pedido]
(
	[codigo_pedido] ASC
)
WHERE ([codigo_pedido] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_Entrega_IdempotencyKey] ON [ventas].[Entrega]
(
	[idempotency_key] ASC
)
WHERE ([idempotency_key] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_CompraMPDetalle_Compra] ON [compras].[CompraMateriaPrimaDetalle]
(
	[compra_materia_prima_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_CompraMPDetalle_Material_Color] ON [compras].[CompraMateriaPrimaDetalle]
(
	[material_id] ASC,
	[color_id] ASC,
	[compra_materia_prima_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_FinPrestamoPago_Prestamo] ON [finance].[PrestamoPago]
(
	[prestamo_id] ASC,
	[activo] ASC,
	[fecha] DESC,
	[pago_id] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_StockProductoTerminado_Producto] ON [inventario].[StockProductoTerminado]
(
	[producto_id] ASC,
	[cantidad_disponible] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_MovimientoMateriaPrima_Merma] ON [inventario].[MovimientoMateriaPrima]
(
	[merma_detalle_id] ASC
)
WHERE ([merma_detalle_id] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_MovimientoMateriaPrima_Produccion] ON [inventario].[MovimientoMateriaPrima]
(
	[produccion_detalle_id] ASC
)
WHERE ([produccion_detalle_id] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_MovimientoMateriaPrima_Stock_Fecha] ON [inventario].[MovimientoMateriaPrima]
(
	[stock_materia_prima_lote_id] ASC,
	[fecha_movimiento] ASC,
	[movimiento_materia_prima_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
CREATE NONCLUSTERED INDEX [IX_MovimientoMateriaPrima_Tipo_Fecha] ON [inventario].[MovimientoMateriaPrima]
(
	[tipo_movimiento] ASC,
	[fecha_movimiento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_StockMateriaPrimaLote_Disponible] ON [inventario].[StockMateriaPrimaLote]
(
	[compra_materia_prima_detalle_id] ASC,
	[cantidad_disponible] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_PedidoDetalle_ProductoId] ON [ventas].[PedidoDetalle]
(
	[producto_id] ASC
)
WHERE ([producto_id] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_MovimientoPT_Entrega] ON [inventario].[MovimientoProductoTerminado]
(
	[entrega_detalle_id] ASC
)
WHERE ([entrega_detalle_id] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_MovimientoPT_Produccion] ON [inventario].[MovimientoProductoTerminado]
(
	[produccion_detalle_id] ASC
)
WHERE ([produccion_detalle_id] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_MovimientoPT_Stock_Fecha] ON [inventario].[MovimientoProductoTerminado]
(
	[stock_producto_terminado_id] ASC,
	[fecha_movimiento] ASC,
	[movimiento_producto_terminado_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_MovimientoProductoTerminado_EntregaDetalle] ON [inventario].[MovimientoProductoTerminado]
(
	[entrega_detalle_id] ASC
)
WHERE ([entrega_detalle_id] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [auth].[Rol] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [auth].[Usuario] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [auth].[Usuario] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [catalog].[UnidadMedida] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [inventario].[Merma] ADD  CONSTRAINT [DF_Merma_CreatedAt]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [dbo].[MigracionBD] ADD  CONSTRAINT [DF_MigracionBD_AplicadoAt]  DEFAULT (sysdatetime()) FOR [aplicado_at]
GO
ALTER TABLE [finance].[Inversion] ADD  CONSTRAINT [DF_FinInversion_Activo]  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [finance].[Inversion] ADD  CONSTRAINT [DF_FinInversion_Created]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [catalog].[Medida] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [catalog].[Medida] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [catalog].[Material] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [catalog].[Material] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [crm].[Cliente] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [crm].[Cliente] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle] ADD  CONSTRAINT [DF_ProductoComposicionDetalle_CreatedAt]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [inventario].[MermaDetalle] ADD  CONSTRAINT [DF_MermaDetalle_CreatedAt]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [catalog].[Color] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [catalog].[Color] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [catalog].[TipoProducto] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [catalog].[TipoProducto] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [finance].[TipoGasto] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [finance].[TipoGasto] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [finance].[TipoDeposito] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [finance].[TipoDeposito] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [finance].[Prestamo] ADD  CONSTRAINT [DF_FinPrestamo_Interes]  DEFAULT ((0)) FOR [tiene_interes]
GO
ALTER TABLE [finance].[Prestamo] ADD  CONSTRAINT [DF_FinPrestamo_Activo]  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [finance].[Prestamo] ADD  CONSTRAINT [DF_FinPrestamo_Created]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [produccion].[Produccion] ADD  CONSTRAINT [DF_Produccion_CreatedAt]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [compras].[Proveedor] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [compras].[Proveedor] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [finance].[PrestamoCuota] ADD  CONSTRAINT [DF_FinPrestamoCuota_Cargos]  DEFAULT ((0)) FOR [cargos_programados]
GO
ALTER TABLE [catalog].[ProductoComposicion] ADD  CONSTRAINT [DF_ProductoComposicion_Vigente]  DEFAULT ((0)) FOR [vigente]
GO
ALTER TABLE [catalog].[ProductoComposicion] ADD  CONSTRAINT [DF_ProductoComposicion_CreatedAt]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [produccion].[ProduccionDetalle] ADD  CONSTRAINT [DF_ProduccionDetalle_CreatedAt]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [catalog].[Producto] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [catalog].[Producto] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [finance].[Gasto] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [finance].[Gasto] ADD  CONSTRAINT [DF_Gasto_Activo]  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [crm].[ClientePrecioHistorial] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [crm].[ClientePrecioHistorial] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [compras].[Compra] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [compras].[CompraMateriaPrima] ADD  CONSTRAINT [DF_CompraMateriaPrima_CreatedAt]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [finance].[InversionRetiro] ADD  CONSTRAINT [DF_FinInversionRetiro_Activo]  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [finance].[InversionRetiro] ADD  CONSTRAINT [DF_FinInversionRetiro_Created]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [ventas].[Pedido] ADD  DEFAULT ('REGISTRADO') FOR [estado_pedido]
GO
ALTER TABLE [ventas].[Pedido] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [ventas].[PedidoCambio] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [ventas].[Entrega] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [finance].[Deposito] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [finance].[PrestamoPago] ADD  CONSTRAINT [DF_FinPrestamoPago_Capital]  DEFAULT ((0)) FOR [capital_pagado]
GO
ALTER TABLE [finance].[PrestamoPago] ADD  CONSTRAINT [DF_FinPrestamoPago_Interes]  DEFAULT ((0)) FOR [interes_pagado]
GO
ALTER TABLE [finance].[PrestamoPago] ADD  CONSTRAINT [DF_FinPrestamoPago_Cargos]  DEFAULT ((0)) FOR [cargos_pagados]
GO
ALTER TABLE [finance].[PrestamoPago] ADD  CONSTRAINT [DF_FinPrestamoPago_Activo]  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [finance].[PrestamoPago] ADD  CONSTRAINT [DF_FinPrestamoPago_Created]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [inventario].[StockProductoTerminado] ADD  CONSTRAINT [DF_StockProductoTerminado_Disponible]  DEFAULT ((0)) FOR [cantidad_disponible]
GO
ALTER TABLE [inventario].[StockProductoTerminado] ADD  CONSTRAINT [DF_StockProductoTerminado_CreatedAt]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima] ADD  CONSTRAINT [DF_MovimientoMateriaPrima_Fecha]  DEFAULT (sysdatetime()) FOR [fecha_movimiento]
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima] ADD  CONSTRAINT [DF_MovimientoMateriaPrima_CreatedAt]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [inventario].[StockMateriaPrimaLote] ADD  CONSTRAINT [DF_StockMateriaPrimaLote_CreatedAt]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [ventas].[PedidoDetalle] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [ventas].[PedidoDetalle] ADD  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado] ADD  CONSTRAINT [DF_MovimientoProductoTerminado_Fecha]  DEFAULT (sysdatetime()) FOR [fecha_movimiento]
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado] ADD  CONSTRAINT [DF_MovimientoProductoTerminado_CreatedAt]  DEFAULT (sysdatetime()) FOR [created_at]
GO
ALTER TABLE [auth].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [auth].[Usuario] CHECK CONSTRAINT [FK_Usuario_CreatedBy]
GO
ALTER TABLE [auth].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_UpdatedBy] FOREIGN KEY([updated_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [auth].[Usuario] CHECK CONSTRAINT [FK_Usuario_UpdatedBy]
GO
ALTER TABLE [inventario].[Merma]  WITH CHECK ADD  CONSTRAINT [FK_Merma_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [inventario].[Merma] CHECK CONSTRAINT [FK_Merma_CreatedBy]
GO
ALTER TABLE [finance].[Inversion]  WITH CHECK ADD  CONSTRAINT [FK_FinInversion_Creador] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[Inversion] CHECK CONSTRAINT [FK_FinInversion_Creador]
GO
ALTER TABLE [finance].[Inversion]  WITH CHECK ADD  CONSTRAINT [FK_FinInversion_Modificador] FOREIGN KEY([updated_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[Inversion] CHECK CONSTRAINT [FK_FinInversion_Modificador]
GO
ALTER TABLE [finance].[Inversion]  WITH CHECK ADD  CONSTRAINT [FK_FinInversion_Moneda] FOREIGN KEY([moneda_codigo])
REFERENCES [finance].[Moneda] ([moneda_codigo])
GO
ALTER TABLE [finance].[Inversion] CHECK CONSTRAINT [FK_FinInversion_Moneda]
GO
ALTER TABLE [catalog].[Medida]  WITH CHECK ADD  CONSTRAINT [FK_Medida_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [catalog].[Medida] CHECK CONSTRAINT [FK_Medida_Usuario]
GO
ALTER TABLE [catalog].[Material]  WITH CHECK ADD  CONSTRAINT [FK_Material_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [catalog].[Material] CHECK CONSTRAINT [FK_Material_Usuario]
GO
ALTER TABLE [crm].[Cliente]  WITH CHECK ADD  CONSTRAINT [FK_Cliente_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [crm].[Cliente] CHECK CONSTRAINT [FK_Cliente_CreatedBy]
GO
ALTER TABLE [crm].[Cliente]  WITH CHECK ADD  CONSTRAINT [FK_Cliente_UpdatedBy] FOREIGN KEY([updated_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [crm].[Cliente] CHECK CONSTRAINT [FK_Cliente_UpdatedBy]
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_ProductoComposicionDetalle_Color] FOREIGN KEY([color_id])
REFERENCES [catalog].[Color] ([color_id])
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle] CHECK CONSTRAINT [FK_ProductoComposicionDetalle_Color]
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_ProductoComposicionDetalle_Composicion] FOREIGN KEY([producto_composicion_id])
REFERENCES [catalog].[ProductoComposicion] ([producto_composicion_id])
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle] CHECK CONSTRAINT [FK_ProductoComposicionDetalle_Composicion]
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_ProductoComposicionDetalle_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle] CHECK CONSTRAINT [FK_ProductoComposicionDetalle_CreatedBy]
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_ProductoComposicionDetalle_Material] FOREIGN KEY([material_id])
REFERENCES [catalog].[Material] ([material_id])
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle] CHECK CONSTRAINT [FK_ProductoComposicionDetalle_Material]
GO
ALTER TABLE [inventario].[MermaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_MermaDetalle_Color] FOREIGN KEY([color_id])
REFERENCES [catalog].[Color] ([color_id])
GO
ALTER TABLE [inventario].[MermaDetalle] CHECK CONSTRAINT [FK_MermaDetalle_Color]
GO
ALTER TABLE [inventario].[MermaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_MermaDetalle_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [inventario].[MermaDetalle] CHECK CONSTRAINT [FK_MermaDetalle_CreatedBy]
GO
ALTER TABLE [inventario].[MermaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_MermaDetalle_Material] FOREIGN KEY([material_id])
REFERENCES [catalog].[Material] ([material_id])
GO
ALTER TABLE [inventario].[MermaDetalle] CHECK CONSTRAINT [FK_MermaDetalle_Material]
GO
ALTER TABLE [inventario].[MermaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_MermaDetalle_Merma] FOREIGN KEY([merma_id])
REFERENCES [inventario].[Merma] ([merma_id])
GO
ALTER TABLE [inventario].[MermaDetalle] CHECK CONSTRAINT [FK_MermaDetalle_Merma]
GO
ALTER TABLE [inventario].[MermaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_MermaDetalle_Unidad] FOREIGN KEY([unidad_medida_id])
REFERENCES [catalog].[UnidadMedida] ([unidad_medida_id])
GO
ALTER TABLE [inventario].[MermaDetalle] CHECK CONSTRAINT [FK_MermaDetalle_Unidad]
GO
ALTER TABLE [catalog].[Color]  WITH CHECK ADD  CONSTRAINT [FK_Color_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [catalog].[Color] CHECK CONSTRAINT [FK_Color_Usuario]
GO
ALTER TABLE [catalog].[TipoProducto]  WITH CHECK ADD  CONSTRAINT [FK_TipoProducto_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [catalog].[TipoProducto] CHECK CONSTRAINT [FK_TipoProducto_Usuario]
GO
ALTER TABLE [finance].[TipoGasto]  WITH CHECK ADD  CONSTRAINT [FK_TipoGasto_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[TipoGasto] CHECK CONSTRAINT [FK_TipoGasto_Usuario]
GO
ALTER TABLE [finance].[TipoDeposito]  WITH CHECK ADD  CONSTRAINT [FK_TipoDeposito_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[TipoDeposito] CHECK CONSTRAINT [FK_TipoDeposito_Usuario]
GO
ALTER TABLE [finance].[Prestamo]  WITH CHECK ADD  CONSTRAINT [FK_FinPrestamo_Creador] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[Prestamo] CHECK CONSTRAINT [FK_FinPrestamo_Creador]
GO
ALTER TABLE [finance].[Prestamo]  WITH CHECK ADD  CONSTRAINT [FK_FinPrestamo_Modificador] FOREIGN KEY([updated_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[Prestamo] CHECK CONSTRAINT [FK_FinPrestamo_Modificador]
GO
ALTER TABLE [finance].[Prestamo]  WITH CHECK ADD  CONSTRAINT [FK_FinPrestamo_Moneda] FOREIGN KEY([moneda_codigo])
REFERENCES [finance].[Moneda] ([moneda_codigo])
GO
ALTER TABLE [finance].[Prestamo] CHECK CONSTRAINT [FK_FinPrestamo_Moneda]
GO
ALTER TABLE [produccion].[Produccion]  WITH CHECK ADD  CONSTRAINT [FK_Produccion_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [produccion].[Produccion] CHECK CONSTRAINT [FK_Produccion_CreatedBy]
GO
ALTER TABLE [auth].[UsuarioRol]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioRol_Rol] FOREIGN KEY([rol_id])
REFERENCES [auth].[Rol] ([rol_id])
GO
ALTER TABLE [auth].[UsuarioRol] CHECK CONSTRAINT [FK_UsuarioRol_Rol]
GO
ALTER TABLE [auth].[UsuarioRol]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioRol_Usuario] FOREIGN KEY([usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [auth].[UsuarioRol] CHECK CONSTRAINT [FK_UsuarioRol_Usuario]
GO
ALTER TABLE [compras].[Proveedor]  WITH CHECK ADD  CONSTRAINT [FK_Proveedor_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [compras].[Proveedor] CHECK CONSTRAINT [FK_Proveedor_CreatedBy]
GO
ALTER TABLE [compras].[Proveedor]  WITH CHECK ADD  CONSTRAINT [FK_Proveedor_UpdatedBy] FOREIGN KEY([updated_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [compras].[Proveedor] CHECK CONSTRAINT [FK_Proveedor_UpdatedBy]
GO
ALTER TABLE [finance].[PrestamoCuota]  WITH CHECK ADD  CONSTRAINT [FK_FinPrestamoCuota_Prestamo] FOREIGN KEY([prestamo_id])
REFERENCES [finance].[Prestamo] ([prestamo_id])
GO
ALTER TABLE [finance].[PrestamoCuota] CHECK CONSTRAINT [FK_FinPrestamoCuota_Prestamo]
GO
ALTER TABLE [catalog].[ProductoComposicion]  WITH CHECK ADD  CONSTRAINT [FK_ProductoComposicion_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [catalog].[ProductoComposicion] CHECK CONSTRAINT [FK_ProductoComposicion_CreatedBy]
GO
ALTER TABLE [catalog].[ProductoComposicion]  WITH CHECK ADD  CONSTRAINT [FK_ProductoComposicion_Producto] FOREIGN KEY([producto_id])
REFERENCES [catalog].[Producto] ([producto_id])
GO
ALTER TABLE [catalog].[ProductoComposicion] CHECK CONSTRAINT [FK_ProductoComposicion_Producto]
GO
ALTER TABLE [catalog].[ProductoComposicion]  WITH CHECK ADD  CONSTRAINT [FK_ProductoComposicion_UpdatedBy] FOREIGN KEY([updated_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [catalog].[ProductoComposicion] CHECK CONSTRAINT [FK_ProductoComposicion_UpdatedBy]
GO
ALTER TABLE [produccion].[ProduccionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_ProduccionDetalle_Composicion] FOREIGN KEY([producto_composicion_id])
REFERENCES [catalog].[ProductoComposicion] ([producto_composicion_id])
GO
ALTER TABLE [produccion].[ProduccionDetalle] CHECK CONSTRAINT [FK_ProduccionDetalle_Composicion]
GO
ALTER TABLE [produccion].[ProduccionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_ProduccionDetalle_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [produccion].[ProduccionDetalle] CHECK CONSTRAINT [FK_ProduccionDetalle_CreatedBy]
GO
ALTER TABLE [produccion].[ProduccionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_ProduccionDetalle_Produccion] FOREIGN KEY([produccion_id])
REFERENCES [produccion].[Produccion] ([produccion_id])
GO
ALTER TABLE [produccion].[ProduccionDetalle] CHECK CONSTRAINT [FK_ProduccionDetalle_Produccion]
GO
ALTER TABLE [produccion].[ProduccionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_ProduccionDetalle_Producto] FOREIGN KEY([producto_id])
REFERENCES [catalog].[Producto] ([producto_id])
GO
ALTER TABLE [produccion].[ProduccionDetalle] CHECK CONSTRAINT [FK_ProduccionDetalle_Producto]
GO
ALTER TABLE [produccion].[ProduccionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_ProduccionDetalle_Unidad] FOREIGN KEY([unidad_medida_id])
REFERENCES [catalog].[UnidadMedida] ([unidad_medida_id])
GO
ALTER TABLE [produccion].[ProduccionDetalle] CHECK CONSTRAINT [FK_ProduccionDetalle_Unidad]
GO
ALTER TABLE [produccion].[ProduccionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_ProduccionDetalle_UnidadPresentacion] FOREIGN KEY([unidad_presentacion_id])
REFERENCES [catalog].[UnidadMedida] ([unidad_medida_id])
GO
ALTER TABLE [produccion].[ProduccionDetalle] CHECK CONSTRAINT [FK_ProduccionDetalle_UnidadPresentacion]
GO
ALTER TABLE [catalog].[Producto]  WITH CHECK ADD  CONSTRAINT [FK_Producto_Color] FOREIGN KEY([color_id])
REFERENCES [catalog].[Color] ([color_id])
GO
ALTER TABLE [catalog].[Producto] CHECK CONSTRAINT [FK_Producto_Color]
GO
ALTER TABLE [catalog].[Producto]  WITH CHECK ADD  CONSTRAINT [FK_Producto_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [catalog].[Producto] CHECK CONSTRAINT [FK_Producto_CreatedBy]
GO
ALTER TABLE [catalog].[Producto]  WITH CHECK ADD  CONSTRAINT [FK_Producto_Material] FOREIGN KEY([material_id])
REFERENCES [catalog].[Material] ([material_id])
GO
ALTER TABLE [catalog].[Producto] CHECK CONSTRAINT [FK_Producto_Material]
GO
ALTER TABLE [catalog].[Producto]  WITH CHECK ADD  CONSTRAINT [FK_Producto_Medida] FOREIGN KEY([medida_id])
REFERENCES [catalog].[Medida] ([medida_id])
GO
ALTER TABLE [catalog].[Producto] CHECK CONSTRAINT [FK_Producto_Medida]
GO
ALTER TABLE [catalog].[Producto]  WITH CHECK ADD  CONSTRAINT [FK_Producto_Tipo] FOREIGN KEY([tipo_producto_id])
REFERENCES [catalog].[TipoProducto] ([tipo_producto_id])
GO
ALTER TABLE [catalog].[Producto] CHECK CONSTRAINT [FK_Producto_Tipo]
GO
ALTER TABLE [catalog].[Producto]  WITH CHECK ADD  CONSTRAINT [FK_Producto_UpdatedBy] FOREIGN KEY([updated_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [catalog].[Producto] CHECK CONSTRAINT [FK_Producto_UpdatedBy]
GO
ALTER TABLE [finance].[Gasto]  WITH CHECK ADD  CONSTRAINT [FK_Gasto_Moneda] FOREIGN KEY([moneda_codigo])
REFERENCES [finance].[Moneda] ([moneda_codigo])
GO
ALTER TABLE [finance].[Gasto] CHECK CONSTRAINT [FK_Gasto_Moneda]
GO
ALTER TABLE [finance].[Gasto]  WITH CHECK ADD  CONSTRAINT [FK_Gasto_Proveedor] FOREIGN KEY([proveedor_id])
REFERENCES [compras].[Proveedor] ([proveedor_id])
GO
ALTER TABLE [finance].[Gasto] CHECK CONSTRAINT [FK_Gasto_Proveedor]
GO
ALTER TABLE [finance].[Gasto]  WITH CHECK ADD  CONSTRAINT [FK_Gasto_Tipo] FOREIGN KEY([tipo_gasto_id])
REFERENCES [finance].[TipoGasto] ([tipo_gasto_id])
GO
ALTER TABLE [finance].[Gasto] CHECK CONSTRAINT [FK_Gasto_Tipo]
GO
ALTER TABLE [finance].[Gasto]  WITH CHECK ADD  CONSTRAINT [FK_Gasto_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[Gasto] CHECK CONSTRAINT [FK_Gasto_Usuario]
GO
ALTER TABLE [finance].[Gasto]  WITH CHECK ADD  CONSTRAINT [FK_Gasto_UsuarioActualiza] FOREIGN KEY([updated_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[Gasto] CHECK CONSTRAINT [FK_Gasto_UsuarioActualiza]
GO
ALTER TABLE [crm].[ClientePrecioHistorial]  WITH CHECK ADD  CONSTRAINT [FK_ClientePrecioHistorial_Cliente] FOREIGN KEY([cliente_id])
REFERENCES [crm].[Cliente] ([cliente_id])
GO
ALTER TABLE [crm].[ClientePrecioHistorial] CHECK CONSTRAINT [FK_ClientePrecioHistorial_Cliente]
GO
ALTER TABLE [crm].[ClientePrecioHistorial]  WITH CHECK ADD  CONSTRAINT [FK_ClientePrecioHistorial_Color] FOREIGN KEY([color_id])
REFERENCES [catalog].[Color] ([color_id])
GO
ALTER TABLE [crm].[ClientePrecioHistorial] CHECK CONSTRAINT [FK_ClientePrecioHistorial_Color]
GO
ALTER TABLE [crm].[ClientePrecioHistorial]  WITH CHECK ADD  CONSTRAINT [FK_ClientePrecioHistorial_Material] FOREIGN KEY([material_id])
REFERENCES [catalog].[Material] ([material_id])
GO
ALTER TABLE [crm].[ClientePrecioHistorial] CHECK CONSTRAINT [FK_ClientePrecioHistorial_Material]
GO
ALTER TABLE [crm].[ClientePrecioHistorial]  WITH CHECK ADD  CONSTRAINT [FK_ClientePrecioHistorial_Medida] FOREIGN KEY([medida_id])
REFERENCES [catalog].[Medida] ([medida_id])
GO
ALTER TABLE [crm].[ClientePrecioHistorial] CHECK CONSTRAINT [FK_ClientePrecioHistorial_Medida]
GO
ALTER TABLE [crm].[ClientePrecioHistorial]  WITH CHECK ADD  CONSTRAINT [FK_ClientePrecioHistorial_TipoProducto] FOREIGN KEY([tipo_producto_id])
REFERENCES [catalog].[TipoProducto] ([tipo_producto_id])
GO
ALTER TABLE [crm].[ClientePrecioHistorial] CHECK CONSTRAINT [FK_ClientePrecioHistorial_TipoProducto]
GO
ALTER TABLE [crm].[ClientePrecioHistorial]  WITH CHECK ADD  CONSTRAINT [FK_ClientePrecioHistorial_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [crm].[ClientePrecioHistorial] CHECK CONSTRAINT [FK_ClientePrecioHistorial_Usuario]
GO
ALTER TABLE [compras].[Compra]  WITH CHECK ADD  CONSTRAINT [FK_Compra_Moneda] FOREIGN KEY([moneda_codigo])
REFERENCES [finance].[Moneda] ([moneda_codigo])
GO
ALTER TABLE [compras].[Compra] CHECK CONSTRAINT [FK_Compra_Moneda]
GO
ALTER TABLE [compras].[Compra]  WITH CHECK ADD  CONSTRAINT [FK_Compra_Proveedor] FOREIGN KEY([proveedor_id])
REFERENCES [compras].[Proveedor] ([proveedor_id])
GO
ALTER TABLE [compras].[Compra] CHECK CONSTRAINT [FK_Compra_Proveedor]
GO
ALTER TABLE [compras].[Compra]  WITH CHECK ADD  CONSTRAINT [FK_Compra_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [compras].[Compra] CHECK CONSTRAINT [FK_Compra_Usuario]
GO
ALTER TABLE [compras].[CompraMateriaPrima]  WITH CHECK ADD  CONSTRAINT [FK_CompraMateriaPrima_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [compras].[CompraMateriaPrima] CHECK CONSTRAINT [FK_CompraMateriaPrima_CreatedBy]
GO
ALTER TABLE [compras].[CompraMateriaPrima]  WITH CHECK ADD  CONSTRAINT [FK_CompraMateriaPrima_Moneda] FOREIGN KEY([moneda_codigo])
REFERENCES [finance].[Moneda] ([moneda_codigo])
GO
ALTER TABLE [compras].[CompraMateriaPrima] CHECK CONSTRAINT [FK_CompraMateriaPrima_Moneda]
GO
ALTER TABLE [compras].[CompraMateriaPrima]  WITH CHECK ADD  CONSTRAINT [FK_CompraMateriaPrima_Proveedor] FOREIGN KEY([proveedor_id])
REFERENCES [compras].[Proveedor] ([proveedor_id])
GO
ALTER TABLE [compras].[CompraMateriaPrima] CHECK CONSTRAINT [FK_CompraMateriaPrima_Proveedor]
GO
ALTER TABLE [finance].[InversionRetiro]  WITH CHECK ADD  CONSTRAINT [FK_FinInversionRetiro_Anulador] FOREIGN KEY([anulado_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[InversionRetiro] CHECK CONSTRAINT [FK_FinInversionRetiro_Anulador]
GO
ALTER TABLE [finance].[InversionRetiro]  WITH CHECK ADD  CONSTRAINT [FK_FinInversionRetiro_Creador] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[InversionRetiro] CHECK CONSTRAINT [FK_FinInversionRetiro_Creador]
GO
ALTER TABLE [finance].[InversionRetiro]  WITH CHECK ADD  CONSTRAINT [FK_FinInversionRetiro_Inversion] FOREIGN KEY([inversion_id])
REFERENCES [finance].[Inversion] ([inversion_id])
GO
ALTER TABLE [finance].[InversionRetiro] CHECK CONSTRAINT [FK_FinInversionRetiro_Inversion]
GO
ALTER TABLE [ventas].[Pedido]  WITH CHECK ADD  CONSTRAINT [FK_Pedido_Cliente] FOREIGN KEY([cliente_id])
REFERENCES [crm].[Cliente] ([cliente_id])
GO
ALTER TABLE [ventas].[Pedido] CHECK CONSTRAINT [FK_Pedido_Cliente]
GO
ALTER TABLE [ventas].[Pedido]  WITH CHECK ADD  CONSTRAINT [FK_Pedido_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [ventas].[Pedido] CHECK CONSTRAINT [FK_Pedido_CreatedBy]
GO
ALTER TABLE [ventas].[Pedido]  WITH CHECK ADD  CONSTRAINT [FK_Pedido_UpdatedBy] FOREIGN KEY([updated_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [ventas].[Pedido] CHECK CONSTRAINT [FK_Pedido_UpdatedBy]
GO
ALTER TABLE [ventas].[PedidoCambio]  WITH CHECK ADD  CONSTRAINT [FK_PedidoCambio_Pedido] FOREIGN KEY([pedido_id])
REFERENCES [ventas].[Pedido] ([pedido_id])
GO
ALTER TABLE [ventas].[PedidoCambio] CHECK CONSTRAINT [FK_PedidoCambio_Pedido]
GO
ALTER TABLE [ventas].[PedidoCambio]  WITH CHECK ADD  CONSTRAINT [FK_PedidoCambio_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [ventas].[PedidoCambio] CHECK CONSTRAINT [FK_PedidoCambio_Usuario]
GO
ALTER TABLE [compras].[CompraDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CompraDetalle_Compra] FOREIGN KEY([compra_id])
REFERENCES [compras].[Compra] ([compra_id])
GO
ALTER TABLE [compras].[CompraDetalle] CHECK CONSTRAINT [FK_CompraDetalle_Compra]
GO
ALTER TABLE [compras].[CompraDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CompraDetalle_Material] FOREIGN KEY([material_id])
REFERENCES [catalog].[Material] ([material_id])
GO
ALTER TABLE [compras].[CompraDetalle] CHECK CONSTRAINT [FK_CompraDetalle_Material]
GO
ALTER TABLE [compras].[CompraDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CompraDetalle_Producto] FOREIGN KEY([producto_id])
REFERENCES [catalog].[Producto] ([producto_id])
GO
ALTER TABLE [compras].[CompraDetalle] CHECK CONSTRAINT [FK_CompraDetalle_Producto]
GO
ALTER TABLE [compras].[CompraDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CompraDetalle_Unidad] FOREIGN KEY([unidad_medida_id])
REFERENCES [catalog].[UnidadMedida] ([unidad_medida_id])
GO
ALTER TABLE [compras].[CompraDetalle] CHECK CONSTRAINT [FK_CompraDetalle_Unidad]
GO
ALTER TABLE [ventas].[Entrega]  WITH CHECK ADD  CONSTRAINT [FK_Entrega_Pedido] FOREIGN KEY([pedido_id])
REFERENCES [ventas].[Pedido] ([pedido_id])
GO
ALTER TABLE [ventas].[Entrega] CHECK CONSTRAINT [FK_Entrega_Pedido]
GO
ALTER TABLE [ventas].[Entrega]  WITH CHECK ADD  CONSTRAINT [FK_Entrega_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [ventas].[Entrega] CHECK CONSTRAINT [FK_Entrega_Usuario]
GO
ALTER TABLE [finance].[Deposito]  WITH CHECK ADD  CONSTRAINT [FK_Deposito_Moneda] FOREIGN KEY([moneda_codigo])
REFERENCES [finance].[Moneda] ([moneda_codigo])
GO
ALTER TABLE [finance].[Deposito] CHECK CONSTRAINT [FK_Deposito_Moneda]
GO
ALTER TABLE [finance].[Deposito]  WITH CHECK ADD  CONSTRAINT [FK_Deposito_Pedido] FOREIGN KEY([pedido_id])
REFERENCES [ventas].[Pedido] ([pedido_id])
GO
ALTER TABLE [finance].[Deposito] CHECK CONSTRAINT [FK_Deposito_Pedido]
GO
ALTER TABLE [finance].[Deposito]  WITH CHECK ADD  CONSTRAINT [FK_Deposito_Tipo] FOREIGN KEY([tipo_deposito_id])
REFERENCES [finance].[TipoDeposito] ([tipo_deposito_id])
GO
ALTER TABLE [finance].[Deposito] CHECK CONSTRAINT [FK_Deposito_Tipo]
GO
ALTER TABLE [finance].[Deposito]  WITH CHECK ADD  CONSTRAINT [FK_Deposito_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[Deposito] CHECK CONSTRAINT [FK_Deposito_Usuario]
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CompraMateriaPrimaDetalle_Color] FOREIGN KEY([color_id])
REFERENCES [catalog].[Color] ([color_id])
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle] CHECK CONSTRAINT [FK_CompraMateriaPrimaDetalle_Color]
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CompraMateriaPrimaDetalle_Compra] FOREIGN KEY([compra_materia_prima_id])
REFERENCES [compras].[CompraMateriaPrima] ([compra_materia_prima_id])
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle] CHECK CONSTRAINT [FK_CompraMateriaPrimaDetalle_Compra]
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CompraMateriaPrimaDetalle_Material] FOREIGN KEY([material_id])
REFERENCES [catalog].[Material] ([material_id])
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle] CHECK CONSTRAINT [FK_CompraMateriaPrimaDetalle_Material]
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CompraMateriaPrimaDetalle_Unidad] FOREIGN KEY([unidad_medida_id])
REFERENCES [catalog].[UnidadMedida] ([unidad_medida_id])
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle] CHECK CONSTRAINT [FK_CompraMateriaPrimaDetalle_Unidad]
GO
ALTER TABLE [finance].[PrestamoPago]  WITH CHECK ADD  CONSTRAINT [FK_FinPrestamoPago_Anulador] FOREIGN KEY([anulado_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[PrestamoPago] CHECK CONSTRAINT [FK_FinPrestamoPago_Anulador]
GO
ALTER TABLE [finance].[PrestamoPago]  WITH CHECK ADD  CONSTRAINT [FK_FinPrestamoPago_Creador] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [finance].[PrestamoPago] CHECK CONSTRAINT [FK_FinPrestamoPago_Creador]
GO
ALTER TABLE [finance].[PrestamoPago]  WITH CHECK ADD  CONSTRAINT [FK_FinPrestamoPago_Cuota] FOREIGN KEY([prestamo_id], [cuota_id])
REFERENCES [finance].[PrestamoCuota] ([prestamo_id], [cuota_id])
GO
ALTER TABLE [finance].[PrestamoPago] CHECK CONSTRAINT [FK_FinPrestamoPago_Cuota]
GO
ALTER TABLE [finance].[PrestamoPago]  WITH CHECK ADD  CONSTRAINT [FK_FinPrestamoPago_Prestamo] FOREIGN KEY([prestamo_id])
REFERENCES [finance].[Prestamo] ([prestamo_id])
GO
ALTER TABLE [finance].[PrestamoPago] CHECK CONSTRAINT [FK_FinPrestamoPago_Prestamo]
GO
ALTER TABLE [inventario].[StockProductoTerminado]  WITH CHECK ADD  CONSTRAINT [FK_StockProductoTerminado_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [inventario].[StockProductoTerminado] CHECK CONSTRAINT [FK_StockProductoTerminado_CreatedBy]
GO
ALTER TABLE [inventario].[StockProductoTerminado]  WITH CHECK ADD  CONSTRAINT [FK_StockProductoTerminado_Producto] FOREIGN KEY([producto_id])
REFERENCES [catalog].[Producto] ([producto_id])
GO
ALTER TABLE [inventario].[StockProductoTerminado] CHECK CONSTRAINT [FK_StockProductoTerminado_Producto]
GO
ALTER TABLE [inventario].[StockProductoTerminado]  WITH CHECK ADD  CONSTRAINT [FK_StockProductoTerminado_Unidad] FOREIGN KEY([unidad_medida_id])
REFERENCES [catalog].[UnidadMedida] ([unidad_medida_id])
GO
ALTER TABLE [inventario].[StockProductoTerminado] CHECK CONSTRAINT [FK_StockProductoTerminado_Unidad]
GO
ALTER TABLE [inventario].[StockProductoTerminado]  WITH CHECK ADD  CONSTRAINT [FK_StockProductoTerminado_UnidadPresentacion] FOREIGN KEY([unidad_presentacion_id])
REFERENCES [catalog].[UnidadMedida] ([unidad_medida_id])
GO
ALTER TABLE [inventario].[StockProductoTerminado] CHECK CONSTRAINT [FK_StockProductoTerminado_UnidadPresentacion]
GO
ALTER TABLE [inventario].[StockProductoTerminado]  WITH CHECK ADD  CONSTRAINT [FK_StockProductoTerminado_UpdatedBy] FOREIGN KEY([updated_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [inventario].[StockProductoTerminado] CHECK CONSTRAINT [FK_StockProductoTerminado_UpdatedBy]
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima]  WITH CHECK ADD  CONSTRAINT [FK_MovimientoMateriaPrima_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima] CHECK CONSTRAINT [FK_MovimientoMateriaPrima_CreatedBy]
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima]  WITH CHECK ADD  CONSTRAINT [FK_MovimientoMateriaPrima_MermaDetalle] FOREIGN KEY([merma_detalle_id])
REFERENCES [inventario].[MermaDetalle] ([merma_detalle_id])
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima] CHECK CONSTRAINT [FK_MovimientoMateriaPrima_MermaDetalle]
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima]  WITH CHECK ADD  CONSTRAINT [FK_MovimientoMateriaPrima_ProduccionDetalle] FOREIGN KEY([produccion_detalle_id])
REFERENCES [produccion].[ProduccionDetalle] ([produccion_detalle_id])
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima] CHECK CONSTRAINT [FK_MovimientoMateriaPrima_ProduccionDetalle]
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima]  WITH CHECK ADD  CONSTRAINT [FK_MovimientoMateriaPrima_StockLote] FOREIGN KEY([stock_materia_prima_lote_id])
REFERENCES [inventario].[StockMateriaPrimaLote] ([stock_materia_prima_lote_id])
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima] CHECK CONSTRAINT [FK_MovimientoMateriaPrima_StockLote]
GO
ALTER TABLE [inventario].[StockMateriaPrimaLote]  WITH CHECK ADD  CONSTRAINT [FK_StockMateriaPrimaLote_CompraDetalle] FOREIGN KEY([compra_materia_prima_detalle_id])
REFERENCES [compras].[CompraMateriaPrimaDetalle] ([compra_materia_prima_detalle_id])
GO
ALTER TABLE [inventario].[StockMateriaPrimaLote] CHECK CONSTRAINT [FK_StockMateriaPrimaLote_CompraDetalle]
GO
ALTER TABLE [inventario].[StockMateriaPrimaLote]  WITH CHECK ADD  CONSTRAINT [FK_StockMateriaPrimaLote_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [inventario].[StockMateriaPrimaLote] CHECK CONSTRAINT [FK_StockMateriaPrimaLote_CreatedBy]
GO
ALTER TABLE [inventario].[StockMateriaPrimaLote]  WITH CHECK ADD  CONSTRAINT [FK_StockMateriaPrimaLote_UpdatedBy] FOREIGN KEY([updated_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [inventario].[StockMateriaPrimaLote] CHECK CONSTRAINT [FK_StockMateriaPrimaLote_UpdatedBy]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_PedidoDetalle_Cambio] FOREIGN KEY([pedido_cambio_id])
REFERENCES [ventas].[PedidoCambio] ([pedido_cambio_id])
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [FK_PedidoDetalle_Cambio]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_PedidoDetalle_Color] FOREIGN KEY([color_id])
REFERENCES [catalog].[Color] ([color_id])
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [FK_PedidoDetalle_Color]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_PedidoDetalle_Material] FOREIGN KEY([material_id])
REFERENCES [catalog].[Material] ([material_id])
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [FK_PedidoDetalle_Material]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_PedidoDetalle_Medida] FOREIGN KEY([medida_id])
REFERENCES [catalog].[Medida] ([medida_id])
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [FK_PedidoDetalle_Medida]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_PedidoDetalle_Moneda] FOREIGN KEY([moneda_codigo])
REFERENCES [finance].[Moneda] ([moneda_codigo])
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [FK_PedidoDetalle_Moneda]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_PedidoDetalle_Pedido] FOREIGN KEY([pedido_id])
REFERENCES [ventas].[Pedido] ([pedido_id])
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [FK_PedidoDetalle_Pedido]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_PedidoDetalle_Producto] FOREIGN KEY([producto_id])
REFERENCES [catalog].[Producto] ([producto_id])
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [FK_PedidoDetalle_Producto]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_PedidoDetalle_TipoProducto] FOREIGN KEY([tipo_producto_id])
REFERENCES [catalog].[TipoProducto] ([tipo_producto_id])
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [FK_PedidoDetalle_TipoProducto]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_PedidoDetalle_Unidad] FOREIGN KEY([unidad_medida_id])
REFERENCES [catalog].[UnidadMedida] ([unidad_medida_id])
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [FK_PedidoDetalle_Unidad]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_PedidoDetalle_UnidadPresentacion] FOREIGN KEY([unidad_presentacion_id])
REFERENCES [catalog].[UnidadMedida] ([unidad_medida_id])
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [FK_PedidoDetalle_UnidadPresentacion]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_PedidoDetalle_Usuario] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [FK_PedidoDetalle_Usuario]
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado]  WITH CHECK ADD  CONSTRAINT [FK_MovimientoProductoTerminado_CreatedBy] FOREIGN KEY([created_by_usuario_id])
REFERENCES [auth].[Usuario] ([usuario_id])
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado] CHECK CONSTRAINT [FK_MovimientoProductoTerminado_CreatedBy]
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado]  WITH CHECK ADD  CONSTRAINT [FK_MovimientoProductoTerminado_EntregaDetalle] FOREIGN KEY([entrega_detalle_id])
REFERENCES [ventas].[EntregaDetalle] ([entrega_detalle_id])
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado] CHECK CONSTRAINT [FK_MovimientoProductoTerminado_EntregaDetalle]
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado]  WITH CHECK ADD  CONSTRAINT [FK_MovimientoProductoTerminado_ProduccionDetalle] FOREIGN KEY([produccion_detalle_id])
REFERENCES [produccion].[ProduccionDetalle] ([produccion_detalle_id])
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado] CHECK CONSTRAINT [FK_MovimientoProductoTerminado_ProduccionDetalle]
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado]  WITH CHECK ADD  CONSTRAINT [FK_MovimientoProductoTerminado_Stock] FOREIGN KEY([stock_producto_terminado_id])
REFERENCES [inventario].[StockProductoTerminado] ([stock_producto_terminado_id])
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado] CHECK CONSTRAINT [FK_MovimientoProductoTerminado_Stock]
GO
ALTER TABLE [ventas].[EntregaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_EntregaDetalle_Entrega] FOREIGN KEY([entrega_id])
REFERENCES [ventas].[Entrega] ([entrega_id])
GO
ALTER TABLE [ventas].[EntregaDetalle] CHECK CONSTRAINT [FK_EntregaDetalle_Entrega]
GO
ALTER TABLE [ventas].[EntregaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_EntregaDetalle_PedidoDetalle] FOREIGN KEY([pedido_detalle_id])
REFERENCES [ventas].[PedidoDetalle] ([pedido_detalle_id])
GO
ALTER TABLE [ventas].[EntregaDetalle] CHECK CONSTRAINT [FK_EntregaDetalle_PedidoDetalle]
GO
ALTER TABLE [ventas].[EntregaDetalle]  WITH CHECK ADD  CONSTRAINT [FK_EntregaDetalle_Unidad] FOREIGN KEY([unidad_medida_id])
REFERENCES [catalog].[UnidadMedida] ([unidad_medida_id])
GO
ALTER TABLE [ventas].[EntregaDetalle] CHECK CONSTRAINT [FK_EntregaDetalle_Unidad]
GO
ALTER TABLE [finance].[Inversion]  WITH CHECK ADD  CONSTRAINT [CK_FinInversion_Monto] CHECK  (([monto]>(0)))
GO
ALTER TABLE [finance].[Inversion] CHECK CONSTRAINT [CK_FinInversion_Monto]
GO
ALTER TABLE [crm].[Cliente]  WITH CHECK ADD  CONSTRAINT [CK_Cliente_RUC] CHECK  ((len([ruc])=(11) AND NOT [ruc] like '%[^0-9]%'))
GO
ALTER TABLE [crm].[Cliente] CHECK CONSTRAINT [CK_Cliente_RUC]
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle]  WITH CHECK ADD  CONSTRAINT [CK_ProductoComposicionDetalle_Porcentaje] CHECK  (([porcentaje]>(0) AND [porcentaje]<=(100)))
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle] CHECK CONSTRAINT [CK_ProductoComposicionDetalle_Porcentaje]
GO
ALTER TABLE [inventario].[MermaDetalle]  WITH CHECK ADD  CONSTRAINT [CK_MermaDetalle_Cantidad] CHECK  (([cantidad]>(0)))
GO
ALTER TABLE [inventario].[MermaDetalle] CHECK CONSTRAINT [CK_MermaDetalle_Cantidad]
GO
ALTER TABLE [finance].[Prestamo]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamo_Capital] CHECK  (([capital]>(0)))
GO
ALTER TABLE [finance].[Prestamo] CHECK CONSTRAINT [CK_FinPrestamo_Capital]
GO
ALTER TABLE [finance].[Prestamo]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamo_Direccion] CHECK  (([direccion]='OTORGADO' OR [direccion]='RECIBIDO'))
GO
ALTER TABLE [finance].[Prestamo] CHECK CONSTRAINT [CK_FinPrestamo_Direccion]
GO
ALTER TABLE [finance].[Prestamo]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamo_InteresAcordado] CHECK  (([interes_acordado] IS NULL OR [interes_acordado]>=(0)))
GO
ALTER TABLE [finance].[Prestamo] CHECK CONSTRAINT [CK_FinPrestamo_InteresAcordado]
GO
ALTER TABLE [finance].[Prestamo]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamo_Modalidad] CHECK  (([modalidad]='PROGRAMADO' OR [modalidad]='GENERAL'))
GO
ALTER TABLE [finance].[Prestamo] CHECK CONSTRAINT [CK_FinPrestamo_Modalidad]
GO
ALTER TABLE [finance].[Prestamo]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamo_ModalidadDatos] CHECK  (([modalidad]='GENERAL' AND [tasa_anual_pct] IS NULL AND [calculo_tasa] IS NULL AND [sistema_amortizacion] IS NULL AND [cronograma_tipo] IS NULL AND [plazo_meses] IS NULL AND [primer_vencimiento] IS NULL OR [modalidad]='PROGRAMADO' AND [tiene_interes]=(1) AND [interes_acordado] IS NULL AND ([cronograma_tipo]='MANUAL' OR [cronograma_tipo]='CALCULADO') AND ([cronograma_tipo]='CALCULADO' AND [tasa_anual_pct] IS NOT NULL AND [tasa_anual_pct]>=(0) AND [tasa_anual_pct]<=(1000) AND ([calculo_tasa]='EFECTIVA_COMPUESTA' OR [calculo_tasa]='NOMINAL_SIMPLE') AND ([sistema_amortizacion]='ALEMAN' OR [sistema_amortizacion]='FRANCES') AND ([plazo_meses]>=(1) AND [plazo_meses]<=(360)) AND [primer_vencimiento] IS NOT NULL OR [cronograma_tipo]='MANUAL' AND [tasa_anual_pct] IS NULL AND [calculo_tasa] IS NULL AND [sistema_amortizacion] IS NULL AND [plazo_meses] IS NULL AND [primer_vencimiento] IS NULL)))
GO
ALTER TABLE [finance].[Prestamo] CHECK CONSTRAINT [CK_FinPrestamo_ModalidadDatos]
GO
ALTER TABLE [compras].[Proveedor]  WITH CHECK ADD  CONSTRAINT [CK_Proveedor_RUC] CHECK  ((len([ruc])=(11) AND NOT [ruc] like '%[^0-9]%'))
GO
ALTER TABLE [compras].[Proveedor] CHECK CONSTRAINT [CK_Proveedor_RUC]
GO
ALTER TABLE [finance].[PrestamoCuota]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamoCuota_Capital] CHECK  (([capital_programado]>=(0)))
GO
ALTER TABLE [finance].[PrestamoCuota] CHECK CONSTRAINT [CK_FinPrestamoCuota_Capital]
GO
ALTER TABLE [finance].[PrestamoCuota]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamoCuota_Cargos] CHECK  (([cargos_programados]>=(0)))
GO
ALTER TABLE [finance].[PrestamoCuota] CHECK CONSTRAINT [CK_FinPrestamoCuota_Cargos]
GO
ALTER TABLE [finance].[PrestamoCuota]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamoCuota_Interes] CHECK  (([interes_programado]>=(0)))
GO
ALTER TABLE [finance].[PrestamoCuota] CHECK CONSTRAINT [CK_FinPrestamoCuota_Interes]
GO
ALTER TABLE [finance].[PrestamoCuota]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamoCuota_Numero] CHECK  (([numero]>(0)))
GO
ALTER TABLE [finance].[PrestamoCuota] CHECK CONSTRAINT [CK_FinPrestamoCuota_Numero]
GO
ALTER TABLE [catalog].[ProductoComposicion]  WITH CHECK ADD  CONSTRAINT [CK_ProductoComposicion_EstadoVersion] CHECK  (([vigente]=(0) AND [fecha_vigencia_desde] IS NULL AND [fecha_vigencia_hasta] IS NULL OR [vigente]=(1) AND [fecha_vigencia_desde] IS NOT NULL AND [fecha_vigencia_hasta] IS NULL OR [vigente]=(0) AND [fecha_vigencia_desde] IS NOT NULL AND [fecha_vigencia_hasta] IS NOT NULL AND [fecha_vigencia_hasta]>=[fecha_vigencia_desde]))
GO
ALTER TABLE [catalog].[ProductoComposicion] CHECK CONSTRAINT [CK_ProductoComposicion_EstadoVersion]
GO
ALTER TABLE [catalog].[ProductoComposicion]  WITH CHECK ADD  CONSTRAINT [CK_ProductoComposicion_Version] CHECK  (([version_numero]>(0)))
GO
ALTER TABLE [catalog].[ProductoComposicion] CHECK CONSTRAINT [CK_ProductoComposicion_Version]
GO
ALTER TABLE [produccion].[ProduccionDetalle]  WITH CHECK ADD  CONSTRAINT [CK_ProduccionDetalle_Cantidad] CHECK  (([cantidad_producida]>(0)))
GO
ALTER TABLE [produccion].[ProduccionDetalle] CHECK CONSTRAINT [CK_ProduccionDetalle_Cantidad]
GO
ALTER TABLE [produccion].[ProduccionDetalle]  WITH CHECK ADD  CONSTRAINT [CK_ProduccionDetalle_Presentacion] CHECK  (([cantidad_presentacion]>(0)))
GO
ALTER TABLE [produccion].[ProduccionDetalle] CHECK CONSTRAINT [CK_ProduccionDetalle_Presentacion]
GO
ALTER TABLE [finance].[Gasto]  WITH CHECK ADD  CONSTRAINT [CK_Gasto_Monto] CHECK  (([monto]>(0)))
GO
ALTER TABLE [finance].[Gasto] CHECK CONSTRAINT [CK_Gasto_Monto]
GO
ALTER TABLE [crm].[ClientePrecioHistorial]  WITH CHECK ADD  CONSTRAINT [CK_ClientePrecioHistorial_Moneda] CHECK  (([moneda_codigo]='USD' OR [moneda_codigo]='PEN'))
GO
ALTER TABLE [crm].[ClientePrecioHistorial] CHECK CONSTRAINT [CK_ClientePrecioHistorial_Moneda]
GO
ALTER TABLE [crm].[ClientePrecioHistorial]  WITH CHECK ADD  CONSTRAINT [CK_ClientePrecioHistorial_Precio] CHECK  (([precio_unitario]>(0)))
GO
ALTER TABLE [crm].[ClientePrecioHistorial] CHECK CONSTRAINT [CK_ClientePrecioHistorial_Precio]
GO
ALTER TABLE [compras].[Compra]  WITH CHECK ADD  CONSTRAINT [CK_Compra_Monto] CHECK  (([monto_total]>(0)))
GO
ALTER TABLE [compras].[Compra] CHECK CONSTRAINT [CK_Compra_Monto]
GO
ALTER TABLE [compras].[CompraMateriaPrima]  WITH CHECK ADD  CONSTRAINT [CK_CompraMateriaPrima_MontoTotal] CHECK  (([monto_total]>(0)))
GO
ALTER TABLE [compras].[CompraMateriaPrima] CHECK CONSTRAINT [CK_CompraMateriaPrima_MontoTotal]
GO
ALTER TABLE [compras].[CompraMateriaPrima]  WITH CHECK ADD  CONSTRAINT [CK_CompraMateriaPrima_NombreLote] CHECK  ((len(ltrim(rtrim([nombre_lote])))>(0)))
GO
ALTER TABLE [compras].[CompraMateriaPrima] CHECK CONSTRAINT [CK_CompraMateriaPrima_NombreLote]
GO
ALTER TABLE [finance].[InversionRetiro]  WITH CHECK ADD  CONSTRAINT [CK_FinInversionRetiro_Monto] CHECK  (([monto]>(0)))
GO
ALTER TABLE [finance].[InversionRetiro] CHECK CONSTRAINT [CK_FinInversionRetiro_Monto]
GO
ALTER TABLE [ventas].[Pedido]  WITH CHECK ADD  CONSTRAINT [CK_Pedido_Estado] CHECK  (([estado_pedido]='CANCELADO' OR [estado_pedido]='ENTREGADO' OR [estado_pedido]='PARCIAL' OR [estado_pedido]='REGISTRADO'))
GO
ALTER TABLE [ventas].[Pedido] CHECK CONSTRAINT [CK_Pedido_Estado]
GO
ALTER TABLE [ventas].[PedidoCambio]  WITH CHECK ADD  CONSTRAINT [CK_PedidoCambio_Tipo] CHECK  (([tipo_cambio]='CANCELACION' OR [tipo_cambio]='EDICION' OR [tipo_cambio]='AUMENTO_PRODUCTOS' OR [tipo_cambio]='CREACION'))
GO
ALTER TABLE [ventas].[PedidoCambio] CHECK CONSTRAINT [CK_PedidoCambio_Tipo]
GO
ALTER TABLE [compras].[CompraDetalle]  WITH CHECK ADD  CONSTRAINT [CK_CompraDetalle_Cantidad] CHECK  (([cantidad]>(0)))
GO
ALTER TABLE [compras].[CompraDetalle] CHECK CONSTRAINT [CK_CompraDetalle_Cantidad]
GO
ALTER TABLE [compras].[CompraDetalle]  WITH CHECK ADD  CONSTRAINT [CK_CompraDetalle_Precio] CHECK  (([precio_unitario]>=(0)))
GO
ALTER TABLE [compras].[CompraDetalle] CHECK CONSTRAINT [CK_CompraDetalle_Precio]
GO
ALTER TABLE [finance].[Deposito]  WITH CHECK ADD  CONSTRAINT [CK_Deposito_Monto] CHECK  (([monto]>(0)))
GO
ALTER TABLE [finance].[Deposito] CHECK CONSTRAINT [CK_Deposito_Monto]
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle]  WITH CHECK ADD  CONSTRAINT [CK_CompraMateriaPrimaDetalle_Cantidad] CHECK  (([cantidad]>(0)))
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle] CHECK CONSTRAINT [CK_CompraMateriaPrimaDetalle_Cantidad]
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle]  WITH CHECK ADD  CONSTRAINT [CK_CompraMateriaPrimaDetalle_Precio] CHECK  (([precio_unitario]>=(0)))
GO
ALTER TABLE [compras].[CompraMateriaPrimaDetalle] CHECK CONSTRAINT [CK_CompraMateriaPrimaDetalle_Precio]
GO
ALTER TABLE [finance].[PrestamoPago]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamoPago_Capital] CHECK  (([capital_pagado]>=(0)))
GO
ALTER TABLE [finance].[PrestamoPago] CHECK CONSTRAINT [CK_FinPrestamoPago_Capital]
GO
ALTER TABLE [finance].[PrestamoPago]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamoPago_Cargos] CHECK  (([cargos_pagados]>=(0)))
GO
ALTER TABLE [finance].[PrestamoPago] CHECK CONSTRAINT [CK_FinPrestamoPago_Cargos]
GO
ALTER TABLE [finance].[PrestamoPago]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamoPago_Interes] CHECK  (([interes_pagado]>=(0)))
GO
ALTER TABLE [finance].[PrestamoPago] CHECK CONSTRAINT [CK_FinPrestamoPago_Interes]
GO
ALTER TABLE [finance].[PrestamoPago]  WITH CHECK ADD  CONSTRAINT [CK_FinPrestamoPago_Pos] CHECK  (((([capital_pagado]+[interes_pagado])+[cargos_pagados])>(0)))
GO
ALTER TABLE [finance].[PrestamoPago] CHECK CONSTRAINT [CK_FinPrestamoPago_Pos]
GO
ALTER TABLE [inventario].[StockProductoTerminado]  WITH CHECK ADD  CONSTRAINT [CK_StockProductoTerminado_NoNegativo] CHECK  (([cantidad_disponible]>=(0)))
GO
ALTER TABLE [inventario].[StockProductoTerminado] CHECK CONSTRAINT [CK_StockProductoTerminado_NoNegativo]
GO
ALTER TABLE [inventario].[StockProductoTerminado]  WITH CHECK ADD  CONSTRAINT [CK_StockProductoTerminado_Presentacion] CHECK  (([cantidad_presentacion]>(0)))
GO
ALTER TABLE [inventario].[StockProductoTerminado] CHECK CONSTRAINT [CK_StockProductoTerminado_Presentacion]
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima]  WITH CHECK ADD  CONSTRAINT [CK_MovimientoMateriaPrima_Cantidad] CHECK  (([cantidad]>(0)))
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima] CHECK CONSTRAINT [CK_MovimientoMateriaPrima_Cantidad]
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima]  WITH CHECK ADD  CONSTRAINT [CK_MovimientoMateriaPrima_OrigenMerma] CHECK  (([tipo_movimiento]='SALIDA_MERMA' AND [merma_detalle_id] IS NOT NULL OR [tipo_movimiento]<>'SALIDA_MERMA' AND [merma_detalle_id] IS NULL))
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima] CHECK CONSTRAINT [CK_MovimientoMateriaPrima_OrigenMerma]
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima]  WITH CHECK ADD  CONSTRAINT [CK_MovimientoMateriaPrima_OrigenProduccion] CHECK  (([tipo_movimiento]='SALIDA_PRODUCCION' AND [produccion_detalle_id] IS NOT NULL OR [tipo_movimiento]<>'SALIDA_PRODUCCION' AND [produccion_detalle_id] IS NULL))
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima] CHECK CONSTRAINT [CK_MovimientoMateriaPrima_OrigenProduccion]
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima]  WITH CHECK ADD  CONSTRAINT [CK_MovimientoMateriaPrima_Tipo] CHECK  (([tipo_movimiento]='AJUSTE_SALIDA' OR [tipo_movimiento]='AJUSTE_ENTRADA' OR [tipo_movimiento]='SALIDA_MERMA' OR [tipo_movimiento]='SALIDA_PRODUCCION' OR [tipo_movimiento]='ENTRADA_COMPRA'))
GO
ALTER TABLE [inventario].[MovimientoMateriaPrima] CHECK CONSTRAINT [CK_MovimientoMateriaPrima_Tipo]
GO
ALTER TABLE [inventario].[StockMateriaPrimaLote]  WITH CHECK ADD  CONSTRAINT [CK_StockMateriaPrimaLote_CantidadInicial] CHECK  (([cantidad_inicial]>(0)))
GO
ALTER TABLE [inventario].[StockMateriaPrimaLote] CHECK CONSTRAINT [CK_StockMateriaPrimaLote_CantidadInicial]
GO
ALTER TABLE [inventario].[StockMateriaPrimaLote]  WITH CHECK ADD  CONSTRAINT [CK_StockMateriaPrimaLote_NoNegativo] CHECK  (([cantidad_disponible]>=(0)))
GO
ALTER TABLE [inventario].[StockMateriaPrimaLote] CHECK CONSTRAINT [CK_StockMateriaPrimaLote_NoNegativo]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [CK_PedidoDetalle_Cantidad] CHECK  (([cantidad_pedida]>(0)))
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [CK_PedidoDetalle_Cantidad]
GO
ALTER TABLE [ventas].[PedidoDetalle]  WITH CHECK ADD  CONSTRAINT [CK_PedidoDetalle_Precio] CHECK  (([precio_unitario]>=(0)))
GO
ALTER TABLE [ventas].[PedidoDetalle] CHECK CONSTRAINT [CK_PedidoDetalle_Precio]
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado]  WITH CHECK ADD  CONSTRAINT [CK_MovimientoProductoTerminado_Cantidad] CHECK  (([cantidad]>(0)))
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado] CHECK CONSTRAINT [CK_MovimientoProductoTerminado_Cantidad]
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado]  WITH CHECK ADD  CONSTRAINT [CK_MovimientoProductoTerminado_Origen] CHECK  (([tipo_movimiento]='ENTRADA_PRODUCCION' AND [produccion_detalle_id] IS NOT NULL AND [entrega_detalle_id] IS NULL OR [tipo_movimiento]='SALIDA_ENTREGA' AND [entrega_detalle_id] IS NOT NULL AND [produccion_detalle_id] IS NULL OR ([tipo_movimiento]='AJUSTE_SALIDA' OR [tipo_movimiento]='AJUSTE_ENTRADA') AND [produccion_detalle_id] IS NULL AND [entrega_detalle_id] IS NULL))
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado] CHECK CONSTRAINT [CK_MovimientoProductoTerminado_Origen]
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado]  WITH CHECK ADD  CONSTRAINT [CK_MovimientoProductoTerminado_Tipo] CHECK  (([tipo_movimiento]='AJUSTE_SALIDA' OR [tipo_movimiento]='AJUSTE_ENTRADA' OR [tipo_movimiento]='SALIDA_ENTREGA' OR [tipo_movimiento]='ENTRADA_PRODUCCION'))
GO
ALTER TABLE [inventario].[MovimientoProductoTerminado] CHECK CONSTRAINT [CK_MovimientoProductoTerminado_Tipo]
GO
ALTER TABLE [ventas].[EntregaDetalle]  WITH CHECK ADD  CONSTRAINT [CK_EntregaDetalle_Cantidad] CHECK  (([cantidad_entregada]>(0)))
GO
ALTER TABLE [ventas].[EntregaDetalle] CHECK CONSTRAINT [CK_EntregaDetalle_Cantidad]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* ============================================================
   8. PROTEGER CABECERA DE MERMA CON MOVIMIENTOS

   Una cabecera que ya genero salida de inventario no debe
   eliminarse ni cambiar su fecha, porque forma parte del
   historial del almacen.

   Se permite cambiar solamente la observacion.
   ============================================================ */

CREATE   TRIGGER [inventario].[trg_Merma_ProtegerHistorial]
ON [inventario].[Merma]
AFTER UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    /*
     * DELETE de una merma que posee movimientos.
     */
    IF EXISTS (
        SELECT 1
        FROM deleted d
        LEFT JOIN inserted i
            ON i.merma_id = d.merma_id
        INNER JOIN inventario.MermaDetalle md
            ON md.merma_id = d.merma_id
        INNER JOIN inventario.MovimientoMateriaPrima mmp
            ON mmp.merma_detalle_id = md.merma_detalle_id
        WHERE i.merma_id IS NULL
    )
    BEGIN
        THROW 50422,
            'No se puede eliminar una merma que ya genero movimientos de inventario.',
            1;
    END;

    /*
     * Una vez que existen movimientos, no se cambia la fecha.
     * La observacion si puede corregirse.
     */
    IF EXISTS (
        SELECT 1
        FROM deleted d
        INNER JOIN inserted i
            ON i.merma_id = d.merma_id
        INNER JOIN inventario.MermaDetalle md
            ON md.merma_id = d.merma_id
        INNER JOIN inventario.MovimientoMateriaPrima mmp
            ON mmp.merma_detalle_id = md.merma_detalle_id
        WHERE i.fecha_merma <> d.fecha_merma
    )
    BEGIN
        THROW 50423,
            'No se puede cambiar la fecha de una merma que ya genero movimientos de inventario.',
            1;
    END;
END;
GO
ALTER TABLE [inventario].[Merma] ENABLE TRIGGER [trg_Merma_ProtegerHistorial]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* ============================================================
   7. PROTEGER DETALLES DE COMPOSICIONES PUBLICADAS

   Una composicion se considera publicada desde el momento en que
   fecha_vigencia_desde deja de ser NULL.

   Esto protege tanto:
   - la version actualmente vigente
   - las versiones historicas

   Para cambiar una receta debe crearse una version nueva.
   ============================================================ */

CREATE   TRIGGER [catalog].[trg_ProductoComposicionDetalle_ProtegerHistorial]
ON [catalog].[ProductoComposicionDetalle]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM inserted i
        INNER JOIN catalog.ProductoComposicion pc
            ON pc.producto_composicion_id =
               i.producto_composicion_id
        WHERE pc.fecha_vigencia_desde IS NOT NULL
    )
    OR EXISTS (
        SELECT 1
        FROM deleted d
        INNER JOIN catalog.ProductoComposicion pc
            ON pc.producto_composicion_id =
               d.producto_composicion_id
        WHERE pc.fecha_vigencia_desde IS NOT NULL
    )
    BEGIN
        THROW 50221,
            'Una composicion publicada no puede modificarse. Cree una nueva version.',
            1;
    END;
END;
GO
ALTER TABLE [catalog].[ProductoComposicionDetalle] ENABLE TRIGGER [trg_ProductoComposicionDetalle_ProtegerHistorial]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* ============================================================
   7. PROTEGER DETALLE DE MERMA UNA VEZ CONSUMIDO STOCK

   Una vez que un detalle genero movimientos de inventario,
   cambiar la cantidad/material/color/unidad romperia la
   trazabilidad.

   Por eso debe registrarse una correccion mediante una operacion
   futura de ajuste/reversion y NO editando el historial original.
   ============================================================ */

CREATE   TRIGGER [inventario].[trg_MermaDetalle_ProtegerMovimientos]
ON [inventario].[MermaDetalle]
AFTER UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM deleted d
        INNER JOIN inventario.MovimientoMateriaPrima mmp
            ON mmp.merma_detalle_id =
               d.merma_detalle_id
    )
    BEGIN
        THROW 50421,
            'No se puede modificar o eliminar una merma que ya genero movimientos de inventario.',
            1;
    END;
END;
GO
ALTER TABLE [inventario].[MermaDetalle] ENABLE TRIGGER [trg_MermaDetalle_ProtegerMovimientos]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* ============================================================
   8. PROTEGER IDENTIDAD DE VERSION PUBLICADA

   Una vez publicada una version no se permite cambiar:
   - producto
   - numero de version
   - fecha de inicio

   Si deja de ser vigente, solamente se permite cerrar su periodo
   mediante vigente = 0 y fecha_vigencia_hasta.

   Tambien se impide eliminar una version publicada.
   ============================================================ */

CREATE   TRIGGER [catalog].[trg_ProductoComposicion_ProtegerHistorial]
ON [catalog].[ProductoComposicion]
AFTER UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    /*
     * DELETE de una version ya publicada.
     */
    IF EXISTS (
        SELECT 1
        FROM deleted d
        LEFT JOIN inserted i
            ON i.producto_composicion_id =
               d.producto_composicion_id
        WHERE i.producto_composicion_id IS NULL
          AND d.fecha_vigencia_desde IS NOT NULL
    )
    BEGIN
        THROW 50222,
            'Una composicion publicada no puede eliminarse.',
            1;
    END;

    /*
     * Alteracion de identidad o fecha de inicio de una version
     * que ya habia sido publicada.
     */
    IF EXISTS (
        SELECT 1
        FROM deleted d
        INNER JOIN inserted i
            ON i.producto_composicion_id =
               d.producto_composicion_id
        WHERE d.fecha_vigencia_desde IS NOT NULL
          AND (
              i.producto_id <> d.producto_id
              OR i.version_numero <> d.version_numero
              OR ISNULL(i.fecha_vigencia_desde, '19000101')
                 <> ISNULL(d.fecha_vigencia_desde, '19000101')
          )
    )
    BEGIN
        THROW 50223,
            'No se puede cambiar la identidad de una composicion publicada.',
            1;
    END;

    /*
     * Una version historica no puede volver a activarse.
     */
    IF EXISTS (
        SELECT 1
        FROM deleted d
        INNER JOIN inserted i
            ON i.producto_composicion_id =
               d.producto_composicion_id
        WHERE d.fecha_vigencia_desde IS NOT NULL
          AND d.fecha_vigencia_hasta IS NOT NULL
          AND i.vigente = 1
    )
    BEGIN
        THROW 50224,
            'Una composicion historica no puede volver a ser vigente. Cree una nueva version.',
            1;
    END;
END;
GO
ALTER TABLE [catalog].[ProductoComposicion] ENABLE TRIGGER [trg_ProductoComposicion_ProtegerHistorial]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* ============================================================
   6. VALIDAR 100% AL ACTIVAR UNA COMPOSICION

   Flujo esperado:
   1. Crear composicion como vigente = 0.
   2. Insertar todos sus detalles.
   3. Activarla dentro de una transaccion:
         vigente = 1
         fecha_vigencia_desde = SYSDATETIME()

   En ese momento la BD comprueba que la suma sea exactamente 100%.
   ============================================================ */

CREATE   TRIGGER [catalog].[trg_ProductoComposicion_ValidarActivacion]
ON [catalog].[ProductoComposicion]
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM inserted i
        OUTER APPLY (
            SELECT
                SUM(pcd.porcentaje) AS total_porcentaje
            FROM catalog.ProductoComposicionDetalle pcd
            WHERE pcd.producto_composicion_id =
                  i.producto_composicion_id
        ) suma
        WHERE i.vigente = 1
          AND (
              suma.total_porcentaje IS NULL
              OR suma.total_porcentaje <> CONVERT(DECIMAL(9,6), 100)
          )
    )
    BEGIN
        THROW 50220,
            'No se puede activar la composicion: los porcentajes deben sumar exactamente 100%.',
            1;
    END;
END;
GO
ALTER TABLE [catalog].[ProductoComposicion] ENABLE TRIGGER [trg_ProductoComposicion_ValidarActivacion]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* ============================================================
   6. VALIDAR COMPOSICION AL REGISTRAR PRODUCCION

   La composicion utilizada debe:
   - pertenecer al mismo producto;
   - estar publicada;
   - ser la version vigente al momento de registrar el detalle.

   Una vez que posteriormente cambie la receta, el detalle de
   produccion conserva producto_composicion_id y por tanto queda
   asociado para siempre a la version historica utilizada.
   ============================================================ */

CREATE   TRIGGER [produccion].[trg_ProduccionDetalle_ValidarComposicion]
ON [produccion].[ProduccionDetalle]
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM inserted i
        LEFT JOIN catalog.ProductoComposicion pc
            ON pc.producto_composicion_id =
               i.producto_composicion_id
        WHERE pc.producto_composicion_id IS NULL
           OR pc.producto_id <> i.producto_id
           OR pc.fecha_vigencia_desde IS NULL
           OR pc.vigente <> 1
    )
    BEGIN
        THROW 50320,
            'La composicion seleccionada no es la composicion vigente del producto.',
            1;
    END;
END;
GO
ALTER TABLE [produccion].[ProduccionDetalle] ENABLE TRIGGER [trg_ProduccionDetalle_ValidarComposicion]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [ventas].[trg_ValidarEntregaDetalle]
ON [ventas].[EntregaDetalle]
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
ALTER TABLE [ventas].[EntregaDetalle] ENABLE TRIGGER [trg_ValidarEntregaDetalle]
GO
