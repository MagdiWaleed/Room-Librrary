from django.urls import path
from .views import (
    getBooksList,
    getBooksData,
    getSingleBook,
    getStatistics,
    getAbout,
    getAllBooks,
                    )

urlpatterns = [
    path('books/',getBooksList, name="books-list"),
    path("books/books/",getAllBooks, name="get-all-books"),
    path('books/get-books/',getBooksData,name='books-data'),
    path('books/<pk>/',getSingleBook,name='single-book'),
    path("statistics/",getStatistics,name="statistics"),
    path("about/",getAbout, name='about'),
]
