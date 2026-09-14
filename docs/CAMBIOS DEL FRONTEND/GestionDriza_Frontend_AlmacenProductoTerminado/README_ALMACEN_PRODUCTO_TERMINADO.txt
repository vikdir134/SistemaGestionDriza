GESTIONDRIZA - FRONTEND ALMACEN DE PRODUCTO TERMINADO

ARCHIVOS NUEVOS

src/pages/almacenProductoTerminado/
- AlmacenProductoTerminado.tsx
- AlmacenProductoTerminadoDetalle.tsx

src/styles/
- almacenProductoTerminado.css


REEMPLAZAR

- src/App.tsx
- src/components/Sidebar.tsx


MENU

Almacén
├── Materia prima
└── Producto terminado


RUTAS

/gestion/almacen/producto-terminado

/gestion/almacen/producto-terminado/presentaciones/:stock_producto_terminado_id


PANTALLA PRINCIPAL

Indicadores:
- Stock disponible
- Productos con stock
- Presentaciones con stock

Vistas:
1. Resumen general
2. Por presentación


RESUMEN GENERAL

Una fila por producto real:
- Tipo
- Material
- Medida
- Color
- Disponible

No separa presentaciones.


POR PRESENTACION

Una fila por:
Producto + Presentación

Muestra:
- Producto
- Medida
- Color
- Presentación
- Disponible
- Unidades disponibles
- Estado
- Ver detalle


DETALLE

Muestra:
- Presentación
- Stock disponible
- Unidades disponibles
- Estado

Historial:
- Entrada por producción
- Salida por entrega
- Ajustes

Actualmente, con la prueba existente, debe aparecer:
ENTRADA_PRODUCCION +100 KG
Producción #1


PRUEBA ESPERADA ACTUAL

Después de copiar:

npm run build
npm run dev

Abrir:
/gestion/almacen/producto-terminado

Con el stock actual debería mostrar:

Stock disponible: 100 KG
Productos con stock: 1
Presentaciones con stock: 1

Resumen:
DRIZA / POLIPROPILENO / 1PULG / BLANCO
Disponible: 100 KG

Por presentación:
Presentación: 50 KG
Disponible: 100 KG
Unidades disponibles: 2.00

Detalle:
Entrada por producción
+100 KG
Producción #1
