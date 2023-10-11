# Import necessary Django libraries
from django.db import models
from django.utils import timezone
from django.apps import apps

# Import relevant model and utility function
from babies.models import Baby
from .utils import generate_progress_report

# Define the Milestone model to capture various developmental stages in a baby's life
class Milestone(models.Model):
    month = models.IntegerField()  # The month at which the milestone is typically observed
    description = models.TextField()  # Description of the milestone
    area = models.CharField(max_length=100)  # Area or category of the milestone (e.g., Physical, Cognitive)

    def __str__(self):
        return self.description  # Return description for any string representation of this object

# Define the LoggedMilestone model to track when a baby achieves specific milestones
class LoggedMilestone(models.Model):
    baby = models.ForeignKey(Baby, on_delete=models.CASCADE, related_name='logged_milestones_set')  # Reference to the associated baby
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE, related_name='logged_milestones')  # Reference to the associated milestone
    date_observed = models.DateField(null=True, blank=True)  # Date when the milestone was observed

    def __str__(self):
        return f'{self.baby.name}: {self.milestone.description}'  # String representation showing baby's name and milestone

# Define the Activity model to suggest activities suitable for a baby's age
class Activity(models.Model):
    month = models.IntegerField()  # The month for which the activity is suitable
    title = models.CharField(max_length=100)  # Title of the activity
    activity = models.TextField()  # Description or details of the activity
    imageUrls = models.JSONField(null=True)  # URLs of images related to the activity, stored in JSON format

# Define the NutritionGuide model to provide nutritional guidance based on a baby's age
class NutritionGuide(models.Model):
    month = models.IntegerField()  # The month for which the guide is relevant
    guide = models.TextField()  # The actual nutrition guide or advice

# Define the Progress model to track and report a baby's developmental progress over time
class Progress(models.Model):
    baby = models.ForeignKey('babies.Baby', on_delete=models.CASCADE, related_name='progresses')  # Reference to the associated baby
    report = models.TextField()  # The text content of the progress report

    def __str__(self):
        return f'Progress for {self.baby.name} at {timezone.now()}'  # String representation showing baby's name and current date

    # Override the save method to update the baby's progress report whenever a progress object is saved
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        Baby = apps.get_model('babies', 'Baby')  # Dynamically retrieve the Baby model
        baby = Baby.objects.get(id=self.baby_id)  # Fetch the associated baby
        # Generate and set the progress report for the baby based on logged milestones and age
        baby.progress_report = generate_progress_report(baby.logged_milestones_set.all(), baby.age_in_months)
        baby.save()  # Save the updated baby object
