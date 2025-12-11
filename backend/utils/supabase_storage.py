"""
Supabase Storage Backend for Django
Handles file uploads to Supabase Storage buckets
"""

import os
from django.core.files.storage import Storage
from django.conf import settings
from supabase import create_client, Client
from urllib.parse import urljoin


class SupabaseStorage(Storage):
    """
    Custom storage backend for Supabase Storage
    """
    
    def __init__(self):
        self.supabase_url = os.environ.get('SUPABASE_URL')
        self.supabase_key = os.environ.get('SUPABASE_KEY')
        self.bucket_name = os.environ.get('SUPABASE_BUCKET', 'atelier-media')
        
        if self.supabase_url and self.supabase_key:
            self.client: Client = create_client(self.supabase_url, self.supabase_key)
        else:
            self.client = None
    
    def _save(self, name, content):
        """
        Save file to Supabase Storage
        """
        if not self.client:
            raise ValueError("Supabase client not configured")
        
        try:
            # Read file content
            content.seek(0)
            file_data = content.read()
            
            # Upload to Supabase
            response = self.client.storage.from_(self.bucket_name).upload(
                name, 
                file_data,
                file_options={"content-type": content.content_type if hasattr(content, 'content_type') else 'application/octet-stream'}
            )
            
            return name
        except Exception as e:
            raise Exception(f"Failed to upload to Supabase: {str(e)}")
    
    def _open(self, name, mode='rb'):
        """
        Retrieve a file from Supabase Storage
        """
        if not self.client:
            raise ValueError("Supabase client not configured")
        
        try:
            response = self.client.storage.from_(self.bucket_name).download(name)
            return response
        except Exception as e:
            raise Exception(f"Failed to download from Supabase: {str(e)}")
    
    def delete(self, name):
        """
        Delete a file from Supabase Storage
        """
        if not self.client:
            raise ValueError("Supabase client not configured")
        
        try:
            self.client.storage.from_(self.bucket_name).remove([name])
        except Exception as e:
            raise Exception(f"Failed to delete from Supabase: {str(e)}")
    
    def exists(self, name):
        """
        Check if a file exists in Supabase Storage
        """
        if not self.client:
            return False
        
        try:
            files = self.client.storage.from_(self.bucket_name).list()
            return any(f['name'] == name for f in files)
        except:
            return False
    
    def url(self, name):
        """
        Return the URL for accessing a file
        """
        if not self.client or not self.supabase_url:
            return name
        
        # Get public URL
        public_url = self.client.storage.from_(self.bucket_name).get_public_url(name)
        return public_url
    
    def size(self, name):
        """
        Return the size of a file
        """
        if not self.client:
            return 0
        
        try:
            files = self.client.storage.from_(self.bucket_name).list()
            for f in files:
                if f['name'] == name:
                    return f.get('metadata', {}).get('size', 0)
            return 0
        except:
            return 0
