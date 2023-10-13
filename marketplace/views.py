# Required imports
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Category, Item
from .forms import ItemForm

# View to display a list of all marketplace categories
def category_list(request):
    categories = Category.objects.all()
    return render(request, 'marketplace/category_list.html', {'categories': categories})

# View to display a list of items within a specific category
def item_list(request, category_id):
    items = Item.objects.filter(category_id=category_id)
    category = Category.objects.get(id=category_id)
    return render(request, 'marketplace/item_list.html', {'items': items})

# View to display detailed information about a specific item
def item_detail(request, item_id):
    item = get_object_or_404(Item, id=item_id)
    return render(request, 'marketplace/item_detail.html', {'item': item})

# View to create a new item; only accessible by logged-in users
@login_required
def item_create(request):
    if request.method == 'POST':
        form = ItemForm(request.POST, request.FILES)
        if form.is_valid():
            new_item = form.save(commit=False)
            new_item.user = request.user
            new_item.save()
            return redirect('marketplace:item_list', category_id=new_item.category.id)
    else:
        form = ItemForm()
    return render(request, 'marketplace/item_form.html', {'form': form})

# View to update an existing item's details; only accessible by logged-in users
@login_required
def item_update(request, item_id):
    item = get_object_or_404(Item, id=item_id)
    if request.method == 'POST':
        form = ItemForm(request.POST, request.FILES, instance=item)
        if form.is_valid():
            form.save()
            return redirect('marketplace:item_list', category_id=item.category.id)
    else:
        form = ItemForm(instance=item)
    return render(request, 'marketplace/item_form.html', {'form': form})

# View to delete an item; only accessible by logged-in users
@login_required
def item_delete(request, item_id):
    item = get_object_or_404(Item, id=item_id)
    if request.method == 'POST':
        item.delete()
        return redirect('marketplace:category_list')
    else:
        return render(request, 'marketplace/item_confirm_delete.html', {'item': item})
