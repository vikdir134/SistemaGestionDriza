GESTIONDRIZA - ANT DESIGN
ETAPA 14: COMPRAS DE MATERIA PRIMA

ALCANCE

Se migran:

- Listado de lotes de materia prima
- Registrar lote
- Detalle del lote


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/pages/comprasMateriaPrima/ComprasMateriaPrimaLista.tsx
src/pages/comprasMateriaPrima/RegistrarCompraMateriaPrima.tsx
src/pages/comprasMateriaPrima/CompraMateriaPrimaDetalle.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/comprasMateriaPrimaAntd.css


============================================================
NO SE MODIFICA
============================================================

- backend
- App.tsx
- Sidebar
- rutas
- base de datos
- FIFO
- almacén
- stock
- idempotencia


============================================================
DIFERENCIA CON COMPRAS GENERALES
============================================================

COMPRAS GENERALES

- Descripción libre
- NO genera inventario
- NO usa Material


COMPRAS DE MATERIA PRIMA

- Lote real
- Material + Color
- Cantidad en KG
- SÍ genera inventario
- StockMateriaPrimaLote
- ENTRADA_COMPRA
- participa en FIFO


============================================================
LISTADO
============================================================

Ant Design Table:

- Lote
- Proveedor
- Fecha
- Documento
- Materias primas
- Comprado
- Disponible
- Monto
- Registrado por
- Ver detalle

NO se muestra compra_materia_prima_id.

Paginación:
backend.


============================================================
DISPONIBILIDAD
============================================================

Se muestra:

cantidad disponible

y una barra de progreso respecto del total comprado.

Esto no cambia ninguna regla de negocio:
solo visualiza el stock actual del lote.


============================================================
REGISTRAR LOTE
============================================================

Cabecera:

- Nombre del lote
- Proveedor
- Fecha
- Moneda
- Documento
- Descripción

Moneda por defecto:
PEN

Fecha por defecto:
hoy


============================================================
MATERIA PRIMA
============================================================

Cada fila:

- Material
- Color
- Cantidad KG
- Precio unitario
- Descripción opcional
- Subtotal


Regla:

Material + Color no puede repetirse dentro del mismo lote.


Mensajes de UI:
NO usan el término técnico "combinación".


============================================================
PRECIO 0.00
============================================================

Se conserva la regla actual del backend.

Un ítem puede tener:

precio_unitario = 0.00

siempre que el TOTAL DEL LOTE sea mayor a 0.

No se endurece esta regla durante la migración visual.


============================================================
2 DECIMALES
============================================================

La interfaz utiliza:

Cantidad:
precision={2}

Precio:
precision={2}

Peso:
2 decimales

Subtotal:
2 decimales

Total:
2 decimales

Stock:
2 decimales


La BD puede mantener su precisión interna existente.


============================================================
IDEMPOTENCIA
============================================================

Se mantiene:

Idempotency-Key

La key permanece estable durante el intento actual.

Si falla:
NO se genera una nueva key.

Si backend ya hizo COMMIT y la respuesta se perdió:
el retry con la misma key recupera el lote existente.

Después de éxito confirmado:
se genera una nueva key para una futura operación.


============================================================
CONFIRMACION
============================================================

Registrar lote requiere confirmación porque:

- crea la compra;
- crea sus detalles;
- crea stock de materia prima;
- genera ENTRADA_COMPRA.

El modal muestra:

- número de materias primas;
- peso total;
- monto total;
- moneda.


============================================================
DETALLE
============================================================

Resumen:

- Comprado
- Disponible
- Consumido
- Monto total

Datos:

- Proveedor
- RUC
- Fecha compra
- Documento
- Registrado por
- Fecha registro
- Dirección proveedor
- Descripción


============================================================
TABLA DEL LOTE
============================================================

Por materia prima:

- Material
- Color
- Descripción
- Comprado
- Disponible
- Consumido
- Precio unitario
- Subtotal

La disponibilidad usa una barra de progreso.


============================================================
LOTE AGOTADO
============================================================

Si:

disponible <= 0

se informa:

"Este lote ya no tiene stock disponible."

El lote NO se elimina porque forma parte del historial.


============================================================
DARK / LIGHT
============================================================

Todos los controles principales son Ant Design.

Table hereda themeConfig global.

No se agregan backgrounds blancos fijos.


============================================================
RESPONSIVE
============================================================

Listado:
columnas secundarias responsive + scroll.

Registro:
Row/Col adaptativo.

Resumen:
4 cards desktop,
2 tablet,
1 mobile.

Form actions:
botones ocupan ancho móvil.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev


LISTADO:
/gestion/compras-materia-prima

Probar:

1. carga
2. búsqueda
3. proveedor
4. limpiar
5. paginación
6. porcentaje de stock
7. dark/light
8. móvil


REGISTRAR:
/gestion/compras-materia-prima/registrar

Probar:

1. lote vacío
2. proveedor vacío
3. fecha
4. PEN por defecto
5. USD
6. Material vacío
7. Color vacío
8. cantidad <= 0
9. precio negativo
10. precio 0 en un ítem y total lote > 0
11. repetir Material + Color
12. varios materiales
13. quitar material
14. impedir quitar el último
15. subtotal
16. peso total
17. monto total
18. confirmación
19. doble clic
20. retry con misma Idempotency-Key
21. creación correcta
22. stock creado


DETALLE:
/gestion/compras-materia-prima/:compra_materia_prima_id

Probar:

1. cabecera
2. comprado
3. disponible
4. consumido
5. monto
6. Material + Color
7. precio
8. subtotal
9. lote con consumo
10. lote agotado
11. dark/light
12. móvil


============================================================
SIGUIENTE MODULO
============================================================

ALMACÉN

Después de cerrar Compras, corresponde continuar con:

- Almacén de materia prima
- Almacén de producto terminado
- Mermas

manteniendo las reglas FIFO y stock actuales.
