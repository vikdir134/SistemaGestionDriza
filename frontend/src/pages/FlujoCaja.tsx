import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Button, Card, Col, ConfigProvider, DatePicker, Descriptions, Drawer, Empty, Input, Row, Select, Skeleton, Space, Table, Tabs, Tag, Typography, theme } from 'antd';
import type { TableColumnsType } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined, ArrowUpOutlined, BankOutlined, CalendarOutlined, EyeOutlined, LeftOutlined, LineChartOutlined, ReloadOutlined, RightOutlined, SearchOutlined, WalletOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import esES from 'antd/es/date-picker/locale/es_ES';
import PageHeader from '../components/ui/PageHeader';
import { useGestionDrizaTheme } from '../theme/GestionDrizaThemeProvider';
import { obtenerMesActual } from '../utils/mesActual';
import { formatMonto } from '../utils/formatters';
import { apiFetch } from '../services/api';
import CajaGrafico from '../components/flujoCaja/CajaGrafico';
import CajaMovimientos from '../components/flujoCaja/CajaMovimientos';
import type { DatosCaja, PuntoCaja, SeleccionCaja } from '../components/flujoCaja/flujoCaja.types';
import '../styles/flujoCaja.css';

const { Text, Title, Paragraph } = Typography;
const nombres = { saldo_inicial: 'Saldo inicial', entradas: 'Entradas de dinero', salidas: 'Salidas de dinero', flujo_neto: 'Flujo neto', saldo_final: 'Saldo final', categoria: 'Detalle por concepto', dia: 'Movimientos del período' };
const fecha = (value: string) => value.split('-').reverse().join('/');

export default function FlujoCaja() {
  const { mode } = useGestionDrizaTheme();
  const oscuro = mode === 'dark';
  const acento = oscuro ? '#60a5fa' : '#2563eb';
  return <ConfigProvider theme={{ token: { colorPrimary: acento, colorPrimaryText: acento, colorLink: acento,
    colorLinkHover: oscuro ? '#93c5fd' : '#1d4ed8', colorSuccessText: oscuro ? '#4ade80' : '#15803d',
    colorWarningText: oscuro ? '#fbbf24' : '#b45309' } }}><ContenidoCaja /></ConfigProvider>;
}

function ContenidoCaja() {
  const [params, setParams] = useSearchParams();
  const { token } = theme.useToken();
  const actual = obtenerMesActual();
  const vista = params.get('vista') === 'anual' ? 'anual' : 'mensual';
  const pedidoMes = params.get('mes') ?? actual;
  const mes = /^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(pedidoMes) && pedidoMes <= actual ? pedidoMes : actual;
  const pedidoAnio = params.get('anio') ?? mes.slice(0, 4);
  const anio = /^[1-9]\d{3}$/.test(pedidoAnio) && pedidoAnio <= actual.slice(0, 4) ? pedidoAnio : actual.slice(0, 4);
  const moneda = params.get('moneda') === 'USD' ? 'USD' : 'PEN';
  const periodo = vista === 'anual' ? anio : mes;
  const [revision, setRevision] = useState(0);
  const [seleccion, setSeleccion] = useState<SeleccionCaja | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [sentido, setSentido] = useState<string>('TODOS');
  const [respuesta, setRespuesta] = useState<{ clave: string; datos?: DatosCaja; error?: string } | null>(null);
  const encabezado = useRef<HTMLDivElement>(null);
  const query = new URLSearchParams({ vista, moneda, ...(vista === 'anual' ? { anio } : { mes }) }).toString();
  const clave = `${query}|${revision}`;
  const cargando = respuesta?.clave !== clave;
  const datos = !cargando ? respuesta?.datos : undefined;
  const error = !cargando ? respuesta?.error : undefined;
  const dinero = (value: number | null | undefined) => value === null || value === undefined ? '—' : `${moneda === 'PEN' ? 'S/' : 'US$'} ${formatMonto(value)}`;
  useEffect(() => {
    const controller = new AbortController();
    apiFetch(`/flujo-caja?${query}`, { signal: controller.signal }).then((data: DatosCaja) => {
      if (!controller.signal.aborted) setRespuesta({ clave, datos: data });
    }).catch((err: unknown) => {
      if (!controller.signal.aborted) setRespuesta({ clave, error: err instanceof Error ? err.message : 'No se pudo cargar el flujo de caja.' });
    });
    return () => controller.abort();
  }, [query, clave]);
  useEffect(() => { encabezado.current?.scrollIntoView({ behavior: 'instant', block: 'start' }); }, [vista]);

  const filtrar = (cambios: Record<string, string>) => {
    setSeleccion(null); setBusqueda(''); setSentido('TODOS');
    const siguientes = new URLSearchParams(params);
    Object.entries(cambios).forEach(([key, value]) => siguientes.set(key, value));
    setParams(siguientes);
  };
  const mover = (pasos: number) => vista === 'anual' ? filtrar({ anio: String(Number(anio) + pasos) })
    : filtrar({ mes: dayjs(`${mes}-01`).add(pasos, 'month').format('YYYY-MM') });
  const variables = { '--caja-acento': token.colorPrimaryText, '--caja-suave': token.colorPrimaryBg,
    '--caja-borde': token.colorPrimaryBorder, '--caja-superficie': token.colorBgContainer,
    '--caja-secundario': token.colorTextSecondary, '--caja-hover': token.colorFillAlter } as CSSProperties;
  const registros = datos?.movimientos.filter(row => (sentido === 'TODOS' || row.sentido === sentido)
    && `${row.concepto} ${row.descripcion ?? ''} ${row.tercero ?? ''} ${row.referencia ?? ''}`.toLocaleLowerCase('es').includes(busqueda.trim().toLocaleLowerCase('es'))) ?? [];
  const seleccionados = !datos || !seleccion ? [] : seleccion.tipo === 'saldo_inicial' ? datos.anteriores
    : seleccion.tipo === 'categoria' ? datos.movimientos.filter(row => row.categoria === seleccion.categoria?.codigo)
    : seleccion.tipo === 'dia' ? datos.movimientos.filter(row => row.fecha.startsWith(seleccion.periodo ?? ''))
    : seleccion.tipo === 'entradas' || seleccion.tipo === 'salidas' ? datos.movimientos.filter(row => row.sentido === (seleccion.tipo === 'entradas' ? 'ENTRADA' : 'SALIDA')) : datos.movimientos;
  const valorSeleccion = !datos || !seleccion ? undefined : seleccion.tipo === 'categoria' ? seleccion.categoria?.total
    : seleccion.tipo === 'dia' ? datos.serie.find(row => row.periodo === seleccion.periodo)?.flujo_neto : datos.resumen[seleccion.tipo];
  const kpi = (tipo: 'saldo_inicial' | 'entradas' | 'salidas' | 'saldo_final', icono: ReactNode, color: string, fondo: string, ayuda: string) =>
    <Col xs={24} sm={12} xl={6} key={tipo}><Card className={`gd-caja-kpi${tipo === 'saldo_final' ? ' gd-caja-kpi-final' : ''}`}>
      <button onClick={() => setSeleccion({ tipo })} aria-label={`Ver detalle: ${nombres[tipo]}`}>
        <span className="gd-caja-kpi-top">{nombres[tipo]}<span className="gd-caja-icono" style={{ color, background: fondo }}>{icono}</span></span>
        <strong className={tipo === 'saldo_final' && (datos?.resumen.saldo_final ?? 0) < 0 ? 'gd-caja-negativo' : ''}>{dinero(datos?.resumen[tipo])}</strong>
        <span className="gd-caja-kpi-pie">{ayuda}<ArrowRightOutlined /></span>
      </button></Card></Col>;
  const columnasSerie: TableColumnsType<PuntoCaja> = [
    { title: vista === 'anual' ? 'Mes' : 'Día', dataIndex: 'periodo', width: 150, render: value => vista === 'anual' ? dayjs(`${value}-01`).locale('es').format('MMMM') : fecha(value) },
    ...(['saldo_inicial', 'entradas', 'salidas', 'flujo_neto', 'saldo_final'] as const).map((key, index) => ({ title: nombres[key], key,
      align: 'right' as const, width: 155, render: (_: unknown, row: PuntoCaja) => <Text strong={index === 4} type={row[key] !== null && row[key]! < 0 ? 'danger' : undefined}>{dinero(row[key])}</Text> })),
    { title: '', key: 'detalle', width: 55, render: (_, row) => <Button type="text" icon={<EyeOutlined />} disabled={!row.habilitado} aria-label={`Ver movimientos de ${row.periodo}`}
      onClick={() => vista === 'anual' ? filtrar({ vista: 'mensual', mes: row.periodo }) : setSeleccion({ tipo: 'dia', periodo: row.periodo })} /> }
  ];

  return <div className="gd-caja-page" style={variables}>
    <div ref={encabezado} className="gd-caja-encabezado"><PageHeader title="Flujo de caja" description="Conoce cuánto dinero entró, cuánto salió y con cuánto cuentas al cierre." /></div>
    <Tabs activeKey={vista} className="gd-caja-tabs" onChange={value => filtrar({ vista: value })} items={[
      { key: 'mensual', label: <span><CalendarOutlined /> Mensual</span> }, { key: 'anual', label: <span><LineChartOutlined /> Anual</span> }
    ]} />
    <div className="gd-caja-periodo">
      <div><Text className="gd-caja-etiqueta">{vista === 'anual' ? 'PANORAMA ANUAL' : 'CONTROL MENSUAL'}</Text><Title level={3}>{vista === 'anual' ? `Tu caja en ${anio}` : dayjs(`${mes}-01`).locale('es').format('MMMM [de] YYYY')}</Title>
        <Text type="secondary">{datos ? `Del ${fecha(datos.desde)} al ${fecha(datos.corte)} · ${moneda}` : 'Movimientos registrados, sin duplicar tu dinero.'}</Text></div>
      <Space wrap><Space.Compact><Button aria-label="Período anterior" icon={<LeftOutlined />} disabled={periodo === (vista === 'anual' ? '1000' : '1000-01')} onClick={() => mover(-1)} />
        <DatePicker key={vista} picker={vista === 'anual' ? 'year' : 'month'} allowClear={false} value={dayjs(vista === 'anual' ? `${anio}-01-01` : `${mes}-01`)}
          format={vista === 'anual' ? 'YYYY' : 'MMM YYYY'} locale={esES} aria-label="Período del flujo de caja" minDate={dayjs('1000-01-01')} maxDate={dayjs(`${actual}-01`).endOf('month')}
          onChange={value => { if (value) filtrar(vista === 'anual' ? { anio: value.format('YYYY') } : { mes: value.format('YYYY-MM') }); }} />
        <Button aria-label="Período siguiente" icon={<RightOutlined />} disabled={periodo === (vista === 'anual' ? actual.slice(0, 4) : actual)} onClick={() => mover(1)} /></Space.Compact>
        <Select aria-label="Moneda del flujo de caja" value={moneda} options={[{ value: 'PEN', label: 'Soles · PEN' }, { value: 'USD', label: 'Dólares · USD' }]} onChange={value => filtrar({ moneda: value })} />
        <Button aria-label="Actualizar flujo de caja" icon={<ReloadOutlined />} loading={cargando} onClick={() => { setSeleccion(null); setRevision(value => value + 1); }} /></Space>
    </div>
    {cargando ? <><Row gutter={[16, 16]}>{[1, 2, 3, 4].map(key => <Col xs={24} sm={12} xl={6} key={key}><Card><Skeleton active paragraph={{ rows: 2 }} /></Card></Col>)}</Row><Card className="gd-caja-seccion"><Skeleton active paragraph={{ rows: 8 }} /></Card></> : error ? <Alert type="error" showIcon title="No se pudo calcular el flujo" description={error} action={<Button onClick={() => setRevision(value => value + 1)}>Reintentar</Button>} /> : datos ? <>
      <Row gutter={[16, 16]} className="gd-caja-metricas">
        {kpi('saldo_inicial', <BankOutlined />, token.colorPrimaryText, token.colorPrimaryBg, 'Saldo acumulado antes del período')}
        {kpi('entradas', <ArrowDownOutlined />, token.colorSuccessText, token.colorSuccessBg, 'Cobros, aportes y dinero recibido')}
        {kpi('salidas', <ArrowUpOutlined />, token.colorWarningText, token.colorWarningBg, 'Compras, gastos y pagos realizados')}
        {kpi('saldo_final', <WalletOutlined />, token.colorPrimaryText, token.colorPrimaryBg, 'Saldo inicial + entradas − salidas')}
      </Row>
      {datos.resumen.saldo_final < 0 && <Alert className="gd-caja-seccion" type="warning" showIcon title="El saldo registrado es negativo" description="Las salidas superan el dinero registrado. Revisa si falta registrar una inversión, un cobro u otro movimiento." />}
      <CajaGrafico datos={datos} verFlujo={() => setSeleccion({ tipo: 'flujo_neto' })} />
      <Row gutter={[20, 20]} className="gd-caja-seccion">{(['ENTRADA', 'SALIDA'] as const).map(tipo => {
        const categorias = datos.categorias.filter(row => row.sentido === tipo && row.cantidad > 0);
        const color = tipo === 'ENTRADA' ? token.colorSuccessText : token.colorWarningText;
        return <Col xs={24} lg={12} key={tipo}><Card className="gd-caja-categorias" title={tipo === 'ENTRADA' ? '¿De dónde vino el dinero?' : '¿En qué se utilizó?'} extra={<Text strong style={{ color }}>{dinero(tipo === 'ENTRADA' ? datos.resumen.entradas : datos.resumen.salidas)}</Text>}>
          {categorias.length ? categorias.map(categoria => <button className="gd-caja-categoria" key={categoria.codigo} onClick={() => setSeleccion({ tipo: 'categoria', categoria })}>
            <span><Text strong>{categoria.nombre}</Text><Text type="secondary">{categoria.cantidad} movimiento(s)</Text></span><strong style={{ color }}>{dinero(categoria.total)}</strong><ArrowRightOutlined />
          </button>) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={tipo === 'ENTRADA' ? 'Sin entradas en este período' : 'Sin salidas en este período'} />}
        </Card></Col>;
      })}</Row>
      <Card title={vista === 'anual' ? 'El saldo, mes a mes' : 'El saldo, día a día'} className="gd-caja-seccion">
        <Table<PuntoCaja> rowKey="periodo" columns={columnasSerie} dataSource={datos.serie} pagination={vista === 'anual' ? false : { pageSize: 10, showSizeChanger: false }} size="middle" scroll={{ x: 1000 }} rowClassName={row => !row.habilitado ? 'gd-caja-futuro' : ''}
          summary={() => <Table.Summary.Row><Table.Summary.Cell index={0}><Text strong>Total / saldo al corte</Text></Table.Summary.Cell>{(['saldo_inicial', 'entradas', 'salidas', 'flujo_neto', 'saldo_final'] as const).map((key, index) => <Table.Summary.Cell key={key} index={index + 1} align="right"><Text strong>{dinero(datos.resumen[key])}</Text></Table.Summary.Cell>)}<Table.Summary.Cell index={6} /></Table.Summary.Row>} />
      </Card>
      <Card title="Todos los movimientos del período" className="gd-caja-seccion" extra={<Tag>{datos.movimientos.length} movimientos</Tag>}>
        <Space wrap className="gd-caja-filtros-detalle"><Input aria-label="Buscar movimiento" placeholder="Buscar concepto, cliente o referencia" prefix={<SearchOutlined />} allowClear value={busqueda} onChange={event => setBusqueda(event.target.value)} />
          <Select aria-label="Tipo de movimiento" value={sentido} onChange={setSentido} options={[{ value: 'TODOS', label: 'Entradas y salidas' }, { value: 'ENTRADA', label: 'Solo entradas' }, { value: 'SALIDA', label: 'Solo salidas' }]} />
          {(busqueda || sentido !== 'TODOS') && <Button onClick={() => { setBusqueda(''); setSentido('TODOS'); }}>Limpiar</Button>}</Space>
        <CajaMovimientos key={`${clave}-${busqueda}-${sentido}`} rows={registros} moneda={moneda} />
        <Text type="secondary" className="gd-caja-caption">Los filtros afectan este detalle; los indicadores muestran el período completo.</Text>
      </Card>
      <Paragraph type="secondary" className="gd-caja-nota">Cada inversión entra una vez, en su fecha. Los saldos anteriores se arrastran; las compras y gastos se consideran pagados al registrarlos. Los cobros de clientes cuentan al cobrarse, aunque la venta pertenezca a otro mes. Importes registrados, por moneda.</Paragraph>
    </> : null}
    <Drawer title={seleccion?.tipo === 'categoria' ? seleccion.categoria?.nombre : seleccion?.tipo === 'dia' ? `Movimientos del ${fecha(seleccion.periodo ?? '')}` : seleccion ? nombres[seleccion.tipo] : ''}
      open={Boolean(seleccion && datos)} onClose={() => setSeleccion(null)} destroyOnHidden size="large" styles={{ wrapper: { width: 'min(1200px, 96vw)' } }}>
      {seleccion && datos && <><Descriptions column={1} items={[
        { key: 'periodo', label: 'Período', children: seleccion.tipo === 'saldo_inicial' ? `Antes del ${fecha(datos.desde)} · ${moneda}` : `${fecha(datos.desde)} al ${fecha(datos.corte)} · ${moneda}` },
        { key: 'total', label: seleccion.tipo === 'dia' ? 'Flujo neto del día' : 'Total', children: <Text strong>{dinero(valorSeleccion)}</Text> },
        { key: 'criterio', label: 'Cálculo', children: seleccion.tipo === 'saldo_inicial' ? 'Acumulado de entradas y salidas anteriores al período. El historial parte de cero y los aportes se incluyen en su fecha.'
          : seleccion.tipo === 'saldo_final' ? `Saldo inicial ${dinero(datos.resumen.saldo_inicial)} + entradas ${dinero(datos.resumen.entradas)} − salidas ${dinero(datos.resumen.salidas)}.`
          : seleccion.tipo === 'flujo_neto' ? `Entradas ${dinero(datos.resumen.entradas)} − salidas ${dinero(datos.resumen.salidas)}. No incluye nuevamente el saldo inicial.` : 'Movimientos de dinero registrados en la fecha de cada cobro o pago.' }
      ]} /><div className="gd-caja-seccion"><CajaMovimientos key={`${clave}-${seleccion.tipo}-${seleccion.categoria?.codigo}-${seleccion.periodo}`} rows={seleccionados} moneda={moneda} compacto /></div></>}
    </Drawer>
  </div>;
}
