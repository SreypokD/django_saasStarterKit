from rest_framework import permissions

class CustomPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Your custom permission logic
        return True  # Modify as needed