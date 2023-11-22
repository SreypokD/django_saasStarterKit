

from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'firebase_user_id', 'verify_key', 'is_email_verified']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            firebase_user_id=validated_data['firebase_user_id'],
            verify_key=validated_data.get('verify_key', ''),  # Set to empty string if not provided
            is_email_verified=validated_data.get('is_email_verified', False)  # Set to False if not provided
        )
        user.save()
        return user