
from rest_framework.decorators import api_view



@api_view(['POST'])
def login_user(request):
    return api_view
    # Rest of your login code goes here (omitted for brevity)
    

@api_view(['GET'])
def get_todos(request):
     return api_view
    # Rest of your code for getting todos

@api_view(['POST'])
def post_todo(request):
      return api_view
    # Rest of your code for posting todos

@api_view(['PUT'])
def put_todo(request):
      return api_view
    # Rest of your code for updating todos

@api_view(['DELETE'])
def delete_todo(request):
      return api_view
    # Rest of your code for deleting todos

@api_view(['PATCH'])
def complete_todo(request):
      return api_view
    # Rest of your code for marking todos as complete