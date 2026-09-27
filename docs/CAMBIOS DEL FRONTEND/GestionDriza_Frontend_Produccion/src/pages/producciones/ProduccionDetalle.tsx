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

import '../../styles/producciones.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function ProduccionDetalle() {
  const {
    produccion_id
  } = useParams();

  const [
    produccion,
    setProduccion
  ] = useState<any | null>(
    null
  );

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
              `/producciones/${produccion_id}`
            );

          setProduccion(
            data.produccion
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
    produccion_id
  ]);


  const totalProducido =
    useMemo(
      () =>
        (
          produccion?.detalles ||
          []
        ).reduce(
          (
            total: number,
            detalle: any
          ) =>
            total +
            Number(
              detalle
                .cantidad_producida ||
              0
            ),
          0
        ),
      [
        produccion
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
          Cargando producción...
        </p>
      </div>
    );
  }


  if (!produccion) {
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
          to="/gestion/producciones"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar la producción.
        </div>

      </div>
    );
  }


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


      <Link
        to="/gestion/producciones"
        className="btn-volver"
      >
        ← Volver a producción
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            Producción #{
              produccion.produccion_id
            }
          </h1>

          <p>
            Detalle de productos fabricados
            y materia prima consumida por FIFO.
          </p>
        </div>
      </div>


      <div className="prod-detalle-kpis">

        <div>
          <span>
            Fecha
          </span>

          <strong>
            {
              fechaTexto(
                produccion
                  .fecha_produccion
              )
            }
          </strong>
        </div>


        <div>
          <span>
            Productos
          </span>

          <strong>
            {
              produccion
                .detalles
                .length
            }
          </strong>
        </div>


        <div>
          <span>
            Total producido
          </span>

          <strong>
            {
              totalProducido
                .toFixed(3)
            } KG
          </strong>
        </div>


        <div>
          <span>
            Registrado por
          </span>

          <strong>
            {
              produccion
                .registrado_por
            }
          </strong>
        </div>

      </div>


      {
        produccion.observacion &&
        (
          <div className="prod-observacion-general">
            {
              produccion.observacion
            }
          </div>
        )
      }


      <div className="prod-detalles-lista">

        {
          produccion
            .detalles
            .map(
              (
                item: any,
                index: number
              ) => (
                <article
                  className="prod-detalle-card"
                  key={
                    item
                      .produccion_detalle_id
                  }
                >

                  <div className="prod-detalle-card-header">

                    <div>
                      <span className="prod-detalle-numero">
                        Producto {
                          index + 1
                        }
                      </span>

                      <h3>
                        {
                          item.tipo_producto
                        }
                        {' · '}
                        {
                          item.material
                        }
                        {' · '}
                        {
                          item.medida
                        }
                        {' · '}
                        {
                          item.color
                        }
                      </h3>
                    </div>


                    <span className="prod-version-badge">
                      Composición V{
                        item
                          .composicion_version
                      }
                    </span>

                  </div>


                  <div className="prod-detalle-resumen">

                    <div>
                      <span>
                        Producido
                      </span>

                      <strong>
                        {
                          cantidad(
                            item
                              .cantidad_producida
                          )
                        } {
                          item.unidad
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Presentación
                      </span>

                      <strong>
                        {
                          cantidad(
                            item
                              .cantidad_presentacion
                          )
                        } {
                          item
                            .unidad_presentacion
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Presentaciones
                      </span>

                      <strong>
                        {
                          (
                            Number(
                              item
                                .cantidad_producida
                            ) /
                            Number(
                              item
                                .cantidad_presentacion
                            )
                          )
                            .toFixed(2)
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Stock PT después
                      </span>

                      <strong className="prod-stock-positivo">
                        {
                          item
                            .ingreso_producto_terminado
                            ? cantidad(
                                item
                                  .ingreso_producto_terminado
                                  .stock_actual
                              )
                            : '0.000'
                        } {
                          item.unidad
                        }
                      </strong>
                    </div>

                  </div>


                  {
                    item.observacion &&
                    (
                      <div className="prod-item-observacion">
                        {
                          item.observacion
                        }
                      </div>
                    )
                  }


                  <details className="prod-fifo-details">

                    <summary>
                      Ver consumo FIFO de materia prima
                    </summary>


                    <div className="prod-fifo-contenido">

                      <div className="prod-fifo-titulo">
                        <h4>
                          Lotes utilizados
                        </h4>

                        <span>
                          {
                            item
                              .consumos_materia_prima
                              .length
                          } movimiento(s)
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
                                Fecha compra
                              </th>
                              <th>
                                Material
                              </th>
                              <th>
                                Color
                              </th>
                              <th>
                                Consumido
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {
                              item
                                .consumos_materia_prima
                                .map(
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
                                        <strong className="prod-consumo-negativo">
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
                              item
                                .consumos_materia_prima
                                .length ===
                                0 &&
                              (
                                <tr>
                                  <td colSpan={5}>
                                    No se encontraron movimientos FIFO.
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


export default ProduccionDetalle;
