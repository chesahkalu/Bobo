# Importing necessary functions and classes from Django's built-in packages
from django.shortcuts import render, redirect
from django.contrib import messages

# Importing forms and models specific to the app
from .forms import MilestoneLogForm
from .models import Milestone, Activity, NutritionGuide

# Importing external models (from the babies app)
from babies.models import Baby

# Importing the groupby function from Python's standard library (itertools)
from itertools import groupby


def log_milestone(request, baby_id):
    """Logs a milestone for a given baby and month."""
    
    # Fetching baby data based on given baby_id
    baby = Baby.objects.get(id=baby_id)
    
    # Fetching milestones appropriate for the baby's age
    milestones = Milestone.objects.filter(month=baby.age_in_months)
    
    # Mapping logged milestones for the baby
    logged_milestones = {lm.milestone.id: lm.date_observed for lm in baby.logged_milestones_set.all()}
    
    # Grouping milestones by their area
    grouped_milestones = {}
    for milestone in milestones:
        grouped_milestones.setdefault(milestone.area, []).append((milestone.id, milestone.description))
    
    # Handling form submission
    if request.method == 'POST':
        form = MilestoneLogForm(request.POST, instance=baby, baby=baby, grouped_milestones=grouped_milestones)
        if form.is_valid():
            form.save()
            messages.success(request, 'Milestones logged successfully.')
            return redirect('milestones:log_milestone', baby_id=baby.id)
    else:
        form = MilestoneLogForm(instance=baby, baby=baby, grouped_milestones=grouped_milestones)
    
    # Rendering the appropriate template with the required context
    return render(request, 'milestones/log_milestone.html', {'form': form, 'grouped_milestones': grouped_milestones, 'logged_milestones': logged_milestones, 'baby': baby})


def log_previous_milestone(request, baby_id, month):
    """Logs a milestone for a given baby and a previous month."""
    
    # Fetching baby data based on given baby_id
    baby = Baby.objects.get(id=baby_id)
    
    # Fetching milestones appropriate for the provided month
    milestones = Milestone.objects.filter(month=month)
    
    # Mapping logged milestones for the baby for the given month
    logged_milestones = {lm.milestone.id: lm.date_observed for lm in baby.logged_milestones_set.filter(milestone__month=month)}
    
    # Grouping milestones by their area
    grouped_milestones = {}
    for milestone in milestones:
        grouped_milestones.setdefault(milestone.area, []).append((milestone.id, milestone.description))
    
    # Handling form submission
    if request.method == 'POST':
        form = MilestoneLogForm(request.POST, instance=baby, baby=baby, month=month, grouped_milestones=grouped_milestones)
        if form.is_valid():
            form.save()
            messages.success(request, 'Milestones logged successfully.')
            return redirect('milestones:log_previous_milestone', baby_id=baby.id, month=month)
    else:
        form = MilestoneLogForm(instance=baby, baby=baby, month=month, grouped_milestones=grouped_milestones)
    
    # Rendering the appropriate template with the required context
    return render(request, 'milestones/log_milestone.html', {'form': form, 'grouped_milestones': grouped_milestones, 'logged_milestones': logged_milestones, 'baby': baby, 'month': month})

def view_expected_milestones(request, baby_id):
    """Displays the expected milestones for a given baby based on age."""
    
    # Fetching baby data based on given baby_id
    baby = Baby.objects.get(id=baby_id)
    
    # Fetching expected milestones based on baby's age
    expected_milestones = Milestone.objects.filter(month=baby.age_in_months)
    
    # Rendering the appropriate template with the required context
    return render(request, 'milestones/view_expected_milestones.html', {'expected_milestones': expected_milestones, 'baby': baby})

def view_activities(request, baby_id):
    """Displays the activities for a given baby based on age."""
    
    # Fetching baby data based on given baby_id
    baby = Baby.objects.get(id=baby_id)
    
    # Fetching activities appropriate for the baby's age
    activities = Activity.objects.filter(month=baby.age_in_months)
    
    # Rendering the appropriate template with the required context
    return render(request, 'milestones/activities.html', {'activities': activities, 'baby': baby})

def view_nutrition_guide(request, baby_id):
    """Displays the nutrition guide for a given baby based on age."""
    
    # Fetching baby data based on given baby_id
    baby = Baby.objects.get(id=baby_id)
    
    # Fetching the nutrition guide appropriate for the baby's age
    nutrition_guide = NutritionGuide.objects.filter(month=baby.age_in_months)
    
    # Rendering the appropriate template with the required context
    return render(request, 'milestones/nutrition_guide.html', {'nutrition_guide': nutrition_guide, 'baby': baby})
