import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './styles/pedidos.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Catalogos from './pages/Catalogos';
import Productos from './pages/Productos';
import PedidosLista from './pages/pedidos/PedidosLista';
import RegistrarPedido from './pages/pedidos/RegistrarPedido';
import PedidoDetalle from './pages/pedidos/PedidoDetalle';
import EditarPedido from './pages/pedidos/EditarPedido';
import Entregas from './pages/Entregas';
import EntregaPedidoDetalle from './pages/EntregaPedidoDetalle';
import Depositos from './pages/Depositos';
import DepositoPedidoDetalle from './pages/DepositoPedidoDetalle';
import Proveedores from './pages/Proveedores';
import Compras from './pages/Compras';
import Gastos from './pages/Gastos';
import ClientesLista from './pages/clientes/ClientesLista';
import RegistrarCliente from './pages/clientes/RegistrarCliente';
import EditarCliente from './pages/clientes/EditarCliente';
import HistorialPreciosCliente from './pages/clientes/HistorialPreciosCliente';

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
          <Route path="catalogos" element={<Catalogos />} />
          <Route path="pedidos" element={<PedidosLista />} />
          <Route path="pedidos/registrar" element={<RegistrarPedido />} />
          <Route path="pedidos/:pedido_id" element={<PedidoDetalle />} />
          <Route path="pedidos/:pedido_id/editar" element={<EditarPedido />} />
          <Route path="entregas" element={<Entregas />} />
          <Route path="entregas/:pedido_id" element={<EntregaPedidoDetalle />} />
          <Route path="depositos" element={<Depositos />} />
          <Route path="depositos/:pedido_id" element={<DepositoPedidoDetalle />} />  
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="compras" element={<Compras />} />
          <Route path="gastos" element={<Gastos />} />
          <Route path="clientes" element={<ClientesLista />} />
          <Route path="clientes/registrar" element={<RegistrarCliente />} />
          <Route path="clientes/precios" element={<HistorialPreciosCliente />} />
          <Route path="clientes/:cliente_id/editar" element={<EditarCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;