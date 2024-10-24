from django.shortcuts import render
from rest_framework.response import Response
from .serializers import *
from rest_framework import status
from .models import *
from rest_framework.views import APIView
# Create your views here.

class ImgUploadView(APIView):
    authentication_classes = []
    permission_classes = []
    def post(self, request, *args, **kwargs):
        qs_serializer = uploadImageSerializer(
            data ={
                'image': request.FILES.get('image')
            },
            context = {'request': request},
        )
        if qs_serializer.is_valid():
            qs_serializer.save()
            return Response({
                "message": "Image uploaded successfully",
                "image_url": qs_serializer.data['image'],
                'data': qs_serializer.data
            },status= status.HTTP_200_OK)
        else:
            return Response({
                'message': "Image uploaded successfully",

            },status = status.HTTP_400_BAD_REQUEST)
        
    
    def get(self, request, *args, **kwargs):
        qs = Media.objects.all()
        qs_serializer = uploadImageSerializer(qs, many=True)
        return Response(qs_serializer.data, status=status.HTTP_200_OK)