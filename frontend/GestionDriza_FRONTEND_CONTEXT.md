# GestionDriza - Frontend Context

> Archivo generado automáticamente.
> No editar manualmente.

## Información

- Proyecto: GestionDriza
- Componente: Frontend
- Fecha de generación: 2026-09-13 18:58:27
- Branch Git: main
- Commit Git: d0d717f362a3f44fb48e6dbb6ac88122a4705711
- Cantidad de archivos incluidos: 73

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
- src\styles\almacenProductoTerminado.css
- src\styles\comprasMateriaPrima.css
- src\styles\entregasStock.css
- src\styles\mermas.css
- src\styles\pedidos.css
- src\styles\producciones.css
- src\styles\productosTerminados.css
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

import type { ChangeEvent } from 'react';

export type ClienteFormData = {
  ruc: string;
  razon_social: string;
  direccion: string;
  telefono: string;
  correo: string;
  agencia_entrega: string;
};

type ClienteFormProps = {
  form: ClienteFormData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  textoBoton: string;
};

function ClienteForm({ form, onChange, textoBoton }: ClienteFormProps) {
  return (
    <>
      <label>RUC</label>
      <input
        name="ruc"
        value={form.ruc}
        onChange={onChange}
        placeholder="RUC del cliente"
      />

      <label>Razón social</label>
      <input
        name="razon_social"
        value={form.razon_social}
        onChange={onChange}
        placeholder="Razón social"
      />

      <label>Dirección</label>
      <input
        name="direccion"
        value={form.direccion}
        onChange={onChange}
        placeholder="Dirección fiscal o comercial"
      />

      <label>Teléfono</label>
      <input
        name="telefono"
        value={form.telefono}
        onChange={onChange}
        placeholder="Teléfono"
      />

      <label>Correo</label>
      <input
        name="correo"
        value={form.correo}
        onChange={onChange}
        placeholder="Correo"
      />

      <label>Agencia de entrega</label>
      <input
        name="agencia_entrega"
        value={form.agencia_entrega}
        onChange={onChange}
        placeholder="Ejemplo: SHALOM, MARVISUR, OLVA"
      />

      <button type="submit">
        {textoBoton}
      </button>
    </>
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

import type {
  ChangeEvent,
  FormEvent
} from 'react';


export type GastoFormData = {
  tipo_gasto_id: string;
  proveedor_id: string;
  fecha_gasto: string;
  monto: string;
  moneda_codigo: string;
  descripcion: string;
  comprobante: string;
};


export const gastoFormVacio: GastoFormData = {
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
  if (!form.tipo_gasto_id) {
    return 'Debe seleccionar un tipo de gasto';
  }

  const monto = Number(form.monto);

  if (
    !Number.isFinite(monto) ||
    monto <= 0
  ) {
    return 'El monto debe ser mayor a 0';
  }

  if (
    !['PEN', 'USD'].includes(
      form.moneda_codigo
    )
  ) {
    return 'Debe seleccionar una moneda válida';
  }

  if (
    exigirFecha &&
    !form.fecha_gasto
  ) {
    return 'La fecha del gasto es obligatoria';
  }

  return null;
};


type GastoFormProps = {
  titulo: string;

  form: GastoFormData;

  tiposGasto: any[];

  proveedores: any[];

  procesando?: boolean;

  textoBoton: string;

  textoProcesando?: string;

  onChange: (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => void;

  onSubmit: (
    e: FormEvent
  ) => void;
};


function GastoForm({
  titulo,
  form,
  tiposGasto,
  proveedores,
  procesando = false,
  textoBoton,
  textoProcesando = 'Procesando...',
  onChange,
  onSubmit
}: GastoFormProps) {
  return (
    <form
      className="form-card pedido-form gasto-form-card"
      onSubmit={onSubmit}
    >
      <h3>{titulo}</h3>

      <div className="gasto-form-grid">

        <div>
          <label>
            Tipo de gasto
          </label>

          <select
            name="tipo_gasto_id"
            value={form.tipo_gasto_id}
            onChange={onChange}
            disabled={procesando}
          >
            <option value="">
              Seleccione tipo
            </option>

            {tiposGasto.map((tipo) => (
              <option
                key={tipo.tipo_gasto_id}
                value={tipo.tipo_gasto_id}
              >
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>


        <div>
          <label>
            Proveedor opcional
          </label>

          <select
            name="proveedor_id"
            value={form.proveedor_id}
            onChange={onChange}
            disabled={procesando}
          >
            <option value="">
              Sin proveedor
            </option>

            {proveedores.map(
              (proveedor) => (
                <option
                  key={
                    proveedor.proveedor_id
                  }
                  value={
                    proveedor.proveedor_id
                  }
                >
                  {proveedor.razon_social}
                  {' - '}
                  {proveedor.ruc}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Fecha de gasto
          </label>

          <input
            type="date"
            name="fecha_gasto"
            value={form.fecha_gasto}
            onChange={onChange}
            disabled={procesando}
          />
        </div>


        <div>
          <label>
            Moneda
          </label>

          <select
            name="moneda_codigo"
            value={form.moneda_codigo}
            onChange={onChange}
            disabled={procesando}
          >
            <option value="PEN">
              Soles
            </option>

            <option value="USD">
              Dólares
            </option>
          </select>
        </div>


        <div>
          <label>
            Monto
          </label>

          <input
            type="number"
            name="monto"
            value={form.monto}
            onChange={onChange}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            disabled={procesando}
          />
        </div>


        <div>
          <label>
            Comprobante
          </label>

          <input
            name="comprobante"
            value={form.comprobante}
            onChange={onChange}
            placeholder="Ejemplo: F001-000123"
            disabled={procesando}
          />
        </div>


        <div className="gasto-campo-completo">
          <label>
            Descripción
          </label>

          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={onChange}
            placeholder="Ejemplo: Pago de luz del local"
            rows={3}
            disabled={procesando}
          />
        </div>

      </div>


      <div className="gasto-form-actions">
        <button
          type="submit"
          disabled={procesando}
        >
          {procesando
            ? textoProcesando
            : textoBoton}
        </button>
      </div>
    </form>
  );
}


export default GastoForm;

<<<END OF FILE>>>


---

## FILE: src\components\pedidos\PedidoItemsEditor.tsx

<<<START OF FILE>>>

import type {
  ChangeEvent
} from 'react';


export type DetallePedidoForm = {
  /*
   * Estos campos solamente existen
   * cuando estamos editando un producto
   * que ya pertenece al pedido.
   */
  pedido_detalle_id?: number;

  cantidad_entregada?: number;

  cantidad_pendiente?: number;

  estado_entrega?: string;

  /*
   * Código visible de la unidad.
   *
   * Ejemplos:
   * KG
   * CONO
   * TUBO
   */
  unidad?: string;


  /* =========================================================
     CAMPOS DEL PRODUCTO
     ========================================================= */

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


type PedidoItemsEditorProps = {
  detalles: DetallePedidoForm[];

  setDetalles: (
    detalles: DetallePedidoForm[]
  ) => void;


  tipos: any[];

  medidas: any[];

  colores: any[];

  materiales: any[];

  unidades: any[];


  titulo?: string;

  textoBotonAgregar?: string;


  /*
   * RegistrarPedido:
   * true
   *
   * Productos existentes:
   * false
   */
  permitirAgregar?: boolean;


  /*
   * RegistrarPedido y productos nuevos:
   * true
   *
   * Productos existentes:
   * false
   *
   * Por ahora no estamos implementando
   * eliminación de productos existentes.
   */
  permitirQuitar?: boolean;


  /*
   * Cuando cantidad_entregada > 0:
   *
   * bloqueamos:
   * - tipo
   * - medida
   * - color
   * - material
   * - unidad
   * - moneda
   *
   * pero seguimos permitiendo:
   * - cantidad
   * - presentación
   * - precio
   * - descripción
   * - observación
   */
  bloquearEstructuraConEntrega?: boolean;


  /*
   * Permite bloquear todo el editor
   * mientras se está enviando
   * el PUT / POST.
   */
  procesando?: boolean;


  /*
   * En EditarPedido mostramos:
   *
   * - cantidad pedida
   * - cantidad entregada
   * - cantidad pendiente
   * - estado
   */
  mostrarResumenEntrega?: boolean;


  onFeedback?: (
    tipo: FeedbackTipo,
    mensaje: string
  ) => void;
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
    '+ Agregar producto',

  permitirAgregar = true,

  permitirQuitar = true,

  bloquearEstructuraConEntrega =
    false,

  procesando = false,

  mostrarResumenEntrega = false,

  onFeedback
}: PedidoItemsEditorProps) {


  /* =========================================================
     CAMBIO DE CAMPOS
     ========================================================= */

  const handleDetalleChange = (
    index: number,

    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {
    if (procesando) {
      return;
    }


    const {
      name,
      value
    } = e.target;


    const nuevosDetalles = [
      ...detalles
    ];


    /*
     * La unidad de presentación sigue
     * automáticamente la unidad principal.
     *
     * Conservamos esta lógica actual
     * del sistema.
     */
    if (
      name ===
      'unidad_medida_id'
    ) {
      nuevosDetalles[index] = {
        ...nuevosDetalles[index],

        unidad_medida_id:
          value,

        unidad_presentacion_id:
          value
      };

    } else {
      nuevosDetalles[index] = {
        ...nuevosDetalles[index],

        [name]:
          value
      };
    }


    setDetalles(
      nuevosDetalles
    );
  };


  /* =========================================================
     AGREGAR PRODUCTO
     ========================================================= */

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


  /* =========================================================
     QUITAR PRODUCTO
     ========================================================= */

  const quitarDetalle = (
    index: number
  ) => {
    if (
      procesando ||
      !permitirQuitar
    ) {
      return;
    }


    /*
     * Debe mantenerse por lo menos
     * una fila en el editor.
     */
    if (
      detalles.length === 1
    ) {
      onFeedback?.(
        'error',
        'Debe existir al menos un producto en el pedido'
      );

      return;
    }


    setDetalles(
      detalles.filter(
        (_, i) =>
          i !== index
      )
    );


    onFeedback?.(
      'warning',
      'Producto retirado del pedido'
    );
  };


  /* =========================================================
     SUBTOTAL
     ========================================================= */

  const calcularSubtotal = (
    detalle: DetallePedidoForm
  ) => {
    const cantidad =
      Number(
        detalle.cantidad_pedida ||
        0
      );


    const precio =
      Number(
        detalle.precio_unitario ||
        0
      );


    return (
      cantidad *
      precio
    );
  };


  /* =========================================================
     CLASE DE ESTADO
     ========================================================= */

  const claseEstado = (
    estado: string
  ) => {
    if (
      estado === 'COMPLETO'
    ) {
      return (
        'estado estado-completo'
      );
    }


    if (
      estado === 'PARCIAL'
    ) {
      return (
        'estado estado-parcial'
      );
    }


    return (
      'estado estado-pendiente'
    );
  };


  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="pedido-productos-section">


      {/* =====================================================
          CABECERA
          ===================================================== */}

      <div className="pedido-productos-header">

        <h3>
          {titulo}
        </h3>


        {permitirAgregar && (
          <button
            type="button"
            onClick={
              agregarDetalle
            }
            disabled={
              procesando
            }
          >
            {
              textoBotonAgregar
            }
          </button>
        )}

      </div>


      {/* =====================================================
          PRODUCTOS
          ===================================================== */}

      {detalles.map(
        (
          detalle,
          index
        ) => {

          /* =================================================
             CANTIDADES ACTUALES
             ================================================= */

          const cantidadEntregada =
            Number(
              detalle.cantidad_entregada ||
              0
            );


          const cantidadPedidaActual =
            Number(
              detalle.cantidad_pedida ||
              0
            );


          /*
           * IMPORTANTE:
           *
           * Este valor NO utiliza
           * detalle.cantidad_pendiente.
           *
           * Lo calculamos en tiempo real
           * porque cantidad_pedida puede estar
           * siendo modificada en pantalla.
           */
          const cantidadPendienteActual =
            cantidadPedidaActual -
            cantidadEntregada;


          /* =================================================
             ESTADO EN TIEMPO REAL
             ================================================= */

          let estadoActual =
            'PENDIENTE';


          if (
            cantidadEntregada > 0 &&
            cantidadPedidaActual > 0 &&
            cantidadEntregada >=
              cantidadPedidaActual
          ) {
            estadoActual =
              'COMPLETO';

          } else if (
            cantidadEntregada > 0
          ) {
            estadoActual =
              'PARCIAL';
          }


          /* =================================================
             BLOQUEO ESTRUCTURAL
             ================================================= */

          /*
           * Si el producto ya tuvo entregas:
           *
           * NO:
           * - tipo
           * - medida
           * - color
           * - material
           * - unidad
           * - moneda
           *
           * SÍ:
           * - cantidad
           * - presentación
           * - precio
           * - descripción
           * - observación
           */
          const estructuraBloqueada =
            procesando ||
            (
              bloquearEstructuraConEntrega &&
              cantidadEntregada > 0
            );


          /* =================================================
             CANTIDAD MÍNIMA
             ================================================= */

          /*
           * Si ya entregamos 80 KG,
           * visualmente el input tendrá:
           *
           * min = 80
           *
           * El backend sigue siendo la
           * validación definitiva.
           */
          const cantidadMinima =
            cantidadEntregada > 0
              ? cantidadEntregada
              : 0.001;


          return (
            <div
              className="detalle-card"

              key={
                detalle
                  .pedido_detalle_id ??
                index
              }
            >


              {/* =============================================
                  CABECERA DEL PRODUCTO
                  ============================================= */}

              <div className="detalle-header">

                <div>

                  <strong>
                    {
                      detalle
                        .pedido_detalle_id
                        ? `Producto registrado #${detalle.pedido_detalle_id}`
                        : `Producto ${index + 1}`
                    }
                  </strong>


                  {mostrarResumenEntrega &&
                    detalle.pedido_detalle_id && (
                      <>
                        {' '}

                        <span
                          className={
                            claseEstado(
                              estadoActual
                            )
                          }
                        >
                          {
                            estadoActual
                          }
                        </span>
                      </>
                    )}

                </div>


                {permitirQuitar && (
                  <button
                    type="button"

                    className="btn-danger"

                    onClick={() =>
                      quitarDetalle(
                        index
                      )
                    }

                    disabled={
                      procesando
                    }
                  >
                    Quitar
                  </button>
                )}

              </div>


              {/* =============================================
                  INFORMACIÓN DE ENTREGA
                  ============================================= */}

              {mostrarResumenEntrega &&
                detalle.pedido_detalle_id && (

                  <div className="pedido-item-entrega-info">


                    {/* PEDIDO */}

                    <div>

                      <span>
                        Pedido actual
                      </span>

                      <strong>
                        {
                          detalle
                            .cantidad_pedida ||
                          0
                        }
                        {' '}
                        {
                          detalle.unidad ||
                          ''
                        }
                      </strong>

                    </div>


                    {/* ENTREGADO */}

                    <div>

                      <span>
                        Ya entregado
                      </span>

                      <strong>
                        {
                          cantidadEntregada
                        }
                        {' '}
                        {
                          detalle.unidad ||
                          ''
                        }
                      </strong>

                    </div>


                    {/* PENDIENTE */}

                    <div>

                      <span>
                        Pendiente actual
                      </span>

                      <strong>
                        {
                          cantidadPendienteActual
                        }
                        {' '}
                        {
                          detalle.unidad ||
                          ''
                        }
                      </strong>

                    </div>

                  </div>
                )}


              {/* =============================================
                  AVISO DE PRODUCTO CON ENTREGAS
                  ============================================= */}

              {bloquearEstructuraConEntrega &&
                cantidadEntregada > 0 && (

                  <div className="pedido-item-aviso-entrega">

                    Este producto ya tiene{' '}

                    <strong>
                      {cantidadEntregada}{' '}
                      {detalle.unidad || ''}
                    </strong>

                    {' '}entregados.

                    {' '}

                    Puedes modificar la cantidad,
                    presentación, precio,
                    descripción y observación.

                    {' '}

                    La nueva cantidad no puede ser
                    menor a lo ya entregado.

                  </div>
                )}


              {/* =============================================
                  CAMPOS PRINCIPALES
                  ============================================= */}

              <div className="detalle-grid detalle-grid-5">


                {/* ===========================================
                    TIPO
                    =========================================== */}

                <div>

                  <label>
                    Tipo
                  </label>


                  <select
                    name="tipo_producto_id"

                    value={
                      detalle
                        .tipo_producto_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
                    }
                  >

                    <option value="">
                      Seleccione
                    </option>


                    {tipos.map(
                      (tipo) => (

                        <option
                          key={
                            tipo.id
                          }

                          value={
                            tipo.id
                          }
                        >
                          {
                            tipo.nombre
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* ===========================================
                    MEDIDA
                    =========================================== */}

                <div>

                  <label>
                    Medida
                  </label>


                  <select
                    name="medida_id"

                    value={
                      detalle.medida_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
                    }
                  >

                    <option value="">
                      Seleccione
                    </option>


                    {medidas.map(
                      (medida) => (

                        <option
                          key={
                            medida.id
                          }

                          value={
                            medida.id
                          }
                        >
                          {
                            medida.nombre
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* ===========================================
                    COLOR
                    =========================================== */}

                <div>

                  <label>
                    Color
                  </label>


                  <select
                    name="color_id"

                    value={
                      detalle.color_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
                    }
                  >

                    <option value="">
                      Seleccione
                    </option>


                    {colores.map(
                      (color) => (

                        <option
                          key={
                            color.id
                          }

                          value={
                            color.id
                          }
                        >
                          {
                            color.nombre
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* ===========================================
                    MATERIAL
                    =========================================== */}

                <div>

                  <label>
                    Material
                  </label>


                  <select
                    name="material_id"

                    value={
                      detalle.material_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
                    }
                  >

                    <option value="">
                      Seleccione
                    </option>


                    {materiales.map(
                      (material) => (

                        <option
                          key={
                            material.id
                          }

                          value={
                            material.id
                          }
                        >
                          {
                            material.nombre
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* ===========================================
                    CANTIDAD
                    =========================================== */}

                <div>

                  <label>
                    Cantidad total
                  </label>


                  <input
                    type="number"

                    name="cantidad_pedida"

                    value={
                      detalle
                        .cantidad_pedida
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    placeholder="0"

                    min={
                      cantidadMinima
                    }

                    step="0.001"

                    disabled={
                      procesando
                    }
                  />


                  {cantidadEntregada > 0 && (

                    <span className="muted">

                      Mínimo permitido:{' '}

                      {
                        cantidadEntregada
                      }

                      {' '}

                      {
                        detalle.unidad ||
                        ''
                      }

                    </span>

                  )}

                </div>


                {/* ===========================================
                    UNIDAD
                    =========================================== */}

                <div>

                  <label>
                    Unidad
                  </label>


                  <select
                    name="unidad_medida_id"

                    value={
                      detalle
                        .unidad_medida_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
                    }
                  >

                    <option value="">
                      Seleccione
                    </option>


                    {unidades.map(
                      (unidad) => (

                        <option
                          key={
                            unidad
                              .unidad_medida_id
                          }

                          value={
                            unidad
                              .unidad_medida_id
                          }
                        >
                          {
                            unidad.codigo
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* ===========================================
                    PRESENTACIÓN
                    =========================================== */}

                <div>

                  <label>
                    Presentación
                  </label>


                  <input
                    type="number"

                    name="cantidad_presentacion"

                    value={
                      detalle
                        .cantidad_presentacion
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    placeholder="0"

                    min="0.001"

                    step="0.001"

                    disabled={
                      procesando
                    }
                  />

                </div>


                {/* ===========================================
                    UNIDAD DE PRESENTACIÓN
                    =========================================== */}

                <div>

                  <label>
                    Unidad presentación
                  </label>


                  <select
                    name="unidad_presentacion_id"

                    value={
                      detalle
                        .unidad_presentacion_id
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    /*
                     * Actualmente la unidad
                     * de presentación sigue
                     * la unidad principal.
                     */
                    disabled
                  >

                    <option value="">
                      Igual a unidad
                    </option>


                    {unidades.map(
                      (unidad) => (

                        <option
                          key={
                            unidad
                              .unidad_medida_id
                          }

                          value={
                            unidad
                              .unidad_medida_id
                          }
                        >
                          {
                            unidad.codigo
                          }
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* ===========================================
                    PRECIO
                    =========================================== */}

                <div>

                  <label>
                    Precio
                  </label>


                  <input
                    type="number"

                    name="precio_unitario"

                    value={
                      detalle
                        .precio_unitario
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    placeholder="0.00"

                    min="0.01"

                    step="0.0001"

                    disabled={
                      procesando
                    }
                  />

                </div>


                {/* ===========================================
                    MONEDA
                    =========================================== */}

                <div>

                  <label>
                    Moneda
                  </label>


                  <select
                    name="moneda_codigo"

                    value={
                      detalle
                        .moneda_codigo
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    disabled={
                      estructuraBloqueada
                    }
                  >

                    <option value="PEN">
                      Soles
                    </option>

                    <option value="USD">
                      Dólares
                    </option>

                  </select>

                </div>


                {/* ===========================================
                    SUBTOTAL
                    =========================================== */}

                <div>

                  <label>
                    Subtotal
                  </label>


                  <input
                    value={
                      calcularSubtotal(
                        detalle
                      ).toFixed(2)
                    }

                    disabled
                  />

                </div>

              </div>


              {/* =============================================
                  DESCRIPCIÓN Y OBSERVACIÓN
                  ============================================= */}

              <div className="detalle-textos-grid">


                {/* DESCRIPCIÓN */}

                <div>

                  <label>
                    Descripción del producto
                  </label>


                  <input
                    name="descripcion_item"

                    value={
                      detalle
                        .descripcion_item
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    placeholder="Ejemplo: DRIZA POLIESTER 1/4 BLANCO"

                    disabled={
                      procesando
                    }
                  />

                </div>


                {/* OBSERVACIÓN */}

                <div>

                  <label>
                    Observación
                  </label>


                  <input
                    name="observacion"

                    value={
                      detalle.observacion
                    }

                    onChange={(e) =>
                      handleDetalleChange(
                        index,
                        e
                      )
                    }

                    placeholder="Observación opcional"

                    disabled={
                      procesando
                    }
                  />

                </div>

              </div>

            </div>
          );
        }
      )}

    </div>
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

import {
  NavLink,
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  useEffect,
  useState
} from 'react';

import {
  cerrarSesion,
  getUsuario
} from '../services/api';


function Sidebar() {
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

  const pedidosActivo =
    location.pathname
      .startsWith(
        '/gestion/pedidos'
      );

  const produccionActivo =
    location.pathname
      .startsWith(
        '/gestion/producciones'
      );

  const comprasActivo =
    location.pathname
      .startsWith(
        '/gestion/compras'
      );

  const almacenActivo =
    location.pathname
      .startsWith(
        '/gestion/almacen'
      ) ||
    location.pathname
      .startsWith(
        '/gestion/mermas'
      );


  const [
    produccionAbierto,
    setProduccionAbierto
  ] = useState(
    produccionActivo
  );
  const [
    pedidosAbierto,
    setPedidosAbierto
  ] = useState(
    pedidosActivo
  );

  const [
    comprasAbierto,
    setComprasAbierto
  ] = useState(
    comprasActivo
  );

  const [
    almacenAbierto,
    setAlmacenAbierto
  ] = useState(
    almacenActivo
  );



  useEffect(() => {
    if (produccionActivo) {
      setProduccionAbierto(
        true
      );
    }
  }, [
    produccionActivo
  ]);


  useEffect(() => {
    if (pedidosActivo) {
      setPedidosAbierto(
        true
      );
    }
  }, [
    pedidosActivo
  ]);


  useEffect(() => {
    if (comprasActivo) {
      setComprasAbierto(
        true
      );
    }
  }, [
    comprasActivo
  ]);


  useEffect(() => {
    if (almacenActivo) {
      setAlmacenAbierto(
        true
      );
    }
  }, [
    almacenActivo
  ]);


  const handleLogout = () => {
    cerrarSesion();

    navigate(
      '/login'
    );
  };


  const linkClass = ({
    isActive
  }: {
    isActive: boolean;
  }) => {
    return isActive
      ? 'sidebar-link sidebar-link-active'
      : 'sidebar-link';
  };


  return (
    <aside className="sidebar">

      <h2>
        Sistema de Gestion
      </h2>


      <p className="usuario">
        {
          usuario
            ?.nombre_completo
        }
      </p>


      <nav>

        <NavLink
          end
          to="/gestion"
          className={linkClass}
        >
          Inicio
        </NavLink>


        {esAdmin && (
          <NavLink
            to="/gestion/usuarios"
            className={linkClass}
          >
            Usuarios
          </NavLink>
        )}


        <NavLink
          to="/gestion/clientes"
          className={linkClass}
        >
          Clientes
        </NavLink>


        <NavLink
          to="/gestion/catalogos"
          className={linkClass}
        >
          Catálogos
        </NavLink>


        <NavLink
          to="/gestion/productos-terminados"
          className={linkClass}
        >
          Productos terminados
        </NavLink>


        {/* =========================
            PRODUCCION
            ========================= */}

        <button
          type="button"
          className={
            produccionActivo
              ? 'sidebar-group-button sidebar-group-active'
              : 'sidebar-group-button'
          }
          onClick={() =>
            setProduccionAbierto(
              !produccionAbierto
            )
          }
        >
          Producción {
            produccionAbierto
              ? '▾'
              : '▸'
          }
        </button>


        {produccionAbierto && (
          <div className="sidebar-submenu">

            <NavLink
              end
              to="/gestion/producciones"
              className={linkClass}
            >
              Historial
            </NavLink>

            <NavLink
              to="/gestion/producciones/registrar"
              className={linkClass}
            >
              Registrar producción
            </NavLink>

          </div>
        )}


        {/* =========================
            PEDIDOS
            ========================= */}

        <button
          type="button"
          className={
            pedidosActivo
              ? 'sidebar-group-button sidebar-group-active'
              : 'sidebar-group-button'
          }
          onClick={() =>
            setPedidosAbierto(
              !pedidosAbierto
            )
          }
        >
          Pedidos {
            pedidosAbierto
              ? '▾'
              : '▸'
          }
        </button>


        {pedidosAbierto && (
          <div className="sidebar-submenu">

            <NavLink
              end
              to="/gestion/pedidos"
              className={linkClass}
            >
              Pedidos totales
            </NavLink>

            <NavLink
              to="/gestion/pedidos/registrar"
              className={linkClass}
            >
              Registrar pedido
            </NavLink>

          </div>
        )}


        <NavLink
          to="/gestion/entregas"
          className={linkClass}
        >
          Registro de Entregas
        </NavLink>


        <NavLink
          to="/gestion/depositos"
          className={linkClass}
        >
          Registro de Depósitos
        </NavLink>


        <NavLink
          to="/gestion/proveedores"
          className={linkClass}
        >
          Proveedores
        </NavLink>


        {/* =========================
            COMPRAS
            ========================= */}

        <button
          type="button"
          className={
            comprasActivo
              ? 'sidebar-group-button sidebar-group-active'
              : 'sidebar-group-button'
          }
          onClick={() =>
            setComprasAbierto(
              !comprasAbierto
            )
          }
        >
          Compras {
            comprasAbierto
              ? '▾'
              : '▸'
          }
        </button>


        {comprasAbierto && (
          <div className="sidebar-submenu">

            <NavLink
              end
              to="/gestion/compras"
              className={linkClass}
            >
              Compras generales
            </NavLink>

            <NavLink
              end
              to="/gestion/compras-materia-prima"
              className={linkClass}
            >
              Materia prima
            </NavLink>

            <NavLink
              to="/gestion/compras-materia-prima/registrar"
              className={linkClass}
            >
              Registrar lote
            </NavLink>

          </div>
        )}


        {/* =========================
            ALMACEN
            ========================= */}

        <button
          type="button"
          className={
            almacenActivo
              ? 'sidebar-group-button sidebar-group-active'
              : 'sidebar-group-button'
          }
          onClick={() =>
            setAlmacenAbierto(
              !almacenAbierto
            )
          }
        >
          Almacén {
            almacenAbierto
              ? '▾'
              : '▸'
          }
        </button>


        {almacenAbierto && (
          <div className="sidebar-submenu">

            <NavLink
              to="/gestion/almacen/materia-prima"
              className={linkClass}
            >
              Materia prima
            </NavLink>

            <NavLink
              to="/gestion/almacen/producto-terminado"
              className={linkClass}
            >
              Producto terminado
            </NavLink>

            <NavLink
              to="/gestion/mermas"
              className={linkClass}
            >
              Mermas
            </NavLink>

          </div>
        )}


        <NavLink
          to="/gestion/gastos"
          className={linkClass}
        >
          Registro de Gastos
        </NavLink>

      </nav>


      <button
        onClick={
          handleLogout
        }
        className="btn-logout"
      >
        Cerrar sesión
      </button>

    </aside>
  );
}


export default Sidebar;


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

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  padding: 12px;
}

th {
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

import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function GestionLayout() {
  return (
    <div className="gestion-layout">
      <Sidebar />

      <main className="contenido">
        <Outlet />
      </main>
    </div>
  );
}

export default GestionLayout;

<<<END OF FILE>>>


---

## FILE: src\main.tsx

<<<START OF FILE>>>

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/pedidos.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

<<<END OF FILE>>>


---

## FILE: src\pages\almacenMateriaPrima\AlmacenMateriaPrima.tsx

<<<START OF FILE>>>

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/almacenMateriaPrima.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Vista =
  | 'RESUMEN'
  | 'LOTES';


type FiltrosResumen = {
  q: string;
  material_id: string;
  color_id: string;
};


type FiltrosLotes = {
  q: string;
  proveedor_id: string;
  estado: string;
};


const filtrosResumenVacios:
  FiltrosResumen = {
  q: '',
  material_id: '',
  color_id: ''
};


const filtrosLotesVacios:
  FiltrosLotes = {
  q: '',
  proveedor_id: '',
  estado: 'TODOS'
};


function AlmacenMateriaPrima() {
  const [
    vista,
    setVista
  ] = useState<Vista>(
    'RESUMEN'
  );

  const [
    indicadores,
    setIndicadores
  ] = useState<any>({
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
  ] = useState<any[]>([]);

  const [
    lotes,
    setLotes
  ] = useState<any[]>([]);

  const [
    cargando,
    setCargando
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
    paginacionResumen,
    setPaginacionResumen
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    paginacionLotes,
    setPaginacionLotes
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    filtrosResumen,
    setFiltrosResumen
  ] = useState<FiltrosResumen>({
    ...filtrosResumenVacios
  });

  const [
    filtrosResumenAplicados,
    setFiltrosResumenAplicados
  ] = useState<FiltrosResumen>({
    ...filtrosResumenVacios
  });

  const [
    filtrosLotes,
    setFiltrosLotes
  ] = useState<FiltrosLotes>({
    ...filtrosLotesVacios
  });

  const [
    filtrosLotesAplicados,
    setFiltrosLotesAplicados
  ] = useState<FiltrosLotes>({
    ...filtrosLotesVacios
  });

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });


  const cargarIndicadores =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/almacen-materia-prima/indicadores'
          );

        setIndicadores(
          data.indicadores || {}
        );
      },
      []
    );


  const cargarCatalogos =
    useCallback(
      async () => {
        const [
          materialesData,
          coloresData,
          proveedoresData
        ] = await Promise.all([
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

        setMateriales(
          materialesData.items ||
          []
        );

        setColores(
          coloresData.items ||
          []
        );

        setProveedores(
          proveedoresData.proveedores ||
          []
        );
      },
      []
    );


  const cargarResumen =
    useCallback(
      async (
        pagina: number,
        filtrosActuales:
          FiltrosResumen
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
          filtrosActuales.q.trim()
        ) {
          params.set(
            'q',
            filtrosActuales.q.trim()
          );
        }

        if (
          filtrosActuales.material_id
        ) {
          params.set(
            'material_id',
            filtrosActuales.material_id
          );
        }

        if (
          filtrosActuales.color_id
        ) {
          params.set(
            'color_id',
            filtrosActuales.color_id
          );
        }

        const data =
          await apiFetch(
            `/almacen-materia-prima/resumen?${params.toString()}`
          );

        setResumen(
          data.resumen || []
        );

        setPaginacionResumen(
          data.paginacion
        );
      },
      []
    );


  const cargarLotes =
    useCallback(
      async (
        pagina: number,
        filtrosActuales:
          FiltrosLotes
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
          'estado',
          filtrosActuales.estado
        );

        if (
          filtrosActuales.q.trim()
        ) {
          params.set(
            'q',
            filtrosActuales.q.trim()
          );
        }

        if (
          filtrosActuales.proveedor_id
        ) {
          params.set(
            'proveedor_id',
            filtrosActuales.proveedor_id
          );
        }

        const data =
          await apiFetch(
            `/almacen-materia-prima/lotes?${params.toString()}`
          );

        setLotes(
          data.lotes || []
        );

        setPaginacionLotes(
          data.paginacion
        );
      },
      []
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarCatalogos(),
            cargarIndicadores(),
            cargarResumen(
              1,
              filtrosResumenVacios
            ),
            cargarLotes(
              1,
              filtrosLotesVacios
            )
          ]);

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarCatalogos,
    cargarIndicadores,
    cargarResumen,
    cargarLotes
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarResumen(
      pageResumen,
      filtrosResumenAplicados
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    pageResumen,
    filtrosResumenAplicados,
    cargarResumen,
    cargando
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarLotes(
      pageLotes,
      filtrosLotesAplicados
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    pageLotes,
    filtrosLotesAplicados,
    cargarLotes,
    cargando
  ]);


  const aplicarFiltrosResumen = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPageResumen(1);

    setFiltrosResumenAplicados({
      q:
        filtrosResumen.q.trim(),
      material_id:
        filtrosResumen.material_id,
      color_id:
        filtrosResumen.color_id
    });
  };


  const limpiarFiltrosResumen =
    () => {
      setFiltrosResumen({
        ...filtrosResumenVacios
      });

      setPageResumen(1);

      setFiltrosResumenAplicados({
        ...filtrosResumenVacios
      });
    };


  const aplicarFiltrosLotes = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPageLotes(1);

    setFiltrosLotesAplicados({
      q:
        filtrosLotes.q.trim(),
      proveedor_id:
        filtrosLotes.proveedor_id,
      estado:
        filtrosLotes.estado
    });
  };


  const limpiarFiltrosLotes =
    () => {
      setFiltrosLotes({
        ...filtrosLotesVacios
      });

      setPageLotes(1);

      setFiltrosLotesAplicados({
        ...filtrosLotesVacios
      });
    };


  const fechaTexto = (
    valor: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return valor.slice(
      0,
      10
    );
  };


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  return (
    <div className="pedidos-page almacen-mp-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <div className="pedidos-header almacen-mp-header">
        <div>
          <h1>
            Almacén de materia prima
          </h1>

          <p>
            Consulta las existencias actuales
            de fibra y el detalle de cada lote.
          </p>
        </div>

        <Link
          to="/gestion/compras-materia-prima/registrar"
          className="btn-primary-link"
        >
          + Registrar compra
        </Link>
      </div>


      <div className="almacen-mp-indicadores">

        <div className="almacen-mp-kpi">
          <span>
            Total comprado
          </span>

          <strong>
            {
              cantidad(
                indicadores
                  .total_comprado_kg
              )
            } KG
          </strong>

          <small>
            Materia prima ingresada
          </small>
        </div>


        <div className="almacen-mp-kpi">
          <span>
            Stock disponible
          </span>

          <strong>
            {
              cantidad(
                indicadores
                  .stock_total_kg
              )
            } KG
          </strong>

          <small>
            Existencia actual
          </small>
        </div>


        <div className="almacen-mp-kpi">
          <span>
            Consumido
          </span>

          <strong>
            {
              cantidad(
                indicadores
                  .consumido_total_kg
              )
            } KG
          </strong>

          <small>
            Producción y merma
          </small>
        </div>


        <div className="almacen-mp-kpi">
          <span>
            Lotes registrados
          </span>

          <strong>
            {
              indicadores
                .lotes_registrados ||
              0
            }
          </strong>

          <small>
            Compras de materia prima
          </small>
        </div>

      </div>


      <div className="almacen-mp-tabs">

        <button
          type="button"
          className={
            vista === 'RESUMEN'
              ? 'almacen-mp-tab almacen-mp-tab-activo'
              : 'almacen-mp-tab'
          }
          onClick={() =>
            setVista(
              'RESUMEN'
            )
          }
        >
          Resumen general
        </button>

        <button
          type="button"
          className={
            vista === 'LOTES'
              ? 'almacen-mp-tab almacen-mp-tab-activo'
              : 'almacen-mp-tab'
          }
          onClick={() =>
            setVista(
              'LOTES'
            )
          }
        >
          Lotes
        </button>

      </div>


      {
        vista === 'RESUMEN'
          ? (
            <>
              <form
                className="almacen-mp-filtros almacen-mp-filtros-resumen"
                onSubmit={
                  aplicarFiltrosResumen
                }
              >

                <div>
                  <label>
                    Buscar
                  </label>

                  <input
                    value={
                      filtrosResumen.q
                    }
                    onChange={(e) =>
                      setFiltrosResumen({
                        ...filtrosResumen,
                        q:
                          e.target.value
                      })
                    }
                    placeholder="Material o color..."
                  />
                </div>


                <div>
                  <label>
                    Material
                  </label>

                  <select
                    value={
                      filtrosResumen
                        .material_id
                    }
                    onChange={(e) =>
                      setFiltrosResumen({
                        ...filtrosResumen,
                        material_id:
                          e.target.value
                      })
                    }
                  >
                    <option value="">
                      Todos
                    </option>

                    {materiales.map(
                      (material) => (
                        <option
                          key={
                            material.id
                          }
                          value={
                            material.id
                          }
                        >
                          {
                            material
                              .nombre
                          }
                        </option>
                      )
                    )}
                  </select>
                </div>


                <div>
                  <label>
                    Color
                  </label>

                  <select
                    value={
                      filtrosResumen
                        .color_id
                    }
                    onChange={(e) =>
                      setFiltrosResumen({
                        ...filtrosResumen,
                        color_id:
                          e.target.value
                      })
                    }
                  >
                    <option value="">
                      Todos
                    </option>

                    {colores.map(
                      (color) => (
                        <option
                          key={
                            color.id
                          }
                          value={
                            color.id
                          }
                        >
                          {
                            color.nombre
                          }
                        </option>
                      )
                    )}
                  </select>
                </div>


                <button type="submit">
                  Buscar
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={
                    limpiarFiltrosResumen
                  }
                >
                  Limpiar
                </button>

              </form>


              <div className="tabla-card">

                <div className="almacen-mp-tabla-cabecera">
                  <div>
                    <h3>
                      Existencias por materia prima
                    </h3>

                    <p>
                      Totales agrupados por material y color.
                    </p>
                  </div>
                </div>


                {
                  cargando
                    ? (
                      <p>
                        Cargando almacén...
                      </p>
                    )
                    : (
                      <>
                        <div className="tabla-scroll">
                          <table className="almacen-mp-tabla-simple">
                            <thead>
                              <tr>
                                <th>
                                  Material
                                </th>
                                <th>
                                  Color
                                </th>
                                <th>
                                  Total comprado
                                </th>
                                <th>
                                  Consumido
                                </th>
                                <th>
                                  Disponible
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                resumen.map(
                                  (item) => (
                                    <tr
                                      key={
                                        `${item.material_id}-${item.color_id}-${item.unidad_medida_id}`
                                      }
                                    >
                                      <td>
                                        <strong>
                                          {
                                            item.material
                                          }
                                        </strong>
                                      </td>

                                      <td>
                                        {
                                          item.color
                                        }
                                      </td>

                                      <td>
                                        {
                                          cantidad(
                                            item
                                              .cantidad_inicial_total
                                          )
                                        } {
                                          item.unidad
                                        }
                                      </td>

                                      <td>
                                        {
                                          cantidad(
                                            item
                                              .cantidad_consumida_total
                                          )
                                        } {
                                          item.unidad
                                        }
                                      </td>

                                      <td>
                                        <strong className="almacen-mp-disponible">
                                          {
                                            cantidad(
                                              item
                                                .cantidad_disponible_total
                                            )
                                          } {
                                            item.unidad
                                          }
                                        </strong>
                                      </td>
                                    </tr>
                                  )
                                )
                              }

                              {
                                resumen.length === 0 &&
                                (
                                  <tr>
                                    <td colSpan={5}>
                                      No hay materia prima
                                      para los filtros seleccionados.
                                    </td>
                                  </tr>
                                )
                              }
                            </tbody>
                          </table>
                        </div>


                        <div className="paginado">

                          <button
                            type="button"
                            disabled={
                              pageResumen <=
                              1
                            }
                            onClick={() =>
                              setPageResumen(
                                pageResumen -
                                1
                              )
                            }
                          >
                            Anterior
                          </button>

                          <span>
                            Página {
                              paginacionResumen
                                .page
                            } de {
                              paginacionResumen
                                .totalPaginas ||
                              1
                            }
                          </span>

                          <button
                            type="button"
                            disabled={
                              pageResumen >=
                              paginacionResumen
                                .totalPaginas
                            }
                            onClick={() =>
                              setPageResumen(
                                pageResumen +
                                1
                              )
                            }
                          >
                            Siguiente
                          </button>

                        </div>
                      </>
                    )
                }

              </div>
            </>
          )
          : (
            <>
              <form
                className="almacen-mp-filtros almacen-mp-filtros-lotes"
                onSubmit={
                  aplicarFiltrosLotes
                }
              >

                <div>
                  <label>
                    Buscar
                  </label>

                  <input
                    value={
                      filtrosLotes.q
                    }
                    onChange={(e) =>
                      setFiltrosLotes({
                        ...filtrosLotes,
                        q:
                          e.target.value
                      })
                    }
                    placeholder="Lote, documento, proveedor, material..."
                  />
                </div>


                <div>
                  <label>
                    Proveedor
                  </label>

                  <select
                    value={
                      filtrosLotes
                        .proveedor_id
                    }
                    onChange={(e) =>
                      setFiltrosLotes({
                        ...filtrosLotes,
                        proveedor_id:
                          e.target.value
                      })
                    }
                  >
                    <option value="">
                      Todos
                    </option>

                    {proveedores.map(
                      (proveedor) => (
                        <option
                          key={
                            proveedor
                              .proveedor_id
                          }
                          value={
                            proveedor
                              .proveedor_id
                          }
                        >
                          {
                            proveedor
                              .razon_social
                          }
                        </option>
                      )
                    )}
                  </select>
                </div>


                <div>
                  <label>
                    Estado
                  </label>

                  <select
                    value={
                      filtrosLotes.estado
                    }
                    onChange={(e) =>
                      setFiltrosLotes({
                        ...filtrosLotes,
                        estado:
                          e.target.value
                      })
                    }
                  >
                    <option value="TODOS">
                      Todos
                    </option>

                    <option value="CON_STOCK">
                      Con stock
                    </option>

                    <option value="AGOTADO">
                      Agotados
                    </option>
                  </select>
                </div>


                <button type="submit">
                  Buscar
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={
                    limpiarFiltrosLotes
                  }
                >
                  Limpiar
                </button>

              </form>


              <div className="tabla-card">

                <div className="almacen-mp-tabla-cabecera">
                  <div>
                    <h3>
                      Lotes de materia prima
                    </h3>

                    <p>
                      Cada fila representa un lote completo.
                    </p>
                  </div>

                  <span className="muted">
                    {
                      paginacionLotes
                        .total
                    } lote(s)
                  </span>
                </div>


                {
                  cargando
                    ? (
                      <p>
                        Cargando lotes...
                      </p>
                    )
                    : (
                      <>
                        <div className="tabla-scroll">
                          <table>
                            <thead>
                              <tr>
                                <th>
                                  Lote
                                </th>
                                <th>
                                  Fecha
                                </th>
                                <th>
                                  Proveedor
                                </th>
                                <th>
                                  Documento
                                </th>
                                <th>
                                  Total comprado
                                </th>
                                <th>
                                  Consumido
                                </th>
                                <th>
                                  Disponible
                                </th>
                                <th>
                                  Acción
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                lotes.map(
                                  (lote) => (
                                    <tr
                                      key={
                                        lote
                                          .compra_materia_prima_id
                                      }
                                    >
                                      <td>
                                        <strong>
                                          {
                                            lote.nombre_lote
                                          }
                                        </strong>
                                      </td>

                                      <td>
                                        {
                                          fechaTexto(
                                            lote.fecha_compra
                                          )
                                        }
                                      </td>

                                      <td>
                                        {
                                          lote.proveedor
                                        }
                                      </td>

                                      <td>
                                        {
                                          lote.numero_documento ||
                                          '-'
                                        }
                                      </td>

                                      <td>
                                        {
                                          cantidad(
                                            lote
                                              .cantidad_inicial_total
                                          )
                                        } KG
                                      </td>

                                      <td>
                                        {
                                          cantidad(
                                            lote
                                              .cantidad_consumida_total
                                          )
                                        } KG
                                      </td>

                                      <td>
                                        <strong className="almacen-mp-disponible">
                                          {
                                            cantidad(
                                              lote
                                                .cantidad_disponible_total
                                            )
                                          } KG
                                        </strong>
                                      </td>

                                      <td>
                                        <Link
                                          className="btn-outline"
                                          to={
                                            `/gestion/almacen/materia-prima/lotes/${lote.compra_materia_prima_id}`
                                          }
                                        >
                                          Ver lote
                                        </Link>
                                      </td>
                                    </tr>
                                  )
                                )
                              }

                              {
                                lotes.length === 0 &&
                                (
                                  <tr>
                                    <td colSpan={8}>
                                      No hay lotes
                                      para los filtros seleccionados.
                                    </td>
                                  </tr>
                                )
                              }
                            </tbody>
                          </table>
                        </div>


                        <div className="paginado">

                          <button
                            type="button"
                            disabled={
                              pageLotes <=
                              1
                            }
                            onClick={() =>
                              setPageLotes(
                                pageLotes -
                                1
                              )
                            }
                          >
                            Anterior
                          </button>

                          <span>
                            Página {
                              paginacionLotes
                                .page
                            } de {
                              paginacionLotes
                                .totalPaginas ||
                              1
                            }
                          </span>

                          <button
                            type="button"
                            disabled={
                              pageLotes >=
                              paginacionLotes
                                .totalPaginas
                            }
                            onClick={() =>
                              setPageLotes(
                                pageLotes +
                                1
                              )
                            }
                          >
                            Siguiente
                          </button>

                        </div>
                      </>
                    )
                }

              </div>
            </>
          )
      }

    </div>
  );
}


export default AlmacenMateriaPrima;


<<<END OF FILE>>>


---

## FILE: src\pages\almacenMateriaPrima\AlmacenMateriaPrimaLoteDetalle.tsx

<<<START OF FILE>>>

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/almacenMateriaPrima.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


const tiposMovimiento = [
  {
    valor: '',
    texto: 'Todos'
  },
  {
    valor: 'ENTRADA_COMPRA',
    texto: 'Entrada por compra'
  },
  {
    valor: 'SALIDA_PRODUCCION',
    texto: 'Salida por producción'
  },
  {
    valor: 'SALIDA_MERMA',
    texto: 'Salida por merma'
  },
  {
    valor: 'AJUSTE_ENTRADA',
    texto: 'Ajuste de entrada'
  },
  {
    valor: 'AJUSTE_SALIDA',
    texto: 'Ajuste de salida'
  }
];


function AlmacenMateriaPrimaLoteDetalle() {
  const {
    stock_materia_prima_lote_id:
      compra_materia_prima_id
  } = useParams();

  const [
    lote,
    setLote
  ] = useState<any | null>(
    null
  );

  const [
    movimientos,
    setMovimientos
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
    tipoMovimiento,
    setTipoMovimiento
  ] = useState('');

  const [
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });


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
      },
      [
        compra_materia_prima_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarLote(),
            cargarMovimientos(
              1,
              ''
            )
          ]);

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarLote,
    cargarMovimientos
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarMovimientos(
      page,
      tipoMovimiento
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    page,
    tipoMovimiento,
    cargarMovimientos,
    cargando
  ]);


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  const tipoTexto = (
    tipo: string
  ) => {
    const item =
      tiposMovimiento.find(
        (opcion) =>
          opcion.valor === tipo
      );

    return item?.texto || tipo;
  };


  const esEntrada = (
    tipo: string
  ) => {
    return [
      'ENTRADA_COMPRA',
      'AJUSTE_ENTRADA'
    ].includes(tipo);
  };


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando lote...
        </p>
      </div>
    );
  }


  if (!lote) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() =>
            setFeedback({
              ...feedback,
              mensaje: ''
            })
          }
        />

        <Link
          to="/gestion/almacen/materia-prima"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar el lote.
        </div>

      </div>
    );
  }


  return (
    <div className="pedidos-page almacen-mp-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <Link
        to="/gestion/almacen/materia-prima"
        className="btn-volver"
      >
        ← Volver al almacén
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            {lote.nombre_lote}
          </h1>

          <p>
            Detalle de las materias primas
            ingresadas en este lote.
          </p>
        </div>

        <Link
          to={
            `/gestion/compras-materia-prima/${lote.compra_materia_prima_id}`
          }
          className="btn-outline"
        >
          Ver compra
        </Link>
      </div>


      <div className="almacen-mp-lote-meta">

        <div>
          <span>
            Proveedor
          </span>

          <strong>
            {
              lote.proveedor
            }
          </strong>

          <small>
            RUC {
              lote.proveedor_ruc
            }
          </small>
        </div>


        <div>
          <span>
            Fecha
          </span>

          <strong>
            {
              lote
                .fecha_compra
                ?.slice(
                  0,
                  10
                )
            }
          </strong>
        </div>


        <div>
          <span>
            Documento
          </span>

          <strong>
            {
              lote
                .numero_documento ||
              '-'
            }
          </strong>
        </div>

      </div>


      <div className="almacen-mp-detalle-resumen almacen-mp-detalle-resumen-3">

        <div>
          <span>
            Total comprado
          </span>

          <strong>
            {
              cantidad(
                lote
                  .cantidad_inicial_total
              )
            } KG
          </strong>
        </div>


        <div>
          <span>
            Consumido
          </span>

          <strong>
            {
              cantidad(
                lote
                  .cantidad_consumida_total
              )
            } KG
          </strong>
        </div>


        <div>
          <span>
            Disponible
          </span>

          <strong className="almacen-mp-disponible">
            {
              cantidad(
                lote
                  .cantidad_disponible_total
              )
            } KG
          </strong>
        </div>

      </div>


      <div className="tabla-card">

        <div className="almacen-mp-tabla-cabecera">
          <div>
            <h3>
              Materias primas del lote
            </h3>

            <p>
              Revisa cuánto ingresó,
              cuánto se consumió y cuánto queda.
            </p>
          </div>
        </div>


        <div className="tabla-scroll">
          <table className="almacen-mp-tabla-simple">
            <thead>
              <tr>
                <th>
                  Material
                </th>
                <th>
                  Color
                </th>
                <th>
                  Comprado
                </th>
                <th>
                  Consumido
                </th>
                <th>
                  Disponible
                </th>
              </tr>
            </thead>

            <tbody>
              {
                lote.detalles.map(
                  (item: any) => (
                    <tr
                      key={
                        item
                          .compra_materia_prima_detalle_id
                      }
                    >
                      <td>
                        <strong>
                          {
                            item.material
                          }
                        </strong>
                      </td>

                      <td>
                        {
                          item.color
                        }
                      </td>

                      <td>
                        {
                          cantidad(
                            item
                              .cantidad_inicial
                          )
                        } {
                          item.unidad
                        }
                      </td>

                      <td>
                        {
                          cantidad(
                            item
                              .cantidad_consumida
                          )
                        } {
                          item.unidad
                        }
                      </td>

                      <td>
                        <strong className="almacen-mp-disponible">
                          {
                            cantidad(
                              item
                                .cantidad_disponible
                            )
                          } {
                            item.unidad
                          }
                        </strong>
                      </td>
                    </tr>
                  )
                )
              }
            </tbody>
          </table>
        </div>

      </div>


      <details className="almacen-mp-historial">

        <summary>
          Ver historial de movimientos
        </summary>


        <div className="almacen-mp-historial-contenido">

          <div className="almacen-mp-movimientos-header">
            <div>
              <h3>
                Historial del lote
              </h3>

              <p>
                Registro de entradas y salidas
                de sus materias primas.
              </p>
            </div>

            <div className="almacen-mp-movimiento-filtro">
              <label>
                Tipo
              </label>

              <select
                value={
                  tipoMovimiento
                }
                onChange={(e) => {
                  setPage(1);

                  setTipoMovimiento(
                    e.target.value
                  );
                }}
              >
                {
                  tiposMovimiento.map(
                    (opcion) => (
                      <option
                        key={
                          opcion.valor ||
                          'TODOS'
                        }
                        value={
                          opcion.valor
                        }
                      >
                        {
                          opcion.texto
                        }
                      </option>
                    )
                  )
                }
              </select>
            </div>
          </div>


          <div className="tabla-scroll">
            <table>
              <thead>
                <tr>
                  <th>
                    Fecha
                  </th>
                  <th>
                    Materia prima
                  </th>
                  <th>
                    Tipo
                  </th>
                  <th>
                    Movimiento
                  </th>
                  <th>
                    Observación
                  </th>
                </tr>
              </thead>

              <tbody>
                {
                  movimientos.map(
                    (movimiento) => (
                      <tr
                        key={
                          movimiento
                            .movimiento_materia_prima_id
                        }
                      >
                        <td>
                          {
                            movimiento
                              .fecha_movimiento
                              ? new Date(
                                  movimiento
                                    .fecha_movimiento
                                )
                                  .toLocaleString()
                              : '-'
                          }
                        </td>

                        <td>
                          <strong>
                            {
                              movimiento.material
                            }
                          </strong>
                          {' / '}
                          {
                            movimiento.color
                          }
                        </td>

                        <td>
                          <span
                            className={
                              esEntrada(
                                movimiento
                                  .tipo_movimiento
                              )
                                ? 'almacen-mp-movimiento almacen-mp-movimiento-entrada'
                                : 'almacen-mp-movimiento almacen-mp-movimiento-salida'
                            }
                          >
                            {
                              tipoTexto(
                                movimiento
                                  .tipo_movimiento
                              )
                            }
                          </span>
                        </td>

                        <td>
                          <strong
                            className={
                              esEntrada(
                                movimiento
                                  .tipo_movimiento
                              )
                                ? 'almacen-mp-cantidad-entrada'
                                : 'almacen-mp-cantidad-salida'
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
                              cantidad(
                                movimiento
                                  .cantidad
                              )
                            } {
                              movimiento.unidad
                            }
                          </strong>
                        </td>

                        <td>
                          {
                            movimiento
                              .observacion ||
                            '-'
                          }
                        </td>
                      </tr>
                    )
                  )
                }

                {
                  movimientos.length === 0 &&
                  (
                    <tr>
                      <td colSpan={5}>
                        No existen movimientos
                        para el filtro seleccionado.
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>


          <div className="paginado">

            <button
              type="button"
              disabled={
                page <= 1
              }
              onClick={() =>
                setPage(
                  page - 1
                )
              }
            >
              Anterior
            </button>

            <span>
              Página {
                paginacion.page
              } de {
                paginacion
                  .totalPaginas ||
                1
              }
            </span>

            <button
              type="button"
              disabled={
                page >=
                paginacion
                  .totalPaginas
              }
              onClick={() =>
                setPage(
                  page + 1
                )
              }
            >
              Siguiente
            </button>

          </div>

        </div>

      </details>

    </div>
  );
}


export default AlmacenMateriaPrimaLoteDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\almacenProductoTerminado\AlmacenProductoTerminado.tsx

<<<START OF FILE>>>

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/almacenProductoTerminado.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Vista =
  | 'RESUMEN'
  | 'PRESENTACIONES';


type FiltrosBase = {
  q: string;
  tipo_producto_id: string;
  material_id: string;
  medida_id: string;
  color_id: string;
};


type FiltrosPresentaciones =
  FiltrosBase & {
    estado: string;
  };


const filtrosBaseVacios:
  FiltrosBase = {
  q: '',
  tipo_producto_id: '',
  material_id: '',
  medida_id: '',
  color_id: ''
};


const filtrosPresentacionesVacios:
  FiltrosPresentaciones = {
  ...filtrosBaseVacios,
  estado: 'TODOS'
};


function AlmacenProductoTerminado() {
  const [
    vista,
    setVista
  ] = useState<Vista>(
    'RESUMEN'
  );

  const [
    indicadores,
    setIndicadores
  ] = useState<any>({
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
  ] = useState<any[]>([]);

  const [
    presentaciones,
    setPresentaciones
  ] = useState<any[]>([]);

  const [
    cargando,
    setCargando
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
    paginacionResumen,
    setPaginacionResumen
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    paginacionPresentaciones,
    setPaginacionPresentaciones
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    filtrosResumen,
    setFiltrosResumen
  ] = useState<FiltrosBase>({
    ...filtrosBaseVacios
  });

  const [
    filtrosResumenAplicados,
    setFiltrosResumenAplicados
  ] = useState<FiltrosBase>({
    ...filtrosBaseVacios
  });

  const [
    filtrosPresentaciones,
    setFiltrosPresentaciones
  ] = useState<FiltrosPresentaciones>({
    ...filtrosPresentacionesVacios
  });

  const [
    filtrosPresentacionesAplicados,
    setFiltrosPresentacionesAplicados
  ] = useState<FiltrosPresentaciones>({
    ...filtrosPresentacionesVacios
  });

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
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
          tiposData.items || []
        );

        setMateriales(
          materialesData.items || []
        );

        setMedidas(
          medidasData.items || []
        );

        setColores(
          coloresData.items || []
        );
      },
      []
    );


  const cargarIndicadores =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/almacen-producto-terminado/indicadores'
          );

        setIndicadores(
          data.indicadores || {}
        );
      },
      []
    );


  const cargarResumen =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosBase
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
          filtros.q.trim()
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
            filtros.tipo_producto_id
          );
        }

        if (
          filtros.material_id
        ) {
          params.set(
            'material_id',
            filtros.material_id
          );
        }

        if (
          filtros.medida_id
        ) {
          params.set(
            'medida_id',
            filtros.medida_id
          );
        }

        if (
          filtros.color_id
        ) {
          params.set(
            'color_id',
            filtros.color_id
          );
        }

        const data =
          await apiFetch(
            `/almacen-producto-terminado/resumen?${params.toString()}`
          );

        setResumen(
          data.resumen || []
        );

        setPaginacionResumen(
          data.paginacion
        );
      },
      []
    );


  const cargarPresentaciones =
    useCallback(
      async (
        pagina: number,
        filtros:
          FiltrosPresentaciones
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
          'estado',
          filtros.estado
        );

        if (
          filtros.q.trim()
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
            filtros.tipo_producto_id
          );
        }

        if (
          filtros.material_id
        ) {
          params.set(
            'material_id',
            filtros.material_id
          );
        }

        if (
          filtros.medida_id
        ) {
          params.set(
            'medida_id',
            filtros.medida_id
          );
        }

        if (
          filtros.color_id
        ) {
          params.set(
            'color_id',
            filtros.color_id
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
      },
      []
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarCatalogos(),
            cargarIndicadores(),
            cargarResumen(
              1,
              filtrosBaseVacios
            ),
            cargarPresentaciones(
              1,
              filtrosPresentacionesVacios
            )
          ]);

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarCatalogos,
    cargarIndicadores,
    cargarResumen,
    cargarPresentaciones
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarResumen(
      pageResumen,
      filtrosResumenAplicados
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    pageResumen,
    filtrosResumenAplicados,
    cargarResumen,
    cargando
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarPresentaciones(
      pagePresentaciones,
      filtrosPresentacionesAplicados
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    pagePresentaciones,
    filtrosPresentacionesAplicados,
    cargarPresentaciones,
    cargando
  ]);


  const aplicarFiltrosResumen = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPageResumen(1);

    setFiltrosResumenAplicados({
      q:
        filtrosResumen.q.trim(),
      tipo_producto_id:
        filtrosResumen
          .tipo_producto_id,
      material_id:
        filtrosResumen.material_id,
      medida_id:
        filtrosResumen.medida_id,
      color_id:
        filtrosResumen.color_id
    });
  };


  const limpiarFiltrosResumen =
    () => {
      setFiltrosResumen({
        ...filtrosBaseVacios
      });

      setPageResumen(1);

      setFiltrosResumenAplicados({
        ...filtrosBaseVacios
      });
    };


  const aplicarFiltrosPresentaciones = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPagePresentaciones(
      1
    );

    setFiltrosPresentacionesAplicados({
      q:
        filtrosPresentaciones.q
          .trim(),
      tipo_producto_id:
        filtrosPresentaciones
          .tipo_producto_id,
      material_id:
        filtrosPresentaciones
          .material_id,
      medida_id:
        filtrosPresentaciones
          .medida_id,
      color_id:
        filtrosPresentaciones
          .color_id,
      estado:
        filtrosPresentaciones.estado
    });
  };


  const limpiarFiltrosPresentaciones =
    () => {
      setFiltrosPresentaciones({
        ...filtrosPresentacionesVacios
      });

      setPagePresentaciones(
        1
      );

      setFiltrosPresentacionesAplicados({
        ...filtrosPresentacionesVacios
      });
    };


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  const renderFiltrosBase = (
    filtros:
      FiltrosBase |
      FiltrosPresentaciones,
    setFiltros:
      (valor: any) => void
  ) => {
    return (
      <>
        <div className="apt-filtro-busqueda">
          <label>
            Buscar
          </label>

          <input
            value={filtros.q}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                q:
                  e.target.value
              })
            }
            placeholder="Tipo, material, medida o color..."
          />
        </div>


        <div>
          <label>
            Tipo
          </label>

          <select
            value={
              filtros
                .tipo_producto_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                tipo_producto_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todos
            </option>

            {tipos.map(
              (tipo) => (
                <option
                  key={tipo.id}
                  value={tipo.id}
                >
                  {tipo.nombre}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Material
          </label>

          <select
            value={
              filtros.material_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                material_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todos
            </option>

            {materiales.map(
              (material) => (
                <option
                  key={material.id}
                  value={material.id}
                >
                  {material.nombre}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Medida
          </label>

          <select
            value={
              filtros.medida_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                medida_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todas
            </option>

            {medidas.map(
              (medida) => (
                <option
                  key={medida.id}
                  value={medida.id}
                >
                  {medida.nombre}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Color
          </label>

          <select
            value={
              filtros.color_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                color_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todos
            </option>

            {colores.map(
              (color) => (
                <option
                  key={color.id}
                  value={color.id}
                >
                  {color.nombre}
                </option>
              )
            )}
          </select>
        </div>
      </>
    );
  };


  return (
    <div className="pedidos-page almacen-pt-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <div className="pedidos-header almacen-pt-header">
        <div>
          <h1>
            Almacén de producto terminado
          </h1>

          <p>
            Consulta las existencias disponibles
            de los productos fabricados.
          </p>
        </div>

        <Link
          to="/gestion/producciones/registrar"
          className="btn-primary-link"
        >
          + Registrar producción
        </Link>
      </div>


      <div className="apt-indicadores">

        <div className="apt-kpi">
          <span>
            Stock disponible
          </span>

          <strong>
            {
              cantidad(
                indicadores
                  .stock_disponible_kg
              )
            } KG
          </strong>

          <small>
            Existencia actual
          </small>
        </div>


        <div className="apt-kpi">
          <span>
            Productos con stock
          </span>

          <strong>
            {
              indicadores
                .productos_con_stock ||
              0
            }
          </strong>

          <small>
            Productos disponibles
          </small>
        </div>


        <div className="apt-kpi">
          <span>
            Presentaciones con stock
          </span>

          <strong>
            {
              indicadores
                .presentaciones_con_stock ||
              0
            }
          </strong>

          <small>
            Formatos disponibles
          </small>
        </div>

      </div>


      <div className="apt-tabs">

        <button
          type="button"
          className={
            vista === 'RESUMEN'
              ? 'apt-tab apt-tab-activo'
              : 'apt-tab'
          }
          onClick={() =>
            setVista(
              'RESUMEN'
            )
          }
        >
          Resumen general
        </button>

        <button
          type="button"
          className={
            vista === 'PRESENTACIONES'
              ? 'apt-tab apt-tab-activo'
              : 'apt-tab'
          }
          onClick={() =>
            setVista(
              'PRESENTACIONES'
            )
          }
        >
          Por presentación
        </button>

      </div>


      {
        vista === 'RESUMEN'
          ? (
            <>
              <form
                className="apt-filtros"
                onSubmit={
                  aplicarFiltrosResumen
                }
              >

                {
                  renderFiltrosBase(
                    filtrosResumen,
                    setFiltrosResumen
                  )
                }

                <button type="submit">
                  Buscar
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={
                    limpiarFiltrosResumen
                  }
                >
                  Limpiar
                </button>

              </form>


              <div className="tabla-card">

                <div className="apt-tabla-cabecera">
                  <div>
                    <h3>
                      Stock consolidado
                    </h3>

                    <p>
                      Total disponible de cada producto,
                      sin separar por presentación.
                    </p>
                  </div>

                  <span className="muted">
                    {
                      paginacionResumen
                        .total
                    } producto(s)
                  </span>
                </div>


                {
                  cargando
                    ? (
                      <p>
                        Cargando almacén...
                      </p>
                    )
                    : (
                      <>
                        <div className="tabla-scroll">
                          <table>
                            <thead>
                              <tr>
                                <th>
                                  Tipo
                                </th>
                                <th>
                                  Material
                                </th>
                                <th>
                                  Medida
                                </th>
                                <th>
                                  Color
                                </th>
                                <th>
                                  Disponible
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                resumen.map(
                                  (item) => (
                                    <tr
                                      key={
                                        item
                                          .producto_id
                                      }
                                    >
                                      <td>
                                        <strong>
                                          {
                                            item
                                              .tipo_producto
                                          }
                                        </strong>
                                      </td>

                                      <td>
                                        {
                                          item.material
                                        }
                                      </td>

                                      <td>
                                        {
                                          item.medida
                                        }
                                      </td>

                                      <td>
                                        {
                                          item.color
                                        }
                                      </td>

                                      <td>
                                        <strong className="apt-stock-positivo">
                                          {
                                            cantidad(
                                              item
                                                .cantidad_disponible_total
                                            )
                                          } {
                                            item.unidad
                                          }
                                        </strong>
                                      </td>
                                    </tr>
                                  )
                                )
                              }

                              {
                                resumen.length ===
                                  0 &&
                                (
                                  <tr>
                                    <td colSpan={5}>
                                      No hay productos
                                      para los filtros seleccionados.
                                    </td>
                                  </tr>
                                )
                              }
                            </tbody>
                          </table>
                        </div>


                        <div className="paginado">

                          <button
                            type="button"
                            disabled={
                              pageResumen <=
                              1
                            }
                            onClick={() =>
                              setPageResumen(
                                pageResumen -
                                1
                              )
                            }
                          >
                            Anterior
                          </button>

                          <span>
                            Página {
                              paginacionResumen
                                .page
                            } de {
                              paginacionResumen
                                .totalPaginas ||
                              1
                            }
                          </span>

                          <button
                            type="button"
                            disabled={
                              pageResumen >=
                              paginacionResumen
                                .totalPaginas
                            }
                            onClick={() =>
                              setPageResumen(
                                pageResumen +
                                1
                              )
                            }
                          >
                            Siguiente
                          </button>

                        </div>
                      </>
                    )
                }

              </div>
            </>
          )
          : (
            <>
              <form
                className="apt-filtros apt-filtros-presentaciones"
                onSubmit={
                  aplicarFiltrosPresentaciones
                }
              >

                {
                  renderFiltrosBase(
                    filtrosPresentaciones,
                    setFiltrosPresentaciones
                  )
                }

                <div>
                  <label>
                    Estado
                  </label>

                  <select
                    value={
                      filtrosPresentaciones
                        .estado
                    }
                    onChange={(e) =>
                      setFiltrosPresentaciones({
                        ...filtrosPresentaciones,
                        estado:
                          e.target.value
                      })
                    }
                  >
                    <option value="TODOS">
                      Todos
                    </option>

                    <option value="CON_STOCK">
                      Con stock
                    </option>

                    <option value="AGOTADO">
                      Agotados
                    </option>
                  </select>
                </div>

                <button type="submit">
                  Buscar
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={
                    limpiarFiltrosPresentaciones
                  }
                >
                  Limpiar
                </button>

              </form>


              <div className="tabla-card">

                <div className="apt-tabla-cabecera">
                  <div>
                    <h3>
                      Stock por presentación
                    </h3>

                    <p>
                      Existencias separadas según
                      la presentación registrada en producción.
                    </p>
                  </div>

                  <span className="muted">
                    {
                      paginacionPresentaciones
                        .total
                    } registro(s)
                  </span>
                </div>


                {
                  cargando
                    ? (
                      <p>
                        Cargando presentaciones...
                      </p>
                    )
                    : (
                      <>
                        <div className="tabla-scroll">
                          <table>
                            <thead>
                              <tr>
                                <th>
                                  Producto
                                </th>
                                <th>
                                  Medida
                                </th>
                                <th>
                                  Color
                                </th>
                                <th>
                                  Presentación
                                </th>
                                <th>
                                  Disponible
                                </th>
                                <th>
                                  Unidades disponibles
                                </th>
                                <th>
                                  Estado
                                </th>
                                <th>
                                  Acción
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                presentaciones.map(
                                  (item) => (
                                    <tr
                                      key={
                                        item
                                          .stock_producto_terminado_id
                                      }
                                    >
                                      <td>
                                        <strong>
                                          {
                                            item
                                              .tipo_producto
                                          }
                                        </strong>
                                        <div className="apt-subtexto">
                                          {
                                            item.material
                                          }
                                        </div>
                                      </td>

                                      <td>
                                        {
                                          item.medida
                                        }
                                      </td>

                                      <td>
                                        {
                                          item.color
                                        }
                                      </td>

                                      <td>
                                        <strong>
                                          {
                                            cantidad(
                                              item
                                                .cantidad_presentacion
                                            )
                                          } {
                                            item
                                              .unidad_presentacion
                                          }
                                        </strong>
                                      </td>

                                      <td>
                                        <strong className="apt-stock-positivo">
                                          {
                                            cantidad(
                                              item
                                                .cantidad_disponible
                                            )
                                          } {
                                            item.unidad
                                          }
                                        </strong>
                                      </td>

                                      <td>
                                        {
                                          Number(
                                            item
                                              .presentaciones_disponibles ||
                                            0
                                          )
                                            .toFixed(
                                              2
                                            )
                                        }
                                      </td>

                                      <td>
                                        <span
                                          className={
                                            item
                                              .estado_stock ===
                                              'CON_STOCK'
                                              ? 'apt-badge apt-badge-ok'
                                              : 'apt-badge apt-badge-agotado'
                                          }
                                        >
                                          {
                                            item
                                              .estado_stock ===
                                              'CON_STOCK'
                                              ? 'Con stock'
                                              : 'Agotado'
                                          }
                                        </span>
                                      </td>

                                      <td>
                                        <Link
                                          className="btn-outline"
                                          to={
                                            `/gestion/almacen/producto-terminado/presentaciones/${item.stock_producto_terminado_id}`
                                          }
                                        >
                                          Ver detalle
                                        </Link>
                                      </td>
                                    </tr>
                                  )
                                )
                              }

                              {
                                presentaciones.length ===
                                  0 &&
                                (
                                  <tr>
                                    <td colSpan={8}>
                                      No hay presentaciones
                                      para los filtros seleccionados.
                                    </td>
                                  </tr>
                                )
                              }
                            </tbody>
                          </table>
                        </div>


                        <div className="paginado">

                          <button
                            type="button"
                            disabled={
                              pagePresentaciones <=
                              1
                            }
                            onClick={() =>
                              setPagePresentaciones(
                                pagePresentaciones -
                                1
                              )
                            }
                          >
                            Anterior
                          </button>

                          <span>
                            Página {
                              paginacionPresentaciones
                                .page
                            } de {
                              paginacionPresentaciones
                                .totalPaginas ||
                              1
                            }
                          </span>

                          <button
                            type="button"
                            disabled={
                              pagePresentaciones >=
                              paginacionPresentaciones
                                .totalPaginas
                            }
                            onClick={() =>
                              setPagePresentaciones(
                                pagePresentaciones +
                                1
                              )
                            }
                          >
                            Siguiente
                          </button>

                        </div>
                      </>
                    )
                }

              </div>
            </>
          )
      }

    </div>
  );
}


export default AlmacenProductoTerminado;


<<<END OF FILE>>>


---

## FILE: src\pages\almacenProductoTerminado\AlmacenProductoTerminadoDetalle.tsx

<<<START OF FILE>>>

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/almacenProductoTerminado.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


const tiposMovimiento = [
  {
    valor: '',
    texto: 'Todos'
  },
  {
    valor: 'ENTRADA_PRODUCCION',
    texto: 'Entrada por producción'
  },
  {
    valor: 'SALIDA_ENTREGA',
    texto: 'Salida por entrega'
  },
  {
    valor: 'AJUSTE_ENTRADA',
    texto: 'Ajuste de entrada'
  },
  {
    valor: 'AJUSTE_SALIDA',
    texto: 'Ajuste de salida'
  }
];


function AlmacenProductoTerminadoDetalle() {
  const {
    stock_producto_terminado_id
  } = useParams();

  const [
    presentacion,
    setPresentacion
  ] = useState<any | null>(
    null
  );

  const [
    movimientos,
    setMovimientos
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
    tipoMovimiento,
    setTipoMovimiento
  ] = useState('');

  const [
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });


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
      },
      [
        stock_producto_terminado_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarPresentacion(),
            cargarMovimientos(
              1,
              ''
            )
          ]);

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarPresentacion,
    cargarMovimientos
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarMovimientos(
      page,
      tipoMovimiento
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    page,
    tipoMovimiento,
    cargarMovimientos,
    cargando
  ]);


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  const fechaHoraTexto = (
    valor: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return new Date(
      valor
    ).toLocaleString();
  };


  const esEntrada = (
    tipo: string
  ) => {
    return [
      'ENTRADA_PRODUCCION',
      'AJUSTE_ENTRADA'
    ].includes(tipo);
  };


  const tipoTexto = (
    tipo: string
  ) => {
    return (
      tiposMovimiento.find(
        (item) =>
          item.valor === tipo
      )?.texto ||
      tipo
    );
  };


  const referenciaTexto = (
    movimiento: any
  ) => {
    if (
      movimiento.produccion_id
    ) {
      return (
        `Producción #${movimiento.produccion_id}`
      );
    }

    if (
      movimiento.entrega_id
    ) {
      return movimiento.pedido_id
        ? `Entrega #${movimiento.entrega_id} · Pedido #${movimiento.pedido_id}`
        : `Entrega #${movimiento.entrega_id}`;
    }

    return '-';
  };


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando stock...
        </p>
      </div>
    );
  }


  if (!presentacion) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() =>
            setFeedback({
              ...feedback,
              mensaje: ''
            })
          }
        />

        <Link
          to="/gestion/almacen/producto-terminado"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar el stock
          del producto terminado.
        </div>

      </div>
    );
  }


  return (
    <div className="pedidos-page almacen-pt-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <Link
        to="/gestion/almacen/producto-terminado"
        className="btn-volver"
      >
        ← Volver al almacén
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            {
              presentacion
                .tipo_producto
            }
            {' · '}
            {
              presentacion.material
            }
            {' · '}
            {
              presentacion.medida
            }
            {' · '}
            {
              presentacion.color
            }
          </h1>

          <p>
            Stock e historial de movimientos
            de esta presentación.
          </p>
        </div>
      </div>


      <div className="apt-detalle-principal">

        <div className="apt-presentacion-destacada">
          <span>
            Presentación
          </span>

          <strong>
            {
              cantidad(
                presentacion
                  .cantidad_presentacion
              )
            } {
              presentacion
                .unidad_presentacion
            }
          </strong>
        </div>


        <div>
          <span>
            Stock disponible
          </span>

          <strong className="apt-stock-positivo">
            {
              cantidad(
                presentacion
                  .cantidad_disponible
              )
            } {
              presentacion.unidad
            }
          </strong>
        </div>


        <div>
          <span>
            Unidades disponibles
          </span>

          <strong>
            {
              Number(
                presentacion
                  .presentaciones_disponibles ||
                0
              ).toFixed(2)
            }
          </strong>
        </div>


        <div>
          <span>
            Estado
          </span>

          <strong>
            {
              presentacion
                .estado_stock ===
                'CON_STOCK'
                ? 'Con stock'
                : 'Agotado'
            }
          </strong>
        </div>

      </div>


      <div className="tabla-card">

        <div className="apt-movimientos-header">
          <div>
            <h3>
              Historial de movimientos
            </h3>

            <p>
              Entradas por producción
              y salidas por entregas.
            </p>
          </div>


          <div className="apt-movimiento-filtro">
            <label>
              Tipo
            </label>

            <select
              value={
                tipoMovimiento
              }
              onChange={(e) => {
                setPage(1);

                setTipoMovimiento(
                  e.target.value
                );
              }}
            >
              {
                tiposMovimiento.map(
                  (item) => (
                    <option
                      key={
                        item.valor ||
                        'TODOS'
                      }
                      value={
                        item.valor
                      }
                    >
                      {
                        item.texto
                      }
                    </option>
                  )
                )
              }
            </select>
          </div>
        </div>


        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>
                  Fecha
                </th>
                <th>
                  Movimiento
                </th>
                <th>
                  Cantidad
                </th>
                <th>
                  Referencia
                </th>
                <th>
                  Observación
                </th>
                <th>
                  Registrado por
                </th>
              </tr>
            </thead>

            <tbody>
              {
                movimientos.map(
                  (movimiento) => (
                    <tr
                      key={
                        movimiento
                          .movimiento_producto_terminado_id
                      }
                    >
                      <td>
                        {
                          fechaHoraTexto(
                            movimiento
                              .fecha_movimiento
                          )
                        }
                      </td>

                      <td>
                        <span
                          className={
                            esEntrada(
                              movimiento
                                .tipo_movimiento
                            )
                              ? 'apt-badge apt-badge-ok'
                              : 'apt-badge apt-badge-salida'
                          }
                        >
                          {
                            tipoTexto(
                              movimiento
                                .tipo_movimiento
                            )
                          }
                        </span>
                      </td>

                      <td>
                        <strong
                          className={
                            esEntrada(
                              movimiento
                                .tipo_movimiento
                            )
                              ? 'apt-stock-positivo'
                              : 'apt-stock-salida'
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
                            cantidad(
                              movimiento
                                .cantidad
                            )
                          } {
                            presentacion.unidad
                          }
                        </strong>
                      </td>

                      <td>
                        {
                          referenciaTexto(
                            movimiento
                          )
                        }
                      </td>

                      <td>
                        {
                          movimiento
                            .observacion ||
                          '-'
                        }
                      </td>

                      <td>
                        {
                          movimiento
                            .registrado_por
                        }
                      </td>
                    </tr>
                  )
                )
              }

              {
                movimientos.length ===
                  0 &&
                (
                  <tr>
                    <td colSpan={6}>
                      No existen movimientos
                      para el filtro seleccionado.
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>


        <div className="paginado">

          <button
            type="button"
            disabled={
              page <= 1
            }
            onClick={() =>
              setPage(
                page - 1
              )
            }
          >
            Anterior
          </button>

          <span>
            Página {
              paginacion.page
            } de {
              paginacion
                .totalPaginas ||
              1
            }
          </span>

          <button
            type="button"
            disabled={
              page >=
              paginacion
                .totalPaginas
            }
            onClick={() =>
              setPage(
                page + 1
              )
            }
          >
            Siguiente
          </button>

        </div>

      </div>

    </div>
  );
}


export default AlmacenProductoTerminadoDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\Catalogos.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

const catalogos = [
  { key: 'tiposProducto', label: 'Tipos de producto' },
  { key: 'medidas', label: 'Medidas' },
  { key: 'colores', label: 'Colores' },
  { key: 'materiales', label: 'Materiales' }
];

function Catalogos() {
  const [catalogoActivo, setCatalogoActivo] = useState('tiposProducto');
  const [items, setItems] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargarCatalogo = async () => {
    try {
      setError('');
      const data = await apiFetch(`/catalogos/${catalogoActivo}`);
      setItems(data.items);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    cargarCatalogo();
  }, [catalogoActivo]);

  const registrarItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await apiFetch(`/catalogos/${catalogoActivo}`, {
        method: 'POST',
        body: JSON.stringify({ nombre })
      });

      setMensaje('Registro creado correctamente');
      setNombre('');
      cargarCatalogo();

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Catálogos</h1>

      <div className="tabs">
        {catalogos.map((cat) => (
          <button
            key={cat.key}
            className={catalogoActivo === cat.key ? 'tab-active' : ''}
            onClick={() => setCatalogoActivo(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card" onSubmit={registrarItem}>
        <h3>Agregar registro</h3>

        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />

        <button type="submit">Guardar</button>
      </form>

      <div className="tabla-card">
        <h3>Listado</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';

function ClientesLista() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');

  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info',
    mensaje: ''
  });

  const cargarClientes = async (
    paginaActual = page,
    busquedaActual = busqueda
  ) => {
    const params = new URLSearchParams();

    params.append('page', String(paginaActual));
    params.append('limit', '10');

    if (busquedaActual.trim()) {
      params.append('q', busquedaActual.trim());
    }

    const data = await apiFetch(`/clientes?${params.toString()}`);

    setClientes(data.clientes);
    setPaginacion(data.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarClientes(1);
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    iniciar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        await cargarClientes(page);
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    cargar();
  }, [page]);

  const aplicarBusqueda = async (e: React.FormEvent) => {
    e.preventDefault();

    setPage(1);

    try {
      await cargarClientes(1);
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const limpiarFiltros = async () => {
    setBusqueda('');
    setPage(1);

    try {
      await cargarClientes(1, '');
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  return (
    <div className="pedidos-page">
      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() => setFeedback({ ...feedback, mensaje: '' })}
      />

      <div className="pedidos-header">
        <div>
          <h1>Clientes</h1>
          <p>Consulta, filtra, registra y edita clientes.</p>
        </div>

        <div className="pedidos-actions">
          <Link className="btn-link" to="/gestion/clientes/registrar">
            + Registrar cliente
          </Link>

          <Link className="btn-outline" to="/gestion/clientes/precios">
            Historial de precios
          </Link>
        </div>
      </div>

      <form className="filtros-card" onSubmit={aplicarBusqueda}>
        <div>
          <label>Buscar</label>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="RUC, razón social, dirección o agencia"
          />
        </div>

        <div className="filtros-actions">
          <button type="submit">Buscar</button>
          <button type="button" className="btn-secondary" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </form>

      <div className="pedidos-card">
        <h3>Listado de clientes</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>RUC</th>
              <th>Razón social</th>
              <th>Dirección</th>
              <th>Agencia</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.cliente_id}>
                <td>#{cliente.cliente_id}</td>
                <td>{cliente.ruc}</td>
                <td>
                  <strong>{cliente.razon_social}</strong>
                </td>
                <td>{cliente.direccion || '-'}</td>
                <td>{cliente.agencia_entrega || '-'}</td>
                <td>{cliente.telefono || '-'}</td>
                <td>{cliente.correo || '-'}</td>
                <td>
                  <div className="tabla-acciones">
                    <Link
                      className="btn-outline"
                      to={`/gestion/clientes/${cliente.cliente_id}/editar`}
                    >
                      Editar
                    </Link>

                    <Link
                      className="btn-link"
                      to={`/gestion/clientes/precios?cliente_id=${cliente.cliente_id}`}
                    >
                      Precios
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {clientes.length === 0 && (
              <tr>
                <td colSpan={8}>No hay clientes registrados.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="paginado">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginacion.page} de {paginacion.totalPaginas || 1}
          </span>

          <button
            type="button"
            disabled={page >= paginacion.totalPaginas}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientesLista;

<<<END OF FILE>>>


---

## FILE: src\pages\clientes\EditarCliente.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';
import ClienteForm, {
  type ClienteFormData
} from '../../components/clientes/ClienteForm';

function EditarCliente() {
  const { cliente_id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<ClienteFormData>({
    ruc: '',
    razon_social: '',
    direccion: '',
    telefono: '',
    correo: '',
    agencia_entrega: ''
  });

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info',
    mensaje: ''
  });

  const cargarCliente = async () => {
    const data = await apiFetch(`/clientes/${cliente_id}`);

    setForm({
      ruc: data.cliente.ruc || '',
      razon_social: data.cliente.razon_social || '',
      direccion: data.cliente.direccion || '',
      telefono: data.cliente.telefono || '',
      correo: data.cliente.correo || '',
      agencia_entrega: data.cliente.agencia_entrega || ''
    });
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarCliente();
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    iniciar();
  }, [cliente_id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const editarCliente = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await apiFetch(`/clientes/${cliente_id}`, {
        method: 'PUT',
        body: JSON.stringify(form)
      });

      setFeedback({
        tipo: 'success',
        mensaje: 'Cliente actualizado correctamente'
      });

      setTimeout(() => {
        navigate('/gestion/clientes');
      }, 800);

    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  return (
    <div className="pedidos-page">
      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() => setFeedback({ ...feedback, mensaje: '' })}
      />

      <Link to="/gestion/clientes" className="btn-volver">
        ← Volver a clientes
      </Link>

      <div className="pedidos-header">
        <div>
          <h1>Editar cliente</h1>
          <p>Actualiza los datos comerciales del cliente.</p>
        </div>
      </div>

      <form className="form-card" onSubmit={editarCliente}>
        <h3>Datos del cliente</h3>

        <ClienteForm
          form={form}
          onChange={handleChange}
          textoBoton="Actualizar cliente"
        />
      </form>
    </div>
  );
}

export default EditarCliente;

<<<END OF FILE>>>


---

## FILE: src\pages\clientes\HistorialPreciosCliente.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';

function HistorialPreciosCliente() {
  const [searchParams] = useSearchParams();

  const clienteIdInicial = searchParams.get('cliente_id') || '';

  const [clientes, setClientes] = useState<any[]>([]);
  const [precios, setPrecios] = useState<any[]>([]);

  const [tipos, setTipos] = useState<any[]>([]);
  const [medidas, setMedidas] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [filtros, setFiltros] = useState({
    cliente_id: clienteIdInicial,
    q: ''
  });

  const [form, setForm] = useState({
    cliente_id: clienteIdInicial,
    tipo_producto_id: '',
    medida_id: '',
    color_id: '',
    material_id: '',
    fecha_precio: '',
    precio_unitario: '',
    moneda_codigo: 'PEN',
    observacion: ''
  });

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info',
    mensaje: ''
  });

  const cargarBase = async () => {
    const [
      clientesData,
      tiposData,
      medidasData,
      coloresData,
      materialesData
    ] = await Promise.all([
      apiFetch('/clientes/select'),
      apiFetch('/catalogos/tiposProducto'),
      apiFetch('/catalogos/medidas'),
      apiFetch('/catalogos/colores'),
      apiFetch('/catalogos/materiales')
    ]);

    setClientes(clientesData.clientes);
    setTipos(tiposData.items);
    setMedidas(medidasData.items);
    setColores(coloresData.items);
    setMateriales(materialesData.items);
  };

  const cargarPrecios = async (
    paginaActual = page,
    filtrosActuales = filtros
  ) => {
    const params = new URLSearchParams();

    params.append('page', String(paginaActual));
    params.append('limit', '10');

    if (filtrosActuales.cliente_id) {
      params.append('cliente_id', filtrosActuales.cliente_id);
    }

    if (filtrosActuales.q.trim()) {
      params.append('q', filtrosActuales.q.trim());
    }

    const data = await apiFetch(`/clientes/precios?${params.toString()}`);

    setPrecios(data.precios);
    setPaginacion(data.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarBase();
        await cargarPrecios(1);
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    iniciar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        await cargarPrecios(page);
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    cargar();
  }, [page]);

  const handleFiltroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registrarPrecio = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiFetch('/clientes/precios', {
        method: 'POST',
        body: JSON.stringify({
          cliente_id: Number(form.cliente_id),
          tipo_producto_id: Number(form.tipo_producto_id),
          medida_id: Number(form.medida_id),
          color_id: Number(form.color_id),
          material_id: Number(form.material_id),
          fecha_precio: form.fecha_precio || undefined,
          precio_unitario: Number(form.precio_unitario),
          moneda_codigo: form.moneda_codigo,
          observacion: form.observacion
        })
      });

      setFeedback({
        tipo: 'success',
        mensaje: 'Precio registrado correctamente'
      });

      setForm({
        cliente_id: form.cliente_id,
        tipo_producto_id: '',
        medida_id: '',
        color_id: '',
        material_id: '',
        fecha_precio: '',
        precio_unitario: '',
        moneda_codigo: 'PEN',
        observacion: ''
      });

      setPage(1);
      await cargarPrecios(1);

    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const aplicarFiltros = async (e: React.FormEvent) => {
    e.preventDefault();

    setPage(1);

    try {
      await cargarPrecios(1, filtros);
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const limpiarFiltros = async () => {
    const filtrosLimpios = {
      cliente_id: '',
      q: ''
    };

    setFiltros(filtrosLimpios);
    setPage(1);

    try {
      await cargarPrecios(1, filtrosLimpios);
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  return (
    <div className="pedidos-page">
      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() => setFeedback({ ...feedback, mensaje: '' })}
      />

      <Link to="/gestion/clientes" className="btn-volver">
        ← Volver a clientes
      </Link>

      <div className="pedidos-header">
        <div>
          <h1>Historial de precios por cliente</h1>
          <p>Consulta y registra precios por tipo, medida, color y material.</p>
        </div>
      </div>

      <form className="form-card pedido-form" onSubmit={registrarPrecio}>
        <h3>Registrar precio</h3>

        <label>Cliente</label>
        <select
          name="cliente_id"
          value={form.cliente_id}
          onChange={handleFormChange}
        >
          <option value="">Seleccione cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.cliente_id} value={cliente.cliente_id}>
              {cliente.razon_social} - {cliente.ruc}
            </option>
          ))}
        </select>

        <div className="detalle-grid">
          <select
            name="tipo_producto_id"
            value={form.tipo_producto_id}
            onChange={handleFormChange}
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
            value={form.medida_id}
            onChange={handleFormChange}
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
            value={form.color_id}
            onChange={handleFormChange}
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
            value={form.material_id}
            onChange={handleFormChange}
          >
            <option value="">Material</option>
            {materiales.map((material) => (
              <option key={material.id} value={material.id}>
                {material.nombre}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="fecha_precio"
            value={form.fecha_precio}
            onChange={handleFormChange}
          />

          <input
            type="number"
            name="precio_unitario"
            value={form.precio_unitario}
            onChange={handleFormChange}
            placeholder="Precio"
          />

          <select
            name="moneda_codigo"
            value={form.moneda_codigo}
            onChange={handleFormChange}
          >
            <option value="PEN">Soles</option>
            <option value="USD">Dólares</option>
          </select>
        </div>

        <label>Observación</label>
        <textarea
          name="observacion"
          value={form.observacion}
          onChange={handleFormChange}
          rows={3}
          placeholder="Ejemplo: Precio acordado por volumen"
        />

        <button type="submit">
          Guardar precio
        </button>
      </form>

      <form className="filtros-card" onSubmit={aplicarFiltros}>
        <div>
          <label>Cliente</label>
          <select
            name="cliente_id"
            value={filtros.cliente_id}
            onChange={handleFiltroChange}
          >
            <option value="">Todos los clientes</option>
            {clientes.map((cliente) => (
              <option key={cliente.cliente_id} value={cliente.cliente_id}>
                {cliente.razon_social} - {cliente.ruc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Buscar producto</label>
          <input
            name="q"
            value={filtros.q}
            onChange={handleFiltroChange}
            placeholder="Tipo, medida, color o material"
          />
        </div>

        <div className="filtros-actions">
          <button type="submit">Buscar</button>
          <button type="button" className="btn-secondary" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </form>

      <div className="pedidos-card">
        <h3>Historial de precios</h3>

        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Fecha precio</th>
              <th>Precio</th>
              <th>Moneda</th>
              <th>Registrado por</th>
              <th>Observación</th>
            </tr>
          </thead>

          <tbody>
            {precios.map((precio) => (
              <tr key={precio.precio_cliente_id}>
                <td>
                  <strong>{precio.razon_social}</strong>
                  <br />
                  <span className="muted">{precio.ruc}</span>
                </td>

                <td>
                  {precio.tipo_producto} {precio.medida} {precio.color} {precio.material}
                </td>

                <td>{precio.fecha_precio?.slice(0, 10)}</td>
                <td>{Number(precio.precio_unitario).toFixed(4)}</td>
                <td>{precio.moneda_codigo}</td>
                <td>{precio.registrado_por}</td>
                <td>{precio.observacion || '-'}</td>
              </tr>
            ))}

            {precios.length === 0 && (
              <tr>
                <td colSpan={7}>No hay precios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="paginado">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginacion.page} de {paginacion.totalPaginas || 1}
          </span>

          <button
            type="button"
            disabled={page >= paginacion.totalPaginas}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default HistorialPreciosCliente;

<<<END OF FILE>>>


---

## FILE: src\pages\clientes\RegistrarCliente.tsx

<<<START OF FILE>>>

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';
import ClienteForm, {
  type ClienteFormData
} from '../../components/clientes/ClienteForm';

function RegistrarCliente() {
  const navigate = useNavigate();

  const [form, setForm] = useState<ClienteFormData>({
    ruc: '',
    razon_social: '',
    direccion: '',
    telefono: '',
    correo: '',
    agencia_entrega: ''
  });

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info',
    mensaje: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registrarCliente = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await apiFetch('/clientes', {
        method: 'POST',
        body: JSON.stringify(form)
      });

      setFeedback({
        tipo: 'success',
        mensaje: 'Cliente registrado correctamente'
      });

      setTimeout(() => {
        navigate('/gestion/clientes');
      }, 800);

    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  return (
    <div className="pedidos-page">
      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() => setFeedback({ ...feedback, mensaje: '' })}
      />

      <Link to="/gestion/clientes" className="btn-volver">
        ← Volver a clientes
      </Link>

      <div className="pedidos-header">
        <div>
          <h1>Registrar cliente</h1>
          <p>Agrega un nuevo cliente al sistema.</p>
        </div>
      </div>

      <form className="form-card" onSubmit={registrarCliente}>
        <h3>Datos del cliente</h3>

        <ClienteForm
          form={form}
          onChange={handleChange}
          textoBoton="Guardar cliente"
        />
      </form>
    </div>
  );
}

export default RegistrarCliente;

<<<END OF FILE>>>


---

## FILE: src\pages\Compras.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import { useBloqueoAccion } from '../hooks/useBloqueoAccion';

type DetalleCompraForm = {
  material_id: string;
  descripcion_item: string;
  cantidad: string;
  unidad_medida_id: string;
  precio_unitario: string;
};

const detalleVacio: DetalleCompraForm = {
  material_id: '',
  descripcion_item: '',
  cantidad: '',
  unidad_medida_id: '',
  precio_unitario: ''
};

function Compras() {
  const [compras, setCompras] = useState<any[]>([]);
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [unidades, setUnidades] = useState<any[]>([]);

  const [proveedorFiltro, setProveedorFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const [page, setPage] = useState(1);

  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState({
    proveedor_id: '',
    fecha_compra: '',
    numero_documento: '',
    moneda_codigo: 'PEN',
    descripcion: ''
  });

  const [detalles, setDetalles] = useState<DetalleCompraForm[]>([
    { ...detalleVacio }
  ]);

  /*
   * Protección contra múltiples registros.
   *
   * - registrandoCompra controla el estado visual.
   * - bloquearCompra evita que se ejecute otro POST.
   * - liberarCompra permite volver a intentar cuando termina.
   */
  const {
    procesando: registrandoCompra,
    intentarBloquear: bloquearCompra,
    liberar: liberarCompra
  } = useBloqueoAccion();

  const cargarCatalogosBase = async () => {
    const [
      proveedoresData,
      materialesData,
      unidadesData
    ] = await Promise.all([
      apiFetch('/proveedores'),
      apiFetch('/catalogos/materiales'),
      apiFetch('/catalogos/unidades-medida')
    ]);

    setProveedores(proveedoresData.proveedores);
    setMateriales(materialesData.items);
    setUnidades(unidadesData.unidades);
  };

  const cargarCompras = async (
    paginaActual = page,
    proveedorActual = proveedorFiltro,
    busquedaActual = busqueda
  ) => {
    const params = new URLSearchParams();

    params.append('page', String(paginaActual));
    params.append('limit', '10');

    if (proveedorActual) {
      params.append(
        'proveedor_id',
        proveedorActual
      );
    }

    if (busquedaActual.trim()) {
      params.append(
        'q',
        busquedaActual.trim()
      );
    }

    const comprasData = await apiFetch(
      `/compras?${params.toString()}`
    );

    setCompras(comprasData.compras);
    setPaginacion(comprasData.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarCatalogosBase();
        await cargarCompras(1);

      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        await cargarCompras(page);

      } catch (error: any) {
        setError(error.message);
      }
    };

    cargar();
  }, [page, proveedorFiltro]);

  const handleCompraChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleDetalleChange = (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {
    const nuevosDetalles = [...detalles];

    nuevosDetalles[index] = {
      ...nuevosDetalles[index],
      [e.target.name]: e.target.value
    };

    setDetalles(nuevosDetalles);
  };

  const agregarDetalle = () => {
    if (registrandoCompra) {
      return;
    }

    setDetalles([
      ...detalles,
      { ...detalleVacio }
    ]);
  };

  const quitarDetalle = (index: number) => {
    if (registrandoCompra) {
      return;
    }

    if (detalles.length === 1) {
      setError(
        'La compra debe tener al menos un item'
      );

      return;
    }

    setDetalles(
      detalles.filter((_, i) => i !== index)
    );
  };

  const calcularTotal = () => {
    return detalles.reduce(
      (total, item) => {
        return (
          total +
          Number(item.cantidad || 0) *
          Number(item.precio_unitario || 0)
        );
      },
      0
    );
  };

  const aplicarBusqueda = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError('');
    setMensaje('');
    setPage(1);

    try {
      await cargarCompras(1);

    } catch (error: any) {
      setError(error.message);
    }
  };

  const limpiarFiltros = async () => {
    setError('');
    setMensaje('');

    setProveedorFiltro('');
    setBusqueda('');
    setPage(1);

    try {
      await cargarCompras(
        1,
        '',
        ''
      );

    } catch (error: any) {
      setError(error.message);
    }
  };

  /*
   * Validaciones antes de ejecutar el POST.
   *
   * Es importante validar ANTES de tomar
   * el bloqueo de la operación.
   */
  const validarCompra = () => {
    if (!form.proveedor_id) {
      setError(
        'Debe seleccionar un proveedor'
      );

      return false;
    }

    if (detalles.length === 0) {
      setError(
        'La compra debe tener al menos un item'
      );

      return false;
    }

    for (
      let index = 0;
      index < detalles.length;
      index++
    ) {
      const item = detalles[index];

      if (
        !item.material_id &&
        !item.descripcion_item.trim()
      ) {
        setError(
          `El item ${index + 1} debe tener un material o una descripción`
        );

        return false;
      }

      if (
        !item.cantidad ||
        Number(item.cantidad) <= 0
      ) {
        setError(
          `El item ${index + 1} debe tener una cantidad mayor a 0`
        );

        return false;
      }

      if (!item.unidad_medida_id) {
        setError(
          `El item ${index + 1} debe tener una unidad`
        );

        return false;
      }

      if (
        !item.precio_unitario ||
        Number(item.precio_unitario) <= 0
      ) {
        setError(
          `El item ${index + 1} debe tener un precio unitario mayor a 0`
        );

        return false;
      }
    }

    return true;
  };

  const registrarCompra = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    /*
     * Primero validamos.
     *
     * Si existe un error todavía no tomamos
     * el bloqueo.
     */
    if (!validarCompra()) {
      return;
    }

    /*
     * Protección inmediata.
     *
     * Si ya existe una compra procesándose,
     * ignoramos cualquier nuevo submit.
     */
    if (!bloquearCompra()) {
      return;
    }

    let compraRegistrada = false;

    try {
      await apiFetch('/compras', {
        method: 'POST',

        body: JSON.stringify({
          proveedor_id:
            Number(form.proveedor_id),

          fecha_compra:
            form.fecha_compra || undefined,

          numero_documento:
            form.numero_documento,

          moneda_codigo:
            form.moneda_codigo,

          descripcion:
            form.descripcion,

          detalles:
            detalles.map((item) => ({
              material_id:
                item.material_id
                  ? Number(item.material_id)
                  : null,

              descripcion_item:
                item.descripcion_item,

              cantidad:
                Number(item.cantidad),

              unidad_medida_id:
                Number(item.unidad_medida_id),

              precio_unitario:
                Number(item.precio_unitario)
            }))
        })
      });

      /*
       * Desde este punto sabemos que
       * el POST fue exitoso.
       */
      compraRegistrada = true;

      setMensaje(
        'Compra registrada correctamente'
      );

      /*
       * Limpiamos el formulario solamente
       * después de que el backend confirmó
       * la creación.
       */
      setForm({
        proveedor_id: '',
        fecha_compra: '',
        numero_documento: '',
        moneda_codigo: 'PEN',
        descripcion: ''
      });

      setDetalles([
        { ...detalleVacio }
      ]);

      setPage(1);

      /*
       * La actualización del listado se maneja
       * aparte del registro.
       *
       * Esto evita que una falla al recargar
       * haga creer al usuario que la compra
       * no fue registrada.
       */
      try {
        await cargarCompras(
          1,
          proveedorFiltro,
          busqueda
        );

      } catch (errorListado: any) {
        console.error(
          'La compra fue registrada, pero no se pudo actualizar el listado:',
          errorListado.message
        );

        setError(
          'La compra fue registrada correctamente, pero no se pudo actualizar el listado. Recarga la página para verla.'
        );
      }

    } catch (error: any) {
      /*
       * Este error corresponde únicamente
       * al registro de la compra.
       */
      if (!compraRegistrada) {
        setError(error.message);
      }

    } finally {
      /*
       * Una vez terminada toda la operación,
       * permitimos un nuevo registro.
       */
      liberarCompra();
    }
  };

  return (
    <div>
      <h1>Compras</h1>

      <p>
        Registra compras a proveedores con uno o varios items.
      </p>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {mensaje && (
        <div className="success">
          {mensaje}
        </div>
      )}

      <form
        className="form-card pedido-form"
        onSubmit={registrarCompra}
      >
        <h3>Registrar compra</h3>

        <label>Proveedor</label>

        <select
          name="proveedor_id"
          value={form.proveedor_id}
          onChange={handleCompraChange}
          disabled={registrandoCompra}
        >
          <option value="">
            Seleccione proveedor
          </option>

          {proveedores.map(
            (proveedor) => (
              <option
                key={proveedor.proveedor_id}
                value={proveedor.proveedor_id}
              >
                {proveedor.razon_social} - {proveedor.ruc}
              </option>
            )
          )}
        </select>

        <label>Fecha de compra</label>

        <input
          type="date"
          name="fecha_compra"
          value={form.fecha_compra}
          onChange={handleCompraChange}
          disabled={registrandoCompra}
        />

        <label>Número de documento</label>

        <input
          name="numero_documento"
          value={form.numero_documento}
          onChange={handleCompraChange}
          placeholder="Factura, boleta, guía, etc."
          disabled={registrandoCompra}
        />

        <label>Moneda</label>

        <select
          name="moneda_codigo"
          value={form.moneda_codigo}
          onChange={handleCompraChange}
          disabled={registrandoCompra}
        >
          <option value="PEN">
            Soles
          </option>

          <option value="USD">
            Dólares
          </option>
        </select>

        <label>Descripción</label>

        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleCompraChange}
          placeholder="Ejemplo: Compra de materia prima para producción"
          rows={3}
          disabled={registrandoCompra}
        />

        <h3>Items de compra</h3>

        {detalles.map(
          (detalle, index) => (
            <div
              className="detalle-card"
              key={index}
            >
              <div className="detalle-header">
                <strong>
                  Item {index + 1}
                </strong>

                <button
                  type="button"
                  className="btn-danger"
                  onClick={() =>
                    quitarDetalle(index)
                  }
                  disabled={registrandoCompra}
                >
                  Quitar
                </button>
              </div>

              <div className="detalle-grid">
                <select
                  name="material_id"
                  value={detalle.material_id}
                  onChange={(e) =>
                    handleDetalleChange(
                      index,
                      e
                    )
                  }
                  disabled={registrandoCompra}
                >
                  <option value="">
                    Material opcional
                  </option>

                  {materiales.map(
                    (material) => (
                      <option
                        key={material.id}
                        value={material.id}
                      >
                        {material.nombre}
                      </option>
                    )
                  )}
                </select>

                <input
                  name="descripcion_item"
                  value={
                    detalle.descripcion_item
                  }
                  onChange={(e) =>
                    handleDetalleChange(
                      index,
                      e
                    )
                  }
                  placeholder="Descripción del item"
                  disabled={registrandoCompra}
                />

                <input
                  type="number"
                  name="cantidad"
                  value={detalle.cantidad}
                  onChange={(e) =>
                    handleDetalleChange(
                      index,
                      e
                    )
                  }
                  placeholder="Cantidad"
                  min="0"
                  step="any"
                  disabled={registrandoCompra}
                />

                <select
                  name="unidad_medida_id"
                  value={
                    detalle.unidad_medida_id
                  }
                  onChange={(e) =>
                    handleDetalleChange(
                      index,
                      e
                    )
                  }
                  disabled={registrandoCompra}
                >
                  <option value="">
                    Unidad
                  </option>

                  {unidades.map(
                    (unidad) => (
                      <option
                        key={
                          unidad.unidad_medida_id
                        }
                        value={
                          unidad.unidad_medida_id
                        }
                      >
                        {unidad.codigo}
                      </option>
                    )
                  )}
                </select>

                <input
                  type="number"
                  name="precio_unitario"
                  value={
                    detalle.precio_unitario
                  }
                  onChange={(e) =>
                    handleDetalleChange(
                      index,
                      e
                    )
                  }
                  placeholder="Precio unitario"
                  min="0"
                  step="any"
                  disabled={registrandoCompra}
                />

                <input
                  value={(
                    Number(
                      detalle.cantidad || 0
                    ) *
                    Number(
                      detalle.precio_unitario || 0
                    )
                  ).toFixed(2)}
                  disabled
                  placeholder="Subtotal"
                />
              </div>
            </div>
          )
        )}

        <button
          type="button"
          onClick={agregarDetalle}
          disabled={registrandoCompra}
        >
          + Agregar item
        </button>

        <div className="total-box">
          Total compra:{' '}
          {calcularTotal().toFixed(2)}{' '}
          {form.moneda_codigo}
        </div>

        <button
          type="submit"
          disabled={registrandoCompra}
        >
          {registrandoCompra
            ? 'Registrando compra...'
            : 'Guardar compra'}
        </button>
      </form>

      <form
        className="filtros-card"
        onSubmit={aplicarBusqueda}
      >
        <div>
          <label>Proveedor</label>

          <select
            value={proveedorFiltro}
            onChange={(e) => {
              setProveedorFiltro(
                e.target.value
              );

              setPage(1);
            }}
          >
            <option value="">
              Todos los proveedores
            </option>

            {proveedores.map(
              (proveedor) => (
                <option
                  key={proveedor.proveedor_id}
                  value={proveedor.proveedor_id}
                >
                  {proveedor.razon_social} - {proveedor.ruc}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label>Buscar</label>

          <input
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
            placeholder="Proveedor, RUC, documento o descripción"
          />
        </div>

        <div className="filtros-actions">
          <button type="submit">
            Buscar
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={limpiarFiltros}
          >
            Limpiar
          </button>
        </div>
      </form>

      <div className="tabla-card">
        <h3>Listado de compras</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Proveedor</th>
              <th>Fecha</th>
              <th>Documento</th>
              <th>Total</th>
              <th>Moneda</th>
              <th>Items</th>
              <th>Registrado por</th>
            </tr>
          </thead>

          <tbody>
            {compras.map(
              (compra) => (
                <tr
                  key={compra.compra_id}
                >
                  <td>
                    #{compra.compra_id}
                  </td>

                  <td>
                    {compra.razon_social}
                  </td>

                  <td>
                    {compra.fecha_compra?.slice(
                      0,
                      10
                    )}
                  </td>

                  <td>
                    {
                      compra.numero_documento ||
                      '-'
                    }
                  </td>

                  <td>
                    {Number(
                      compra.monto_total
                    ).toFixed(2)}
                  </td>

                  <td>
                    {compra.moneda_codigo}
                  </td>

                  <td>
                    {compra.cantidad_items}
                  </td>

                  <td>
                    {compra.registrado_por}
                  </td>
                </tr>
              )
            )}

            {compras.length === 0 && (
              <tr>
                <td colSpan={8}>
                  No hay compras registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="paginado">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            Anterior
          </button>

          <span>
            Página {paginacion.page} de{' '}
            {paginacion.totalPaginas || 1}
          </span>

          <button
            type="button"
            disabled={
              page >=
              paginacion.totalPaginas
            }
            onClick={() =>
              setPage(page + 1)
            }
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Compras;

<<<END OF FILE>>>


---

## FILE: src\pages\comprasMateriaPrima\CompraMateriaPrimaDetalle.tsx

<<<START OF FILE>>>

import {
  useEffect,
  useState
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/comprasMateriaPrima.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function CompraMateriaPrimaDetalle() {
  const {
    compra_materia_prima_id
  } = useParams();

  const [
    compra,
    setCompra
  ] = useState<any | null>(
    null
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);

        try {
          const data =
            await apiFetch(
              `/compras-materia-prima/${compra_materia_prima_id}`
            );

          setCompra(
            data.compra
          );

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    compra_materia_prima_id
  ]);


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando detalle del lote...
        </p>
      </div>
    );
  }


  if (!compra) {
    return (
      <div className="pedidos-page">
        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() =>
            setFeedback({
              ...feedback,
              mensaje: ''
            })
          }
        />

        <Link
          to="/gestion/compras-materia-prima"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar la compra.
        </div>
      </div>
    );
  }


  const comprado =
    compra.detalles.reduce(
      (
        total: number,
        item: any
      ) =>
        total +
        Number(
          item.cantidad ||
          0
        ),
      0
    );

  const disponible =
    compra.detalles.reduce(
      (
        total: number,
        item: any
      ) =>
        total +
        Number(
          item
            .cantidad_disponible ||
          0
        ),
      0
    );


  return (
    <div className="pedidos-page compra-mp-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <Link
        to="/gestion/compras-materia-prima"
        className="btn-volver"
      >
        ← Volver a compras de materia prima
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            {compra.nombre_lote}
          </h1>

          <p>
            Detalle de la compra y saldo actual
            de cada materia prima del lote.
          </p>
        </div>
      </div>


      <div className="compra-mp-resumen">

        <div>
          <span>
            Proveedor
          </span>

          <strong>
            {
              compra.razon_social
            }
          </strong>

          <small>
            RUC {compra.ruc}
          </small>
        </div>


        <div>
          <span>
            Fecha
          </span>

          <strong>
            {
              compra
                .fecha_compra
                ?.slice(
                  0,
                  10
                )
            }
          </strong>
        </div>


        <div>
          <span>
            Documento
          </span>

          <strong>
            {
              compra
                .numero_documento ||
              '-'
            }
          </strong>
        </div>


        <div>
          <span>
            Comprado
          </span>

          <strong>
            {
              comprado.toFixed(3)
            } KG
          </strong>
        </div>


        <div>
          <span>
            Disponible
          </span>

          <strong>
            {
              disponible.toFixed(3)
            } KG
          </strong>
        </div>


        <div>
          <span>
            Total
          </span>

          <strong>
            {
              compra.moneda_codigo ===
                'USD'
                ? '$'
                : 'S/'
            }
            {' '}
            {
              Number(
                compra.monto_total
              )
                .toFixed(2)
            }
            {' '}
            {
              compra.moneda_codigo
            }
          </strong>
        </div>

      </div>


      {compra.descripcion && (
        <div className="form-card">
          <h3>
            Descripción
          </h3>

          <p>
            {compra.descripcion}
          </p>
        </div>
      )}


      <div className="tabla-card">

        <h3>
          Materias primas del lote
        </h3>

        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Color</th>
                <th>Descripción</th>
                <th>Comprado</th>
                <th>Disponible</th>
                <th>Consumido</th>
                <th>Precio unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {compra.detalles.map(
                (item: any) => {
                  const consumido =
                    Number(
                      item.cantidad_inicial ||
                      0
                    ) -
                    Number(
                      item
                        .cantidad_disponible ||
                      0
                    );

                  return (
                    <tr
                      key={
                        item
                          .compra_materia_prima_detalle_id
                      }
                    >
                      <td>
                        <strong>
                          {
                            item.material
                          }
                        </strong>
                      </td>

                      <td>
                        {
                          item.color
                        }
                      </td>

                      <td>
                        {
                          item
                            .descripcion_item ||
                          '-'
                        }
                      </td>

                      <td>
                        {
                          Number(
                            item
                              .cantidad_inicial
                          )
                            .toFixed(3)
                        } KG
                      </td>

                      <td>
                        <strong>
                          {
                            Number(
                              item
                                .cantidad_disponible
                            )
                              .toFixed(3)
                          } KG
                        </strong>
                      </td>

                      <td>
                        {
                          consumido.toFixed(
                            3
                          )
                        } KG
                      </td>

                      <td>
                        {
                          Number(
                            item
                              .precio_unitario
                          )
                            .toFixed(4)
                        }
                        {' '}
                        {
                          compra
                            .moneda_codigo
                        }
                      </td>

                      <td>
                        {
                          Number(
                            item.subtotal
                          )
                            .toFixed(2)
                        }
                        {' '}
                        {
                          compra
                            .moneda_codigo
                        }
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>

      </div>


      <div className="form-card">
        <div className="compra-mp-meta">
          <span>
            Registrado por:
            {' '}
            <strong>
              {
                compra
                  .registrado_por
              }
            </strong>
          </span>

          <span>
            Registro:
            {' '}
            {
              compra.created_at
                ? new Date(
                    compra.created_at
                  )
                    .toLocaleString()
                : '-'
            }
          </span>
        </div>
      </div>

    </div>
  );
}


export default CompraMateriaPrimaDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\comprasMateriaPrima\ComprasMateriaPrimaLista.tsx

<<<START OF FILE>>>

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/comprasMateriaPrima.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type FiltrosCompraMP = {
  proveedor_id: string;
  q: string;
};


const filtrosVacios: FiltrosCompraMP = {
  proveedor_id: '',
  q: ''
};


function ComprasMateriaPrimaLista() {
  const [
    compras,
    setCompras
  ] = useState<any[]>([]);

  const [
    proveedores,
    setProveedores
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
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  /*
   * filtros:
   *   lo que el usuario está escribiendo.
   *
   * filtrosAplicados:
   *   lo que realmente alimenta la consulta.
   *
   * Así cambiar el select/input no dispara
   * consultas hasta pulsar "Buscar".
   */
  const [
    filtros,
    setFiltros
  ] = useState<FiltrosCompraMP>({
    ...filtrosVacios
  });

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<FiltrosCompraMP>({
    ...filtrosVacios
  });

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });


  const cargarProveedores =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/proveedores'
          );

        setProveedores(
          data.proveedores || []
        );
      },
      []
    );


  const cargarCompras =
    useCallback(
      async (
        paginaActual: number,
        filtrosActuales: FiltrosCompraMP
      ) => {
        const params =
          new URLSearchParams();

        params.set(
          'page',
          String(paginaActual)
        );

        params.set(
          'limit',
          '10'
        );

        if (
          filtrosActuales.proveedor_id
        ) {
          params.set(
            'proveedor_id',
            filtrosActuales.proveedor_id
          );
        }

        if (
          filtrosActuales.q.trim()
        ) {
          params.set(
            'q',
            filtrosActuales.q.trim()
          );
        }

        const data =
          await apiFetch(
            `/compras-materia-prima?${params.toString()}`
          );

        setCompras(
          data.compras || []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarProveedores(),
            cargarCompras(
              1,
              filtrosVacios
            )
          ]);

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarCompras,
    cargarProveedores
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    const recargar =
      async () => {
        try {
          await cargarCompras(
            page,
            filtrosAplicados
          );

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });
        }
      };

    recargar();
  }, [
    page,
    filtrosAplicados,
    cargarCompras
  ]);


  const aplicarFiltros = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPage(1);

    setFiltrosAplicados({
      proveedor_id:
        filtros.proveedor_id,
      q:
        filtros.q.trim()
    });
  };


  const limpiarFiltros = () => {
    setFiltros({
      ...filtrosVacios
    });

    setPage(1);

    setFiltrosAplicados({
      ...filtrosVacios
    });
  };


  const monedaSimbolo = (
    moneda: string
  ) => {
    return moneda === 'USD'
      ? '$'
      : 'S/';
  };


  return (
    <div className="pedidos-page compra-mp-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <div className="pedidos-header">
        <div>
          <h1>
            Compras de materia prima
          </h1>

          <p>
            Gestiona las compras de fibra por lote
            y su ingreso al almacén de materia prima.
          </p>
        </div>

        <Link
          to="/gestion/compras-materia-prima/registrar"
          className="btn-primary-link"
        >
          + Registrar lote
        </Link>
      </div>


      <form
        className="compra-mp-filtros"
        onSubmit={aplicarFiltros}
      >
        <div>
          <label>
            Buscar
          </label>

          <input
            value={filtros.q}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                q: e.target.value
              })
            }
            placeholder="Lote, documento, proveedor..."
          />
        </div>

        <div>
          <label>
            Proveedor
          </label>

          <select
            value={filtros.proveedor_id}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                proveedor_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todos
            </option>

            {proveedores.map(
              (proveedor) => (
                <option
                  key={
                    proveedor.proveedor_id
                  }
                  value={
                    proveedor.proveedor_id
                  }
                >
                  {
                    proveedor.razon_social
                  }
                </option>
              )
            )}
          </select>
        </div>

        <button type="submit">
          Buscar
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={limpiarFiltros}
        >
          Limpiar
        </button>
      </form>


      <div className="tabla-card">

        <div className="compra-mp-tabla-header">
          <div>
            <h3>
              Lotes registrados
            </h3>

            <span className="muted">
              {
                paginacion.total
              } registro(s)
            </span>
          </div>
        </div>


        {cargando ? (
          <p>
            Cargando compras...
          </p>
        ) : (
          <>
            <div className="tabla-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Lote</th>
                    <th>Proveedor</th>
                    <th>Fecha</th>
                    <th>Documento</th>
                    <th>Items</th>
                    <th>Total comprado</th>
                    <th>Disponible</th>
                    <th>Monto</th>
                    <th>Registrado por</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {compras.map(
                    (compra) => (
                      <tr
                        key={
                          compra
                            .compra_materia_prima_id
                        }
                      >
                        <td>
                          <strong>
                            {
                              compra
                                .nombre_lote
                            }
                          </strong>
                        </td>

                        <td>
                          {
                            compra
                              .razon_social
                          }
                          <br />
                          <span className="muted">
                            {
                              compra.ruc
                            }
                          </span>
                        </td>

                        <td>
                          {
                            compra
                              .fecha_compra
                              ?.slice(
                                0,
                                10
                              )
                          }
                        </td>

                        <td>
                          {
                            compra
                              .numero_documento ||
                            '-'
                          }
                        </td>

                        <td>
                          {
                            compra
                              .cantidad_items
                          }
                        </td>

                        <td>
                          <strong>
                            {
                              Number(
                                compra
                                  .cantidad_total_kg ||
                                0
                              )
                                .toFixed(3)
                            } KG
                          </strong>
                        </td>

                        <td>
                          {
                            Number(
                              compra
                                .cantidad_disponible_kg ||
                              0
                            )
                              .toFixed(3)
                          } KG
                        </td>

                        <td>
                          {
                            monedaSimbolo(
                              compra
                                .moneda_codigo
                            )
                          }
                          {' '}
                          {
                            Number(
                              compra
                                .monto_total ||
                              0
                            )
                              .toFixed(2)
                          }
                          {' '}
                          {
                            compra
                              .moneda_codigo
                          }
                        </td>

                        <td>
                          {
                            compra
                              .registrado_por
                          }
                        </td>

                        <td>
                          <Link
                            className="btn-outline"
                            to={
                              `/gestion/compras-materia-prima/${compra.compra_materia_prima_id}`
                            }
                          >
                            Ver detalle
                          </Link>
                        </td>
                      </tr>
                    )
                  )}

                  {
                    compras.length === 0 &&
                    (
                      <tr>
                        <td colSpan={10}>
                          No hay compras de materia prima
                          para los filtros seleccionados.
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>


            <div className="paginado">

              <button
                type="button"
                disabled={
                  page <= 1
                }
                onClick={() =>
                  setPage(
                    page - 1
                  )
                }
              >
                Anterior
              </button>

              <span>
                Página {
                  paginacion.page
                } de {
                  paginacion
                    .totalPaginas ||
                  1
                }
              </span>

              <button
                type="button"
                disabled={
                  page >=
                  paginacion.totalPaginas
                }
                onClick={() =>
                  setPage(
                    page + 1
                  )
                }
              >
                Siguiente
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  );
}


export default ComprasMateriaPrimaLista;


<<<END OF FILE>>>


---

## FILE: src\pages\comprasMateriaPrima\RegistrarCompraMateriaPrima.tsx

<<<START OF FILE>>>

import {
  useEffect,
  useState
} from 'react';

import type {
  ChangeEvent,
  FormEvent
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import '../../styles/comprasMateriaPrima.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type DetalleCompraMP = {
  material_id: string;
  color_id: string;
  cantidad: string;
  precio_unitario: string;
  descripcion_item: string;
};


const detalleVacio:
  DetalleCompraMP = {
  material_id: '',
  color_id: '',
  cantidad: '',
  precio_unitario: '',
  descripcion_item: ''
};


const fechaLocalActual = () => {
  const hoy = new Date();

  const anio =
    hoy.getFullYear();

  const mes =
    String(
      hoy.getMonth() + 1
    ).padStart(2, '0');

  const dia =
    String(
      hoy.getDate()
    ).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
};


const generarIdempotencyKey = () => {
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

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>([]);

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    cargandoCatalogos,
    setCargandoCatalogos
  ] = useState(true);

  const [
    form,
    setForm
  ] = useState({
    nombre_lote: '',
    proveedor_id: '',
    fecha_compra:
      fechaLocalActual(),
    numero_documento: '',
    /*
     * La moneda predeterminada del módulo
     * será Soles.
     */
    moneda_codigo: 'PEN',
    descripcion: ''
  });

  const [
    detalles,
    setDetalles
  ] = useState<
    DetalleCompraMP[]
  >([
    {
      ...detalleVacio
    }
  ]);

  /*
   * Esta clave permanece estable mientras
   * el usuario intenta registrar ESTA compra.
   *
   * Si se pierde la respuesta después de que
   * el backend hizo COMMIT, un reintento con
   * la misma key recuperará la compra existente
   * en lugar de duplicar el inventario.
   *
   * Solamente se genera una nueva key después
   * de un éxito confirmado.
   */
  const [
    idempotencyKey,
    setIdempotencyKey
  ] = useState(
    generarIdempotencyKey
  );

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });

  const {
    procesando:
      registrandoCompra,
    intentarBloquear:
      bloquearRegistro,
    liberar:
      liberarRegistro
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar =
      async () => {
        setCargandoCatalogos(true);

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

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargandoCatalogos(
            false
          );
        }
      };

    cargar();
  }, []);


  const handleCabeceraChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value
    } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };


  const handleDetalleChange = (
    index: number,
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {
    if (registrandoCompra) {
      return;
    }

    const nuevos = [
      ...detalles
    ];

    nuevos[index] = {
      ...nuevos[index],
      [e.target.name]:
        e.target.value
    };

    setDetalles(nuevos);
  };


  const agregarDetalle = () => {
    if (registrandoCompra) {
      return;
    }

    setDetalles([
      ...detalles,
      {
        ...detalleVacio
      }
    ]);
  };


  const quitarDetalle = (
    index: number
  ) => {
    if (registrandoCompra) {
      return;
    }

    if (
      detalles.length === 1
    ) {
      setFeedback({
        tipo: 'warning',
        mensaje:
          'La compra debe tener al menos una materia prima'
      });

      return;
    }

    setDetalles(
      detalles.filter(
        (_, i) =>
          i !== index
      )
    );
  };


  const calcularSubtotal = (
    detalle: DetalleCompraMP
  ) => {
    return (
      Number(
        detalle.cantidad ||
        0
      ) *
      Number(
        detalle.precio_unitario ||
        0
      )
    );
  };


  const montoTotal =
    detalles.reduce(
      (
        total,
        detalle
      ) =>
        total +
        calcularSubtotal(
          detalle
        ),
      0
    );


  const validarFormulario = () => {
    if (
      !form.nombre_lote.trim()
    ) {
      return (
        'El nombre del lote es obligatorio'
      );
    }

    if (
      !form.proveedor_id
    ) {
      return (
        'Debe seleccionar un proveedor'
      );
    }

    if (
      !form.fecha_compra
    ) {
      return (
        'La fecha de compra es obligatoria'
      );
    }

    const combinaciones =
      new Set<string>();

    for (
      let i = 0;
      i < detalles.length;
      i++
    ) {
      const item =
        detalles[i];

      if (!item.material_id) {
        return (
          `El item ${i + 1} debe tener material`
        );
      }

      if (!item.color_id) {
        return (
          `El item ${i + 1} debe tener color`
        );
      }

      const cantidad =
        Number(item.cantidad);

      if (
        !Number.isFinite(
          cantidad
        ) ||
        cantidad <= 0
      ) {
        return (
          `El item ${i + 1} debe tener una cantidad mayor a 0`
        );
      }

      const precio =
        Number(
          item.precio_unitario
        );

      if (
        !Number.isFinite(
          precio
        ) ||
        precio < 0
      ) {
        return (
          `El item ${i + 1} debe tener un precio válido`
        );
      }

      const clave =
        `${item.material_id}-${item.color_id}`;

      if (
        combinaciones.has(
          clave
        )
      ) {
        return (
          `El item ${i + 1} repite una combinación de material y color`
        );
      }

      combinaciones.add(
        clave
      );
    }

    if (
      !Number.isFinite(
        montoTotal
      ) ||
      montoTotal <= 0
    ) {
      return (
        'El monto total debe ser mayor a 0'
      );
    }

    return null;
  };


  const registrarCompra = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (
      !bloquearRegistro()
    ) {
      return;
    }

    const error =
      validarFormulario();

    if (error) {
      liberarRegistro();

      setFeedback({
        tipo: 'error',
        mensaje: error
      });

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
                  form
                    .nombre_lote
                    .trim(),

                proveedor_id:
                  Number(
                    form
                      .proveedor_id
                  ),

                fecha_compra:
                  form
                    .fecha_compra,

                numero_documento:
                  form
                    .numero_documento
                    .trim() ||
                  null,

                moneda_codigo:
                  form
                    .moneda_codigo,

                descripcion:
                  form
                    .descripcion
                    .trim() ||
                  null,

                detalles:
                  detalles.map(
                    (item) => ({
                      material_id:
                        Number(
                          item
                            .material_id
                        ),

                      color_id:
                        Number(
                          item
                            .color_id
                        ),

                      cantidad:
                        Number(
                          item
                            .cantidad
                        ),

                      precio_unitario:
                        Number(
                          item
                            .precio_unitario
                        ),

                      descripcion_item:
                        item
                          .descripcion_item
                          .trim() ||
                        null
                    })
                  )
              })
          }
        );

      setFeedback({
        tipo: 'success',
        mensaje:
          data.reutilizada
            ? 'La compra ya había sido registrada. Se recuperó el registro existente sin duplicar el stock.'
            : 'Compra de materia prima registrada correctamente.'
      });

      setIdempotencyKey(
        generarIdempotencyKey()
      );

      setTimeout(() => {
        navigate(
          `/gestion/compras-materia-prima/${data.compra.compra_materia_prima_id}`
        );
      }, 900);

    } catch (error: any) {
      liberarRegistro();

      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };


  return (
    <div className="pedidos-page compra-mp-page compra-mp-registro-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <Link
        to="/gestion/compras-materia-prima"
        className="btn-volver"
      >
        ← Volver a compras de materia prima
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            Registrar compra de materia prima
          </h1>

          <p>
            Registra una importación o compra de fibra
            y genera automáticamente el stock del lote.
          </p>
        </div>
      </div>


      <form
        className="form-card compra-mp-form"
        onSubmit={registrarCompra}
      >
        <section className="compra-mp-seccion">
          <div className="compra-mp-seccion-titulo">
            <div>
              <h3>
                Datos del lote
              </h3>

              <p>
                Información general de la compra o importación.
              </p>
            </div>
          </div>


          <div className="compra-mp-cabecera-grid">

            <div>
              <label>
                Nombre del lote
              </label>

              <input
                name="nombre_lote"
                value={
                  form.nombre_lote
                }
                onChange={
                  handleCabeceraChange
                }
                placeholder="Ejemplo: IMPORTACION SEP 2026"
                disabled={
                  registrandoCompra
                }
              />
            </div>


            <div>
              <label>
                Proveedor
              </label>

              <select
                name="proveedor_id"
                value={
                  form.proveedor_id
                }
                onChange={
                  handleCabeceraChange
                }
                disabled={
                  registrandoCompra ||
                  cargandoCatalogos
                }
              >
                <option value="">
                  Seleccione proveedor
                </option>

                {proveedores.map(
                  (proveedor) => (
                    <option
                      key={
                        proveedor
                          .proveedor_id
                      }
                      value={
                        proveedor
                          .proveedor_id
                      }
                    >
                      {
                        proveedor
                          .razon_social
                      }
                      {' - '}
                      {
                        proveedor.ruc
                      }
                    </option>
                  )
                )}
              </select>
            </div>


            <div>
              <label>
                Fecha de compra
              </label>

              <input
                type="date"
                name="fecha_compra"
                value={
                  form.fecha_compra
                }
                onChange={
                  handleCabeceraChange
                }
                disabled={
                  registrandoCompra
                }
              />
            </div>


            <div>
              <label>
                Número de documento
              </label>

              <input
                name="numero_documento"
                value={
                  form
                    .numero_documento
                }
                onChange={
                  handleCabeceraChange
                }
                placeholder="Factura, guía, etc."
                disabled={
                  registrandoCompra
                }
              />
            </div>


            <div>
              <label>
                Moneda
              </label>

              <select
                name="moneda_codigo"
                value={
                  form.moneda_codigo
                }
                onChange={
                  handleCabeceraChange
                }
                disabled={
                  registrandoCompra
                }
              >
                <option value="PEN">
                  Soles
                </option>

                <option value="USD">
                  Dólares
                </option>
              </select>
            </div>


            <div className="compra-mp-campo-ancho">
              <label>
                Descripción
              </label>

              <textarea
                name="descripcion"
                value={
                  form.descripcion
                }
                onChange={
                  handleCabeceraChange
                }
                rows={3}
                placeholder="Observación general de la compra o importación"
                disabled={
                  registrandoCompra
                }
              />
            </div>

          </div>
        </section>


        <section className="compra-mp-seccion compra-mp-seccion-items">

          <div className="compra-mp-items-header">
            <div>
              <h3>
                Materias primas del lote
              </h3>

              <p className="muted">
                Cada item se registra en KG y se identifica
                mediante Material + Color.
              </p>
            </div>

            <button
              type="button"
              onClick={
                agregarDetalle
              }
              disabled={
                registrandoCompra
              }
            >
              + Agregar materia prima
            </button>
          </div>


          <div className="compra-mp-items">

            {detalles.map(
              (
                detalle,
                index
              ) => (
                <div
                  className="compra-mp-item-card"
                  key={index}
                >

                  <div className="compra-mp-item-title">
                    <div>
                      <strong>
                        Materia prima {
                          index + 1
                        }
                      </strong>

                      <span className="compra-mp-item-subtitle">
                        Selecciona material, color,
                        cantidad y precio.
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() =>
                        quitarDetalle(
                          index
                        )
                      }
                      disabled={
                        registrandoCompra
                      }
                    >
                      Quitar
                    </button>
                  </div>


                  <div className="compra-mp-item-grid">

                    <div className="compra-mp-item-material">
                      <label>
                        Material
                      </label>

                      <select
                        name="material_id"
                        value={
                          detalle
                            .material_id
                        }
                        onChange={(e) =>
                          handleDetalleChange(
                            index,
                            e
                          )
                        }
                        disabled={
                          registrandoCompra ||
                          cargandoCatalogos
                        }
                      >
                        <option value="">
                          Seleccione
                        </option>

                        {materiales.map(
                          (material) => (
                            <option
                              key={
                                material.id
                              }
                              value={
                                material.id
                              }
                            >
                              {
                                material
                                  .nombre
                              }
                            </option>
                          )
                        )}
                      </select>
                    </div>


                    <div className="compra-mp-item-color">
                      <label>
                        Color
                      </label>

                      <select
                        name="color_id"
                        value={
                          detalle
                            .color_id
                        }
                        onChange={(e) =>
                          handleDetalleChange(
                            index,
                            e
                          )
                        }
                        disabled={
                          registrandoCompra ||
                          cargandoCatalogos
                        }
                      >
                        <option value="">
                          Seleccione
                        </option>

                        {colores.map(
                          (color) => (
                            <option
                              key={
                                color.id
                              }
                              value={
                                color.id
                              }
                            >
                              {
                                color.nombre
                              }
                            </option>
                          )
                        )}
                      </select>
                    </div>


                    <div className="compra-mp-item-cantidad">
                      <label>
                        Cantidad
                      </label>

                      <div className="compra-mp-input-unidad">
                        <input
                          type="number"
                          name="cantidad"
                          value={
                            detalle.cantidad
                          }
                          onChange={(e) =>
                            handleDetalleChange(
                              index,
                              e
                            )
                          }
                          min="0.001"
                          step="0.001"
                          placeholder="0.000"
                          disabled={
                            registrandoCompra
                          }
                        />

                        <span>
                          KG
                        </span>
                      </div>
                    </div>


                    <div className="compra-mp-item-precio">
                      <label>
                        Precio unitario
                      </label>

                      <div className="compra-mp-input-moneda">
                        <span>
                          {
                            form.moneda_codigo ===
                              'PEN'
                              ? 'S/'
                              : '$'
                          }
                        </span>

                        <input
                          type="number"
                          name="precio_unitario"
                          value={
                            detalle
                              .precio_unitario
                          }
                          onChange={(e) =>
                            handleDetalleChange(
                              index,
                              e
                            )
                          }
                          min="0"
                          step="0.0001"
                          placeholder="0.0000"
                          disabled={
                            registrandoCompra
                          }
                        />
                      </div>
                    </div>


                    <div className="compra-mp-item-subtotal">
                      <label>
                        Subtotal
                      </label>

                      <div className="compra-mp-subtotal-box">
                        <span>
                          {
                            form.moneda_codigo ===
                              'PEN'
                              ? 'S/'
                              : '$'
                          }
                        </span>

                        <strong>
                          {
                            calcularSubtotal(
                              detalle
                            )
                              .toFixed(2)
                          }
                        </strong>
                      </div>
                    </div>


                    <div className="compra-mp-campo-ancho compra-mp-item-descripcion">
                      <label>
                        Descripción opcional
                      </label>

                      <input
                        name="descripcion_item"
                        value={
                          detalle
                            .descripcion_item
                        }
                        onChange={(e) =>
                          handleDetalleChange(
                            index,
                            e
                          )
                        }
                        placeholder="Ejemplo: Fibra virgen"
                        disabled={
                          registrandoCompra
                        }
                      />
                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        </section>


        <div className="compra-mp-total">
          <div>
            <span>
              Total del lote
            </span>

            <small>
              Suma de todos los ítems registrados
            </small>
          </div>

          <strong>
            {
              form.moneda_codigo ===
                'USD'
                ? '$'
                : 'S/'
            }
            {' '}
            {
              montoTotal.toFixed(
                2
              )
            }
            {' '}
            {
              form.moneda_codigo
            }
          </strong>
        </div>


        <div className="compra-mp-form-actions">
          <Link
            to="/gestion/compras-materia-prima"
            className="btn-secondary-link"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={
              registrandoCompra ||
              cargandoCatalogos
            }
          >
            {
              registrandoCompra
                ? 'Registrando compra...'
                : 'Registrar compra e ingresar stock'
            }
          </button>
        </div>

      </form>

    </div>
  );
}


export default RegistrarCompraMateriaPrima;


<<<END OF FILE>>>


---

## FILE: src\pages\Dashboard.tsx

<<<START OF FILE>>>

import { getUsuario } from '../services/api';

function Dashboard() {
  const usuario = getUsuario();

  return (
    <div>
      <h1>Panel de gestión</h1>
      <p>Bienvenido al sistema de gestión de la empresa de driza.</p>

      <div className="cards">
        <div className="card">
          <h3>Usuario</h3>
          <p>{usuario?.nombre_completo}</p>
        </div>

        <div className="card">
          <h3>Correo</h3>
          <p>{usuario?.correo}</p>
        </div>

        <div className="card">
          <h3>Roles</h3>
          <p>{usuario?.roles?.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

<<<END OF FILE>>>


---

## FILE: src\pages\DepositoPedidoDetalle.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../services/api';
import { useBloqueoAccion } from '../hooks/useBloqueoAccion';

function DepositoPedidoDetalle() {
  const { pedido_id } = useParams();
  const {
    procesando: registrandoDeposito,
    intentarBloquear: bloquearDeposito,
    liberar: liberarDeposito
  } = useBloqueoAccion();
  
  const [pedido, setPedido] = useState<any | null>(null);
  const [tiposDeposito, setTiposDeposito] = useState<any[]>([]);

  const [form, setForm] = useState({
    tipo_deposito_id: '',
    fecha_deposito: '',
    monto: '',
    moneda_codigo: 'PEN',
    numero_operacion: '',
    observacion: ''
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargarPedido = async () => {
    const data = await apiFetch(`/depositos/pedidos/${pedido_id}`);
    setPedido(data.pedido);
  };

  const cargarTiposDeposito = async () => {
    const data = await apiFetch('/depositos/tipos');
    setTiposDeposito(data.tipos);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarTiposDeposito();
        await cargarPedido();
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, [pedido_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const claseEstado = (estado: string) => {
    if (estado === 'PAGADO') return 'estado estado-completo';
    if (estado === 'PARCIAL') return 'estado estado-parcial';
    return 'estado estado-pendiente';
  };

  const textoEstado = (estado: string) => {
    if (estado === 'PAGADO') return 'Pagado';
    if (estado === 'PARCIAL') return 'Parcial';
    return 'Sin pago';
  };
  

  const registrarDeposito = async (e: React.FormEvent) => {
  e.preventDefault();

  setError('');
  setMensaje('');

  if (!pedido) {
    setError('No se encontró el pedido');
    return;
  }

  if (!form.tipo_deposito_id) {
    setError('Debe seleccionar un tipo de depósito');
    return;
  }

  if (!form.monto || Number(form.monto) <= 0) {
    setError('El monto debe ser mayor a 0');
    return;
  }

  if (!bloquearDeposito()) {
    return;
  }

  try {
    await apiFetch('/depositos', {
      method: 'POST',
      body: JSON.stringify({
        pedido_id: pedido.pedido_id,
        tipo_deposito_id: Number(form.tipo_deposito_id),
        fecha_deposito: form.fecha_deposito || undefined,
        monto: Number(form.monto),
        moneda_codigo: form.moneda_codigo,
        numero_operacion: form.numero_operacion,
        observacion: form.observacion
      })
    });

    setMensaje('Depósito registrado correctamente');

    setForm({
      tipo_deposito_id: '',
      fecha_deposito: '',
      monto: '',
      moneda_codigo: 'PEN',
      numero_operacion: '',
      observacion: ''
    });

    await cargarPedido();

  } catch (error: any) {
    setError(error.message);

  } finally {
    liberarDeposito();
  }
};

  if (!pedido) {
    return (
      <div>
        <Link to="/gestion/depositos" className="btn-volver">
          ← Volver a Depósitos
        </Link>

        {error ? <div className="error">{error}</div> : <p>Cargando pedido...</p>}
      </div>
    );
  }

  return (
    <div>
      <Link to="/gestion/depositos" className="btn-volver">
        ← Volver a Depósitos
      </Link>

      <div className="pedido-detalle-header">
        <div>
          <h1>Pedido #{pedido.pedido_id}</h1>
          <p>{pedido.razon_social} - {pedido.ruc}</p>
        </div>

        <span className={claseEstado(pedido.estado_pago_general)}>
          {textoEstado(pedido.estado_pago_general)}
        </span>
      </div>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <div className="pedido-resumen-grid">
        <div className="resumen-card">
          <span>Cliente</span>
          <strong>{pedido.razon_social}</strong>
        </div>

        <div className="resumen-card">
          <span>Fecha pedido</span>
          <strong>{pedido.fecha_pedido?.slice(0, 10)}</strong>
        </div>

        <div className="resumen-card">
          <span>Entrega estimada</span>
          <strong>{pedido.fecha_entrega_estimada?.slice(0, 10) || '-'}</strong>
        </div>

        <div className="resumen-card">
          <span>Estado pago</span>
          <strong>{textoEstado(pedido.estado_pago_general)}</strong>
        </div>
      </div>

      <div className="descripcion-card">
        <strong>Descripción del pedido:</strong>
        <p>{pedido.descripcion_pedido || 'Sin descripción'}</p>
      </div>

      <div className="tabla-card">
        <h3>Resumen de pago por moneda</h3>

        <table>
          <thead>
            <tr>
              <th>Moneda</th>
              <th>Total pedido</th>
              <th>Total depositado</th>
              <th>Saldo pendiente</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {pedido.totales.map((total: any) => (
              <tr key={total.moneda_codigo}>
                <td>{total.moneda_codigo}</td>
                <td>{Number(total.total_pedido).toFixed(2)}</td>
                <td>{Number(total.total_depositado).toFixed(2)}</td>
                <td>{Number(total.saldo_pendiente).toFixed(2)}</td>
                <td>
                  <span className={claseEstado(total.estado_pago)}>
                    {textoEstado(total.estado_pago)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form className="form-card pedido-form" onSubmit={registrarDeposito}>
        <h3>Registrar depósito</h3>

        <label>Tipo de depósito</label>
        <select
          name="tipo_deposito_id"
          value={form.tipo_deposito_id}
          onChange={handleChange}
        >
          <option value="">Seleccione tipo</option>
          {tiposDeposito.map((tipo) => (
            <option key={tipo.tipo_deposito_id} value={tipo.tipo_deposito_id}>
              {tipo.nombre}
            </option>
          ))}
        </select>

        <label>Fecha de depósito</label>
        <input
          type="date"
          name="fecha_deposito"
          value={form.fecha_deposito}
          onChange={handleChange}
        />

        <label>Moneda</label>
        <select
          name="moneda_codigo"
          value={form.moneda_codigo}
          onChange={handleChange}
        >
          <option value="PEN">Soles</option>
          <option value="USD">Dólares</option>
        </select>

        <label>Monto</label>
        <input
          type="number"
          name="monto"
          value={form.monto}
          onChange={handleChange}
          placeholder="Monto depositado"
        />

        <label>Número de operación</label>
        <input
          name="numero_operacion"
          value={form.numero_operacion}
          onChange={handleChange}
          placeholder="Ejemplo: OP-001"
        />

        <label>Observación</label>
        <textarea
          name="observacion"
          value={form.observacion}
          onChange={handleChange}
          placeholder="Ejemplo: Adelanto del pedido"
          rows={3}
        />

        <button
        type="submit"
        disabled={registrandoDeposito}
      >
        {registrandoDeposito
          ? 'Registrando depósito...'
          : 'Guardar depósito'}
      </button>
      </form>

      <div className="tabla-card">
        <h3>Historial de depósitos</h3>

        {pedido.historial_depositos.length === 0 ? (
          <p>No hay depósitos registrados para este pedido.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Moneda</th>
                <th>Operación</th>
                <th>Registrado por</th>
                <th>Observación</th>
              </tr>
            </thead>

            <tbody>
              {pedido.historial_depositos.map((deposito: any) => (
                <tr key={deposito.deposito_id}>
                  <td>#{deposito.deposito_id}</td>
                  <td>{deposito.tipo_deposito}</td>
                  <td>{deposito.fecha_deposito?.slice(0, 10)}</td>
                  <td>{Number(deposito.monto).toFixed(2)}</td>
                  <td>{deposito.moneda_codigo}</td>
                  <td>{deposito.numero_operacion || '-'}</td>
                  <td>{deposito.registrado_por}</td>
                  <td>{deposito.observacion || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DepositoPedidoDetalle;

<<<END OF FILE>>>


---

## FILE: src\pages\Depositos.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../services/api';

function Depositos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);

  const [clienteId, setClienteId] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [error, setError] = useState('');

  const cargarClientes = async () => {
    const data = await apiFetch('/clientes');
    setClientes(data.clientes);
  };

  const cargarPedidos = async () => {
    const params = new URLSearchParams();

    params.append('page', String(page));
    params.append('limit', '10');

    if (clienteId) {
      params.append('cliente_id', clienteId);
    }

    if (busqueda.trim()) {
      params.append('q', busqueda.trim());
    }

    const data = await apiFetch(`/depositos/pedidos?${params.toString()}`);

    setPedidos(data.pedidos);
    setPaginacion(data.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarClientes();
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        await cargarPedidos();
      } catch (error: any) {
        setError(error.message);
      }
    };

    cargar();
  }, [page, clienteId]);

  const aplicarBusqueda = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);

    try {
      await cargarPedidos();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const limpiarFiltros = () => {
    setClienteId('');
    setBusqueda('');
    setPage(1);
  };

  const claseEstado = (estado: string) => {
    if (estado === 'PAGADO') return 'estado estado-completo';
    if (estado === 'PARCIAL') return 'estado estado-parcial';
    return 'estado estado-pendiente';
  };

  const textoEstado = (estado: string) => {
    if (estado === 'PAGADO') return 'Pagado';
    if (estado === 'PARCIAL') return 'Parcial';
    return 'Sin pago';
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Depósitos</h1>
          <p>Controla adelantos, pagos y saldos pendientes por pedido.</p>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <form className="filtros-card" onSubmit={aplicarBusqueda}>
        <div>
          <label>Cliente</label>
          <select
            value={clienteId}
            onChange={(e) => {
              setClienteId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todos los clientes</option>
            {clientes.map((cliente) => (
              <option key={cliente.cliente_id} value={cliente.cliente_id}>
                {cliente.razon_social} - {cliente.ruc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Buscar</label>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Cliente, RUC o descripción"
          />
        </div>

        <div className="filtros-actions">
          <button type="submit">Buscar</button>
          <button type="button" className="btn-secondary" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </form>

      <div className="tabla-card tabla-moderna">
        <h3>Pedidos con control de depósitos</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha pedido</th>
              <th>Estado pago</th>
              <th>Total ref.</th>
              <th>Depositado ref.</th>
              <th>Saldo ref.</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.pedido_id}>
                <td>#{pedido.pedido_id}</td>

                <td>
                  <strong>{pedido.razon_social}</strong>
                  <br />
                  <span className="muted">{pedido.ruc}</span>
                </td>

                <td>{pedido.fecha_pedido?.slice(0, 10)}</td>

                <td>
                  <span className={claseEstado(pedido.estado_pago_general)}>
                    {textoEstado(pedido.estado_pago_general)}
                  </span>
                </td>

                <td>{Number(pedido.total_referencial || 0).toFixed(2)}</td>
                <td>{Number(pedido.depositado_referencial || 0).toFixed(2)}</td>
                <td>{Number(pedido.saldo_referencial || 0).toFixed(2)}</td>

                <td>
                  <Link className="btn-link" to={`/gestion/depositos/${pedido.pedido_id}`}>
                    Ver pedido
                  </Link>
                </td>
              </tr>
            ))}

            {pedidos.length === 0 && (
              <tr>
                <td colSpan={8}>No hay pedidos para mostrar.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="paginado">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginacion.page} de {paginacion.totalPaginas || 1}
          </span>

          <button
            type="button"
            disabled={page >= paginacion.totalPaginas}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Depositos;

<<<END OF FILE>>>


---

## FILE: src\pages\EntregaPedidoDetalle.tsx

<<<START OF FILE>>>

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import FeedbackToast
  from '../components/common/FeedbackToast';

import ConfirmDialog
  from '../components/common/ConfirmDialog';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import '../styles/entregasStock.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


const fechaLocalActual = () => {
  const hoy =
    new Date();

  const anio =
    hoy.getFullYear();

  const mes =
    String(
      hoy.getMonth() + 1
    ).padStart(
      2,
      '0'
    );

  const dia =
    String(
      hoy.getDate()
    ).padStart(
      2,
      '0'
    );

  return `${anio}-${mes}-${dia}`;
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


function EntregaPedidoDetalle() {
  const {
    pedido_id
  } = useParams();

  const [
    pedido,
    setPedido
  ] = useState<any | null>(
    null
  );

  const [
    detallesEntrega,
    setDetallesEntrega
  ] = useState<any[]>([]);

  const [
    fechaEntrega,
    setFechaEntrega
  ] = useState(
    fechaLocalActual()
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
    confirmarRegistro,
    setConfirmarRegistro
  ] = useState(false);

  const [
    idempotencyKey,
    setIdempotencyKey
  ] = useState(
    nuevaKey()
  );

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });

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

        setPedido(
          data.pedido
        );

        const detalles =
          data.pedido.detalles.map(
            (item: any) => ({
              ...item,
              cantidad_entregada_input: '',
              observacion_entrega: ''
            })
          );

        setDetallesEntrega(
          detalles
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

        try {
          await cargarPedido();

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarPedido
  ]);


  const claseEstado = (
    estado: string
  ) => {
    if (
      estado ===
      'COMPLETO'
    ) {
      return (
        'estado estado-completo'
      );
    }

    if (
      estado ===
      'PARCIAL'
    ) {
      return (
        'estado estado-parcial'
      );
    }

    return (
      'estado estado-pendiente'
    );
  };


  const textoEstado = (
    estado: string
  ) => {
    if (
      estado ===
      'COMPLETO'
    ) {
      return 'Completo';
    }

    if (
      estado ===
      'PARCIAL'
    ) {
      return 'Parcial';
    }

    return 'Pendiente';
  };


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  const cantidadMaximaEntregable = (
    detalle: any
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


  const estadoStockTexto = (
    estado: string
  ) => {
    if (
      estado ===
      'CON_STOCK'
    ) {
      return 'Stock disponible';
    }

    if (
      estado ===
      'SIN_STOCK'
    ) {
      return 'Sin stock';
    }

    if (
      estado ===
      'SIN_PRESENTACION'
    ) {
      return 'Presentación no configurada';
    }

    if (
      estado ===
      'SIN_PRODUCTO'
    ) {
      return 'Producto no configurado';
    }

    return 'No disponible';
  };


  const estadoStockClase = (
    estado: string
  ) => {
    if (
      estado ===
      'CON_STOCK'
    ) {
      return (
        'entrega-stock-badge entrega-stock-ok'
      );
    }

    if (
      estado ===
      'SIN_STOCK'
    ) {
      return (
        'entrega-stock-badge entrega-stock-error'
      );
    }

    return (
      'entrega-stock-badge entrega-stock-warning'
    );
  };


  const handleDetalleChange = (
    index: number,
    campo: string,
    valor: string
  ) => {
    if (
      registrandoEntrega
    ) {
      return;
    }

    const nuevosDetalles = [
      ...detallesEntrega
    ];

    nuevosDetalles[index] = {
      ...nuevosDetalles[index],
      [campo]:
        valor
    };

    setDetallesEntrega(
      nuevosDetalles
    );
  };


  const validarDetalle = (
    detalle: any,
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
        `El producto ${index + 1} solo tiene ${cantidad(pendiente)} ${detalle.unidad} pendientes`
      );
    }

    if (
      valor >
      stock +
      0.000001
    ) {
      return (
        `El producto ${index + 1} solo tiene ${cantidad(stock)} ${detalle.unidad} disponibles en almacén`
      );
    }

    if (
      presentacion <= 0
    ) {
      return (
        `El producto ${index + 1} no tiene presentación configurada`
      );
    }

    const valorMil =
      Math.round(
        valor * 1000
      );

    const presentacionMil =
      Math.round(
        presentacion *
        1000
      );

    if (
      valorMil %
      presentacionMil !==
      0
    ) {
      return (
        `El producto ${index + 1} debe entregarse en múltiplos de ${cantidad(presentacion)} ${detalle.unidad_presentacion}`
      );
    }

    return null;
  };


  const detallesARegistrar =
    useMemo(
      () =>
        detallesEntrega
          .filter(
            (item) =>
              Number(
                item
                  .cantidad_entregada_input
              ) > 0
          ),
      [
        detallesEntrega
      ]
    );


  const totalEntregar =
    useMemo(
      () =>
        detallesARegistrar
          .reduce(
            (
              total,
              item
            ) =>
              total +
              Number(
                item
                  .cantidad_entregada_input ||
                0
              ),
            0
          ),
      [
        detallesARegistrar
      ]
    );


  const solicitarRegistro = (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (!pedido) {
      setFeedback({
        tipo: 'error',
        mensaje:
          'No se encontró el pedido'
      });

      return;
    }

    if (
      detallesARegistrar.length ===
      0
    ) {
      setFeedback({
        tipo: 'error',
        mensaje:
          'Ingrese al menos una cantidad entregada'
      });

      return;
    }

    for (
      let i = 0;
      i < detallesEntrega.length;
      i++
    ) {
      const error =
        validarDetalle(
          detallesEntrega[i],
          i
        );

      if (error) {
        setFeedback({
          tipo: 'error',
          mensaje: error
        });

        return;
      }
    }

    setConfirmarRegistro(
      true
    );
  };


  const registrarEntrega =
    async () => {
      if (
        !pedido ||
        !bloquearEntrega()
      ) {
        return;
      }

      const detalles =
        detallesARegistrar
          .map(
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
                    fechaEntrega ||
                    undefined,

                  comentario_entrega:
                    comentarioEntrega
                      .trim() ||
                    null,

                  detalles
                })
            }
          );

        setConfirmarRegistro(
          false
        );

        setFeedback({
          tipo: 'success',
          mensaje:
            data.reutilizada
              ? 'La entrega ya había sido registrada. Se recuperó el resultado existente sin descontar stock nuevamente.'
              : 'Entrega registrada correctamente.'
        });

        setComentarioEntrega(
          ''
        );

        setFechaEntrega(
          fechaLocalActual()
        );

        setIdempotencyKey(
          nuevaKey()
        );

        await cargarPedido();

        liberarEntrega();

      } catch (error: any) {
        liberarEntrega();

        setConfirmarRegistro(
          false
        );

        setFeedback({
          tipo: 'error',
          mensaje:
            error.message
        });
      }
    };


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando pedido...
        </p>
      </div>
    );
  }


  if (!pedido) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() =>
            setFeedback({
              ...feedback,
              mensaje: ''
            })
          }
        />

        <Link
          to="/gestion/entregas"
          className="btn-volver"
        >
          ← Volver a Entregas
        </Link>

        <div className="tabla-card">
          No se pudo cargar el pedido.
        </div>

      </div>
    );
  }


  return (
    <div className="pedidos-page entrega-stock-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <ConfirmDialog
        abierto={
          confirmarRegistro
        }
        titulo="Registrar entrega"
        descripcion={
          `Se registrarán ${detallesARegistrar.length} producto(s) por un total de ${cantidad(totalEntregar)} KG. El stock de producto terminado se descontará inmediatamente. ¿Deseas continuar?`
        }
        textoConfirmar="Registrar entrega"
        textoProcesando="Registrando..."
        procesando={
          registrandoEntrega
        }
        onConfirmar={
          registrarEntrega
        }
        onCerrar={() =>
          !registrandoEntrega &&
          setConfirmarRegistro(
            false
          )
        }
      />


      <Link
        to="/gestion/entregas"
        className="btn-volver"
      >
        ← Volver a Entregas
      </Link>


      <div className="pedido-detalle-header">
        <div>
          <h1>
            Pedido #{
              pedido.pedido_id
            }
          </h1>

          <p>
            {
              pedido.razon_social
            }
            {' - '}
            {
              pedido.ruc
            }
          </p>
        </div>

        <span
          className={
            claseEstado(
              pedido
                .estado_entrega_general
            )
          }
        >
          {
            textoEstado(
              pedido
                .estado_entrega_general
            )
          }
        </span>
      </div>


      <div className="pedido-resumen-grid">

        <div className="resumen-card">
          <span>
            Cliente
          </span>

          <strong>
            {
              pedido.razon_social
            }
          </strong>
        </div>


        <div className="resumen-card">
          <span>
            Fecha pedido
          </span>

          <strong>
            {
              pedido
                .fecha_pedido
                ?.slice(
                  0,
                  10
                )
            }
          </strong>
        </div>


        <div className="resumen-card">
          <span>
            Entrega estimada
          </span>

          <strong>
            {
              pedido
                .fecha_entrega_estimada
                ?.slice(
                  0,
                  10
                ) ||
              '-'
            }
          </strong>
        </div>


        <div className="resumen-card">
          <span>
            Estado
          </span>

          <strong>
            {
              textoEstado(
                pedido
                  .estado_entrega_general
              )
            }
          </strong>
        </div>

      </div>


      <div className="descripcion-card">
        <strong>
          Descripción del pedido:
        </strong>

        <p>
          {
            pedido
              .descripcion_pedido ||
            'Sin descripción'
          }
        </p>
      </div>


      <form
        className="form-card pedido-form entrega-form"
        onSubmit={
          solicitarRegistro
        }
      >

        <div className="entrega-form-header">
          <div>
            <h3>
              Registrar nueva entrega
            </h3>

            <p>
              Solo se pueden entregar productos
              con stock y en múltiplos de la
              presentación solicitada.
            </p>
          </div>
        </div>


        <div className="entrega-cabecera-grid">

          <div>
            <label>
              Fecha de entrega
            </label>

            <input
              type="date"
              value={
                fechaEntrega
              }
              onChange={(e) =>
                setFechaEntrega(
                  e.target.value
                )
              }
              disabled={
                registrandoEntrega
              }
            />
          </div>


          <div>
            <label>
              Comentario de entrega
            </label>

            <textarea
              value={
                comentarioEntrega
              }
              onChange={(e) =>
                setComentarioEntrega(
                  e.target.value
                )
              }
              placeholder="Ejemplo: Primera entrega parcial del pedido"
              rows={3}
              disabled={
                registrandoEntrega
              }
            />
          </div>

        </div>


        <h3>
          Productos del pedido
        </h3>


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

              const stockDisponible =
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

              const maximoEntregable =
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
                maximoEntregable > 0;

              return (
                <div
                  className={
                    `detalle-card detalle-${detalle.estado_item.toLowerCase()} entrega-producto-card`
                  }
                  key={
                    detalle
                      .pedido_detalle_id
                  }
                >

                  <div className="detalle-header">

                    <div>
                      <strong className="entrega-producto-nombre">
                        {
                          detalle
                            .tipo_producto
                        }
                        {' '}
                        {
                          detalle.material
                        }
                        {' '}
                        {
                          detalle.medida
                        }
                        {' '}
                        {
                          detalle.color
                        }
                      </strong>

                      <br />

                      <span className="muted">
                        {
                          detalle
                            .descripcion_item ||
                          'Sin descripción específica'
                        }
                      </span>
                    </div>


                    <div className="entrega-producto-estados">

                      <span
                        className={
                          claseEstado(
                            detalle.estado_item
                          )
                        }
                      >
                        {
                          textoEstado(
                            detalle.estado_item
                          )
                        }
                      </span>

                      {
                        !estaCompleto &&
                        (
                          <span
                            className={
                              estadoStockClase(
                                detalle
                                  .estado_stock
                              )
                            }
                          >
                            {
                              estadoStockTexto(
                                detalle
                                  .estado_stock
                              )
                            }
                          </span>
                        )
                      }

                    </div>

                  </div>


                  <div className="entrega-producto-resumen">

                    <div>
                      <span>
                        Pedido
                      </span>

                      <strong>
                        {
                          cantidad(
                            detalle
                              .cantidad_pedida
                          )
                        } {
                          detalle.unidad
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Entregado
                      </span>

                      <strong>
                        {
                          cantidad(
                            detalle
                              .cantidad_entregada
                          )
                        } {
                          detalle.unidad
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Pendiente
                      </span>

                      <strong>
                        {
                          cantidad(
                            detalle
                              .cantidad_pendiente
                          )
                        } {
                          detalle.unidad
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Presentación
                      </span>

                      <strong>
                        {
                          presentacion > 0
                            ? `${cantidad(presentacion)} ${detalle.unidad_presentacion || ''}`
                            : '-'
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Stock disponible
                      </span>

                      <strong
                        className={
                          stockDisponible > 0
                            ? 'entrega-stock-valor-ok'
                            : 'entrega-stock-valor-error'
                        }
                      >
                        {
                          cantidad(
                            stockDisponible
                          )
                        } {
                          detalle.unidad
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Presentaciones disponibles
                      </span>

                      <strong>
                        {
                          Number(
                            detalle
                              .presentaciones_disponibles ||
                            0
                          )
                            .toFixed(
                              2
                            )
                        }
                      </strong>
                    </div>

                  </div>


                  {
                    estaCompleto
                      ? (
                        <div className="producto-completo">
                          Este producto ya fue entregado completamente.
                        </div>
                      )
                      : (
                        <>
                          {
                            detalle.estado_stock ===
                              'SIN_PRODUCTO' &&
                            (
                              <div className="entrega-alerta entrega-alerta-error">
                                Este producto todavía no está configurado
                                en el catálogo de productos terminados.
                              </div>
                            )
                          }


                          {
                            detalle.estado_stock ===
                              'SIN_PRESENTACION' &&
                            (
                              <div className="entrega-alerta entrega-alerta-warning">
                                El pedido no tiene una presentación válida
                                configurada para este producto.
                              </div>
                            )
                          }


                          {
                            detalle.estado_stock ===
                              'SIN_STOCK' &&
                            (
                              <div className="entrega-alerta entrega-alerta-error">
                                No existe stock disponible para esta
                                presentación.
                              </div>
                            )
                          }


                          {
                            puedeEntregar &&
                            (
                              <div className="entrega-regla">
                                Puedes entregar hasta
                                {' '}
                                <strong>
                                  {
                                    cantidad(
                                      maximoEntregable
                                    )
                                  } {
                                    detalle.unidad
                                  }
                                </strong>
                                {' '}
                                en múltiplos de
                                {' '}
                                <strong>
                                  {
                                    cantidad(
                                      presentacion
                                    )
                                  } {
                                    detalle
                                      .unidad_presentacion
                                }
                                </strong>.
                              </div>
                            )
                          }


                          <div className="entrega-input-grid">

                            <div>
                              <label>
                                Cantidad a entregar
                              </label>

                              <div className="entrega-input-unidad">

                                <input
                                  type="number"
                                  min="0"
                                  max={
                                    maximoEntregable ||
                                    undefined
                                  }
                                  step={
                                    presentacion > 0
                                      ? presentacion
                                      : '0.001'
                                  }
                                  placeholder={
                                    puedeEntregar
                                      ? `Máximo ${cantidad(maximoEntregable)}`
                                      : 'No disponible'
                                  }
                                  value={
                                    detalle
                                      .cantidad_entregada_input
                                  }
                                  onChange={(e) =>
                                    handleDetalleChange(
                                      index,
                                      'cantidad_entregada_input',
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    registrandoEntrega ||
                                    !puedeEntregar
                                  }
                                />

                                <span>
                                  {
                                    detalle.unidad
                                  }
                                </span>

                              </div>
                            </div>


                            <div>
                              <label>
                                Observación
                              </label>

                              <input
                                placeholder="Opcional"
                                value={
                                  detalle
                                    .observacion_entrega
                                }
                                onChange={(e) =>
                                  handleDetalleChange(
                                    index,
                                    'observacion_entrega',
                                    e.target.value
                                  )
                                }
                                disabled={
                                  registrandoEntrega ||
                                  !puedeEntregar
                                }
                              />
                            </div>

                          </div>


                          {
                            valorActual > 0 &&
                            errorItem &&
                            (
                              <div className="entrega-validacion-error">
                                {
                                  errorItem
                                }
                              </div>
                            )
                          }

                        </>
                      )
                  }

                </div>
              );
            }
          )
        }


        <div className="entrega-total-box">

          <div>
            <span>
              Productos seleccionados
            </span>

            <strong>
              {
                detallesARegistrar.length
              }
            </strong>
          </div>


          <div>
            <span>
              Cantidad total
            </span>

            <strong>
              {
                cantidad(
                  totalEntregar
                )
              } KG
            </strong>
          </div>

        </div>


        <div className="entrega-actions">

          <button
            type="submit"
            disabled={
              registrandoEntrega ||
              detallesARegistrar.length ===
                0
            }
          >
            {
              registrandoEntrega
                ? 'Registrando entrega...'
                : 'Registrar entrega'
            }
          </button>

        </div>

      </form>


      <div className="tabla-card">

        <div className="entrega-historial-header">
          <div>
            <h3>
              Historial de entregas
            </h3>

            <p>
              Entregas ya registradas para este pedido.
            </p>
          </div>
        </div>


        {
          pedido
            .historial_entregas
            .length ===
            0
            ? (
              <p>
                No hay entregas registradas
                para este pedido.
              </p>
            )
            : (
              pedido
                .historial_entregas
                .map(
                  (
                    entrega: any
                  ) => (
                    <div
                      className="historial-card"
                      key={
                        entrega
                          .entrega_id
                      }
                    >

                      <div className="historial-header">
                        <strong>
                          Entrega #{
                            entrega
                              .entrega_id
                          }
                        </strong>

                        <span>
                          {
                            entrega
                              .fecha_entrega
                              ?.slice(
                                0,
                                10
                              )
                          }
                        </span>
                      </div>


                      <p>
                        <strong>
                          Registrado por:
                        </strong>
                        {' '}
                        {
                          entrega
                            .registrado_por
                        }
                      </p>


                      <p>
                        <strong>
                          Comentario:
                        </strong>
                        {' '}
                        {
                          entrega
                            .comentario_entrega ||
                          '-'
                        }
                      </p>


                      <div className="tabla-scroll">
                        <table>
                          <thead>
                            <tr>
                              <th>
                                Producto
                              </th>
                              <th>
                                Presentación
                              </th>
                              <th>
                                Cantidad
                              </th>
                              <th>
                                Observación
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {
                              entrega
                                .detalles
                                .map(
                                  (
                                    item: any
                                  ) => (
                                    <tr
                                      key={
                                        item
                                          .entrega_detalle_id
                                      }
                                    >
                                      <td>
                                        {
                                          item.producto
                                        }
                                      </td>

                                      <td>
                                        {
                                          item
                                            .cantidad_presentacion
                                            ? `${cantidad(item.cantidad_presentacion)} ${item.unidad_presentacion || ''}`
                                            : '-'
                                        }
                                      </td>

                                      <td>
                                        {
                                          cantidad(
                                            item
                                              .cantidad_entregada
                                          )
                                        } {
                                          item.unidad
                                        }
                                      </td>

                                      <td>
                                        {
                                          item
                                            .observacion ||
                                          '-'
                                        }
                                      </td>
                                    </tr>
                                  )
                                )
                            }
                          </tbody>
                        </table>
                      </div>

                    </div>
                  )
                )
            )
        }

      </div>

    </div>
  );
}


export default EntregaPedidoDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\Entregas.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../services/api';

function Entregas() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);

  const [clienteId, setClienteId] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [error, setError] = useState('');

  const cargarClientes = async () => {
    const data = await apiFetch('/clientes');
    setClientes(data.clientes);
  };

  const cargarPedidos = async () => {
    const params = new URLSearchParams();

    params.append('page', String(page));
    params.append('limit', '10');

    if (clienteId) {
      params.append('cliente_id', clienteId);
    }

    if (busqueda.trim()) {
      params.append('q', busqueda.trim());
    }

    const data = await apiFetch(`/entregas/pedidos?${params.toString()}`);

    setPedidos(data.pedidos);
    setPaginacion(data.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarClientes();
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        await cargarPedidos();
      } catch (error: any) {
        setError(error.message);
      }
    };

    cargar();
  }, [page, clienteId]);

  const aplicarBusqueda = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);

    try {
      await cargarPedidos();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const limpiarFiltros = async () => {
    setClienteId('');
    setBusqueda('');
    setPage(1);
  };

  const claseEstado = (estado: string) => {
    if (estado === 'COMPLETO') return 'estado estado-completo';
    if (estado === 'PARCIAL') return 'estado estado-parcial';
    return 'estado estado-pendiente';
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Entregas</h1>
          <p>Selecciona un pedido para registrar entregas parciales o totales.</p>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <form className="filtros-card" onSubmit={aplicarBusqueda}>
        <div>
          <label>Cliente</label>
          <select
            value={clienteId}
            onChange={(e) => {
              setClienteId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todos los clientes</option>
            {clientes.map((cliente) => (
              <option key={cliente.cliente_id} value={cliente.cliente_id}>
                {cliente.razon_social} - {cliente.ruc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Buscar</label>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Cliente, RUC o descripción"
          />
        </div>

        <div className="filtros-actions">
          <button type="submit">Buscar</button>
          <button type="button" className="btn-secondary" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </form>

      <div className="tabla-card tabla-moderna">
        <h3>Pedidos pendientes</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha pedido</th>
              <th>Entrega estimada</th>
              <th>Estado entrega</th>
              <th>Items</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.pedido_id}>
                <td>#{pedido.pedido_id}</td>
                <td>
                  <strong>{pedido.razon_social}</strong>
                  <br />
                  <span className="muted">{pedido.ruc}</span>
                </td>
                <td>{pedido.fecha_pedido?.slice(0, 10)}</td>
                <td>{pedido.fecha_entrega_estimada?.slice(0, 10) || '-'}</td>
                <td>
                  <span className={claseEstado(pedido.estado_entrega_general)}>
                    {pedido.estado_entrega_general}
                  </span>
                </td>
                <td>{pedido.cantidad_items}</td>
                <td>
                  <Link className="btn-link" to={`/gestion/entregas/${pedido.pedido_id}`}>
                    Ver pedido
                  </Link>
                </td>
              </tr>
            ))}

            {pedidos.length === 0 && (
              <tr>
                <td colSpan={7}>No hay pedidos pendientes de entrega.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="paginado">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginacion.page} de {paginacion.totalPaginas || 1}
          </span>

          <button
            type="button"
            disabled={page >= paginacion.totalPaginas}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Entregas;

<<<END OF FILE>>>


---

## FILE: src\pages\Gastos.tsx

<<<START OF FILE>>>

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import type {
  ChangeEvent,
  FormEvent
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import FeedbackToast
  from '../components/common/FeedbackToast';

import ConfirmDialog
  from '../components/common/ConfirmDialog';

import GastoForm, {
  gastoFormVacio,
  validarGastoForm,
  type GastoFormData
} from '../components/gastos/GastoForm';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type FiltrosGasto = {
  tipo_gasto_id: string;
  proveedor_id: string;
  moneda_codigo: string;
  q: string;
};


const filtrosVacios: FiltrosGasto = {
  tipo_gasto_id: '',
  proveedor_id: '',
  moneda_codigo: '',
  q: ''
};


function Gastos() {
  const [
    gastos,
    setGastos
  ] = useState<any[]>([]);

  const [
    tiposGasto,
    setTiposGasto
  ] = useState<any[]>([]);

  const [
    proveedores,
    setProveedores
  ] = useState<any[]>([]);


  const [
    page,
    setPage
  ] = useState(1);


  const [
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  /*
   * filtros:
   * lo que actualmente está escribiendo
   * o seleccionando el usuario.
   */
  const [
    filtros,
    setFiltros
  ] = useState<FiltrosGasto>({
    ...filtrosVacios
  });


  /*
   * filtrosAplicados:
   * filtros realmente utilizados por
   * el listado y la paginación.
   */
  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<FiltrosGasto>({
    ...filtrosVacios
  });


  const [
    form,
    setForm
  ] = useState<GastoFormData>({
    ...gastoFormVacio
  });


  const [
    nuevoTipo,
    setNuevoTipo
  ] = useState('');


  const [
    gastoAEliminar,
    setGastoAEliminar
  ] = useState<any | null>(null);


  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });


  /*
   * Cada operación crítica tiene
   * su propio bloqueo.
   */
  const {
    procesando: registrandoTipo,
    intentarBloquear:
      bloquearRegistroTipo,
    liberar:
      liberarRegistroTipo
  } = useBloqueoAccion();


  const {
    procesando: registrandoGasto,
    intentarBloquear:
      bloquearRegistroGasto,
    liberar:
      liberarRegistroGasto
  } = useBloqueoAccion();


  const {
    procesando: eliminandoGasto,
    intentarBloquear:
      bloquearEliminacion,
    liberar:
      liberarEliminacion
  } = useBloqueoAccion();


  const mostrarFeedback = (
    tipo: FeedbackTipo,
    mensaje: string
  ) => {
    setFeedback({
      tipo,
      mensaje
    });
  };


  /* =========================================================
     DATOS BASE
     ========================================================= */

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
          tiposData.tipos
        );

        setProveedores(
          proveedoresData.proveedores
        );
      },
      []
    );


  /* =========================================================
     LISTADO PAGINADO
     ========================================================= */

  const cargarGastos =
    useCallback(
      async (
        paginaActual: number,
        filtrosActuales: FiltrosGasto
      ) => {
        const params =
          new URLSearchParams();

        params.append(
          'page',
          String(paginaActual)
        );

        params.append(
          'limit',
          '10'
        );


        if (
          filtrosActuales.tipo_gasto_id
        ) {
          params.append(
            'tipo_gasto_id',
            filtrosActuales.tipo_gasto_id
          );
        }


        if (
          filtrosActuales.proveedor_id
        ) {
          params.append(
            'proveedor_id',
            filtrosActuales.proveedor_id
          );
        }


        if (
          filtrosActuales.moneda_codigo
        ) {
          params.append(
            'moneda_codigo',
            filtrosActuales.moneda_codigo
          );
        }


        if (
          filtrosActuales.q.trim()
        ) {
          params.append(
            'q',
            filtrosActuales.q.trim()
          );
        }


        const data =
          await apiFetch(
            `/gastos?${params.toString()}`
          );


        setGastos(
          data.gastos
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  /*
   * Tipos y proveedores.
   */
  useEffect(() => {
    const iniciar =
      async () => {
        try {
          await cargarDatosBase();

        } catch (error: any) {
          mostrarFeedback(
            'error',
            error.message
          );
        }
      };

    iniciar();
  }, [cargarDatosBase]);


  /*
   * Listado.
   *
   * Al cambiar página o aplicar
   * filtros, vuelve a consultar.
   */
  useEffect(() => {
    const cargar =
      async () => {
        try {
          await cargarGastos(
            page,
            filtrosAplicados
          );

        } catch (error: any) {
          mostrarFeedback(
            'error',
            error.message
          );
        }
      };

    cargar();

  }, [
    page,
    filtrosAplicados,
    cargarGastos
  ]);


  /* =========================================================
     CAMBIOS DE FORMULARIO
     ========================================================= */

  const handleFormChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };


  const handleFiltroChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {
    setFiltros({
      ...filtros,
      [e.target.name]:
        e.target.value
    });
  };


  /* =========================================================
     REGISTRAR TIPO DE GASTO
     ========================================================= */

  const registrarTipoGasto =
    async (
      e: FormEvent
    ) => {
      e.preventDefault();


      const nombre =
        nuevoTipo.trim();


      if (!nombre) {
        mostrarFeedback(
          'error',
          'Ingrese el nombre del tipo de gasto'
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

            body: JSON.stringify({
              nombre
            })
          }
        );


        setNuevoTipo('');


        mostrarFeedback(
          'success',
          'Tipo de gasto registrado correctamente'
        );


        /*
         * Si la recarga falla, el registro
         * ya fue creado. No debemos decir
         * que el POST falló.
         */
        try {
          await cargarDatosBase();

        } catch (error: any) {
          mostrarFeedback(
            'warning',
            'El tipo de gasto fue registrado, pero no se pudo actualizar la lista. Recarga la página.'
          );
        }

      } catch (error: any) {
        mostrarFeedback(
          'error',
          error.message
        );

      } finally {
        liberarRegistroTipo();
      }
    };


  /* =========================================================
     REGISTRAR GASTO
     ========================================================= */

  const registrarGasto =
    async (
      e: FormEvent
    ) => {
      e.preventDefault();


      const errorValidacion =
        validarGastoForm(
          form,
          false
        );


      if (errorValidacion) {
        mostrarFeedback(
          'error',
          errorValidacion
        );

        return;
      }


      if (
        !bloquearRegistroGasto()
      ) {
        return;
      }


      try {
        await apiFetch(
          '/gastos',
          {
            method: 'POST',

            body: JSON.stringify({
              tipo_gasto_id:
                Number(
                  form.tipo_gasto_id
                ),

              proveedor_id:
                form.proveedor_id
                  ? Number(
                      form.proveedor_id
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
                form.moneda_codigo,

              descripcion:
                form.descripcion,

              comprobante:
                form.comprobante
            })
          }
        );


        setForm({
          ...gastoFormVacio
        });


        mostrarFeedback(
          'success',
          'Gasto registrado correctamente'
        );


        /*
         * Actualizamos el listado.
         *
         * Separado del POST para evitar
         * confundir una falla del GET con
         * una falla al registrar.
         */
        try {
          if (page !== 1) {
            setPage(1);

          } else {
            await cargarGastos(
              1,
              filtrosAplicados
            );
          }

        } catch (error: any) {
          mostrarFeedback(
            'warning',
            'El gasto fue registrado correctamente, pero no se pudo actualizar el listado. Recarga la página.'
          );
        }

      } catch (error: any) {
        mostrarFeedback(
          'error',
          error.message
        );

      } finally {
        liberarRegistroGasto();
      }
    };


  /* =========================================================
     FILTROS
     ========================================================= */

  const aplicarFiltros = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPage(1);

    setFiltrosAplicados({
      ...filtros
    });
  };


  const limpiarFiltros = () => {
    setFiltros({
      ...filtrosVacios
    });

    setFiltrosAplicados({
      ...filtrosVacios
    });

    setPage(1);
  };


  /* =========================================================
     ELIMINACIÓN
     ========================================================= */

  const solicitarEliminar = (
    gasto: any
  ) => {
    setGastoAEliminar(
      gasto
    );
  };


  const confirmarEliminacion =
    async () => {
      if (!gastoAEliminar) {
        return;
      }


      if (
        !bloquearEliminacion()
      ) {
        return;
      }


      const gastoId =
        gastoAEliminar.gasto_id;


      try {
        await apiFetch(
          `/gastos/${gastoId}`,
          {
            method: 'DELETE'
          }
        );


        setGastoAEliminar(
          null
        );


        mostrarFeedback(
          'warning',
          `Gasto #${gastoId} eliminado correctamente`
        );


        /*
         * Si eliminamos el último registro
         * de una página distinta de la 1,
         * retrocedemos una página.
         */
        if (
          gastos.length === 1 &&
          page > 1
        ) {
          setPage(
            (paginaActual) =>
              paginaActual - 1
          );

        } else {
          try {
            await cargarGastos(
              page,
              filtrosAplicados
            );

          } catch (error: any) {
            mostrarFeedback(
              'warning',
              `El gasto #${gastoId} fue eliminado, pero no se pudo actualizar el listado. Recarga la página.`
            );
          }
        }

      } catch (error: any) {
        mostrarFeedback(
          'error',
          error.message
        );

      } finally {
        liberarEliminacion();
      }
    };


  return (
    <div className="pedidos-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <ConfirmDialog
        abierto={
          gastoAEliminar !== null
        }
        titulo={
          gastoAEliminar
            ? `Eliminar gasto #${gastoAEliminar.gasto_id}`
            : 'Eliminar gasto'
        }
        descripcion={
          gastoAEliminar
            ? `Se retirará del registro activo el gasto ${gastoAEliminar.tipo_gasto} por ${Number(gastoAEliminar.monto).toFixed(2)} ${gastoAEliminar.moneda_codigo}. El registro permanecerá almacenado para auditoría.`
            : ''
        }
        textoConfirmar="Eliminar gasto"
        textoProcesando="Eliminando gasto..."
        procesando={eliminandoGasto}
        onConfirmar={
          confirmarEliminacion
        }
        onCerrar={() => {
          if (!eliminandoGasto) {
            setGastoAEliminar(
              null
            );
          }
        }}
      />


      <div className="pedidos-header">
        <div>
          <h1>
            Gastos
          </h1>

          <p>
            Registra, consulta, edita
            y administra los gastos de
            la empresa.
          </p>
        </div>
      </div>


      <div className="gastos-config-grid">

        <form
          className="form-card gasto-tipo-card"
          onSubmit={
            registrarTipoGasto
          }
        >
          <h3>
            Registrar tipo de gasto
          </h3>

          <label>
            Nuevo tipo
          </label>

          <input
            value={nuevoTipo}
            onChange={(e) =>
              setNuevoTipo(
                e.target.value
              )
            }
            placeholder="Ejemplo: COMBUSTIBLE"
            disabled={registrandoTipo}
          />

          <button
            type="submit"
            disabled={registrandoTipo}
          >
            {registrandoTipo
              ? 'Guardando tipo...'
              : 'Guardar tipo'}
          </button>
        </form>


        <GastoForm
          titulo="Registrar gasto"
          form={form}
          tiposGasto={tiposGasto}
          proveedores={proveedores}
          procesando={registrandoGasto}
          textoBoton="Guardar gasto"
          textoProcesando="Registrando gasto..."
          onChange={handleFormChange}
          onSubmit={registrarGasto}
        />

      </div>


      <form
        className="filtros-card"
        onSubmit={aplicarFiltros}
      >

        <div>
          <label>
            Tipo de gasto
          </label>

          <select
            name="tipo_gasto_id"
            value={
              filtros.tipo_gasto_id
            }
            onChange={
              handleFiltroChange
            }
          >
            <option value="">
              Todos
            </option>

            {tiposGasto.map(
              (tipo) => (
                <option
                  key={
                    tipo.tipo_gasto_id
                  }
                  value={
                    tipo.tipo_gasto_id
                  }
                >
                  {tipo.nombre}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Proveedor
          </label>

          <select
            name="proveedor_id"
            value={
              filtros.proveedor_id
            }
            onChange={
              handleFiltroChange
            }
          >
            <option value="">
              Todos
            </option>

            {proveedores.map(
              (proveedor) => (
                <option
                  key={
                    proveedor.proveedor_id
                  }
                  value={
                    proveedor.proveedor_id
                  }
                >
                  {
                    proveedor.razon_social
                  }
                  {' - '}
                  {proveedor.ruc}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Moneda
          </label>

          <select
            name="moneda_codigo"
            value={
              filtros.moneda_codigo
            }
            onChange={
              handleFiltroChange
            }
          >
            <option value="">
              Todas
            </option>

            <option value="PEN">
              Soles
            </option>

            <option value="USD">
              Dólares
            </option>
          </select>
        </div>


        <div>
          <label>
            Buscar
          </label>

          <input
            name="q"
            value={filtros.q}
            onChange={
              handleFiltroChange
            }
            placeholder="Descripción, comprobante o proveedor"
          />
        </div>


        <div className="filtros-actions">
          <button type="submit">
            Buscar
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={
              limpiarFiltros
            }
          >
            Limpiar
          </button>
        </div>

      </form>


      <div className="pedidos-card">
        <h3>
          Listado de gastos
        </h3>

        <div className="tabla-responsive">
          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo / descripción</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Moneda</th>
                <th>Comprobante</th>
                <th>Registrado por</th>
                <th>Acciones</th>
              </tr>
            </thead>


            <tbody>

              {gastos.map(
                (gasto) => (
                  <tr
                    key={
                      gasto.gasto_id
                    }
                  >
                    <td>
                      #{gasto.gasto_id}
                    </td>


                    <td>
                      <strong>
                        {gasto.tipo_gasto}
                      </strong>

                      <br />

                      <span className="muted">
                        {
                          gasto.descripcion ||
                          'Sin descripción'
                        }
                      </span>
                    </td>


                    <td>
                      {gasto.proveedor ? (
                        <>
                          <strong>
                            {
                              gasto.proveedor
                            }
                          </strong>

                          <br />

                          <span className="muted">
                            {
                              gasto.proveedor_ruc ||
                              ''
                            }
                          </span>
                        </>
                      ) : (
                        '-'
                      )}
                    </td>


                    <td>
                      {
                        gasto.fecha_gasto
                          ?.slice(
                            0,
                            10
                          )
                      }
                    </td>


                    <td>
                      <strong>
                        {Number(
                          gasto.monto
                        ).toFixed(2)}
                      </strong>
                    </td>


                    <td>
                      {
                        gasto.moneda_codigo
                      }
                    </td>


                    <td>
                      {
                        gasto.comprobante ||
                        '-'
                      }
                    </td>


                    <td>
                      {
                        gasto.registrado_por
                      }
                    </td>


                    <td>
                      <div className="tabla-acciones">

                        <Link
                          className="btn-outline"
                          to={
                            `/gestion/gastos/${gasto.gasto_id}/editar`
                          }
                        >
                          Editar
                        </Link>


                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() =>
                            solicitarEliminar(
                              gasto
                            )
                          }
                        >
                          Eliminar
                        </button>

                      </div>
                    </td>
                  </tr>
                )
              )}


              {gastos.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    No hay gastos registrados.
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>


        <div className="paginado">

          <button
            type="button"
            disabled={page <= 1}
            onClick={() =>
              setPage(
                page - 1
              )
            }
          >
            Anterior
          </button>


          <span>
            Página {paginacion.page}
            {' de '}
            {
              paginacion.totalPaginas ||
              1
            }
          </span>


          <button
            type="button"
            disabled={
              page >=
              paginacion.totalPaginas
            }
            onClick={() =>
              setPage(
                page + 1
              )
            }
          >
            Siguiente
          </button>

        </div>
      </div>

    </div>
  );
}


export default Gastos;

<<<END OF FILE>>>


---

## FILE: src\pages\gastos\EditarGasto.tsx

<<<START OF FILE>>>

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import type {
  ChangeEvent,
  FormEvent
} from 'react';

import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import GastoForm, {
  gastoFormVacio,
  validarGastoForm,
  type GastoFormData
} from '../../components/gastos/GastoForm';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function EditarGasto() {
  const {
    gasto_id
  } = useParams();

  const navigate =
    useNavigate();


  const [
    gasto,
    setGasto
  ] = useState<any | null>(
    null
  );


  const [
    tiposGasto,
    setTiposGasto
  ] = useState<any[]>([]);


  const [
    proveedores,
    setProveedores
  ] = useState<any[]>([]);


  const [
    cargando,
    setCargando
  ] = useState(true);


  const [
    form,
    setForm
  ] = useState<GastoFormData>({
    ...gastoFormVacio
  });


  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });


  const {
    procesando: actualizandoGasto,
    intentarBloquear:
      bloquearActualizacion,
    liberar:
      liberarActualizacion
  } = useBloqueoAccion();


  const mostrarFeedback = (
    tipo: FeedbackTipo,
    mensaje: string
  ) => {
    setFeedback({
      tipo,
      mensaje
    });
  };


  /* =========================================================
     CARGAR GASTO
     ========================================================= */

  const cargarDatos =
    useCallback(
      async () => {
        if (!gasto_id) {
          throw new Error(
            'ID de gasto no válido'
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


        const gastoActual =
          gastoData.gasto;


        /*
         * Si el proveedor del gasto ya no
         * se encuentra activo, lo agregamos
         * al select para poder representar
         * correctamente el valor histórico.
         */
        const listaProveedores = [
          ...proveedoresData.proveedores
        ];


        if (
          gastoActual.proveedor_id &&
          !listaProveedores.some(
            (proveedor) =>
              Number(
                proveedor.proveedor_id
              ) ===
              Number(
                gastoActual.proveedor_id
              )
          )
        ) {
          listaProveedores.push({
            proveedor_id:
              gastoActual.proveedor_id,

            razon_social:
              gastoActual.proveedor ||
              'Proveedor no disponible',

            ruc:
              gastoActual.proveedor_ruc ||
              '-'
          });
        }


        setGasto(
          gastoActual
        );


        setTiposGasto(
          tiposData.tipos
        );


        setProveedores(
          listaProveedores
        );


        setForm({
          tipo_gasto_id:
            String(
              gastoActual.tipo_gasto_id
            ),

          proveedor_id:
            gastoActual.proveedor_id
              ? String(
                  gastoActual.proveedor_id
                )
              : '',

          fecha_gasto:
            gastoActual.fecha_gasto
              ?.slice(
                0,
                10
              ) || '',

          monto:
            String(
              gastoActual.monto
            ),

          moneda_codigo:
            gastoActual.moneda_codigo ||
            'PEN',

          descripcion:
            gastoActual.descripcion ||
            '',

          comprobante:
            gastoActual.comprobante ||
            ''
        });
      },
      [gasto_id]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        try {
          setCargando(true);

          await cargarDatos();

        } catch (error: any) {
          mostrarFeedback(
            'error',
            error.message
          );

        } finally {
          setCargando(false);
        }
      };

    iniciar();

  }, [cargarDatos]);


  /* =========================================================
     CAMBIO DE CAMPOS
     ========================================================= */

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };


  /* =========================================================
     ACTUALIZAR
     ========================================================= */

  const actualizarGasto =
    async (
      e: FormEvent
    ) => {
      e.preventDefault();


      const errorValidacion =
        validarGastoForm(
          form,
          true
        );


      if (errorValidacion) {
        mostrarFeedback(
          'error',
          errorValidacion
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

            body: JSON.stringify({
              tipo_gasto_id:
                Number(
                  form.tipo_gasto_id
                ),

              proveedor_id:
                form.proveedor_id
                  ? Number(
                      form.proveedor_id
                    )
                  : null,

              fecha_gasto:
                form.fecha_gasto,

              monto:
                Number(
                  form.monto
                ),

              moneda_codigo:
                form.moneda_codigo,

              descripcion:
                form.descripcion,

              comprobante:
                form.comprobante
            })
          }
        );


        mostrarFeedback(
          'success',
          'Gasto actualizado correctamente'
        );


        /*
         * No liberamos el bloqueo
         * en éxito.
         *
         * Durante el pequeño tiempo hasta
         * la redirección no queremos otro PUT.
         */
        setTimeout(() => {
          navigate(
            '/gestion/gastos'
          );
        }, 900);

      } catch (error: any) {
        liberarActualizacion();

        mostrarFeedback(
          'error',
          error.message
        );
      }
    };


  /* =========================================================
     CARGANDO
     ========================================================= */

  if (cargando) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() =>
            setFeedback({
              ...feedback,
              mensaje: ''
            })
          }
        />


        <Link
          className="btn-volver"
          to="/gestion/gastos"
        >
          ← Volver a gastos
        </Link>


        <div className="pedidos-card">
          <p>
            Cargando gasto...
          </p>
        </div>

      </div>
    );
  }


  /* =========================================================
     NO ENCONTRADO
     ========================================================= */

  if (!gasto) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() =>
            setFeedback({
              ...feedback,
              mensaje: ''
            })
          }
        />


        <Link
          className="btn-volver"
          to="/gestion/gastos"
        >
          ← Volver a gastos
        </Link>


        <div className="pedidos-card">
          <h3>
            Gasto no disponible
          </h3>

          <p>
            El gasto no existe o fue
            eliminado.
          </p>
        </div>

      </div>
    );
  }


  return (
    <div className="pedidos-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <div>
        <Link
          className="btn-volver"
          to="/gestion/gastos"
        >
          ← Volver a gastos
        </Link>
      </div>


      <div className="pedidos-header">
        <div>
          <h1>
            Editar gasto #{gasto.gasto_id}
          </h1>

          <p>
            Modifica los datos del gasto.
            La última modificación quedará
            registrada en la base de datos.
          </p>
        </div>
      </div>


      <div className="gasto-auditoria-card">

        <div>
          <span>
            Registrado por
          </span>

          <strong>
            {
              gasto.registrado_por ||
              '-'
            }
          </strong>
        </div>


        <div>
          <span>
            Fecha de registro
          </span>

          <strong>
            {
              gasto.created_at
                ?.slice(
                  0,
                  10
                ) ||
              '-'
            }
          </strong>
        </div>


        <div>
          <span>
            Última modificación
          </span>

          <strong>
            {
              gasto.updated_at
                ?.slice(
                  0,
                  10
                ) ||
              'Sin modificaciones'
            }
          </strong>
        </div>


        <div>
          <span>
            Modificado por
          </span>

          <strong>
            {
              gasto.actualizado_por ||
              '-'
            }
          </strong>
        </div>

      </div>


      <GastoForm
        titulo={`Datos del gasto #${gasto.gasto_id}`}
        form={form}
        tiposGasto={tiposGasto}
        proveedores={proveedores}
        procesando={actualizandoGasto}
        textoBoton="Guardar cambios"
        textoProcesando="Actualizando gasto..."
        onChange={handleChange}
        onSubmit={actualizarGasto}
      />

    </div>
  );
}


export default EditarGasto;

<<<END OF FILE>>>


---

## FILE: src\pages\Login.tsx

<<<START OF FILE>>>

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL, { guardarSesion } from '../services/api';

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setCargando(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.mensaje || 'Error al iniciar sesión');
        return;
      }

      guardarSesion(data.token, data.usuario);
      navigate('/gestion');

    } catch (error) {
      setError('No se pudo conectar con el backend');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>GestionDriza.v1.12</h1>
        <p>Sistema de Gestión</p>

        {error && <div className="error">{error}</div>}

        <label>Correo</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          placeholder="admin@driza.com"
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="********"
        />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}

export default Login;

<<<END OF FILE>>>


---

## FILE: src\pages\mermas\MermaDetalle.tsx

<<<START OF FILE>>>

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/mermas.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function MermaDetalle() {
  const {
    merma_id
  } = useParams();

  const [
    merma,
    setMerma
  ] = useState<any | null>(
    null
  );

  const [
    detalles,
    setDetalles
  ] = useState<any[]>([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);

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

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    merma_id
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


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  const fechaTexto = (
    valor: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return valor.slice(
      0,
      10
    );
  };


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando merma...
        </p>
      </div>
    );
  }


  if (!merma) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() =>
            setFeedback({
              ...feedback,
              mensaje: ''
            })
          }
        />

        <Link
          to="/gestion/mermas"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar la merma.
        </div>

      </div>
    );
  }


  return (
    <div className="pedidos-page merma-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <Link
        to="/gestion/mermas"
        className="btn-volver"
      >
        ← Volver a mermas
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            Detalle de merma
          </h1>

          <p>
            Materia prima descontada
            y lotes afectados.
          </p>
        </div>
      </div>


      <div className="merma-detalle-kpis">

        <div>
          <span>
            Fecha
          </span>

          <strong>
            {
              fechaTexto(
                merma.fecha_merma
              )
            }
          </strong>
        </div>


        <div>
          <span>
            Materias primas
          </span>

          <strong>
            {
              detalles.length
            }
          </strong>
        </div>


        <div>
          <span>
            Total descontado
          </span>

          <strong className="merma-cantidad">
            {
              cantidad(
                total
              )
            } KG
          </strong>
        </div>


        <div>
          <span>
            Registrado por
          </span>

          <strong>
            {
              merma.registrado_por
            }
          </strong>
        </div>

      </div>


      {
        merma.observacion &&
        (
          <div className="merma-observacion-general">
            {
              merma.observacion
            }
          </div>
        )
      }


      <div className="merma-detalles">

        {
          detalles.map(
            (
              item,
              index
            ) => (
              <article
                className="merma-detalle-card"
                key={
                  item
                    .merma_detalle_id
                }
              >

                <div className="merma-detalle-header">

                  <div>
                    <span>
                      Materia prima {
                        index + 1
                      }
                    </span>

                    <h3>
                      {
                        item.material
                      }
                      {' · '}
                      {
                        item.color
                      }
                    </h3>
                  </div>

                  <strong className="merma-cantidad">
                    -{
                      cantidad(
                        item.cantidad
                      )
                    } {
                      item.unidad
                    }
                  </strong>

                </div>


                {
                  item.observacion &&
                  (
                    <div className="merma-item-nota">
                      {
                        item.observacion
                      }
                    </div>
                  )
                }


                <details className="merma-fifo">

                  <summary>
                    Ver lotes afectados
                  </summary>


                  <div className="merma-fifo-contenido">

                    <div className="merma-fifo-header">
                      <div>
                        <h4>
                          Consumo de stock
                        </h4>

                        <p>
                          El sistema utilizó primero
                          el stock disponible más antiguo.
                        </p>
                      </div>

                      <span>
                        {
                          item
                            .consumos_fifo
                            ?.length ||
                          0
                        } lote(s)
                      </span>
                    </div>


                    <div className="tabla-scroll">

                      <table>
                        <thead>
                          <tr>
                            <th>
                              Lote
                            </th>
                            <th>
                              Fecha de compra
                            </th>
                            <th>
                              Material
                            </th>
                            <th>
                              Color
                            </th>
                            <th>
                              Descontado
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {
                            (
                              item
                                .consumos_fifo ||
                              []
                            ).map(
                              (
                                consumo: any
                              ) => (
                                <tr
                                  key={
                                    consumo
                                      .movimiento_materia_prima_id
                                  }
                                >
                                  <td>
                                    <strong>
                                      {
                                        consumo
                                          .nombre_lote
                                      }
                                    </strong>
                                  </td>

                                  <td>
                                    {
                                      fechaTexto(
                                        consumo
                                          .fecha_compra
                                      )
                                    }
                                  </td>

                                  <td>
                                    {
                                      consumo.material
                                    }
                                  </td>

                                  <td>
                                    {
                                      consumo.color
                                    }
                                  </td>

                                  <td>
                                    <strong className="merma-cantidad">
                                      -{
                                        cantidad(
                                          consumo
                                            .cantidad
                                        )
                                      } KG
                                    </strong>
                                  </td>
                                </tr>
                              )
                            )
                          }

                          {
                            (
                              item
                                .consumos_fifo ||
                              []
                            ).length ===
                              0 &&
                            (
                              <tr>
                                <td colSpan={5}>
                                  No se encontraron lotes afectados.
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>

                    </div>

                  </div>

                </details>

              </article>
            )
          )
        }

      </div>

    </div>
  );
}


export default MermaDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\mermas\MermasLista.tsx

<<<START OF FILE>>>

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/mermas.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Filtros = {
  q: string;
  fecha_desde: string;
  fecha_hasta: string;
};


const filtrosVacios: Filtros = {
  q: '',
  fecha_desde: '',
  fecha_hasta: ''
};


function MermasLista() {
  const [
    mermas,
    setMermas
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
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    filtros,
    setFiltros
  ] = useState<Filtros>({
    ...filtrosVacios
  });

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<Filtros>({
    ...filtrosVacios
  });

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });


  const cargarMermas =
    useCallback(
      async (
        pagina: number,
        filtrosConsulta: Filtros
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
          filtrosConsulta.q.trim()
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
          data.mermas || []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);

        try {
          await cargarMermas(
            page,
            filtrosAplicados
          );

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    page,
    filtrosAplicados,
    cargarMermas
  ]);


  const aplicarFiltros = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPage(1);

    setFiltrosAplicados({
      q:
        filtros.q.trim(),
      fecha_desde:
        filtros.fecha_desde,
      fecha_hasta:
        filtros.fecha_hasta
    });
  };


  const limpiarFiltros = () => {
    setFiltros({
      ...filtrosVacios
    });

    setPage(1);

    setFiltrosAplicados({
      ...filtrosVacios
    });
  };


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  const fechaTexto = (
    valor: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return valor.slice(
      0,
      10
    );
  };


  return (
    <div className="pedidos-page merma-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <div className="pedidos-header merma-header">
        <div>
          <h1>
            Mermas de materia prima
          </h1>

          <p>
            Consulta las pérdidas registradas
            y su impacto en el almacén.
          </p>
        </div>

        <Link
          to="/gestion/mermas/registrar"
          className="btn-primary-link"
        >
          + Registrar merma
        </Link>
      </div>


      <form
        className="merma-filtros"
        onSubmit={
          aplicarFiltros
        }
      >

        <div className="merma-filtro-busqueda">
          <label>
            Buscar
          </label>

          <input
            value={filtros.q}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                q:
                  e.target.value
              })
            }
            placeholder="Material, color u observación..."
          />
        </div>


        <div>
          <label>
            Desde
          </label>

          <input
            type="date"
            value={
              filtros.fecha_desde
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                fecha_desde:
                  e.target.value
              })
            }
          />
        </div>


        <div>
          <label>
            Hasta
          </label>

          <input
            type="date"
            value={
              filtros.fecha_hasta
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                fecha_hasta:
                  e.target.value
              })
            }
          />
        </div>


        <button type="submit">
          Buscar
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={
            limpiarFiltros
          }
        >
          Limpiar
        </button>

      </form>


      <div className="tabla-card">

        <div className="merma-tabla-header">
          <div>
            <h3>
              Historial de mermas
            </h3>

            <p>
              Cada registro conserva la trazabilidad
              de los lotes afectados.
            </p>
          </div>

          <span className="muted">
            {
              paginacion.total
            } registro(s)
          </span>
        </div>


        {
          cargando
            ? (
              <p>
                Cargando mermas...
              </p>
            )
            : (
              <>
                <div className="tabla-scroll">

                  <table>
                    <thead>
                      <tr>
                        <th>
                          Fecha
                        </th>
                        <th>
                          Materias primas
                        </th>
                        <th>
                          Total
                        </th>
                        <th>
                          Observación
                        </th>
                        <th>
                          Registrado por
                        </th>
                        <th>
                          Acción
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        mermas.map(
                          (merma) => (
                            <tr
                              key={
                                merma.merma_id
                              }
                            >
                              <td>
                                <strong>
                                  {
                                    fechaTexto(
                                      merma.fecha_merma
                                    )
                                  }
                                </strong>
                              </td>

                              <td>
                                {
                                  merma
                                    .cantidad_items
                                }
                              </td>

                              <td>
                                <strong className="merma-cantidad">
                                  {
                                    cantidad(
                                      merma
                                        .total_merma_kg
                                    )
                                  } KG
                                </strong>
                              </td>

                              <td>
                                {
                                  merma
                                    .observacion ||
                                  '-'
                                }
                              </td>

                              <td>
                                {
                                  merma
                                    .registrado_por
                                }
                              </td>

                              <td>
                                <Link
                                  className="btn-outline"
                                  to={
                                    `/gestion/mermas/${merma.merma_id}`
                                  }
                                >
                                  Ver detalle
                                </Link>
                              </td>
                            </tr>
                          )
                        )
                      }

                      {
                        mermas.length === 0 &&
                        (
                          <tr>
                            <td colSpan={6}>
                              No hay mermas registradas
                              para los filtros seleccionados.
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>

                </div>


                <div className="paginado">

                  <button
                    type="button"
                    disabled={
                      page <= 1
                    }
                    onClick={() =>
                      setPage(
                        page - 1
                      )
                    }
                  >
                    Anterior
                  </button>

                  <span>
                    Página {
                      paginacion.page
                    } de {
                      paginacion
                        .totalPaginas ||
                      1
                    }
                  </span>

                  <button
                    type="button"
                    disabled={
                      page >=
                      paginacion
                        .totalPaginas
                    }
                    onClick={() =>
                      setPage(
                        page + 1
                      )
                    }
                  >
                    Siguiente
                  </button>

                </div>
              </>
            )
        }

      </div>

    </div>
  );
}


export default MermasLista;


<<<END OF FILE>>>


---

## FILE: src\pages\mermas\RegistrarMerma.tsx

<<<START OF FILE>>>

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import ConfirmDialog
  from '../../components/common/ConfirmDialog';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import '../../styles/mermas.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


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
  material_id: string;
  color_id: string;
  cantidad: string;
  observacion: string;
};


const fechaLocalActual = () => {
  const hoy =
    new Date();

  const anio =
    hoy.getFullYear();

  const mes =
    String(
      hoy.getMonth() + 1
    ).padStart(
      2,
      '0'
    );

  const dia =
    String(
      hoy.getDate()
    ).padStart(
      2,
      '0'
    );

  return `${anio}-${mes}-${dia}`;
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


const crearDetalle =
  (): DetalleMerma => ({
    local_id:
      nuevoLocalId(),
    material_id: '',
    color_id: '',
    cantidad: '',
    observacion: ''
  });


function RegistrarMerma() {
  const navigate =
    useNavigate();

  const [
    fechaMerma,
    setFechaMerma
  ] = useState(
    fechaLocalActual()
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
    confirmando,
    setConfirmando
  ] = useState(false);

  const [
    idempotencyKey,
    setIdempotencyKey
  ] = useState(
    nuevaKey()
  );

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const cargarDisponibilidad =
    async () => {
      const data =
        await apiFetch(
          '/mermas/disponibilidad'
        );

      setDisponibilidad(
        (data.items || [])
          .map(
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
    };


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);

        try {
          await cargarDisponibilidad();

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, []);


  const materiales =
    useMemo(
      () => {
        const mapa =
          new Map<
            number,
            string
          >();

        disponibilidad
          .forEach(
            (item) => {
              mapa.set(
                Number(
                  item.material_id
                ),
                item.material
              );
            }
          );

        return Array.from(
          mapa.entries()
        ).map(
          ([
            id,
            nombre
          ]) => ({
            id,
            nombre
          })
        );
      },
      [
        disponibilidad
      ]
    );


  const coloresParaMaterial = (
    materialId: string
  ) => {
    if (!materialId) {
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
          id:
            Number(
              item.color_id
            ),
          nombre:
            item.color
        })
      );
  };


  const disponibilidadDetalle = (
    detalle: DetalleMerma
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


  const actualizarDetalle = (
    index: number,
    cambios:
      Partial<
        DetalleMerma
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


  const agregarDetalle = () => {
    if (procesando) {
      return;
    }

    setDetalles([
      ...detalles,
      crearDetalle()
    ]);
  };


  const quitarDetalle = (
    index: number
  ) => {
    if (procesando) {
      return;
    }

    if (
      detalles.length === 1
    ) {
      setFeedback({
        tipo: 'warning',
        mensaje:
          'La merma debe tener al menos una materia prima'
      });

      return;
    }

    setDetalles(
      detalles.filter(
        (_, i) =>
          i !== index
      )
    );
  };


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
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


  const validar = () => {
    if (!fechaMerma) {
      return (
        'La fecha de merma es obligatoria'
      );
    }

    if (
      disponibilidad.length === 0
    ) {
      return (
        'No hay materia prima disponible para registrar una merma'
      );
    }

    const combinaciones =
      new Set<string>();

    for (
      let i = 0;
      i < detalles.length;
      i++
    ) {
      const detalle =
        detalles[i];

      if (
        !detalle.material_id ||
        !detalle.color_id
      ) {
        return (
          `Completa el material y color del producto ${i + 1}`
        );
      }

      const stock =
        disponibilidadDetalle(
          detalle
        );

      if (!stock) {
        return (
          `La materia prima del producto ${i + 1} no tiene stock disponible`
        );
      }

      const key =
        `${detalle.material_id}:${detalle.color_id}`;

      if (
        combinaciones.has(
          key
        )
      ) {
        return (
          'No se puede repetir la misma materia prima en una sola merma'
        );
      }

      combinaciones.add(
        key
      );

      const valor =
        Number(
          detalle.cantidad
        );

      if (
        !Number.isFinite(
          valor
        ) ||
        valor <= 0
      ) {
        return (
          `La cantidad del producto ${i + 1} debe ser mayor a 0`
        );
      }

      if (
        valor >
        Number(
          stock
            .cantidad_disponible
        ) +
        0.000001
      ) {
        return (
          `La cantidad del producto ${i + 1} supera el stock disponible`
        );
      }
    }

    return null;
  };


  const solicitarRegistro = (
    e: FormEvent
  ) => {
    e.preventDefault();

    const error =
      validar();

    if (error) {
      setFeedback({
        tipo: 'error',
        mensaje: error
      });

      return;
    }

    setConfirmando(
      true
    );
  };


  const registrar = async () => {
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
                  fechaMerma,

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

      setConfirmando(
        false
      );

      setFeedback({
        tipo: 'success',
        mensaje:
          data.reutilizada
            ? 'La merma ya había sido registrada. Se recuperó el resultado existente sin descontar stock nuevamente.'
            : 'Merma registrada correctamente.'
      });

      setIdempotencyKey(
        nuevaKey()
      );

      setTimeout(() => {
        navigate(
          `/gestion/mermas/${data.merma.merma_id}`
        );
      }, 700);

    } catch (error: any) {
      liberar();

      setConfirmando(
        false
      );

      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };


  return (
    <div className="pedidos-page merma-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <ConfirmDialog
        abierto={confirmando}
        titulo="Registrar merma"
        descripcion={
          `Se descontarán ${cantidad(totalMerma)} KG de materia prima del almacén. El sistema utilizará automáticamente el stock disponible más antiguo. ¿Deseas continuar?`
        }
        textoConfirmar="Registrar merma"
        textoProcesando="Registrando..."
        procesando={procesando}
        onConfirmar={registrar}
        onCerrar={() =>
          !procesando &&
          setConfirmando(
            false
          )
        }
      />


      <Link
        to="/gestion/mermas"
        className="btn-volver"
      >
        ← Volver a mermas
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            Registrar merma
          </h1>

          <p>
            Registra la materia prima perdida
            y la cantidad afectada.
          </p>
        </div>
      </div>


      <form
        className="merma-form"
        onSubmit={
          solicitarRegistro
        }
      >

        <section className="merma-seccion">

          <div className="merma-seccion-header">
            <div>
              <h3>
                Datos de la merma
              </h3>

              <p>
                Información general del registro.
              </p>
            </div>
          </div>


          <div className="merma-cabecera-grid">

            <div>
              <label>
                Fecha
              </label>

              <input
                type="date"
                value={fechaMerma}
                onChange={(e) =>
                  setFechaMerma(
                    e.target.value
                  )
                }
                disabled={
                  procesando
                }
              />
            </div>


            <div>
              <label>
                Observación general
              </label>

              <textarea
                value={
                  observacion
                }
                onChange={(e) =>
                  setObservacion(
                    e.target.value
                  )
                }
                rows={3}
                placeholder="Ejemplo: Material deteriorado durante manipulación"
                disabled={
                  procesando
                }
              />
            </div>

          </div>

        </section>


        <section className="merma-seccion">

          <div className="merma-seccion-header">
            <div>
              <h3>
                Materia prima afectada
              </h3>

              <p>
                Selecciona el material,
                color y cantidad perdida.
              </p>
            </div>

            <button
              type="button"
              onClick={
                agregarDetalle
              }
              disabled={
                procesando ||
                cargando ||
                disponibilidad.length ===
                  0
              }
            >
              + Agregar materia prima
            </button>
          </div>


          {
            cargando
              ? (
                <p>
                  Cargando stock disponible...
                </p>
              )
              : disponibilidad.length ===
                  0
                ? (
                  <div className="merma-alerta merma-alerta-warning">
                    No hay materia prima con stock disponible.
                  </div>
                )
                : (
                  <div className="merma-items">

                    {
                      detalles.map(
                        (
                          detalle,
                          index
                        ) => {
                          const stock =
                            disponibilidadDetalle(
                              detalle
                            );

                          const disponible =
                            Number(
                              stock
                                ?.cantidad_disponible ||
                              0
                            );

                          const valor =
                            Number(
                              detalle
                                .cantidad ||
                              0
                            );

                          const saldo =
                            disponible -
                            valor;

                          return (
                            <article
                              className="merma-item-card"
                              key={
                                detalle.local_id
                              }
                            >

                              <div className="merma-item-header">

                                <strong>
                                  Materia prima {
                                    index + 1
                                  }
                                </strong>

                                <button
                                  type="button"
                                  className="btn-danger"
                                  onClick={() =>
                                    quitarDetalle(
                                      index
                                    )
                                  }
                                  disabled={
                                    procesando
                                  }
                                >
                                  Quitar
                                </button>

                              </div>


                              <div className="merma-item-grid">

                                <div>
                                  <label>
                                    Material
                                  </label>

                                  <select
                                    value={
                                      detalle
                                        .material_id
                                    }
                                    onChange={(e) =>
                                      actualizarDetalle(
                                        index,
                                        {
                                          material_id:
                                            e.target.value,
                                          color_id: '',
                                          cantidad: ''
                                        }
                                      )
                                    }
                                    disabled={
                                      procesando
                                    }
                                  >
                                    <option value="">
                                      Seleccione
                                    </option>

                                    {
                                      materiales.map(
                                        (material) => (
                                          <option
                                            key={
                                              material.id
                                            }
                                            value={
                                              material.id
                                            }
                                          >
                                            {
                                              material.nombre
                                            }
                                          </option>
                                        )
                                      )
                                    }
                                  </select>
                                </div>


                                <div>
                                  <label>
                                    Color
                                  </label>

                                  <select
                                    value={
                                      detalle
                                        .color_id
                                    }
                                    onChange={(e) =>
                                      actualizarDetalle(
                                        index,
                                        {
                                          color_id:
                                            e.target.value,
                                          cantidad: ''
                                        }
                                      )
                                    }
                                    disabled={
                                      procesando ||
                                      !detalle
                                        .material_id
                                    }
                                  >
                                    <option value="">
                                      Seleccione
                                    </option>

                                    {
                                      coloresParaMaterial(
                                        detalle
                                          .material_id
                                      ).map(
                                        (color) => (
                                          <option
                                            key={
                                              color.id
                                            }
                                            value={
                                              color.id
                                            }
                                          >
                                            {
                                              color.nombre
                                            }
                                          </option>
                                        )
                                      )
                                    }
                                  </select>
                                </div>


                                <div>
                                  <label>
                                    Cantidad perdida
                                  </label>

                                  <div className="merma-input-unidad">

                                    <input
                                      type="number"
                                      min="0.001"
                                      max={
                                        disponible >
                                        0
                                          ? disponible
                                          : undefined
                                      }
                                      step="0.001"
                                      value={
                                        detalle
                                          .cantidad
                                      }
                                      onChange={(e) =>
                                        actualizarDetalle(
                                          index,
                                          {
                                            cantidad:
                                              e.target.value
                                          }
                                        )
                                      }
                                      placeholder="0.000"
                                      disabled={
                                        procesando ||
                                        !stock
                                      }
                                    />

                                    <span>
                                      KG
                                    </span>

                                  </div>
                                </div>


                                <div className="merma-item-observacion">
                                  <label>
                                    Observación
                                  </label>

                                  <input
                                    value={
                                      detalle
                                        .observacion
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
                                    placeholder="Opcional"
                                    disabled={
                                      procesando
                                    }
                                  />
                                </div>

                              </div>


                              {
                                stock &&
                                (
                                  <div className="merma-stock-resumen">

                                    <div>
                                      <span>
                                        Disponible
                                      </span>

                                      <strong>
                                        {
                                          cantidad(
                                            disponible
                                          )
                                        } KG
                                      </strong>
                                    </div>


                                    <div>
                                      <span>
                                        Merma ingresada
                                      </span>

                                      <strong className="merma-cantidad">
                                        {
                                          cantidad(
                                            valor
                                          )
                                        } KG
                                      </strong>
                                    </div>


                                    <div>
                                      <span>
                                        Saldo estimado
                                      </span>

                                      <strong
                                        className={
                                          saldo < 0
                                            ? 'merma-saldo-error'
                                            : 'merma-saldo-ok'
                                        }
                                      >
                                        {
                                          cantidad(
                                            Math.max(
                                              saldo,
                                              0
                                            )
                                          )
                                        } KG
                                      </strong>
                                    </div>

                                  </div>
                                )
                              }


                              {
                                stock &&
                                valor >
                                  disponible &&
                                (
                                  <div className="merma-alerta merma-alerta-error">
                                    La cantidad ingresada supera
                                    el stock disponible.
                                  </div>
                                )
                              }

                            </article>
                          );
                        }
                      )
                    }

                  </div>
                )
          }

        </section>


        <div className="merma-total">

          <div>
            <span>
              Total de merma
            </span>

            <small>
              {
                detalles.length
              } materia(s) prima(s)
            </small>
          </div>

          <strong>
            {
              cantidad(
                totalMerma
              )
            } KG
          </strong>

        </div>


        <div className="merma-actions">

          <Link
            to="/gestion/mermas"
            className="btn-secondary-link"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={
              procesando ||
              cargando ||
              disponibilidad.length ===
                0
            }
          >
            {
              procesando
                ? 'Registrando...'
                : 'Registrar merma'
            }
          </button>

        </div>

      </form>

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
  useCallback,
  useEffect,
  useState
} from 'react';

import type {
  ChangeEvent,
  FormEvent
} from 'react';

import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import ConfirmDialog
  from '../../components/common/ConfirmDialog';

import PedidoItemsEditor, {
  detallePedidoVacio,
  type DetallePedidoForm
} from '../../components/pedidos/PedidoItemsEditor';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


/* =========================================================
   CONVERTIR DETALLE DEL BACKEND AL FORMULARIO
   ========================================================= */

const convertirDetalleExistente = (
  detalle: any
): DetallePedidoForm => {
  return {
    pedido_detalle_id:
      Number(
        detalle.pedido_detalle_id
      ),

    cantidad_entregada:
      Number(
        detalle.cantidad_entregada ||
        0
      ),

    cantidad_pendiente:
      Number(
        detalle.cantidad_pendiente ||
        0
      ),

    estado_entrega:
      detalle.estado_entrega ||
      'PENDIENTE',

    unidad:
      detalle.unidad ||
      '',


    tipo_producto_id:
      detalle.tipo_producto_id
        ? String(
            detalle.tipo_producto_id
          )
        : '',


    medida_id:
      detalle.medida_id
        ? String(
            detalle.medida_id
          )
        : '',


    color_id:
      detalle.color_id
        ? String(
            detalle.color_id
          )
        : '',


    material_id:
      detalle.material_id
        ? String(
            detalle.material_id
          )
        : '',


    cantidad_pedida:
      detalle.cantidad_pedida !==
        null &&
      detalle.cantidad_pedida !==
        undefined
        ? String(
            detalle.cantidad_pedida
          )
        : '',


    unidad_medida_id:
      detalle.unidad_medida_id
        ? String(
            detalle.unidad_medida_id
          )
        : '',


    cantidad_presentacion:
      detalle.cantidad_presentacion !==
        null &&
      detalle.cantidad_presentacion !==
        undefined
        ? String(
            detalle.cantidad_presentacion
          )
        : '',


    unidad_presentacion_id:
      detalle.unidad_presentacion_id
        ? String(
            detalle.unidad_presentacion_id
          )
        : '',


    precio_unitario:
      detalle.precio_unitario !==
        null &&
      detalle.precio_unitario !==
        undefined
        ? String(
            detalle.precio_unitario
          )
        : '',


    moneda_codigo:
      detalle.moneda_codigo ||
      'PEN',


    descripcion_item:
      detalle.descripcion_item ||
      '',


    observacion:
      detalle.observacion ||
      ''
  };
};


/* =========================================================
   SABER SI UN PRODUCTO NUEVO FUE UTILIZADO
   ========================================================= */

const detalleNuevoTieneDatos = (
  item: DetallePedidoForm
) => {
  return Boolean(
    item.tipo_producto_id ||

    item.medida_id ||

    item.color_id ||

    item.material_id ||

    item.cantidad_pedida ||

    item.unidad_medida_id ||

    item.cantidad_presentacion ||

    item.precio_unitario ||

    item.descripcion_item.trim() ||

    item.observacion.trim()
  );
};


/* =========================================================
   VALIDAR UN DETALLE
   ========================================================= */

const validarDetalle = (
  item: DetallePedidoForm,
  nombre: string,
  validarCantidadEntregada = false
) => {

  /* =======================================================
     TIPO / MEDIDA / COLOR / MATERIAL
     ======================================================= */

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


  /* =======================================================
     CANTIDAD
     ======================================================= */

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


  /*
   * REGLA PRINCIPAL:
   *
   * Si ya se entregaron 80 KG:
   *
   * 100 → 90 ✅
   * 100 → 80 ✅
   * 100 → 79 ❌
   */
  if (
    validarCantidadEntregada
  ) {
    const cantidadEntregada =
      Number(
        item.cantidad_entregada ||
        0
      );


    if (
      cantidad <
      cantidadEntregada
    ) {
      return (
        `${nombre} no puede tener una cantidad menor a lo ya entregado (${cantidadEntregada} ${item.unidad || ''})`
      );
    }
  }


  /* =======================================================
     UNIDAD
     ======================================================= */

  if (
    !item.unidad_medida_id
  ) {
    return (
      `${nombre} debe tener una unidad de medida`
    );
  }


  /* =======================================================
     PRESENTACIÓN
     ======================================================= */

  if (
    item.cantidad_presentacion !==
    ''
  ) {
    const presentacion =
      Number(
        item.cantidad_presentacion
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
      !item.unidad_presentacion_id
    ) {
      return (
        `${nombre} debe tener una unidad de presentación`
      );
    }
  }


  /* =======================================================
     PRECIO
     ======================================================= */

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


  /* =======================================================
     MONEDA
     ======================================================= */

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


  return null;
};


/* =========================================================
   CONVERTIR DETALLE DEL FORMULARIO AL BODY DE LA API
   ========================================================= */

const convertirDetalleParaApi = (
  item: DetallePedidoForm,
  incluirId = false
) => {
  return {
    ...(incluirId
      ? {
          pedido_detalle_id:
            Number(
              item.pedido_detalle_id
            )
        }
      : {}
    ),


    tipo_producto_id:
      Number(
        item.tipo_producto_id
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
        item.cantidad_pedida
      ),


    unidad_medida_id:
      Number(
        item.unidad_medida_id
      ),


    cantidad_presentacion:
      item.cantidad_presentacion
        ? Number(
            item.cantidad_presentacion
          )
        : null,


    unidad_presentacion_id:
      item.cantidad_presentacion &&
      item.unidad_presentacion_id
        ? Number(
            item.unidad_presentacion_id
          )
        : null,


    precio_unitario:
      Number(
        item.precio_unitario
      ),


    moneda_codigo:
      item.moneda_codigo,


    descripcion_item:
      item.descripcion_item.trim(),


    observacion:
      item.observacion.trim()
  };
};


/* =========================================================
   COMPONENTE
   ========================================================= */

function EditarPedido() {

  const {
    pedido_id
  } = useParams();


  const navigate =
    useNavigate();


  /* =========================================================
     PEDIDO
     ========================================================= */

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


  /* =========================================================
     CATÁLOGOS
     ========================================================= */

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


  /* =========================================================
     CABECERA DEL PEDIDO
     ========================================================= */

  const [
    form,
    setForm
  ] = useState({
    cliente_id: '',

    codigo_pedido: '',

    fecha_pedido: '',

    fecha_entrega_estimada: '',

    descripcion_pedido: '',

    motivo_cambio: ''
  });


  /* =========================================================
     PRODUCTOS EXISTENTES
     ========================================================= */

  const [
    detallesEditados,
    setDetallesEditados
  ] = useState<
    DetallePedidoForm[]
  >([]);


  /* =========================================================
     PRODUCTOS NUEVOS
     ========================================================= */

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


  /* =========================================================
     DIÁLOGO DE CONFIRMACIÓN
     ========================================================= */

  const [
    dialogAbierto,
    setDialogAbierto
  ] = useState(false);


  /* =========================================================
     FEEDBACK
     ========================================================= */

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',

    mensaje: ''
  });


  const mostrarFeedback = (
    tipo: FeedbackTipo,
    mensaje: string
  ) => {
    setFeedback({
      tipo,
      mensaje
    });
  };


  /* =========================================================
     PROTECCIÓN CONTRA MÚLTIPLES PUT
     ========================================================= */

  const {
    procesando:
      actualizandoPedido,

    intentarBloquear:
      bloquearActualizacion,

    liberar:
      liberarActualizacion

  } = useBloqueoAccion();


  /* =========================================================
     CARGAR PEDIDO Y CATÁLOGOS
     ========================================================= */

  const cargarDatos =
    useCallback(
      async () => {

        if (!pedido_id) {
          throw new Error(
            'ID de pedido no válido'
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
            '/clientes'
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


        const pedidoActual =
          pedidoData.pedido;


        if (!pedidoActual) {
          throw new Error(
            'Pedido no encontrado'
          );
        }


        /* ===================================================
           PEDIDO
           =================================================== */

        setPedido(
          pedidoActual
        );


        /* ===================================================
           CLIENTES
           =================================================== */

        const listaClientes = [
          ...(clientesData.clientes || [])
        ];


        /*
         * Clientes está paginado.
         *
         * Puede ocurrir que el cliente del
         * pedido no se encuentre en la primera
         * página del endpoint /clientes.
         *
         * Lo agregamos manualmente al select.
         */
        const clienteActualExiste =
          listaClientes.some(
            (cliente) =>
              Number(
                cliente.cliente_id
              ) ===
              Number(
                pedidoActual.cliente_id
              )
          );


        if (
          !clienteActualExiste
        ) {
          listaClientes.push({
            cliente_id:
              pedidoActual.cliente_id,

            razon_social:
              pedidoActual.razon_social,

            ruc:
              pedidoActual.ruc
          });
        }


        setClientes(
          listaClientes
        );


        /* ===================================================
           CATÁLOGOS
           =================================================== */

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


        /* ===================================================
           CABECERA
           =================================================== */

        setForm({
          cliente_id:
            String(
              pedidoActual.cliente_id
            ),


          codigo_pedido:
            pedidoActual.codigo_pedido ||
            '',


          fecha_pedido:
            pedidoActual.fecha_pedido
              ?.slice(
                0,
                10
              ) ||
            '',


          fecha_entrega_estimada:
            pedidoActual
              .fecha_entrega_estimada
              ?.slice(
                0,
                10
              ) ||
            '',


          descripcion_pedido:
            pedidoActual
              .descripcion_pedido ||
            '',


          motivo_cambio:
            ''
        });


        /* ===================================================
           PRODUCTOS EXISTENTES
           =================================================== */

        setDetallesEditados(
          (
            pedidoActual.detalles ||
            []
          ).map(
            convertirDetalleExistente
          )
        );


        /* ===================================================
           NUEVOS PRODUCTOS
           =================================================== */

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


  /* =========================================================
     USE EFFECT DE CARGA
     ========================================================= */

  useEffect(() => {

    const iniciar =
      async () => {

        try {
          setCargando(
            true
          );


          setErrorCarga(
            ''
          );


          await cargarDatos();

        } catch (error: any) {

          const mensaje =
            error.message ||
            'No se pudo cargar el pedido';


          setErrorCarga(
            mensaje
          );


          mostrarFeedback(
            'error',
            mensaje
          );

        } finally {

          setCargando(
            false
          );
        }
      };


    iniciar();

  }, [
    cargarDatos
  ]);


  /* =========================================================
     CAMBIO DE CABECERA
     ========================================================= */

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {

    if (
      actualizandoPedido
    ) {
      return;
    }


    setForm({
      ...form,

      [e.target.name]:
        e.target.value
    });
  };


  /* =========================================================
     VALIDAR FORMULARIO COMPLETO
     ========================================================= */

  const validarFormulario = () => {

    /* =======================================================
       PEDIDO ENTREGADO
       ======================================================= */

    if (
      pedido?.estado_pedido ===
      'ENTREGADO'
    ) {
      return (
        'Un pedido completamente entregado ya no puede editarse'
      );
    }


    /* =======================================================
       PEDIDO CANCELADO
       ======================================================= */

    if (
      pedido?.estado_pedido ===
      'CANCELADO'
    ) {
      return (
        'Un pedido cancelado no puede editarse'
      );
    }


    /* =======================================================
       CLIENTE
       ======================================================= */

    if (
      !form.cliente_id
    ) {
      return (
        'Debes seleccionar un cliente'
      );
    }


    /* =======================================================
       FECHA
       ======================================================= */

    if (
      !form.fecha_pedido
    ) {
      return (
        'Debes ingresar la fecha del pedido'
      );
    }


    /* =======================================================
       MOTIVO
       ======================================================= */

    if (
      !form.motivo_cambio.trim()
    ) {
      return (
        'Debes ingresar el motivo del cambio'
      );
    }


    /* =======================================================
       DEBE EXISTIR AL MENOS UN PRODUCTO REGISTRADO
       ======================================================= */

    if (
      detallesEditados.length ===
      0
    ) {
      return (
        'El pedido debe tener al menos un producto'
      );
    }


    /* =======================================================
       PRODUCTOS EXISTENTES
       ======================================================= */

    for (
      let index = 0;
      index <
      detallesEditados.length;
      index++
    ) {

      const item =
        detallesEditados[index];


      if (
        !item.pedido_detalle_id
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


    /* =======================================================
       PRODUCTOS NUEVOS
       ======================================================= */

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


  /* =========================================================
     PREPARAR EDICIÓN
     ========================================================= */

  const prepararEdicion = (
    e: FormEvent
  ) => {

    e.preventDefault();


    if (
      actualizandoPedido
    ) {
      return;
    }


    const error =
      validarFormulario();


    if (error) {

      mostrarFeedback(
        'error',
        error
      );


      return;
    }


    setDialogAbierto(
      true
    );
  };


  /* =========================================================
     CONFIRMAR EDICIÓN
     ========================================================= */

  const confirmarEdicion =
    async () => {

      /*
       * useBloqueoAccion utiliza useRef.
       *
       * Por eso aunque el usuario haga
       * varios clics muy rápidos, solo
       * entra la primera llamada.
       */
      if (
        !bloquearActualizacion()
      ) {
        return;
      }


      /*
       * Validamos nuevamente antes del PUT.
       */
      const error =
        validarFormulario();


      if (error) {

        liberarActualizacion();


        setDialogAbierto(
          false
        );


        mostrarFeedback(
          'error',
          error
        );


        return;
      }


      try {

        /* ===================================================
           FILTRAR PRODUCTOS NUEVOS VACÍOS
           =================================================== */

        const nuevosValidos =
          nuevosDetalles.filter(
            detalleNuevoTieneDatos
          );


        /* ===================================================
           CONSTRUIR BODY
           =================================================== */

        const body = {

          /* =================================================
             CABECERA
             ================================================= */

          cliente_id:
            Number(
              form.cliente_id
            ),


          codigo_pedido:
            form.codigo_pedido
              .trim() ||
            null,


          descripcion_pedido:
            form.descripcion_pedido
              .trim(),


          fecha_pedido:
            form.fecha_pedido,


          fecha_entrega_estimada:
            form
              .fecha_entrega_estimada ||
            null,


          motivo_cambio:
            form.motivo_cambio
              .trim(),


          /* =================================================
             PRODUCTOS EXISTENTES
             ================================================= */

          detalles_editados:
            detallesEditados.map(
              (item) =>
                convertirDetalleParaApi(
                  item,
                  true
                )
            ),


          /* =================================================
             PRODUCTOS NUEVOS
             ================================================= */

          nuevos_detalles:
            nuevosValidos.map(
              (item) =>
                convertirDetalleParaApi(
                  item,
                  false
                )
            )
        };


        /* ===================================================
           PUT
           =================================================== */

        await apiFetch(
          `/pedidos/${pedido_id}`,
          {
            method: 'PUT',

            body:
              JSON.stringify(
                body
              )
          }
        );


        /* ===================================================
           ÉXITO
           =================================================== */

        setDialogAbierto(
          false
        );


        mostrarFeedback(
          'success',
          'Pedido actualizado correctamente'
        );


        /*
         * NO liberamos el bloqueo aquí.
         *
         * Si lo liberáramos durante estos
         * milisegundos el usuario podría
         * volver a generar otro PUT.
         *
         * Navegamos con el bloqueo activo.
         */
        setTimeout(() => {

          navigate(
            `/gestion/pedidos/${pedido_id}`
          );

        }, 900);


      } catch (error: any) {

        /*
         * Si el backend rechazó la edición,
         * permitimos volver a intentarlo.
         */
        liberarActualizacion();


        mostrarFeedback(
          'error',
          error.message
        );
      }
    };


  /* =========================================================
     CARGANDO
     ========================================================= */

  if (
    cargando
  ) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={
            feedback.tipo
          }

          mensaje={
            feedback.mensaje
          }

          onClose={() =>
            setFeedback({
              ...feedback,

              mensaje: ''
            })
          }
        />


        <Link
          to="/gestion/pedidos"
          className="btn-volver"
        >
          ← Volver a pedidos
        </Link>


        <div className="pedidos-card">

          <p>
            Cargando pedido...
          </p>

        </div>

      </div>
    );
  }


  /* =========================================================
     ERROR DE CARGA
     ========================================================= */

  if (
    !pedido ||
    errorCarga
  ) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={
            feedback.tipo
          }

          mensaje={
            feedback.mensaje
          }

          onClose={() =>
            setFeedback({
              ...feedback,

              mensaje: ''
            })
          }
        />


        <Link
          to="/gestion/pedidos"
          className="btn-volver"
        >
          ← Volver a pedidos
        </Link>


        <div className="pedidos-card">

          <h3>
            Pedido no disponible
          </h3>


          <p>
            {
              errorCarga ||
              'No se pudo cargar el pedido.'
            }
          </p>

        </div>

      </div>
    );
  }


  /* =========================================================
     PEDIDO ENTREGADO
     ========================================================= */

  if (
    pedido.estado_pedido ===
    'ENTREGADO'
  ) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={
            feedback.tipo
          }

          mensaje={
            feedback.mensaje
          }

          onClose={() =>
            setFeedback({
              ...feedback,

              mensaje: ''
            })
          }
        />


        <Link
          to={
            `/gestion/pedidos/${pedido_id}`
          }

          className="btn-volver"
        >
          ← Volver al detalle
        </Link>


        <div className="pedidos-header">

          <div>

            <h1>
              Pedido #{pedido.pedido_id}
            </h1>


            <p>
              El pedido ya está completamente
              entregado.
            </p>

          </div>

        </div>


        <div className="pedidos-card">

          <div className="pedido-item-aviso-entrega">

            Este pedido ya se encuentra{' '}

            <strong>
              completamente entregado
            </strong>.

            {' '}

            Por seguridad ya no puede
            modificarse.

          </div>


          <Link
            to={
              `/gestion/pedidos/${pedido_id}`
            }

            className="btn-outline"
          >
            Ver detalle del pedido
          </Link>

        </div>

      </div>
    );
  }


  /* =========================================================
     PEDIDO CANCELADO
     ========================================================= */

  if (
    pedido.estado_pedido ===
    'CANCELADO'
  ) {
    return (
      <div className="pedidos-page">

        <Link
          to={
            `/gestion/pedidos/${pedido_id}`
          }

          className="btn-volver"
        >
          ← Volver al detalle
        </Link>


        <div className="pedidos-card">

          <h3>
            Pedido cancelado
          </h3>


          <p>
            Un pedido cancelado no puede
            modificarse.
          </p>

        </div>

      </div>
    );
  }


  /* =========================================================
     FORMULARIO PRINCIPAL
     ========================================================= */

  return (
    <div className="pedidos-page">


      {/* =====================================================
          FEEDBACK
          ===================================================== */}

      <FeedbackToast
        tipo={
          feedback.tipo
        }

        mensaje={
          feedback.mensaje
        }

        onClose={() =>
          setFeedback({
            ...feedback,

            mensaje: ''
          })
        }
      />


      {/* =====================================================
          CONFIRMACIÓN
          ===================================================== */}

      <ConfirmDialog
        abierto={
          dialogAbierto
        }

        titulo=
          "Confirmar edición del pedido"

        descripcion={
          'Se actualizarán los datos del pedido y sus productos. ' +
          'Las cantidades no pueden quedar por debajo de lo ya entregado. ' +
          'Los cambios quedarán registrados en el historial.'
        }

        textoConfirmar=
          "Actualizar pedido"

        textoProcesando=
          "Actualizando pedido..."

        procesando={
          actualizandoPedido
        }

        onConfirmar={
          confirmarEdicion
        }

        onCerrar={() => {

          if (
            !actualizandoPedido
          ) {
            setDialogAbierto(
              false
            );
          }
        }}
      />


      {/* =====================================================
          VOLVER
          ===================================================== */}

      <Link
        to={
          `/gestion/pedidos/${pedido_id}`
        }

        className="btn-volver"
      >
        ← Volver al detalle
      </Link>


      {/* =====================================================
          CABECERA
          ===================================================== */}

      <div className="pedidos-header">

        <div>

          <h1>
            Editar pedido #{pedido.pedido_id}
          </h1>


          <p>
            Modifica la información del pedido,
            los productos registrados o agrega
            nuevos productos.
          </p>

        </div>

      </div>


      {/* =====================================================
          FORMULARIO
          ===================================================== */}

      <form
        className="form-card pedido-form"

        onSubmit={
          prepararEdicion
        }
      >


        {/* ===================================================
            DATOS DEL PEDIDO
            =================================================== */}

        <h3>
          Datos del pedido
        </h3>


        {/* CLIENTE */}

        <label>
          Cliente
        </label>


        <select
          name="cliente_id"

          value={
            form.cliente_id
          }

          onChange={
            handleChange
          }

          disabled={
            actualizandoPedido
          }
        >

          <option value="">
            Seleccione cliente
          </option>


          {clientes.map(
            (cliente) => (

              <option
                key={
                  cliente.cliente_id
                }

                value={
                  cliente.cliente_id
                }
              >
                {
                  cliente.razon_social
                }

                {' - '}

                {
                  cliente.ruc
                }
              </option>

            )
          )}

        </select>


        {/* CÓDIGO */}

        <label>
          Código de pedido
        </label>


        <input
          name="codigo_pedido"

          value={
            form.codigo_pedido
          }

          onChange={
            handleChange
          }

          placeholder="Ejemplo: PED-001"

          disabled={
            actualizandoPedido
          }
        />


        {/* FECHA PEDIDO */}

        <label>
          Fecha de pedido
        </label>


        <input
          type="date"

          name="fecha_pedido"

          value={
            form.fecha_pedido
          }

          onChange={
            handleChange
          }

          disabled={
            actualizandoPedido
          }
        />


        {/* FECHA ENTREGA */}

        <label>
          Fecha de entrega estimada
        </label>


        <input
          type="date"

          name="fecha_entrega_estimada"

          value={
            form.fecha_entrega_estimada
          }

          onChange={
            handleChange
          }

          disabled={
            actualizandoPedido
          }
        />


        {/* DESCRIPCIÓN PEDIDO */}

        <label>
          Descripción del pedido
        </label>


        <textarea
          name="descripcion_pedido"

          value={
            form.descripcion_pedido
          }

          onChange={
            handleChange
          }

          rows={3}

          disabled={
            actualizandoPedido
          }
        />


        {/* ===================================================
            PRODUCTOS EXISTENTES
            =================================================== */}

        <PedidoItemsEditor
          detalles={
            detallesEditados
          }

          setDetalles={
            setDetallesEditados
          }

          tipos={
            tipos
          }

          medidas={
            medidas
          }

          colores={
            colores
          }

          materiales={
            materiales
          }

          unidades={
            unidades
          }

          titulo=
            "Editar productos registrados"

          permitirAgregar={
            false
          }

          permitirQuitar={
            false
          }

          bloquearEstructuraConEntrega={
            true
          }

          mostrarResumenEntrega={
            true
          }

          procesando={
            actualizandoPedido
          }

          onFeedback={
            mostrarFeedback
          }
        />


        {/* ===================================================
            PRODUCTOS NUEVOS
            =================================================== */}

        <PedidoItemsEditor
          detalles={
            nuevosDetalles
          }

          setDetalles={
            setNuevosDetalles
          }

          tipos={
            tipos
          }

          medidas={
            medidas
          }

          colores={
            colores
          }

          materiales={
            materiales
          }

          unidades={
            unidades
          }

          titulo=
            "Agregar nuevos productos opcionales"

          textoBotonAgregar=
            "+ Agregar otro producto nuevo"

          permitirAgregar={
            true
          }

          permitirQuitar={
            true
          }

          bloquearEstructuraConEntrega={
            false
          }

          mostrarResumenEntrega={
            false
          }

          procesando={
            actualizandoPedido
          }

          onFeedback={
            mostrarFeedback
          }
        />


        {/* ===================================================
            MOTIVO DEL CAMBIO
            =================================================== */}

        <div className="pedido-motivo-edicion">

          <label>
            Motivo del cambio
          </label>


          <textarea
            name="motivo_cambio"

            value={
              form.motivo_cambio
            }

            onChange={
              handleChange
            }

            rows={3}

            placeholder="Ejemplo: El cliente solicitó modificar la cantidad y el precio acordado."

            disabled={
              actualizandoPedido
            }
          />


          <span className="muted">

            El motivo quedará registrado
            en el historial del pedido.

          </span>

        </div>


        {/* ===================================================
            GUARDAR
            =================================================== */}

        <div className="pedido-edicion-actions">

          <button
            type="submit"

            disabled={
              actualizandoPedido
            }
          >
            {
              actualizandoPedido
                ? 'Actualizando pedido...'
                : 'Actualizar pedido'
            }
          </button>

        </div>

      </form>

    </div>
  );
}


export default EditarPedido;

<<<END OF FILE>>>


---

## FILE: src\pages\pedidos\PedidoDetalle.tsx

<<<START OF FILE>>>

import {
  useEffect,
  useState
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';


function PedidoDetalle() {
  const {
    pedido_id
  } = useParams();


  const [
    pedido,
    setPedido
  ] = useState<any | null>(
    null
  );


  const [
    feedback,
    setFeedback
  ] = useState({
    tipo:
      'info' as
        | 'success'
        | 'error'
        | 'info',

    mensaje: ''
  });


  /* =========================================================
     CARGAR PEDIDO
     ========================================================= */

  const cargarPedido =
    async () => {
      const data =
        await apiFetch(
          `/pedidos/${pedido_id}`
        );


      setPedido(
        data.pedido
      );
    };


  useEffect(() => {
    const iniciar =
      async () => {
        try {
          await cargarPedido();

        } catch (
          error: any
        ) {
          setFeedback({
            tipo: 'error',

            mensaje:
              error.message
          });
        }
      };


    iniciar();

  }, [
    pedido_id
  ]);


  /* =========================================================
     ESTADO DEL PEDIDO
     ========================================================= */

  const claseEstadoPedido = (
    estado: string
  ) => {
    if (
      estado === 'ENTREGADO'
    ) {
      return (
        'estado-pill estado-entregado'
      );
    }


    if (
      estado === 'PARCIAL'
    ) {
      return (
        'estado-pill estado-parcial'
      );
    }


    if (
      estado === 'CANCELADO'
    ) {
      return (
        'estado-pill estado-cancelado'
      );
    }


    return (
      'estado-pill estado-registrado'
    );
  };


  /* =========================================================
     ESTADO DE PRODUCTO
     ========================================================= */

  const claseEstadoEntrega = (
    estado: string
  ) => {
    if (
      estado === 'COMPLETO'
    ) {
      return (
        'estado estado-completo'
      );
    }


    if (
      estado === 'PARCIAL'
    ) {
      return (
        'estado estado-parcial'
      );
    }


    return (
      'estado estado-pendiente'
    );
  };


  /* =========================================================
     REGLA DE EDICIÓN
     ========================================================= */

  const puedeEditarPedido = (
    estado: string
  ) => {
    return (
      estado === 'REGISTRADO' ||
      estado === 'PARCIAL'
    );
  };


  /* =========================================================
     TOTALES POR MONEDA
     ========================================================= */

  const totalesPorMoneda = () => {
    if (
      !pedido
    ) {
      return [];
    }


    const mapa =
      new Map<
        string,
        number
      >();


    pedido.detalles.forEach(
      (
        detalle: any
      ) => {
        const moneda =
          detalle.moneda_codigo;


        const subtotal =
          Number(
            detalle.subtotal ||
            0
          );


        mapa.set(
          moneda,

          (
            mapa.get(
              moneda
            ) ||
            0
          ) +
          subtotal
        );
      }
    );


    return (
      Array
        .from(
          mapa.entries()
        )
        .map(
          ([
            moneda,
            total
          ]) => ({
            moneda,
            total
          })
        )
    );
  };


  /* =========================================================
     CARGANDO
     ========================================================= */

  if (
    !pedido
  ) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={
            feedback.tipo
          }

          mensaje={
            feedback.mensaje
          }

          onClose={() =>
            setFeedback({
              ...feedback,

              mensaje: ''
            })
          }
        />


        <Link
          to="/gestion/pedidos"

          className="btn-volver"
        >
          ← Volver a pedidos
        </Link>


        <div className="pedidos-card">

          <p>
            Cargando pedido...
          </p>

        </div>

      </div>
    );
  }


  const editable =
    puedeEditarPedido(
      pedido.estado_pedido
    );


  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="pedidos-page">


      {/* =====================================================
          FEEDBACK
          ===================================================== */}

      <FeedbackToast
        tipo={
          feedback.tipo
        }

        mensaje={
          feedback.mensaje
        }

        onClose={() =>
          setFeedback({
            ...feedback,

            mensaje: ''
          })
        }
      />


      {/* =====================================================
          VOLVER
          ===================================================== */}

      <Link
        to="/gestion/pedidos"

        className="btn-volver"
      >
        ← Volver a pedidos
      </Link>


      {/* =====================================================
          CABECERA
          ===================================================== */}

      <div className="pedido-detalle-header">

        <div>

          <h1>
            Pedido #{pedido.pedido_id}
          </h1>


          <p>
            {
              pedido.razon_social
            }

            {' - '}

            {
              pedido.ruc
            }
          </p>

        </div>


        <span
          className={
            claseEstadoPedido(
              pedido.estado_pedido
            )
          }
        >
          {
            pedido.estado_pedido
          }
        </span>

      </div>


      {/* =====================================================
          ACCIONES
          ===================================================== */}

      <div className="pedidos-actions">

        {editable ? (

          <Link
            className="btn-link"

            to={
              `/gestion/pedidos/${pedido.pedido_id}/editar`
            }
          >
            Editar pedido
          </Link>

        ) : (

          <div className="pedido-item-aviso-entrega">

            {pedido.estado_pedido ===
            'ENTREGADO' ? (

              <>
                Este pedido está{' '}

                <strong>
                  completamente entregado
                </strong>

                {' '}y ya no puede editarse.
              </>

            ) : (

              <>
                Este pedido está{' '}

                <strong>
                  cancelado
                </strong>

                {' '}y ya no puede editarse.
              </>

            )}

          </div>

        )}

      </div>


      {/* =====================================================
          RESUMEN
          ===================================================== */}

      <div className="pedido-resumen-grid">


        <div className="resumen-card">

          <span>
            Cliente
          </span>


          <strong>
            {
              pedido.razon_social
            }
          </strong>

        </div>


        <div className="resumen-card">

          <span>
            Fecha pedido
          </span>


          <strong>
            {
              pedido.fecha_pedido
                ?.slice(
                  0,
                  10
                )
            }
          </strong>

        </div>


        <div className="resumen-card">

          <span>
            Entrega estimada
          </span>


          <strong>
            {
              pedido
                .fecha_entrega_estimada
                ?.slice(
                  0,
                  10
                ) ||
              '-'
            }
          </strong>

        </div>


        <div className="resumen-card">

          <span>
            Registrado por
          </span>


          <strong>
            {
              pedido.registrado_por
            }
          </strong>

        </div>

      </div>


      {/* =====================================================
          DESCRIPCIÓN
          ===================================================== */}

      <div className="descripcion-card">

        <strong>
          Descripción del pedido:
        </strong>


        <p>
          {
            pedido.descripcion_pedido ||
            'Sin descripción'
          }
        </p>

      </div>


      {/* =====================================================
          TOTALES
          ===================================================== */}

      <div className="tabla-card">

        <h3>
          Totales por moneda
        </h3>


        <div className="tabla-responsive">

          <table>

            <thead>

              <tr>

                <th>
                  Moneda
                </th>

                <th>
                  Total
                </th>

              </tr>

            </thead>


            <tbody>

              {
                totalesPorMoneda()
                  .map(
                    (
                      item
                    ) => (

                      <tr
                        key={
                          item.moneda
                        }
                      >

                        <td>
                          {
                            item.moneda
                          }
                        </td>


                        <td>
                          {
                            item.total
                              .toFixed(
                                2
                              )
                          }
                        </td>

                      </tr>

                    )
                  )
              }

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================================
          PRODUCTOS
          ===================================================== */}

      <div className="tabla-card">

        <h3>
          Productos del pedido
        </h3>


        <div className="tabla-responsive">

          <table>

            <thead>

              <tr>

                <th>
                  Producto
                </th>

                <th>
                  Cantidad
                </th>

                <th>
                  Entregado
                </th>

                <th>
                  Pendiente
                </th>

                <th>
                  Presentación
                </th>

                <th>
                  Precio
                </th>

                <th>
                  Subtotal
                </th>

                <th>
                  Estado entrega
                </th>

              </tr>

            </thead>


            <tbody>

              {
                pedido.detalles.map(
                  (
                    detalle: any
                  ) => (

                    <tr
                      key={
                        detalle
                          .pedido_detalle_id
                      }
                    >


                      {/* PRODUCTO */}

                      <td>

                        <strong>

                          {
                            detalle.tipo_producto
                          }

                          {' '}

                          {
                            detalle.material
                          }

                          {' '}

                          {
                            detalle.medida
                          }

                          {' '}

                          {
                            detalle.color
                          }

                        </strong>


                        <br />


                        <span className="muted">
                          {
                            detalle
                              .descripcion_item ||
                            '-'
                          }
                        </span>

                      </td>


                      {/* CANTIDAD */}

                      <td>

                        {
                          detalle
                            .cantidad_pedida
                        }

                        {' '}

                        {
                          detalle.unidad
                        }

                      </td>


                      {/* ENTREGADO */}

                      <td>

                        {
                          detalle
                            .cantidad_entregada
                        }

                        {' '}

                        {
                          detalle.unidad
                        }

                      </td>


                      {/* PENDIENTE */}

                      <td>

                        {
                          detalle
                            .cantidad_pendiente
                        }

                        {' '}

                        {
                          detalle.unidad
                        }

                      </td>


                      {/* PRESENTACIÓN */}

                      <td>

                        {
                          detalle
                            .cantidad_presentacion ||
                          '-'
                        }

                        {' '}

                        {
                          detalle
                            .unidad_presentacion ||
                          ''
                        }

                      </td>


                      {/* PRECIO */}

                      <td>

                        {
                          Number(
                            detalle
                              .precio_unitario
                          ).toFixed(
                            2
                          )
                        }

                        {' '}

                        {
                          detalle
                            .moneda_codigo
                        }

                      </td>


                      {/* SUBTOTAL */}

                      <td>

                        {
                          Number(
                            detalle.subtotal
                          ).toFixed(
                            2
                          )
                        }

                        {' '}

                        {
                          detalle
                            .moneda_codigo
                        }

                      </td>


                      {/* ESTADO */}

                      <td>

                        <span
                          className={
                            claseEstadoEntrega(
                              detalle
                                .estado_entrega
                            )
                          }
                        >
                          {
                            detalle
                              .estado_entrega
                          }
                        </span>

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================================
          HISTORIAL DE CAMBIOS
          ===================================================== */}

      <div className="tabla-card">

        <h3>
          Historial de cambios
        </h3>


        {
          pedido
            .historial_cambios
            .length === 0
            ? (

              <p>
                No hay cambios registrados.
              </p>

            )
            : (

              <div className="tabla-responsive">

                <table>

                  <thead>

                    <tr>

                      <th>
                        Tipo
                      </th>

                      <th>
                        Motivo
                      </th>

                      <th>
                        Registrado por
                      </th>

                      <th>
                        Fecha
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {
                      pedido
                        .historial_cambios
                        .map(
                          (
                            cambio: any
                          ) => (

                            <tr
                              key={
                                cambio
                                  .pedido_cambio_id
                              }
                            >

                              <td>
                                {
                                  cambio
                                    .tipo_cambio
                                }
                              </td>


                              <td>
                                {
                                  cambio
                                    .descripcion_motivo
                                }
                              </td>


                              <td>
                                {
                                  cambio
                                    .registrado_por
                                }
                              </td>


                              <td>
                                {
                                  cambio
                                    .created_at
                                    ?.slice(
                                      0,
                                      10
                                    )
                                }
                              </td>

                            </tr>

                          )
                        )
                    }

                  </tbody>

                </table>

              </div>

            )
        }

      </div>

    </div>
  );
}


export default PedidoDetalle;

<<<END OF FILE>>>


---

## FILE: src\pages\pedidos\PedidosLista.tsx

<<<START OF FILE>>>

import {
  useEffect,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';


function PedidosLista() {
  /* =========================================================
     DATOS
     ========================================================= */

  const [
    pedidos,
    setPedidos
  ] = useState<any[]>([]);


  const [
    clientes,
    setClientes
  ] = useState<any[]>([]);


  /* =========================================================
     FILTROS
     ========================================================= */

  const [
    clienteId,
    setClienteId
  ] = useState('');


  const [
    estadoPedido,
    setEstadoPedido
  ] = useState('');


  const [
    busqueda,
    setBusqueda
  ] = useState('');


  /* =========================================================
     PAGINACIÓN
     ========================================================= */

  const [
    page,
    setPage
  ] = useState(1);


  const [
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });


  /* =========================================================
     FEEDBACK
     ========================================================= */

  const [
    feedback,
    setFeedback
  ] = useState({
    tipo:
      'info' as
        | 'success'
        | 'error'
        | 'info',

    mensaje: ''
  });


  /* =========================================================
     CARGAR CLIENTES
     ========================================================= */

  const cargarClientes =
    async () => {
      const data =
        await apiFetch(
          '/clientes/select'
        );


      setClientes(
        data.clientes
      );
    };


  /* =========================================================
     CARGAR PEDIDOS
     ========================================================= */

  const cargarPedidos =
    async (
      paginaActual = page,

      clienteActual = clienteId,

      estadoActual = estadoPedido,

      busquedaActual = busqueda
    ) => {
      const params =
        new URLSearchParams();


      params.append(
        'page',
        String(
          paginaActual
        )
      );


      params.append(
        'limit',
        '10'
      );


      if (
        clienteActual
      ) {
        params.append(
          'cliente_id',
          clienteActual
        );
      }


      if (
        estadoActual
      ) {
        params.append(
          'estado_pedido',
          estadoActual
        );
      }


      if (
        busquedaActual.trim()
      ) {
        params.append(
          'q',
          busquedaActual.trim()
        );
      }


      const data =
        await apiFetch(
          `/pedidos?${params.toString()}`
        );


      setPedidos(
        data.pedidos
      );


      setPaginacion(
        data.paginacion
      );
    };


  /* =========================================================
     CARGA INICIAL
     ========================================================= */

  useEffect(() => {
    const iniciar =
      async () => {
        try {
          await cargarClientes();

          await cargarPedidos(
            1
          );

        } catch (
          error: any
        ) {
          setFeedback({
            tipo: 'error',

            mensaje:
              error.message
          });
        }
      };


    iniciar();

  }, []);


  /* =========================================================
     RECARGAR POR PAGINACIÓN / FILTROS SELECT
     ========================================================= */

  useEffect(() => {
    const cargar =
      async () => {
        try {
          await cargarPedidos(
            page
          );

        } catch (
          error: any
        ) {
          setFeedback({
            tipo: 'error',

            mensaje:
              error.message
          });
        }
      };


    cargar();

  }, [
    page,
    clienteId,
    estadoPedido
  ]);


  /* =========================================================
     BUSCAR
     ========================================================= */

  const aplicarBusqueda =
    async (
      e: FormEvent
    ) => {
      e.preventDefault();


      setPage(
        1
      );


      try {
        await cargarPedidos(
          1
        );

      } catch (
        error: any
      ) {
        setFeedback({
          tipo: 'error',

          mensaje:
            error.message
        });
      }
    };


  /* =========================================================
     LIMPIAR FILTROS
     ========================================================= */

  const limpiarFiltros =
    async () => {
      setClienteId(
        ''
      );


      setEstadoPedido(
        ''
      );


      setBusqueda(
        ''
      );


      setPage(
        1
      );


      try {
        await cargarPedidos(
          1,
          '',
          '',
          ''
        );

      } catch (
        error: any
      ) {
        setFeedback({
          tipo: 'error',

          mensaje:
            error.message
        });
      }
    };


  /* =========================================================
     CLASE DE ESTADO
     ========================================================= */

  const claseEstado = (
    estado: string
  ) => {
    if (
      estado ===
      'ENTREGADO'
    ) {
      return (
        'estado-pill estado-entregado'
      );
    }


    if (
      estado ===
      'PARCIAL'
    ) {
      return (
        'estado-pill estado-parcial'
      );
    }


    if (
      estado ===
      'CANCELADO'
    ) {
      return (
        'estado-pill estado-cancelado'
      );
    }


    return (
      'estado-pill estado-registrado'
    );
  };


  /* =========================================================
     REGLA DE EDICIÓN
     ========================================================= */

  const puedeEditarPedido = (
    estado: string
  ) => {
    return (
      estado === 'REGISTRADO' ||
      estado === 'PARCIAL'
    );
  };


  /* =========================================================
     CANTIDADES POR UNIDAD
     ========================================================= */

  const obtenerCantidadesPedido = (
    resumen:
      | string
      | null
      | undefined
  ) => {
    if (
      !resumen
    ) {
      return [];
    }


    return resumen
      .split('|')

      .filter(
        (item) =>
          item.trim() !== ''
      )

      .map(
        (item) => {
          const partes =
            item
              .trim()
              .split(' ');


          const cantidad =
            Number(
              partes[0]
            );


          const unidad =
            partes
              .slice(1)
              .join(' ');


          return {
            cantidad:
              Number.isNaN(
                cantidad
              )
                ? partes[0]
                : cantidad,

            unidad
          };
        }
      );
  };


  /* =========================================================
     FORMATO CANTIDAD
     ========================================================= */

  const formatearCantidad = (
    cantidad:
      | number
      | string
  ) => {
    if (
      typeof cantidad ===
      'string'
    ) {
      return cantidad;
    }


    return (
      cantidad.toLocaleString(
        'es-PE',
        {
          minimumFractionDigits:
            cantidad % 1 === 0
              ? 0
              : 2,

          maximumFractionDigits:
            3
        }
      )
    );
  };


  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="pedidos-page">


      {/* =====================================================
          FEEDBACK
          ===================================================== */}

      <FeedbackToast
        tipo={
          feedback.tipo
        }

        mensaje={
          feedback.mensaje
        }

        onClose={() =>
          setFeedback({
            ...feedback,

            mensaje: ''
          })
        }
      />


      {/* =====================================================
          CABECERA
          ===================================================== */}

      <div className="pedidos-header">

        <div>

          <h1>
            Pedidos totales
          </h1>


          <p>
            Consulta, filtra, revisa
            y edita los pedidos registrados.
          </p>

        </div>


        <div className="pedidos-actions">

          <Link
            className="btn-link"

            to="/gestion/pedidos/registrar"
          >
            + Registrar pedido
          </Link>

        </div>

      </div>


      {/* =====================================================
          FILTROS
          ===================================================== */}

      <form
        className="pedidos-filtros"

        onSubmit={
          aplicarBusqueda
        }
      >


        {/* CLIENTE */}

        <div>

          <label>
            Cliente
          </label>


          <select
            value={
              clienteId
            }

            onChange={(e) => {

              setClienteId(
                e.target.value
              );


              setPage(
                1
              );
            }}
          >

            <option value="">
              Todos los clientes
            </option>


            {clientes.map(
              (cliente) => (

                <option
                  key={
                    cliente.cliente_id
                  }

                  value={
                    cliente.cliente_id
                  }
                >
                  {
                    cliente.razon_social
                  }

                  {' - '}

                  {
                    cliente.ruc
                  }
                </option>

              )
            )}

          </select>

        </div>


        {/* ESTADO */}

        <div>

          <label>
            Estado
          </label>


          <select
            value={
              estadoPedido
            }

            onChange={(e) => {

              setEstadoPedido(
                e.target.value
              );


              setPage(
                1
              );
            }}
          >

            <option value="">
              Todos
            </option>

            <option value="REGISTRADO">
              Registrado
            </option>

            <option value="PARCIAL">
              Parcial
            </option>

            <option value="ENTREGADO">
              Entregado
            </option>

            <option value="CANCELADO">
              Cancelado
            </option>

          </select>

        </div>


        {/* BUSCAR */}

        <div>

          <label>
            Buscar
          </label>


          <input
            value={
              busqueda
            }

            onChange={(e) =>
              setBusqueda(
                e.target.value
              )
            }

            placeholder="Cliente, RUC, código o descripción"
          />

        </div>


        {/* ACCIONES */}

        <div className="filtros-actions">

          <button
            type="submit"
          >
            Buscar
          </button>


          <button
            type="button"

            className="btn-secondary"

            onClick={
              limpiarFiltros
            }
          >
            Limpiar
          </button>

        </div>

      </form>


      {/* =====================================================
          TABLA
          ===================================================== */}

      <div className="pedidos-card">

        <h3>
          Listado de pedidos
        </h3>


        <div className="tabla-responsive">

          <table>

            <thead>

              <tr>
                <th>ID</th>

                <th>
                  Cliente
                </th>

                <th>
                  Fecha pedido
                </th>

                <th>
                  Entrega estimada
                </th>

                <th>
                  Estado
                </th>

                <th>
                  Items
                </th>

                <th>
                  Total ref.
                </th>

                <th>
                  Cantidad / unidad
                </th>

                <th>
                  Registrado por
                </th>

                <th>
                  Acciones
                </th>
              </tr>

            </thead>


            <tbody>

              {pedidos.map(
                (pedido) => {

                  const editable =
                    puedeEditarPedido(
                      pedido.estado_pedido
                    );


                  return (
                    <tr
                      key={
                        pedido.pedido_id
                      }
                    >

                      {/* ID */}

                      <td>
                        #{pedido.pedido_id}
                      </td>


                      {/* CLIENTE */}

                      <td>

                        <strong>
                          {
                            pedido.razon_social
                          }
                        </strong>

                        <br />

                        <span className="muted">
                          {
                            pedido.ruc
                          }
                        </span>

                      </td>


                      {/* FECHA */}

                      <td>
                        {
                          pedido.fecha_pedido
                            ?.slice(
                              0,
                              10
                            )
                        }
                      </td>


                      {/* ENTREGA */}

                      <td>
                        {
                          pedido
                            .fecha_entrega_estimada
                            ?.slice(
                              0,
                              10
                            ) ||
                          '-'
                        }
                      </td>


                      {/* ESTADO */}

                      <td>

                        <span
                          className={
                            claseEstado(
                              pedido.estado_pedido
                            )
                          }
                        >
                          {
                            pedido.estado_pedido
                          }
                        </span>

                      </td>


                      {/* ITEMS */}

                      <td>
                        {
                          pedido.cantidad_items
                        }
                      </td>


                      {/* TOTAL */}

                      <td>

                        <strong>
                          {
                            Number(
                              pedido.total_referencial ||
                              0
                            ).toFixed(
                              2
                            )
                          }
                        </strong>

                      </td>


                      {/* CANTIDADES */}

                      <td>

                        <div className="cantidades-resumen">

                          {
                            obtenerCantidadesPedido(
                              pedido.resumen_cantidades
                            ).map(
                              (
                                item,
                                index
                              ) => (

                                <span
                                  key={
                                    index
                                  }

                                  className="cantidad-pill"
                                >

                                  <strong>
                                    {
                                      formatearCantidad(
                                        item.cantidad
                                      )
                                    }
                                  </strong>


                                  <small>
                                    {
                                      item.unidad
                                    }
                                  </small>

                                </span>

                              )
                            )
                          }


                          {!pedido.resumen_cantidades && (

                            <span className="muted">
                              -
                            </span>

                          )}

                        </div>

                      </td>


                      {/* USUARIO */}

                      <td>
                        {
                          pedido.registrado_por
                        }
                      </td>


                      {/* ACCIONES */}

                      <td>

                        <div className="tabla-acciones">


                          <Link
                            className="btn-link"

                            to={
                              `/gestion/pedidos/${pedido.pedido_id}`
                            }
                          >
                            Ver
                          </Link>


                          {editable ? (

                            <Link
                              className="btn-outline"

                              to={
                                `/gestion/pedidos/${pedido.pedido_id}/editar`
                              }
                            >
                              Editar
                            </Link>

                          ) : (

                            <span
                              className="muted"

                              title={
                                pedido.estado_pedido ===
                                'ENTREGADO'
                                  ? 'El pedido ya fue entregado completamente'
                                  : 'El pedido está cancelado'
                              }
                            >
                              Cerrado
                            </span>

                          )}

                        </div>

                      </td>

                    </tr>
                  );
                }
              )}


              {pedidos.length ===
                0 && (

                <tr>

                  <td
                    colSpan={
                      10
                    }
                  >
                    No hay pedidos registrados.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* ===================================================
            PAGINACIÓN
            =================================================== */}

        <div className="paginado">

          <button
            type="button"

            disabled={
              page <= 1
            }

            onClick={() =>
              setPage(
                page - 1
              )
            }
          >
            Anterior
          </button>


          <span>
            Página{' '}
            {
              paginacion.page
            }
            {' de '}
            {
              paginacion.totalPaginas ||
              1
            }
          </span>


          <button
            type="button"

            disabled={
              page >=
              paginacion.totalPaginas
            }

            onClick={() =>
              setPage(
                page + 1
              )
            }
          >
            Siguiente
          </button>

        </div>

      </div>

    </div>
  );
}


export default PedidosLista;

<<<END OF FILE>>>


---

## FILE: src\pages\pedidos\RegistrarPedido.tsx

<<<START OF FILE>>>

import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';
import PedidoItemsEditor, {
  detallePedidoVacio,
  type DetallePedidoForm
} from '../../components/pedidos/PedidoItemsEditor';

function RegistrarPedido() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [medidas, setMedidas] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [unidades, setUnidades] = useState<any[]>([]);
  const [guardando, setGuardando] = useState(false);
  const envioEnCursoRef = useRef(false);

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info' | 'warning',
    mensaje: ''
  });

  const [form, setForm] = useState({
    cliente_id: '',
    codigo_pedido: '',
    fecha_pedido: '',
    fecha_entrega_estimada: '',
    descripcion_pedido: ''
  });

  const [detalles, setDetalles] = useState<DetallePedidoForm[]>([
    { ...detallePedidoVacio }
  ]);

  const mostrarFeedback = (
    tipo: 'success' | 'error' | 'info' | 'warning',
    mensaje: string
  ) => {
    setFeedback({
      tipo,
      mensaje
    });
  };

  const cargarDatosBase = async () => {
    const [
      clientesData,
      tiposData,
      medidasData,
      coloresData,
      materialesData,
      unidadesData
    ] = await Promise.all([
      apiFetch('/clientes/select'),
      apiFetch('/catalogos/tiposProducto'),
      apiFetch('/catalogos/medidas'),
      apiFetch('/catalogos/colores'),
      apiFetch('/catalogos/materiales'),
      apiFetch('/catalogos/unidades-medida')
    ]);

    setClientes(clientesData.clientes);
    setTipos(tiposData.items);
    setMedidas(medidasData.items);
    setColores(coloresData.items);
    setMateriales(materialesData.items);
    setUnidades(unidadesData.unidades);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarDatosBase();
      } catch (error: any) {
        mostrarFeedback('error', error.message);
      }
    };

    iniciar();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validarFormulario = () => {
    if (!form.cliente_id) {
      mostrarFeedback('error', 'Debe seleccionar un cliente');
      return false;
    }

    if (!detalles || detalles.length === 0) {
      mostrarFeedback('error', 'Debe registrar al menos un producto');
      return false;
    }

    for (const [index, item] of detalles.entries()) {
      if (
        !item.tipo_producto_id ||
        !item.medida_id ||
        !item.color_id ||
        !item.material_id
      ) {
        mostrarFeedback(
          'error',
          `El producto ${index + 1} debe tener tipo, medida, color y material`
        );
        return false;
      }

      if (!item.cantidad_pedida || Number(item.cantidad_pedida) <= 0) {
        mostrarFeedback(
          'error',
          `El producto ${index + 1} debe tener cantidad mayor a 0`
        );
        return false;
      }

      if (!item.unidad_medida_id) {
        mostrarFeedback(
          'error',
          `El producto ${index + 1} debe tener unidad`
        );
        return false;
      }

      if (!item.precio_unitario || Number(item.precio_unitario) < 0) {
        mostrarFeedback(
          'error',
          `El producto ${index + 1} debe tener precio válido`
        );
        return false;
      }
    }

    return true;
  };

 const registrarPedido = async (e: FormEvent) => {
  e.preventDefault();

  // Protección inmediata contra múltiples submits
  if (envioEnCursoRef.current) {
    return;
  }

  if (!validarFormulario()) {
    return;
  }

  envioEnCursoRef.current = true;
  setGuardando(true);

  try {
    const body = {
      cliente_id: Number(form.cliente_id),
      codigo_pedido: form.codigo_pedido || null,
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
          : Number(item.unidad_medida_id),

        precio_unitario: Number(item.precio_unitario),
        moneda_codigo: item.moneda_codigo,
        descripcion_item: item.descripcion_item,
        observacion: item.observacion
      }))
    };

    const data = await apiFetch('/pedidos', {
      method: 'POST',
      body: JSON.stringify(body)
    });

    mostrarFeedback(
      'success',
      'Pedido registrado correctamente'
    );

    setTimeout(() => {
      navigate(`/gestion/pedidos/${data.pedido.pedido_id}`);
    }, 900);

  } catch (error: any) {
    mostrarFeedback(
      'error',
      error.message
    );

    // Solamente permitimos otro intento si hubo error
    envioEnCursoRef.current = false;
    setGuardando(false);
  }
};

  return (
    <div className="pedidos-page">
      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() => setFeedback({ ...feedback, mensaje: '' })}
      />

      <Link to="/gestion/pedidos" className="btn-volver">
        ← Volver a pedidos
      </Link>

      <div className="pedidos-header">
        <div>
          <h1>Registrar pedido</h1>
          <p>Registra un nuevo pedido con uno o varios productos.</p>
        </div>
      </div>

      <form className="form-card pedido-form" onSubmit={registrarPedido}>
        <h3>Datos del pedido</h3>

        <div className="pedido-datos-grid">
          <div>
            <label>Cliente</label>
            <select
              name="cliente_id"
              value={form.cliente_id}
              onChange={handleChange}
            >
              <option value="">Seleccione cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.cliente_id} value={cliente.cliente_id}>
                  {cliente.razon_social} - {cliente.ruc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Código de pedido opcional</label>
            <input
              name="codigo_pedido"
              value={form.codigo_pedido}
              onChange={handleChange}
              placeholder="Ejemplo: PED-001"
            />
          </div>

          <div>
            <label>Fecha de pedido</label>
            <input
              type="date"
              name="fecha_pedido"
              value={form.fecha_pedido}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Fecha de entrega estimada</label>
            <input
              type="date"
              name="fecha_entrega_estimada"
              value={form.fecha_entrega_estimada}
              onChange={handleChange}
            />
          </div>

          <div className="pedido-descripcion-full">
            <label>Descripción del pedido</label>
            <textarea
              name="descripcion_pedido"
              value={form.descripcion_pedido}
              onChange={handleChange}
              rows={3}
              placeholder="Ejemplo: Pedido de drizas para entrega semanal"
            />
          </div>
        </div>

        <PedidoItemsEditor
          detalles={detalles}
          setDetalles={setDetalles}
          tipos={tipos}
          medidas={medidas}
          colores={colores}
          materiales={materiales}
          unidades={unidades}
          onFeedback={mostrarFeedback}
        />

        <div className="pedido-form-actions">
          <button
          type="submit"
          disabled={guardando}
        >
          {guardando ? 'Guardando pedido...' : 'Guardar pedido'}
        </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrarPedido;

<<<END OF FILE>>>


---

## FILE: src\pages\producciones\ProduccionDetalle.tsx

<<<START OF FILE>>>

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/producciones.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function ProduccionDetalle() {
  const {
    produccion_id
  } = useParams();

  const [
    produccion,
    setProduccion
  ] = useState<any | null>(
    null
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);

        try {
          const data =
            await apiFetch(
              `/producciones/${produccion_id}`
            );

          setProduccion(
            data.produccion
          );

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    produccion_id
  ]);


  const totalProducido =
    useMemo(
      () =>
        (
          produccion?.detalles ||
          []
        ).reduce(
          (
            total: number,
            detalle: any
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
        produccion
      ]
    );


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  const fechaTexto = (
    valor: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return valor.slice(
      0,
      10
    );
  };


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando producción...
        </p>
      </div>
    );
  }


  if (!produccion) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() =>
            setFeedback({
              ...feedback,
              mensaje: ''
            })
          }
        />

        <Link
          to="/gestion/producciones"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar la producción.
        </div>

      </div>
    );
  }


  return (
    <div className="pedidos-page producciones-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <Link
        to="/gestion/producciones"
        className="btn-volver"
      >
        ← Volver a producción
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            Producción #{
              produccion.produccion_id
            }
          </h1>

          <p>
            Detalle de productos fabricados
            y materia prima consumida por FIFO.
          </p>
        </div>
      </div>


      <div className="prod-detalle-kpis">

        <div>
          <span>
            Fecha
          </span>

          <strong>
            {
              fechaTexto(
                produccion
                  .fecha_produccion
              )
            }
          </strong>
        </div>


        <div>
          <span>
            Productos
          </span>

          <strong>
            {
              produccion
                .detalles
                .length
            }
          </strong>
        </div>


        <div>
          <span>
            Total producido
          </span>

          <strong>
            {
              totalProducido
                .toFixed(3)
            } KG
          </strong>
        </div>


        <div>
          <span>
            Registrado por
          </span>

          <strong>
            {
              produccion
                .registrado_por
            }
          </strong>
        </div>

      </div>


      {
        produccion.observacion &&
        (
          <div className="prod-observacion-general">
            {
              produccion.observacion
            }
          </div>
        )
      }


      <div className="prod-detalles-lista">

        {
          produccion
            .detalles
            .map(
              (
                item: any,
                index: number
              ) => (
                <article
                  className="prod-detalle-card"
                  key={
                    item
                      .produccion_detalle_id
                  }
                >

                  <div className="prod-detalle-card-header">

                    <div>
                      <span className="prod-detalle-numero">
                        Producto {
                          index + 1
                        }
                      </span>

                      <h3>
                        {
                          item.tipo_producto
                        }
                        {' · '}
                        {
                          item.material
                        }
                        {' · '}
                        {
                          item.medida
                        }
                        {' · '}
                        {
                          item.color
                        }
                      </h3>
                    </div>


                    <span className="prod-version-badge">
                      Composición V{
                        item
                          .composicion_version
                      }
                    </span>

                  </div>


                  <div className="prod-detalle-resumen">

                    <div>
                      <span>
                        Producido
                      </span>

                      <strong>
                        {
                          cantidad(
                            item
                              .cantidad_producida
                          )
                        } {
                          item.unidad
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Presentación
                      </span>

                      <strong>
                        {
                          cantidad(
                            item
                              .cantidad_presentacion
                          )
                        } {
                          item
                            .unidad_presentacion
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Presentaciones
                      </span>

                      <strong>
                        {
                          (
                            Number(
                              item
                                .cantidad_producida
                            ) /
                            Number(
                              item
                                .cantidad_presentacion
                            )
                          )
                            .toFixed(2)
                        }
                      </strong>
                    </div>


                    <div>
                      <span>
                        Stock PT después
                      </span>

                      <strong className="prod-stock-positivo">
                        {
                          item
                            .ingreso_producto_terminado
                            ? cantidad(
                                item
                                  .ingreso_producto_terminado
                                  .stock_actual
                              )
                            : '0.000'
                        } {
                          item.unidad
                        }
                      </strong>
                    </div>

                  </div>


                  {
                    item.observacion &&
                    (
                      <div className="prod-item-observacion">
                        {
                          item.observacion
                        }
                      </div>
                    )
                  }


                  <details className="prod-fifo-details">

                    <summary>
                      Ver consumo FIFO de materia prima
                    </summary>


                    <div className="prod-fifo-contenido">

                      <div className="prod-fifo-titulo">
                        <h4>
                          Lotes utilizados
                        </h4>

                        <span>
                          {
                            item
                              .consumos_materia_prima
                              .length
                          } movimiento(s)
                        </span>
                      </div>


                      <div className="tabla-scroll">

                        <table>
                          <thead>
                            <tr>
                              <th>
                                Lote
                              </th>
                              <th>
                                Fecha compra
                              </th>
                              <th>
                                Material
                              </th>
                              <th>
                                Color
                              </th>
                              <th>
                                Consumido
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {
                              item
                                .consumos_materia_prima
                                .map(
                                  (
                                    consumo: any
                                  ) => (
                                    <tr
                                      key={
                                        consumo
                                          .movimiento_materia_prima_id
                                      }
                                    >
                                      <td>
                                        <strong>
                                          {
                                            consumo
                                              .nombre_lote
                                          }
                                        </strong>
                                      </td>

                                      <td>
                                        {
                                          fechaTexto(
                                            consumo
                                              .fecha_compra
                                          )
                                        }
                                      </td>

                                      <td>
                                        {
                                          consumo.material
                                        }
                                      </td>

                                      <td>
                                        {
                                          consumo.color
                                        }
                                      </td>

                                      <td>
                                        <strong className="prod-consumo-negativo">
                                          -{
                                            cantidad(
                                              consumo
                                                .cantidad
                                            )
                                          } KG
                                        </strong>
                                      </td>
                                    </tr>
                                  )
                                )
                            }

                            {
                              item
                                .consumos_materia_prima
                                .length ===
                                0 &&
                              (
                                <tr>
                                  <td colSpan={5}>
                                    No se encontraron movimientos FIFO.
                                  </td>
                                </tr>
                              )
                            }
                          </tbody>
                        </table>

                      </div>

                    </div>

                  </details>

                </article>
              )
            )
        }

      </div>

    </div>
  );
}


export default ProduccionDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\producciones\ProduccionesLista.tsx

<<<START OF FILE>>>

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/producciones.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function ProduccionesLista() {
  const [
    producciones,
    setProducciones
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
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });


  const cargarProducciones =
    useCallback(
      async (
        pagina: number
      ) => {
        const data =
          await apiFetch(
            `/producciones?page=${pagina}&limit=10`
          );

        setProducciones(
          data.producciones || []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);

        try {
          await cargarProducciones(
            page
          );

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    page,
    cargarProducciones
  ]);


  const fechaTexto = (
    valor: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return valor.slice(
      0,
      10
    );
  };


  const cantidad = (
    valor: any
  ) => {
    return Number(
      valor || 0
    ).toFixed(3);
  };


  return (
    <div className="pedidos-page producciones-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <div className="pedidos-header producciones-header">
        <div>
          <h1>
            Producción
          </h1>

          <p>
            Registra el producto fabricado y consulta
            el consumo de materia prima realizado por FIFO.
          </p>
        </div>

        <Link
          to="/gestion/producciones/registrar"
          className="btn-primary-link"
        >
          + Registrar producción
        </Link>
      </div>


      <div className="tabla-card">

        <div className="prod-tabla-cabecera">
          <div>
            <h3>
              Producciones registradas
            </h3>

            <p>
              Historial de ingresos al almacén
              de producto terminado.
            </p>
          </div>

          <span className="muted">
            {
              paginacion.total
            } producción(es)
          </span>
        </div>


        {
          cargando
            ? (
              <p>
                Cargando producciones...
              </p>
            )
            : (
              <>
                <div className="tabla-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          Producción
                        </th>
                        <th>
                          Fecha
                        </th>
                        <th>
                          Productos
                        </th>
                        <th>
                          Total producido
                        </th>
                        <th>
                          Observación
                        </th>
                        <th>
                          Registrado por
                        </th>
                        <th>
                          Acción
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        producciones.map(
                          (produccion) => (
                            <tr
                              key={
                                produccion
                                  .produccion_id
                              }
                            >
                              <td>
                                <strong>
                                  #{
                                    produccion
                                      .produccion_id
                                  }
                                </strong>
                              </td>

                              <td>
                                {
                                  fechaTexto(
                                    produccion
                                      .fecha_produccion
                                  )
                                }
                              </td>

                              <td>
                                {
                                  produccion
                                    .cantidad_items
                                }
                              </td>

                              <td>
                                <strong>
                                  {
                                    cantidad(
                                      produccion
                                        .total_producido_kg
                                    )
                                  } KG
                                </strong>
                              </td>

                              <td>
                                {
                                  produccion
                                    .observacion ||
                                  '-'
                                }
                              </td>

                              <td>
                                {
                                  produccion
                                    .registrado_por
                                }
                              </td>

                              <td>
                                <Link
                                  className="btn-outline"
                                  to={
                                    `/gestion/producciones/${produccion.produccion_id}`
                                  }
                                >
                                  Ver detalle
                                </Link>
                              </td>
                            </tr>
                          )
                        )
                      }

                      {
                        producciones.length === 0 &&
                        (
                          <tr>
                            <td colSpan={7}>
                              Todavía no hay producciones registradas.
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>


                <div className="paginado">

                  <button
                    type="button"
                    disabled={
                      page <= 1
                    }
                    onClick={() =>
                      setPage(
                        page - 1
                      )
                    }
                  >
                    Anterior
                  </button>

                  <span>
                    Página {
                      paginacion.page
                    } de {
                      paginacion
                        .totalPaginas ||
                      1
                    }
                  </span>

                  <button
                    type="button"
                    disabled={
                      page >=
                      paginacion
                        .totalPaginas
                    }
                    onClick={() =>
                      setPage(
                        page + 1
                      )
                    }
                  >
                    Siguiente
                  </button>

                </div>
              </>
            )
        }

      </div>

    </div>
  );
}


export default ProduccionesLista;


<<<END OF FILE>>>


---

## FILE: src\pages\producciones\RegistrarProduccion.tsx

<<<START OF FILE>>>

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import ConfirmDialog
  from '../../components/common/ConfirmDialog';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import '../../styles/producciones.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


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


type DetalleProduccionForm = {
  local_id: string;

  tipo_producto_id: string;
  material_id: string;
  medida_id: string;
  color_id: string;

  opciones: OpcionesProducto;

  producto: any | null;
  buscandoProducto: boolean;

  cantidad_producida: string;
  cantidad_presentacion: string;
  observacion: string;
};


const fechaLocalActual = () => {
  const hoy =
    new Date();

  const anio =
    hoy.getFullYear();

  const mes =
    String(
      hoy.getMonth() + 1
    ).padStart(
      2,
      '0'
    );

  const dia =
    String(
      hoy.getDate()
    ).padStart(
      2,
      '0'
    );

  return `${anio}-${mes}-${dia}`;
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
  tipos: Opcion[]
): DetalleProduccionForm => ({
  local_id:
    nuevoLocalId(),

  tipo_producto_id: '',
  material_id: '',
  medida_id: '',
  color_id: '',

  opciones: {
    tipos,
    materiales: [],
    medidas: [],
    colores: []
  },

  producto: null,
  buscandoProducto: false,

  cantidad_producida: '',
  cantidad_presentacion: '',
  observacion: ''
});


function RegistrarProduccion() {
  const navigate =
    useNavigate();

  const [
    fechaProduccion,
    setFechaProduccion
  ] = useState(
    fechaLocalActual()
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
  ] = useState<number | null>(
    null
  );

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
    confirmando,
    setConfirmando
  ] = useState(false);

  const [
    idempotencyKey,
    setIdempotencyKey
  ] = useState(
    nuevaKey()
  );

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });

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
              unidadKg.unidad_medida_id
            )
          );

          setDetalles([
            crearDetalle(
              tipos
            )
          ]);

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargandoInicial(
            false
          );
        }
      };

    cargar();
  }, []);


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


  const cargarOpciones = async (
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

    return await apiFetch(
      `/productos-terminados/opciones?${query.toString()}`
    );
  };


  const cambiarTipo = async (
    index: number,
    valor: string
  ) => {
    actualizarDetalle(
      index,
      {
        tipo_producto_id:
          valor,
        material_id: '',
        medida_id: '',
        color_id: '',
        producto: null,
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
            valor
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

    } catch (error: any) {
      actualizarDetalle(
        index,
        {
          buscandoProducto:
            false
        }
      );

      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };


  const cambiarMaterial =
    async (
      index: number,
      valor: string
    ) => {
      const detalle =
        detalles[index];

      actualizarDetalle(
        index,
        {
          material_id:
            valor,
          medida_id: '',
          color_id: '',
          producto: null,
          buscandoProducto:
            Boolean(valor),
          opciones: {
            ...detalle.opciones,
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
              detalle
                .tipo_producto_id,
            material_id:
              valor
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

      } catch (error: any) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false
          }
        );

        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };


  const cambiarMedida =
    async (
      index: number,
      valor: string
    ) => {
      const detalle =
        detalles[index];

      actualizarDetalle(
        index,
        {
          medida_id:
            valor,
          color_id: '',
          producto: null,
          buscandoProducto:
            Boolean(valor),
          opciones: {
            ...detalle.opciones,
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
              detalle
                .tipo_producto_id,
            material_id:
              detalle.material_id,
            medida_id:
              valor
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

      } catch (error: any) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false
          }
        );

        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };


  const cambiarColor =
    async (
      index: number,
      valor: string
    ) => {
      const detalle =
        detalles[index];

      actualizarDetalle(
        index,
        {
          color_id:
            valor,
          producto: null,
          buscandoProducto:
            Boolean(valor)
        }
      );

      if (!valor) {
        return;
      }

      try {
        const opcionesData =
          await cargarOpciones({
            tipo_producto_id:
              detalle
                .tipo_producto_id,
            material_id:
              detalle.material_id,
            medida_id:
              detalle.medida_id,
            color_id:
              valor
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
              producto: null
            }
          );

          setFeedback({
            tipo: 'warning',
            mensaje:
              'No existe un producto terminado con esa selección'
          });

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

      } catch (error: any) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,
            producto: null
          }
        );

        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };


  const agregarProducto = () => {
    if (procesando) {
      return;
    }

    setDetalles([
      ...detalles,
      crearDetalle(
        tiposBase
      )
    ]);
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
      detalles.length === 1
    ) {
      setFeedback({
        tipo: 'warning',
        mensaje:
          'La producción debe tener al menos un producto'
      });

      return;
    }

    setDetalles(
      detalles.filter(
        (_, i) =>
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
    if (!fechaProduccion) {
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
          `El producto ${i + 1} no está completamente seleccionado`
        );
      }

      if (
        !detalle.producto
          .composicion_vigente
      ) {
        return (
          `El producto ${i + 1} no tiene composición definida`
        );
      }

      const cantidad =
        Number(
          detalle
            .cantidad_producida
        );

      const presentacion =
        Number(
          detalle
            .cantidad_presentacion
        );

      if (
        !Number.isFinite(
          cantidad
        ) ||
        cantidad <= 0
      ) {
        return (
          `La cantidad producida del producto ${i + 1} debe ser mayor a 0`
        );
      }

      if (
        !Number.isFinite(
          presentacion
        ) ||
        presentacion <= 0
      ) {
        return (
          `La presentación del producto ${i + 1} debe ser mayor a 0`
        );
      }

      const cantidadMil =
        Math.round(
          cantidad * 1000
        );

      const presentacionMil =
        Math.round(
          presentacion * 1000
        );

      if (
        presentacionMil <= 0 ||
        cantidadMil %
          presentacionMil !==
          0
      ) {
        return (
          `La cantidad producida del producto ${i + 1} debe ser múltiplo de su presentación`
        );
      }
    }

    return null;
  };


  const solicitarRegistro = (
    e: FormEvent
  ) => {
    e.preventDefault();

    const error =
      validar();

    if (error) {
      setFeedback({
        tipo: 'error',
        mensaje: error
      });

      return;
    }

    setConfirmando(
      true
    );
  };


  const registrar = async () => {
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
                  fechaProduccion,

                observacion:
                  observacion
                    .trim() ||
                  null,

                detalles:
                  detalles.map(
                    (detalle) => ({
                      producto_id:
                        Number(
                          detalle
                            .producto
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

      setConfirmando(
        false
      );

      setFeedback({
        tipo: 'success',
        mensaje:
          data.reutilizada
            ? 'La producción ya había sido registrada. Se recuperó el resultado existente sin duplicar stock.'
            : 'Producción registrada correctamente.'
      });

      setIdempotencyKey(
        nuevaKey()
      );

      setTimeout(() => {
        navigate(
          `/gestion/producciones/${data.produccion.produccion_id}`
        );
      }, 800);

    } catch (error: any) {
      liberar();

      setConfirmando(
        false
      );

      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };


  return (
    <div className="pedidos-page producciones-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <ConfirmDialog
        abierto={confirmando}
        titulo="Registrar producción"
        descripcion={
          `Se registrarán ${detalles.length} producto(s) por un total de ${totalProducido.toFixed(3)} KG. La operación descontará materia prima por FIFO e ingresará el producto terminado al almacén. ¿Deseas continuar?`
        }
        textoConfirmar="Registrar producción"
        textoProcesando="Registrando..."
        procesando={procesando}
        onConfirmar={registrar}
        onCerrar={() =>
          !procesando &&
          setConfirmando(
            false
          )
        }
      />


      <Link
        to="/gestion/producciones"
        className="btn-volver"
      >
        ← Volver a producción
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            Registrar producción
          </h1>

          <p>
            Selecciona los productos fabricados.
            El sistema descontará automáticamente
            la materia prima por FIFO.
          </p>
        </div>
      </div>


      <form
        className="prod-form"
        onSubmit={
          solicitarRegistro
        }
      >

        <section className="prod-seccion">

          <div className="prod-seccion-header">
            <div>
              <h3>
                Datos de producción
              </h3>

              <p>
                Información general del registro.
              </p>
            </div>
          </div>


          <div className="prod-cabecera-grid">

            <div>
              <label>
                Fecha de producción
              </label>

              <input
                type="date"
                value={
                  fechaProduccion
                }
                onChange={(e) =>
                  setFechaProduccion(
                    e.target.value
                  )
                }
                disabled={
                  procesando
                }
              />
            </div>


            <div className="prod-campo-ancho">
              <label>
                Observación
              </label>

              <textarea
                value={
                  observacion
                }
                onChange={(e) =>
                  setObservacion(
                    e.target.value
                  )
                }
                rows={3}
                placeholder="Observación general de la producción"
                disabled={
                  procesando
                }
              />
            </div>

          </div>

        </section>


        <section className="prod-seccion">

          <div className="prod-seccion-header">
            <div>
              <h3>
                Productos fabricados
              </h3>

              <p>
                Selecciona el producto fabricado.
                La composición se carga automáticamente.
              </p>
            </div>

            <button
              type="button"
              onClick={
                agregarProducto
              }
              disabled={
                procesando ||
                cargandoInicial
              }
            >
              + Agregar producto
            </button>
          </div>


          <div className="prod-items">

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

                  return (
                    <article
                      key={
                        detalle.local_id
                      }
                      className="prod-item-card"
                    >

                      <div className="prod-item-header">
                        <div>
                          <strong>
                            Producto {
                              index + 1
                            }
                          </strong>

                          <span>
                            Tipo, material, medida y color
                          </span>
                        </div>

                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() =>
                            quitarProducto(
                              index
                            )
                          }
                          disabled={
                            procesando
                          }
                        >
                          Quitar
                        </button>
                      </div>


                      <div className="prod-producto-grid">

                        <div>
                          <label>
                            Tipo
                          </label>

                          <select
                            value={
                              detalle
                                .tipo_producto_id
                            }
                            onChange={(e) =>
                              cambiarTipo(
                                index,
                                e.target.value
                              )
                            }
                            disabled={
                              procesando ||
                              cargandoInicial
                            }
                          >
                            <option value="">
                              Seleccione
                            </option>

                            {
                              detalle
                                .opciones
                                .tipos
                                .map(
                                  (opcion) => (
                                    <option
                                      key={
                                        opcion.id
                                      }
                                      value={
                                        opcion.id
                                      }
                                    >
                                      {
                                        opcion.nombre
                                      }
                                    </option>
                                  )
                                )
                            }
                          </select>
                        </div>


                        <div>
                          <label>
                            Material
                          </label>

                          <select
                            value={
                              detalle
                                .material_id
                            }
                            onChange={(e) =>
                              cambiarMaterial(
                                index,
                                e.target.value
                              )
                            }
                            disabled={
                              procesando ||
                              !detalle
                                .tipo_producto_id ||
                              detalle
                                .buscandoProducto
                            }
                          >
                            <option value="">
                              Seleccione
                            </option>

                            {
                              detalle
                                .opciones
                                .materiales
                                .map(
                                  (opcion) => (
                                    <option
                                      key={
                                        opcion.id
                                      }
                                      value={
                                        opcion.id
                                      }
                                    >
                                      {
                                        opcion.nombre
                                      }
                                    </option>
                                  )
                                )
                            }
                          </select>
                        </div>


                        <div>
                          <label>
                            Medida
                          </label>

                          <select
                            value={
                              detalle
                                .medida_id
                            }
                            onChange={(e) =>
                              cambiarMedida(
                                index,
                                e.target.value
                              )
                            }
                            disabled={
                              procesando ||
                              !detalle
                                .material_id ||
                              detalle
                                .buscandoProducto
                            }
                          >
                            <option value="">
                              Seleccione
                            </option>

                            {
                              detalle
                                .opciones
                                .medidas
                                .map(
                                  (opcion) => (
                                    <option
                                      key={
                                        opcion.id
                                      }
                                      value={
                                        opcion.id
                                      }
                                    >
                                      {
                                        opcion.nombre
                                      }
                                    </option>
                                  )
                                )
                            }
                          </select>
                        </div>


                        <div>
                          <label>
                            Color
                          </label>

                          <select
                            value={
                              detalle
                                .color_id
                            }
                            onChange={(e) =>
                              cambiarColor(
                                index,
                                e.target.value
                              )
                            }
                            disabled={
                              procesando ||
                              !detalle
                                .medida_id ||
                              detalle
                                .buscandoProducto
                            }
                          >
                            <option value="">
                              Seleccione
                            </option>

                            {
                              detalle
                                .opciones
                                .colores
                                .map(
                                  (opcion) => (
                                    <option
                                      key={
                                        opcion.id
                                      }
                                      value={
                                        opcion.id
                                      }
                                    >
                                      {
                                        opcion.nombre
                                      }
                                    </option>
                                  )
                                )
                            }
                          </select>
                        </div>

                      </div>


                      {
                        detalle.buscandoProducto &&
                        (
                          <div className="prod-producto-estado">
                            Consultando producto...
                          </div>
                        )
                      }


                      {
                        detalle.producto &&
                        !composicion &&
                        (
                          <div className="prod-alerta prod-alerta-warning">
                            Este producto existe, pero todavía no tiene
                            composición definida. No se puede producir.
                          </div>
                        )
                      }


                      {
                        composicion &&
                        (
                          <div className="prod-composicion-preview">

                            <div className="prod-composicion-titulo">
                              <div>
                                <strong>
                                  Composición vigente
                                </strong>

                                <span>
                                  Versión {
                                    composicion
                                      .version_numero
                                  }
                                </span>
                              </div>

                              <span className="prod-badge-ok">
                                Lista para producir
                              </span>
                            </div>


                            <div className="prod-receta-grid">

                              {
                                composicion
                                  .detalles
                                  .map(
                                    (
                                      componente: any
                                    ) => {
                                      const requerido =
                                        cantidadProducida >
                                        0
                                          ? cantidadProducida *
                                            Number(
                                              componente
                                                .porcentaje
                                            ) /
                                            100
                                          : 0;

                                      return (
                                        <div
                                          key={
                                            componente
                                              .producto_composicion_detalle_id
                                          }
                                          className="prod-receta-item"
                                        >
                                          <div>
                                            <strong>
                                              {
                                                componente
                                                  .material
                                              }
                                            </strong>

                                            <span>
                                              {
                                                componente
                                                  .color
                                              }
                                            </span>
                                          </div>

                                          <div className="prod-receta-cantidad">
                                            <strong>
                                              {
                                                Number(
                                                  componente
                                                    .porcentaje
                                                )
                                                  .toFixed(
                                                    2
                                                  )
                                              }%
                                            </strong>

                                            {
                                              cantidadProducida >
                                                0 &&
                                              (
                                                <small>
                                                  {
                                                    requerido
                                                      .toFixed(
                                                        3
                                                      )
                                                  } KG
                                                </small>
                                              )
                                            }
                                          </div>
                                        </div>
                                      );
                                    }
                                  )
                              }

                            </div>

                          </div>
                        )
                      }


                      <div className="prod-cantidades-grid">

                        <div>
                          <label>
                            Cantidad producida
                          </label>

                          <div className="prod-input-unidad">
                            <input
                              type="number"
                              value={
                                detalle
                                  .cantidad_producida
                              }
                              onChange={(e) =>
                                actualizarDetalle(
                                  index,
                                  {
                                    cantidad_producida:
                                      e.target.value
                                  }
                                )
                              }
                              min="0.001"
                              step="0.001"
                              placeholder="0.000"
                              disabled={
                                procesando
                              }
                            />

                            <span>
                              KG
                            </span>
                          </div>
                        </div>


                        <div>
                          <label>
                            Presentación
                          </label>

                          <div className="prod-input-unidad">
                            <input
                              type="number"
                              value={
                                detalle
                                  .cantidad_presentacion
                              }
                              onChange={(e) =>
                                actualizarDetalle(
                                  index,
                                  {
                                    cantidad_presentacion:
                                      e.target.value
                                  }
                                )
                              }
                              min="0.001"
                              step="0.001"
                              placeholder="Ej. 50"
                              disabled={
                                procesando
                              }
                            />

                            <span>
                              KG
                            </span>
                          </div>

                          {
                            Number(
                              detalle
                                .cantidad_producida ||
                              0
                            ) > 0 &&
                            Number(
                              detalle
                                .cantidad_presentacion ||
                              0
                            ) > 0 &&
                            (
                              <small className="prod-presentaciones-info">
                                {
                                  (
                                    Number(
                                      detalle
                                        .cantidad_producida
                                    ) /
                                    Number(
                                      detalle
                                        .cantidad_presentacion
                                    )
                                  )
                                    .toFixed(
                                      2
                                    )
                                } presentación(es)
                              </small>
                            )
                          }
                        </div>


                        <div className="prod-campo-ancho">
                          <label>
                            Observación del producto
                          </label>

                          <input
                            value={
                              detalle
                                .observacion
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
                            placeholder="Opcional"
                            disabled={
                              procesando
                            }
                          />
                        </div>

                      </div>

                    </article>
                  );
                }
              )
            }

          </div>

        </section>


        <div className="prod-total">

          <div>
            <span>
              Total de la producción
            </span>

            <small>
              {
                detalles.length
              } producto(s)
            </small>
          </div>

          <strong>
            {
              totalProducido
                .toFixed(3)
            } KG
          </strong>

        </div>


        <div className="prod-form-actions">

          <Link
            to="/gestion/producciones"
            className="btn-secondary-link"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={
              procesando ||
              cargandoInicial
            }
          >
            {
              procesando
                ? 'Registrando...'
                : 'Registrar producción'
            }
          </button>

        </div>

      </form>

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

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import type {
  FormEvent
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import '../../styles/productosTerminados.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Filtros = {
  q: string;
  tipo_producto_id: string;
  material_id: string;
  medida_id: string;
  color_id: string;
  estado_composicion: string;
};


const filtrosVacios: Filtros = {
  q: '',
  tipo_producto_id: '',
  material_id: '',
  medida_id: '',
  color_id: '',
  estado_composicion: 'TODOS'
};


function ProductosTerminadosLista() {
  const [
    productos,
    setProductos
  ] = useState<any[]>([]);

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
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    filtros,
    setFiltros
  ] = useState<Filtros>({
    ...filtrosVacios
  });

  const [
    filtrosAplicados,
    setFiltrosAplicados
  ] = useState<Filtros>({
    ...filtrosVacios
  });

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
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
          tiposData.items || []
        );

        setMateriales(
          materialesData.items || []
        );

        setMedidas(
          medidasData.items || []
        );

        setColores(
          coloresData.items || []
        );
      },
      []
    );


  const cargarProductos =
    useCallback(
      async (
        pagina: number,
        filtrosActuales: Filtros
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
          filtrosActuales
            .estado_composicion
        );

        if (
          filtrosActuales.q.trim()
        ) {
          params.set(
            'q',
            filtrosActuales.q.trim()
          );
        }

        if (
          filtrosActuales
            .tipo_producto_id
        ) {
          params.set(
            'tipo_producto_id',
            filtrosActuales
              .tipo_producto_id
          );
        }

        if (
          filtrosActuales.material_id
        ) {
          params.set(
            'material_id',
            filtrosActuales.material_id
          );
        }

        if (
          filtrosActuales.medida_id
        ) {
          params.set(
            'medida_id',
            filtrosActuales.medida_id
          );
        }

        if (
          filtrosActuales.color_id
        ) {
          params.set(
            'color_id',
            filtrosActuales.color_id
          );
        }

        const data =
          await apiFetch(
            `/productos-terminados?${params.toString()}`
          );

        setProductos(
          data.productos || []
        );

        setPaginacion(
          data.paginacion
        );
      },
      []
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarCatalogos(),
            cargarProductos(
              1,
              filtrosVacios
            )
          ]);

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarCatalogos,
    cargarProductos
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarProductos(
      page,
      filtrosAplicados
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    page,
    filtrosAplicados,
    cargarProductos,
    cargando
  ]);


  const aplicarFiltros = (
    e: FormEvent
  ) => {
    e.preventDefault();

    setPage(1);

    setFiltrosAplicados({
      q:
        filtros.q.trim(),
      tipo_producto_id:
        filtros.tipo_producto_id,
      material_id:
        filtros.material_id,
      medida_id:
        filtros.medida_id,
      color_id:
        filtros.color_id,
      estado_composicion:
        filtros.estado_composicion
    });
  };


  const limpiarFiltros = () => {
    setFiltros({
      ...filtrosVacios
    });

    setPage(1);

    setFiltrosAplicados({
      ...filtrosVacios
    });
  };


  return (
    <div className="pedidos-page productos-terminados-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <div className="pedidos-header productos-terminados-header">
        <div>
          <h1>
            Productos terminados
          </h1>

          <p>
            Administra los productos que se fabrican
            y define la materia prima que utiliza cada uno.
          </p>
        </div>

        <Link
          to="/gestion/productos-terminados/registrar"
          className="btn-primary-link"
        >
          + Registrar producto
        </Link>
      </div>


      <form
        className="pt-filtros"
        onSubmit={aplicarFiltros}
      >

        <div className="pt-filtro-busqueda">
          <label>
            Buscar
          </label>

          <input
            value={filtros.q}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                q: e.target.value
              })
            }
            placeholder="Tipo, material, medida o color..."
          />
        </div>


        <div>
          <label>
            Tipo
          </label>

          <select
            value={
              filtros.tipo_producto_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                tipo_producto_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todos
            </option>

            {tipos.map(
              (tipo) => (
                <option
                  key={tipo.id}
                  value={tipo.id}
                >
                  {tipo.nombre}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Material
          </label>

          <select
            value={
              filtros.material_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                material_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todos
            </option>

            {materiales.map(
              (material) => (
                <option
                  key={material.id}
                  value={material.id}
                >
                  {material.nombre}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Medida
          </label>

          <select
            value={
              filtros.medida_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                medida_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todas
            </option>

            {medidas.map(
              (medida) => (
                <option
                  key={medida.id}
                  value={medida.id}
                >
                  {medida.nombre}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Color
          </label>

          <select
            value={
              filtros.color_id
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                color_id:
                  e.target.value
              })
            }
          >
            <option value="">
              Todos
            </option>

            {colores.map(
              (color) => (
                <option
                  key={color.id}
                  value={color.id}
                >
                  {color.nombre}
                </option>
              )
            )}
          </select>
        </div>


        <div>
          <label>
            Composición
          </label>

          <select
            value={
              filtros
                .estado_composicion
            }
            onChange={(e) =>
              setFiltros({
                ...filtros,
                estado_composicion:
                  e.target.value
              })
            }
          >
            <option value="TODOS">
              Todos
            </option>

            <option value="CONFIGURADO">
              Definida
            </option>

            <option value="SIN_COMPOSICION">
              Pendiente
            </option>
          </select>
        </div>


        <button type="submit">
          Buscar
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={limpiarFiltros}
        >
          Limpiar
        </button>

      </form>


      <div className="tabla-card">

        <div className="pt-tabla-cabecera">
          <div>
            <h3>
              Catálogo de productos
            </h3>

            <p>
              Cada producto se identifica por
              tipo, material, medida y color.
            </p>
          </div>

          <span className="muted">
            {
              paginacion.total
            } producto(s)
          </span>
        </div>


        {cargando ? (
          <p>
            Cargando productos...
          </p>
        ) : (
          <>
            <div className="tabla-scroll">
              <table>
                <thead>
                  <tr>
                    <th>
                      Tipo
                    </th>
                    <th>
                      Material
                    </th>
                    <th>
                      Medida
                    </th>
                    <th>
                      Color
                    </th>
                    <th>
                      Composición
                    </th>
                    <th>
                      Acción
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {productos.map(
                    (producto) => (
                      <tr
                        key={
                          producto.producto_id
                        }
                      >
                        <td>
                          <strong>
                            {
                              producto
                                .tipo_producto
                            }
                          </strong>
                        </td>

                        <td>
                          {
                            producto.material
                          }
                        </td>

                        <td>
                          {
                            producto.medida
                          }
                        </td>

                        <td>
                          {
                            producto.color
                          }
                        </td>

                        <td>
                          {
                            producto
                              .estado_composicion ===
                              'CONFIGURADO'
                              ? (
                                <div className="pt-composicion-estado">
                                  <span className="pt-badge pt-badge-ok">
                                    Definida
                                  </span>

                                  <small>
                                    Versión {
                                      producto
                                        .composicion_version
                                    }
                                  </small>
                                </div>
                              )
                              : (
                                <span className="pt-badge pt-badge-pendiente">
                                  Pendiente de definir
                                </span>
                              )
                          }
                        </td>

                        <td>
                          <Link
                            className="btn-outline"
                            to={
                              `/gestion/productos-terminados/${producto.producto_id}`
                            }
                          >
                            Ver producto
                          </Link>
                        </td>
                      </tr>
                    )
                  )}

                  {
                    productos.length === 0 &&
                    (
                      <tr>
                        <td colSpan={6}>
                          No hay productos para
                          los filtros seleccionados.
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>


            <div className="paginado">

              <button
                type="button"
                disabled={
                  page <= 1
                }
                onClick={() =>
                  setPage(
                    page - 1
                  )
                }
              >
                Anterior
              </button>

              <span>
                Página {
                  paginacion.page
                } de {
                  paginacion
                    .totalPaginas ||
                  1
                }
              </span>

              <button
                type="button"
                disabled={
                  page >=
                  paginacion.totalPaginas
                }
                onClick={() =>
                  setPage(
                    page + 1
                  )
                }
              >
                Siguiente
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  );
}


export default ProductosTerminadosLista;


<<<END OF FILE>>>


---

## FILE: src\pages\productosTerminados\ProductoTerminadoDetalle.tsx

<<<START OF FILE>>>

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import type {
  ChangeEvent,
  FormEvent
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import ConfirmDialog
  from '../../components/common/ConfirmDialog';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import '../../styles/productosTerminados.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type ComponenteForm = {
  material_id: string;
  color_id: string;
  porcentaje: string;
};


const componenteVacio:
  ComponenteForm = {
  material_id: '',
  color_id: '',
  porcentaje: ''
};


function ProductoTerminadoDetalle() {
  const {
    producto_id
  } = useParams();

  const [
    producto,
    setProducto
  ] = useState<any | null>(
    null
  );

  const [
    composiciones,
    setComposiciones
  ] = useState<any[]>([]);

  const [
    paginacion,
    setPaginacion
  ] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 0
  });

  const [
    pageHistorial,
    setPageHistorial
  ] = useState(1);

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    editorAbierto,
    setEditorAbierto
  ] = useState(false);

  const [
    observacion,
    setObservacion
  ] = useState('');

  const [
    componentes,
    setComponentes
  ] = useState<
    ComponenteForm[]
  >([
    {
      ...componenteVacio
    }
  ]);

  const [
    confirmarPublicacion,
    setConfirmarPublicacion
  ] = useState(false);

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
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


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);

        try {
          await Promise.all([
            cargarProducto(),
            cargarHistorial(1),
            cargarCatalogos()
          ]);

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarProducto,
    cargarHistorial,
    cargarCatalogos
  ]);


  useEffect(() => {
    if (cargando) {
      return;
    }

    cargarHistorial(
      pageHistorial
    ).catch(
      (error: any) => {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    );
  }, [
    pageHistorial,
    cargarHistorial,
    cargando
  ]);


  const totalPorcentaje =
    useMemo(
      () =>
        Number(
          componentes
            .reduce(
              (
                total,
                componente
              ) =>
                total +
                Number(
                  componente
                    .porcentaje ||
                  0
                ),
              0
            )
            .toFixed(6)
        ),
      [
        componentes
      ]
    );


  const actualizarComponente = (
    index: number,
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {
    if (procesando) {
      return;
    }

    const nuevos = [
      ...componentes
    ];

    nuevos[index] = {
      ...nuevos[index],
      [e.target.name]:
        e.target.value
    };

    setComponentes(
      nuevos
    );
  };


  const agregarComponente = () => {
    if (procesando) {
      return;
    }

    setComponentes([
      ...componentes,
      {
        ...componenteVacio
      }
    ]);
  };


  const quitarComponente = (
    index: number
  ) => {
    if (procesando) {
      return;
    }

    if (
      componentes.length === 1
    ) {
      setFeedback({
        tipo: 'warning',
        mensaje:
          'La composición debe tener al menos una materia prima'
      });

      return;
    }

    setComponentes(
      componentes.filter(
        (_, i) =>
          i !== index
      )
    );
  };


  const abrirEditor = () => {
    setObservacion('');

    setComponentes([
      {
        ...componenteVacio
      }
    ]);

    setEditorAbierto(true);
  };


  const cerrarEditor = () => {
    if (procesando) {
      return;
    }

    setEditorAbierto(false);

    setConfirmarPublicacion(
      false
    );
  };


  const validarComposicion = () => {
    const usados =
      new Set<string>();

    for (
      let i = 0;
      i < componentes.length;
      i++
    ) {
      const componente =
        componentes[i];

      if (
        !componente.material_id
      ) {
        return (
          `La materia prima ${i + 1} debe tener material`
        );
      }

      if (
        !componente.color_id
      ) {
        return (
          `La materia prima ${i + 1} debe tener color`
        );
      }

      const porcentaje =
        Number(
          componente.porcentaje
        );

      if (
        !Number.isFinite(
          porcentaje
        ) ||
        porcentaje <= 0 ||
        porcentaje > 100
      ) {
        return (
          `El porcentaje de la materia prima ${i + 1} debe ser mayor a 0 y menor o igual a 100`
        );
      }

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

    if (
      Math.abs(
        totalPorcentaje -
        100
      ) > 0.000001
    ) {
      return (
        `La composición debe sumar 100%. Actualmente suma ${totalPorcentaje}%`
      );
    }

    return null;
  };


  const solicitarPublicacion = (
    e: FormEvent
  ) => {
    e.preventDefault();

    const error =
      validarComposicion();

    if (error) {
      setFeedback({
        tipo: 'error',
        mensaje: error
      });

      return;
    }

    setConfirmarPublicacion(
      true
    );
  };


  const publicarComposicion =
    async () => {
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
                    observacion
                      .trim() ||
                    null,

                  detalles:
                    componentes.map(
                      (componente) => ({
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

        setConfirmarPublicacion(
          false
        );

        setEditorAbierto(
          false
        );

        setFeedback({
          tipo: 'success',
          mensaje:
            `Composición versión ${data.composicion.version_numero} publicada correctamente`
        });

        await Promise.all([
          cargarProducto(),
          cargarHistorial(1)
        ]);

        setPageHistorial(1);

        liberar();

      } catch (error: any) {
        liberar();

        setConfirmarPublicacion(
          false
        );

        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };


  const fechaTexto = (
    valor: string | null
  ) => {
    if (!valor) {
      return '-';
    }

    return new Date(
      valor
    ).toLocaleString();
  };


  if (cargando) {
    return (
      <div className="pedidos-page">
        <p>
          Cargando producto...
        </p>
      </div>
    );
  }


  if (!producto) {
    return (
      <div className="pedidos-page">

        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() =>
            setFeedback({
              ...feedback,
              mensaje: ''
            })
          }
        />

        <Link
          to="/gestion/productos-terminados"
          className="btn-volver"
        >
          ← Volver
        </Link>

        <div className="tabla-card">
          No se pudo cargar el producto.
        </div>

      </div>
    );
  }


  const composicionActual =
    producto
      .composicion_vigente;


  return (
    <div className="pedidos-page productos-terminados-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <ConfirmDialog
        abierto={
          confirmarPublicacion
        }
        titulo={
          composicionActual
            ? 'Publicar nueva versión'
            : 'Publicar composición'
        }
        descripcion={
          composicionActual
            ? 'La composición actual pasará al historial y esta nueva receta será utilizada en las próximas producciones. ¿Deseas continuar?'
            : 'Esta receta quedará como la composición vigente del producto. ¿Deseas continuar?'
        }
        textoConfirmar="Publicar"
        textoProcesando="Publicando..."
        procesando={procesando}
        onConfirmar={
          publicarComposicion
        }
        onCerrar={() =>
          !procesando &&
          setConfirmarPublicacion(
            false
          )
        }
      />


      <Link
        to="/gestion/productos-terminados"
        className="btn-volver"
      >
        ← Volver a productos terminados
      </Link>


      <div className="pedidos-header pt-detalle-header">

        <div>
          <h1>
            {
              producto.tipo_producto
            }
            {' · '}
            {
              producto.material
            }
            {' · '}
            {
              producto.medida
            }
            {' · '}
            {
              producto.color
            }
          </h1>

          <p>
            Producto terminado y composición
            de materia prima.
          </p>
        </div>


        {!editorAbierto && (
          <button
            type="button"
            onClick={abrirEditor}
          >
            {
              composicionActual
                ? 'Nueva versión de composición'
                : 'Definir composición'
            }
          </button>
        )}

      </div>


      <div className="pt-identidad">

        <div>
          <span>
            Tipo
          </span>

          <strong>
            {
              producto.tipo_producto
            }
          </strong>
        </div>

        <div>
          <span>
            Material
          </span>

          <strong>
            {
              producto.material
            }
          </strong>
        </div>

        <div>
          <span>
            Medida
          </span>

          <strong>
            {
              producto.medida
            }
          </strong>
        </div>

        <div>
          <span>
            Color
          </span>

          <strong>
            {
              producto.color
            }
          </strong>
        </div>

      </div>


      {
        composicionActual
          ? (
            <div className="pt-composicion-card">

              <div className="pt-composicion-card-header">
                <div>
                  <span className="pt-badge pt-badge-ok">
                    Composición vigente
                  </span>

                  <h3>
                    Versión {
                      composicionActual
                        .version_numero
                    }
                  </h3>

                  <p>
                    Vigente desde {
                      fechaTexto(
                        composicionActual
                          .fecha_vigencia_desde
                      )
                    }
                  </p>
                </div>

                <strong className="pt-total-100">
                  100%
                </strong>
              </div>


              <div className="pt-composicion-componentes">

                {
                  composicionActual
                    .detalles
                    .map(
                      (
                        componente: any
                      ) => (
                        <div
                          className="pt-componente-vigente"
                          key={
                            componente
                              .producto_composicion_detalle_id
                          }
                        >
                          <div className="pt-componente-linea">
                            <div>
                              <strong>
                                {
                                  componente.material
                                }
                              </strong>

                              <span>
                                {
                                  componente.color
                                }
                              </span>
                            </div>

                            <strong>
                              {
                                Number(
                                  componente.porcentaje
                                )
                                  .toFixed(2)
                              }%
                            </strong>
                          </div>

                          <div className="pt-barra">
                            <div
                              className="pt-barra-progreso"
                              style={{
                                width:
                                  `${Math.min(
                                    100,
                                    Number(
                                      componente
                                        .porcentaje
                                    )
                                  )}%`
                              }}
                            />
                          </div>
                        </div>
                      )
                    )
                }

              </div>


              {
                composicionActual
                  .observacion &&
                (
                  <div className="pt-observacion">
                    {
                      composicionActual
                        .observacion
                    }
                  </div>
                )
              }

            </div>
          )
          : (
            <div className="pt-sin-composicion">

              <div className="pt-sin-composicion-icono">
                %
              </div>

              <div>
                <h3>
                  Composición pendiente
                </h3>

                <p>
                  Este producto todavía no tiene
                  definida la materia prima que consume.
                  Debes configurarla antes de registrar producción.
                </p>
              </div>

            </div>
          )
      }


      {
        editorAbierto &&
        (
          <form
            className="pt-editor-composicion"
            onSubmit={
              solicitarPublicacion
            }
          >

            <div className="pt-editor-header">

              <div>
                <h3>
                  {
                    composicionActual
                      ? 'Nueva versión de composición'
                      : 'Definir composición'
                  }
                </h3>

                <p>
                  Indica qué materias primas
                  forman el producto. El total debe ser 100%.
                </p>
              </div>


              <div
                className={
                  Math.abs(
                    totalPorcentaje -
                    100
                  ) <= 0.000001
                    ? 'pt-suma pt-suma-ok'
                    : 'pt-suma'
                }
              >
                <span>
                  Total
                </span>

                <strong>
                  {
                    totalPorcentaje
                  }%
                </strong>
              </div>

            </div>


            <div className="pt-componentes-editor">

              {
                componentes.map(
                  (
                    componente,
                    index
                  ) => (
                    <div
                      className="pt-componente-editor"
                      key={index}
                    >

                      <div className="pt-componente-numero">
                        Materia prima {
                          index + 1
                        }
                      </div>


                      <div className="pt-componente-campos">

                        <div>
                          <label>
                            Material
                          </label>

                          <select
                            name="material_id"
                            value={
                              componente
                                .material_id
                            }
                            onChange={(e) =>
                              actualizarComponente(
                                index,
                                e
                              )
                            }
                            disabled={
                              procesando
                            }
                          >
                            <option value="">
                              Seleccione
                            </option>

                            {
                              materiales.map(
                                (material) => (
                                  <option
                                    key={
                                      material.id
                                    }
                                    value={
                                      material.id
                                    }
                                  >
                                    {
                                      material.nombre
                                    }
                                  </option>
                                )
                              )
                            }
                          </select>
                        </div>


                        <div>
                          <label>
                            Color
                          </label>

                          <select
                            name="color_id"
                            value={
                              componente
                                .color_id
                            }
                            onChange={(e) =>
                              actualizarComponente(
                                index,
                                e
                              )
                            }
                            disabled={
                              procesando
                            }
                          >
                            <option value="">
                              Seleccione
                            </option>

                            {
                              colores.map(
                                (color) => (
                                  <option
                                    key={
                                      color.id
                                    }
                                    value={
                                      color.id
                                    }
                                  >
                                    {
                                      color.nombre
                                    }
                                  </option>
                                )
                              )
                            }
                          </select>
                        </div>


                        <div>
                          <label>
                            Porcentaje
                          </label>

                          <div className="pt-porcentaje-input">
                            <input
                              type="number"
                              name="porcentaje"
                              value={
                                componente
                                  .porcentaje
                              }
                              onChange={(e) =>
                                actualizarComponente(
                                  index,
                                  e
                                )
                              }
                              min="0.000001"
                              max="100"
                              step="0.000001"
                              placeholder="0"
                              disabled={
                                procesando
                              }
                            />

                            <span>
                              %
                            </span>
                          </div>
                        </div>


                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() =>
                            quitarComponente(
                              index
                            )
                          }
                          disabled={
                            procesando
                          }
                        >
                          Quitar
                        </button>

                      </div>

                    </div>
                  )
                )
              }

            </div>


            <button
              type="button"
              className="pt-agregar-componente"
              onClick={
                agregarComponente
              }
              disabled={
                procesando
              }
            >
              + Agregar materia prima
            </button>


            <div className="pt-observacion-editor">
              <label>
                Observación de esta versión
              </label>

              <textarea
                value={observacion}
                onChange={(e) =>
                  setObservacion(
                    e.target.value
                  )
                }
                rows={3}
                placeholder="Ejemplo: Ajuste de fórmula por cambio de producción"
                disabled={
                  procesando
                }
              />
            </div>


            <div className="pt-editor-actions">

              <button
                type="button"
                className="btn-secondary"
                onClick={
                  cerrarEditor
                }
                disabled={
                  procesando
                }
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={
                  procesando
                }
              >
                Revisar y publicar
              </button>

            </div>

          </form>
        )
      }


      <div className="tabla-card pt-historial">

        <div className="pt-tabla-cabecera">
          <div>
            <h3>
              Historial de composiciones
            </h3>

            <p>
              Las versiones anteriores se conservan
              para mantener la trazabilidad de producción.
            </p>
          </div>
        </div>


        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>
                  Versión
                </th>
                <th>
                  Estado
                </th>
                <th>
                  Vigente desde
                </th>
                <th>
                  Vigente hasta
                </th>
                <th>
                  Materias primas
                </th>
                <th>
                  Observación
                </th>
              </tr>
            </thead>

            <tbody>
              {
                composiciones.map(
                  (composicion) => (
                    <tr
                      key={
                        composicion
                          .producto_composicion_id
                      }
                    >
                      <td>
                        <strong>
                          V{
                            composicion
                              .version_numero
                          }
                        </strong>
                      </td>

                      <td>
                        <span
                          className={
                            composicion.vigente
                              ? 'pt-badge pt-badge-ok'
                              : 'pt-badge pt-badge-historico'
                          }
                        >
                          {
                            composicion.vigente
                              ? 'Vigente'
                              : 'Histórica'
                          }
                        </span>
                      </td>

                      <td>
                        {
                          fechaTexto(
                            composicion
                              .fecha_vigencia_desde
                          )
                        }
                      </td>

                      <td>
                        {
                          fechaTexto(
                            composicion
                              .fecha_vigencia_hasta
                          )
                        }
                      </td>

                      <td>
                        {
                          composicion
                            .cantidad_componentes
                        }
                      </td>

                      <td>
                        {
                          composicion
                            .observacion ||
                          '-'
                        }
                      </td>
                    </tr>
                  )
                )
              }

              {
                composiciones.length === 0 &&
                (
                  <tr>
                    <td colSpan={6}>
                      Este producto todavía no
                      tiene historial de composiciones.
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>


        <div className="paginado">

          <button
            type="button"
            disabled={
              pageHistorial <= 1
            }
            onClick={() =>
              setPageHistorial(
                pageHistorial - 1
              )
            }
          >
            Anterior
          </button>

          <span>
            Página {
              paginacion.page
            } de {
              paginacion
                .totalPaginas ||
              1
            }
          </span>

          <button
            type="button"
            disabled={
              pageHistorial >=
              paginacion
                .totalPaginas
            }
            onClick={() =>
              setPageHistorial(
                pageHistorial + 1
              )
            }
          >
            Siguiente
          </button>

        </div>

      </div>

    </div>
  );
}


export default ProductoTerminadoDetalle;


<<<END OF FILE>>>


---

## FILE: src\pages\productosTerminados\RegistrarProductoTerminado.tsx

<<<START OF FILE>>>

import {
  useEffect,
  useState
} from 'react';

import type {
  ChangeEvent,
  FormEvent
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import FeedbackToast
  from '../../components/common/FeedbackToast';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import '../../styles/productosTerminados.css';


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


function RegistrarProductoTerminado() {
  const navigate =
    useNavigate();

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
    cargandoCatalogos,
    setCargandoCatalogos
  ] = useState(true);

  const [
    form,
    setForm
  ] = useState({
    tipo_producto_id: '',
    material_id: '',
    medida_id: '',
    color_id: '',
    descripcion: ''
  });

  const [
    feedback,
    setFeedback
  ] = useState<{
    tipo: FeedbackTipo;
    mensaje: string;
  }>({
    tipo: 'info',
    mensaje: ''
  });

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
            tiposData.items || []
          );

          setMateriales(
            materialesData.items || []
          );

          setMedidas(
            medidasData.items || []
          );

          setColores(
            coloresData.items || []
          );

        } catch (error: any) {
          setFeedback({
            tipo: 'error',
            mensaje: error.message
          });

        } finally {
          setCargandoCatalogos(
            false
          );
        }
      };

    cargar();
  }, []);


  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };


  const registrarProducto = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (
      !intentarBloquear()
    ) {
      return;
    }

    if (
      !form.tipo_producto_id ||
      !form.material_id ||
      !form.medida_id ||
      !form.color_id
    ) {
      liberar();

      setFeedback({
        tipo: 'error',
        mensaje:
          'Tipo, material, medida y color son obligatorios'
      });

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
                    form
                      .tipo_producto_id
                  ),

                material_id:
                  Number(
                    form
                      .material_id
                  ),

                medida_id:
                  Number(
                    form
                      .medida_id
                  ),

                color_id:
                  Number(
                    form
                      .color_id
                  ),

                descripcion:
                  form.descripcion
                    .trim() ||
                  null
              })
          }
        );

      setFeedback({
        tipo: 'success',
        mensaje:
          'Producto terminado registrado correctamente'
      });

      setTimeout(() => {
        navigate(
          `/gestion/productos-terminados/${data.producto.producto_id}`
        );
      }, 700);

    } catch (error: any) {
      liberar();

      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };


  return (
    <div className="pedidos-page productos-terminados-page">

      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() =>
          setFeedback({
            ...feedback,
            mensaje: ''
          })
        }
      />


      <Link
        to="/gestion/productos-terminados"
        className="btn-volver"
      >
        ← Volver a productos terminados
      </Link>


      <div className="pedidos-header">
        <div>
          <h1>
            Registrar producto terminado
          </h1>

          <p>
            Define el producto que se fabrica.
            La presentación se registrará después
            al ingresar producción.
          </p>
        </div>
      </div>


      <form
        className="form-card pt-form-registro"
        onSubmit={registrarProducto}
      >

        <div className="pt-form-intro">
          <h3>
            Identidad del producto
          </h3>

          <p>
            Selecciona las cuatro características
            que identifican al producto terminado.
          </p>
        </div>


        <div className="pt-form-grid">

          <div>
            <label>
              Tipo de producto
            </label>

            <select
              name="tipo_producto_id"
              value={
                form.tipo_producto_id
              }
              onChange={handleChange}
              disabled={
                procesando ||
                cargandoCatalogos
              }
            >
              <option value="">
                Seleccione
              </option>

              {tipos.map(
                (tipo) => (
                  <option
                    key={tipo.id}
                    value={tipo.id}
                  >
                    {tipo.nombre}
                  </option>
                )
              )}
            </select>
          </div>


          <div>
            <label>
              Material
            </label>

            <select
              name="material_id"
              value={
                form.material_id
              }
              onChange={handleChange}
              disabled={
                procesando ||
                cargandoCatalogos
              }
            >
              <option value="">
                Seleccione
              </option>

              {materiales.map(
                (material) => (
                  <option
                    key={material.id}
                    value={material.id}
                  >
                    {material.nombre}
                  </option>
                )
              )}
            </select>
          </div>


          <div>
            <label>
              Medida
            </label>

            <select
              name="medida_id"
              value={
                form.medida_id
              }
              onChange={handleChange}
              disabled={
                procesando ||
                cargandoCatalogos
              }
            >
              <option value="">
                Seleccione
              </option>

              {medidas.map(
                (medida) => (
                  <option
                    key={medida.id}
                    value={medida.id}
                  >
                    {medida.nombre}
                  </option>
                )
              )}
            </select>
          </div>


          <div>
            <label>
              Color
            </label>

            <select
              name="color_id"
              value={
                form.color_id
              }
              onChange={handleChange}
              disabled={
                procesando ||
                cargandoCatalogos
              }
            >
              <option value="">
                Seleccione
              </option>

              {colores.map(
                (color) => (
                  <option
                    key={color.id}
                    value={color.id}
                  >
                    {color.nombre}
                  </option>
                )
              )}
            </select>
          </div>


          <div className="pt-form-ancho">
            <label>
              Descripción opcional
            </label>

            <textarea
              name="descripcion"
              value={
                form.descripcion
              }
              onChange={handleChange}
              rows={3}
              placeholder="Observación o detalle adicional del producto"
              disabled={procesando}
            />
          </div>

        </div>


        <div className="pt-form-nota">
          <strong>
            Importante:
          </strong>
          {' '}
          la composición de materias primas
          se define después de crear el producto.
        </div>


        <div className="pt-form-actions">

          <Link
            to="/gestion/productos-terminados"
            className="btn-secondary-link"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={
              procesando ||
              cargandoCatalogos
            }
          >
            {
              procesando
                ? 'Registrando...'
                : 'Registrar producto'
            }
          </button>

        </div>

      </form>

    </div>
  );
}


export default RegistrarProductoTerminado;


<<<END OF FILE>>>


---

## FILE: src\pages\Proveedores.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

function Proveedores() {
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState({
    ruc: '',
    razon_social: '',
    direccion: '',
    telefono: '',
    correo: ''
  });

  const cargarProveedores = async () => {
    const data = await apiFetch('/proveedores');
    setProveedores(data.proveedores);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarProveedores();
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registrarProveedor = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    try {
      await apiFetch('/proveedores', {
        method: 'POST',
        body: JSON.stringify(form)
      });

      setMensaje('Proveedor registrado correctamente');

      setForm({
        ruc: '',
        razon_social: '',
        direccion: '',
        telefono: '',
        correo: ''
      });

      await cargarProveedores();

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Proveedores</h1>
      <p>Registra proveedores para compras y gastos.</p>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card" onSubmit={registrarProveedor}>
        <h3>Registrar proveedor</h3>

        <label>RUC</label>
        <input
          name="ruc"
          placeholder="RUC"
          value={form.ruc}
          onChange={handleChange}
        />

        <label>Razón social</label>
        <input
          name="razon_social"
          placeholder="Razón social"
          value={form.razon_social}
          onChange={handleChange}
        />

        <label>Dirección</label>
        <input
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
        />

        <label>Teléfono</label>
        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
        />

        <label>Correo</label>
        <input
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
        />

        <button type="submit">
          Guardar proveedor
        </button>
      </form>

      <div className="tabla-card">
        <h3>Listado de proveedores</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>RUC</th>
              <th>Razón social</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
            </tr>
          </thead>

          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.proveedor_id}>
                <td>{proveedor.proveedor_id}</td>
                <td>{proveedor.ruc}</td>
                <td>{proveedor.razon_social}</td>
                <td>{proveedor.direccion || '-'}</td>
                <td>{proveedor.telefono || '-'}</td>
                <td>{proveedor.correo || '-'}</td>
              </tr>
            ))}

            {proveedores.length === 0 && (
              <tr>
                <td colSpan={6}>No hay proveedores registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Proveedores;

<<<END OF FILE>>>


---

## FILE: src\pages\usuarios\UsuariosAdmin.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';

function UsuariosAdmin() {
  const [roles, setRoles] = useState<any[]>([]);

  const [form, setForm] = useState({
    nombre_completo: '',
    correo: '',
    password: '',
    rol_id: ''
  });

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info',
    mensaje: ''
  });

  const [cargando, setCargando] = useState(false);

  const cargarRoles = async () => {
    const data = await apiFetch('/auth/roles');
    setRoles(data.roles);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarRoles();
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    iniciar();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const limpiarFormulario = () => {
    setForm({
      nombre_completo: '',
      correo: '',
      password: '',
      rol_id: ''
    });
  };

  const crearUsuario = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.nombre_completo.trim()) {
      setFeedback({
        tipo: 'error',
        mensaje: 'El nombre completo es obligatorio'
      });
      return;
    }

    if (!form.correo.trim()) {
      setFeedback({
        tipo: 'error',
        mensaje: 'El correo es obligatorio'
      });
      return;
    }

    if (!form.password.trim()) {
      setFeedback({
        tipo: 'error',
        mensaje: 'La contraseña es obligatoria'
      });
      return;
    }

    if (form.password.length < 8) {
      setFeedback({
        tipo: 'error',
        mensaje: 'La contraseña debe tener mínimo 8 caracteres'
      });
      return;
    }

    if (!form.rol_id) {
      setFeedback({
        tipo: 'error',
        mensaje: 'Debe seleccionar un rol'
      });
      return;
    }

    setCargando(true);

    try {
      await apiFetch('/auth/usuarios', {
        method: 'POST',
        body: JSON.stringify({
          nombre_completo: form.nombre_completo.trim(),
          correo: form.correo.trim().toLowerCase(),
          password: form.password,
          rol_id: Number(form.rol_id)
        })
      });

      setFeedback({
        tipo: 'success',
        mensaje: 'Usuario creado correctamente'
      });

      limpiarFormulario();
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="pedidos-page">
      <FeedbackToast
        tipo={feedback.tipo}
        mensaje={feedback.mensaje}
        onClose={() => setFeedback({ ...feedback, mensaje: '' })}
      />

      <div className="pedidos-header">
        <div>
          <h1>Crear usuarios</h1>
          <p>Esta sección solo está disponible para administradores.</p>
        </div>
      </div>

      <form className="form-card" onSubmit={crearUsuario}>
        <h3>Nuevo usuario</h3>

        <label>Nombre completo</label>
        <input
          name="nombre_completo"
          value={form.nombre_completo}
          onChange={handleChange}
          placeholder="Ejemplo: Juan Pérez"
        />

        <label>Correo</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          placeholder="usuario@driza.com"
        />

        <label>Contraseña inicial</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mínimo 8 caracteres"
        />

        <label>Rol</label>
        <select
          name="rol_id"
          value={form.rol_id}
          onChange={handleChange}
        >
          <option value="">Seleccione rol</option>
          {roles.map((rol) => (
            <option key={rol.rol_id} value={rol.rol_id}>
              {rol.nombre}
            </option>
          ))}
        </select>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Creando usuario...' : 'Crear usuario'}
        </button>
      </form>
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

