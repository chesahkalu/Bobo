from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import User

class RegisterAPIView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        try:
            user = User.objects.create_user(username=username, password=password)
        except:
            return Response({"error": "A user with that username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"success": "User created successfully"}, status=status.HTTP_201_CREATED)

class LoginAPIView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            return Response({"success": "User logged in successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)

class DeleteUserAPIView(APIView):
    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"success": "User deleted successfully"}, status=status.HTTP_200_OK)
