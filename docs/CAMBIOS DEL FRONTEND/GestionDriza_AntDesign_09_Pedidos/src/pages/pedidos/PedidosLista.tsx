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
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
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
} from '../../services/api';

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


type Pedido = {
  pedido_id: number;
  codigo_pedido?: string | null;
  descripcion_pedido?: string | null;

  fecha_pedido: string;
  fecha_entrega_estimada?: string | null;

  estado_pedido:
    | 'REGISTRADO'
    | 'PARCIAL'
    | 'ENTREGADO'
    | 'CANCELADO';

  cliente_id: number;
  ruc: string;
  razon_social: string;

  registrado_por: string;

  cantidad_items: number;
  total_referencial: number;

  resumen_cantidades?:
    string | null;
};


type Filtros = {
  cliente_id?: number;
  estado_pedido?: string;
  q?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const estadoTag = (
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


const puedeEditar = (
  estado: string
) =>
  estado === 'REGISTRADO' ||
  estado === 'PARCIAL';


const cantidadesPedido = (
  resumen?:
    string | null
) => {
  if (!resumen) {
    return [];
  }

  return resumen
    .split('|')
    .filter(
      (item) =>
        item.trim()
    )
    .map(
      (item) => {
        const partes =
          item
            .trim()
            .split(' ');

        return {
          cantidad:
            Number(
              partes[0]
            ),

          unidad:
            partes
              .slice(1)
              .join(' ')
        };
      }
    );
};


function PedidosLista() {
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
    Pedido[]
  >([]);

  const [
    clientes,
    setClientes
  ] = useState<any[]>(
    []
  );

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
    cargando,
    setCargando
  ] = useState(true);

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
          filtros.estado_pedido
        ) {
          params.set(
            'estado_pedido',
            filtros
              .estado_pedido
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
            `/pedidos?${params.toString()}`
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

        estado_pedido:
          values.estado_pedido,

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
      Pedido
    > = [
    {
      title: 'Código',
      dataIndex:
        'codigo_pedido',
      key:
        'codigo_pedido',
      width: 130,

      render: (
        value?: string | null
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
      minWidth: 210,

      render: (
        _,
        pedido
      ) => (
        <div className="gd-pedido-client-cell">

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
      title: 'Fecha',
      dataIndex:
        'fecha_pedido',
      key:
        'fecha_pedido',
      width: 120,

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
      width: 145,
      responsive: [
        'md'
      ],

      render: (
        value?: string | null
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Estado',
      dataIndex:
        'estado_pedido',
      key:
        'estado_pedido',
      width: 125,

      render: (
        value: string
      ) =>
        estadoTag(
          value
        )
    },

    {
      title: 'Productos',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 105,
      responsive: [
        'md'
      ]
    },

    {
      title:
        'Total ref.',
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
              value
            )
          }
        </Text>
      )
    },

    {
      title:
        'Cantidades',
      dataIndex:
        'resumen_cantidades',
      key:
        'resumen_cantidades',
      minWidth: 180,
      responsive: [
        'lg'
      ],

      render: (
        value?:
          string | null
      ) => {
        const items =
          cantidadesPedido(
            value
          );

        if (
          items.length === 0
        ) {
          return '-';
        }

        return (
          <Space
            size={[
              4,
              4
            ]}
            wrap
          >
            {
              items.map(
                (
                  item,
                  index
                ) => (
                  <Tag
                    key={
                      `${item.unidad}-${index}`
                    }
                  >
                    {
                      formatCantidad(
                        item.cantidad
                      )
                    } {
                      item.unidad
                    }
                  </Tag>
                )
              )
            }
          </Space>
        );
      }
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      responsive: [
        'xl'
      ]
    },

    {
      title: 'Acciones',
      key: 'acciones',
      fixed: 'right',
      width: 175,

      render: (
        _,
        pedido
      ) => (
        <Space
          size={4}
          wrap
        >

          <Button
            type="link"
            icon={
              <EyeOutlined />
            }
            onClick={() =>
              navigate(
                `/gestion/pedidos/${pedido.pedido_id}`
              )
            }
          >
            Ver
          </Button>


          {
            puedeEditar(
              pedido
                .estado_pedido
            )
              ? (
                  <Button
                    type="text"
                    icon={
                      <EditOutlined />
                    }
                    onClick={() =>
                      navigate(
                        `/gestion/pedidos/${pedido.pedido_id}/editar`
                      )
                    }
                  >
                    Editar
                  </Button>
                )
              : (
                  <Text
                    type="secondary"
                  >
                    Cerrado
                  </Text>
                )
          }

        </Space>
      )
    }
  ];


  return (
    <div className="gd-pedido-page">

      <PageHeader
        title="Pedidos"
        description="Consulta, filtra, revisa y edita los pedidos registrados."
        extra={
          <Button
            type="primary"
            icon={
              <PlusOutlined />
            }
            onClick={() =>
              navigate(
                '/gestion/pedidos/registrar'
              )
            }
          >
            Registrar pedido
          </Button>
        }
      />


      <Card
        title="Filtros"
        className="gd-pedido-filter-card"
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
              lg={7}
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
              sm={12}
              lg={5}
            >
              <Form.Item
                label="Estado"
                name="estado_pedido"
              >
                <Select
                  allowClear
                  placeholder="Todos"
                  options={[
                    {
                      value:
                        'REGISTRADO',
                      label:
                        'Registrado'
                    },
                    {
                      value:
                        'PARCIAL',
                      label:
                        'Parcial'
                    },
                    {
                      value:
                        'ENTREGADO',
                      label:
                        'Entregado'
                    },
                    {
                      value:
                        'CANCELADO',
                      label:
                        'Cancelado'
                    }
                  ]}
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              lg={7}
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
              lg={5}
            >
              <Form.Item
                label=" "
                className="gd-pedido-filter-actions"
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
        title="Listado de pedidos"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } pedido(s)
          </Text>
        }
        className="gd-pedido-table-card"
      >

        <Table<Pedido>
          rowKey="pedido_id"
          columns={columns}
          dataSource={
            pedidos
          }
          loading={
            cargando
          }
          scroll={{
            x: 1100
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


export default PedidosLista;
