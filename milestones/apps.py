# Importing necessary modules from Django's apps package
from django.apps import AppConfig

# Define the MilestonesConfig class which extends Django's AppConfig class
class MilestonesConfig(AppConfig):

    # Specify the default primary key type to use when AutoField is not explicitly defined in a model.
    # In this case, BigAutoField is used which is a 64-bit integer, allowing for more unique ID values.
    default_auto_field = 'django.db.models.BigAutoField'

    # Name of the app. It is used, for instance, in migrations to reference this app.
    name = 'milestones'
