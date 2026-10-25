import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { obtenerMesActual } from '../../utils/mesActual';
import { Alert, Button, Card, Col, DatePicker, Descriptions, Drawer, Empty, Form, Input, Progress, Row, Select, Skeleton, Space, Statistic, Table, Tag, Typography, theme } from 'antd';
import type { TableColumnsType } from 'antd';
import { CalendarOutlined, EyeOutlined, FilterOutlined, LeftOutlined, ReloadOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import esES from 'antd/es/date-picker/locale/es_ES';
import { apiFetch } from '../../services/api';
import { formatMonto } from '../../utils/formatters';

const { Text, Title } = Typography;
type Filtros = { tipo_gasto_id?: number; proveedor_id?: number; moneda_codigo?: string; q?: string };
type Gasto = {
  gasto_id: number; fecha_gasto: string; tipo_gasto: string; monto: number; moneda_codigo: string;
  descripcion?: string; proveedor?: string; proveedor_ruc?: string; comprobante?: string;
  registrado_por: string; created_at: string; actualizado_por?: string; updated_at?: string;
};
type Resumen = { moneda_codigo: string; cantidad: number; total: number };
type Categoria = Resumen & { tipo_gasto_id: number; tipo_gasto: string };
type Datos = { gastos: Gasto[]; resumen: Resumen[]; categorias: Categoria[]; paginacion: { total: number } };
type Props = {
  tipos: { tipo_gasto_id: number; nombre: string }[];
  proveedores: { proveedor_id: number; razon_social: string; ruc: string }[];
  revision: number;
};
const fecha = (value?: string) => value ? value.slice(0, 10).split('-').reverse().join('/') : '—';

export default function GastosMensuales({ tipos, proveedores, revision }: Props) {
  const [searchParams] = useSearchParams();
  const { token } = theme.useToken();
  const [form] = Form.useForm<Filtros>();
  const [mes, setMes] = useState(() => {
    const solicitado = searchParams.get('mes') ?? '';
    const inicial = /^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(solicitado) && solicitado <= '9998-12' ? solicitado : obtenerMesActual();
    return dayjs(`${inicial}-01`).startOf('month');
  });
  const [filtros, setFiltros] = useState<Filtros>({});
  const [page, setPage] = useState(1);
  const [recarga, setRecarga] = useState(0);
  const [seleccion, setSeleccion] = useState<Gasto | null>(null);
  const [respuesta, setRespuesta] = useState<{ clave: string; datos?: Datos; error?: string } | null>(null);
  const params = new URLSearchParams({ mes: mes.format('YYYY-MM'), page: String(page), limit: '10' });
  Object.entries(filtros).forEach(([key, value]) => {
    if (value !== undefined && String(value).trim()) params.set(key, String(value).trim());
  });
  const query = params.toString();
  const clave = `${query}|${revision}|${recarga}`;
  const cargando = respuesta?.clave !== clave;
  const datos = !cargando ? respuesta?.datos : undefined;
  const error = !cargando ? respuesta?.error : undefined;
  const monedas = (datos?.resumen ?? [])
    .filter(item => item.cantidad > 0)
    .map(item => item.moneda_codigo);
  const hayFiltros = Object.values(filtros).some(value => value !== undefined && String(value).trim());

  useEffect(() => {
    const controller = new AbortController();
    apiFetch(`/gastos?${query}`, { signal: controller.signal }).then((data: Datos) => {
      if (!controller.signal.aborted) setRespuesta({ clave, datos: data });
    }).catch((err: unknown) => {
      if (!controller.signal.aborted) setRespuesta({ clave, error: err instanceof Error ? err.message : 'No se pudieron cargar los gastos.' });
    });
    return () => controller.abort();
  }, [query, clave]);

  const cambiarMes = (value: dayjs.Dayjs) => { setMes(value.startOf('month')); setPage(1); setSeleccion(null); };
  const columns: TableColumnsType<Gasto> = [
    { title: 'Fecha ↓', dataIndex: 'fecha_gasto', width: 115, render: fecha },
    { title: 'Tipo / descripción', key: 'descripcion', render: (_, gasto) => <div className="gd-gasto-main-cell"><Text strong>{gasto.tipo_gasto}</Text><Text type="secondary">{gasto.descripcion || 'Sin descripción'}</Text></div> },
    { title: 'Proveedor', dataIndex: 'proveedor', render: (value?: string) => value || 'Sin proveedor' },
    { title: 'Comprobante', dataIndex: 'comprobante', render: (value?: string) => value || '—' },
    { title: 'Monto', key: 'monto', align: 'right', width: 170, render: (_, gasto) => <Text strong>{gasto.moneda_codigo === 'PEN' ? 'S/' : 'US$'} {formatMonto(gasto.monto)}</Text> },
    { title: 'Detalle', key: 'detalle', width: 110, fixed: 'right', render: (_, gasto) => <Button type="link" icon={<EyeOutlined />} onClick={() => setSeleccion(gasto)}>Ver</Button> }
  ];

  return (
    <div className="gd-gastos-mensuales">
      <Card className="gd-gasto-month-header" style={{ background: token.colorPrimaryBg, borderColor: token.colorPrimaryBorder }}>
        <div className="gd-gasto-month-toolbar">
          <div>
            <Space><CalendarOutlined style={{ color: token.colorPrimary }} /><Text type="secondary">CONTROL MENSUAL</Text></Space>
            <Title level={3} className="gd-gasto-month-title">{mes.locale('es').format('MMMM [de] YYYY')}</Title>
            <Text type="secondary">Consulta cuánto gastaste y revisa cada movimiento del mes.</Text>
          </div>
          <Space wrap align="center" className="gd-gasto-month-actions">
            <Button aria-label="Mes anterior" icon={<LeftOutlined />} onClick={() => cambiarMes(mes.subtract(1, 'month'))} />
            <DatePicker picker="month" allowClear={false} value={mes} locale={esES} format="MM/YYYY" aria-label="Seleccionar mes" onChange={value => { if (value) cambiarMes(value); }} />
            <Button aria-label="Mes siguiente" icon={<RightOutlined />} onClick={() => cambiarMes(mes.add(1, 'month'))} />
            <Button icon={<ReloadOutlined />} loading={cargando} onClick={() => setRecarga(value => value + 1)}>Actualizar</Button>
          </Space>
        </div>
      </Card>

      <Card className="gd-gasto-section-card" title={<Space><FilterOutlined />Filtrar gastos del mes {hayFiltros && <Tag color="blue">Filtros aplicados</Tag>}</Space>}>
        <Form form={form} layout="vertical" onFinish={values => { setFiltros(values); setPage(1); }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12} xl={6}><Form.Item name="tipo_gasto_id" label="Tipo de gasto"><Select allowClear showSearch optionFilterProp="label" placeholder="Todos los tipos" options={tipos.map(tipo => ({ value: tipo.tipo_gasto_id, label: tipo.nombre }))} /></Form.Item></Col>
            <Col xs={24} sm={12} xl={6}><Form.Item name="proveedor_id" label="Proveedor"><Select allowClear showSearch optionFilterProp="label" placeholder="Todos los proveedores" options={proveedores.map(proveedor => ({ value: proveedor.proveedor_id, label: `${proveedor.razon_social} · ${proveedor.ruc}` }))} /></Form.Item></Col>
            <Col xs={24} sm={12} xl={4}><Form.Item name="moneda_codigo" label="Moneda"><Select allowClear placeholder="Todas" options={[{ value: 'PEN', label: 'Soles (PEN)' }, { value: 'USD', label: 'Dólares (USD)' }]} /></Form.Item></Col>
            <Col xs={24} sm={12} xl={8}><Form.Item name="q" label="Buscar en el detalle"><Input allowClear maxLength={400} placeholder="Descripción, comprobante, proveedor o tipo" /></Form.Item></Col>
          </Row>
          <Space wrap>
            <Button type="primary" htmlType="submit" icon={<FilterOutlined />}>Aplicar filtros</Button>
            <Button onClick={() => { form.resetFields(); setFiltros({}); setPage(1); }}>Limpiar filtros</Button>
            <Text type="secondary">Los filtros se aplican al resumen y al detalle.</Text>
          </Space>
        </Form>
      </Card>

      {error ? <Alert type="error" showIcon title="No pudimos cargar este mes" description={error} action={<Button onClick={() => setRecarga(value => value + 1)}>Reintentar</Button>} /> : <>
        <Row gutter={[16, 16]} className="gd-gasto-section-card">
          <Col xs={24} md={monedas.length ? 8 : 24}><Card loading={cargando}><Statistic title="Gastos encontrados" value={datos?.paginacion.total ?? 0} /><Text type="secondary">En el mes y con los filtros seleccionados</Text></Card></Col>
          {monedas.map(moneda => {
            const resumen = datos?.resumen.find(item => item.moneda_codigo === moneda);
            return <Col xs={24} md={monedas.length === 1 ? 16 : 8} key={moneda}><Card loading={cargando}><Statistic title={`Total en ${moneda === 'PEN' ? 'soles' : 'dólares'}`} value={resumen?.total ?? 0} precision={2} prefix={moneda === 'PEN' ? 'S/' : 'US$'} styles={{ content: { color: token.colorPrimary, fontWeight: 700 } }} /><Text type="secondary">{resumen?.cantidad ?? 0} gastos · {moneda}</Text></Card></Col>;
          })}
        </Row>

        <Card title="¿En qué se gastó?" className="gd-gasto-section-card">
          {cargando ? <Skeleton active /> : !datos?.categorias.length ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay gastos para este mes y estos filtros" /> : <Row gutter={[32, 20]}>
            {monedas.map(moneda => {
              const categorias = datos.categorias.filter(item => item.moneda_codigo === moneda);
              const total = datos.resumen.find(item => item.moneda_codigo === moneda)?.total ?? 0;
              if (!categorias.length) return null;
              return <Col xs={24} lg={monedas.length > 1 ? 12 : 24} key={moneda}>
                <Tag color="blue">{moneda === 'PEN' ? 'Soles · PEN' : 'Dólares · USD'}</Tag>
                <div className="gd-gasto-category-list">{categorias.map(item => <div key={item.tipo_gasto_id} className="gd-gasto-category">
                  <div className="gd-gasto-category-label"><Text strong>{item.tipo_gasto}</Text><Text>{moneda === 'PEN' ? 'S/' : 'US$'} {formatMonto(item.total)}</Text></div>
                  <Progress percent={total > 0 ? Number((item.total / total * 100).toFixed(1)) : 0} strokeColor={token.colorPrimary} size="small" />
                  <Text type="secondary">{item.cantidad} gasto(s)</Text>
                </div>)}</div>
              </Col>;
            })}
          </Row>}
        </Card>

        <Card title="Detalle de gastos del mes" extra={<Tag>Más recientes primero</Tag>} className="gd-gasto-table-card">
          <Table<Gasto> rowKey="gasto_id" columns={columns} dataSource={datos?.gastos ?? []} loading={cargando} scroll={{ x: 1000 }}
            locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay gastos para los filtros seleccionados" /> }}
            pagination={{ current: page, pageSize: 10, total: datos?.paginacion.total ?? 0, showSizeChanger: false, onChange: setPage, showTotal: total => `${total} gasto(s)` }} />
        </Card>
      </>}

      <Drawer title="Detalle del gasto" open={!!seleccion} onClose={() => setSeleccion(null)} size="large">
        {seleccion && <>
          <Statistic title={seleccion.tipo_gasto} prefix={seleccion.moneda_codigo === 'PEN' ? 'S/' : 'US$'} value={seleccion.monto} precision={2} />
          <Descriptions column={1} bordered className="gd-gasto-detail" items={[
            { key: 'fecha', label: 'Fecha del gasto', children: fecha(seleccion.fecha_gasto) },
            { key: 'descripcion', label: 'Descripción', children: seleccion.descripcion || 'Sin descripción' },
            { key: 'proveedor', label: 'Proveedor', children: seleccion.proveedor || 'Sin proveedor' },
            { key: 'ruc', label: 'RUC', children: seleccion.proveedor_ruc || '—' },
            { key: 'comprobante', label: 'Comprobante', children: seleccion.comprobante || '—' },
            { key: 'moneda', label: 'Moneda', children: seleccion.moneda_codigo },
            { key: 'autor', label: 'Registrado por', children: seleccion.registrado_por },
            { key: 'registro', label: 'Fecha de registro', children: fecha(seleccion.created_at) },
            ...(seleccion.updated_at ? [{ key: 'edicion', label: 'Última edición', children: `${fecha(seleccion.updated_at)} · ${seleccion.actualizado_por || '—'}` }] : [])
          ]} />
        </>}
      </Drawer>
    </div>
  );
}
