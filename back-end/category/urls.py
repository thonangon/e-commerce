from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MainCategoryViewSet, SubCategoryViewSet,CategoryViewSet

# Create a router and register viewsets with it
router = DefaultRouter()
router.register(r'main-categories', MainCategoryViewSet, basename='main-category')
router.register(r'sub-categories', SubCategoryViewSet, basename='sub-category')
router.register(r'categoies', CategoryViewSet, basename='categoies')

# Wire up the router to the URLs
urlpatterns = [
    path('', include(router.urls)),
]
