import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/almacenProductoTerminado.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


const tiposMovimiento = [
  {
    valor: '',
    texto: 'Todos'
  },
  {
    valor: 'ENTRADA_PRODUCCION',
    texto: 'Entrada por producción'
  },
  {
    valor: 'SALIDA_ENTREGA',
    texto: 'Salida por entrega'
  },
  {
    valor: 'AJUSTE_ENTRADA',
    texto: 'Ajuste de entrada'
  },
  {
    valor: 'AJUSTE_SALIDA',
    texto: 'Ajuste de salida'
  }
];


function AlmacenProductoTerminadoDetalle() {
  const {
    stock_producto_terminado_id
  } = useParams();

  const [
    presentacion,
    setPresentacion
  ] = useState<any | null>(
    null
  );

  const [
    movimientos,
    setMovimientos
  ] = useState<any[]>([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    tipoMovimiento,
    setTipoMovimiento
  ] = useState('');

  const [
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

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


  const cargarPresentacion =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/almacen-producto-terminado/presentaciones/${stock_producto_terminado_id}`
          );

        setPresentacion(
          data.presentacion
        );
      },
      [
        stock_producto_terminado_id
      ]
    );


  const cargarMovimientos =
    useCallback(
      async (
        pagina: number,
        tipo: string
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(pagina)
        );

        params.set(
          'limit',
          '10'
        );

        if (tipo) {
          params.set(
            'tipo_movimiento',
            tipo
          );
        }

        const data =
          await apiFetch(
            `/almacen-producto-terminado/presentaciones/${stock_producto_terminado_id}/movimientos?${params.toString()}`
          );

        setMovimientos(
          data.movimientos ||
          []
        );

        setPaginacion(
          data.paginacion
        );
      },
      [
        stock_producto_terminado_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarPresentacion(),
            cargarMovimientos(
              1,
              ''
            )
          ]);

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
    cargarPresentacion,
    cargarMovimientos
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarMovimientos(
      page,
      tipoMovimiento
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    page,
    tipoMovimiento,
    cargarMovimientos,
    cargando
  ]);


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  const fechaHoraTexto = (
    valor: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return new Date(
      valor
    ).toLocaleString();
  };


  const esEntrada = (
    tipo: string
  ) => {
    return [
      'ENTRADA_PRODUCCION',
      'AJUSTE_ENTRADA'
    ].includes(tipo);
  };


  const tipoTexto = (
    tipo: string
  ) => {
    return (
      tiposMovimiento.find(
        (item) =>
          item.valor === tipo
      )?.texto ||
      tipo
    );
  };


  const referenciaTexto = (
    movimiento: any
  ) => {
    if (
      movimiento.produccion_id
    ) {
      return (
        `Producción #${movimiento.produccion_id}`
      );
    }

    if (
      movimiento.entrega_id
    ) {
      return movimiento.pedido_id
        ? `Entrega #${movimiento.entrega_id} · Pedido #${movimiento.pedido_id}`
        : `Entrega #${movimiento.entrega_id}`;
    }

    return '-';
  };


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando stock...
        </p>
      </div>
    );
  }


  if (!presentacion) {
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
          to="/gestion/almacen/producto-terminado"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar el stock
          del producto terminado.
        </div>

      </div>
    );
  }


  return (
    <div className="pedidos-page almacen-pt-page">

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
        to="/gestion/almacen/producto-terminado"
        className="btn-volver"
      >
        ← Volver al almacén
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            {
              presentacion
                .tipo_producto
            }
            {' · '}
            {
              presentacion.material
            }
            {' · '}
            {
              presentacion.medida
            }
            {' · '}
            {
              presentacion.color
            }
          </h1>

          <p>
            Stock e historial de movimientos
            de esta presentación.
          </p>
        </div>
      </div>


      <div className="apt-detalle-principal">

        <div className="apt-presentacion-destacada">
          <span>
            Presentación
          </span>

          <strong>
            {
              cantidad(
                presentacion
                  .cantidad_presentacion
              )
            } {
              presentacion
                .unidad_presentacion
            }
          </strong>
        </div>


        <div>
          <span>
            Stock disponible
          </span>

          <strong className="apt-stock-positivo">
            {
              cantidad(
                presentacion
                  .cantidad_disponible
              )
            } {
              presentacion.unidad
            }
          </strong>
        </div>


        <div>
          <span>
            Unidades disponibles
          </span>

          <strong>
            {
              Number(
                presentacion
                  .presentaciones_disponibles ||
                0
              ).toFixed(2)
            }
          </strong>
        </div>


        <div>
          <span>
            Estado
          </span>

          <strong>
            {
              presentacion
                .estado_stock ===
                'CON_STOCK'
                ? 'Con stock'
                : 'Agotado'
            }
          </strong>
        </div>

      </div>


      <div className="tabla-card">

        <div className="apt-movimientos-header">
          <div>
            <h3>
              Historial de movimientos
            </h3>

            <p>
              Entradas por producción
              y salidas por entregas.
            </p>
          </div>


          <div className="apt-movimiento-filtro">
            <label>
              Tipo
            </label>

            <select
              value={
                tipoMovimiento
              }
              onChange={(e) => {
                setPage(1);

                setTipoMovimiento(
                  e.target.value
                );
              }}
            >
              {
                tiposMovimiento.map(
                  (item) => (
                    <option
                      key={
                        item.valor ||
                        'TODOS'
                      }
                      value={
                        item.valor
                      }
                    >
                      {
                        item.texto
                      }
                    </option>
                  )
                )
              }
            </select>
          </div>
        </div>


        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>
                  Fecha
                </th>
                <th>
                  Movimiento
                </th>
                <th>
                  Cantidad
                </th>
                <th>
                  Referencia
                </th>
                <th>
                  Observación
                </th>
                <th>
                  Registrado por
                </th>
              </tr>
            </thead>

            <tbody>
              {
                movimientos.map(
                  (movimiento) => (
                    <tr
                      key={
                        movimiento
                          .movimiento_producto_terminado_id
                      }
                    >
                      <td>
                        {
                          fechaHoraTexto(
                            movimiento
                              .fecha_movimiento
                          )
                        }
                      </td>

                      <td>
                        <span
                          className={
                            esEntrada(
                              movimiento
                                .tipo_movimiento
                            )
                              ? 'apt-badge apt-badge-ok'
                              : 'apt-badge apt-badge-salida'
                          }
                        >
                          {
                            tipoTexto(
                              movimiento
                                .tipo_movimiento
                            )
                          }
                        </span>
                      </td>

                      <td>
                        <strong
                          className={
                            esEntrada(
                              movimiento
                                .tipo_movimiento
                            )
                              ? 'apt-stock-positivo'
                              : 'apt-stock-salida'
                          }
                        >
                          {
                            esEntrada(
                              movimiento
                                .tipo_movimiento
                            )
                              ? '+'
                              : '-'
                          }
                          {
                            cantidad(
                              movimiento
                                .cantidad
                            )
                          } {
                            presentacion.unidad
                          }
                        </strong>
                      </td>

                      <td>
                        {
                          referenciaTexto(
                            movimiento
                          )
                        }
                      </td>

                      <td>
                        {
                          movimiento
                            .observacion ||
                          '-'
                        }
                      </td>

                      <td>
                        {
                          movimiento
                            .registrado_por
                        }
                      </td>
                    </tr>
                  )
                )
              }

              {
                movimientos.length ===
                  0 &&
                (
                  <tr>
                    <td colSpan={6}>
                      No existen movimientos
                      para el filtro seleccionado.
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>


        <div className="paginado">

          <button
            type="button"
            disabled={
              page <= 1
            }
            onClick={() =>
              setPage(
                page - 1
              )
            }
          >
            Anterior
          </button>

          <span>
            Página {
              paginacion.page
            } de {
              paginacion
                .totalPaginas ||
              1
            }
          </span>

          <button
            type="button"
            disabled={
              page >=
              paginacion
                .totalPaginas
            }
            onClick={() =>
              setPage(
                page + 1
              )
            }
          >
            Siguiente
          </button>

        </div>

      </div>

    </div>
  );
}


export default AlmacenProductoTerminadoDetalle;
