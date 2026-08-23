import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { apiFetch } from '../../services/api';

import FeedbackToast from '../../components/common/FeedbackToast';
import ConfirmDialog from '../../components/common/ConfirmDialog';

import PedidoItemsEditor, {
  detallePedidoVacio,
  type DetallePedidoForm
} from '../../components/pedidos/PedidoItemsEditor';

import { useBloqueoAccion } from '../../hooks/useBloqueoAccion';

function EditarPedido() {
  const { pedido_id } = useParams();
  const navigate = useNavigate();

  const [pedido, setPedido] = useState<any | null>(null);

  const [clientes, setClientes] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [medidas, setMedidas] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [unidades, setUnidades] = useState<any[]>([]);

  const [dialogAbierto, setDialogAbierto] = useState(false);

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info' | 'warning',
    mensaje: ''
  });

  const [form, setForm] = useState({
    cliente_id: '',
    codigo_pedido: '',
    fecha_pedido: '',
    fecha_entrega_estimada: '',
    descripcion_pedido: '',
    motivo_cambio: ''
  });

  const [nuevosDetalles, setNuevosDetalles] = useState<
    DetallePedidoForm[]
  >([
    { ...detallePedidoVacio }
  ]);

  /*
   * Protección contra múltiples actualizaciones.
   *
   * useBloqueoAccion utiliza:
   * - useRef para bloquear inmediatamente.
   * - useState para reflejar el estado en la interfaz.
   */
  const {
    procesando: actualizandoPedido,
    intentarBloquear: bloquearActualizacion,
    liberar: liberarActualizacion
  } = useBloqueoAccion();

  const cargarDatos = async () => {
    const [
      pedidoData,
      clientesData,
      tiposData,
      medidasData,
      coloresData,
      materialesData,
      unidadesData
    ] = await Promise.all([
      apiFetch(`/pedidos/${pedido_id}`),
      apiFetch('/clientes'),
      apiFetch('/catalogos/tiposProducto'),
      apiFetch('/catalogos/medidas'),
      apiFetch('/catalogos/colores'),
      apiFetch('/catalogos/materiales'),
      apiFetch('/catalogos/unidades-medida')
    ]);

    const pedidoActual = pedidoData.pedido;

    setPedido(pedidoActual);

    setClientes(clientesData.clientes);

    setTipos(tiposData.items);
    setMedidas(medidasData.items);
    setColores(coloresData.items);
    setMateriales(materialesData.items);
    setUnidades(unidadesData.unidades);

    setForm({
      cliente_id: String(pedidoActual.cliente_id),

      codigo_pedido:
        pedidoActual.codigo_pedido || '',

      fecha_pedido:
        pedidoActual.fecha_pedido?.slice(0, 10) || '',

      fecha_entrega_estimada:
        pedidoActual.fecha_entrega_estimada?.slice(0, 10) || '',

      descripcion_pedido:
        pedidoActual.descripcion_pedido || '',

      motivo_cambio: ''
    });
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarDatos();

      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    iniciar();
  }, [pedido_id]);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /*
   * Primer paso:
   * el usuario pulsa "Actualizar pedido".
   *
   * Todavía NO actualizamos.
   * Abrimos el diálogo de confirmación.
   */
  const prepararEdicion = (e: FormEvent) => {
    e.preventDefault();

    /*
     * Si ya existe una actualización en curso,
     * ignoramos cualquier nuevo submit.
     */
    if (actualizandoPedido) {
      return;
    }

    if (!form.cliente_id) {
      setFeedback({
        tipo: 'error',
        mensaje: 'Debes seleccionar un cliente'
      });

      return;
    }

    if (!form.fecha_pedido) {
      setFeedback({
        tipo: 'error',
        mensaje: 'Debes ingresar la fecha del pedido'
      });

      return;
    }

    if (!form.motivo_cambio.trim()) {
      setFeedback({
        tipo: 'error',
        mensaje: 'Debes ingresar el motivo del cambio'
      });

      return;
    }

    setDialogAbierto(true);
  };

  /*
   * Segundo paso:
   * el usuario confirma la edición.
   *
   * Aquí sí hacemos el PUT.
   */
  const confirmarEdicion = async () => {
    /*
     * BLOQUEO INMEDIATO.
     *
     * Primer clic:
     * bloquearActualizacion() -> true
     *
     * Segundo, tercero, cuarto clic:
     * bloquearActualizacion() -> false
     *
     * Por lo tanto solo puede existir un PUT.
     */
    if (!bloquearActualizacion()) {
      return;
    }

    try {
      /*
       * El editor siempre tiene inicialmente una fila vacía.
       *
       * Solo enviamos elementos que tengan algún dato.
       */
      const detallesValidos = nuevosDetalles.filter(
        (item) => {
          return (
            item.tipo_producto_id ||
            item.medida_id ||
            item.color_id ||
            item.material_id ||
            item.cantidad_pedida ||
            item.precio_unitario ||
            item.descripcion_item
          );
        }
      );

      /*
       * Si el usuario comenzó a llenar un producto nuevo,
       * debemos asegurarnos de que esté completo.
       */
      for (
        let index = 0;
        index < detallesValidos.length;
        index++
      ) {
        const item = detallesValidos[index];

        if (
          !item.tipo_producto_id ||
          !item.medida_id ||
          !item.color_id ||
          !item.material_id
        ) {
          setFeedback({
            tipo: 'error',
            mensaje:
              `El nuevo producto ${index + 1} debe tener tipo, medida, color y material`
          });

          liberarActualizacion();
          return;
        }

        if (
          !item.cantidad_pedida ||
          Number(item.cantidad_pedida) <= 0
        ) {
          setFeedback({
            tipo: 'error',
            mensaje:
              `El nuevo producto ${index + 1} debe tener una cantidad mayor a 0`
          });

          liberarActualizacion();
          return;
        }

        if (!item.unidad_medida_id) {
          setFeedback({
            tipo: 'error',
            mensaje:
              `El nuevo producto ${index + 1} debe tener una unidad de medida`
          });

          liberarActualizacion();
          return;
        }

        if (
          item.precio_unitario === '' ||
          Number(item.precio_unitario) < 0
        ) {
          setFeedback({
            tipo: 'error',
            mensaje:
              `El nuevo producto ${index + 1} debe tener un precio válido`
          });

          liberarActualizacion();
          return;
        }

        if (!item.moneda_codigo) {
          setFeedback({
            tipo: 'error',
            mensaje:
              `El nuevo producto ${index + 1} debe tener una moneda`
          });

          liberarActualizacion();
          return;
        }
      }

      const body = {
        cliente_id:
          Number(form.cliente_id),

        codigo_pedido:
          form.codigo_pedido || null,

        fecha_pedido:
          form.fecha_pedido,

        fecha_entrega_estimada:
          form.fecha_entrega_estimada || null,

        descripcion_pedido:
          form.descripcion_pedido,

        motivo_cambio:
          form.motivo_cambio,

        nuevos_detalles:
          detallesValidos.map((item) => ({
            tipo_producto_id:
              Number(item.tipo_producto_id),

            medida_id:
              Number(item.medida_id),

            color_id:
              Number(item.color_id),

            material_id:
              Number(item.material_id),

            cantidad_pedida:
              Number(item.cantidad_pedida),

            unidad_medida_id:
              Number(item.unidad_medida_id),

            cantidad_presentacion:
              item.cantidad_presentacion
                ? Number(item.cantidad_presentacion)
                : null,

            unidad_presentacion_id:
              item.unidad_presentacion_id
                ? Number(item.unidad_presentacion_id)
                : null,

            precio_unitario:
              Number(item.precio_unitario),

            moneda_codigo:
              item.moneda_codigo,

            descripcion_item:
              item.descripcion_item,

            observacion:
              item.observacion
          }))
      };

      await apiFetch(
        `/pedidos/${pedido_id}`,
        {
          method: 'PUT',
          body: JSON.stringify(body)
        }
      );

      /*
       * Cerramos el diálogo solo cuando el backend
       * confirmó correctamente la actualización.
       */
      setDialogAbierto(false);

      setFeedback({
        tipo: 'success',
        mensaje: 'Pedido actualizado correctamente'
      });

      /*
       * NO liberamos actualizandoPedido aquí.
       *
       * Esto es intencional.
       *
       * Durante estos 800 ms el usuario tampoco
       * podrá generar otro PUT.
       */
      setTimeout(() => {
        navigate(
          `/gestion/pedidos/${pedido_id}`
        );
      }, 800);

    } catch (error: any) {
      /*
       * Si falló el backend sí permitimos
       * que el usuario vuelva a intentarlo.
       */
      liberarActualizacion();

      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const claseEstadoEntrega = (
    estado: string
  ) => {
    if (estado === 'COMPLETO') {
      return 'estado estado-completo';
    }

    if (estado === 'PARCIAL') {
      return 'estado estado-parcial';
    }

    return 'estado estado-pendiente';
  };

  /*
   * Estado inicial mientras cargamos
   * pedido + clientes + catálogos.
   */
  if (!pedido) {
    return (
      <div>
        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() =>
            setFeedback({
              ...feedback,
              mensaje: ''
            })
          }
        />

        <Link
          to="/gestion/pedidos"
          className="btn-volver"
        >
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
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />

      <ConfirmDialog
        abierto={dialogAbierto}
        titulo="Confirmar edición"
        descripcion="Se actualizará la cabecera del pedido y se registrará el motivo del cambio. Si agregaste productos nuevos, quedarán añadidos al pedido."
        textoConfirmar="Actualizar pedido"
        textoProcesando="Actualizando pedido..."
        procesando={actualizandoPedido}
        onConfirmar={confirmarEdicion}
        onCerrar={() => {
          /*
           * El diálogo tampoco puede cerrarse
           * mientras el PUT está ejecutándose.
           */
          if (!actualizandoPedido) {
            setDialogAbierto(false);
          }
        }}
      />

      <Link
        to={`/gestion/pedidos/${pedido_id}`}
        className="btn-volver"
      >
        ← Volver al detalle
      </Link>

      <div className="pedidos-header">
        <div>
          <h1>
            Editar pedido #{pedido.pedido_id}
          </h1>

          <p>
            Edita la cabecera del pedido o agrega
            nuevos productos con motivo.
          </p>
        </div>
      </div>

      <form
        className="form-card pedido-form"
        onSubmit={prepararEdicion}
      >
        <h3>Datos actuales del pedido</h3>

        <label>Cliente</label>

        <select
          name="cliente_id"
          value={form.cliente_id}
          onChange={handleChange}
          disabled={actualizandoPedido}
        >
          <option value="">
            Seleccione cliente
          </option>

          {clientes.map((cliente) => (
            <option
              key={cliente.cliente_id}
              value={cliente.cliente_id}
            >
              {cliente.razon_social} - {cliente.ruc}
            </option>
          ))}
        </select>

        <label>Código de pedido</label>

        <input
          name="codigo_pedido"
          value={form.codigo_pedido}
          onChange={handleChange}
          placeholder="Ejemplo: PED-001"
          disabled={actualizandoPedido}
        />

        <label>Fecha de pedido</label>

        <input
          type="date"
          name="fecha_pedido"
          value={form.fecha_pedido}
          onChange={handleChange}
          disabled={actualizandoPedido}
        />

        <label>Fecha de entrega estimada</label>

        <input
          type="date"
          name="fecha_entrega_estimada"
          value={form.fecha_entrega_estimada}
          onChange={handleChange}
          disabled={actualizandoPedido}
        />

        <label>Descripción del pedido</label>

        <textarea
          name="descripcion_pedido"
          value={form.descripcion_pedido}
          onChange={handleChange}
          rows={3}
          disabled={actualizandoPedido}
        />

        <label>Motivo del cambio</label>

        <textarea
          name="motivo_cambio"
          value={form.motivo_cambio}
          onChange={handleChange}
          rows={3}
          placeholder="Ejemplo: El cliente solicitó aumentar productos al pedido"
          disabled={actualizandoPedido}
        />

        <div className="tabla-card">
          <h3>Productos ya registrados</h3>

          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Entregado</th>
                <th>Pendiente</th>
                <th>Precio</th>
                <th>Estado entrega</th>
              </tr>
            </thead>

            <tbody>
              {pedido.detalles.map(
                (detalle: any) => (
                  <tr
                    key={
                      detalle.pedido_detalle_id
                    }
                  >
                    <td>
                      <strong>
                        {detalle.tipo_producto}{' '}
                        {detalle.material}{' '}
                        {detalle.medida}{' '}
                        {detalle.color}
                      </strong>

                      <br />

                      <span className="muted">
                        {
                          detalle.descripcion_item ||
                          '-'
                        }
                      </span>
                    </td>

                    <td>
                      {detalle.cantidad_pedida}{' '}
                      {detalle.unidad}
                    </td>

                    <td>
                      {detalle.cantidad_entregada}{' '}
                      {detalle.unidad}
                    </td>

                    <td>
                      {detalle.cantidad_pendiente}{' '}
                      {detalle.unidad}
                    </td>

                    <td>
                      {Number(
                        detalle.precio_unitario
                      ).toFixed(2)}{' '}
                      {detalle.moneda_codigo}
                    </td>

                    <td>
                      <span
                        className={
                          claseEstadoEntrega(
                            detalle.estado_entrega
                          )
                        }
                      >
                        {detalle.estado_entrega}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <PedidoItemsEditor
          detalles={nuevosDetalles}
          setDetalles={setNuevosDetalles}
          tipos={tipos}
          medidas={medidas}
          colores={colores}
          materiales={materiales}
          unidades={unidades}
          titulo="Agregar nuevos productos opcionales"
          textoBotonAgregar="+ Agregar otro producto nuevo"
          onFeedback={(tipo, mensaje) =>
            setFeedback({
              tipo,
              mensaje
            })
          }
        />

        <br />

        <button
          type="submit"
          disabled={actualizandoPedido}
        >
          {actualizandoPedido
            ? 'Actualizando pedido...'
            : 'Actualizar pedido'}
        </button>
      </form>
    </div>
  );
}

export default EditarPedido;