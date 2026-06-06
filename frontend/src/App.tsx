import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Catalogos from './pages/Catalogos';
import Productos from './pages/Productos';
import Pedidos from './pages/Pedidos';
import Entregas from './pages/Entregas';
import EntregaPedidoDetalle from './pages/EntregaPedidoDetalle';

import ProtectedRoute from './components/ProtectedRoute';
import GestionLayout from './layouts/GestionLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/gestion"
          element={
            <ProtectedRoute>
              <GestionLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="catalogos" element={<Catalogos />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="entregas" element={<Entregas />} />
          <Route path="entregas/:pedido_id" element={<EntregaPedidoDetalle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;