import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Result,
  Row,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  CalendarOutlined,
  EditOutlined,
  ShopOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatCantidad,
  formatMonto
} from '../../utils/formatters';

import '../../styles/pedidosAntd.css';


const {
  Text
} = Typography;


const pedidoEstadoTag = (
  estado: string
) => {
  if (
    estado === 'ENTREGADO'
  ) {
    return (
      <Tag color="success">
        Entregado
      </Tag>
    );
  }

  if (
    estado === 'PARCIAL'
  ) {
    return (
      <Tag color="warning">
        Parcial
      </Tag>
    );
  }

  if (
    estado === 'CANCELADO'
  ) {
    return (
      <Tag color="error">
        Cancelado
      </Tag>
    );
  }

  return (
    <Tag color="processing">
      Registrado
    </Tag>
  );
};


const entregaTag = (
  estado: string
) => {
  if (
    estado === 'COMPLETO'
  ) {
    return (
      <Tag color="success">
        Completo
      </Tag>
    );
  }

  if (
    estado === 'PARCIAL'
  ) {
    return (
      <Tag color="warning">
        Parcial
      </Tag>
    );
  }

  return (
    <Tag>
      Pendiente
    </Tag>
  );
};


function PedidoDetalle() {
  const {
    pedido_id
  } = useParams();

  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    pedido,
    setPedido
  ] = useState<any | null>(
    null
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          const data =
            await apiFetch(
              `/pedidos/${pedido_id}`
            );

          setPedido(
            data.pedido
          );

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el pedido';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    pedido_id,
    message
  ]);


  const totales =
    useMemo(
      () => {
        const mapa =
          new Map<
            string,
            number
          >();

        for (
          const detalle
          of pedido?.detalles ||
          []
        ) {
          const moneda =
            detalle
              .moneda_codigo;

          mapa.set(
            moneda,
            (
              mapa.get(
                moneda
              ) || 0
            ) +
            Number(
              detalle.subtotal ||
              0
            )
          );
        }

        return Array.from(
          mapa.entries()
        ).map(
          ([
            moneda,
            total
          ]) => ({
            moneda,
            total
          })
        );
      },
      [
        pedido
      ]
    );


  const editable =
    pedido &&
    (
      pedido.estado_pedido ===
        'REGISTRADO' ||
      pedido.estado_pedido ===
        'PARCIAL'
    );


  const productosColumns:
    TableColumnsType<any> = [
    {
      title: 'Producto',
      key: 'producto',
      minWidth: 230,

      render: (
        _,
        detalle
      ) => (
        <div className="gd-pedido-product-cell">

          <Text strong>
            {
              detalle
                .tipo_producto
            }
            {' · '}
            {
              detalle.material
            }
            {' · '}
            {
              detalle.medida
            }
            {' · '}
            {
              detalle.color
            }
          </Text>

          <Text
            type="secondary"
          >
            {
              detalle
                .descripcion_item ||
              '-'
            }
          </Text>

        </div>
      )
    },

    {
      title: 'Pedido',
      key: 'pedido',
      width: 145,

      render: (
        _,
        detalle
      ) =>
        `${formatCantidad(detalle.cantidad_pedida)} ${detalle.unidad}`
    },

    {
      title: 'Entregado',
      key: 'entregado',
      width: 145,

      render: (
        _,
        detalle
      ) =>
        `${formatCantidad(detalle.cantidad_entregada)} ${detalle.unidad}`
    },

    {
      title: 'Pendiente',
      key: 'pendiente',
      width: 145,

      render: (
        _,
        detalle
      ) =>
        `${formatCantidad(detalle.cantidad_pendiente)} ${detalle.unidad}`
    },

    {
      title: 'Presentación',
      key: 'presentacion',
      width: 155,

      render: (
        _,
        detalle
      ) =>
        detalle
          .cantidad_presentacion
          ? `${formatCantidad(detalle.cantidad_presentacion)} ${detalle.unidad_presentacion || ''}`
          : '-'
    },

    {
      title: 'Precio',
      key: 'precio',
      width: 145,

      render: (
        _,
        detalle
      ) =>
        `${formatMonto(detalle.precio_unitario)} ${detalle.moneda_codigo}`
    },

    {
      title: 'Subtotal',
      key: 'subtotal',
      width: 150,

      render: (
        _,
        detalle
      ) => (
        <Text strong>
          {
            formatMonto(
              detalle.subtotal
            )
          } {
            detalle
              .moneda_codigo
          }
        </Text>
      )
    },

    {
      title: 'Estado',
      dataIndex:
        'estado_entrega',
      key:
        'estado_entrega',
      width: 120,

      render: (
        value: string
      ) =>
        entregaTag(
          value
        )
    }
  ];


  const historialColumns:
    TableColumnsType<any> = [
    {
      title: 'Tipo',
      dataIndex:
        'tipo_cambio',
      key:
        'tipo_cambio',
      width: 160,

      render: (
        value: string
      ) => (
        <Tag>
          {
            String(
              value ||
              ''
            ).replace(
              /_/g,
              ' '
            )
          }
        </Tag>
      )
    },

    {
      title: 'Motivo',
      dataIndex:
        'descripcion_motivo',
      key:
        'descripcion_motivo',
      minWidth: 250
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      width: 180,
      responsive: [
        'md'
      ]
    },

    {
      title: 'Fecha',
      dataIndex:
        'created_at',
      key:
        'created_at',
      width: 125,

      render: (
        value?: string | null
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-pedido-page">

        <Skeleton
          active
          paragraph={{
            rows: 12
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !pedido
  ) {
    return (
      <div className="gd-pedido-page">

        <BackButton
          to="/gestion/pedidos"
          label="Volver a pedidos"
        />


        <Result
          status="error"
          title="No se pudo cargar el pedido"
          subTitle={
            errorCarga ||
            'Pedido no encontrado'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-pedido-page">

      <BackButton
        to="/gestion/pedidos"
        label="Volver a pedidos"
      />


      <PageHeader
        title={
          pedido.codigo_pedido
            ? `Pedido ${pedido.codigo_pedido}`
            : 'Detalle del pedido'
        }
        description={
          `${pedido.razon_social} · ${pedido.ruc}`
        }
        extra={
          <Space
            wrap
          >
            {
              pedidoEstadoTag(
                pedido.estado_pedido
              )
            }

            {
              editable &&
              (
                <Button
                  type="primary"
                  icon={
                    <EditOutlined />
                  }
                  onClick={() =>
                    navigate(
                      `/gestion/pedidos/${pedido.pedido_id}/editar`
                    )
                  }
                >
                  Editar pedido
                </Button>
              )
            }
          </Space>
        }
      />


      {
        !editable &&
        (
          <Alert
            showIcon
            type={
              pedido
                .estado_pedido ===
                'ENTREGADO'
                ? 'success'
                : 'warning'
            }
            message={
              pedido
                .estado_pedido ===
                'ENTREGADO'
                ? 'Pedido completamente entregado'
                : 'Pedido cancelado'
            }
            description={
              'Este pedido ya no puede modificarse.'
            }
            className="gd-pedido-detail-alert"
          />
        )
      }


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-pedido-summary"
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Cliente"
              value={
                pedido
                  .razon_social
              }
              prefix={
                <ShopOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Fecha pedido"
              value={
                pedido
                  .fecha_pedido
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
              }
              prefix={
                <CalendarOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Entrega estimada"
              value={
                pedido
                  .fecha_entrega_estimada
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
              }
              prefix={
                <CalendarOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Registrado por"
              value={
                pedido
                  .registrado_por
              }
              prefix={
                <UserOutlined />
              }
            />
          </Card>
        </Col>

      </Row>


      <Card
        title="Datos del pedido"
        className="gd-pedido-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 3
          }}
          items={[
            {
              key: 'codigo',
              label: 'Código',
              children:
                pedido
                  .codigo_pedido ||
                '-'
            },

            {
              key: 'direccion',
              label: 'Dirección cliente',
              children:
                pedido.direccion ||
                '-'
            },

            {
              key: 'agencia',
              label: 'Agencia de entrega',
              children:
                pedido
                  .agencia_entrega ||
                '-'
            },

            {
              key: 'descripcion',
              label: 'Descripción',
              span: 3,
              children:
                pedido
                  .descripcion_pedido ||
                'Sin descripción'
            }
          ]}
        />

      </Card>


      <Card
        title="Totales por moneda"
        className="gd-pedido-section-card"
      >

        <Space
          size={[
            12,
            12
          ]}
          wrap
        >
          {
            totales.map(
              (item) => (
                <Card
                  size="small"
                  key={
                    item.moneda
                  }
                  className="gd-pedido-total-card"
                >
                  <Statistic
                    title={
                      item.moneda ===
                        'PEN'
                        ? 'Soles'
                        : 'Dólares'
                    }
                    value={
                      Number(
                        item.total
                      )
                    }
                    precision={2}
                    suffix={
                      item.moneda
                    }
                  />
                </Card>
              )
            )
          }
        </Space>

      </Card>


      <Card
        title="Productos del pedido"
        extra={
          <Text
            type="secondary"
          >
            {
              pedido
                .detalles
                .length
            } producto(s)
          </Text>
        }
        className="gd-pedido-section-card"
      >

        <Table
          rowKey="pedido_detalle_id"
          columns={
            productosColumns
          }
          dataSource={
            pedido.detalles
          }
          pagination={false}
          scroll={{
            x: 1100
          }}
        />

      </Card>


      <Card
        title="Historial de cambios"
        className="gd-pedido-section-card"
      >

        <Table
          rowKey="pedido_cambio_id"
          columns={
            historialColumns
          }
          dataSource={
            pedido
              .historial_cambios ||
            []
          }
          pagination={false}
          scroll={{
            x: 720
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay cambios registrados"
              />
          }}
        />

      </Card>

    </div>
  );
}


export default PedidoDetalle;
