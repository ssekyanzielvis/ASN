#!/usr/bin/env python
"""
Simple script to run Django migrations on Supabase
Run this from the root project directory (outside backend/)
"""
import os
import sys
import django
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent / 'backend'
sys.path.insert(0, str(backend_path))

# Set environment variables
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings_production')
os.environ['DATABASE_URL'] = 'postgresql://postgres:Su4at3%230ssekyanzi@db.loetbmdkawhlkamtqjij.supabase.co:5432/postgres'
os.environ['SECRET_KEY'] = 'django-insecure-production-key'

# Setup Django
django.setup()

# Run migrations
from django.core.management import call_command
try:
    print("Running migrations on Supabase PostgreSQL...")
    call_command('migrate')
    print("✅ Migrations completed successfully!")
except Exception as e:
    print(f"❌ Migration failed: {e}")
    sys.exit(1)
