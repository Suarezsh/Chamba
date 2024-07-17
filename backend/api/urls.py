from django.urls import path, include
from rest_framework.routers import DefaultRouter
from chamba.views import UsuarioViewSet
from django.urls import path, include
from chamba.views import registrar_usuario

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('registrar/', registrar_usuario, name='registrar_usuario'),
]