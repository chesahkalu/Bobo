from django.shortcuts import render, redirect
from .forms import SignUpForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from babies.models import Baby

# This view handles the home page of the application.
# The login_required decorator ensures that only authenticated users can access this view.
@login_required
def home_view(request):
    # The render function is used to generate the HTML for the home page.
    return render(request, 'accounts/home.html', {'babies': Baby.objects.filter(user=request.user)})

# This view handles the signup page and the user creation process.
def signup_view(request):
    if request.method == 'POST':
        # If the request method is POST, it means the user has submitted the signup form.
        # The submitted data is validated, and if valid, a new user is created.
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        # If the request method is not POST, an empty signup form is displayed.
        form = SignUpForm()
    return render(request, 'accounts/signup.html', {'form': form})

# This view handles the login page and the user authentication process.
def login_view(request):
    if request.method == 'POST':
        # If the request method is POST, it means the user has submitted the login form.
        # The submitted credentials are validated, and if valid, the user is logged in.
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                # If the credentials are not valid, an error message is displayed.
                messages.error(request,"Invalid username or password.")
        else:
            messages.error(request,"Invalid username or password.")
    # If the request method is not POST, an empty login form is displayed.
    form = AuthenticationForm()
    return render(request = request, template_name = "accounts/login.html", context={"form":form})

# This view handles the logout process.
def logout_view(request):
    # The logout function logs out the user and invalidates their session.
    logout(request)
    # After logging out, the user is redirected to the login page.
    return redirect('login')

# This view is the first step in the user deletion process.
# It simply redirects the user to the confirmation page.
@login_required
def delete_account_view(request):
    return redirect('delete_account_confirm')

# This view handles the user deletion process.
@login_required
def delete_account_confirm_view(request):
    if request.method == "POST":
        # If the request method is POST, it means the user has confirmed their desire to delete their account.
        # The user's account is deleted and they are redirected to the login page.
        request.user.delete()
        return redirect('login')

    # If the request method is not POST, the account deletion confirmation page is displayed.
    return render(request, 'accounts/delete_account_confirm.html')
