import { useState } from 'react';
import { Button, Card, Col, Empty, Row, Tag, Typography, theme } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatMonto } from '../../utils/formatters';
import type { DatosAnuales, SeleccionAnual } from './eerrAnual.types';

const { Text, Paragraph } = Typography;
const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const abreviar = (value: number) => new Intl.NumberFormat('es-PE', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

export default function EerrGraficos({ datos, seleccionar }: { datos: DatosAnuales; seleccionar: (value: SeleccionAnual) => void }) {
  const { token } = theme.useToken();
  const [series, setSeries] = useState(['ventas', 'por_cobrar', 'utilidad']);
  const dinero = (value: number) => `${datos.moneda === 'PEN' ? 'S/' : 'US$'} ${formatMonto(value)}`;
  const colores = [token.colorPrimaryText, token.colorSuccessText, '#8b5cf6', token.colorWarningText, '#0891b2', token.colorTextTertiary];
  const definiciones = [
    { key: 'ventas', nombre: 'Ventas del mes', color: colores[0] },
    { key: 'por_cobrar', nombre: 'Por cobrar al corte', color: token.colorWarningText },
    { key: 'utilidad', nombre: 'Utilidad neta', color: token.colorSuccessText }
  ];
  const puntos = datos.meses.map((mes, index) => ({ nombre: meses[index], ventas: mes.resumen?.ventas ?? null,
    por_cobrar: mes.cuentas_por_cobrar, utilidad: mes.resumen?.utilidad_neta ?? null }));
  const otros = datos.clientes.slice(5).reduce((sum, cliente) => sum + Math.round(cliente.importe * 100), 0);
  const sectores = [...datos.clientes.slice(0, 5).map((cliente, index) => ({ ...cliente,
    nombre: cliente.cliente, color: colores[index], tipo: 'cliente' as const })),
  ...(otros > 0 ? [{ cliente_id: -1, cliente: 'Otros clientes', ruc: '', importe: otros / 100, pedidos: 0,
    nombre: 'Otros clientes', color: colores[5], tipo: 'otros' as const }] : [])];
  const participacion = (importe: number) => datos.indicadores.ventas > 0 ? importe / datos.indicadores.ventas * 100 : 0;
  const estiloTooltip = { backgroundColor: token.colorBgElevated, border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: 12, color: token.colorText, boxShadow: token.boxShadowSecondary };

  return <Row gutter={[20, 20]} className="gd-eerr-charts-row">
    <Col xs={24} xl={15}><Card className="gd-eerr-chart-card" title="Así evolucionó el año" extra={<Tag>{datos.moneda}</Tag>}>
      <Paragraph type="secondary">Compara tus ventas, el saldo por cobrar y la utilidad de cada mes.</Paragraph>
      <div className="gd-eerr-chart-legend">{definiciones.map(serie => <button key={serie.key} aria-pressed={series.includes(serie.key)} onClick={() => setSeries(anteriores => anteriores.includes(serie.key)
        ? anteriores.length > 1 ? anteriores.filter(key => key !== serie.key) : anteriores : [...anteriores, serie.key])}
        className={series.includes(serie.key) ? '' : 'gd-eerr-serie-oculta'}><span style={{ background: serie.color }} />{serie.nombre}</button>)}</div>
      <div className="gd-eerr-line-chart" role="img" aria-label={`Evolución mensual de ventas, cuentas por cobrar y utilidad de ${datos.anio}. Los valores también están en la tabla mensual.`}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart data={puntos} margin={{ top: 20, right: 14, left: 0, bottom: 10 }} accessibilityLayer>
            <CartesianGrid stroke={token.colorBorderSecondary} strokeDasharray="3 5" vertical={false} />
            <XAxis dataKey="nombre" tick={{ fill: token.colorTextSecondary, fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={12} />
            <YAxis tickFormatter={abreviar} tick={{ fill: token.colorTextSecondary, fontSize: 11 }} axisLine={false} tickLine={false} width={62} />
            <Tooltip content={({ active, payload, label }) => active && payload?.length ? <div className="gd-eerr-chart-tooltip" style={estiloTooltip}>
              <Text strong>{label} · {datos.anio}</Text>{payload.filter(item => item.value !== null && item.value !== undefined).map(item => <div key={String(item.dataKey)}><span style={{ color: item.color }}>{item.name}</span><strong>{dinero(Number(item.value))}</strong></div>)}</div> : null} />
            {definiciones.filter(serie => series.includes(serie.key)).map(serie => <Line key={serie.key} type="linear" dataKey={serie.key} name={serie.nombre}
              stroke={serie.color} strokeWidth={2.5} dot={{ r: 3, fill: token.colorBgContainer, strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: token.colorBgContainer, strokeWidth: 3 }} connectNulls={false} isAnimationActive={false} />)}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Text type="secondary" className="gd-eerr-chart-caption">Por cobrar es un saldo al corte de cada mes e incluye deuda anterior. Los meses futuros se muestran sin datos.</Text>
    </Card></Col>
    <Col xs={24} xl={9}><Card className="gd-eerr-chart-card" title={<><TrophyOutlined style={{ color: token.colorPrimaryText, marginRight: 8 }} />Principales clientes</>}
      extra={<Button type="link" onClick={() => seleccionar({ tipo: 'clientes' })}>Ver todos</Button>}>
      <Text type="secondary">Participación en las ventas entregadas del año.</Text>
      {datos.indicadores.ventas > 0 ? <>
        <div className="gd-eerr-donut" role="img" aria-label="Participación de los cinco principales clientes y otros clientes">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}><PieChart accessibilityLayer>
            <Pie data={sectores} dataKey="importe" nameKey="nombre" cx="50%" cy="50%" innerRadius="64%" outerRadius="86%"
              paddingAngle={sectores.length > 1 ? 3 : 0} cornerRadius={5} stroke={token.colorBgContainer} strokeWidth={3} isAnimationActive={false}
              onClick={(_, index) => { const sector = sectores[index]; if (sector) seleccionar({ tipo: sector.tipo, cliente: sector }); }}>
              {sectores.map(sector => <Cell key={sector.cliente_id} fill={sector.color} />)}
            </Pie>
            <Tooltip content={({ active, payload }) => active && payload?.length ? <div className="gd-eerr-chart-tooltip" style={estiloTooltip}><Text strong>{String(payload[0].name)}</Text><div><span>Ventas del año</span><strong>{dinero(Number(payload[0].value))}</strong></div><Text type="secondary">{participacion(Number(payload[0].value)).toFixed(1)}% del total</Text></div> : null} />
          </PieChart></ResponsiveContainer>
          <div className="gd-eerr-donut-center"><strong>{datos.indicadores.clientes}</strong><span>clientes atendidos</span></div>
        </div>
        <div className="gd-eerr-client-legend">{sectores.map(sector => <button key={sector.cliente_id} onClick={() => seleccionar({ tipo: sector.tipo, cliente: sector })}>
          <span className="gd-eerr-client-dot" style={{ background: sector.color }} /><span className="gd-eerr-client-name" title={sector.nombre}>{sector.nombre}</span><strong>{participacion(sector.importe).toFixed(1)}%</strong></button>)}</div>
      </> : <div className="gd-eerr-chart-empty"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Las entregas del año aparecerán aquí" /></div>}
    </Card></Col>
  </Row>;
}
