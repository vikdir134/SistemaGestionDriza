// Una fila por entrega, pago o consumo. No unir depósitos con entregas:
// esas relaciones de varios a varios multiplicarían los importes.
const EERR_SQL = `
  SELECT ed.entrega_detalle_id, ed.entrega_id, e.pedido_id,
    CONVERT(char(10), e.fecha_entrega, 23) AS fecha,
    p.codigo_pedido, c.cliente_id, c.razon_social AS cliente, c.ruc,
    pd.pedido_detalle_id, ed.cantidad_entregada AS cantidad,
    pd.precio_unitario, pd.moneda_codigo, um.codigo AS unidad,
    CONCAT(tp.nombre, ' ', mat.nombre, ' ', med.nombre, ' ', col.nombre) AS producto
  FROM ventas.EntregaDetalle ed
  JOIN ventas.Entrega e ON e.entrega_id = ed.entrega_id
  JOIN ventas.PedidoDetalle pd ON pd.pedido_detalle_id = ed.pedido_detalle_id
  JOIN ventas.Pedido p ON p.pedido_id = e.pedido_id
  JOIN crm.Cliente c ON c.cliente_id = p.cliente_id
  JOIN catalog.UnidadMedida um ON um.unidad_medida_id = ed.unidad_medida_id
  JOIN catalog.TipoProducto tp ON tp.tipo_producto_id = pd.tipo_producto_id
  JOIN catalog.Material mat ON mat.material_id = pd.material_id
  JOIN catalog.Medida med ON med.medida_id = pd.medida_id
  JOIN catalog.Color col ON col.color_id = pd.color_id
  WHERE e.fecha_entrega < @fin AND pd.moneda_codigo = @moneda
  ORDER BY e.fecha_entrega, e.entrega_id, ed.entrega_detalle_id;

  SELECT d.deposito_id, d.pedido_id, d.moneda_codigo, d.monto,
    CONVERT(char(10), d.fecha_deposito, 23) AS fecha, d.numero_operacion
  FROM finance.Deposito d
  WHERE d.fecha_deposito < @fin AND d.moneda_codigo = @moneda
    AND EXISTS (SELECT 1 FROM ventas.Entrega e
      WHERE e.pedido_id = d.pedido_id AND e.fecha_entrega < @fin)
  ORDER BY d.fecha_deposito, d.deposito_id;

  -- Reconstruir FIFO por presentación en el orden real de registro del almacén.
  -- Incluir todas las salidas anteriores, aunque correspondan a otras monedas,
  -- y ajustes: también consumen existencias y no deben costearse de nuevo.
  WITH Limites AS (
    SELECT m.stock_producto_terminado_id,
      MAX(m.movimiento_producto_terminado_id) AS ultimo_movimiento
    FROM inventario.MovimientoProductoTerminado m
    JOIN ventas.EntregaDetalle ed ON ed.entrega_detalle_id = m.entrega_detalle_id
    JOIN ventas.Entrega e ON e.entrega_id = ed.entrega_id
    JOIN ventas.PedidoDetalle pd ON pd.pedido_detalle_id = ed.pedido_detalle_id
    WHERE m.tipo_movimiento = 'SALIDA_ENTREGA'
      AND e.fecha_entrega >= @inicio AND e.fecha_entrega < @fin
      AND pd.moneda_codigo = @moneda
    GROUP BY m.stock_producto_terminado_id
  )
  SELECT m.movimiento_producto_terminado_id AS movimiento_id,
    m.stock_producto_terminado_id AS stock_id, m.tipo_movimiento,
    m.cantidad, m.produccion_detalle_id, m.entrega_detalle_id,
    pd.produccion_id, pd.cantidad_producida
  INTO #MovimientosEerr
  FROM inventario.MovimientoProductoTerminado m
  JOIN Limites l ON l.stock_producto_terminado_id = m.stock_producto_terminado_id
    AND m.movimiento_producto_terminado_id <= l.ultimo_movimiento
  LEFT JOIN produccion.ProduccionDetalle pd
    ON pd.produccion_detalle_id = m.produccion_detalle_id;

  SELECT * FROM #MovimientosEerr ORDER BY movimiento_id;

  SELECT mm.movimiento_materia_prima_id AS consumo_id,
    mm.produccion_detalle_id, mm.cantidad, d.precio_unitario,
    cmp.compra_materia_prima_id, cmp.nombre_lote, cmp.moneda_codigo,
    mat.nombre AS material, col.nombre AS color,
    um.codigo AS unidad
  FROM inventario.MovimientoMateriaPrima mm
  JOIN inventario.StockMateriaPrimaLote s
    ON s.stock_materia_prima_lote_id = mm.stock_materia_prima_lote_id
  JOIN compras.CompraMateriaPrimaDetalle d
    ON d.compra_materia_prima_detalle_id = s.compra_materia_prima_detalle_id
  JOIN compras.CompraMateriaPrima cmp
    ON cmp.compra_materia_prima_id = d.compra_materia_prima_id
  JOIN catalog.Material mat ON mat.material_id = d.material_id
  JOIN catalog.Color col ON col.color_id = d.color_id
  JOIN catalog.UnidadMedida um ON um.unidad_medida_id = d.unidad_medida_id
  WHERE mm.tipo_movimiento = 'SALIDA_PRODUCCION'
    AND EXISTS (SELECT 1 FROM #MovimientosEerr m
      WHERE m.produccion_detalle_id = mm.produccion_detalle_id)
  ORDER BY mm.movimiento_materia_prima_id;

  SELECT g.gasto_id, CONVERT(char(10), g.fecha_gasto, 23) AS fecha,
    g.monto, g.moneda_codigo, tg.nombre AS tipo_gasto,
    g.descripcion, g.comprobante, p.razon_social AS proveedor
  FROM finance.Gasto g
  JOIN finance.TipoGasto tg ON tg.tipo_gasto_id = g.tipo_gasto_id
  LEFT JOIN compras.Proveedor p ON p.proveedor_id = g.proveedor_id
  WHERE g.activo = 1 AND g.fecha_gasto >= @inicio AND g.fecha_gasto < @fin
    AND g.moneda_codigo = @moneda
  ORDER BY g.fecha_gasto, g.gasto_id;

  SELECT pg.pago_id, pg.prestamo_id, CONVERT(char(10), pg.fecha, 23) AS fecha,
    pg.interes_pagado AS monto, p.moneda_codigo, p.contraparte,
    pg.observacion, pg.cuota_id
  FROM finance.PrestamoPago pg
  JOIN finance.Prestamo p ON p.prestamo_id = pg.prestamo_id
  WHERE pg.activo = 1 AND p.activo = 1 AND p.direccion = 'RECIBIDO'
    AND pg.fecha >= @inicio AND pg.fecha < @fin
    AND p.moneda_codigo = @moneda AND pg.interes_pagado > 0
  ORDER BY pg.fecha, pg.pago_id;

  DROP TABLE #MovimientosEerr;
`;

const PEDIDOS_ANUALES_SQL = `
  SELECT p.pedido_id, p.codigo_pedido, p.cliente_id, p.estado_pedido,
    CONVERT(char(10), p.fecha_pedido, 23) AS fecha,
    c.razon_social AS cliente, c.ruc, @moneda AS moneda_codigo,
    SUM(pd.cantidad_pedida * pd.precio_unitario) AS monto
  FROM ventas.Pedido p
  JOIN crm.Cliente c ON c.cliente_id = p.cliente_id
  JOIN ventas.PedidoDetalle pd ON pd.pedido_id = p.pedido_id
    AND pd.activo = 1 AND pd.moneda_codigo = @moneda
  WHERE p.fecha_pedido >= @inicio AND p.fecha_pedido < @fin
    AND p.estado_pedido <> 'CANCELADO'
  GROUP BY p.pedido_id, p.codigo_pedido, p.cliente_id, p.estado_pedido,
    p.fecha_pedido, c.razon_social, c.ruc
  ORDER BY p.fecha_pedido, p.pedido_id;
`;

module.exports = { EERR_SQL, PEDIDOS_ANUALES_SQL };
