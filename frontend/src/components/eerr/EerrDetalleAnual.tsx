import { Avatar, Button, Descriptions, Drawer, Progress, Space, Table, Typography, Tag, theme } from 'antd';
import type { TableColumnsType } from 'antd';
import { formatMonto } from '../../utils/formatters';
import type { ClienteAnual, CuentaCobrar, DatosAnuales, PedidoAnual, SeleccionAnual, TipoDetalleAnual, VentaAnual } from './eerrAnual.types';

const { Text } = Typography;
const etiquetas: Record<TipoDetalleAnual, string> = { ventas: 'Ventas del año', cartera: 'Cuentas por cobrar', pedidos: 'Pedidos ingresados', clientes: 'Clientes atendidos', cliente: 'Ventas del cliente', otros: 'Otros clientes' };
const notas: Record<TipoDetalleAnual, string> = {
  ventas: 'Cada entrega se cuenta una sola vez en su fecha, con el precio actual del pedido. Cobrarla después no vuelve a generar ventas.',
  cartera: 'Saldo entregado pendiente de pago al corte. Incluye deuda de años anteriores; excluye anticipos sin entrega. Los pagos se aplican solo a su pedido y moneda.',
  pedidos: 'Pedidos ingresados durante el año hasta el corte, sin cancelados y con productos en la moneda seleccionada. Cada pedido cuenta una sola vez.',
  clientes: 'Clientes distintos con al menos una entrega durante el año. Un cliente atendido en varios meses cuenta una sola vez en el total anual.',
  cliente: 'Entregas de este cliente durante el año, en la moneda seleccionada.',
  otros: 'Clientes fuera de los cinco primeros. Su participación completa el total de ventas del gráfico.'
};
const fecha = (value: string) => value.slice(0, 10).split('-').reverse().join('/');
const cantidad = (value: number) => new Intl.NumberFormat('es-PE', { maximumFractionDigits: 4 }).format(value);
const origen = (ruta: string, texto: string) => <a href={`/gestion/${ruta}`} target="_blank" rel="noopener noreferrer">{texto}</a>;
type Props = { datos?: DatosAnuales; seleccion: SeleccionAnual | null; seleccionar: (value: SeleccionAnual | null) => void };

export default function EerrDetalleAnual({ datos, seleccion, seleccionar }: Props) {
  const { token } = theme.useToken();
  const dinero = (value: number) => `${datos?.moneda === 'USD' ? 'US$' : 'S/'} ${formatMonto(value)}`;
  const porcentaje = (importe: number) => datos && datos.indicadores.ventas > 0 ? importe / datos.indicadores.ventas * 100 : 0;
  const resultado = !datos || !seleccion ? '' : seleccion.tipo === 'cartera' ? dinero(datos.indicadores.cuentas_por_cobrar)
    : seleccion.tipo === 'pedidos' ? `${datos.indicadores.pedidos} pedidos`
    : seleccion.tipo === 'clientes' ? `${datos.indicadores.clientes} clientes`
    : seleccion.tipo === 'cliente' ? dinero(seleccion.cliente?.importe ?? 0)
    : seleccion.tipo === 'otros' ? dinero(datos.clientes.slice(5).reduce((total, cliente) => total + Math.round(cliente.importe * 100), 0) / 100)
    : dinero(datos.indicadores.ventas);
  const ventas: TableColumnsType<VentaAnual> = [
    { title: 'Entrega', dataIndex: 'fecha', width: 115, render: fecha },
    { title: 'Pedido / cliente', key: 'pedido', width: 230, render: (_, row) => <Space orientation="vertical" size={0}>{origen(`pedidos/${row.pedido_id}`, row.codigo_pedido || `Pedido #${row.pedido_id}`)}<Text>{row.cliente}</Text></Space> },
    { title: 'Producto', dataIndex: 'producto', width: 210 },
    { title: 'Cantidad × precio', key: 'cantidad', width: 180, render: (_, row) => `${cantidad(Number(row.cantidad))} ${row.unidad} × ${cantidad(Number(row.precio_unitario))}` },
    { title: 'Venta', dataIndex: 'monto', align: 'right', width: 160, render: dinero }
  ];
  const cartera: TableColumnsType<CuentaCobrar> = [
    { title: 'Pedido / cliente', key: 'pedido', width: 240, render: (_, row) => <Space orientation="vertical" size={0}>{origen(`depositos/${row.pedido_id}`, row.codigo_pedido || `Pedido #${row.pedido_id}`)}<Text>{row.cliente}</Text></Space> },
    { title: 'Última entrega', dataIndex: 'ultima_entrega', width: 135, render: fecha },
    { title: 'Entregado', dataIndex: 'entregado', align: 'right', width: 160, render: dinero },
    { title: 'Cobros aplicados', dataIndex: 'pagado', align: 'right', width: 160, render: dinero },
    { title: 'Saldo por cobrar', dataIndex: 'saldo', align: 'right', width: 170, render: value => <Text strong style={{ color: token.colorWarningText }}>{dinero(value)}</Text> }
  ];
  const pedidos: TableColumnsType<PedidoAnual> = [
    { title: 'Ingreso', dataIndex: 'fecha', width: 120, render: fecha },
    { title: 'Pedido', key: 'pedido', width: 170, render: (_, row) => origen(`pedidos/${row.pedido_id}`, row.codigo_pedido || `Pedido #${row.pedido_id}`) },
    { title: 'Cliente', dataIndex: 'cliente', width: 230 },
    { title: 'Estado', dataIndex: 'estado_pedido', width: 130, render: value => <Tag>{value}</Tag> },
    { title: 'Importe del pedido', dataIndex: 'monto', align: 'right', width: 170, render: value => dinero(Number(value)) }
  ];
  const clientes: TableColumnsType<ClienteAnual> = [
    { title: 'Cliente', key: 'cliente', render: (_, row) => <Space><Avatar style={{ background: token.colorPrimaryBg, color: token.colorPrimaryText }}>{row.cliente.slice(0, 1)}</Avatar><Space orientation="vertical" size={0}><Button type="link" className="gd-eerr-concepto" onClick={() => seleccionar({ tipo: 'cliente', cliente: row })}>{row.cliente}</Button><Text type="secondary">{row.ruc}</Text></Space></Space> },
    { title: 'Pedidos atendidos', dataIndex: 'pedidos', align: 'right', width: 150 },
    { title: 'Participación', key: 'participacion', width: 160, render: (_, row) => <Progress percent={Number(porcentaje(row.importe).toFixed(1))} strokeColor={token.colorPrimaryText} size="small" /> },
    { title: 'Ventas del año', dataIndex: 'importe', align: 'right', width: 170, render: dinero }
  ];
  const tabla = () => {
    if (!datos || !seleccion) return null;
    const pagination = { pageSize: 10, showSizeChanger: false, showTotal: (total: number) => `${total} registro(s)` };
    if (seleccion.tipo === 'cartera') return <Table<CuentaCobrar> key="cartera" rowKey="pedido_id" columns={cartera} dataSource={datos.detalles.cartera} pagination={pagination} scroll={{ x: 1000 }} />;
    if (seleccion.tipo === 'pedidos') return <Table<PedidoAnual> key="pedidos" rowKey="pedido_id" columns={pedidos} dataSource={datos.detalles.pedidos} pagination={pagination} scroll={{ x: 900 }} />;
    if (seleccion.tipo === 'clientes' || seleccion.tipo === 'otros') return <Table<ClienteAnual> key={seleccion.tipo} rowKey="cliente_id" columns={clientes} dataSource={seleccion.tipo === 'otros' ? datos.clientes.slice(5) : datos.clientes} pagination={pagination} scroll={{ x: 800 }} />;
    return <Table<VentaAnual> key={`ventas-${seleccion.cliente?.cliente_id ?? 'todos'}`} rowKey="entrega_detalle_id" columns={ventas} dataSource={seleccion.tipo === 'cliente'
      ? datos.detalles.ventas.filter(venta => venta.cliente_id === seleccion.cliente?.cliente_id) : datos.detalles.ventas} pagination={pagination} scroll={{ x: 1000 }} />;
  };
  return <Drawer title={seleccion?.tipo === 'cliente' ? seleccion.cliente?.cliente : seleccion ? etiquetas[seleccion.tipo] : ''}
    open={Boolean(seleccion && datos)} onClose={() => seleccionar(null)} destroyOnHidden size="large" styles={{ wrapper: { width: 'min(1150px, 96vw)' } }}>
    {datos && seleccion && <><Descriptions column={1} items={[
      { key: 'periodo', label: 'Período', children: `${datos.anio} · ${datos.moneda} · corte ${fecha(datos.corte)}` },
      { key: 'criterio', label: 'Incluye', children: notas[seleccion.tipo] },
      { key: 'resultado', label: 'Total', children: <Text strong>{resultado}</Text> }
    ]} /><div className="gd-eerr-formula">{tabla()}</div></>}
  </Drawer>;
}
