import json
from django.core.files import File
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
from api.models import Producto
from api.serializers import ProductoSerializer, ProductoRegistroSerializer

class ProductoViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre", )
    ordering_fields = ("nombre",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProductoSerializer
        else:
            return ProductoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            
            data = request.data
            user = request.user
            imagen = data.get('imagen')
            data= json.loads(data['data'])

            with transaction.atomic():
                serializer = ProductoRegistroSerializer(data=data)

                if serializer.is_valid():

                    user = User.objects.get(username=user)
    
                    Producto.objects.create(
                        nombre=data.get('nombre'),
                        precio=data.get('precio'),
                        stock=data.get('stock'),
                        descripcion=data.get('descripcion'),
                        user= user,
                        imagen = File(imagen)
                        )
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        try:
            data = request.data
            user = request.user
            imagen = data.get('imagen')
            data = json.loads(data["data"])
            
            with transaction.atomic():
                serializer = ProductoRegistroSerializer(data=data)
                if serializer.is_valid():
                    
                    producto = Producto.objects.get(pk=pk)
                    user = User.objects.get(username=user)
                    
                    if producto.imagen is not None:
                        producto.imagen.delete()
                    
                    producto.nombre = data.get('nombre')
                    producto.precio = data.get('precio')
                    producto.stock = data.get('stock')
                    producto.descripcion = data.get('descripcion')
                    producto.user = user
                    producto.imagen = File(imagen)
                    producto.save()

                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
            #return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def mis_productos(self, request, *args, **kwargs):
        try:
            user = request.user
            productos_usuario = Producto.objects.filter(user=user, activo=True)
            page = self.paginate_queryset(productos_usuario)
            if page is not None:
                serializer = ProductoSerializer(page, many=True)
            #return Response(serializer.data, status=status.HTTP_200_OK)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["get"], detail=False)
    def explorar_productos(self, request, *args, **kwargs):
        try:
            user = request.user
            productos_usuario = Producto.objects.filter(activo=True).exclude(user=user)
            page = self.paginate_queryset(productos_usuario)
            if page is not None:
                serializer = ProductoSerializer(page, many=True)
            #return Response(serializer.data, status=status.HTTP_200_OK)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)
