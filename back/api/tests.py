import json

from django.test import TestCase, Client
from api.models import Profile


class ProfileTestCase(TestCase):
    """Test the profile model and endpoints"""

    def setUp(self) -> None:
        Profile.objects.create(
            first_name="root", last_name="root", description="This is a test case"
        )

    def test_database(self) -> None:
        user = Profile.objects.get(first_name="root")
        self.assertIsInstance(user, Profile)
        self.assertEqual(str(user), "root-root")
        self.assertEqual(user.first_name, "root")
        self.assertEqual(user.last_name, "root")
        self.assertEqual(user.description, "This is a test case")
        self.assertEqual(user.profile_picture, "")

    def test_api(self) -> None:
        c = Client()
        response = c.post(
            "/api/profile/",
            {
                "first_name": "Sacha",
                "last_name": "Bobo",
                "description": "Test case api",
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        user = Profile.objects.get(first_name="Sacha")
        self.assertIsInstance(user, Profile)
        self.assertEqual(str(user), "Sacha-Bobo")
        self.assertEqual(user.first_name, "Sacha")
        self.assertEqual(user.last_name, "Bobo")
        self.assertEqual(user.description, "Test case api")
        self.assertEqual(user.profile_picture, "")
