import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function GestionLayout() {
  return (
    <div className="gestion-layout">
      <Sidebar />

      <main className="contenido">
        <Outlet />
      </main>
    </div>
  );
}

export default GestionLayout;