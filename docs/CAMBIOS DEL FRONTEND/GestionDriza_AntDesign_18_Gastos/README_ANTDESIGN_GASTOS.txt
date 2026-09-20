GESTIONDRIZA - ANT DESIGN
ETAPA 18: GASTOS

ALCANCE

Se migran:

- Registrar tipo de gasto
- Registrar gasto
- Listado paginado
- Filtros
- Editar gasto
- Eliminar gasto mediante baja lógica


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/components/gastos/GastoForm.tsx
src/pages/Gastos.tsx
src/pages/gastos/EditarGasto.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/gastosAntd.css


============================================================
NO SE MODIFICA
============================================================

- backend
- App.tsx
- Sidebar
- rutas
- base de datos
- contratos API


============================================================
TIPOS DE GASTO
============================================================

Se conserva:

GET  /api/gastos/tipos
POST /api/gastos/tipos

El nombre:

- obligatorio
- máximo 100 caracteres en UI
- backend lo normaliza a mayúsculas
- no permite duplicado


============================================================
REGISTRAR GASTO
============================================================

Campos:

- Tipo de gasto
- Proveedor opcional
- Fecha
- Moneda
- Monto
- Comprobante
- Descripción

Moneda por defecto:

PEN

En creación:

la fecha puede quedar vacía.

El backend usa la fecha actual.


============================================================
EDITAR
============================================================

En edición:

la fecha sí es obligatoria.

Se conserva el proveedor histórico si ya no aparece
en la lista de proveedores activos.

Auditoría:

- Registrado por
- Fecha de registro
- Última modificación
- Modificado por


============================================================
ELIMINACION
============================================================

DELETE /api/gastos/:gasto_id

NO borra físicamente.

Backend:

activo = 0

y registra:

updated_at
updated_by_usuario_id

La confirmación informa al usuario que el registro
permanece almacenado para auditoría.


============================================================
IDS
============================================================

NO se muestran IDs internos.

Se eliminan textos anteriores como:

Gasto #15
Editar gasto #15
Datos del gasto #15

El ID sigue utilizándose internamente para:

- PUT
- DELETE
- navegación


============================================================
DOBLE ENVIO
============================================================

Bloqueos separados:

1. Registrar tipo
2. Registrar gasto
3. Editar gasto
4. Eliminar gasto

Se conserva:

useBloqueoAccion


============================================================
2 DECIMALES
============================================================

finance.Gasto.monto ya utiliza:

Decimal(18,2)

Frontend:

InputNumber
precision={2}
step={0.01}

Listado:

1,250.00 PEN

Edición:

1,250.00 PEN


============================================================
FILTROS
============================================================

- Tipo de gasto
- Proveedor
- Moneda
- Buscar

Buscar consulta backend por:

- Tipo
- Proveedor
- RUC
- Descripción
- Comprobante

Paginación:
backend.


============================================================
LISTADO
============================================================

Columnas:

- Tipo / descripción
- Proveedor
- Fecha
- Monto
- Comprobante
- Registrado por
- Acciones

Acciones:

- Editar
- Eliminar

NO se muestra gasto_id.


============================================================
DARK / LIGHT
============================================================

Se usan:

- Card
- Form
- Select
- DatePicker
- Input
- InputNumber
- Button
- Table
- Tag
- Descriptions
- Modal
- message

Todos Ant Design.

No se agregan fondos blancos fijos.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev


GASTOS:
/gestion/gastos

Probar:

1. tipos de gasto
2. tipo vacío
3. tipo duplicado
4. registrar gasto
5. proveedor opcional
6. fecha vacía
7. PEN
8. USD
9. monto 0
10. monto 2 decimales
11. comprobante
12. descripción
13. doble clic registro
14. filtros
15. búsqueda
16. paginación
17. editar
18. eliminar
19. confirmación baja lógica
20. último gasto de una página
21. dark/light
22. móvil


EDITAR:
/gestion/gastos/:gasto_id/editar

Probar:

1. carga
2. proveedor histórico
3. fecha obligatoria
4. monto
5. moneda
6. comprobante
7. descripción
8. auditoría
9. doble clic
10. gasto eliminado
11. dark/light
12. móvil


============================================================
ESTADO DE LA MIGRACION ANT DESIGN
============================================================

Con esta etapa quedan migrados los principales módulos
del Sidebar que veníamos recorriendo:

- Login
- Layout
- Inicio
- Usuarios
- Clientes
- Catálogos
- Productos terminados
- Producción
- Pedidos
- Entregas
- Depósitos
- Proveedores
- Compras generales
- Compras materia prima
- Almacén materia prima
- Almacén producto terminado
- Mermas
- Gastos

Después de probar Gastos, corresponde hacer una revisión
global de consistencia y detectar componentes/estilos
legacy que todavía puedan eliminarse sin afectar pantallas.
