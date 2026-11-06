import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Button, Card, Col, DatePicker, Row, Select, Skeleton, Space, Table, Tag, Tooltip, Typography, theme } from 'antd';
import type { TableColumnsType } from 'antd';
import { ArrowRightOutlined, CalendarOutlined, DollarOutlined, EyeOutlined, InfoCircleOutlined, LeftOutlined, ReloadOutlined, RightOutlined, ShoppingCartOutlined, TeamOutlined, WalletOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import esES from 'antd/es/date-picker/locale/es_ES';
import { apiFetch } from '../../services/api';
import { obtenerMesActual } from '../../utils/mesActual';
import { formatMonto } from '../../utils/formatters';
import EerrGraficos from './EerrGraficos';
import EerrDetalleAnual from './EerrDetalleAnual';
import type { DatosAnuales, MesAnual, SeleccionAnual, TipoDetalleAnual } from './eerrAnual.types';

const { Text, Title, Paragraph } = Typography;
const numero = (value: number) => new Intl.NumberFormat('es-PE').format(value);

export default function EerrAnual() {
  const [params, setParams] = useSearchParams();
  const { token } = theme.useToken();
  const actual = obtenerMesActual().slice(0, 4);
  const solicitado = params.get('anio') ?? params.get('mes')?.slice(0, 4) ?? actual;
  const anio = /^[1-9]\d{3}$/.test(solicitado) && solicitado <= actual ? solicitado : actual;
  const moneda = params.get('moneda') === 'USD' ? 'USD' : 'PEN';
  const [revision, setRevision] = useState(0);
  const [seleccion, setSeleccion] = useState<SeleccionAnual | null>(null);
  const [respuesta, setRespuesta] = useState<{ clave: string; datos?: DatosAnuales; error?: string } | null>(null);
  const query = new URLSearchParams({ anio, moneda }).toString();
  const clave = `${query}|${revision}`;
  const cargando = respuesta?.clave !== clave;
  const datos = !cargando ? respuesta?.datos : undefined;
  const error = !cargando ? respuesta?.error : undefined;
  const dinero = (value: number | null | undefined) => value === null || value === undefined
    ? 'Por completar' : `${moneda === 'PEN' ? 'S/' : 'US$'} ${formatMonto(value)}`;

  useEffect(() => {
    const controller = new AbortController();
    apiFetch(`/eerr/anual?${query}`, { signal: controller.signal }).then((data: DatosAnuales) => {
      if (!controller.signal.aborted) setRespuesta({ clave, datos: data });
    }).catch((err: unknown) => {
      if (!controller.signal.aborted) setRespuesta({ clave, error: err instanceof Error ? err.message : 'No se pudo cargar el resumen anual.' });
    });
    return () => controller.abort();
  }, [clave, query]);

  const filtrar = (nuevoAnio: string, nuevaMoneda = moneda) => {
    setSeleccion(null);
    const siguientes = new URLSearchParams(params);
    siguientes.set('vista', 'anual'); siguientes.set('anio', nuevoAnio); siguientes.set('moneda', nuevaMoneda);
    setParams(siguientes);
  };
  const abrirMes = (mes: string) => {
    const siguientes = new URLSearchParams(params);
    siguientes.delete('vista'); siguientes.set('mes', mes); siguientes.set('moneda', moneda);
    setParams(siguientes);
  };
  const variables = { '--eerr-accent': token.colorPrimaryText, '--eerr-soft': token.colorPrimaryBg,
    '--eerr-border': token.colorPrimaryBorder, '--eerr-muted': token.colorTextSecondary,
    '--eerr-surface': token.colorBgContainer, '--eerr-hover': token.colorFillAlter } as CSSProperties;
  const metrica = (titulo: string, valor: ReactNode, ayuda: string, icono: ReactNode, tipo: TipoDetalleAnual, color: string, fondo: string) =>
    <Col xs={24} sm={12} xl={6} key={tipo}><Card className="gd-eerr-kpi">
      <button className="gd-eerr-kpi-button" onClick={() => setSeleccion({ tipo })} aria-label={`Ver detalle: ${titulo}`}>
        <span className="gd-eerr-kpi-top"><span>{titulo}</span><span className="gd-eerr-kpi-icon" style={{ color, background: fondo }}>{icono}</span></span>
        <strong className="gd-eerr-kpi-value">{valor}</strong>
        <span className="gd-eerr-kpi-bottom"><span>{ayuda}</span><ArrowRightOutlined /></span>
      </button>
    </Card></Col>;

  const columnas: TableColumnsType<MesAnual> = [
    { title: 'Mes', key: 'mes', width: 160, render: (_, row) => <Space><Text strong>{dayjs(`${row.mes}-01`).locale('es').format('MMMM')}</Text>{row.corte === datos?.corte && row.corte?.slice(-2) !== dayjs(row.corte).endOf('month').format('DD') && <Tag color="blue">En curso</Tag>}</Space> },
    { title: 'Ventas', key: 'ventas', align: 'right', width: 150, render: (_, row) => row.habilitado ? dinero(row.resumen?.ventas) : '—' },
    { title: <Tooltip title="Saldo de todas las entregas pendientes al cierre de cada mes, incluyendo años anteriores.">Por cobrar <InfoCircleOutlined /></Tooltip>, dataIndex: 'cuentas_por_cobrar', align: 'right', width: 160, render: (value, row) => row.habilitado ? dinero(value) : '—' },
    { title: 'Utilidad neta', key: 'utilidad', align: 'right', width: 160, render: (_, row) => !row.habilitado ? '—' : <Text type={row.resumen?.utilidad_neta === null ? 'warning' : (row.resumen?.utilidad_neta ?? 0) < 0 ? 'danger' : undefined}>{dinero(row.resumen?.utilidad_neta)}</Text> },
    { title: 'Pedidos', dataIndex: 'pedidos', align: 'right', width: 90, render: value => value ?? '—' },
    { title: 'Clientes', dataIndex: 'clientes', align: 'right', width: 90, render: value => value ?? '—' },
    { title: '', key: 'detalle', width: 70, render: (_, row) => <Button type="text" icon={<EyeOutlined />} disabled={!row.habilitado} aria-label={`Ver EERR de ${row.mes}`} onClick={() => abrirMes(row.mes)} /> }
  ];

  return <div className="gd-eerr-anual" style={variables}>
    <div className="gd-eerr-year-header">
      <div><Space size={8}><CalendarOutlined /><Text className="gd-eerr-eyebrow">PANORAMA ANUAL</Text></Space><Title level={3}>Tu negocio en {anio}</Title><Text type="secondary">{datos ? `Del 1 de enero al ${dayjs(datos.corte).locale('es').format('D [de] MMMM')} · ${moneda}` : 'Un año de resultados, mes a mes.'}</Text></div>
      <Space wrap className="gd-eerr-year-controls">
        <Space.Compact><Button icon={<LeftOutlined />} aria-label="Año anterior" disabled={anio === '1000'} onClick={() => filtrar(String(Number(anio) - 1))} /><DatePicker picker="year" allowClear={false} value={dayjs(`${anio}-01-01`)} locale={esES} aria-label="Año del EERR" minDate={dayjs('1000-01-01')} maxDate={dayjs(`${actual}-12-31`)} onChange={value => { if (value) filtrar(value.format('YYYY')); }} /><Button icon={<RightOutlined />} aria-label="Año siguiente" disabled={anio === actual} onClick={() => filtrar(String(Number(anio) + 1))} /></Space.Compact>
        <Select aria-label="Moneda del resumen anual" value={moneda} onChange={value => filtrar(anio, value)} options={[{ value: 'PEN', label: 'Soles · PEN' }, { value: 'USD', label: 'Dólares · USD' }]} />
        <Button icon={<ReloadOutlined />} aria-label="Actualizar resumen anual" loading={cargando} onClick={() => { setSeleccion(null); setRevision(value => value + 1); }} />
      </Space>
    </div>
    {cargando ? <><Row gutter={[16, 16]}>{[1, 2, 3, 4].map(key => <Col xs={24} sm={12} xl={6} key={key}><Card><Skeleton active paragraph={{ rows: 2 }} /></Card></Col>)}</Row><Card className="gd-eerr-chart-skeleton"><Skeleton active paragraph={{ rows: 10 }} /></Card></> : error ? <Alert type="error" showIcon title="No se pudo cargar el año" description={error} action={<Button onClick={() => setRevision(value => value + 1)}>Reintentar</Button>} /> : datos ? <>
      <Row gutter={[16, 16]} className="gd-eerr-metricas">
        {metrica('Ventas totales', dinero(datos.indicadores.ventas), 'Entregas realizadas en el año', <DollarOutlined />, 'ventas', token.colorPrimaryText, token.colorPrimaryBg)}
        {metrica('Cuentas por cobrar', dinero(datos.indicadores.cuentas_por_cobrar), `${datos.indicadores.pedidos_por_cobrar} pedido(s) pendientes al corte`, <WalletOutlined />, 'cartera', token.colorWarningText, token.colorWarningBg)}
        {metrica('Pedidos ingresados', numero(datos.indicadores.pedidos), 'Registrados en el año · sin cancelados', <ShoppingCartOutlined />, 'pedidos', token.colorPrimaryText, token.colorInfoBg)}
        {metrica('Clientes atendidos', numero(datos.indicadores.clientes), 'Clientes únicos con entregas en el año', <TeamOutlined />, 'clientes', token.colorSuccessText, token.colorSuccessBg)}
      </Row>
      {!datos.completo && <Alert className="gd-eerr-nota" type="warning" showIcon title="Hay costos por completar" description="Las ventas y cuentas por cobrar están disponibles. La utilidad de los meses con costos sin trazabilidad queda por completar; puedes revisar esos meses en el detalle mensual." />}
      <EerrGraficos datos={datos} seleccionar={setSeleccion} />
      <Card className="gd-eerr-months-card" title="El detalle, mes a mes" extra={<Space wrap><Text type="secondary">Utilidad neta del año</Text><Text strong type={datos.resumen.utilidad_neta === null ? 'warning' : (datos.resumen.utilidad_neta ?? 0) < 0 ? 'danger' : undefined}>{dinero(datos.resumen.utilidad_neta)}</Text></Space>}>
        <Table<MesAnual> rowKey="mes" columns={columnas} dataSource={datos.meses} pagination={false} scroll={{ x: 1000 }} size="middle" rowClassName={row => !row.habilitado ? 'gd-eerr-mes-futuro' : ''}
          summary={() => <Table.Summary.Row><Table.Summary.Cell index={0}><Text strong>Total / saldo al corte</Text></Table.Summary.Cell><Table.Summary.Cell index={1} align="right"><Text strong>{dinero(datos.indicadores.ventas)}</Text></Table.Summary.Cell><Table.Summary.Cell index={2} align="right"><Text strong>{dinero(datos.indicadores.cuentas_por_cobrar)}</Text></Table.Summary.Cell><Table.Summary.Cell index={3} align="right"><Text strong>{dinero(datos.resumen.utilidad_neta)}</Text></Table.Summary.Cell><Table.Summary.Cell index={4} align="right"><Text strong>{datos.indicadores.pedidos}</Text></Table.Summary.Cell><Table.Summary.Cell index={5} align="right"><Text strong>{datos.indicadores.clientes}</Text></Table.Summary.Cell><Table.Summary.Cell index={6} /></Table.Summary.Row>} />
        <Paragraph type="secondary" className="gd-eerr-pie">Abre un mes para revisar cada cálculo. Los clientes anuales se cuentan una sola vez y el saldo por cobrar no se suma entre meses. Importes registrados, sin tasas automáticas ni mezcla de monedas.</Paragraph>
      </Card>
    </> : null}
    <EerrDetalleAnual datos={datos} seleccion={seleccion} seleccionar={setSeleccion} />
  </div>;
}
