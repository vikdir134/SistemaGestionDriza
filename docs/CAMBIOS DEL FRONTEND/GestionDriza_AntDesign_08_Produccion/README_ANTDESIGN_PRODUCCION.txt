GESTIONDRIZA - ANT DESIGN
ETAPA 08: PRODUCCION

ALCANCE

Se migran:

- Historial de producción
- Registrar producción
- Detalle de producción


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/pages/producciones/ProduccionesLista.tsx
src/pages/producciones/RegistrarProduccion.tsx
src/pages/producciones/ProduccionDetalle.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/produccionesAntd.css


============================================================
NO SE MODIFICA
============================================================

- backend
- App.tsx
- Sidebar
- rutas
- lógica FIFO
- lógica de producto terminado
- idempotencia


============================================================
HISTORIAL
============================================================

Ant Design:

- Card
- Table
- Empty
- Button
- Pagination integrada

Columnas visibles:

- Fecha
- Productos fabricados
- Total producido
- Observación
- Registrado por
- Acción

NO se muestra produccion_id.


============================================================
REGISTRAR PRODUCCION
============================================================

Se conserva la selección encadenada:

Tipo
 -> Material
 -> Medida
 -> Color
 -> Producto real

Los IDs se usan internamente pero no se muestran.


============================================================
COMPOSICION
============================================================

Al resolver el producto:

- carga la composición vigente;
- muestra versión;
- muestra Material + Color;
- muestra porcentaje;
- calcula KG estimados a consumir.

Ejemplo:

Producción: 100.00 KG
Componente: 80.00%

Estimado:
80.00 KG


============================================================
CANTIDADES
============================================================

Regla frontend:

- Cantidad producida: 2 decimales
- Presentación: 2 decimales
- KG estimados: 2 decimales
- Total producido: 2 decimales
- Stock: 2 decimales
- Consumo FIFO: 2 decimales

InputNumber:

precision={2}
step={0.01}


IMPORTANTE

El backend conserva su validación de máximo 3 decimales.
El frontend simplemente restringe el ingreso normal a 2.


============================================================
PRESENTACION
============================================================

Se mantiene la regla:

cantidad producida debe ser múltiplo de presentación.

Ejemplo:

100.00 KG / 50.00 KG
= 2.00 presentaciones

125.00 / 50.00
= BLOQUEADO


============================================================
IDEMPOTENCIA
============================================================

Se mantiene:

Idempotency-Key

La misma key permanece durante el intento actual.

Si la solicitud falla:
NO se genera una key nueva.

Por lo tanto un retry de la misma acción mantiene protección
contra duplicación.


============================================================
CONFIRMACION
============================================================

Registrar producción requiere confirmación porque:

- descuenta materia prima;
- aplica FIFO;
- aumenta stock de producto terminado.

Se usa:

modal.confirm()


============================================================
DETALLE
============================================================

Resumen:

- Fecha
- Productos
- Total producido
- Registrado por

Por cada producto:

- identidad
- composición usada
- cantidad producida
- presentación
- número de presentaciones
- stock PT después
- observación


============================================================
FIFO
============================================================

Cada producto usa Collapse Ant Design.

Al abrir:

Table con:

- Lote
- Fecha compra
- Material
- Color
- Consumido

Los movimientos se muestran solo cuando el usuario quiere
revisar el consumo FIFO.


============================================================
DARK / LIGHT
============================================================

No se agregan fondos blancos globales.

Table usa el themeConfig global.

Todos los componentes principales son Ant Design.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev


HISTORIAL:
/gestion/producciones

Probar:
- listado
- paginación
- actualizar
- dark/light
- mobile


REGISTRAR:
/gestion/producciones/registrar

Probar:
- selección Tipo > Material > Medida > Color
- producto sin composición
- cantidad <= 0
- presentación <= 0
- cantidad no múltiplo de presentación
- cálculo de materia prima
- agregar varios productos
- quitar producto
- confirmación
- doble clic
- stock insuficiente de materia prima
- creación correcta


DETALLE:
/gestion/producciones/:produccion_id

Probar:
- resumen
- 2 decimales
- stock producto terminado
- abrir consumo FIFO
- varios lotes FIFO
- observaciones
- dark/light
- mobile


============================================================
SIGUIENTE MODULO
============================================================

Siguiente opción del Sidebar:

PEDIDOS

Ahí la migración será más grande porque debemos conservar:

- listado
- registro
- detalle
- edición
- historial de cambios
- precio por cliente
- presentaciones
- estados
- reglas según entregas
- protección de doble envío
- 2 decimales
