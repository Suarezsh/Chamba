import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-empleador',
  templateUrl: './empleador.component.html',
  styleUrls: ['./empleador.component.css']
})
export class EmpleadorComponent implements OnInit {
  titulo: string = '';
  descripcion: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  chambas: any[] = []; 

  destinatarioId: number = 0;
  mensaje: string = '';
  mensajes: any = { mensajes_enviados: [], mensajes_recibidos: [] }; 

  constructor(private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.obtenerChambas();
    this.obtenerMensajes();
  }

  crearChamba(): void {
    const empleadorId = this.cookieService.get('userId');
    if (empleadorId) {
      const nuevaChamba = {
        empleador_id: empleadorId,
        titulo: this.titulo,
        descripcion: this.descripcion,
        fecha_inicio: this.fechaInicio,
        fecha_fin: this.fechaFin
      };
      this.authService.crearChamba(nuevaChamba).subscribe(
        (response: any) => {
          console.log('Chamba creada con éxito:', response);
          this.limpiarFormulario();
          this.obtenerChambas(); 
        },
        (error: any) => {
          console.error('Error al crear la chamba:', error);
        }
      );
    } else {
      console.error('Empleador no identificado');
    }
  }

  obtenerChambas(): void {
    const empleadorId = this.cookieService.get('userId');
    if (empleadorId) {
      this.authService.obtenerChambas(empleadorId).subscribe(
        (response: any) => {
          this.chambas = response;
        },
        (error: any) => {
          console.error('Error al obtener las chambas:', error);
        }
      );
    } else {
      console.error('Empleador no identificado');
    }
  }

  eliminarChamba(chambaId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta chamba?')) {
      this.authService.eliminarChamba(chambaId).subscribe(
        (response: any) => {
          console.log('Chamba eliminada con éxito:', response);
          this.obtenerChambas();
        },
        (error: any) => {
          console.error('Error al eliminar la chamba:', error);
        }
      );
    }
  }

  limpiarFormulario(): void {
    this.titulo = '';
    this.descripcion = '';
    this.fechaInicio = '';
    this.fechaFin = '';
  }


  enviarMensaje(): void {
    const remitenteId = this.cookieService.get('userId');
    if (remitenteId && this.destinatarioId && this.mensaje) {
      const nuevoMensaje = {
        remitente: remitenteId,
        destinatario: this.destinatarioId,
        mensaje: this.mensaje
      };
      this.authService.enviarMensaje(nuevoMensaje).subscribe(
        (response: any) => {
          console.log('Mensaje enviado con éxito:', response);
          this.limpiarFormularioMensaje();
          this.obtenerMensajes(); 
        },
        (error: any) => {
          console.error('Error al enviar el mensaje:', error);
        }
      );
    } else {
      console.error('Datos incompletos para enviar el mensaje');
    }
  }

  obtenerMensajes(): void {
    const usuarioId = this.cookieService.get('userId');
    if (usuarioId) {
      this.authService.listarMensajes(Number(usuarioId)).subscribe(
        (response: any) => {
          this.mensajes = response; 
        },
        (error: any) => {
          console.error('Error al obtener los mensajes:', error);
        }
      );
    } else {
      console.error('Usuario no identificado');
    }
  }

  limpiarFormularioMensaje(): void {
    this.destinatarioId = 0;
    this.mensaje = '';
  }
}
