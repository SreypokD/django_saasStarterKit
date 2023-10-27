from django.shortcuts import render

from django.contrib.auth import get_user_model
from django.http import JsonResponse

def signup(request):
    if request.method == 'POST':
        # Process the signup form and create a new user
        email = request.POST.get('email')
        token = request.POST.get('token')
        username = request.POST.get('username')
        # Create a new user (you should implement user creation logic)
        User = get_user_model()
        user = User.objects.create_user(email=email, token=token , username=username) 
        # Return a JSON response with the result
        return JsonResponse({'message': 'User signed up successfully'})
