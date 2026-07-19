import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';

function ClientesLista() {
  const [clientes, setClientes] = useState<any[]>([]);
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

  const cargarClientes = async (
    paginaActual = page,
    busquedaActual = busqueda
  ) => {
    const params = new URLSearchParams();

    params.append('page', String(paginaActual));
    params.append('limit', '10');

    if (busquedaActual.trim()) {
      params.append('q', busquedaActual.trim());
    }

    const data = await apiFetch(`/clientes?${params.toString()}`);

    setClientes(data.clientes);
    setPaginacion(data.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarClientes(1);
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
        await cargarClientes(page);
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    cargar();
  }, [page]);

  const aplicarBusqueda = async (e: React.FormEvent) => {
    e.preventDefault();

    setPage(1);

    try {
      await cargarClientes(1);
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const limpiarFiltros = async () => {
    setBusqueda('');
    setPage(1);

    try {
      await cargarClientes(1, '');
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
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
          <h1>Clientes</h1>
          <p>Consulta, filtra, registra y edita clientes.</p>
        </div>

        <div className="pedidos-actions">
          <Link className="btn-link" to="/gestion/clientes/registrar">
            + Registrar cliente
          </Link>

          <Link className="btn-outline" to="/gestion/clientes/precios">
            Historial de precios
          </Link>
        </div>
      </div>

      <form className="filtros-card" onSubmit={aplicarBusqueda}>
        <div>
          <label>Buscar</label>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="RUC, razón social, dirección o agencia"
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
        <h3>Listado de clientes</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>RUC</th>
              <th>Razón social</th>
              <th>Dirección</th>
              <th>Agencia</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.cliente_id}>
                <td>#{cliente.cliente_id}</td>
                <td>{cliente.ruc}</td>
                <td>
                  <strong>{cliente.razon_social}</strong>
                </td>
                <td>{cliente.direccion || '-'}</td>
                <td>{cliente.agencia_entrega || '-'}</td>
                <td>{cliente.telefono || '-'}</td>
                <td>{cliente.correo || '-'}</td>
                <td>
                  <div className="tabla-acciones">
                    <Link
                      className="btn-outline"
                      to={`/gestion/clientes/${cliente.cliente_id}/editar`}
                    >
                      Editar
                    </Link>

                    <Link
                      className="btn-link"
                      to={`/gestion/clientes/precios?cliente_id=${cliente.cliente_id}`}
                    >
                      Precios
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {clientes.length === 0 && (
              <tr>
                <td colSpan={8}>No hay clientes registrados.</td>
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

export default ClientesLista;