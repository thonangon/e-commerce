from rest_framework import serializers
from .models import Media

class uploadImageSerializer(serializers.ModelSerializer):
    class Meta:
        model= Media
        fields= ['media_id','image']

