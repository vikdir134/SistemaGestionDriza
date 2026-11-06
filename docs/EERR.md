# Estado de resultados de gestión

Se accede desde **Control → Estado de resultados** (`/gestion/eerr`). La vista
inicial usa el mes actual de Lima y soles. Se puede cambiar el mes y consultar
soles o dólares por separado. Cada concepto e importe abre su detalle.

## Vista anual

La pestaña **Mensual** es la inicial. **Anual** muestra un año seleccionable,
con cuatro indicadores que abren sus registros: ventas entregadas, cuentas
por cobrar, pedidos ingresados y clientes atendidos. Los gráficos se cargan
solo al abrir la vista anual (Recharts).

- El año actual se corta al día de hoy en Lima; un año anterior se corta al
  31 de diciembre. No se admiten años futuros y los meses futuros quedan sin
  datos en las curvas y la tabla, en lugar de dibujarse como ceros.
- Las ventas y los clientes se cuentan por las entregas del año en la moneda
  seleccionada. Los clientes se agrupan por ID; atender al mismo cliente en
  varios meses no lo multiplica en el indicador anual.
- Los pedidos se cuentan por fecha de pedido, excluyendo cancelados, una vez
  por pedido que tenga al menos un detalle activo en la moneda seleccionada.
  El total puede diferir de los pedidos entregados en ese año.
- **Cuentas por cobrar** es el saldo de todas las entregas pendientes al corte,
  incluyendo deuda de años anteriores, menos depósitos de sus mismos pedidos
  y moneda hasta ese corte. No incluye la parte aún no entregada de un pedido,
  no suma anticipos sin entrega ni compensa saldos entre pedidos.
- Una venta de octubre cobrada en noviembre sigue siendo venta de octubre,
  pero su saldo por cobrar sí disminuye en noviembre. La venta originalmente
  a crédito y el saldo pendiente actual son medidas distintas.
- La curva de cuentas por cobrar muestra saldos al corte de cada mes; los
  saldos no se suman entre meses. El total anual de clientes tampoco es la suma
  de los clientes mensuales, sino el número de clientes distintos del año.
- El gráfico circular ordena clientes por ventas entregadas y agrupa los que
  quedan fuera de los cinco primeros como **Otros clientes**. Se puede abrir
  el detalle desde el gráfico o su leyenda y consultar todos los clientes.
- Los gráficos, sus leyendas, tarjetas y tooltips se adaptan a los temas claro
  y oscuro. Una tabla presenta las mismas cifras y permite abrir el EERR de
  cualquier mes habilitado.

## Reglas acordadas

- Los importes se usan tal como fueron registrados. No se calculan tasas de
  IGV, renta ni beneficios tributarios. Este es un reporte de gestión con la
  clasificación indicada por el negocio.
- Cada detalle de entrega genera ventas únicamente en su fecha de entrega.
  Registrar un pedido o cobrar un depósito no genera otra venta.
- Una entrega de octubre cobrada en noviembre pertenece a octubre. Las
  entregas parciales de distintos meses se reconocen por separado.
- El precio es el **actual** del detalle del pedido: editarlo recalcula sus
  entregas anteriores. No hay cierre ni congelamiento de períodos.
- Las ventas cubiertas y a crédito son partes complementarias del importe
  entregado, no dos ventas completas. La suma coincide con ventas totales.
- Los depósitos se aplican primero al valor acumulado de las entregas más
  antiguas del mismo pedido y moneda. Se consideran los pagos con fecha menor
  o igual a la entrega, incluyendo todos los del mismo día porque el sistema
  registra fechas de negocio sin hora. Los pagos posteriores no reclasifican
  esa entrega. Editar precios o registrar pagos retroactivos sí puede cambiar
  la cobertura histórica al volver a calcular.
- Los anticipos sin entrega no son ventas.
- Se usan las entregas reales, aunque el estado actual del pedido cambie;
  cambiar un estado no equivale a registrar una devolución.

## Costo de lo vendido

Se reconstruye FIFO de producto terminado por `stock_producto_terminado_id`
(producto, unidad y presentación), en el orden de registro de sus movimientos.
Todas las salidas anteriores y ajustes consumen existencias, incluso las
entregas de otros meses o monedas. Una entrada futura nunca cubre una salida
anterior. Es una asignación de costos FIFO, no una identificación física de
cada producto entregado.

Por cada producción asignada a una entrega se consultan los consumos reales
de materia prima y sus lotes de compra. Cada componente se calcula con la
proporción entregada de esa producción y el precio registrado de su lote.
El costo de la materia prima que permanece en producto terminado sin entregar
no se descuenta. Tampoco se descuentan compras generales o toda la producción
del mes. Los céntimos se distribuyen mediante diferencias acumuladas para
conservar el costo al efectuar entregas parciales.

El detalle permite ver pedido, entrega, producción, lote, material, cantidad
aplicada y precio. Las cantidades de producto se repiten por componente;
no deben sumarse entre componentes de la misma producción y entrega.

Si falta un movimiento de almacén, producción, consumo o conversión de moneda
o unidad, se muestra **Por completar** para costo y utilidades. El costo
identificado queda visible; los importes faltantes no se asumen como cero.
Actualmente producción trabaja en KG y no existe conversión cambiaria en el
reporte. No se mezclan monedas para mostrar una utilidad artificial.

## Gastos y resultado

1. Ventas totales = ventas cubiertas al entregar + ventas a crédito al entregar.
2. Utilidad bruta = ventas totales − costo de materia prima de lo entregado.
3. Gastos operativos = todos los gastos activos del período y moneda, excepto
   los de tipo `SUNAT` (comparación sin distinguir mayúsculas o espacios extremos).
4. Utilidad operacional = utilidad bruta − gastos operativos.
5. Gastos financieros e impuesto a la renta = gastos activos tipo `SUNAT`
   por fecha de gasto + intereses pagados por fecha de pago en préstamos
   **recibidos** activos. Se excluyen pagos anulados, capital y cargos.
6. Utilidad neta = utilidad operacional − gastos financieros e impuesto a la renta.

SUNAT se consulta una sola vez y se excluye del bloque operativo. El detalle
de intereses identifica préstamo y pago. No existe conciliación automática
si se registra manualmente el mismo interés también en el módulo Gastos;
los dos registros serían hechos distintos para el sistema.

El reporte no incorpora ajustes por devoluciones/notas de crédito ni ingresos
por intereses de préstamos otorgados. Tampoco agrega costos laborales o
indirectos a materia prima: esos registros se consideran según el apartado
Gastos, conforme al alcance acordado.

## Verificación

Desde `frontend`:

```powershell
npm run build
npx eslint src/pages/Eerr.tsx src/components/eerr
```

Desde `backend`, sin base de datos (las pruebas API solo abren localhost):

```powershell
node --test tests/eerr.test.js tests/eerr.anual.test.js tests/eerr.api.test.js
```

Con SQL Server y `.env` configurado:

```powershell
node --test tests/eerr.sql.test.js
```

Las pruebas SQL usan únicamente variables de tabla y una tabla temporal de
sesión. No leen ni modifican movimientos reales. Para ejecutar la aplicación
se reinician backend y frontend; el módulo no necesita una nueva migración.
