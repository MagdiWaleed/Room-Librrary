from django.shortcuts import render
from .models import Book
from django.http import JsonResponse 
from profileModel.models import ProfileModel 
from django.utils.timezone import now
from django.conf import settings
from django.core.exceptions import ValidationError

import os


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
        print("is borrowed for a book: ",isborrowed)
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
        'user':str(obj.user),
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

from django.utils.timezone import now
import os

def getBookForEdit(request,pk):
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
    return render(request,'books/edit_single_book.html',{'data':data})
def addNewBook(request):
    if request.method == 'POST':
        try:
            data_dict = request.POST.dict()
            book_name = data_dict.get('book_name')
            book_description = data_dict.get('book_description')
            author_name = data_dict.get('author_name')
            about_author = data_dict.get('about_author')
            category = data_dict.get('category')
            image = request.FILES.get('image')
            book_type = data_dict.get('book_type')

            print("data_dict: ", data_dict)
            print("book_name: ", book_name)
            print("book_description: ", book_description)
            print("author_name: ", author_name)
            print("about_author: ", about_author)
            print("category: ", category)
            print("image: ", image)

            if not book_name or not book_description or not author_name or not about_author or not category:
                raise ValidationError('Missing required fields.')

            new_book = Book.objects.create(
                title=book_name,
                description=book_description,
                author_name=author_name,
                about_author=about_author,
                category=category,
                book_type=book_type,
            )

            if image:
                # Save the image to the media folder with date components in the path
                current_time = now()
                image_folder = os.path.join(settings.MEDIA_ROOT, 'books', str(current_time.strftime('%Y'))[2:], str(current_time.strftime('%m')), str(current_time.strftime('%d')))
                os.makedirs(image_folder, exist_ok=True)  # Create folder if it doesn't exist
                image_path = os.path.join(image_folder, image.name)
                with open(image_path, 'wb+') as destination:
                    for chunk in image.chunks():
                        destination.write(chunk)
                # Update the new_book object with image path
                new_book.img = os.path.join('books', str(current_time.strftime('%Y'))[2:], str(current_time.strftime('%m')), str(current_time.strftime('%d')), image.name)
                new_book.save()

            return JsonResponse({'status': 'success', 'message': 'Book added successfully'})
        except (ValidationError, Exception) as e:
            return JsonResponse({'status': 'error', 'message': str(e)})


def getSingleBookUserId(request,pk):
    
    context={}

    try:
        book =Book.objects.get(pk=pk)
        item={
            "user_id":book.user.id,
            "book_id":book.id,
        }
        context={
            "data":item
        }
    except Exception as e:
        context={"data":{
            "user_id":"#",
            "book_id": pk,
        }}
    print(context)
    return JsonResponse(context)