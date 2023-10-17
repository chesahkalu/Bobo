import os
import sys

# Add the project directory to the sys.path
project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.append(project_root)

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Bobo.settings')  # Replace 'Bobo.settings' with the appropriate settings module if different

# Configure Django settings
import django
django.setup()

from marketplace.models import Category  # Adjust the import based on where your marketplace app models are located

categories_data = [
    "Baby Clothing",
    "Baby Gear & Furniture",
    "Toys & Books",
    "Feeding & Nutrition",
    "Bath & Potty",
    "Nursery Decor",
    "Health & Safety",
    "Maternity Wear",
    "Parenting Books & Guides",
    "Strollers & Car Seats",
    "Baby Care Products",
    "Gifts & Special Occasions",
    "Handmade & Craft Items",
    "Educational Toys & Games",
    "Music & Videos for Kids",
    "Outdoor Play Equipment"
]

# Create the categories
for category_name in categories_data:
    Category.objects.get_or_create(name=category_name)

print("Marketplace categories have been populated successfully!")

