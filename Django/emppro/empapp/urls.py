from empapp import views
from django.urls import path
urlpatterns = [
    path('register',views.register,name='register'),
    path('login',views.login,name='login'),
    path('Project_assign', views.Project_assign, name='Project_assign'),
   
   
  
  
]
