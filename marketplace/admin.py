from django.contrib import admin
from .models import Category, Item

# Admin representation for the Category model
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Displaying name field in the admin list view
    search_fields = ('name',)  # Adding search functionality based on the name of the category

admin.site.register(Category, CategoryAdmin)  # Registering Category with its custom admin view

# Admin representation for the Item model
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'user')  # Displaying select fields in the admin list view
    search_fields = ('name', 'description', 'contact', 'user__username', 'category__name')  # Adding search functionality based on name, description, contact, user's username, and category's name
    list_filter = ('category', 'user')  # Adding filters based on category and user
    ordering = ('name',)  # Ordering items in the admin view by name
    raw_id_fields = ('user',)  # Using a raw_id field for the user to handle cases where there might be many users

admin.site.register(Item, ItemAdmin)  # Registering Item with its custom admin view
