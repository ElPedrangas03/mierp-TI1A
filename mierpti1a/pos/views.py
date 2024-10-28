from django.http import HttpResponse
from django.shortcuts import render


def Ventas(request):
    return render(request, 'pos/templates/Ventas.html')

def catalago(request):
    return render(request, 'pos/templates/catalogo.html')

def administrarProductos(reques):
    return render(reques, 'pos/templates/administrarProductos.html')