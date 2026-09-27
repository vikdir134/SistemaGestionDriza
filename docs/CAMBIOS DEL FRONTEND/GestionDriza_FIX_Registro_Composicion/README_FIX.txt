GESTIONDRIZA - FIX REGISTRO DE COMPOSICION

ERROR CORREGIDO

SQL Server:
"The target table 'catalog.ProductoComposicion' of the DML statement
cannot have any enabled triggers if the statement contains an OUTPUT
clause without INTO clause."

CAUSA

catalog.ProductoComposicion tiene triggers habilitados.
El backend utilizaba:

OUTPUT INSERTED.producto_composicion_id

SQL Server no permite ese patrón en una tabla con triggers.

SOLUCION

Se reemplazó OUTPUT INSERTED por:

SELECT CONVERT(INT, SCOPE_IDENTITY())
       AS producto_composicion_id;

SCOPE_IDENTITY:
- obtiene el IDENTITY del INSERT realizado por esta operación;
- permanece dentro de la misma transacción;
- no devuelve identities creados dentro de triggers.

ARCHIVO A REEMPLAZAR

backend/src/modules/productosTerminados/productoTerminado.model.js

NO REQUIERE:
- migración de base de datos
- cambios en frontend
- cambios en controller
- cambios en routes

DESPUES:
1. Guardar/reemplazar archivo.
2. Nodemon reiniciará el backend.
3. Volver a publicar la composición.

PRUEBA:
100% POLIPROPILENO / BLANCO

Después:
GET /api/productos-terminados/:producto_id

Debe devolver composicion_vigente.
