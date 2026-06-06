import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../services/api';

function Entregas() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);

  const [clienteId, setClienteId] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [error, setError] = useState('');

  const cargarClientes = async () => {
    const data = await apiFetch('/clientes');
    setClientes(data.clientes);
  };

  const cargarPedidos = async () => {
    const params = new URLSearchParams();

    params.append('page', String(page));
    params.append('limit', '10');

    if (clienteId) {
      params.append('cliente_id', clienteId);
    }

    if (busqueda.trim()) {
      params.append('q', busqueda.trim());
    }

    const data = await apiFetch(`/entregas/pedidos?${params.toString()}`);

    setPedidos(data.pedidos);
    setPaginacion(data.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarClientes();
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        await cargarPedidos();
      } catch (error: any) {
        setError(error.message);
      }
    };

    cargar();
  }, [page, clienteId]);

  const aplicarBusqueda = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);

    try {
      await cargarPedidos();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const limpiarFiltros = async () => {
    setClienteId('');
    setBusqueda('');
    setPage(1);
  };

  const claseEstado = (estado: string) => {
    if (estado === 'COMPLETO') return 'estado estado-completo';
    if (estado === 'PARCIAL') return 'estado estado-parcial';
    return 'estado estado-pendiente';
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Entregas</h1>
          <p>Selecciona un pedido para registrar entregas parciales o totales.</p>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <form className="filtros-card" onSubmit={aplicarBusqueda}>
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
          <label>Buscar</label>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Cliente, RUC o descripción"
          />
        </div>

        <div className="filtros-actions">
          <button type="submit">Buscar</button>
          <button type="button" className="btn-secondary" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </form>

      <div className="tabla-card tabla-moderna">
        <h3>Pedidos pendientes</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha pedido</th>
              <th>Entrega estimada</th>
              <th>Estado entrega</th>
              <th>Items</th>
              <th>Acción</th>
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
                  <span className={claseEstado(pedido.estado_entrega_general)}>
                    {pedido.estado_entrega_general}
                  </span>
                </td>
                <td>{pedido.cantidad_items}</td>
                <td>
                  <Link className="btn-link" to={`/gestion/entregas/${pedido.pedido_id}`}>
                    Ver pedido
                  </Link>
                </td>
              </tr>
            ))}

            {pedidos.length === 0 && (
              <tr>
                <td colSpan={7}>No hay pedidos pendientes de entrega.</td>
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

export default Entregas;