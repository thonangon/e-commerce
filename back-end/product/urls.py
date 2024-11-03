# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('product/<str:main_category_name>/', ProductsByMainCategoryView.as_view(), name='products_by_main_category'),
]
