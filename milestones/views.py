from django.shortcuts import render, redirect
from .forms import MilestoneLogForm
from .models import Milestone, Activity, NutritionGuide
from babies.models import Baby
from itertools import groupby
from django.contrib import messages

from django.shortcuts import render, redirect
from .forms import MilestoneLogForm
from .models import Milestone, Activity, NutritionGuide
from babies.models import Baby
from itertools import groupby
from django.contrib import messages

def log_milestone(request, baby_id):
    baby = Baby.objects.get(id=baby_id)
    milestones = Milestone.objects.filter(month=baby.age_in_months)
    logged_milestones = {lm.milestone.id: lm.date_observed for lm in baby.logged_milestones_set.all()}

    grouped_milestones = {}
    for milestone in milestones:
        grouped_milestones.setdefault(milestone.area, []).append((milestone.id, milestone.description))

    if request.method == 'POST':
        form = MilestoneLogForm(request.POST, instance=baby, baby=baby, grouped_milestones=grouped_milestones)
        if form.is_valid():
            form.save()
            messages.success(request, 'Milestones logged successfully.')
            return redirect('milestones:log_milestone', baby_id=baby.id)
    else:
        form = MilestoneLogForm(instance=baby, baby=baby, grouped_milestones=grouped_milestones)

    return render(request, 'milestones/log_milestone.html', {'form': form, 'grouped_milestones': grouped_milestones, 'logged_milestones': logged_milestones, 'baby': baby})


def log_previous_milestone(request, baby_id, month):
    baby = Baby.objects.get(id=baby_id)
    milestones = Milestone.objects.filter(month=month)
    logged_milestones = {lm.milestone.id: lm.date_observed for lm in baby.logged_milestones_set.filter(milestone__month=month)}

    grouped_milestones = {}
    for milestone in milestones:
        grouped_milestones.setdefault(milestone.area, []).append((milestone.id, milestone.description))

    if request.method == 'POST':
        form = MilestoneLogForm(request.POST, instance=baby, baby=baby, month=month, grouped_milestones=grouped_milestones)
        if form.is_valid():
            form.save()
            messages.success(request, 'Milestones logged successfully.')
            return redirect('milestones:log_previous_milestone', baby_id=baby.id, month=month)
    else:
        form = MilestoneLogForm(instance=baby, baby=baby, month=month, grouped_milestones=grouped_milestones)

    return render(request, 'milestones/log_milestone.html', {'form': form, 'grouped_milestones': grouped_milestones, 'logged_milestones': logged_milestones, 'baby': baby, 'month': month})






def view_expected_milestones(request, baby_id):
    baby = Baby.objects.get(id=baby_id)
    expected_milestones = Milestone.objects.filter(month=baby.age_in_months)
    return render(request, 'milestones/view_expected_milestones.html', {'expected_milestones': expected_milestones, 'baby': baby})

def view_activities(request, baby_id):
    baby = Baby.objects.get(id=baby_id)
    activities = Activity.objects.filter(month=baby.age_in_months)
    return render(request, 'milestones/activities.html', {'activities': activities, 'baby': baby})

def view_nutrition_guide(request, baby_id):
    baby = Baby.objects.get(id=baby_id)
    nutrition_guide = NutritionGuide.objects.filter(month=baby.age_in_months)
    return render(request, 'milestones/nutrition_guide.html', {'nutrition_guide': nutrition_guide, 'baby': baby})
