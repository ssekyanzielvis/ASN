# Deployment Guide

This guide covers deploying the Atelier Spaces Nate application with:
- **Frontend**: Netlify
- **Backend**: Heroku
- **Database & Storage**: Supabase

## Prerequisites

- Git repository set up
- Node.js 18+ installed
- Python 3.11+ installed
- Accounts created on:
  - [Netlify](https://netlify.com)
  - [Heroku](https://heroku.com)
  - [Supabase](https://supabase.com)

## Part 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Set project name: `atelier-spaces-nate`
5. Create a strong database password (save this!)
6. Select a region close to your users
7. Click "Create new project"

### 1.2 Get Database Connection String

1. In your project dashboard, go to **Settings** → **Database**
2. Under "Connection string", copy the **URI** format
3. It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres`
4. Replace `[YOUR-PASSWORD]` with your database password

### 1.3 Create Storage Bucket

1. Go to **Storage** in the sidebar
2. Click "Create a new bucket"
3. Name: `atelier-media`
4. Make it **Public** (for images and files)
5. Click "Create bucket"
6. Go to **Settings** → **API** and copy:
   - Project URL
   - Anon/Public key

## Part 2: Heroku Backend Deployment

### 2.1 Install Heroku CLI

```bash
# Windows (using winget)
winget install Heroku.HerokuCLI

# Or download from https://devcenter.heroku.com/articles/heroku-cli
```

### 2.2 Login to Heroku

```bash
heroku login
```

### 2.3 Create Heroku App

```bash
cd backend
heroku create your-app-name
```

### 2.4 Set Environment Variables

```bash
# Django settings
heroku config:set SECRET_KEY="your-secret-key-here"
heroku config:set DEBUG=False
heroku config:set DJANGO_SETTINGS_MODULE=api.settings_production

# Database (from Supabase)
heroku config:set DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres"

# Supabase Storage
heroku config:set SUPABASE_URL="https://[PROJECT-ID].supabase.co"
heroku config:set SUPABASE_KEY="your-supabase-anon-key"
heroku config:set SUPABASE_BUCKET="atelier-media"

# CORS (will update after Netlify deployment)
heroku config:set CORS_ALLOWED_ORIGINS="http://localhost:3000"

# Allowed hosts (update with your Heroku app URL)
heroku config:set ALLOWED_HOSTS="your-app-name.herokuapp.com"
```

To generate a secure SECRET_KEY:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 2.5 Deploy to Heroku

```bash
# From project root
git add .
git commit -m "Configure for Heroku deployment"
git push heroku main

# Or if your main branch is named differently
git push heroku your-branch-name:main
```

### 2.6 Run Database Migrations

```bash
heroku run python backend/manage.py migrate
heroku run python backend/manage.py createsuperuser
heroku run python backend/manage.py collectstatic --noinput
```

### 2.7 Test Backend

Visit: `https://your-app-name.herokuapp.com/api/`

You should see the API documentation.

## Part 3: Netlify Frontend Deployment

### 3.1 Prepare Frontend

Update the environment configuration for production:

1. Go to `frontend/.env.example`
2. Note the production URL format

### 3.2 Deploy to Netlify

#### Option A: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from frontend directory
cd frontend
netlify init

# Follow prompts:
# - Create & configure a new site
# - Team: Your team
# - Site name: atelier-spaces-nate (or your choice)
# - Build command: npm run build
# - Publish directory: build

# Deploy
netlify deploy --prod
```

#### Option B: Using Netlify Dashboard

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
6. Click "Deploy site"

### 3.3 Configure Netlify Environment Variables

1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Add:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-app-name.herokuapp.com/api`
3. Save and trigger a new deploy

### 3.4 Update Backend CORS Settings

Now that you have your Netlify URL, update Heroku:

```bash
heroku config:set CORS_ALLOWED_ORIGINS="https://your-site-name.netlify.app,http://localhost:3000"
heroku config:set ALLOWED_HOSTS="your-app-name.herokuapp.com"
```

## Part 4: Verification & Testing

### 4.1 Test the Complete Flow

1. **Visit your Netlify site**: `https://your-site-name.netlify.app`
2. **Check API connection**: Network tab in DevTools should show successful API calls
3. **Test image uploads**: Upload a project image
4. **Verify Supabase**: Check that images appear in your Supabase storage bucket

### 4.2 Common Issues & Solutions

#### CORS Errors
```bash
# Ensure CORS is properly configured on Heroku
heroku config:get CORS_ALLOWED_ORIGINS
# Should include your Netlify URL
```

#### Database Connection Issues
```bash
# Check database connection
heroku run python backend/manage.py dbshell
```

#### Static Files Not Loading
```bash
# Collect static files again
heroku run python backend/manage.py collectstatic --noinput
```

#### Environment Variables Not Working
```bash
# List all config vars
heroku config

# Restart dynos after config changes
heroku restart
```

## Part 5: Continuous Deployment

### 5.1 Auto-Deploy from Git

**Heroku:**
1. Go to Heroku Dashboard → Your app → Deploy
2. Connect to GitHub
3. Enable "Automatic deploys" from main branch

**Netlify:**
- Automatically enabled when using Git deployment
- Every push to main branch triggers a new build

### 5.2 Monitoring

**Heroku:**
```bash
# View logs
heroku logs --tail

# Check dyno status
heroku ps
```

**Netlify:**
- Check deploy logs in Netlify dashboard
- View build history

## Part 6: Local Development Setup

### 6.1 Frontend

```bash
cd frontend
npm install

# Create .env.local
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env.local

npm start
```

### 6.2 Backend

```bash
cd backend

# Activate virtual environment
# Windows
venv\Scripts\activate

# Create .env file
# Use .env.example as template

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver
```

## Part 7: Supabase Security Best Practices

### 7.1 Row Level Security (RLS)

For production, enable RLS on your tables:

```sql
-- Enable RLS on your tables
ALTER TABLE your_table_name ENABLE ROW LEVEL SECURITY;

-- Create policies as needed
-- Example: Public read access
CREATE POLICY "Public read access" ON your_table_name
FOR SELECT USING (true);
```

### 7.2 Storage Policies

Configure storage bucket policies in Supabase dashboard:
- Navigate to Storage → Policies
- Set appropriate read/write permissions

## URLs to Remember

- **Frontend (Netlify)**: `https://your-site-name.netlify.app`
- **Backend (Heroku)**: `https://your-app-name.herokuapp.com`
- **API Docs**: `https://your-app-name.herokuapp.com/api/`
- **Admin Panel**: `https://your-app-name.herokuapp.com/admin/`
- **Supabase Dashboard**: `https://app.supabase.com`

## Need Help?

- [Netlify Docs](https://docs.netlify.com)
- [Heroku Django Docs](https://devcenter.heroku.com/articles/django-app-configuration)
- [Supabase Docs](https://supabase.com/docs)
