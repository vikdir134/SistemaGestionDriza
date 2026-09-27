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
  Form,
  Input,
  InputNumber,
  Progress,
  Result,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined
} from '@ant-design/icons';

import {
  useCallback,
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

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatNumero
} from '../../utils/formatters';

import '../../styles/productosTerminadosAntd.css';


const {
  Text,
  Title
} = Typography;

const {
  TextArea
} = Input;


type CatalogoItem = {
  id: number;
  nombre: string;
};


type ComponenteForm = {
  material_id: number;
  color_id: number;
  porcentaje: number;
};


type ComposicionForm = {
  observacion?: string;
  componentes:
    ComponenteForm[];
};


type ComposicionDetalle = {
  producto_composicion_detalle_id:
    number;

  material: string;
  color: string;
  porcentaje: number;
};


type Composicion = {
  producto_composicion_id:
    number;

  version_numero: number;
  vigente: boolean;

  fecha_vigencia_desde:
    string | null;

  fecha_vigencia_hasta:
    string | null;

  observacion?:
    string | null;

  creado_por?:
    string | null;

  cantidad_componentes?:
    number;

  detalles?:
    ComposicionDetalle[];
};


type Producto = {
  producto_id: number;

  tipo_producto:
    string;

  material:
    string;

  medida:
    string;

  color:
    string;

  descripcion?:
    string | null;

  creado_por?:
    string | null;

  created_at?:
    string | null;

  composicion_vigente?:
    Composicion | null;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function ProductoTerminadoDetalle() {
  const {
    producto_id
  } = useParams();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    ComposicionForm
  >();

  const [
    producto,
    setProducto
  ] = useState<
    Producto | null
  >(null);

  const [
    composiciones,
    setComposiciones
  ] = useState<
    Composicion[]
  >([]);

  const [
    materiales,
    setMateriales
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
    errorCarga,
    setErrorCarga
  ] = useState('');

  const [
    editorAbierto,
    setEditorAbierto
  ] = useState(false);

  const [
    pageHistorial,
    setPageHistorial
  ] = useState(1);

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const cargarProducto =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/productos-terminados/${producto_id}`
          );

        setProducto(
          data.producto
        );
      },
      [
        producto_id
      ]
    );


  const cargarHistorial =
    useCallback(
      async (
        pagina: number
      ) => {
        const data =
          await apiFetch(
            `/productos-terminados/${producto_id}/composiciones?page=${pagina}&limit=10`
          );

        setComposiciones(
          data.composiciones ||
          []
        );

        setPaginacion(
          data.paginacion
        );
      },
      [
        producto_id
      ]
    );


  const cargarCatalogos =
    useCallback(
      async () => {
        const [
          materialesData,
          coloresData
        ] = await Promise.all([
          apiFetch(
            '/catalogos/materiales'
          ),

          apiFetch(
            '/catalogos/colores'
          )
        ]);

        setMateriales(
          materialesData.items ||
          []
        );

        setColores(
          coloresData.items ||
          []
        );
      },
      []
    );


  const cargarInicial =
    useCallback(
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await Promise.all([
            cargarProducto(),
            cargarHistorial(
              pageHistorial
            ),
            cargarCatalogos()
          ]);

        } catch (error) {
          setErrorCarga(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el producto terminado'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarCatalogos,
        cargarHistorial,
        cargarProducto,
        pageHistorial
      ]
    );


  useEffect(() => {
    cargarInicial();
  }, [
    cargarInicial
  ]);


  const componentesForm =
    Form.useWatch(
      'componentes',
      form
    ) || [];


  const totalPorcentaje =
    useMemo(
      () =>
        componentesForm.reduce(
          (
            total,
            componente
          ) =>
            total +
            Number(
              componente
                ?.porcentaje ||
              0
            ),
          0
        ),
      [
        componentesForm
      ]
    );


  const abrirEditor = () => {
    form.setFieldsValue({
      observacion: '',
      componentes: [
        {
          material_id:
            undefined as unknown as number,

          color_id:
            undefined as unknown as number,

          porcentaje:
            undefined as unknown as number
        }
      ]
    });

    setEditorAbierto(
      true
    );
  };


  const cerrarEditor = () => {
    if (procesando) {
      return;
    }

    form.resetFields();

    setEditorAbierto(
      false
    );
  };


  const validarComposicion = (
    values:
      ComposicionForm
  ) => {
    const usados =
      new Set<string>();

    for (
      let i = 0;
      i <
      values.componentes.length;
      i++
    ) {
      const componente =
        values.componentes[i];

      const clave =
        `${componente.material_id}-${componente.color_id}`;

      if (
        usados.has(
          clave
        )
      ) {
        return (
          `La materia prima ${i + 1} repite el mismo material y color`
        );
      }

      usados.add(
        clave
      );
    }

    const total =
      values.componentes
        .reduce(
          (
            acumulado,
            componente
          ) =>
            acumulado +
            Number(
              componente
                .porcentaje ||
              0
            ),
          0
        );


    if (
      Math.abs(
        total -
        100
      ) >
      0.000001
    ) {
      return (
        `La composición debe sumar 100.00%. Actualmente suma ${formatNumero(total)}%.`
      );
    }

    return null;
  };


  const publicarComposicion =
    async (
      values:
        ComposicionForm
    ) => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        const data =
          await apiFetch(
            `/productos-terminados/${producto_id}/composiciones`,
            {
              method: 'POST',

              body:
                JSON.stringify({
                  observacion:
                    values
                      .observacion
                      ?.trim() ||
                    null,

                  detalles:
                    values
                      .componentes
                      .map(
                        (
                          componente
                        ) => ({
                          material_id:
                            Number(
                              componente
                                .material_id
                            ),

                          color_id:
                            Number(
                              componente
                                .color_id
                            ),

                          porcentaje:
                            Number(
                              componente
                                .porcentaje
                            )
                        })
                      )
                })
            }
          );


        message.success(
          `Composición versión ${data.composicion.version_numero} publicada correctamente`
        );


        setEditorAbierto(
          false
        );

        form.resetFields();

        setPageHistorial(1);


        await Promise.all([
          cargarProducto(),
          cargarHistorial(1)
        ]);


        liberar();

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo publicar la composición'
        );

        throw error;
      }
    };


  const solicitarPublicacion =
    (
      values:
        ComposicionForm
    ) => {
      const error =
        validarComposicion(
          values
        );

      if (error) {
        message.error(
          error
        );

        return;
      }


      const composicionActual =
        producto
          ?.composicion_vigente;


      modal.confirm({
        title:
          composicionActual
            ? 'Publicar nueva versión'
            : 'Publicar composición',

        content:
          composicionActual
            ? 'La composición vigente pasará al historial y esta nueva versión será utilizada en las próximas producciones.'
            : 'Esta composición quedará vigente y será utilizada al registrar producción.',

        okText:
          'Publicar',

        cancelText:
          'Cancelar',

        onOk: () =>
          publicarComposicion(
            values
          )
      });
    };


  const fechaTexto = (
    valor:
      string | null |
      undefined
  ) => {
    if (!valor) {
      return '-';
    }

    return new Date(
      valor
    ).toLocaleString(
      'es-PE'
    );
  };


  const composicionActual =
    producto
      ?.composicion_vigente ||
    null;


  const historialColumns:
    TableColumnsType<
      Composicion
    > = [
    {
      title: 'Versión',
      dataIndex:
        'version_numero',
      key:
        'version_numero',
      width: 100,

      render: (
        value: number
      ) => (
        <Text strong>
          V{value}
        </Text>
      )
    },

    {
      title: 'Estado',
      dataIndex:
        'vigente',
      key:
        'vigente',
      width: 120,

      render: (
        vigente: boolean
      ) =>
        vigente
          ? (
              <Tag
                color="success"
              >
                Vigente
              </Tag>
            )
          : (
              <Tag>
                Histórica
              </Tag>
            )
    },

    {
      title:
        'Vigente desde',
      dataIndex:
        'fecha_vigencia_desde',
      key:
        'fecha_vigencia_desde',
      width: 180,

      render: (
        value:
          string | null
      ) =>
        fechaTexto(
          value
        )
    },

    {
      title:
        'Vigente hasta',
      dataIndex:
        'fecha_vigencia_hasta',
      key:
        'fecha_vigencia_hasta',
      width: 180,
      responsive: [
        'lg'
      ],

      render: (
        value:
          string | null
      ) =>
        fechaTexto(
          value
        )
    },

    {
      title:
        'Materias primas',
      dataIndex:
        'cantidad_componentes',
      key:
        'cantidad_componentes',
      width: 140
    },

    {
      title:
        'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',
      responsive: [
        'md'
      ],

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    }
  ];


  if (cargando) {
    return (
      <div className="gd-pt-page">

        <Skeleton
          active
          paragraph={{
            rows: 10
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !producto
  ) {
    return (
      <div className="gd-pt-page">

        <BackButton
          to="/gestion/productos-terminados"
          label="Volver a productos terminados"
        />


        <Result
          status="error"
          title="No se pudo cargar el producto"
          subTitle={
            errorCarga ||
            'Producto no encontrado'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-pt-page">

      <BackButton
        to="/gestion/productos-terminados"
        label="Volver a productos terminados"
      />


      <PageHeader
        title={
          `${producto.tipo_producto} · ${producto.material} · ${producto.medida} · ${producto.color}`
        }
        description="Producto terminado y composición de materia prima."
        extra={
          !editorAbierto
            ? (
                <Button
                  type="primary"
                  icon={
                    <PlusOutlined />
                  }
                  onClick={
                    abrirEditor
                  }
                >
                  {
                    composicionActual
                      ? 'Nueva versión de composición'
                      : 'Definir composición'
                  }
                </Button>
              )
            : undefined
        }
      />


      <Card
        title="Identidad del producto"
        className="gd-pt-detail-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 4
          }}
          items={[
            {
              key: 'tipo',
              label: 'Tipo',
              children:
                producto
                  .tipo_producto
            },

            {
              key: 'material',
              label: 'Material',
              children:
                producto.material
            },

            {
              key: 'medida',
              label: 'Medida',
              children:
                producto.medida
            },

            {
              key: 'color',
              label: 'Color',
              children:
                producto.color
            },

            {
              key: 'descripcion',
              label: 'Descripción',
              span: 4,
              children:
                producto
                  .descripcion ||
                '-'
            }
          ]}
        />

      </Card>


      {
        composicionActual
          ? (
              <Card
                title="Composición vigente"
                extra={
                  <Tag
                    color="success"
                  >
                    V{
                      composicionActual
                        .version_numero
                    }
                  </Tag>
                }
                className="gd-pt-detail-card"
              >

                <div className="gd-pt-composition-meta">

                  <Text
                    type="secondary"
                  >
                    Vigente desde {
                      fechaTexto(
                        composicionActual
                          .fecha_vigencia_desde
                      )
                    }
                  </Text>

                  <Text strong>
                    Total 100.00%
                  </Text>

                </div>


                <Row
                  gutter={[
                    14,
                    14
                  ]}
                >

                  {
                    (
                      composicionActual
                        .detalles ||
                      []
                    ).map(
                      (
                        componente
                      ) => (
                        <Col
                          xs={24}
                          md={12}
                          key={
                            componente
                              .producto_composicion_detalle_id
                          }
                        >

                          <Card
                            size="small"
                            className="gd-pt-component-card"
                          >

                            <div className="gd-pt-component-head">

                              <div>
                                <Text strong>
                                  {
                                    componente.material
                                  }
                                </Text>

                                <Text
                                  type="secondary"
                                >
                                  {
                                    componente.color
                                  }
                                </Text>
                              </div>

                              <Text strong>
                                {
                                  formatNumero(
                                    componente
                                      .porcentaje
                                  )
                                }%
                              </Text>

                            </div>


                            <Progress
                              percent={
                                Number(
                                  componente
                                    .porcentaje
                                )
                              }
                              showInfo={
                                false
                              }
                            />

                          </Card>

                        </Col>
                      )
                    )
                  }

                </Row>


                {
                  composicionActual
                    .observacion &&
                  (
                    <Alert
                      type="info"
                      showIcon
                      message="Observación"
                      description={
                        composicionActual
                          .observacion
                      }
                      className="gd-pt-composition-note"
                    />
                  )
                }

              </Card>
            )
          : (
              <Alert
                type="warning"
                showIcon
                message="Composición pendiente"
                description="Este producto todavía no tiene definida la materia prima que consume. Debe configurarse antes de registrar producción."
                className="gd-pt-detail-card"
              />
            )
      }


      {
        editorAbierto &&
        (
          <Card
            title={
              composicionActual
                ? 'Nueva versión de composición'
                : 'Definir composición'
            }
            extra={
              <Tag
                color={
                  Math.abs(
                    totalPorcentaje -
                    100
                  ) <=
                  0.000001
                    ? 'success'
                    : 'warning'
                }
              >
                Total {
                  formatNumero(
                    totalPorcentaje
                  )
                }%
              </Tag>
            }
            className="gd-pt-detail-card"
          >

            <Form<
              ComposicionForm
            >
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={
                solicitarPublicacion
              }
              disabled={
                procesando
              }
              initialValues={{
                observacion: '',
                componentes: [
                  {}
                ]
              }}
            >

              <Alert
                type="info"
                showIcon
                message="La composición debe sumar exactamente 100.00%."
                className="gd-pt-editor-rule"
              />


              <Form.List
                name="componentes"
              >
                {(
                  fields,
                  {
                    add,
                    remove
                  }
                ) => (
                  <Space
                    direction="vertical"
                    size={14}
                    className="gd-pt-list-space"
                  >

                    {
                      fields.map(
                        (
                          field,
                          index
                        ) => (
                          <Card
                            size="small"
                            title={
                              `Materia prima ${index + 1}`
                            }
                            key={
                              field.key
                            }
                            extra={
                              <Button
                                type="text"
                                danger
                                icon={
                                  <DeleteOutlined />
                                }
                                disabled={
                                  fields.length ===
                                    1 ||
                                  procesando
                                }
                                onClick={() =>
                                  remove(
                                    field.name
                                  )
                                }
                              >
                                Quitar
                              </Button>
                            }
                          >

                            <Row
                              gutter={[
                                14,
                                0
                              ]}
                            >

                              <Col
                                xs={24}
                                md={9}
                              >

                                <Form.Item
                                  label="Material"
                                  name={[
                                    field.name,
                                    'material_id'
                                  ]}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Selecciona el material'
                                    }
                                  ]}
                                >
                                  <Select
                                    showSearch
                                    optionFilterProp="label"
                                    placeholder="Selecciona el material"
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
                                md={9}
                              >

                                <Form.Item
                                  label="Color"
                                  name={[
                                    field.name,
                                    'color_id'
                                  ]}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Selecciona el color'
                                    }
                                  ]}
                                >
                                  <Select
                                    showSearch
                                    optionFilterProp="label"
                                    placeholder="Selecciona el color"
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
                                md={6}
                              >

                                <Form.Item
                                  label="Porcentaje"
                                  name={[
                                    field.name,
                                    'porcentaje'
                                  ]}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Ingresa el porcentaje'
                                    }
                                  ]}
                                >
                                  <InputNumber
                                    min={0.01}
                                    max={100}
                                    precision={2}
                                    step={0.01}
                                    addonAfter="%"
                                    className="gd-full-width"
                                    placeholder="0.00"
                                  />
                                </Form.Item>

                              </Col>

                            </Row>

                          </Card>
                        )
                      )
                    }


                    <Button
                      block
                      type="dashed"
                      icon={
                        <PlusOutlined />
                      }
                      onClick={() =>
                        add({})
                      }
                      disabled={
                        procesando
                      }
                    >
                      Agregar materia prima
                    </Button>

                  </Space>
                )}
              </Form.List>


              <Form.Item
                label="Observación de esta versión"
                name="observacion"
                rules={[
                  {
                    max: 400,
                    message:
                      'La observación no puede superar 400 caracteres'
                  }
                ]}
                className="gd-pt-editor-observation"
              >
                <TextArea
                  rows={3}
                  maxLength={400}
                  showCount
                  placeholder="Ejemplo: Ajuste de fórmula por cambio de producción"
                />
              </Form.Item>


              <div className="gd-pt-form-actions">

                <Space
                  wrap
                >

                  <Button
                    onClick={
                      cerrarEditor
                    }
                    disabled={
                      procesando
                    }
                  >
                    Cancelar
                  </Button>


                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <SaveOutlined />
                    }
                    loading={
                      procesando
                    }
                  >
                    Revisar y publicar
                  </Button>

                </Space>

              </div>

            </Form>

          </Card>
        )
      }


      <Card
        title="Historial de composiciones"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } versión(es)
          </Text>
        }
        className="gd-pt-detail-card"
      >

        <Table<Composicion>
          rowKey="producto_composicion_id"
          columns={
            historialColumns
          }
          dataSource={
            composiciones
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
                description="Este producto todavía no tiene historial de composiciones"
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
              `${total} versión(es)`,

            onChange: (
              nuevaPagina
            ) => {
              setPageHistorial(
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
  ProductoTerminadoDetalle;
