from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class CustomUser(AbstractUser):
    address = models.TextField(blank=True, null=True)
    course_completed = models.CharField(max_length=255,blank=True, null=True)
    certification = models.FileField(upload_to='certifications/', blank=True, null=True)
    department = models.CharField(max_length=255,blank=True, null=True)
    is_developer = models.BooleanField(default=False)
    is_team_lead = models.BooleanField(default=False) 
    APPROVAL_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('declined', 'Declined'),
    ]
    # is_approved = models.CharField(max_length=10, choices=APPROVAL_CHOICES, default='pending')
    is_approved = models.CharField(
        max_length=10,
        choices=APPROVAL_CHOICES,
        default='pending',
       
    )
    
    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.is_approved = 'approved'
        super().save(*args, **kwargs)

    def promote_to_team_lead(self):
        self.is_team_lead = True
        self.is_developer = False
        self.save()

    def demote_to_developer(self):
        self.is_team_lead = False
        self.is_developer = True
        self.save()

    def __str__(self):
        return self.username

class Project(models.Model):
    client_name = models.CharField(max_length=255)
    project_name = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    attachments = models.FileField(upload_to='attachments/', blank=True, null=True)

    def __str__(self):
        return self.project_name

class Assignment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    team_lead = models.ForeignKey(CustomUser, limit_choices_to={'is_team_lead': True}, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.project.project_name} assigned to {self.team_lead.username}"

class Module(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class ModuleAssignment(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    developer = models.ForeignKey(CustomUser, limit_choices_to={'is_developer': True}, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.module.name} - {self.developer.username}"

class DailyWorkProgress(models.Model):
    module_assignment = models.ForeignKey(ModuleAssignment, on_delete=models.CASCADE)
    date = models.DateField()
    progress_update = models.TextField()
    attachments = models.FileField(upload_to='work_updates/', blank=True, null=True)

    def __str__(self):
        return f"{self.module_assignment.module.name} - {self.date}"

class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return self.message


