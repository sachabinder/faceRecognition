from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.conf import settings
from .serializers import ProfileSerializer
from deepface import DeepFace

import cv2


class GetRoutes(APIView):
    def get(self, request):
        routes = [
            {
                "Endpoint": "api/profile/",
                "method": "POST",
                "description": "To create a profile",
                "Format of the request:": {
                    "first_name": "<Your name>",
                    "last_name": "<Your last name>",
                    "description": "<Your description>",
                    "profile_picture": "<Your picture path)> (optional)",
                },
            },
        ]
        return Response(routes, status=status.HTTP_202_ACCEPTED)


class ProfileView(APIView):
    def post(self, request):
        """To register someone"""
        serializer = ProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class FaceRecognitionView(APIView):
    def post(self, request):
        """
        Detect similar faces on the image posted over the all profile picture dataset
        """
        img = request.FILES["image"]
        print(img)
        return Response({"Response": "All good"}, status=status.HTTP_202_ACCEPTED)
