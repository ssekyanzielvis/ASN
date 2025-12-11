# Deployment Checklist

## Pre-Deployment

- [ ] All code committed to Git
- [ ] Tests passing locally
- [ ] Environment variables documented in `.env.example` files
- [ ] Static files tested locally

## Supabase Setup

- [ ] Project created on Supabase
- [ ] Database password saved securely
- [ ] Storage bucket `atelier-media` created
- [ ] Bucket set to public
- [ ] Project URL and API key copied

## Heroku Backend

- [ ] Heroku CLI installed
- [ ] Heroku app created
- [ ] All environment variables set:
  - [ ] SECRET_KEY
  - [ ] DEBUG=False
  - [ ] DJANGO_SETTINGS_MODULE
  - [ ] DATABASE_URL (Supabase)
  - [ ] SUPABASE_URL
  - [ ] SUPABASE_KEY
  - [ ] SUPABASE_BUCKET
  - [ ] ALLOWED_HOSTS
  - [ ] CORS_ALLOWED_ORIGINS
- [ ] Code pushed to Heroku
- [ ] Database migrations run
- [ ] Superuser created
- [ ] Static files collected
- [ ] Backend URL accessible

## Netlify Frontend

- [ ] Netlify account created
- [ ] Site deployed from Git or CLI
- [ ] Build settings configured:
  - [ ] Base directory: `frontend`
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `frontend/build`
- [ ] Environment variable set:
  - [ ] REACT_APP_API_URL (Heroku backend URL)
- [ ] Frontend URL accessible

## Post-Deployment

- [ ] CORS updated on Heroku with Netlify URL
- [ ] ALLOWED_HOSTS updated with Heroku URL
- [ ] API accessible from frontend
- [ ] Test complete user flow:
  - [ ] Homepage loads
  - [ ] Projects page loads
  - [ ] News page loads
  - [ ] Contact form works
  - [ ] Admin panel accessible
  - [ ] Image uploads work
  - [ ] Images display correctly
- [ ] Check Supabase storage for uploaded files
- [ ] Monitor Heroku logs for errors
- [ ] Check Netlify build logs

## Optional Enhancements

- [ ] Custom domain configured (Netlify)
- [ ] Custom domain configured (Heroku)
- [ ] SSL certificate verified
- [ ] Set up monitoring/alerts
- [ ] Configure automatic backups (Supabase)
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Enable Heroku auto-scaling if needed
- [ ] Configure CDN if needed

## Maintenance

- [ ] Document all credentials securely
- [ ] Set up regular backup schedule
- [ ] Plan for database maintenance
- [ ] Monitor usage/costs
- [ ] Keep dependencies updated
