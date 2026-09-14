GESTIONDRIZA - BACKEND PRODUCTOS TERMINADOS Y COMPOSICION

NO REQUIERE MIGRACION DE BD.
Utiliza las tablas ya creadas:
- catalog.Producto
- catalog.ProductoComposicion
- catalog.ProductoComposicionDetalle

Mantiene /api/productos sin tocar por compatibilidad.

ARCHIVOS NUEVOS:
backend/src/modules/productosTerminados/
- productoTerminado.model.js
- productoTerminado.controller.js
- productoTerminado.routes.js

REEMPLAZAR:
backend/src/app.js


IDENTIDAD DEL PRODUCTO:
Tipo + Material + Medida + Color

La presentación NO pertenece al producto.


ENDPOINTS

GET /api/productos-terminados
Query:
- q
- tipo_producto_id
- material_id
- medida_id
- color_id
- estado_composicion = TODOS | CONFIGURADO | SIN_COMPOSICION
- page
- limit

GET /api/productos-terminados/opciones
Query opcional:
- tipo_producto_id
- material_id
- medida_id
- color_id

Este endpoint se utilizará luego en Pedidos:
Tipo -> Material -> Medida -> Color

GET /api/productos-terminados/:producto_id

POST /api/productos-terminados
Body:
{
  "tipo_producto_id": 1,
  "material_id": 1,
  "medida_id": 3,
  "color_id": 1,
  "descripcion": "Opcional"
}

GET /api/productos-terminados/:producto_id/composiciones?page=1&limit=10

POST /api/productos-terminados/:producto_id/composiciones
Body ejemplo:
{
  "observacion": "Receta inicial",
  "detalles": [
    {
      "material_id": 1,
      "color_id": 1,
      "porcentaje": 70
    },
    {
      "material_id": 1,
      "color_id": 3,
      "porcentaje": 30
    }
  ]
}


REGLAS

1. Producto:
- no permite repetir Tipo + Material + Medida + Color.

2. Composición:
- mínimo 1 componente;
- Material + Color no se puede repetir;
- porcentaje > 0 y <= 100;
- suma exacta = 100%.

3. Versionado:
- V1 se publica vigente;
- al publicar V2:
  * V1 pasa a histórico;
  * V2 queda vigente;
- todo ocurre en una sola transacción.

4. Trazabilidad:
- no se sobrescribe la composición anterior;
- ProduccionDetalle almacenará la versión exacta usada.


PRUEBAS SUGERIDAS

1. Listar productos históricos migrados:
GET /api/productos-terminados?page=1&limit=10

Con los datos actuales deberían aparecer los 6 productos creados
desde PedidoDetalle.

2. Probar cascada:
GET /api/productos-terminados/opciones

Luego, por ejemplo:
GET /api/productos-terminados/opciones?tipo_producto_id=1

3. Obtener uno:
GET /api/productos-terminados/1

4. Registrar composición de prueba para un producto.
Usar IDs reales de material/color.

Ejemplo 100% PP Blanco:
POST /api/productos-terminados/1/composiciones

{
  "observacion": "Composición inicial",
  "detalles": [
    {
      "material_id": 1,
      "color_id": 1,
      "porcentaje": 100
    }
  ]
}

5. GET /api/productos-terminados/1

Debe devolver composicion_vigente.

6. Crear una V2 y comprobar:
GET /api/productos-terminados/1/composiciones

Debe mostrar:
V2 vigente = true
V1 vigente = false
V1 fecha_vigencia_hasta != null

7. Caso inválido:
porcentajes 70 + 20 = 90.
Debe responder 400 y no modificar la V vigente.
