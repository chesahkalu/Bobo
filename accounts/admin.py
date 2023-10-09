# Importing necessary modules from Django's admin package
from django.contrib import admin

# Importing the User model from the current directory's models.py
from .models import User

# Admin class for the User model, customizing its appearance and behavior in the admin interface
class UserAdmin(admin.ModelAdmin):
    # Display these fields in the list view of the admin
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff']
    
    # Enable search functionality on the username and email fields
    search_fields = ['username', 'email']

# Registering the User model with its admin class to the Django admin site
admin.site.register(User, UserAdmin)
