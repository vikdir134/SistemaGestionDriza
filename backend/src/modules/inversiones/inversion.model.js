'use strict';
const {sql,request,params,transact,getConnection,fallo, cents}=require('../../utils/finanzas.helpers');
const info = `SELECT i.*, COALESCE(r.total_retirado,0) AS total_retirado,
   i.monto-COALESCE(r.total_retirado,0) AS capital_no_devuelto,
   u.nombre_completo AS registrado_por
 FROM finance.Inversion i
 JOIN auth.Usuario u ON u.usuario_id=i.created_by_usuario_id
 OUTER APPLY(SELECT SUM(monto) AS total_retirado FROM finance.InversionRetiro WHERE inversion_id=i.inversion_id AND activo=1) r`;
async function listar({page,limit,offset,q,moneda_codigo}) {
 const pool=await getConnection();
 const bind = r => params(r,[['q',sql.NVarChar(210),q?`%${q}%`:null],['moneda',sql.Char(3),moneda_codigo||null]]);
 const filtro=`WHERE i.activo=1 AND (@q IS NULL OR i.aportante LIKE @q OR i.motivo LIKE @q OR i.descripcion LIKE @q) AND (@moneda IS NULL OR i.moneda_codigo=@moneda)`;
 const tot=await bind(pool.request()).query(`SELECT COUNT(1) total FROM finance.Inversion i ${filtro}`);
 const result=await params(bind(pool.request()),[['offset',sql.Int,offset],['limit',sql.Int,limit]]).query(`${info} ${filtro} ORDER BY i.fecha DESC,i.inversion_id DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`);
 const total=tot.recordset[0].total;
 return {inversiones:result.recordset,paginacion:{page,limit,total,totalPaginas:Math.ceil(total/limit)}};
}
async function detalle(id,{page,limit,offset}) {
 const pool=await getConnection();const obj=await params(pool.request(),[['id',sql.Int,id]]).query(`${info} WHERE i.inversion_id=@id AND i.activo=1`);
 if(!obj.recordset.length) throw fallo('Inversión no encontrada',404);
 const total=await params(pool.request(),[['id',sql.Int,id]]).query('SELECT COUNT(*) total FROM finance.InversionRetiro WHERE inversion_id=@id');
 const r=await params(pool.request(),[['id',sql.Int,id],['offset',sql.Int,offset],['limit',sql.Int,limit]]).query(`SELECT ir.*,u.nombre_completo registrado_por FROM finance.InversionRetiro ir JOIN auth.Usuario u ON u.usuario_id=ir.created_by_usuario_id WHERE ir.inversion_id=@id ORDER BY ir.fecha DESC,ir.inversion_retiro_id DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`);
 return {inversion:obj.recordset[0],retiros:r.recordset,paginacion:{page,limit,total:total.recordset[0].total,totalPaginas:Math.ceil(total.recordset[0].total/limit)}};
}
async function crear(v,user) {
 return transact(async tx=>{
  const old=await request(tx,[['key',sql.UniqueIdentifier,v.idempotency_key]]).query('SELECT inversion_id FROM finance.Inversion WHERE idempotency_key=@key');
  if(old.recordset.length) return old.recordset[0].inversion_id;
  const r=await request(tx,[['fecha',sql.Date,v.fecha],['aportante',sql.NVarChar(180),v.aportante],['motivo',sql.NVarChar(200),v.motivo],['descripcion',sql.NVarChar(1000),v.descripcion],['monto',sql.Decimal(18,2),v.monto],['moneda',sql.Char(3),v.moneda_codigo],['user',sql.Int,user],['key',sql.UniqueIdentifier,v.idempotency_key]]).query(`INSERT INTO finance.Inversion(fecha,aportante,motivo,descripcion,monto,moneda_codigo,created_by_usuario_id,idempotency_key) OUTPUT INSERTED.inversion_id VALUES(@fecha,@aportante,@motivo,@descripcion,@monto,@moneda,@user,@key)`);
  return r.recordset[0].inversion_id;
 });
}
async function editar(id,v,user) {
 return transact(async tx=>{
  const prev=await request(tx,[['id',sql.Int,id]]).query('SELECT inversion_id FROM finance.Inversion WITH (UPDLOCK,HOLDLOCK) WHERE inversion_id=@id AND activo=1');
  if(!prev.recordset.length) throw fallo('Inversión no encontrada',404);
  await request(tx,[['id',sql.Int,id],['fecha',sql.Date,v.fecha],['aportante',sql.NVarChar(180),v.aportante],['motivo',sql.NVarChar(200),v.motivo],['descripcion',sql.NVarChar(1000),v.descripcion],['user',sql.Int,user]]).query(`UPDATE finance.Inversion SET fecha=@fecha,aportante=@aportante,motivo=@motivo,descripcion=@descripcion,updated_at=SYSDATETIME(),updated_by_usuario_id=@user WHERE inversion_id=@id`);
 });
}
async function baja(id,user) {
 return transact(async tx=>{
  const r=await request(tx,[['id',sql.Int,id]]).query('SELECT inversion_id FROM finance.Inversion WITH(UPDLOCK,HOLDLOCK) WHERE inversion_id=@id AND activo=1');
  if(!r.recordset.length) throw fallo('Inversión no encontrada',404);
  const used=await request(tx,[['id',sql.Int,id]]).query('SELECT TOP 1 1 ok FROM finance.InversionRetiro WHERE inversion_id=@id');
  if(used.recordset.length) throw fallo('No se puede dar de baja una inversión con historial de devoluciones',409);
  await request(tx,[['id',sql.Int,id],['user',sql.Int,user]]).query('UPDATE finance.Inversion SET activo=0,updated_at=SYSDATETIME(),updated_by_usuario_id=@user WHERE inversion_id=@id');
 });
}
async function retiro(id,v,user) {
 return transact(async tx=>{
  const old=await request(tx,[['key',sql.UniqueIdentifier,v.idempotency_key]]).query('SELECT inversion_retiro_id FROM finance.InversionRetiro WHERE idempotency_key=@key');
  if(old.recordset.length) return old.recordset[0].inversion_retiro_id;
  const inv=await request(tx,[['id',sql.Int,id]]).query('SELECT monto FROM finance.Inversion WITH (UPDLOCK,HOLDLOCK) WHERE inversion_id=@id AND activo=1');
  if(!inv.recordset.length) throw fallo('Inversión no encontrada',404);
  const sum=await request(tx,[['id',sql.Int,id]]).query('SELECT ISNULL(SUM(monto),0) total FROM finance.InversionRetiro WHERE inversion_id=@id AND activo=1');
  if(cents(v.monto)>cents(inv.recordset[0].monto)-cents(sum.recordset[0].total)) throw fallo('La devolución supera el capital no devuelto',409);
  const r=await request(tx,[['id',sql.Int,id],['fecha',sql.Date,v.fecha],['monto',sql.Decimal(18,2),v.monto],['obs',sql.NVarChar(500),v.observacion],['key',sql.UniqueIdentifier,v.idempotency_key],['user',sql.Int,user]]).query(`INSERT INTO finance.InversionRetiro(inversion_id,fecha,monto,observacion,idempotency_key,created_by_usuario_id) OUTPUT INSERTED.inversion_retiro_id VALUES(@id,@fecha,@monto,@obs,@key,@user)`);
  return r.recordset[0].inversion_retiro_id;
 });
}
async function anularRetiro(id,ret,user) {
 return transact(async tx=>{
  const inv=await request(tx,[['id',sql.Int,id]]).query('SELECT inversion_id FROM finance.Inversion WITH(UPDLOCK,HOLDLOCK) WHERE inversion_id=@id AND activo=1');
  if(!inv.recordset.length) throw fallo('Inversión no encontrada',404);
  const r=await request(tx,[['id',sql.Int,id],['ret',sql.Int,ret],['user',sql.Int,user]]).query(`UPDATE finance.InversionRetiro SET activo=0,anulado_at=SYSDATETIME(),anulado_by_usuario_id=@user WHERE inversion_id=@id AND inversion_retiro_id=@ret AND activo=1`);
  if(!r.rowsAffected[0]) throw fallo('Devolución inexistente o ya anulada',404);
 });
}
module.exports={listar,detalle,crear,editar,baja,retiro,anularRetiro};
