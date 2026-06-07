import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Catalogos from './pages/Catalogos';
import Productos from './pages/Productos';
import Pedidos from './pages/Pedidos';
import Entregas from './pages/Entregas';
import EntregaPedidoDetalle from './pages/EntregaPedidoDetalle';
import Depositos from './pages/Depositos';
import DepositoPedidoDetalle from './pages/DepositoPedidoDetalle';
import Proveedores from './pages/Proveedores';
import Compras from './pages/Compras';
import Gastos from './pages/Gastos';


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
          <Route path="depositos" element={<Depositos />} />
          <Route path="depositos/:pedido_id" element={<DepositoPedidoDetalle />} />  
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="compras" element={<Compras />} />
          <Route path="gastos" element={<Gastos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;