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

# Database
import dj_database_url
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600
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

# Media files (using Supabase Storage)
if os.environ.get('SUPABASE_URL') and os.environ.get('SUPABASE_KEY'):
    DEFAULT_FILE_STORAGE = 'utils.supabase_storage.SupabaseStorage'
    MEDIA_URL = f"{os.environ.get('SUPABASE_URL')}/storage/v1/object/public/{os.environ.get('SUPABASE_BUCKET', 'atelier-media')}/"
else:
    # Fallback to local storage for development
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
