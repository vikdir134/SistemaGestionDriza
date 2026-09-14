GESTIONDRIZA - FRONTEND COMPRA DE MATERIA PRIMA

Archivos nuevos:
- src/pages/comprasMateriaPrima/ComprasMateriaPrimaLista.tsx
- src/pages/comprasMateriaPrima/RegistrarCompraMateriaPrima.tsx
- src/pages/comprasMateriaPrima/CompraMateriaPrimaDetalle.tsx
- src/styles/comprasMateriaPrima.css

Archivos a reemplazar:
- src/App.tsx
- src/components/Sidebar.tsx

Pasos:
1. Copiar los archivos respetando exactamente las rutas.
2. No eliminar src/pages/Compras.tsx: sigue siendo el módulo de compras generales.
3. Asegurarse de que el backend local tenga activo /api/compras-materia-prima.
4. Ejecutar:
   npm run build
5. Si compila, iniciar:
   npm run dev

Rutas nuevas:
- /gestion/compras-materia-prima
- /gestion/compras-materia-prima/registrar
- /gestion/compras-materia-prima/:compra_materia_prima_id

Notas de idempotencia:
- La Idempotency-Key se genera automáticamente.
- No es visible para el usuario.
- Se conserva ante errores/reintentos.
- Se renueva solo después de una respuesta de éxito.

Flujo del POST:
CompraMateriaPrima
-> CompraMateriaPrimaDetalle
-> StockMateriaPrimaLote
-> MovimientoMateriaPrima ENTRADA_COMPRA
