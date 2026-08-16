import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';

function UsuariosAdmin() {
  const [roles, setRoles] = useState<any[]>([]);

  const [form, setForm] = useState({
    nombre_completo: '',
    correo: '',
    password: '',
    rol_id: ''
  });

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info',
    mensaje: ''
  });

  const [cargando, setCargando] = useState(false);

  const cargarRoles = async () => {
    const data = await apiFetch('/auth/roles');
    setRoles(data.roles);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarRoles();
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    iniciar();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const limpiarFormulario = () => {
    setForm({
      nombre_completo: '',
      correo: '',
      password: '',
      rol_id: ''
    });
  };

  const crearUsuario = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.nombre_completo.trim()) {
      setFeedback({
        tipo: 'error',
        mensaje: 'El nombre completo es obligatorio'
      });
      return;
    }

    if (!form.correo.trim()) {
      setFeedback({
        tipo: 'error',
        mensaje: 'El correo es obligatorio'
      });
      return;
    }

    if (!form.password.trim()) {
      setFeedback({
        tipo: 'error',
        mensaje: 'La contraseña es obligatoria'
      });
      return;
    }

    if (form.password.length < 8) {
      setFeedback({
        tipo: 'error',
        mensaje: 'La contraseña debe tener mínimo 8 caracteres'
      });
      return;
    }

    if (!form.rol_id) {
      setFeedback({
        tipo: 'error',
        mensaje: 'Debe seleccionar un rol'
      });
      return;
    }

    setCargando(true);

    try {
      await apiFetch('/auth/usuarios', {
        method: 'POST',
        body: JSON.stringify({
          nombre_completo: form.nombre_completo.trim(),
          correo: form.correo.trim().toLowerCase(),
          password: form.password,
          rol_id: Number(form.rol_id)
        })
      });

      setFeedback({
        tipo: 'success',
        mensaje: 'Usuario creado correctamente'
      });

      limpiarFormulario();
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="pedidos-page">
      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() => setFeedback({ ...feedback, mensaje: '' })}
      />

      <div className="pedidos-header">
        <div>
          <h1>Crear usuarios</h1>
          <p>Esta sección solo está disponible para administradores.</p>
        </div>
      </div>

      <form className="form-card" onSubmit={crearUsuario}>
        <h3>Nuevo usuario</h3>

        <label>Nombre completo</label>
        <input
          name="nombre_completo"
          value={form.nombre_completo}
          onChange={handleChange}
          placeholder="Ejemplo: Juan Pérez"
        />

        <label>Correo</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          placeholder="usuario@driza.com"
        />

        <label>Contraseña inicial</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mínimo 8 caracteres"
        />

        <label>Rol</label>
        <select
          name="rol_id"
          value={form.rol_id}
          onChange={handleChange}
        >
          <option value="">Seleccione rol</option>
          {roles.map((rol) => (
            <option key={rol.rol_id} value={rol.rol_id}>
              {rol.nombre}
            </option>
          ))}
        </select>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Creando usuario...' : 'Crear usuario'}
        </button>
      </form>
    </div>
  );
}

export default UsuariosAdmin;