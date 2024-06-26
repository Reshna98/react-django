from rest_framework import serializers
from .models import CustomUser,Project, Assignment, Module, ModuleAssignment, DailyWorkProgress, Notification
from django.contrib.auth import authenticate
import random
import string

from django.core.mail import send_mail

# class CustomUserSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(source='pk')
#     class Meta:
#         model = CustomUser
#         fields = ['id','username', 'email', 'address', 'course_completed', 'certification', 'department', 'is_developer', 'is_team_lead','is_approved']
#         extra_kwargs = {
#             'username': {'validators': []},
#             'email': {'validators': []},
#         }

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'address', 'course_completed', 'certification', 'department', 'is_developer', 'is_team_lead', 'is_approved']
        extra_kwargs = {
            'username': {'validators': []},
            'email': {'validators': []},
            'id': {'read_only': True},  # Ensure id is read-only
        }

    def create(self, validated_data):
        """
        Override create method to handle user creation.
        """
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))

        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=password,
            address=validated_data.get('address', ''),
            course_completed=validated_data.get('course_completed', ''),
            certification=validated_data.get('certification'),
            department=validated_data.get('department', ''),
            is_developer=validated_data.get('is_developer', False),
            is_team_lead=validated_data.get('is_team_lead', False),
            is_approved=validated_data.get('is_approved', 'pending'),
        )

        # You can add email sending logic here if needed

        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField(max_length=150)
#     password = serializers.CharField(max_length=128, write_only=True)

#     def validate(self, attrs):
#         username = attrs.get('username')
#         password = attrs.get('password')

#         if username and password:
#             user = authenticate(username=username, password=password)
#             if user:
#                 attrs['user'] = user
#             else:
#                 raise serializers.ValidationError("Invalid username or password.")
#         else:
#             raise serializers.ValidationError("Must include 'username' and 'password'.")

#         return attrs

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):
     
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())
    team_lead = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.filter(is_team_lead=True,is_approved='approved'))
    class Meta:
        model = Assignment
        # fields = '__all__'
        fields = ['project', 'team_lead', 'start_date', 'end_date']

def generate_random_password():
    return ''.join(random.choices(string.digits, k=6))

# class AdminUserCreateSerializer(serializers.Serializer):
#     username = serializers.CharField(max_length=150)
#     email = serializers.EmailField()
#     address = serializers.CharField(required=False, allow_blank=True)
#     course_completed = serializers.CharField(required=False, allow_blank=True)
#     certification = serializers.FileField(required=False, allow_null=True)
#     department = serializers.CharField(required=False, allow_blank=True)
#     is_developer = serializers.BooleanField(default=False)
#     is_team_lead = serializers.BooleanField(default=False)

#     def create(self, validated_data):
#         # Generate random password
       
#         password = generate_random_password()

#         # Create the user
    
        
#         user = CustomUser.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             password=password,
#             address=validated_data.get('address', ''),
#             course_completed=validated_data.get('course_completed', ''),
#             certification=validated_data.get('certification'),
#             department=validated_data.get('department', ''),
#             is_developer=validated_data.get('is_developer', False),
#             is_team_lead=validated_data.get('is_team_lead', False),
#             is_approved = 'pending'

#         )

#         # Send welcome email
#         subject = 'Welcome to Our Platform'
#         message = f'''
#         Dear {user.username},

#         Thank you for registering on our platform. Your account has been successfully created.

#         Please find below your login details:
#         Username: {user.username}
#         Password: {password}

#         You can log in using these credentials. We recommend changing your password after logging in.

#         Regards,
#         Your Platform Team
#         '''
#         send_mail(subject, message, 'noreply@yourdomain.com', [user.email])

#         # Print admin notification
#         admin_notification_message = f'New registration: {user.username}'
#         print(admin_notification_message)

#         return user
class AdminUserCreateSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    address = serializers.CharField(required=False, allow_blank=True)
    course_completed = serializers.CharField(required=False, allow_blank=True)
    certification = serializers.FileField(required=False, allow_null=True)
    department = serializers.CharField(required=False, allow_blank=True)
    is_developer = serializers.BooleanField(default=False)
    is_team_lead = serializers.BooleanField(default=False)

    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def create(self, validated_data):
        # Generate random password
        password = generate_random_password()

        # Create the user
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=password,
            address=validated_data.get('address', ''),
            course_completed=validated_data.get('course_completed', ''),
            certification=validated_data.get('certification'),
            department=validated_data.get('department', ''),
            is_developer=validated_data.get('is_developer', False),
            is_team_lead=validated_data.get('is_team_lead', False),
            is_approved='pending'
        )

        # Send welcome email (assuming send_mail function is properly defined)
        subject = 'Welcome to Our Platform'
        message = f'''
        Dear {user.username},

        Thank you for registering on our platform. Your account has been successfully created.

        Please find below your login details:
        Username: {user.username}
        Password: {password}

        You can log in using these credentials. We recommend changing your password after logging in.

        Regards,
        Your Platform Team
        '''
        send_mail(subject, message, 'noreply@yourdomain.com', [user.email])

        # Print admin notification
        admin_notification_message = f'New registration: {user.username}'
        print(admin_notification_message)

        return user

class TLassignmentSerializer(serializers.ModelSerializer):
    project_name = serializers.SerializerMethodField()
    tl_name = serializers.SerializerMethodField()
    project_id = serializers.IntegerField(source='project.id')

    def get_project_name(self, obj):
        return obj.project.project_name

    def get_tl_name(self, obj):
        return obj.team_lead.username

    class Meta:
        model = Assignment
        fields = ['project_id', 'project_name', 'tl_name', 'start_date', 'end_date']


class TlProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'client_name', 'project_name', 'description', 'requirements', 'start_date', 'end_date', 'attachments']
    def get_attachments_url(self, obj):
        request = self.context.get('request')
        if obj.attachments:
            return request.build_absolute_uri(obj.attachments.url)
        return None
# ----------------------------
class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ['id', 'assignment', 'name', 'description']

class AssignmentssSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.project_name', read_only=True)

    class Meta:
        model = Assignment
        fields = ['id', 'project', 'project_name', 'start_date', 'end_date']

class ModuleAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleAssignment
        fields = ['id', 'module', 'developer', 'start_date', 'end_date']

class CustomUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username']  # Add more fields as needed

class ModulessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ['id', 'name'] 

class TeamLeadProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'address', 'course_completed', 'certification', 'department']


class CustomUserupdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'address', 'course_completed', 'certification', 'department']

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.address = validated_data.get('address', instance.address)
        instance.course_completed = validated_data.get('course_completed', instance.course_completed)
        instance.department = validated_data.get('department', instance.department)
        
        # Check if 'certification' is provided and is not None
        if 'certification' in validated_data and validated_data['certification'] is not None:
            instance.certification = validated_data['certification']
        
        instance.save()
        return instance
