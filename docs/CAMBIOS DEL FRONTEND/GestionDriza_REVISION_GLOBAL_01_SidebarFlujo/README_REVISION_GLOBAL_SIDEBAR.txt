GESTIONDRIZA
REVISION GLOBAL 01
REORDENAMIENTO DEL SIDEBAR SEGUN FLUJO DE NEGOCIO


============================================================
OBJETIVO
============================================================

El Sidebar deja de seguir el orden histórico en que
se desarrollaron los módulos.

Ahora se organiza según el flujo lógico del negocio:

1. Configuración
2. Abastecimiento
3. Producción
4. Ventas y cobros
5. Control
6. Administración


============================================================
NUEVO ORDEN
============================================================

INICIO


CONFIGURACION

Catálogos
Proveedores
Clientes
Productos terminados


ABASTECIMIENTO

Compras
  - Registrar lote
  - Lotes de materia prima
  - Compras generales

Almacén materia prima


PRODUCCION

Producción
  - Registrar producción
  - Historial de producción

Almacén producto terminado


VENTAS Y COBROS

Pedidos
  - Registrar pedido
  - Historial de pedidos

Entregas
Depósitos


CONTROL

Mermas
Gastos


ADMINISTRACION

Usuarios

Solo aparece para ADMIN.


============================================================
POR QUE ESTE ORDEN
============================================================

CATALOGOS

Define:

- tipos
- medidas
- colores
- materiales

Es información base para productos, compras de materia prima,
producción y pedidos.


PROVEEDORES

Debe existir antes de registrar compras.


CLIENTES

Debe existir antes de registrar pedidos.


PRODUCTOS TERMINADOS

Define el producto comercial y su composición antes del flujo
operativo.


COMPRAS / ALMACEN MP

La compra de materia prima genera el stock que luego podrá
consumir Producción.


PRODUCCION / ALMACEN PT

Producción consume materia prima y genera producto terminado.


PEDIDOS / ENTREGAS / DEPOSITOS

Pedidos representa el flujo comercial.

Entrega consume producto terminado.

Depósitos controla la cobranza del pedido.


MERMAS / GASTOS

Son operaciones de control y administración, no pasos
obligatorios del flujo principal.


USUARIOS

Es administración del sistema y no forma parte del trabajo
diario del negocio.


============================================================
CORRECCION DE SELECCION
============================================================

Se corrige el problema detectado previamente:

/gestion/producciones/registrar

ANTES:

se seleccionaba:

/gestion/producciones

por usar startsWith con la ruta padre antes de revisar
la ruta Registrar.


AHORA:

las rutas de acción exactas se evalúan primero:

/gestion/producciones/registrar
/gestion/pedidos/registrar
/gestion/compras-materia-prima/registrar


Por lo tanto el elemento correcto queda azul.


============================================================
SUBMENUS
============================================================

El grupo correspondiente a la ruta actual queda abierto
automáticamente.

Esto funciona aunque el usuario llegue desde:

- Dashboard
- botón interno
- URL directa
- otro módulo

Grupos:

Compras
Producción
Pedidos


============================================================
SECCIONES
============================================================

Las etiquetas:

CONFIGURACION
ABASTECIMIENTO
PRODUCCION
VENTAS Y COBROS
CONTROL
ADMINISTRACION

solo aparecen cuando el Sidebar está expandido.

Cuando está colapsado:

se ocultan para no generar espacios sin significado.


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/components/Sidebar.tsx
src/styles/layout.css


============================================================
NO MODIFICA
============================================================

- rutas
- App.tsx
- backend
- base de datos
- permisos
- lógica de negocio


============================================================
PRUEBAS
============================================================

npm run build
npm run dev


Verificar:

1. orden general
2. Sidebar expandido
3. Sidebar colapsado
4. mobile Drawer
5. ADMIN
6. usuario no ADMIN
7. Registrar lote queda azul
8. Registrar producción queda azul
9. Registrar pedido queda azul
10. detalle de producción selecciona Historial
11. detalle de pedido selecciona Historial
12. detalle compra MP selecciona Lotes de materia prima
13. compra general detalle selecciona Compras generales
14. almacén MP detalle mantiene Almacén MP seleccionado
15. almacén PT detalle mantiene Almacén PT seleccionado
16. merma registrar mantiene Mermas seleccionado
17. gasto editar mantiene Gastos seleccionado


============================================================
REVISION GLOBAL FINAL
============================================================

Después de aplicar este parche, actualizar:

GestionDriza_FRONTEND_CONTEXT.md
GestionDriza_BACKEND_CONTEXT.md

El frontend actual usado para la revisión previa es anterior
a varias etapas Ant Design.

El backend también cambió recientemente en Compras generales.

Con ambos contextos actualizados se puede hacer de forma segura:

- detección de CSS legacy ya no utilizado
- componentes legacy sin referencias
- imports muertos
- rutas inconsistentes
- nombres/breadcrumbs
- warnings Ant Design
- verificación final de IDs visibles
- verificación global de 2 decimales
- eliminación segura de código muerto
