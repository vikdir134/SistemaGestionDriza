import {
  useCallback,
  useEffect,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/almacenMateriaPrima.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Vista =
  | 'RESUMEN'
  | 'LOTES';


type FiltrosResumen = {
  q: string;
  material_id: string;
  color_id: string;
};


type FiltrosLotes = {
  q: string;
  proveedor_id: string;
  estado: string;
};


const filtrosResumenVacios:
  FiltrosResumen = {
  q: '',
  material_id: '',
  color_id: ''
};


const filtrosLotesVacios:
  FiltrosLotes = {
  q: '',
  proveedor_id: '',
  estado: 'TODOS'
};


function AlmacenMateriaPrima() {
  const [
    vista,
    setVista
  ] = useState<Vista>(
    'RESUMEN'
  );

  const [
    indicadores,
    setIndicadores
  ] = useState<any>({
    total_comprado_kg: 0,
    stock_total_kg: 0,
    consumido_total_kg: 0,
    lotes_registrados: 0
  });

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>([]);

  const [
    resumen,
    setResumen
  ] = useState<any[]>([]);

  const [
    lotes,
    setLotes
  ] = useState<any[]>([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    pageResumen,
    setPageResumen
  ] = useState(1);

  const [
    pageLotes,
    setPageLotes
  ] = useState(1);

  const [
    paginacionResumen,
    setPaginacionResumen
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    paginacionLotes,
    setPaginacionLotes
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    filtrosResumen,
    setFiltrosResumen
  ] = useState<FiltrosResumen>({
    ...filtrosResumenVacios
  });

  const [
    filtrosResumenAplicados,
    setFiltrosResumenAplicados
  ] = useState<FiltrosResumen>({
    ...filtrosResumenVacios
  });

  const [
    filtrosLotes,
    setFiltrosLotes
  ] = useState<FiltrosLotes>({
    ...filtrosLotesVacios
  });

  const [
    filtrosLotesAplicados,
    setFiltrosLotesAplicados
  ] = useState<FiltrosLotes>({
    ...filtrosLotesVacios
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


  const cargarIndicadores =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/almacen-materia-prima/indicadores'
          );

        setIndicadores(
          data.indicadores || {}
        );
      },
      []
    );


  const cargarCatalogos =
    useCallback(
      async () => {
        const [
          materialesData,
          coloresData,
          proveedoresData
        ] = await Promise.all([
          apiFetch(
            '/catalogos/materiales'
          ),
          apiFetch(
            '/catalogos/colores'
          ),
          apiFetch(
            '/proveedores'
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

        setProveedores(
          proveedoresData.proveedores ||
          []
        );
      },
      []
    );


  const cargarResumen =
    useCallback(
      async (
        pagina: number,
        filtrosActuales:
          FiltrosResumen
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(pagina)
        );

        params.set(
          'limit',
          '10'
        );

        if (
          filtrosActuales.q.trim()
        ) {
          params.set(
            'q',
            filtrosActuales.q.trim()
          );
        }

        if (
          filtrosActuales.material_id
        ) {
          params.set(
            'material_id',
            filtrosActuales.material_id
          );
        }

        if (
          filtrosActuales.color_id
        ) {
          params.set(
            'color_id',
            filtrosActuales.color_id
          );
        }

        const data =
          await apiFetch(
            `/almacen-materia-prima/resumen?${params.toString()}`
          );

        setResumen(
          data.resumen || []
        );

        setPaginacionResumen(
          data.paginacion
        );
      },
      []
    );


  const cargarLotes =
    useCallback(
      async (
        pagina: number,
        filtrosActuales:
          FiltrosLotes
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(pagina)
        );

        params.set(
          'limit',
          '10'
        );

        params.set(
          'estado',
          filtrosActuales.estado
        );

        if (
          filtrosActuales.q.trim()
        ) {
          params.set(
            'q',
            filtrosActuales.q.trim()
          );
        }

        if (
          filtrosActuales.proveedor_id
        ) {
          params.set(
            'proveedor_id',
            filtrosActuales.proveedor_id
          );
        }

        const data =
          await apiFetch(
            `/almacen-materia-prima/lotes?${params.toString()}`
          );

        setLotes(
          data.lotes || []
        );

        setPaginacionLotes(
          data.paginacion
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
            cargarCatalogos(),
            cargarIndicadores(),
            cargarResumen(
              1,
              filtrosResumenVacios
            ),
            cargarLotes(
              1,
              filtrosLotesVacios
            )
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
    cargarCatalogos,
    cargarIndicadores,
    cargarResumen,
    cargarLotes
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarResumen(
      pageResumen,
      filtrosResumenAplicados
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    pageResumen,
    filtrosResumenAplicados,
    cargarResumen,
    cargando
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarLotes(
      pageLotes,
      filtrosLotesAplicados
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    pageLotes,
    filtrosLotesAplicados,
    cargarLotes,
    cargando
  ]);


  const aplicarFiltrosResumen = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPageResumen(1);

    setFiltrosResumenAplicados({
      q:
        filtrosResumen.q.trim(),
      material_id:
        filtrosResumen.material_id,
      color_id:
        filtrosResumen.color_id
    });
  };


  const limpiarFiltrosResumen =
    () => {
      setFiltrosResumen({
        ...filtrosResumenVacios
      });

      setPageResumen(1);

      setFiltrosResumenAplicados({
        ...filtrosResumenVacios
      });
    };


  const aplicarFiltrosLotes = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPageLotes(1);

    setFiltrosLotesAplicados({
      q:
        filtrosLotes.q.trim(),
      proveedor_id:
        filtrosLotes.proveedor_id,
      estado:
        filtrosLotes.estado
    });
  };


  const limpiarFiltrosLotes =
    () => {
      setFiltrosLotes({
        ...filtrosLotesVacios
      });

      setPageLotes(1);

      setFiltrosLotesAplicados({
        ...filtrosLotesVacios
      });
    };


  const fechaTexto = (
    valor: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return valor.slice(
      0,
      10
    );
  };


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  return (
    <div className="pedidos-page almacen-mp-page">

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


      <div className="pedidos-header almacen-mp-header">
        <div>
          <h1>
            Almacén de materia prima
          </h1>

          <p>
            Consulta las existencias actuales
            de fibra y el detalle de cada lote.
          </p>
        </div>

        <Link
          to="/gestion/compras-materia-prima/registrar"
          className="btn-primary-link"
        >
          + Registrar compra
        </Link>
      </div>


      <div className="almacen-mp-indicadores">

        <div className="almacen-mp-kpi">
          <span>
            Total comprado
          </span>

          <strong>
            {
              cantidad(
                indicadores
                  .total_comprado_kg
              )
            } KG
          </strong>

          <small>
            Materia prima ingresada
          </small>
        </div>


        <div className="almacen-mp-kpi">
          <span>
            Stock disponible
          </span>

          <strong>
            {
              cantidad(
                indicadores
                  .stock_total_kg
              )
            } KG
          </strong>

          <small>
            Existencia actual
          </small>
        </div>


        <div className="almacen-mp-kpi">
          <span>
            Consumido
          </span>

          <strong>
            {
              cantidad(
                indicadores
                  .consumido_total_kg
              )
            } KG
          </strong>

          <small>
            Producción y merma
          </small>
        </div>


        <div className="almacen-mp-kpi">
          <span>
            Lotes registrados
          </span>

          <strong>
            {
              indicadores
                .lotes_registrados ||
              0
            }
          </strong>

          <small>
            Compras de materia prima
          </small>
        </div>

      </div>


      <div className="almacen-mp-tabs">

        <button
          type="button"
          className={
            vista === 'RESUMEN'
              ? 'almacen-mp-tab almacen-mp-tab-activo'
              : 'almacen-mp-tab'
          }
          onClick={() =>
            setVista(
              'RESUMEN'
            )
          }
        >
          Resumen general
        </button>

        <button
          type="button"
          className={
            vista === 'LOTES'
              ? 'almacen-mp-tab almacen-mp-tab-activo'
              : 'almacen-mp-tab'
          }
          onClick={() =>
            setVista(
              'LOTES'
            )
          }
        >
          Lotes
        </button>

      </div>


      {
        vista === 'RESUMEN'
          ? (
            <>
              <form
                className="almacen-mp-filtros almacen-mp-filtros-resumen"
                onSubmit={
                  aplicarFiltrosResumen
                }
              >

                <div>
                  <label>
                    Buscar
                  </label>

                  <input
                    value={
                      filtrosResumen.q
                    }
                    onChange={(e) =>
                      setFiltrosResumen({
                        ...filtrosResumen,
                        q:
                          e.target.value
                      })
                    }
                    placeholder="Material o color..."
                  />
                </div>


                <div>
                  <label>
                    Material
                  </label>

                  <select
                    value={
                      filtrosResumen
                        .material_id
                    }
                    onChange={(e) =>
                      setFiltrosResumen({
                        ...filtrosResumen,
                        material_id:
                          e.target.value
                      })
                    }
                  >
                    <option value="">
                      Todos
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


                <div>
                  <label>
                    Color
                  </label>

                  <select
                    value={
                      filtrosResumen
                        .color_id
                    }
                    onChange={(e) =>
                      setFiltrosResumen({
                        ...filtrosResumen,
                        color_id:
                          e.target.value
                      })
                    }
                  >
                    <option value="">
                      Todos
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


                <button type="submit">
                  Buscar
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={
                    limpiarFiltrosResumen
                  }
                >
                  Limpiar
                </button>

              </form>


              <div className="tabla-card">

                <div className="almacen-mp-tabla-cabecera">
                  <div>
                    <h3>
                      Existencias por materia prima
                    </h3>

                    <p>
                      Totales agrupados por material y color.
                    </p>
                  </div>
                </div>


                {
                  cargando
                    ? (
                      <p>
                        Cargando almacén...
                      </p>
                    )
                    : (
                      <>
                        <div className="tabla-scroll">
                          <table className="almacen-mp-tabla-simple">
                            <thead>
                              <tr>
                                <th>
                                  Material
                                </th>
                                <th>
                                  Color
                                </th>
                                <th>
                                  Total comprado
                                </th>
                                <th>
                                  Consumido
                                </th>
                                <th>
                                  Disponible
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                resumen.map(
                                  (item) => (
                                    <tr
                                      key={
                                        `${item.material_id}-${item.color_id}-${item.unidad_medida_id}`
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
                                          cantidad(
                                            item
                                              .cantidad_inicial_total
                                          )
                                        } {
                                          item.unidad
                                        }
                                      </td>

                                      <td>
                                        {
                                          cantidad(
                                            item
                                              .cantidad_consumida_total
                                          )
                                        } {
                                          item.unidad
                                        }
                                      </td>

                                      <td>
                                        <strong className="almacen-mp-disponible">
                                          {
                                            cantidad(
                                              item
                                                .cantidad_disponible_total
                                            )
                                          } {
                                            item.unidad
                                          }
                                        </strong>
                                      </td>
                                    </tr>
                                  )
                                )
                              }

                              {
                                resumen.length === 0 &&
                                (
                                  <tr>
                                    <td colSpan={5}>
                                      No hay materia prima
                                      para los filtros seleccionados.
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
                              pageResumen <=
                              1
                            }
                            onClick={() =>
                              setPageResumen(
                                pageResumen -
                                1
                              )
                            }
                          >
                            Anterior
                          </button>

                          <span>
                            Página {
                              paginacionResumen
                                .page
                            } de {
                              paginacionResumen
                                .totalPaginas ||
                              1
                            }
                          </span>

                          <button
                            type="button"
                            disabled={
                              pageResumen >=
                              paginacionResumen
                                .totalPaginas
                            }
                            onClick={() =>
                              setPageResumen(
                                pageResumen +
                                1
                              )
                            }
                          >
                            Siguiente
                          </button>

                        </div>
                      </>
                    )
                }

              </div>
            </>
          )
          : (
            <>
              <form
                className="almacen-mp-filtros almacen-mp-filtros-lotes"
                onSubmit={
                  aplicarFiltrosLotes
                }
              >

                <div>
                  <label>
                    Buscar
                  </label>

                  <input
                    value={
                      filtrosLotes.q
                    }
                    onChange={(e) =>
                      setFiltrosLotes({
                        ...filtrosLotes,
                        q:
                          e.target.value
                      })
                    }
                    placeholder="Lote, documento, proveedor, material..."
                  />
                </div>


                <div>
                  <label>
                    Proveedor
                  </label>

                  <select
                    value={
                      filtrosLotes
                        .proveedor_id
                    }
                    onChange={(e) =>
                      setFiltrosLotes({
                        ...filtrosLotes,
                        proveedor_id:
                          e.target.value
                      })
                    }
                  >
                    <option value="">
                      Todos
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
                        </option>
                      )
                    )}
                  </select>
                </div>


                <div>
                  <label>
                    Estado
                  </label>

                  <select
                    value={
                      filtrosLotes.estado
                    }
                    onChange={(e) =>
                      setFiltrosLotes({
                        ...filtrosLotes,
                        estado:
                          e.target.value
                      })
                    }
                  >
                    <option value="TODOS">
                      Todos
                    </option>

                    <option value="CON_STOCK">
                      Con stock
                    </option>

                    <option value="AGOTADO">
                      Agotados
                    </option>
                  </select>
                </div>


                <button type="submit">
                  Buscar
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={
                    limpiarFiltrosLotes
                  }
                >
                  Limpiar
                </button>

              </form>


              <div className="tabla-card">

                <div className="almacen-mp-tabla-cabecera">
                  <div>
                    <h3>
                      Lotes de materia prima
                    </h3>

                    <p>
                      Cada fila representa un lote completo.
                    </p>
                  </div>

                  <span className="muted">
                    {
                      paginacionLotes
                        .total
                    } lote(s)
                  </span>
                </div>


                {
                  cargando
                    ? (
                      <p>
                        Cargando lotes...
                      </p>
                    )
                    : (
                      <>
                        <div className="tabla-scroll">
                          <table>
                            <thead>
                              <tr>
                                <th>
                                  Lote
                                </th>
                                <th>
                                  Fecha
                                </th>
                                <th>
                                  Proveedor
                                </th>
                                <th>
                                  Documento
                                </th>
                                <th>
                                  Total comprado
                                </th>
                                <th>
                                  Consumido
                                </th>
                                <th>
                                  Disponible
                                </th>
                                <th>
                                  Acción
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                lotes.map(
                                  (lote) => (
                                    <tr
                                      key={
                                        lote
                                          .compra_materia_prima_id
                                      }
                                    >
                                      <td>
                                        <strong>
                                          {
                                            lote.nombre_lote
                                          }
                                        </strong>
                                      </td>

                                      <td>
                                        {
                                          fechaTexto(
                                            lote.fecha_compra
                                          )
                                        }
                                      </td>

                                      <td>
                                        {
                                          lote.proveedor
                                        }
                                      </td>

                                      <td>
                                        {
                                          lote.numero_documento ||
                                          '-'
                                        }
                                      </td>

                                      <td>
                                        {
                                          cantidad(
                                            lote
                                              .cantidad_inicial_total
                                          )
                                        } KG
                                      </td>

                                      <td>
                                        {
                                          cantidad(
                                            lote
                                              .cantidad_consumida_total
                                          )
                                        } KG
                                      </td>

                                      <td>
                                        <strong className="almacen-mp-disponible">
                                          {
                                            cantidad(
                                              lote
                                                .cantidad_disponible_total
                                            )
                                          } KG
                                        </strong>
                                      </td>

                                      <td>
                                        <Link
                                          className="btn-outline"
                                          to={
                                            `/gestion/almacen/materia-prima/lotes/${lote.compra_materia_prima_id}`
                                          }
                                        >
                                          Ver lote
                                        </Link>
                                      </td>
                                    </tr>
                                  )
                                )
                              }

                              {
                                lotes.length === 0 &&
                                (
                                  <tr>
                                    <td colSpan={8}>
                                      No hay lotes
                                      para los filtros seleccionados.
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
                              pageLotes <=
                              1
                            }
                            onClick={() =>
                              setPageLotes(
                                pageLotes -
                                1
                              )
                            }
                          >
                            Anterior
                          </button>

                          <span>
                            Página {
                              paginacionLotes
                                .page
                            } de {
                              paginacionLotes
                                .totalPaginas ||
                              1
                            }
                          </span>

                          <button
                            type="button"
                            disabled={
                              pageLotes >=
                              paginacionLotes
                                .totalPaginas
                            }
                            onClick={() =>
                              setPageLotes(
                                pageLotes +
                                1
                              )
                            }
                          >
                            Siguiente
                          </button>

                        </div>
                      </>
                    )
                }

              </div>
            </>
          )
      }

    </div>
  );
}


export default AlmacenMateriaPrima;
