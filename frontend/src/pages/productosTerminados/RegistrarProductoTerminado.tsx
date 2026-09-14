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

import '../../styles/productosTerminados.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function RegistrarProductoTerminado() {
  const navigate =
    useNavigate();

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
    cargandoCatalogos,
    setCargandoCatalogos
  ] = useState(true);

  const [
    form,
    setForm
  ] = useState({
    tipo_producto_id: '',
    material_id: '',
    medida_id: '',
    color_id: '',
    descripcion: ''
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
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar =
      async () => {
        setCargandoCatalogos(
          true
        );

        try {
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


  const registrarProducto = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (
      !intentarBloquear()
    ) {
      return;
    }

    if (
      !form.tipo_producto_id ||
      !form.material_id ||
      !form.medida_id ||
      !form.color_id
    ) {
      liberar();

      setFeedback({
        tipo: 'error',
        mensaje:
          'Tipo, material, medida y color son obligatorios'
      });

      return;
    }

    try {
      const data =
        await apiFetch(
          '/productos-terminados',
          {
            method: 'POST',
            body:
              JSON.stringify({
                tipo_producto_id:
                  Number(
                    form
                      .tipo_producto_id
                  ),

                material_id:
                  Number(
                    form
                      .material_id
                  ),

                medida_id:
                  Number(
                    form
                      .medida_id
                  ),

                color_id:
                  Number(
                    form
                      .color_id
                  ),

                descripcion:
                  form.descripcion
                    .trim() ||
                  null
              })
          }
        );

      setFeedback({
        tipo: 'success',
        mensaje:
          'Producto terminado registrado correctamente'
      });

      setTimeout(() => {
        navigate(
          `/gestion/productos-terminados/${data.producto.producto_id}`
        );
      }, 700);

    } catch (error: any) {
      liberar();

      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
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


      <Link
        to="/gestion/productos-terminados"
        className="btn-volver"
      >
        ← Volver a productos terminados
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            Registrar producto terminado
          </h1>

          <p>
            Define el producto que se fabrica.
            La presentación se registrará después
            al ingresar producción.
          </p>
        </div>
      </div>


      <form
        className="form-card pt-form-registro"
        onSubmit={registrarProducto}
      >

        <div className="pt-form-intro">
          <h3>
            Identidad del producto
          </h3>

          <p>
            Selecciona las cuatro características
            que identifican al producto terminado.
          </p>
        </div>


        <div className="pt-form-grid">

          <div>
            <label>
              Tipo de producto
            </label>

            <select
              name="tipo_producto_id"
              value={
                form.tipo_producto_id
              }
              onChange={handleChange}
              disabled={
                procesando ||
                cargandoCatalogos
              }
            >
              <option value="">
                Seleccione
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
              name="material_id"
              value={
                form.material_id
              }
              onChange={handleChange}
              disabled={
                procesando ||
                cargandoCatalogos
              }
            >
              <option value="">
                Seleccione
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
              name="medida_id"
              value={
                form.medida_id
              }
              onChange={handleChange}
              disabled={
                procesando ||
                cargandoCatalogos
              }
            >
              <option value="">
                Seleccione
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
              name="color_id"
              value={
                form.color_id
              }
              onChange={handleChange}
              disabled={
                procesando ||
                cargandoCatalogos
              }
            >
              <option value="">
                Seleccione
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


          <div className="pt-form-ancho">
            <label>
              Descripción opcional
            </label>

            <textarea
              name="descripcion"
              value={
                form.descripcion
              }
              onChange={handleChange}
              rows={3}
              placeholder="Observación o detalle adicional del producto"
              disabled={procesando}
            />
          </div>

        </div>


        <div className="pt-form-nota">
          <strong>
            Importante:
          </strong>
          {' '}
          la composición de materias primas
          se define después de crear el producto.
        </div>


        <div className="pt-form-actions">

          <Link
            to="/gestion/productos-terminados"
            className="btn-secondary-link"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={
              procesando ||
              cargandoCatalogos
            }
          >
            {
              procesando
                ? 'Registrando...'
                : 'Registrar producto'
            }
          </button>

        </div>

      </form>

    </div>
  );
}


export default RegistrarProductoTerminado;
