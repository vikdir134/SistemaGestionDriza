const { getConnection, sql } = require('../../config/db');
const { limitesMes } = require('../gastos/gasto.consulta');
const { EERR_SQL, PEDIDOS_ANUALES_SQL } = require('./eerr.consulta');
const { calcularEerr } = require('./eerr.calculo');
const { calcularEerrAnual } = require('./eerr.anual');

function validarFiltros({ mes, moneda = 'PEN' }) {
  const { inicio, fin } = limitesMes(mes);
  if (!inicio || !fin) throw new Error('Selecciona un mes con formato AAAA-MM.');
  if (!['PEN', 'USD'].includes(moneda)) throw new Error('La moneda debe ser PEN o USD.');
  return { mes, moneda, inicio, fin };
}

function fechaHoyLima() {
  const partes = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Lima',
    year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const valor = tipo => partes.find(parte => parte.type === tipo).value;
  return `${valor('year')}-${valor('month')}-${valor('day')}`;
}

function validarFiltrosAnuales({ anio, moneda = 'PEN' }, hoy = fechaHoyLima()) {
  if (typeof anio !== 'string' || !/^[1-9]\d{3}$/.test(anio) || Number(anio) > 9998
    || anio > hoy.slice(0, 4)) throw new Error('Selecciona un año válido, hasta el año actual.');
  if (!['PEN', 'USD'].includes(moneda)) throw new Error('La moneda debe ser PEN o USD.');
  const corte = anio === hoy.slice(0, 4) ? hoy : `${anio}-12-31`;
  const fin = new Date(`${corte}T00:00:00.000Z`);
  fin.setUTCDate(fin.getUTCDate() + 1);
  return { anio, moneda, corte, inicio: new Date(`${anio}-01-01T00:00:00.000Z`), fin };
}

async function consultarDatos({ moneda, inicio, fin }, anual = false) {
  const pool = await getConnection();
  const result = await pool.request()
    .input('inicio', sql.Date, inicio).input('fin', sql.Date, fin)
    .input('moneda', sql.Char(3), moneda).query(EERR_SQL + (anual ? PEDIDOS_ANUALES_SQL : ''));
  const [ventas, depositos, movimientos, consumos, gastos, intereses, pedidos] = result.recordsets;
  return { ventas, depositos, movimientos, consumos, gastos, intereses, pedidos };
}

async function obtenerEerr(filtros) {
  return calcularEerr({ ...filtros, ...await consultarDatos(filtros) });
}

async function obtenerEerrAnual(filtros) {
  return calcularEerrAnual({ ...filtros, ...await consultarDatos(filtros, true) });
}

module.exports = { validarFiltros, obtenerEerr, validarFiltrosAnuales, obtenerEerrAnual };
