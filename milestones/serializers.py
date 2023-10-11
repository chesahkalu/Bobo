# Importing necessary modules from Django Rest Framework's serializers package
from rest_framework import serializers

# Importing the relevant models from the current directory's models.py
from .models import Milestone, LoggedMilestone, Activity, NutritionGuide, Progress

# Serializer for the Milestone model
class MilestoneSerializer(serializers.ModelSerializer):
    """
    Serializes the Milestone model into a format suitable for JSON rendering, 
    making it easier to render into views or to use in API endpoints.
    """
    class Meta:
        model = Milestone
        fields = '__all__'  # This means all fields in the Milestone model will be serialized

# Serializer for the LoggedMilestone model
class LoggedMilestoneSerializer(serializers.ModelSerializer):
    """
    Serializes the LoggedMilestone model to transform it into a JSON-compatible format.
    """
    class Meta:
        model = LoggedMilestone
        fields = '__all__'

# Serializer for the Activity model
class ActivitySerializer(serializers.ModelSerializer):
    """
    Serializes the Activity model to transform it into a JSON-compatible format.
    """
    class Meta:
        model = Activity
        fields = '__all__'

# Serializer for the NutritionGuide model
class NutritionGuideSerializer(serializers.ModelSerializer):
    """
    Serializes the NutritionGuide model to transform it into a JSON-compatible format.
    """
    class Meta:
        model = NutritionGuide
        fields = '__all__'

# Serializer for the Progress model
class ProgressSerializer(serializers.ModelSerializer):
    """
    Serializes the Progress model to transform it into a JSON-compatible format.
    """
    class Meta:
        model = Progress
        fields = '__all__'
