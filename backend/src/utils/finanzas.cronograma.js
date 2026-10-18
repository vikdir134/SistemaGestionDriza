'use strict';
const { fallo, cents, money, fecha } = require('./finanzas.helpers');

function siguienteMes(dateISO, offset) {
  const [y,m,d]=dateISO.split('-').map(Number);
  const x=new Date(Date.UTC(y,m-1+offset,1));
  const ultimo=new Date(Date.UTC(x.getUTCFullYear(),x.getUTCMonth()+1,0)).getUTCDate();
  x.setUTCDate(Math.min(d,ultimo));
  return x.toISOString().slice(0,10);
}
function calcularCronograma({capital, tasa_anual_pct, calculo_tasa, sistema_amortizacion, plazo_meses, primer_vencimiento}) {
  fecha(primer_vencimiento);
  const p=Number(plazo_meses), t=Number(tasa_anual_pct);
  if (!Number.isInteger(p) || p<1 || p>360) throw fallo('El plazo debe ser entre 1 y 360 meses');
  if (!Number.isFinite(t) || t<0 || t>1000) throw fallo('Tasa anual inválida');
  if (!['NOMINAL_SIMPLE','EFECTIVA_COMPUESTA'].includes(calculo_tasa)) throw fallo('Tipo de tasa no válido');
  if (!['FRANCES','ALEMAN'].includes(sistema_amortizacion)) throw fallo('Sistema de amortización inválido');
  const rate = calculo_tasa === 'NOMINAL_SIMPLE' ? t/100/12 : Math.pow(1+t/100,1/12)-1;
  const original=cents(capital);
  let pendiente=original;
  const annuity = rate === 0 ? original/p : original*rate/(1-Math.pow(1+rate,-p));
  const cuotas=[];
  for(let i=1;i<=p;i++) {
    const interest=Math.round(pendiente*rate);
    let capitalCents;
    if(i===p) capitalCents=pendiente;
    else if(sistema_amortizacion==='ALEMAN') capitalCents=Math.min(pendiente,Math.floor(original/p));
    else capitalCents=Math.min(pendiente, Math.max(0,Math.round(annuity-interest)));
    if(capitalCents===0 && pendiente>0 && i<p) throw fallo('La tasa produce amortización de capital cero; revise condiciones');
    pendiente-=capitalCents;
    cuotas.push({numero:i,fecha_vencimiento:siguienteMes(primer_vencimiento,i-1),capital_programado:money(capitalCents),interes_programado:money(interest),cargos_programados:0});
  }
  return cuotas;
}
module.exports={calcularCronograma,siguienteMes};
