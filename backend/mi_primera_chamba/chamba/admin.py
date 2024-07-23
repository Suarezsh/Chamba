from django.contrib import admin
from .models import Usuario, Empleador, Trabajador, Chamba, Postulacion, Mensaje

admin.site.register(Usuario)
admin.site.register(Empleador)
admin.site.register(Trabajador)
admin.site.register(Chamba)
admin.site.register(Postulacion)
admin.site.register(Mensaje)
