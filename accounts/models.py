import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    company = models.CharField(max_length=50)

    ROLE_CHOICES = (
        ("Product Manager", "Product Manager"),
        ("Software Engineer", "Software Engineer"),
        ("Data Scientist", "Data Scientist"),
        ("Full Stack Designer", "Full Stack Designer"),
        ("Front End Designer", "Front End Designer"),
        ("Back End Designer", "Back End Designer"),
        ("Database Designer", "Database Designer"),
    )

    role = models.CharField(
        max_length=50, choices=ROLE_CHOICES, default="Software Engineer"
    )
    is_verified = models.BooleanField(default=False)

    STATUS_CHOICES = (
        ("active", "Active"),
        ("banned", "Banned"),
    )
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="active")

    def __str__(self):
        return self.name
