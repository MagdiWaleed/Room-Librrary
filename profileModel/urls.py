from django.urls import path
from .views import (
    login,
    myProfile,
    registerNewUser,
    login,
    deleteAccount,
    numBooks,
    myBookList,
    getMyBooks,
    borrowed_book,
    unborrowed_book,
    signup,
    updateUser,
    )

urlpatterns = [
    path("login/",login, name="log-in"),
    path("my_information/",myProfile, name="my-information"),
    path('register-new-user/', registerNewUser, name='register-new-user'),
    path('delete-account', deleteAccount, name='delete-account'),
    path('books-number',numBooks,name="books-number"),
    path("my-books/",myBookList, name='my-books-list'),
    path("my-books-data",getMyBooks, name='my-books-data'),
    path("borrowed-book",borrowed_book,name="borrowed-book"),
    path("unborrowed-book",unborrowed_book,name="unborrowed-book"),
    path("signup/",signup,name="signup"),
    path("update-user/",updateUser,name="update-user"),

]
