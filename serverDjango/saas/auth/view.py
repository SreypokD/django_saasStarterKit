
from rest_framework.response import Response
from ..utils import verify_user, create_contact, send_email, set_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from ..models import User
from ..serializers import UserSerializer
import jwt
from django.utils.crypto import get_random_string

@api_view(['POST'])
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        token = request.data.get('token')  # Get the token from the client
        if token:
            try:
                token_data = jwt.decode(token, algorithms=['RS256'], options={"verify_signature": False})

                user_id = token_data.get('user_id')

                serializer = UserSerializer(data=request.data)
                if serializer.is_valid():
                    email = serializer.validated_data.get('email')
                    username = serializer.validated_data.get('username')
                    invite_key = serializer.validated_data.get('invite_key')
                    invite_key = serializer.validated_data.get('invite_key')
                    # Generate a verification key
                    verify_key = get_random_string(20)

                    # Set the firebase_user_id to the user_id from the token
                    new_user = User(
                        email=email,
                        username=username,
                        firebase_user_id=user_id,  # Assign firebase_user_id
                        verify_key=verify_key,  # Assign a verification key
                        is_email_verified=False  # Ensure email verification is initially set to False
                    )
                    new_user.save()

                    # Send an email with the verification link
                    verification_link = f"http://localhost:3000/auth/confirmedemail/?key={verify_key}/"
                    template = 'email_verification'
                    locals = {'verification_link': verification_link}
                    send_email(email, template, locals,username)

                    return Response({'success': 'sent email sucessfully'},status=status.HTTP_201_CREATED)
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




# @api_view(['POST'])
# @csrf_exempt
# def create_user(request):
    if request.method == 'POST':
        verify_key = request.data.get('verify_key')

        # Check if the verification key is provided
        if not verify_key:
            return JsonResponse({'error': 'Verification key is missing'}, status=400)

        # Implement your own logic for verifying the user
        user_to_verify = verify_user(verify_key)

        # Check if the user is not found or already verified
        if not user_to_verify or user_to_verify.is_email_verified:
            return JsonResponse({'error': 'Invalid verification key or user already verified'}, status=400)

        try:
            # Update user's email verification status
            user_to_verify.is_email_verified = True
            user_to_verify.verify_key = ""  # Set verify_key to empty
            user_to_verify.save()

            user_id = user_to_verify.id
            username = user_to_verify.username
            email = user_to_verify.email

            # Implement your own logic for saving contact
            first_name = username.split(' ')[0]
            create_contact(email, first_name)

            # Implement your own logic for sending welcome email
            template = 'welcome'
            locals = {'FIRSTNAME': first_name}
            send_email(email, template, locals)

            # Implement your own logic for generating tokens
            token = set_token(user_id)

            return JsonResponse({'token': token, 'user_id': user_id, 'username': username, 'email': email})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)  # Internal Server Error

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def create_user(request):
    if request.method == 'POST':
        verify_key = request.data.get('verify_key')

        # Check if the verification key is provided
        if not verify_key:
            return JsonResponse({'error': 'Verification key is missing'}, status=400)

        # Implement your own logic for verifying the user
        user_to_verify = verify_user(verify_key)
        print(user_to_verify)

        # Check if the user is not found or already verified
        # if not user_to_verify or user_to_verify.is_email_verified:
        #     return JsonResponse({'error': 'Invalid verification key or user already verified'}, status=400)

        try:
            # Update user's email verification status
            user_to_verify.is_email_verified = True
            user_to_verify.verify_key = ""  # Set verify_key to empty
            user_to_verify.save()

            user_id = user_to_verify.id
            username = user_to_verify.username
            email = user_to_verify.email

            # Implement your own logic for saving contact
            first_name = username.split(' ')[0]
            create_contact(email, first_name)

            # Implement your own logic for sending welcome email
            template = 'welcome'
            locals = {'FIRSTNAME': first_name}
            send_email(email, template, locals)

            # Implement your own logic for generating tokens
            token = set_token(user_id)

            return JsonResponse({'token': token, 'user_id': user_id, 'username': username, 'email': email})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)  # Internal Server Error

    return JsonResponse({'error': 'Invalid request method'}, status=405)

