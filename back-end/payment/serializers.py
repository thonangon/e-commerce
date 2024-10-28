from rest_framework import serializers
from .models import *

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['paymentId', 'paymentType', 'amount', 'orderId','paymentDate']