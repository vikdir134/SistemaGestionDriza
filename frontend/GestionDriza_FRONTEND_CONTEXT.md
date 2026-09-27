# GestionDriza - Frontend Context

> Archivo generado automáticamente.
> No editar manualmente.

## Información

- Proyecto: GestionDriza
- Componente: Frontend
- Fecha de generación: 2026-09-20 14:41:06
- Branch Git: feature/inventario-produccion-completo
- Commit Git: 0428b419bf986f3b7d1ecc3f5530ea7723a67d82
- Cantidad de archivos incluidos: 99

---

# Estructura del proyecto

- eslint.config.js
- index.html
- package.json
- public\favicon.svg
- public\icons.svg
- README.md
- src\App.css
- src\App.tsx
- src\assets\react.svg
- src\assets\vite.svg
- src\components\clientes\ClienteForm.tsx
- src\components\common\ConfirmDialog.tsx
- src\components\common\FeedbackToast.tsx
- src\components\gastos\GastoForm.tsx
- src\components\pedidos\PedidoItemsEditor.tsx
- src\components\ProtectedRoute.tsx
- src\components\Sidebar.tsx
- src\components\ui\BackButton.tsx
- src\components\ui\MetricCard.tsx
- src\components\ui\PageHeader.tsx
- src\components\ui\ThemeToggle.tsx
- src\hooks\useBloqueoAccion.ts
- src\index.css
- src\layouts\GestionLayout.tsx
- src\main.tsx
- src\pages\almacenMateriaPrima\AlmacenMateriaPrima.tsx
- src\pages\almacenMateriaPrima\AlmacenMateriaPrimaLoteDetalle.tsx
- src\pages\almacenProductoTerminado\AlmacenProductoTerminado.tsx
- src\pages\almacenProductoTerminado\AlmacenProductoTerminadoDetalle.tsx
- src\pages\Catalogos.tsx
- src\pages\Clientes.tsx
- src\pages\clientes\ClientesLista.tsx
- src\pages\clientes\EditarCliente.tsx
- src\pages\clientes\HistorialPreciosCliente.tsx
- src\pages\clientes\RegistrarCliente.tsx
- src\pages\CompraDetalle.tsx
- src\pages\Compras.tsx
- src\pages\comprasMateriaPrima\CompraMateriaPrimaDetalle.tsx
- src\pages\comprasMateriaPrima\ComprasMateriaPrimaLista.tsx
- src\pages\comprasMateriaPrima\RegistrarCompraMateriaPrima.tsx
- src\pages\Dashboard.tsx
- src\pages\DepositoPedidoDetalle.tsx
- src\pages\Depositos.tsx
- src\pages\EntregaPedidoDetalle.tsx
- src\pages\Entregas.tsx
- src\pages\Gastos.tsx
- src\pages\gastos\EditarGasto.tsx
- src\pages\Login.tsx
- src\pages\mermas\MermaDetalle.tsx
- src\pages\mermas\MermasLista.tsx
- src\pages\mermas\RegistrarMerma.tsx
- src\pages\Pedidos.tsx
- src\pages\pedidos\EditarPedido.tsx
- src\pages\pedidos\PedidoDetalle.tsx
- src\pages\pedidos\PedidosLista.tsx
- src\pages\pedidos\RegistrarPedido.tsx
- src\pages\producciones\ProduccionDetalle.tsx
- src\pages\producciones\ProduccionesLista.tsx
- src\pages\producciones\RegistrarProduccion.tsx
- src\pages\Productos.tsx
- src\pages\productosTerminados\ProductosTerminadosLista.tsx
- src\pages\productosTerminados\ProductoTerminadoDetalle.tsx
- src\pages\productosTerminados\RegistrarProductoTerminado.tsx
- src\pages\Proveedores.tsx
- src\pages\usuarios\UsuariosAdmin.tsx
- src\services\api.ts
- src\styles\almacenMateriaPrima.css
- src\styles\almacenMateriaPrimaAntd.css
- src\styles\almacenProductoTerminado.css
- src\styles\almacenProductoTerminadoAntd.css
- src\styles\catalogos.css
- src\styles\clientes.css
- src\styles\comprasGeneralesAntd.css
- src\styles\comprasMateriaPrima.css
- src\styles\comprasMateriaPrimaAntd.css
- src\styles\dashboard.css
- src\styles\depositosAntd.css
- src\styles\entregasAntd.css
- src\styles\entregasStock.css
- src\styles\gastosAntd.css
- src\styles\layout.css
- src\styles\login.css
- src\styles\mermas.css
- src\styles\mermasAntd.css
- src\styles\pedidos.css
- src\styles\pedidosAntd.css
- src\styles\producciones.css
- src\styles\produccionesAntd.css
- src\styles\productosTerminados.css
- src\styles\productosTerminadosAntd.css
- src\styles\proveedoresAntd.css
- src\styles\usuarios.css
- src\theme\GestionDrizaThemeProvider.tsx
- src\theme\themeConfig.ts
- src\utils\formatters.ts
- tsconfig.app.json
- tsconfig.json
- tsconfig.node.json
- vite.config.ts

---

# Código fuente


---

## FILE: eslint.config.js

<<<START OF FILE>>>

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])


<<<END OF FILE>>>


---

## FILE: index.html

<<<START OF FILE>>>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sistema de Gestion</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>


<<<END OF FILE>>>


---

## FILE: package.json

<<<START OF FILE>>>

{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@ant-design/icons": "^6.3.4",
    "antd": "^6.6.4",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-router-dom": "^7.17.0"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.59.2",
    "vite": "^8.0.12"
  }
}


<<<END OF FILE>>>


---

## FILE: public\favicon.svg

<<<START OF FILE>>>

<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>

<<<END OF FILE>>>


---

## FILE: public\icons.svg

<<<START OF FILE>>>

<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>


<<<END OF FILE>>>


---

## FILE: README.md

<<<START OF FILE>>>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


<<<END OF FILE>>>


---

## FILE: src\App.css

<<<START OF FILE>>>

.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}


<<<END OF FILE>>>


---

## FILE: src\App.tsx

<<<START OF FILE>>>



import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';

import './styles/pedidos.css';

import Login
  from './pages/Login';

import Dashboard
  from './pages/Dashboard';

import Catalogos
  from './pages/Catalogos';

import ProductosTerminadosLista
  from './pages/productosTerminados/ProductosTerminadosLista';

import RegistrarProductoTerminado
  from './pages/productosTerminados/RegistrarProductoTerminado';

import ProductoTerminadoDetalle
  from './pages/productosTerminados/ProductoTerminadoDetalle';

import ProduccionesLista
  from './pages/producciones/ProduccionesLista';

import RegistrarProduccion
  from './pages/producciones/RegistrarProduccion';

import ProduccionDetalle
  from './pages/producciones/ProduccionDetalle';

import PedidosLista
  from './pages/pedidos/PedidosLista';

import RegistrarPedido
  from './pages/pedidos/RegistrarPedido';

import PedidoDetalle
  from './pages/pedidos/PedidoDetalle';

import EditarPedido
  from './pages/pedidos/EditarPedido';

import Entregas
  from './pages/Entregas';

import EntregaPedidoDetalle
  from './pages/EntregaPedidoDetalle';

import Depositos
  from './pages/Depositos';

import DepositoPedidoDetalle
  from './pages/DepositoPedidoDetalle';

import Proveedores
  from './pages/Proveedores';

import Compras
  from './pages/Compras';

import CompraDetalle
  from './pages/CompraDetalle';

import ComprasMateriaPrimaLista
  from './pages/comprasMateriaPrima/ComprasMateriaPrimaLista';

import RegistrarCompraMateriaPrima
  from './pages/comprasMateriaPrima/RegistrarCompraMateriaPrima';

import CompraMateriaPrimaDetalle
  from './pages/comprasMateriaPrima/CompraMateriaPrimaDetalle';

import AlmacenMateriaPrima
  from './pages/almacenMateriaPrima/AlmacenMateriaPrima';

import AlmacenMateriaPrimaLoteDetalle
  from './pages/almacenMateriaPrima/AlmacenMateriaPrimaLoteDetalle';

import AlmacenProductoTerminado
  from './pages/almacenProductoTerminado/AlmacenProductoTerminado';

import AlmacenProductoTerminadoDetalle
  from './pages/almacenProductoTerminado/AlmacenProductoTerminadoDetalle';

import MermasLista
  from './pages/mermas/MermasLista';

import RegistrarMerma
  from './pages/mermas/RegistrarMerma';

import MermaDetalle
  from './pages/mermas/MermaDetalle';

import Gastos
  from './pages/Gastos';

import EditarGasto
  from './pages/gastos/EditarGasto';

import ClientesLista
  from './pages/clientes/ClientesLista';

import RegistrarCliente
  from './pages/clientes/RegistrarCliente';

import EditarCliente
  from './pages/clientes/EditarCliente';

import HistorialPreciosCliente
  from './pages/clientes/HistorialPreciosCliente';

import UsuariosAdmin
  from './pages/usuarios/UsuariosAdmin';

import ProtectedRoute
  from './components/ProtectedRoute';

import GestionLayout
  from './layouts/GestionLayout';


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        <Route
          path="/login"
          element={
            <Login />
          }
        />


        <Route
          path="/gestion"
          element={
            <ProtectedRoute>
              <GestionLayout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={
              <Dashboard />
            }
          />


          <Route
            path="usuarios"
            element={
              <ProtectedRoute
                rolesPermitidos={[
                  'ADMIN'
                ]}
              >
                <UsuariosAdmin />
              </ProtectedRoute>
            }
          />


          <Route
            path="catalogos"
            element={
              <Catalogos />
            }
          />


          {/* =========================
              PRODUCTOS TERMINADOS
              ========================= */}

          <Route
            path="productos-terminados"
            element={
              <ProductosTerminadosLista />
            }
          />

          <Route
            path="productos-terminados/registrar"
            element={
              <RegistrarProductoTerminado />
            }
          />

          <Route
            path="productos-terminados/:producto_id"
            element={
              <ProductoTerminadoDetalle />
            }
          />


          {/* =========================
              PRODUCCION
              ========================= */}

          <Route
            path="producciones"
            element={
              <ProduccionesLista />
            }
          />

          <Route
            path="producciones/registrar"
            element={
              <RegistrarProduccion />
            }
          />

          <Route
            path="producciones/:produccion_id"
            element={
              <ProduccionDetalle />
            }
          />


          {/* =========================
              PEDIDOS
              ========================= */}

          <Route
            path="pedidos"
            element={
              <PedidosLista />
            }
          />

          <Route
            path="pedidos/registrar"
            element={
              <RegistrarPedido />
            }
          />

          <Route
            path="pedidos/:pedido_id"
            element={
              <PedidoDetalle />
            }
          />

          <Route
            path="pedidos/:pedido_id/editar"
            element={
              <EditarPedido />
            }
          />


          {/* =========================
              ENTREGAS
              ========================= */}

          <Route
            path="entregas"
            element={
              <Entregas />
            }
          />

          <Route
            path="entregas/:pedido_id"
            element={
              <EntregaPedidoDetalle />
            }
          />


          {/* =========================
              DEPOSITOS
              ========================= */}

          <Route
            path="depositos"
            element={
              <Depositos />
            }
          />

          <Route
            path="depositos/:pedido_id"
            element={
              <DepositoPedidoDetalle />
            }
          />


          {/* =========================
              PROVEEDORES
              ========================= */}

          <Route
            path="proveedores"
            element={
              <Proveedores />
            }
          />


          {/* =========================
              COMPRAS GENERALES
              ========================= */}

          <Route
            path="compras"
            element={
              <Compras />
            }
          />

          <Route
            path="compras/:compra_id"
            element={
              <CompraDetalle />
            }
          />


          {/* =========================
              COMPRAS MATERIA PRIMA
              ========================= */}

          <Route
            path="compras-materia-prima"
            element={
              <ComprasMateriaPrimaLista />
            }
          />

          <Route
            path="compras-materia-prima/registrar"
            element={
              <RegistrarCompraMateriaPrima />
            }
          />

          <Route
            path="compras-materia-prima/:compra_materia_prima_id"
            element={
              <CompraMateriaPrimaDetalle />
            }
          />


          {/* =========================
              ALMACEN MATERIA PRIMA
              ========================= */}

          <Route
            path="almacen/materia-prima"
            element={
              <AlmacenMateriaPrima />
            }
          />

          <Route
            path="almacen/materia-prima/lotes/:stock_materia_prima_lote_id"
            element={
              <AlmacenMateriaPrimaLoteDetalle />
            }
          />


          {/* =========================
              ALMACEN PRODUCTO TERMINADO
              ========================= */}

          <Route
            path="almacen/producto-terminado"
            element={
              <AlmacenProductoTerminado />
            }
          />

          <Route
            path="almacen/producto-terminado/presentaciones/:stock_producto_terminado_id"
            element={
              <AlmacenProductoTerminadoDetalle />
            }
          />


          {/* =========================
              MERMAS
              ========================= */}

          <Route
            path="mermas"
            element={
              <MermasLista />
            }
          />

          <Route
            path="mermas/registrar"
            element={
              <RegistrarMerma />
            }
          />

          <Route
            path="mermas/:merma_id"
            element={
              <MermaDetalle />
            }
          />


          {/* =========================
              GASTOS
              ========================= */}

          <Route
            path="gastos"
            element={
              <Gastos />
            }
          />

          <Route
            path="gastos/:gasto_id/editar"
            element={
              <EditarGasto />
            }
          />


          {/* =========================
              CLIENTES
              ========================= */}

          <Route
            path="clientes"
            element={
              <ClientesLista />
            }
          />

          <Route
            path="clientes/registrar"
            element={
              <RegistrarCliente />
            }
          />

          <Route
            path="clientes/precios"
            element={
              <HistorialPreciosCliente />
            }
          />

          <Route
            path="clientes/:cliente_id/editar"
            element={
              <EditarCliente />
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}


export default App;




<<<END OF FILE>>>


---

## FILE: src\assets\react.svg

<<<START OF FILE>>>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>

<<<END OF FILE>>>


---

## FILE: src\assets\vite.svg

<<<START OF FILE>>>

<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>


<<<END OF FILE>>>


---

## FILE: src\components\clientes\ClienteForm.tsx

<<<START OF FILE>>>

import {
  Col,
  Form,
  Input,
  Row
} from 'antd';

import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  ShopOutlined,
  SolutionOutlined,
  NumberOutlined
} from '@ant-design/icons';


export type ClienteFormData = {
  ruc: string;
  razon_social: string;
  direccion: string;
  telefono: string;
  correo: string;
  agencia_entrega: string;
};


type Props = {
  disabled?: boolean;
};


function ClienteForm({
  disabled = false
}: Props) {
  return (
    <Row
      gutter={[
        16,
        0
      ]}
    >

      <Col
        xs={24}
        md={8}
      >

        <Form.Item
          label="RUC"
          name="ruc"
          extra="Debe contener exactamente 11 dígitos."
          normalize={
            (value) =>
              typeof value === 'string'
                ? value.replace(
                    /\D/g,
                    ''
                  )
                : value
          }
          rules={[
            {
              required: true,
              message:
                'Ingresa el RUC'
            },
            {
              pattern:
                /^\d{11}$/,
              message:
                'El RUC debe tener 11 dígitos numéricos'
            }
          ]}
        >
          <Input
            size="large"
            prefix={
              <NumberOutlined />
            }
            placeholder="20123456789"
            maxLength={11}
            inputMode="numeric"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>


      <Col
        xs={24}
        md={16}
      >

        <Form.Item
          label="Razón social"
          name="razon_social"
          rules={[
            {
              required: true,
              message:
                'Ingresa la razón social'
            },
            {
              whitespace: true,
              message:
                'Ingresa una razón social válida'
            }
          ]}
        >
          <Input
            size="large"
            prefix={
              <SolutionOutlined />
            }
            placeholder="Razón social del cliente"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>


      <Col
        xs={24}
        md={12}
      >

        <Form.Item
          label="Dirección"
          name="direccion"
        >
          <Input
            size="large"
            prefix={
              <EnvironmentOutlined />
            }
            placeholder="Dirección fiscal o comercial"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>


      <Col
        xs={24}
        md={12}
      >

        <Form.Item
          label="Agencia de entrega"
          name="agencia_entrega"
        >
          <Input
            size="large"
            prefix={
              <ShopOutlined />
            }
            placeholder="Ejemplo: Shalom, Marvisur, Olva"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>


      <Col
        xs={24}
        md={12}
      >

        <Form.Item
          label="Teléfono"
          name="telefono"
        >
          <Input
            size="large"
            prefix={
              <PhoneOutlined />
            }
            placeholder="Teléfono de contacto"
            inputMode="tel"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>


      <Col
        xs={24}
        md={12}
      >

        <Form.Item
          label="Correo"
          name="correo"
          rules={[
            {
              type: 'email',
              message:
                'Ingresa un correo válido'
            }
          ]}
        >
          <Input
            size="large"
            prefix={
              <MailOutlined />
            }
            placeholder="cliente@empresa.com"
            inputMode="email"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>

    </Row>
  );
}


export default ClienteForm;


<<<END OF FILE>>>


---

## FILE: src\components\common\ConfirmDialog.tsx

<<<START OF FILE>>>

type ConfirmDialogProps = {
  abierto: boolean;
  titulo: string;
  descripcion: string;
  textoConfirmar?: string;
  textoProcesando?: string;
  procesando?: boolean;
  onConfirmar: () => void;
  onCerrar: () => void;
};

function ConfirmDialog({
  abierto,
  titulo,
  descripcion,
  textoConfirmar = 'Confirmar',
  textoProcesando = 'Procesando...',
  procesando = false,
  onConfirmar,
  onCerrar
}: ConfirmDialogProps) {
  if (!abierto) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-card">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>

        <div className="dialog-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCerrar}
            disabled={procesando}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirmar}
            disabled={procesando}
          >
            {procesando
              ? textoProcesando
              : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;

<<<END OF FILE>>>


---

## FILE: src\components\common\FeedbackToast.tsx

<<<START OF FILE>>>

import { useEffect } from 'react';

type FeedbackTipo = 'success' | 'error' | 'info' | 'warning';

type FeedbackToastProps = {
  tipo: FeedbackTipo;
  mensaje: string;
  onClose: () => void;
  duracion?: number;
};

function FeedbackToast({
  tipo,
  mensaje,
  onClose,
  duracion = 3500
}: FeedbackToastProps) {
  useEffect(() => {
    if (!mensaje) return;

    const timer = setTimeout(() => {
      onClose();
    }, duracion);

    return () => clearTimeout(timer);
  }, [mensaje, duracion, onClose]);

  if (!mensaje) return null;

  return (
    <div className={`feedback-toast feedback-${tipo}`}>
      <div>
        <strong>
          {tipo === 'success' && 'Correcto'}
          {tipo === 'error' && 'Error'}
          {tipo === 'info' && 'Información'}
          {tipo === 'warning' && 'Advertencia'}
        </strong>
        <p>{mensaje}</p>
      </div>

      <button type="button" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default FeedbackToast;

<<<END OF FILE>>>


---

## FILE: src\components\gastos\GastoForm.tsx

<<<START OF FILE>>>

import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select
} from 'antd';

import {
  SaveOutlined
} from '@ant-design/icons';

import dayjs from 'dayjs';

import '../../styles/gastosAntd.css';


const {
  TextArea
} = Input;


export type GastoFormData = {
  tipo_gasto_id: string;
  proveedor_id: string;
  fecha_gasto: string;
  monto: string;
  moneda_codigo: string;
  descripcion: string;
  comprobante: string;
};


export const gastoFormVacio:
  GastoFormData = {
  tipo_gasto_id: '',
  proveedor_id: '',
  fecha_gasto: '',
  monto: '',
  moneda_codigo: 'PEN',
  descripcion: '',
  comprobante: ''
};


export const validarGastoForm = (
  form: GastoFormData,
  exigirFecha = false
) => {
  if (
    !form.tipo_gasto_id
  ) {
    return (
      'Debe seleccionar un tipo de gasto'
    );
  }


  const monto =
    Number(
      form.monto
    );


  if (
    !Number.isFinite(
      monto
    ) ||
    monto <= 0
  ) {
    return (
      'El monto debe ser mayor a 0'
    );
  }


  if (
    ![
      'PEN',
      'USD'
    ].includes(
      form.moneda_codigo
    )
  ) {
    return (
      'Debe seleccionar una moneda válida'
    );
  }


  if (
    exigirFecha &&
    !form.fecha_gasto
  ) {
    return (
      'La fecha del gasto es obligatoria'
    );
  }


  if (
    form.descripcion
      .trim()
      .length > 400
  ) {
    return (
      'La descripción no puede superar 400 caracteres'
    );
  }


  if (
    form.comprobante
      .trim()
      .length > 100
  ) {
    return (
      'El comprobante no puede superar 100 caracteres'
    );
  }


  return null;
};


type Props = {
  titulo: string;
  form: GastoFormData;
  tiposGasto: any[];
  proveedores: any[];

  procesando?: boolean;

  textoBoton: string;

  exigirFecha?: boolean;

  onChange: (
    campo:
      keyof GastoFormData,
    valor: string
  ) => void;

  onSubmit: () => void;
};


function GastoForm({
  titulo,
  form,
  tiposGasto,
  proveedores,
  procesando = false,
  textoBoton,
  exigirFecha = false,
  onChange,
  onSubmit
}: Props) {
  return (
    <Card
      title={titulo}
      className="gd-gasto-form-card"
    >

      <Form
        layout="vertical"
        requiredMark={false}
        disabled={
          procesando
        }
      >

        <Row
          gutter={[
            16,
            0
          ]}
        >

          <Col
            xs={24}
            md={12}
          >
            <Form.Item
              label="Tipo de gasto"
              required
            >
              <Select
                size="large"
                value={
                  form
                    .tipo_gasto_id ||
                  undefined
                }
                showSearch
                optionFilterProp="label"
                placeholder="Selecciona un tipo"
                options={
                  tiposGasto.map(
                    (tipo) => ({
                      value:
                        String(
                          tipo
                            .tipo_gasto_id
                        ),

                      label:
                        tipo.nombre
                    })
                  )
                }
                onChange={(
                  value
                ) =>
                  onChange(
                    'tipo_gasto_id',
                    value
                  )
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            md={12}
          >
            <Form.Item
              label="Proveedor"
              extra="Opcional."
            >
              <Select
                size="large"
                allowClear
                value={
                  form.proveedor_id ||
                  undefined
                }
                showSearch
                optionFilterProp="label"
                placeholder="Sin proveedor"
                options={
                  proveedores.map(
                    (proveedor) => ({
                      value:
                        String(
                          proveedor
                            .proveedor_id
                        ),

                      label:
                        `${proveedor.razon_social} · ${proveedor.ruc}`
                    })
                  )
                }
                onChange={(
                  value
                ) =>
                  onChange(
                    'proveedor_id',
                    value || ''
                  )
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
          >
            <Form.Item
              label="Fecha de gasto"
              required={
                exigirFecha
              }
              extra={
                exigirFecha
                  ? undefined
                  : 'Si se deja vacía, se registra con la fecha actual.'
              }
            >
              <DatePicker
                size="large"
                value={
                  form.fecha_gasto
                    ? dayjs(
                        form
                          .fecha_gasto
                      )
                    : null
                }
                format="YYYY-MM-DD"
                className="gd-full-width"
                placeholder={
                  exigirFecha
                    ? 'Selecciona la fecha'
                    : 'Fecha actual'
                }
                onChange={(
                  value
                ) =>
                  onChange(
                    'fecha_gasto',
                    value
                      ? value.format(
                          'YYYY-MM-DD'
                        )
                      : ''
                  )
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
          >
            <Form.Item
              label="Moneda"
              required
            >
              <Select
                size="large"
                value={
                  form
                    .moneda_codigo
                }
                options={[
                  {
                    value:
                      'PEN',
                    label:
                      'Soles (PEN)'
                  },
                  {
                    value:
                      'USD',
                    label:
                      'Dólares (USD)'
                  }
                ]}
                onChange={(
                  value
                ) =>
                  onChange(
                    'moneda_codigo',
                    value
                  )
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
          >
            <Form.Item
              label="Monto"
              required
            >
              <InputNumber
                size="large"
                value={
                  form.monto
                    ? Number(
                        form.monto
                      )
                    : null
                }
                min={0.01}
                precision={2}
                step={0.01}
                addonAfter={
                  form
                    .moneda_codigo
                }
                className="gd-full-width"
                placeholder="0.00"
                onChange={(
                  value
                ) =>
                  onChange(
                    'monto',
                    value === null
                      ? ''
                      : String(
                          value
                        )
                  )
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
          >
            <Form.Item
              label="Comprobante"
            >
              <Input
                size="large"
                value={
                  form.comprobante
                }
                maxLength={100}
                placeholder="Ejemplo: F001-000123"
                onChange={(e) =>
                  onChange(
                    'comprobante',
                    e.target.value
                  )
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
          >
            <Form.Item
              label="Descripción"
            >
              <TextArea
                rows={3}
                maxLength={400}
                showCount
                value={
                  form.descripcion
                }
                placeholder="Ejemplo: Pago de luz del local"
                onChange={(e) =>
                  onChange(
                    'descripcion',
                    e.target.value
                  )
                }
              />
            </Form.Item>
          </Col>

        </Row>


        <div className="gd-gasto-form-actions">

          <Button
            type="primary"
            icon={
              <SaveOutlined />
            }
            loading={
              procesando
            }
            onClick={
              onSubmit
            }
          >
            {textoBoton}
          </Button>

        </div>

      </Form>

    </Card>
  );
}


export default GastoForm;


<<<END OF FILE>>>


---

## FILE: src\components\pedidos\PedidoItemsEditor.tsx

<<<START OF FILE>>>

import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';

import {
  formatCantidad,
  formatMonto
} from '../../utils/formatters';

import '../../styles/pedidosAntd.css';


const {
  Text
} = Typography;


export type DetallePedidoForm = {
  pedido_detalle_id?: number;

  cantidad_entregada?: number;
  cantidad_pendiente?: number;
  estado_entrega?: string;
  unidad?: string;

  tipo_producto_id: string;
  medida_id: string;
  color_id: string;
  material_id: string;

  cantidad_pedida: string;
  unidad_medida_id: string;

  cantidad_presentacion: string;
  unidad_presentacion_id: string;

  precio_unitario: string;
  moneda_codigo: string;

  descripcion_item: string;
  observacion: string;
};


export const detallePedidoVacio:
  DetallePedidoForm = {
  tipo_producto_id: '',
  medida_id: '',
  color_id: '',
  material_id: '',

  cantidad_pedida: '',
  unidad_medida_id: '',

  cantidad_presentacion: '',
  unidad_presentacion_id: '',

  precio_unitario: '',
  moneda_codigo: 'PEN',

  descripcion_item: '',
  observacion: ''
};


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Props = {
  detalles:
    DetallePedidoForm[];

  setDetalles: (
    detalles:
      DetallePedidoForm[]
  ) => void;

  tipos: any[];
  medidas: any[];
  colores: any[];
  materiales: any[];
  unidades: any[];

  titulo?: string;
  textoBotonAgregar?: string;

  permitirAgregar?: boolean;
  permitirQuitar?: boolean;

  bloquearEstructuraConEntrega?: boolean;
  procesando?: boolean;
  mostrarResumenEntrega?: boolean;

  onFeedback?: (
    tipo: FeedbackTipo,
    mensaje: string
  ) => void;
};


const estadoEntregaTag = (
  estado: string
) => {
  if (
    estado === 'COMPLETO'
  ) {
    return (
      <Tag color="success">
        Completo
      </Tag>
    );
  }

  if (
    estado === 'PARCIAL'
  ) {
    return (
      <Tag color="warning">
        Parcial
      </Tag>
    );
  }

  return (
    <Tag color="default">
      Pendiente
    </Tag>
  );
};


function PedidoItemsEditor({
  detalles,
  setDetalles,

  tipos,
  medidas,
  colores,
  materiales,
  unidades,

  titulo =
    'Productos del pedido',

  textoBotonAgregar =
    'Agregar producto',

  permitirAgregar = true,
  permitirQuitar = true,

  bloquearEstructuraConEntrega =
    false,

  procesando = false,

  mostrarResumenEntrega =
    false,

  onFeedback
}: Props) {

  const actualizar = (
    index: number,
    cambios:
      Partial<
        DetallePedidoForm
      >
  ) => {
    if (procesando) {
      return;
    }

    setDetalles(
      detalles.map(
        (
          detalle,
          i
        ) =>
          i === index
            ? {
                ...detalle,
                ...cambios
              }
            : detalle
      )
    );
  };


  const actualizarUnidad = (
    index: number,
    value:
      string | undefined
  ) => {
    const unidad =
      value || '';

    actualizar(
      index,
      {
        unidad_medida_id:
          unidad,

        unidad_presentacion_id:
          unidad
      }
    );
  };


  const agregarDetalle = () => {
    if (
      procesando ||
      !permitirAgregar
    ) {
      return;
    }

    setDetalles([
      ...detalles,
      {
        ...detallePedidoVacio
      }
    ]);

    onFeedback?.(
      'success',
      'Producto agregado al pedido'
    );
  };


  const quitarDetalle = (
    index: number
  ) => {
    if (
      procesando ||
      !permitirQuitar
    ) {
      return;
    }

    if (
      detalles.length === 1
    ) {
      onFeedback?.(
        'warning',
        'Debe existir al menos un producto en el pedido'
      );

      return;
    }

    setDetalles(
      detalles.filter(
        (
          _,
          i
        ) =>
          i !== index
      )
    );
  };


  return (
    <Card
      title={titulo}
      extra={
        permitirAgregar
          ? (
              <Button
                type="primary"
                ghost
                icon={
                  <PlusOutlined />
                }
                disabled={
                  procesando
                }
                onClick={
                  agregarDetalle
                }
              >
                {
                  textoBotonAgregar
                }
              </Button>
            )
          : undefined
      }
      className="gd-pedido-products-card"
    >

      <Space
        direction="vertical"
        size={16}
        className="gd-pedido-products-space"
      >

        {
          detalles.map(
            (
              detalle,
              index
            ) => {
              const cantidadEntregada =
                Number(
                  detalle
                    .cantidad_entregada ||
                  0
                );

              const cantidadPedida =
                Number(
                  detalle
                    .cantidad_pedida ||
                  0
                );

              const cantidadPendiente =
                Math.max(
                  0,
                  cantidadPedida -
                  cantidadEntregada
                );

              let estadoActual =
                'PENDIENTE';

              if (
                cantidadEntregada > 0 &&
                cantidadPedida > 0 &&
                cantidadEntregada >=
                  cantidadPedida
              ) {
                estadoActual =
                  'COMPLETO';

              } else if (
                cantidadEntregada > 0
              ) {
                estadoActual =
                  'PARCIAL';
              }

              const estructuraBloqueada =
                procesando ||
                (
                  bloquearEstructuraConEntrega &&
                  cantidadEntregada > 0
                );

              const subtotal =
                cantidadPedida *
                Number(
                  detalle
                    .precio_unitario ||
                  0
                );


              return (
                <Card
                  key={
                    detalle
                      .pedido_detalle_id ??
                    index
                  }
                  size="small"
                  title={
                    <Space
                      wrap
                      size={8}
                    >
                      <Text strong>
                        {
                          detalle
                            .pedido_detalle_id
                            ? `Producto registrado ${index + 1}`
                            : `Producto ${index + 1}`
                        }
                      </Text>

                      {
                        mostrarResumenEntrega &&
                        detalle
                          .pedido_detalle_id &&
                        estadoEntregaTag(
                          estadoActual
                        )
                      }
                    </Space>
                  }
                  extra={
                    permitirQuitar
                      ? (
                          <Button
                            type="text"
                            danger
                            icon={
                              <DeleteOutlined />
                            }
                            disabled={
                              procesando
                            }
                            onClick={() =>
                              quitarDetalle(
                                index
                              )
                            }
                          >
                            Quitar
                          </Button>
                        )
                      : undefined
                  }
                  className="gd-pedido-product-item"
                >

                  {
                    mostrarResumenEntrega &&
                    detalle
                      .pedido_detalle_id &&
                    (
                      <Row
                        gutter={[
                          12,
                          12
                        ]}
                        className="gd-pedido-delivery-summary"
                      >

                        <Col
                          xs={24}
                          sm={8}
                        >
                          <Card
                            size="small"
                          >
                            <Statistic
                              title="Pedido actual"
                              value={
                                cantidadPedida
                              }
                              precision={2}
                              suffix={
                                detalle.unidad
                              }
                            />
                          </Card>
                        </Col>


                        <Col
                          xs={24}
                          sm={8}
                        >
                          <Card
                            size="small"
                          >
                            <Statistic
                              title="Ya entregado"
                              value={
                                cantidadEntregada
                              }
                              precision={2}
                              suffix={
                                detalle.unidad
                              }
                            />
                          </Card>
                        </Col>


                        <Col
                          xs={24}
                          sm={8}
                        >
                          <Card
                            size="small"
                          >
                            <Statistic
                              title="Pendiente"
                              value={
                                cantidadPendiente
                              }
                              precision={2}
                              suffix={
                                detalle.unidad
                              }
                            />
                          </Card>
                        </Col>

                      </Row>
                    )
                  }


                  {
                    bloquearEstructuraConEntrega &&
                    cantidadEntregada > 0 &&
                    (
                      <Alert
                        type="warning"
                        showIcon
                        className="gd-pedido-inline-alert"
                        message="Este producto ya tiene entregas."
                        description={
                          `Ya se entregaron ${formatCantidad(cantidadEntregada)} ${detalle.unidad || ''}. Puedes modificar cantidad, presentación, precio, descripción y observación, pero la cantidad no puede quedar por debajo de lo entregado.`
                        }
                      />
                    )
                  }


                  <Form
                    layout="vertical"
                    requiredMark={false}
                  >

                    <Row
                      gutter={[
                        14,
                        0
                      ]}
                    >

                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Tipo"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .tipo_producto_id ||
                              undefined
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              estructuraBloqueada
                            }
                            options={
                              tipos.map(
                                (item) => ({
                                  value:
                                    String(
                                      item.id
                                    ),
                                  label:
                                    item.nombre
                                })
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  tipo_producto_id:
                                    value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Medida"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .medida_id ||
                              undefined
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              estructuraBloqueada
                            }
                            options={
                              medidas.map(
                                (item) => ({
                                  value:
                                    String(
                                      item.id
                                    ),
                                  label:
                                    item.nombre
                                })
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  medida_id:
                                    value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Color"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .color_id ||
                              undefined
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              estructuraBloqueada
                            }
                            options={
                              colores.map(
                                (item) => ({
                                  value:
                                    String(
                                      item.id
                                    ),
                                  label:
                                    item.nombre
                                })
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  color_id:
                                    value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Material"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .material_id ||
                              undefined
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              estructuraBloqueada
                            }
                            options={
                              materiales.map(
                                (item) => ({
                                  value:
                                    String(
                                      item.id
                                    ),
                                  label:
                                    item.nombre
                                })
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  material_id:
                                    value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Cantidad total"
                          required
                          extra={
                            cantidadEntregada >
                            0
                              ? `Mínimo: ${formatCantidad(cantidadEntregada)} ${detalle.unidad || ''}`
                              : undefined
                          }
                        >
                          <InputNumber
                            value={
                              detalle
                                .cantidad_pedida ===
                              ''
                                ? null
                                : Number(
                                    detalle
                                      .cantidad_pedida
                                  )
                            }
                            min={
                              cantidadEntregada >
                              0
                                ? cantidadEntregada
                                : 0.01
                            }
                            precision={2}
                            step={0.01}
                            className="gd-full-width"
                            placeholder="0.00"
                            disabled={
                              procesando
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  cantidad_pedida:
                                    value ===
                                    null
                                      ? ''
                                      : String(
                                          value
                                        )
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Unidad"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .unidad_medida_id ||
                              undefined
                            }
                            placeholder="Selecciona"
                            disabled={
                              estructuraBloqueada
                            }
                            options={
                              unidades.map(
                                (item) => ({
                                  value:
                                    String(
                                      item
                                        .unidad_medida_id
                                    ),
                                  label:
                                    item.codigo
                                })
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizarUnidad(
                                index,
                                value
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Presentación"
                        >
                          <InputNumber
                            value={
                              detalle
                                .cantidad_presentacion ===
                              ''
                                ? null
                                : Number(
                                    detalle
                                      .cantidad_presentacion
                                  )
                            }
                            min={0.01}
                            precision={2}
                            step={0.01}
                            className="gd-full-width"
                            placeholder="0.00"
                            disabled={
                              procesando
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  cantidad_presentacion:
                                    value ===
                                    null
                                      ? ''
                                      : String(
                                          value
                                        )
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Unidad presentación"
                        >
                          <Select
                            value={
                              detalle
                                .unidad_presentacion_id ||
                              undefined
                            }
                            placeholder="Igual a unidad"
                            disabled
                            options={
                              unidades.map(
                                (item) => ({
                                  value:
                                    String(
                                      item
                                        .unidad_medida_id
                                    ),
                                  label:
                                    item.codigo
                                })
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Precio unitario"
                          required
                        >
                          <InputNumber
                            value={
                              detalle
                                .precio_unitario ===
                              ''
                                ? null
                                : Number(
                                    detalle
                                      .precio_unitario
                                  )
                            }
                            min={0.01}
                            precision={2}
                            step={0.01}
                            className="gd-full-width"
                            placeholder="0.00"
                            disabled={
                              procesando
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  precio_unitario:
                                    value ===
                                    null
                                      ? ''
                                      : String(
                                          value
                                        )
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Moneda"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .moneda_codigo
                            }
                            disabled={
                              estructuraBloqueada
                            }
                            options={[
                              {
                                value:
                                  'PEN',
                                label:
                                  'Soles (PEN)'
                              },
                              {
                                value:
                                  'USD',
                                label:
                                  'Dólares (USD)'
                              }
                            ]}
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  moneda_codigo:
                                    value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Subtotal"
                        >
                          <Input
                            value={
                              formatMonto(
                                subtotal
                              )
                            }
                            suffix={
                              detalle
                                .moneda_codigo
                            }
                            disabled
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        lg={12}
                      >
                        <Form.Item
                          label="Descripción del producto"
                        >
                          <Input
                            value={
                              detalle
                                .descripcion_item
                            }
                            maxLength={300}
                            disabled={
                              procesando
                            }
                            placeholder="Opcional"
                            onChange={(e) =>
                              actualizar(
                                index,
                                {
                                  descripcion_item:
                                    e.target
                                      .value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        lg={12}
                      >
                        <Form.Item
                          label="Observación"
                        >
                          <Input
                            value={
                              detalle
                                .observacion
                            }
                            maxLength={300}
                            disabled={
                              procesando
                            }
                            placeholder="Opcional"
                            onChange={(e) =>
                              actualizar(
                                index,
                                {
                                  observacion:
                                    e.target
                                      .value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>

                    </Row>

                  </Form>

                </Card>
              );
            }
          )
        }

      </Space>

    </Card>
  );
}


export default PedidoItemsEditor;


<<<END OF FILE>>>


---

## FILE: src\components\ProtectedRoute.tsx

<<<START OF FILE>>>

import { Navigate } from 'react-router-dom';
import { getToken, getUsuario } from '../services/api';

interface Props {
  children: React.ReactNode;
  rolesPermitidos?: string[];
}

function ProtectedRoute({ children, rolesPermitidos }: Props) {
  const token = getToken();
  const usuario = getUsuario();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const rolesUsuario = usuario?.roles || [];

    const tienePermiso = rolesUsuario.some((rol: string) =>
      rolesPermitidos.includes(rol)
    );

    if (!tienePermiso) {
      return <Navigate to="/gestion" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;

<<<END OF FILE>>>


---

## FILE: src\components\Sidebar.tsx

<<<START OF FILE>>>

import type {
  MenuProps
} from 'antd';

import {
  Menu
} from 'antd';

import {
  BankOutlined,
  BarsOutlined,
  BookOutlined,
  BuildOutlined,
  DatabaseOutlined,
  DollarOutlined,
  HomeOutlined,
  InboxOutlined,
  PlusOutlined,
  ProductOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  ToolOutlined,
  TruckOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useState
} from 'react';

import {
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  getUsuario
} from '../services/api';


type MenuItem =
  Required<
    MenuProps
  >['items'][number];


const obtenerSelectedKey = (
  pathname: string
) => {
  /*
   * Primero resolvemos rutas exactas que tienen
   * su propio elemento en un submenú.
   *
   * Esto evita el problema histórico donde:
   *
   * /gestion/producciones/registrar
   *
   * terminaba seleccionando:
   *
   * /gestion/producciones
   */
  const rutasExactas = [
    '/gestion/producciones/registrar',
    '/gestion/pedidos/registrar',
    '/gestion/compras-materia-prima/registrar'
  ];


  const exacta =
    rutasExactas.find(
      (ruta) =>
        pathname === ruta
    );


  if (exacta) {
    return exacta;
  }


  /*
   * Las rutas raíz se ordenan desde las más específicas.
   * Sus pantallas de detalle mantienen seleccionado
   * el módulo principal sin exponer IDs.
   */
  const rutasRaiz = [
    '/gestion/almacen/producto-terminado',
    '/gestion/almacen/materia-prima',
    '/gestion/compras-materia-prima',
    '/gestion/productos-terminados',
    '/gestion/producciones',
    '/gestion/pedidos',
    '/gestion/entregas',
    '/gestion/depositos',
    '/gestion/proveedores',
    '/gestion/compras',
    '/gestion/catalogos',
    '/gestion/clientes',
    '/gestion/mermas',
    '/gestion/gastos',
    '/gestion/usuarios'
  ];


  const coincidencia =
    rutasRaiz.find(
      (ruta) =>
        pathname === ruta ||
        pathname.startsWith(
          `${ruta}/`
        )
    );


  return coincidencia ||
    '/gestion';
};


const obtenerOpenKeys = (
  pathname: string
) => {
  const keys: string[] = [];


  if (
    pathname.startsWith(
      '/gestion/compras'
    )
  ) {
    keys.push(
      'grupo-compras'
    );
  }


  if (
    pathname.startsWith(
      '/gestion/producciones'
    )
  ) {
    keys.push(
      'grupo-produccion'
    );
  }


  if (
    pathname.startsWith(
      '/gestion/pedidos'
    )
  ) {
    keys.push(
      'grupo-pedidos'
    );
  }


  return keys;
};


const crearSeccion = (
  key: string,
  label: string
): MenuItem => ({
  key,
  label,
  disabled: true,
  className:
    'gd-sidebar-section'
} as MenuItem);


type Props = {
  collapsed?: boolean;
  onNavigate?: () => void;
};


function Sidebar({
  collapsed = false,
  onNavigate
}: Props) {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const usuario =
    getUsuario();

  const esAdmin =
    usuario?.roles?.includes(
      'ADMIN'
    );


  /*
   * Conserva los grupos que el usuario abra manualmente,
   * pero fuerza abierto el grupo de la ruta actual.
   *
   * Así, si navegamos desde un botón del Dashboard hacia
   * "Registrar producción", el submenú se abre y además
   * se pinta correctamente el elemento seleccionado.
   */
  const [
    openKeysUsuario,
    setOpenKeysUsuario
  ] = useState<string[]>(
    []
  );


  const openKeysRuta =
    obtenerOpenKeys(
      location.pathname
    );


  const openKeys =
    Array.from(
      new Set([
        ...openKeysUsuario,
        ...openKeysRuta
      ])
    );


  const items:
    MenuItem[] = [
    {
      key: '/gestion',
      icon:
        <HomeOutlined />,
      label: 'Inicio'
    },


    ...(
      collapsed
        ? []
        : [
            crearSeccion(
              'seccion-configuracion',
              'CONFIGURACIÓN'
            )
          ]
    ),


    {
      key:
        '/gestion/catalogos',
      icon:
        <BookOutlined />,
      label: 'Catálogos'
    },


    {
      key:
        '/gestion/proveedores',
      icon:
        <ShopOutlined />,
      label: 'Proveedores'
    },


    {
      key:
        '/gestion/clientes',
      icon:
        <TeamOutlined />,
      label: 'Clientes'
    },


    {
      key:
        '/gestion/productos-terminados',
      icon:
        <ProductOutlined />,
      label:
        'Productos terminados'
    },


    ...(
      collapsed
        ? []
        : [
            crearSeccion(
              'seccion-abastecimiento',
              'ABASTECIMIENTO'
            )
          ]
    ),


    {
      key:
        'grupo-compras',
      icon:
        <ShoppingCartOutlined />,
      label: 'Compras',

      children: [
        {
          key:
            '/gestion/compras-materia-prima/registrar',
          icon:
            <PlusOutlined />,
          label:
            'Registrar lote'
        },

        {
          key:
            '/gestion/compras-materia-prima',
          icon:
            <DatabaseOutlined />,
          label:
            'Lotes de materia prima'
        },

        {
          key:
            '/gestion/compras',
          icon:
            <BarsOutlined />,
          label:
            'Compras generales'
        }
      ]
    },


    {
      key:
        '/gestion/almacen/materia-prima',
      icon:
        <InboxOutlined />,
      label:
        'Almacén materia prima'
    },


    ...(
      collapsed
        ? []
        : [
            crearSeccion(
              'seccion-produccion',
              'PRODUCCIÓN'
            )
          ]
    ),


    {
      key:
        'grupo-produccion',
      icon:
        <BuildOutlined />,
      label: 'Producción',

      children: [
        {
          key:
            '/gestion/producciones/registrar',
          icon:
            <BuildOutlined />,
          label:
            'Registrar producción'
        },

        {
          key:
            '/gestion/producciones',
          icon:
            <BarsOutlined />,
          label:
            'Historial de producción'
        }
      ]
    },


    {
      key:
        '/gestion/almacen/producto-terminado',
      icon:
        <ProductOutlined />,
      label:
        'Almacén producto terminado'
    },


    ...(
      collapsed
        ? []
        : [
            crearSeccion(
              'seccion-ventas',
              'VENTAS Y COBROS'
            )
          ]
    ),


    {
      key:
        'grupo-pedidos',
      icon:
        <ShoppingCartOutlined />,
      label: 'Pedidos',

      children: [
        {
          key:
            '/gestion/pedidos/registrar',
          icon:
            <ShoppingCartOutlined />,
          label:
            'Registrar pedido'
        },

        {
          key:
            '/gestion/pedidos',
          icon:
            <BarsOutlined />,
          label:
            'Historial de pedidos'
        }
      ]
    },


    {
      key:
        '/gestion/entregas',
      icon:
        <TruckOutlined />,
      label: 'Entregas'
    },


    {
      key:
        '/gestion/depositos',
      icon:
        <BankOutlined />,
      label: 'Depósitos'
    },


    ...(
      collapsed
        ? []
        : [
            crearSeccion(
              'seccion-control',
              'CONTROL'
            )
          ]
    ),


    {
      key:
        '/gestion/mermas',
      icon:
        <ToolOutlined />,
      label: 'Mermas'
    },


    {
      key:
        '/gestion/gastos',
      icon:
        <DollarOutlined />,
      label: 'Gastos'
    },


    ...(
      esAdmin &&
      !collapsed
        ? [
            crearSeccion(
              'seccion-administracion',
              'ADMINISTRACIÓN'
            )
          ]
        : []
    ),


    ...(esAdmin
      ? [
          {
            key:
              '/gestion/usuarios',
            icon:
              <UserOutlined />,
            label: 'Usuarios'
          } as MenuItem
        ]
      : [])
  ];


  const selectedKey =
    obtenerSelectedKey(
      location.pathname
    );


  const handleClick:
    MenuProps['onClick'] = ({
      key
    }) => {
      if (
        !key.startsWith('/')
      ) {
        return;
      }


      navigate(
        key
      );


      onNavigate?.();
    };


  return (
    <Menu
      theme="dark"
      mode="inline"
      inlineCollapsed={
        collapsed
      }
      items={items}
      selectedKeys={[
        selectedKey
      ]}
      openKeys={
        openKeys
      }
      onOpenChange={(
        keys
      ) =>
        setOpenKeysUsuario(
          keys
        )
      }
      onClick={
        handleClick
      }
      className="gd-sidebar-menu"
    />
  );
}


export default Sidebar;


<<<END OF FILE>>>


---

## FILE: src\components\ui\BackButton.tsx

<<<START OF FILE>>>

import {
  ArrowLeftOutlined
} from '@ant-design/icons';

import {
  Button
} from 'antd';

import {
  useNavigate
} from 'react-router-dom';


type Props = {
  to?: string;
  label?: string;
};


function BackButton({
  to,
  label = 'Volver'
}: Props) {
  const navigate =
    useNavigate();


  return (
    <Button
      type="text"
      icon={
        <ArrowLeftOutlined />
      }
      className="gd-back-button"
      onClick={() => {
        if (to) {
          navigate(to);
          return;
        }

        navigate(-1);
      }}
    >
      {label}
    </Button>
  );
}


export default BackButton;


<<<END OF FILE>>>


---

## FILE: src\components\ui\MetricCard.tsx

<<<START OF FILE>>>

import type {
  ReactNode
} from 'react';

import {
  Avatar,
  Card,
  Statistic,
  theme
} from 'antd';


type Tone =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error';


type Props = {
  title: ReactNode;
  value: number;
  precision?: number;
  suffix?: ReactNode;
  prefix?: ReactNode;
  icon: ReactNode;
  tone?: Tone;
  loading?: boolean;
};


function MetricCard({
  title,
  value,
  precision = 0,
  suffix,
  prefix,
  icon,
  tone = 'primary',
  loading = false
}: Props) {
  const {
    token
  } = theme.useToken();


  const palette = {
    primary: {
      background:
        token.colorPrimaryBg,
      color:
        token.colorPrimary
    },

    success: {
      background:
        token.colorSuccessBg,
      color:
        token.colorSuccess
    },

    warning: {
      background:
        token.colorWarningBg,
      color:
        token.colorWarning
    },

    error: {
      background:
        token.colorErrorBg,
      color:
        token.colorError
    }
  };


  const current =
    palette[tone];


  return (
    <Card
      className="gd-metric-card"
      loading={loading}
    >

      <div className="gd-metric-card-content">

        <Avatar
          size={48}
          shape="square"
          icon={icon}
          style={{
            background:
              current.background,
            color:
              current.color
          }}
        />


        <Statistic
          title={title}
          value={value}
          precision={precision}
          suffix={suffix}
          prefix={prefix}
          className="gd-metric-statistic"
        />

      </div>

    </Card>
  );
}


export default MetricCard;


<<<END OF FILE>>>


---

## FILE: src\components\ui\PageHeader.tsx

<<<START OF FILE>>>

import type {
  ReactNode
} from 'react';

import {
  Space,
  Typography
} from 'antd';


const {
  Title,
  Text
} = Typography;


type Props = {
  title: ReactNode;
  description?: ReactNode;
  extra?: ReactNode;
};


function PageHeader({
  title,
  description,
  extra
}: Props) {
  return (
    <div className="gd-page-header">

      <div className="gd-page-header-copy">

        <Title
          level={2}
          className="gd-page-header-title"
        >
          {title}
        </Title>

        {description && (
          <Text
            type="secondary"
            className="gd-page-header-description"
          >
            {description}
          </Text>
        )}

      </div>


      {extra && (
        <Space
          wrap
          className="gd-page-header-extra"
        >
          {extra}
        </Space>
      )}

    </div>
  );
}


export default PageHeader;


<<<END OF FILE>>>


---

## FILE: src\components\ui\ThemeToggle.tsx

<<<START OF FILE>>>

import {
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';

import {
  Button,
  Tooltip
} from 'antd';

import {
  useGestionDrizaTheme
} from '../../theme/GestionDrizaThemeProvider';


type Props = {
  size?: 'small' | 'middle' | 'large';
};


function ThemeToggle({
  size = 'middle'
}: Props) {
  const {
    mode,
    toggleTheme
  } = useGestionDrizaTheme();

  const esOscuro =
    mode === 'dark';


  return (
    <Tooltip
      title={
        esOscuro
          ? 'Usar modo claro'
          : 'Usar modo nocturno'
      }
    >
      <Button
        type="text"
        shape="circle"
        size={size}
        aria-label={
          esOscuro
            ? 'Cambiar a modo claro'
            : 'Cambiar a modo nocturno'
        }
        icon={
          esOscuro
            ? <SunOutlined />
            : <MoonOutlined />
        }
        onClick={
          toggleTheme
        }
      />
    </Tooltip>
  );
}


export default ThemeToggle;


<<<END OF FILE>>>


---

## FILE: src\hooks\useBloqueoAccion.ts

<<<START OF FILE>>>

import { useRef, useState } from 'react';

export function useBloqueoAccion() {
  const bloqueoRef = useRef(false);
  const [procesando, setProcesando] = useState(false);

  const intentarBloquear = () => {
    if (bloqueoRef.current) {
      return false;
    }

    bloqueoRef.current = true;
    setProcesando(true);

    return true;
  };

  const liberar = () => {
    bloqueoRef.current = false;
    setProcesando(false);
  };

  return {
    procesando,
    intentarBloquear,
    liberar
  };
}

<<<END OF FILE>>>


---

## FILE: src\index.css

<<<START OF FILE>>>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f3f4f6;
  color: #111827;
}

a {
  text-decoration: none;
  color: inherit;
}

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #1f2937, #374151);
}

.login-card {
  width: 380px;
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.login-card h1 {
  margin: 0;
  color: #1f2937;
}

.login-card p {
  margin-top: 8px;
  margin-bottom: 24px;
  color: #6b7280;
}

label {
  display: block;
  margin-top: 12px;
  margin-bottom: 6px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

button {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background: #1d4ed8;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.gestion-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 240px;
  background: #111827;
  color: white;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  margin: 0 0 8px 0;
}

.usuario {
  color: #d1d5db;
  font-size: 14px;
  margin-bottom: 24px;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar nav a {
  padding: 10px;
  border-radius: 8px;
  color: #f9fafb;
}

.sidebar nav a:hover {
  background: #374151;
}

.btn-logout {
  margin-top: auto;
  background: #dc2626;
}

.btn-logout:hover {
  background: #b91c1c;
}

.contenido {
  flex: 1;
  padding: 32px;
}

.cards {
  display: flex;
  gap: 16px;
  margin-top: 20px;
}

.card,
.form-card,
.tabla-card {
  background: white;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.form-card {
  max-width: 650px;
  margin-bottom: 24px;
}

.form-card h3,
.tabla-card h3 {
  margin-top: 0;
}

.error {
  background: #fee2e2;
  color: #991b1b;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.success {
  background: #dcfce7;
  color: #166534;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tabs button {
  background: #6b7280;
}

.tabs .tab-active {
  background: #2563eb;
}

/*
 * LEGACY TABLES
 *
 * Estos estilos pertenecen a las pantallas antiguas.
 * Se limitan a los contenedores legacy para no interferir
 * con Table de Ant Design.
 */
.tabla-card table,
.tabla-moderna table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.tabla-card th,
.tabla-card td,
.tabla-moderna th,
.tabla-moderna td {
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  padding: 12px;
}

.tabla-card th,
.tabla-moderna th {
  background: #f9fafb;
}
textarea {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  resize: vertical;
}

.pedido-form {
  max-width: 100%;
}

.detalle-card {
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.detalle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.detalle-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn-danger {
  background: #dc2626;
}

.btn-danger:hover {
  background: #b91c1c;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  margin-bottom: 4px;
}

.page-header p {
  color: #6b7280;
  margin: 0;
}

.filtros-card {
  background: white;
  border-radius: 14px;
  padding: 18px;
  display: grid;
  grid-template-columns: 2fr 2fr auto;
  gap: 14px;
  align-items: end;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.filtros-actions {
  display: flex;
  gap: 8px;
}

.btn-secondary {
  background: #6b7280;
}

.btn-secondary:hover {
  background: #4b5563;
}

.btn-link,
.btn-volver {
  display: inline-block;
  padding: 9px 12px;
  background: #2563eb;
  color: white;
  border-radius: 8px;
  font-weight: bold;
}

.btn-link:hover,
.btn-volver:hover {
  background: #1d4ed8;
}

.btn-volver {
  margin-bottom: 16px;
}

.tabla-moderna table {
  border-spacing: 0;
}

.muted {
  color: #6b7280;
  font-size: 13px;
}

.estado {
  display: inline-block;
  padding: 7px 12px;
  border-radius: 999px;
  font-weight: bold;
  font-size: 13px;
}

.estado-completo {
  background: #dcfce7;
  color: #166534;
}

.estado-parcial {
  background: #fef3c7;
  color: #92400e;
}

.estado-pendiente {
  background: #fee2e2;
  color: #991b1b;
}

.paginado {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  padding-top: 18px;
}

.paginado button:disabled {
  background: #9ca3af;
}

.pedido-detalle-header {
  background: white;
  border-radius: 16px;
  padding: 22px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.pedido-detalle-header h1 {
  margin: 0;
}

.pedido-detalle-header p {
  margin: 6px 0 0 0;
  color: #6b7280;
}

.pedido-resumen-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}

.resumen-card,
.descripcion-card {
  background: white;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.resumen-card span {
  display: block;
  color: #6b7280;
  font-size: 13px;
  margin-bottom: 6px;
}

.descripcion-card {
  margin-bottom: 20px;
}

.descripcion-card p {
  margin-bottom: 0;
}

.detalle-completo {
  border-left: 6px solid #22c55e;
}

.detalle-parcial {
  border-left: 6px solid #f59e0b;
}

.detalle-pendiente {
  border-left: 6px solid #ef4444;
}

.producto-completo {
  background: #dcfce7;
  color: #166534;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
}

.historial-card {
  border: 1px solid #e5e7eb;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  background: #f9fafb;
}

.historial-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.total-box {
  background: #eff6ff;
  color: #1e40af;
  padding: 14px;
  border-radius: 10px;
  font-weight: bold;
  margin: 16px 0;
}
.filtros-card {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.filtros-actions {
  align-self: end;
}
.sidebar-group-button {
  background: transparent;
  color: white;
  text-align: left;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
}

.sidebar-group-button:hover {
  background: #374151;
}

.sidebar-submenu {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-left: 12px;
  margin-bottom: 8px;
}

.sidebar-submenu a {
  font-size: 14px;
  color: #dbeafe;
}

.sidebar-link {
  display: block;
  padding: 10px;
  border-radius: 8px;
  color: #f9fafb;
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease;
}

.sidebar-link:hover {
  background: #374151;
}

.sidebar-link-active {
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.28);
}

.sidebar-link-active:hover {
  background: #1d4ed8;
}

.sidebar-group-active {
  background: rgba(37, 99, 235, 0.32);
  color: #ffffff;
  font-weight: 700;
}

.sidebar-submenu .sidebar-link {
  font-size: 14px;
  color: #dbeafe;
  padding: 8px 10px;
}

.sidebar-submenu .sidebar-link-active {
  background: #2563eb;
  color: #ffffff;
}

<<<END OF FILE>>>


---

## FILE: src\layouts\GestionLayout.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Avatar,
  Breadcrumb,
  Button,
  Divider,
  Drawer,
  Dropdown,
  Grid,
  Layout,
  Space,
  Typography
} from 'antd';

import type {
  MenuProps
} from 'antd';

import {
  AppstoreOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useMemo,
  useState
} from 'react';

import {
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom';

import Sidebar
  from '../components/Sidebar';

import ThemeToggle
  from '../components/ui/ThemeToggle';

import {
  cerrarSesion,
  getUsuario
} from '../services/api';

import '../styles/layout.css';


const {
  Header,
  Sider,
  Content
} = Layout;

const {
  Text
} = Typography;


const obtenerIniciales = (
  nombre?: string
) => {
  if (!nombre) {
    return 'U';
  }

  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (parte) =>
        parte.charAt(0)
          .toUpperCase()
    )
    .join('');
};


const obtenerBreadcrumbs = (
  pathname: string
) => {
  const items = [
    {
      path: '/gestion',
      title: 'Inicio'
    }
  ];

  const mapas = [
    {
      prefix:
        '/gestion/usuarios',
      title: 'Usuarios'
    },
    {
      prefix:
        '/gestion/clientes',
      title: 'Clientes'
    },
    {
      prefix:
        '/gestion/catalogos',
      title: 'Catálogos'
    },
    {
      prefix:
        '/gestion/productos-terminados',
      title:
        'Productos terminados'
    },
    {
      prefix:
        '/gestion/producciones',
      title: 'Producción'
    },
    {
      prefix:
        '/gestion/pedidos',
      title: 'Pedidos'
    },
    {
      prefix:
        '/gestion/entregas',
      title: 'Entregas'
    },
    {
      prefix:
        '/gestion/depositos',
      title: 'Depósitos'
    },
    {
      prefix:
        '/gestion/proveedores',
      title: 'Proveedores'
    },
    {
      prefix:
        '/gestion/compras-materia-prima',
      title:
        'Compra materia prima'
    },
    {
      prefix:
        '/gestion/compras',
      title: 'Compras'
    },
    {
      prefix:
        '/gestion/almacen/materia-prima',
      title:
        'Almacén materia prima'
    },
    {
      prefix:
        '/gestion/almacen/producto-terminado',
      title:
        'Almacén producto terminado'
    },
    {
      prefix:
        '/gestion/mermas',
      title: 'Mermas'
    },
    {
      prefix:
        '/gestion/gastos',
      title: 'Gastos'
    }
  ];

  const actual =
    mapas.find(
      (item) =>
        pathname ===
          item.prefix ||
        pathname.startsWith(
          `${item.prefix}/`
        )
    );

  if (
    actual &&
    pathname !== '/gestion'
  ) {
    items.push({
      path:
        actual.prefix,
      title:
        actual.title
    });
  }

  if (
    pathname.endsWith(
      '/registrar'
    )
  ) {
    items.push({
      path: pathname,
      title: 'Registrar'
    });
  }

  if (
    pathname.endsWith(
      '/editar'
    )
  ) {
    items.push({
      path: pathname,
      title: 'Editar'
    });
  }

  return items;
};


function GestionLayout() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const screens =
    Grid.useBreakpoint();

  const {
    modal
  } = AntdApp.useApp();

  const usuario =
    getUsuario();

  const [
    collapsed,
    setCollapsed
  ] = useState(false);

  const [
    drawerOpen,
    setDrawerOpen
  ] = useState(false);


  const esMobile =
    !screens.md;


  const breadcrumbs =
    useMemo(
      () =>
        obtenerBreadcrumbs(
          location.pathname
        ),
      [
        location.pathname
      ]
    );


  const confirmarLogout = () => {
    modal.confirm({
      title:
        'Cerrar sesión',

      content:
        '¿Deseas salir de GestionDriza?',

      okText:
        'Cerrar sesión',

      cancelText:
        'Cancelar',

      okButtonProps: {
        danger: true
      },

      icon:
        <LogoutOutlined />,

      onOk: () => {
        cerrarSesion();

        navigate(
          '/login',
          {
            replace: true
          }
        );
      }
    });
  };


  const userMenu:
    MenuProps['items'] = [
      {
        key: 'usuario',
        type: 'group',
        label:
          usuario
            ?.correo ||
          'Usuario'
      },

      {
        type: 'divider'
      },

      {
        key: 'logout',
        icon:
          <LogoutOutlined />,
        label:
          'Cerrar sesión',
        danger: true,

        onClick:
          confirmarLogout
      }
    ];


  const nombreUsuario =
    usuario
      ?.nombre_completo ||
    'Usuario';

  const rolTexto =
    usuario
      ?.roles
      ?.join(', ') ||
    'Usuario';


  return (
    <Layout className="gd-app-layout">

      {!esMobile && (
        <Sider
          width={264}
          collapsedWidth={84}
          collapsed={
            collapsed
          }
          trigger={null}
          theme="dark"
          className="gd-app-sider"
        >

          <div
            className={
              collapsed
                ? 'gd-sidebar-brand gd-sidebar-brand-collapsed'
                : 'gd-sidebar-brand'
            }
          >

            <Avatar
              shape="square"
              size={42}
              className="gd-sidebar-logo"
              icon={
                <AppstoreOutlined />
              }
            />

            {!collapsed && (
              <div className="gd-sidebar-brand-text">
                <strong>
                  GestionDriza
                </strong>

                <span>
                  Sistema de gestión
                </span>
              </div>
            )}

          </div>


          <div className="gd-sidebar-scroll">

            <Sidebar
              collapsed={
                collapsed
              }
            />

          </div>

        </Sider>
      )}


      <Drawer
        placement="left"
        open={
          esMobile &&
          drawerOpen
        }
        onClose={() =>
          setDrawerOpen(
            false
          )
        }
        size={288}
        closable={false}
        styles={{
          body: {
            padding: 0
          }
        }}
        className="gd-mobile-drawer"
      >

        <div className="gd-mobile-sidebar">

          <div className="gd-mobile-sidebar-brand">

            <Avatar
              shape="square"
              size={42}
              className="gd-sidebar-logo"
              icon={
                <AppstoreOutlined />
              }
            />

            <div className="gd-sidebar-brand-text">
              <strong>
                GestionDriza
              </strong>

              <span>
                Sistema de gestión
              </span>
            </div>

          </div>


          <div className="gd-mobile-sidebar-scroll">

            <Sidebar
              onNavigate={() =>
                setDrawerOpen(
                  false
                )
              }
            />

          </div>

        </div>

      </Drawer>


      <Layout className="gd-app-main">

        <Header className="gd-app-header">

          <div className="gd-header-left">

            <Button
              type="text"
              shape="circle"
              size="large"
              aria-label={
                esMobile
                  ? 'Abrir menú'
                  : collapsed
                    ? 'Expandir menú'
                    : 'Contraer menú'
              }
              icon={
                esMobile
                  ? <MenuOutlined />
                  : collapsed
                    ? <MenuUnfoldOutlined />
                    : <MenuFoldOutlined />
              }
              onClick={() => {
                if (esMobile) {
                  setDrawerOpen(
                    true
                  );

                  return;
                }

                setCollapsed(
                  (actual) =>
                    !actual
                );
              }}
            />


            <div className="gd-header-breadcrumb">

              <Breadcrumb
                items={
                  breadcrumbs.map(
                    (item) => ({
                      title:
                        item.title
                    })
                  )
                }
              />

            </div>

          </div>


          <div className="gd-header-actions">

            <ThemeToggle
              size="large"
            />


            <Divider
              orientation="vertical"
              className="gd-header-divider"
            />


            <Dropdown
              menu={{
                items:
                  userMenu
              }}
              placement="bottomRight"
              trigger={[
                'click'
              ]}
            >

              <Button
                type="text"
                className="gd-user-button"
              >

                <Space
                  size={10}
                >

                  <Avatar
                    size={36}
                    icon={
                      !nombreUsuario
                        ? <UserOutlined />
                        : undefined
                    }
                  >
                    {
                      obtenerIniciales(
                        nombreUsuario
                      )
                    }
                  </Avatar>


                  {!esMobile && (
                    <div className="gd-user-copy">

                      <Text
                        strong
                        ellipsis
                      >
                        {
                          nombreUsuario
                        }
                      </Text>

                      <Text
                        type="secondary"
                        ellipsis
                        className="gd-user-role"
                      >
                        {
                          rolTexto
                        }
                      </Text>

                    </div>
                  )}

                </Space>

              </Button>

            </Dropdown>

          </div>

        </Header>


        <Content className="gd-app-content">

          <div className="gd-content-inner">

            <Outlet />

          </div>

        </Content>

      </Layout>

    </Layout>
  );
}


export default GestionLayout;


<<<END OF FILE>>>


---

## FILE: src\main.tsx

<<<START OF FILE>>>

import React
  from 'react';

import ReactDOM
  from 'react-dom/client';

import App
  from './App';

import GestionDrizaThemeProvider
  from './theme/GestionDrizaThemeProvider';

import './index.css';
import './styles/pedidos.css';


ReactDOM
  .createRoot(
    document.getElementById(
      'root'
    )!
  )
  .render(
    <React.StrictMode>

      <GestionDrizaThemeProvider>

        <App />

      </GestionDrizaThemeProvider>

    </React.StrictMode>
  );


<<<END OF FILE>>>


---

## FILE: src\pages\almacenMateriaPrima\AlmacenMateriaPrima.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType,
  TabsProps
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Typography
} from 'antd';

import {
  DatabaseOutlined,
  EyeOutlined,
  InboxOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatPeso
} from '../../utils/formatters';

import '../../styles/almacenMateriaPrimaAntd.css';


const {
  Text
} = Typography;


type ResumenMateriaPrima = {
  material_id: number;
  material: string;

  color_id: number;
  color: string;

  unidad_medida_id: number;
  unidad: string;

  cantidad_inicial_total: number;
  cantidad_consumida_total: number;
  cantidad_disponible_total: number;
};


type LoteMateriaPrima = {
  compra_materia_prima_id: number;
  nombre_lote: string;

  fecha_compra: string;
  numero_documento?: string | null;

  proveedor_id: number;
  proveedor_ruc: string;
  proveedor: string;

  cantidad_materias_primas: number;

  cantidad_inicial_total: number;
  cantidad_consumida_total: number;
  cantidad_disponible_total: number;

  estado_stock:
    | 'CON_STOCK'
    | 'AGOTADO';
};


type Indicadores = {
  total_comprado_kg: number;
  stock_total_kg: number;
  consumido_total_kg: number;
  lotes_registrados: number;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


type FiltrosResumen = {
  q?: string;
  material_id?: number;
  color_id?: number;
};


type FiltrosLotes = {
  q?: string;
  proveedor_id?: number;
  estado?: string;
};


const estadoLoteTag = (
  estado: string
) => {
  if (
    estado === 'CON_STOCK'
  ) {
    return (
      <Tag color="success">
        Con stock
      </Tag>
    );
  }

  return (
    <Tag color="default">
      Agotado
    </Tag>
  );
};


function AlmacenMateriaPrima() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    formResumen
  ] = Form.useForm<
    FiltrosResumen
  >();

  const [
    formLotes
  ] = Form.useForm<
    FiltrosLotes
  >();

  const [
    indicadores,
    setIndicadores
  ] = useState<Indicadores>({
    total_comprado_kg: 0,
    stock_total_kg: 0,
    consumido_total_kg: 0,
    lotes_registrados: 0
  });

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>([]);

  const [
    resumen,
    setResumen
  ] = useState<
    ResumenMateriaPrima[]
  >([]);

  const [
    lotes,
    setLotes
  ] = useState<
    LoteMateriaPrima[]
  >([]);

  const [
    cargandoBase,
    setCargandoBase
  ] = useState(true);

  const [
    cargandoResumen,
    setCargandoResumen
  ] = useState(true);

  const [
    cargandoLotes,
    setCargandoLotes
  ] = useState(true);

  const [
    pageResumen,
    setPageResumen
  ] = useState(1);

  const [
    pageLotes,
    setPageLotes
  ] = useState(1);

  const [
    filtrosResumen,
    setFiltrosResumen
  ] = useState<
    FiltrosResumen
  >({});

  const [
    filtrosLotes,
    setFiltrosLotes
  ] = useState<
    FiltrosLotes
  >({
    estado: 'TODOS'
  });

  const [
    paginacionResumen,
    setPaginacionResumen
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [
    paginacionLotes,
    setPaginacionLotes
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarBase =
    useCallback(
      async () => {
        setCargandoBase(true);

        try {
          const [
            indicadoresData,
            materialesData,
            coloresData,
            proveedoresData
          ] = await Promise.all([
            apiFetch(
              '/almacen-materia-prima/indicadores'
            ),

            apiFetch(
              '/catalogos/materiales'
            ),

            apiFetch(
              '/catalogos/colores'
            ),

            apiFetch(
              '/proveedores'
            )
          ]);


          setIndicadores(
            indicadoresData
              .indicadores ||
            {}
          );

          setMateriales(
            materialesData.items ||
            []
          );

          setColores(
            coloresData.items ||
            []
          );

          setProveedores(
            proveedoresData
              .proveedores ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos del almacén'
          );

        } finally {
          setCargandoBase(false);
        }
      },
      [
        message
      ]
    );


  const cargarResumen =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosResumen
      ) => {
        setCargandoResumen(true);

        try {
          const params =
            new URLSearchParams();

          params.set(
            'page',
            String(pagina)
          );

          params.set(
            'limit',
            '10'
          );

          if (
            filtros.q?.trim()
          ) {
            params.set(
              'q',
              filtros.q.trim()
            );
          }

          if (
            filtros.material_id
          ) {
            params.set(
              'material_id',
              String(
                filtros.material_id
              )
            );
          }

          if (
            filtros.color_id
          ) {
            params.set(
              'color_id',
              String(
                filtros.color_id
              )
            );
          }


          const data =
            await apiFetch(
              `/almacen-materia-prima/resumen?${params.toString()}`
            );


          setResumen(
            data.resumen ||
            []
          );

          setPaginacionResumen(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el resumen del almacén'
          );

        } finally {
          setCargandoResumen(false);
        }
      },
      [
        message
      ]
    );


  const cargarLotes =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosLotes
      ) => {
        setCargandoLotes(true);

        try {
          const params =
            new URLSearchParams();

          params.set(
            'page',
            String(pagina)
          );

          params.set(
            'limit',
            '10'
          );

          params.set(
            'estado',
            filtros.estado ||
            'TODOS'
          );

          if (
            filtros.q?.trim()
          ) {
            params.set(
              'q',
              filtros.q.trim()
            );
          }

          if (
            filtros.proveedor_id
          ) {
            params.set(
              'proveedor_id',
              String(
                filtros
                  .proveedor_id
              )
            );
          }


          const data =
            await apiFetch(
              `/almacen-materia-prima/lotes?${params.toString()}`
            );


          setLotes(
            data.lotes ||
            []
          );

          setPaginacionLotes(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los lotes'
          );

        } finally {
          setCargandoLotes(false);
        }
      },
      [
        message
      ]
    );


  useEffect(() => {
    cargarBase();
  }, [
    cargarBase
  ]);


  useEffect(() => {
    cargarResumen(
      pageResumen,
      filtrosResumen
    );
  }, [
    cargarResumen,
    filtrosResumen,
    pageResumen
  ]);


  useEffect(() => {
    cargarLotes(
      pageLotes,
      filtrosLotes
    );
  }, [
    cargarLotes,
    filtrosLotes,
    pageLotes
  ]);


  const actualizarTodo =
    async () => {
      await Promise.all([
        cargarBase(),
        cargarResumen(
          pageResumen,
          filtrosResumen
        ),
        cargarLotes(
          pageLotes,
          filtrosLotes
        )
      ]);
    };


  const resumenColumns:
    TableColumnsType<
      ResumenMateriaPrima
    > = [
    {
      title: 'Material',
      dataIndex:
        'material',
      key:
        'material',
      minWidth: 180,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title: 'Color',
      dataIndex:
        'color',
      key:
        'color',
      width: 160
    },

    {
      title:
        'Total comprado',
      key:
        'comprado',
      width: 170,

      render: (
        _,
        item
      ) =>
        `${formatPeso(item.cantidad_inicial_total)} ${item.unidad}`
    },

    {
      title: 'Consumido',
      key: 'consumido',
      width: 160,

      render: (
        _,
        item
      ) => (
        <Text
          type={
            Number(
              item
                .cantidad_consumida_total
            ) > 0
              ? 'warning'
              : undefined
          }
        >
          {
            formatPeso(
              item
                .cantidad_consumida_total
            )
          } {
            item.unidad
          }
        </Text>
      )
    },

    {
      title: 'Disponible',
      key: 'disponible',
      width: 230,

      render: (
        _,
        item
      ) => {
        const total =
          Number(
            item
              .cantidad_inicial_total ||
            0
          );

        const disponible =
          Number(
            item
              .cantidad_disponible_total ||
            0
          );

        const porcentaje =
          total > 0
            ? Math.max(
                0,
                Math.min(
                  100,
                  (
                    disponible /
                    total
                  ) *
                  100
                )
              )
            : 0;


        return (
          <div className="gd-almacen-mp-stock-cell">

            <Text strong>
              {
                formatPeso(
                  disponible
                )
              } {
                item.unidad
              }
            </Text>

            <Progress
              percent={
                Number(
                  porcentaje
                    .toFixed(2)
                )
              }
              showInfo={false}
              size="small"
            />

          </div>
        );
      }
    }
  ];


  const lotesColumns:
    TableColumnsType<
      LoteMateriaPrima
    > = [
    {
      title: 'Lote',
      dataIndex:
        'nombre_lote',
      key:
        'nombre_lote',
      minWidth: 190,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title: 'Proveedor',
      key: 'proveedor',
      minWidth: 210,

      render: (
        _,
        lote
      ) => (
        <div className="gd-almacen-mp-provider-cell">

          <Text strong>
            {lote.proveedor}
          </Text>

          <Text
            type="secondary"
          >
            {
              lote
                .proveedor_ruc
            }
          </Text>

        </div>
      )
    },

    {
      title: 'Fecha compra',
      dataIndex:
        'fecha_compra',
      key:
        'fecha_compra',
      width: 130,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Documento',
      dataIndex:
        'numero_documento',
      key:
        'numero_documento',
      width: 155,
      responsive: [
        'md'
      ],

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title:
        'Materias primas',
      dataIndex:
        'cantidad_materias_primas',
      key:
        'cantidad_materias_primas',
      width: 135,
      responsive: [
        'md'
      ]
    },

    {
      title: 'Comprado',
      dataIndex:
        'cantidad_inicial_total',
      key:
        'cantidad_inicial_total',
      width: 145,

      render: (
        value: number
      ) =>
        `${formatPeso(value)} KG`
    },

    {
      title: 'Consumido',
      dataIndex:
        'cantidad_consumida_total',
      key:
        'cantidad_consumida_total',
      width: 145,
      responsive: [
        'lg'
      ],

      render: (
        value: number
      ) =>
        `${formatPeso(value)} KG`
    },

    {
      title: 'Disponible',
      dataIndex:
        'cantidad_disponible_total',
      key:
        'cantidad_disponible_total',
      width: 150,

      render: (
        value: number
      ) => (
        <Text
          strong
          type={
            Number(
              value
            ) > 0
              ? 'success'
              : undefined
          }
        >
          {
            formatPeso(
              value
            )
          } KG
        </Text>
      )
    },

    {
      title: 'Estado',
      dataIndex:
        'estado_stock',
      key:
        'estado_stock',
      width: 120,

      render: (
        value: string
      ) =>
        estadoLoteTag(
          value
        )
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 145,

      render: (
        _,
        lote
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/almacen/materia-prima/lotes/${lote.compra_materia_prima_id}`
            )
          }
        >
          Ver lote
        </Button>
      )
    }
  ];


  const tabItems:
    TabsProps['items'] = [
    {
      key: 'resumen',
      label:
        'Resumen general',

      children:
        (
          <>
            <Card
              title="Filtros del resumen"
              className="gd-almacen-mp-section-card"
            >

              <Form<
                FiltrosResumen
              >
                form={
                  formResumen
                }
                layout="vertical"
                requiredMark={false}
                onFinish={(
                  values
                ) => {
                  setPageResumen(1);

                  setFiltrosResumen({
                    q:
                      values.q
                        ?.trim() ||
                      '',

                    material_id:
                      values
                        .material_id,

                    color_id:
                      values
                        .color_id
                  });
                }}
              >

                <Row
                  gutter={[
                    14,
                    0
                  ]}
                  align="bottom"
                >

                  <Col
                    xs={24}
                    lg={8}
                  >
                    <Form.Item
                      label="Buscar"
                      name="q"
                    >
                      <Input
                        allowClear
                        prefix={
                          <SearchOutlined />
                        }
                        placeholder="Material o color"
                      />
                    </Form.Item>
                  </Col>


                  <Col
                    xs={24}
                    sm={12}
                    lg={5}
                  >
                    <Form.Item
                      label="Material"
                      name="material_id"
                    >
                      <Select
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        placeholder="Todos"
                        options={
                          materiales.map(
                            (item) => ({
                              value:
                                item.id,
                              label:
                                item.nombre
                            })
                          )
                        }
                      />
                    </Form.Item>
                  </Col>


                  <Col
                    xs={24}
                    sm={12}
                    lg={5}
                  >
                    <Form.Item
                      label="Color"
                      name="color_id"
                    >
                      <Select
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        placeholder="Todos"
                        options={
                          colores.map(
                            (item) => ({
                              value:
                                item.id,
                              label:
                                item.nombre
                            })
                          )
                        }
                      />
                    </Form.Item>
                  </Col>


                  <Col
                    xs={24}
                    lg={6}
                  >
                    <Form.Item
                      label=" "
                      className="gd-almacen-mp-filter-actions"
                    >
                      <Space wrap>

                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={
                            <SearchOutlined />
                          }
                        >
                          Buscar
                        </Button>


                        <Button
                          onClick={() => {
                            formResumen
                              .resetFields();

                            setPageResumen(
                              1
                            );

                            setFiltrosResumen(
                              {}
                            );
                          }}
                        >
                          Limpiar
                        </Button>

                      </Space>
                    </Form.Item>
                  </Col>

                </Row>

              </Form>

            </Card>


            <Card
              title="Existencias consolidadas"
              extra={
                <Text
                  type="secondary"
                >
                  {
                    paginacionResumen
                      .total
                  } registro(s)
                </Text>
              }
              className="gd-almacen-mp-table-card"
            >

              <Table<
                ResumenMateriaPrima
              >
                rowKey={(
                  item
                ) =>
                  `${item.material_id}-${item.color_id}-${item.unidad_medida_id}`
                }
                columns={
                  resumenColumns
                }
                dataSource={
                  resumen
                }
                loading={
                  cargandoResumen
                }
                scroll={{
                  x: 780
                }}
                locale={{
                  emptyText:
                    <Empty
                      image={
                        Empty
                          .PRESENTED_IMAGE_SIMPLE
                      }
                      description="No hay existencias para los filtros seleccionados"
                    />
                }}
                pagination={{
                  current:
                    paginacionResumen
                      .page,

                  pageSize:
                    paginacionResumen
                      .limit,

                  total:
                    paginacionResumen
                      .total,

                  showSizeChanger:
                    false,

                  showTotal: (
                    total
                  ) =>
                    `${total} registro(s)`,

                  onChange: (
                    nuevaPagina
                  ) =>
                    setPageResumen(
                      nuevaPagina
                    )
                }}
              />

            </Card>
          </>
        )
    },

    {
      key: 'lotes',
      label: 'Lotes',

      children:
        (
          <>
            <Card
              title="Filtros de lotes"
              className="gd-almacen-mp-section-card"
            >

              <Form<
                FiltrosLotes
              >
                form={
                  formLotes
                }
                layout="vertical"
                requiredMark={false}
                initialValues={{
                  estado:
                    'TODOS'
                }}
                onFinish={(
                  values
                ) => {
                  setPageLotes(1);

                  setFiltrosLotes({
                    q:
                      values.q
                        ?.trim() ||
                      '',

                    proveedor_id:
                      values
                        .proveedor_id,

                    estado:
                      values.estado ||
                      'TODOS'
                  });
                }}
              >

                <Row
                  gutter={[
                    14,
                    0
                  ]}
                  align="bottom"
                >

                  <Col
                    xs={24}
                    lg={8}
                  >
                    <Form.Item
                      label="Buscar"
                      name="q"
                    >
                      <Input
                        allowClear
                        prefix={
                          <SearchOutlined />
                        }
                        placeholder="Lote, documento, proveedor, material..."
                      />
                    </Form.Item>
                  </Col>


                  <Col
                    xs={24}
                    lg={6}
                  >
                    <Form.Item
                      label="Proveedor"
                      name="proveedor_id"
                    >
                      <Select
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        placeholder="Todos"
                        options={
                          proveedores.map(
                            (item) => ({
                              value:
                                item
                                  .proveedor_id,

                              label:
                                `${item.razon_social} · ${item.ruc}`
                            })
                          )
                        }
                      />
                    </Form.Item>
                  </Col>


                  <Col
                    xs={24}
                    sm={12}
                    lg={4}
                  >
                    <Form.Item
                      label="Estado"
                      name="estado"
                    >
                      <Select
                        options={[
                          {
                            value:
                              'TODOS',
                            label:
                              'Todos'
                          },
                          {
                            value:
                              'CON_STOCK',
                            label:
                              'Con stock'
                          },
                          {
                            value:
                              'AGOTADO',
                            label:
                              'Agotados'
                          }
                        ]}
                      />
                    </Form.Item>
                  </Col>


                  <Col
                    xs={24}
                    lg={6}
                  >
                    <Form.Item
                      label=" "
                      className="gd-almacen-mp-filter-actions"
                    >
                      <Space wrap>

                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={
                            <SearchOutlined />
                          }
                        >
                          Buscar
                        </Button>


                        <Button
                          onClick={() => {
                            formLotes
                              .resetFields();

                            formLotes
                              .setFieldValue(
                                'estado',
                                'TODOS'
                              );

                            setPageLotes(
                              1
                            );

                            setFiltrosLotes({
                              estado:
                                'TODOS'
                            });
                          }}
                        >
                          Limpiar
                        </Button>

                      </Space>
                    </Form.Item>
                  </Col>

                </Row>

              </Form>

            </Card>


            <Card
              title="Lotes de compra"
              extra={
                <Text
                  type="secondary"
                >
                  {
                    paginacionLotes
                      .total
                  } lote(s)
                </Text>
              }
              className="gd-almacen-mp-table-card"
            >

              <Table<
                LoteMateriaPrima
              >
                rowKey="compra_materia_prima_id"
                columns={
                  lotesColumns
                }
                dataSource={
                  lotes
                }
                loading={
                  cargandoLotes
                }
                scroll={{
                  x: 1180
                }}
                locale={{
                  emptyText:
                    <Empty
                      image={
                        Empty
                          .PRESENTED_IMAGE_SIMPLE
                      }
                      description="No hay lotes para los filtros seleccionados"
                    />
                }}
                pagination={{
                  current:
                    paginacionLotes
                      .page,

                  pageSize:
                    paginacionLotes
                      .limit,

                  total:
                    paginacionLotes
                      .total,

                  showSizeChanger:
                    false,

                  showTotal: (
                    total
                  ) =>
                    `${total} lote(s)`,

                  onChange: (
                    nuevaPagina
                  ) =>
                    setPageLotes(
                      nuevaPagina
                    )
                }}
              />

            </Card>
          </>
        )
    }
  ];


  return (
    <div className="gd-almacen-mp-page">

      <PageHeader
        title="Almacén de materia prima"
        description="Consulta el stock consolidado de fibra y revisa cada compra como un lote completo."
        extra={
          <Space wrap>

            <Button
              icon={
                <ReloadOutlined />
              }
              loading={
                cargandoBase ||
                cargandoResumen ||
                cargandoLotes
              }
              onClick={
                actualizarTodo
              }
            >
              Actualizar
            </Button>


            <Button
              type="primary"
              icon={
                <PlusOutlined />
              }
              onClick={() =>
                navigate(
                  '/gestion/compras-materia-prima/registrar'
                )
              }
            >
              Registrar lote
            </Button>

          </Space>
        }
      />


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-almacen-mp-kpis"
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Total comprado"
              value={
                Number(
                  indicadores
                    .total_comprado_kg ||
                  0
                )
              }
              precision={2}
              suffix="KG"
              prefix={
                <ShoppingCartOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Stock disponible"
              value={
                Number(
                  indicadores
                    .stock_total_kg ||
                  0
                )
              }
              precision={2}
              suffix="KG"
              prefix={
                <InboxOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Consumido"
              value={
                Number(
                  indicadores
                    .consumido_total_kg ||
                  0
                )
              }
              precision={2}
              suffix="KG"
              prefix={
                <DatabaseOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Lotes registrados"
              value={
                Number(
                  indicadores
                    .lotes_registrados ||
                  0
                )
              }
            />
          </Card>
        </Col>

      </Row>


      <Card
        className="gd-almacen-mp-tabs-card"
      >

        <Tabs
          defaultActiveKey="resumen"
          items={
            tabItems
          }
        />

      </Card>

    </div>
  );
}


export default AlmacenMateriaPrima;


<<<END OF FILE>>>


---

## FILE: src\pages\almacenMateriaPrima\AlmacenMateriaPrimaLoteDetalle.tsx

<<<START OF FILE>>>

import type {
  CollapseProps,
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Card,
  Collapse,
  Descriptions,
  Empty,
  Progress,
  Result,
  Select,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DatabaseOutlined,
  InboxOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatPeso
} from '../../utils/formatters';

import '../../styles/almacenMateriaPrimaAntd.css';


const {
  Text
} = Typography;


type MateriaPrimaLote = {
  compra_materia_prima_detalle_id:
    number;

  stock_materia_prima_lote_id:
    number;

  material_id: number;
  material: string;

  color_id: number;
  color: string;

  descripcion_item?:
    string | null;

  unidad_medida_id:
    number;
  unidad: string;

  precio_unitario: number;
  subtotal: number;

  cantidad_inicial: number;
  cantidad_consumida: number;
  cantidad_disponible: number;
};


type Lote = {
  compra_materia_prima_id:
    number;

  nombre_lote: string;
  fecha_compra: string;

  numero_documento?:
    string | null;

  moneda_codigo: string;

  descripcion?:
    string | null;

  proveedor_id: number;
  proveedor_ruc: string;
  proveedor: string;

  cantidad_inicial_total:
    number;

  cantidad_consumida_total:
    number;

  cantidad_disponible_total:
    number;

  cantidad_materias_primas:
    number;

  registrado_por:
    string;

  created_at?:
    string | null;

  detalles:
    MateriaPrimaLote[];
};


type Movimiento = {
  movimiento_materia_prima_id:
    number;

  tipo_movimiento: string;
  cantidad: number;

  fecha_movimiento:
    string;

  observacion?:
    string | null;

  material_id: number;
  material: string;

  color_id: number;
  color: string;

  unidad: string;

  registrado_por:
    string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const tipoMovimientoTexto = (
  tipo: string
) => {
  switch (tipo) {
    case 'ENTRADA_COMPRA':
      return 'Entrada por compra';

    case 'SALIDA_PRODUCCION':
      return 'Salida por producción';

    case 'SALIDA_MERMA':
      return 'Salida por merma';

    case 'AJUSTE_ENTRADA':
      return 'Ajuste de entrada';

    case 'AJUSTE_SALIDA':
      return 'Ajuste de salida';

    default:
      return tipo;
  }
};


const esEntrada = (
  tipo: string
) =>
  tipo === 'ENTRADA_COMPRA' ||
  tipo === 'AJUSTE_ENTRADA';


function AlmacenMateriaPrimaLoteDetalle() {
  const {
    stock_materia_prima_lote_id:
      compra_materia_prima_id
  } = useParams();

  const {
    message
  } = AntdApp.useApp();

  const [
    lote,
    setLote
  ] = useState<
    Lote | null
  >(null);

  const [
    movimientos,
    setMovimientos
  ] = useState<
    Movimiento[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    cargandoMovimientos,
    setCargandoMovimientos
  ] = useState(false);

  const [
    historialCargado,
    setHistorialCargado
  ] = useState(false);

  const [
    tipoMovimiento,
    setTipoMovimiento
  ] = useState('');

  const [
    page,
    setPage
  ] = useState(1);

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  const cargarLote =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/almacen-materia-prima/lotes/${compra_materia_prima_id}`
          );

        setLote(
          data.lote
        );
      },
      [
        compra_materia_prima_id
      ]
    );


  const cargarMovimientos =
    useCallback(
      async (
        pagina: number,
        tipo: string
      ) => {
        setCargandoMovimientos(
          true
        );

        try {
          const params =
            new URLSearchParams();

          params.set(
            'page',
            String(pagina)
          );

          params.set(
            'limit',
            '10'
          );

          if (tipo) {
            params.set(
              'tipo_movimiento',
              tipo
            );
          }


          const data =
            await apiFetch(
              `/almacen-materia-prima/lotes/${compra_materia_prima_id}/movimientos?${params.toString()}`
            );


          setMovimientos(
            data.movimientos ||
            []
          );

          setPaginacion(
            data.paginacion
          );

          setHistorialCargado(
            true
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el historial del lote'
          );

        } finally {
          setCargandoMovimientos(
            false
          );
        }
      },
      [
        compra_materia_prima_id,
        message
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await cargarLote();

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el lote';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarLote,
    message
  ]);


  useEffect(() => {
    if (
      !historialCargado
    ) {
      return;
    }

    cargarMovimientos(
      page,
      tipoMovimiento
    );
  }, [
    cargarMovimientos,
    historialCargado,
    page,
    tipoMovimiento
  ]);


  const porcentajeDisponible =
    useMemo(
      () => {
        if (!lote) {
          return 0;
        }

        const total =
          Number(
            lote
              .cantidad_inicial_total ||
            0
          );

        const disponible =
          Number(
            lote
              .cantidad_disponible_total ||
            0
          );

        if (
          total <= 0
        ) {
          return 0;
        }

        return Math.max(
          0,
          Math.min(
            100,
            (
              disponible /
              total
            ) *
            100
          )
        );
      },
      [
        lote
      ]
    );


  const detalleColumns:
    TableColumnsType<
      MateriaPrimaLote
    > = [
    {
      title: 'Material',
      dataIndex:
        'material',
      key:
        'material',
      minWidth: 180,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title: 'Color',
      dataIndex:
        'color',
      key:
        'color',
      width: 150
    },

    {
      title: 'Comprado',
      key: 'comprado',
      width: 150,

      render: (
        _,
        item
      ) =>
        `${formatPeso(item.cantidad_inicial)} ${item.unidad}`
    },

    {
      title: 'Consumido',
      key: 'consumido',
      width: 150,

      render: (
        _,
        item
      ) =>
        `${formatPeso(item.cantidad_consumida)} ${item.unidad}`
    },

    {
      title: 'Disponible',
      key: 'disponible',
      width: 220,

      render: (
        _,
        item
      ) => {
        const total =
          Number(
            item
              .cantidad_inicial ||
            0
          );

        const disponible =
          Number(
            item
              .cantidad_disponible ||
            0
          );

        const porcentaje =
          total > 0
            ? Math.max(
                0,
                Math.min(
                  100,
                  (
                    disponible /
                    total
                  ) *
                  100
                )
              )
            : 0;


        return (
          <div className="gd-almacen-mp-stock-cell">

            <Text
              strong
              type={
                disponible > 0
                  ? 'success'
                  : undefined
              }
            >
              {
                formatPeso(
                  disponible
                )
              } {
                item.unidad
              }
            </Text>

            <Progress
              percent={
                Number(
                  porcentaje
                    .toFixed(2)
                )
              }
              showInfo={false}
              size="small"
            />

          </div>
        );
      }
    }
  ];


  const movimientoColumns:
    TableColumnsType<
      Movimiento
    > = [
    {
      title: 'Fecha',
      dataIndex:
        'fecha_movimiento',
      key:
        'fecha_movimiento',
      width: 175,

      render: (
        value: string
      ) => {
        const fecha =
          new Date(
            value
          );

        return Number.isNaN(
          fecha.getTime()
        )
          ? value
          : fecha.toLocaleString(
              'es-PE'
            );
      }
    },

    {
      title:
        'Materia prima',
      key:
        'materia_prima',
      minWidth: 210,

      render: (
        _,
        item
      ) => (
        <div className="gd-almacen-mp-provider-cell">

          <Text strong>
            {item.material}
          </Text>

          <Text
            type="secondary"
          >
            {item.color}
          </Text>

        </div>
      )
    },

    {
      title: 'Tipo',
      dataIndex:
        'tipo_movimiento',
      key:
        'tipo_movimiento',
      width: 190,

      render: (
        value: string
      ) => (
        <Tag
          color={
            esEntrada(
              value
            )
              ? 'success'
              : 'warning'
          }
        >
          {
            tipoMovimientoTexto(
              value
            )
          }
        </Tag>
      )
    },

    {
      title: 'Movimiento',
      key: 'movimiento',
      width: 160,

      render: (
        _,
        item
      ) => (
        <Text
          strong
          type={
            esEntrada(
              item
                .tipo_movimiento
            )
              ? 'success'
              : 'danger'
          }
        >
          {
            esEntrada(
              item
                .tipo_movimiento
            )
              ? '+'
              : '-'
          }
          {
            formatPeso(
              item.cantidad
            )
          } {
            item.unidad
          }
        </Text>
      )
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      width: 180,
      responsive: [
        'lg'
      ]
    },

    {
      title: 'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',
      minWidth: 230,

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    }
  ];


  const collapseItems:
    CollapseProps['items'] = [
    {
      key: 'movimientos',

      label:
        'Historial de movimientos',

      children:
        (
          <>
            <div className="gd-almacen-mp-history-toolbar">

              <div>
                <Text strong>
                  Movimientos del lote
                </Text>

                <br />

                <Text
                  type="secondary"
                >
                  Entradas y salidas registradas sobre las materias primas de esta compra.
                </Text>
              </div>


              <Select
                value={
                  tipoMovimiento
                }
                className="gd-almacen-mp-history-filter"
                options={[
                  {
                    value: '',
                    label: 'Todos'
                  },
                  {
                    value:
                      'ENTRADA_COMPRA',
                    label:
                      'Entrada por compra'
                  },
                  {
                    value:
                      'SALIDA_PRODUCCION',
                    label:
                      'Salida por producción'
                  },
                  {
                    value:
                      'SALIDA_MERMA',
                    label:
                      'Salida por merma'
                  },
                  {
                    value:
                      'AJUSTE_ENTRADA',
                    label:
                      'Ajuste de entrada'
                  },
                  {
                    value:
                      'AJUSTE_SALIDA',
                    label:
                      'Ajuste de salida'
                  }
                ]}
                onChange={(
                  value
                ) => {
                  setPage(1);
                  setTipoMovimiento(
                    value
                  );
                }}
              />

            </div>


            <Table<
              Movimiento
            >
              rowKey="movimiento_materia_prima_id"
              columns={
                movimientoColumns
              }
              dataSource={
                movimientos
              }
              loading={
                cargandoMovimientos
              }
              scroll={{
                x: 1050
              }}
              locale={{
                emptyText:
                  <Empty
                    image={
                      Empty
                        .PRESENTED_IMAGE_SIMPLE
                    }
                    description="No existen movimientos para el filtro seleccionado"
                  />
              }}
              pagination={{
                current:
                  paginacion.page,

                pageSize:
                  paginacion.limit,

                total:
                  paginacion.total,

                showSizeChanger:
                  false,

                showTotal: (
                  total
                ) =>
                  `${total} movimiento(s)`,

                onChange: (
                  nuevaPagina
                ) =>
                  setPage(
                    nuevaPagina
                  )
              }}
            />
          </>
        )
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-almacen-mp-page">

        <Skeleton
          active
          paragraph={{
            rows: 12
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !lote
  ) {
    return (
      <div className="gd-almacen-mp-page">

        <BackButton
          to="/gestion/almacen/materia-prima"
          label="Volver al almacén"
        />


        <Result
          status="error"
          title="No se pudo cargar el lote"
          subTitle={
            errorCarga ||
            'Lote no encontrado'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-almacen-mp-page">

      <BackButton
        to="/gestion/almacen/materia-prima"
        label="Volver al almacén"
      />


      <PageHeader
        title={
          lote.nombre_lote
        }
        description="Existencias y movimientos de las materias primas pertenecientes a esta compra."
        extra={
          lote
            .cantidad_disponible_total >
          0
            ? (
                <Tag color="success">
                  Con stock
                </Tag>
              )
            : (
                <Tag>
                  Agotado
                </Tag>
              )
        }
      />


      <div className="gd-almacen-mp-detail-stats">

        <Card>
          <Statistic
            title="Comprado"
            value={
              Number(
                lote
                  .cantidad_inicial_total ||
                0
              )
            }
            precision={2}
            suffix="KG"
            prefix={
              <ShoppingCartOutlined />
            }
          />
        </Card>


        <Card>
          <Statistic
            title="Consumido"
            value={
              Number(
                lote
                  .cantidad_consumida_total ||
                0
              )
            }
            precision={2}
            suffix="KG"
            prefix={
              <DatabaseOutlined />
            }
          />
        </Card>


        <Card>
          <Statistic
            title="Disponible"
            value={
              Number(
                lote
                  .cantidad_disponible_total ||
                0
              )
            }
            precision={2}
            suffix="KG"
            prefix={
              <InboxOutlined />
            }
          />
        </Card>

      </div>


      <Card
        title="Datos del lote"
        className="gd-almacen-mp-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 3
          }}
          items={[
            {
              key: 'proveedor',
              label: 'Proveedor',
              children:
                lote.proveedor
            },

            {
              key: 'ruc',
              label: 'RUC',
              children:
                lote
                  .proveedor_ruc
            },

            {
              key: 'fecha',
              label: 'Fecha de compra',
              children:
                lote
                  .fecha_compra
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key: 'documento',
              label: 'Documento',
              children:
                lote
                  .numero_documento ||
                '-'
            },

            {
              key: 'moneda',
              label: 'Moneda',
              children:
                lote
                  .moneda_codigo
            },

            {
              key: 'usuario',
              label: 'Registrado por',
              children:
                lote
                  .registrado_por
            },

            {
              key: 'materias',
              label:
                'Materias primas',
              children:
                lote
                  .cantidad_materias_primas
            },

            {
              key: 'descripcion',
              label: 'Descripción',
              span: 2,
              children:
                lote.descripcion ||
                'Sin descripción'
            }
          ]}
        />


        <div className="gd-almacen-mp-global-progress">

          <div className="gd-almacen-mp-global-progress-head">

            <Text>
              Stock disponible del lote
            </Text>

            <Text strong>
              {
                formatPeso(
                  lote
                    .cantidad_disponible_total
                )
              } / {
                formatPeso(
                  lote
                    .cantidad_inicial_total
                )
              } KG
            </Text>

          </div>


          <Progress
            percent={
              Number(
                porcentajeDisponible
                  .toFixed(2)
              )
            }
            status={
              Number(
                lote
                  .cantidad_disponible_total
              ) <= 0
                ? 'exception'
                : 'active'
            }
          />

        </div>

      </Card>


      {
        Number(
          lote
            .cantidad_disponible_total
        ) <= 0 &&
        (
          <Alert
            type="warning"
            showIcon
            message="Este lote ya no tiene stock disponible."
            description="Se mantiene visible porque forma parte del historial de compras, producción y mermas."
            className="gd-almacen-mp-section-card"
          />
        )
      }


      <Card
        title="Materias primas del lote"
        extra={
          <Text
            type="secondary"
          >
            {
              lote
                .detalles
                .length
            } materia(s) prima(s)
          </Text>
        }
        className="gd-almacen-mp-table-card"
      >

        <Table<
          MateriaPrimaLote
        >
          rowKey="compra_materia_prima_detalle_id"
          columns={
            detalleColumns
          }
          dataSource={
            lote.detalles
          }
          pagination={false}
          scroll={{
            x: 820
          }}
        />

      </Card>


      <Collapse
        items={
          collapseItems
        }
        className="gd-almacen-mp-history-collapse"
        onChange={(
          keys
        ) => {
          const abierto =
            Array.isArray(
              keys
            )
              ? keys.includes(
                  'movimientos'
                )
              : keys ===
                'movimientos';

          if (
            abierto &&
            !historialCargado
          ) {
            cargarMovimientos(
              1,
              tipoMovimiento
            );
          }
        }}
      />

    </div>
  );
}


export default AlmacenMateriaPrimaLoteDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\almacenProductoTerminado\AlmacenProductoTerminado.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType,
  TabsProps
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Typography
} from 'antd';

import {
  EyeOutlined,
  InboxOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatCantidad,
  formatPeso
} from '../../utils/formatters';

import '../../styles/almacenProductoTerminadoAntd.css';


const {
  Text
} = Typography;


type FiltrosBase = {
  q?: string;
  tipo_producto_id?: number;
  material_id?: number;
  medida_id?: number;
  color_id?: number;
};


type FiltrosPresentaciones =
  FiltrosBase & {
    estado?: string;
  };


type Indicadores = {
  stock_disponible_kg: number;
  productos_con_stock: number;
  presentaciones_con_stock: number;
};


type ResumenProducto = {
  producto_id: number;

  tipo_producto_id: number;
  tipo_producto: string;

  material_id: number;
  material: string;

  medida_id: number;
  medida: string;

  color_id: number;
  color: string;

  unidad_medida_id: number;
  unidad: string;

  cantidad_disponible_total: number;
  presentaciones_con_stock: number;
};


type PresentacionProducto = {
  stock_producto_terminado_id: number;
  producto_id: number;

  tipo_producto_id: number;
  tipo_producto: string;

  material_id: number;
  material: string;

  medida_id: number;
  medida: string;

  color_id: number;
  color: string;

  unidad_medida_id: number;
  unidad: string;

  cantidad_presentacion: number;

  unidad_presentacion_id: number;
  unidad_presentacion: string;

  cantidad_disponible: number;
  presentaciones_disponibles: number;

  estado_stock:
    | 'CON_STOCK'
    | 'AGOTADO';

  created_at?: string | null;
  updated_at?: string | null;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const estadoStockTag = (
  estado: string
) => {
  if (
    estado === 'CON_STOCK'
  ) {
    return (
      <Tag color="success">
        Con stock
      </Tag>
    );
  }

  return (
    <Tag>
      Agotado
    </Tag>
  );
};


function AlmacenProductoTerminado() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    formResumen
  ] = Form.useForm<
    FiltrosBase
  >();

  const [
    formPresentaciones
  ] = Form.useForm<
    FiltrosPresentaciones
  >();

  const [
    indicadores,
    setIndicadores
  ] = useState<Indicadores>({
    stock_disponible_kg: 0,
    productos_con_stock: 0,
    presentaciones_con_stock: 0
  });

  const [
    tipos,
    setTipos
  ] = useState<any[]>([]);

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    medidas,
    setMedidas
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    resumen,
    setResumen
  ] = useState<
    ResumenProducto[]
  >([]);

  const [
    presentaciones,
    setPresentaciones
  ] = useState<
    PresentacionProducto[]
  >([]);

  const [
    cargandoBase,
    setCargandoBase
  ] = useState(true);

  const [
    cargandoResumen,
    setCargandoResumen
  ] = useState(true);

  const [
    cargandoPresentaciones,
    setCargandoPresentaciones
  ] = useState(true);

  const [
    pageResumen,
    setPageResumen
  ] = useState(1);

  const [
    pagePresentaciones,
    setPagePresentaciones
  ] = useState(1);

  const [
    filtrosResumen,
    setFiltrosResumen
  ] = useState<
    FiltrosBase
  >({});

  const [
    filtrosPresentaciones,
    setFiltrosPresentaciones
  ] = useState<
    FiltrosPresentaciones
  >({
    estado:
      'TODOS'
  });

  const [
    paginacionResumen,
    setPaginacionResumen
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [
    paginacionPresentaciones,
    setPaginacionPresentaciones
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarBase =
    useCallback(
      async () => {
        setCargandoBase(
          true
        );

        try {
          const [
            indicadoresData,
            tiposData,
            materialesData,
            medidasData,
            coloresData
          ] = await Promise.all([
            apiFetch(
              '/almacen-producto-terminado/indicadores'
            ),

            apiFetch(
              '/catalogos/tiposProducto'
            ),

            apiFetch(
              '/catalogos/materiales'
            ),

            apiFetch(
              '/catalogos/medidas'
            ),

            apiFetch(
              '/catalogos/colores'
            )
          ]);


          setIndicadores(
            indicadoresData
              .indicadores ||
            {}
          );

          setTipos(
            tiposData.items ||
            []
          );

          setMateriales(
            materialesData.items ||
            []
          );

          setMedidas(
            medidasData.items ||
            []
          );

          setColores(
            coloresData.items ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos del almacén'
          );

        } finally {
          setCargandoBase(
            false
          );
        }
      },
      [
        message
      ]
    );


  const cargarResumen =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosBase
      ) => {
        setCargandoResumen(
          true
        );

        try {
          const params =
            new URLSearchParams();

          params.set(
            'page',
            String(pagina)
          );

          params.set(
            'limit',
            '10'
          );


          if (
            filtros.q?.trim()
          ) {
            params.set(
              'q',
              filtros.q.trim()
            );
          }

          if (
            filtros
              .tipo_producto_id
          ) {
            params.set(
              'tipo_producto_id',
              String(
                filtros
                  .tipo_producto_id
              )
            );
          }

          if (
            filtros.material_id
          ) {
            params.set(
              'material_id',
              String(
                filtros
                  .material_id
              )
            );
          }

          if (
            filtros.medida_id
          ) {
            params.set(
              'medida_id',
              String(
                filtros
                  .medida_id
              )
            );
          }

          if (
            filtros.color_id
          ) {
            params.set(
              'color_id',
              String(
                filtros
                  .color_id
              )
            );
          }


          const data =
            await apiFetch(
              `/almacen-producto-terminado/resumen?${params.toString()}`
            );


          setResumen(
            data.resumen ||
            []
          );

          setPaginacionResumen(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el resumen del almacén'
          );

        } finally {
          setCargandoResumen(
            false
          );
        }
      },
      [
        message
      ]
    );


  const cargarPresentaciones =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosPresentaciones
      ) => {
        setCargandoPresentaciones(
          true
        );

        try {
          const params =
            new URLSearchParams();

          params.set(
            'page',
            String(pagina)
          );

          params.set(
            'limit',
            '10'
          );

          params.set(
            'estado',
            filtros.estado ||
            'TODOS'
          );


          if (
            filtros.q?.trim()
          ) {
            params.set(
              'q',
              filtros.q.trim()
            );
          }

          if (
            filtros
              .tipo_producto_id
          ) {
            params.set(
              'tipo_producto_id',
              String(
                filtros
                  .tipo_producto_id
              )
            );
          }

          if (
            filtros.material_id
          ) {
            params.set(
              'material_id',
              String(
                filtros
                  .material_id
              )
            );
          }

          if (
            filtros.medida_id
          ) {
            params.set(
              'medida_id',
              String(
                filtros
                  .medida_id
              )
            );
          }

          if (
            filtros.color_id
          ) {
            params.set(
              'color_id',
              String(
                filtros
                  .color_id
              )
            );
          }


          const data =
            await apiFetch(
              `/almacen-producto-terminado/presentaciones?${params.toString()}`
            );


          setPresentaciones(
            data.presentaciones ||
            []
          );

          setPaginacionPresentaciones(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el stock por presentación'
          );

        } finally {
          setCargandoPresentaciones(
            false
          );
        }
      },
      [
        message
      ]
    );


  useEffect(() => {
    cargarBase();
  }, [
    cargarBase
  ]);


  useEffect(() => {
    cargarResumen(
      pageResumen,
      filtrosResumen
    );
  }, [
    cargarResumen,
    filtrosResumen,
    pageResumen
  ]);


  useEffect(() => {
    cargarPresentaciones(
      pagePresentaciones,
      filtrosPresentaciones
    );
  }, [
    cargarPresentaciones,
    filtrosPresentaciones,
    pagePresentaciones
  ]);


  const actualizarTodo =
    async () => {
      await Promise.all([
        cargarBase(),
        cargarResumen(
          pageResumen,
          filtrosResumen
        ),
        cargarPresentaciones(
          pagePresentaciones,
          filtrosPresentaciones
        )
      ]);
    };


  const opcionesFiltro = {
    tipos:
      tipos.map(
        (item) => ({
          value:
            item.id,
          label:
            item.nombre
        })
      ),

    materiales:
      materiales.map(
        (item) => ({
          value:
            item.id,
          label:
            item.nombre
        })
      ),

    medidas:
      medidas.map(
        (item) => ({
          value:
            item.id,
          label:
            item.nombre
        })
      ),

    colores:
      colores.map(
        (item) => ({
          value:
            item.id,
          label:
            item.nombre
        })
      )
  };


  const renderFiltrosBase = (
    tipoVista:
      'RESUMEN' |
      'PRESENTACIONES'
  ) => {
    const esResumen =
      tipoVista ===
      'RESUMEN';

    const form =
      esResumen
        ? formResumen
        : formPresentaciones;


    return (
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={
          esResumen
            ? undefined
            : {
                estado:
                  'TODOS'
              }
        }
        onFinish={(
          values
        ) => {
          if (
            esResumen
          ) {
            setPageResumen(
              1
            );

            setFiltrosResumen({
              q:
                values.q
                  ?.trim() ||
                '',

              tipo_producto_id:
                values
                  .tipo_producto_id,

              material_id:
                values
                  .material_id,

              medida_id:
                values
                  .medida_id,

              color_id:
                values
                  .color_id
            });

          } else {
            setPagePresentaciones(
              1
            );

            setFiltrosPresentaciones({
              q:
                values.q
                  ?.trim() ||
                '',

              tipo_producto_id:
                values
                  .tipo_producto_id,

              material_id:
                values
                  .material_id,

              medida_id:
                values
                  .medida_id,

              color_id:
                values
                  .color_id,

              estado:
                values.estado ||
                'TODOS'
            });
          }
        }}
      >

        <Row
          gutter={[
            14,
            0
          ]}
          align="bottom"
        >

          <Col
            xs={24}
            xl={7}
          >
            <Form.Item
              label="Buscar"
              name="q"
            >
              <Input
                allowClear
                prefix={
                  <SearchOutlined />
                }
                placeholder="Tipo, material, medida o color"
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
            lg={6}
            xl={3}
          >
            <Form.Item
              label="Tipo"
              name="tipo_producto_id"
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                placeholder="Todos"
                options={
                  opcionesFiltro
                    .tipos
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
            lg={6}
            xl={3}
          >
            <Form.Item
              label="Material"
              name="material_id"
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                placeholder="Todos"
                options={
                  opcionesFiltro
                    .materiales
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
            lg={6}
            xl={3}
          >
            <Form.Item
              label="Medida"
              name="medida_id"
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                placeholder="Todas"
                options={
                  opcionesFiltro
                    .medidas
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
            lg={6}
            xl={3}
          >
            <Form.Item
              label="Color"
              name="color_id"
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                placeholder="Todos"
                options={
                  opcionesFiltro
                    .colores
                }
              />
            </Form.Item>
          </Col>


          {
            !esResumen &&
            (
              <Col
                xs={24}
                sm={12}
                lg={6}
                xl={3}
              >
                <Form.Item
                  label="Estado"
                  name="estado"
                >
                  <Select
                    options={[
                      {
                        value:
                          'TODOS',
                        label:
                          'Todos'
                      },
                      {
                        value:
                          'CON_STOCK',
                        label:
                          'Con stock'
                      },
                      {
                        value:
                          'AGOTADO',
                        label:
                          'Agotados'
                      }
                    ]}
                  />
                </Form.Item>
              </Col>
            )
          }


          <Col
            xs={24}
            xl={
              esResumen
                ? 5
                : 2
            }
          >
            <Form.Item
              label=" "
              className="gd-almacen-pt-filter-actions"
            >
              <Space wrap>

                <Button
                  type="primary"
                  htmlType="submit"
                  icon={
                    <SearchOutlined />
                  }
                >
                  Buscar
                </Button>


                <Button
                  onClick={() => {
                    form.resetFields();

                    if (
                      esResumen
                    ) {
                      setPageResumen(
                        1
                      );

                      setFiltrosResumen(
                        {}
                      );

                    } else {
                      form.setFieldValue(
                        'estado',
                        'TODOS'
                      );

                      setPagePresentaciones(
                        1
                      );

                      setFiltrosPresentaciones({
                        estado:
                          'TODOS'
                      });
                    }
                  }}
                >
                  Limpiar
                </Button>

              </Space>
            </Form.Item>
          </Col>

        </Row>

      </Form>
    );
  };


  const resumenColumns:
    TableColumnsType<
      ResumenProducto
    > = [
    {
      title: 'Producto',
      key: 'producto',
      minWidth: 230,

      render: (
        _,
        item
      ) => (
        <div className="gd-almacen-pt-product-cell">

          <Text strong>
            {
              item
                .tipo_producto
            }
          </Text>

          <Text
            type="secondary"
          >
            {item.material}
          </Text>

        </div>
      )
    },

    {
      title: 'Medida',
      dataIndex:
        'medida',
      key:
        'medida',
      width: 150
    },

    {
      title: 'Color',
      dataIndex:
        'color',
      key:
        'color',
      width: 150
    },

    {
      title:
        'Presentaciones con stock',
      dataIndex:
        'presentaciones_con_stock',
      key:
        'presentaciones_con_stock',
      width: 190,
      responsive: [
        'md'
      ],

      render: (
        value: number
      ) => (
        <Tag color="blue">
          {value}
        </Tag>
      )
    },

    {
      title:
        'Stock disponible',
      key:
        'disponible',
      width: 190,

      render: (
        _,
        item
      ) => (
        <Text
          strong
          type={
            Number(
              item
                .cantidad_disponible_total
            ) > 0
              ? 'success'
              : undefined
          }
        >
          {
            formatCantidad(
              item
                .cantidad_disponible_total
            )
          } {
            item.unidad
          }
        </Text>
      )
    }
  ];


  const presentacionesColumns:
    TableColumnsType<
      PresentacionProducto
    > = [
    {
      title: 'Producto',
      key: 'producto',
      minWidth: 220,

      render: (
        _,
        item
      ) => (
        <div className="gd-almacen-pt-product-cell">

          <Text strong>
            {
              item
                .tipo_producto
            }
          </Text>

          <Text
            type="secondary"
          >
            {item.material}
          </Text>

        </div>
      )
    },

    {
      title: 'Medida',
      dataIndex:
        'medida',
      key:
        'medida',
      width: 145
    },

    {
      title: 'Color',
      dataIndex:
        'color',
      key:
        'color',
      width: 145
    },

    {
      title:
        'Presentación',
      key:
        'presentacion',
      width: 165,

      render: (
        _,
        item
      ) => (
        <Text strong>
          {
            formatCantidad(
              item
                .cantidad_presentacion
            )
          } {
            item
              .unidad_presentacion
          }
        </Text>
      )
    },

    {
      title: 'Disponible',
      key: 'disponible',
      width: 165,

      render: (
        _,
        item
      ) => (
        <Text
          strong
          type={
            item
              .estado_stock ===
              'CON_STOCK'
              ? 'success'
              : undefined
          }
        >
          {
            formatCantidad(
              item
                .cantidad_disponible
            )
          } {
            item.unidad
          }
        </Text>
      )
    },

    {
      title:
        'Presentaciones disponibles',
      dataIndex:
        'presentaciones_disponibles',
      key:
        'presentaciones_disponibles',
      width: 205,
      responsive: [
        'md'
      ],

      render: (
        value: number
      ) =>
        formatCantidad(
          value
        )
    },

    {
      title: 'Estado',
      dataIndex:
        'estado_stock',
      key:
        'estado_stock',
      width: 120,

      render: (
        value: string
      ) =>
        estadoStockTag(
          value
        )
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 145,

      render: (
        _,
        item
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/almacen/producto-terminado/presentaciones/${item.stock_producto_terminado_id}`
            )
          }
        >
          Ver detalle
        </Button>
      )
    }
  ];


  const tabs:
    TabsProps['items'] = [
    {
      key: 'resumen',
      label:
        'Resumen general',

      children:
        (
          <>
            <Card
              title="Filtros"
              className="gd-almacen-pt-section-card"
            >
              {
                renderFiltrosBase(
                  'RESUMEN'
                )
              }
            </Card>


            <Card
              title="Stock consolidado"
              extra={
                <Text
                  type="secondary"
                >
                  {
                    paginacionResumen
                      .total
                  } producto(s)
                </Text>
              }
              className="gd-almacen-pt-table-card"
            >

              <Table<
                ResumenProducto
              >
                rowKey="producto_id"
                columns={
                  resumenColumns
                }
                dataSource={
                  resumen
                }
                loading={
                  cargandoResumen
                }
                scroll={{
                  x: 760
                }}
                locale={{
                  emptyText:
                    <Empty
                      image={
                        Empty
                          .PRESENTED_IMAGE_SIMPLE
                      }
                      description="No hay productos para los filtros seleccionados"
                    />
                }}
                pagination={{
                  current:
                    paginacionResumen
                      .page,

                  pageSize:
                    paginacionResumen
                      .limit,

                  total:
                    paginacionResumen
                      .total,

                  showSizeChanger:
                    false,

                  showTotal: (
                    total
                  ) =>
                    `${total} producto(s)`,

                  onChange: (
                    nuevaPagina
                  ) =>
                    setPageResumen(
                      nuevaPagina
                    )
                }}
              />

            </Card>
          </>
        )
    },

    {
      key:
        'presentaciones',
      label:
        'Por presentación',

      children:
        (
          <>
            <Card
              title="Filtros"
              className="gd-almacen-pt-section-card"
            >
              {
                renderFiltrosBase(
                  'PRESENTACIONES'
                )
              }
            </Card>


            <Card
              title="Stock por presentación"
              extra={
                <Text
                  type="secondary"
                >
                  {
                    paginacionPresentaciones
                      .total
                  } registro(s)
                </Text>
              }
              className="gd-almacen-pt-table-card"
            >

              <Table<
                PresentacionProducto
              >
                rowKey="stock_producto_terminado_id"
                columns={
                  presentacionesColumns
                }
                dataSource={
                  presentaciones
                }
                loading={
                  cargandoPresentaciones
                }
                scroll={{
                  x: 1150
                }}
                locale={{
                  emptyText:
                    <Empty
                      image={
                        Empty
                          .PRESENTED_IMAGE_SIMPLE
                      }
                      description="No hay presentaciones para los filtros seleccionados"
                    />
                }}
                pagination={{
                  current:
                    paginacionPresentaciones
                      .page,

                  pageSize:
                    paginacionPresentaciones
                      .limit,

                  total:
                    paginacionPresentaciones
                      .total,

                  showSizeChanger:
                    false,

                  showTotal: (
                    total
                  ) =>
                    `${total} registro(s)`,

                  onChange: (
                    nuevaPagina
                  ) =>
                    setPagePresentaciones(
                      nuevaPagina
                    )
                }}
              />

            </Card>
          </>
        )
    }
  ];


  return (
    <div className="gd-almacen-pt-page">

      <PageHeader
        title="Almacén de producto terminado"
        description="Consulta las existencias disponibles de los productos fabricados y sus distintas presentaciones."
        extra={
          <Space wrap>

            <Button
              icon={
                <ReloadOutlined />
              }
              loading={
                cargandoBase ||
                cargandoResumen ||
                cargandoPresentaciones
              }
              onClick={
                actualizarTodo
              }
            >
              Actualizar
            </Button>


            <Button
              type="primary"
              icon={
                <PlusOutlined />
              }
              onClick={() =>
                navigate(
                  '/gestion/producciones/registrar'
                )
              }
            >
              Registrar producción
            </Button>

          </Space>
        }
      />


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-almacen-pt-kpis"
      >

        <Col
          xs={24}
          sm={12}
          lg={8}
        >
          <Card>
            <Statistic
              title="Stock disponible"
              value={
                Number(
                  indicadores
                    .stock_disponible_kg ||
                  0
                )
              }
              precision={2}
              suffix="KG"
              prefix={
                <InboxOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          lg={8}
        >
          <Card>
            <Statistic
              title="Productos con stock"
              value={
                Number(
                  indicadores
                    .productos_con_stock ||
                  0
                )
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          lg={8}
        >
          <Card>
            <Statistic
              title="Presentaciones con stock"
              value={
                Number(
                  indicadores
                    .presentaciones_con_stock ||
                  0
                )
              }
            />
          </Card>
        </Col>

      </Row>


      <Card
        className="gd-almacen-pt-tabs-card"
      >
        <Tabs
          defaultActiveKey="resumen"
          items={tabs}
        />
      </Card>

    </div>
  );
}


export default AlmacenProductoTerminado;


<<<END OF FILE>>>


---

## FILE: src\pages\almacenProductoTerminado\AlmacenProductoTerminadoDetalle.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Result,
  Row,
  Select,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  EyeOutlined,
  InboxOutlined,
  ProductOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatCantidad
} from '../../utils/formatters';

import '../../styles/almacenProductoTerminadoAntd.css';


const {
  Text
} = Typography;


type Presentacion = {
  stock_producto_terminado_id:
    number;

  producto_id: number;

  tipo_producto_id: number;
  tipo_producto: string;

  material_id: number;
  material: string;

  medida_id: number;
  medida: string;

  color_id: number;
  color: string;

  descripcion_producto?:
    string | null;

  unidad_medida_id:
    number;
  unidad: string;

  cantidad_presentacion:
    number;

  unidad_presentacion_id:
    number;

  unidad_presentacion:
    string;

  cantidad_disponible:
    number;

  presentaciones_disponibles:
    number;

  estado_stock:
    | 'CON_STOCK'
    | 'AGOTADO';

  created_at?:
    string | null;

  updated_at?:
    string | null;

  creado_por:
    string;

  actualizado_por?:
    string | null;
};


type Movimiento = {
  movimiento_producto_terminado_id:
    number;

  stock_producto_terminado_id:
    number;

  tipo_movimiento:
    | 'ENTRADA_PRODUCCION'
    | 'SALIDA_ENTREGA'
    | 'AJUSTE_ENTRADA'
    | 'AJUSTE_SALIDA';

  cantidad:
    number;

  fecha_movimiento:
    string;

  observacion?:
    string | null;

  produccion_detalle_id?:
    number | null;

  produccion_id?:
    number | null;

  entrega_detalle_id?:
    number | null;

  entrega_id?:
    number | null;

  pedido_id?:
    number | null;

  registrado_por:
    string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const tiposMovimiento = [
  {
    value: '',
    label: 'Todos'
  },
  {
    value:
      'ENTRADA_PRODUCCION',
    label:
      'Entrada por producción'
  },
  {
    value:
      'SALIDA_ENTREGA',
    label:
      'Salida por entrega'
  },
  {
    value:
      'AJUSTE_ENTRADA',
    label:
      'Ajuste de entrada'
  },
  {
    value:
      'AJUSTE_SALIDA',
    label:
      'Ajuste de salida'
  }
];


const tipoTexto = (
  tipo: string
) => {
  return (
    tiposMovimiento.find(
      (item) =>
        item.value ===
        tipo
    )?.label ||
    tipo
  );
};


const esEntrada = (
  tipo: string
) =>
  tipo ===
    'ENTRADA_PRODUCCION' ||
  tipo ===
    'AJUSTE_ENTRADA';


function AlmacenProductoTerminadoDetalle() {
  const {
    stock_producto_terminado_id
  } = useParams();

  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    presentacion,
    setPresentacion
  ] = useState<
    Presentacion | null
  >(null);

  const [
    movimientos,
    setMovimientos
  ] = useState<
    Movimiento[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    cargandoMovimientos,
    setCargandoMovimientos
  ] = useState(true);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    tipoMovimiento,
    setTipoMovimiento
  ] = useState('');

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  const cargarPresentacion =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/almacen-producto-terminado/presentaciones/${stock_producto_terminado_id}`
          );

        setPresentacion(
          data.presentacion
        );
      },
      [
        stock_producto_terminado_id
      ]
    );


  const cargarMovimientos =
    useCallback(
      async (
        pagina: number,
        tipo: string
      ) => {
        setCargandoMovimientos(
          true
        );

        try {
          const params =
            new URLSearchParams();

          params.set(
            'page',
            String(pagina)
          );

          params.set(
            'limit',
            '10'
          );

          if (tipo) {
            params.set(
              'tipo_movimiento',
              tipo
            );
          }


          const data =
            await apiFetch(
              `/almacen-producto-terminado/presentaciones/${stock_producto_terminado_id}/movimientos?${params.toString()}`
            );


          setMovimientos(
            data.movimientos ||
            []
          );

          setPaginacion(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el historial de movimientos'
          );

        } finally {
          setCargandoMovimientos(
            false
          );
        }
      },
      [
        message,
        stock_producto_terminado_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await cargarPresentacion();

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el stock del producto';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarPresentacion,
    message
  ]);


  useEffect(() => {
    cargarMovimientos(
      page,
      tipoMovimiento
    );
  }, [
    cargarMovimientos,
    page,
    tipoMovimiento
  ]);


  const fechaHoraTexto = (
    valor?:
      string | null
  ) => {
    if (!valor) {
      return '-';
    }

    const fecha =
      new Date(
        valor
      );

    return Number.isNaN(
      fecha.getTime()
    )
      ? valor
      : fecha.toLocaleString(
          'es-PE'
        );
  };


  const columnas:
    TableColumnsType<
      Movimiento
    > = [
    {
      title: 'Fecha',
      dataIndex:
        'fecha_movimiento',
      key:
        'fecha_movimiento',
      width: 175,

      render: (
        value: string
      ) =>
        fechaHoraTexto(
          value
        )
    },

    {
      title: 'Movimiento',
      dataIndex:
        'tipo_movimiento',
      key:
        'tipo_movimiento',
      width: 190,

      render: (
        value: string
      ) => (
        <Tag
          color={
            esEntrada(
              value
            )
              ? 'success'
              : 'warning'
          }
        >
          {
            tipoTexto(
              value
            )
          }
        </Tag>
      )
    },

    {
      title: 'Cantidad',
      key: 'cantidad',
      width: 165,

      render: (
        _,
        movimiento
      ) => (
        <Text
          strong
          type={
            esEntrada(
              movimiento
                .tipo_movimiento
            )
              ? 'success'
              : 'danger'
          }
        >
          {
            esEntrada(
              movimiento
                .tipo_movimiento
            )
              ? '+'
              : '-'
          }
          {
            formatCantidad(
              movimiento
                .cantidad
            )
          } {
            presentacion
              ?.unidad
          }
        </Text>
      )
    },

    {
      title: 'Origen',
      key: 'origen',
      minWidth: 180,

      render: (
        _,
        movimiento
      ) => {
        if (
          movimiento
            .produccion_id
        ) {
          return (
            <Button
              type="link"
              size="small"
              icon={
                <EyeOutlined />
              }
              onClick={() =>
                navigate(
                  `/gestion/producciones/${movimiento.produccion_id}`
                )
              }
            >
              Ver producción
            </Button>
          );
        }

        if (
          movimiento
            .pedido_id
        ) {
          return (
            <Button
              type="link"
              size="small"
              icon={
                <EyeOutlined />
              }
              onClick={() =>
                navigate(
                  `/gestion/entregas/${movimiento.pedido_id}`
                )
              }
            >
              Ver pedido
            </Button>
          );
        }

        return '-';
      }
    },

    {
      title: 'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',
      minWidth: 220,

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      width: 180,
      responsive: [
        'lg'
      ]
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-almacen-pt-page">

        <Skeleton
          active
          paragraph={{
            rows: 11
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !presentacion
  ) {
    return (
      <div className="gd-almacen-pt-page">

        <BackButton
          to="/gestion/almacen/producto-terminado"
          label="Volver al almacén"
        />


        <Result
          status="error"
          title="No se pudo cargar el stock"
          subTitle={
            errorCarga ||
            'Presentación no encontrada'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-almacen-pt-page">

      <BackButton
        to="/gestion/almacen/producto-terminado"
        label="Volver al almacén"
      />


      <PageHeader
        title={
          `${presentacion.tipo_producto} · ${presentacion.material} · ${presentacion.medida} · ${presentacion.color}`
        }
        description="Stock e historial de movimientos de esta presentación."
        extra={
          presentacion
            .estado_stock ===
            'CON_STOCK'
            ? (
                <Tag color="success">
                  Con stock
                </Tag>
              )
            : (
                <Tag>
                  Agotado
                </Tag>
              )
        }
      />


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-almacen-pt-detail-stats"
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Presentación"
              value={
                Number(
                  presentacion
                    .cantidad_presentacion
                )
              }
              precision={2}
              suffix={
                presentacion
                  .unidad_presentacion
              }
              prefix={
                <ProductOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Stock disponible"
              value={
                Number(
                  presentacion
                    .cantidad_disponible
                )
              }
              precision={2}
              suffix={
                presentacion.unidad
              }
              prefix={
                <InboxOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Presentaciones disponibles"
              value={
                Number(
                  presentacion
                    .presentaciones_disponibles ||
                  0
                )
              }
              precision={2}
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Estado"
              value={
                presentacion
                  .estado_stock ===
                  'CON_STOCK'
                  ? 'Con stock'
                  : 'Agotado'
              }
            />
          </Card>
        </Col>

      </Row>


      <Card
        title="Datos del producto"
        className="gd-almacen-pt-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 3
          }}
          items={[
            {
              key: 'tipo',
              label: 'Tipo',
              children:
                presentacion
                  .tipo_producto
            },

            {
              key: 'material',
              label: 'Material',
              children:
                presentacion
                  .material
            },

            {
              key: 'medida',
              label: 'Medida',
              children:
                presentacion
                  .medida
            },

            {
              key: 'color',
              label: 'Color',
              children:
                presentacion
                  .color
            },

            {
              key: 'unidad',
              label:
                'Unidad base',
              children:
                presentacion.unidad
            },

            {
              key: 'creado-por',
              label:
                'Creado por',
              children:
                presentacion
                  .creado_por
            },

            {
              key: 'descripcion',
              label:
                'Descripción',
              span: 3,
              children:
                presentacion
                  .descripcion_producto ||
                'Sin descripción'
            },

            {
              key: 'creado',
              label:
                'Fecha de creación',
              children:
                fechaHoraTexto(
                  presentacion
                    .created_at
                )
            },

            {
              key: 'actualizado',
              label:
                'Última actualización',
              children:
                fechaHoraTexto(
                  presentacion
                    .updated_at
                )
            },

            {
              key:
                'actualizado-por',
              label:
                'Actualizado por',
              children:
                presentacion
                  .actualizado_por ||
                '-'
            }
          ]}
        />

      </Card>


      <Card
        title="Historial de movimientos"
        extra={
          <Space wrap>

            <Select
              value={
                tipoMovimiento
              }
              className="gd-almacen-pt-history-filter"
              options={
                tiposMovimiento
              }
              onChange={(
                value
              ) => {
                setPage(1);
                setTipoMovimiento(
                  value
                );
              }}
            />

          </Space>
        }
        className="gd-almacen-pt-table-card"
      >

        <div className="gd-almacen-pt-history-summary">

          <Space
            size={6}
          >
            <ArrowUpOutlined />

            <Text
              type="secondary"
            >
              Entradas por producción
            </Text>
          </Space>


          <Space
            size={6}
          >
            <ArrowDownOutlined />

            <Text
              type="secondary"
            >
              Salidas por entrega
            </Text>
          </Space>

        </div>


        <Table<
          Movimiento
        >
          rowKey="movimiento_producto_terminado_id"
          columns={
            columnas
          }
          dataSource={
            movimientos
          }
          loading={
            cargandoMovimientos
          }
          scroll={{
            x: 1050
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No existen movimientos para el filtro seleccionado"
              />
          }}
          pagination={{
            current:
              paginacion.page,

            pageSize:
              paginacion.limit,

            total:
              paginacion.total,

            showSizeChanger:
              false,

            showTotal: (
              total
            ) =>
              `${total} movimiento(s)`,

            onChange: (
              nuevaPagina
            ) =>
              setPage(
                nuevaPagina
              )
          }}
        />

      </Card>

    </div>
  );
}


export default AlmacenProductoTerminadoDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\Catalogos.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType,
  TabsProps
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Empty,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tabs,
  Tag,
  Typography
} from 'antd';

import {
  AppstoreOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SaveOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  apiFetch
} from '../services/api';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import PageHeader
  from '../components/ui/PageHeader';

import '../styles/catalogos.css';


const {
  Text
} = Typography;


type CatalogoKey =
  | 'tiposProducto'
  | 'medidas'
  | 'colores'
  | 'materiales';


type CatalogoConfig = {
  key: CatalogoKey;
  label: string;
  singular: string;
  descripcion: string;
};


type CatalogoItem = {
  id: number;
  nombre: string;
  activo: boolean;
  created_at?: string | null;
};


type CatalogoForm = {
  nombre: string;
};


const catalogos:
  CatalogoConfig[] = [
  {
    key:
      'tiposProducto',
    label:
      'Tipos de producto',
    singular:
      'tipo de producto',
    descripcion:
      'Clasificaciones principales de los productos.'
  },

  {
    key:
      'medidas',
    label:
      'Medidas',
    singular:
      'medida',
    descripcion:
      'Medidas disponibles para identificar los productos.'
  },

  {
    key:
      'colores',
    label:
      'Colores',
    singular:
      'color',
    descripcion:
      'Colores disponibles para productos y materia prima.'
  },

  {
    key:
      'materiales',
    label:
      'Materiales',
    singular:
      'material',
    descripcion:
      'Materiales utilizados en productos y materia prima.'
  }
];


function Catalogos() {
  const {
    message
  } = AntdApp.useApp();

  const [
    formNuevo
  ] = Form.useForm<
    CatalogoForm
  >();

  const [
    formEditar
  ] = Form.useForm<
    CatalogoForm
  >();

  const [
    catalogoActivo,
    setCatalogoActivo
  ] = useState<CatalogoKey>(
    'tiposProducto'
  );

  const [
    items,
    setItems
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    busqueda,
    setBusqueda
  ] = useState('');

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    modalEditarAbierto,
    setModalEditarAbierto
  ] = useState(false);

  const [
    itemEditando,
    setItemEditando
  ] = useState<
    CatalogoItem | null
  >(null);


  const {
    procesando:
      creando,

    intentarBloquear:
      bloquearCreacion,

    liberar:
      liberarCreacion
  } = useBloqueoAccion();


  const {
    procesando:
      editando,

    intentarBloquear:
      bloquearEdicion,

    liberar:
      liberarEdicion
  } = useBloqueoAccion();


  const configActual =
    useMemo(
      () =>
        catalogos.find(
          (catalogo) =>
            catalogo.key ===
            catalogoActivo
        )!,
      [
        catalogoActivo
      ]
    );


  const cargarCatalogo =
    useCallback(
      async (
        key:
          CatalogoKey
      ) => {
        setCargando(true);

        try {
          const data =
            await apiFetch(
              `/catalogos/${key}`
            );

          setItems(
            data.items ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el catálogo'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        message
      ]
    );


  useEffect(() => {
    setBusqueda('');
    formNuevo.resetFields();

    cargarCatalogo(
      catalogoActivo
    );
  }, [
    catalogoActivo,
    cargarCatalogo,
    formNuevo
  ]);


  const itemsFiltrados =
    useMemo(
      () => {
        const query =
          busqueda
            .trim()
            .toLocaleUpperCase(
              'es-PE'
            );

        if (!query) {
          return items;
        }

        return items.filter(
          (item) =>
            item.nombre
              .toLocaleUpperCase(
                'es-PE'
              )
              .includes(
                query
              )
        );
      },
      [
        items,
        busqueda
      ]
    );


  const nombreExiste = (
    nombre: string,
    ignorarId?: number
  ) => {
    const normalizado =
      nombre
        .trim()
        .toLocaleUpperCase(
          'es-PE'
        );

    return items.some(
      (item) =>
        item.id !==
          ignorarId &&
        item.nombre
          .trim()
          .toLocaleUpperCase(
            'es-PE'
          ) ===
          normalizado
    );
  };


  const registrar =
    async (
      values:
        CatalogoForm
    ) => {
      if (
        !bloquearCreacion()
      ) {
        return;
      }

      const nombre =
        values.nombre.trim();

      if (
        nombreExiste(
          nombre
        )
      ) {
        liberarCreacion();

        formNuevo.setFields([
          {
            name: 'nombre',
            errors: [
              'Ya existe un registro con ese nombre'
            ]
          }
        ]);

        return;
      }

      try {
        await apiFetch(
          `/catalogos/${catalogoActivo}`,
          {
            method: 'POST',

            body:
              JSON.stringify({
                nombre
              })
          }
        );


        message.success(
          `${configActual.singular.charAt(0).toUpperCase()}${configActual.singular.slice(1)} creado correctamente`
        );


        formNuevo.resetFields();

        await cargarCatalogo(
          catalogoActivo
        );


        liberarCreacion();

      } catch (error) {
        liberarCreacion();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo crear el registro'
        );
      }
    };


  const abrirEditar = (
    item:
      CatalogoItem
  ) => {
    setItemEditando(
      item
    );

    formEditar.setFieldsValue({
      nombre:
        item.nombre
    });

    setModalEditarAbierto(
      true
    );
  };


  const cerrarEditar = () => {
    if (editando) {
      return;
    }

    setModalEditarAbierto(
      false
    );

    setItemEditando(
      null
    );

    formEditar.resetFields();
  };


  const guardarEdicion =
    async () => {
      if (
        !itemEditando ||
        !bloquearEdicion()
      ) {
        return;
      }

      try {
        const values =
          await formEditar
            .validateFields();

        const nombre =
          values.nombre.trim();


        if (
          nombreExiste(
            nombre,
            itemEditando.id
          )
        ) {
          liberarEdicion();

          formEditar.setFields([
            {
              name: 'nombre',
              errors: [
                'Ya existe un registro con ese nombre'
              ]
            }
          ]);

          return;
        }


        await apiFetch(
          `/catalogos/${catalogoActivo}/${itemEditando.id}`,
          {
            method: 'PUT',

            body:
              JSON.stringify({
                nombre
              })
          }
        );


        message.success(
          'Registro actualizado correctamente'
        );


        setModalEditarAbierto(
          false
        );

        setItemEditando(
          null
        );

        formEditar.resetFields();


        await cargarCatalogo(
          catalogoActivo
        );


        liberarEdicion();

      } catch (error: any) {
        liberarEdicion();

        /*
         * validateFields rechaza con errorFields.
         * En ese caso Ant Design ya muestra el
         * error debajo del campo.
         */
        if (
          error?.errorFields
        ) {
          return;
        }

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el registro'
        );
      }
    };

  const columns:
    TableColumnsType<CatalogoItem> = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',

      render: (
        value:
          string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title: 'Estado',
      key: 'estado',
      width: 130,

      render: () => (
        <Tag
          color="success"
        >
          Activo
        </Tag>
      )
    },

    {
      title:
        'Fecha de registro',
      dataIndex:
        'created_at',
      key:
        'created_at',
      width: 160,
      responsive: [
        'md'
      ],

      render: (
        value?: string | null
      ) =>
        value
          ? value.slice(
              0,
              10
            )
          : '-'
    },

    {
      title: 'Acciones',
      key: 'acciones',
      width: 220,
      fixed: 'right',

      render: (
        _,
        item
      ) => (
        <Space
          size={4}
          wrap
        >

          <Button
            type="text"
            icon={
              <EditOutlined />
            }
            onClick={() =>
              abrirEditar(
                item
              )
            }
          >
            Editar
          </Button>

        </Space>
      )
    }
  ];


  const tabs:
    TabsProps['items'] =
    catalogos.map(
      (catalogo) => ({
        key:
          catalogo.key,
        label:
          catalogo.label
      })
    );


  return (
    <div className="gd-catalogos-page">

      <PageHeader
        title="Catálogos"
        description="Administra los valores utilizados para clasificar productos y materia prima."
      />


      <Card
        className="gd-catalogos-main-card"
      >

        <div className="gd-catalogos-tabs">

          <Tabs
            activeKey={
              catalogoActivo
            }
            items={tabs}
            onChange={(
              key
            ) =>
              setCatalogoActivo(
                key as
                  CatalogoKey
              )
            }
          />

        </div>


        <div className="gd-catalogos-section-header">

          <div>
            <Text strong>
              {
                configActual.label
              }
            </Text>

            <Text
              type="secondary"
            >
              {
                configActual
                  .descripcion
              }
            </Text>
          </div>

          <Tag
            icon={
              <AppstoreOutlined />
            }
            color="blue"
          >
            {
              items.length
            } activo(s)
          </Tag>

        </div>


        <div className="gd-catalogos-content">

          <Card
            size="small"
            title={
              `Agregar ${configActual.singular}`
            }
            className="gd-catalogos-form-card"
          >

            <Form<CatalogoForm>
              form={
                formNuevo
              }
              layout="vertical"
              requiredMark={false}
              onFinish={
                registrar
              }
              disabled={
                creando
              }
            >

              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                  {
                    required: true,
                    message:
                      'Ingresa un nombre'
                  },
                  {
                    whitespace: true,
                    message:
                      'Ingresa un nombre válido'
                  },
                  {
                    max: 100,
                    message:
                      'El nombre no puede superar 100 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  placeholder={
                    `Nombre del ${configActual.singular}`
                  }
                  maxLength={100}
                  autoComplete="off"
                />
              </Form.Item>


              <Button
                type="primary"
                htmlType="submit"
                block
                icon={
                  <PlusOutlined />
                }
                loading={
                  creando
                }
              >
                Agregar
              </Button>

            </Form>

          </Card>


          <div className="gd-catalogos-list-area">

            <div className="gd-catalogos-toolbar">

              <Input
                allowClear
                prefix={
                  <SearchOutlined />
                }
                placeholder={
                  `Buscar en ${configActual.label.toLowerCase()}`
                }
                value={
                  busqueda
                }
                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }
              />


              <Button
                icon={
                  <ReloadOutlined />
                }
                loading={
                  cargando
                }
                onClick={() =>
                  cargarCatalogo(
                    catalogoActivo
                  )
                }
              >
                Actualizar
              </Button>

            </div>


            <Table<CatalogoItem>
              rowKey="id"
              columns={
                columns
              }
              dataSource={
                itemsFiltrados
              }
              loading={
                cargando
              }
              scroll={{
                x: 680
              }}
              locale={{
                emptyText:
                  <Empty
                    image={
                      Empty
                        .PRESENTED_IMAGE_SIMPLE
                    }
                    description={
                      busqueda
                        ? 'No se encontraron registros'
                        : 'No hay registros activos'
                    }
                  />
              }}
              pagination={{
                pageSize: 10,
                showSizeChanger:
                  false,
                hideOnSinglePage:
                  itemsFiltrados
                    .length <=
                  10,

                showTotal: (
                  total
                ) =>
                  `${total} registro(s)`
              }}
            />

          </div>

        </div>

      </Card>


      <Modal
        open={
          modalEditarAbierto
        }
        title={
          `Editar ${configActual.singular}`
        }
        okText="Guardar cambios"
        cancelText="Cancelar"
        confirmLoading={
          editando
        }
        okButtonProps={{
          icon:
            <SaveOutlined />
        }}
        onOk={
          guardarEdicion
        }
        onCancel={
          cerrarEditar
        }
        destroyOnHidden
      >

        <Form<CatalogoForm>
          form={
            formEditar
          }
          layout="vertical"
          requiredMark={false}
          className="gd-catalogos-edit-form"
        >

          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
              {
                required: true,
                message:
                  'Ingresa un nombre'
              },
              {
                whitespace: true,
                message:
                  'Ingresa un nombre válido'
              },
              {
                max: 100,
                message:
                  'El nombre no puede superar 100 caracteres'
              }
            ]}
          >
            <Input
              size="large"
              maxLength={100}
              autoComplete="off"
            />
          </Form.Item>

        </Form>

      </Modal>

    </div>
  );
}


export default Catalogos;


<<<END OF FILE>>>


---

## FILE: src\pages\Clientes.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

function Clientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState({
    ruc: '',
    razon_social: '',
    direccion: '',
    telefono: '',
    correo: ''
  });

  const cargarClientes = async () => {
    try {
      const data = await apiFetch('/clientes');
      setClientes(data.clientes);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registrarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await apiFetch('/clientes', {
        method: 'POST',
        body: JSON.stringify(form)
      });

      setMensaje('Cliente registrado correctamente');
      setForm({
        ruc: '',
        razon_social: '',
        direccion: '',
        telefono: '',
        correo: ''
      });

      cargarClientes();

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Clientes</h1>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card" onSubmit={registrarCliente}>
        <h3>Registrar cliente</h3>

        <input name="ruc" placeholder="RUC" value={form.ruc} onChange={handleChange} />
        <input name="razon_social" placeholder="Razón social" value={form.razon_social} onChange={handleChange} />
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
        <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />

        <button type="submit">Guardar cliente</button>
      </form>

      <div className="tabla-card">
        <h3>Listado de clientes</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>RUC</th>
              <th>Razón social</th>
              <th>Dirección</th>
              <th>Teléfono</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.cliente_id}>
                <td>{cliente.cliente_id}</td>
                <td>{cliente.ruc}</td>
                <td>{cliente.razon_social}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;

<<<END OF FILE>>>


---

## FILE: src\pages\clientes\ClientesLista.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Empty,
  Input,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DollarOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/clientes.css';


const {
  Text
} = Typography;


type Cliente = {
  cliente_id: number;
  ruc: string;
  razon_social: string;
  direccion?: string | null;
  telefono?: string | null;
  correo?: string | null;
  agencia_entrega?: string | null;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function ClientesLista() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    clientes,
    setClientes
  ] = useState<Cliente[]>([]);

  const [
    busqueda,
    setBusqueda
  ] = useState('');

  const [
    busquedaAplicada,
    setBusquedaAplicada
  ] = useState('');

  const [
    page,
    setPage
  ] = useState(1);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarClientes =
    useCallback(
      async (
        pagina: number,
        query: string
      ) => {
        setCargando(true);

        try {
          const params =
            new URLSearchParams();

          params.set(
            'page',
            String(pagina)
          );

          params.set(
            'limit',
            '10'
          );

          if (
            query.trim()
          ) {
            params.set(
              'q',
              query.trim()
            );
          }

          const data =
            await apiFetch(
              `/clientes?${params.toString()}`
            );

          setClientes(
            data.clientes || []
          );

          setPaginacion(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los clientes'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        message
      ]
    );


  useEffect(() => {
    cargarClientes(
      page,
      busquedaAplicada
    );
  }, [
    page,
    busquedaAplicada,
    cargarClientes
  ]);


  const buscar = (
    valor?: string
  ) => {
    const query =
      (
        valor ??
        busqueda
      ).trim();

    setBusqueda(
      query
    );

    setPage(1);
    setBusquedaAplicada(
      query
    );
  };


  const limpiar = () => {
    setBusqueda('');
    setPage(1);
    setBusquedaAplicada('');
  };


  const columns:
    TableColumnsType<Cliente> = [
    {
      title: 'RUC',
      dataIndex: 'ruc',
      key: 'ruc',
      width: 130,

      render: (
        value: string
      ) => (
        <Text code>
          {value}
        </Text>
      )
    },

    {
      title:
        'Razón social',
      dataIndex:
        'razon_social',
      key:
        'razon_social',
      minWidth: 220,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title: 'Dirección',
      dataIndex: 'direccion',
      key: 'direccion',
      responsive: [
        'lg'
      ],

      render: (
        value?: string | null
      ) =>
        value || '-'
    },

    {
      title: 'Agencia',
      dataIndex:
        'agencia_entrega',
      key:
        'agencia_entrega',
      responsive: [
        'md'
      ],

      render: (
        value?: string | null
      ) =>
        value
          ? (
              <Tag>
                {value}
              </Tag>
            )
          : '-'
    },

    {
      title: 'Teléfono',
      dataIndex:
        'telefono',
      key:
        'telefono',
      responsive: [
        'xl'
      ],

      render: (
        value?: string | null
      ) =>
        value || '-'
    },

    {
      title: 'Correo',
      dataIndex:
        'correo',
      key:
        'correo',
      responsive: [
        'lg'
      ],

      render: (
        value?: string | null
      ) =>
        value || '-'
    },

    {
      title: 'Acciones',
      key: 'acciones',
      fixed: 'right',
      width: 190,

      render: (
        _,
        cliente
      ) => (
        <Space
          size={4}
          wrap
        >

          <Button
            type="text"
            icon={
              <EditOutlined />
            }
            onClick={() =>
              navigate(
                `/gestion/clientes/${cliente.cliente_id}/editar`
              )
            }
          >
            Editar
          </Button>


          <Button
            type="link"
            icon={
              <DollarOutlined />
            }
            onClick={() =>
              navigate(
                `/gestion/clientes/precios?cliente_id=${cliente.cliente_id}`
              )
            }
          >
            Precios
          </Button>

        </Space>
      )
    }
  ];


  return (
    <div className="gd-clientes-page">

      <PageHeader
        title="Clientes"
        description="Consulta y administra la información comercial de tus clientes."
        extra={
          <Space
            wrap
          >

            <Button
              icon={
                <DollarOutlined />
              }
              onClick={() =>
                navigate(
                  '/gestion/clientes/precios'
                )
              }
            >
              Historial de precios
            </Button>


            <Button
              type="primary"
              icon={
                <PlusOutlined />
              }
              onClick={() =>
                navigate(
                  '/gestion/clientes/registrar'
                )
              }
            >
              Registrar cliente
            </Button>

          </Space>
        }
      />


      <Card
        className="gd-clientes-filter-card"
      >

        <div className="gd-clientes-filter-row">

          <Input.Search
            allowClear
            size="large"
            value={
              busqueda
            }
            prefix={
              <SearchOutlined />
            }
            placeholder="Buscar por RUC, razón social, dirección o agencia"
            enterButton="Buscar"
            onChange={(e) =>
              setBusqueda(
                e.target.value
              )
            }
            onSearch={
              buscar
            }
          />


          <Space>

            <Button
              onClick={
                limpiar
              }
              disabled={
                !busqueda &&
                !busquedaAplicada
              }
            >
              Limpiar
            </Button>


            <Button
              icon={
                <ReloadOutlined />
              }
              loading={
                cargando
              }
              onClick={() =>
                cargarClientes(
                  page,
                  busquedaAplicada
                )
              }
            >
              Actualizar
            </Button>

          </Space>

        </div>

      </Card>


      <Card
        title="Listado de clientes"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } cliente(s)
          </Text>
        }
        className="gd-clientes-table-card"
      >

        <Table<Cliente>
          rowKey="cliente_id"
          columns={columns}
          dataSource={
            clientes
          }
          loading={
            cargando
          }
          scroll={{
            x: 900
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay clientes para mostrar"
              />
          }}
          pagination={{
            current:
              paginacion.page,
            pageSize:
              paginacion.limit,
            total:
              paginacion.total,
            showSizeChanger:
              false,
            hideOnSinglePage:
              false,
            showTotal: (
              total
            ) =>
              `${total} cliente(s)`,

            onChange: (
              nuevaPagina
            ) => {
              setPage(
                nuevaPagina
              );
            }
          }}
        />

      </Card>

    </div>
  );
}


export default ClientesLista;


<<<END OF FILE>>>


---

## FILE: src\pages\clientes\EditarCliente.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Button,
  Card,
  Form,
  Result,
  Skeleton,
  Space
} from 'antd';

import {
  SaveOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useState
} from 'react';

import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import ClienteForm
  from '../../components/clientes/ClienteForm';

import type {
  ClienteFormData
} from '../../components/clientes/ClienteForm';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/clientes.css';


function EditarCliente() {
  const {
    cliente_id
  } = useParams();

  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    ClienteFormData
  >();

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          const data =
            await apiFetch(
              `/clientes/${cliente_id}`
            );

          form.setFieldsValue({
            ruc:
              data.cliente.ruc ||
              '',

            razon_social:
              data.cliente
                .razon_social ||
              '',

            direccion:
              data.cliente
                .direccion ||
              '',

            telefono:
              data.cliente
                .telefono ||
              '',

            correo:
              data.cliente
                .correo ||
              '',

            agencia_entrega:
              data.cliente
                .agencia_entrega ||
              ''
          });

        } catch (error) {
          setErrorCarga(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el cliente'
          );

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    cliente_id,
    form
  ]);


  const editarCliente =
    async (
      values:
        ClienteFormData
    ) => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        await apiFetch(
          `/clientes/${cliente_id}`,
          {
            method: 'PUT',

            body:
              JSON.stringify({
                ruc:
                  values.ruc.trim(),

                razon_social:
                  values
                    .razon_social
                    .trim(),

                direccion:
                  values.direccion
                    ?.trim() || '',

                telefono:
                  values.telefono
                    ?.trim() || '',

                correo:
                  values.correo
                    ?.trim() || '',

                agencia_entrega:
                  values
                    .agencia_entrega
                    ?.trim() || ''
              })
          }
        );


        message.success(
          'Cliente actualizado correctamente'
        );


        navigate(
          '/gestion/clientes',
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el cliente'
        );
      }
    };


  return (
    <div className="gd-clientes-page">

      <BackButton
        to="/gestion/clientes"
        label="Volver a clientes"
      />


      <PageHeader
        title="Editar cliente"
        description="Actualiza la información comercial del cliente."
      />


      <Card
        title="Datos del cliente"
        className="gd-clientes-form-card"
      >

        {cargando
          ? (
              <Skeleton
                active
                paragraph={{
                  rows: 6
                }}
              />
            )
          : errorCarga
            ? (
                <Result
                  status="error"
                  title="No se pudo cargar el cliente"
                  subTitle={
                    errorCarga
                  }
                  extra={
                    <Button
                      onClick={() =>
                        navigate(
                          '/gestion/clientes'
                        )
                      }
                    >
                      Volver a clientes
                    </Button>
                  }
                />
              )
            : (
                <Form<ClienteFormData>
                  form={form}
                  layout="vertical"
                  requiredMark={false}
                  onFinish={
                    editarCliente
                  }
                  disabled={
                    procesando
                  }
                >

                  <ClienteForm
                    disabled={
                      procesando
                    }
                  />


                  <div className="gd-clientes-form-actions">

                    <Space
                      wrap
                    >

                      <Button
                        onClick={() =>
                          navigate(
                            '/gestion/clientes'
                          )
                        }
                        disabled={
                          procesando
                        }
                      >
                        Cancelar
                      </Button>


                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={
                          <SaveOutlined />
                        }
                        loading={
                          procesando
                        }
                      >
                        Guardar cambios
                      </Button>

                    </Space>

                  </div>

                </Form>
              )
        }

      </Card>

    </div>
  );
}


export default EditarCliente;


<<<END OF FILE>>>


---

## FILE: src\pages\clientes\HistorialPreciosCliente.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DollarOutlined,
  ReloadOutlined,
  SaveOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useSearchParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatPrecio
} from '../../utils/formatters';

import '../../styles/clientes.css';


const {
  Text
} = Typography;

const {
  TextArea
} = Input;


type ClienteOption = {
  cliente_id: number;
  razon_social: string;
  ruc: string;
};


type CatalogoItem = {
  id: number;
  nombre: string;
};


type Precio = {
  precio_cliente_id: number;
  cliente_id: number;
  razon_social: string;
  ruc: string;
  tipo_producto: string;
  medida: string;
  color: string;
  material: string;
  fecha_precio: string;
  precio_unitario: number;
  moneda_codigo: 'PEN' | 'USD';
  registrado_por: string;
  observacion?: string | null;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


type PrecioFormValues = {
  cliente_id: number;
  tipo_producto_id: number;
  medida_id: number;
  color_id: number;
  material_id: number;
  fecha_precio?: any;
  precio_unitario: number;
  moneda_codigo: 'PEN' | 'USD';
  observacion?: string;
};


type FiltroValues = {
  cliente_id?: number;
  q?: string;
};


function HistorialPreciosCliente() {
  const [
    searchParams
  ] = useSearchParams();

  const clienteIdInicial =
    searchParams.get(
      'cliente_id'
    );

  const {
    message
  } = AntdApp.useApp();

  const [
    formPrecio
  ] = Form.useForm<
    PrecioFormValues
  >();

  const [
    formFiltros
  ] = Form.useForm<
    FiltroValues
  >();

  const [
    clientes,
    setClientes
  ] = useState<
    ClienteOption[]
  >([]);

  const [
    precios,
    setPrecios
  ] = useState<
    Precio[]
  >([]);

  const [
    tipos,
    setTipos
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    medidas,
    setMedidas
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    colores,
    setColores
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    materiales,
    setMateriales
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<FiltroValues>({
    cliente_id:
      clienteIdInicial
        ? Number(
            clienteIdInicial
          )
        : undefined,

    q: ''
  });

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [
    cargandoBase,
    setCargandoBase
  ] = useState(true);

  const [
    cargandoPrecios,
    setCargandoPrecios
  ] = useState(true);

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const cargarBase =
    useCallback(
      async () => {
        setCargandoBase(true);

        try {
          const [
            clientesData,
            tiposData,
            medidasData,
            coloresData,
            materialesData
          ] = await Promise.all([
            apiFetch(
              '/clientes/select'
            ),

            apiFetch(
              '/catalogos/tiposProducto'
            ),

            apiFetch(
              '/catalogos/medidas'
            ),

            apiFetch(
              '/catalogos/colores'
            ),

            apiFetch(
              '/catalogos/materiales'
            )
          ]);


          setClientes(
            clientesData.clientes ||
            []
          );

          setTipos(
            tiposData.items ||
            []
          );

          setMedidas(
            medidasData.items ||
            []
          );

          setColores(
            coloresData.items ||
            []
          );

          setMateriales(
            materialesData.items ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos necesarios'
          );

        } finally {
          setCargandoBase(false);
        }
      },
      [
        message
      ]
    );


  const cargarPrecios =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltroValues
      ) => {
        setCargandoPrecios(
          true
        );

        try {
          const params =
            new URLSearchParams();

          params.set(
            'page',
            String(pagina)
          );

          params.set(
            'limit',
            '10'
          );

          if (
            filtros.cliente_id
          ) {
            params.set(
              'cliente_id',
              String(
                filtros
                  .cliente_id
              )
            );
          }

          if (
            filtros.q
              ?.trim()
          ) {
            params.set(
              'q',
              filtros.q.trim()
            );
          }

          const data =
            await apiFetch(
              `/clientes/precios?${params.toString()}`
            );

          setPrecios(
            data.precios ||
            []
          );

          setPaginacion(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el historial de precios'
          );

        } finally {
          setCargandoPrecios(
            false
          );
        }
      },
      [
        message
      ]
    );


  useEffect(() => {
    cargarBase();

    formPrecio.setFieldsValue({
      cliente_id:
        clienteIdInicial
          ? Number(
              clienteIdInicial
            )
          : undefined,

      moneda_codigo: 'PEN'
    });

    formFiltros.setFieldsValue({
      cliente_id:
        clienteIdInicial
          ? Number(
              clienteIdInicial
            )
          : undefined,

      q: ''
    });
  }, [
    clienteIdInicial,
    cargarBase,
    formPrecio,
    formFiltros
  ]);


  useEffect(() => {
    cargarPrecios(
      page,
      filtrosAplicados
    );
  }, [
    page,
    filtrosAplicados,
    cargarPrecios
  ]);


  const clienteOptions =
    useMemo(
      () =>
        clientes.map(
          (cliente) => ({
            value:
              cliente.cliente_id,

            label:
              `${cliente.razon_social} · ${cliente.ruc}`
          })
        ),
      [
        clientes
      ]
    );


  const registrarPrecio =
    async (
      values:
        PrecioFormValues
    ) => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      const clienteActual =
        values.cliente_id;

      try {
        await apiFetch(
          '/clientes/precios',
          {
            method: 'POST',

            body:
              JSON.stringify({
                cliente_id:
                  Number(
                    values.cliente_id
                  ),

                tipo_producto_id:
                  Number(
                    values
                      .tipo_producto_id
                  ),

                medida_id:
                  Number(
                    values.medida_id
                  ),

                color_id:
                  Number(
                    values.color_id
                  ),

                material_id:
                  Number(
                    values.material_id
                  ),

                fecha_precio:
                  values
                    .fecha_precio
                    ?.format(
                      'YYYY-MM-DD'
                    ) ||
                  undefined,

                precio_unitario:
                  Number(
                    values
                      .precio_unitario
                  ),

                moneda_codigo:
                  values
                    .moneda_codigo,

                observacion:
                  values
                    .observacion
                    ?.trim() ||
                  ''
              })
          }
        );


        message.success(
          'Precio registrado correctamente'
        );


        formPrecio.resetFields();

        formPrecio.setFieldsValue({
          cliente_id:
            clienteActual,
          moneda_codigo:
            'PEN'
        });


        setPage(1);

        await cargarPrecios(
          1,
          filtrosAplicados
        );


        liberar();

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el precio'
        );
      }
    };


  const aplicarFiltros =
    (
      values:
        FiltroValues
    ) => {
      setPage(1);

      setFiltrosAplicados({
        cliente_id:
          values.cliente_id,

        q:
          values.q
            ?.trim() ||
          ''
      });
    };


  const limpiarFiltros =
    () => {
      formFiltros.resetFields();

      setPage(1);

      setFiltrosAplicados({
        cliente_id:
          undefined,
        q: ''
      });
    };


  const columns:
    TableColumnsType<Precio> = [
    {
      title: 'Cliente',
      key: 'cliente',
      minWidth: 210,

      render: (
        _,
        precio
      ) => (
        <div className="gd-precio-cliente">

          <Text strong>
            {
              precio
                .razon_social
            }
          </Text>

          <Text
            type="secondary"
          >
            {precio.ruc}
          </Text>

        </div>
      )
    },

    {
      title: 'Producto',
      key: 'producto',
      minWidth: 220,

      render: (
        _,
        precio
      ) => (
        <Space
          size={[
            4,
            4
          ]}
          wrap
        >

          <Tag>
            {
              precio
                .tipo_producto
            }
          </Tag>

          <Tag>
            {
              precio.medida
            }
          </Tag>

          <Tag>
            {
              precio.color
            }
          </Tag>

          <Tag>
            {
              precio.material
            }
          </Tag>

        </Space>
      )
    },

    {
      title: 'Fecha',
      dataIndex:
        'fecha_precio',
      key:
        'fecha_precio',
      width: 120,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Precio',
      key: 'precio',
      width: 160,

      render: (
        _,
        precio
      ) => (
        <Space
          size={6}
        >

          <Text strong>
            {
              formatPrecio(
                precio
                  .precio_unitario
              )
            }
          </Text>

          <Tag
            color={
              precio
                .moneda_codigo ===
                'PEN'
                ? 'blue'
                : 'green'
            }
          >
            {
              precio
                .moneda_codigo
            }
          </Tag>

        </Space>
      )
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      responsive: [
        'lg'
      ]
    },

    {
      title:
        'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',
      responsive: [
        'xl'
      ],

      render: (
        value?: string | null
      ) =>
        value || '-'
    }
  ];


  return (
    <div className="gd-clientes-page">

      <BackButton
        to="/gestion/clientes"
        label="Volver a clientes"
      />


      <PageHeader
        title="Historial de precios"
        description="Consulta y registra los precios acordados por cliente y producto."
      />


      <Card
        title="Registrar precio"
        className="gd-clientes-form-card gd-precios-form-card"
      >

        <Form<PrecioFormValues>
          form={
            formPrecio
          }
          layout="vertical"
          requiredMark={false}
          onFinish={
            registrarPrecio
          }
          disabled={
            procesando ||
            cargandoBase
          }
          initialValues={{
            moneda_codigo:
              'PEN'
          }}
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              lg={12}
            >

              <Form.Item
                label="Cliente"
                name="cliente_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona un cliente'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Selecciona un cliente"
                  loading={
                    cargandoBase
                  }
                  options={
                    clienteOptions
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
            >

              <Form.Item
                label="Moneda"
                name="moneda_codigo"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona la moneda'
                  }
                ]}
              >
                <Select
                  size="large"
                  options={[
                    {
                      value:
                        'PEN',
                      label:
                        'Soles (PEN)'
                    },
                    {
                      value:
                        'USD',
                      label:
                        'Dólares (USD)'
                    }
                  ]}
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
            >

              <Form.Item
                label="Fecha del precio"
                name="fecha_precio"
              >
                <DatePicker
                  size="large"
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  placeholder="Hoy si se deja vacío"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
            >

              <Form.Item
                label="Tipo"
                name="tipo_producto_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona el tipo'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Tipo"
                  options={
                    tipos.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
            >

              <Form.Item
                label="Medida"
                name="medida_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona la medida'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Medida"
                  options={
                    medidas.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
            >

              <Form.Item
                label="Color"
                name="color_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona el color'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Color"
                  options={
                    colores.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
            >

              <Form.Item
                label="Material"
                name="material_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona el material'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Material"
                  options={
                    materiales.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={8}
            >

              <Form.Item
                label="Precio unitario"
                name="precio_unitario"
                rules={[
                  {
                    required: true,
                    message:
                      'Ingresa el precio'
                  }
                ]}
              >
                <InputNumber
                  size="large"
                  min={0.01}
                  precision={2}
                  step={0.01}
                  className="gd-full-width"
                  placeholder="0.00"
                  prefix={
                    <DollarOutlined />
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={16}
            >

              <Form.Item
                label="Observación"
                name="observacion"
              >
                <TextArea
                  rows={2}
                  maxLength={300}
                  showCount
                  placeholder="Ejemplo: Precio acordado por volumen"
                />
              </Form.Item>

            </Col>

          </Row>


          <div className="gd-clientes-form-actions">

            <Button
              type="primary"
              htmlType="submit"
              icon={
                <SaveOutlined />
              }
              loading={
                procesando
              }
              disabled={
                cargandoBase
              }
            >
              Guardar precio
            </Button>

          </div>

        </Form>

      </Card>


      <Card
        title="Filtros"
        className="gd-clientes-filter-card gd-precios-filter-card"
      >

        <Form<FiltroValues>
          form={
            formFiltros
          }
          layout="vertical"
          requiredMark={false}
          onFinish={
            aplicarFiltros
          }
        >

          <Row
            gutter={[
              16,
              0
            ]}
            align="bottom"
          >

            <Col
              xs={24}
              lg={10}
            >

              <Form.Item
                label="Cliente"
                name="cliente_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos los clientes"
                  loading={
                    cargandoBase
                  }
                  options={
                    clienteOptions
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={8}
            >

              <Form.Item
                label="Buscar producto"
                name="q"
              >
                <Input
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Tipo, medida, color o material"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={6}
            >

              <Form.Item
                label=" "
                className="gd-filter-actions-item"
              >

                <Space
                  wrap
                >

                  <Button
                    htmlType="submit"
                    type="primary"
                    icon={
                      <SearchOutlined />
                    }
                  >
                    Buscar
                  </Button>


                  <Button
                    onClick={
                      limpiarFiltros
                    }
                  >
                    Limpiar
                  </Button>


                  <Button
                    icon={
                      <ReloadOutlined />
                    }
                    loading={
                      cargandoPrecios
                    }
                    onClick={() =>
                      cargarPrecios(
                        page,
                        filtrosAplicados
                      )
                    }
                  >
                    Actualizar
                  </Button>

                </Space>

              </Form.Item>

            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Historial de precios"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } registro(s)
          </Text>
        }
        className="gd-clientes-table-card"
      >

        <Table<Precio>
          rowKey="precio_cliente_id"
          columns={columns}
          dataSource={
            precios
          }
          loading={
            cargandoPrecios
          }
          scroll={{
            x: 900
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay precios registrados"
              />
          }}
          pagination={{
            current:
              paginacion.page,
            pageSize:
              paginacion.limit,
            total:
              paginacion.total,
            showSizeChanger:
              false,
            showTotal: (
              total
            ) =>
              `${total} registro(s)`,

            onChange: (
              nuevaPagina
            ) => {
              setPage(
                nuevaPagina
              );
            }
          }}
        />

      </Card>

    </div>
  );
}


export default HistorialPreciosCliente;


<<<END OF FILE>>>


---

## FILE: src\pages\clientes\RegistrarCliente.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Button,
  Card,
  Form,
  Space
} from 'antd';

import {
  SaveOutlined
} from '@ant-design/icons';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import ClienteForm
  from '../../components/clientes/ClienteForm';

import type {
  ClienteFormData
} from '../../components/clientes/ClienteForm';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/clientes.css';


function RegistrarCliente() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    ClienteFormData
  >();

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const registrarCliente =
    async (
      values:
        ClienteFormData
    ) => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        const payload = {
          ruc:
            values.ruc.trim(),

          razon_social:
            values
              .razon_social
              .trim(),

          direccion:
            values.direccion
              ?.trim() || '',

          telefono:
            values.telefono
              ?.trim() || '',

          correo:
            values.correo
              ?.trim() || '',

          agencia_entrega:
            values
              .agencia_entrega
              ?.trim() || ''
        };


        await apiFetch(
          '/clientes',
          {
            method: 'POST',
            body:
              JSON.stringify(
                payload
              )
          }
        );


        message.success(
          'Cliente registrado correctamente'
        );


        navigate(
          '/gestion/clientes',
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el cliente'
        );
      }
    };


  return (
    <div className="gd-clientes-page">

      <BackButton
        to="/gestion/clientes"
        label="Volver a clientes"
      />


      <PageHeader
        title="Registrar cliente"
        description="Agrega la información comercial del nuevo cliente."
      />


      <Card
        title="Datos del cliente"
        className="gd-clientes-form-card"
      >

        <Form<ClienteFormData>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={
            registrarCliente
          }
          disabled={
            procesando
          }
          initialValues={{
            ruc: '',
            razon_social: '',
            direccion: '',
            telefono: '',
            correo: '',
            agencia_entrega: ''
          }}
        >

          <ClienteForm
            disabled={
              procesando
            }
          />


          <div className="gd-clientes-form-actions">

            <Space
              wrap
            >

              <Button
                onClick={() =>
                  navigate(
                    '/gestion/clientes'
                  )
                }
                disabled={
                  procesando
                }
              >
                Cancelar
              </Button>


              <Button
                type="primary"
                htmlType="submit"
                icon={
                  <SaveOutlined />
                }
                loading={
                  procesando
                }
              >
                Guardar cliente
              </Button>

            </Space>

          </div>

        </Form>

      </Card>

    </div>
  );
}


export default RegistrarCliente;


<<<END OF FILE>>>


---

## FILE: src\pages\CompraDetalle.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Card,
  Descriptions,
  Empty,
  Result,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  ShoppingCartOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import BackButton
  from '../components/ui/BackButton';

import PageHeader
  from '../components/ui/PageHeader';

import {
  formatCantidad,
  formatMonto,
  formatPrecio
} from '../utils/formatters';

import '../styles/comprasGeneralesAntd.css';


const {
  Text
} = Typography;


type CompraDetalleItem = {
  compra_detalle_id: number;

  producto_id?:
    number | null;

  material_id?:
    number | null;

  material?:
    string | null;

  descripcion_item:
    string;

  cantidad:
    number;

  unidad_medida_id:
    number;

  unidad:
    string;

  precio_unitario:
    number;

  subtotal:
    number;
};


type Compra = {
  compra_id: number;
  proveedor_id: number;

  ruc: string;
  razon_social: string;
  direccion?:
    string | null;

  fecha_compra:
    string;

  numero_documento?:
    string | null;

  monto_total:
    number;

  moneda_codigo:
    'PEN' | 'USD';

  descripcion?:
    string | null;

  created_at?:
    string | null;

  registrado_por:
    string;

  detalles:
    CompraDetalleItem[];
};


function CompraDetalle() {
  const {
    compra_id
  } = useParams();

  const {
    message
  } = AntdApp.useApp();

  const [
    compra,
    setCompra
  ] = useState<
    Compra | null
  >(null);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          const data =
            await apiFetch(
              `/compras/${compra_id}`
            );

          setCompra(
            data.compra
          );

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar la compra';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    compra_id,
    message
  ]);


  const tieneMaterialHistorico =
    useMemo(
      () =>
        Boolean(
          compra?.detalles.some(
            (item) =>
              item.material_id ||
              item.material
          )
        ),
      [
        compra
      ]
    );


  const columns:
    TableColumnsType<
      CompraDetalleItem
    > = [
    {
      title: 'Descripción',
      dataIndex:
        'descripcion_item',
      key:
        'descripcion_item',
      minWidth: 260,

      render: (
        value: string
      ) => (
        <Text strong>
          {value || '-'}
        </Text>
      )
    },

    ...(tieneMaterialHistorico
      ? [
          {
            title:
              'Material registrado',
            dataIndex:
              'material',
            key:
              'material',
            width: 180,

            render: (
              value?:
                string | null
            ) =>
              value
                ? (
                    <Tag color="default">
                      {value}
                    </Tag>
                  )
                : '-'
          }
        ]
      : []
    ),

    {
      title: 'Cantidad',
      key: 'cantidad',
      width: 150,

      render: (
        _,
        item
      ) =>
        `${formatCantidad(item.cantidad)} ${item.unidad}`
    },

    {
      title:
        'Precio unitario',
      dataIndex:
        'precio_unitario',
      key:
        'precio_unitario',
      width: 160,

      render: (
        value: number
      ) =>
        `${formatPrecio(value)} ${compra?.moneda_codigo || ''}`
    },

    {
      title: 'Subtotal',
      dataIndex:
        'subtotal',
      key:
        'subtotal',
      width: 165,

      render: (
        value: number
      ) => (
        <Text strong>
          {
            formatMonto(
              value
            )
          } {
            compra
              ?.moneda_codigo
          }
        </Text>
      )
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-compras-page">

        <Skeleton
          active
          paragraph={{
            rows: 10
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !compra
  ) {
    return (
      <div className="gd-compras-page">

        <BackButton
          to="/gestion/compras"
          label="Volver a compras"
        />


        <Result
          status="error"
          title="No se pudo cargar la compra"
          subTitle={
            errorCarga ||
            'Compra no encontrada'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-compras-page">

      <BackButton
        to="/gestion/compras"
        label="Volver a compras"
      />


      <PageHeader
        title={
          compra.numero_documento
            ? `Compra · ${compra.numero_documento}`
            : 'Detalle de compra'
        }
        description={
          `${compra.razon_social} · ${compra.ruc}`
        }
        extra={
          <Tag
            color={
              compra
                .moneda_codigo ===
                'PEN'
                ? 'blue'
                : 'green'
            }
          >
            {
              compra
                .moneda_codigo
            }
          </Tag>
        }
      />


      <Card
        title="Datos de la compra"
        className="gd-compras-register-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 3
          }}
          items={[
            {
              key: 'proveedor',
              label: 'Proveedor',
              children:
                compra
                  .razon_social
            },

            {
              key: 'ruc',
              label: 'RUC',
              children:
                compra.ruc
            },

            {
              key: 'fecha',
              label: 'Fecha de compra',
              children:
                compra
                  .fecha_compra
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key: 'documento',
              label: 'Documento',
              children:
                compra
                  .numero_documento ||
                '-'
            },

            {
              key: 'moneda',
              label: 'Moneda',
              children:
                compra
                  .moneda_codigo ===
                'PEN'
                  ? 'Soles (PEN)'
                  : 'Dólares (USD)'
            },

            {
              key: 'usuario',
              label: 'Registrado por',
              children:
                compra
                  .registrado_por
            },

            {
              key: 'direccion',
              label: 'Dirección del proveedor',
              span: 3,
              children:
                compra.direccion ||
                '-'
            },

            {
              key: 'descripcion',
              label: 'Descripción general',
              span: 3,
              children:
                compra.descripcion ||
                'Sin descripción general'
            }
          ]}
        />

      </Card>


      <Card
        title="Ítems de compra"
        extra={
          <Text
            type="secondary"
          >
            {
              compra
                .detalles
                .length
            } ítem(s)
          </Text>
        }
        className="gd-compras-table-card"
      >

        <Table<
          CompraDetalleItem
        >
          rowKey="compra_detalle_id"
          columns={columns}
          dataSource={
            compra.detalles
          }
          pagination={false}
          scroll={{
            x:
              tieneMaterialHistorico
                ? 900
                : 720
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="La compra no tiene ítems registrados"
              />
          }}
        />

      </Card>


      <Card
        className="gd-compra-detail-total-card"
      >

        <Space
          className="gd-compra-detail-total-space"
          wrap
        >

          <Statistic
            title="Ítems"
            value={
              compra
                .detalles
                .length
            }
          />


          <Statistic
            title="Total de compra"
            value={
              Number(
                compra
                  .monto_total
              )
            }
            precision={2}
            suffix={
              compra
                .moneda_codigo
            }
            prefix={
              <ShoppingCartOutlined />
            }
          />

        </Space>

      </Card>

    </div>
  );
}


export default CompraDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\Compras.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

import type {
  Dayjs
} from 'dayjs';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import PageHeader
  from '../components/ui/PageHeader';

import {
  formatCantidad,
  formatMonto,
  formatPrecio
} from '../utils/formatters';

import '../styles/comprasGeneralesAntd.css';


const {
  Text
} = Typography;

const {
  TextArea
} = Input;


type Proveedor = {
  proveedor_id: number;
  ruc: string;
  razon_social: string;
};


type Unidad = {
  unidad_medida_id: number;
  codigo: string;
  descripcion?: string | null;
};


type DetalleCompraForm = {
  descripcion_item?: string;
  cantidad?: number;
  unidad_medida_id?: number;
  precio_unitario?: number;
};


type CompraForm = {
  proveedor_id: number;
  fecha_compra?: Dayjs | null;
  numero_documento?: string;
  moneda_codigo: 'PEN' | 'USD';
  descripcion?: string;
  detalles:
    DetalleCompraForm[];
};


type CompraListado = {
  compra_id: number;
  proveedor_id: number;
  ruc: string;
  razon_social: string;

  fecha_compra: string;
  numero_documento?: string | null;

  monto_total: number;
  moneda_codigo:
    'PEN' | 'USD';

  descripcion?: string | null;
  created_at?: string | null;
  registrado_por: string;
  cantidad_items: number;
};


type Filtros = {
  proveedor_id?: number;
  q?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function Compras() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    compraForm
  ] = Form.useForm<
    CompraForm
  >();

  const [
    filtrosForm
  ] = Form.useForm<
    Filtros
  >();

  const [
    compras,
    setCompras
  ] = useState<
    CompraListado[]
  >([]);

  const [
    proveedores,
    setProveedores
  ] = useState<
    Proveedor[]
  >([]);

  const [
    unidades,
    setUnidades
  ] = useState<
    Unidad[]
  >([]);

  const [
    cargandoBase,
    setCargandoBase
  ] = useState(true);

  const [
    cargandoCompras,
    setCargandoCompras
  ] = useState(true);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<
    Filtros
  >({});

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const {
    procesando:
      registrandoCompra,

    intentarBloquear:
      bloquearCompra,

    liberar:
      liberarCompra
  } = useBloqueoAccion();


  const detallesActuales =
    Form.useWatch(
      'detalles',
      compraForm
    ) || [];


  const monedaActual =
    Form.useWatch(
      'moneda_codigo',
      compraForm
    ) || 'PEN';


  const totalCompra =
    useMemo(
      () =>
        detallesActuales.reduce(
          (
            total,
            item
          ) =>
            total +
            Number(
              item
                ?.cantidad ||
              0
            ) *
            Number(
              item
                ?.precio_unitario ||
              0
            ),
          0
        ),
      [
        detallesActuales
      ]
    );


  const cargarCatalogosBase =
    useCallback(
      async () => {
        const [
          proveedoresData,
          unidadesData
        ] = await Promise.all([
          apiFetch(
            '/proveedores'
          ),

          apiFetch(
            '/catalogos/unidades-medida'
          )
        ]);


        setProveedores(
          proveedoresData
            .proveedores ||
          []
        );

        setUnidades(
          unidadesData.unidades ||
          []
        );
      },
      []
    );


  const cargarCompras =
    useCallback(
      async (
        pagina: number,
        filtros:
          Filtros
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(pagina)
        );

        params.set(
          'limit',
          '10'
        );

        if (
          filtros.proveedor_id
        ) {
          params.set(
            'proveedor_id',
            String(
              filtros
                .proveedor_id
            )
          );
        }

        if (
          filtros.q
            ?.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }


        const comprasData =
          await apiFetch(
            `/compras?${params.toString()}`
          );


        setCompras(
          comprasData.compras ||
          []
        );

        setPaginacion(
          comprasData.paginacion
        );
      },
      []
    );


  const cargarInicial =
    useCallback(
      async () => {
        setCargandoBase(true);
        setCargandoCompras(true);

        try {
          await Promise.all([
            cargarCatalogosBase(),
            cargarCompras(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar las compras'
          );

        } finally {
          setCargandoBase(false);
          setCargandoCompras(false);
        }
      },
      [
        cargarCatalogosBase,
        cargarCompras,
        filtrosAplicados,
        message,
        page
      ]
    );


  useEffect(() => {
    cargarInicial();
  }, [
    cargarInicial
  ]);


  const recargarListado =
    async () => {
      setCargandoCompras(true);

      try {
        await cargarCompras(
          page,
          filtrosAplicados
        );

      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el listado'
        );

      } finally {
        setCargandoCompras(false);
      }
    };


  const validarItems =
    (
      values:
        CompraForm
    ) => {
      if (
        !values.detalles ||
        values.detalles.length ===
          0
      ) {
        return (
          'La compra debe tener al menos un ítem'
        );
      }


      for (
        let index = 0;
        index <
        values.detalles.length;
        index++
      ) {
        const item =
          values.detalles[
            index
          ];


        if (
          !item
            .descripcion_item
            ?.trim()
        ) {
          return (
            `El ítem ${index + 1} debe tener una descripción`
          );
        }


        if (
          Number(
            item.cantidad ||
            0
          ) <= 0
        ) {
          return (
            `El ítem ${index + 1} debe tener una cantidad mayor a 0`
          );
        }


        if (
          !item
            .unidad_medida_id
        ) {
          return (
            `El ítem ${index + 1} debe tener una unidad`
          );
        }


        if (
          Number(
            item
              .precio_unitario ||
            0
          ) <= 0
        ) {
          return (
            `El ítem ${index + 1} debe tener un precio unitario mayor a 0`
          );
        }
      }


      return null;
    };


  const registrarCompra =
    async (
      values:
        CompraForm
    ) => {
      const error =
        validarItems(
          values
        );


      if (error) {
        message.error(
          error
        );

        return;
      }


      if (
        !bloquearCompra()
      ) {
        return;
      }


      let compraRegistrada =
        false;


      try {
        await apiFetch(
          '/compras',
          {
            method: 'POST',

            body:
              JSON.stringify({
                proveedor_id:
                  Number(
                    values
                      .proveedor_id
                  ),

                fecha_compra:
                  values
                    .fecha_compra
                    ?.format(
                      'YYYY-MM-DD'
                    ) ||
                  undefined,

                numero_documento:
                  values
                    .numero_documento
                    ?.trim() ||
                  '',

                moneda_codigo:
                  values
                    .moneda_codigo,

                descripcion:
                  values
                    .descripcion
                    ?.trim() ||
                  '',

                detalles:
                  values.detalles.map(
                    (item) => ({
                      descripcion_item:
                        item
                          .descripcion_item
                          ?.trim() ||
                        '',

                      cantidad:
                        Number(
                          item
                            .cantidad
                        ),

                      unidad_medida_id:
                        Number(
                          item
                            .unidad_medida_id
                        ),

                      precio_unitario:
                        Number(
                          item
                            .precio_unitario
                        )
                    })
                  )
              })
          }
        );


        compraRegistrada =
          true;


        message.success(
          'Compra registrada correctamente'
        );


        compraForm.resetFields();

        compraForm.setFieldsValue({
          moneda_codigo:
            'PEN',

          detalles: [
            {
              descripcion_item:
                '',

              cantidad:
                undefined,

              unidad_medida_id:
                undefined,

              precio_unitario:
                undefined
            }
          ]
        } as Partial<CompraForm>);


        setPage(1);


        try {
          await cargarCompras(
            1,
            filtrosAplicados
          );

        } catch (errorListado) {
          console.error(
            'La compra fue registrada, pero no se pudo actualizar el listado:',
            errorListado
          );

          message.warning(
            'La compra fue registrada, pero no se pudo actualizar el listado. Usa Actualizar para verla.'
          );
        }


        liberarCompra();

      } catch (error) {
        if (
          !compraRegistrada
        ) {
          liberarCompra();

          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo registrar la compra'
          );
        }
      }
    };


  const aplicarFiltros =
    (
      values:
        Filtros
    ) => {
      setPage(1);

      setFiltrosAplicados({
        proveedor_id:
          values.proveedor_id,

        q:
          values.q
            ?.trim() ||
          ''
      });
    };


  const limpiarFiltros =
    () => {
      filtrosForm
        .resetFields();

      setPage(1);
      setFiltrosAplicados({});
    };


  const columns:
    TableColumnsType<
      CompraListado
    > = [
    {
      title: 'Proveedor',
      key: 'proveedor',
      minWidth: 220,

      render: (
        _,
        compra
      ) => (
        <div className="gd-compra-provider-cell">

          <Text strong>
            {
              compra
                .razon_social
            }
          </Text>

          <Text
            type="secondary"
          >
            {compra.ruc}
          </Text>

        </div>
      )
    },

    {
      title: 'Fecha',
      dataIndex:
        'fecha_compra',
      key:
        'fecha_compra',
      width: 120,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Documento',
      dataIndex:
        'numero_documento',
      key:
        'numero_documento',
      width: 170,

      render: (
        value?:
          string | null
      ) =>
        value
          ? (
              <Text code>
                {value}
              </Text>
            )
          : '-'
    },

    {
      title: 'Descripción',
      dataIndex:
        'descripcion',
      key:
        'descripcion',
      minWidth: 220,
      responsive: [
        'lg'
      ],

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title: 'Total',
      key: 'total',
      width: 165,

      render: (
        _,
        compra
      ) => (
        <Space
          size={6}
        >

          <Text strong>
            {
              formatMonto(
                compra
                  .monto_total
              )
            }
          </Text>

          <Tag
            color={
              compra
                .moneda_codigo ===
                'PEN'
                ? 'blue'
                : 'green'
            }
          >
            {
              compra
                .moneda_codigo
            }
          </Tag>

        </Space>
      )
    },

    {
      title: 'Ítems',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 90,

      render: (
        value: number
      ) => (
        <Tag>
          {value}
        </Tag>
      )
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      width: 180,
      responsive: [
        'md'
      ]
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 145,

      render: (
        _,
        compra
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/compras/${compra.compra_id}`
            )
          }
        >
          Ver detalle
        </Button>
      )
    }
  ];


  return (
    <div className="gd-compras-page">

      <PageHeader
        title="Compras generales"
        description="Registra compras a proveedores que no forman parte del flujo específico de materia prima por lotes."
      />


      <Card
        title="Registrar compra"
        className="gd-compras-register-card"
      >

        <Form<CompraForm>
          form={
            compraForm
          }
          layout="vertical"
          requiredMark={false}
          disabled={
            registrandoCompra
          }
          initialValues={{
            moneda_codigo:
              'PEN',

            detalles: [
              {
                descripcion_item:
                  '',

                cantidad:
                  undefined,

                unidad_medida_id:
                  undefined,

                precio_unitario:
                  undefined
              }
            ]
          }}
          onFinish={
            registrarCompra
          }
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              lg={10}
            >

              <Form.Item
                label="Proveedor"
                name="proveedor_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona un proveedor'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  loading={
                    cargandoBase
                  }
                  placeholder="Selecciona un proveedor"
                  options={
                    proveedores.map(
                      (proveedor) => ({
                        value:
                          proveedor
                            .proveedor_id,

                        label:
                          `${proveedor.razon_social} · ${proveedor.ruc}`
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={5}
            >

              <Form.Item
                label="Fecha de compra"
                name="fecha_compra"
              >
                <DatePicker
                  size="large"
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  placeholder="Hoy si se deja vacío"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={5}
            >

              <Form.Item
                label="Moneda"
                name="moneda_codigo"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona la moneda'
                  }
                ]}
              >
                <Select
                  size="large"
                  options={[
                    {
                      value: 'PEN',
                      label:
                        'Soles (PEN)'
                    },
                    {
                      value: 'USD',
                      label:
                        'Dólares (USD)'
                    }
                  ]}
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={4}
            >

              <Form.Item
                label="Documento"
                name="numero_documento"
              >
                <Input
                  size="large"
                  maxLength={100}
                  placeholder="Factura, boleta..."
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
            >

              <Form.Item
                label="Descripción"
                name="descripcion"
                rules={[
                  {
                    max: 400,
                    message:
                      'La descripción no puede superar 400 caracteres'
                  }
                ]}
              >
                <TextArea
                  rows={2}
                  maxLength={400}
                  showCount
                  placeholder="Descripción general de la compra"
                />
              </Form.Item>

            </Col>

          </Row>


          <Form.List
            name="detalles"
          >
            {(
              fields,
              {
                add,
                remove
              }
            ) => (
              <Space
                direction="vertical"
                size={14}
                className="gd-compras-items-space"
              >

                <div className="gd-compras-items-heading">

                  <Text strong>
                    Ítems de compra
                  </Text>


                  <Button
                    type="primary"
                    ghost
                    icon={
                      <PlusOutlined />
                    }
                    disabled={
                      registrandoCompra
                    }
                    onClick={() =>
                      add({
                        descripcion_item:
                          '',

                        cantidad:
                          undefined,

                        unidad_medida_id:
                          undefined,

                        precio_unitario:
                          undefined
                      })
                    }
                  >
                    Agregar ítem
                  </Button>

                </div>


                {
                  fields.map(
                    (
                      field,
                      index
                    ) => {
                      const item =
                        detallesActuales[
                          index
                        ] || {};

                      const subtotal =
                        Number(
                          item.cantidad ||
                          0
                        ) *
                        Number(
                          item
                            .precio_unitario ||
                          0
                        );


                      return (
                        <Card
                          key={
                            field.key
                          }
                          size="small"
                          title={
                            `Ítem ${index + 1}`
                          }
                          extra={
                            <Button
                              type="text"
                              danger
                              icon={
                                <DeleteOutlined />
                              }
                              disabled={
                                registrandoCompra ||
                                fields.length ===
                                  1
                              }
                              onClick={() => {
                                if (
                                  fields.length ===
                                  1
                                ) {
                                  message.warning(
                                    'La compra debe tener al menos un ítem'
                                  );

                                  return;
                                }

                                remove(
                                  field.name
                                );
                              }}
                            >
                              Quitar
                            </Button>
                          }
                          className="gd-compra-item-card"
                        >

                          <Row
                            gutter={[
                              14,
                              0
                            ]}
                          >
                            <Col
                              xs={24}
                              md={12}
                              xl={9}
                            >

                              <Form.Item
                                label="Descripción del ítem"
                                name={[
                                  field.name,
                                  'descripcion_item'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      'Ingresa la descripción'
                                  },
                                  {
                                    max: 300,
                                    message:
                                      'La descripción no puede superar 300 caracteres'
                                  }
                                ]}
                              >
                                <Input
                                  maxLength={300}
                                  placeholder="Ejemplo: Cajas para embalaje"
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              sm={12}
                              xl={3}
                            >

                              <Form.Item
                                label="Cantidad"
                                name={[
                                  field.name,
                                  'cantidad'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Ingresa cantidad'
                                  }
                                ]}
                              >
                                <InputNumber
                                  min={0.01}
                                  precision={2}
                                  step={0.01}
                                  className="gd-full-width"
                                  placeholder="0.00"
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              sm={12}
                              xl={3}
                            >

                              <Form.Item
                                label="Unidad"
                                name={[
                                  field.name,
                                  'unidad_medida_id'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Selecciona unidad'
                                  }
                                ]}
                              >
                                <Select
                                  placeholder="Unidad"
                                  options={
                                    unidades.map(
                                      (unidad) => ({
                                        value:
                                          unidad
                                            .unidad_medida_id,

                                        label:
                                          unidad.codigo
                                      })
                                    )
                                  }
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              sm={12}
                              xl={3}
                            >

                              <Form.Item
                                label="Precio unitario"
                                name={[
                                  field.name,
                                  'precio_unitario'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Ingresa precio'
                                  }
                                ]}
                              >
                                <InputNumber
                                  min={0.01}
                                  precision={2}
                                  step={0.01}
                                  className="gd-full-width"
                                  placeholder="0.00"
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              sm={12}
                              xl={3}
                            >

                              <Form.Item
                                label="Subtotal"
                              >
                                <Input
                                  value={
                                    formatMonto(
                                      subtotal
                                    )
                                  }
                                  suffix={
                                    monedaActual
                                  }
                                  disabled
                                />
                              </Form.Item>

                            </Col>

                          </Row>

                        </Card>
                      );
                    }
                  )
                }

              </Space>
            )}
          </Form.List>


          <Card
            size="small"
            className="gd-compras-total-card"
          >

            <div className="gd-compras-total-row">

              <Statistic
                title="Ítems"
                value={
                  detallesActuales
                    .length
                }
              />


              <Statistic
                title="Total compra"
                value={
                  Number(
                    totalCompra
                  )
                }
                precision={2}
                suffix={
                  monedaActual
                }
                prefix={
                  <ShoppingCartOutlined />
                }
              />

            </div>

          </Card>


          <div className="gd-compras-actions">

            <Button
              type="primary"
              htmlType="submit"
              icon={
                <ShoppingCartOutlined />
              }
              loading={
                registrandoCompra
              }
              disabled={
                cargandoBase
              }
            >
              Guardar compra
            </Button>

          </div>

        </Form>

      </Card>


      <Card
        title="Filtros"
        className="gd-compras-filter-card"
      >

        <Form<Filtros>
          form={
            filtrosForm
          }
          layout="vertical"
          requiredMark={false}
          onFinish={
            aplicarFiltros
          }
        >

          <Row
            gutter={[
              14,
              0
            ]}
            align="bottom"
          >

            <Col
              xs={24}
              lg={9}
            >

              <Form.Item
                label="Proveedor"
                name="proveedor_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos los proveedores"
                  options={
                    proveedores.map(
                      (proveedor) => ({
                        value:
                          proveedor
                            .proveedor_id,

                        label:
                          `${proveedor.razon_social} · ${proveedor.ruc}`
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={9}
            >

              <Form.Item
                label="Buscar"
                name="q"
              >
                <Input
                  allowClear
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Proveedor, RUC, documento o descripción"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={6}
            >

              <Form.Item
                label=" "
                className="gd-compras-filter-actions"
              >

                <Space
                  wrap
                >

                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <SearchOutlined />
                    }
                  >
                    Buscar
                  </Button>


                  <Button
                    onClick={
                      limpiarFiltros
                    }
                  >
                    Limpiar
                  </Button>


                  <Button
                    icon={
                      <ReloadOutlined />
                    }
                    loading={
                      cargandoCompras
                    }
                    onClick={
                      recargarListado
                    }
                  >
                    Actualizar
                  </Button>

                </Space>

              </Form.Item>

            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Listado de compras"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } compra(s)
          </Text>
        }
        className="gd-compras-table-card"
      >

        <Table<
          CompraListado
        >
          rowKey="compra_id"
          columns={columns}
          dataSource={
            compras
          }
          loading={
            cargandoCompras
          }
          scroll={{
            x: 1050
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay compras registradas"
              />
          }}
          pagination={{
            current:
              paginacion.page,

            pageSize:
              paginacion.limit,

            total:
              paginacion.total,

            showSizeChanger:
              false,

            showTotal: (
              total
            ) =>
              `${total} compra(s)`,

            onChange: (
              nuevaPagina
            ) =>
              setPage(
                nuevaPagina
              )
          }}
        />

      </Card>

    </div>
  );
}


export default Compras;


<<<END OF FILE>>>


---

## FILE: src\pages\comprasMateriaPrima\CompraMateriaPrimaDetalle.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Card,
  Col,
  Descriptions,
  Empty,
  Progress,
  Result,
  Row,
  Skeleton,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DatabaseOutlined,
  InboxOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatMonto,
  formatPeso,
  formatPrecio
} from '../../utils/formatters';

import '../../styles/comprasMateriaPrimaAntd.css';


const {
  Text
} = Typography;


type DetalleLote = {
  compra_materia_prima_detalle_id:
    number;

  material_id: number;
  material: string;

  color_id: number;
  color: string;

  descripcion_item?:
    string | null;

  cantidad: number;

  unidad_medida_id:
    number;

  unidad: string;

  precio_unitario:
    number;

  subtotal: number;

  stock_materia_prima_lote_id:
    number;

  cantidad_inicial:
    number;

  cantidad_disponible:
    number;
};


type CompraMateriaPrima = {
  compra_materia_prima_id:
    number;

  nombre_lote:
    string;

  proveedor_id:
    number;

  ruc: string;
  razon_social:
    string;

  direccion?:
    string | null;

  fecha_compra:
    string;

  numero_documento?:
    string | null;

  monto_total:
    number;

  moneda_codigo:
    | 'PEN'
    | 'USD';

  descripcion?:
    string | null;

  created_at?:
    string | null;

  registrado_por:
    string;

  detalles:
    DetalleLote[];
};


function CompraMateriaPrimaDetalle() {
  const {
    compra_materia_prima_id
  } = useParams();

  const {
    message
  } = AntdApp.useApp();

  const [
    compra,
    setCompra
  ] = useState<
    CompraMateriaPrima | null
  >(null);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          const data =
            await apiFetch(
              `/compras-materia-prima/${compra_materia_prima_id}`
            );

          setCompra(
            data.compra
          );

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el lote';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    compra_materia_prima_id,
    message
  ]);


  const resumen =
    useMemo(
      () => {
        const comprado =
          (
            compra
              ?.detalles ||
            []
          ).reduce(
            (
              total,
              item
            ) =>
              total +
              Number(
                item
                  .cantidad_inicial ||
                item.cantidad ||
                0
              ),
            0
          );

        const disponible =
          (
            compra
              ?.detalles ||
            []
          ).reduce(
            (
              total,
              item
            ) =>
              total +
              Number(
                item
                  .cantidad_disponible ||
                0
              ),
            0
          );

        const consumido =
          Math.max(
            0,
            comprado -
            disponible
          );

        return {
          comprado,
          disponible,
          consumido
        };
      },
      [
        compra
      ]
    );


  const porcentajeDisponible =
    resumen.comprado > 0
      ? Math.max(
          0,
          Math.min(
            100,
            (
              resumen.disponible /
              resumen.comprado
            ) *
            100
          )
        )
      : 0;


  const columns:
    TableColumnsType<
      DetalleLote
    > = [
    {
      title: 'Materia prima',
      key: 'materia_prima',
      minWidth: 210,

      render: (
        _,
        item
      ) => (
        <div className="gd-compra-mp-material-cell">

          <Text strong>
            {item.material}
          </Text>

          <Text
            type="secondary"
          >
            {item.color}
          </Text>

        </div>
      )
    },

    {
      title: 'Descripción',
      dataIndex:
        'descripcion_item',
      key:
        'descripcion_item',
      minWidth: 190,
      responsive: [
        'lg'
      ],

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title: 'Comprado',
      key: 'comprado',
      width: 145,

      render: (
        _,
        item
      ) =>
        `${formatPeso(item.cantidad_inicial || item.cantidad)} KG`
    },

    {
      title: 'Disponible',
      key: 'disponible',
      width: 190,

      render: (
        _,
        item
      ) => {
        const inicial =
          Number(
            item
              .cantidad_inicial ||
            item.cantidad ||
            0
          );

        const disponible =
          Number(
            item
              .cantidad_disponible ||
            0
          );

        const porcentaje =
          inicial > 0
            ? Math.max(
                0,
                Math.min(
                  100,
                  (
                    disponible /
                    inicial
                  ) *
                  100
                )
              )
            : 0;


        return (
          <div className="gd-compra-mp-stock-cell">

            <Text strong>
              {
                formatPeso(
                  disponible
                )
              } KG
            </Text>

            <Progress
              percent={
                Number(
                  porcentaje
                    .toFixed(2)
                )
              }
              showInfo={
                false
              }
              size="small"
            />

          </div>
        );
      }
    },

    {
      title: 'Consumido',
      key: 'consumido',
      width: 145,

      render: (
        _,
        item
      ) => {
        const consumido =
          Math.max(
            0,
            Number(
              item
                .cantidad_inicial ||
              item.cantidad ||
              0
            ) -
            Number(
              item
                .cantidad_disponible ||
              0
            )
          );

        return (
          <Text
            type={
              consumido > 0
                ? 'warning'
                : undefined
            }
          >
            {
              formatPeso(
                consumido
              )
            } KG
          </Text>
        );
      }
    },

    {
      title:
        'Precio unitario',
      dataIndex:
        'precio_unitario',
      key:
        'precio_unitario',
      width: 165,

      render: (
        value: number
      ) =>
        `${formatPrecio(value)} ${compra?.moneda_codigo || ''}`
    },

    {
      title: 'Subtotal',
      dataIndex:
        'subtotal',
      key:
        'subtotal',
      width: 165,

      render: (
        value: number
      ) => (
        <Text strong>
          {
            formatMonto(
              value
            )
          } {
            compra
              ?.moneda_codigo
          }
        </Text>
      )
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-compra-mp-page">

        <Skeleton
          active
          paragraph={{
            rows: 11
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !compra
  ) {
    return (
      <div className="gd-compra-mp-page">

        <BackButton
          to="/gestion/compras-materia-prima"
          label="Volver a materia prima"
        />


        <Result
          status="error"
          title="No se pudo cargar el lote"
          subTitle={
            errorCarga ||
            'Lote no encontrado'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-compra-mp-page">

      <BackButton
        to="/gestion/compras-materia-prima"
        label="Volver a materia prima"
      />


      <PageHeader
        title={
          compra.nombre_lote
        }
        description="Detalle de la compra y saldo actual de cada materia prima del lote."
        extra={
          <Tag
            color={
              compra
                .moneda_codigo ===
                'PEN'
                ? 'blue'
                : 'green'
            }
          >
            {
              compra
                .moneda_codigo
            }
          </Tag>
        }
      />


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-compra-mp-summary"
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Comprado"
              value={
                resumen.comprado
              }
              precision={2}
              suffix="KG"
              prefix={
                <ShoppingCartOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Disponible"
              value={
                resumen.disponible
              }
              precision={2}
              suffix="KG"
              prefix={
                <InboxOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Consumido"
              value={
                resumen.consumido
              }
              precision={2}
              suffix="KG"
              prefix={
                <DatabaseOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Monto total"
              value={
                Number(
                  compra
                    .monto_total
                )
              }
              precision={2}
              suffix={
                compra
                  .moneda_codigo
              }
            />
          </Card>
        </Col>

      </Row>


      <Card
        title="Datos del lote"
        className="gd-compra-mp-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 3
          }}
          items={[
            {
              key: 'proveedor',
              label: 'Proveedor',
              children:
                compra
                  .razon_social
            },

            {
              key: 'ruc',
              label: 'RUC',
              children:
                compra.ruc
            },

            {
              key: 'fecha',
              label: 'Fecha de compra',
              children:
                compra
                  .fecha_compra
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key: 'documento',
              label: 'Documento',
              children:
                compra
                  .numero_documento ||
                '-'
            },

            {
              key: 'usuario',
              label: 'Registrado por',
              children:
                compra
                  .registrado_por
            },

            {
              key: 'registro',
              label: 'Fecha de registro',
              children:
                compra.created_at
                  ? new Date(
                      compra
                        .created_at
                    )
                      .toLocaleString(
                        'es-PE'
                      )
                  : '-'
            },

            {
              key: 'direccion',
              label:
                'Dirección del proveedor',
              span: 3,
              children:
                compra.direccion ||
                '-'
            },

            {
              key: 'descripcion',
              label: 'Descripción',
              span: 3,
              children:
                compra.descripcion ||
                'Sin descripción'
            }
          ]}
        />


        <div className="gd-compra-mp-global-progress">

          <div className="gd-compra-mp-global-progress-head">

            <Text>
              Stock disponible del lote
            </Text>

            <Text strong>
              {
                formatPeso(
                  resumen.disponible
                )
              } / {
                formatPeso(
                  resumen.comprado
                )
              } KG
            </Text>

          </div>


          <Progress
            percent={
              Number(
                porcentajeDisponible
                  .toFixed(2)
              )
            }
            status={
              resumen.disponible <= 0
                ? 'exception'
                : 'active'
            }
          />

        </div>

      </Card>


      {
        resumen.disponible <= 0 &&
        (
          <Alert
            type="warning"
            showIcon
            message="Este lote ya no tiene stock disponible."
            description="El lote se conserva como parte del historial de compras y consumos."
            className="gd-compra-mp-section-card"
          />
        )
      }


      <Card
        title="Materias primas del lote"
        extra={
          <Text
            type="secondary"
          >
            {
              compra
                .detalles
                .length
            } materia(s) prima(s)
          </Text>
        }
        className="gd-compra-mp-table-card"
      >

        <Table<
          DetalleLote
        >
          rowKey="compra_materia_prima_detalle_id"
          columns={columns}
          dataSource={
            compra.detalles
          }
          pagination={false}
          scroll={{
            x: 1050
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="El lote no tiene materias primas registradas"
              />
          }}
        />

      </Card>

    </div>
  );
}


export default CompraMateriaPrimaDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\comprasMateriaPrima\ComprasMateriaPrimaLista.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Progress,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatMonto,
  formatPeso
} from '../../utils/formatters';

import '../../styles/comprasMateriaPrimaAntd.css';


const {
  Text
} = Typography;


type CompraMateriaPrima = {
  compra_materia_prima_id: number;
  nombre_lote: string;

  proveedor_id: number;
  ruc: string;
  razon_social: string;

  fecha_compra: string;
  numero_documento?: string | null;

  monto_total: number;
  moneda_codigo:
    | 'PEN'
    | 'USD';

  descripcion?: string | null;

  registrado_por: string;

  cantidad_items: number;
  cantidad_total_kg: number;
  cantidad_disponible_kg: number;
};


type FiltrosCompraMP = {
  proveedor_id?: number;
  q?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function ComprasMateriaPrimaLista() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    FiltrosCompraMP
  >();

  const [
    compras,
    setCompras
  ] = useState<
    CompraMateriaPrima[]
  >([]);

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>(
    []
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<
    FiltrosCompraMP
  >({});

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarProveedores =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/proveedores'
          );

        setProveedores(
          data.proveedores ||
          []
        );
      },
      []
    );


  const cargarCompras =
    useCallback(
      async (
        pagina:
          number,

        filtros:
          FiltrosCompraMP
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(pagina)
        );

        params.set(
          'limit',
          '10'
        );

        if (
          filtros.proveedor_id
        ) {
          params.set(
            'proveedor_id',
            String(
              filtros
                .proveedor_id
            )
          );
        }

        if (
          filtros.q?.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }


        const data =
          await apiFetch(
            `/compras-materia-prima?${params.toString()}`
          );


        setCompras(
          data.compras ||
          []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  const cargarTodo =
    useCallback(
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarProveedores(),
            cargarCompras(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los lotes de materia prima'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarCompras,
        cargarProveedores,
        filtrosAplicados,
        message,
        page
      ]
    );


  useEffect(() => {
    cargarTodo();
  }, [
    cargarTodo
  ]);


  const aplicarFiltros =
    (
      values:
        FiltrosCompraMP
    ) => {
      setPage(1);

      setFiltrosAplicados({
        proveedor_id:
          values.proveedor_id,

        q:
          values.q?.trim() ||
          ''
      });
    };


  const limpiarFiltros =
    () => {
      form.resetFields();
      setPage(1);
      setFiltrosAplicados({});
    };


  const columns:
    TableColumnsType<
      CompraMateriaPrima
    > = [
    {
      title: 'Lote',
      dataIndex:
        'nombre_lote',
      key:
        'nombre_lote',
      minWidth: 190,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title: 'Proveedor',
      key: 'proveedor',
      minWidth: 220,

      render: (
        _,
        compra
      ) => (
        <div className="gd-compra-mp-provider-cell">

          <Text strong>
            {
              compra
                .razon_social
            }
          </Text>

          <Text
            type="secondary"
          >
            {compra.ruc}
          </Text>

        </div>
      )
    },

    {
      title: 'Fecha',
      dataIndex:
        'fecha_compra',
      key:
        'fecha_compra',
      width: 120,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Documento',
      dataIndex:
        'numero_documento',
      key:
        'numero_documento',
      width: 160,
      responsive: [
        'md'
      ],

      render: (
        value?:
          string | null
      ) =>
        value
          ? (
              <Text code>
                {value}
              </Text>
            )
          : '-'
    },

    {
      title: 'Materias primas',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 135,
      responsive: [
        'md'
      ],

      render: (
        value: number
      ) => (
        <Tag>
          {value}
        </Tag>
      )
    },

    {
      title: 'Comprado',
      dataIndex:
        'cantidad_total_kg',
      key:
        'cantidad_total_kg',
      width: 145,

      render: (
        value: number
      ) => (
        <Text strong>
          {
            formatPeso(
              value || 0
            )
          } KG
        </Text>
      )
    },

    {
      title: 'Disponible',
      key: 'disponible',
      width: 210,

      render: (
        _,
        compra
      ) => {
        const comprado =
          Number(
            compra
              .cantidad_total_kg ||
            0
          );

        const disponible =
          Number(
            compra
              .cantidad_disponible_kg ||
            0
          );

        const porcentaje =
          comprado > 0
            ? Math.max(
                0,
                Math.min(
                  100,
                  (
                    disponible /
                    comprado
                  ) *
                  100
                )
              )
            : 0;


        return (
          <div className="gd-compra-mp-stock-cell">

            <Text>
              {
                formatPeso(
                  disponible
                )
              } KG
            </Text>

            <Progress
              percent={
                Number(
                  porcentaje
                    .toFixed(2)
                )
              }
              showInfo={
                false
              }
              size="small"
            />

          </div>
        );
      }
    },

    {
      title: 'Monto',
      key: 'monto',
      width: 165,
      responsive: [
        'lg'
      ],

      render: (
        _,
        compra
      ) => (
        <Space
          size={6}
        >

          <Text strong>
            {
              formatMonto(
                compra
                  .monto_total ||
                0
              )
            }
          </Text>

          <Tag
            color={
              compra
                .moneda_codigo ===
                'PEN'
                ? 'blue'
                : 'green'
            }
          >
            {
              compra
                .moneda_codigo
            }
          </Tag>

        </Space>
      )
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      minWidth: 170,
      responsive: [
        'xl'
      ]
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 145,

      render: (
        _,
        compra
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/compras-materia-prima/${compra.compra_materia_prima_id}`
            )
          }
        >
          Ver detalle
        </Button>
      )
    }
  ];


  return (
    <div className="gd-compra-mp-page">

      <PageHeader
        title="Compras de materia prima"
        description="Gestiona las compras de fibra por lote y su ingreso al almacén de materia prima."
        extra={
          <Button
            type="primary"
            icon={
              <PlusOutlined />
            }
            onClick={() =>
              navigate(
                '/gestion/compras-materia-prima/registrar'
              )
            }
          >
            Registrar lote
          </Button>
        }
      />


      <Card
        title="Filtros"
        className="gd-compra-mp-filter-card"
      >

        <Form<
          FiltrosCompraMP
        >
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={
            aplicarFiltros
          }
        >

          <Row
            gutter={[
              14,
              0
            ]}
            align="bottom"
          >

            <Col
              xs={24}
              lg={9}
            >

              <Form.Item
                label="Buscar"
                name="q"
              >
                <Input
                  allowClear
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Lote, documento, proveedor..."
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={9}
            >

              <Form.Item
                label="Proveedor"
                name="proveedor_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos los proveedores"
                  options={
                    proveedores.map(
                      (proveedor) => ({
                        value:
                          proveedor
                            .proveedor_id,

                        label:
                          `${proveedor.razon_social} · ${proveedor.ruc}`
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={6}
            >

              <Form.Item
                label=" "
                className="gd-compra-mp-filter-actions"
              >

                <Space
                  wrap
                >

                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <SearchOutlined />
                    }
                  >
                    Buscar
                  </Button>


                  <Button
                    onClick={
                      limpiarFiltros
                    }
                  >
                    Limpiar
                  </Button>


                  <Button
                    icon={
                      <ReloadOutlined />
                    }
                    loading={
                      cargando
                    }
                    onClick={
                      cargarTodo
                    }
                  >
                    Actualizar
                  </Button>

                </Space>

              </Form.Item>

            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Lotes registrados"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } lote(s)
          </Text>
        }
        className="gd-compra-mp-table-card"
      >

        <Table<
          CompraMateriaPrima
        >
          rowKey="compra_materia_prima_id"
          columns={columns}
          dataSource={
            compras
          }
          loading={
            cargando
          }
          scroll={{
            x: 1180
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay lotes para los filtros seleccionados"
              />
          }}
          pagination={{
            current:
              paginacion.page,

            pageSize:
              paginacion.limit,

            total:
              paginacion.total,

            showSizeChanger:
              false,

            showTotal: (
              total
            ) =>
              `${total} lote(s)`,

            onChange: (
              nuevaPagina
            ) =>
              setPage(
                nuevaPagina
              )
          }}
        />

      </Card>

    </div>
  );
}


export default ComprasMateriaPrimaLista;


<<<END OF FILE>>>


---

## FILE: src\pages\comprasMateriaPrima\RegistrarCompraMateriaPrima.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Skeleton,
  Space,
  Statistic,
  Tag,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined
} from '@ant-design/icons';

import dayjs, {
  Dayjs
} from 'dayjs';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatMonto,
  formatPeso
} from '../../utils/formatters';

import '../../styles/comprasMateriaPrimaAntd.css';


const {
  Text
} = Typography;

const {
  TextArea
} = Input;


type CatalogoItem = {
  id: number;
  nombre: string;
};


type Proveedor = {
  proveedor_id: number;
  ruc: string;
  razon_social: string;
};


type DetalleCompraMP = {
  material_id?: number;
  color_id?: number;
  cantidad?: number;
  precio_unitario?: number;
  descripcion_item?: string;
};


type CompraMPForm = {
  nombre_lote: string;
  proveedor_id: number;
  fecha_compra: Dayjs;
  numero_documento?: string;
  moneda_codigo:
    | 'PEN'
    | 'USD';
  descripcion?: string;
  detalles:
    DetalleCompraMP[];
};


const generarIdempotencyKey =
  () => {
    if (
      typeof crypto !==
        'undefined' &&
      typeof crypto.randomUUID ===
        'function'
    ) {
      return crypto.randomUUID();
    }

    return [
      'compra-mp',
      Date.now(),
      Math.random()
        .toString(36)
        .slice(2)
    ].join('-');
  };


function RegistrarCompraMateriaPrima() {
  const navigate =
    useNavigate();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    CompraMPForm
  >();

  const [
    proveedores,
    setProveedores
  ] = useState<
    Proveedor[]
  >([]);

  const [
    materiales,
    setMateriales
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    colores,
    setColores
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    cargandoCatalogos,
    setCargandoCatalogos
  ] = useState(true);

  const [
    idempotencyKey,
    setIdempotencyKey
  ] = useState(
    generarIdempotencyKey
  );

  const {
    procesando:
      registrandoCompra,

    intentarBloquear:
      bloquearRegistro,

    liberar:
      liberarRegistro
  } = useBloqueoAccion();


  const detallesActuales =
    Form.useWatch(
      'detalles',
      form
    ) || [];


  const monedaActual =
    Form.useWatch(
      'moneda_codigo',
      form
    ) || 'PEN';


  const montoTotal =
    useMemo(
      () =>
        detallesActuales.reduce(
          (
            total,
            detalle
          ) =>
            total +
            Number(
              detalle
                ?.cantidad ||
              0
            ) *
            Number(
              detalle
                ?.precio_unitario ||
              0
            ),
          0
        ),
      [
        detallesActuales
      ]
    );


  const pesoTotal =
    useMemo(
      () =>
        detallesActuales.reduce(
          (
            total,
            detalle
          ) =>
            total +
            Number(
              detalle
                ?.cantidad ||
              0
            ),
          0
        ),
      [
        detallesActuales
      ]
    );


  useEffect(() => {
    const cargar =
      async () => {
        setCargandoCatalogos(
          true
        );

        try {
          const [
            proveedoresData,
            materialesData,
            coloresData
          ] = await Promise.all([
            apiFetch(
              '/proveedores'
            ),

            apiFetch(
              '/catalogos/materiales'
            ),

            apiFetch(
              '/catalogos/colores'
            )
          ]);


          setProveedores(
            proveedoresData
              .proveedores ||
            []
          );

          setMateriales(
            materialesData.items ||
            []
          );

          setColores(
            coloresData.items ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos para registrar el lote'
          );

        } finally {
          setCargandoCatalogos(
            false
          );
        }
      };

    cargar();
  }, [
    message
  ]);


  const validarReglas =
    (
      values:
        CompraMPForm
    ) => {
      const usados =
        new Set<string>();

      for (
        let index = 0;
        index <
        values.detalles.length;
        index++
      ) {
        const item =
          values.detalles[
            index
          ];

        if (
          !item.material_id
        ) {
          return (
            `La materia prima ${index + 1} debe tener material`
          );
        }

        if (
          !item.color_id
        ) {
          return (
            `La materia prima ${index + 1} debe tener color`
          );
        }

        if (
          Number(
            item.cantidad ||
            0
          ) <= 0
        ) {
          return (
            `La materia prima ${index + 1} debe tener una cantidad mayor a 0`
          );
        }

        if (
          Number(
            item
              .precio_unitario ??
            -1
          ) < 0
        ) {
          return (
            `La materia prima ${index + 1} debe tener un precio válido`
          );
        }

        const clave =
          `${item.material_id}-${item.color_id}`;

        if (
          usados.has(
            clave
          )
        ) {
          return (
            `La materia prima ${index + 1} repite el mismo material y color`
          );
        }

        usados.add(
          clave
        );
      }


      if (
        montoTotal <= 0
      ) {
        return (
          'El monto total del lote debe ser mayor a 0'
        );
      }


      return null;
    };


  const registrarCompra =
    async (
      values:
        CompraMPForm
    ) => {
      if (
        !bloquearRegistro()
      ) {
        return;
      }


      try {
        const data =
          await apiFetch(
            '/compras-materia-prima',
            {
              method: 'POST',

              headers: {
                'Idempotency-Key':
                  idempotencyKey
              },

              body:
                JSON.stringify({
                  nombre_lote:
                    values
                      .nombre_lote
                      .trim(),

                  proveedor_id:
                    Number(
                      values
                        .proveedor_id
                    ),

                  fecha_compra:
                    values
                      .fecha_compra
                      .format(
                        'YYYY-MM-DD'
                      ),

                  numero_documento:
                    values
                      .numero_documento
                      ?.trim() ||
                    null,

                  moneda_codigo:
                    values
                      .moneda_codigo,

                  descripcion:
                    values
                      .descripcion
                      ?.trim() ||
                    null,

                  detalles:
                    values.detalles.map(
                      (item) => ({
                        material_id:
                          Number(
                            item.material_id
                          ),

                        color_id:
                          Number(
                            item.color_id
                          ),

                        cantidad:
                          Number(
                            item.cantidad
                          ),

                        precio_unitario:
                          Number(
                            item
                              .precio_unitario
                          ),

                        descripcion_item:
                          item
                            .descripcion_item
                            ?.trim() ||
                          null
                      })
                    )
                })
            }
          );


        if (
          data.reutilizada
        ) {
          message.info(
            'El lote ya había sido registrado. Se recuperó el registro existente sin duplicar el stock.'
          );

        } else {
          message.success(
            'Lote registrado e ingresado al almacén correctamente'
          );
        }


        /*
         * La operación ya fue confirmada.
         * Una acción futura sí necesita una key nueva.
         */
        setIdempotencyKey(
          generarIdempotencyKey()
        );


        navigate(
          `/gestion/compras-materia-prima/${data.compra.compra_materia_prima_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        /*
         * Conservamos la misma Idempotency-Key
         * para un reintento de esta misma operación.
         */
        liberarRegistro();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el lote'
        );

        throw error;
      }
    };


  const solicitarRegistro =
    async () => {
      let values:
        CompraMPForm;

      try {
        values =
          await form
            .validateFields();

      } catch {
        return;
      }


      const error =
        validarReglas(
          values
        );


      if (error) {
        message.error(
          error
        );

        return;
      }


      modal.confirm({
        title:
          'Registrar lote de materia prima',

        content:
          `Se registrarán ${values.detalles.length} materia(s) prima(s), ${formatPeso(pesoTotal)} KG en total y un monto de ${formatMonto(montoTotal)} ${values.moneda_codigo}. La operación ingresará stock al almacén de materia prima.`,

        okText:
          'Registrar lote',

        cancelText:
          'Cancelar',

        okButtonProps: {
          icon:
            <SaveOutlined />
        },

        onOk: () =>
          registrarCompra(
            values
          )
      });
    };


  if (
    cargandoCatalogos
  ) {
    return (
      <div className="gd-compra-mp-page">

        <Skeleton
          active
          paragraph={{
            rows: 12
          }}
        />

      </div>
    );
  }


  return (
    <div className="gd-compra-mp-page">

      <BackButton
        to="/gestion/compras-materia-prima"
        label="Volver a materia prima"
      />


      <PageHeader
        title="Registrar lote de materia prima"
        description="Registra una compra o importación de fibra e ingresa automáticamente sus materias primas al almacén."
      />


      <Card
        title="Datos del lote"
        className="gd-compra-mp-section-card"
      >

        <Form<
          CompraMPForm
        >
          form={form}
          layout="vertical"
          requiredMark={false}
          disabled={
            registrandoCompra
          }
          initialValues={{
            fecha_compra:
              dayjs(),

            moneda_codigo:
              'PEN',

            detalles: [
              {
                material_id:
                  undefined,

                color_id:
                  undefined,

                cantidad:
                  undefined,

                precio_unitario:
                  undefined,

                descripcion_item:
                  ''
              }
            ]
          }}
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              lg={12}
            >

              <Form.Item
                label="Nombre del lote"
                name="nombre_lote"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message:
                      'Ingresa el nombre del lote'
                  },
                  {
                    max: 150,
                    message:
                      'El nombre del lote no puede superar 150 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  maxLength={150}
                  placeholder="Ejemplo: IMPORTACIÓN SEP 2026"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={12}
            >

              <Form.Item
                label="Proveedor"
                name="proveedor_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona un proveedor'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Selecciona un proveedor"
                  options={
                    proveedores.map(
                      (proveedor) => ({
                        value:
                          proveedor
                            .proveedor_id,

                        label:
                          `${proveedor.razon_social} · ${proveedor.ruc}`
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
            >

              <Form.Item
                label="Fecha de compra"
                name="fecha_compra"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona la fecha'
                  }
                ]}
              >
                <DatePicker
                  size="large"
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
            >

              <Form.Item
                label="Moneda"
                name="moneda_codigo"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona la moneda'
                  }
                ]}
              >
                <Select
                  size="large"
                  options={[
                    {
                      value:
                        'PEN',
                      label:
                        'Soles (PEN)'
                    },
                    {
                      value:
                        'USD',
                      label:
                        'Dólares (USD)'
                    }
                  ]}
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={12}
            >

              <Form.Item
                label="Número de documento"
                name="numero_documento"
                rules={[
                  {
                    max: 100,
                    message:
                      'El documento no puede superar 100 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  maxLength={100}
                  placeholder="Factura, guía, etc."
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
            >

              <Form.Item
                label="Descripción"
                name="descripcion"
                rules={[
                  {
                    max: 400,
                    message:
                      'La descripción no puede superar 400 caracteres'
                  }
                ]}
              >
                <TextArea
                  rows={3}
                  maxLength={400}
                  showCount
                  placeholder="Observación general de la compra o importación"
                />
              </Form.Item>

            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Materias primas del lote"
        className="gd-compra-mp-section-card"
      >

        <Alert
          type="info"
          showIcon
          message="Cada materia prima se identifica por Material + Color y se registra en KG."
          description="No repitas el mismo material y color dentro del mismo lote."
          className="gd-compra-mp-main-rule"
        />


        <Form<
          CompraMPForm
        >
          form={form}
          layout="vertical"
          requiredMark={false}
          disabled={
            registrandoCompra
          }
        >

          <Form.List
            name="detalles"
          >
            {(
              fields,
              {
                add,
                remove
              }
            ) => (
              <Space
                direction="vertical"
                size={14}
                className="gd-compra-mp-items-space"
              >

                {
                  fields.map(
                    (
                      field,
                      index
                    ) => {
                      const item =
                        detallesActuales[
                          index
                        ] || {};

                      const subtotal =
                        Number(
                          item.cantidad ||
                          0
                        ) *
                        Number(
                          item
                            .precio_unitario ||
                          0
                        );


                      return (
                        <Card
                          key={
                            field.key
                          }
                          size="small"
                          title={
                            `Materia prima ${index + 1}`
                          }
                          extra={
                            <Button
                              type="text"
                              danger
                              icon={
                                <DeleteOutlined />
                              }
                              disabled={
                                registrandoCompra ||
                                fields.length ===
                                  1
                              }
                              onClick={() => {
                                if (
                                  fields.length ===
                                  1
                                ) {
                                  message.warning(
                                    'El lote debe tener al menos una materia prima'
                                  );

                                  return;
                                }

                                remove(
                                  field.name
                                );
                              }}
                            >
                              Quitar
                            </Button>
                          }
                          className="gd-compra-mp-item-card"
                        >

                          <Row
                            gutter={[
                              14,
                              0
                            ]}
                          >

                            <Col
                              xs={24}
                              sm={12}
                              lg={6}
                            >

                              <Form.Item
                                label="Material"
                                name={[
                                  field.name,
                                  'material_id'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Selecciona el material'
                                  }
                                ]}
                              >
                                <Select
                                  showSearch
                                  optionFilterProp="label"
                                  placeholder="Selecciona"
                                  options={
                                    materiales.map(
                                      (material) => ({
                                        value:
                                          material.id,

                                        label:
                                          material.nombre
                                      })
                                    )
                                  }
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              sm={12}
                              lg={6}
                            >

                              <Form.Item
                                label="Color"
                                name={[
                                  field.name,
                                  'color_id'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Selecciona el color'
                                  }
                                ]}
                              >
                                <Select
                                  showSearch
                                  optionFilterProp="label"
                                  placeholder="Selecciona"
                                  options={
                                    colores.map(
                                      (color) => ({
                                        value:
                                          color.id,

                                        label:
                                          color.nombre
                                      })
                                    )
                                  }
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              sm={12}
                              lg={6}
                            >

                              <Form.Item
                                label="Cantidad"
                                name={[
                                  field.name,
                                  'cantidad'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Ingresa la cantidad'
                                  }
                                ]}
                              >
                                <InputNumber
                                  min={0.01}
                                  precision={2}
                                  step={0.01}
                                  addonAfter="KG"
                                  className="gd-full-width"
                                  placeholder="0.00"
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              sm={12}
                              lg={6}
                            >

                              <Form.Item
                                label="Precio unitario"
                                name={[
                                  field.name,
                                  'precio_unitario'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Ingresa el precio'
                                  }
                                ]}
                              >
                                <InputNumber
                                  min={0}
                                  precision={2}
                                  step={0.01}
                                  addonAfter={
                                    monedaActual
                                  }
                                  className="gd-full-width"
                                  placeholder="0.00"
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              lg={18}
                            >

                              <Form.Item
                                label="Descripción opcional"
                                name={[
                                  field.name,
                                  'descripcion_item'
                                ]}
                                rules={[
                                  {
                                    max: 300,
                                    message:
                                      'La descripción no puede superar 300 caracteres'
                                  }
                                ]}
                              >
                                <Input
                                  maxLength={300}
                                  placeholder="Ejemplo: Fibra virgen"
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              lg={6}
                            >

                              <Form.Item
                                label="Subtotal"
                              >
                                <Input
                                  value={
                                    formatMonto(
                                      subtotal
                                    )
                                  }
                                  suffix={
                                    monedaActual
                                  }
                                  disabled
                                />
                              </Form.Item>

                            </Col>

                          </Row>

                        </Card>
                      );
                    }
                  )
                }


                <Button
                  block
                  type="dashed"
                  icon={
                    <PlusOutlined />
                  }
                  disabled={
                    registrandoCompra
                  }
                  onClick={() =>
                    add({
                      material_id:
                        undefined,

                      color_id:
                        undefined,

                      cantidad:
                        undefined,

                      precio_unitario:
                        undefined,

                      descripcion_item:
                        ''
                    })
                  }
                >
                  Agregar materia prima
                </Button>

              </Space>
            )}
          </Form.List>

        </Form>

      </Card>


      <Card
        className="gd-compra-mp-total-card"
      >

        <div className="gd-compra-mp-total-grid">

          <Statistic
            title="Materias primas"
            value={
              detallesActuales
                .length
            }
          />


          <Statistic
            title="Peso total"
            value={
              Number(
                pesoTotal
              )
            }
            precision={2}
            suffix="KG"
          />


          <Statistic
            title="Total del lote"
            value={
              Number(
                montoTotal
              )
            }
            precision={2}
            suffix={
              monedaActual
            }
          />

        </div>

      </Card>


      <div className="gd-compra-mp-actions">

        <Space
          wrap
        >

          <Button
            onClick={() =>
              navigate(
                '/gestion/compras-materia-prima'
              )
            }
            disabled={
              registrandoCompra
            }
          >
            Cancelar
          </Button>


          <Button
            type="primary"
            icon={
              <SaveOutlined />
            }
            loading={
              registrandoCompra
            }
            disabled={
              cargandoCatalogos
            }
            onClick={
              solicitarRegistro
            }
          >
            Registrar lote e ingresar stock
          </Button>

        </Space>

      </div>

    </div>
  );
}


export default RegistrarCompraMateriaPrima;


<<<END OF FILE>>>


---

## FILE: src\pages\Dashboard.tsx

<<<START OF FILE>>>

import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
  theme
} from 'antd';

import {
  BuildOutlined,
  DatabaseOutlined,
  InboxOutlined,
  ProductOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch,
  getUsuario
} from '../services/api';

import PageHeader
  from '../components/ui/PageHeader';

import MetricCard
  from '../components/ui/MetricCard';

import '../styles/dashboard.css';


const {
  Text,
  Title
} = Typography;


type DashboardData = {
  stockMateriaPrimaKg: number;
  lotesRegistrados: number;
  stockProductoTerminadoKg: number;
  pedidosPendientes: number;
};


const dashboardInicial:
  DashboardData = {
  stockMateriaPrimaKg: 0,
  lotesRegistrados: 0,
  stockProductoTerminadoKg: 0,
  pedidosPendientes: 0
};


function Dashboard() {
  const navigate =
    useNavigate();

  const {
    token
  } = theme.useToken();

  const usuario =
    getUsuario();

  const [
    datos,
    setDatos
  ] = useState<DashboardData>(
    dashboardInicial
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    advertencia,
    setAdvertencia
  ] = useState('');


  const cargarDashboard =
    useCallback(
      async () => {
        setCargando(true);
        setAdvertencia('');

        const resultados =
          await Promise.allSettled([
            apiFetch(
              '/almacen-materia-prima/indicadores'
            ),

            apiFetch(
              '/almacen-producto-terminado/indicadores'
            ),

            apiFetch(
              '/entregas/pedidos?page=1&limit=1'
            )
          ]);


        const [
          mpResult,
          ptResult,
          pedidosResult
        ] = resultados;


        const siguiente:
          DashboardData = {
          ...dashboardInicial
        };


        let fallos = 0;


        if (
          mpResult.status ===
          'fulfilled'
        ) {
          const indicadores =
            mpResult.value
              ?.indicadores ||
            {};

          siguiente
            .stockMateriaPrimaKg =
            Number(
              indicadores
                .stock_total_kg ||
              0
            );

          siguiente
            .lotesRegistrados =
            Number(
              indicadores
                .lotes_registrados ||
              0
            );

        } else {
          fallos++;
        }


        if (
          ptResult.status ===
          'fulfilled'
        ) {
          const indicadores =
            ptResult.value
              ?.indicadores ||
            {};

          siguiente
            .stockProductoTerminadoKg =
            Number(
              indicadores
                .stock_disponible_kg ||
              0
            );

        } else {
          fallos++;
        }


        if (
          pedidosResult.status ===
          'fulfilled'
        ) {
          siguiente
            .pedidosPendientes =
            Number(
              pedidosResult.value
                ?.paginacion
                ?.total ||
              0
            );

        } else {
          fallos++;
        }


        setDatos(
          siguiente
        );


        if (
          fallos > 0
        ) {
          setAdvertencia(
            fallos === resultados.length
              ? 'No fue posible cargar los indicadores operativos.'
              : 'Algunos indicadores no pudieron actualizarse. Los demás datos se muestran normalmente.'
          );
        }


        setCargando(false);
      },
      []
    );


  useEffect(() => {
    cargarDashboard();
  }, [
    cargarDashboard
  ]);


  const primerNombre =
    useMemo(
      () => {
        const nombre =
          usuario
            ?.nombre_completo
            ?.trim();

        if (!nombre) {
          return 'Usuario';
        }

        return nombre
          .split(/\s+/)[0];
      },
      [
        usuario
      ]
    );


  const roles =
    usuario
      ?.roles ||
    [];


  const accesos = [
    {
      key: 'pedido',
      title:
        'Registrar pedido',
      description:
        'Crea un nuevo pedido para un cliente.',
      icon:
        <ShoppingCartOutlined />,
      path:
        '/gestion/pedidos/registrar',
      tone:
        token.colorPrimary,
      background:
        token.colorPrimaryBg
    },

    {
      key: 'produccion',
      title:
        'Registrar producción',
      description:
        'Registra producto fabricado y consumo de materia prima.',
      icon:
        <BuildOutlined />,
      path:
        '/gestion/producciones/registrar',
      tone:
        token.colorSuccess,
      background:
        token.colorSuccessBg
    },

    {
      key: 'compra-mp',
      title:
        'Registrar lote',
      description:
        'Ingresa una nueva compra de materia prima.',
      icon:
        <DatabaseOutlined />,
      path:
        '/gestion/compras-materia-prima/registrar',
      tone:
        token.colorWarning,
      background:
        token.colorWarningBg
    },

    {
      key: 'entregas',
      title:
        'Ver entregas',
      description:
        'Consulta pedidos pendientes y registra entregas.',
      icon:
        <TruckOutlined />,
      path:
        '/gestion/entregas',
      tone:
        token.colorInfo,
      background:
        token.colorInfoBg
    }
  ];


  return (
    <div className="gd-dashboard">

      <PageHeader
        title={
          `Hola, ${primerNombre}`
        }
        description={
          'Aquí tienes un resumen general de la operación de GestionDriza.'
        }
        extra={
          <Button
            icon={
              <ReloadOutlined />
            }
            loading={
              cargando
            }
            onClick={
              cargarDashboard
            }
          >
            Actualizar
          </Button>
        }
      />


      {advertencia && (
        <Alert
          showIcon
          type="warning"
          message={
            advertencia
          }
          closable
          onClose={() =>
            setAdvertencia('')
          }
          className="gd-dashboard-alert"
        />
      )}


      <Row
        gutter={[
          16,
          16
        ]}
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Stock materia prima"
            value={
              datos
                .stockMateriaPrimaKg
            }
            precision={2}
            suffix="KG"
            icon={
              <DatabaseOutlined />
            }
            tone="primary"
            loading={
              cargando
            }
          />
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Stock producto terminado"
            value={
              datos
                .stockProductoTerminadoKg
            }
            precision={2}
            suffix="KG"
            icon={
              <ProductOutlined />
            }
            tone="success"
            loading={
              cargando
            }
          />
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Pedidos por entregar"
            value={
              datos
                .pedidosPendientes
            }
            icon={
              <TruckOutlined />
            }
            tone="warning"
            loading={
              cargando
            }
          />
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <MetricCard
            title="Lotes registrados"
            value={
              datos
                .lotesRegistrados
            }
            icon={
              <InboxOutlined />
            }
            tone="primary"
            loading={
              cargando
            }
          />
        </Col>

      </Row>


      <Row
        gutter={[
          18,
          18
        ]}
        className="gd-dashboard-secondary"
      >

        <Col
          xs={24}
          xl={16}
        >

          <Card
            title="Accesos rápidos"
            className="gd-dashboard-card"
          >

            <Row
              gutter={[
                14,
                14
              ]}
            >
              {
                accesos.map(
                  (item) => (
                    <Col
                      key={
                        item.key
                      }
                      xs={24}
                      sm={12}
                    >

                      <Card
                        size="small"
                        hoverable
                        className="gd-quick-card"
                        onClick={() =>
                          navigate(
                            item.path
                          )
                        }
                      >

                        <Space
                          align="start"
                          size={12}
                        >

                          <Avatar
                            size={42}
                            shape="square"
                            icon={
                              item.icon
                            }
                            style={{
                              color:
                                item.tone,
                              background:
                                item.background
                            }}
                          />


                          <div className="gd-quick-card-copy">

                            <Text strong>
                              {
                                item.title
                              }
                            </Text>

                            <Text
                              type="secondary"
                              className="gd-quick-card-description"
                            >
                              {
                                item.description
                              }
                            </Text>

                          </div>

                        </Space>

                      </Card>

                    </Col>
                  )
                )
              }
            </Row>

          </Card>

        </Col>


        <Col
          xs={24}
          xl={8}
        >

          <Card
            title="Tu sesión"
            className="gd-dashboard-card gd-session-card"
          >

            {
              cargando &&
              !usuario
                ? (
                  <Skeleton
                    active
                    avatar
                    paragraph={{
                      rows: 3
                    }}
                  />
                )
                : (
                  <div className="gd-session-content">

                    <Avatar
                      size={64}
                      icon={
                        <UserOutlined />
                      }
                      style={{
                        background:
                          token
                            .colorPrimaryBg,
                        color:
                          token
                            .colorPrimary
                      }}
                    />


                    <div className="gd-session-user">

                      <Title
                        level={4}
                        className="gd-session-name"
                      >
                        {
                          usuario
                            ?.nombre_completo ||
                          'Usuario'
                        }
                      </Title>

                      <Text
                        type="secondary"
                      >
                        {
                          usuario
                            ?.correo ||
                          '-'
                        }
                      </Text>

                    </div>


                    <Space
                      wrap
                      size={[
                        6,
                        6
                      ]}
                    >
                      {
                        roles.length > 0
                          ? roles.map(
                              (
                                rol: string
                              ) => (
                                <Tag
                                  key={
                                    rol
                                  }
                                  color="blue"
                                  icon={
                                    <SafetyCertificateOutlined />
                                  }
                                >
                                  {rol}
                                </Tag>
                              )
                            )
                          : (
                            <Tag>
                              Usuario
                            </Tag>
                          )
                      }
                    </Space>

                  </div>
                )
            }

          </Card>

        </Col>

      </Row>

    </div>
  );
}


export default Dashboard;


<<<END OF FILE>>>


---

## FILE: src\pages\DepositoPedidoDetalle.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Empty,
  Form,
  Input,
  InputNumber,
  Progress,
  Result,
  Row,
  Select,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DollarOutlined,
  SaveOutlined
} from '@ant-design/icons';

import dayjs, {
  Dayjs
} from 'dayjs';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import BackButton
  from '../components/ui/BackButton';

import PageHeader
  from '../components/ui/PageHeader';

import {
  formatMonto
} from '../utils/formatters';

import '../styles/depositosAntd.css';


const {
  Text
} = Typography;

const {
  TextArea
} = Input;


type EstadoPago =
  | 'PAGADO'
  | 'PARCIAL'
  | 'SIN_PAGO';


type TotalMoneda = {
  moneda_codigo:
    'PEN' | 'USD';

  total_pedido: number;
  total_depositado: number;
  saldo_pendiente: number;

  estado_pago:
    EstadoPago;
};


type TipoDeposito = {
  tipo_deposito_id: number;
  nombre: string;
  activo: boolean;
};


type DepositoHistorial = {
  deposito_id: number;
  tipo_deposito: string;

  fecha_deposito: string;
  monto: number;

  moneda_codigo:
    'PEN' | 'USD';

  numero_operacion?:
    string | null;

  observacion?:
    string | null;

  created_at?:
    string | null;

  registrado_por:
    string;
};


type PedidoDeposito = {
  pedido_id: number;
  codigo_pedido?: string | null;

  descripcion_pedido?:
    string | null;

  fecha_pedido: string;

  fecha_entrega_estimada?:
    string | null;

  estado_pedido: string;

  cliente_id: number;
  razon_social: string;
  ruc: string;

  direccion?:
    string | null;

  estado_pago_general:
    EstadoPago;

  totales:
    TotalMoneda[];

  historial_depositos:
    DepositoHistorial[];
};


type DepositoForm = {
  tipo_deposito_id:
    number;

  fecha_deposito:
    Dayjs;

  moneda_codigo:
    'PEN' | 'USD';

  monto:
    number;

  numero_operacion?:
    string;

  observacion?:
    string;
};


const estadoPagoTag = (
  estado:
    EstadoPago
) => {
  if (
    estado === 'PAGADO'
  ) {
    return (
      <Tag color="success">
        Pagado
      </Tag>
    );
  }

  if (
    estado === 'PARCIAL'
  ) {
    return (
      <Tag color="warning">
        Parcial
      </Tag>
    );
  }

  return (
    <Tag>
      Sin pago
    </Tag>
  );
};


function DepositoPedidoDetalle() {
  const {
    pedido_id
  } = useParams();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    DepositoForm
  >();

  const [
    pedido,
    setPedido
  ] = useState<
    PedidoDeposito | null
  >(null);

  const [
    tiposDeposito,
    setTiposDeposito
  ] = useState<
    TipoDeposito[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');

  const {
    procesando:
      registrandoDeposito,

    intentarBloquear:
      bloquearDeposito,

    liberar:
      liberarDeposito
  } = useBloqueoAccion();


  const cargarPedido =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/depositos/pedidos/${pedido_id}`
          );

        setPedido(
          data.pedido
        );
      },
      [
        pedido_id
      ]
    );


  const cargarTiposDeposito =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/depositos/tipos'
          );

        setTiposDeposito(
          data.tipos ||
          []
        );
      },
      []
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await Promise.all([
            cargarTiposDeposito(),
            cargarPedido()
          ]);

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el pedido';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarPedido,
    cargarTiposDeposito,
    message
  ]);


  useEffect(() => {
    form.setFieldsValue({
      fecha_deposito:
        dayjs(),

      moneda_codigo:
        'PEN'
    } as Partial<DepositoForm>);
  }, [
    form
  ]);


  const monedaSeleccionada =
    Form.useWatch(
      'moneda_codigo',
      form
    ) || 'PEN';


  const montoIngresado =
    Number(
      Form.useWatch(
        'monto',
        form
      ) || 0
    );


  const saldoSeleccionado =
    useMemo(
      () =>
        pedido?.totales.find(
          (total) =>
            total
              .moneda_codigo ===
            monedaSeleccionada
        ) || null,
      [
        monedaSeleccionada,
        pedido
      ]
    );


  const saldoPendiente =
    Number(
      saldoSeleccionado
        ?.saldo_pendiente ||
      0
    );


  const saldoDespues =
    Math.max(
      0,
      saldoPendiente -
      montoIngresado
    );


  const puedeRegistrarMoneda =
    Boolean(
      saldoSeleccionado &&
      saldoPendiente > 0
    );


  const registrarDeposito =
    async (
      values:
        DepositoForm
    ) => {
      if (
        !pedido ||
        !bloquearDeposito()
      ) {
        return;
      }

      try {
        await apiFetch(
          '/depositos',
          {
            method: 'POST',

            body:
              JSON.stringify({
                pedido_id:
                  pedido
                    .pedido_id,

                tipo_deposito_id:
                  Number(
                    values
                      .tipo_deposito_id
                  ),

                fecha_deposito:
                  values
                    .fecha_deposito
                    ?.format(
                      'YYYY-MM-DD'
                    ),

                monto:
                  Number(
                    values.monto
                  ),

                moneda_codigo:
                  values
                    .moneda_codigo,

                numero_operacion:
                  values
                    .numero_operacion
                    ?.trim() ||
                  '',

                observacion:
                  values
                    .observacion
                    ?.trim() ||
                  ''
              })
          }
        );


        message.success(
          'Depósito registrado correctamente'
        );


        form.resetFields();

        form.setFieldsValue({
          fecha_deposito:
            dayjs(),

          moneda_codigo:
            'PEN'
        } as Partial<DepositoForm>);


        await cargarPedido();


        liberarDeposito();

      } catch (error) {
        liberarDeposito();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el depósito'
        );

        throw error;
      }
    };


  const solicitarRegistro =
    async () => {
      let values:
        DepositoForm;

      try {
        values =
          await form
            .validateFields();

      } catch {
        return;
      }


      const saldo =
        pedido?.totales.find(
          (total) =>
            total
              .moneda_codigo ===
            values.moneda_codigo
        );


      if (!saldo) {
        message.error(
          `El pedido no tiene un total registrado en ${values.moneda_codigo}`
        );

        return;
      }


      const monto =
        Number(
          values.monto
        );


      if (
        monto >
        Number(
          saldo
            .saldo_pendiente
        )
      ) {
        message.error(
          `El monto excede el saldo pendiente de ${formatMonto(saldo.saldo_pendiente)} ${values.moneda_codigo}`
        );

        return;
      }


      modal.confirm({
        title:
          'Registrar depósito',

        content:
          `Se registrará un depósito de ${formatMonto(monto)} ${values.moneda_codigo}. Después del registro quedará un saldo pendiente de ${formatMonto(Number(saldo.saldo_pendiente) - monto)} ${values.moneda_codigo}.`,

        okText:
          'Registrar depósito',

        cancelText:
          'Cancelar',

        okButtonProps: {
          icon:
            <SaveOutlined />
        },

        onOk: () =>
          registrarDeposito(
            values
          )
      });
    };


  const totalesColumns:
    TableColumnsType<
      TotalMoneda
    > = [
    {
      title: 'Moneda',
      dataIndex:
        'moneda_codigo',
      key:
        'moneda_codigo',
      width: 120,

      render: (
        value:
          'PEN' | 'USD'
      ) => (
        <Tag
          color={
            value === 'PEN'
              ? 'blue'
              : 'green'
          }
        >
          {
            value === 'PEN'
              ? 'Soles (PEN)'
              : 'Dólares (USD)'
          }
        </Tag>
      )
    },

    {
      title: 'Total pedido',
      dataIndex:
        'total_pedido',
      key:
        'total_pedido',
      width: 160,

      render: (
        value: number,
        row
      ) => (
        <Text strong>
          {
            formatMonto(
              value
            )
          } {
            row
              .moneda_codigo
          }
        </Text>
      )
    },

    {
      title:
        'Total depositado',
      dataIndex:
        'total_depositado',
      key:
        'total_depositado',
      width: 175,

      render: (
        value: number,
        row
      ) =>
        `${formatMonto(value)} ${row.moneda_codigo}`
    },

    {
      title:
        'Saldo pendiente',
      dataIndex:
        'saldo_pendiente',
      key:
        'saldo_pendiente',
      width: 175,

      render: (
        value: number,
        row
      ) => (
        <Text
          strong
          type={
            Number(
              value
            ) > 0
              ? 'warning'
              : 'success'
          }
        >
          {
            formatMonto(
              value
            )
          } {
            row
              .moneda_codigo
          }
        </Text>
      )
    },

    {
      title: 'Estado',
      dataIndex:
        'estado_pago',
      key:
        'estado_pago',
      width: 130,

      render: (
        value:
          EstadoPago
      ) =>
        estadoPagoTag(
          value
        )
    }
  ];


  const historialColumns:
    TableColumnsType<
      DepositoHistorial
    > = [
    {
      title: 'Tipo',
      dataIndex:
        'tipo_deposito',
      key:
        'tipo_deposito',
      width: 160
    },

    {
      title: 'Fecha',
      dataIndex:
        'fecha_deposito',
      key:
        'fecha_deposito',
      width: 125,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Monto',
      key: 'monto',
      width: 155,

      render: (
        _,
        deposito
      ) => (
        <Text strong>
          {
            formatMonto(
              deposito
                .monto
            )
          } {
            deposito
              .moneda_codigo
          }
        </Text>
      )
    },

    {
      title: 'Operación',
      dataIndex:
        'numero_operacion',
      key:
        'numero_operacion',
      width: 160,

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      width: 180,
      responsive: [
        'md'
      ]
    },

    {
      title: 'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-deposito-page">

        <Skeleton
          active
          paragraph={{
            rows: 12
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !pedido
  ) {
    return (
      <div className="gd-deposito-page">

        <BackButton
          to="/gestion/depositos"
          label="Volver a depósitos"
        />


        <Result
          status="error"
          title="No se pudo cargar el pedido"
          subTitle={
            errorCarga ||
            'Pedido no encontrado'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-deposito-page">

      <BackButton
        to="/gestion/depositos"
        label="Volver a depósitos"
      />


      <PageHeader
        title={
          pedido.codigo_pedido
            ? `Pagos · ${pedido.codigo_pedido}`
            : 'Control de pagos'
        }
        description={
          `${pedido.razon_social} · ${pedido.ruc}`
        }
        extra={
          estadoPagoTag(
            pedido
              .estado_pago_general
          )
        }
      />


      <Card
        title="Datos del pedido"
        className="gd-deposito-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 4
          }}
          items={[
            {
              key: 'cliente',
              label: 'Cliente',
              children:
                pedido
                  .razon_social
            },

            {
              key: 'fecha',
              label: 'Fecha pedido',
              children:
                pedido
                  .fecha_pedido
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key: 'entrega',
              label:
                'Entrega estimada',
              children:
                pedido
                  .fecha_entrega_estimada
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key: 'direccion',
              label: 'Dirección',
              children:
                pedido.direccion ||
                '-'
            },

            {
              key: 'descripcion',
              label: 'Descripción',
              span: 4,
              children:
                pedido
                  .descripcion_pedido ||
                'Sin descripción'
            }
          ]}
        />

      </Card>


      <Card
        title="Resumen de pago por moneda"
        className="gd-deposito-section-card"
      >

        <Table<TotalMoneda>
          rowKey="moneda_codigo"
          columns={
            totalesColumns
          }
          dataSource={
            pedido.totales
          }
          pagination={false}
          scroll={{
            x: 720
          }}
        />

      </Card>


      <Card
        title="Registrar depósito"
        className="gd-deposito-section-card"
      >

        <Form<DepositoForm>
          form={form}
          layout="vertical"
          requiredMark={false}
          disabled={
            registrandoDeposito
          }
          initialValues={{
            fecha_deposito:
              dayjs(),

            moneda_codigo:
              'PEN'
          }}
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              md={12}
              xl={6}
            >

              <Form.Item
                label="Tipo de depósito"
                name="tipo_deposito_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona el tipo de depósito'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Selecciona"
                  options={
                    tiposDeposito.map(
                      (tipo) => ({
                        value:
                          tipo
                            .tipo_deposito_id,

                        label:
                          tipo.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={12}
              xl={6}
            >

              <Form.Item
                label="Fecha de depósito"
                name="fecha_deposito"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona la fecha'
                  }
                ]}
              >
                <DatePicker
                  size="large"
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={12}
              xl={6}
            >

              <Form.Item
                label="Moneda"
                name="moneda_codigo"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona la moneda'
                  }
                ]}
              >
                <Select
                  size="large"
                  options={[
                    {
                      value: 'PEN',
                      label:
                        'Soles (PEN)'
                    },
                    {
                      value: 'USD',
                      label:
                        'Dólares (USD)'
                    }
                  ]}
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={12}
              xl={6}
            >

              <Form.Item
                label="Monto"
                name="monto"
                extra={
                  saldoSeleccionado
                    ? `Saldo pendiente: ${formatMonto(saldoPendiente)} ${monedaSeleccionada}`
                    : `El pedido no tiene monto registrado en ${monedaSeleccionada}`
                }
                rules={[
                  {
                    required: true,
                    message:
                      'Ingresa el monto'
                  },
                  {
                    validator: (
                      _,
                      value
                    ) => {
                      const monto =
                        Number(
                          value ||
                          0
                        );

                      if (
                        monto <= 0
                      ) {
                        return Promise.reject(
                          new Error(
                            'El monto debe ser mayor a 0'
                          )
                        );
                      }

                      if (
                        !saldoSeleccionado
                      ) {
                        return Promise.reject(
                          new Error(
                            `El pedido no tiene monto registrado en ${monedaSeleccionada}`
                          )
                        );
                      }

                      if (
                        monto >
                        saldoPendiente
                      ) {
                        return Promise.reject(
                          new Error(
                            `El monto máximo es ${formatMonto(saldoPendiente)} ${monedaSeleccionada}`
                          )
                        );
                      }

                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <InputNumber
                  size="large"
                  min={0.01}
                  max={
                    puedeRegistrarMoneda
                      ? saldoPendiente
                      : undefined
                  }
                  precision={2}
                  step={0.01}
                  prefix={
                    <DollarOutlined />
                  }
                  addonAfter={
                    monedaSeleccionada
                  }
                  className="gd-full-width"
                  placeholder="0.00"
                  disabled={
                    !puedeRegistrarMoneda
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={12}
            >

              <Form.Item
                label="Número de operación"
                name="numero_operacion"
                rules={[
                  {
                    max: 100,
                    message:
                      'El número de operación no puede superar 100 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  maxLength={100}
                  placeholder="Ejemplo: OP-001"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={12}
            >

              <Form.Item
                label="Observación"
                name="observacion"
                rules={[
                  {
                    max: 300,
                    message:
                      'La observación no puede superar 300 caracteres'
                  }
                ]}
              >
                <TextArea
                  rows={3}
                  maxLength={300}
                  showCount
                  placeholder="Ejemplo: Adelanto del pedido"
                />
              </Form.Item>

            </Col>

          </Row>


          {
            saldoSeleccionado &&
            (
              <Card
                size="small"
                className="gd-deposito-balance-preview"
              >

                <Row
                  gutter={[
                    12,
                    12
                  ]}
                >

                  <Col
                    xs={24}
                    sm={8}
                  >
                    <Statistic
                      title="Saldo actual"
                      value={
                        saldoPendiente
                      }
                      precision={2}
                      suffix={
                        monedaSeleccionada
                      }
                    />
                  </Col>


                  <Col
                    xs={24}
                    sm={8}
                  >
                    <Statistic
                      title="Depósito"
                      value={
                        montoIngresado
                      }
                      precision={2}
                      suffix={
                        monedaSeleccionada
                      }
                    />
                  </Col>


                  <Col
                    xs={24}
                    sm={8}
                  >
                    <Statistic
                      title="Saldo después"
                      value={
                        saldoDespues
                      }
                      precision={2}
                      suffix={
                        monedaSeleccionada
                      }
                    />
                  </Col>

                </Row>


                <Progress
                  percent={
                    Number(
                      Math.min(
                        100,
                        saldoSeleccionado
                          .total_pedido >
                          0
                          ? (
                              (
                                Number(
                                  saldoSeleccionado
                                    .total_depositado
                                ) +
                                montoIngresado
                              ) /
                              Number(
                                saldoSeleccionado
                                  .total_pedido
                              )
                            ) *
                            100
                          : 0
                      ).toFixed(
                        2
                      )
                    )
                  }
                  status={
                    saldoDespues <= 0
                      ? 'success'
                      : 'active'
                  }
                  className="gd-deposito-payment-progress"
                />

              </Card>
            )
          }


          {
            !saldoSeleccionado &&
            (
              <Alert
                type="warning"
                showIcon
                message={
                  `Este pedido no tiene total en ${monedaSeleccionada}`
                }
                description="Selecciona una moneda utilizada por los productos del pedido."
                className="gd-deposito-inline-alert"
              />
            )
          }


          {
            saldoSeleccionado &&
            saldoPendiente <= 0 &&
            (
              <Alert
                type="success"
                showIcon
                message={
                  `El saldo en ${monedaSeleccionada} ya está pagado completamente.`
                }
                className="gd-deposito-inline-alert"
              />
            )
          }


          <div className="gd-deposito-actions">

            <Button
              type="primary"
              icon={
                <SaveOutlined />
              }
              loading={
                registrandoDeposito
              }
              disabled={
                !puedeRegistrarMoneda
              }
              onClick={
                solicitarRegistro
              }
            >
              Guardar depósito
            </Button>

          </div>

        </Form>

      </Card>


      <Card
        title="Historial de depósitos"
        extra={
          <Text
            type="secondary"
          >
            {
              pedido
                .historial_depositos
                .length
            } depósito(s)
          </Text>
        }
        className="gd-deposito-section-card"
      >

        <Table<
          DepositoHistorial
        >
          rowKey="deposito_id"
          columns={
            historialColumns
          }
          dataSource={
            pedido
              .historial_depositos
          }
          pagination={false}
          scroll={{
            x: 820
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay depósitos registrados para este pedido"
              />
          }}
        />

      </Card>

    </div>
  );
}


export default DepositoPedidoDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\Depositos.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  EyeOutlined,
  ReloadOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import PageHeader
  from '../components/ui/PageHeader';

import {
  formatMonto
} from '../utils/formatters';

import '../styles/depositosAntd.css';


const {
  Text
} = Typography;


type EstadoPago =
  | 'PAGADO'
  | 'PARCIAL'
  | 'SIN_PAGO';


type PedidoDeposito = {
  pedido_id: number;
  codigo_pedido?: string | null;
  descripcion_pedido?: string | null;

  fecha_pedido: string;
  fecha_entrega_estimada?: string | null;

  estado_pedido: string;

  cliente_id: number;
  razon_social: string;
  ruc: string;

  cantidad_monedas: number;

  total_referencial: number;
  depositado_referencial: number;
  saldo_referencial: number;

  estado_pago_general:
    EstadoPago;
};


type Filtros = {
  cliente_id?: number;
  q?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const estadoPagoTag = (
  estado: EstadoPago
) => {
  if (
    estado === 'PAGADO'
  ) {
    return (
      <Tag color="success">
        Pagado
      </Tag>
    );
  }

  if (
    estado === 'PARCIAL'
  ) {
    return (
      <Tag color="warning">
        Parcial
      </Tag>
    );
  }

  return (
    <Tag>
      Sin pago
    </Tag>
  );
};


function Depositos() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    Filtros
  >();

  const [
    pedidos,
    setPedidos
  ] = useState<
    PedidoDeposito[]
  >([]);

  const [
    clientes,
    setClientes
  ] = useState<any[]>(
    []
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<
    Filtros
  >({});

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarClientes =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/clientes/select'
          );

        setClientes(
          data.clientes ||
          []
        );
      },
      []
    );


  const cargarPedidos =
    useCallback(
      async (
        pagina: number,
        filtros:
          Filtros
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(pagina)
        );

        params.set(
          'limit',
          '10'
        );

        if (
          filtros.cliente_id
        ) {
          params.set(
            'cliente_id',
            String(
              filtros.cliente_id
            )
          );
        }

        if (
          filtros.q?.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }

        const data =
          await apiFetch(
            `/depositos/pedidos?${params.toString()}`
          );

        setPedidos(
          data.pedidos ||
          []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  const cargarTodo =
    useCallback(
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarClientes(),
            cargarPedidos(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los pedidos'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarClientes,
        cargarPedidos,
        filtrosAplicados,
        message,
        page
      ]
    );


  useEffect(() => {
    cargarTodo();
  }, [
    cargarTodo
  ]);


  const aplicarFiltros =
    (
      values:
        Filtros
    ) => {
      setPage(1);

      setFiltrosAplicados({
        cliente_id:
          values.cliente_id,

        q:
          values.q?.trim() ||
          ''
      });
    };


  const limpiarFiltros =
    () => {
      form.resetFields();
      setPage(1);
      setFiltrosAplicados({});
    };


  const columns:
    TableColumnsType<
      PedidoDeposito
    > = [
    {
      title: 'Código',
      dataIndex:
        'codigo_pedido',
      key:
        'codigo_pedido',
      width: 130,

      render: (
        value?:
          string | null
      ) =>
        value
          ? (
              <Text code>
                {value}
              </Text>
            )
          : '-'
    },

    {
      title: 'Cliente',
      key: 'cliente',
      minWidth: 220,

      render: (
        _,
        pedido
      ) => (
        <div className="gd-deposito-client-cell">

          <Text strong>
            {
              pedido
                .razon_social
            }
          </Text>

          <Text
            type="secondary"
          >
            {pedido.ruc}
          </Text>

        </div>
      )
    },

    {
      title: 'Fecha pedido',
      dataIndex:
        'fecha_pedido',
      key:
        'fecha_pedido',
      width: 130,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Estado pago',
      dataIndex:
        'estado_pago_general',
      key:
        'estado_pago_general',
      width: 135,

      render: (
        value:
          EstadoPago
      ) =>
        estadoPagoTag(
          value
        )
    },

    {
      title: 'Monedas',
      dataIndex:
        'cantidad_monedas',
      key:
        'cantidad_monedas',
      width: 100,
      responsive: [
        'md'
      ],

      render: (
        value: number
      ) => (
        <Tag color="blue">
          {value}
        </Tag>
      )
    },

    {
      title: 'Total ref.',
      dataIndex:
        'total_referencial',
      key:
        'total_referencial',
      width: 130,
      responsive: [
        'lg'
      ],

      render: (
        value: number
      ) => (
        <Text strong>
          {
            formatMonto(
              value || 0
            )
          }
        </Text>
      )
    },

    {
      title:
        'Depositado ref.',
      dataIndex:
        'depositado_referencial',
      key:
        'depositado_referencial',
      width: 145,
      responsive: [
        'lg'
      ],

      render: (
        value: number
      ) =>
        formatMonto(
          value || 0
        )
    },

    {
      title: 'Saldo ref.',
      dataIndex:
        'saldo_referencial',
      key:
        'saldo_referencial',
      width: 130,
      responsive: [
        'lg'
      ],

      render: (
        value: number
      ) => (
        <Text
          strong
          type={
            Number(
              value || 0
            ) > 0
              ? 'warning'
              : undefined
          }
        >
          {
            formatMonto(
              value || 0
            )
          }
        </Text>
      )
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 145,

      render: (
        _,
        pedido
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/depositos/${pedido.pedido_id}`
            )
          }
        >
          Ver pedido
        </Button>
      )
    }
  ];


  return (
    <div className="gd-deposito-page">

      <PageHeader
        title="Depósitos"
        description="Controla pagos registrados y saldos pendientes por pedido."
      />


      <Card
        title="Filtros"
        className="gd-deposito-filter-card"
      >

        <Form<Filtros>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={
            aplicarFiltros
          }
        >

          <Row
            gutter={[
              14,
              0
            ]}
            align="bottom"
          >

            <Col
              xs={24}
              lg={9}
            >

              <Form.Item
                label="Cliente"
                name="cliente_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos los clientes"
                  options={
                    clientes.map(
                      (cliente) => ({
                        value:
                          cliente
                            .cliente_id,

                        label:
                          `${cliente.razon_social} · ${cliente.ruc}`
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={9}
            >

              <Form.Item
                label="Buscar"
                name="q"
              >
                <Input
                  allowClear
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Cliente, RUC, código o descripción"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={6}
            >

              <Form.Item
                label=" "
                className="gd-deposito-filter-actions"
              >

                <Space
                  wrap
                >

                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <SearchOutlined />
                    }
                  >
                    Buscar
                  </Button>


                  <Button
                    onClick={
                      limpiarFiltros
                    }
                  >
                    Limpiar
                  </Button>


                  <Button
                    icon={
                      <ReloadOutlined />
                    }
                    loading={
                      cargando
                    }
                    onClick={
                      cargarTodo
                    }
                  >
                    Actualizar
                  </Button>

                </Space>

              </Form.Item>

            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Pedidos con control de depósitos"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } pedido(s)
          </Text>
        }
        className="gd-deposito-table-card"
      >

        <Table<
          PedidoDeposito
        >
          rowKey="pedido_id"
          columns={columns}
          dataSource={
            pedidos
          }
          loading={
            cargando
          }
          scroll={{
            x: 1000
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay pedidos para mostrar"
              />
          }}
          pagination={{
            current:
              paginacion.page,

            pageSize:
              paginacion.limit,

            total:
              paginacion.total,

            showSizeChanger:
              false,

            showTotal: (
              total
            ) =>
              `${total} pedido(s)`,

            onChange: (
              nuevaPagina
            ) =>
              setPage(
                nuevaPagina
              )
          }}
        />

      </Card>

    </div>
  );
}


export default Depositos;


<<<END OF FILE>>>


---

## FILE: src\pages\EntregaPedidoDetalle.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Empty,
  Form,
  Input,
  InputNumber,
  Result,
  Row,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  SaveOutlined
} from '@ant-design/icons';

import dayjs, {
  Dayjs
} from 'dayjs';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import BackButton
  from '../components/ui/BackButton';

import PageHeader
  from '../components/ui/PageHeader';

import {
  formatCantidad
} from '../utils/formatters';

import '../styles/entregasAntd.css';


const {
  Text
} = Typography;

const {
  TextArea
} = Input;


type EstadoItem =
  | 'PENDIENTE'
  | 'PARCIAL'
  | 'COMPLETO';


type EstadoStock =
  | 'CON_STOCK'
  | 'SIN_STOCK'
  | 'SIN_PRESENTACION'
  | 'SIN_PRODUCTO';


type DetalleEntrega = {
  pedido_detalle_id: number;

  producto_id?: number | null;

  tipo_producto: string;
  material: string;
  medida: string;
  color: string;

  descripcion_item?: string | null;

  cantidad_pedida: number;
  cantidad_entregada: number;
  cantidad_pendiente: number;

  unidad_medida_id: number;
  unidad: string;

  estado_item:
    EstadoItem;

  cantidad_presentacion?:
    number | null;

  unidad_presentacion_id?:
    number | null;

  unidad_presentacion?:
    string | null;

  stock_disponible: number;

  presentaciones_disponibles?:
    number | null;

  estado_stock:
    EstadoStock;

  cantidad_entregada_input:
    number | null;

  observacion_entrega:
    string;
};


type HistorialDetalle = {
  entrega_detalle_id: number;
  cantidad_entregada: number;
  observacion?: string | null;
  producto: string;
  unidad: string;
  cantidad_presentacion?:
    number | null;
  unidad_presentacion?:
    string | null;
};


type HistorialEntrega = {
  entrega_id: number;
  fecha_entrega: string;
  created_at?: string | null;
  comentario_entrega?: string | null;
  registrado_por: string;
  detalles:
    HistorialDetalle[];
};


type PedidoEntrega = {
  pedido_id: number;
  codigo_pedido?: string | null;
  descripcion_pedido?: string | null;

  fecha_pedido: string;
  fecha_entrega_estimada?: string | null;
  estado_pedido: string;

  cliente_id: number;
  razon_social: string;
  ruc: string;
  direccion?: string | null;

  estado_entrega_general:
    EstadoItem;

  detalles:
    DetalleEntrega[];

  historial_entregas:
    HistorialEntrega[];
};


const nuevaKey = () => {
  if (
    typeof crypto !==
      'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    'entrega',
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join('-');
};


const estadoItemTag = (
  estado: string
) => {
  if (
    estado === 'COMPLETO'
  ) {
    return (
      <Tag color="success">
        Completo
      </Tag>
    );
  }

  if (
    estado === 'PARCIAL'
  ) {
    return (
      <Tag color="warning">
        Parcial
      </Tag>
    );
  }

  return (
    <Tag color="processing">
      Pendiente
    </Tag>
  );
};


const estadoStockTag = (
  estado: EstadoStock
) => {
  if (
    estado === 'CON_STOCK'
  ) {
    return (
      <Tag color="success">
        Stock disponible
      </Tag>
    );
  }

  if (
    estado === 'SIN_STOCK'
  ) {
    return (
      <Tag color="error">
        Sin stock
      </Tag>
    );
  }

  if (
    estado === 'SIN_PRESENTACION'
  ) {
    return (
      <Tag color="warning">
        Sin presentación
      </Tag>
    );
  }

  return (
    <Tag color="error">
      Producto no configurado
    </Tag>
  );
};


const estadoStockTexto = (
  estado: EstadoStock
) => {
  if (
    estado === 'CON_STOCK'
  ) {
    return 'stock disponible';
  }

  if (
    estado === 'SIN_STOCK'
  ) {
    return 'sin stock';
  }

  if (
    estado === 'SIN_PRESENTACION'
  ) {
    return 'presentación no configurada';
  }

  return 'producto no configurado';
};


function EntregaPedidoDetalle() {
  const {
    pedido_id
  } = useParams();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    pedido,
    setPedido
  ] = useState<
    PedidoEntrega | null
  >(null);

  const [
    detallesEntrega,
    setDetallesEntrega
  ] = useState<
    DetalleEntrega[]
  >([]);

  const [
    fechaEntrega,
    setFechaEntrega
  ] = useState<
    Dayjs | null
  >(
    dayjs()
  );

  const [
    comentarioEntrega,
    setComentarioEntrega
  ] = useState('');

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');

  const [
    idempotencyKey,
    setIdempotencyKey
  ] = useState(
    nuevaKey
  );

  const {
    procesando:
      registrandoEntrega,

    intentarBloquear:
      bloquearEntrega,

    liberar:
      liberarEntrega
  } = useBloqueoAccion();


  const cargarPedido =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/entregas/pedidos/${pedido_id}`
          );

        const pedidoApi:
          PedidoEntrega =
          data.pedido;

        setPedido(
          pedidoApi
        );

        setDetallesEntrega(
          pedidoApi.detalles.map(
            (item) => ({
              ...item,

              cantidad_entregada_input:
                null,

              observacion_entrega:
                ''
            })
          )
        );
      },
      [
        pedido_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await cargarPedido();

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el pedido';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarPedido,
    message
  ]);


  const cantidadMaximaEntregable = (
    detalle:
      DetalleEntrega
  ) => {
    const pendiente =
      Number(
        detalle
          .cantidad_pendiente ||
        0
      );

    const stock =
      Number(
        detalle
          .stock_disponible ||
        0
      );

    const presentacion =
      Number(
        detalle
          .cantidad_presentacion ||
        0
      );

    if (
      presentacion <= 0
    ) {
      return 0;
    }

    const limite =
      Math.min(
        pendiente,
        stock
      );

    const unidades =
      Math.floor(
        (
          limite +
          0.000001
        ) /
        presentacion
      );

    return Number(
      (
        unidades *
        presentacion
      ).toFixed(3)
    );
  };


  const actualizarDetalle = (
    index: number,
    cambios:
      Partial<
        DetalleEntrega
      >
  ) => {
    if (
      registrandoEntrega
    ) {
      return;
    }

    setDetallesEntrega(
      (actuales) =>
        actuales.map(
          (
            item,
            i
          ) =>
            i === index
              ? {
                  ...item,
                  ...cambios
                }
              : item
        )
    );
  };


  const validarDetalle = (
    detalle:
      DetalleEntrega,
    index: number
  ) => {
    const valor =
      Number(
        detalle
          .cantidad_entregada_input ||
        0
      );

    if (
      valor <= 0
    ) {
      return null;
    }

    if (
      detalle.estado_item ===
      'COMPLETO'
    ) {
      return (
        `El producto ${index + 1} ya fue entregado completamente`
      );
    }

    if (
      detalle.estado_stock !==
      'CON_STOCK'
    ) {
      return (
        `El producto ${index + 1} no está disponible para entrega: ${estadoStockTexto(detalle.estado_stock)}`
      );
    }

    const pendiente =
      Number(
        detalle
          .cantidad_pendiente ||
        0
      );

    const stock =
      Number(
        detalle
          .stock_disponible ||
        0
      );

    const presentacion =
      Number(
        detalle
          .cantidad_presentacion ||
        0
      );

    if (
      valor >
      pendiente +
      0.000001
    ) {
      return (
        `El producto ${index + 1} solo tiene ${formatCantidad(pendiente)} ${detalle.unidad} pendientes`
      );
    }

    if (
      valor >
      stock +
      0.000001
    ) {
      return (
        `El producto ${index + 1} solo tiene ${formatCantidad(stock)} ${detalle.unidad} disponibles en almacén`
      );
    }

    if (
      presentacion <= 0
    ) {
      return (
        `El producto ${index + 1} no tiene presentación configurada`
      );
    }

    /*
     * Conservamos escala 1000 para reflejar la regla
     * histórica/backend, aunque el usuario vea e ingrese
     * normalmente 2 decimales.
     */
    const valorMil =
      Math.round(
        valor *
        1000
      );

    const presentacionMil =
      Math.round(
        presentacion *
        1000
      );

    if (
      presentacionMil <= 0 ||
      valorMil %
        presentacionMil !==
        0
    ) {
      return (
        `El producto ${index + 1} debe entregarse en múltiplos de ${formatCantidad(presentacion)} ${detalle.unidad_presentacion || detalle.unidad}`
      );
    }

    return null;
  };


  const detallesARegistrar =
    useMemo(
      () =>
        detallesEntrega.filter(
          (item) =>
            Number(
              item
                .cantidad_entregada_input ||
              0
            ) > 0
        ),
      [
        detallesEntrega
      ]
    );


  const totalesPorUnidad =
    useMemo(
      () => {
        const totales =
          new Map<
            string,
            number
          >();

        for (
          const item
          of detallesARegistrar
        ) {
          const unidad =
            item.unidad ||
            'UNID.';

          totales.set(
            unidad,
            (
              totales.get(
                unidad
              ) || 0
            ) +
            Number(
              item
                .cantidad_entregada_input ||
              0
            )
          );
        }

        return Array.from(
          totales.entries()
        ).map(
          ([
            unidad,
            total
          ]) => ({
            unidad,
            total
          })
        );
      },
      [
        detallesARegistrar
      ]
    );


  const registrarEntrega =
    async () => {
      if (
        !pedido ||
        !bloquearEntrega()
      ) {
        return;
      }

      const detalles =
        detallesARegistrar.map(
          (item) => ({
            pedido_detalle_id:
              item
                .pedido_detalle_id,

            cantidad_entregada:
              Number(
                item
                  .cantidad_entregada_input
              ),

            unidad_medida_id:
              item
                .unidad_medida_id,

            observacion:
              item
                .observacion_entrega
                .trim() ||
              null
          })
        );


      try {
        const data =
          await apiFetch(
            '/entregas',
            {
              method: 'POST',

              headers: {
                'Idempotency-Key':
                  idempotencyKey
              },

              body:
                JSON.stringify({
                  pedido_id:
                    pedido
                      .pedido_id,

                  fecha_entrega:
                    fechaEntrega
                      ? fechaEntrega
                          .format(
                            'YYYY-MM-DD'
                          )
                      : undefined,

                  comentario_entrega:
                    comentarioEntrega
                      .trim() ||
                    null,

                  detalles
                })
            }
          );


        if (
          data.reutilizada
        ) {
          message.info(
            'La entrega ya había sido registrada. Se recuperó el registro existente sin descontar stock nuevamente.'
          );

        } else {
          message.success(
            'Entrega registrada correctamente'
          );
        }


        setComentarioEntrega(
          ''
        );

        setFechaEntrega(
          dayjs()
        );

        /*
         * Nueva acción confirmada:
         * a partir de aquí sí corresponde una nueva key.
         */
        setIdempotencyKey(
          nuevaKey()
        );

        await cargarPedido();

        liberarEntrega();

      } catch (error) {
        /*
         * En error conservamos la misma Idempotency-Key
         * para que un retry no duplique la operación.
         */
        liberarEntrega();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar la entrega'
        );

        throw error;
      }
    };


  const solicitarRegistro =
    () => {
      if (!pedido) {
        message.error(
          'No se encontró el pedido'
        );

        return;
      }

      if (
        detallesARegistrar
          .length === 0
      ) {
        message.error(
          'Ingresa al menos una cantidad a entregar'
        );

        return;
      }

      for (
        let i = 0;
        i <
        detallesEntrega.length;
        i++
      ) {
        const error =
          validarDetalle(
            detallesEntrega[i],
            i
          );

        if (error) {
          message.error(
            error
          );

          return;
        }
      }


      const resumen =
        totalesPorUnidad
          .map(
            (item) =>
              `${formatCantidad(item.total)} ${item.unidad}`
          )
          .join(' · ');


      modal.confirm({
        title:
          'Registrar entrega',

        content:
          `Se registrarán ${detallesARegistrar.length} producto(s) por ${resumen}. Se descontará el stock de producto terminado de la presentación indicada en el pedido.`,

        okText:
          'Registrar entrega',

        cancelText:
          'Cancelar',

        okButtonProps: {
          icon:
            <SaveOutlined />
        },

        onOk:
          registrarEntrega
      });
    };


  const historialColumns:
    TableColumnsType<
      HistorialDetalle
    > = [
    {
      title: 'Producto',
      dataIndex:
        'producto',
      key:
        'producto',
      minWidth: 240,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title:
        'Presentación',
      key:
        'presentacion',
      width: 165,

      render: (
        _,
        item
      ) =>
        item
          .cantidad_presentacion
          ? `${formatCantidad(item.cantidad_presentacion)} ${item.unidad_presentacion || ''}`
          : '-'
    },

    {
      title: 'Cantidad',
      key: 'cantidad',
      width: 150,

      render: (
        _,
        item
      ) => (
        <Text strong>
          {
            formatCantidad(
              item
                .cantidad_entregada
            )
          } {
            item.unidad
          }
        </Text>
      )
    },

    {
      title:
        'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    }
  ];


  const fechaHoraTexto = (
    valor?:
      string | null
  ) => {
    if (!valor) {
      return '-';
    }

    const fecha =
      new Date(
        valor
      );

    if (
      Number.isNaN(
        fecha.getTime()
      )
    ) {
      return valor;
    }

    return fecha.toLocaleString(
      'es-PE'
    );
  };


  if (
    cargando
  ) {
    return (
      <div className="gd-entrega-page">

        <Skeleton
          active
          paragraph={{
            rows: 14
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !pedido
  ) {
    return (
      <div className="gd-entrega-page">

        <BackButton
          to="/gestion/entregas"
          label="Volver a entregas"
        />


        <Result
          status="error"
          title="No se pudo cargar el pedido"
          subTitle={
            errorCarga ||
            'Pedido no encontrado'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-entrega-page">

      <BackButton
        to="/gestion/entregas"
        label="Volver a entregas"
      />


      <PageHeader
        title={
          pedido.codigo_pedido
            ? `Entrega · ${pedido.codigo_pedido}`
            : 'Registrar entrega'
        }
        description={
          `${pedido.razon_social} · ${pedido.ruc}`
        }
        extra={
          estadoItemTag(
            pedido
              .estado_entrega_general
          )
        }
      />


      <Card
        title="Datos del pedido"
        className="gd-entrega-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 4
          }}
          items={[
            {
              key: 'cliente',
              label: 'Cliente',
              children:
                pedido
                  .razon_social
            },

            {
              key: 'fecha',
              label: 'Fecha pedido',
              children:
                pedido
                  .fecha_pedido
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key:
                'entrega-estimada',
              label:
                'Entrega estimada',
              children:
                pedido
                  .fecha_entrega_estimada
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key: 'direccion',
              label: 'Dirección',
              children:
                pedido.direccion ||
                '-'
            },

            {
              key: 'descripcion',
              label: 'Descripción',
              span: 4,
              children:
                pedido
                  .descripcion_pedido ||
                'Sin descripción'
            }
          ]}
        />

      </Card>


      <Card
        title="Registrar nueva entrega"
        className="gd-entrega-section-card"
      >

        <Alert
          type="info"
          showIcon
          message="La cantidad entregada debe respetar la presentación solicitada en el pedido."
          description="El sistema valida el pendiente, el stock disponible y los múltiplos de presentación antes de registrar la entrega."
          className="gd-entrega-main-rule"
        />


        <Form
          layout="vertical"
          requiredMark={false}
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              md={8}
            >

              <Form.Item
                label="Fecha de entrega"
                required
              >
                <DatePicker
                  size="large"
                  value={
                    fechaEntrega
                  }
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  disabled={
                    registrandoEntrega
                  }
                  onChange={
                    setFechaEntrega
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={16}
            >

              <Form.Item
                label="Comentario de entrega"
              >
                <TextArea
                  rows={3}
                  maxLength={500}
                  showCount
                  value={
                    comentarioEntrega
                  }
                  placeholder="Ejemplo: Primera entrega parcial del pedido"
                  disabled={
                    registrandoEntrega
                  }
                  onChange={(e) =>
                    setComentarioEntrega(
                      e.target.value
                    )
                  }
                />
              </Form.Item>

            </Col>

          </Row>

        </Form>


        <Space
          direction="vertical"
          size={16}
          className="gd-entrega-products-space"
        >

          {
            detallesEntrega.map(
              (
                detalle,
                index
              ) => {
                const estaCompleto =
                  detalle
                    .estado_item ===
                  'COMPLETO';

                const stock =
                  Number(
                    detalle
                      .stock_disponible ||
                    0
                  );

                const presentacion =
                  Number(
                    detalle
                      .cantidad_presentacion ||
                    0
                  );

                const maximo =
                  cantidadMaximaEntregable(
                    detalle
                  );

                const valorActual =
                  Number(
                    detalle
                      .cantidad_entregada_input ||
                    0
                  );

                const errorItem =
                  validarDetalle(
                    detalle,
                    index
                  );

                const puedeEntregar =
                  !estaCompleto &&
                  detalle.estado_stock ===
                    'CON_STOCK' &&
                  maximo > 0;


                return (
                  <Card
                    key={
                      detalle
                        .pedido_detalle_id
                    }
                    size="small"
                    title={
                      <div className="gd-entrega-product-title">

                        <Text strong>
                          {
                            detalle
                              .tipo_producto
                          }
                          {' · '}
                          {
                            detalle.material
                          }
                          {' · '}
                          {
                            detalle.medida
                          }
                          {' · '}
                          {
                            detalle.color
                          }
                        </Text>

                        <Text
                          type="secondary"
                        >
                          {
                            detalle
                              .descripcion_item ||
                            'Sin descripción específica'
                          }
                        </Text>

                      </div>
                    }
                    extra={
                      <Space
                        wrap
                        size={6}
                      >

                        {
                          estadoItemTag(
                            detalle
                              .estado_item
                          )
                        }

                        {
                          !estaCompleto &&
                          estadoStockTag(
                            detalle
                              .estado_stock
                          )
                        }

                      </Space>
                    }
                    className="gd-entrega-product-card"
                  >

                    <Row
                      gutter={[
                        12,
                        12
                      ]}
                      className="gd-entrega-product-summary"
                    >

                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Pedido"
                            value={
                              Number(
                                detalle
                                  .cantidad_pedida
                              )
                            }
                            precision={2}
                            suffix={
                              detalle.unidad
                            }
                          />
                        </Card>
                      </Col>


                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Entregado"
                            value={
                              Number(
                                detalle
                                  .cantidad_entregada
                              )
                            }
                            precision={2}
                            suffix={
                              detalle.unidad
                            }
                          />
                        </Card>
                      </Col>


                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Pendiente"
                            value={
                              Number(
                                detalle
                                  .cantidad_pendiente
                              )
                            }
                            precision={2}
                            suffix={
                              detalle.unidad
                            }
                          />
                        </Card>
                      </Col>


                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Presentación"
                            value={
                              presentacion >
                              0
                                ? presentacion
                                : 0
                            }
                            precision={2}
                            suffix={
                              presentacion >
                              0
                                ? (
                                    detalle
                                      .unidad_presentacion ||
                                    detalle.unidad
                                  )
                                : ''
                            }
                          />
                        </Card>
                      </Col>


                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Stock disponible"
                            value={
                              stock
                            }
                            precision={2}
                            suffix={
                              detalle.unidad
                            }
                          />
                        </Card>
                      </Col>


                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Presentaciones disponibles"
                            value={
                              Number(
                                detalle
                                  .presentaciones_disponibles ||
                                0
                              )
                            }
                            precision={2}
                          />
                        </Card>
                      </Col>

                    </Row>


                    {
                      estaCompleto
                        ? (
                            <Alert
                              type="success"
                              showIcon
                              message="Este producto ya fue entregado completamente."
                              className="gd-entrega-inline-alert"
                            />
                          )
                        : (
                            <>
                              {
                                detalle.estado_stock ===
                                  'SIN_PRODUCTO' &&
                                (
                                  <Alert
                                    type="error"
                                    showIcon
                                    message="Producto no configurado"
                                    description="Este producto todavía no está configurado en el catálogo de productos terminados."
                                    className="gd-entrega-inline-alert"
                                  />
                                )
                              }


                              {
                                detalle.estado_stock ===
                                  'SIN_PRESENTACION' &&
                                (
                                  <Alert
                                    type="warning"
                                    showIcon
                                    message="Presentación no configurada"
                                    description="El pedido no tiene una presentación válida configurada para este producto."
                                    className="gd-entrega-inline-alert"
                                  />
                                )
                              }


                              {
                                detalle.estado_stock ===
                                  'SIN_STOCK' &&
                                (
                                  <Alert
                                    type="error"
                                    showIcon
                                    message="Sin stock disponible"
                                    description="No existe stock disponible para esta presentación."
                                    className="gd-entrega-inline-alert"
                                  />
                                )
                              }


                              {
                                detalle.estado_stock ===
                                  'CON_STOCK' &&
                                maximo <= 0 &&
                                presentacion > 0 &&
                                (
                                  <Alert
                                    type="warning"
                                    showIcon
                                    message="Stock insuficiente para una presentación completa"
                                    description={
                                      `Hay ${formatCantidad(stock)} ${detalle.unidad} disponibles, pero la entrega debe realizarse en múltiplos de ${formatCantidad(presentacion)} ${detalle.unidad_presentacion || detalle.unidad}.`
                                    }
                                    className="gd-entrega-inline-alert"
                                  />
                                )
                              }


                              {
                                puedeEntregar &&
                                (
                                  <Alert
                                    type="info"
                                    showIcon
                                    message={
                                      `Máximo entregable: ${formatCantidad(maximo)} ${detalle.unidad}`
                                    }
                                    description={
                                      `La cantidad debe ser múltiplo de ${formatCantidad(presentacion)} ${detalle.unidad_presentacion || detalle.unidad}.`
                                    }
                                    className="gd-entrega-inline-alert"
                                  />
                                )
                              }


                              <Form
                                layout="vertical"
                                requiredMark={false}
                              >

                                <Row
                                  gutter={[
                                    14,
                                    0
                                  ]}
                                >

                                  <Col
                                    xs={24}
                                    md={8}
                                  >

                                    <Form.Item
                                      label="Cantidad a entregar"
                                    >
                                      <InputNumber
                                        value={
                                          detalle
                                            .cantidad_entregada_input
                                        }
                                        min={0}
                                        max={
                                          maximo ||
                                          undefined
                                        }
                                        step={
                                          presentacion >
                                          0
                                            ? presentacion
                                            : 0.01
                                        }
                                        precision={2}
                                        addonAfter={
                                          detalle.unidad
                                        }
                                        className="gd-full-width"
                                        placeholder={
                                          puedeEntregar
                                            ? `Máximo ${formatCantidad(maximo)}`
                                            : 'No disponible'
                                        }
                                        disabled={
                                          registrandoEntrega ||
                                          !puedeEntregar
                                        }
                                        onChange={(
                                          value
                                        ) =>
                                          actualizarDetalle(
                                            index,
                                            {
                                              cantidad_entregada_input:
                                                value
                                            }
                                          )
                                        }
                                      />
                                    </Form.Item>

                                  </Col>


                                  <Col
                                    xs={24}
                                    md={16}
                                  >

                                    <Form.Item
                                      label="Observación"
                                    >
                                      <Input
                                        value={
                                          detalle
                                            .observacion_entrega
                                        }
                                        maxLength={300}
                                        placeholder="Opcional"
                                        disabled={
                                          registrandoEntrega ||
                                          !puedeEntregar
                                        }
                                        onChange={(e) =>
                                          actualizarDetalle(
                                            index,
                                            {
                                              observacion_entrega:
                                                e.target
                                                  .value
                                            }
                                          )
                                        }
                                      />
                                    </Form.Item>

                                  </Col>

                                </Row>

                              </Form>


                              {
                                valorActual >
                                  0 &&
                                errorItem &&
                                (
                                  <Alert
                                    type="error"
                                    showIcon
                                    message={
                                      errorItem
                                    }
                                  />
                                )
                              }

                            </>
                          )
                    }

                  </Card>
                );
              }
            )
          }

        </Space>


        <div className="gd-entrega-selection-summary">

          <Card
            size="small"
          >
            <Statistic
              title="Productos seleccionados"
              value={
                detallesARegistrar
                  .length
              }
            />
          </Card>


          {
            totalesPorUnidad.map(
              (item) => (
                <Card
                  size="small"
                  key={
                    item.unidad
                  }
                >
                  <Statistic
                    title={
                      `Total ${item.unidad}`
                    }
                    value={
                      item.total
                    }
                    precision={2}
                    suffix={
                      item.unidad
                    }
                  />
                </Card>
              )
            )
          }

        </div>


        <div className="gd-entrega-actions">

          <Button
            type="primary"
            icon={
              <SaveOutlined />
            }
            loading={
              registrandoEntrega
            }
            disabled={
              detallesARegistrar
                .length === 0
            }
            onClick={
              solicitarRegistro
            }
          >
            Registrar entrega
          </Button>

        </div>

      </Card>


      <Card
        title="Historial de entregas"
        extra={
          <Text
            type="secondary"
          >
            {
              pedido
                .historial_entregas
                .length
            } entrega(s)
          </Text>
        }
        className="gd-entrega-section-card"
      >

        {
          pedido
            .historial_entregas
            .length === 0
            ? (
                <Empty
                  image={
                    Empty
                      .PRESENTED_IMAGE_SIMPLE
                  }
                  description="No hay entregas registradas para este pedido"
                />
              )
            : (
                <Space
                  direction="vertical"
                  size={16}
                  className="gd-entrega-history-space"
                >

                  {
                    pedido
                      .historial_entregas
                      .map(
                        (
                          entrega,
                          index
                        ) => (
                          <Card
                            key={
                              entrega
                                .entrega_id
                            }
                            size="small"
                            title={
                              `Entrega ${pedido.historial_entregas.length - index}`
                            }
                            extra={
                              <Tag>
                                {
                                  entrega
                                    .fecha_entrega
                                    ?.slice(
                                      0,
                                      10
                                    ) ||
                                  '-'
                                }
                              </Tag>
                            }
                            className="gd-entrega-history-card"
                          >

                            <Descriptions
                              column={{
                                xs: 1,
                                sm: 2,
                                lg: 3
                              }}
                              items={[
                                {
                                  key:
                                    'registrado',
                                  label:
                                    'Registrado por',
                                  children:
                                    entrega
                                      .registrado_por
                                },

                                {
                                  key:
                                    'fecha-registro',
                                  label:
                                    'Fecha de registro',
                                  children:
                                    fechaHoraTexto(
                                      entrega
                                        .created_at
                                    )
                                },

                                {
                                  key:
                                    'comentario',
                                  label:
                                    'Comentario',
                                  children:
                                    entrega
                                      .comentario_entrega ||
                                    '-'
                                }
                              ]}
                              className="gd-entrega-history-description"
                            />


                            <Table<
                              HistorialDetalle
                            >
                              rowKey="entrega_detalle_id"
                              columns={
                                historialColumns
                              }
                              dataSource={
                                entrega
                                  .detalles
                              }
                              pagination={
                                false
                              }
                              scroll={{
                                x: 760
                              }}
                            />

                          </Card>
                        )
                      )
                  }

                </Space>
              )
        }

      </Card>

    </div>
  );
}


export default EntregaPedidoDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\Entregas.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  EyeOutlined,
  ReloadOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import PageHeader
  from '../components/ui/PageHeader';

import '../styles/entregasAntd.css';


const {
  Text
} = Typography;


type PedidoEntrega = {
  pedido_id: number;
  codigo_pedido?: string | null;
  descripcion_pedido?: string | null;

  fecha_pedido: string;
  fecha_entrega_estimada?: string | null;

  estado_entrega_general:
    | 'PENDIENTE'
    | 'PARCIAL'
    | 'COMPLETO';

  cliente_id: number;
  razon_social: string;
  ruc: string;

  cantidad_items: number;
};


type FiltrosEntrega = {
  cliente_id?: number;
  q?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const estadoEntregaTag = (
  estado: string
) => {
  if (
    estado === 'COMPLETO'
  ) {
    return (
      <Tag color="success">
        Completo
      </Tag>
    );
  }

  if (
    estado === 'PARCIAL'
  ) {
    return (
      <Tag color="warning">
        Parcial
      </Tag>
    );
  }

  return (
    <Tag color="processing">
      Pendiente
    </Tag>
  );
};


function Entregas() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    FiltrosEntrega
  >();

  const [
    pedidos,
    setPedidos
  ] = useState<
    PedidoEntrega[]
  >([]);

  const [
    clientes,
    setClientes
  ] = useState<any[]>([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<
    FiltrosEntrega
  >({});

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarClientes =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/clientes/select'
          );

        setClientes(
          data.clientes ||
          []
        );
      },
      []
    );


  const cargarPedidos =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosEntrega
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(pagina)
        );

        params.set(
          'limit',
          '10'
        );

        if (
          filtros.cliente_id
        ) {
          params.set(
            'cliente_id',
            String(
              filtros.cliente_id
            )
          );
        }

        if (
          filtros.q?.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }

        const data =
          await apiFetch(
            `/entregas/pedidos?${params.toString()}`
          );

        setPedidos(
          data.pedidos ||
          []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  const cargarTodo =
    useCallback(
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarClientes(),
            cargarPedidos(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los pedidos por entregar'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarClientes,
        cargarPedidos,
        filtrosAplicados,
        message,
        page
      ]
    );


  useEffect(() => {
    cargarTodo();
  }, [
    cargarTodo
  ]);


  const aplicarFiltros =
    (
      values:
        FiltrosEntrega
    ) => {
      setPage(1);

      setFiltrosAplicados({
        cliente_id:
          values.cliente_id,

        q:
          values.q?.trim() ||
          ''
      });
    };


  const limpiarFiltros =
    () => {
      form.resetFields();
      setPage(1);
      setFiltrosAplicados({});
    };


  const columns:
    TableColumnsType<
      PedidoEntrega
    > = [
    {
      title: 'Código',
      dataIndex:
        'codigo_pedido',
      key:
        'codigo_pedido',
      width: 130,

      render: (
        value?:
          string | null
      ) =>
        value
          ? (
              <Text code>
                {value}
              </Text>
            )
          : '-'
    },

    {
      title: 'Cliente',
      key: 'cliente',
      minWidth: 220,

      render: (
        _,
        pedido
      ) => (
        <div className="gd-entrega-client-cell">

          <Text strong>
            {
              pedido
                .razon_social
            }
          </Text>

          <Text
            type="secondary"
          >
            {pedido.ruc}
          </Text>

        </div>
      )
    },

    {
      title: 'Fecha pedido',
      dataIndex:
        'fecha_pedido',
      key:
        'fecha_pedido',
      width: 130,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title:
        'Entrega estimada',
      dataIndex:
        'fecha_entrega_estimada',
      key:
        'fecha_entrega_estimada',
      width: 150,
      responsive: [
        'md'
      ],

      render: (
        value?:
          string | null
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title:
        'Estado de entrega',
      dataIndex:
        'estado_entrega_general',
      key:
        'estado_entrega_general',
      width: 160,

      render: (
        value: string
      ) =>
        estadoEntregaTag(
          value
        )
    },

    {
      title: 'Productos',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 110,
      responsive: [
        'md'
      ]
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 155,

      render: (
        _,
        pedido
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/entregas/${pedido.pedido_id}`
            )
          }
        >
          Ver pedido
        </Button>
      )
    }
  ];


  return (
    <div className="gd-entrega-page">

      <PageHeader
        title="Entregas"
        description="Selecciona un pedido pendiente o parcial para registrar una nueva entrega."
      />


      <Card
        title="Filtros"
        className="gd-entrega-filter-card"
      >

        <Form<FiltrosEntrega>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={
            aplicarFiltros
          }
        >

          <Row
            gutter={[
              14,
              0
            ]}
            align="bottom"
          >

            <Col
              xs={24}
              lg={9}
            >

              <Form.Item
                label="Cliente"
                name="cliente_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos los clientes"
                  options={
                    clientes.map(
                      (cliente) => ({
                        value:
                          cliente
                            .cliente_id,

                        label:
                          `${cliente.razon_social} · ${cliente.ruc}`
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={9}
            >

              <Form.Item
                label="Buscar"
                name="q"
              >
                <Input
                  allowClear
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Cliente, RUC, código o descripción"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={6}
            >

              <Form.Item
                label=" "
                className="gd-entrega-filter-actions"
              >

                <Space
                  wrap
                >

                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <SearchOutlined />
                    }
                  >
                    Buscar
                  </Button>


                  <Button
                    onClick={
                      limpiarFiltros
                    }
                  >
                    Limpiar
                  </Button>


                  <Button
                    icon={
                      <ReloadOutlined />
                    }
                    loading={
                      cargando
                    }
                    onClick={
                      cargarTodo
                    }
                  >
                    Actualizar
                  </Button>

                </Space>

              </Form.Item>

            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Pedidos por entregar"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } pedido(s)
          </Text>
        }
        className="gd-entrega-table-card"
      >

        <Table<PedidoEntrega>
          rowKey="pedido_id"
          columns={columns}
          dataSource={
            pedidos
          }
          loading={
            cargando
          }
          scroll={{
            x: 850
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay pedidos pendientes de entrega"
              />
          }}
          pagination={{
            current:
              paginacion.page,

            pageSize:
              paginacion.limit,

            total:
              paginacion.total,

            showSizeChanger:
              false,

            showTotal: (
              total
            ) =>
              `${total} pedido(s)`,

            onChange: (
              nuevaPagina
            ) =>
              setPage(
                nuevaPagina
              )
          }}
        />

      </Card>

    </div>
  );
}


export default Entregas;


<<<END OF FILE>>>


---

## FILE: src\pages\Gastos.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import GastoForm, {
  gastoFormVacio,
  validarGastoForm,
  type GastoFormData
} from '../components/gastos/GastoForm';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import PageHeader
  from '../components/ui/PageHeader';

import {
  formatMonto
} from '../utils/formatters';

import '../styles/gastosAntd.css';


const {
  Text
} = Typography;


type FiltrosGasto = {
  tipo_gasto_id?: string;
  proveedor_id?: string;
  moneda_codigo?: string;
  q?: string;
};


type Gasto = {
  gasto_id: number;

  tipo_gasto_id:
    number;

  tipo_gasto:
    string;

  proveedor_id?:
    number | null;

  proveedor?:
    string | null;

  proveedor_ruc?:
    string | null;

  fecha_gasto:
    string;

  monto:
    number;

  moneda_codigo:
    'PEN' | 'USD';

  descripcion?:
    string | null;

  comprobante?:
    string | null;

  registrado_por:
    string;

  created_at?:
    string | null;

  updated_at?:
    string | null;

  actualizado_por?:
    string | null;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function Gastos() {
  const navigate =
    useNavigate();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    filtroForm
  ] = Form.useForm<
    FiltrosGasto
  >();

  const [
    gastos,
    setGastos
  ] = useState<
    Gasto[]
  >([]);

  const [
    tiposGasto,
    setTiposGasto
  ] = useState<any[]>(
    []
  );

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>(
    []
  );

  const [
    nuevoTipo,
    setNuevoTipo
  ] = useState('');

  const [
    form,
    setForm
  ] = useState<
    GastoFormData
  >({
    ...gastoFormVacio
  });

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<
    FiltrosGasto
  >({});

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [
    cargando,
    setCargando
  ] = useState(true);


  const {
    procesando:
      registrandoTipo,

    intentarBloquear:
      bloquearRegistroTipo,

    liberar:
      liberarRegistroTipo
  } = useBloqueoAccion();


  const {
    procesando:
      registrandoGasto,

    intentarBloquear:
      bloquearRegistroGasto,

    liberar:
      liberarRegistroGasto
  } = useBloqueoAccion();


  const {
    procesando:
      eliminandoGasto,

    intentarBloquear:
      bloquearEliminacion,

    liberar:
      liberarEliminacion
  } = useBloqueoAccion();


  const cargarDatosBase =
    useCallback(
      async () => {
        const [
          tiposData,
          proveedoresData
        ] = await Promise.all([
          apiFetch(
            '/gastos/tipos'
          ),

          apiFetch(
            '/proveedores'
          )
        ]);


        setTiposGasto(
          tiposData.tipos ||
          []
        );

        setProveedores(
          proveedoresData
            .proveedores ||
          []
        );
      },
      []
    );


  const cargarGastos =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosGasto
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(pagina)
        );

        params.set(
          'limit',
          '10'
        );


        if (
          filtros
            .tipo_gasto_id
        ) {
          params.set(
            'tipo_gasto_id',
            filtros
              .tipo_gasto_id
          );
        }


        if (
          filtros
            .proveedor_id
        ) {
          params.set(
            'proveedor_id',
            filtros
              .proveedor_id
          );
        }


        if (
          filtros
            .moneda_codigo
        ) {
          params.set(
            'moneda_codigo',
            filtros
              .moneda_codigo
          );
        }


        if (
          filtros.q?.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }


        const data =
          await apiFetch(
            `/gastos?${params.toString()}`
          );


        setGastos(
          data.gastos ||
          []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  const cargarTodo =
    useCallback(
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarDatosBase(),
            cargarGastos(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los gastos'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarDatosBase,
        cargarGastos,
        filtrosAplicados,
        message,
        page
      ]
    );


  useEffect(() => {
    cargarTodo();
  }, [
    cargarTodo
  ]);


  const cambiarGasto = (
    campo:
      keyof GastoFormData,

    valor:
      string
  ) => {
    setForm(
      (actual) => ({
        ...actual,
        [campo]:
          valor
      })
    );
  };


  const registrarTipoGasto =
    async () => {
      const nombre =
        nuevoTipo.trim();


      if (!nombre) {
        message.error(
          'Ingrese el nombre del tipo de gasto'
        );

        return;
      }


      if (
        nombre.length > 100
      ) {
        message.error(
          'El tipo de gasto no puede superar 100 caracteres'
        );

        return;
      }


      if (
        !bloquearRegistroTipo()
      ) {
        return;
      }


      try {
        await apiFetch(
          '/gastos/tipos',
          {
            method: 'POST',

            body:
              JSON.stringify({
                nombre
              })
          }
        );


        setNuevoTipo('');


        message.success(
          'Tipo de gasto registrado correctamente'
        );


        try {
          await cargarDatosBase();

        } catch {
          message.warning(
            'El tipo de gasto fue registrado, pero no se pudo actualizar la lista. Usa Actualizar para recargarla.'
          );
        }

      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el tipo de gasto'
        );

      } finally {
        liberarRegistroTipo();
      }
    };


  const registrarGasto =
    async () => {
      const error =
        validarGastoForm(
          form,
          false
        );


      if (error) {
        message.error(
          error
        );

        return;
      }


      if (
        !bloquearRegistroGasto()
      ) {
        return;
      }


      let registrado =
        false;


      try {
        await apiFetch(
          '/gastos',
          {
            method: 'POST',

            body:
              JSON.stringify({
                tipo_gasto_id:
                  Number(
                    form
                      .tipo_gasto_id
                  ),

                proveedor_id:
                  form.proveedor_id
                    ? Number(
                        form
                          .proveedor_id
                      )
                    : null,

                fecha_gasto:
                  form.fecha_gasto ||
                  undefined,

                monto:
                  Number(
                    form.monto
                  ),

                moneda_codigo:
                  form
                    .moneda_codigo,

                descripcion:
                  form.descripcion,

                comprobante:
                  form.comprobante
              })
          }
        );


        registrado =
          true;


        setForm({
          ...gastoFormVacio
        });


        message.success(
          'Gasto registrado correctamente'
        );


        try {
          if (
            page !== 1
          ) {
            setPage(1);

          } else {
            await cargarGastos(
              1,
              filtrosAplicados
            );
          }

        } catch {
          message.warning(
            'El gasto fue registrado correctamente, pero no se pudo actualizar el listado. Usa Actualizar para recargarlo.'
          );
        }

      } catch (error) {
        if (
          !registrado
        ) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo registrar el gasto'
          );
        }

      } finally {
        liberarRegistroGasto();
      }
    };


  const eliminar =
    async (
      gasto: Gasto
    ) => {
      if (
        !bloquearEliminacion()
      ) {
        return;
      }


      try {
        await apiFetch(
          `/gastos/${gasto.gasto_id}`,
          {
            method: 'DELETE'
          }
        );


        message.warning(
          'Gasto eliminado del registro activo'
        );


        if (
          gastos.length ===
            1 &&
          page > 1
        ) {
          setPage(
            (actual) =>
              actual - 1
          );

        } else {
          try {
            await cargarGastos(
              page,
              filtrosAplicados
            );

          } catch {
            message.warning(
              'El gasto fue eliminado, pero no se pudo actualizar el listado. Usa Actualizar para recargarlo.'
            );
          }
        }

      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo eliminar el gasto'
        );

        throw error;

      } finally {
        liberarEliminacion();
      }
    };


  const solicitarEliminar =
    (
      gasto:
        Gasto
    ) => {
      modal.confirm({
        title:
          'Eliminar gasto',

        content:
          `Se retirará del registro activo el gasto "${gasto.tipo_gasto}" por ${formatMonto(gasto.monto)} ${gasto.moneda_codigo}. El registro permanecerá almacenado para auditoría.`,

        okText:
          'Eliminar gasto',

        cancelText:
          'Cancelar',

        okButtonProps: {
          danger: true,
          loading:
            eliminandoGasto
        },

        onOk: () =>
          eliminar(
            gasto
          )
      });
    };


  const columns:
    TableColumnsType<
      Gasto
    > = [
    {
      title:
        'Tipo / descripción',
      key:
        'tipo',
      minWidth: 240,

      render: (
        _,
        gasto
      ) => (
        <div className="gd-gasto-main-cell">

          <Text strong>
            {
              gasto
                .tipo_gasto
            }
          </Text>

          <Text
            type="secondary"
          >
            {
              gasto.descripcion ||
              'Sin descripción'
            }
          </Text>

        </div>
      )
    },

    {
      title: 'Proveedor',
      key: 'proveedor',
      minWidth: 220,

      render: (
        _,
        gasto
      ) =>
        gasto.proveedor
          ? (
              <div className="gd-gasto-main-cell">

                <Text strong>
                  {
                    gasto
                      .proveedor
                  }
                </Text>

                <Text
                  type="secondary"
                >
                  {
                    gasto
                      .proveedor_ruc ||
                    ''
                  }
                </Text>

              </div>
            )
          : '-'
    },

    {
      title: 'Fecha',
      dataIndex:
        'fecha_gasto',
      key:
        'fecha_gasto',
      width: 125,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Monto',
      key: 'monto',
      width: 165,

      render: (
        _,
        gasto
      ) => (
        <Space
          size={6}
        >

          <Text strong>
            {
              formatMonto(
                gasto.monto
              )
            }
          </Text>

          <Tag
            color={
              gasto
                .moneda_codigo ===
                'PEN'
                ? 'blue'
                : 'green'
            }
          >
            {
              gasto
                .moneda_codigo
            }
          </Tag>

        </Space>
      )
    },

    {
      title: 'Comprobante',
      dataIndex:
        'comprobante',
      key:
        'comprobante',
      width: 170,
      responsive: [
        'md'
      ],

      render: (
        value?:
          string | null
      ) =>
        value
          ? (
              <Text code>
                {value}
              </Text>
            )
          : '-'
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      minWidth: 180,
      responsive: [
        'lg'
      ]
    },

    {
      title: 'Acciones',
      key: 'acciones',
      fixed: 'right',
      width: 190,

      render: (
        _,
        gasto
      ) => (
        <Space
          size={4}
          wrap
        >

          <Button
            type="link"
            icon={
              <EditOutlined />
            }
            onClick={() =>
              navigate(
                `/gestion/gastos/${gasto.gasto_id}/editar`
              )
            }
          >
            Editar
          </Button>


          <Button
            type="text"
            danger
            icon={
              <DeleteOutlined />
            }
            disabled={
              eliminandoGasto
            }
            onClick={() =>
              solicitarEliminar(
                gasto
              )
            }
          >
            Eliminar
          </Button>

        </Space>
      )
    }
  ];


  return (
    <div className="gd-gasto-page">

      <PageHeader
        title="Gastos"
        description="Registra, consulta y administra los gastos operativos de la empresa."
        extra={
          <Button
            icon={
              <ReloadOutlined />
            }
            loading={
              cargando
            }
            onClick={
              cargarTodo
            }
          >
            Actualizar
          </Button>
        }
      />


      <Row
        gutter={[
          20,
          20
        ]}
        align="top"
        className="gd-gasto-config-row"
      >

        <Col
          xs={24}
          xl={7}
        >

          <Card
            title="Registrar tipo de gasto"
            className="gd-gasto-type-card"
          >

            <Form
              layout="vertical"
              requiredMark={false}
            >

              <Form.Item
                label="Nuevo tipo"
                extra="Se guardará en mayúsculas."
              >
                <Input
                  size="large"
                  value={
                    nuevoTipo
                  }
                  maxLength={100}
                  placeholder="Ejemplo: COMBUSTIBLE"
                  disabled={
                    registrandoTipo
                  }
                  onPressEnter={
                    registrarTipoGasto
                  }
                  onChange={(e) =>
                    setNuevoTipo(
                      e.target.value
                    )
                  }
                />
              </Form.Item>


              <Button
                type="primary"
                block
                icon={
                  <PlusOutlined />
                }
                loading={
                  registrandoTipo
                }
                onClick={
                  registrarTipoGasto
                }
              >
                Guardar tipo
              </Button>

            </Form>

          </Card>

        </Col>


        <Col
          xs={24}
          xl={17}
        >

          <GastoForm
            titulo="Registrar gasto"
            form={form}
            tiposGasto={
              tiposGasto
            }
            proveedores={
              proveedores
            }
            procesando={
              registrandoGasto
            }
            textoBoton="Guardar gasto"
            onChange={
              cambiarGasto
            }
            onSubmit={
              registrarGasto
            }
          />

        </Col>

      </Row>


      <Card
        title="Filtros"
        className="gd-gasto-section-card"
      >

        <Form<
          FiltrosGasto
        >
          form={
            filtroForm
          }
          layout="vertical"
          requiredMark={false}
          onFinish={(
            values
          ) => {
            setPage(1);

            setFiltrosAplicados({
              tipo_gasto_id:
                values
                  .tipo_gasto_id,

              proveedor_id:
                values
                  .proveedor_id,

              moneda_codigo:
                values
                  .moneda_codigo,

              q:
                values.q
                  ?.trim() ||
                ''
            });
          }}
        >

          <Row
            gutter={[
              14,
              0
            ]}
            align="bottom"
          >

            <Col
              xs={24}
              sm={12}
              xl={5}
            >
              <Form.Item
                label="Tipo de gasto"
                name="tipo_gasto_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos"
                  options={
                    tiposGasto.map(
                      (tipo) => ({
                        value:
                          String(
                            tipo
                              .tipo_gasto_id
                          ),

                        label:
                          tipo.nombre
                      })
                    )
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              sm={12}
              xl={6}
            >
              <Form.Item
                label="Proveedor"
                name="proveedor_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos"
                  options={
                    proveedores.map(
                      (proveedor) => ({
                        value:
                          String(
                            proveedor
                              .proveedor_id
                          ),

                        label:
                          `${proveedor.razon_social} · ${proveedor.ruc}`
                      })
                    )
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              sm={12}
              xl={4}
            >
              <Form.Item
                label="Moneda"
                name="moneda_codigo"
              >
                <Select
                  allowClear
                  placeholder="Todas"
                  options={[
                    {
                      value:
                        'PEN',
                      label:
                        'Soles'
                    },
                    {
                      value:
                        'USD',
                      label:
                        'Dólares'
                    }
                  ]}
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              xl={5}
            >
              <Form.Item
                label="Buscar"
                name="q"
              >
                <Input
                  allowClear
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Tipo, descripción, comprobante o proveedor"
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              xl={4}
            >
              <Form.Item
                label=" "
                className="gd-gasto-filter-actions"
              >
                <Space wrap>

                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <SearchOutlined />
                    }
                  >
                    Buscar
                  </Button>


                  <Button
                    onClick={() => {
                      filtroForm
                        .resetFields();

                      setPage(1);
                      setFiltrosAplicados(
                        {}
                      );
                    }}
                  >
                    Limpiar
                  </Button>

                </Space>
              </Form.Item>
            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Listado de gastos"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } gasto(s)
          </Text>
        }
        className="gd-gasto-table-card"
      >

        <Table<Gasto>
          rowKey="gasto_id"
          columns={columns}
          dataSource={
            gastos
          }
          loading={
            cargando
          }
          scroll={{
            x: 1100
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay gastos para los filtros seleccionados"
              />
          }}
          pagination={{
            current:
              paginacion.page,

            pageSize:
              paginacion.limit,

            total:
              paginacion.total,

            showSizeChanger:
              false,

            showTotal: (
              total
            ) =>
              `${total} gasto(s)`,

            onChange: (
              nuevaPagina
            ) =>
              setPage(
                nuevaPagina
              )
          }}
        />

      </Card>

    </div>
  );
}


export default Gastos;


<<<END OF FILE>>>


---

## FILE: src\pages\gastos\EditarGasto.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Card,
  Descriptions,
  Result,
  Skeleton
} from 'antd';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import GastoForm, {
  gastoFormVacio,
  validarGastoForm,
  type GastoFormData
} from '../../components/gastos/GastoForm';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/gastosAntd.css';


function EditarGasto() {
  const {
    gasto_id
  } = useParams();

  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    gasto,
    setGasto
  ] = useState<any | null>(
    null
  );

  const [
    tiposGasto,
    setTiposGasto
  ] = useState<any[]>(
    []
  );

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>(
    []
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');

  const [
    form,
    setForm
  ] = useState<
    GastoFormData
  >({
    ...gastoFormVacio
  });


  const {
    procesando:
      actualizandoGasto,

    intentarBloquear:
      bloquearActualizacion,

    liberar:
      liberarActualizacion
  } = useBloqueoAccion();


  const cargarDatos =
    useCallback(
      async () => {
        if (
          !gasto_id
        ) {
          throw new Error(
            'Gasto no válido'
          );
        }


        const [
          gastoData,
          tiposData,
          proveedoresData
        ] = await Promise.all([
          apiFetch(
            `/gastos/${gasto_id}`
          ),

          apiFetch(
            '/gastos/tipos'
          ),

          apiFetch(
            '/proveedores'
          )
        ]);


        const actual =
          gastoData.gasto;


        if (!actual) {
          throw new Error(
            'Gasto no encontrado'
          );
        }


        const listaProveedores = [
          ...(
            proveedoresData
              .proveedores ||
            []
          )
        ];


        /*
         * Conservamos un proveedor histórico aunque
         * hoy ya no esté activo.
         */
        if (
          actual.proveedor_id &&
          !listaProveedores.some(
            (proveedor) =>
              Number(
                proveedor
                  .proveedor_id
              ) ===
              Number(
                actual
                  .proveedor_id
              )
          )
        ) {
          listaProveedores.push({
            proveedor_id:
              actual
                .proveedor_id,

            razon_social:
              actual.proveedor ||
              'Proveedor no disponible',

            ruc:
              actual
                .proveedor_ruc ||
              '-'
          });
        }


        setGasto(
          actual
        );

        setTiposGasto(
          tiposData.tipos ||
          []
        );

        setProveedores(
          listaProveedores
        );


        setForm({
          tipo_gasto_id:
            String(
              actual
                .tipo_gasto_id
            ),

          proveedor_id:
            actual
              .proveedor_id
              ? String(
                  actual
                    .proveedor_id
                )
              : '',

          fecha_gasto:
            actual
              .fecha_gasto
              ?.slice(
                0,
                10
              ) ||
            '',

          monto:
            String(
              actual.monto
            ),

          moneda_codigo:
            actual
              .moneda_codigo ||
            'PEN',

          descripcion:
            actual
              .descripcion ||
            '',

          comprobante:
            actual
              .comprobante ||
            ''
        });
      },
      [
        gasto_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await cargarDatos();

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el gasto';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarDatos,
    message
  ]);


  const cambiarCampo =
    (
      campo:
        keyof GastoFormData,

      valor:
        string
    ) => {
      setForm(
        (actual) => ({
          ...actual,
          [campo]:
            valor
        })
      );
    };


  const actualizar =
    async () => {
      const error =
        validarGastoForm(
          form,
          true
        );


      if (error) {
        message.error(
          error
        );

        return;
      }


      if (
        !bloquearActualizacion()
      ) {
        return;
      }


      try {
        await apiFetch(
          `/gastos/${gasto_id}`,
          {
            method: 'PUT',

            body:
              JSON.stringify({
                tipo_gasto_id:
                  Number(
                    form
                      .tipo_gasto_id
                  ),

                proveedor_id:
                  form.proveedor_id
                    ? Number(
                        form
                          .proveedor_id
                      )
                    : null,

                fecha_gasto:
                  form.fecha_gasto,

                monto:
                  Number(
                    form.monto
                  ),

                moneda_codigo:
                  form
                    .moneda_codigo,

                descripcion:
                  form.descripcion,

                comprobante:
                  form.comprobante
              })
          }
        );


        message.success(
          'Gasto actualizado correctamente'
        );


        /*
         * No se libera el bloqueo antes de navegar
         * para impedir un segundo PUT durante la transición.
         */
        navigate(
          '/gestion/gastos',
          {
            replace: true
          }
        );

      } catch (error) {
        liberarActualizacion();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el gasto'
        );
      }
    };


  if (
    cargando
  ) {
    return (
      <div className="gd-gasto-page">

        <Skeleton
          active
          paragraph={{
            rows: 9
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !gasto
  ) {
    return (
      <div className="gd-gasto-page">

        <BackButton
          to="/gestion/gastos"
          label="Volver a gastos"
        />


        <Result
          status="error"
          title="Gasto no disponible"
          subTitle={
            errorCarga ||
            'El gasto no existe o fue eliminado.'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-gasto-page">

      <BackButton
        to="/gestion/gastos"
        label="Volver a gastos"
      />


      <PageHeader
        title="Editar gasto"
        description="Modifica los datos del gasto. La última actualización queda registrada para auditoría."
      />


      <Card
        title="Auditoría"
        className="gd-gasto-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 4
          }}
          items={[
            {
              key: 'creado-por',
              label:
                'Registrado por',
              children:
                gasto
                  .registrado_por ||
                '-'
            },

            {
              key: 'creado',
              label:
                'Fecha de registro',
              children:
                gasto.created_at
                  ? new Date(
                      gasto
                        .created_at
                    )
                      .toLocaleString(
                        'es-PE'
                      )
                  : '-'
            },

            {
              key: 'actualizado',
              label:
                'Última modificación',
              children:
                gasto.updated_at
                  ? new Date(
                      gasto
                        .updated_at
                    )
                      .toLocaleString(
                        'es-PE'
                      )
                  : 'Sin modificaciones'
            },

            {
              key:
                'actualizado-por',
              label:
                'Modificado por',
              children:
                gasto
                  .actualizado_por ||
                '-'
            }
          ]}
        />

      </Card>


      <GastoForm
        titulo="Datos del gasto"
        form={form}
        tiposGasto={
          tiposGasto
        }
        proveedores={
          proveedores
        }
        procesando={
          actualizandoGasto
        }
        textoBoton="Guardar cambios"
        exigirFecha
        onChange={
          cambiarCampo
        }
        onSubmit={
          actualizar
        }
      />

    </div>
  );
}


export default EditarGasto;


<<<END OF FILE>>>


---

## FILE: src\pages\Login.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Tag,
  Typography
} from 'antd';

import {
  AppstoreOutlined,
  LockOutlined,
  LoginOutlined,
  MailOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';

import {
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch,
  guardarSesion
} from '../services/api';

import ThemeToggle
  from '../components/ui/ThemeToggle';

import '../styles/login.css';


const {
  Title,
  Text,
  Paragraph
} = Typography;


type LoginValues = {
  correo: string;
  password: string;
};


function Login() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    cargando,
    setCargando
  ] = useState(false);


  const handleLogin =
    async (
      values: LoginValues
    ) => {
      setCargando(true);

      try {
        const data =
          await apiFetch(
            '/auth/login',
            {
              method: 'POST',

              body:
                JSON.stringify(
                  values
                )
            }
          );

        guardarSesion(
          data.token,
          data.usuario
        );

        message.success({
          content:
            'Inicio de sesión correcto',
          duration: 2
        });

        navigate(
          '/gestion',
          {
            replace: true
          }
        );

      } catch (error) {
        message.error({
          content:
            error instanceof Error
              ? error.message
              : 'No se pudo iniciar sesión',
          duration: 4
        });

      } finally {
        setCargando(false);
      }
    };


  return (
    <main className="gd-login-page">

      <div className="gd-login-theme">
        <ThemeToggle
          size="large"
        />
      </div>


      <Row
        className="gd-login-shell"
        align="stretch"
      >

        <Col
          xs={0}
          md={11}
          lg={12}
          className="gd-login-brand-column"
        >

          <div className="gd-login-brand-content">

            <Space
              direction="vertical"
              size={24}
            >

              <Avatar
                size={64}
                shape="square"
                className="gd-login-logo"
                icon={
                  <AppstoreOutlined />
                }
              />


              <div>
                <Tag
                  bordered={false}
                  icon={
                    <SafetyCertificateOutlined />
                  }
                  className="gd-login-brand-tag"
                >
                  Sistema de gestión
                </Tag>

                <Title
                  level={1}
                  className="gd-login-brand-title"
                >
                  GestionDriza
                </Title>

                <Paragraph
                  className="gd-login-brand-description"
                >
                  Controla pedidos, compras,
                  producción, entregas e
                  inventario desde un solo
                  sistema.
                </Paragraph>
              </div>

            </Space>


            <Text
              className="gd-login-brand-footer"
            >
              Gestión centralizada ·
              Trazabilidad · Control de stock
            </Text>

          </div>

        </Col>


        <Col
          xs={24}
          md={13}
          lg={12}
          className="gd-login-form-column"
        >

          <div className="gd-login-form-container">

            <div className="gd-login-mobile-brand">

              <Avatar
                size={48}
                shape="square"
                className="gd-login-logo"
                icon={
                  <AppstoreOutlined />
                }
              />

              <div>
                <Title
                  level={3}
                  className="gd-login-mobile-title"
                >
                  GestionDriza
                </Title>

                <Text type="secondary">
                  Sistema de gestión
                </Text>
              </div>

            </div>


            <Card
              bordered={false}
              className="gd-login-card"
            >

              <Space
                direction="vertical"
                size={4}
                className="gd-login-heading"
              >
                <Title
                  level={2}
                  className="gd-login-title"
                >
                  Bienvenido
                </Title>

                <Text type="secondary">
                  Ingresa tus credenciales
                  para continuar.
                </Text>
              </Space>


              <Form<LoginValues>
                name="gestiondriza-login"
                layout="vertical"
                size="large"
                requiredMark={false}
                onFinish={
                  handleLogin
                }
                autoComplete="on"
                className="gd-login-form"
              >

                <Form.Item
                  label="Correo"
                  name="correo"
                  rules={[
                    {
                      required: true
                    },
                    {
                      type: 'email'
                    }
                  ]}
                >
                  <Input
                    prefix={
                      <MailOutlined />
                    }
                    placeholder="admin@driza.com"
                    autoComplete="email"
                    disabled={
                      cargando
                    }
                  />
                </Form.Item>


                <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input.Password
                    prefix={
                      <LockOutlined />
                    }
                    placeholder="Ingresa tu contraseña"
                    autoComplete="current-password"
                    disabled={
                      cargando
                    }
                  />
                </Form.Item>


                <Form.Item
                  className="gd-login-submit-item"
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={
                      cargando
                    }
                    icon={
                      !cargando
                        ? <LoginOutlined />
                        : undefined
                    }
                  >
                    Iniciar sesión
                  </Button>
                </Form.Item>

              </Form>


              <div className="gd-login-security">
                <SafetyCertificateOutlined />

                <Text type="secondary">
                  Acceso protegido para
                  usuarios autorizados.
                </Text>
              </div>

            </Card>


            <Text
              type="secondary"
              className="gd-login-version"
            >
              GestionDriza · v1.12
            </Text>

          </div>

        </Col>

      </Row>

    </main>
  );
}


export default Login;


<<<END OF FILE>>>


---

## FILE: src\pages\mermas\MermaDetalle.tsx

<<<START OF FILE>>>

import type {
  CollapseProps,
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Card,
  Collapse,
  Descriptions,
  Empty,
  Result,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  CalendarOutlined,
  DatabaseOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatPeso
} from '../../utils/formatters';

import '../../styles/mermasAntd.css';


const {
  Text
} = Typography;


type ConsumoFIFO = {
  movimiento_materia_prima_id:
    number;

  stock_materia_prima_lote_id:
    number;

  cantidad:
    number;

  fecha_movimiento:
    string;

  compra_materia_prima_id:
    number;

  nombre_lote:
    string;

  fecha_compra:
    string;

  material_id:
    number;

  material:
    string;

  color_id:
    number;

  color:
    string;
};


type DetalleMerma = {
  merma_detalle_id:
    number;

  material_id:
    number;

  material:
    string;

  color_id:
    number;

  color:
    string;

  cantidad:
    number;

  unidad_medida_id:
    number;

  unidad:
    string;

  observacion?:
    string | null;

  created_at?:
    string | null;

  consumos_fifo:
    ConsumoFIFO[];
};


type Merma = {
  merma_id:
    number;

  fecha_merma:
    string;

  observacion?:
    string | null;

  created_at?:
    string | null;

  registrado_por:
    string;
};


function MermaDetalle() {
  const {
    merma_id
  } = useParams();

  const {
    message
  } = AntdApp.useApp();

  const [
    merma,
    setMerma
  ] = useState<
    Merma | null
  >(null);

  const [
    detalles,
    setDetalles
  ] = useState<
    DetalleMerma[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          const data =
            await apiFetch(
              `/mermas/${merma_id}`
            );


          setMerma(
            data.merma
          );

          setDetalles(
            data.detalles ||
            []
          );

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar la merma';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    merma_id,
    message
  ]);


  const total =
    useMemo(
      () =>
        detalles.reduce(
          (
            suma,
            item
          ) =>
            suma +
            Number(
              item.cantidad ||
              0
            ),
          0
        ),
      [
        detalles
      ]
    );


  const fifoColumns:
    TableColumnsType<
      ConsumoFIFO
    > = [
    {
      title: 'Lote',
      dataIndex:
        'nombre_lote',
      key:
        'nombre_lote',
      minWidth: 190,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title:
        'Fecha de compra',
      dataIndex:
        'fecha_compra',
      key:
        'fecha_compra',
      width: 140,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Material',
      dataIndex:
        'material',
      key:
        'material',
      width: 170
    },

    {
      title: 'Color',
      dataIndex:
        'color',
      key:
        'color',
      width: 150
    },

    {
      title: 'Descontado',
      dataIndex:
        'cantidad',
      key:
        'cantidad',
      width: 155,

      render: (
        value: number
      ) => (
        <Text
          strong
          type="danger"
        >
          -{
            formatPeso(
              value
            )
          } KG
        </Text>
      )
    }
  ];


  const crearCollapseItems =
    (
      item:
        DetalleMerma
    ):
      CollapseProps['items'] => [
      {
        key: 'fifo',

        label:
          (
            <Space wrap>

              <Text strong>
                Lotes afectados
              </Text>

              <Tag>
                {
                  item
                    .consumos_fifo
                    ?.length ||
                  0
                } lote(s)
              </Tag>

            </Space>
          ),

        children:
          (
            <>
              <Text
                type="secondary"
              >
                El sistema consumió primero el stock disponible más antiguo.
              </Text>


              <Table<
                ConsumoFIFO
              >
                rowKey="movimiento_materia_prima_id"
                columns={
                  fifoColumns
                }
                dataSource={
                  item
                    .consumos_fifo ||
                  []
                }
                pagination={false}
                scroll={{
                  x: 800
                }}
                className="gd-merma-fifo-table"
                locale={{
                  emptyText:
                    <Empty
                      image={
                        Empty
                          .PRESENTED_IMAGE_SIMPLE
                      }
                      description="No se encontraron lotes afectados"
                    />
                }}
              />
            </>
          )
      }
    ];


  if (
    cargando
  ) {
    return (
      <div className="gd-merma-page">

        <Skeleton
          active
          paragraph={{
            rows: 11
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !merma
  ) {
    return (
      <div className="gd-merma-page">

        <BackButton
          to="/gestion/mermas"
          label="Volver a mermas"
        />


        <Result
          status="error"
          title="No se pudo cargar la merma"
          subTitle={
            errorCarga ||
            'Registro no encontrado'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-merma-page">

      <BackButton
        to="/gestion/mermas"
        label="Volver a mermas"
      />


      <PageHeader
        title="Detalle de merma"
        description="Materia prima descontada y lotes de compra afectados por FIFO."
      />


      <div className="gd-merma-detail-stats">

        <Card>
          <Statistic
            title="Fecha"
            value={
              merma
                .fecha_merma
                ?.slice(
                  0,
                  10
                ) ||
              '-'
            }
            prefix={
              <CalendarOutlined />
            }
          />
        </Card>


        <Card>
          <Statistic
            title="Materias primas"
            value={
              detalles.length
            }
            prefix={
              <DatabaseOutlined />
            }
          />
        </Card>


        <Card>
          <Statistic
            title="Total descontado"
            value={
              Number(
                total
              )
            }
            precision={2}
            suffix="KG"
          />
        </Card>


        <Card>
          <Statistic
            title="Registrado por"
            value={
              merma
                .registrado_por
            }
            prefix={
              <UserOutlined />
            }
          />
        </Card>

      </div>


      <Card
        title="Información del registro"
        className="gd-merma-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 3
          }}
          items={[
            {
              key: 'fecha',
              label: 'Fecha de merma',
              children:
                merma
                  .fecha_merma
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key: 'usuario',
              label:
                'Registrado por',
              children:
                merma
                  .registrado_por
            },

            {
              key: 'registro',
              label:
                'Fecha de registro',
              children:
                merma.created_at
                  ? new Date(
                      merma
                        .created_at
                    )
                      .toLocaleString(
                        'es-PE'
                      )
                  : '-'
            },

            {
              key:
                'observacion',
              label:
                'Observación general',
              span: 3,
              children:
                merma.observacion ||
                'Sin observación'
            }
          ]}
        />

      </Card>


      <Space
        direction="vertical"
        size={16}
        className="gd-merma-items-space"
      >

        {
          detalles.map(
            (
              item,
              index
            ) => (
              <Card
                key={
                  item
                    .merma_detalle_id
                }
                title={
                  <div className="gd-merma-detail-title">

                    <Text
                      type="secondary"
                    >
                      Materia prima {
                        index + 1
                      }
                    </Text>

                    <Text strong>
                      {
                        item.material
                      }
                      {' · '}
                      {
                        item.color
                      }
                    </Text>

                  </div>
                }
                extra={
                  <Text
                    strong
                    type="danger"
                    className="gd-merma-detail-amount"
                  >
                    -{
                      formatPeso(
                        item.cantidad
                      )
                    } {
                      item.unidad
                    }
                  </Text>
                }
                className="gd-merma-detail-card"
              >

                {
                  item.observacion &&
                  (
                    <Descriptions
                      column={1}
                      items={[
                        {
                          key:
                            'observacion',
                          label:
                            'Observación',
                          children:
                            item.observacion
                        }
                      ]}
                      className="gd-merma-detail-observation"
                    />
                  )
                }


                <Collapse
                  items={
                    crearCollapseItems(
                      item
                    )
                  }
                />

              </Card>
            )
          )
        }

      </Space>

    </div>
  );
}


export default MermaDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\mermas\MermasLista.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined
} from '@ant-design/icons';

import type {
  Dayjs
} from 'dayjs';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatPeso
} from '../../utils/formatters';

import '../../styles/mermasAntd.css';


const {
  Text
} = Typography;

const {
  RangePicker
} = DatePicker;


type Merma = {
  merma_id: number;
  fecha_merma: string;
  observacion?: string | null;
  created_at?: string | null;
  registrado_por: string;
  cantidad_items: number;
  total_merma_kg: number;
};


type FiltrosForm = {
  q?: string;
  fechas?: [
    Dayjs,
    Dayjs
  ];
};


type FiltrosAplicados = {
  q?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function MermasLista() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    FiltrosForm
  >();

  const [
    mermas,
    setMermas
  ] = useState<
    Merma[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtros,
    setFiltros
  ] = useState<
    FiltrosAplicados
  >({});

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });


  const cargarMermas =
    useCallback(
      async (
        pagina: number,
        filtrosConsulta:
          FiltrosAplicados
      ) => {
        setCargando(true);

        try {
          const params =
            new URLSearchParams();

          params.set(
            'page',
            String(pagina)
          );

          params.set(
            'limit',
            '10'
          );

          if (
            filtrosConsulta.q?.trim()
          ) {
            params.set(
              'q',
              filtrosConsulta.q.trim()
            );
          }

          if (
            filtrosConsulta.fecha_desde
          ) {
            params.set(
              'fecha_desde',
              filtrosConsulta.fecha_desde
            );
          }

          if (
            filtrosConsulta.fecha_hasta
          ) {
            params.set(
              'fecha_hasta',
              filtrosConsulta.fecha_hasta
            );
          }


          const data =
            await apiFetch(
              `/mermas?${params.toString()}`
            );


          setMermas(
            data.mermas ||
            []
          );

          setPaginacion(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar las mermas'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        message
      ]
    );


  useEffect(() => {
    cargarMermas(
      page,
      filtros
    );
  }, [
    cargarMermas,
    filtros,
    page
  ]);


  const aplicarFiltros =
    (
      values:
        FiltrosForm
    ) => {
      setPage(1);

      setFiltros({
        q:
          values.q?.trim() ||
          '',

        fecha_desde:
          values.fechas?.[0]
            ?.format(
              'YYYY-MM-DD'
            ),

        fecha_hasta:
          values.fechas?.[1]
            ?.format(
              'YYYY-MM-DD'
            )
      });
    };


  const limpiarFiltros =
    () => {
      form.resetFields();
      setPage(1);
      setFiltros({});
    };


  const columns:
    TableColumnsType<
      Merma
    > = [
    {
      title: 'Fecha',
      dataIndex:
        'fecha_merma',
      key:
        'fecha_merma',
      width: 125,

      render: (
        value: string
      ) => (
        <Text strong>
          {
            value?.slice(
              0,
              10
            ) || '-'
          }
        </Text>
      )
    },

    {
      title:
        'Materias primas',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 145,

      render: (
        value: number
      ) => (
        <Tag>
          {value}
        </Tag>
      )
    },

    {
      title:
        'Total descontado',
      dataIndex:
        'total_merma_kg',
      key:
        'total_merma_kg',
      width: 170,

      render: (
        value: number
      ) => (
        <Text
          strong
          type="danger"
        >
          -{
            formatPeso(
              value || 0
            )
          } KG
        </Text>
      )
    },

    {
      title: 'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',
      minWidth: 260,

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      width: 190,
      responsive: [
        'md'
      ]
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 145,

      render: (
        _,
        merma
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/mermas/${merma.merma_id}`
            )
          }
        >
          Ver detalle
        </Button>
      )
    }
  ];


  return (
    <div className="gd-merma-page">

      <PageHeader
        title="Mermas de materia prima"
        description="Consulta las pérdidas registradas y la materia prima descontada del almacén."
        extra={
          <Button
            type="primary"
            icon={
              <PlusOutlined />
            }
            onClick={() =>
              navigate(
                '/gestion/mermas/registrar'
              )
            }
          >
            Registrar merma
          </Button>
        }
      />


      <Card
        title="Filtros"
        className="gd-merma-section-card"
      >

        <Form<
          FiltrosForm
        >
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={
            aplicarFiltros
          }
        >

          <Row
            gutter={[
              14,
              0
            ]}
            align="bottom"
          >

            <Col
              xs={24}
              lg={10}
            >
              <Form.Item
                label="Buscar"
                name="q"
              >
                <Input
                  allowClear
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Material, color u observación"
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              lg={8}
            >
              <Form.Item
                label="Rango de fechas"
                name="fechas"
              >
                <RangePicker
                  className="gd-full-width"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              lg={6}
            >
              <Form.Item
                label=" "
                className="gd-merma-filter-actions"
              >
                <Space wrap>

                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <SearchOutlined />
                    }
                  >
                    Buscar
                  </Button>


                  <Button
                    onClick={
                      limpiarFiltros
                    }
                  >
                    Limpiar
                  </Button>


                  <Button
                    icon={
                      <ReloadOutlined />
                    }
                    loading={
                      cargando
                    }
                    onClick={() =>
                      cargarMermas(
                        page,
                        filtros
                      )
                    }
                  >
                    Actualizar
                  </Button>

                </Space>
              </Form.Item>
            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Historial de mermas"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } registro(s)
          </Text>
        }
        className="gd-merma-table-card"
      >

        <Table<
          Merma
        >
          rowKey="merma_id"
          columns={columns}
          dataSource={
            mermas
          }
          loading={
            cargando
          }
          scroll={{
            x: 900
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay mermas para los filtros seleccionados"
              />
          }}
          pagination={{
            current:
              paginacion.page,

            pageSize:
              paginacion.limit,

            total:
              paginacion.total,

            showSizeChanger:
              false,

            showTotal: (
              total
            ) =>
              `${total} registro(s)`,

            onChange: (
              nuevaPagina
            ) =>
              setPage(
                nuevaPagina
              )
          }}
        />

      </Card>

    </div>
  );
}


export default MermasLista;


<<<END OF FILE>>>


---

## FILE: src\pages\mermas\RegistrarMerma.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Progress,
  Row,
  Select,
  Skeleton,
  Space,
  Statistic,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined
} from '@ant-design/icons';

import dayjs, {
  Dayjs
} from 'dayjs';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatPeso
} from '../../utils/formatters';

import '../../styles/mermasAntd.css';


const {
  Text
} = Typography;

const {
  TextArea
} = Input;


type Disponibilidad = {
  material_id: number;
  material: string;

  color_id: number;
  color: string;

  unidad_medida_id: number;
  unidad: string;

  cantidad_disponible: number;
};


type DetalleMerma = {
  local_id: string;

  material_id?:
    number;

  color_id?:
    number;

  cantidad?:
    number;

  observacion:
    string;
};


const nuevaKey = () => {
  if (
    typeof crypto !==
      'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    'merma',
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join('-');
};


const nuevoLocalId =
  () => {
    if (
      typeof crypto !==
        'undefined' &&
      typeof crypto.randomUUID ===
        'function'
    ) {
      return crypto.randomUUID();
    }

    return [
      Date.now(),
      Math.random()
        .toString(36)
        .slice(2)
    ].join('-');
  };


const crearDetalle =
  (): DetalleMerma => ({
    local_id:
      nuevoLocalId(),

    material_id:
      undefined,

    color_id:
      undefined,

    cantidad:
      undefined,

    observacion:
      ''
  });


function RegistrarMerma() {
  const navigate =
    useNavigate();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    fechaMerma,
    setFechaMerma
  ] = useState<
    Dayjs | null
  >(
    dayjs()
  );

  const [
    observacion,
    setObservacion
  ] = useState('');

  const [
    disponibilidad,
    setDisponibilidad
  ] = useState<
    Disponibilidad[]
  >([]);

  const [
    detalles,
    setDetalles
  ] = useState<
    DetalleMerma[]
  >([
    crearDetalle()
  ]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    idempotencyKey
  ] = useState(
    nuevaKey
  );

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);

        try {
          const data =
            await apiFetch(
              '/mermas/disponibilidad'
            );


          setDisponibilidad(
            (
              data.items ||
              []
            ).map(
              (item: any) => ({
                ...item,

                cantidad_disponible:
                  Number(
                    item
                      .cantidad_disponible ||
                    0
                  )
              })
            )
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo consultar la materia prima disponible'
          );

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    message
  ]);


  const materiales =
    useMemo(
      () => {
        const mapa =
          new Map<
            number,
            string
          >();


        disponibilidad.forEach(
          (item) =>
            mapa.set(
              Number(
                item.material_id
              ),
              item.material
            )
        );


        return Array.from(
          mapa.entries()
        ).map(
          ([
            value,
            label
          ]) => ({
            value,
            label
          })
        );
      },
      [
        disponibilidad
      ]
    );


  const coloresParaMaterial =
    (
      materialId?:
        number
    ) => {
      if (
        !materialId
      ) {
        return [];
      }


      return disponibilidad
        .filter(
          (item) =>
            Number(
              item.material_id
            ) ===
            Number(
              materialId
            )
        )
        .map(
          (item) => ({
            value:
              Number(
                item.color_id
              ),

            label:
              item.color
          })
        );
    };


  const obtenerStock =
    (
      detalle:
        DetalleMerma
    ) => {
      if (
        !detalle.material_id ||
        !detalle.color_id
      ) {
        return null;
      }


      return disponibilidad.find(
        (item) =>
          Number(
            item.material_id
          ) ===
            Number(
              detalle.material_id
            ) &&
          Number(
            item.color_id
          ) ===
            Number(
              detalle.color_id
            )
      ) || null;
    };


  const actualizarDetalle =
    (
      index: number,
      cambios:
        Partial<
          DetalleMerma
        >
    ) => {
      if (
        procesando
      ) {
        return;
      }

      setDetalles(
        (actuales) =>
          actuales.map(
            (
              detalle,
              i
            ) =>
              i === index
                ? {
                    ...detalle,
                    ...cambios
                  }
                : detalle
          )
      );
    };


  const totalMerma =
    useMemo(
      () =>
        detalles.reduce(
          (
            total,
            detalle
          ) =>
            total +
            Number(
              detalle.cantidad ||
              0
            ),
          0
        ),
      [
        detalles
      ]
    );


  const validar =
    () => {
      if (
        !fechaMerma
      ) {
        return (
          'La fecha de merma es obligatoria'
        );
      }


      if (
        disponibilidad.length ===
        0
      ) {
        return (
          'No hay materia prima disponible para registrar una merma'
        );
      }


      const usados =
        new Set<string>();


      for (
        let index = 0;
        index <
        detalles.length;
        index++
      ) {
        const detalle =
          detalles[index];


        if (
          !detalle.material_id ||
          !detalle.color_id
        ) {
          return (
            `Completa el material y color de la materia prima ${index + 1}`
          );
        }


        const stock =
          obtenerStock(
            detalle
          );


        if (!stock) {
          return (
            `La materia prima ${index + 1} no tiene stock disponible`
          );
        }


        const clave =
          `${detalle.material_id}:${detalle.color_id}`;


        if (
          usados.has(
            clave
          )
        ) {
          return (
            'No se puede repetir la misma materia prima en una sola merma'
          );
        }


        usados.add(
          clave
        );


        const cantidad =
          Number(
            detalle.cantidad ||
            0
          );


        if (
          !Number.isFinite(
            cantidad
          ) ||
          cantidad <= 0
        ) {
          return (
            `La cantidad de la materia prima ${index + 1} debe ser mayor a 0`
          );
        }


        if (
          cantidad >
          Number(
            stock
              .cantidad_disponible
          ) +
          0.000001
        ) {
          return (
            `La cantidad de la materia prima ${index + 1} supera el stock disponible`
          );
        }


        if (
          detalle.observacion
            .trim()
            .length >
          300
        ) {
          return (
            `La observación de la materia prima ${index + 1} no puede superar 300 caracteres`
          );
        }
      }


      if (
        observacion
          .trim()
          .length >
        500
      ) {
        return (
          'La observación general no puede superar 500 caracteres'
        );
      }


      return null;
    };


  const registrar =
    async () => {
      const error =
        validar();


      if (error) {
        message.error(
          error
        );

        throw new Error(
          error
        );
      }


      if (
        !intentarBloquear()
      ) {
        return;
      }


      try {
        const data =
          await apiFetch(
            '/mermas',
            {
              method: 'POST',

              headers: {
                'Idempotency-Key':
                  idempotencyKey
              },

              body:
                JSON.stringify({
                  fecha_merma:
                    fechaMerma!
                      .format(
                        'YYYY-MM-DD'
                      ),

                  observacion:
                    observacion
                      .trim() ||
                    null,

                  detalles:
                    detalles.map(
                      (detalle) => ({
                        material_id:
                          Number(
                            detalle
                              .material_id
                          ),

                        color_id:
                          Number(
                            detalle
                              .color_id
                          ),

                        cantidad:
                          Number(
                            detalle
                              .cantidad
                          ),

                        observacion:
                          detalle
                            .observacion
                            .trim() ||
                          null
                      })
                    )
                })
            }
          );


        if (
          data.reutilizada
        ) {
          message.info(
            'La merma ya había sido registrada. Se recuperó el registro existente sin descontar stock nuevamente.'
          );

        } else {
          message.success(
            'Merma registrada correctamente'
          );
        }


        navigate(
          `/gestion/mermas/${data.merma.merma_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar la merma'
        );

        throw error;
      }
    };


  const solicitarRegistro =
    () => {
      const error =
        validar();


      if (error) {
        message.error(
          error
        );

        return;
      }


      modal.confirm({
        title:
          'Registrar merma',

        content:
          `Se descontarán ${formatPeso(totalMerma)} KG de materia prima. El sistema consumirá automáticamente primero los lotes con stock más antiguo.`,

        okText:
          'Registrar merma',

        cancelText:
          'Cancelar',

        okButtonProps: {
          icon:
            <SaveOutlined />
        },

        onOk:
          registrar
      });
    };


  if (
    cargando
  ) {
    return (
      <div className="gd-merma-page">

        <Skeleton
          active
          paragraph={{
            rows: 12
          }}
        />

      </div>
    );
  }


  return (
    <div className="gd-merma-page">

      <BackButton
        to="/gestion/mermas"
        label="Volver a mermas"
      />


      <PageHeader
        title="Registrar merma"
        description="Registra materia prima perdida o deteriorada para descontarla automáticamente del almacén."
      />


      {
        disponibilidad.length ===
          0 &&
        (
          <Alert
            type="warning"
            showIcon
            message="No hay materia prima con stock disponible."
            description="Para registrar una merma debe existir stock de materia prima en el almacén."
            className="gd-merma-section-card"
          />
        )
      }


      <Card
        title="Datos de la merma"
        className="gd-merma-section-card"
      >

        <Row
          gutter={[
            16,
            0
          ]}
        >

          <Col
            xs={24}
            md={8}
          >
            <Form.Item
              label="Fecha"
              required
            >
              <DatePicker
                size="large"
                value={
                  fechaMerma
                }
                format="YYYY-MM-DD"
                className="gd-full-width"
                disabled={
                  procesando
                }
                onChange={(
                  value
                ) =>
                  setFechaMerma(
                    value
                  )
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            md={16}
          >
            <Form.Item
              label="Observación general"
            >
              <TextArea
                rows={3}
                maxLength={500}
                showCount
                value={
                  observacion
                }
                placeholder="Ejemplo: Material deteriorado durante manipulación"
                disabled={
                  procesando
                }
                onChange={(e) =>
                  setObservacion(
                    e.target.value
                  )
                }
              />
            </Form.Item>
          </Col>

        </Row>

      </Card>


      <Card
        title="Materia prima afectada"
        extra={
          <Button
            type="primary"
            ghost
            icon={
              <PlusOutlined />
            }
            disabled={
              procesando ||
              disponibilidad.length ===
                0
            }
            onClick={() =>
              setDetalles([
                ...detalles,
                crearDetalle()
              ])
            }
          >
            Agregar materia prima
          </Button>
        }
        className="gd-merma-section-card"
      >

        <Alert
          type="info"
          showIcon
          message="El sistema aplicará FIFO automáticamente."
          description="No necesitas escoger un lote. Al registrar la merma se descontará primero el stock disponible más antiguo del Material + Color seleccionado."
          className="gd-merma-main-rule"
        />


        <Space
          direction="vertical"
          size={16}
          className="gd-merma-items-space"
        >

          {
            detalles.map(
              (
                detalle,
                index
              ) => {
                const stock =
                  obtenerStock(
                    detalle
                  );

                const disponible =
                  Number(
                    stock
                      ?.cantidad_disponible ||
                    0
                  );

                const cantidad =
                  Number(
                    detalle.cantidad ||
                    0
                  );

                const saldo =
                  Math.max(
                    0,
                    disponible -
                    cantidad
                  );

                const porcentajeSaldo =
                  disponible > 0
                    ? Math.max(
                        0,
                        Math.min(
                          100,
                          (
                            saldo /
                            disponible
                          ) *
                          100
                        )
                      )
                    : 0;


                return (
                  <Card
                    key={
                      detalle.local_id
                    }
                    size="small"
                    title={
                      `Materia prima ${index + 1}`
                    }
                    extra={
                      <Button
                        type="text"
                        danger
                        icon={
                          <DeleteOutlined />
                        }
                        disabled={
                          procesando ||
                          detalles.length ===
                            1
                        }
                        onClick={() => {
                          if (
                            detalles.length ===
                            1
                          ) {
                            message.warning(
                              'La merma debe tener al menos una materia prima'
                            );

                            return;
                          }


                          setDetalles(
                            detalles.filter(
                              (
                                _,
                                i
                              ) =>
                                i !== index
                            )
                          );
                        }}
                      >
                        Quitar
                      </Button>
                    }
                    className="gd-merma-item-card"
                  >

                    <Row
                      gutter={[
                        14,
                        0
                      ]}
                    >

                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Material"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .material_id
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              procesando
                            }
                            options={
                              materiales
                            }
                            onChange={(
                              value
                            ) =>
                              actualizarDetalle(
                                index,
                                {
                                  material_id:
                                    value,

                                  color_id:
                                    undefined,

                                  cantidad:
                                    undefined
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Color"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .color_id
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              procesando ||
                              !detalle
                                .material_id
                            }
                            options={
                              coloresParaMaterial(
                                detalle
                                  .material_id
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizarDetalle(
                                index,
                                {
                                  color_id:
                                    value,

                                  cantidad:
                                    undefined
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Cantidad perdida"
                          required
                          extra={
                            stock
                              ? `Disponible: ${formatPeso(disponible)} KG`
                              : undefined
                          }
                        >
                          <InputNumber
                            value={
                              detalle.cantidad
                            }
                            min={0.01}
                            max={
                              stock
                                ? disponible
                                : undefined
                            }
                            precision={2}
                            step={0.01}
                            addonAfter="KG"
                            className="gd-full-width"
                            placeholder="0.00"
                            disabled={
                              procesando ||
                              !stock
                            }
                            onChange={(
                              value
                            ) =>
                              actualizarDetalle(
                                index,
                                {
                                  cantidad:
                                    value ===
                                    null
                                      ? undefined
                                      : Number(
                                          value
                                        )
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Observación"
                        >
                          <Input
                            value={
                              detalle
                                .observacion
                            }
                            maxLength={300}
                            placeholder="Opcional"
                            disabled={
                              procesando
                            }
                            onChange={(e) =>
                              actualizarDetalle(
                                index,
                                {
                                  observacion:
                                    e.target
                                      .value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>

                    </Row>


                    {
                      stock &&
                      (
                        <>
                          <Row
                            gutter={[
                              12,
                              12
                            ]}
                            className="gd-merma-stock-summary"
                          >

                            <Col
                              xs={24}
                              sm={8}
                            >
                              <Card
                                size="small"
                              >
                                <Statistic
                                  title="Disponible"
                                  value={
                                    disponible
                                  }
                                  precision={2}
                                  suffix="KG"
                                />
                              </Card>
                            </Col>


                            <Col
                              xs={24}
                              sm={8}
                            >
                              <Card
                                size="small"
                              >
                                <Statistic
                                  title="Merma"
                                  value={
                                    cantidad
                                  }
                                  precision={2}
                                  suffix="KG"
                                />
                              </Card>
                            </Col>


                            <Col
                              xs={24}
                              sm={8}
                            >
                              <Card
                                size="small"
                              >
                                <Statistic
                                  title="Saldo estimado"
                                  value={
                                    saldo
                                  }
                                  precision={2}
                                  suffix="KG"
                                />
                              </Card>
                            </Col>

                          </Row>


                          <Progress
                            percent={
                              Number(
                                porcentajeSaldo
                                  .toFixed(2)
                              )
                            }
                            status={
                              saldo <= 0
                                ? 'exception'
                                : 'active'
                            }
                            className="gd-merma-stock-progress"
                          />


                          {
                            cantidad >
                              disponible &&
                            (
                              <Alert
                                type="error"
                                showIcon
                                message="La cantidad ingresada supera el stock disponible."
                              />
                            )
                          }

                        </>
                      )
                    }

                  </Card>
                );
              }
            )
          }

        </Space>

      </Card>


      <Card
        className="gd-merma-total-card"
      >

        <div className="gd-merma-total-grid">

          <Statistic
            title="Materias primas"
            value={
              detalles.length
            }
          />


          <Statistic
            title="Total de merma"
            value={
              Number(
                totalMerma
              )
            }
            precision={2}
            suffix="KG"
          />

        </div>

      </Card>


      <div className="gd-merma-actions">

        <Space wrap>

          <Button
            onClick={() =>
              navigate(
                '/gestion/mermas'
              )
            }
            disabled={
              procesando
            }
          >
            Cancelar
          </Button>


          <Button
            type="primary"
            icon={
              <SaveOutlined />
            }
            loading={
              procesando
            }
            disabled={
              disponibilidad.length ===
                0
            }
            onClick={
              solicitarRegistro
            }
          >
            Registrar merma
          </Button>

        </Space>

      </div>

    </div>
  );
}


export default RegistrarMerma;


<<<END OF FILE>>>


---

## FILE: src\pages\Pedidos.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

type DetallePedidoForm = {
  tipo_producto_id: string;
  medida_id: string;
  color_id: string;
  material_id: string;
  cantidad_pedida: string;
  unidad_medida_id: string;
  cantidad_presentacion: string;
  unidad_presentacion_id: string;
  precio_unitario: string;
  moneda_codigo: string;
  descripcion_item: string;
};

const detalleVacio: DetallePedidoForm = {
  tipo_producto_id: '',
  medida_id: '',
  color_id: '',
  material_id: '',
  cantidad_pedida: '',
  unidad_medida_id: '',
  cantidad_presentacion: '',
  unidad_presentacion_id: '',
  precio_unitario: '',
  moneda_codigo: 'PEN',
  descripcion_item: ''
};

function Pedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);

  const [tipos, setTipos] = useState<any[]>([]);
  const [medidas, setMedidas] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [unidades, setUnidades] = useState<any[]>([]);

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState({
    cliente_id: '',
    fecha_pedido: '',
    fecha_entrega_estimada: '',
    descripcion_pedido: ''
  });

  const [detalles, setDetalles] = useState<DetallePedidoForm[]>([
    { ...detalleVacio }
  ]);

  const cargarDatos = async () => {
    const [
      clientesData,
      tiposData,
      medidasData,
      coloresData,
      materialesData,
      unidadesData,
      pedidosData
    ] = await Promise.all([
      apiFetch('/clientes'),
      apiFetch('/catalogos/tiposProducto'),
      apiFetch('/catalogos/medidas'),
      apiFetch('/catalogos/colores'),
      apiFetch('/catalogos/materiales'),
      apiFetch('/catalogos/unidades-medida'),
      apiFetch('/pedidos')
    ]);

    setClientes(clientesData.clientes);
    setTipos(tiposData.items);
    setMedidas(medidasData.items);
    setColores(coloresData.items);
    setMateriales(materialesData.items);
    setUnidades(unidadesData.unidades);
    setPedidos(pedidosData.pedidos);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarDatos();
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, []);

  const handlePedidoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleDetalleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const nuevosDetalles = [...detalles];

    nuevosDetalles[index] = {
      ...nuevosDetalles[index],
      [e.target.name]: e.target.value
    };

    setDetalles(nuevosDetalles);
  };

  const agregarDetalle = () => {
    setDetalles([...detalles, { ...detalleVacio }]);
  };

  const quitarDetalle = (index: number) => {
    if (detalles.length === 1) {
      setError('El pedido debe tener al menos un producto');
      return;
    }

    const nuevosDetalles = detalles.filter((_, i) => i !== index);
    setDetalles(nuevosDetalles);
  };

  const registrarPedido = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    try {
      const body = {
        cliente_id: Number(form.cliente_id),
        fecha_pedido: form.fecha_pedido || undefined,
        fecha_entrega_estimada: form.fecha_entrega_estimada || null,
        descripcion_pedido: form.descripcion_pedido,
        detalles: detalles.map((item) => ({
          tipo_producto_id: Number(item.tipo_producto_id),
          medida_id: Number(item.medida_id),
          color_id: Number(item.color_id),
          material_id: Number(item.material_id),

          cantidad_pedida: Number(item.cantidad_pedida),
          unidad_medida_id: Number(item.unidad_medida_id),

          cantidad_presentacion: item.cantidad_presentacion
            ? Number(item.cantidad_presentacion)
            : null,

          unidad_presentacion_id: item.unidad_presentacion_id
            ? Number(item.unidad_presentacion_id)
            : null,

          precio_unitario: Number(item.precio_unitario),
          moneda_codigo: item.moneda_codigo,
          descripcion_item: item.descripcion_item
        }))
      };

      await apiFetch('/pedidos', {
        method: 'POST',
        body: JSON.stringify(body)
      });

      setMensaje('Pedido registrado correctamente');

      setForm({
        cliente_id: '',
        fecha_pedido: '',
        fecha_entrega_estimada: '',
        descripcion_pedido: ''
      });

      setDetalles([{ ...detalleVacio }]);

      const pedidosData = await apiFetch('/pedidos');
      setPedidos(pedidosData.pedidos);

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Pedidos</h1>
      <p>Registra pedidos con uno o varios productos.</p>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card pedido-form" onSubmit={registrarPedido}>
        <h3>Registrar pedido</h3>

        <label>Cliente</label>
        <select
          name="cliente_id"
          value={form.cliente_id}
          onChange={handlePedidoChange}
        >
          <option value="">Seleccione cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.cliente_id} value={cliente.cliente_id}>
              {cliente.razon_social} - {cliente.ruc}
            </option>
          ))}
        </select>

        <label>Fecha de pedido</label>
        <input
          type="date"
          name="fecha_pedido"
          value={form.fecha_pedido}
          onChange={handlePedidoChange}
        />

        <label>Fecha de entrega estimada</label>
        <input
          type="date"
          name="fecha_entrega_estimada"
          value={form.fecha_entrega_estimada}
          onChange={handlePedidoChange}
        />

        <label>Descripción del pedido</label>
        <textarea
          name="descripcion_pedido"
          value={form.descripcion_pedido}
          onChange={handlePedidoChange}
          placeholder="Ejemplo: Pedido de drizas para almacén principal"
          rows={3}
        />

        <h3>Productos del pedido</h3>

        {detalles.map((detalle, index) => (
          <div className="detalle-card" key={index}>
            <div className="detalle-header">
              <strong>Producto {index + 1}</strong>

              <button
                type="button"
                className="btn-danger"
                onClick={() => quitarDetalle(index)}
              >
                Quitar
              </button>
            </div>

            <div className="detalle-grid">
              <select
                name="tipo_producto_id"
                value={detalle.tipo_producto_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Tipo</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>

              <select
                name="medida_id"
                value={detalle.medida_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Medida</option>
                {medidas.map((medida) => (
                  <option key={medida.id} value={medida.id}>
                    {medida.nombre}
                  </option>
                ))}
              </select>

              <select
                name="color_id"
                value={detalle.color_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Color</option>
                {colores.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.nombre}
                  </option>
                ))}
              </select>

              <select
                name="material_id"
                value={detalle.material_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Material</option>
                {materiales.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.nombre}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="cantidad_pedida"
                value={detalle.cantidad_pedida}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Cantidad total"
              />

              <select
                name="unidad_medida_id"
                value={detalle.unidad_medida_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Unidad</option>
                {unidades.map((unidad) => (
                  <option key={unidad.unidad_medida_id} value={unidad.unidad_medida_id}>
                    {unidad.codigo}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="cantidad_presentacion"
                value={detalle.cantidad_presentacion}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Presentación"
              />

              <select
                name="unidad_presentacion_id"
                value={detalle.unidad_presentacion_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Unidad presentación</option>
                {unidades.map((unidad) => (
                  <option key={unidad.unidad_medida_id} value={unidad.unidad_medida_id}>
                    {unidad.codigo}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="precio_unitario"
                value={detalle.precio_unitario}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Precio ofrecido"
              />

              <select
                name="moneda_codigo"
                value={detalle.moneda_codigo}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="PEN">Soles</option>
                <option value="USD">Dólares</option>
              </select>
            </div>

            <input
              name="descripcion_item"
              value={detalle.descripcion_item}
              onChange={(e) => handleDetalleChange(index, e)}
              placeholder="Descripción del producto, ejemplo: DRIZA POLIESTER 1/4 BLANCO"
            />
          </div>
        ))}

        <button type="button" onClick={agregarDetalle}>
          + Agregar otro producto
        </button>

        <br />
        <br />

        <button type="submit">
          Guardar pedido
        </button>
      </form>

      <div className="tabla-card">
        <h3>Listado de pedidos</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha pedido</th>
              <th>Entrega estimada</th>
              <th>Estado</th>
              <th>Items</th>
              <th>Registrado por</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.pedido_id}>
                <td>{pedido.pedido_id}</td>
                <td>{pedido.razon_social}</td>
                <td>{pedido.fecha_pedido?.slice(0, 10)}</td>
                <td>{pedido.fecha_entrega_estimada?.slice(0, 10)}</td>
                <td>{pedido.estado_pedido}</td>
                <td>{pedido.cantidad_items}</td>
                <td>{pedido.registrado_por}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pedidos;

<<<END OF FILE>>>


---

## FILE: src\pages\pedidos\EditarPedido.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Result,
  Row,
  Select,
  Skeleton,
  Space
} from 'antd';

import {
  SaveOutlined
} from '@ant-design/icons';

import dayjs, {
  Dayjs
} from 'dayjs';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import PedidoItemsEditor, {
  detallePedidoVacio,
  type DetallePedidoForm
} from '../../components/pedidos/PedidoItemsEditor';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatCantidad
} from '../../utils/formatters';

import '../../styles/pedidosAntd.css';


const {
  TextArea
} = Input;


const convertirDetalleExistente = (
  detalle: any
): DetallePedidoForm => ({
  pedido_detalle_id:
    Number(
      detalle
        .pedido_detalle_id
    ),

  cantidad_entregada:
    Number(
      detalle
        .cantidad_entregada ||
      0
    ),

  cantidad_pendiente:
    Number(
      detalle
        .cantidad_pendiente ||
      0
    ),

  estado_entrega:
    detalle
      .estado_entrega ||
    'PENDIENTE',

  unidad:
    detalle.unidad ||
    '',

  tipo_producto_id:
    detalle.tipo_producto_id
      ? String(
          detalle
            .tipo_producto_id
        )
      : '',

  medida_id:
    detalle.medida_id
      ? String(
          detalle
            .medida_id
        )
      : '',

  color_id:
    detalle.color_id
      ? String(
          detalle
            .color_id
        )
      : '',

  material_id:
    detalle.material_id
      ? String(
          detalle
            .material_id
        )
      : '',

  cantidad_pedida:
    detalle.cantidad_pedida !==
      null &&
    detalle.cantidad_pedida !==
      undefined
      ? String(
          detalle
            .cantidad_pedida
        )
      : '',

  unidad_medida_id:
    detalle.unidad_medida_id
      ? String(
          detalle
            .unidad_medida_id
        )
      : '',

  cantidad_presentacion:
    detalle
      .cantidad_presentacion !==
      null &&
    detalle
      .cantidad_presentacion !==
      undefined
      ? String(
          detalle
            .cantidad_presentacion
        )
      : '',

  unidad_presentacion_id:
    detalle
      .unidad_presentacion_id
      ? String(
          detalle
            .unidad_presentacion_id
        )
      : '',

  precio_unitario:
    detalle.precio_unitario !==
      null &&
    detalle.precio_unitario !==
      undefined
      ? String(
          detalle
            .precio_unitario
        )
      : '',

  moneda_codigo:
    detalle
      .moneda_codigo ||
    'PEN',

  descripcion_item:
    detalle
      .descripcion_item ||
    '',

  observacion:
    detalle.observacion ||
    ''
});


const detalleNuevoTieneDatos = (
  item:
    DetallePedidoForm
) =>
  Boolean(
    item.tipo_producto_id ||
    item.medida_id ||
    item.color_id ||
    item.material_id ||
    item.cantidad_pedida ||
    item.unidad_medida_id ||
    item.cantidad_presentacion ||
    item.precio_unitario ||
    item.descripcion_item
      .trim() ||
    item.observacion
      .trim()
  );


const validarDetalle = (
  item:
    DetallePedidoForm,

  nombre:
    string,

  validarCantidadEntregada =
    false
) => {
  if (
    !item.tipo_producto_id ||
    !item.medida_id ||
    !item.color_id ||
    !item.material_id
  ) {
    return (
      `${nombre} debe tener tipo, medida, color y material`
    );
  }

  const cantidad =
    Number(
      item.cantidad_pedida
    );

  if (
    !Number.isFinite(
      cantidad
    ) ||
    cantidad <= 0
  ) {
    return (
      `${nombre} debe tener una cantidad mayor a 0`
    );
  }

  if (
    validarCantidadEntregada
  ) {
    const entregada =
      Number(
        item
          .cantidad_entregada ||
        0
      );

    if (
      cantidad <
      entregada
    ) {
      return (
        `${nombre} no puede tener una cantidad menor a lo ya entregado (${formatCantidad(entregada)} ${item.unidad || ''})`
      );
    }
  }

  if (
    !item.unidad_medida_id
  ) {
    return (
      `${nombre} debe tener una unidad de medida`
    );
  }

  if (
    item
      .cantidad_presentacion !==
    ''
  ) {
    const presentacion =
      Number(
        item
          .cantidad_presentacion
      );

    if (
      !Number.isFinite(
        presentacion
      ) ||
      presentacion <= 0
    ) {
      return (
        `${nombre} debe tener una presentación mayor a 0`
      );
    }

    if (
      !item
        .unidad_presentacion_id
    ) {
      return (
        `${nombre} debe tener una unidad de presentación`
      );
    }
  }

  const precio =
    Number(
      item.precio_unitario
    );

  if (
    !Number.isFinite(
      precio
    ) ||
    precio <= 0
  ) {
    return (
      `${nombre} debe tener un precio mayor a 0`
    );
  }

  if (
    ![
      'PEN',
      'USD'
    ].includes(
      item
        .moneda_codigo
    )
  ) {
    return (
      `${nombre} debe tener una moneda válida`
    );
  }

  return null;
};


const convertirDetalleApi = (
  item:
    DetallePedidoForm,

  incluirId =
    false
) => ({
  ...(incluirId
    ? {
        pedido_detalle_id:
          Number(
            item
              .pedido_detalle_id
          )
      }
    : {}
  ),

  tipo_producto_id:
    Number(
      item
        .tipo_producto_id
    ),

  medida_id:
    Number(
      item.medida_id
    ),

  color_id:
    Number(
      item.color_id
    ),

  material_id:
    Number(
      item.material_id
    ),

  cantidad_pedida:
    Number(
      item
        .cantidad_pedida
    ),

  unidad_medida_id:
    Number(
      item
        .unidad_medida_id
    ),

  cantidad_presentacion:
    item
      .cantidad_presentacion
      ? Number(
          item
            .cantidad_presentacion
        )
      : null,

  unidad_presentacion_id:
    item
      .cantidad_presentacion &&
    item
      .unidad_presentacion_id
      ? Number(
          item
            .unidad_presentacion_id
        )
      : null,

  precio_unitario:
    Number(
      item.precio_unitario
    ),

  moneda_codigo:
    item.moneda_codigo,

  descripcion_item:
    item
      .descripcion_item
      .trim(),

  observacion:
    item.observacion
      .trim()
});


function EditarPedido() {
  const {
    pedido_id
  } = useParams();

  const navigate =
    useNavigate();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    pedido,
    setPedido
  ] = useState<any | null>(
    null
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');

  const [
    clientes,
    setClientes
  ] = useState<any[]>([]);

  const [
    tipos,
    setTipos
  ] = useState<any[]>([]);

  const [
    medidas,
    setMedidas
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    unidades,
    setUnidades
  ] = useState<any[]>([]);

  const [
    clienteId,
    setClienteId
  ] = useState<
    number | null
  >(null);

  const [
    codigoPedido,
    setCodigoPedido
  ] = useState('');

  const [
    fechaPedido,
    setFechaPedido
  ] = useState<
    Dayjs | null
  >(null);

  const [
    fechaEntrega,
    setFechaEntrega
  ] = useState<
    Dayjs | null
  >(null);

  const [
    descripcion,
    setDescripcion
  ] = useState('');

  const [
    motivoCambio,
    setMotivoCambio
  ] = useState('');

  const [
    detallesEditados,
    setDetallesEditados
  ] = useState<
    DetallePedidoForm[]
  >([]);

  const [
    nuevosDetalles,
    setNuevosDetalles
  ] = useState<
    DetallePedidoForm[]
  >([
    {
      ...detallePedidoVacio
    }
  ]);

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const cargarDatos =
    useCallback(
      async () => {
        if (!pedido_id) {
          throw new Error(
            'Pedido no válido'
          );
        }

        const [
          pedidoData,
          clientesData,
          tiposData,
          medidasData,
          coloresData,
          materialesData,
          unidadesData
        ] = await Promise.all([
          apiFetch(
            `/pedidos/${pedido_id}`
          ),

          apiFetch(
            '/clientes/select'
          ),

          apiFetch(
            '/catalogos/tiposProducto'
          ),

          apiFetch(
            '/catalogos/medidas'
          ),

          apiFetch(
            '/catalogos/colores'
          ),

          apiFetch(
            '/catalogos/materiales'
          ),

          apiFetch(
            '/catalogos/unidades-medida'
          )
        ]);


        const actual =
          pedidoData.pedido;

        if (!actual) {
          throw new Error(
            'Pedido no encontrado'
          );
        }

        setPedido(
          actual
        );

        setClientes(
          clientesData.clientes ||
          []
        );

        setTipos(
          tiposData.items ||
          []
        );

        setMedidas(
          medidasData.items ||
          []
        );

        setColores(
          coloresData.items ||
          []
        );

        setMateriales(
          materialesData.items ||
          []
        );

        setUnidades(
          unidadesData.unidades ||
          []
        );

        setClienteId(
          Number(
            actual.cliente_id
          )
        );

        setCodigoPedido(
          actual
            .codigo_pedido ||
          ''
        );

        setFechaPedido(
          actual.fecha_pedido
            ? dayjs(
                actual
                  .fecha_pedido
              )
            : null
        );

        setFechaEntrega(
          actual
            .fecha_entrega_estimada
            ? dayjs(
                actual
                  .fecha_entrega_estimada
              )
            : null
        );

        setDescripcion(
          actual
            .descripcion_pedido ||
          ''
        );

        setMotivoCambio('');

        setDetallesEditados(
          (
            actual.detalles ||
            []
          ).map(
            convertirDetalleExistente
          )
        );

        setNuevosDetalles([
          {
            ...detallePedidoVacio
          }
        ]);
      },
      [
        pedido_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await cargarDatos();

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el pedido';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarDatos,
    message
  ]);


  const validar = () => {
    if (
      pedido
        ?.estado_pedido ===
      'ENTREGADO'
    ) {
      return (
        'Un pedido completamente entregado ya no puede editarse'
      );
    }

    if (
      pedido
        ?.estado_pedido ===
      'CANCELADO'
    ) {
      return (
        'Un pedido cancelado no puede editarse'
      );
    }

    if (!clienteId) {
      return (
        'Debes seleccionar un cliente'
      );
    }

    if (!fechaPedido) {
      return (
        'Debes ingresar la fecha del pedido'
      );
    }

    if (
      !motivoCambio
        .trim()
    ) {
      return (
        'Debes ingresar el motivo del cambio'
      );
    }

    if (
      detallesEditados
        .length ===
      0
    ) {
      return (
        'El pedido debe tener al menos un producto'
      );
    }

    for (
      let index = 0;
      index <
      detallesEditados.length;
      index++
    ) {
      const item =
        detallesEditados[index];

      if (
        !item
          .pedido_detalle_id
      ) {
        return (
          `El producto registrado ${index + 1} no tiene un identificador válido`
        );
      }

      const error =
        validarDetalle(
          item,
          `El producto registrado ${index + 1}`,
          true
        );

      if (error) {
        return error;
      }
    }

    const nuevosValidos =
      nuevosDetalles.filter(
        detalleNuevoTieneDatos
      );

    for (
      let index = 0;
      index <
      nuevosValidos.length;
      index++
    ) {
      const error =
        validarDetalle(
          nuevosValidos[index],
          `El nuevo producto ${index + 1}`,
          false
        );

      if (error) {
        return error;
      }
    }

    return null;
  };


  const confirmar = async () => {
    const error =
      validar();

    if (error) {
      message.error(
        error
      );
      return;
    }

    modal.confirm({
      title:
        'Confirmar edición del pedido',

      content:
        'Se actualizarán los datos del pedido y sus productos. Las cantidades no pueden quedar por debajo de lo ya entregado y el cambio quedará registrado en el historial.',

      okText:
        'Actualizar pedido',

      cancelText:
        'Cancelar',

      onOk:
        actualizar
    });
  };


  const actualizar =
    async () => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      const error =
        validar();

      if (error) {
        liberar();

        message.error(
          error
        );

        return;
      }

      try {
        const nuevosValidos =
          nuevosDetalles.filter(
            detalleNuevoTieneDatos
          );

        await apiFetch(
          `/pedidos/${pedido_id}`,
          {
            method: 'PUT',

            body:
              JSON.stringify({
                cliente_id:
                  clienteId,

                codigo_pedido:
                  codigoPedido
                    .trim() ||
                  null,

                descripcion_pedido:
                  descripcion
                    .trim(),

                fecha_pedido:
                  fechaPedido!
                    .format(
                      'YYYY-MM-DD'
                    ),

                fecha_entrega_estimada:
                  fechaEntrega
                    ? fechaEntrega
                        .format(
                          'YYYY-MM-DD'
                        )
                    : null,

                motivo_cambio:
                  motivoCambio
                    .trim(),

                detalles_editados:
                  detallesEditados.map(
                    (item) =>
                      convertirDetalleApi(
                        item,
                        true
                      )
                  ),

                nuevos_detalles:
                  nuevosValidos.map(
                    (item) =>
                      convertirDetalleApi(
                        item,
                        false
                      )
                  )
              })
          }
        );


        message.success(
          'Pedido actualizado correctamente'
        );


        navigate(
          `/gestion/pedidos/${pedido_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el pedido'
        );

        throw error;
      }
    };


  const feedbackEditor = (
    tipo:
      'success' |
      'error' |
      'info' |
      'warning',

    mensaje: string
  ) => {
    message.open({
      type:
        tipo === 'warning'
          ? 'warning'
          : tipo,

      content:
        mensaje
    });
  };


  if (
    cargando
  ) {
    return (
      <div className="gd-pedido-page">

        <Skeleton
          active
          paragraph={{
            rows: 14
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !pedido
  ) {
    return (
      <div className="gd-pedido-page">

        <BackButton
          to="/gestion/pedidos"
          label="Volver a pedidos"
        />


        <Result
          status="error"
          title="No se pudo cargar el pedido"
          subTitle={
            errorCarga ||
            'Pedido no encontrado'
          }
        />

      </div>
    );
  }


  if (
    pedido.estado_pedido ===
    'ENTREGADO'
  ) {
    return (
      <div className="gd-pedido-page">

        <BackButton
          to={
            `/gestion/pedidos/${pedido_id}`
          }
          label="Volver al detalle"
        />


        <Result
          status="success"
          title="Pedido completamente entregado"
          subTitle="Por seguridad ya no puede modificarse."
          extra={
            <Button
              type="primary"
              onClick={() =>
                navigate(
                  `/gestion/pedidos/${pedido_id}`
                )
              }
            >
              Ver detalle
            </Button>
          }
        />

      </div>
    );
  }


  if (
    pedido.estado_pedido ===
    'CANCELADO'
  ) {
    return (
      <div className="gd-pedido-page">

        <BackButton
          to={
            `/gestion/pedidos/${pedido_id}`
          }
          label="Volver al detalle"
        />


        <Result
          status="warning"
          title="Pedido cancelado"
          subTitle="Un pedido cancelado no puede modificarse."
        />

      </div>
    );
  }


  return (
    <div className="gd-pedido-page">

      <BackButton
        to={
          `/gestion/pedidos/${pedido_id}`
        }
        label="Volver al detalle"
      />


      <PageHeader
        title="Editar pedido"
        description="Modifica los datos del pedido, sus productos registrados o agrega productos nuevos."
      />


      <Card
        title="Datos del pedido"
        className="gd-pedido-section-card"
      >

        <Form
          layout="vertical"
          requiredMark={false}
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              lg={12}
            >
              <Form.Item
                label="Cliente"
                required
              >
                <Select
                  size="large"
                  value={
                    clienteId ||
                    undefined
                  }
                  showSearch
                  optionFilterProp="label"
                  disabled={
                    procesando
                  }
                  options={
                    clientes.map(
                      (cliente) => ({
                        value:
                          cliente
                            .cliente_id,

                        label:
                          `${cliente.razon_social} · ${cliente.ruc}`
                      })
                    )
                  }
                  onChange={
                    setClienteId
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              lg={12}
            >
              <Form.Item
                label="Código de pedido"
              >
                <Input
                  size="large"
                  value={
                    codigoPedido
                  }
                  maxLength={50}
                  disabled={
                    procesando
                  }
                  onChange={(e) =>
                    setCodigoPedido(
                      e.target.value
                    )
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              md={12}
            >
              <Form.Item
                label="Fecha de pedido"
                required
              >
                <DatePicker
                  size="large"
                  value={
                    fechaPedido
                  }
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  disabled={
                    procesando
                  }
                  onChange={
                    setFechaPedido
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              md={12}
            >
              <Form.Item
                label="Fecha de entrega estimada"
              >
                <DatePicker
                  size="large"
                  value={
                    fechaEntrega
                  }
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  disabled={
                    procesando
                  }
                  onChange={
                    setFechaEntrega
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
            >
              <Form.Item
                label="Descripción del pedido"
              >
                <TextArea
                  rows={3}
                  maxLength={500}
                  showCount
                  value={
                    descripcion
                  }
                  disabled={
                    procesando
                  }
                  onChange={(e) =>
                    setDescripcion(
                      e.target.value
                    )
                  }
                />
              </Form.Item>
            </Col>

          </Row>

        </Form>

      </Card>


      <PedidoItemsEditor
        detalles={
          detallesEditados
        }
        setDetalles={
          setDetallesEditados
        }
        tipos={tipos}
        medidas={medidas}
        colores={colores}
        materiales={
          materiales
        }
        unidades={
          unidades
        }
        titulo="Editar productos registrados"
        permitirAgregar={
          false
        }
        permitirQuitar={
          false
        }
        bloquearEstructuraConEntrega
        mostrarResumenEntrega
        procesando={
          procesando
        }
        onFeedback={
          feedbackEditor
        }
      />


      <PedidoItemsEditor
        detalles={
          nuevosDetalles
        }
        setDetalles={
          setNuevosDetalles
        }
        tipos={tipos}
        medidas={medidas}
        colores={colores}
        materiales={
          materiales
        }
        unidades={
          unidades
        }
        titulo="Agregar productos"
        textoBotonAgregar="Agregar otro producto"
        permitirAgregar
        permitirQuitar
        procesando={
          procesando
        }
        onFeedback={
          feedbackEditor
        }
      />


      <Card
        title="Motivo del cambio"
        className="gd-pedido-section-card"
      >

        <Alert
          type="info"
          showIcon
          message="El motivo quedará registrado en el historial del pedido."
          className="gd-pedido-inline-alert"
        />


        <Form
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Motivo"
            required
          >
            <TextArea
              rows={3}
              maxLength={500}
              showCount
              value={
                motivoCambio
              }
              placeholder="Ejemplo: El cliente solicitó modificar la cantidad y el precio acordado."
              disabled={
                procesando
              }
              onChange={(e) =>
                setMotivoCambio(
                  e.target.value
                )
              }
            />
          </Form.Item>
        </Form>

      </Card>


      <div className="gd-pedido-actions">

        <Space
          wrap
        >

          <Button
            onClick={() =>
              navigate(
                `/gestion/pedidos/${pedido_id}`
              )
            }
            disabled={
              procesando
            }
          >
            Cancelar
          </Button>


          <Button
            type="primary"
            icon={
              <SaveOutlined />
            }
            loading={
              procesando
            }
            onClick={
              confirmar
            }
          >
            Actualizar pedido
          </Button>

        </Space>

      </div>

    </div>
  );
}


export default EditarPedido;


<<<END OF FILE>>>


---

## FILE: src\pages\pedidos\PedidoDetalle.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Result,
  Row,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  CalendarOutlined,
  EditOutlined,
  ShopOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatCantidad,
  formatMonto
} from '../../utils/formatters';

import '../../styles/pedidosAntd.css';


const {
  Text
} = Typography;


const pedidoEstadoTag = (
  estado: string
) => {
  if (
    estado === 'ENTREGADO'
  ) {
    return (
      <Tag color="success">
        Entregado
      </Tag>
    );
  }

  if (
    estado === 'PARCIAL'
  ) {
    return (
      <Tag color="warning">
        Parcial
      </Tag>
    );
  }

  if (
    estado === 'CANCELADO'
  ) {
    return (
      <Tag color="error">
        Cancelado
      </Tag>
    );
  }

  return (
    <Tag color="processing">
      Registrado
    </Tag>
  );
};


const entregaTag = (
  estado: string
) => {
  if (
    estado === 'COMPLETO'
  ) {
    return (
      <Tag color="success">
        Completo
      </Tag>
    );
  }

  if (
    estado === 'PARCIAL'
  ) {
    return (
      <Tag color="warning">
        Parcial
      </Tag>
    );
  }

  return (
    <Tag>
      Pendiente
    </Tag>
  );
};


function PedidoDetalle() {
  const {
    pedido_id
  } = useParams();

  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    pedido,
    setPedido
  ] = useState<any | null>(
    null
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          const data =
            await apiFetch(
              `/pedidos/${pedido_id}`
            );

          setPedido(
            data.pedido
          );

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el pedido';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    pedido_id,
    message
  ]);


  const totales =
    useMemo(
      () => {
        const mapa =
          new Map<
            string,
            number
          >();

        for (
          const detalle
          of pedido?.detalles ||
          []
        ) {
          const moneda =
            detalle
              .moneda_codigo;

          mapa.set(
            moneda,
            (
              mapa.get(
                moneda
              ) || 0
            ) +
            Number(
              detalle.subtotal ||
              0
            )
          );
        }

        return Array.from(
          mapa.entries()
        ).map(
          ([
            moneda,
            total
          ]) => ({
            moneda,
            total
          })
        );
      },
      [
        pedido
      ]
    );


  const editable =
    pedido &&
    (
      pedido.estado_pedido ===
        'REGISTRADO' ||
      pedido.estado_pedido ===
        'PARCIAL'
    );


  const productosColumns:
    TableColumnsType<any> = [
    {
      title: 'Producto',
      key: 'producto',
      minWidth: 230,

      render: (
        _,
        detalle
      ) => (
        <div className="gd-pedido-product-cell">

          <Text strong>
            {
              detalle
                .tipo_producto
            }
            {' · '}
            {
              detalle.material
            }
            {' · '}
            {
              detalle.medida
            }
            {' · '}
            {
              detalle.color
            }
          </Text>

          <Text
            type="secondary"
          >
            {
              detalle
                .descripcion_item ||
              '-'
            }
          </Text>

        </div>
      )
    },

    {
      title: 'Pedido',
      key: 'pedido',
      width: 145,

      render: (
        _,
        detalle
      ) =>
        `${formatCantidad(detalle.cantidad_pedida)} ${detalle.unidad}`
    },

    {
      title: 'Entregado',
      key: 'entregado',
      width: 145,

      render: (
        _,
        detalle
      ) =>
        `${formatCantidad(detalle.cantidad_entregada)} ${detalle.unidad}`
    },

    {
      title: 'Pendiente',
      key: 'pendiente',
      width: 145,

      render: (
        _,
        detalle
      ) =>
        `${formatCantidad(detalle.cantidad_pendiente)} ${detalle.unidad}`
    },

    {
      title: 'Presentación',
      key: 'presentacion',
      width: 155,

      render: (
        _,
        detalle
      ) =>
        detalle
          .cantidad_presentacion
          ? `${formatCantidad(detalle.cantidad_presentacion)} ${detalle.unidad_presentacion || ''}`
          : '-'
    },

    {
      title: 'Precio',
      key: 'precio',
      width: 145,

      render: (
        _,
        detalle
      ) =>
        `${formatMonto(detalle.precio_unitario)} ${detalle.moneda_codigo}`
    },

    {
      title: 'Subtotal',
      key: 'subtotal',
      width: 150,

      render: (
        _,
        detalle
      ) => (
        <Text strong>
          {
            formatMonto(
              detalle.subtotal
            )
          } {
            detalle
              .moneda_codigo
          }
        </Text>
      )
    },

    {
      title: 'Estado',
      dataIndex:
        'estado_entrega',
      key:
        'estado_entrega',
      width: 120,

      render: (
        value: string
      ) =>
        entregaTag(
          value
        )
    }
  ];


  const historialColumns:
    TableColumnsType<any> = [
    {
      title: 'Tipo',
      dataIndex:
        'tipo_cambio',
      key:
        'tipo_cambio',
      width: 160,

      render: (
        value: string
      ) => (
        <Tag>
          {
            String(
              value ||
              ''
            ).replace(
              /_/g,
              ' '
            )
          }
        </Tag>
      )
    },

    {
      title: 'Motivo',
      dataIndex:
        'descripcion_motivo',
      key:
        'descripcion_motivo',
      minWidth: 250
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      width: 180,
      responsive: [
        'md'
      ]
    },

    {
      title: 'Fecha',
      dataIndex:
        'created_at',
      key:
        'created_at',
      width: 125,

      render: (
        value?: string | null
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-pedido-page">

        <Skeleton
          active
          paragraph={{
            rows: 12
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !pedido
  ) {
    return (
      <div className="gd-pedido-page">

        <BackButton
          to="/gestion/pedidos"
          label="Volver a pedidos"
        />


        <Result
          status="error"
          title="No se pudo cargar el pedido"
          subTitle={
            errorCarga ||
            'Pedido no encontrado'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-pedido-page">

      <BackButton
        to="/gestion/pedidos"
        label="Volver a pedidos"
      />


      <PageHeader
        title={
          pedido.codigo_pedido
            ? `Pedido ${pedido.codigo_pedido}`
            : 'Detalle del pedido'
        }
        description={
          `${pedido.razon_social} · ${pedido.ruc}`
        }
        extra={
          <Space
            wrap
          >
            {
              pedidoEstadoTag(
                pedido.estado_pedido
              )
            }

            {
              editable &&
              (
                <Button
                  type="primary"
                  icon={
                    <EditOutlined />
                  }
                  onClick={() =>
                    navigate(
                      `/gestion/pedidos/${pedido.pedido_id}/editar`
                    )
                  }
                >
                  Editar pedido
                </Button>
              )
            }
          </Space>
        }
      />


      {
        !editable &&
        (
          <Alert
            showIcon
            type={
              pedido
                .estado_pedido ===
                'ENTREGADO'
                ? 'success'
                : 'warning'
            }
            message={
              pedido
                .estado_pedido ===
                'ENTREGADO'
                ? 'Pedido completamente entregado'
                : 'Pedido cancelado'
            }
            description={
              'Este pedido ya no puede modificarse.'
            }
            className="gd-pedido-detail-alert"
          />
        )
      }


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-pedido-summary"
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Cliente"
              value={
                pedido
                  .razon_social
              }
              prefix={
                <ShopOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Fecha pedido"
              value={
                pedido
                  .fecha_pedido
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
              }
              prefix={
                <CalendarOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Entrega estimada"
              value={
                pedido
                  .fecha_entrega_estimada
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
              }
              prefix={
                <CalendarOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Registrado por"
              value={
                pedido
                  .registrado_por
              }
              prefix={
                <UserOutlined />
              }
            />
          </Card>
        </Col>

      </Row>


      <Card
        title="Datos del pedido"
        className="gd-pedido-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 3
          }}
          items={[
            {
              key: 'codigo',
              label: 'Código',
              children:
                pedido
                  .codigo_pedido ||
                '-'
            },

            {
              key: 'direccion',
              label: 'Dirección cliente',
              children:
                pedido.direccion ||
                '-'
            },

            {
              key: 'agencia',
              label: 'Agencia de entrega',
              children:
                pedido
                  .agencia_entrega ||
                '-'
            },

            {
              key: 'descripcion',
              label: 'Descripción',
              span: 3,
              children:
                pedido
                  .descripcion_pedido ||
                'Sin descripción'
            }
          ]}
        />

      </Card>


      <Card
        title="Totales por moneda"
        className="gd-pedido-section-card"
      >

        <Space
          size={[
            12,
            12
          ]}
          wrap
        >
          {
            totales.map(
              (item) => (
                <Card
                  size="small"
                  key={
                    item.moneda
                  }
                  className="gd-pedido-total-card"
                >
                  <Statistic
                    title={
                      item.moneda ===
                        'PEN'
                        ? 'Soles'
                        : 'Dólares'
                    }
                    value={
                      Number(
                        item.total
                      )
                    }
                    precision={2}
                    suffix={
                      item.moneda
                    }
                  />
                </Card>
              )
            )
          }
        </Space>

      </Card>


      <Card
        title="Productos del pedido"
        extra={
          <Text
            type="secondary"
          >
            {
              pedido
                .detalles
                .length
            } producto(s)
          </Text>
        }
        className="gd-pedido-section-card"
      >

        <Table
          rowKey="pedido_detalle_id"
          columns={
            productosColumns
          }
          dataSource={
            pedido.detalles
          }
          pagination={false}
          scroll={{
            x: 1100
          }}
        />

      </Card>


      <Card
        title="Historial de cambios"
        className="gd-pedido-section-card"
      >

        <Table
          rowKey="pedido_cambio_id"
          columns={
            historialColumns
          }
          dataSource={
            pedido
              .historial_cambios ||
            []
          }
          pagination={false}
          scroll={{
            x: 720
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay cambios registrados"
              />
          }}
        />

      </Card>

    </div>
  );
}


export default PedidoDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\pedidos\PedidosLista.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatCantidad,
  formatMonto
} from '../../utils/formatters';

import '../../styles/pedidosAntd.css';


const {
  Text
} = Typography;


type Pedido = {
  pedido_id: number;
  codigo_pedido?: string | null;
  descripcion_pedido?: string | null;

  fecha_pedido: string;
  fecha_entrega_estimada?: string | null;

  estado_pedido:
    | 'REGISTRADO'
    | 'PARCIAL'
    | 'ENTREGADO'
    | 'CANCELADO';

  cliente_id: number;
  ruc: string;
  razon_social: string;

  registrado_por: string;

  cantidad_items: number;
  total_referencial: number;

  resumen_cantidades?:
    string | null;
};


type Filtros = {
  cliente_id?: number;
  estado_pedido?: string;
  q?: string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const estadoTag = (
  estado: string
) => {
  if (
    estado === 'ENTREGADO'
  ) {
    return (
      <Tag color="success">
        Entregado
      </Tag>
    );
  }

  if (
    estado === 'PARCIAL'
  ) {
    return (
      <Tag color="warning">
        Parcial
      </Tag>
    );
  }

  if (
    estado === 'CANCELADO'
  ) {
    return (
      <Tag color="error">
        Cancelado
      </Tag>
    );
  }

  return (
    <Tag color="processing">
      Registrado
    </Tag>
  );
};


const puedeEditar = (
  estado: string
) =>
  estado === 'REGISTRADO' ||
  estado === 'PARCIAL';


const cantidadesPedido = (
  resumen?:
    string | null
) => {
  if (!resumen) {
    return [];
  }

  return resumen
    .split('|')
    .filter(
      (item) =>
        item.trim()
    )
    .map(
      (item) => {
        const partes =
          item
            .trim()
            .split(' ');

        return {
          cantidad:
            Number(
              partes[0]
            ),

          unidad:
            partes
              .slice(1)
              .join(' ')
        };
      }
    );
};


function PedidosLista() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    Filtros
  >();

  const [
    pedidos,
    setPedidos
  ] = useState<
    Pedido[]
  >([]);

  const [
    clientes,
    setClientes
  ] = useState<any[]>(
    []
  );

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<
    Filtros
  >({});

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarClientes =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/clientes/select'
          );

        setClientes(
          data.clientes ||
          []
        );
      },
      []
    );


  const cargarPedidos =
    useCallback(
      async (
        pagina: number,
        filtros:
          Filtros
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(pagina)
        );

        params.set(
          'limit',
          '10'
        );

        if (
          filtros.cliente_id
        ) {
          params.set(
            'cliente_id',
            String(
              filtros.cliente_id
            )
          );
        }

        if (
          filtros.estado_pedido
        ) {
          params.set(
            'estado_pedido',
            filtros
              .estado_pedido
          );
        }

        if (
          filtros.q?.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }

        const data =
          await apiFetch(
            `/pedidos?${params.toString()}`
          );

        setPedidos(
          data.pedidos ||
          []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  const cargarTodo =
    useCallback(
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarClientes(),
            cargarPedidos(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los pedidos'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarClientes,
        cargarPedidos,
        filtrosAplicados,
        message,
        page
      ]
    );


  useEffect(() => {
    cargarTodo();
  }, [
    cargarTodo
  ]);


  const aplicarFiltros =
    (
      values:
        Filtros
    ) => {
      setPage(1);

      setFiltrosAplicados({
        cliente_id:
          values.cliente_id,

        estado_pedido:
          values.estado_pedido,

        q:
          values.q?.trim() ||
          ''
      });
    };


  const limpiarFiltros =
    () => {
      form.resetFields();
      setPage(1);
      setFiltrosAplicados({});
    };


  const columns:
    TableColumnsType<
      Pedido
    > = [
    {
      title: 'Código',
      dataIndex:
        'codigo_pedido',
      key:
        'codigo_pedido',
      width: 130,

      render: (
        value?: string | null
      ) =>
        value
          ? (
              <Text code>
                {value}
              </Text>
            )
          : '-'
    },

    {
      title: 'Cliente',
      key: 'cliente',
      minWidth: 210,

      render: (
        _,
        pedido
      ) => (
        <div className="gd-pedido-client-cell">

          <Text strong>
            {
              pedido
                .razon_social
            }
          </Text>

          <Text
            type="secondary"
          >
            {pedido.ruc}
          </Text>

        </div>
      )
    },

    {
      title: 'Fecha',
      dataIndex:
        'fecha_pedido',
      key:
        'fecha_pedido',
      width: 120,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title:
        'Entrega estimada',
      dataIndex:
        'fecha_entrega_estimada',
      key:
        'fecha_entrega_estimada',
      width: 145,
      responsive: [
        'md'
      ],

      render: (
        value?: string | null
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Estado',
      dataIndex:
        'estado_pedido',
      key:
        'estado_pedido',
      width: 125,

      render: (
        value: string
      ) =>
        estadoTag(
          value
        )
    },

    {
      title: 'Productos',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 105,
      responsive: [
        'md'
      ]
    },

    {
      title:
        'Total ref.',
      dataIndex:
        'total_referencial',
      key:
        'total_referencial',
      width: 130,
      responsive: [
        'lg'
      ],

      render: (
        value: number
      ) => (
        <Text strong>
          {
            formatMonto(
              value
            )
          }
        </Text>
      )
    },

    {
      title:
        'Cantidades',
      dataIndex:
        'resumen_cantidades',
      key:
        'resumen_cantidades',
      minWidth: 180,
      responsive: [
        'lg'
      ],

      render: (
        value?:
          string | null
      ) => {
        const items =
          cantidadesPedido(
            value
          );

        if (
          items.length === 0
        ) {
          return '-';
        }

        return (
          <Space
            size={[
              4,
              4
            ]}
            wrap
          >
            {
              items.map(
                (
                  item,
                  index
                ) => (
                  <Tag
                    key={
                      `${item.unidad}-${index}`
                    }
                  >
                    {
                      formatCantidad(
                        item.cantidad
                      )
                    } {
                      item.unidad
                    }
                  </Tag>
                )
              )
            }
          </Space>
        );
      }
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      responsive: [
        'xl'
      ]
    },

    {
      title: 'Acciones',
      key: 'acciones',
      fixed: 'right',
      width: 175,

      render: (
        _,
        pedido
      ) => (
        <Space
          size={4}
          wrap
        >

          <Button
            type="link"
            icon={
              <EyeOutlined />
            }
            onClick={() =>
              navigate(
                `/gestion/pedidos/${pedido.pedido_id}`
              )
            }
          >
            Ver
          </Button>


          {
            puedeEditar(
              pedido
                .estado_pedido
            )
              ? (
                  <Button
                    type="text"
                    icon={
                      <EditOutlined />
                    }
                    onClick={() =>
                      navigate(
                        `/gestion/pedidos/${pedido.pedido_id}/editar`
                      )
                    }
                  >
                    Editar
                  </Button>
                )
              : (
                  <Text
                    type="secondary"
                  >
                    Cerrado
                  </Text>
                )
          }

        </Space>
      )
    }
  ];


  return (
    <div className="gd-pedido-page">

      <PageHeader
        title="Pedidos"
        description="Consulta, filtra, revisa y edita los pedidos registrados."
        extra={
          <Button
            type="primary"
            icon={
              <PlusOutlined />
            }
            onClick={() =>
              navigate(
                '/gestion/pedidos/registrar'
              )
            }
          >
            Registrar pedido
          </Button>
        }
      />


      <Card
        title="Filtros"
        className="gd-pedido-filter-card"
      >

        <Form<Filtros>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={
            aplicarFiltros
          }
        >

          <Row
            gutter={[
              14,
              0
            ]}
            align="bottom"
          >

            <Col
              xs={24}
              lg={7}
            >
              <Form.Item
                label="Cliente"
                name="cliente_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos los clientes"
                  options={
                    clientes.map(
                      (cliente) => ({
                        value:
                          cliente
                            .cliente_id,

                        label:
                          `${cliente.razon_social} · ${cliente.ruc}`
                      })
                    )
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              sm={12}
              lg={5}
            >
              <Form.Item
                label="Estado"
                name="estado_pedido"
              >
                <Select
                  allowClear
                  placeholder="Todos"
                  options={[
                    {
                      value:
                        'REGISTRADO',
                      label:
                        'Registrado'
                    },
                    {
                      value:
                        'PARCIAL',
                      label:
                        'Parcial'
                    },
                    {
                      value:
                        'ENTREGADO',
                      label:
                        'Entregado'
                    },
                    {
                      value:
                        'CANCELADO',
                      label:
                        'Cancelado'
                    }
                  ]}
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              lg={7}
            >
              <Form.Item
                label="Buscar"
                name="q"
              >
                <Input
                  allowClear
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Cliente, RUC, código o descripción"
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              lg={5}
            >
              <Form.Item
                label=" "
                className="gd-pedido-filter-actions"
              >
                <Space
                  wrap
                >

                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <SearchOutlined />
                    }
                  >
                    Buscar
                  </Button>


                  <Button
                    onClick={
                      limpiarFiltros
                    }
                  >
                    Limpiar
                  </Button>


                  <Button
                    icon={
                      <ReloadOutlined />
                    }
                    loading={
                      cargando
                    }
                    onClick={
                      cargarTodo
                    }
                  >
                    Actualizar
                  </Button>

                </Space>
              </Form.Item>
            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Listado de pedidos"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } pedido(s)
          </Text>
        }
        className="gd-pedido-table-card"
      >

        <Table<Pedido>
          rowKey="pedido_id"
          columns={columns}
          dataSource={
            pedidos
          }
          loading={
            cargando
          }
          scroll={{
            x: 1100
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay pedidos para mostrar"
              />
          }}
          pagination={{
            current:
              paginacion.page,

            pageSize:
              paginacion.limit,

            total:
              paginacion.total,

            showSizeChanger:
              false,

            showTotal: (
              total
            ) =>
              `${total} pedido(s)`,

            onChange: (
              nuevaPagina
            ) =>
              setPage(
                nuevaPagina
              )
          }}
        />

      </Card>

    </div>
  );
}


export default PedidosLista;


<<<END OF FILE>>>


---

## FILE: src\pages\pedidos\RegistrarPedido.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Space
} from 'antd';

import {
  SaveOutlined
} from '@ant-design/icons';

import dayjs, {
  Dayjs
} from 'dayjs';

import {
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import PedidoItemsEditor, {
  detallePedidoVacio,
  type DetallePedidoForm
} from '../../components/pedidos/PedidoItemsEditor';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/pedidosAntd.css';


const {
  TextArea
} = Input;


function RegistrarPedido() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    clientes,
    setClientes
  ] = useState<any[]>([]);

  const [
    tipos,
    setTipos
  ] = useState<any[]>([]);

  const [
    medidas,
    setMedidas
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    unidades,
    setUnidades
  ] = useState<any[]>([]);

  const [
    cargandoBase,
    setCargandoBase
  ] = useState(true);

  const [
    clienteId,
    setClienteId
  ] = useState<
    number | null
  >(null);

  const [
    codigoPedido,
    setCodigoPedido
  ] = useState('');

  const [
    fechaPedido,
    setFechaPedido
  ] = useState<
    Dayjs | null
  >(null);

  const [
    fechaEntrega,
    setFechaEntrega
  ] = useState<
    Dayjs | null
  >(null);

  const [
    descripcion,
    setDescripcion
  ] = useState('');

  const [
    detalles,
    setDetalles
  ] = useState<
    DetallePedidoForm[]
  >([
    {
      ...detallePedidoVacio
    }
  ]);

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar =
      async () => {
        setCargandoBase(
          true
        );

        try {
          const [
            clientesData,
            tiposData,
            medidasData,
            coloresData,
            materialesData,
            unidadesData
          ] = await Promise.all([
            apiFetch(
              '/clientes/select'
            ),
            apiFetch(
              '/catalogos/tiposProducto'
            ),
            apiFetch(
              '/catalogos/medidas'
            ),
            apiFetch(
              '/catalogos/colores'
            ),
            apiFetch(
              '/catalogos/materiales'
            ),
            apiFetch(
              '/catalogos/unidades-medida'
            )
          ]);

          setClientes(
            clientesData.clientes ||
            []
          );

          setTipos(
            tiposData.items ||
            []
          );

          setMedidas(
            medidasData.items ||
            []
          );

          setColores(
            coloresData.items ||
            []
          );

          setMateriales(
            materialesData.items ||
            []
          );

          setUnidades(
            unidadesData.unidades ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos del pedido'
          );

        } finally {
          setCargandoBase(
            false
          );
        }
      };

    cargar();
  }, [
    message
  ]);


  const feedbackEditor = (
    tipo:
      'success' |
      'error' |
      'info' |
      'warning',

    mensaje: string
  ) => {
    message.open({
      type:
        tipo === 'warning'
          ? 'warning'
          : tipo,

      content:
        mensaje
    });
  };


  const validar = () => {
    if (!clienteId) {
      return (
        'Debe seleccionar un cliente'
      );
    }

    if (
      !detalles ||
      detalles.length === 0
    ) {
      return (
        'Debe registrar al menos un producto'
      );
    }

    for (
      const [
        index,
        item
      ] of detalles.entries()
    ) {
      const nombre =
        `El producto ${index + 1}`;

      if (
        !item.tipo_producto_id ||
        !item.medida_id ||
        !item.color_id ||
        !item.material_id
      ) {
        return (
          `${nombre} debe tener tipo, medida, color y material`
        );
      }

      const cantidad =
        Number(
          item.cantidad_pedida
        );

      if (
        !Number.isFinite(
          cantidad
        ) ||
        cantidad <= 0
      ) {
        return (
          `${nombre} debe tener una cantidad mayor a 0`
        );
      }

      if (
        !item.unidad_medida_id
      ) {
        return (
          `${nombre} debe tener una unidad`
        );
      }

      if (
        item.cantidad_presentacion !==
        ''
      ) {
        const presentacion =
          Number(
            item
              .cantidad_presentacion
          );

        if (
          !Number.isFinite(
            presentacion
          ) ||
          presentacion <= 0
        ) {
          return (
            `${nombre} debe tener una presentación mayor a 0`
          );
        }

        if (
          !item
            .unidad_presentacion_id
        ) {
          return (
            `${nombre} debe tener una unidad de presentación`
          );
        }
      }

      const precio =
        Number(
          item.precio_unitario
        );

      if (
        !Number.isFinite(
          precio
        ) ||
        precio <= 0
      ) {
        return (
          `${nombre} debe tener un precio mayor a 0`
        );
      }

      if (
        ![
          'PEN',
          'USD'
        ].includes(
          item.moneda_codigo
        )
      ) {
        return (
          `${nombre} debe tener una moneda válida`
        );
      }
    }

    return null;
  };


  const registrar =
    async () => {
      const error =
        validar();

      if (error) {
        message.error(
          error
        );
        return;
      }

      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        const data =
          await apiFetch(
            '/pedidos',
            {
              method: 'POST',

              body:
                JSON.stringify({
                  cliente_id:
                    clienteId,

                  codigo_pedido:
                    codigoPedido
                      .trim() ||
                    null,

                  fecha_pedido:
                    fechaPedido
                      ? fechaPedido
                          .format(
                            'YYYY-MM-DD'
                          )
                      : undefined,

                  fecha_entrega_estimada:
                    fechaEntrega
                      ? fechaEntrega
                          .format(
                            'YYYY-MM-DD'
                          )
                      : null,

                  descripcion_pedido:
                    descripcion
                      .trim(),

                  detalles:
                    detalles.map(
                      (item) => ({
                        tipo_producto_id:
                          Number(
                            item
                              .tipo_producto_id
                          ),

                        medida_id:
                          Number(
                            item
                              .medida_id
                          ),

                        color_id:
                          Number(
                            item
                              .color_id
                          ),

                        material_id:
                          Number(
                            item
                              .material_id
                          ),

                        cantidad_pedida:
                          Number(
                            item
                              .cantidad_pedida
                          ),

                        unidad_medida_id:
                          Number(
                            item
                              .unidad_medida_id
                          ),

                        cantidad_presentacion:
                          item
                            .cantidad_presentacion
                            ? Number(
                                item
                                  .cantidad_presentacion
                              )
                            : null,

                        unidad_presentacion_id:
                          item
                            .cantidad_presentacion
                            ? Number(
                                item
                                  .unidad_presentacion_id ||
                                item
                                  .unidad_medida_id
                              )
                            : null,

                        precio_unitario:
                          Number(
                            item
                              .precio_unitario
                          ),

                        moneda_codigo:
                          item
                            .moneda_codigo,

                        descripcion_item:
                          item
                            .descripcion_item
                            .trim(),

                        observacion:
                          item
                            .observacion
                            .trim()
                      })
                    )
                })
            }
          );


        message.success(
          'Pedido registrado correctamente'
        );


        navigate(
          `/gestion/pedidos/${data.pedido.pedido_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el pedido'
        );
      }
    };


  if (
    cargandoBase
  ) {
    return (
      <div className="gd-pedido-page">

        <Skeleton
          active
          paragraph={{
            rows: 12
          }}
        />

      </div>
    );
  }


  return (
    <div className="gd-pedido-page">

      <BackButton
        to="/gestion/pedidos"
        label="Volver a pedidos"
      />


      <PageHeader
        title="Registrar pedido"
        description="Registra un pedido con uno o varios productos."
      />


      <Card
        title="Datos del pedido"
        className="gd-pedido-section-card"
      >

        <Form
          layout="vertical"
          requiredMark={false}
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              lg={12}
            >
              <Form.Item
                label="Cliente"
                required
              >
                <Select
                  size="large"
                  value={
                    clienteId ||
                    undefined
                  }
                  showSearch
                  optionFilterProp="label"
                  placeholder="Selecciona un cliente"
                  disabled={
                    procesando
                  }
                  options={
                    clientes.map(
                      (cliente) => ({
                        value:
                          cliente
                            .cliente_id,

                        label:
                          `${cliente.razon_social} · ${cliente.ruc}`
                      })
                    )
                  }
                  onChange={
                    setClienteId
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              lg={12}
            >
              <Form.Item
                label="Código de pedido"
                extra="Opcional."
              >
                <Input
                  size="large"
                  value={
                    codigoPedido
                  }
                  maxLength={50}
                  placeholder="Ejemplo: PED-001"
                  disabled={
                    procesando
                  }
                  onChange={(e) =>
                    setCodigoPedido(
                      e.target.value
                    )
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              md={12}
            >
              <Form.Item
                label="Fecha de pedido"
              >
                <DatePicker
                  size="large"
                  value={
                    fechaPedido
                  }
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  placeholder="Hoy si se deja vacío"
                  disabled={
                    procesando
                  }
                  onChange={
                    setFechaPedido
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              md={12}
            >
              <Form.Item
                label="Fecha de entrega estimada"
              >
                <DatePicker
                  size="large"
                  value={
                    fechaEntrega
                  }
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  disabled={
                    procesando
                  }
                  onChange={
                    setFechaEntrega
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
            >
              <Form.Item
                label="Descripción del pedido"
              >
                <TextArea
                  rows={3}
                  maxLength={500}
                  showCount
                  value={
                    descripcion
                  }
                  placeholder="Ejemplo: Pedido para entrega semanal"
                  disabled={
                    procesando
                  }
                  onChange={(e) =>
                    setDescripcion(
                      e.target.value
                    )
                  }
                />
              </Form.Item>
            </Col>

          </Row>

        </Form>

      </Card>


      <PedidoItemsEditor
        detalles={
          detalles
        }
        setDetalles={
          setDetalles
        }
        tipos={tipos}
        medidas={medidas}
        colores={colores}
        materiales={
          materiales
        }
        unidades={
          unidades
        }
        procesando={
          procesando
        }
        onFeedback={
          feedbackEditor
        }
      />


      <div className="gd-pedido-actions">

        <Space
          wrap
        >

          <Button
            onClick={() =>
              navigate(
                '/gestion/pedidos'
              )
            }
            disabled={
              procesando
            }
          >
            Cancelar
          </Button>


          <Button
            type="primary"
            icon={
              <SaveOutlined />
            }
            loading={
              procesando
            }
            onClick={
              registrar
            }
          >
            Guardar pedido
          </Button>

        </Space>

      </div>

    </div>
  );
}


export default RegistrarPedido;


<<<END OF FILE>>>


---

## FILE: src\pages\producciones\ProduccionDetalle.tsx

<<<START OF FILE>>>

import type {
  CollapseProps,
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Card,
  Col,
  Collapse,
  Descriptions,
  Empty,
  Result,
  Row,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  CalendarOutlined,
  DatabaseOutlined,
  InboxOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatCantidad,
  formatPeso
} from '../../utils/formatters';

import '../../styles/produccionesAntd.css';


const {
  Text
} = Typography;


type ConsumoMateriaPrima = {
  movimiento_materia_prima_id:
    number;

  nombre_lote:
    string;

  fecha_compra:
    string;

  material:
    string;

  color:
    string;

  cantidad:
    number;
};


type IngresoProductoTerminado = {
  stock_actual:
    number;
};


type ProduccionDetalleItem = {
  produccion_detalle_id:
    number;

  tipo_producto:
    string;

  material:
    string;

  medida:
    string;

  color:
    string;

  composicion_version:
    number;

  cantidad_producida:
    number;

  unidad:
    string;

  cantidad_presentacion:
    number;

  unidad_presentacion:
    string;

  observacion?:
    string | null;

  consumos_materia_prima:
    ConsumoMateriaPrima[];

  ingreso_producto_terminado:
    IngresoProductoTerminado | null;
};


type Produccion = {
  produccion_id: number;
  fecha_produccion:
    string;

  observacion?:
    string | null;

  registrado_por:
    string;

  detalles:
    ProduccionDetalleItem[];
};


function ProduccionDetalle() {
  const {
    produccion_id
  } = useParams();

  const {
    message
  } = AntdApp.useApp();

  const [
    produccion,
    setProduccion
  ] = useState<
    Produccion | null
  >(null);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          const data =
            await apiFetch(
              `/producciones/${produccion_id}`
            );

          setProduccion(
            data.produccion
          );

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar la producción';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    produccion_id,
    message
  ]);


  const totalProducido =
    useMemo(
      () =>
        (
          produccion
            ?.detalles ||
          []
        ).reduce(
          (
            total,
            item
          ) =>
            total +
            Number(
              item
                .cantidad_producida ||
              0
            ),
          0
        ),
      [
        produccion
      ]
    );


  const fechaTexto = (
    valor?: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return valor.slice(
      0,
      10
    );
  };


  const fifoColumns:
    TableColumnsType<
      ConsumoMateriaPrima
    > = [
    {
      title: 'Lote',
      dataIndex:
        'nombre_lote',
      key:
        'nombre_lote',
      minWidth: 180,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title:
        'Fecha de compra',
      dataIndex:
        'fecha_compra',
      key:
        'fecha_compra',
      width: 145,

      render: (
        value: string
      ) =>
        fechaTexto(
          value
        )
    },

    {
      title: 'Material',
      dataIndex:
        'material',
      key:
        'material',
      width: 150
    },

    {
      title: 'Color',
      dataIndex:
        'color',
      key:
        'color',
      width: 130
    },

    {
      title: 'Consumido',
      dataIndex:
        'cantidad',
      key:
        'cantidad',
      width: 145,

      render: (
        value: number
      ) => (
        <Text
          type="danger"
          strong
        >
          -{
            formatPeso(
              value
            )
          } KG
        </Text>
      )
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-produccion-page">

        <Skeleton
          active
          paragraph={{
            rows: 12
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !produccion
  ) {
    return (
      <div className="gd-produccion-page">

        <BackButton
          to="/gestion/producciones"
          label="Volver a producción"
        />


        <Result
          status="error"
          title="No se pudo cargar la producción"
          subTitle={
            errorCarga ||
            'Producción no encontrada'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-produccion-page">

      <BackButton
        to="/gestion/producciones"
        label="Volver a producción"
      />


      <PageHeader
        title="Detalle de producción"
        description="Productos fabricados, ingreso a almacén y materia prima consumida."
      />


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-produccion-summary"
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >

          <Card
            className="gd-produccion-stat-card"
          >

            <Statistic
              title="Fecha"
              value={
                fechaTexto(
                  produccion
                    .fecha_produccion
                )
              }
              prefix={
                <CalendarOutlined />
              }
            />

          </Card>

        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >

          <Card
            className="gd-produccion-stat-card"
          >

            <Statistic
              title="Productos"
              value={
                produccion
                  .detalles
                  .length
              }
              prefix={
                <InboxOutlined />
              }
            />

          </Card>

        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >

          <Card
            className="gd-produccion-stat-card"
          >

            <Statistic
              title="Total producido"
              value={
                Number(
                  totalProducido
                    .toFixed(2)
                )
              }
              precision={2}
              suffix="KG"
              prefix={
                <DatabaseOutlined />
              }
            />

          </Card>

        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >

          <Card
            className="gd-produccion-stat-card"
          >

            <Statistic
              title="Registrado por"
              value={
                produccion
                  .registrado_por
              }
              prefix={
                <UserOutlined />
              }
            />

          </Card>

        </Col>

      </Row>


      {
        produccion.observacion &&
        (
          <Alert
            type="info"
            showIcon
            message="Observación"
            description={
              produccion
                .observacion
            }
            className="gd-produccion-detail-alert"
          />
        )
      }


      <Space
        direction="vertical"
        size={18}
        className="gd-produccion-products-space"
      >

        {
          produccion
            .detalles
            .map(
              (
                item,
                index
              ) => {
                const presentaciones =
                  Number(
                    item
                      .cantidad_presentacion
                  ) > 0
                    ? (
                        Number(
                          item
                            .cantidad_producida
                        ) /
                        Number(
                          item
                            .cantidad_presentacion
                        )
                      )
                    : 0;


                const collapseItems:
                  CollapseProps['items'] =
                  [
                    {
                      key:
                        'fifo',

                      label:
                        `Consumo FIFO · ${item.consumos_materia_prima.length} movimiento(s)`,

                      children:
                        (
                          <Table<
                            ConsumoMateriaPrima
                          >
                            rowKey="movimiento_materia_prima_id"
                            columns={
                              fifoColumns
                            }
                            dataSource={
                              item
                                .consumos_materia_prima
                            }
                            pagination={
                              false
                            }
                            scroll={{
                              x: 720
                            }}
                            locale={{
                              emptyText:
                                <Empty
                                  image={
                                    Empty
                                      .PRESENTED_IMAGE_SIMPLE
                                  }
                                  description="No se encontraron movimientos FIFO"
                                />
                            }}
                          />
                        )
                    }
                  ];


                return (
                  <Card
                    key={
                      item
                        .produccion_detalle_id
                    }
                    title={
                      `Producto ${index + 1}`
                    }
                    extra={
                      <Tag
                        color="blue"
                      >
                        Composición V{
                          item
                            .composicion_version
                        }
                      </Tag>
                    }
                    className="gd-produccion-detail-product"
                  >

                    <Descriptions
                      column={{
                        xs: 1,
                        sm: 2,
                        lg: 4
                      }}
                      items={[
                        {
                          key:
                            'producto',

                          label:
                            'Producto',

                          span: 4,

                          children:
                            (
                              <Text
                                strong
                              >
                                {
                                  item
                                    .tipo_producto
                                }
                                {' · '}
                                {
                                  item
                                    .material
                                }
                                {' · '}
                                {
                                  item
                                    .medida
                                }
                                {' · '}
                                {
                                  item
                                    .color
                                }
                              </Text>
                            )
                        },

                        {
                          key:
                            'producido',

                          label:
                            'Producido',

                          children:
                            `${formatPeso(item.cantidad_producida)} ${item.unidad}`
                        },

                        {
                          key:
                            'presentacion',

                          label:
                            'Presentación',

                          children:
                            `${formatCantidad(item.cantidad_presentacion)} ${item.unidad_presentacion}`
                        },

                        {
                          key:
                            'presentaciones',

                          label:
                            'Presentaciones',

                          children:
                            formatCantidad(
                              presentaciones
                            )
                        },

                        {
                          key:
                            'stock',

                          label:
                            'Stock PT después',

                          children:
                            (
                              <Text
                                type="success"
                                strong
                              >
                                {
                                  formatPeso(
                                    item
                                      .ingreso_producto_terminado
                                      ?.stock_actual ||
                                    0
                                  )
                                } {
                                  item.unidad
                                }
                              </Text>
                            )
                        }
                      ]}
                    />


                    {
                      item.observacion &&
                      (
                        <Alert
                          type="info"
                          showIcon
                          message="Observación del producto"
                          description={
                            item.observacion
                          }
                          className="gd-produccion-product-note"
                        />
                      )
                    }


                    <Collapse
                      items={
                        collapseItems
                      }
                      className="gd-produccion-fifo-collapse"
                    />

                  </Card>
                );
              }
            )
        }

      </Space>

    </div>
  );
}


export default ProduccionDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\producciones\ProduccionesLista.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Empty,
  Space,
  Table,
  Typography
} from 'antd';

import {
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatPeso
} from '../../utils/formatters';

import '../../styles/produccionesAntd.css';


const {
  Text
} = Typography;


type Produccion = {
  produccion_id: number;
  fecha_produccion: string;
  observacion?: string | null;
  registrado_por: string;
  cantidad_items: number;
  total_producido_kg: number;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function ProduccionesLista() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    producciones,
    setProducciones
  ] = useState<
    Produccion[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarProducciones =
    useCallback(
      async (
        pagina: number
      ) => {
        setCargando(true);

        try {
          const data =
            await apiFetch(
              `/producciones?page=${pagina}&limit=10`
            );

          setProducciones(
            data.producciones ||
            []
          );

          setPaginacion(
            data.paginacion
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar las producciones'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        message
      ]
    );


  useEffect(() => {
    cargarProducciones(
      page
    );
  }, [
    page,
    cargarProducciones
  ]);


  const fechaTexto = (
    valor?: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return valor.slice(
      0,
      10
    );
  };


  const columns:
    TableColumnsType<
      Produccion
    > = [
    {
      title: 'Fecha',
      dataIndex:
        'fecha_produccion',
      key:
        'fecha_produccion',
      width: 130,

      render: (
        value: string
      ) =>
        fechaTexto(
          value
        )
    },

    {
      title:
        'Productos fabricados',
      dataIndex:
        'cantidad_items',
      key:
        'cantidad_items',
      width: 170,

      render: (
        value: number
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title:
        'Total producido',
      dataIndex:
        'total_producido_kg',
      key:
        'total_producido_kg',
      width: 170,

      render: (
        value: number
      ) => (
        <Text strong>
          {
            formatPeso(
              value
            )
          } KG
        </Text>
      )
    },

    {
      title: 'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',
      responsive: [
        'md'
      ],

      render: (
        value?: string | null
      ) =>
        value || '-'
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      responsive: [
        'lg'
      ]
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 145,

      render: (
        _,
        produccion
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/producciones/${produccion.produccion_id}`
            )
          }
        >
          Ver detalle
        </Button>
      )
    }
  ];


  return (
    <div className="gd-produccion-page">

      <PageHeader
        title="Producción"
        description="Consulta los productos fabricados y el consumo de materia prima."
        extra={
          <Space
            wrap
          >

            <Button
              icon={
                <ReloadOutlined />
              }
              loading={
                cargando
              }
              onClick={() =>
                cargarProducciones(
                  page
                )
              }
            >
              Actualizar
            </Button>


            <Button
              type="primary"
              icon={
                <PlusOutlined />
              }
              onClick={() =>
                navigate(
                  '/gestion/producciones/registrar'
                )
              }
            >
              Registrar producción
            </Button>

          </Space>
        }
      />


      <Card
        title="Historial de producción"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } producción(es)
          </Text>
        }
        className="gd-produccion-table-card"
      >

        <Table<Produccion>
          rowKey="produccion_id"
          columns={columns}
          dataSource={
            producciones
          }
          loading={
            cargando
          }
          scroll={{
            x: 760
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="Todavía no hay producciones registradas"
              />
          }}
          pagination={{
            current:
              paginacion.page,
            pageSize:
              paginacion.limit,
            total:
              paginacion.total,
            showSizeChanger:
              false,
            showTotal: (
              total
            ) =>
              `${total} producción(es)`,

            onChange: (
              nuevaPagina
            ) => {
              setPage(
                nuevaPagina
              );
            }
          }}
        />

      </Card>

    </div>
  );
}


export default ProduccionesLista;


<<<END OF FILE>>>


---

## FILE: src\pages\producciones\RegistrarProduccion.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Progress,
  Row,
  Select,
  Skeleton,
  Space,
  Tag,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined
} from '@ant-design/icons';

import dayjs, {
  Dayjs
} from 'dayjs';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatCantidad,
  formatPeso
} from '../../utils/formatters';

import '../../styles/produccionesAntd.css';


const {
  Text,
  Title
} = Typography;

const {
  TextArea
} = Input;


type Opcion = {
  id: number;
  nombre: string;
};


type OpcionesProducto = {
  tipos: Opcion[];
  materiales: Opcion[];
  medidas: Opcion[];
  colores: Opcion[];
};


type Componente = {
  producto_composicion_detalle_id:
    number;

  material:
    string;

  color:
    string;

  porcentaje:
    number;
};


type Composicion = {
  producto_composicion_id:
    number;

  version_numero:
    number;

  detalles:
    Componente[];
};


type Producto = {
  producto_id: number;
  tipo_producto: string;
  material: string;
  medida: string;
  color: string;

  composicion_vigente:
    Composicion | null;
};


type DetalleProduccionForm = {
  local_id: string;

  tipo_producto_id:
    number | null;

  material_id:
    number | null;

  medida_id:
    number | null;

  color_id:
    number | null;

  opciones:
    OpcionesProducto;

  producto:
    Producto | null;

  buscandoProducto:
    boolean;

  cantidad_producida:
    number | null;

  cantidad_presentacion:
    number | null;

  observacion:
    string;
};


const nuevaKey = () => {
  if (
    typeof crypto !==
      'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    'produccion',
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join('-');
};


const nuevoLocalId = () => {
  if (
    typeof crypto !==
      'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join('-');
};


const crearDetalle = (
  tipos:
    Opcion[]
): DetalleProduccionForm => ({
  local_id:
    nuevoLocalId(),

  tipo_producto_id:
    null,

  material_id:
    null,

  medida_id:
    null,

  color_id:
    null,

  opciones: {
    tipos,
    materiales: [],
    medidas: [],
    colores: []
  },

  producto:
    null,

  buscandoProducto:
    false,

  cantidad_producida:
    null,

  cantidad_presentacion:
    null,

  observacion:
    ''
});


function RegistrarProduccion() {
  const navigate =
    useNavigate();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    fechaProduccion,
    setFechaProduccion
  ] = useState<Dayjs | null>(
    dayjs()
  );

  const [
    observacion,
    setObservacion
  ] = useState('');

  const [
    tiposBase,
    setTiposBase
  ] = useState<Opcion[]>([]);

  const [
    unidadKgId,
    setUnidadKgId
  ] = useState<
    number | null
  >(null);

  const [
    detalles,
    setDetalles
  ] = useState<
    DetalleProduccionForm[]
  >([]);

  const [
    cargandoInicial,
    setCargandoInicial
  ] = useState(true);

  const [
    idempotencyKey
  ] = useState(
    nuevaKey
  );

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar =
      async () => {
        setCargandoInicial(
          true
        );

        try {
          const [
            opcionesData,
            unidadesData
          ] = await Promise.all([
            apiFetch(
              '/productos-terminados/opciones'
            ),

            apiFetch(
              '/catalogos/unidades-medida'
            )
          ]);


          const tipos:
            Opcion[] =
            opcionesData.tipos ||
            [];


          const unidadKg =
            (
              unidadesData.unidades ||
              []
            ).find(
              (item: any) =>
                String(
                  item.codigo
                ).toUpperCase() ===
                'KG'
            );


          if (!unidadKg) {
            throw new Error(
              'No se encontró la unidad KG en el catálogo'
            );
          }


          setTiposBase(
            tipos
          );

          setUnidadKgId(
            Number(
              unidadKg
                .unidad_medida_id
            )
          );

          setDetalles([
            crearDetalle(
              tipos
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos para registrar producción'
          );

        } finally {
          setCargandoInicial(
            false
          );
        }
      };

    cargar();
  }, [
    message
  ]);


  const actualizarDetalle = (
    index: number,
    cambios:
      Partial<
        DetalleProduccionForm
      >
  ) => {
    setDetalles(
      (actuales) =>
        actuales.map(
          (
            detalle,
            i
          ) =>
            i === index
              ? {
                  ...detalle,
                  ...cambios
                }
              : detalle
        )
    );
  };


  const cargarOpciones =
    async (
      params:
        Record<
          string,
          string
        >
    ) => {
      const query =
        new URLSearchParams(
          params
        );

      return apiFetch(
        `/productos-terminados/opciones?${query.toString()}`
      );
    };


  const cambiarTipo =
    async (
      index: number,
      valor:
        number | null
    ) => {
      actualizarDetalle(
        index,
        {
          tipo_producto_id:
            valor,

          material_id:
            null,

          medida_id:
            null,

          color_id:
            null,

          producto:
            null,

          buscandoProducto:
            Boolean(valor),

          opciones: {
            tipos:
              tiposBase,
            materiales: [],
            medidas: [],
            colores: []
          }
        }
      );


      if (!valor) {
        return;
      }


      try {
        const data =
          await cargarOpciones({
            tipo_producto_id:
              String(valor)
          });


        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,

            opciones: {
              tipos:
                tiposBase,

              materiales:
                data.materiales ||
                [],

              medidas: [],
              colores: []
            }
          }
        );

      } catch (error) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false
          }
        );

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar los materiales'
        );
      }
    };


  const cambiarMaterial =
    async (
      index: number,
      valor:
        number | null
    ) => {
      const detalle =
        detalles[index];


      actualizarDetalle(
        index,
        {
          material_id:
            valor,

          medida_id:
            null,

          color_id:
            null,

          producto:
            null,

          buscandoProducto:
            Boolean(valor),

          opciones: {
            ...detalle.opciones,
            medidas: [],
            colores: []
          }
        }
      );


      if (
        !valor ||
        !detalle
          .tipo_producto_id
      ) {
        return;
      }


      try {
        const data =
          await cargarOpciones({
            tipo_producto_id:
              String(
                detalle
                  .tipo_producto_id
              ),

            material_id:
              String(valor)
          });


        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,

            opciones: {
              ...detalle.opciones,

              medidas:
                data.medidas ||
                [],

              colores: []
            }
          }
        );

      } catch (error) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false
          }
        );

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar las medidas'
        );
      }
    };


  const cambiarMedida =
    async (
      index: number,
      valor:
        number | null
    ) => {
      const detalle =
        detalles[index];


      actualizarDetalle(
        index,
        {
          medida_id:
            valor,

          color_id:
            null,

          producto:
            null,

          buscandoProducto:
            Boolean(valor),

          opciones: {
            ...detalle.opciones,
            colores: []
          }
        }
      );


      if (
        !valor ||
        !detalle
          .tipo_producto_id ||
        !detalle.material_id
      ) {
        return;
      }


      try {
        const data =
          await cargarOpciones({
            tipo_producto_id:
              String(
                detalle
                  .tipo_producto_id
              ),

            material_id:
              String(
                detalle.material_id
              ),

            medida_id:
              String(valor)
          });


        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,

            opciones: {
              ...detalle.opciones,

              colores:
                data.colores ||
                []
            }
          }
        );

      } catch (error) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false
          }
        );

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar los colores'
        );
      }
    };


  const cambiarColor =
    async (
      index: number,
      valor:
        number | null
    ) => {
      const detalle =
        detalles[index];


      actualizarDetalle(
        index,
        {
          color_id:
            valor,

          producto:
            null,

          buscandoProducto:
            Boolean(valor)
        }
      );


      if (
        !valor ||
        !detalle
          .tipo_producto_id ||
        !detalle
          .material_id ||
        !detalle
          .medida_id
      ) {
        return;
      }


      try {
        const opcionesData =
          await cargarOpciones({
            tipo_producto_id:
              String(
                detalle
                  .tipo_producto_id
              ),

            material_id:
              String(
                detalle.material_id
              ),

            medida_id:
              String(
                detalle.medida_id
              ),

            color_id:
              String(valor)
          });


        if (
          !opcionesData.producto
            ?.producto_id
        ) {
          actualizarDetalle(
            index,
            {
              buscandoProducto:
                false,

              producto:
                null
            }
          );

          message.warning(
            'No existe un producto terminado con esa selección'
          );

          return;
        }


        const productoData =
          await apiFetch(
            `/productos-terminados/${opcionesData.producto.producto_id}`
          );


        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,

            producto:
              productoData
                .producto
          }
        );

      } catch (error) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,

            producto:
              null
          }
        );

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo cargar el producto'
        );
      }
    };


  const agregarProducto = () => {
    if (
      procesando ||
      detalles.length >= 50
    ) {
      return;
    }

    setDetalles(
      (actuales) => [
        ...actuales,
        crearDetalle(
          tiposBase
        )
      ]
    );
  };


  const quitarProducto = (
    index: number
  ) => {
    if (
      procesando
    ) {
      return;
    }

    if (
      detalles.length ===
      1
    ) {
      message.warning(
        'La producción debe tener al menos un producto'
      );

      return;
    }

    setDetalles(
      (actuales) =>
        actuales.filter(
          (
            _,
            i
          ) =>
            i !== index
        )
    );
  };


  const totalProducido =
    useMemo(
      () =>
        detalles.reduce(
          (
            total,
            detalle
          ) =>
            total +
            Number(
              detalle
                .cantidad_producida ||
              0
            ),
          0
        ),
      [
        detalles
      ]
    );


  const validar = () => {
    if (
      !fechaProduccion
    ) {
      return (
        'La fecha de producción es obligatoria'
      );
    }


    if (
      !unidadKgId
    ) {
      return (
        'No se pudo determinar la unidad KG'
      );
    }


    if (
      detalles.length === 0
    ) {
      return (
        'La producción debe tener al menos un producto'
      );
    }


    for (
      let i = 0;
      i < detalles.length;
      i++
    ) {
      const detalle =
        detalles[i];


      if (
        !detalle.producto
      ) {
        return (
          `Completa la selección del producto ${i + 1}`
        );
      }


      if (
        !detalle.producto
          .composicion_vigente
      ) {
        return (
          `El producto ${i + 1} no tiene una composición vigente`
        );
      }


      const cantidad =
        Number(
          detalle
            .cantidad_producida ||
          0
        );


      const presentacion =
        Number(
          detalle
            .cantidad_presentacion ||
          0
        );


      if (
        cantidad <= 0
      ) {
        return (
          `La cantidad producida del producto ${i + 1} debe ser mayor a 0`
        );
      }


      if (
        presentacion <= 0
      ) {
        return (
          `La presentación del producto ${i + 1} debe ser mayor a 0`
        );
      }


      /*
       * La UI trabaja con 2 decimales.
       * El backend conserva su validación definitiva.
       */
      const cantidadCent =
        Math.round(
          cantidad * 100
        );

      const presentacionCent =
        Math.round(
          presentacion * 100
        );


      if (
        presentacionCent <= 0 ||
        cantidadCent %
          presentacionCent !==
          0
      ) {
        return (
          `La cantidad producida del producto ${i + 1} debe ser múltiplo de su presentación`
        );
      }
    }


    return null;
  };


  const registrar =
    async () => {
      if (
        !intentarBloquear()
      ) {
        return;
      }


      try {
        const data =
          await apiFetch(
            '/producciones',
            {
              method: 'POST',

              headers: {
                'Idempotency-Key':
                  idempotencyKey
              },

              body:
                JSON.stringify({
                  fecha_produccion:
                    fechaProduccion!
                      .format(
                        'YYYY-MM-DD'
                      ),

                  observacion:
                    observacion
                      .trim() ||
                    null,

                  detalles:
                    detalles.map(
                      (
                        detalle
                      ) => ({
                        producto_id:
                          Number(
                            detalle
                              .producto!
                              .producto_id
                          ),

                        cantidad_producida:
                          Number(
                            detalle
                              .cantidad_producida
                          ),

                        cantidad_presentacion:
                          Number(
                            detalle
                              .cantidad_presentacion
                          ),

                        unidad_presentacion_id:
                          unidadKgId,

                        observacion:
                          detalle
                            .observacion
                            .trim() ||
                          null
                      })
                    )
                })
            }
          );


        if (
          data.reutilizada
        ) {
          message.info(
            'La producción ya había sido registrada. Se recuperó el registro existente sin duplicar stock.'
          );

        } else {
          message.success(
            'Producción registrada correctamente'
          );
        }


        navigate(
          `/gestion/producciones/${data.produccion.produccion_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar la producción'
        );
      }
    };


  const solicitarRegistro = () => {
    const error =
      validar();


    if (error) {
      message.error(
        error
      );

      return;
    }


    modal.confirm({
      title:
        'Registrar producción',

      content:
        `Se registrarán ${detalles.length} producto(s) por un total de ${formatPeso(totalProducido)} KG. Esta operación descontará materia prima por FIFO e ingresará el producto terminado al almacén.`,

      okText:
        'Registrar producción',

      cancelText:
        'Cancelar',

      okButtonProps: {
        icon:
          <SaveOutlined />
      },

      onOk:
        registrar
    });
  };


  if (
    cargandoInicial
  ) {
    return (
      <div className="gd-produccion-page">

        <Skeleton
          active
          paragraph={{
            rows: 12
          }}
        />

      </div>
    );
  }


  return (
    <div className="gd-produccion-page">

      <BackButton
        to="/gestion/producciones"
        label="Volver a producción"
      />


      <PageHeader
        title="Registrar producción"
        description="Registra los productos fabricados y el ingreso al almacén de producto terminado."
      />


      <Card
        title="Datos de producción"
        className="gd-produccion-section-card"
      >

        <Form
          layout="vertical"
          requiredMark={false}
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              md={8}
            >

              <Form.Item
                label="Fecha de producción"
                required
              >
                <DatePicker
                  size="large"
                  value={
                    fechaProduccion
                  }
                  onChange={
                    setFechaProduccion
                  }
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  disabled={
                    procesando
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={16}
            >

              <Form.Item
                label="Observación"
              >
                <TextArea
                  rows={3}
                  value={
                    observacion
                  }
                  maxLength={500}
                  showCount
                  placeholder="Observación general de la producción"
                  disabled={
                    procesando
                  }
                  onChange={(e) =>
                    setObservacion(
                      e.target.value
                    )
                  }
                />
              </Form.Item>

            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Productos fabricados"
        extra={
          <Button
            type="primary"
            ghost
            icon={
              <PlusOutlined />
            }
            onClick={
              agregarProducto
            }
            disabled={
              procesando ||
              detalles.length >= 50
            }
          >
            Agregar producto
          </Button>
        }
        className="gd-produccion-section-card"
      >

        <Space
          direction="vertical"
          size={18}
          className="gd-produccion-products-space"
        >

          {
            detalles.map(
              (
                detalle,
                index
              ) => {
                const composicion =
                  detalle.producto
                    ?.composicion_vigente;

                const cantidadProducida =
                  Number(
                    detalle
                      .cantidad_producida ||
                    0
                  );

                const presentacion =
                  Number(
                    detalle
                      .cantidad_presentacion ||
                    0
                  );

                const numeroPresentaciones =
                  cantidadProducida > 0 &&
                  presentacion > 0
                    ? cantidadProducida /
                      presentacion
                    : 0;


                return (
                  <Card
                    key={
                      detalle.local_id
                    }
                    size="small"
                    title={
                      `Producto ${index + 1}`
                    }
                    extra={
                      <Button
                        type="text"
                        danger
                        icon={
                          <DeleteOutlined />
                        }
                        disabled={
                          procesando ||
                          detalles.length ===
                            1
                        }
                        onClick={() =>
                          quitarProducto(
                            index
                          )
                        }
                      >
                        Quitar
                      </Button>
                    }
                    className="gd-produccion-product-card"
                  >

                    <Form
                      layout="vertical"
                      requiredMark={false}
                    >

                      <Row
                        gutter={[
                          14,
                          0
                        ]}
                      >

                        <Col
                          xs={24}
                          sm={12}
                          xl={6}
                        >

                          <Form.Item
                            label="Tipo"
                            required
                          >
                            <Select
                              value={
                                detalle
                                  .tipo_producto_id
                              }
                              placeholder="Selecciona el tipo"
                              showSearch
                              optionFilterProp="label"
                              loading={
                                detalle
                                  .buscandoProducto
                              }
                              disabled={
                                procesando
                              }
                              options={
                                detalle
                                  .opciones
                                  .tipos
                                  .map(
                                    (
                                      item
                                    ) => ({
                                      value:
                                        item.id,
                                      label:
                                        item.nombre
                                    })
                                  )
                              }
                              onChange={(
                                value
                              ) =>
                                cambiarTipo(
                                  index,
                                  value
                                )
                              }
                              allowClear
                            />
                          </Form.Item>

                        </Col>


                        <Col
                          xs={24}
                          sm={12}
                          xl={6}
                        >

                          <Form.Item
                            label="Material"
                            required
                          >
                            <Select
                              value={
                                detalle
                                  .material_id
                              }
                              placeholder="Selecciona el material"
                              showSearch
                              optionFilterProp="label"
                              disabled={
                                procesando ||
                                !detalle
                                  .tipo_producto_id ||
                                detalle
                                  .buscandoProducto
                              }
                              options={
                                detalle
                                  .opciones
                                  .materiales
                                  .map(
                                    (
                                      item
                                    ) => ({
                                      value:
                                        item.id,
                                      label:
                                        item.nombre
                                    })
                                  )
                              }
                              onChange={(
                                value
                              ) =>
                                cambiarMaterial(
                                  index,
                                  value
                                )
                              }
                              allowClear
                            />
                          </Form.Item>

                        </Col>


                        <Col
                          xs={24}
                          sm={12}
                          xl={6}
                        >

                          <Form.Item
                            label="Medida"
                            required
                          >
                            <Select
                              value={
                                detalle
                                  .medida_id
                              }
                              placeholder="Selecciona la medida"
                              showSearch
                              optionFilterProp="label"
                              disabled={
                                procesando ||
                                !detalle
                                  .material_id ||
                                detalle
                                  .buscandoProducto
                              }
                              options={
                                detalle
                                  .opciones
                                  .medidas
                                  .map(
                                    (
                                      item
                                    ) => ({
                                      value:
                                        item.id,
                                      label:
                                        item.nombre
                                    })
                                  )
                              }
                              onChange={(
                                value
                              ) =>
                                cambiarMedida(
                                  index,
                                  value
                                )
                              }
                              allowClear
                            />
                          </Form.Item>

                        </Col>


                        <Col
                          xs={24}
                          sm={12}
                          xl={6}
                        >

                          <Form.Item
                            label="Color"
                            required
                          >
                            <Select
                              value={
                                detalle
                                  .color_id
                              }
                              placeholder="Selecciona el color"
                              showSearch
                              optionFilterProp="label"
                              disabled={
                                procesando ||
                                !detalle
                                  .medida_id ||
                                detalle
                                  .buscandoProducto
                              }
                              options={
                                detalle
                                  .opciones
                                  .colores
                                  .map(
                                    (
                                      item
                                    ) => ({
                                      value:
                                        item.id,
                                      label:
                                        item.nombre
                                    })
                                  )
                              }
                              onChange={(
                                value
                              ) =>
                                cambiarColor(
                                  index,
                                  value
                                )
                              }
                              allowClear
                            />
                          </Form.Item>

                        </Col>

                      </Row>


                      {
                        detalle
                          .buscandoProducto &&
                        (
                          <Alert
                            type="info"
                            showIcon
                            message="Consultando producto..."
                            className="gd-produccion-inline-alert"
                          />
                        )
                      }


                      {
                        detalle.producto &&
                        !composicion &&
                        (
                          <Alert
                            type="warning"
                            showIcon
                            message="Composición pendiente"
                            description="Este producto existe, pero todavía no puede producirse porque no tiene una composición vigente."
                            className="gd-produccion-inline-alert"
                          />
                        )
                      }


                      {
                        composicion &&
                        (
                          <Card
                            size="small"
                            title="Composición vigente"
                            extra={
                              <Space
                                size={6}
                              >

                                <Tag
                                  color="success"
                                >
                                  Lista para producir
                                </Tag>

                                <Tag>
                                  V{
                                    composicion
                                      .version_numero
                                  }
                                </Tag>

                              </Space>
                            }
                            className="gd-produccion-recipe-card"
                          >

                            <Row
                              gutter={[
                                12,
                                12
                              ]}
                            >

                              {
                                composicion
                                  .detalles
                                  .map(
                                    (
                                      componente
                                    ) => {
                                      const requerido =
                                        cantidadProducida >
                                        0
                                          ? (
                                              cantidadProducida *
                                              Number(
                                                componente
                                                  .porcentaje
                                              )
                                            ) /
                                            100
                                          : 0;


                                      return (
                                        <Col
                                          xs={24}
                                          md={12}
                                          key={
                                            componente
                                              .producto_composicion_detalle_id
                                          }
                                        >

                                          <div className="gd-produccion-recipe-item">

                                            <div>
                                              <Text strong>
                                                {
                                                  componente
                                                    .material
                                                }
                                              </Text>

                                              <Text
                                                type="secondary"
                                              >
                                                {
                                                  componente
                                                    .color
                                                }
                                              </Text>
                                            </div>


                                            <div className="gd-produccion-recipe-values">

                                              <Text strong>
                                                {
                                                  formatCantidad(
                                                    componente
                                                      .porcentaje
                                                  )
                                                }%
                                              </Text>

                                              {
                                                cantidadProducida >
                                                  0 &&
                                                (
                                                  <Text
                                                    type="secondary"
                                                  >
                                                    {
                                                      formatPeso(
                                                        requerido
                                                      )
                                                    } KG
                                                  </Text>
                                                )
                                              }

                                            </div>


                                            <Progress
                                              percent={
                                                Number(
                                                  componente
                                                    .porcentaje
                                                )
                                              }
                                              showInfo={
                                                false
                                              }
                                            />

                                          </div>

                                        </Col>
                                      );
                                    }
                                  )
                              }

                            </Row>

                          </Card>
                        )
                      }


                      <Divider />


                      <Row
                        gutter={[
                          14,
                          0
                        ]}
                      >

                        <Col
                          xs={24}
                          md={8}
                        >

                          <Form.Item
                            label="Cantidad producida"
                            required
                          >
                            <InputNumber
                              value={
                                detalle
                                  .cantidad_producida
                              }
                              min={0.01}
                              precision={2}
                              step={0.01}
                              addonAfter="KG"
                              className="gd-full-width"
                              placeholder="0.00"
                              disabled={
                                procesando
                              }
                              onChange={(
                                value
                              ) =>
                                actualizarDetalle(
                                  index,
                                  {
                                    cantidad_producida:
                                      value
                                  }
                                )
                              }
                            />
                          </Form.Item>

                        </Col>


                        <Col
                          xs={24}
                          md={8}
                        >

                          <Form.Item
                            label="Presentación"
                            required
                            extra={
                              numeroPresentaciones >
                              0
                                ? `${formatCantidad(numeroPresentaciones)} presentación(es)`
                                : undefined
                            }
                          >
                            <InputNumber
                              value={
                                detalle
                                  .cantidad_presentacion
                              }
                              min={0.01}
                              precision={2}
                              step={0.01}
                              addonAfter="KG"
                              className="gd-full-width"
                              placeholder="0.00"
                              disabled={
                                procesando
                              }
                              onChange={(
                                value
                              ) =>
                                actualizarDetalle(
                                  index,
                                  {
                                    cantidad_presentacion:
                                      value
                                  }
                                )
                              }
                            />
                          </Form.Item>

                        </Col>


                        <Col
                          xs={24}
                          md={8}
                        >

                          <Form.Item
                            label="Observación del producto"
                          >
                            <Input
                              value={
                                detalle
                                  .observacion
                              }
                              maxLength={300}
                              placeholder="Opcional"
                              disabled={
                                procesando
                              }
                              onChange={(e) =>
                                actualizarDetalle(
                                  index,
                                  {
                                    observacion:
                                      e.target.value
                                  }
                                )
                              }
                            />
                          </Form.Item>

                        </Col>

                      </Row>

                    </Form>

                  </Card>
                );
              }
            )
          }

        </Space>

      </Card>


      <Card
        className="gd-produccion-total-card"
      >

        <div className="gd-produccion-total">

          <div>

            <Title
              level={5}
              className="gd-produccion-total-title"
            >
              Total de producción
            </Title>

            <Text
              type="secondary"
            >
              {
                detalles.length
              } producto(s)
            </Text>

          </div>


          <Text
            strong
            className="gd-produccion-total-value"
          >
            {
              formatPeso(
                totalProducido
              )
            } KG
          </Text>

        </div>

      </Card>


      <div className="gd-produccion-actions">

        <Space
          wrap
        >

          <Button
            onClick={() =>
              navigate(
                '/gestion/producciones'
              )
            }
            disabled={
              procesando
            }
          >
            Cancelar
          </Button>


          <Button
            type="primary"
            icon={
              <SaveOutlined />
            }
            loading={
              procesando
            }
            disabled={
              cargandoInicial
            }
            onClick={
              solicitarRegistro
            }
          >
            Registrar producción
          </Button>

        </Space>

      </div>

    </div>
  );
}


export default RegistrarProduccion;


<<<END OF FILE>>>


---

## FILE: src\pages\Productos.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

function Productos() {
  const [productos, setProductos] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [medidas, setMedidas] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState({
    codigo_producto: '',
    tipo_producto_id: '',
    medida_id: '',
    color_id: '',
    material_id: '',
    peso_total_kg: '',
    presentacion: '',
    descripcion: ''
  });

  const cargarProductos = async () => {
    const data = await apiFetch('/productos');
    setProductos(data.productos);
  };

  const cargarCatalogos = async () => {
    const [tiposData, medidasData, coloresData, materialesData] = await Promise.all([
      apiFetch('/catalogos/tiposProducto'),
      apiFetch('/catalogos/medidas'),
      apiFetch('/catalogos/colores'),
      apiFetch('/catalogos/materiales')
    ]);

    setTipos(tiposData.items);
    setMedidas(medidasData.items);
    setColores(coloresData.items);
    setMateriales(materialesData.items);
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        await cargarCatalogos();
        await cargarProductos();
      } catch (error: any) {
        setError(error.message);
      }
    };

    cargarDatos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registrarProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await apiFetch('/productos', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          tipo_producto_id: Number(form.tipo_producto_id),
          medida_id: Number(form.medida_id),
          color_id: Number(form.color_id),
          material_id: Number(form.material_id),
          peso_total_kg: Number(form.peso_total_kg)
        })
      });

      setMensaje('Producto registrado correctamente');

      setForm({
        codigo_producto: '',
        tipo_producto_id: '',
        medida_id: '',
        color_id: '',
        material_id: '',
        peso_total_kg: '',
        presentacion: '',
        descripcion: ''
      });

      cargarProductos();

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Productos</h1>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card" onSubmit={registrarProducto}>
        <h3>Registrar producto</h3>

        <input
          name="codigo_producto"
          placeholder="Código del producto"
          value={form.codigo_producto}
          onChange={handleChange}
        />

        <select name="tipo_producto_id" value={form.tipo_producto_id} onChange={handleChange}>
          <option value="">Seleccione tipo</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
          ))}
        </select>

        <select name="medida_id" value={form.medida_id} onChange={handleChange}>
          <option value="">Seleccione medida</option>
          {medidas.map((medida) => (
            <option key={medida.id} value={medida.id}>{medida.nombre}</option>
          ))}
        </select>

        <select name="color_id" value={form.color_id} onChange={handleChange}>
          <option value="">Seleccione color</option>
          {colores.map((color) => (
            <option key={color.id} value={color.id}>{color.nombre}</option>
          ))}
        </select>

        <select name="material_id" value={form.material_id} onChange={handleChange}>
          <option value="">Seleccione material</option>
          {materiales.map((material) => (
            <option key={material.id} value={material.id}>{material.nombre}</option>
          ))}
        </select>

        <input
          name="peso_total_kg"
          type="number"
          placeholder="Peso total KG"
          value={form.peso_total_kg}
          onChange={handleChange}
        />

        <input
          name="presentacion"
          placeholder="Presentación, ejemplo: ROLLOS DE 10KG"
          value={form.presentacion}
          onChange={handleChange}
        />

        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <button type="submit">Guardar producto</button>
      </form>

      <div className="tabla-card">
        <h3>Listado de productos</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Tipo</th>
              <th>Medida</th>
              <th>Color</th>
              <th>Material</th>
              <th>Peso</th>
              <th>Presentación</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.producto_id}>
                <td>{producto.producto_id}</td>
                <td>{producto.codigo_producto}</td>
                <td>{producto.tipo_producto}</td>
                <td>{producto.medida}</td>
                <td>{producto.color}</td>
                <td>{producto.material}</td>
                <td>{producto.peso_total_kg}</td>
                <td>{producto.presentacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Productos;

<<<END OF FILE>>>


---

## FILE: src\pages\productosTerminados\ProductosTerminadosLista.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/productosTerminadosAntd.css';


const {
  Text
} = Typography;


type CatalogoItem = {
  id: number;
  nombre: string;
};


type ProductoTerminado = {
  producto_id: number;
  codigo_producto?: string | null;

  tipo_producto_id: number;
  tipo_producto: string;

  material_id: number;
  material: string;

  medida_id: number;
  medida: string;

  color_id: number;
  color: string;

  descripcion?: string | null;

  estado_composicion:
    | 'CONFIGURADO'
    | 'SIN_COMPOSICION';

  composicion_version?: number | null;
  componentes_composicion?: number;
};


type Filtros = {
  q?: string;
  tipo_producto_id?: number;
  material_id?: number;
  medida_id?: number;
  color_id?: number;
  estado_composicion:
    | 'TODOS'
    | 'CONFIGURADO'
    | 'SIN_COMPOSICION';
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const filtrosVacios:
  Filtros = {
  q: '',
  tipo_producto_id:
    undefined,
  material_id:
    undefined,
  medida_id:
    undefined,
  color_id:
    undefined,
  estado_composicion:
    'TODOS'
};


function ProductosTerminadosLista() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    Filtros
  >();

  const [
    productos,
    setProductos
  ] = useState<
    ProductoTerminado[]
  >([]);

  const [
    tipos,
    setTipos
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    materiales,
    setMateriales
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    medidas,
    setMedidas
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    colores,
    setColores
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    page,
    setPage
  ] = useState(1);

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<Filtros>({
    ...filtrosVacios
  });

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  const cargarCatalogos =
    useCallback(
      async () => {
        const [
          tiposData,
          materialesData,
          medidasData,
          coloresData
        ] = await Promise.all([
          apiFetch(
            '/catalogos/tiposProducto'
          ),
          apiFetch(
            '/catalogos/materiales'
          ),
          apiFetch(
            '/catalogos/medidas'
          ),
          apiFetch(
            '/catalogos/colores'
          )
        ]);

        setTipos(
          tiposData.items ||
          []
        );

        setMateriales(
          materialesData.items ||
          []
        );

        setMedidas(
          medidasData.items ||
          []
        );

        setColores(
          coloresData.items ||
          []
        );
      },
      []
    );


  const cargarProductos =
    useCallback(
      async (
        pagina: number,
        filtros:
          Filtros
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(pagina)
        );

        params.set(
          'limit',
          '10'
        );

        params.set(
          'estado_composicion',
          filtros
            .estado_composicion ||
          'TODOS'
        );

        if (
          filtros.q?.trim()
        ) {
          params.set(
            'q',
            filtros.q.trim()
          );
        }

        if (
          filtros.tipo_producto_id
        ) {
          params.set(
            'tipo_producto_id',
            String(
              filtros
                .tipo_producto_id
            )
          );
        }

        if (
          filtros.material_id
        ) {
          params.set(
            'material_id',
            String(
              filtros
                .material_id
            )
          );
        }

        if (
          filtros.medida_id
        ) {
          params.set(
            'medida_id',
            String(
              filtros.medida_id
            )
          );
        }

        if (
          filtros.color_id
        ) {
          params.set(
            'color_id',
            String(
              filtros.color_id
            )
          );
        }

        const data =
          await apiFetch(
            `/productos-terminados?${params.toString()}`
          );

        setProductos(
          data.productos ||
          []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  const cargarTodo =
    useCallback(
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarCatalogos(),
            cargarProductos(
              page,
              filtrosAplicados
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los productos terminados'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarCatalogos,
        cargarProductos,
        filtrosAplicados,
        message,
        page
      ]
    );


  useEffect(() => {
    cargarTodo();
  }, [
    cargarTodo
  ]);


  const aplicarFiltros =
    (
      values:
        Filtros
    ) => {
      setPage(1);

      setFiltrosAplicados({
        q:
          values.q?.trim() ||
          '',

        tipo_producto_id:
          values
            .tipo_producto_id,

        material_id:
          values.material_id,

        medida_id:
          values.medida_id,

        color_id:
          values.color_id,

        estado_composicion:
          values
            .estado_composicion ||
          'TODOS'
      });
    };


  const limpiarFiltros =
    () => {
      form.resetFields();

      form.setFieldsValue({
        estado_composicion:
          'TODOS'
      });

      setPage(1);

      setFiltrosAplicados({
        ...filtrosVacios
      });
    };


  const columns:
    TableColumnsType<
      ProductoTerminado
    > = [
    {
      title: 'Producto',
      key: 'producto',
      minWidth: 210,

      render: (
        _,
        producto
      ) => (
        <div className="gd-pt-producto-cell">

          <Text strong>
            {
              producto
                .tipo_producto
            }
          </Text>

          <Text
            type="secondary"
          >
            {
              producto.material
            }
          </Text>

        </div>
      )
    },

    {
      title: 'Medida',
      dataIndex: 'medida',
      key: 'medida',
      width: 130
    },

    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      width: 130
    },

    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      responsive: [
        'lg'
      ],

      render: (
        value?: string | null
      ) =>
        value || '-'
    },

    {
      title: 'Composición',
      key: 'composicion',
      width: 190,

      render: (
        _,
        producto
      ) =>
        producto
          .estado_composicion ===
        'CONFIGURADO'
          ? (
              <Space
                size={6}
                wrap
              >
                <Tag
                  color="success"
                >
                  Definida
                </Tag>

                <Text
                  type="secondary"
                >
                  V{
                    producto
                      .composicion_version
                  }
                </Text>
              </Space>
            )
          : (
              <Tag
                color="warning"
              >
                Pendiente
              </Tag>
            )
    },

    {
      title:
        'Materias primas',
      dataIndex:
        'componentes_composicion',
      key:
        'componentes_composicion',
      width: 140,
      responsive: [
        'md'
      ],

      render: (
        value?: number
      ) =>
        Number(
          value || 0
        )
    },

    {
      title: 'Acción',
      key: 'accion',
      fixed: 'right',
      width: 140,

      render: (
        _,
        producto
      ) => (
        <Button
          type="link"
          icon={
            <EyeOutlined />
          }
          onClick={() =>
            navigate(
              `/gestion/productos-terminados/${producto.producto_id}`
            )
          }
        >
          Ver producto
        </Button>
      )
    }
  ];


  return (
    <div className="gd-pt-page">

      <PageHeader
        title="Productos terminados"
        description="Administra los productos que se fabrican y su composición de materia prima."
        extra={
          <Button
            type="primary"
            icon={
              <PlusOutlined />
            }
            onClick={() =>
              navigate(
                '/gestion/productos-terminados/registrar'
              )
            }
          >
            Registrar producto
          </Button>
        }
      />


      <Card
        title="Filtros"
        className="gd-pt-filter-card"
      >

        <Form<Filtros>
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={{
            estado_composicion:
              'TODOS'
          }}
          onFinish={
            aplicarFiltros
          }
        >

          <Row
            gutter={[
              14,
              0
            ]}
            align="bottom"
          >

            <Col
              xs={24}
              lg={8}
              xl={7}
            >

              <Form.Item
                label="Buscar"
                name="q"
              >
                <Input
                  allowClear
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Tipo, material, medida o color"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={4}
            >

              <Form.Item
                label="Tipo"
                name="tipo_producto_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos"
                  options={
                    tipos.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={4}
            >

              <Form.Item
                label="Material"
                name="material_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos"
                  options={
                    materiales.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={4}
            >

              <Form.Item
                label="Medida"
                name="medida_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todas"
                  options={
                    medidas.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={4}
            >

              <Form.Item
                label="Color"
                name="color_id"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  placeholder="Todos"
                  options={
                    colores.map(
                      (item) => ({
                        value:
                          item.id,
                        label:
                          item.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              sm={12}
              lg={6}
              xl={5}
            >

              <Form.Item
                label="Composición"
                name="estado_composicion"
              >
                <Select
                  options={[
                    {
                      value:
                        'TODOS',
                      label:
                        'Todos'
                    },
                    {
                      value:
                        'CONFIGURADO',
                      label:
                        'Definida'
                    },
                    {
                      value:
                        'SIN_COMPOSICION',
                      label:
                        'Pendiente'
                    }
                  ]}
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={18}
              xl={19}
            >

              <Form.Item
                label=" "
                className="gd-pt-filter-actions-item"
              >

                <Space
                  wrap
                >

                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <SearchOutlined />
                    }
                  >
                    Buscar
                  </Button>


                  <Button
                    onClick={
                      limpiarFiltros
                    }
                  >
                    Limpiar
                  </Button>


                  <Button
                    icon={
                      <ReloadOutlined />
                    }
                    loading={
                      cargando
                    }
                    onClick={
                      cargarTodo
                    }
                  >
                    Actualizar
                  </Button>

                </Space>

              </Form.Item>

            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Listado de productos"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } producto(s)
          </Text>
        }
        className="gd-pt-table-card"
      >

        <Table<
          ProductoTerminado
        >
          rowKey="producto_id"
          columns={columns}
          dataSource={
            productos
          }
          loading={
            cargando
          }
          scroll={{
            x: 900
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay productos para mostrar"
              />
          }}
          pagination={{
            current:
              paginacion.page,
            pageSize:
              paginacion.limit,
            total:
              paginacion.total,
            showSizeChanger:
              false,
            showTotal: (
              total
            ) =>
              `${total} producto(s)`,

            onChange: (
              nuevaPagina
            ) => {
              setPage(
                nuevaPagina
              );
            }
          }}
        />

      </Card>

    </div>
  );
}


export default
  ProductosTerminadosLista;


<<<END OF FILE>>>


---

## FILE: src\pages\productosTerminados\ProductoTerminadoDetalle.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Form,
  Input,
  InputNumber,
  Progress,
  Result,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatNumero
} from '../../utils/formatters';

import '../../styles/productosTerminadosAntd.css';


const {
  Text,
  Title
} = Typography;

const {
  TextArea
} = Input;


type CatalogoItem = {
  id: number;
  nombre: string;
};


type ComponenteForm = {
  material_id: number;
  color_id: number;
  porcentaje: number;
};


type ComposicionForm = {
  observacion?: string;
  componentes:
    ComponenteForm[];
};


type ComposicionDetalle = {
  producto_composicion_detalle_id:
    number;

  material: string;
  color: string;
  porcentaje: number;
};


type Composicion = {
  producto_composicion_id:
    number;

  version_numero: number;
  vigente: boolean;

  fecha_vigencia_desde:
    string | null;

  fecha_vigencia_hasta:
    string | null;

  observacion?:
    string | null;

  creado_por?:
    string | null;

  cantidad_componentes?:
    number;

  detalles?:
    ComposicionDetalle[];
};


type Producto = {
  producto_id: number;

  tipo_producto:
    string;

  material:
    string;

  medida:
    string;

  color:
    string;

  descripcion?:
    string | null;

  creado_por?:
    string | null;

  created_at?:
    string | null;

  composicion_vigente?:
    Composicion | null;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


function ProductoTerminadoDetalle() {
  const {
    producto_id
  } = useParams();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    ComposicionForm
  >();

  const [
    producto,
    setProducto
  ] = useState<
    Producto | null
  >(null);

  const [
    composiciones,
    setComposiciones
  ] = useState<
    Composicion[]
  >([]);

  const [
    materiales,
    setMateriales
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    colores,
    setColores
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');

  const [
    editorAbierto,
    setEditorAbierto
  ] = useState(false);

  const [
    pageHistorial,
    setPageHistorial
  ] = useState(1);

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const cargarProducto =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/productos-terminados/${producto_id}`
          );

        setProducto(
          data.producto
        );
      },
      [
        producto_id
      ]
    );


  const cargarHistorial =
    useCallback(
      async (
        pagina: number
      ) => {
        const data =
          await apiFetch(
            `/productos-terminados/${producto_id}/composiciones?page=${pagina}&limit=10`
          );

        setComposiciones(
          data.composiciones ||
          []
        );

        setPaginacion(
          data.paginacion
        );
      },
      [
        producto_id
      ]
    );


  const cargarCatalogos =
    useCallback(
      async () => {
        const [
          materialesData,
          coloresData
        ] = await Promise.all([
          apiFetch(
            '/catalogos/materiales'
          ),

          apiFetch(
            '/catalogos/colores'
          )
        ]);

        setMateriales(
          materialesData.items ||
          []
        );

        setColores(
          coloresData.items ||
          []
        );
      },
      []
    );


  const cargarInicial =
    useCallback(
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await Promise.all([
            cargarProducto(),
            cargarHistorial(
              pageHistorial
            ),
            cargarCatalogos()
          ]);

        } catch (error) {
          setErrorCarga(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el producto terminado'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        cargarCatalogos,
        cargarHistorial,
        cargarProducto,
        pageHistorial
      ]
    );


  useEffect(() => {
    cargarInicial();
  }, [
    cargarInicial
  ]);


  const componentesForm =
    Form.useWatch(
      'componentes',
      form
    ) || [];


  const totalPorcentaje =
    useMemo(
      () =>
        componentesForm.reduce(
          (
            total,
            componente
          ) =>
            total +
            Number(
              componente
                ?.porcentaje ||
              0
            ),
          0
        ),
      [
        componentesForm
      ]
    );


  const abrirEditor = () => {
    form.setFieldsValue({
      observacion: '',
      componentes: [
        {
          material_id:
            undefined as unknown as number,

          color_id:
            undefined as unknown as number,

          porcentaje:
            undefined as unknown as number
        }
      ]
    });

    setEditorAbierto(
      true
    );
  };


  const cerrarEditor = () => {
    if (procesando) {
      return;
    }

    form.resetFields();

    setEditorAbierto(
      false
    );
  };


  const validarComposicion = (
    values:
      ComposicionForm
  ) => {
    const usados =
      new Set<string>();

    for (
      let i = 0;
      i <
      values.componentes.length;
      i++
    ) {
      const componente =
        values.componentes[i];

      const clave =
        `${componente.material_id}-${componente.color_id}`;

      if (
        usados.has(
          clave
        )
      ) {
        return (
          `La materia prima ${i + 1} repite el mismo material y color`
        );
      }

      usados.add(
        clave
      );
    }

    const total =
      values.componentes
        .reduce(
          (
            acumulado,
            componente
          ) =>
            acumulado +
            Number(
              componente
                .porcentaje ||
              0
            ),
          0
        );


    if (
      Math.abs(
        total -
        100
      ) >
      0.000001
    ) {
      return (
        `La composición debe sumar 100.00%. Actualmente suma ${formatNumero(total)}%.`
      );
    }

    return null;
  };


  const publicarComposicion =
    async (
      values:
        ComposicionForm
    ) => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        const data =
          await apiFetch(
            `/productos-terminados/${producto_id}/composiciones`,
            {
              method: 'POST',

              body:
                JSON.stringify({
                  observacion:
                    values
                      .observacion
                      ?.trim() ||
                    null,

                  detalles:
                    values
                      .componentes
                      .map(
                        (
                          componente
                        ) => ({
                          material_id:
                            Number(
                              componente
                                .material_id
                            ),

                          color_id:
                            Number(
                              componente
                                .color_id
                            ),

                          porcentaje:
                            Number(
                              componente
                                .porcentaje
                            )
                        })
                      )
                })
            }
          );


        message.success(
          `Composición versión ${data.composicion.version_numero} publicada correctamente`
        );


        setEditorAbierto(
          false
        );

        form.resetFields();

        setPageHistorial(1);


        await Promise.all([
          cargarProducto(),
          cargarHistorial(1)
        ]);


        liberar();

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo publicar la composición'
        );

        throw error;
      }
    };


  const solicitarPublicacion =
    (
      values:
        ComposicionForm
    ) => {
      const error =
        validarComposicion(
          values
        );

      if (error) {
        message.error(
          error
        );

        return;
      }


      const composicionActual =
        producto
          ?.composicion_vigente;


      modal.confirm({
        title:
          composicionActual
            ? 'Publicar nueva versión'
            : 'Publicar composición',

        content:
          composicionActual
            ? 'La composición vigente pasará al historial y esta nueva versión será utilizada en las próximas producciones.'
            : 'Esta composición quedará vigente y será utilizada al registrar producción.',

        okText:
          'Publicar',

        cancelText:
          'Cancelar',

        onOk: () =>
          publicarComposicion(
            values
          )
      });
    };


  const fechaTexto = (
    valor:
      string | null |
      undefined
  ) => {
    if (!valor) {
      return '-';
    }

    return new Date(
      valor
    ).toLocaleString(
      'es-PE'
    );
  };


  const composicionActual =
    producto
      ?.composicion_vigente ||
    null;


  const historialColumns:
    TableColumnsType<
      Composicion
    > = [
    {
      title: 'Versión',
      dataIndex:
        'version_numero',
      key:
        'version_numero',
      width: 100,

      render: (
        value: number
      ) => (
        <Text strong>
          V{value}
        </Text>
      )
    },

    {
      title: 'Estado',
      dataIndex:
        'vigente',
      key:
        'vigente',
      width: 120,

      render: (
        vigente: boolean
      ) =>
        vigente
          ? (
              <Tag
                color="success"
              >
                Vigente
              </Tag>
            )
          : (
              <Tag>
                Histórica
              </Tag>
            )
    },

    {
      title:
        'Vigente desde',
      dataIndex:
        'fecha_vigencia_desde',
      key:
        'fecha_vigencia_desde',
      width: 180,

      render: (
        value:
          string | null
      ) =>
        fechaTexto(
          value
        )
    },

    {
      title:
        'Vigente hasta',
      dataIndex:
        'fecha_vigencia_hasta',
      key:
        'fecha_vigencia_hasta',
      width: 180,
      responsive: [
        'lg'
      ],

      render: (
        value:
          string | null
      ) =>
        fechaTexto(
          value
        )
    },

    {
      title:
        'Materias primas',
      dataIndex:
        'cantidad_componentes',
      key:
        'cantidad_componentes',
      width: 140
    },

    {
      title:
        'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',
      responsive: [
        'md'
      ],

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    }
  ];


  if (cargando) {
    return (
      <div className="gd-pt-page">

        <Skeleton
          active
          paragraph={{
            rows: 10
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !producto
  ) {
    return (
      <div className="gd-pt-page">

        <BackButton
          to="/gestion/productos-terminados"
          label="Volver a productos terminados"
        />


        <Result
          status="error"
          title="No se pudo cargar el producto"
          subTitle={
            errorCarga ||
            'Producto no encontrado'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-pt-page">

      <BackButton
        to="/gestion/productos-terminados"
        label="Volver a productos terminados"
      />


      <PageHeader
        title={
          `${producto.tipo_producto} · ${producto.material} · ${producto.medida} · ${producto.color}`
        }
        description="Producto terminado y composición de materia prima."
        extra={
          !editorAbierto
            ? (
                <Button
                  type="primary"
                  icon={
                    <PlusOutlined />
                  }
                  onClick={
                    abrirEditor
                  }
                >
                  {
                    composicionActual
                      ? 'Nueva versión de composición'
                      : 'Definir composición'
                  }
                </Button>
              )
            : undefined
        }
      />


      <Card
        title="Identidad del producto"
        className="gd-pt-detail-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 4
          }}
          items={[
            {
              key: 'tipo',
              label: 'Tipo',
              children:
                producto
                  .tipo_producto
            },

            {
              key: 'material',
              label: 'Material',
              children:
                producto.material
            },

            {
              key: 'medida',
              label: 'Medida',
              children:
                producto.medida
            },

            {
              key: 'color',
              label: 'Color',
              children:
                producto.color
            },

            {
              key: 'descripcion',
              label: 'Descripción',
              span: 4,
              children:
                producto
                  .descripcion ||
                '-'
            }
          ]}
        />

      </Card>


      {
        composicionActual
          ? (
              <Card
                title="Composición vigente"
                extra={
                  <Tag
                    color="success"
                  >
                    V{
                      composicionActual
                        .version_numero
                    }
                  </Tag>
                }
                className="gd-pt-detail-card"
              >

                <div className="gd-pt-composition-meta">

                  <Text
                    type="secondary"
                  >
                    Vigente desde {
                      fechaTexto(
                        composicionActual
                          .fecha_vigencia_desde
                      )
                    }
                  </Text>

                  <Text strong>
                    Total 100.00%
                  </Text>

                </div>


                <Row
                  gutter={[
                    14,
                    14
                  ]}
                >

                  {
                    (
                      composicionActual
                        .detalles ||
                      []
                    ).map(
                      (
                        componente
                      ) => (
                        <Col
                          xs={24}
                          md={12}
                          key={
                            componente
                              .producto_composicion_detalle_id
                          }
                        >

                          <Card
                            size="small"
                            className="gd-pt-component-card"
                          >

                            <div className="gd-pt-component-head">

                              <div>
                                <Text strong>
                                  {
                                    componente.material
                                  }
                                </Text>

                                <Text
                                  type="secondary"
                                >
                                  {
                                    componente.color
                                  }
                                </Text>
                              </div>

                              <Text strong>
                                {
                                  formatNumero(
                                    componente
                                      .porcentaje
                                  )
                                }%
                              </Text>

                            </div>


                            <Progress
                              percent={
                                Number(
                                  componente
                                    .porcentaje
                                )
                              }
                              showInfo={
                                false
                              }
                            />

                          </Card>

                        </Col>
                      )
                    )
                  }

                </Row>


                {
                  composicionActual
                    .observacion &&
                  (
                    <Alert
                      type="info"
                      showIcon
                      message="Observación"
                      description={
                        composicionActual
                          .observacion
                      }
                      className="gd-pt-composition-note"
                    />
                  )
                }

              </Card>
            )
          : (
              <Alert
                type="warning"
                showIcon
                message="Composición pendiente"
                description="Este producto todavía no tiene definida la materia prima que consume. Debe configurarse antes de registrar producción."
                className="gd-pt-detail-card"
              />
            )
      }


      {
        editorAbierto &&
        (
          <Card
            title={
              composicionActual
                ? 'Nueva versión de composición'
                : 'Definir composición'
            }
            extra={
              <Tag
                color={
                  Math.abs(
                    totalPorcentaje -
                    100
                  ) <=
                  0.000001
                    ? 'success'
                    : 'warning'
                }
              >
                Total {
                  formatNumero(
                    totalPorcentaje
                  )
                }%
              </Tag>
            }
            className="gd-pt-detail-card"
          >

            <Form<
              ComposicionForm
            >
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={
                solicitarPublicacion
              }
              disabled={
                procesando
              }
              initialValues={{
                observacion: '',
                componentes: [
                  {}
                ]
              }}
            >

              <Alert
                type="info"
                showIcon
                message="La composición debe sumar exactamente 100.00%."
                className="gd-pt-editor-rule"
              />


              <Form.List
                name="componentes"
              >
                {(
                  fields,
                  {
                    add,
                    remove
                  }
                ) => (
                  <Space
                    direction="vertical"
                    size={14}
                    className="gd-pt-list-space"
                  >

                    {
                      fields.map(
                        (
                          field,
                          index
                        ) => (
                          <Card
                            size="small"
                            title={
                              `Materia prima ${index + 1}`
                            }
                            key={
                              field.key
                            }
                            extra={
                              <Button
                                type="text"
                                danger
                                icon={
                                  <DeleteOutlined />
                                }
                                disabled={
                                  fields.length ===
                                    1 ||
                                  procesando
                                }
                                onClick={() =>
                                  remove(
                                    field.name
                                  )
                                }
                              >
                                Quitar
                              </Button>
                            }
                          >

                            <Row
                              gutter={[
                                14,
                                0
                              ]}
                            >

                              <Col
                                xs={24}
                                md={9}
                              >

                                <Form.Item
                                  label="Material"
                                  name={[
                                    field.name,
                                    'material_id'
                                  ]}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Selecciona el material'
                                    }
                                  ]}
                                >
                                  <Select
                                    showSearch
                                    optionFilterProp="label"
                                    placeholder="Selecciona el material"
                                    options={
                                      materiales.map(
                                        (item) => ({
                                          value:
                                            item.id,
                                          label:
                                            item.nombre
                                        })
                                      )
                                    }
                                  />
                                </Form.Item>

                              </Col>


                              <Col
                                xs={24}
                                md={9}
                              >

                                <Form.Item
                                  label="Color"
                                  name={[
                                    field.name,
                                    'color_id'
                                  ]}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Selecciona el color'
                                    }
                                  ]}
                                >
                                  <Select
                                    showSearch
                                    optionFilterProp="label"
                                    placeholder="Selecciona el color"
                                    options={
                                      colores.map(
                                        (item) => ({
                                          value:
                                            item.id,
                                          label:
                                            item.nombre
                                        })
                                      )
                                    }
                                  />
                                </Form.Item>

                              </Col>


                              <Col
                                xs={24}
                                md={6}
                              >

                                <Form.Item
                                  label="Porcentaje"
                                  name={[
                                    field.name,
                                    'porcentaje'
                                  ]}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Ingresa el porcentaje'
                                    }
                                  ]}
                                >
                                  <InputNumber
                                    min={0.01}
                                    max={100}
                                    precision={2}
                                    step={0.01}
                                    addonAfter="%"
                                    className="gd-full-width"
                                    placeholder="0.00"
                                  />
                                </Form.Item>

                              </Col>

                            </Row>

                          </Card>
                        )
                      )
                    }


                    <Button
                      block
                      type="dashed"
                      icon={
                        <PlusOutlined />
                      }
                      onClick={() =>
                        add({})
                      }
                      disabled={
                        procesando
                      }
                    >
                      Agregar materia prima
                    </Button>

                  </Space>
                )}
              </Form.List>


              <Form.Item
                label="Observación de esta versión"
                name="observacion"
                rules={[
                  {
                    max: 400,
                    message:
                      'La observación no puede superar 400 caracteres'
                  }
                ]}
                className="gd-pt-editor-observation"
              >
                <TextArea
                  rows={3}
                  maxLength={400}
                  showCount
                  placeholder="Ejemplo: Ajuste de fórmula por cambio de producción"
                />
              </Form.Item>


              <div className="gd-pt-form-actions">

                <Space
                  wrap
                >

                  <Button
                    onClick={
                      cerrarEditor
                    }
                    disabled={
                      procesando
                    }
                  >
                    Cancelar
                  </Button>


                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <SaveOutlined />
                    }
                    loading={
                      procesando
                    }
                  >
                    Revisar y publicar
                  </Button>

                </Space>

              </div>

            </Form>

          </Card>
        )
      }


      <Card
        title="Historial de composiciones"
        extra={
          <Text
            type="secondary"
          >
            {
              paginacion.total
            } versión(es)
          </Text>
        }
        className="gd-pt-detail-card"
      >

        <Table<Composicion>
          rowKey="producto_composicion_id"
          columns={
            historialColumns
          }
          dataSource={
            composiciones
          }
          scroll={{
            x: 780
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="Este producto todavía no tiene historial de composiciones"
              />
          }}
          pagination={{
            current:
              paginacion.page,
            pageSize:
              paginacion.limit,
            total:
              paginacion.total,
            showSizeChanger:
              false,
            showTotal: (
              total
            ) =>
              `${total} versión(es)`,

            onChange: (
              nuevaPagina
            ) => {
              setPageHistorial(
                nuevaPagina
              );
            }
          }}
        />

      </Card>

    </div>
  );
}


export default
  ProductoTerminadoDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\productosTerminados\RegistrarProductoTerminado.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Space
} from 'antd';

import {
  SaveOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/productosTerminadosAntd.css';


const {
  TextArea
} = Input;


type CatalogoItem = {
  id: number;
  nombre: string;
};


type ProductoForm = {
  tipo_producto_id: number;
  material_id: number;
  medida_id: number;
  color_id: number;
  descripcion?: string;
};


function RegistrarProductoTerminado() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    ProductoForm
  >();

  const [
    tipos,
    setTipos
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    materiales,
    setMateriales
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    medidas,
    setMedidas
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    colores,
    setColores
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    cargandoCatalogos,
    setCargandoCatalogos
  ] = useState(true);

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar =
      async () => {
        setCargandoCatalogos(
          true
        );

        try {
          const [
            tiposData,
            materialesData,
            medidasData,
            coloresData
          ] = await Promise.all([
            apiFetch(
              '/catalogos/tiposProducto'
            ),
            apiFetch(
              '/catalogos/materiales'
            ),
            apiFetch(
              '/catalogos/medidas'
            ),
            apiFetch(
              '/catalogos/colores'
            )
          ]);

          setTipos(
            tiposData.items ||
            []
          );

          setMateriales(
            materialesData.items ||
            []
          );

          setMedidas(
            medidasData.items ||
            []
          );

          setColores(
            coloresData.items ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los catálogos'
          );

        } finally {
          setCargandoCatalogos(
            false
          );
        }
      };

    cargar();
  }, [
    message
  ]);


  const registrarProducto =
    async (
      values:
        ProductoForm
    ) => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        const data =
          await apiFetch(
            '/productos-terminados',
            {
              method: 'POST',

              body:
                JSON.stringify({
                  tipo_producto_id:
                    Number(
                      values
                        .tipo_producto_id
                    ),

                  material_id:
                    Number(
                      values
                        .material_id
                    ),

                  medida_id:
                    Number(
                      values
                        .medida_id
                    ),

                  color_id:
                    Number(
                      values
                        .color_id
                    ),

                  descripcion:
                    values
                      .descripcion
                      ?.trim() ||
                    null
                })
            }
          );


        message.success(
          'Producto terminado registrado correctamente'
        );


        navigate(
          `/gestion/productos-terminados/${data.producto.producto_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el producto terminado'
        );
      }
    };


  return (
    <div className="gd-pt-page">

      <BackButton
        to="/gestion/productos-terminados"
        label="Volver a productos terminados"
      />


      <PageHeader
        title="Registrar producto terminado"
        description="Define el producto que se fabrica. La presentación se registra al ingresar producción."
      />


      <Card
        title="Identidad del producto"
        className="gd-pt-form-card"
      >

        {cargandoCatalogos
          ? (
              <Skeleton
                active
                paragraph={{
                  rows: 5
                }}
              />
            )
          : (
              <Form<ProductoForm>
                form={form}
                layout="vertical"
                requiredMark={false}
                disabled={
                  procesando
                }
                onFinish={
                  registrarProducto
                }
              >

                <Row
                  gutter={[
                    16,
                    0
                  ]}
                >

                  <Col
                    xs={24}
                    md={12}
                  >

                    <Form.Item
                      label="Tipo"
                      name="tipo_producto_id"
                      rules={[
                        {
                          required: true,
                          message:
                            'Selecciona el tipo de producto'
                        }
                      ]}
                    >
                      <Select
                        size="large"
                        showSearch
                        optionFilterProp="label"
                        placeholder="Selecciona el tipo"
                        options={
                          tipos.map(
                            (item) => ({
                              value:
                                item.id,
                              label:
                                item.nombre
                            })
                          )
                        }
                      />
                    </Form.Item>

                  </Col>


                  <Col
                    xs={24}
                    md={12}
                  >

                    <Form.Item
                      label="Material"
                      name="material_id"
                      rules={[
                        {
                          required: true,
                          message:
                            'Selecciona el material'
                        }
                      ]}
                    >
                      <Select
                        size="large"
                        showSearch
                        optionFilterProp="label"
                        placeholder="Selecciona el material"
                        options={
                          materiales.map(
                            (item) => ({
                              value:
                                item.id,
                              label:
                                item.nombre
                            })
                          )
                        }
                      />
                    </Form.Item>

                  </Col>


                  <Col
                    xs={24}
                    md={12}
                  >

                    <Form.Item
                      label="Medida"
                      name="medida_id"
                      rules={[
                        {
                          required: true,
                          message:
                            'Selecciona la medida'
                        }
                      ]}
                    >
                      <Select
                        size="large"
                        showSearch
                        optionFilterProp="label"
                        placeholder="Selecciona la medida"
                        options={
                          medidas.map(
                            (item) => ({
                              value:
                                item.id,
                              label:
                                item.nombre
                            })
                          )
                        }
                      />
                    </Form.Item>

                  </Col>


                  <Col
                    xs={24}
                    md={12}
                  >

                    <Form.Item
                      label="Color"
                      name="color_id"
                      rules={[
                        {
                          required: true,
                          message:
                            'Selecciona el color'
                        }
                      ]}
                    >
                      <Select
                        size="large"
                        showSearch
                        optionFilterProp="label"
                        placeholder="Selecciona el color"
                        options={
                          colores.map(
                            (item) => ({
                              value:
                                item.id,
                              label:
                                item.nombre
                            })
                          )
                        }
                      />
                    </Form.Item>

                  </Col>


                  <Col
                    xs={24}
                  >

                    <Form.Item
                      label="Descripción"
                      name="descripcion"
                      rules={[
                        {
                          max: 300,
                          message:
                            'La descripción no puede superar 300 caracteres'
                        }
                      ]}
                    >
                      <TextArea
                        rows={3}
                        maxLength={300}
                        showCount
                        placeholder="Descripción opcional del producto"
                      />
                    </Form.Item>

                  </Col>

                </Row>


                <div className="gd-pt-form-actions">

                  <Space
                    wrap
                  >

                    <Button
                      onClick={() =>
                        navigate(
                          '/gestion/productos-terminados'
                        )
                      }
                      disabled={
                        procesando
                      }
                    >
                      Cancelar
                    </Button>


                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={
                        <SaveOutlined />
                      }
                      loading={
                        procesando
                      }
                    >
                      Guardar producto
                    </Button>

                  </Space>

                </div>

              </Form>
            )
        }

      </Card>

    </div>
  );
}


export default
  RegistrarProductoTerminado;


<<<END OF FILE>>>


---

## FILE: src\pages\Proveedores.tsx

<<<START OF FILE>>>

import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Row,
  Space,
  Table,
  Typography
} from 'antd';

import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  ShopOutlined,
  SolutionOutlined
} from '@ant-design/icons';

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  apiFetch
} from '../services/api';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import PageHeader
  from '../components/ui/PageHeader';

import '../styles/proveedoresAntd.css';


const {
  Text
} = Typography;


type Proveedor = {
  proveedor_id: number;
  ruc: string;
  razon_social: string;
  direccion?: string | null;
  telefono?: string | null;
  correo?: string | null;
  created_at?: string | null;
};


type ProveedorForm = {
  ruc: string;
  razon_social: string;
  direccion?: string;
  telefono?: string;
  correo?: string;
};


function Proveedores() {
  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    ProveedorForm
  >();

  const [
    proveedores,
    setProveedores
  ] = useState<
    Proveedor[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    busqueda,
    setBusqueda
  ] = useState('');

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const cargarProveedores =
    useCallback(
      async () => {
        setCargando(true);

        try {
          const data =
            await apiFetch(
              '/proveedores'
            );

          setProveedores(
            data.proveedores ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los proveedores'
          );

        } finally {
          setCargando(false);
        }
      },
      [
        message
      ]
    );


  useEffect(() => {
    cargarProveedores();
  }, [
    cargarProveedores
  ]);


  const proveedoresFiltrados =
    useMemo(
      () => {
        const query =
          busqueda
            .trim()
            .toLocaleLowerCase(
              'es-PE'
            );

        if (!query) {
          return proveedores;
        }

        return proveedores.filter(
          (proveedor) =>
            [
              proveedor.ruc,
              proveedor
                .razon_social,
              proveedor.direccion,
              proveedor.telefono,
              proveedor.correo
            ]
              .filter(Boolean)
              .some(
                (valor) =>
                  String(
                    valor
                  )
                    .toLocaleLowerCase(
                      'es-PE'
                    )
                    .includes(
                      query
                    )
              )
        );
      },
      [
        busqueda,
        proveedores
      ]
    );


  const registrarProveedor =
    async (
      values:
        ProveedorForm
    ) => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        await apiFetch(
          '/proveedores',
          {
            method: 'POST',

            body:
              JSON.stringify({
                ruc:
                  values.ruc
                    .trim(),

                razon_social:
                  values
                    .razon_social
                    .trim(),

                direccion:
                  values
                    .direccion
                    ?.trim() ||
                  '',

                telefono:
                  values
                    .telefono
                    ?.trim() ||
                  '',

                correo:
                  values
                    .correo
                    ?.trim() ||
                  ''
              })
          }
        );


        message.success(
          'Proveedor registrado correctamente'
        );


        form.resetFields();

        await cargarProveedores();


        liberar();

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el proveedor'
        );
      }
    };


  const columns:
    TableColumnsType<
      Proveedor
    > = [
    {
      title: 'RUC',
      dataIndex: 'ruc',
      key: 'ruc',
      width: 135,

      render: (
        value: string
      ) => (
        <Text code>
          {value}
        </Text>
      )
    },

    {
      title: 'Razón social',
      dataIndex:
        'razon_social',
      key:
        'razon_social',
      minWidth: 220,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title: 'Dirección',
      dataIndex:
        'direccion',
      key:
        'direccion',
      minWidth: 220,
      responsive: [
        'md'
      ],

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title: 'Teléfono',
      dataIndex:
        'telefono',
      key:
        'telefono',
      width: 150,
      responsive: [
        'lg'
      ],

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title: 'Correo',
      dataIndex:
        'correo',
      key:
        'correo',
      minWidth: 200,
      responsive: [
        'lg'
      ],

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title:
        'Fecha de registro',
      dataIndex:
        'created_at',
      key:
        'created_at',
      width: 150,
      responsive: [
        'xl'
      ],

      render: (
        value?:
          string | null
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    }
  ];


  return (
    <div className="gd-proveedores-page">

      <PageHeader
        title="Proveedores"
        description="Registra y consulta los proveedores utilizados en compras y gastos."
      />


      <Row
        gutter={[
          20,
          20
        ]}
        align="top"
      >

        <Col
          xs={24}
          xl={8}
        >

          <Card
            title="Registrar proveedor"
            className="gd-proveedores-form-card"
          >

            <Form<ProveedorForm>
              form={form}
              layout="vertical"
              requiredMark={false}
              disabled={
                procesando
              }
              onFinish={
                registrarProveedor
              }
              autoComplete="off"
            >

              <Form.Item
                label="RUC"
                name="ruc"
                extra="Debe contener exactamente 11 dígitos."
                normalize={
                  (value) =>
                    typeof value ===
                      'string'
                      ? value.replace(
                          /\D/g,
                          ''
                        )
                      : value
                }
                rules={[
                  {
                    required: true,
                    message:
                      'Ingresa el RUC'
                  },
                  {
                    pattern:
                      /^\d{11}$/,
                    message:
                      'El RUC debe tener 11 dígitos numéricos'
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={
                    <SolutionOutlined />
                  }
                  placeholder="20123456789"
                  maxLength={11}
                  inputMode="numeric"
                />
              </Form.Item>


              <Form.Item
                label="Razón social"
                name="razon_social"
                rules={[
                  {
                    required: true,
                    message:
                      'Ingresa la razón social'
                  },
                  {
                    whitespace: true,
                    message:
                      'Ingresa una razón social válida'
                  },
                  {
                    max: 200,
                    message:
                      'La razón social no puede superar 200 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={
                    <ShopOutlined />
                  }
                  placeholder="Razón social del proveedor"
                  maxLength={200}
                />
              </Form.Item>


              <Form.Item
                label="Dirección"
                name="direccion"
                rules={[
                  {
                    max: 250,
                    message:
                      'La dirección no puede superar 250 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={
                    <EnvironmentOutlined />
                  }
                  placeholder="Dirección"
                  maxLength={250}
                />
              </Form.Item>


              <Form.Item
                label="Teléfono"
                name="telefono"
                rules={[
                  {
                    max: 30,
                    message:
                      'El teléfono no puede superar 30 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={
                    <PhoneOutlined />
                  }
                  placeholder="Teléfono de contacto"
                  maxLength={30}
                  inputMode="tel"
                />
              </Form.Item>


              <Form.Item
                label="Correo"
                name="correo"
                rules={[
                  {
                    type: 'email',
                    message:
                      'Ingresa un correo válido'
                  },
                  {
                    max: 150,
                    message:
                      'El correo no puede superar 150 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={
                    <MailOutlined />
                  }
                  placeholder="proveedor@empresa.com"
                  maxLength={150}
                  inputMode="email"
                />
              </Form.Item>


              <Button
                type="primary"
                htmlType="submit"
                block
                icon={
                  <PlusOutlined />
                }
                loading={
                  procesando
                }
              >
                Guardar proveedor
              </Button>

            </Form>

          </Card>

        </Col>


        <Col
          xs={24}
          xl={16}
        >

          <Card
            title="Listado de proveedores"
            extra={
              <Text
                type="secondary"
              >
                {
                  proveedoresFiltrados
                    .length
                } proveedor(es)
              </Text>
            }
            className="gd-proveedores-table-card"
          >

            <div className="gd-proveedores-toolbar">

              <Input
                allowClear
                size="large"
                prefix={
                  <SearchOutlined />
                }
                value={
                  busqueda
                }
                placeholder="Buscar por RUC, razón social, dirección, teléfono o correo"
                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }
              />


              <Button
                icon={
                  <ReloadOutlined />
                }
                loading={
                  cargando
                }
                onClick={
                  cargarProveedores
                }
              >
                Actualizar
              </Button>

            </div>


            <Table<Proveedor>
              rowKey="proveedor_id"
              columns={columns}
              dataSource={
                proveedoresFiltrados
              }
              loading={
                cargando
              }
              scroll={{
                x: 850
              }}
              locale={{
                emptyText:
                  <Empty
                    image={
                      Empty
                        .PRESENTED_IMAGE_SIMPLE
                    }
                    description={
                      busqueda
                        ? 'No se encontraron proveedores'
                        : 'No hay proveedores registrados'
                    }
                  />
              }}
              pagination={{
                pageSize: 10,
                showSizeChanger:
                  false,

                hideOnSinglePage:
                  false,

                showTotal: (
                  total
                ) =>
                  `${total} proveedor(es)`
              }}
            />

          </Card>

        </Col>

      </Row>

    </div>
  );
}


export default Proveedores;


<<<END OF FILE>>>


---

## FILE: src\pages\usuarios\UsuariosAdmin.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography
} from 'antd';

import {
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  apiFetch
} from '../../services/api';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/usuarios.css';


const {
  Text
} = Typography;


type Rol = {
  rol_id: number;
  nombre: string;
  descripcion?: string | null;
};


type UsuarioForm = {
  nombre_completo: string;
  correo: string;
  password: string;
  rol_id: number;
};


function UsuariosAdmin() {
  const [
    form
  ] = Form.useForm<UsuarioForm>();

  const {
    message
  } = AntdApp.useApp();

  const [
    roles,
    setRoles
  ] = useState<Rol[]>([]);

  const [
    cargandoRoles,
    setCargandoRoles
  ] = useState(true);

  const [
    creando,
    setCreando
  ] = useState(false);


  const cargarRoles =
    async () => {
      setCargandoRoles(true);

      try {
        const data =
          await apiFetch(
            '/auth/roles'
          );

        setRoles(
          data.roles || []
        );

      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar los roles'
        );

      } finally {
        setCargandoRoles(false);
      }
    };


  useEffect(() => {
    cargarRoles();
  }, []);


  const rolSeleccionado =
    Form.useWatch(
      'rol_id',
      form
    );


  const rolActual =
    useMemo(
      () =>
        roles.find(
          (rol) =>
            Number(
              rol.rol_id
            ) ===
            Number(
              rolSeleccionado
            )
        ) || null,
      [
        roles,
        rolSeleccionado
      ]
    );


  const crearUsuario =
    async (
      values: UsuarioForm
    ) => {
      setCreando(true);

      try {
        await apiFetch(
          '/auth/usuarios',
          {
            method: 'POST',

            body:
              JSON.stringify({
                nombre_completo:
                  values
                    .nombre_completo
                    .trim(),

                correo:
                  values
                    .correo
                    .trim()
                    .toLowerCase(),

                password:
                  values.password,

                rol_id:
                  Number(
                    values.rol_id
                  )
              })
          }
        );


        message.success(
          'Usuario creado correctamente'
        );


        form.resetFields();

      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo crear el usuario'
        );

      } finally {
        setCreando(false);
      }
    };


  return (
    <div className="gd-usuarios-page">

      <PageHeader
        title="Usuarios"
        description="Crea accesos para las personas que utilizarán GestionDriza."
      />


      <Row
        gutter={[
          20,
          20
        ]}
      >

        <Col
          xs={24}
          xl={16}
        >

          <Card
            title="Nuevo usuario"
            className="gd-usuarios-card"
          >

            <Form<UsuarioForm>
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={
                crearUsuario
              }
              autoComplete="off"
              disabled={
                creando
              }
            >

              <Row
                gutter={[
                  16,
                  0
                ]}
              >

                <Col
                  xs={24}
                  md={12}
                >

                  <Form.Item
                    label="Nombre completo"
                    name="nombre_completo"
                    rules={[
                      {
                        required: true,
                        message:
                          'Ingresa el nombre completo'
                      },
                      {
                        whitespace: true,
                        message:
                          'Ingresa un nombre válido'
                      },
                      {
                        max: 150,
                        message:
                          'El nombre no puede superar 150 caracteres'
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={
                        <UserOutlined />
                      }
                      placeholder="Ejemplo: Juan Pérez"
                      maxLength={150}
                    />
                  </Form.Item>

                </Col>


                <Col
                  xs={24}
                  md={12}
                >

                  <Form.Item
                    label="Correo"
                    name="correo"
                    normalize={
                      (value) =>
                        typeof value ===
                          'string'
                          ? value
                              .trimStart()
                              .toLowerCase()
                          : value
                    }
                    rules={[
                      {
                        required: true,
                        message:
                          'Ingresa el correo'
                      },
                      {
                        type: 'email',
                        message:
                          'Ingresa un correo válido'
                      },
                      {
                        max: 150,
                        message:
                          'El correo no puede superar 150 caracteres'
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={
                        <MailOutlined />
                      }
                      placeholder="usuario@driza.com"
                      maxLength={150}
                      autoComplete="off"
                    />
                  </Form.Item>

                </Col>


                <Col
                  xs={24}
                  md={12}
                >

                  <Form.Item
                    label="Contraseña inicial"
                    name="password"
                    extra="Debe tener al menos 8 caracteres."
                    rules={[
                      {
                        required: true,
                        message:
                          'Ingresa una contraseña inicial'
                      },
                      {
                        min: 8,
                        message:
                          'La contraseña debe tener mínimo 8 caracteres'
                      }
                    ]}
                  >
                    <Input.Password
                      size="large"
                      prefix={
                        <LockOutlined />
                      }
                      placeholder="Mínimo 8 caracteres"
                      autoComplete="new-password"
                    />
                  </Form.Item>

                </Col>


                <Col
                  xs={24}
                  md={12}
                >

                  <Form.Item
                    label="Rol"
                    name="rol_id"
                    rules={[
                      {
                        required: true,
                        message:
                          'Selecciona un rol'
                      }
                    ]}
                  >
                    <Select
                      size="large"
                      loading={
                        cargandoRoles
                      }
                      placeholder="Selecciona un rol"
                      optionFilterProp="label"
                      showSearch
                      options={
                        roles.map(
                          (rol) => ({
                            value:
                              rol.rol_id,

                            label:
                              rol.nombre
                          })
                        )
                      }
                    />
                  </Form.Item>

                </Col>

              </Row>


              {rolActual
                ?.descripcion && (
                <Alert
                  showIcon
                  type="info"
                  icon={
                    <SafetyCertificateOutlined />
                  }
                  message={
                    rolActual.nombre
                  }
                  description={
                    rolActual.descripcion
                  }
                  className="gd-usuarios-role-info"
                />
              )}


              <div className="gd-usuarios-actions">

                <Space
                  wrap
                >

                  <Button
                    onClick={() =>
                      form.resetFields()
                    }
                    disabled={
                      creando
                    }
                  >
                    Limpiar
                  </Button>


                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <UserAddOutlined />
                    }
                    loading={
                      creando
                    }
                    disabled={
                      cargandoRoles ||
                      roles.length === 0
                    }
                  >
                    Crear usuario
                  </Button>

                </Space>

              </div>

            </Form>

          </Card>

        </Col>


        <Col
          xs={24}
          xl={8}
        >

          <Card
            title="Acceso al sistema"
            className="gd-usuarios-card gd-usuarios-info-card"
          >

            <Space
              direction="vertical"
              size={14}
              className="gd-usuarios-info"
            >

              <div className="gd-usuarios-info-item">

                <SafetyCertificateOutlined />

                <div>
                  <Text strong>
                    Permisos según rol
                  </Text>

                  <Text
                    type="secondary"
                  >
                    El rol determina las funciones
                    disponibles para el usuario.
                  </Text>
                </div>

              </div>


              <div className="gd-usuarios-info-item">

                <LockOutlined />

                <div>
                  <Text strong>
                    Contraseña inicial
                  </Text>

                  <Text
                    type="secondary"
                  >
                    La contraseña será necesaria
                    para iniciar sesión.
                  </Text>
                </div>

              </div>


              <div className="gd-usuarios-info-item">

                <MailOutlined />

                <div>
                  <Text strong>
                    Correo único
                  </Text>

                  <Text
                    type="secondary"
                  >
                    No se puede crear más de un
                    usuario con el mismo correo.
                  </Text>
                </div>

              </div>

            </Space>

          </Card>

        </Col>

      </Row>

    </div>
  );
}


export default UsuariosAdmin;


<<<END OF FILE>>>


---

## FILE: src\services\api.ts

<<<START OF FILE>>>

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUsuario = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
};

export const guardarSesion = (token: string, usuario: any) => {
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
};

export const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error en la petición');
  }

  return data;
};

export default API_URL;

<<<END OF FILE>>>


---

## FILE: src\styles\almacenMateriaPrima.css

<<<START OF FILE>>>

.almacen-mp-page {
  width: 100%;
  min-width: 0;
}

.almacen-mp-header {
  align-items: center;
}


/* =========================================================
   INDICADORES
   ========================================================= */

.almacen-mp-indicadores {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.almacen-mp-kpi {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  background: white;
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.almacen-mp-kpi span {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 700;
}

.almacen-mp-kpi strong {
  color: #0f172a;
  font-size: 1.4rem;
}

.almacen-mp-kpi small {
  color: #94a3b8;
}


/* =========================================================
   TABS
   ========================================================= */

.almacen-mp-tabs {
  display: flex;
  gap: 6px;
  width: fit-content;
  margin-bottom: 16px;
  padding: 5px;
  border-radius: 12px;
  background: #e5e7eb;
}

.almacen-mp-tab {
  border: 0;
  border-radius: 9px;
  padding: 10px 18px;
  background: transparent;
  color: #475569;
  font-weight: 700;
  cursor: pointer;
}

.almacen-mp-tab-activo {
  background: #2563eb;
  color: white;
  box-shadow:
    0 5px 12px
    rgba(37, 99, 235, 0.25);
}


/* =========================================================
   FILTROS
   ========================================================= */

.almacen-mp-filtros {
  display: grid;
  gap: 14px;
  align-items: end;
  padding: 18px;
  margin-bottom: 20px;
  border-radius: 16px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.almacen-mp-filtros-resumen {
  grid-template-columns:
    minmax(280px, 2fr)
    minmax(180px, 1fr)
    minmax(180px, 1fr)
    auto
    auto;
}

.almacen-mp-filtros-lotes {
  grid-template-columns:
    minmax(340px, 2fr)
    minmax(220px, 1fr)
    minmax(180px, 0.8fr)
    auto
    auto;
}

.almacen-mp-filtros > div {
  min-width: 0;
}

.almacen-mp-filtros label {
  display: block;
  margin: 0 0 6px;
  font-weight: 700;
}

.almacen-mp-filtros input,
.almacen-mp-filtros select {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}


/* =========================================================
   TABLAS
   ========================================================= */

.almacen-mp-tabla-cabecera {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.almacen-mp-tabla-cabecera h3,
.almacen-mp-tabla-cabecera p {
  margin: 0;
}

.almacen-mp-tabla-cabecera p {
  margin-top: 4px;
  color: #64748b;
}

.almacen-mp-tabla-simple td,
.almacen-mp-tabla-simple th {
  vertical-align: middle;
}

.almacen-mp-disponible {
  color: #047857;
}


/* =========================================================
   DETALLE DE LOTE
   ========================================================= */

.almacen-mp-lote-meta {
  display: grid;
  grid-template-columns:
    2fr 1fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}

.almacen-mp-lote-meta > div,
.almacen-mp-detalle-resumen > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 17px 18px;
  border-radius: 14px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.almacen-mp-lote-meta span,
.almacen-mp-detalle-resumen span {
  color: #64748b;
  font-size: 0.88rem;
}

.almacen-mp-lote-meta small {
  color: #94a3b8;
}

.almacen-mp-detalle-resumen {
  display: grid;
  gap: 14px;
  margin-bottom: 18px;
}

.almacen-mp-detalle-resumen-3 {
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
}

.almacen-mp-detalle-resumen strong {
  font-size: 1.2rem;
}


/* =========================================================
   HISTORIAL COLAPSABLE
   ========================================================= */

.almacen-mp-historial {
  margin-top: 18px;
  border-radius: 14px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
  overflow: hidden;
}

.almacen-mp-historial > summary {
  cursor: pointer;
  list-style: none;
  padding: 17px 20px;
  font-weight: 700;
  color: #1e40af;
}

.almacen-mp-historial > summary::-webkit-details-marker {
  display: none;
}

.almacen-mp-historial > summary::after {
  content: '▾';
  float: right;
}

.almacen-mp-historial[open] > summary::after {
  content: '▴';
}

.almacen-mp-historial-contenido {
  border-top: 1px solid #e5e7eb;
  padding: 20px;
}

.almacen-mp-movimientos-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 18px;
  margin-bottom: 16px;
}

.almacen-mp-movimientos-header h3,
.almacen-mp-movimientos-header p {
  margin: 0;
}

.almacen-mp-movimientos-header p {
  margin-top: 4px;
  color: #64748b;
}

.almacen-mp-movimiento-filtro {
  min-width: 220px;
}

.almacen-mp-movimiento-filtro label {
  display: block;
  margin-bottom: 6px;
  font-weight: 700;
}

.almacen-mp-movimiento-filtro select {
  width: 100%;
}

.almacen-mp-movimiento {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 5px 9px;
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
}

.almacen-mp-movimiento-entrada {
  color: #166534;
  background: #dcfce7;
}

.almacen-mp-movimiento-salida {
  color: #991b1b;
  background: #fee2e2;
}

.almacen-mp-cantidad-entrada {
  color: #047857;
}

.almacen-mp-cantidad-salida {
  color: #b91c1c;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1150px) {
  .almacen-mp-indicadores {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .almacen-mp-filtros-resumen,
  .almacen-mp-filtros-lotes {
    grid-template-columns:
      repeat(2, minmax(180px, 1fr));
  }

  .almacen-mp-lote-meta {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .almacen-mp-detalle-resumen-3 {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .almacen-mp-indicadores,
  .almacen-mp-filtros-resumen,
  .almacen-mp-filtros-lotes,
  .almacen-mp-lote-meta,
  .almacen-mp-detalle-resumen-3 {
    grid-template-columns: 1fr;
  }

  .almacen-mp-tabs {
    width: 100%;
  }

  .almacen-mp-tab {
    flex: 1;
  }

  .almacen-mp-tabla-cabecera,
  .almacen-mp-movimientos-header {
    flex-direction: column;
    align-items: stretch;
  }

  .almacen-mp-movimiento-filtro {
    min-width: 0;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\almacenMateriaPrimaAntd.css

<<<START OF FILE>>>

.gd-almacen-mp-page {
  width: 100%;
  min-width: 0;
}

.gd-almacen-mp-kpis {
  margin-bottom: 18px;
}

.gd-almacen-mp-kpis
.ant-card {
  height: 100%;
}

.gd-almacen-mp-kpis
.ant-statistic-content {
  font-size: 21px;
}

.gd-almacen-mp-tabs-card {
  margin-bottom: 18px;
}

.gd-almacen-mp-section-card {
  margin-bottom: 18px;
}

.gd-almacen-mp-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-almacen-mp-filter-actions
.ant-form-item-control-input-content {
  display: flex;
  align-items: center;
}

.gd-almacen-mp-provider-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-almacen-mp-stock-cell {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 140px;
}

.gd-almacen-mp-detail-stats {
  display: grid;
  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );
  gap: 16px;
  margin-bottom: 18px;
}

.gd-almacen-mp-detail-stats
.ant-card {
  height: 100%;
}

.gd-almacen-mp-detail-stats
.ant-statistic-content {
  font-size: 22px;
}

.gd-almacen-mp-global-progress {
  margin-top: 18px;
}

.gd-almacen-mp-global-progress-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
}

.gd-almacen-mp-history-collapse {
  margin-bottom: 18px;
}

.gd-almacen-mp-history-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 16px;
}

.gd-almacen-mp-history-filter {
  width: 220px;
  flex: 0 0 auto;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-almacen-mp-page
.ant-card,
[data-gd-theme='light']
.gd-almacen-mp-page
.ant-collapse {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-almacen-mp-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-almacen-mp-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-almacen-mp-filter-actions
  .ant-space {
    width: 100%;
  }

  .gd-almacen-mp-filter-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-almacen-mp-filter-actions
  .ant-btn {
    width: 100%;
  }

  .gd-almacen-mp-detail-stats {
    grid-template-columns:
      1fr;
  }

  .gd-almacen-mp-global-progress-head,
  .gd-almacen-mp-history-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .gd-almacen-mp-history-filter {
    width: 100%;
  }
}

@media (
  min-width: 768px
) and (
  max-width: 1199px
) {
  .gd-almacen-mp-detail-stats {
    grid-template-columns:
      repeat(
        3,
        minmax(0, 1fr)
      );
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\almacenProductoTerminado.css

<<<START OF FILE>>>

.almacen-pt-page {
  width: 100%;
  min-width: 0;
}

.almacen-pt-header {
  align-items: center;
}


/* =========================================================
   INDICADORES
   ========================================================= */

.apt-indicadores {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.apt-kpi {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px;
  border-radius: 16px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.apt-kpi span {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 700;
}

.apt-kpi strong {
  color: #0f172a;
  font-size: 1.4rem;
}

.apt-kpi small {
  color: #94a3b8;
}


/* =========================================================
   TABS
   ========================================================= */

.apt-tabs {
  display: flex;
  gap: 6px;
  width: fit-content;
  margin-bottom: 16px;
  padding: 5px;
  border-radius: 12px;
  background: #e5e7eb;
}

.apt-tab {
  border: 0;
  border-radius: 9px;
  padding: 10px 18px;
  background: transparent;
  color: #475569;
  font-weight: 700;
  cursor: pointer;
}

.apt-tab-activo {
  background: #2563eb;
  color: white;
  box-shadow:
    0 5px 12px
    rgba(37, 99, 235, 0.25);
}


/* =========================================================
   FILTROS
   ========================================================= */

.apt-filtros {
  display: grid;
  grid-template-columns:
    minmax(240px, 1.8fr)
    repeat(4, minmax(130px, 0.8fr))
    auto
    auto;
  gap: 12px;
  align-items: end;
  padding: 18px;
  margin-bottom: 20px;
  border-radius: 16px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.apt-filtros-presentaciones {
  grid-template-columns:
    minmax(220px, 1.6fr)
    repeat(5, minmax(120px, 0.75fr))
    auto
    auto;
}

.apt-filtros > div {
  min-width: 0;
}

.apt-filtros label {
  display: block;
  margin-bottom: 6px;
  font-weight: 700;
}

.apt-filtros input,
.apt-filtros select {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}


/* =========================================================
   TABLAS
   ========================================================= */

.apt-tabla-cabecera {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 16px;
}

.apt-tabla-cabecera h3,
.apt-tabla-cabecera p {
  margin: 0;
}

.apt-tabla-cabecera p {
  margin-top: 4px;
  color: #64748b;
}

.apt-stock-positivo {
  color: #047857;
}

.apt-stock-salida {
  color: #b91c1c;
}

.apt-subtexto {
  margin-top: 2px;
  color: #64748b;
  font-size: 0.82rem;
}

.apt-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
}

.apt-badge-ok {
  color: #166534;
  background: #dcfce7;
}

.apt-badge-agotado {
  color: #475569;
  background: #e2e8f0;
}

.apt-badge-salida {
  color: #991b1b;
  background: #fee2e2;
}


/* =========================================================
   DETALLE
   ========================================================= */

.apt-detalle-principal {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.apt-detalle-principal > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 17px 18px;
  border-radius: 14px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.apt-detalle-principal span {
  color: #64748b;
  font-size: 0.86rem;
}

.apt-detalle-principal strong {
  font-size: 1.15rem;
}

.apt-presentacion-destacada {
  border: 1px solid #bfdbfe;
  background: #eff6ff !important;
}


/* =========================================================
   MOVIMIENTOS
   ========================================================= */

.apt-movimientos-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-end;
  margin-bottom: 16px;
}

.apt-movimientos-header h3,
.apt-movimientos-header p {
  margin: 0;
}

.apt-movimientos-header p {
  margin-top: 4px;
  color: #64748b;
}

.apt-movimiento-filtro {
  min-width: 230px;
}

.apt-movimiento-filtro label {
  display: block;
  margin-bottom: 6px;
  font-weight: 700;
}

.apt-movimiento-filtro select {
  width: 100%;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1350px) {
  .apt-filtros,
  .apt-filtros-presentaciones {
    grid-template-columns:
      repeat(4, minmax(150px, 1fr));
  }

  .apt-filtro-busqueda {
    grid-column: span 2;
  }
}

@media (max-width: 950px) {
  .apt-indicadores,
  .apt-detalle-principal {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .apt-indicadores,
  .apt-detalle-principal,
  .apt-filtros,
  .apt-filtros-presentaciones {
    grid-template-columns: 1fr;
  }

  .apt-filtro-busqueda {
    grid-column: auto;
  }

  .apt-tabs {
    width: 100%;
  }

  .apt-tab {
    flex: 1;
  }

  .apt-tabla-cabecera,
  .apt-movimientos-header {
    flex-direction: column;
    align-items: stretch;
  }

  .apt-movimiento-filtro {
    min-width: 0;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\almacenProductoTerminadoAntd.css

<<<START OF FILE>>>

.gd-almacen-pt-page {
  width: 100%;
  min-width: 0;
}

.gd-almacen-pt-kpis {
  margin-bottom: 18px;
}

.gd-almacen-pt-kpis
.ant-card {
  height: 100%;
}

.gd-almacen-pt-kpis
.ant-statistic-content {
  font-size: 22px;
}

.gd-almacen-pt-tabs-card,
.gd-almacen-pt-section-card {
  margin-bottom: 18px;
}

.gd-almacen-pt-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-almacen-pt-filter-actions
.ant-form-item-control-input-content {
  display: flex;
  align-items: center;
}

.gd-almacen-pt-product-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-almacen-pt-detail-stats {
  margin-bottom: 18px;
}

.gd-almacen-pt-detail-stats
.ant-card {
  height: 100%;
}

.gd-almacen-pt-detail-stats
.ant-statistic-content {
  font-size: 20px;
}

.gd-almacen-pt-history-filter {
  width: 210px;
}

.gd-almacen-pt-history-summary {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 14px;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-almacen-pt-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-almacen-pt-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-almacen-pt-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-almacen-pt-filter-actions
  .ant-space {
    width: 100%;
  }

  .gd-almacen-pt-filter-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-almacen-pt-filter-actions
  .ant-btn {
    width: 100%;
  }

  .gd-almacen-pt-history-filter {
    width: 100%;
  }

  .gd-almacen-pt-history-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\catalogos.css

<<<START OF FILE>>>

.gd-catalogos-page {
  width: 100%;
  min-width: 0;
}

.gd-catalogos-main-card
.ant-card-body {
  padding:
    0 24px 24px;
}

.gd-catalogos-tabs
.ant-tabs-nav {
  margin:
    0 0 20px;
}

.gd-catalogos-section-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 18px;
}

.gd-catalogos-section-header
> div {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.gd-catalogos-content {
  display: grid;
  grid-template-columns:
    minmax(250px, 330px)
    minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.gd-catalogos-form-card.ant-card {
  position: sticky;
  top: 92px;
}

.gd-catalogos-list-area {
  min-width: 0;
}

.gd-catalogos-toolbar {
  display: grid;
  grid-template-columns:
    minmax(220px, 1fr)
    auto;
  gap: 10px;
  margin-bottom: 14px;
}

.gd-catalogos-edit-form {
  padding-top: 10px;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-catalogos-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-catalogos-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-catalogos-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 991px) {
  .gd-catalogos-content {
    grid-template-columns: 1fr;
  }

  .gd-catalogos-form-card.ant-card {
    position: static;
  }
}

@media (max-width: 767px) {
  .gd-catalogos-main-card
  .ant-card-body {
    padding:
      0 14px
      16px;
  }

  .gd-catalogos-section-header {
    flex-direction: column;
    gap: 10px;
  }

  .gd-catalogos-toolbar {
    grid-template-columns: 1fr;
  }

  .gd-catalogos-toolbar
  .ant-btn {
    width: 100%;
  }

  .gd-catalogos-page
  .ant-tabs-nav-list {
    min-width: max-content;
  }

  .gd-catalogos-page
  .ant-tabs-nav-wrap {
    overflow-x: auto;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\clientes.css

<<<START OF FILE>>>

.gd-clientes-page {
  width: 100%;
  min-width: 0;
}

.gd-back-button.ant-btn {
  margin:
    -6px 0
    12px -10px;
}

.gd-clientes-filter-card {
  margin-bottom: 18px;
}

.gd-clientes-filter-row {
  display: grid;
  grid-template-columns:
    minmax(260px, 1fr)
    auto;
  gap: 14px;
  align-items: center;
}

.gd-clientes-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-clientes-form-card.ant-card {
  max-width: 1180px;
}

.gd-clientes-form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.gd-full-width {
  width: 100%;
}

.gd-precios-form-card {
  max-width: none !important;
  margin-bottom: 18px;
}

.gd-precios-filter-card {
  margin-bottom: 18px;
}

.gd-filter-actions-item
.ant-form-item-control-input-content {
  display: flex;
  align-items: center;
}

.gd-precio-cliente {
  display: flex;
  flex-direction: column;
  gap: 2px;
}


/* =========================================================
   LIGHT MODE CONTRAST
   ========================================================= */

[data-gd-theme='light']
.gd-clientes-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-clientes-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-clientes-page
.ant-table-wrapper
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}

[data-gd-theme='light']
.gd-clientes-page
.ant-table-thead
> tr
> th {
  background: #f4f7fb;
  border-bottom-color: #d7dee8;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-clientes-filter-row {
    grid-template-columns: 1fr;
  }

  .gd-clientes-filter-row
  > .ant-space {
    width: 100%;
  }

  .gd-clientes-filter-row
  > .ant-space
  .ant-space-item {
    flex: 1;
  }

  .gd-clientes-filter-row
  .ant-btn {
    width: 100%;
  }

  .gd-clientes-form-actions {
    justify-content: stretch;
  }

  .gd-clientes-form-actions
  .ant-space {
    width: 100%;
  }

  .gd-clientes-form-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-clientes-form-actions
  .ant-btn {
    width: 100%;
  }

  .gd-filter-actions-item
  .ant-space {
    width: 100%;
  }

  .gd-filter-actions-item
  .ant-space-item {
    flex: 1;
  }

  .gd-filter-actions-item
  .ant-btn {
    width: 100%;
  }
}


/* =========================================================
   DARK MODE - TABLE CONSISTENCY
   ========================================================= */

/*
 * Ant Design gestiona el hover mediante tokens globales.
 * Estas reglas aseguran que celdas normales y columnas fijas
 * utilicen exactamente la misma superficie.
 */

[data-gd-theme='dark']
.gd-clientes-page
.ant-table-tbody
> tr
> td {
  transition:
    background-color 0.18s ease;
}

[data-gd-theme='dark']
.gd-clientes-page
.ant-table-tbody
> tr.ant-table-row:hover
> td,
[data-gd-theme='dark']
.gd-clientes-page
.ant-table-tbody
> tr
> td.ant-table-cell-row-hover {
  background:
    #242932 !important;
}

[data-gd-theme='dark']
.gd-clientes-page
.ant-table-cell-fix-left,
[data-gd-theme='dark']
.gd-clientes-page
.ant-table-cell-fix-right {
  background:
    #141414;
}

[data-gd-theme='dark']
.gd-clientes-page
.ant-table-tbody
> tr.ant-table-row:hover
> td.ant-table-cell-fix-left,
[data-gd-theme='dark']
.gd-clientes-page
.ant-table-tbody
> tr.ant-table-row:hover
> td.ant-table-cell-fix-right,
[data-gd-theme='dark']
.gd-clientes-page
.ant-table-tbody
> tr
> td.ant-table-cell-fix-left.ant-table-cell-row-hover,
[data-gd-theme='dark']
.gd-clientes-page
.ant-table-tbody
> tr
> td.ant-table-cell-fix-right.ant-table-cell-row-hover {
  background:
    #242932 !important;
}

[data-gd-theme='dark']
.gd-clientes-page
.ant-table-cell-fix-right-first::after,
[data-gd-theme='dark']
.gd-clientes-page
.ant-table-cell-fix-left-last::after {
  box-shadow:
    none !important;
}


<<<END OF FILE>>>


---

## FILE: src\styles\comprasGeneralesAntd.css

<<<START OF FILE>>>

.gd-compras-page {
  width: 100%;
  min-width: 0;
}

.gd-compras-register-card,
.gd-compras-filter-card {
  margin-bottom: 18px;
}

.gd-compras-items-space {
  width: 100%;
}

.gd-compras-items-heading {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
  margin-top: 4px;
}

.gd-compra-item-card.ant-card {
  width: 100%;
}

.gd-compras-total-card {
  margin-top: 16px;
}

.gd-compras-total-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 42px;
}

.gd-compras-total-row
.ant-statistic-content {
  font-size: 22px;
}

.gd-compras-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.gd-compras-filter-actions
.ant-form-item-control-input-content {
  display: flex;
  align-items: center;
}

.gd-compras-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-compra-provider-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-full-width {
  width: 100%;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-compras-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-compras-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-compras-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-compras-items-heading {
    align-items: stretch;
    flex-direction: column;
  }

  .gd-compras-items-heading
  .ant-btn {
    width: 100%;
  }

  .gd-compras-total-row {
    align-items: stretch;
    flex-direction: column;
    gap: 12px;
  }

  .gd-compras-actions {
    justify-content: stretch;
  }

  .gd-compras-actions
  .ant-btn {
    width: 100%;
  }

  .gd-compras-filter-actions
  .ant-space {
    width: 100%;
  }

  .gd-compras-filter-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-compras-filter-actions
  .ant-btn {
    width: 100%;
  }
}


/* =========================================================
   DETALLE DE COMPRA
   ========================================================= */

.gd-compra-detail-total-card {
  margin-top: 18px;
}

.gd-compra-detail-total-space {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 42px;
}

.gd-compra-detail-total-space
.ant-statistic-content {
  font-size: 24px;
}

@media (max-width: 767px) {
  .gd-compra-detail-total-space {
    flex-direction: column;
    justify-content: stretch;
    gap: 14px;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\comprasMateriaPrima.css

<<<START OF FILE>>>

.compra-mp-page {
  min-width: 0;
  width: 100%;
}

.compra-mp-registro-page {
  width: 100%;
  max-width: none;
}

.compra-mp-page textarea {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid #d1d5db;
  border-radius: 9px;
  font: inherit;
  resize: vertical;
  box-sizing: border-box;
}

.btn-primary-link,
.btn-secondary-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px 14px;
  font-weight: 700;
  text-decoration: none;
}

.btn-primary-link {
  background: #111827;
  color: white;
}

.btn-secondary-link {
  background: #e5e7eb;
  color: #111827;
}


/* =========================================================
   LISTADO
   ========================================================= */

.compra-mp-filtros {
  background: white;
  border-radius: 16px;
  padding: 18px;
  display: grid;
  grid-template-columns: 2fr 1.4fr auto auto;
  gap: 14px;
  align-items: end;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}

.compra-mp-filtros label {
  margin-top: 0;
}

.compra-mp-tabla-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 14px;
}

.compra-mp-tabla-header h3 {
  margin: 0 0 4px;
}

.tabla-scroll {
  width: 100%;
  overflow-x: auto;
}


/* =========================================================
   FORMULARIO PRINCIPAL

   Override importante:
   algunos formularios del proyecto utilizan max-width.
   Este formulario necesita aprovechar el espacio del layout.
   ========================================================= */

.compra-mp-form.form-card {
  width: 100%;
  max-width: none;
  box-sizing: border-box;
  margin: 0;
  padding: 26px 28px;
  border-radius: 16px;
}

.compra-mp-seccion {
  width: 100%;
}

.compra-mp-seccion + .compra-mp-seccion {
  margin-top: 28px;
  padding-top: 26px;
  border-top: 1px solid #e5e7eb;
}

.compra-mp-seccion-titulo {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.compra-mp-seccion-titulo h3 {
  margin: 0;
}

.compra-mp-seccion-titulo p {
  margin: 5px 0 0;
  color: #6b7280;
}


/* =========================================================
   CABECERA DEL LOTE
   ========================================================= */

.compra-mp-cabecera-grid {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(220px, 1fr));
  gap: 18px 20px;
  align-items: start;
}

.compra-mp-cabecera-grid > div {
  min-width: 0;
}

.compra-mp-cabecera-grid label,
.compra-mp-item-grid label {
  display: block;
  margin: 0 0 7px;
  font-weight: 700;
}

.compra-mp-cabecera-grid input,
.compra-mp-cabecera-grid select,
.compra-mp-item-grid input,
.compra-mp-item-grid select {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.compra-mp-campo-ancho {
  grid-column: 1 / -1;
}


/* =========================================================
   CABECERA DE ITEMS
   ========================================================= */

.compra-mp-items-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  margin-bottom: 16px;
}

.compra-mp-items-header h3,
.compra-mp-items-header p {
  margin: 0;
}

.compra-mp-items-header p {
  margin-top: 5px;
}


/* =========================================================
   ITEMS
   ========================================================= */

.compra-mp-items {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.compra-mp-item-card {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dfe3e8;
  border-radius: 14px;
  padding: 20px;
  background: #f9fafb;
}

.compra-mp-item-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 18px;
}

.compra-mp-item-title > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.compra-mp-item-title strong {
  font-size: 1rem;
}

.compra-mp-item-subtitle {
  color: #6b7280;
  font-size: 0.88rem;
}


/*
 * Distribución deliberadamente desigual:
 *
 * Material    23%
 * Color       16%
 * Cantidad    20%
 * Precio      20%
 * Subtotal    17%
 *
 * Así Cantidad/Precio ya no quedan comprimidos.
 */
.compra-mp-item-grid {
  display: grid;
  grid-template-columns:
    minmax(190px, 1.35fr)
    minmax(145px, 0.95fr)
    minmax(190px, 1.15fr)
    minmax(190px, 1.15fr)
    minmax(170px, 1fr);
  gap: 18px;
  align-items: end;
}

.compra-mp-item-grid > div {
  min-width: 0;
}


/* =========================================================
   CANTIDAD + KG
   ========================================================= */

.compra-mp-input-unidad {
  width: 100%;
  display: grid;
  grid-template-columns:
    minmax(120px, 1fr)
    54px;
  align-items: stretch;
}

.compra-mp-input-unidad input {
  width: 100%;
  min-width: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.compra-mp-input-unidad span {
  height: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-left: 0;
  border-radius: 0 8px 8px 0;
  background: #e5e7eb;
  font-weight: 700;
  color: #374151;
}


/* =========================================================
   PRECIO
   ========================================================= */

.compra-mp-input-moneda {
  width: 100%;
  display: grid;
  grid-template-columns:
    48px
    minmax(120px, 1fr);
  align-items: stretch;
}

.compra-mp-input-moneda span {
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-right: 0;
  border-radius: 8px 0 0 8px;
  background: #e5e7eb;
  font-weight: 700;
  color: #374151;
}

.compra-mp-input-moneda input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}


/* =========================================================
   SUBTOTAL
   ========================================================= */

.compra-mp-subtotal-box {
  min-height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 7px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #eef0f3;
  white-space: nowrap;
}

.compra-mp-subtotal-box span {
  color: #6b7280;
}

.compra-mp-subtotal-box strong {
  font-size: 0.98rem;
}

.compra-mp-item-descripcion {
  margin-top: 2px;
}


/* =========================================================
   TOTAL
   ========================================================= */

.compra-mp-total {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 22px;
  background: #f3f4f6;
  border-radius: 12px;
}

.compra-mp-total > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.compra-mp-total small {
  color: #6b7280;
}

.compra-mp-total strong {
  font-size: 1.55rem;
  white-space: nowrap;
}

.compra-mp-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}


/* =========================================================
   DETALLE DE LOTE
   ========================================================= */

.compra-mp-resumen {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.compra-mp-resumen > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: white;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}

.compra-mp-resumen span,
.compra-mp-resumen small {
  color: #6b7280;
}

.compra-mp-resumen strong {
  font-size: 1.05rem;
}

.compra-mp-meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: #4b5563;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1450px) {
  .compra-mp-item-grid {
    grid-template-columns:
      minmax(180px, 1.25fr)
      minmax(140px, 0.9fr)
      minmax(180px, 1.1fr)
      minmax(180px, 1.1fr);
  }

  .compra-mp-item-subtotal {
    grid-column: span 1;
  }

  .compra-mp-item-descripcion {
    grid-column: 1 / -1;
  }
}

@media (max-width: 1150px) {
  .compra-mp-cabecera-grid {
    grid-template-columns:
      repeat(2, minmax(220px, 1fr));
  }

  .compra-mp-item-grid {
    grid-template-columns:
      repeat(2, minmax(240px, 1fr));
  }

  .compra-mp-item-descripcion {
    grid-column: 1 / -1;
  }
}

@media (max-width: 900px) {
  .compra-mp-filtros {
    grid-template-columns:
      1fr 1fr;
  }

  .compra-mp-resumen {
    grid-template-columns:
      1fr 1fr;
  }

  .compra-mp-form.form-card {
    padding: 22px;
  }
}

@media (max-width: 680px) {
  .compra-mp-filtros,
  .compra-mp-cabecera-grid,
  .compra-mp-resumen,
  .compra-mp-item-grid {
    grid-template-columns: 1fr;
  }

  .compra-mp-campo-ancho,
  .compra-mp-item-descripcion {
    grid-column: auto;
  }

  .compra-mp-items-header,
  .compra-mp-form-actions,
  .compra-mp-meta,
  .compra-mp-total {
    flex-direction: column;
    align-items: stretch;
  }

  .compra-mp-total strong {
    font-size: 1.35rem;
  }

  .compra-mp-form.form-card {
    padding: 18px;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\comprasMateriaPrimaAntd.css

<<<START OF FILE>>>

.gd-compra-mp-page {
  width: 100%;
  min-width: 0;
}

.gd-compra-mp-filter-card,
.gd-compra-mp-section-card {
  margin-bottom: 18px;
}

.gd-compra-mp-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-compra-mp-filter-actions
.ant-form-item-control-input-content {
  display: flex;
  align-items: center;
}

.gd-compra-mp-provider-cell,
.gd-compra-mp-material-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-compra-mp-stock-cell {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 140px;
}

.gd-compra-mp-main-rule {
  margin-bottom: 16px;
}

.gd-compra-mp-items-space {
  width: 100%;
}

.gd-compra-mp-item-card.ant-card {
  width: 100%;
}

.gd-compra-mp-total-card {
  margin-bottom: 18px;
}

.gd-compra-mp-total-grid {
  display: grid;
  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );
  gap: 18px;
}

.gd-compra-mp-total-grid
.ant-statistic-content {
  font-size: 23px;
}

.gd-compra-mp-actions {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 6px;
}

.gd-compra-mp-summary {
  margin-bottom: 18px;
}

.gd-compra-mp-summary
.ant-card {
  height: 100%;
}

.gd-compra-mp-summary
.ant-statistic-content {
  font-size: 21px;
}

.gd-compra-mp-global-progress {
  margin-top: 18px;
}

.gd-compra-mp-global-progress-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
}

.gd-full-width {
  width: 100%;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-compra-mp-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-compra-mp-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-compra-mp-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-compra-mp-filter-actions
  .ant-space {
    width: 100%;
  }

  .gd-compra-mp-filter-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-compra-mp-filter-actions
  .ant-btn {
    width: 100%;
  }

  .gd-compra-mp-total-grid {
    grid-template-columns:
      1fr;
  }

  .gd-compra-mp-actions {
    justify-content: stretch;
  }

  .gd-compra-mp-actions
  .ant-space {
    width: 100%;
  }

  .gd-compra-mp-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-compra-mp-actions
  .ant-btn {
    width: 100%;
  }

  .gd-compra-mp-global-progress-head {
    align-items: flex-start;
    flex-direction: column;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\dashboard.css

<<<START OF FILE>>>

.gd-page-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 22px;
}

.gd-page-header-copy {
  min-width: 0;
}

.gd-page-header-title.ant-typography {
  margin: 0 !important;
  letter-spacing: -0.025em;
}

.gd-page-header-description {
  display: block;
  margin-top: 5px;
  font-size: 14px;
}

.gd-page-header-extra {
  flex: 0 0 auto;
}


/* =========================================================
   METRICS
   ========================================================= */

.gd-metric-card.ant-card {
  height: 100%;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.gd-metric-card
.ant-card-body {
  height: 100%;
}

.gd-metric-card-content {
  display: flex;
  gap: 14px;
  align-items: center;
}

.gd-metric-statistic {
  min-width: 0;
}

.gd-metric-statistic
.ant-statistic-title {
  margin-bottom: 3px;
}

.gd-metric-statistic
.ant-statistic-content {
  font-size: clamp(
    22px,
    2vw,
    28px
  );
  font-weight: 700;
}


/* =========================================================
   DASHBOARD
   ========================================================= */

.gd-dashboard {
  width: 100%;
  min-width: 0;
}

.gd-dashboard-alert {
  margin-bottom: 18px;
}

.gd-dashboard-secondary {
  margin-top: 18px;
}

.gd-dashboard-card.ant-card {
  height: 100%;
}

.gd-dashboard-card
.ant-card-head {
  min-height: 58px;
}

.gd-quick-card.ant-card {
  height: 100%;
  cursor: pointer;
}

.gd-quick-card
.ant-card-body {
  height: 100%;
}

.gd-quick-card-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gd-quick-card-description {
  line-height: 1.45;
}

.gd-session-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.gd-session-user {
  width: 100%;
  min-width: 0;
}

.gd-session-name.ant-typography {
  margin:
    0 0 3px !important;
}


/* =========================================================
   LIGHT MODE CONTRAST
   ========================================================= */

[data-gd-theme='light']
.gd-dashboard
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-metric-card.ant-card,
[data-gd-theme='light']
.gd-dashboard-card.ant-card {
  box-shadow:
    0 2px 8px
    rgba(15, 23, 42, 0.035);
}

[data-gd-theme='light']
.gd-dashboard-card
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-quick-card.ant-card {
  background: #fbfcfe;
  border-color: #d4dce7;
}

[data-gd-theme='light']
.gd-quick-card.ant-card:hover {
  border-color: #b8c5d6;
  box-shadow:
    0 5px 16px
    rgba(15, 23, 42, 0.07);
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-page-header {
    flex-direction: column;
    gap: 14px;
  }

  .gd-page-header-extra {
    width: 100%;
  }

  .gd-page-header-extra
  .ant-btn {
    width: 100%;
  }

  .gd-metric-card-content {
    gap: 12px;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\depositosAntd.css

<<<START OF FILE>>>

.gd-deposito-page {
  width: 100%;
  min-width: 0;
}

.gd-deposito-filter-card,
.gd-deposito-section-card {
  margin-bottom: 18px;
}

.gd-deposito-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-deposito-filter-actions
.ant-form-item-control-input-content {
  display: flex;
  align-items: center;
}

.gd-deposito-client-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-deposito-balance-preview {
  margin-top: 4px;
}

.gd-deposito-payment-progress {
  margin-top: 14px;
}

.gd-deposito-inline-alert {
  margin-top: 14px;
}

.gd-deposito-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.gd-full-width {
  width: 100%;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-deposito-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-deposito-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-deposito-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-deposito-filter-actions
  .ant-space {
    width: 100%;
  }

  .gd-deposito-filter-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-deposito-filter-actions
  .ant-btn {
    width: 100%;
  }

  .gd-deposito-actions {
    justify-content: stretch;
  }

  .gd-deposito-actions
  .ant-btn {
    width: 100%;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\entregasAntd.css

<<<START OF FILE>>>

.gd-entrega-page {
  width: 100%;
  min-width: 0;
}

.gd-entrega-filter-card,
.gd-entrega-section-card {
  margin-bottom: 18px;
}

.gd-entrega-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-entrega-filter-actions
.ant-form-item-control-input-content {
  display: flex;
  align-items: center;
}

.gd-entrega-client-cell,
.gd-entrega-product-title {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-entrega-main-rule {
  margin-bottom: 18px;
}

.gd-entrega-products-space,
.gd-entrega-history-space {
  width: 100%;
}

.gd-entrega-product-card.ant-card,
.gd-entrega-history-card.ant-card {
  width: 100%;
}

.gd-entrega-product-summary {
  margin-bottom: 14px;
}

.gd-entrega-product-summary
.ant-card {
  height: 100%;
}

.gd-entrega-product-summary
.ant-statistic-content {
  font-size: 18px;
}

.gd-entrega-inline-alert {
  margin-bottom: 14px;
}

.gd-entrega-selection-summary {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.gd-entrega-selection-summary
.ant-card {
  min-width: 190px;
}

.gd-entrega-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.gd-entrega-history-description {
  margin-bottom: 14px;
}

.gd-full-width {
  width: 100%;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-entrega-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-entrega-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-entrega-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-entrega-filter-actions
  .ant-space {
    width: 100%;
  }

  .gd-entrega-filter-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-entrega-filter-actions
  .ant-btn {
    width: 100%;
  }

  .gd-entrega-selection-summary {
    flex-direction: column;
  }

  .gd-entrega-selection-summary
  .ant-card {
    width: 100%;
    min-width: 0;
  }

  .gd-entrega-actions {
    justify-content: stretch;
  }

  .gd-entrega-actions
  .ant-btn {
    width: 100%;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\entregasStock.css

<<<START OF FILE>>>

.entrega-stock-page {
  width: 100%;
  min-width: 0;
}

.entrega-form.form-card {
  max-width: none;
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
}

.entrega-form-header h3,
.entrega-form-header p {
  margin: 0;
}

.entrega-form-header p {
  margin-top: 5px;
  color: #64748b;
}

.entrega-cabecera-grid {
  display: grid;
  grid-template-columns:
    minmax(220px, 0.7fr)
    minmax(300px, 2fr);
  gap: 18px;
  margin: 20px 0 24px;
}

.entrega-cabecera-grid > div {
  min-width: 0;
}

.entrega-cabecera-grid label,
.entrega-input-grid label {
  display: block;
  margin-bottom: 6px;
  font-weight: 700;
}

.entrega-cabecera-grid input,
.entrega-cabecera-grid textarea,
.entrega-input-grid input {
  width: 100%;
  box-sizing: border-box;
}

.entrega-producto-card {
  padding: 18px;
}

.entrega-producto-nombre {
  font-size: 1rem;
}

.entrega-producto-estados {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.entrega-stock-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
}

.entrega-stock-ok {
  color: #166534;
  background: #dcfce7;
}

.entrega-stock-error {
  color: #991b1b;
  background: #fee2e2;
}

.entrega-stock-warning {
  color: #92400e;
  background: #fef3c7;
}

.entrega-producto-resumen {
  display: grid;
  grid-template-columns:
    repeat(6, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
}

.entrega-producto-resumen > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 11px 12px;
  border-radius: 10px;
  background: white;
  border: 1px solid #e5e7eb;
}

.entrega-producto-resumen span {
  color: #64748b;
  font-size: 0.8rem;
}

.entrega-producto-resumen strong {
  font-size: 0.95rem;
}

.entrega-stock-valor-ok {
  color: #047857;
}

.entrega-stock-valor-error {
  color: #b91c1c;
}

.entrega-alerta {
  margin: 12px 0;
  padding: 12px 14px;
  border-radius: 10px;
  font-weight: 600;
}

.entrega-alerta-error {
  color: #991b1b;
  background: #fee2e2;
}

.entrega-alerta-warning {
  color: #92400e;
  background: #fef3c7;
}

.entrega-regla {
  margin: 12px 0;
  padding: 11px 13px;
  border-radius: 10px;
  color: #1e3a8a;
  background: #eff6ff;
}

.entrega-input-grid {
  display: grid;
  grid-template-columns:
    minmax(220px, 0.8fr)
    minmax(260px, 1.2fr);
  gap: 14px;
  align-items: end;
}

.entrega-input-unidad {
  display: grid;
  grid-template-columns:
    minmax(100px, 1fr)
    55px;
}

.entrega-input-unidad input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.entrega-input-unidad span {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-left: 0;
  border-radius: 0 8px 8px 0;
  background: #e5e7eb;
  color: #374151;
  font-weight: 700;
}

.entrega-validacion-error {
  margin-top: 10px;
  color: #b91c1c;
  font-size: 0.88rem;
  font-weight: 600;
}

.entrega-total-box {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;
}

.entrega-total-box > div {
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 10px;
  background: #f1f5f9;
}

.entrega-total-box span {
  color: #64748b;
  font-size: 0.82rem;
}

.entrega-total-box strong {
  font-size: 1.05rem;
}

.entrega-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.entrega-historial-header h3,
.entrega-historial-header p {
  margin: 0;
}

.entrega-historial-header p {
  margin-top: 4px;
  margin-bottom: 16px;
  color: #64748b;
}

@media (max-width: 1350px) {
  .entrega-producto-resumen {
    grid-template-columns:
      repeat(3, minmax(140px, 1fr));
  }
}

@media (max-width: 850px) {
  .entrega-cabecera-grid,
  .entrega-input-grid,
  .entrega-producto-resumen {
    grid-template-columns: 1fr;
  }

  .entrega-producto-estados {
    justify-content: flex-start;
  }

  .entrega-total-box {
    flex-direction: column;
  }

  .entrega-total-box > div {
    min-width: 0;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\gastosAntd.css

<<<START OF FILE>>>

.gd-gasto-page {
  width: 100%;
  min-width: 0;
}

.gd-gasto-config-row {
  margin-bottom: 20px;
}

.gd-gasto-type-card.ant-card,
.gd-gasto-form-card.ant-card {
  height: 100%;
}

.gd-gasto-type-card {
  position: sticky;
  top: 92px;
}

.gd-gasto-section-card {
  margin-bottom: 18px;
}

.gd-gasto-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-gasto-form-actions {
  display: flex;
  justify-content: flex-end;
}

.gd-gasto-filter-actions
.ant-form-item-control-input-content {
  display: flex;
  align-items: center;
}

.gd-gasto-main-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-full-width {
  width: 100%;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-gasto-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-gasto-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-gasto-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1199px) {
  .gd-gasto-type-card {
    position: static;
  }
}

@media (max-width: 767px) {
  .gd-gasto-form-actions {
    justify-content: stretch;
  }

  .gd-gasto-form-actions
  .ant-btn {
    width: 100%;
  }

  .gd-gasto-filter-actions
  .ant-space {
    width: 100%;
  }

  .gd-gasto-filter-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-gasto-filter-actions
  .ant-btn {
    width: 100%;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\layout.css

<<<START OF FILE>>>

.gd-app-layout {
  min-height: 100dvh;
}

.gd-app-main {
  min-width: 0;
  min-height: 100dvh;
}


/* =========================================================
   SIDEBAR
   ========================================================= */

.gd-app-sider {
  position: sticky !important;
  top: 0;
  height: 100dvh;
  overflow: hidden;
  box-shadow:
    8px 0 28px
    rgba(2, 6, 23, 0.08);
  z-index: 20;
}

.gd-sidebar-brand {
  height: 76px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 18px;
  border-bottom:
    1px solid
    rgba(255, 255, 255, 0.08);
}

.gd-sidebar-brand-collapsed {
  justify-content: center;
  padding: 0;
}

.gd-sidebar-logo {
  flex: 0 0 auto;
  background:
    linear-gradient(
      135deg,
      #2563eb,
      #60a5fa
    ) !important;
  box-shadow:
    0 10px 26px
    rgba(37, 99, 235, 0.30);
}

.gd-sidebar-brand-text {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.gd-sidebar-brand-text strong {
  overflow: hidden;
  color: #ffffff;
  font-size: 17px;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gd-sidebar-brand-text span {
  margin-top: 3px;
  overflow: hidden;
  color:
    rgba(255, 255, 255, 0.50);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gd-sidebar-scroll {
  height:
    calc(100dvh - 76px);
  overflow-x: hidden;
  overflow-y: auto;
  padding:
    10px 8px
    20px;
}

.gd-sidebar-scroll::-webkit-scrollbar,
.gd-mobile-sidebar-scroll::-webkit-scrollbar {
  width: 5px;
}

.gd-sidebar-scroll::-webkit-scrollbar-thumb,
.gd-mobile-sidebar-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background:
    rgba(255, 255, 255, 0.16);
}

.gd-sidebar-menu.ant-menu {
  border-inline-end: 0 !important;
  background:
    transparent !important;
}

.gd-sidebar-menu
.ant-menu-item,
.gd-sidebar-menu
.ant-menu-submenu-title {
  min-height: 42px;
  display: flex;
  align-items: center;
  margin-block: 4px;
  border-radius: 9px;
}

.gd-sidebar-menu
.ant-menu-item-selected {
  box-shadow:
    0 8px 22px
    rgba(37, 99, 235, 0.24);
}


/* =========================================================
   HEADER
   ========================================================= */

.gd-app-header {
  position: sticky;
  top: 0;
  z-index: 18;
  height: 68px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding:
    0 24px !important;
  border-bottom:
    1px solid
    rgba(148, 163, 184, 0.16);
  background:
    rgba(255, 255, 255, 0.92) !important;
  backdrop-filter:
    blur(16px);
}

[data-gd-theme='dark']
.gd-app-header {
  background:
    rgba(20, 20, 20, 0.92) !important;
}

.gd-header-left,
.gd-header-actions {
  display: flex;
  align-items: center;
}

.gd-header-left {
  min-width: 0;
  gap: 10px;
}

.gd-header-actions {
  flex: 0 0 auto;
  gap: 4px;
}

.gd-header-breadcrumb {
  min-width: 0;
  max-width: 52vw;
  overflow: hidden;
}

.gd-header-breadcrumb
.ant-breadcrumb {
  white-space: nowrap;
}

.gd-header-divider {
  height: 26px !important;
  margin:
    0 6px !important;
}

.gd-user-button.ant-btn {
  height: auto;
  padding:
    5px 8px;
}

.gd-user-copy {
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.15;
  text-align: left;
}

.gd-user-copy
.ant-typography {
  width: 100%;
}

.gd-user-role {
  margin-top: 4px;
  font-size: 11px;
}


/* =========================================================
   CONTENT
   ========================================================= */

.gd-app-content {
  min-width: 0;
  background: #f5f7fb;
}

[data-gd-theme='dark']
.gd-app-content {
  background: #0b1120;
}

.gd-content-inner {
  width: 100%;
  min-width: 0;
  max-width: 1720px;
  margin: 0 auto;
  padding: 26px 28px 40px;
}


/* =========================================================
   MOBILE DRAWER
   ========================================================= */

.gd-mobile-drawer
.ant-drawer-content {
  background: #001529;
}

.gd-mobile-sidebar {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #001529;
}

.gd-mobile-sidebar-brand {
  height: 76px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding:
    0 18px;
  border-bottom:
    1px solid
    rgba(255, 255, 255, 0.08);
}

.gd-mobile-sidebar-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding:
    10px 8px
    24px;
}


/* =========================================================
   OLD PAGE COMPATIBILITY
   ========================================================= */

/*
 * Durante la migración todavía existen páginas con CSS previo.
 * Este contenedor evita que el nuevo Layout fuerce anchos
 * o alturas incompatibles.
 */

.gd-content-inner > * {
  max-width: 100%;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-app-header {
    height: 62px !important;
    padding:
      0 12px !important;
  }

  .gd-header-breadcrumb {
    max-width: 45vw;
  }

  .gd-header-breadcrumb
  .ant-breadcrumb {
    font-size: 12px;
  }

  .gd-header-divider {
    display: none;
  }

  .gd-content-inner {
    padding:
      18px 14px
      32px;
  }
}

@media (max-width: 480px) {
  .gd-header-breadcrumb {
    display: none;
  }

  .gd-content-inner {
    padding:
      14px 10px
      28px;
  }
}



/* =========================================================
   SIDEBAR - BUSINESS FLOW SECTIONS
   ========================================================= */

.gd-sidebar-menu
.gd-sidebar-section.ant-menu-item-disabled {
  min-height: 28px;
  height: 28px;
  margin:
    12px 8px
    2px;
  padding-inline:
    14px !important;
  cursor: default;
  opacity: 1;
  pointer-events: none;
}

.gd-sidebar-menu
.gd-sidebar-section.ant-menu-item-disabled
.ant-menu-title-content {
  color:
    rgba(255, 255, 255, 0.34) !important;
  font-size: 10px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.09em;
}



<<<END OF FILE>>>


---

## FILE: src\styles\login.css

<<<START OF FILE>>>

.gd-login-page {
  --gd-login-accent: #2563eb;
  --gd-login-accent-2: #60a5fa;
  --gd-login-bg: #f4f7fb;
  --gd-login-panel: #0f172a;
  --gd-login-panel-secondary: #172554;

  position: relative;
  min-height: 100dvh;
  overflow: hidden;
  background: var(--gd-login-bg);
}

[data-gd-theme='dark'] .gd-login-page {
  --gd-login-bg: #0b1120;
  --gd-login-panel: #020617;
  --gd-login-panel-secondary: #172554;
}

.gd-login-theme {
  position: fixed;
  z-index: 20;
  top: 20px;
  right: 20px;
}

.gd-login-shell {
  min-height: 100dvh;
}


/* =========================================================
   BRAND
   ========================================================= */

.gd-login-brand-column {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 20% 20%,
      rgba(96, 165, 250, 0.30),
      transparent 30%
    ),
    radial-gradient(
      circle at 85% 75%,
      rgba(37, 99, 235, 0.32),
      transparent 30%
    ),
    linear-gradient(
      145deg,
      var(--gd-login-panel),
      var(--gd-login-panel-secondary)
    );
}

.gd-login-brand-column::before,
.gd-login-brand-column::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  border:
    1px solid
    rgba(255, 255, 255, 0.08);
}

.gd-login-brand-column::before {
  width: 420px;
  height: 420px;
  left: -180px;
  bottom: -160px;
}

.gd-login-brand-column::after {
  width: 300px;
  height: 300px;
  right: -130px;
  top: -120px;
}

.gd-login-brand-content {
  position: relative;
  z-index: 2;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding:
    clamp(56px, 8vw, 110px)
    clamp(44px, 7vw, 96px);
}

.gd-login-logo {
  background:
    linear-gradient(
      135deg,
      #2563eb,
      #60a5fa
    ) !important;
  box-shadow:
    0 16px 40px
    rgba(37, 99, 235, 0.28);
}

.gd-login-brand-tag {
  margin-bottom: 20px !important;
  background:
    rgba(255, 255, 255, 0.10) !important;
  color: #dbeafe !important;
}

.gd-login-brand-title.ant-typography {
  margin:
    0 0 16px !important;
  color: #ffffff !important;
  font-size:
    clamp(42px, 5vw, 68px);
  letter-spacing: -0.045em;
}

.gd-login-brand-description.ant-typography {
  max-width: 540px;
  margin: 0 !important;
  color:
    rgba(255, 255, 255, 0.72) !important;
  font-size:
    clamp(16px, 1.5vw, 20px);
  line-height: 1.65;
}

.gd-login-brand-footer {
  color:
    rgba(255, 255, 255, 0.48) !important;
}


/* =========================================================
   FORM
   ========================================================= */

.gd-login-form-column {
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding:
    72px
    clamp(24px, 6vw, 84px)
    44px;
}

.gd-login-form-container {
  width: 100%;
  max-width: 480px;
}

.gd-login-card.ant-card {
  width: 100%;
  border-radius: 20px;
  box-shadow:
    0 24px 70px
    rgba(15, 23, 42, 0.10);
}

[data-gd-theme='dark']
.gd-login-card.ant-card {
  box-shadow:
    0 24px 70px
    rgba(0, 0, 0, 0.28);
}

.gd-login-card
.ant-card-body {
  padding: 36px;
}

.gd-login-heading {
  width: 100%;
  margin-bottom: 30px;
}

.gd-login-title.ant-typography {
  margin: 0 !important;
  letter-spacing: -0.025em;
}

.gd-login-form
.ant-form-item {
  margin-bottom: 20px;
}

.gd-login-form
.ant-form-item-label {
  padding-bottom: 6px;
}

.gd-login-form
.ant-input-affix-wrapper {
  min-height: 48px;
}

.gd-login-submit-item.ant-form-item {
  margin:
    28px 0 0;
}

.gd-login-submit-item
.ant-btn {
  min-height: 48px;
  font-weight: 700;
}

.gd-login-security {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top:
    1px solid
    rgba(148, 163, 184, 0.18);
  text-align: center;
}

.gd-login-version {
  display: block;
  margin-top: 18px;
  text-align: center;
  font-size: 12px;
}

.gd-login-mobile-brand {
  display: none;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
}

.gd-login-mobile-title.ant-typography {
  margin: 0 !important;
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 767px) {
  .gd-login-page {
    background:
      radial-gradient(
        circle at 50% -10%,
        rgba(37, 99, 235, 0.14),
        transparent 42%
      ),
      var(--gd-login-bg);
  }

  .gd-login-theme {
    top: 12px;
    right: 12px;
  }

  .gd-login-form-column {
    min-height: 100dvh;
    padding:
      72px
      18px
      26px;
  }

  .gd-login-form-container {
    max-width: 430px;
  }

  .gd-login-mobile-brand {
    display: flex;
  }

  .gd-login-card
  .ant-card-body {
    padding:
      28px
      22px;
  }

  .gd-login-heading {
    margin-bottom: 24px;
  }

  .gd-login-security {
    align-items: flex-start;
    text-align: left;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\mermas.css

<<<START OF FILE>>>

.merma-page {
  width: 100%;
  min-width: 0;
}

.merma-header {
  align-items: center;
}


/* =========================================================
   LISTADO
   ========================================================= */

.merma-filtros {
  display: grid;
  grid-template-columns:
    minmax(260px, 1.7fr)
    minmax(160px, 0.8fr)
    minmax(160px, 0.8fr)
    auto
    auto;
  gap: 12px;
  align-items: end;
  padding: 18px;
  margin-bottom: 20px;
  border-radius: 16px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.merma-filtros label {
  display: block;
  margin-bottom: 6px;
  font-weight: 700;
}

.merma-filtros input {
  width: 100%;
  box-sizing: border-box;
}

.merma-tabla-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 16px;
}

.merma-tabla-header h3,
.merma-tabla-header p {
  margin: 0;
}

.merma-tabla-header p {
  margin-top: 4px;
  color: #64748b;
}

.merma-cantidad {
  color: #b91c1c;
}


/* =========================================================
   FORMULARIO
   ========================================================= */

.merma-form {
  width: 100%;
  box-sizing: border-box;
  padding: 26px 28px;
  border-radius: 16px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.merma-seccion + .merma-seccion {
  margin-top: 28px;
  padding-top: 26px;
  border-top: 1px solid #e5e7eb;
}

.merma-seccion-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  margin-bottom: 18px;
}

.merma-seccion-header h3,
.merma-seccion-header p {
  margin: 0;
}

.merma-seccion-header p {
  margin-top: 4px;
  color: #64748b;
}

.merma-cabecera-grid {
  display: grid;
  grid-template-columns:
    minmax(220px, 0.7fr)
    minmax(320px, 2fr);
  gap: 18px;
}

.merma-cabecera-grid > div {
  min-width: 0;
}

.merma-cabecera-grid label,
.merma-item-grid label {
  display: block;
  margin-bottom: 6px;
  font-weight: 700;
}

.merma-cabecera-grid input,
.merma-cabecera-grid textarea,
.merma-item-grid input,
.merma-item-grid select {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.merma-cabecera-grid textarea {
  resize: vertical;
}

.merma-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.merma-item-card {
  padding: 18px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #f8fafc;
}

.merma-item-header {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
  margin-bottom: 15px;
}

.merma-item-grid {
  display: grid;
  grid-template-columns:
    minmax(180px, 1fr)
    minmax(160px, 1fr)
    minmax(190px, 1fr)
    minmax(240px, 1.4fr);
  gap: 14px;
  align-items: end;
}

.merma-input-unidad {
  display: grid;
  grid-template-columns:
    minmax(100px, 1fr)
    54px;
}

.merma-input-unidad input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.merma-input-unidad span {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-left: 0;
  border-radius: 0 8px 8px 0;
  background: #e5e7eb;
  color: #374151;
  font-weight: 700;
}

.merma-stock-resumen {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 14px;
}

.merma-stock-resumen > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 11px 12px;
  border-radius: 10px;
  background: white;
  border: 1px solid #e5e7eb;
}

.merma-stock-resumen span {
  color: #64748b;
  font-size: 0.82rem;
}

.merma-saldo-ok {
  color: #047857;
}

.merma-saldo-error {
  color: #b91c1c;
}

.merma-alerta {
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  font-weight: 600;
}

.merma-alerta-error {
  color: #991b1b;
  background: #fee2e2;
}

.merma-alerta-warning {
  color: #92400e;
  background: #fef3c7;
}

.merma-total {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  margin-top: 24px;
  padding: 18px 21px;
  border-radius: 12px;
  background: #f1f5f9;
}

.merma-total > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.merma-total span {
  font-weight: 700;
}

.merma-total small {
  color: #64748b;
}

.merma-total strong {
  color: #b91c1c;
  font-size: 1.4rem;
}

.merma-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}


/* =========================================================
   DETALLE
   ========================================================= */

.merma-detalle-kpis {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.merma-detalle-kpis > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px;
  border-radius: 14px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.merma-detalle-kpis span {
  color: #64748b;
  font-size: 0.86rem;
}

.merma-detalle-kpis strong {
  font-size: 1.04rem;
}

.merma-observacion-general {
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 11px;
  background: #f8fafc;
  color: #475569;
}

.merma-detalles {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 18px;
}

.merma-detalle-card {
  padding: 20px;
  border-radius: 16px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.merma-detalle-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.merma-detalle-header span {
  color: #64748b;
  font-size: 0.82rem;
  font-weight: 700;
}

.merma-detalle-header h3 {
  margin: 4px 0 0;
}

.merma-item-nota {
  margin-top: 13px;
  padding: 11px 13px;
  border-radius: 9px;
  color: #475569;
  background: #f8fafc;
}

.merma-fifo {
  margin-top: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 11px;
  overflow: hidden;
}

.merma-fifo > summary {
  cursor: pointer;
  list-style: none;
  padding: 13px 15px;
  color: #1d4ed8;
  font-weight: 700;
  background: #f8fafc;
}

.merma-fifo > summary::-webkit-details-marker {
  display: none;
}

.merma-fifo > summary::after {
  content: '▾';
  float: right;
}

.merma-fifo[open] > summary::after {
  content: '▴';
}

.merma-fifo-contenido {
  padding: 15px;
  border-top: 1px solid #e2e8f0;
}

.merma-fifo-header {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 12px;
}

.merma-fifo-header h4,
.merma-fifo-header p {
  margin: 0;
}

.merma-fifo-header p {
  margin-top: 4px;
  color: #64748b;
}

.merma-fifo-header > span {
  color: #64748b;
  font-size: 0.86rem;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1200px) {
  .merma-item-grid {
    grid-template-columns:
      repeat(2, minmax(180px, 1fr));
  }

  .merma-detalle-kpis {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 800px) {
  .merma-filtros,
  .merma-cabecera-grid,
  .merma-item-grid,
  .merma-stock-resumen,
  .merma-detalle-kpis {
    grid-template-columns: 1fr;
  }

  .merma-seccion-header,
  .merma-item-header,
  .merma-total,
  .merma-actions,
  .merma-detalle-header,
  .merma-fifo-header,
  .merma-tabla-header {
    flex-direction: column;
    align-items: stretch;
  }

  .merma-form {
    padding: 18px;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\mermasAntd.css

<<<START OF FILE>>>

.gd-merma-page {
  width: 100%;
  min-width: 0;
}

.gd-merma-section-card {
  margin-bottom: 18px;
}

.gd-merma-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-merma-filter-actions
.ant-form-item-control-input-content {
  display: flex;
  align-items: center;
}

.gd-merma-main-rule {
  margin-bottom: 16px;
}

.gd-merma-items-space {
  width: 100%;
}

.gd-merma-item-card.ant-card,
.gd-merma-detail-card.ant-card {
  width: 100%;
}

.gd-merma-stock-summary {
  margin-bottom: 12px;
}

.gd-merma-stock-summary
.ant-card {
  height: 100%;
}

.gd-merma-stock-summary
.ant-statistic-content {
  font-size: 19px;
}

.gd-merma-stock-progress {
  margin-bottom: 14px;
}

.gd-merma-total-card {
  margin-bottom: 18px;
}

.gd-merma-total-grid {
  display: grid;
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );
  gap: 18px;
}

.gd-merma-total-grid
.ant-statistic-content {
  font-size: 23px;
}

.gd-merma-actions {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 6px;
}

.gd-merma-detail-stats {
  display: grid;
  grid-template-columns:
    repeat(
      4,
      minmax(0, 1fr)
    );
  gap: 16px;
  margin-bottom: 18px;
}

.gd-merma-detail-stats
.ant-card {
  height: 100%;
}

.gd-merma-detail-stats
.ant-statistic-content {
  font-size: 20px;
}

.gd-merma-detail-title {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-merma-detail-amount {
  font-size: 16px;
}

.gd-merma-detail-observation {
  margin-bottom: 14px;
}

.gd-merma-fifo-table {
  margin-top: 14px;
}

.gd-full-width {
  width: 100%;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-merma-page
.ant-card,
[data-gd-theme='light']
.gd-merma-page
.ant-collapse {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-merma-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-merma-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-merma-filter-actions
  .ant-space {
    width: 100%;
  }

  .gd-merma-filter-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-merma-filter-actions
  .ant-btn {
    width: 100%;
  }

  .gd-merma-total-grid,
  .gd-merma-detail-stats {
    grid-template-columns:
      1fr;
  }

  .gd-merma-actions {
    justify-content: stretch;
  }

  .gd-merma-actions
  .ant-space {
    width: 100%;
  }

  .gd-merma-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-merma-actions
  .ant-btn {
    width: 100%;
  }

  .gd-merma-detail-card
  .ant-card-head-wrapper {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}

@media (
  min-width: 768px
) and (
  max-width: 1199px
) {
  .gd-merma-detail-stats {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\pedidos.css

<<<START OF FILE>>>

.pedidos-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pedidos-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pedidos-header h1 {
  margin: 0;
}

.pedidos-header p {
  color: #64748b;
  margin: 6px 0 0 0;
}

.pedidos-actions {
  display: flex;
  gap: 10px;
}

.pedidos-filtros {
  background: white;
  border-radius: 16px;
  padding: 18px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 14px;
  align-items: end;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}

.pedidos-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}

.estado-pill {
  display: inline-block;
  padding: 7px 12px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 13px;
}

.estado-registrado {
  background: #dbeafe;
  color: #1d4ed8;
}

.estado-parcial {
  background: #fef3c7;
  color: #92400e;
}

.estado-entregado {
  background: #dcfce7;
  color: #166534;
}

.estado-cancelado {
  background: #fee2e2;
  color: #991b1b;
}

.tabla-acciones {
  display: flex;
  gap: 8px;
}

.btn-outline {
  background: white;
  color: #2563eb;
  border: 1px solid #2563eb;
}

.btn-outline:hover {
  background: #eff6ff;
}

.feedback-toast {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 2000;
  min-width: 320px;
  max-width: 520px;
  padding: 14px 16px;
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.20);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
}

.feedback-toast button {
  background: transparent;
  color: inherit;
  font-size: 22px;
  padding: 0 0 0 16px;
}

.feedback-success {
  background: #dcfce7;
  color: #166534;
}

.feedback-error {
  background: #fee2e2;
  color: #991b1b;
}

.feedback-info {
  background: #dbeafe;
  color: #1d4ed8;
}

.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  z-index: 1900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-card {
  width: 420px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.25);
}

.dialog-card h3 {
  margin-top: 0;
}

.dialog-card p {
  color: #475569;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 900px) {
  .pedidos-filtros {
    grid-template-columns: 1fr;
  }

  .pedidos-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
.pedido-datos-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(240px, 1fr));
  gap: 16px;
}

.pedido-descripcion-full {
  grid-column: 1 / -1;
}

.pedido-descripcion-full textarea {
  width: 100%;
  resize: vertical;
}

.pedido-productos-section {
  margin-top: 28px;
}

.pedido-productos-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.detalle-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 18px;
}

.detalle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.detalle-grid-5 {
  display: grid;
  grid-template-columns: repeat(5, minmax(150px, 1fr));
  gap: 14px;
}

.detalle-grid-5 > div {
  display: flex;
  flex-direction: column;
}

.detalle-textos-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 14px;
}

.detalle-textos-grid > div {
  display: flex;
  flex-direction: column;
}

.pedido-form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.feedback-toast {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 9999;
  min-width: 320px;
  max-width: 480px;
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.22);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  animation: feedbackEntrada 0.25s ease-out;
}

.feedback-toast strong {
  display: block;
  margin-bottom: 4px;
}

.feedback-toast p {
  margin: 0;
  line-height: 1.35;
}

.feedback-toast button {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 22px;
  cursor: pointer;
  padding: 0;
}

.feedback-success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.feedback-error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.feedback-info {
  background: #dbeafe;
  color: #1d4ed8;
  border: 1px solid #93c5fd;
}

.feedback-warning {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fcd34d;
}

@keyframes feedbackEntrada {
  from {
    transform: translateY(-12px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 1200px) {
  .detalle-grid-5 {
    grid-template-columns: repeat(3, minmax(150px, 1fr));
  }
}

@media (max-width: 800px) {
  .pedido-datos-grid,
  .detalle-textos-grid {
    grid-template-columns: 1fr;
  }

  .detalle-grid-5 {
    grid-template-columns: 1fr;
  }

  .feedback-toast {
    left: 14px;
    right: 14px;
    max-width: none;
    min-width: auto;
  }
}
.cantidades-resumen {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}

.cantidad-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #f1f5f9;
  border: 1px solid #dbe3ee;
  color: #0f172a;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  line-height: 1;
  white-space: nowrap;
}

.cantidad-pill strong {
  font-size: 13px;
  font-weight: 800;
}

.cantidad-pill small {
  font-size: 12px;
  font-weight: 700;
  color: #475569;
}
/* =========================================================
   FEEDBACK WARNING
   ========================================================= */

.feedback-warning {
  background: #fef3c7;
  color: #92400e;
}


/* =========================================================
   GASTOS
   ========================================================= */

.gastos-config-grid {
  display: grid;
  grid-template-columns:
    minmax(260px, 0.7fr)
    minmax(0, 1.8fr);
  gap: 20px;
  align-items: start;
}


.gasto-tipo-card {
  max-width: 100%;
  margin-bottom: 0;
}


.gasto-form-card {
  max-width: 100%;
  margin-bottom: 0;
}


.gasto-form-grid {
  display: grid;
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );
  gap: 4px 16px;
}


.gasto-campo-completo {
  grid-column: 1 / -1;
}


.gasto-form-actions {
  margin-top: 14px;
  display: flex;
  justify-content: flex-end;
}


.gasto-form-actions button {
  min-width: 180px;
}


.gasto-auditoria-card {
  background: white;
  border-radius: 14px;
  padding: 18px;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);

  display: grid;
  grid-template-columns:
    repeat(
      4,
      minmax(0, 1fr)
    );
  gap: 14px;
}


.gasto-auditoria-card > div {
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}


.gasto-auditoria-card span {
  display: block;
  color: #64748b;
  font-size: 13px;
  margin-bottom: 6px;
}


.gasto-auditoria-card strong {
  display: block;
  color: #111827;
}


.tabla-responsive {
  width: 100%;
  overflow-x: auto;
}


.tabla-acciones {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}


.tabla-acciones .btn-danger {
  white-space: nowrap;
}


/* =========================================================
   RESPONSIVE GASTOS
   ========================================================= */

@media (max-width: 1000px) {

  .gastos-config-grid {
    grid-template-columns: 1fr;
  }


  .gasto-auditoria-card {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }

}


@media (max-width: 650px) {

  .gasto-form-grid {
    grid-template-columns: 1fr;
  }


  .gasto-campo-completo {
    grid-column: auto;
  }


  .gasto-auditoria-card {
    grid-template-columns: 1fr;
  }


  .gasto-form-actions {
    justify-content: stretch;
  }


  .gasto-form-actions button {
    width: 100%;
  }

}
/* =========================================================
   EDICIÓN DE PRODUCTOS DEL PEDIDO
   ========================================================= */

.pedido-item-entrega-info {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}


.pedido-item-entrega-info > div {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px;
}


.pedido-item-entrega-info span {
  display: block;
  color: #6b7280;
  font-size: 13px;
  margin-bottom: 5px;
}


.pedido-item-entrega-info strong {
  display: block;
  color: #111827;
}


.pedido-item-aviso-entrega {
  margin-bottom: 16px;
  padding: 12px 14px;
  border-radius: 10px;

  background: #fef3c7;
  color: #92400e;

  border: 1px solid #fde68a;

  font-size: 14px;
  line-height: 1.5;
}


@media (max-width: 750px) {
  .pedido-item-entrega-info {
    grid-template-columns: 1fr;
  }
}

<<<END OF FILE>>>


---

## FILE: src\styles\pedidosAntd.css

<<<START OF FILE>>>

.gd-pedido-page {
  width: 100%;
  min-width: 0;
}

.gd-pedido-filter-card,
.gd-pedido-section-card,
.gd-pedido-products-card {
  margin-bottom: 18px;
}

.gd-pedido-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-pedido-filter-actions
.ant-form-item-control-input-content {
  display: flex;
  align-items: center;
}

.gd-pedido-client-cell,
.gd-pedido-product-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-pedido-products-space {
  width: 100%;
}

.gd-pedido-product-item.ant-card {
  width: 100%;
}

.gd-pedido-delivery-summary {
  margin-bottom: 14px;
}

.gd-pedido-delivery-summary
.ant-card {
  height: 100%;
}

.gd-pedido-delivery-summary
.ant-statistic-content {
  font-size: 20px;
}

.gd-pedido-inline-alert {
  margin-bottom: 16px;
}

.gd-pedido-actions {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 6px;
}

.gd-pedido-detail-alert {
  margin-bottom: 18px;
}

.gd-pedido-summary {
  margin-bottom: 18px;
}

.gd-pedido-summary
.ant-card {
  height: 100%;
}

.gd-pedido-summary
.ant-statistic-content {
  font-size: 19px;
}

.gd-pedido-total-card {
  min-width: 190px;
}

.gd-full-width {
  width: 100%;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-pedido-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-pedido-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-pedido-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-pedido-actions {
    justify-content: stretch;
  }

  .gd-pedido-actions
  .ant-space {
    width: 100%;
  }

  .gd-pedido-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-pedido-actions
  .ant-btn {
    width: 100%;
  }

  .gd-pedido-filter-actions
  .ant-space {
    width: 100%;
  }

  .gd-pedido-filter-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-pedido-filter-actions
  .ant-btn {
    width: 100%;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\producciones.css

<<<START OF FILE>>>

.producciones-page {
  width: 100%;
  min-width: 0;
}

.producciones-header {
  align-items: center;
}

.producciones-page textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 11px 13px;
  border: 1px solid #d1d5db;
  border-radius: 9px;
  font: inherit;
  resize: vertical;
}


/* =========================================================
   LISTADO
   ========================================================= */

.prod-tabla-cabecera {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 16px;
}

.prod-tabla-cabecera h3,
.prod-tabla-cabecera p {
  margin: 0;
}

.prod-tabla-cabecera p {
  margin-top: 4px;
  color: #64748b;
}


/* =========================================================
   FORMULARIO
   ========================================================= */

.prod-form {
  width: 100%;
  box-sizing: border-box;
  padding: 26px 28px;
  border-radius: 16px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.prod-seccion + .prod-seccion {
  margin-top: 28px;
  padding-top: 26px;
  border-top: 1px solid #e5e7eb;
}

.prod-seccion-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  margin-bottom: 18px;
}

.prod-seccion-header h3,
.prod-seccion-header p {
  margin: 0;
}

.prod-seccion-header p {
  margin-top: 4px;
  color: #64748b;
}

.prod-cabecera-grid {
  display: grid;
  grid-template-columns:
    minmax(220px, 0.7fr)
    minmax(320px, 2fr);
  gap: 18px;
  align-items: start;
}

.prod-cabecera-grid > div,
.prod-producto-grid > div,
.prod-cantidades-grid > div {
  min-width: 0;
}

.prod-cabecera-grid label,
.prod-producto-grid label,
.prod-cantidades-grid label {
  display: block;
  margin-bottom: 6px;
  font-weight: 700;
}

.prod-cabecera-grid input,
.prod-producto-grid select,
.prod-cantidades-grid input {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.prod-campo-ancho {
  grid-column: 1 / -1;
}


/* =========================================================
   PRODUCTOS
   ========================================================= */

.prod-items {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.prod-item-card {
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  background: #f8fafc;
}

.prod-item-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 17px;
}

.prod-item-header > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.prod-item-header span {
  color: #64748b;
  font-size: 0.88rem;
}

.prod-producto-grid {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(160px, 1fr));
  gap: 14px;
}

.prod-producto-estado {
  margin-top: 12px;
  color: #64748b;
  font-size: 0.9rem;
}

.prod-alerta {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 10px;
  font-weight: 600;
}

.prod-alerta-warning {
  color: #92400e;
  background: #fef3c7;
}


/* =========================================================
   PREVIEW DE COMPOSICION
   ========================================================= */

.prod-composicion-preview {
  margin-top: 16px;
  padding: 16px;
  border-radius: 12px;
  background: white;
  border: 1px solid #dbeafe;
}

.prod-composicion-titulo {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 13px;
}

.prod-composicion-titulo > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.prod-composicion-titulo span {
  color: #64748b;
  font-size: 0.86rem;
}

.prod-badge-ok {
  display: inline-flex;
  align-items: center;
  padding: 5px 9px;
  border-radius: 999px;
  color: #166534 !important;
  background: #dcfce7;
  font-size: 0.76rem !important;
  font-weight: 700;
}

.prod-receta-grid {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(180px, 1fr));
  gap: 10px;
}

.prod-receta-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 12px;
  border-radius: 10px;
  background: #f8fafc;
}

.prod-receta-item > div {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.prod-receta-item span,
.prod-receta-item small {
  color: #64748b;
}

.prod-receta-cantidad {
  align-items: flex-end;
}


/* =========================================================
   CANTIDADES
   ========================================================= */

.prod-cantidades-grid {
  display: grid;
  grid-template-columns:
    minmax(220px, 1fr)
    minmax(220px, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.prod-input-unidad {
  display: grid;
  grid-template-columns:
    minmax(120px, 1fr)
    54px;
}

.prod-input-unidad input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.prod-input-unidad span {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  border: 1px solid #d1d5db;
  border-left: 0;
  border-radius: 0 8px 8px 0;
  background: #e5e7eb;
  color: #374151;
  font-weight: 700;
}

.prod-presentaciones-info {
  display: block;
  margin-top: 5px;
  color: #64748b;
}

.prod-total {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  margin-top: 24px;
  padding: 19px 22px;
  border-radius: 12px;
  background: #f1f5f9;
}

.prod-total > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.prod-total span {
  font-weight: 700;
}

.prod-total small {
  color: #64748b;
}

.prod-total strong {
  font-size: 1.45rem;
}

.prod-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}


/* =========================================================
   DETALLE
   ========================================================= */

.prod-detalle-kpis {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.prod-detalle-kpis > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px;
  border-radius: 14px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.prod-detalle-kpis span {
  color: #64748b;
  font-size: 0.86rem;
}

.prod-detalle-kpis strong {
  font-size: 1.04rem;
}

.prod-observacion-general {
  padding: 14px 16px;
  border-radius: 11px;
  background: #eff6ff;
  color: #1e3a8a;
}

.prod-detalles-lista {
  display: flex;
  flex-direction: column;
  gap: 17px;
}

.prod-detalle-card {
  padding: 20px;
  border-radius: 16px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.prod-detalle-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.prod-detalle-card-header h3 {
  margin: 4px 0 0;
}

.prod-detalle-numero {
  color: #64748b;
  font-size: 0.82rem;
  font-weight: 700;
}

.prod-version-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  white-space: nowrap;
  color: #1d4ed8;
  background: #dbeafe;
  font-size: 0.78rem;
  font-weight: 700;
}

.prod-detalle-resumen {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.prod-detalle-resumen > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px 13px;
  border-radius: 10px;
  background: #f8fafc;
}

.prod-detalle-resumen span {
  color: #64748b;
  font-size: 0.82rem;
}

.prod-stock-positivo {
  color: #047857;
}

.prod-item-observacion {
  margin-top: 14px;
  padding: 11px 13px;
  border-radius: 9px;
  background: #f8fafc;
  color: #475569;
}


/* =========================================================
   FIFO
   ========================================================= */

.prod-fifo-details {
  margin-top: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 11px;
  overflow: hidden;
}

.prod-fifo-details > summary {
  cursor: pointer;
  list-style: none;
  padding: 13px 15px;
  color: #1d4ed8;
  font-weight: 700;
  background: #f8fafc;
}

.prod-fifo-details > summary::-webkit-details-marker {
  display: none;
}

.prod-fifo-details > summary::after {
  content: '▾';
  float: right;
}

.prod-fifo-details[open] > summary::after {
  content: '▴';
}

.prod-fifo-contenido {
  padding: 15px;
  border-top: 1px solid #e2e8f0;
}

.prod-fifo-titulo {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
  margin-bottom: 12px;
}

.prod-fifo-titulo h4 {
  margin: 0;
}

.prod-fifo-titulo span {
  color: #64748b;
  font-size: 0.86rem;
}

.prod-consumo-negativo {
  color: #b91c1c;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1200px) {
  .prod-producto-grid,
  .prod-detalle-kpis,
  .prod-detalle-resumen {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .prod-receta-grid {
    grid-template-columns:
      repeat(2, minmax(180px, 1fr));
  }
}

@media (max-width: 760px) {
  .prod-cabecera-grid,
  .prod-producto-grid,
  .prod-cantidades-grid,
  .prod-receta-grid,
  .prod-detalle-kpis,
  .prod-detalle-resumen {
    grid-template-columns: 1fr;
  }

  .prod-seccion-header,
  .prod-item-header,
  .prod-composicion-titulo,
  .prod-total,
  .prod-form-actions,
  .prod-detalle-card-header,
  .prod-fifo-titulo {
    flex-direction: column;
    align-items: stretch;
  }

  .prod-campo-ancho {
    grid-column: auto;
  }

  .prod-form {
    padding: 18px;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\produccionesAntd.css

<<<START OF FILE>>>

.gd-produccion-page {
  width: 100%;
  min-width: 0;
}

.gd-produccion-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-produccion-section-card {
  margin-bottom: 18px;
}

.gd-produccion-products-space {
  width: 100%;
}

.gd-produccion-product-card.ant-card {
  width: 100%;
}

.gd-produccion-inline-alert {
  margin-bottom: 14px;
}

.gd-produccion-recipe-card {
  margin-bottom: 2px;
}

.gd-produccion-recipe-item {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    auto;
  column-gap: 14px;
  row-gap: 8px;
  padding: 12px;
  border-radius: 10px;
  background:
    rgba(148, 163, 184, 0.07);
}

.gd-produccion-recipe-item
> div:first-child {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-produccion-recipe-values {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.gd-produccion-recipe-item
.ant-progress {
  grid-column:
    1 / -1;
}

.gd-produccion-total-card {
  margin-bottom: 18px;
}

.gd-produccion-total {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
}

.gd-produccion-total-title.ant-typography {
  margin:
    0 0 2px !important;
}

.gd-produccion-total-value {
  font-size: 26px;
}

.gd-produccion-actions {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 6px;
}

.gd-full-width {
  width: 100%;
}


/* =========================================================
   DETALLE
   ========================================================= */

.gd-produccion-summary {
  margin-bottom: 18px;
}

.gd-produccion-stat-card.ant-card {
  height: 100%;
}

.gd-produccion-stat-card
.ant-statistic-content {
  font-size: 21px;
}

.gd-produccion-detail-alert {
  margin-bottom: 18px;
}

.gd-produccion-detail-product.ant-card {
  width: 100%;
}

.gd-produccion-product-note {
  margin-top: 16px;
}

.gd-produccion-fifo-collapse {
  margin-top: 16px;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-produccion-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-produccion-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-produccion-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}

[data-gd-theme='light']
.gd-produccion-recipe-item {
  background: #f8fafc;
  border:
    1px solid
    #e0e6ee;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-produccion-total {
    align-items:
      flex-start;
    flex-direction:
      column;
  }

  .gd-produccion-actions {
    justify-content:
      stretch;
  }

  .gd-produccion-actions
  .ant-space {
    width: 100%;
  }

  .gd-produccion-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-produccion-actions
  .ant-btn {
    width: 100%;
  }

  .gd-produccion-recipe-item {
    grid-template-columns:
      1fr;
  }

  .gd-produccion-recipe-values {
    align-items:
      flex-start;
  }

  .gd-produccion-recipe-item
  .ant-progress {
    grid-column:
      1;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\productosTerminados.css

<<<START OF FILE>>>

.productos-terminados-page {
  width: 100%;
  min-width: 0;
}

.productos-terminados-header {
  align-items: center;
}

.productos-terminados-page textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 11px 13px;
  border: 1px solid #d1d5db;
  border-radius: 9px;
  font: inherit;
  resize: vertical;
}

.pt-filtros {
  display: grid;
  grid-template-columns:
    minmax(260px, 1.8fr)
    repeat(5, minmax(130px, 0.85fr))
    auto
    auto;
  gap: 12px;
  align-items: end;
  padding: 18px;
  margin-bottom: 20px;
  background: white;
  border-radius: 16px;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.pt-filtros > div {
  min-width: 0;
}

.pt-filtros label {
  display: block;
  margin: 0 0 6px;
  font-weight: 700;
}

.pt-filtros input,
.pt-filtros select {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.pt-tabla-cabecera {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 16px;
}

.pt-tabla-cabecera h3,
.pt-tabla-cabecera p {
  margin: 0;
}

.pt-tabla-cabecera p {
  margin-top: 4px;
  color: #64748b;
}

.pt-composicion-estado {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pt-composicion-estado small {
  color: #64748b;
}

.pt-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
}

.pt-badge-ok {
  color: #166534;
  background: #dcfce7;
}

.pt-badge-pendiente {
  color: #92400e;
  background: #fef3c7;
}

.pt-badge-historico {
  color: #475569;
  background: #e2e8f0;
}


/* =========================================================
   REGISTRAR PRODUCTO
   ========================================================= */

.pt-form-registro.form-card {
  width: 100%;
  max-width: 1050px;
  box-sizing: border-box;
  margin: 0;
  padding: 26px;
}

.pt-form-intro h3,
.pt-form-intro p {
  margin: 0;
}

.pt-form-intro p {
  margin-top: 5px;
  color: #64748b;
}

.pt-form-grid {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(220px, 1fr));
  gap: 18px 20px;
  margin-top: 22px;
}

.pt-form-grid > div {
  min-width: 0;
}

.pt-form-grid label {
  display: block;
  margin: 0 0 7px;
  font-weight: 700;
}

.pt-form-grid input,
.pt-form-grid select {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.pt-form-ancho {
  grid-column: 1 / -1;
}

.pt-form-nota {
  margin-top: 20px;
  padding: 14px 16px;
  border-radius: 10px;
  color: #1e3a8a;
  background: #eff6ff;
}

.pt-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
}


/* =========================================================
   DETALLE / IDENTIDAD
   ========================================================= */

.pt-detalle-header {
  align-items: center;
}

.pt-identidad {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.pt-identidad > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px;
  border-radius: 14px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.pt-identidad span {
  color: #64748b;
  font-size: 0.86rem;
}

.pt-identidad strong {
  font-size: 1.05rem;
}


/* =========================================================
   COMPOSICION VIGENTE
   ========================================================= */

.pt-composicion-card {
  padding: 22px;
  margin-bottom: 18px;
  border-radius: 16px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.pt-composicion-card-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  padding-bottom: 18px;
  border-bottom: 1px solid #e5e7eb;
}

.pt-composicion-card-header h3 {
  margin: 10px 0 3px;
}

.pt-composicion-card-header p {
  margin: 0;
  color: #64748b;
}

.pt-total-100 {
  font-size: 1.7rem;
  color: #047857;
}

.pt-composicion-componentes {
  display: flex;
  flex-direction: column;
  gap: 17px;
  margin-top: 20px;
}

.pt-componente-vigente {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pt-componente-linea {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
}

.pt-componente-linea > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pt-componente-linea span {
  color: #64748b;
}

.pt-barra {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #e5e7eb;
}

.pt-barra-progreso {
  height: 100%;
  border-radius: inherit;
  background: #2563eb;
}

.pt-observacion {
  margin-top: 20px;
  padding: 13px 15px;
  border-radius: 10px;
  background: #f8fafc;
  color: #475569;
}

.pt-sin-composicion {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px;
  margin-bottom: 18px;
  border: 1px solid #fde68a;
  border-radius: 16px;
  background: #fffbeb;
}

.pt-sin-composicion-icono {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 52px;
  height: 52px;
  border-radius: 14px;
  background: #fef3c7;
  color: #92400e;
  font-size: 1.35rem;
  font-weight: 800;
}

.pt-sin-composicion h3,
.pt-sin-composicion p {
  margin: 0;
}

.pt-sin-composicion p {
  margin-top: 4px;
  color: #78350f;
}


/* =========================================================
   EDITOR DE COMPOSICION
   ========================================================= */

.pt-editor-composicion {
  padding: 22px;
  margin-bottom: 18px;
  border-radius: 16px;
  background: white;
  box-shadow:
    0 8px 20px
    rgba(15, 23, 42, 0.06);
}

.pt-editor-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e5e7eb;
}

.pt-editor-header h3,
.pt-editor-header p {
  margin: 0;
}

.pt-editor-header p {
  margin-top: 4px;
  color: #64748b;
}

.pt-suma {
  min-width: 105px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #b45309;
}

.pt-suma span {
  font-size: 0.8rem;
}

.pt-suma strong {
  font-size: 1.55rem;
}

.pt-suma-ok {
  color: #047857;
}

.pt-componentes-editor {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 18px;
}

.pt-componente-editor {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 13px;
  background: #f8fafc;
}

.pt-componente-numero {
  margin-bottom: 10px;
  font-weight: 700;
  color: #334155;
}

.pt-componente-campos {
  display: grid;
  grid-template-columns:
    minmax(180px, 1.3fr)
    minmax(160px, 1fr)
    minmax(150px, 0.75fr)
    auto;
  gap: 14px;
  align-items: end;
}

.pt-componente-campos > div {
  min-width: 0;
}

.pt-componente-campos label,
.pt-observacion-editor label {
  display: block;
  margin-bottom: 6px;
  font-weight: 700;
}

.pt-componente-campos select,
.pt-componente-campos input {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.pt-porcentaje-input {
  display: grid;
  grid-template-columns:
    minmax(90px, 1fr)
    42px;
}

.pt-porcentaje-input input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.pt-porcentaje-input span {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-left: 0;
  border-radius: 0 8px 8px 0;
  background: #e5e7eb;
  font-weight: 700;
}

.pt-agregar-componente {
  margin-top: 14px;
}

.pt-observacion-editor {
  margin-top: 20px;
}

.pt-editor-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}


/* =========================================================
   HISTORIAL
   ========================================================= */

.pt-historial {
  margin-top: 18px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1450px) {
  .pt-filtros {
    grid-template-columns:
      repeat(4, minmax(160px, 1fr));
  }

  .pt-filtro-busqueda {
    grid-column: span 2;
  }
}

@media (max-width: 1050px) {
  .pt-identidad {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .pt-componente-campos {
    grid-template-columns:
      repeat(2, minmax(180px, 1fr));
  }
}

@media (max-width: 800px) {
  .pt-filtros,
  .pt-form-grid,
  .pt-identidad,
  .pt-componente-campos {
    grid-template-columns: 1fr;
  }

  .pt-filtro-busqueda,
  .pt-form-ancho {
    grid-column: auto;
  }

  .pt-composicion-card-header,
  .pt-editor-header,
  .pt-form-actions,
  .pt-editor-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .pt-suma {
    align-items: flex-start;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\productosTerminadosAntd.css

<<<START OF FILE>>>

.gd-pt-page {
  width: 100%;
  min-width: 0;
}

.gd-pt-filter-card {
  margin-bottom: 18px;
}

.gd-pt-table-card
.ant-card-body {
  padding-top: 8px;
}

.gd-pt-producto-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-pt-filter-actions-item
.ant-form-item-control-input-content {
  display: flex;
  align-items: center;
}

.gd-pt-form-card.ant-card {
  max-width: 1050px;
}

.gd-pt-form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.gd-pt-detail-card {
  margin-bottom: 18px;
}

.gd-pt-composition-meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.gd-pt-component-card.ant-card {
  height: 100%;
}

.gd-pt-component-head {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 10px;
}

.gd-pt-component-head
> div {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-pt-composition-note {
  margin-top: 16px;
}

.gd-pt-editor-rule {
  margin-bottom: 16px;
}

.gd-pt-list-space {
  width: 100%;
}

.gd-pt-editor-observation {
  margin-top: 18px;
}

.gd-full-width {
  width: 100%;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-pt-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-pt-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-pt-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 767px) {
  .gd-pt-form-actions {
    justify-content: stretch;
  }

  .gd-pt-form-actions
  .ant-space {
    width: 100%;
  }

  .gd-pt-form-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-pt-form-actions
  .ant-btn {
    width: 100%;
  }

  .gd-pt-filter-actions-item
  .ant-space {
    width: 100%;
  }

  .gd-pt-filter-actions-item
  .ant-space-item {
    flex: 1;
  }

  .gd-pt-filter-actions-item
  .ant-btn {
    width: 100%;
  }

  .gd-pt-composition-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\proveedoresAntd.css

<<<START OF FILE>>>

.gd-proveedores-page {
  width: 100%;
  min-width: 0;
}

.gd-proveedores-form-card.ant-card {
  position: sticky;
  top: 92px;
}

.gd-proveedores-table-card
.ant-card-body {
  padding-top: 16px;
}

.gd-proveedores-toolbar {
  display: grid;
  grid-template-columns:
    minmax(240px, 1fr)
    auto;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
}


/* =========================================================
   LIGHT MODE
   ========================================================= */

[data-gd-theme='light']
.gd-proveedores-page
.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-proveedores-page
.ant-card-head {
  border-bottom-color: #d7dee8;
}

[data-gd-theme='light']
.gd-proveedores-page
.ant-table {
  border:
    1px solid
    #e0e6ee;
  border-radius: 10px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1199px) {
  .gd-proveedores-form-card.ant-card {
    position: static;
  }
}

@media (max-width: 767px) {
  .gd-proveedores-toolbar {
    grid-template-columns:
      1fr;
  }

  .gd-proveedores-toolbar
  .ant-btn {
    width: 100%;
  }
}


<<<END OF FILE>>>


---

## FILE: src\styles\usuarios.css

<<<START OF FILE>>>

.gd-usuarios-page {
  width: 100%;
  min-width: 0;
}

.gd-usuarios-card.ant-card {
  height: 100%;
}

.gd-usuarios-role-info {
  margin-top: 2px;
}

.gd-usuarios-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.gd-usuarios-info {
  width: 100%;
}

.gd-usuarios-info-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px;
  border-radius: 12px;
  background:
    rgba(148, 163, 184, 0.08);
}

.gd-usuarios-info-item
> .anticon {
  margin-top: 3px;
  font-size: 18px;
}

.gd-usuarios-info-item
> div {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

[data-gd-theme='light']
.gd-usuarios-card.ant-card {
  border-color: #d7dee8;
}

[data-gd-theme='light']
.gd-usuarios-info-item {
  border:
    1px solid
    #e0e6ee;
  background:
    #f8fafc;
}

@media (max-width: 767px) {
  .gd-usuarios-actions {
    justify-content: stretch;
  }

  .gd-usuarios-actions
  .ant-space {
    width: 100%;
  }

  .gd-usuarios-actions
  .ant-space-item {
    flex: 1;
  }

  .gd-usuarios-actions
  .ant-btn {
    width: 100%;
  }
}


<<<END OF FILE>>>


---

## FILE: src\theme\GestionDrizaThemeProvider.tsx

<<<START OF FILE>>>

import {
  App as AntdApp,
  ConfigProvider
} from 'antd';

import esES
  from 'antd/locale/es_ES';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import type {
  ReactNode
} from 'react';

import {
  getGestionDrizaTheme,
  THEME_STORAGE_KEY
} from './themeConfig';

import type {
  ThemeMode
} from './themeConfig';


type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (
    mode: ThemeMode
  ) => void;
  toggleTheme: () => void;
};


const GestionDrizaThemeContext =
  createContext<
    ThemeContextValue | null
  >(null);


const obtenerTemaInicial =
  (): ThemeMode => {
    const guardado =
      localStorage.getItem(
        THEME_STORAGE_KEY
      );

    if (
      guardado === 'dark' ||
      guardado === 'light'
    ) {
      return guardado;
    }

    return window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
      ? 'dark'
      : 'light';
  };


type Props = {
  children: ReactNode;
};


function GestionDrizaThemeProvider({
  children
}: Props) {
  const [
    mode,
    setMode
  ] = useState<ThemeMode>(
    obtenerTemaInicial
  );


  useEffect(() => {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      mode
    );

    document.documentElement
      .setAttribute(
        'data-gd-theme',
        mode
      );

    document.documentElement
      .style
      .colorScheme = mode;

  }, [
    mode
  ]);


  const value =
    useMemo<ThemeContextValue>(
      () => ({
        mode,

        setMode,

        toggleTheme: () => {
          setMode(
            (actual) =>
              actual === 'light'
                ? 'dark'
                : 'light'
          );
        }
      }),
      [
        mode
      ]
    );


  return (
    <GestionDrizaThemeContext.Provider
      value={value}
    >
      <ConfigProvider
        locale={esES}
        theme={
          getGestionDrizaTheme(
            mode
          )
        }
        form={{
          validateMessages: {
            required:
              '${label} es obligatorio',
            types: {
              email:
                'Ingresa un correo válido'
            }
          }
        }}
      >
        <AntdApp>
          {children}
        </AntdApp>
      </ConfigProvider>
    </GestionDrizaThemeContext.Provider>
  );
}


export const useGestionDrizaTheme =
  () => {
    const context =
      useContext(
        GestionDrizaThemeContext
      );

    if (!context) {
      throw new Error(
        'useGestionDrizaTheme debe utilizarse dentro de GestionDrizaThemeProvider'
      );
    }

    return context;
  };


export default
  GestionDrizaThemeProvider;


<<<END OF FILE>>>


---

## FILE: src\theme\themeConfig.ts

<<<START OF FILE>>>

import type {
  ThemeConfig
} from 'antd';

import {
  theme as antdTheme
} from 'antd';


export type ThemeMode =
  | 'light'
  | 'dark';


export const THEME_STORAGE_KEY =
  'gestiondriza-theme';


export const getGestionDrizaTheme = (
  mode: ThemeMode
): ThemeConfig => ({
  algorithm:
    mode === 'dark'
      ? antdTheme.darkAlgorithm
      : antdTheme.defaultAlgorithm,

  token: {
    colorPrimary: '#2563eb',
    colorInfo: '#2563eb',
    colorSuccess: '#16a34a',
    colorWarning: '#d97706',
    colorError: '#dc2626',

    colorBgLayout:
      mode === 'dark'
        ? '#0b1120'
        : '#eef2f7',

    colorBorderSecondary:
      mode === 'dark'
        ? '#30343b'
        : '#d7dee8',

    colorSplit:
      mode === 'dark'
        ? '#30343b'
        : '#d7dee8',

    borderRadius: 10,
    borderRadiusLG: 16,

    controlHeight: 42,
    controlHeightLG: 48,

    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },

  components: {
    Table: {
      headerBg:
        mode === 'dark'
          ? '#191b20'
          : '#f4f7fb',

      headerColor:
        mode === 'dark'
          ? '#f3f4f6'
          : '#111827',

      headerSplitColor:
        mode === 'dark'
          ? '#343942'
          : '#d7dee8',

      borderColor:
        mode === 'dark'
          ? '#30343b'
          : '#d7dee8',

      rowHoverBg:
        mode === 'dark'
          ? '#242932'
          : '#f2f6fc',

      rowSelectedBg:
        mode === 'dark'
          ? '#172554'
          : '#eaf2ff',

      rowSelectedHoverBg:
        mode === 'dark'
          ? '#1e3a5f'
          : '#dceaff',

      bodySortBg:
        mode === 'dark'
          ? '#1b1f26'
          : '#f7f9fc',

      headerSortActiveBg:
        mode === 'dark'
          ? '#232831'
          : '#e9eef5',

      headerSortHoverBg:
        mode === 'dark'
          ? '#272d36'
          : '#e4eaf2'
    }
  }
});


<<<END OF FILE>>>


---

## FILE: src\utils\formatters.ts

<<<START OF FILE>>>

const numeroFormatter =
  new Intl.NumberFormat(
    'es-PE',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  );


export const formatNumero = (
  valor:
    | number
    | string
    | null
    | undefined
) => {
  const numero =
    Number(
      valor ?? 0
    );

  if (
    !Number.isFinite(
      numero
    )
  ) {
    return '0.00';
  }

  return numeroFormatter
    .format(
      numero
    );
};


export const formatCantidad =
  formatNumero;


export const formatPeso =
  formatNumero;


export const formatPrecio =
  formatNumero;


export const formatMonto =
  formatNumero;


export const formatTotal =
  formatNumero;


<<<END OF FILE>>>


---

## FILE: tsconfig.app.json

<<<START OF FILE>>>

{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}


<<<END OF FILE>>>


---

## FILE: tsconfig.json

<<<START OF FILE>>>

{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}


<<<END OF FILE>>>


---

## FILE: tsconfig.node.json

<<<START OF FILE>>>

{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "esnext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}


<<<END OF FILE>>>


---

## FILE: vite.config.ts

<<<START OF FILE>>>

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


<<<END OF FILE>>>

