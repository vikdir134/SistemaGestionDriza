const numeroFormatter =
  new Intl.NumberFormat(
    'es-PE',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  );


export const formatNumero = (
  valor:
    | number
    | string
    | null
    | undefined
) => {
  const numero =
    Number(
      valor ?? 0
    );

  if (
    !Number.isFinite(
      numero
    )
  ) {
    return '0.00';
  }

  return numeroFormatter
    .format(
      numero
    );
};


export const formatCantidad =
  formatNumero;


export const formatPeso =
  formatNumero;


export const formatPrecio =
  formatNumero;


export const formatMonto =
  formatNumero;


export const formatTotal =
  formatNumero;
