from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer of the Profile Model which allow the profile
    picture field to not be required.
    """

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
