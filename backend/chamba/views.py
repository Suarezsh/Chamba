from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer
from django.core.mail import send_mail
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import random

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    


@api_view(['POST'])
def registrar_usuario(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        usuario = serializer.save()
        codigo_verificacion = random.randint(1000, 9999)
        send_mail(
            'Código de verificación',
            f'Tu código de verificación es {codigo_verificacion}',
            'noreply@mi_primera_chamba.com',
            [usuario.email],
            fail_silently=False,
        )
        return Response({'message': 'Usuario registrado. Código de verificación enviado.', 'codigo_verificacion': codigo_verificacion}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
