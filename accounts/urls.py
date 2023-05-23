from django.urls import path
from . import views
from .views import RegisterAPIView, LoginAPIView, DeleteUserAPIView

urlpatterns = [
    path('signup/', RegisterAPIView.as_view(), name='signup'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('delete_account/', DeleteUserAPIView.as_view(), name='delete_account'),
]
