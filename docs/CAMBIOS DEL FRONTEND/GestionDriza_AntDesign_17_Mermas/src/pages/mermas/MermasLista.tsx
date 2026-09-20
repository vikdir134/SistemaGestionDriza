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
  Row,
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

import type {
  Dayjs
} from 'dayjs';

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

import '../../styles/mermasAntd.css';


const {
  Text
} = Typography;

const {
  RangePicker
} = DatePicker;


type Merma = {
  merma_id: number;
  fecha_merma: string;
  observacion?: string | null;
  created_at?: string | null;
  registrado_por: string;
  cantidad_items: number;
  total_merma_kg: number;
};


type FiltrosForm = {
  q?: string;
  fechas?: [
    Dayjs,
    Dayjs
  ];
};


type FiltrosAplicados = {
  q?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function MermasLista() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    FiltrosForm
  >();

  const [
    mermas,
    setMermas
  ] = useState<
    Merma[]
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
    filtros,
    setFiltros
  ] = useState<
    FiltrosAplicados
  >({});

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });


  const cargarMermas =
    useCallback(
      async (
        pagina: number,
        filtrosConsulta:
          FiltrosAplicados
      ) => {
        setCargando(true);

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
            filtrosConsulta.q?.trim()
          ) {
            params.set(
              'q',
              filtrosConsulta.q.trim()
            );
          }

          if (
            filtrosConsulta.fecha_desde
          ) {
            params.set(
              'fecha_desde',
              filtrosConsulta.fecha_desde
            );
          }

          if (
            filtrosConsulta.fecha_hasta
          ) {
            params.set(
              'fecha_hasta',
              filtrosConsulta.fecha_hasta
            );
          }


          const data =
            await apiFetch(
              `/mermas?${params.toString()}`
            );


          setMermas(
            data.mermas ||
            []
          );

          setPaginacion(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar las mermas'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        message
      ]
    );


  useEffect(() => {
    cargarMermas(
      page,
      filtros
    );
  }, [
    cargarMermas,
    filtros,
    page
  ]);


  const aplicarFiltros =
    (
      values:
        FiltrosForm
    ) => {
      setPage(1);

      setFiltros({
        q:
          values.q?.trim() ||
          '',

        fecha_desde:
          values.fechas?.[0]
            ?.format(
              'YYYY-MM-DD'
            ),

        fecha_hasta:
          values.fechas?.[1]
            ?.format(
              'YYYY-MM-DD'
            )
      });
    };


  const limpiarFiltros =
    () => {
      form.resetFields();
      setPage(1);
      setFiltros({});
    };


  const columns:
    TableColumnsType<
      Merma
    > = [
    {
      title: 'Fecha',
      dataIndex:
        'fecha_merma',
      key:
        'fecha_merma',
      width: 125,

      render: (
        value: string
      ) => (
        <Text strong>
          {
            value?.slice(
              0,
              10
            ) || '-'
          }
        </Text>
      )
    },

    {
      title:
        'Materias primas',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 145,

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
        'Total descontado',
      dataIndex:
        'total_merma_kg',
      key:
        'total_merma_kg',
      width: 170,

      render: (
        value: number
      ) => (
        <Text
          strong
          type="danger"
        >
          -{
            formatPeso(
              value || 0
            )
          } KG
        </Text>
      )
    },

    {
      title: 'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',
      minWidth: 260,

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      width: 190,
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
        merma
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/mermas/${merma.merma_id}`
            )
          }
        >
          Ver detalle
        </Button>
      )
    }
  ];


  return (
    <div className="gd-merma-page">

      <PageHeader
        title="Mermas de materia prima"
        description="Consulta las pérdidas registradas y la materia prima descontada del almacén."
        extra={
          <Button
            type="primary"
            icon={
              <PlusOutlined />
            }
            onClick={() =>
              navigate(
                '/gestion/mermas/registrar'
              )
            }
          >
            Registrar merma
          </Button>
        }
      />


      <Card
        title="Filtros"
        className="gd-merma-section-card"
      >

        <Form<
          FiltrosForm
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
              lg={10}
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
                  placeholder="Material, color u observación"
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              lg={8}
            >
              <Form.Item
                label="Rango de fechas"
                name="fechas"
              >
                <RangePicker
                  className="gd-full-width"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              lg={6}
            >
              <Form.Item
                label=" "
                className="gd-merma-filter-actions"
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
                    onClick={() =>
                      cargarMermas(
                        page,
                        filtros
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
        title="Historial de mermas"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } registro(s)
          </Text>
        }
        className="gd-merma-table-card"
      >

        <Table<
          Merma
        >
          rowKey="merma_id"
          columns={columns}
          dataSource={
            mermas
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
                description="No hay mermas para los filtros seleccionados"
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


export default MermasLista;
