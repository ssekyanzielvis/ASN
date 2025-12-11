# Atelier Spaces Nate - Frontend Startup Script
# Run this script to start the React frontend server

Write-Host "Starting Atelier Spaces Nate Frontend..." -ForegroundColor Green
Write-Host ""

# Navigate to frontend directory
$frontendPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $frontendPath

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "Starting React development server..." -ForegroundColor Green
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm start
