from django.urls import path
from . import views

urlpatterns = [
    ## Vistas HTML
    path('', views.index, name='index'),
    path('productos/', views.productos, name='administrarProductos'),
    path('venta/', views.ventas, name='venta'),
    path('ventas/', views.ventasRealizadas, name='ventas'),
    path('catalogo/', views.catalogo, name='catalogo'),
    

    #### Get de Cosas 
    path('catalogo/get_catalogo/', views.get_catalogo, name='Ver catalago de productos'),
    path('get_ventasRealizadas/', views.get_ventasRealizadas, name='Ver Ventas Realizadas'),
    path('productos/get_productos/', views.get_productos, name='Ver Productos'),
]