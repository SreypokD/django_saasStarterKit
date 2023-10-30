import asyncio
from functools import wraps
from django.http import JsonResponse
from rest_framework.response import Response

def async_handler(view_func):
    @wraps(view_func)
    async def wrapper(request, *args, **kwargs):
        result = await asyncio.to_thread(view_func, request, *args, **kwargs)
        if isinstance(result, (Response, JsonResponse)):
            return result  # Return the Response object if already generated
        else:
            # You can create a Response object with the result
            return Response({'data': result})
    return wrapper
