GESTIONDRIZA
CAMBIO FUNCIONAL - COMPRAS GENERALES
DETALLE COMPLETO + DESCRIPCION OBLIGATORIA + SIN MATERIAL

============================================================
OBJETIVO
============================================================

A partir de este cambio, una COMPRA GENERAL se registra
únicamente mediante una descripción libre por ítem.

Nuevas compras generales:

descripcion_item = OBLIGATORIA
material_id      = NULL
producto_id      = NULL

No generan inventario.

La materia prima continúa registrándose exclusivamente desde:

Compras > Materia prima > Registrar lote


============================================================
NO HAY MIGRACION DE BASE DE DATOS
============================================================

NO eliminar:

compras.CompraDetalle.material_id

Motivo:

- puede existir información histórica;
- la columna ya es nullable;
- eliminarla sería destructivo e innecesario.

Las compras antiguas permanecen intactas.


============================================================
BACKEND - REEMPLAZAR
============================================================

src/modules/compras/compra.controller.js
src/modules/compras/compra.model.js


CONTROLLER:

ANTES:
material O descripción

AHORA:
descripción obligatoria

Además:

item.material_id = null

aunque un cliente intente enviar material_id.


MODEL:

material_id se inserta siempre como NULL
para nuevas compras generales.


============================================================
FRONTEND - REEMPLAZAR
============================================================

src/pages/Compras.tsx
src/App.tsx
src/styles/comprasGeneralesAntd.css


============================================================
FRONTEND - AGREGAR
============================================================

src/pages/CompraDetalle.tsx


============================================================
NUEVO FORMULARIO DE ITEM
============================================================

ANTES:

Material opcional
Descripción
Cantidad
Unidad
Precio
Subtotal


AHORA:

Descripción *
Cantidad *
Unidad *
Precio *
Subtotal


============================================================
NUEVA PANTALLA DE DETALLE
============================================================

Ruta:

/gestion/compras/:compra_id

Muestra:

- Proveedor
- RUC
- Fecha compra
- Documento
- Moneda
- Registrado por
- Dirección proveedor
- Descripción general
- Todos los ítems
- Cantidad
- Unidad
- Precio unitario
- Subtotal
- Total compra


============================================================
COMPRAS HISTORICAS
============================================================

Si una compra antigua tenía material_id:

NO se modifica.

Al abrir su detalle aparece una columna adicional:

Material registrado

Únicamente como información histórica.


============================================================
NO IMPACTA
============================================================

- Pedidos
- Entregas
- Depósitos
- Producción
- Producto terminado
- Almacén de materia prima
- FIFO
- Mermas
- CompraMateriaPrima
- Stock


============================================================
IMPORTANTE
============================================================

Compras generales:

NO generan stock.


CompraMateriaPrima:

SÍ genera:

StockMateriaPrimaLote
ENTRADA_COMPRA


============================================================
2 DECIMALES
============================================================

Se mantienen:

Cantidad
Precio
Subtotal
Total

con 2 decimales visibles.


============================================================
PRUEBAS BACKEND
============================================================

1. Iniciar backend.

2. Registrar compra sin descripcion_item:

Debe responder 400:

El item 1 debe tener una descripción


3. Intentar registrar enviando:

material_id: 1
descripcion_item: "CAJAS"

La operación puede registrarse,
pero la fila nueva debe guardar:

material_id = NULL


4. Ejecutar:

VERIFY_ComprasGenerales_SinMaterial.sql


============================================================
PRUEBAS FRONTEND
============================================================

npm run build
npm run dev


/gestion/compras

Probar:

- ya no existe selector Material;
- descripción obligatoria;
- varios ítems;
- PEN;
- USD;
- total;
- doble clic;
- paginación;
- filtros;
- botón Ver detalle.


/gestion/compras/:compra_id

Probar:

- cabecera;
- proveedor;
- documento;
- descripción;
- ítems;
- precios;
- subtotales;
- total;
- compra histórica con material;
- dark;
- light;
- móvil.
