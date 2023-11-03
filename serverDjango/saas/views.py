from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .models import User  # Import your User model

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        authorization_header = request.META.get('HTTP_AUTHORIZATION')
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            username = serializer.validated_data.get('username')
            firebase_user_id = serializer.validated_data.get('firebase_user_id')
            
            # Create a new User instance with the extracted data
            new_user = User(email=email, username=username, firebase_user_id=firebase_user_id)
            new_user.save()  # Save the user to the database
            
            # Authenticate the user and log them in if needed
            user = authenticate(email=email, username=username, firebase_user_id=firebase_user_id)
            if user:
                login(request, user)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
