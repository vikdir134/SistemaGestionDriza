import type { ChangeEvent } from 'react';

export type DetallePedidoForm = {
  tipo_producto_id: string;
  medida_id: string;
  color_id: string;
  material_id: string;
  cantidad_pedida: string;
  unidad_medida_id: string;
  cantidad_presentacion: string;
  unidad_presentacion_id: string;
  precio_unitario: string;
  moneda_codigo: string;
  descripcion_item: string;
  observacion: string;
};

export const detallePedidoVacio: DetallePedidoForm = {
  tipo_producto_id: '',
  medida_id: '',
  color_id: '',
  material_id: '',
  cantidad_pedida: '',
  unidad_medida_id: '',
  cantidad_presentacion: '',
  unidad_presentacion_id: '',
  precio_unitario: '',
  moneda_codigo: 'PEN',
  descripcion_item: '',
  observacion: ''
};

type PedidoItemsEditorProps = {
  detalles: DetallePedidoForm[];
  setDetalles: (detalles: DetallePedidoForm[]) => void;
  tipos: any[];
  medidas: any[];
  colores: any[];
  materiales: any[];
  unidades: any[];
  titulo?: string;
  textoBotonAgregar?: string;
  onFeedback?: (tipo: 'success' | 'error' | 'info' | 'warning', mensaje: string) => void;
};

function PedidoItemsEditor({
  detalles,
  setDetalles,
  tipos,
  medidas,
  colores,
  materiales,
  unidades,
  titulo = 'Productos del pedido',
  textoBotonAgregar = '+ Agregar producto',
  onFeedback
}: PedidoItemsEditorProps) {
  const handleDetalleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const nuevosDetalles = [...detalles];

    if (name === 'unidad_medida_id') {
      nuevosDetalles[index] = {
        ...nuevosDetalles[index],
        unidad_medida_id: value,
        unidad_presentacion_id: value
      };
    } else {
      nuevosDetalles[index] = {
        ...nuevosDetalles[index],
        [name]: value
      };
    }

    setDetalles(nuevosDetalles);
  };

  const agregarDetalle = () => {
    setDetalles([...detalles, { ...detallePedidoVacio }]);

    onFeedback?.(
      'success',
      'Producto agregado al pedido'
    );
  };

  const quitarDetalle = (index: number) => {
    if (detalles.length === 1) {
      onFeedback?.(
        'error',
        'Debe existir al menos un producto en el pedido'
      );
      return;
    }

    setDetalles(detalles.filter((_, i) => i !== index));

    onFeedback?.(
      'warning',
      'Producto retirado del pedido'
    );
  };

  const calcularSubtotal = (detalle: DetallePedidoForm) => {
    return Number(detalle.cantidad_pedida || 0) * Number(detalle.precio_unitario || 0);
  };

  return (
    <div className="pedido-productos-section">
      <div className="pedido-productos-header">
        <h3>{titulo}</h3>

        <button type="button" onClick={agregarDetalle}>
          {textoBotonAgregar}
        </button>
      </div>

      {detalles.map((detalle, index) => (
        <div className="detalle-card" key={index}>
          <div className="detalle-header">
            <strong>Producto {index + 1}</strong>

            <button
              type="button"
              className="btn-danger"
              onClick={() => quitarDetalle(index)}
            >
              Quitar
            </button>
          </div>

          <div className="detalle-grid detalle-grid-5">
            <div>
              <label>Tipo</label>
              <select
                name="tipo_producto_id"
                value={detalle.tipo_producto_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Seleccione</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Medida</label>
              <select
                name="medida_id"
                value={detalle.medida_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Seleccione</option>
                {medidas.map((medida) => (
                  <option key={medida.id} value={medida.id}>
                    {medida.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Color</label>
              <select
                name="color_id"
                value={detalle.color_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">-</option>
                {colores.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Material</label>
              <select
                name="material_id"
                value={detalle.material_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Seleccione</option>
                {materiales.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Cantidad total</label>
              <input
                type="number"
                name="cantidad_pedida"
                value={detalle.cantidad_pedida}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="0"
              />
            </div>

            <div>
              <label>Unidad</label>
              <select
                name="unidad_medida_id"
                value={detalle.unidad_medida_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Seleccione</option>
                {unidades.map((unidad) => (
                  <option key={unidad.unidad_medida_id} value={unidad.unidad_medida_id}>
                    {unidad.codigo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Presentación</label>
              <input
                type="number"
                name="cantidad_presentacion"
                value={detalle.cantidad_presentacion}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="0"
              />
            </div>

            <div>
              <label>Unidad presentación</label>
              <select
                name="unidad_presentacion_id"
                value={detalle.unidad_presentacion_id}
                onChange={(e) => handleDetalleChange(index, e)}
                disabled
              >
                <option value="">Igual a unidad</option>
                {unidades.map((unidad) => (
                  <option key={unidad.unidad_medida_id} value={unidad.unidad_medida_id}>
                    {unidad.codigo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Precio</label>
              <input
                type="number"
                name="precio_unitario"
                value={detalle.precio_unitario}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="0.00"
              />
            </div>

            <div>
              <label>Moneda</label>
              <select
                name="moneda_codigo"
                value={detalle.moneda_codigo}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="PEN">Soles</option>
                <option value="USD">Dólares</option>
              </select>
            </div>

            <div>
              <label>Subtotal</label>
              <input
                value={calcularSubtotal(detalle).toFixed(2)}
                disabled
              />
            </div>
          </div>

          <div className="detalle-textos-grid">
            <div>
              <label>Descripción del producto</label>
              <input
                name="descripcion_item"
                value={detalle.descripcion_item}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Ejemplo: DRIZA POLIESTER 1/4 BLANCO"
              />
            </div>

            <div>
              <label>Observación</label>
              <input
                name="observacion"
                value={detalle.observacion}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Observación opcional"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PedidoItemsEditor;