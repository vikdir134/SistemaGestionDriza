GESTIONDRIZA - FIX FRONTEND PRODUCCION

Problema:
- El formulario mostraba "No se encontró la unidad KG en el catálogo".
- El selector Tipo quedaba vacío aunque existían productos terminados.

Causa:
El endpoint /catalogos/unidades-medida devuelve:
{
  "unidades": [
    {
      "unidad_medida_id": 1,
      "codigo": "KG",
      ...
    }
  ]
}

El frontend estaba intentando leer:
- unidadesData.items
- unidadKg.id

Corrección:
- unidadesData.unidades
- unidadKg.unidad_medida_id

También se eliminó el texto técnico:
"Elige el producto sin utilizar IDs."

Archivo a reemplazar:
src/pages/producciones/RegistrarProduccion.tsx

Después:
npm run build
npm run dev
