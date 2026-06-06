import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

const catalogos = [
  { key: 'tiposProducto', label: 'Tipos de producto' },
  { key: 'medidas', label: 'Medidas' },
  { key: 'colores', label: 'Colores' },
  { key: 'materiales', label: 'Materiales' }
];

function Catalogos() {
  const [catalogoActivo, setCatalogoActivo] = useState('tiposProducto');
  const [items, setItems] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargarCatalogo = async () => {
    try {
      setError('');
      const data = await apiFetch(`/catalogos/${catalogoActivo}`);
      setItems(data.items);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    cargarCatalogo();
  }, [catalogoActivo]);

  const registrarItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await apiFetch(`/catalogos/${catalogoActivo}`, {
        method: 'POST',
        body: JSON.stringify({ nombre })
      });

      setMensaje('Registro creado correctamente');
      setNombre('');
      cargarCatalogo();

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Catálogos</h1>

      <div className="tabs">
        {catalogos.map((cat) => (
          <button
            key={cat.key}
            className={catalogoActivo === cat.key ? 'tab-active' : ''}
            onClick={() => setCatalogoActivo(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card" onSubmit={registrarItem}>
        <h3>Agregar registro</h3>

        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />

        <button type="submit">Guardar</button>
      </form>

      <div className="tabla-card">
        <h3>Listado</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Catalogos;