from django.contrib import admin
from .models import Usuario, Empleador, Trabajador, Chamba, Postulacion, Mensaje

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'dni', 'email', 'tipo', 'creado_en', 'actualizado_en')
    search_fields = ('nombre', 'apellido', 'dni', 'email')
    readonly_fields = ('creado_en', 'actualizado_en')
    fieldsets = (
        (None, {
            'fields': ('nombre', 'apellido', 'dni', 'email', 'password', 'tipo', 'foto_perfil', 'ubicacion')
        }),
        ('Fechas', {
            'fields': ('creado_en', 'actualizado_en'),
            'classes': ('collapse',),
        }),
    )
    filter_horizontal = ()

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Empleador)
admin.site.register(Trabajador)
admin.site.register(Chamba)
admin.site.register(Postulacion)
admin.site.register(Mensaje)
