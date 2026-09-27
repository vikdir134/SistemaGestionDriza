GESTIONDRIZA - AJUSTE UX ALMACEN DE MATERIA PRIMA

OBJETIVO
Corregir la interpretación visual de "lote".

ANTES:
Cada StockMateriaPrimaLote se mostraba como si fuera un lote.
Como una compra/lote puede contener varias materias primas,
un lote con 2 materias primas aparecía 2 veces.

AHORA:
Una fila de "Lotes" representa exactamente una
CompraMateriaPrima.

Ejemplo:
LOTE A
  - PP Blanco 1000 KG
  - PP Negro   200 KG

Vista Lotes:
LOTE A | Total 1200 KG | Consumido 0 | Disponible 1200

Al entrar:
PP Blanco | 1000 | 0 | 1000
PP Negro  |  200 | 0 |  200


ARCHIVOS A REEMPLAZAR

BACKEND:
backend/src/modules/almacenMateriaPrima/
- almacenMateriaPrima.model.js
- almacenMateriaPrima.controller.js
- almacenMateriaPrima.routes.js

FRONTEND:
frontend/src/pages/almacenMateriaPrima/
- AlmacenMateriaPrima.tsx
- AlmacenMateriaPrimaLoteDetalle.tsx

frontend/src/styles/
- almacenMateriaPrima.css


NO REQUIERE:
- migración de BD
- cambios en App.tsx
- cambios en Sidebar.tsx


CAMBIOS DE UX

Indicadores:
- Total comprado
- Stock disponible
- Consumido
- Lotes registrados

Se eliminan:
- Combinaciones
- Lotes con stock basado en filas de inventario

Resumen general:
- Material
- Color
- Total comprado
- Consumido
- Disponible

Vista Lotes:
- Una fila por lote real
- Fecha
- Proveedor
- Documento
- Total comprado
- Consumido
- Disponible
- Ver lote

Detalle:
- Cabecera del lote
- Totales
- Todas las materias primas
- Historial de movimientos colapsado por defecto


PRUEBAS

Backend:
GET /api/almacen-materia-prima/indicadores

Con los datos actuales del usuario se espera:
- lotes_registrados = 3
y NO 6.

GET /api/almacen-materia-prima/lotes?page=1&limit=10

Debe devolver 3 filas con los datos actuales.

GET /api/almacen-materia-prima/lotes/1

Debe devolver:
- cabecera del lote
- detalles[] con todas sus materias primas


Frontend:
npm run build
npm run dev
