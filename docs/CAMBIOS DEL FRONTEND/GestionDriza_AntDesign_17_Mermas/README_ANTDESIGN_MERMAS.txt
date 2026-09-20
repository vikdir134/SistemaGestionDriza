GESTIONDRIZA - ANT DESIGN
ETAPA 17: MERMAS

ALCANCE

Se migran:

- Listado de mermas
- Registrar merma
- Detalle de merma
- Trazabilidad FIFO


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/pages/mermas/MermasLista.tsx
src/pages/mermas/RegistrarMerma.tsx
src/pages/mermas/MermaDetalle.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/mermasAntd.css


============================================================
NO SE MODIFICA
============================================================

- backend
- App.tsx
- Sidebar
- rutas
- base de datos
- FIFO
- stock
- idempotencia


============================================================
LISTADO
============================================================

Filtros:

- Buscar
- Rango de fechas

Buscar consulta backend por:

- Material
- Color
- Observación

Table:

- Fecha
- Materias primas
- Total descontado
- Observación
- Registrado por
- Ver detalle

Paginación:
backend.

NO se muestra merma_id.


============================================================
REGISTRAR MERMA
============================================================

El usuario selecciona:

- Material
- Color
- Cantidad perdida
- Observación opcional

NO selecciona lote.

El lote se determina automáticamente mediante FIFO.


============================================================
DISPONIBILIDAD
============================================================

GET /api/mermas/disponibilidad

Solo devuelve Material + Color con:

cantidad_disponible > 0

Por eso el formulario únicamente ofrece materia prima
que actualmente tiene stock.


============================================================
FILTRO MATERIAL -> COLOR
============================================================

Primero:

Material

Luego Color solamente muestra los colores que tienen
stock disponible para ese material.


============================================================
VALIDACIONES
============================================================

- fecha obligatoria
- mínimo una materia prima
- Material obligatorio
- Color obligatorio
- cantidad > 0
- cantidad <= stock consolidado disponible
- no repetir mismo Material + Color
- observación general <= 500
- observación por materia prima <= 300


============================================================
FIFO
============================================================

NO cambia.

Backend usa transacción SERIALIZABLE y consume:

1. fecha_compra más antigua
2. compra_materia_prima_id menor
3. stock_materia_prima_lote_id menor

Se crea:

SALIDA_MERMA

por cada lote afectado.


============================================================
IDEMPOTENCIA
============================================================

Se conserva:

Idempotency-Key

La key se crea una vez al entrar a RegistrarMerma.

Si falla:
se conserva la misma key.

Si la respuesta se pierde luego de COMMIT:
el retry recupera la merma existente y NO descuenta stock
nuevamente.

Después de éxito:
la pantalla navega al detalle.


============================================================
2 DECIMALES
============================================================

Frontend:

Cantidad perdida:
precision={2}

Stock disponible:
2 decimales

Saldo estimado:
2 decimales

Total merma:
2 decimales

Detalle FIFO:
2 decimales


Backend:

continúa almacenando/validando Decimal(18,3).

No se cambia la precisión interna de la BD.


============================================================
CONFIRMACION
============================================================

Antes de registrar:

"Se descontarán X.XX KG de materia prima."

También informa:

"El sistema consumirá automáticamente primero los lotes
con stock más antiguo."


============================================================
DETALLE
============================================================

Resumen:

- Fecha
- Materias primas
- Total descontado
- Registrado por

Información:

- Fecha merma
- Usuario
- Fecha registro
- Observación general


============================================================
MATERIAS PRIMAS
============================================================

Cada tarjeta muestra:

Material · Color
Cantidad descontada
Observación


============================================================
LOTES AFECTADOS
============================================================

Collapse Ant Design:

"Lotes afectados"

Por lote:

- Lote
- Fecha compra
- Material
- Color
- Descontado

NO se muestran:

- merma_detalle_id
- movimiento_materia_prima_id
- stock_materia_prima_lote_id
- compra_materia_prima_id


============================================================
DARK / LIGHT
============================================================

Componentes principales:

- Card
- Form
- DatePicker
- Select
- InputNumber
- Statistic
- Progress
- Table
- Tag
- Alert
- Collapse
- Modal

Todos Ant Design.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev


LISTADO:
/gestion/mermas

Probar:

1. carga
2. búsqueda Material
3. búsqueda Color
4. búsqueda Observación
5. rango de fechas
6. limpiar
7. paginación
8. dark/light
9. móvil


REGISTRAR:
/gestion/mermas/registrar

Probar:

1. disponibilidad
2. Material
3. Color filtrado
4. cantidad <= 0
5. cantidad > stock
6. cantidad exacta al stock
7. repetir Material + Color
8. varias materias primas
9. quitar materia prima
10. impedir quitar la última
11. saldo estimado
12. observación
13. total
14. confirmación
15. doble clic
16. idempotencia
17. FIFO
18. stock descontado
19. dark/light
20. móvil


DETALLE:
/gestion/mermas/:merma_id

Probar:

1. fecha
2. usuario
3. observación
4. total 2 decimales
5. varias materias primas
6. abrir lotes afectados
7. merma consumida de un lote
8. merma consumida de varios lotes FIFO
9. dark/light
10. móvil


============================================================
SIGUIENTE MODULO
============================================================

GASTOS

Después de Mermas corresponde migrar:

- listado
- registrar
- editar
- eliminar
- feedback
- doble clic
- monedas
- 2 decimales
- dark/light
- responsive
