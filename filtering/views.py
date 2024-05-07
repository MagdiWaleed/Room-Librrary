from django.shortcuts import render
from django.http import JsonResponse
from books.models import Book 

# Create your views here.
def search(request, searchingText):
    books= Book.objects.all()
    data=[]
    for book in books:
        item={
        'id': str(book.id),
        'title': str(book.title),
        "description":str(book.description),
        'img': str(book.img),
        'author_name':str(book.author_name),
        'about_author':str(book.about_author),
        }
        data.append(item)
    context={"data":data}
    return render(request, 'filtering/search.html',context)

