"""
Production settings for Atelier Spaces Nate
Import these settings in production environment
"""

import os
from .settings import *

# Security
DEBUG = False
SECRET_KEY = os.environ.get('SECRET_KEY')
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

# Database - Supabase PostgreSQL
import dj_database_url

# Use Supabase PostgreSQL database
DATABASE_URL = os.environ.get(
    'DATABASE_URL',
    'postgresql://postgres.loetbmdkawhlkamtqjij:Su4at3#0ssekyanzi@aws-0-eu-west-2.pooler.supabase.com:6543/postgres'
)

DATABASES = {
    'default': dj_database_url.config(
        default=DATABASE_URL,
        conn_max_age=600,
        conn_health_checks=True,
    )
}

# CORS
CORS_ALLOWED_ORIGINS = [
    origin.strip() 
    for origin in os.environ.get('CORS_ALLOWED_ORIGINS', 'https://atelierspacesnet.netlify.app').split(',')
    if origin.strip()
]

# Static files (using WhiteNoise)
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Supabase Configuration
SUPABASE_URL = os.environ.get('SUPABASE_URL', 'https://loetbmdkawhlkamtqjij.supabase.co')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY', '')
SUPABASE_BUCKET = os.environ.get('SUPABASE_BUCKET', 'atelier-media')

# Media files - Always use Supabase Storage in production
if SUPABASE_URL and SUPABASE_KEY:
    DEFAULT_FILE_STORAGE = 'utils.supabase_storage.SupabaseStorage'
    MEDIA_URL = f"{SUPABASE_URL}/storage/v1/object/public/{SUPABASE_BUCKET}/"
else:
    # Fallback to local storage if Supabase not configured
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}
