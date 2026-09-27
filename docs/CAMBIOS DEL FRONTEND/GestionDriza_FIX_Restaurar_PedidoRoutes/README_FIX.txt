GESTIONDRIZA - RESTAURAR pedido.routes.js

ERROR:

Cannot find module './modules/pedidos/pedido.routes'


CAUSA

El archivo:

backend/src/modules/pedidos/pedido.routes.js

no está presente en el proyecto actual.

El paquete anterior de fix de Pedidos contenía solo los
archivos modificados/agregados. Si se reemplazó la carpeta
completa "pedidos" en lugar de combinar los archivos,
pedido.routes.js pudo quedar eliminado.


SOLUCION

Copiar solamente:

backend/src/modules/pedidos/pedido.routes.js

a:

src/modules/pedidos/pedido.routes.js


NO reemplazar otra carpeta completa.


DESPUES

Verificar que src/modules/pedidos tenga al menos:

pedido.controller.js
pedido.edicion.model.js
pedido.model.js
pedido.producto.helper.js
pedido.routes.js


Luego ejecutar:

npm run dev
