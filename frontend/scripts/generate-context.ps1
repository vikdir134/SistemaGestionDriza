# ============================================================
# GestionDriza - Generador de contexto del Frontend
# ============================================================

$ErrorActionPreference = "Stop"

# Raíz del frontend = carpeta padre de /scripts
$Root = Split-Path -Parent $PSScriptRoot

$OutputFile = Join-Path $Root "GestionDriza_FRONTEND_CONTEXT.md"

# ============================================================
# Carpetas excluidas
# ============================================================

$ExcludedDirectories = @(
    "node_modules",
    ".git",
    "dist",
    "build",
    "coverage",
    ".idea",
    ".vscode",
    ".next",
    ".cache"
)

# ============================================================
# Archivos excluidos
# ============================================================

$ExcludedFiles = @(
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "GestionDriza_FRONTEND_CONTEXT.md"
)

# ============================================================
# Extensiones útiles para entender el frontend
# ============================================================

$AllowedExtensions = @(
    ".js",
    ".jsx",
    ".cjs",
    ".mjs",
    ".ts",
    ".tsx",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".html",
    ".json",
    ".md",
    ".svg",
    ".yml",
    ".yaml"
)

# ============================================================
# Detectar carpetas excluidas
# ============================================================

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

# ============================================================
# Información Git
# ============================================================

$Branch = "No disponible"
$Commit = "No disponible"

try {
    $Branch = git -C $Root branch --show-current 2>$null
    $Commit = git -C $Root rev-parse HEAD 2>$null
}
catch {
    # Git no disponible o no es repositorio
}

$GeneratedAt = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# ============================================================
# Buscar archivos
# ============================================================

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

        # Seguridad: nunca incluir .env
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

# ============================================================
# Encabezado
# ============================================================

$Content = @"
# GestionDriza - Frontend Context

> Archivo generado automáticamente.
> No editar manualmente.

## Información

- Proyecto: GestionDriza
- Componente: Frontend
- Fecha de generación: $GeneratedAt
- Branch Git: $Branch
- Commit Git: $Commit
- Cantidad de archivos incluidos: $($Files.Count)

---

# Estructura del proyecto

"@

# ============================================================
# Listado de archivos
# ============================================================

foreach ($File in $Files) {

    $RelativePath = $File.FullName.Substring($Root.Length).TrimStart("\", "/")

    $Content += "`n- $RelativePath"
}

$Content += @"


---

# Código fuente

"@

# ============================================================
# Contenido de cada archivo
# ============================================================

foreach ($File in $Files) {

    $RelativePath = $File.FullName.Substring($Root.Length).TrimStart("\", "/")

    Write-Host "Incluyendo: $RelativePath"

    try {
        $FileContent = Get-Content `
            -Path $File.FullName `
            -Raw `
            -Encoding UTF8
    }
    catch {
        Write-Host "No se pudo leer: $RelativePath"
        continue
    }

    $Content += @"


---

## FILE: $RelativePath

<<<START OF FILE>>>

$FileContent

<<<END OF FILE>>>

"@
}

# ============================================================
# Guardar
# ============================================================

Set-Content `
    -Path $OutputFile `
    -Value $Content `
    -Encoding UTF8

Write-Host ""
Write-Host "============================================"
Write-Host " Contexto Frontend generado correctamente"
Write-Host "============================================"
Write-Host ""
Write-Host "Archivo generado:"
Write-Host $OutputFile
Write-Host ""
Write-Host "Archivos incluidos: $($Files.Count)"
Write-Host ""