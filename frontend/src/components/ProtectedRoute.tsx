import { Navigate } from 'react-router-dom';
import { getToken, getUsuario } from '../services/api';

interface Props {
  children: React.ReactNode;
  rolesPermitidos?: string[];
}

function ProtectedRoute({ children, rolesPermitidos }: Props) {
  const token = getToken();
  const usuario = getUsuario();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const rolesUsuario = usuario?.roles || [];

    const tienePermiso = rolesUsuario.some((rol: string) =>
      rolesPermitidos.includes(rol)
    );

    if (!tienePermiso) {
      return <Navigate to="/gestion" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;