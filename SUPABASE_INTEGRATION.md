# Supabase Integration Guide

## Overview
Django is now fully configured to use Supabase for both database and storage.

## Configuration Summary

### 1. Database: Supabase PostgreSQL
- **Connection**: Direct PostgreSQL connection to Supabase
- **URL Format**: `postgresql://postgres.PROJECT_ID:PASSWORD@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`
- **Current**: `postgresql://postgres.loetbmdkawhlkamtqjij:Su4at3#0ssekyanzi@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`

### 2. Storage: Supabase Storage Buckets
- **Bucket Name**: `atelier-media`
- **Purpose**: Store all uploaded images (project images, team photos, hero slides, etc.)
- **Access**: Public read, authenticated write

## Environment Variables Required

### For Local Development (.env file)
```env
DATABASE_URL=postgresql://postgres.loetbmdkawhlkamtqjij:Su4at3#0ssekyanzi@aws-0-eu-west-2.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://loetbmdkawhlkamtqjij.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_BUCKET=atelier-media
```

### For Production (Render Environment Variables)
Set these in Render Dashboard → Environment:

1. **DATABASE_URL**
   - Value: `postgresql://postgres.loetbmdkawhlkamtqjij:Su4at3#0ssekyanzi@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`
   
2. **SUPABASE_URL**
   - Value: `https://loetbmdkawhlkamtqjij.supabase.co`
   
3. **SUPABASE_KEY**
   - Value: Your Supabase anon key (get from Supabase Dashboard → Settings → API)
   
4. **SUPABASE_BUCKET**
   - Value: `atelier-media`

## Supabase Setup Required

### Step 1: Create Storage Bucket

Go to Supabase Dashboard → Storage and create bucket:

```sql
-- Create bucket (run in Supabase SQL Editor if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('atelier-media', 'atelier-media', true)
ON CONFLICT (id) DO NOTHING;
```

### Step 2: Set Storage Policies

```sql
-- Allow public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'atelier-media');

-- Allow authenticated uploads (for Django admin)
CREATE POLICY "Authenticated upload access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'atelier-media');

-- Allow authenticated updates
CREATE POLICY "Authenticated update access"
ON storage.objects FOR UPDATE
USING (bucket_id = 'atelier-media');

-- Allow authenticated deletes
CREATE POLICY "Authenticated delete access"
ON storage.objects FOR DELETE
USING (bucket_id = 'atelier-media');
```

### Step 3: Verify Database Connection

Tables should already exist from previous migrations. Verify:

```sql
-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE';
```

Expected tables:
- auth_user
- core_category
- core_project
- core_newsarticle
- core_collaboration
- core_heroslide
- core_workcategory
- core_work
- core_teammember
- core_aboutsection
- core_slogansection

## How It Works

### Database Operations
All Django ORM operations go directly to Supabase PostgreSQL:
- `Project.objects.all()` → Queries Supabase
- `project.save()` → Saves to Supabase
- Migrations apply to Supabase tables

### File Uploads
When uploading files through Django Admin:
1. File is sent to Django
2. Django uses `SupabaseStorage` backend
3. File uploaded to Supabase Storage bucket
4. Public URL returned: `https://loetbmdkawhlkamtqjij.supabase.co/storage/v1/object/public/atelier-media/filename.jpg`
5. URL saved in database

### API Responses
Frontend receives public URLs from Supabase:
```json
{
  "id": 1,
  "title": "Modern Villa",
  "image": "https://loetbmdkawhlkamtqjij.supabase.co/storage/v1/object/public/atelier-media/projects/villa.jpg"
}
```

## Testing the Integration

### 1. Test Database Connection
```bash
cd backend
python manage.py dbshell  # Should connect to Supabase
```

### 2. Test Storage Upload
```python
# In Django shell
python manage.py shell

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

# Upload test file
default_storage.save('test.txt', ContentFile(b'Hello Supabase!'))

# Get URL
url = default_storage.url('test.txt')
print(url)  # Should be Supabase URL
```

### 3. Test Through Admin
1. Go to: http://localhost:8000/admin/
2. Create a new Project
3. Upload an image
4. Check the image URL in database - should point to Supabase

## Deployment Checklist

### Before Deploying to Render:

✅ **Set Environment Variables in Render Dashboard**
- [ ] DATABASE_URL
- [ ] SUPABASE_URL
- [ ] SUPABASE_KEY
- [ ] SUPABASE_BUCKET
- [ ] SECRET_KEY (Django secret)
- [ ] ALLOWED_HOSTS (asn-85nt.onrender.com)
- [ ] CORS_ALLOWED_ORIGINS (https://atelierspacesnet.netlify.app)

✅ **Verify Supabase Setup**
- [ ] Storage bucket `atelier-media` exists
- [ ] Storage policies configured (public read, authenticated write)
- [ ] Database tables exist (run migrations if needed)
- [ ] Get Supabase anon key from Dashboard → Settings → API

✅ **Commit and Push**
```bash
git add backend/api/settings.py backend/api/settings_production.py
git commit -m "Configure Django to use Supabase for database and storage"
git push
```

## Troubleshooting

### "No module named 'supabase'"
```bash
pip install supabase
# Already in requirements.txt - run: pip install -r requirements.txt
```

### "Supabase client not configured"
- Check SUPABASE_URL and SUPABASE_KEY environment variables are set
- Verify the values are correct (check Supabase Dashboard → Settings → API)

### "Failed to upload to Supabase"
- Verify storage bucket exists
- Check storage policies allow authenticated uploads
- Verify SUPABASE_KEY has proper permissions

### Database connection fails
- Check DATABASE_URL format
- Verify password is URL-encoded (# becomes %23)
- Test connection: `psql "postgresql://postgres.loetbmdkawhlkamtqjij:Su4at3#0ssekyanzi@aws-0-eu-west-2.pooler.supabase.com:6543/postgres"`

## Benefits of This Setup

✅ **Single Source of Truth**: All data in Supabase
✅ **Scalable**: Supabase handles scaling automatically
✅ **Cost-Effective**: Free tier for development
✅ **Fast**: CDN for storage, connection pooling for database
✅ **Simple**: One platform for database + storage
✅ **Secure**: Built-in authentication and row-level security

## Next Steps

1. **Deploy to Render** with environment variables
2. **Create Superuser** to access Django admin
3. **Add content** through admin panel
4. **Images automatically upload** to Supabase Storage
5. **Frontend displays** data from Supabase
