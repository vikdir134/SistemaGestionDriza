GESTIONDRIZA - AJUSTE GLOBAL
TABLAS DARK + 2 DECIMALES

CAMBIOS

1. Corrige hover de Table en modo oscuro.

Antes:
- al pasar el mouse la fila cambiaba demasiado;
- columnas fijas podían verse con fondo diferente.

Ahora:
- hover dark = #242932;
- la fila completa usa el mismo fondo;
- columnas fijas respetan el mismo hover.


2. Regla global de 2 decimales.

Desde ahora se mostrarán con exactamente 2 decimales:

- precios
- cantidades
- pesos
- stock
- montos
- subtotales
- totales

Ejemplos:

3468 -> 3,468.00
20 -> 20.00
15.5 -> 15.50
100.123 -> 100.12


IMPORTANTE

La base de datos NO pierde precisión.

Esta es principalmente una regla de presentación del frontend.


============================================================
ARCHIVOS
============================================================

REEMPLAZAR:

src/theme/themeConfig.ts
src/pages/Dashboard.tsx
src/pages/clientes/HistorialPreciosCliente.tsx
src/styles/clientes.css

AGREGAR:

src/utils/formatters.ts


============================================================
FORMATTERS
============================================================

A partir de ahora las páginas nuevas deben reutilizar:

formatNumero()
formatCantidad()
formatPeso()
formatPrecio()
formatMonto()
formatTotal()

Todos muestran 2 decimales.


Ejemplo:

formatCantidad(100)
=> "100.00"

formatPrecio(15.5)
=> "15.50"


============================================================
INPUT DE PRECIO
============================================================

Historial de precios cambia de:

4 decimales

a:

2 decimales

step:
0.01

mínimo:
0.01


============================================================
DASHBOARD
============================================================

Stock materia prima:
3,468.000 KG

pasa a:

3,468.00 KG


Stock producto terminado:
20.000 KG

pasa a:

20.00 KG


============================================================
REGLA PARA SIGUIENTES MODULOS
============================================================

Durante la migración Ant Design de cada página:

NO usar:
.toFixed(3)
.toFixed(4)

para cantidades/precios visibles.

Usar los formatters globales.

Los inputs de cantidades/precios usarán normalmente:
precision={2}
step={0.01}

salvo que una regla de negocio futura justifique explícitamente
otra precisión.
