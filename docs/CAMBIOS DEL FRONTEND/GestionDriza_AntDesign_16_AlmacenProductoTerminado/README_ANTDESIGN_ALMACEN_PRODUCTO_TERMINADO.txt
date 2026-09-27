GESTIONDRIZA - ANT DESIGN
ETAPA 16: ALMACEN DE PRODUCTO TERMINADO

ALCANCE

Se migran:

- Indicadores
- Resumen general por producto
- Vista por presentación
- Detalle de presentación
- Historial de movimientos


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/pages/almacenProductoTerminado/AlmacenProductoTerminado.tsx
src/pages/almacenProductoTerminado/AlmacenProductoTerminadoDetalle.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/almacenProductoTerminadoAntd.css


============================================================
NO SE MODIFICA
============================================================

- backend
- App.tsx
- Sidebar
- rutas
- base de datos
- producción
- entregas
- stock
- reglas de presentación


============================================================
CONCEPTO
============================================================

El producto terminado se identifica por:

Tipo + Material + Medida + Color

La PRESENTACIÓN no forma parte de la identidad
del producto.

Un mismo producto puede tener varias presentaciones:

50.00 KG
30.00 KG
etc.


============================================================
INDICADORES
============================================================

- Stock disponible KG
- Productos con stock
- Presentaciones con stock

Stock disponible:
2 decimales.


============================================================
RESUMEN GENERAL
============================================================

Agrupa todas las presentaciones del mismo producto.

Columnas:

- Producto
- Material
- Medida
- Color
- Presentaciones con stock
- Stock disponible total

Filtros:

- Buscar
- Tipo
- Material
- Medida
- Color

Paginación:
backend.


============================================================
POR PRESENTACION
============================================================

Cada fila representa:

Producto + Presentación

Columnas:

- Producto
- Material
- Medida
- Color
- Presentación
- Disponible
- Presentaciones disponibles
- Estado
- Ver detalle

Estados:

CON_STOCK
AGOTADO

Filtro adicional:

- Todos
- Con stock
- Agotados


============================================================
DETALLE DE PRESENTACION
============================================================

Resumen:

- Presentación
- Stock disponible
- Presentaciones disponibles
- Estado

Datos:

- Tipo
- Material
- Medida
- Color
- Unidad base
- Descripción
- Creado por
- Fecha creación
- Última actualización
- Actualizado por


============================================================
MOVIMIENTOS
============================================================

Tipos:

ENTRADA_PRODUCCION
SALIDA_ENTREGA
AJUSTE_ENTRADA
AJUSTE_SALIDA

Visualmente:

Entrada por producción
Salida por entrega
Ajuste de entrada
Ajuste de salida


============================================================
TRAZABILIDAD SIN IDS VISIBLES
============================================================

ANTES se mostraba:

Producción #1
Entrega #3 · Pedido #5

Ahora los IDs internos NO se muestran.

Si el movimiento pertenece a producción:

Ver producción

navega internamente a:

/gestion/producciones/:produccion_id


Si pertenece a una entrega:

Ver pedido

navega internamente a:

/gestion/entregas/:pedido_id


============================================================
2 DECIMALES
============================================================

Se muestran con exactamente 2 decimales:

- Stock
- Presentación
- Presentaciones disponibles
- Movimientos

Ejemplos:

100.00 KG
50.00 KG
2.00 presentaciones
-50.00 KG


La BD mantiene su precisión interna actual.


============================================================
PRODUCCION
============================================================

Registrar producción sigue siendo el proceso que:

- consume materia prima por FIFO;
- suma stock de producto terminado;
- genera ENTRADA_PRODUCCION.


============================================================
ENTREGAS
============================================================

Registrar entrega sigue siendo el proceso que:

- descuenta la presentación exacta;
- genera SALIDA_ENTREGA;
- actualiza pendiente/estado del pedido.


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
- Descriptions

Todos Ant Design.

No se agregan backgrounds blancos fijos.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev


ALMACEN:
/gestion/almacen/producto-terminado

Probar:

1. indicadores
2. resumen general
3. filtro buscar
4. tipo
5. material
6. medida
7. color
8. limpiar
9. paginación resumen
10. pestaña Por presentación
11. estado Con stock
12. estado Agotados
13. paginación
14. Registrar producción
15. dark/light
16. móvil


DETALLE:
/gestion/almacen/producto-terminado/presentaciones/:stock_id

Probar:

1. cabecera producto
2. presentación
3. stock
4. presentaciones disponibles
5. estado
6. descripción
7. historial
8. entrada producción
9. salida entrega
10. ajustes
11. filtro movimientos
12. paginación
13. Ver producción
14. Ver pedido
15. IDs no visibles
16. dark/light
17. móvil


============================================================
SIGUIENTE MODULO
============================================================

MERMAS

Después de cerrar Almacén corresponde migrar:

- listado
- registrar merma
- disponibilidad por Material + Color
- FIFO automático
- detalle
- lotes consumidos
- idempotencia
- 2 decimales
- dark/light
- responsive
