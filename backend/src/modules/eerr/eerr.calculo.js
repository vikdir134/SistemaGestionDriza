// Reporte de gestión: importes registrados, sin tasas tributarias ni conversión
// de monedas. Las ediciones recalculan la historia, por decisión del negocio.
const centavos = value => Math.round((Number(value) + Number.EPSILON) * 100);
const cantidad3 = value => Math.round(Number(value) * 1000);
const sumar = rows => rows.reduce((total, row) => total + centavos(row.monto), 0) / 100;
const fecha = value => value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10);
const ordenar = (a, b) => a.fecha.localeCompare(b.fecha)
  || Number(a.entrega_id ?? a.deposito_id) - Number(b.entrega_id ?? b.deposito_id)
  || Number(a.entrega_detalle_id ?? 0) - Number(b.entrega_detalle_id ?? 0);

function calcularEerr({ mes, moneda, ventas = [], depositos = [], movimientos = [], consumos = [], gastos = [], intereses = [] }) {
  const delMes = row => row.fecha.startsWith(`${mes}-`);
  const pagos = new Map();
  for (const pago of depositos) {
    if (pago.moneda_codigo !== moneda) continue;
    const rows = pagos.get(pago.pedido_id) ?? [];
    rows.push({ ...pago, fecha: fecha(pago.fecha) });
    pagos.set(pago.pedido_id, rows);
  }
  for (const rows of pagos.values()) rows.sort(ordenar);

  const acumulados = new Map();
  const ventasMes = [];
  // Cada entrega participa una sola vez y pertenece exclusivamente a su fecha.
  // Un pago posterior solo cubre deuda; nunca origina otra fila de ventas.
  for (const venta of ventas.filter(row => row.moneda_codigo === moneda)
    .map(row => ({ ...row, fecha: fecha(row.fecha) })).sort(ordenar)) {
    const estado = acumulados.get(venta.pedido_id) ?? { entregado: 0, depositado: 0, indice: 0 };
    const rows = pagos.get(venta.pedido_id) ?? [];
    while (estado.indice < rows.length && rows[estado.indice].fecha <= venta.fecha) {
      estado.depositado += centavos(rows[estado.indice++].monto);
    }
    const importe = centavos(Number(venta.cantidad) * Number(venta.precio_unitario));
    const cubierto = Math.min(importe, Math.max(0, estado.depositado - estado.entregado));
    if (delMes(venta)) ventasMes.push({
      ...venta, monto: importe / 100, cubierto: cubierto / 100,
      credito: (importe - cubierto) / 100,
      depositado_a_fecha: estado.depositado / 100,
      entregado_anterior: estado.entregado / 100
    });
    estado.entregado += importe;
    acumulados.set(venta.pedido_id, estado);
  }

  const ventasPorId = new Map(ventasMes.map(row => [row.entrega_detalle_id, row]));
  const consumosPorProduccion = new Map();
  for (const consumo of consumos) {
    const rows = consumosPorProduccion.get(consumo.produccion_detalle_id) ?? [];
    rows.push(consumo);
    consumosPorProduccion.set(consumo.produccion_detalle_id, rows);
  }
  const stocks = new Map();
  const cantidadesCosteadas = new Map();
  const costos = [];
  const advertencias = new Set();
  const sinCosto = (venta, cantidad, motivo) => {
    costos.push({
      clave: `faltante-${venta.entrega_detalle_id}-${costos.length}`,
      entrega_detalle_id: venta.entrega_detalle_id, pedido_id: venta.pedido_id,
      codigo_pedido: venta.codigo_pedido, cliente: venta.cliente,
      fecha: venta.fecha, producto: venta.producto, cantidad_producto: cantidad / 1000,
      unidad_producto: venta.unidad, monto: null, motivo, moneda_codigo: moneda
    });
    advertencias.add(motivo);
  };

  for (const movimiento of [...movimientos].sort((a, b) => a.movimiento_id - b.movimiento_id)) {
    const stock = stocks.get(movimiento.stock_id) ?? { entradas: [], indice: 0 };
    stocks.set(movimiento.stock_id, stock);
    const cantidad = cantidad3(movimiento.cantidad);
    if (['ENTRADA_PRODUCCION', 'AJUSTE_ENTRADA'].includes(movimiento.tipo_movimiento)) {
      stock.entradas.push({ ...movimiento, restante: cantidad, utilizado: 0 });
      continue;
    }
    if (!['SALIDA_ENTREGA', 'AJUSTE_SALIDA'].includes(movimiento.tipo_movimiento)) continue;
    const venta = movimiento.tipo_movimiento === 'SALIDA_ENTREGA'
      ? ventasPorId.get(movimiento.entrega_detalle_id) : null;
    if (venta) cantidadesCosteadas.set(venta.entrega_detalle_id,
      (cantidadesCosteadas.get(venta.entrega_detalle_id) ?? 0) + cantidad);
    let pendiente = cantidad;
    while (pendiente > 0 && stock.indice < stock.entradas.length) {
      const entrada = stock.entradas[stock.indice];
      const retirar = Math.min(pendiente, entrada.restante);
      const componentes = consumosPorProduccion.get(entrada.produccion_detalle_id) ?? [];
      if (venta && retirar > 0) {
        if (!componentes.length || !(Number(entrada.cantidad_producida) > 0)) {
          sinCosto(venta, retirar, 'Hay entregas con stock sin producción o sin consumo de materia prima trazable.');
        } else {
          for (const componente of componentes) {
            const proporcion = retirar / cantidad3(entrada.cantidad_producida);
            const costoProduccion = Number(componente.cantidad) * Number(componente.precio_unitario);
            // Diferencia de costos acumulados: los céntimos de una producción
            // se reparten una sola vez incluso con muchas entregas parciales.
            const montoOrigen = (centavos(costoProduccion * (entrada.utilizado + retirar) / cantidad3(entrada.cantidad_producida))
              - centavos(costoProduccion * entrada.utilizado / cantidad3(entrada.cantidad_producida))) / 100;
            const mismaMoneda = componente.moneda_codigo === moneda;
            const unidadValida = String(componente.unidad).toUpperCase() === 'KG';
            const valido = mismaMoneda && unidadValida;
            const motivo = !mismaMoneda
              ? 'Hay materia prima en una moneda distinta a la venta. Falta un tipo de cambio para completar el costo.'
              : !unidadValida ? 'Hay consumos en una unidad distinta de KG sin conversión disponible.' : null;
            if (motivo) advertencias.add(motivo);
            costos.push({
              clave: `${movimiento.movimiento_id}-${entrada.movimiento_id}-${componente.consumo_id}`,
              entrega_detalle_id: venta.entrega_detalle_id, pedido_id: venta.pedido_id,
              codigo_pedido: venta.codigo_pedido, cliente: venta.cliente,
              fecha: venta.fecha, producto: venta.producto,
              produccion_id: entrada.produccion_id,
              produccion_detalle_id: entrada.produccion_detalle_id,
              compra_materia_prima_id: componente.compra_materia_prima_id,
              nombre_lote: componente.nombre_lote,
              material: componente.material, color: componente.color,
              cantidad_producto: retirar / 1000, unidad_producto: venta.unidad,
              cantidad_materia_prima: Number((Number(componente.cantidad) * proporcion).toFixed(6)),
              unidad: componente.unidad, precio_unitario: Number(componente.precio_unitario),
              moneda_codigo: componente.moneda_codigo, monto_origen: montoOrigen,
              monto: valido ? montoOrigen : null, motivo
            });
          }
        }
      }
      entrada.restante -= retirar;
      entrada.utilizado += retirar;
      pendiente -= retirar;
      if (entrada.restante === 0) stock.indice++;
    }
    if (venta && pendiente > 0) sinCosto(venta, pendiente,
      'Hay salidas sin entradas de producto terminado suficientes para reconstruir su costo.');
  }
  for (const venta of ventasMes) {
    const diferencia = cantidad3(venta.cantidad) - (cantidadesCosteadas.get(venta.entrega_detalle_id) ?? 0);
    if (diferencia > 0) sinCosto(venta, diferencia,
      'Hay entregas sin movimiento de salida de producto terminado vinculado.');
    if (diferencia < 0) sinCosto(venta, -diferencia,
      'La cantidad de las salidas de almacén no coincide con la entrega.');
  }

  const gastosMes = gastos.filter(row => row.moneda_codigo === moneda)
    .map(row => ({ ...row, fecha: fecha(row.fecha) })).filter(delMes);
  const esSunat = row => String(row.tipo_gasto).trim().toUpperCase() === 'SUNAT';
  const gastosOperativos = gastosMes.filter(row => !esSunat(row));
  const sunat = gastosMes.filter(esSunat);
  const interesesMes = intereses.filter(row => row.moneda_codigo === moneda)
    .map(row => ({ ...row, fecha: fecha(row.fecha) })).filter(delMes);
  const detalles = { ventas: ventasMes, costos, gastos: gastosOperativos, sunat, intereses: interesesMes };
  const { resumen, completo } = resumirEerr(detalles);
  const pedidosDelMes = new Set(ventasMes.map(row => row.pedido_id));

  return {
    mes, moneda, completo, advertencias: [...advertencias], resumen,
    detalles: { ...detalles,
      depositos: [...pagos.values()].flat().filter(row => pedidosDelMes.has(row.pedido_id)) }
  };
}

function resumirEerr({ ventas, costos, gastos, sunat, intereses }) {
  const totalVentas = sumar(ventas);
  const cubiertas = ventas.reduce((total, row) => total + centavos(row.cubierto), 0) / 100;
  const credito = (centavos(totalVentas) - centavos(cubiertas)) / 100;
  const costoIdentificado = sumar(costos.filter(row => row.monto !== null));
  const completo = costos.every(row => row.monto !== null);
  const costo = completo ? costoIdentificado : null;
  const totalGastos = sumar(gastos);
  const totalSunat = sumar(sunat);
  const totalIntereses = sumar(intereses);
  const financiero = (centavos(totalSunat) + centavos(totalIntereses)) / 100;
  const bruta = completo ? (centavos(totalVentas) - centavos(costo)) / 100 : null;
  const operacional = completo ? (centavos(bruta) - centavos(totalGastos)) / 100 : null;
  const neta = completo ? (centavos(operacional) - centavos(financiero)) / 100 : null;
  return {
    completo,
    resumen: { ventas_cubiertas: cubiertas, ventas_credito: credito, ventas: totalVentas,
      costo_ventas: costo, costo_identificado: costoIdentificado, utilidad_bruta: bruta,
      gastos: totalGastos, utilidad_operacional: operacional, sunat: totalSunat,
      intereses: totalIntereses, financieros_impuestos: financiero, utilidad_neta: neta }
  };
}

module.exports = { calcularEerr, resumirEerr };
