from django import forms
from .models import Baby, Milestone
from milestones.models import Milestone, LoggedMilestone
from django.forms import CheckboxSelectMultiple


class MilestoneLogForm(forms.ModelForm):
    logged_milestones = forms.ModelMultipleChoiceField(
        queryset=Milestone.objects.none(),
        widget=CheckboxSelectMultiple(),
        required=False
    )

    class Meta:
        model = Baby
        fields = ['logged_milestones']

    def __init__(self, *args, **kwargs):
        baby = kwargs.pop('baby', None)
        grouped_milestones = kwargs.pop('grouped_milestones', None)
        month = kwargs.pop('month', baby.age_in_months)  # default to baby's age if month is not provided
        super().__init__(*args, **kwargs)
        if baby:
            self.fields['logged_milestones'].queryset = Milestone.objects.filter(month=month)
        if grouped_milestones:
            self.grouped_milestones = grouped_milestones

    def save(self, commit=True):
        baby = self.instance
        logged_milestones = self.cleaned_data['logged_milestones']
        milestone_dates = {int(m_id.replace('milestone_date_', '')): date for m_id, date in self.data.items() if m_id.startswith("milestone_date_") and date}
        if commit:
            # Delete LoggedMilestones not in logged_milestones for a specific month
            LoggedMilestone.objects.filter(baby=baby, milestone__month=self.fields['logged_milestones'].queryset.first().month).exclude(milestone__in=logged_milestones).delete()

        for milestone in logged_milestones:
            LoggedMilestone.objects.update_or_create(baby=baby, milestone=milestone, defaults={'date_observed': milestone_dates.get(milestone.id)})
        baby.save()
        return baby


