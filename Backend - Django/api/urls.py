# api/urls.py
from django.urls import path
from .views import airport_list, city_list

urlpatterns = [
    path('airports/', airport_list, name='airport-list'),
    path('cities/', city_list, name='city-list'),
]