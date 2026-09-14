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

import '../../styles/almacenProductoTerminado.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Vista =
  | 'RESUMEN'
  | 'PRESENTACIONES';


type FiltrosBase = {
  q: string;
  tipo_producto_id: string;
  material_id: string;
  medida_id: string;
  color_id: string;
};


type FiltrosPresentaciones =
  FiltrosBase & {
    estado: string;
  };


const filtrosBaseVacios:
  FiltrosBase = {
  q: '',
  tipo_producto_id: '',
  material_id: '',
  medida_id: '',
  color_id: ''
};


const filtrosPresentacionesVacios:
  FiltrosPresentaciones = {
  ...filtrosBaseVacios,
  estado: 'TODOS'
};


function AlmacenProductoTerminado() {
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
    stock_disponible_kg: 0,
    productos_con_stock: 0,
    presentaciones_con_stock: 0
  });

  const [
    tipos,
    setTipos
  ] = useState<any[]>([]);

  const [
    materiales,
    setMateriales
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
    resumen,
    setResumen
  ] = useState<any[]>([]);

  const [
    presentaciones,
    setPresentaciones
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
    pagePresentaciones,
    setPagePresentaciones
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
    paginacionPresentaciones,
    setPaginacionPresentaciones
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    filtrosResumen,
    setFiltrosResumen
  ] = useState<FiltrosBase>({
    ...filtrosBaseVacios
  });

  const [
    filtrosResumenAplicados,
    setFiltrosResumenAplicados
  ] = useState<FiltrosBase>({
    ...filtrosBaseVacios
  });

  const [
    filtrosPresentaciones,
    setFiltrosPresentaciones
  ] = useState<FiltrosPresentaciones>({
    ...filtrosPresentacionesVacios
  });

  const [
    filtrosPresentacionesAplicados,
    setFiltrosPresentacionesAplicados
  ] = useState<FiltrosPresentaciones>({
    ...filtrosPresentacionesVacios
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


  const cargarCatalogos =
    useCallback(
      async () => {
        const [
          tiposData,
          materialesData,
          medidasData,
          coloresData
        ] = await Promise.all([
          apiFetch(
            '/catalogos/tiposProducto'
          ),
          apiFetch(
            '/catalogos/materiales'
          ),
          apiFetch(
            '/catalogos/medidas'
          ),
          apiFetch(
            '/catalogos/colores'
          )
        ]);

        setTipos(
          tiposData.items || []
        );

        setMateriales(
          materialesData.items || []
        );

        setMedidas(
          medidasData.items || []
        );

        setColores(
          coloresData.items || []
        );
      },
      []
    );


  const cargarIndicadores =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/almacen-producto-terminado/indicadores'
          );

        setIndicadores(
          data.indicadores || {}
        );
      },
      []
    );


  const cargarResumen =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosBase
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
          filtros.q.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }

        if (
          filtros.tipo_producto_id
        ) {
          params.set(
            'tipo_producto_id',
            filtros.tipo_producto_id
          );
        }

        if (
          filtros.material_id
        ) {
          params.set(
            'material_id',
            filtros.material_id
          );
        }

        if (
          filtros.medida_id
        ) {
          params.set(
            'medida_id',
            filtros.medida_id
          );
        }

        if (
          filtros.color_id
        ) {
          params.set(
            'color_id',
            filtros.color_id
          );
        }

        const data =
          await apiFetch(
            `/almacen-producto-terminado/resumen?${params.toString()}`
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


  const cargarPresentaciones =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosPresentaciones
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
          filtros.estado
        );

        if (
          filtros.q.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }

        if (
          filtros.tipo_producto_id
        ) {
          params.set(
            'tipo_producto_id',
            filtros.tipo_producto_id
          );
        }

        if (
          filtros.material_id
        ) {
          params.set(
            'material_id',
            filtros.material_id
          );
        }

        if (
          filtros.medida_id
        ) {
          params.set(
            'medida_id',
            filtros.medida_id
          );
        }

        if (
          filtros.color_id
        ) {
          params.set(
            'color_id',
            filtros.color_id
          );
        }

        const data =
          await apiFetch(
            `/almacen-producto-terminado/presentaciones?${params.toString()}`
          );

        setPresentaciones(
          data.presentaciones ||
          []
        );

        setPaginacionPresentaciones(
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
              filtrosBaseVacios
            ),
            cargarPresentaciones(
              1,
              filtrosPresentacionesVacios
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
    cargarPresentaciones
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

    cargarPresentaciones(
      pagePresentaciones,
      filtrosPresentacionesAplicados
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    pagePresentaciones,
    filtrosPresentacionesAplicados,
    cargarPresentaciones,
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
      tipo_producto_id:
        filtrosResumen
          .tipo_producto_id,
      material_id:
        filtrosResumen.material_id,
      medida_id:
        filtrosResumen.medida_id,
      color_id:
        filtrosResumen.color_id
    });
  };


  const limpiarFiltrosResumen =
    () => {
      setFiltrosResumen({
        ...filtrosBaseVacios
      });

      setPageResumen(1);

      setFiltrosResumenAplicados({
        ...filtrosBaseVacios
      });
    };


  const aplicarFiltrosPresentaciones = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPagePresentaciones(
      1
    );

    setFiltrosPresentacionesAplicados({
      q:
        filtrosPresentaciones.q
          .trim(),
      tipo_producto_id:
        filtrosPresentaciones
          .tipo_producto_id,
      material_id:
        filtrosPresentaciones
          .material_id,
      medida_id:
        filtrosPresentaciones
          .medida_id,
      color_id:
        filtrosPresentaciones
          .color_id,
      estado:
        filtrosPresentaciones.estado
    });
  };


  const limpiarFiltrosPresentaciones =
    () => {
      setFiltrosPresentaciones({
        ...filtrosPresentacionesVacios
      });

      setPagePresentaciones(
        1
      );

      setFiltrosPresentacionesAplicados({
        ...filtrosPresentacionesVacios
      });
    };


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  const renderFiltrosBase = (
    filtros:
      FiltrosBase |
      FiltrosPresentaciones,
    setFiltros:
      (valor: any) => void
  ) => {
    return (
      <>
        <div className="apt-filtro-busqueda">
          <label>
            Buscar
          </label>

          <input
            value={filtros.q}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                q:
                  e.target.value
              })
            }
            placeholder="Tipo, material, medida o color..."
          />
        </div>


        <div>
          <label>
            Tipo
          </label>

          <select
            value={
              filtros
                .tipo_producto_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                tipo_producto_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todos
            </option>

            {tipos.map(
              (tipo) => (
                <option
                  key={tipo.id}
                  value={tipo.id}
                >
                  {tipo.nombre}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Material
          </label>

          <select
            value={
              filtros.material_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
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
                  key={material.id}
                  value={material.id}
                >
                  {material.nombre}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Medida
          </label>

          <select
            value={
              filtros.medida_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                medida_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todas
            </option>

            {medidas.map(
              (medida) => (
                <option
                  key={medida.id}
                  value={medida.id}
                >
                  {medida.nombre}
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
              filtros.color_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
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
                  key={color.id}
                  value={color.id}
                >
                  {color.nombre}
                </option>
              )
            )}
          </select>
        </div>
      </>
    );
  };


  return (
    <div className="pedidos-page almacen-pt-page">

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


      <div className="pedidos-header almacen-pt-header">
        <div>
          <h1>
            Almacén de producto terminado
          </h1>

          <p>
            Consulta las existencias disponibles
            de los productos fabricados.
          </p>
        </div>

        <Link
          to="/gestion/producciones/registrar"
          className="btn-primary-link"
        >
          + Registrar producción
        </Link>
      </div>


      <div className="apt-indicadores">

        <div className="apt-kpi">
          <span>
            Stock disponible
          </span>

          <strong>
            {
              cantidad(
                indicadores
                  .stock_disponible_kg
              )
            } KG
          </strong>

          <small>
            Existencia actual
          </small>
        </div>


        <div className="apt-kpi">
          <span>
            Productos con stock
          </span>

          <strong>
            {
              indicadores
                .productos_con_stock ||
              0
            }
          </strong>

          <small>
            Productos disponibles
          </small>
        </div>


        <div className="apt-kpi">
          <span>
            Presentaciones con stock
          </span>

          <strong>
            {
              indicadores
                .presentaciones_con_stock ||
              0
            }
          </strong>

          <small>
            Formatos disponibles
          </small>
        </div>

      </div>


      <div className="apt-tabs">

        <button
          type="button"
          className={
            vista === 'RESUMEN'
              ? 'apt-tab apt-tab-activo'
              : 'apt-tab'
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
            vista === 'PRESENTACIONES'
              ? 'apt-tab apt-tab-activo'
              : 'apt-tab'
          }
          onClick={() =>
            setVista(
              'PRESENTACIONES'
            )
          }
        >
          Por presentación
        </button>

      </div>


      {
        vista === 'RESUMEN'
          ? (
            <>
              <form
                className="apt-filtros"
                onSubmit={
                  aplicarFiltrosResumen
                }
              >

                {
                  renderFiltrosBase(
                    filtrosResumen,
                    setFiltrosResumen
                  )
                }

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

                <div className="apt-tabla-cabecera">
                  <div>
                    <h3>
                      Stock consolidado
                    </h3>

                    <p>
                      Total disponible de cada producto,
                      sin separar por presentación.
                    </p>
                  </div>

                  <span className="muted">
                    {
                      paginacionResumen
                        .total
                    } producto(s)
                  </span>
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
                          <table>
                            <thead>
                              <tr>
                                <th>
                                  Tipo
                                </th>
                                <th>
                                  Material
                                </th>
                                <th>
                                  Medida
                                </th>
                                <th>
                                  Color
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
                                        item
                                          .producto_id
                                      }
                                    >
                                      <td>
                                        <strong>
                                          {
                                            item
                                              .tipo_producto
                                          }
                                        </strong>
                                      </td>

                                      <td>
                                        {
                                          item.material
                                        }
                                      </td>

                                      <td>
                                        {
                                          item.medida
                                        }
                                      </td>

                                      <td>
                                        {
                                          item.color
                                        }
                                      </td>

                                      <td>
                                        <strong className="apt-stock-positivo">
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
                                resumen.length ===
                                  0 &&
                                (
                                  <tr>
                                    <td colSpan={5}>
                                      No hay productos
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
                className="apt-filtros apt-filtros-presentaciones"
                onSubmit={
                  aplicarFiltrosPresentaciones
                }
              >

                {
                  renderFiltrosBase(
                    filtrosPresentaciones,
                    setFiltrosPresentaciones
                  )
                }

                <div>
                  <label>
                    Estado
                  </label>

                  <select
                    value={
                      filtrosPresentaciones
                        .estado
                    }
                    onChange={(e) =>
                      setFiltrosPresentaciones({
                        ...filtrosPresentaciones,
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
                    limpiarFiltrosPresentaciones
                  }
                >
                  Limpiar
                </button>

              </form>


              <div className="tabla-card">

                <div className="apt-tabla-cabecera">
                  <div>
                    <h3>
                      Stock por presentación
                    </h3>

                    <p>
                      Existencias separadas según
                      la presentación registrada en producción.
                    </p>
                  </div>

                  <span className="muted">
                    {
                      paginacionPresentaciones
                        .total
                    } registro(s)
                  </span>
                </div>


                {
                  cargando
                    ? (
                      <p>
                        Cargando presentaciones...
                      </p>
                    )
                    : (
                      <>
                        <div className="tabla-scroll">
                          <table>
                            <thead>
                              <tr>
                                <th>
                                  Producto
                                </th>
                                <th>
                                  Medida
                                </th>
                                <th>
                                  Color
                                </th>
                                <th>
                                  Presentación
                                </th>
                                <th>
                                  Disponible
                                </th>
                                <th>
                                  Unidades disponibles
                                </th>
                                <th>
                                  Estado
                                </th>
                                <th>
                                  Acción
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                presentaciones.map(
                                  (item) => (
                                    <tr
                                      key={
                                        item
                                          .stock_producto_terminado_id
                                      }
                                    >
                                      <td>
                                        <strong>
                                          {
                                            item
                                              .tipo_producto
                                          }
                                        </strong>
                                        <div className="apt-subtexto">
                                          {
                                            item.material
                                          }
                                        </div>
                                      </td>

                                      <td>
                                        {
                                          item.medida
                                        }
                                      </td>

                                      <td>
                                        {
                                          item.color
                                        }
                                      </td>

                                      <td>
                                        <strong>
                                          {
                                            cantidad(
                                              item
                                                .cantidad_presentacion
                                            )
                                          } {
                                            item
                                              .unidad_presentacion
                                          }
                                        </strong>
                                      </td>

                                      <td>
                                        <strong className="apt-stock-positivo">
                                          {
                                            cantidad(
                                              item
                                                .cantidad_disponible
                                            )
                                          } {
                                            item.unidad
                                          }
                                        </strong>
                                      </td>

                                      <td>
                                        {
                                          Number(
                                            item
                                              .presentaciones_disponibles ||
                                            0
                                          )
                                            .toFixed(
                                              2
                                            )
                                        }
                                      </td>

                                      <td>
                                        <span
                                          className={
                                            item
                                              .estado_stock ===
                                              'CON_STOCK'
                                              ? 'apt-badge apt-badge-ok'
                                              : 'apt-badge apt-badge-agotado'
                                          }
                                        >
                                          {
                                            item
                                              .estado_stock ===
                                              'CON_STOCK'
                                              ? 'Con stock'
                                              : 'Agotado'
                                          }
                                        </span>
                                      </td>

                                      <td>
                                        <Link
                                          className="btn-outline"
                                          to={
                                            `/gestion/almacen/producto-terminado/presentaciones/${item.stock_producto_terminado_id}`
                                          }
                                        >
                                          Ver detalle
                                        </Link>
                                      </td>
                                    </tr>
                                  )
                                )
                              }

                              {
                                presentaciones.length ===
                                  0 &&
                                (
                                  <tr>
                                    <td colSpan={8}>
                                      No hay presentaciones
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
                              pagePresentaciones <=
                              1
                            }
                            onClick={() =>
                              setPagePresentaciones(
                                pagePresentaciones -
                                1
                              )
                            }
                          >
                            Anterior
                          </button>

                          <span>
                            Página {
                              paginacionPresentaciones
                                .page
                            } de {
                              paginacionPresentaciones
                                .totalPaginas ||
                              1
                            }
                          </span>

                          <button
                            type="button"
                            disabled={
                              pagePresentaciones >=
                              paginacionPresentaciones
                                .totalPaginas
                            }
                            onClick={() =>
                              setPagePresentaciones(
                                pagePresentaciones +
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


export default AlmacenProductoTerminado;
