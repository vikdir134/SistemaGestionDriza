@echo off
title Actualizar GestionDriza desde GitHub

cd /d "%~dp0"

echo ============================================
echo   ACTUALIZANDO GESTIONDRIZA DESDE GITHUB
echo ============================================

echo.
echo [1/6] Creando respaldo temporal de archivos .env...

if not exist "_env_backup_temp" mkdir "_env_backup_temp"

if exist ".env" copy ".env" "_env_backup_temp\root.env" > nul
if exist ".env.local" copy ".env.local" "_env_backup_temp\root.env.local" > nul

if exist "backend\.env" copy "backend\.env" "_env_backup_temp\backend.env" > nul
if exist "backend\.env.local" copy "backend\.env.local" "_env_backup_temp\backend.env.local" > nul

if exist "frontend\.env" copy "frontend\.env" "_env_backup_temp\frontend.env" > nul
if exist "frontend\.env.local" copy "frontend\.env.local" "_env_backup_temp\frontend.env.local" > nul

echo.
echo [2/6] Verificando cambios locales...
git status --short

echo.
echo [3/6] Verificando rama actual...
for /f "tokens=*" %%i in ('git branch --show-current') do set RAMA_ACTUAL=%%i

echo Rama actual: %RAMA_ACTUAL%

echo.
echo [4/6] Trayendo ultimos cambios de GitHub...
git pull origin %RAMA_ACTUAL%

if errorlevel 1 (
    echo.
    echo ============================================
    echo   ERROR AL ACTUALIZAR
    echo ============================================
    echo.
    echo No se pudo hacer git pull.
    echo Puede haber conflictos o cambios locales sin guardar.
    echo Se restauraran los archivos .env.
    echo.
    goto restaurar_env
)

echo.
echo [5/6] Restaurando archivos .env...

:restaurar_env

if exist "_env_backup_temp\root.env" copy "_env_backup_temp\root.env" ".env" > nul
if exist "_env_backup_temp\root.env.local" copy "_env_backup_temp\root.env.local" ".env.local" > nul

if exist "_env_backup_temp\backend.env" copy "_env_backup_temp\backend.env" "backend\.env" > nul
if exist "_env_backup_temp\backend.env.local" copy "_env_backup_temp\backend.env.local" "backend\.env.local" > nul

if exist "_env_backup_temp\frontend.env" copy "_env_backup_temp\frontend.env" "frontend\.env" > nul
if exist "_env_backup_temp\frontend.env.local" copy "_env_backup_temp\frontend.env.local" "frontend\.env.local" > nul

echo.
echo [6/6] Limpiando respaldo temporal...

if exist "_env_backup_temp" rmdir /s /q "_env_backup_temp"

echo.
echo ============================================
echo   ACTUALIZACION FINALIZADA
echo ============================================
echo.
echo GestionDriza fue actualizado desde GitHub.
echo Tus archivos .env fueron conservados.
echo.

pause