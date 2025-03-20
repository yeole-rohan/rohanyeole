from django.contrib.auth.models import AbstractUser
from django.db import models
from api.models import UserManager

class User(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Removed 'username' as it's optional

    objects = UserManager()

    def __str__(self):
        return self.email