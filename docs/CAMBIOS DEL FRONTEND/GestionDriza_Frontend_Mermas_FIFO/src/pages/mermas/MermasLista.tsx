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

import '../../styles/mermas.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Filtros = {
  q: string;
  fecha_desde: string;
  fecha_hasta: string;
};


const filtrosVacios: Filtros = {
  q: '',
  fecha_desde: '',
  fecha_hasta: ''
};


function MermasLista() {
  const [
    mermas,
    setMermas
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
    filtros,
    setFiltros
  ] = useState<Filtros>({
    ...filtrosVacios
  });

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<Filtros>({
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


  const cargarMermas =
    useCallback(
      async (
        pagina: number,
        filtrosConsulta: Filtros
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

        if (
          filtrosConsulta.q.trim()
        ) {
          params.set(
            'q',
            filtrosConsulta.q.trim()
          );
        }

        if (
          filtrosConsulta.fecha_desde
        ) {
          params.set(
            'fecha_desde',
            filtrosConsulta.fecha_desde
          );
        }

        if (
          filtrosConsulta.fecha_hasta
        ) {
          params.set(
            'fecha_hasta',
            filtrosConsulta.fecha_hasta
          );
        }

        const data =
          await apiFetch(
            `/mermas?${params.toString()}`
          );

        setMermas(
          data.mermas || []
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
          await cargarMermas(
            page,
            filtrosAplicados
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
    filtrosAplicados,
    cargarMermas
  ]);


  const aplicarFiltros = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPage(1);

    setFiltrosAplicados({
      q:
        filtros.q.trim(),
      fecha_desde:
        filtros.fecha_desde,
      fecha_hasta:
        filtros.fecha_hasta
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


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


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


  return (
    <div className="pedidos-page merma-page">

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


      <div className="pedidos-header merma-header">
        <div>
          <h1>
            Mermas de materia prima
          </h1>

          <p>
            Consulta las pérdidas registradas
            y su impacto en el almacén.
          </p>
        </div>

        <Link
          to="/gestion/mermas/registrar"
          className="btn-primary-link"
        >
          + Registrar merma
        </Link>
      </div>


      <form
        className="merma-filtros"
        onSubmit={
          aplicarFiltros
        }
      >

        <div className="merma-filtro-busqueda">
          <label>
            Buscar
          </label>

          <input
            value={filtros.q}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                q:
                  e.target.value
              })
            }
            placeholder="Material, color u observación..."
          />
        </div>


        <div>
          <label>
            Desde
          </label>

          <input
            type="date"
            value={
              filtros.fecha_desde
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                fecha_desde:
                  e.target.value
              })
            }
          />
        </div>


        <div>
          <label>
            Hasta
          </label>

          <input
            type="date"
            value={
              filtros.fecha_hasta
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                fecha_hasta:
                  e.target.value
              })
            }
          />
        </div>


        <button type="submit">
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

      </form>


      <div className="tabla-card">

        <div className="merma-tabla-header">
          <div>
            <h3>
              Historial de mermas
            </h3>

            <p>
              Cada registro conserva la trazabilidad
              de los lotes afectados.
            </p>
          </div>

          <span className="muted">
            {
              paginacion.total
            } registro(s)
          </span>
        </div>


        {
          cargando
            ? (
              <p>
                Cargando mermas...
              </p>
            )
            : (
              <>
                <div className="tabla-scroll">

                  <table>
                    <thead>
                      <tr>
                        <th>
                          Fecha
                        </th>
                        <th>
                          Materias primas
                        </th>
                        <th>
                          Total
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
                        mermas.map(
                          (merma) => (
                            <tr
                              key={
                                merma.merma_id
                              }
                            >
                              <td>
                                <strong>
                                  {
                                    fechaTexto(
                                      merma.fecha_merma
                                    )
                                  }
                                </strong>
                              </td>

                              <td>
                                {
                                  merma
                                    .cantidad_items
                                }
                              </td>

                              <td>
                                <strong className="merma-cantidad">
                                  {
                                    cantidad(
                                      merma
                                        .total_merma_kg
                                    )
                                  } KG
                                </strong>
                              </td>

                              <td>
                                {
                                  merma
                                    .observacion ||
                                  '-'
                                }
                              </td>

                              <td>
                                {
                                  merma
                                    .registrado_por
                                }
                              </td>

                              <td>
                                <Link
                                  className="btn-outline"
                                  to={
                                    `/gestion/mermas/${merma.merma_id}`
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
                        mermas.length === 0 &&
                        (
                          <tr>
                            <td colSpan={6}>
                              No hay mermas registradas
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


export default MermasLista;
