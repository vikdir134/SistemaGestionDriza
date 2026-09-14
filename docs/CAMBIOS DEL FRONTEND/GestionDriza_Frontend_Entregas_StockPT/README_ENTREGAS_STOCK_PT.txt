GESTIONDRIZA - FRONTEND ENTREGAS + STOCK DE PRODUCTO TERMINADO

ARCHIVOS

Reemplazar:
src/pages/EntregaPedidoDetalle.tsx

Agregar:
src/styles/entregasStock.css


NO REQUIERE CAMBIOS EN:
- App.tsx
- Sidebar.tsx
- Entregas.tsx


NUEVA UX DEL DETALLE DEL PEDIDO

Cada producto muestra:
- Pedido
- Entregado
- Pendiente
- Presentación
- Stock disponible
- Presentaciones disponibles
- Estado del stock


ESTADOS DE STOCK

CON_STOCK:
Stock disponible

SIN_STOCK:
Sin stock

SIN_PRESENTACION:
Presentación no configurada

SIN_PRODUCTO:
Producto no configurado


REGLA DE PRESENTACION

Ejemplo:

Pedido:
100 KG
Presentación 50 KG

La interfaz permite:
50
100

No permite:
30
75


MAXIMO ENTREGABLE

Se calcula como:

min(
  cantidad pendiente,
  stock disponible
)

redondeado hacia abajo al múltiplo de presentación.

Ejemplo:

Pendiente = 200
Stock = 130
Presentación = 50

Máximo entregable mostrado = 100 KG.


SEGURIDAD

Antes de registrar:
- validación frontend;
- ConfirmDialog;
- useBloqueoAccion;
- Idempotency-Key.

Si la red falla después de que el backend hizo COMMIT,
se conserva la misma key para poder reintentar sin duplicar
la entrega ni descontar stock de nuevo.

Después de una operación exitosa:
- se genera una nueva key;
- se recarga el pedido;
- el stock actualizado aparece inmediatamente.


PRUEBA CONTROLADA

Con el producto actualmente existente:

DRIZA / POLIPROPILENO / 1PULG / BLANCO
Presentación 50 KG
Stock 100 KG

Usar un pedido que contenga exactamente ese producto con
presentación 50 KG.

Antes:
Stock = 100 KG
Presentaciones = 2

Registrar:
50 KG

Después:
Stock = 50 KG
Presentaciones = 1

Además:
Almacén -> Producto terminado -> detalle

Debe aparecer:
SALIDA_ENTREGA -50 KG


PRUEBA DE ERROR

Intentar 30 KG para presentación 50 KG.

Frontend debe impedirlo.
Backend también debe rechazarlo si se intenta saltar el frontend.
