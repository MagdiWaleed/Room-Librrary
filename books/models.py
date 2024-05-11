from django.db import models
from profileModel.models import ProfileModel
# Create your models here.

class Book(models.Model):
    title=models.CharField(max_length=50)
    description= models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    img= models.ImageField(upload_to='books/%y/%m/%d',default='default-book-cover.jpg')
    author_name= models.CharField(max_length=50)
    about_author= models.TextField()
    category=models.CharField(max_length=50,null=True,default="no category")
    book_type=models.CharField(default="latest",max_length=50,  choices=[("trending","trending"),("latest","latest")],null=True)
    user= models.ForeignKey(ProfileModel,models.SET_NULL,null=True)
    isActive= models.BooleanField(default=True)
    def __str__(self):
        return str(self.title)

    class Meta:
        ordering = ['-created']  