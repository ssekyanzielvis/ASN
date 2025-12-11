# Heroku Deployment Helper Script
# Run this from the project root directory

Write-Host "=== Atelier Spaces Nate - Heroku Deployment Helper ===" -ForegroundColor Cyan
Write-Host ""

# Check if Heroku CLI is installed
try {
    $herokuVersion = heroku --version
    Write-Host "✓ Heroku CLI detected" -ForegroundColor Green
} catch {
    Write-Host "✗ Heroku CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "  winget install Heroku.HerokuCLI" -ForegroundColor Yellow
    exit 1
}

# Navigate to backend directory
Set-Location backend

Write-Host ""
Write-Host "=== Step 1: Create Heroku App ===" -ForegroundColor Cyan
$appName = Read-Host "Enter your Heroku app name (or press Enter to auto-generate)"

if ($appName) {
    heroku create $appName
} else {
    heroku create
}

Write-Host ""
Write-Host "=== Step 2: Generate Django Secret Key ===" -ForegroundColor Cyan
$secretKey = python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
Write-Host "Generated secret key (save this!): $secretKey" -ForegroundColor Yellow

Write-Host ""
Write-Host "=== Step 3: Supabase Configuration ===" -ForegroundColor Cyan
Write-Host "Please enter your Supabase credentials:" -ForegroundColor Yellow
$databaseUrl = Read-Host "Database URL (from Supabase Settings → Database)"
$supabaseUrl = Read-Host "Supabase URL (from Supabase Settings → API)"
$supabaseKey = Read-Host "Supabase Anon Key (from Supabase Settings → API)"

Write-Host ""
Write-Host "=== Step 4: Setting Environment Variables ===" -ForegroundColor Cyan

# Get the Heroku app URL
$herokuInfo = heroku apps:info --json | ConvertFrom-Json
$herokuUrl = $herokuInfo.app.web_url -replace "https://", "" -replace "/$", ""

# Set all config vars
heroku config:set SECRET_KEY="$secretKey"
heroku config:set DEBUG=False
heroku config:set DJANGO_SETTINGS_MODULE=api.settings_production
heroku config:set DATABASE_URL="$databaseUrl"
heroku config:set SUPABASE_URL="$supabaseUrl"
heroku config:set SUPABASE_KEY="$supabaseKey"
heroku config:set SUPABASE_BUCKET="atelier-media"
heroku config:set ALLOWED_HOSTS="$herokuUrl"
heroku config:set CORS_ALLOWED_ORIGINS="http://localhost:3000"

Write-Host "✓ Environment variables set" -ForegroundColor Green

Write-Host ""
Write-Host "=== Step 5: Deploying to Heroku ===" -ForegroundColor Cyan
Set-Location ..
git add .
$commitMsg = Read-Host "Enter commit message (or press Enter for default)"
if (-not $commitMsg) {
    $commitMsg = "Configure for Heroku deployment"
}
git commit -m "$commitMsg"
git push heroku main

Write-Host ""
Write-Host "=== Step 6: Running Database Migrations ===" -ForegroundColor Cyan
Set-Location backend
heroku run python manage.py migrate

Write-Host ""
Write-Host "=== Step 7: Creating Superuser ===" -ForegroundColor Cyan
Write-Host "Creating Django superuser (you'll be prompted for credentials):" -ForegroundColor Yellow
heroku run python manage.py createsuperuser

Write-Host ""
Write-Host "=== Step 8: Collecting Static Files ===" -ForegroundColor Cyan
heroku run python manage.py collectstatic --noinput

Write-Host ""
Write-Host "=== Deployment Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Your backend is now deployed at: https://$herokuUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Test your API: https://$herokuUrl/api/" -ForegroundColor White
Write-Host "2. Deploy your frontend to Netlify" -ForegroundColor White
Write-Host "3. Update CORS with your Netlify URL:" -ForegroundColor White
Write-Host "   heroku config:set CORS_ALLOWED_ORIGINS=`"https://your-site.netlify.app,http://localhost:3000`"" -ForegroundColor Gray
Write-Host ""
Write-Host "View logs: heroku logs --tail" -ForegroundColor White
Write-Host "Open app: heroku open" -ForegroundColor White
Write-Host ""

Set-Location ..
