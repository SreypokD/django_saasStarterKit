from django.urls import path
from . import views

urlpatterns = [
    # Other URL patterns
    path('auth/signup', views.signup, name='signup'),
]