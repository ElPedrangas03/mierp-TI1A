from django.db import models


#------------- Modelo de Productos -------------#
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    descuento = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    stock = models.PositiveIntegerField()
    descripcion = models.TextField(blank=True, null=True)
    sucursal = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre} - {self.sucursal}"


#--------------- Modelo de Empleados -------------#
class Empleado(models.Model):
    class Rol(models.TextChoices):
        ADMINISTRADOR = 'ADM', 'Administrador'
        EMPLEADO = 'BDG', 'Empleado Bodega'
        GERENTE = 'CAJ', 'Empleado Caja'
        SUPERVISOR = 'GEB', 'Gerente de Bodega'

    class Sucursal(models.TextChoices):
        URIANGATO = 'URI', 'Uriangato'
        PURUANDIRO = 'PURU', 'Puruandiro'
        YURIRIA = 'YURI', 'Yuriria'

    idempleado = models.CharField(max_length=1000)
    nombre = models.CharField(max_length=50)
    usuario = models.CharField(max_length=50)
    contrasenia = models.CharField(max_length=16)

    telefono = models.CharField(max_length=15)
    caja = models.IntegerField()
    rol = models.CharField(
        max_length=3,
        choices=Rol.choices,
        default=Rol.EMPLEADO
    )
    idsucursal = models.CharField(
        max_length=5,
        choices=Sucursal.choices,
        default=Sucursal.URIANGATO
    )

    def __str__(self):
        return f'{self.rol} - {self.nombre} ({self.usuario})'
    

class Sucursal(models.Model):
    nombre = models.CharField(max_length=100, default="NAME")
    numTel = models.CharField(max_length=15, default="000-000-0000")
    direccion = models.CharField(max_length=255, default="Sin dirección")


class Venta(models.Model):
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Venta #{self.id} - Total: {self.total}"


class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name="detalles")
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.cantidad} x {self.producto.nombre} en {self.venta}"

    @property
    def subtotal(self):
        return self.cantidad * self.precio