from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from datetime import date
from dateutil.relativedelta import relativedelta
from milestones.utils import generate_progress_report
from django.apps import apps

# The Baby model represents individual baby profiles within the application.
class Baby(models.Model):

    # ForeignKey establishes a many-to-one relationship with Django's built-in User model.
    # This associates each baby with a specific user (parent) in the system.
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Fields capturing basic details about the baby.
    name = models.CharField(max_length=200, null=True)
    gender = models.CharField(max_length=50, choices=[('Male', 'Male'), ('Female', 'Female')], null=True)
    
    # Field for uploading and storing baby's picture.
    picture = models.ImageField(upload_to='baby_pictures/', blank=True, null=True)
    
    # Date field capturing the baby's birth date.
    date_of_birth = models.DateField(null=False)
    
    # Fields capturing the baby's weight and height.
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    height = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    # Details about the parent.
    parent_name = models.CharField(max_length=200, null=True)
    parent_relationship = models.CharField(max_length=200, null=False)
    
    # ManyToManyField establishes a many-to-many relationship with the Milestone model.
    # This allows tracking of multiple milestones for a single baby.
    logged_milestones = models.ManyToManyField('milestones.Milestone', blank=True, related_name='babies')
    
    # ForeignKey establishing a one-to-many relationship with the Progress model.
    # It links the baby's progress report with the baby's profile.
    progress = models.ForeignKey('milestones.Progress', on_delete=models.CASCADE, null=True, related_name='babies')

    # Property to compute the baby's age in months based on the current date and date of birth.
    @property
    def age_in_months(self):
        rdelta = relativedelta(date.today(), self.date_of_birth)
        return rdelta.years * 12 + rdelta.months

    # Method to update the progress report for the baby based on the logged milestones.
    def update_progress(self):
        # Dynamically getting the Progress model.
        Progress = apps.get_model('milestones', 'Progress')
        progress, created = Progress.objects.get_or_create(baby=self)
        logged_milestones = self.logged_milestones.all()
        # Generate the progress report based on the milestones.
        progress.report = generate_progress_report(logged_milestones, self.age_in_months)
        progress.save()

    # String representation of the Baby model to display the baby's name in the Django admin interface.
    def __str__(self):
        return self.name
