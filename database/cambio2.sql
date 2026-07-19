USE SistemaGestionDriza;
GO

IF COL_LENGTH('crm.Cliente', 'agencia_entrega') IS NULL
BEGIN
    ALTER TABLE crm.Cliente
    ADD agencia_entrega NVARCHAR(150) NULL;
END
GO