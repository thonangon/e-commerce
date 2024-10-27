from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
# Create your views here.

class OrderDetailView(viewsets.ModelViewSet):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer
    
    
    
