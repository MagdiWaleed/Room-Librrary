from django.urls import path
from .views import (
    login,
    myProfile,
    register,
    login,
    logout,
    numBooks,
    myBookList,
    getMyBooks,
    borrowed_book,
    unborrowed_book,
    )

urlpatterns = [
    path("login/",login, name="log-in"),
    path("my_information/",myProfile, name="my-information"),
    path('register/', register, name='register'),
    path('logout/', logout, name='logout'),
    path('books-number',numBooks,name="books-number"),
    path("my-books/",myBookList, name='my-books-list'),
    path("my-books-data",getMyBooks, name='my-books-data'),
    path("borrowed-book",borrowed_book,name="borrowed-book"),
    path("unborrowed-book",unborrowed_book,name="unborrowed-book"),
    
]
