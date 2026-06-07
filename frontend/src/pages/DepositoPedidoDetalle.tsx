import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../services/api';

function DepositoPedidoDetalle() {
  const { pedido_id } = useParams();

  const [pedido, setPedido] = useState<any | null>(null);
  const [tiposDeposito, setTiposDeposito] = useState<any[]>([]);

  const [form, setForm] = useState({
    tipo_deposito_id: '',
    fecha_deposito: '',
    monto: '',
    moneda_codigo: 'PEN',
    numero_operacion: '',
    observacion: ''
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargarPedido = async () => {
    const data = await apiFetch(`/depositos/pedidos/${pedido_id}`);
    setPedido(data.pedido);
  };

  const cargarTiposDeposito = async () => {
    const data = await apiFetch('/depositos/tipos');
    setTiposDeposito(data.tipos);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarTiposDeposito();
        await cargarPedido();
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, [pedido_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const claseEstado = (estado: string) => {
    if (estado === 'PAGADO') return 'estado estado-completo';
    if (estado === 'PARCIAL') return 'estado estado-parcial';
    return 'estado estado-pendiente';
  };

  const textoEstado = (estado: string) => {
    if (estado === 'PAGADO') return 'Pagado';
    if (estado === 'PARCIAL') return 'Parcial';
    return 'Sin pago';
  };

  const registrarDeposito = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    if (!pedido) {
      setError('No se encontró el pedido');
      return;
    }

    try {
      await apiFetch('/depositos', {
        method: 'POST',
        body: JSON.stringify({
          pedido_id: pedido.pedido_id,
          tipo_deposito_id: Number(form.tipo_deposito_id),
          fecha_deposito: form.fecha_deposito || undefined,
          monto: Number(form.monto),
          moneda_codigo: form.moneda_codigo,
          numero_operacion: form.numero_operacion,
          observacion: form.observacion
        })
      });

      setMensaje('Depósito registrado correctamente');

      setForm({
        tipo_deposito_id: '',
        fecha_deposito: '',
        monto: '',
        moneda_codigo: 'PEN',
        numero_operacion: '',
        observacion: ''
      });

      await cargarPedido();

    } catch (error: any) {
      setError(error.message);
    }
  };

  if (!pedido) {
    return (
      <div>
        <Link to="/gestion/depositos" className="btn-volver">
          ← Volver a Depósitos
        </Link>

        {error ? <div className="error">{error}</div> : <p>Cargando pedido...</p>}
      </div>
    );
  }

  return (
    <div>
      <Link to="/gestion/depositos" className="btn-volver">
        ← Volver a Depósitos
      </Link>

      <div className="pedido-detalle-header">
        <div>
          <h1>Pedido #{pedido.pedido_id}</h1>
          <p>{pedido.razon_social} - {pedido.ruc}</p>
        </div>

        <span className={claseEstado(pedido.estado_pago_general)}>
          {textoEstado(pedido.estado_pago_general)}
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
          <span>Estado pago</span>
          <strong>{textoEstado(pedido.estado_pago_general)}</strong>
        </div>
      </div>

      <div className="descripcion-card">
        <strong>Descripción del pedido:</strong>
        <p>{pedido.descripcion_pedido || 'Sin descripción'}</p>
      </div>

      <div className="tabla-card">
        <h3>Resumen de pago por moneda</h3>

        <table>
          <thead>
            <tr>
              <th>Moneda</th>
              <th>Total pedido</th>
              <th>Total depositado</th>
              <th>Saldo pendiente</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {pedido.totales.map((total: any) => (
              <tr key={total.moneda_codigo}>
                <td>{total.moneda_codigo}</td>
                <td>{Number(total.total_pedido).toFixed(2)}</td>
                <td>{Number(total.total_depositado).toFixed(2)}</td>
                <td>{Number(total.saldo_pendiente).toFixed(2)}</td>
                <td>
                  <span className={claseEstado(total.estado_pago)}>
                    {textoEstado(total.estado_pago)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form className="form-card pedido-form" onSubmit={registrarDeposito}>
        <h3>Registrar depósito</h3>

        <label>Tipo de depósito</label>
        <select
          name="tipo_deposito_id"
          value={form.tipo_deposito_id}
          onChange={handleChange}
        >
          <option value="">Seleccione tipo</option>
          {tiposDeposito.map((tipo) => (
            <option key={tipo.tipo_deposito_id} value={tipo.tipo_deposito_id}>
              {tipo.nombre}
            </option>
          ))}
        </select>

        <label>Fecha de depósito</label>
        <input
          type="date"
          name="fecha_deposito"
          value={form.fecha_deposito}
          onChange={handleChange}
        />

        <label>Moneda</label>
        <select
          name="moneda_codigo"
          value={form.moneda_codigo}
          onChange={handleChange}
        >
          <option value="PEN">Soles</option>
          <option value="USD">Dólares</option>
        </select>

        <label>Monto</label>
        <input
          type="number"
          name="monto"
          value={form.monto}
          onChange={handleChange}
          placeholder="Monto depositado"
        />

        <label>Número de operación</label>
        <input
          name="numero_operacion"
          value={form.numero_operacion}
          onChange={handleChange}
          placeholder="Ejemplo: OP-001"
        />

        <label>Observación</label>
        <textarea
          name="observacion"
          value={form.observacion}
          onChange={handleChange}
          placeholder="Ejemplo: Adelanto del pedido"
          rows={3}
        />

        <button type="submit">
          Guardar depósito
        </button>
      </form>

      <div className="tabla-card">
        <h3>Historial de depósitos</h3>

        {pedido.historial_depositos.length === 0 ? (
          <p>No hay depósitos registrados para este pedido.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Moneda</th>
                <th>Operación</th>
                <th>Registrado por</th>
                <th>Observación</th>
              </tr>
            </thead>

            <tbody>
              {pedido.historial_depositos.map((deposito: any) => (
                <tr key={deposito.deposito_id}>
                  <td>#{deposito.deposito_id}</td>
                  <td>{deposito.tipo_deposito}</td>
                  <td>{deposito.fecha_deposito?.slice(0, 10)}</td>
                  <td>{Number(deposito.monto).toFixed(2)}</td>
                  <td>{deposito.moneda_codigo}</td>
                  <td>{deposito.numero_operacion || '-'}</td>
                  <td>{deposito.registrado_por}</td>
                  <td>{deposito.observacion || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DepositoPedidoDetalle;