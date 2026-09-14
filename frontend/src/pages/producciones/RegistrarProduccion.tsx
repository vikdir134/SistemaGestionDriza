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

import '../../styles/producciones.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Opcion = {
  id: number;
  nombre: string;
};


type OpcionesProducto = {
  tipos: Opcion[];
  materiales: Opcion[];
  medidas: Opcion[];
  colores: Opcion[];
};


type DetalleProduccionForm = {
  local_id: string;

  tipo_producto_id: string;
  material_id: string;
  medida_id: string;
  color_id: string;

  opciones: OpcionesProducto;

  producto: any | null;
  buscandoProducto: boolean;

  cantidad_producida: string;
  cantidad_presentacion: string;
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
    'produccion',
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


const crearDetalle = (
  tipos: Opcion[]
): DetalleProduccionForm => ({
  local_id:
    nuevoLocalId(),

  tipo_producto_id: '',
  material_id: '',
  medida_id: '',
  color_id: '',

  opciones: {
    tipos,
    materiales: [],
    medidas: [],
    colores: []
  },

  producto: null,
  buscandoProducto: false,

  cantidad_producida: '',
  cantidad_presentacion: '',
  observacion: ''
});


function RegistrarProduccion() {
  const navigate =
    useNavigate();

  const [
    fechaProduccion,
    setFechaProduccion
  ] = useState(
    fechaLocalActual()
  );

  const [
    observacion,
    setObservacion
  ] = useState('');

  const [
    tiposBase,
    setTiposBase
  ] = useState<Opcion[]>([]);

  const [
    unidadKgId,
    setUnidadKgId
  ] = useState<number | null>(
    null
  );

  const [
    detalles,
    setDetalles
  ] = useState<
    DetalleProduccionForm[]
  >([]);

  const [
    cargandoInicial,
    setCargandoInicial
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


  useEffect(() => {
    const cargar =
      async () => {
        setCargandoInicial(
          true
        );

        try {
          const [
            opcionesData,
            unidadesData
          ] = await Promise.all([
            apiFetch(
              '/productos-terminados/opciones'
            ),
            apiFetch(
              '/catalogos/unidades-medida'
            )
          ]);

          const tipos:
            Opcion[] =
            opcionesData.tipos ||
            [];

          const unidadKg =
            (
              unidadesData.unidades ||
              []
            ).find(
              (item: any) =>
                String(
                  item.codigo
                ).toUpperCase() ===
                'KG'
            );

          if (!unidadKg) {
            throw new Error(
              'No se encontró la unidad KG en el catálogo'
            );
          }

          setTiposBase(
            tipos
          );

          setUnidadKgId(
            Number(
              unidadKg.unidad_medida_id
            )
          );

          setDetalles([
            crearDetalle(
              tipos
            )
          ]);

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargandoInicial(
            false
          );
        }
      };

    cargar();
  }, []);


  const actualizarDetalle = (
    index: number,
    cambios:
      Partial<
        DetalleProduccionForm
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


  const cargarOpciones = async (
    params:
      Record<
        string,
        string
      >
  ) => {
    const query =
      new URLSearchParams(
        params
      );

    return await apiFetch(
      `/productos-terminados/opciones?${query.toString()}`
    );
  };


  const cambiarTipo = async (
    index: number,
    valor: string
  ) => {
    actualizarDetalle(
      index,
      {
        tipo_producto_id:
          valor,
        material_id: '',
        medida_id: '',
        color_id: '',
        producto: null,
        buscandoProducto:
          Boolean(valor),
        opciones: {
          tipos:
            tiposBase,
          materiales: [],
          medidas: [],
          colores: []
        }
      }
    );

    if (!valor) {
      return;
    }

    try {
      const data =
        await cargarOpciones({
          tipo_producto_id:
            valor
        });

      actualizarDetalle(
        index,
        {
          buscandoProducto:
            false,
          opciones: {
            tipos:
              tiposBase,
            materiales:
              data.materiales ||
              [],
            medidas: [],
            colores: []
          }
        }
      );

    } catch (error: any) {
      actualizarDetalle(
        index,
        {
          buscandoProducto:
            false
        }
      );

      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };


  const cambiarMaterial =
    async (
      index: number,
      valor: string
    ) => {
      const detalle =
        detalles[index];

      actualizarDetalle(
        index,
        {
          material_id:
            valor,
          medida_id: '',
          color_id: '',
          producto: null,
          buscandoProducto:
            Boolean(valor),
          opciones: {
            ...detalle.opciones,
            medidas: [],
            colores: []
          }
        }
      );

      if (!valor) {
        return;
      }

      try {
        const data =
          await cargarOpciones({
            tipo_producto_id:
              detalle
                .tipo_producto_id,
            material_id:
              valor
          });

        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,
            opciones: {
              ...detalle.opciones,
              medidas:
                data.medidas ||
                [],
              colores: []
            }
          }
        );

      } catch (error: any) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false
          }
        );

        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };


  const cambiarMedida =
    async (
      index: number,
      valor: string
    ) => {
      const detalle =
        detalles[index];

      actualizarDetalle(
        index,
        {
          medida_id:
            valor,
          color_id: '',
          producto: null,
          buscandoProducto:
            Boolean(valor),
          opciones: {
            ...detalle.opciones,
            colores: []
          }
        }
      );

      if (!valor) {
        return;
      }

      try {
        const data =
          await cargarOpciones({
            tipo_producto_id:
              detalle
                .tipo_producto_id,
            material_id:
              detalle.material_id,
            medida_id:
              valor
          });

        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,
            opciones: {
              ...detalle.opciones,
              colores:
                data.colores ||
                []
            }
          }
        );

      } catch (error: any) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false
          }
        );

        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };


  const cambiarColor =
    async (
      index: number,
      valor: string
    ) => {
      const detalle =
        detalles[index];

      actualizarDetalle(
        index,
        {
          color_id:
            valor,
          producto: null,
          buscandoProducto:
            Boolean(valor)
        }
      );

      if (!valor) {
        return;
      }

      try {
        const opcionesData =
          await cargarOpciones({
            tipo_producto_id:
              detalle
                .tipo_producto_id,
            material_id:
              detalle.material_id,
            medida_id:
              detalle.medida_id,
            color_id:
              valor
          });

        if (
          !opcionesData.producto
            ?.producto_id
        ) {
          actualizarDetalle(
            index,
            {
              buscandoProducto:
                false,
              producto: null
            }
          );

          setFeedback({
            tipo: 'warning',
            mensaje:
              'No existe un producto terminado con esa selección'
          });

          return;
        }

        const productoData =
          await apiFetch(
            `/productos-terminados/${opcionesData.producto.producto_id}`
          );

        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,
            producto:
              productoData
                .producto
          }
        );

      } catch (error: any) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,
            producto: null
          }
        );

        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };


  const agregarProducto = () => {
    if (procesando) {
      return;
    }

    setDetalles([
      ...detalles,
      crearDetalle(
        tiposBase
      )
    ]);
  };


  const quitarProducto = (
    index: number
  ) => {
    if (
      procesando
    ) {
      return;
    }

    if (
      detalles.length === 1
    ) {
      setFeedback({
        tipo: 'warning',
        mensaje:
          'La producción debe tener al menos un producto'
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


  const totalProducido =
    useMemo(
      () =>
        detalles.reduce(
          (
            total,
            detalle
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
        detalles
      ]
    );


  const validar = () => {
    if (!fechaProduccion) {
      return (
        'La fecha de producción es obligatoria'
      );
    }

    if (
      !unidadKgId
    ) {
      return (
        'No se pudo determinar la unidad KG'
      );
    }

    for (
      let i = 0;
      i < detalles.length;
      i++
    ) {
      const detalle =
        detalles[i];

      if (
        !detalle.producto
      ) {
        return (
          `El producto ${i + 1} no está completamente seleccionado`
        );
      }

      if (
        !detalle.producto
          .composicion_vigente
      ) {
        return (
          `El producto ${i + 1} no tiene composición definida`
        );
      }

      const cantidad =
        Number(
          detalle
            .cantidad_producida
        );

      const presentacion =
        Number(
          detalle
            .cantidad_presentacion
        );

      if (
        !Number.isFinite(
          cantidad
        ) ||
        cantidad <= 0
      ) {
        return (
          `La cantidad producida del producto ${i + 1} debe ser mayor a 0`
        );
      }

      if (
        !Number.isFinite(
          presentacion
        ) ||
        presentacion <= 0
      ) {
        return (
          `La presentación del producto ${i + 1} debe ser mayor a 0`
        );
      }

      const cantidadMil =
        Math.round(
          cantidad * 1000
        );

      const presentacionMil =
        Math.round(
          presentacion * 1000
        );

      if (
        presentacionMil <= 0 ||
        cantidadMil %
          presentacionMil !==
          0
      ) {
        return (
          `La cantidad producida del producto ${i + 1} debe ser múltiplo de su presentación`
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
          '/producciones',
          {
            method: 'POST',

            headers: {
              'Idempotency-Key':
                idempotencyKey
            },

            body:
              JSON.stringify({
                fecha_produccion:
                  fechaProduccion,

                observacion:
                  observacion
                    .trim() ||
                  null,

                detalles:
                  detalles.map(
                    (detalle) => ({
                      producto_id:
                        Number(
                          detalle
                            .producto
                            .producto_id
                        ),

                      cantidad_producida:
                        Number(
                          detalle
                            .cantidad_producida
                        ),

                      cantidad_presentacion:
                        Number(
                          detalle
                            .cantidad_presentacion
                        ),

                      unidad_presentacion_id:
                        unidadKgId,

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
            ? 'La producción ya había sido registrada. Se recuperó el resultado existente sin duplicar stock.'
            : 'Producción registrada correctamente.'
      });

      setIdempotencyKey(
        nuevaKey()
      );

      setTimeout(() => {
        navigate(
          `/gestion/producciones/${data.produccion.produccion_id}`
        );
      }, 800);

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


      <ConfirmDialog
        abierto={confirmando}
        titulo="Registrar producción"
        descripcion={
          `Se registrarán ${detalles.length} producto(s) por un total de ${totalProducido.toFixed(3)} KG. La operación descontará materia prima por FIFO e ingresará el producto terminado al almacén. ¿Deseas continuar?`
        }
        textoConfirmar="Registrar producción"
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
        to="/gestion/producciones"
        className="btn-volver"
      >
        ← Volver a producción
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            Registrar producción
          </h1>

          <p>
            Selecciona los productos fabricados.
            El sistema descontará automáticamente
            la materia prima por FIFO.
          </p>
        </div>
      </div>


      <form
        className="prod-form"
        onSubmit={
          solicitarRegistro
        }
      >

        <section className="prod-seccion">

          <div className="prod-seccion-header">
            <div>
              <h3>
                Datos de producción
              </h3>

              <p>
                Información general del registro.
              </p>
            </div>
          </div>


          <div className="prod-cabecera-grid">

            <div>
              <label>
                Fecha de producción
              </label>

              <input
                type="date"
                value={
                  fechaProduccion
                }
                onChange={(e) =>
                  setFechaProduccion(
                    e.target.value
                  )
                }
                disabled={
                  procesando
                }
              />
            </div>


            <div className="prod-campo-ancho">
              <label>
                Observación
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
                placeholder="Observación general de la producción"
                disabled={
                  procesando
                }
              />
            </div>

          </div>

        </section>


        <section className="prod-seccion">

          <div className="prod-seccion-header">
            <div>
              <h3>
                Productos fabricados
              </h3>

              <p>
                Selecciona el producto fabricado.
                La composición se carga automáticamente.
              </p>
            </div>

            <button
              type="button"
              onClick={
                agregarProducto
              }
              disabled={
                procesando ||
                cargandoInicial
              }
            >
              + Agregar producto
            </button>
          </div>


          <div className="prod-items">

            {
              detalles.map(
                (
                  detalle,
                  index
                ) => {
                  const composicion =
                    detalle.producto
                      ?.composicion_vigente;

                  const cantidadProducida =
                    Number(
                      detalle
                        .cantidad_producida ||
                      0
                    );

                  return (
                    <article
                      key={
                        detalle.local_id
                      }
                      className="prod-item-card"
                    >

                      <div className="prod-item-header">
                        <div>
                          <strong>
                            Producto {
                              index + 1
                            }
                          </strong>

                          <span>
                            Tipo, material, medida y color
                          </span>
                        </div>

                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() =>
                            quitarProducto(
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


                      <div className="prod-producto-grid">

                        <div>
                          <label>
                            Tipo
                          </label>

                          <select
                            value={
                              detalle
                                .tipo_producto_id
                            }
                            onChange={(e) =>
                              cambiarTipo(
                                index,
                                e.target.value
                              )
                            }
                            disabled={
                              procesando ||
                              cargandoInicial
                            }
                          >
                            <option value="">
                              Seleccione
                            </option>

                            {
                              detalle
                                .opciones
                                .tipos
                                .map(
                                  (opcion) => (
                                    <option
                                      key={
                                        opcion.id
                                      }
                                      value={
                                        opcion.id
                                      }
                                    >
                                      {
                                        opcion.nombre
                                      }
                                    </option>
                                  )
                                )
                            }
                          </select>
                        </div>


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
                              cambiarMaterial(
                                index,
                                e.target.value
                              )
                            }
                            disabled={
                              procesando ||
                              !detalle
                                .tipo_producto_id ||
                              detalle
                                .buscandoProducto
                            }
                          >
                            <option value="">
                              Seleccione
                            </option>

                            {
                              detalle
                                .opciones
                                .materiales
                                .map(
                                  (opcion) => (
                                    <option
                                      key={
                                        opcion.id
                                      }
                                      value={
                                        opcion.id
                                      }
                                    >
                                      {
                                        opcion.nombre
                                      }
                                    </option>
                                  )
                                )
                            }
                          </select>
                        </div>


                        <div>
                          <label>
                            Medida
                          </label>

                          <select
                            value={
                              detalle
                                .medida_id
                            }
                            onChange={(e) =>
                              cambiarMedida(
                                index,
                                e.target.value
                              )
                            }
                            disabled={
                              procesando ||
                              !detalle
                                .material_id ||
                              detalle
                                .buscandoProducto
                            }
                          >
                            <option value="">
                              Seleccione
                            </option>

                            {
                              detalle
                                .opciones
                                .medidas
                                .map(
                                  (opcion) => (
                                    <option
                                      key={
                                        opcion.id
                                      }
                                      value={
                                        opcion.id
                                      }
                                    >
                                      {
                                        opcion.nombre
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
                              cambiarColor(
                                index,
                                e.target.value
                              )
                            }
                            disabled={
                              procesando ||
                              !detalle
                                .medida_id ||
                              detalle
                                .buscandoProducto
                            }
                          >
                            <option value="">
                              Seleccione
                            </option>

                            {
                              detalle
                                .opciones
                                .colores
                                .map(
                                  (opcion) => (
                                    <option
                                      key={
                                        opcion.id
                                      }
                                      value={
                                        opcion.id
                                      }
                                    >
                                      {
                                        opcion.nombre
                                      }
                                    </option>
                                  )
                                )
                            }
                          </select>
                        </div>

                      </div>


                      {
                        detalle.buscandoProducto &&
                        (
                          <div className="prod-producto-estado">
                            Consultando producto...
                          </div>
                        )
                      }


                      {
                        detalle.producto &&
                        !composicion &&
                        (
                          <div className="prod-alerta prod-alerta-warning">
                            Este producto existe, pero todavía no tiene
                            composición definida. No se puede producir.
                          </div>
                        )
                      }


                      {
                        composicion &&
                        (
                          <div className="prod-composicion-preview">

                            <div className="prod-composicion-titulo">
                              <div>
                                <strong>
                                  Composición vigente
                                </strong>

                                <span>
                                  Versión {
                                    composicion
                                      .version_numero
                                  }
                                </span>
                              </div>

                              <span className="prod-badge-ok">
                                Lista para producir
                              </span>
                            </div>


                            <div className="prod-receta-grid">

                              {
                                composicion
                                  .detalles
                                  .map(
                                    (
                                      componente: any
                                    ) => {
                                      const requerido =
                                        cantidadProducida >
                                        0
                                          ? cantidadProducida *
                                            Number(
                                              componente
                                                .porcentaje
                                            ) /
                                            100
                                          : 0;

                                      return (
                                        <div
                                          key={
                                            componente
                                              .producto_composicion_detalle_id
                                          }
                                          className="prod-receta-item"
                                        >
                                          <div>
                                            <strong>
                                              {
                                                componente
                                                  .material
                                              }
                                            </strong>

                                            <span>
                                              {
                                                componente
                                                  .color
                                              }
                                            </span>
                                          </div>

                                          <div className="prod-receta-cantidad">
                                            <strong>
                                              {
                                                Number(
                                                  componente
                                                    .porcentaje
                                                )
                                                  .toFixed(
                                                    2
                                                  )
                                              }%
                                            </strong>

                                            {
                                              cantidadProducida >
                                                0 &&
                                              (
                                                <small>
                                                  {
                                                    requerido
                                                      .toFixed(
                                                        3
                                                      )
                                                  } KG
                                                </small>
                                              )
                                            }
                                          </div>
                                        </div>
                                      );
                                    }
                                  )
                              }

                            </div>

                          </div>
                        )
                      }


                      <div className="prod-cantidades-grid">

                        <div>
                          <label>
                            Cantidad producida
                          </label>

                          <div className="prod-input-unidad">
                            <input
                              type="number"
                              value={
                                detalle
                                  .cantidad_producida
                              }
                              onChange={(e) =>
                                actualizarDetalle(
                                  index,
                                  {
                                    cantidad_producida:
                                      e.target.value
                                  }
                                )
                              }
                              min="0.001"
                              step="0.001"
                              placeholder="0.000"
                              disabled={
                                procesando
                              }
                            />

                            <span>
                              KG
                            </span>
                          </div>
                        </div>


                        <div>
                          <label>
                            Presentación
                          </label>

                          <div className="prod-input-unidad">
                            <input
                              type="number"
                              value={
                                detalle
                                  .cantidad_presentacion
                              }
                              onChange={(e) =>
                                actualizarDetalle(
                                  index,
                                  {
                                    cantidad_presentacion:
                                      e.target.value
                                  }
                                )
                              }
                              min="0.001"
                              step="0.001"
                              placeholder="Ej. 50"
                              disabled={
                                procesando
                              }
                            />

                            <span>
                              KG
                            </span>
                          </div>

                          {
                            Number(
                              detalle
                                .cantidad_producida ||
                              0
                            ) > 0 &&
                            Number(
                              detalle
                                .cantidad_presentacion ||
                              0
                            ) > 0 &&
                            (
                              <small className="prod-presentaciones-info">
                                {
                                  (
                                    Number(
                                      detalle
                                        .cantidad_producida
                                    ) /
                                    Number(
                                      detalle
                                        .cantidad_presentacion
                                    )
                                  )
                                    .toFixed(
                                      2
                                    )
                                } presentación(es)
                              </small>
                            )
                          }
                        </div>


                        <div className="prod-campo-ancho">
                          <label>
                            Observación del producto
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

                    </article>
                  );
                }
              )
            }

          </div>

        </section>


        <div className="prod-total">

          <div>
            <span>
              Total de la producción
            </span>

            <small>
              {
                detalles.length
              } producto(s)
            </small>
          </div>

          <strong>
            {
              totalProducido
                .toFixed(3)
            } KG
          </strong>

        </div>


        <div className="prod-form-actions">

          <Link
            to="/gestion/producciones"
            className="btn-secondary-link"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={
              procesando ||
              cargandoInicial
            }
          >
            {
              procesando
                ? 'Registrando...'
                : 'Registrar producción'
            }
          </button>

        </div>

      </form>

    </div>
  );
}


export default RegistrarProduccion;
