from rest_framework import serializers
from colorOnProduct.seriaizers import *
from media.serializers import *

class ProductSerializer(serializers.ModelSerializer):
    color_size_combinations = ColorOnProductSerializer(source='coloronproduct_set', many=True)
    images = uploadImageSerializer(many=True, read_only=True) 

    class Meta:
        model = Product
        fields = ['productId', 'productName', 'description', 'heading', 'subHeading', 'color_size_combinations','images']