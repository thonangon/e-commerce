from django.shortcuts import render
from rest_framework import viewsets
# Create your views here.

from.seriailizers import *
from product.models import *

class DiscountView(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
