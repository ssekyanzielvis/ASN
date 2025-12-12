from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Category, Project, NewsArticle, Collaboration, SiteSettings,
    HeroSlide, WorkCategory, Work, TeamMember, AboutSection, SloganSection
)


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


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ['caption', 'is_active', 'display_order', 'image_preview', 'created_at']
    list_filter = ['is_active', 'created_at']
    list_editable = ['is_active', 'display_order']
    ordering = ['display_order', '-created_at']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 100px; height: auto;" />', obj.image.url)
        return '-'
    image_preview.short_description = 'Preview'


@admin.register(WorkCategory)
class WorkCategoryAdmin(admin.ModelAdmin):
    list_display = ['display_name', 'name', 'is_active', 'display_order', 'works_count']
    list_filter = ['is_active', 'name']
    list_editable = ['is_active', 'display_order']
    search_fields = ['display_name', 'description']
    ordering = ['display_order', 'display_name']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'display_name', 'description', 'image')
        }),
        ('Display Options', {
            'fields': ('is_active', 'display_order')
        }),
    )
    
    def works_count(self, obj):
        count = obj.works.count()
        return format_html('<strong>{}</strong>', count)
    works_count.short_description = 'Works'


@admin.register(Work)
class WorkAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_featured', 'display_order', 'created_at']
    list_filter = ['category', 'is_featured', 'created_at']
    search_fields = ['title', 'description', 'full_content']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_featured', 'display_order']
    ordering = ['display_order', '-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'category', 'description', 'full_content')
        }),
        ('Images', {
            'fields': ('featured_image', 'image_1', 'image_2', 'image_3', 'image_4')
        }),
        ('Display Options', {
            'fields': ('is_featured', 'display_order')
        }),
    )
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('category')


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'is_active', 'display_order', 'email']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'role', 'bio']
    list_editable = ['is_active', 'display_order']
    ordering = ['display_order', 'name']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'role', 'bio', 'image')
        }),
        ('Contact & Social', {
            'fields': ('email', 'linkedin_url', 'website_url')
        }),
        ('Display Options', {
            'fields': ('is_active', 'display_order')
        }),
    )


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Content', {
            'fields': ('title', 'content')
        }),
        ('Team Image', {
            'fields': ('team_image', 'team_caption')
        }),
    )
    
    def has_add_permission(self, request):
        return not AboutSection.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(SloganSection)
class SloganSectionAdmin(admin.ModelAdmin):
    list_display = ['text_preview', 'is_active', 'updated_at']
    list_editable = ['is_active']
    
    def text_preview(self, obj):
        return obj.text[:100] + '...' if len(obj.text) > 100 else obj.text
    text_preview.short_description = 'Slogan Text'
    
    def has_add_permission(self, request):
        return not SloganSection.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        return False
