# Generated by Django 4.2.6 on 2023-10-26 04:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('saas', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Invites',
            new_name='Invite',
        ),
        migrations.RenameModel(
            old_name='Organizations',
            new_name='Organization',
        ),
        migrations.RenameModel(
            old_name='Roles',
            new_name='Role',
        ),
        migrations.RenameModel(
            old_name='Todos',
            new_name='Todo',
        ),
        migrations.RenameModel(
            old_name='Users',
            new_name='User',
        ),
    ]