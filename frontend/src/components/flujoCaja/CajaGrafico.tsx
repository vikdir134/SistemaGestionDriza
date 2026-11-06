import { useState } from 'react';
import { Button, Card, Typography, theme } from 'antd';
import { Bar, CartesianGrid, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import dayjs from 'dayjs';
import { formatMonto } from '../../utils/formatters';
import type { DatosCaja } from './flujoCaja.types';

const { Text } = Typography;
export default function CajaGrafico({ datos, verFlujo }: { datos: DatosCaja; verFlujo: () => void }) {
  const { token } = theme.useToken();
  const [series, setSeries] = useState(['entradas', 'salidas', 'saldo_final']);
  const colores = [token.colorSuccessText, token.colorWarningText, token.colorPrimaryText];
  const definiciones = [{ key: 'entradas', nombre: 'Entradas', color: colores[0] },
    { key: 'salidas', nombre: 'Salidas', color: colores[1] }, { key: 'saldo_final', nombre: 'Saldo disponible', color: colores[2] }];
  const puntos = datos.serie.map(row => ({ ...row, etiqueta: datos.vista === 'anual'
    ? dayjs(`${row.periodo}-01`).locale('es').format('MMM') : row.periodo.slice(-2) }));
  const formato = (value: number) => `${datos.moneda === 'PEN' ? 'S/' : 'US$'} ${formatMonto(value)}`;
  return <Card className="gd-caja-grafico" title={datos.vista === 'anual' ? 'Tu caja, mes a mes' : 'Así se movió tu dinero'}
    extra={<Button type="link" onClick={verFlujo} aria-label="Ver detalle: Flujo neto"><Text type={datos.resumen.flujo_neto < 0 ? 'danger' : 'success'} strong>Flujo neto: {formato(datos.resumen.flujo_neto)}</Text></Button>}>
    <div className="gd-caja-leyenda">{definiciones.map(serie => <button key={serie.key} aria-pressed={series.includes(serie.key)}
      className={series.includes(serie.key) ? '' : 'gd-caja-oculto'} onClick={() => setSeries(antes => antes.includes(serie.key)
        ? antes.length > 1 ? antes.filter(item => item !== serie.key) : antes : [...antes, serie.key])}>
      <span style={{ background: serie.color }} />{serie.nombre}</button>)}</div>
    <div className="gd-caja-chart" role="img" aria-label={datos.vista === 'anual' ? 'Evolución mensual de entradas, salidas y saldo disponible; los datos están también en la tabla.' : 'Evolución diaria de entradas, salidas y saldo disponible; los datos están también en la tabla.'}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0}><ComposedChart data={puntos} margin={{ top: 20, right: 12, left: 2, bottom: 8 }} accessibilityLayer>
        <CartesianGrid vertical={false} stroke={token.colorBorderSecondary} strokeDasharray="3 5" />
        <XAxis dataKey="etiqueta" axisLine={false} tickLine={false} minTickGap={12} tick={{ fill: token.colorTextSecondary, fontSize: 11 }} />
        <YAxis axisLine={false} tickLine={false} width={65} tick={{ fill: token.colorTextSecondary, fontSize: 11 }} tickFormatter={value => new Intl.NumberFormat('es-PE', { notation: 'compact', maximumFractionDigits: 1 }).format(value)} />
        <ReferenceLine y={0} stroke={token.colorBorderSecondary} />
        <Tooltip content={({ active, payload, label }) => active && payload?.length ? <div className="gd-caja-tooltip" style={{ background: token.colorBgElevated, color: token.colorText, borderColor: token.colorBorderSecondary, boxShadow: token.boxShadowSecondary }}>
          <Text strong>{datos.vista === 'anual' ? `${label} · ${datos.periodo}` : `${label}/${datos.periodo.slice(5)}/${datos.periodo.slice(0, 4)}`}</Text>
          {payload.filter(item => item.value !== null && item.value !== undefined).map(item => <div key={String(item.dataKey)}><span style={{ color: item.color }}>{item.name}</span><strong>{formato(Number(item.value))}</strong></div>)}
        </div> : null} />
        {series.includes('entradas') && <Bar dataKey="entradas" name="Entradas" fill={colores[0]} fillOpacity={.72} radius={[4, 4, 0, 0]} maxBarSize={24} isAnimationActive={false} />}
        {series.includes('salidas') && <Bar dataKey="salidas" name="Salidas" fill={colores[1]} fillOpacity={.72} radius={[4, 4, 0, 0]} maxBarSize={24} isAnimationActive={false} />}
        {series.includes('saldo_final') && <Line type="linear" dataKey="saldo_final" name="Saldo disponible" stroke={colores[2]} strokeWidth={3}
          dot={datos.vista === 'anual' ? { r: 3, fill: token.colorBgContainer, strokeWidth: 2 } : false} activeDot={{ r: 5 }} connectNulls={false} isAnimationActive={false} />}
      </ComposedChart></ResponsiveContainer>
    </div>
    <Text type="secondary" className="gd-caja-caption">{datos.vista === 'anual' ? 'El saldo de un mes pasa al siguiente; los saldos no se suman.' : 'Los días sin movimientos conservan el saldo del día anterior.'} Los períodos futuros se muestran sin datos.</Text>
  </Card>;
}
