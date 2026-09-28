$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$skillFile = Join-Path $repoRoot "SKILL.md"
$refDir = Join-Path $repoRoot "references"
$targetDir = Join-Path $env:USERPROFILE ".scout\m-skills\face-it"
$targetFile = Join-Path $targetDir "SKILL.md"
$targetRefDir = Join-Path $targetDir "references"

if (-not (Test-Path $skillFile)) {
  throw "Missing SKILL.md at $skillFile"
}

New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
Copy-Item -Path $skillFile -Destination $targetFile -Force
if (Test-Path $refDir) {
  New-Item -ItemType Directory -Force -Path $targetRefDir | Out-Null
  Copy-Item -Path (Join-Path $refDir "*.md") -Destination $targetRefDir -Force
}

Write-Host "Installed Face-It skill to $targetFile"
Write-Host "Restart Clawpilot, then use /face-it or ask for frontend visual QA."
