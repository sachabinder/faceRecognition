from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.conf import settings
from .serializers import ProfileSerializer
from .models import Profile
from deepface import DeepFace

import json


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
        TODO : put variables to the profile_picture folder
        """
        image = request.FILES["image"]
        try:
            # Get the face detected and convert it to JSON format
            face_detected = json.loads(
                DeepFace.find(
                    img_path=image.temporary_file_path(),
                    db_path="/src" + settings.MEDIA_URL + "profile_picture/",
                )[0].to_json(orient="records")
            )[0]
        except ValueError:
            return Response(
                {"response": "No faces detected on the input image"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if face_detected:
            profile_picture_name = (
                "profile_picture/" + face_detected["identity"].split("/")[-1]
            )
            profile = Profile.objects.get(profile_picture=profile_picture_name)
            face_detected["user_id"] = profile.id

            return Response(
                face_detected,
                status=status.HTTP_202_ACCEPTED,
            )
        return Response(
            {"response": "No faces match on the database"},
            status=status.HTTP_400_BAD_REQUEST,
        )
