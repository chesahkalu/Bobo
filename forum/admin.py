from django.contrib import admin
from .models import Category, Thread, Post, Comment

# Admin customization for the Category model.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

# Admin customization for the Thread model.
class ThreadAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'created_by']
    list_filter = ['created_at', 'category']
    search_fields = ['title']

# Admin customization for the Post model.
class PostAdmin(admin.ModelAdmin):
    list_display = ['created_at', 'created_by', 'thread']
    list_filter = ['created_at', 'thread']
    search_fields = ['message']

# Admin customization for the Comment model.
class CommentAdmin(admin.ModelAdmin):
    list_display = ['created_at', 'created_by', 'post']
    list_filter = ['created_at', 'post']
    search_fields = ['message']

# Registering models with the admin site.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Thread, ThreadAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
