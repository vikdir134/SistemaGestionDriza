import { getUsuario } from '../services/api';

function Dashboard() {
  const usuario = getUsuario();

  return (
    <div>
      <h1>Panel de gestión</h1>
      <p>Bienvenido al sistema de gestión de la empresa de driza.</p>

      <div className="cards">
        <div className="card">
          <h3>Usuario</h3>
          <p>{usuario?.nombre_completo}</p>
        </div>

        <div className="card">
          <h3>Correo</h3>
          <p>{usuario?.correo}</p>
        </div>

        <div className="card">
          <h3>Roles</h3>
          <p>{usuario?.roles?.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;