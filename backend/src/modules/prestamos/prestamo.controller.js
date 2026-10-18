'use strict';
const M=require('./prestamo.model');
const {calcularCronograma}=require('../../utils/finanzas.cronograma');
const {fecha,texto,importe,moneda,clave,id,pagination,enumerado,cents,responderError,fallo}=require('../../utils/finanzas.helpers');
const ejecutar=f=>async(req,res)=>{try{await f(req,res)}catch(e){responderError(res,e,'Préstamos')}};
const parseBase=b=>{
 const modalidad=enumerado(b.modalidad,['GENERAL','PROGRAMADO'],'modalidad');
 const v={fecha:fecha(b.fecha),direccion:enumerado(b.direccion,['RECIBIDO','OTORGADO'],'dirección'),modalidad,contraparte:texto(b.contraparte,180,true),descripcion:texto(b.descripcion,1000),capital:importe(b.capital),moneda_codigo:moneda(b.moneda_codigo),idempotency_key:clave(b.idempotency_key)};
 if(modalidad==='GENERAL'){
  v.tiene_interes=b.tiene_interes===true;
  v.interes_acordado=v.tiene_interes&&b.interes_acordado!==''&&b.interes_acordado!=null?importe(b.interes_acordado,{cero:true}):null;
  return {...v,tasa_anual_pct:null,calculo_tasa:null,sistema_amortizacion:null,cronograma_tipo:null,plazo_meses:null,primer_vencimiento:null,cuotas:[]};
 }
 const tipo=enumerado(b.cronograma_tipo,['CALCULADO','MANUAL'],'cronograma');
 const common={...v,tiene_interes:true,interes_acordado:null,cronograma_tipo:tipo};
 if(tipo==='MANUAL'){
  if(!Array.isArray(b.cuotas)||b.cuotas.length<1||b.cuotas.length>360)throw fallo('Cronograma manual debe tener de 1 a 360 cuotas');
  const cuotas=b.cuotas.map((x,i)=>({numero:i+1,fecha_vencimiento:fecha(x.fecha_vencimiento),capital_programado:importe(x.capital_programado,{cero:true}),interes_programado:importe(x.interes_programado,{cero:true}),cargos_programados:importe(x.cargos_programados??0,{cero:true})}));
  if(cuotas.some(c=>!c.capital_programado&&!c.interes_programado&&!c.cargos_programados))throw fallo('No se permiten cuotas sin importes');
  if(cuotas.some((c,i)=>i>0&&c.fecha_vencimiento<=cuotas[i-1].fecha_vencimiento))throw fallo('Las fechas de las cuotas deben ser crecientes');
  if(cuotas.reduce((s,c)=>s+cents(c.capital_programado),0)!==cents(v.capital))throw fallo('La suma del capital del cronograma debe coincidir con el capital del préstamo');
  return {...common,tasa_anual_pct:null,calculo_tasa:null,sistema_amortizacion:null,plazo_meses:null,primer_vencimiento:null,cuotas};
 }
 const tasa=Number(b.tasa_anual_pct);
 if(!Number.isFinite(tasa)||tasa<0||tasa>1000||!/^(?:\d{1,4})(?:\.\d{1,5})?$/.test(String(b.tasa_anual_pct)))throw fallo('Tasa anual inválida (máximo 5 decimales)');
 const meses=Number(b.plazo_meses);
 if(!Number.isInteger(meses)||meses<1||meses>360)throw fallo('Plazo inválido (1-360 cuotas)');
 return {...common,tasa_anual_pct:tasa,calculo_tasa:enumerado(b.calculo_tasa,['NOMINAL_SIMPLE','EFECTIVA_COMPUESTA'],'tipo de tasa'),sistema_amortizacion:enumerado(b.sistema_amortizacion,['FRANCES','ALEMAN'],'amortización'),plazo_meses:meses,primer_vencimiento:fecha(b.primer_vencimiento),cuotas:[]};
};
const parsePago=b=>{
 const c=importe(b.capital_pagado??0,{cero:true}),i=importe(b.interes_pagado??0,{cero:true}),o=importe(b.cargos_pagados??0,{cero:true});
 if(cents(c)+cents(i)+cents(o)<=0)throw fallo('El pago debe ser mayor a cero');
 return {fecha:fecha(b.fecha),capital_pagado:c,interes_pagado:i,cargos_pagados:o,cuota_id:b.cuota_id==null||b.cuota_id===''?null:id(b.cuota_id),observacion:texto(b.observacion,500),idempotency_key:clave(b.idempotency_key)};
};
exports.preview=ejecutar(async(req,res)=>{const v=parseBase(req.body||{});if(v.modalidad!=='PROGRAMADO'||v.cronograma_tipo!=='CALCULADO')throw fallo('Solo se previsualizan cronogramas calculados');res.json({cuotas:calcularCronograma(v)});});
exports.listar=ejecutar(async(req,res)=>{const pag=pagination(req.query);res.json(await M.listar({...pag,q:texto(req.query.q,200),direccion:req.query.direccion?enumerado(req.query.direccion,['RECIBIDO','OTORGADO'],'dirección'):null,modalidad:req.query.modalidad?enumerado(req.query.modalidad,['GENERAL','PROGRAMADO'],'modalidad'):null,moneda_codigo:req.query.moneda_codigo?moneda(req.query.moneda_codigo):null}));});
exports.detalle=ejecutar(async(req,res)=>res.json(await M.detalle(id(req.params.id),pagination(req.query))));
exports.crear=ejecutar(async(req,res)=>{const prestamo_id=await M.crear(parseBase(req.body||{}),id(req.usuario.usuario_id));res.status(201).json({mensaje:'Préstamo registrado',prestamo_id});});
exports.editar=ejecutar(async(req,res)=>{await M.editar(id(req.params.id),{fecha:fecha((req.body||{}).fecha),contraparte:texto((req.body||{}).contraparte,180,true),descripcion:texto((req.body||{}).descripcion,1000)},id(req.usuario.usuario_id));res.json({mensaje:'Información descriptiva actualizada'});});
exports.eliminar=ejecutar(async(req,res)=>{await M.baja(id(req.params.id),id(req.usuario.usuario_id));res.json({mensaje:'Préstamo dado de baja'});});
exports.pagar=ejecutar(async(req,res)=>{const pago_id=await M.pagar(id(req.params.id),parsePago(req.body||{}),id(req.usuario.usuario_id));res.status(201).json({mensaje:'Pago registrado',pago_id});});
exports.anularPago=ejecutar(async(req,res)=>{await M.anularPago(id(req.params.id),id(req.params.pago_id),id(req.usuario.usuario_id));res.json({mensaje:'Pago anulado conservando historial'});});
