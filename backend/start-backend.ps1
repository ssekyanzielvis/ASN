# Atelier Spaces Nate - Backend Startup Script
# Run this script to start the Django backend server

Write-Host "Starting Atelier Spaces Nate Backend..." -ForegroundColor Green
Write-Host ""

# Navigate to backend directory
$backendPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $backendPath

# Check if virtual environment exists
if (Test-Path "venv") {
    Write-Host "Activating virtual environment..." -ForegroundColor Yellow
    .\venv\Scripts\Activate.ps1
} else {
    Write-Host "Virtual environment not found. Creating..." -ForegroundColor Yellow
    python -m venv venv
    .\venv\Scripts\Activate.ps1
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    pip install -r requirements.txt
}

# Check if database exists
if (-not (Test-Path "db.sqlite3")) {
    Write-Host "Database not found. Running migrations..." -ForegroundColor Yellow
    python manage.py migrate
    Write-Host ""
    Write-Host "Please create a superuser:" -ForegroundColor Cyan
    python manage.py createsuperuser
}

Write-Host ""
Write-Host "Starting Django server..." -ForegroundColor Green
Write-Host "Backend will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Admin panel: http://localhost:8000/admin/" -ForegroundColor Cyan
Write-Host "API documentation: http://localhost:8000/swagger/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

python manage.py runserver
