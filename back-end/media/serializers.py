from rest_framework import serializers
from .models import Media

class uploadImageSerializer(serializers.ModelSerializer):
    class Meta:
        model= Media
        fields= ['media_id','image']

    def get_image(self, obj):
        # Return only the path portion of the URL
        return obj.image.url if obj.image else None

