import pyrebase
from django.http import JsonResponse
from django.contrib.auth import login ,authenticate
from .models import User
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.serializers import serialize


def signup(request):

    # if request.method == 'POST':
    #     email = request.POST['email']
    #     username = request.POST['username']
    #     password = request.POST['password']

    #     # Create a user using Django's User model
    #     user = User.objects.create_user(username=username, email=email, password=password)

    #     # Authenticate the user
    #     user = authenticate(request, username=email, password=password)
    #     if user is not None:
    #         login(request, user)

    #         # Generate and save an authentication token for the user
    #         # token = generate_and_save_auth_token(user)
    #         return JsonResponse({'message': 'Signup successful'})
    #     else:
    #         return JsonResponse({'message': 'Invalid credentials'}, status=401)

    # return JsonResponse({'message': 'Invalid request'}, status=400)




# config = {
#     "apiKey": settings.FIREBASE_API_KEY,
#     "authDomain": settings.FIREBASE_AUTH_DOMAIN,
#     "databaseURL": settings.FIREBASE_DATABASE_URL,
#     "projectId": settings.FIREBASE_PROJECT_ID,
#     "storageBucket": settings.FIREBASE_STORAGE_BUCKET,
#     "messagingSenderId": settings.FIREBASE_MESSAGING_SENDER_ID,
#     "appId": settings.FIREBASE_APP_ID,
#     "measurementId": settings.FIREBASE_MEASUREMENT_ID
# }

# firebase = pyrebase.initialize_app(config)
# auth = firebase.auth()

# @csrf_exempt
# def signup(request):
#     if request.method == 'POST':
#         # Obtain the token from the Authorization header
#         authorization_header = request.META.get('HTTP_AUTHORIZATION')
#         if not authorization_header:
#             return JsonResponse({'message': 'Token missing'}, status=400)

#         # Extract the token from the header (assuming "Bearer <token>")
#         try:
#             _, id_token = authorization_header.split()
#         except ValueError:
#             return JsonResponse({'message': 'Invalid token format'}, status=400)

#         # Verify the Firebase ID token
#         try:
#             user = auth.verify_id_token(id_token)
#             if user:
#                 email = request.POST.get('email')
#                 username = request.POST.get('username')
#                 password = request.POST.get('password')
#                 firebase_id = request.POST.get('firebase_id')

#                 # Continue with user registration
#                 # Your registration logic here

#                 return JsonResponse({'message': 'Signup successful'})
#             else:
#                 return JsonResponse({'message': 'Invalid Firebase ID token'}, status=400)
#         except Exception as e:
#             return JsonResponse({'message': f'Error: {str(e)}'}, status=400)

#     return JsonResponse({'message': 'Invalid request'}, status=400)

# @csrf_exempt
# def create_user(request):
#     if request.method == 'POST':
#         verify_key = request.POST.get('verify_key')

#         try:
#             # Verify signup key
#             user = User.objects.get(email_verify_key=verify_key)
#         except User.DoesNotExist:
#             return JsonResponse({'message': 'Invalid verification key'}, status=400)

#         user = user.user
#         username = user.username
#         email = user.email

#         # Save contact to email marketing and sales CRM (Implement this logic)
#         FIRSTNAME = username.split(' ')[0]
#         # send_welcome_email(email, FIRSTNAME) # Implement this function

#         # Return a token (Implement token generation logic)
#         token = generate_token(user)
#         return JsonResponse({'token': token, 'user_id': user.id, 'username': username, 'email': email})
    
#     return JsonResponse({'message': 'Invalid request'}, status=400)

# def login(request):
#     if request.method == 'POST':
#         email = request.POST['email']
#         password = request.POST['password']

#         user = authenticate(request, email=email, password=password)
#         if user is not None:
#             login(request, user)
#             return JsonResponse({'message': 'Login successful'})
#         else:
#             return JsonResponse({'message': 'Invalid credentials'}, status=401)

#     return JsonResponse({'message': 'Invalid request'}, status=400)



# import jwt
# from django.conf import settings
# from datetime import datetime, timedelta


# def generate_token(user):
#     payload = {
#         'user_id': user.id,
#         'username': user.username,
#         'exp': datetime.utcnow() + timedelta(days=1)  # Set the token expiration as needed
#     }
#     token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
#     return token



def getuser(request):
    users = User.objects.all()
    respone_object = {"data": serialize("json" , users)}
    return JsonResponse(respone_object, status=200)