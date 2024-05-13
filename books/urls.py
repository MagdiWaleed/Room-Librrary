from django.urls import path
from .views import (
    getBooksList,
    getBooksData,
    getSingleBook,
    getStatistics,
    getAbout,
    getAllBooks,
    addEditBook,
    getBookForEdit,
    deleteBook,
    changeBookData,
    getTrendingBooks,
    getLatestBooks,
    addNewBook,
    getSingleBookUserId,
    )

urlpatterns = [
    path('',getBooksList, name="books-list"),
    path("books/",getAllBooks, name="get-all-books"),
    path("books/trending/",getTrendingBooks, name="get-all-books"),
    path("books/latest/",getLatestBooks, name="get-all-books"),
    path('books/get-books/',getBooksData,name='books-data'),
    path('books/add-edit-book/',addEditBook,name="add-edit-book"),
    path('books/edit-book/<pk>/',getBookForEdit,name="edit-book"),
    path('books/delete-book/',deleteBook,name="delete-book"),
    path('books/edited-book/',changeBookData,name="edited-book"),
    path('books/<pk>/',getSingleBook,name='single-book'),
    path("statistics/",getStatistics,name="statistics"),
    path("about/",getAbout, name='about'),
    path("books/add-edit-book/add-new-book",addNewBook,name="add-new-book"),
    path("books/<pk>/single-book-user-id",getSingleBookUserId,name="single-book-user-id")
]
