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
  Progress,
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

import {
  formatMonto,
  formatPeso
} from '../../utils/formatters';

import '../../styles/comprasMateriaPrimaAntd.css';


const {
  Text
} = Typography;


type CompraMateriaPrima = {
  compra_materia_prima_id: number;
  nombre_lote: string;

  proveedor_id: number;
  ruc: string;
  razon_social: string;

  fecha_compra: string;
  numero_documento?: string | null;

  monto_total: number;
  moneda_codigo:
    | 'PEN'
    | 'USD';

  descripcion?: string | null;

  registrado_por: string;

  cantidad_items: number;
  cantidad_total_kg: number;
  cantidad_disponible_kg: number;
};


type FiltrosCompraMP = {
  proveedor_id?: number;
  q?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function ComprasMateriaPrimaLista() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    FiltrosCompraMP
  >();

  const [
    compras,
    setCompras
  ] = useState<
    CompraMateriaPrima[]
  >([]);

  const [
    proveedores,
    setProveedores
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
    FiltrosCompraMP
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


  const cargarProveedores =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/proveedores'
          );

        setProveedores(
          data.proveedores ||
          []
        );
      },
      []
    );


  const cargarCompras =
    useCallback(
      async (
        pagina:
          number,

        filtros:
          FiltrosCompraMP
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
          filtros.q?.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }


        const data =
          await apiFetch(
            `/compras-materia-prima?${params.toString()}`
          );


        setCompras(
          data.compras ||
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
            cargarProveedores(),
            cargarCompras(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los lotes de materia prima'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarCompras,
        cargarProveedores,
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
        FiltrosCompraMP
    ) => {
      setPage(1);

      setFiltrosAplicados({
        proveedor_id:
          values.proveedor_id,

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
      CompraMateriaPrima
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
      minWidth: 220,

      render: (
        _,
        compra
      ) => (
        <div className="gd-compra-mp-provider-cell">

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
      width: 160,
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
      title: 'Materias primas',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 135,
      responsive: [
        'md'
      ],

      render: (
        value: number
      ) => (
        <Tag>
          {value}
        </Tag>
      )
    },

    {
      title: 'Comprado',
      dataIndex:
        'cantidad_total_kg',
      key:
        'cantidad_total_kg',
      width: 145,

      render: (
        value: number
      ) => (
        <Text strong>
          {
            formatPeso(
              value || 0
            )
          } KG
        </Text>
      )
    },

    {
      title: 'Disponible',
      key: 'disponible',
      width: 210,

      render: (
        _,
        compra
      ) => {
        const comprado =
          Number(
            compra
              .cantidad_total_kg ||
            0
          );

        const disponible =
          Number(
            compra
              .cantidad_disponible_kg ||
            0
          );

        const porcentaje =
          comprado > 0
            ? Math.max(
                0,
                Math.min(
                  100,
                  (
                    disponible /
                    comprado
                  ) *
                  100
                )
              )
            : 0;


        return (
          <div className="gd-compra-mp-stock-cell">

            <Text>
              {
                formatPeso(
                  disponible
                )
              } KG
            </Text>

            <Progress
              percent={
                Number(
                  porcentaje
                    .toFixed(2)
                )
              }
              showInfo={
                false
              }
              size="small"
            />

          </div>
        );
      }
    },

    {
      title: 'Monto',
      key: 'monto',
      width: 165,
      responsive: [
        'lg'
      ],

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
                  .monto_total ||
                0
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
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      minWidth: 170,
      responsive: [
        'xl'
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
              `/gestion/compras-materia-prima/${compra.compra_materia_prima_id}`
            )
          }
        >
          Ver detalle
        </Button>
      )
    }
  ];


  return (
    <div className="gd-compra-mp-page">

      <PageHeader
        title="Compras de materia prima"
        description="Gestiona las compras de fibra por lote y su ingreso al almacén de materia prima."
        extra={
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
        }
      />


      <Card
        title="Filtros"
        className="gd-compra-mp-filter-card"
      >

        <Form<
          FiltrosCompraMP
        >
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
                label="Buscar"
                name="q"
              >
                <Input
                  allowClear
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Lote, documento, proveedor..."
                />
              </Form.Item>

            </Col>


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
              lg={6}
            >

              <Form.Item
                label=" "
                className="gd-compra-mp-filter-actions"
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
        title="Lotes registrados"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } lote(s)
          </Text>
        }
        className="gd-compra-mp-table-card"
      >

        <Table<
          CompraMateriaPrima
        >
          rowKey="compra_materia_prima_id"
          columns={columns}
          dataSource={
            compras
          }
          loading={
            cargando
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
              `${total} lote(s)`,

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


export default ComprasMateriaPrimaLista;
