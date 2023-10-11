# Import necessary Django forms and models modules
from django import forms
from .models import Baby, Milestone
from milestones.models import Milestone, LoggedMilestone
from django.forms import CheckboxSelectMultiple

# Define the MilestoneLogForm, a form that allows users to log milestones for a baby
class MilestoneLogForm(forms.ModelForm):

    # A multiple choice field representing milestones that can be checked off
    logged_milestones = forms.ModelMultipleChoiceField(
        queryset=Milestone.objects.none(),  # Initialize with no milestones, will be set in __init__
        widget=CheckboxSelectMultiple(),  # Use checkboxes to represent multiple choices
        required=False  # It's optional to select any milestones
    )

    # Meta class to associate the form with the Baby model and specify which fields to use
    class Meta:
        model = Baby
        fields = ['logged_milestones']

    # Override the initialization method to set custom querysets and initial data
    def __init__(self, *args, **kwargs):
        # Pop off custom arguments passed to the form
        baby = kwargs.pop('baby', None)
        grouped_milestones = kwargs.pop('grouped_milestones', None)
        month = kwargs.pop('month', baby.age_in_months)  # default to baby's age if month is not provided

        super().__init__(*args, **kwargs)  # Initialize the parent form

        # If a baby instance is provided, filter milestones for the baby's age
        if baby:
            self.fields['logged_milestones'].queryset = Milestone.objects.filter(month=month)
        
        # If grouped milestones are provided, store them in the form instance
        if grouped_milestones:
            self.grouped_milestones = grouped_milestones

    # Override the save method to implement custom saving logic
    def save(self, commit=True):
        baby = self.instance
        logged_milestones = self.cleaned_data['logged_milestones']

        # Dictionary comprehension to extract milestone dates from the POST data
        milestone_dates = {int(m_id.replace('milestone_date_', '')): date for m_id, date in self.data.items() if m_id.startswith("milestone_date_") and date}

        if commit:
            # Remove logged milestones that are not checked off for a specific month
            LoggedMilestone.objects.filter(baby=baby, milestone__month=self.fields['logged_milestones'].queryset.first().month).exclude(milestone__in=logged_milestones).delete()

        # Create or update LoggedMilestone entries based on selected milestones
        for milestone in logged_milestones:
            LoggedMilestone.objects.update_or_create(baby=baby, milestone=milestone, defaults={'date_observed': milestone_dates.get(milestone.id)})

        baby.save()  # Save the baby instance
        return baby  # Return the saved baby instance
