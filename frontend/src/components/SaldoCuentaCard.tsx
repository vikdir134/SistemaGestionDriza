import { Alert, Card, Col, Row, Space, Statistic, Typography, theme } from 'antd';
import { ArrowRightOutlined, WalletOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export type SaldoCuenta = {
  moneda_codigo: string;
  entradas: number;
  salidas: number;
  saldo: number;
};

type Props = {
  saldos: SaldoCuenta[] | null;
  loading: boolean;
};

export default function SaldoCuentaCard({ saldos, loading }: Props) {
  const { token } = theme.useToken();

  return (
    <Card
      className="gd-saldo-card"
      title={<Space><WalletOutlined />Saldo en cuenta</Space>}
      extra={<Link to="/gestion/flujo-caja" className="gd-gastos-mes-link" aria-label="Ver flujo de caja"><ArrowRightOutlined /></Link>}
      loading={loading}
    >
      {saldos === null ? (
        <Alert type="warning" showIcon title="No se pudo obtener el saldo. Pulsa Actualizar para reintentar." />
      ) : (
        <>
          <Row gutter={[24, 20]}>
            {(saldos.length ? saldos : [{ moneda_codigo: 'PEN', entradas: 0, salidas: 0, saldo: 0 }]).map((item) => (
              <Col key={item.moneda_codigo} xs={24} xxl={saldos.length > 1 ? 12 : 24}>
                <Statistic
                  title={item.moneda_codigo === 'PEN' ? 'Soles (PEN)' : item.moneda_codigo}
                  value={item.saldo}
                  precision={2}
                  prefix={item.moneda_codigo === 'PEN' ? 'S/' : item.moneda_codigo}
                  styles={{ content: { color: item.saldo < 0 ? token.colorErrorText : token.colorSuccessText, fontWeight: 700 } }}
                />
                <Space wrap size={[16, 4]}>
                  <Typography.Text type="secondary">Entradas: {item.entradas.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography.Text>
                  <Typography.Text type="secondary">Salidas: {item.salidas.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography.Text>
                </Space>
              </Col>
            ))}
          </Row>
          <Typography.Text type="secondary" className="gd-saldo-description">
            Saldo general acumulado desde cero. Compras y gastos descontados al registrarlos.
          </Typography.Text>
        </>
      )}
    </Card>
  );
}
