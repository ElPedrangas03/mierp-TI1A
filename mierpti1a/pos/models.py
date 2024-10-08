from django.db import models

class Empleados(models.Model):
    class Rol(models.TextChoices):
        ADMINISTRADOR = 'ADM', 'Administrador'
        EMPLEADO = 'EMP', 'Empleado'
        GERENTE = 'GER', 'Gerente'
        SUPERVISOR = 'SUP', 'Supervisor'

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