'use strict';
const { sql, getConnection } = require('../config/db');
const crypto = require('crypto');

const fallo = (mensaje, statusCode = 400) => Object.assign(new Error(mensaje), {statusCode});
const texto = (v, max = 500, required = false) => {
  const s = String(v ?? '').trim();
  if ((required && !s) || s.length > max) throw fallo(required ? `Campo obligatorio (máx. ${max} caracteres)` : `Texto demasiado largo (máx. ${max})`);
  return s || null;
};
const fecha = v => {
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) throw fallo('Fecha inválida (AAAA-MM-DD)');
  const d = new Date(`${v}T12:00:00Z`);
  if (!Number.isFinite(d.valueOf()) || d.toISOString().slice(0, 10) !== v) throw fallo('Fecha inexistente');
  return v;
};
const importe = (v, { cero = false, max = 999999999999 } = {}) => {
  // Acepta decimal exacto con hasta dos decimales. Evita errores de float en dinero.
  const s = String(v ?? '').trim();
  if (!/^(?:0|[1-9]\d{0,11})(?:\.\d{1,2})?$/.test(s)) throw fallo('Importe inválido: use hasta 2 decimales');
  const n = Number(s);
  if (!Number.isSafeInteger(Math.round(n*100)) || n > max || (!cero && n <= 0)) throw fallo('Importe fuera de rango');
  return n;
};
const cents = v => Math.round(Number(v || 0) * 100);
const money = c => Number((c / 100).toFixed(2));
const enumerado = (v, vals, nombre) => {
  if (!vals.includes(v)) throw fallo(`Valor de ${nombre} inválido`);
  return v;
};
const moneda = v => enumerado(v, ['PEN','USD'], 'moneda');
const clave = v => {
  if (typeof v !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)) throw fallo('idempotency_key debe ser UUID');
  return v;
};
const id = v => {
  const n = Number(v);
  if (!Number.isSafeInteger(n) || n <= 0) throw fallo('Identificador inválido');
  return n;
};
const pagination = q => {
  const page = Number(q.page || 1); const limit = Number(q.limit || 10);
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) throw fallo('Paginación inválida');
  return {page,limit,offset:(page-1)*limit};
};
const params = (req, values) => {
  for (const [key, type, value] of values) req.input(key, type, value);
  return req;
};
const request = (tx, p) => params(new sql.Request(tx),p);
const transact = async action => {
  const pool=await getConnection(); const tx=new sql.Transaction(pool);
  await tx.begin(sql.ISOLATION_LEVEL.SERIALIZABLE);
  try { const result=await action(tx); await tx.commit(); return result; }
  catch(e){try { await tx.rollback(); } catch(_){} throw e;}
};
const responderError = (res, e, contexto) => {
  // UUID duplicado no debe confundirse con fallo SQL interno.
  if (e.number === 2601 || e.number === 2627) return res.status(409).json({mensaje:'Operación duplicada. Actualiza el listado antes de reintentar.'});
  if (e.statusCode) return res.status(e.statusCode).json({mensaje:e.message});
  console.error(contexto,e);
  return res.status(500).json({mensaje:'Error interno del módulo financiero'});
};
// Misma clave en reintentos con cuerpo repetido. El token se genera en el cliente y no cambia en reintentos.
module.exports={sql,crypto,fallo,texto,fecha,importe,cents,money,enumerado,moneda,clave,id,pagination,params,request,transact,responderError,getConnection};
