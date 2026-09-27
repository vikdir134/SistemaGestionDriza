GESTIONDRIZA - ANT DESIGN
ETAPA 02: LAYOUT + SIDEBAR + HEADER

REQUISITO

Esta etapa asume que ya aplicaste la ETAPA 01:
- Ant Design instalado
- GestionDrizaThemeProvider
- ThemeToggle


============================================================
ARCHIVOS
============================================================

Reemplazar:

src/components/Sidebar.tsx
src/layouts/GestionLayout.tsx

Agregar:

src/styles/layout.css


NO MODIFICAR

src/App.tsx

Las rutas actuales se conservan.


============================================================
QUE CAMBIA
============================================================

Antes:
- Sidebar HTML/CSS propio
- botones propios
- submenús propios
- layout flex manual

Ahora:
- Layout de Ant Design
- Sider
- Header
- Content
- Menu
- SubMenu
- Drawer
- Dropdown
- Avatar
- Breadcrumb
- Modal.confirm
- Buttons e iconos Ant Design


============================================================
DESKTOP
============================================================

Sidebar:
- fijo durante scroll
- colapsable
- 264 px abierto
- 84 px cerrado
- navegación Ant Design
- submenús

Header:
- botón colapsar/expandir
- breadcrumb
- modo claro/nocturno
- usuario
- roles
- menú de usuario
- logout


============================================================
MOBILE
============================================================

No se comprime el Sidebar.

En su lugar:
- botón hamburguesa
- Drawer lateral
- Drawer se cierra automáticamente al navegar
- usuario compacto
- ThemeToggle visible

Probar:
375px
390px
430px


============================================================
MENU ACTUAL
============================================================

Inicio

Usuarios
(solo ADMIN)

Clientes

Catálogos

Productos terminados

Producción
├── Historial
└── Registrar producción

Pedidos
├── Pedidos totales
└── Registrar pedido

Entregas

Depósitos

Proveedores

Compras
├── Compras generales
├── Materia prima
└── Registrar lote

Almacén
├── Materia prima
├── Producto terminado
└── Mermas

Gastos


============================================================
LOGOUT
============================================================

Cerrar sesión ya no es un botón rojo fijo.

Está dentro del menú del usuario.

Al seleccionar:
Cerrar sesión

Ant Design abre:
Modal.confirm

Si confirma:
- cerrarSesion()
- redirección /login


============================================================
MODO NOCTURNO
============================================================

El Header reutiliza:

ThemeToggle

El Layout cambia fondo automáticamente según:

data-gd-theme="light"
data-gd-theme="dark"

Las páginas antiguas todavía serán migradas una por una.


============================================================
IMPORTANTE SOBRE index.css
============================================================

NO borres todavía los estilos antiguos del Sidebar en index.css.

Ya no serán utilizados por el nuevo Sidebar,
pero algunas reglas globales antiguas todavía podrían ser
usadas por páginas no migradas.

Haremos la limpieza global al terminar la migración completa.


============================================================
PRUEBAS
============================================================

1. npm run build

2. npm run dev

3. Desktop:
- navegar por todas las opciones
- abrir/cerrar grupos
- colapsar sidebar
- cambiar tema
- abrir menú usuario
- cancelar logout
- confirmar logout

4. Mobile:
DevTools:
375px
390px
430px

Comprobar:
- Drawer
- navegación
- cierre automático Drawer
- ThemeToggle
- usuario
- contenido no desbordado


============================================================
SIGUIENTE PASO
============================================================

Si este Layout queda aprobado:

ETAPA 03:
Dashboard / Inicio

Se migrará completamente a Ant Design usando:
- Typography
- Card
- Statistic
- Row / Col
- Tag
- Avatar
- posiblemente accesos rápidos

Y se diseñará desde el inicio para:
- Desktop
- Tablet
- Mobile
- Light
- Dark
