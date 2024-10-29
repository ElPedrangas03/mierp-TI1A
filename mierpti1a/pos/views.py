import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Producto
from django.shortcuts import render

#Control de acceso para perfiles de usuarios creados.
def index(request):
    return render(request, 'pos/templates/index.html')

#Ventas que se estan realizando al momento.
def ventas(request):
    return render(request, 'pos/templates/Ventas.html')

#Catalago de productos disponibles en inventario.
def catalago(request):
    return render(request, 'pos/templates/catalogo.html')

#Agregar, eliminar o editar productos que esten dentro de la base de datos.
@csrf_exempt
def administrarProductos(request):
    if request.method == 'GET':
        productos = list(Producto.objects.values())
        return JsonResponse(productos, safe=False)

    elif request.method == 'POST':
        data = json.loads(request.body)
        producto = Producto.objects.create(
            nombre=data['nombre'],
            precio_unitario=data['precio_unitario'],
            descuento=data.get('descuento', 0),
            stock=data['stock'],
            descripcion=data.get('descripcion', ''),
            sucursal=data['sucursal']
        )
        return JsonResponse({'id': producto.id, 'status': 'Producto creado correctamente'})

#Control de ventas que se an realizado
def ventasRealizadas(request):
    return render(request, 'pos/templates/ventasRealizadas.html')

#Control de Usuarios 
def administrarUsuarios(request):
    return render(request, 'pos/templates/administrarUsuarios.html')