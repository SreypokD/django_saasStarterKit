from django.db import models
import uuid

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False )
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    firebase_user_id = models.CharField(max_length=255, null=True, blank=True)
    verify_key = models.CharField(max_length=255, null=True, blank=True)
    is_email_verified = models.BooleanField(null= True)

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


class Invite(models.Model):
    org_id = models.ForeignKey(Organization, on_delete=models.CASCADE)
    verify_key = models.CharField(max_length=255)
    recipient_email = models.CharField(max_length=255)
    sender_email = models.CharField(max_length=255)


class Todo(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=1000)
    author = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    org_id = models.ForeignKey(Organization, on_delete=models.CASCADE)

    @classmethod
    def get_todos(cls, org_id):

        return cls.objects.filter(org_id=org_id).all()

    @classmethod
    def create_todo(cls, title, description, author, status, date, org_id):

        todo = cls(title=title, description=description, author=author, status=status, date=date, org_id=org_id)
        todo.save()
        return todo

    @classmethod
    def update_todo(cls, title, description, author, status, date, todo_id):
        todo = cls.objects.get(id=todo_id)
        todo.title = title
        todo.description = description
        todo.author = author
        todo.status = status
        todo.date = date
        todo.save()

    @classmethod
    def delete_todo(cls, todo_id):

        cls.objects.filter(id=todo_id).delete()

    @classmethod
    def complete_todo(cls, todo_id):
        todo = cls.objects.get(id=todo_id)
        todo.status = 'completed'
        todo.save()