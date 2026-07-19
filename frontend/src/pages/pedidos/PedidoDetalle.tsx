import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';

function PedidoDetalle() {
  const { pedido_id } = useParams();

  const [pedido, setPedido] = useState<any | null>(null);

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info',
    mensaje: ''
  });

  const cargarPedido = async () => {
    const data = await apiFetch(`/pedidos/${pedido_id}`);
    setPedido(data.pedido);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarPedido();
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    iniciar();
  }, [pedido_id]);

  const claseEstadoPedido = (estado: string) => {
    if (estado === 'ENTREGADO') return 'estado-pill estado-entregado';
    if (estado === 'PARCIAL') return 'estado-pill estado-parcial';
    if (estado === 'CANCELADO') return 'estado-pill estado-cancelado';
    return 'estado-pill estado-registrado';
  };

  const claseEstadoEntrega = (estado: string) => {
    if (estado === 'COMPLETO') return 'estado estado-completo';
    if (estado === 'PARCIAL') return 'estado estado-parcial';
    return 'estado estado-pendiente';
  };

  const totalesPorMoneda = () => {
    if (!pedido) return [];

    const mapa = new Map<string, number>();

    pedido.detalles.forEach((detalle: any) => {
      const moneda = detalle.moneda_codigo;
      const subtotal = Number(detalle.subtotal || 0);

      mapa.set(moneda, (mapa.get(moneda) || 0) + subtotal);
    });

    return Array.from(mapa.entries()).map(([moneda, total]) => ({
      moneda,
      total
    }));
  };

  if (!pedido) {
    return (
      <div>
        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() => setFeedback({ ...feedback, mensaje: '' })}
        />

        <Link to="/gestion/pedidos" className="btn-volver">
          ← Volver a pedidos
        </Link>

        <p>Cargando pedido...</p>
      </div>
    );
  }

  return (
    <div className="pedidos-page">
      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() => setFeedback({ ...feedback, mensaje: '' })}
      />

      <Link to="/gestion/pedidos" className="btn-volver">
        ← Volver a pedidos
      </Link>

      <div className="pedido-detalle-header">
        <div>
          <h1>Pedido #{pedido.pedido_id}</h1>
          <p>{pedido.razon_social} - {pedido.ruc}</p>
        </div>

        <span className={claseEstadoPedido(pedido.estado_pedido)}>
          {pedido.estado_pedido}
        </span>
      </div>

      <div className="pedidos-actions">
        <Link
          className="btn-link"
          to={`/gestion/pedidos/${pedido.pedido_id}/editar`}
        >
          Editar pedido
        </Link>
      </div>

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
          <span>Registrado por</span>
          <strong>{pedido.registrado_por}</strong>
        </div>
      </div>

      <div className="descripcion-card">
        <strong>Descripción del pedido:</strong>
        <p>{pedido.descripcion_pedido || 'Sin descripción'}</p>
      </div>

      <div className="tabla-card">
        <h3>Totales por moneda</h3>

        <table>
          <thead>
            <tr>
              <th>Moneda</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {totalesPorMoneda().map((item) => (
              <tr key={item.moneda}>
                <td>{item.moneda}</td>
                <td>{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tabla-card">
        <h3>Productos del pedido</h3>

        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Entregado</th>
              <th>Pendiente</th>
              <th>Presentación</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th>Estado entrega</th>
            </tr>
          </thead>

          <tbody>
            {pedido.detalles.map((detalle: any) => (
              <tr key={detalle.pedido_detalle_id}>
                <td>
                  <strong>
                    {detalle.tipo_producto} {detalle.material} {detalle.medida} {detalle.color}
                  </strong>
                  <br />
                  <span className="muted">{detalle.descripcion_item || '-'}</span>
                </td>

                <td>{detalle.cantidad_pedida} {detalle.unidad}</td>
                <td>{detalle.cantidad_entregada} {detalle.unidad}</td>
                <td>{detalle.cantidad_pendiente} {detalle.unidad}</td>

                <td>
                  {detalle.cantidad_presentacion || '-'} {detalle.unidad_presentacion || ''}
                </td>

                <td>
                  {Number(detalle.precio_unitario).toFixed(2)} {detalle.moneda_codigo}
                </td>

                <td>
                  {Number(detalle.subtotal).toFixed(2)} {detalle.moneda_codigo}
                </td>

                <td>
                  <span className={claseEstadoEntrega(detalle.estado_entrega)}>
                    {detalle.estado_entrega}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tabla-card">
        <h3>Historial de cambios</h3>

        {pedido.historial_cambios.length === 0 ? (
          <p>No hay cambios registrados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Motivo</th>
                <th>Registrado por</th>
                <th>Fecha</th>
              </tr>
            </thead>

            <tbody>
              {pedido.historial_cambios.map((cambio: any) => (
                <tr key={cambio.pedido_cambio_id}>
                  <td>{cambio.tipo_cambio}</td>
                  <td>{cambio.descripcion_motivo}</td>
                  <td>{cambio.registrado_por}</td>
                  <td>{cambio.created_at?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PedidoDetalle;