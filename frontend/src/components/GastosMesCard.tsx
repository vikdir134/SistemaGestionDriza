import { Alert, Card, Col, Row, Space, Statistic, Typography, theme } from 'antd';
import { ArrowRightOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export type ResumenGastosMes = { moneda_codigo: string; cantidad: number; total: number };
type Props = { mes: string; resumen: ResumenGastosMes[] | null; loading: boolean };

export default function GastosMesCard({ mes, resumen, loading }: Props) {
  const { token } = theme.useToken();
  const nombreMes = new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${mes}-01T00:00:00Z`));
  const monedas = resumen?.filter(item => item.cantidad > 0) ?? [];
  const tituloMes = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
  const destino = `/gestion/gastos?mes=${mes}`;

  return (
      <Card loading={loading} className="gd-gastos-mes-card"
        title={<Space><CalendarOutlined />Gastos del mes</Space>}
        extra={<Link to={destino} className="gd-gastos-mes-link" aria-label={`Ver detalle de gastos de ${nombreMes}`}><ArrowRightOutlined /></Link>}>
        <Typography.Text type="secondary">{tituloMes}</Typography.Text>
        {resumen === null ? <Alert type="warning" showIcon title="No se pudieron cargar los gastos del mes." /> : <>
          <Row gutter={[24, 16]} className="gd-gastos-mes-totales">
            {(monedas.length ? monedas : [{ moneda_codigo: 'PEN', cantidad: 0, total: 0 }]).map(item => (
              <Col xs={24} sm={monedas.length > 1 ? 12 : 24} key={item.moneda_codigo}>
                <Statistic title={item.moneda_codigo === 'PEN' ? 'Total en soles' : 'Total en dólares'} value={item.total} precision={2}
                  prefix={item.moneda_codigo === 'PEN' ? 'S/' : 'US$'}
                  styles={{ content: { color: token.colorPrimary, fontWeight: 700 } }} />
                <Typography.Text type="secondary">{item.cantidad} gasto(s)</Typography.Text>
              </Col>
            ))}
          </Row>
          <div className="gd-saldo-description"><Link to={destino} className="gd-gastos-mes-link">Ver detalle del mes <ArrowRightOutlined /></Link></div>
        </>}
      </Card>
  );
}
