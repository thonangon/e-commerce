from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
# Create your views here.

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = UserReview.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        product = self.request.data.get('product')
        user = self.request.user
        if UserReview.objects.filter(product=product, user=user).exists():
            raise serializers.ValidationError("You have already reviewed this product.")
        serializer.save(user=user)


