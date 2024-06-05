from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Customuser(AbstractUser):
    pass

class Userdata(models.Model):
    first_name = models.CharField(max_length=100,null=True,blank=True) 
    last_name = models.CharField(max_length=100,null=True,blank=True) 
    email = models.CharField(max_length=100,null=True,blank=True) 
    username = models.CharField(max_length=100,null=True,blank=True) 
    password = models.CharField(max_length=100,null=True,blank=True) 
    user_type = models.CharField(max_length=100,null=True,blank=True) 
    course_completed=models.CharField(max_length=255,unique=True)
    department=models.CharField(max_length=255,unique=True)
    address=models.TextField(blank=True,null=True)
    age=models.CharField(max_length=255,blank=True,null=True)
    certification=models.FileField(upload_to='docs/',null=True,blank=True)
    