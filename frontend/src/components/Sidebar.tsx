import { Link, useNavigate } from 'react-router-dom';
import { cerrarSesion, getUsuario } from '../services/api';

function Sidebar() {
  const navigate = useNavigate();
  const usuario = getUsuario();

  const handleLogout = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <h2>Sistema de Gestion</h2>

      <p className="usuario">
        {usuario?.nombre_completo}
      </p>

      <nav>
        <Link to="/gestion">Inicio</Link>
        <Link to="/gestion/clientes">Clientes</Link>
        <Link to="/gestion/catalogos">Catálogos</Link>
        <Link to="/gestion/pedidos">Registro de Pedidos</Link>
        <Link to="/gestion/entregas">Registro de Entregas</Link>
        <Link to="/gestion/depositos">Registro de Depósitos</Link>
        <Link to="/gestion/proveedores">Proveedores</Link>
        <Link to="/gestion/compras">Registro de Compras</Link>
        <Link to="/gestion/gastos">Registro de Gastos</Link>
      </nav>

      <button onClick={handleLogout} className="btn-logout">
        Cerrar sesión
      </button>
    </aside>
  );
}

export default Sidebar;