import type {
  TableColumnsType,
  TabsProps
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Typography
} from 'antd';

import {
  EyeOutlined,
  InboxOutlined,
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
  formatPeso
} from '../../utils/formatters';

import '../../styles/almacenProductoTerminadoAntd.css';


const {
  Text
} = Typography;


type FiltrosBase = {
  q?: string;
  tipo_producto_id?: number;
  material_id?: number;
  medida_id?: number;
  color_id?: number;
};


type FiltrosPresentaciones =
  FiltrosBase & {
    estado?: string;
  };


type Indicadores = {
  stock_disponible_kg: number;
  productos_con_stock: number;
  presentaciones_con_stock: number;
};


type ResumenProducto = {
  producto_id: number;

  tipo_producto_id: number;
  tipo_producto: string;

  material_id: number;
  material: string;

  medida_id: number;
  medida: string;

  color_id: number;
  color: string;

  unidad_medida_id: number;
  unidad: string;

  cantidad_disponible_total: number;
  presentaciones_con_stock: number;
};


type PresentacionProducto = {
  stock_producto_terminado_id: number;
  producto_id: number;

  tipo_producto_id: number;
  tipo_producto: string;

  material_id: number;
  material: string;

  medida_id: number;
  medida: string;

  color_id: number;
  color: string;

  unidad_medida_id: number;
  unidad: string;

  cantidad_presentacion: number;

  unidad_presentacion_id: number;
  unidad_presentacion: string;

  cantidad_disponible: number;
  presentaciones_disponibles: number;

  estado_stock:
    | 'CON_STOCK'
    | 'AGOTADO';

  created_at?: string | null;
  updated_at?: string | null;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const estadoStockTag = (
  estado: string
) => {
  if (
    estado === 'CON_STOCK'
  ) {
    return (
      <Tag color="success">
        Con stock
      </Tag>
    );
  }

  return (
    <Tag>
      Agotado
    </Tag>
  );
};


function AlmacenProductoTerminado() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    formResumen
  ] = Form.useForm<
    FiltrosBase
  >();

  const [
    formPresentaciones
  ] = Form.useForm<
    FiltrosPresentaciones
  >();

  const [
    indicadores,
    setIndicadores
  ] = useState<Indicadores>({
    stock_disponible_kg: 0,
    productos_con_stock: 0,
    presentaciones_con_stock: 0
  });

  const [
    tipos,
    setTipos
  ] = useState<any[]>([]);

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    medidas,
    setMedidas
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    resumen,
    setResumen
  ] = useState<
    ResumenProducto[]
  >([]);

  const [
    presentaciones,
    setPresentaciones
  ] = useState<
    PresentacionProducto[]
  >([]);

  const [
    cargandoBase,
    setCargandoBase
  ] = useState(true);

  const [
    cargandoResumen,
    setCargandoResumen
  ] = useState(true);

  const [
    cargandoPresentaciones,
    setCargandoPresentaciones
  ] = useState(true);

  const [
    pageResumen,
    setPageResumen
  ] = useState(1);

  const [
    pagePresentaciones,
    setPagePresentaciones
  ] = useState(1);

  const [
    filtrosResumen,
    setFiltrosResumen
  ] = useState<
    FiltrosBase
  >({});

  const [
    filtrosPresentaciones,
    setFiltrosPresentaciones
  ] = useState<
    FiltrosPresentaciones
  >({
    estado:
      'TODOS'
  });

  const [
    paginacionResumen,
    setPaginacionResumen
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [
    paginacionPresentaciones,
    setPaginacionPresentaciones
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarBase =
    useCallback(
      async () => {
        setCargandoBase(
          true
        );

        try {
          const [
            indicadoresData,
            tiposData,
            materialesData,
            medidasData,
            coloresData
          ] = await Promise.all([
            apiFetch(
              '/almacen-producto-terminado/indicadores'
            ),

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


          setIndicadores(
            indicadoresData
              .indicadores ||
            {}
          );

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

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos del almacén'
          );

        } finally {
          setCargandoBase(
            false
          );
        }
      },
      [
        message
      ]
    );


  const cargarResumen =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosBase
      ) => {
        setCargandoResumen(
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


          if (
            filtros.q?.trim()
          ) {
            params.set(
              'q',
              filtros.q.trim()
            );
          }

          if (
            filtros
              .tipo_producto_id
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
                filtros
                  .medida_id
              )
            );
          }

          if (
            filtros.color_id
          ) {
            params.set(
              'color_id',
              String(
                filtros
                  .color_id
              )
            );
          }


          const data =
            await apiFetch(
              `/almacen-producto-terminado/resumen?${params.toString()}`
            );


          setResumen(
            data.resumen ||
            []
          );

          setPaginacionResumen(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el resumen del almacén'
          );

        } finally {
          setCargandoResumen(
            false
          );
        }
      },
      [
        message
      ]
    );


  const cargarPresentaciones =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosPresentaciones
      ) => {
        setCargandoPresentaciones(
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

          params.set(
            'estado',
            filtros.estado ||
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
            filtros
              .tipo_producto_id
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
                filtros
                  .medida_id
              )
            );
          }

          if (
            filtros.color_id
          ) {
            params.set(
              'color_id',
              String(
                filtros
                  .color_id
              )
            );
          }


          const data =
            await apiFetch(
              `/almacen-producto-terminado/presentaciones?${params.toString()}`
            );


          setPresentaciones(
            data.presentaciones ||
            []
          );

          setPaginacionPresentaciones(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el stock por presentación'
          );

        } finally {
          setCargandoPresentaciones(
            false
          );
        }
      },
      [
        message
      ]
    );


  useEffect(() => {
    cargarBase();
  }, [
    cargarBase
  ]);


  useEffect(() => {
    cargarResumen(
      pageResumen,
      filtrosResumen
    );
  }, [
    cargarResumen,
    filtrosResumen,
    pageResumen
  ]);


  useEffect(() => {
    cargarPresentaciones(
      pagePresentaciones,
      filtrosPresentaciones
    );
  }, [
    cargarPresentaciones,
    filtrosPresentaciones,
    pagePresentaciones
  ]);


  const actualizarTodo =
    async () => {
      await Promise.all([
        cargarBase(),
        cargarResumen(
          pageResumen,
          filtrosResumen
        ),
        cargarPresentaciones(
          pagePresentaciones,
          filtrosPresentaciones
        )
      ]);
    };


  const opcionesFiltro = {
    tipos:
      tipos.map(
        (item) => ({
          value:
            item.id,
          label:
            item.nombre
        })
      ),

    materiales:
      materiales.map(
        (item) => ({
          value:
            item.id,
          label:
            item.nombre
        })
      ),

    medidas:
      medidas.map(
        (item) => ({
          value:
            item.id,
          label:
            item.nombre
        })
      ),

    colores:
      colores.map(
        (item) => ({
          value:
            item.id,
          label:
            item.nombre
        })
      )
  };


  const renderFiltrosBase = (
    tipoVista:
      'RESUMEN' |
      'PRESENTACIONES'
  ) => {
    const esResumen =
      tipoVista ===
      'RESUMEN';

    const form =
      esResumen
        ? formResumen
        : formPresentaciones;


    return (
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={
          esResumen
            ? undefined
            : {
                estado:
                  'TODOS'
              }
        }
        onFinish={(
          values
        ) => {
          if (
            esResumen
          ) {
            setPageResumen(
              1
            );

            setFiltrosResumen({
              q:
                values.q
                  ?.trim() ||
                '',

              tipo_producto_id:
                values
                  .tipo_producto_id,

              material_id:
                values
                  .material_id,

              medida_id:
                values
                  .medida_id,

              color_id:
                values
                  .color_id
            });

          } else {
            setPagePresentaciones(
              1
            );

            setFiltrosPresentaciones({
              q:
                values.q
                  ?.trim() ||
                '',

              tipo_producto_id:
                values
                  .tipo_producto_id,

              material_id:
                values
                  .material_id,

              medida_id:
                values
                  .medida_id,

              color_id:
                values
                  .color_id,

              estado:
                values.estado ||
                'TODOS'
            });
          }
        }}
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
            lg={6}
            xl={3}
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
                  opcionesFiltro
                    .tipos
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
            lg={6}
            xl={3}
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
                  opcionesFiltro
                    .materiales
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
            lg={6}
            xl={3}
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
                  opcionesFiltro
                    .medidas
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
            lg={6}
            xl={3}
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
                  opcionesFiltro
                    .colores
                }
              />
            </Form.Item>
          </Col>


          {
            !esResumen &&
            (
              <Col
                xs={24}
                sm={12}
                lg={6}
                xl={3}
              >
                <Form.Item
                  label="Estado"
                  name="estado"
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
                          'CON_STOCK',
                        label:
                          'Con stock'
                      },
                      {
                        value:
                          'AGOTADO',
                        label:
                          'Agotados'
                      }
                    ]}
                  />
                </Form.Item>
              </Col>
            )
          }


          <Col
            xs={24}
            xl={
              esResumen
                ? 5
                : 2
            }
          >
            <Form.Item
              label=" "
              className="gd-almacen-pt-filter-actions"
            >
              <Space wrap>

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
                  onClick={() => {
                    form.resetFields();

                    if (
                      esResumen
                    ) {
                      setPageResumen(
                        1
                      );

                      setFiltrosResumen(
                        {}
                      );

                    } else {
                      form.setFieldValue(
                        'estado',
                        'TODOS'
                      );

                      setPagePresentaciones(
                        1
                      );

                      setFiltrosPresentaciones({
                        estado:
                          'TODOS'
                      });
                    }
                  }}
                >
                  Limpiar
                </Button>

              </Space>
            </Form.Item>
          </Col>

        </Row>

      </Form>
    );
  };


  const resumenColumns:
    TableColumnsType<
      ResumenProducto
    > = [
    {
      title: 'Producto',
      key: 'producto',
      minWidth: 230,

      render: (
        _,
        item
      ) => (
        <div className="gd-almacen-pt-product-cell">

          <Text strong>
            {
              item
                .tipo_producto
            }
          </Text>

          <Text
            type="secondary"
          >
            {item.material}
          </Text>

        </div>
      )
    },

    {
      title: 'Medida',
      dataIndex:
        'medida',
      key:
        'medida',
      width: 150
    },

    {
      title: 'Color',
      dataIndex:
        'color',
      key:
        'color',
      width: 150
    },

    {
      title:
        'Presentaciones con stock',
      dataIndex:
        'presentaciones_con_stock',
      key:
        'presentaciones_con_stock',
      width: 190,
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
      title:
        'Stock disponible',
      key:
        'disponible',
      width: 190,

      render: (
        _,
        item
      ) => (
        <Text
          strong
          type={
            Number(
              item
                .cantidad_disponible_total
            ) > 0
              ? 'success'
              : undefined
          }
        >
          {
            formatCantidad(
              item
                .cantidad_disponible_total
            )
          } {
            item.unidad
          }
        </Text>
      )
    }
  ];


  const presentacionesColumns:
    TableColumnsType<
      PresentacionProducto
    > = [
    {
      title: 'Producto',
      key: 'producto',
      minWidth: 220,

      render: (
        _,
        item
      ) => (
        <div className="gd-almacen-pt-product-cell">

          <Text strong>
            {
              item
                .tipo_producto
            }
          </Text>

          <Text
            type="secondary"
          >
            {item.material}
          </Text>

        </div>
      )
    },

    {
      title: 'Medida',
      dataIndex:
        'medida',
      key:
        'medida',
      width: 145
    },

    {
      title: 'Color',
      dataIndex:
        'color',
      key:
        'color',
      width: 145
    },

    {
      title:
        'Presentación',
      key:
        'presentacion',
      width: 165,

      render: (
        _,
        item
      ) => (
        <Text strong>
          {
            formatCantidad(
              item
                .cantidad_presentacion
            )
          } {
            item
              .unidad_presentacion
          }
        </Text>
      )
    },

    {
      title: 'Disponible',
      key: 'disponible',
      width: 165,

      render: (
        _,
        item
      ) => (
        <Text
          strong
          type={
            item
              .estado_stock ===
              'CON_STOCK'
              ? 'success'
              : undefined
          }
        >
          {
            formatCantidad(
              item
                .cantidad_disponible
            )
          } {
            item.unidad
          }
        </Text>
      )
    },

    {
      title:
        'Presentaciones disponibles',
      dataIndex:
        'presentaciones_disponibles',
      key:
        'presentaciones_disponibles',
      width: 205,
      responsive: [
        'md'
      ],

      render: (
        value: number
      ) =>
        formatCantidad(
          value
        )
    },

    {
      title: 'Estado',
      dataIndex:
        'estado_stock',
      key:
        'estado_stock',
      width: 120,

      render: (
        value: string
      ) =>
        estadoStockTag(
          value
        )
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 145,

      render: (
        _,
        item
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/almacen/producto-terminado/presentaciones/${item.stock_producto_terminado_id}`
            )
          }
        >
          Ver detalle
        </Button>
      )
    }
  ];


  const tabs:
    TabsProps['items'] = [
    {
      key: 'resumen',
      label:
        'Resumen general',

      children:
        (
          <>
            <Card
              title="Filtros"
              className="gd-almacen-pt-section-card"
            >
              {
                renderFiltrosBase(
                  'RESUMEN'
                )
              }
            </Card>


            <Card
              title="Stock consolidado"
              extra={
                <Text
                  type="secondary"
                >
                  {
                    paginacionResumen
                      .total
                  } producto(s)
                </Text>
              }
              className="gd-almacen-pt-table-card"
            >

              <Table<
                ResumenProducto
              >
                rowKey="producto_id"
                columns={
                  resumenColumns
                }
                dataSource={
                  resumen
                }
                loading={
                  cargandoResumen
                }
                scroll={{
                  x: 760
                }}
                locale={{
                  emptyText:
                    <Empty
                      image={
                        Empty
                          .PRESENTED_IMAGE_SIMPLE
                      }
                      description="No hay productos para los filtros seleccionados"
                    />
                }}
                pagination={{
                  current:
                    paginacionResumen
                      .page,

                  pageSize:
                    paginacionResumen
                      .limit,

                  total:
                    paginacionResumen
                      .total,

                  showSizeChanger:
                    false,

                  showTotal: (
                    total
                  ) =>
                    `${total} producto(s)`,

                  onChange: (
                    nuevaPagina
                  ) =>
                    setPageResumen(
                      nuevaPagina
                    )
                }}
              />

            </Card>
          </>
        )
    },

    {
      key:
        'presentaciones',
      label:
        'Por presentación',

      children:
        (
          <>
            <Card
              title="Filtros"
              className="gd-almacen-pt-section-card"
            >
              {
                renderFiltrosBase(
                  'PRESENTACIONES'
                )
              }
            </Card>


            <Card
              title="Stock por presentación"
              extra={
                <Text
                  type="secondary"
                >
                  {
                    paginacionPresentaciones
                      .total
                  } registro(s)
                </Text>
              }
              className="gd-almacen-pt-table-card"
            >

              <Table<
                PresentacionProducto
              >
                rowKey="stock_producto_terminado_id"
                columns={
                  presentacionesColumns
                }
                dataSource={
                  presentaciones
                }
                loading={
                  cargandoPresentaciones
                }
                scroll={{
                  x: 1150
                }}
                locale={{
                  emptyText:
                    <Empty
                      image={
                        Empty
                          .PRESENTED_IMAGE_SIMPLE
                      }
                      description="No hay presentaciones para los filtros seleccionados"
                    />
                }}
                pagination={{
                  current:
                    paginacionPresentaciones
                      .page,

                  pageSize:
                    paginacionPresentaciones
                      .limit,

                  total:
                    paginacionPresentaciones
                      .total,

                  showSizeChanger:
                    false,

                  showTotal: (
                    total
                  ) =>
                    `${total} registro(s)`,

                  onChange: (
                    nuevaPagina
                  ) =>
                    setPagePresentaciones(
                      nuevaPagina
                    )
                }}
              />

            </Card>
          </>
        )
    }
  ];


  return (
    <div className="gd-almacen-pt-page">

      <PageHeader
        title="Almacén de producto terminado"
        description="Consulta las existencias disponibles de los productos fabricados y sus distintas presentaciones."
        extra={
          <Space wrap>

            <Button
              icon={
                <ReloadOutlined />
              }
              loading={
                cargandoBase ||
                cargandoResumen ||
                cargandoPresentaciones
              }
              onClick={
                actualizarTodo
              }
            >
              Actualizar
            </Button>


            <Button
              type="primary"
              icon={
                <PlusOutlined />
              }
              onClick={() =>
                navigate(
                  '/gestion/producciones/registrar'
                )
              }
            >
              Registrar producción
            </Button>

          </Space>
        }
      />


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-almacen-pt-kpis"
      >

        <Col
          xs={24}
          sm={12}
          lg={8}
        >
          <Card>
            <Statistic
              title="Stock disponible"
              value={
                Number(
                  indicadores
                    .stock_disponible_kg ||
                  0
                )
              }
              precision={2}
              suffix="KG"
              prefix={
                <InboxOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          lg={8}
        >
          <Card>
            <Statistic
              title="Productos con stock"
              value={
                Number(
                  indicadores
                    .productos_con_stock ||
                  0
                )
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          lg={8}
        >
          <Card>
            <Statistic
              title="Presentaciones con stock"
              value={
                Number(
                  indicadores
                    .presentaciones_con_stock ||
                  0
                )
              }
            />
          </Card>
        </Col>

      </Row>


      <Card
        className="gd-almacen-pt-tabs-card"
      >
        <Tabs
          defaultActiveKey="resumen"
          items={tabs}
        />
      </Card>

    </div>
  );
}


export default AlmacenProductoTerminado;
