from django.apps import AppConfig
from deepface import DeepFace
from django.conf import settings


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"

    def ready(self):
        """
        Dowloading required weight for the face detection model
        at the startup of the app
        """
        DeepFace.build_model(model_name=settings.FACE_DETECTION_MODEL_NAME)
