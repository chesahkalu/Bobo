from django.core.management.base import BaseCommand
from health.models import NutritionGuide

class Command(BaseCommand):
    help = 'Load nutritional guides into the database'

    def handle(self, *args, **options):
        guides_data = [
            {"month": i, "guide": self.generate_guide(i)} for i in range(49)
        ]

        # Clear existing data
        NutritionGuide.objects.all().delete()

        # Populate new data
        for data in guides_data:
            NutritionGuide.objects.create(month=data['month'], guide=data['guide'])

        self.stdout.write(self.style.SUCCESS('Successfully loaded nutrition guides for 48 months.'))

    def generate_guide(self, month):
        # Basic nutritional guides that can be customized further
        if month == 0:
            return "Breast milk or infant formula only."
        elif month < 6:
            return "Continue with breast milk or formula. Consider introducing Vitamin D supplements if exclusively breastfeeding."
        elif month == 6:
            return "Introduce solid foods, starting with iron-fortified cereals. Continue breastfeeding or formula feeding."
        elif month < 12:
            return "Gradually introduce a variety of solid foods, including pureed fruits, vegetables, and meats. Continue with breast milk or formula."
        elif month < 24:
            return "Introduce more textured foods and a greater variety of family foods. Keep offering breast milk or formula alongside meals."
        elif month < 36:
            return "Encourage self-feeding with finger foods and a varied diet to include all food groups."
        elif month < 48:
            return "Focus on providing a balanced diet with whole grains, fruits, vegetables, and appropriate proteins. Limit sugary snacks."
        else:
            return "Continue encouraging a balanced diet that includes a variety of foods from all food groups."
