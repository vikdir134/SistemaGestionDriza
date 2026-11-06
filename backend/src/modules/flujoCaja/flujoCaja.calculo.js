const CATEGORIAS = [
  ['COBROS_CLIENTES', 'Cobros de clientes', 'ENTRADA'],
  ['APORTES', 'Inversiones y aportes recibidos', 'ENTRADA'],
  ['PRESTAMOS_RECIBIDOS', 'Préstamos recibidos', 'ENTRADA'],
  ['COBRO_CAPITAL', 'Recuperación de préstamos otorgados', 'ENTRADA'],
  ['COBRO_INTERESES', 'Intereses cobrados', 'ENTRADA'],
  ['COBRO_CARGOS', 'Cargos cobrados', 'ENTRADA'],
  ['COMPRAS_MATERIA_PRIMA', 'Compras de materia prima', 'SALIDA'],
  ['COMPRAS_GENERALES', 'Compras generales', 'SALIDA'],
  ['GASTOS', 'Gastos operativos pagados', 'SALIDA'],
  ['SUNAT', 'Pagos SUNAT', 'SALIDA'],
  ['PRESTAMOS_OTORGADOS', 'Préstamos otorgados', 'SALIDA'],
  ['DEVOLUCION_APORTES', 'Devoluciones de inversiones y aportes', 'SALIDA'],
  ['PAGO_CAPITAL', 'Capital de préstamos pagado', 'SALIDA'],
  ['PAGO_INTERESES', 'Intereses de préstamos pagados', 'SALIDA'],
  ['PAGO_CARGOS', 'Cargos de préstamos pagados', 'SALIDA']
].map(([codigo, nombre, sentido]) => ({ codigo, nombre, sentido }));
const centavos = valor => Math.round((Number(valor) + Number.EPSILON) * 100);
const iso = valor => valor instanceof Date ? valor.toISOString().slice(0, 10) : String(valor).slice(0, 10);
const sumarSeguro = (total, importe) => {
  const resultado = total + importe;
  if (!Number.isSafeInteger(resultado)) throw new Error('Los totales de caja exceden la precisión disponible.');
  return resultado;
};

function hoyLima() {
  const partes = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const parte = tipo => partes.find(item => item.type === tipo).value;
  return `${parte('year')}-${parte('month')}-${parte('day')}`;
}

function validarPeriodo({ vista = 'mensual', mes, anio, moneda = 'PEN' }, hoy = hoyLima()) {
  if (!['mensual', 'anual'].includes(vista)) throw new Error('La vista debe ser mensual o anual.');
  if (!['PEN', 'USD'].includes(moneda)) throw new Error('La moneda debe ser PEN o USD.');
  const periodo = vista === 'mensual' ? mes : anio;
  const patron = vista === 'mensual' ? /^[1-9]\d{3}-(0[1-9]|1[0-2])$/ : /^[1-9]\d{3}$/;
  const actual = hoy.slice(0, vista === 'mensual' ? 7 : 4);
  if (typeof periodo !== 'string' || !patron.test(periodo) || periodo > actual || periodo.slice(0, 4) > '9998') {
    throw new Error(vista === 'mensual' ? 'Selecciona un mes válido hasta el mes actual.' : 'Selecciona un año válido hasta el año actual.');
  }
  const desde = vista === 'mensual' ? `${periodo}-01` : `${periodo}-01-01`;
  const [ano, numeroMes] = desde.split('-').map(Number);
  const ultimo = vista === 'mensual' ? new Date(Date.UTC(ano, numeroMes, 0)).toISOString().slice(0, 10) : `${periodo}-12-31`;
  const corte = ultimo < hoy ? ultimo : hoy;
  const fin = new Date(`${corte}T00:00:00.000Z`);
  fin.setUTCDate(fin.getUTCDate() + 1);
  return { vista, periodo, moneda, desde, corte, fin };
}

function calcularFlujo({ movimientos = [], vista, periodo, moneda, desde, corte }) {
  const catalogo = new Map(CATEGORIAS.map(item => [item.codigo, item]));
  const claves = new Set();
  const historico = movimientos.filter(row => row.moneda_codigo === moneda && iso(row.fecha) <= corte)
    .map(row => {
      const categoria = catalogo.get(row.categoria);
      const importe = centavos(row.monto);
      if (!row.clave || claves.has(row.clave)) throw new Error('Hay referencias de caja duplicadas.');
      if (!categoria || categoria.sentido !== row.sentido || !Number.isSafeInteger(importe) || importe <= 0) throw new Error('Hay un movimiento de caja inválido.');
      claves.add(row.clave);
      return { ...row, fecha: iso(row.fecha), monto: importe / 100, concepto: categoria.nombre };
    }).sort((a, b) => a.fecha.localeCompare(b.fecha) || a.clave.localeCompare(b.clave));
  let saldo = 0;
  const anteriores = [];
  const actuales = [];
  let apertura = 0;
  let entradas = 0;
  let salidas = 0;
  const categorias = CATEGORIAS.map(item => ({ ...item, total: 0, cantidad: 0 }));
  for (const row of historico) {
    saldo = sumarSeguro(saldo, row.sentido === 'ENTRADA' ? centavos(row.monto) : -centavos(row.monto));
    const movimiento = { ...row, saldo: saldo / 100 };
    if (row.fecha < desde) {
      anteriores.push(movimiento);
      apertura = saldo;
      continue;
    }
    actuales.push(movimiento);
    if (row.sentido === 'ENTRADA') entradas = sumarSeguro(entradas, centavos(row.monto));
    else salidas = sumarSeguro(salidas, centavos(row.monto));
    const categoria = categorias.find(item => item.codigo === row.categoria);
    categoria.total = sumarSeguro(categoria.total, centavos(row.monto));
    categoria.cantidad++;
  }
  const [ano, mes] = desde.split('-').map(Number);
  const cantidad = vista === 'anual' ? 12 : new Date(Date.UTC(ano, mes, 0)).getUTCDate();
  let acumulado = apertura;
  const serie = Array.from({ length: cantidad }, (_, index) => {
    const fecha = `${periodo}-${String(index + 1).padStart(2, '0')}`;
    const habilitado = fecha <= corte.slice(0, vista === 'anual' ? 7 : 10);
    if (!habilitado) return { periodo: fecha, habilitado, saldo_inicial: null, entradas: null, salidas: null, flujo_neto: null, saldo_final: null };
    const rows = actuales.filter(row => row.fecha.startsWith(fecha));
    const ingreso = rows.filter(row => row.sentido === 'ENTRADA').reduce((suma, row) => suma + centavos(row.monto), 0);
    const egreso = rows.filter(row => row.sentido === 'SALIDA').reduce((suma, row) => suma + centavos(row.monto), 0);
    const inicial = acumulado;
    acumulado = sumarSeguro(acumulado, ingreso - egreso);
    return { periodo: fecha, habilitado, saldo_inicial: inicial / 100, entradas: ingreso / 100,
      salidas: egreso / 100, flujo_neto: (ingreso - egreso) / 100, saldo_final: acumulado / 100 };
  });
  return { vista, periodo, moneda, desde, corte,
    resumen: { saldo_inicial: apertura / 100, entradas: entradas / 100, salidas: salidas / 100,
      flujo_neto: (entradas - salidas) / 100, saldo_final: saldo / 100 },
    categorias: categorias.map(item => ({ ...item, total: item.total / 100 })),
    serie, movimientos: actuales, anteriores };
}

module.exports = { CATEGORIAS, validarPeriodo, calcularFlujo };
