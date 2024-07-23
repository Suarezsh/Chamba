from django.urls import path
from .views import (
    RegistroUsuarioView, 
    IniciarSesionView, 
    ObtenerUsuarioView, 
    CrearChambaView,
    ObtenerChambasDeEmpleadorView,
    EliminarChambaView,
    ListarTrabajadoresView,
    EnviarMensajeView,
    ListarMensajesView
)

urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view(), name='registro'),
    path('iniciar-sesion/', IniciarSesionView.as_view(), name='iniciar-sesion'),
    path('obtener-usuario/', ObtenerUsuarioView.as_view(), name='obtener-usuario'),
    path('crear-chamba/', CrearChambaView.as_view(), name='crear-chamba'),
    path('obtener-chambas/', ObtenerChambasDeEmpleadorView.as_view(), name='obtener-chambas'),
    path('eliminar-chamba/', EliminarChambaView.as_view(), name='eliminar-chamba'),
    path('listar-trabajadores/', ListarTrabajadoresView.as_view(), name='listar-trabajadores'),
    path('enviar-mensaje/', EnviarMensajeView.as_view(), name='enviar-mensaje'),
    path('listar-mensajes/<int:usuario_id>/', ListarMensajesView.as_view(), name='listar-mensajes')
]
