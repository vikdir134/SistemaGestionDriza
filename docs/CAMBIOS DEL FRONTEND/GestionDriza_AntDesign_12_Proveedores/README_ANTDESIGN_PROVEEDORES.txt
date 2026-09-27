GESTIONDRIZA - ANT DESIGN
ETAPA 12: PROVEEDORES

ALCANCE

Se migra la funcionalidad que EXISTÍA en la interfaz anterior:

- Registrar proveedor
- Listar proveedores

Se agrega únicamente UX de soporte:

- búsqueda local
- paginación visual de Table
- botón actualizar
- validaciones de formulario


============================================================
IMPORTANTE: ALCANCE FUNCIONAL
============================================================

El backend también dispone de:

PUT    /api/proveedores/:proveedor_id
DELETE /api/proveedores/:proveedor_id

pero la pantalla anterior NO exponía:

- Editar
- Dar de baja

Por lo tanto esta migración NO añade esas acciones.


============================================================
ARCHIVO A REEMPLAZAR
============================================================

src/pages/Proveedores.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/proveedoresAntd.css


============================================================
NO SE MODIFICA
============================================================

- backend
- App.tsx
- Sidebar
- rutas
- compras
- gastos


============================================================
FORMULARIO
============================================================

Campos:

- RUC
- Razón social
- Dirección
- Teléfono
- Correo


RUC:

- obligatorio
- 11 dígitos
- solo números


Razón social:

- obligatoria
- máximo 200 caracteres


Dirección:

- máximo 250


Teléfono:

- máximo 30


Correo:

- opcional
- formato email
- máximo 150


============================================================
DOBLE ENVÍO
============================================================

Se utiliza:

useBloqueoAccion

Mientras se registra:

- formulario bloqueado
- botón muestra loading

En error:
se libera para reintentar.

En éxito:
se recarga el listado y luego se libera.


============================================================
LISTADO
============================================================

Table Ant Design:

- RUC
- Razón social
- Dirección
- Teléfono
- Correo
- Fecha de registro

NO se muestra proveedor_id.


============================================================
BÚSQUEDA
============================================================

La búsqueda es local porque el endpoint actual:

GET /api/proveedores

devuelve todos los proveedores activos y no expone
parámetros de búsqueda/paginación.

Busca por:

- RUC
- Razón social
- Dirección
- Teléfono
- Correo


============================================================
PAGINACIÓN
============================================================

Table muestra páginas de 10 registros.

IMPORTANTE:

Esta paginación es visual/client-side.

No se presenta como paginación backend porque el contrato
actual de proveedores todavía devuelve todos los registros.


============================================================
DARK / LIGHT
============================================================

Todos los controles principales son Ant Design.

No se agregan fondos blancos globales.

Table hereda el themeConfig global.


============================================================
RESPONSIVE
============================================================

Desktop grande:

[ Registrar proveedor ] [ Listado de proveedores ]

Tablet / Mobile:

[ Registrar proveedor ]
[ Listado de proveedores ]


Columnas secundarias se ocultan progresivamente.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev

/gestion/proveedores


Probar:

1. carga del listado
2. RUC vacío
3. RUC con menos de 11 dígitos
4. RUC con letras
5. RUC duplicado
6. razón social vacía
7. correo inválido
8. proveedor correcto
9. doble clic en Guardar
10. búsqueda
11. limpiar búsqueda
12. paginación con >10 proveedores
13. actualizar
14. dark/light
15. móvil


============================================================
SIGUIENTE GRUPO DEL SIDEBAR
============================================================

COMPRAS

Submódulos:

- Compras generales
- Materia prima
- Registrar lote

Se migrarán respetando las funcionalidades reales actuales
y aplicando la regla de 2 decimales.
