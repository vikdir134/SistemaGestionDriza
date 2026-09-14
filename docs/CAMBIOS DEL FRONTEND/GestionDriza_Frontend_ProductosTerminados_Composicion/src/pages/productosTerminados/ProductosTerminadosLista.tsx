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

import '../../styles/productosTerminados.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Filtros = {
  q: string;
  tipo_producto_id: string;
  material_id: string;
  medida_id: string;
  color_id: string;
  estado_composicion: string;
};


const filtrosVacios: Filtros = {
  q: '',
  tipo_producto_id: '',
  material_id: '',
  medida_id: '',
  color_id: '',
  estado_composicion: 'TODOS'
};


function ProductosTerminadosLista() {
  const [
    productos,
    setProductos
  ] = useState<any[]>([]);

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
    cargando,
    setCargando
  ] = useState(true);

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
    totalPaginas: 0
  });

  const [
    filtros,
    setFiltros
  ] = useState<Filtros>({
    ...filtrosVacios
  });

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<Filtros>({
    ...filtrosVacios
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


  const cargarProductos =
    useCallback(
      async (
        pagina: number,
        filtrosActuales: Filtros
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
          'estado_composicion',
          filtrosActuales
            .estado_composicion
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
          filtrosActuales
            .tipo_producto_id
        ) {
          params.set(
            'tipo_producto_id',
            filtrosActuales
              .tipo_producto_id
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
          filtrosActuales.medida_id
        ) {
          params.set(
            'medida_id',
            filtrosActuales.medida_id
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
            `/productos-terminados?${params.toString()}`
          );

        setProductos(
          data.productos || []
        );

        setPaginacion(
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
            cargarProductos(
              1,
              filtrosVacios
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
    cargarProductos
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarProductos(
      page,
      filtrosAplicados
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    page,
    filtrosAplicados,
    cargarProductos,
    cargando
  ]);


  const aplicarFiltros = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPage(1);

    setFiltrosAplicados({
      q:
        filtros.q.trim(),
      tipo_producto_id:
        filtros.tipo_producto_id,
      material_id:
        filtros.material_id,
      medida_id:
        filtros.medida_id,
      color_id:
        filtros.color_id,
      estado_composicion:
        filtros.estado_composicion
    });
  };


  const limpiarFiltros = () => {
    setFiltros({
      ...filtrosVacios
    });

    setPage(1);

    setFiltrosAplicados({
      ...filtrosVacios
    });
  };


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


      <div className="pedidos-header productos-terminados-header">
        <div>
          <h1>
            Productos terminados
          </h1>

          <p>
            Administra los productos que se fabrican
            y define la materia prima que utiliza cada uno.
          </p>
        </div>

        <Link
          to="/gestion/productos-terminados/registrar"
          className="btn-primary-link"
        >
          + Registrar producto
        </Link>
      </div>


      <form
        className="pt-filtros"
        onSubmit={aplicarFiltros}
      >

        <div className="pt-filtro-busqueda">
          <label>
            Buscar
          </label>

          <input
            value={filtros.q}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                q: e.target.value
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
              filtros.tipo_producto_id
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


        <div>
          <label>
            Composición
          </label>

          <select
            value={
              filtros
                .estado_composicion
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                estado_composicion:
                  e.target.value
              })
            }
          >
            <option value="TODOS">
              Todos
            </option>

            <option value="CONFIGURADO">
              Definida
            </option>

            <option value="SIN_COMPOSICION">
              Pendiente
            </option>
          </select>
        </div>


        <button type="submit">
          Buscar
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={limpiarFiltros}
        >
          Limpiar
        </button>

      </form>


      <div className="tabla-card">

        <div className="pt-tabla-cabecera">
          <div>
            <h3>
              Catálogo de productos
            </h3>

            <p>
              Cada producto se identifica por
              tipo, material, medida y color.
            </p>
          </div>

          <span className="muted">
            {
              paginacion.total
            } producto(s)
          </span>
        </div>


        {cargando ? (
          <p>
            Cargando productos...
          </p>
        ) : (
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
                      Composición
                    </th>
                    <th>
                      Acción
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {productos.map(
                    (producto) => (
                      <tr
                        key={
                          producto.producto_id
                        }
                      >
                        <td>
                          <strong>
                            {
                              producto
                                .tipo_producto
                            }
                          </strong>
                        </td>

                        <td>
                          {
                            producto.material
                          }
                        </td>

                        <td>
                          {
                            producto.medida
                          }
                        </td>

                        <td>
                          {
                            producto.color
                          }
                        </td>

                        <td>
                          {
                            producto
                              .estado_composicion ===
                              'CONFIGURADO'
                              ? (
                                <div className="pt-composicion-estado">
                                  <span className="pt-badge pt-badge-ok">
                                    Definida
                                  </span>

                                  <small>
                                    Versión {
                                      producto
                                        .composicion_version
                                    }
                                  </small>
                                </div>
                              )
                              : (
                                <span className="pt-badge pt-badge-pendiente">
                                  Pendiente de definir
                                </span>
                              )
                          }
                        </td>

                        <td>
                          <Link
                            className="btn-outline"
                            to={
                              `/gestion/productos-terminados/${producto.producto_id}`
                            }
                          >
                            Ver producto
                          </Link>
                        </td>
                      </tr>
                    )
                  )}

                  {
                    productos.length === 0 &&
                    (
                      <tr>
                        <td colSpan={6}>
                          No hay productos para
                          los filtros seleccionados.
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
                  page <= 1
                }
                onClick={() =>
                  setPage(
                    page - 1
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
          </>
        )}

      </div>

    </div>
  );
}


export default ProductosTerminadosLista;
