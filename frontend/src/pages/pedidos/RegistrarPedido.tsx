import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';
import PedidoItemsEditor, {
  detallePedidoVacio,
  type DetallePedidoForm
} from '../../components/pedidos/PedidoItemsEditor';

function RegistrarPedido() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [medidas, setMedidas] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [unidades, setUnidades] = useState<any[]>([]);

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info' | 'warning',
    mensaje: ''
  });

  const [form, setForm] = useState({
    cliente_id: '',
    codigo_pedido: '',
    fecha_pedido: '',
    fecha_entrega_estimada: '',
    descripcion_pedido: ''
  });

  const [detalles, setDetalles] = useState<DetallePedidoForm[]>([
    { ...detallePedidoVacio }
  ]);

  const mostrarFeedback = (
    tipo: 'success' | 'error' | 'info' | 'warning',
    mensaje: string
  ) => {
    setFeedback({
      tipo,
      mensaje
    });
  };

  const cargarDatosBase = async () => {
    const [
      clientesData,
      tiposData,
      medidasData,
      coloresData,
      materialesData,
      unidadesData
    ] = await Promise.all([
      apiFetch('/clientes/select'),
      apiFetch('/catalogos/tiposProducto'),
      apiFetch('/catalogos/medidas'),
      apiFetch('/catalogos/colores'),
      apiFetch('/catalogos/materiales'),
      apiFetch('/catalogos/unidades-medida')
    ]);

    setClientes(clientesData.clientes);
    setTipos(tiposData.items);
    setMedidas(medidasData.items);
    setColores(coloresData.items);
    setMateriales(materialesData.items);
    setUnidades(unidadesData.unidades);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarDatosBase();
      } catch (error: any) {
        mostrarFeedback('error', error.message);
      }
    };

    iniciar();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validarFormulario = () => {
    if (!form.cliente_id) {
      mostrarFeedback('error', 'Debe seleccionar un cliente');
      return false;
    }

    if (!detalles || detalles.length === 0) {
      mostrarFeedback('error', 'Debe registrar al menos un producto');
      return false;
    }

    for (const [index, item] of detalles.entries()) {
      if (
        !item.tipo_producto_id ||
        !item.medida_id ||
        !item.color_id ||
        !item.material_id
      ) {
        mostrarFeedback(
          'error',
          `El producto ${index + 1} debe tener tipo, medida, color y material`
        );
        return false;
      }

      if (!item.cantidad_pedida || Number(item.cantidad_pedida) <= 0) {
        mostrarFeedback(
          'error',
          `El producto ${index + 1} debe tener cantidad mayor a 0`
        );
        return false;
      }

      if (!item.unidad_medida_id) {
        mostrarFeedback(
          'error',
          `El producto ${index + 1} debe tener unidad`
        );
        return false;
      }

      if (!item.precio_unitario || Number(item.precio_unitario) < 0) {
        mostrarFeedback(
          'error',
          `El producto ${index + 1} debe tener precio válido`
        );
        return false;
      }
    }

    return true;
  };

  const registrarPedido = async (e: FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      const body = {
        cliente_id: Number(form.cliente_id),
        codigo_pedido: form.codigo_pedido || null,
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
            : Number(item.unidad_medida_id),
          precio_unitario: Number(item.precio_unitario),
          moneda_codigo: item.moneda_codigo,
          descripcion_item: item.descripcion_item,
          observacion: item.observacion
        }))
      };

      const data = await apiFetch('/pedidos', {
        method: 'POST',
        body: JSON.stringify(body)
      });

      mostrarFeedback('success', 'Pedido registrado correctamente');

      setTimeout(() => {
        navigate(`/gestion/pedidos/${data.pedido.pedido_id}`);
      }, 900);

    } catch (error: any) {
      mostrarFeedback('error', error.message);
    }
  };

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

      <div className="pedidos-header">
        <div>
          <h1>Registrar pedido</h1>
          <p>Registra un nuevo pedido con uno o varios productos.</p>
        </div>
      </div>

      <form className="form-card pedido-form" onSubmit={registrarPedido}>
        <h3>Datos del pedido</h3>

        <div className="pedido-datos-grid">
          <div>
            <label>Cliente</label>
            <select
              name="cliente_id"
              value={form.cliente_id}
              onChange={handleChange}
            >
              <option value="">Seleccione cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.cliente_id} value={cliente.cliente_id}>
                  {cliente.razon_social} - {cliente.ruc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Código de pedido opcional</label>
            <input
              name="codigo_pedido"
              value={form.codigo_pedido}
              onChange={handleChange}
              placeholder="Ejemplo: PED-001"
            />
          </div>

          <div>
            <label>Fecha de pedido</label>
            <input
              type="date"
              name="fecha_pedido"
              value={form.fecha_pedido}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Fecha de entrega estimada</label>
            <input
              type="date"
              name="fecha_entrega_estimada"
              value={form.fecha_entrega_estimada}
              onChange={handleChange}
            />
          </div>

          <div className="pedido-descripcion-full">
            <label>Descripción del pedido</label>
            <textarea
              name="descripcion_pedido"
              value={form.descripcion_pedido}
              onChange={handleChange}
              rows={3}
              placeholder="Ejemplo: Pedido de drizas para entrega semanal"
            />
          </div>
        </div>

        <PedidoItemsEditor
          detalles={detalles}
          setDetalles={setDetalles}
          tipos={tipos}
          medidas={medidas}
          colores={colores}
          materiales={materiales}
          unidades={unidades}
          onFeedback={mostrarFeedback}
        />

        <div className="pedido-form-actions">
          <button type="submit">
            Guardar pedido
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrarPedido;