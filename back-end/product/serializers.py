from rest_framework import serializers
from colorOnProduct.seriaizers import *
from media.serializers import *
from .models import *
from media.models import Media
from discount.seriailizers import *

class ProductSerializer(serializers.ModelSerializer):
    color_size_combinations = ColorOnProductSerializer(source='coloronproduct_set', many=True)
    images = uploadImageSerializer(many=True, read_only=True)  # For displaying product images after creation
    discount = DiscountSerializer(read_only=True)  # For displaying discount details after creation
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

        # Handle discount creation if present
        discount_data = validated_data.get('discount')
        if discount_data:
            discount_percentage = discount_data.get('percentage')
            if discount_percentage is not None:  # Check if percentage is provided
                Discount.objects.create(product=product, percentage=discount_percentage)



        return product
