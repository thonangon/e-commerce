from django.shortcuts import render
# Create your views here.
from rest_framework import viewsets
from .models import MainCategory, SubCategory, Category
from .serializers import MainCategorySerializer, SubCategorySerializer, CategorySerializer

# MainCategory ViewSet
class MainCategoryViewSet(viewsets.ModelViewSet):
    queryset = MainCategory.objects.all()
    serializer_class = MainCategorySerializer

# SubCategory ViewSet (if needed for separate API)
class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

# Category ViewSet (if needed for separate API)
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
