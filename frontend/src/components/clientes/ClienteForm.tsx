import type { ChangeEvent } from 'react';

export type ClienteFormData = {
  ruc: string;
  razon_social: string;
  direccion: string;
  telefono: string;
  correo: string;
  agencia_entrega: string;
};

type ClienteFormProps = {
  form: ClienteFormData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  textoBoton: string;
};

function ClienteForm({ form, onChange, textoBoton }: ClienteFormProps) {
  return (
    <>
      <label>RUC</label>
      <input
        name="ruc"
        value={form.ruc}
        onChange={onChange}
        placeholder="RUC del cliente"
      />

      <label>Razón social</label>
      <input
        name="razon_social"
        value={form.razon_social}
        onChange={onChange}
        placeholder="Razón social"
      />

      <label>Dirección</label>
      <input
        name="direccion"
        value={form.direccion}
        onChange={onChange}
        placeholder="Dirección fiscal o comercial"
      />

      <label>Teléfono</label>
      <input
        name="telefono"
        value={form.telefono}
        onChange={onChange}
        placeholder="Teléfono"
      />

      <label>Correo</label>
      <input
        name="correo"
        value={form.correo}
        onChange={onChange}
        placeholder="Correo"
      />

      <label>Agencia de entrega</label>
      <input
        name="agencia_entrega"
        value={form.agencia_entrega}
        onChange={onChange}
        placeholder="Ejemplo: SHALOM, MARVISUR, OLVA"
      />

      <button type="submit">
        {textoBoton}
      </button>
    </>
  );
}

export default ClienteForm;