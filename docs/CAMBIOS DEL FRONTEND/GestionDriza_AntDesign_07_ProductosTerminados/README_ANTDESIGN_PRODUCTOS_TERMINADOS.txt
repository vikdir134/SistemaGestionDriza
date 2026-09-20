GESTIONDRIZA - ANT DESIGN
ETAPA 07: PRODUCTOS TERMINADOS

ALCANCE

Se migran completamente:

- Listado de productos terminados
- Registrar producto terminado
- Detalle de producto
- Composición vigente
- Nueva versión de composición
- Historial de composiciones


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/pages/productosTerminados/ProductosTerminadosLista.tsx
src/pages/productosTerminados/RegistrarProductoTerminado.tsx
src/pages/productosTerminados/ProductoTerminadoDetalle.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/productosTerminadosAntd.css


NO SE MODIFICA

- backend
- App.tsx
- Sidebar
- rutas
- reglas de composición


============================================================
LISTADO
============================================================

Ant Design:

- Card
- Form
- Input
- Select
- Table
- Tag
- Empty
- Button
- Row / Col

Filtros conservados:

- búsqueda
- tipo
- material
- medida
- color
- estado de composición

Estados visibles:

Definida
Pendiente

No se muestran IDs.


============================================================
REGISTRAR PRODUCTO
============================================================

Se mantiene la identidad real:

Tipo + Material + Medida + Color

Descripción opcional.

No se agrega:
- peso
- presentación

porque esos campos NO forman parte de la identidad actual.
La presentación se define al registrar producción.


============================================================
DETALLE
============================================================

Utiliza:

- Descriptions
- Card
- Tag
- Progress
- Alert
- Table
- Form.List
- InputNumber
- Modal.confirm

La composición vigente muestra:
- versión
- fecha
- componentes
- material
- color
- porcentaje
- observación


============================================================
COMPOSICION
============================================================

Se conserva la lógica:

- mínimo una materia prima
- Material obligatorio
- Color obligatorio
- porcentaje > 0
- porcentaje <= 100
- no repetir Material + Color
- total exactamente 100%
- nueva publicación crea una nueva versión


============================================================
CONFIRMACION
============================================================

Publicar composición SÍ requiere confirmación.

Motivo de negocio:
la nueva versión se convierte en la receta vigente que
utilizarán las próximas producciones.

Se utiliza:

modal.confirm()


============================================================
2 DECIMALES
============================================================

Los porcentajes visibles usan:

formatNumero()

Ejemplo:

50 -> 50.00%

InputNumber:
precision={2}
step={0.01}

No se usan .toFixed(3) ni .toFixed(4).


============================================================
HISTORIAL
============================================================

Table paginada desde backend.

Columnas:

- Versión
- Estado
- Vigente desde
- Vigente hasta
- Materias primas
- Observación


============================================================
DARK / LIGHT
============================================================

No se agregan superficies blancas fijas.

Table hereda themeConfig global.

Cards y formularios son Ant Design.


============================================================
RESPONSIVE
============================================================

Listados:
responsive columns + scroll de respaldo

Formulario producto:
2 columnas desktop
1 columna mobile

Composición:
2 componentes por fila desktop
1 por fila mobile

Historial:
scroll horizontal de respaldo


============================================================
PRUEBAS
============================================================

npm run build
npm run dev


LISTADO:
/gestion/productos-terminados

- filtros
- limpiar
- actualizar
- paginación
- dark/light
- mobile


REGISTRAR:
/gestion/productos-terminados/registrar

- campos obligatorios
- combinación duplicada
- descripción
- creación correcta
- doble clic


DETALLE:
/gestion/productos-terminados/:producto_id

- producto sin composición
- definir composición
- total diferente de 100
- duplicar Material + Color
- publicar
- nueva versión
- historial
- dark/light
- mobile


============================================================
SIGUIENTE ETAPA
============================================================

Siguiente grupo del Sidebar:

PRODUCCIÓN

Migrar:

- Historial de producción
- Registrar producción
- Detalle de producción

manteniendo:
- selección encadenada de producto
- composición vigente
- estimación de materia prima
- FIFO
- presentación
- Idempotency-Key
- confirmación
- 2 decimales
