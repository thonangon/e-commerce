from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
 
router = DefaultRouter()
router.register(r'sizes', SizeViewset, basename='sizes')

urlpatterns = [
    path('', include(router.urls)),
]