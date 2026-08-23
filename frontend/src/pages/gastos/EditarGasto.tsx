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

import GastoForm, {
  gastoFormVacio,
  validarGastoForm,
  type GastoFormData
} from '../../components/gastos/GastoForm';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function EditarGasto() {
  const {
    gasto_id
  } = useParams();

  const navigate =
    useNavigate();


  const [
    gasto,
    setGasto
  ] = useState<any | null>(
    null
  );


  const [
    tiposGasto,
    setTiposGasto
  ] = useState<any[]>([]);


  const [
    proveedores,
    setProveedores
  ] = useState<any[]>([]);


  const [
    cargando,
    setCargando
  ] = useState(true);


  const [
    form,
    setForm
  ] = useState<GastoFormData>({
    ...gastoFormVacio
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


  const {
    procesando: actualizandoGasto,
    intentarBloquear:
      bloquearActualizacion,
    liberar:
      liberarActualizacion
  } = useBloqueoAccion();


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
     CARGAR GASTO
     ========================================================= */

  const cargarDatos =
    useCallback(
      async () => {
        if (!gasto_id) {
          throw new Error(
            'ID de gasto no válido'
          );
        }


        const [
          gastoData,
          tiposData,
          proveedoresData
        ] = await Promise.all([
          apiFetch(
            `/gastos/${gasto_id}`
          ),

          apiFetch(
            '/gastos/tipos'
          ),

          apiFetch(
            '/proveedores'
          )
        ]);


        const gastoActual =
          gastoData.gasto;


        /*
         * Si el proveedor del gasto ya no
         * se encuentra activo, lo agregamos
         * al select para poder representar
         * correctamente el valor histórico.
         */
        const listaProveedores = [
          ...proveedoresData.proveedores
        ];


        if (
          gastoActual.proveedor_id &&
          !listaProveedores.some(
            (proveedor) =>
              Number(
                proveedor.proveedor_id
              ) ===
              Number(
                gastoActual.proveedor_id
              )
          )
        ) {
          listaProveedores.push({
            proveedor_id:
              gastoActual.proveedor_id,

            razon_social:
              gastoActual.proveedor ||
              'Proveedor no disponible',

            ruc:
              gastoActual.proveedor_ruc ||
              '-'
          });
        }


        setGasto(
          gastoActual
        );


        setTiposGasto(
          tiposData.tipos
        );


        setProveedores(
          listaProveedores
        );


        setForm({
          tipo_gasto_id:
            String(
              gastoActual.tipo_gasto_id
            ),

          proveedor_id:
            gastoActual.proveedor_id
              ? String(
                  gastoActual.proveedor_id
                )
              : '',

          fecha_gasto:
            gastoActual.fecha_gasto
              ?.slice(
                0,
                10
              ) || '',

          monto:
            String(
              gastoActual.monto
            ),

          moneda_codigo:
            gastoActual.moneda_codigo ||
            'PEN',

          descripcion:
            gastoActual.descripcion ||
            '',

          comprobante:
            gastoActual.comprobante ||
            ''
        });
      },
      [gasto_id]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        try {
          setCargando(true);

          await cargarDatos();

        } catch (error: any) {
          mostrarFeedback(
            'error',
            error.message
          );

        } finally {
          setCargando(false);
        }
      };

    iniciar();

  }, [cargarDatos]);


  /* =========================================================
     CAMBIO DE CAMPOS
     ========================================================= */

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };


  /* =========================================================
     ACTUALIZAR
     ========================================================= */

  const actualizarGasto =
    async (
      e: FormEvent
    ) => {
      e.preventDefault();


      const errorValidacion =
        validarGastoForm(
          form,
          true
        );


      if (errorValidacion) {
        mostrarFeedback(
          'error',
          errorValidacion
        );

        return;
      }


      if (
        !bloquearActualizacion()
      ) {
        return;
      }


      try {
        await apiFetch(
          `/gastos/${gasto_id}`,
          {
            method: 'PUT',

            body: JSON.stringify({
              tipo_gasto_id:
                Number(
                  form.tipo_gasto_id
                ),

              proveedor_id:
                form.proveedor_id
                  ? Number(
                      form.proveedor_id
                    )
                  : null,

              fecha_gasto:
                form.fecha_gasto,

              monto:
                Number(
                  form.monto
                ),

              moneda_codigo:
                form.moneda_codigo,

              descripcion:
                form.descripcion,

              comprobante:
                form.comprobante
            })
          }
        );


        mostrarFeedback(
          'success',
          'Gasto actualizado correctamente'
        );


        /*
         * No liberamos el bloqueo
         * en éxito.
         *
         * Durante el pequeño tiempo hasta
         * la redirección no queremos otro PUT.
         */
        setTimeout(() => {
          navigate(
            '/gestion/gastos'
          );
        }, 900);

      } catch (error: any) {
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

  if (cargando) {
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
          className="btn-volver"
          to="/gestion/gastos"
        >
          ← Volver a gastos
        </Link>


        <div className="pedidos-card">
          <p>
            Cargando gasto...
          </p>
        </div>

      </div>
    );
  }


  /* =========================================================
     NO ENCONTRADO
     ========================================================= */

  if (!gasto) {
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
          className="btn-volver"
          to="/gestion/gastos"
        >
          ← Volver a gastos
        </Link>


        <div className="pedidos-card">
          <h3>
            Gasto no disponible
          </h3>

          <p>
            El gasto no existe o fue
            eliminado.
          </p>
        </div>

      </div>
    );
  }


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


      <div>
        <Link
          className="btn-volver"
          to="/gestion/gastos"
        >
          ← Volver a gastos
        </Link>
      </div>


      <div className="pedidos-header">
        <div>
          <h1>
            Editar gasto #{gasto.gasto_id}
          </h1>

          <p>
            Modifica los datos del gasto.
            La última modificación quedará
            registrada en la base de datos.
          </p>
        </div>
      </div>


      <div className="gasto-auditoria-card">

        <div>
          <span>
            Registrado por
          </span>

          <strong>
            {
              gasto.registrado_por ||
              '-'
            }
          </strong>
        </div>


        <div>
          <span>
            Fecha de registro
          </span>

          <strong>
            {
              gasto.created_at
                ?.slice(
                  0,
                  10
                ) ||
              '-'
            }
          </strong>
        </div>


        <div>
          <span>
            Última modificación
          </span>

          <strong>
            {
              gasto.updated_at
                ?.slice(
                  0,
                  10
                ) ||
              'Sin modificaciones'
            }
          </strong>
        </div>


        <div>
          <span>
            Modificado por
          </span>

          <strong>
            {
              gasto.actualizado_por ||
              '-'
            }
          </strong>
        </div>

      </div>


      <GastoForm
        titulo={`Datos del gasto #${gasto.gasto_id}`}
        form={form}
        tiposGasto={tiposGasto}
        proveedores={proveedores}
        procesando={actualizandoGasto}
        textoBoton="Guardar cambios"
        textoProcesando="Actualizando gasto..."
        onChange={handleChange}
        onSubmit={actualizarGasto}
      />

    </div>
  );
}


export default EditarGasto;