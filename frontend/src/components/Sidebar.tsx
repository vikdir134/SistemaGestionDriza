import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cerrarSesion, getUsuario } from '../services/api';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = getUsuario();

  const pedidosActivo = location.pathname.startsWith('/gestion/pedidos');

  const [pedidosAbierto, setPedidosAbierto] = useState(pedidosActivo);

  useEffect(() => {
    if (pedidosActivo) {
      setPedidosAbierto(true);
    }
  }, [pedidosActivo]);

  const handleLogout = () => {
    cerrarSesion();
    navigate('/login');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? 'sidebar-link sidebar-link-active'
      : 'sidebar-link';
  };

  return (
    <aside className="sidebar">
      <h2>Sistema de Gestion</h2>

      <p className="usuario">
        {usuario?.nombre_completo}
      </p>

      <nav>
        <NavLink end to="/gestion" className={linkClass}>
          Inicio
        </NavLink>

        <NavLink to="/gestion/clientes" className={linkClass}>
          Clientes
        </NavLink>

        <NavLink to="/gestion/catalogos" className={linkClass}>
          Catálogos
        </NavLink>

        <button
          type="button"
          className={
            pedidosActivo
              ? 'sidebar-group-button sidebar-group-active'
              : 'sidebar-group-button'
          }
          onClick={() => setPedidosAbierto(!pedidosAbierto)}
        >
          Pedidos {pedidosAbierto ? '▾' : '▸'}
        </button>

        {pedidosAbierto && (
          <div className="sidebar-submenu">
            <NavLink end to="/gestion/pedidos" className={linkClass}>
              Pedidos totales
            </NavLink>

            <NavLink to="/gestion/pedidos/registrar" className={linkClass}>
              Registrar pedido
            </NavLink>
          </div>
        )}

        <NavLink to="/gestion/entregas" className={linkClass}>
          Registro de Entregas
        </NavLink>

        <NavLink to="/gestion/depositos" className={linkClass}>
          Registro de Depósitos
        </NavLink>

        <NavLink to="/gestion/proveedores" className={linkClass}>
          Proveedores
        </NavLink>

        <NavLink to="/gestion/compras" className={linkClass}>
          Registro de Compras
        </NavLink>

        <NavLink to="/gestion/gastos" className={linkClass}>
          Registro de Gastos
        </NavLink>
      </nav>

      <button onClick={handleLogout} className="btn-logout">
        Cerrar sesión
      </button>
    </aside>
  );
}

export default Sidebar;