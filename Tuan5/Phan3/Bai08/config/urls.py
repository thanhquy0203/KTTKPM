from django.http import JsonResponse
from django.urls import path

from .tasks import add


def index(request):
    task = add.delay(2, 3)
    return JsonResponse(
        {
            "message": "Django is running with Celery and Redis",
            "task_id": task.id,
        }
    )


urlpatterns = [
    path("", index),
]
