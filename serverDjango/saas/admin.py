from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(User)
admin.site.register(Organization)
admin.site.register(Role)
admin.site.register(Todo)
admin.site.register(Invite)
