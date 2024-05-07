from django.urls import path
from .views import search

urlpatterns = [
    path('searching/<searchingText>/' , search , name="search")
]
