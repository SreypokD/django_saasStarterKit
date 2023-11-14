# utils.py
from rest_framework.authtoken.models import Token
from .models import *

def verify_user(verify_key):
    # Placeholder: Implement your logic for verifying the user
    # For example, assuming you have a User model with a field 'verify_key':
    try:
        user = User.objects.get(verify_key=verify_key)
        return user if user else None
    except User.DoesNotExist:
        return None

def create_contact(email, first_name):
    # Placeholder: Implement your logic for saving contact
    # This might involve saving the contact information to a CRM system or elsewhere
    # For example, you can print a message for demonstration purposes
    print(f"Contact created for {first_name} with email: {email}")

def send_email(email, template, locals):
    # Placeholder: Implement your logic for sending an email
    # This might involve using a library like Django's send_mail or a third-party service
    # For example, you can print a message for demonstration purposes
    print(f"Email sent to {email} using template {template} with locals: {locals}")

def set_token(user_id):
    # Placeholder: Implement your logic for generating a token
    # This example uses Django Rest Framework's Token authentication
    # You need to have the Token model from 'rest_framework.authtoken' installed
    user, created = User.objects.get_or_create(id=user_id)
    token, created = Token.objects.get_or_create(user=user)
    return token.key

