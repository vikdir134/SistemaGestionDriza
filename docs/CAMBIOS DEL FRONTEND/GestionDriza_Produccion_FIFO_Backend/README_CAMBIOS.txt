GESTIONDRIZA - PRODUCCION + FIFO - BACKEND

============================================================
1. PRIMERO: MIGRACION LOCAL
============================================================

Archivo nuevo:

database/migrations/20260913_01_produccion_idempotencia.sql

Agrega:
- produccion.Produccion.idempotency_key VARCHAR(100) NULL
- índice único filtrado UX_Produccion_IdempotencyKey

NO modifica ninguna migración anterior.

Ejecutar desde backend con el mecanismo de migraciones del proyecto:

node scripts/run-migrations.js

Después validar en SQL Server:

SELECT
  c.name AS columna,
  t.name AS tipo,
  c.max_length,
  c.is_nullable
FROM sys.columns c
INNER JOIN sys.types t
  ON c.user_type_id = t.user_type_id
WHERE
  c.object_id = OBJECT_ID('produccion.Produccion')
  AND c.name = 'idempotency_key';


============================================================
2. BACKEND
============================================================

Archivos nuevos:

backend/src/modules/producciones/
- produccion.model.js
- produccion.controller.js
- produccion.routes.js

Reemplazar:
- backend/src/app.js


============================================================
3. ENDPOINTS
============================================================

GET /api/producciones?page=1&limit=10

GET /api/producciones/:produccion_id

POST /api/producciones

Header obligatorio:
Idempotency-Key: prueba-produccion-001

Body ejemplo:

{
  "fecha_produccion": "2026-09-13",
  "observacion": "Prueba FIFO",
  "detalles": [
    {
      "producto_id": 1,
      "cantidad_producida": 200,
      "cantidad_presentacion": 50,
      "unidad_presentacion_id": 1,
      "observacion": "Prueba"
    }
  ]
}

IMPORTANTE:
- producto_id debe tener composición vigente.
- unidad_presentacion_id debe ser un ID real y activo.
- la producción se registra en KG.
- cantidad_producida debe ser múltiplo de cantidad_presentacion.


============================================================
4. LOGICA ATOMICA
============================================================

POST /api/producciones ejecuta EN UNA SOLA TRANSACCION:

1. Comprueba Idempotency-Key.
2. Obtiene unidad KG.
3. Obtiene composición vigente de cada producto.
4. Calcula materia prima requerida.
5. Agrupa necesidad por Material + Color.
6. Bloquea los lotes disponibles en orden FIFO.
7. Valida que exista stock para TODOS los componentes.
8. Crea Produccion.
9. Crea ProduccionDetalle guardando la versión exacta de composición.
10. Descuenta StockMateriaPrimaLote por FIFO.
11. Registra MovimientoMateriaPrima = SALIDA_PRODUCCION.
12. Crea/actualiza StockProductoTerminado por producto + presentación.
13. Registra MovimientoProductoTerminado = ENTRADA_PRODUCCION.
14. COMMIT.

Si cualquier paso falla -> ROLLBACK TOTAL.


============================================================
5. PRUEBA RECOMENDADA
============================================================

ANTES:
consultar:

GET /api/almacen-materia-prima/resumen?page=1&limit=10
GET /api/almacen-materia-prima/lotes?page=1&limit=10

Elegir un producto que tenga composición vigente.

Ejemplo si producto 1 tiene:
100% POLIPROPILENO BLANCO

y se producen 200 KG:

Debe consumir 200 KG de PP BLANCO empezando por el lote
más antiguo disponible.


============================================================
6. VALIDAR DESPUES
============================================================

GET /api/producciones/1

La respuesta incluye:
- composición_version usada
- consumos_materia_prima
- nombre_lote de cada retiro FIFO
- ingreso_producto_terminado

Luego:

GET /api/almacen-materia-prima/resumen?page=1&limit=10

Debe haber disminuido el stock correspondiente.

SQL:

SELECT *
FROM inventario.StockProductoTerminado;

SELECT *
FROM inventario.MovimientoProductoTerminado
ORDER BY movimiento_producto_terminado_id DESC;

SELECT *
FROM inventario.MovimientoMateriaPrima
WHERE tipo_movimiento = 'SALIDA_PRODUCCION'
ORDER BY movimiento_materia_prima_id DESC;


============================================================
7. IDEMPOTENCIA
============================================================

Repetir EXACTAMENTE el mismo POST con:

Idempotency-Key: prueba-produccion-001

Debe responder 200 y:

"reutilizada": true

NO debe:
- volver a descontar materia prima
- volver a sumar producto terminado
- crear otra producción

Una key nueva representa una producción nueva.
