from rest_framework import serializers
from .models import * 
from orderDetail.serializers import *

class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True, read_only=True)
    products = serializers.ListField(write_only=True)

    class Meta:
        model = Order
        fields = ['orderId','userId','orderDate','total_amount','orderStatus','products' ,'order_details']

    def create(self, validated_data):
        products_data = validated_data.pop('products')
        order = Order.objects.create(**validated_data)
        
        for product_data in products_data:
            product_id = product_data.get('id')
            quantity = product_data.get('quantity', 1)  
            product = Product.objects.get(id=product_id)

            OrderDetail.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price
            )
        
        return order