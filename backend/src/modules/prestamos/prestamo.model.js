'use strict';
const {sql,params,request,transact,getConnection,fallo,cents}=require('../../utils/finanzas.helpers');
const {calcularCronograma}=require('../../utils/finanzas.cronograma');
const SELECT=`SELECT p.*,u.nombre_completo registrado_por,
 COALESCE(pagos.capital_pagado,0) capital_pagado,
 COALESCE(pagos.interes_pagado,0) interes_pagado,
 COALESCE(pagos.cargos_pagados,0) cargos_pagados,
 p.capital-COALESCE(pagos.capital_pagado,0) capital_pendiente,
 cuotas.interes_programado_total,
 cuotas.cargos_programados_total,
 cuotas.cuotas_total
 FROM finance.Prestamo p JOIN auth.Usuario u ON u.usuario_id=p.created_by_usuario_id
 OUTER APPLY (SELECT SUM(capital_pagado) capital_pagado, SUM(interes_pagado) interes_pagado,SUM(cargos_pagados) cargos_pagados FROM finance.PrestamoPago WHERE prestamo_id=p.prestamo_id AND activo=1) pagos
 OUTER APPLY (SELECT SUM(interes_programado) interes_programado_total,SUM(cargos_programados) cargos_programados_total,COUNT(*) cuotas_total FROM finance.PrestamoCuota WHERE prestamo_id=p.prestamo_id) cuotas`;
async function listar({page,limit,offset,q,direccion,modalidad,moneda_codigo}){
 const pool=await getConnection();
 const filt='WHERE p.activo=1 AND (@q IS NULL OR p.contraparte LIKE @q OR p.descripcion LIKE @q) AND (@direccion IS NULL OR p.direccion=@direccion) AND (@modalidad IS NULL OR p.modalidad=@modalidad) AND (@moneda IS NULL OR p.moneda_codigo=@moneda)';
 const bind=r=>params(r,[['q',sql.NVarChar(210),q?`%${q}%`:null],['direccion',sql.VarChar(10),direccion],['modalidad',sql.VarChar(12),modalidad],['moneda',sql.Char(3),moneda_codigo]]);
 const a=await bind(pool.request()).query(`SELECT COUNT(*) total FROM finance.Prestamo p ${filt}`);
 const b=await params(bind(pool.request()),[['offset',sql.Int,offset],['limit',sql.Int,limit]]).query(`${SELECT} ${filt} ORDER BY p.fecha DESC,p.prestamo_id DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`);
 const total=a.recordset[0].total;
 return {prestamos:b.recordset,paginacion:{page,limit,total,totalPaginas:Math.ceil(total/limit)}};
}
async function detalle(id,{page,limit,offset}){
 const pool=await getConnection();
 const data=await params(pool.request(),[['id',sql.Int,id]]).query(`${SELECT} WHERE p.prestamo_id=@id AND p.activo=1`);
 if(!data.recordset.length) throw fallo('Préstamo no encontrado',404);
 const cuotas=await params(pool.request(),[['id',sql.Int,id]]).query(`SELECT c.*,COALESCE(r.capital_pagado,0) capital_pagado,COALESCE(r.interes_pagado,0) interes_pagado,COALESCE(r.cargos_pagados,0) cargos_pagados FROM finance.PrestamoCuota c OUTER APPLY(SELECT SUM(capital_pagado) capital_pagado,SUM(interes_pagado) interes_pagado,SUM(cargos_pagados) cargos_pagados FROM finance.PrestamoPago WHERE cuota_id=c.cuota_id AND activo=1) r WHERE c.prestamo_id=@id ORDER BY c.numero`);
 const total=await params(pool.request(),[['id',sql.Int,id]]).query('SELECT COUNT(*) total FROM finance.PrestamoPago WHERE prestamo_id=@id');
 const pagos=await params(pool.request(),[['id',sql.Int,id],['offset',sql.Int,offset],['limit',sql.Int,limit]]).query(`SELECT pg.*,c.numero cuota_numero,u.nombre_completo registrado_por FROM finance.PrestamoPago pg LEFT JOIN finance.PrestamoCuota c ON c.cuota_id=pg.cuota_id JOIN auth.Usuario u ON u.usuario_id=pg.created_by_usuario_id WHERE pg.prestamo_id=@id ORDER BY pg.fecha DESC,pg.pago_id DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`);
 return {prestamo:data.recordset[0],cuotas:cuotas.recordset,pagos:pagos.recordset,paginacion:{page,limit,total:total.recordset[0].total,totalPaginas:Math.ceil(total.recordset[0].total/limit)}};
}
async function crear(v,user){
 return transact(async tx=>{
  const old=await request(tx,[['key',sql.UniqueIdentifier,v.idempotency_key]]).query('SELECT prestamo_id FROM finance.Prestamo WHERE idempotency_key=@key');
  if(old.recordset.length)return old.recordset[0].prestamo_id;
  const r=await request(tx,[
   ['fecha',sql.Date,v.fecha],['dir',sql.VarChar(10),v.direccion],['modalidad',sql.VarChar(12),v.modalidad],['persona',sql.NVarChar(180),v.contraparte],['desc',sql.NVarChar(1000),v.descripcion],
   ['capital',sql.Decimal(18,2),v.capital],['moneda',sql.Char(3),v.moneda_codigo],['interes',sql.Bit,v.tiene_interes],['acordado',sql.Decimal(18,2),v.interes_acordado],
   ['tasa',sql.Decimal(9,5),v.tasa_anual_pct],['calculo',sql.VarChar(20),v.calculo_tasa],['sistema',sql.VarChar(10),v.sistema_amortizacion],['cronograma',sql.VarChar(10),v.cronograma_tipo],
   ['plazo',sql.Int,v.plazo_meses],['primera',sql.Date,v.primer_vencimiento],['key',sql.UniqueIdentifier,v.idempotency_key],['user',sql.Int,user]
  ]).query(`INSERT INTO finance.Prestamo(fecha,direccion,modalidad,contraparte,descripcion,capital,moneda_codigo,tiene_interes,interes_acordado,tasa_anual_pct,calculo_tasa,sistema_amortizacion,cronograma_tipo,plazo_meses,primer_vencimiento,idempotency_key,created_by_usuario_id)
   OUTPUT INSERTED.prestamo_id VALUES (@fecha,@dir,@modalidad,@persona,@desc,@capital,@moneda,@interes,@acordado,@tasa,@calculo,@sistema,@cronograma,@plazo,@primera,@key,@user)`);
  const id=r.recordset[0].prestamo_id;
  const cuotas=v.modalidad==='PROGRAMADO'?(v.cronograma_tipo==='MANUAL'?v.cuotas:calcularCronograma(v)):[];
  for(const c of cuotas) {
   await request(tx,[['id',sql.Int,id],['n',sql.Int,c.numero],['f',sql.Date,c.fecha_vencimiento],['capital',sql.Decimal(18,2),c.capital_programado],['interes',sql.Decimal(18,2),c.interes_programado],['cargos',sql.Decimal(18,2),c.cargos_programados]]).query(`INSERT INTO finance.PrestamoCuota(prestamo_id,numero,fecha_vencimiento,capital_programado,interes_programado,cargos_programados) VALUES(@id,@n,@f,@capital,@interes,@cargos)`);
  }
  return id;
 });
}
async function editar(id,v,user){
 return transact(async tx=>{
  const r=await request(tx,[['id',sql.Int,id]]).query('SELECT prestamo_id FROM finance.Prestamo WITH(UPDLOCK,HOLDLOCK) WHERE prestamo_id=@id AND activo=1');
  if(!r.recordset.length)throw fallo('Préstamo no encontrado',404);
  await request(tx,[['id',sql.Int,id],['fecha',sql.Date,v.fecha],['contraparte',sql.NVarChar(180),v.contraparte],['desc',sql.NVarChar(1000),v.descripcion],['user',sql.Int,user]]).query(`UPDATE finance.Prestamo SET fecha=@fecha,contraparte=@contraparte,descripcion=@desc,updated_at=SYSDATETIME(),updated_by_usuario_id=@user WHERE prestamo_id=@id`);
 });
}
async function baja(id,user){
 return transact(async tx=>{
  const r=await request(tx,[['id',sql.Int,id]]).query('SELECT prestamo_id FROM finance.Prestamo WITH(UPDLOCK,HOLDLOCK) WHERE prestamo_id=@id AND activo=1');
  if(!r.recordset.length)throw fallo('Préstamo no encontrado',404);
  const count=await request(tx,[['id',sql.Int,id]]).query('SELECT TOP(1) 1 x FROM finance.PrestamoPago WHERE prestamo_id=@id');
  if(count.recordset.length)throw fallo('Un préstamo con pagos históricos no puede darse de baja',409);
  await request(tx,[['id',sql.Int,id],['user',sql.Int,user]]).query('UPDATE finance.Prestamo SET activo=0,updated_at=SYSDATETIME(),updated_by_usuario_id=@user WHERE prestamo_id=@id');
 });
}
async function pagar(id,v,user){
 return transact(async tx=>{
  const old=await request(tx,[['key',sql.UniqueIdentifier,v.idempotency_key]]).query('SELECT pago_id FROM finance.PrestamoPago WHERE idempotency_key=@key');
  if(old.recordset.length)return old.recordset[0].pago_id;
  const prestamo=await request(tx,[['id',sql.Int,id]]).query('SELECT * FROM finance.Prestamo WITH(UPDLOCK,HOLDLOCK) WHERE prestamo_id=@id AND activo=1');
  if(!prestamo.recordset.length)throw fallo('Préstamo no encontrado',404);
  const p=prestamo.recordset[0];
  const sum=await request(tx,[['id',sql.Int,id]]).query(`SELECT ISNULL(SUM(capital_pagado),0) capital,ISNULL(SUM(interes_pagado),0) interes,ISNULL(SUM(cargos_pagados),0) cargos FROM finance.PrestamoPago WHERE prestamo_id=@id AND activo=1`);
  const pag=sum.recordset[0];
  if(cents(p.capital)<cents(pag.capital)+cents(v.capital_pagado))throw fallo('El abono supera el capital pendiente',409);
  if(!p.tiene_interes && cents(v.interes_pagado)>0)throw fallo('Este préstamo fue registrado sin intereses',409);
  if(p.modalidad==='GENERAL'){
   if(cents(v.cargos_pagados)>0)throw fallo('Los cargos adicionales solo aplican a préstamos programados');
   if(p.interes_acordado!==null && cents(pag.interes)+cents(v.interes_pagado)>cents(p.interes_acordado))throw fallo('Se supera el interés fijo acordado',409);
   if(v.cuota_id!==null)throw fallo('Un préstamo general no tiene cuotas');
  }else {
   if(v.cuota_id === null && (cents(v.interes_pagado)>0 || cents(v.cargos_pagados)>0))throw fallo('Asocia intereses y cargos a una cuota del cronograma',409);
   if(v.cuota_id!==null){
    const cuota=await request(tx,[['id',sql.Int,id],['cid',sql.Int,v.cuota_id]]).query('SELECT * FROM finance.PrestamoCuota WHERE prestamo_id=@id AND cuota_id=@cid');
    if(!cuota.recordset.length)throw fallo('La cuota no pertenece al préstamo',404);
    const sumaCuota=await request(tx,[['cid',sql.Int,v.cuota_id]]).query('SELECT ISNULL(SUM(capital_pagado),0) capital,ISNULL(SUM(interes_pagado),0) interes,ISNULL(SUM(cargos_pagados),0) cargos FROM finance.PrestamoPago WHERE cuota_id=@cid AND activo=1');
    const q=cuota.recordset[0], paid=sumaCuota.recordset[0];
    for (const [label,dest,field] of [['capital','capital_programado','capital_pagado'],['interes','interes_programado','interes_pagado'],['cargos','cargos_programados','cargos_pagados']]) {
     if(cents(paid[label])+cents(v[field])>cents(q[dest]))throw fallo(`El pago supera el ${label} programado de la cuota`,409);
    }
   }
  }
  const r=await request(tx,[['id',sql.Int,id],['cuota',sql.Int,v.cuota_id],['fecha',sql.Date,v.fecha],['cap',sql.Decimal(18,2),v.capital_pagado],['int',sql.Decimal(18,2),v.interes_pagado],['cargos',sql.Decimal(18,2),v.cargos_pagados],['obs',sql.NVarChar(500),v.observacion],['key',sql.UniqueIdentifier,v.idempotency_key],['user',sql.Int,user]]).query(`INSERT INTO finance.PrestamoPago(prestamo_id,cuota_id,fecha,capital_pagado,interes_pagado,cargos_pagados,observacion,idempotency_key,created_by_usuario_id) OUTPUT INSERTED.pago_id VALUES(@id,@cuota,@fecha,@cap,@int,@cargos,@obs,@key,@user)`);
  return r.recordset[0].pago_id;
 });
}
async function anularPago(id,pago_id,user){
 return transact(async tx=>{
  const prest=await request(tx,[['id',sql.Int,id]]).query('SELECT prestamo_id FROM finance.Prestamo WITH(UPDLOCK,HOLDLOCK) WHERE prestamo_id=@id AND activo=1');
  if(!prest.recordset.length)throw fallo('Préstamo no encontrado',404);
  const r=await request(tx,[['id',sql.Int,id],['pid',sql.Int,pago_id],['user',sql.Int,user]]).query('UPDATE finance.PrestamoPago SET activo=0,anulado_at=SYSDATETIME(),anulado_by_usuario_id=@user WHERE prestamo_id=@id AND pago_id=@pid AND activo=1');
  if(!r.rowsAffected[0])throw fallo('Pago inexistente o ya anulado',404);
 });
}
module.exports={listar,detalle,crear,editar,baja,pagar,anularPago};
