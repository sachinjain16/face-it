$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$skillFile = Join-Path $repoRoot "SKILL.md"
$targetDir = Join-Path $env:USERPROFILE ".copilot\m-skills\face-it"
$targetFile = Join-Path $targetDir "SKILL.md"

if (-not (Test-Path $skillFile)) {
  throw "Missing SKILL.md at $skillFile"
}

New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
Copy-Item -Path $skillFile -Destination $targetFile -Force

Write-Host "Installed Face-It skill to $targetFile"
Write-Host "Restart Clawpilot, then use /face-it or ask for frontend visual QA."
