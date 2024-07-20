from django.contrib import admin
from django.urls import path, include
from chamba.views import home
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('', home, name='home'),  # Ruta para la vista de bienvenida
    path('admin/', admin.site.urls),
    path('api/', include('chamba.urls')),  # Ruta para la API de la app chamba
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
