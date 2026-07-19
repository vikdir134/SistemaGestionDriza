import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';
import ClienteForm, {
  type ClienteFormData
} from '../../components/clientes/ClienteForm';

function EditarCliente() {
  const { cliente_id } = useParams();
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

  const cargarCliente = async () => {
    const data = await apiFetch(`/clientes/${cliente_id}`);

    setForm({
      ruc: data.cliente.ruc || '',
      razon_social: data.cliente.razon_social || '',
      direccion: data.cliente.direccion || '',
      telefono: data.cliente.telefono || '',
      correo: data.cliente.correo || '',
      agencia_entrega: data.cliente.agencia_entrega || ''
    });
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarCliente();
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    iniciar();
  }, [cliente_id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const editarCliente = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await apiFetch(`/clientes/${cliente_id}`, {
        method: 'PUT',
        body: JSON.stringify(form)
      });

      setFeedback({
        tipo: 'success',
        mensaje: 'Cliente actualizado correctamente'
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
          <h1>Editar cliente</h1>
          <p>Actualiza los datos comerciales del cliente.</p>
        </div>
      </div>

      <form className="form-card" onSubmit={editarCliente}>
        <h3>Datos del cliente</h3>

        <ClienteForm
          form={form}
          onChange={handleChange}
          textoBoton="Actualizar cliente"
        />
      </form>
    </div>
  );
}

export default EditarCliente;