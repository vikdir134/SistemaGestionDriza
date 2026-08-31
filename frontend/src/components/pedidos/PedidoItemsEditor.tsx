import type {
  ChangeEvent
} from 'react';


export type DetallePedidoForm = {
  /*
   * Estos campos solamente existen
   * cuando estamos editando un producto
   * que ya pertenece al pedido.
   */
  pedido_detalle_id?: number;

  cantidad_entregada?: number;

  cantidad_pendiente?: number;

  estado_entrega?: string;

  /*
   * Código visible de la unidad.
   *
   * Ejemplos:
   * KG
   * CONO
   * TUBO
   */
  unidad?: string;


  /* =========================================================
     CAMPOS DEL PRODUCTO
     ========================================================= */

  tipo_producto_id: string;

  medida_id: string;

  color_id: string;

  material_id: string;

  cantidad_pedida: string;

  unidad_medida_id: string;

  cantidad_presentacion: string;

  unidad_presentacion_id: string;

  precio_unitario: string;

  moneda_codigo: string;

  descripcion_item: string;

  observacion: string;
};


export const detallePedidoVacio:
  DetallePedidoForm = {

  tipo_producto_id: '',

  medida_id: '',

  color_id: '',

  material_id: '',

  cantidad_pedida: '',

  unidad_medida_id: '',

  cantidad_presentacion: '',

  unidad_presentacion_id: '',

  precio_unitario: '',

  moneda_codigo: 'PEN',

  descripcion_item: '',

  observacion: ''
};


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type PedidoItemsEditorProps = {
  detalles: DetallePedidoForm[];

  setDetalles: (
    detalles: DetallePedidoForm[]
  ) => void;


  tipos: any[];

  medidas: any[];

  colores: any[];

  materiales: any[];

  unidades: any[];


  titulo?: string;

  textoBotonAgregar?: string;


  /*
   * RegistrarPedido:
   * true
   *
   * Productos existentes:
   * false
   */
  permitirAgregar?: boolean;


  /*
   * RegistrarPedido y productos nuevos:
   * true
   *
   * Productos existentes:
   * false
   *
   * Por ahora no estamos implementando
   * eliminación de productos existentes.
   */
  permitirQuitar?: boolean;


  /*
   * Cuando cantidad_entregada > 0:
   *
   * bloqueamos:
   * - tipo
   * - medida
   * - color
   * - material
   * - unidad
   * - moneda
   *
   * pero seguimos permitiendo:
   * - cantidad
   * - presentación
   * - precio
   * - descripción
   * - observación
   */
  bloquearEstructuraConEntrega?: boolean;


  /*
   * Permite bloquear todo el editor
   * mientras se está enviando
   * el PUT / POST.
   */
  procesando?: boolean;


  /*
   * En EditarPedido mostramos:
   *
   * - cantidad pedida
   * - cantidad entregada
   * - cantidad pendiente
   * - estado
   */
  mostrarResumenEntrega?: boolean;


  onFeedback?: (
    tipo: FeedbackTipo,
    mensaje: string
  ) => void;
};


function PedidoItemsEditor({
  detalles,

  setDetalles,

  tipos,

  medidas,

  colores,

  materiales,

  unidades,

  titulo =
    'Productos del pedido',

  textoBotonAgregar =
    '+ Agregar producto',

  permitirAgregar = true,

  permitirQuitar = true,

  bloquearEstructuraConEntrega =
    false,

  procesando = false,

  mostrarResumenEntrega = false,

  onFeedback
}: PedidoItemsEditorProps) {


  /* =========================================================
     CAMBIO DE CAMPOS
     ========================================================= */

  const handleDetalleChange = (
    index: number,

    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {
    if (procesando) {
      return;
    }


    const {
      name,
      value
    } = e.target;


    const nuevosDetalles = [
      ...detalles
    ];


    /*
     * La unidad de presentación sigue
     * automáticamente la unidad principal.
     *
     * Conservamos esta lógica actual
     * del sistema.
     */
    if (
      name ===
      'unidad_medida_id'
    ) {
      nuevosDetalles[index] = {
        ...nuevosDetalles[index],

        unidad_medida_id:
          value,

        unidad_presentacion_id:
          value
      };

    } else {
      nuevosDetalles[index] = {
        ...nuevosDetalles[index],

        [name]:
          value
      };
    }


    setDetalles(
      nuevosDetalles
    );
  };


  /* =========================================================
     AGREGAR PRODUCTO
     ========================================================= */

  const agregarDetalle = () => {
    if (
      procesando ||
      !permitirAgregar
    ) {
      return;
    }


    setDetalles([
      ...detalles,

      {
        ...detallePedidoVacio
      }
    ]);


    onFeedback?.(
      'success',
      'Producto agregado al pedido'
    );
  };


  /* =========================================================
     QUITAR PRODUCTO
     ========================================================= */

  const quitarDetalle = (
    index: number
  ) => {
    if (
      procesando ||
      !permitirQuitar
    ) {
      return;
    }


    /*
     * Debe mantenerse por lo menos
     * una fila en el editor.
     */
    if (
      detalles.length === 1
    ) {
      onFeedback?.(
        'error',
        'Debe existir al menos un producto en el pedido'
      );

      return;
    }


    setDetalles(
      detalles.filter(
        (_, i) =>
          i !== index
      )
    );


    onFeedback?.(
      'warning',
      'Producto retirado del pedido'
    );
  };


  /* =========================================================
     SUBTOTAL
     ========================================================= */

  const calcularSubtotal = (
    detalle: DetallePedidoForm
  ) => {
    const cantidad =
      Number(
        detalle.cantidad_pedida ||
        0
      );


    const precio =
      Number(
        detalle.precio_unitario ||
        0
      );


    return (
      cantidad *
      precio
    );
  };


  /* =========================================================
     CLASE DE ESTADO
     ========================================================= */

  const claseEstado = (
    estado: string
  ) => {
    if (
      estado === 'COMPLETO'
    ) {
      return (
        'estado estado-completo'
      );
    }


    if (
      estado === 'PARCIAL'
    ) {
      return (
        'estado estado-parcial'
      );
    }


    return (
      'estado estado-pendiente'
    );
  };


  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="pedido-productos-section">


      {/* =====================================================
          CABECERA
          ===================================================== */}

      <div className="pedido-productos-header">

        <h3>
          {titulo}
        </h3>


        {permitirAgregar && (
          <button
            type="button"
            onClick={
              agregarDetalle
            }
            disabled={
              procesando
            }
          >
            {
              textoBotonAgregar
            }
          </button>
        )}

      </div>


      {/* =====================================================
          PRODUCTOS
          ===================================================== */}

      {detalles.map(
        (
          detalle,
          index
        ) => {

          /* =================================================
             CANTIDADES ACTUALES
             ================================================= */

          const cantidadEntregada =
            Number(
              detalle.cantidad_entregada ||
              0
            );


          const cantidadPedidaActual =
            Number(
              detalle.cantidad_pedida ||
              0
            );


          /*
           * IMPORTANTE:
           *
           * Este valor NO utiliza
           * detalle.cantidad_pendiente.
           *
           * Lo calculamos en tiempo real
           * porque cantidad_pedida puede estar
           * siendo modificada en pantalla.
           */
          const cantidadPendienteActual =
            cantidadPedidaActual -
            cantidadEntregada;


          /* =================================================
             ESTADO EN TIEMPO REAL
             ================================================= */

          let estadoActual =
            'PENDIENTE';


          if (
            cantidadEntregada > 0 &&
            cantidadPedidaActual > 0 &&
            cantidadEntregada >=
              cantidadPedidaActual
          ) {
            estadoActual =
              'COMPLETO';

          } else if (
            cantidadEntregada > 0
          ) {
            estadoActual =
              'PARCIAL';
          }


          /* =================================================
             BLOQUEO ESTRUCTURAL
             ================================================= */

          /*
           * Si el producto ya tuvo entregas:
           *
           * NO:
           * - tipo
           * - medida
           * - color
           * - material
           * - unidad
           * - moneda
           *
           * SÍ:
           * - cantidad
           * - presentación
           * - precio
           * - descripción
           * - observación
           */
          const estructuraBloqueada =
            procesando ||
            (
              bloquearEstructuraConEntrega &&
              cantidadEntregada > 0
            );


          /* =================================================
             CANTIDAD MÍNIMA
             ================================================= */

          /*
           * Si ya entregamos 80 KG,
           * visualmente el input tendrá:
           *
           * min = 80
           *
           * El backend sigue siendo la
           * validación definitiva.
           */
          const cantidadMinima =
            cantidadEntregada > 0
              ? cantidadEntregada
              : 0.001;


          return (
            <div
              className="detalle-card"

              key={
                detalle
                  .pedido_detalle_id ??
                index
              }
            >


              {/* =============================================
                  CABECERA DEL PRODUCTO
                  ============================================= */}

              <div className="detalle-header">

                <div>

                  <strong>
                    {
                      detalle
                        .pedido_detalle_id
                        ? `Producto registrado #${detalle.pedido_detalle_id}`
                        : `Producto ${index + 1}`
                    }
                  </strong>


                  {mostrarResumenEntrega &&
                    detalle.pedido_detalle_id && (
                      <>
                        {' '}

                        <span
                          className={
                            claseEstado(
                              estadoActual
                            )
                          }
                        >
                          {
                            estadoActual
                          }
                        </span>
                      </>
                    )}

                </div>


                {permitirQuitar && (
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
                )}

              </div>


              {/* =============================================
                  INFORMACIÓN DE ENTREGA
                  ============================================= */}

              {mostrarResumenEntrega &&
                detalle.pedido_detalle_id && (

                  <div className="pedido-item-entrega-info">


                    {/* PEDIDO */}

                    <div>

                      <span>
                        Pedido actual
                      </span>

                      <strong>
                        {
                          detalle
                            .cantidad_pedida ||
                          0
                        }
                        {' '}
                        {
                          detalle.unidad ||
                          ''
                        }
                      </strong>

                    </div>


                    {/* ENTREGADO */}

                    <div>

                      <span>
                        Ya entregado
                      </span>

                      <strong>
                        {
                          cantidadEntregada
                        }
                        {' '}
                        {
                          detalle.unidad ||
                          ''
                        }
                      </strong>

                    </div>


                    {/* PENDIENTE */}

                    <div>

                      <span>
                        Pendiente actual
                      </span>

                      <strong>
                        {
                          cantidadPendienteActual
                        }
                        {' '}
                        {
                          detalle.unidad ||
                          ''
                        }
                      </strong>

                    </div>

                  </div>
                )}


              {/* =============================================
                  AVISO DE PRODUCTO CON ENTREGAS
                  ============================================= */}

              {bloquearEstructuraConEntrega &&
                cantidadEntregada > 0 && (

                  <div className="pedido-item-aviso-entrega">

                    Este producto ya tiene{' '}

                    <strong>
                      {cantidadEntregada}{' '}
                      {detalle.unidad || ''}
                    </strong>

                    {' '}entregados.

                    {' '}

                    Puedes modificar la cantidad,
                    presentación, precio,
                    descripción y observación.

                    {' '}

                    La nueva cantidad no puede ser
                    menor a lo ya entregado.

                  </div>
                )}


              {/* =============================================
                  CAMPOS PRINCIPALES
                  ============================================= */}

              <div className="detalle-grid detalle-grid-5">


                {/* ===========================================
                    TIPO
                    =========================================== */}

                <div>

                  <label>
                    Tipo
                  </label>


                  <select
                    name="tipo_producto_id"

                    value={
                      detalle
                        .tipo_producto_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
                    }
                  >

                    <option value="">
                      Seleccione
                    </option>


                    {tipos.map(
                      (tipo) => (

                        <option
                          key={
                            tipo.id
                          }

                          value={
                            tipo.id
                          }
                        >
                          {
                            tipo.nombre
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* ===========================================
                    MEDIDA
                    =========================================== */}

                <div>

                  <label>
                    Medida
                  </label>


                  <select
                    name="medida_id"

                    value={
                      detalle.medida_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
                    }
                  >

                    <option value="">
                      Seleccione
                    </option>


                    {medidas.map(
                      (medida) => (

                        <option
                          key={
                            medida.id
                          }

                          value={
                            medida.id
                          }
                        >
                          {
                            medida.nombre
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* ===========================================
                    COLOR
                    =========================================== */}

                <div>

                  <label>
                    Color
                  </label>


                  <select
                    name="color_id"

                    value={
                      detalle.color_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
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


                {/* ===========================================
                    MATERIAL
                    =========================================== */}

                <div>

                  <label>
                    Material
                  </label>


                  <select
                    name="material_id"

                    value={
                      detalle.material_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
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
                            material.nombre
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* ===========================================
                    CANTIDAD
                    =========================================== */}

                <div>

                  <label>
                    Cantidad total
                  </label>


                  <input
                    type="number"

                    name="cantidad_pedida"

                    value={
                      detalle
                        .cantidad_pedida
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    placeholder="0"

                    min={
                      cantidadMinima
                    }

                    step="0.001"

                    disabled={
                      procesando
                    }
                  />


                  {cantidadEntregada > 0 && (

                    <span className="muted">

                      Mínimo permitido:{' '}

                      {
                        cantidadEntregada
                      }

                      {' '}

                      {
                        detalle.unidad ||
                        ''
                      }

                    </span>

                  )}

                </div>


                {/* ===========================================
                    UNIDAD
                    =========================================== */}

                <div>

                  <label>
                    Unidad
                  </label>


                  <select
                    name="unidad_medida_id"

                    value={
                      detalle
                        .unidad_medida_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
                    }
                  >

                    <option value="">
                      Seleccione
                    </option>


                    {unidades.map(
                      (unidad) => (

                        <option
                          key={
                            unidad
                              .unidad_medida_id
                          }

                          value={
                            unidad
                              .unidad_medida_id
                          }
                        >
                          {
                            unidad.codigo
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* ===========================================
                    PRESENTACIÓN
                    =========================================== */}

                <div>

                  <label>
                    Presentación
                  </label>


                  <input
                    type="number"

                    name="cantidad_presentacion"

                    value={
                      detalle
                        .cantidad_presentacion
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    placeholder="0"

                    min="0.001"

                    step="0.001"

                    disabled={
                      procesando
                    }
                  />

                </div>


                {/* ===========================================
                    UNIDAD DE PRESENTACIÓN
                    =========================================== */}

                <div>

                  <label>
                    Unidad presentación
                  </label>


                  <select
                    name="unidad_presentacion_id"

                    value={
                      detalle
                        .unidad_presentacion_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    /*
                     * Actualmente la unidad
                     * de presentación sigue
                     * la unidad principal.
                     */
                    disabled
                  >

                    <option value="">
                      Igual a unidad
                    </option>


                    {unidades.map(
                      (unidad) => (

                        <option
                          key={
                            unidad
                              .unidad_medida_id
                          }

                          value={
                            unidad
                              .unidad_medida_id
                          }
                        >
                          {
                            unidad.codigo
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* ===========================================
                    PRECIO
                    =========================================== */}

                <div>

                  <label>
                    Precio
                  </label>


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

                    placeholder="0.00"

                    min="0.01"

                    step="0.0001"

                    disabled={
                      procesando
                    }
                  />

                </div>


                {/* ===========================================
                    MONEDA
                    =========================================== */}

                <div>

                  <label>
                    Moneda
                  </label>


                  <select
                    name="moneda_codigo"

                    value={
                      detalle
                        .moneda_codigo
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
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


                {/* ===========================================
                    SUBTOTAL
                    =========================================== */}

                <div>

                  <label>
                    Subtotal
                  </label>


                  <input
                    value={
                      calcularSubtotal(
                        detalle
                      ).toFixed(2)
                    }

                    disabled
                  />

                </div>

              </div>


              {/* =============================================
                  DESCRIPCIÓN Y OBSERVACIÓN
                  ============================================= */}

              <div className="detalle-textos-grid">


                {/* DESCRIPCIÓN */}

                <div>

                  <label>
                    Descripción del producto
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

                    placeholder="Ejemplo: DRIZA POLIESTER 1/4 BLANCO"

                    disabled={
                      procesando
                    }
                  />

                </div>


                {/* OBSERVACIÓN */}

                <div>

                  <label>
                    Observación
                  </label>


                  <input
                    name="observacion"

                    value={
                      detalle.observacion
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    placeholder="Observación opcional"

                    disabled={
                      procesando
                    }
                  />

                </div>

              </div>

            </div>
          );
        }
      )}

    </div>
  );
}


export default PedidoItemsEditor;