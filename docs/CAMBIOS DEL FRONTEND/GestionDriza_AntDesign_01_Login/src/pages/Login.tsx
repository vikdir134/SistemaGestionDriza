import {
  App as AntdApp,
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Tag,
  Typography
} from 'antd';

import {
  AppstoreOutlined,
  LockOutlined,
  LoginOutlined,
  MailOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';

import {
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch,
  guardarSesion
} from '../services/api';

import ThemeToggle
  from '../components/ui/ThemeToggle';

import '../styles/login.css';


const {
  Title,
  Text,
  Paragraph
} = Typography;


type LoginValues = {
  correo: string;
  password: string;
};


function Login() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    cargando,
    setCargando
  ] = useState(false);


  const handleLogin =
    async (
      values: LoginValues
    ) => {
      setCargando(true);

      try {
        const data =
          await apiFetch(
            '/auth/login',
            {
              method: 'POST',

              body:
                JSON.stringify(
                  values
                )
            }
          );

        guardarSesion(
          data.token,
          data.usuario
        );

        message.success({
          content:
            'Inicio de sesión correcto',
          duration: 2
        });

        navigate(
          '/gestion',
          {
            replace: true
          }
        );

      } catch (error) {
        message.error({
          content:
            error instanceof Error
              ? error.message
              : 'No se pudo iniciar sesión',
          duration: 4
        });

      } finally {
        setCargando(false);
      }
    };


  return (
    <main className="gd-login-page">

      <div className="gd-login-theme">
        <ThemeToggle
          size="large"
        />
      </div>


      <Row
        className="gd-login-shell"
        align="stretch"
      >

        <Col
          xs={0}
          md={11}
          lg={12}
          className="gd-login-brand-column"
        >

          <div className="gd-login-brand-content">

            <Space
              direction="vertical"
              size={24}
            >

              <Avatar
                size={64}
                shape="square"
                className="gd-login-logo"
                icon={
                  <AppstoreOutlined />
                }
              />


              <div>
                <Tag
                  bordered={false}
                  icon={
                    <SafetyCertificateOutlined />
                  }
                  className="gd-login-brand-tag"
                >
                  Sistema de gestión
                </Tag>

                <Title
                  level={1}
                  className="gd-login-brand-title"
                >
                  GestionDriza
                </Title>

                <Paragraph
                  className="gd-login-brand-description"
                >
                  Controla pedidos, compras,
                  producción, entregas e
                  inventario desde un solo
                  sistema.
                </Paragraph>
              </div>

            </Space>


            <Text
              className="gd-login-brand-footer"
            >
              Gestión centralizada ·
              Trazabilidad · Control de stock
            </Text>

          </div>

        </Col>


        <Col
          xs={24}
          md={13}
          lg={12}
          className="gd-login-form-column"
        >

          <div className="gd-login-form-container">

            <div className="gd-login-mobile-brand">

              <Avatar
                size={48}
                shape="square"
                className="gd-login-logo"
                icon={
                  <AppstoreOutlined />
                }
              />

              <div>
                <Title
                  level={3}
                  className="gd-login-mobile-title"
                >
                  GestionDriza
                </Title>

                <Text type="secondary">
                  Sistema de gestión
                </Text>
              </div>

            </div>


            <Card
              bordered={false}
              className="gd-login-card"
            >

              <Space
                direction="vertical"
                size={4}
                className="gd-login-heading"
              >
                <Title
                  level={2}
                  className="gd-login-title"
                >
                  Bienvenido
                </Title>

                <Text type="secondary">
                  Ingresa tus credenciales
                  para continuar.
                </Text>
              </Space>


              <Form<LoginValues>
                name="gestiondriza-login"
                layout="vertical"
                size="large"
                requiredMark={false}
                onFinish={
                  handleLogin
                }
                autoComplete="on"
                className="gd-login-form"
              >

                <Form.Item
                  label="Correo"
                  name="correo"
                  rules={[
                    {
                      required: true
                    },
                    {
                      type: 'email'
                    }
                  ]}
                >
                  <Input
                    prefix={
                      <MailOutlined />
                    }
                    placeholder="admin@driza.com"
                    autoComplete="email"
                    disabled={
                      cargando
                    }
                  />
                </Form.Item>


                <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input.Password
                    prefix={
                      <LockOutlined />
                    }
                    placeholder="Ingresa tu contraseña"
                    autoComplete="current-password"
                    disabled={
                      cargando
                    }
                  />
                </Form.Item>


                <Form.Item
                  className="gd-login-submit-item"
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={
                      cargando
                    }
                    icon={
                      !cargando
                        ? <LoginOutlined />
                        : undefined
                    }
                  >
                    Iniciar sesión
                  </Button>
                </Form.Item>

              </Form>


              <div className="gd-login-security">
                <SafetyCertificateOutlined />

                <Text type="secondary">
                  Acceso protegido para
                  usuarios autorizados.
                </Text>
              </div>

            </Card>


            <Text
              type="secondary"
              className="gd-login-version"
            >
              GestionDriza · v1.12
            </Text>

          </div>

        </Col>

      </Row>

    </main>
  );
}


export default Login;
