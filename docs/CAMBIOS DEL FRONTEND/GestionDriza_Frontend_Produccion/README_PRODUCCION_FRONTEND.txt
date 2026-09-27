GESTIONDRIZA - FRONTEND PRODUCCION

ARCHIVOS NUEVOS

src/pages/producciones/
- ProduccionesLista.tsx
- RegistrarProduccion.tsx
- ProduccionDetalle.tsx

src/styles/
- producciones.css


ARCHIVOS A REEMPLAZAR

- src/App.tsx
- src/components/Sidebar.tsx


RUTAS

/gestion/producciones
/gestion/producciones/registrar
/gestion/producciones/:produccion_id


MENU

Producción
├── Historial
└── Registrar producción


REGISTRO DE PRODUCCION

Selección de producto:
Tipo -> Material -> Medida -> Color

El usuario nunca escribe ni busca producto_id.

Cuando la selección está completa:
- se recupera el producto real;
- se muestra la composición vigente;
- si no tiene composición, no se puede producir.

Cantidad:
- cantidad producida en KG;
- presentación en KG;
- la cantidad producida debe ser múltiplo de la presentación.

Preview:
si se escriben 100 KG y la composición es:
70% PP Blanco
30% PP Negro

la pantalla muestra:
70 KG PP Blanco
30 KG PP Negro

Esto es informativo.
La validación definitiva y FIFO siguen siendo responsabilidad
del backend.


SEGURIDAD DE ESCRITURA

- useBloqueoAccion
- ConfirmDialog
- Idempotency-Key estable durante el intento
- si falla la red, la key NO cambia
- si el backend ya hizo COMMIT, el reintento recupera
  la producción existente


DETALLE

Muestra:
- fecha
- productos
- total producido
- registrado por
- composición histórica utilizada
- cantidad y presentación
- stock de PT después del ingreso

Cada producto tiene:
"Ver consumo FIFO de materia prima"

Dentro se ve:
- lote
- fecha de compra
- material
- color
- cantidad consumida


PRUEBA

1. npm run build
2. npm run dev
3. Ir a /gestion/producciones
4. Debe verse Producción #1 ya registrada.
5. Abrir detalle:
   debe mostrar producto 7, 100 KG, presentación 50 KG,
   composición V1 y consumo del lote IMPORTACION PRUEBA 2.
6. Registrar desde frontend una segunda producción controlada.
