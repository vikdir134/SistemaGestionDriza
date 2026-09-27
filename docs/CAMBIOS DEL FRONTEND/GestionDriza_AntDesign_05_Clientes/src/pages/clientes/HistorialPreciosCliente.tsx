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
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DollarOutlined,
  ReloadOutlined,
  SaveOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useSearchParams
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

import '../../styles/clientes.css';


const {
  Text
} = Typography;

const {
  TextArea
} = Input;


type ClienteOption = {
  cliente_id: number;
  razon_social: string;
  ruc: string;
};


type CatalogoItem = {
  id: number;
  nombre: string;
};


type Precio = {
  precio_cliente_id: number;
  cliente_id: number;
  razon_social: string;
  ruc: string;
  tipo_producto: string;
  medida: string;
  color: string;
  material: string;
  fecha_precio: string;
  precio_unitario: number;
  moneda_codigo: 'PEN' | 'USD';
  registrado_por: string;
  observacion?: string | null;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


type PrecioFormValues = {
  cliente_id: number;
  tipo_producto_id: number;
  medida_id: number;
  color_id: number;
  material_id: number;
  fecha_precio?: any;
  precio_unitario: number;
  moneda_codigo: 'PEN' | 'USD';
  observacion?: string;
};


type FiltroValues = {
  cliente_id?: number;
  q?: string;
};


function HistorialPreciosCliente() {
  const [
    searchParams
  ] = useSearchParams();

  const clienteIdInicial =
    searchParams.get(
      'cliente_id'
    );

  const {
    message
  } = AntdApp.useApp();

  const [
    formPrecio
  ] = Form.useForm<
    PrecioFormValues
  >();

  const [
    formFiltros
  ] = Form.useForm<
    FiltroValues
  >();

  const [
    clientes,
    setClientes
  ] = useState<
    ClienteOption[]
  >([]);

  const [
    precios,
    setPrecios
  ] = useState<
    Precio[]
  >([]);

  const [
    tipos,
    setTipos
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
    materiales,
    setMateriales
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<FiltroValues>({
    cliente_id:
      clienteIdInicial
        ? Number(
            clienteIdInicial
          )
        : undefined,

    q: ''
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

  const [
    cargandoBase,
    setCargandoBase
  ] = useState(true);

  const [
    cargandoPrecios,
    setCargandoPrecios
  ] = useState(true);

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const cargarBase =
    useCallback(
      async () => {
        setCargandoBase(true);

        try {
          const [
            clientesData,
            tiposData,
            medidasData,
            coloresData,
            materialesData
          ] = await Promise.all([
            apiFetch(
              '/clientes/select'
            ),

            apiFetch(
              '/catalogos/tiposProducto'
            ),

            apiFetch(
              '/catalogos/medidas'
            ),

            apiFetch(
              '/catalogos/colores'
            ),

            apiFetch(
              '/catalogos/materiales'
            )
          ]);


          setClientes(
            clientesData.clientes ||
            []
          );

          setTipos(
            tiposData.items ||
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

          setMateriales(
            materialesData.items ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos necesarios'
          );

        } finally {
          setCargandoBase(false);
        }
      },
      [
        message
      ]
    );


  const cargarPrecios =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltroValues
      ) => {
        setCargandoPrecios(
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
            filtros.cliente_id
          ) {
            params.set(
              'cliente_id',
              String(
                filtros
                  .cliente_id
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

          const data =
            await apiFetch(
              `/clientes/precios?${params.toString()}`
            );

          setPrecios(
            data.precios ||
            []
          );

          setPaginacion(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el historial de precios'
          );

        } finally {
          setCargandoPrecios(
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

    formPrecio.setFieldsValue({
      cliente_id:
        clienteIdInicial
          ? Number(
              clienteIdInicial
            )
          : undefined,

      moneda_codigo: 'PEN'
    });

    formFiltros.setFieldsValue({
      cliente_id:
        clienteIdInicial
          ? Number(
              clienteIdInicial
            )
          : undefined,

      q: ''
    });
  }, [
    clienteIdInicial,
    cargarBase,
    formPrecio,
    formFiltros
  ]);


  useEffect(() => {
    cargarPrecios(
      page,
      filtrosAplicados
    );
  }, [
    page,
    filtrosAplicados,
    cargarPrecios
  ]);


  const clienteOptions =
    useMemo(
      () =>
        clientes.map(
          (cliente) => ({
            value:
              cliente.cliente_id,

            label:
              `${cliente.razon_social} · ${cliente.ruc}`
          })
        ),
      [
        clientes
      ]
    );


  const registrarPrecio =
    async (
      values:
        PrecioFormValues
    ) => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      const clienteActual =
        values.cliente_id;

      try {
        await apiFetch(
          '/clientes/precios',
          {
            method: 'POST',

            body:
              JSON.stringify({
                cliente_id:
                  Number(
                    values.cliente_id
                  ),

                tipo_producto_id:
                  Number(
                    values
                      .tipo_producto_id
                  ),

                medida_id:
                  Number(
                    values.medida_id
                  ),

                color_id:
                  Number(
                    values.color_id
                  ),

                material_id:
                  Number(
                    values.material_id
                  ),

                fecha_precio:
                  values
                    .fecha_precio
                    ?.format(
                      'YYYY-MM-DD'
                    ) ||
                  undefined,

                precio_unitario:
                  Number(
                    values
                      .precio_unitario
                  ),

                moneda_codigo:
                  values
                    .moneda_codigo,

                observacion:
                  values
                    .observacion
                    ?.trim() ||
                  ''
              })
          }
        );


        message.success(
          'Precio registrado correctamente'
        );


        formPrecio.resetFields();

        formPrecio.setFieldsValue({
          cliente_id:
            clienteActual,
          moneda_codigo:
            'PEN'
        });


        setPage(1);

        await cargarPrecios(
          1,
          filtrosAplicados
        );


        liberar();

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el precio'
        );
      }
    };


  const aplicarFiltros =
    (
      values:
        FiltroValues
    ) => {
      setPage(1);

      setFiltrosAplicados({
        cliente_id:
          values.cliente_id,

        q:
          values.q
            ?.trim() ||
          ''
      });
    };


  const limpiarFiltros =
    () => {
      formFiltros.resetFields();

      setPage(1);

      setFiltrosAplicados({
        cliente_id:
          undefined,
        q: ''
      });
    };


  const columns:
    TableColumnsType<Precio> = [
    {
      title: 'Cliente',
      key: 'cliente',
      minWidth: 210,

      render: (
        _,
        precio
      ) => (
        <div className="gd-precio-cliente">

          <Text strong>
            {
              precio
                .razon_social
            }
          </Text>

          <Text
            type="secondary"
          >
            {precio.ruc}
          </Text>

        </div>
      )
    },

    {
      title: 'Producto',
      key: 'producto',
      minWidth: 220,

      render: (
        _,
        precio
      ) => (
        <Space
          size={[
            4,
            4
          ]}
          wrap
        >

          <Tag>
            {
              precio
                .tipo_producto
            }
          </Tag>

          <Tag>
            {
              precio.medida
            }
          </Tag>

          <Tag>
            {
              precio.color
            }
          </Tag>

          <Tag>
            {
              precio.material
            }
          </Tag>

        </Space>
      )
    },

    {
      title: 'Fecha',
      dataIndex:
        'fecha_precio',
      key:
        'fecha_precio',
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
      title: 'Precio',
      key: 'precio',
      width: 160,

      render: (
        _,
        precio
      ) => (
        <Space
          size={6}
        >

          <Text strong>
            {
              Number(
                precio
                  .precio_unitario
              ).toFixed(4)
            }
          </Text>

          <Tag
            color={
              precio
                .moneda_codigo ===
                'PEN'
                ? 'blue'
                : 'green'
            }
          >
            {
              precio
                .moneda_codigo
            }
          </Tag>

        </Space>
      )
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      responsive: [
        'lg'
      ]
    },

    {
      title:
        'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',
      responsive: [
        'xl'
      ],

      render: (
        value?: string | null
      ) =>
        value || '-'
    }
  ];


  return (
    <div className="gd-clientes-page">

      <BackButton
        to="/gestion/clientes"
        label="Volver a clientes"
      />


      <PageHeader
        title="Historial de precios"
        description="Consulta y registra los precios acordados por cliente y producto."
      />


      <Card
        title="Registrar precio"
        className="gd-clientes-form-card gd-precios-form-card"
      >

        <Form<PrecioFormValues>
          form={
            formPrecio
          }
          layout="vertical"
          requiredMark={false}
          onFinish={
            registrarPrecio
          }
          disabled={
            procesando ||
            cargandoBase
          }
          initialValues={{
            moneda_codigo:
              'PEN'
          }}
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              lg={12}
            >

              <Form.Item
                label="Cliente"
                name="cliente_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona un cliente'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Selecciona un cliente"
                  loading={
                    cargandoBase
                  }
                  options={
                    clienteOptions
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
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
                      value:
                        'PEN',
                      label:
                        'Soles (PEN)'
                    },
                    {
                      value:
                        'USD',
                      label:
                        'Dólares (USD)'
                    }
                  ]}
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
            >

              <Form.Item
                label="Fecha del precio"
                name="fecha_precio"
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
              lg={6}
            >

              <Form.Item
                label="Tipo"
                name="tipo_producto_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona el tipo'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Tipo"
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
              lg={6}
            >

              <Form.Item
                label="Medida"
                name="medida_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona la medida'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Medida"
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
              lg={6}
            >

              <Form.Item
                label="Color"
                name="color_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona el color'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Color"
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
            >

              <Form.Item
                label="Material"
                name="material_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona el material'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Material"
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
              md={8}
            >

              <Form.Item
                label="Precio unitario"
                name="precio_unitario"
                rules={[
                  {
                    required: true,
                    message:
                      'Ingresa el precio'
                  }
                ]}
              >
                <InputNumber
                  size="large"
                  min={0.0001}
                  precision={4}
                  step={0.0001}
                  className="gd-full-width"
                  placeholder="0.0000"
                  prefix={
                    <DollarOutlined />
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={16}
            >

              <Form.Item
                label="Observación"
                name="observacion"
              >
                <TextArea
                  rows={2}
                  maxLength={300}
                  showCount
                  placeholder="Ejemplo: Precio acordado por volumen"
                />
              </Form.Item>

            </Col>

          </Row>


          <div className="gd-clientes-form-actions">

            <Button
              type="primary"
              htmlType="submit"
              icon={
                <SaveOutlined />
              }
              loading={
                procesando
              }
              disabled={
                cargandoBase
              }
            >
              Guardar precio
            </Button>

          </div>

        </Form>

      </Card>


      <Card
        title="Filtros"
        className="gd-clientes-filter-card gd-precios-filter-card"
      >

        <Form<FiltroValues>
          form={
            formFiltros
          }
          layout="vertical"
          requiredMark={false}
          onFinish={
            aplicarFiltros
          }
        >

          <Row
            gutter={[
              16,
              0
            ]}
            align="bottom"
          >

            <Col
              xs={24}
              lg={10}
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
                  loading={
                    cargandoBase
                  }
                  options={
                    clienteOptions
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={8}
            >

              <Form.Item
                label="Buscar producto"
                name="q"
              >
                <Input
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Tipo, medida, color o material"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={6}
            >

              <Form.Item
                label=" "
                className="gd-filter-actions-item"
              >

                <Space
                  wrap
                >

                  <Button
                    htmlType="submit"
                    type="primary"
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
                      cargandoPrecios
                    }
                    onClick={() =>
                      cargarPrecios(
                        page,
                        filtrosAplicados
                      )
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
        title="Historial de precios"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } registro(s)
          </Text>
        }
        className="gd-clientes-table-card"
      >

        <Table<Precio>
          rowKey="precio_cliente_id"
          columns={columns}
          dataSource={
            precios
          }
          loading={
            cargandoPrecios
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
                description="No hay precios registrados"
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
              `${total} registro(s)`,

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


export default HistorialPreciosCliente;
