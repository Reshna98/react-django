from empapp import views
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView 
from rest_framework.routers import DefaultRouter 
from django.urls import re_path


urlpatterns = [
    # path('register',views.register,name='register'),
    path('register_team_lead/', views.register_team_lead, name='register_team_lead'),
    path('register_developer/',views.register_developer, name='register_developer'),
    path('login',views.login,name='login'),
    path('Project_assign/', views.Project_assign, name='Project_assign'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('get_projects/', views.get_projects, name='get_projects'),
    path('get_assignment/', views.get_assignment, name='get_assignment'),
    path('assign_project/',views.assign_project, name='assign_project'),
    path('get_team_leads/', views.get_team_leads, name='get_team_leads'),
    path('pending-registrations/', views.pending_registrations, name='pending-registrations'),
    path('approve-registration/<int:user_id>/', views.approve_registration, name='approve-registration'),
    path('decline-registration/<int:user_id>/', views.decline_registration, name='decline-registration'),
    path('admin_create_user/', views.admin_create_user, name='admin_create_user'),
    path('admin_create_user/', views.admin_create_user, name='admin_create_user'),
    path('admin_create_user/', views.admin_create_user, name='admin_create_user'),
    path('get_developers_and_team_leads/', views.get_developers_and_team_leads, name='get_developers_and_team_leads'),
    path('delete_user/<int:user_id>/', views.delete_user, name='delete_user'),
    path('promote_to_team_lead/<int:user_id>/', views.promote_to_team_lead, name='promote_to_team_lead'),
    path('demote_to_developer/<int:user_id>/', views.demote_to_developer, name='demote_to_developer'),
    path('get_approved_users/', views.get_approved_users, name='get_approved_users'),
    path('logout/',views.logout, name='logout'),
    path('get_tl_assignments/',views.get_tl_assignments, name='get_tl_assignments'),
    path('project_details/<int:project_id>/', views.project_details, name='project_details'),
    path('serve_project_attachment/<int:projectId>/',views.serve_project_attachment, name='serve_project_attachment'),
    
    # other URL patterns

  
]
