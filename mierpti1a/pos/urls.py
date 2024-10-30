from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='login'),
    path('ventas/', views.ventas, name='ventas'),
    path('catalogo/', views.catalago, name='catalogo'),
    path('administrarProductos/', views.administrarProductos, name='administrarProductos'),
    path('administrarUsuarios/', views.administrarUsuarios, name='administrarUsuarios'),
    path('ventasRealizadas/', views.ventasRealizadas, name='ventasRealizadas'),
]