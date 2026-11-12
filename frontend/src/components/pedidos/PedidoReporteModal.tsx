import { useEffect, useRef, useState } from 'react';
import { Alert, App, Button, Col, Form, Input, Modal, Row, Select, Space, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { apiFetch, descargarArchivo } from '../../services/api';

type FiltrosReporte = {
  cliente_ids: number[];
  fecha_desde?: string;
  fecha_hasta?: string;
  entrega_desde?: string;
  entrega_hasta?: string;
  estado_pedido?: string;
  estado_pago?: string;
  estado_entrega?: string;
  registrado_por?: number;
  q?: string;
};
type Opciones = {
  clientes: { cliente_id: number; razon_social: string; ruc: string }[];
  usuarios: { usuario_id: number; nombre_completo: string }[];
};
type Props = {
  filtrosIniciales: { cliente_id?: number; estado_pedido?: string; q?: string };
  onClose: () => void;
};

function parametrosReporte(filtros: FiltrosReporte) {
  const params = new URLSearchParams();
  for (const [key, valor] of Object.entries(filtros)) {
    if (Array.isArray(valor)) { if (valor.length) params.set(key, valor.join(',')); }
    else if (valor !== undefined && String(valor).trim()) params.set(key, String(valor).trim());
  }
  return params.toString();
}

function errorRangos(filtros: FiltrosReporte) {
  if (filtros.fecha_desde && filtros.fecha_hasta && filtros.fecha_desde > filtros.fecha_hasta) return 'La fecha inicial del pedido no puede ser posterior a la final.';
  if (filtros.entrega_desde && filtros.entrega_hasta && filtros.entrega_desde > filtros.entrega_hasta) return 'La fecha inicial de entrega no puede ser posterior a la final.';
  return '';
}

export default function PedidoReporteModal({ filtrosIniciales, onClose }: Props) {
  const { message } = App.useApp();
  const iniciales = (): FiltrosReporte => ({
    cliente_ids: filtrosIniciales.cliente_id ? [filtrosIniciales.cliente_id] : [],
    estado_pedido: filtrosIniciales.estado_pedido,
    q: filtrosIniciales.q
  });
  const [filtros, setFiltros] = useState<FiltrosReporte>(iniciales);
  const [opciones, setOpciones] = useState<Opciones>({ clientes: [], usuarios: [] });
  const [cargandoOpciones, setCargandoOpciones] = useState(true);
  const [errorOpciones, setErrorOpciones] = useState('');
  const [resumen, setResumen] = useState<{ consulta: string; total?: number; error?: string }>({ consulta: '' });
  const [descargando, setDescargando] = useState(false);
  const descarga = useRef<AbortController | null>(null);
  const consulta = parametrosReporte(filtros);
  const errorFechas = errorRangos(filtros);
  const contando = !errorFechas && resumen.consulta !== consulta;
  const total = resumen.consulta === consulta ? resumen.total : undefined;
  const errorResumen = resumen.consulta === consulta ? resumen.error : '';

  useEffect(() => {
    const controller = new AbortController();
    apiFetch('/pedidos/reporte/opciones', { signal: controller.signal })
      .then((data: Opciones) => { if (!controller.signal.aborted) setOpciones(data); })
      .catch((error: Error) => { if (!controller.signal.aborted) setErrorOpciones(error.message); })
      .finally(() => { if (!controller.signal.aborted) setCargandoOpciones(false); });
    return () => { controller.abort(); descarga.current?.abort(); };
  }, []);

  useEffect(() => {
    if (errorFechas) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      apiFetch(`/pedidos/reporte/resumen?${consulta}`, { signal: controller.signal })
        .then((data: { total: number }) => { if (!controller.signal.aborted) setResumen({ consulta, total: data.total }); })
        .catch((error: Error) => { if (!controller.signal.aborted) setResumen({ consulta, error: error.message }); });
    }, 400);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [consulta, errorFechas]);

  const cambiar = (campo: keyof FiltrosReporte, valor: string | number | number[] | undefined) => {
    setFiltros((actual) => ({ ...actual, [campo]: valor }));
  };

  const periodo = (tipo: 'mes' | 'anterior' | 'anio' | 'todos') => {
    const partes = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit' }).formatToParts(new Date());
    const year = Number(partes.find((p) => p.type === 'year')!.value);
    const month = Number(partes.find((p) => p.type === 'month')!.value);
    const fecha = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d)).toISOString().slice(0, 10);
    const desde = tipo === 'todos' ? undefined : tipo === 'anio' ? fecha(year, 0, 1) : fecha(year, month - (tipo === 'anterior' ? 2 : 1), 1);
    const hasta = tipo === 'todos' ? undefined : tipo === 'anio' ? fecha(year, 11, 31) : fecha(year, month - (tipo === 'anterior' ? 1 : 0), 0);
    setFiltros((actual) => ({ ...actual, fecha_desde: desde, fecha_hasta: hasta }));
  };

  const exportar = async () => {
    if (descargando || contando || !total || errorFechas || errorResumen || errorOpciones) return;
    const controller = new AbortController();
    descarga.current = controller;
    setDescargando(true);
    try {
      await descargarArchivo(`/pedidos/reporte?${consulta}`, controller.signal);
      message.success('Reporte de pedidos descargado.');
    } catch (error) {
      if (!controller.signal.aborted) message.error(error instanceof Error ? error.message : 'No se pudo descargar el reporte.');
    } finally {
      if (!controller.signal.aborted) setDescargando(false);
    }
  };

  return (
    <Modal open title="Exportar Reporte de Pedidos" width={800} onCancel={onClose}
      style={{ top: 24 }} styles={{ body: { maxHeight: 'calc(100dvh - 240px)', overflowY: 'auto', paddingRight: 4 } }}
      className="gd-pedido-report-modal" closable={!descargando} maskClosable={!descargando}
      keyboard={!descargando} footer={
        <Space wrap>
          <Button onClick={() => setFiltros({ cliente_ids: [] })} disabled={descargando}>Limpiar filtros</Button>
          <Button onClick={onClose} disabled={descargando}>Cancelar</Button>
          <Button type="primary" icon={<DownloadOutlined />} onClick={exportar} loading={descargando}
            disabled={contando || cargandoOpciones || !total || !!(errorFechas || errorResumen || errorOpciones)}>
            Descargar Excel
          </Button>
        </Space>
      }>
      <Typography.Paragraph type="secondary">
        Elige los pedidos que quieres exportar. El archivo incluye las hojas Reporte de Pedidos y Detalle, con su estado actual.
      </Typography.Paragraph>
      <Form layout="vertical" requiredMark={false} disabled={descargando}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Clientes">
              <Select aria-label="Clientes del reporte" mode="multiple" allowClear showSearch maxCount={200} maxTagCount="responsive" optionFilterProp="label"
                placeholder="Todos los clientes" loading={cargandoOpciones} value={filtros.cliente_ids}
                onChange={(value: number[]) => cambiar('cliente_ids', value)}
                options={opciones.clientes.map((c) => ({ value: c.cliente_id, label: `${c.razon_social} · ${c.ruc}` }))} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Space wrap className="gd-pedido-report-presets">
              <Typography.Text>Fecha del pedido:</Typography.Text>
              <Button size="small" onClick={() => periodo('mes')}>Este mes</Button>
              <Button size="small" onClick={() => periodo('anterior')}>Mes anterior</Button>
              <Button size="small" onClick={() => periodo('anio')}>Este año</Button>
              <Button size="small" onClick={() => periodo('todos')}>Todas las fechas</Button>
            </Space>
          </Col>
          {([
            ['fecha_desde', 'Fecha del pedido desde'], ['fecha_hasta', 'Fecha del pedido hasta'],
            ['entrega_desde', 'Última entrega desde'], ['entrega_hasta', 'Última entrega hasta']
          ] as const).map(([campo, label]) => (
            <Col xs={24} sm={12} key={campo}>
              <Form.Item label={label}>
                <Input aria-label={label} type="date" min="1753-01-01" max="9999-12-31" value={filtros[campo] || ''}
                  onChange={(event) => cambiar(campo, event.target.value || undefined)} />
              </Form.Item>
            </Col>
          ))}
          <Col xs={24} sm={12}>
            <Form.Item label="Estado del pedido">
              <Select aria-label="Estado del pedido" allowClear placeholder="Todos" value={filtros.estado_pedido} onChange={(v: string | undefined) => cambiar('estado_pedido', v)}
                options={[{ value: 'REGISTRADO', label: 'Registrado' }, { value: 'PARCIAL', label: 'Parcial' }, { value: 'ENTREGADO', label: 'Entregado' }, { value: 'CANCELADO', label: 'Cancelado' }]} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Estado de pago">
              <Select aria-label="Estado de pago" allowClear placeholder="Todos" value={filtros.estado_pago} onChange={(v: string | undefined) => cambiar('estado_pago', v)}
                options={[{ value: 'SIN_PAGO', label: 'Sin pago' }, { value: 'PARCIAL', label: 'Parcial' }, { value: 'PAGADO', label: 'Pagado' }, { value: 'PENDIENTE', label: 'Con saldo pendiente' }]} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Entregas">
              <Select aria-label="Entregas" allowClear placeholder="Todas" value={filtros.estado_entrega} onChange={(v: string | undefined) => cambiar('estado_entrega', v)}
                options={[{ value: 'PENDIENTE', label: 'Sin entregas' }, { value: 'PARCIAL', label: 'Entrega parcial' }, { value: 'COMPLETO', label: 'Entrega completa' }]} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Registrado por">
              <Select aria-label="Registrado por" allowClear showSearch placeholder="Todos" optionFilterProp="label" loading={cargandoOpciones}
                value={filtros.registrado_por} onChange={(v: number | undefined) => cambiar('registrado_por', v)}
                options={opciones.usuarios.map((u) => ({ value: u.usuario_id, label: u.nombre_completo }))} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Buscar">
              <Input aria-label="Buscar en el reporte" allowClear placeholder="N.º de pedido, cliente, RUC, código o descripción del pedido" maxLength={150}
                value={filtros.q || ''} onChange={(e) => cambiar('q', e.target.value)} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Alert showIcon type={errorFechas || errorResumen || errorOpciones ? 'error' : total === 0 ? 'warning' : 'info'}
        title={errorFechas || errorResumen || errorOpciones || (descargando ? 'Preparando el archivo Excel…' : total === undefined ? 'Consultando pedidos…' : `${total} pedido(s) para exportar`)}
        description={total === 0 ? 'No hay pedidos con estos filtros. Ajusta la selección para descargar el reporte.' : 'Se incluyen todos los pedidos que coinciden, de todas las páginas del historial.'} />
    </Modal>
  );
}
