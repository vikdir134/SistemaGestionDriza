GESTIONDRIZA - FIX SIDEBAR SELECCION

PROBLEMA

En:

/gestion/producciones/registrar

se seleccionaba:

Historial

en lugar de:

Registrar producción


CAUSA

La lógica evaluaba primero:

/gestion/producciones

y utilizaba startsWith(), por lo que coincidía antes
de llegar a la ruta específica.


SOLUCION

Las rutas de acciones específicas ahora tienen prioridad:

/gestion/producciones/registrar
/gestion/pedidos/registrar
/gestion/compras-materia-prima/registrar


COMPORTAMIENTO

/gestion/producciones
-> Historial

/gestion/producciones/registrar
-> Registrar producción

/gestion/producciones/:id
-> Historial


/gestion/pedidos
-> Pedidos totales

/gestion/pedidos/registrar
-> Registrar pedido

/gestion/pedidos/:id
-> Pedidos totales


/gestion/compras-materia-prima
-> Materia prima

/gestion/compras-materia-prima/registrar
-> Registrar lote


REEMPLAZAR

src/components/Sidebar.tsx
