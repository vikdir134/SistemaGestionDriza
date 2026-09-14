GESTIONDRIZA - BACKEND MERMAS DE MATERIA PRIMA

============================================================
OBJETIVO
============================================================

Registrar pérdidas de materia prima y descontarlas
automáticamente del almacén por FIFO.

El usuario NO elige un lote.

Solo registra:
- fecha
- Material
- Color
- cantidad en KG
- observación opcional

El backend decide qué lotes consumir.


============================================================
1. MIGRACION
============================================================

Copiar:

database/migrations/
20260913_03_merma_idempotencia.sql

Ejecutar:

node scripts/run-migrations.js

Agrega:

inventario.Merma.idempotency_key

Índice único filtrado:

UX_Merma_IdempotencyKey


============================================================
2. BACKEND
============================================================

Agregar:

backend/src/modules/mermas/
- merma.model.js
- merma.controller.js
- merma.routes.js


IMPORTANTE:
NO se incluye un app.js completo para evitar sobrescribir
los módulos que ya agregaste recientemente.

En src/app.js agregar cerca de los otros requires:

const mermaRoutes = require(
  './modules/mermas/merma.routes'
);

Y antes del middleware 404:

app.use(
  '/api/mermas',
  mermaRoutes
);


============================================================
3. ENDPOINTS
============================================================

GET /api/mermas?page=1&limit=10

Filtros opcionales:
- q
- fecha_desde
- fecha_hasta


GET /api/mermas/disponibilidad

Opcional:
- material_id
- color_id

Devuelve stock consolidado disponible por:
Material + Color


GET /api/mermas/:merma_id

Devuelve:
- cabecera
- detalles
- lotes FIFO realmente consumidos


POST /api/mermas

Header recomendado:

Idempotency-Key: prueba-merma-001


Ejemplo:

{
  "fecha_merma": "2026-09-13",
  "observacion": "Prueba controlada de merma",
  "detalles": [
    {
      "material_id": 1,
      "color_id": 1,
      "cantidad": 20,
      "observacion": "Material deteriorado"
    }
  ]
}


============================================================
4. REGLAS
============================================================

- La unidad utilizada es KG.
- No se selecciona lote manualmente.
- FIFO:
  1. fecha_compra más antigua
  2. compra_materia_prima_id
  3. stock_materia_prima_lote_id
- Nunca consume un lote con stock 0.
- Nunca deja stock negativo.
- Antes de modificar stock valida que exista disponibilidad total.
- Si falta stock, se revierte TODO.
- Una misma Material + Color no puede repetirse
  dentro de la misma merma.
- Cada salida genera MovimientoMateriaPrima:
  tipo_movimiento = SALIDA_MERMA
- El movimiento queda ligado a merma_detalle_id.
- Transacción SERIALIZABLE.
- Idempotencia para evitar descuentos dobles.


============================================================
5. MERMA QUE CRUZA LOTES
============================================================

Ejemplo:

PP BLANCO

Lote A:
15 KG disponibles

Lote B:
30 KG disponibles

Merma:
20 KG

Resultado:

Lote A:
15 -> 0

Movimiento:
SALIDA_MERMA 15 KG

Lote B:
30 -> 25

Movimiento:
SALIDA_MERMA 5 KG

La MermaDetalle sigue siendo:
20 KG

En el detalle se muestran ambos consumos FIFO.


============================================================
6. INMUTABILIDAD FUNCIONAL
============================================================

Este módulo NO expone:
- PUT
- PATCH
- DELETE

Una merma ya registrada afectó stock y queda como
historial de inventario.

Si luego necesitamos corregir inventario, se debe hacer
mediante un módulo de AJUSTES, no alterando el historial
de una merma pasada.


============================================================
7. PRUEBA SUGERIDA
============================================================

Antes:

GET /api/mermas/disponibilidad

Escoger una combinación con stock.

Ejemplo:
PP BLANCO = 2400 KG


POST /api/mermas

Idempotency-Key:
prueba-merma-001

Body:

{
  "fecha_merma": "2026-09-13",
  "observacion": "Prueba FIFO de merma",
  "detalles": [
    {
      "material_id": 1,
      "color_id": 1,
      "cantidad": 20,
      "observacion": "Prueba"
    }
  ]
}


Esperado:

201
reutilizada = false

Disponible:
2400 -> 2380 KG

Movimiento:
SALIDA_MERMA
20 KG total

El lote más antiguo con PP BLANCO debe ser el primero
en reducirse.


Repetir EXACTAMENTE con:

Idempotency-Key:
prueba-merma-001

Esperado:

200
reutilizada = true

El stock debe seguir en 2380 KG.


============================================================
8. SIGUIENTE PASO
============================================================

Una vez montado este backend:
crear frontend de Mermas con:

- Historial paginado
- Registrar merma
- selección Material -> Color
- disponibilidad visible
- cantidad
- cálculo de saldo estimado
- ConfirmDialog
- FeedbackToast
- useBloqueoAccion
- Idempotency-Key
- detalle con trazabilidad FIFO por lotes
