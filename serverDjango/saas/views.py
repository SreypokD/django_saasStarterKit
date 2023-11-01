# views.py
from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from .models import User
import firebase_admin
# Firebase Configuration
from firebase_admin import credentials
from firebase_admin import auth
from django.conf import settings

firebase_creds = credentials.Certificate(settings.FIREBASE_CONFIG)
firebase_app = firebase_admin.initialize_app(firebase_creds)

def signup(request):
    # get token
    authorization_header = request.META.get('HTTP_AUTHORIZATION')
    print(authorization_header)
    if request.method == 'POST':
        email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']
        firebase_id = request.POST['firebase_id']

        user = User.objects.create_user(username=username, email=email, password=password)
        user.firebase_id = firebase_id
        user.save()

        # Authenticate the user
        user = authenticate(request, email=email)
        if user:
            login(request, user)
            return JsonResponse({'message': 'Signup successful'})

    return JsonResponse({'message': 'Invalid request'}, status=700)


def login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=401)

    return JsonResponse({'message': 'Invalid request'}, status=400)
