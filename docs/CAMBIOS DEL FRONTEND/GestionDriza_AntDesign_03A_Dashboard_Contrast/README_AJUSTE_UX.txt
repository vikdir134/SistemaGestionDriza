GESTIONDRIZA - AJUSTE UX DASHBOARD

CAMBIOS

1. Mayor contraste en modo claro.
2. Bordes de Cards más visibles.
3. Separador de encabezados más visible.
4. Quick Cards con fondo ligeramente diferenciado.
5. Hover un poco más claro.
6. Fondo general light ligeramente más marcado desde themeConfig.
7. Se eliminó el mensaje móvil:
   "Los accesos y tarjetas se adaptan automáticamente..."

REEMPLAZAR

src/pages/Dashboard.tsx
src/styles/dashboard.css
src/theme/themeConfig.ts

REGLA UX ADOPTADA

No mostrar textos que expliquen decisiones de implementación
o responsive al usuario final.

Sí mostrar explicaciones cuando:
- haya una regla de negocio;
- una acción tenga consecuencias;
- exista una restricción;
- el usuario necesite contexto para tomar una decisión.
