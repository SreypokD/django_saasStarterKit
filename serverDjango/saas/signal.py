# accounts/signals.py

from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.conf import settings
from .models import User

@receiver(post_save, sender=User)
def send_email_verification(sender, instance, created, **kwargs):
    if created and not instance.email_verified:
        verification_link = f"http://localhost:8000/verify_email/{instance.pk}/"
        subject = 'Email Verification for Your Account'
        message = f'Please click the link below to verify your email address:\n\n{verification_link}'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [instance.email]
        send_mail(subject, message, from_email, recipient_list)

@receiver(post_save, sender=User)
def send_welcome_email(sender, instance, created, **kwargs):
    if created and instance.email_verified:
        subject = 'Welcome to Our Website'
        message = f'Hello {instance.email},\n\nWelcome to our website! Thank you for joining us.'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [instance.email]
        send_mail(subject, message, from_email, recipient_list)