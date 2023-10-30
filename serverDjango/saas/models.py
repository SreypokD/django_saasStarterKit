

# Create your models here.
from django.db import models
import uuid

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False )
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    firebase_user_id = models.CharField(max_length=255)
    verify_key = models.CharField(null=True, max_length=255)
    is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.email
class Organization(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    org_name = models.CharField(null=True, max_length=255)
    primary_email = models.ForeignKey(User, null=True, on_delete=models.CASCADE, db_column='email')
    stripe_customer_id = models.CharField(null=True, max_length=255)
    subscription_id = models.CharField(null=True, max_length=255)
    plan_type = models.CharField(null=True, max_length=255)

class Role(models.Model):
    org_id = models.ForeignKey(Organization, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=255)

class Todo(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=1000)
    author = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    org_id = models.ForeignKey(Organization, on_delete=models.CASCADE)

class Invite(models.Model):
    org_id = models.ForeignKey(Organization, on_delete=models.CASCADE)
    verify_key = models.CharField(max_length=255)
    recipient_email = models.CharField(max_length=255)
    sender_email = models.CharField(max_length=255)
