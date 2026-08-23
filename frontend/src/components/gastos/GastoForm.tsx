import type {
  ChangeEvent,
  FormEvent
} from 'react';


export type GastoFormData = {
  tipo_gasto_id: string;
  proveedor_id: string;
  fecha_gasto: string;
  monto: string;
  moneda_codigo: string;
  descripcion: string;
  comprobante: string;
};


export const gastoFormVacio: GastoFormData = {
  tipo_gasto_id: '',
  proveedor_id: '',
  fecha_gasto: '',
  monto: '',
  moneda_codigo: 'PEN',
  descripcion: '',
  comprobante: ''
};


export const validarGastoForm = (
  form: GastoFormData,
  exigirFecha = false
) => {
  if (!form.tipo_gasto_id) {
    return 'Debe seleccionar un tipo de gasto';
  }

  const monto = Number(form.monto);

  if (
    !Number.isFinite(monto) ||
    monto <= 0
  ) {
    return 'El monto debe ser mayor a 0';
  }

  if (
    !['PEN', 'USD'].includes(
      form.moneda_codigo
    )
  ) {
    return 'Debe seleccionar una moneda válida';
  }

  if (
    exigirFecha &&
    !form.fecha_gasto
  ) {
    return 'La fecha del gasto es obligatoria';
  }

  return null;
};


type GastoFormProps = {
  titulo: string;

  form: GastoFormData;

  tiposGasto: any[];

  proveedores: any[];

  procesando?: boolean;

  textoBoton: string;

  textoProcesando?: string;

  onChange: (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => void;

  onSubmit: (
    e: FormEvent
  ) => void;
};


function GastoForm({
  titulo,
  form,
  tiposGasto,
  proveedores,
  procesando = false,
  textoBoton,
  textoProcesando = 'Procesando...',
  onChange,
  onSubmit
}: GastoFormProps) {
  return (
    <form
      className="form-card pedido-form gasto-form-card"
      onSubmit={onSubmit}
    >
      <h3>{titulo}</h3>

      <div className="gasto-form-grid">

        <div>
          <label>
            Tipo de gasto
          </label>

          <select
            name="tipo_gasto_id"
            value={form.tipo_gasto_id}
            onChange={onChange}
            disabled={procesando}
          >
            <option value="">
              Seleccione tipo
            </option>

            {tiposGasto.map((tipo) => (
              <option
                key={tipo.tipo_gasto_id}
                value={tipo.tipo_gasto_id}
              >
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>


        <div>
          <label>
            Proveedor opcional
          </label>

          <select
            name="proveedor_id"
            value={form.proveedor_id}
            onChange={onChange}
            disabled={procesando}
          >
            <option value="">
              Sin proveedor
            </option>

            {proveedores.map(
              (proveedor) => (
                <option
                  key={
                    proveedor.proveedor_id
                  }
                  value={
                    proveedor.proveedor_id
                  }
                >
                  {proveedor.razon_social}
                  {' - '}
                  {proveedor.ruc}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Fecha de gasto
          </label>

          <input
            type="date"
            name="fecha_gasto"
            value={form.fecha_gasto}
            onChange={onChange}
            disabled={procesando}
          />
        </div>


        <div>
          <label>
            Moneda
          </label>

          <select
            name="moneda_codigo"
            value={form.moneda_codigo}
            onChange={onChange}
            disabled={procesando}
          >
            <option value="PEN">
              Soles
            </option>

            <option value="USD">
              Dólares
            </option>
          </select>
        </div>


        <div>
          <label>
            Monto
          </label>

          <input
            type="number"
            name="monto"
            value={form.monto}
            onChange={onChange}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            disabled={procesando}
          />
        </div>


        <div>
          <label>
            Comprobante
          </label>

          <input
            name="comprobante"
            value={form.comprobante}
            onChange={onChange}
            placeholder="Ejemplo: F001-000123"
            disabled={procesando}
          />
        </div>


        <div className="gasto-campo-completo">
          <label>
            Descripción
          </label>

          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={onChange}
            placeholder="Ejemplo: Pago de luz del local"
            rows={3}
            disabled={procesando}
          />
        </div>

      </div>


      <div className="gasto-form-actions">
        <button
          type="submit"
          disabled={procesando}
        >
          {procesando
            ? textoProcesando
            : textoBoton}
        </button>
      </div>
    </form>
  );
}


export default GastoForm;