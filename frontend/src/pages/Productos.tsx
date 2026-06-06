import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

function Productos() {
  const [productos, setProductos] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [medidas, setMedidas] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState({
    codigo_producto: '',
    tipo_producto_id: '',
    medida_id: '',
    color_id: '',
    material_id: '',
    peso_total_kg: '',
    presentacion: '',
    descripcion: ''
  });

  const cargarProductos = async () => {
    const data = await apiFetch('/productos');
    setProductos(data.productos);
  };

  const cargarCatalogos = async () => {
    const [tiposData, medidasData, coloresData, materialesData] = await Promise.all([
      apiFetch('/catalogos/tiposProducto'),
      apiFetch('/catalogos/medidas'),
      apiFetch('/catalogos/colores'),
      apiFetch('/catalogos/materiales')
    ]);

    setTipos(tiposData.items);
    setMedidas(medidasData.items);
    setColores(coloresData.items);
    setMateriales(materialesData.items);
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        await cargarCatalogos();
        await cargarProductos();
      } catch (error: any) {
        setError(error.message);
      }
    };

    cargarDatos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registrarProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await apiFetch('/productos', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          tipo_producto_id: Number(form.tipo_producto_id),
          medida_id: Number(form.medida_id),
          color_id: Number(form.color_id),
          material_id: Number(form.material_id),
          peso_total_kg: Number(form.peso_total_kg)
        })
      });

      setMensaje('Producto registrado correctamente');

      setForm({
        codigo_producto: '',
        tipo_producto_id: '',
        medida_id: '',
        color_id: '',
        material_id: '',
        peso_total_kg: '',
        presentacion: '',
        descripcion: ''
      });

      cargarProductos();

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Productos</h1>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card" onSubmit={registrarProducto}>
        <h3>Registrar producto</h3>

        <input
          name="codigo_producto"
          placeholder="Código del producto"
          value={form.codigo_producto}
          onChange={handleChange}
        />

        <select name="tipo_producto_id" value={form.tipo_producto_id} onChange={handleChange}>
          <option value="">Seleccione tipo</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
          ))}
        </select>

        <select name="medida_id" value={form.medida_id} onChange={handleChange}>
          <option value="">Seleccione medida</option>
          {medidas.map((medida) => (
            <option key={medida.id} value={medida.id}>{medida.nombre}</option>
          ))}
        </select>

        <select name="color_id" value={form.color_id} onChange={handleChange}>
          <option value="">Seleccione color</option>
          {colores.map((color) => (
            <option key={color.id} value={color.id}>{color.nombre}</option>
          ))}
        </select>

        <select name="material_id" value={form.material_id} onChange={handleChange}>
          <option value="">Seleccione material</option>
          {materiales.map((material) => (
            <option key={material.id} value={material.id}>{material.nombre}</option>
          ))}
        </select>

        <input
          name="peso_total_kg"
          type="number"
          placeholder="Peso total KG"
          value={form.peso_total_kg}
          onChange={handleChange}
        />

        <input
          name="presentacion"
          placeholder="Presentación, ejemplo: ROLLOS DE 10KG"
          value={form.presentacion}
          onChange={handleChange}
        />

        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <button type="submit">Guardar producto</button>
      </form>

      <div className="tabla-card">
        <h3>Listado de productos</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Tipo</th>
              <th>Medida</th>
              <th>Color</th>
              <th>Material</th>
              <th>Peso</th>
              <th>Presentación</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.producto_id}>
                <td>{producto.producto_id}</td>
                <td>{producto.codigo_producto}</td>
                <td>{producto.tipo_producto}</td>
                <td>{producto.medida}</td>
                <td>{producto.color}</td>
                <td>{producto.material}</td>
                <td>{producto.peso_total_kg}</td>
                <td>{producto.presentacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Productos;