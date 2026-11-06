import { useEffect, useState } from 'react';
import { Alert, Card, Col, Row, Space, Statistic, Typography, theme } from 'antd';
import { ArrowRightOutlined, LineChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { apiFetch } from '../services/api';

type Resultado = { moneda: string; utilidad: number | null; error: boolean; visible: boolean };
type Props = { mes: string; revision: number };

export default function EerrMesCard({ mes, revision }: Props) {
  const { token } = theme.useToken();
  const [respuesta, setRespuesta] = useState<{ clave: string; resultados: Resultado[] } | null>(null);
  const clave = `${mes}|${revision}`;
  const loading = respuesta?.clave !== clave;
  const nombreMes = new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${mes}-01T00:00:00Z`));
  const destino = `/gestion/eerr?mes=${mes}&moneda=PEN`;

  useEffect(() => {
    const controller = new AbortController();
    const monedas = ['PEN', 'USD'];
    Promise.allSettled(monedas.map(moneda => apiFetch(`/eerr?mes=${mes}&moneda=${moneda}`, { signal: controller.signal })))
      .then(resultados => {
        if (controller.signal.aborted) return;
        setRespuesta({ clave, resultados: resultados.map((resultado, index) => {
          const utilidad: unknown = resultado.status === 'fulfilled' ? resultado.value?.resumen?.utilidad_neta : undefined;
          const error = resultado.status === 'rejected' || (utilidad !== null && (typeof utilidad !== 'number' || !Number.isFinite(utilidad)));
          // Una utilidad de cero también puede tener ventas y gastos que se compensan.
          const detalles = resultado.status === 'fulfilled' ? resultado.value?.detalles : undefined;
          const conActividad = ['ventas', 'costos', 'gastos', 'sunat', 'intereses']
            .some(grupo => Array.isArray(detalles?.[grupo]) && detalles[grupo].length > 0);
          return {
            moneda: monedas[index],
            utilidad: typeof utilidad === 'number' && Number.isFinite(utilidad) ? utilidad : null,
            error,
            visible: monedas[index] === 'PEN' || error || conActividad || utilidad === null || utilidad !== 0
          };
        }) });
      });
    return () => controller.abort();
  }, [clave, mes]);

  const resultadosVisibles = respuesta?.resultados.filter(item => item.visible) ?? [];

  return <Card loading={loading} className="gd-eerr-mes-card"
    title={<Space><LineChartOutlined />EERR del mes</Space>}
    extra={<Link to={destino} className="gd-gastos-mes-link" aria-label={`Ver EERR de ${nombreMes}`}><ArrowRightOutlined /></Link>}>
    <Typography.Text type="secondary">{nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)}</Typography.Text>
    <Row gutter={[24, 16]} className="gd-gastos-mes-totales">
      {!loading && resultadosVisibles.map(item => <Col xs={24} xxl={resultadosVisibles.length > 1 ? 12 : 24} key={item.moneda}>
        {item.error ? <Alert type="warning" showIcon title={`No se pudo cargar el EERR en ${item.moneda}. Pulsa Actualizar para reintentar.`} />
          : item.utilidad === null ? <Space orientation="vertical" size={4}>
            <Typography.Text type="secondary">Utilidad neta · {item.moneda}</Typography.Text>
            <Typography.Text type="warning" strong>Por completar</Typography.Text>
            <Typography.Text type="secondary">Revisa los costos pendientes en el EERR.</Typography.Text>
          </Space> : <Statistic title={`Utilidad neta · ${item.moneda}`} value={item.utilidad} precision={2}
            prefix={item.moneda === 'PEN' ? 'S/' : 'US$'}
            styles={{ content: { color: item.utilidad < 0 ? token.colorErrorText : item.utilidad > 0 ? token.colorSuccessText : token.colorText, fontWeight: 700 } }} />}
        <Link to={`/gestion/eerr?mes=${mes}&moneda=${item.moneda}`} className="gd-gastos-mes-link gd-eerr-moneda-link"
          aria-label={`Ver detalle del EERR de ${nombreMes} en ${item.moneda}`}>Ver {item.moneda} <ArrowRightOutlined /></Link>
      </Col>)}
    </Row>
    <Typography.Text type="secondary" className="gd-saldo-description">Resultado después de costos, gastos, SUNAT e intereses.</Typography.Text>
  </Card>;
}
