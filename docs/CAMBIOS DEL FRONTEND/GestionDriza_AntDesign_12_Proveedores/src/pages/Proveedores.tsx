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
  Space,
  Table,
  Typography
} from 'antd';

import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  ShopOutlined,
  SolutionOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  apiFetch
} from '../services/api';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import PageHeader
  from '../components/ui/PageHeader';

import '../styles/proveedoresAntd.css';


const {
  Text
} = Typography;


type Proveedor = {
  proveedor_id: number;
  ruc: string;
  razon_social: string;
  direccion?: string | null;
  telefono?: string | null;
  correo?: string | null;
  created_at?: string | null;
};


type ProveedorForm = {
  ruc: string;
  razon_social: string;
  direccion?: string;
  telefono?: string;
  correo?: string;
};


function Proveedores() {
  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    ProveedorForm
  >();

  const [
    proveedores,
    setProveedores
  ] = useState<
    Proveedor[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    busqueda,
    setBusqueda
  ] = useState('');

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const cargarProveedores =
    useCallback(
      async () => {
        setCargando(true);

        try {
          const data =
            await apiFetch(
              '/proveedores'
            );

          setProveedores(
            data.proveedores ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los proveedores'
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
    cargarProveedores();
  }, [
    cargarProveedores
  ]);


  const proveedoresFiltrados =
    useMemo(
      () => {
        const query =
          busqueda
            .trim()
            .toLocaleLowerCase(
              'es-PE'
            );

        if (!query) {
          return proveedores;
        }

        return proveedores.filter(
          (proveedor) =>
            [
              proveedor.ruc,
              proveedor
                .razon_social,
              proveedor.direccion,
              proveedor.telefono,
              proveedor.correo
            ]
              .filter(Boolean)
              .some(
                (valor) =>
                  String(
                    valor
                  )
                    .toLocaleLowerCase(
                      'es-PE'
                    )
                    .includes(
                      query
                    )
              )
        );
      },
      [
        busqueda,
        proveedores
      ]
    );


  const registrarProveedor =
    async (
      values:
        ProveedorForm
    ) => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        await apiFetch(
          '/proveedores',
          {
            method: 'POST',

            body:
              JSON.stringify({
                ruc:
                  values.ruc
                    .trim(),

                razon_social:
                  values
                    .razon_social
                    .trim(),

                direccion:
                  values
                    .direccion
                    ?.trim() ||
                  '',

                telefono:
                  values
                    .telefono
                    ?.trim() ||
                  '',

                correo:
                  values
                    .correo
                    ?.trim() ||
                  ''
              })
          }
        );


        message.success(
          'Proveedor registrado correctamente'
        );


        form.resetFields();

        await cargarProveedores();


        liberar();

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el proveedor'
        );
      }
    };


  const columns:
    TableColumnsType<
      Proveedor
    > = [
    {
      title: 'RUC',
      dataIndex: 'ruc',
      key: 'ruc',
      width: 135,

      render: (
        value: string
      ) => (
        <Text code>
          {value}
        </Text>
      )
    },

    {
      title: 'Razón social',
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
      dataIndex:
        'direccion',
      key:
        'direccion',
      minWidth: 220,
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
      title: 'Teléfono',
      dataIndex:
        'telefono',
      key:
        'telefono',
      width: 150,
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
      title: 'Correo',
      dataIndex:
        'correo',
      key:
        'correo',
      minWidth: 200,
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
      title:
        'Fecha de registro',
      dataIndex:
        'created_at',
      key:
        'created_at',
      width: 150,
      responsive: [
        'xl'
      ],

      render: (
        value?:
          string | null
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    }
  ];


  return (
    <div className="gd-proveedores-page">

      <PageHeader
        title="Proveedores"
        description="Registra y consulta los proveedores utilizados en compras y gastos."
      />


      <Row
        gutter={[
          20,
          20
        ]}
        align="top"
      >

        <Col
          xs={24}
          xl={8}
        >

          <Card
            title="Registrar proveedor"
            className="gd-proveedores-form-card"
          >

            <Form<ProveedorForm>
              form={form}
              layout="vertical"
              requiredMark={false}
              disabled={
                procesando
              }
              onFinish={
                registrarProveedor
              }
              autoComplete="off"
            >

              <Form.Item
                label="RUC"
                name="ruc"
                extra="Debe contener exactamente 11 dígitos."
                normalize={
                  (value) =>
                    typeof value ===
                      'string'
                      ? value.replace(
                          /\D/g,
                          ''
                        )
                      : value
                }
                rules={[
                  {
                    required: true,
                    message:
                      'Ingresa el RUC'
                  },
                  {
                    pattern:
                      /^\d{11}$/,
                    message:
                      'El RUC debe tener 11 dígitos numéricos'
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={
                    <SolutionOutlined />
                  }
                  placeholder="20123456789"
                  maxLength={11}
                  inputMode="numeric"
                />
              </Form.Item>


              <Form.Item
                label="Razón social"
                name="razon_social"
                rules={[
                  {
                    required: true,
                    message:
                      'Ingresa la razón social'
                  },
                  {
                    whitespace: true,
                    message:
                      'Ingresa una razón social válida'
                  },
                  {
                    max: 200,
                    message:
                      'La razón social no puede superar 200 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={
                    <ShopOutlined />
                  }
                  placeholder="Razón social del proveedor"
                  maxLength={200}
                />
              </Form.Item>


              <Form.Item
                label="Dirección"
                name="direccion"
                rules={[
                  {
                    max: 250,
                    message:
                      'La dirección no puede superar 250 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={
                    <EnvironmentOutlined />
                  }
                  placeholder="Dirección"
                  maxLength={250}
                />
              </Form.Item>


              <Form.Item
                label="Teléfono"
                name="telefono"
                rules={[
                  {
                    max: 30,
                    message:
                      'El teléfono no puede superar 30 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={
                    <PhoneOutlined />
                  }
                  placeholder="Teléfono de contacto"
                  maxLength={30}
                  inputMode="tel"
                />
              </Form.Item>


              <Form.Item
                label="Correo"
                name="correo"
                rules={[
                  {
                    type: 'email',
                    message:
                      'Ingresa un correo válido'
                  },
                  {
                    max: 150,
                    message:
                      'El correo no puede superar 150 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={
                    <MailOutlined />
                  }
                  placeholder="proveedor@empresa.com"
                  maxLength={150}
                  inputMode="email"
                />
              </Form.Item>


              <Button
                type="primary"
                htmlType="submit"
                block
                icon={
                  <PlusOutlined />
                }
                loading={
                  procesando
                }
              >
                Guardar proveedor
              </Button>

            </Form>

          </Card>

        </Col>


        <Col
          xs={24}
          xl={16}
        >

          <Card
            title="Listado de proveedores"
            extra={
              <Text
                type="secondary"
              >
                {
                  proveedoresFiltrados
                    .length
                } proveedor(es)
              </Text>
            }
            className="gd-proveedores-table-card"
          >

            <div className="gd-proveedores-toolbar">

              <Input
                allowClear
                size="large"
                prefix={
                  <SearchOutlined />
                }
                value={
                  busqueda
                }
                placeholder="Buscar por RUC, razón social, dirección, teléfono o correo"
                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }
              />


              <Button
                icon={
                  <ReloadOutlined />
                }
                loading={
                  cargando
                }
                onClick={
                  cargarProveedores
                }
              >
                Actualizar
              </Button>

            </div>


            <Table<Proveedor>
              rowKey="proveedor_id"
              columns={columns}
              dataSource={
                proveedoresFiltrados
              }
              loading={
                cargando
              }
              scroll={{
                x: 850
              }}
              locale={{
                emptyText:
                  <Empty
                    image={
                      Empty
                        .PRESENTED_IMAGE_SIMPLE
                    }
                    description={
                      busqueda
                        ? 'No se encontraron proveedores'
                        : 'No hay proveedores registrados'
                    }
                  />
              }}
              pagination={{
                pageSize: 10,
                showSizeChanger:
                  false,

                hideOnSinglePage:
                  false,

                showTotal: (
                  total
                ) =>
                  `${total} proveedor(es)`
              }}
            />

          </Card>

        </Col>

      </Row>

    </div>
  );
}


export default Proveedores;
