from rest_framework import serializers
from .models import *
class UserPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPayment
        fields = ['id', 'user', 'amount', 'currency', 'payment_method', 'payment_intent_id']
    
