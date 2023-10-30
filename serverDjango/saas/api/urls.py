from django.urls import path
from . import views

urlpatterns = [
    path('signup', views.signup),
    path('login', views.login),
    path('create-user', views.create_user),
    path('put/username', views.put_username),
    path('put/email', views.put_email),
    # add
    path('fail-health/', views.fail_health_check, name='fail-health-check'),
    path('send-email/', views.send_email, name='send-email'),
    path('private/auth/', views.private_auth, name='private-auth'),
    path('private/permissions/', views.private_permissions, name='private-permissions'),
    path('private/authpermissions/', views.private_auth_permissions, name='private-auth-permissions'),
    path('health/', views.health_check, name='health-check'),
]


