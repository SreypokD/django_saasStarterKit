from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .models import User  # Import your User model
from django.utils.crypto import get_random_string

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        token = request.data.get('HTTP_AUTHORIZATION')  
  
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            username = serializer.validated_data.get('username')



            firebase_user_id = serializer.validated_data.get('token')
            print("hiiiiiiiiiiiiiiiiiiiiii",firebase_user_id)
            
            # Generate a verify_key (for example, a random string)
            verify_key = get_random_string(length=32)

            # Create a new User instance with the extracted data
            user = User(email=email, username=username, firebase_user_id=firebase_user_id ,verify_key=verify_key)
            user.save()

            # Authenticate the user and log them in
            if user:
                login(request, user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from django.contrib.auth import login , authenticate
# from django.contrib.auth.models import User
# from .serializers import UserSerializer
# from .models import User  # Import your User model
# import jwt  # Import PyJWT

# @api_view(['POST'])
# def signup(request):
#     if request.method == 'POST':
#         token = request.META.get('HTTP_AUTHORIZATION')  # Get the token from the request headers
#         print(token)
#         if token:
#             try:
#                 # Decode the token
#                 token_data = jwt.decode(token, 'root', algorithms=['RS256'])
#                 # 'your_secret_key' should be replaced with the actual secret key used for encoding the token.

#                 # Extract user_id from the token claims
#                 user_id = token_data.get('user_id')

#                 # Create a new User instance with the extracted data
#                 serializer = UserSerializer(data=request.data)
#                 if serializer.is_valid():
#                     email = serializer.validated_data.get('email')
#                     username = serializer.validated_data.get('username')

#                     # Set the firebase_user_id to the user_id from the token
#                     new_user = User(email=email, username=username, firebase_user_id=user_id)
#                     new_user.save()  # Save the user to the database

#                     # Authenticate the user and log them in if needed
#                     user = authenticate(email=email, username=username)
#                     if user:
#                         login(request, user)

#                     return Response(serializer.data, status=status.HTTP_201_CREATED)
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#             except jwt.ExpiredSignatureError:
#                 # Handle token expiration
#                 return Response({'error': 'Token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
#             except jwt.DecodeError:
#                 # Handle token decode error
#                 return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
#         else:
#             # Handle case where no token is provided
#             return Response({'error': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)

