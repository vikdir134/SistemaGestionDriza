GESTIONDRIZA - BACKEND ALMACEN DE PRODUCTO TERMINADO

NO REQUIERE MIGRACION DE BD.

Utiliza las tablas ya existentes:
- inventario.StockProductoTerminado
- inventario.MovimientoProductoTerminado
- catalog.Producto
- produccion.ProduccionDetalle
- ventas.EntregaDetalle


ARCHIVOS NUEVOS

backend/src/modules/almacenProductoTerminado/
- almacenProductoTerminado.model.js
- almacenProductoTerminado.controller.js
- almacenProductoTerminado.routes.js


REEMPLAZAR

backend/src/app.js

El app.js incluido parte del backend que ya tenía:
- productos terminados
- producción
- compras MP
- almacén MP

y agrega:
- almacén producto terminado


RUTA BASE

/api/almacen-producto-terminado


ENDPOINTS

1)
GET /api/almacen-producto-terminado/indicadores

Devuelve:
- stock_disponible_kg
- productos_con_stock
- presentaciones_con_stock


2)
GET /api/almacen-producto-terminado/resumen

Query opcional:
- q
- tipo_producto_id
- material_id
- medida_id
- color_id
- page
- limit

Agrupa por producto terminado real.
No separa las presentaciones.

Ejemplo:
DRIZA / PP / 1PULG / BLANCO
50 KG -> 100 KG
30 KG -> 60 KG

Resumen:
Disponible total = 160 KG


3)
GET /api/almacen-producto-terminado/presentaciones

Query opcional:
- q
- tipo_producto_id
- material_id
- medida_id
- color_id
- estado = TODOS | CON_STOCK | AGOTADO
- page
- limit

Una fila por:
Producto + Presentación


4)
GET /api/almacen-producto-terminado/presentaciones/:stock_producto_terminado_id

Detalle del stock de esa presentación.


5)
GET /api/almacen-producto-terminado/presentaciones/:stock_producto_terminado_id/movimientos

Query:
- tipo_movimiento opcional:
  ENTRADA_PRODUCCION
  SALIDA_ENTREGA
  AJUSTE_ENTRADA
  AJUSTE_SALIDA
- page
- limit

El historial devuelve referencias a:
- produccion_id
- entrega_id
- pedido_id

Actualmente debería existir ENTRADA_PRODUCCION.
SALIDA_ENTREGA empezará a aparecer cuando integremos Entregas.


PRUEBAS CON EL STOCK ACTUAL

Después de la producción de prueba de 100 KG del producto 7:

GET /api/almacen-producto-terminado/indicadores

Esperado actualmente:
stock_disponible_kg = 100
productos_con_stock = 1
presentaciones_con_stock = 1


GET /api/almacen-producto-terminado/resumen?page=1&limit=10

Debe aparecer:
DRIZA
POLIPROPILENO
1PULG
BLANCO
100 KG


GET /api/almacen-producto-terminado/presentaciones?estado=CON_STOCK&page=1&limit=10

Debe aparecer:
DRIZA / POLIPROPILENO / 1PULG / BLANCO
Presentación: 50 KG
Disponible: 100 KG
Presentaciones disponibles: 2


Toma stock_producto_terminado_id = 1 y prueba:

GET /api/almacen-producto-terminado/presentaciones/1

GET /api/almacen-producto-terminado/presentaciones/1/movimientos?page=1&limit=10

Debe existir:
ENTRADA_PRODUCCION
cantidad = 100
produccion_id = 1
