const { calcularEerr, resumirEerr } = require('./eerr.calculo');
const centavos = value => Math.round((Number(value) + Number.EPSILON) * 100);
const fecha = value => value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10);

// Saldo de entregas al corte, incluyendo deuda de años anteriores. Los anticipos
// no originan una cuenta por cobrar ni compensan pedidos o monedas diferentes.
function calcularCartera({ ventas = [], depositos = [], moneda, corte }) {
  const pedidos = new Map();
  for (const venta of ventas) {
    if (venta.moneda_codigo !== moneda || fecha(venta.fecha) > corte) continue;
    const pedido = pedidos.get(venta.pedido_id) ?? {
      pedido_id: venta.pedido_id, codigo_pedido: venta.codigo_pedido,
      cliente_id: venta.cliente_id, cliente: venta.cliente, ruc: venta.ruc,
      fecha: fecha(venta.fecha), ultima_entrega: fecha(venta.fecha), entregado: 0, pagado: 0
    };
    pedido.entregado += centavos(Number(venta.cantidad) * Number(venta.precio_unitario));
    pedido.fecha = pedido.fecha < fecha(venta.fecha) ? pedido.fecha : fecha(venta.fecha);
    pedido.ultima_entrega = pedido.ultima_entrega > fecha(venta.fecha) ? pedido.ultima_entrega : fecha(venta.fecha);
    pedidos.set(venta.pedido_id, pedido);
  }
  for (const pago of depositos) {
    if (pago.moneda_codigo !== moneda || fecha(pago.fecha) > corte) continue;
    const pedido = pedidos.get(pago.pedido_id);
    if (pedido) pedido.pagado += centavos(pago.monto);
  }
  return [...pedidos.values()].filter(row => row.entregado > row.pagado).map(row => ({
    ...row, entregado: row.entregado / 100,
    pagado: Math.min(row.pagado, row.entregado) / 100,
    saldo: (row.entregado - row.pagado) / 100
  })).sort((a, b) => b.saldo - a.saldo || a.pedido_id - b.pedido_id);
}

function calcularEerrAnual({ anio, moneda, corte, pedidos = [], ...datos }) {
  const ano = String(anio);
  const hastaCorte = rows => (rows ?? []).filter(row => fecha(row.fecha) <= corte);
  const ventas = hastaCorte(datos.ventas);
  const depositos = hastaCorte(datos.depositos);
  const resultado = calcularEerr({ ...datos, ventas, depositos,
    gastos: hastaCorte(datos.gastos), intereses: hastaCorte(datos.intereses), mes: ano, moneda });
  const pedidosAnio = hastaCorte(pedidos).filter(row => fecha(row.fecha).startsWith(`${ano}-`)
    && row.moneda_codigo === moneda && row.estado_pedido !== 'CANCELADO');
  const cartera = calcularCartera({ ventas, depositos, moneda, corte });
  const cuentaClientes = rows => new Set(rows.map(row => row.cliente_id ?? row.ruc)).size;
  const clientes = new Map();
  for (const venta of resultado.detalles.ventas) {
    const id = venta.cliente_id ?? venta.ruc;
    const cliente = clientes.get(id) ?? { cliente_id: venta.cliente_id, cliente: venta.cliente,
      ruc: venta.ruc, importe: 0, pedidos: new Set() };
    cliente.importe += centavos(venta.monto);
    cliente.pedidos.add(venta.pedido_id);
    clientes.set(id, cliente);
  }
  const ranking = [...clientes.values()].map(row => ({
    ...row, importe: row.importe / 100, pedidos: row.pedidos.size
  })).sort((a, b) => b.importe - a.importe || String(a.cliente_id ?? a.ruc).localeCompare(String(b.cliente_id ?? b.ruc)));
  const meses = Array.from({ length: 12 }, (_, index) => {
    const mes = `${ano}-${String(index + 1).padStart(2, '0')}`;
    if (mes > corte.slice(0, 7)) return { mes, habilitado: false, resumen: null,
      cuentas_por_cobrar: null, pedidos: null, clientes: null };
    const finMes = new Date(Date.UTC(Number(anio), index + 1, 0)).toISOString().slice(0, 10);
    const corteMes = finMes < corte ? finMes : corte;
    const detallesMes = Object.fromEntries(['ventas', 'costos', 'gastos', 'sunat', 'intereses']
      .map(key => [key, resultado.detalles[key].filter(row => row.fecha.startsWith(`${mes}-`))]));
    const saldoMes = calcularCartera({ ventas, depositos, moneda, corte: corteMes });
    return { mes, habilitado: true, corte: corteMes, ...resumirEerr(detallesMes),
      cuentas_por_cobrar: saldoMes.reduce((total, row) => total + centavos(row.saldo), 0) / 100,
      pedidos: pedidosAnio.filter(row => fecha(row.fecha).startsWith(`${mes}-`)).length,
      clientes: cuentaClientes(detallesMes.ventas) };
  });
  return { anio: Number(anio), moneda, corte, completo: resultado.completo,
    advertencias: resultado.advertencias, resumen: resultado.resumen,
    indicadores: { ventas: resultado.resumen.ventas,
      cuentas_por_cobrar: cartera.reduce((total, row) => total + centavos(row.saldo), 0) / 100,
      pedidos: pedidosAnio.length, clientes: cuentaClientes(resultado.detalles.ventas),
      pedidos_por_cobrar: cartera.length },
    meses, clientes: ranking,
    detalles: { ...resultado.detalles, cartera, pedidos: pedidosAnio }
  };
}

module.exports = { calcularEerrAnual, calcularCartera };
