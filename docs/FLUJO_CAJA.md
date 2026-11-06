# Flujo de caja de gestión

Acceso: **Control → Flujo de caja**, ruta `/gestion/flujo-caja`.
El inicio es mensual, en el mes actual de Lima y en soles. La pestaña anual
presenta doce meses y permite abrir el detalle mensual. No requiere migraciones
ni dependencias nuevas: reutiliza Recharts, instalado para el EERR.

## Criterios acordados

- El historial parte de cero. Las inversiones/aportes son entradas en su fecha.
  Si ocurrieron antes del período consultado, ya forman parte de su saldo
  inicial; no vuelven a ingresar en el período.
- Saldo inicial = todas las entradas anteriores − todas las salidas anteriores.
- Flujo neto = entradas del período − salidas del período.
- Saldo final = saldo inicial + flujo neto. El cierre de un mes pasa al siguiente.
  Los saldos mensuales no se suman para obtener un saldo anual.
- Toda compra y gasto registrado se considera pagado en su fecha registrada,
  según la confirmación del negocio. No se añade una segunda fuente de pagos.
- Cobros de clientes se toman de Depósitos, incluyendo anticipos y cobros de
  ventas antiguas. Pedidos y entregas no originan otra entrada de caja.
- El consumo de materia prima y el costo de ventas del EERR no producen una
  segunda salida: la compra pagada ya se contabiliza en su fecha.
- SUNAT es una salida independiente de gastos operativos, por su importe
  registrado. No se calculan ni descuentan tasas de IGV o renta.
- Los préstamos recibidos ingresan por su capital. Los otorgados salen por su
  capital. Las cuotas pagadas/cobradas se separan en capital, interés y cargos
  y no se agrega nuevamente el total de la cuota.
- Las devoluciones de inversiones/aportes son salidas independientes.
- Se excluyen gastos, préstamos, pagos, inversiones y devoluciones anulados
  conforme a los indicadores `activo` de los módulos existentes.
- Cada moneda se consulta por separado, sin conversión automática.
- El período actual se corta hoy en Lima; los períodos anteriores hasta su
  último día. Fechas futuras no integran el flujo real y se muestran sin datos.

## Orígenes y trazabilidad

Cada registro de caja tiene una clave por origen e ID. Para cuotas, se añade
el componente (`CAPITAL`, `INTERES`, `CARGO`). Dos depósitos por el mismo monto
con IDs diferentes siguen siendo dos cobros. Una referencia repetida en la
consulta se rechaza para no devolver un reporte duplicado.

Se incluyen depósitos, gastos, compras generales, compras de materia prima,
inversiones, devoluciones, préstamos y sus pagos. Se conserva la referencia,
contraparte, fecha y acceso al módulo de origen.

Los movimientos se ordenan por fecha y clave de origen; el sistema no dispone
de una hora de negocio para cada cobro o pago. El saldo dentro del mismo día
sigue ese orden de presentación. El saldo diario de cierre es el acumulado de
todos los movimientos de esa fecha.

La pantalla permite abrir el saldo inicial, entradas, salidas, saldo final y
cada categoría. El saldo inicial muestra todos sus movimientos anteriores.
El cierre explica su fórmula y muestra los movimientos del período. Los
filtros de búsqueda y sentido solo afectan la lista de movimientos, no las
tarjetas de resumen; el saldo acumulado conserva todo el historial.

Una misma operación registrada manualmente en dos módulos distintos seguirá
siendo dos registros para el sistema. No se deduplican por coincidencia de
importe, fecha o texto, porque también puede tratarse de operaciones legítimas
distintas. No se incluyen transferencias entre cuentas o devoluciones de
clientes como fuentes autónomas, ya que esos módulos no existen actualmente.

## Verificación

Desde `frontend`:

```powershell
npm run build
npx eslint src/pages/FlujoCaja.tsx src/components/flujoCaja
```

Desde `backend`, pruebas de cálculo y API local:

```powershell
node --test tests/flujoCaja.test.js tests/flujoCaja.api.test.js
```

Con SQL Server configurado:

```powershell
node --test tests/flujoCaja.sql.test.js
```

Las pruebas SQL emplean únicamente variables de tabla de sesión. Incluyen una
conciliación con el cálculo existente del dashboard para el mismo historial.
No leen ni modifican movimientos reales.
