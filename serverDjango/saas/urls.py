# urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('signup', views.signup),
    # path('login/', views.login),
    # path('getuser/', views.getuser),
    # path('create-user/', views.create_user),
    # path('update-username/', views.update_username),
    # path('update-email/', views.update_email),
]
