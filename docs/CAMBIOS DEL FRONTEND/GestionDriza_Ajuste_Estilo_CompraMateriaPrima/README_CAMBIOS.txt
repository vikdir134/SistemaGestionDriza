GESTIONDRIZA - AJUSTE VISUAL COMPRA MATERIA PRIMA

Reemplazar:

1. src/pages/comprasMateriaPrima/RegistrarCompraMateriaPrima.tsx
2. src/styles/comprasMateriaPrima.css

Cambios:
- Moneda predeterminada: PEN / Soles.
- Formulario ocupa todo el ancho disponible.
- Cabecera usa hasta 3 columnas en escritorio.
- Fila de materia prima tiene mayor ancho para:
  * Cantidad
  * Precio unitario
  * Subtotal
- Cantidad muestra correctamente valores grandes.
- Indicadores visuales S/ o $ junto al precio.
- Total del lote más visible.
- Responsive para pantallas medianas y pequeñas.

Después ejecutar:
npm run build
