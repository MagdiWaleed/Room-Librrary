from django.urls import path
from .views import (
    search,
    getBorrowedBooks,
    getMembersBooks,
    getUserBooks,
    getAuthorBooks,
    searchingAboutUsers,
    searchingAboutAuthors,
    )

urlpatterns = [
    path('searching/<searchingText>/' , search , name="search"),
    path('borrowed-books/',getBorrowedBooks,name="borrowed-books"),
    path('<members>/',getMembersBooks, name="get-members"),
    path("users/<id>/",getUserBooks,name="single-user"),
    path('authors/<author_name>/',getAuthorBooks,name="single-author"),
    path("users/searching/<searchingText>/",searchingAboutUsers,name="searching-about-users"),
    path("authors/searching/<searchingText>/",searchingAboutAuthors,name="searching-about-author"),
]
