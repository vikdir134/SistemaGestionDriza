GESTIONDRIZA - FRONTEND PRODUCTOS TERMINADOS + COMPOSICION

ARCHIVOS NUEVOS

src/pages/productosTerminados/
- ProductosTerminadosLista.tsx
- RegistrarProductoTerminado.tsx
- ProductoTerminadoDetalle.tsx

src/styles/
- productosTerminados.css


ARCHIVOS A REEMPLAZAR

- src/App.tsx
- src/components/Sidebar.tsx


RUTAS

/gestion/productos-terminados
/gestion/productos-terminados/registrar
/gestion/productos-terminados/:producto_id


LISTADO

Muestra:
- Tipo
- Material
- Medida
- Color
- Estado de composición

Filtros:
- búsqueda
- tipo
- material
- medida
- color
- composición definida / pendiente

La paginación se realiza desde backend.


REGISTRO DE PRODUCTO

Identidad:
Tipo + Material + Medida + Color

NO se registra:
- presentación
- peso total

Después de crear el producto se navega directamente
a su detalle para definir la composición.


DETALLE

Muestra:
- identidad del producto
- composición vigente
- porcentaje de cada materia prima
- historial de versiones

Si no existe composición:
- muestra estado "Composición pendiente"
- botón "Definir composición"

Si ya existe:
- botón "Nueva versión de composición"


NUEVA COMPOSICION

Cada componente:
- Material
- Color
- Porcentaje

Validaciones frontend:
- todos los campos obligatorios
- porcentaje > 0
- porcentaje <= 100
- no repetir Material + Color
- suma exacta 100%

Antes de publicar se utiliza ConfirmDialog.

Toda escritura utiliza useBloqueoAccion.


SIDEBAR

Se agrega un enlace principal:
Productos terminados

No se coloca dentro de Almacén porque:
- este módulo configura qué productos existen y su receta;
- el futuro Almacén de producto terminado gestionará existencias,
  que es una responsabilidad diferente.


DESPUES DE COPIAR

npm run build

Luego:
npm run dev


PRUEBA MINIMA

1. Abrir:
   /gestion/productos-terminados

2. Deben aparecer los 6 productos migrados.

3. Abrir un producto sin composición.

4. Definir:
   PP BLANCO 100%

5. Confirmar publicación.

6. La pantalla debe mostrar:
   - Composición vigente
   - Versión 1
   - 100% POLIPROPILENO / BLANCO

7. Crear una nueva versión:
   PP BLANCO 70%
   PP NEGRO 30%

8. Debe mostrar:
   - V2 vigente
   - V1 histórica
