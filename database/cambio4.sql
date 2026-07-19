USE SistemaGestionDriza;
GO

IF COL_LENGTH('crm.ClientePrecioHistorial', 'pedido_id') IS NULL
BEGIN
    ALTER TABLE crm.ClientePrecioHistorial
    ADD pedido_id INT NULL;
END
GO

IF COL_LENGTH('crm.ClientePrecioHistorial', 'pedido_detalle_id') IS NULL
BEGIN
    ALTER TABLE crm.ClientePrecioHistorial
    ADD pedido_detalle_id INT NULL;
END
GO