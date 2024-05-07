from django.shortcuts import render
from django.http import JsonResponse
from books.models import Book 

# Create your views here.
def search(request, searchingText):
    books_by_title = Book.objects.filter(title__icontains=searchingText)
    books_by_description = Book.objects.filter(description__icontains=searchingText)
    books_by_author = Book.objects.filter(author_name__icontains=searchingText)
    
    books = list(books_by_title) + list(books_by_description) + list(books_by_author)
    
    books = list(set(books))
    print("books: ",books)
    data = []
    for book in books:
        item = {
            'id': str(book.id),
            'title': str(book.title),
            'description': str(book.description),
            'img': str(book.img),
            'author_name': str(book.author_name),
            'about_author': str(book.about_author),
        }
        data.append(item)
    print(data)
    context = {"data": data}
    return render(request, 'filtering/search.html', context)

