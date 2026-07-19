import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';

function PedidosLista() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);

  const [clienteId, setClienteId] = useState('');
  const [estadoPedido, setEstadoPedido] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info',
    mensaje: ''
  });

  const cargarClientes = async () => {
    const data = await apiFetch('/clientes');
    setClientes(data.clientes);
  };

  const cargarPedidos = async (
    paginaActual = page,
    clienteActual = clienteId,
    estadoActual = estadoPedido,
    busquedaActual = busqueda
  ) => {
    const params = new URLSearchParams();

    params.append('page', String(paginaActual));
    params.append('limit', '10');

    if (clienteActual) {
      params.append('cliente_id', clienteActual);
    }

    if (estadoActual) {
      params.append('estado_pedido', estadoActual);
    }

    if (busquedaActual.trim()) {
      params.append('q', busquedaActual.trim());
    }

    const data = await apiFetch(`/pedidos?${params.toString()}`);

    setPedidos(data.pedidos);
    setPaginacion(data.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarClientes();
        await cargarPedidos(1);
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    iniciar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        await cargarPedidos(page);
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    cargar();
  }, [page, clienteId, estadoPedido]);

  const aplicarBusqueda = async (e: React.FormEvent) => {
    e.preventDefault();

    setPage(1);

    try {
      await cargarPedidos(1);
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const limpiarFiltros = async () => {
    setClienteId('');
    setEstadoPedido('');
    setBusqueda('');
    setPage(1);

    try {
      await cargarPedidos(1, '', '', '');
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const claseEstado = (estado: string) => {
    if (estado === 'ENTREGADO') return 'estado-pill estado-entregado';
    if (estado === 'PARCIAL') return 'estado-pill estado-parcial';
    if (estado === 'CANCELADO') return 'estado-pill estado-cancelado';
    return 'estado-pill estado-registrado';
  };

  return (
    <div className="pedidos-page">
      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() => setFeedback({ ...feedback, mensaje: '' })}
      />

      <div className="pedidos-header">
        <div>
          <h1>Pedidos totales</h1>
          <p>Consulta, filtra, revisa y edita los pedidos registrados.</p>
        </div>

        <div className="pedidos-actions">
          <Link className="btn-link" to="/gestion/pedidos/registrar">
            + Registrar pedido
          </Link>
        </div>
      </div>

      <form className="pedidos-filtros" onSubmit={aplicarBusqueda}>
        <div>
          <label>Cliente</label>
          <select
            value={clienteId}
            onChange={(e) => {
              setClienteId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todos los clientes</option>
            {clientes.map((cliente) => (
              <option key={cliente.cliente_id} value={cliente.cliente_id}>
                {cliente.razon_social} - {cliente.ruc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Estado</label>
          <select
            value={estadoPedido}
            onChange={(e) => {
              setEstadoPedido(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todos</option>
            <option value="REGISTRADO">Registrado</option>
            <option value="PARCIAL">Parcial</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>

        <div>
          <label>Buscar</label>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Cliente, RUC, código o descripción"
          />
        </div>

        <div className="filtros-actions">
          <button type="submit">Buscar</button>
          <button type="button" className="btn-secondary" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </form>

      <div className="pedidos-card">
        <h3>Listado de pedidos</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha pedido</th>
              <th>Entrega estimada</th>
              <th>Estado</th>
              <th>Items</th>
              <th>Total ref.</th>
              <th>Registrado por</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.pedido_id}>
                <td>#{pedido.pedido_id}</td>

                <td>
                  <strong>{pedido.razon_social}</strong>
                  <br />
                  <span className="muted">{pedido.ruc}</span>
                </td>

                <td>{pedido.fecha_pedido?.slice(0, 10)}</td>
                <td>{pedido.fecha_entrega_estimada?.slice(0, 10) || '-'}</td>

                <td>
                  <span className={claseEstado(pedido.estado_pedido)}>
                    {pedido.estado_pedido}
                  </span>
                </td>

                <td>{pedido.cantidad_items}</td>
                <td>{Number(pedido.total_referencial || 0).toFixed(2)}</td>
                <td>{pedido.registrado_por}</td>

                <td>
                  <div className="tabla-acciones">
                    <Link
                      className="btn-link"
                      to={`/gestion/pedidos/${pedido.pedido_id}`}
                    >
                      Ver
                    </Link>

                    <Link
                      className="btn-outline"
                      to={`/gestion/pedidos/${pedido.pedido_id}/editar`}
                    >
                      Editar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {pedidos.length === 0 && (
              <tr>
                <td colSpan={9}>No hay pedidos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="paginado">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginacion.page} de {paginacion.totalPaginas || 1}
          </span>

          <button
            type="button"
            disabled={page >= paginacion.totalPaginas}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default PedidosLista;