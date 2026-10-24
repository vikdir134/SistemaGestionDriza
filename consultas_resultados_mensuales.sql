-- SQL Server. Solo lectura de tablas del sistema; usa una tabla temporal.
-- Costo de PT: promedio ponderado de producciones ingresadas al mismo stock
-- antes de cada salida (orden de registro: movimiento_producto_terminado_id).
-- Los precios son los de las compras de MP realmente consumidas.
-- No implica trazabilidad de un lote concreto de PT a una entrega.
DECLARE @Desde DATE = '20260101';
DECLARE @Hasta DATE = '20261023';
DECLARE @Moneda CHAR(3) = 'PEN';

IF @Desde > @Hasta
    THROW 50001, N'La fecha inicial debe ser menor o igual a la final.', 1;

;WITH Meses AS (
    SELECT DATEFROMPARTS(YEAR(@Desde), MONTH(@Desde), 1) AS mes
    UNION ALL
    SELECT DATEADD(MONTH, 1, mes)
    FROM Meses
    WHERE DATEADD(MONTH, 1, mes) <= @Hasta
),
-- Una fila por producción: costo de sus consumos reales, sin duplicar PT.
CostoProduccion AS (
    SELECT
        mp.produccion_detalle_id,
        SUM(CAST(mp.cantidad * cd.precio_unitario AS DECIMAL(28,8))) AS costo,
        SUM(CASE WHEN c.moneda_codigo <> @Moneda THEN 1 ELSE 0 END)
            AS consumos_otra_moneda
    FROM inventario.MovimientoMateriaPrima AS mp
    INNER JOIN inventario.StockMateriaPrimaLote AS l
        ON l.stock_materia_prima_lote_id = mp.stock_materia_prima_lote_id
    INNER JOIN compras.CompraMateriaPrimaDetalle AS cd
        ON cd.compra_materia_prima_detalle_id = l.compra_materia_prima_detalle_id
    INNER JOIN compras.CompraMateriaPrima AS c
        ON c.compra_materia_prima_id = cd.compra_materia_prima_id
    WHERE mp.tipo_movimiento = 'SALIDA_PRODUCCION'
    GROUP BY mp.produccion_detalle_id
),
EntradasPT AS (
    SELECT
        m.movimiento_producto_terminado_id,
        m.stock_producto_terminado_id,
        m.cantidad,
        -- Prorratear evita cargar dos veces el costo si hay varias entradas.
        CAST(cp.costo / NULLIF(pd.cantidad_producida, 0)
            * m.cantidad AS DECIMAL(28,8)) AS costo_entrada,
        CASE WHEN cp.produccion_detalle_id IS NULL
                   OR cp.consumos_otra_moneda > 0
                   OR pd.cantidad_producida <= 0
             THEN 1 ELSE 0 END AS sin_costo
    FROM inventario.MovimientoProductoTerminado AS m
    LEFT JOIN produccion.ProduccionDetalle AS pd
        ON pd.produccion_detalle_id = m.produccion_detalle_id
    LEFT JOIN CostoProduccion AS cp
        ON cp.produccion_detalle_id = m.produccion_detalle_id
    WHERE m.tipo_movimiento = 'ENTRADA_PRODUCCION'
),
EntregaValorada AS (
    SELECT
        e.fecha_entrega AS fecha,
        CAST(ed.cantidad_entregada * pd.precio_unitario
            AS DECIMAL(28,8)) AS valor_entregado,
        CASE WHEN sal.cantidad_salida IS NULL
                   OR sal.cantidad_salida <> ed.cantidad_entregada
                   OR sal.salidas_sin_costo > 0
             THEN NULL ELSE sal.costo_mp END AS costo_mp,
        CASE WHEN sal.cantidad_salida IS NULL
                   OR sal.cantidad_salida <> ed.cantidad_entregada
                   OR sal.salidas_sin_costo > 0
             THEN 1 ELSE 0 END AS detalle_sin_costo
    FROM ventas.Entrega AS e
    INNER JOIN ventas.EntregaDetalle AS ed
        ON ed.entrega_id = e.entrega_id
    INNER JOIN ventas.PedidoDetalle AS pd
        ON pd.pedido_detalle_id = ed.pedido_detalle_id
    OUTER APPLY (
        SELECT
            SUM(s.cantidad) AS cantidad_salida,
            SUM(CAST(s.cantidad * pr.costo_total
                / NULLIF(pr.cantidad_total, 0) AS DECIMAL(28,8))) AS costo_mp,
            SUM(CASE WHEN pr.cantidad_total IS NULL
                           OR pr.cantidad_total <= 0
                           OR pr.entradas_sin_costo > 0
                     THEN 1 ELSE 0 END) AS salidas_sin_costo
        FROM inventario.MovimientoProductoTerminado AS s
        OUTER APPLY (
            SELECT
                SUM(en.cantidad) AS cantidad_total,
                SUM(en.costo_entrada) AS costo_total,
                SUM(en.sin_costo) AS entradas_sin_costo
            FROM EntradasPT AS en
            WHERE en.stock_producto_terminado_id = s.stock_producto_terminado_id
              AND en.movimiento_producto_terminado_id
                    < s.movimiento_producto_terminado_id
        ) AS pr
        WHERE s.entrega_detalle_id = ed.entrega_detalle_id
          AND s.tipo_movimiento = 'SALIDA_ENTREGA'
    ) AS sal
    WHERE pd.moneda_codigo = @Moneda
      AND e.fecha_entrega BETWEEN @Desde AND @Hasta
),
EntregasMes AS (
    SELECT
        DATEFROMPARTS(YEAR(fecha), MONTH(fecha), 1) AS mes,
        SUM(valor_entregado) AS valor_entregado,
        SUM(costo_mp) AS costo_mp,
        SUM(detalle_sin_costo) AS detalles_sin_costo
    FROM EntregaValorada
    GROUP BY DATEFROMPARTS(YEAR(fecha), MONTH(fecha), 1)
),
DepositosMes AS (
    SELECT
        DATEFROMPARTS(YEAR(fecha_deposito), MONTH(fecha_deposito), 1) AS mes,
        SUM(monto) AS depositos
    FROM finance.Deposito
    WHERE moneda_codigo = @Moneda
      AND fecha_deposito BETWEEN @Desde AND @Hasta
    -- Se incluyen todos los tipos de depósito.
    GROUP BY DATEFROMPARTS(YEAR(fecha_deposito), MONTH(fecha_deposito), 1)
),
GastosMes AS (
    SELECT
        DATEFROMPARTS(YEAR(fecha_gasto), MONTH(fecha_gasto), 1) AS mes,
        SUM(monto) AS gastos
    FROM finance.Gasto
    WHERE activo = 1
      AND moneda_codigo = @Moneda
      AND fecha_gasto BETWEEN @Desde AND @Hasta
    GROUP BY DATEFROMPARTS(YEAR(fecha_gasto), MONTH(fecha_gasto), 1)
)
SELECT
    m.mes,
    COALESCE(d.depositos, 0) AS depositos,
    COALESCE(e.valor_entregado, 0) AS valor_entregado,
    CASE WHEN COALESCE(e.detalles_sin_costo, 0) > 0 THEN NULL
         ELSE COALESCE(e.costo_mp, 0) END AS costo_mp_entregada,
    COALESCE(g.gastos, 0) AS gastos,
    COALESCE(e.detalles_sin_costo, 0) AS detalles_entrega_sin_costo
INTO #ResultadosMensuales
FROM Meses AS m
LEFT JOIN DepositosMes AS d ON d.mes = m.mes
LEFT JOIN EntregasMes AS e ON e.mes = m.mes
LEFT JOIN GastosMes AS g ON g.mes = m.mes
OPTION (MAXRECURSION 0);

-- CONSULTA 1: depósitos por su fecha menos costo de entregas por su fecha
-- y gastos por su fecha. Es un resultado gerencial mixto, no saldo bancario.
SELECT
    CONVERT(CHAR(7), mes, 120) AS mes,
    @Moneda AS moneda,
    depositos,
    CAST(costo_mp_entregada AS DECIMAL(18,2)) AS costo_mp_entregada,
    gastos,
    CAST(depositos - costo_mp_entregada - gastos AS DECIMAL(18,2))
        AS resultado_por_depositos,
    detalles_entrega_sin_costo
FROM #ResultadosMensuales
ORDER BY mes;

-- CONSULTA 2: cantidad entregada por precio del pedido, menos costo y gastos.
-- No resta depósitos ni usa cantidades pendientes de entregar.
SELECT
    CONVERT(CHAR(7), mes, 120) AS mes,
    @Moneda AS moneda,
    CAST(valor_entregado AS DECIMAL(18,2)) AS valor_entregado,
    CAST(costo_mp_entregada AS DECIMAL(18,2)) AS costo_mp_entregada,
    gastos,
    CAST(valor_entregado - costo_mp_entregada - gastos AS DECIMAL(18,2))
        AS resultado_por_entregas,
    detalles_entrega_sin_costo
FROM #ResultadosMensuales
ORDER BY mes;

DROP TABLE #ResultadosMensuales;
