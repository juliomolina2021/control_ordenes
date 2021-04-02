from django.db.models import Max, Count, Q, Avg, F
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from django.db import transaction
from django.contrib.auth.models import User
from api.models import Venta, Producto
from api.serializers import VentaSerializer, VentaRegistroSerializer, TotalVentasProductoSerializer

class VentaViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("numero_venta",)
    search_fields = ("numero_venta", )
    ordering_fields = ("numero_venta",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return VentaSerializer
        else:
            return VentaRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            data = request.data
            user = request.user

            with transaction.atomic():
                serializer = VentaRegistroSerializer(data=data)
                if serializer.is_valid():

                    usuario = User.objects.get(username=user)
                    
                    id_producto = data.get('id_producto')
                    producto = Producto.objects.get(pk= id_producto)

                    numero = Venta.objects.values('numero_venta').aggregate(sum=Max('numero_venta', filter=Q(activo=True)))
                    numVenta= numero['sum']
                    
                    if numVenta is None:
                        numVenta = 0 
                    
                    Venta.objects.create(
                        numero_venta= numVenta + 1,
                        direccion_envio=data.get('direccion_envio'),
                        cantidad=data.get('cantidad'),
                        total=data.get('total'),
                        producto=producto,
                        comprador=usuario,
                        )
                    
                    producto.stock = producto.stock - data.get('cantidad')
                    producto.save()

                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def mis_compras(self, request, *args, **kwargs):
        try:
            user = request.user
            compras = Venta.objects.filter(comprador= user)
            page = self.paginate_queryset(compras)
            if page is not None:
                serializer = VentaSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["get"], detail=False)
    def mis_ventas(self, request, *args, **kwargs):
        try:
            user = request.user
            ventas = Venta.objects.filter(producto__user=user)
            page = self.paginate_queryset(ventas)
            if page is not None:
                serializer = VentaSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["get"], detail=False)
    def totales_ventas(self, request, *args, **kwargs):
        try:
            user = request.user
            total_ventas_producto = Venta.objects.values('producto').annotate(
                total_venta_producto=Count('producto')
                ).annotate(
                    prod=F('producto__nombre')
                ).filter(producto__user=user)
            
            page = self.paginate_queryset(total_ventas_producto)
            if page is not None:
                serializer = TotalVentasProductoSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def promedio_precios(self, request, *args, **kwargs):
        try:
            user = request.user
            promedio_precios = Producto.objects.all().aggregate(prom_precios=Avg('precio', filter=Q(user=user)))
            
            return Response({'promedio':  "{:,.2f}".format(promedio_precios['prom_precios'])}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

