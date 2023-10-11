# Importing necessary modules from Django REST framework's viewsets package.
# ViewSets define the CRUD operations that will be used for a model instance.
from rest_framework import viewsets

# Importing relevant models from the milestones app's models module.
from .models import Milestone, LoggedMilestone, Activity, NutritionGuide, Progress

# Importing serializers for the models. Serializers allow complex data types, 
# like queryset and model instances, to be converted to Python data types 
# that can then be easily rendered into JSON content.
from .serializers import (MilestoneSerializer, LoggedMilestoneSerializer, 
                          ActivitySerializer, NutritionGuideSerializer, ProgressSerializer)

# Defining a ViewSet for the Milestone model.
class MilestoneViewSet(viewsets.ModelViewSet):
    # The queryset defines which records of the model we want to operate on.
    queryset = Milestone.objects.all()
    # The serializer class specifies how the queryset should be serialized.
    serializer_class = MilestoneSerializer

# Defining a ViewSet for the LoggedMilestone model.
class LoggedMilestoneViewSet(viewsets.ModelViewSet):
    queryset = LoggedMilestone.objects.all()
    serializer_class = LoggedMilestoneSerializer

# Defining a ViewSet for the Activity model.
class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

# Defining a ViewSet for the NutritionGuide model.
class NutritionGuideViewSet(viewsets.ModelViewSet):
    queryset = NutritionGuide.objects.all()
    serializer_class = NutritionGuideSerializer

# Defining a ViewSet for the Progress model.
class ProgressViewSet(viewsets.ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer
