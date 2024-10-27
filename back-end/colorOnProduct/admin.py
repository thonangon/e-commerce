from django.contrib import admin
from .models import *

class ColorOnProductInline(admin.TabularInline):
    model = ColorOnProduct
    extra = 1  
    min_num = 1  
    
admin.register(ColorOnProduct)