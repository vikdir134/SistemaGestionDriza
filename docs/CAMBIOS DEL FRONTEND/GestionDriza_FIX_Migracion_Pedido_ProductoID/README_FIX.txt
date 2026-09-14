GESTIONDRIZA - FIX MIGRACION 20260913_04

ERROR ORIGINAL

Invalid column name 'updated_at'.

CAUSA

ventas.PedidoDetalle tiene:
- created_at
- created_by_usuario_id

pero NO tiene:
- updated_at
- updated_by_usuario_id

La primera versión de la migración intentaba hacer:

pd.updated_at = SYSDATETIME()

por eso SQL Server rechazó el script.


QUE HACER

1. Reemplazar solamente:

database/migrations/20260913_04_pedido_producto_id.sql

por el archivo corregido incluido aquí.

2. NO crear una migración 05 para este error.

La migración 04 falló y no quedó aplicada,
por lo que corresponde corregir la misma migración.

3. Ejecutar nuevamente:

node scripts/run-migrations.js


RESULTADO ESPERADO

[>>] Ejecutando 20260913_04_pedido_producto_id.sql...
[OK] 20260913_04_pedido_producto_id.sql


La consulta final de la migración mostrará:

detalles_sin_producto = N

Si N = 0:
todos los detalles históricos pudieron vincularse.

Si N > 0:
hay pedidos históricos cuya combinación no existe actualmente
como Producto terminado. No es necesariamente un error.


IMPORTANTE

No necesitas volver a copiar los archivos JS del fix anterior.
Este error era exclusivamente de la migración SQL.
