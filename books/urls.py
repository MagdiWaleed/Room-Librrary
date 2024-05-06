from django.urls import path
from .views import getBooksList

urlpatterns = [
    path('books',getBooksList, name="books-list"),
]
