GESTIONDRIZA - FRONTEND ALMACEN DE MATERIA PRIMA

Archivos nuevos:
- src/pages/almacenMateriaPrima/AlmacenMateriaPrima.tsx
- src/pages/almacenMateriaPrima/AlmacenMateriaPrimaLoteDetalle.tsx
- src/styles/almacenMateriaPrima.css

Archivos a reemplazar:
- src/App.tsx
- src/components/Sidebar.tsx

Rutas:
- /gestion/almacen/materia-prima
- /gestion/almacen/materia-prima/lotes/:stock_materia_prima_lote_id

Pantalla principal:
1. Indicadores
2. Vista Resumen general
   - agrupada por Material + Color
3. Vista Por lotes
   - ordenada según FIFO (más antiguo primero)
4. Filtros y paginación desde backend

Detalle:
- información del lote
- saldo inicial
- consumido
- disponible
- porcentaje disponible
- historial paginado de movimientos
- filtro por tipo de movimiento

Después de copiar:
npm run build

Luego:
npm run dev
