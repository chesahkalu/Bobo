# Import the required modules from Django's database handling module.
from django.db import models

# Import the AbstractUser model from Django's authentication module.
# AbstractUser provides the core implementation for a user model including basic fields and methods.
from django.contrib.auth.models import AbstractUser

# Define a User model that inherits from AbstractUser.
# By inheriting from AbstractUser, we can extend or customize the built-in User model of Django.
class User(AbstractUser):
    pass

# Note about AbstractUser:
# AbstractUser is a flexible and customizable user model provided by Django.
# It includes fields like username, email, first_name, last_name, etc., and methods for authentication.
# By inheriting from AbstractUser, we can utilize these out-of-the-box features and add any additional fields or methods if required.
