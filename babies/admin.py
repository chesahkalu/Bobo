from django.contrib import admin
from .models import Baby

# Admin customization for the Baby model.
class BabyAdmin(admin.ModelAdmin):
    # Fields to display in the list view.
    list_display = ['name', 'gender', 'date_of_birth', 'weight', 'height', 'parent_name', 'parent_relationship']

    # Filters on the side for narrowing down records.
    list_filter = ['gender', 'date_of_birth']

    # Fields where search functionality should be enabled.
    search_fields = ['name', 'parent_name']

    # Fieldsets to organize the admin form layout.
    fieldsets = (
        ('Baby Details', {
            'fields': ('name', 'gender', 'picture', 'date_of_birth', 'weight', 'height')
        }),
        ('Parent Details', {
            'fields': ('parent_name', 'parent_relationship')
        }),
        ('Milestones and Progress', {
            'fields': ('logged_milestones', 'progress')
        }),
    )

    # Making the many-to-many field use a more user-friendly widget.
    filter_horizontal = ['logged_milestones']

    # A method to display the baby's age in months in the list view.
    def age_in_months_display(self, obj):
        return obj.age_in_months
    age_in_months_display.short_description = 'Age (in months)'

    # Enabling the method in the list display.
    list_display.append('age_in_months_display')

# Registering the Baby model with the admin site.
admin.site.register(Baby, BabyAdmin)
