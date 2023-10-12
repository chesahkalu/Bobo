from django.db import models
from django.conf import settings

# Category model to categorize threads.
class Category(models.Model):
    # Name of the category.
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

# Thread model to represent discussion threads in the forum.
class Thread(models.Model):
    # Title of the thread.
    title = models.CharField(max_length=200)
    # Date and time when the thread was created.
    created_at = models.DateTimeField(auto_now_add=True)
    # User who created the thread.
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='threads', on_delete=models.CASCADE)
    # Category under which the thread falls.
    category = models.ForeignKey(Category, related_name='threads', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

# Post model to represent individual posts within a thread.
class Post(models.Model):
    # Message content of the post.
    message = models.TextField()
    # Date and time when the post was created.
    created_at = models.DateTimeField(auto_now_add=True)
    # User who created the post.
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # The thread to which this post belongs.
    thread = models.ForeignKey(Thread, related_name='posts', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.created_at)

# Comment model to represent comments on individual posts.
class Comment(models.Model):
    # Message content of the comment.
    message = models.TextField()
    # Date and time when the comment was created.
    created_at = models.DateTimeField(auto_now_add=True)
    # User who created the comment.
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # The post on which this comment was made.
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return str(self.created_at)
