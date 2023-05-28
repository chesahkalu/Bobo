from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from datetime import date
from dateutil.relativedelta import relativedelta


# Create your models here


class Baby(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=False)
    gender = models.CharField(max_length=50, choices=[('Male', 'Male'), ('Female', 'Female')], null=True)
    picture = models.ImageField(upload_to='baby_pictures/', blank=True, null=True)
    date_of_birth = models.DateField(null=False)
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    height = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    age_in_months = models.IntegerField(null=False)
    parent_name = models.CharField(max_length=200, null=False)
    parent_relationship = models.CharField(max_length=200, null=False)

    @property
    def age_in_months(self):
        from dateutil.relativedelta import relativedelta
        from datetime import date
        rdelta = relativedelta(date.today(), self.dob)
        return rdelta.years * 12 + rdelta.months
