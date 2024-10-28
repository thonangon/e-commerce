from rest_framework import serializers
from .models import *

class CardInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['payment_id', 'payment_type', 'amount', 'order', 'payment_date','payment_status']

    
