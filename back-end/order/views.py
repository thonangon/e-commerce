from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets
# Create your views here.

class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


