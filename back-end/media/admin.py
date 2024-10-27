from django.contrib import admin
from .models import Media
# Register your models here.
admin.site.register(Media)

class MediaInline(admin.TabularInline):
    model = Media
    extra = 1  # Allow users to upload multiple images
    min_num = 1  # Ensure at least one image is uploaded