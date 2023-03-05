import numpy as np

from django.test import TestCase, Client
from api.models import Profile


class ProfileTestCase(TestCase):
    """Test the profile model and endpoints"""

    def setUp(self) -> None:
        """Setup of the test"""
        Profile.objects.create(
            first_name="root", last_name="root", description="This is a test case"
        )

    def test_database(self) -> None:
        """Test of the database"""
        user = Profile.objects.get(first_name="root")
        self.assertIsInstance(user, Profile)
        self.assertEqual(str(user), "root-root")
        self.assertEqual(user.first_name, "root")
        self.assertEqual(user.last_name, "root")
        self.assertEqual(user.description, "This is a test case")
        self.assertEqual(user.profile_picture, "")

    def test_api(self) -> None:
        """Test register endpoint of the API"""
        c = Client()

        # Register profile by POST on /api/profile/
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

        # Get profiles list info by GET on /api/profile/
        response = c.get(
            "/api/profile/",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

        # Get a profile info by GET on /api/profile/id/
        response = c.get(
            "/api/profile/1/",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data,
            {
                "id": 1,
                "first_name": "root",
                "last_name": "root",
                "description": "This is a test case",
                "profile_picture": None,
            },
        )

        # Update profile by PUT on /api/profile/id/
        response = c.put(
            "/api/profile/1/",
            {
                "first_name": "root2",
                "last_name": "root2",
                "description": "Test case api modif",
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        user = Profile.objects.get(first_name="root2")
        self.assertIsInstance(user, Profile)
        self.assertEqual(str(user), "root2-root2")
        self.assertEqual(user.first_name, "root2")
        self.assertEqual(user.last_name, "root2")
        self.assertEqual(user.description, "Test case api modif")
        self.assertEqual(user.profile_picture, "")

        # Delete a profile info by DELETE on /api/profile/id/
        response = c.delete(
            "/api/profile/2/",
        )
        self.assertEqual(response.status_code, 200)
        user_nb = Profile.objects.filter().count()
        self.assertEqual(user_nb, 1)
