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
  DatabaseOutlined,
  EyeOutlined,
  InboxOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  ShoppingCartOutlined
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
  formatPeso
} from '../../utils/formatters';

import '../../styles/almacenMateriaPrimaAntd.css';


const {
  Text
} = Typography;


type ResumenMateriaPrima = {
  material_id: number;
  material: string;

  color_id: number;
  color: string;

  unidad_medida_id: number;
  unidad: string;

  cantidad_inicial_total: number;
  cantidad_consumida_total: number;
  cantidad_disponible_total: number;
};


type LoteMateriaPrima = {
  compra_materia_prima_id: number;
  nombre_lote: string;

  fecha_compra: string;
  numero_documento?: string | null;

  proveedor_id: number;
  proveedor_ruc: string;
  proveedor: string;

  cantidad_materias_primas: number;

  cantidad_inicial_total: number;
  cantidad_consumida_total: number;
  cantidad_disponible_total: number;

  estado_stock:
    | 'CON_STOCK'
    | 'AGOTADO';
};


type Indicadores = {
  total_comprado_kg: number;
  stock_total_kg: number;
  consumido_total_kg: number;
  lotes_registrados: number;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


type FiltrosResumen = {
  q?: string;
  material_id?: number;
  color_id?: number;
};


type FiltrosLotes = {
  q?: string;
  proveedor_id?: number;
  estado?: string;
};


const estadoLoteTag = (
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
    <Tag color="default">
      Agotado
    </Tag>
  );
};


function AlmacenMateriaPrima() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    formResumen
  ] = Form.useForm<
    FiltrosResumen
  >();

  const [
    formLotes
  ] = Form.useForm<
    FiltrosLotes
  >();

  const [
    indicadores,
    setIndicadores
  ] = useState<Indicadores>({
    total_comprado_kg: 0,
    stock_total_kg: 0,
    consumido_total_kg: 0,
    lotes_registrados: 0
  });

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>([]);

  const [
    resumen,
    setResumen
  ] = useState<
    ResumenMateriaPrima[]
  >([]);

  const [
    lotes,
    setLotes
  ] = useState<
    LoteMateriaPrima[]
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
    cargandoLotes,
    setCargandoLotes
  ] = useState(true);

  const [
    pageResumen,
    setPageResumen
  ] = useState(1);

  const [
    pageLotes,
    setPageLotes
  ] = useState(1);

  const [
    filtrosResumen,
    setFiltrosResumen
  ] = useState<
    FiltrosResumen
  >({});

  const [
    filtrosLotes,
    setFiltrosLotes
  ] = useState<
    FiltrosLotes
  >({
    estado: 'TODOS'
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
    paginacionLotes,
    setPaginacionLotes
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarBase =
    useCallback(
      async () => {
        setCargandoBase(true);

        try {
          const [
            indicadoresData,
            materialesData,
            coloresData,
            proveedoresData
          ] = await Promise.all([
            apiFetch(
              '/almacen-materia-prima/indicadores'
            ),

            apiFetch(
              '/catalogos/materiales'
            ),

            apiFetch(
              '/catalogos/colores'
            ),

            apiFetch(
              '/proveedores'
            )
          ]);


          setIndicadores(
            indicadoresData
              .indicadores ||
            {}
          );

          setMateriales(
            materialesData.items ||
            []
          );

          setColores(
            coloresData.items ||
            []
          );

          setProveedores(
            proveedoresData
              .proveedores ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos del almacén'
          );

        } finally {
          setCargandoBase(false);
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
          FiltrosResumen
      ) => {
        setCargandoResumen(true);

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
            filtros.material_id
          ) {
            params.set(
              'material_id',
              String(
                filtros.material_id
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
              `/almacen-materia-prima/resumen?${params.toString()}`
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
          setCargandoResumen(false);
        }
      },
      [
        message
      ]
    );


  const cargarLotes =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosLotes
      ) => {
        setCargandoLotes(true);

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
            filtros.proveedor_id
          ) {
            params.set(
              'proveedor_id',
              String(
                filtros
                  .proveedor_id
              )
            );
          }


          const data =
            await apiFetch(
              `/almacen-materia-prima/lotes?${params.toString()}`
            );


          setLotes(
            data.lotes ||
            []
          );

          setPaginacionLotes(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los lotes'
          );

        } finally {
          setCargandoLotes(false);
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
    cargarLotes(
      pageLotes,
      filtrosLotes
    );
  }, [
    cargarLotes,
    filtrosLotes,
    pageLotes
  ]);


  const actualizarTodo =
    async () => {
      await Promise.all([
        cargarBase(),
        cargarResumen(
          pageResumen,
          filtrosResumen
        ),
        cargarLotes(
          pageLotes,
          filtrosLotes
        )
      ]);
    };


  const resumenColumns:
    TableColumnsType<
      ResumenMateriaPrima
    > = [
    {
      title: 'Material',
      dataIndex:
        'material',
      key:
        'material',
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
      title: 'Color',
      dataIndex:
        'color',
      key:
        'color',
      width: 160
    },

    {
      title:
        'Total comprado',
      key:
        'comprado',
      width: 170,

      render: (
        _,
        item
      ) =>
        `${formatPeso(item.cantidad_inicial_total)} ${item.unidad}`
    },

    {
      title: 'Consumido',
      key: 'consumido',
      width: 160,

      render: (
        _,
        item
      ) => (
        <Text
          type={
            Number(
              item
                .cantidad_consumida_total
            ) > 0
              ? 'warning'
              : undefined
          }
        >
          {
            formatPeso(
              item
                .cantidad_consumida_total
            )
          } {
            item.unidad
          }
        </Text>
      )
    },

    {
      title: 'Disponible',
      key: 'disponible',
      width: 230,

      render: (
        _,
        item
      ) => {
        const total =
          Number(
            item
              .cantidad_inicial_total ||
            0
          );

        const disponible =
          Number(
            item
              .cantidad_disponible_total ||
            0
          );

        const porcentaje =
          total > 0
            ? Math.max(
                0,
                Math.min(
                  100,
                  (
                    disponible /
                    total
                  ) *
                  100
                )
              )
            : 0;


        return (
          <div className="gd-almacen-mp-stock-cell">

            <Text strong>
              {
                formatPeso(
                  disponible
                )
              } {
                item.unidad
              }
            </Text>

            <Progress
              percent={
                Number(
                  porcentaje
                    .toFixed(2)
                )
              }
              showInfo={false}
              size="small"
            />

          </div>
        );
      }
    }
  ];


  const lotesColumns:
    TableColumnsType<
      LoteMateriaPrima
    > = [
    {
      title: 'Lote',
      dataIndex:
        'nombre_lote',
      key:
        'nombre_lote',
      minWidth: 190,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title: 'Proveedor',
      key: 'proveedor',
      minWidth: 210,

      render: (
        _,
        lote
      ) => (
        <div className="gd-almacen-mp-provider-cell">

          <Text strong>
            {lote.proveedor}
          </Text>

          <Text
            type="secondary"
          >
            {
              lote
                .proveedor_ruc
            }
          </Text>

        </div>
      )
    },

    {
      title: 'Fecha compra',
      dataIndex:
        'fecha_compra',
      key:
        'fecha_compra',
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
      title: 'Documento',
      dataIndex:
        'numero_documento',
      key:
        'numero_documento',
      width: 155,
      responsive: [
        'md'
      ],

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title:
        'Materias primas',
      dataIndex:
        'cantidad_materias_primas',
      key:
        'cantidad_materias_primas',
      width: 135,
      responsive: [
        'md'
      ]
    },

    {
      title: 'Comprado',
      dataIndex:
        'cantidad_inicial_total',
      key:
        'cantidad_inicial_total',
      width: 145,

      render: (
        value: number
      ) =>
        `${formatPeso(value)} KG`
    },

    {
      title: 'Consumido',
      dataIndex:
        'cantidad_consumida_total',
      key:
        'cantidad_consumida_total',
      width: 145,
      responsive: [
        'lg'
      ],

      render: (
        value: number
      ) =>
        `${formatPeso(value)} KG`
    },

    {
      title: 'Disponible',
      dataIndex:
        'cantidad_disponible_total',
      key:
        'cantidad_disponible_total',
      width: 150,

      render: (
        value: number
      ) => (
        <Text
          strong
          type={
            Number(
              value
            ) > 0
              ? 'success'
              : undefined
          }
        >
          {
            formatPeso(
              value
            )
          } KG
        </Text>
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
        estadoLoteTag(
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
        lote
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/almacen/materia-prima/lotes/${lote.compra_materia_prima_id}`
            )
          }
        >
          Ver lote
        </Button>
      )
    }
  ];


  const tabItems:
    TabsProps['items'] = [
    {
      key: 'resumen',
      label:
        'Resumen general',

      children:
        (
          <>
            <Card
              title="Filtros del resumen"
              className="gd-almacen-mp-section-card"
            >

              <Form<
                FiltrosResumen
              >
                form={
                  formResumen
                }
                layout="vertical"
                requiredMark={false}
                onFinish={(
                  values
                ) => {
                  setPageResumen(1);

                  setFiltrosResumen({
                    q:
                      values.q
                        ?.trim() ||
                      '',

                    material_id:
                      values
                        .material_id,

                    color_id:
                      values
                        .color_id
                  });
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
                    lg={8}
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
                        placeholder="Material o color"
                      />
                    </Form.Item>
                  </Col>


                  <Col
                    xs={24}
                    sm={12}
                    lg={5}
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
                    lg={5}
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
                    lg={6}
                  >
                    <Form.Item
                      label=" "
                      className="gd-almacen-mp-filter-actions"
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
                            formResumen
                              .resetFields();

                            setPageResumen(
                              1
                            );

                            setFiltrosResumen(
                              {}
                            );
                          }}
                        >
                          Limpiar
                        </Button>

                      </Space>
                    </Form.Item>
                  </Col>

                </Row>

              </Form>

            </Card>


            <Card
              title="Existencias consolidadas"
              extra={
                <Text
                  type="secondary"
                >
                  {
                    paginacionResumen
                      .total
                  } registro(s)
                </Text>
              }
              className="gd-almacen-mp-table-card"
            >

              <Table<
                ResumenMateriaPrima
              >
                rowKey={(
                  item
                ) =>
                  `${item.material_id}-${item.color_id}-${item.unidad_medida_id}`
                }
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
                  x: 780
                }}
                locale={{
                  emptyText:
                    <Empty
                      image={
                        Empty
                          .PRESENTED_IMAGE_SIMPLE
                      }
                      description="No hay existencias para los filtros seleccionados"
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
                    `${total} registro(s)`,

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
      key: 'lotes',
      label: 'Lotes',

      children:
        (
          <>
            <Card
              title="Filtros de lotes"
              className="gd-almacen-mp-section-card"
            >

              <Form<
                FiltrosLotes
              >
                form={
                  formLotes
                }
                layout="vertical"
                requiredMark={false}
                initialValues={{
                  estado:
                    'TODOS'
                }}
                onFinish={(
                  values
                ) => {
                  setPageLotes(1);

                  setFiltrosLotes({
                    q:
                      values.q
                        ?.trim() ||
                      '',

                    proveedor_id:
                      values
                        .proveedor_id,

                    estado:
                      values.estado ||
                      'TODOS'
                  });
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
                    lg={8}
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
                        placeholder="Lote, documento, proveedor, material..."
                      />
                    </Form.Item>
                  </Col>


                  <Col
                    xs={24}
                    lg={6}
                  >
                    <Form.Item
                      label="Proveedor"
                      name="proveedor_id"
                    >
                      <Select
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        placeholder="Todos"
                        options={
                          proveedores.map(
                            (item) => ({
                              value:
                                item
                                  .proveedor_id,

                              label:
                                `${item.razon_social} · ${item.ruc}`
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


                  <Col
                    xs={24}
                    lg={6}
                  >
                    <Form.Item
                      label=" "
                      className="gd-almacen-mp-filter-actions"
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
                            formLotes
                              .resetFields();

                            formLotes
                              .setFieldValue(
                                'estado',
                                'TODOS'
                              );

                            setPageLotes(
                              1
                            );

                            setFiltrosLotes({
                              estado:
                                'TODOS'
                            });
                          }}
                        >
                          Limpiar
                        </Button>

                      </Space>
                    </Form.Item>
                  </Col>

                </Row>

              </Form>

            </Card>


            <Card
              title="Lotes de compra"
              extra={
                <Text
                  type="secondary"
                >
                  {
                    paginacionLotes
                      .total
                  } lote(s)
                </Text>
              }
              className="gd-almacen-mp-table-card"
            >

              <Table<
                LoteMateriaPrima
              >
                rowKey="compra_materia_prima_id"
                columns={
                  lotesColumns
                }
                dataSource={
                  lotes
                }
                loading={
                  cargandoLotes
                }
                scroll={{
                  x: 1180
                }}
                locale={{
                  emptyText:
                    <Empty
                      image={
                        Empty
                          .PRESENTED_IMAGE_SIMPLE
                      }
                      description="No hay lotes para los filtros seleccionados"
                    />
                }}
                pagination={{
                  current:
                    paginacionLotes
                      .page,

                  pageSize:
                    paginacionLotes
                      .limit,

                  total:
                    paginacionLotes
                      .total,

                  showSizeChanger:
                    false,

                  showTotal: (
                    total
                  ) =>
                    `${total} lote(s)`,

                  onChange: (
                    nuevaPagina
                  ) =>
                    setPageLotes(
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
    <div className="gd-almacen-mp-page">

      <PageHeader
        title="Almacén de materia prima"
        description="Consulta el stock consolidado de fibra y revisa cada compra como un lote completo."
        extra={
          <Space wrap>

            <Button
              icon={
                <ReloadOutlined />
              }
              loading={
                cargandoBase ||
                cargandoResumen ||
                cargandoLotes
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
                  '/gestion/compras-materia-prima/registrar'
                )
              }
            >
              Registrar lote
            </Button>

          </Space>
        }
      />


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-almacen-mp-kpis"
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Total comprado"
              value={
                Number(
                  indicadores
                    .total_comprado_kg ||
                  0
                )
              }
              precision={2}
              suffix="KG"
              prefix={
                <ShoppingCartOutlined />
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
                  indicadores
                    .stock_total_kg ||
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
          xl={6}
        >
          <Card>
            <Statistic
              title="Consumido"
              value={
                Number(
                  indicadores
                    .consumido_total_kg ||
                  0
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
          <Card>
            <Statistic
              title="Lotes registrados"
              value={
                Number(
                  indicadores
                    .lotes_registrados ||
                  0
                )
              }
            />
          </Card>
        </Col>

      </Row>


      <Card
        className="gd-almacen-mp-tabs-card"
      >

        <Tabs
          defaultActiveKey="resumen"
          items={
            tabItems
          }
        />

      </Card>

    </div>
  );
}


export default AlmacenMateriaPrima;
