from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class Category(models.Model):
    """Category model for organizing projects"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name


class Project(models.Model):
    """Project model for portfolio items"""
    PROJECT_TYPES = [
        ('architecture', 'Architecture'),
        ('design', 'Design'),
        ('game', 'Game Systems'),
        ('art', 'Art'),
        ('speculative', 'Speculative'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField(help_text="Short project summary")
    full_content = models.TextField(help_text="Detailed project description/process")
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPES)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='projects')
    
    # Images
    featured_image = models.ImageField(upload_to='projects/featured/', blank=True, null=True)
    image_1 = models.ImageField(upload_to='projects/gallery/', blank=True, null=True)
    image_2 = models.ImageField(upload_to='projects/gallery/', blank=True, null=True)
    image_3 = models.ImageField(upload_to='projects/gallery/', blank=True, null=True)
    image_4 = models.ImageField(upload_to='projects/gallery/', blank=True, null=True)
    
    video_url = models.URLField(blank=True, help_text="YouTube or Vimeo URL")
    
    # Display controls
    featured = models.BooleanField(default=False, help_text="Show on homepage")
    display_order = models.IntegerField(default=0, help_text="Lower numbers appear first")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', '-created_at']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
    
    @property
    def gallery_images(self):
        """Return list of gallery images"""
        images = []
        for i in range(1, 5):
            img = getattr(self, f'image_{i}')
            if img:
                images.append(img.url)
        return images


class NewsArticle(models.Model):
    """News article model for blog/news content"""
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    excerpt = models.TextField(help_text="Short preview text", max_length=300)
    content = models.TextField(help_text="Full article content")
    featured_image = models.ImageField(upload_to='news/', blank=True, null=True)
    
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')
    
    published = models.BooleanField(default=False)
    publish_date = models.DateTimeField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-publish_date', '-created_at']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title


class Collaboration(models.Model):
    """Collaboration request model"""
    PROJECT_TYPES = [
        ('architecture', 'Architecture Project'),
        ('design', 'Design Consultation'),
        ('game', 'Game Systems Development'),
        ('research', 'Research Collaboration'),
        ('exhibition', 'Exhibition/Art Project'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('new', 'New'),
        ('in_review', 'In Review'),
        ('contacted', 'Contacted'),
        ('archived', 'Archived'),
    ]
    
    name = models.CharField(max_length=200)
    email = models.EmailField()
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPES)
    message = models.TextField()
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    admin_notes = models.TextField(blank=True, help_text="Internal notes (not visible to user)")
    
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"{self.name} - {self.project_type}"


class SiteSettings(models.Model):
    """Site-wide settings (singleton model)"""
    site_title = models.CharField(max_length=200, default="Atelier Spaces Nate")
    tagline = models.CharField(max_length=300, default="Research-led design studio")
    founder_quote = models.TextField(default="", help_text="Inspirational quote for homepage")
    
    # Contact information
    contact_email = models.EmailField(default="contact@atelierspacesnate.com")
    phone = models.CharField(max_length=50, blank=True)
    address = models.TextField(blank=True)
    
    # Social media
    instagram_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    facebook_url = models.URLField(blank=True)
    
    # SEO
    meta_description = models.TextField(max_length=160, blank=True)
    meta_keywords = models.CharField(max_length=200, blank=True)
    
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        self.pk = 1
        super().save(*args, **kwargs)
    
    def delete(self, *args, **kwargs):
        # Prevent deletion
        pass
    
    @classmethod
    def load(cls):
        """Load the singleton instance"""
        obj, created = cls.objects.get_or_create(pk=1)
        return obj
    
    def __str__(self):
        return "Site Settings"
