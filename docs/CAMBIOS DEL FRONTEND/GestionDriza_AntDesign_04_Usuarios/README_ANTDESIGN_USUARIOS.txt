GESTIONDRIZA - ANT DESIGN
ETAPA 04: USUARIOS

FUNCIONALIDAD REAL ACTUAL

El backend actual de Usuarios solamente expone:

GET /api/auth/roles
POST /api/auth/usuarios

Por eso esta etapa conserva exactamente:
- cargar roles
- crear usuario

NO se agrega listado, edición o eliminación porque todavía
no existen endpoints backend para esas operaciones.


============================================================
ARCHIVO A REEMPLAZAR
============================================================

src/pages/usuarios/UsuariosAdmin.tsx


============================================================
ARCHIVO NUEVO
============================================================

src/styles/usuarios.css


============================================================
ANT DESIGN UTILIZADO
============================================================

- App.useApp / message
- Alert
- Button
- Card
- Col
- Form
- Input
- Input.Password
- Row
- Select
- Space
- Typography
- Icons


============================================================
SE ELIMINA
============================================================

- FeedbackToast propio de esta pantalla
- inputs HTML directos
- select HTML directo
- validaciones manuales visibles en código
- botón HTML propio


============================================================
VALIDACIONES
============================================================

Nombre:
- obligatorio
- no vacío
- máximo 150

Correo:
- obligatorio
- formato email
- máximo 150

Contraseña:
- obligatoria
- mínimo 8 caracteres

Rol:
- obligatorio


============================================================
REGLAS DE NEGOCIO VISIBLES
============================================================

Se mantienen textos útiles para comprender:
- el rol controla permisos;
- la contraseña es necesaria para iniciar sesión;
- el correo debe ser único.

Estos sí son mensajes válidos porque explican reglas
funcionales y no decisiones técnicas de UI.


============================================================
RESPONSIVE
============================================================

Desktop:
- formulario 2 columnas
- panel informativo a la derecha

Tablet/mobile:
- formulario se apila
- panel informativo baja
- botones ocupan ancho disponible


============================================================
LIGHT / DARK
============================================================

Todos los controles principales son Ant Design.

El CSS usa el tema global y solo añade estructura/contraste.


============================================================
PRUEBAS
============================================================

npm run build
npm run dev

Como ADMIN:

/gestion/usuarios

Probar:
1. formulario vacío
2. correo inválido
3. contraseña < 8 caracteres
4. rol sin seleccionar
5. creación correcta
6. correo duplicado
7. modo claro
8. modo oscuro
9. móvil 375 / 390 / 430 px


============================================================
SIGUIENTE ETAPA
============================================================

Siguiente página del Sidebar:

CLIENTES

Ahí migraremos:
- listado
- búsqueda
- filtros
- tabla
- paginación
- crear/editar
- estados
- dialogs
- feedback

manteniendo la lógica actual y usando Ant Design.
