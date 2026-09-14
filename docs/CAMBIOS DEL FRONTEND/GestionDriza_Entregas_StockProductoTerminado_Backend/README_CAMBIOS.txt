GESTIONDRIZA - ENTREGAS + STOCK PRODUCTO TERMINADO

OBJETIVO

Integrar el registro de Entregas con:
- inventario.StockProductoTerminado
- inventario.MovimientoProductoTerminado

El pedido NO reserva stock.
El stock disminuye únicamente al registrar la entrega.


============================================================
1. MIGRACION
============================================================

Copiar:

database/migrations/
20260913_02_entrega_stock_producto_terminado.sql

Ejecutar:

node scripts/run-migrations.js


La migración agrega:

ventas.Entrega.idempotency_key

Índice:
UX_Entrega_IdempotencyKey

También agrega:

UX_MovimientoProductoTerminado_EntregaDetalle

para impedir más de un movimiento de stock por EntregaDetalle.


============================================================
2. BACKEND
============================================================

Reemplazar:

backend/src/modules/entregas/
- entrega.controller.js
- entrega.model.js
- entrega.routes.js

No requiere cambios en app.js porque /api/entregas ya está montado.


============================================================
3. REGLAS DE NEGOCIO IMPLEMENTADAS
============================================================

PEDIDO:
- no reserva producto terminado;
- no descuenta producto terminado.

ENTREGA:
- valida que el detalle pertenezca al pedido;
- valida cantidad pendiente;
- valida unidad;
- resuelve producto terminado;
- exige presentación configurada;
- exige múltiplos exactos de la presentación;
- busca stock de la presentación EXACTA;
- no permite stock negativo;
- descuenta stock;
- genera SALIDA_ENTREGA;
- enlaza movimiento con entrega_detalle_id;
- actualiza estado REGISTRADO/PARCIAL/ENTREGADO.

Todo ocurre en una sola transacción SERIALIZABLE.


============================================================
4. PRODUCTO_ID HISTORICO
============================================================

PedidoDetalle.producto_id puede venir NULL en pedidos antiguos
o en pedidos creados por la interfaz antigua.

Entregas NO falla automáticamente por eso.

Si producto_id es NULL, resuelve el producto mediante:

Tipo + Material + Medida + Color

aprovechando el catálogo real de catalog.Producto.

Si no existe esa combinación en catalog.Producto:
la entrega se rechaza.


============================================================
5. PRESENTACION
============================================================

Ejemplo:

Pedido:
DRIZA / PP / 1PULG / BLANCO
Cantidad: 200 KG
Presentación: 50 KG

Permitido:
50
100
150
200

No permitido:
30
75
125

El stock debe existir exactamente como:

Producto correspondiente
unidad_medida = KG
cantidad_presentacion = 50
unidad_presentacion = KG


Tener 300 KG en presentación de 30 KG NO sirve
para entregar un pedido cuya presentación es 50 KG.


============================================================
6. RESPUESTA GET DEL PEDIDO
============================================================

GET /api/entregas/pedidos/:pedido_id

Ahora cada detalle incluye:

- producto_id resuelto
- stock_producto_terminado_id
- stock_disponible
- presentaciones_disponibles
- estado_stock

estado_stock puede ser:

CON_STOCK
SIN_STOCK
SIN_PRESENTACION
SIN_PRODUCTO


============================================================
7. IDEMPOTENCIA
============================================================

POST /api/entregas

Header recomendado:

Idempotency-Key: entrega-prueba-001

Primer envío:
201 Created
reutilizada = false

Mismo request con misma key:
200 OK
reutilizada = true

No vuelve a:
- insertar Entrega
- insertar EntregaDetalle
- descontar stock
- crear SALIDA_ENTREGA


============================================================
8. PRUEBA CONTROLADA SUGERIDA
============================================================

Actualmente existe:

DRIZA / POLIPROPILENO / 1PULG / BLANCO
Presentación 50 KG
Stock: 100 KG

Para probar Entregas crea/usa un pedido con:

DRIZA
POLIPROPILENO
1PULG
BLANCO
Cantidad pedida: 100 KG
Presentación: 50 KG
Unidad: KG

Antes:

GET /api/entregas/pedidos/:pedido_id

Debe mostrar:
stock_disponible = 100
presentaciones_disponibles = 2
estado_stock = CON_STOCK


POST /api/entregas

Headers:
Authorization: Bearer ...
Content-Type: application/json
Idempotency-Key: prueba-entrega-001

Body:

{
  "pedido_id": ID_PEDIDO,
  "fecha_entrega": "2026-09-13",
  "comentario_entrega": "Prueba stock PT",
  "detalles": [
    {
      "pedido_detalle_id": ID_DETALLE,
      "cantidad_entregada": 50,
      "unidad_medida_id": 1,
      "observacion": "Primera entrega"
    }
  ]
}


Esperado:

Entrega creada.

Stock PT:
100 -> 50 KG

MovimientoProductoTerminado:
SALIDA_ENTREGA
cantidad = 50
entrega_detalle_id != NULL


Almacén PT:
Disponible = 50 KG
Unidades disponibles = 1


============================================================
9. PRUEBA DE MULTIPLO
============================================================

Intentar entregar:

30 KG

para presentación:

50 KG

Debe devolver 400 sin modificar nada.


============================================================
10. PRUEBA DE STOCK
============================================================

Si quedan 50 KG, intentar entregar 100 KG.

Debe devolver conflicto de stock y hacer rollback completo.


============================================================
11. SIGUIENTE PASO
============================================================

Después de validar backend:

Actualizar EntregaPedidoDetalle.tsx para:
- mostrar stock disponible;
- mostrar presentación;
- mostrar unidades disponibles;
- validar múltiplos en frontend;
- bloquear cantidad mayor al stock;
- usar FeedbackToast;
- usar ConfirmDialog;
- enviar Idempotency-Key;
- mostrar claramente cuando no existe stock.
