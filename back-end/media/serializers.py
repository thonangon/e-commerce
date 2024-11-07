from rest_framework import serializers
from .models import Media

class uploadImageSerializer(serializers.ModelSerializer):
    class Meta:
        model= Media
        fields= ['media_id','image']

    def get_image(self, obj):
        # Return only the path without the full URL
        return obj.image.name  # This will return the relative file path

