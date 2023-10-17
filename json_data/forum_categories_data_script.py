import os
import sys

# Add the project directory to the sys.path
project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.append(project_root)

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Bobo.settings')

# Configure Django settings
import django
django.setup()

from forum.models import Category  # Adjust the import based on where your forum app models are located

categories_data = [
    "General Baby Care",
    "Milestone Achievements",
    "Baby Nutrition & Feeding",
    "Sleeping Patterns & Tips",
    "Baby Health & Vaccinations",
    "Parenting & Relationship",
    "Toys, Books & Activities",
    "Child Safety & Precautions",
    "Traveling with Babies",
    "Baby Clothing & Fashion",
    "Baby Gear Recommendations",
    "Postpartum Care & Recovery",
    "Child Education & Development",
    "DIY & Craft Ideas",
    "Baby Names & Meanings",
    "Parenting Challenges & Solutions"
]

# Create the categories
for category_name in categories_data:
    Category.objects.get_or_create(name=category_name)

print("Categories have been populated successfully!")

