import { Navigate } from 'react-router-dom';
import { getToken } from '../services/api';

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;