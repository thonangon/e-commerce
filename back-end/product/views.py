from django.shortcuts import render
from rest_framework import generics
# Create your views here.
# views.py

from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductsByMainCategoryView(generics.ListAPIView):
        serializer_class = ProductSerializer
        def get_queryset(self):
            main_category_name = self.kwargs['main_category_name']
            return Product.objects.filter(category__sub_category__main_category__name=main_category_name)