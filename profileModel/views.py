from django.shortcuts import render
from .models import ProfileModel
from books.models import Book 
# Create your views here.

def login(request):
    return render(request,'profileModel/login.html')

def myProfile(request,id):
    user= ProfileModel.objects.get(pk=id)
    borrowedbooks= Book.objects.filter(user=user)
    context={
        "numborrowedbooks": str(len(borrowedbooks)),
        "username": str(user.username),
        "email":str(user.email),
        "password": str(user.password),
        
    }