import type {
  MenuProps
} from 'antd';

import {
  Menu
} from 'antd';

import {
  AppstoreOutlined,
  BankOutlined,
  BarsOutlined,
  BookOutlined,
  BuildOutlined,
  DatabaseOutlined,
  DollarOutlined,
  HomeOutlined,
  InboxOutlined,
  ProductOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  ToolOutlined,
  TruckOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  getUsuario
} from '../services/api';


type MenuItem =
  Required<
    MenuProps
  >['items'][number];


const obtenerSelectedKey = (
  pathname: string
) => {
  /*
   * Primero resolvemos las rutas que tienen una opción
   * específica dentro de un submenú.
   *
   * Si evaluáramos antes '/gestion/producciones',
   * '/gestion/producciones/registrar' terminaría
   * seleccionando incorrectamente "Historial".
   */
  const rutasExactas = [
    '/gestion/producciones/registrar',
    '/gestion/pedidos/registrar',
    '/gestion/compras-materia-prima/registrar'
  ];

  const exacta =
    rutasExactas.find(
      (ruta) =>
        pathname === ruta
    );

  if (exacta) {
    return exacta;
  }


  /*
   * Para páginas de detalle o edición se mantiene
   * seleccionada la sección principal correspondiente.
   */
  const rutasBase = [
    '/gestion/usuarios',
    '/gestion/clientes',
    '/gestion/catalogos',
    '/gestion/productos-terminados',
    '/gestion/producciones',
    '/gestion/pedidos',
    '/gestion/entregas',
    '/gestion/depositos',
    '/gestion/proveedores',
    '/gestion/compras-materia-prima',
    '/gestion/compras',
    '/gestion/almacen/materia-prima',
    '/gestion/almacen/producto-terminado',
    '/gestion/mermas',
    '/gestion/gastos'
  ];

  const coincidencia =
    rutasBase.find(
      (ruta) =>
        pathname === ruta ||
        pathname.startsWith(
          `${ruta}/`
        )
    );

  return coincidencia ||
    '/gestion';
};


const obtenerOpenKeys = (
  pathname: string
) => {
  const keys: string[] = [];

  if (
    pathname.startsWith(
      '/gestion/producciones'
    )
  ) {
    keys.push(
      'grupo-produccion'
    );
  }

  if (
    pathname.startsWith(
      '/gestion/pedidos'
    )
  ) {
    keys.push(
      'grupo-pedidos'
    );
  }

  if (
    pathname.startsWith(
      '/gestion/compras'
    )
  ) {
    keys.push(
      'grupo-compras'
    );
  }

  if (
    pathname.startsWith(
      '/gestion/almacen'
    ) ||
    pathname.startsWith(
      '/gestion/mermas'
    )
  ) {
    keys.push(
      'grupo-almacen'
    );
  }

  return keys;
};


type Props = {
  collapsed?: boolean;
  onNavigate?: () => void;
};


function Sidebar({
  collapsed = false,
  onNavigate
}: Props) {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const usuario =
    getUsuario();

  const esAdmin =
    usuario?.roles?.includes(
      'ADMIN'
    );


  const items: MenuItem[] = [
    {
      key: '/gestion',
      icon:
        <HomeOutlined />,
      label: 'Inicio'
    },

    ...(esAdmin
      ? [
          {
            key:
              '/gestion/usuarios',
            icon:
              <UserOutlined />,
            label: 'Usuarios'
          } as MenuItem
        ]
      : []),

    {
      key:
        '/gestion/clientes',
      icon:
        <TeamOutlined />,
      label: 'Clientes'
    },

    {
      key:
        '/gestion/catalogos',
      icon:
        <BookOutlined />,
      label: 'Catálogos'
    },

    {
      key:
        '/gestion/productos-terminados',
      icon:
        <ProductOutlined />,
      label:
        'Productos terminados'
    },

    {
      key:
        'grupo-produccion',
      icon:
        <BuildOutlined />,
      label: 'Producción',

      children: [
        {
          key:
            '/gestion/producciones',
          icon:
            <BarsOutlined />,
          label: 'Historial'
        },

        {
          key:
            '/gestion/producciones/registrar',
          icon:
            <BuildOutlined />,
          label:
            'Registrar producción'
        }
      ]
    },

    {
      key:
        'grupo-pedidos',
      icon:
        <ShoppingCartOutlined />,
      label: 'Pedidos',

      children: [
        {
          key:
            '/gestion/pedidos',
          icon:
            <BarsOutlined />,
          label: 'Pedidos totales'
        },

        {
          key:
            '/gestion/pedidos/registrar',
          icon:
            <ShoppingCartOutlined />,
          label:
            'Registrar pedido'
        }
      ]
    },

    {
      key:
        '/gestion/entregas',
      icon:
        <TruckOutlined />,
      label: 'Entregas'
    },

    {
      key:
        '/gestion/depositos',
      icon:
        <BankOutlined />,
      label: 'Depósitos'
    },

    {
      key:
        '/gestion/proveedores',
      icon:
        <ShopOutlined />,
      label: 'Proveedores'
    },

    {
      key:
        'grupo-compras',
      icon:
        <ShoppingCartOutlined />,
      label: 'Compras',

      children: [
        {
          key:
            '/gestion/compras',
          icon:
            <BarsOutlined />,
          label:
            'Compras generales'
        },

        {
          key:
            '/gestion/compras-materia-prima',
          icon:
            <DatabaseOutlined />,
          label: 'Materia prima'
        },

        {
          key:
            '/gestion/compras-materia-prima/registrar',
          icon:
            <ShoppingCartOutlined />,
          label: 'Registrar lote'
        }
      ]
    },

    {
      key:
        'grupo-almacen',
      icon:
        <InboxOutlined />,
      label: 'Almacén',

      children: [
        {
          key:
            '/gestion/almacen/materia-prima',
          icon:
            <DatabaseOutlined />,
          label: 'Materia prima'
        },

        {
          key:
            '/gestion/almacen/producto-terminado',
          icon:
            <ProductOutlined />,
          label:
            'Producto terminado'
        },

        {
          key:
            '/gestion/mermas',
          icon:
            <ToolOutlined />,
          label: 'Mermas'
        }
      ]
    },

    {
      key:
        '/gestion/gastos',
      icon:
        <DollarOutlined />,
      label: 'Gastos'
    }
  ];


  const selectedKey =
    obtenerSelectedKey(
      location.pathname
    );

  const defaultOpenKeys =
    obtenerOpenKeys(
      location.pathname
    );


  const handleClick:
    MenuProps['onClick'] = ({
      key
    }) => {
      if (
        !key.startsWith('/')
      ) {
        return;
      }

      navigate(
        key
      );

      onNavigate?.();
    };


  return (
    <Menu
      theme="dark"
      mode="inline"
      inlineCollapsed={
        collapsed
      }
      items={items}
      selectedKeys={[
        selectedKey
      ]}
      defaultOpenKeys={
        defaultOpenKeys
      }
      onClick={
        handleClick
      }
      className="gd-sidebar-menu"
    />
  );
}


export default Sidebar;
