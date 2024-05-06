from django.urls import path
from .views import (
    getBooksList,
    getBooksData 
                    )

urlpatterns = [
    path('books/',getBooksList, name="books-list"),
    path('main/get-books/',getBooksData,name='books-data'),
]
