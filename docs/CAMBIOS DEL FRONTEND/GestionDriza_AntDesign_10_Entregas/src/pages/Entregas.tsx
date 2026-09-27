import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  EyeOutlined,
  ReloadOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import PageHeader
  from '../components/ui/PageHeader';

import '../styles/entregasAntd.css';


const {
  Text
} = Typography;


type PedidoEntrega = {
  pedido_id: number;
  codigo_pedido?: string | null;
  descripcion_pedido?: string | null;

  fecha_pedido: string;
  fecha_entrega_estimada?: string | null;

  estado_entrega_general:
    | 'PENDIENTE'
    | 'PARCIAL'
    | 'COMPLETO';

  cliente_id: number;
  razon_social: string;
  ruc: string;

  cantidad_items: number;
};


type FiltrosEntrega = {
  cliente_id?: number;
  q?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const estadoEntregaTag = (
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
    <Tag color="processing">
      Pendiente
    </Tag>
  );
};


function Entregas() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    FiltrosEntrega
  >();

  const [
    pedidos,
    setPedidos
  ] = useState<
    PedidoEntrega[]
  >([]);

  const [
    clientes,
    setClientes
  ] = useState<any[]>([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<
    FiltrosEntrega
  >({});

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarClientes =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/clientes/select'
          );

        setClientes(
          data.clientes ||
          []
        );
      },
      []
    );


  const cargarPedidos =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosEntrega
      ) => {
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

        if (
          filtros.cliente_id
        ) {
          params.set(
            'cliente_id',
            String(
              filtros.cliente_id
            )
          );
        }

        if (
          filtros.q?.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }

        const data =
          await apiFetch(
            `/entregas/pedidos?${params.toString()}`
          );

        setPedidos(
          data.pedidos ||
          []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  const cargarTodo =
    useCallback(
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarClientes(),
            cargarPedidos(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los pedidos por entregar'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarClientes,
        cargarPedidos,
        filtrosAplicados,
        message,
        page
      ]
    );


  useEffect(() => {
    cargarTodo();
  }, [
    cargarTodo
  ]);


  const aplicarFiltros =
    (
      values:
        FiltrosEntrega
    ) => {
      setPage(1);

      setFiltrosAplicados({
        cliente_id:
          values.cliente_id,

        q:
          values.q?.trim() ||
          ''
      });
    };


  const limpiarFiltros =
    () => {
      form.resetFields();
      setPage(1);
      setFiltrosAplicados({});
    };


  const columns:
    TableColumnsType<
      PedidoEntrega
    > = [
    {
      title: 'Código',
      dataIndex:
        'codigo_pedido',
      key:
        'codigo_pedido',
      width: 130,

      render: (
        value?:
          string | null
      ) =>
        value
          ? (
              <Text code>
                {value}
              </Text>
            )
          : '-'
    },

    {
      title: 'Cliente',
      key: 'cliente',
      minWidth: 220,

      render: (
        _,
        pedido
      ) => (
        <div className="gd-entrega-client-cell">

          <Text strong>
            {
              pedido
                .razon_social
            }
          </Text>

          <Text
            type="secondary"
          >
            {pedido.ruc}
          </Text>

        </div>
      )
    },

    {
      title: 'Fecha pedido',
      dataIndex:
        'fecha_pedido',
      key:
        'fecha_pedido',
      width: 130,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title:
        'Entrega estimada',
      dataIndex:
        'fecha_entrega_estimada',
      key:
        'fecha_entrega_estimada',
      width: 150,
      responsive: [
        'md'
      ],

      render: (
        value?:
          string | null
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title:
        'Estado de entrega',
      dataIndex:
        'estado_entrega_general',
      key:
        'estado_entrega_general',
      width: 160,

      render: (
        value: string
      ) =>
        estadoEntregaTag(
          value
        )
    },

    {
      title: 'Productos',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 110,
      responsive: [
        'md'
      ]
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 155,

      render: (
        _,
        pedido
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/entregas/${pedido.pedido_id}`
            )
          }
        >
          Ver pedido
        </Button>
      )
    }
  ];


  return (
    <div className="gd-entrega-page">

      <PageHeader
        title="Entregas"
        description="Selecciona un pedido pendiente o parcial para registrar una nueva entrega."
      />


      <Card
        title="Filtros"
        className="gd-entrega-filter-card"
      >

        <Form<FiltrosEntrega>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={
            aplicarFiltros
          }
        >

          <Row
            gutter={[
              14,
              0
            ]}
            align="bottom"
          >

            <Col
              xs={24}
              lg={9}
            >

              <Form.Item
                label="Cliente"
                name="cliente_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos los clientes"
                  options={
                    clientes.map(
                      (cliente) => ({
                        value:
                          cliente
                            .cliente_id,

                        label:
                          `${cliente.razon_social} · ${cliente.ruc}`
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={9}
            >

              <Form.Item
                label="Buscar"
                name="q"
              >
                <Input
                  allowClear
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Cliente, RUC, código o descripción"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={6}
            >

              <Form.Item
                label=" "
                className="gd-entrega-filter-actions"
              >

                <Space
                  wrap
                >

                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <SearchOutlined />
                    }
                  >
                    Buscar
                  </Button>


                  <Button
                    onClick={
                      limpiarFiltros
                    }
                  >
                    Limpiar
                  </Button>


                  <Button
                    icon={
                      <ReloadOutlined />
                    }
                    loading={
                      cargando
                    }
                    onClick={
                      cargarTodo
                    }
                  >
                    Actualizar
                  </Button>

                </Space>

              </Form.Item>

            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Pedidos por entregar"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } pedido(s)
          </Text>
        }
        className="gd-entrega-table-card"
      >

        <Table<PedidoEntrega>
          rowKey="pedido_id"
          columns={columns}
          dataSource={
            pedidos
          }
          loading={
            cargando
          }
          scroll={{
            x: 850
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay pedidos pendientes de entrega"
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
              `${total} pedido(s)`,

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


export default Entregas;
