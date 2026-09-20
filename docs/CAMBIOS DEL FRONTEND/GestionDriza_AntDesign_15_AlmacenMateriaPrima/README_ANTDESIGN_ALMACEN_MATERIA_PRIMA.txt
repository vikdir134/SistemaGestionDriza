GESTIONDRIZA - ANT DESIGN
ETAPA 15: ALMACEN DE MATERIA PRIMA

ALCANCE

Se migran:

- Resumen consolidado
- Vista por lotes
- Indicadores
- Detalle de lote
- Historial de movimientos


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/pages/almacenMateriaPrima/AlmacenMateriaPrima.tsx
src/pages/almacenMateriaPrima/AlmacenMateriaPrimaLoteDetalle.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/almacenMateriaPrimaAntd.css


============================================================
NO SE MODIFICA
============================================================

- backend
- App.tsx
- Sidebar
- rutas
- base de datos
- FIFO
- producción
- mermas
- compras de materia prima


============================================================
CONCEPTO DE LOTE
============================================================

Se mantiene la definición acordada:

LOTE = una compra/importación completa.

NO es una fila Material + Color.

Por eso la vista "Lotes" tiene:

1 fila
=
1 CompraMateriaPrima


Al abrir el lote se muestran todas las materias primas
que pertenecen a esa compra.


============================================================
INDICADORES
============================================================

- Total comprado
- Stock disponible
- Consumido
- Lotes registrados

Todos los pesos visibles usan 2 decimales.


============================================================
RESUMEN GENERAL
============================================================

Consolida stock por:

Material + Color + Unidad

Columnas:

- Material
- Color
- Total comprado
- Consumido
- Disponible

Disponible incluye barra de progreso.

Filtros backend:

- q
- material_id
- color_id
- page
- limit


============================================================
VISTA LOTES
============================================================

Una fila por compra.

Columnas:

- Lote
- Proveedor
- Fecha compra
- Documento
- Materias primas
- Comprado
- Consumido
- Disponible
- Estado
- Ver lote

Estados:

CON_STOCK
AGOTADO

Filtros backend:

- q
- proveedor_id
- estado
- page
- limit


============================================================
DETALLE DEL LOTE
============================================================

Resumen:

- Comprado
- Consumido
- Disponible

Información:

- Proveedor
- RUC
- Fecha compra
- Documento
- Moneda
- Registrado por
- Número de materias primas
- Descripción


============================================================
MATERIAS PRIMAS DEL LOTE
============================================================

Tabla:

- Material
- Color
- Comprado
- Consumido
- Disponible

No se exponen IDs internos.


============================================================
HISTORIAL
============================================================

Se utiliza Collapse Ant Design.

El historial solo se consulta cuando el usuario lo abre.

Filtros:

- Todos
- Entrada por compra
- Salida por producción
- Salida por merma
- Ajuste de entrada
- Ajuste de salida

Columnas:

- Fecha
- Materia prima
- Tipo
- Movimiento
- Registrado por
- Observación

Paginación:
backend.


============================================================
FIFO
============================================================

NO se modifica.

El almacén solo consulta el resultado de movimientos
registrados por:

- compras
- producción
- merma
- ajustes

La selección FIFO continúa en backend.


============================================================
2 DECIMALES
============================================================

Todos los pesos visibles:

500.00 KG
388.00 KG
112.00 KG

No se altera la precisión interna de la BD.


============================================================
DARK / LIGHT
============================================================

Componentes principales:

- Card
- Statistic
- Tabs
- Form
- Select
- Input
- Table
- Tag
- Progress
- Collapse
- Alert

Todos Ant Design.

No se agregan fondos blancos globales.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev


ALMACEN:
/gestion/almacen/materia-prima

Probar:

1. indicadores
2. Resumen general
3. búsqueda resumen
4. material
5. color
6. limpiar filtros
7. paginación resumen
8. pestaña Lotes
9. búsqueda lote
10. proveedor
11. Con stock
12. Agotados
13. paginación lotes
14. Registrar lote
15. dark/light
16. móvil


DETALLE:
/gestion/almacen/materia-prima/lotes/:id

Probar:

1. cabecera
2. varias materias primas en mismo lote
3. comprado
4. consumido
5. disponible
6. lote con stock
7. lote agotado
8. abrir historial
9. entrada compra
10. salida producción
11. salida merma
12. filtro movimientos
13. paginación movimientos
14. dark/light
15. móvil


============================================================
SIGUIENTE MODULO
============================================================

ALMACEN DE PRODUCTO TERMINADO

Después corresponde migrar:

- resumen general por producto
- vista por presentación
- indicadores
- detalle de stock/presentación
- movimientos de producción y entrega
- 2 decimales
- dark/light
- responsive
