from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = Profile
        fields = [
            "id",
            "first_name",
            "last_name",
            "description",
            "profile_picture",
        ]
