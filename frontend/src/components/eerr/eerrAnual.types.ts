export type ResumenAnual = {
  ventas: number; ventas_cubiertas: number; ventas_credito: number;
  costo_ventas: number | null; utilidad_bruta: number | null; gastos: number;
  utilidad_operacional: number | null; sunat: number; intereses: number;
  financieros_impuestos: number; utilidad_neta: number | null;
};
export type VentaAnual = {
  entrega_detalle_id: number; entrega_id: number; pedido_id: number; codigo_pedido: string;
  cliente_id: number; cliente: string; ruc: string; producto: string;
  fecha: string; cantidad: number; unidad: string; precio_unitario: number; monto: number;
};
export type CuentaCobrar = {
  pedido_id: number; codigo_pedido: string; cliente: string; ruc: string;
  fecha: string; ultima_entrega: string; entregado: number; pagado: number; saldo: number;
};
export type PedidoAnual = {
  pedido_id: number; codigo_pedido: string; cliente: string; ruc: string;
  fecha: string; estado_pedido: string; monto: number;
};
export type ClienteAnual = { cliente_id: number; cliente: string; ruc: string; importe: number; pedidos: number };
export type TipoDetalleAnual = 'ventas' | 'cartera' | 'pedidos' | 'clientes' | 'cliente' | 'otros';
export type SeleccionAnual = { tipo: TipoDetalleAnual; cliente?: ClienteAnual };
export type MesAnual = {
  mes: string; habilitado: boolean; corte?: string; completo?: boolean; resumen: ResumenAnual | null;
  cuentas_por_cobrar: number | null; pedidos: number | null; clientes: number | null;
};
export type DatosAnuales = {
  anio: number; moneda: string; corte: string; completo: boolean; advertencias: string[];
  resumen: ResumenAnual;
  indicadores: { ventas: number; cuentas_por_cobrar: number; pedidos: number; clientes: number; pedidos_por_cobrar: number };
  meses: MesAnual[]; clientes: ClienteAnual[];
  detalles: { ventas: VentaAnual[]; cartera: CuentaCobrar[]; pedidos: PedidoAnual[] };
};
