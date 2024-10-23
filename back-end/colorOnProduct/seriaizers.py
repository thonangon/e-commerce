from rest_framework import serializers
from .models import *
from colors.serializers import *
from sizes.serializers import *

class ColorOnProductSerializer(serializers.ModelSerializer):
    color = ColorSerializer()
    size = SizeSerializer()

    class Meta:
        model = ColorOnProduct
        fields = ['color', 'size']