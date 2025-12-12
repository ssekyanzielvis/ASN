from rest_framework import serializers
from .models import (
    Category, Project, NewsArticle, Collaboration, SiteSettings,
    HeroSlide, WorkCategory, Work, TeamMember, AboutSection, SloganSection
)
from django.contrib.auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    project_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'project_count']
    
    def get_project_count(self, obj):
        return obj.projects.count()


class ProjectListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'project_type',
            'category_name', 'featured_image', 'featured', 
            'display_order', 'created_at'
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    gallery_images = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'full_content',
            'project_type', 'category', 'category_id', 'featured_image',
            'image_1', 'image_2', 'image_3', 'image_4', 'gallery_images',
            'video_url', 'featured', 'display_order', 'created_at', 'updated_at'
        ]
    
    def get_gallery_images(self, obj):
        return obj.gallery_images


class NewsArticleListSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    
    class Meta:
        model = NewsArticle
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image',
            'author_name', 'publish_date', 'created_at'
        ]


class NewsArticleDetailSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = NewsArticle
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'featured_image',
            'author', 'published', 'publish_date', 'created_at', 'updated_at'
        ]


class CollaborationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Collaboration
        fields = [
            'id', 'name', 'email', 'project_type', 'message',
            'status', 'admin_notes', 'submitted_at', 'reviewed'
        ]
        read_only_fields = ['status', 'admin_notes', 'reviewed', 'submitted_at']
    
    def validate_email(self, value):
        """Validate email format"""
        if not value:
            raise serializers.ValidationError("Email is required")
        return value.lower()
    
    def validate_message(self, value):
        """Validate message length"""
        if len(value) < 20:
            raise serializers.ValidationError("Message must be at least 20 characters long")
        return value


class SiteSettingsSerializer(serializers.ModelSerializer):
    social_links = serializers.SerializerMethodField()
    
    class Meta:
        model = SiteSettings
        fields = [
            'site_title', 'tagline', 'founder_quote', 'contact_email',
            'phone', 'address', 'instagram_url', 'twitter_url',
            'linkedin_url', 'facebook_url', 'meta_description',
            'meta_keywords', 'social_links', 'updated_at'
        ]
    
    def get_social_links(self, obj):
        """Return dictionary of social media links"""
        return {
            'instagram': obj.instagram_url,
            'twitter': obj.twitter_url,
            'linkedin': obj.linkedin_url,
            'facebook': obj.facebook_url,
        }


class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = ['id', 'image', 'caption', 'is_active', 'display_order', 'created_at']


class WorkCategorySerializer(serializers.ModelSerializer):
    works_count = serializers.SerializerMethodField()
    
    class Meta:
        model = WorkCategory
        fields = ['id', 'name', 'display_name', 'image', 'description', 
                  'is_active', 'display_order', 'works_count']
    
    def get_works_count(self, obj):
        return obj.works.filter(is_featured=False).count()


class WorkListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.display_name', read_only=True)
    category_slug = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Work
        fields = ['id', 'title', 'slug', 'category_name', 'category_slug',
                  'featured_image', 'description', 'is_featured', 'created_at']


class WorkDetailSerializer(serializers.ModelSerializer):
    category = WorkCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=WorkCategory.objects.all(), source='category', write_only=True
    )
    gallery_images = serializers.SerializerMethodField()
    related_works = serializers.SerializerMethodField()
    
    class Meta:
        model = Work
        fields = ['id', 'title', 'slug', 'category', 'category_id', 
                  'featured_image', 'description', 'full_content',
                  'image_1', 'image_2', 'image_3', 'image_4', 'gallery_images',
                  'is_featured', 'display_order', 'related_works',
                  'created_at', 'updated_at']
    
    def get_gallery_images(self, obj):
        return obj.gallery_images
    
    def get_related_works(self, obj):
        # Get other works in the same category
        related = obj.category.works.exclude(id=obj.id)[:6]
        return WorkListSerializer(related, many=True).data


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'bio', 'image', 'email', 
                  'linkedin_url', 'website_url', 'is_active', 'display_order']


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = ['id', 'title', 'content', 'team_image', 'team_caption', 'updated_at']


class SloganSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SloganSection
        fields = ['id', 'text', 'is_active', 'updated_at']
