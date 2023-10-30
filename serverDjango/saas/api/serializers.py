from rest_framework import serializers
from ..models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        fields = ('id' , 'username' , 'email', 'firebase_user_id' , 'is_email_verified') 