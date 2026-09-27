GESTIONDRIZA - FRONTEND MERMAS DE MATERIA PRIMA

ARCHIVOS NUEVOS

src/pages/mermas/
- MermasLista.tsx
- RegistrarMerma.tsx
- MermaDetalle.tsx

src/styles/
- mermas.css


REEMPLAZAR

- src/App.tsx
- src/components/Sidebar.tsx


MENU

Almacén
├── Materia prima
├── Producto terminado
└── Mermas


RUTAS

/gestion/mermas
/gestion/mermas/registrar
/gestion/mermas/:merma_id


HISTORIAL

Muestra:
- Fecha
- Cantidad de materias primas
- Total descontado
- Observación
- Registrado por
- Ver detalle

Tiene filtros:
- búsqueda
- fecha desde
- fecha hasta

Paginado desde backend.


REGISTRAR MERMA

El usuario selecciona:
Material -> Color -> Cantidad KG

No selecciona lotes.

El formulario utiliza:
/api/mermas/disponibilidad

Por cada combinación muestra:
- Stock disponible
- Merma ingresada
- Saldo estimado

No permite:
- cantidad 0
- cantidad negativa
- cantidad mayor al stock
- repetir Material + Color
- registrar sin material/color


SEGURIDAD

- ConfirmDialog
- FeedbackToast
- useBloqueoAccion
- Idempotency-Key

La misma key se mantiene si el request falla.
Solo se genera una nueva después de una operación exitosa.


DETALLE

Muestra:
- Fecha
- Total
- Materias primas
- Registrado por
- Observación

Por cada Material + Color:
- cantidad descontada
- observación

Sección:
"Ver lotes afectados"

Muestra:
- Nombre del lote
- Fecha de compra
- Material
- Color
- KG descontados

Esto permite verificar visualmente el FIFO.


PRUEBA

1. npm run build
2. npm run dev

3. Abrir:
   /gestion/mermas

4. Entrar a:
   Registrar merma

5. Elegir una materia prima con stock.

6. Registrar una merma pequeña, por ejemplo 20 KG.

7. Después debe:
   - aparecer en historial;
   - disminuir el Almacén de Materia Prima;
   - mostrar en detalle qué lote fue afectado;
   - aparecer SALIDA_MERMA en los movimientos del lote.
