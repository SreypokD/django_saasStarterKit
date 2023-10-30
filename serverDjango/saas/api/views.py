from rest_framework import status
from django.http import JsonResponse
from .permissions import CustomPermission
from ..async_handler import async_handler  # Import the async_handler decorator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .services.auth.authentication import signup, login, create_user, update_username, update_email

@api_view(['GET','POST'])
@async_handler  # Use the async_handler decorator
async def signup(request):
    if request.method == 'POST':
        return await signup(request)  # Use await with asynchronous functions

@api_view(['POST'])
@async_handler  # Use the async_handler decorator
async def login(request):
    if request.method == 'POST':
        return await login(request)  # Use await with asynchronous functions

@api_view(['POST'])
@async_handler  # Use the async_handler decorator
async def create_user(request):
    if request.method == 'POST':
        return await create_user(request)  # Use await with asynchronous functions

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@async_handler  # Use the async_handler decorator
async def put_username(request):
    if request.method == 'PUT':
        return await update_username(request)  # Use await with asynchronous functions

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@async_handler  # Use the async_handler decorator
async def put_email(request):
    if request.method == 'PUT':
        return await update_email(request)  # Use await with asynchronous functions


# =============================
@api_view(['GET'])
def fail_health_check(request):
    # Your fail health check logic
    return JsonResponse({'message': 'Fail health check'})

@api_view(['GET'])
def send_email(request):
    # Your send email logic
    return JsonResponse({'message': 'Email sent'})

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def private_auth(request):
    # Your private auth logic
    return JsonResponse({'message': 'Private auth route'})

@api_view(['POST'])
@permission_classes([CustomPermission])
def private_permissions(request):
    # Your private permissions logic
    return JsonResponse({'message': 'Private permissions route'})

@api_view(['GET'])
@permission_classes([IsAuthenticated, CustomPermission])
def private_auth_permissions(request):
    # Your private auth and permissions logic
    return JsonResponse({'message': 'Private auth and permissions route'})

@api_view(['GET'])
def health_check(request):
    # Your health check logic
    return JsonResponse({'message': 'Health check'})