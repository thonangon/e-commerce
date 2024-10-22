from django.urls import path
from .views import *

urlpatterns =[
    path('media_upload/',ImgUploadView.as_view(),name = 'media_upload')
]