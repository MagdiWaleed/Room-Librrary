from django.urls import path
from .views import (
    login,
    myProfile,
    )

urlpatterns = [
    path("login/",login, name="log-in"),
    path("my_information/",myProfile, name="my-information"),
]
