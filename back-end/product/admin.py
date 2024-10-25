from django.contrib import admin
from .models import Product
from colorOnProduct.models import *
from media.models import *

class ColorOnProductInline(admin.TabularInline):
    model = ColorOnProduct
    extra = 1  # Adjust this number for how many extra empty forms you want

# Inline for Media (product images)
class MediaInline(admin.TabularInline):
    model = Media
    extra = 1  # Allow users to upload multiple images

class ProductAdmin(admin.ModelAdmin):
    inlines = [ColorOnProductInline, MediaInline]  # Add the inlines for related models
    list_display = ['productName', 'category']  # Customize list view
    search_fields = ['productName']  # Enable search by product name

admin.site.register(Product, ProductAdmin)