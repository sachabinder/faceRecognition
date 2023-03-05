from django.urls import path
from .views import ProfileView, ProfileViewDetailed, FaceRecognitionView

urlpatterns = [
    path("profile/", ProfileView.as_view(), name="profile_list"),
    path("profile/<int:pk>/", ProfileViewDetailed.as_view(), name="profile_detailed"),
    path("find/", FaceRecognitionView.as_view(), name="finde_face"),
]
