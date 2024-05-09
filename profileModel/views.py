from django.shortcuts import render, redirect
from .models import ProfileModel
from books.models import Book 
from django.http import JsonResponse
# Create your views here.

def myProfile(request):
  
    return render(request, 'profileModel/my_information.html',  )

def login(request):
    context={}
    if request.method=="POST":
        username= request.POST["username"]
        password= request.POST["password"]
        isAdmin= request.POST["isAdmin"]
        if isAdmin=="false":
            isAdmin=False
        else:
            isAdmin=True 
        try:
            user =ProfileModel.objects.get(username=username,password=password,is_admin=isAdmin)
            item={
            "username": str(user.username),
            "email":str(user.email),
            "password": str(user.password),
            "isAdmin":str(user.is_admin),
            "id":str(user.id),
             }
            context ={"data":item}
            
        except Exception as e:
            context = {"data": "no member"}
    print(context)       
    return JsonResponse(context)

def deleteAccount(request):
    if request.method=="POST":
        user_id= request.POST["user_id"]
        print(user_id)
        ProfileModel.objects.filter(pk=user_id).delete()
    return JsonResponse({"data": "Your account has been removed"})

def numBooks(request):
    context={}
    if request.method=="POST":
        id = request.POST["id"]
        user= ProfileModel.objects.get(pk=id)
        numBooks= Book.objects.filter(user=user)
        context={"data":len(numBooks)}
    return JsonResponse(context)

def myBookList(request):
    return render(request,"profileModel/user/my_books.html")

def getMyBooks(request):
    context={}
    if request.method== "POST":
        id = request.POST["id"]
        user=ProfileModel.objects.get(pk=id)
        books= Book.objects.filter(user=user)
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
    else:
        context={
           "data":"some error occur" 
        }
    return JsonResponse(context)

def borrowed_book(request):
    context={}
    if request.method == "POST":
        user_id = request.POST["user_id"]
        book_id = request.POST["book_id"]
        book = Book.objects.get(pk=book_id)
        user = ProfileModel.objects.get(pk=user_id)
        book.user = user
        book.save()
        context={"data":"success"}
    return JsonResponse(context)

def unborrowed_book(request):
    context={}
    if request.method == "POST":
        book_id = request.POST["book_id"]
        print("this is the id for the book",book_id)
        book = Book.objects.get(pk=book_id)
        book.user = None
        book.save()
        context={"data":"success"}
    return JsonResponse(context)

def signup(request):
    return render(request,"profileModel/signup.html")



def registerNewUser(request):
    context={}
    if request.method=="POST":
        username=request.POST["username"]
        password=request.POST["password"]
        email=request.POST["email"]
        isAdmin=request.POST["isAdmin"]
        print(isAdmin)
        if isAdmin=="false":
            isAdmin=False
        else:
            isAdmin= True
            print(isAdmin)
        newUser= ProfileModel(
            username=username,
            password=password,
            email=email,
            is_admin=isAdmin,    
            )
        
        newUser.save()
        context={
            "data":{
                "id":str(newUser.id),
                "username":str(username),
                "password":str(password),
                "email":str(email),
                "isAdmin":str(isAdmin),
            }
        }   
    return JsonResponse(context)
