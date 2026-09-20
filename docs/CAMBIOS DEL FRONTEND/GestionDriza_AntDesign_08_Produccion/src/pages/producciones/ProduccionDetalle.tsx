import type {
  CollapseProps,
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Card,
  Col,
  Collapse,
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
  DatabaseOutlined,
  InboxOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
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
  formatPeso
} from '../../utils/formatters';

import '../../styles/produccionesAntd.css';


const {
  Text
} = Typography;


type ConsumoMateriaPrima = {
  movimiento_materia_prima_id:
    number;

  nombre_lote:
    string;

  fecha_compra:
    string;

  material:
    string;

  color:
    string;

  cantidad:
    number;
};


type IngresoProductoTerminado = {
  stock_actual:
    number;
};


type ProduccionDetalleItem = {
  produccion_detalle_id:
    number;

  tipo_producto:
    string;

  material:
    string;

  medida:
    string;

  color:
    string;

  composicion_version:
    number;

  cantidad_producida:
    number;

  unidad:
    string;

  cantidad_presentacion:
    number;

  unidad_presentacion:
    string;

  observacion?:
    string | null;

  consumos_materia_prima:
    ConsumoMateriaPrima[];

  ingreso_producto_terminado:
    IngresoProductoTerminado | null;
};


type Produccion = {
  produccion_id: number;
  fecha_produccion:
    string;

  observacion?:
    string | null;

  registrado_por:
    string;

  detalles:
    ProduccionDetalleItem[];
};


function ProduccionDetalle() {
  const {
    produccion_id
  } = useParams();

  const {
    message
  } = AntdApp.useApp();

  const [
    produccion,
    setProduccion
  ] = useState<
    Produccion | null
  >(null);

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
              `/producciones/${produccion_id}`
            );

          setProduccion(
            data.produccion
          );

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar la producción';

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
    produccion_id,
    message
  ]);


  const totalProducido =
    useMemo(
      () =>
        (
          produccion
            ?.detalles ||
          []
        ).reduce(
          (
            total,
            item
          ) =>
            total +
            Number(
              item
                .cantidad_producida ||
              0
            ),
          0
        ),
      [
        produccion
      ]
    );


  const fechaTexto = (
    valor?: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return valor.slice(
      0,
      10
    );
  };


  const fifoColumns:
    TableColumnsType<
      ConsumoMateriaPrima
    > = [
    {
      title: 'Lote',
      dataIndex:
        'nombre_lote',
      key:
        'nombre_lote',
      minWidth: 180,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title:
        'Fecha de compra',
      dataIndex:
        'fecha_compra',
      key:
        'fecha_compra',
      width: 145,

      render: (
        value: string
      ) =>
        fechaTexto(
          value
        )
    },

    {
      title: 'Material',
      dataIndex:
        'material',
      key:
        'material',
      width: 150
    },

    {
      title: 'Color',
      dataIndex:
        'color',
      key:
        'color',
      width: 130
    },

    {
      title: 'Consumido',
      dataIndex:
        'cantidad',
      key:
        'cantidad',
      width: 145,

      render: (
        value: number
      ) => (
        <Text
          type="danger"
          strong
        >
          -{
            formatPeso(
              value
            )
          } KG
        </Text>
      )
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-produccion-page">

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
    !produccion
  ) {
    return (
      <div className="gd-produccion-page">

        <BackButton
          to="/gestion/producciones"
          label="Volver a producción"
        />


        <Result
          status="error"
          title="No se pudo cargar la producción"
          subTitle={
            errorCarga ||
            'Producción no encontrada'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-produccion-page">

      <BackButton
        to="/gestion/producciones"
        label="Volver a producción"
      />


      <PageHeader
        title="Detalle de producción"
        description="Productos fabricados, ingreso a almacén y materia prima consumida."
      />


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-produccion-summary"
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >

          <Card
            className="gd-produccion-stat-card"
          >

            <Statistic
              title="Fecha"
              value={
                fechaTexto(
                  produccion
                    .fecha_produccion
                )
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

          <Card
            className="gd-produccion-stat-card"
          >

            <Statistic
              title="Productos"
              value={
                produccion
                  .detalles
                  .length
              }
              prefix={
                <InboxOutlined />
              }
            />

          </Card>

        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >

          <Card
            className="gd-produccion-stat-card"
          >

            <Statistic
              title="Total producido"
              value={
                Number(
                  totalProducido
                    .toFixed(2)
                )
              }
              precision={2}
              suffix="KG"
              prefix={
                <DatabaseOutlined />
              }
            />

          </Card>

        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >

          <Card
            className="gd-produccion-stat-card"
          >

            <Statistic
              title="Registrado por"
              value={
                produccion
                  .registrado_por
              }
              prefix={
                <UserOutlined />
              }
            />

          </Card>

        </Col>

      </Row>


      {
        produccion.observacion &&
        (
          <Alert
            type="info"
            showIcon
            message="Observación"
            description={
              produccion
                .observacion
            }
            className="gd-produccion-detail-alert"
          />
        )
      }


      <Space
        direction="vertical"
        size={18}
        className="gd-produccion-products-space"
      >

        {
          produccion
            .detalles
            .map(
              (
                item,
                index
              ) => {
                const presentaciones =
                  Number(
                    item
                      .cantidad_presentacion
                  ) > 0
                    ? (
                        Number(
                          item
                            .cantidad_producida
                        ) /
                        Number(
                          item
                            .cantidad_presentacion
                        )
                      )
                    : 0;


                const collapseItems:
                  CollapseProps['items'] =
                  [
                    {
                      key:
                        'fifo',

                      label:
                        `Consumo FIFO · ${item.consumos_materia_prima.length} movimiento(s)`,

                      children:
                        (
                          <Table<
                            ConsumoMateriaPrima
                          >
                            rowKey="movimiento_materia_prima_id"
                            columns={
                              fifoColumns
                            }
                            dataSource={
                              item
                                .consumos_materia_prima
                            }
                            pagination={
                              false
                            }
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
                                  description="No se encontraron movimientos FIFO"
                                />
                            }}
                          />
                        )
                    }
                  ];


                return (
                  <Card
                    key={
                      item
                        .produccion_detalle_id
                    }
                    title={
                      `Producto ${index + 1}`
                    }
                    extra={
                      <Tag
                        color="blue"
                      >
                        Composición V{
                          item
                            .composicion_version
                        }
                      </Tag>
                    }
                    className="gd-produccion-detail-product"
                  >

                    <Descriptions
                      column={{
                        xs: 1,
                        sm: 2,
                        lg: 4
                      }}
                      items={[
                        {
                          key:
                            'producto',

                          label:
                            'Producto',

                          span: 4,

                          children:
                            (
                              <Text
                                strong
                              >
                                {
                                  item
                                    .tipo_producto
                                }
                                {' · '}
                                {
                                  item
                                    .material
                                }
                                {' · '}
                                {
                                  item
                                    .medida
                                }
                                {' · '}
                                {
                                  item
                                    .color
                                }
                              </Text>
                            )
                        },

                        {
                          key:
                            'producido',

                          label:
                            'Producido',

                          children:
                            `${formatPeso(item.cantidad_producida)} ${item.unidad}`
                        },

                        {
                          key:
                            'presentacion',

                          label:
                            'Presentación',

                          children:
                            `${formatCantidad(item.cantidad_presentacion)} ${item.unidad_presentacion}`
                        },

                        {
                          key:
                            'presentaciones',

                          label:
                            'Presentaciones',

                          children:
                            formatCantidad(
                              presentaciones
                            )
                        },

                        {
                          key:
                            'stock',

                          label:
                            'Stock PT después',

                          children:
                            (
                              <Text
                                type="success"
                                strong
                              >
                                {
                                  formatPeso(
                                    item
                                      .ingreso_producto_terminado
                                      ?.stock_actual ||
                                    0
                                  )
                                } {
                                  item.unidad
                                }
                              </Text>
                            )
                        }
                      ]}
                    />


                    {
                      item.observacion &&
                      (
                        <Alert
                          type="info"
                          showIcon
                          message="Observación del producto"
                          description={
                            item.observacion
                          }
                          className="gd-produccion-product-note"
                        />
                      )
                    }


                    <Collapse
                      items={
                        collapseItems
                      }
                      className="gd-produccion-fifo-collapse"
                    />

                  </Card>
                );
              }
            )
        }

      </Space>

    </div>
  );
}


export default ProduccionDetalle;
