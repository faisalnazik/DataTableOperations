from django.urls import path

from .views import StocksList

urlpatterns = [
    path("", StocksList.as_view()),
]
