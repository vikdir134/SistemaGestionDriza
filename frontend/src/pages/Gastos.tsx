import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

function Gastos() {
  const [gastos, setGastos] = useState<any[]>([]);
  const [tiposGasto, setTiposGasto] = useState<any[]>([]);
  const [proveedores, setProveedores] = useState<any[]>([]);

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [filtros, setFiltros] = useState({
    tipo_gasto_id: '',
    proveedor_id: '',
    moneda_codigo: '',
    q: ''
  });

  const [form, setForm] = useState({
    tipo_gasto_id: '',
    proveedor_id: '',
    fecha_gasto: '',
    monto: '',
    moneda_codigo: 'PEN',
    descripcion: '',
    comprobante: ''
  });

  const [nuevoTipo, setNuevoTipo] = useState('');

  const cargarDatosBase = async () => {
    const [tiposData, proveedoresData] = await Promise.all([
      apiFetch('/gastos/tipos'),
      apiFetch('/proveedores')
    ]);

    setTiposGasto(tiposData.tipos);
    setProveedores(proveedoresData.proveedores);
  };

  const cargarGastos = async (
    paginaActual = page,
    filtrosActuales = filtros
  ) => {
    const params = new URLSearchParams();

    params.append('page', String(paginaActual));
    params.append('limit', '10');

    if (filtrosActuales.tipo_gasto_id) {
      params.append('tipo_gasto_id', filtrosActuales.tipo_gasto_id);
    }

    if (filtrosActuales.proveedor_id) {
      params.append('proveedor_id', filtrosActuales.proveedor_id);
    }

    if (filtrosActuales.moneda_codigo) {
      params.append('moneda_codigo', filtrosActuales.moneda_codigo);
    }

    if (filtrosActuales.q.trim()) {
      params.append('q', filtrosActuales.q.trim());
    }

    const data = await apiFetch(`/gastos?${params.toString()}`);

    setGastos(data.gastos);
    setPaginacion(data.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarDatosBase();
        await cargarGastos(1);
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        await cargarGastos(page);
      } catch (error: any) {
        setError(error.message);
      }
    };

    cargar();
  }, [page]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFiltroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
  };

  const registrarTipoGasto = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    try {
      await apiFetch('/gastos/tipos', {
        method: 'POST',
        body: JSON.stringify({
          nombre: nuevoTipo
        })
      });

      setMensaje('Tipo de gasto registrado correctamente');
      setNuevoTipo('');

      await cargarDatosBase();

    } catch (error: any) {
      setError(error.message);
    }
  };

  const registrarGasto = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    try {
      await apiFetch('/gastos', {
        method: 'POST',
        body: JSON.stringify({
          tipo_gasto_id: Number(form.tipo_gasto_id),
          proveedor_id: form.proveedor_id ? Number(form.proveedor_id) : null,
          fecha_gasto: form.fecha_gasto || undefined,
          monto: Number(form.monto),
          moneda_codigo: form.moneda_codigo,
          descripcion: form.descripcion,
          comprobante: form.comprobante
        })
      });

      setMensaje('Gasto registrado correctamente');

      setForm({
        tipo_gasto_id: '',
        proveedor_id: '',
        fecha_gasto: '',
        monto: '',
        moneda_codigo: 'PEN',
        descripcion: '',
        comprobante: ''
      });

      setPage(1);
      await cargarGastos(1);

    } catch (error: any) {
      setError(error.message);
    }
  };

  const aplicarFiltros = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');
    setPage(1);

    try {
      await cargarGastos(1, filtros);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const limpiarFiltros = async () => {
    const filtrosLimpios = {
      tipo_gasto_id: '',
      proveedor_id: '',
      moneda_codigo: '',
      q: ''
    };

    setFiltros(filtrosLimpios);
    setPage(1);

    try {
      await cargarGastos(1, filtrosLimpios);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Gastos</h1>
      <p>Registra y consulta los gastos de la empresa.</p>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card" onSubmit={registrarTipoGasto}>
        <h3>Registrar tipo de gasto</h3>

        <label>Nuevo tipo de gasto</label>
        <input
          value={nuevoTipo}
          onChange={(e) => setNuevoTipo(e.target.value)}
          placeholder="Ejemplo: COMBUSTIBLE"
        />

        <button type="submit">
          Guardar tipo
        </button>
      </form>

      <form className="form-card pedido-form" onSubmit={registrarGasto}>
        <h3>Registrar gasto</h3>

        <label>Tipo de gasto</label>
        <select
          name="tipo_gasto_id"
          value={form.tipo_gasto_id}
          onChange={handleFormChange}
        >
          <option value="">Seleccione tipo</option>
          {tiposGasto.map((tipo) => (
            <option key={tipo.tipo_gasto_id} value={tipo.tipo_gasto_id}>
              {tipo.nombre}
            </option>
          ))}
        </select>

        <label>Proveedor opcional</label>
        <select
          name="proveedor_id"
          value={form.proveedor_id}
          onChange={handleFormChange}
        >
          <option value="">Sin proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.proveedor_id} value={proveedor.proveedor_id}>
              {proveedor.razon_social} - {proveedor.ruc}
            </option>
          ))}
        </select>

        <label>Fecha de gasto</label>
        <input
          type="date"
          name="fecha_gasto"
          value={form.fecha_gasto}
          onChange={handleFormChange}
        />

        <label>Moneda</label>
        <select
          name="moneda_codigo"
          value={form.moneda_codigo}
          onChange={handleFormChange}
        >
          <option value="PEN">Soles</option>
          <option value="USD">Dólares</option>
        </select>

        <label>Monto</label>
        <input
          type="number"
          name="monto"
          value={form.monto}
          onChange={handleFormChange}
          placeholder="Monto del gasto"
        />

        <label>Comprobante</label>
        <input
          name="comprobante"
          value={form.comprobante}
          onChange={handleFormChange}
          placeholder="Ejemplo: REC-001, F001-000123"
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleFormChange}
          placeholder="Ejemplo: Pago de luz del local"
          rows={3}
        />

        <button type="submit">
          Guardar gasto
        </button>
      </form>

      <form className="filtros-card" onSubmit={aplicarFiltros}>
        <div>
          <label>Tipo de gasto</label>
          <select
            name="tipo_gasto_id"
            value={filtros.tipo_gasto_id}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            {tiposGasto.map((tipo) => (
              <option key={tipo.tipo_gasto_id} value={tipo.tipo_gasto_id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Proveedor</label>
          <select
            name="proveedor_id"
            value={filtros.proveedor_id}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.proveedor_id} value={proveedor.proveedor_id}>
                {proveedor.razon_social} - {proveedor.ruc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Moneda</label>
          <select
            name="moneda_codigo"
            value={filtros.moneda_codigo}
            onChange={handleFiltroChange}
          >
            <option value="">Todas</option>
            <option value="PEN">Soles</option>
            <option value="USD">Dólares</option>
          </select>
        </div>

        <div>
          <label>Buscar</label>
          <input
            name="q"
            value={filtros.q}
            onChange={handleFiltroChange}
            placeholder="Descripción, comprobante o proveedor"
          />
        </div>

        <div className="filtros-actions">
          <button type="submit">Buscar</button>
          <button type="button" className="btn-secondary" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </form>

      <div className="tabla-card">
        <h3>Listado de gastos</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Proveedor</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Moneda</th>
              <th>Comprobante</th>
              <th>Registrado por</th>
            </tr>
          </thead>

          <tbody>
            {gastos.map((gasto) => (
              <tr key={gasto.gasto_id}>
                <td>#{gasto.gasto_id}</td>
                <td>{gasto.tipo_gasto}</td>
                <td>{gasto.proveedor || '-'}</td>
                <td>{gasto.fecha_gasto?.slice(0, 10)}</td>
                <td>{Number(gasto.monto).toFixed(2)}</td>
                <td>{gasto.moneda_codigo}</td>
                <td>{gasto.comprobante || '-'}</td>
                <td>{gasto.registrado_por}</td>
              </tr>
            ))}

            {gastos.length === 0 && (
              <tr>
                <td colSpan={8}>No hay gastos registrados.</td>
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

export default Gastos;