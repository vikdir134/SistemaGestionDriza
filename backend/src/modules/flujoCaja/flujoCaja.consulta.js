// Un hecho por origen e ID. Los pagos de préstamos se desglosan por componente,
// sin volver a incluir su importe total. No se toman pedidos, entregas ni stock.
const MOVIMIENTOS_CAJA_SQL = `
  WITH MovimientosCaja AS (
    SELECT CONCAT('deposito:', d.deposito_id) AS clave, d.fecha_deposito AS fecha,
      d.moneda_codigo, 'COBROS_CLIENTES' AS categoria, 'ENTRADA' AS sentido,
      d.monto, CONCAT('Depósito del pedido ', p.codigo_pedido) AS descripcion,
      c.razon_social AS tercero, d.numero_operacion AS referencia,
      CONCAT('/gestion/depositos/', d.pedido_id) AS ruta
    FROM finance.Deposito d
    LEFT JOIN ventas.Pedido p ON p.pedido_id = d.pedido_id
    LEFT JOIN crm.Cliente c ON c.cliente_id = p.cliente_id
    UNION ALL
    SELECT CONCAT('gasto:', g.gasto_id), g.fecha_gasto, g.moneda_codigo,
      CASE WHEN UPPER(LTRIM(RTRIM(t.nombre))) = 'SUNAT' THEN 'SUNAT' ELSE 'GASTOS' END,
      'SALIDA', g.monto, g.descripcion, pr.razon_social, g.comprobante,
      CONCAT('/gestion/gastos/', g.gasto_id, '/editar')
    FROM finance.Gasto g
    JOIN finance.TipoGasto t ON t.tipo_gasto_id = g.tipo_gasto_id
    LEFT JOIN compras.Proveedor pr ON pr.proveedor_id = g.proveedor_id
    WHERE g.activo = 1
    UNION ALL
    SELECT CONCAT('compra:', c.compra_id), c.fecha_compra, c.moneda_codigo,
      'COMPRAS_GENERALES', 'SALIDA', c.monto_total, c.descripcion,
      pr.razon_social, c.numero_documento, CONCAT('/gestion/compras/', c.compra_id)
    FROM compras.Compra c
    LEFT JOIN compras.Proveedor pr ON pr.proveedor_id = c.proveedor_id
    UNION ALL
    SELECT CONCAT('materia_prima:', c.compra_materia_prima_id), c.fecha_compra,
      c.moneda_codigo, 'COMPRAS_MATERIA_PRIMA', 'SALIDA', c.monto_total,
      CONCAT('Lote ', c.nombre_lote), pr.razon_social, c.numero_documento,
      CONCAT('/gestion/compras-materia-prima/', c.compra_materia_prima_id)
    FROM compras.CompraMateriaPrima c
    LEFT JOIN compras.Proveedor pr ON pr.proveedor_id = c.proveedor_id
    UNION ALL
    SELECT CONCAT('inversion:', i.inversion_id), i.fecha, i.moneda_codigo,
      'APORTES', 'ENTRADA', i.monto, i.motivo, i.aportante,
      CONCAT('Inversión #', i.inversion_id), '/gestion/inversiones'
    FROM finance.Inversion i WHERE i.activo = 1
    UNION ALL
    SELECT CONCAT('retiro:', r.inversion_retiro_id), r.fecha, i.moneda_codigo,
      'DEVOLUCION_APORTES', 'SALIDA', r.monto, r.observacion, i.aportante,
      CONCAT('Devolución #', r.inversion_retiro_id, ' · inversión #', i.inversion_id), '/gestion/inversiones'
    FROM finance.InversionRetiro r
    JOIN finance.Inversion i ON i.inversion_id = r.inversion_id
    WHERE r.activo = 1 AND i.activo = 1
    UNION ALL
    SELECT CONCAT('prestamo:', p.prestamo_id), p.fecha, p.moneda_codigo,
      CASE WHEN p.direccion = 'RECIBIDO' THEN 'PRESTAMOS_RECIBIDOS' ELSE 'PRESTAMOS_OTORGADOS' END,
      CASE WHEN p.direccion = 'RECIBIDO' THEN 'ENTRADA' ELSE 'SALIDA' END,
      p.capital, p.descripcion, p.contraparte, CONCAT('Préstamo #', p.prestamo_id), '/gestion/prestamos'
    FROM finance.Prestamo p WHERE p.activo = 1
    UNION ALL
    SELECT CONCAT('pago_prestamo:', pg.pago_id, ':', componente.tipo), pg.fecha,
      p.moneda_codigo,
      CASE WHEN p.direccion = 'RECIBIDO' THEN
        CASE componente.tipo WHEN 'CAPITAL' THEN 'PAGO_CAPITAL' WHEN 'INTERES' THEN 'PAGO_INTERESES' ELSE 'PAGO_CARGOS' END
      ELSE
        CASE componente.tipo WHEN 'CAPITAL' THEN 'COBRO_CAPITAL' WHEN 'INTERES' THEN 'COBRO_INTERESES' ELSE 'COBRO_CARGOS' END END,
      CASE WHEN p.direccion = 'RECIBIDO' THEN 'SALIDA' ELSE 'ENTRADA' END,
      componente.monto, pg.observacion, p.contraparte,
      CONCAT('Pago #', pg.pago_id, ' · préstamo #', p.prestamo_id), '/gestion/prestamos'
    FROM finance.PrestamoPago pg
    JOIN finance.Prestamo p ON p.prestamo_id = pg.prestamo_id
    CROSS APPLY (VALUES ('CAPITAL', pg.capital_pagado),
      ('INTERES', pg.interes_pagado), ('CARGO', pg.cargos_pagados)) componente(tipo, monto)
    WHERE pg.activo = 1 AND p.activo = 1 AND componente.monto > 0
  )
  SELECT clave, CONVERT(char(10), fecha, 23) AS fecha, moneda_codigo,
    categoria, sentido, monto, descripcion, tercero, referencia, ruta
  FROM MovimientosCaja
  WHERE moneda_codigo = @moneda AND fecha < @fin AND monto > 0
  ORDER BY fecha, clave;
`;

module.exports = { MOVIMIENTOS_CAJA_SQL };
