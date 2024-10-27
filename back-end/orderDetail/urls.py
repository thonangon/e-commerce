from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'orderDetail', OrderDetailView ,basename='order-detail')

urlpatterns = [
    path('', include(router.urls)),
   
]