type ConfirmDialogProps = {
  abierto: boolean;
  titulo: string;
  descripcion: string;
  textoConfirmar?: string;
  onConfirmar: () => void;
  onCerrar: () => void;
};

function ConfirmDialog({
  abierto,
  titulo,
  descripcion,
  textoConfirmar = 'Confirmar',
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
          <button type="button" className="btn-secondary" onClick={onCerrar}>
            Cancelar
          </button>

          <button type="button" onClick={onConfirmar}>
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;