from django.db import models
#from api.models.profile import Profile
from django.contrib.auth.models import User

class Producto (models.Model):

    nombre = models.CharField('producto', max_length=100)
    precio = models.DecimalField('precio', max_digits=7, decimal_places=2)
    stock = models.DecimalField('stock',max_digits=7, decimal_places=2)
    descripcion = models.CharField('descripcion curso', max_length=200, null=True, blank=True)
    imagen = models.ImageField(upload_to='imagen_producto', null=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='producto_user')

    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True