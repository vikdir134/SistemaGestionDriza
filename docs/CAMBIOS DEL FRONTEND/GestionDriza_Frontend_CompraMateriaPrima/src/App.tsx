import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';

import './styles/pedidos.css';

import Login
  from './pages/Login';

import Dashboard
  from './pages/Dashboard';

import Catalogos
  from './pages/Catalogos';

import PedidosLista
  from './pages/pedidos/PedidosLista';

import RegistrarPedido
  from './pages/pedidos/RegistrarPedido';

import PedidoDetalle
  from './pages/pedidos/PedidoDetalle';

import EditarPedido
  from './pages/pedidos/EditarPedido';

import Entregas
  from './pages/Entregas';

import EntregaPedidoDetalle
  from './pages/EntregaPedidoDetalle';

import Depositos
  from './pages/Depositos';

import DepositoPedidoDetalle
  from './pages/DepositoPedidoDetalle';

import Proveedores
  from './pages/Proveedores';

import Compras
  from './pages/Compras';

import ComprasMateriaPrimaLista
  from './pages/comprasMateriaPrima/ComprasMateriaPrimaLista';

import RegistrarCompraMateriaPrima
  from './pages/comprasMateriaPrima/RegistrarCompraMateriaPrima';

import CompraMateriaPrimaDetalle
  from './pages/comprasMateriaPrima/CompraMateriaPrimaDetalle';

import Gastos
  from './pages/Gastos';

import EditarGasto
  from './pages/gastos/EditarGasto';

import ClientesLista
  from './pages/clientes/ClientesLista';

import RegistrarCliente
  from './pages/clientes/RegistrarCliente';

import EditarCliente
  from './pages/clientes/EditarCliente';

import HistorialPreciosCliente
  from './pages/clientes/HistorialPreciosCliente';

import UsuariosAdmin
  from './pages/usuarios/UsuariosAdmin';

import ProtectedRoute
  from './components/ProtectedRoute';

import GestionLayout
  from './layouts/GestionLayout';


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        <Route
          path="/login"
          element={
            <Login />
          }
        />


        <Route
          path="/gestion"
          element={
            <ProtectedRoute>
              <GestionLayout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={
              <Dashboard />
            }
          />


          <Route
            path="usuarios"
            element={
              <ProtectedRoute
                rolesPermitidos={[
                  'ADMIN'
                ]}
              >
                <UsuariosAdmin />
              </ProtectedRoute>
            }
          />


          <Route
            path="catalogos"
            element={
              <Catalogos />
            }
          />


          {/* =========================
              PEDIDOS
              ========================= */}

          <Route
            path="pedidos"
            element={
              <PedidosLista />
            }
          />

          <Route
            path="pedidos/registrar"
            element={
              <RegistrarPedido />
            }
          />

          <Route
            path="pedidos/:pedido_id"
            element={
              <PedidoDetalle />
            }
          />

          <Route
            path="pedidos/:pedido_id/editar"
            element={
              <EditarPedido />
            }
          />


          {/* =========================
              ENTREGAS
              ========================= */}

          <Route
            path="entregas"
            element={
              <Entregas />
            }
          />

          <Route
            path="entregas/:pedido_id"
            element={
              <EntregaPedidoDetalle />
            }
          />


          {/* =========================
              DEPOSITOS
              ========================= */}

          <Route
            path="depositos"
            element={
              <Depositos />
            }
          />

          <Route
            path="depositos/:pedido_id"
            element={
              <DepositoPedidoDetalle />
            }
          />


          {/* =========================
              PROVEEDORES
              ========================= */}

          <Route
            path="proveedores"
            element={
              <Proveedores />
            }
          />


          {/* =========================
              COMPRAS GENERALES
              ========================= */}

          <Route
            path="compras"
            element={
              <Compras />
            }
          />


          {/* =========================
              COMPRAS MATERIA PRIMA
              ========================= */}

          <Route
            path="compras-materia-prima"
            element={
              <ComprasMateriaPrimaLista />
            }
          />

          <Route
            path="compras-materia-prima/registrar"
            element={
              <RegistrarCompraMateriaPrima />
            }
          />

          <Route
            path="compras-materia-prima/:compra_materia_prima_id"
            element={
              <CompraMateriaPrimaDetalle />
            }
          />


          {/* =========================
              GASTOS
              ========================= */}

          <Route
            path="gastos"
            element={
              <Gastos />
            }
          />

          <Route
            path="gastos/:gasto_id/editar"
            element={
              <EditarGasto />
            }
          />


          {/* =========================
              CLIENTES
              ========================= */}

          <Route
            path="clientes"
            element={
              <ClientesLista />
            }
          />

          <Route
            path="clientes/registrar"
            element={
              <RegistrarCliente />
            }
          />

          <Route
            path="clientes/precios"
            element={
              <HistorialPreciosCliente />
            }
          />

          <Route
            path="clientes/:cliente_id/editar"
            element={
              <EditarCliente />
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}


export default App;
