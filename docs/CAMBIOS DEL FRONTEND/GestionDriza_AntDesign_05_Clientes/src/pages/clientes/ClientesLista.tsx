import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Empty,
  Input,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DollarOutlined,
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
} from '../../services/api';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/clientes.css';


const {
  Text
} = Typography;


type Cliente = {
  cliente_id: number;
  ruc: string;
  razon_social: string;
  direccion?: string | null;
  telefono?: string | null;
  correo?: string | null;
  agencia_entrega?: string | null;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function ClientesLista() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    clientes,
    setClientes
  ] = useState<Cliente[]>([]);

  const [
    busqueda,
    setBusqueda
  ] = useState('');

  const [
    busquedaAplicada,
    setBusquedaAplicada
  ] = useState('');

  const [
    page,
    setPage
  ] = useState(1);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarClientes =
    useCallback(
      async (
        pagina: number,
        query: string
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
            query.trim()
          ) {
            params.set(
              'q',
              query.trim()
            );
          }

          const data =
            await apiFetch(
              `/clientes?${params.toString()}`
            );

          setClientes(
            data.clientes || []
          );

          setPaginacion(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los clientes'
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
    cargarClientes(
      page,
      busquedaAplicada
    );
  }, [
    page,
    busquedaAplicada,
    cargarClientes
  ]);


  const buscar = (
    valor?: string
  ) => {
    const query =
      (
        valor ??
        busqueda
      ).trim();

    setBusqueda(
      query
    );

    setPage(1);
    setBusquedaAplicada(
      query
    );
  };


  const limpiar = () => {
    setBusqueda('');
    setPage(1);
    setBusquedaAplicada('');
  };


  const columns:
    TableColumnsType<Cliente> = [
    {
      title: 'RUC',
      dataIndex: 'ruc',
      key: 'ruc',
      width: 130,

      render: (
        value: string
      ) => (
        <Text code>
          {value}
        </Text>
      )
    },

    {
      title:
        'Razón social',
      dataIndex:
        'razon_social',
      key:
        'razon_social',
      minWidth: 220,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title: 'Dirección',
      dataIndex: 'direccion',
      key: 'direccion',
      responsive: [
        'lg'
      ],

      render: (
        value?: string | null
      ) =>
        value || '-'
    },

    {
      title: 'Agencia',
      dataIndex:
        'agencia_entrega',
      key:
        'agencia_entrega',
      responsive: [
        'md'
      ],

      render: (
        value?: string | null
      ) =>
        value
          ? (
              <Tag>
                {value}
              </Tag>
            )
          : '-'
    },

    {
      title: 'Teléfono',
      dataIndex:
        'telefono',
      key:
        'telefono',
      responsive: [
        'xl'
      ],

      render: (
        value?: string | null
      ) =>
        value || '-'
    },

    {
      title: 'Correo',
      dataIndex:
        'correo',
      key:
        'correo',
      responsive: [
        'lg'
      ],

      render: (
        value?: string | null
      ) =>
        value || '-'
    },

    {
      title: 'Acciones',
      key: 'acciones',
      fixed: 'right',
      width: 190,

      render: (
        _,
        cliente
      ) => (
        <Space
          size={4}
          wrap
        >

          <Button
            type="text"
            icon={
              <EditOutlined />
            }
            onClick={() =>
              navigate(
                `/gestion/clientes/${cliente.cliente_id}/editar`
              )
            }
          >
            Editar
          </Button>


          <Button
            type="link"
            icon={
              <DollarOutlined />
            }
            onClick={() =>
              navigate(
                `/gestion/clientes/precios?cliente_id=${cliente.cliente_id}`
              )
            }
          >
            Precios
          </Button>

        </Space>
      )
    }
  ];


  return (
    <div className="gd-clientes-page">

      <PageHeader
        title="Clientes"
        description="Consulta y administra la información comercial de tus clientes."
        extra={
          <Space
            wrap
          >

            <Button
              icon={
                <DollarOutlined />
              }
              onClick={() =>
                navigate(
                  '/gestion/clientes/precios'
                )
              }
            >
              Historial de precios
            </Button>


            <Button
              type="primary"
              icon={
                <PlusOutlined />
              }
              onClick={() =>
                navigate(
                  '/gestion/clientes/registrar'
                )
              }
            >
              Registrar cliente
            </Button>

          </Space>
        }
      />


      <Card
        className="gd-clientes-filter-card"
      >

        <div className="gd-clientes-filter-row">

          <Input.Search
            allowClear
            size="large"
            value={
              busqueda
            }
            prefix={
              <SearchOutlined />
            }
            placeholder="Buscar por RUC, razón social, dirección o agencia"
            enterButton="Buscar"
            onChange={(e) =>
              setBusqueda(
                e.target.value
              )
            }
            onSearch={
              buscar
            }
          />


          <Space>

            <Button
              onClick={
                limpiar
              }
              disabled={
                !busqueda &&
                !busquedaAplicada
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
                cargarClientes(
                  page,
                  busquedaAplicada
                )
              }
            >
              Actualizar
            </Button>

          </Space>

        </div>

      </Card>


      <Card
        title="Listado de clientes"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } cliente(s)
          </Text>
        }
        className="gd-clientes-table-card"
      >

        <Table<Cliente>
          rowKey="cliente_id"
          columns={columns}
          dataSource={
            clientes
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
                description="No hay clientes para mostrar"
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
            hideOnSinglePage:
              false,
            showTotal: (
              total
            ) =>
              `${total} cliente(s)`,

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


export default ClientesLista;
