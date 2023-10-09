# Import the necessary module from Django's applications handling libraries.
from django.apps import AppConfig

# Define an AccountsConfig class that inherits from Django's AppConfig.
# This class provides application-specific configuration for the 'accounts' app.
class AccountsConfig(AppConfig):
    # Specifies the default type of auto-incrementing primary key to use when 
    # no explicit primary key field is defined on a model.
    default_auto_field = 'django.db.models.BigAutoField'
    
    # Define the name of the application for which this configuration is created.
    name = 'accounts'
