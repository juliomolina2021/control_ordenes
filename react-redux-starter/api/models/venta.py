from django.db import models
#from api.models.profile import Profile
from django.contrib.auth.models import User
from api.models.producto import Producto

class Venta (models.Model):

    fecha = models.DateTimeField(auto_now_add=True)
    numero_venta= models.IntegerField(default=1)
    direccion_envio = models.CharField('direcion envio', max_length=200, null=True, blank=True)
    email = models.CharField('email', max_length=100, null=True, blank=True)
    cantidad=models.IntegerField()
    # sub_total = models.DecimalField('sub_total',max_digits=7, decimal_places=2, default=0)
    # costo_envio = models.DecimalField('costo_envio',max_digits=5, decimal_places=2, default=0)
    total = models.DecimalField('importe',max_digits=7, decimal_places=2)

    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='producto_venta')
    comprador = models.ForeignKey(User, on_delete=models.CASCADE, related_name='venta_comprador')

    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True