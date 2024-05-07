from django.shortcuts import render
from .models import Book
from django.http import JsonResponse 
from profileModel.models import ProfileModel 


# Create your views here.
def getBooksList(request):
    return render(request, 'books/main.html')

def getStatistics(request):
    books= Book.objects.all()
    authors=[]
    users=ProfileModel.objects.all()
    for book in books:
        authors.append(book.author_name)
    authors=set(authors)
    counter=0
    for user in users:
        borrowed = Book.objects.filter(user=user)
        for book in borrowed:
            counter+=1
    context={
        "num_books":str(len(books)),
        "num_authors":str(len(authors)),
        "num_users":str(len(users)),
        "num_borrowed":str(counter),
    }
    return render(request,'books/statistics.html',context)




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
            'id':str(book.id),
        }
        data.append(item)
    context={"data":data}
    return JsonResponse(context)

def getSingleBook(request,pk):
    print("this is the primary key" ,pk)
    obj = Book.objects.get(pk=pk)
    data={
        'id': str(obj.id),
        'title': str(obj.title),
        "description":str(obj.description),
        'img': str(obj.img),
        'author_name':str(obj.author_name),
        'about_author':str(obj.about_author),
    }
    return render(request,'books/single_book.html',{'data':data})

def getAbout(request):
    return render(request,'pages/about.html')


def getAllBooks(request):
    books= Book.objects.all()
    data=[]
    for book in books:
        item={
            "title": str(book.title),
            "description":str(book.description),
            "img":str(book.img),
            'author_name':str(book.author_name),
            'about_author':str(book.about_author),
            'id':str(book.id),
        }
        data.append(item)
    context={"data":data}
    return render(request,'books/books_screen.html',context)

def addEditBook(request):
    return render(request,'books/add_new_book.html')