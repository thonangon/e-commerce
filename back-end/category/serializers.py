from rest_framework import serializers
from .models import MainCategory, SubCategory, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','sub_category','image']

class SubCategorySerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    def get_categories(self, obj):
        categories = obj.categories.all()
        serializer = CategorySerializer(categories, many=True)
        return serializer.data

    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'main_category', 'categories']

class MainCategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True,read_only=True)  # Use the related name 'subcategories'

    class Meta:
        model = MainCategory
        fields = ['id','name', 'subcategories']
