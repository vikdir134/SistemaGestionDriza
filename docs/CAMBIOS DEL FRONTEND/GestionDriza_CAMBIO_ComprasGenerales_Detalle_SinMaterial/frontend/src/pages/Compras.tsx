import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

import type {
  Dayjs
} from 'dayjs';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import PageHeader
  from '../components/ui/PageHeader';

import {
  formatCantidad,
  formatMonto,
  formatPrecio
} from '../utils/formatters';

import '../styles/comprasGeneralesAntd.css';


const {
  Text
} = Typography;

const {
  TextArea
} = Input;


type Proveedor = {
  proveedor_id: number;
  ruc: string;
  razon_social: string;
};


type Unidad = {
  unidad_medida_id: number;
  codigo: string;
  descripcion?: string | null;
};


type DetalleCompraForm = {
  descripcion_item?: string;
  cantidad?: number;
  unidad_medida_id?: number;
  precio_unitario?: number;
};


type CompraForm = {
  proveedor_id: number;
  fecha_compra?: Dayjs | null;
  numero_documento?: string;
  moneda_codigo: 'PEN' | 'USD';
  descripcion?: string;
  detalles:
    DetalleCompraForm[];
};


type CompraListado = {
  compra_id: number;
  proveedor_id: number;
  ruc: string;
  razon_social: string;

  fecha_compra: string;
  numero_documento?: string | null;

  monto_total: number;
  moneda_codigo:
    'PEN' | 'USD';

  descripcion?: string | null;
  created_at?: string | null;
  registrado_por: string;
  cantidad_items: number;
};


type Filtros = {
  proveedor_id?: number;
  q?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function Compras() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    compraForm
  ] = Form.useForm<
    CompraForm
  >();

  const [
    filtrosForm
  ] = Form.useForm<
    Filtros
  >();

  const [
    compras,
    setCompras
  ] = useState<
    CompraListado[]
  >([]);

  const [
    proveedores,
    setProveedores
  ] = useState<
    Proveedor[]
  >([]);

  const [
    unidades,
    setUnidades
  ] = useState<
    Unidad[]
  >([]);

  const [
    cargandoBase,
    setCargandoBase
  ] = useState(true);

  const [
    cargandoCompras,
    setCargandoCompras
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


  const {
    procesando:
      registrandoCompra,

    intentarBloquear:
      bloquearCompra,

    liberar:
      liberarCompra
  } = useBloqueoAccion();


  const detallesActuales =
    Form.useWatch(
      'detalles',
      compraForm
    ) || [];


  const monedaActual =
    Form.useWatch(
      'moneda_codigo',
      compraForm
    ) || 'PEN';


  const totalCompra =
    useMemo(
      () =>
        detallesActuales.reduce(
          (
            total,
            item
          ) =>
            total +
            Number(
              item
                ?.cantidad ||
              0
            ) *
            Number(
              item
                ?.precio_unitario ||
              0
            ),
          0
        ),
      [
        detallesActuales
      ]
    );


  const cargarCatalogosBase =
    useCallback(
      async () => {
        const [
          proveedoresData,
          unidadesData
        ] = await Promise.all([
          apiFetch(
            '/proveedores'
          ),

          apiFetch(
            '/catalogos/unidades-medida'
          )
        ]);


        setProveedores(
          proveedoresData
            .proveedores ||
          []
        );

        setUnidades(
          unidadesData.unidades ||
          []
        );
      },
      []
    );


  const cargarCompras =
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

        if (
          filtros.q
            ?.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }


        const comprasData =
          await apiFetch(
            `/compras?${params.toString()}`
          );


        setCompras(
          comprasData.compras ||
          []
        );

        setPaginacion(
          comprasData.paginacion
        );
      },
      []
    );


  const cargarInicial =
    useCallback(
      async () => {
        setCargandoBase(true);
        setCargandoCompras(true);

        try {
          await Promise.all([
            cargarCatalogosBase(),
            cargarCompras(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar las compras'
          );

        } finally {
          setCargandoBase(false);
          setCargandoCompras(false);
        }
      },
      [
        cargarCatalogosBase,
        cargarCompras,
        filtrosAplicados,
        message,
        page
      ]
    );


  useEffect(() => {
    cargarInicial();
  }, [
    cargarInicial
  ]);


  const recargarListado =
    async () => {
      setCargandoCompras(true);

      try {
        await cargarCompras(
          page,
          filtrosAplicados
        );

      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el listado'
        );

      } finally {
        setCargandoCompras(false);
      }
    };


  const validarItems =
    (
      values:
        CompraForm
    ) => {
      if (
        !values.detalles ||
        values.detalles.length ===
          0
      ) {
        return (
          'La compra debe tener al menos un ítem'
        );
      }


      for (
        let index = 0;
        index <
        values.detalles.length;
        index++
      ) {
        const item =
          values.detalles[
            index
          ];


        if (
          !item
            .descripcion_item
            ?.trim()
        ) {
          return (
            `El ítem ${index + 1} debe tener una descripción`
          );
        }


        if (
          Number(
            item.cantidad ||
            0
          ) <= 0
        ) {
          return (
            `El ítem ${index + 1} debe tener una cantidad mayor a 0`
          );
        }


        if (
          !item
            .unidad_medida_id
        ) {
          return (
            `El ítem ${index + 1} debe tener una unidad`
          );
        }


        if (
          Number(
            item
              .precio_unitario ||
            0
          ) <= 0
        ) {
          return (
            `El ítem ${index + 1} debe tener un precio unitario mayor a 0`
          );
        }
      }


      return null;
    };


  const registrarCompra =
    async (
      values:
        CompraForm
    ) => {
      const error =
        validarItems(
          values
        );


      if (error) {
        message.error(
          error
        );

        return;
      }


      if (
        !bloquearCompra()
      ) {
        return;
      }


      let compraRegistrada =
        false;


      try {
        await apiFetch(
          '/compras',
          {
            method: 'POST',

            body:
              JSON.stringify({
                proveedor_id:
                  Number(
                    values
                      .proveedor_id
                  ),

                fecha_compra:
                  values
                    .fecha_compra
                    ?.format(
                      'YYYY-MM-DD'
                    ) ||
                  undefined,

                numero_documento:
                  values
                    .numero_documento
                    ?.trim() ||
                  '',

                moneda_codigo:
                  values
                    .moneda_codigo,

                descripcion:
                  values
                    .descripcion
                    ?.trim() ||
                  '',

                detalles:
                  values.detalles.map(
                    (item) => ({
                      descripcion_item:
                        item
                          .descripcion_item
                          ?.trim() ||
                        '',

                      cantidad:
                        Number(
                          item
                            .cantidad
                        ),

                      unidad_medida_id:
                        Number(
                          item
                            .unidad_medida_id
                        ),

                      precio_unitario:
                        Number(
                          item
                            .precio_unitario
                        )
                    })
                  )
              })
          }
        );


        compraRegistrada =
          true;


        message.success(
          'Compra registrada correctamente'
        );


        compraForm.resetFields();

        compraForm.setFieldsValue({
          moneda_codigo:
            'PEN',

          detalles: [
            {
              descripcion_item:
                '',

              cantidad:
                undefined,

              unidad_medida_id:
                undefined,

              precio_unitario:
                undefined
            }
          ]
        } as Partial<CompraForm>);


        setPage(1);


        try {
          await cargarCompras(
            1,
            filtrosAplicados
          );

        } catch (errorListado) {
          console.error(
            'La compra fue registrada, pero no se pudo actualizar el listado:',
            errorListado
          );

          message.warning(
            'La compra fue registrada, pero no se pudo actualizar el listado. Usa Actualizar para verla.'
          );
        }


        liberarCompra();

      } catch (error) {
        if (
          !compraRegistrada
        ) {
          liberarCompra();

          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo registrar la compra'
          );
        }
      }
    };


  const aplicarFiltros =
    (
      values:
        Filtros
    ) => {
      setPage(1);

      setFiltrosAplicados({
        proveedor_id:
          values.proveedor_id,

        q:
          values.q
            ?.trim() ||
          ''
      });
    };


  const limpiarFiltros =
    () => {
      filtrosForm
        .resetFields();

      setPage(1);
      setFiltrosAplicados({});
    };


  const columns:
    TableColumnsType<
      CompraListado
    > = [
    {
      title: 'Proveedor',
      key: 'proveedor',
      minWidth: 220,

      render: (
        _,
        compra
      ) => (
        <div className="gd-compra-provider-cell">

          <Text strong>
            {
              compra
                .razon_social
            }
          </Text>

          <Text
            type="secondary"
          >
            {compra.ruc}
          </Text>

        </div>
      )
    },

    {
      title: 'Fecha',
      dataIndex:
        'fecha_compra',
      key:
        'fecha_compra',
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
      title: 'Documento',
      dataIndex:
        'numero_documento',
      key:
        'numero_documento',
      width: 170,

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
      title: 'Descripción',
      dataIndex:
        'descripcion',
      key:
        'descripcion',
      minWidth: 220,
      responsive: [
        'lg'
      ],

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title: 'Total',
      key: 'total',
      width: 165,

      render: (
        _,
        compra
      ) => (
        <Space
          size={6}
        >

          <Text strong>
            {
              formatMonto(
                compra
                  .monto_total
              )
            }
          </Text>

          <Tag
            color={
              compra
                .moneda_codigo ===
                'PEN'
                ? 'blue'
                : 'green'
            }
          >
            {
              compra
                .moneda_codigo
            }
          </Tag>

        </Space>
      )
    },

    {
      title: 'Ítems',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 90,

      render: (
        value: number
      ) => (
        <Tag>
          {value}
        </Tag>
      )
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
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 145,

      render: (
        _,
        compra
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/compras/${compra.compra_id}`
            )
          }
        >
          Ver detalle
        </Button>
      )
    }
  ];


  return (
    <div className="gd-compras-page">

      <PageHeader
        title="Compras generales"
        description="Registra compras a proveedores que no forman parte del flujo específico de materia prima por lotes."
      />


      <Card
        title="Registrar compra"
        className="gd-compras-register-card"
      >

        <Form<CompraForm>
          form={
            compraForm
          }
          layout="vertical"
          requiredMark={false}
          disabled={
            registrandoCompra
          }
          initialValues={{
            moneda_codigo:
              'PEN',

            detalles: [
              {
                descripcion_item:
                  '',

                cantidad:
                  undefined,

                unidad_medida_id:
                  undefined,

                precio_unitario:
                  undefined
              }
            ]
          }}
          onFinish={
            registrarCompra
          }
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              lg={10}
            >

              <Form.Item
                label="Proveedor"
                name="proveedor_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona un proveedor'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  loading={
                    cargandoBase
                  }
                  placeholder="Selecciona un proveedor"
                  options={
                    proveedores.map(
                      (proveedor) => ({
                        value:
                          proveedor
                            .proveedor_id,

                        label:
                          `${proveedor.razon_social} · ${proveedor.ruc}`
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
                label="Fecha de compra"
                name="fecha_compra"
              >
                <DatePicker
                  size="large"
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  placeholder="Hoy si se deja vacío"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={5}
            >

              <Form.Item
                label="Moneda"
                name="moneda_codigo"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona la moneda'
                  }
                ]}
              >
                <Select
                  size="large"
                  options={[
                    {
                      value: 'PEN',
                      label:
                        'Soles (PEN)'
                    },
                    {
                      value: 'USD',
                      label:
                        'Dólares (USD)'
                    }
                  ]}
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={4}
            >

              <Form.Item
                label="Documento"
                name="numero_documento"
              >
                <Input
                  size="large"
                  maxLength={100}
                  placeholder="Factura, boleta..."
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
            >

              <Form.Item
                label="Descripción"
                name="descripcion"
                rules={[
                  {
                    max: 400,
                    message:
                      'La descripción no puede superar 400 caracteres'
                  }
                ]}
              >
                <TextArea
                  rows={2}
                  maxLength={400}
                  showCount
                  placeholder="Descripción general de la compra"
                />
              </Form.Item>

            </Col>

          </Row>


          <Form.List
            name="detalles"
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
                className="gd-compras-items-space"
              >

                <div className="gd-compras-items-heading">

                  <Text strong>
                    Ítems de compra
                  </Text>


                  <Button
                    type="primary"
                    ghost
                    icon={
                      <PlusOutlined />
                    }
                    disabled={
                      registrandoCompra
                    }
                    onClick={() =>
                      add({
                        descripcion_item:
                          '',

                        cantidad:
                          undefined,

                        unidad_medida_id:
                          undefined,

                        precio_unitario:
                          undefined
                      })
                    }
                  >
                    Agregar ítem
                  </Button>

                </div>


                {
                  fields.map(
                    (
                      field,
                      index
                    ) => {
                      const item =
                        detallesActuales[
                          index
                        ] || {};

                      const subtotal =
                        Number(
                          item.cantidad ||
                          0
                        ) *
                        Number(
                          item
                            .precio_unitario ||
                          0
                        );


                      return (
                        <Card
                          key={
                            field.key
                          }
                          size="small"
                          title={
                            `Ítem ${index + 1}`
                          }
                          extra={
                            <Button
                              type="text"
                              danger
                              icon={
                                <DeleteOutlined />
                              }
                              disabled={
                                registrandoCompra ||
                                fields.length ===
                                  1
                              }
                              onClick={() => {
                                if (
                                  fields.length ===
                                  1
                                ) {
                                  message.warning(
                                    'La compra debe tener al menos un ítem'
                                  );

                                  return;
                                }

                                remove(
                                  field.name
                                );
                              }}
                            >
                              Quitar
                            </Button>
                          }
                          className="gd-compra-item-card"
                        >

                          <Row
                            gutter={[
                              14,
                              0
                            ]}
                          >
                            <Col
                              xs={24}
                              md={12}
                              xl={9}
                            >

                              <Form.Item
                                label="Descripción del ítem"
                                name={[
                                  field.name,
                                  'descripcion_item'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      'Ingresa la descripción'
                                  },
                                  {
                                    max: 300,
                                    message:
                                      'La descripción no puede superar 300 caracteres'
                                  }
                                ]}
                              >
                                <Input
                                  maxLength={300}
                                  placeholder="Ejemplo: Cajas para embalaje"
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              sm={12}
                              xl={3}
                            >

                              <Form.Item
                                label="Cantidad"
                                name={[
                                  field.name,
                                  'cantidad'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Ingresa cantidad'
                                  }
                                ]}
                              >
                                <InputNumber
                                  min={0.01}
                                  precision={2}
                                  step={0.01}
                                  className="gd-full-width"
                                  placeholder="0.00"
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              sm={12}
                              xl={3}
                            >

                              <Form.Item
                                label="Unidad"
                                name={[
                                  field.name,
                                  'unidad_medida_id'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Selecciona unidad'
                                  }
                                ]}
                              >
                                <Select
                                  placeholder="Unidad"
                                  options={
                                    unidades.map(
                                      (unidad) => ({
                                        value:
                                          unidad
                                            .unidad_medida_id,

                                        label:
                                          unidad.codigo
                                      })
                                    )
                                  }
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              sm={12}
                              xl={3}
                            >

                              <Form.Item
                                label="Precio unitario"
                                name={[
                                  field.name,
                                  'precio_unitario'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Ingresa precio'
                                  }
                                ]}
                              >
                                <InputNumber
                                  min={0.01}
                                  precision={2}
                                  step={0.01}
                                  className="gd-full-width"
                                  placeholder="0.00"
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              sm={12}
                              xl={3}
                            >

                              <Form.Item
                                label="Subtotal"
                              >
                                <Input
                                  value={
                                    formatMonto(
                                      subtotal
                                    )
                                  }
                                  suffix={
                                    monedaActual
                                  }
                                  disabled
                                />
                              </Form.Item>

                            </Col>

                          </Row>

                        </Card>
                      );
                    }
                  )
                }

              </Space>
            )}
          </Form.List>


          <Card
            size="small"
            className="gd-compras-total-card"
          >

            <div className="gd-compras-total-row">

              <Statistic
                title="Ítems"
                value={
                  detallesActuales
                    .length
                }
              />


              <Statistic
                title="Total compra"
                value={
                  Number(
                    totalCompra
                  )
                }
                precision={2}
                suffix={
                  monedaActual
                }
                prefix={
                  <ShoppingCartOutlined />
                }
              />

            </div>

          </Card>


          <div className="gd-compras-actions">

            <Button
              type="primary"
              htmlType="submit"
              icon={
                <ShoppingCartOutlined />
              }
              loading={
                registrandoCompra
              }
              disabled={
                cargandoBase
              }
            >
              Guardar compra
            </Button>

          </div>

        </Form>

      </Card>


      <Card
        title="Filtros"
        className="gd-compras-filter-card"
      >

        <Form<Filtros>
          form={
            filtrosForm
          }
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
                label="Proveedor"
                name="proveedor_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos los proveedores"
                  options={
                    proveedores.map(
                      (proveedor) => ({
                        value:
                          proveedor
                            .proveedor_id,

                        label:
                          `${proveedor.razon_social} · ${proveedor.ruc}`
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
                  placeholder="Proveedor, RUC, documento o descripción"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={6}
            >

              <Form.Item
                label=" "
                className="gd-compras-filter-actions"
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
                      cargandoCompras
                    }
                    onClick={
                      recargarListado
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
        title="Listado de compras"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } compra(s)
          </Text>
        }
        className="gd-compras-table-card"
      >

        <Table<
          CompraListado
        >
          rowKey="compra_id"
          columns={columns}
          dataSource={
            compras
          }
          loading={
            cargandoCompras
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
                description="No hay compras registradas"
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
              `${total} compra(s)`,

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


export default Compras;
