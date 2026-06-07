import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

type DetalleCompraForm = {
  material_id: string;
  descripcion_item: string;
  cantidad: string;
  unidad_medida_id: string;
  precio_unitario: string;
};

const detalleVacio: DetalleCompraForm = {
  material_id: '',
  descripcion_item: '',
  cantidad: '',
  unidad_medida_id: '',
  precio_unitario: ''
};

function Compras() {
  const [compras, setCompras] = useState<any[]>([]);
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [unidades, setUnidades] = useState<any[]>([]);

  const [proveedorFiltro, setProveedorFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState({
    proveedor_id: '',
    fecha_compra: '',
    numero_documento: '',
    moneda_codigo: 'PEN',
    descripcion: ''
  });

  const [detalles, setDetalles] = useState<DetalleCompraForm[]>([
    { ...detalleVacio }
  ]);

  const cargarCatalogosBase = async () => {
    const [
      proveedoresData,
      materialesData,
      unidadesData
    ] = await Promise.all([
      apiFetch('/proveedores'),
      apiFetch('/catalogos/materiales'),
      apiFetch('/catalogos/unidades-medida')
    ]);

    setProveedores(proveedoresData.proveedores);
    setMateriales(materialesData.items);
    setUnidades(unidadesData.unidades);
  };

  const cargarCompras = async (
    paginaActual = page,
    proveedorActual = proveedorFiltro,
    busquedaActual = busqueda
  ) => {
    const params = new URLSearchParams();

    params.append('page', String(paginaActual));
    params.append('limit', '10');

    if (proveedorActual) {
      params.append('proveedor_id', proveedorActual);
    }

    if (busquedaActual.trim()) {
      params.append('q', busquedaActual.trim());
    }

    const comprasData = await apiFetch(`/compras?${params.toString()}`);

    setCompras(comprasData.compras);
    setPaginacion(comprasData.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarCatalogosBase();
        await cargarCompras(1);
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        await cargarCompras(page);
      } catch (error: any) {
        setError(error.message);
      }
    };

    cargar();
  }, [page, proveedorFiltro]);

  const handleCompraChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleDetalleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const nuevosDetalles = [...detalles];

    nuevosDetalles[index] = {
      ...nuevosDetalles[index],
      [e.target.name]: e.target.value
    };

    setDetalles(nuevosDetalles);
  };

  const agregarDetalle = () => {
    setDetalles([...detalles, { ...detalleVacio }]);
  };

  const quitarDetalle = (index: number) => {
    if (detalles.length === 1) {
      setError('La compra debe tener al menos un item');
      return;
    }

    setDetalles(detalles.filter((_, i) => i !== index));
  };

  const calcularTotal = () => {
    return detalles.reduce((total, item) => {
      return total + Number(item.cantidad || 0) * Number(item.precio_unitario || 0);
    }, 0);
  };

  const aplicarBusqueda = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');
    setPage(1);

    try {
      await cargarCompras(1);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const limpiarFiltros = async () => {
    setError('');
    setMensaje('');

    setProveedorFiltro('');
    setBusqueda('');
    setPage(1);

    try {
      await cargarCompras(1, '', '');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const registrarCompra = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    try {
      await apiFetch('/compras', {
        method: 'POST',
        body: JSON.stringify({
          proveedor_id: Number(form.proveedor_id),
          fecha_compra: form.fecha_compra || undefined,
          numero_documento: form.numero_documento,
          moneda_codigo: form.moneda_codigo,
          descripcion: form.descripcion,
          detalles: detalles.map((item) => ({
            material_id: item.material_id ? Number(item.material_id) : null,
            descripcion_item: item.descripcion_item,
            cantidad: Number(item.cantidad),
            unidad_medida_id: Number(item.unidad_medida_id),
            precio_unitario: Number(item.precio_unitario)
          }))
        })
      });

      setMensaje('Compra registrada correctamente');

      setForm({
        proveedor_id: '',
        fecha_compra: '',
        numero_documento: '',
        moneda_codigo: 'PEN',
        descripcion: ''
      });

      setDetalles([{ ...detalleVacio }]);

      setPage(1);
      await cargarCompras(1);

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Compras</h1>
      <p>Registra compras a proveedores con uno o varios items.</p>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card pedido-form" onSubmit={registrarCompra}>
        <h3>Registrar compra</h3>

        <label>Proveedor</label>
        <select
          name="proveedor_id"
          value={form.proveedor_id}
          onChange={handleCompraChange}
        >
          <option value="">Seleccione proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.proveedor_id} value={proveedor.proveedor_id}>
              {proveedor.razon_social} - {proveedor.ruc}
            </option>
          ))}
        </select>

        <label>Fecha de compra</label>
        <input
          type="date"
          name="fecha_compra"
          value={form.fecha_compra}
          onChange={handleCompraChange}
        />

        <label>Número de documento</label>
        <input
          name="numero_documento"
          value={form.numero_documento}
          onChange={handleCompraChange}
          placeholder="Factura, boleta, guía, etc."
        />

        <label>Moneda</label>
        <select
          name="moneda_codigo"
          value={form.moneda_codigo}
          onChange={handleCompraChange}
        >
          <option value="PEN">Soles</option>
          <option value="USD">Dólares</option>
        </select>

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleCompraChange}
          placeholder="Ejemplo: Compra de materia prima para producción"
          rows={3}
        />

        <h3>Items de compra</h3>

        {detalles.map((detalle, index) => (
          <div className="detalle-card" key={index}>
            <div className="detalle-header">
              <strong>Item {index + 1}</strong>

              <button
                type="button"
                className="btn-danger"
                onClick={() => quitarDetalle(index)}
              >
                Quitar
              </button>
            </div>

            <div className="detalle-grid">
              <select
                name="material_id"
                value={detalle.material_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Material opcional</option>
                {materiales.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.nombre}
                  </option>
                ))}
              </select>

              <input
                name="descripcion_item"
                value={detalle.descripcion_item}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Descripción del item"
              />

              <input
                type="number"
                name="cantidad"
                value={detalle.cantidad}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Cantidad"
              />

              <select
                name="unidad_medida_id"
                value={detalle.unidad_medida_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Unidad</option>
                {unidades.map((unidad) => (
                  <option key={unidad.unidad_medida_id} value={unidad.unidad_medida_id}>
                    {unidad.codigo}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="precio_unitario"
                value={detalle.precio_unitario}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Precio unitario"
              />

              <input
                value={(
                  Number(detalle.cantidad || 0) *
                  Number(detalle.precio_unitario || 0)
                ).toFixed(2)}
                disabled
                placeholder="Subtotal"
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={agregarDetalle}>
          + Agregar item
        </button>

        <div className="total-box">
          Total compra: {calcularTotal().toFixed(2)} {form.moneda_codigo}
        </div>

        <button type="submit">
          Guardar compra
        </button>
      </form>

      <form className="filtros-card" onSubmit={aplicarBusqueda}>
        <div>
          <label>Proveedor</label>
          <select
            value={proveedorFiltro}
            onChange={(e) => {
              setProveedorFiltro(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todos los proveedores</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.proveedor_id} value={proveedor.proveedor_id}>
                {proveedor.razon_social} - {proveedor.ruc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Buscar</label>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Proveedor, RUC, documento o descripción"
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
        <h3>Listado de compras</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Proveedor</th>
              <th>Fecha</th>
              <th>Documento</th>
              <th>Total</th>
              <th>Moneda</th>
              <th>Items</th>
              <th>Registrado por</th>
            </tr>
          </thead>

          <tbody>
            {compras.map((compra) => (
              <tr key={compra.compra_id}>
                <td>#{compra.compra_id}</td>
                <td>{compra.razon_social}</td>
                <td>{compra.fecha_compra?.slice(0, 10)}</td>
                <td>{compra.numero_documento || '-'}</td>
                <td>{Number(compra.monto_total).toFixed(2)}</td>
                <td>{compra.moneda_codigo}</td>
                <td>{compra.cantidad_items}</td>
                <td>{compra.registrado_por}</td>
              </tr>
            ))}

            {compras.length === 0 && (
              <tr>
                <td colSpan={8}>No hay compras registradas.</td>
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

export default Compras;