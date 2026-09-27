import type {
  TableColumnsType,
  TabsProps
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
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
  apiFetch
} from '../services/api';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import PageHeader
  from '../components/ui/PageHeader';

import '../styles/catalogos.css';


const {
  Text
} = Typography;


type CatalogoKey =
  | 'tiposProducto'
  | 'medidas'
  | 'colores'
  | 'materiales';


type CatalogoConfig = {
  key: CatalogoKey;
  label: string;
  singular: string;
  descripcion: string;
};


type CatalogoItem = {
  id: number;
  nombre: string;
  activo: boolean;
  created_at?: string | null;
};


type CatalogoForm = {
  nombre: string;
};


const catalogos:
  CatalogoConfig[] = [
  {
    key:
      'tiposProducto',
    label:
      'Tipos de producto',
    singular:
      'tipo de producto',
    descripcion:
      'Clasificaciones principales de los productos.'
  },

  {
    key:
      'medidas',
    label:
      'Medidas',
    singular:
      'medida',
    descripcion:
      'Medidas disponibles para identificar los productos.'
  },

  {
    key:
      'colores',
    label:
      'Colores',
    singular:
      'color',
    descripcion:
      'Colores disponibles para productos y materia prima.'
  },

  {
    key:
      'materiales',
    label:
      'Materiales',
    singular:
      'material',
    descripcion:
      'Materiales utilizados en productos y materia prima.'
  }
];


function Catalogos() {
  const {
    message
  } = AntdApp.useApp();

  const [
    formNuevo
  ] = Form.useForm<
    CatalogoForm
  >();

  const [
    formEditar
  ] = Form.useForm<
    CatalogoForm
  >();

  const [
    catalogoActivo,
    setCatalogoActivo
  ] = useState<CatalogoKey>(
    'tiposProducto'
  );

  const [
    items,
    setItems
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    busqueda,
    setBusqueda
  ] = useState('');

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    modalEditarAbierto,
    setModalEditarAbierto
  ] = useState(false);

  const [
    itemEditando,
    setItemEditando
  ] = useState<
    CatalogoItem | null
  >(null);


  const {
    procesando:
      creando,

    intentarBloquear:
      bloquearCreacion,

    liberar:
      liberarCreacion
  } = useBloqueoAccion();


  const {
    procesando:
      editando,

    intentarBloquear:
      bloquearEdicion,

    liberar:
      liberarEdicion
  } = useBloqueoAccion();


  const {
    procesando:
      dandoBaja,

    intentarBloquear:
      bloquearBaja,

    liberar:
      liberarBaja
  } = useBloqueoAccion();


  const configActual =
    useMemo(
      () =>
        catalogos.find(
          (catalogo) =>
            catalogo.key ===
            catalogoActivo
        )!,
      [
        catalogoActivo
      ]
    );


  const cargarCatalogo =
    useCallback(
      async (
        key:
          CatalogoKey
      ) => {
        setCargando(true);

        try {
          const data =
            await apiFetch(
              `/catalogos/${key}`
            );

          setItems(
            data.items ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el catálogo'
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
    setBusqueda('');
    formNuevo.resetFields();

    cargarCatalogo(
      catalogoActivo
    );
  }, [
    catalogoActivo,
    cargarCatalogo,
    formNuevo
  ]);


  const itemsFiltrados =
    useMemo(
      () => {
        const query =
          busqueda
            .trim()
            .toLocaleUpperCase(
              'es-PE'
            );

        if (!query) {
          return items;
        }

        return items.filter(
          (item) =>
            item.nombre
              .toLocaleUpperCase(
                'es-PE'
              )
              .includes(
                query
              )
        );
      },
      [
        items,
        busqueda
      ]
    );


  const nombreExiste = (
    nombre: string,
    ignorarId?: number
  ) => {
    const normalizado =
      nombre
        .trim()
        .toLocaleUpperCase(
          'es-PE'
        );

    return items.some(
      (item) =>
        item.id !==
          ignorarId &&
        item.nombre
          .trim()
          .toLocaleUpperCase(
            'es-PE'
          ) ===
          normalizado
    );
  };


  const registrar =
    async (
      values:
        CatalogoForm
    ) => {
      if (
        !bloquearCreacion()
      ) {
        return;
      }

      const nombre =
        values.nombre.trim();

      if (
        nombreExiste(
          nombre
        )
      ) {
        liberarCreacion();

        formNuevo.setFields([
          {
            name: 'nombre',
            errors: [
              'Ya existe un registro con ese nombre'
            ]
          }
        ]);

        return;
      }

      try {
        await apiFetch(
          `/catalogos/${catalogoActivo}`,
          {
            method: 'POST',

            body:
              JSON.stringify({
                nombre
              })
          }
        );


        message.success(
          `${configActual.singular.charAt(0).toUpperCase()}${configActual.singular.slice(1)} creado correctamente`
        );


        formNuevo.resetFields();

        await cargarCatalogo(
          catalogoActivo
        );


        liberarCreacion();

      } catch (error) {
        liberarCreacion();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo crear el registro'
        );
      }
    };


  const abrirEditar = (
    item:
      CatalogoItem
  ) => {
    setItemEditando(
      item
    );

    formEditar.setFieldsValue({
      nombre:
        item.nombre
    });

    setModalEditarAbierto(
      true
    );
  };


  const cerrarEditar = () => {
    if (editando) {
      return;
    }

    setModalEditarAbierto(
      false
    );

    setItemEditando(
      null
    );

    formEditar.resetFields();
  };


  const guardarEdicion =
    async () => {
      if (
        !itemEditando ||
        !bloquearEdicion()
      ) {
        return;
      }

      try {
        const values =
          await formEditar
            .validateFields();

        const nombre =
          values.nombre.trim();


        if (
          nombreExiste(
            nombre,
            itemEditando.id
          )
        ) {
          liberarEdicion();

          formEditar.setFields([
            {
              name: 'nombre',
              errors: [
                'Ya existe un registro con ese nombre'
              ]
            }
          ]);

          return;
        }


        await apiFetch(
          `/catalogos/${catalogoActivo}/${itemEditando.id}`,
          {
            method: 'PUT',

            body:
              JSON.stringify({
                nombre
              })
          }
        );


        message.success(
          'Registro actualizado correctamente'
        );


        setModalEditarAbierto(
          false
        );

        setItemEditando(
          null
        );

        formEditar.resetFields();


        await cargarCatalogo(
          catalogoActivo
        );


        liberarEdicion();

      } catch (error: any) {
        liberarEdicion();

        /*
         * validateFields rechaza con errorFields.
         * En ese caso Ant Design ya muestra el
         * error debajo del campo.
         */
        if (
          error?.errorFields
        ) {
          return;
        }

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el registro'
        );
      }
    };


  const darDeBaja =
    async (
      item:
        CatalogoItem
    ) => {
      if (
        !bloquearBaja()
      ) {
        return;
      }

      try {
        await apiFetch(
          `/catalogos/${catalogoActivo}/${item.id}`,
          {
            method: 'DELETE'
          }
        );


        message.success(
          'Registro dado de baja correctamente'
        );


        await cargarCatalogo(
          catalogoActivo
        );


        liberarBaja();

      } catch (error) {
        liberarBaja();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo dar de baja el registro'
        );
      }
    };


  const columns:
    TableColumnsType<CatalogoItem> = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',

      render: (
        value:
          string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title: 'Estado',
      key: 'estado',
      width: 130,

      render: () => (
        <Tag
          color="success"
        >
          Activo
        </Tag>
      )
    },

    {
      title:
        'Fecha de registro',
      dataIndex:
        'created_at',
      key:
        'created_at',
      width: 160,
      responsive: [
        'md'
      ],

      render: (
        value?: string | null
      ) =>
        value
          ? value.slice(
              0,
              10
            )
          : '-'
    },

    {
      title: 'Acciones',
      key: 'acciones',
      width: 220,
      fixed: 'right',

      render: (
        _,
        item
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
              abrirEditar(
                item
              )
            }
          >
            Editar
          </Button>


          <Popconfirm
            title="Dar de baja"
            description={
              `¿Deseas dar de baja "${item.nombre}"? Dejará de aparecer en nuevas selecciones.`
            }
            okText="Dar de baja"
            cancelText="Cancelar"
            okButtonProps={{
              danger: true,
              loading:
                dandoBaja
            }}
            onConfirm={() =>
              darDeBaja(
                item
              )
            }
          >
            <Button
              type="text"
              danger
              icon={
                <DeleteOutlined />
              }
              disabled={
                dandoBaja
              }
            >
              Dar de baja
            </Button>
          </Popconfirm>

        </Space>
      )
    }
  ];


  const tabs:
    TabsProps['items'] =
    catalogos.map(
      (catalogo) => ({
        key:
          catalogo.key,
        label:
          catalogo.label
      })
    );


  return (
    <div className="gd-catalogos-page">

      <PageHeader
        title="Catálogos"
        description="Administra los valores utilizados para clasificar productos y materia prima."
      />


      <Card
        className="gd-catalogos-main-card"
      >

        <div className="gd-catalogos-tabs">

          <Tabs
            activeKey={
              catalogoActivo
            }
            items={tabs}
            onChange={(
              key
            ) =>
              setCatalogoActivo(
                key as
                  CatalogoKey
              )
            }
          />

        </div>


        <div className="gd-catalogos-section-header">

          <div>
            <Text strong>
              {
                configActual.label
              }
            </Text>

            <Text
              type="secondary"
            >
              {
                configActual
                  .descripcion
              }
            </Text>
          </div>

          <Tag
            icon={
              <AppstoreOutlined />
            }
            color="blue"
          >
            {
              items.length
            } activo(s)
          </Tag>

        </div>


        <div className="gd-catalogos-content">

          <Card
            size="small"
            title={
              `Agregar ${configActual.singular}`
            }
            className="gd-catalogos-form-card"
          >

            <Form<CatalogoForm>
              form={
                formNuevo
              }
              layout="vertical"
              requiredMark={false}
              onFinish={
                registrar
              }
              disabled={
                creando
              }
            >

              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                  {
                    required: true,
                    message:
                      'Ingresa un nombre'
                  },
                  {
                    whitespace: true,
                    message:
                      'Ingresa un nombre válido'
                  },
                  {
                    max: 100,
                    message:
                      'El nombre no puede superar 100 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  placeholder={
                    `Nombre del ${configActual.singular}`
                  }
                  maxLength={100}
                  autoComplete="off"
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
                  creando
                }
              >
                Agregar
              </Button>

            </Form>

          </Card>


          <div className="gd-catalogos-list-area">

            <div className="gd-catalogos-toolbar">

              <Input
                allowClear
                prefix={
                  <SearchOutlined />
                }
                placeholder={
                  `Buscar en ${configActual.label.toLowerCase()}`
                }
                value={
                  busqueda
                }
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
                onClick={() =>
                  cargarCatalogo(
                    catalogoActivo
                  )
                }
              >
                Actualizar
              </Button>

            </div>


            <Table<CatalogoItem>
              rowKey="id"
              columns={
                columns
              }
              dataSource={
                itemsFiltrados
              }
              loading={
                cargando
              }
              scroll={{
                x: 680
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
                        ? 'No se encontraron registros'
                        : 'No hay registros activos'
                    }
                  />
              }}
              pagination={{
                pageSize: 10,
                showSizeChanger:
                  false,
                hideOnSinglePage:
                  itemsFiltrados
                    .length <=
                  10,

                showTotal: (
                  total
                ) =>
                  `${total} registro(s)`
              }}
            />

          </div>

        </div>

      </Card>


      <Modal
        open={
          modalEditarAbierto
        }
        title={
          `Editar ${configActual.singular}`
        }
        okText="Guardar cambios"
        cancelText="Cancelar"
        confirmLoading={
          editando
        }
        okButtonProps={{
          icon:
            <SaveOutlined />
        }}
        onOk={
          guardarEdicion
        }
        onCancel={
          cerrarEditar
        }
        destroyOnHidden
      >

        <Form<CatalogoForm>
          form={
            formEditar
          }
          layout="vertical"
          requiredMark={false}
          className="gd-catalogos-edit-form"
        >

          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
              {
                required: true,
                message:
                  'Ingresa un nombre'
              },
              {
                whitespace: true,
                message:
                  'Ingresa un nombre válido'
              },
              {
                max: 100,
                message:
                  'El nombre no puede superar 100 caracteres'
              }
            ]}
          >
            <Input
              size="large"
              maxLength={100}
              autoComplete="off"
            />
          </Form.Item>

        </Form>

      </Modal>

    </div>
  );
}


export default Catalogos;
