import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import FeedbackToast
  from '../components/common/FeedbackToast';

import ConfirmDialog
  from '../components/common/ConfirmDialog';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import '../styles/entregasStock.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


const fechaLocalActual = () => {
  const hoy =
    new Date();

  const anio =
    hoy.getFullYear();

  const mes =
    String(
      hoy.getMonth() + 1
    ).padStart(
      2,
      '0'
    );

  const dia =
    String(
      hoy.getDate()
    ).padStart(
      2,
      '0'
    );

  return `${anio}-${mes}-${dia}`;
};


const nuevaKey = () => {
  if (
    typeof crypto !==
      'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    'entrega',
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join('-');
};


function EntregaPedidoDetalle() {
  const {
    pedido_id
  } = useParams();

  const [
    pedido,
    setPedido
  ] = useState<any | null>(
    null
  );

  const [
    detallesEntrega,
    setDetallesEntrega
  ] = useState<any[]>([]);

  const [
    fechaEntrega,
    setFechaEntrega
  ] = useState(
    fechaLocalActual()
  );

  const [
    comentarioEntrega,
    setComentarioEntrega
  ] = useState('');

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    confirmarRegistro,
    setConfirmarRegistro
  ] = useState(false);

  const [
    idempotencyKey,
    setIdempotencyKey
  ] = useState(
    nuevaKey()
  );

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });

  const {
    procesando:
      registrandoEntrega,

    intentarBloquear:
      bloquearEntrega,

    liberar:
      liberarEntrega
  } = useBloqueoAccion();


  const cargarPedido =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/entregas/pedidos/${pedido_id}`
          );

        setPedido(
          data.pedido
        );

        const detalles =
          data.pedido.detalles.map(
            (item: any) => ({
              ...item,
              cantidad_entregada_input: '',
              observacion_entrega: ''
            })
          );

        setDetallesEntrega(
          detalles
        );
      },
      [
        pedido_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);

        try {
          await cargarPedido();

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarPedido
  ]);


  const claseEstado = (
    estado: string
  ) => {
    if (
      estado ===
      'COMPLETO'
    ) {
      return (
        'estado estado-completo'
      );
    }

    if (
      estado ===
      'PARCIAL'
    ) {
      return (
        'estado estado-parcial'
      );
    }

    return (
      'estado estado-pendiente'
    );
  };


  const textoEstado = (
    estado: string
  ) => {
    if (
      estado ===
      'COMPLETO'
    ) {
      return 'Completo';
    }

    if (
      estado ===
      'PARCIAL'
    ) {
      return 'Parcial';
    }

    return 'Pendiente';
  };


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  const cantidadMaximaEntregable = (
    detalle: any
  ) => {
    const pendiente =
      Number(
        detalle
          .cantidad_pendiente ||
        0
      );

    const stock =
      Number(
        detalle
          .stock_disponible ||
        0
      );

    const presentacion =
      Number(
        detalle
          .cantidad_presentacion ||
        0
      );

    if (
      presentacion <= 0
    ) {
      return 0;
    }

    const limite =
      Math.min(
        pendiente,
        stock
      );

    const unidades =
      Math.floor(
        (
          limite +
          0.000001
        ) /
        presentacion
      );

    return Number(
      (
        unidades *
        presentacion
      ).toFixed(3)
    );
  };


  const estadoStockTexto = (
    estado: string
  ) => {
    if (
      estado ===
      'CON_STOCK'
    ) {
      return 'Stock disponible';
    }

    if (
      estado ===
      'SIN_STOCK'
    ) {
      return 'Sin stock';
    }

    if (
      estado ===
      'SIN_PRESENTACION'
    ) {
      return 'Presentación no configurada';
    }

    if (
      estado ===
      'SIN_PRODUCTO'
    ) {
      return 'Producto no configurado';
    }

    return 'No disponible';
  };


  const estadoStockClase = (
    estado: string
  ) => {
    if (
      estado ===
      'CON_STOCK'
    ) {
      return (
        'entrega-stock-badge entrega-stock-ok'
      );
    }

    if (
      estado ===
      'SIN_STOCK'
    ) {
      return (
        'entrega-stock-badge entrega-stock-error'
      );
    }

    return (
      'entrega-stock-badge entrega-stock-warning'
    );
  };


  const handleDetalleChange = (
    index: number,
    campo: string,
    valor: string
  ) => {
    if (
      registrandoEntrega
    ) {
      return;
    }

    const nuevosDetalles = [
      ...detallesEntrega
    ];

    nuevosDetalles[index] = {
      ...nuevosDetalles[index],
      [campo]:
        valor
    };

    setDetallesEntrega(
      nuevosDetalles
    );
  };


  const validarDetalle = (
    detalle: any,
    index: number
  ) => {
    const valor =
      Number(
        detalle
          .cantidad_entregada_input ||
        0
      );

    if (
      valor <= 0
    ) {
      return null;
    }

    if (
      detalle.estado_item ===
      'COMPLETO'
    ) {
      return (
        `El producto ${index + 1} ya fue entregado completamente`
      );
    }

    if (
      detalle.estado_stock !==
      'CON_STOCK'
    ) {
      return (
        `El producto ${index + 1} no está disponible para entrega: ${estadoStockTexto(detalle.estado_stock)}`
      );
    }

    const pendiente =
      Number(
        detalle
          .cantidad_pendiente ||
        0
      );

    const stock =
      Number(
        detalle
          .stock_disponible ||
        0
      );

    const presentacion =
      Number(
        detalle
          .cantidad_presentacion ||
        0
      );

    if (
      valor >
      pendiente +
      0.000001
    ) {
      return (
        `El producto ${index + 1} solo tiene ${cantidad(pendiente)} ${detalle.unidad} pendientes`
      );
    }

    if (
      valor >
      stock +
      0.000001
    ) {
      return (
        `El producto ${index + 1} solo tiene ${cantidad(stock)} ${detalle.unidad} disponibles en almacén`
      );
    }

    if (
      presentacion <= 0
    ) {
      return (
        `El producto ${index + 1} no tiene presentación configurada`
      );
    }

    const valorMil =
      Math.round(
        valor * 1000
      );

    const presentacionMil =
      Math.round(
        presentacion *
        1000
      );

    if (
      valorMil %
      presentacionMil !==
      0
    ) {
      return (
        `El producto ${index + 1} debe entregarse en múltiplos de ${cantidad(presentacion)} ${detalle.unidad_presentacion}`
      );
    }

    return null;
  };


  const detallesARegistrar =
    useMemo(
      () =>
        detallesEntrega
          .filter(
            (item) =>
              Number(
                item
                  .cantidad_entregada_input
              ) > 0
          ),
      [
        detallesEntrega
      ]
    );


  const totalEntregar =
    useMemo(
      () =>
        detallesARegistrar
          .reduce(
            (
              total,
              item
            ) =>
              total +
              Number(
                item
                  .cantidad_entregada_input ||
                0
              ),
            0
          ),
      [
        detallesARegistrar
      ]
    );


  const solicitarRegistro = (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (!pedido) {
      setFeedback({
        tipo: 'error',
        mensaje:
          'No se encontró el pedido'
      });

      return;
    }

    if (
      detallesARegistrar.length ===
      0
    ) {
      setFeedback({
        tipo: 'error',
        mensaje:
          'Ingrese al menos una cantidad entregada'
      });

      return;
    }

    for (
      let i = 0;
      i < detallesEntrega.length;
      i++
    ) {
      const error =
        validarDetalle(
          detallesEntrega[i],
          i
        );

      if (error) {
        setFeedback({
          tipo: 'error',
          mensaje: error
        });

        return;
      }
    }

    setConfirmarRegistro(
      true
    );
  };


  const registrarEntrega =
    async () => {
      if (
        !pedido ||
        !bloquearEntrega()
      ) {
        return;
      }

      const detalles =
        detallesARegistrar
          .map(
            (item) => ({
              pedido_detalle_id:
                item
                  .pedido_detalle_id,

              cantidad_entregada:
                Number(
                  item
                    .cantidad_entregada_input
                ),

              unidad_medida_id:
                item
                  .unidad_medida_id,

              observacion:
                item
                  .observacion_entrega
                  .trim() ||
                null
            })
          );

      try {
        const data =
          await apiFetch(
            '/entregas',
            {
              method: 'POST',

              headers: {
                'Idempotency-Key':
                  idempotencyKey
              },

              body:
                JSON.stringify({
                  pedido_id:
                    pedido
                      .pedido_id,

                  fecha_entrega:
                    fechaEntrega ||
                    undefined,

                  comentario_entrega:
                    comentarioEntrega
                      .trim() ||
                    null,

                  detalles
                })
            }
          );

        setConfirmarRegistro(
          false
        );

        setFeedback({
          tipo: 'success',
          mensaje:
            data.reutilizada
              ? 'La entrega ya había sido registrada. Se recuperó el resultado existente sin descontar stock nuevamente.'
              : 'Entrega registrada correctamente.'
        });

        setComentarioEntrega(
          ''
        );

        setFechaEntrega(
          fechaLocalActual()
        );

        setIdempotencyKey(
          nuevaKey()
        );

        await cargarPedido();

        liberarEntrega();

      } catch (error: any) {
        liberarEntrega();

        setConfirmarRegistro(
          false
        );

        setFeedback({
          tipo: 'error',
          mensaje:
            error.message
        });
      }
    };


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando pedido...
        </p>
      </div>
    );
  }


  if (!pedido) {
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

        <Link
          to="/gestion/entregas"
          className="btn-volver"
        >
          ← Volver a Entregas
        </Link>

        <div className="tabla-card">
          No se pudo cargar el pedido.
        </div>

      </div>
    );
  }


  return (
    <div className="pedidos-page entrega-stock-page">

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
        abierto={
          confirmarRegistro
        }
        titulo="Registrar entrega"
        descripcion={
          `Se registrarán ${detallesARegistrar.length} producto(s) por un total de ${cantidad(totalEntregar)} KG. El stock de producto terminado se descontará inmediatamente. ¿Deseas continuar?`
        }
        textoConfirmar="Registrar entrega"
        textoProcesando="Registrando..."
        procesando={
          registrandoEntrega
        }
        onConfirmar={
          registrarEntrega
        }
        onCerrar={() =>
          !registrandoEntrega &&
          setConfirmarRegistro(
            false
          )
        }
      />


      <Link
        to="/gestion/entregas"
        className="btn-volver"
      >
        ← Volver a Entregas
      </Link>


      <div className="pedido-detalle-header">
        <div>
          <h1>
            Pedido #{
              pedido.pedido_id
            }
          </h1>

          <p>
            {
              pedido.razon_social
            }
            {' - '}
            {
              pedido.ruc
            }
          </p>
        </div>

        <span
          className={
            claseEstado(
              pedido
                .estado_entrega_general
            )
          }
        >
          {
            textoEstado(
              pedido
                .estado_entrega_general
            )
          }
        </span>
      </div>


      <div className="pedido-resumen-grid">

        <div className="resumen-card">
          <span>
            Cliente
          </span>

          <strong>
            {
              pedido.razon_social
            }
          </strong>
        </div>


        <div className="resumen-card">
          <span>
            Fecha pedido
          </span>

          <strong>
            {
              pedido
                .fecha_pedido
                ?.slice(
                  0,
                  10
                )
            }
          </strong>
        </div>


        <div className="resumen-card">
          <span>
            Entrega estimada
          </span>

          <strong>
            {
              pedido
                .fecha_entrega_estimada
                ?.slice(
                  0,
                  10
                ) ||
              '-'
            }
          </strong>
        </div>


        <div className="resumen-card">
          <span>
            Estado
          </span>

          <strong>
            {
              textoEstado(
                pedido
                  .estado_entrega_general
              )
            }
          </strong>
        </div>

      </div>


      <div className="descripcion-card">
        <strong>
          Descripción del pedido:
        </strong>

        <p>
          {
            pedido
              .descripcion_pedido ||
            'Sin descripción'
          }
        </p>
      </div>


      <form
        className="form-card pedido-form entrega-form"
        onSubmit={
          solicitarRegistro
        }
      >

        <div className="entrega-form-header">
          <div>
            <h3>
              Registrar nueva entrega
            </h3>

            <p>
              Solo se pueden entregar productos
              con stock y en múltiplos de la
              presentación solicitada.
            </p>
          </div>
        </div>


        <div className="entrega-cabecera-grid">

          <div>
            <label>
              Fecha de entrega
            </label>

            <input
              type="date"
              value={
                fechaEntrega
              }
              onChange={(e) =>
                setFechaEntrega(
                  e.target.value
                )
              }
              disabled={
                registrandoEntrega
              }
            />
          </div>


          <div>
            <label>
              Comentario de entrega
            </label>

            <textarea
              value={
                comentarioEntrega
              }
              onChange={(e) =>
                setComentarioEntrega(
                  e.target.value
                )
              }
              placeholder="Ejemplo: Primera entrega parcial del pedido"
              rows={3}
              disabled={
                registrandoEntrega
              }
            />
          </div>

        </div>


        <h3>
          Productos del pedido
        </h3>


        {
          detallesEntrega.map(
            (
              detalle,
              index
            ) => {
              const estaCompleto =
                detalle
                  .estado_item ===
                'COMPLETO';

              const stockDisponible =
                Number(
                  detalle
                    .stock_disponible ||
                  0
                );

              const presentacion =
                Number(
                  detalle
                    .cantidad_presentacion ||
                  0
                );

              const maximoEntregable =
                cantidadMaximaEntregable(
                  detalle
                );

              const valorActual =
                Number(
                  detalle
                    .cantidad_entregada_input ||
                  0
                );

              const errorItem =
                validarDetalle(
                  detalle,
                  index
                );

              const puedeEntregar =
                !estaCompleto &&
                detalle.estado_stock ===
                  'CON_STOCK' &&
                maximoEntregable > 0;

              return (
                <div
                  className={
                    `detalle-card detalle-${detalle.estado_item.toLowerCase()} entrega-producto-card`
                  }
                  key={
                    detalle
                      .pedido_detalle_id
                  }
                >

                  <div className="detalle-header">

                    <div>
                      <strong className="entrega-producto-nombre">
                        {
                          detalle
                            .tipo_producto
                        }
                        {' '}
                        {
                          detalle.material
                        }
                        {' '}
                        {
                          detalle.medida
                        }
                        {' '}
                        {
                          detalle.color
                        }
                      </strong>

                      <br />

                      <span className="muted">
                        {
                          detalle
                            .descripcion_item ||
                          'Sin descripción específica'
                        }
                      </span>
                    </div>


                    <div className="entrega-producto-estados">

                      <span
                        className={
                          claseEstado(
                            detalle.estado_item
                          )
                        }
                      >
                        {
                          textoEstado(
                            detalle.estado_item
                          )
                        }
                      </span>

                      {
                        !estaCompleto &&
                        (
                          <span
                            className={
                              estadoStockClase(
                                detalle
                                  .estado_stock
                              )
                            }
                          >
                            {
                              estadoStockTexto(
                                detalle
                                  .estado_stock
                              )
                            }
                          </span>
                        )
                      }

                    </div>

                  </div>


                  <div className="entrega-producto-resumen">

                    <div>
                      <span>
                        Pedido
                      </span>

                      <strong>
                        {
                          cantidad(
                            detalle
                              .cantidad_pedida
                          )
                        } {
                          detalle.unidad
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Entregado
                      </span>

                      <strong>
                        {
                          cantidad(
                            detalle
                              .cantidad_entregada
                          )
                        } {
                          detalle.unidad
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Pendiente
                      </span>

                      <strong>
                        {
                          cantidad(
                            detalle
                              .cantidad_pendiente
                          )
                        } {
                          detalle.unidad
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Presentación
                      </span>

                      <strong>
                        {
                          presentacion > 0
                            ? `${cantidad(presentacion)} ${detalle.unidad_presentacion || ''}`
                            : '-'
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Stock disponible
                      </span>

                      <strong
                        className={
                          stockDisponible > 0
                            ? 'entrega-stock-valor-ok'
                            : 'entrega-stock-valor-error'
                        }
                      >
                        {
                          cantidad(
                            stockDisponible
                          )
                        } {
                          detalle.unidad
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Presentaciones disponibles
                      </span>

                      <strong>
                        {
                          Number(
                            detalle
                              .presentaciones_disponibles ||
                            0
                          )
                            .toFixed(
                              2
                            )
                        }
                      </strong>
                    </div>

                  </div>


                  {
                    estaCompleto
                      ? (
                        <div className="producto-completo">
                          Este producto ya fue entregado completamente.
                        </div>
                      )
                      : (
                        <>
                          {
                            detalle.estado_stock ===
                              'SIN_PRODUCTO' &&
                            (
                              <div className="entrega-alerta entrega-alerta-error">
                                Este producto todavía no está configurado
                                en el catálogo de productos terminados.
                              </div>
                            )
                          }


                          {
                            detalle.estado_stock ===
                              'SIN_PRESENTACION' &&
                            (
                              <div className="entrega-alerta entrega-alerta-warning">
                                El pedido no tiene una presentación válida
                                configurada para este producto.
                              </div>
                            )
                          }


                          {
                            detalle.estado_stock ===
                              'SIN_STOCK' &&
                            (
                              <div className="entrega-alerta entrega-alerta-error">
                                No existe stock disponible para esta
                                presentación.
                              </div>
                            )
                          }


                          {
                            puedeEntregar &&
                            (
                              <div className="entrega-regla">
                                Puedes entregar hasta
                                {' '}
                                <strong>
                                  {
                                    cantidad(
                                      maximoEntregable
                                    )
                                  } {
                                    detalle.unidad
                                  }
                                </strong>
                                {' '}
                                en múltiplos de
                                {' '}
                                <strong>
                                  {
                                    cantidad(
                                      presentacion
                                    )
                                  } {
                                    detalle
                                      .unidad_presentacion
                                }
                                </strong>.
                              </div>
                            )
                          }


                          <div className="entrega-input-grid">

                            <div>
                              <label>
                                Cantidad a entregar
                              </label>

                              <div className="entrega-input-unidad">

                                <input
                                  type="number"
                                  min="0"
                                  max={
                                    maximoEntregable ||
                                    undefined
                                  }
                                  step={
                                    presentacion > 0
                                      ? presentacion
                                      : '0.001'
                                  }
                                  placeholder={
                                    puedeEntregar
                                      ? `Máximo ${cantidad(maximoEntregable)}`
                                      : 'No disponible'
                                  }
                                  value={
                                    detalle
                                      .cantidad_entregada_input
                                  }
                                  onChange={(e) =>
                                    handleDetalleChange(
                                      index,
                                      'cantidad_entregada_input',
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    registrandoEntrega ||
                                    !puedeEntregar
                                  }
                                />

                                <span>
                                  {
                                    detalle.unidad
                                  }
                                </span>

                              </div>
                            </div>


                            <div>
                              <label>
                                Observación
                              </label>

                              <input
                                placeholder="Opcional"
                                value={
                                  detalle
                                    .observacion_entrega
                                }
                                onChange={(e) =>
                                  handleDetalleChange(
                                    index,
                                    'observacion_entrega',
                                    e.target.value
                                  )
                                }
                                disabled={
                                  registrandoEntrega ||
                                  !puedeEntregar
                                }
                              />
                            </div>

                          </div>


                          {
                            valorActual > 0 &&
                            errorItem &&
                            (
                              <div className="entrega-validacion-error">
                                {
                                  errorItem
                                }
                              </div>
                            )
                          }

                        </>
                      )
                  }

                </div>
              );
            }
          )
        }


        <div className="entrega-total-box">

          <div>
            <span>
              Productos seleccionados
            </span>

            <strong>
              {
                detallesARegistrar.length
              }
            </strong>
          </div>


          <div>
            <span>
              Cantidad total
            </span>

            <strong>
              {
                cantidad(
                  totalEntregar
                )
              } KG
            </strong>
          </div>

        </div>


        <div className="entrega-actions">

          <button
            type="submit"
            disabled={
              registrandoEntrega ||
              detallesARegistrar.length ===
                0
            }
          >
            {
              registrandoEntrega
                ? 'Registrando entrega...'
                : 'Registrar entrega'
            }
          </button>

        </div>

      </form>


      <div className="tabla-card">

        <div className="entrega-historial-header">
          <div>
            <h3>
              Historial de entregas
            </h3>

            <p>
              Entregas ya registradas para este pedido.
            </p>
          </div>
        </div>


        {
          pedido
            .historial_entregas
            .length ===
            0
            ? (
              <p>
                No hay entregas registradas
                para este pedido.
              </p>
            )
            : (
              pedido
                .historial_entregas
                .map(
                  (
                    entrega: any
                  ) => (
                    <div
                      className="historial-card"
                      key={
                        entrega
                          .entrega_id
                      }
                    >

                      <div className="historial-header">
                        <strong>
                          Entrega #{
                            entrega
                              .entrega_id
                          }
                        </strong>

                        <span>
                          {
                            entrega
                              .fecha_entrega
                              ?.slice(
                                0,
                                10
                              )
                          }
                        </span>
                      </div>


                      <p>
                        <strong>
                          Registrado por:
                        </strong>
                        {' '}
                        {
                          entrega
                            .registrado_por
                        }
                      </p>


                      <p>
                        <strong>
                          Comentario:
                        </strong>
                        {' '}
                        {
                          entrega
                            .comentario_entrega ||
                          '-'
                        }
                      </p>


                      <div className="tabla-scroll">
                        <table>
                          <thead>
                            <tr>
                              <th>
                                Producto
                              </th>
                              <th>
                                Presentación
                              </th>
                              <th>
                                Cantidad
                              </th>
                              <th>
                                Observación
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {
                              entrega
                                .detalles
                                .map(
                                  (
                                    item: any
                                  ) => (
                                    <tr
                                      key={
                                        item
                                          .entrega_detalle_id
                                      }
                                    >
                                      <td>
                                        {
                                          item.producto
                                        }
                                      </td>

                                      <td>
                                        {
                                          item
                                            .cantidad_presentacion
                                            ? `${cantidad(item.cantidad_presentacion)} ${item.unidad_presentacion || ''}`
                                            : '-'
                                        }
                                      </td>

                                      <td>
                                        {
                                          cantidad(
                                            item
                                              .cantidad_entregada
                                          )
                                        } {
                                          item.unidad
                                        }
                                      </td>

                                      <td>
                                        {
                                          item
                                            .observacion ||
                                          '-'
                                        }
                                      </td>
                                    </tr>
                                  )
                                )
                            }
                          </tbody>
                        </table>
                      </div>

                    </div>
                  )
                )
            )
        }

      </div>

    </div>
  );
}


export default EntregaPedidoDetalle;
