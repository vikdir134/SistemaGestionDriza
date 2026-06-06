import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../services/api';

function EntregaPedidoDetalle() {
  const { pedido_id } = useParams();

  const [pedido, setPedido] = useState<any | null>(null);
  const [detallesEntrega, setDetallesEntrega] = useState<any[]>([]);
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [comentarioEntrega, setComentarioEntrega] = useState('');

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargarPedido = async () => {
    const data = await apiFetch(`/entregas/pedidos/${pedido_id}`);

    setPedido(data.pedido);

    const detalles = data.pedido.detalles.map((item: any) => ({
      ...item,
      cantidad_entregada_input: '',
      observacion_entrega: ''
    }));

    setDetallesEntrega(detalles);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarPedido();
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, [pedido_id]);

  const claseEstado = (estado: string) => {
    if (estado === 'COMPLETO') return 'estado estado-completo';
    if (estado === 'PARCIAL') return 'estado estado-parcial';
    return 'estado estado-pendiente';
  };

  const textoEstado = (estado: string) => {
    if (estado === 'COMPLETO') return 'Completo';
    if (estado === 'PARCIAL') return 'Parcial';
    return 'Pendiente';
  };

  const handleDetalleChange = (
    index: number,
    campo: string,
    valor: string
  ) => {
    const nuevosDetalles = [...detallesEntrega];

    nuevosDetalles[index] = {
      ...nuevosDetalles[index],
      [campo]: valor
    };

    setDetallesEntrega(nuevosDetalles);
  };

  const registrarEntrega = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    if (!pedido) {
      setError('No se encontró el pedido');
      return;
    }

    const detalles = detallesEntrega
      .filter((item) => Number(item.cantidad_entregada_input) > 0)
      .map((item) => ({
        pedido_detalle_id: item.pedido_detalle_id,
        cantidad_entregada: Number(item.cantidad_entregada_input),
        unidad_medida_id: item.unidad_medida_id,
        observacion: item.observacion_entrega
      }));

    if (detalles.length === 0) {
      setError('Ingrese al menos una cantidad entregada');
      return;
    }

    try {
      await apiFetch('/entregas', {
        method: 'POST',
        body: JSON.stringify({
          pedido_id: pedido.pedido_id,
          fecha_entrega: fechaEntrega || undefined,
          comentario_entrega: comentarioEntrega,
          detalles
        })
      });

      setMensaje('Entrega registrada correctamente');
      setFechaEntrega('');
      setComentarioEntrega('');

      await cargarPedido();

    } catch (error: any) {
      setError(error.message);
    }
  };

  if (!pedido) {
    return (
      <div>
        <Link to="/gestion/entregas" className="btn-volver">
          ← Volver a Entregas
        </Link>

        {error ? <div className="error">{error}</div> : <p>Cargando pedido...</p>}
      </div>
    );
  }

  return (
    <div>
      <Link to="/gestion/entregas" className="btn-volver">
        ← Volver a Entregas
      </Link>

      <div className="pedido-detalle-header">
        <div>
          <h1>Pedido #{pedido.pedido_id}</h1>
          <p>{pedido.razon_social} - {pedido.ruc}</p>
        </div>

        <span className={claseEstado(pedido.estado_entrega_general)}>
          {textoEstado(pedido.estado_entrega_general)}
        </span>
      </div>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <div className="pedido-resumen-grid">
        <div className="resumen-card">
          <span>Cliente</span>
          <strong>{pedido.razon_social}</strong>
        </div>

        <div className="resumen-card">
          <span>Fecha pedido</span>
          <strong>{pedido.fecha_pedido?.slice(0, 10)}</strong>
        </div>

        <div className="resumen-card">
          <span>Entrega estimada</span>
          <strong>{pedido.fecha_entrega_estimada?.slice(0, 10) || '-'}</strong>
        </div>

        <div className="resumen-card">
          <span>Estado</span>
          <strong>{textoEstado(pedido.estado_entrega_general)}</strong>
        </div>
      </div>

      <div className="descripcion-card">
        <strong>Descripción del pedido:</strong>
        <p>{pedido.descripcion_pedido || 'Sin descripción'}</p>
      </div>

      <form className="form-card pedido-form" onSubmit={registrarEntrega}>
        <h3>Registrar nueva entrega</h3>

        <label>Fecha de entrega</label>
        <input
          type="date"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />

        <label>Comentario de entrega</label>
        <textarea
          value={comentarioEntrega}
          onChange={(e) => setComentarioEntrega(e.target.value)}
          placeholder="Ejemplo: Primera entrega parcial del pedido"
          rows={3}
        />

        <h3>Productos del pedido</h3>

        {detallesEntrega.map((detalle, index) => {
          const estaCompleto = detalle.estado_item === 'COMPLETO';

          return (
            <div
              className={`detalle-card detalle-${detalle.estado_item.toLowerCase()}`}
              key={detalle.pedido_detalle_id}
            >
              <div className="detalle-header">
                <div>
                  <strong>
                    {detalle.tipo_producto} {detalle.material} {detalle.medida} {detalle.color}
                  </strong>
                  <br />
                  <span className="muted">
                    {detalle.descripcion_item || 'Sin descripción específica'}
                  </span>
                </div>

                <span className={claseEstado(detalle.estado_item)}>
                  {textoEstado(detalle.estado_item)}
                </span>
              </div>

              <div className="detalle-resumen">
                <p><strong>Pedido:</strong> {detalle.cantidad_pedida} {detalle.unidad}</p>
                <p><strong>Entregado:</strong> {detalle.cantidad_entregada} {detalle.unidad}</p>
                <p><strong>Pendiente:</strong> {detalle.cantidad_pendiente} {detalle.unidad}</p>
                <p>
                  <strong>Presentación:</strong>{' '}
                  {detalle.cantidad_presentacion || '-'} {detalle.unidad_presentacion || ''}
                </p>
              </div>

              {!estaCompleto ? (
                <div className="detalle-grid">
                  <input
                    type="number"
                    min="0"
                    max={detalle.cantidad_pendiente}
                    placeholder={`Cantidad a entregar (${detalle.unidad})`}
                    value={detalle.cantidad_entregada_input}
                    onChange={(e) =>
                      handleDetalleChange(index, 'cantidad_entregada_input', e.target.value)
                    }
                  />

                  <input
                    placeholder="Observación"
                    value={detalle.observacion_entrega}
                    onChange={(e) =>
                      handleDetalleChange(index, 'observacion_entrega', e.target.value)
                    }
                  />
                </div>
              ) : (
                <div className="producto-completo">
                  Este producto ya fue entregado completamente.
                </div>
              )}
            </div>
          );
        })}

        <button type="submit">
          Guardar entrega
        </button>
      </form>

      <div className="tabla-card">
        <h3>Historial de entregas</h3>

        {pedido.historial_entregas.length === 0 ? (
          <p>No hay entregas registradas para este pedido.</p>
        ) : (
          pedido.historial_entregas.map((entrega: any) => (
            <div className="historial-card" key={entrega.entrega_id}>
              <div className="historial-header">
                <strong>Entrega #{entrega.entrega_id}</strong>
                <span>{entrega.fecha_entrega?.slice(0, 10)}</span>
              </div>

              <p>
                <strong>Registrado por:</strong> {entrega.registrado_por}
              </p>

              <p>
                <strong>Comentario:</strong> {entrega.comentario_entrega || '-'}
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Observación</th>
                  </tr>
                </thead>

                <tbody>
                  {entrega.detalles.map((detalle: any) => (
                    <tr key={detalle.entrega_detalle_id}>
                      <td>{detalle.producto}</td>
                      <td>{detalle.cantidad_entregada} {detalle.unidad}</td>
                      <td>{detalle.observacion || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EntregaPedidoDetalle;