import {
  App as AntdApp,
  Avatar,
  Breadcrumb,
  Button,
  Divider,
  Drawer,
  Dropdown,
  Grid,
  Layout,
  Space,
  Typography
} from 'antd';

import type {
  MenuProps
} from 'antd';

import {
  AppstoreOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useMemo,
  useState
} from 'react';

import {
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom';

import Sidebar
  from '../components/Sidebar';

import ThemeToggle
  from '../components/ui/ThemeToggle';

import {
  cerrarSesion,
  getUsuario
} from '../services/api';

import '../styles/layout.css';


const {
  Header,
  Sider,
  Content
} = Layout;

const {
  Text
} = Typography;


const obtenerIniciales = (
  nombre?: string
) => {
  if (!nombre) {
    return 'U';
  }

  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (parte) =>
        parte.charAt(0)
          .toUpperCase()
    )
    .join('');
};


const obtenerBreadcrumbs = (
  pathname: string
) => {
  const items = [
    {
      path: '/gestion',
      title: 'Inicio'
    }
  ];

  const mapas = [
    {
      prefix:
        '/gestion/usuarios',
      title: 'Usuarios'
    },
    {
      prefix:
        '/gestion/clientes',
      title: 'Clientes'
    },
    {
      prefix:
        '/gestion/catalogos',
      title: 'Catálogos'
    },
    {
      prefix:
        '/gestion/productos-terminados',
      title:
        'Productos terminados'
    },
    {
      prefix:
        '/gestion/producciones',
      title: 'Producción'
    },
    {
      prefix:
        '/gestion/pedidos',
      title: 'Pedidos'
    },
    {
      prefix:
        '/gestion/entregas',
      title: 'Entregas'
    },
    {
      prefix:
        '/gestion/depositos',
      title: 'Depósitos'
    },
    {
      prefix:
        '/gestion/proveedores',
      title: 'Proveedores'
    },
    {
      prefix:
        '/gestion/compras-materia-prima',
      title:
        'Compra materia prima'
    },
    {
      prefix:
        '/gestion/compras',
      title: 'Compras'
    },
    {
      prefix:
        '/gestion/almacen/materia-prima',
      title:
        'Almacén materia prima'
    },
    {
      prefix:
        '/gestion/almacen/producto-terminado',
      title:
        'Almacén producto terminado'
    },
    {
      prefix:
        '/gestion/mermas',
      title: 'Mermas'
    },
    {
      prefix:
        '/gestion/gastos',
      title: 'Gastos'
    }
  ];

  const actual =
    mapas.find(
      (item) =>
        pathname ===
          item.prefix ||
        pathname.startsWith(
          `${item.prefix}/`
        )
    );

  if (
    actual &&
    pathname !== '/gestion'
  ) {
    items.push({
      path:
        actual.prefix,
      title:
        actual.title
    });
  }

  if (
    pathname.endsWith(
      '/registrar'
    )
  ) {
    items.push({
      path: pathname,
      title: 'Registrar'
    });
  }

  if (
    pathname.endsWith(
      '/editar'
    )
  ) {
    items.push({
      path: pathname,
      title: 'Editar'
    });
  }

  return items;
};


function GestionLayout() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const screens =
    Grid.useBreakpoint();

  const {
    modal
  } = AntdApp.useApp();

  const usuario =
    getUsuario();

  const [
    collapsed,
    setCollapsed
  ] = useState(false);

  const [
    drawerOpen,
    setDrawerOpen
  ] = useState(false);


  const esMobile =
    !screens.md;


  const breadcrumbs =
    useMemo(
      () =>
        obtenerBreadcrumbs(
          location.pathname
        ),
      [
        location.pathname
      ]
    );


  const confirmarLogout = () => {
    modal.confirm({
      title:
        'Cerrar sesión',

      content:
        '¿Deseas salir de GestionDriza?',

      okText:
        'Cerrar sesión',

      cancelText:
        'Cancelar',

      okButtonProps: {
        danger: true
      },

      icon:
        <LogoutOutlined />,

      onOk: () => {
        cerrarSesion();

        navigate(
          '/login',
          {
            replace: true
          }
        );
      }
    });
  };


  const userMenu:
    MenuProps['items'] = [
      {
        key: 'usuario',
        type: 'group',
        label:
          usuario
            ?.correo ||
          'Usuario'
      },

      {
        type: 'divider'
      },

      {
        key: 'logout',
        icon:
          <LogoutOutlined />,
        label:
          'Cerrar sesión',
        danger: true,

        onClick:
          confirmarLogout
      }
    ];


  const nombreUsuario =
    usuario
      ?.nombre_completo ||
    'Usuario';

  const rolTexto =
    usuario
      ?.roles
      ?.join(', ') ||
    'Usuario';


  return (
    <Layout className="gd-app-layout">

      {!esMobile && (
        <Sider
          width={264}
          collapsedWidth={84}
          collapsed={
            collapsed
          }
          trigger={null}
          theme="dark"
          className="gd-app-sider"
        >

          <div
            className={
              collapsed
                ? 'gd-sidebar-brand gd-sidebar-brand-collapsed'
                : 'gd-sidebar-brand'
            }
          >

            <Avatar
              shape="square"
              size={42}
              className="gd-sidebar-logo"
              icon={
                <AppstoreOutlined />
              }
            />

            {!collapsed && (
              <div className="gd-sidebar-brand-text">
                <strong>
                  GestionDriza
                </strong>

                <span>
                  Sistema de gestión
                </span>
              </div>
            )}

          </div>


          <div className="gd-sidebar-scroll">

            <Sidebar
              collapsed={
                collapsed
              }
            />

          </div>

        </Sider>
      )}


      <Drawer
        placement="left"
        open={
          esMobile &&
          drawerOpen
        }
        onClose={() =>
          setDrawerOpen(
            false
          )
        }
        width={288}
        closable={false}
        styles={{
          body: {
            padding: 0
          }
        }}
        className="gd-mobile-drawer"
      >

        <div className="gd-mobile-sidebar">

          <div className="gd-mobile-sidebar-brand">

            <Avatar
              shape="square"
              size={42}
              className="gd-sidebar-logo"
              icon={
                <AppstoreOutlined />
              }
            />

            <div className="gd-sidebar-brand-text">
              <strong>
                GestionDriza
              </strong>

              <span>
                Sistema de gestión
              </span>
            </div>

          </div>


          <div className="gd-mobile-sidebar-scroll">

            <Sidebar
              onNavigate={() =>
                setDrawerOpen(
                  false
                )
              }
            />

          </div>

        </div>

      </Drawer>


      <Layout className="gd-app-main">

        <Header className="gd-app-header">

          <div className="gd-header-left">

            <Button
              type="text"
              shape="circle"
              size="large"
              aria-label={
                esMobile
                  ? 'Abrir menú'
                  : collapsed
                    ? 'Expandir menú'
                    : 'Contraer menú'
              }
              icon={
                esMobile
                  ? <MenuOutlined />
                  : collapsed
                    ? <MenuUnfoldOutlined />
                    : <MenuFoldOutlined />
              }
              onClick={() => {
                if (esMobile) {
                  setDrawerOpen(
                    true
                  );

                  return;
                }

                setCollapsed(
                  (actual) =>
                    !actual
                );
              }}
            />


            <div className="gd-header-breadcrumb">

              <Breadcrumb
                items={
                  breadcrumbs.map(
                    (item) => ({
                      title:
                        item.title
                    })
                  )
                }
              />

            </div>

          </div>


          <div className="gd-header-actions">

            <ThemeToggle
              size="large"
            />


            <Divider
              type="vertical"
              className="gd-header-divider"
            />


            <Dropdown
              menu={{
                items:
                  userMenu
              }}
              placement="bottomRight"
              trigger={[
                'click'
              ]}
            >

              <Button
                type="text"
                className="gd-user-button"
              >

                <Space
                  size={10}
                >

                  <Avatar
                    size={36}
                    icon={
                      !nombreUsuario
                        ? <UserOutlined />
                        : undefined
                    }
                  >
                    {
                      obtenerIniciales(
                        nombreUsuario
                      )
                    }
                  </Avatar>


                  {!esMobile && (
                    <div className="gd-user-copy">

                      <Text
                        strong
                        ellipsis
                      >
                        {
                          nombreUsuario
                        }
                      </Text>

                      <Text
                        type="secondary"
                        ellipsis
                        className="gd-user-role"
                      >
                        {
                          rolTexto
                        }
                      </Text>

                    </div>
                  )}

                </Space>

              </Button>

            </Dropdown>

          </div>

        </Header>


        <Content className="gd-app-content">

          <div className="gd-content-inner">

            <Outlet />

          </div>

        </Content>

      </Layout>

    </Layout>
  );
}


export default GestionLayout;
