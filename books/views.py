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
    trending_data=[]
    latest_data=[]
    for book in books:
        isborrowed =""
        if book.user== None:
            isborrowed='no'
        else:
            isborrowed='yes'
        item={
                "title": str(book.title),
                "description":str(book.description),
                "img":str(book.img),
                'author_name':str(book.author_name),
                'about_author':str(book.about_author),
                'id':str(book.id),
                'isborrowed':str(isborrowed)
            }
        if book.book_type== "trending":    
           trending_data.append(item)
        else:
            latest_data.append(item)

    context={
        "trending":trending_data,
        "latest":latest_data,             
             }
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
    context={"data":data,"filter":"all books"}
    return render(request,'books/books_screen.html',context)

def getTrendingBooks(request):
    books= Book.objects.filter(book_type="trending")
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
    context={"data":data,"filter":"Trending books"}
    return render(request,'books/books_screen.html',context)

def getLatestBooks(request):
    books= Book.objects.filter(book_type="latest")
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
    context={"data":data,"filter":"latest books"}
    return render(request,'books/books_screen.html',context)


def addEditBook(request):
    return render(request,'books/add_new_book.html')

def addNewBook(request):
    context={}
    try:
        if request.method=="POST":
            book_name = request.POST["book_name"]
            author_name = request.POST["author_name"]
            description = request.POST["description"]
            about_author = request.POST["about_author"]
            book_category = request.POST["book_category"]
            book_type = request.POST["book_type"]
            book= Book(title=book_name,
                    description=description,author_name=author_name,
                    about_author=about_author,book_type=book_type,
                        category=book_category)
            book.save()
            context={"data":"hase been created"}
    except Exception as e:
        context={"data":"something went wrong"}
    
    return JsonResponse(context)
