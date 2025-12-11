from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Category, Project, NewsArticle, Collaboration, SiteSettings
from .serializers import (
    CategorySerializer, ProjectListSerializer, ProjectDetailSerializer,
    NewsArticleListSerializer, NewsArticleDetailSerializer,
    CollaborationSerializer, SiteSettingsSerializer
)


class IsAdminOrReadOnly(permissions.BasePermission):
    """Custom permission to only allow admin users to edit objects"""
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class CategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for Category model"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']


class ProjectViewSet(viewsets.ModelViewSet):
    """ViewSet for Project model"""
    queryset = Project.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['project_type', 'category', 'featured']
    search_fields = ['title', 'description', 'full_content']
    ordering_fields = ['display_order', 'created_at', 'title']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectListSerializer
        return ProjectDetailSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured projects for homepage"""
        featured_projects = self.queryset.filter(featured=True)
        serializer = ProjectListSerializer(featured_projects, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get projects grouped by type"""
        project_type = request.query_params.get('type', None)
        if project_type:
            projects = self.queryset.filter(project_type=project_type)
            serializer = ProjectListSerializer(projects, many=True)
            return Response(serializer.data)
        return Response({"error": "Please provide a type parameter"}, 
                       status=status.HTTP_400_BAD_REQUEST)


class NewsArticleViewSet(viewsets.ModelViewSet):
    """ViewSet for NewsArticle model"""
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['published', 'author']
    search_fields = ['title', 'excerpt', 'content']
    ordering_fields = ['publish_date', 'created_at', 'title']
    
    def get_queryset(self):
        """Only show published articles to non-admin users"""
        if self.request.user.is_staff:
            return NewsArticle.objects.all()
        return NewsArticle.objects.filter(published=True)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return NewsArticleListSerializer
        return NewsArticleDetailSerializer
    
    def perform_create(self, serializer):
        """Set the author to the current user"""
        serializer.save(author=self.request.user)
    
    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get latest published articles"""
        count = int(request.query_params.get('count', 3))
        articles = self.get_queryset()[:count]
        serializer = NewsArticleListSerializer(articles, many=True)
        return Response(serializer.data)


class CollaborationViewSet(viewsets.ModelViewSet):
    """ViewSet for Collaboration model"""
    queryset = Collaboration.objects.all()
    serializer_class = CollaborationSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['status', 'reviewed', 'project_type']
    ordering_fields = ['submitted_at', 'status']
    
    def get_permissions(self):
        """Allow anyone to create, but only admins to list/update"""
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def mark_reviewed(self, request, pk=None):
        """Mark a collaboration request as reviewed"""
        collaboration = self.get_object()
        collaboration.reviewed = True
        collaboration.save()
        serializer = self.get_serializer(collaboration)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def update_status(self, request, pk=None):
        """Update the status of a collaboration request"""
        collaboration = self.get_object()
        new_status = request.data.get('status')
        if new_status in dict(Collaboration.STATUS_CHOICES):
            collaboration.status = new_status
            collaboration.save()
            serializer = self.get_serializer(collaboration)
            return Response(serializer.data)
        return Response(
            {"error": "Invalid status"}, 
            status=status.HTTP_400_BAD_REQUEST
        )


class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for SiteSettings (read-only for API)"""
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [permissions.AllowAny]
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get current site settings"""
        settings = SiteSettings.load()
        serializer = self.get_serializer(settings)
        return Response(serializer.data)
