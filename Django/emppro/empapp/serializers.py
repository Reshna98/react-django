from rest_framework import serializers
from .models import CustomUser, Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'address', 'course_completed', 'certification', 'department']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
