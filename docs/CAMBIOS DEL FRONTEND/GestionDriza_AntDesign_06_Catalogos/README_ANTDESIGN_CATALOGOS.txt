GESTIONDRIZA - ANT DESIGN
ETAPA 06: CATALOGOS

ALCANCE

Se migra completamente:

src/pages/Catalogos.tsx


============================================================
FUNCIONALIDAD REAL DEL BACKEND
============================================================

Catálogos administrables:

- Tipos de producto
- Medidas
- Colores
- Materiales

Endpoints existentes:

GET    /api/catalogos/:catalogo
POST   /api/catalogos/:catalogo
PUT    /api/catalogos/:catalogo/:id
DELETE /api/catalogos/:catalogo/:id


IMPORTANTE

DELETE realiza baja lógica:

activo = 0

Por eso la interfaz usa:
"Dar de baja"

y NO:
"Eliminar".


============================================================
ARCHIVOS
============================================================

REEMPLAZAR:

src/pages/Catalogos.tsx

AGREGAR:

src/styles/catalogos.css


NO SE MODIFICA

- Backend
- App.tsx
- Sidebar
- themeConfig


============================================================
ANT DESIGN UTILIZADO
============================================================

- Tabs
- Card
- Form
- Input
- Table
- Tag
- Modal
- Popconfirm
- Button
- Space
- Empty
- message
- Icons


============================================================
CAMBIOS FRENTE A LA PANTALLA ANTIGUA
============================================================

ANTES:
- botones HTML para tabs
- input HTML
- table HTML
- solo crear y listar
- mostraba ID técnico

AHORA:
- Tabs Ant Design
- Form Ant Design
- Table Ant Design
- Crear
- Editar
- Dar de baja
- Buscar
- Actualizar
- NO se muestran IDs


============================================================
EDICION
============================================================

Editar abre:

Modal

No se navega a otra página porque la entidad solo tiene
un dato editable:
Nombre.


============================================================
DAR DE BAJA
============================================================

Utiliza:

Popconfirm

Texto:

"Dejará de aparecer en nuevas selecciones."

Este mensaje sí es útil porque explica la consecuencia
funcional de la baja.


============================================================
DUPLICADOS
============================================================

Crear:
backend ya valida nombres duplicados.

Editar:
la interfaz también comprueba contra la lista actual
antes de enviar para evitar editar un registro con el
mismo nombre de otro activo.


============================================================
TABLA
============================================================

Columnas:

- Nombre
- Estado
- Fecha de registro
- Acciones

NO:
- ID


Mobile:
"Fecha de registro" se oculta.

La tabla mantiene scroll horizontal como respaldo.


============================================================
DARK / LIGHT
============================================================

Table hereda los tokens globales corregidos.

No se agregan backgrounds fijos blancos.

Cards usan el tema Ant Design.


============================================================
RESPONSIVE
============================================================

Desktop:

[ Agregar registro ] [ Tabla ]

Tablet / Mobile:

[ Agregar registro ]
[ Tabla             ]

Tabs permiten desplazamiento horizontal.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev

/gestion/catalogos

Por cada pestaña:

1. cargar listado
2. buscar
3. crear
4. intentar duplicado
5. editar
6. intentar editar a nombre duplicado
7. dar de baja
8. cancelar baja
9. modo claro
10. modo oscuro
11. móvil 375 / 390 / 430


============================================================
SIGUIENTE ETAPA
============================================================

Siguiente opción del Sidebar:

PRODUCTOS TERMINADOS

Se migrará:

- listado
- filtros
- registrar producto
- detalle
- composición
- historial de composiciones

manteniendo toda la lógica de negocio actual.
