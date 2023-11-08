# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from django.contrib.auth import login, authenticate
# from django.contrib.auth.models import User
# from .serializers import UserSerializer
# from .models import User  # Import your User model
# from django.utils.crypto import get_random_string

# @api_view(['POST'])
# def signup(request):
#     if request.method == 'POST':
#         serializer = UserSerializer(data=request.data)
#         token = request.data.get('token')  # Get the token from the client

#         if serializer.is_valid():
#             print('token:', token)  # Print the token value
#             email = serializer.validated_data.get('email')
#             username = serializer.validated_data.get('username')
#             firebase_user_id = token  # Assign the token to firebase_user_id
#             print("hiiiiiiiiiiiiiiiiiiiiii", firebase_user_id)
            
#             # Generate a verify_key (for example, a random string)
#             verify_key = get_random_string(length=32)

#             # Create a new User instance with the extracted data
#             user = User(email=email, username=username, firebase_user_id=firebase_user_id, verify_key=verify_key)
#             user.save()

#             # Authenticate the user and log them in
#             if user:
#                 login(request, user)

#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import login, authenticate
from .serializers import UserSerializer
from .models import User
from django.utils.crypto import get_random_string
import jwt  # You may need to install the `PyJWT` library

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        token = request.data.get('token')  # Get the token from the client
        print('Received Token:', token)  # Debugging line
        if token:
            try:
                # Decode the token
                token_data = jwt.decode(token, algorithms=['RS256'])
                print(token_data)  # Debugging line

                # Extract user_id from the token claims
                user_id = token_data.get('user_id')
                print('User ID:', user_id)  # Debugging line

                # Create a new User instance with the extracted data
                serializer = UserSerializer(data=request.data)
                if serializer.is_valid():
                    email = serializer.validated_data.get('email')
                    username = serializer.validated_data.get('username')

                    # Set the firebase_user_id to the user_id from the token
                    new_user = User(email=email, username=username, firebase_user_id=user_id)
                    new_user.save()  # Save the user to the database

                    # Authenticate the user and log them in if needed
                    user = authenticate(email=email, username=username)
                    if user:
                        login(request, user)

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except jwt.ExpiredSignatureError:
                # Handle token expiration
                return Response({'error': 'Token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
            except jwt.DecodeError:
                # Handle token decode error
                return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # Handle case where no token is provided
            return Response({'error': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)












# views.py
from django.http import JsonResponse
from .models import Todo

# views.py
from django.http import JsonResponse
from .models import Todo

def get_todos(request):
    org_id = request.GET.get('org_id')
    todos = Todo.get_todos(org_id)
    
    # Convert QuerySet into a list of dictionaries
    todos_list = list(todos.values())

    return JsonResponse({'todos': todos_list}, status=200)

def post_todo(request):
    data = request.POST
    title = data.get('title')
    description = data.get('description')
    author = data.get('author')
    status = data.get('status')
    date = data.get('date')
    org_id = data.get('org_id')

    # Create a new todo
    Todo.create_todo(title, description, author, status, date, org_id)
    
    return JsonResponse({'message': 'Post Successful'}, status=200)

def put_todo(request):
    data = request.POST
    title = data.get('title')
    description = data.get('description')
    author = data.get('author')
    status = data.get('status')
    date = data.get('date')
    todo_id = data.get('todo_id')

    # Update an existing todo
    Todo.update_todo(title, description, author, status, date, todo_id)

    return JsonResponse({'message': 'Put Successful'}, status=200)

def delete_todo(request):
    todo_id = request.GET.get('todo_id')

    # Delete a todo
    Todo.delete_todo(todo_id)

    return JsonResponse({'message': 'Delete Successful'}, status=200)

def complete_todo(request):
    todo_id = request.GET.get('todo_id')

    # Mark a todo as completed
    Todo.complete_todo(todo_id)

    return JsonResponse({'message': 'Todo completed successfully'}, status=200)
























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

