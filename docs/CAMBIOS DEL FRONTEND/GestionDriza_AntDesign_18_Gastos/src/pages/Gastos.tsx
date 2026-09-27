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
  DeleteOutlined,
  EditOutlined,
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
} from '../services/api';

import GastoForm, {
  gastoFormVacio,
  validarGastoForm,
  type GastoFormData
} from '../components/gastos/GastoForm';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import PageHeader
  from '../components/ui/PageHeader';

import {
  formatMonto
} from '../utils/formatters';

import '../styles/gastosAntd.css';


const {
  Text
} = Typography;


type FiltrosGasto = {
  tipo_gasto_id?: string;
  proveedor_id?: string;
  moneda_codigo?: string;
  q?: string;
};


type Gasto = {
  gasto_id: number;

  tipo_gasto_id:
    number;

  tipo_gasto:
    string;

  proveedor_id?:
    number | null;

  proveedor?:
    string | null;

  proveedor_ruc?:
    string | null;

  fecha_gasto:
    string;

  monto:
    number;

  moneda_codigo:
    'PEN' | 'USD';

  descripcion?:
    string | null;

  comprobante?:
    string | null;

  registrado_por:
    string;

  created_at?:
    string | null;

  updated_at?:
    string | null;

  actualizado_por?:
    string | null;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function Gastos() {
  const navigate =
    useNavigate();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    filtroForm
  ] = Form.useForm<
    FiltrosGasto
  >();

  const [
    gastos,
    setGastos
  ] = useState<
    Gasto[]
  >([]);

  const [
    tiposGasto,
    setTiposGasto
  ] = useState<any[]>(
    []
  );

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>(
    []
  );

  const [
    nuevoTipo,
    setNuevoTipo
  ] = useState('');

  const [
    form,
    setForm
  ] = useState<
    GastoFormData
  >({
    ...gastoFormVacio
  });

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<
    FiltrosGasto
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

  const [
    cargando,
    setCargando
  ] = useState(true);


  const {
    procesando:
      registrandoTipo,

    intentarBloquear:
      bloquearRegistroTipo,

    liberar:
      liberarRegistroTipo
  } = useBloqueoAccion();


  const {
    procesando:
      registrandoGasto,

    intentarBloquear:
      bloquearRegistroGasto,

    liberar:
      liberarRegistroGasto
  } = useBloqueoAccion();


  const {
    procesando:
      eliminandoGasto,

    intentarBloquear:
      bloquearEliminacion,

    liberar:
      liberarEliminacion
  } = useBloqueoAccion();


  const cargarDatosBase =
    useCallback(
      async () => {
        const [
          tiposData,
          proveedoresData
        ] = await Promise.all([
          apiFetch(
            '/gastos/tipos'
          ),

          apiFetch(
            '/proveedores'
          )
        ]);


        setTiposGasto(
          tiposData.tipos ||
          []
        );

        setProveedores(
          proveedoresData
            .proveedores ||
          []
        );
      },
      []
    );


  const cargarGastos =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosGasto
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
          filtros
            .tipo_gasto_id
        ) {
          params.set(
            'tipo_gasto_id',
            filtros
              .tipo_gasto_id
          );
        }


        if (
          filtros
            .proveedor_id
        ) {
          params.set(
            'proveedor_id',
            filtros
              .proveedor_id
          );
        }


        if (
          filtros
            .moneda_codigo
        ) {
          params.set(
            'moneda_codigo',
            filtros
              .moneda_codigo
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
            `/gastos?${params.toString()}`
          );


        setGastos(
          data.gastos ||
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
            cargarDatosBase(),
            cargarGastos(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los gastos'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarDatosBase,
        cargarGastos,
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


  const cambiarGasto = (
    campo:
      keyof GastoFormData,

    valor:
      string
  ) => {
    setForm(
      (actual) => ({
        ...actual,
        [campo]:
          valor
      })
    );
  };


  const registrarTipoGasto =
    async () => {
      const nombre =
        nuevoTipo.trim();


      if (!nombre) {
        message.error(
          'Ingrese el nombre del tipo de gasto'
        );

        return;
      }


      if (
        nombre.length > 100
      ) {
        message.error(
          'El tipo de gasto no puede superar 100 caracteres'
        );

        return;
      }


      if (
        !bloquearRegistroTipo()
      ) {
        return;
      }


      try {
        await apiFetch(
          '/gastos/tipos',
          {
            method: 'POST',

            body:
              JSON.stringify({
                nombre
              })
          }
        );


        setNuevoTipo('');


        message.success(
          'Tipo de gasto registrado correctamente'
        );


        try {
          await cargarDatosBase();

        } catch {
          message.warning(
            'El tipo de gasto fue registrado, pero no se pudo actualizar la lista. Usa Actualizar para recargarla.'
          );
        }

      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el tipo de gasto'
        );

      } finally {
        liberarRegistroTipo();
      }
    };


  const registrarGasto =
    async () => {
      const error =
        validarGastoForm(
          form,
          false
        );


      if (error) {
        message.error(
          error
        );

        return;
      }


      if (
        !bloquearRegistroGasto()
      ) {
        return;
      }


      let registrado =
        false;


      try {
        await apiFetch(
          '/gastos',
          {
            method: 'POST',

            body:
              JSON.stringify({
                tipo_gasto_id:
                  Number(
                    form
                      .tipo_gasto_id
                  ),

                proveedor_id:
                  form.proveedor_id
                    ? Number(
                        form
                          .proveedor_id
                      )
                    : null,

                fecha_gasto:
                  form.fecha_gasto ||
                  undefined,

                monto:
                  Number(
                    form.monto
                  ),

                moneda_codigo:
                  form
                    .moneda_codigo,

                descripcion:
                  form.descripcion,

                comprobante:
                  form.comprobante
              })
          }
        );


        registrado =
          true;


        setForm({
          ...gastoFormVacio
        });


        message.success(
          'Gasto registrado correctamente'
        );


        try {
          if (
            page !== 1
          ) {
            setPage(1);

          } else {
            await cargarGastos(
              1,
              filtrosAplicados
            );
          }

        } catch {
          message.warning(
            'El gasto fue registrado correctamente, pero no se pudo actualizar el listado. Usa Actualizar para recargarlo.'
          );
        }

      } catch (error) {
        if (
          !registrado
        ) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo registrar el gasto'
          );
        }

      } finally {
        liberarRegistroGasto();
      }
    };


  const eliminar =
    async (
      gasto: Gasto
    ) => {
      if (
        !bloquearEliminacion()
      ) {
        return;
      }


      try {
        await apiFetch(
          `/gastos/${gasto.gasto_id}`,
          {
            method: 'DELETE'
          }
        );


        message.warning(
          'Gasto eliminado del registro activo'
        );


        if (
          gastos.length ===
            1 &&
          page > 1
        ) {
          setPage(
            (actual) =>
              actual - 1
          );

        } else {
          try {
            await cargarGastos(
              page,
              filtrosAplicados
            );

          } catch {
            message.warning(
              'El gasto fue eliminado, pero no se pudo actualizar el listado. Usa Actualizar para recargarlo.'
            );
          }
        }

      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo eliminar el gasto'
        );

        throw error;

      } finally {
        liberarEliminacion();
      }
    };


  const solicitarEliminar =
    (
      gasto:
        Gasto
    ) => {
      modal.confirm({
        title:
          'Eliminar gasto',

        content:
          `Se retirará del registro activo el gasto "${gasto.tipo_gasto}" por ${formatMonto(gasto.monto)} ${gasto.moneda_codigo}. El registro permanecerá almacenado para auditoría.`,

        okText:
          'Eliminar gasto',

        cancelText:
          'Cancelar',

        okButtonProps: {
          danger: true,
          loading:
            eliminandoGasto
        },

        onOk: () =>
          eliminar(
            gasto
          )
      });
    };


  const columns:
    TableColumnsType<
      Gasto
    > = [
    {
      title:
        'Tipo / descripción',
      key:
        'tipo',
      minWidth: 240,

      render: (
        _,
        gasto
      ) => (
        <div className="gd-gasto-main-cell">

          <Text strong>
            {
              gasto
                .tipo_gasto
            }
          </Text>

          <Text
            type="secondary"
          >
            {
              gasto.descripcion ||
              'Sin descripción'
            }
          </Text>

        </div>
      )
    },

    {
      title: 'Proveedor',
      key: 'proveedor',
      minWidth: 220,

      render: (
        _,
        gasto
      ) =>
        gasto.proveedor
          ? (
              <div className="gd-gasto-main-cell">

                <Text strong>
                  {
                    gasto
                      .proveedor
                  }
                </Text>

                <Text
                  type="secondary"
                >
                  {
                    gasto
                      .proveedor_ruc ||
                    ''
                  }
                </Text>

              </div>
            )
          : '-'
    },

    {
      title: 'Fecha',
      dataIndex:
        'fecha_gasto',
      key:
        'fecha_gasto',
      width: 125,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Monto',
      key: 'monto',
      width: 165,

      render: (
        _,
        gasto
      ) => (
        <Space
          size={6}
        >

          <Text strong>
            {
              formatMonto(
                gasto.monto
              )
            }
          </Text>

          <Tag
            color={
              gasto
                .moneda_codigo ===
                'PEN'
                ? 'blue'
                : 'green'
            }
          >
            {
              gasto
                .moneda_codigo
            }
          </Tag>

        </Space>
      )
    },

    {
      title: 'Comprobante',
      dataIndex:
        'comprobante',
      key:
        'comprobante',
      width: 170,
      responsive: [
        'md'
      ],

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
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      minWidth: 180,
      responsive: [
        'lg'
      ]
    },

    {
      title: 'Acciones',
      key: 'acciones',
      fixed: 'right',
      width: 190,

      render: (
        _,
        gasto
      ) => (
        <Space
          size={4}
          wrap
        >

          <Button
            type="link"
            icon={
              <EditOutlined />
            }
            onClick={() =>
              navigate(
                `/gestion/gastos/${gasto.gasto_id}/editar`
              )
            }
          >
            Editar
          </Button>


          <Button
            type="text"
            danger
            icon={
              <DeleteOutlined />
            }
            disabled={
              eliminandoGasto
            }
            onClick={() =>
              solicitarEliminar(
                gasto
              )
            }
          >
            Eliminar
          </Button>

        </Space>
      )
    }
  ];


  return (
    <div className="gd-gasto-page">

      <PageHeader
        title="Gastos"
        description="Registra, consulta y administra los gastos operativos de la empresa."
        extra={
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
        }
      />


      <Row
        gutter={[
          20,
          20
        ]}
        align="top"
        className="gd-gasto-config-row"
      >

        <Col
          xs={24}
          xl={7}
        >

          <Card
            title="Registrar tipo de gasto"
            className="gd-gasto-type-card"
          >

            <Form
              layout="vertical"
              requiredMark={false}
            >

              <Form.Item
                label="Nuevo tipo"
                extra="Se guardará en mayúsculas."
              >
                <Input
                  size="large"
                  value={
                    nuevoTipo
                  }
                  maxLength={100}
                  placeholder="Ejemplo: COMBUSTIBLE"
                  disabled={
                    registrandoTipo
                  }
                  onPressEnter={
                    registrarTipoGasto
                  }
                  onChange={(e) =>
                    setNuevoTipo(
                      e.target.value
                    )
                  }
                />
              </Form.Item>


              <Button
                type="primary"
                block
                icon={
                  <PlusOutlined />
                }
                loading={
                  registrandoTipo
                }
                onClick={
                  registrarTipoGasto
                }
              >
                Guardar tipo
              </Button>

            </Form>

          </Card>

        </Col>


        <Col
          xs={24}
          xl={17}
        >

          <GastoForm
            titulo="Registrar gasto"
            form={form}
            tiposGasto={
              tiposGasto
            }
            proveedores={
              proveedores
            }
            procesando={
              registrandoGasto
            }
            textoBoton="Guardar gasto"
            onChange={
              cambiarGasto
            }
            onSubmit={
              registrarGasto
            }
          />

        </Col>

      </Row>


      <Card
        title="Filtros"
        className="gd-gasto-section-card"
      >

        <Form<
          FiltrosGasto
        >
          form={
            filtroForm
          }
          layout="vertical"
          requiredMark={false}
          onFinish={(
            values
          ) => {
            setPage(1);

            setFiltrosAplicados({
              tipo_gasto_id:
                values
                  .tipo_gasto_id,

              proveedor_id:
                values
                  .proveedor_id,

              moneda_codigo:
                values
                  .moneda_codigo,

              q:
                values.q
                  ?.trim() ||
                ''
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
              sm={12}
              xl={5}
            >
              <Form.Item
                label="Tipo de gasto"
                name="tipo_gasto_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos"
                  options={
                    tiposGasto.map(
                      (tipo) => ({
                        value:
                          String(
                            tipo
                              .tipo_gasto_id
                          ),

                        label:
                          tipo.nombre
                      })
                    )
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              sm={12}
              xl={6}
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
                      (proveedor) => ({
                        value:
                          String(
                            proveedor
                              .proveedor_id
                          ),

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
              xl={4}
            >
              <Form.Item
                label="Moneda"
                name="moneda_codigo"
              >
                <Select
                  allowClear
                  placeholder="Todas"
                  options={[
                    {
                      value:
                        'PEN',
                      label:
                        'Soles'
                    },
                    {
                      value:
                        'USD',
                      label:
                        'Dólares'
                    }
                  ]}
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              xl={5}
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
                  placeholder="Tipo, descripción, comprobante o proveedor"
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              xl={4}
            >
              <Form.Item
                label=" "
                className="gd-gasto-filter-actions"
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
                      filtroForm
                        .resetFields();

                      setPage(1);
                      setFiltrosAplicados(
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
        title="Listado de gastos"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } gasto(s)
          </Text>
        }
        className="gd-gasto-table-card"
      >

        <Table<Gasto>
          rowKey="gasto_id"
          columns={columns}
          dataSource={
            gastos
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
                description="No hay gastos para los filtros seleccionados"
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
              `${total} gasto(s)`,

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


export default Gastos;
