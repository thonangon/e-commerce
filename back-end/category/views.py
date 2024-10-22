from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
# Create your views here.
# MainCategory ViewSet
class MainCategoryViewSet(viewsets.ModelViewSet):

    queryset = MainCategories.objects.all()
    serializer_class = MainCategorySerializer 

class SubCategoryViewSet(viewsets.ModelViewSet):
    
    serializer_class = SubCategorySerializer
    def get_queryset(self):
        
        main_category_id = self.request.query_params.get('mainCategory_id', None)
        if main_category_id:
            return SubCategories.objects.filter(mainCategory_id=main_category_id)
        return SubCategories.objects.all()

class CategoryViewSet(viewsets.ModelViewSet):
    
    serializer_class = CategorySerializer
    def get_queryset(self):
        
        sub_category_id = self.request.query_params.get('SubCategory_id', None)
        if sub_category_id:
            return Categories.objects.filter(SubCategory_id=sub_category_id)
        return Categories.objects.all()