from django.urls import path

from .views import UserList, UserUpdate

urlpatterns = [
    path("users/", UserList.as_view()),
    path("users/<str:pk>/", UserUpdate.as_view()),
]
