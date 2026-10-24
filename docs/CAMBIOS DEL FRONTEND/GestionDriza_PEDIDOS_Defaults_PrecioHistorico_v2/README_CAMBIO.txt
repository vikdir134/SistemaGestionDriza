GestionDriza - Pedidos: valores predeterminados + último precio del cliente
==========================================================================

ALCANCE
- No requiere migración ni cambio de esquema SQL Server.
- Sí requiere cambios en frontend y backend.
- Mantiene el POST /api/pedidos existente sin cambiar su contrato.

NUEVO COMPORTAMIENTO EN REGISTRAR PEDIDO
1. Al abrir "Agregar producto" el modal intenta dejar seleccionados automáticamente:
   - Tipo: DRIZA
   - Material: POLIPROPILENO
   - Color: BLANCO
   - Unidad: KG
   - Unidad de presentación: KG
   - Moneda inicial: PEN
   La medida queda para selección del usuario.

2. Es obligatorio seleccionar primero un cliente antes de abrir el modal.

3. Cuando el producto queda definido por Tipo + Medida + Color + Material:
   - el frontend consulta el último precio histórico de ese cliente para esa combinación exacta;
   - si existe, completa Precio unitario y Moneda con el registro más reciente;
   - si no existe, deja el precio vacío para ingreso manual;
   - el precio autocompletado sigue siendo editable.

4. Al registrar el pedido, el comportamiento existente continúa guardando el precio en crm.ClientePrecioHistorial.

BACKEND
Nuevo endpoint de lectura autenticado:
GET /api/clientes/precios/ultimo
Query params:
- cliente_id
- tipo_producto_id
- medida_id
- color_id
- material_id

La búsqueda es exacta y devuelve TOP 1 ordenado por:
- fecha_precio DESC
- created_at DESC
- precio_cliente_id DESC

ARCHIVOS MODIFICADOS
backend/src/modules/clientes/cliente.controller.js
backend/src/modules/clientes/cliente.model.js
backend/src/modules/clientes/cliente.routes.js
frontend/src/components/pedidos/PedidoItemsModalTable.tsx
frontend/src/pages/pedidos/RegistrarPedido.tsx
frontend/src/styles/pedidosAntd.css

PRUEBAS RECOMENDADAS
1. Seleccionar un cliente.
2. Abrir Agregar producto y confirmar DRIZA / POLIPROPILENO / BLANCO / KG.
3. Seleccionar una medida que tenga historial para ese cliente.
4. Confirmar que precio y moneda se completen con el último registro.
5. Cambiar medida/color/material y confirmar que se consulte nuevamente.
6. Probar un producto sin historial: el precio debe quedar vacío y ser editable.
7. Agregar producto, editarlo, quitarlo y registrar el pedido.
8. Probar desktop y móvil.
9. Ejecutar npm run build antes del commit.

NO EJECUTAR MIGRACIONES SQL PARA ESTE CAMBIO.

AJUSTE UX - AVISO TEMPORAL DE PRECIO HISTORICO
- El aviso de precio histórico encontrado desaparece automáticamente después de 4.5 segundos.
- El aviso de que no existe precio histórico también desaparece después de 4.5 segundos.
- El precio autocompletado permanece en el campo; solo se oculta el mensaje informativo.
