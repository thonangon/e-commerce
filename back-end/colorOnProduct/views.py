from django.shortcuts import render

from rest_framework import viewsets, permissions
from .models import *
from .seriaizers import *
# Create your views here.

class sizeViewsets(viewsets.ModelViewsets):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer
