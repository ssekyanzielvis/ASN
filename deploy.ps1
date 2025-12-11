# Master Deployment Script
# This script guides you through the entire deployment process

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Atelier Spaces Nate Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will help you deploy:" -ForegroundColor Yellow
Write-Host "  ✓ Backend to Heroku" -ForegroundColor White
Write-Host "  ✓ Frontend to Netlify" -ForegroundColor White
Write-Host "  ✓ Database & Storage on Supabase" -ForegroundColor White
Write-Host ""

# Check prerequisites
Write-Host "=== Checking Prerequisites ===" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Git
try {
    git --version | Out-Null
    Write-Host "✓ Git installed" -ForegroundColor Green
} catch {
    Write-Host "✗ Git not found" -ForegroundColor Red
    $allGood = $false
}

# Check Python
try {
    python --version | Out-Null
    Write-Host "✓ Python installed" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found" -ForegroundColor Red
    $allGood = $false
}

# Check Node.js
try {
    node --version | Out-Null
    Write-Host "✓ Node.js installed" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found" -ForegroundColor Red
    $allGood = $false
}

# Check Heroku CLI
try {
    heroku --version | Out-Null
    Write-Host "✓ Heroku CLI installed" -ForegroundColor Green
} catch {
    Write-Host "✗ Heroku CLI not found. Install with: winget install Heroku.HerokuCLI" -ForegroundColor Yellow
    $allGood = $false
}

if (-not $allGood) {
    Write-Host ""
    Write-Host "Please install missing prerequisites and try again." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Deployment Steps ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "We'll deploy in this order:" -ForegroundColor Yellow
Write-Host "  1. Supabase Setup (manual)" -ForegroundColor White
Write-Host "  2. Heroku Backend (automated)" -ForegroundColor White
Write-Host "  3. Netlify Frontend (automated)" -ForegroundColor White
Write-Host ""

# Step 1: Supabase
Write-Host "=== Step 1: Supabase Setup ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please complete these steps manually:" -ForegroundColor Yellow
Write-Host "  1. Go to https://app.supabase.com" -ForegroundColor White
Write-Host "  2. Create a new project" -ForegroundColor White
Write-Host "  3. Go to Storage → Create a bucket named 'atelier-media' (make it public)" -ForegroundColor White
Write-Host "  4. Go to Settings → API and copy:" -ForegroundColor White
Write-Host "     - Project URL" -ForegroundColor Gray
Write-Host "     - Anon/Public key" -ForegroundColor Gray
Write-Host "  5. Go to Settings → Database → Connection string and copy URI format" -ForegroundColor White
Write-Host ""

$ready = Read-Host "Have you completed the Supabase setup? (yes/no)"
if ($ready -ne "yes") {
    Write-Host "Please complete Supabase setup first, then run this script again." -ForegroundColor Yellow
    exit 0
}

# Step 2: Heroku
Write-Host ""
Write-Host "=== Step 2: Deploy Backend to Heroku ===" -ForegroundColor Cyan
Write-Host ""
$deployHeroku = Read-Host "Deploy to Heroku now? (yes/no)"
if ($deployHeroku -eq "yes") {
    .\deploy-heroku.ps1
    $herokuUrl = Read-Host "Enter your Heroku app URL (e.g., https://your-app.herokuapp.com)"
} else {
    Write-Host "Skipping Heroku deployment." -ForegroundColor Yellow
    $herokuUrl = Read-Host "Enter your existing Heroku app URL"
}

# Step 3: Netlify
Write-Host ""
Write-Host "=== Step 3: Deploy Frontend to Netlify ===" -ForegroundColor Cyan
Write-Host ""
$deployNetlify = Read-Host "Deploy to Netlify now? (yes/no)"
if ($deployNetlify -eq "yes") {
    # Pass Heroku URL to Netlify script
    $env:HEROKU_URL = $herokuUrl
    .\deploy-netlify.ps1
} else {
    Write-Host "Skipping Netlify deployment." -ForegroundColor Yellow
}

# Final steps
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Deployment Summary" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Services:" -ForegroundColor Cyan
Write-Host "  • Backend (Heroku): $herokuUrl" -ForegroundColor White
Write-Host "  • Frontend (Netlify): Check output above" -ForegroundColor White
Write-Host "  • Database: Supabase" -ForegroundColor White
Write-Host "  • Storage: Supabase" -ForegroundColor White
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Update CORS on Heroku with your Netlify URL" -ForegroundColor White
Write-Host "  2. Test your application end-to-end" -ForegroundColor White
Write-Host "  3. Create a superuser for admin access" -ForegroundColor White
Write-Host "  4. Upload some test content" -ForegroundColor White
Write-Host ""

Write-Host "Useful Commands:" -ForegroundColor Yellow
Write-Host "  heroku logs --tail          # View backend logs" -ForegroundColor Gray
Write-Host "  netlify logs                # View frontend logs" -ForegroundColor Gray
Write-Host "  heroku open                 # Open backend in browser" -ForegroundColor Gray
Write-Host "  netlify open                # Open frontend in browser" -ForegroundColor Gray
Write-Host ""

Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "  • Quick Guide: QUICK_DEPLOY.md" -ForegroundColor White
Write-Host "  • Full Guide: DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host "  • Checklist: DEPLOYMENT_CHECKLIST.md" -ForegroundColor White
Write-Host ""

Write-Host "Deployment complete! 🚀" -ForegroundColor Green
Write-Host ""
