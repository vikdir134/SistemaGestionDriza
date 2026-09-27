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

import '../../styles/almacenMateriaPrima.css';


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
    valor: 'ENTRADA_COMPRA',
    texto: 'Entrada por compra'
  },
  {
    valor: 'SALIDA_PRODUCCION',
    texto: 'Salida por producción'
  },
  {
    valor: 'SALIDA_MERMA',
    texto: 'Salida por merma'
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


function AlmacenMateriaPrimaLoteDetalle() {
  const {
    stock_materia_prima_lote_id:
      compra_materia_prima_id
  } = useParams();

  const [
    lote,
    setLote
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


  const cargarLote =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/almacen-materia-prima/lotes/${compra_materia_prima_id}`
          );

        setLote(
          data.lote
        );
      },
      [
        compra_materia_prima_id
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
            `/almacen-materia-prima/lotes/${compra_materia_prima_id}/movimientos?${params.toString()}`
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
        compra_materia_prima_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarLote(),
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
    cargarLote,
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


  const tipoTexto = (
    tipo: string
  ) => {
    const item =
      tiposMovimiento.find(
        (opcion) =>
          opcion.valor === tipo
      );

    return item?.texto || tipo;
  };


  const esEntrada = (
    tipo: string
  ) => {
    return [
      'ENTRADA_COMPRA',
      'AJUSTE_ENTRADA'
    ].includes(tipo);
  };


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando lote...
        </p>
      </div>
    );
  }


  if (!lote) {
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
          to="/gestion/almacen/materia-prima"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar el lote.
        </div>

      </div>
    );
  }


  return (
    <div className="pedidos-page almacen-mp-page">

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
        to="/gestion/almacen/materia-prima"
        className="btn-volver"
      >
        ← Volver al almacén
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            {lote.nombre_lote}
          </h1>

          <p>
            Detalle de las materias primas
            ingresadas en este lote.
          </p>
        </div>

        <Link
          to={
            `/gestion/compras-materia-prima/${lote.compra_materia_prima_id}`
          }
          className="btn-outline"
        >
          Ver compra
        </Link>
      </div>


      <div className="almacen-mp-lote-meta">

        <div>
          <span>
            Proveedor
          </span>

          <strong>
            {
              lote.proveedor
            }
          </strong>

          <small>
            RUC {
              lote.proveedor_ruc
            }
          </small>
        </div>


        <div>
          <span>
            Fecha
          </span>

          <strong>
            {
              lote
                .fecha_compra
                ?.slice(
                  0,
                  10
                )
            }
          </strong>
        </div>


        <div>
          <span>
            Documento
          </span>

          <strong>
            {
              lote
                .numero_documento ||
              '-'
            }
          </strong>
        </div>

      </div>


      <div className="almacen-mp-detalle-resumen almacen-mp-detalle-resumen-3">

        <div>
          <span>
            Total comprado
          </span>

          <strong>
            {
              cantidad(
                lote
                  .cantidad_inicial_total
              )
            } KG
          </strong>
        </div>


        <div>
          <span>
            Consumido
          </span>

          <strong>
            {
              cantidad(
                lote
                  .cantidad_consumida_total
              )
            } KG
          </strong>
        </div>


        <div>
          <span>
            Disponible
          </span>

          <strong className="almacen-mp-disponible">
            {
              cantidad(
                lote
                  .cantidad_disponible_total
              )
            } KG
          </strong>
        </div>

      </div>


      <div className="tabla-card">

        <div className="almacen-mp-tabla-cabecera">
          <div>
            <h3>
              Materias primas del lote
            </h3>

            <p>
              Revisa cuánto ingresó,
              cuánto se consumió y cuánto queda.
            </p>
          </div>
        </div>


        <div className="tabla-scroll">
          <table className="almacen-mp-tabla-simple">
            <thead>
              <tr>
                <th>
                  Material
                </th>
                <th>
                  Color
                </th>
                <th>
                  Comprado
                </th>
                <th>
                  Consumido
                </th>
                <th>
                  Disponible
                </th>
              </tr>
            </thead>

            <tbody>
              {
                lote.detalles.map(
                  (item: any) => (
                    <tr
                      key={
                        item
                          .compra_materia_prima_detalle_id
                      }
                    >
                      <td>
                        <strong>
                          {
                            item.material
                          }
                        </strong>
                      </td>

                      <td>
                        {
                          item.color
                        }
                      </td>

                      <td>
                        {
                          cantidad(
                            item
                              .cantidad_inicial
                          )
                        } {
                          item.unidad
                        }
                      </td>

                      <td>
                        {
                          cantidad(
                            item
                              .cantidad_consumida
                          )
                        } {
                          item.unidad
                        }
                      </td>

                      <td>
                        <strong className="almacen-mp-disponible">
                          {
                            cantidad(
                              item
                                .cantidad_disponible
                            )
                          } {
                            item.unidad
                          }
                        </strong>
                      </td>
                    </tr>
                  )
                )
              }
            </tbody>
          </table>
        </div>

      </div>


      <details className="almacen-mp-historial">

        <summary>
          Ver historial de movimientos
        </summary>


        <div className="almacen-mp-historial-contenido">

          <div className="almacen-mp-movimientos-header">
            <div>
              <h3>
                Historial del lote
              </h3>

              <p>
                Registro de entradas y salidas
                de sus materias primas.
              </p>
            </div>

            <div className="almacen-mp-movimiento-filtro">
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
                    (opcion) => (
                      <option
                        key={
                          opcion.valor ||
                          'TODOS'
                        }
                        value={
                          opcion.valor
                        }
                      >
                        {
                          opcion.texto
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
                    Materia prima
                  </th>
                  <th>
                    Tipo
                  </th>
                  <th>
                    Movimiento
                  </th>
                  <th>
                    Observación
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
                            .movimiento_materia_prima_id
                        }
                      >
                        <td>
                          {
                            movimiento
                              .fecha_movimiento
                              ? new Date(
                                  movimiento
                                    .fecha_movimiento
                                )
                                  .toLocaleString()
                              : '-'
                          }
                        </td>

                        <td>
                          <strong>
                            {
                              movimiento.material
                            }
                          </strong>
                          {' / '}
                          {
                            movimiento.color
                          }
                        </td>

                        <td>
                          <span
                            className={
                              esEntrada(
                                movimiento
                                  .tipo_movimiento
                              )
                                ? 'almacen-mp-movimiento almacen-mp-movimiento-entrada'
                                : 'almacen-mp-movimiento almacen-mp-movimiento-salida'
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
                                ? 'almacen-mp-cantidad-entrada'
                                : 'almacen-mp-cantidad-salida'
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
                              movimiento.unidad
                            }
                          </strong>
                        </td>

                        <td>
                          {
                            movimiento
                              .observacion ||
                            '-'
                          }
                        </td>
                      </tr>
                    )
                  )
                }

                {
                  movimientos.length === 0 &&
                  (
                    <tr>
                      <td colSpan={5}>
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

      </details>

    </div>
  );
}


export default AlmacenMateriaPrimaLoteDetalle;
