# # myapp/serializers.py
# from django.contrib.auth.models import User
# from rest_framework import serializers

# class UserSerializer(serializers.ModelSerializer):
#     # password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ('email', 'username', 'firebase_user_id')
    
#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user



from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"  # Include 'firebase_user_id' field
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            firebase_user_id=validated_data['firebase_user_id']
        )
        user.save()
        return user