import { useRef, useState } from 'react';

export function useBloqueoAccion() {
  const bloqueoRef = useRef(false);
  const [procesando, setProcesando] = useState(false);

  const intentarBloquear = () => {
    if (bloqueoRef.current) {
      return false;
    }

    bloqueoRef.current = true;
    setProcesando(true);

    return true;
  };

  const liberar = () => {
    bloqueoRef.current = false;
    setProcesando(false);
  };

  return {
    procesando,
    intentarBloquear,
    liberar
  };
}