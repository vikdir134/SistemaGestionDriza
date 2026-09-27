import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
  theme
} from 'antd';

import {
  BuildOutlined,
  DatabaseOutlined,
  InboxOutlined,
  ProductOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch,
  getUsuario
} from '../services/api';

import PageHeader
  from '../components/ui/PageHeader';

import MetricCard
  from '../components/ui/MetricCard';

import '../styles/dashboard.css';


const {
  Text,
  Title
} = Typography;


type DashboardData = {
  stockMateriaPrimaKg: number;
  lotesRegistrados: number;
  stockProductoTerminadoKg: number;
  pedidosPendientes: number;
};


const dashboardInicial:
  DashboardData = {
  stockMateriaPrimaKg: 0,
  lotesRegistrados: 0,
  stockProductoTerminadoKg: 0,
  pedidosPendientes: 0
};


function Dashboard() {
  const navigate =
    useNavigate();

  const {
    token
  } = theme.useToken();

  const usuario =
    getUsuario();

  const [
    datos,
    setDatos
  ] = useState<DashboardData>(
    dashboardInicial
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    advertencia,
    setAdvertencia
  ] = useState('');


  const cargarDashboard =
    useCallback(
      async () => {
        setCargando(true);
        setAdvertencia('');

        const resultados =
          await Promise.allSettled([
            apiFetch(
              '/almacen-materia-prima/indicadores'
            ),

            apiFetch(
              '/almacen-producto-terminado/indicadores'
            ),

            apiFetch(
              '/entregas/pedidos?page=1&limit=1'
            )
          ]);


        const [
          mpResult,
          ptResult,
          pedidosResult
        ] = resultados;


        const siguiente:
          DashboardData = {
          ...dashboardInicial
        };


        let fallos = 0;


        if (
          mpResult.status ===
          'fulfilled'
        ) {
          const indicadores =
            mpResult.value
              ?.indicadores ||
            {};

          siguiente
            .stockMateriaPrimaKg =
            Number(
              indicadores
                .stock_total_kg ||
              0
            );

          siguiente
            .lotesRegistrados =
            Number(
              indicadores
                .lotes_registrados ||
              0
            );

        } else {
          fallos++;
        }


        if (
          ptResult.status ===
          'fulfilled'
        ) {
          const indicadores =
            ptResult.value
              ?.indicadores ||
            {};

          siguiente
            .stockProductoTerminadoKg =
            Number(
              indicadores
                .stock_disponible_kg ||
              0
            );

        } else {
          fallos++;
        }


        if (
          pedidosResult.status ===
          'fulfilled'
        ) {
          siguiente
            .pedidosPendientes =
            Number(
              pedidosResult.value
                ?.paginacion
                ?.total ||
              0
            );

        } else {
          fallos++;
        }


        setDatos(
          siguiente
        );


        if (
          fallos > 0
        ) {
          setAdvertencia(
            fallos === resultados.length
              ? 'No fue posible cargar los indicadores operativos.'
              : 'Algunos indicadores no pudieron actualizarse. Los demás datos se muestran normalmente.'
          );
        }


        setCargando(false);
      },
      []
    );


  useEffect(() => {
    cargarDashboard();
  }, [
    cargarDashboard
  ]);


  const primerNombre =
    useMemo(
      () => {
        const nombre =
          usuario
            ?.nombre_completo
            ?.trim();

        if (!nombre) {
          return 'Usuario';
        }

        return nombre
          .split(/\s+/)[0];
      },
      [
        usuario
      ]
    );


  const roles =
    usuario
      ?.roles ||
    [];


  const accesos = [
    {
      key: 'pedido',
      title:
        'Registrar pedido',
      description:
        'Crea un nuevo pedido para un cliente.',
      icon:
        <ShoppingCartOutlined />,
      path:
        '/gestion/pedidos/registrar',
      tone:
        token.colorPrimary,
      background:
        token.colorPrimaryBg
    },

    {
      key: 'produccion',
      title:
        'Registrar producción',
      description:
        'Registra producto fabricado y consumo de materia prima.',
      icon:
        <BuildOutlined />,
      path:
        '/gestion/producciones/registrar',
      tone:
        token.colorSuccess,
      background:
        token.colorSuccessBg
    },

    {
      key: 'compra-mp',
      title:
        'Registrar lote',
      description:
        'Ingresa una nueva compra de materia prima.',
      icon:
        <DatabaseOutlined />,
      path:
        '/gestion/compras-materia-prima/registrar',
      tone:
        token.colorWarning,
      background:
        token.colorWarningBg
    },

    {
      key: 'entregas',
      title:
        'Ver entregas',
      description:
        'Consulta pedidos pendientes y registra entregas.',
      icon:
        <TruckOutlined />,
      path:
        '/gestion/entregas',
      tone:
        token.colorInfo,
      background:
        token.colorInfoBg
    }
  ];


  return (
    <div className="gd-dashboard">

      <PageHeader
        title={
          `Hola, ${primerNombre}`
        }
        description={
          'Aquí tienes un resumen general de la operación de GestionDriza.'
        }
        extra={
          <Button
            icon={
              <ReloadOutlined />
            }
            loading={
              cargando
            }
            onClick={
              cargarDashboard
            }
          >
            Actualizar
          </Button>
        }
      />


      {advertencia && (
        <Alert
          showIcon
          type="warning"
          message={
            advertencia
          }
          closable
          onClose={() =>
            setAdvertencia('')
          }
          className="gd-dashboard-alert"
        />
      )}


      <Row
        gutter={[
          16,
          16
        ]}
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Stock materia prima"
            value={
              datos
                .stockMateriaPrimaKg
            }
            precision={2}
            suffix="KG"
            icon={
              <DatabaseOutlined />
            }
            tone="primary"
            loading={
              cargando
            }
          />
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Stock producto terminado"
            value={
              datos
                .stockProductoTerminadoKg
            }
            precision={2}
            suffix="KG"
            icon={
              <ProductOutlined />
            }
            tone="success"
            loading={
              cargando
            }
          />
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Pedidos por entregar"
            value={
              datos
                .pedidosPendientes
            }
            icon={
              <TruckOutlined />
            }
            tone="warning"
            loading={
              cargando
            }
          />
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Lotes registrados"
            value={
              datos
                .lotesRegistrados
            }
            icon={
              <InboxOutlined />
            }
            tone="primary"
            loading={
              cargando
            }
          />
        </Col>

      </Row>


      <Row
        gutter={[
          18,
          18
        ]}
        className="gd-dashboard-secondary"
      >

        <Col
          xs={24}
          xl={16}
        >

          <Card
            title="Accesos rápidos"
            className="gd-dashboard-card"
          >

            <Row
              gutter={[
                14,
                14
              ]}
            >
              {
                accesos.map(
                  (item) => (
                    <Col
                      key={
                        item.key
                      }
                      xs={24}
                      sm={12}
                    >

                      <Card
                        size="small"
                        hoverable
                        className="gd-quick-card"
                        onClick={() =>
                          navigate(
                            item.path
                          )
                        }
                      >

                        <Space
                          align="start"
                          size={12}
                        >

                          <Avatar
                            size={42}
                            shape="square"
                            icon={
                              item.icon
                            }
                            style={{
                              color:
                                item.tone,
                              background:
                                item.background
                            }}
                          />


                          <div className="gd-quick-card-copy">

                            <Text strong>
                              {
                                item.title
                              }
                            </Text>

                            <Text
                              type="secondary"
                              className="gd-quick-card-description"
                            >
                              {
                                item.description
                              }
                            </Text>

                          </div>

                        </Space>

                      </Card>

                    </Col>
                  )
                )
              }
            </Row>

          </Card>

        </Col>


        <Col
          xs={24}
          xl={8}
        >

          <Card
            title="Tu sesión"
            className="gd-dashboard-card gd-session-card"
          >

            {
              cargando &&
              !usuario
                ? (
                  <Skeleton
                    active
                    avatar
                    paragraph={{
                      rows: 3
                    }}
                  />
                )
                : (
                  <div className="gd-session-content">

                    <Avatar
                      size={64}
                      icon={
                        <UserOutlined />
                      }
                      style={{
                        background:
                          token
                            .colorPrimaryBg,
                        color:
                          token
                            .colorPrimary
                      }}
                    />


                    <div className="gd-session-user">

                      <Title
                        level={4}
                        className="gd-session-name"
                      >
                        {
                          usuario
                            ?.nombre_completo ||
                          'Usuario'
                        }
                      </Title>

                      <Text
                        type="secondary"
                      >
                        {
                          usuario
                            ?.correo ||
                          '-'
                        }
                      </Text>

                    </div>


                    <Space
                      wrap
                      size={[
                        6,
                        6
                      ]}
                    >
                      {
                        roles.length > 0
                          ? roles.map(
                              (
                                rol: string
                              ) => (
                                <Tag
                                  key={
                                    rol
                                  }
                                  color="blue"
                                  icon={
                                    <SafetyCertificateOutlined />
                                  }
                                >
                                  {rol}
                                </Tag>
                              )
                            )
                          : (
                            <Tag>
                              Usuario
                            </Tag>
                          )
                      }
                    </Space>

                  </div>
                )
            }

          </Card>

        </Col>

      </Row>

    </div>
  );
}


export default Dashboard;
