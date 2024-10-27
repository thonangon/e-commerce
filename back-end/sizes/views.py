from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import *
from .serializers import *

class SizeViewset(viewsets.ModelViewSet):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer