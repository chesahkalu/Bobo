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
