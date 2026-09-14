import {
  useCallback,
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

import '../../styles/comprasMateriaPrima.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type FiltrosCompraMP = {
  proveedor_id: string;
  q: string;
};


const filtrosVacios: FiltrosCompraMP = {
  proveedor_id: '',
  q: ''
};


function ComprasMateriaPrimaLista() {
  const [
    compras,
    setCompras
  ] = useState<any[]>([]);

  const [
    proveedores,
    setProveedores
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
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  /*
   * filtros:
   *   lo que el usuario está escribiendo.
   *
   * filtrosAplicados:
   *   lo que realmente alimenta la consulta.
   *
   * Así cambiar el select/input no dispara
   * consultas hasta pulsar "Buscar".
   */
  const [
    filtros,
    setFiltros
  ] = useState<FiltrosCompraMP>({
    ...filtrosVacios
  });

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<FiltrosCompraMP>({
    ...filtrosVacios
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


  const cargarProveedores =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/proveedores'
          );

        setProveedores(
          data.proveedores || []
        );
      },
      []
    );


  const cargarCompras =
    useCallback(
      async (
        paginaActual: number,
        filtrosActuales: FiltrosCompraMP
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(paginaActual)
        );

        params.set(
          'limit',
          '10'
        );

        if (
          filtrosActuales.proveedor_id
        ) {
          params.set(
            'proveedor_id',
            filtrosActuales.proveedor_id
          );
        }

        if (
          filtrosActuales.q.trim()
        ) {
          params.set(
            'q',
            filtrosActuales.q.trim()
          );
        }

        const data =
          await apiFetch(
            `/compras-materia-prima?${params.toString()}`
          );

        setCompras(
          data.compras || []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarProveedores(),
            cargarCompras(
              1,
              filtrosVacios
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
    cargarCompras,
    cargarProveedores
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    const recargar =
      async () => {
        try {
          await cargarCompras(
            page,
            filtrosAplicados
          );

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });
        }
      };

    recargar();
  }, [
    page,
    filtrosAplicados,
    cargarCompras
  ]);


  const aplicarFiltros = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPage(1);

    setFiltrosAplicados({
      proveedor_id:
        filtros.proveedor_id,
      q:
        filtros.q.trim()
    });
  };


  const limpiarFiltros = () => {
    setFiltros({
      ...filtrosVacios
    });

    setPage(1);

    setFiltrosAplicados({
      ...filtrosVacios
    });
  };


  const monedaSimbolo = (
    moneda: string
  ) => {
    return moneda === 'USD'
      ? '$'
      : 'S/';
  };


  return (
    <div className="pedidos-page compra-mp-page">

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


      <div className="pedidos-header">
        <div>
          <h1>
            Compras de materia prima
          </h1>

          <p>
            Gestiona las compras de fibra por lote
            y su ingreso al almacén de materia prima.
          </p>
        </div>

        <Link
          to="/gestion/compras-materia-prima/registrar"
          className="btn-primary-link"
        >
          + Registrar lote
        </Link>
      </div>


      <form
        className="compra-mp-filtros"
        onSubmit={aplicarFiltros}
      >
        <div>
          <label>
            Buscar
          </label>

          <input
            value={filtros.q}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                q: e.target.value
              })
            }
            placeholder="Lote, documento, proveedor..."
          />
        </div>

        <div>
          <label>
            Proveedor
          </label>

          <select
            value={filtros.proveedor_id}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                proveedor_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todos
            </option>

            {proveedores.map(
              (proveedor) => (
                <option
                  key={
                    proveedor.proveedor_id
                  }
                  value={
                    proveedor.proveedor_id
                  }
                >
                  {
                    proveedor.razon_social
                  }
                </option>
              )
            )}
          </select>
        </div>

        <button type="submit">
          Buscar
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={limpiarFiltros}
        >
          Limpiar
        </button>
      </form>


      <div className="tabla-card">

        <div className="compra-mp-tabla-header">
          <div>
            <h3>
              Lotes registrados
            </h3>

            <span className="muted">
              {
                paginacion.total
              } registro(s)
            </span>
          </div>
        </div>


        {cargando ? (
          <p>
            Cargando compras...
          </p>
        ) : (
          <>
            <div className="tabla-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Lote</th>
                    <th>Proveedor</th>
                    <th>Fecha</th>
                    <th>Documento</th>
                    <th>Items</th>
                    <th>Total comprado</th>
                    <th>Disponible</th>
                    <th>Monto</th>
                    <th>Registrado por</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {compras.map(
                    (compra) => (
                      <tr
                        key={
                          compra
                            .compra_materia_prima_id
                        }
                      >
                        <td>
                          <strong>
                            {
                              compra
                                .nombre_lote
                            }
                          </strong>
                        </td>

                        <td>
                          {
                            compra
                              .razon_social
                          }
                          <br />
                          <span className="muted">
                            {
                              compra.ruc
                            }
                          </span>
                        </td>

                        <td>
                          {
                            compra
                              .fecha_compra
                              ?.slice(
                                0,
                                10
                              )
                          }
                        </td>

                        <td>
                          {
                            compra
                              .numero_documento ||
                            '-'
                          }
                        </td>

                        <td>
                          {
                            compra
                              .cantidad_items
                          }
                        </td>

                        <td>
                          <strong>
                            {
                              Number(
                                compra
                                  .cantidad_total_kg ||
                                0
                              )
                                .toFixed(3)
                            } KG
                          </strong>
                        </td>

                        <td>
                          {
                            Number(
                              compra
                                .cantidad_disponible_kg ||
                              0
                            )
                              .toFixed(3)
                          } KG
                        </td>

                        <td>
                          {
                            monedaSimbolo(
                              compra
                                .moneda_codigo
                            )
                          }
                          {' '}
                          {
                            Number(
                              compra
                                .monto_total ||
                              0
                            )
                              .toFixed(2)
                          }
                          {' '}
                          {
                            compra
                              .moneda_codigo
                          }
                        </td>

                        <td>
                          {
                            compra
                              .registrado_por
                          }
                        </td>

                        <td>
                          <Link
                            className="btn-outline"
                            to={
                              `/gestion/compras-materia-prima/${compra.compra_materia_prima_id}`
                            }
                          >
                            Ver detalle
                          </Link>
                        </td>
                      </tr>
                    )
                  )}

                  {
                    compras.length === 0 &&
                    (
                      <tr>
                        <td colSpan={10}>
                          No hay compras de materia prima
                          para los filtros seleccionados.
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
          </>
        )}

      </div>

    </div>
  );
}


export default ComprasMateriaPrimaLista;
