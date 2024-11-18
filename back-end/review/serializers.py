from rest_framework import serializers
from .models import *
 
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserReview
        fields = ['review_id', 'product', 'user', 'rating']
