from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import * 
# Create your views here.

class ColorViewset(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
