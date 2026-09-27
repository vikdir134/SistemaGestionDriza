GESTIONDRIZA - BACKEND ALMACEN DE MATERIA PRIMA

Archivos nuevos:
- src/modules/almacenMateriaPrima/almacenMateriaPrima.model.js
- src/modules/almacenMateriaPrima/almacenMateriaPrima.controller.js
- src/modules/almacenMateriaPrima/almacenMateriaPrima.routes.js

Archivo a reemplazar:
- src/app.js

No requiere migracion de BD.

Endpoints:

GET /api/almacen-materia-prima/indicadores

GET /api/almacen-materia-prima/resumen
Query opcional:
- material_id
- color_id
- q
- page
- limit

GET /api/almacen-materia-prima/lotes
Query opcional:
- material_id
- color_id
- proveedor_id
- estado = TODOS | CON_STOCK | AGOTADO
- q
- page
- limit

GET /api/almacen-materia-prima/lotes/:stock_materia_prima_lote_id

GET /api/almacen-materia-prima/lotes/:stock_materia_prima_lote_id/movimientos
Query opcional:
- tipo_movimiento
- page
- limit

PRUEBAS RECOMENDADAS:

1.
GET /api/almacen-materia-prima/indicadores

2.
GET /api/almacen-materia-prima/resumen?page=1&limit=10

3.
GET /api/almacen-materia-prima/lotes?estado=CON_STOCK&page=1&limit=10

4.
Tomar un stock_materia_prima_lote_id del punto 3 y consultar:
GET /api/almacen-materia-prima/lotes/1

5.
GET /api/almacen-materia-prima/lotes/1/movimientos?page=1&limit=10

Esperado actualmente:
- Las entradas de compra deben aparecer como ENTRADA_COMPRA.
- cantidad_disponible debe ser igual a cantidad_inicial porque aun no
  hemos implementado producción ni merma.
