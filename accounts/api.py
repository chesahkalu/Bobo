# accounts/api.py

# Import the User model from the models module.
from .models import User

# Import viewsets module from Django Rest Framework (DRF) 
# which provides the foundation for building web APIs.
from rest_framework import viewsets

# Import the UserSerializer from the serializers module, 
# which converts complex data types (like queryset) to Python native data types.
from .serializers import UserSerializer

# Define a UserViewSet class that inherits from DRF's ModelViewSet.
# This class automatically provides CRUD operations on the User model.
class UserViewSet(viewsets.ModelViewSet):
    # Define the query to get all user objects.
    queryset = User.objects.all()
    
    # Specify the serializer class for this viewset, 
    # which determines how the user objects are converted to JSON.
    serializer_class = UserSerializer
