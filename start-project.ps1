# Atelier Spaces Nate - Complete Project Startup
# This script starts both backend and frontend in separate PowerShell windows

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   Atelier Spaces Nate - Full Stack Startup      " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start Backend
Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-File", "$projectRoot\backend\start-backend.ps1"

# Wait a moment before starting frontend
Start-Sleep -Seconds 2

# Start Frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-File", "$projectRoot\frontend\start-frontend.ps1"

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host "   Both servers are starting in new windows!     " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Admin:    http://localhost:8000/admin/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
