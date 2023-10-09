# Import the path function from Django's URL handling module.
from django.urls import path

# Import specific view functions from the views module of the current app.
from .views import signup_view, login_view, home_view

# Import the views module to access any other required view functions from the current app.
from . import views

# Define the URL patterns and associate them with their respective views.
urlpatterns = [
    # URL for user signup.
    path('signup/', views.signup_view, name='signup'),
    
    # URL for user login.
    path('login/', views.login_view, name='login'),
    
    # URL for the home page.
    path('home/', views.home_view, name='home'),
    
    # URL to handle user logout.
    path('logout/', views.logout_view, name='logout'),
    
    # URL to initiate the account deletion process.
    path('delete_account/', views.delete_account_view, name='delete_account'),
    
    # URL for confirming account deletion.
    path('delete_account_confirm/', views.delete_account_confirm_view, name='delete_account_confirm'),
]
