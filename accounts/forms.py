# Import the necessary modules from Django's form handling libraries.
from django import forms
# Import the built-in UserCreationForm that provides a basic registration form.
from django.contrib.auth.forms import UserCreationForm

# Import the User model defined in the current application's models module.
from .models import User

# Define a SignUpForm that inherits from Django's UserCreationForm.
# This form will be used for registering new users.
class SignUpForm(UserCreationForm):
    # Add an email field to the form with constraints and a help text.
    email = forms.EmailField(max_length=200, help_text='Required')

    # Meta class provides additional options and configurations for the SignUpForm.
    class Meta:
        # Specify the model the form will interact with.
        model = User
        # Define the fields that will be included in the form.
        fields = ('username', 'email', 'password1', 'password2', )
