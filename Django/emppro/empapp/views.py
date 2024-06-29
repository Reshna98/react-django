from django.core.mail import send_mail
from rest_framework import viewsets, status
from rest_framework.decorators import api_view,permission_classes,action
from rest_framework.response import Response
from .models import CustomUser,Project,Assignment
from .serializers import CustomUserSerializer,LoginSerializer,ProjectSerializer,AssignmentSerializer,AdminUserCreateSerializer
import random
import string
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import permissions
from rest_framework.permissions import AllowAny,IsAdminUser,IsAuthenticated



def generate_random_password():
    return ''.join(random.choices( string.digits, k=6))

@api_view(['POST'])
def register_team_lead(request):
    return register_user(request, is_team_lead=True, is_developer=False)

@api_view(['POST'])
def register_developer(request):
    return register_user(request, is_team_lead=False, is_developer=True)


def register_user(request, is_team_lead, is_developer):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']
        
        if CustomUser.objects.filter(username=username).exists():
            return Response({'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if CustomUser.objects.filter(email=email).exists():
            return Response({'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        password = generate_random_password()

        user = CustomUser.objects.create_user(
            username=username,
            email=email,
            password=password,
            address=serializer.validated_data.get('address', ''),
            course_completed=serializer.validated_data.get('course_completed', ''),
            certification=serializer.validated_data.get('certification'),
            department=serializer.validated_data.get('department', ''),
            is_developer=is_developer,
            is_team_lead=is_team_lead,
            is_approved='pending',
        )

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

        admin_notification_message = f'New registration: {user.username}'
        print(admin_notification_message)

        return Response({'message': 'User registered successfully. Confirmation email sent.'}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    print(request.data)  # Log received data
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            print(f"User authenticated: {user.username}")
            print(f"User is_approved status: {user.is_approved}")

            if not user.is_superuser and user.is_approved == 'pending':
                return Response({'message': 'User registration pending approval'}, status=status.HTTP_401_UNAUTHORIZED)
            if user.is_approved == 'declined':
                return Response({'message': 'Admin declined registration'}, status=status.HTTP_401_UNAUTHORIZED)

            refresh = RefreshToken.for_user(user)
            role = 'admin' if user.is_superuser else ('team_lead' if user.is_team_lead else 'developer')
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),    
                'role': role
            })
        else:
            print("Authentication failed")
            return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
    
    print("Invalid data")
    return Response({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Project_assign(request):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_projects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_assignment(request):
    assignments = Assignment.objects.all()
    serializer = AssignmentSerializer(assignments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_project(request):
    serializer = AssignmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_team_leads(request):    
    team_leads = CustomUser.objects.filter(is_team_lead=True,is_approved='approved')
    serializer = CustomUserSerializer(team_leads, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def pending_registrations(request):
    pending_users = CustomUser.objects.filter(is_approved='pending')
    serializer = CustomUserSerializer(pending_users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def approve_registration(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        user.is_approved = 'approved'
        user.save()
        return Response({'message': 'User approved'}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def decline_registration(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        user.is_approved = 'declined'
        user.save()
        return Response({'message': 'User declined'}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def admin_create_user(request):
    serializer = AdminUserCreateSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Return success response with a message
        return Response({'message': 'User created successfully. Confirmation em ail sent.'}, status=status.HTTP_201_CREATED)
    
    # Return error response with serializer errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_developers_and_team_leads(request):
    developers_and_team_leads = CustomUser.objects.filter(is_team_lead=True) | CustomUser.objects.filter(is_developer=True)
    serializer = CustomUserSerializer(developers_and_team_leads, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except CustomUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def promote_to_team_lead(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        user.promote_to_team_lead()
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def demote_to_developer(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        user.demote_to_developer()
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_approved_users(request):
    users = CustomUser.objects.filter(is_approved='approved', is_superuser=False)
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get('refresh_token')
        if refresh_token is None:
            return Response({'detail': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tl_assignments(request):
    user = request.user
    if user.is_team_lead:
        assignments = Assignment.objects.filter(team_lead=user)
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'User is not a team lead'}, status=status.HTTP_403_FORBIDDEN)