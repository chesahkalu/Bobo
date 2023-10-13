# Required imports for the model definitions
from django.db import models
from django.contrib.auth import get_user_model

# Get the user model defined in the project, which is typically the default user model provided by Django
User = get_user_model()

# Category model to represent different categories of items in the marketplace
class Category(models.Model):
    name = models.CharField(max_length=200)  # The name of the category

    # String representation of the Category model
    def __str__(self):
        return self.name

# Item model to represent individual items that are listed in the marketplace
class Item(models.Model):
    name = models.CharField(max_length=200)  # The name/title of the item
    description = models.TextField()  # Detailed description of the item
    contact = models.CharField(max_length=400)  # Contact details for inquiries or purchases
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price of the item
    image = models.ImageField(upload_to='items/')  # Image of the item; images will be stored in an 'items/' directory
    category = models.ForeignKey(Category, on_delete=models.CASCADE)  # The category the item belongs to; linked to the Category model
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # The user who posted the item; linked to the User model

    # String representation of the Item model
    def __str__(self):
        return self.name
