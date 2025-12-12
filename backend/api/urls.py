"""
URL configuration for api project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from core.views import (
    CategoryViewSet, ProjectViewSet, NewsArticleViewSet,
    CollaborationViewSet, SiteSettingsViewSet, HeroSlideViewSet,
    WorkCategoryViewSet, WorkViewSet, TeamMemberViewSet,
    AboutSectionViewSet, SloganSectionViewSet
)

# API Schema for documentation
schema_view = get_schema_view(
    openapi.Info(
        title="Atelier Spaces Nate API",
        default_version='v1',
        description="API for Atelier Spaces Nate portfolio platform",
        contact=openapi.Contact(email="contact@atelierspacesnate.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# Router for API endpoints
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'news', NewsArticleViewSet, basename='news')
router.register(r'collaborations', CollaborationViewSet, basename='collaboration')
router.register(r'settings', SiteSettingsViewSet, basename='settings')
router.register(r'hero-slides', HeroSlideViewSet, basename='hero-slide')
router.register(r'work-categories', WorkCategoryViewSet, basename='work-category')
router.register(r'works', WorkViewSet, basename='work')
router.register(r'team-members', TeamMemberViewSet, basename='team-member')
router.register(r'about', AboutSectionViewSet, basename='about')
router.register(r'slogan', SloganSectionViewSet, basename='slogan')

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API
    path('api/', include(router.urls)),
    
    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # API Documentation
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
