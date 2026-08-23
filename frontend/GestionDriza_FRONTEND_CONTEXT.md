# GestionDriza - Frontend Context

> Archivo generado automáticamente.
> No editar manualmente.

## Información

- Proyecto: GestionDriza
- Componente: Frontend
- Fecha de generación: 2026-08-23 14:53:31
- Branch Git: main
- Commit Git: b910c5f68611c176b67f80b23b3d8fc7e3a265c5
- Cantidad de archivos incluidos: 48

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
- src\components\pedidos\PedidoItemsEditor.tsx
- src\components\ProtectedRoute.tsx
- src\components\Sidebar.tsx
- src\hooks\useBloqueoAccion.ts
- src\index.css
- src\layouts\GestionLayout.tsx
- src\main.tsx
- src\pages\Catalogos.tsx
- src\pages\Clientes.tsx
- src\pages\clientes\ClientesLista.tsx
- src\pages\clientes\EditarCliente.tsx
- src\pages\clientes\HistorialPreciosCliente.tsx
- src\pages\clientes\RegistrarCliente.tsx
- src\pages\Compras.tsx
- src\pages\Dashboard.tsx
- src\pages\DepositoPedidoDetalle.tsx
- src\pages\Depositos.tsx
- src\pages\EntregaPedidoDetalle.tsx
- src\pages\Entregas.tsx
- src\pages\Gastos.tsx
- src\pages\Login.tsx
- src\pages\Pedidos.tsx
- src\pages\pedidos\EditarPedido.tsx
- src\pages\pedidos\PedidoDetalle.tsx
- src\pages\pedidos\PedidosLista.tsx
- src\pages\pedidos\RegistrarPedido.tsx
- src\pages\Productos.tsx
- src\pages\Proveedores.tsx
- src\pages\usuarios\UsuariosAdmin.tsx
- src\services\api.ts
- src\styles\pedidos.css
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

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './styles/pedidos.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Catalogos from './pages/Catalogos';
import PedidosLista from './pages/pedidos/PedidosLista';
import RegistrarPedido from './pages/pedidos/RegistrarPedido';
import PedidoDetalle from './pages/pedidos/PedidoDetalle';
import EditarPedido from './pages/pedidos/EditarPedido';
import Entregas from './pages/Entregas';
import EntregaPedidoDetalle from './pages/EntregaPedidoDetalle';
import Depositos from './pages/Depositos';
import DepositoPedidoDetalle from './pages/DepositoPedidoDetalle';
import Proveedores from './pages/Proveedores';
import Compras from './pages/Compras';
import Gastos from './pages/Gastos';
import ClientesLista from './pages/clientes/ClientesLista';
import RegistrarCliente from './pages/clientes/RegistrarCliente';
import EditarCliente from './pages/clientes/EditarCliente';
import HistorialPreciosCliente from './pages/clientes/HistorialPreciosCliente';
import UsuariosAdmin from './pages/usuarios/UsuariosAdmin';

import ProtectedRoute from './components/ProtectedRoute';
import GestionLayout from './layouts/GestionLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/gestion"
          element={
            <ProtectedRoute>
              <GestionLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route
            path="usuarios"
            element={
              <ProtectedRoute rolesPermitidos={['ADMIN']}>
                <UsuariosAdmin />
              </ProtectedRoute>
            }
          />

          <Route path="catalogos" element={<Catalogos />} />

          <Route path="pedidos" element={<PedidosLista />} />
          <Route path="pedidos/registrar" element={<RegistrarPedido />} />
          <Route path="pedidos/:pedido_id" element={<PedidoDetalle />} />
          <Route path="pedidos/:pedido_id/editar" element={<EditarPedido />} />

          <Route path="entregas" element={<Entregas />} />
          <Route path="entregas/:pedido_id" element={<EntregaPedidoDetalle />} />

          <Route path="depositos" element={<Depositos />} />
          <Route path="depositos/:pedido_id" element={<DepositoPedidoDetalle />} />

          <Route path="proveedores" element={<Proveedores />} />
          <Route path="compras" element={<Compras />} />
          <Route path="gastos" element={<Gastos />} />

          <Route path="clientes" element={<ClientesLista />} />
          <Route path="clientes/registrar" element={<RegistrarCliente />} />
          <Route path="clientes/precios" element={<HistorialPreciosCliente />} />
          <Route path="clientes/:cliente_id/editar" element={<EditarCliente />} />
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

## FILE: src\components\pedidos\PedidoItemsEditor.tsx

<<<START OF FILE>>>

import type { ChangeEvent } from 'react';

export type DetallePedidoForm = {
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

export const detallePedidoVacio: DetallePedidoForm = {
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

type PedidoItemsEditorProps = {
  detalles: DetallePedidoForm[];
  setDetalles: (detalles: DetallePedidoForm[]) => void;
  tipos: any[];
  medidas: any[];
  colores: any[];
  materiales: any[];
  unidades: any[];
  titulo?: string;
  textoBotonAgregar?: string;
  onFeedback?: (tipo: 'success' | 'error' | 'info' | 'warning', mensaje: string) => void;
};

function PedidoItemsEditor({
  detalles,
  setDetalles,
  tipos,
  medidas,
  colores,
  materiales,
  unidades,
  titulo = 'Productos del pedido',
  textoBotonAgregar = '+ Agregar producto',
  onFeedback
}: PedidoItemsEditorProps) {
  const handleDetalleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const nuevosDetalles = [...detalles];

    if (name === 'unidad_medida_id') {
      nuevosDetalles[index] = {
        ...nuevosDetalles[index],
        unidad_medida_id: value,
        unidad_presentacion_id: value
      };
    } else {
      nuevosDetalles[index] = {
        ...nuevosDetalles[index],
        [name]: value
      };
    }

    setDetalles(nuevosDetalles);
  };

  const agregarDetalle = () => {
    setDetalles([...detalles, { ...detallePedidoVacio }]);

    onFeedback?.(
      'success',
      'Producto agregado al pedido'
    );
  };

  const quitarDetalle = (index: number) => {
    if (detalles.length === 1) {
      onFeedback?.(
        'error',
        'Debe existir al menos un producto en el pedido'
      );
      return;
    }

    setDetalles(detalles.filter((_, i) => i !== index));

    onFeedback?.(
      'warning',
      'Producto retirado del pedido'
    );
  };

  const calcularSubtotal = (detalle: DetallePedidoForm) => {
    return Number(detalle.cantidad_pedida || 0) * Number(detalle.precio_unitario || 0);
  };

  return (
    <div className="pedido-productos-section">
      <div className="pedido-productos-header">
        <h3>{titulo}</h3>

        <button type="button" onClick={agregarDetalle}>
          {textoBotonAgregar}
        </button>
      </div>

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

          <div className="detalle-grid detalle-grid-5">
            <div>
              <label>Tipo</label>
              <select
                name="tipo_producto_id"
                value={detalle.tipo_producto_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Seleccione</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Medida</label>
              <select
                name="medida_id"
                value={detalle.medida_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Seleccione</option>
                {medidas.map((medida) => (
                  <option key={medida.id} value={medida.id}>
                    {medida.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Color</label>
              <select
                name="color_id"
                value={detalle.color_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">-</option>
                {colores.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Material</label>
              <select
                name="material_id"
                value={detalle.material_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Seleccione</option>
                {materiales.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Cantidad total</label>
              <input
                type="number"
                name="cantidad_pedida"
                value={detalle.cantidad_pedida}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="0"
              />
            </div>

            <div>
              <label>Unidad</label>
              <select
                name="unidad_medida_id"
                value={detalle.unidad_medida_id}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="">Seleccione</option>
                {unidades.map((unidad) => (
                  <option key={unidad.unidad_medida_id} value={unidad.unidad_medida_id}>
                    {unidad.codigo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Presentación</label>
              <input
                type="number"
                name="cantidad_presentacion"
                value={detalle.cantidad_presentacion}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="0"
              />
            </div>

            <div>
              <label>Unidad presentación</label>
              <select
                name="unidad_presentacion_id"
                value={detalle.unidad_presentacion_id}
                onChange={(e) => handleDetalleChange(index, e)}
                disabled
              >
                <option value="">Igual a unidad</option>
                {unidades.map((unidad) => (
                  <option key={unidad.unidad_medida_id} value={unidad.unidad_medida_id}>
                    {unidad.codigo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Precio</label>
              <input
                type="number"
                name="precio_unitario"
                value={detalle.precio_unitario}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="0.00"
              />
            </div>

            <div>
              <label>Moneda</label>
              <select
                name="moneda_codigo"
                value={detalle.moneda_codigo}
                onChange={(e) => handleDetalleChange(index, e)}
              >
                <option value="PEN">Soles</option>
                <option value="USD">Dólares</option>
              </select>
            </div>

            <div>
              <label>Subtotal</label>
              <input
                value={calcularSubtotal(detalle).toFixed(2)}
                disabled
              />
            </div>
          </div>

          <div className="detalle-textos-grid">
            <div>
              <label>Descripción del producto</label>
              <input
                name="descripcion_item"
                value={detalle.descripcion_item}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Ejemplo: DRIZA POLIESTER 1/4 BLANCO"
              />
            </div>

            <div>
              <label>Observación</label>
              <input
                name="observacion"
                value={detalle.observacion}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Observación opcional"
              />
            </div>
          </div>
        </div>
      ))}
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

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cerrarSesion, getUsuario } from '../services/api';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = getUsuario();

  const esAdmin = usuario?.roles?.includes('ADMIN');

  const pedidosActivo = location.pathname.startsWith('/gestion/pedidos');

  const [pedidosAbierto, setPedidosAbierto] = useState(pedidosActivo);

  useEffect(() => {
    if (pedidosActivo) {
      setPedidosAbierto(true);
    }
  }, [pedidosActivo]);

  const handleLogout = () => {
    cerrarSesion();
    navigate('/login');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? 'sidebar-link sidebar-link-active'
      : 'sidebar-link';
  };

  return (
    <aside className="sidebar">
      <h2>Sistema de Gestion</h2>

      <p className="usuario">
        {usuario?.nombre_completo}
      </p>

      <nav>
        <NavLink end to="/gestion" className={linkClass}>
          Inicio
        </NavLink>

        {esAdmin && (
          <NavLink to="/gestion/usuarios" className={linkClass}>
            Usuarios
          </NavLink>
        )}

        <NavLink to="/gestion/clientes" className={linkClass}>
          Clientes
        </NavLink>

        <NavLink to="/gestion/catalogos" className={linkClass}>
          Catálogos
        </NavLink>

        <button
          type="button"
          className={
            pedidosActivo
              ? 'sidebar-group-button sidebar-group-active'
              : 'sidebar-group-button'
          }
          onClick={() => setPedidosAbierto(!pedidosAbierto)}
        >
          Pedidos {pedidosAbierto ? '▾' : '▸'}
        </button>

        {pedidosAbierto && (
          <div className="sidebar-submenu">
            <NavLink end to="/gestion/pedidos" className={linkClass}>
              Pedidos totales
            </NavLink>

            <NavLink to="/gestion/pedidos/registrar" className={linkClass}>
              Registrar pedido
            </NavLink>
          </div>
        )}

        <NavLink to="/gestion/entregas" className={linkClass}>
          Registro de Entregas
        </NavLink>

        <NavLink to="/gestion/depositos" className={linkClass}>
          Registro de Depósitos
        </NavLink>

        <NavLink to="/gestion/proveedores" className={linkClass}>
          Proveedores
        </NavLink>

        <NavLink to="/gestion/compras" className={linkClass}>
          Registro de Compras
        </NavLink>

        <NavLink to="/gestion/gastos" className={linkClass}>
          Registro de Gastos
        </NavLink>
      </nav>

      <button onClick={handleLogout} className="btn-logout">
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

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../services/api';
import { useBloqueoAccion } from '../hooks/useBloqueoAccion';

function EntregaPedidoDetalle() {
  const { pedido_id } = useParams();

  const [pedido, setPedido] = useState<any | null>(null);
  const [detallesEntrega, setDetallesEntrega] = useState<any[]>([]);
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [comentarioEntrega, setComentarioEntrega] = useState('');

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const {
    procesando: registrandoEntrega,
    intentarBloquear: bloquearEntrega,
    liberar: liberarEntrega
  } = useBloqueoAccion();
  const cargarPedido = async () => {
    const data = await apiFetch(`/entregas/pedidos/${pedido_id}`);

    setPedido(data.pedido);

    const detalles = data.pedido.detalles.map((item: any) => ({
      ...item,
      cantidad_entregada_input: '',
      observacion_entrega: ''
    }));

    setDetallesEntrega(detalles);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarPedido();
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, [pedido_id]);

  const claseEstado = (estado: string) => {
    if (estado === 'COMPLETO') return 'estado estado-completo';
    if (estado === 'PARCIAL') return 'estado estado-parcial';
    return 'estado estado-pendiente';
  };

  const textoEstado = (estado: string) => {
    if (estado === 'COMPLETO') return 'Completo';
    if (estado === 'PARCIAL') return 'Parcial';
    return 'Pendiente';
  };

  const handleDetalleChange = (
    index: number,
    campo: string,
    valor: string
  ) => {
    const nuevosDetalles = [...detallesEntrega];

    nuevosDetalles[index] = {
      ...nuevosDetalles[index],
      [campo]: valor
    };

    setDetallesEntrega(nuevosDetalles);
  };

  const registrarEntrega = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    if (!pedido) {
      setError('No se encontró el pedido');
      return;
    }

    const detalles = detallesEntrega
      .filter((item) => Number(item.cantidad_entregada_input) > 0)
      .map((item) => ({
        pedido_detalle_id: item.pedido_detalle_id,
        cantidad_entregada: Number(item.cantidad_entregada_input),
        unidad_medida_id: item.unidad_medida_id,
        observacion: item.observacion_entrega
      }));

    if (detalles.length === 0) {
      setError('Ingrese al menos una cantidad entregada');
      return;
    }
    if (!bloquearEntrega()) {
      return;
    }
    try {
  await apiFetch('/entregas', {
    method: 'POST',
    body: JSON.stringify({
      pedido_id: pedido.pedido_id,
      fecha_entrega: fechaEntrega || undefined,
      comentario_entrega: comentarioEntrega,
      detalles
    })
  });

  setMensaje('Entrega registrada correctamente');

  setFechaEntrega('');
  setComentarioEntrega('');

  await cargarPedido();

} catch (error: any) {
  setError(error.message);

} finally {
  liberarEntrega();
};}

  if (!pedido) {
    return (
      <div>
        <Link to="/gestion/entregas" className="btn-volver">
          ← Volver a Entregas
        </Link>

        {error ? <div className="error">{error}</div> : <p>Cargando pedido...</p>}
      </div>
    );
  }

  return (
    <div>
      <Link to="/gestion/entregas" className="btn-volver">
        ← Volver a Entregas
      </Link>

      <div className="pedido-detalle-header">
        <div>
          <h1>Pedido #{pedido.pedido_id}</h1>
          <p>{pedido.razon_social} - {pedido.ruc}</p>
        </div>

        <span className={claseEstado(pedido.estado_entrega_general)}>
          {textoEstado(pedido.estado_entrega_general)}
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
          <span>Estado</span>
          <strong>{textoEstado(pedido.estado_entrega_general)}</strong>
        </div>
      </div>

      <div className="descripcion-card">
        <strong>Descripción del pedido:</strong>
        <p>{pedido.descripcion_pedido || 'Sin descripción'}</p>
      </div>

      <form className="form-card pedido-form" onSubmit={registrarEntrega}>
        <h3>Registrar nueva entrega</h3>

        <label>Fecha de entrega</label>
        <input
          type="date"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />

        <label>Comentario de entrega</label>
        <textarea
          value={comentarioEntrega}
          onChange={(e) => setComentarioEntrega(e.target.value)}
          placeholder="Ejemplo: Primera entrega parcial del pedido"
          rows={3}
        />

        <h3>Productos del pedido</h3>

        {detallesEntrega.map((detalle, index) => {
          const estaCompleto = detalle.estado_item === 'COMPLETO';

          return (
            <div
              className={`detalle-card detalle-${detalle.estado_item.toLowerCase()}`}
              key={detalle.pedido_detalle_id}
            >
              <div className="detalle-header">
                <div>
                  <strong>
                    {detalle.tipo_producto} {detalle.material} {detalle.medida} {detalle.color}
                  </strong>
                  <br />
                  <span className="muted">
                    {detalle.descripcion_item || 'Sin descripción específica'}
                  </span>
                </div>

                <span className={claseEstado(detalle.estado_item)}>
                  {textoEstado(detalle.estado_item)}
                </span>
              </div>

              <div className="detalle-resumen">
                <p><strong>Pedido:</strong> {detalle.cantidad_pedida} {detalle.unidad}</p>
                <p><strong>Entregado:</strong> {detalle.cantidad_entregada} {detalle.unidad}</p>
                <p><strong>Pendiente:</strong> {detalle.cantidad_pendiente} {detalle.unidad}</p>
                <p>
                  <strong>Presentación:</strong>{' '}
                  {detalle.cantidad_presentacion || '-'} {detalle.unidad_presentacion || ''}
                </p>
              </div>

              {!estaCompleto ? (
                <div className="detalle-grid">
                  <input
                    type="number"
                    min="0"
                    max={detalle.cantidad_pendiente}
                    placeholder={`Cantidad a entregar (${detalle.unidad})`}
                    value={detalle.cantidad_entregada_input}
                    onChange={(e) =>
                      handleDetalleChange(index, 'cantidad_entregada_input', e.target.value)
                    }
                  />

                  <input
                    placeholder="Observación"
                    value={detalle.observacion_entrega}
                    onChange={(e) =>
                      handleDetalleChange(index, 'observacion_entrega', e.target.value)
                    }
                  />
                </div>
              ) : (
                <div className="producto-completo">
                  Este producto ya fue entregado completamente.
                </div>
              )}
            </div>
          );
        })}

      <button
        type="submit"
        disabled={registrandoEntrega}
      >
        {registrandoEntrega
          ? 'Registrando entrega...'
          : 'Guardar entrega'}
      </button>
      </form>

      <div className="tabla-card">
        <h3>Historial de entregas</h3>

        {pedido.historial_entregas.length === 0 ? (
          <p>No hay entregas registradas para este pedido.</p>
        ) : (
          pedido.historial_entregas.map((entrega: any) => (
            <div className="historial-card" key={entrega.entrega_id}>
              <div className="historial-header">
                <strong>Entrega #{entrega.entrega_id}</strong>
                <span>{entrega.fecha_entrega?.slice(0, 10)}</span>
              </div>

              <p>
                <strong>Registrado por:</strong> {entrega.registrado_por}
              </p>

              <p>
                <strong>Comentario:</strong> {entrega.comentario_entrega || '-'}
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Observación</th>
                  </tr>
                </thead>

                <tbody>
                  {entrega.detalles.map((detalle: any) => (
                    <tr key={detalle.entrega_detalle_id}>
                      <td>{detalle.producto}</td>
                      <td>{detalle.cantidad_entregada} {detalle.unidad}</td>
                      <td>{detalle.observacion || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
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

import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

function Gastos() {
  const [gastos, setGastos] = useState<any[]>([]);
  const [tiposGasto, setTiposGasto] = useState<any[]>([]);
  const [proveedores, setProveedores] = useState<any[]>([]);

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [filtros, setFiltros] = useState({
    tipo_gasto_id: '',
    proveedor_id: '',
    moneda_codigo: '',
    q: ''
  });

  const [form, setForm] = useState({
    tipo_gasto_id: '',
    proveedor_id: '',
    fecha_gasto: '',
    monto: '',
    moneda_codigo: 'PEN',
    descripcion: '',
    comprobante: ''
  });

  const [nuevoTipo, setNuevoTipo] = useState('');

  const cargarDatosBase = async () => {
    const [tiposData, proveedoresData] = await Promise.all([
      apiFetch('/gastos/tipos'),
      apiFetch('/proveedores')
    ]);

    setTiposGasto(tiposData.tipos);
    setProveedores(proveedoresData.proveedores);
  };

  const cargarGastos = async (
    paginaActual = page,
    filtrosActuales = filtros
  ) => {
    const params = new URLSearchParams();

    params.append('page', String(paginaActual));
    params.append('limit', '10');

    if (filtrosActuales.tipo_gasto_id) {
      params.append('tipo_gasto_id', filtrosActuales.tipo_gasto_id);
    }

    if (filtrosActuales.proveedor_id) {
      params.append('proveedor_id', filtrosActuales.proveedor_id);
    }

    if (filtrosActuales.moneda_codigo) {
      params.append('moneda_codigo', filtrosActuales.moneda_codigo);
    }

    if (filtrosActuales.q.trim()) {
      params.append('q', filtrosActuales.q.trim());
    }

    const data = await apiFetch(`/gastos?${params.toString()}`);

    setGastos(data.gastos);
    setPaginacion(data.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarDatosBase();
        await cargarGastos(1);
      } catch (error: any) {
        setError(error.message);
      }
    };

    iniciar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        await cargarGastos(page);
      } catch (error: any) {
        setError(error.message);
      }
    };

    cargar();
  }, [page]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFiltroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
  };

  const registrarTipoGasto = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    try {
      await apiFetch('/gastos/tipos', {
        method: 'POST',
        body: JSON.stringify({
          nombre: nuevoTipo
        })
      });

      setMensaje('Tipo de gasto registrado correctamente');
      setNuevoTipo('');

      await cargarDatosBase();

    } catch (error: any) {
      setError(error.message);
    }
  };

  const registrarGasto = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    try {
      await apiFetch('/gastos', {
        method: 'POST',
        body: JSON.stringify({
          tipo_gasto_id: Number(form.tipo_gasto_id),
          proveedor_id: form.proveedor_id ? Number(form.proveedor_id) : null,
          fecha_gasto: form.fecha_gasto || undefined,
          monto: Number(form.monto),
          moneda_codigo: form.moneda_codigo,
          descripcion: form.descripcion,
          comprobante: form.comprobante
        })
      });

      setMensaje('Gasto registrado correctamente');

      setForm({
        tipo_gasto_id: '',
        proveedor_id: '',
        fecha_gasto: '',
        monto: '',
        moneda_codigo: 'PEN',
        descripcion: '',
        comprobante: ''
      });

      setPage(1);
      await cargarGastos(1);

    } catch (error: any) {
      setError(error.message);
    }
  };

  const aplicarFiltros = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMensaje('');
    setPage(1);

    try {
      await cargarGastos(1, filtros);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const limpiarFiltros = async () => {
    const filtrosLimpios = {
      tipo_gasto_id: '',
      proveedor_id: '',
      moneda_codigo: '',
      q: ''
    };

    setFiltros(filtrosLimpios);
    setPage(1);

    try {
      await cargarGastos(1, filtrosLimpios);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Gastos</h1>
      <p>Registra y consulta los gastos de la empresa.</p>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      <form className="form-card" onSubmit={registrarTipoGasto}>
        <h3>Registrar tipo de gasto</h3>

        <label>Nuevo tipo de gasto</label>
        <input
          value={nuevoTipo}
          onChange={(e) => setNuevoTipo(e.target.value)}
          placeholder="Ejemplo: COMBUSTIBLE"
        />

        <button type="submit">
          Guardar tipo
        </button>
      </form>

      <form className="form-card pedido-form" onSubmit={registrarGasto}>
        <h3>Registrar gasto</h3>

        <label>Tipo de gasto</label>
        <select
          name="tipo_gasto_id"
          value={form.tipo_gasto_id}
          onChange={handleFormChange}
        >
          <option value="">Seleccione tipo</option>
          {tiposGasto.map((tipo) => (
            <option key={tipo.tipo_gasto_id} value={tipo.tipo_gasto_id}>
              {tipo.nombre}
            </option>
          ))}
        </select>

        <label>Proveedor opcional</label>
        <select
          name="proveedor_id"
          value={form.proveedor_id}
          onChange={handleFormChange}
        >
          <option value="">Sin proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.proveedor_id} value={proveedor.proveedor_id}>
              {proveedor.razon_social} - {proveedor.ruc}
            </option>
          ))}
        </select>

        <label>Fecha de gasto</label>
        <input
          type="date"
          name="fecha_gasto"
          value={form.fecha_gasto}
          onChange={handleFormChange}
        />

        <label>Moneda</label>
        <select
          name="moneda_codigo"
          value={form.moneda_codigo}
          onChange={handleFormChange}
        >
          <option value="PEN">Soles</option>
          <option value="USD">Dólares</option>
        </select>

        <label>Monto</label>
        <input
          type="number"
          name="monto"
          value={form.monto}
          onChange={handleFormChange}
          placeholder="Monto del gasto"
        />

        <label>Comprobante</label>
        <input
          name="comprobante"
          value={form.comprobante}
          onChange={handleFormChange}
          placeholder="Ejemplo: REC-001, F001-000123"
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleFormChange}
          placeholder="Ejemplo: Pago de luz del local"
          rows={3}
        />

        <button type="submit">
          Guardar gasto
        </button>
      </form>

      <form className="filtros-card" onSubmit={aplicarFiltros}>
        <div>
          <label>Tipo de gasto</label>
          <select
            name="tipo_gasto_id"
            value={filtros.tipo_gasto_id}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            {tiposGasto.map((tipo) => (
              <option key={tipo.tipo_gasto_id} value={tipo.tipo_gasto_id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Proveedor</label>
          <select
            name="proveedor_id"
            value={filtros.proveedor_id}
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.proveedor_id} value={proveedor.proveedor_id}>
                {proveedor.razon_social} - {proveedor.ruc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Moneda</label>
          <select
            name="moneda_codigo"
            value={filtros.moneda_codigo}
            onChange={handleFiltroChange}
          >
            <option value="">Todas</option>
            <option value="PEN">Soles</option>
            <option value="USD">Dólares</option>
          </select>
        </div>

        <div>
          <label>Buscar</label>
          <input
            name="q"
            value={filtros.q}
            onChange={handleFiltroChange}
            placeholder="Descripción, comprobante o proveedor"
          />
        </div>

        <div className="filtros-actions">
          <button type="submit">Buscar</button>
          <button type="button" className="btn-secondary" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </form>

      <div className="tabla-card">
        <h3>Listado de gastos</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Proveedor</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Moneda</th>
              <th>Comprobante</th>
              <th>Registrado por</th>
            </tr>
          </thead>

          <tbody>
            {gastos.map((gasto) => (
              <tr key={gasto.gasto_id}>
                <td>#{gasto.gasto_id}</td>
                <td>{gasto.tipo_gasto}</td>
                <td>{gasto.proveedor || '-'}</td>
                <td>{gasto.fecha_gasto?.slice(0, 10)}</td>
                <td>{Number(gasto.monto).toFixed(2)}</td>
                <td>{gasto.moneda_codigo}</td>
                <td>{gasto.comprobante || '-'}</td>
                <td>{gasto.registrado_por}</td>
              </tr>
            ))}

            {gastos.length === 0 && (
              <tr>
                <td colSpan={8}>No hay gastos registrados.</td>
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

export default Gastos;

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

import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { apiFetch } from '../../services/api';

import FeedbackToast from '../../components/common/FeedbackToast';
import ConfirmDialog from '../../components/common/ConfirmDialog';

import PedidoItemsEditor, {
  detallePedidoVacio,
  type DetallePedidoForm
} from '../../components/pedidos/PedidoItemsEditor';

import { useBloqueoAccion } from '../../hooks/useBloqueoAccion';

function EditarPedido() {
  const { pedido_id } = useParams();
  const navigate = useNavigate();

  const [pedido, setPedido] = useState<any | null>(null);

  const [clientes, setClientes] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [medidas, setMedidas] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [unidades, setUnidades] = useState<any[]>([]);

  const [dialogAbierto, setDialogAbierto] = useState(false);

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info' | 'warning',
    mensaje: ''
  });

  const [form, setForm] = useState({
    cliente_id: '',
    codigo_pedido: '',
    fecha_pedido: '',
    fecha_entrega_estimada: '',
    descripcion_pedido: '',
    motivo_cambio: ''
  });

  const [nuevosDetalles, setNuevosDetalles] = useState<
    DetallePedidoForm[]
  >([
    { ...detallePedidoVacio }
  ]);

  /*
   * Protección contra múltiples actualizaciones.
   *
   * useBloqueoAccion utiliza:
   * - useRef para bloquear inmediatamente.
   * - useState para reflejar el estado en la interfaz.
   */
  const {
    procesando: actualizandoPedido,
    intentarBloquear: bloquearActualizacion,
    liberar: liberarActualizacion
  } = useBloqueoAccion();

  const cargarDatos = async () => {
    const [
      pedidoData,
      clientesData,
      tiposData,
      medidasData,
      coloresData,
      materialesData,
      unidadesData
    ] = await Promise.all([
      apiFetch(`/pedidos/${pedido_id}`),
      apiFetch('/clientes'),
      apiFetch('/catalogos/tiposProducto'),
      apiFetch('/catalogos/medidas'),
      apiFetch('/catalogos/colores'),
      apiFetch('/catalogos/materiales'),
      apiFetch('/catalogos/unidades-medida')
    ]);

    const pedidoActual = pedidoData.pedido;

    setPedido(pedidoActual);

    setClientes(clientesData.clientes);

    setTipos(tiposData.items);
    setMedidas(medidasData.items);
    setColores(coloresData.items);
    setMateriales(materialesData.items);
    setUnidades(unidadesData.unidades);

    setForm({
      cliente_id: String(pedidoActual.cliente_id),

      codigo_pedido:
        pedidoActual.codigo_pedido || '',

      fecha_pedido:
        pedidoActual.fecha_pedido?.slice(0, 10) || '',

      fecha_entrega_estimada:
        pedidoActual.fecha_entrega_estimada?.slice(0, 10) || '',

      descripcion_pedido:
        pedidoActual.descripcion_pedido || '',

      motivo_cambio: ''
    });
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarDatos();

      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    iniciar();
  }, [pedido_id]);

  const handleChange = (
    e: ChangeEvent<
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

  /*
   * Primer paso:
   * el usuario pulsa "Actualizar pedido".
   *
   * Todavía NO actualizamos.
   * Abrimos el diálogo de confirmación.
   */
  const prepararEdicion = (e: FormEvent) => {
    e.preventDefault();

    /*
     * Si ya existe una actualización en curso,
     * ignoramos cualquier nuevo submit.
     */
    if (actualizandoPedido) {
      return;
    }

    if (!form.cliente_id) {
      setFeedback({
        tipo: 'error',
        mensaje: 'Debes seleccionar un cliente'
      });

      return;
    }

    if (!form.fecha_pedido) {
      setFeedback({
        tipo: 'error',
        mensaje: 'Debes ingresar la fecha del pedido'
      });

      return;
    }

    if (!form.motivo_cambio.trim()) {
      setFeedback({
        tipo: 'error',
        mensaje: 'Debes ingresar el motivo del cambio'
      });

      return;
    }

    setDialogAbierto(true);
  };

  /*
   * Segundo paso:
   * el usuario confirma la edición.
   *
   * Aquí sí hacemos el PUT.
   */
  const confirmarEdicion = async () => {
    /*
     * BLOQUEO INMEDIATO.
     *
     * Primer clic:
     * bloquearActualizacion() -> true
     *
     * Segundo, tercero, cuarto clic:
     * bloquearActualizacion() -> false
     *
     * Por lo tanto solo puede existir un PUT.
     */
    if (!bloquearActualizacion()) {
      return;
    }

    try {
      /*
       * El editor siempre tiene inicialmente una fila vacía.
       *
       * Solo enviamos elementos que tengan algún dato.
       */
      const detallesValidos = nuevosDetalles.filter(
        (item) => {
          return (
            item.tipo_producto_id ||
            item.medida_id ||
            item.color_id ||
            item.material_id ||
            item.cantidad_pedida ||
            item.precio_unitario ||
            item.descripcion_item
          );
        }
      );

      /*
       * Si el usuario comenzó a llenar un producto nuevo,
       * debemos asegurarnos de que esté completo.
       */
      for (
        let index = 0;
        index < detallesValidos.length;
        index++
      ) {
        const item = detallesValidos[index];

        if (
          !item.tipo_producto_id ||
          !item.medida_id ||
          !item.color_id ||
          !item.material_id
        ) {
          setFeedback({
            tipo: 'error',
            mensaje:
              `El nuevo producto ${index + 1} debe tener tipo, medida, color y material`
          });

          liberarActualizacion();
          return;
        }

        if (
          !item.cantidad_pedida ||
          Number(item.cantidad_pedida) <= 0
        ) {
          setFeedback({
            tipo: 'error',
            mensaje:
              `El nuevo producto ${index + 1} debe tener una cantidad mayor a 0`
          });

          liberarActualizacion();
          return;
        }

        if (!item.unidad_medida_id) {
          setFeedback({
            tipo: 'error',
            mensaje:
              `El nuevo producto ${index + 1} debe tener una unidad de medida`
          });

          liberarActualizacion();
          return;
        }

        if (
          item.precio_unitario === '' ||
          Number(item.precio_unitario) < 0
        ) {
          setFeedback({
            tipo: 'error',
            mensaje:
              `El nuevo producto ${index + 1} debe tener un precio válido`
          });

          liberarActualizacion();
          return;
        }

        if (!item.moneda_codigo) {
          setFeedback({
            tipo: 'error',
            mensaje:
              `El nuevo producto ${index + 1} debe tener una moneda`
          });

          liberarActualizacion();
          return;
        }
      }

      const body = {
        cliente_id:
          Number(form.cliente_id),

        codigo_pedido:
          form.codigo_pedido || null,

        fecha_pedido:
          form.fecha_pedido,

        fecha_entrega_estimada:
          form.fecha_entrega_estimada || null,

        descripcion_pedido:
          form.descripcion_pedido,

        motivo_cambio:
          form.motivo_cambio,

        nuevos_detalles:
          detallesValidos.map((item) => ({
            tipo_producto_id:
              Number(item.tipo_producto_id),

            medida_id:
              Number(item.medida_id),

            color_id:
              Number(item.color_id),

            material_id:
              Number(item.material_id),

            cantidad_pedida:
              Number(item.cantidad_pedida),

            unidad_medida_id:
              Number(item.unidad_medida_id),

            cantidad_presentacion:
              item.cantidad_presentacion
                ? Number(item.cantidad_presentacion)
                : null,

            unidad_presentacion_id:
              item.unidad_presentacion_id
                ? Number(item.unidad_presentacion_id)
                : null,

            precio_unitario:
              Number(item.precio_unitario),

            moneda_codigo:
              item.moneda_codigo,

            descripcion_item:
              item.descripcion_item,

            observacion:
              item.observacion
          }))
      };

      await apiFetch(
        `/pedidos/${pedido_id}`,
        {
          method: 'PUT',
          body: JSON.stringify(body)
        }
      );

      /*
       * Cerramos el diálogo solo cuando el backend
       * confirmó correctamente la actualización.
       */
      setDialogAbierto(false);

      setFeedback({
        tipo: 'success',
        mensaje: 'Pedido actualizado correctamente'
      });

      /*
       * NO liberamos actualizandoPedido aquí.
       *
       * Esto es intencional.
       *
       * Durante estos 800 ms el usuario tampoco
       * podrá generar otro PUT.
       */
      setTimeout(() => {
        navigate(
          `/gestion/pedidos/${pedido_id}`
        );
      }, 800);

    } catch (error: any) {
      /*
       * Si falló el backend sí permitimos
       * que el usuario vuelva a intentarlo.
       */
      liberarActualizacion();

      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const claseEstadoEntrega = (
    estado: string
  ) => {
    if (estado === 'COMPLETO') {
      return 'estado estado-completo';
    }

    if (estado === 'PARCIAL') {
      return 'estado estado-parcial';
    }

    return 'estado estado-pendiente';
  };

  /*
   * Estado inicial mientras cargamos
   * pedido + clientes + catálogos.
   */
  if (!pedido) {
    return (
      <div>
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
          to="/gestion/pedidos"
          className="btn-volver"
        >
          ← Volver a pedidos
        </Link>

        <p>Cargando pedido...</p>
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

      <ConfirmDialog
        abierto={dialogAbierto}
        titulo="Confirmar edición"
        descripcion="Se actualizará la cabecera del pedido y se registrará el motivo del cambio. Si agregaste productos nuevos, quedarán añadidos al pedido."
        textoConfirmar="Actualizar pedido"
        textoProcesando="Actualizando pedido..."
        procesando={actualizandoPedido}
        onConfirmar={confirmarEdicion}
        onCerrar={() => {
          /*
           * El diálogo tampoco puede cerrarse
           * mientras el PUT está ejecutándose.
           */
          if (!actualizandoPedido) {
            setDialogAbierto(false);
          }
        }}
      />

      <Link
        to={`/gestion/pedidos/${pedido_id}`}
        className="btn-volver"
      >
        ← Volver al detalle
      </Link>

      <div className="pedidos-header">
        <div>
          <h1>
            Editar pedido #{pedido.pedido_id}
          </h1>

          <p>
            Edita la cabecera del pedido o agrega
            nuevos productos con motivo.
          </p>
        </div>
      </div>

      <form
        className="form-card pedido-form"
        onSubmit={prepararEdicion}
      >
        <h3>Datos actuales del pedido</h3>

        <label>Cliente</label>

        <select
          name="cliente_id"
          value={form.cliente_id}
          onChange={handleChange}
          disabled={actualizandoPedido}
        >
          <option value="">
            Seleccione cliente
          </option>

          {clientes.map((cliente) => (
            <option
              key={cliente.cliente_id}
              value={cliente.cliente_id}
            >
              {cliente.razon_social} - {cliente.ruc}
            </option>
          ))}
        </select>

        <label>Código de pedido</label>

        <input
          name="codigo_pedido"
          value={form.codigo_pedido}
          onChange={handleChange}
          placeholder="Ejemplo: PED-001"
          disabled={actualizandoPedido}
        />

        <label>Fecha de pedido</label>

        <input
          type="date"
          name="fecha_pedido"
          value={form.fecha_pedido}
          onChange={handleChange}
          disabled={actualizandoPedido}
        />

        <label>Fecha de entrega estimada</label>

        <input
          type="date"
          name="fecha_entrega_estimada"
          value={form.fecha_entrega_estimada}
          onChange={handleChange}
          disabled={actualizandoPedido}
        />

        <label>Descripción del pedido</label>

        <textarea
          name="descripcion_pedido"
          value={form.descripcion_pedido}
          onChange={handleChange}
          rows={3}
          disabled={actualizandoPedido}
        />

        <label>Motivo del cambio</label>

        <textarea
          name="motivo_cambio"
          value={form.motivo_cambio}
          onChange={handleChange}
          rows={3}
          placeholder="Ejemplo: El cliente solicitó aumentar productos al pedido"
          disabled={actualizandoPedido}
        />

        <div className="tabla-card">
          <h3>Productos ya registrados</h3>

          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Entregado</th>
                <th>Pendiente</th>
                <th>Precio</th>
                <th>Estado entrega</th>
              </tr>
            </thead>

            <tbody>
              {pedido.detalles.map(
                (detalle: any) => (
                  <tr
                    key={
                      detalle.pedido_detalle_id
                    }
                  >
                    <td>
                      <strong>
                        {detalle.tipo_producto}{' '}
                        {detalle.material}{' '}
                        {detalle.medida}{' '}
                        {detalle.color}
                      </strong>

                      <br />

                      <span className="muted">
                        {
                          detalle.descripcion_item ||
                          '-'
                        }
                      </span>
                    </td>

                    <td>
                      {detalle.cantidad_pedida}{' '}
                      {detalle.unidad}
                    </td>

                    <td>
                      {detalle.cantidad_entregada}{' '}
                      {detalle.unidad}
                    </td>

                    <td>
                      {detalle.cantidad_pendiente}{' '}
                      {detalle.unidad}
                    </td>

                    <td>
                      {Number(
                        detalle.precio_unitario
                      ).toFixed(2)}{' '}
                      {detalle.moneda_codigo}
                    </td>

                    <td>
                      <span
                        className={
                          claseEstadoEntrega(
                            detalle.estado_entrega
                          )
                        }
                      >
                        {detalle.estado_entrega}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <PedidoItemsEditor
          detalles={nuevosDetalles}
          setDetalles={setNuevosDetalles}
          tipos={tipos}
          medidas={medidas}
          colores={colores}
          materiales={materiales}
          unidades={unidades}
          titulo="Agregar nuevos productos opcionales"
          textoBotonAgregar="+ Agregar otro producto nuevo"
          onFeedback={(tipo, mensaje) =>
            setFeedback({
              tipo,
              mensaje
            })
          }
        />

        <br />

        <button
          type="submit"
          disabled={actualizandoPedido}
        >
          {actualizandoPedido
            ? 'Actualizando pedido...'
            : 'Actualizar pedido'}
        </button>
      </form>
    </div>
  );
}

export default EditarPedido;

<<<END OF FILE>>>


---

## FILE: src\pages\pedidos\PedidoDetalle.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';

function PedidoDetalle() {
  const { pedido_id } = useParams();

  const [pedido, setPedido] = useState<any | null>(null);

  const [feedback, setFeedback] = useState({
    tipo: 'info' as 'success' | 'error' | 'info',
    mensaje: ''
  });

  const cargarPedido = async () => {
    const data = await apiFetch(`/pedidos/${pedido_id}`);
    setPedido(data.pedido);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarPedido();
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    iniciar();
  }, [pedido_id]);

  const claseEstadoPedido = (estado: string) => {
    if (estado === 'ENTREGADO') return 'estado-pill estado-entregado';
    if (estado === 'PARCIAL') return 'estado-pill estado-parcial';
    if (estado === 'CANCELADO') return 'estado-pill estado-cancelado';
    return 'estado-pill estado-registrado';
  };

  const claseEstadoEntrega = (estado: string) => {
    if (estado === 'COMPLETO') return 'estado estado-completo';
    if (estado === 'PARCIAL') return 'estado estado-parcial';
    return 'estado estado-pendiente';
  };

  const totalesPorMoneda = () => {
    if (!pedido) return [];

    const mapa = new Map<string, number>();

    pedido.detalles.forEach((detalle: any) => {
      const moneda = detalle.moneda_codigo;
      const subtotal = Number(detalle.subtotal || 0);

      mapa.set(moneda, (mapa.get(moneda) || 0) + subtotal);
    });

    return Array.from(mapa.entries()).map(([moneda, total]) => ({
      moneda,
      total
    }));
  };

  if (!pedido) {
    return (
      <div>
        <FeedbackToast
          tipo={feedback.tipo}
          mensaje={feedback.mensaje}
          onClose={() => setFeedback({ ...feedback, mensaje: '' })}
        />

        <Link to="/gestion/pedidos" className="btn-volver">
          ← Volver a pedidos
        </Link>

        <p>Cargando pedido...</p>
      </div>
    );
  }

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

      <div className="pedido-detalle-header">
        <div>
          <h1>Pedido #{pedido.pedido_id}</h1>
          <p>{pedido.razon_social} - {pedido.ruc}</p>
        </div>

        <span className={claseEstadoPedido(pedido.estado_pedido)}>
          {pedido.estado_pedido}
        </span>
      </div>

      <div className="pedidos-actions">
        <Link
          className="btn-link"
          to={`/gestion/pedidos/${pedido.pedido_id}/editar`}
        >
          Editar pedido
        </Link>
      </div>

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
          <span>Registrado por</span>
          <strong>{pedido.registrado_por}</strong>
        </div>
      </div>

      <div className="descripcion-card">
        <strong>Descripción del pedido:</strong>
        <p>{pedido.descripcion_pedido || 'Sin descripción'}</p>
      </div>

      <div className="tabla-card">
        <h3>Totales por moneda</h3>

        <table>
          <thead>
            <tr>
              <th>Moneda</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {totalesPorMoneda().map((item) => (
              <tr key={item.moneda}>
                <td>{item.moneda}</td>
                <td>{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tabla-card">
        <h3>Productos del pedido</h3>

        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Entregado</th>
              <th>Pendiente</th>
              <th>Presentación</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th>Estado entrega</th>
            </tr>
          </thead>

          <tbody>
            {pedido.detalles.map((detalle: any) => (
              <tr key={detalle.pedido_detalle_id}>
                <td>
                  <strong>
                    {detalle.tipo_producto} {detalle.material} {detalle.medida} {detalle.color}
                  </strong>
                  <br />
                  <span className="muted">{detalle.descripcion_item || '-'}</span>
                </td>

                <td>{detalle.cantidad_pedida} {detalle.unidad}</td>
                <td>{detalle.cantidad_entregada} {detalle.unidad}</td>
                <td>{detalle.cantidad_pendiente} {detalle.unidad}</td>

                <td>
                  {detalle.cantidad_presentacion || '-'} {detalle.unidad_presentacion || ''}
                </td>

                <td>
                  {Number(detalle.precio_unitario).toFixed(2)} {detalle.moneda_codigo}
                </td>

                <td>
                  {Number(detalle.subtotal).toFixed(2)} {detalle.moneda_codigo}
                </td>

                <td>
                  <span className={claseEstadoEntrega(detalle.estado_entrega)}>
                    {detalle.estado_entrega}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tabla-card">
        <h3>Historial de cambios</h3>

        {pedido.historial_cambios.length === 0 ? (
          <p>No hay cambios registrados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Motivo</th>
                <th>Registrado por</th>
                <th>Fecha</th>
              </tr>
            </thead>

            <tbody>
              {pedido.historial_cambios.map((cambio: any) => (
                <tr key={cambio.pedido_cambio_id}>
                  <td>{cambio.tipo_cambio}</td>
                  <td>{cambio.descripcion_motivo}</td>
                  <td>{cambio.registrado_por}</td>
                  <td>{cambio.created_at?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PedidoDetalle;

<<<END OF FILE>>>


---

## FILE: src\pages\pedidos\PedidosLista.tsx

<<<START OF FILE>>>

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import FeedbackToast from '../../components/common/FeedbackToast';

function PedidosLista() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);

  const [clienteId, setClienteId] = useState('');
  const [estadoPedido, setEstadoPedido] = useState('');
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

  const cargarClientes = async () => {
    const data = await apiFetch('/clientes/select');
    setClientes(data.clientes);
  };

  const cargarPedidos = async (
    paginaActual = page,
    clienteActual = clienteId,
    estadoActual = estadoPedido,
    busquedaActual = busqueda
  ) => {
    const params = new URLSearchParams();

    params.append('page', String(paginaActual));
    params.append('limit', '10');

    if (clienteActual) {
      params.append('cliente_id', clienteActual);
    }

    if (estadoActual) {
      params.append('estado_pedido', estadoActual);
    }

    if (busquedaActual.trim()) {
      params.append('q', busquedaActual.trim());
    }

    const data = await apiFetch(`/pedidos?${params.toString()}`);

    setPedidos(data.pedidos);
    setPaginacion(data.paginacion);
  };

  useEffect(() => {
    const iniciar = async () => {
      try {
        await cargarClientes();
        await cargarPedidos(1);
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
        await cargarPedidos(page);
      } catch (error: any) {
        setFeedback({
          tipo: 'error',
          mensaje: error.message
        });
      }
    };

    cargar();
  }, [page, clienteId, estadoPedido]);

  const aplicarBusqueda = async (e: FormEvent) => {
    e.preventDefault();

    setPage(1);

    try {
      await cargarPedidos(1);
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const limpiarFiltros = async () => {
    setClienteId('');
    setEstadoPedido('');
    setBusqueda('');
    setPage(1);

    try {
      await cargarPedidos(1, '', '', '');
    } catch (error: any) {
      setFeedback({
        tipo: 'error',
        mensaje: error.message
      });
    }
  };

  const claseEstado = (estado: string) => {
    if (estado === 'ENTREGADO') return 'estado-pill estado-entregado';
    if (estado === 'PARCIAL') return 'estado-pill estado-parcial';
    if (estado === 'CANCELADO') return 'estado-pill estado-cancelado';
    return 'estado-pill estado-registrado';
  };

  const obtenerCantidadesPedido = (resumen: string | null | undefined) => {
    if (!resumen) return [];

    return resumen
      .split('|')
      .filter((item) => item.trim() !== '')
      .map((item) => {
        const partes = item.trim().split(' ');
        const cantidad = Number(partes[0]);
        const unidad = partes.slice(1).join(' ');

        return {
          cantidad: Number.isNaN(cantidad) ? partes[0] : cantidad,
          unidad
        };
      });
  };

  const formatearCantidad = (cantidad: number | string) => {
    if (typeof cantidad === 'string') return cantidad;

    return cantidad.toLocaleString('es-PE', {
      minimumFractionDigits: cantidad % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 3
    });
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
          <h1>Pedidos totales</h1>
          <p>Consulta, filtra, revisa y edita los pedidos registrados.</p>
        </div>

        <div className="pedidos-actions">
          <Link className="btn-link" to="/gestion/pedidos/registrar">
            + Registrar pedido
          </Link>
        </div>
      </div>

      <form className="pedidos-filtros" onSubmit={aplicarBusqueda}>
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
          <label>Estado</label>
          <select
            value={estadoPedido}
            onChange={(e) => {
              setEstadoPedido(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todos</option>
            <option value="REGISTRADO">Registrado</option>
            <option value="PARCIAL">Parcial</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>

        <div>
          <label>Buscar</label>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Cliente, RUC, código o descripción"
          />
        </div>

        <div className="filtros-actions">
          <button type="submit">Buscar</button>

          <button
            type="button"
            className="btn-secondary"
            onClick={limpiarFiltros}
          >
            Limpiar
          </button>
        </div>
      </form>

      <div className="pedidos-card">
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
              <th>Total ref.</th>
              <th>Cantidad / unidad</th>
              <th>Registrado por</th>
              <th>Acciones</th>
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
                  <span className={claseEstado(pedido.estado_pedido)}>
                    {pedido.estado_pedido}
                  </span>
                </td>

                <td>{pedido.cantidad_items}</td>

                <td>
                  <strong>{Number(pedido.total_referencial || 0).toFixed(2)}</strong>
                </td>

                <td>
                  <div className="cantidades-resumen">
                    {obtenerCantidadesPedido(pedido.resumen_cantidades).map(
                      (item, index) => (
                        <span key={index} className="cantidad-pill">
                          <strong>{formatearCantidad(item.cantidad)}</strong>
                          <small>{item.unidad}</small>
                        </span>
                      )
                    )}

                    {!pedido.resumen_cantidades && (
                      <span className="muted">-</span>
                    )}
                  </div>
                </td>

                <td>{pedido.registrado_por}</td>

                <td>
                  <div className="tabla-acciones">
                    <Link
                      className="btn-link"
                      to={`/gestion/pedidos/${pedido.pedido_id}`}
                    >
                      Ver
                    </Link>

                    <Link
                      className="btn-outline"
                      to={`/gestion/pedidos/${pedido.pedido_id}/editar`}
                    >
                      Editar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {pedidos.length === 0 && (
              <tr>
                <td colSpan={10}>No hay pedidos registrados.</td>
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

