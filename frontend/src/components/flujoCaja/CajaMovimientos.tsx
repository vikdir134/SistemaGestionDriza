import { Button, Empty, Space, Table, Tag, Typography, theme } from 'antd';
import type { TableColumnsType } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { formatMonto } from '../../utils/formatters';
import type { MovimientoCaja } from './flujoCaja.types';

const { Text } = Typography;
export default function CajaMovimientos({ rows, moneda, compacto = false }: { rows: MovimientoCaja[]; moneda: string; compacto?: boolean }) {
  const { token } = theme.useToken();
  const dinero = (valor: number) => `${moneda === 'PEN' ? 'S/' : 'US$'} ${formatMonto(valor)}`;
  const columnas: TableColumnsType<MovimientoCaja> = [
    { title: 'Fecha', dataIndex: 'fecha', width: 115, render: (value: string) => value.split('-').reverse().join('/') },
    { title: 'Concepto / referencia', key: 'concepto', width: 270, render: (_, row) => <Space orientation="vertical" size={0}><Text strong>{row.concepto}</Text><Text type="secondary">{row.referencia || row.descripcion || row.clave}</Text></Space> },
    { title: 'Cliente / contraparte', dataIndex: 'tercero', width: 200, render: (value?: string) => value || '—' },
    { title: 'Entrada', key: 'entrada', align: 'right', width: 155, render: (_, row) => row.sentido === 'ENTRADA' ? <Text style={{ color: token.colorSuccessText }}>{dinero(row.monto)}</Text> : '—' },
    { title: 'Salida', key: 'salida', align: 'right', width: 155, render: (_, row) => row.sentido === 'SALIDA' ? <Text style={{ color: token.colorWarningText }}>{dinero(row.monto)}</Text> : '—' },
    { title: 'Saldo acumulado', dataIndex: 'saldo', align: 'right', width: 165, render: value => <Text strong type={value < 0 ? 'danger' : undefined}>{dinero(value)}</Text> },
    { title: '', key: 'origen', width: 50, render: (_, row) => row.ruta?.startsWith('/gestion/') ? <Button type="text" href={row.ruta} target="_blank" rel="noopener noreferrer" icon={<ExportOutlined />} aria-label={`Abrir origen de ${row.clave}`} /> : null }
  ];
  return <Table<MovimientoCaja> rowKey="clave" columns={columnas} dataSource={rows} size={compacto ? 'small' : 'middle'} scroll={{ x: 1100 }}
    pagination={{ pageSize: 10, showSizeChanger: false, showTotal: total => `${total} movimiento(s)` }}
    locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay movimientos para mostrar" /> }}
    expandable={{ expandedRowRender: row => <Space wrap><Tag>{row.clave}</Tag><Text>{row.descripcion || 'Sin descripción adicional'}</Text><Text type="secondary">El saldo acumulado incluye todos los movimientos previos, aunque el detalle esté filtrado.</Text></Space> }} />;
}
