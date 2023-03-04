from django.urls import re_path
from .views import ProfileView, FaceRecognitionView

urlpatterns = [
    re_path(r"^profile/$", ProfileView.as_view(), name="profile"),
    re_path(r"^find/$", FaceRecognitionView.as_view(), name="profile"),
]
