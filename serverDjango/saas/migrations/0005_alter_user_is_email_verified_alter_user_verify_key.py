# Generated by Django 4.2.6 on 2023-11-14 03:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('saas', '0004_alter_user_is_email_verified_alter_user_verify_key'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_email_verified',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='verify_key',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
