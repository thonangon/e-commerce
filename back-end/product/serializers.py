from rest_framework import serializers
from colorOnProduct.seriaizers import *
from media.serializers import *
from .models import *
from media.models import Media
from discount.seriailizers import *
from category.serializers import *


class ProductSerializer(serializers.ModelSerializer):
    color_size_combinations = ColorOnProductSerializer(source='coloronproduct_set', many=True)
    images = uploadImageSerializer(many=True, read_only=True)  # For displaying product images after creation
    discount = DiscountSerializer(source='discount_set', many=True, read_only=True)  
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Product
        fields = ['productId', 'productName', 'description', 'heading', 'subHeading', 'category', 'color_size_combinations', 'images','discount']

    def create(self, validated_data):
        color_size_combinations_data = validated_data.pop('coloronproduct_set', [])

        images_data = self.context['request'].FILES.getlist('images')  

        product = Product.objects.create(**validated_data)

        for color_size_data in color_size_combinations_data:
            color_data = color_size_data.get('color', {})
            color_name = color_data.get('colorName')
            color_instance, created = Color.objects.get_or_create(colorName=color_name)
            
            size_data = color_size_data.get('size', {})
            size_numeric = size_data.get('size_numeric')
            price = size_data.get('price')
            size_instance, created = Size.objects.get_or_create(size_numeric=size_numeric, defaults={'price': price})
            ColorOnProduct.objects.create(product=product, color=color_instance, size=size_instance)

        # Handle image uploads
        for image in images_data:
            Media.objects.create(product=product, image=image)

        return product
