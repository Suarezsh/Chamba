from rest_framework import serializers
from .models import Usuario, Chamba , Trabajador, Mensaje


class RegistroUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombre', 'apellido', 'email', 'password', 'tipo']

    def create(self, validated_data):
        return Usuario.objects.create(**validated_data)

class IniciarSesionSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        from django.contrib.auth import authenticate
        user = authenticate(email=data['email'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Credenciales inválidas")
        return user

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'apellido', 'email', 'tipo']

class ChambaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamba
        fields = ['id', 'empleador', 'titulo', 'descripcion', 'fecha_inicio', 'fecha_fin', 'creado_en', 'actualizado_en']
        read_only_fields = ['creado_en', 'actualizado_en']

class TrabajadorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Trabajador
        fields = ['usuario', 'habilidades', 'disponible']
        
class MensajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensaje
        fields = ['remitente', 'destinatario', 'mensaje', 'enviado_en']
        read_only_fields = ['enviado_en']