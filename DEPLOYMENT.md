# Atelier Spaces Nate - Deployment Guide

## Prerequisites

- Python 3.9+
- Node.js 16+
- PostgreSQL (for production)
- Git

## Backend Deployment (Heroku)

### 1. Prepare Your Application

```bash
cd backend

# Create runtime.txt to specify Python version
echo "python-3.11.0" > runtime.txt

# Ensure all dependencies are in requirements.txt
pip freeze > requirements.txt
```

### 2. Configure Environment Variables

Set the following environment variables in Heroku:

```bash
heroku config:set SECRET_KEY="your-secret-key"
heroku config:set DEBUG=False
heroku config:set ALLOWED_HOSTS="your-app.herokuapp.com"
heroku config:set CORS_ALLOWED_ORIGINS="https://your-frontend-domain.com"
```

### 3. Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create atelier-spaces-nate-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main

# Run migrations
heroku run python manage.py migrate

# Create superuser
heroku run python manage.py createsuperuser

# Collect static files
heroku run python manage.py collectstatic --noinput
```

## Frontend Deployment (Vercel)

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Configure Environment Variables

Create `.env.production` in the frontend directory:

```
REACT_APP_API_URL=https://your-backend.herokuapp.com/api
```

### 3. Deploy to Vercel

```bash
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 4. Configure Vercel Settings

In Vercel dashboard:
- Set Build Command: `npm run build`
- Set Output Directory: `build`
- Add environment variable: `REACT_APP_API_URL`

## Alternative: Manual Deployment

### Backend (VPS/DigitalOcean)

1. Set up server with Ubuntu 20.04+
2. Install Python, PostgreSQL, Nginx
3. Clone repository
4. Set up virtual environment
5. Configure Gunicorn and systemd service
6. Configure Nginx as reverse proxy
7. Set up SSL with Let's Encrypt

### Frontend (Netlify)

1. Connect repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Add environment variables
4. Configure custom domain and SSL

## Post-Deployment

### 1. Create Initial Content

Access Django admin at `https://your-backend-domain.com/admin/` and:
- Create categories
- Add projects
- Write news articles
- Configure site settings

### 2. Test All Features

- Browse projects
- Read news articles
- Submit collaboration requests
- Test admin functionality

### 3. Set Up Monitoring

- Configure error tracking (Sentry)
- Set up uptime monitoring
- Enable performance monitoring
- Configure backup schedules

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Review collaboration requests
- Back up database weekly
- Monitor server logs
- Update content regularly

### Backup Strategy

```bash
# Backup database
heroku pg:backups:capture --app your-app-name
heroku pg:backups:download --app your-app-name

# Backup media files (if using AWS S3, automated)
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check CORS_ALLOWED_ORIGINS in settings
2. **Database Connection**: Verify DATABASE_URL environment variable
3. **Static Files Not Loading**: Run `collectstatic` command
4. **502 Bad Gateway**: Check Gunicorn logs and restart service

### Useful Commands

```bash
# View Heroku logs
heroku logs --tail

# Restart Heroku app
heroku restart

# Access Django shell
heroku run python manage.py shell

# Reset database (CAUTION: Deletes all data)
heroku pg:reset DATABASE_URL
heroku run python manage.py migrate
```
