# urls.py

from django.urls import path
from .auth import viewAuth
from .org import viewOrg

urlpatterns = [
    path('signup', viewAuth.signup),
    path('create-user', viewAuth.create_user),
    # path('login', views.login),
    



    # path('mail/', views.simple_mail),
    
    # path('getuser/', views.getuser),
    # path('update-username/', views.update_username),
    # path('update-email/', views.update_email),

    #  todo list urls=========================
    # path('get/todos/', viewOrg.get_todos, name='get_todos'),
    # path('post/todo/', views.post_todo, name='post_todo'),
    # path('put/todo/', views.put_todo, name='put_todo'),
    # path('delete/todo/', views.delete_todo, name='delete_todo'),
    # path('complete/todo/', views.complete_todo, name='complete_todo'),
]
