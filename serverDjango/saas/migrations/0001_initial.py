# Generated by Django 4.2.6 on 2023-10-31 07:13

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('org_name', models.CharField(max_length=255, null=True)),
                ('stripe_customer_id', models.CharField(max_length=255, null=True)),
                ('subscription_id', models.CharField(max_length=255, null=True)),
                ('plan_type', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('firebase_user_id', models.CharField(max_length=255)),
                ('verify_key', models.CharField(max_length=255, null=True)),
                ('is_email_verified', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=1000)),
                ('author', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=255)),
                ('date', models.CharField(max_length=255)),
                ('org_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='saas.organization')),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(max_length=255)),
                ('org_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='saas.organization')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='saas.user')),
            ],
        ),
        migrations.AddField(
            model_name='organization',
            name='primary_email',
            field=models.ForeignKey(db_column='email', null=True, on_delete=django.db.models.deletion.CASCADE, to='saas.user'),
        ),
        migrations.CreateModel(
            name='Invite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('verify_key', models.CharField(max_length=255)),
                ('recipient_email', models.CharField(max_length=255)),
                ('sender_email', models.CharField(max_length=255)),
                ('org_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='saas.organization')),
            ],
        ),
    ]
