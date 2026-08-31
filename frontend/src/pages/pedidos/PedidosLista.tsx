import {
  useEffect,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';


function PedidosLista() {
  /* =========================================================
     DATOS
     ========================================================= */

  const [
    pedidos,
    setPedidos
  ] = useState<any[]>([]);


  const [
    clientes,
    setClientes
  ] = useState<any[]>([]);


  /* =========================================================
     FILTROS
     ========================================================= */

  const [
    clienteId,
    setClienteId
  ] = useState('');


  const [
    estadoPedido,
    setEstadoPedido
  ] = useState('');


  const [
    busqueda,
    setBusqueda
  ] = useState('');


  /* =========================================================
     PAGINACIÓN
     ========================================================= */

  const [
    page,
    setPage
  ] = useState(1);


  const [
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  /* =========================================================
     FEEDBACK
     ========================================================= */

  const [
    feedback,
    setFeedback
  ] = useState({
    tipo:
      'info' as
        | 'success'
        | 'error'
        | 'info',

    mensaje: ''
  });


  /* =========================================================
     CARGAR CLIENTES
     ========================================================= */

  const cargarClientes =
    async () => {
      const data =
        await apiFetch(
          '/clientes/select'
        );


      setClientes(
        data.clientes
      );
    };


  /* =========================================================
     CARGAR PEDIDOS
     ========================================================= */

  const cargarPedidos =
    async (
      paginaActual = page,

      clienteActual = clienteId,

      estadoActual = estadoPedido,

      busquedaActual = busqueda
    ) => {
      const params =
        new URLSearchParams();


      params.append(
        'page',
        String(
          paginaActual
        )
      );


      params.append(
        'limit',
        '10'
      );


      if (
        clienteActual
      ) {
        params.append(
          'cliente_id',
          clienteActual
        );
      }


      if (
        estadoActual
      ) {
        params.append(
          'estado_pedido',
          estadoActual
        );
      }


      if (
        busquedaActual.trim()
      ) {
        params.append(
          'q',
          busquedaActual.trim()
        );
      }


      const data =
        await apiFetch(
          `/pedidos?${params.toString()}`
        );


      setPedidos(
        data.pedidos
      );


      setPaginacion(
        data.paginacion
      );
    };


  /* =========================================================
     CARGA INICIAL
     ========================================================= */

  useEffect(() => {
    const iniciar =
      async () => {
        try {
          await cargarClientes();

          await cargarPedidos(
            1
          );

        } catch (
          error: any
        ) {
          setFeedback({
            tipo: 'error',

            mensaje:
              error.message
          });
        }
      };


    iniciar();

  }, []);


  /* =========================================================
     RECARGAR POR PAGINACIÓN / FILTROS SELECT
     ========================================================= */

  useEffect(() => {
    const cargar =
      async () => {
        try {
          await cargarPedidos(
            page
          );

        } catch (
          error: any
        ) {
          setFeedback({
            tipo: 'error',

            mensaje:
              error.message
          });
        }
      };


    cargar();

  }, [
    page,
    clienteId,
    estadoPedido
  ]);


  /* =========================================================
     BUSCAR
     ========================================================= */

  const aplicarBusqueda =
    async (
      e: FormEvent
    ) => {
      e.preventDefault();


      setPage(
        1
      );


      try {
        await cargarPedidos(
          1
        );

      } catch (
        error: any
      ) {
        setFeedback({
          tipo: 'error',

          mensaje:
            error.message
        });
      }
    };


  /* =========================================================
     LIMPIAR FILTROS
     ========================================================= */

  const limpiarFiltros =
    async () => {
      setClienteId(
        ''
      );


      setEstadoPedido(
        ''
      );


      setBusqueda(
        ''
      );


      setPage(
        1
      );


      try {
        await cargarPedidos(
          1,
          '',
          '',
          ''
        );

      } catch (
        error: any
      ) {
        setFeedback({
          tipo: 'error',

          mensaje:
            error.message
        });
      }
    };


  /* =========================================================
     CLASE DE ESTADO
     ========================================================= */

  const claseEstado = (
    estado: string
  ) => {
    if (
      estado ===
      'ENTREGADO'
    ) {
      return (
        'estado-pill estado-entregado'
      );
    }


    if (
      estado ===
      'PARCIAL'
    ) {
      return (
        'estado-pill estado-parcial'
      );
    }


    if (
      estado ===
      'CANCELADO'
    ) {
      return (
        'estado-pill estado-cancelado'
      );
    }


    return (
      'estado-pill estado-registrado'
    );
  };


  /* =========================================================
     REGLA DE EDICIÓN
     ========================================================= */

  const puedeEditarPedido = (
    estado: string
  ) => {
    return (
      estado === 'REGISTRADO' ||
      estado === 'PARCIAL'
    );
  };


  /* =========================================================
     CANTIDADES POR UNIDAD
     ========================================================= */

  const obtenerCantidadesPedido = (
    resumen:
      | string
      | null
      | undefined
  ) => {
    if (
      !resumen
    ) {
      return [];
    }


    return resumen
      .split('|')

      .filter(
        (item) =>
          item.trim() !== ''
      )

      .map(
        (item) => {
          const partes =
            item
              .trim()
              .split(' ');


          const cantidad =
            Number(
              partes[0]
            );


          const unidad =
            partes
              .slice(1)
              .join(' ');


          return {
            cantidad:
              Number.isNaN(
                cantidad
              )
                ? partes[0]
                : cantidad,

            unidad
          };
        }
      );
  };


  /* =========================================================
     FORMATO CANTIDAD
     ========================================================= */

  const formatearCantidad = (
    cantidad:
      | number
      | string
  ) => {
    if (
      typeof cantidad ===
      'string'
    ) {
      return cantidad;
    }


    return (
      cantidad.toLocaleString(
        'es-PE',
        {
          minimumFractionDigits:
            cantidad % 1 === 0
              ? 0
              : 2,

          maximumFractionDigits:
            3
        }
      )
    );
  };


  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="pedidos-page">


      {/* =====================================================
          FEEDBACK
          ===================================================== */}

      <FeedbackToast
        tipo={
          feedback.tipo
        }

        mensaje={
          feedback.mensaje
        }

        onClose={() =>
          setFeedback({
            ...feedback,

            mensaje: ''
          })
        }
      />


      {/* =====================================================
          CABECERA
          ===================================================== */}

      <div className="pedidos-header">

        <div>

          <h1>
            Pedidos totales
          </h1>


          <p>
            Consulta, filtra, revisa
            y edita los pedidos registrados.
          </p>

        </div>


        <div className="pedidos-actions">

          <Link
            className="btn-link"

            to="/gestion/pedidos/registrar"
          >
            + Registrar pedido
          </Link>

        </div>

      </div>


      {/* =====================================================
          FILTROS
          ===================================================== */}

      <form
        className="pedidos-filtros"

        onSubmit={
          aplicarBusqueda
        }
      >


        {/* CLIENTE */}

        <div>

          <label>
            Cliente
          </label>


          <select
            value={
              clienteId
            }

            onChange={(e) => {

              setClienteId(
                e.target.value
              );


              setPage(
                1
              );
            }}
          >

            <option value="">
              Todos los clientes
            </option>


            {clientes.map(
              (cliente) => (

                <option
                  key={
                    cliente.cliente_id
                  }

                  value={
                    cliente.cliente_id
                  }
                >
                  {
                    cliente.razon_social
                  }

                  {' - '}

                  {
                    cliente.ruc
                  }
                </option>

              )
            )}

          </select>

        </div>


        {/* ESTADO */}

        <div>

          <label>
            Estado
          </label>


          <select
            value={
              estadoPedido
            }

            onChange={(e) => {

              setEstadoPedido(
                e.target.value
              );


              setPage(
                1
              );
            }}
          >

            <option value="">
              Todos
            </option>

            <option value="REGISTRADO">
              Registrado
            </option>

            <option value="PARCIAL">
              Parcial
            </option>

            <option value="ENTREGADO">
              Entregado
            </option>

            <option value="CANCELADO">
              Cancelado
            </option>

          </select>

        </div>


        {/* BUSCAR */}

        <div>

          <label>
            Buscar
          </label>


          <input
            value={
              busqueda
            }

            onChange={(e) =>
              setBusqueda(
                e.target.value
              )
            }

            placeholder="Cliente, RUC, código o descripción"
          />

        </div>


        {/* ACCIONES */}

        <div className="filtros-actions">

          <button
            type="submit"
          >
            Buscar
          </button>


          <button
            type="button"

            className="btn-secondary"

            onClick={
              limpiarFiltros
            }
          >
            Limpiar
          </button>

        </div>

      </form>


      {/* =====================================================
          TABLA
          ===================================================== */}

      <div className="pedidos-card">

        <h3>
          Listado de pedidos
        </h3>


        <div className="tabla-responsive">

          <table>

            <thead>

              <tr>
                <th>ID</th>

                <th>
                  Cliente
                </th>

                <th>
                  Fecha pedido
                </th>

                <th>
                  Entrega estimada
                </th>

                <th>
                  Estado
                </th>

                <th>
                  Items
                </th>

                <th>
                  Total ref.
                </th>

                <th>
                  Cantidad / unidad
                </th>

                <th>
                  Registrado por
                </th>

                <th>
                  Acciones
                </th>
              </tr>

            </thead>


            <tbody>

              {pedidos.map(
                (pedido) => {

                  const editable =
                    puedeEditarPedido(
                      pedido.estado_pedido
                    );


                  return (
                    <tr
                      key={
                        pedido.pedido_id
                      }
                    >

                      {/* ID */}

                      <td>
                        #{pedido.pedido_id}
                      </td>


                      {/* CLIENTE */}

                      <td>

                        <strong>
                          {
                            pedido.razon_social
                          }
                        </strong>

                        <br />

                        <span className="muted">
                          {
                            pedido.ruc
                          }
                        </span>

                      </td>


                      {/* FECHA */}

                      <td>
                        {
                          pedido.fecha_pedido
                            ?.slice(
                              0,
                              10
                            )
                        }
                      </td>


                      {/* ENTREGA */}

                      <td>
                        {
                          pedido
                            .fecha_entrega_estimada
                            ?.slice(
                              0,
                              10
                            ) ||
                          '-'
                        }
                      </td>


                      {/* ESTADO */}

                      <td>

                        <span
                          className={
                            claseEstado(
                              pedido.estado_pedido
                            )
                          }
                        >
                          {
                            pedido.estado_pedido
                          }
                        </span>

                      </td>


                      {/* ITEMS */}

                      <td>
                        {
                          pedido.cantidad_items
                        }
                      </td>


                      {/* TOTAL */}

                      <td>

                        <strong>
                          {
                            Number(
                              pedido.total_referencial ||
                              0
                            ).toFixed(
                              2
                            )
                          }
                        </strong>

                      </td>


                      {/* CANTIDADES */}

                      <td>

                        <div className="cantidades-resumen">

                          {
                            obtenerCantidadesPedido(
                              pedido.resumen_cantidades
                            ).map(
                              (
                                item,
                                index
                              ) => (

                                <span
                                  key={
                                    index
                                  }

                                  className="cantidad-pill"
                                >

                                  <strong>
                                    {
                                      formatearCantidad(
                                        item.cantidad
                                      )
                                    }
                                  </strong>


                                  <small>
                                    {
                                      item.unidad
                                    }
                                  </small>

                                </span>

                              )
                            )
                          }


                          {!pedido.resumen_cantidades && (

                            <span className="muted">
                              -
                            </span>

                          )}

                        </div>

                      </td>


                      {/* USUARIO */}

                      <td>
                        {
                          pedido.registrado_por
                        }
                      </td>


                      {/* ACCIONES */}

                      <td>

                        <div className="tabla-acciones">


                          <Link
                            className="btn-link"

                            to={
                              `/gestion/pedidos/${pedido.pedido_id}`
                            }
                          >
                            Ver
                          </Link>


                          {editable ? (

                            <Link
                              className="btn-outline"

                              to={
                                `/gestion/pedidos/${pedido.pedido_id}/editar`
                              }
                            >
                              Editar
                            </Link>

                          ) : (

                            <span
                              className="muted"

                              title={
                                pedido.estado_pedido ===
                                'ENTREGADO'
                                  ? 'El pedido ya fue entregado completamente'
                                  : 'El pedido está cancelado'
                              }
                            >
                              Cerrado
                            </span>

                          )}

                        </div>

                      </td>

                    </tr>
                  );
                }
              )}


              {pedidos.length ===
                0 && (

                <tr>

                  <td
                    colSpan={
                      10
                    }
                  >
                    No hay pedidos registrados.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* ===================================================
            PAGINACIÓN
            =================================================== */}

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
            Página{' '}
            {
              paginacion.page
            }
            {' de '}
            {
              paginacion.totalPaginas ||
              1
            }
          </span>


          <button
            type="button"

            disabled={
              page >=
              paginacion.totalPaginas
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


export default PedidosLista;