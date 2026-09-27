GESTIONDRIZA - ANT DESIGN
ETAPA 03: DASHBOARD / INICIO

REQUISITOS

Esta etapa asume:
- Etapa 01 Login aplicada
- Etapa 02 Layout aplicada
- Ant Design instalado


============================================================
ARCHIVOS NUEVOS
============================================================

src/components/ui/
- PageHeader.tsx
- MetricCard.tsx

src/styles/
- dashboard.css


============================================================
ARCHIVO A REEMPLAZAR
============================================================

src/pages/Dashboard.tsx


NO MODIFICAR

- App.tsx
- GestionLayout.tsx
- Sidebar.tsx
- backend


============================================================
OBJETIVO
============================================================

El Dashboard anterior solo mostraba:
- Usuario
- Correo
- Roles

Ahora se convierte en un Dashboard operativo real.


============================================================
INDICADORES
============================================================

Se reutilizan APIs que YA existen:

GET /api/almacen-materia-prima/indicadores

Muestra:
- Stock materia prima
- Lotes registrados


GET /api/almacen-producto-terminado/indicadores

Muestra:
- Stock producto terminado


GET /api/entregas/pedidos?page=1&limit=1

Muestra:
- Pedidos pendientes de entrega


NO se agregó backend nuevo.


============================================================
COMPONENTES ANT DESIGN UTILIZADOS
============================================================

- Alert
- Avatar
- Button
- Card
- Col
- Grid
- Row
- Skeleton
- Space
- Statistic
- Tag
- Typography
- theme.useToken
- Icons


============================================================
NUEVO COMPONENTE: PageHeader
============================================================

Desde ahora las páginas migradas deben reutilizar:

<PageHeader
  title="..."
  description="..."
  extra={...}
/>

Esto estandarizará:
- títulos
- subtítulos
- posición de acciones
- responsive


============================================================
NUEVO COMPONENTE: MetricCard
============================================================

Los indicadores usarán:

<MetricCard />

Basado en:
- Card
- Statistic
- Avatar
- tokens Ant Design

Tonos disponibles:
- primary
- success
- warning
- error


============================================================
ACCESOS RAPIDOS
============================================================

Dashboard incluye:

- Registrar pedido
- Registrar producción
- Registrar lote de materia prima
- Ver entregas

Todos usan rutas reales existentes.


============================================================
SESION
============================================================

El bloque "Tu sesión" conserva:
- nombre
- correo
- roles

pero ahora usa:
- Avatar
- Typography
- Tags


============================================================
LIGHT / DARK
============================================================

No hay colores de fondo fijos para las Cards.

Los acentos utilizan:
theme.useToken()

Por eso Dashboard funciona automáticamente con:
- Light
- Dark


============================================================
RESPONSIVE
============================================================

Desktop:
4 indicadores por fila.

Tablet:
2 indicadores por fila.

Mobile:
1 indicador por fila.

Accesos rápidos:
2 columnas en tablet/desktop
1 columna móvil.


============================================================
RESILIENCIA
============================================================

Los indicadores se cargan usando Promise.allSettled.

Si una API falla:
- los demás indicadores continúan visibles;
- aparece Alert de advertencia;
- no se destruye todo el Dashboard.

Botón:
Actualizar

permite recargar los indicadores.


============================================================
PRUEBAS
============================================================

1. npm run build

2. npm run dev

3. /gestion

Validar:
- indicadores
- botón Actualizar
- accesos rápidos
- datos del usuario
- light
- dark

4. Mobile:
375px
390px
430px


============================================================
SIGUIENTE ETAPA
============================================================

Después de aprobar Inicio:

ETAPA 04 según Sidebar:
USUARIOS (solo ADMIN)

Migraremos:
- listado
- formulario
- roles
- estados
- feedback
- modal/dialog
- tabla
- responsive

Todo con Ant Design.
