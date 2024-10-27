from rest_framework import serializers
from .models import *
from product.serializers import *

class OrderDetailSerializer(serializers.ModelSerializer):
    productId = ProductSerializer()
    class Meta:
        model = OrderDetail
        fields = ['orderId','productId', 'quantity', 'price','totalPrice']
