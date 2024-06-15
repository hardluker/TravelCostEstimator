# api/urls.py
from django.urls import path
from .views import airport_list

urlpatterns = [
    path('airports/', airport_list, name='airport-list'),
]