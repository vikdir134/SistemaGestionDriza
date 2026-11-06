import { lazy, Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, ConfigProvider, Skeleton, Tabs } from 'antd';
import { CalendarOutlined, LineChartOutlined } from '@ant-design/icons';
import PageHeader from '../components/ui/PageHeader';
import EerrMensual from '../components/eerr/EerrMensual';
import { useGestionDrizaTheme } from '../theme/GestionDrizaThemeProvider';
import '../styles/eerr.css';

const EerrAnual = lazy(() => import('../components/eerr/EerrAnual'));

export default function Eerr() {
  const [params, setParams] = useSearchParams();
  const { mode } = useGestionDrizaTheme();
  const oscuro = mode === 'dark';
  const acento = oscuro ? '#60a5fa' : '#2563eb';
  const vista = params.get('vista') === 'anual' ? 'anual' : 'mensual';
  const encabezado = useRef<HTMLDivElement>(null);
  useEffect(() => {
    encabezado.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [vista]);
  return <ConfigProvider theme={{ token: {
    colorPrimary: acento, colorPrimaryText: acento, colorLink: acento,
    colorLinkHover: oscuro ? '#93c5fd' : '#1d4ed8',
    colorSuccessText: oscuro ? '#4ade80' : '#15803d',
    colorWarningText: oscuro ? '#fbbf24' : '#b45309'
  } }}><div className="gd-eerr-page">
    <div ref={encabezado} className="gd-eerr-encabezado"><PageHeader title="Estado de resultados · EERR" description={vista === 'anual'
      ? 'Explora la evolución de tu negocio y conoce qué hay detrás de cada cifra.'
      : 'Consulta las entregas, costos y gastos de cada mes, con el detalle de cada importe.'} /></div>
    <Tabs className="gd-eerr-view-tabs" activeKey={vista} destroyOnHidden onChange={value => {
      const siguientes = new URLSearchParams(params);
      if (value === 'anual') siguientes.set('vista', 'anual');
      else siguientes.delete('vista');
      setParams(siguientes);
    }} items={[
      { key: 'mensual', label: <span><CalendarOutlined /> Mensual</span>, children: <EerrMensual /> },
      { key: 'anual', label: <span><LineChartOutlined /> Anual</span>, children: <Suspense fallback={<Card><Skeleton active paragraph={{ rows: 10 }} /></Card>}><EerrAnual /></Suspense> }
    ]} />
  </div></ConfigProvider>;
}
