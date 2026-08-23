type ConfirmDialogProps = {
  abierto: boolean;
  titulo: string;
  descripcion: string;
  textoConfirmar?: string;
  textoProcesando?: string;
  procesando?: boolean;
  onConfirmar: () => void;
  onCerrar: () => void;
};

function ConfirmDialog({
  abierto,
  titulo,
  descripcion,
  textoConfirmar = 'Confirmar',
  textoProcesando = 'Procesando...',
  procesando = false,
  onConfirmar,
  onCerrar
}: ConfirmDialogProps) {
  if (!abierto) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-card">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>

        <div className="dialog-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCerrar}
            disabled={procesando}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirmar}
            disabled={procesando}
          >
            {procesando
              ? textoProcesando
              : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;