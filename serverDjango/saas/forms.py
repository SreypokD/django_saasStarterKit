# forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm as BaseUserCreationForm
from django.contrib.auth.models import User
from .models import Organization

class UserCreationForm(BaseUserCreationForm):
    # Add any additional fields you need for user creation

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class OrganizationForm(forms.ModelForm):
    class Meta:
        model = Organization
        fields = ['org_name']  # Add other fields as needed

    def clean_name(self):
        # Add any custom validation for the organization name field
        name = self.cleaned_data['name']
        # Example: Ensure the organization name is unique
        if Organization.objects.filter(name=name).exists():
            raise forms.ValidationError('Organization with this name already exists.')
        return name
