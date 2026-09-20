import {
  App as AntdApp,
  Card,
  Descriptions,
  Result,
  Skeleton
} from 'antd';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import GastoForm, {
  gastoFormVacio,
  validarGastoForm,
  type GastoFormData
} from '../../components/gastos/GastoForm';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/gastosAntd.css';


function EditarGasto() {
  const {
    gasto_id
  } = useParams();

  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    gasto,
    setGasto
  ] = useState<any | null>(
    null
  );

  const [
    tiposGasto,
    setTiposGasto
  ] = useState<any[]>(
    []
  );

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>(
    []
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');

  const [
    form,
    setForm
  ] = useState<
    GastoFormData
  >({
    ...gastoFormVacio
  });


  const {
    procesando:
      actualizandoGasto,

    intentarBloquear:
      bloquearActualizacion,

    liberar:
      liberarActualizacion
  } = useBloqueoAccion();


  const cargarDatos =
    useCallback(
      async () => {
        if (
          !gasto_id
        ) {
          throw new Error(
            'Gasto no válido'
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


        const actual =
          gastoData.gasto;


        if (!actual) {
          throw new Error(
            'Gasto no encontrado'
          );
        }


        const listaProveedores = [
          ...(
            proveedoresData
              .proveedores ||
            []
          )
        ];


        /*
         * Conservamos un proveedor histórico aunque
         * hoy ya no esté activo.
         */
        if (
          actual.proveedor_id &&
          !listaProveedores.some(
            (proveedor) =>
              Number(
                proveedor
                  .proveedor_id
              ) ===
              Number(
                actual
                  .proveedor_id
              )
          )
        ) {
          listaProveedores.push({
            proveedor_id:
              actual
                .proveedor_id,

            razon_social:
              actual.proveedor ||
              'Proveedor no disponible',

            ruc:
              actual
                .proveedor_ruc ||
              '-'
          });
        }


        setGasto(
          actual
        );

        setTiposGasto(
          tiposData.tipos ||
          []
        );

        setProveedores(
          listaProveedores
        );


        setForm({
          tipo_gasto_id:
            String(
              actual
                .tipo_gasto_id
            ),

          proveedor_id:
            actual
              .proveedor_id
              ? String(
                  actual
                    .proveedor_id
                )
              : '',

          fecha_gasto:
            actual
              .fecha_gasto
              ?.slice(
                0,
                10
              ) ||
            '',

          monto:
            String(
              actual.monto
            ),

          moneda_codigo:
            actual
              .moneda_codigo ||
            'PEN',

          descripcion:
            actual
              .descripcion ||
            '',

          comprobante:
            actual
              .comprobante ||
            ''
        });
      },
      [
        gasto_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await cargarDatos();

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el gasto';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarDatos,
    message
  ]);


  const cambiarCampo =
    (
      campo:
        keyof GastoFormData,

      valor:
        string
    ) => {
      setForm(
        (actual) => ({
          ...actual,
          [campo]:
            valor
        })
      );
    };


  const actualizar =
    async () => {
      const error =
        validarGastoForm(
          form,
          true
        );


      if (error) {
        message.error(
          error
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

            body:
              JSON.stringify({
                tipo_gasto_id:
                  Number(
                    form
                      .tipo_gasto_id
                  ),

                proveedor_id:
                  form.proveedor_id
                    ? Number(
                        form
                          .proveedor_id
                      )
                    : null,

                fecha_gasto:
                  form.fecha_gasto,

                monto:
                  Number(
                    form.monto
                  ),

                moneda_codigo:
                  form
                    .moneda_codigo,

                descripcion:
                  form.descripcion,

                comprobante:
                  form.comprobante
              })
          }
        );


        message.success(
          'Gasto actualizado correctamente'
        );


        /*
         * No se libera el bloqueo antes de navegar
         * para impedir un segundo PUT durante la transición.
         */
        navigate(
          '/gestion/gastos',
          {
            replace: true
          }
        );

      } catch (error) {
        liberarActualizacion();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el gasto'
        );
      }
    };


  if (
    cargando
  ) {
    return (
      <div className="gd-gasto-page">

        <Skeleton
          active
          paragraph={{
            rows: 9
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !gasto
  ) {
    return (
      <div className="gd-gasto-page">

        <BackButton
          to="/gestion/gastos"
          label="Volver a gastos"
        />


        <Result
          status="error"
          title="Gasto no disponible"
          subTitle={
            errorCarga ||
            'El gasto no existe o fue eliminado.'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-gasto-page">

      <BackButton
        to="/gestion/gastos"
        label="Volver a gastos"
      />


      <PageHeader
        title="Editar gasto"
        description="Modifica los datos del gasto. La última actualización queda registrada para auditoría."
      />


      <Card
        title="Auditoría"
        className="gd-gasto-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 4
          }}
          items={[
            {
              key: 'creado-por',
              label:
                'Registrado por',
              children:
                gasto
                  .registrado_por ||
                '-'
            },

            {
              key: 'creado',
              label:
                'Fecha de registro',
              children:
                gasto.created_at
                  ? new Date(
                      gasto
                        .created_at
                    )
                      .toLocaleString(
                        'es-PE'
                      )
                  : '-'
            },

            {
              key: 'actualizado',
              label:
                'Última modificación',
              children:
                gasto.updated_at
                  ? new Date(
                      gasto
                        .updated_at
                    )
                      .toLocaleString(
                        'es-PE'
                      )
                  : 'Sin modificaciones'
            },

            {
              key:
                'actualizado-por',
              label:
                'Modificado por',
              children:
                gasto
                  .actualizado_por ||
                '-'
            }
          ]}
        />

      </Card>


      <GastoForm
        titulo="Datos del gasto"
        form={form}
        tiposGasto={
          tiposGasto
        }
        proveedores={
          proveedores
        }
        procesando={
          actualizandoGasto
        }
        textoBoton="Guardar cambios"
        exigirFecha
        onChange={
          cambiarCampo
        }
        onSubmit={
          actualizar
        }
      />

    </div>
  );
}


export default EditarGasto;
