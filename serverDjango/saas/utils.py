# utils.py

from django.core.mail import send_mail
from django.conf import settings
import jwt
from datetime import datetime, timedelta

from .models import User

def verify_user(verify_key):
    try:
        # Assuming 'verify_key' is a unique key used for verification
        user_to_verify = User.objects.get(verify_key=verify_key, is_email_verified=False)
        return user_to_verify
    except User.DoesNotExist:
        return None

def create_contact(email, first_name):
    # Placeholder function for saving contact information
    # Implement your logic to save contact information here
    pass

def send_email(to_email, template, locals, username):

    # Implement your logic to send emails using Django's send_mail function
    subject = 'Please verify Email'  
    message = 'Message' 

    html_message = f'''
        <html
            <body>
                <h2 style="color: #336699;">Hi {username},</h2>
                <p>
                    Click the following link to verify your email:
                    <a href="{locals["verification_link"]}" style="color: #009900; font-weight: bold;">Click here</a>
                    <p>{locals["verification_link"]}</p>
                </p>
            </body>
        </html>
    '''
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[to_email],
        fail_silently=False,
        html_message=html_message,
    )


def set_token(user_id):
    expiration_time = datetime.utcnow() + timedelta(days=1)
    payload = {
        'user_id': user_id,
        'exp': expiration_time,
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token

