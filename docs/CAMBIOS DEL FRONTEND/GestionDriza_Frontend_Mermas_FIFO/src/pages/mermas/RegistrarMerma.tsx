import {
  useEffect,
  useMemo,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import ConfirmDialog
  from '../../components/common/ConfirmDialog';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import '../../styles/mermas.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Disponibilidad = {
  material_id: number;
  material: string;
  color_id: number;
  color: string;
  unidad_medida_id: number;
  unidad: string;
  cantidad_disponible: number;
};


type DetalleMerma = {
  local_id: string;
  material_id: string;
  color_id: string;
  cantidad: string;
  observacion: string;
};


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
    'merma',
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join('-');
};


const nuevoLocalId = () => {
  if (
    typeof crypto !==
      'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join('-');
};


const crearDetalle =
  (): DetalleMerma => ({
    local_id:
      nuevoLocalId(),
    material_id: '',
    color_id: '',
    cantidad: '',
    observacion: ''
  });


function RegistrarMerma() {
  const navigate =
    useNavigate();

  const [
    fechaMerma,
    setFechaMerma
  ] = useState(
    fechaLocalActual()
  );

  const [
    observacion,
    setObservacion
  ] = useState('');

  const [
    disponibilidad,
    setDisponibilidad
  ] = useState<
    Disponibilidad[]
  >([]);

  const [
    detalles,
    setDetalles
  ] = useState<
    DetalleMerma[]
  >([
    crearDetalle()
  ]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    confirmando,
    setConfirmando
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
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const cargarDisponibilidad =
    async () => {
      const data =
        await apiFetch(
          '/mermas/disponibilidad'
        );

      setDisponibilidad(
        (data.items || [])
          .map(
            (item: any) => ({
              ...item,
              cantidad_disponible:
                Number(
                  item
                    .cantidad_disponible ||
                  0
                )
            })
          )
      );
    };


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);

        try {
          await cargarDisponibilidad();

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
  }, []);


  const materiales =
    useMemo(
      () => {
        const mapa =
          new Map<
            number,
            string
          >();

        disponibilidad
          .forEach(
            (item) => {
              mapa.set(
                Number(
                  item.material_id
                ),
                item.material
              );
            }
          );

        return Array.from(
          mapa.entries()
        ).map(
          ([
            id,
            nombre
          ]) => ({
            id,
            nombre
          })
        );
      },
      [
        disponibilidad
      ]
    );


  const coloresParaMaterial = (
    materialId: string
  ) => {
    if (!materialId) {
      return [];
    }

    return disponibilidad
      .filter(
        (item) =>
          Number(
            item.material_id
          ) ===
          Number(
            materialId
          )
      )
      .map(
        (item) => ({
          id:
            Number(
              item.color_id
            ),
          nombre:
            item.color
        })
      );
  };


  const disponibilidadDetalle = (
    detalle: DetalleMerma
  ) => {
    if (
      !detalle.material_id ||
      !detalle.color_id
    ) {
      return null;
    }

    return disponibilidad.find(
      (item) =>
        Number(
          item.material_id
        ) ===
          Number(
            detalle.material_id
          ) &&
        Number(
          item.color_id
        ) ===
          Number(
            detalle.color_id
          )
    ) || null;
  };


  const actualizarDetalle = (
    index: number,
    cambios:
      Partial<
        DetalleMerma
      >
  ) => {
    setDetalles(
      (actuales) =>
        actuales.map(
          (
            detalle,
            i
          ) =>
            i === index
              ? {
                  ...detalle,
                  ...cambios
                }
              : detalle
        )
    );
  };


  const agregarDetalle = () => {
    if (procesando) {
      return;
    }

    setDetalles([
      ...detalles,
      crearDetalle()
    ]);
  };


  const quitarDetalle = (
    index: number
  ) => {
    if (procesando) {
      return;
    }

    if (
      detalles.length === 1
    ) {
      setFeedback({
        tipo: 'warning',
        mensaje:
          'La merma debe tener al menos una materia prima'
      });

      return;
    }

    setDetalles(
      detalles.filter(
        (_, i) =>
          i !== index
      )
    );
  };


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  const totalMerma =
    useMemo(
      () =>
        detalles.reduce(
          (
            total,
            detalle
          ) =>
            total +
            Number(
              detalle.cantidad ||
              0
            ),
          0
        ),
      [
        detalles
      ]
    );


  const validar = () => {
    if (!fechaMerma) {
      return (
        'La fecha de merma es obligatoria'
      );
    }

    if (
      disponibilidad.length === 0
    ) {
      return (
        'No hay materia prima disponible para registrar una merma'
      );
    }

    const combinaciones =
      new Set<string>();

    for (
      let i = 0;
      i < detalles.length;
      i++
    ) {
      const detalle =
        detalles[i];

      if (
        !detalle.material_id ||
        !detalle.color_id
      ) {
        return (
          `Completa el material y color del producto ${i + 1}`
        );
      }

      const stock =
        disponibilidadDetalle(
          detalle
        );

      if (!stock) {
        return (
          `La materia prima del producto ${i + 1} no tiene stock disponible`
        );
      }

      const key =
        `${detalle.material_id}:${detalle.color_id}`;

      if (
        combinaciones.has(
          key
        )
      ) {
        return (
          'No se puede repetir la misma materia prima en una sola merma'
        );
      }

      combinaciones.add(
        key
      );

      const valor =
        Number(
          detalle.cantidad
        );

      if (
        !Number.isFinite(
          valor
        ) ||
        valor <= 0
      ) {
        return (
          `La cantidad del producto ${i + 1} debe ser mayor a 0`
        );
      }

      if (
        valor >
        Number(
          stock
            .cantidad_disponible
        ) +
        0.000001
      ) {
        return (
          `La cantidad del producto ${i + 1} supera el stock disponible`
        );
      }
    }

    return null;
  };


  const solicitarRegistro = (
    e: FormEvent
  ) => {
    e.preventDefault();

    const error =
      validar();

    if (error) {
      setFeedback({
        tipo: 'error',
        mensaje: error
      });

      return;
    }

    setConfirmando(
      true
    );
  };


  const registrar = async () => {
    if (
      !intentarBloquear()
    ) {
      return;
    }

    try {
      const data =
        await apiFetch(
          '/mermas',
          {
            method: 'POST',

            headers: {
              'Idempotency-Key':
                idempotencyKey
            },

            body:
              JSON.stringify({
                fecha_merma:
                  fechaMerma,

                observacion:
                  observacion
                    .trim() ||
                  null,

                detalles:
                  detalles.map(
                    (detalle) => ({
                      material_id:
                        Number(
                          detalle
                            .material_id
                        ),

                      color_id:
                        Number(
                          detalle
                            .color_id
                        ),

                      cantidad:
                        Number(
                          detalle
                            .cantidad
                        ),

                      observacion:
                        detalle
                          .observacion
                          .trim() ||
                        null
                    })
                  )
              })
          }
        );

      setConfirmando(
        false
      );

      setFeedback({
        tipo: 'success',
        mensaje:
          data.reutilizada
            ? 'La merma ya había sido registrada. Se recuperó el resultado existente sin descontar stock nuevamente.'
            : 'Merma registrada correctamente.'
      });

      setIdempotencyKey(
        nuevaKey()
      );

      setTimeout(() => {
        navigate(
          `/gestion/mermas/${data.merma.merma_id}`
        );
      }, 700);

    } catch (error: any) {
      liberar();

      setConfirmando(
        false
      );

      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
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


      <ConfirmDialog
        abierto={confirmando}
        titulo="Registrar merma"
        descripcion={
          `Se descontarán ${cantidad(totalMerma)} KG de materia prima del almacén. El sistema utilizará automáticamente el stock disponible más antiguo. ¿Deseas continuar?`
        }
        textoConfirmar="Registrar merma"
        textoProcesando="Registrando..."
        procesando={procesando}
        onConfirmar={registrar}
        onCerrar={() =>
          !procesando &&
          setConfirmando(
            false
          )
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
            Registrar merma
          </h1>

          <p>
            Registra la materia prima perdida
            y la cantidad afectada.
          </p>
        </div>
      </div>


      <form
        className="merma-form"
        onSubmit={
          solicitarRegistro
        }
      >

        <section className="merma-seccion">

          <div className="merma-seccion-header">
            <div>
              <h3>
                Datos de la merma
              </h3>

              <p>
                Información general del registro.
              </p>
            </div>
          </div>


          <div className="merma-cabecera-grid">

            <div>
              <label>
                Fecha
              </label>

              <input
                type="date"
                value={fechaMerma}
                onChange={(e) =>
                  setFechaMerma(
                    e.target.value
                  )
                }
                disabled={
                  procesando
                }
              />
            </div>


            <div>
              <label>
                Observación general
              </label>

              <textarea
                value={
                  observacion
                }
                onChange={(e) =>
                  setObservacion(
                    e.target.value
                  )
                }
                rows={3}
                placeholder="Ejemplo: Material deteriorado durante manipulación"
                disabled={
                  procesando
                }
              />
            </div>

          </div>

        </section>


        <section className="merma-seccion">

          <div className="merma-seccion-header">
            <div>
              <h3>
                Materia prima afectada
              </h3>

              <p>
                Selecciona el material,
                color y cantidad perdida.
              </p>
            </div>

            <button
              type="button"
              onClick={
                agregarDetalle
              }
              disabled={
                procesando ||
                cargando ||
                disponibilidad.length ===
                  0
              }
            >
              + Agregar materia prima
            </button>
          </div>


          {
            cargando
              ? (
                <p>
                  Cargando stock disponible...
                </p>
              )
              : disponibilidad.length ===
                  0
                ? (
                  <div className="merma-alerta merma-alerta-warning">
                    No hay materia prima con stock disponible.
                  </div>
                )
                : (
                  <div className="merma-items">

                    {
                      detalles.map(
                        (
                          detalle,
                          index
                        ) => {
                          const stock =
                            disponibilidadDetalle(
                              detalle
                            );

                          const disponible =
                            Number(
                              stock
                                ?.cantidad_disponible ||
                              0
                            );

                          const valor =
                            Number(
                              detalle
                                .cantidad ||
                              0
                            );

                          const saldo =
                            disponible -
                            valor;

                          return (
                            <article
                              className="merma-item-card"
                              key={
                                detalle.local_id
                              }
                            >

                              <div className="merma-item-header">

                                <strong>
                                  Materia prima {
                                    index + 1
                                  }
                                </strong>

                                <button
                                  type="button"
                                  className="btn-danger"
                                  onClick={() =>
                                    quitarDetalle(
                                      index
                                    )
                                  }
                                  disabled={
                                    procesando
                                  }
                                >
                                  Quitar
                                </button>

                              </div>


                              <div className="merma-item-grid">

                                <div>
                                  <label>
                                    Material
                                  </label>

                                  <select
                                    value={
                                      detalle
                                        .material_id
                                    }
                                    onChange={(e) =>
                                      actualizarDetalle(
                                        index,
                                        {
                                          material_id:
                                            e.target.value,
                                          color_id: '',
                                          cantidad: ''
                                        }
                                      )
                                    }
                                    disabled={
                                      procesando
                                    }
                                  >
                                    <option value="">
                                      Seleccione
                                    </option>

                                    {
                                      materiales.map(
                                        (material) => (
                                          <option
                                            key={
                                              material.id
                                            }
                                            value={
                                              material.id
                                            }
                                          >
                                            {
                                              material.nombre
                                            }
                                          </option>
                                        )
                                      )
                                    }
                                  </select>
                                </div>


                                <div>
                                  <label>
                                    Color
                                  </label>

                                  <select
                                    value={
                                      detalle
                                        .color_id
                                    }
                                    onChange={(e) =>
                                      actualizarDetalle(
                                        index,
                                        {
                                          color_id:
                                            e.target.value,
                                          cantidad: ''
                                        }
                                      )
                                    }
                                    disabled={
                                      procesando ||
                                      !detalle
                                        .material_id
                                    }
                                  >
                                    <option value="">
                                      Seleccione
                                    </option>

                                    {
                                      coloresParaMaterial(
                                        detalle
                                          .material_id
                                      ).map(
                                        (color) => (
                                          <option
                                            key={
                                              color.id
                                            }
                                            value={
                                              color.id
                                            }
                                          >
                                            {
                                              color.nombre
                                            }
                                          </option>
                                        )
                                      )
                                    }
                                  </select>
                                </div>


                                <div>
                                  <label>
                                    Cantidad perdida
                                  </label>

                                  <div className="merma-input-unidad">

                                    <input
                                      type="number"
                                      min="0.001"
                                      max={
                                        disponible >
                                        0
                                          ? disponible
                                          : undefined
                                      }
                                      step="0.001"
                                      value={
                                        detalle
                                          .cantidad
                                      }
                                      onChange={(e) =>
                                        actualizarDetalle(
                                          index,
                                          {
                                            cantidad:
                                              e.target.value
                                          }
                                        )
                                      }
                                      placeholder="0.000"
                                      disabled={
                                        procesando ||
                                        !stock
                                      }
                                    />

                                    <span>
                                      KG
                                    </span>

                                  </div>
                                </div>


                                <div className="merma-item-observacion">
                                  <label>
                                    Observación
                                  </label>

                                  <input
                                    value={
                                      detalle
                                        .observacion
                                    }
                                    onChange={(e) =>
                                      actualizarDetalle(
                                        index,
                                        {
                                          observacion:
                                            e.target.value
                                        }
                                      )
                                    }
                                    placeholder="Opcional"
                                    disabled={
                                      procesando
                                    }
                                  />
                                </div>

                              </div>


                              {
                                stock &&
                                (
                                  <div className="merma-stock-resumen">

                                    <div>
                                      <span>
                                        Disponible
                                      </span>

                                      <strong>
                                        {
                                          cantidad(
                                            disponible
                                          )
                                        } KG
                                      </strong>
                                    </div>


                                    <div>
                                      <span>
                                        Merma ingresada
                                      </span>

                                      <strong className="merma-cantidad">
                                        {
                                          cantidad(
                                            valor
                                          )
                                        } KG
                                      </strong>
                                    </div>


                                    <div>
                                      <span>
                                        Saldo estimado
                                      </span>

                                      <strong
                                        className={
                                          saldo < 0
                                            ? 'merma-saldo-error'
                                            : 'merma-saldo-ok'
                                        }
                                      >
                                        {
                                          cantidad(
                                            Math.max(
                                              saldo,
                                              0
                                            )
                                          )
                                        } KG
                                      </strong>
                                    </div>

                                  </div>
                                )
                              }


                              {
                                stock &&
                                valor >
                                  disponible &&
                                (
                                  <div className="merma-alerta merma-alerta-error">
                                    La cantidad ingresada supera
                                    el stock disponible.
                                  </div>
                                )
                              }

                            </article>
                          );
                        }
                      )
                    }

                  </div>
                )
          }

        </section>


        <div className="merma-total">

          <div>
            <span>
              Total de merma
            </span>

            <small>
              {
                detalles.length
              } materia(s) prima(s)
            </small>
          </div>

          <strong>
            {
              cantidad(
                totalMerma
              )
            } KG
          </strong>

        </div>


        <div className="merma-actions">

          <Link
            to="/gestion/mermas"
            className="btn-secondary-link"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={
              procesando ||
              cargando ||
              disponibilidad.length ===
                0
            }
          >
            {
              procesando
                ? 'Registrando...'
                : 'Registrar merma'
            }
          </button>

        </div>

      </form>

    </div>
  );
}


export default RegistrarMerma;
