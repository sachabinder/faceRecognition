from django.db import models

import os
import uuid


def upload_to(instance, filename):
    img_extension = os.path.splitext(filename)[-1]

    return "profile_picture/" + str(uuid.uuid4()) + img_extension


class Profile(models.Model):
    first_name = models.CharField(max_length=80, blank=False, null=False)
    last_name = models.CharField(max_length=80, blank=False, null=False)
    description = models.TextField()
    profile_picture = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def __str__(self) -> str:
        return self.first_name + "-" + self.last_name
