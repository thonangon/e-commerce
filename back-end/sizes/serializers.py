from rest_framework import serializers
from .models import *

# serializers.py

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['sizeId', 'size_numeric', 'size_name', 'price']

    def validate(self, data):
        """Ensure that only one of size_numeric or size_name is filled."""
        size_numeric = data.get('size_numeric')
        size_name = data.get('size_name')

        if not size_numeric and not size_name:
            raise serializers.ValidationError("You must provide either a numeric or string size.")
        if size_numeric and size_name:
            raise serializers.ValidationError("You cannot provide both a numeric and string size.")
        
        return data

