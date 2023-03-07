from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from deepface import DeepFace
from base64 import b64decode
from PIL import Image
from .serializers import ProfileSerializer
from .models import Profile

import io
import numpy as np
import json
import os


def create_database_embeddings(db_path: str) -> None:
    """
    call a dummy find function for db_path once to
    create embeddings in the initialization or update
    """

    file_name = f"representations_{settings.FACE_DETECTION_MODEL_NAME}.pkl"
    file_name = file_name.replace("-", "_").lower()
    try:
        os.remove(db_path + "/" + file_name)
    except FileNotFoundError:
        pass

    # Raise the exception where there is no img in db folder
    try:
        DeepFace.find(
            img_path=np.zeros([224, 224, 3]),
            db_path=db_path,
            model_name=settings.FACE_DETECTION_MODEL_NAME,
            distance_metric=settings.FACE_DETECTION_DISTANCE_METRIC,
            detector_backend=settings.FACE_DETECTION_DETECTOR_BACKEND,
            silent=True,
            enforce_detection=False,
        )
    except ValueError:
        pass


class GetRoutes(APIView):
    def get(self, request):
        routes = [
            {
                "Endpoint": "api/profile/",
                "method": "GET",
                "description": "To get all profiles info",
            },
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
            {
                "Endpoint": "api/profile/<profile_id>/",
                "method": "GET",
                "description": "To get a profile info",
            },
            {
                "Endpoint": "api/profile/<profile_id>/",
                "method": "PUT",
                "description": "To update a profile",
                "Format of the request:": {
                    "first_name": "<Your name>",
                    "last_name": "<Your last name>",
                    "description": "<Your description>",
                    "profile_picture": "<Your picture path)> (optional)",
                },
            },
            {
                "Endpoint": "api/profile/<profile_id>/",
                "method": "DELETE",
                "description": "To delete a profile",
            },
            {
                "Endpoint": "api/find/",
                "method": "POST",
                "description": "Applies facial identification to find the good profile in the database",
                "Format of the request:": {
                    "image": "<Your image encoded in base64>",
                },
            },
        ]
        return Response(routes, status=status.HTTP_200_OK)


class ProfileView(APIView):
    def get(self, request):
        """To get all Profiles"""

        isinstances = Profile.objects.all()
        serializer = ProfileSerializer(isinstances, many=True)
        return Response(serializer.data)

    def post(self, request):
        """To register a new profile"""

        # create and save the profile
        serializer = ProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # regenerate embeddings
        create_database_embeddings(
            db_path="/src" + settings.MEDIA_URL + settings.PROFILE_PICTURES_FOLDER
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileViewDetailed(APIView):
    def get(self, request, pk):
        """To get a single profile informations"""

        isinstance = Profile.objects.get(pk=pk)
        serializer = ProfileSerializer(isinstance)
        return Response(serializer.data)

    def put(self, request, pk):
        """To update a profile informations"""

        # update and save the profile
        isinstance = Profile.objects.get(pk=pk)
        serializer = ProfileSerializer(isinstance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # regenerate embeddings
        create_database_embeddings(
            db_path="/src" + settings.MEDIA_URL + settings.PROFILE_PICTURES_FOLDER
        )

        return Response(serializer.data)

    def delete(self, request, pk):
        """To delete a Profile"""

        # delete the profile
        try:
            isinstance = Profile.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(
                {"response": "Profile not found"},
                status=status.HTTP_204_NO_CONTENT,
            )
        isinstance.delete()

        # regenerate embeddings by catching the error where there is no longer any profile picture
        create_database_embeddings(
            db_path="/src" + settings.MEDIA_URL + settings.PROFILE_PICTURES_FOLDER
        )

        return Response(
            {"response": "Profile deleted"},
            status=status.HTTP_200_OK,
        )


class FaceRecognitionView(APIView):
    def post(self, request):
        """
        Detect similar faces on the image posted over the all profile picture dataset
        """

        data = request.data["image"].split(",", 1)[1]
        base64_decoded = b64decode(data)
        image = Image.open(io.BytesIO(base64_decoded))
        image_np = np.array(image)
        try:
            # Get the face detected and convert it to JSON format
            faces_detected = json.loads(
                DeepFace.find(
                    img_path=image_np,
                    db_path="/src"
                    + settings.MEDIA_URL
                    + settings.PROFILE_PICTURES_FOLDER,
                    model_name=settings.FACE_DETECTION_MODEL_NAME,
                    distance_metric=settings.FACE_DETECTION_DISTANCE_METRIC,
                    detector_backend=settings.FACE_DETECTION_DETECTOR_BACKEND,
                    silent=True,
                )[0].to_json(orient="records")
            )

        except ValueError:
            return Response(
                {"response": "No faces detected on the input image"},
                status=status.HTTP_204_NO_CONTENT,
            )

        if faces_detected:
            face_detected = faces_detected[0]
            # identify the corresponding profile
            profile_picture_name = (
                settings.PROFILE_PICTURES_FOLDER
                + face_detected["identity"].split("/")[-1]
            )
            profile = Profile.objects.get(profile_picture=profile_picture_name)
            face_detected["profile"] = ProfileSerializer(
                profile
            ).data  # add the profile
            face_detected.pop("identity")  # remove the initial pk
            return Response(
                face_detected,
                status=status.HTTP_200_OK,
            )

        return Response(
            {"response": "No faces match on the database"},
            status=status.HTTP_204_NO_CONTENT,
        )
