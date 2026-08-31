import {
  useCallback,
  useEffect,
  useState
} from 'react';

import type {
  ChangeEvent,
  FormEvent
} from 'react';

import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import ConfirmDialog
  from '../../components/common/ConfirmDialog';

import PedidoItemsEditor, {
  detallePedidoVacio,
  type DetallePedidoForm
} from '../../components/pedidos/PedidoItemsEditor';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


/* =========================================================
   CONVERTIR DETALLE DEL BACKEND AL FORMULARIO
   ========================================================= */

const convertirDetalleExistente = (
  detalle: any
): DetallePedidoForm => {
  return {
    pedido_detalle_id:
      Number(
        detalle.pedido_detalle_id
      ),

    cantidad_entregada:
      Number(
        detalle.cantidad_entregada ||
        0
      ),

    cantidad_pendiente:
      Number(
        detalle.cantidad_pendiente ||
        0
      ),

    estado_entrega:
      detalle.estado_entrega ||
      'PENDIENTE',

    unidad:
      detalle.unidad ||
      '',


    tipo_producto_id:
      detalle.tipo_producto_id
        ? String(
            detalle.tipo_producto_id
          )
        : '',


    medida_id:
      detalle.medida_id
        ? String(
            detalle.medida_id
          )
        : '',


    color_id:
      detalle.color_id
        ? String(
            detalle.color_id
          )
        : '',


    material_id:
      detalle.material_id
        ? String(
            detalle.material_id
          )
        : '',


    cantidad_pedida:
      detalle.cantidad_pedida !==
        null &&
      detalle.cantidad_pedida !==
        undefined
        ? String(
            detalle.cantidad_pedida
          )
        : '',


    unidad_medida_id:
      detalle.unidad_medida_id
        ? String(
            detalle.unidad_medida_id
          )
        : '',


    cantidad_presentacion:
      detalle.cantidad_presentacion !==
        null &&
      detalle.cantidad_presentacion !==
        undefined
        ? String(
            detalle.cantidad_presentacion
          )
        : '',


    unidad_presentacion_id:
      detalle.unidad_presentacion_id
        ? String(
            detalle.unidad_presentacion_id
          )
        : '',


    precio_unitario:
      detalle.precio_unitario !==
        null &&
      detalle.precio_unitario !==
        undefined
        ? String(
            detalle.precio_unitario
          )
        : '',


    moneda_codigo:
      detalle.moneda_codigo ||
      'PEN',


    descripcion_item:
      detalle.descripcion_item ||
      '',


    observacion:
      detalle.observacion ||
      ''
  };
};


/* =========================================================
   SABER SI UN PRODUCTO NUEVO FUE UTILIZADO
   ========================================================= */

const detalleNuevoTieneDatos = (
  item: DetallePedidoForm
) => {
  return Boolean(
    item.tipo_producto_id ||

    item.medida_id ||

    item.color_id ||

    item.material_id ||

    item.cantidad_pedida ||

    item.unidad_medida_id ||

    item.cantidad_presentacion ||

    item.precio_unitario ||

    item.descripcion_item.trim() ||

    item.observacion.trim()
  );
};


/* =========================================================
   VALIDAR UN DETALLE
   ========================================================= */

const validarDetalle = (
  item: DetallePedidoForm,
  nombre: string,
  validarCantidadEntregada = false
) => {

  /* =======================================================
     TIPO / MEDIDA / COLOR / MATERIAL
     ======================================================= */

  if (
    !item.tipo_producto_id ||
    !item.medida_id ||
    !item.color_id ||
    !item.material_id
  ) {
    return (
      `${nombre} debe tener tipo, medida, color y material`
    );
  }


  /* =======================================================
     CANTIDAD
     ======================================================= */

  const cantidad =
    Number(
      item.cantidad_pedida
    );


  if (
    !Number.isFinite(
      cantidad
    ) ||
    cantidad <= 0
  ) {
    return (
      `${nombre} debe tener una cantidad mayor a 0`
    );
  }


  /*
   * REGLA PRINCIPAL:
   *
   * Si ya se entregaron 80 KG:
   *
   * 100 → 90 ✅
   * 100 → 80 ✅
   * 100 → 79 ❌
   */
  if (
    validarCantidadEntregada
  ) {
    const cantidadEntregada =
      Number(
        item.cantidad_entregada ||
        0
      );


    if (
      cantidad <
      cantidadEntregada
    ) {
      return (
        `${nombre} no puede tener una cantidad menor a lo ya entregado (${cantidadEntregada} ${item.unidad || ''})`
      );
    }
  }


  /* =======================================================
     UNIDAD
     ======================================================= */

  if (
    !item.unidad_medida_id
  ) {
    return (
      `${nombre} debe tener una unidad de medida`
    );
  }


  /* =======================================================
     PRESENTACIÓN
     ======================================================= */

  if (
    item.cantidad_presentacion !==
    ''
  ) {
    const presentacion =
      Number(
        item.cantidad_presentacion
      );


    if (
      !Number.isFinite(
        presentacion
      ) ||
      presentacion <= 0
    ) {
      return (
        `${nombre} debe tener una presentación mayor a 0`
      );
    }


    if (
      !item.unidad_presentacion_id
    ) {
      return (
        `${nombre} debe tener una unidad de presentación`
      );
    }
  }


  /* =======================================================
     PRECIO
     ======================================================= */

  const precio =
    Number(
      item.precio_unitario
    );


  if (
    !Number.isFinite(
      precio
    ) ||
    precio <= 0
  ) {
    return (
      `${nombre} debe tener un precio mayor a 0`
    );
  }


  /* =======================================================
     MONEDA
     ======================================================= */

  if (
    ![
      'PEN',
      'USD'
    ].includes(
      item.moneda_codigo
    )
  ) {
    return (
      `${nombre} debe tener una moneda válida`
    );
  }


  return null;
};


/* =========================================================
   CONVERTIR DETALLE DEL FORMULARIO AL BODY DE LA API
   ========================================================= */

const convertirDetalleParaApi = (
  item: DetallePedidoForm,
  incluirId = false
) => {
  return {
    ...(incluirId
      ? {
          pedido_detalle_id:
            Number(
              item.pedido_detalle_id
            )
        }
      : {}
    ),


    tipo_producto_id:
      Number(
        item.tipo_producto_id
      ),


    medida_id:
      Number(
        item.medida_id
      ),


    color_id:
      Number(
        item.color_id
      ),


    material_id:
      Number(
        item.material_id
      ),


    cantidad_pedida:
      Number(
        item.cantidad_pedida
      ),


    unidad_medida_id:
      Number(
        item.unidad_medida_id
      ),


    cantidad_presentacion:
      item.cantidad_presentacion
        ? Number(
            item.cantidad_presentacion
          )
        : null,


    unidad_presentacion_id:
      item.cantidad_presentacion &&
      item.unidad_presentacion_id
        ? Number(
            item.unidad_presentacion_id
          )
        : null,


    precio_unitario:
      Number(
        item.precio_unitario
      ),


    moneda_codigo:
      item.moneda_codigo,


    descripcion_item:
      item.descripcion_item.trim(),


    observacion:
      item.observacion.trim()
  };
};


/* =========================================================
   COMPONENTE
   ========================================================= */

function EditarPedido() {

  const {
    pedido_id
  } = useParams();


  const navigate =
    useNavigate();


  /* =========================================================
     PEDIDO
     ========================================================= */

  const [
    pedido,
    setPedido
  ] = useState<any | null>(
    null
  );


  const [
    cargando,
    setCargando
  ] = useState(true);


  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  /* =========================================================
     CATÁLOGOS
     ========================================================= */

  const [
    clientes,
    setClientes
  ] = useState<any[]>([]);


  const [
    tipos,
    setTipos
  ] = useState<any[]>([]);


  const [
    medidas,
    setMedidas
  ] = useState<any[]>([]);


  const [
    colores,
    setColores
  ] = useState<any[]>([]);


  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);


  const [
    unidades,
    setUnidades
  ] = useState<any[]>([]);


  /* =========================================================
     CABECERA DEL PEDIDO
     ========================================================= */

  const [
    form,
    setForm
  ] = useState({
    cliente_id: '',

    codigo_pedido: '',

    fecha_pedido: '',

    fecha_entrega_estimada: '',

    descripcion_pedido: '',

    motivo_cambio: ''
  });


  /* =========================================================
     PRODUCTOS EXISTENTES
     ========================================================= */

  const [
    detallesEditados,
    setDetallesEditados
  ] = useState<
    DetallePedidoForm[]
  >([]);


  /* =========================================================
     PRODUCTOS NUEVOS
     ========================================================= */

  const [
    nuevosDetalles,
    setNuevosDetalles
  ] = useState<
    DetallePedidoForm[]
  >([
    {
      ...detallePedidoVacio
    }
  ]);


  /* =========================================================
     DIÁLOGO DE CONFIRMACIÓN
     ========================================================= */

  const [
    dialogAbierto,
    setDialogAbierto
  ] = useState(false);


  /* =========================================================
     FEEDBACK
     ========================================================= */

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


  const mostrarFeedback = (
    tipo: FeedbackTipo,
    mensaje: string
  ) => {
    setFeedback({
      tipo,
      mensaje
    });
  };


  /* =========================================================
     PROTECCIÓN CONTRA MÚLTIPLES PUT
     ========================================================= */

  const {
    procesando:
      actualizandoPedido,

    intentarBloquear:
      bloquearActualizacion,

    liberar:
      liberarActualizacion

  } = useBloqueoAccion();


  /* =========================================================
     CARGAR PEDIDO Y CATÁLOGOS
     ========================================================= */

  const cargarDatos =
    useCallback(
      async () => {

        if (!pedido_id) {
          throw new Error(
            'ID de pedido no válido'
          );
        }


        const [
          pedidoData,
          clientesData,
          tiposData,
          medidasData,
          coloresData,
          materialesData,
          unidadesData
        ] = await Promise.all([

          apiFetch(
            `/pedidos/${pedido_id}`
          ),

          apiFetch(
            '/clientes'
          ),

          apiFetch(
            '/catalogos/tiposProducto'
          ),

          apiFetch(
            '/catalogos/medidas'
          ),

          apiFetch(
            '/catalogos/colores'
          ),

          apiFetch(
            '/catalogos/materiales'
          ),

          apiFetch(
            '/catalogos/unidades-medida'
          )
        ]);


        const pedidoActual =
          pedidoData.pedido;


        if (!pedidoActual) {
          throw new Error(
            'Pedido no encontrado'
          );
        }


        /* ===================================================
           PEDIDO
           =================================================== */

        setPedido(
          pedidoActual
        );


        /* ===================================================
           CLIENTES
           =================================================== */

        const listaClientes = [
          ...(clientesData.clientes || [])
        ];


        /*
         * Clientes está paginado.
         *
         * Puede ocurrir que el cliente del
         * pedido no se encuentre en la primera
         * página del endpoint /clientes.
         *
         * Lo agregamos manualmente al select.
         */
        const clienteActualExiste =
          listaClientes.some(
            (cliente) =>
              Number(
                cliente.cliente_id
              ) ===
              Number(
                pedidoActual.cliente_id
              )
          );


        if (
          !clienteActualExiste
        ) {
          listaClientes.push({
            cliente_id:
              pedidoActual.cliente_id,

            razon_social:
              pedidoActual.razon_social,

            ruc:
              pedidoActual.ruc
          });
        }


        setClientes(
          listaClientes
        );


        /* ===================================================
           CATÁLOGOS
           =================================================== */

        setTipos(
          tiposData.items ||
          []
        );


        setMedidas(
          medidasData.items ||
          []
        );


        setColores(
          coloresData.items ||
          []
        );


        setMateriales(
          materialesData.items ||
          []
        );


        setUnidades(
          unidadesData.unidades ||
          []
        );


        /* ===================================================
           CABECERA
           =================================================== */

        setForm({
          cliente_id:
            String(
              pedidoActual.cliente_id
            ),


          codigo_pedido:
            pedidoActual.codigo_pedido ||
            '',


          fecha_pedido:
            pedidoActual.fecha_pedido
              ?.slice(
                0,
                10
              ) ||
            '',


          fecha_entrega_estimada:
            pedidoActual
              .fecha_entrega_estimada
              ?.slice(
                0,
                10
              ) ||
            '',


          descripcion_pedido:
            pedidoActual
              .descripcion_pedido ||
            '',


          motivo_cambio:
            ''
        });


        /* ===================================================
           PRODUCTOS EXISTENTES
           =================================================== */

        setDetallesEditados(
          (
            pedidoActual.detalles ||
            []
          ).map(
            convertirDetalleExistente
          )
        );


        /* ===================================================
           NUEVOS PRODUCTOS
           =================================================== */

        setNuevosDetalles([
          {
            ...detallePedidoVacio
          }
        ]);
      },

      [
        pedido_id
      ]
    );


  /* =========================================================
     USE EFFECT DE CARGA
     ========================================================= */

  useEffect(() => {

    const iniciar =
      async () => {

        try {
          setCargando(
            true
          );


          setErrorCarga(
            ''
          );


          await cargarDatos();

        } catch (error: any) {

          const mensaje =
            error.message ||
            'No se pudo cargar el pedido';


          setErrorCarga(
            mensaje
          );


          mostrarFeedback(
            'error',
            mensaje
          );

        } finally {

          setCargando(
            false
          );
        }
      };


    iniciar();

  }, [
    cargarDatos
  ]);


  /* =========================================================
     CAMBIO DE CABECERA
     ========================================================= */

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {

    if (
      actualizandoPedido
    ) {
      return;
    }


    setForm({
      ...form,

      [e.target.name]:
        e.target.value
    });
  };


  /* =========================================================
     VALIDAR FORMULARIO COMPLETO
     ========================================================= */

  const validarFormulario = () => {

    /* =======================================================
       PEDIDO ENTREGADO
       ======================================================= */

    if (
      pedido?.estado_pedido ===
      'ENTREGADO'
    ) {
      return (
        'Un pedido completamente entregado ya no puede editarse'
      );
    }


    /* =======================================================
       PEDIDO CANCELADO
       ======================================================= */

    if (
      pedido?.estado_pedido ===
      'CANCELADO'
    ) {
      return (
        'Un pedido cancelado no puede editarse'
      );
    }


    /* =======================================================
       CLIENTE
       ======================================================= */

    if (
      !form.cliente_id
    ) {
      return (
        'Debes seleccionar un cliente'
      );
    }


    /* =======================================================
       FECHA
       ======================================================= */

    if (
      !form.fecha_pedido
    ) {
      return (
        'Debes ingresar la fecha del pedido'
      );
    }


    /* =======================================================
       MOTIVO
       ======================================================= */

    if (
      !form.motivo_cambio.trim()
    ) {
      return (
        'Debes ingresar el motivo del cambio'
      );
    }


    /* =======================================================
       DEBE EXISTIR AL MENOS UN PRODUCTO REGISTRADO
       ======================================================= */

    if (
      detallesEditados.length ===
      0
    ) {
      return (
        'El pedido debe tener al menos un producto'
      );
    }


    /* =======================================================
       PRODUCTOS EXISTENTES
       ======================================================= */

    for (
      let index = 0;
      index <
      detallesEditados.length;
      index++
    ) {

      const item =
        detallesEditados[index];


      if (
        !item.pedido_detalle_id
      ) {
        return (
          `El producto registrado ${index + 1} no tiene un identificador válido`
        );
      }


      const error =
        validarDetalle(
          item,

          `El producto registrado ${index + 1}`,

          true
        );


      if (error) {
        return error;
      }
    }


    /* =======================================================
       PRODUCTOS NUEVOS
       ======================================================= */

    const nuevosValidos =
      nuevosDetalles.filter(
        detalleNuevoTieneDatos
      );


    for (
      let index = 0;
      index <
      nuevosValidos.length;
      index++
    ) {

      const error =
        validarDetalle(
          nuevosValidos[index],

          `El nuevo producto ${index + 1}`,

          false
        );


      if (error) {
        return error;
      }
    }


    return null;
  };


  /* =========================================================
     PREPARAR EDICIÓN
     ========================================================= */

  const prepararEdicion = (
    e: FormEvent
  ) => {

    e.preventDefault();


    if (
      actualizandoPedido
    ) {
      return;
    }


    const error =
      validarFormulario();


    if (error) {

      mostrarFeedback(
        'error',
        error
      );


      return;
    }


    setDialogAbierto(
      true
    );
  };


  /* =========================================================
     CONFIRMAR EDICIÓN
     ========================================================= */

  const confirmarEdicion =
    async () => {

      /*
       * useBloqueoAccion utiliza useRef.
       *
       * Por eso aunque el usuario haga
       * varios clics muy rápidos, solo
       * entra la primera llamada.
       */
      if (
        !bloquearActualizacion()
      ) {
        return;
      }


      /*
       * Validamos nuevamente antes del PUT.
       */
      const error =
        validarFormulario();


      if (error) {

        liberarActualizacion();


        setDialogAbierto(
          false
        );


        mostrarFeedback(
          'error',
          error
        );


        return;
      }


      try {

        /* ===================================================
           FILTRAR PRODUCTOS NUEVOS VACÍOS
           =================================================== */

        const nuevosValidos =
          nuevosDetalles.filter(
            detalleNuevoTieneDatos
          );


        /* ===================================================
           CONSTRUIR BODY
           =================================================== */

        const body = {

          /* =================================================
             CABECERA
             ================================================= */

          cliente_id:
            Number(
              form.cliente_id
            ),


          codigo_pedido:
            form.codigo_pedido
              .trim() ||
            null,


          descripcion_pedido:
            form.descripcion_pedido
              .trim(),


          fecha_pedido:
            form.fecha_pedido,


          fecha_entrega_estimada:
            form
              .fecha_entrega_estimada ||
            null,


          motivo_cambio:
            form.motivo_cambio
              .trim(),


          /* =================================================
             PRODUCTOS EXISTENTES
             ================================================= */

          detalles_editados:
            detallesEditados.map(
              (item) =>
                convertirDetalleParaApi(
                  item,
                  true
                )
            ),


          /* =================================================
             PRODUCTOS NUEVOS
             ================================================= */

          nuevos_detalles:
            nuevosValidos.map(
              (item) =>
                convertirDetalleParaApi(
                  item,
                  false
                )
            )
        };


        /* ===================================================
           PUT
           =================================================== */

        await apiFetch(
          `/pedidos/${pedido_id}`,
          {
            method: 'PUT',

            body:
              JSON.stringify(
                body
              )
          }
        );


        /* ===================================================
           ÉXITO
           =================================================== */

        setDialogAbierto(
          false
        );


        mostrarFeedback(
          'success',
          'Pedido actualizado correctamente'
        );


        /*
         * NO liberamos el bloqueo aquí.
         *
         * Si lo liberáramos durante estos
         * milisegundos el usuario podría
         * volver a generar otro PUT.
         *
         * Navegamos con el bloqueo activo.
         */
        setTimeout(() => {

          navigate(
            `/gestion/pedidos/${pedido_id}`
          );

        }, 900);


      } catch (error: any) {

        /*
         * Si el backend rechazó la edición,
         * permitimos volver a intentarlo.
         */
        liberarActualizacion();


        mostrarFeedback(
          'error',
          error.message
        );
      }
    };


  /* =========================================================
     CARGANDO
     ========================================================= */

  if (
    cargando
  ) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={
            feedback.tipo
          }

          mensaje={
            feedback.mensaje
          }

          onClose={() =>
            setFeedback({
              ...feedback,

              mensaje: ''
            })
          }
        />


        <Link
          to="/gestion/pedidos"
          className="btn-volver"
        >
          ← Volver a pedidos
        </Link>


        <div className="pedidos-card">

          <p>
            Cargando pedido...
          </p>

        </div>

      </div>
    );
  }


  /* =========================================================
     ERROR DE CARGA
     ========================================================= */

  if (
    !pedido ||
    errorCarga
  ) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={
            feedback.tipo
          }

          mensaje={
            feedback.mensaje
          }

          onClose={() =>
            setFeedback({
              ...feedback,

              mensaje: ''
            })
          }
        />


        <Link
          to="/gestion/pedidos"
          className="btn-volver"
        >
          ← Volver a pedidos
        </Link>


        <div className="pedidos-card">

          <h3>
            Pedido no disponible
          </h3>


          <p>
            {
              errorCarga ||
              'No se pudo cargar el pedido.'
            }
          </p>

        </div>

      </div>
    );
  }


  /* =========================================================
     PEDIDO ENTREGADO
     ========================================================= */

  if (
    pedido.estado_pedido ===
    'ENTREGADO'
  ) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={
            feedback.tipo
          }

          mensaje={
            feedback.mensaje
          }

          onClose={() =>
            setFeedback({
              ...feedback,

              mensaje: ''
            })
          }
        />


        <Link
          to={
            `/gestion/pedidos/${pedido_id}`
          }

          className="btn-volver"
        >
          ← Volver al detalle
        </Link>


        <div className="pedidos-header">

          <div>

            <h1>
              Pedido #{pedido.pedido_id}
            </h1>


            <p>
              El pedido ya está completamente
              entregado.
            </p>

          </div>

        </div>


        <div className="pedidos-card">

          <div className="pedido-item-aviso-entrega">

            Este pedido ya se encuentra{' '}

            <strong>
              completamente entregado
            </strong>.

            {' '}

            Por seguridad ya no puede
            modificarse.

          </div>


          <Link
            to={
              `/gestion/pedidos/${pedido_id}`
            }

            className="btn-outline"
          >
            Ver detalle del pedido
          </Link>

        </div>

      </div>
    );
  }


  /* =========================================================
     PEDIDO CANCELADO
     ========================================================= */

  if (
    pedido.estado_pedido ===
    'CANCELADO'
  ) {
    return (
      <div className="pedidos-page">

        <Link
          to={
            `/gestion/pedidos/${pedido_id}`
          }

          className="btn-volver"
        >
          ← Volver al detalle
        </Link>


        <div className="pedidos-card">

          <h3>
            Pedido cancelado
          </h3>


          <p>
            Un pedido cancelado no puede
            modificarse.
          </p>

        </div>

      </div>
    );
  }


  /* =========================================================
     FORMULARIO PRINCIPAL
     ========================================================= */

  return (
    <div className="pedidos-page">


      {/* =====================================================
          FEEDBACK
          ===================================================== */}

      <FeedbackToast
        tipo={
          feedback.tipo
        }

        mensaje={
          feedback.mensaje
        }

        onClose={() =>
          setFeedback({
            ...feedback,

            mensaje: ''
          })
        }
      />


      {/* =====================================================
          CONFIRMACIÓN
          ===================================================== */}

      <ConfirmDialog
        abierto={
          dialogAbierto
        }

        titulo=
          "Confirmar edición del pedido"

        descripcion={
          'Se actualizarán los datos del pedido y sus productos. ' +
          'Las cantidades no pueden quedar por debajo de lo ya entregado. ' +
          'Los cambios quedarán registrados en el historial.'
        }

        textoConfirmar=
          "Actualizar pedido"

        textoProcesando=
          "Actualizando pedido..."

        procesando={
          actualizandoPedido
        }

        onConfirmar={
          confirmarEdicion
        }

        onCerrar={() => {

          if (
            !actualizandoPedido
          ) {
            setDialogAbierto(
              false
            );
          }
        }}
      />


      {/* =====================================================
          VOLVER
          ===================================================== */}

      <Link
        to={
          `/gestion/pedidos/${pedido_id}`
        }

        className="btn-volver"
      >
        ← Volver al detalle
      </Link>


      {/* =====================================================
          CABECERA
          ===================================================== */}

      <div className="pedidos-header">

        <div>

          <h1>
            Editar pedido #{pedido.pedido_id}
          </h1>


          <p>
            Modifica la información del pedido,
            los productos registrados o agrega
            nuevos productos.
          </p>

        </div>

      </div>


      {/* =====================================================
          FORMULARIO
          ===================================================== */}

      <form
        className="form-card pedido-form"

        onSubmit={
          prepararEdicion
        }
      >


        {/* ===================================================
            DATOS DEL PEDIDO
            =================================================== */}

        <h3>
          Datos del pedido
        </h3>


        {/* CLIENTE */}

        <label>
          Cliente
        </label>


        <select
          name="cliente_id"

          value={
            form.cliente_id
          }

          onChange={
            handleChange
          }

          disabled={
            actualizandoPedido
          }
        >

          <option value="">
            Seleccione cliente
          </option>


          {clientes.map(
            (cliente) => (

              <option
                key={
                  cliente.cliente_id
                }

                value={
                  cliente.cliente_id
                }
              >
                {
                  cliente.razon_social
                }

                {' - '}

                {
                  cliente.ruc
                }
              </option>

            )
          )}

        </select>


        {/* CÓDIGO */}

        <label>
          Código de pedido
        </label>


        <input
          name="codigo_pedido"

          value={
            form.codigo_pedido
          }

          onChange={
            handleChange
          }

          placeholder="Ejemplo: PED-001"

          disabled={
            actualizandoPedido
          }
        />


        {/* FECHA PEDIDO */}

        <label>
          Fecha de pedido
        </label>


        <input
          type="date"

          name="fecha_pedido"

          value={
            form.fecha_pedido
          }

          onChange={
            handleChange
          }

          disabled={
            actualizandoPedido
          }
        />


        {/* FECHA ENTREGA */}

        <label>
          Fecha de entrega estimada
        </label>


        <input
          type="date"

          name="fecha_entrega_estimada"

          value={
            form.fecha_entrega_estimada
          }

          onChange={
            handleChange
          }

          disabled={
            actualizandoPedido
          }
        />


        {/* DESCRIPCIÓN PEDIDO */}

        <label>
          Descripción del pedido
        </label>


        <textarea
          name="descripcion_pedido"

          value={
            form.descripcion_pedido
          }

          onChange={
            handleChange
          }

          rows={3}

          disabled={
            actualizandoPedido
          }
        />


        {/* ===================================================
            PRODUCTOS EXISTENTES
            =================================================== */}

        <PedidoItemsEditor
          detalles={
            detallesEditados
          }

          setDetalles={
            setDetallesEditados
          }

          tipos={
            tipos
          }

          medidas={
            medidas
          }

          colores={
            colores
          }

          materiales={
            materiales
          }

          unidades={
            unidades
          }

          titulo=
            "Editar productos registrados"

          permitirAgregar={
            false
          }

          permitirQuitar={
            false
          }

          bloquearEstructuraConEntrega={
            true
          }

          mostrarResumenEntrega={
            true
          }

          procesando={
            actualizandoPedido
          }

          onFeedback={
            mostrarFeedback
          }
        />


        {/* ===================================================
            PRODUCTOS NUEVOS
            =================================================== */}

        <PedidoItemsEditor
          detalles={
            nuevosDetalles
          }

          setDetalles={
            setNuevosDetalles
          }

          tipos={
            tipos
          }

          medidas={
            medidas
          }

          colores={
            colores
          }

          materiales={
            materiales
          }

          unidades={
            unidades
          }

          titulo=
            "Agregar nuevos productos opcionales"

          textoBotonAgregar=
            "+ Agregar otro producto nuevo"

          permitirAgregar={
            true
          }

          permitirQuitar={
            true
          }

          bloquearEstructuraConEntrega={
            false
          }

          mostrarResumenEntrega={
            false
          }

          procesando={
            actualizandoPedido
          }

          onFeedback={
            mostrarFeedback
          }
        />


        {/* ===================================================
            MOTIVO DEL CAMBIO
            =================================================== */}

        <div className="pedido-motivo-edicion">

          <label>
            Motivo del cambio
          </label>


          <textarea
            name="motivo_cambio"

            value={
              form.motivo_cambio
            }

            onChange={
              handleChange
            }

            rows={3}

            placeholder="Ejemplo: El cliente solicitó modificar la cantidad y el precio acordado."

            disabled={
              actualizandoPedido
            }
          />


          <span className="muted">

            El motivo quedará registrado
            en el historial del pedido.

          </span>

        </div>


        {/* ===================================================
            GUARDAR
            =================================================== */}

        <div className="pedido-edicion-actions">

          <button
            type="submit"

            disabled={
              actualizandoPedido
            }
          >
            {
              actualizandoPedido
                ? 'Actualizando pedido...'
                : 'Actualizar pedido'
            }
          </button>

        </div>

      </form>

    </div>
  );
}


export default EditarPedido;