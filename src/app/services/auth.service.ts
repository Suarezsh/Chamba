import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) {}

  registro(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro/`, user);
  }

  iniciarSesion(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/iniciar-sesion/`, body);
  }

  obtenerUsuario(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/obtener-usuario/`, { id });
  }

  crearChamba(chamba: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-chamba/`, chamba);
  }
  obtenerChambas(empleadorId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/obtener-chambas/`, { usuario_id: empleadorId });
  }
  
  eliminarChamba(chambaId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar-chamba/`, { body: { chamba_id: chambaId } });
  }

  

  enviarMensaje(mensaje: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar-mensaje/`, mensaje);
  }

  
  listarTrabajadores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar-trabajadores/`);
  }
  
  listarMensajes(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar-mensajes/${usuarioId}/`);
  }

  obtenerTrabajador(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/obtener-trabajador/`, { id });
  }

  actualizarTrabajador(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar-trabajador/`, { id, ...datos });
  }
  listarChambas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar-chambas/`);
  }
  editarUsuario(datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar-usuario/`, datos);
  }
  generarPDF(usuarioId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/generar-pdf/${usuarioId}/`, { responseType: 'blob' });
  }
  obtenerEstadisticas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener-estadisticas/`);
  }
}
