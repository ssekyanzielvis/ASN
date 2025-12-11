# Netlify Deployment Helper Script
# Run this from the project root directory

Write-Host "=== Atelier Spaces Nate - Netlify Deployment Helper ===" -ForegroundColor Cyan
Write-Host ""

# Check if Netlify CLI is installed
try {
    $netlifyVersion = netlify --version
    Write-Host "✓ Netlify CLI detected: $netlifyVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Netlify CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g netlify-cli
    Write-Host "✓ Netlify CLI installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Step 1: Login to Netlify ===" -ForegroundColor Cyan
netlify login

Write-Host ""
Write-Host "=== Step 2: Navigate to Frontend ===" -ForegroundColor Cyan
Set-Location frontend

Write-Host ""
Write-Host "=== Step 3: Install Dependencies ===" -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "=== Step 4: Initialize Netlify ===" -ForegroundColor Cyan
Write-Host "When prompted:" -ForegroundColor Yellow
Write-Host "  - Create & configure a new site" -ForegroundColor White
Write-Host "  - Choose your team" -ForegroundColor White
Write-Host "  - Site name: atelier-spaces-nate (or your choice)" -ForegroundColor White
Write-Host "  - Build command: npm run build" -ForegroundColor White
Write-Host "  - Publish directory: build" -ForegroundColor White
Write-Host ""

netlify init

Write-Host ""
Write-Host "=== Step 5: Set Environment Variable ===" -ForegroundColor Cyan
$backendUrl = Read-Host "Enter your Heroku backend URL (e.g., https://your-app.herokuapp.com)"
$apiUrl = "$backendUrl/api"

# Create netlify.toml env section if not exists
Write-Host "Setting REACT_APP_API_URL environment variable..." -ForegroundColor Yellow
netlify env:set REACT_APP_API_URL $apiUrl

Write-Host ""
Write-Host "=== Step 6: Deploy to Netlify ===" -ForegroundColor Cyan
netlify deploy --prod

Write-Host ""
Write-Host "=== Deployment Complete! ===" -ForegroundColor Green
Write-Host ""

# Get site info
$siteInfo = netlify status --json | ConvertFrom-Json
$siteUrl = $siteInfo.siteUrl

Write-Host "Your frontend is now deployed at: $siteUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Update your backend CORS settings!" -ForegroundColor Yellow
Write-Host "Run this command:" -ForegroundColor White
Write-Host "  heroku config:set CORS_ALLOWED_ORIGINS=`"$siteUrl,http://localhost:3000`"" -ForegroundColor Gray
Write-Host ""
Write-Host "Test your deployment:" -ForegroundColor Yellow
Write-Host "1. Visit: $siteUrl" -ForegroundColor White
Write-Host "2. Check browser console for any errors" -ForegroundColor White
Write-Host "3. Test API connection" -ForegroundColor White
Write-Host ""

Set-Location ..
