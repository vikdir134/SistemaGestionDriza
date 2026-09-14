GESTIONDRIZA - FIX PEDIDOS -> PRODUCTOS TERMINADOS

OBJETIVO

Cerrar la inconsistencia detectada entre:
- ventas.PedidoDetalle
- catalog.Producto

A partir de este cambio los detalles nuevos de pedido
NO se guardan con producto_id = NULL.


ARCHIVOS

Agregar:
backend/src/modules/pedidos/pedido.producto.helper.js

Reemplazar:
backend/src/modules/pedidos/pedido.model.js
backend/src/modules/pedidos/pedido.edicion.model.js
backend/src/modules/pedidos/pedido.controller.js

Agregar migración:
database/migrations/20260913_04_pedido_producto_id.sql

Archivo opcional de verificación:
database/tests/verificar_pedido_producto.sql


COMPORTAMIENTO

Al registrar un pedido:

Tipo + Material + Medida + Color
          |
          v
catalog.Producto
          |
          v
producto_id
          |
          v
ventas.PedidoDetalle.producto_id


Si la combinación no existe:

HTTP 409

Mensaje:
"La combinación seleccionada no existe en Productos terminados.
 Registra primero el producto correspondiente."


EDICION

- Productos existentes:
  al guardar se vuelve a resolver producto_id.
  Esto también completa producto_id en registros viejos que
  estaban NULL si la combinación actual es válida.

- Productos nuevos agregados a un pedido:
  se vinculan obligatoriamente con catalog.Producto.


MIGRACION HISTORICA

La migración completa producto_id únicamente cuando:
- producto_id está NULL;
- existe coincidencia exacta;
- el producto está activo.

No elimina ni modifica pedidos históricos que no tengan
una coincidencia válida.


IMPORTANTE

No se fuerza producto_id a NOT NULL en la BD todavía.

Motivo:
podrían existir registros históricos legítimos que no tengan
un producto equivalente en el catálogo actual.

Para los pedidos nuevos, la obligatoriedad se aplica desde
la lógica del backend.


PASOS

1. Copiar archivos.
2. Ejecutar:
   node scripts/run-migrations.js

3. Reiniciar backend.

4. Registrar un pedido nuevo desde frontend usando un producto
   existente en Productos terminados.

5. Consultar:
   GET /api/pedidos/:pedido_id

El detalle debe devolver:
producto_id: <número>

6. Ejecutar:
   database/tests/verificar_pedido_producto.sql

La tercera consulta debe devolver 0 filas.
