# Reporte de pedidos en Excel

En **Pedidos → Historial de pedidos → Exportar Reporte**, el modal copia los
filtros aplicados al historial. Sus cambios solo afectan a la descarga.
Permite elegir clientes, fecha del pedido, estado del pedido, estado de pago,
entregas, fecha de última entrega, usuario que registró y búsqueda.
El período utiliza la fecha digitada del pedido, no su fecha de creación en el
servidor. Los productos, entregas y pagos reflejan su situación actual.

La descarga incluye todos los pedidos que coinciden, de todas las páginas.
El archivo se llama `ReportePedidosAAAA-MM-DD_HH-mm-ss.xlsx`, con hora de Perú.
Ambas hojas muestran el exportador autenticado, la fecha y los filtros.

- **Reporte de Pedidos:** una fila por pedido. Productos en una celda con saltos
  de línea, cantidades agrupadas por unidad y montos separados por moneda.
  Estado de pago y, a continuación, estado del pedido.
- **Detalle:** una fila por detalle activo del pedido. Cantidades, precio y
  subtotal son valores numéricos que se pueden filtrar y sumar por moneda.
  El RUC se conserva como texto y las fechas son fechas de Excel.

La fecha de entrega es la última fecha de entrega registrada; si no existe,
se muestra «Sin entregas». La presentación se muestra únicamente cuando el
mismo producto, dentro del mismo pedido y con igual moneda y unidad de precio,
tiene diferentes presentaciones con precios distintos. No se comparan pedidos.
Se mantiene la lógica actual de pagos: solo está pagado cuando se cubren todas
las monedas del pedido. El monto total conserva el cálculo del sistema antes
del redondeo visual de los subtotales individuales.

Los reportes se escriben progresivamente con ExcelJS y una lectura SQL con
control de flujo. No se guardan archivos en el backend ni requieren discos
persistentes en Render. La aplicación recibe el archivo y lo descarga.
El modal evita descargar si no hay coincidencias o las fechas son inválidas.
Excel limita las celdas a 32.767 caracteres: si una descripción excede ese
límite, la celda remite a la hoja Detalle, que conserva todos sus productos.

## Prueba local

Reiniciar el backend para cargar las nuevas rutas. La dependencia ExcelJS está
declarada en `backend/package.json` y en el archivo de bloqueo.

```powershell
cd backend
npm install
npm run dev
```

En otra terminal:

```powershell
cd frontend
npm run dev
```

Iniciar sesión y probar el botón en el historial. El frontend debe apuntar al
backend local mediante su configuración habitual `VITE_API_URL` para probar
estas rutas antes de desplegarlas.

## Verificación automática

Desde `backend`:

```powershell
node --test tests/pedidos.reporte.test.js tests/pedidos.reporte.api.test.js
node --test tests/pedidos.reporte.sql.test.js
```

La prueba SQL requiere la conexión configurada en `.env`. Usa exclusivamente
variables de tabla con datos ficticios; no consulta ni modifica pedidos reales.

## API

Todas las rutas requieren el token habitual:

- `GET /api/pedidos/reporte/opciones`: clientes con pedidos y usuarios que
  registraron pedidos, incluidos históricos.
- `GET /api/pedidos/reporte/resumen`: número de pedidos coincidentes.
- `GET /api/pedidos/reporte`: descarga XLSX.

Los filtros admitidos son `cliente_ids` (IDs separados por coma, hasta 200),
`fecha_desde`, `fecha_hasta`, `entrega_desde`, `entrega_hasta`, `estado_pedido`,
`estado_pago`, `estado_entrega`, `registrado_por` y `q`. Las fechas usan
`AAAA-MM-DD` y los límites son inclusivos. `estado_pago=PENDIENTE` reúne
`SIN_PAGO` y `PARCIAL`. `estado_entrega` admite `PENDIENTE`, `PARCIAL` y
`COMPLETO`. No hay filtro de moneda.
