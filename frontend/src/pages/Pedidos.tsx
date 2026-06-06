import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

type DetallePedidoForm = {
  tipo_producto_id: string;
  medida_id: string;
  color_id: string;
  material_id: string;
  cantidad_pedida: string;
  unidad_medida_id: string;
  cantidad_presentacion: string;
  unidad_presentacion_id: string;
  precio_unitario: string;
  moneda_codigo: string;
  descripcion_item: string;
};

const detalleVacio: DetallePedidoForm = {
  tipo_producto_id: '',
  medida_id: '',
  color_id: '',
  material_id: '',
  cantidad_pedida: '',
  unidad_medida_id: '',
  cantidad_presentacion: '',
  unidad_presentacion_id: '',
  precio_unitario: '',
  moneda_codigo: 'PEN',
  descripcion_item: ''
};

function Pedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);

  const [tipos, setTipos] = useState<any[]>([]);
  const [medidas, setMedidas] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [unidades, setUnidades] = useState<any[]>([]);

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState({
    cliente_id: '',
    fecha_pedido: '',
    fecha_entrega_estimada: '',
    descripcion_pedido: ''
  });

  const [detalles, setDetalles] = useState<DetallePedidoForm[]>([
    { ...detalleVacio }
  ]);

  const cargarDatos = async () => {
    const [
      clientesData,
      tiposData,
      medidasData,
      coloresData,
      materialesData,
      unidadesData,
      pedidosData
    ] = await Promise.all([
      apiFetch('/clientes'),
      apiFetch('/catalogos/tiposProducto'),
      apiFetch('/catalogos/medidas'),
      apiFetch('/catalogos/colores'),
      apiFetch('/catalogos/materiales'),
      apiFetch('/catalogos/unidades-medida'),
      apiFetch('/pedidos')
    ]);

    setClientes(clientesData.clientes);
    setTipos(tiposData.items);
    setMedidas(medidasData.items);
    setColores(coloresData.items);
    setMateriales(materialesData.items);
    setUnidades(unidadesData.unidades);
    setPedidos(pedidosData.pedidos);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarDatos();
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, []);

  const handlePedidoChange = (
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
      setError('El pedido debe tener al menos un producto');
      return;
    }

    const nuevosDetalles = detalles.filter((_, i) => i !== index);
    setDetalles(nuevosDetalles);
  };

  const registrarPedido = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    try {
      const body = {
        cliente_id: Number(form.cliente_id),
        fecha_pedido: form.fecha_pedido || undefined,
        fecha_entrega_estimada: form.fecha_entrega_estimada || null,
        descripcion_pedido: form.descripcion_pedido,
        detalles: detalles.map((item) => ({
          tipo_producto_id: Number(item.tipo_producto_id),
          medida_id: Number(item.medida_id),
          color_id: Number(item.color_id),
          material_id: Number(item.material_id),

          cantidad_pedida: Number(item.cantidad_pedida),
          unidad_medida_id: Number(item.unidad_medida_id),

          cantidad_presentacion: item.cantidad_presentacion
            ? Number(item.cantidad_presentacion)
            : null,

          unidad_presentacion_id: item.unidad_presentacion_id
            ? Number(item.unidad_presentacion_id)
            : null,

          precio_unitario: Number(item.precio_unitario),
          moneda_codigo: item.moneda_codigo,
          descripcion_item: item.descripcion_item
        }))
      };

      await apiFetch('/pedidos', {
        method: 'POST',
        body: JSON.stringify(body)
      });

      setMensaje('Pedido registrado correctamente');

      setForm({
        cliente_id: '',
        fecha_pedido: '',
        fecha_entrega_estimada: '',
        descripcion_pedido: ''
      });

      setDetalles([{ ...detalleVacio }]);

      const pedidosData = await apiFetch('/pedidos');
      setPedidos(pedidosData.pedidos);

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Pedidos</h1>
      <p>Registra pedidos con uno o varios productos.</p>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card pedido-form" onSubmit={registrarPedido}>
        <h3>Registrar pedido</h3>

        <label>Cliente</label>
        <select
          name="cliente_id"
          value={form.cliente_id}
          onChange={handlePedidoChange}
        >
          <option value="">Seleccione cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.cliente_id} value={cliente.cliente_id}>
              {cliente.razon_social} - {cliente.ruc}
            </option>
          ))}
        </select>

        <label>Fecha de pedido</label>
        <input
          type="date"
          name="fecha_pedido"
          value={form.fecha_pedido}
          onChange={handlePedidoChange}
        />

        <label>Fecha de entrega estimada</label>
        <input
          type="date"
          name="fecha_entrega_estimada"
          value={form.fecha_entrega_estimada}
          onChange={handlePedidoChange}
        />

        <label>Descripción del pedido</label>
        <textarea
          name="descripcion_pedido"
          value={form.descripcion_pedido}
          onChange={handlePedidoChange}
          placeholder="Ejemplo: Pedido de drizas para almacén principal"
          rows={3}
        />

        <h3>Productos del pedido</h3>

        {detalles.map((detalle, index) => (
          <div className="detalle-card" key={index}>
            <div className="detalle-header">
              <strong>Producto {index + 1}</strong>

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
                name="tipo_producto_id"
                value={detalle.tipo_producto_id}
                onChange={(e) => handleDetalleChange(index, e)}
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
                value={detalle.medida_id}
                onChange={(e) => handleDetalleChange(index, e)}
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
                value={detalle.color_id}
                onChange={(e) => handleDetalleChange(index, e)}
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
                value={detalle.material_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Material</option>
                {materiales.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.nombre}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="cantidad_pedida"
                value={detalle.cantidad_pedida}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Cantidad total"
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
                name="cantidad_presentacion"
                value={detalle.cantidad_presentacion}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Presentación"
              />

              <select
                name="unidad_presentacion_id"
                value={detalle.unidad_presentacion_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Unidad presentación</option>
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
                placeholder="Precio ofrecido"
              />

              <select
                name="moneda_codigo"
                value={detalle.moneda_codigo}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="PEN">Soles</option>
                <option value="USD">Dólares</option>
              </select>
            </div>

            <input
              name="descripcion_item"
              value={detalle.descripcion_item}
              onChange={(e) => handleDetalleChange(index, e)}
              placeholder="Descripción del producto, ejemplo: DRIZA POLIESTER 1/4 BLANCO"
            />
          </div>
        ))}

        <button type="button" onClick={agregarDetalle}>
          + Agregar otro producto
        </button>

        <br />
        <br />

        <button type="submit">
          Guardar pedido
        </button>
      </form>

      <div className="tabla-card">
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
              <th>Registrado por</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.pedido_id}>
                <td>{pedido.pedido_id}</td>
                <td>{pedido.razon_social}</td>
                <td>{pedido.fecha_pedido?.slice(0, 10)}</td>
                <td>{pedido.fecha_entrega_estimada?.slice(0, 10)}</td>
                <td>{pedido.estado_pedido}</td>
                <td>{pedido.cantidad_items}</td>
                <td>{pedido.registrado_por}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pedidos;