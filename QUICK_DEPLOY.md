# Quick Deploy Guide

Fast track deployment for Atelier Spaces Nate.

## 🚀 Quick Start (5 steps)

### 1️⃣ Supabase (2 minutes)

```bash
# 1. Create project at https://app.supabase.com
# 2. Create storage bucket named: atelier-media (make it public)
# 3. Copy these from Settings → API:
#    - Project URL
#    - Anon key
# 4. Get database URL from Settings → Database → Connection string (URI format)
```

### 2️⃣ Heroku Backend (5 minutes)

```bash
# Install Heroku CLI (if needed)
# Windows: winget install Heroku.HerokuCLI

# Login and create app
heroku login
cd backend
heroku create your-app-name

# Set environment variables (replace with your values)
heroku config:set \
  SECRET_KEY="$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')" \
  DEBUG=False \
  DJANGO_SETTINGS_MODULE=api.settings_production \
  DATABASE_URL="your-supabase-db-url" \
  SUPABASE_URL="your-supabase-url" \
  SUPABASE_KEY="your-supabase-key" \
  SUPABASE_BUCKET="atelier-media" \
  ALLOWED_HOSTS="your-app-name.herokuapp.com" \
  CORS_ALLOWED_ORIGINS="http://localhost:3000"

# Deploy
git push heroku main

# Setup database
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
heroku run python manage.py collectstatic --noinput

# Test
heroku open
```

### 3️⃣ Netlify Frontend (3 minutes)

```bash
# Option A: Netlify Dashboard
# 1. Go to https://app.netlify.com
# 2. New site → Import from Git
# 3. Build settings:
#    - Base directory: frontend
#    - Build command: npm run build
#    - Publish directory: frontend/build
# 4. Add environment variable:
#    - REACT_APP_API_URL = https://your-app-name.herokuapp.com/api
# 5. Deploy

# Option B: Netlify CLI
npm install -g netlify-cli
netlify login
cd frontend
netlify init
netlify deploy --prod
```

### 4️⃣ Update CORS (1 minute)

```bash
# After getting Netlify URL, update Heroku CORS
heroku config:set CORS_ALLOWED_ORIGINS="https://your-site.netlify.app,http://localhost:3000"
```

### 5️⃣ Verify (2 minutes)

- ✅ Visit Netlify site
- ✅ Check API calls in DevTools
- ✅ Upload test image
- ✅ Verify in Supabase storage

## 📋 Environment Variables Summary

### Heroku (Backend)
```
SECRET_KEY=<generate-with-django>
DEBUG=False
DJANGO_SETTINGS_MODULE=api.settings_production
DATABASE_URL=<from-supabase>
SUPABASE_URL=<from-supabase>
SUPABASE_KEY=<from-supabase>
SUPABASE_BUCKET=atelier-media
ALLOWED_HOSTS=<your-heroku-app>.herokuapp.com
CORS_ALLOWED_ORIGINS=<your-netlify-url>,http://localhost:3000
```

### Netlify (Frontend)
```
REACT_APP_API_URL=https://<your-heroku-app>.herokuapp.com/api
```

## 🔧 Common Commands

```bash
# Heroku logs
heroku logs --tail

# Restart Heroku
heroku restart

# Run Django commands
heroku run python manage.py <command>

# Netlify redeploy
netlify deploy --prod

# Check Netlify logs
netlify logs
```

## 📚 Full Documentation

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## ❗ Troubleshooting

**CORS errors?**
```bash
heroku config:get CORS_ALLOWED_ORIGINS
# Should include your Netlify URL
```

**Backend not connecting?**
- Check `REACT_APP_API_URL` in Netlify env vars
- Verify Heroku app is running: `heroku ps`

**Images not uploading?**
- Verify Supabase credentials: `heroku config`
- Check bucket is public in Supabase dashboard
- Review logs: `heroku logs --tail`

## 🎯 Next Steps

- [ ] Configure custom domains
- [ ] Set up SSL certificates
- [ ] Enable auto-deploy from Git
- [ ] Add monitoring/error tracking
- [ ] Configure database backups
