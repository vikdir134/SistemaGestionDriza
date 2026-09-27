GESTIONDRIZA - ANT DESIGN
ETAPA 09: PEDIDOS

ALCANCE

Se migran:

- Listado de pedidos
- Registrar pedido
- Detalle de pedido
- Editar pedido
- Editor reutilizable de productos
- Historial de cambios


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/components/pedidos/PedidoItemsEditor.tsx

src/pages/pedidos/PedidosLista.tsx
src/pages/pedidos/RegistrarPedido.tsx
src/pages/pedidos/PedidoDetalle.tsx
src/pages/pedidos/EditarPedido.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/pedidosAntd.css


============================================================
NO SE MODIFICA
============================================================

- backend
- App.tsx
- rutas
- reglas de entregas
- reglas de depósitos
- historial de precios
- producto_id
- historial de cambios


============================================================
LISTADO
============================================================

Filtros:

- Cliente
- Estado
- Búsqueda

Paginación:
backend

Table:
Ant Design

NO se muestra pedido_id.

Si existe código comercial:
se muestra codigo_pedido.


============================================================
2 DECIMALES
============================================================

Se aplica a:

- Cantidades
- Cantidad entregada
- Cantidad pendiente
- Presentación
- Precio
- Subtotal
- Total
- Resumen por unidad

Ejemplos:

100.00 KG
50.00 KG
15.00 PEN
750.00 PEN


============================================================
REGISTRAR PEDIDO
============================================================

Se conserva:

- Cliente
- Código opcional
- Fecha pedido
- Fecha entrega estimada
- Descripción
- Múltiples productos

Producto:

- Tipo
- Medida
- Color
- Material
- Cantidad
- Unidad
- Presentación
- Unidad presentación
- Precio
- Moneda
- Descripción
- Observación

La unidad de presentación sigue automáticamente
la unidad principal, igual que antes.


============================================================
EDICION
============================================================

Reglas conservadas:

Pedido ENTREGADO:
no editable.

Pedido CANCELADO:
no editable.

Producto con entrega:
NO puede cambiar:
- Tipo
- Medida
- Color
- Material
- Unidad
- Moneda

SÍ puede cambiar:
- Cantidad
- Presentación
- Precio
- Descripción
- Observación

Cantidad:
nunca puede ser inferior a lo ya entregado.


============================================================
NUEVOS PRODUCTOS EN EDICION
============================================================

Se mantiene:

- pueden agregarse opcionalmente;
- las filas completamente vacías no se envían;
- deben cumplir las mismas validaciones de producto.


============================================================
MOTIVO DE CAMBIO
============================================================

Obligatorio.

Se muestra el texto porque tiene sentido de negocio:
el motivo queda registrado en el historial.


============================================================
CONFIRMACION DE EDICION
============================================================

Se mantiene confirmación porque una edición puede afectar:

- cantidades pendientes;
- precios;
- historial;
- validación frente a depósitos existentes.

El backend sigue siendo la autoridad final.


============================================================
DOBLE ENVIO
============================================================

Registrar:
useBloqueoAccion

Editar:
useBloqueoAccion

En éxito no se libera antes de navegar.

En error se libera para permitir reintento.


============================================================
DETALLE
============================================================

Se muestra:

- Estado
- Cliente
- Fecha
- Entrega estimada
- Registrado por
- Dirección
- Agencia
- Descripción
- Totales por moneda
- Productos
- Cantidad pedida
- Entregada
- Pendiente
- Presentación
- Precio
- Subtotal
- Estado de entrega
- Historial de cambios

NO se muestran IDs internos.


============================================================
DARK / LIGHT
============================================================

Los componentes son Ant Design.

Table hereda el themeConfig global.

No se agregan backgrounds blancos fijos.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev


LISTADO:
/gestion/pedidos

Probar:
- filtros
- búsqueda
- paginación
- estados
- editar
- pedido cerrado
- dark/light
- mobile


REGISTRAR:
/gestion/pedidos/registrar

Probar:
- cliente vacío
- producto incompleto
- cantidad <= 0
- precio <= 0
- presentación inválida
- PEN
- USD
- varios productos
- quitar producto
- combinación inexistente en Productos terminados
- código duplicado
- doble clic
- creación correcta


DETALLE:
/gestion/pedidos/:pedido_id

Probar:
- totales PEN/USD
- cantidades 2 decimales
- estados de entrega
- historial
- pedido entregado
- pedido cancelado


EDITAR:
/gestion/pedidos/:pedido_id/editar

Probar:
- pedido registrado
- pedido parcial
- producto sin entregas
- producto con entregas
- intentar cambiar estructura con entrega
- bajar cantidad por debajo de entregado
- precio
- presentación
- nuevo producto
- motivo vacío
- depósito mayor al nuevo total
- confirmación
- doble clic


============================================================
SIGUIENTE MODULO
============================================================

ENTREGAS

Después de Pedidos corresponde migrar:

- listado de pedidos pendientes/parciales
- detalle para entrega
- disponibilidad de stock
- presentación exacta
- cantidad entregada
- idempotencia
- descuento de stock PT
- historial de entregas
- 2 decimales
