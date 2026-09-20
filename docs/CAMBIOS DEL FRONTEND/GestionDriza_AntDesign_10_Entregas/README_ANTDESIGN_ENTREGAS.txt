GESTIONDRIZA - ANT DESIGN
ETAPA 10: ENTREGAS

ALCANCE

Se migran completamente:

- Listado de pedidos por entregar
- Detalle de pedido para entrega
- Registro de entrega
- Validación de stock
- Validación de presentación
- Historial de entregas


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/pages/Entregas.tsx
src/pages/EntregaPedidoDetalle.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/entregasAntd.css


NO SE MODIFICA

- backend
- rutas
- App.tsx
- trigger histórico
- descuento de stock PT
- idempotencia


============================================================
LISTADO
============================================================

Solo muestra pedidos:

REGISTRADO
PARCIAL

según la lógica existente del backend.

Filtros:

- Cliente
- Búsqueda

Table:

- Código
- Cliente
- Fecha
- Entrega estimada
- Estado de entrega
- Productos
- Acción

NO se muestra pedido_id.


============================================================
DETALLE / REGISTRO
============================================================

Por producto se mantiene:

- Pedido
- Entregado
- Pendiente
- Presentación
- Stock disponible
- Presentaciones disponibles
- Estado del producto
- Estado de stock


============================================================
ESTADOS DE STOCK
============================================================

CON_STOCK
-> Stock disponible

SIN_STOCK
-> Sin stock

SIN_PRESENTACION
-> Presentación no configurada

SIN_PRODUCTO
-> Producto no configurado


============================================================
MAXIMO ENTREGABLE
============================================================

Se conserva la fórmula existente:

limite =
min(
  pendiente,
  stock
)

maximo =
floor(
  limite / presentacion
)
* presentacion


Ejemplo:

Pendiente:
130.00 KG

Stock:
120.00 KG

Presentación:
50.00 KG

Máximo:
100.00 KG


============================================================
PRESENTACION EXACTA
============================================================

La cantidad debe ser múltiplo de la presentación
indicada en el pedido.

Se conserva la validación con escala 1000 para seguir
alineados al backend.

La interfaz muestra e ingresa normalmente 2 decimales.


============================================================
2 DECIMALES
============================================================

Se muestran con 2 decimales:

- Pedido
- Entregado
- Pendiente
- Presentación
- Stock
- Presentaciones disponibles
- Cantidad a entregar
- Totales
- Historial


============================================================
RESUMEN DE ENTREGA
============================================================

Antes la interfaz sumaba todas las cantidades y colocaba:

KG

sin importar la unidad.

Ahora se agrupa por unidad.

Ejemplo:

100.00 KG
2.00 ROLLO

Esto evita mostrar un total incorrecto si existieran
productos con unidades distintas.


============================================================
IDEMPOTENCIA
============================================================

Se mantiene:

Idempotency-Key

Antes de éxito:
la key permanece estable.

Si falla:
se conserva la misma key.

Después de una entrega confirmada:
se genera una nueva key porque el siguiente registro
representa una nueva operación.


============================================================
CONFIRMACION
============================================================

Registrar entrega requiere confirmación porque:

- disminuye stock de producto terminado;
- modifica lo pendiente del pedido;
- puede cambiar el estado del pedido.

Se utiliza:

modal.confirm()


============================================================
HISTORIAL
============================================================

Ya NO se muestra:

Entrega #15

porque entrega_id es un identificador interno.

Se muestra una secuencia amigable:

Entrega 1
Entrega 2
...

además de:

- Fecha entrega
- Fecha de registro
- Registrado por
- Comentario
- Producto
- Presentación
- Cantidad
- Observación


============================================================
DARK / LIGHT
============================================================

Todos los componentes principales son Ant Design.

Table utiliza themeConfig global.

No se agregan fondos blancos fijos.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev


LISTADO:
/gestion/entregas

Probar:

- búsqueda
- cliente
- limpiar
- paginación
- dark/light
- mobile


DETALLE:
/gestion/entregas/:pedido_id

Probar:

1. producto completo
2. producto pendiente
3. producto parcial
4. SIN_PRODUCTO
5. SIN_PRESENTACION
6. SIN_STOCK
7. stock menor a una presentación
8. cantidad > pendiente
9. cantidad > stock
10. cantidad no múltiplo de presentación
11. entrega parcial
12. entrega total
13. dos productos en una misma entrega
14. confirmación
15. doble clic
16. retry tras error
17. historial
18. dark/light
19. mobile


============================================================
SIGUIENTE MODULO
============================================================

DEPÓSITOS

Después de Entregas corresponde migrar:

- listado / resumen
- registro
- detalle o movimientos disponibles
- relación con pedidos
- monedas
- saldos
- validaciones de monto
- doble envío
- 2 decimales
