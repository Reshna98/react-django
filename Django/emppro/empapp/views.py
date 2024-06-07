from django.core.mail import send_mail
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CustomUser, Department
from .serializers import CustomUserSerializer, DepartmentSerializer
import random
import string

@api_view(['POST'])
def register(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        # Generate a random 6-digit password
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=6))

        # Create the user with the provided data
        user = CustomUser.objects.create_user(
            username=serializer.validated_data['username'],
            email=serializer.validated_data['email'],
            password=password,
            address=serializer.validated_data['address'],
            course_completed=serializer.validated_data['course_completed'],
            certification=serializer.validated_data.get('certification'),
            department=serializer.validated_data['department'],
        )

        # Send confirmation email
        send_confirmation_email(user, password)

        return Response({'message': 'User registered successfully. Confirmation email sent.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def send_confirmation_email(user, password):
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
    send_mail(subject, message, None, [user.email])
