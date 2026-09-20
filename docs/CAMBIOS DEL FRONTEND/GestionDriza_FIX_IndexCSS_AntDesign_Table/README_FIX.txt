GESTIONDRIZA - FIX GLOBAL TABLE / ANT DESIGN

PROBLEMA

src/index.css tenía:

table {
  background: white;
}

Ese selector afectaba también al <table> interno de
Ant Design Table.

Resultado:
- modo oscuro correcto en header;
- cuerpo central blanco;
- columna fija Acciones oscura.


SOLUCIÓN

Los estilos antiguos de tabla ahora se limitan a:

.tabla-card
.tabla-moderna

Por lo tanto:
- páginas antiguas siguen funcionando;
- Ant Design Table queda controlado por themeConfig;
- Light/Dark funcionan correctamente.


REEMPLAZAR

src/index.css


IMPORTANTE

No se elimina todavía todo el CSS legacy porque todavía
quedan páginas sin migrar.

Durante la migración iremos aislando/eliminando:
- button global
- input/select global
- label global
- textarea global
- otros estilos legacy

cuando ya no sean necesarios.
