import json
from .models import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.db import transaction   

###### Vista de Inicio de secion con identificacion implementada con Django y su funcion Autenticate ######
def index(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('ventas')
        else:
            messages.error(request, 'Credenciales incorrectas. Inténtalo de nuevo.')

    return render(request, 'pos/templates/index.html')


######## Vistas para el funcionamiento de productos ########
def productos(request):
    return render(request, 'pos/templates/administrarProductos.html')

def get_productos(request):
    productos = list(Producto.objects.values())

    if (len(productos)>0):
        data = {'message':"Success", 'productos':productos}
    else:
        data = {'message':"Not Found"}
    
    return JsonResponse(data)
    


#### Vistas para el funcionamiento de Ventas Realizadas ####
def ventasRealizadas(request):
    return render(request, 'pos/templates/ventasRealizadas.html')

def get_ventasRealizadas(request):
    if request.method == "GET":
        ventas = list(Venta.objects.values('empleado', 'id', 'descripcion', 'total', 'sucursal'))
        return JsonResponse(ventas, safe=False)


###### Catalago de productos en inventario ###### 
def catalogo(request):
    return render(request, 'pos/templates/catalogo.html')

def get_catalogo(request):
    catalogo = list(Producto.objects.values())
    
    if (len(catalogo)>0):
        data = {'message':"Success", 'catalogo':catalogo}
    else:
        data = {'message':"Not Found"}
    
    return JsonResponse(data)


#Control de Usuarios 
def administrarUsuarios(request):
    return render(request, 'pos/templates/administrarUsuarios.html')

#   Ventas y detalles de la venta
def ventas(request):
    if request.method == 'POST':
        # Obtener datos del formulario
        producto_id = request.POST.get('idProducto')
        cantidad = int(request.POST.get('cantidadProducto', 1))
        
        # Recuperar el producto y crear el carrito si aún no existe
        try:
            producto = Producto.objects.get(id=producto_id)
            if 'carrito' not in request.session:
                request.session['carrito'] = []
            
            # Agregar el producto al carrito con cantidad y subtotal
            carrito = request.session['carrito']
            carrito.append({
                'producto_id': producto.id,
                'nombre': producto.nombre,
                'precio': float(producto.precio),
                'cantidad': cantidad,
                'subtotal': float(producto.precio) * cantidad
            })
            request.session['carrito'] = carrito
            request.session.modified = True
            
            messages.success(request, 'Producto agregado al carrito.')
        except Producto.DoesNotExist:
            messages.error(request, 'El producto no existe.')
    
    # Calcular el total del carrito
    carrito = request.session.get('carrito', [])
    total = sum(item['subtotal'] for item in carrito)
    iva = total * 0.16  # IVA del 16%
    total_con_iva = total + iva
    
    context = {
        'carrito': carrito,
        'subtotal': total,
        'iva': iva,
        'total_con_iva': total_con_iva,
    }
    return render(request, 'pos/templates/Ventas.html', context)

def confirmar_venta(request):
    if request.method == 'POST':
        try:
            with transaction.atomic():
                carrito = request.session.get('carrito', [])
                if not carrito:
                    messages.error(request, 'El carrito está vacío.')
                    return redirect('ventas')
                
                # Obtener el empleado y la sucursal de la sesión del usuario
                empleado = request.user  # Asumimos que el usuario autenticado es el empleado
                sucursal = empleado.sucursal  # Asumimos que el modelo Empleado tiene un campo 'sucursal'
                
                # Crear una nueva venta
                venta = Venta.objects.create(
                    empleado=empleado,
                    venta_no='123456',  # Genera un número de venta único
                    total=sum(item['subtotal'] for item in carrito),
                    sucursal=sucursal
                )
                # Limpiar el carrito
                del request.session['carrito']
                request.session.modified = True
                
                messages.success(request, 'La venta fue realizada con éxito.')
                return redirect('ventas')
        except Exception as e:
            messages.error(request, f'Ocurrió un error: {str(e)}')
            return redirect('ventas')