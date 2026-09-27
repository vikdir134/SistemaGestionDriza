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

import '../../styles/productosTerminadosAntd.css';


const {
  Text
} = Typography;


type CatalogoItem = {
  id: number;
  nombre: string;
};


type ProductoTerminado = {
  producto_id: number;
  codigo_producto?: string | null;

  tipo_producto_id: number;
  tipo_producto: string;

  material_id: number;
  material: string;

  medida_id: number;
  medida: string;

  color_id: number;
  color: string;

  descripcion?: string | null;

  estado_composicion:
    | 'CONFIGURADO'
    | 'SIN_COMPOSICION';

  composicion_version?: number | null;
  componentes_composicion?: number;
};


type Filtros = {
  q?: string;
  tipo_producto_id?: number;
  material_id?: number;
  medida_id?: number;
  color_id?: number;
  estado_composicion:
    | 'TODOS'
    | 'CONFIGURADO'
    | 'SIN_COMPOSICION';
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const filtrosVacios:
  Filtros = {
  q: '',
  tipo_producto_id:
    undefined,
  material_id:
    undefined,
  medida_id:
    undefined,
  color_id:
    undefined,
  estado_composicion:
    'TODOS'
};


function ProductosTerminadosLista() {
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
    productos,
    setProductos
  ] = useState<
    ProductoTerminado[]
  >([]);

  const [
    tipos,
    setTipos
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    materiales,
    setMateriales
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    medidas,
    setMedidas
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    colores,
    setColores
  ] = useState<
    CatalogoItem[]
  >([]);

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
  ] = useState<Filtros>({
    ...filtrosVacios
  });

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarCatalogos =
    useCallback(
      async () => {
        const [
          tiposData,
          materialesData,
          medidasData,
          coloresData
        ] = await Promise.all([
          apiFetch(
            '/catalogos/tiposProducto'
          ),
          apiFetch(
            '/catalogos/materiales'
          ),
          apiFetch(
            '/catalogos/medidas'
          ),
          apiFetch(
            '/catalogos/colores'
          )
        ]);

        setTipos(
          tiposData.items ||
          []
        );

        setMateriales(
          materialesData.items ||
          []
        );

        setMedidas(
          medidasData.items ||
          []
        );

        setColores(
          coloresData.items ||
          []
        );
      },
      []
    );


  const cargarProductos =
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

        params.set(
          'estado_composicion',
          filtros
            .estado_composicion ||
          'TODOS'
        );

        if (
          filtros.q?.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }

        if (
          filtros.tipo_producto_id
        ) {
          params.set(
            'tipo_producto_id',
            String(
              filtros
                .tipo_producto_id
            )
          );
        }

        if (
          filtros.material_id
        ) {
          params.set(
            'material_id',
            String(
              filtros
                .material_id
            )
          );
        }

        if (
          filtros.medida_id
        ) {
          params.set(
            'medida_id',
            String(
              filtros.medida_id
            )
          );
        }

        if (
          filtros.color_id
        ) {
          params.set(
            'color_id',
            String(
              filtros.color_id
            )
          );
        }

        const data =
          await apiFetch(
            `/productos-terminados?${params.toString()}`
          );

        setProductos(
          data.productos ||
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
            cargarCatalogos(),
            cargarProductos(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los productos terminados'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarCatalogos,
        cargarProductos,
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
        q:
          values.q?.trim() ||
          '',

        tipo_producto_id:
          values
            .tipo_producto_id,

        material_id:
          values.material_id,

        medida_id:
          values.medida_id,

        color_id:
          values.color_id,

        estado_composicion:
          values
            .estado_composicion ||
          'TODOS'
      });
    };


  const limpiarFiltros =
    () => {
      form.resetFields();

      form.setFieldsValue({
        estado_composicion:
          'TODOS'
      });

      setPage(1);

      setFiltrosAplicados({
        ...filtrosVacios
      });
    };


  const columns:
    TableColumnsType<
      ProductoTerminado
    > = [
    {
      title: 'Producto',
      key: 'producto',
      minWidth: 210,

      render: (
        _,
        producto
      ) => (
        <div className="gd-pt-producto-cell">

          <Text strong>
            {
              producto
                .tipo_producto
            }
          </Text>

          <Text
            type="secondary"
          >
            {
              producto.material
            }
          </Text>

        </div>
      )
    },

    {
      title: 'Medida',
      dataIndex: 'medida',
      key: 'medida',
      width: 130
    },

    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      width: 130
    },

    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      responsive: [
        'lg'
      ],

      render: (
        value?: string | null
      ) =>
        value || '-'
    },

    {
      title: 'Composición',
      key: 'composicion',
      width: 190,

      render: (
        _,
        producto
      ) =>
        producto
          .estado_composicion ===
        'CONFIGURADO'
          ? (
              <Space
                size={6}
                wrap
              >
                <Tag
                  color="success"
                >
                  Definida
                </Tag>

                <Text
                  type="secondary"
                >
                  V{
                    producto
                      .composicion_version
                  }
                </Text>
              </Space>
            )
          : (
              <Tag
                color="warning"
              >
                Pendiente
              </Tag>
            )
    },

    {
      title:
        'Materias primas',
      dataIndex:
        'componentes_composicion',
      key:
        'componentes_composicion',
      width: 140,
      responsive: [
        'md'
      ],

      render: (
        value?: number
      ) =>
        Number(
          value || 0
        )
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 140,

      render: (
        _,
        producto
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/productos-terminados/${producto.producto_id}`
            )
          }
        >
          Ver producto
        </Button>
      )
    }
  ];


  return (
    <div className="gd-pt-page">

      <PageHeader
        title="Productos terminados"
        description="Administra los productos que se fabrican y su composición de materia prima."
        extra={
          <Button
            type="primary"
            icon={
              <PlusOutlined />
            }
            onClick={() =>
              navigate(
                '/gestion/productos-terminados/registrar'
              )
            }
          >
            Registrar producto
          </Button>
        }
      />


      <Card
        title="Filtros"
        className="gd-pt-filter-card"
      >

        <Form<Filtros>
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={{
            estado_composicion:
              'TODOS'
          }}
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
              lg={8}
              xl={7}
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
                  placeholder="Tipo, material, medida o color"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={4}
            >

              <Form.Item
                label="Tipo"
                name="tipo_producto_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos"
                  options={
                    tipos.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={4}
            >

              <Form.Item
                label="Material"
                name="material_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos"
                  options={
                    materiales.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={4}
            >

              <Form.Item
                label="Medida"
                name="medida_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todas"
                  options={
                    medidas.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={4}
            >

              <Form.Item
                label="Color"
                name="color_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos"
                  options={
                    colores.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
              xl={5}
            >

              <Form.Item
                label="Composición"
                name="estado_composicion"
              >
                <Select
                  options={[
                    {
                      value:
                        'TODOS',
                      label:
                        'Todos'
                    },
                    {
                      value:
                        'CONFIGURADO',
                      label:
                        'Definida'
                    },
                    {
                      value:
                        'SIN_COMPOSICION',
                      label:
                        'Pendiente'
                    }
                  ]}
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={18}
              xl={19}
            >

              <Form.Item
                label=" "
                className="gd-pt-filter-actions-item"
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
        title="Listado de productos"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } producto(s)
          </Text>
        }
        className="gd-pt-table-card"
      >

        <Table<
          ProductoTerminado
        >
          rowKey="producto_id"
          columns={columns}
          dataSource={
            productos
          }
          loading={
            cargando
          }
          scroll={{
            x: 900
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay productos para mostrar"
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
              `${total} producto(s)`,

            onChange: (
              nuevaPagina
            ) => {
              setPage(
                nuevaPagina
              );
            }
          }}
        />

      </Card>

    </div>
  );
}


export default
  ProductosTerminadosLista;
