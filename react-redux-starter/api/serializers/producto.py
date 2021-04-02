from rest_framework import serializers
from api.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
        depth=1

            
class ProductoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = (
            'nombre',
            'precio',
            'stock',
            'descripcion',
            )
