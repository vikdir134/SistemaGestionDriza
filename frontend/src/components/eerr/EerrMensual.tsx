import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Button, Card, DatePicker, Descriptions, Drawer, Empty, Select, Skeleton, Space, Table, Tabs, Tag, Typography, theme } from 'antd';
import type { TableColumnsType } from 'antd';
import { EyeOutlined, LeftOutlined, ReloadOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import esES from 'antd/es/date-picker/locale/es_ES';
import { apiFetch } from '../../services/api';
import { formatMonto } from '../../utils/formatters';
import { obtenerMesActual } from '../../utils/mesActual';

const { Text, Paragraph } = Typography;
type Venta = {
  entrega_detalle_id: number; entrega_id: number; pedido_id: number; codigo_pedido: string;
  fecha: string; cliente: string; ruc: string; producto: string; unidad: string;
  cantidad: number; precio_unitario: number; monto: number; cubierto: number; credito: number;
  depositado_a_fecha: number; entregado_anterior: number;
};
type Costo = {
  clave: string; fecha: string; codigo_pedido: string; cliente: string; producto: string;
  pedido_id: number; entrega_detalle_id: number; produccion_id?: number;
  compra_materia_prima_id?: number; nombre_lote?: string; material?: string; color?: string;
  cantidad_producto: number; unidad_producto: string; cantidad_materia_prima?: number;
  unidad?: string; precio_unitario?: number; moneda_codigo: string;
  monto: number | null; monto_origen?: number; motivo?: string;
};
type Gasto = { gasto_id: number; fecha: string; tipo_gasto: string; descripcion?: string; comprobante?: string; proveedor?: string; monto: number };
type Interes = { pago_id: number; prestamo_id: number; fecha: string; contraparte: string; observacion?: string; cuota_id?: number; monto: number };
type Deposito = { deposito_id: number; pedido_id: number; fecha: string; monto: number; numero_operacion?: string };
type Resumen = {
  ventas_cubiertas: number; ventas_credito: number; ventas: number; costo_ventas: number | null;
  costo_identificado: number; utilidad_bruta: number | null; gastos: number;
  utilidad_operacional: number | null; sunat: number; intereses: number;
  financieros_impuestos: number; utilidad_neta: number | null;
};
type Datos = {
  mes: string; moneda: string; completo: boolean; advertencias: string[]; resumen: Resumen;
  detalles: { ventas: Venta[]; costos: Costo[]; gastos: Gasto[]; sunat: Gasto[]; intereses: Interes[]; depositos: Deposito[] };
};
type Grupo = 'ventas' | 'cubiertas' | 'credito' | 'costos' | 'gastos' | 'sunat' | 'intereses';
type Linea = { clave: keyof Resumen; nombre: string; formula: string; grupos: Grupo[]; destacada?: boolean };
const lineas: Linea[] = [
  { clave: 'ventas_cubiertas', nombre: 'Ventas cubiertas al entregar', formula: 'Parte de las entregas del mes cubierta por depósitos a la fecha de entrega.', grupos: ['cubiertas'] },
  { clave: 'ventas_credito', nombre: 'Ventas a crédito al entregar', formula: 'Parte de las entregas del mes que quedó pendiente a la fecha de entrega.', grupos: ['credito'] },
  { clave: 'ventas', nombre: 'Ventas totales', formula: 'Ventas cubiertas al entregar + ventas a crédito al entregar.', grupos: ['ventas'], destacada: true },
  { clave: 'costo_ventas', nombre: '(−) Costo de ventas · materia prima', formula: 'Materia prima consumida por las producciones que abastecen las entregas del mes, al precio registrado de cada lote.', grupos: ['costos'] },
  { clave: 'utilidad_bruta', nombre: 'Utilidad bruta', formula: 'Ventas totales − costo de ventas de materia prima.', grupos: ['ventas', 'costos'], destacada: true },
  { clave: 'gastos', nombre: '(−) Gastos operativos', formula: 'Todos los gastos activos del mes, excepto el tipo SUNAT.', grupos: ['gastos'] },
  { clave: 'utilidad_operacional', nombre: 'Utilidad operacional', formula: 'Utilidad bruta − gastos operativos.', grupos: ['ventas', 'costos', 'gastos'], destacada: true },
  { clave: 'sunat', nombre: 'Impuesto a la renta · SUNAT', formula: 'Importes registrados en Gastos con tipo SUNAT, por fecha de gasto.', grupos: ['sunat'] },
  { clave: 'intereses', nombre: 'Intereses de préstamos recibidos', formula: 'Intereses pagados registrados en el mes. Excluye capital, cargos y pagos anulados.', grupos: ['intereses'] },
  { clave: 'financieros_impuestos', nombre: '(−) Gastos financieros e impuesto a la renta', formula: 'Gastos tipo SUNAT + intereses de préstamos recibidos.', grupos: ['sunat', 'intereses'], destacada: true },
  { clave: 'utilidad_neta', nombre: 'Utilidad neta', formula: 'Utilidad operacional − gastos financieros e impuesto a la renta.', grupos: ['ventas', 'costos', 'gastos', 'sunat', 'intereses'], destacada: true }
];
const etiquetas: Record<Grupo, string> = {
  ventas: 'Ventas', cubiertas: 'Ventas cubiertas', credito: 'Ventas a crédito',
  costos: 'Costo por lote', gastos: 'Gastos operativos', sunat: 'SUNAT', intereses: 'Intereses'
};
const fecha = (value: string) => value.slice(0, 10).split('-').reverse().join('/');
const cantidad = (value: number) => new Intl.NumberFormat('es-PE', { maximumFractionDigits: 6 }).format(value);
const origen = (ruta: string, texto: string) => <a href={`/gestion/${ruta}`} target="_blank" rel="noopener noreferrer">{texto}</a>;

export default function EerrMensual() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { token } = theme.useToken();
  const solicitado = searchParams.get('mes') ?? '';
  const mes = /^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(solicitado) && solicitado <= '9998-12'
    ? solicitado : obtenerMesActual();
  const moneda = searchParams.get('moneda') === 'USD' ? 'USD' : 'PEN';
  const [revision, setRevision] = useState(0);
  const [seleccion, setSeleccion] = useState<Linea | null>(null);
  const [respuesta, setRespuesta] = useState<{ clave: string; datos?: Datos; error?: string } | null>(null);
  const query = new URLSearchParams({ mes, moneda }).toString();
  const clave = `${query}|${revision}`;
  const cargando = respuesta?.clave !== clave;
  const datos = !cargando ? respuesta?.datos : undefined;
  const error = !cargando ? respuesta?.error : undefined;
  const dinero = (value: number | null | undefined, codigo = moneda) => value === null || value === undefined
    ? 'Por completar' : `${codigo === 'PEN' ? 'S/' : 'US$'} ${formatMonto(value)}`;

  useEffect(() => {
    const controller = new AbortController();
    apiFetch(`/eerr?${query}`, { signal: controller.signal }).then((data: Datos) => {
      if (!controller.signal.aborted) setRespuesta({ clave, datos: data });
    }).catch((err: unknown) => {
      if (!controller.signal.aborted) setRespuesta({ clave, error: err instanceof Error ? err.message : 'No se pudo cargar el EERR.' });
    });
    return () => controller.abort();
  }, [clave, query]);

  const filtrar = (nuevoMes: string, nuevaMoneda = moneda) => {
    setSeleccion(null);
    const siguientes = new URLSearchParams(searchParams);
    siguientes.set('mes', nuevoMes);
    siguientes.set('moneda', nuevaMoneda);
    siguientes.delete('vista');
    setSearchParams(siguientes);
  };
  const columnasVentas = (grupo: Grupo): TableColumnsType<Venta> => [
    { title: 'Entrega', key: 'entrega', width: 120, render: (_, row) => <Space orientation="vertical" size={0}><Text>{fecha(row.fecha)}</Text><Text type="secondary">#{row.entrega_id}</Text></Space> },
    { title: 'Pedido / cliente', key: 'pedido', width: 220, render: (_, row) => <Space orientation="vertical" size={0}>{origen(`pedidos/${row.pedido_id}`, row.codigo_pedido || `Pedido #${row.pedido_id}`)}<Text>{row.cliente}</Text></Space> },
    { title: 'Producto', dataIndex: 'producto', width: 220 },
    { title: 'Cantidad × precio actual', key: 'calculo', width: 200, render: (_, row) => `${cantidad(row.cantidad)} ${row.unidad} × ${cantidad(Number(row.precio_unitario))}` },
    { title: 'Importe incluido', key: 'monto', align: 'right', width: 160, render: (_, row) => <Text strong>{dinero(grupo === 'cubiertas' ? row.cubierto : grupo === 'credito' ? row.credito : row.monto)}</Text> },
    { title: 'Cubierto / crédito', key: 'cobertura', width: 190, render: (_, row) => <Space orientation="vertical" size={0}><Text>Cubierto: {dinero(row.cubierto)}</Text><Text type="secondary">Crédito: {dinero(row.credito)}</Text></Space> }
  ];
  const columnasCostos: TableColumnsType<Costo> = [
    { title: 'Entrega / pedido', key: 'pedido', width: 180, render: (_, row) => <Space orientation="vertical" size={0}><Text>{fecha(row.fecha)}</Text>{origen(`pedidos/${row.pedido_id}`, row.codigo_pedido || `Pedido #${row.pedido_id}`)}<Text type="secondary">Detalle #{row.entrega_detalle_id}</Text></Space> },
    { title: 'Producto entregado', key: 'producto', width: 210, render: (_, row) => <Space orientation="vertical" size={0}><Text>{row.producto}</Text><Text type="secondary">{cantidad(row.cantidad_producto)} {row.unidad_producto} de esta producción</Text></Space> },
    { title: 'Producción / lote', key: 'lote', width: 190, render: (_, row) => <Space orientation="vertical" size={0}>{row.produccion_id ? origen(`producciones/${row.produccion_id}`, `Producción #${row.produccion_id}`) : <Text type="secondary">Sin producción</Text>}{row.compra_materia_prima_id ? origen(`compras-materia-prima/${row.compra_materia_prima_id}`, row.nombre_lote || `Compra #${row.compra_materia_prima_id}`) : <Text type="secondary">Sin lote</Text>}</Space> },
    { title: 'Materia prima aplicada', key: 'material', width: 240, render: (_, row) => row.material ? <Space orientation="vertical" size={0}><Text>{row.material} · {row.color}</Text><Text type="secondary">{cantidad(row.cantidad_materia_prima ?? 0)} {row.unidad} × {cantidad(row.precio_unitario ?? 0)} {row.moneda_codigo}</Text></Space> : 'Sin trazabilidad' },
    { title: 'Costo incluido', key: 'monto', align: 'right', width: 190, render: (_, row) => <Space orientation="vertical" size={0}><Text strong type={row.monto === null ? 'warning' : undefined}>{dinero(row.monto)}</Text>{row.monto === null && row.monto_origen !== undefined && <Text type="secondary">Origen: {dinero(row.monto_origen, row.moneda_codigo)}</Text>}</Space> }
  ];
  const columnasGastos: TableColumnsType<Gasto> = [
    { title: 'Fecha', dataIndex: 'fecha', width: 115, render: fecha },
    { title: 'Registro', key: 'id', width: 100, render: (_, row) => `Gasto #${row.gasto_id}` },
    { title: 'Tipo / descripción', key: 'descripcion', width: 260, render: (_, row) => <Space orientation="vertical" size={0}><Text strong>{row.tipo_gasto}</Text><Text>{row.descripcion || 'Sin descripción'}</Text></Space> },
    { title: 'Proveedor', dataIndex: 'proveedor', render: (value?: string) => value || '—' },
    { title: 'Comprobante', dataIndex: 'comprobante', render: (value?: string) => value || '—' },
    { title: 'Importe incluido', dataIndex: 'monto', align: 'right', width: 165, render: value => dinero(value) }
  ];
  const columnasIntereses: TableColumnsType<Interes> = [
    { title: 'Fecha de pago', dataIndex: 'fecha', width: 130, render: fecha },
    { title: 'Préstamo / pago', key: 'prestamo', width: 180, render: (_, row) => <Space orientation="vertical" size={0}><Text>Préstamo #{row.prestamo_id}</Text><Text type="secondary">Pago #{row.pago_id}</Text></Space> },
    { title: 'Contraparte', dataIndex: 'contraparte', width: 200 },
    { title: 'Observación', dataIndex: 'observacion', render: (value?: string) => value || '—' },
    { title: 'Interés incluido', dataIndex: 'monto', align: 'right', width: 165, render: value => dinero(value) }
  ];

  const tablaGrupo = (grupo: Grupo) => {
    if (!datos) return null;
    if (['ventas', 'cubiertas', 'credito'].includes(grupo)) {
      const rows = datos.detalles.ventas.filter(row => grupo === 'ventas' || (grupo === 'cubiertas' ? row.cubierto > 0 : row.credito > 0));
      return <Table<Venta> size="small" rowKey="entrega_detalle_id" columns={columnasVentas(grupo)} dataSource={rows}
        scroll={{ x: 1100 }} pagination={{ pageSize: 10, showSizeChanger: false, showTotal: total => `${total} entrega(s)` }}
        expandable={{ expandedRowRender: row => {
          const pagos = datos.detalles.depositos.filter(pago => pago.pedido_id === row.pedido_id && pago.fecha <= row.fecha);
          return <div className="gd-eerr-expanded">
            <Descriptions size="small" column={{ xs: 1, md: 3 }} items={[
              { key: 'depositos', label: 'Depósitos hasta esta fecha', children: dinero(row.depositado_a_fecha) },
              { key: 'previo', label: 'Entregas anteriores del pedido', children: dinero(row.entregado_anterior) },
              { key: 'venta', label: 'Valor de esta entrega', children: dinero(row.monto) }
            ]} />
            <Paragraph type="secondary">Los depósitos cubren primero las entregas más antiguas del mismo pedido y moneda. Se consideran los pagos de la misma fecha de entrega. Los cobros posteriores no generan ventas nuevas.</Paragraph>
            <Table<Deposito> size="small" rowKey="deposito_id" pagination={{ pageSize: 5, showSizeChanger: false }} dataSource={pagos} columns={[
              { title: 'Depósito', dataIndex: 'deposito_id', render: value => `#${value}` },
              { title: 'Fecha', dataIndex: 'fecha', render: fecha },
              { title: 'Operación', dataIndex: 'numero_operacion', render: value => value || '—' },
              { title: 'Importe registrado', dataIndex: 'monto', align: 'right', render: value => dinero(value) }
            ]} />
          </div>;
        } }} />;
    }
    if (grupo === 'costos') return <>
      <Paragraph type="secondary">Las cantidades entregadas se distribuyen entre las producciones que ingresaron primero al almacén, por producto y presentación. Cada fila corresponde a un componente de materia prima; no se deben sumar las cantidades de producto repetidas entre componentes.</Paragraph>
      <Table<Costo> size="small" rowKey="clave" columns={columnasCostos} dataSource={datos.detalles.costos} scroll={{ x: 1100 }}
        pagination={{ pageSize: 10, showSizeChanger: false, showTotal: total => `${total} componente(s)` }}
        expandable={{ rowExpandable: row => Boolean(row.motivo), expandedRowRender: row => <Alert type="warning" title={row.motivo} /> }} />
    </>;
    if (grupo === 'intereses') return <Table<Interes> size="small" rowKey="pago_id" columns={columnasIntereses} dataSource={datos.detalles.intereses}
      scroll={{ x: 850 }} pagination={{ pageSize: 10, showSizeChanger: false }} />;
    return <Table<Gasto> size="small" rowKey="gasto_id" columns={columnasGastos} dataSource={datos.detalles[grupo === 'sunat' ? 'sunat' : 'gastos']}
      scroll={{ x: 900 }} pagination={{ pageSize: 10, showSizeChanger: false }} />;
  };

  const columnas: TableColumnsType<Linea> = [
    { title: 'Concepto', key: 'nombre', render: (_, linea) => <Button type="link" className={`gd-eerr-concepto${linea.destacada ? ' gd-eerr-destacado' : ''}`} onClick={() => setSeleccion(linea)}>{linea.nombre}</Button> },
    { title: `Importe · ${moneda}`, key: 'importe', align: 'right', width: 200, render: (_, linea) => {
      const value = datos?.resumen[linea.clave];
      return <Button type="link" onClick={() => setSeleccion(linea)} className={linea.destacada ? 'gd-eerr-destacado' : ''}>
        <Text strong={linea.destacada} type={value === null ? 'warning' : value !== undefined && value < 0 ? 'danger' : undefined}>{dinero(value)}</Text>
      </Button>;
    } },
    { title: '', key: 'detalle', width: 45, render: (_, linea) => <Button type="text" icon={<EyeOutlined />} aria-label={`Ver detalle de ${linea.nombre}`} onClick={() => setSeleccion(linea)} /> }
  ];

  return <div className="gd-eerr-page">
    <Card className="gd-eerr-filtros">
      <Space wrap>
        <Button icon={<LeftOutlined />} aria-label="Mes anterior" disabled={mes === '1000-01'} onClick={() => filtrar(dayjs(`${mes}-01`).subtract(1, 'month').format('YYYY-MM'))} />
        <DatePicker picker="month" allowClear={false} value={dayjs(`${mes}-01`)} locale={esES} format="MMMM YYYY" aria-label="Mes del EERR"
          minDate={dayjs('1000-01-01')} maxDate={dayjs('9998-12-31')} onChange={value => { if (value) filtrar(value.format('YYYY-MM')); }} />
        <Button icon={<RightOutlined />} aria-label="Mes siguiente" disabled={mes === '9998-12'} onClick={() => filtrar(dayjs(`${mes}-01`).add(1, 'month').format('YYYY-MM'))} />
        <Select aria-label="Moneda del EERR" value={moneda} onChange={value => filtrar(mes, value)} options={[{ value: 'PEN', label: 'Soles · PEN' }, { value: 'USD', label: 'Dólares · USD' }]} />
        <Button icon={<ReloadOutlined />} loading={cargando} onClick={() => { setSeleccion(null); setRevision(value => value + 1); }}>Actualizar</Button>
      </Space>
    </Card>
    <Alert className="gd-eerr-nota" type="info" showIcon title="Criterios del reporte"
      description="Ventas por fecha de entrega, con precios actuales. Los cobros posteriores no repiten ventas. Se usan los importes tal como fueron registrados, sin calcular ni descontar porcentajes de IGV o renta. SUNAT e intereses pagados se descuentan una sola vez en el bloque final. Cada moneda se consulta por separado." />
    {cargando ? <Card><Skeleton active paragraph={{ rows: 10 }} /></Card> : error ? <Alert type="error" showIcon title="No se pudo calcular el EERR" description={error} action={<Button onClick={() => setRevision(value => value + 1)}>Reintentar</Button>} /> : datos ? <>
      {!datos.completo && <Alert className="gd-eerr-nota" type="warning" showIcon title="Hay costos por completar"
        description={<><Paragraph>Las utilidades se mostrarán cuando todas las entregas tengan costo trazable en la moneda seleccionada. Costo identificado: {dinero(datos.resumen.costo_identificado)}.</Paragraph><ul>{datos.advertencias.map(aviso => <li key={aviso}>{aviso}</li>)}</ul></>} />}
      <Card title={<Space wrap><span>{dayjs(`${mes}-01`).locale('es').format('MMMM YYYY')}</span><Tag>{moneda}</Tag></Space>} extra={<Text type="secondary">Haz clic para ver el detalle</Text>}>
        <Table<Linea> rowKey="clave" columns={columnas} dataSource={lineas} pagination={false} size="middle" scroll={{ x: 650 }}
          onRow={linea => ({ style: linea.destacada ? { background: token.colorFillAlter } : undefined })} />
        {!datos.detalles.ventas.length && !datos.detalles.gastos.length && !datos.detalles.sunat.length && !datos.detalles.intereses.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay movimientos en este mes y moneda" />}
        <Paragraph className="gd-eerr-pie" type="secondary">El costo de ventas incluye únicamente materia prima. Las ediciones de pedidos recalculan los períodos anteriores. Los depósitos se aplican por orden de entrega del mismo pedido y moneda; la cobertura histórica se calcula hasta la fecha de cada entrega.</Paragraph>
      </Card>
    </> : null}
    <Drawer title={seleccion?.nombre} open={Boolean(seleccion && datos)} onClose={() => setSeleccion(null)} size="large" destroyOnHidden
      styles={{ wrapper: { width: 'min(1200px, 96vw)' } }}>
      {seleccion && datos && <>
        <Descriptions column={1} items={[
          { key: 'periodo', label: 'Período', children: `${mes} · ${moneda}` },
          { key: 'formula', label: 'Cálculo', children: seleccion.formula },
          { key: 'importe', label: 'Resultado', children: <Text strong>{dinero(datos.resumen[seleccion.clave])}</Text> }
        ]} />
        {seleccion.destacada && seleccion.grupos.length > 1 && <div className="gd-eerr-formula">
          <Space wrap>{seleccion.grupos.map(grupo => {
            const importe = grupo === 'costos' ? datos.resumen.costo_ventas : grupo === 'cubiertas' ? datos.resumen.ventas_cubiertas
              : grupo === 'credito' ? datos.resumen.ventas_credito : datos.resumen[grupo];
            return <Tag key={grupo}>{etiquetas[grupo]}: {dinero(importe)}</Tag>;
          })}</Space>
        </div>}
        <Tabs key={`${seleccion.clave}-${clave}`} items={seleccion.grupos.map(grupo => ({ key: grupo, label: etiquetas[grupo], children: tablaGrupo(grupo) }))} />
      </>}
    </Drawer>
  </div>;
}
