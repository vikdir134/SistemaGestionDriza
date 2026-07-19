import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';
import ClienteForm, {
  type ClienteFormData
} from '../../components/clientes/ClienteForm';

function RegistrarCliente() {
  const navigate = useNavigate();

  const [form, setForm] = useState<ClienteFormData>({
    ruc: '',
    razon_social: '',
    direccion: '',
    telefono: '',
    correo: '',
    agencia_entrega: ''
  });

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info',
    mensaje: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registrarCliente = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await apiFetch('/clientes', {
        method: 'POST',
        body: JSON.stringify(form)
      });

      setFeedback({
        tipo: 'success',
        mensaje: 'Cliente registrado correctamente'
      });

      setTimeout(() => {
        navigate('/gestion/clientes');
      }, 800);

    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  return (
    <div className="pedidos-page">
      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() => setFeedback({ ...feedback, mensaje: '' })}
      />

      <Link to="/gestion/clientes" className="btn-volver">
        ← Volver a clientes
      </Link>

      <div className="pedidos-header">
        <div>
          <h1>Registrar cliente</h1>
          <p>Agrega un nuevo cliente al sistema.</p>
        </div>
      </div>

      <form className="form-card" onSubmit={registrarCliente}>
        <h3>Datos del cliente</h3>

        <ClienteForm
          form={form}
          onChange={handleChange}
          textoBoton="Guardar cliente"
        />
      </form>
    </div>
  );
}

export default RegistrarCliente;