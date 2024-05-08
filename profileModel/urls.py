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
    )

urlpatterns = [
    path("login/",login, name="log-in"),
    path("my_information/",myProfile, name="my-information"),
    path('register/', register, name='register'),
    path('logout/', logout, name='logout'),
    path('books-number',numBooks,name="books-number"),
    path("my-books/",myBookList, name='my-books-list'),
    path("my-books-data",getMyBooks, name='my-books-data'),

]
