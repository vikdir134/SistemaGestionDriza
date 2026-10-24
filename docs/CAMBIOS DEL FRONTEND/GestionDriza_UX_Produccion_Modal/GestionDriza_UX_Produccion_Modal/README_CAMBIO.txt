GestionDriza - Mejora UX Registro de Producción

ALCANCE
- Solo frontend.
- No requiere cambios de backend.
- No requiere migraciones ni cambios de base de datos.

ARCHIVOS A REEMPLAZAR
1. frontend/src/pages/producciones/RegistrarProduccion.tsx
2. frontend/src/styles/produccionesAntd.css

CAMBIO FUNCIONAL
- "Agregar producto" abre un modal.
- El producto se configura completamente dentro del modal.
- Al aceptar, el producto se agrega a una tabla/resumen de la producción.
- Cada fila tiene Editar y Quitar.
- Editar reabre el mismo modal con los datos actuales.
- Quitar solicita confirmación.
- En móvil la tabla se transforma en tarjetas compactas para evitar scroll horizontal.
- El envío final al backend conserva exactamente el mismo payload y la misma Idempotency-Key.
- Se mantiene la validación de composición vigente y múltiplos de presentación.
- Se mantienen máximo 50 productos por producción.

PRUEBAS RECOMENDADAS
1. npm run build
2. Agregar 3 o más productos sin desplazarse por formularios largos.
3. Editar un producto ya agregado y confirmar que la fila se actualiza.
4. Quitar un producto y confirmar la eliminación.
5. Intentar registrar con lista vacía: debe bloquearse.
6. Intentar cantidad no múltiplo de presentación: debe bloquearse.
7. Verificar móvil <= 767 px: tarjetas, modal y botones sin overflow.
8. Registrar una producción real y validar FIFO/stock como antes.
