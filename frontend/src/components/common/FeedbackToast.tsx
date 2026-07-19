import { useEffect } from 'react';

type FeedbackTipo = 'success' | 'error' | 'info' | 'warning';

type FeedbackToastProps = {
  tipo: FeedbackTipo;
  mensaje: string;
  onClose: () => void;
  duracion?: number;
};

function FeedbackToast({
  tipo,
  mensaje,
  onClose,
  duracion = 3500
}: FeedbackToastProps) {
  useEffect(() => {
    if (!mensaje) return;

    const timer = setTimeout(() => {
      onClose();
    }, duracion);

    return () => clearTimeout(timer);
  }, [mensaje, duracion, onClose]);

  if (!mensaje) return null;

  return (
    <div className={`feedback-toast feedback-${tipo}`}>
      <div>
        <strong>
          {tipo === 'success' && 'Correcto'}
          {tipo === 'error' && 'Error'}
          {tipo === 'info' && 'Información'}
          {tipo === 'warning' && 'Advertencia'}
        </strong>
        <p>{mensaje}</p>
      </div>

      <button type="button" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default FeedbackToast;