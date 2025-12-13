# Test Supabase Integration
# Run this to verify Supabase connection works

import os
import sys
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).resolve().parent / 'backend'
sys.path.insert(0, str(backend_path))

# Load environment variables
from dotenv import load_dotenv
load_dotenv(backend_path / '.env')

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
import django
django.setup()

from django.db import connection
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

def test_database():
    """Test Supabase PostgreSQL connection"""
    print("Testing Database Connection...")
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT version();")
            version = cursor.fetchone()[0]
            print(f"✅ Database Connected: {version[:50]}...")
            
            cursor.execute("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
            table_count = cursor.fetchone()[0]
            print(f"✅ Tables found: {table_count}")
        return True
    except Exception as e:
        print(f"❌ Database Error: {e}")
        return False

def test_storage():
    """Test Supabase Storage connection"""
    print("\nTesting Storage Connection...")
    try:
        # Get storage info
        storage_name = default_storage.__class__.__name__
        print(f"Storage Backend: {storage_name}")
        
        if storage_name == 'SupabaseStorage':
            # Test upload
            test_content = ContentFile(b'Test file for Supabase integration')
            filename = 'test/integration_test.txt'
            
            print(f"Uploading test file: {filename}")
            saved_name = default_storage.save(filename, test_content)
            print(f"✅ File uploaded: {saved_name}")
            
            # Get URL
            url = default_storage.url(saved_name)
            print(f"✅ Public URL: {url}")
            
            # Clean up
            default_storage.delete(saved_name)
            print(f"✅ Test file deleted")
            return True
        else:
            print(f"⚠️  Not using Supabase Storage (using {storage_name})")
            print("Set SUPABASE_URL and SUPABASE_KEY environment variables")
            return False
            
    except Exception as e:
        print(f"❌ Storage Error: {e}")
        import traceback
        traceback.print_exc()
        return False

def check_environment():
    """Check environment variables"""
    print("\nChecking Environment Variables...")
    required_vars = {
        'DATABASE_URL': 'Supabase PostgreSQL connection string',
        'SUPABASE_URL': 'Supabase project URL',
        'SUPABASE_KEY': 'Supabase anon/service key',
        'SUPABASE_BUCKET': 'Storage bucket name'
    }
    
    all_set = True
    for var, description in required_vars.items():
        value = os.environ.get(var)
        if value:
            # Mask sensitive values
            if 'KEY' in var or 'URL' in var:
                display = value[:20] + '...' if len(value) > 20 else value
            else:
                display = value
            print(f"✅ {var}: {display}")
        else:
            print(f"❌ {var}: NOT SET ({description})")
            all_set = False
    
    return all_set

if __name__ == '__main__':
    print("=" * 60)
    print("SUPABASE INTEGRATION TEST")
    print("=" * 60)
    
    env_ok = check_environment()
    db_ok = test_database()
    storage_ok = test_storage()
    
    print("\n" + "=" * 60)
    print("TEST RESULTS")
    print("=" * 60)
    print(f"Environment Variables: {'✅ PASS' if env_ok else '❌ FAIL'}")
    print(f"Database Connection:   {'✅ PASS' if db_ok else '❌ FAIL'}")
    print(f"Storage Connection:    {'✅ PASS' if storage_ok else '❌ FAIL'}")
    
    if env_ok and db_ok and storage_ok:
        print("\n🎉 All tests passed! Supabase integration is working.")
    else:
        print("\n⚠️  Some tests failed. Check the errors above.")
        print("\nTroubleshooting:")
        print("1. Verify .env file exists in backend/ directory")
        print("2. Check SUPABASE_URL and SUPABASE_KEY values")
        print("3. Verify storage bucket 'atelier-media' exists in Supabase")
        print("4. Check storage policies allow authenticated uploads")
