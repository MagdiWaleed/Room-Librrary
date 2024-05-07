from django.urls import path
from .views import (
    search,
    getBorrowedBooks,
    )

urlpatterns = [
    path('searching/<searchingText>/' , search , name="search"),
    path('borrowed-books/',getBorrowedBooks,name="borrowed-books"),
]
