import {
  NavLink,
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  useEffect,
  useState
} from 'react';

import {
  cerrarSesion,
  getUsuario
} from '../services/api';


function Sidebar() {
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

  const pedidosActivo =
    location.pathname
      .startsWith(
        '/gestion/pedidos'
      );

  const comprasActivo =
    location.pathname
      .startsWith(
        '/gestion/compras'
      );

  const [
    pedidosAbierto,
    setPedidosAbierto
  ] = useState(
    pedidosActivo
  );

  const [
    comprasAbierto,
    setComprasAbierto
  ] = useState(
    comprasActivo
  );


  useEffect(() => {
    if (pedidosActivo) {
      setPedidosAbierto(
        true
      );
    }
  }, [
    pedidosActivo
  ]);


  useEffect(() => {
    if (comprasActivo) {
      setComprasAbierto(
        true
      );
    }
  }, [
    comprasActivo
  ]);


  const handleLogout = () => {
    cerrarSesion();

    navigate(
      '/login'
    );
  };


  const linkClass = ({
    isActive
  }: {
    isActive: boolean;
  }) => {
    return isActive
      ? 'sidebar-link sidebar-link-active'
      : 'sidebar-link';
  };


  return (
    <aside className="sidebar">

      <h2>
        Sistema de Gestion
      </h2>


      <p className="usuario">
        {
          usuario
            ?.nombre_completo
        }
      </p>


      <nav>

        <NavLink
          end
          to="/gestion"
          className={linkClass}
        >
          Inicio
        </NavLink>


        {esAdmin && (
          <NavLink
            to="/gestion/usuarios"
            className={linkClass}
          >
            Usuarios
          </NavLink>
        )}


        <NavLink
          to="/gestion/clientes"
          className={linkClass}
        >
          Clientes
        </NavLink>


        <NavLink
          to="/gestion/catalogos"
          className={linkClass}
        >
          Catálogos
        </NavLink>


        {/* =========================
            PEDIDOS
            ========================= */}

        <button
          type="button"
          className={
            pedidosActivo
              ? 'sidebar-group-button sidebar-group-active'
              : 'sidebar-group-button'
          }
          onClick={() =>
            setPedidosAbierto(
              !pedidosAbierto
            )
          }
        >
          Pedidos {
            pedidosAbierto
              ? '▾'
              : '▸'
          }
        </button>


        {pedidosAbierto && (
          <div className="sidebar-submenu">

            <NavLink
              end
              to="/gestion/pedidos"
              className={linkClass}
            >
              Pedidos totales
            </NavLink>

            <NavLink
              to="/gestion/pedidos/registrar"
              className={linkClass}
            >
              Registrar pedido
            </NavLink>

          </div>
        )}


        <NavLink
          to="/gestion/entregas"
          className={linkClass}
        >
          Registro de Entregas
        </NavLink>


        <NavLink
          to="/gestion/depositos"
          className={linkClass}
        >
          Registro de Depósitos
        </NavLink>


        <NavLink
          to="/gestion/proveedores"
          className={linkClass}
        >
          Proveedores
        </NavLink>


        {/* =========================
            COMPRAS
            ========================= */}

        <button
          type="button"
          className={
            comprasActivo
              ? 'sidebar-group-button sidebar-group-active'
              : 'sidebar-group-button'
          }
          onClick={() =>
            setComprasAbierto(
              !comprasAbierto
            )
          }
        >
          Compras {
            comprasAbierto
              ? '▾'
              : '▸'
          }
        </button>


        {comprasAbierto && (
          <div className="sidebar-submenu">

            <NavLink
              end
              to="/gestion/compras"
              className={linkClass}
            >
              Compras generales
            </NavLink>

            <NavLink
              end
              to="/gestion/compras-materia-prima"
              className={linkClass}
            >
              Materia prima
            </NavLink>

            <NavLink
              to="/gestion/compras-materia-prima/registrar"
              className={linkClass}
            >
              Registrar lote
            </NavLink>

          </div>
        )}


        <NavLink
          to="/gestion/gastos"
          className={linkClass}
        >
          Registro de Gastos
        </NavLink>

      </nav>


      <button
        onClick={
          handleLogout
        }
        className="btn-logout"
      >
        Cerrar sesión
      </button>

    </aside>
  );
}


export default Sidebar;
