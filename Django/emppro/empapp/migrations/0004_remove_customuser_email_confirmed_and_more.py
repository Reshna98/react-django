# Generated by Django 5.0.6 on 2024-06-26 04:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('empapp', '0003_delete_department'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='email_confirmed',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='is_admin',
        ),
    ]