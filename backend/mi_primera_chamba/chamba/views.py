from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password, make_password
from .models import Usuario, Trabajador, Empleador, Chamba, Mensaje
from django.shortcuts import get_object_or_404
from .serializers import UsuarioEditSerializer, RegistroUsuarioSerializer, UsuarioSerializer, ChambaSerializer, TrabajadorSerializer, MensajeSerializer, TrabajadorDetailSerializer

class RegistroUsuarioView(APIView):
    def post(self, request):
        serializer = RegistroUsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            usuario = serializer.save()
            if usuario.tipo == 'trabajador':
                Trabajador.objects.create(usuario=usuario)
            elif usuario.tipo == 'empleador':
                Empleador.objects.create(usuario=usuario)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IniciarSesionView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)

        if not check_password(password, usuario.password):
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"id": usuario.id}, status=status.HTTP_200_OK)

class ObtenerUsuarioView(APIView):
    def post(self, request):
        usuario_id = request.data.get('id')

        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CrearChambaView(APIView):
    def post(self, request):
        usuario_id = request.data.get('empleador_id')  
        try:
            empleador = Empleador.objects.get(usuario_id=usuario_id)  
        except Empleador.DoesNotExist:
            return Response({"error": "Empleador no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['empleador'] = empleador.usuario.id
        serializer = ChambaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ObtenerChambasDeEmpleadorView(APIView):
    def post(self, request):
        usuario_id = request.data.get('usuario_id')
        try:
            empleador = Empleador.objects.get(usuario_id=usuario_id)
        except Empleador.DoesNotExist:
            return Response({"error": "Empleador no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        chambas = Chamba.objects.filter(empleador=empleador)
        serializer = ChambaSerializer(chambas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EliminarChambaView(APIView):
    def delete(self, request):
        chamba_id = request.data.get('chamba_id')
        
        if not chamba_id:
            return Response({"error": "ID de chamba es requerido"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            chamba = Chamba.objects.get(id=chamba_id)
            chamba.delete()
            return Response({"message": "Chamba eliminada con éxito"}, status=status.HTTP_204_NO_CONTENT)
        except Chamba.DoesNotExist:
            return Response({"error": "Chamba no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        

class ListarTrabajadoresView(APIView):
    def get(self, request):
        trabajadores = Trabajador.objects.all()
        serializer = TrabajadorSerializer(trabajadores, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class EnviarMensajeView(APIView):
    def post(self, request):
        serializer = MensajeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListarMensajesView(APIView):
    def get(self, request, usuario_id):
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        mensajes_enviados = Mensaje.objects.filter(remitente=usuario)
        mensajes_recibidos = Mensaje.objects.filter(destinatario=usuario)
        serializer_enviados = MensajeSerializer(mensajes_enviados, many=True)
        serializer_recibidos = MensajeSerializer(mensajes_recibidos, many=True)
        
        return Response({
            "mensajes_enviados": serializer_enviados.data,
            "mensajes_recibidos": serializer_recibidos.data
        }, status=status.HTTP_200_OK)
        
class ObtenerTrabajadorView(APIView):
    def post(self, request):
        usuario_id = request.data.get('id')
        try:
            trabajador = Trabajador.objects.get(usuario_id=usuario_id)
        except Trabajador.DoesNotExist:
            return Response({"error": "Trabajador no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TrabajadorSerializer(trabajador)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EditarTrabajadorView(APIView):
    def put(self, request):
        usuario_id = request.data.get('id')
        try:
            trabajador = Trabajador.objects.get(usuario_id=usuario_id)
        except Trabajador.DoesNotExist:
            return Response({"error": "Trabajador no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TrabajadorDetailSerializer(trabajador, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class ListarChambasView(APIView):
    def get(self, request):
        chambas = Chamba.objects.all()
        serializer = ChambaSerializer(chambas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EditarUsuarioView(APIView):
    def put(self, request):
        usuario_id = request.data.get('id')
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UsuarioEditSerializer(usuario, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

class GenerarPDFView(APIView):
    def get(self, request, usuario_id):
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="usuario_{usuario_id}.pdf"'
        
        p = canvas.Canvas(response, pagesize=letter)
        width, height = letter
        
        p.drawString(100, height - 100, f"ID: {usuario.id}")
        p.drawString(100, height - 120, f"Nombre: {usuario.nombre}")
        p.drawString(100, height - 140, f"Apellido: {usuario.apellido}")
        p.drawString(100, height - 160, f"Email: {usuario.email}")
        p.drawString(100, height - 180, f"Tipo: {usuario.tipo}")

        p.showPage()
        p.save()

        return response