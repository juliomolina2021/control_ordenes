from rest_framework import serializers
from api.models import Venta

class VentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = '__all__'
        depth=2


class TotalVentasProductoSerializer(serializers.Serializer):
    total_venta_producto= serializers.IntegerField(default=0)
    prod=serializers.CharField(default=" ")
    class Meta:
        fields = (
            'total_venta_producto',
            'prod',
            )  

class VentaRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = (
            'direccion_envio',
            )