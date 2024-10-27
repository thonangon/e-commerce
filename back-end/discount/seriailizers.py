from rest_framework import serializers
from .models import *
from product.serializers import *

class DiscountSerializer(serializers.ModelSerializer):
    productId = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all())

    class Meta:
        model = Discount
        fields = ['discountId', 'percentage', 'startDate', 'endDate', 'isActive', 'productId']
