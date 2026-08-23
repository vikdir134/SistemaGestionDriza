# ============================================================
# GestionDriza - Generador de contexto del Backend
# ============================================================

$ErrorActionPreference = "Stop"

# La raíz será la carpeta padre de /scripts
$Root = Split-Path -Parent $PSScriptRoot

$OutputFile = Join-Path $Root "GestionDriza_BACKEND_CONTEXT.md"

# Carpetas que NO deben incluirse
$ExcludedDirectories = @(
    "node_modules",
    ".git",
    "dist",
    "build",
    "coverage",
    ".idea",
    ".vscode"
)

# Archivos que NO deben incluirse
$ExcludedFiles = @(
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "GestionDriza_BACKEND_CONTEXT.md"
)

# Extensiones de código/configuración que sí queremos incluir
$AllowedExtensions = @(
    ".js",
    ".cjs",
    ".mjs",
    ".ts",
    ".tsx",
    ".json",
    ".sql",
    ".prisma",
    ".yml",
    ".yaml"
)

# ------------------------------------------------------------
# Función: comprobar si un archivo pertenece a una carpeta
# excluida
# ------------------------------------------------------------

function Test-ExcludedPath {
    param (
        [string]$FullPath
    )

    $RelativePath = $FullPath.Substring($Root.Length).TrimStart("\", "/")

    $Parts = $RelativePath -split "[\\/]"

    foreach ($Part in $Parts) {
        if ($ExcludedDirectories -contains $Part) {
            return $true
        }
    }

    return $false
}

# ------------------------------------------------------------
# Obtener Git
# ------------------------------------------------------------

$Branch = "No disponible"
$Commit = "No disponible"

try {
    $Branch = git -C $Root branch --show-current 2>$null
    $Commit = git -C $Root rev-parse HEAD 2>$null
}
catch {
    # Git no disponible o carpeta sin repositorio
}

$GeneratedAt = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# ------------------------------------------------------------
# Obtener archivos
# ------------------------------------------------------------

$Files = Get-ChildItem `
    -Path $Root `
    -Recurse `
    -File |
    Where-Object {

        $File = $_

        # Excluir carpetas
        if (Test-ExcludedPath $File.FullName) {
            return $false
        }

        # Excluir archivos concretos
        if ($ExcludedFiles -contains $File.Name) {
            return $false
        }

        # PROTECCIÓN:
        # nunca incluir archivos .env
        if ($File.Name -like ".env*") {
            return $false
        }

        # Solo extensiones permitidas
        if ($AllowedExtensions -notcontains $File.Extension.ToLower()) {
            return $false
        }

        return $true
    } |
    Sort-Object FullName

# ------------------------------------------------------------
# Crear encabezado
# ------------------------------------------------------------

$Content = @"
# GestionDriza - Backend Context

> Archivo generado automáticamente.
> No editar manualmente.

## Información

- **Proyecto:** GestionDriza
- **Componente:** Backend
- **Fecha de generación:** $GeneratedAt
- **Branch Git:** $Branch
- **Commit Git:** $Commit
- **Cantidad de archivos incluidos:** $($Files.Count)

---

## Estructura de archivos

```text
"@

# ------------------------------------------------------------
# Generar listado / árbol simple
# ------------------------------------------------------------

foreach ($File in $Files) {

    $RelativePath = $File.FullName.Substring($Root.Length).TrimStart("\", "/")

    $Content += "`n$RelativePath"
}

$Content += @"
~~~
"@

# ------------------------------------------------------------
# Agregar contenido de cada archivo
# ------------------------------------------------------------

foreach ($File in $Files) {

    $RelativePath = $File.FullName.Substring($Root.Length).TrimStart("\", "/")

    $Extension = $File.Extension.TrimStart(".").ToLower()

    switch ($Extension) {
        "js"     { $Language = "javascript" }
        "cjs"    { $Language = "javascript" }
        "mjs"    { $Language = "javascript" }
        "ts"     { $Language = "typescript" }
        "tsx"    { $Language = "typescript" }
        "json"   { $Language = "json" }
        "sql"    { $Language = "sql" }
        "yml"    { $Language = "yaml" }
        "yaml"   { $Language = "yaml" }
        "prisma" { $Language = "prisma" }
        default  { $Language = "text" }
    }

    Write-Host "Incluyendo: $RelativePath"

    $FileContent = Get-Content `
        -Path $File.FullName `
        -Raw `
        -Encoding UTF8

    $Content += @"

---

## $RelativePath

~~~$Language
$FileContent
~~~

"@
}

# ------------------------------------------------------------
# Guardar archivo final
# ------------------------------------------------------------

Set-Content `
    -Path $OutputFile `
    -Value $Content `
    -Encoding UTF8

Write-Host ""
Write-Host "============================================"
Write-Host " Contexto generado correctamente"
Write-Host "============================================"
Write-Host ""
Write-Host "Archivo generado:"
Write-Host $OutputFile
Write-Host ""
Write-Host "Archivos incluidos: $($Files.Count)"
Write-Host ""