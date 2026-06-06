import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

function Clientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState({
    ruc: '',
    razon_social: '',
    direccion: '',
    telefono: '',
    correo: ''
  });

  const cargarClientes = async () => {
    try {
      const data = await apiFetch('/clientes');
      setClientes(data.clientes);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registrarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await apiFetch('/clientes', {
        method: 'POST',
        body: JSON.stringify(form)
      });

      setMensaje('Cliente registrado correctamente');
      setForm({
        ruc: '',
        razon_social: '',
        direccion: '',
        telefono: '',
        correo: ''
      });

      cargarClientes();

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Clientes</h1>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card" onSubmit={registrarCliente}>
        <h3>Registrar cliente</h3>

        <input name="ruc" placeholder="RUC" value={form.ruc} onChange={handleChange} />
        <input name="razon_social" placeholder="Razón social" value={form.razon_social} onChange={handleChange} />
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
        <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />

        <button type="submit">Guardar cliente</button>
      </form>

      <div className="tabla-card">
        <h3>Listado de clientes</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>RUC</th>
              <th>Razón social</th>
              <th>Dirección</th>
              <th>Teléfono</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.cliente_id}>
                <td>{cliente.cliente_id}</td>
                <td>{cliente.ruc}</td>
                <td>{cliente.razon_social}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;