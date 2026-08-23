IF COL_LENGTH('finance.Gasto', 'activo') IS NULL
BEGIN
    ALTER TABLE finance.Gasto
    ADD activo BIT NOT NULL
        CONSTRAINT DF_Gasto_Activo DEFAULT (1) WITH VALUES;
END;


IF COL_LENGTH('finance.Gasto', 'updated_at') IS NULL
BEGIN
    ALTER TABLE finance.Gasto
    ADD updated_at DATETIME2(7) NULL;
END;


IF COL_LENGTH('finance.Gasto', 'updated_by_usuario_id') IS NULL
BEGIN
    ALTER TABLE finance.Gasto
    ADD updated_by_usuario_id INT NULL;
END;


IF NOT EXISTS (
    SELECT 1
    FROM sys.foreign_keys
    WHERE name = 'FK_Gasto_UsuarioActualiza'
      AND parent_object_id = OBJECT_ID('finance.Gasto')
)
BEGIN
    ALTER TABLE finance.Gasto
    WITH CHECK ADD CONSTRAINT FK_Gasto_UsuarioActualiza
    FOREIGN KEY (updated_by_usuario_id)
    REFERENCES auth.Usuario(usuario_id);

    ALTER TABLE finance.Gasto
    CHECK CONSTRAINT FK_Gasto_UsuarioActualiza;
END;


IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_Gasto_Activo_CreatedAt'
      AND object_id = OBJECT_ID('finance.Gasto')
)
BEGIN
    CREATE INDEX IX_Gasto_Activo_CreatedAt
    ON finance.Gasto (
        activo,
        created_at DESC
    );
END;