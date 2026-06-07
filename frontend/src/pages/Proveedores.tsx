import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

function Proveedores() {
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState({
    ruc: '',
    razon_social: '',
    direccion: '',
    telefono: '',
    correo: ''
  });

  const cargarProveedores = async () => {
    const data = await apiFetch('/proveedores');
    setProveedores(data.proveedores);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarProveedores();
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registrarProveedor = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    try {
      await apiFetch('/proveedores', {
        method: 'POST',
        body: JSON.stringify(form)
      });

      setMensaje('Proveedor registrado correctamente');

      setForm({
        ruc: '',
        razon_social: '',
        direccion: '',
        telefono: '',
        correo: ''
      });

      await cargarProveedores();

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Proveedores</h1>
      <p>Registra proveedores para compras y gastos.</p>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card" onSubmit={registrarProveedor}>
        <h3>Registrar proveedor</h3>

        <label>RUC</label>
        <input
          name="ruc"
          placeholder="RUC"
          value={form.ruc}
          onChange={handleChange}
        />

        <label>Razón social</label>
        <input
          name="razon_social"
          placeholder="Razón social"
          value={form.razon_social}
          onChange={handleChange}
        />

        <label>Dirección</label>
        <input
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
        />

        <label>Teléfono</label>
        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
        />

        <label>Correo</label>
        <input
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
        />

        <button type="submit">
          Guardar proveedor
        </button>
      </form>

      <div className="tabla-card">
        <h3>Listado de proveedores</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>RUC</th>
              <th>Razón social</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
            </tr>
          </thead>

          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.proveedor_id}>
                <td>{proveedor.proveedor_id}</td>
                <td>{proveedor.ruc}</td>
                <td>{proveedor.razon_social}</td>
                <td>{proveedor.direccion || '-'}</td>
                <td>{proveedor.telefono || '-'}</td>
                <td>{proveedor.correo || '-'}</td>
              </tr>
            ))}

            {proveedores.length === 0 && (
              <tr>
                <td colSpan={6}>No hay proveedores registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Proveedores;