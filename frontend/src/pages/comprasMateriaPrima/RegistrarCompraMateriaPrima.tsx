import {
  useEffect,
  useState
} from 'react';

import type {
  ChangeEvent,
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

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import '../../styles/comprasMateriaPrima.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type DetalleCompraMP = {
  material_id: string;
  color_id: string;
  cantidad: string;
  precio_unitario: string;
  descripcion_item: string;
};


const detalleVacio:
  DetalleCompraMP = {
  material_id: '',
  color_id: '',
  cantidad: '',
  precio_unitario: '',
  descripcion_item: ''
};


const fechaLocalActual = () => {
  const hoy = new Date();

  const anio =
    hoy.getFullYear();

  const mes =
    String(
      hoy.getMonth() + 1
    ).padStart(2, '0');

  const dia =
    String(
      hoy.getDate()
    ).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
};


const generarIdempotencyKey = () => {
  if (
    typeof crypto !==
      'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    'compra-mp',
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join('-');
};


function RegistrarCompraMateriaPrima() {
  const navigate =
    useNavigate();

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>([]);

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    cargandoCatalogos,
    setCargandoCatalogos
  ] = useState(true);

  const [
    form,
    setForm
  ] = useState({
    nombre_lote: '',
    proveedor_id: '',
    fecha_compra:
      fechaLocalActual(),
    numero_documento: '',
    /*
     * La moneda predeterminada del módulo
     * será Soles.
     */
    moneda_codigo: 'PEN',
    descripcion: ''
  });

  const [
    detalles,
    setDetalles
  ] = useState<
    DetalleCompraMP[]
  >([
    {
      ...detalleVacio
    }
  ]);

  /*
   * Esta clave permanece estable mientras
   * el usuario intenta registrar ESTA compra.
   *
   * Si se pierde la respuesta después de que
   * el backend hizo COMMIT, un reintento con
   * la misma key recuperará la compra existente
   * en lugar de duplicar el inventario.
   *
   * Solamente se genera una nueva key después
   * de un éxito confirmado.
   */
  const [
    idempotencyKey,
    setIdempotencyKey
  ] = useState(
    generarIdempotencyKey
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
    procesando:
      registrandoCompra,
    intentarBloquear:
      bloquearRegistro,
    liberar:
      liberarRegistro
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar =
      async () => {
        setCargandoCatalogos(true);

        try {
          const [
            proveedoresData,
            materialesData,
            coloresData
          ] = await Promise.all([
            apiFetch(
              '/proveedores'
            ),
            apiFetch(
              '/catalogos/materiales'
            ),
            apiFetch(
              '/catalogos/colores'
            )
          ]);

          setProveedores(
            proveedoresData
              .proveedores ||
            []
          );

          setMateriales(
            materialesData.items ||
            []
          );

          setColores(
            coloresData.items ||
            []
          );

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargandoCatalogos(
            false
          );
        }
      };

    cargar();
  }, []);


  const handleCabeceraChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value
    } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };


  const handleDetalleChange = (
    index: number,
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {
    if (registrandoCompra) {
      return;
    }

    const nuevos = [
      ...detalles
    ];

    nuevos[index] = {
      ...nuevos[index],
      [e.target.name]:
        e.target.value
    };

    setDetalles(nuevos);
  };


  const agregarDetalle = () => {
    if (registrandoCompra) {
      return;
    }

    setDetalles([
      ...detalles,
      {
        ...detalleVacio
      }
    ]);
  };


  const quitarDetalle = (
    index: number
  ) => {
    if (registrandoCompra) {
      return;
    }

    if (
      detalles.length === 1
    ) {
      setFeedback({
        tipo: 'warning',
        mensaje:
          'La compra debe tener al menos una materia prima'
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


  const calcularSubtotal = (
    detalle: DetalleCompraMP
  ) => {
    return (
      Number(
        detalle.cantidad ||
        0
      ) *
      Number(
        detalle.precio_unitario ||
        0
      )
    );
  };


  const montoTotal =
    detalles.reduce(
      (
        total,
        detalle
      ) =>
        total +
        calcularSubtotal(
          detalle
        ),
      0
    );


  const validarFormulario = () => {
    if (
      !form.nombre_lote.trim()
    ) {
      return (
        'El nombre del lote es obligatorio'
      );
    }

    if (
      !form.proveedor_id
    ) {
      return (
        'Debe seleccionar un proveedor'
      );
    }

    if (
      !form.fecha_compra
    ) {
      return (
        'La fecha de compra es obligatoria'
      );
    }

    const combinaciones =
      new Set<string>();

    for (
      let i = 0;
      i < detalles.length;
      i++
    ) {
      const item =
        detalles[i];

      if (!item.material_id) {
        return (
          `El item ${i + 1} debe tener material`
        );
      }

      if (!item.color_id) {
        return (
          `El item ${i + 1} debe tener color`
        );
      }

      const cantidad =
        Number(item.cantidad);

      if (
        !Number.isFinite(
          cantidad
        ) ||
        cantidad <= 0
      ) {
        return (
          `El item ${i + 1} debe tener una cantidad mayor a 0`
        );
      }

      const precio =
        Number(
          item.precio_unitario
        );

      if (
        !Number.isFinite(
          precio
        ) ||
        precio < 0
      ) {
        return (
          `El item ${i + 1} debe tener un precio válido`
        );
      }

      const clave =
        `${item.material_id}-${item.color_id}`;

      if (
        combinaciones.has(
          clave
        )
      ) {
        return (
          `El item ${i + 1} repite una combinación de material y color`
        );
      }

      combinaciones.add(
        clave
      );
    }

    if (
      !Number.isFinite(
        montoTotal
      ) ||
      montoTotal <= 0
    ) {
      return (
        'El monto total debe ser mayor a 0'
      );
    }

    return null;
  };


  const registrarCompra = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (
      !bloquearRegistro()
    ) {
      return;
    }

    const error =
      validarFormulario();

    if (error) {
      liberarRegistro();

      setFeedback({
        tipo: 'error',
        mensaje: error
      });

      return;
    }

    try {
      const data =
        await apiFetch(
          '/compras-materia-prima',
          {
            method: 'POST',

            headers: {
              'Idempotency-Key':
                idempotencyKey
            },

            body:
              JSON.stringify({
                nombre_lote:
                  form
                    .nombre_lote
                    .trim(),

                proveedor_id:
                  Number(
                    form
                      .proveedor_id
                  ),

                fecha_compra:
                  form
                    .fecha_compra,

                numero_documento:
                  form
                    .numero_documento
                    .trim() ||
                  null,

                moneda_codigo:
                  form
                    .moneda_codigo,

                descripcion:
                  form
                    .descripcion
                    .trim() ||
                  null,

                detalles:
                  detalles.map(
                    (item) => ({
                      material_id:
                        Number(
                          item
                            .material_id
                        ),

                      color_id:
                        Number(
                          item
                            .color_id
                        ),

                      cantidad:
                        Number(
                          item
                            .cantidad
                        ),

                      precio_unitario:
                        Number(
                          item
                            .precio_unitario
                        ),

                      descripcion_item:
                        item
                          .descripcion_item
                          .trim() ||
                        null
                    })
                  )
              })
          }
        );

      setFeedback({
        tipo: 'success',
        mensaje:
          data.reutilizada
            ? 'La compra ya había sido registrada. Se recuperó el registro existente sin duplicar el stock.'
            : 'Compra de materia prima registrada correctamente.'
      });

      setIdempotencyKey(
        generarIdempotencyKey()
      );

      setTimeout(() => {
        navigate(
          `/gestion/compras-materia-prima/${data.compra.compra_materia_prima_id}`
        );
      }, 900);

    } catch (error: any) {
      liberarRegistro();

      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };


  return (
    <div className="pedidos-page compra-mp-page compra-mp-registro-page">

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
            Registrar compra de materia prima
          </h1>

          <p>
            Registra una importación o compra de fibra
            y genera automáticamente el stock del lote.
          </p>
        </div>
      </div>


      <form
        className="form-card compra-mp-form"
        onSubmit={registrarCompra}
      >
        <section className="compra-mp-seccion">
          <div className="compra-mp-seccion-titulo">
            <div>
              <h3>
                Datos del lote
              </h3>

              <p>
                Información general de la compra o importación.
              </p>
            </div>
          </div>


          <div className="compra-mp-cabecera-grid">

            <div>
              <label>
                Nombre del lote
              </label>

              <input
                name="nombre_lote"
                value={
                  form.nombre_lote
                }
                onChange={
                  handleCabeceraChange
                }
                placeholder="Ejemplo: IMPORTACION SEP 2026"
                disabled={
                  registrandoCompra
                }
              />
            </div>


            <div>
              <label>
                Proveedor
              </label>

              <select
                name="proveedor_id"
                value={
                  form.proveedor_id
                }
                onChange={
                  handleCabeceraChange
                }
                disabled={
                  registrandoCompra ||
                  cargandoCatalogos
                }
              >
                <option value="">
                  Seleccione proveedor
                </option>

                {proveedores.map(
                  (proveedor) => (
                    <option
                      key={
                        proveedor
                          .proveedor_id
                      }
                      value={
                        proveedor
                          .proveedor_id
                      }
                    >
                      {
                        proveedor
                          .razon_social
                      }
                      {' - '}
                      {
                        proveedor.ruc
                      }
                    </option>
                  )
                )}
              </select>
            </div>


            <div>
              <label>
                Fecha de compra
              </label>

              <input
                type="date"
                name="fecha_compra"
                value={
                  form.fecha_compra
                }
                onChange={
                  handleCabeceraChange
                }
                disabled={
                  registrandoCompra
                }
              />
            </div>


            <div>
              <label>
                Número de documento
              </label>

              <input
                name="numero_documento"
                value={
                  form
                    .numero_documento
                }
                onChange={
                  handleCabeceraChange
                }
                placeholder="Factura, guía, etc."
                disabled={
                  registrandoCompra
                }
              />
            </div>


            <div>
              <label>
                Moneda
              </label>

              <select
                name="moneda_codigo"
                value={
                  form.moneda_codigo
                }
                onChange={
                  handleCabeceraChange
                }
                disabled={
                  registrandoCompra
                }
              >
                <option value="PEN">
                  Soles
                </option>

                <option value="USD">
                  Dólares
                </option>
              </select>
            </div>


            <div className="compra-mp-campo-ancho">
              <label>
                Descripción
              </label>

              <textarea
                name="descripcion"
                value={
                  form.descripcion
                }
                onChange={
                  handleCabeceraChange
                }
                rows={3}
                placeholder="Observación general de la compra o importación"
                disabled={
                  registrandoCompra
                }
              />
            </div>

          </div>
        </section>


        <section className="compra-mp-seccion compra-mp-seccion-items">

          <div className="compra-mp-items-header">
            <div>
              <h3>
                Materias primas del lote
              </h3>

              <p className="muted">
                Cada item se registra en KG y se identifica
                mediante Material + Color.
              </p>
            </div>

            <button
              type="button"
              onClick={
                agregarDetalle
              }
              disabled={
                registrandoCompra
              }
            >
              + Agregar materia prima
            </button>
          </div>


          <div className="compra-mp-items">

            {detalles.map(
              (
                detalle,
                index
              ) => (
                <div
                  className="compra-mp-item-card"
                  key={index}
                >

                  <div className="compra-mp-item-title">
                    <div>
                      <strong>
                        Materia prima {
                          index + 1
                        }
                      </strong>

                      <span className="compra-mp-item-subtitle">
                        Selecciona material, color,
                        cantidad y precio.
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() =>
                        quitarDetalle(
                          index
                        )
                      }
                      disabled={
                        registrandoCompra
                      }
                    >
                      Quitar
                    </button>
                  </div>


                  <div className="compra-mp-item-grid">

                    <div className="compra-mp-item-material">
                      <label>
                        Material
                      </label>

                      <select
                        name="material_id"
                        value={
                          detalle
                            .material_id
                        }
                        onChange={(e) =>
                          handleDetalleChange(
                            index,
                            e
                          )
                        }
                        disabled={
                          registrandoCompra ||
                          cargandoCatalogos
                        }
                      >
                        <option value="">
                          Seleccione
                        </option>

                        {materiales.map(
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
                                material
                                  .nombre
                              }
                            </option>
                          )
                        )}
                      </select>
                    </div>


                    <div className="compra-mp-item-color">
                      <label>
                        Color
                      </label>

                      <select
                        name="color_id"
                        value={
                          detalle
                            .color_id
                        }
                        onChange={(e) =>
                          handleDetalleChange(
                            index,
                            e
                          )
                        }
                        disabled={
                          registrandoCompra ||
                          cargandoCatalogos
                        }
                      >
                        <option value="">
                          Seleccione
                        </option>

                        {colores.map(
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
                        )}
                      </select>
                    </div>


                    <div className="compra-mp-item-cantidad">
                      <label>
                        Cantidad
                      </label>

                      <div className="compra-mp-input-unidad">
                        <input
                          type="number"
                          name="cantidad"
                          value={
                            detalle.cantidad
                          }
                          onChange={(e) =>
                            handleDetalleChange(
                              index,
                              e
                            )
                          }
                          min="0.001"
                          step="0.001"
                          placeholder="0.000"
                          disabled={
                            registrandoCompra
                          }
                        />

                        <span>
                          KG
                        </span>
                      </div>
                    </div>


                    <div className="compra-mp-item-precio">
                      <label>
                        Precio unitario
                      </label>

                      <div className="compra-mp-input-moneda">
                        <span>
                          {
                            form.moneda_codigo ===
                              'PEN'
                              ? 'S/'
                              : '$'
                          }
                        </span>

                        <input
                          type="number"
                          name="precio_unitario"
                          value={
                            detalle
                              .precio_unitario
                          }
                          onChange={(e) =>
                            handleDetalleChange(
                              index,
                              e
                            )
                          }
                          min="0"
                          step="0.0001"
                          placeholder="0.0000"
                          disabled={
                            registrandoCompra
                          }
                        />
                      </div>
                    </div>


                    <div className="compra-mp-item-subtotal">
                      <label>
                        Subtotal
                      </label>

                      <div className="compra-mp-subtotal-box">
                        <span>
                          {
                            form.moneda_codigo ===
                              'PEN'
                              ? 'S/'
                              : '$'
                          }
                        </span>

                        <strong>
                          {
                            calcularSubtotal(
                              detalle
                            )
                              .toFixed(2)
                          }
                        </strong>
                      </div>
                    </div>


                    <div className="compra-mp-campo-ancho compra-mp-item-descripcion">
                      <label>
                        Descripción opcional
                      </label>

                      <input
                        name="descripcion_item"
                        value={
                          detalle
                            .descripcion_item
                        }
                        onChange={(e) =>
                          handleDetalleChange(
                            index,
                            e
                          )
                        }
                        placeholder="Ejemplo: Fibra virgen"
                        disabled={
                          registrandoCompra
                        }
                      />
                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        </section>


        <div className="compra-mp-total">
          <div>
            <span>
              Total del lote
            </span>

            <small>
              Suma de todos los ítems registrados
            </small>
          </div>

          <strong>
            {
              form.moneda_codigo ===
                'USD'
                ? '$'
                : 'S/'
            }
            {' '}
            {
              montoTotal.toFixed(
                2
              )
            }
            {' '}
            {
              form.moneda_codigo
            }
          </strong>
        </div>


        <div className="compra-mp-form-actions">
          <Link
            to="/gestion/compras-materia-prima"
            className="btn-secondary-link"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={
              registrandoCompra ||
              cargandoCatalogos
            }
          >
            {
              registrandoCompra
                ? 'Registrando compra...'
                : 'Registrar compra e ingresar stock'
            }
          </button>
        </div>

      </form>

    </div>
  );
}


export default RegistrarCompraMateriaPrima;
