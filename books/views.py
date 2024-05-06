from django.shortcuts import render
from .models import Book
from django.http import JsonResponse 
# Create your views here.
def getBooksList(request):
    return render(request, 'books/main.html')

def getBooksData(request):
    books= Book.objects.all()
    data=[]
    for book in books:
        item={
            "title": str(book.title),
            "description":str(book.description),
            "img":str(book.img),
            'author_name':str(book.author_name),
            'about_author':str(book.about_author),
        }
        data.append(item)
    context={"data":data}
    return JsonResponse(context)
