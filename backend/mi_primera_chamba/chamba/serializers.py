from rest_framework import serializers
from .models import Usuario, Chamba, Postulacion, Mensaje

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'apellido', 'dni', 'email', 'password', 'tipo', 'foto_perfil', 'ubicacion', 'creado_en', 'actualizado_en']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Usuario.objects.create(**validated_data)
        return user

class ChambaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamba
        fields = ['id', 'empleador', 'titulo', 'descripcion', 'sueldo', 'cantidad_vacantes', 'fecha_inicio', 'fecha_fin', 'creado_en', 'actualizado_en']

class PostulacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulacion
        fields = ['id', 'chamba', 'trabajador', 'estado']

class MensajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensaje
        fields = ['id', 'remitente', 'destinatario', 'mensaje', 'enviado_en']
