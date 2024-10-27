from rest_framework import serializers
from .models import *
from product.serializers import *
from product.models import *
class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ['discountId', 'percentage', 'startDate', 'endDate', 'isActive']
