import {
  useEffect,
  useMemo,
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

import '../../styles/mermas.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function MermaDetalle() {
  const {
    merma_id
  } = useParams();

  const [
    merma,
    setMerma
  ] = useState<any | null>(
    null
  );

  const [
    detalles,
    setDetalles
  ] = useState<any[]>([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

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


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);

        try {
          const data =
            await apiFetch(
              `/mermas/${merma_id}`
            );

          setMerma(
            data.merma
          );

          setDetalles(
            data.detalles ||
            []
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
    merma_id
  ]);


  const total =
    useMemo(
      () =>
        detalles.reduce(
          (
            suma,
            item
          ) =>
            suma +
            Number(
              item.cantidad ||
              0
            ),
          0
        ),
      [
        detalles
      ]
    );


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


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando merma...
        </p>
      </div>
    );
  }


  if (!merma) {
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
          to="/gestion/mermas"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar la merma.
        </div>

      </div>
    );
  }


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


      <Link
        to="/gestion/mermas"
        className="btn-volver"
      >
        ← Volver a mermas
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            Detalle de merma
          </h1>

          <p>
            Materia prima descontada
            y lotes afectados.
          </p>
        </div>
      </div>


      <div className="merma-detalle-kpis">

        <div>
          <span>
            Fecha
          </span>

          <strong>
            {
              fechaTexto(
                merma.fecha_merma
              )
            }
          </strong>
        </div>


        <div>
          <span>
            Materias primas
          </span>

          <strong>
            {
              detalles.length
            }
          </strong>
        </div>


        <div>
          <span>
            Total descontado
          </span>

          <strong className="merma-cantidad">
            {
              cantidad(
                total
              )
            } KG
          </strong>
        </div>


        <div>
          <span>
            Registrado por
          </span>

          <strong>
            {
              merma.registrado_por
            }
          </strong>
        </div>

      </div>


      {
        merma.observacion &&
        (
          <div className="merma-observacion-general">
            {
              merma.observacion
            }
          </div>
        )
      }


      <div className="merma-detalles">

        {
          detalles.map(
            (
              item,
              index
            ) => (
              <article
                className="merma-detalle-card"
                key={
                  item
                    .merma_detalle_id
                }
              >

                <div className="merma-detalle-header">

                  <div>
                    <span>
                      Materia prima {
                        index + 1
                      }
                    </span>

                    <h3>
                      {
                        item.material
                      }
                      {' · '}
                      {
                        item.color
                      }
                    </h3>
                  </div>

                  <strong className="merma-cantidad">
                    -{
                      cantidad(
                        item.cantidad
                      )
                    } {
                      item.unidad
                    }
                  </strong>

                </div>


                {
                  item.observacion &&
                  (
                    <div className="merma-item-nota">
                      {
                        item.observacion
                      }
                    </div>
                  )
                }


                <details className="merma-fifo">

                  <summary>
                    Ver lotes afectados
                  </summary>


                  <div className="merma-fifo-contenido">

                    <div className="merma-fifo-header">
                      <div>
                        <h4>
                          Consumo de stock
                        </h4>

                        <p>
                          El sistema utilizó primero
                          el stock disponible más antiguo.
                        </p>
                      </div>

                      <span>
                        {
                          item
                            .consumos_fifo
                            ?.length ||
                          0
                        } lote(s)
                      </span>
                    </div>


                    <div className="tabla-scroll">

                      <table>
                        <thead>
                          <tr>
                            <th>
                              Lote
                            </th>
                            <th>
                              Fecha de compra
                            </th>
                            <th>
                              Material
                            </th>
                            <th>
                              Color
                            </th>
                            <th>
                              Descontado
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {
                            (
                              item
                                .consumos_fifo ||
                              []
                            ).map(
                              (
                                consumo: any
                              ) => (
                                <tr
                                  key={
                                    consumo
                                      .movimiento_materia_prima_id
                                  }
                                >
                                  <td>
                                    <strong>
                                      {
                                        consumo
                                          .nombre_lote
                                      }
                                    </strong>
                                  </td>

                                  <td>
                                    {
                                      fechaTexto(
                                        consumo
                                          .fecha_compra
                                      )
                                    }
                                  </td>

                                  <td>
                                    {
                                      consumo.material
                                    }
                                  </td>

                                  <td>
                                    {
                                      consumo.color
                                    }
                                  </td>

                                  <td>
                                    <strong className="merma-cantidad">
                                      -{
                                        cantidad(
                                          consumo
                                            .cantidad
                                        )
                                      } KG
                                    </strong>
                                  </td>
                                </tr>
                              )
                            )
                          }

                          {
                            (
                              item
                                .consumos_fifo ||
                              []
                            ).length ===
                              0 &&
                            (
                              <tr>
                                <td colSpan={5}>
                                  No se encontraron lotes afectados.
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>

                    </div>

                  </div>

                </details>

              </article>
            )
          )
        }

      </div>

    </div>
  );
}


export default MermaDetalle;
