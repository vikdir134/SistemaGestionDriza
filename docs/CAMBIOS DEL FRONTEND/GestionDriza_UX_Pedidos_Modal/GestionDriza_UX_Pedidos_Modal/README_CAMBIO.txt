GESTIONDRIZA - UX REGISTRO DE PEDIDOS CON MODAL
================================================

OBJETIVO
--------
Aplicar al registro de pedidos el mismo patrón UX aprobado para producción:

1. "Agregar producto" abre un modal.
2. El producto se completa dentro del modal.
3. "Agregar producto" incorpora el ítem al borrador, sin guardar todavía en BD.
4. Los productos preparados se muestran en una tabla ordenada en escritorio.
5. En celular se muestran como tarjetas responsive.
6. "Editar" abre el mismo modal con los valores actuales.
7. "Quitar" solicita confirmación y elimina el ítem del borrador.
8. "Guardar pedido" conserva el POST /pedidos existente y recién registra todo en BD.

ALCANCE
-------
Solo FRONTEND.

No cambia:
- Base de datos.
- Backend.
- Endpoint POST /pedidos.
- Payload de registro.
- Validaciones definitivas del backend.
- Reglas de presentación, precio, moneda o unidades.

ARCHIVOS
--------
NUEVO:
frontend/src/components/pedidos/PedidoItemsModalTable.tsx

REEMPLAZAR:
frontend/src/pages/pedidos/RegistrarPedido.tsx
frontend/src/styles/pedidosAntd.css

IMPORTANTE
----------
PedidoItemsEditor.tsx NO se reemplaza.
Se reutiliza dentro del modal para mantener los mismos campos y reglas visuales que ya tenía el registro de pedidos.
Esto evita cambiar por ahora la pantalla de edición de pedidos.

PRUEBAS RECOMENDADAS
--------------------
1. Abrir Registrar pedido.
2. Confirmar que el borrador inicia vacío.
3. Presionar Agregar producto.
4. Completar Tipo, Medida, Color, Material, Cantidad, Unidad, Presentación, Precio y Moneda.
5. Agregar producto.
6. Verificar la fila en la tabla.
7. Agregar varios productos.
8. Editar uno y guardar cambios.
9. Quitar uno y confirmar.
10. Registrar el pedido completo.
11. Comprobar que el backend recibe el mismo payload que antes.
12. Probar en ancho móvil: tarjetas, modal, botones y campos sin desbordes.
13. Ejecutar npm run build antes de commit/push.
