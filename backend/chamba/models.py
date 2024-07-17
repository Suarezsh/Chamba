
from django.db import models

class Usuario(models.Model):
    TIPO_USUARIO = [
        ('trabajador', 'Trabajador'),
        ('empleador', 'Empleador'),
    ]
    
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    dni = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    tipo = models.CharField(max_length=10, choices=TIPO_USUARIO)
    foto_perfil = models.ImageField(upload_to='usuarios/', null=True, blank=True)
    ubicacion = models.TextField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class Empleador(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)

class Trabajador(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    habilidades = models.TextField(null=True, blank=True)
    educacion = models.TextField(null=True, blank=True)
    disponible = models.BooleanField(default=True)

class Chamba(models.Model):
    empleador = models.ForeignKey(Empleador, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    sueldo = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    cantidad_vacantes = models.IntegerField(null=True, blank=True)
    fecha_inicio = models.DateField(null=True, blank=True)
    fecha_fin = models.DateField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

class Postulacion(models.Model):
    ESTADO_POSTULACION = [
        ('pendiente', 'Pendiente'),
        ('aceptado', 'Aceptado'),
        ('rechazado', 'Rechazado'),
    ]
    
    chamba = models.ForeignKey(Chamba, on_delete=models.CASCADE)
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    estado = models.CharField(max_length=10, choices=ESTADO_POSTULACION, default='pendiente')

class Mensaje(models.Model):
    remitente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='mensajes_enviados')
    destinatario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='mensajes_recibidos')
    mensaje = models.TextField()
    enviado_en = models.DateTimeField(auto_now_add=True)
