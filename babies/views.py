from django.shortcuts import render, redirect, get_object_or_404
from .forms import BabyForm
from .models import Baby
from django.contrib.auth.decorators import login_required
from milestones.models import Progress

@login_required
def baby_create_view(request):
    if request.method == 'POST':
        form = BabyForm(request.POST, request.FILES)
        if form.is_valid():
            baby = form.save(commit=False)
            baby.user = request.user
            baby.save()

            # create Progress instance for this baby if it doesn't exist
            Progress.objects.get_or_create(baby=baby)

            return redirect('babies:baby_detail', baby.id)
    else:
        form = BabyForm()
    return render(request, 'babies/baby_form.html', {'form': form})


@login_required
def welcome_page(request, id):
    baby = get_object_or_404(Baby, id=id)
    return render(request, 'babies/welcome_page.html', {'baby': baby})

@login_required
def baby_detail_view(request, id):
    baby = Baby.objects.get(id=id)
    progress, created = Progress.objects.get_or_create(baby=baby)
    return render(request, 'babies/baby_detail.html', {'baby': baby, 'progress': progress})


@login_required
def baby_update_view(request, id):
    baby = get_object_or_404(Baby, id=id)
    if request.method == 'POST':
        form = BabyForm(request.POST, request.FILES, instance=baby)
        if form.is_valid():
            form.save()
            return redirect('babies:baby_detail', baby.id)
    else:
        form = BabyForm(instance=baby)
    return render(request, 'babies/baby_form.html', {'form': form})

@login_required
def babies_journey_view(request):
    babies = Baby.objects.filter(user=request.user)
    return render(request, 'babies/babies_journey.html', {'babies': babies})

@login_required
def baby_delete_view(request, id):
    baby = get_object_or_404(Baby, id=id)
    if request.method == "POST":
        baby.delete()
        return redirect('babies:babies_journey')
    else:
        return render(request, 'babies/baby_confirm_delete.html', {'baby': baby})
# Importing necessary modules and methods
from django.shortcuts import render, redirect, get_object_or_404
from .forms import BabyForm
from .models import Baby
from django.contrib.auth.decorators import login_required
from milestones.models import Progress

# View for creating a new baby profile. Requires user to be logged in.
@login_required
def baby_create_view(request):
    # Check if the request method is POST
    if request.method == 'POST':
        # Create a form instance and populate it with data from the request
        form = BabyForm(request.POST, request.FILES)
        # Validate the form
        if form.is_valid():
            # Save the form data to the database without committing immediately
            baby = form.save(commit=False)
            # Assign the logged-in user to the baby's user field
            baby.user = request.user
            baby.save()
            
            # Create a Progress instance for this baby if it doesn't exist
            Progress.objects.get_or_create(baby=baby)
            
            # Redirect the user to the detail view of the baby
            return redirect('babies:baby_detail', baby.id)
    else:
        # If the request method is not POST, display a blank form
        form = BabyForm()
    return render(request, 'babies/baby_form.html', {'form': form})


# Welcome page view for the baby, requires user to be logged in
@login_required
def welcome_page(request, id):
    # Get the baby object or return a 404 error if not found
    baby = get_object_or_404(Baby, id=id)
    return render(request, 'babies/welcome_page.html', {'baby': baby})


# Detailed view for a specific baby. Requires user to be logged in.
@login_required
def baby_detail_view(request, id):
    baby = Baby.objects.get(id=id)
    progress, created = Progress.objects.get_or_create(baby=baby)
    return render(request, 'babies/baby_detail.html', {'baby': baby, 'progress': progress})


# View for updating an existing baby profile. Requires user to be logged in.
@login_required
def baby_update_view(request, id):
    baby = get_object_or_404(Baby, id=id)
    if request.method == 'POST':
        form = BabyForm(request.POST, request.FILES, instance=baby)
        if form.is_valid():
            form.save()
            return redirect('babies:baby_detail', baby.id)
    else:
        form = BabyForm(instance=baby)
    return render(request, 'babies/baby_form.html', {'form': form})

# View for seeing the journey (profiles) of all babies associated with the logged-in user
@login_required
def babies_journey_view(request):
    babies = Baby.objects.filter(user=request.user)
    return render(request, 'babies/babies_journey.html', {'babies': babies})


# View for deleting a specific baby profile. Requires user to be logged in.
@login_required
def baby_delete_view(request, id):
    baby = get_object_or_404(Baby, id=id)
    if request.method == "POST":
        baby.delete()
        return redirect('babies:babies_journey')
    else:
        return render(request, 'babies/baby_confirm_delete.html', {'baby': baby})
