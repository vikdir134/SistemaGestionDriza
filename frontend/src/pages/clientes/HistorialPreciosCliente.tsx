import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';

function HistorialPreciosCliente() {
  const [searchParams] = useSearchParams();

  const clienteIdInicial = searchParams.get('cliente_id') || '';

  const [clientes, setClientes] = useState<any[]>([]);
  const [precios, setPrecios] = useState<any[]>([]);

  const [tipos, setTipos] = useState<any[]>([]);
  const [medidas, setMedidas] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [filtros, setFiltros] = useState({
    cliente_id: clienteIdInicial,
    q: ''
  });

  const [form, setForm] = useState({
    cliente_id: clienteIdInicial,
    tipo_producto_id: '',
    medida_id: '',
    color_id: '',
    material_id: '',
    fecha_precio: '',
    precio_unitario: '',
    moneda_codigo: 'PEN',
    observacion: ''
  });

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info',
    mensaje: ''
  });

  const cargarBase = async () => {
    const [
      clientesData,
      tiposData,
      medidasData,
      coloresData,
      materialesData
    ] = await Promise.all([
      apiFetch('/clientes/select'),
      apiFetch('/catalogos/tiposProducto'),
      apiFetch('/catalogos/medidas'),
      apiFetch('/catalogos/colores'),
      apiFetch('/catalogos/materiales')
    ]);

    setClientes(clientesData.clientes);
    setTipos(tiposData.items);
    setMedidas(medidasData.items);
    setColores(coloresData.items);
    setMateriales(materialesData.items);
  };

  const cargarPrecios = async (
    paginaActual = page,
    filtrosActuales = filtros
  ) => {
    const params = new URLSearchParams();

    params.append('page', String(paginaActual));
    params.append('limit', '10');

    if (filtrosActuales.cliente_id) {
      params.append('cliente_id', filtrosActuales.cliente_id);
    }

    if (filtrosActuales.q.trim()) {
      params.append('q', filtrosActuales.q.trim());
    }

    const data = await apiFetch(`/clientes/precios?${params.toString()}`);

    setPrecios(data.precios);
    setPaginacion(data.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarBase();
        await cargarPrecios(1);
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
        await cargarPrecios(page);
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    cargar();
  }, [page]);

  const handleFiltroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registrarPrecio = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiFetch('/clientes/precios', {
        method: 'POST',
        body: JSON.stringify({
          cliente_id: Number(form.cliente_id),
          tipo_producto_id: Number(form.tipo_producto_id),
          medida_id: Number(form.medida_id),
          color_id: Number(form.color_id),
          material_id: Number(form.material_id),
          fecha_precio: form.fecha_precio || undefined,
          precio_unitario: Number(form.precio_unitario),
          moneda_codigo: form.moneda_codigo,
          observacion: form.observacion
        })
      });

      setFeedback({
        tipo: 'success',
        mensaje: 'Precio registrado correctamente'
      });

      setForm({
        cliente_id: form.cliente_id,
        tipo_producto_id: '',
        medida_id: '',
        color_id: '',
        material_id: '',
        fecha_precio: '',
        precio_unitario: '',
        moneda_codigo: 'PEN',
        observacion: ''
      });

      setPage(1);
      await cargarPrecios(1);

    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const aplicarFiltros = async (e: React.FormEvent) => {
    e.preventDefault();

    setPage(1);

    try {
      await cargarPrecios(1, filtros);
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const limpiarFiltros = async () => {
    const filtrosLimpios = {
      cliente_id: '',
      q: ''
    };

    setFiltros(filtrosLimpios);
    setPage(1);

    try {
      await cargarPrecios(1, filtrosLimpios);
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

      <Link to="/gestion/clientes" className="btn-volver">
        ← Volver a clientes
      </Link>

      <div className="pedidos-header">
        <div>
          <h1>Historial de precios por cliente</h1>
          <p>Consulta y registra precios por tipo, medida, color y material.</p>
        </div>
      </div>

      <form className="form-card pedido-form" onSubmit={registrarPrecio}>
        <h3>Registrar precio</h3>

        <label>Cliente</label>
        <select
          name="cliente_id"
          value={form.cliente_id}
          onChange={handleFormChange}
        >
          <option value="">Seleccione cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.cliente_id} value={cliente.cliente_id}>
              {cliente.razon_social} - {cliente.ruc}
            </option>
          ))}
        </select>

        <div className="detalle-grid">
          <select
            name="tipo_producto_id"
            value={form.tipo_producto_id}
            onChange={handleFormChange}
          >
            <option value="">Tipo</option>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>

          <select
            name="medida_id"
            value={form.medida_id}
            onChange={handleFormChange}
          >
            <option value="">Medida</option>
            {medidas.map((medida) => (
              <option key={medida.id} value={medida.id}>
                {medida.nombre}
              </option>
            ))}
          </select>

          <select
            name="color_id"
            value={form.color_id}
            onChange={handleFormChange}
          >
            <option value="">Color</option>
            {colores.map((color) => (
              <option key={color.id} value={color.id}>
                {color.nombre}
              </option>
            ))}
          </select>

          <select
            name="material_id"
            value={form.material_id}
            onChange={handleFormChange}
          >
            <option value="">Material</option>
            {materiales.map((material) => (
              <option key={material.id} value={material.id}>
                {material.nombre}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="fecha_precio"
            value={form.fecha_precio}
            onChange={handleFormChange}
          />

          <input
            type="number"
            name="precio_unitario"
            value={form.precio_unitario}
            onChange={handleFormChange}
            placeholder="Precio"
          />

          <select
            name="moneda_codigo"
            value={form.moneda_codigo}
            onChange={handleFormChange}
          >
            <option value="PEN">Soles</option>
            <option value="USD">Dólares</option>
          </select>
        </div>

        <label>Observación</label>
        <textarea
          name="observacion"
          value={form.observacion}
          onChange={handleFormChange}
          rows={3}
          placeholder="Ejemplo: Precio acordado por volumen"
        />

        <button type="submit">
          Guardar precio
        </button>
      </form>

      <form className="filtros-card" onSubmit={aplicarFiltros}>
        <div>
          <label>Cliente</label>
          <select
            name="cliente_id"
            value={filtros.cliente_id}
            onChange={handleFiltroChange}
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
          <label>Buscar producto</label>
          <input
            name="q"
            value={filtros.q}
            onChange={handleFiltroChange}
            placeholder="Tipo, medida, color o material"
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
        <h3>Historial de precios</h3>

        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Fecha precio</th>
              <th>Precio</th>
              <th>Moneda</th>
              <th>Registrado por</th>
              <th>Observación</th>
            </tr>
          </thead>

          <tbody>
            {precios.map((precio) => (
              <tr key={precio.precio_cliente_id}>
                <td>
                  <strong>{precio.razon_social}</strong>
                  <br />
                  <span className="muted">{precio.ruc}</span>
                </td>

                <td>
                  {precio.tipo_producto} {precio.medida} {precio.color} {precio.material}
                </td>

                <td>{precio.fecha_precio?.slice(0, 10)}</td>
                <td>{Number(precio.precio_unitario).toFixed(4)}</td>
                <td>{precio.moneda_codigo}</td>
                <td>{precio.registrado_por}</td>
                <td>{precio.observacion || '-'}</td>
              </tr>
            ))}

            {precios.length === 0 && (
              <tr>
                <td colSpan={7}>No hay precios registrados.</td>
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

export default HistorialPreciosCliente;