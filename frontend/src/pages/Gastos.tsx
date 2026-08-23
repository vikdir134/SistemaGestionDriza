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
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import FeedbackToast
  from '../components/common/FeedbackToast';

import ConfirmDialog
  from '../components/common/ConfirmDialog';

import GastoForm, {
  gastoFormVacio,
  validarGastoForm,
  type GastoFormData
} from '../components/gastos/GastoForm';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type FiltrosGasto = {
  tipo_gasto_id: string;
  proveedor_id: string;
  moneda_codigo: string;
  q: string;
};


const filtrosVacios: FiltrosGasto = {
  tipo_gasto_id: '',
  proveedor_id: '',
  moneda_codigo: '',
  q: ''
};


function Gastos() {
  const [
    gastos,
    setGastos
  ] = useState<any[]>([]);

  const [
    tiposGasto,
    setTiposGasto
  ] = useState<any[]>([]);

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>([]);


  const [
    page,
    setPage
  ] = useState(1);


  const [
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  /*
   * filtros:
   * lo que actualmente está escribiendo
   * o seleccionando el usuario.
   */
  const [
    filtros,
    setFiltros
  ] = useState<FiltrosGasto>({
    ...filtrosVacios
  });


  /*
   * filtrosAplicados:
   * filtros realmente utilizados por
   * el listado y la paginación.
   */
  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<FiltrosGasto>({
    ...filtrosVacios
  });


  const [
    form,
    setForm
  ] = useState<GastoFormData>({
    ...gastoFormVacio
  });


  const [
    nuevoTipo,
    setNuevoTipo
  ] = useState('');


  const [
    gastoAEliminar,
    setGastoAEliminar
  ] = useState<any | null>(null);


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


  /*
   * Cada operación crítica tiene
   * su propio bloqueo.
   */
  const {
    procesando: registrandoTipo,
    intentarBloquear:
      bloquearRegistroTipo,
    liberar:
      liberarRegistroTipo
  } = useBloqueoAccion();


  const {
    procesando: registrandoGasto,
    intentarBloquear:
      bloquearRegistroGasto,
    liberar:
      liberarRegistroGasto
  } = useBloqueoAccion();


  const {
    procesando: eliminandoGasto,
    intentarBloquear:
      bloquearEliminacion,
    liberar:
      liberarEliminacion
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
     DATOS BASE
     ========================================================= */

  const cargarDatosBase =
    useCallback(
      async () => {
        const [
          tiposData,
          proveedoresData
        ] = await Promise.all([
          apiFetch(
            '/gastos/tipos'
          ),

          apiFetch(
            '/proveedores'
          )
        ]);

        setTiposGasto(
          tiposData.tipos
        );

        setProveedores(
          proveedoresData.proveedores
        );
      },
      []
    );


  /* =========================================================
     LISTADO PAGINADO
     ========================================================= */

  const cargarGastos =
    useCallback(
      async (
        paginaActual: number,
        filtrosActuales: FiltrosGasto
      ) => {
        const params =
          new URLSearchParams();

        params.append(
          'page',
          String(paginaActual)
        );

        params.append(
          'limit',
          '10'
        );


        if (
          filtrosActuales.tipo_gasto_id
        ) {
          params.append(
            'tipo_gasto_id',
            filtrosActuales.tipo_gasto_id
          );
        }


        if (
          filtrosActuales.proveedor_id
        ) {
          params.append(
            'proveedor_id',
            filtrosActuales.proveedor_id
          );
        }


        if (
          filtrosActuales.moneda_codigo
        ) {
          params.append(
            'moneda_codigo',
            filtrosActuales.moneda_codigo
          );
        }


        if (
          filtrosActuales.q.trim()
        ) {
          params.append(
            'q',
            filtrosActuales.q.trim()
          );
        }


        const data =
          await apiFetch(
            `/gastos?${params.toString()}`
          );


        setGastos(
          data.gastos
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  /*
   * Tipos y proveedores.
   */
  useEffect(() => {
    const iniciar =
      async () => {
        try {
          await cargarDatosBase();

        } catch (error: any) {
          mostrarFeedback(
            'error',
            error.message
          );
        }
      };

    iniciar();
  }, [cargarDatosBase]);


  /*
   * Listado.
   *
   * Al cambiar página o aplicar
   * filtros, vuelve a consultar.
   */
  useEffect(() => {
    const cargar =
      async () => {
        try {
          await cargarGastos(
            page,
            filtrosAplicados
          );

        } catch (error: any) {
          mostrarFeedback(
            'error',
            error.message
          );
        }
      };

    cargar();

  }, [
    page,
    filtrosAplicados,
    cargarGastos
  ]);


  /* =========================================================
     CAMBIOS DE FORMULARIO
     ========================================================= */

  const handleFormChange = (
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


  const handleFiltroChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {
    setFiltros({
      ...filtros,
      [e.target.name]:
        e.target.value
    });
  };


  /* =========================================================
     REGISTRAR TIPO DE GASTO
     ========================================================= */

  const registrarTipoGasto =
    async (
      e: FormEvent
    ) => {
      e.preventDefault();


      const nombre =
        nuevoTipo.trim();


      if (!nombre) {
        mostrarFeedback(
          'error',
          'Ingrese el nombre del tipo de gasto'
        );

        return;
      }


      if (
        !bloquearRegistroTipo()
      ) {
        return;
      }


      try {
        await apiFetch(
          '/gastos/tipos',
          {
            method: 'POST',

            body: JSON.stringify({
              nombre
            })
          }
        );


        setNuevoTipo('');


        mostrarFeedback(
          'success',
          'Tipo de gasto registrado correctamente'
        );


        /*
         * Si la recarga falla, el registro
         * ya fue creado. No debemos decir
         * que el POST falló.
         */
        try {
          await cargarDatosBase();

        } catch (error: any) {
          mostrarFeedback(
            'warning',
            'El tipo de gasto fue registrado, pero no se pudo actualizar la lista. Recarga la página.'
          );
        }

      } catch (error: any) {
        mostrarFeedback(
          'error',
          error.message
        );

      } finally {
        liberarRegistroTipo();
      }
    };


  /* =========================================================
     REGISTRAR GASTO
     ========================================================= */

  const registrarGasto =
    async (
      e: FormEvent
    ) => {
      e.preventDefault();


      const errorValidacion =
        validarGastoForm(
          form,
          false
        );


      if (errorValidacion) {
        mostrarFeedback(
          'error',
          errorValidacion
        );

        return;
      }


      if (
        !bloquearRegistroGasto()
      ) {
        return;
      }


      try {
        await apiFetch(
          '/gastos',
          {
            method: 'POST',

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
                form.fecha_gasto ||
                undefined,

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


        setForm({
          ...gastoFormVacio
        });


        mostrarFeedback(
          'success',
          'Gasto registrado correctamente'
        );


        /*
         * Actualizamos el listado.
         *
         * Separado del POST para evitar
         * confundir una falla del GET con
         * una falla al registrar.
         */
        try {
          if (page !== 1) {
            setPage(1);

          } else {
            await cargarGastos(
              1,
              filtrosAplicados
            );
          }

        } catch (error: any) {
          mostrarFeedback(
            'warning',
            'El gasto fue registrado correctamente, pero no se pudo actualizar el listado. Recarga la página.'
          );
        }

      } catch (error: any) {
        mostrarFeedback(
          'error',
          error.message
        );

      } finally {
        liberarRegistroGasto();
      }
    };


  /* =========================================================
     FILTROS
     ========================================================= */

  const aplicarFiltros = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPage(1);

    setFiltrosAplicados({
      ...filtros
    });
  };


  const limpiarFiltros = () => {
    setFiltros({
      ...filtrosVacios
    });

    setFiltrosAplicados({
      ...filtrosVacios
    });

    setPage(1);
  };


  /* =========================================================
     ELIMINACIÓN
     ========================================================= */

  const solicitarEliminar = (
    gasto: any
  ) => {
    setGastoAEliminar(
      gasto
    );
  };


  const confirmarEliminacion =
    async () => {
      if (!gastoAEliminar) {
        return;
      }


      if (
        !bloquearEliminacion()
      ) {
        return;
      }


      const gastoId =
        gastoAEliminar.gasto_id;


      try {
        await apiFetch(
          `/gastos/${gastoId}`,
          {
            method: 'DELETE'
          }
        );


        setGastoAEliminar(
          null
        );


        mostrarFeedback(
          'warning',
          `Gasto #${gastoId} eliminado correctamente`
        );


        /*
         * Si eliminamos el último registro
         * de una página distinta de la 1,
         * retrocedemos una página.
         */
        if (
          gastos.length === 1 &&
          page > 1
        ) {
          setPage(
            (paginaActual) =>
              paginaActual - 1
          );

        } else {
          try {
            await cargarGastos(
              page,
              filtrosAplicados
            );

          } catch (error: any) {
            mostrarFeedback(
              'warning',
              `El gasto #${gastoId} fue eliminado, pero no se pudo actualizar el listado. Recarga la página.`
            );
          }
        }

      } catch (error: any) {
        mostrarFeedback(
          'error',
          error.message
        );

      } finally {
        liberarEliminacion();
      }
    };


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


      <ConfirmDialog
        abierto={
          gastoAEliminar !== null
        }
        titulo={
          gastoAEliminar
            ? `Eliminar gasto #${gastoAEliminar.gasto_id}`
            : 'Eliminar gasto'
        }
        descripcion={
          gastoAEliminar
            ? `Se retirará del registro activo el gasto ${gastoAEliminar.tipo_gasto} por ${Number(gastoAEliminar.monto).toFixed(2)} ${gastoAEliminar.moneda_codigo}. El registro permanecerá almacenado para auditoría.`
            : ''
        }
        textoConfirmar="Eliminar gasto"
        textoProcesando="Eliminando gasto..."
        procesando={eliminandoGasto}
        onConfirmar={
          confirmarEliminacion
        }
        onCerrar={() => {
          if (!eliminandoGasto) {
            setGastoAEliminar(
              null
            );
          }
        }}
      />


      <div className="pedidos-header">
        <div>
          <h1>
            Gastos
          </h1>

          <p>
            Registra, consulta, edita
            y administra los gastos de
            la empresa.
          </p>
        </div>
      </div>


      <div className="gastos-config-grid">

        <form
          className="form-card gasto-tipo-card"
          onSubmit={
            registrarTipoGasto
          }
        >
          <h3>
            Registrar tipo de gasto
          </h3>

          <label>
            Nuevo tipo
          </label>

          <input
            value={nuevoTipo}
            onChange={(e) =>
              setNuevoTipo(
                e.target.value
              )
            }
            placeholder="Ejemplo: COMBUSTIBLE"
            disabled={registrandoTipo}
          />

          <button
            type="submit"
            disabled={registrandoTipo}
          >
            {registrandoTipo
              ? 'Guardando tipo...'
              : 'Guardar tipo'}
          </button>
        </form>


        <GastoForm
          titulo="Registrar gasto"
          form={form}
          tiposGasto={tiposGasto}
          proveedores={proveedores}
          procesando={registrandoGasto}
          textoBoton="Guardar gasto"
          textoProcesando="Registrando gasto..."
          onChange={handleFormChange}
          onSubmit={registrarGasto}
        />

      </div>


      <form
        className="filtros-card"
        onSubmit={aplicarFiltros}
      >

        <div>
          <label>
            Tipo de gasto
          </label>

          <select
            name="tipo_gasto_id"
            value={
              filtros.tipo_gasto_id
            }
            onChange={
              handleFiltroChange
            }
          >
            <option value="">
              Todos
            </option>

            {tiposGasto.map(
              (tipo) => (
                <option
                  key={
                    tipo.tipo_gasto_id
                  }
                  value={
                    tipo.tipo_gasto_id
                  }
                >
                  {tipo.nombre}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Proveedor
          </label>

          <select
            name="proveedor_id"
            value={
              filtros.proveedor_id
            }
            onChange={
              handleFiltroChange
            }
          >
            <option value="">
              Todos
            </option>

            {proveedores.map(
              (proveedor) => (
                <option
                  key={
                    proveedor.proveedor_id
                  }
                  value={
                    proveedor.proveedor_id
                  }
                >
                  {
                    proveedor.razon_social
                  }
                  {' - '}
                  {proveedor.ruc}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Moneda
          </label>

          <select
            name="moneda_codigo"
            value={
              filtros.moneda_codigo
            }
            onChange={
              handleFiltroChange
            }
          >
            <option value="">
              Todas
            </option>

            <option value="PEN">
              Soles
            </option>

            <option value="USD">
              Dólares
            </option>
          </select>
        </div>


        <div>
          <label>
            Buscar
          </label>

          <input
            name="q"
            value={filtros.q}
            onChange={
              handleFiltroChange
            }
            placeholder="Descripción, comprobante o proveedor"
          />
        </div>


        <div className="filtros-actions">
          <button type="submit">
            Buscar
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={
              limpiarFiltros
            }
          >
            Limpiar
          </button>
        </div>

      </form>


      <div className="pedidos-card">
        <h3>
          Listado de gastos
        </h3>

        <div className="tabla-responsive">
          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo / descripción</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Moneda</th>
                <th>Comprobante</th>
                <th>Registrado por</th>
                <th>Acciones</th>
              </tr>
            </thead>


            <tbody>

              {gastos.map(
                (gasto) => (
                  <tr
                    key={
                      gasto.gasto_id
                    }
                  >
                    <td>
                      #{gasto.gasto_id}
                    </td>


                    <td>
                      <strong>
                        {gasto.tipo_gasto}
                      </strong>

                      <br />

                      <span className="muted">
                        {
                          gasto.descripcion ||
                          'Sin descripción'
                        }
                      </span>
                    </td>


                    <td>
                      {gasto.proveedor ? (
                        <>
                          <strong>
                            {
                              gasto.proveedor
                            }
                          </strong>

                          <br />

                          <span className="muted">
                            {
                              gasto.proveedor_ruc ||
                              ''
                            }
                          </span>
                        </>
                      ) : (
                        '-'
                      )}
                    </td>


                    <td>
                      {
                        gasto.fecha_gasto
                          ?.slice(
                            0,
                            10
                          )
                      }
                    </td>


                    <td>
                      <strong>
                        {Number(
                          gasto.monto
                        ).toFixed(2)}
                      </strong>
                    </td>


                    <td>
                      {
                        gasto.moneda_codigo
                      }
                    </td>


                    <td>
                      {
                        gasto.comprobante ||
                        '-'
                      }
                    </td>


                    <td>
                      {
                        gasto.registrado_por
                      }
                    </td>


                    <td>
                      <div className="tabla-acciones">

                        <Link
                          className="btn-outline"
                          to={
                            `/gestion/gastos/${gasto.gasto_id}/editar`
                          }
                        >
                          Editar
                        </Link>


                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() =>
                            solicitarEliminar(
                              gasto
                            )
                          }
                        >
                          Eliminar
                        </button>

                      </div>
                    </td>
                  </tr>
                )
              )}


              {gastos.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    No hay gastos registrados.
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>


        <div className="paginado">

          <button
            type="button"
            disabled={page <= 1}
            onClick={() =>
              setPage(
                page - 1
              )
            }
          >
            Anterior
          </button>


          <span>
            Página {paginacion.page}
            {' de '}
            {
              paginacion.totalPaginas ||
              1
            }
          </span>


          <button
            type="button"
            disabled={
              page >=
              paginacion.totalPaginas
            }
            onClick={() =>
              setPage(
                page + 1
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


export default Gastos;