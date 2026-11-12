const cabecera = {
  pedido_id: 101, ruc: '00123456789', razon_social: 'Cliente de prueba', fecha_pedido: '2026-10-01',
  ultima_entrega: '2026-11-05', estado_pedido: 'PARCIAL', estado_pago: 'PARCIAL', registrado_por: 'Vendedor de prueba',
  total_pen: 1600, total_usd: 30, tiene_pen: 1, tiene_usd: 1
};
const producto = {
  ...cabecera, pedido_detalle_id: 1, producto_id: 1, tipo_producto_id: 1, material_id: 1, medida_id: 1, color_id: 1,
  producto: 'Driza Nylon 8 mm Azul', descripcion_item: 'Producto de prueba', cantidad_pedida: 100, unidad: 'KG',
  cantidad_entregada: 100, cantidad_pendiente: 0, cantidad_presentacion: 5, unidad_presentacion: 'KG',
  precio_unitario: 10, moneda_codigo: 'PEN', subtotal: 1000
};
const filasPrueba = () => [
  { ...producto },
  { ...producto, pedido_detalle_id: 2, cantidad_pedida: 50, cantidad_entregada: 30, cantidad_pendiente: 20,
    cantidad_presentacion: 10, precio_unitario: 12, subtotal: 600 },
  { ...producto, pedido_detalle_id: 3, tipo_producto_id: 2, producto: 'Cuerda por unidad', unidad: 'UND',
    cantidad_pedida: 2, cantidad_entregada: 0, cantidad_pendiente: 2, cantidad_presentacion: null,
    unidad_presentacion: null, precio_unitario: 15, moneda_codigo: 'USD', subtotal: 30 },
  { ...producto, pedido_id: 100, pedido_detalle_id: 4, fecha_pedido: '2026-09-30', ultima_entrega: null,
    estado_pedido: 'REGISTRADO', estado_pago: 'SIN_PAGO', cantidad_entregada: 0, cantidad_pendiente: 100,
    total_pen: 1000, total_usd: 0, tiene_usd: 0 }
];
const datosPrueba = { exportadoPor: 'Persona que exporta', clientes: ['Cliente de prueba (00123456789)'], registradoPor: 'Vendedor de prueba' };
module.exports = { filasPrueba, datosPrueba };
