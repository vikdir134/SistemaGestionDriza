-- GestionDriza: módulo autónomo de préstamos e inversiones.
-- NO modificar migraciones ya aplicadas. Ejecutar con backend/scripts/run-migrations.js.
-- El runner aporta la transacción y el checksum de cada migración.
SET XACT_ABORT ON;

IF OBJECT_ID('finance.Inversion', 'U') IS NULL
BEGIN
 CREATE TABLE finance.Inversion (
  inversion_id INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_FinInversion PRIMARY KEY,
  fecha DATE NOT NULL,
  aportante NVARCHAR(180) NOT NULL,
  motivo NVARCHAR(200) NOT NULL,
  descripcion NVARCHAR(1000) NULL,
  monto DECIMAL(18,2) NOT NULL CONSTRAINT CK_FinInversion_Monto CHECK(monto>0),
  moneda_codigo CHAR(3) NOT NULL CONSTRAINT FK_FinInversion_Moneda REFERENCES finance.Moneda(moneda_codigo),
  idempotency_key UNIQUEIDENTIFIER NOT NULL CONSTRAINT UQ_FinInversion_Idem UNIQUE,
  activo BIT NOT NULL CONSTRAINT DF_FinInversion_Activo DEFAULT(1),
  created_at DATETIME2(7) NOT NULL CONSTRAINT DF_FinInversion_Created DEFAULT SYSDATETIME(),
  created_by_usuario_id INT NOT NULL CONSTRAINT FK_FinInversion_Creador REFERENCES auth.Usuario(usuario_id),
  updated_at DATETIME2(7) NULL,
  updated_by_usuario_id INT NULL CONSTRAINT FK_FinInversion_Modificador REFERENCES auth.Usuario(usuario_id)
 );
 CREATE INDEX IX_FinInversion_Fecha ON finance.Inversion (fecha DESC, inversion_id DESC);
END;

IF OBJECT_ID('finance.InversionRetiro','U') IS NULL
BEGIN
 CREATE TABLE finance.InversionRetiro (
  inversion_retiro_id INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_FinInversionRetiro PRIMARY KEY,
  inversion_id INT NOT NULL CONSTRAINT FK_FinInversionRetiro_Inversion REFERENCES finance.Inversion(inversion_id),
  fecha DATE NOT NULL,
  monto DECIMAL(18,2) NOT NULL CONSTRAINT CK_FinInversionRetiro_Monto CHECK(monto>0),
  observacion NVARCHAR(500) NULL,
  idempotency_key UNIQUEIDENTIFIER NOT NULL CONSTRAINT UQ_FinInversionRetiro_Idem UNIQUE,
  activo BIT NOT NULL CONSTRAINT DF_FinInversionRetiro_Activo DEFAULT(1),
  created_at DATETIME2(7) NOT NULL CONSTRAINT DF_FinInversionRetiro_Created DEFAULT SYSDATETIME(),
  created_by_usuario_id INT NOT NULL CONSTRAINT FK_FinInversionRetiro_Creador REFERENCES auth.Usuario(usuario_id),
  anulado_at DATETIME2(7) NULL,
  anulado_by_usuario_id INT NULL CONSTRAINT FK_FinInversionRetiro_Anulador REFERENCES auth.Usuario(usuario_id)
 );
 CREATE INDEX IX_FinInversionRetiro_Inversion ON finance.InversionRetiro (inversion_id,activo);
END;

IF OBJECT_ID('finance.Prestamo','U') IS NULL
BEGIN
 CREATE TABLE finance.Prestamo (
  prestamo_id INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_FinPrestamo PRIMARY KEY,
  fecha DATE NOT NULL,
  direccion VARCHAR(10) NOT NULL CONSTRAINT CK_FinPrestamo_Direccion CHECK(direccion IN ('RECIBIDO','OTORGADO')),
  modalidad VARCHAR(12) NOT NULL CONSTRAINT CK_FinPrestamo_Modalidad CHECK(modalidad IN ('GENERAL','PROGRAMADO')),
  contraparte NVARCHAR(180) NOT NULL,
  descripcion NVARCHAR(1000) NULL,
  capital DECIMAL(18,2) NOT NULL CONSTRAINT CK_FinPrestamo_Capital CHECK(capital>0),
  moneda_codigo CHAR(3) NOT NULL CONSTRAINT FK_FinPrestamo_Moneda REFERENCES finance.Moneda(moneda_codigo),
  tiene_interes BIT NOT NULL CONSTRAINT DF_FinPrestamo_Interes DEFAULT(0),
  interes_acordado DECIMAL(18,2) NULL,
  -- Solo PROGRAMADO: tasa en % anual. NOMINAL_SIMPLE se prorratea /12;
  -- EFECTIVA_COMPUESTA se convierte a mensual mediante (1+TEA)^(1/12)-1.
  tasa_anual_pct DECIMAL(9,5) NULL,
  calculo_tasa VARCHAR(20) NULL,
  sistema_amortizacion VARCHAR(10) NULL,
  cronograma_tipo VARCHAR(10) NULL,
  plazo_meses INT NULL,
  primer_vencimiento DATE NULL,
  idempotency_key UNIQUEIDENTIFIER NOT NULL CONSTRAINT UQ_FinPrestamo_Idem UNIQUE,
  activo BIT NOT NULL CONSTRAINT DF_FinPrestamo_Activo DEFAULT(1),
  created_at DATETIME2(7) NOT NULL CONSTRAINT DF_FinPrestamo_Created DEFAULT SYSDATETIME(),
  created_by_usuario_id INT NOT NULL CONSTRAINT FK_FinPrestamo_Creador REFERENCES auth.Usuario(usuario_id),
  updated_at DATETIME2(7) NULL,
  updated_by_usuario_id INT NULL CONSTRAINT FK_FinPrestamo_Modificador REFERENCES auth.Usuario(usuario_id),
  CONSTRAINT CK_FinPrestamo_InteresAcordado CHECK(interes_acordado IS NULL OR interes_acordado>=0),
  CONSTRAINT CK_FinPrestamo_ModalidadDatos CHECK(
   (modalidad='GENERAL' AND tasa_anual_pct IS NULL AND calculo_tasa IS NULL AND sistema_amortizacion IS NULL AND cronograma_tipo IS NULL AND plazo_meses IS NULL AND primer_vencimiento IS NULL)
   OR
   (modalidad='PROGRAMADO' AND tiene_interes=1 AND interes_acordado IS NULL
    AND cronograma_tipo IN ('CALCULADO','MANUAL')
    AND ((cronograma_tipo='CALCULADO' AND tasa_anual_pct IS NOT NULL AND tasa_anual_pct>=0 AND tasa_anual_pct<=1000
       AND calculo_tasa IN ('NOMINAL_SIMPLE','EFECTIVA_COMPUESTA')
       AND sistema_amortizacion IN ('FRANCES','ALEMAN') AND plazo_meses BETWEEN 1 AND 360 AND primer_vencimiento IS NOT NULL)
     OR (cronograma_tipo='MANUAL' AND tasa_anual_pct IS NULL AND calculo_tasa IS NULL AND sistema_amortizacion IS NULL AND plazo_meses IS NULL AND primer_vencimiento IS NULL)))
  )
 );
 CREATE INDEX IX_FinPrestamo_Filtro ON finance.Prestamo(activo,direccion,modalidad,fecha DESC,prestamo_id DESC);
END;

IF OBJECT_ID('finance.PrestamoCuota','U') IS NULL
BEGIN
 CREATE TABLE finance.PrestamoCuota (
  cuota_id INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_FinPrestamoCuota PRIMARY KEY,
  prestamo_id INT NOT NULL CONSTRAINT FK_FinPrestamoCuota_Prestamo REFERENCES finance.Prestamo(prestamo_id),
  numero INT NOT NULL CONSTRAINT CK_FinPrestamoCuota_Numero CHECK(numero>0),
  fecha_vencimiento DATE NOT NULL,
  capital_programado DECIMAL(18,2) NOT NULL CONSTRAINT CK_FinPrestamoCuota_Capital CHECK(capital_programado>=0),
  interes_programado DECIMAL(18,2) NOT NULL CONSTRAINT CK_FinPrestamoCuota_Interes CHECK(interes_programado>=0),
  cargos_programados DECIMAL(18,2) NOT NULL CONSTRAINT DF_FinPrestamoCuota_Cargos DEFAULT(0)
    CONSTRAINT CK_FinPrestamoCuota_Cargos CHECK(cargos_programados>=0),
  CONSTRAINT UQ_FinPrestamoCuota_Numero UNIQUE(prestamo_id,numero),
  CONSTRAINT UQ_FinPrestamoCuota_Par UNIQUE(prestamo_id,cuota_id)
 );
 CREATE INDEX IX_FinPrestamoCuota_Prestamo ON finance.PrestamoCuota(prestamo_id,fecha_vencimiento);
END;

IF OBJECT_ID('finance.PrestamoPago','U') IS NULL
BEGIN
 CREATE TABLE finance.PrestamoPago (
  pago_id INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_FinPrestamoPago PRIMARY KEY,
  prestamo_id INT NOT NULL CONSTRAINT FK_FinPrestamoPago_Prestamo REFERENCES finance.Prestamo(prestamo_id),
  cuota_id INT NULL,
  fecha DATE NOT NULL,
  capital_pagado DECIMAL(18,2) NOT NULL CONSTRAINT DF_FinPrestamoPago_Capital DEFAULT(0) CONSTRAINT CK_FinPrestamoPago_Capital CHECK(capital_pagado>=0),
  interes_pagado DECIMAL(18,2) NOT NULL CONSTRAINT DF_FinPrestamoPago_Interes DEFAULT(0) CONSTRAINT CK_FinPrestamoPago_Interes CHECK(interes_pagado>=0),
  cargos_pagados DECIMAL(18,2) NOT NULL CONSTRAINT DF_FinPrestamoPago_Cargos DEFAULT(0) CONSTRAINT CK_FinPrestamoPago_Cargos CHECK(cargos_pagados>=0),
  observacion NVARCHAR(500) NULL,
  idempotency_key UNIQUEIDENTIFIER NOT NULL CONSTRAINT UQ_FinPrestamoPago_Idem UNIQUE,
  activo BIT NOT NULL CONSTRAINT DF_FinPrestamoPago_Activo DEFAULT(1),
  created_at DATETIME2(7) NOT NULL CONSTRAINT DF_FinPrestamoPago_Created DEFAULT SYSDATETIME(),
  created_by_usuario_id INT NOT NULL CONSTRAINT FK_FinPrestamoPago_Creador REFERENCES auth.Usuario(usuario_id),
  anulado_at DATETIME2(7) NULL,
  anulado_by_usuario_id INT NULL CONSTRAINT FK_FinPrestamoPago_Anulador REFERENCES auth.Usuario(usuario_id),
  CONSTRAINT FK_FinPrestamoPago_Cuota FOREIGN KEY(prestamo_id,cuota_id) REFERENCES finance.PrestamoCuota(prestamo_id,cuota_id),
  CONSTRAINT CK_FinPrestamoPago_Pos CHECK(capital_pagado+interes_pagado+cargos_pagados>0)
 );
 CREATE INDEX IX_FinPrestamoPago_Prestamo ON finance.PrestamoPago (prestamo_id,activo,fecha DESC,pago_id DESC);
END;
