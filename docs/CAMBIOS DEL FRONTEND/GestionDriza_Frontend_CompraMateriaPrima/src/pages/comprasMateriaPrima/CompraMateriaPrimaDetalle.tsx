import {
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

import '../../styles/comprasMateriaPrima.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function CompraMateriaPrimaDetalle() {
  const {
    compra_materia_prima_id
  } = useParams();

  const [
    compra,
    setCompra
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
              `/compras-materia-prima/${compra_materia_prima_id}`
            );

          setCompra(
            data.compra
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
    compra_materia_prima_id
  ]);


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando detalle del lote...
        </p>
      </div>
    );
  }


  if (!compra) {
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
          to="/gestion/compras-materia-prima"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar la compra.
        </div>
      </div>
    );
  }


  const comprado =
    compra.detalles.reduce(
      (
        total: number,
        item: any
      ) =>
        total +
        Number(
          item.cantidad ||
          0
        ),
      0
    );

  const disponible =
    compra.detalles.reduce(
      (
        total: number,
        item: any
      ) =>
        total +
        Number(
          item
            .cantidad_disponible ||
          0
        ),
      0
    );


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


      <Link
        to="/gestion/compras-materia-prima"
        className="btn-volver"
      >
        ← Volver a compras de materia prima
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            {compra.nombre_lote}
          </h1>

          <p>
            Detalle de la compra y saldo actual
            de cada materia prima del lote.
          </p>
        </div>
      </div>


      <div className="compra-mp-resumen">

        <div>
          <span>
            Proveedor
          </span>

          <strong>
            {
              compra.razon_social
            }
          </strong>

          <small>
            RUC {compra.ruc}
          </small>
        </div>


        <div>
          <span>
            Fecha
          </span>

          <strong>
            {
              compra
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
              compra
                .numero_documento ||
              '-'
            }
          </strong>
        </div>


        <div>
          <span>
            Comprado
          </span>

          <strong>
            {
              comprado.toFixed(3)
            } KG
          </strong>
        </div>


        <div>
          <span>
            Disponible
          </span>

          <strong>
            {
              disponible.toFixed(3)
            } KG
          </strong>
        </div>


        <div>
          <span>
            Total
          </span>

          <strong>
            {
              compra.moneda_codigo ===
                'USD'
                ? '$'
                : 'S/'
            }
            {' '}
            {
              Number(
                compra.monto_total
              )
                .toFixed(2)
            }
            {' '}
            {
              compra.moneda_codigo
            }
          </strong>
        </div>

      </div>


      {compra.descripcion && (
        <div className="form-card">
          <h3>
            Descripción
          </h3>

          <p>
            {compra.descripcion}
          </p>
        </div>
      )}


      <div className="tabla-card">

        <h3>
          Materias primas del lote
        </h3>

        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Color</th>
                <th>Descripción</th>
                <th>Comprado</th>
                <th>Disponible</th>
                <th>Consumido</th>
                <th>Precio unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {compra.detalles.map(
                (item: any) => {
                  const consumido =
                    Number(
                      item.cantidad_inicial ||
                      0
                    ) -
                    Number(
                      item
                        .cantidad_disponible ||
                      0
                    );

                  return (
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
                          item
                            .descripcion_item ||
                          '-'
                        }
                      </td>

                      <td>
                        {
                          Number(
                            item
                              .cantidad_inicial
                          )
                            .toFixed(3)
                        } KG
                      </td>

                      <td>
                        <strong>
                          {
                            Number(
                              item
                                .cantidad_disponible
                            )
                              .toFixed(3)
                          } KG
                        </strong>
                      </td>

                      <td>
                        {
                          consumido.toFixed(
                            3
                          )
                        } KG
                      </td>

                      <td>
                        {
                          Number(
                            item
                              .precio_unitario
                          )
                            .toFixed(4)
                        }
                        {' '}
                        {
                          compra
                            .moneda_codigo
                        }
                      </td>

                      <td>
                        {
                          Number(
                            item.subtotal
                          )
                            .toFixed(2)
                        }
                        {' '}
                        {
                          compra
                            .moneda_codigo
                        }
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>

      </div>


      <div className="form-card">
        <div className="compra-mp-meta">
          <span>
            Registrado por:
            {' '}
            <strong>
              {
                compra
                  .registrado_por
              }
            </strong>
          </span>

          <span>
            Registro:
            {' '}
            {
              compra.created_at
                ? new Date(
                    compra.created_at
                  )
                    .toLocaleString()
                : '-'
            }
          </span>
        </div>
      </div>

    </div>
  );
}


export default CompraMateriaPrimaDetalle;
