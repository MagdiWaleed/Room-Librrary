from django.urls import path
from .views import search

urlpatterns = [
    path('searching/' , search , name="search")
]
