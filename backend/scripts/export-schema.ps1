param(
  [string]$OutputPath = (Join-Path $PSScriptRoot '../../database/BBDD LAST VERSION/GestionDriza_SCHEMA_actual.sql')
)
$ErrorActionPreference = 'Stop'
Import-Module 'C:/Program Files (x86)/Microsoft SQL Server/160/Tools/PowerShell/Modules/SQLPS/SQLPS.psd1' -DisableNameChecking
$settings = @{}
foreach ($line in Get-Content (Join-Path $PSScriptRoot '../.env')) {
  if ($line -match '^\s*(DB_[A-Z_]+)\s*=\s*(.*?)\s*$') {
    $settings[$Matches[1]] = $Matches[2].Trim('"').Trim("'")
  }
}
$connection = New-Object Microsoft.SqlServer.Management.Common.ServerConnection
$connection.ServerInstance = $settings.DB_SERVER + ',' + $(if ($settings.DB_PORT) { $settings.DB_PORT } else { '1433' })
$connection.LoginSecure = $false
$connection.Login = $settings.DB_USER
$connection.Password = $settings.DB_PASSWORD
$connection.DatabaseName = $settings.DB_DATABASE
$connection.StatementTimeout = 120
try {
  $server = New-Object Microsoft.SqlServer.Management.Smo.Server($connection)
  $database = $server.Databases[$settings.DB_DATABASE]
  if (!$database) { throw 'No se encontro la base configurada.' }
  $objects = New-Object 'System.Collections.Generic.List[Microsoft.SqlServer.Management.Sdk.Sfc.Urn]'
  $schemaBatches = @()
  foreach ($schema in $database.Schemas) {
    if ($schema.Name -notin @('dbo','guest','sys','INFORMATION_SCHEMA','db_owner','db_accessadmin','db_securityadmin','db_ddladmin','db_backupoperator','db_datareader','db_datawriter','db_denydatareader','db_denydatawriter')) {
      $schemaBatches += 'CREATE SCHEMA [' + $schema.Name.Replace(']', ']]') + '] AUTHORIZATION [dbo];'
    }
  }
  foreach ($collection in @($database.UserDefinedDataTypes, $database.UserDefinedTableTypes, $database.Sequences, $database.Tables, $database.Views, $database.StoredProcedures, $database.UserDefinedFunctions, $database.Synonyms)) {
    foreach ($item in $collection) {
      if ($item.IsSystemObject) { continue }
      if ($item -is [Microsoft.SqlServer.Management.Smo.Schema] -and $item.Name -in @('dbo','guest','sys','INFORMATION_SCHEMA','db_owner','db_accessadmin','db_securityadmin','db_ddladmin','db_backupoperator','db_datareader','db_datawriter','db_denydatareader','db_denydatawriter')) { continue }
      $objects.Add($item.Urn)
    }
  }
  $scripter = New-Object Microsoft.SqlServer.Management.Smo.Scripter($server)
  $scripter.Options.ScriptSchema = $true
  $scripter.Options.ScriptData = $false
  $scripter.Options.WithDependencies = $true
  $scripter.Options.DriAll = $true
  $scripter.Options.Indexes = $true
  $scripter.Options.Triggers = $true
  $scripter.Options.SchemaQualify = $true
  $scripter.Options.NoCollation = $false
  $scripter.Options.IncludeDatabaseContext = $false
  try { $batches = $scripter.Script($objects.ToArray()) } catch {
    $cause = $_.Exception
    while ($cause.InnerException) { $cause = $cause.InnerException }
    throw $cause.Message
  }
  $header = '-- Exportacion de estructura, sin datos. Fecha UTC: ' + [DateTime]::UtcNow.ToString('s') + "`r`n"
  $content = $header + (($schemaBatches + @($batches)) -join "`r`nGO`r`n") + "`r`nGO`r`n"
  $fullPath = [IO.Path]::GetFullPath($OutputPath)
  [IO.File]::WriteAllText($fullPath, $content, (New-Object Text.UTF8Encoding($true)))
  Write-Output ('Esquema exportado: ' + $fullPath)
  Write-Output ('Tablas: ' + @($database.Tables | Where-Object { !$_.IsSystemObject }).Count)
} finally {
  $connection.Disconnect()
}
