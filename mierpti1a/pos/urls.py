from django.urls import path
from . import views

urlpatterns = [
    path('', views.Ventas, name='ventas'),
    path('catalogo/', views.catalago, name='catalogo'),
    path('administrarProductos/', views.administrarProductos, name='administrarProductos'),
]