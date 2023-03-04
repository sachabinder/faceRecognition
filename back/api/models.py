from django.db import models
from django.conf import settings

import os
import uuid


def upload_to(instance, filename):
    """
    upload funtion for profile picture
    """
    img_extension = os.path.splitext(filename)[-1]
    return settings.PROFILE_PICTURES_FOLDER + str(uuid.uuid4()) + img_extension


class Profile(models.Model):
    """
    Profile model that whould correspond to a user
    TODO : Connect it with a one to one field if auth is needed
    """

    first_name = models.CharField(max_length=80, blank=False, null=False)
    last_name = models.CharField(max_length=80, blank=False, null=False)
    description = models.TextField()
    profile_picture = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def __str__(self) -> str:
        return self.first_name + "-" + self.last_name
