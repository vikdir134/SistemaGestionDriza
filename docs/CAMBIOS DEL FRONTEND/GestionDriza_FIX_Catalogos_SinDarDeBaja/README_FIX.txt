GESTIONDRIZA - CATALOGOS SIN DAR DE BAJA

DECISIÓN

Se elimina de la interfaz la opción:

Dar de baja

Motivo:
la pantalla histórica de Catálogos no exponía esta operación
y se desea conservar ese alcance funcional.


SE MANTIENE

- Listar
- Buscar
- Crear
- Editar
- Actualizar
- Tabs Ant Design
- Table Ant Design
- Light / Dark
- Responsive


BACKEND

No se modifica.

El endpoint DELETE existente permanece disponible internamente,
pero esta pantalla no lo utiliza.


REEMPLAZAR

src/pages/Catalogos.tsx
