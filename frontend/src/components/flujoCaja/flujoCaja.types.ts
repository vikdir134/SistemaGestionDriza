export type ResumenCaja = { saldo_inicial: number; entradas: number; salidas: number; flujo_neto: number; saldo_final: number };
export type MovimientoCaja = {
  clave: string; fecha: string; moneda_codigo: string; categoria: string; concepto: string;
  sentido: 'ENTRADA' | 'SALIDA'; monto: number; saldo: number;
  descripcion?: string; tercero?: string; referencia?: string; ruta?: string;
};
export type CategoriaCaja = { codigo: string; nombre: string; sentido: 'ENTRADA' | 'SALIDA'; total: number; cantidad: number };
export type PuntoCaja = { periodo: string; habilitado: boolean; saldo_inicial: number | null; entradas: number | null; salidas: number | null; flujo_neto: number | null; saldo_final: number | null };
export type DatosCaja = {
  vista: 'mensual' | 'anual'; periodo: string; moneda: string; desde: string; corte: string;
  resumen: ResumenCaja; categorias: CategoriaCaja[]; serie: PuntoCaja[];
  movimientos: MovimientoCaja[]; anteriores: MovimientoCaja[];
};
export type SeleccionCaja = { tipo: keyof ResumenCaja | 'categoria' | 'dia'; categoria?: CategoriaCaja; periodo?: string };
