from django.shortcuts import render

# Create your views here.
def getBooksList(request):
    return render(request, 'books/main.html')
    