GESTIONDRIZA - ANT DESIGN
ETAPA 13: COMPRAS GENERALES

ALCANCE

Se migra la funcionalidad que ya existía:

- Registrar compra
- Registrar varios ítems
- Listar compras
- Filtrar por proveedor
- Buscar
- Paginación backend


============================================================
IMPORTANTE: ALCANCE
============================================================

El backend dispone de:

GET /api/compras/:compra_id

pero la interfaz anterior no tenía pantalla de detalle.

Por consistencia con las decisiones anteriores,
esta etapa NO agrega una pantalla nueva de detalle.


============================================================
ARCHIVO A REEMPLAZAR
============================================================

src/pages/Compras.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/comprasGeneralesAntd.css


============================================================
NO SE MODIFICA
============================================================

- backend
- App.tsx
- Sidebar
- rutas
- contrato API
- compras de materia prima
- almacén


============================================================
DIFERENCIA CON MATERIA PRIMA
============================================================

Compras generales sigue siendo un módulo separado.

Un ítem puede tener:

- Material

O

- Descripción libre

Por lo tanto NO se obliga a escoger Material.

Esto preserva la regla actual:

material_id OR descripcion_item


============================================================
CABECERA DE COMPRA
============================================================

Campos:

- Proveedor
- Fecha
- Moneda
- Documento
- Descripción

Moneda predeterminada:

PEN

Fecha:
si se deja vacía, backend utiliza la fecha actual.


============================================================
ITEMS
============================================================

Cada ítem permite:

- Material opcional
- Descripción
- Cantidad
- Unidad
- Precio unitario
- Subtotal

Debe existir al menos un ítem.


============================================================
VALIDACIONES
============================================================

Por ítem:

Material O descripción:
obligatorio al menos uno.

Cantidad:
> 0

Unidad:
obligatoria

Precio:
> 0


============================================================
2 DECIMALES
============================================================

Frontend:

Cantidad:
precision={2}

Precio:
precision={2}

Subtotal:
2 decimales

Total:
2 decimales


Ejemplos:

12.00 UNID.
35.50 PEN
426.00 PEN


La BD puede conservar su precisión histórica superior.
La interfaz estandarizada muestra 2 decimales.


============================================================
TOTAL
============================================================

El total se recalcula en tiempo real a partir de:

cantidad * precio_unitario

por cada ítem.

Se muestra:

- número de ítems
- total compra
- moneda


============================================================
DOBLE ENVÍO
============================================================

Se conserva:

useBloqueoAccion

La validación ocurre ANTES de adquirir el bloqueo.

En error:
se libera para reintentar.

En éxito:
se limpia el formulario y se actualiza el listado.


============================================================
LISTADO
============================================================

Table Ant Design:

- Proveedor
- Fecha
- Documento
- Descripción
- Total
- Ítems
- Registrado por

NO se muestra compra_id.


============================================================
FILTROS
============================================================

Backend:

GET /api/compras

Parámetros utilizados:

- page
- limit
- proveedor_id
- q

La paginación sigue siendo backend.


============================================================
DARK / LIGHT
============================================================

Todos los componentes principales son Ant Design.

Table hereda themeConfig global.

No se agregan fondos blancos fijos.


============================================================
RESPONSIVE
============================================================

Cabecera:
se apila usando Row / Col.

Ítems:
campos se reorganizan según ancho.

Filtros:
se apilan en móvil.

Table:
columnas secundarias responsive + scroll de respaldo.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev

/gestion/compras


Probar:

1. proveedor vacío
2. ítem solo con material
3. ítem solo con descripción
4. ítem sin material ni descripción
5. cantidad 0
6. precio 0
7. unidad vacía
8. PEN
9. USD
10. varios ítems
11. quitar ítem
12. impedir quitar último ítem
13. subtotal
14. total
15. doble clic
16. filtro proveedor
17. búsqueda
18. limpiar
19. paginación
20. dark/light
21. móvil


============================================================
SIGUIENTE SUBMODULO
============================================================

MATERIA PRIMA

Siguiente página del grupo Compras:

/gestion/compras-materia-prima

Después:

/gestion/compras-materia-prima/registrar

y detalle de lote.

En esa migración se mantiene:

- lote como compra completa
- proveedor
- PEN por defecto
- Material + Color
- peso KG
- precio
- total
- idempotencia
- creación de stock
- ENTRADA_COMPRA
- 2 decimales
