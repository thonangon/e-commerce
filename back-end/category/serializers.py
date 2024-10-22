from rest_framework import serializers
from .models import *


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategories
        fields = [ 'SubCategoryName', 'mainCategory']

class MainCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MainCategories
        fields = [ 'name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        exclude =['category_id']
        fiels = ['categoryName', 'subCategory']