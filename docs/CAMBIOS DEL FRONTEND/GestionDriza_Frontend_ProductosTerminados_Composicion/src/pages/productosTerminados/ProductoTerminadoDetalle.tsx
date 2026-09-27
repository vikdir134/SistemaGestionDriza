import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import type {
  ChangeEvent,
  FormEvent
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

import ConfirmDialog
  from '../../components/common/ConfirmDialog';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import '../../styles/productosTerminados.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type ComponenteForm = {
  material_id: string;
  color_id: string;
  porcentaje: string;
};


const componenteVacio:
  ComponenteForm = {
  material_id: '',
  color_id: '',
  porcentaje: ''
};


function ProductoTerminadoDetalle() {
  const {
    producto_id
  } = useParams();

  const [
    producto,
    setProducto
  ] = useState<any | null>(
    null
  );

  const [
    composiciones,
    setComposiciones
  ] = useState<any[]>([]);

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
    pageHistorial,
    setPageHistorial
  ] = useState(1);

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    editorAbierto,
    setEditorAbierto
  ] = useState(false);

  const [
    observacion,
    setObservacion
  ] = useState('');

  const [
    componentes,
    setComponentes
  ] = useState<
    ComponenteForm[]
  >([
    {
      ...componenteVacio
    }
  ]);

  const [
    confirmarPublicacion,
    setConfirmarPublicacion
  ] = useState(false);

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


  const cargarProducto =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/productos-terminados/${producto_id}`
          );

        setProducto(
          data.producto
        );
      },
      [
        producto_id
      ]
    );


  const cargarHistorial =
    useCallback(
      async (
        pagina: number
      ) => {
        const data =
          await apiFetch(
            `/productos-terminados/${producto_id}/composiciones?page=${pagina}&limit=10`
          );

        setComposiciones(
          data.composiciones ||
          []
        );

        setPaginacion(
          data.paginacion
        );
      },
      [
        producto_id
      ]
    );


  const cargarCatalogos =
    useCallback(
      async () => {
        const [
          materialesData,
          coloresData
        ] = await Promise.all([
          apiFetch(
            '/catalogos/materiales'
          ),
          apiFetch(
            '/catalogos/colores'
          )
        ]);

        setMateriales(
          materialesData.items ||
          []
        );

        setColores(
          coloresData.items ||
          []
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
            cargarProducto(),
            cargarHistorial(1),
            cargarCatalogos()
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
    cargarProducto,
    cargarHistorial,
    cargarCatalogos
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarHistorial(
      pageHistorial
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    pageHistorial,
    cargarHistorial,
    cargando
  ]);


  const totalPorcentaje =
    useMemo(
      () =>
        Number(
          componentes
            .reduce(
              (
                total,
                componente
              ) =>
                total +
                Number(
                  componente
                    .porcentaje ||
                  0
                ),
              0
            )
            .toFixed(6)
        ),
      [
        componentes
      ]
    );


  const actualizarComponente = (
    index: number,
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {
    if (procesando) {
      return;
    }

    const nuevos = [
      ...componentes
    ];

    nuevos[index] = {
      ...nuevos[index],
      [e.target.name]:
        e.target.value
    };

    setComponentes(
      nuevos
    );
  };


  const agregarComponente = () => {
    if (procesando) {
      return;
    }

    setComponentes([
      ...componentes,
      {
        ...componenteVacio
      }
    ]);
  };


  const quitarComponente = (
    index: number
  ) => {
    if (procesando) {
      return;
    }

    if (
      componentes.length === 1
    ) {
      setFeedback({
        tipo: 'warning',
        mensaje:
          'La composición debe tener al menos una materia prima'
      });

      return;
    }

    setComponentes(
      componentes.filter(
        (_, i) =>
          i !== index
      )
    );
  };


  const abrirEditor = () => {
    setObservacion('');

    setComponentes([
      {
        ...componenteVacio
      }
    ]);

    setEditorAbierto(true);
  };


  const cerrarEditor = () => {
    if (procesando) {
      return;
    }

    setEditorAbierto(false);

    setConfirmarPublicacion(
      false
    );
  };


  const validarComposicion = () => {
    const usados =
      new Set<string>();

    for (
      let i = 0;
      i < componentes.length;
      i++
    ) {
      const componente =
        componentes[i];

      if (
        !componente.material_id
      ) {
        return (
          `La materia prima ${i + 1} debe tener material`
        );
      }

      if (
        !componente.color_id
      ) {
        return (
          `La materia prima ${i + 1} debe tener color`
        );
      }

      const porcentaje =
        Number(
          componente.porcentaje
        );

      if (
        !Number.isFinite(
          porcentaje
        ) ||
        porcentaje <= 0 ||
        porcentaje > 100
      ) {
        return (
          `El porcentaje de la materia prima ${i + 1} debe ser mayor a 0 y menor o igual a 100`
        );
      }

      const clave =
        `${componente.material_id}-${componente.color_id}`;

      if (
        usados.has(
          clave
        )
      ) {
        return (
          `La materia prima ${i + 1} repite el mismo material y color`
        );
      }

      usados.add(
        clave
      );
    }

    if (
      Math.abs(
        totalPorcentaje -
        100
      ) > 0.000001
    ) {
      return (
        `La composición debe sumar 100%. Actualmente suma ${totalPorcentaje}%`
      );
    }

    return null;
  };


  const solicitarPublicacion = (
    e: FormEvent
  ) => {
    e.preventDefault();

    const error =
      validarComposicion();

    if (error) {
      setFeedback({
        tipo: 'error',
        mensaje: error
      });

      return;
    }

    setConfirmarPublicacion(
      true
    );
  };


  const publicarComposicion =
    async () => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        const data =
          await apiFetch(
            `/productos-terminados/${producto_id}/composiciones`,
            {
              method: 'POST',
              body:
                JSON.stringify({
                  observacion:
                    observacion
                      .trim() ||
                    null,

                  detalles:
                    componentes.map(
                      (componente) => ({
                        material_id:
                          Number(
                            componente
                              .material_id
                          ),

                        color_id:
                          Number(
                            componente
                              .color_id
                          ),

                        porcentaje:
                          Number(
                            componente
                              .porcentaje
                          )
                      })
                    )
                })
            }
          );

        setConfirmarPublicacion(
          false
        );

        setEditorAbierto(
          false
        );

        setFeedback({
          tipo: 'success',
          mensaje:
            `Composición versión ${data.composicion.version_numero} publicada correctamente`
        });

        await Promise.all([
          cargarProducto(),
          cargarHistorial(1)
        ]);

        setPageHistorial(1);

        liberar();

      } catch (error: any) {
        liberar();

        setConfirmarPublicacion(
          false
        );

        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };


  const fechaTexto = (
    valor: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return new Date(
      valor
    ).toLocaleString();
  };


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando producto...
        </p>
      </div>
    );
  }


  if (!producto) {
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
          to="/gestion/productos-terminados"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar el producto.
        </div>

      </div>
    );
  }


  const composicionActual =
    producto
      .composicion_vigente;


  return (
    <div className="pedidos-page productos-terminados-page">

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
        abierto={
          confirmarPublicacion
        }
        titulo={
          composicionActual
            ? 'Publicar nueva versión'
            : 'Publicar composición'
        }
        descripcion={
          composicionActual
            ? 'La composición actual pasará al historial y esta nueva receta será utilizada en las próximas producciones. ¿Deseas continuar?'
            : 'Esta receta quedará como la composición vigente del producto. ¿Deseas continuar?'
        }
        textoConfirmar="Publicar"
        textoProcesando="Publicando..."
        procesando={procesando}
        onConfirmar={
          publicarComposicion
        }
        onCerrar={() =>
          !procesando &&
          setConfirmarPublicacion(
            false
          )
        }
      />


      <Link
        to="/gestion/productos-terminados"
        className="btn-volver"
      >
        ← Volver a productos terminados
      </Link>


      <div className="pedidos-header pt-detalle-header">

        <div>
          <h1>
            {
              producto.tipo_producto
            }
            {' · '}
            {
              producto.material
            }
            {' · '}
            {
              producto.medida
            }
            {' · '}
            {
              producto.color
            }
          </h1>

          <p>
            Producto terminado y composición
            de materia prima.
          </p>
        </div>


        {!editorAbierto && (
          <button
            type="button"
            onClick={abrirEditor}
          >
            {
              composicionActual
                ? 'Nueva versión de composición'
                : 'Definir composición'
            }
          </button>
        )}

      </div>


      <div className="pt-identidad">

        <div>
          <span>
            Tipo
          </span>

          <strong>
            {
              producto.tipo_producto
            }
          </strong>
        </div>

        <div>
          <span>
            Material
          </span>

          <strong>
            {
              producto.material
            }
          </strong>
        </div>

        <div>
          <span>
            Medida
          </span>

          <strong>
            {
              producto.medida
            }
          </strong>
        </div>

        <div>
          <span>
            Color
          </span>

          <strong>
            {
              producto.color
            }
          </strong>
        </div>

      </div>


      {
        composicionActual
          ? (
            <div className="pt-composicion-card">

              <div className="pt-composicion-card-header">
                <div>
                  <span className="pt-badge pt-badge-ok">
                    Composición vigente
                  </span>

                  <h3>
                    Versión {
                      composicionActual
                        .version_numero
                    }
                  </h3>

                  <p>
                    Vigente desde {
                      fechaTexto(
                        composicionActual
                          .fecha_vigencia_desde
                      )
                    }
                  </p>
                </div>

                <strong className="pt-total-100">
                  100%
                </strong>
              </div>


              <div className="pt-composicion-componentes">

                {
                  composicionActual
                    .detalles
                    .map(
                      (
                        componente: any
                      ) => (
                        <div
                          className="pt-componente-vigente"
                          key={
                            componente
                              .producto_composicion_detalle_id
                          }
                        >
                          <div className="pt-componente-linea">
                            <div>
                              <strong>
                                {
                                  componente.material
                                }
                              </strong>

                              <span>
                                {
                                  componente.color
                                }
                              </span>
                            </div>

                            <strong>
                              {
                                Number(
                                  componente.porcentaje
                                )
                                  .toFixed(2)
                              }%
                            </strong>
                          </div>

                          <div className="pt-barra">
                            <div
                              className="pt-barra-progreso"
                              style={{
                                width:
                                  `${Math.min(
                                    100,
                                    Number(
                                      componente
                                        .porcentaje
                                    )
                                  )}%`
                              }}
                            />
                          </div>
                        </div>
                      )
                    )
                }

              </div>


              {
                composicionActual
                  .observacion &&
                (
                  <div className="pt-observacion">
                    {
                      composicionActual
                        .observacion
                    }
                  </div>
                )
              }

            </div>
          )
          : (
            <div className="pt-sin-composicion">

              <div className="pt-sin-composicion-icono">
                %
              </div>

              <div>
                <h3>
                  Composición pendiente
                </h3>

                <p>
                  Este producto todavía no tiene
                  definida la materia prima que consume.
                  Debes configurarla antes de registrar producción.
                </p>
              </div>

            </div>
          )
      }


      {
        editorAbierto &&
        (
          <form
            className="pt-editor-composicion"
            onSubmit={
              solicitarPublicacion
            }
          >

            <div className="pt-editor-header">

              <div>
                <h3>
                  {
                    composicionActual
                      ? 'Nueva versión de composición'
                      : 'Definir composición'
                  }
                </h3>

                <p>
                  Indica qué materias primas
                  forman el producto. El total debe ser 100%.
                </p>
              </div>


              <div
                className={
                  Math.abs(
                    totalPorcentaje -
                    100
                  ) <= 0.000001
                    ? 'pt-suma pt-suma-ok'
                    : 'pt-suma'
                }
              >
                <span>
                  Total
                </span>

                <strong>
                  {
                    totalPorcentaje
                  }%
                </strong>
              </div>

            </div>


            <div className="pt-componentes-editor">

              {
                componentes.map(
                  (
                    componente,
                    index
                  ) => (
                    <div
                      className="pt-componente-editor"
                      key={index}
                    >

                      <div className="pt-componente-numero">
                        Materia prima {
                          index + 1
                        }
                      </div>


                      <div className="pt-componente-campos">

                        <div>
                          <label>
                            Material
                          </label>

                          <select
                            name="material_id"
                            value={
                              componente
                                .material_id
                            }
                            onChange={(e) =>
                              actualizarComponente(
                                index,
                                e
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
                            name="color_id"
                            value={
                              componente
                                .color_id
                            }
                            onChange={(e) =>
                              actualizarComponente(
                                index,
                                e
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
                              colores.map(
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
                            Porcentaje
                          </label>

                          <div className="pt-porcentaje-input">
                            <input
                              type="number"
                              name="porcentaje"
                              value={
                                componente
                                  .porcentaje
                              }
                              onChange={(e) =>
                                actualizarComponente(
                                  index,
                                  e
                                )
                              }
                              min="0.000001"
                              max="100"
                              step="0.000001"
                              placeholder="0"
                              disabled={
                                procesando
                              }
                            />

                            <span>
                              %
                            </span>
                          </div>
                        </div>


                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() =>
                            quitarComponente(
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

                    </div>
                  )
                )
              }

            </div>


            <button
              type="button"
              className="pt-agregar-componente"
              onClick={
                agregarComponente
              }
              disabled={
                procesando
              }
            >
              + Agregar materia prima
            </button>


            <div className="pt-observacion-editor">
              <label>
                Observación de esta versión
              </label>

              <textarea
                value={observacion}
                onChange={(e) =>
                  setObservacion(
                    e.target.value
                  )
                }
                rows={3}
                placeholder="Ejemplo: Ajuste de fórmula por cambio de producción"
                disabled={
                  procesando
                }
              />
            </div>


            <div className="pt-editor-actions">

              <button
                type="button"
                className="btn-secondary"
                onClick={
                  cerrarEditor
                }
                disabled={
                  procesando
                }
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={
                  procesando
                }
              >
                Revisar y publicar
              </button>

            </div>

          </form>
        )
      }


      <div className="tabla-card pt-historial">

        <div className="pt-tabla-cabecera">
          <div>
            <h3>
              Historial de composiciones
            </h3>

            <p>
              Las versiones anteriores se conservan
              para mantener la trazabilidad de producción.
            </p>
          </div>
        </div>


        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>
                  Versión
                </th>
                <th>
                  Estado
                </th>
                <th>
                  Vigente desde
                </th>
                <th>
                  Vigente hasta
                </th>
                <th>
                  Materias primas
                </th>
                <th>
                  Observación
                </th>
              </tr>
            </thead>

            <tbody>
              {
                composiciones.map(
                  (composicion) => (
                    <tr
                      key={
                        composicion
                          .producto_composicion_id
                      }
                    >
                      <td>
                        <strong>
                          V{
                            composicion
                              .version_numero
                          }
                        </strong>
                      </td>

                      <td>
                        <span
                          className={
                            composicion.vigente
                              ? 'pt-badge pt-badge-ok'
                              : 'pt-badge pt-badge-historico'
                          }
                        >
                          {
                            composicion.vigente
                              ? 'Vigente'
                              : 'Histórica'
                          }
                        </span>
                      </td>

                      <td>
                        {
                          fechaTexto(
                            composicion
                              .fecha_vigencia_desde
                          )
                        }
                      </td>

                      <td>
                        {
                          fechaTexto(
                            composicion
                              .fecha_vigencia_hasta
                          )
                        }
                      </td>

                      <td>
                        {
                          composicion
                            .cantidad_componentes
                        }
                      </td>

                      <td>
                        {
                          composicion
                            .observacion ||
                          '-'
                        }
                      </td>
                    </tr>
                  )
                )
              }

              {
                composiciones.length === 0 &&
                (
                  <tr>
                    <td colSpan={6}>
                      Este producto todavía no
                      tiene historial de composiciones.
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
              pageHistorial <= 1
            }
            onClick={() =>
              setPageHistorial(
                pageHistorial - 1
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
              pageHistorial >=
              paginacion
                .totalPaginas
            }
            onClick={() =>
              setPageHistorial(
                pageHistorial + 1
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


export default ProductoTerminadoDetalle;
