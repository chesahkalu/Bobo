# Generated by Django 4.2.1 on 2023-05-26 02:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('babies', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='baby',
            old_name='dob',
            new_name='date_of_birth',
        ),
    ]