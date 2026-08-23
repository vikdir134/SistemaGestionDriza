@echo off
setlocal

title GestionDriza - Actualizacion de Base de Datos

echo.
echo ========================================
echo  GestionDriza - Actualizacion de BBDD
echo ========================================
echo.

REM =============================================
REM Ubicarnos siempre en la carpeta database
REM sin importar desde donde se abra el BAT.
REM =============================================
cd /d "%~dp0"


REM =============================================
REM Verificar que exista el backend
REM =============================================
if not exist "..\backend" (
    echo [ERROR] No se encontro la carpeta backend.
    echo.
    pause
    exit /b 1
)


REM =============================================
REM Verificar que exista .env
REM =============================================
if not exist "..\backend\.env" (
    echo [ERROR] No se encontro backend\.env
    echo.
    echo Debes configurar las variables de entorno
    echo antes de actualizar la base de datos.
    echo.
    pause
    exit /b 1
)


REM =============================================
REM Verificar Node.js
REM =============================================
where node >nul 2>nul

if errorlevel 1 (
    echo [ERROR] Node.js no esta instalado
    echo o no esta disponible en PATH.
    echo.
    pause
    exit /b 1
)


REM =============================================
REM Verificar dependencias del backend
REM =============================================
if not exist "..\backend\node_modules" (
    echo.
    echo No se encontraron las dependencias.
    echo Instalando dependencias del backend...
    echo.

    pushd "..\backend"

    call npm install

    if errorlevel 1 (
        echo.
        echo [ERROR] No se pudieron instalar
        echo las dependencias del backend.
        echo.

        popd
        pause
        exit /b 1
    )

    popd
)


REM =============================================
REM Ejecutar migraciones utilizando el .env
REM del backend.
REM =============================================
echo.
echo Ejecutando migraciones...
echo.

pushd "..\backend"

node scripts\run-migrations.js

set RESULTADO=%ERRORLEVEL%

popd


REM =============================================
REM Resultado
REM =============================================
if not "%RESULTADO%"=="0" (
    echo.
    echo ========================================
    echo  ERROR
    echo ========================================
    echo.
    echo La base de datos NO pudo actualizarse.
    echo Revisa el mensaje mostrado arriba.
    echo.
    pause
    exit /b %RESULTADO%
)


echo.
echo ========================================
echo  ACTUALIZACION COMPLETADA
echo ========================================
echo.
echo La base de datos esta actualizada.
echo.

pause

exit /b 0