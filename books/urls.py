from django.urls import path
from .views import (
    getBooksList,
    getBooksData,
    getSingleBook,
    getStatistics,
    getAbout,
    getAllBooks,
    addEditBook,
    )

urlpatterns = [
    path('',getBooksList, name="books-list"),
    path("books/",getAllBooks, name="get-all-books"),
    path('books/get-books/',getBooksData,name='books-data'),
    path('books/add-edit-book/',addEditBook,name="add-edit-book"),
    path('books/<pk>/',getSingleBook,name='single-book'),
    path("statistics/",getStatistics,name="statistics"),
    path("about/",getAbout, name='about'),
]
