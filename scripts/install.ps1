# GSD for Antigravity — Windows Installer
# Copies workflow files into ~/.gemini/antigravity/.agent/workflows/

param(
    [switch]$Local,
    [switch]$Global,
    [switch]$Help
)

$Cyan = "`e[36m"
$Green = "`e[32m"
$Yellow = "`e[33m"
$NC = "`e[0m"

Write-Host ""
Write-Host "${Cyan}   ██████╗ ███████╗██████╗ " 
Write-Host "  ██╔════╝ ██╔════╝██╔══██╗"
Write-Host "  ██║  ███╗███████╗██║  ██║"
Write-Host "  ██║   ██║╚════██║██║  ██║"
Write-Host "  ╚██████╔╝███████║██████╔╝"
Write-Host "   ╚═════╝ ╚══════╝╚═════╝ ${NC}"
Write-Host ""
Write-Host "  GSD for Antigravity"
Write-Host "  Spec-driven development workflows"
Write-Host ""

if ($Help) {
    Write-Host "Usage: install.ps1 [-Global] [-Local]"
    Write-Host ""
    Write-Host "  -Global    Install to ~/.gemini/antigravity/.agent/ (default)"
    Write-Host "  -Local     Install to ./.agent/ in current directory"
    exit 0
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoDir = Split-Path -Parent $ScriptDir
$WorkflowsSrc = Join-Path $RepoDir "workflows"
$AgentsSrc = Join-Path $RepoDir "agents"
$TemplatesSrc = Join-Path $RepoDir "templates"
$ReferencesSrc = Join-Path $RepoDir "references"

if ($Local) {
    $TargetDir = Join-Path (Get-Location) ".agent"
    Write-Host "  ${Yellow}Installing locally${NC} to ${Cyan}$TargetDir${NC}"
} else {
    $TargetDir = Join-Path $env:USERPROFILE ".gemini\antigravity\.agent"
    Write-Host "  ${Yellow}Installing globally${NC} to ${Cyan}$TargetDir${NC}"
}

Write-Host ""

# Create target directories
$WorkflowsTarget = Join-Path $TargetDir "workflows"
New-Item -ItemType Directory -Force -Path $WorkflowsTarget | Out-Null

# Copy workflows
Write-Host -NoNewline "  Installing workflows..."
Copy-Item -Path (Join-Path $WorkflowsSrc "*.md") -Destination $WorkflowsTarget -Force
Write-Host " ${Green}✓${NC}"

# Copy agents
if (Test-Path $AgentsSrc) {
    $AgentsTarget = Join-Path $TargetDir "agents"
    New-Item -ItemType Directory -Force -Path $AgentsTarget | Out-Null
    Write-Host -NoNewline "  Installing agents..."
    Copy-Item -Path (Join-Path $AgentsSrc "*.md") -Destination $AgentsTarget -Force
    Write-Host " ${Green}✓${NC}"
}

# Copy templates
if (Test-Path $TemplatesSrc) {
    $TemplatesTarget = Join-Path $TargetDir "templates"
    New-Item -ItemType Directory -Force -Path $TemplatesTarget | Out-Null
    Write-Host -NoNewline "  Installing templates..."
    Copy-Item -Path (Join-Path $TemplatesSrc "*.md") -Destination $TemplatesTarget -Force
    Copy-Item -Path (Join-Path $TemplatesSrc "*.json") -Destination $TemplatesTarget -Force -ErrorAction SilentlyContinue
    Write-Host " ${Green}✓${NC}"
}

# Copy references
if (Test-Path $ReferencesSrc) {
    $ReferencesTarget = Join-Path $TargetDir "references"
    New-Item -ItemType Directory -Force -Path $ReferencesTarget | Out-Null
    Write-Host -NoNewline "  Installing references..."
    Copy-Item -Path (Join-Path $ReferencesSrc "*.md") -Destination $ReferencesTarget -Force
    Write-Host " ${Green}✓${NC}"
}

Write-Host ""
Write-Host "  ${Green}✓ Installation complete!${NC}"
Write-Host ""
Write-Host "  Start with: /gsd-help"
Write-Host ""
