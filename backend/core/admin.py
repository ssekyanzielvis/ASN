from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Project, NewsArticle, Collaboration, SiteSettings


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'project_count', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'description']
    
    def project_count(self, obj):
        count = obj.projects.count()
        return format_html('<strong>{}</strong>', count)
    project_count.short_description = 'Projects'


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'project_type', 'category', 'featured', 'display_order', 'created_at']
    list_filter = ['project_type', 'featured', 'category', 'created_at']
    search_fields = ['title', 'description', 'full_content']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['featured', 'display_order']
    ordering = ['display_order', '-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'description', 'full_content')
        }),
        ('Classification', {
            'fields': ('project_type', 'category')
        }),
        ('Media', {
            'fields': ('featured_image', 'image_1', 'image_2', 'image_3', 'image_4', 'video_url')
        }),
        ('Display Options', {
            'fields': ('featured', 'display_order')
        }),
    )
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('category')


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'published', 'publish_date', 'created_at']
    list_filter = ['published', 'publish_date', 'author', 'created_at']
    search_fields = ['title', 'excerpt', 'content']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['published']
    date_hierarchy = 'publish_date'
    
    fieldsets = (
        ('Article Content', {
            'fields': ('title', 'slug', 'excerpt', 'content', 'featured_image')
        }),
        ('Publishing', {
            'fields': ('author', 'published', 'publish_date')
        }),
    )
    
    def save_model(self, request, obj, form, change):
        if not change:  # If creating new object
            obj.author = request.user
        super().save_model(request, obj, form, change)


@admin.register(Collaboration)
class CollaborationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'project_type', 'status', 'reviewed', 'submitted_at']
    list_filter = ['status', 'reviewed', 'project_type', 'submitted_at']
    search_fields = ['name', 'email', 'message']
    list_editable = ['status', 'reviewed']
    readonly_fields = ['submitted_at']
    date_hierarchy = 'submitted_at'
    
    fieldsets = (
        ('Request Information', {
            'fields': ('name', 'email', 'project_type', 'message', 'submitted_at')
        }),
        ('Admin Management', {
            'fields': ('status', 'reviewed', 'admin_notes')
        }),
    )
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        # Show unreviewed first
        return qs.order_by('reviewed', '-submitted_at')


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Site Information', {
            'fields': ('site_title', 'tagline', 'founder_quote')
        }),
        ('Contact Information', {
            'fields': ('contact_email', 'phone', 'address')
        }),
        ('Social Media', {
            'fields': ('instagram_url', 'twitter_url', 'linkedin_url', 'facebook_url')
        }),
        ('SEO', {
            'fields': ('meta_description', 'meta_keywords')
        }),
    )
    
    def has_add_permission(self, request):
        # Prevent adding more than one instance
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion
        return False
