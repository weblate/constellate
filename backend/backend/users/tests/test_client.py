import pytest
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

pytestmark = pytest.mark.django_db


class TestIntegrationTestToAddProfilePhoto:
    def test_add_photo(self, db, profile, tmp_pic_path):

        token = Token(key="short-and-readable", user=profile.user)
        token.save()

        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

        payload = {"photo": open(tmp_pic_path, "rb"), "id": profile.id}

        res = client.put(f"http://testserver/api/upload/{profile.id}/", payload)

        assert res.status_code == 200
        # check that we have the absolute URL in the payload
        assert "http://testserver/" in res.data["photo"]
