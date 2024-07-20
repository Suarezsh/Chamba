from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Usuario, Empleador, Trabajador, Chamba, Postulacion, Mensaje
from .serializers import UsuarioSerializer, ChambaSerializer, PostulacionSerializer, MensajeSerializer
from django.contrib.auth.hashers import check_password, make_password
from django.http import HttpResponse

def home(request):
    return HttpResponse("Bienvenido a la API de Mi Primera Chamba")

class RegisterUserView(APIView):
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            user = serializer.save()
            return Response(UsuarioSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)
        
        if check_password(password, user.password):
            return Response({
                "message": "Login exitoso",
                "user_id": user.id,
                "tipo": user.tipo,
                "email": user.email
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        if user_id:
            try:
                user = Usuario.objects.get(id=user_id)
                serializer = UsuarioSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Usuario.DoesNotExist:
                return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"error": "ID de usuario no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

class CambioRolView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        nuevo_tipo = request.data.get('tipo')
        if user_id and nuevo_tipo:
            try:
                user = Usuario.objects.get(id=user_id)
                if nuevo_tipo == 'trabajador':
                    Trabajador.objects.create(usuario=user)
                    Empleador.objects.filter(usuario=user).delete()
                elif nuevo_tipo == 'empleador':
                    Empleador.objects.create(usuario=user)
                    Trabajador.objects.filter(usuario=user).delete()
                user.tipo = nuevo_tipo
                user.save()
                return Response({"message": "Cambio de rol exitoso"}, status=status.HTTP_200_OK)
            except Usuario.DoesNotExist:
                return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"error": "Datos insuficientes"}, status=status.HTTP_400_BAD_REQUEST)

class PublicarChambaView(APIView):
    def post(self, request):
        empleador_id = request.data.get('empleador_id')
        try:
            empleador = Empleador.objects.get(usuario_id=empleador_id)
            serializer = ChambaSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(empleador=empleador)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Empleador.DoesNotExist:
            return Response({"error": "Empleador no encontrado"}, status=status.HTTP_404_NOT_FOUND)

class PostularChambaView(APIView):
    def post(self, request):
        chamba_id = request.data.get('chamba_id')
        trabajador_id = request.data.get('trabajador_id')
        try:
            chamba = Chamba.objects.get(id=chamba_id)
            trabajador = Trabajador.objects.get(usuario_id=trabajador_id)
            postulacion = Postulacion.objects.create(chamba=chamba, trabajador=trabajador)
            return Response(PostulacionSerializer(postulacion).data, status=status.HTTP_201_CREATED)
        except (Chamba.DoesNotExist, Trabajador.DoesNotExist):
            return Response({"error": "Chamba o Trabajador no encontrado"}, status=status.HTTP_404_NOT_FOUND)

class GestionarPostulacionView(APIView):
    def post(self, request):
        postulacion_id = request.data.get('postulacion_id')
        estado = request.data.get('estado')
        try:
            postulacion = Postulacion.objects.get(id=postulacion_id)
            postulacion.estado = estado
            postulacion.save()
            if estado == 'aceptado':
                postulacion.trabajador.disponible = False
                postulacion.trabajador.save()
            return Response(PostulacionSerializer(postulacion).data, status=status.HTTP_200_OK)
        except Postulacion.DoesNotExist:
            return Response({"error": "Postulacion no encontrada"}, status=status.HTTP_404_NOT_FOUND)

class EnviarMensajeView(APIView):
    def post(self, request):
        remitente_id = request.data.get('remitente_id')
        destinatario_id = request.data.get('destinatario_id')
        mensaje = request.data.get('mensaje')
        try:
            remitente = Usuario.objects.get(id=remitente_id)
            destinatario = Usuario.objects.get(id=destinatario_id)
            nuevo_mensaje = Mensaje.objects.create(remitente=remitente, destinatario=destinatario, mensaje=mensaje)
            return Response(MensajeSerializer(nuevo_mensaje).data, status=status.HTTP_201_CREATED)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

class BuscarTrabajadoresView(APIView):
    def post(self, request):
        habilidades = request.data.get('habilidades')
        fecha_inicio = request.data.get('fecha_inicio')
        fecha_fin = request.data.get('fecha_fin')
        query = Trabajador.objects.filter(disponible=True)
        if habilidades:
            query = query.filter(habilidades__icontains=habilidades)
        if fecha_inicio and fecha_fin:
            
            pass
        trabajadores = query.all()
        return Response(UsuarioSerializer([t.usuario for t in trabajadores], many=True).data, status=status.HTTP_200_OK)
