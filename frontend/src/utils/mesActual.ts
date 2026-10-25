export function obtenerMesActual() {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Lima', year: 'numeric', month: '2-digit'
  }).formatToParts(new Date());
  return `${partes.find(parte => parte.type === 'year')!.value}-${partes.find(parte => parte.type === 'month')!.value}`;
}
