from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)
    foto_perfil = models.ImageField(upload_to='fotos_perfil/')
    ubicacion = models.CharField(max_length=255)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

class Empleador(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)

class Trabajador(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    habilidades = models.TextField()
    educacion = models.TextField()
    disponible = models.BooleanField(default=True)

class Categoria(models.Model):
    categoria = models.CharField(max_length=100)

class Chamba(models.Model):
    empleador = models.ForeignKey(Empleador, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    sueldo = models.DecimalField(max_digits=10, decimal_places=2)
    vacantes = models.IntegerField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

class Postulacion(models.Model):
    chamba = models.ForeignKey(Chamba, on_delete=models.CASCADE)
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    estado = models.CharField(max_length=50)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

class Mensaje(models.Model):
    remitente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='mensajes_enviados')
    destinatario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='mensajes_recibidos')
    mensaje = models.TextField()
    enviado_en = models.DateTimeField(auto_now_add=True)