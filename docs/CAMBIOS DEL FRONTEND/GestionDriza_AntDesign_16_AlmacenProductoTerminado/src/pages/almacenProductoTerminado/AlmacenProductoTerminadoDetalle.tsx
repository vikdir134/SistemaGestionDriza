import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Result,
  Row,
  Select,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  EyeOutlined,
  InboxOutlined,
  ProductOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
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
  formatCantidad
} from '../../utils/formatters';

import '../../styles/almacenProductoTerminadoAntd.css';


const {
  Text
} = Typography;


type Presentacion = {
  stock_producto_terminado_id:
    number;

  producto_id: number;

  tipo_producto_id: number;
  tipo_producto: string;

  material_id: number;
  material: string;

  medida_id: number;
  medida: string;

  color_id: number;
  color: string;

  descripcion_producto?:
    string | null;

  unidad_medida_id:
    number;
  unidad: string;

  cantidad_presentacion:
    number;

  unidad_presentacion_id:
    number;

  unidad_presentacion:
    string;

  cantidad_disponible:
    number;

  presentaciones_disponibles:
    number;

  estado_stock:
    | 'CON_STOCK'
    | 'AGOTADO';

  created_at?:
    string | null;

  updated_at?:
    string | null;

  creado_por:
    string;

  actualizado_por?:
    string | null;
};


type Movimiento = {
  movimiento_producto_terminado_id:
    number;

  stock_producto_terminado_id:
    number;

  tipo_movimiento:
    | 'ENTRADA_PRODUCCION'
    | 'SALIDA_ENTREGA'
    | 'AJUSTE_ENTRADA'
    | 'AJUSTE_SALIDA';

  cantidad:
    number;

  fecha_movimiento:
    string;

  observacion?:
    string | null;

  produccion_detalle_id?:
    number | null;

  produccion_id?:
    number | null;

  entrega_detalle_id?:
    number | null;

  entrega_id?:
    number | null;

  pedido_id?:
    number | null;

  registrado_por:
    string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const tiposMovimiento = [
  {
    value: '',
    label: 'Todos'
  },
  {
    value:
      'ENTRADA_PRODUCCION',
    label:
      'Entrada por producción'
  },
  {
    value:
      'SALIDA_ENTREGA',
    label:
      'Salida por entrega'
  },
  {
    value:
      'AJUSTE_ENTRADA',
    label:
      'Ajuste de entrada'
  },
  {
    value:
      'AJUSTE_SALIDA',
    label:
      'Ajuste de salida'
  }
];


const tipoTexto = (
  tipo: string
) => {
  return (
    tiposMovimiento.find(
      (item) =>
        item.value ===
        tipo
    )?.label ||
    tipo
  );
};


const esEntrada = (
  tipo: string
) =>
  tipo ===
    'ENTRADA_PRODUCCION' ||
  tipo ===
    'AJUSTE_ENTRADA';


function AlmacenProductoTerminadoDetalle() {
  const {
    stock_producto_terminado_id
  } = useParams();

  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    presentacion,
    setPresentacion
  ] = useState<
    Presentacion | null
  >(null);

  const [
    movimientos,
    setMovimientos
  ] = useState<
    Movimiento[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    cargandoMovimientos,
    setCargandoMovimientos
  ] = useState(true);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    tipoMovimiento,
    setTipoMovimiento
  ] = useState('');

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  const cargarPresentacion =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/almacen-producto-terminado/presentaciones/${stock_producto_terminado_id}`
          );

        setPresentacion(
          data.presentacion
        );
      },
      [
        stock_producto_terminado_id
      ]
    );


  const cargarMovimientos =
    useCallback(
      async (
        pagina: number,
        tipo: string
      ) => {
        setCargandoMovimientos(
          true
        );

        try {
          const params =
            new URLSearchParams();

          params.set(
            'page',
            String(pagina)
          );

          params.set(
            'limit',
            '10'
          );

          if (tipo) {
            params.set(
              'tipo_movimiento',
              tipo
            );
          }


          const data =
            await apiFetch(
              `/almacen-producto-terminado/presentaciones/${stock_producto_terminado_id}/movimientos?${params.toString()}`
            );


          setMovimientos(
            data.movimientos ||
            []
          );

          setPaginacion(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el historial de movimientos'
          );

        } finally {
          setCargandoMovimientos(
            false
          );
        }
      },
      [
        message,
        stock_producto_terminado_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await cargarPresentacion();

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el stock del producto';

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

    iniciar();
  }, [
    cargarPresentacion,
    message
  ]);


  useEffect(() => {
    cargarMovimientos(
      page,
      tipoMovimiento
    );
  }, [
    cargarMovimientos,
    page,
    tipoMovimiento
  ]);


  const fechaHoraTexto = (
    valor?:
      string | null
  ) => {
    if (!valor) {
      return '-';
    }

    const fecha =
      new Date(
        valor
      );

    return Number.isNaN(
      fecha.getTime()
    )
      ? valor
      : fecha.toLocaleString(
          'es-PE'
        );
  };


  const columnas:
    TableColumnsType<
      Movimiento
    > = [
    {
      title: 'Fecha',
      dataIndex:
        'fecha_movimiento',
      key:
        'fecha_movimiento',
      width: 175,

      render: (
        value: string
      ) =>
        fechaHoraTexto(
          value
        )
    },

    {
      title: 'Movimiento',
      dataIndex:
        'tipo_movimiento',
      key:
        'tipo_movimiento',
      width: 190,

      render: (
        value: string
      ) => (
        <Tag
          color={
            esEntrada(
              value
            )
              ? 'success'
              : 'warning'
          }
        >
          {
            tipoTexto(
              value
            )
          }
        </Tag>
      )
    },

    {
      title: 'Cantidad',
      key: 'cantidad',
      width: 165,

      render: (
        _,
        movimiento
      ) => (
        <Text
          strong
          type={
            esEntrada(
              movimiento
                .tipo_movimiento
            )
              ? 'success'
              : 'danger'
          }
        >
          {
            esEntrada(
              movimiento
                .tipo_movimiento
            )
              ? '+'
              : '-'
          }
          {
            formatCantidad(
              movimiento
                .cantidad
            )
          } {
            presentacion
              ?.unidad
          }
        </Text>
      )
    },

    {
      title: 'Origen',
      key: 'origen',
      minWidth: 180,

      render: (
        _,
        movimiento
      ) => {
        if (
          movimiento
            .produccion_id
        ) {
          return (
            <Button
              type="link"
              size="small"
              icon={
                <EyeOutlined />
              }
              onClick={() =>
                navigate(
                  `/gestion/producciones/${movimiento.produccion_id}`
                )
              }
            >
              Ver producción
            </Button>
          );
        }

        if (
          movimiento
            .pedido_id
        ) {
          return (
            <Button
              type="link"
              size="small"
              icon={
                <EyeOutlined />
              }
              onClick={() =>
                navigate(
                  `/gestion/entregas/${movimiento.pedido_id}`
                )
              }
            >
              Ver pedido
            </Button>
          );
        }

        return '-';
      }
    },

    {
      title: 'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',
      minWidth: 220,

      render: (
        value?:
          string | null
      ) =>
        value || '-'
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
        'lg'
      ]
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-almacen-pt-page">

        <Skeleton
          active
          paragraph={{
            rows: 11
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !presentacion
  ) {
    return (
      <div className="gd-almacen-pt-page">

        <BackButton
          to="/gestion/almacen/producto-terminado"
          label="Volver al almacén"
        />


        <Result
          status="error"
          title="No se pudo cargar el stock"
          subTitle={
            errorCarga ||
            'Presentación no encontrada'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-almacen-pt-page">

      <BackButton
        to="/gestion/almacen/producto-terminado"
        label="Volver al almacén"
      />


      <PageHeader
        title={
          `${presentacion.tipo_producto} · ${presentacion.material} · ${presentacion.medida} · ${presentacion.color}`
        }
        description="Stock e historial de movimientos de esta presentación."
        extra={
          presentacion
            .estado_stock ===
            'CON_STOCK'
            ? (
                <Tag color="success">
                  Con stock
                </Tag>
              )
            : (
                <Tag>
                  Agotado
                </Tag>
              )
        }
      />


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-almacen-pt-detail-stats"
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Presentación"
              value={
                Number(
                  presentacion
                    .cantidad_presentacion
                )
              }
              precision={2}
              suffix={
                presentacion
                  .unidad_presentacion
              }
              prefix={
                <ProductOutlined />
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
              title="Stock disponible"
              value={
                Number(
                  presentacion
                    .cantidad_disponible
                )
              }
              precision={2}
              suffix={
                presentacion.unidad
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
          <Card>
            <Statistic
              title="Presentaciones disponibles"
              value={
                Number(
                  presentacion
                    .presentaciones_disponibles ||
                  0
                )
              }
              precision={2}
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
              title="Estado"
              value={
                presentacion
                  .estado_stock ===
                  'CON_STOCK'
                  ? 'Con stock'
                  : 'Agotado'
              }
            />
          </Card>
        </Col>

      </Row>


      <Card
        title="Datos del producto"
        className="gd-almacen-pt-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 3
          }}
          items={[
            {
              key: 'tipo',
              label: 'Tipo',
              children:
                presentacion
                  .tipo_producto
            },

            {
              key: 'material',
              label: 'Material',
              children:
                presentacion
                  .material
            },

            {
              key: 'medida',
              label: 'Medida',
              children:
                presentacion
                  .medida
            },

            {
              key: 'color',
              label: 'Color',
              children:
                presentacion
                  .color
            },

            {
              key: 'unidad',
              label:
                'Unidad base',
              children:
                presentacion.unidad
            },

            {
              key: 'creado-por',
              label:
                'Creado por',
              children:
                presentacion
                  .creado_por
            },

            {
              key: 'descripcion',
              label:
                'Descripción',
              span: 3,
              children:
                presentacion
                  .descripcion_producto ||
                'Sin descripción'
            },

            {
              key: 'creado',
              label:
                'Fecha de creación',
              children:
                fechaHoraTexto(
                  presentacion
                    .created_at
                )
            },

            {
              key: 'actualizado',
              label:
                'Última actualización',
              children:
                fechaHoraTexto(
                  presentacion
                    .updated_at
                )
            },

            {
              key:
                'actualizado-por',
              label:
                'Actualizado por',
              children:
                presentacion
                  .actualizado_por ||
                '-'
            }
          ]}
        />

      </Card>


      <Card
        title="Historial de movimientos"
        extra={
          <Space wrap>

            <Select
              value={
                tipoMovimiento
              }
              className="gd-almacen-pt-history-filter"
              options={
                tiposMovimiento
              }
              onChange={(
                value
              ) => {
                setPage(1);
                setTipoMovimiento(
                  value
                );
              }}
            />

          </Space>
        }
        className="gd-almacen-pt-table-card"
      >

        <div className="gd-almacen-pt-history-summary">

          <Space
            size={6}
          >
            <ArrowUpOutlined />

            <Text
              type="secondary"
            >
              Entradas por producción
            </Text>
          </Space>


          <Space
            size={6}
          >
            <ArrowDownOutlined />

            <Text
              type="secondary"
            >
              Salidas por entrega
            </Text>
          </Space>

        </div>


        <Table<
          Movimiento
        >
          rowKey="movimiento_producto_terminado_id"
          columns={
            columnas
          }
          dataSource={
            movimientos
          }
          loading={
            cargandoMovimientos
          }
          scroll={{
            x: 1050
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No existen movimientos para el filtro seleccionado"
              />
          }}
          pagination={{
            current:
              paginacion.page,

            pageSize:
              paginacion.limit,

            total:
              paginacion.total,

            showSizeChanger:
              false,

            showTotal: (
              total
            ) =>
              `${total} movimiento(s)`,

            onChange: (
              nuevaPagina
            ) =>
              setPage(
                nuevaPagina
              )
          }}
        />

      </Card>

    </div>
  );
}


export default AlmacenProductoTerminadoDetalle;
