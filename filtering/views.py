from django.shortcuts import render
from django.http import JsonResponse
from books.models import Book
from profileModel.models import ProfileModel


# Create your views here.
def getEntities(text):
    texts= text.split("%20")
    data={"category":[],"title":[],"author":[]}
    for i in texts:
        books_by_title = Book.objects.filter(title__icontains=i)
        books_by_category = Book.objects.filter(category__icontains=i)
        books_by_author = Book.objects.filter(author_name__icontains=i)
        data["title"].extend(list(books_by_title))
        data["category"].extend(list(books_by_category))
        data["author"].extend(list(books_by_author))
    return data
import numpy as np
def search(request, searchingText):
    searching_data= getEntities(searchingText.strip())
    

    books = list(searching_data["title"]) + list(searching_data["category"]) + list(searching_data["author"])
    
    books = list(set(books))
    # print(np.array([i.title for i in books]))
    data = []
    context={}
    for book in books:
        isborrowed =""
        if book.user== None:
            isborrowed='no'
        else:
            isborrowed='yes'
        item = {
            'id': str(book.id),
            'title': str(book.title),
            'description': str(book.description),
            'img': str(book.img),
            'isborrowed':str(isborrowed),
            'author_name': str(book.author_name),
            'about_author': str(book.about_author),
        }
        data.append(item)
    if len(data)== 0:
        context={"data" : "no data"}
    else:
        context = {"data": data}
    return render(request, 'filtering/search.html', context)

def getBorrowedBooks(request):
    users= ProfileModel.objects.all()
    data=[]
    for user in users:
        books= Book.objects.filter(user=user)
        for book in books:
            item={
                "title": str(book.title),
                "author_name": str(book.author_name),
                "username": str(user.username),
                "id":str(book.id),
                "user_id":str(user.id),
                "category":str(book.category),
            }
            data.append(item)      
    
    for t in range(len(data)):
        if t%2==0:
            data[t]["isEven"]="True"
        else:
            data[t]["isEven"]="False"
    context= {"data":data}
    return render(request,'filtering/borrowed_books.html',context)
import numpy as np
def getMembersBooks(request,members):
    data=[]
    if members== "users":
        users=ProfileModel.objects.all()
        for user in users:
            books=Book.objects.filter(user=user)
            item={
                "memberid":str(user.id),
                "membername":str(user.username),
                "numBooks":str(len(books))
            }
            data.append(item)
    elif members=="authors":
        books_by_author = Book.objects.all()
        m = np.array([[i.author_name.strip(),len(i.author_name.strip())] for i in books_by_author])
        print(m)
        print(len(list(set(m[:,0]))))
        authors= [t.author_name.strip() for t in books_by_author]
        authors= list(set(authors))
        for author in authors:
            books=Book.objects.filter(author_name__icontains=author)
            item={
                "memberid":"#",
                "membername":str(author),
                "numBooks":str(len(books))
            }
            data.append(item)
    for t in range(len(data)):
        if t%2==0:
            data[t]["isEven"]="True"
        else:
            data[t]["isEven"]="False"
    if members=="users":
        context= {
            "data":data,
            "userType":"users"
            }
    else:
        context= {
            "data":data,
            "userType":"authors"
            }
    print(context)
    return render(request,"filtering/users_authors.html",context)

def getUserBooks(request,id):
    user= ProfileModel.objects.get(pk=id)
    books= Book.objects.filter(user=user)
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
    context = {
        "data": data,
        "memberName": str(user.username),
        }
    return render(request,"filtering/single_user_author.html",context)

def getAuthorBooks(request,author_name):
    books= Book.objects.filter(author_name__icontains=author_name.strip())
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
    context = {
            "data": data,
            "memberName": str(author_name),
               }
    return render(request,"filtering/single_user_author.html",context)
def getUserAuthorName(text):
    texts= text.split("%20")
    helper=""
    for i in texts:
        helper+= i+" "
    return helper.strip()
def searchingAboutUsers(request,searchingText):
    data=[]
    context ={}
    users= ProfileModel.objects.filter(username__icontains=getUserAuthorName(searchingText))
    for user in users:
        books=Book.objects.filter(user=user)
        item={
            "memberid":str(user.id),
            "membername":str(user.username),
            "numBooks":str(len(books))
        }
        data.append(item)
    for t in range(len(data)):
        if t%2==0:
            data[t]["isEven"]="True"
        else:
            data[t]["isEven"]="False"
    if len(data)==0:
        context= {"data": "no data","userType":"users"}
    else:
        context= {"data":data }
    return render(request,"filtering/users_authors.html",context) 

def searchingAboutAuthors(request,searchingText):
    print("this is the lenght of ur list")

    data=[]
    books= Book.objects.filter(author_name__icontains=getUserAuthorName(searchingText))
    authors=[]
    for book in books:
        authors.append(book.author_name)
    authors = list(set(authors))
    for author in authors:
        books=Book.objects.filter(author_name =author)
        item={
            "memberid":"#",
            "membername":str(author),
            "numBooks":str(len(books))
        }
        data.append(item)
    print("data")
    for t in range(len(data)):
        if t%2==0:
            data[t]["isEven"]="True"
        else:
            data[t]["isEven"]="False"
    if len(data)==0:
        context= {"data": "no data" , "userType":"authors"}
    else:
        context= {"data":data }
    return render(request,"filtering/users_authors.html",context) 
