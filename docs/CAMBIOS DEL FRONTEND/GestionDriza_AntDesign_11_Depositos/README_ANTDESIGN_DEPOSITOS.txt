GESTIONDRIZA - ANT DESIGN
ETAPA 11: DEPOSITOS

ALCANCE

Se migran completamente:

- Listado de pedidos con control de depósitos
- Filtros
- Resumen de pago por moneda
- Registro de depósito
- Historial de depósitos


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/pages/Depositos.tsx
src/pages/DepositoPedidoDetalle.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/depositosAntd.css


============================================================
NO SE MODIFICA
============================================================

- backend
- App.tsx
- rutas
- tipos de depósito
- reglas de saldo
- edición de pedidos
- contratos API


============================================================
LISTADO
============================================================

Ant Design:

- Card
- Form
- Select
- Input
- Table
- Tag
- Empty
- Pagination

NO se muestra pedido_id.

Se muestra codigo_pedido cuando existe.


============================================================
ESTADO DE PAGO
============================================================

Estados conservados:

PAGADO
PARCIAL
SIN_PAGO

UI:

Pagado
Parcial
Sin pago


============================================================
2 DECIMALES
============================================================

Se aplica a:

- total pedido
- total depositado
- saldo pendiente
- monto depósito
- saldo después
- historial

Ejemplos:

1,500.00 PEN
500.00 PEN
1,000.00 PEN


============================================================
RESUMEN POR MONEDA
============================================================

El detalle muestra correctamente por separado:

PEN
USD

Columnas:

- Moneda
- Total pedido
- Total depositado
- Saldo pendiente
- Estado


============================================================
REGISTRO
============================================================

Campos:

- Tipo de depósito
- Fecha
- Moneda
- Monto
- Número de operación
- Observación

Fecha:
hoy por defecto.

Moneda:
PEN por defecto.


============================================================
SALDO
============================================================

Al seleccionar una moneda:

- se identifica su saldo pendiente;
- monto máximo = saldo pendiente;
- se muestra saldo actual;
- depósito ingresado;
- saldo después;
- progreso de pago.

Si la moneda no existe en el pedido:
el monto queda bloqueado.


============================================================
VALIDACION
============================================================

Frontend:

monto > 0
monto <= saldo pendiente

Backend:
sigue siendo la autoridad final.


============================================================
CONFIRMACION
============================================================

Registrar depósito requiere confirmación porque afecta
el saldo financiero del pedido y actualmente el módulo
no expone una reversión/eliminación del depósito.

El modal muestra:

- monto
- moneda
- saldo que quedará después


============================================================
DOBLE ENVIO
============================================================

Se conserva:

useBloqueoAccion

No se agrega idempotencia ficticia porque el backend actual
de depósitos no implementa Idempotency-Key.


============================================================
HISTORIAL
============================================================

NO se muestra deposito_id.

Columnas:

- Tipo
- Fecha
- Monto
- Operación
- Registrado por
- Observación


============================================================
DARK / LIGHT
============================================================

Todos los componentes principales son Ant Design.

Table utiliza themeConfig global.

No se agregan fondos blancos fijos.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev


LISTADO:
/gestion/depositos

Probar:

- cliente
- búsqueda
- limpiar
- paginación
- pedido PEN
- pedido USD
- pedido con varias monedas
- dark/light
- mobile


DETALLE:
/gestion/depositos/:pedido_id

Probar:

1. PEN sin pagos
2. PEN parcial
3. PEN pagado
4. USD sin pagos
5. pedido PEN + USD
6. monto <= 0
7. monto > saldo
8. monto = saldo exacto
9. cambiar moneda
10. número operación
11. observación
12. confirmación
13. doble clic
14. historial
15. dark/light
16. mobile


============================================================
NOTA DEL LISTADO
============================================================

El backend histórico devuelve:

total_referencial
depositado_referencial
saldo_referencial

como suma de los importes de todas las monedas.

Se conservan porque forman parte del contrato actual.

En el detalle SIEMPRE se trabaja correctamente por moneda,
que es donde se registra el depósito.


============================================================
SIGUIENTE MODULO
============================================================

PROVEEDORES

Después de Depósitos corresponde migrar:

- listado
- búsqueda
- registrar
- editar si existe
- datos de contacto
- feedback
- doble envío
- dark/light
- responsive
