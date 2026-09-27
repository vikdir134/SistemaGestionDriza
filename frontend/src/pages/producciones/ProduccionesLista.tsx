import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Empty,
  Space,
  Table,
  Typography
} from 'antd';

import {
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined
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

import '../../styles/produccionesAntd.css';


const {
  Text
} = Typography;


type Produccion = {
  produccion_id: number;
  fecha_produccion: string;
  observacion?: string | null;
  registrado_por: string;
  cantidad_items: number;
  total_producido_kg: number;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function ProduccionesLista() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    producciones,
    setProducciones
  ] = useState<
    Produccion[]
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
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarProducciones =
    useCallback(
      async (
        pagina: number
      ) => {
        setCargando(true);

        try {
          const data =
            await apiFetch(
              `/producciones?page=${pagina}&limit=10`
            );

          setProducciones(
            data.producciones ||
            []
          );

          setPaginacion(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar las producciones'
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
    cargarProducciones(
      page
    );
  }, [
    page,
    cargarProducciones
  ]);


  const fechaTexto = (
    valor?: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return valor.slice(
      0,
      10
    );
  };


  const columns:
    TableColumnsType<
      Produccion
    > = [
    {
      title: 'Fecha',
      dataIndex:
        'fecha_produccion',
      key:
        'fecha_produccion',
      width: 130,

      render: (
        value: string
      ) =>
        fechaTexto(
          value
        )
    },

    {
      title:
        'Productos fabricados',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 170,

      render: (
        value: number
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title:
        'Total producido',
      dataIndex:
        'total_producido_kg',
      key:
        'total_producido_kg',
      width: 170,

      render: (
        value: number
      ) => (
        <Text strong>
          {
            formatPeso(
              value
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
      responsive: [
        'md'
      ],

      render: (
        value?: string | null
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
      responsive: [
        'lg'
      ]
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 145,

      render: (
        _,
        produccion
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/producciones/${produccion.produccion_id}`
            )
          }
        >
          Ver detalle
        </Button>
      )
    }
  ];


  return (
    <div className="gd-produccion-page">

      <PageHeader
        title="Producción"
        description="Consulta los productos fabricados y el consumo de materia prima."
        extra={
          <Space
            wrap
          >

            <Button
              icon={
                <ReloadOutlined />
              }
              loading={
                cargando
              }
              onClick={() =>
                cargarProducciones(
                  page
                )
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


      <Card
        title="Historial de producción"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } producción(es)
          </Text>
        }
        className="gd-produccion-table-card"
      >

        <Table<Produccion>
          rowKey="produccion_id"
          columns={columns}
          dataSource={
            producciones
          }
          loading={
            cargando
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
                description="Todavía no hay producciones registradas"
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
              `${total} producción(es)`,

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


export default ProduccionesLista;
