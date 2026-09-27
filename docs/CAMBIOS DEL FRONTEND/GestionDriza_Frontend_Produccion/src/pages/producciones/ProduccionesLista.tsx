import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/producciones.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function ProduccionesLista() {
  const [
    producciones,
    setProducciones
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


  const cargarProducciones =
    useCallback(
      async (
        pagina: number
      ) => {
        const data =
          await apiFetch(
            `/producciones?page=${pagina}&limit=10`
          );

        setProducciones(
          data.producciones || []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);

        try {
          await cargarProducciones(
            page
          );

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    page,
    cargarProducciones
  ]);


  const fechaTexto = (
    valor: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return valor.slice(
      0,
      10
    );
  };


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  return (
    <div className="pedidos-page producciones-page">

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


      <div className="pedidos-header producciones-header">
        <div>
          <h1>
            Producción
          </h1>

          <p>
            Registra el producto fabricado y consulta
            el consumo de materia prima realizado por FIFO.
          </p>
        </div>

        <Link
          to="/gestion/producciones/registrar"
          className="btn-primary-link"
        >
          + Registrar producción
        </Link>
      </div>


      <div className="tabla-card">

        <div className="prod-tabla-cabecera">
          <div>
            <h3>
              Producciones registradas
            </h3>

            <p>
              Historial de ingresos al almacén
              de producto terminado.
            </p>
          </div>

          <span className="muted">
            {
              paginacion.total
            } producción(es)
          </span>
        </div>


        {
          cargando
            ? (
              <p>
                Cargando producciones...
              </p>
            )
            : (
              <>
                <div className="tabla-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          Producción
                        </th>
                        <th>
                          Fecha
                        </th>
                        <th>
                          Productos
                        </th>
                        <th>
                          Total producido
                        </th>
                        <th>
                          Observación
                        </th>
                        <th>
                          Registrado por
                        </th>
                        <th>
                          Acción
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        producciones.map(
                          (produccion) => (
                            <tr
                              key={
                                produccion
                                  .produccion_id
                              }
                            >
                              <td>
                                <strong>
                                  #{
                                    produccion
                                      .produccion_id
                                  }
                                </strong>
                              </td>

                              <td>
                                {
                                  fechaTexto(
                                    produccion
                                      .fecha_produccion
                                  )
                                }
                              </td>

                              <td>
                                {
                                  produccion
                                    .cantidad_items
                                }
                              </td>

                              <td>
                                <strong>
                                  {
                                    cantidad(
                                      produccion
                                        .total_producido_kg
                                    )
                                  } KG
                                </strong>
                              </td>

                              <td>
                                {
                                  produccion
                                    .observacion ||
                                  '-'
                                }
                              </td>

                              <td>
                                {
                                  produccion
                                    .registrado_por
                                }
                              </td>

                              <td>
                                <Link
                                  className="btn-outline"
                                  to={
                                    `/gestion/producciones/${produccion.produccion_id}`
                                  }
                                >
                                  Ver detalle
                                </Link>
                              </td>
                            </tr>
                          )
                        )
                      }

                      {
                        producciones.length === 0 &&
                        (
                          <tr>
                            <td colSpan={7}>
                              Todavía no hay producciones registradas.
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
              </>
            )
        }

      </div>

    </div>
  );
}


export default ProduccionesLista;
