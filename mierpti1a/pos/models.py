from django.db import models

class Sucursal(models.Model):
    nombre = models.CharField(max_length=100, default="Mi Ejemplo de Chanagrro")
    numTel = models.CharField(max_length=15, default="000-000-0000")
    direccion = models.CharField(max_length=255, default="Avenida 123, Mich")

    def __str__(self):
        return self.nombre
    
class Producto(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(max_length=255, default="ta muy rico")
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    descuento = models.PositiveIntegerField()
    sucursal = models.ForeignKey(Sucursal, null=False, blank=False, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ['nombre']
        



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


class Venta(models.Model):
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    descripcion = models.TextField(default="Pedro Guapo")
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def calcular_total(self):
        return sum(producto.precio for producto in self.productos.all())

    def __str__(self):
        return f"Venta #{self.id} - Total: {self.total}"