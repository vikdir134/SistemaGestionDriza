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

import {
  formatMonto
} from '../utils/formatters';

import '../styles/depositosAntd.css';


const {
  Text
} = Typography;


type EstadoPago =
  | 'PAGADO'
  | 'PARCIAL'
  | 'SIN_PAGO';


type PedidoDeposito = {
  pedido_id: number;
  codigo_pedido?: string | null;
  descripcion_pedido?: string | null;

  fecha_pedido: string;
  fecha_entrega_estimada?: string | null;

  estado_pedido: string;

  cliente_id: number;
  razon_social: string;
  ruc: string;

  cantidad_monedas: number;

  total_referencial: number;
  depositado_referencial: number;
  saldo_referencial: number;

  estado_pago_general:
    EstadoPago;
};


type Filtros = {
  cliente_id?: number;
  q?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const estadoPagoTag = (
  estado: EstadoPago
) => {
  if (
    estado === 'PAGADO'
  ) {
    return (
      <Tag color="success">
        Pagado
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
      Sin pago
    </Tag>
  );
};


function Depositos() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    Filtros
  >();

  const [
    pedidos,
    setPedidos
  ] = useState<
    PedidoDeposito[]
  >([]);

  const [
    clientes,
    setClientes
  ] = useState<any[]>(
    []
  );

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
    Filtros
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
          Filtros
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
            `/depositos/pedidos?${params.toString()}`
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
              : 'No se pudieron cargar los pedidos'
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
        Filtros
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
      PedidoDeposito
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
        <div className="gd-deposito-client-cell">

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
      title: 'Estado pago',
      dataIndex:
        'estado_pago_general',
      key:
        'estado_pago_general',
      width: 135,

      render: (
        value:
          EstadoPago
      ) =>
        estadoPagoTag(
          value
        )
    },

    {
      title: 'Monedas',
      dataIndex:
        'cantidad_monedas',
      key:
        'cantidad_monedas',
      width: 100,
      responsive: [
        'md'
      ],

      render: (
        value: number
      ) => (
        <Tag color="blue">
          {value}
        </Tag>
      )
    },

    {
      title: 'Total ref.',
      dataIndex:
        'total_referencial',
      key:
        'total_referencial',
      width: 130,
      responsive: [
        'lg'
      ],

      render: (
        value: number
      ) => (
        <Text strong>
          {
            formatMonto(
              value || 0
            )
          }
        </Text>
      )
    },

    {
      title:
        'Depositado ref.',
      dataIndex:
        'depositado_referencial',
      key:
        'depositado_referencial',
      width: 145,
      responsive: [
        'lg'
      ],

      render: (
        value: number
      ) =>
        formatMonto(
          value || 0
        )
    },

    {
      title: 'Saldo ref.',
      dataIndex:
        'saldo_referencial',
      key:
        'saldo_referencial',
      width: 130,
      responsive: [
        'lg'
      ],

      render: (
        value: number
      ) => (
        <Text
          strong
          type={
            Number(
              value || 0
            ) > 0
              ? 'warning'
              : undefined
          }
        >
          {
            formatMonto(
              value || 0
            )
          }
        </Text>
      )
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 145,

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
              `/gestion/depositos/${pedido.pedido_id}`
            )
          }
        >
          Ver pedido
        </Button>
      )
    }
  ];


  return (
    <div className="gd-deposito-page">

      <PageHeader
        title="Depósitos"
        description="Controla pagos registrados y saldos pendientes por pedido."
      />


      <Card
        title="Filtros"
        className="gd-deposito-filter-card"
      >

        <Form<Filtros>
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
                className="gd-deposito-filter-actions"
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
        title="Pedidos con control de depósitos"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } pedido(s)
          </Text>
        }
        className="gd-deposito-table-card"
      >

        <Table<
          PedidoDeposito
        >
          rowKey="pedido_id"
          columns={columns}
          dataSource={
            pedidos
          }
          loading={
            cargando
          }
          scroll={{
            x: 1000
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay pedidos para mostrar"
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


export default Depositos;
