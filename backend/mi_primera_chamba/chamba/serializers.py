from rest_framework import serializers
from .models import Usuario, Chamba , Trabajador, Mensaje
from django.contrib.auth.hashers import make_password
from .models import  Empleador


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
    empleador_nombre = serializers.CharField(source='empleador.usuario.nombre', read_only=True)
    empleador_apellido = serializers.CharField(source='empleador.usuario.apellido', read_only=True)
    empleador_usuario_id = serializers.IntegerField(source='empleador.usuario.id', read_only=True)
    
    class Meta:
        model = Chamba
        fields = ['id', 'empleador', 'empleador_usuario_id', 'empleador_nombre', 'empleador_apellido', 'titulo', 'descripcion', 'fecha_inicio', 'fecha_fin', 'creado_en', 'actualizado_en']
        read_only_fields = ['creado_en', 'actualizado_en']



class TrabajadorSerializer(serializers.ModelSerializer):
    usuario_id = serializers.IntegerField(source='usuario.id')
    nombre = serializers.CharField(source='usuario.nombre')
    apellido = serializers.CharField(source='usuario.apellido')

    class Meta:
        model = Trabajador
        fields = ['usuario_id', 'nombre', 'apellido', 'habilidades', 'disponible']


class TrabajadorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trabajador
        fields = ['habilidades', 'disponible']

        
class MensajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensaje
        fields = ['remitente', 'destinatario', 'mensaje', 'enviado_en']
        read_only_fields = ['enviado_en']
        

class UsuarioEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombre', 'apellido', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.password = make_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        
        return instance

