import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography
} from 'antd';

import {
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  apiFetch
} from '../../services/api';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/usuarios.css';


const {
  Text
} = Typography;


type Rol = {
  rol_id: number;
  nombre: string;
  descripcion?: string | null;
};


type UsuarioForm = {
  nombre_completo: string;
  correo: string;
  password: string;
  rol_id: number;
};


function UsuariosAdmin() {
  const [
    form
  ] = Form.useForm<UsuarioForm>();

  const {
    message
  } = AntdApp.useApp();

  const [
    roles,
    setRoles
  ] = useState<Rol[]>([]);

  const [
    cargandoRoles,
    setCargandoRoles
  ] = useState(true);

  const [
    creando,
    setCreando
  ] = useState(false);


  const cargarRoles =
    async () => {
      setCargandoRoles(true);

      try {
        const data =
          await apiFetch(
            '/auth/roles'
          );

        setRoles(
          data.roles || []
        );

      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar los roles'
        );

      } finally {
        setCargandoRoles(false);
      }
    };


  useEffect(() => {
    cargarRoles();
  }, []);


  const rolSeleccionado =
    Form.useWatch(
      'rol_id',
      form
    );


  const rolActual =
    useMemo(
      () =>
        roles.find(
          (rol) =>
            Number(
              rol.rol_id
            ) ===
            Number(
              rolSeleccionado
            )
        ) || null,
      [
        roles,
        rolSeleccionado
      ]
    );


  const crearUsuario =
    async (
      values: UsuarioForm
    ) => {
      setCreando(true);

      try {
        await apiFetch(
          '/auth/usuarios',
          {
            method: 'POST',

            body:
              JSON.stringify({
                nombre_completo:
                  values
                    .nombre_completo
                    .trim(),

                correo:
                  values
                    .correo
                    .trim()
                    .toLowerCase(),

                password:
                  values.password,

                rol_id:
                  Number(
                    values.rol_id
                  )
              })
          }
        );


        message.success(
          'Usuario creado correctamente'
        );


        form.resetFields();

      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo crear el usuario'
        );

      } finally {
        setCreando(false);
      }
    };


  return (
    <div className="gd-usuarios-page">

      <PageHeader
        title="Usuarios"
        description="Crea accesos para las personas que utilizarán GestionDriza."
      />


      <Row
        gutter={[
          20,
          20
        ]}
      >

        <Col
          xs={24}
          xl={16}
        >

          <Card
            title="Nuevo usuario"
            className="gd-usuarios-card"
          >

            <Form<UsuarioForm>
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={
                crearUsuario
              }
              autoComplete="off"
              disabled={
                creando
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
                  md={12}
                >

                  <Form.Item
                    label="Nombre completo"
                    name="nombre_completo"
                    rules={[
                      {
                        required: true,
                        message:
                          'Ingresa el nombre completo'
                      },
                      {
                        whitespace: true,
                        message:
                          'Ingresa un nombre válido'
                      },
                      {
                        max: 150,
                        message:
                          'El nombre no puede superar 150 caracteres'
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={
                        <UserOutlined />
                      }
                      placeholder="Ejemplo: Juan Pérez"
                      maxLength={150}
                    />
                  </Form.Item>

                </Col>


                <Col
                  xs={24}
                  md={12}
                >

                  <Form.Item
                    label="Correo"
                    name="correo"
                    normalize={
                      (value) =>
                        typeof value ===
                          'string'
                          ? value
                              .trimStart()
                              .toLowerCase()
                          : value
                    }
                    rules={[
                      {
                        required: true,
                        message:
                          'Ingresa el correo'
                      },
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
                      placeholder="usuario@driza.com"
                      maxLength={150}
                      autoComplete="off"
                    />
                  </Form.Item>

                </Col>


                <Col
                  xs={24}
                  md={12}
                >

                  <Form.Item
                    label="Contraseña inicial"
                    name="password"
                    extra="Debe tener al menos 8 caracteres."
                    rules={[
                      {
                        required: true,
                        message:
                          'Ingresa una contraseña inicial'
                      },
                      {
                        min: 8,
                        message:
                          'La contraseña debe tener mínimo 8 caracteres'
                      }
                    ]}
                  >
                    <Input.Password
                      size="large"
                      prefix={
                        <LockOutlined />
                      }
                      placeholder="Mínimo 8 caracteres"
                      autoComplete="new-password"
                    />
                  </Form.Item>

                </Col>


                <Col
                  xs={24}
                  md={12}
                >

                  <Form.Item
                    label="Rol"
                    name="rol_id"
                    rules={[
                      {
                        required: true,
                        message:
                          'Selecciona un rol'
                      }
                    ]}
                  >
                    <Select
                      size="large"
                      loading={
                        cargandoRoles
                      }
                      placeholder="Selecciona un rol"
                      optionFilterProp="label"
                      showSearch
                      options={
                        roles.map(
                          (rol) => ({
                            value:
                              rol.rol_id,

                            label:
                              rol.nombre
                          })
                        )
                      }
                    />
                  </Form.Item>

                </Col>

              </Row>


              {rolActual
                ?.descripcion && (
                <Alert
                  showIcon
                  type="info"
                  icon={
                    <SafetyCertificateOutlined />
                  }
                  message={
                    rolActual.nombre
                  }
                  description={
                    rolActual.descripcion
                  }
                  className="gd-usuarios-role-info"
                />
              )}


              <div className="gd-usuarios-actions">

                <Space
                  wrap
                >

                  <Button
                    onClick={() =>
                      form.resetFields()
                    }
                    disabled={
                      creando
                    }
                  >
                    Limpiar
                  </Button>


                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <UserAddOutlined />
                    }
                    loading={
                      creando
                    }
                    disabled={
                      cargandoRoles ||
                      roles.length === 0
                    }
                  >
                    Crear usuario
                  </Button>

                </Space>

              </div>

            </Form>

          </Card>

        </Col>


        <Col
          xs={24}
          xl={8}
        >

          <Card
            title="Acceso al sistema"
            className="gd-usuarios-card gd-usuarios-info-card"
          >

            <Space
              direction="vertical"
              size={14}
              className="gd-usuarios-info"
            >

              <div className="gd-usuarios-info-item">

                <SafetyCertificateOutlined />

                <div>
                  <Text strong>
                    Permisos según rol
                  </Text>

                  <Text
                    type="secondary"
                  >
                    El rol determina las funciones
                    disponibles para el usuario.
                  </Text>
                </div>

              </div>


              <div className="gd-usuarios-info-item">

                <LockOutlined />

                <div>
                  <Text strong>
                    Contraseña inicial
                  </Text>

                  <Text
                    type="secondary"
                  >
                    La contraseña será necesaria
                    para iniciar sesión.
                  </Text>
                </div>

              </div>


              <div className="gd-usuarios-info-item">

                <MailOutlined />

                <div>
                  <Text strong>
                    Correo único
                  </Text>

                  <Text
                    type="secondary"
                  >
                    No se puede crear más de un
                    usuario con el mismo correo.
                  </Text>
                </div>

              </div>

            </Space>

          </Card>

        </Col>

      </Row>

    </div>
  );
}


export default UsuariosAdmin;
