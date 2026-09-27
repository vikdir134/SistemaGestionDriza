GESTIONDRIZA - ANT DESIGN
ETAPA 01: LOGIN + BASE DE TEMA

OBJETIVO

Iniciar la migración total del frontend a Ant Design.

Esta primera etapa fija:
- Ant Design como librería UI principal.
- Theme Provider global.
- Modo claro/nocturno.
- Persistencia del tema en localStorage.
- Colores semánticos base.
- Tipografía base.
- Alturas de controles.
- Radios.
- Feedback mediante Ant Design.
- Primer componente UI reutilizable: ThemeToggle.
- Login responsive desktop/mobile.


============================================================
1. INSTALAR DEPENDENCIAS
============================================================

Desde frontend:

npm install antd @ant-design/icons


No es necesario copiar node_modules.


============================================================
2. ARCHIVOS A AGREGAR
============================================================

src/theme/
- themeConfig.ts
- GestionDrizaThemeProvider.tsx

src/components/ui/
- ThemeToggle.tsx

src/styles/
- login.css


============================================================
3. ARCHIVOS A REEMPLAZAR
============================================================

src/pages/Login.tsx
src/main.tsx


============================================================
4. PACKAGE.JSON
============================================================

Se incluye package.json actualizado como referencia.

Si ejecutaste:

npm install antd @ant-design/icons

npm actualizará automáticamente tu package.json
y package-lock.json, por lo que no necesitas copiar
package.json manualmente si las dependencias aparecen.


============================================================
5. PRINCIPIOS QUE FIJAMOS DESDE AHORA
============================================================

ANT DESIGN

Cuando Ant Design tenga un componente equivalente:
se utilizará Ant Design.

Ejemplos:
- Button
- Form
- Input
- Input.Password
- Select
- DatePicker
- Card
- Modal
- Drawer
- Table
- Tag
- Badge
- Tooltip
- Popconfirm
- Alert
- Result
- Empty
- Skeleton
- Spin
- Pagination
- Tabs
- Dropdown
- Menu
- Statistic
- Descriptions
- Upload
- Switch


FEEDBACK

No crear alertas visuales independientes por página.

Se utilizará el sistema de Ant Design:
- message
- notification
- Alert
- Modal

según corresponda.


TEMA

Todo nuevo componente debe soportar:
- claro
- oscuro

El tema se controla desde:

GestionDrizaThemeProvider


============================================================
6. LOGIN
============================================================

El Login utiliza:

- Row
- Col
- Card
- Form
- Input
- Input.Password
- Button
- Avatar
- Tag
- Typography
- Space
- Tooltip
- message
- iconos Ant Design

No modifica la API ni el contrato del backend.

Sigue enviando:

{
  correo,
  password
}

a:

POST /api/auth/login


============================================================
7. RESPONSIVE
============================================================

DESKTOP

Pantalla dividida:
- panel institucional
- formulario

MOBILE

- se oculta panel lateral
- aparece identificación compacta
- formulario ocupa ancho disponible
- botón de tema permanece accesible


============================================================
8. MODO NOCTURNO
============================================================

El usuario puede cambiar tema desde el botón superior.

Preferencia guardada en:

localStorage:
gestiondriza-theme

Valores:
light
dark

Si nunca eligió tema:
se toma prefers-color-scheme del dispositivo.


IMPORTANTE:

Durante la migración página por página,
las páginas antiguas todavía contienen CSS propio con colores
fijos. El Theme Provider ya es global, pero la compatibilidad
visual completa con modo oscuro llegará a cada módulo cuando
lo migremos a Ant Design.

Esto es intencional para NO romper todas las páginas de golpe.


============================================================
9. PROBAR
============================================================

npm run build

npm run dev

Probar:

/login

Desktop:
- formulario
- validaciones
- loading
- feedback
- login real
- modo claro
- modo oscuro

Mobile:
usar DevTools y probar:
375px
390px
430px


============================================================
10. SIGUIENTE ETAPA
============================================================

Después de aprobar Login:

migrar el Layout general:
- Sidebar
- Header
- navegación
- usuario
- logout
- ThemeToggle
- responsive Drawer

Luego continuar EXACTAMENTE según orden del Sidebar,
pantalla por pantalla.
