# urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('signup', views.signup),
    path('login/', views.login),
    
    # path('mail/', views.simple_mail),
    
    # path('getuser/', views.getuser),
    path('create-user', views.create_user),
    # path('update-username/', views.update_username),
    # path('update-email/', views.update_email),

    #  todo list urls=========================
    # path('get/todos/', views.get_todos, name='get_todos'),
    # path('post/todo/', views.post_todo, name='post_todo'),
    # path('put/todo/', views.put_todo, name='put_todo'),
    # path('delete/todo/', views.delete_todo, name='delete_todo'),
    # path('complete/todo/', views.complete_todo, name='complete_todo'),
]
