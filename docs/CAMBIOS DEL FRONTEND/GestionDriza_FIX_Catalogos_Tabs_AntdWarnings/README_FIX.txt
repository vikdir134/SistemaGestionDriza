GESTIONDRIZA - FIX CATALOGOS + WARNINGS ANT DESIGN

ERROR PRINCIPAL

Catalogos.tsx renderiza:

<Tabs />

pero Tabs no estaba importado desde antd.

Eso generaba:

ReferenceError: Tabs is not defined


CORRECCION

Se agregó:

Tabs

al import:

import {
  ...
  Table,
  Tabs,
  Tag,
  Typography
} from 'antd';


============================================================
WARNINGS ANT DESIGN
============================================================

También se corrigieron los warnings vistos en consola:

1. Drawer

ANTES:
width={288}

AHORA:
size={288}


2. Divider

ANTES:
type="vertical"

AHORA:
orientation="vertical"


============================================================
REEMPLAZAR
============================================================

src/pages/Catalogos.tsx
src/layouts/GestionLayout.tsx


NO CAMBIA
============================================================

- lógica de Catálogos
- rutas
- backend
- estilos
- Design System
