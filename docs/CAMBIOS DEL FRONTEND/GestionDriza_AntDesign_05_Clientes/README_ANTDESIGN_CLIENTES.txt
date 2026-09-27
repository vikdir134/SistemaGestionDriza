GESTIONDRIZA - ANT DESIGN
ETAPA 05: CLIENTES

ALCANCE COMPLETO DEL MODULO

Se migran:

- Listado de clientes
- Registrar cliente
- Editar cliente
- Historial de precios
- Formulario reutilizable de cliente


============================================================
ARCHIVOS A REEMPLAZAR
============================================================

src/components/clientes/ClienteForm.tsx

src/pages/clientes/ClientesLista.tsx
src/pages/clientes/RegistrarCliente.tsx
src/pages/clientes/EditarCliente.tsx
src/pages/clientes/HistorialPreciosCliente.tsx


============================================================
ARCHIVOS NUEVOS
============================================================

src/components/ui/BackButton.tsx
src/styles/clientes.css


============================================================
NO SE MODIFICA
============================================================

- App.tsx
- Sidebar.tsx
- Backend
- Contratos API


============================================================
ANT DESIGN UTILIZADO
============================================================

Listado:
- Card
- Input.Search
- Button
- Space
- Table
- Tag
- Empty
- Typography

Formulario:
- Form
- Form.Item
- Row / Col
- Input
- Buttons

Historial precios:
- Form
- Select
- DatePicker
- InputNumber
- TextArea
- Table
- Tag
- Card
- Pagination integrada a Table


============================================================
REGLAS UX
============================================================

1. NO se muestran IDs internos de cliente.

2. RUC:
   - obligatorio
   - 11 dígitos
   - solo números

3. Razón social:
   - obligatoria

4. Correo:
   - opcional
   - si se ingresa, debe ser válido

5. Registrar/editar no abre confirmación innecesaria.

6. Las acciones de escritura usan useBloqueoAccion.

7. Feedback mediante Ant Design message.

8. Errores de carga de edición usan Result de Ant Design.


============================================================
LISTADO
============================================================

Desktop:
- RUC
- Razón social
- Dirección
- Agencia
- Teléfono
- Correo
- Acciones

Mobile:
las columnas secundarias se ocultan progresivamente usando
responsive de Table, manteniendo:
- RUC
- Razón social
- Acciones

No se muestra cliente_id.


============================================================
HISTORIAL DE PRECIOS
============================================================

Se conserva toda la funcionalidad existente:

- registrar precio
- cliente
- tipo
- medida
- color
- material
- fecha
- precio
- PEN / USD
- observación
- filtro por cliente
- búsqueda de producto
- paginación backend

PEN sigue siendo la moneda predeterminada.


============================================================
RESPONSIVE
============================================================

Todos los formularios usan:
Row / Col

Table utiliza:
responsive columns
scroll horizontal como respaldo

Mobile:
- acciones ocupan ancho disponible
- formularios se apilan


============================================================
LIGHT / DARK
============================================================

Los controles son Ant Design.

En modo claro:
- bordes de Cards más visibles
- cabecera Table ligeramente diferenciada

En modo oscuro:
Ant Design controla automáticamente colores y superficies.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev

CLIENTES:
/gestion/clientes

Probar:
- búsqueda
- limpiar
- actualizar
- paginación
- Editar
- Precios
- móvil
- dark/light

REGISTRAR:
/gestion/clientes/registrar

Probar:
- RUC inválido
- RUC menor/mayor 11
- cliente existente
- creación correcta
- correo inválido
- doble clic

EDITAR:
- carga
- actualización
- RUC duplicado
- error de carga

PRECIOS:
/gestion/clientes/precios

Probar:
- registrar PEN
- registrar USD
- precio <= 0
- filtros
- paginación
- acceso desde un cliente concreto


============================================================
SIGUIENTE ETAPA
============================================================

Siguiente opción del Sidebar:

CATÁLOGOS

Se migrará completamente a Ant Design manteniendo
las operaciones reales actuales.
