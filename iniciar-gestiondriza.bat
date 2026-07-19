@echo off
title Iniciar GestionDriza

cd /d "%~dp0"

echo ============================================
echo   INICIANDO SISTEMA GESTIONDRIZA
echo ============================================

echo.
echo [1/3] Iniciando backend...
start "GestionDriza Backend" cmd /k "pushd ""%~dp0backend"" && call npm.cmd run dev"

timeout /t 4 > nul

echo.
echo [2/3] Iniciando frontend...
start "GestionDriza Frontend" cmd /k "pushd ""%~dp0frontend"" && call npm.cmd run dev"

timeout /t 5 > nul

echo.
echo [3/3] Abriendo Google Chrome...
start chrome http://localhost:5173

echo.
echo ============================================
echo   GESTIONDRIZA INICIADO CORRECTAMENTE
echo ============================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173
echo.

exit