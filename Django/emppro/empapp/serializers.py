from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'address', 'course_completed', 'certification', 'department', 'is_developer', 'is_team_lead']
        extra_kwargs = {
            'username': {'validators': []},
            'email': {'validators': []},
        }
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()