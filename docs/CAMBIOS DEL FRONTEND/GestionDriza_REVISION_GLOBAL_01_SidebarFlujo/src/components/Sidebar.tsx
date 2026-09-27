import type {
  MenuProps
} from 'antd';

import {
  Menu
} from 'antd';

import {
  BankOutlined,
  BarsOutlined,
  BookOutlined,
  BuildOutlined,
  DatabaseOutlined,
  DollarOutlined,
  HomeOutlined,
  InboxOutlined,
  PlusOutlined,
  ProductOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  ToolOutlined,
  TruckOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useState
} from 'react';

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
   * Primero resolvemos rutas exactas que tienen
   * su propio elemento en un submenú.
   *
   * Esto evita el problema histórico donde:
   *
   * /gestion/producciones/registrar
   *
   * terminaba seleccionando:
   *
   * /gestion/producciones
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
   * Las rutas raíz se ordenan desde las más específicas.
   * Sus pantallas de detalle mantienen seleccionado
   * el módulo principal sin exponer IDs.
   */
  const rutasRaiz = [
    '/gestion/almacen/producto-terminado',
    '/gestion/almacen/materia-prima',
    '/gestion/compras-materia-prima',
    '/gestion/productos-terminados',
    '/gestion/producciones',
    '/gestion/pedidos',
    '/gestion/entregas',
    '/gestion/depositos',
    '/gestion/proveedores',
    '/gestion/compras',
    '/gestion/catalogos',
    '/gestion/clientes',
    '/gestion/mermas',
    '/gestion/gastos',
    '/gestion/usuarios'
  ];


  const coincidencia =
    rutasRaiz.find(
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
      '/gestion/compras'
    )
  ) {
    keys.push(
      'grupo-compras'
    );
  }


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


  return keys;
};


const crearSeccion = (
  key: string,
  label: string
): MenuItem => ({
  key,
  label,
  disabled: true,
  className:
    'gd-sidebar-section'
} as MenuItem);


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


  /*
   * Conserva los grupos que el usuario abra manualmente,
   * pero fuerza abierto el grupo de la ruta actual.
   *
   * Así, si navegamos desde un botón del Dashboard hacia
   * "Registrar producción", el submenú se abre y además
   * se pinta correctamente el elemento seleccionado.
   */
  const [
    openKeysUsuario,
    setOpenKeysUsuario
  ] = useState<string[]>(
    []
  );


  const openKeysRuta =
    obtenerOpenKeys(
      location.pathname
    );


  const openKeys =
    Array.from(
      new Set([
        ...openKeysUsuario,
        ...openKeysRuta
      ])
    );


  const items:
    MenuItem[] = [
    {
      key: '/gestion',
      icon:
        <HomeOutlined />,
      label: 'Inicio'
    },


    ...(
      collapsed
        ? []
        : [
            crearSeccion(
              'seccion-configuracion',
              'CONFIGURACIÓN'
            )
          ]
    ),


    {
      key:
        '/gestion/catalogos',
      icon:
        <BookOutlined />,
      label: 'Catálogos'
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
        '/gestion/clientes',
      icon:
        <TeamOutlined />,
      label: 'Clientes'
    },


    {
      key:
        '/gestion/productos-terminados',
      icon:
        <ProductOutlined />,
      label:
        'Productos terminados'
    },


    ...(
      collapsed
        ? []
        : [
            crearSeccion(
              'seccion-abastecimiento',
              'ABASTECIMIENTO'
            )
          ]
    ),


    {
      key:
        'grupo-compras',
      icon:
        <ShoppingCartOutlined />,
      label: 'Compras',

      children: [
        {
          key:
            '/gestion/compras-materia-prima/registrar',
          icon:
            <PlusOutlined />,
          label:
            'Registrar lote'
        },

        {
          key:
            '/gestion/compras-materia-prima',
          icon:
            <DatabaseOutlined />,
          label:
            'Lotes de materia prima'
        },

        {
          key:
            '/gestion/compras',
          icon:
            <BarsOutlined />,
          label:
            'Compras generales'
        }
      ]
    },


    {
      key:
        '/gestion/almacen/materia-prima',
      icon:
        <InboxOutlined />,
      label:
        'Almacén materia prima'
    },


    ...(
      collapsed
        ? []
        : [
            crearSeccion(
              'seccion-produccion',
              'PRODUCCIÓN'
            )
          ]
    ),


    {
      key:
        'grupo-produccion',
      icon:
        <BuildOutlined />,
      label: 'Producción',

      children: [
        {
          key:
            '/gestion/producciones/registrar',
          icon:
            <BuildOutlined />,
          label:
            'Registrar producción'
        },

        {
          key:
            '/gestion/producciones',
          icon:
            <BarsOutlined />,
          label:
            'Historial de producción'
        }
      ]
    },


    {
      key:
        '/gestion/almacen/producto-terminado',
      icon:
        <ProductOutlined />,
      label:
        'Almacén producto terminado'
    },


    ...(
      collapsed
        ? []
        : [
            crearSeccion(
              'seccion-ventas',
              'VENTAS Y COBROS'
            )
          ]
    ),


    {
      key:
        'grupo-pedidos',
      icon:
        <ShoppingCartOutlined />,
      label: 'Pedidos',

      children: [
        {
          key:
            '/gestion/pedidos/registrar',
          icon:
            <ShoppingCartOutlined />,
          label:
            'Registrar pedido'
        },

        {
          key:
            '/gestion/pedidos',
          icon:
            <BarsOutlined />,
          label:
            'Historial de pedidos'
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


    ...(
      collapsed
        ? []
        : [
            crearSeccion(
              'seccion-control',
              'CONTROL'
            )
          ]
    ),


    {
      key:
        '/gestion/mermas',
      icon:
        <ToolOutlined />,
      label: 'Mermas'
    },


    {
      key:
        '/gestion/gastos',
      icon:
        <DollarOutlined />,
      label: 'Gastos'
    },


    ...(
      esAdmin &&
      !collapsed
        ? [
            crearSeccion(
              'seccion-administracion',
              'ADMINISTRACIÓN'
            )
          ]
        : []
    ),


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
      : [])
  ];


  const selectedKey =
    obtenerSelectedKey(
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
      openKeys={
        openKeys
      }
      onOpenChange={(
        keys
      ) =>
        setOpenKeysUsuario(
          keys
        )
      }
      onClick={
        handleClick
      }
      className="gd-sidebar-menu"
    />
  );
}


export default Sidebar;
