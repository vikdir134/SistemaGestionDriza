import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL, { guardarSesion } from '../services/api';

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setCargando(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.mensaje || 'Error al iniciar sesión');
        return;
      }

      guardarSesion(data.token, data.usuario);
      navigate('/gestion');

    } catch (error) {
      setError('No se pudo conectar con el backend');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>GoDriza</h1>
        <p>Sistema de Gestión de Driza</p>

        {error && <div className="error">{error}</div>}

        <label>Correo</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          placeholder="admin@driza.com"
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="********"
        />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}

export default Login;