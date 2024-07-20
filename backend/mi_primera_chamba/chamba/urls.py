from django.urls import path
from .views import (
    RegisterUserView, LoginView, UserView, CambioRolView, 
    PublicarChambaView, PostularChambaView, GestionarPostulacionView, 
    EnviarMensajeView, BuscarTrabajadoresView
)

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user'),
    path('cambio-rol/', CambioRolView.as_view(), name='cambio_rol'),
    path('publicar-chamba/', PublicarChambaView.as_view(), name='publicar_chamba'),
    path('postular-chamba/', PostularChambaView.as_view(), name='postular_chamba'),
    path('gestionar-postulacion/', GestionarPostulacionView.as_view(), name='gestionar_postulacion'),
    path('enviar-mensaje/', EnviarMensajeView.as_view(), name='enviar_mensaje'),
    path('buscar-trabajadores/', BuscarTrabajadoresView.as_view(), name='buscar_trabajadores'),
]
