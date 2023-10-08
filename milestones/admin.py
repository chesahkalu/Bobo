# Importing necessary modules from Django's admin package
from django.contrib import admin

# Importing the relevant models from the current directory's models.py
from .models import Milestone, LoggedMilestone, Activity, NutritionGuide, Progress

# Admin class for the Milestone model, customizing its appearance and behavior in the admin interface
class MilestoneAdmin(admin.ModelAdmin):
    # Display these fields in the list view of the admin
    list_display = ['month', 'description', 'area']
    # Enable search functionality on the description and area fields
    search_fields = ['description', 'area']

# Admin class for the LoggedMilestone model
class LoggedMilestoneAdmin(admin.ModelAdmin):
    # Display these fields in the list view
    list_display = ['baby', 'milestone', 'date_observed']
    # Enable search functionality based on baby's name and milestone description
    search_fields = ['baby__name', 'milestone__description']
    # Provide filters to narrow down records based on the date observed
    list_filter = ['date_observed']

# Admin class for the Activity model
class ActivityAdmin(admin.ModelAdmin):
    # Display these fields in the list view
    list_display = ['month', 'title']
    # Enable search functionality on the title field
    search_fields = ['title']

# Admin class for the NutritionGuide model
class NutritionGuideAdmin(admin.ModelAdmin):
    # Display these fields in the list view
    list_display = ['month', 'guide']
    # Enable search functionality on the guide field
    search_fields = ['guide']

# Admin class for the Progress model
class ProgressAdmin(admin.ModelAdmin):
    # Display these fields in the list view
    list_display = ['baby', 'report']
    # Enable search functionality based on baby's name and report content
    search_fields = ['baby__name', 'report']

# Registering the models with their respective admin classes to the Django admin site
admin.site.register(Milestone, MilestoneAdmin)
admin.site.register(LoggedMilestone, LoggedMilestoneAdmin)
admin.site.register(Activity, ActivityAdmin)
admin.site.register(NutritionGuide, NutritionGuideAdmin)
admin.site.register(Progress, ProgressAdmin)
