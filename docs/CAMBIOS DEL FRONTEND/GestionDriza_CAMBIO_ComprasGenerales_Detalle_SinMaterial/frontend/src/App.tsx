

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

import ProductosTerminadosLista
  from './pages/productosTerminados/ProductosTerminadosLista';

import RegistrarProductoTerminado
  from './pages/productosTerminados/RegistrarProductoTerminado';

import ProductoTerminadoDetalle
  from './pages/productosTerminados/ProductoTerminadoDetalle';

import ProduccionesLista
  from './pages/producciones/ProduccionesLista';

import RegistrarProduccion
  from './pages/producciones/RegistrarProduccion';

import ProduccionDetalle
  from './pages/producciones/ProduccionDetalle';

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

import CompraDetalle
  from './pages/CompraDetalle';

import ComprasMateriaPrimaLista
  from './pages/comprasMateriaPrima/ComprasMateriaPrimaLista';

import RegistrarCompraMateriaPrima
  from './pages/comprasMateriaPrima/RegistrarCompraMateriaPrima';

import CompraMateriaPrimaDetalle
  from './pages/comprasMateriaPrima/CompraMateriaPrimaDetalle';

import AlmacenMateriaPrima
  from './pages/almacenMateriaPrima/AlmacenMateriaPrima';

import AlmacenMateriaPrimaLoteDetalle
  from './pages/almacenMateriaPrima/AlmacenMateriaPrimaLoteDetalle';

import AlmacenProductoTerminado
  from './pages/almacenProductoTerminado/AlmacenProductoTerminado';

import AlmacenProductoTerminadoDetalle
  from './pages/almacenProductoTerminado/AlmacenProductoTerminadoDetalle';

import MermasLista
  from './pages/mermas/MermasLista';

import RegistrarMerma
  from './pages/mermas/RegistrarMerma';

import MermaDetalle
  from './pages/mermas/MermaDetalle';

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
              PRODUCTOS TERMINADOS
              ========================= */}

          <Route
            path="productos-terminados"
            element={
              <ProductosTerminadosLista />
            }
          />

          <Route
            path="productos-terminados/registrar"
            element={
              <RegistrarProductoTerminado />
            }
          />

          <Route
            path="productos-terminados/:producto_id"
            element={
              <ProductoTerminadoDetalle />
            }
          />


          {/* =========================
              PRODUCCION
              ========================= */}

          <Route
            path="producciones"
            element={
              <ProduccionesLista />
            }
          />

          <Route
            path="producciones/registrar"
            element={
              <RegistrarProduccion />
            }
          />

          <Route
            path="producciones/:produccion_id"
            element={
              <ProduccionDetalle />
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

          <Route
            path="compras/:compra_id"
            element={
              <CompraDetalle />
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
              ALMACEN MATERIA PRIMA
              ========================= */}

          <Route
            path="almacen/materia-prima"
            element={
              <AlmacenMateriaPrima />
            }
          />

          <Route
            path="almacen/materia-prima/lotes/:stock_materia_prima_lote_id"
            element={
              <AlmacenMateriaPrimaLoteDetalle />
            }
          />


          {/* =========================
              ALMACEN PRODUCTO TERMINADO
              ========================= */}

          <Route
            path="almacen/producto-terminado"
            element={
              <AlmacenProductoTerminado />
            }
          />

          <Route
            path="almacen/producto-terminado/presentaciones/:stock_producto_terminado_id"
            element={
              <AlmacenProductoTerminadoDetalle />
            }
          />


          {/* =========================
              MERMAS
              ========================= */}

          <Route
            path="mermas"
            element={
              <MermasLista />
            }
          />

          <Route
            path="mermas/registrar"
            element={
              <RegistrarMerma />
            }
          />

          <Route
            path="mermas/:merma_id"
            element={
              <MermaDetalle />
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


