from django.contrib import admin

# Register your models here.
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ('email','auth_provider', 'created_at', 'is_active')  # Use fields present in your User model

admin.site.register(User, UserAdmin)
admin.site.register(Profile)
